project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Common recipes to use with Workbox.

{# wf_updated_on: 2018-05-22 #}
{# wf_published_on: 2017-11-15 #}
{# wf_blink_components: N/A #}

# Common Recipes {: .page-title }

This page contains a set of example caching strategies you can use with Workbox.

## Google Fonts

You can use a cache first strategy to cache the Google Fonts in your page.
Here we've limited the cache to 30 entries to ensure we don't balloon a users
device.

```javascript
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  }),
);
```

## Caching Images

You can capture and caching images with a cache first strategy based on
the extension.

```javascript
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
```

## Cache CSS and JavaScript Files

You can use a stale while revalidate for CSS and JavaScript files that
aren't precached.

```javascript
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources',
  }),
);
```

## Caching Content from Multiple Origins

You can create regular expressions to cache similar requests from multiple
origins in a single route. For example, you can cache assets from origins
like `googleapis.com` and `gstatic.com` with a single route.

```javascript
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate(),
);
```

An alternative to the above example is to cache the origins separately to
store assets in  cache for each origin.

```javascript
workbox.routing.registerRoute(
  /.*(?:googleapis)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'googleapis',
  }),
);

workbox.routing.registerRoute(
  /.*(?:gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'gstatic',
  }),
);
```

## Restrict Caches for a Specific Origin

You can cache assets for a specific origin and apply expiration rules on
that cache. For example, the example below caches up to 50 requests for
up to 5 minutes.

```javascript
workbox.routing.registerRoute(
    'https://hacker-news.firebaseio.com/v0/*',
    workbox.strategies.cacheFirst({
        cacheName: 'stories',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 minutes
          }),
          new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
          }),
        ],
    }),
);
```

## Force a Timeout on Network Requests

There may be network requests that would be beneficial if they were served
from the network, but could benefit by being served by the cache if the
network request is taking too long.

For this, you can use a `NetworkFirst` strategy with the
`networkTimetoutSeconds` option configured.

```javascript
workbox.routing.registerRoute(
    'https://hacker-news.firebaseio.com/v0/*',
    workbox.strategies.networkFirst({
        networkTimetoutSeconds: 3,
        cacheName: 'stories',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 5 * 60, // 5 minutes
          }),
        ],
    }),
);
```

## Cache Resources from a Specific Subdirectory

You can use a regular expression to easily route requests to files in a
specific directory. If we wanted to route requests to files in `/static/`,
we could use the regular expression `new RegExp('/static/.*/')`, like so:

```javascript
workbox.routing.registerRoute(
  new RegExp('/static/(.*)'),
  workbox.strategies.staleWhileRevalidate(),
);
```

## Access Caches from Your Web App's Code

The [Cache Storage
API](/web/fundamentals/instant-and-offline/web-storage/cache-api) is available
for use in both service worker and in the context of `window` clients. If you
want to make changes to caches—add or remove entries, or get a list of cached
URLs—from the context of your web app, you can do so directly, without having to
communicate with the service worker via `postMessage()`.

For instance, if you wanted to add a URL to the a given cache in response to a
user action in your web app, you can use code like the following:

```javascript
// Inside app.js:

async function addToCache(urls) {
  const myCache = await window.caches.open('my-cache');
  await myCache.addAll(urls);
}

// Call addToCache whenever you'd like. E.g. to add to cache after a page load:
window.addEventListener('load', () => {
  // ...determine the list of related URLs for the current page...
  addToCache(['/static/relatedUrl1', '/static/relatedUrl2']);
});
```

The cache name, `'my-cache'`, can then be referred to when setting up a route in
your service worker, and that route can take advantage of any cache entries
that were added by the web page itself:

```javascript
// Inside service-worker.js:

workbox.routing.registerRoute(
  new RegExp('^/static/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'my-cache', // Use the same cache name as before.
  })
);
```
