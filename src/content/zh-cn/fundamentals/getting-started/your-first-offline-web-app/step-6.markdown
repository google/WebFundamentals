---
title: "按装应用资源"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

在 service worker 注册后，在用户首次访问时一个 "install" 事件将被触发。在这个事件处理函数中，你应该缓存下你的应用需要的所有资源。

首先添加一个针对 Cache 的补丁（本项目中已经包含了）。因为 Cache API 还没有被完全支持，所以其他浏览器可能需要这个补丁程序（Chrome 已经很好地支持了）。

{% highlight javascript %}
importScripts('/cache-polyfill.js');
{% endhighlight %}

现在来添加 `install` 事件的监听函数。

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil();
});
{% endhighlight %}

然后在事件处理函数中，打开 `caches` 对象。这个对象会在之后被用到，它用来保证我们请求的所有资源能够从缓存从缓存中返回。

{% highlight javascript %}
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('airhorner').then(function(cache) {})
  );
});
{% endhighlight %}

现在，`caches` 对象已经打开了，你需要向其中添加一些资源。`caches` 对象有一个方法叫做 `addAll`。addAll 接收一个 url 的列表作为参数，它会自动地从服务器上加载它们，并将他们添加到缓存中。

{% highlight javascript %}
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
{% endhighlight %}

如果这些文件中的任意一个不存在或者下载失败，那么整个操作都会失败。一个好的应用会处理这种情况。

### 高频问答

* 这个补丁程序在哪儿?
    * [https://github.com/coonsta/cache-polyfill](https://github.com/coonsta/cache-polyfill)
* 为什么需要补丁?
    * 目前 Chrome 和其他 browsers 还没有完全支持 addAll 方法 (**注意:** Chrome 46 会兼容)
* 为什么你添加了 ?homescreen=1
    * 添加了查询字段的 URL 会认为是另外一个资源，它也需要被缓存。
