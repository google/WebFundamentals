project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# 你的首個 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## 簡介

### 什麼是網絡應用程序，一個漸進式網絡應用程序？

漸進式Web應用程序在桌面和移動設備上提供可安裝的，類似應用程序的體驗，可通過Web直接構建和交付。它們是快速可靠的網絡應用程序。最重要的是，它們是適用於任何瀏覽器的網絡應用程序。如果您今天正在構建一個Web應用程序，那麼您已經開始構建一個漸進式Web應用程序。

#### 快速可靠

每個Web體驗都必須快速，對於Progressive Web Apps尤其如此。快速是指在屏幕上獲取有意義內容所需的時間，並在不到5秒的時間內提供交互式體驗。

並且，它必須快。很難強調性能更好的可靠性。可以這樣想:本機應用程序的第一次加載令人沮喪。它是由一個應用程序商店和一個巨大的下載門控，但一旦你到達安裝該應用程序的點，該前期成本將在所有應用程序啟動時分攤，並且這些啟動都沒有可變延遲。每個應用程序的啟動速度與最後一個一樣快，沒有任何差異。漸進式Web應用程序必須提供用戶可以從任何已安裝的體驗中獲得的可靠性能。

#### 安裝

漸進式Web應用程序可以在瀏覽器選項卡中運行，但也可以安裝。為網站添加書籤只是添加了一個快捷方式，但已安裝的Progressive Web App的外觀和行為與所有其他已安裝的應用程序類似。它與其他應用程序啟動時的位置相同。您可以控制啟動體驗，包括自定義啟動畫面，圖標等。它在應用程序窗口中作為應用程序運行，沒有地址欄或其他瀏覽器UI。與所有其他已安裝的應用程序一樣，它是任務切換器中的頂級應用程序。

請記住，可安裝的PWA快速可靠至關重要。安裝PWA的用戶希望他們的應用程序正常運行，無論他們使用何種網絡連接。這是每個已安裝應用必須滿足的基線預期。

#### 手機和桌面

使用響應式設計技術，Progressive Web Apps可在移動__and__桌面上工作，使用平台之間的單一代碼庫。如果您正在考慮編寫本機應用程序，請查看PWA提供的好處。

### 你將建立什麼

在此代碼框中，您將使用漸進式Web應用程序技術構建天氣Web應用程序。您的應用將:

* 使用響應式設計，因此可在桌面或移動設備上使用。
* 快速，使用服務工作者來預先運行運行所需的應用程序資源（HTML，CSS，JavaScript，圖像），並在運行時緩存天氣數據以提高性能。
* 可安裝，使用Web應用程序清單和`beforeinstallprompt`事件通知用戶它是可安裝的。

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: 為了簡化此代碼框，並解釋提供離線體驗的基礎知識，我們使用的是vanilla JavaScript。在生產應用程序中，我們強烈建議使用[Workbox](/web/tools/workbox/)工具來構建服務工作者。它可以消除許多可能遇到的尖銳邊緣和暗角。

### 你將學到什麼

* 如何創建和添加Web應用程序清單
* 如何提供簡單的離線體驗
* 如何提供完整的離線體驗
* 如何使您的應用程序可安裝

此codelab專注於Progressive Web Apps。屏蔽了不相關的概念和代碼塊，並為您提供簡單的複制和粘貼。

### 你需要什麼

* 最近版本的Chrome（74或更高版本）PWA只是網絡應用，適用於所有瀏覽器，但我們將使用Chrome DevTools的一些功能來更好地了解瀏覽器級別的情況，並將其用於測試安裝體驗。
* 了解HTML，CSS，JavaScript和[Chrome DevTools](https://developer.chrome.com/devtools) 。

## 設置好

### 獲取Dark Sky API的密鑰

我們的天氣數據來自[Dark Sky API](https://darksky.net/dev) 。要使用它，您需要申請API密鑰。它易於使用，並且可以免費用於非商業項目。

[Register for API Key](https://darksky.net/dev/register)

Note: 您仍然可以在沒有Dark Sky API密鑰的情況下完成此codelab。如果我們的服務器無法從Dark Sky API獲取真實數據，它將返回虛假數據。

#### 驗證您的API密鑰是否正常工作

要測試您的API密鑰是否正常工作，請向DarkSky API發出HTTP請求。更新以下網址，將`DARKSKY_API_KEY`替換為您的API密鑰。如果一切正常，您應該看到紐約市的最新天氣預報。

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### 獲取代碼

我們已將此項目所需的一切都放入Git倉庫中。首先，您需要獲取代碼並在您喜歡的開發環境中打開它。對於此代碼庫，我們建議使用Glitch。

#### 強烈推薦:使用Glitch導入回購

使用Glitch是推薦使用此代碼庫的方法。

1. 打開一個新的瀏覽器選項卡，然後轉到[https://glitch.com](https://glitch.com) 。
2. 如果您沒有帳戶，則需要註冊。
3. 單擊__New Project__，然後單擊Git Repo中的__Clone .__
4. 克隆__https://github.com/googlecodelabs/your-first-pwapp.git__並單擊確定。
5. 加載repo後，編輯`.env`文件，並使用DarkSky API密鑰更新它。
6. 單擊__Show Live__按鈕以查看PWA的運行情況。

#### 替代方案:下載代碼並在本地工作

如果您想下載代碼並在本地工作，您需要擁有最新版本的Node和代碼編輯器設置並準備就緒。

Caution: 如果您在本地工作，某些Lighthouse審核將無法通過，並且安裝可能無法使用，因為本地服務器不通過安全上下文提供內容。

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. 解壓縮下載的zip文件。
2. 運行`npm install`以安裝運行服務器所需的依賴項。
3. 編輯`server.js`並設置DarkSky API密鑰。
4. 運行`node server.js`以在端口8000上啟動服務器.
5. 打開瀏覽器選項卡到[http://localhost:8000](http://localhost:8000)

## 建立基線

### 我們的出發點是什麼？

我們的出發點是為此codelab設計的基本天氣應用程序。代碼已經過度簡化，以顯示此代碼庫中的概念，並且它幾乎沒有錯誤處理。如果您選擇在生產應用程序中重用任何此代碼，請確保處理任何錯誤並完全測試所有代碼。

有些事要嘗試......

1. 在右下角添加一個帶有藍色加號按鈕的新城市。
2. 使用右上角的刷新按鈕刷新數據。
3. 使用每張城市卡右上角的x刪除城市。
4. 了解它在桌面和移動設備上的工作原理。
5. 看看你離線時會發生什麼。
6. 使用Chrome的“網絡”面板，查看當網絡受限制為慢速3G時會發生什麼。
7. 通過更改`FORECAST_DELAY`中的`server.js`向預測服務器添加延遲

### 審計與燈塔

[Lighthouse](/web/tools/lighthouse/#devtools)是一款易於使用的工具，可幫助您提高網站和網頁的質量。它具有性能，可訪問性，漸進式Web應用程序等審計。每個審核都有一個參考文檔，解釋了審核為何重要，以及如何解決。

![b112675caafccef0.png](img/b112675caafccef0.png)

我們將使用Lighthouse來審核我們的天氣應用程序，並驗證我們所做的更改。

Note: 您可以在Chrome DevTools中，從命令行或作為節點模塊運行Lighthouse。將[adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot)您的構建過程，以確保您的Web應用程序不會退化。

### 讓我們運行燈塔

1. 在新選項卡中打開項目。
2. 打開Chrome DevTools並切換到__Audits__選項卡，DevTools顯示審核類別列表，將它們全部啟用。
3. 單擊__Run audits__，60-90秒後，Lighthouse會在頁面上顯示報告。

### 漸進式Web App審計

我們將重點關注Progressive Web App審核的結果。

![af1a64a13725428e.png](img/af1a64a13725428e.png)

並且有很多紅色要關注:

* __❗失敗:__ 離線時當前頁面不響應200。
* __❗失敗:__ `start_url`在離線時不響應200。
* __❗失敗:__ 不註冊控制頁面和`start_url.`的服務工作者
* __❗失敗:__ Web應用程序清單不符合可安裝性要求。
* __❗失敗:__ 未配置自定義初始屏幕。
* __❗失敗:__ 不設置地址欄主題顏色。

讓我們進入並開始修復其中的一些問題！

## 添加Web應用程序清單

到本節結束時，我們的天氣應用程序將通過以下審核:

* Web應用程序清單不符合可安裝性要求。
* 未配置自定義初始屏幕。
* 不設置地址欄主題顏色。

### 創建Web應用程序清單

[web app manifest](/web/fundamentals/web-app-manifest)是一個簡單的JSON文件，它使開發人員能夠控制應用程序對用戶的顯示方式。

使用Web應用程序清單，您的Web應用程序可以:

* 告訴瀏覽器您希望應用程序在獨立窗口中打開（ `display` ）。
* 定義首次啟動應用程序時打開的頁面（ `start_url` ）。
* 定義應用程序在Dock或app啟動器（ `short_name` ， `icons` ）上應該是什麼樣子。
* 創建一個閃屏（ `name` ， `icons` ， `colors` ）。
* 告訴瀏覽器以橫向或縱向模式（ `orientation` ）打開窗口。
* 和[plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) 。

在項目中創建名為`public/manifest.json`的文件，並複制/粘貼以下內容:

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

清單支持一組圖標，用於不同的屏幕尺寸。對於此代碼實驗室，我們已經包含了其他一些代碼實驗室，因為我們需要它們用於iOS集成。

Note: 要安裝，Chrome要求您提供至少192x192px圖標和512x512px圖標。但是你也可以提供其他尺碼。 Chrome使用最接近48dp的圖標，例如，2x設備上的96px或3x設備的144px。

### 添加指向Web應用程序清單的鏈接

接下來，我們需要通過向應用程序中的每個頁面添加`<link rel="manifest"...`來告訴瀏覽器我們的清單。 `<head>`添加到`index.html`文件中的`<head>`元素。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools Detour

DevTools提供了一種快速簡便的方法來檢查您的`manifest.json`文件。打開__Application__面板上的__Manifest__窗格。如果您已正確添加清單信息，您將能夠在此窗格中看到它以人性化格式進行解析和顯示。

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### 添加iOS元標記和圖標

iOS上的Safari不支持Web應用程序清單（ [yet](https://webkit.org/status/#specification-web-app-manifest) ），因此您需要將[traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)添加到`index.html`文件的`<head>`中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### 獎勵:簡易燈塔修復

我們的燈塔審核還提出了一些其他很容易解決的問題，所以當我們在這裡時，讓我們來處理這些問題。

#### 設置元描述

根據SEO審計，Lighthouse注意到我們的“ [Document does not have a meta description.](/web/tools/lighthouse/audits/description) ”描述可以顯示在Google的搜索結果中。高質量，獨特的描述可以使您的搜索結果與搜索用戶更相關，並可以增加搜索流量。

要添加說明，請將以下`meta`標記添加到文檔的`<head>`中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### 設置地址欄主題顏色

在PWA審計中，Lighthouse注意到我們的應用程序“ [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) ”。將瀏覽器的地址欄設置為與您品牌的顏色相匹配，可以提供更加身臨其境的用戶體驗。

要在移動設備上設置主題顏色，請將以下`meta`標記添加到文檔的`<head>` :

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### 驗證燈塔的變化

再次運行Lighthouse（通過單擊“審核”窗格左上角的+號）並驗證您的更改。

__SEO審計___

* __✅好:__ Document有元描述。

__Progressive Web App Audit__

* __❗失敗:__ 離線時當前頁面不響應200。
* __❗失敗:__ `start_url`在離線時不響應200。
* __❗失敗:__ 不註冊控制頁面和`start_url.`的服務工作者
* __✅好:__ Web應用程序清單符合可安裝性要求。
* __✅好:__ 已配置為自定義初始屏幕。
* __✅好:__ 設置地址欄主題顏色。

## 提供基本的離線體驗

用戶期望安裝的應用程序在離線時始終具有基線體驗。這就是為什麼對於可安裝的網絡應用程序來說，永遠不會顯示Chrome的離線恐龍至關重要。離線體驗的範圍從簡單的離線頁面到具有先前緩存數據的只讀體驗，一直到完全功能的脫機體驗，在網絡連接恢復時自動同步。

在本節中，我們將向天氣應用添加一個簡單的離線頁面。如果用戶在離線時嘗試加載應用，則會顯示我們的自定義頁面，而不是瀏覽器顯示的典型離線頁面。到本節結束時，我們的天氣應用程序將通過以下審核:

* 離線時當前頁面不響應200。
* 離線時， `start_url`不響應200。
* 不註冊控制頁面和`start_url.`的服務工作者

在下一部分中，我們將使用完整的離線體驗替換我們的自定義離線頁面。這將改善離線體驗，但更重要的是，它將顯著提高我們的性能，因為我們的大多數資產（HTML，CSS和JavaScript）將在本地存儲和提供，從而消除了網絡作為潛在的瓶頸。

### 服務人員進行救援

如果您對服務工作者不熟悉，可以通過閱讀[Introduction To Service Workers](/web/fundamentals/primers/service-worker/)了解他們可以做什麼，他們的生命週期如何工作等等，從而獲得基本的理解。完成此代碼實驗室後，請務必查看[Debugging Service Workers code lab](http://goo.gl/jhXCBy)以便更深入地了解如何與服務人員合作。

通過服務工作人員提供的功能應被視為漸進增強功能，並且僅在瀏覽器支持時才添加。例如，對於服務工作者，您可以為應用程序緩存[app shell](/web/fundamentals/architecture/app-shell)和數據，以便即使網絡不可用也可以使用它。如果不支持服務工作者，則不會調用脫機代碼，並且用戶將獲得基本體驗。使用特徵檢測提供漸進增強功能的開銷很小，並且在不支持該功能的舊瀏覽器中不會中斷。

Warning: 服務工作者功能僅在通過HTTPS訪問的頁面上可用（http:// localhost和等效項也可用於促進測試）。

### 註冊服務人員

第一步是註冊服務工作者。將以下代碼添加到`index.html`文件中:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

此代碼檢查服務工作者API是否可用，如果是，則在頁面為[loaded](/web/fundamentals/primers/service-workers/registration) ， `/service-worker.js`的服務工作者將註冊。

注意，服務工作者是從根目錄提供的，而不是從`/scripts/`目錄提供的。這是設置服務工作者的__ `scope` __的最簡單方法。服務工作者的`scope`確定服務工作者控制哪些文件，換句話說，服務工作者將`scope`條路徑攔截請求。默認的`scope`是服務工作者文件的位置，並擴展到下面的所有目錄。因此，如果`service-worker.js`位於根目錄中，則服務工作者將控制來自此域的所有網頁的請求。

### Precache離線頁面

首先，我們需要告訴服務工作者緩存什麼。我們已經創建了一個簡單的[offline page](https://your-first-pwa.glitch.me/offline.html) （ `public/offline.html` ），只要沒有網絡連接，我們就會顯示它。

在`service-worker.js` ，將`'/offline.html',`添加到`FILES_TO_CACHE`數組中，最終結果應如下所示:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

接下來，我們需要更新`install`事件以告知服務工作者預先緩存脫機頁面:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: 服務工作者事件和生命週期將在下一節中介紹。

我們的`install`事件現在使用`caches.open()`打開緩存並提供緩存名稱。提供緩存名稱允許我們對緩存資源進行版本控製或分離數據，以便我們可以輕鬆更新一個但不影響另一個。

一旦緩存打開，我們就可以調用`cache.addAll()` ，它獲取一個URL列表，從服務器獲取它們並將響應添加到緩存中。請注意，如果任何單個請求失敗， `cache.addAll()`將拒絕。這意味著您可以保證，如果安裝步驟成功，您的緩存將處於一致狀態。但是，如果由於某種原因失敗，它將在下次服務工作者啟動時自動重試。

#### DevTools Detour

讓我們來看看如何使用DevTools來理解和調試服務工作者。在重新加載頁面之前，打開DevTools，轉到__Application__面板上的__Service Workers__窗格。它應該如下所示:

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

當您看到這樣的空白頁面時，表示當前打開的頁面沒有任何已註冊的服務工作者。

現在，重新加載您的頁面。 “服務工作者”窗格現在應如下所示:

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

當您看到這樣的信息時，表示該頁面正在運行服務工作者。

狀態標籤旁邊有一個數字（在這種情況下為* 34251 *），在您與服務工作人員合作時，請密切注意該數字。這是一種簡單的方法來判斷您的服務工作者是否已更新。

### 清理舊的離線頁面

我們將使用`activate`事件來清理緩存中的任何舊數據。此代碼可確保您的服務工作程序在任何應用程序shell文件發生更改時更新其緩存。為了使其工作，您需要在服務工作文件的頂部增加`CACHE_NAME`變量。

將以下代碼添加到`activate`事件:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevTools Detour

打開“服務工作者”窗格，刷新頁面，您將看到安裝了新的服務工作者，並且狀態編號會增加。

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

更新後的服務工作者立即獲得控制權，因為我們的`install`事件以`self.skipWaiting()`結束， `activate`事件以`self.clients.claim()`結束。沒有這些，只要有一個打開頁面的選項卡，舊的服務工作者就會繼續控制頁面。

### 處理失敗的網絡請求

最後，我們需要處理`fetch`事件。我們將使用[network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) 。服務工作者將首先嘗試從網絡獲取資源，如果失敗，它將從緩存中返回脫機頁面。

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

`fetch`處理程序只需要處理頁面導航，因此其他請求可以從處理程序`fetch`出，並且將由瀏覽器正常處理。但是，如果請求`.mode`是`navigate` ，請使用`fetch`嘗試從網絡獲取項目。如果失敗，則`catch`處理程序打開緩存， `caches.open(CACHE_NAME)`並使用`cache.match('offline.html')`獲得預緩存的離線頁面。然後使用`evt.respondWith()`將結果傳回瀏覽器。

Key Point: 中包裝`fetch`呼叫[`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)防止瀏覽器默認提取處理，並告訴我們要處理的響應自己的瀏覽器。如果你沒有在`fetch`處理程序中調用`evt.respondWith()` ，你將只獲得默認的網絡行為。

#### DevTools Detour

讓我們檢查一下，確保一切正常。打開“服務工作者”窗格，刷新頁面，您將看到安裝了新的服務工作者，並且狀態編號會增加。

我們還可以查看已緩存的內容。轉到DevTools的__Application__面板上的__Cache Storage__窗格。右鍵單擊__Cache Storage __，選擇__Refresh Caches__，展開該部分，您應該會在左側看到靜態緩存的名稱。單擊緩存名稱將顯示緩存的所有文件。

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

現在，讓我們測試離線模式。返回DevTools的__Service Workers__窗格並檢查__Offline__複選框。檢查後，您應該會在__Network__面板選項卡旁邊看到一個黃色警告圖標。這表示您處於離線狀態。

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

重新加載您的頁面......它的工作原理！我們得到__our__離線熊貓，而不是Chrome的離線恐龍！

### 測試服務人員的技巧

調試服務工作者可能是一個挑戰，當它涉及緩存時，如果緩存未按預期更新，事情可能變得更加噩夢。在典型的服務工作者生命週期和代碼中的錯誤之間，您可能會很快感到沮喪。 __But不要.__

#### 使用DevTools

在“應用程序”面板的“服務工作者”窗格中，有一些複選框可以使您的生活更輕鬆。

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - 選中時會模擬離線體驗並阻止任何請求進入網絡。
* __Update on reload__ - 選中後將獲得最新的服務工作者，安裝它，並立即激活它。
* __Bypass for network__ - 當檢查請求繞過服務工作者並直接發送到網絡時。

#### 開始新鮮

在某些情況下，您可能會發現自己正在加載緩存數據或者沒有按預期更新內容。要清除所有已保存的數據（localStorage，indexedDB數據，緩存文件）並刪除任何服務工作者，請使用“應用程序”選項卡中的“清除存儲”窗格。或者，您也可以在隱身窗口中工作。

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

其他提示:

* 一旦服務工作者未註冊，它可能會一直列出，直到其包含的瀏覽器窗口關閉。
* 如果您的應用程序的多個窗口打開，則在將所有窗口重新加載並更新到最新的服務工作者之後，新的服務工作程序將不會生效。
* 取消註冊服務工作者不會清除緩存！
* 如果存在服務工作者並且註冊了新的服務工作者，則除非您使用[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) ，否則在重新加載頁面之前，新服務工作者將不會獲得控制[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 。

### 驗證燈塔的變化

再次運行Lighthouse並驗證您的更改。在驗證更改之前，請不要忘記取消選中“脫機”複選框！

__SEO審計___

* __✅好:__ Document有元描述。

__Progressive Web App Audit__

* __✅好:__ 當前頁面在離線時以200響應。
* __✅好:__ `start_url`在離線時以200響應。
* __✅好:__ 註冊一個控制頁面和`start_url.`的服務工作者
* __✅好:__ Web應用程序清單符合可安裝性要求。
* __✅好:__ 已配置為自定義初始屏幕。
* __✅好:__ 設置地址欄主題顏色。

## 提供完整的離線體驗

花點時間將手機置於飛行模式，然後嘗試運行一些您喜歡的應用程序。幾乎在所有情況下，它們都提供了相當強大的離線體驗。用戶希望他們的應用程序具有強大的體驗網絡應該沒有什麼不同。漸進式Web應用程序應設計為脫機作為核心方案。

Key Point: 設計離線優先可以通過減少應用程序發出的網絡請求數量來大幅提高Web應用程序的性能，而不是預先緩存資源並直接從本地緩存提供資源。即使使用最快的網絡連接，從本地緩存提供的服務也會更快！

### 服務工作者生命週期

服務人員的生命週期是最複雜的部分。如果你不知道它想要做什麼以及有什麼好處，它可能會覺得它在和你作鬥爭。但是一旦你知道它是如何工作的，你就可以為用戶提供無縫，不顯眼的更新，混合最好的網絡和本機模式。

Key Point: 此代碼框僅涵蓋服務工作者生命週期的基礎知識。要深入了解，請參閱有關WebFundamentals的[The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)文章。

#### `install`事件

服務工作者獲得的第一個事件是`install` 。它會在工作程序執行時立即觸發，並且每個服務工作程序只調用一次。 __如果您更改了服務工作者腳本，瀏覽器會將其視為不同的服務工作者___，並且它將獲得自己的`install`事件。

![72ed77b1720512da.png](img/72ed77b1720512da.png)

通常， `install`事件用於緩存應用程序運行所需的所有內容。

#### `activate`事件

服務工作者每次啟動時都會收到`activate`事件。 `activate`事件的主要目的是配置服務工作者的行為，清除以前運行中遺留的任何資源（例如舊緩存），並讓服務工作者準備好處理網絡請求（例如下面描述的`fetch`事件）。

#### `fetch`事件

fetch事件允許服務工作者攔截任何網絡請求並處理請求。它可以進入網絡獲取資源，它可以從自己的緩存中提取資源，生成自定義響應或任意數量的不同選項。查看[Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)了解您可以使用的不同策略。

#### 更新服務工作者

瀏覽器會檢查每個頁面加載時是否有新版本的服務工作者。如果找到新版本，則會下載新版本並在後台安裝，但不會激活。它處於等待狀態，直到不再打開任何使用舊服務工作者的頁面。一旦關閉了使用舊服務工作者的所有窗口，新的服務工作者就會被激活並可以控制。有關更多詳細信息，請參閱Service Worker Lifecycle doc的[Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates)部分。

### 選擇正確的緩存策略

選擇正確的[caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/)取決於您嘗試緩存的資源類型以及以後可能需要的資源。對於我們的天氣應用程序，我們將需要緩存的資源分為兩類:我們想要預先緩存的資源以及我們將在運行時緩存的數據。

#### 緩存靜態資源

預先緩存資源與用戶安裝桌面或移動應用程序時的情況類似。應用程序運行所需的關鍵資源已安裝或緩存在設備上，以便以後可以加載它們是否存在網絡連接。

對於我們的應用程序，我們將在安裝服務工作者時預先緩存所有靜態資源，以便我們運行應用程序所需的一切都存儲在用戶的設備上。為了確保我們的應用程序快速加載，我們將使用[cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)策略;而不是去網絡獲取資源，而是從本地緩存中取出;只有當它不可用時，我們才會嘗試從網絡中獲取它。

![44860840e2090bd8.png](img/44860840e2090bd8.png)

從本地緩存中拉出可消除任何網絡可變性。無論用戶使用何種網絡（WiFi，5G，3G甚至2G），我們需要運行的關鍵資源幾乎可以立即使用。

Caution: 在此示例中，使用[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)策略提供靜態資源，這會導致在不諮詢網絡的情況下返回任何緩存內容的副本。雖然`cache-first`策略易於實施，但它可能會在未來帶來挑戰。

#### 緩存應用數據

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)是理想的某些類型的數據，適用於我們的應用程序。它盡可能快地在屏幕上獲取數據，然後在網絡返回最新數據後進行更新。 Stale-while-revalidate意味著我們需要啟動兩個異步請求，一個到緩存，一個到網絡。

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

在正常情況下，緩存數據幾乎會立即返回，為應用程序提供可以使用的最新數據。然後，當網絡請求返回時，將使用來自網絡的最新數據更新應用程序。

對於我們的應用程序，這提供了比網絡更好的體驗，回退到緩存策略，因為用戶不必等到網絡請求超時才能在屏幕上看到某些內容。他們最初可能會看到較舊的數據，但一旦網絡請求返回，應用程序將使用最新數據進行更新。

### 更新應用程序邏輯

如前所述，應用程序需要啟動兩個異步請求，一個到緩存，一個到網絡。該應用程序使用`caches`可用對象`window`訪問緩存和檢索最新數據。這是漸進增強的一個很好的例子，因為`caches`對象可能並非在所有瀏覽器中都可用，如果不是，網絡請求仍然可以工作。

更新`getForecastFromCache()`函數，檢查`caches`像是否在全局`window`對`caches`中可用，如果是，請從緩存中請求數據。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

然後，我們需要修改[`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196)以便它進行兩次調用，一次調用`getForecastFromNetwork()`以從網絡獲取預測，另一次`getForecastFromCache()`以獲取最新的緩存預測:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

我們的天氣應用程序現在發出兩個異步數據請求，一個來自緩存，另一個來自`fetch` 。如果緩存中有數據，它將被非常快速地返回和渲染（數十毫秒）。然後，當`fetch`響應時，將使用直接來自天氣API的最新數據更新卡。

請注意緩存請求和`fetch`請求如何以更新預測卡的調用結束。應用程序如何知道它是否顯示最新數據？這在`renderForecast()`的以下代碼中處理:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

每次更新卡時，應用程序都會將數據的時間戳存儲在卡上的隱藏屬性中。如果卡上已存在的時間戳比傳遞給函數的數據更新，則應用程序就會失效。

### 預先緩存我們的應用資源

在服務工作者中，讓我們添加一個`DATA_CACHE_NAME`以便我們可以將應用程序數據與app shell分開。更新應用程序外殼並清除舊緩存後，我們的數據將保持不變，為超快速加載做好準備。請記住，如果您的數據格式將來發生變化，您需要一種方法來處理這種情況，並確保應用程序外殼和內容保持同步。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

別忘了也更新`CACHE_NAME` ;我們也將改變我們所有的靜態資源。

為了使我們的應用程序脫機工作，我們需要預先緩存它所需的所有資源。這也有助於我們的表現。該應用程序無需從網絡獲取所有資源，而是可以從本地緩存加載所有資源，從而消除任何網絡不穩定性。

使用文件列表更新`FILES_TO_CACHE`數組:

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

由於我們手動生成要緩存的文件列表，因此每次更新文件時__必須更新`CACHE_NAME` __。我們能夠從緩存文件列表中刪除`offline.html` ，因為我們的應用程序現在具有離線工作所需的所有必要資源，並且不會再次顯示脫機頁面。

Caution: 在此示例中，我們手動推出了自己的服務工作者。每次我們更新任何靜態資源時，我們都需要重新刷新服務工作者並更新緩存，否則將提供舊內容。此外，當一個文件更改時，整個緩存無效並需要重新下載。這意味著修復一個簡單的單字符拼寫錯誤將使緩存無效並要求再次下載所有內容 - 效率不高。 [Workbox](/web/tools/workbox/)優雅地處理它，通過將其集成到您的構建過程中，只更新已更改的文件，為用戶節省帶寬並為您更輕鬆地進行維護！

#### 更新activate事件處理程序

為了確保我們`activate`事件不小心刪除我們的數據，在`activate`事件`service-worker.js` ，更換`if (key !== CACHE_NAME) {`有:

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### 更新fetch事件處理程序

我們需要修改服務工作者以攔截對weather API的請求並將其響應存儲在緩存中，以便我們以後可以輕鬆訪問它們。在陳舊的重新驗證策略中，我們期望網絡響應成為“事實來源”，始終向我們提供最新信息。如果不能，則可以失敗，因為我們已經在應用程序中檢索了最新的緩存數據。

更新`fetch`事件處理程序以獨立於其他請求處理對數據API的請求。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

該代碼攔截請求並檢查它是否用於天氣預報。如果是，請使用`fetch`發出請求。返迴響應後，打開緩存，克隆響應，將其存儲在緩存中，然後將響應返回給原始請求者。

我們需要刪除`evt.request.mode !== 'navigate'`檢查，因為我們希望我們的服務工作者處理所有請求（包括圖像，腳本，CSS文件等），而不僅僅是導航。如果我們離開該簽入，則只從服務工作者緩存中提供HTML，其他所有內容都將從網絡請求。

### 試一試

該應用程序現在應該完全脫機功能。刷新頁面以確保您已安裝最新的服務工作者，然後保存幾個城市並按應用程序上的刷新按鈕以獲取新的天氣數據。

然後轉到DevTools的__Application__面板上的__Cache Storage__窗格。展開該部分，您應該會在左側看到靜態緩存和數據緩存的名稱。打開數據緩存應顯示為每個城市存儲的數據。

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

然後，打開DevTools並切換到Service Workers窗格，選中Offline複選框，然後嘗試重新加載頁面，然後離線並重新加載頁面。

如果你是一個快速的網絡上，並希望看到天氣預報數據是如何更新連接速度慢，設置`FORECAST_DELAY`物業`server.js`到`5000` 。對預測API的所有請求都將延遲5000毫秒。

### 驗證燈塔的變化

再次運行Lighthouse也是一個好主意。

__SEO審計___

* __✅好:__ Document有元描述。

__Progressive Web App Audit__

* __✅好:__ 當前頁面在離線時以200響應。
* __✅好:__  `start_url`在離線時以200響應。
* __✅好:__ 註冊一個控制頁面和`start_url.`的服務工作者
* __✅好:__ Web應用程序清單符合可安裝性要求。
* __✅好:__ 已配置為自定義初始屏幕。
* __✅好:__ 設置地址欄主題顏色。

## 添加安裝經驗

安裝Progressive Web App後，其外觀和行為與所有其他已安裝的應用程序類似。它與其他應用程序啟動時的位置相同。它在沒有地址欄或其他瀏覽器UI的應用程序中運行。與所有其他已安裝的應用程序一樣，它是任務切換器中的頂級應用程序。

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

在Chrome中，可以通過三點上下文菜單安裝漸進式Web應用程序，也可以向用戶提供按鈕或其他UI組件，以提示他們安裝您的應用程序。

Success: 由於Chrome的三點上下文菜單中的安裝體驗有點埋沒，我們建議您在應用程序中提供一些指示以通知用戶您的應用程序可以安裝，並使用安裝按鈕完成安裝過程。

### 審計與燈塔

為了使用戶能夠安裝Progressive Web App，它需要滿足[certain criteria](/web/fundamentals/app-install-banners/#criteria) 。最簡單的方法是使用Lighthouse並確保它符合可安裝的標準。

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

如果您使用此代碼庫，您的PWA應該已經符合這些標準。

Key Point: 對於本節，在DevTools的** Application **面板的** Service Workers **窗格中啟用** Bypass for network **複選框。選中後，請求將繞過服務工作者並直接發送到網絡。這簡化了我們的開發過程，因為我們在完成本節時不必更新我們的服務工作者。

### 將install.js添加到index.html

首先，讓我們將`install.js`添加到`index.html`文件中。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### 收聽`beforeinstallprompt`活動

如果符合添加到主屏幕[criteria](/web/fundamentals/app-install-banners/#criteria) ，Chrome將觸發`beforeinstallprompt`事件，您可以使用該事件指示您的應用可以“安裝”，然後提示用戶安裝它。添加以下代碼以收聽`beforeinstallprompt`事件:

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### 保存事件並顯示安裝按鈕

在我們的`saveBeforeInstallPromptEvent`函數中，我們將保存對`beforeinstallprompt`事件的引用，以便我們稍後可以在其上調用`prompt()` ，並更新我們的UI以顯示安裝按鈕。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### 顯示提示/隱藏按鈕

當用戶單擊安裝按鈕時，我們需要在保存的`beforeinstallprompt`事件上調用`.prompt()` 。我們還需要隱藏安裝按鈕，因為`.prompt()`只能在每個保存的事件上調用一次。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

調用`.prompt()`將向用戶顯示模式對話框，要求他們將您的應用添加到主屏幕。

### 記錄結果

您可以通過偵聽已保存的`beforeinstallprompt`事件的`userChoice`屬性返回的保證來檢查用戶如何響應安裝對話框。在提示顯示並且用戶已對其作出響應後，promise將返回具有`outcome`屬性的對象。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

關於`userChoice`一個評論， [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) ，不是你所期望的功能。

#### 記錄所有安裝事件

除了您添加的用於安裝應用的任何UI之外，用戶還可以通過其他方法安裝PWA，例如Chrome的三點式菜單。要跟踪這些事件，請偵聽appinstalled事件。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

然後，我們需要更新`logAppInstalled`函數，對於這個代碼庫，我們只使用`console.log` ，但在生產應用程序中，您可能希望將其作為事件記錄在您的分析軟件中。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### 更新服務工作者

不要忘記更新`CACHE_NAME`在`service-worker.js`文件，因為你所做的已緩存文件的更改。在DevTools的“應用程序”面板的“服務工作者”窗格中啟用__Bypass for network__複選框將在開發中工作，但在現實世界中無濟於事。

### 試一試

讓我們看看我們的安裝步驟是如何進行的。為了安全起見，使用DevTools應用程序面板中的__Clear站點數據__按鈕清除所有內容並確保我們重新開始。如果您之前安裝了該應用程序，請務必將其卸載，否則安裝圖標將不會再次顯示。

#### 確認安裝按鈕可見

首先，讓我們驗證我們的安裝圖標是否正確顯示，請務必在桌面和移動設備上試用。

1. 在新的Chrome標籤頁中打開網址。
2. 打開Chrome的三點菜單（地址欄旁邊）。
▢確認您在菜單中看到“*安裝天氣...... *”。
3. 使用右上角的刷新按鈕刷新天氣數據，以確保我們符合[user engagement heuristics](/web/fundamentals/app-install-banners/#criteria) 。
▢確認應用程序標題中顯示安裝圖標。

#### 驗證安裝按鈕是否有效

接下來，讓我們確保一切安裝正確，並正確觸發我們的事件。您可以在桌面設備或移動設備上執行此操作。如果您想在移動設備上進行測試，請確保使用遠程調試，以便查看登錄到控制台的內容。

1. 打開Chrome，然後在新的瀏覽器標籤中，導航到您的Weather PWA。
2. 打開DevTools並切換到“控制台”窗格。
3. 單擊右上角的安裝按鈕。
▢確認安裝按鈕消失▢確認顯示安裝模式對話框。
4. 單擊“取消”。
▢驗證“*用戶解除了A2HS提示*”顯示在控制台輸出中。
▢確認重新出現安裝按鈕。
5. 再次單擊安裝按鈕，然後單擊模式對話框中的安裝按鈕。
▢驗證“*用戶接受A2HS提示*”顯示在控制台輸出中。
▢確認“*已安裝天氣應用程序*”顯示在控制台輸出中。
▢確認天氣應用已添加到您通常會找到應用的位置。
6.啟動Weather PWA。
▢驗證應用程序是作為獨立應用程序打開的，可以在桌面上的應用程序窗口中，也可以在移動設備上全屏顯示。

請注意，如果您從localhost在桌面上運行，則您安裝的PWA可能會顯示地址標題，因為localhost不被視為安全主機。

#### 驗證iOS安裝是否正常

我們還要檢查iOS上的行為。如果您有iOS設備，可以使用它，或者如果您使用的是Mac，請嘗試使用Xcode提供的iOS模擬器。

1. 打開Safari，在新的瀏覽器選項卡中，導航到Weather PWA。
2. 單擊*共享*![8ac92dd483c689d3.png](img/8ac92dd483c689d3.png)按鈕。
3. 向右滾動並單擊*添加到主屏幕*按鈕。 ▢驗證標題，URL和圖標是否正確。
4. 單擊*添加。*▢確認應用程序圖標已添加到主屏幕。
5. 從主屏幕啟動Weather PWA。 ▢確認應用程序全屏啟動。

### 獎勵:檢測您的應用是否從主屏幕啟動

`display-mode`媒體查詢可以根據應用程序的啟動方式應用樣式，或者確定如何使用JavaScript啟動樣式。

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

您還可以檢查`display-mode`在媒體查詢[JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) 。

### 獎勵:卸載您的PWA

請記住，如果已經安裝了應用程序，則`beforeinstallevent`不會觸發，因此在開發期間，您可能需要多次安裝和卸載應用程序，以確保一切正常運行。

#### Android

在Android上，卸載PWA的方式與卸載其他已安裝的應用程序的方式相同。

* 打開應用程序抽屜。
* 向下滾動以查找天氣圖標。
* 將應用程序圖標拖到屏幕頂部。
* 選擇*卸載。*

#### ChromeOS

在ChromeOS上，可以從啟動器搜索框輕鬆卸載PWA。

* 打開發射器。
* 在搜索框中輸入“* Weather *”，您的Weather PWA應出現在搜索結果中。
* 右鍵單擊（按住alt鍵單擊）Weather PWA。
* 點擊*從Chrome中刪除...*

#### macOS和Windows

在Mac和Windows上，必須通過Chrome卸載PWA。

* 在新的瀏覽器標籤中，打開chrome:// apps。
* 右鍵單擊（按住alt鍵單擊）Weather PWA。
* 點擊*從Chrome中刪除...*

## 恭喜

恭喜，您已經成功構建了第一個Progressive Web App！

您添加了一個Web應用程序清單以使其能夠安裝，並且您添加了一個服務工作者以確保您的PWA始終快速且可靠。您學習瞭如何使用DevTools審核應用程序以及它如何幫助您改善用戶體驗。

您現在知道將任何Web應用程序轉換為Progressive Web App所需的關鍵步驟。

### 進一步閱讀

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### 參考文檔

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## 發現了問題，或者有反饋？ {: .hide-from-toc }

今天提交[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)幫助我們改進代碼實驗室。謝謝！

{% include "web/_shared/translation-end.html" %}
