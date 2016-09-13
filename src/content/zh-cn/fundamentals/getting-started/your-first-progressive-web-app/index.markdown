---
title: "你的首个 Progressive Web App"
description: "Progressive Web Apps 是结合了 web 和 原生应用中最好功能的一种体验。在这个指南的引导下，你将会建立你自己的 Progressive Web Apps。你也会学到建立 Progressive Web App 的基础，包括 app shell 模式, 如何使用 service worker 来缓存 App Shell 和你应用中的关键数据等等。"
updated_on: 2016-09-09
translation_priority: 1
notes:
  devsummit-video: "在寻找更多信息? 观看 Alex Russell 在 2015 年 Chrome 开发者大会上关于 <a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>Progressive Web Apps</a> 的演讲"
translators:
  - henrylim
  - wangyu
---

<p class="intro">
<a href="/web/progressive-web-apps">Progressive Web Apps </a>是结合了 web 和 原生应用中最好功能的一种体验。对于首次访问的用户它是非常有利的, 用户可以直接在浏览器中进行访问，不需要安装应用。随着时间的推移当用户渐渐地和应用建立了联系，它将变得越来越强大。它能够快速地加载，即使在比较糟糕的网络环境下，能够推送相关消息, 也可以像原生应用那样添加至主屏，能够有全屏浏览的体验。
</p>

{% include shared/toc.liquid %}

## 什么是 Progressive Web App?

Progressive Web Apps 是:

* **渐进增强** - 能够让每一位用户使用，无论用户使用什么浏览器，因为它是始终以渐进增强为原则。
* **响应式用户界面** - 适应任何环境：桌面电脑，智能手机，笔记本电脑，或者其他设备。
* **不依赖网络连接** - 通过 service workers 可以在离线或者网速极差的环境下工作。
* **类原生应用** - 有像原生应用般的交互和导航给用户原生应用般的体验，因为它是建立在 app shell model 上的。
* **持续更新** - 受益于 service worker 的更新进程，应用能够始终保持更新。
* **安全** - 通过 HTTPS 来提供服务来防止网络窥探，保证内容不被篡改。
* **可发现** - 得益于 W3C manifests 元数据和 service worker 的登记，让搜索引擎能够找到 web 应用。
* **再次访问** - 通过消息推送等特性让用户再次访问变得容易。
* **可安装** - 允许用户保留对他们有用的应用在主屏幕上，不需要通过应用商店。
* **可连接性** - 通过 URL 可以轻松分享应用，不用复杂的安装即可运行。

这引导指南将会引导你完成你自己的 Progressive Web App，包括设计时需要考虑的因素，也包括实现细节，以确保你的应用程序符合 Progressive Web App 的关键原则。

{% include shared/note.liquid list=page.notes.devsummit-video %}

## 我们将要做什么？

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      在这指南引导， 你将会使用Progressive Web App的技巧来建立一个天气预报的web app。
    </p>
    <p>
      让我们考虑Progressive Web App的特性：
      <ul>
        <li><b>渐进增强</b> - 我们将会使用渐进增强的特性。</li>
        <li><b>响应用户界面</b> - 我们将确保这应用程序能适合任何设备。</li>
        <li><b>不依赖网络连接</b> -我们将会用 Service Worker 缓存 app shell。</li>
        <li><b>类原生应用</b> - 我们将会使用原生应用的交互方式来添加城市以及更新天气。</li>
        <li><b>持续更新</b> - 我们将会用 Service Worker 来缓存最新的内容。</li>
        <li><b>安全通信</b> - 我们将会把网页发布在一个支持 HTTPS 的主机服务。</li>
        <li><b>可发现于可安装</b> - 我们将添加一个 manifest 以让搜索器找到我们的应用程序。</li>
        <li><b>可连接性</b> - 这就是网络!</li>
      </ul>
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <a href="https://weather-pwa-sample.firebaseapp.com/final/">
      <img src="images/weather-ss.png">
    </a>
    <p>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">尝试</a>
    </p>
  </div>
</div>

## 你将会学到

* 如何使用 "app shell" 的方法来设计和构建应用程序。
* 如何让你的应用程序能够离线工作。
* 如何存储数据以在离线时使用。

## 涵盖的主题

<ol>
{% for pageInSection in page.context.pages %}
  <li>
    <a href="{{pageInSection.relative_url }}">
      {{pageInSection.title}}
    </a>
  </li>
{% endfor %}
</ol>

## 你需要

* Chrome 47 或以上
* HTML，CSS 和 JavaScript 的知识

这份引导指南的重点是 Progressive Web Apps。其中有些概念的只是简单的解释
而有些则是只提供示例代码（例如 CSS 和其他不相关的 Javascipt ），你只需复制和粘贴即可。
