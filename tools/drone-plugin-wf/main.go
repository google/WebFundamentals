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

package main

import (
	"bytes"
	"compress/gzip"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"math"
	"math/rand"
	"mime"
	nethttp "net/http"
	"os"
	"os/exec"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"time"

	"github.com/drone/drone-plugin-go/plugin"
	"github.com/google/go-github/github"

	"golang.org/x/net/context"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"google.golang.org/cloud"
	"google.golang.org/cloud/storage"
)

const (
	// configBucket is where object change notifications
	// settings are stored
	configBucket = "webcentral-weasel-config"

	// maxConcurrent is the highest upload concurrency.
	// It cannot be 0.
	maxConcurrent = 10

	// jsonAPI is the base URL for the storage JSON API.
	jsonAPI = "https://www.googleapis.com/storage/v1"
)

var (
	// vargs are provided on stdin of the program
	// and parsed by plugin package.
	vargs struct {
		AuthKey      string            `json:"auth_key"`
		GitHubToken  string            `json:"github_token"`
		WptAPIKEY    string            `json:"wpt_api_key"`
		RigURL       string            `json:"rig_url"`
		RigSecret    string            `json:"rig_secret"`
		Project      string            `json:"project"`
		ServerSuffix string            `json:"server_suffix"`
		BucketSuffix string            `json:"bucket_suffix"`
		Source       string            `json:"source"`
		Ignore       string            `json:"ignore"`
		ACL          []string          `json:"acl"`
		Gzip         []string          `json:"gzip"`
		CacheControl string            `json:"cache_control"`
		Metadata     map[string]string `json:"metadata"`
	}

	workspace plugin.Workspace // workspace location
	build     plugin.Build     // this build info
	repo      plugin.Repo      // the repo being built

	// client encapsulates both GCS storage and standard HTTP clients,
	// using the same oauth2.TokenSource.
	client struct {
		gcs  *storage.Client
		ghub *github.Client
		http *nethttp.Client
	}

	// bucket is the GCS target bucket
	bucket *storage.BucketHandle
	// bucketName is where the build is copied to
	bucketName string
	// server url bucketName contents is served from
	stagingURL string

	// program exit code
	ecodeMu sync.Mutex // guards ecode
	ecode   int
)

// printf prints to stderr
var printf = log.Printf

// errorf sets exit code to a non-zero value and outputs using printf.
func errorf(format string, args ...interface{}) {
	ecodeMu.Lock()
	ecode = 1
	ecodeMu.Unlock()
	printf(format, args...)
}

// fatalf calls log.Printf with format and args,
// and exits immediately.
func fatalf(format string, args ...interface{}) {
	msg := fmt.Sprintf(format, args...)
	updateStatus("error", msg, "")
	log.Fatal(msg)
}

const alpha = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// randomString generates a string of random characters picked from alpha.
func randomString(n int) string {
	b := make([]byte, n)
	for i := 0; i < n; i++ {
		b[i] = alpha[rand.Intn(len(alpha))]
	}
	return string(b)
}

// prNum extracts github PR number from ref string.
func prNum(ref string) string {
	var buf bytes.Buffer
	for _, r := range ref {
		if r >= '0' && r <= '9' {
			buf.WriteRune(r)
		}
	}
	return buf.String()
}

// retryUpload calls uploadFile until the latter returns nil or unrecoverable error,
// or the number of invocations reaches n.
// It blocks for a duration of seconds exponential to the iteration between the calls.
func retryUpload(dst, file string, n int) error {
	var err error
	for i := 0; i <= n; i++ {
		if i > 0 {
			t := time.Duration((math.Pow(2, float64(i)) + rand.Float64()) * float64(time.Second))
			time.Sleep(t)
		}
		if err = uploadFile(dst, file); err == nil {
			break
		}
	}
	return err
}

// uploadFile uploads the file to dst using global bucket.
func uploadFile(dst, file string) error {
	r, gz, err := gzipper(file)
	if err != nil {
		return err
	}
	defer r.Close()
	rel, err := filepath.Rel(vargs.Source, file)
	if err != nil {
		return err
	}
	w := bucket.Object(rel).NewWriter(context.Background())
	w.CacheControl = vargs.CacheControl
	w.Metadata = vargs.Metadata
	for _, s := range vargs.ACL {
		a := strings.SplitN(s, ":", 2)
		if len(a) != 2 {
			return fmt.Errorf("%s: invalid ACL %q", rel, s)
		}
		w.ACL = append(w.ACL, storage.ACLRule{
			Entity: storage.ACLEntity(a[0]),
			Role:   storage.ACLRole(a[1]),
		})
	}
	w.ContentType = mime.TypeByExtension(filepath.Ext(file))
	if w.ContentType == "" {
		w.ContentType = "application/octet-stream"
	}
	if gz {
		w.ContentEncoding = "gzip"
	}
	if _, err := io.Copy(w, r); err != nil {
		return err
	}
	return w.Close()
}

// gzipper returns a stream of file and a boolean indicating
// whether the stream is gzip-compressed.
//
// The stream is compressed if vargs.Gzip contains file extension.
func gzipper(file string) (io.ReadCloser, bool, error) {
	r, err := os.Open(file)
	if err != nil || !matchGzip(file) {
		return r, false, err
	}
	pr, pw := io.Pipe()
	w := gzip.NewWriter(pw)
	go func() {
		_, err := io.Copy(w, r)
		if err != nil {
			errorf("%s: io.Copy: %v", file, err)
		}
		if err := w.Close(); err != nil {
			errorf("%s: gzip: %v", file, err)
		}
		if err := pw.Close(); err != nil {
			errorf("%s: pipe: %v", file, err)
		}
		r.Close()
	}()
	return pr, true, nil
}

// matchGzip reports whether the file should be gzip-compressed during upload.
// Compressed files should be uploaded with "gzip" content-encoding.
func matchGzip(file string) bool {
	ext := filepath.Ext(file)
	if ext == "" {
		return false
	}
	ext = ext[1:]
	i := sort.SearchStrings(vargs.Gzip, ext)
	return i < len(vargs.Gzip) && vargs.Gzip[i] == ext
}

// walkFiles creates a complete set of files to upload
// by walking vargs.Source recursively.
//
// It excludes files matching vargs.Ignore pattern.
// The ignore pattern is matched using filepath.Match against a partial
// file name, relative to vargs.Source.
func walkFiles() ([]string, error) {
	var items []string
	err := filepath.Walk(vargs.Source, func(p string, fi os.FileInfo, err error) error {
		if err != nil || fi.IsDir() {
			return err
		}
		rel, err := filepath.Rel(vargs.Source, p)
		if err != nil {
			return err
		}
		var ignore bool
		if vargs.Ignore != "" {
			ignore, err = filepath.Match(vargs.Ignore, rel)
		}
		if err != nil || ignore {
			return err
		}
		items = append(items, p)
		return nil
	})
	return items, err
}

// ensureBucket initializes bucket global var and creates the bucket resource
// if it doesn't exist already.
func ensureBucket() error {
	bucket = client.gcs.Bucket(bucketName)
	_, err := bucket.Attrs(context.Background())
	// bucket exists or it is an uncoverable error
	if err == nil || err != storage.ErrBucketNotExist {
		return err
	}

	// create the bucket with the given name
	printf("creating %s bucket", bucketName)
	req := &struct {
		Name         string `json:"name"`
		StorageClass string `json:"storageClass"`
	}{
		Name:         bucketName,
		StorageClass: "DURABLE_REDUCED_AVAILABILITY",
	}
	b, err := json.Marshal(req)
	if err != nil {
		return err
	}
	u := fmt.Sprintf("%s/b?project=%s", jsonAPI, vargs.Project)
	res, err := client.http.Post(u, "application/json", bytes.NewReader(b))
	if err == nil {
		res.Body.Close()
		if res.StatusCode > 299 {
			err = fmt.Errorf("%s: %v", u, res.Status)
		}
	}
	if err != nil {
		return err
	}

	// setup object change notifications
	printf("setting up OCN web hook")
	r := &struct {
		Type      string `json:"type"`
		URL       string `json:"address"`
		ChannelID string `json:"id"`
	}{
		Type:      "web_hook",
		URL:       stagingURL,
		ChannelID: randomString(64),
	}
	u = fmt.Sprintf("%s/b/%s/o/watch?alt=json", jsonAPI, bucketName)
	b, err = json.Marshal(r)
	if err != nil {
		errorf("watch payload: %v", err)
		return nil
	}
	res, err = client.http.Post(u, "application/json", bytes.NewReader(b))
	if err == nil {
		defer res.Body.Close()
		if res.StatusCode > 299 {
			err = fmt.Errorf("%s: %v", u, res.Status)
		}
	}
	if err != nil {
		errorf("%s: %v", u, err)
		return nil
	}
	b, err = ioutil.ReadAll(res.Body)
	if err != nil {
		printf("error reading watch response: %v", err)
		return nil
	}
	confb := client.gcs.Bucket(configBucket)
	w := confb.Object(bucketName + ".json").NewWriter(context.Background())
	w.ContentType = "application/json"
	_, err = w.Write(b)
	if err1 := w.Close(); err == nil {
		err = err1
	}
	if err != nil {
		printf("error writing watch conf object: %v", err)
	}
	return nil
}

// updateStatus updates GitHub Pull Request status.
func updateStatus(state, desc, url string) {
	s := &github.RepoStatus{
		Context:     github.String("builder"),
		State:       github.String(state),
		Description: github.String(desc),
	}
	if url != "" {
		s.TargetURL = github.String(url)
	}
	_, _, err := client.ghub.Repositories.CreateStatus(repo.Owner, repo.Name, build.Commit, s)
	if err != nil {
		printf("ERROR: unable to update status: %v", err)
	}
}

// run is the actual entry point called from main.
// It expects vargs and workspace to be initialized
func run() {
	bucketName = strings.ToLower(build.Branch)
	if build.Event == plugin.EventPull {
		bucketName = fmt.Sprintf("pr-%v", prNum(build.Ref))
	}
	if bucketName != "master" {
		vargs.CacheControl = "public,max-age=0"
	}
	stagingURL = "https://" + bucketName + vargs.ServerSuffix
	bucketName += vargs.BucketSuffix
	updateStatus("pending", fmt.Sprintf("staging on %s bucket", bucketName), "")
	// make sure destination bucket exists
	// and initialize global bucket var
	if err := ensureBucket(); err != nil {
		fatalf("unable to create bucket %q: %v", bucketName, err)
	}

	// create a list of files to upload
	vargs.Source = filepath.Join(workspace.Path, vargs.Source)
	src, err := walkFiles()
	if err != nil {
		fatalf("local files: %v", err)
	}

	// result contains upload result of a single file
	type result struct {
		name string
		err  error
	}

	// upload all files in a goroutine, maxConcurrent at a time
	buf := make(chan struct{}, maxConcurrent)
	res := make(chan *result, len(src))
	for _, f := range src {
		buf <- struct{}{} // alloc one slot
		go func(f string) {
			rel, err := filepath.Rel(vargs.Source, f)
			if err != nil {
				res <- &result{f, err}
				return
			}
			err = retryUpload(rel, f, 5)
			res <- &result{rel, err}
			<-buf // free up
		}(f)
	}

	// wait for all files to be uploaded or stop at first error
	for _ = range src {
		r := <-res
		if r.err != nil {
			fatalf("%s: %v", r.name, r.err)
		}
		printf(r.name)
	}

	msg := fmt.Sprintf("staged on %s bucket", bucketName)
	updateStatus("success", msg, stagingURL)

	if err := bigrig(); err != nil {
		printf("bigrig: %v", err)
	}
}

func bigrig() error {
	args := []string{"bigrig.js",
		"--config", filepath.Join(workspace.Path, "tools/bigrig-config.json"),
		"--base-url", stagingURL,
		"--commit-url", build.Link,
	}
	c := exec.Command("node", args...)
	c.Dir = "/"
	c.Env = append(os.Environ(),
		"WPT_API_KEY="+vargs.WptAPIKEY,
		"RIG_URL="+vargs.RigURL,
		"RIG_SECRET="+vargs.RigSecret,
	)
	c.Stdout = os.Stdout
	c.Stderr = os.Stderr
	printf(strings.Join(args, " "))
	return c.Run()
}

func main() {
	log.SetFlags(0)
	rand.Seed(time.Now().UnixNano())

	plugin.Param("workspace", &workspace)
	plugin.Param("build", &build)
	plugin.Param("repo", &repo)
	plugin.Param("vargs", &vargs)
	plugin.MustParse()
	sort.Strings(vargs.Gzip) // need for matchGzip

	// context for all clients
	ctx := context.Background()
	// GitHub client
	gts := oauth2.StaticTokenSource(&oauth2.Token{AccessToken: vargs.GitHubToken})
	client.ghub = github.NewClient(oauth2.NewClient(ctx, gts))
	// GCS client
	auth, err := google.JWTConfigFromJSON([]byte(vargs.AuthKey), storage.ScopeFullControl)
	if err != nil {
		fatalf("auth: %v", err)
	}
	tsrc := auth.TokenSource(ctx)
	client.gcs, err = storage.NewClient(ctx, cloud.WithTokenSource(auth.TokenSource(ctx)))
	if err != nil {
		fatalf("storage client: %v", err)
	}
	// http client with service account authorization
	client.http = oauth2.NewClient(ctx, tsrc)

	run()
	if ecode != 0 {
		msg := fmt.Sprintf("exited with code %d", ecode)
		updateStatus("error", msg, stagingURL)
	}
	os.Exit(ecode)
}
