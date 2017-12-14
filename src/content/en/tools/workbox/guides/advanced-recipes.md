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

To do this you'll need to add some polyfill code to your page and to your service worker.

**Add to your page**

```javascript
// polyfill navigator.serviceWorker.waiting
if (!('waiting' in navigator.serviceWorker)) {
  navigator.serviceWorker.waiting = new Promise(function(resolve) {
    navigator.serviceWorker.ready.then(function(reg) {
      function awaitStateChange() {
        reg.installing.addEventListener('statechange', function() {
          if (this.state === 'installed') resolve(reg);
        });
      }
      if (reg.waiting) resolve(reg);
      if (reg.installing) awaitStateChange();
      reg.addEventListener('updatefound', awaitStateChange);
    })
  });
}

// polyfill ServiceWorker.skipWaiting()
if (!('skipWaiting' in ServiceWorker.prototype)) {
  ServiceWorker.prototype.skipWaiting = function() {
    this.postMessage('skipWaiting');
  }
}

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

    registration.waiting.skipWaiting();
  });

  document.body.appendChild(button);
};

navigator.serviceWorker.addEventListener('controllerchange', function() {
  window.location.reload();
});

navigator.serviceWorker.waiting.then(showRefreshUI);
```

The polyfill handles the various possible lifecycles of the service worker
and detects when a new service worker has become installed and is waiting to
activate.

When a waiting service worker is found, we we tell the service worker to skip
waiting (posting a message if necessary). After this, the `controllerchange`
event will fire. The page should reload when the controller changes to
ensure that all tabs are running the same version of the code.

Note: This is one possible approach to refreshing the page on a new service
worker. For a more thorough answer as well as an explanation of alternative
approaches this
[article by Redfin Engineering](https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68)
discuess a range of options.

**Add to your service worker**

This code supports the polyfill while we wait for `ServiceWorker.skipWaiting`
to be available in all browsers.

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

This will receive a the 'skipWaiting' message and call `skipWaiting()`, forcing
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
worbox.routing.registerRoute(new RegExp('/images/'), ({event}) => {
  return imagesHandler.handle({event})
    .catch(() => caches.match(FALLBACK_IMAGE_URL));
});
```
