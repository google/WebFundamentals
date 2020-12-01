project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-recipes.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-12-01 #}
{# wf_published_on: 2020-11-13 #}

# Workbox Recipes {: .page-title }

## What is Workbox Recipes?

A number of common patters, especially around [routing](/web/tools/workbox/modules/workbox-routing) and [caching](/web/tools/workbox/modules/workbox-strategies), are common enough that they can be standardized into reusable recipes. `workbox-recipes` makes these available in an easy-to-consume package, allowing you to get up-and-running with a highly functional service worker quickly.

## Recipes

Each recipe combines a number of [Workbox modules](/web/tools/workbox/modules) together, bundling them into commonly used patterns. The recipes below will show the **recipe** you use when using this module, and the equivalent **pattern** it's using under the hood, should you want to write it yourself.

### Offline fallback

The offline fallback recipe allows your service worker to serve a [precached](/web/tools/workbox/modules/workbox-precaching) web page, image, or font if there's a routing error for any of the three, for instance if a user is offline and there isn't a cache hit.

This recipe, by default, assumes the fallback page in your precache is `offline.html` and that there isn't an image or font fallback. See the [offline fallback options](/web/tools/workbox/reference-docs/latest/module-workbox-recipes#~offlineFallback) for a list of all configuration options.

#### Recipe

```js
import { offlineFallback } from 'workbox-recipes';
import { precacheAndRoute } from 'workbox-precaching';

// Include offline.html in the manifest
precacheAndRoute(self.__WB_MANIFEST);

offlineFallback();
```

#### Pattern

```js
import { setCatchHandler } from 'workbox-routing';
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';

// Include offline.html in the manifest
precacheAndRoute(self.__WB_MANIFEST);

const pageFallback = 'offline.html';
const imageFallback = false;
const fontFallback = false;

const handler = async (options) => {
  const dest = options.request.destination;

  if (dest === 'document') {
    return (await matchPrecache(pageFallback)) || Response.error();
  }

  if (dest === 'image' && imageFallback !== false) {
    return (await matchPrecache(imageFallback)) || Response.error();
  }

  if (dest === 'font' && fontFallback !== false) {
    return (await matchPrecache(fontFallback)) || Response.error();
  }

  return Response.error();
};

setCatchHandler(handler);
```

### Page cache

The page cache recipe allows your service worker to respond to a request for an HTML page (through URL navigation) with a [network first](web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache) caching strategy, optimized to, ideally, allow for the cache fallback to arrive quick enough for for a [largest contentful paint](https://web.dev/vitals/) score of less than 4.0 seconds.

This recipe, by default, assumes the network timeout should be 3 seconds. See the [page cache options](/web/tools/workbox/reference-docs/latest/module-workbox-recipes#~pageCache) for a list of all configuration options.

#### Recipe

```js
import { pageCache } from 'workbox-recipes';

pageCache();
```

#### Pattern

```js
import { registerRoute } from 'workbox-routing';
import { NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const cacheName = 'pages';
const matchCallback = ({ request }) => request.mode === 'navigate';
const networkTimeoutSeconds = 3;

registerRoute(
  matchCallback,
  new NetworkFirst({
    networkTimeoutSeconds,
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
```

### Static resources cache

The static resources cache recipe allows your service worker to respond to a request for static resources, specifically CSS, JavaScript, and Web Worker requests, with a [stale-while-revalidate](/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate) caching strategy so those assets can be quickly served from the cache and be updated in the background

See the [static resources cache options](/web/tools/workbox/reference-docs/latest/module-workbox-recipes#~staticResourceCache) for a list of all configuration options.

#### Recipe

```js
import { staticResourceCache } from 'workbox-recipes';

staticResourceCache();
```

#### Pattern

```js
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const cacheName = 'static-resources';
const matchCallback = ({ request }) =>
  // CSS
  request.destination === 'style' ||
  // JavaScript
  request.destination === 'script' ||
  // Web Workers
  request.destination === 'worker';

registerRoute(
  matchCallback,
  new StaleWhileRevalidate({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
);
```

### Image cache

The image cache recipe allows your service worker to respond to a request for images with a [cache-first](/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network) caching strategy so that once they're available in cache a user doesn't need to make another request for them.

This recipe, by default, caches a maximum of 60 images, each for 30 days. See the [image cache options](/web/tools/workbox/reference-docs/latest/module-workbox-recipes#~imageCache) for a list of all configuration options.

#### Recipe

```js
import { imageCache } from 'workbox-recipes';

imageCache();
```

#### Pattern

```js
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const cacheName = 'images';
const matchCallback = ({ request }) => request.destination === 'image';
const maxAgeSeconds = 30 * 24 * 60 * 60;
const maxEntries = 60;

registerRoute(
  matchCallback,
  new CacheFirst({
    cacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries,
        maxAgeSeconds,
      }),
    ],
  }),
);
```

### Google Fonts cache

The Google Fonts recipe caches the two parts of a Google Fonts request:

- The stylesheet with the `@font-face` definitions, which link to the font files.
- The static, revisioned font files.

Because the stylesheet can change frequently, a [stale-while-revalidate](/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate) caching strategy is used. The font files themselves, on the other hand, do not change and can leverage a [cache first](/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network) strategy.

This recipe, by default, caches a maximum of 30 font files, each for one year. See the [Google Fonts cache options](/web/tools/workbox/reference-docs/latest/module-workbox-recipes#~googleFontsCache) for a list of all configuration options.

#### Recipe

```js
import { googleFontsCache } from 'workbox-recipes';

googleFontsCache();
```

#### Pattern

```js
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

const sheetCacheName = 'google-fonts-stylesheets';
const fontCacheName = 'google-fonts-webfonts';
const maxAgeSeconds = 60 * 60 * 24 * 365;
const maxEntries = 30;

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: sheetCacheName,
  }),
);

// Cache the underlying font files with a cache-first strategy for 1 year.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: fontCacheName,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds,
        maxEntries,
      }),
    ],
  }),
);
```

## Quick usage

Combining all of the recipes together will yield a service worker that responds to page requests with a [network first](web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache) caching strategy, respond to CSS, JavaScript, and Web Worker requests with a [stale-while-revalidate](/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate) strategy, respond to image requests with a [cache first](/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network) strategy, properly cache Google Fonts, and provide an offline fallback for page requests. This can all be done with the following:

```js
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
  offlineFallback,
} from 'workbox-recipes';
import { precacheAndRoute } from 'workbox-precaching';

// Include offline.html in the manifest
precacheAndRoute(self.__WB_MANIFEST);

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

offlineFallback();
```

## Feedback {: #feedback .hide-from-toc }


{% include "web/_shared/helpful.html" %}
