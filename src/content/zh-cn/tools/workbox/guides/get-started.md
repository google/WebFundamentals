project_path：/web/tools/workbox/_project.yaml book_path：/web/tools/workbox/_book.yaml description：Workbox入门。

{＃wf_blink_components：N / A＃} {＃wf_updated_on：2018-08-10＃} {＃wf_published_on：2017-11-15＃}

# Get Started {: .page-title }

This guide will show you how to get up and running with Workbox to route
common requests for a web page and demonstrate how to cache using a common
strategy.

Since most websites contain CSS, JavaScript and images, let’s look at how we
can cache and serve these files using a service worker and Workbox.

## Create and Register a Service Worker File

Before we can use Workbox, we need to create a service worker file and
register it to our website.

Start by creating a file called `sw.js` at the root of your site and add a
console message to the file (This is so we can see it load).

```javascript
console.log（'你好，来自sw.js'）;
```

In your web page register your new service worker file like so:

{％include“web / tools / workbox / guides / _shared / register-sw.html”％}

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

<pre class="prettyprint js">importScripts（'{％include“web / tools / workbox / _shared / workbox-sw-cdn-url.html”％}'）; if（workbox）{console.log（`Yay！工作箱加载🎉`）; } else {console.log（`Boo！Workbox没有加载😬`）; }</pre>

With this you should see the “Yay” message so we know that Workbox is
officially loaded in our service worker.

![DevTools screenshot of Workbox loading in a service worker.](../images/guides/get-started/yay-loaded.png)

Now we can start using Workbox.

Warning: Importing `workbox-sw.js` will create a
[`workbox` object](/web/tools/workbox/modules/workbox-sw) inside of your service worker, and that
instance is responsible for importing other helper libraries, based on the features you use. Due to
restrictions in the
[service worker specification](https://www.chromestatus.com/feature/5748516353736704),
these imports need to happen either inside of an `install` event handler, or synchronously in the
top-level code for your service worker. More details, along with workarounds, can be found in the
[`workbox-sw` documentation](/web/tools/workbox/modules/workbox-sw#avoid_async_imports).

## Using Workbox

Workbox的主要功能之一是它的路由和缓存策略模块。它允许您侦听来自网页的请求，并确定是否以及如何缓存和响应该请求。

Let’s add a cache fallback to our JavaScript files. The easiest way to do this
is to register a route with Workbox that will match any “.js” files that are
requested, which we can do with a regular expression:

```javascript
workbox.routing.registerRoute（new RegExp（'。* \ .js'），...）;
```

This tells Workbox that when a request is made, it should see if the regular
expression matches part of the URL, and if it does, do something with that
request. For this guide, that “do something” is going to be passing the request
through one of Workbox’s caching strategies.

If we want our JavaScript files to come from the network whenever possible,
but fallback to the cached version if the network fails, we can use the
“network first” strategy to achieve this.

```javascript
workbox.routing.registerRoute（new RegExp（'。* \ .js'），workbox.strategies.networkFirst（））;
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
workbox.routing.registerRoute（//缓存CSS文件/.*\。css /，//使用缓存但在后台更新ASAP workbox.strategies.staleWhileRevalidate（{//使用自定义缓存名称cacheName：'css-cache' ，}））; workbox.routing.registerRoute（//缓存图像文件/.* \。（？：png | .jpg | jpeg | svg | gif）/，//如果可用，请使用缓存workbox.strategies.cacheFirst（{//使用自定义缓存名称cacheName：'image-cache'，插件：[new workbox.expiration.Plugin（{//仅缓存20个图像maxEntries：20，//最多缓存一周maxAgeSeconds：7 * 24 * 60 * 60 ，}）]，}））;
```

## What Else Can Workbox Do?

路由和缓存策略被执行`routing`和`strategies`模块，但也有很多其他的模块，每个模块提供，你可以在你的服务人员使用的特定行为。

You'll find a number of guides that cover other features of Workbox as well
as more information on configuring Workbox. Find a full list on the left, but
the next natural step is to enable precaching, which is the process of adding
files to the cache when your service worker loads.

<a href="./precache-files" class="button">Learn More About Precaching</a>
