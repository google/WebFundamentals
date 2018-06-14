project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to using plugins with Workbox.

{# wf_updated_on: 2018-06-14 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: n/a #}

# Using Plugins {: .page-title }

In a number of situations it’s beneficial being able to manipulate a request
and response as it’s being fetched and cached as it allows you to add
additional behaviors to your service worker without writing substantial
boilerplate code.

Workbox Plugins allow you to add additional behaviors by manipulating
responses and requests during the lifecycle of a request.

Out of the box Workbox provides a number of plugins that you can use and
you can implement your own plugins if you want to add custom logic.

## Workbox Plugins

Workbox provides the following plugins:

* [workbox.backgroundSync.Plugin](../reference-docs/latest/workbox.backgroundSync.Plugin)
    * If a network request ever fails, add it to a background sync queue
  and retry the request when the next sync event is triggered.
* [workbox.broadcastUpdate.Plugin](../reference-docs/latest/workbox.broadcastUpdate.Plugin)
    * When ever a cache is updated dispatch a message on a Broadcast Channel.
* [workbox.cacheableResponse.Plugin](../reference-docs/latest/workbox.cacheableResponse.Plugin)
    * Only cache cache requests that meet a certain criteria.
* [workbox.expiration.Plugin](../reference-docs/latest/workbox.expiration.Plugin)
    * Manage the number of cached items or the age of items in the cache.
* [workbox.rangeRequests.Plugin](../reference-docs/latest/workbox.rangeRequests.Plugin)
    * Respond to requests that include a `Range:` header, with partial content
  from a cache.

You can use these plugins with a Workbox strategy by adding an instance to
the `plugins` property:

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

## Custom Plugins

You can create your own plugins by passing in an object that has any of the
following functions:

* `cacheWillUpdate`
    * Called before a
  [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) is
  used to update a cache. You can alter the Response before it’s added to the
  cache or return null to avoid updating the cache at all.
* `cacheDidUpdate`
    * Called when a new entry is added to a cache or it’s updated. Useful
  if you wish to perform an action after a cache update.
* `cachedResponseWillBeUsed`
    * Before a cached Response is used to respond to a `fetch` event, this
  callback can be used to allow or block the Response from being used.
* `requestWillFetch`
    * This is called whenever a fetch event is about to be made. You can alter
  the [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request)
  in this callback.
* `fetchDidFail`
    * Called when a fetch event fails (note this is when the network request
  can’t be made at all and not when a request is a non-200 request).

All of these functions will be called with `await` whenever a cache or fetch
event reaches the relevant point for the callback.

A plugin using all of these callbacks would look like this:

```javascript
const myPlugin = {
  cacheWillUpdate: async ({request, response}) => {
    // Return `response`, a different Response object or null
    return response;
  },
  cacheDidUpdate: async ({cacheName, request, oldResponse, newResponse}) => {
    // No return expected
  },
  cachedResponseWillBeUsed: async ({cacheName, request, matchOptions, cachedResponse}) => {
    // Return `cachedResponse`, a different Response object or null
    return cachedResponse;
  },
  requestWillFetch: async ({request}) => {
    // Return `request` or a different Request
    return request;
  },
  fetchDidFail: async ({originalRequest, request, error}) => {
    // No return expected.
    // NOTE: `originalRequest` is the browser's request, `request` is the
    // request after being passed through plugins with
    // `requestWillFetch` callbacks, and `error` is the exception that caused
    // the underlying `fetch()` to fail.
  }
};
```
