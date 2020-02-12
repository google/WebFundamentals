project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-background-sync.

{# wf_updated_on: 2020-02-12 #}
{# wf_published_on: 2017-11-29 #}
{# wf_blink_components: N/A #}

# Workbox Broadcast Update {: .page-title }

## What is Broadcast Update?

When responding to requests with cached entries, while being fast, it
comes with a tradeoff that users may end up seeing stale data.

The `workbox-broadcast-update` package provides a standard way of notifying
[Window Clients]((https://developer.mozilla.org/en-US/docs/Web/API/Clients))
that a cached response has been updated. This is most commonly used along with
the [StaleWhileRevalidate strategy](./workbox-strategies#stale-while-revalidate).

Whenever the "revalidate" step of that strategy retrieves a response from the
network that differs from what was previously cached, this module will send a
message (via
[`postMessage()`](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage))
to all Window Clients within scope of the current service worker.

Window Clients can listen for updates and take appropriate action, like
automatically displaying a message to the user letting them know that updates
are available.

## How are updates determined?

Certain headers of the cached and new
[Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
objects are compared, and if any of the headers have different values,
it's considered an update.

By default, the `Content-Length`, `ETag`, and
`Last-Modified` headers are compared.

Workbox uses header values instead of a byte-for-byte comparison of
response bodies to be more efficient, in particular for potentially
large responses

Warning: Because Workbox needs to be able to read the header values,
[opaque responses](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses),
whose headers are not accessible, will never trigger update messages.

## Using Broadcast Update

The library is intended to be used along with the `StaleWhileRevalidate`
caching strategy, since that strategy involves returning a cached
response immediately, but also provides a mechanism for updating the
cache asynchronously.

To broadcast updates, you just need to add a `broadcastUpdate.BroadcastUpdatePlugin` to your
strategy options.

```js
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update';

registerRoute(
  new RegExp('/api/'),
  new StaleWhileRevalidate({
    plugins: [
      new BroadcastUpdatePlugin(),
    ],
  })
);
```

In your web app, you can listen for these events like so:

```js
navigator.serviceWorker.addEventListener('message', async (event) => {
  // Optional: ensure the message came from workbox-broadcast-update
  if (event.data.meta === 'workbox-broadcast-update') {
    const {cacheName, updatedUrl} = event.data.payload;

    // Do something with cacheName and updatedUrl.
    // For example, get the cached content and update
    // the content on the page.
    const cache = await caches.open(cacheName);
    const updatedResponse = await cache.match(updatedUrl);
    const updatedText = await updatedResponse.text();
  }
});
```

Note: make sure to add the `message` event listener before the
`DOMContentLoaded` event, as browsers will [queue
messages](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/startMessages#Explanation)
received early in the page load (before your JavaScript code has had a chance to
run) up until (but not after) the `DOMContentLoaded` event.

### Message format

When a `message` event listener is invoked in your web app, the
`event.data` property will have the following format:

```js
{
  type: 'CACHE_UPDATED',
  meta: 'workbox-broadcast-update',
  // The two payload values vary depending on the actual update:
  payload: {
    cacheName: 'the-cache-name',
    updatedURL: 'https://example.com/'
  }
}
```

Note: This message format adheres to the
[Flux standard action format](https://github.com/acdlite/flux-standard-action#introduction),
though it is not tied in any way to the Flux framework.

### Customize Headers to Check

You can customize the headers to check by setting the `headersToCheck`
property.

```js
import {registerRoute} from 'workbox-routing';
import {StaleWhileRevalidate} from 'workbox-strategies';
import {BroadcastUpdatePlugin} from 'workbox-broadcast-update';

registerRoute(
  new RegExp('/api/'),
  new StaleWhileRevalidate({
    plugins: [
      new BroadcastUpdatePlugin({
        headersToCheck: ['X-My-Custom-Header'],
      }),
    ],
  })
);
```

## Advanced Usage

While most developers will use `workbox-broadcast-update` as a plugin
of a particular strategy as shown above, it's possible to use the underlying
logic in service worker code.

```js
import {BroadcastCacheUpdate} from 'workbox-broadcast-update';

const broadcastUpdate = new BroadcastCacheUpdate({
  headersToCheck: ['X-My-Custom-Header'],
});

const cacheName = 'api-cache';
const request = new Request('https://example.com/api');

const cache = await caches.open(cacheName);
const oldResponse = await cache.match(request);
const newResponse = await fetch(request);

broadcastUpdate.notifyIfUpdated({
  cacheName,
  oldResponse,
  newResponse,
  request,
);
```
