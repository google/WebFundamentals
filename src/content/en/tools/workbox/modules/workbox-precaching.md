project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-core.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-07-21 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Precaching {: .page-title }

## What is Precaching?

One feature of service workers is the ability to save a set of files to the
cache when the service worker is installing. This is often referred to as
"precaching", since you are caching content ahead of the service worker being
used.

The main reason for doing this is that it gives developers control over the
cache, meaning they can determine when and how long a file is cached as well
as serve it to the browser without going to the network, meaning it can be
used to create web apps that work offline.

Workbox takes a lot of the heavy lifting out of precaching by simplifying
the API and ensuring assets are downloaded efficiently.

## How workbox-precaching Works

When a web app is loaded for the first time, `workbox-precaching` will look at all
the assets you want to download, remove any duplicates and hook up the relevant
service worker events to download and store the assets. URLs that
[already include](/web/tools/workbox/modules/workbox-build#generateSW-dontCacheBustURLsMatching)
versioning information (like a content hash) are used as cache keys without any
further modification. URLs that don't include versioning information have an extra
URL query parameter appended to their cache key representing a hash of their content
that Workbox generates at build time.

`workbox-precaching` does all of this during the service worker's
[`install` event](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Install_and_activate_populating_your_cache).

When a user later revisits your web app and you have a new service worker with
different precached assets, `workbox-precaching` will look at the new list
and determine which assets are completely new and which of the existing assets
need updating, based on their revisioning. Any new assets, or updating revisions,
will be added to the cache during the new service worker's `install` event.

This new service worker won't be used to respond to requests until its `activate`
event has been triggered. It’s in the `activate` event that `workbox-precaching`
will check for any cached assets that are no longer present in the
[list](#explanation_of_the_precache_list) of current URLs, and remove those from
the cache.

`workbox-precaching` will perform these steps each time your service worker is installed
and activated, ensuring the user has the latest assets, and only downloading the
files that have changed.

### Serving Precached Responses

Calling
[`workbox.precaching.precacheAndRoute()`](/web/tools/workbox/reference-docs/latest/workbox.precaching#.precacheAndRoute)
or
[`workbox.precaching.addRoute()`](/web/tools/workbox/reference-docs/latest/workbox.precaching#.addRoute)
will create a [route](/web/tools/workbox/modules/workbox-routing) that matches requests for
precached URLs.

The response strategy used in this route is
[cache-first](/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network):
the precached response will be used, unless that cached response is not present (due to some
unexpected error), in which case a network response will be used instead.

The order in which you call `workbox.precaching.precacheAndRoute()` or
`workbox.precaching.addRoute()` is important. You would normally want to call it early on in your
service worker file, before registering any additional routes with
`workbox.routing.registerRoute()`. If you did call `workbox.routing.registerRoute()` first, and that
route matched an incoming request, whatever strategy you defined in that additional route will be
used to respond, instead of the cache-first strategy used by `workbox-precaching`.

## Explanation of the Precache List

`workbox-precaching` expects an array of strings or an array of objects:

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/example.ac29.css',
  { url: '/index.html', revision: 'abcd1234' },
  // ... other entries ...
]);
```

This array is sometimes referred to as a precache manifest.

This list references a set of URLs, each with their own piece of "revisioning"
information. For the first item in the example above,
`'/styles/example.ac29.css'`, the revisioning information
**is in the URL itself**. This is a best practice for web as it allows
browsers to safely cache these URLs for a long time. Assets with inline content hash
revisioning can be added to the precache list as is.

For assets where you don't have revisioning information in the URL,
**there must be a revision property, which should be an auto-generated hash of the file contents**.
This allows `workbox-precaching` to know when the file has changed and update it.

Workbox comes with tools to help with generating this list:

- `workbox-build`: This is an npm module that can be used in a gulp task or as
  an npm run script.
- `workbox-webpack-plugin`: webpack users can use this plugin.
- `workbox-cli`: Our CLI can also be used to generate the list of assets and add
  them to your service worker.

Warning: It's strongly recommended that you use one of Workbox's build tools to [generate this
precache manifest](/web/tools/workbox/guides/precache-files/#generating_a_precache_manifest).
**Never hardcode revision info into a "hand written" manifest, as precached URLs will not be kept up
to date unless the revision info reflects the URL's contents!**

## Incoming Requests for Precached Files

One thing that `workbox-precaching` will do out of the box is manipulate
the incoming network requests to try and match precached files. This
accommodates for common practices on the web.

For example, a request for `/` can usually be satisfied by the file at
`/index.html`.

Below is the list of manipulations that `workbox-precaching` performs by default,
and how you can alter that behavior.

### Ignore URL Parameters

Requests with search parameters can be altered to remove specific values, or
remove all values.

By default, search parameters starting with `utm_` are removed, meaning that a request for
`/about.html?utm_campaign=abcd` will be fulfilled with a precached entry for `/about.html`.

You can ignore a different set of search parameters using `ignoreURLParametersMatching`:

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/index.0c9a31.css',
  '/scripts/main.0d5770.js',
  { url: '/index.html', revision: '383676' },
], {
  // Ignore all URL parameters.
  ignoreURLParametersMatching: [/.*/]
});
```

### Directory Index

Requests ending in a `/` will, by default, be matched against entries with an `index.html` appended
to the end. This means an incoming request for `/` can automatically be handled with the precached
entry `/index.html`.

You can alter this to something else, or disable it completely, by setting `directoryIndex`:

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/index.0c9a31.css',
  '/scripts/main.0d5770.js',
  { url: '/index.html', revision: '383676' },
], {
  directoryIndex: null,
});
```

### Clean URLs

If a request fails to match the precache, we'll add `.html` to the end to support
"clean" URLs (a.k.a. "pretty" URLs). This means a request like `/about` will
be handled by the precached entry for `/about.html`.

You can disable this behavior by setting `cleanUrls`:

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/index.0c9a31.css',
  '/scripts/main.0d5770.js',
  { url: '/index.html', revision: '383676' },
], {
  cleanUrls: false,
});
```

### Custom Manipulations

If you want to define custom matches from incoming requests to precached assets,
you can do so with the `urlManipulation` option. This should be a callback
that returns an array of possible matches.

```javascript
workbox.precaching.precacheAndRoute([
  '/styles/index.0c9a31.css',
  '/scripts/main.0d5770.js',
  { url: '/index.html', revision: '383676' },
], {
  urlManipulation: ({url}) => {
    // Your logic goes here...
    return [alteredUrlOption1, alteredUrlOption2];
  }
});
```

## Advanced Usage

### Using PrecacheController Directly

By default, `workbox-precaching` will set up the `install` and `activate` listeners for you.
For developers familiar with service workers, this may not be desirable if you need more control.

Instead of using the default export, you can use the
[`PrecacheController`](/web/tools/workbox/reference-docs/latest/module-workbox-precaching.PrecacheController)
directly to add items to the precache, determine when these assets are installed, and
when cleanup should occur.

```javascript
const precacheController = new workbox.precaching.PrecacheController();
precacheController.addToCacheList([
  '/styles/example-1.abcd.css',
  '/styles/example-2.1234.css',
  '/scripts/example-1.abcd.js',
  '/scripts/example-2.1234.js',
]);

precacheController.addToCacheList([{
  url: '/index.html',
  revision: 'abcd',
}, {
  url: '/about.html',
  revision: '1234',
}]);

self.addEventListener('install', (event) => {
  event.waitUntil(precacheController.install());
});
self.addEventListener('activate', (event) => {
  event.waitUntil(precacheController.activate());
});
self.addEventListener('fetch', (event) => {
  const cacheKey = precacheController.getCacheKeyForURL(event.request.url);
  event.respondWith(caches.match(cacheKey).then(...));
});
```

### Reading Precached Assets Directly

There are times when you might need to read a precached asset directly, outside
the context of the routing that `workbox-precaching` can automatically perform.
For instance, you might want to precache partial HTML templates that then need
to be retrieved and used when constructing a full response.

In general, you can use the
[Cache Storage API](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage)
to obtain the precached `Response` objects, but there is one wrinkle: the URL
cache key that needs to be used when calling [`cache.match()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/match)
might contain a versioning parameter that `workbox-precaching` automatically
creates and maintains.

The best practice is to call `workbox.precaching.getCacheKeyForURL()`, passing
in the original URL, and then use the result to perform a `cache.match()` on the
appropriate cache. In practice, this looks like:

```javascript
const cache = await caches.open(workbox.core.cacheNames.precache);
const response = await cache.match(
  workbox.precaching.getCacheKeyForURL('/precached-file.html')
);
```

Note: If you are
[using your own `PrecacheController` instance](#using_precachecontroller_directly),
instead of using the default instance via `workbox.precaching.*`, you should
call the
[`getCacheKeyForURL()` method](/web/tools/workbox/reference-docs/latest/module-workbox-precaching.PrecacheController#getCacheKeyForURL)
on that instance.

### Clean Up Old Precaches

Most releases of Workbox maintain the same format for storing precached data,
and precaches created by older versions of Workbox can normally be used as-is by
newer releases. Rarely, though, there is a breaking change in precaching storage
that requires existing users to re-download everything, and which renders
previously precached data obsolete. (Such a change happened in between the
Workbox v3 and v4 releases.)

This obsolete data shouldn't interfere with normal operations, but it does
contribute towards your overall storage quota usage, and it can be friendlier to
your users to explicitly delete it. You can do this by adding
`workbox.precaching.cleanupOutdatedCaches()` to your service worker, or setting
`cleanupOutdatedCaches: true` if you're using one of Workbox's build tools to
generate your service worker.
