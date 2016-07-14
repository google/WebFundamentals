// Copyright 2016 Google Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package server

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io/ioutil"
	"net/http"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"golang.org/x/net/context"

	"github.com/google/weasel"

	"google.golang.org/appengine"
	"google.golang.org/appengine/log"
)

var (
	// config is the server config, populated from config.json file.
	config struct {
		// Root is web root, e.g. "/web/"
		Root string `json:"root"`
		// DefaultBucket is the GCS bucket to serve from when no specific match found
		DefaultBucket string `json:"default_bucket"`
		// BucketSuffix is appended to bucket name matched against in-flight request
		BucketSuffix string `json:"bucket_suffix"`
		// RegexPaths are matched against before anything else.
		// If not match found, tryPaths function is used instead.
		RegexPaths []struct {
			Pattern string
			Expand  string
			re      *regexp.Regexp // compiled Pattern
		} `json:"regexp"`
	}

	// wrapper.tpl template
	wrapTemplate *template.Template

	// weasel client for serving GCS objects
	storage = weasel.DefaultStorage

	// initErr indicates whether there was an error during init.
	initErr error
)

func init() {
	// read and sanitize config.json
	var b []byte
	b, initErr = ioutil.ReadFile("config.json")
	if initErr == nil {
		initErr = json.Unmarshal(b, &config)
	}
	if config.Root == "" {
		config.Root = "/"
	}
	if !strings.HasSuffix(config.DefaultBucket, config.BucketSuffix) {
		config.DefaultBucket += config.BucketSuffix
	}
	if initErr == nil {
		for i, rp := range config.RegexPaths {
			config.RegexPaths[i].re, initErr = regexp.Compile(rp.Pattern)
			if initErr != nil {
				break
			}
		}
	}
	// wrapper template
	if initErr == nil {
		wrapTemplate, initErr = template.ParseFiles("wrapper.tpl")
	}
	// http handlers
	http.HandleFunc("/", handleRoot)
}

func handleRoot(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" && r.Header.Get("x-goog-channel-id") != "" {
		storage.HandleChangeHook(w, r)
		return
	}

	if r.URL.Path == "/" && config.Root != "/" {
		http.Redirect(w, r, config.Root, http.StatusMovedPermanently)
		return
	}
	ctx := appengine.NewContext(r)
	if initErr != nil {
		log.Errorf(ctx, "bad server configuration: %v", initErr)
		http.Error(w, initErr.Error(), http.StatusInternalServerError)
		return
	}

	lang := r.FormValue("hl")
	if lang == "" {
		lang = "en"
	}
	wantsBody := r.Method == "GET"
	bucket := hostBucket(r.Host)
	// try regexp paths first
	if serveRegexp(ctx, w, bucket, r.URL.Path, lang, wantsBody) {
		return
	}
	// if path is not in regexMap and does not start with webroot,
	// we don't have it
	if !strings.HasPrefix(r.URL.Path, config.Root) {
		http.NotFound(w, r)
		return
	}

	// regexPaths didn't match: serve regular HTML page
	s := strings.TrimPrefix(r.URL.Path, config.Root)
	if s == "" {
		s = "/"
	}
	tp := tryPaths(s, lang)
	obj, err := fetchAny(ctx, bucket, tp)
	if err != nil {
		serveError(ctx, w, err)
		return
	}
	if obj == nil {
		http.NotFound(w, r)
		return
	}

	// normal flow, serve found object with optional body
	if wantsBody {
		var buf bytes.Buffer
		err := wrapTemplate.Execute(&buf, &struct {
			Lang    string
			Content template.HTML
		}{
			Lang:    lang,
			Content: template.HTML(obj.Body),
		})
		if err != nil {
			serveError(ctx, w, err)
			return
		}
		obj.Body = buf.Bytes()
	}
	serveObject(ctx, w, obj, lang, wantsBody)
}

func serveRegexp(ctx context.Context, w http.ResponseWriter, bucket, upath, lang string, withBody bool) bool {
	var name string
	for _, rp := range config.RegexPaths {
		m := rp.re.FindStringSubmatchIndex(upath)
		if m == nil {
			continue
		}
		name = string(rp.re.ExpandString([]byte{}, rp.Expand, upath, m))
		break
	}
	if name == "" {
		return false
	}

	o, err := storage.ReadFile(ctx, bucket, name)
	if err != nil {
		serveError(ctx, w, err)
		return true
	}
	serveObject(ctx, w, o, lang, withBody)
	return true
}

func serveObject(ctx context.Context, w http.ResponseWriter, o *weasel.Object, lang string, withBody bool) {
	if u := o.Redirect(); u != "" {
		if strings.HasPrefix(u, "/langs/") {
			u = strings.TrimPrefix(u, "/langs/")
			if i := strings.IndexRune(u, '/'); i > 0 {
				u = u[i+1:]
			}
		}
		u = path.Join(config.Root, u)
		if strings.HasSuffix(o.Redirect(), "/") {
			u += "/"
		}
		u += fmt.Sprintf("?hl=%s", lang)
		w.Header().Set("location", u)
		w.WriteHeader(o.RedirectCode())
		return
	}

	weasel.ServeObject(w, o, withBody)
}

func fetchAny(ctx context.Context, bucket string, names []string) (*weasel.Object, error) {
	type result struct {
		name string
		obj  *weasel.Object
		err  error
	}
	resc := make(chan *result, len(names))
	for _, v := range names {
		go func(name string) {
			o, err := storage.ReadFile(ctx, bucket, name)
			resc <- &result{name, o, err}
		}(v)
	}

	// pick first non-error or non-404 result,
	// in exact order specified in names slice
	resmap := make(map[string]*result, len(names))
	next := 0
RESULT:
	for _ = range names {
		select {
		case r := <-resc:
			resmap[r.name] = r
		case <-time.After(10 * time.Second):
			return nil, &weasel.FetchError{
				Msg:  "Storage timed out",
				Code: http.StatusServiceUnavailable,
			}
		}
		for _, n := range names[next:] {
			res, ok := resmap[n]
			if !ok {
				continue RESULT
			}
			errf, rok := res.err.(*weasel.FetchError)
			if res.err == nil || !rok || errf.Code != http.StatusNotFound {
				return res.obj, res.err
			}
			next++
		}
	}

	return nil, nil
}

func serveError(ctx context.Context, w http.ResponseWriter, err error) {
	code := http.StatusInternalServerError
	if errf, ok := err.(*weasel.FetchError); ok {
		code = errf.Code
	}
	if code != http.StatusNotFound {
		log.Errorf(ctx, err.Error())
	}
	http.Error(w, http.StatusText(code), code)
}

func tryPaths(oname, lang string) []string {
	tp := []string{path.Join("langs", lang, oname)}
	if lang != "en" {
		tp = append(tp, path.Join("langs", "en", oname))
	}
	if strings.HasSuffix(oname, "/") {
		for i, v := range tp {
			tp[i] = v + "/"
		}
	} else if filepath.Ext(oname) == "" {
		for _, v := range tp {
			tp = append(tp, v+".html")
		}
	}
	return tp
}

func hostBucket(h string) string {
	i := strings.Index(h, "-dot-")
	if i < 0 {
		return config.DefaultBucket
	}
	return h[:i] + config.BucketSuffix
}
