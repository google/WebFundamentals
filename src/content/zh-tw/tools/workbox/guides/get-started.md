project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description:Get Started with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2018-03-13 #}
{# wf_published_on: 2017-11-15 #}

# Get Started {: .page-title }

This guide will show you how to get up and running with Workbox to route
common requests for a web page and demonstrate how to cache using a common
strategy.

Since most websites contain CSS, JavaScript and images, let’s look at how we
can cache and serve these files using a service worker and Workbox.

## 創建並註冊Service Worker文件

在我們使用工作箱之前，我們需要創建一個Service Worker文件並將其註冊到我們的網站。

Start by creating a file called `sw.js` at the root of your site and add a
console message to the file (This is so we can see it load).

```javascript
console.log('Hello from sw.js');
```

在您的網頁中註冊您的新Service Worker文件，如下所示：

{% include "web/tools/workbox/guides/_shared/register-sw.html" %}

這告訴瀏覽器這是用於站點的Service Worker。

如果刷新頁面，則會看到service worker文件中的日誌。

![Console message from sw.js in DevTools](../images/guides/get-started/hello-console.png)

Looking in the “Application” tab in Chrome DevTools you should see your service
worker registered.

![Application Tab displaying a registered service worker.](../images/guides/get-started/application-tab.png)

Note: Click the “Update on reload” checkbox to make it easier to develop with
your new service worker.

現在我們已經註冊了一名service
worker，讓我們來看看我們如何使用工作箱。

## Importing Workbox

要開始使用工作箱，只需要在service
worker中導入工作`workbox-sw.js`文件。

更改您的service
worker，使其具有以下`importScripts()`調用。

<pre class="prettyprint js">
importScripts('{% include "web/tools/workbox/_shared/workbox-sw-cdn-url.html" %}');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
</pre>

有了這個，你應該看到“Yay”消息，所以我們知道workbox已正式加載到我們的service
worker中。

![DevTools screenshot of Workbox loading in a service worker.](../images/guides/get-started/yay-loaded.png)

現在我們可以開始使用workbox了。

## Using Workbox

One of Workbox’s primary features is it’s routing and caching strategy
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

將此代碼添加到您的service
worker並刷新頁面。如果您的網頁中包含JavaScript文件，您應該看到類似如下的日誌：

![Example console logs from routing a JavaScript file.](../images/guides/get-started/routing-example.png)

Workbox已經發送了對任何“.js”文件的請求，並使用網絡優先策略來確定如何響應請求。您可以查看DevTools的緩存以檢查請求是否已實際緩存。

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
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        // Cache for a maximum of a week
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
```

## Workbox還有可以做什麼工作？

Routing and caching strategies are performed by the `routing` and
`strategies` modules, but there are plenty of other modules, each offering
specific behaviours that you can use in your service worker.

您會發現許多指南，其中涵蓋了Workbox的其他功能以及有關配置Workbox的更多信息。查找左側的完整列表，但下一步很自然的步驟是啟用預緩存，即在加載服務Service Worker時將文件添加到緩存的過程。

<a href="./precache-files" class="button">Learn More About Precaching</a>
