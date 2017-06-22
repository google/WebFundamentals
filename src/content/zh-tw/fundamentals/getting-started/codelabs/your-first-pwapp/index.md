project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Progressive Web Apps 是結合了 web 和 原生應用中最好功能的一種體驗。在這個指南的引導下，你將會建立你自己的 Progressive Web Apps。你也會學到建立 Progressive Web App 的基礎，包括 app shell 模式, 如何使用 service worker 來緩存 App Shell 和你應用中的關鍵數據等等。

{# wf_auto_generated #}
{# wf_updated_on: 2016-09-08 #}
{# wf_published_on: 2000-01-01 #}

# 你的首個 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

[Progressive Web Apps](/web/progressive-web-apps) 是結合了 web 和 原生應用中最好功能的一種體驗。對於首次訪問的用戶它是非常有利的, 用戶可以直接在瀏覽器中進行訪問，不需要安裝應用。隨著時間的推移當用戶漸漸地和應用建立了聯系，它將變得越來越強大。它能夠快速地加載，即使在比較糟糕的網絡環境下，能夠推送相關消息, 也可以像原生應用那樣添加至主屏，能夠有全屏瀏覽的體驗。

### 什麽是 Progressive Web App?

Progressive Web Apps 是:

* __漸進增強__ - 能夠讓每一位用戶使用，無論用戶使用什麽瀏覽器，因為它是始終以漸進增強為原則。
* __響應式用戶界面__ - 適應任何環境：桌面電腦，智能手機，筆記本電腦，或者其他設備。
* __不依賴網絡連接__ - 通過 service workers 可以在離線或者網速極差的環境下工作。
* __類原生應用__ - 有像原生應用般的交互和導航給用戶原生應用般的體驗，因為它是建立在 app shell model 上的。
* __持續更新__ - 受益於 service worker 的更新進程，應用能夠始終保持更新。
* __安全__ - 通過 HTTPS 來提供服務來防止網絡窺探，保證內容不被篡改。
* __可發現__ - 得益於 W3C manifests 元數據和 service worker 的登記，讓搜索引擎能夠找到 web 應用。
* __再次訪問__ - 通過消息推送等特性讓用戶再次訪問變得容易。
* __可安裝__ - 允許用戶保留對他們有用的應用在主屏幕上，不需要通過應用商店。
* __可連接性__ - 通過 URL 可以輕松分享應用，不用復雜的安裝即可運行。

這引導指南將會引導你完成你自己的 Progressive Web App，包括設計時需要考慮的因素，也包括實現細節，以確保你的應用程序符合 Progressive Web App 的關鍵原則。

### 我們將要做什麽？

### 你將會學到

* 如何使用 "app shell" 的方法來設計和構建應用程序。
* 如何讓你的應用程序能夠離線工作。
* 如何存儲數據以在離線時使用。


### 你需要

* Chrome 52 或以上
* [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 或其他的網絡服務器。
* 示例代碼
* 代碼編輯器
* HTML，CSS 和 JavaScript 的基本知識

這份引導指南的重點是 Progressive Web Apps。其中有些概念的只是簡單的解釋
而有些則是只提供示例代碼（例如 CSS 和其他不相關的 JavaScript ），你只需復制和粘貼即可。

## 設置

### 下載示例代碼

你可以[下載本 progressive web app 引導指南需要的所有代碼](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)。

將下載好的zip文件進行解壓縮。這將會解壓縮一個名為(`your-first-pwapp-master`)的根文件夾。這文件夾包含了這指南你所需要的資源。

名為 `step-NN` 的文件夾則包含了這指南每個步驟的完整的代碼。你可以把他當成參考。

### 安裝及校驗網絡服務器

你可以選擇其他的網絡服務器，但在這個指南我們將會使用Web Server for Chrome。如果你還沒有安裝，你可以到 Chrome 網上應用店下載。

[](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

安裝完畢後，從書簽欄中選擇Apps的捷徑:

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

接下來點擊Web Server的圖標

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

你將會看到以下的窗口，這讓你配置你的本地網絡服務器:

![433870360ad308d4.png](img/433870360ad308d4.png)

點擊 __choose folder__ 的按鈕，然後選擇名為 `work` 的文件夾。這會把目錄和文件都以HTTP的方式展示出來。URL地址可以在窗口裏的 __Web Server URL(s)__ 找到。

在選項中，選擇"Automatically show index.html" 的選擇框:

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

然後在 "Web Server: STARTED" 的按鈕拉去左邊，在拉去右邊，以將本地網絡服務器關閉並重啟。

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

現在你可以使用遊覽器來訪問那個文件夾(點擊窗口內的Web Server URL下的鏈接即可)。你將會看到以下的畫面:

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

很明顯的，這個應用程序並沒有什麽功能。現在只有一個加載圖標在那裏轉動，這只是來確保你的網絡服務器能正常操作。在接下來的步驟，我們將會添加更多東西。

## 基於應用外殼的架構

### 什麽是應用外殼(App Shell)

App Shell是應用的用戶界面所需的最基本的 HTML、CSS 和 JavaScript，也是一個用來確保應用有好多性能的組件。它的首次加載將會非常快，加載後立刻被緩存下來。這意味著應用的外殼不需要每次使用時都被下載，而是只加載需要的數據。

應用外殼的結構分為應用的核心基礎組件和承載數據的 UI。所有的 UI 和基礎組件都使用一個 service worker 緩存在本地，因此在後續的加載中 Progressive Web App 僅需要加載需要的數據，而不是加載所有的內容。

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

換句話說，應用的殼相當於那些發布到應用商店的原生應用中打包的代碼。它是讓你的應用能夠運行的核心組件，只是沒有包含數據。

### 為什麽使用基於應用外殼的結構?

使用基於應用外殼的結構允許你專註於速度，給你的 Progressive Web App 和原生應用相似的屬性：快速的加載和靈活的更新，所有這些都不需要用到應用商店。

### 設計應用外殼

第一步是設計核心組件

問問自己：

* 需要立刻顯示什麽在屏幕上？
* 我們的應用需要那些關鍵的 UI 組件？
* 應用外殼需要那些資源？比如圖片，JavaScript，樣式表等等。

我們將要創建一個天氣應用作為我們的第一個 Progressive Web App 。它的核心組件包括：

在設計一個更加復雜的應用時，內容不需要在首次全部加載，可以在之後按需加載，然後緩存下來供下次使用。比如，我們能夠延遲加載添加城市的對話框，直到完成對首屏的渲染且有一些空閑的時間。

## 實現應用外殼


任何項目都可以有多種起步方式，通常我們推薦使用 Web Starter Kit。但是，這裏為了保持我們的項目
足夠簡單並專註於 Progressive Web Apps，我們提供了你所需的全部資源。



### 為應用外殼編寫 HTML 代碼

為了保證我們的起步代碼盡可能清晰，我們將會開始於一個新的 `index.html` 文件並添加在
[構建應用外殼](/web/fundamentals/getting-started/codelabs/your-first-pwapp/#architect_your_app_shell)中談論過的核心組件的代碼

請記住，核心組件包括：

* 包含標題的頭部，以及頭部的 添加/刷新 按鈕
* 放置天氣預報卡片的容器
* 天氣預報卡片的模板
* 一個用來添加城市的對話框
* 一個加載指示器

<div class="clearfix"></div>

    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather PWA</title>
        <link rel="stylesheet" type="text/css" href="styles/inline.css">
    </head>

    <body>
        <header class="header">
            <h1 class="header__title">Weather PWA</h1>
            <button id="butRefresh" class="headerButton"></button>
            <button id="butAdd" class="headerButton"></button>
        </header>
        <main class="main">
            <div class="card cardTemplate weather-forecast" hidden>
                . . .
            </div>
        </main>
        <div class="dialog-container">
            . . .
        </div>
        <div class="loader">
            <svg viewBox="0 0 32 32" width="32" height="32">
                <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
            </svg>
        </div>
        <!-- Insert link to app.js here -->
    </body>

    </html>


需要註意的是，在默認情況下加載指示器是顯示出來的。這是為了保證
用戶能在頁面加載後立刻看到加載器，給用戶一個清晰的指示，表明頁面正在加載。

為了節省你的時間，我們已經已創建了 stylesheet。

### 添加關鍵的 JavaScript 啟動代碼

現在我們的 UI 已經準備好了，是時候來添加一些代碼讓它工作起來了。像搭建應用外殼的時候那樣，註意
考慮哪些代碼是為了保持用戶體驗必須提供的，哪些可以延後加載。

在啟動代碼中，我們將包括(你可以在(`scripts/app.js`)的文件夾中找到)：

* 一個 `app` 對象包含一些和應用效果的關鍵信息。
* 為頭部的按鈕（`add`/`refresh`）和添加城市的對話框中的按鈕（`add`/`cancel`）添加事件監聽
函數。
* 一個添加或者更新天氣預報卡片的方法（`app.updateForecastCard`）。
* 一個從 Firebase 公開的天氣 API 上獲取數據的方法(`app.getForecast`)。
* 一個叠代當前所有卡片並調用 `app.getForecast` 獲取最新天氣預報數據的方法 (`app.updateForecasts`).
* 一些假數據 (`fakeForecast`) 讓你能夠快速地測試渲染效果。

### 測試

現在，你已經添加了核心的 HTML、CSS 和 JavaScript，是時候測試一下應用了。這個時候它能做的可能還不多，但要確保在控制臺沒有報錯信息。

為了看看假的天氣信息的渲染效果，從 `index.html`中取消註釋以下的代碼:

    <!--<script src="scripts/app.js" async></script>-->

接下來，從 `app.js`中取消註釋以下的代碼:

    // app.updateForecastCard(initialWeatherForecast);

刷新你的應用程序，你將會看到一個比較整齊漂亮的天氣預報的卡片:

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[](https://weather-pwa-sample.firebaseapp.com/step-04/)

嘗試並確保他能正常運作之後，將 `app.updateForecastCard` 清除。

## 從快速的首次加載開始

Progressive Web Apps 應該能夠快速啟動並且立即可用。目前，我們的天氣應用能夠快速啟動，但是還不能使用，因為還沒有數據。我們能夠發起一個 AJAX 請求來獲取數據，但是額外的請求會讓初次加載時間變長。取而代之的方法是，在初次加載時提供真實的數據。

### 插入天氣預報信息

在本實例中，我們將會靜態地插入天氣預報信息，但是在一個投入生產環境的應用中，最新的天氣預報數據會由服務器根據用戶的 IP 位置信息插入。

這代碼已經包括了所需的資料，那就是我們在前個步驟所用的 `initialWeatherForecast`。

### 區分首次運行

但我們如何知道什麽時候該展示這些信息，那些數據需要存入緩存供下次使用？當用戶下次使用的時候，他們所在城市可能已經發生了變動，所以我們需要加載目前所在城市的信息，而不是之前的城市。

用戶首選項（比如用戶訂閱的城市列表），這類數據應該使用 IndexedDB 或者其他快速的存儲方式存放在本地。
為了盡可能簡化，這裏我們使用 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 進行存儲，在生產環境下這並不是理想的選擇，因為它是阻塞型同步的存儲機制，在某些設備上可能很緩慢。

首先，讓我們添加用來存儲用戶首選項的代碼。從代碼中尋找以下的TODO註解：


    // TODO add saveSelectedCities function here


然後將以下的代碼粘貼在TODO註解的下一行。


    //  將城市裂變存入 localStorage.
    app.saveSelectedCities = function() {
        var selectedCities = JSON.stringify(app.selectedCities);
        localStorage.selectedCities = selectedCities;
    };



接下來，添加一些啟動代碼來檢查用戶是否已經訂閱了某些城市，並渲染它們，或者使用插入的天氣數據來渲染。從代碼中尋找以下的TODO註解：


    // TODO add startup code here


然後將以下的代碼粘貼在TODO註解的下一行。


    /****************************************************************************   
     *
     * 用來啟動應用的代碼
     *
     * 註意: 為了簡化入門指南, 我們使用了 localStorage。
     *   localStorage 是一個同步的 API，有嚴重的性能問題。它不應該被用於生產環節的應用中！
     *   應該考慮使用, IDB (https://www.npmjs.com/package/idb) 或者
     *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
     *
     ****************************************************************************/

    app.selectedCities = localStorage.selectedCities;
    if (app.selectedCities) {
      app.selectedCities = JSON.parse(app.selectedCities);
      app.selectedCities.forEach(function(city) {
        app.getForecast(city.key, city.label);
      });
    } else {
      app.updateForecastCard(initialWeatherForecast);
      app.selectedCities = [
        {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
      ];
      app.saveSelectedCities();
    }


### 儲存已被選擇的城市

現在，你需要修改"add city"按鈕的功能。這將會把已被選擇的城市儲存進local storage。

更新`butAddCity`中的代碼:


    document.getElementById('butAddCity').addEventListener('click', function() {
        // Add the newly selected city
        var select = document.getElementById('selectCityToAdd');
        var selected = select.options[select.selectedIndex];
        var key = selected.value;
        var label = selected.textContent;
        if (!app.selectedCities) {
          app.selectedCities = [];
        }
        app.getForecast(key, label);
        app.selectedCities.push({key: key, label: label});
        app.saveSelectedCities();
        app.toggleAddDialog(false);
      });


### 測試

* 在首次允許時，你的應用應該立刻向用戶展示 `initialWeatherForecast` 中的天氣數據。
* 添加一個新城市確保會展示兩個卡片。
* 刷新瀏覽器並驗證應用是否加載了天氣預報並展示了最新的信息。

[](https://weather-pwa-sample.firebaseapp.com/step-05/)

## 使用 Service Workers 來預緩存應用外殼

Progressive Web Apps 是快速且可安裝的，這意味著它能在在線、離線、斷斷續續或者緩慢的網絡環境下使用。為了實現這個目標，我們需要使用一個 service worker 來緩存應用外殼，以保證它能始終迅速可用且可靠。

如果你對 service workers 不熟悉，你可以通過閱讀 [介紹 Service
Workers](/web/fundamentals/getting-started/primers/service-workers) 來了解關於它能做什麽，它的生命周期是如何工作的等等知識。

service workers 提供的是一種應該被理解為漸進增強的特性，這些特性僅僅作用於支持service workers 的瀏覽器。比如，使用 service workers 你可以緩存應用外殼和你的應用所需的數據，所以這些數據在離線的環境下依然可以獲得。如果瀏覽器不支持 service workers ，支持離線的
代碼沒有工作，用戶也能得到一個基本的用戶體驗。使用特性檢測來漸漸增強有一些小的開銷，它不會在老舊的不支持 service workers 的瀏覽器中產生破壞性影響。

### 註冊 service worker

為了讓應用離線工作，要做的第一件事是註冊一個 service worker，一段允許在後臺運行的腳本，不需要
用戶打開 web 頁面，也不需要其他交互。

這只需要簡單兩步：

1. 創建一個 JavaScript 文件作為 service worker
1. 告訴瀏覽器註冊這個 JavaScript 文件為 service worker

第一步，在你的應用根目錄下創建一個空文件叫做 `service-worker.js` 。這個 `service-worker.js`
 文件必須放在跟目錄，因為 service workers 的作用範圍是根據其在目錄結構中的位置決定的。

接下來，我們需要檢查瀏覽器是否支持 service workers，如果支持，就註冊 service worker，將下面代碼添加至 `app.js`中。

    
    if('serviceWorker' in navigator) {  
        navigator.serviceWorker  
            .register('/service-worker.js')  
            .then(function() { console.log('Service Worker Registered'); });  
    }


### 緩存站點的資源

當 service worker 被註冊以後，當用戶首次訪問頁面的時候一個 `install` 事件會被觸發。在這個事件的回調函數中，我們能夠緩存所有的應用需要再次用到的資源。

當 service worker 被激活後，它應該打開緩存對象並將應用外殼需要的資源存儲進去。將下面這些代碼加入你的 `service-worker.js` (你可以在`your-first-pwapp-master/work`中找到) ：


    var cacheName = 'weatherPWA-step-6-1';
    var filesToCache = [];

    self.addEventListener('install', function(e) {
      console.log('[ServiceWorker] Install');
      e.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(filesToCache);
        })
      );
    });


首先，我們需要提供一個緩存的名字並利用 `caches.open()`打開 cache 對象。提供的緩存名允許我們給
緩存的文件添加版本，或者將數據分開，以至於我們能夠輕松地升級數據而不影響其他的緩存。

一旦緩存被打開，我們可以調用 `cache.addAll()` 並傳入一個 url 列表，然後加載這些資源並將響應添加至緩存。不幸的是 `cache.addAll()` 是原子操作，如果某個文件緩存失敗了，那麽整個緩存就會失敗！

好的。讓我們開始熟悉如何使用DevTools並學習如何使用DevTools來調試service workers。在刷新你的網頁前，開啟DevTools，從　__Application__　的面板中打開 __Service Worker__ 的窗格。它應該是這樣的：

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

當你看到這樣的空白頁，這意味著當前打開的頁面沒有已經被註冊的Service Worker。

現在，重新加載頁面。Service Worker的窗格應該是這樣的:

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

當你看到這樣的信息，這意味著頁面有個Service Worker正在運行。

現在讓我們來示範你在使用Service Worker時可能會遇到的問題。為了演示, 我們將把`service-worker.js`裏的`install` 的事件監聽器的下面添加在`activate` 的事件監聽器。

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

當 service worker 開始啟動時，這將會發射`activate`事件。

打開DevTools並刷新網頁，切換到應用程序面板的Service Worker窗格，在已被激活的Service Worker中單擊inspect。理論上，控制臺將會出現`[ServiceWorker] Activate`的信息，但這並沒有發生。現在回去Service Worker窗格，你會發現到新的Service Worker是在“等待”狀態。

![1f454b6807700695.png](img/1f454b6807700695.png)

簡單來說，舊的Service Worker將會繼續控制該網頁直到標簽被關閉。因此，你可以關閉再重新打開該網頁或者點擊 __skipWaiting__ 的按鈕，但一個長期的解決方案是在DevTools中的Service Worker窗格啟用 __Update on Reload__ 。當那個復選框被選擇後，當每次頁面重新加載，Service Worker將會強制更新

啟用 __update on reload__ 復選框並重新加載頁面以確認新的Service Worker被激活。

__Note:__ 您可能會在應用程序面板裏的Service Worker窗格中看到類似於下面的錯誤信息，但你可以放心的忽略那個錯誤信息。

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

Ok, 現在讓我們來完成`activate` 的事件處理函數的代碼以更新緩存。


    self.addEventListener('activate', function(e) {  
      console.log('[ServiceWorker] Activate');  
      e.waitUntil(  
        caches.keys().then(function(keyList) {  
          return Promise.all(keyList.map(function(key) {  
            console.log('[ServiceWorker] Removing old cache', key);  
            if (key !== cacheName) {  
              return caches.delete(key);  
            }  
          }));  
        })  
      );  
    });


確保在每次修改了 service worker 後修改 `cacheName`，這能確保你永遠能夠從緩存中獲得到最新版本的文件。過一段時間清理一下緩存刪除掉沒用的數據也是很重要的。

最後，讓我們更新一下 app shell 需要的緩存的文件列表。在這個數組中，我們需要包括所有我們的應用需要的文件，其中包括圖片、JavaScript以及樣式表等等。


    var filesToCache = [  
      '/',  
      '/index.html',  
      '/scripts/app.js',  
      '/styles/inline.css',  
      '/images/clear.png',  
      '/images/cloudy-scattered-showers.png',  
      '/images/cloudy.png',  
      '/images/fog.png',  
      '/images/ic_add_white_24px.svg',  
      '/images/ic_refresh_white_24px.svg',  
      '/images/partly-cloudy.png',  
      '/images/rain.png',  
      '/images/scattered-showers.png',  
      '/images/sleet.png',  
      '/images/snow.png',  
      '/images/thunderstorm.png',  
      '/images/wind.png'  
    ];


我麽的應用目前還不能離線工作。我們緩存了 app shell 的組件，但是我們仍然需要從本地緩存中加載它們。

### 從緩存中加載 app sheel

Service workers 可以截獲 Progressive Web App 發起的請求並從緩存中返回響應。這意味著我們能夠
決定如何來處理這些請求，以及決定哪些網絡響應能夠成為我們的緩存。

比如：

    self.addEventListener('fetch', function(event) {  
      // Do something interesting with the fetch here  
    });


讓我們來從緩存中加載 app shell。將下面代碼加入 `service-worker.js` 中：


    self.addEventListener('fetch', function(e) {  
      console.log('[ServiceWorker] Fetch', e.request.url);  
      e.respondWith(  
        caches.match(e.request).then(function(response) {  
          return response || fetch(e.request);  
        })  
      );  
    });


從內至外，`caches.match()` 從網絡請求觸發的 `fetch` 事件中得到請求內容，並判斷請求的資源是
否存在於緩存中。然後以緩存中的內容作為響應，或者使用 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 函數來加載資源（如果緩存中沒有該資源）。
`response` 最後通過 `e.respondWith()` 返回給 web 頁面。


### 測試
你的應用程序現在可以在離線下使用了！　讓我們來試試吧！

先刷新那個網頁, 然後去DevTools裏的 __Cache Storage__ 窗格中的 __Application__ 面板上。展開該部分，你應該會在左邊看到您的app shell緩存的名稱。當你點擊你的appshell緩存，你將會看到所有已經被緩存的資源。

![ab9c361527825fac.png](img/ab9c361527825fac.png)

現在，讓我們測試離線模式。回去DevTools中的 __Service Worker__ 窗格，啟用 __Offline__ 的復選框。啟用之後，你將會在 __Network__ 窗格的旁邊看到一個黃色的警告圖標。這表示您處於離線狀態。

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

刷新網頁,然後你會發現你的網頁仍然可以正常操作！

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

下一步驟是修改該應用程序和service worker的邏輯，讓氣象數據能夠被緩存，並能在應用程序處於離線狀態，將最新的緩存數據顯示出來。

__Tip:__ 如果你要清除所有保存的數據（localStoarge，IndexedDB的數據，緩存文件），並刪除任何的service worker，你可以在DevTools中的__Application__ 面板裏的Clear storage清除。

[](https://weather-pwa-sample.firebaseapp.com/step-06/)

### 當心邊緣問題

之前提到過，這段代碼 **一定不要用在生產環境下** ，因為有很多沒有處理的邊界情況。


#### 緩存依賴於每次修改內容後更新緩存名稱

比如緩存方法需要你在每次改變內容後更新緩存的名字。否則，緩存不會被更新，舊的內容會一直被緩存返回。
所以，請確保每次修改你的項目後更新緩存名稱。

#### 每次修改後所有資源都需要被重新下載

另一個缺點是當一個文件被修改後，整個緩存都需要被重新下載。這意味著即使你修改了一個簡單的拼寫錯誤
也會讓整個緩存重新下載。這不太高效。

#### 瀏覽器的緩存可能阻礙  service worker 的緩存的更新

另外一個重要的警告。首次安裝時請求的資源是直接經由 HTTPS 的，這個時候瀏覽器不會返回緩存的資源，
除此之外，瀏覽器可能返回舊的緩存資源，這導致 service worker 的緩存不會得到 更新。

#### 在生產環境中當下 cache-first 策略

我們的應用使用了優先緩存的策略，這導致所有後續請求都會從緩存中返回而不詢問網絡。優先緩存的策略是
很容易實現的，但也會為未來帶來諸多挑戰。一旦主頁和註冊的 service worker 被緩存下來，將會很難
去修改 service worker 的配置（因為配置依賴於它的位置），你會發現你部署的站點很難被升級。

#### 我該如何避免這些邊緣問題

我們該如何避免這些邊緣問題呢？ 使用一個庫，比如
[sw-precache](https://github.com/GoogleChrome/sw-precache), 它對資源何時過期提供了
精細的控制，能夠確保請求直接經由網絡，並且幫你處理了所有棘手的問題。

#### 實時測試 service workers 提示

調試 service workers 是一件有調整性的事情，當涉及到緩存後，當你期望緩存更新，但實際上它並沒有的時候，事情更是變得像一場惡夢。在 service worker 典型的生命周期和你的代碼之間，你很快就會受挫。但幸運的是，這裏有一些工具可以讓你的生活更加簡單。

其他的提示：

* 一旦 service worker 被註銷（unregistered）。它會繼續作用直到瀏覽器關閉。
* 如果你的應用打開了多個窗口，新的 service worker 不會工作，直到所有的窗口都進行了刷新，使用了
新的 service worker。
* 註銷一個 service worker 不會清空緩存，所以如果緩存名沒有修改，你可能繼續獲得到舊的數據。
* 如果一個 service worker 已經存在，而且另外一個新的 service worker 已經註冊了，這個新的
service worker 不會接管控制權，知道該頁面重新刷新後，除非你使用[立刻控制](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control)的方式。

## 使用 Service Workers 來緩存應用數據


選擇一個正確的緩存策略是很重要的，並且這取決於你應用中使用的數據的類型。比如像天氣信息、股票信息等對實時性要求較高的數據，應該時常被刷新，但是用戶的頭像或者文字內容應該以較低的頻率進行更新。



**先使用緩存後使用請求結果** 的策略對於我們的應用是非常理想的選擇。應用從緩存中獲取數據，並立刻顯示在屏幕上，然後在網絡請求返回後再更新頁面。如果使用 **先請求網絡後緩存** 的策略，用戶可能不會等到數據從網絡上加載回來便離開了應用。

**先使用緩存後使用請求結果** 意味著我們需要發起兩個異步的請求，一個從請求緩存，另一個請求網絡。我們應用中的網絡請求不需要進行修改，但我們需要修改一下 service worker 的代碼來緩存網絡請求的響應並返回響應內容。

通常情況下，應該立刻返回緩存的數據，提供應用能夠使用的最新信息。然後當網絡請求返回後應用應該使用最新加載的數據來更新。

### 截獲網絡請求並緩存響應結果

我麽需要修改 service worker 來截獲對天氣 API 的請求，然後緩存請求的結果，以便於以後使用。**先使用緩存後使用請求結果** 的策略中，我們希望請求的響應是真實的數據源，並始終提供給我們最新的數據。如果它不能做到，那也沒什麽，因為我們已經從緩存中給應用提供了最新的數據。

在 service worker 中，我們添加一個 `dataCacheName` 變量，以至於我們能夠將應用數據和應用外殼資源分開。當應用外殼更新了，應用外殼的緩存就沒用了，但是應用的數據不會受影響，並時刻保持能用。記住，如果將來你的數據格式改變了，你需要一種能夠讓應用外殼和應用數據能後保持同步的方法。

將下面代碼添加至你的 `service-worker.js` 中：

    var dataCacheName = 'weatherData-v1';

接下來，我麽需要更新`activate`事件的回調函數，以它清理應用程序的外殼(app shell)緩存，並不會刪除數據緩存。

    if (key !== cacheName && key !== dataCacheName) {

最後，我麽需要修改 `fetch` 事件的回調函數，添加一些代碼來將請求數據 API 的請求和其他請求區分開來。

    self.addEventListener('fetch', function(e) {  
      console.log('[ServiceWorker] Fetch', e.request.url);  
      var dataUrl = 'https://publicdata-weather.firebaseio.com/';  
      if (e.request.url.indexOf(dataUrl) === 0) {  
        // Put data handler code here  
      } else {  
        e.respondWith(  
          caches.match(e.request).then(function(response) {  
            return response || fetch(e.request);  
          })  
        );  
      }  
    });


這段代碼對請求進行攔截，判斷請求的 URL 的開頭是否為該天氣 API，如果是，我們使用 `fetch` 來發起請求。一旦有響應返回，我們的代碼就打開緩存並將響應存入緩存，然後將響應返回給原請求。

接下來，使用下面代碼替換 `// Put data handler code here`

    e.respondWith(  
      fetch(e.request)  
        .then(function(response) {  
          return caches.open(dataCacheName).then(function(cache) {  
            cache.put(e.request.url, response.clone());  
            console.log('[ServiceWorker] Fetched&Cached Data');  
            return response;  
          });  
        })  
    );


我們的應用目前還不能離線工作。我們已經實現了從緩存中返回應用外殼，但即使我們緩存了數據，依舊需要依賴網絡。

### 發起請求

之前提到過，應用需要發起兩個異步請求，一個從請求緩存，另一個請求網絡。應用需要使用 `window` 上的 `caches` 對象，並從中取到最新的數據。這是一個關於漸進增強 _極佳_ 的例子，因為 `caches` 對象可能並不是在任何瀏覽器上都存在的，且就算它不存在，網絡請求依舊能夠工作，只是沒有使用緩存而已。

為了實現該功能，我們需要：

1. 檢查 `cahces` 對象是否存在在全局 `window` 對象上。
2. 向緩存發起請求

* 如果向服務器發起的請求還沒有返回結果，使用緩存中返回的數據更新應用。

3. 向服務器發起請求

* 保存響應結果便於在之後使用
* 使用從服務器上返回的最新數據更新應用

#### 從緩存中獲取資料

接下來，我們需要檢查 `caches` 對象是否存在，若存在，就向它請求最新的數據。將下面這段代碼添加至 `app.getForecast()` 方法中。

    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            app.updateForecastCard(results);
          });
        }
      });
    }

我們的天氣應用現在發起了兩個異步請求，一個從緩存中，另一個經由 XHR。如果有數據存在於緩存中，它將會很快地（幾十毫秒）被返回並更新顯示天氣的卡片，通常這個時候 XHR 的請求還沒有返回來。之後當 XHR 的請求響應了以後，顯示天氣的卡片將會使用直接從天氣 API 中請求的最新數據來更新。

如果因為某些原因，XHR 的響應快於 cache 的響應，`hasRequestPending` 標誌位會阻止緩存中數據覆蓋從網路上請求的數據。


    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }

### 親自嘗試

現在應用應該能夠離線工作了。嘗試關閉裏本地啟動的服務器，並切斷網絡，然後刷新頁面。


然後去DevTools的 __Application__ 面板上的 __Cache Storage__ 窗格。
展開該部分，你應該會在左邊看到您的app shell緩存的名稱。當你點擊你的appshell緩存，你將會看到所有已經被緩存的資源。

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[](https://weather-pwa-sample.firebaseapp.com/step-07/)



## 支持集成入原生應用


沒有人喜歡在手機的鍵盤上輸入一長串的 URL，有了添加至主屏幕的功能，你的用戶可以選擇添加一個圖標在他們的屏幕上，就像從應用商店安裝一個原生應用那樣。而且這兒添加一個圖標是更加容易的。


### Web 應用安裝橫幅和添加至主屏


web 應用安裝橫幅給你能夠讓用戶快速地將 web 應用添加至他們的主屏的能力，讓他們能夠很容易地再次進入你的應用。添加應用安裝橫幅是很簡單的，Chrome 處理了幾乎所有事情，我麽只需要簡單地包含一個應用程序清單（manifest）來說明你的應用的一些細節。

Chrome 使用了一系列標準包括對 service worker 的使用，加密連接狀態以及用戶的訪問頻率決定了什麽時候展示這個橫幅。除此之外，用戶可以手動地通過 Chrome 中 “添加至主屏” 這個菜單按鈕來添加。


#### 使用 `manifest.json` 文件來聲明一個應用程序清單

web 應用程序清單是一個簡單的 JSON 文件，它給你了控制你的應用如何出現在用戶期待出現的地方（比如用戶手機主屏幕），這直接影響到用戶能啟動什麽，以及更重要的，用戶如何啟動它。

使用 web 應用程序清單，你的應用可以：

* 能夠真實存在於用戶主屏幕上
* 在 Android 上能夠全屏啟動，不顯示地址欄
* 控制屏幕方向已獲得最佳效果
* 定義啟動畫面，為你的站點定義主題
* 追蹤你的應用是從主屏幕還是 URL 啟動的

<div class="clearfix"></div>

    {
      "name": "Weather",
      "short_name": "Weather",
      "icons": [{
        "src": "images/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png"
        }, {
          "src": "images/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png"
        }, {
          "src": "images/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        }, {
          "src": "images/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        }, {
          "src": "images/icons/icon-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        }],
      "start_url": "/index.html",
      "display": "standalone",
      "background_color": "#3E4EB8",
      "theme_color": "#2F3BA2"
    }

追蹤你的應用是從哪兒啟動的最簡單方式是在 `start_url` 參數後面添加一個查詢字符串，然後使用工具來分析查詢字段。如果你使用這個方法，記得要更新應用外殼緩存的文件，確保含有查詢字段的文件被緩存。

#### 告訴瀏覽器你的程序清單文件

將這段代碼添加至你的 `index.html` 的 `<head>` 部分：

    <link rel="manifest" href="/manifest.json">

#### 最佳實踐

* 將程序清單的鏈接添加至你站點的所有頁面上，這樣在用戶第一次訪問的時候它能夠被 Chrome 正確檢索到，且不管用戶從哪個頁面訪問的。
* 如果同時提供了 `name` 和 `short_name`，`short_name` 是 Chrome 的首選。
* 為不同分辨率的屏幕提供不同的 icon。Chrome 會嘗試使用最接近 48dp 的圖標，比如在 2x 屏上使用 96px 的，在 3x屏上使用 144px 的。
* 記得要包含一個適合在啟動畫面上顯示的圖標，另外別忘了設置 `background_color`。

擴展閱讀：[使用應用安裝橫幅](/web/fundamentals/engage-and-retain/simplified-app-installs/)


### iOS Safari 的添加至主屏幕元素

在 `index.html` 中，將下面代碼添加至 `<head>` 中：

    <!-- Add to home screen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Weather PWA">
    <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">

### Windows 上的貼片圖標

在 `index.html` 中，將下面代碼添加至 `<head>` 中：

    <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
    <meta name="msapplication-TileColor" content="#2F3BA2">

### 親自嘗試

* 嘗試將應用在你的 Android Chrome 上添加至首屏，並確認啟動畫面上使用了正確的圖標。
* 檢查一下 Safari 和 Internet Explorer 確認圖標正確地出現了。

[](https://weather-pwa-sample.firebaseapp.com/step-08/)


## 部署在安全的主機上



最後一步是將我們的天氣應用部署在一個支撐 HTTPs 的服務器上。如果你目前還沒有一個這樣的主機，那麽最簡單（且免費）的方法絕對是使用我們的靜態資源部署服務 Firebase。它非常容易使用，通過 HTTPs 來提供服務且在全球 CDN 中。


### 可優化的地方：壓縮並內聯 CSS 樣式

還有一些你需要考慮的事情，壓縮關鍵的 CSS 樣式並將其內聯在 `index.html` 中。[Page Speed Insights](/speed) 建議以上內容要在 15k 以內。

看看當所有內容都內聯後，首次加載資源有多大。

**擴展閱讀:** [PageSpeed Insight Rules](/speed/docs/insights/rules)

### 部署到 Firebase

如果你首次使用 Firebase，那麽你需要使用你的 Google 賬號登錄 Firebase 並安裝一些工具。

1. 使用你的 Google 賬號登錄 Firebase [https://firebase.google.com/](https://firebase.google.com/)
2. 通過 npm 安裝 Firebase 工具 :<br/>
   `npm install -g firebase-tools`

你的賬號被創建且已經登錄後，你就可以開始部署了！

1. 創建一個新的應用，在這兒：[https://console.firebase.google.com/](https://console.firebase.google.com/)
2. 如果你最近沒有登錄過 Firebase 工具，請更新你的證書:<br/>
   `firebase login`
3. 初始化你的應用，並提供你完成了應用的目錄位置：<br/>
   `firebase init`
4. 最後，將應用部署至 Firebase:<br/>
   `firebase deploy`
5. 祝賀你。你完成了，你的應用將會部署在：<br/>
   `https://YOUR-FIREBASE-APP.firebaseapp.com`

**擴展閱讀:** [Firebase Hosting
Guide](https://firebase.google.com/docs/hosting/)

### 親自嘗試

* 試著將應用添加至你的主屏幕，然後斷開網絡連接，看看它是否能在離線的情況下很好的工作。

[](https://weather-pwa-sample.firebaseapp.com/final/)


Translated By:
{% include "web/_shared/contributors/henrylim.html" %}
{% include "web/_shared/contributors/wangyu.html" %}
