project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-background-sync.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Background Sync {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

## What is Workbox Background Sync?

When you send data to a web server, sometimes the requests will fail. It
may be because the user has lost connectivity, or it may be because the
server is down; in either case you often want to try sending the requests
again later.

The new [BackgroundSync API](https://wicg.github.io/BackgroundSync/spec/)
is an ideal solution to this problem. When a service worker detects that a
network request has failed, it can register to receive a `sync` event,
which gets delivered when the browser thinks connectivity has returned.
Note that the sync event can be delivered *even if the user has left the
application*, making it a much more effective than traditional method of
retrying failed requests.

Workbox Background Sync is design to make it easier to use the
BackgroundSync API and integrate its usage with other Workbox modules. It
also implements a fallback strategy for browsers that don't yet implement
BackgroundSync.

## Basic Usage

Workbox Background Sync gives you a `Queue` class, which you can
instantiate and then add failed requests to. The failed requests are stored
in
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
and then retried when the browser thinks connectivity is restored (i.e.
when it receives the sync event).

### Creating a Workbox Background Sync Queue

To create a Workbox Background Sync Queue, use the `new` operator and pass
in a queue name (which must be unique to your
[origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy#Definition_of_an_origin)):

```js
const queue = new workbox.backgroundSync.Queue('myQueueName');
```

The queue name is used as the tag name that gets
[`register()`](https://wicg.github.io/BackgroundSync/spec/#dom-syncmanager-register)-ed
by the global
[`SyncManager`](https://wicg.github.io/BackgroundSync/spec/#sync-manager-interface). It's
also used as the
[Object Store](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore) name for
the IndexedDB database. Note, it's not important that you know these
details, but they're the reason the queue name has to be unique to your
origin.

### Adding a request to the Queue

Once you've created your Queue instance, you can add failed requests to it.
You add failed request by invoking the `.addRequest()` method. For example,
the following code attempts to make a POST request to an API. If the
request fails, it's added to the queue:

```js
const queue = new workbox.backgroundSync.Queue('myQueueName');
const request = new Request('/path/to/api', {
  method: 'POST',
  body: someformData,
});

try {
  await fetch(request);
} catch (err) {
  queue.addRequest(request);
}
```

Once added to the queue, the request is automatically retried when the
service worker receives the `sync` event (which happens when the browser
thinks connectivity is restored). Browsers that don't support the
BackgroundSync API will periodically retry the queue (though this requires
the page controlling the service worker to be running, so it won't be quite
as effective).

## Using Workbox Background Sync with other Workbox Packages

In addition to the Queue class, Workbox Background Sync also provides a
`Plugin` class, so it can easily integrate with Workbox strategy
classes that takes plugins as options,
as well as Workbox routes, which respond to requests using Workbox
strategies.

For example, if an app that lets users upload images to a server will
likely use a
[network-first](./workbox-strategies#network_first_network_falling_back_to_cache)
strategy, which takes a
plugin that can respond to failed fetches. By adding the `Plugin`
class to the list of the `NetworkFirst` strategy's plugins, network
requests that fail will automatically be added to a Workbox Background Sync
queue:

For example, the following code creates a `Plugin` instance, adds it to
a workbox strategy that gets handled by a route, and then registers that
route with the default router. The end result is all failed POST requests
to the API will get retried when connectivity is restored:

```js
// Create a background sync plugin, which automatically adds
// failed requests to a background sync queue.
const bgSyncPlugin = new workbox.backgroundSync.Plugin('myQueueName');

// Create a workbox strategy that uses the bg sync plugin.
const networkOnlyStrategy = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin],
});

// Create a route that handles requests with the above strategy.
const route = new workbox.routing.Route(
  ({url}) => url.pathname === '/path/to/api',
  networkOnlyStrategy,
  'POST',
);

// Add the route to the default router.
workbox.routing.registerRoute(route);
```
