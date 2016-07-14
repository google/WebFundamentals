---
title: "退订推送通知"
description: "让用户退订推送通知"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step11目录找到这步骤的完整代码。

要如何让用户退订及重新订阅推送通知呢？

非常简单: 用户只需调用`PushSubscription`对象中的 `unsubscribe()`函数， 便可以退订推送通知。

在一个生产实现中，你也必须从服务器删除用户的订阅数据, 以避免发送不必要的推送通知。

## 1. 添加订阅/退订按钮到你的应用程序里

在你之前创建的 _index.html_ 里，将以下的代码添加进去:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Push Notification codelab</title>
  <link rel="manifest" href="manifest.json">
</head>
<body>
  <h1>Push Notification codelab</h1>
  <p>This page must be accessed using HTTPS or via localhost.</p>
  <button disabled>Subscribe</button>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

## 2. 添加订阅/退订功能到 _main.js_ 里

更改你的 _main.js_, 代码应该看起来是这样的:

{% highlight javascript %}
var reg;
var sub;
var isSubscribed = false;
var subscribeButton = document.querySelector('button');
if ('serviceWorker' in navigator) {
  console.log('Service Worker is supported');
  navigator.serviceWorker.register('sw.js').then(function() {
    return navigator.serviceWorker.ready;
  }).then(function(serviceWorkerRegistration) {
    reg = serviceWorkerRegistration;
    subscribeButton.disabled = false;
    console.log('Service Worker is ready :^)', reg);
  }).catch(function(error) {
    console.log('Service Worker Error :^(', error);
  });
}
subscribeButton.addEventListener('click', function() {
  if (isSubscribed) {
    unsubscribe();
  } else {
    subscribe();
  }
});
function subscribe() {
  reg.pushManager.subscribe({userVisibleOnly: true}).
  then(function(pushSubscription){
    sub = pushSubscription;
    console.log('Subscribed! Endpoint:', sub.endpoint);
    subscribeButton.textContent = 'Unsubscribe';
    isSubscribed = true;
  });
}
function unsubscribe() {
  sub.unsubscribe().then(function(event) {
    subscribeButton.textContent = 'Subscribe';
    console.log('Unsubscribed!', event);
    isSubscribed = false;
  }).catch(function(error) {
    console.log('Error unsubscribing', error);
    subscribeButton.textContent = 'Subscribe';
  });
}
{% endhighlight %}

在这个代码中，当service worker在安装是，ServiceWorkerRegistration物件的reg，是在之后在subscribe()函數以用来订阅推送通知。

`subscribe()`函數将会创建`PushSubscription` 物件 **sub**, 并使用在`unsubscribe()`函數。

记得: 每一次推送通知被重新订阅时，客户端将会获取新的注册ID, 所以你必须为GCM请求作出相应的调整。
