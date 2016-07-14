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
	"flag"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"testing"
	"time"

	"google.golang.org/appengine/aetest"
)

// testInstance initialized and shut down in TestMain.
var testInstance aetest.Instance

func TestMain(m *testing.M) {
	flag.Parse()

	var err error
	testInstance, err = aetest.NewInstance(nil)
	if err != nil {
		log.Fatal(err)
	}

	code := m.Run()
	testInstance.Close()
	os.Exit(code)
}

func TestRedirectRoot(t *testing.T) {
	req, _ := testInstance.NewRequest("GET", "/", nil)
	wr := httptest.NewRecorder()
	http.DefaultServeMux.ServeHTTP(wr, req)
	if wr.Code != http.StatusMovedPermanently {
		t.Errorf("wr.Code = %d; want %d", wr.Code, http.StatusMovedPermanently)
	}
	if v := wr.Header().Get("location"); v != config.Root {
		t.Errorf("location = %q; want %q", v, config.Root)
	}
}

func TestServeRegex(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var res string
		switch r.URL.Path {
		default:
			w.WriteHeader(400)
			return
		case "/b/robots.txt":
			res = "robots"
		case "/b/langs/en/manifest.json":
			res = "manifest"
		case "/b/imgs/image.png":
			res = "image png"
		case "/b/imgs/favicon.ico":
			res = "favicon"
		case "/b/langs/en/file.svg":
			res = "svg file"
		case "/b/scripts/main.js":
			res = "js file"
		case "/b/styles/main.css":
			res = "css file"
		}
		w.Write([]byte(res))
	}))
	defer ts.Close()

	storage.Base = ts.URL
	config.DefaultBucket = "b"
	config.BucketSuffix = ""

	tests := []struct{ url, res string }{
		{"/robots.txt", "robots"},
		{"/web/manifest.json", "manifest"},
		{"/favicon.ico", "favicon"},
		{"/web/imgs/image.png", "image png"},
		{"/web/file.svg", "svg file"},
		{"/web/scripts/main.js", "js file"},
		{"/web/styles/main.css", "css file"},
	}

	for i, test := range tests {
		r, _ := testInstance.NewRequest("GET", test.url, nil)
		wr := httptest.NewRecorder()
		http.DefaultServeMux.ServeHTTP(wr, r)
		if wr.Code != 200 {
			t.Errorf("%d: wr.Code = %d; want 200", i, wr.Code)
		}
		if v := wr.Body.String(); v != test.res {
			t.Errorf("%d: body = %q; want %q", i, v, test.res)
		}
	}
}

func TestServeTryPaths(t *testing.T) {
	ts := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var res string
		switch r.URL.Path {
		default:
			t.Errorf("invalid path: %s", r.URL.Path)
			w.WriteHeader(http.StatusBadRequest)
			return
		case "/b/langs/en/index.html":
			res = "web index"
		case "/b/langs/en/fundamentals/index.html":
			res = "should not be used"
		case "/b/langs/de/fundamentals/index.html":
			// make english translation return first
			// to verify correct order of tryPaths is used
			time.Sleep(100 * time.Millisecond)
			res = "german"
		case "/b/langs/en/file.html":
			res = "only english"
		case "/b/langs/it/file.html", "/b/langs/nl/index.html":
			w.WriteHeader(http.StatusNotFound)
		case "/b/langs/es/fundamentals/forbidden.html":
			w.WriteHeader(http.StatusForbidden)
		case "/b/langs/en/fundamentals/forbidden.html":
			w.WriteHeader(http.StatusUnauthorized)
		}
		w.Write([]byte(res))
	}))
	defer ts.Close()

	storage.Base = ts.URL
	config.DefaultBucket = "b"
	config.BucketSuffix = ""

	tests := []struct {
		url, res string
		code     int
	}{
		{"/web/", "web index", http.StatusOK},
		{"/web/?hl=nl", "web index", http.StatusOK},
		{"/web/file.html", "only english", http.StatusOK},
		{"/web/file.html?hl=it", "only english", http.StatusOK},
		{"/web/fundamentals/?hl=de", "german", http.StatusOK},
		{"/web/fundamentals/forbidden.html", "", http.StatusUnauthorized},
		{"/web/fundamentals/forbidden.html?hl=es", "", http.StatusForbidden},
	}

	for i, test := range tests {
		r, _ := testInstance.NewRequest("GET", test.url, nil)
		wr := httptest.NewRecorder()
		http.DefaultServeMux.ServeHTTP(wr, r)
		if wr.Code != test.code {
			t.Errorf("%d: %s: wr.Code = %d; want %d", i, test.url, wr.Code, test.code)
		}
		if test.code != http.StatusOK {
			continue
		}
		if v := wr.Body.String(); strings.Index(v, test.res) < 0 {
			t.Errorf("%d: %s\n--- does not contain %q", i, v, test.res)
		}
	}
}

func TestHostBucket(t *testing.T) {
	tests := []struct{ in, out string }{
		{"", "default-s"},
		{"any", "default-s"},
		{"host.example.org", "default-s"},
		{"b1-dot-app.example.org", "b1-s"},
		{"b2-dot-two-dot-app.appspot.com", "b2-s"},
	}
	config.DefaultBucket = "default-s"
	config.BucketSuffix = "-s"
	for i, test := range tests {
		v := hostBucket(test.in)
		if v != test.out {
			t.Errorf("%d: hostBucket(%q) = %q; want %q", i, test.in, v, test.out)
		}
	}
}
