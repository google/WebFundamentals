---
title: "你的首個Progressive Web App"
description: "Progressive Web Apps是個結合了網頁和應用程序的最好功能的一個體驗。在這個指南引導，你將會建立你自己的Progressive Web Apps。你也會學到建立Progressive Web App的基礎，包括app shell模式, 如何使用service worker來緩存app shell和緩存應用程序的資料等等."
updated_on: 2016-05-14
translators:
  - henrylim  
notes:
  devsummit-video: "Looking for more? Watch Alex Russell talk about <a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>Progressive Web Apps</a> from the 2015 Chrome Dev Summit"
---

<p class="intro">
<a href="/web/progressive-web-apps">Progressive Web Apps</a>是個結合了網頁和應用程序的最好功能的一個體驗。Progressive Web Apps將會對第一次遊覽的用戶帶來很多好處。用戶可以直接在遊覽器訪問網站，並且他們不必安裝任何東西。隨著時間的推移，用戶逐步建立一個與應用程序的關系，並讓應用程序更加的強大。Progressive Web Apps能快速的加載,這也包括不穩定的網絡。他也能發送相關的推送通知，也可以添加至主屏，並提供一個全屏的體驗。
</p>



{% include shared/toc.liquid %}

## 什麽是 Progressive Web App?

Progressive Web Apps 是:

* **漸進增強** - 應用運行在盡可能多的環境中。它會使用任何可用的服務，如果沒有可用的服務則會優雅降級。
* **響應用戶界面** -  應用適應多種輸入方式（觸摸、 語言輸入等）和多種輸出方式（不同的屏幕尺寸、震動、音頻、盲文顯示等）。
* **連接性、獨立性** - 應用可在斷網以及間歇性斷網或低帶寬環境下很好地工作。
* **類應用 UI** - 應用采用原生平臺的 UI 元素，包括快速加載用戶界面（可以通過 service workers 獲取重要的緩存資源。）
* **持續更新** - Service Worker API 定義一個進程用來將應用自動更新至新版。
* **安全通信** - 應用使用 HTTPS 通信來提供服務，阻止網絡劫持和攻擊。
* **應用發現** - 就像 W3C 應用 manifest 元數據能使搜索引擎找到 web 應用。
* **推送與互動** - 推送通知的特性，主動讓用戶了解最新動態。
* **可本地安裝** - 在一些平臺上，你可以安裝 web 應用使得它看起來像一個本地應用（將 icon 放在主屏，在應用程序切換器單獨列出，chrome 瀏覽器可選）。所有這些應用不用經過本地應用商店。
* **可連接性** - 通過 URL 可以輕松分享應用，不用安裝即可運行。

這指南引導將會引導你完成你自己的Progressive Web App，這也包括網頁設計考量以及確保你的應用程序符合Progressive Web App的關鍵原則。

{% include shared/note.liquid list=page.notes.devsummit-video %}

## 我們將會做什麽

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p>
      在這指南引導， 你將會使用Progressive Web App的技巧來建立一個天氣預報的web app。
    </p>
    <p>
      讓我們考慮Progressive Web App的特性：
      <ul>
        <li><b>漸進增強</b> - 我們將會使用漸進增強的特性。</li>
        <li><b>響應用戶界面</b> - 我們將確保這應用程序能適合任何形式因素。</li>
        <li><b>連接性、獨立性</b> -我們將會用Service Worker緩存app shell。</li>
        <li><b>類應用 UI</b> - 我們將會使用本地應用的UI交互來添加城市以及更新天氣。</li>
        <li><b>持續更新</b> - 我們將會用Service Worker來緩存最新的內容。</li>
        <li><b>安全通信</b> - 我們將會把網頁發布在一個支持HTTPS的主機服務。</li>
        <li><b>推送與互動</b> - 我們將添加一個程序集清單以讓搜索器找到我們的應用程序。</li>
        <li><b>可連接性</b> - 這就是網絡!</li>
      </ul>
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <a href="https://weather-pwa-sample.firebaseapp.com/final/">
      <img src="images/weather-ss.png">
    </a>
    <p>
      <a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">嘗試</a>
    </p>
  </div>
</div>

## 你將會學到

* 如何使用"app shell"的方法來設計和構造一個應用程序。
* 如何使你的應用程序能在離線下使用。
* 如何存儲網頁的數據以在離線時使用。

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
* HTML，CSS和JavaScript的知識

這指南引導的重點是Progressive Web Apps。當中，有些概念的只是簡單的解釋，並沒有深入的解釋。
而有些則是只提供示例代碼（例如CSS和其他不相關的Javascipt），你只需復制和粘貼即可。
