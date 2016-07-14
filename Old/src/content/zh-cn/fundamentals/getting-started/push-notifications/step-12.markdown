---
title: "恭喜"
description: "恭喜! 你完成了你首个的推送通知web app。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

恭喜你! 你完成了你首个的推送通知web app。

## 常问问题

* **为什么我的service worker不会被更新!**<br>
你确定吗？请检查 _chrome://serviceworker-internals_  
里的源代码的标签。如果真的没有被更新，尝试重新启动Chrome。

* **我已经尝试了全部方法，但我的service worker还是不会被更新:^|**<br>
你检查你的代码了嘛? 如果你的service worker代码无法被解析，service worker是无法安装的。

* **我的GCM请求失败**<br>
请到[console.developers.google.com](https://console.developers.google.com/)
检查你的项目。并确保 _gcm\_sender\_id_ 和项目号码(Project Number)吻合，以及Authorization
key和你的API密钥吻合。最重要的是，你实在参阅正确的项目。

* **我的GCM请求成功，但是推送事件没有被启动**<br>
从控制台中，检查 _main.js_ 出现的订阅ID。这订阅ID数组里的订阅ID是否正确的被请求？
确保你已经从[console.developers.google.com](https://console.developers.google.com/)
启用了消息API。

* **我一直得到我不明白的错误信息**<br>
尝试使用Chrome Canary: 这通常提供更多的关于service worker的错误信息。

* **我从控制台里没看到任何service worker的日志诊断信息**<br>
你只会在Service Worker刚被安装，Service Worker第一次被启用或Service Worker的代码被更改，
你才会在控制台中看到日志诊断信息。

* **那么火狐浏览器接受推送通知吗?**<br>
在默认情况下，
[火狐浏览器42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY))
或以上，推送API（Push API）是已经被开启的。
## 我们所涵盖的

* 安装service worker和处理事件
* 设置一个谷歌云端推送帐号
* 添加manifest档案
* 启动service worker以处理推送通知的事件
* 使用cURL或XHR来发送GCM请求
* 显示推送通知
* 处理推送通知的点击事件

## 下一步

* Service worker codelab (如果你还没做过!)

## 更多

* [Push Notifications on the Open
  Web](/web/updates/2015/03/push-notifications-on-the-open-web)
* [谷歌云端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Best Practices for Push Notifications Permission
  UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit)
* [Do's and Don'ts for
  Notifications](http://android-developers.blogspot.co.uk/2015/08/get-dos-and-donts-for-notifications.html)
* [Notifications
  guidelines](https://www.google.com/design/spec/patterns/notifications.html)
* [Service Worker
  API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
