---
title: "在谷歌开发者控制台创建项目"
description: "Web app的推送通知需要后端要处理推送通知的信息。Chrome目前使用谷歌云端推送。在这个步骤，你将会在谷歌开发者控制台建立一个项目。"
notes:
  styling:
    - Styling will come later
updated_on: 2016-05-15
translators:
 - henrylim
---

{% include shared/toc.liquid %}

Web app的推送通知需要后端要处理推送通知的信息。Chrome目前使用[谷歌云端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM)。
这个的最终目标是让Chrome和GCM支持
[Web推送协议/Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

其他游览器可以使用其他的服务。

在这个步骤，你将会在谷歌开发者控制台建立一个项目。

**在这里有很多步骤，但别放弃。其实这是非常简单的。**

## 1. 创建项目

从[谷歌开发者控制台/Google Developers Console](https://console.developers.google.com),
创建一个新的项目:

<img src="images/image04.png" width="907" height="845" alt="Web page screenshot: create a new project from the Google Developers Console" />

## 2. 为该项目选择API

从 **Use Google APIs**, 选择 **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Web page screenshot: select APIs from the Google Developers Console" />

从 **Google APIs** 目录中, 选择 **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Web page screenshot: select Google Cloud Messaging API" /> 如果API顺利的被添加，你将会看到以下的情况:

<img src="images/image07.png" width="965" height="901" alt="Web page screenshot: Google Developers Console, Google Cloud Messaging enabled" />

## 3. 获取证书

从 **API Manager** 的菜单中, 选择 **Credentials**, 点击 **Create
credentials**，然后在下拉列表中选择 **API key**:

<img src="images/image08.png" width="965" height="901" alt="Web page screenshot: add credentials from the Google Developers Console" />

选择 **Browser key** 按钮:

<img src="images/image09.png" width="907" height="822" alt="Web page screenshot: click Browser key button to select new API key type in the Google Developers Console" />

为你的Browser key命名(任何名字都可以!), 并在HTTP referrers留下空白。点击 **Create** 按钮继续。

<img src="images/image10.png" width="907" height="822" alt="Web page screenshot: click the Create button to create a browser API key from the Google Developers Console" />

获取你的 **API key** — 之后你需要这个:

<img src="images/image11.png" width="907" height="822" alt="Web page screenshot: get the API key for your project from the Google Developers Console" />

回去主页，获取你的 **Project Number** — 之后你也需要这个:

<img src="images/image12.png" width="965" height="901" alt="Web page screenshot: get the Project Number for your project from the Google Developers Console" />

恭喜!

你已经成功创建了一个新的谷歌云端推送项目。
