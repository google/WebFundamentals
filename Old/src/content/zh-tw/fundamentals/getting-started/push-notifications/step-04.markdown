---
title: "在谷歌開發者控制臺創建項目"
description: "Web app的推送通知需要後端要處理推送通知的信息。Chrome目前使用谷歌雲端推送。在這個步驟，你將會在谷歌開發者控制臺建立一個項目。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

Web app的推送通知需要後端要處理推送通知的信息。Chrome目前使用[谷歌雲端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM)。
這個的最終目標是讓Chrome和GCM支持
[Web推送協議/Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

其他遊覽器可以使用其他的服務。

在這個步驟，你將會在谷歌開發者控制臺建立一個項目。

**在這裏有很多步驟，但別放棄。其實這是非常簡單的。**

## 1. 創建項目

從[谷歌開發者控制臺/Google Developers Console](https://console.developers.google.com),
創建一個新的項目:

<img src="images/image04.png" width="907" height="845" alt="Web page screenshot: create a new project from the Google Developers Console" />

## 2. 為該項目選擇API

從 **Use Google APIs**, 選擇 **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Web page screenshot: select APIs from the Google Developers Console" />

從 **Google APIs** 目錄中, 選擇 **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Web page screenshot: select Google Cloud Messaging API" /> 如果API順利的被添加，你將會看到以下的情況:

<img src="images/image07.png" width="965" height="901" alt="Web page screenshot: Google Developers Console, Google Cloud Messaging enabled" />

## 3. 獲取證書

從 **API Manager** 的菜單中, 選擇 **Credentials**, 點擊 **Create
credentials**，然後在下拉列表中選擇 **API key**:

<img src="images/image08.png" width="965" height="901" alt="Web page screenshot: add credentials from the Google Developers Console" />

選擇 **Browser key** 按鈕:

<img src="images/image09.png" width="907" height="822" alt="Web page screenshot: click Browser key button to select new API key type in the Google Developers Console" />

為你的Browser key命名(任何名字都可以!), 並在HTTP referrers留下空白。點擊 **Create** 按鈕繼續。

<img src="images/image10.png" width="907" height="822" alt="Web page screenshot: click the Create button to create a browser API key from the Google Developers Console" />

獲取你的 **API key** — 之後你需要這個:

<img src="images/image11.png" width="907" height="822" alt="Web page screenshot: get the API key for your project from the Google Developers Console" />

回去主頁，獲取你的 **Project Number** — 之後你也需要這個:

<img src="images/image12.png" width="965" height="901" alt="Web page screenshot: get the Project Number for your project from the Google Developers Console" />

恭喜!

你已經成功創建了一個新的谷歌雲端推送項目。
