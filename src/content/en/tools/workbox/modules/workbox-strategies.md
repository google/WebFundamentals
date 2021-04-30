project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-routing.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2021-04-27 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Strategies {: .page-title }

## What are Workbox Strategies?

When service workers were first introduced, a set of common caching strategies
emerged. A caching strategy is a pattern that determines how a service worker
generates a response after receiving a fetch event.

`workbox-strategies` provides the most common caching strategies so it’s easy to
apply them in your service worker.

We won’t go into much detail outside of the strategies supported by Workbox,
but you can [learn more in the Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/).

## Using Strategies

In the following examples, we’ll show you how to use the Workbox caching
strategies with `workbox-routing`. There are some options you can define with
each strategy that are covered in the
[Configuring Strategies section of this doc](#configuring_strategies).

In the [Advanced Usage section](#advanced_usage), we’ll cover how you can use
the caching strategies directly without `workbox-routing`.

### Stale-While-Revalidate

![Stale While Revalidate Diagram](../images/modules/workbox-strategies/stale-while-revalidate.png)

The [stale-while-revalidate](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)
pattern allows you to respond to the request as quickly as possible with a
cached response if available, falling back to the network request if it’s
not cached. The network request is then used to update the cache. As opposed to
[some implementations](https://github.com/GoogleChrome/workbox/issues/2807)
of stale-while-revalidate, this strategy will always make a revalidation request,
regardless of the age of the cached response.

This is a fairly common strategy where having the most up-to-date resource
is not vital to the application.

```javascript
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/images/avatars/'),
  new StaleWhileRevalidate()
);
```

### Cache First (Cache Falling Back to Network)

![Cache First Diagram](../images/modules/workbox-strategies/cache-first.png)

Offline web apps will rely heavily on the cache, but for assets that are
non-critical and can be gradually cached, a
[cache first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)
is the best option.

If there is a Response in the cache, the Request will be fulfilled using the
cached response and the network will not be used at all. If there isn't a cached
response, the Request will be fulfilled by a network request and the response
will be cached so that the next request is served directly from the cache.

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

registerRoute(
  ({request}) => request.destination === 'style',
  new CacheFirst()
);
```

### Network First (Network Falling Back to Cache)

![Network First Diagram](../images/modules/workbox-strategies/network-first.png)

For requests that are updating frequently, the
[network first](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)
strategy is the ideal solution. By default, it will try to fetch the latest
response from the network. If the request is successful, it’ll put the response
in the cache. If the network fails to return a response, the cached response
will be used.

```javascript
import {registerRoute} from 'workbox-routing';
import {NetworkFirst} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/social-timeline/'),
  new NetworkFirst()
);
```

### Network Only

![Network Only Diagram](../images/modules/workbox-strategies/network-only.png)

If you require specific requests to be fulfilled from the network, the
[network only](/web/fundamentals/instant-and-offline/offline-cookbook/#network-only)
is the strategy to use.

```javascript
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/admin/'),
  new NetworkOnly()
);
```

### Cache Only

![Cache Only Diagram](../images/modules/workbox-strategies/cache-only.png)

The [cache only](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-only)
strategy ensures that responses are obtained from a cache. This is less common
in workbox, but can be useful if you have your own precaching step.

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheOnly} from 'workbox-strategies';

registerRoute(
  ({url}) => url.pathname.startsWith('/app/v2/'),
  new CacheOnly()
);
```

## Configuring Strategies

All of the strategies allow you to configure:

- The name of the cache to use in the strategy.
- Cache expiration restrictions to use in the strategy.
- An array of plugins that will have their lifecycle methods called when
  fetching and caching a request.

### Changing the Cache Used by a Strategy

You can change the cache a strategy used by supplying a cache name. This is
useful if you want to separate out your assets to help with debugging.

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
  })
);
```

### Using Plugins

Workbox comes with a set of plugins that can be used with these strategies.

- [workbox-background-sync](/web/tools/workbox/reference-docs/latest/module-workbox-background-sync)
- [workbox-broadcast-update](/web/tools/workbox/reference-docs/latest/module-workbox-broadcast-update)
- [workbox-cacheable-response](/web/tools/workbox/reference-docs/latest/module-workbox-cacheable-response)
- [workbox-expiration](/web/tools/workbox/reference-docs/latest/module-workbox-expiration)
- [workbox-range-requests](/web/tools/workbox/reference-docs/latest/module-workbox-range-requests)

To use any of these plugins (or a custom plugin), you just need to pass in
instances to the `plugins` option.

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Only cache requests for a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
        // Only cache 10 requests.
        maxEntries: 10,
      }),
    ]
  })
);
```

## Custom Strategies

In addition to configuring strategies, Workbox allows you to create your own custom strategies.
This can be done by importing and extending the `Strategy` base class from `workbox-strategies`:

```javascript
import {Strategy} from 'workbox-strategies';

class NewStrategy extends Strategy {
  _handle(request, handler) {
    // Define handling logic here
  }
}
```

In this example, `handle()` is used as a request strategy to define specific handling logic. There
are two request strategies that can be used:

* `handle()`: Perform a request strategy and return a `Promise` that will resolve with a `Response`,
  invoking all [relevant plugin
  callbacks](/web/tools/workbox/guides/using-plugins#lifecycle_callbacks).
* `handleAll()`: Similar to `handle()`, but returns two `Promise` objects. The first is
  equivalent to what `handle()` returns and the second will resolve when promises that were
  added to `event.waitUntil()` within the strategy have completed.

Both request strategies are invoked with two parameters:

- `request`: The `Request` the strategy will return a response for.
- `handler`: A `StrategyHandler` instance automatically created for the current strategy.

### Creating A New Strategy

The following is an example of a new strategy that re-implements the behavior of `NetworkOnly`:

```javascript
class NewNetworkOnlyStrategy extends Strategy {
  _handle(request, handler) {
    return handler.fetch(request);
  }
}
```

Notice how `handler.fetch()` is called instead of the native `fetch` method. The `StrategyHandler`
class provides a number of fetch and cache actions that can be used whenever `handle()` or
`handleAll()` is used:

* `fetch`: Fetches a given request, and invokes the `requestWillFetch()`, `fetchDidSucceed()`, and
  `fetchDidFail()` plugin lifecycle methods
* `cacheMatch`: Matches a request from the cache, and invokes the `cacheKeyWillByUsed()` and
  `cachedResponseWillByUsed()` plugin lifecycle methods
* `cachePut`: Puts a request/response pair in the cache, and invokes the `cacheKeyWillByUsed()`,
  `cacheWillUpdate()`, and `cacheDidUpdate()` plugin lifecycle methods 
* `fetchAndCachePut`: Calls `fetch()` and runs `cachePut()` in the background on the response
  generated by `fetch()`.
* `hasCallback`: Takes a callback as input and returns true if the strategy has at least one plugin
  with the given callback.
* `runCallbacks`: Runs all plugin callbacks matching a given name, in order, passing a given param
  object (merged with the current plugin state) as the only argument.
* `iterateCallbacks`: Accepts a callback and returns an iterable of matching plugin callbacks, where
  each callback is wrapped with the current handler state (i.e. when you call each callback,
  whatever object parameter you pass it will be merged with the plugin's current state).
* `waitUntil`: Adds a promise to the extend lifetime promises of the event event associated with the
  request being handled (usually a `FetchEvent`).
* `doneWaiting`: Returns a promise that resolves once all promises passed to `waitUntil()` have
  settled.
* `destroy`: Stops running the strategy and immediately resolves any pending `waitUntil()` promises.

Note: Refer to the [source
implementation](https://github.com/GoogleChrome/workbox/blob/6d38919ebbc9664327e19ff00302d805c8166170/packages/workbox-strategies/src/StrategyHandler.ts)
of `StrategyHandler` to see all the parameters accepted by each action

### Custom Cache Network Race Strategy

The following example is based on
[cache-network-race](https://jakearchibald.com/2014/offline-cookbook/#cache--network-race) from the
Offline Cookbook (which Workbox does not provide), but goes a step further and always updates the
cache after a successful network request. This in an example of a more complex strategy that uses
multiple actions.

```javascript
import {Strategy} from 'workbox-strategies';

class CacheNetworkRace extends Strategy {
  _handle(request, handler) {
    const fetchAndCachePutDone = handler.fetchAndCachePut(request);
    const cacheMatchDone = handler.cacheMatch(request); 

    return new Promise((resolve, reject) => {
      fetchAndCachePutDone.then(resolve);
      cacheMatchDone.then((response) => response && resolve(response));

      // Reject if both network and cache error or find no response.
      Promise.allSettled([fetchAndCachePutDone, cacheMatchDone]).then((results) => {
        const [fetchAndCachePutResult, cacheMatchResult] = results;
        if (fetchAndCachePutResult.status === 'rejected' && !cacheMatchResult.value) {
          reject(fetchAndCachePutResult.reason);
        }  
      });
    });
  }
}
```

## Advanced Usage

If you want to use the strategies in your own fetch event logic, you can
use the strategy classes to run a request through a specific strategy.

For example, to use the stale-while-revalidate strategy, you can do the
following:

```javascript
self.addEventListener('fetch', (event) => {
  const {request} = event;
  const url = new URL(request.url);

  if (url.origin === location.origin && url.pathname === '/') {
    event.respondWith(new StaleWhileRevalidate().handle({event, request}));
  }
});
```

You can find the list of available classes in the
[workbox-strategies reference docs](/web/tools/workbox/reference-docs/latest/module-workbox-strategies).
