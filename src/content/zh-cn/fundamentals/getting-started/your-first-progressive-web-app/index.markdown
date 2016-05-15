---
title: "你的首个Progressive Web App"
description: "Progressive Web Apps是个结合了网页和应用程序的最好功能的一个体验。在这个指南引导，你将会建立你自己的Progressive Web Apps。你也会学到建立Progressive Web App的基础，包括app shell模式, 如何使用service worker来缓存app shell和缓存应用程序的资料等等."
updated_on: 2016-05-14
translators:
  - henrylim
notes:
  devsummit-video: "Looking for more? Watch Alex Russell talk about <a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>Progressive Web Apps</a> from the 2015 Chrome Dev Summit"
---

<p class="intro">
<a href="/web/progressive-web-apps">Progressive Web Apps</a>是个结合了网页和应用程序的最好功能的一个体验。Progressive Web Apps将会对第一次游览的用户带来很多好处。用户可以直接在游览器访问网站，并且他们不必安装任何东西。随着时间的推移，用户逐步建立一个与应用程序的关系，并让应用程序更加的强大。Progressive Web Apps能快速的加载,这也包括不稳定的网络。他也能发送相关的推送通知，也可以添加至主屏，并提供一个全屏的体验。
</p>



{% include shared/toc.liquid %}

## 什么是 Progressive Web App?

Progressive Web Apps 是:

* **渐进增强** - 应用运行在尽可能多的环境中。它会使用任何可用的服务，如果没有可用的服务则会优雅降级。
* **响应用户界面** -  应用适应多种输入方式（触摸、 语言输入等）和多种输出方式（不同的屏幕尺寸、震动、音频、盲文显示等）。
* **连接性、独立性** - 应用可在断网以及间歇性断网或低带宽环境下很好地工作。
* **类应用 UI** - 应用采用原生平台的 UI 元素，包括快速加载用户界面（可以通过 service workers 获取重要的缓存资源。）
* **持续更新** - Service Worker API 定义一个进程用来将应用自动更新至新版。
* **安全通信** - 应用使用 HTTPS 通信来提供服务，阻止网络劫持和攻击。
* **应用发现** - 就像 W3C 应用 manifest 元数据能使搜索引擎找到 web 应用。
* **推送与互动** - 推送通知的特性，主动让用户了解最新动态。
* **可本地安装** - 在一些平台上，你可以安装 web 应用使得它看起来像一个本地应用（将 icon 放在主屏，在应用程序切换器单独列出，chrome 浏览器可选）。所有这些应用不用经过本地应用商店。
* **可连接性** - 通过 URL 可以轻松分享应用，不用安装即可运行。

这指南引导将会引导你完成你自己的Progressive Web App，这也包括网页设计考量以及确保你的应用程序符合Progressive Web App的关键原则。

{% include shared/note.liquid list=page.notes.devsummit-video %}

## 我们将会做什么

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      在这指南引导， 你将会使用Progressive Web App的技巧来建立一个天气预报的web app。
    </p>
    <p>
      让我们考虑Progressive Web App的特性：
      <ul>
        <li><b>渐进增强</b> - 我们将会使用渐进增强的特性。</li>
        <li><b>响应用户界面</b> - 我们将确保这应用程序能适合任何形式因素。</li>
        <li><b>连接性、独立性</b> -我们将会用Service Worker缓存app shell。</li>
        <li><b>类应用 UI</b> - 我们将会使用本地应用的UI交互来添加城市以及更新天气。</li>
        <li><b>持续更新</b> - 我们将会用Service Worker来缓存最新的内容。</li>
        <li><b>安全通信</b> - 我们将会把网页发布在一个支持HTTPS的主机服务。</li>
        <li><b>推送与互动</b> - 我们将添加一个程序集清单以让搜索器找到我们的应用程序。</li>
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

* 如何使用"app shell"的方法来设计和构造一个应用程序。
* 如何使你的应用程序能在离线下使用。
* 如何存储网页的数据以在离线时使用。

## Topics covered

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
* HTML，CSS和JavaScript的知识

这指南引导的重点是Progressive Web Apps。当中，有些概念的只是简单的解释，并没有深入的解释。
而有些则是只提供示例代码（例如CSS和其他不相关的Javascipt），你只需复制和粘贴即可。
