project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Advanced recipes to use with Workbox.

{# wf_updated_on: 2017-12-17 #}
{# wf_published_on: 2017-11-15 #}

# Advanced Recipes {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

## Offer a page reload for users

A common UX pattern for progressive web apps is to show a banner when a service
worker has updated and waiting to install.

To do this you'll need to add some code to your page and to your service worker.

**Add to your page**

```javascript
const showRefreshUI = (registration) => {
  // TODO: Show a toast of some UI to offer a refresh to the user.

  const refreshButton = document.querySelector('.refresh-button');
  refreshButton.addEventListener('click', () => {
    button.disabled = true;

    // The user has asked us to refresh so reload when the force activate
    // takes affect and clients.claim() is called.
    // This is also safe from DevTools update on reload
    navigator.serviceWorker.oncontrollerchange = function() {
      window.location.reload();
    };

    registration.waiting.postMessage('force-activate');
  });
};

navigator.serviceWorker.register('/sw.js')
.then(function (registration) {
    // Track updates to the Service Worker.
  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled so it's a new service
    // worker that will activate immediately
    return;
  }

  if (registration.waiting) {
    // SW is waiting to activate. Can occur if multiple clients open and
    // one of the clients is refreshed.
    return showRefreshUI(registration);
  }

  // We are currently controlled so a new SW may be found...
  // Add a listener in case a new SW is found,
  registration.onupdatefound = function () {
    console.log('SW has a new version...');
    registration.installing.onstatechange = function (event) {
      if (event.target.state === 'installed') {
        // A new service worker is available, inform the user
        showRefreshUI(registration);
      }
    };
  };
});
```

This code handles the verious possible lifecycles of the service worker
and detects when a new service worker has become installed and is waiting to
activate.

When a waiting service worker is found, a `controllerchange` listener is
added to `navigator.serviceWorker` to listen for when / if the controlling
service worker changes, when this happens we'll reload the page. Once the
listener is set up, a message is posted to the new service worker telling
it to force and activation.

**Add to your service worker**

```javascript
self.addEventListener('message', (event) => {
  if (!event.data) {
    return;
  }

  switch (event.data) {
    case 'force-activate':
      self.skipWaiting();
      self.clients.claim();
    default:
      // NOOP
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
