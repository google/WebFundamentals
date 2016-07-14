---
title: "顯示推送通知"
description: "添加你的代碼到service worker的push handler以顯示推送通知。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step9目錄找到這步驟的完整代碼。

在這個步驟，你將會把你的代碼添加到service worker的push handler以顯示推送通知。

## 1. 添加 showNotification()代碼

更改 _sw.js_ 中的代碼，用以下的代碼代替 _TODO_ 註釋：

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
  console.log('Push message', event);
  var title = 'Push message';
  event.waitUntil(
    self.registration.showNotification(title, {
      body: 'The Message',
      icon: 'images/icon.png',
      tag: 'my-tag'
    }));
});
// TODO
{% endhighlight %}

這`event.waitUntil()`拿到一個promise並延長了他的生命周期直到`showNotification()`返回了promise。

每一個標記值（Tag）都會顯示一個通知: 如果接收到新的推送消息，舊的推送消息將會被替換。 如果你要顯示多個不同的推送通知，在每個 showNotification() 的函數, 請使用不一樣的標記值，或者不要放入標記值。

## 2. 發送一個請求至GCM以發送推送通知

運行在上個步驟的cURL命令或者XHR請求。

你將會看到像這樣的推送通知：

<img src="images/image19.png" width="394" height="114" alt="Screenshot of Push Notification" />
