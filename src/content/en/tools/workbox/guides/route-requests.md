project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to route requests with Workbox.

{# wf_updated_on: 2020-01-15 #}
{# wf_published_on: 2017-11-15 #}
{# wf_blink_components: N/A #}

# Route Requests {: .page-title }

Routing in Workbox is the process of a Router *matching* a request to a
route and the route then *handling* that request (i.e. providing a response).

There are three ways developers can match a request with `workbox-routing`:

1. A string.
1. A regular expression.
1. A callback function.

We’ll first look at how you can match using these three approaches and
then we’ll go on to cover the handling of a request, which is where the
`handler` variable will serve as a placeholder.

## Matching a Route with a String

Matching a route with a string is the easiest to understand, but also the
least flexible option.

The request's URL is compared to the route's string and if they are equal, the
request will use that route's handler.

So we could define a route for '/logo.png' like so:

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  '/logo.png',
  handler
);
```

The only thing to be wary of is that this would only match for requests
on your origin. If there was a separate site that had the URL
`https://some-other-origin.com/logo.png`, this route wouldn’t match, because
in most cases, that’s not what was intended. Instead, you’d need to define
the entire URL to match.

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  'https://some-other-origin.com/logo.png',
  handler
);
```

## Matching a Route with a Regular Expression

When you have a set of URLs that you want to route as a group, regular
expressions are the best way to go.

The regular expression provided is tested against the full URL. If there's a match, the route will
be triggered. This provides a lot of flexibility as to how you use it.
If we wanted to route specific file extensions, we could write routes such as:

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  new RegExp('\\.js$'),
  jsHandler
);

registerRoute(
  new RegExp('\\.css$'),
  cssHandler
);
```

Or you can write regular expressions that test for a specific URL format: for
example, a blog that follows the format `/blog/<year>/<month>/<post title slug>`:

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  new RegExp('/blog/\\d{4}/\\d{2}/.+'),
  handler
);
```

Just like with string matching, requests for different origins are treated differently. Instead of
matching against any part of the URL, the regular expression must match from
the beginning of the URL in order to trigger a route when there's a cross-origin request.

For example, the previous regular expression `new RegExp('/blog/\\d{4}/\\d{2}/.+')` would not match
a request for `https://some-other-origin.com/blog/<year>/<month>/<post title slug>`. If we wanted a
route that would match that general path pattern made against both same- and cross-origin requests,
using a regular expression with a wildcard (`.+`) at the start is one approach:

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  new RegExp('.+/blog/\\d{4}/\\d{2}/.+'),
  handler
);
```

Similarly, if we wanted to take the previous examples that matched CSS or JS URLs and have them
apply to both same- and cross-origin requests, they can be modified to add in a wildcard:

```javascript
import {registerRoute} from 'workbox-routing';

registerRoute(
  new RegExp('.+\\.js$'),
  jsHandler
);

registerRoute(
  new RegExp('.+\\.css$'),
  cssHandler
);
```

## Matching a Route with a Callback Function

To allow developers to do anything they want to match a request, you can also
provide a function that can determine whether a request should match a route on
any criteria it wishes.

The callback will receive an object with the request's URL and the `FetchEvent`
received in the service worker.

```javascript
import {registerRoute} from 'workbox-routing';

const matchFunction = ({url, event}) => {
  // Return true if the route should match
  return false;
};

registerRoute(
  matchFunction,
  handler
);
```

Now that a request can be matched with a route, it’s time to handle the
request (i.e. provide a Response for the request).

There are two ways you can  handle a request:

1. Use one of Workbox’s strategies provided by [workbox-strategies](/web/tools/workbox/modules/workbox-strategies).
1. Provide a callback function that returns a Promise that resolves to a
`Response`.

## Handling a Route with a Workbox Strategy

Most routes can be handled with one of the built in caching strategies.

- Stale While Revalidate
    - This strategy will use a cached response for a request if it is
    available and update the cache in the background with a response form
    the network. (If it’s not cached it will wait for the network response
    and use that.) This is a fairly safe strategy as it means users are
    regularly updating their cache. The downside of this strategy is that
    it’s always requesting an asset from the network, using up the user’s
    bandwidth.
- Network First
    - This will try to get a response from the network first. If it receives
    a response, it’ll pass that to the browser and also save it to a cache.
    If the network request fails, the last cached response will be used.
- Cache First
    - This strategy will check the cache for a response first and use that
    if one is available. If the request isn’t in the cache, the network will
    be used and any valid response will be added to the cache before being
    passed to the browser.
- Network Only
    - Force the response to come from the network.
- Cache Only
    - Force the response to come from the cache.

Using these as your `handler` can be done like so:

```javascript
import {registerRoute} from 'workbox-routing';
import * as strategies from 'workbox-strategies';

registerRoute(
  match,
  new strategies.StaleWhileRevalidate()
);

registerRoute(
  match,
  new strategies.NetworkFirst()
);

registerRoute(
  match,
  new strategies.CacheFirst()
);

registerRoute(
  match,
  new strategies.NetworkOnly()
);

registerRoute(
  match,
  new strategies.CacheOnly()
);
```

With each strategy you can customize the behavior of the Route by defining
a custom cache to use and / or adding plugins.

```javascript
import {StaleWhileRevalidate} from 'workbox-strategies';

new StaleWhileRevalidate({
   // Use a custom cache for this route.
  cacheName: 'my-cache-name',

  // Add an array of custom plugins (e.g. `ExpirationPlugin`).
  plugins: [
    ...
  ]
});
```

These options are often needed to make it safer when caching requests
(i.e. limiting how long they are cached or making sure the data used on a
device is limited).

## Handling a Route with a Custom Callback

There may be scenarios where you’d like to respond to a request with a different
strategy of your own or simply generating the request in the service worker with
templating. For this you can provide an `async` function which returns a
`Response` object. It'll be called with a parameter object containing `url` and
`event` (the `FetchEvent`) properties.

```javascript
import {registerRoute} from 'workbox-routing';

const handler = async ({url, event}) => {
  return new Response(`Custom handler response.`);
};

registerRoute(match, handler);
```

One thing to note is that if you return a value in the `match` callback,
it’ll be passed into the `handler` callback as a `params` argument.

```javascript
import {registerRoute} from 'workbox-routing';

const match = ({url, event}) => {
  return {
    name: 'Workbox',
    type: 'guide',
  };
};

const handler = async ({url, event, params}) => {
   // Response will be "A guide to Workbox"
  return new Response(
    `A ${params.type} to ${params.name}`
  );
};

registerRoute(match, handler);
```

This may be helpful if there are pieces of information in the URL that can
be parsed once in the `match` callback and used in your `handler`.
