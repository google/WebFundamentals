---
title: "处理推送通知的点击"
description: "添加service worker的代码以让用户点击通知时,启动一个行动(例如打开网页)。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step10目录找到这步骤的完整代码。

在这个步骤，你将会添加代码以让用户点击通知时,启动一个行动(例如打开网页)。

更改 _sw.js_ 中的代码，用以下的代码代替第六步骤的 _TODO_ 注释：

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
    console.log('Notification click: tag ', event.notification.tag);
    event.notification.close();
    var url = 'https://youtu.be/gYMkEMCHtJ4';
    event.waitUntil(
        clients.matchAll({
            type: 'window'
        })
        .then(function(windowClients) {
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
{% endhighlight %}

这代码将会用在监听click事件。例如说，他可以用来开启网页。

这代码将会检查是否有没有正在使用这service worker的窗口:
如果被请求的URL已经在标签里开着，他会把焦点移到那个标签 — 不然他将会开启新的标签。

**注意**: 当你点击Android的通知，他不会[自动地关闭](https://crbug.com/463146)通知。

这就是为什么我们需要`event.notification.close();`。
