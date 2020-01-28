project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to using plugins with Workbox.

{# wf_updated_on: 2020-01-15 #}
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
  /\.(?:png|gif|jpg|jpeg|svg)$/,
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
  cacheWillUpdate: async ({request, response, event}) => {
    // Return `response`, a different `Response` object, or `null`.
    return response;
  },
  cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse, event}) => {
    // No return expected
    // Note: `newResponse.bodyUsed` is `true` when this is called,
    // meaning the body has already been read. If you need access to
    // the body of the fresh response, use a technique like:
    // const freshResponse = await caches.match(request, {cacheName});
  },
  cacheKeyWillBeUsed: async ({request, mode}) => {
    // `request` is the `Request` object that would otherwise be used as the cache key.
    // `mode` is either 'read' or 'write'.
    // Return either a string, or a `Request` whose `url` property will be used as the cache key.
    // Returning the original `request` will make this a no-op.
    return request;
  },
  cachedResponseWillBeUsed: async ({cacheName, request, matchOptions, cachedResponse, event}) => {
    // Return `cachedResponse`, a different `Response` object, or null.
    return cachedResponse;
  },
  requestWillFetch: async ({request}) => {
    // Return `request` or a different `Request` object.
    return request;
  },
  fetchDidFail: async ({originalRequest, request, error, event}) => {
    // No return expected.
    // NOTE: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  },
  fetchDidSucceed: async ({request, response}) => {
    // Return `response` to use the network response as-is,
    // or alternatively create and return a new `Response` object.
    return response;
  }
};
```

Note: the `event` object passed to each plugin callback above represents the
original event that triggered the fetch or cache action. In some cases there
will **not** be an original event, so your code should check for its existence
before referencing it. Also, when invoking the
[`handle()`](/web/tools/workbox/guides/advanced-recipes#handle)
method of a strategy, the `event` you pass to `handle()` will be the event
passed to the plugin callbacks.

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
