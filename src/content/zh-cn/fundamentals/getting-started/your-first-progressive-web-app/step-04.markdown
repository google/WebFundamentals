---
title: "使用 Service Workers 来预缓存应用外壳"
description: "使用一个 service worker 来为 Progressive Web App 预缓存应用外壳"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
notes:
  sw-intro: "如果你对 service worker 不太熟悉, 你可以通过阅读 <a href='http://www.html5rocks.com/en/tutorials/service-worker/introduction/'>Introduction To Service Workers</a> 来学习基本的概念，了解它能做什么，它的生命周期以及限制。"
  sw-https: "Service worker 只能在通过 HTTPS 加载的页面里使用 (为了方便测试 <code>https://localhost</code> 或同等地址也能工作)。 你可以从这里了解到这样的限制的合理性 <a href='http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features'>Prefer Secure Origins For Powerful New Features</a>。"
  not-production: "使用了 <b>must NOT</b> 标记的代码一定不要用于生产环境，它们仅仅包含基本的功能且很容易让你的 app shell 永远得不到更新。务必注意下面关于如何避免这些陷阱的讨论，学会如何避免它们"
  permutations: "一定要保证你包括了所有的文件名，比如我们应用入口是 <code>index.html</code> 但是也会使用 <code>/</code> 来请求它，这个时候服务器会使用 <code>index.html</code> 作为响应。你可以在 <code>fetch</code> 方法中处理这种场景，但这可能又会引入其他复杂的问题。"
  bump-name: "如果你没有在控制台里看到 <code>[ServiceWorker]</code> ，请确认你是否修改了 <code>cacheName</code> 并重新加载了页面。如果仍没有效果，可以参考下面关于调试 service workers 的提示"
---

<p class="intro">
Progressive Web Apps 是快速且可安装的，这意味着它能在在线、离线、断断续续或者缓慢的网络环境
下使用。为了实现这个目标，我们需要使用一个 service worker 来缓存应用外壳，以保证它能始终迅速
可用且可靠。
</p>


{% include shared/toc.liquid %}

如果你对 service workers 不熟悉，你可以通过阅读 [介绍 Service
Workers](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 来
了解关于它能做什么，它的生命周期是如何工作的等等知识。

service workers 提供的是一种应该被理解为渐进增强的特性，这些特性仅仅作用于支持
 service workers 的浏览器。比如，使用 service workers 你可以缓存应用外壳和你的应用所需的
 数据，所以这些数据在离线的环境下依然可以获得。如果浏览器不支持 service workers ，支持离线的
 代码没有工作，用户也能得到一个基本的用户体验。使用特性检测来渐渐增强有一些小的开销，它不会在老
 旧的不支持 service workers 的浏览器中产生破坏性影响。


{% include shared/remember.liquid list=page.notes.sw-https %}

## 注册 service worker

为了让应用离线工作，要做的第一件事是注册一个 service worker，一段允许在后台运行的脚本，不需要
用户打开 web 页面，也不需要其他交互。

这只需要简单两步：

1. 创建一个 JavaScript 文件作为 service worker
1. 告诉浏览器注册这个 JavaScript 文件为 service worker

第一步，在你的应用根目录下创建一个空文件叫做 `service-worker.js` 。这个 `service-worker.js`
 文件必须放在跟目录，因为 service workers 的作用范围是根据其在目录结构中的位置决定的。

接下来，我们需要检查浏览器是否支持 service workers，如果支持，就注册 service worker，将下面
代码添加至 `app.js`中。

{% highlight javascript %}
if('serviceWorker' in navigator) {  
  navigator.serviceWorker  
           .register('/service-worker.js')  
           .then(function() { console.log('Service Worker Registered'); });  
}
{% endhighlight %}

## 缓存站点的资源

当 service worker 被注册以后，当用户首次访问页面的时候一个 `install` 事件会被触发。在这个
事件的回调函数中，我们能够缓存所有的应用需要再次用到的资源。

{% include shared/note.liquid list=page.notes.not-production %}

当 service worker 被激活后，它应该打开缓存对象并将应用外壳需要的资源存储进去。将下面这些代码
加入你的 `service-worker.js` ：

{% highlight javascript %}
var cacheName = 'weatherPWA-step-5-1';  
var filesToCache = [];

self.addEventListener('install', function(e) {  
  console.log('[ServiceWorker] Install');  
  e.waitUntil(  
    caches.open(cacheName).then(function(cache) {  
      console.log('[ServiceWorker] Caching app shell');  
      return cache.addAll(filesToCache);  
    })  
  );  
});
{% endhighlight %}

首先，我们需要提供一个缓存的名字并利用 `cache.open()`打开 cache 对象。提供的缓存名允许我们给
缓存的文件添加版本，或者将数据分开，以至于我们能够轻松地升级数据而不影响其他的缓存。

一旦缓存被打开，我们可以调用 `cache.addAll()` 并传入一个 url 列表，然后加载这些资源并将响应
添加至缓存。不幸的是 `cache.addAll()` 是原子操作，如果某个文件缓存失败了，那么整个缓存就会失败！

确保在每次修改了 service worker 后修改 `cacheName`，这能确保你永远能够从缓存中获得到最新
版本的文件。过一段时间清理一下缓存删除掉没用的数据也是很重要的。添加一个叫做 `activate` 的事件
处理函数，在该事件处理函数中你可以获得到所有的缓存名，并删除掉没有的缓存。

{% highlight javascript %}
self.addEventListener('activate', function(e) {  
  console.log('[ServiceWorker] Activate');  
  e.waitUntil(  
    caches.keys().then(function(keyList) {  
      return Promise.all(keyList.map(function(key) {  
        console.log('[ServiceWorker] Removing old cache', key);  
        if (key !== cacheName) {  
          return caches.delete(key);  
        }  
      }));  
    })  
  );  
});
{% endhighlight %}

最后，让我们更新一下 app shell 需要的缓存的文件列表。在这个数组中，我们需要包括所有我们的应用
需要的文件，其中包括图片、JavaScript以及样式表等等。

{% highlight javascript %}
var filesToCache = [  
  '/',  
  '/index.html',  
  '/scripts/app.js',  
  '/styles/inline.css',  
  '/images/clear.png',  
  '/images/cloudy-scattered-showers.png',  
  '/images/cloudy.png',  
  '/images/fog.png',  
  '/images/ic_add_white_24px.svg',  
  '/images/ic_refresh_white_24px.svg',  
  '/images/partly-cloudy.png',  
  '/images/rain.png',  
  '/images/scattered-showers.png',  
  '/images/sleet.png',  
  '/images/snow.png',  
  '/images/thunderstorm.png',  
  '/images/wind.png'  
];
{% endhighlight %}

{% include shared/note.liquid list=page.notes.permutations %}

我么的应用目前还不能离线工作。我们缓存了 app shell 的组件，但是我们仍然需要从本地缓存中加载它们。

## 从缓存中加载 app sheel

Service workers 可以截获 Progressive Web App 发起的请求并从缓存中返回响应。这意味着我们能够
决定如何来处理这些请求，以及决定哪些网络响应能够成为我们的缓存。

比如：

{% highlight javascript %}
self.addEventListener('fetch', function(event) {  
  // Do something interesting with the fetch here  
});
{% endhighlight %}

让我们来从缓存中加载 app shell。将下面代码加入 `service-worker.js` 中：


{% highlight javascript %}
self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  e.respondWith(  
    caches.match(e.request).then(function(response) {  
      return response || fetch(e.request);  
    })  
  );  
});
{% endhighlight %}

从内至外，`caches.match()` 从网络请求触发的 `fetch` 事件中得到请求内容，并判断请求的资源是
否存在于缓存中。然后以缓存中的内容作为响应，或者使用 fetch 函数来加载资源（如果缓存中没有该资源）。
`response` 最后通过 `e.respondWith()` 返回给 web 页面。


{% include shared/remember.liquid list=page.notes.bump-name %}

## 当心边缘问题

之前提到过，这段代码 **一定不要用在生产环境下** ，因为有很多没有处理的边界情况。


### 缓存依赖于每次修改内容后更新缓存名称

比如缓存方法需要你在每次改变内容后更新缓存的名字。否则，缓存不会被更新，旧的内容会一直被缓存返回。
所以，请确保每次修改你的项目后更新缓存名称。

### 每次修改后所有资源都需要被重新下载

另一个缺点是当一个文件被修改后，整个缓存都需要被重新下载。这意味着即使你修改了一个简单的拼写错误
也会让整个缓存重新下载。这不太高效。

### 浏览器的缓存可能阻碍  service worker 的缓存的更新

另外一个重要的警告。首次安装时请求的资源是直接经由 HTTPS 的，这个时候浏览器不会返回缓存的资源，
除此之外，浏览器可能返回旧的缓存资源，这导致 service worker 的缓存不会得到 更新。

### 在生产环境中当下 cache-first 策略

我们的应用使用了优先缓存的策略，这导致所有后续请求都会从缓存中返回而不询问网络。优先缓存的策略是
很容易实现的，但也会为未来带来诸多挑战。一旦主页和注册的 service worker 被缓存下来，将会很难
去修改 service worker 的配置（因为配置依赖于它的位置），你会发现你部署的站点很难被升级。

### 我该如何避免这些边缘问题

我们该如何避免这些边缘问题呢？ 使用一个库，比如
[sw-precache](https://github.com/GoogleChrome/sw-precache), 它对资源何时过期提供了
精细的控制，能够确保请求直接经由网络，并且帮你处理了所有棘手的问题。

## 实时测试 service workers 提示

调试 service workers 是一件有调整性的事情，当涉及到缓存后，当你期望缓存更新，但实际上它并没有
的时候，事情更是变得像一场恶梦。在 service worker 典型的生命周期和你的代码之间，你很快就会受挫。
但幸运的是，这里有一些工具可以让你的生活更加简单。

一大堆提示：

* 一旦 service worker 被注销（unregistered）。它会继续作用直到浏览器关闭。
* 如果你的应用打开了多个窗口，新的 service worker 不会工作，直到所有的窗口都进行了刷新，使用了
新的 service worker。
* 注销一个 service worker 不会清空缓存，所以如果缓存名没有修改，你可能继续获得到旧的数据。
* 如果一个 service worker 已经存在，而且另外一个新的 service worker 已经注册了，这个新的
service worker 不会接管控制权，知道该页面重新刷新后，除非你使用[立刻控制](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control)的方式。

### 你的新朋友: chrome://serviceworker-internals

Chrome 的 Service Worker Internals 页面 (`chrome://serviceworker-internals`) 能帮你
节约宝贵的生命，允许你很容易地停止并注销已经存在的 service workers 以及刷新。你还可以使用这个
页面来启动 Developer Tools 观察到 service worker 的执行情况，看到 console 的输出等等。


## 亲自尝试

* 打开 Chrome DevTools 并点击 resource 选项卡，确认 service worker 被正确地注册以及资源
被恰当的缓存。
* 试着修改 `cacheName` 并确认缓存正确地更新了。

<a href="https://weather-pwa-sample.firebaseapp.com/step-06/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
