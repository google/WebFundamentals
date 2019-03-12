project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: Advanced recipes to use with Workbox.

{# wf_updated_on: 2019-03-07 #}
{# wf_published_on: 2017-12-17 #}
{# wf_blink_components: N/A #}

# Advanced Recipes {: .page-title }

## Offer a page reload for users

A common UX pattern for progressive web apps is to show a banner when a service
worker has updated and waiting to install.

To do this you'll need to add some code to your page and to your service worker.

**Code in your page**

```html
<script type="module">
import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/4.1.0/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  // Add an event listener to detect when the registered
  // service worker has installed but is waiting to activate.
  wb.addEventListener('waiting', (event) => {
    // `event.wasWaitingBeforeRegister` will be false if this is
    // the first time the updated service worker is waiting.
    // When `event.wasWaitingBeforeRegister` is true, a previously
    // updated same service worker is still waiting.
    // You may want to customize the UI prompt accordingly.

    // Assumes your app has some sort of prompt UI element
    // that a user can either accept or reject.
    const prompt = createUIPrompt({
      onAccept: async () => {
        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener('controlling', (event) => {
          window.location.reload();
        });

        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        // Note: for this to work, you have to add a message
        // listener in your service worker. See below.
        wb.messageSW({type: 'SKIP_WAITING'});
      },

      onReject: () => {
        prompt.dismiss();
      }
    })
  });

  wb.register();
}
</script>
```

This code uses the [`workbox-window`](/web/tools/workbox/modules/workbox-window)
package to register a service worker and react if it gets stuck in the waiting
phase.

When a waiting service worker is found we inform the user that an updated
version of the site is available and prompt them to reload. If they accept the
prompt, we `postMessage()` the new service worker telling it to run
`skipWaiting()`, meaning it'll start to activate. Once the new service worker
has activated and taken control, we reload the current page, causing the latest
version of all the precached assets to be displayed.

Note: This is one possible approach. For a more in-depth explanation of the
problem as well as alternative approaches, see this
[article by Redfin Engineering](https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68).

**Code in your service worker**

If you're using one of the Workbox build tools in `GenerateSW` mode, and you
have `skipWaiting` set to `false` (the default), then this code will
automatically be included in your generated service worker file, and you don't
need to add it yourself.

If you're writing your own service worker code, perhaps in conjunction with a
Workbox build tool in `InjectManifest` mode, then you need to add this to your
service worker file yourself:

```javascript
addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    skipWaiting();
  }
});
```

This will listen for messages of `type: 'SKIP_WAITING'` and run the `skipWaiting()`
method, forcing the service worker to activate right away.

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

If you use strategies configured with a custom cache name you can do the same thing; just assign
your custom value to `cacheName`.

## Provide a fallback response to a route

There are scenarios where returning a fallback response is better than failing
to return a response at all. An example is returning a placeholder image when
the original image can't be retrieved.

All of the built-in caching strategies reject in a consistent manner when there's a network failure
and/or a cache miss. This promotes the pattern of [setting a global "catch"
handler](/web/tools/workbox/reference-docs/latest/workbox.routing#.setCatchHandler) to deal with any
failures in a single handler function:

```javascript
// Use an explicit cache-first strategy and a dedicated cache for images.
workbox.routing.registerRoute(
  new RegExp('/images/'),
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [...],
  })
);

// Use a stale-while-revalidate strategy for all other requests.
workbox.routing.setDefaultHandler(
  new workbox.strategies.StaleWhileRevalidate()
);

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
workbox.routing.setCatchHandler(({event}) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
  // or precaching.
  // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
  // to get the correct cache key to pass in to caches.match().
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'document':
      return caches.match(FALLBACK_HTML_URL);
    break;

    case 'image':
      return caches.match(FALLBACK_IMAGE_URL);
    break;

    case 'font':
      return caches.match(FALLBACK_FONT_URL);
    break;

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});
```

## Make standalone requests using a strategy {: #make-requests }

Most developers will use one of Workbox's
[strategies](/web/tools/workbox/modules/workbox-strategies) as part of a
[router](/web/tools/workbox/modules/workbox-routing) configuration. This setup makes it easy to
automatically respond to specific `fetch` events with a response obtained from the strategy.

There are situations where you may want to use a strategy in your own router setup, or instead of
a plain `fetch()` request.

To help with these sort of use cases, you can use any of the Workbox strategies in a "standalone"
fashion via the `makeRequest()` method.

```javascript
// Inside your service worker code:
const strategy = new workbox.strategies.NetworkFirst({
  networkTimeoutSeconds: 10,
});
const response = await strategy.makeRequest({
  request: 'https://example.com/path/to/file',
});
// Do something with response.
```

The `request` parameter is required, and can either be a
[`Request`](https://developer.mozilla.org/en-US/docs/Web/API/Request) object or a string
representing a URL.

The `event` parameter is an optional
[`ExtendableEvent`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent). If provided,
it will be used to keep the service worker alive (via
[`event.waitUntil()`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil))
long enough to complete any "background" cache updates and cleanup.

`makeRequest()` returns a promise for a
[`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object.

You can use it in a more complex example as follows:

```javascript
self.addEventListener('fetch', async (event) => {
  if (event.request.url.endsWith('/complexRequest')) {
    // Configure the strategy in advance.
    const strategy = new workbox.strategies.StaleWhileRevalidate({cacheName: 'api-cache'});

    // Make two requests using the strategy.
    // Because we're passing in event, event.waitUntil() will be called automatically.
    const firstPromise = strategy.makeRequest({event, request: 'https://example.com/api1'});
    const secondPromise = strategy.makeRequest({event, request: 'https://example.com/api2'});

    const [firstResponse, secondResponse] = await Promise.all(firstPromise, secondPromise);
    const [firstBody, secondBody] = await Promise.all(firstResponse.text(), secondResponse.text());

    // Assume that we just want to concatenate the first API response with the second to create the
    // final response HTML.
    const compositeResponse = new Response(firstBody + secondBody, {
      headers: {'content-type': 'text/html'},
    });

    event.respondWith(compositeResponse);
  }
});
```

## Serve cached audio and video {: #cached-av }

There are a few wrinkles in how some browsers request media assets (e.g., the `src` of a `<video>`
or `<audio>` element) that can lead to incorrect serving behavior unless you take specific steps
when configuring Workbox.

Full details are available in [this GitHub issue
discussion](https://github.com/GoogleChrome/workbox/issues/1663#issuecomment-448755945); a summary
of the important points is:

- Workbox must be told to respect [`Range` request
  headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Range_requests) by adding in the
  [`workbox-range-requests` plugin](/web/tools/workbox/modules/workbox-range-requests) to the
  strategy used as the handler.
- The audio or video element needs to opt-in to CORS mode using the [`crossOrigin`
  attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes), e.g. via
  `<video src="movie.mp4" crossOrigin="anonymous"></video>`.
- If you want to serve the media from the cache, you should explicitly add it to the cache ahead of
  time. This could happen either via precaching, or via calling
  [`cache.add()`](https://developer.mozilla.org/en-US/docs/Web/API/Cache/add) directly. Using a
  runtime caching strategy to add the media file to the cache implicitly is not likely to work,
  since at runtime, only partial content is fetched from the network via a `Range` request.

Putting this all together, here's an example of one approach to serving cached media content using
Workbox:

```html
<!-- In your page: -->
<!-- You currently need to set crossOrigin even for same-origin URLs! -->
<video src="movie.mp4" crossOrigin="anonymous"></video>
```

```javascript
// In your service worker:
// It's up to you to either precache or explicitly call cache.add('movie.mp4')
// to populate the cache.
//
// This route will go against the network if there isn't a cache match,
// but it won't populate the cache at runtime.
// If there is a cache match, then it will properly serve partial responses.
workbox.routing.registerRoute(
  /.*\.mp4/,
  new workbox.strategies.CacheFirst({
    cacheName: 'your-cache-name-here',
    plugins: [
      new workbox.cacheableResponse.Plugin({statuses: [200]}),
      new workbox.rangeRequests.Plugin(),
    ],
  }),
);
```
