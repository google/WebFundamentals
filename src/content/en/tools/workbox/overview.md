---
layout: page
title: Overview
---

# Overview

Workbox is a collection of libraries and build tools that make it easy to
store your website's resources locally, on your users' devices. Consider
Workbox if you want to:

* Make your site work offline.
* Improve load performance on repeat-visits. You can use Workbox to store
  and serve common resources locally, rather than from the network.

## The technology behind Workbox

Modern offline web apps are possible thanks to [**service workers**][sw].
Service workers are background workers, written in JavaScript, that can
locally store all of the resources needed to run your site offline.

[sw]: https://developers.google.com/web/fundamentals/getting-started/primers/service-workers

You can think of a service worker as a [proxy server][proxy] that's running in
the background of your users' devices. Your site makes a request for a
resource, the service worker intercepts the request, and then decides
whether to serve a local version of the resource or to fetch a fresh version
from the network.

[proxy]: https://en.wikipedia.org/wiki/Proxy_server

The place where Workbox stores resources locally is called the **cache**.
The act of storing locally is called **caching**. This is because the
underlying technology that Workbox relies on is called the [Cache API][cache].
This is completely different than [HTTP caching][http]. The main benefit
that Workbox provides over HTTP caching is that it can cache resources *before*
they're requested, whereas HTTP caching can only do so after the user goes to
a page where the resource is required. Storing resources before they're
actually required is called **precaching**. Precaching HTML documents is
one of the main ways that Workbox can improve your load performance. Rather
than going to the network for the document, Workbox just serves it from the
cache.

[cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[http]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching

The logic for determining whether to serve a resource from the cache or to
fetch a fresh version is called the **caching strategy** for that resource.
It's common to use different caching strategies for different types of
resources. For example:

* For a logo that doesn't change often, you can probably serve it from the
  cache.
* For a JSON file containing a user's social media feed, you probably want
  to display the cached content only while you fetch the latest content.

## What problems Workbox solves

In short, Workbox makes it easy to create optimal service worker code.

Manually maintaining caches is tedious and full of pitfalls.
The "core" Workbox libraries and tools make it easy to automatically
generate a service worker that correctly caches resources.

If you need to use different caching strategies for different types of
resources, Workbox also simplifies this process. Much of the logic can be
reduced to declarative build-time configurations. The rest of it can be
abstracted away by calling the core `workbox-sw` runtime library from your
custom service worker code.

Workbox also intelligently manages updates to precached resources. In other
words, when a resource is changed, Workbox only downloads the changed
resource and leaves the rest of the cache untouched. This is a subtle but
important optimization. Other solutions invalidate the entire cache when a
single resource is updated, causing the service worker to re-download every
resource.

## How you use Workbox

The general workflow for integrating Workbox into your project is:

1. Create a configuration file telling Workbox which resources to cache.
1. Run one of the Workbox tools in your project directory before each deploy.
   Workbox generates the service worker code needed for caching and updating
   the resources.

There are a few Workbox tools, each one built for a different workflow:

* `workbox-webpack-plugin` is for webpack.
* `workbox-build` for Node-based tools like Gulp and Grunt.
* `workbox-cli` for npm scripts or for manually generating the code from
  the command line.

If you've got a simple site, it may suffice to let Workbox generate the
entire service worker for you. See [`generateSW()`][generateSW] for an
example.

[generateSW]: /reference-docs/latest/module-workbox-build.html#.generateSW

If you've got a complex site, chances are that you're going to need to set
up some custom routing logic. In that case, you can write a custom service
worker that injects the Workbox code into your service worker. For example,
the code that you write may look something like this:

```javascript
importScripts('/path/to/workbox-sw.js'); // not the actual filename
const workbox = new WorkboxSW();

// your custom service worker logic here

workbox.precache([]);
```

After running the code through a Workbox tool, the final, generated code looks
like this:

```javascript
importScripts('/path/to/workbox-sw.js'); // not the actual filename
const workbox = new WorkboxSW();

// your custom service worker logic here

workbox.precache([
  {
    "url": "/index.html",
    "revision": "b3e78d93b20c49d0c927050682c99df3"
  },
  {
    "url": "/images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },
]);
```

See [`injectManifest()`][injectManifest] for an example.

[injectManifest]: /reference-docs/latest/module-workbox-build.html#.injectManifest

## Feedback

Still not clear on what Workbox is all about? We'd love to hear your
thoughts. [Please open an issue on our docs repo][feedback] and tell us more.

[feedback]: https://github.com/GoogleChrome/workbox-microsite/issues/new?title=[Overview]
