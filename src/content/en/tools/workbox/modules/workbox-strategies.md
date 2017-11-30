project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/next/_book.yaml
description: The module guide for workbox-routing.

{# wf_updated_on: 2017-11-27 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Strategies {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

[Demo](https://workbox-demos.firebaseapp.com/demo/workbox-strategies/) | [Reference Docs](http://localhost:8080/web/tools/workbox/reference-docs/latest/workbox.strategies)

## What are Workbox Strategies?

When service workers were first introduced, a set of common caching strategies
emerged. A caching strategy is a pattern that determines how a service worker
generates a response after receiving a fetch event.

`workbox-strategies` provides the most common caching strategies so it’s easy to
apply them in your service worker.

We won’t go into much detail outside of the strategies supported by Workbox,
but you can [learn more in the Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/).

## Using Strategies

In the following examples we’ll show you how to use the Workbox caching
strategies with `workbox-routing`. There are some options you can define with
each strategy that is covered in the
[Configuring Strategies section of this doc](#configuring_strategies).

In the [Advanced Usage section](#advanced_usage) we’ll cover how you can use
the caching strategies directly without `workbox-routing`.

### Stale-While-Revalidate

![Stale While Revalidate Diagram](../images/modules/workbox-strategies/stale-while-revalidate.png)

The [stale-while-revalidate ](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
pattern allows you to respond the request as quickly as possible with a
cached response if available, falling back to the network request if it’s
not cached. The network request is then used to update the cache.

This is a fairly common strategy where having the most up-to-date resource
is not vital to the application.

```javascript
workbox.routing(
  new RegExp('/images/avatars/'),
  workbox.strategies.staleWhileRevaliate()
);
```

### Cache First (Cache Falling Back to Network)

![Cache First Diagram](../images/modules/workbox-strategies/cache-first.png)

Offline webapps will rely heavily on the cache, but for assets that are
non-critical and can be gradually cached, a
[cache first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
is the best option.

If there is a Response in the cache, the Request will be fulfilled using the
cached response, the network will not be used at all. If there isn't a cached
response, the Request will be fulfilled by a a network request and the response
will be cached so that the next request is served directly from the cache.

```javascript
workbox.routing(
  new RegExp('/styles/'),
  workbox.strategies.cacheFirst()
);
```

### Network First (Network Falling Back to Cache)

![Network First Diagram](../images/modules/workbox-strategies/network-first.png)

For requests that are updating frequently, the
[network first](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)
strategy is the ideal solution. By default it will try and fetch the latest
request from the network. If the request is successful, it’ll put the response
in the cache. If the network fails to return a response, the caches response
will be used.

```javascript
workbox.routing(
  new RegExp('/social-timeline/'),
  workbox.strategies.networkFirst()
);
```

### Network Only

![Network Only Diagram](../images/modules/workbox-strategies/network-only.png)

If you require specific requests to be fulfilled from the network, the
[network first](/web/fundamentals/instant-and-offline/offline-cookbook/#network-only)
is the strategy to use.

```javascript
workbox.routing(
  new RegExp('/admin/'),
  workbox.strategies.networkOnly()
);
```

### Cache Only

![Cache Only Diagram](../images/modules/workbox-strategies/cache-only.png)

The [cache only](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only)
strategy ensures that requests are obtained from a cache. This is less common
in workbox, but can be useful if you have your own precaching step.

```javascript
workbox.routing(
  new RegExp('/app/v2/'),
  workbox.strategies.cacheOnly()
);
```

## Configuring Strategies

All of the strategies allow you to configure:

- The name of the cache to use in the strategy.
- Cache expiration restrictions to use in the strategy.
- An array of plugins that will have their life cycle methods called when
  fetching and caching a request.

### Changing the Cache Used by a Strategy
You can change the cache a strategy used by supplying a cache name. This is
useful if you want to separate out your assets to help with debugging.

```javascript
workbox.routing.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache'
  }
);
```

### Setting a Cache Expiration
There may be scenarios where you want to enforce a limit of how long an
asset is cached and / or restrict the number of entries that are cached.

To do this, you can define some `cacheExpiration` options and Workbox will
create and add a
[CacheExpirationPlugin](../reference-docs/latest/workbox.expiration.CacheExpirationPlugin)
to the strategy.

```javascript
workbox.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.cacheFirst({
    cacheName: 'image-cache',
    cacheExpiration: {
      // Only cache requests for a week
      maxAgeSeconds: 7 * 24 * 60 * 60,
      // Only cache 10 requests.
      maxEntries: 10,
    }
  }
);
```

### Add Custom Plugins

Each strategy can have additional plugins used during fetching and caching
requests, allowing extra functionality (like the `CacheExpirationPlugin`
mentioned above).

```javascript
const myCustomPlugin = {
  cachedResponseWillBeUsed: ({cacheName,request,cachedResponse}) => {
    // TODO: Return the `cachedResponse`, a different Response or null

    // NOTE: This can be synchronous or return a Promise that resolves
    // to a Response or null.
    ...
  },
  ...
};

workbox.registerRoute(
  new RegExp('/images/'),
  workbox.strategies.cacheFirst({
    plugins: [
       myCustomPlugin,
    ]
  }
);
```

## Advanced Usage

If you want to use the strategies in your own fetch event logic you can use
use the strategy classes to run a request through a specific strategy.

For example, to implement the stale-while-revalidate class you can do the
following:

```javascript
self.addEventListener('fetch', (event) => {
  if (event.request.url === '/') {
    const staleWhileRevalidate = new workbox.strategies.StaleWhileRevalidate();
    event.respondWith(staleWhileRevalidate.handle({event}));
  }
});
```

You can find the list of available classes in the
[workbox-strategies reference docs](../reference-docs/latest/workbox.strategies).
