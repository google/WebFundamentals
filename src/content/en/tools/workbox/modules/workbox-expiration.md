project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-expiration.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2020-01-30 #}
{# wf_published_on: 2017-11-27 #}

# Workbox Expiration {: .page-title }

## What is Cache Expiration?

It’s fairly common to want to put restrictions on a cache in terms of how long
it should allow items to be stored in a cache or how many items should be kept
in a cache. Workbox provides this functionality through the
`workbox-expiration` plugin that allows you to limit the number of
entries in a cache and / or remove entries that have been cached for a long
period of time.

## Restrict the Number of Cache Entries

To restrict the number of entries stored in a cache, you can use the
`maxEntries` option like so:

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  new RegExp('/images/'),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
      }),
    ],
  })
);
```

With this, the
[Plugin](/web/tools/workbox/reference-docs/latest/module-workbox-expiration.ExpirationPlugin)
will be added to this route. After a cached response is used or a new request
is added to the cache, the plugin will look at the configured cache and ensure
that the number of cached entries doesn’t exceed the limit. If it does,
**the oldest entries will be removed**.

## Restrict the Age of Cached Entries

To restrict how long a request is cached for, you can define a max age in
seconds using the `maxAgeSeconds` option like so:

```javascript
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';

registerRoute(
  /\/images\//,
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 24 * 60 * 60,
      }),
    ],
  })
);
```

The plugin will check and remove entries after each request or cache update.

One thing to note:

- Because it’s slow to open IndexedDB, expiration won’t occur until
*after* the request is used. This means that an expired request may be
used once, but will be expired after that.
- To alleviate this, the plugin will check the "Date" header of the cached
response, if one exists and the date can be parsed, it’ll expire based on this
as it doesn’t require an IndexedDB lookup.

## Advanced Usage

If you’d like to use the expiration logic separate from any other Workbox
module, you can do so with the
[CacheExpiration](/web/tools/workbox/reference-docs/latest/module-workbox-expiration.CacheExpiration)
class.

To apply restrictions to a cache, you’d create an instance of `CacheExpiration`
for the cache you want to control like so:

```javascript
import {CacheExpiration} from 'workbox-expiration';

const cacheName = 'my-cache';
const expirationManager = new CacheExpiration(
  cacheName,
  {
    maxAgeSeconds: 24 * 60 * 60,
    maxEntries: 20,
  }
);
```

Whenever you update a cached entry, you need to call the `updateTimestamp()`
method so that its age is updated.

```javascript
await openCache.put(
  request,
  response
);

await expirationManager.updateTimestamp(request.url);
```

Then, whenever you want to expire a set of entries, you can call the
`expireEntries()` method which will enforce the `maxAgeSeconds` and
`maxEntries` configuration.

```javascript
await expirationManager.expireEntries();
```
