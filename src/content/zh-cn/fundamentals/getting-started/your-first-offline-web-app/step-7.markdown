---
title: "截获 web 页面的网络请求"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

service worker 的一个独特的属性是它能够截获从 web 页面发出的网络请求。service worker 可以控制并决定如何来处理这些请求。这给了我们能够从缓存中加载资源的能力。

第一步是添加一个 `fetch` 事件的处理函数。这个事件会在页面每次发起请求的时候被触发。

将下列代码添加至你的 `sw.js` 中，这会打印出它控制范围下所有页面的请求信息。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
});
{% endhighlight %}

现在打开 service worker 的 Chrome 开发者工具，你将会看很多的请求。

<img src="images/image04.png" width="624" height="350" />

现在我们知道，我们可以知晓应用的所有请求，我们需要决定如何来处理这些请求。默认情况下，让一个你不采取任何措施，请求会被发送至网络，然后响应会被返回给发起请求的页面。

为了让我们的应用可以离线工作，我们需要从缓存中获取数据（如果它存在于缓存中）。

从添加一个 `event.respondWith()` 方法入手，这个方法告诉浏览器如何处理后续可能到达的请求。需要在其中添加一些操作它才能够工作。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);

 event.respondWith( );
});
{% endhighlight %}

向下面这样将 `caches.match(event.request)` 添加进入。这个方法接收 fetch 事件中的网络请求，然后检查在当前缓存中是否存在该网络请求对应的资源（通过匹配请求的 URL）。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) { })
 );
});
{% endhighlight %}

这个 `match` 方法返回一个 Promise 对象，即使在缓存中没有找到请求的文件。这意味着我们有机会决定该如何做。在我们这个简单的示例中，若在缓存中找到了请求的资源就返回，如果没有就发起网络请求，并将结果返回回去。

{% highlight javascript %}
self.addEventListener('fetch', function(event) {
 console.log(event.request.url);
 event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
 );
});
{% endhighlight %}

这是一个很简单的案例，还存在很多很可能的情况。比如，你可以增量缓存所有之前没有被缓存过的资源，在之后这些请求就都能从缓存中返回了。
