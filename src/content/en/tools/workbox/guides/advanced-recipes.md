project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Advanced recipes to use with Workbox.

{# wf_updated_on: 2017-12-17 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: N/A #}

# Advanced Recipes {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

## Offer a page reload for users

A common UX pattern for progressive web apps is to show a banner when a service
worker has updated and waiting to install.

To do this you'll need to add some code to your page and to your service worker.

**Add to your page**

```javascript
const showRefreshUI = (registration) => {
  const container = document.querySelector('.new-sw');
  container.style.display = 'block';

  const button = document.querySelector('button');
  button.addEventListener('click', () => {
    button.disabled = true;

    registration.waiting.postMessage('force-activate');
  });
};

const onNewServiceWorker = (registration, callback) => {
  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return callback();
  }

  const listenInstalledStateChange = () => {
    registration.installing.addEventListener('statechange', () => {
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

window.addEventListener('load', () => {
  // When the user asks to refresh the UI, we'll need to reload the window
  navigator.serviceWorker.addEventListener('message', (event) => {
    if (!event.data) {
      return;
    }

    switch (event.data) {
      case 'reload-window':
        window.location.reload();
        break;
      default:
        // NOOP
        break;
    }
  });

  navigator.serviceWorker.register('/sw.js')
  .then(function (registration) {
      // Track updates to the Service Worker.
    if (!navigator.serviceWorker.controller) {
      // The window client isn't currently controlled so it's a new service
      // worker that will activate immediately
      return;
    }

    onNewServiceWorker(registration, () => {
      showRefreshUI(registration);
    });
  });
});
```

This code handles the verious possible lifecycles of the service worker
and detects when a new service worker has become installed and is waiting to
activate.

When a waiting service worker is found we set up a message listener on
`navigator.serviceWorker` so we know when to reload the window. When the
user clicks on the UI to refresh the page, we post a message to the new
service worker telling it to force an activation. After this a message is
posted to all windows telling them to reload.

**Add to your service worker**

```javascript
self.addEventListener('message', (event) => {
  if (!event.data){
    return;
  }

  switch (event.data) {
    case 'force-activate':
      self.skipWaiting();
      self.clients.claim();
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => client.postMessage('reload-window'));
      });
      break;
    default:
      // NOOP
      break;
  }
});
```

This will receive a the 'force-activate' message and call `skipWaiting()` and
`clients.claim()` so that the service worker activates immediately and controls
all of the currently open windows, which in turn results in the `
controllerchange` event firing causing the windows to reload.

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
worbox.routing.registerRoute(new RegExp('/images/'), ({event}) => {
  return imagesHandler.handle({event})
    .catch(() => caches.match(FALLBACK_IMAGE_URL));
});
```
