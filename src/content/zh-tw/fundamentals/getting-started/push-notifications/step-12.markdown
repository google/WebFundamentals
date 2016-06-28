---
title: "恭喜"
description: "恭喜! 你完成了你首個的推送通知web app。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

恭喜你! 你完成了你首個的推送通知web app。

## 常問問題

* **為什麽我的service worker不會被更新!**<br>
你確定嗎？請檢查 _chrome://serviceworker-internals_  
裏的源代碼的標簽。如果真的沒有被更新，嘗試重新啟動Chrome。

* **我已經嘗試了全部方法，但我的service worker還是不會被更新:^|**<br>
你檢查你的代碼了嘛? 如果你的service worker代碼無法被解析，service worker是無法安裝的。

* **我的GCM請求失敗**<br>
請到[console.developers.google.com](https://console.developers.google.com/)
檢查你的項目。並確保 _gcm\_sender\_id_ 和項目號碼(Project Number)吻合，以及Authorization
key和你的API密鑰吻合。最重要的是，你實在參閱正確的項目。

* **我的GCM請求成功，但是推送事件沒有被啟動**<br>
從控制臺中，檢查 _main.js_ 出現的訂閱ID。這訂閱ID數組裏的訂閱ID是否正確的被請求？
確保你已經從[console.developers.google.com](https://console.developers.google.com/)
啟用了消息API。

* **我一直得到我不明白的錯誤信息**<br>
嘗試使用Chrome Canary: 這通常提供更多的關於service worker的錯誤信息。

* **我從控制臺裏沒看到任何service worker的日誌診斷信息**<br>
你只會在Service Worker剛被安裝，Service Worker第一次被啟用或Service Worker的代碼被更改，
你才會在控制臺中看到日誌診斷信息。

* **那麽火狐瀏覽器接受推送通知嗎?**<br>
在默認情況下，
[火狐瀏覽器42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY))
或以上，推送API（Push API）是已經被開啟的。
## 我們所涵蓋的

* 安裝service worker和處理事件
* 設置一個谷歌雲端推送帳號
* 添加manifest檔案
* 啟動service worker以處理推送通知的事件
* 使用cURL或XHR來發送GCM請求
* 顯示推送通知
* 處理推送通知的點擊事件

## 下一步

* Service worker codelab (如果你還沒做過!)

## 更多

* [Push Notifications on the Open
  Web](/web/updates/2015/03/push-notifications-on-the-open-web)
* [谷歌雲端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Best Practices for Push Notifications Permission
  UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit)
* [Do's and Don'ts for
  Notifications](http://android-developers.blogspot.co.uk/2015/08/get-dos-and-donts-for-notifications.html)
* [Notifications
  guidelines](https://www.google.com/design/spec/patterns/notifications.html)
* [Service Worker
  API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
