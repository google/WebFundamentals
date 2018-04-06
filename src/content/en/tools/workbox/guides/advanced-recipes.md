project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Advanced recipes to use with Workbox.

{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: N/A #}

# Advanced Recipes {: .page-title }

## Offer a page reload for users

A common UX pattern for progressive web apps is to show a banner when a service
worker has updated and waiting to install.

To do this you'll need to add some code to your page and to your service worker.

**Add to your page**

```javascript
function showRefreshUI(registration) {
  // TODO: Display a toast or refresh UI.

  // This demo creates and injects a button.

  var button = document.createElement('button');
  button.style.position = 'absolute';
  button.style.bottom = '24px';
  button.style.left = '24px';
  button.textContent = 'This site has updated. Please click here to see changes.';

  button.addEventListener('click', function() {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return;
    }

    button.disabled = true;

    registration.waiting.postMessage('skipWaiting');
  });

  document.body.appendChild(button);
};

function onNewServiceWorker(registration, callback) {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  function listenInstalledStateChange() {
    registration.installing.addEventListener('statechange', function(event) {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        callback();
      }
    });
  };

  if (registration.installing) {
    return listenInstalledStateChange();
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.addEventListener('updatefound', listenInstalledStateChange);
}

window.addEventListener('load', function() {
  navigator.serviceWorker.register('/sw.js')
  .then(function (registration) {
      // Track updates to the Service Worker.
    if (!navigator.serviceWorker.controller) {
      // The window client isn't currently controlled so it's a new service
      // worker that will activate immediately
      return;
    }

    // When the user asks to refresh the UI, we'll need to reload the window
    var preventDevToolsReloadLoop;
    navigator.serviceWorker.addEventListener('controllerchange', function(event) {
      // Ensure refresh is only called once.
      // This works around a bug in "force update on reload".
      if (preventDevToolsReloadLoop) return;
      preventDevToolsReloadLoop = true;
      console.log('Controller loaded');
      window.location.reload();
    });

    onNewServiceWorker(registration, function() {
      showRefreshUI(registration);
    });
  });
});
```

This code handles the various possible lifecycles of the service worker
and detects when a new service worker has become installed and is waiting to
activate.

When a waiting service worker is found we set up a 'controllerchange' listener
on `navigator.serviceWorker` so we know when to reload the window. When the
user clicks on the UI to refresh the page, we post a message to the new
service worker telling it to `skipWaiting` meaning it'll start to activate.

Note: This is one possible approach to refreshing the page on a new service
worker. For a more thorough answer as well as an explanation of alternative
approaches this
[article by Redfin Engineering](https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68)
discuss a range of options.

**Add to your service worker**

```javascript
self.addEventListener('message', (event) => {
  if (!event.data){
    return;
  }

  switch (event.data) {
    case 'skipWaiting':
      self.skipWaiting();
      break;
    default:
      // NOOP
      break;
  }
});
```

This will receive a the 'skipWaiting' message and call `skipWaiting()`forcing
the service worker to activate immediately.

## "Warm" the runtime cache

After configuring some routes to manage caching of assets, you may want to
add some files to the cache during the service worker installation.

To do this you'll need to install your desired assets to the runtime cache.

```javascript
self.addEventListener('install', (event) => {
  const urls = [/* ... */];
  const cacheName = workbox.core.cacheNames.runtime;
  event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
});
```

If you setup routes with a custom cachename you can do the same, just replace
the `cacheName` with your custom value.

## Provide a fallback response to a route

There are scenarios where returning a fallback response is better than failing
to return a response at all. An example is returning a placeholder image when
the original image can't be retrieved.

To do this in Workbox you can use the `handle()` method on strategy to make
a custom handler function. **Note:** You'll need to cache any assets you
use for your fallback, in the example below we'd need to cache the
`FALLBACK_IMAGE_URL`.

```javascript
const FALLBACK_IMAGE_URL = '/images/fallback.png';
const imagesHandler = workbox.strategies.cacheFirst();
workbox.routing.registerRoute(new RegExp('/images/'), ({event}) => {
  return imagesHandler.handle({event})
    .catch(() => caches.match(FALLBACK_IMAGE_URL));
});
```

## Use postMessage() to notify of cache updates

On browsers which lack [Broadcast Channel API support](https://caniuse.com/#search=broadcast), the
`workbox-broadcast-cache-update` plugin will not send any messages letting clients know that a
cached response was updated.

As an alternative to using `workbox-broadcast-cache-update`, you can instead "roll your own" plugin
which listens for the same cache update events, and uses the more widely supported [`postMessage()`
API](https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage) for
sending out updates. In this custom plugin, you have control over what criteria are
used to determine whether a cached response has been updated. You can use whatever message format
inside of `postMessage()` that makes sense for your use case.

Here's an example of one possible implementation:

```javascript
const postMessagePlugin = {
  cacheDidUpdate: async ({cacheName, url, oldResponse, newResponse}) => {
    // Use whatever logic you want to determine whether the responses differ.
    if (oldResponse && (oldResponse.headers.get('etag') !== newResponse.headers.get('etag'))) {
      const clients = await self.clients.matchAll();
      for (const client of clients) {
        // Use whatever message body makes the most sense.
        // Note that `Response` objects can't be serialized.
        client.postMessage({url, cacheName});
      }
    }
  },
};

// Later, use the plugin when creating a response strategy:
workbox.routing.registerRoute(
  new RegExp('/path/prefix'),
  workbox.strategies.staleWhileRevalidate({
    plugins: [postMessagePlugin],
  })
);
```
