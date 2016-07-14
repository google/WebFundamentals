---
published: false
description: "Progressive Web Apps"
title: "Progressive Web Apps"
updated_on: 2016-05-14
translators:
  - henrylim  
---

<div class="wf-landing-section">
  <div class="page-content mdl-grid">
    <div class="mdl-cell mdl-cell--8-col mdl-cell--5-col-tablet">
      <h2>Progressive Web Apps</h2>
      <p>Progressive Web App使用了现代Web的功能，提供一个应用程序般的用户体验。这从游览器标签里普通的网页演变成全屏，沉浸模式的应用程序。</p>
      <p>
        <a href="#getstarted" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          开始
        </a>
        <a href="#learnmore" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored pwa-left-margin">
          更多
        </a>
      </p>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--3-col-tablet mdl-cell--hide-phone">
      <img src="/web/imgs/pwa-voice-memos_framed.png">
    </div>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div id="getstarted" class="wf-landing-section wf-pwa-gs wf-secondaryheading">
  <div class="page-content mdl-grid">
    <h2 class="mdl-cell mdl-cell--12-col">
      开始
    </h2>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      {% ytvideo MyQ8mtR9WxI %}
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      <h4>指南和 Code Labs</h4>
      <ul>
        <li><a href="/web/fundamentals/getting-started/your-first-progressive-web-app/">你的首个Progressive Web App</a></li>
        <li><a href="/web/fundamentals/getting-started/your-first-offline-web-app/">你的首个离线web app</a></li>
        <li><a href="/web/fundamentals/getting-started/push-notifications/">你的首个推送通知 web app</a></li>
      </ul>
      <h4>Components</h4>
      <ul>
        <li><a href="/web/updates/2015/11/app-shell">App Shell</a></li>
        <li><a href="https://slightlyoff.github.io/ServiceWorker/spec/service_worker/">Service Workers</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/simplified-app-installs/">添加到主屏</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/push-notifications/">推送通知</a></li>
      </ul>
      <h4>帮助</h4>
      <ul>
        <li><a href="http://stackoverflow.com/questions/tagged/progressive-web-apps">Stack Overflow</a></li>
      </ul>
    </div>
  </div>
</div>

<div id="learnmore" class="wf-landing-section">
  <div class="page-content">
    <h2>What is a Progressive Web App?</h2>
    <p>
      Progressive Web Apps是个结合了网页和应用程序的最好功能的一个体验。Progressive Web Apps将会对第一次游览的用户带来很多好处。用户可以直接在游览器访问网站，并且他们不必安装任何东西。随着时间的推移，用户逐步建立一个与应用程序的关系，并让应用程序更加的强大。Progressive Web Apps能快速的加载,这也包括不稳定的网络。他也能发送相关的推送通知，也可以添加至主屏，并提供一个全屏的体验。
    </p>

    <h3>Progressive Web Apps are:</h3>
    <ul>
      <li>
        <b>渐进增强</b> - 应用运行在尽可能多的环境中。它会使用任何可用的服务，如果没有可用的服务则会优雅降级。
      </li>
      <li>
        <b>响应用户界面</b> - 应用适应多种输入方式（触摸、 语言输入等）和多种输出方式（不同的屏幕尺寸、震动、音频、盲文显示等）。
      </li>
      <li>
        <b>连接性、独立性</b> - 应用可在断网以及间歇性断网或低带宽环境下很好地工作。
      </li>
      <li>
        <b>类应用 UI</b> - 应用采用原生平台的 UI 元素，包括快速加载用户界面（可以通过 service workers 获取重要的缓存资源。)
      </li>
      <li>
        <b>持续更新</b> - Service Worker API 定义一个进程用来将应用自动更新至新版。
      </li>
      <li>
        <b>安全通信</b> - 应用使用 HTTPS 通信来提供服务，阻止网络劫持和攻击。
      </li>
      <li>
        <b>应用发现</b> - 就像 W3C 应用 manifest 元数据能使搜索引擎找到 web 应用。
      </li>
      <li>
        <b>推送与互动</b> - 推送通知的特性，主动让用户了解最新动态。
      </li>
      <li>
        <b>可本地安装</b> -  在一些平台上，你可以安装 web 应用使得它看起来像一个本地应用（将 icon 放在主屏，在应用程序切换器单独列出，chrome 浏览器可选）。所有这些应用不用经过本地应用商店。
      </li>
      <li>
        <b>可连接性</b> - 通过 URL 可以轻松分享应用，不用安装即可运行。
      </li>
    </ul>
  </div>
</div>

<style>
  .pwa-image {
    max-width: 300px;
  }
</style>

<div class="wf-landing-section wf-secondaryheading">
  <div class="page-content mdl-grid">
    <h2 class="mdl-cell mdl-cell--12-col">
      Progressive Web Apps 的例子
    </h2>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Air Horner (气笛)</h3>
      <a href="https://airhorner.com/">
        <img src="/web/imgs/pwa-airhorner.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Voice Memos (语音备忘录)</h3>
      <a href="https://voice-memos.appspot.com/">
        <img src="/web/imgs/pwa-voice-memos.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Weather (天气)</h3>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/">
        <img src="/web/imgs/pwa-weather.png" class="pwa-image">
      </a>
    </div>
  </div>
</div>
