---
title: "订阅推送通知"
description: "添加代码到你web app的service worker以订阅推送通知"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step6目录找到这步骤的完整代码。

## 1. 添加订阅代码

更换 _main.js_ 里的 TODO注解。更换之后，代码应该是这样的:

{% highlight javascript %}
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('sw.js').then(function(reg) {
        console.log(':^)', reg);
        reg.pushManager.subscribe({
            userVisibleOnly: true
        }).then(function(sub) {
            console.log('endpoint:', sub.endpoint);
        });
    }).catch(function(error) {
        console.log(':^(', error);
    });
}
{% endhighlight %}

这代码是用`ServiceWorkerRegistration` 物件中的`pushManager`来订阅你在manifest设定的gcm\_sender\_id的推送通知。

你必须传递`{userVisibleOnly: true}`参数至subscribe()方法。这将会告诉游览器, 当收到推送消息时，推送通知将会被显示。目前，这将会强制显示通知。

## 2. 在localhost试试吧

从localhost中打开 _index.html_。然后用Chrome开发者工具打开控制台。

你将会看到以下的情况：

<img src="images/image13.png" width="888" height="590" alt="Web page screenshot: permissions dialog for Push Notifications" />

**重要**: Chrome的隐身模式目前不接受Push API. 如果你想重置推送通知的权限，点击URL左边的页面图标。

<img src="images/image14.png" width="713" height="672"  alt="Web page screenshot: Push notifications permissions setting dialog" />

## 3. 获取订阅ID
从Chrome开发者工具里，右键点击 `endpoint` 然后选择 **Copy Link Address/复制链接地址** 以复制值。它应该是这样的:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

把订阅ID记录起来(URL的最后一部分，也就是被加粗的部分)。

在下个步骤，你将会使用这订阅ID, 告诉谷歌云端推送在把消息发送到哪里。

<img src="images/image15.png" width="774" height="932" alt="Web page screenshot: Chrome DevTools console showing Push Notifications endpoint value" />
