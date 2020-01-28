project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-navigation-preload.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-16 #}
{# wf_published_on: 2018-07-12 #}

# Workbox Navigation Preload {: .page-title }

## What's navigation preload?

"[Speed up Service Worker with Navigation Preloads](/web/updates/2017/02/navigation-preload)" does a
great job of explaining what navigation preload is, and the benefits it offers to web apps whose
service worker does not explicitly handle
[navigation requests](/web/fundamentals/primers/service-workers/high-performance-loading#first_what_are_navigation_requests).

## What does this module do?

`workbox-navigation-preload` will handle checking at runtime to see if the current browser supports
navigation preload, and if it does, it will automatically create an `activate` event handler to
enable it.

The shared code inside of `workbox-core` that handles making network requests across all of Workbox
has also been updated to automatically take advantage of a preload response, if it's available. This
means that any of the built-in strategies can automatically take advantage of navigation preload,
once it's enabled.

## Who should enable navigation preloads?

**Developers who are already handling navigations by responding with precached HTML (potentially
configured with an App Shell fallback) do not need to enable navigation preload!** This feature is
intended to reduce navigation latency for developers who can't precache their HTML, but still want
to use Workbox to handle caching of other assets on their sites.

For instance, if you're following the [App Shell pattern](/web/fundamentals/architecture/app-shell),
and you've got a [navigation route](/web/tools/workbox/modules/workbox-routing#how_to_register_a_navigation_route)
already set up to use the precached HTML, enabling navigation preload will be a waste. The network
response that is associated with the preload request will never end up being used, since the precached
HTML will be used unconditionally.

## Basic Usage

```javascript
import * as navigationPreload from 'workbox-navigation-preload';
import {NetworkFirst} from 'workbox-strategies';
import {registerRoute, NavigationRoute} from 'workbox-routing';

// Enable navigation preload.
navigationPreload.enable();

// Swap in NetworkOnly, CacheFirst, or StaleWhileRevalidate as needed.
const strategy = new NetworkFirst({
  cacheName: 'cached-navigations',
  plugins: [
    // Any plugins, like `ExpirationPlugin`, etc.
  ],
});

const navigationRoute = new NavigationRoute(strategy, {
  // Optionally, provide a allow/denylist of RegExps to determine
  // which paths will match this route.
  // allowlist: [],
  // denylist: [],
});

registerRoute(navigationRoute);
```

## What's the browser support story?

Currently, Google Chrome is the only browser that supports navigation preload.
`enable()` will check for browser support at runtime, and only attempt to
enable navigation preload if the current browser supports it. It's therefore
safe to call `enable()` unconditionally in your service worker.

You should be aware that those browsers will not benefit from the navigation latency reduction, and
it's recommended that you carefully measure the performance implications of shipping a service
worker that doesn't handle navigation requests, and doesn't use navigation preload.
