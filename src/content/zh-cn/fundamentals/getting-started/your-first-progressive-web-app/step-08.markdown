---
title: "部署在安全的主机上并开始庆祝吧"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
---


<p class="intro">
最后一步是将我们的天气应用部署在一个支撑 HTTPs 的服务器上。如果你目前还没有一个这样的主机，那么最简单（且免费）的方法绝对是使用我们的静态资源部署服务 Firebase。它非常容易使用，通过 HTTPs 来提供服务且在全球 CDN 中。
</p>

{% include shared/toc.liquid %}

## 可优化的地方：压缩并内联 CSS 样式

还有一些你需要考虑的事情，压缩关键的 CSS 样式并将其内联在 `index.html` 中。[Page Speed Insights](https://developers.google.com/speed) 建议以上内容要在 15k 以内。

看看当所有内容都内联后，首次加载资源有多大。

**扩展阅读:** [PageSpeed Insight
Rules](https://developers.google.com/speed/docs/insights/rules)

## 部署到 Firebase

如果你首次使用 Firebase，那么你需要使用你的 Google 账号登录 Firebase 并安装一些工具。

1. 使用你的 Google 账号登录 Firebase [https://firebase.google.com/](https://firebase.google.com/)
1. 通过 npm 安装 Firebase 工具 :<br/>
   `npm install -g firebase-tools`

你的账号被创建且已经登录后，你就可以开始部署了！

1. 创建一个新的应用，在这儿：[https://console.firebase.google.com/](https://console.firebase.google.com/)
1. 如果你最近没有登录过 Firebase 工具，请更新你的证书:<br/>
   `firebase login`
1. 初始化你的应用，并提供你完成了应用的目录位置：<br/>
   `firebase init`
1. 最后，将应用部署至 Firebase:<br/>
   `firebase deploy`
1. 祝贺你。你完成了，你的应用将会部署在：<br/>
   `https://YOUR-FIREBASE-APP.firebaseapp.com`

**扩展阅读:** [Firebase Hosting
Guide](https://firebase.google.com/docs/hosting/)

## 亲自尝试

* 试着将应用添加至你的主屏幕，然后断开网络连接，看看它是否能在离线的情况下很好的工作。

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
