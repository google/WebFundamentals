project_path: /web/tools/workbox/v3/_project.yaml
book_path: /web/tools/workbox/v3/_book.yaml
description: A common recipes to use with Workbox.

{# wf_updated_on: 2017-11-15 #}
{# wf_published_on: 2017-11-15 #}

# Common Recipes {: .page-title }

{% include "web/tools/workbox/v3/_shared/alpha.html" %}

This page contains a set of example caching strategies you can use with Workbox.

## Google Fonts

You can use a cache first strategy to cache the Google Fonts in your page.
Here we've limited the cache to 30 entries to ensure we don't balloon a users
device.

```javascript
workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    cacheExpiration: {
      maxEntries: 30
    }
  })
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
    cacheExpiration: {
      maxEntries: 60,
      maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
    }
  })
);
```

## Cache CSS and JavaScript Files

You can use a stale while revalidate for CSS and JavaScript files that
aren't precached.

```javascript
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'static-resources'
  })
);
```

## Caching Content from Multiple Origins

You can create regular expressions to cache similar requests from multiple
origins in a single route. For example, you can cache assets from origins
like `googleapis.com` and `gstatic.com` with a single route.

```javascript
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate()
);
```

An alternative to the above example is to cache the origins separately to
store assets in  cache for each origin.

```javascript
workbox.routing.registerRoute(
  /.*(?:googleapis)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'googleapis'
  })
);

workbox.routing.registerRoute(
  /.*(?:gstatic)\.com.*$/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'gstatic'
  })
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
        cacheExpiration: {
            maxEntries: 50,
            maxAgeSeconds: 5 * 60 // 5 minutes
        },
        cacheableResponse: {statuses: [0, 200]}
    })
);

```

## Cache Resources from a Specific Subdirectory

You can use a regular expression to easily route requests to files in a
specific directory. If we wanted to route requests to files in `/static/`,
we could use the regular expression `new RegExp('/static/.*/')`, like so:

```javascript
workbox.routing.registerRoute(
  new RegExp('/static/(.*)'),
  workbox.strategies.staleWhileRevalidate()
);
```
