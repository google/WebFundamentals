project_path：/web/tools/workbox/_project.yaml book_path：/web/tools/workbox/_book.yaml description：Workbox入门。

{＃wf_blink_components：N / A＃} {＃wf_updated_on：2018-08-10＃} {＃wf_published_on：2017-11-15＃}

# 快速入门 {: .page-title }

本指南将向您展示如何启动和运行 Workbox 对网页的常见请求进行路由，并演示如何使用公共缓存策略。

现在大多数的网站都包含 CSS，JavaScript 和图片，让我们看看如何使用 Service Worker 和 Workbox 对它们进行缓存。

## 创建并注册一个 Service Worker

在使用 Workbox 之前，我们需要创建一个 service worker 文件并把它注册到我们的网站。

在网站的根目录创建一个文件名为 `sw.js` 的文件，并在文件内添加打印信息。

```javascript
console.log（'你好，来自sw.js'）;
```

像这样在你的网页中注册一个新的 service worker 文件：

{％include“web / tools / workbox / guides / _shared / register-sw.html”％}

它告诉浏览器在你的网站中这是一个 service worker。

如果刷新浏览器，你会看到 service worker 文件的打印出日志。

![Console message from sw.js in DevTools](../images/guides/get-started/hello-console.png)

打开 Chrome 开发者工具中的 “应用” 栏，你会看到你的 service worker 已经被注册成功。

![Application Tab displaying a registered service worker.](../images/guides/get-started/application-tab.png)

注意：选中 “在刷新时更新” 能让你在开发 service worker 更简单。

现在我们已经注册了一个 service worker，接下来看看我们能用 Workbox 做些什么。

## 导入 Workbox

开始使用 Workbox 之前，你只需在 service worker 里导入 `sw.js` 文件。

在你的 service worker 中通过 `importScripts()` 调用。

<pre class="prettyprint js">importScripts（'{％include“web / tools / workbox / _shared / workbox-sw-cdn-url.html”％}'）; if（workbox）{console.log（`Yay！工作箱加载🎉`）; } else {console.log（`Boo！Workbox没有加载😬`）; }</pre>

当你在控制台中看到 “Yay” 的时候就知道我们的 service worker 已经加载了。

![DevTools screenshot of Workbox loading in a service worker.](../images/guides/get-started/yay-loaded.png)

现在我们可以开始使用 Workbox 了。

警告：导入`workbox-sw.js`将在 service worker 内部创建一个[`workbox`对象](/web/tools/workbox/modules/workbox-sw)，根据您使用的功能，该实例负责引入其他辅助库。由于[Service Woker 规范](https://www.chromestatus.com/feature/5748516353736704)中的限制，这些导入需要在`install`事件处理程序内部发生，或者在 Service Worker 的上层代码中同步执行。可以在[`workbox-sw`文档中](/web/tools/workbox/modules/workbox-sw#avoid_async_imports)找到更多详细信息以及解决方法。

## 使用 Workbox

Workbox的主要功能之一是它的路由和缓存策略模块。它允许您侦听来自网页的请求，并确定是否以及如何缓存和响应该请求。

让我们为JavaScript文件添加缓存规则。最简单的方法是使用 Workbox 注册一个路径，该路由将匹配所请求的任何“.js”文件，我们可以使用正则表达式：

```javascript
workbox.routing.registerRoute（new RegExp（'。* \ .js'），...）;
```

这告诉 Workbox，当发出请求时，它会判断正则表达式是否与URL的一部分匹配，如果匹配，则对该请求执行某些操作。

如果我们希望我们的 JavaScript 文件尽可能来自网络请求，但如果网络出现故障则回退到缓存版本，我们可以使用“网络优先”策略来实现这一目标。

```javascript
workbox.routing.registerRoute（new RegExp（'。* \ .js'），workbox.strategies.networkFirst（））;
```

将此代码添加到 Service Worker 并刷新页面。如果您的网页中包含 JavaScript 文件，您应该会看到一些与此类似的日志：

![Example console logs from routing a JavaScript file.](../images/guides/get-started/routing-example.png)

Workbox 已经路由了任何 “.js” 文件的请求，并使用网络优先策略来确定如何响应请求。您可以查看 DevTools 的缓存，以检查请求是否已被缓存。

![Example of a JavaScript file being cached.](../images/guides/get-started/cached-request.png)

Workbox 提供了一些可以使用的缓存策略。例如，您的 CSS 可以首先从缓存中提供，然后在后台更新，或者您的图像可以缓存并使用一周的时间，之后它将更新。

```javascript
workbox.routing.registerRoute（//缓存CSS文件/.*\。css /，//使用缓存但在后台更新ASAP workbox.strategies.staleWhileRevalidate（{//使用自定义缓存名称cacheName：'css-cache' ，}））; workbox.routing.registerRoute（//缓存图像文件/.* \。（？：png | .jpg | jpeg | svg | gif）/，//如果可用，请使用缓存workbox.strategies.cacheFirst（{//使用自定义缓存名称cacheName：'image-cache'，插件：[new workbox.expiration.Plugin（{//仅缓存20个图像maxEntries：20，//最多缓存一周maxAgeSeconds：7 * 24 * 60 * 60 ，}）]，}））;
```

## Workbox 还能做什么？

路由和缓存策略被执行`routing`和`strategies`模块，但也有很多其他的模块，每个模块提供，你可以在你的服务人员使用的特定行为。

通过左侧的目录，您将找到许多包含 Workbox 其他功能的指南以及有关配置 Workbox 的更多信息。下一步是启用预缓存，这是在 Service Worker 执行时将文件添加到缓存的过程。

<a href="./precache-files" class="button">了解有关预缓存的更多信息</a>
