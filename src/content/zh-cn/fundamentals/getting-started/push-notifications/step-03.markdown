---
title: "开始使用Service Worker"
description: "添加JavaScript以安装service worker"
notes:
  styling:
    - Styling will come later
updated_on: 2015-09-28
translators:
 - henrylim
---
你可以在completed/step3目录找到这步骤的完整代码。

{% include shared/toc.liquid %}

## 1. 创建 index.html

在 _app_ 目录里，创建一个名为 _index.html_ 的文件并把以下的代码添加进去:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>推送通知 codelab</title>
</head>
<body>
  <h1>推送通知 codelab</h1>
  <p>这网页必须使用HTTPS或通过localhost。</p>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

使用Chrome, 在本地开启 _index.html_ : 该URL应该像
http://localhost/push-notifications/app/index.html_.

## 2. 添加Service Worker

在 _app_ 目录里，创建一个名为 _sw.js_ 的文件。稍后你将会把代码添加进去。

如果你从来没有使用过Service Workers, 别担心。就算你不是很了解，你还是可以完成这codelab. Service workers是个在后台执行的worker scripts。它是用来拦截网络请求，处理推送消息以及执行其他任务。如果你想知道更多，你可以在HTML5 Rocks网页中的[Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)找到更多资料。

当接收到一个推送消息时，游览器能在后台运行service worker。并在网页没有开启的情况下，处理推送消息。

## 3. 注册和安装Service Worker

在这个步骤里，创建一个名为 _sw.js_ 的JavaScript文件。并在 _index.html_ 导入 _sw.js_ 。这将应许网页存取该Service Worker的脚本。

在 _app_ 目录里，创建一个名为 _js_ 的文件夹。并把以下的代码加进 _main.js—_:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
{% endhighlight %}

这代码将确保该游览器支持service worker。如果该游览器支持service worker, 他将会注册和安装Service Worker。

## 4. 从本地主机试试吧

在Chrome中使用本地主机打开 _index.html_。然后打开Chrome开发者工具中的控制台。

它应该是这样的：

<img src="images/image01.png" width="965" height="901" alt="Codelab web page open in Chrome, showing ServiceWorkerRegistration in DevTools console" />

## 5. 尝试 serviceworker-internals

使用 _chrome://serviceworker-internals_ 诊断页以检查你的service workers是否正常运作:

<img src="images/image02.png" width="907" height="641" alt="chrome:serviceworker-internals diagnostic page open in Chrome" />

## 6. 添加事件监听器进你的 Service Worker

把以下的代码添加进 _sw.js_:

{% highlight javascript %}
console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
{% endhighlight %}

在这service worker里，`self` 指的是 `ServiceWorkerGlobalScope` 物件，也就是service worker。

**小贴士!**

在默认中，旧的service worker将会保持运行直到所有正在是用该service worker的网页关闭。而新的service worker将会保持在`waiting`的状态下。

当`skipWaiting()`被引用时(见以上的代码),service worker将会跳过waiting(等待)状态，并立即启用新的service worker。

这能方便调试!

在 _chrome://serviceworker-internals_ 里，点击 **Inspect** 按钮。你将会看到以下的情况:

<img src="images/image03.png" width="888" height="845" alt="Chrome DevTools console showing service worker instal and activate events" />

**警告**: 如果service worker中有任何错误,service worker将不会被安装。
因此, 当Service worker正在安装时，错误将会被运行。
当你更改代码时，这可能导致你的service worker更新失败。当你更改任何代码，请检查和验证您的代码.
