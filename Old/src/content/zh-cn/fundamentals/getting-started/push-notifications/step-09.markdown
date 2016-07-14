---
title: "显示推送通知"
description: "添加你的代码到service worker的push handler以显示推送通知。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step9目录找到这步骤的完整代码。

在这个步骤，你将会把你的代码添加到service worker的push handler以显示推送通知。

## 1. 添加 showNotification()代码

更改 _sw.js_ 中的代码，用以下的代码代替 _TODO_ 注释：

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

这`event.waitUntil()`拿到一个promise并延长了他的生命周期直到`showNotification()`返回了promise。

每一个标记值（Tag）都会显示一个通知: 如果接收到新的推送消息，旧的推送消息将会被替换。 如果你要显示多个不同的推送通知，在每个 showNotification() 的函数, 请使用不一样的标记值，或者不要放入标记值。

## 2. 发送一个请求至GCM以发送推送通知

运行在上个步骤的cURL命令或者XHR请求。

你将会看到像这样的推送通知：

<img src="images/image19.png" width="394" height="114" alt="Screenshot of Push Notification" />
