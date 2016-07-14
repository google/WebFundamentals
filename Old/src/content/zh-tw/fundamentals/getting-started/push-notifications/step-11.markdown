---
title: "退訂推送通知"
description: "讓用戶退訂推送通知"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step11目錄找到這步驟的完整代碼。

要如何讓用戶退訂及重新訂閱推送通知呢？

非常簡單: 用戶只需調用`PushSubscription`對象中的 `unsubscribe()`函數， 便可以退訂推送通知。

在一個生產實現中，你也必須從服務器刪除用戶的訂閱數據, 以避免發送不必要的推送通知。

## 1. 添加訂閱/退訂按鈕到你的應用程序裏

在你之前創建的 _index.html_ 裏，將以下的代碼添加進去:

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

## 2. 添加訂閱/退訂功能到 _main.js_ 裏

更改你的 _main.js_, 代碼應該看起來是這樣的:

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

在這個代碼中，當service worker在安裝是，ServiceWorkerRegistration物件的reg，是在之後在subscribe()函數以用來訂閱推送通知。

`subscribe()`函數將會創建`PushSubscription` 物件 **sub**, 並使用在`unsubscribe()`函數。

記得: 每一次推送通知被重新訂閱時，客戶端將會獲取新的註冊ID, 所以你必須為GCM請求作出相應的調整。
