project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on configuring Workbox to avoid storage quota issues.

{# wf_updated_on: 2020-01-15 #}
{# wf_published_on: 2018-06-26 #}
{# wf_blink_components: N/A #}

# Understanding Storage Quota {: .page-title }

All browsers impose an upper limit on the amount of storage that your web app's
[origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) is allowed to
use. You can configure Workbox to automatically clean up the data it caches at runtime in order to
avoid running into storage quota limitations.

## What configuration options are supported?

When setting up a route and runtime caching strategy, you can add in an instance
of `ExpirationPlugin` from
[workbox-expiration](/web/tools/workbox/reference-docs/latest/module-workbox-expiration.ExpirationPlugin)
configured with settings that make the most sense for the type of assets you're
caching.

For instance, the following configuration might be used for caching images at runtime, with both
explicit limits as well as automatic cleanup if quota is exceeded:

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  // Match common image extensions.
  new RegExp('\\.(?:png|gif|jpg|jpeg|svg)$'),
  // Use a cache-first strategy with the following config:
  new CacheFirst({
    // You need to provide a cache name when using expiration.
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        // Keep at most 50 entries.
        maxEntries: 50,
        // Don't keep any entries for more than 30 days.
        maxAgeSeconds: 30 * 24 * 60 * 60,
        // Automatically cleanup if quota is exceeded.
        purgeOnQuotaError: true,
      }),
    ],
  }),
);
```

You need to set `maxEntries`, `maxAgeSeconds`, or both when using
`ExpirationPlugin`. `purgeOnQuotaError` is optional.

### maxEntries

This imposes an upper limit on the number of entries (i.e. unique URLs) for a given cache.

Setting this is normally a good idea, unless you know that there are only a small number of
possible URLs that ever might be handled by a given strategy.

### maxAgeSeconds

Entries that were added to the cache more than this number of seconds ago will be considered
stale, and automatically cleaned up the next time the cache is accessed.

This is not as effective in managing storage quota as `maxEntries`, since your caches can grow
arbitrarily large as long as the entries were all added within a small period of time. It's most
useful when you know that there's an upper limit on freshness that you want to impose, and keeping
around older entries has little value for your web app.

### purgeOnQuotaError

This option, added in the [v3.3.0 release](https://github.com/GoogleChrome/workbox/releases/tag/v3.3.0),
allows you to mark a given cache as being safe to automatically delete in the event of your web
app exceeding the available storage.

This option currently defaults to `false`. Runtime caches should, in general, be resilient in the
face of deletion, so setting this option to `true` is a good practice, and helps ensure your web
app can automatically recover in the face of storage constraints.

## How much data are you allowed to store?

Each browser has its own upper limits on storage, so there's no single answer. Additionally, some
browsers have a dynamic limit which varies based on the amount of storage that's free on a given
device, so the effective upper limit might change without notice.

Some browsers expose an interface for querying the approximate amount of storage that your origin
is using, along with the upper limit, via `navigator.storage.estimate()`. The
"[Estimating Available Storage Space](/web/updates/2017/08/estimating-available-storage-space)"
article has more information on how you can use that in your own web apps.

### Special Chrome Incognito considerations

Opening a web app in [Chrome's Incognito mode](https://support.google.com/chrome/answer/95464)
imposes a special restriction on storage that doesn't apply to normal browsing contexts: there's a
quota limit of around 100 megabytes, regardless of free space available on your device.

## Beware of opaque responses!

A common source of unexpectedly high quota usage is due to runtime caching of
[opaque responses](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses),
which is to say, [cross-origin responses](handle-third-party-requests) to requests made without
[CORS](https://fetch.spec.whatwg.org/#http-cors-protocol) enabled.

Browsers automatically inflate the quota impact of those opaque responses as a security
consideration. In Chrome, for instance, even an opaque response of a few kilobytes will end up
contributing [around 7 megabytes](https://bugs.chromium.org/p/chromium/issues/detail?id=796060#c17)
towards your quota usage.

You can quickly use up much more quota than you'd anticipate once you start caching opaque
responses, so the best practice is to use `ExpirationPlugin` with `maxEntries`, and
potentially `purgeOnQuotaError`, configured appropriately.
