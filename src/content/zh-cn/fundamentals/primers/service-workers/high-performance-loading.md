project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 确保 Service Worker 发挥最佳性能。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# 高性能 Service Worker 加载 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

为网页应用添加 [Service Worker](/web/fundamentals/getting-started/primers/service-workers) 可以显著改善性能，即使遵循所有的[传统浏览器缓存最佳做法](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)也无法获得这样的裨益。
但是，为了优化加载时间，应遵循几项最佳做法。
 下列提示可确保 Service Worker 发挥最佳性能。


## 首先了解什么是导航请求？

在 [Fetch
规范](https://fetch.spec.whatwg.org/#navigation-request)中，将导航请求简洁地定义为: <em>导航[请求](https://fetch.spec.whatwg.org/#concept-request)是[目的地](https://fetch.spec.whatwg.org/#concept-request-destination)为“<code>document</code>”的请求。
</em> 这个定义在技术上正确无误，但缺少细节，而且低估了导航对于网页应用性能的重要性。
 通俗地说，每当您在浏览器的地址栏中输入网址、与
<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code> 交互，或者从一个网页访问指向另一网页的链接时，就会执行导航请求。
 在页面上放置 `<iframe>`
也会产生针对 `<iframe>` 的 `src` 的导航请求。

注: 依赖 [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
和原地 DOM 修改的[单页面应用](https://en.wikipedia.org/wiki/Single-page_application)在视图之间切换时，往往会避免导航请求。
 但是，在浏览器会话中，针对单页面应用的初始请求仍为导航。


虽然网页应用可能会发出许多其他[子资源请求](https://fetch.spec.whatwg.org/#subresource-request)以便显示其所有内容（例如，脚本、图像或样式等元素），但却是导航响应中的 HTML 负责启动所有其他请求。
 用户能够明显看到初始导航请求的任何响应延迟，而且在此过程中，用户只能盯着空白的屏幕，而不确定需要等待多长时间。



注: [HTTP/2 服务器推送](/web/fundamentals/performance/http2/#server_push)在此时会发挥作用，允许子资源响应随导航响应一起返回，而没有额外的延迟。
 但是，在与远程服务器建立连接期间出现的任何延迟也会导致延迟将数据推送到客户端。



传统的[缓存最佳做法](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page)依赖于 HTTP `Cache-Control` 标头而非 Service Worker，并且要求[每次导航都访问网络](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses)，以确保所有子资源网址均为最新。
 提高网页性能的诀窍在于获得积极缓存子资源的所有裨益，而*不*需要执行依赖于网络的导航请求。
 现在利用根据您网站的特定架构定制且配置正确的 Service Worker，可以实现这个目标。



## 为实现最佳性能，绕过网络进行导航

在响应导航请求时不必等待网络，这就是向网页应用程序添加 Service Worker 的最大影响。
 与读取本地缓存的数据相比，即使是在最好的情况下，连接到网络服务器所花费的时间也可能要多几个数量级。
 在客户端连接不太理想（基本上，移动网络上的一切均如此）的情况下，从网络返回第一个字节的数据所花费的时间很容易超过渲染整个 HTML 所需的总时间。





选择适当的缓存优先 Service Worker 在很大程度上取决于您的网站架构。


### 流式传输组合响应

如果您的 HTML 可以自然拆分为多个较小的部分，每个部分都有静态页眉和页脚以及根据请求网址不同而异的中间部分，那么使用流式响应来处理导航最为理想。
 您可以将单独缓存的各个部分的响应组合到一起。
 使用数据流可确保初始响应部分尽快公开给客户端，以让其提前解析 HTML 并提出任何其他子资源请求。




“[执行流式传输以立即获得响应](/web/updates/2016/06/sw-readablestreams)”一文提供针对这种方法的基本概述，但要获得现实的示例和演示，请参阅 Jake Archibald 的“[2016 - 网络数据流之年](https://jakearchibald.com/2016/streams-ftw/)”权威指南。




注: 对于部分网页应用来说，响应导航请求时无法绕开网络。
 这可能是因为网站上每个网址的 HTML 都依赖于来自某内容管理系统的数据，或者网站使用不同的布局，无法融入到通用的应用 Shell 结构中。
 此外，Service Worker 还打开了通往改善 HTML 加载*现状*的大门。
您可以通过使用数据流，使用缓存的公共 HTML 块（可能是网站的完整 `<head>` 和某些初始
`<body>` 元素）来立即响应导航请求，同时从网络加载专属于给定网址的其余 HTML。



### 缓存静态 HTML

如果您有完全依赖于一组静态 HTML
文档的简单网页应用，那么您绕开网络的方法十分简单。
 您需要一个通过先前缓存的 HTML 来响应导航的 Service Worker，其应同时包括非拦截逻辑，以使该 HTML 随网站发展而及时更新。



其中一种方法是，使用实现
[stale-while-revalidate 策略](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)的 Service Worker `fetch` 处理程序来处理导航请求，如下所示:


```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional:Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

另一种方法是使用 [Workbox](https://workboxjs.org/) 等工具，该工具连接到网页应用的构建过程以生成一个 Service Worker，而该 Service Worker 负责处理所有静态资源（而不仅限于 HTML 文档）的缓存、以缓存优先方式提供这些资源，以及使这些资源保持及时更新。




### 使用应用 Shell

对于现有的单页面应用，实现[应用 Shell 架构](/web/fundamentals/architecture/app-shell)十分简单。
 您可使用明确的策略，在不依赖于网络的情况下处理导航请求: 以缓存的 HTML 文档通用“Shell”来执行每个导航请求，而不考虑具体网址。
 该 Shell 包括引导单页面应用所需的所有内容，然后客户端路由逻辑可以渲染请求网址特定的内容。



手动编写的相应 Service Worker `fetch` 处理程序类似如下:


```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

[Workbox](https://workboxjs.org/) 在这方面也有帮助，可以确保缓存且及时更新
`app-shell.html`，并且提供[辅助工具](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)，以缓存的 Shell 响应导航请求。



## ⚠️ 性能问题

当您无法使用缓存的数据来响应导航，但需要 Service
Worker 以实现其他功能（例如，提供[离线回退内容](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)或[处理推送通知](/web/fundamentals/getting-started/codelabs/push-notifications/)）时，您即处于尴尬的境地。
 如果不采取具体预防措施，那么添加 Service Worker 后，也会出现性能问题。
但是，避开这些问题，您就能稳扎稳打。

### 切勿使用“直通式”提取处理程序

如果您仅将 Service Worker 用于推送通知，您可能会误认为必须进行以下操作或将其视为空操作:



```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

此类“直通式”提取处理程序存在隐患，因为网页应用中的一切都会继续正常工作，但是每次提出网络请求时都会产生短暂的延迟。
 启动尚未运行的 Service Worker 会产生开销，而将响应从 Service Worker 传递到提出请求的客户端也会产生开销。




如果 Service Worker 完全不包含 `fetch` 处理程序，某些浏览器会记下这一点，而且每当提出网络请求时也[不会启动 Service Worker](https://github.com/w3c/ServiceWorker/issues/718)。




### 适时使用导航预加载功能

在某些情况下，您*需要* `fetch` 处理程序以将缓存策略用于特定的子资源，但架构不允许响应导航请求。
 或者，您可以接受在导航响应中使用缓存的数据，但仍然想提出网络请求以获取新数据，从而在页面加载后换入数据。



[导航预加载](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)功能适用于上述两个用例。
 这项功能可以减少未响应导航的
Service Worker 本来会产生的延迟。 此外，这项功能也可用于执行“带外”请求以获取新数据，而这些数据可以在页面加载后供客户端代码使用。
 “[利用导航预加载加快 Service Worker 的速度](/web/updates/2017/02/navigation-preload)”一文中提供您相应配置 Service Worker 所需的所有详细信息。




## 反馈 {: #feedback }

{% include "web/_shared/helpful.html" %}
