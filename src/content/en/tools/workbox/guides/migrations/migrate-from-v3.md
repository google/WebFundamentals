project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide to migrating from Workbox v3 to v4.

{# wf_updated_on: 2019-12-20 #}
{# wf_published_on: 2019-02-25 #}
{# wf_blink_components: N/A #}

# Migrate from Workbox v3 to v4 {: .page-title }

This guide is focused on breaking changes introduced in Workbox v4, with
examples of what changes you'd need to make when upgrading from Workbox v3.

## Breaking Changes

### workbox-precaching

The naming convention for precached entries has been updated. Now, for entries
whose URLs need revisioning information (i.e. those entries that contain a
`revision` field in the
[precache manifest](/web/tools/workbox/modules/workbox-precaching#explanation_of_the_precache_list)),
that versioning information will be stored as part of the cache key, in a
special `__WB_REVISION__` URL query parameter appended to the original URL.
(Previously, this information was stored separate from the cache keys, using
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB).)

Developers who take advantage of precaching via
<code>[workbox.precaching.precacheAndRoute()](/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.precacheAndRoute)</code>,
which is the most common use case, do not need to make any changes to their
service worker configuration; upon upgrading to Workbox v4, your users' cached
assets will automatically migrate to the new cache key format, and moving
forward, precached resources will continue to be served in the same manner as
before.

#### Using Cache Keys Directly

Some developers might need to access precache entries directly, outside of the
context of `workbox.precaching.precacheAndRoute()`. For instance, you might
precache an image that you end up using as a "fallback" response when an actual
image can't be fetched from the network.

If you make use of precached assets this way, starting in Workbox v4, you'll
need to take an additional step in order to translate an original URL into the
corresponding cache key that can be used to read the cached entry. You do this
by calling `workbox.precaching.getCacheKeyForURL(originURL)`.

For example, if you know that `'fallback.png'` is precached:

```javascript
const imageFallbackCacheKey = workbox.precaching.getCacheKeyForURL('fallback.png');

workbox.routing.setCatchHandler(({event}) => {
  switch (event.request.destination) {
    case 'image':
      return caches.match(imageFallbackCacheKey);
    break;
    // ...other fallback logic goes here...
  }
});
```

#### Cleaning Up Old Precached Data

The changes made to precaching in Workbox v4 mean that older precaches, created
by previous versions of Workbox, are not compatible. By default, they're left
as-is, and if you upgrade from Workbox v3 to Workbox v4, you'll end up with two
copies of all your precached resources.

To avoid this, you can add call to `workbox.precaching.cleanupOutdatedCaches()`
to a service workers directly, or set the new `cleanupOutdatedCaches: true`
option if using a build tool in `GenerateSW` mode. Because the cache cleanup
logic operates on cache naming conventions to find older precaches, and because
developers do have the option of overriding those conventions, we erred on the
side of safety and did not enable this by default.

We encourage developers who run into any issues using this, such as
false-positives around deletion, to [please let us know](https://github.com/GoogleChrome/workbox/issues/new).

#### Parameter Capitalization

Two
[optional parameters](/web/tools/workbox/reference-docs/latest/module-workbox-precaching#.addRoute)
that can be passed to `workbox.precaching.precacheAndRoute()` and
`workbox.precaching.addRoute() ` have been renamed, to standardize our overall
capitalization convention. `ignoreUrlParametersMatching` is now
`ignoreURLParametersMatching`, and `cleanUrls` is now `cleanURLs`.

### workbox-strategies

There are two, roughly equivalent ways of creating an instance of a handler in
`workbox-strategies`. We're deprecating the [factory method](https://en.wikipedia.org/wiki/Factory_method_pattern),
in favor of explicitly calling the strategy's constructor.

```javascript
// This factory method syntax has been deprecated:
const networkFirstStrategy = workbox.strategies.networkFirst({...});

// Instead, use the constructor directly:
// (Note that the class name is Uppercase.)
const networkFirstStrategy = new workbox.strategies.NetworkFirst({...});
```

While the factory method syntax will continue working in v4, using it will log a
warning, and we encourage developers to migrate in advance of removing support
in the future v5 release.

### workbox-background-sync

The
[`workbox.backgroundSync.Queue` class](/web/tools/workbox/reference-docs/latest/module-workbox-background-sync.Queue#Queue)
has been rewritten to offer developers more flexibility and control over how
requests are added to the queue and replayed.

In v3, the `Queue` class had a single way to add requests to the queue (the
`addRequest()` method), but it did not have any way to modify the queue or
remove requests.

In v4, the `addRequests()` method has been removed, and the following array-like
methods have been added:

- `pushRequest()`
- `popRequest()`
- `shiftRequest()`
- `unshiftRequest()`

In v3, the `Queue` class also accepted several callbacks that allowed you to
observe when requests were being replayed (`requestWillEnqueue`,
`requestWillReplay`, `queueDidReplay`), but most developers found that, in
addition to observation, they wanted control over how the queue was replayed,
including the ability to dynamically modify, re-order, or even cancel
individual requests.

In v4, these callbacks have been removed in favor of a single
[`onSync` callback](/web/tools/workbox/reference-docs/latest/module-workbox-background-sync.Queue#Queue),
which is invoked any time a replay attempt is being made by the browser. By
default the `onSync` callback will invoke `replayRequests()`, but if you need
more control over the replay process, you can use the array-like methods listed
above to replay the queue however you like.

Here's an example of custom replay logic:

```javascript
const queue = new workbox.backgroundSync.Queue('my-queue-name', {
  onSync: async ({queue}) => {
    let entry;
    while (entry = await this.shiftRequest()) {
      try {
        await fetch(entry.request);
      } catch (error) {
        console.error('Replay failed for request', entry.request, error);
        await this.unshiftRequest(entry);
        return;
      }
    }
    console.log('Replay complete!');
  }
});
```

Similarly, the
[`workbox.backgroundSync.Plugin`](/web/tools/workbox/reference-docs/latest/module-workbox-background-sync.Plugin)
class accepts the same arguments as the `Queue` class (since it creates a
`Queue` instance internally), so it has changed in the same way.

### workbox-expiration

The `npm` package has been renamed
<code>[workbox-expiration](https://www.npmjs.com/package/workbox-expiration)</code>,
matching the naming convention used for other modules. This package is
functionally equivalent to the older
<code>[workbox-cache-expiration package](https://www.npmjs.com/package/workbox-cache-expiration)</code>,
which is now deprecated.

### workbox-broadcast-update

The `npm` package has been renamed
<code>[workbox-broadcast-update](https://www.npmjs.com/package/workbox-broadcast-update)</code>,
matching the naming convention used for other modules. This package is
functionally equivalent to the older
<code>[workbox-broadcast-cache-update package](https://www.npmjs.com/package/workbox-broadcast-cache-update)</code>,
which is now deprecated.

### workbox-core

In Workbox v3 the verbosity of log levels could be controlled via the
`workbox.core.setLogLevel()` method, which you'd pass one of the values in the
`workbox.core.LOG_LEVELS` enum. You could also read the current log level via
`workbox.core.logLevel`.

In Workbox v4, all of these have been removed since all modern developer tools
now ship with rich log filtering capabilities (see
[filtering the console output](/web/tools/chrome-devtools/console/#filtering_the_console_output)
for Chrome Dev Tools).

### workbox-sw

Two methods that were previously exposed directly on the `workbox` namespace
(which corresponds to the `workbox-sw` module) have been moved to `workbox.core`
instead. `workbox.skipWaiting()` has become `workbox.core.skipWaiting()` and
similarly, `workbox.clientsClaim()` has become `workbox.core.clientsClaim()`.

### Build Tool Configuration

The naming of some options that can be passed in to either workbox-cli,
workbox-build, or workbox-webpack-plugin has changed. Whenever "Url" was used in
an option name, it's been deprecated in favor of "URL". This means that the
following option names are preferred:

- `dontCacheBustURLsMatching`
- `ignoreURLParametersMatching`
- `modifyURLPrefix`
- `templatedURLs`

The "Url" variation of those option names still works in v4, but will result in
a warning message. We encourage developers to migrate in advance of the v5
release.

## New Functionality

### workbox-window

The new `workbox-window` module simplifies the process of service worker
registration and detecting updates, and provides a standard means of
communication between code running in the service worker and code running in
your web app's `window` context.

While using `workbox-window` is optional, we hope that developers will find it
useful, and consider migrating some of their handwritten logic to use it when
appropriate. You can learn more about using `workbox-window` in the [module's guide](/web/tools/workbox/modules/workbox-window).

## Example Migration

An example of a real-world migration from Workbox v3 to v4 can be found in this
[Pull Request](https://github.com/GoogleChromeLabs/so-pwa/pull/3/files).

## Getting help

We anticipate most migrations to be straightforward. If you run into issues not covered
in this guide, please let us know by [opening an
issue](https://github.com/GoogleChrome/workbox/issues/new) on GitHub.
