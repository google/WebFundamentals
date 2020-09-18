project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to migrating from Workbox v5 to v5.

{# wf_updated_on: 2020-09-18 #}
{# wf_published_on: 2020-09-17 #}
{# wf_blink_components: N/A #}

# Migrate from Workbox v5 to v6 {: .page-title }

This guide is focused on breaking changes introduced in Workbox v6, with examples of what changes
you'd need to make when upgrading from Workbox v5.

## Breaking Changes

### workbox-core

The `skipWaiting()` method in `workbox-core` will no longer add in an `install` handler and is
equivalent to just calling `self.skipWaiting()`. 

From now on, use `self.skipWaiting()` instead since `skipWaiting()` will likely be removed in
Workbox v7.

### workbox-precaching

- Cross-origin HTML documents for URLs that correspond to an HTTP redirect can no longer be used to
  satisfy a navigation request with `workbox-precaching`. This scenario is generally uncommon.

- The `fbclid` URL query parameter is now ignored by `workbox-precaching` when looking up a
  precached response for a given request.

### workbox-routing

The `setDefaultHandler()` method now takes an optional second parameter corresponding to the HTTP
method that it applies to, defaulting to `'GET'`. 

- If you use `setDefaultHandler()` and all your requests are `GET`, then no changes need to be made.

- If have any requests that are not `GET` (`POST`, `PUT`, etc...), `setDefaultHandler()` will no
  longer cause those requests to match.

### Build Configuration

The `mode` option for the `getManifest` and `injectManifest` modes in `workbox-build` and
`workbox-cli` was not intended to be supported and has been removed. This does not apply to
`workbox-webpack-plugin`, which does support `mode` in its `InjectManifest` plugin.

### Build Tools Require Node.js v10 or Higher

Node.js versions prior to v10 are no longer supported for `workbox-webpack-plugin`, `workbox-build`,
or `workbox-cli`. Please update your Node.js runtime to a [supported
version](https://nodejs.org/en/about/releases/).

## New Improvements

### workbox-strategies

Workbox v6 introduces a new way for third-party developers to define their own Workbox strategies.
This ensures third-party developers have the capability to extend Workbox in ways that fully meet
their needs.

#### New Strategy base class

In v6, all Workbox strategy classes must extend the new `Strategy` base class. All of the built-in
strategies have been rewritten to support this. 

The `Strategy` base class is responsible for two primary things:

- Invoking plugin lifecycle callbacks common to all strategy handlers (e.g. when they start,
  respond, and end).
- Creating a "handler" instance, that can manage state for each individual request a strategy is
  handling.

#### New "handler" class

We previously had internal modules call `fetchWrapper` and `cacheWrapper`, which (as their name
implies) wrap the various fetch and cache APIs with hooks into their lifecycle. This is the
mechanism that currently allows plugins to work, but it's not exposed to developers.

The new "handler" class, `StrategyHandler`, will expose these methods so custom strategies can call
`fetch()` or `cacheMatch()` and have any plugins that were added to the strategy instance
automatically invoked.

This class would also make it possible for developers to add their own custom, lifecycle callbacks
that might be specific to their strategies, and they would "just work" with the existing plugin
interface.

#### New plugin lifecycle state

In Workbox v5, plugins are stateless. That means if a request for `/index.html` triggers both the
`requestWillFetch` and `cachedResponseWillBeUsed` callbacks, those two callbacks have no way of
communicating with each other or even knowing that they were triggered by the same request.

In v6, all plugin callbacks will also be passed a new `state` object. This state object will be
unique to this particular plugin object and this particular strategy invocation (i.e. the call to
`handle()`). This allows developers to write plugins where one callback can conditionally do
something based on what another callback in the same plugin did (e.g. compute the time delta between
running `requestWillFetch` and `fetchDidSucceed` or `fetchDidFail`).

#### New plugin lifecycle callbacks

New plugin lifecycle callbacks have been added to allow developers to fully leverage the plugin
lifecycle state:

- `handlerWillStart`: called before any handler logic starts running. This callback can be used to
  set the initial handler state (e.g. record the start time).
- `handlerWillRespond`: called before the strategies `handle()` method returns a response. This
  callback can be used to modify that response before returning it to a route handler or other
  custom logic.
- `handlerDidRespond`: called after the strategy's `handle()` method returns a response. This
  callback can be used to record any final response details, e.g. after changes made by other
  plugins.
- `handlerDidComplete`: called after all [extend lifetime
  promises](https://w3c.github.io/ServiceWorker/#extendableevent-extend-lifetime-promises) added to
  the event from the invocation of this strategy have settled. This callback can be used to report
  on any data that needs to wait until the handler is done in order to calculate (e.g. cache hit
  status, cache latency, network latency).
- `handlerDidError`: called if the handler was unable to provide a valid response from any source.
  This callback can be used to provide "fallback" content as an alternative to a network error.

Developers implementing their own custom strategies do not have to worry about invoking these
callbacks themselves; that's all handled by a new `Strategy` base class.

#### More accurate TypeScript types for handlers

TypeScript definitions for various callback methods have been normalized. This should lead to a
better experience for developers who use TypeScript and write their own code to implement or call
handlers.

### workbox-window

#### New messageSkipWaiting() method

A new method, `messageSkipWaiting()`, has been added to the `workbox-window` module to simplify the
process of telling the ["waiting" service
worker](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle#waiting) to
activate. This offers some improvements:

- It calls `postMessage()` with the de facto standard message body, `{type: 'SKIP_WAITING'}`, that a
  service worker generated by Workbox checks for to trigger `skipWaiting()`.

- It chooses the correct "waiting" service worker to post this message to, even if it's not the same
  service worker that `workbox-window` was registered with.

#### Removal of "external" events in favor of an isExternal property

All ["external"](https://developers.google.com/web/tools/workbox/modules/workbox-window) events in
`workbox-window` have been removed in place of "normal" events with an `isExternal` property set to
`true`. This allows developers who care about the distinction to still detect it, and developers who
don't need to know can ignore the property.

#### Cleaner "Offer a page reload for users" recipe

Thanks to both of the above changes, the ["Offer a page reload for
users"](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users)
recipe can be simplified:

```html
// v6:
<script type="module">
import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/6.0.0-alpha.1/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  const showSkipWaitingPrompt = () => {
    // This assumes a hypothetical createUIPrompt() method with
    // onAccept and onReject callbacks:
    const prompt = createUIPrompt({
      onAccept: () => {
        wb.addEventListener('controlling', () => {
          window.location.reload();
        });

        // This will postMessage() to the waiting service worker.
        wb.messageSkipWaiting();
      },

      onReject: () => {
        prompt.dismiss();
      }
    });
  };

  // Listening for externalwaiting is no longer needed.
  wb.addEventListener('waiting', showSkipWaitingPrompt);
  wb.register();
}
</script>
```

### workbox-routing

A new boolean parameter, `sameOrigin`, is passed to the
[`matchCallback`](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-routing#~matchCallback)
function used in `workbox-routin`g. It's set to `true` if the request is for a same-origin URL, and
false otherwise.

This simplifies some common boilerplate:

```js
// In v5:
registerRoute(
  ({url}) => url.origin === self.location.origin &&
             url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({cacheName: 'local-png'}),
);

// In v6:
registerRoute(
  ({sameOrigin, url}) => sameOrigin &&
                         url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({cacheName: 'local-png'}),
);
```

### matchOptions in workbox-expiration

You can now set `matchOptions` in `workbox-expiration`, which will then be passed through as the
`CacheQueryOptions` to the underlying `cache.delete()` call. (Most developers won't need to do
this.)

### workbox-precaching

#### Uses workbox-strategies

`workbox-precaching` has been rewritten to use `workbox-strategies` as
a base. This should not result in any breaking changes, and should lead to better long-term
consistency in how the two modules access the network and cache.

#### Precaching now processes entries one by one, not in bulk

`workbox-precaching` has been updated so that only one entry in the precache manifest is requested
and cached at a time, instead of attempting to request and cache all of them at once (leaving it to
the browser to figure out how to throttle).

This should reduce the likelihood of `net::ERR_INSUFFICIENT_RESOURCES` errors while precaching, and
also should reduce the bandwidth contention between precaching and simultaneous requests made by the
web app.

#### PrecacheFallbackPlugin allows for easier offline fallback

`workbox-precaching` now includes a `PrecacheFallbackPlugin`, which implements the new
`handlerDidError` lifecycle method added in v6.

This makes it easy to specify a precached URL as a "fallback" for a given strategy when a response
otherwise wouldn't be available. The plugin will take care of properly constructing the correct
cache key for the precached URL, including any revision parameter that's needed.

Here's a sample of using it to respond with a precached `/offline.html` when the `NetworkOnly`
strategy can't generate a response for a navigation request—in other words, displaying a custom
offline HTML page:

```js
import {PrecacheFallbackPlugin, precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import {NetworkOnly} from 'workbox-strategies';

// Ensure that /offline.html is part of your precache manifest!
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({request}) => request.mode === 'navigate',
  new NetworkOnly({
    plugins: [
      new PrecacheFallbackPlugin({
        fallbackURL: '/offline.html',
      }),
    ],
  }),
);
```

#### precacheFallback in runtime caching

If you're using `generateSW` to create a service worker for you instead of writing your service
worker by hand, you can use the new `precacheFallback` configuration option in `runtimeCaching` to
accomplish the same thing:

```js
{
  // ... other generateSW config options...
  runtimeCaching: [{
    urlPattern: ({request}) => request.mode === 'navigate',
    handler: 'NetworkOnly',
    options: {
      precacheFallback: {
        // This URL needs to be included in your precache manifest.
        fallbackURL: '/offline.html',
      },
    },
  }],
}
```

## Getting Help

We anticipate most migrations to be straightforward. If you run into issues not covered in this
guide, please let us know by [opening an issue](https://github.com/GoogleChrome/workbox/issues/new)
on GitHub.
