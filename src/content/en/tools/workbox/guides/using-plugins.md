project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to using plugins with Workbox.

{# wf_updated_on: 2020-09-22 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: n/a #}

# Using Plugins {: .page-title }

In a number of situations, it’s beneficial being able to manipulate a request
and response as it’s being fetched and cached as it allows you to add
additional behaviors to your service worker without writing substantial
boilerplate code.

Workbox Plugins allow you to add additional behaviors by manipulating
responses and requests during the lifecycle of a request.

Out of the box Workbox provides a number of plugins that you can use and
you can implement your own plugins if you want to add custom logic.

## Workbox Plugins

Workbox provides the following plugins:

* [`BackgroundSyncPlugin`](../reference-docs/latest/module-workbox-background-sync.BackgroundSyncPlugin):
  If a network request ever fails, add it to a background sync queue and retry
  the request when the next sync event is triggered.

* [`BroadcastUpdatePlugin`](../reference-docs/latest/module-workbox-broadcast-update.BroadcastUpdatePlugin):
  Whenever a cache is updated, dispatch a message on a Broadcast Channel or via
  `postMessage()`.

* [`CacheableResponsePlugin`](../reference-docs/latest/module-workbox-cacheable-response.CacheableResponsePlugin):
  Only cache requests that meet a certain criteria.

* [`ExpirationPlugin`](../reference-docs/latest/module-workbox-expiration.ExpirationPlugin):
  Manage the number and maximum age of items in the cache.

* [`RangeRequestsPlugin`](../reference-docs/latest/module-workbox-range-requests.RangeRequestsPlugin):
  Respond to requests that include a `Range:` header with partial content from
  a cache.

You can use these plugins with a Workbox strategy by adding an instance to
the `plugins` property:

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  ({request}) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);
```

## Custom Plugins

You can create your own plugins by passing in an object that has any of the
following methods:

* `cacheWillUpdate`: Called before a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response)
  is used to update a cache. You can alter the response before it's added to the
  cache or return null to avoid updating the cache at all.

* `cacheDidUpdate`: Called when a new entry is added to a cache or an existing
  entry is updated. Useful if you wish to perform an action after a cache
  update.

* `cacheKeyWillBeUsed`: Called before a request is used as a cache key, for
  both cache lookups (when `mode` is `'read'`) and cache writes (when `mode`
  is `'write'`). This can come in handy if you need to override or normalize
  your URLs prior to using them for cache access.

* `cachedResponseWillBeUsed`: Called prior to a response from the cache being
  used, this callback allows you to examine that response, and potentially
  return `null` or a different response to be used instead.

* `requestWillFetch`: This is called whenever a network request is about to be made.
  You can alter the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
  in this callback.

* `fetchDidFail`: Called when a network request fails, most likely due to a
  `NetworkError`. Note that this does **not** get called when a response with an
  error status, like `404 Not Found`, is returned from the network.

* `fetchDidSucceed`: Called when a network request is successful, regardless of
  what the HTTP status is of the response.

All of these functions will be called with `await` whenever a cache or fetch
event reaches the relevant point for the callback.

A plugin using all of these callbacks would look like this:

```javascript
const myPlugin = {
  cacheWillUpdate: async ({request, response, event, state}) => {
    // Return `response`, a different `Response` object, or `null`.
    return response;
  },
  cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse, event, state}) => {
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
  },
  cacheKeyWillBeUsed: async ({request, mode, params, event, state}) => {
    // `request` is the `Request` object that would otherwise be used as the cache key.
    // `mode` is either 'read' or 'write'.
    // Return either a string, or a `Request` whose `url` property will be used as the cache key.
    // Returning the original `request` will make this a no-op.
    return request;
  },
  cachedResponseWillBeUsed: async ({cacheName, request, matchOptions, cachedResponse, event, state}) => {
    // Return `cachedResponse`, a different `Response` object, or null.
    return cachedResponse;
  },
  requestWillFetch: async ({request, event, state}) => {
    // Return `request` or a different `Request` object.
    return request;
  },
  fetchDidFail: async ({originalRequest, request, error, event, state}) => {
    // No return expected.
    // NOTE: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  },
  fetchDidSucceed: async ({request, response, event, state}) => {
    // Return `response` to use the network response as-is,
    // or alternatively create and return a new `Response` object.
    return response;
  }
};
```

The `event` object passed to each plugin callback above represents the original event that triggered
the fetch or cache action. In some cases there will **not** be an original event, so your code
should check for its existence before referencing it. Also, when invoking the
[`handle()`](/web/tools/workbox/guides/advanced-recipes#handle) method of a strategy, the `event`
you pass to `handle()` will be the event passed to the plugin callbacks.

All plugin callbacks are also passed a `state` object which is unique to the particular plugin
object and strategy invocation (i.e. the call to `handle()`). This makes it possible to write
plugins where one callback can conditionally do something based on what another callback in the same
plugin did (e.g. compute the time delta between running `requestWillFetch()` and `fetchDidSucceed()`
or `fetchDidFail()`).

## Lifecycle Callbacks

Any of the following callbacks can be used to handle different points of the plugin lifecycle state: 

* `handlerWillStart`: Called before any handler logic starts running. This callback can be used to
  set the initial handler state (e.g. record the start time).

* `handlerWillRespond`: Called before the strategies `handle()` method returns a response. This
  callback can be used to modify that response before returning it to a route handler or other
  custom logic.

* `handlerDidRespond`: Called after the strategy's `handle()` method returns a response. This
  callback can be used to record any final response details, e.g. after changes made by other
  plugins.

* `handlerDidComplete`: Called after all [extend lifetime
  promises](https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises) added to
  the event from the invocation of this strategy have settled. This callback can be used to report
  on any data that needs to wait until the handler is done in order to calculate (e.g. cache hit
  status, cache latency, network latency).

* `handlerDidError`: Called if the handler was unable to provide a valid response from any source.
  This callback can be used to provide "fallback" content as an alternative to a network error.

A plugin using all of these callbacks would look like this:

```javascript
const myPlugin = {
  handlerWillStart: async ({request, event, state}) => {
    // No return expected. 
    // Can set initial handler state here.
  },
  handlerWillRespond: async ({request, response, event, state}) => {
    // Return `response` or a different `Response` object.
    return response;
  },
  handlerDidRespond: async ({request, response, event, state}) => {
    // No return expected. 
    // Can record final response details here.
  },
  handlerDidComplete: async ({request, response, error, event, state}) => {
    // No return expected. 
    // Can report any data here.
  },
  handlerDidError: async ({request, event, error, state}) => {
    // Return `response`, a different `Response` object as a fallback, or `null`.
    return response;
  },
};
```

Note: If you're implementing your own custom strategy, you do not have to worry about invoking any
of these callbacks yourself. This is all handled by the `Strategy` base class.

## Third-party Plugins

We encourage developers to hook into Workbox's lifecycle events in creative
ways, and publish your custom plugins as a module.

The following third-party plugins are available:

- [`cloudinary-workbox-plugin`](https://www.npmjs.com/package/cloudinary-workbox-plugin),
which [dynamically rewrites](https://blog.fullstacktraining.com/a-cloudinary-plugin-for-workbox/)
requests for images hosted on Cloudinary, based on the
[current connection speed](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API).

You may be able to [find more](https://www.npmjs.com/search?q=keywords:workbox-plugin) by searching
in npm's repository.

If you've built a Workbox plugin that you'd like to share, add the `'workbox-plugin'`
[keyword](https://docs.npmjs.com/files/package.json#keywords) when you publish it. And let us know
via [@WorkboxJS](https://twitter.com/workboxjs)!
