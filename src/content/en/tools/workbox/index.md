project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Service Worker Libraries.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2017-05-16 #}

# Workbox {: .page-title }

Use [Workbox](https://workboxjs.org/) to simplify your development by making it
easy to take advantage of powerful service worker features, eliminate boilerplate code, and automate service worker generation.

<figure class="attempt-right">
  <img src="/web/tools/workbox/thumb.png" alt="Workbo logo">
</figure>

Workbox is a collection of loosely-coupled libraries and tools, that focus on
different service worker features and use-cases. The two core tools that Workbox provides are:

**workbox-sw&mdash;**A service worker library that makes fetch requests
and caching as easy as possible.

**workbox-cli&mdash;**A command-line tool that generates a service worker and a
file manifest, which then makes use of the `workbox-sw` module to become a fully-functioning service worker.

These two high-level tools are built up from a number of lower-level modules
that can be used independently or mixed-and-matched:

**workbox-build&mdash;**Generates a file manifest or
service worker, that can then be used with `workbox-sw`. The `workbox-build`
module makes it easy to generate a service working using Gulp, Webpack, or any
other build tool you might use.

**workbox-runtime-caching&mdash;**Implements various runtime caching strategies.

**workbox-cache-expiration&mdash;**Expires
cached responses based on age or a maximum number of entries.

Workbox also includes modules for other common service worker use-cases:

**workbox-google-analytics&mdash;**Stores and retries
offline Google Analytics requests when a connection is available.

**workbox-background-sync&mdash;**Queues failed
requests and uses the Background Sync API to replay those requests when the user
comes back online.

Workbox is a rethink our previous service worker libraries and tools,
`sw-toolbox` and `sw-precache`, and is designed to be more modular, 
flexible, and extensible.

[Get Workbox](https://workboxjs.org/){: .button .button-primary }


<div class="clearfix"></div>

## Why use service worker libraries?

You're sold on the advantages of adding a service worker to your web
app—swapping the uncertainty of the network for the promise of a fast, offline-
first, service worker-powered experience. But to write your own service worker
from scratch, you have to clear some hurdles:

* Precaching URLs easily and reliably.
* Incrementing a cache version string to ensure that precached resources are
  updated.
* Implementing a cache expiration strategy to account for cache size or entry
  age.
* Building common patterns such as [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi)
  network timeouts and boilerplate code.
* Capturing and reporting Google analytics data during offline usage.


You can address all of these drawbacks using Workbox.


## Managing your cache

The [`workbox-sw`](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-sw)
module is a high-level service worker library that makes managing fetch requests
and caching responses as easy as possible.

You can use the `workbox-sw` module by importing it into your service worker
script. The module allows you to configure different caching strategies for
different routes and assets that are used in your application. It also can
pre-fetch assets that will be used in your app, to help make transitions and
future loads blazingly fast.

### Features

| Feature | Summary |
|---------|---------|
| Runtime Caching | Cache large or infrequently used resources, like images, at runtime, when they're first used. |
| Offline Fallbacks | Load fresh images, API responses, or other dynamic content from the network while online, but fall back to a cached placeholder while offline. |
| Goodbye Lie-Fi | Fight [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) by automatically falling back to a cached response when the network is too slow. |
| Battle Cache Bloat | That image from last month doesn't need to be cached forever. Least-recently used and age-based cache expiration helps free up space.|

## Generating a Service Worker

The [Workbox command-line tool](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-cli)
(`workbox-cli`) is a standalone CLI to generate a service worker and a file
manifest, that uses the `workbox-sw` module to end up with a fully-functioning
service worker.

Don't want to use yet another CLI? Workbox is also compatible with many
different build tools. The
[`workbox-build`](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-build)
module is a portable Node module that can generate a file manifest or service
worker to work with `workbox-sw`. Use the `workbox-build` module with
Gulp, NPM scripts, or many other Node-based build tools.

Workbox also includes a
[Webpack Plugin](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-webpack-plugin)
(`workbox-webpack-plugin`), which is exactly what it sounds like - a plugin for
Webpack for generating a service worker.

### Features

| Feature | Summary |
|---------|---------|
| Precache Your App Shell | Your web app's shell—its core HTML, JavaScript, and CSS—can be precached when a user visits your page. |
| Build-time Integration | Drop it into your existing build process. |
| Stay Fresh | Changes in your build update the service worker script. Users get updates, but you don't have to manually version your content or caches. |
| No Network, No Problem | Your static resources are served [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), quickly, whether or not there's a network available. |


## Offline Google Analytics

[Workbox Google Analytics](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-google-analytics)
temporarily holds and retries analytics requests to avoid losing them to network
disconnections. This tool easily installs to your build system using npm and is
easily imported into your service worker script. Configure it using a
parameterized function call.

### Features

| Feature | Summary |
|---------|---------|
| Offline Google Analytics | Creates fetch handlers that ensure the Google Analytics JavaScript is available offline. |
| Temporarily Caches Data | Holds analytics requests that are made when the device is offline and retries them the next time the service worker starts up. |
| Custom Replay Values | Key/value pairs to be added to replayed Google Analytics requests. For example, you might set a custom dimension to indicate that a request was replayed. |
| Modified Hit Parameters | Lets you programmatically modify a hit's parameters to, for example, track the elapsed time between when a hit is attempted and when it is replayed. |

## Background Sync

[Workbox Background Sync](https://github.com/GoogleChrome/workbox/tree/master/packages/workbox-background-sync)
queues failed requests and uses the
[Background Sync API](/web/updates/2015/12/background-sync) to replay those
requests when the user comes back online.

### Features

| Feature | Summary |
|---------|---------|
| Background Queuing | Manages a queue for replaying requests that have failed. |
| Granular Queue Control | Specifies how long a request should live in the queue before it is abandoned, and what to do when it succeeds. |
| Broadcast Channel Management | Supports updating the queued request's status over a Broadcast Channel, so that you can do things like provide the user with a notification if the request succeeds. |
