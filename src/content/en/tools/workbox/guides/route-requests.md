project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/next/_book.yaml
description: A guide on how to route requests with Workbox.

{# wf_updated_on: 2017-11-15 #}
{# wf_published_on: 2017-11-15 #}

# Route Requests {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

Routing in Workbox is the process of a Router *matching* a request to a
route and the route then *handling* that request (i.e. providing a response).

There are three ways developers can match a request with `workbox-routing`.

1. A string.
1. A regular expression.
1. A callback function.

We’ll first look at how you can matching using this three approaches and
then we’ll go on to cover the handling of a request, which is where the
`handler` variable will serve as a placeholder.

## Matching a Route with a String

Matching a route with a string is the easiest to understand, but also the
least flexible option.

The requests URL is compared to the routes string and if they are equal the
request will use that routes handler.

So we could define a route for '/logo.png' like so:

```javascript
workbox.routing.registerRoute(
  '/logo.png',
  handler
);
```

The only thing to be weary of is that this would only match for requests
on your origin. If there was a seperate site what had the URL
"https://some-other-origin.com/logo.png", this route wouldn’t match, because
in most cases, that’s not what was intended. Instead you’d need to define
the entire URL to match.

```javascript
workbox.routing.registerRoute(
  'https://some-other-origin.com/logo.png',
  handler
);
```

## Matching a Route with a Regular Expression

When you have a set of URLs that you want to route as a group, Regular
Expressions are the best way to go.

The regular expression needs to match part of the URL to be treated as a
match for that route. This provides a lot of flexibility as to how you use it.
If we wanted to route specific file extensions we could write routes such as:

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  jsHandler
);

workbox.routing.registerRoute(
  new RegExp('.*\.css'),
  cssHandler
);
```

Or you can write regular expressions that test for a specifc URL format, for
example a blog that follows the format `/blog/<year>/<month>/<post title slug>`.

```javascript
workbox.routing.registerRoute(
  /\/blog\/\d\d\d\d\/\d\d\/.+/,
  handler
);
```

Just like the string matching, requests for different origins are treated
differently. Instead of needing match a part of the URL, it must match from
the beginning of the URL. For example,
`https://some-other-origin.com/blog/<year>/<month>/<post title slug>` would
need to match against "https://some-other-origin.com" as well as the path
name. So we’d have to change our regular expression to something like the
following if we wanted to capture both same origin and third party origin
requests:

```javascript
workbox.routing.registerRoute(
  /(?:https:\/\/.*)?\/blog\/\d\d\d\d\/\d\d\/.+/,
  handler
);
```

## Matching a Route with a Callback Function

To allow developers to do anything they want to match a request, you can also
provide a function that can determine with a request should match a route on
any criteria it wishes.

The callback will receive an object with the requests URL and the `FetchEvent`
received in the service worker.

```javascript
const matchFunction = ({url, event}) => {
  // Return true if the route should match
  return false;
};

workbox.routing.registerRoute(
  matchFunction,
  handler
);
```

Now that a request can be matched with a route, it’s time to handle the
request (i.e. provide a Response for the request).

There are two ways you can  handle a request:

1. Use one of Workbox’s strategies provided by `workbox.strategies`.
1. Provide a callback function that returns a Promise that resolves to a
`Response`.

## Handling a Route with a Workbox Strategy

Most routes can be handled with one of the built in caching strategies.

- Stale While Revalidate
    - This strategy will use a cached response for a request if it is
    available and update the cache in the background with a response form
    the network. (If it’s not cached it will wait for the network response
    and use that). This is a fairly safe strategy as it means users are
    regularly updating their cache. The downside of this strategy is that
    it’s always requesting an asset from the network, using up the user’s
    bandwidth.
- Network First
    - This will try and get a request from the network first. If it receives
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
workbox.routing.registerRoute(
  match,
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  match,
  workbox.strategies.networkFirst()
);

workbox.routing.registerRoute(
  match,
  workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
  match,
  workbox.strategies.networkOnly()
);

workbox.routing.registerRoute(
  match,
  workbox.strategies.cacheOnly()
);
```

There are some options you can set on each strategy to customise the behavior
of a route.

```javascript
workbox.strategies.staleWhileRevalidate({
   // Use a custom cache for this route
  cacheName: 'my-cache-name',
  // Force the cache to clear out the cached requests
  cacheExpiration: {
    // Limit the cache to storing 10 requests
    maxEntries: 10,
    // Don’t let a request to be cached longer than 1 hour
    maxAgeSeconds: 60 * 60,
  },
  // Add some plugins to provide extra behaviors
  plugins: [...]
});
```

These options are often needed to make it safer when caching requests
(i.e. limiting how long they are cached or making sure the data used on a
device is limited).

## Handling a Route with a Custom Callback

There may be scenarios where you’d like to respond to a request with a
different strategy of your own or simply generating the request in the
service worker with templating. For this you can provide a function and
it’ll be called with an object containing the request url and `FetchEvent`.

```javascript
const handler = ({url, event}) => {
  return new Response(`Custom handler response.`);
};

workbox.routing.registerRoute(match, handler);
```

One thing to note is that if you return a value in the `match` callback,
it’ll be passed into the `handler` callback as a `params` argument.

```javascript
const match = ({url, event}) => {
  return {
    name: 'Workbox',
    type: 'guide',
  };
};

const handler = ({url, event, params}) => {
   // Response will be “A guide on Workbox”
  return new Response(
    `A ${params.type} on ${params.name}`
  );
};

workbox.routing.registerRoute(match, handler);
```

This may be helpful if there are pieces of information in the URL that can
be parsed once in the *match* callback and used in your *handler*.
