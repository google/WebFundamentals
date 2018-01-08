project_path: /web/_project.yaml 
book_path: /web/fundamentals/_book.yaml
description:App Shell 架構可保證 UI 的本地化和動態加載內容，同時不影響 Web 的可鏈接性和可檢測性。 

{# wf_updated_on: 2016-09-26 #} 
{# wf_published_on: 2016-09-27 #}

# App Shell 模型 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**App Shell** 架構是構建 Progressive Web App 的一種方式，這種應用能可靠且即時地加載到您的用戶屏幕上，與本機應用相似。



App“shell”是支持用戶界面所需的最小的 HTML、CSS 和 JavaScript，如果離線緩存，可確保在用戶重複訪問時提供**即時、可靠的良好性能**。這意味着並不是每次用戶訪問時都要從網絡加載 App Shell。
只需要從網絡中加載必要的內容。


對於使用包含大量 JavaScript 的架構的[單頁應用](https://en.wikipedia.org/wiki/Single-page_application)來說，App Shell 是一種常用方法。這種方法依賴漸進式緩存 Shell（使用[服務工作線程](/web/fundamentals/primers/service-worker/)）讓應用運行。接下來，爲使用 JavaScript 的每個頁面加載動態內容。App Shell 非常適合用於在沒有網絡的情況下將一些初始 HTML 快速加載到屏幕上。



<img src="images/appshell.png" alt="App Shell 架構" />

換個說法，App Shell 就類似於您在開發本機應用時需要嚮應用商店發佈的一組代碼。
它是 UI 的主幹以及讓您的應用成功起步所需的核心組件，但可能並不包含數據。



Note: 請嘗試[第一個 Progressive Web App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0) 代碼實驗室，瞭解如何爲天氣應用構建和實現第一個 App Shell。[使用 App Shell 模型即時加載](https://www.youtube.com/watch?v=QhUzmR8eZAo)視頻也演練了這種模式。



### 何時使用 App Shell 模型

構建 PWA 並不意味着從頭開始。如果您構建的是現代單頁應用，那麼您很可能使用的就是類似於 App Shell 的模型，不管您是否這麼稱呼它。根據您使用的內容庫或框架的不同，詳細內容可能略有不同，但該概念本身與框架無關。



App Shell 架構具有相對不變的導航以及一直變化的內容，對應於和網站意義重大。
大量現代 JavaScript 框架和內容庫已經鼓勵拆分應用邏輯及其內容，從而使這種架構更能直接應用。對於只有靜態內容的某一類網站，您也可以使用相同的模型，但網站 100% 是 App Shell。





如需瞭解 Google 構建 App Shell 架構的方式，請查看[構建 Google I/O 2016 Progressive Web App](/web/showcase/2016/iowa2016)。這個真實的應用以 SPA 開始創建 PWA，使用服務工作線程預先緩存內容、動態加載新頁面、在視圖之間完美過渡，並且在第一次加載後重用內容。






### 優勢 {: #app-shell-benefits }

使用服務工作線程的 App Shell 架構的優勢包括：

* **始終快速的可靠性能**。重複訪問速度極快。
第一次訪問時即可緩存靜態資產和 UI（例如 HTML、JavaScript、圖像和 CSS），以便在重複訪問時即時加載。內容可能會在第一次訪問時緩存到系統中，但一般會在需要時才進行加載。


* **如同本機一樣的交互**。通過採用 App Shell 模型，您可以構建如同本機應用一樣的即時導航和交互，包括離線支持。



* **數據的經濟使用**。其設計旨在實現最少的數據使用量，並且可以正確判斷緩存的內容，因爲列出不需要的文件（例如，並不是每個頁面都顯示的大型圖像）會導致瀏覽器下載的數據超出所必需的量。儘管在西方國家和地區中，數據相對較廉價，但新興市場並非如此，這些市場中連接和數據費用都非常昂貴。



## 要求{: #app-shell-requirements }

App Shell 應能完美地執行以下操作：

* 快速加載
* 儘可能使用較少的數據
* 使用本機緩存中的靜態資產
* 將內容與導航分離開來
* 檢索和顯示特定頁面的內容（HTML、JSON 等）
* 可選：緩存動態內容

App Shell 可保證 UI 的本地化以及從 API 動態加載內容，但同時不影響網絡的可鏈接性和可檢測性。
用戶下次訪問您的應用時，應用會自動顯示最新版本。無需在使用前下載新版本。



Note: [Lighthouse](https://github.com/googlechrome/lighthouse) 審覈擴展可用於驗證使用 App Shell 的 PWA 是否獲得了高性能。[To the Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E) 介紹了使用這個工具優化 PWA 的過程。




## 構建您自己的 App Shell {: #building-your-app-shell }

構建您自己的應用，明確區分頁面 Shell 和動態內容。
一般而言，您的應用應加載儘可能最簡單的 Shell，但初始下載時應包含足夠的有意義的頁面內容。
確定每個數據來源的速度與數據新鮮度之間的正確平衡點。



<figure>
  <img src="images/wikipedia.jpg"
    alt="App Shell 與內容緩存搭配使用的離線維基百科應用">
  <figcaption>Jake Archibald 的<a href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">離線維基百科應用</a>就是使用 App Shell 模型的 PWA 好例子。它會在重複訪問時即時加載，但同時使用 JS 動態抓取內容。系統隨後會離線緩存此內容，以備以後訪問。
</figcaption>
</figure>

### App Shell 的 HTML 示例 {: #example-html-for-appshell }

此示例將核心應用基礎架構和 UI 從數據中分離出來。請務必使初始加載儘可能簡單，在打開網絡應用後僅顯示頁面的佈局。有些數據來自於應用的索引文件（內聯 DOM、樣式），其他數據加載自外部腳本和樣式表。



所有 UI 和基礎架構都使用服務工作線程本地緩存，因此，隨後的加載將僅檢索新數據或發生更改的數據，而不是必須加載所有數據。



您工作目錄中的 `index.html` 文件內容應類似於以下代碼。
這是實際內容的子集，不是完整的索引文件。
讓我們看看它包含的內容。

* 用戶界面“主幹”的 HTML 和 CSS，包含導航和內容佔位符。
* 用於處理導航和 UI 邏輯的外部 JavaScript 文件 (app.js)，以及用於顯示從服務器中檢索的帖子並使用 IndexedDB 等存儲機制將其存儲在本地的代碼。
* 網絡應用清單和用於啓用離線功能的服務工作線程加載程序。

<div class="clearfix"></div>

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>App Shell</title>
      <link rel="manifest" href="/manifest.json">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Shell</title>
      <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
      <header class="header">
        <h1 class="header__title">App Shell</h1>
      </header>
      
      <nav class="nav">
      ...
      </nav>
      
      <main class="main">
      ...
      </main>

      <div class="dialog-container">
      ...
      </div>

      <div class="loader">
        <!-- Show a spinner or placeholders for content -->
      </div>

      <script src="app.js" async></script>
      <script>
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      }
      </script>
    </body>
    </html>

<div class="clearfix"></div>


Note: 請參閱 [https://app-shell.appspot.com/](https://app-shell.appspot.com/)，查看一個非常簡單的、使用 App Shell 和內容服務器端渲染的 PWA 的真實演示。App Shell 可通過使用任意內容庫或框架實現（如我們的<a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">所有框架上的 Progressive Web App</a> 講座中所述）。您可以使用 Polymer (<a
href="https://shop.polymer-project.org">Shop</a>) 和 React （<a
href="https://github.com/insin/react-hn">ReactHN</a>、<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>）查看示例。

 

### 緩存 App Shell {: #app-shell-caching }

您可以使用手動編寫的服務工作線程或通過 [sw-precache](https://github.com/googlechrome/sw-precache) 等靜態資產預緩存工具生成的服務工作線程緩存 App Shell。



Note: 這些示例僅爲呈現一般信息以及進行說明而提供。
您的應用使用的實際資源很可能不同。


#### 手動緩存 App Shell

以下是使用服務工作線程的 `install` 事件將 App Shell 中的靜態資源緩存到 [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache) 中的服務工作線程代碼示例：



    var cacheName = 'shell-content';
    var filesToCache = [
      '/css/styles.css',
      '/js/scripts.js',
      '/images/logo.svg',

      '/offline.html’,

      '/’,
    ];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });

#### 使用 sw-precache 緩存 App Shell

sw-precache 生成的服務工作線程會緩存並提供您在構建過程中配置的資源。
您可以讓此線程預先緩存構成 App Shell 的每個 HTML、JavaScript 和 CSS 文件。
所有資源都可以離線工作，並且可在隨後的訪問中快速加載相關內容，無需其他操作。


以下是在 [gulp](http://gulpjs.com) 構建過程中使用 sw-precache 的基本示例：


    gulp.task('generate-service-worker', function(callback) {
      var path = require('path');
      var swPrecache = require('sw-precache');
      var rootDir = 'app';

      swPrecache.write(path.join(rootDir, 'service-worker.js'), {
        staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
        stripPrefix: rootDir
      }, callback);
    });

如需瞭解有關靜態資產緩存的詳細信息，請參閱[使用 sw-precache 添加服務工作線程](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)代碼實驗室。



Note: sw-precache 對於離線緩存您的靜態資源非常有用。對於運行時/動態資源，我們建議使用我們的免費內容庫 [sw-toolbox](https://github.com/googlechrome/sw-toolbox)。



## 結論 {: #conclusion }

使用服務工作線程的 App Shell 是實現離線緩存的強大模式，但同時還可以針對 PWA 的重複訪問實現即時加載這一重要性能。您可以緩存自己的 App Shell，以便它可以離線使用並使用 JavaScript 填充其內容。


如果重複訪問，這樣還可讓您在沒有網絡的情況下（即使您的內容最終源自網絡）在屏幕上獲得有意義的像素。




{# wf_devsite_translation #}
