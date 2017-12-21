project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description:Get Started with Workbox.

{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

# Get Started {: .page-title }

{% include "web/tools/workbox/_shared/alpha.html" %}

This guide will show you how to get up and running with Workbox to route
common requests for a web page and demonstrate how to cache using a common
strategy.

Since most websites contain CSS, JavaScript and images, let’s look at how we
can cache and serve these files using a service worker and Workbox.

## Create and Register a Service Worker File

Before we can use Workbox, we need to create a service worker file and
register it to our web site.

Start by creating a file called `sw.js` at the root of your site and add a
console message to the file (This is so we can see it load).

```javascript
console.log('Hello from sw.js');
```

In your web page register your new service worker file like so:

<pre class="prettyprint html">
&lt;script&gt;
// Check that service workers are registered
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
</pre>

This tells the browser this is the service worker to use for site.

If you refresh your page you'll see the log from your service worker file.

![Console message from sw.js in DevTools](../images/guides/get-started/hello-console.png)

Looking in the “Application” tab in Chrome DevTools you should see your service
worker registered.

![Application Tab displaying a registered service worker.](../images/guides/get-started/application-tab.png)

Note: Click the “Update on reload” checkbox to make it easier to develop with
your new service worker.

Now that we have a service worker registered, let’s look at how we can use
Workbox.

## Importing Workbox

To start using Workbox you just need to import the `workbox-sw.js` file in your
service worker.

Change your service worker so that it has the following `importScripts()` call.

<pre class="prettyprint js">
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
</pre>

With this you should see the “Yay” message so we know that Workbox is
officially loaded in our service worker.

![DevTools screenshot of Workbox loading in a service worker.](../images/guides/get-started/yay-loaded.png)

Now we can start using Workbox.

## Using Workbox

One of Workbox’s primary features is it’s routing and and caching strategy
modules. It allows you to listen for requests from your web page and determine
if and how that request should be cached and responded to.

Let’s add a cache fallback to our JavaScript files. The easiest way to do this
is to register a route with Workbox that will match any “.js” files that are
requested, which we can do with a regular expression:

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  …
);
```

This tells Workbox that when a request is made, it should see if the regular
expression matches part of the URL, and if it does, do something with that
request. For this guide, that “do something” is going to be passing the request
through one of Workbox’s caching strategies.

If we want our JavaScript files to come from the network whenever possible,
but fallback to the cached version if the network fails, we can use the
“network first” strategy to achieve this.

```javascript
workbox.routing.registerRoute(
  new RegExp('.*\.js'),
  workbox.strategies.networkFirst()
);
```

Add this code to your service worker and refresh the page. If your web page
has JavaScript files in it, you should see some logs similar to this:

![Example console logs from routing a JavaScript file.](../images/guides/get-started/routing-example.png)

Workbox has routed the request for any “.js” files and used the network first
strategy to determine how to respond to the request. You can look in the
caches of DevTools to check that the request has actually been cached.

![Example of a JavaScript file being cached.](../images/guides/get-started/cached-request.png)

Workbox provides a few caching strategies that you can use. For example, your
CSS could be served from the cache first and updated in the background or your
images could be cached and used until it’s a week old, after which it’ll need
updating.

```javascript
workbox.routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  // Use cache but update in the background ASAP
  workbox.strategies.staleWhileRevalidate({
    // Use a custom cache name
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  workbox.strategies.cacheFirst({
    // Use a custom cache name
    cacheName: 'image-cache',
    cacheExpiration: {
      // Cache only 20 images
      maxEntries: 20,
      // Cache for a maximum of a week
      maxAgeSeconds: 7 * 24 * 60 * 60,
    }
  })
);
```

## What Else Can Workbox Do?

Routing and caching strategies are performed by the `routing` and
`strategies` modules, but there are plenty of other modules, each offering
specific behaviours that you can use in your service worker.

You'll find a number of guides that cover other features of Workbox as well
as more information on configuring Workbox. Find a full list on the left, but
the next natural step is to enable precaching, which is the process of adding
files to the cache when your service worker loads.

<a href="./precache-files" class="button">Learn More About Precaching</a>
