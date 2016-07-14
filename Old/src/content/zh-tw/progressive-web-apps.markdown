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
      <p>Progressive Web App使用了現代Web的功能，提供一個應用程序般的用戶體驗。這從遊覽器標簽裏普通的網頁演變成全屏，沈浸模式的應用程序。</p>
      <p>
        <a href="#getstarted" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
          開始
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
      開始
    </h2>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      {% ytvideo MyQ8mtR9WxI %}
    </div>
    <div class="mdl-cell mdl-cell--6-col mdl-cell--8-col-tablet">
      <h4>指南和 Code Labs</h4>
      <ul>
        <li><a href="/web/fundamentals/getting-started/your-first-progressive-web-app/">你的首個Progressive Web App</a></li>
        <li><a href="/web/fundamentals/getting-started/your-first-offline-web-app/">你的首個離線web app</a></li>
        <li><a href="/web/fundamentals/getting-started/push-notifications/">你的首個推送通知 web app</a></li>
      </ul>
      <h4>Components</h4>
      <ul>
        <li><a href="/web/updates/2015/11/app-shell">App Shell</a></li>
        <li><a href="https://slightlyoff.github.io/ServiceWorker/spec/service_worker/">Service Workers</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/simplified-app-installs/">添加到主屏</a></li>
        <li><a href="/web/fundamentals/engage-and-retain/push-notifications/">推送通知</a></li>
      </ul>
      <h4>幫助</h4>
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
      Progressive Web Apps是個結合了網頁和應用程序的最好功能的一個體驗。Progressive Web Apps將會對第一次遊覽的用戶帶來很多好處。用戶可以直接在遊覽器訪問網站，並且他們不必安裝任何東西。隨著時間的推移，用戶逐步建立一個與應用程序的關系，並讓應用程序更加的強大。Progressive Web Apps能快速的加載,這也包括不穩定的網絡。他也能發送相關的推送通知，也可以添加至主屏，並提供一個全屏的體驗。
    </p>

    <h3>Progressive Web Apps are:</h3>
    <ul>
      <li>
        <b>漸進增強</b> - 應用運行在盡可能多的環境中。它會使用任何可用的服務，如果沒有可用的服務則會優雅降級。
      </li>
      <li>
        <b>響應用戶界面</b> - 應用適應多種輸入方式（觸摸、 語言輸入等）和多種輸出方式（不同的屏幕尺寸、震動、音頻、盲文顯示等）。
      </li>
      <li>
        <b>連接性、獨立性</b> - 應用可在斷網以及間歇性斷網或低帶寬環境下很好地工作。
      </li>
      <li>
        <b>類應用 UI</b> - 應用采用原生平臺的 UI 元素，包括快速加載用戶界面（可以通過 service workers 獲取重要的緩存資源。)
      </li>
      <li>
        <b>持續更新</b> - Service Worker API 定義一個進程用來將應用自動更新至新版。
      </li>
      <li>
        <b>安全通信</b> - 應用使用 HTTPS 通信來提供服務，阻止網絡劫持和攻擊。
      </li>
      <li>
        <b>應用發現</b> - 就像 W3C 應用 manifest 元數據能使搜索引擎找到 web 應用。
      </li>
      <li>
        <b>推送與互動</b> - 推送通知的特性，主動讓用戶了解最新動態。
      </li>
      <li>
        <b>可本地安裝</b> -  在一些平臺上，你可以安裝 web 應用使得它看起來像一個本地應用（將 icon 放在主屏，在應用程序切換器單獨列出，chrome 瀏覽器可選）。所有這些應用不用經過本地應用商店。
      </li>
      <li>
        <b>可連接性</b> - 通過 URL 可以輕松分享應用，不用安裝即可運行。
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
      <h3>Air Horner (氣笛)</h3>
      <a href="https://airhorner.com/">
        <img src="/web/imgs/pwa-airhorner.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Voice Memos (語音備忘錄)</h3>
      <a href="https://voice-memos.appspot.com/">
        <img src="/web/imgs/pwa-voice-memos.png" class="pwa-image">
      </a>
    </div>
    <div class="mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-typography--text-center">
      <h3>Weather (天氣)</h3>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/">
        <img src="/web/imgs/pwa-weather.png" class="pwa-image">
      </a>
    </div>
  </div>
</div>
