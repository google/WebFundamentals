---
title: "訂閱推送通知"
description: "添加代碼到你web app的service worker以訂閱推送通知"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

你可以在completed/step6目錄找到這步驟的完整代碼。

## 1. 添加訂閱代碼

更換 _main.js_ 裏的 TODO註解。更換之後，代碼應該是這樣的:

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

這代碼是用`ServiceWorkerRegistration` 物件中的`pushManager`來訂閱你在manifest設定的gcm\_sender\_id的推送通知。

你必須傳遞`{userVisibleOnly: true}`參數至subscribe()方法。這將會告訴遊覽器, 當收到推送消息時，推送通知將會被顯示。目前，這將會強制顯示通知。

## 2. 在localhost試試吧

從localhost中打開 _index.html_。然後用Chrome開發者工具打開控制臺。

你將會看到以下的情況：

<img src="images/image13.png" width="888" height="590" alt="Web page screenshot: permissions dialog for Push Notifications" />

**重要**: Chrome的隱身模式目前不接受Push API. 如果你想重置推送通知的權限，點擊URL左邊的頁面圖標。

<img src="images/image14.png" width="713" height="672"  alt="Web page screenshot: Push notifications permissions setting dialog" />

## 3. 獲取訂閱ID
從Chrome開發者工具裏，右鍵點擊 `endpoint` 然後選擇 **Copy Link Address/復制鏈接地址** 以復制值。它應該是這樣的:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

把訂閱ID記錄起來(URL的最後一部分，也就是被加粗的部分)。

在下個步驟，你將會使用這訂閱ID, 告訴谷歌雲端推送在把消息發送到哪裏。

<img src="images/image15.png" width="774" height="932" alt="Web page screenshot: Chrome DevTools console showing Push Notifications endpoint value" />
