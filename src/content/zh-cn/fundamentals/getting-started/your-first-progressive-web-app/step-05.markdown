---
title: "使用 Service Workers 来缓存应用数据"
description: "在一个 progressive web app 中使用 Service Workers 来缓存应用数据"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
---

<p class="intro">
选择一个正确的缓存策略是很重要的，并且这取决于你应用中使用的数据的类型。比如像天气信息、股票信息等对实时性要求较高的数据，应该时常被刷新，但是用户的头像或者文字内容应该以较低的频率进行更新。
</p>


{% include shared/toc.liquid %}

**先使用缓存后使用请求结果** 的策略对于我们的应用是非常理想的选择。应用从缓存中获取数据，并立刻显示在屏幕上，然后在网络请求返回后再更新页面。如果使用 **先请求网络后缓存** 的策略，用户可能不会等到数据从网络上加载回来便离开了应用。

**先使用缓存后使用请求结果** 意味着我们需要发起两个异步的请求，一个从请求缓存，另一个请求网络。我们应用中的网络请求不需要进行修改，但我们需要修改一下 service worker 的代码来缓存网络请求的响应并返回响应内容。

通常情况下，应该立刻返回缓存的数据，提供应用能够使用的最新信息。然后当网络请求返回后应用应该使用最新加载的数据来更新。

## 截获网络请求并缓存响应结果

我么需要修改 service worker 来截获对天气 API 的请求，然后缓存请求的结果，以便于以后使用。**先使用缓存后使用请求结果** 的策略中，我们希望请求的响应是真实的数据源，并始终提供给我们最新的数据。如果它不能做到，那也没什么，因为我们已经从缓存中给应用提供了最新的数据。

在 service worker 中，我们添加一个 `dataCacheName` 变量，以至于我们能够将应用数据和应用外壳资源分开。当应用外壳更新了，应用外壳的缓存就没用了，但是应用的数据不会受影响，并时刻保持能用。记住，如果将来你的数据格式改变了，你需要一种能够让应用外壳和应用数据能后保持同步的方法。

将下面代码添加至你的 `service-worker.js` 中：

{% highlight javascript %}
var dataCacheName = 'weatherData-v1';
{% endhighlight %}

接下来，我么需要修改 `fetch` 事件的回调函数，添加一些代码来将请求数据 API 的请求和其他请求区分开来。

{% highlight javascript hl_lines="3 4 5 6" %}
self.addEventListener('fetch', function(e) {  
  console.log('[ServiceWorker] Fetch', e.request.url);  
  var dataUrl = 'https://publicdata-weather.firebaseio.com/';  
  if (e.request.url.indexOf(dataUrl) === 0) {  
    // Put data handler code here  
  } else {  
    e.respondWith(  
      caches.match(e.request).then(function(response) {  
        return response || fetch(e.request);  
      })  
    );  
  }  
});
{% endhighlight %}

这段代码对请求进行拦截，判断请求的 URL 的开头是否为该天气 API，如果是，我们使用 `fetch` 来发起请求。一旦有响应返回，我们的代码就打开缓存并将响应存入缓存，然后将响应返回给原请求。

接下来，使用下面代码替换 `// Put data handler code here`

{% highlight javascript %}
e.respondWith(  
  fetch(e.request)  
    .then(function(response) {  
      return caches.open(dataCacheName).then(function(cache) {  
        cache.put(e.request.url, response.clone());  
        console.log('[ServiceWorker] Fetched&Cached Data');  
        return response;  
      });  
    })  
);
{% endhighlight %}

我们的应用目前还不能离线工作。我们已经实现了从缓存中返回应用外壳，但即使我们缓存了数据，依旧需要依赖网络。

## 发起请求

之前提到过，应用需要发起两个异步请求，一个从请求缓存，另一个请求网络。应用需要使用 `window` 上的 `caches` 对象，并从中取到最新的数据。这是一个关于渐进增强 _极佳_ 的例子，因为 `caches` 对象可能并不是在任何浏览器上都存在的，且就算它不存在，网络请求依旧能够工作，只是没有使用缓存而已。

为了实现该功能，我们需要：

1. 检查 `cahces` 对象是否存在在全局 `window` 对象上。
1. 向缓存发起请求
    1. 如果向服务器发起的请求还没有返回结果，使用缓存中返回的数据更新应用。

1. 向服务器发起请求
    1. 保存响应结果便于在之后使用
    1. 使用从服务器上返回的最新数据更新应用

首先，让我们添加一个标志位用来处理 XHR 的响应比 cache 还快的这种很少出现的情况。在 `app` 对象上添加一个  `hasRequestPending:false`。

接下来，我们需要检查 `caches` 对象是否存在，若存在，就向它请求最新的数据。将下面这段代码添加至 `app.getForecast` 方法中。

{% highlight javascript %}
if ('caches' in window) {  
  caches.match(url).then(function(response) {  
    if (response) {  
      response.json().then(function(json) {  
        // Only update if the XHR is still pending, otherwise the XHR  
        // has already returned and provided the latest data.  
        if (app.hasRequestPending) {  
          console.log('updated from cache');  
          json.key = key;  
          json.label = label;  
          app.updateForecastCard(json);  
        }  
      });  
    }  
  });  
}
{% endhighlight %}

最后，我们需要更新 `app.hasRequestPending` 标志位。在创建 XHR 对象之前，添加 `app.hasRequestPending = true;`，在 XHR 的响应回调中在 `app.updateForecastCard(response)` 之前将 `app.hasRequestPending` 设置为 false。

我们的天气应用现在发起了两个异步请求，一个从缓存中，另一个经由 XHR。如果有数据存在于缓存中，它将会很快地（几十毫秒）被返回并更新显示天气的卡片，通常这个时候 XHR 的请求还没有返回来。之后当 XHR 的请求响应了以后，显示天气的卡片将会使用直接从天气 API 中请求的最新数据来更新。

如果因为某些原因，XHR 的响应快于 cache 的响应，`hasRequestPending` 标志位会阻止缓存中数据覆盖从网路上请求的数据。


## 亲自尝试

* 在控制台中，每次刷新后你应该可以看到两个事件，一个表示你从 cache 中获得了什么数据，另一个是从网络上加载了什么。
* 现在应用应该能够离线工作了。尝试关闭里本地启动的服务器，并切断网络，然后刷新页面。应用外壳和数据应该都能从缓存中加载出来。

<a href="https://weather-pwa-sample.firebaseapp.com/step-07/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
