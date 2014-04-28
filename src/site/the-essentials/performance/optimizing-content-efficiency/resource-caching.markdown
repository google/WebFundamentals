---
layout: article
title: "Resource caching"
description: "Our web applications continue to grow in their scope, ambition, and 
              functionality - that's a good thing. However, the relentless march towards a 
              richer web is driving another trend: the amount of data downloaded by each 
              application continues to increase at a steady pace. "
introduction: "Our web applications continue to grow in their scope, ambition, and 
               functionality - that's a good thing. However, the relentless march towards a 
               richer web is driving another trend: the amount of data downloaded by each 
               application continues to increase at a steady pace. "
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 3
collection: optimizing-content-efficiency
key-takeaways:
  eliminate-downloads:
    - Inventory all your own and third party assets on your pages
    - Measure the performance of each asset: its value and its technical performance
    - Determine if the resources are providing sufficient value
  compression-101:
    - Compression is the process of removing redundant and unnecessary data
    - Eliminating unnecessary data always yields the best results
    - There are many different compression techniques and algorithms
    - You will need a variety of techniques to achieve the best compression
  minification:
    - Content-specific optimizations can significantly reduce the size of delivered resources.
    - Content-specific optimizations apply to every content-type: text, images, video, etc.
    - Content-specific optimizations are best applied as part of your build/release cycle.
  text-compression:
    - GZIP performs best on text-based assets: CSS, JavaScript, HTML.
    - All modern browsers support GZIP compression and will automatically request it.
    - Your server needs to configured to enable GZIP compression.
    - Some CDNs require special care to ensure that GZIP is enabled.
  image-compression-101:
    - An image is a grid of pixels
    - Each pixel encodes color and transparency information (RGB/RGBA)
    - Image compressors use variety of techniques to reduce the number of required bits per pixel to reduce file size of the image
  lossless-vs-lossy:
    - Lossless compression reconstructs an exact replica of the input file
    - Lossy compression reconstructs an approximation of the input file
    - Unlike most other data types, images are great candidates for lossy compression
    - There is no single best "quality" setting for all images: each combination of particular compressor and image contents produces a unique output
  select-right-image:
    - There is no single best image format for every use case
    - New image formats (WebP / JPEG XR) provide improved functionality and compression but are not (yet) universally supported by all browsers
    - Selecting the "right" image format for a particular asset requires understanding of the required features (e.g. transparency) and capabilities of the various formats (e.g. lossy support)
  optimize-hidpi-images:
    - High resolution screens have multiple device pixels per CSS pixel
    - High resolution images require significantly higher number of pixels and bytes
    - Image optimization techniques are the same regardless of resolution
  delivering-scaled-images:
    - Delivering scaled assets is one of the simplest and most effective optimizations
    - Reduce the number of unnecessary pixels by scaling your images to their display size
    - Pay close attention to large assets as they result in high overhead
  replace-raster-with-vector:
    - Vector formats are ideally suited for high-resolution screens
    - Audit your image assets and replace them with vector formats where possible
  validate-etags:
    - Validation token is communicated by the server via the ETag HTTP header
    - Validation token enables efficient resource update checks: no data transfer if the resource has not changed.
  cache-contel:
    - Each resource can define its caching policy via Cache-Control HTTP header
    - Cache-Control directives control who can cache the resource, under which conditions, and for how long
  invalidate-cache:
    - Locally cached resources are used until the resource "expires"
    - Embedding a file content fingerprint in the URL enables us to force the client to update to a new version of the resource
    - Each application needs to define its own cache hierarchy for optimal performance 

---

{% wrap content%}

{% include modules/toc.liquid %}

Fetching a resource over the network is both slow and expensive: large resources 
require many roundtrips between the client and server, which delays when the 
resource is available and can be processed by the browser, and also incurs data 
costs for the visitor. As a result, the ability to cache and reuse previously 
fetched resources is a critical aspect of optimizing for performance. 

The good news is, every browser ships with an implementation of an HTTP resource 
cache. All we have to do is ensure that each server response provides correct 
HTTP header directives to instruct the browser on when and for how long the 
resource can be cached by browser. 

> _If you are using a __Webview__ to fetch and display web content in your 
> application, you may need to provide additional configuration flags to ensure 
> that the HTTP cache is enabled, its size is set to a reasonable number to 
> match your use case, and that the cache is persisted. Check the platform 
> documentation and confirm your settings!_

<!-- No converter for: INLINE_DRAWING -->

When the server returns a response it also emits a collection of response HTTP 
headers, describing the content-type, length, caching directives, validation 
token, and more. For example, in above exchange the server returns a 1024 byte 
response, instructs the client to cache it for up to 120 seconds, and provides a 
validation token ("x234dff") that can be used after the resource has expired to 
check if the resource has been modified.

## Validating cached resource with ETag's

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.validate-etags %}


Let's assume 120 seconds have passed since our initial fetch and the browser has 
initiated a new request for the same resource. First, the browser checks the 
local cache and finds the previous response, unfortunately it cannot use it as 
the resource has now "expired". At this point it could simply dispatch a new 
request and fetch the new full response, but that's inefficient because if the 
resource has not changed then there is no reason to download the exact same 
bytes that are already in cache!

That's the problem that validation tokens, as specified in the ETag header, are 
designed to solve: the server generates and returns an arbitrary token which is 
typically a hash or some other fingerprint of the contents of the file. The 
client does not need to know how the fingerprint is generated, it only needs to 
send it to the server on the next request: if the fingerprint is still the same 
then the resource has not changed and we can skip the resource download.

<!-- No converter for: INLINE_DRAWING -->

In above example the client automatically provides the ETag token within the 
"If-None-Match" HTTP request header, server checks the token against the current 
resource, and if it has not changed returns a "304 Not Modified" response which 
tells the browser that the response it has in cache has not changed and can be 
renewed for another 120 seconds. Note that we do not have to download the 
resource once more - this saves time and bandwidth.

As a web developer, how do you take advantage of efficient resource 
revalidation? The browser does all the work on our behalf: it will automatically 
detect if a validation token has been previously specified, it will append it to 
an outgoing request, and it will update the cache timestamps as necessary based 
on received response from the server. **The only thing that's left for us to do 
is to ensure that the server is, in fact, providing the necessary ETag tokens: 
check your server documentation for necessary configuration flags. **

> _Tip: __HTML5 Boilerplate project contains __[sample configuration 
> files](https://github.com/h5bp/server-configs)__ for all the most popular 
> servers with detailed comments for each configuration flag and setting: find 
> your favorite server in the list, look for appropriate settings, and copy / 
> confirm that your server is configured with recommended settings._

## Cache-Control 

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.cache-contel %}

The best resource request is a request that does not need to communicate with 
the server: a local copy of the resource allows us to eliminate all network 
latency and avoid data charges for the data transfer. To achieve this, the HTTP 
specification allows the server to return a [number of different Cache-Control 
directives](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) that 
control how, and for how long, the individual resource can be cached by the 
browser and other intermediate caches. 

> _Cache-Control header was defined as part of the HTTP/1.1 specification and 
> supersedes previous headers (e.g. Expires) used to define response caching 
> policies. All modern browsers support Cache-Control, hence that is all we will 
> need._

<!-- No converter for: INLINE_DRAWING -->

### "no-cache" and "no-store"

"no-cache" indicates that the returned response cannot be used to satisfy a 
subsequent request to the same URL without first checking with the server if the 
response has changed. As a result, if a proper validation token (ETag) is 
present, no-cache will incur a roundtrip to validate the resource, but can 
eliminate the download if the resource has not changed.

By contrast, "no-store" is much simpler, as it simply disallows the browser and 
all intermediate caches to store any version of the returned response - e.g. 
response containing private personal or banking data. Everytime the user 
requests this asset, a request is sent to the server and a full response is 
downloaded each and every time.

### "public" vs. "private"

If the resource is marked as public then it can be cached by the browser, as 
well as any intermediate cache - e.g.  CDNs and other proxy caches will 
typically only cache and serve "public" resources, unless configured otherwise. 

By contrast, "private" resources can be cached by the browser but are typically 
intended for a single user and hence are not allowed to be cached by any 
intermediate cache - e.g. an HTML page with private user information can be 
cached by that user's browser, but not by a CDN. 

### "max-age"

This directive specifies the maximum time in seconds that the fetched response 
is allowed to be cached for from the time of the request - e.g. "max-age=60" 
indicates that the response can be cached and reused for the next 60 seconds. 

## Defining optimal Cache-Control policy

<!-- No converter for: INLINE_DRAWING -->

Follow the decision tree above to determine the optimal caching policy for a 
particular resource, or a set of resources used by your application. Ideally, 
you should aim to cache as many resources as possible on the client for the 
longest possible period, and provide validation tokens for each resource to 
enable efficient resource revalidation. 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Cache-Control directives</td>
<td>Explanation</td>
</tr>
<tr>
<td>public, max-age=86400</td>
<td>Resource can be cached by browser and any intermediary caches for up to 1 day (60 seconds x 60 minutes x 24 hours)</td>
</tr>
<tr>
<td>private, max-age=600</td>
<td>Resource can be cached by the client's browser only for up to 10 minutes (60 seconds x 10 minutes)</td>
</tr>
<tr>
<td>private, no-store</td>
<td>Resource is not allowed to be cached and must be fetched in full on every request.</td>
</tr>
</table>

According to HTTP Archive, amongst the top 300,000 sites (by Alexa rank), 
[nearly half of all the downloaded resources can be 
cached](http://httparchive.org/trends.php#maxage0) by the browser, which is a 
huge savings for repeat pageviews and visits! Of course, that doesn't mean that 
your particular application will have 50% of resources that can be cached: some 
sites can cache 90%+ of their resources, while others may have a lot of private 
or time-sensitive data that can't be cached at all. 

**Audit your pages to identify which resources can be cached and ensure that the 
server is returning appropriate Cache-Control and ETag headers.**

## Invalidating and updating cached resources

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.invalidate-cache %}


All HTTP requests made by the browser are first routed to the browser cache to 
check if there is a valid cached response that can be used to fulfill the 
request. If there is a match, the response is read from the cache and we 
eliminate both the network latency and the data costs incurred by the transfer. 
**However, what if we want to update or invalidate a cached resource? **

For example, let's say we've told our visitors to cache a CSS stylesheet for up 
to 24 hours (max-age=86400), but our designer has just committed an update that 
we would like to make available to all users. How do we notify all the visitors 
with what is now a "stale" cached copy of our CSS to update their caches? Trick 
question, we can't, at least not without changing the URL of the resource.

Once the resource is cached by the browser, the cached version of the resource 
will be used until the specified cache directives are no longer valid (i.e. 
max-age expires), or until the resource is evicted from cache for some other 
reason - e.g. user clearing their browser cache. As a result, different users 
might end up using different versions of the file when the page is constructed: 
users who just fetched the resource will use the new version, while users who 
cached an earlier (but still valid) copy will use an older version of the 
resource. 

**So, how do we get the best of both worlds: client-side caching and quick 
updates?** Simple, we can change the URL of the resource and force the user to 
download the new resource whenever its content changes. Typically, this is done 
by embedding a fingerprint of the file, or a version number, in its filename - 
e.g. style.**x234dff**.css.

<!-- No converter for: INLINE_DRAWING -->

The ability to define per-resource caching policies allows us to define "cache 
hierarchies" that allow us to control not only how long each resource is cached 
for, but also how quickly new versions of that resource are seen by visitor. For 
example, let's analyze the above example:

* The HTML is marked with "no-cache", which means that the browser will always 
  revalidate the document on each request and fetch the latest version if the 
  contents change. Also, within the HTML markup we embed resource fingerprints 
  in the URLs for CSS and JavaScript assets: if the contents of those files 
  change, than the HTML of the page will change as well and new copy of the HTML 
  response will be downloaded.
* CSS resource is marked as public, which allows it to be cached by intermediate 
  caches (e.g. a CDN), and is set to expire in 1 year. Note that we can use the 
  "far future expires" of 1 year safely because we embed the file fingerprint 
  its filename: if the CSS is updated, the URL will change as well.
* JavaScript resource is also set to expire in 1 year, but is marked as private, 
  perhaps because it contains some private user data that the CDN shouldn't 
  cache. 
* The image is cached without a version or unique fingerprint and is set to 
  expire in 1 day.

The combination of ETag, Cache-Control, and unique URLs allows us to deliver the 
best of all worlds: long-lived expiry times, control over where the response can 
be cached, and on-demand updates.

## Resource caching checklist

There is no one best cache policy. Depending on your traffic patterns, type of 
data served, and application specific requirements for data freshness, you will 
have to define and configure the appropriate per-resource settings, as well as 
the overall "caching hierarchy". 

Some tips and techniques to keep in mind as you work on resource caching 
strategy:

* **Use consistent URLs: **if you serve the same content on different URLs, then 
  that content will be fetched and stored multiple times - avoid this.
* **Ensure the server provides a validation token (ETag):** validation tokens 
  eliminate the need to transfer the same bytes when a resource has not changed 
  on the server.
* **Identify which resources can be cached by intermediaries:** resources that 
  are identical for all users are great candidates to be cached by a CDN and 
  other intermediaries. 
* **Determine the optimal cache lifetime for each resource: **different 
  resources may have different freshness requirements, audit and determine the 
  appropriate max-age for each one.
* **Determine the best cache hierarchy for your site: **combination of resource 
  URLs with content fingerprints, and short or no-cache lifetimes for HTML 
  documents allows you to control how quickly resource updates are picked up by 
  the client. 
* **Minimize resource churn:** some resources are updated more frequently than 
  others. If there is a particular part of resource (e.g. JavaScript function, 
  or set of CSS styles) that are being updated, consider delivering that code as 
  a separate file. Doing so allows the remainder of the content (e.g. library 
  code that does not change very often), to be fetched from cache and minimizes 
  the amount of downloaded content whenever an update is fetched.

- - -

# PageSpeed Rules and Recommendations

**TODO****: do we need this content?**

### Minify resources: HTML, CSS, JavaScript, and others.

Some resources, such as HTML, JavaScript, CSS, and even images may contain a lot 
of redundant information that is unnecessary to construct the page - e.g. 
comments in HTML, CSS, and JavaScript, or photo meta-data containing geo 
information or camera settings. 

By using a content specific minifier, this extra information can be eliminated 
prior to applying other compression (e.g. GZIP for text) techniques and yield 
significant additional savings.

### GZIP text-based resources

GZIP is optimized for compressing text-based resources and can decrease the size 
of the resource by up to 90% during transfer. Fewer bytes translates to faster 
downloads and smaller data charges for the visitor. 

Ensure that your server is configured 

Compress text resources with GZIP

### Optimize Images

JavaScript resources are 'parser-blocking' by default unless marked as 'async' 
or added via a special JavaScript snippet. Parser blocking JavaScript forces the 
browser to wait for the CSSOM and pauses construction of the DOM, which in turn 
can significantly delay the time to first render.

#### **Prefer async JavaScript resources**

Async resources unblock the document parser and allow the browser to avoid 
blocking on CSSOM prior to executing the script. Often, if the script can be 
made async, it also means it is not essential for the first render - consider 
deferring async scripts.

* minifycss
* minifyhtml
* minifyjavascript
* optimizeimages
    * servescaledimages
* specifyavaryacceptencodingheader

* avoidbadrequests
* leveragebrowsercaching
    * serveresourcesfromaconsistenturl
    * specifyacachevalidator


{% include modules/nextarticle.liquid %}

{% endwrap %}
