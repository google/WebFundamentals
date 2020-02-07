project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-cacheable-response.

{# wf_updated_on: 2020-01-15 #}
{# wf_published_on: 2017-11-27 #}
{# wf_blink_components: N/A #}

# Workbox Cacheable Response  {: .page-title }

## What's a Cacheable Response?

When caching assets at runtime, there's no one-size-fits-all rule for whether a
given [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) is
"valid" and eligible for being saved and reused.

The `workbox-cacheable-response` module provides a standard way of determining
whether a response should be cached based on its
[numeric status code](https://developer.mozilla.org/en-US/docs/Web/API/Response/status),
the presence of a
[header](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers)
with a specific value, or a combination of the two.

## Caching Based on Status Codes

You can configure a [Workbox strategy](./workbox-strategies) to consider
a set of status codes as being eligible for caching by adding a
`CacheableResponsePlugin` instance to a strategy's `plugins` parameter:

```js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

registerRoute(
  new RegExp('^https://third-party\\.example\\.com/images/'),
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);
```

This configuration tells Workbox that when processing responses for
requests against `https://third-party.example.com/images/`, cache any requests
with a status code of `0` or `200`.

Note: Status code `0` is used for
[opaque responses](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses).

## Caching Based on Headers

You can configure a [Workbox strategy](./workbox-strategies) to check
for the presence of specific header values as criteria for being added
to the cache by setting the `headers` object when constructing the plugin:

```js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

registerRoute(
  new RegExp('/path/to/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        headers: {
          'X-Is-Cacheable': 'true',
        },
      })
    ]
  })
);
```

When processing responses for request URLs containing `/path/to/api/`,
take a look at the header named `X-Is-Cacheable` (which would be added
to the response by the server). If that header is present, and if it is
set to a value of 'true', then the response can be cached.

If multiple headers are specified, then only one of the headers needs to
match the associated values.

## Caching Based on Headers and Status Codes

You can mix together both status and header configuration. Both conditions
must be met in order for a response to be considered cacheable; in other words,
the response must have one of the configured status codes, **and** it must
have at least one of the provided headers.

```js
import {registerRoute} from 'workbox-routing';
import {CacheFirst} from 'workbox-strategies';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

registerRoute(
  new RegExp('/path/to/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200, 404],
        headers: {
          'X-Is-Cacheable': 'true',
        },
      })
    ]
  })
);
```

## What Are the Defaults?

If you use one of Workbox's built-in strategies without explicitly
configuring a `cacheableResponse.CacheableResponsePlugin`, the following default criteria is
used to determine whether a response received from the network should
be cached:

* staleWhileRevalidate and networkFirst: Responses with a status of `0`
(i.e. [opaque responses](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses))
or `200` are considered cacheable.
* cacheFirst: Responses with a status of `200` are considered cacheable.

By default, response headers are not used to determine cacheability.

### Why are there Different Defaults?

The defaults vary around whether responses with a status of `0`
(i.e. [opaque responses](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses))
will end up cached. Due to the "black box" nature of opaque responses,
it's not possible for the service worker to know whether the response
is valid, or whether it reflects an error response returned from the
cross-origin server.

For strategies that include some means of updating the cached response,
like staleWhileRevalidate and networkFirst, the risk of caching a
transient error response is mitigated by the fact that the next time
the cache is updated, a proper, successful response will hopefully be used.

For strategies that involve caching the first response received and
reusing that cached response indefinitely, the repercussions of a
transient error getting cached and reused are more severe. To err on the
safe side by default, cacheFirst will refuse to save a response unless it
has a status code of `200`.

## Advanced Usage

If you want to use the same caching logic outside of a Workbox strategy, you
can use the `CacheableResponse` class directly.

```js
import {CacheableResponse} from 'workbox-cacheable-response';

const cacheable = new CacheableResponse({
  statuses: [0, 200],
  headers: {
    'X-Is-Cacheable': 'true',
  },
});

const response = await fetch('/path/to/api');

if (cacheable.isResponseCacheable(response)) {
  const cache = await caches.open('api-cache');
  cache.put(response.url, response);
} else {
  // Do something when the response can't be cached.
}
```
