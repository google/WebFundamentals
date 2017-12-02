project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/next/_book.yaml
description: The module guide for workbox-background-sync.

{# wf_updated_on: 2017-11-29 #}
{# wf_published_on: 2017-11-29 #}

# Workbox Broadcast Cache Update {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

## What is Broadcast Cache Update?

When responding to requests with cached entries, while being fast, it
comes with a tradeoff that users may end up seeing stale data.

The `workbox-broadcast-cache-update module` provides a standard way of
notifying Window Clients that a cached response has been updated. This is most
commonly used along with the
[staleWhileRevalidate strategy](./workbox-strategies#stale-while-revalidate).

Whenever the "revalidate" step of that strategy retrieves a
response from the network that differs from what was previously cached,
this module will use the
[Broadcast Channel API](/web/updates/2016/09/broadcastchannel)
to announce the update. Clients can listen for updates using that API
and take appropriate action, like automatically displaying a message to the
user letting them know that updates are available.

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

## Using Broadcast Cache Update

The library is intended to be used along with the `staleWhileRevalidate`
caching strategy, since that strategy involves returning a cached
response immediately, but also provides a mechanism for updating the
cache asynchronously.

To broadcast updates, you just need to add `broadcastUpdate` to your
stragy options.

```js
workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.staleWhileRevalidate({
    broadcastUpdate: {
      channelName: 'api-updates',
    }
  })
);
```

This will broadcast messages on the channel 'api-updates', but you should
customise it to something relevant to your app.

In your web app, you can listen for these events like so:

```js
const updatesChannel = new BroadcastChannel('api-updates');
updatesChannel.addEventListener('message', async (event) => {
  const {cacheName, updatedUrl} = event.data.payload;

  // Do something with cacheName and updatedUrl.
  // For example, get the cached content and update
  // the content on the page.
  const cache = await caches.open(cacheName);
  const updatedResponse = await cache.match(updatedUrl);
  const updatedText = await updatedResponse.text();
  ...
});
```

### Message format

The message that's sent via the Broadcast Channel API adheres to the


When a `message` event listener as received in your web app, the
`event.data` property will have the following format:

```js
{
  type: 'CACHE_UPDATED',
  meta: 'workbox-broadcast-cache-update',
  // The two payload values vary depending on the actual update:
  payload: {
    cacheName: 'the-cache-name',
    updatedUrl: 'https://example.com/'
  }
}
```

Note: This message format adheres to the
[Flux standard action format](https://github.com/acdlite/flux-standard-action#introduction),
though it is not tied in any way to the Flux framework.

### Customise Headers to Check

You can customise the headers to check by setting the `headersToCheck`
property.

```js
workbox.routing.registerRoute(
  new RegExp('/api/'),
  workbox.strategies.staleWhileRevalidate({
    broadcastUpdate: {
      channelName: 'api-updates',
      headersToCheck: ['X-My-Custom-Header']
    }
  })
);
```

## Advanced Usage

While most developers will use `workbox-broadcast-cache-update` as an option
of a particular strategy as shown above, it's possible to use the underlying
logic in service worker code.

```js
const broadcastUpdate = new workbox.broadcastCacheUpdate.BroadcastCacheUpdate(
  'api-updates',
  {
    headersToCheck: ['X-My-Custom-Header'],
  }
);

const cacheName = 'api-cache';
const url = 'https://example.com/api';

const cache = await caches.open(cacheName);
const previousResponse = await cache.match(url);

const networkResponse = await fetch(url);

broadcastUpdate.notifyIfUpdated(
  previousResponse,
  networkResponse,
  url,
  cacheName
);
```
