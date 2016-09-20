---
title: "你的第一个离线 web 应用"
description: "Service workers 是运行在后台的脚本，它为 web 应用开启了一扇们，可以使用到通常只有原生应用才有的离线功能。学习如何将 service worker 集成入现有的应用中，使其能够离线工作。"
updated_on: 2016-09-10
translation_priority: 1
translators:
  - wangyu
---

在本次代码实验中，你将会学到如何将一个 service worker 集成入现有的应用中，让它能够离线工作。

<img src="images/image00.png" width="624" height="409" />

这个应用叫做 [Air
Horner](https://airhorner.com)。它是 Web Audio API 来播放并操作汽笛声，它可能是现在市场上最好的汽笛应用了（起码在本次代码实验的作者看来是这样）。它是一个很简单的应用但是可以用来演示 service worker 的用法。

一个 Service workers 是一段运行在浏览器后台的脚本，从 web 页面上分离出去提供了一些不需要 web 页面和用户交互的功能。在未来它还会包含消息推送（现在已经能够进行消息推送了，译者注）、后台同步和基于地理位置的一些功能，但它具备的第一个特性就是能够截获网络请求并对网络请求进行处理，包含对网络请求的响应进行可编程控制的缓存。

这之所以是一个激动人心的 API 是因为它能够让应用支持离线体验，让开发者能够对最终的体验具有完全的控制权。

### 你将会学到什么

* 如何给现存应用添加基本的 service worker 功能
* 对 service worker 的生命周期有一个简单的了解
* 一些简单的离线缓存策略

### 你需要什么

* Chrome 44 或更高版本
* 对 [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) 的基本理解
* 简单的编码能力
* 一个文本编辑器
* Python 或者一个简单的本地 web 服务器
