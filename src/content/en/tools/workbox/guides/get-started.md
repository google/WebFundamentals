project_path: /web/tools/workbox/\_project.yaml book_path: /web/tools/workbox/\_book.yaml description:Get Started with Workbox.

{# wf_blink_components: N/A #} {# wf_updated_on: 2020-11-02 #} {# wf_published_on: 2017-11-15 #}

# Get Started {: .page-title }

Workbox is a set of libraries to help you write and manage [service workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and caching with the [`CacheStorage` API](https://web.dev/service-workers-cache-storage/). Service workers and the Cache Storage API, [when used together](https://web.dev/service-workers-cache-storage/), let you control how assets (HTML, CSS, JS, images, etc…) used on your site are requested from the network or cache, even allowing you to return cached content when offline! With Workbox, you can quickly set up and manage both, and more, with production-ready code.

## Installation

Starting with the [v5 release](https://github.com/GoogleChrome/workbox/releases/tag/v5.0.0), Workbox can be used inside of a service worker source file through [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) by using [npm](https://www.npmjs.com/) to install the [Workbox modules](https://developers.google.com/web/tools/workbox/modules#service-worker-packages) you need and importing what you plan to use.

Unfortunately, JavaScript modules don’t work inside service workers, so you’ll need a [bundler that supports JavaScript modules](https://bundlers.tooling.report/) to compile your service worker to a single file. Popular choices include [webpack](https://webpack.js.org/), [Rollup](https://rollupjs.org/guide/en/), and [Parcel](https://parceljs.org/). Please consult the documentation for your bundler of choice for setup and configuration.

Note: While there are a number of ways you can use Workbox in your project, what is presented in this guide is the current recommended approach.

## Creating a service worker

Before you can use Workbox, you need to create a service worker and [register](https://developers.google.com/web/fundamentals/primers/service-workers/registration) it from a web page. Start by creating a file called `service-worker.js` at the root of your site and add a console message to it to ensure it loads.

```javascript
console.log('Hello from service-worker.js');
```

Next, in your web page, register your new service worker:

{% include "web/tools/workbox/guides/_shared/register-sw.html" %}

This tells the browser that this is the service worker to use for the site. If you refresh your page, open up Chrome DevTools, and navigate to the _Console_ tab, you’ll see the log from your service worker.

Note: While we are showing Chrome DevTools here, you can use any developer tools you’d like to debug service workers.

![Console message from sw.js in DevTools](../images/guides/get-started/hello-console.png)

Next, switch to the _Application_ tab, you should see your service worker registered.

![Application Tab displaying a registered service worker.](../images/guides/get-started/application-tab.png)

Note: Trying to debug your service worker? Take advantage of [Incognito Mode](https://support.google.com/chrome/answer/95464) in Chrome when you need to start from a fresh state locally.

Now that you have a registered service worker, we can bring in Workbox.

## Using Workbox

Workbox is distributed as a number of [npm modules](https://developers.google.com/web/tools/workbox/modules). When you want to use one, first install it from [npm](https://npmjs.com/) then `import` the portions of the modules you need for your service worker. One of Workbox’s primary features is its routing and caching strategy modules, so it’s a good place to start.

### Routing and Caching Strategies

Workbox allows you to manage caching for your web app's HTTP requests using different caching strategies. The first step is to determine whether the request being worked on matches your criteria, and if so, applying a caching strategy to it. Matching happens via a [callback function](https://developers.google.com/web/tools/workbox/modules/workbox-routing#matching_and_handling_in_routes) that returns a truthy value. Caching strategies can either be one of Workbox’s [pre-defined strategies](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#using_strategies), or you can create your own. A basic service worker utilizing routing and caching could look something like this:

```javascript
import { registerRoute } from 'workbox-routing';
import {
  NetworkFirst,
  StaleWhileRevalidate,
  CacheFirst,
} from 'workbox-strategies';

// Used for filtering matches based on status code, header, or both
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// Used to limit entries in cache, remove entries after a certain period of time
import { ExpirationPlugin } from 'workbox-expiration';

// Cache page navigations (html) with a Network First strategy
registerRoute(
  // Check to see if the request is a navigation to a new page
  ({ request }) => request.mode === 'navigate',
  // Use a Network First caching strategy
  new NetworkFirst({
    // Put all cached files in a cache named 'pages'
    cacheName: 'pages',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
registerRoute(
  // Check to see if the request's destination is style for stylesheets, script for JavaScript, or worker for web worker
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  // Use a Stale While Revalidate caching strategy
  new StaleWhileRevalidate({
    // Put all cached files in a cache named 'assets'
    cacheName: 'assets',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  }),
);

// Cache images with a Cache First strategy
registerRoute(
  // Check to see if the request's destination is style for an image
  ({ request }) => request.destination === 'image',
  // Use a Cache First caching strategy
  new CacheFirst({
    // Put all cached files in a cache named 'images'
    cacheName: 'images',
    plugins: [
      // Ensure that only requests that result in a 200 status are cached
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // Don't cache more than 50 items, and expire them after 30 days
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 Days
      }),
    ],
  }),
);
```

This service worker caches navigation requests (for new HTML pages) with a [Network First strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache) storing cached pages in a cache named pages, but only if it comes back with a 200 status code. It also caches stylesheets, javascript, and web workers with a [Stale While Revalidate strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate) storing cached assets in a cache named assets, again, only if they come back with a 200 status code. Finally, it caches images with a [Cache First strategy](https://developers.google.com/web/tools/workbox/modules/workbox-strategies#cache_first_cache_falling_back_to_network) storing cached images in a cache named images, only if they come back with a 200 status code, expiring cached items after 30 days and only allowing 50 entries at once.

### Precaching

In addition to caching as requests are made, sometimes called runtime caching, Workbox also supports [precaching](https://developers.google.com/web/tools/workbox/modules/workbox-precaching), the ability to cache resources when the service worker is installed. There are a number of items that are great candidates for precaching: your web app's [start URL](https://web.dev/add-manifest/#start-url), your [offline fallback](#offline_fallback) page, and key JavaScript and CSS files. By precaching files, you’ll guarantee that they’re available in the cache when the service worker takes control of the page.

You can use precaching inside your new service worker by using a bundler plugin ([webpack](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#injectmanifest_plugin) or [rollup](https://github.com/chromeos/static-site-scaffold-modules/blob/master/modules/rollup-plugin-workbox-inject/README.md)) that supports precache manifest injection:

```javascript
import { precacheAndRoute } from 'workbox-precaching';

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);
```

This service worker will precache files when it installs, replacing `self.__WB_MANIFEST` with a list of entries injected into the service worker at build time.

### Offline Fallback

A common pattern for making websites and apps feel more robust when working offline is to provide a fallback page instead of displaying the browser’s default error page. With Workbox routing and precaching, you can set up this pattern in just a few lines of code:

```javascript
import { precacheAndRoute, matchPrecache } from 'workbox-precaching';
import { setCatchHandler } from 'workbox-routing';

// Ensure your build step is configured to include /offline.html as part of your precache manifest.
precacheAndRoute(self.__WB_MANIFEST);

// Catch routing errors, like if the user is offline
setCatchHandler(async ({ event }) => {
  // Return the precached offline page if a document is being requested
  if (event.request.destination === 'document') {
    return matchPrecache('/offline.html');
  }

  return Response.error();
});
```

This service worker precaches an offline page and, if a user is offline, returns the contents of the precached offline page instead of producing a browser error.

## Do more with Workbox

There’s lots more you can do with Workbox! Read the [guides](/web/tools/workbox/guides) for a deeper dive into different aspects of Workbox. Check out all of the available [Workbox modules](https://developers.google.com/web/tools/workbox/modules) to see even more things Workbox can do, like managing Google Analytics when offline, retrying form submissions that failed when offline, or broadcast updates when a cache is updated. With Workbox, you can harness the power of service workers to improve performance and give your site a great experience, independent of the network.
