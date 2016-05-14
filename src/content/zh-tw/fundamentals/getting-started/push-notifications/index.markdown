---
title: "你的首個推送通知 web app"
description: "在這個codelab,你將會學到如何在web app裏加入推送通知。這也將會重新接觸用戶與新內容的最新新聞和信息。"
updated_on: 2016-05-14
translators:
 - henrylim
---

<img src="images/image00.png" width="373" height="93" alt="Screenshot of push notification" />

在這個codelab,你將會學到如何在web app裏加入推送通知。

這將會重新接觸用戶與新內容的最新新聞和信息。

你也會學到 Service Workers 的基礎。

## 你將會學到

* Service Worker 的基本: 安裝 和 事件處理器
* 如何設置 Google 雲端推送（GCM）帳號
* 如何添加 web manifest
* 請求 GCM 發送到 web 客戶端的技巧
* 顯示推送通知
* 推送通知的單擊事件處理器

## 你需要

* Chrome 42 或以上
* [git](https://git-scm.com/) 和 [Chrome DevTools](/web/tools/chrome-devtools) 基本的了解
* 擁有 [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) 和 [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 的經驗將會帶來些好處，但不是關鍵
* 示例代碼
* 代碼編輯器
* 命令行以運行命令行工具
* Python 或其他的 Local Web Server（見下文）
