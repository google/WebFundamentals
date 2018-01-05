project_path: /web/tools/_project.yaml 
book_path: /web/tools/_book.yaml 
description: Workbox的例子。

{# wf_published_on: 2017-10-04 #}
{# wf_updated_on: 2017-11-10 #}
{# wf_blink_components: Blink>ServiceWorker #}

# 概述 {: .page-title }

Workbox是個是一個能讓您的網頁資源儲存在用戶的設備的JavaScript庫和構建工具。您可以考慮使用Workbox如果你需要：

- 讓您的網頁能在離線中正常運作。
- 讓網頁在重複訪問中提高加載性能。您可以使用Workbox，來緩存資源，然後在不需要網絡的情況下，直接從緩存中提供資源。

## Workbox背後的科技

現代離線web應用程序能被實現是因為[**服务工作者(service workers)**](https://developers.google.com/web/fundamentals/getting-started/primers/service-workers)。Service workers是個JavaScript的背景工作者。Service workers可以將您需要的資源儲存，以在離線中使用。

您可以將service worker想像成一個在用戶的設備中背景運行的[代理服務器 ](https://en.wikipedia.org/wiki/Proxy_server)。當您的網頁在請求資源時，service worker就會攔截那個請求，並決定是否將那資源儲存起來，或者直接從網路上下載最新版本的資源。

Workbox將會把資源儲存在**緩存 (Cache)**。Workbox是使用[緩存API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)來**緩存**資源，這是與[HTTP緩存](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)完全不一樣。Workbox使用緩存API的最大原因是緩存API可以在*還沒*被請求的情況下被緩存。HTTP緩存是做不到的，因為HTTP緩存只能緩存已經被請求的資源。預先儲存資源是叫做**预缓存 (Precache)**。 预缓存 HTML文件是Workbox主要可以提高您的網頁的加載性能。因此Workbox可以在不使用網路的情況下，直接從緩存中提供網頁資源。

用來決定某資源是否要從緩存獲取還是從網路下載新的資源的策略是叫做**緩存策略**。不一樣的資源設置不一樣的緩存策略是很正常的。例如：

- 對於不經常更改的照片或其他的資源，您可以從緩存中獲取。
- 如果是用戶社交媒體資料的JSON文件，您或許要在獲取最新的JSON文件時顯示已緩存的內容。

## Workbox解決了什麼問題

簡單來說，Workbox能讓您再不費工夫的情況下創建一個以優化的service worker代碼。

手動設置緩存是個無聊又複雜的工作。Workbox能讓您簡單地創建一個能夠正確地緩存您的網頁的資源的service worker代碼。

如果您需要對不一樣的資源設置不一樣的緩存策略，Workbox也能簡化這個過程。多數的策略可以使用構建時的配置。而其他的您可以從您的自定的service worker代碼中使用`workbox-sw`的核心runtime庫。

Workbox也會智能地管理及更新已被緩存的資源。換句話說，當資源有更動或被更新是，Workshop將會下載被更新的資源；而那些其他沒有被更新的資源，將會被原封不動地不會被下載及更新。 這是非常的妙也對優化非常重要。而另一個方法是當一個資源被更新，無效整個緩存，這將會導致service worker將全部的資源重新下載。

## 如何使用Workbox

將Workbox集成到您的項目中的一般工作流程是：

1. 創建一個配置文件並告訴Workbox那個資源需要被緩存。
2. 在每個部署之前，在您的項目目錄中運行Workbox工具。Workbox將會自動的生成service worker的代碼，這將會用來緩存及更新網頁的資源。

有幾個Workbox工具，每個工具為不同的工作流程而構建：

- `workbox-webpack-plugin`是為 webpack。
- `workbox-build` 是個基於Node的工具，例如Gulp和Grunt。
- `workbox-cli` 是為npm腳本或命令行。

如果您的網頁是比較簡單的，讓Workbox自動產生的service worker是已經足夠了。您可以參考[`generateSW()`](reference-docs/latest/module-workbox-build.html#.generateSW)。

但是如果您的網頁是比較複雜的，您可能需要自己設置一些自定的路由邏輯。在這種情況下，您可以自己編寫您自己的service worker，並將Workbox代碼注入到您的service worker。您的代碼可能將會像是這樣的：

```javascript
importScripts('/path/to/workbox-sw.js'); // 這不是真正的文件名字
const workbox = new WorkboxSW();

// 您自訂的service worker邏輯

workbox.precache([]);
```

通過Workbox運行的代碼後，最終生成的代碼如下所示：

```javascript
importScripts('/path/to/workbox-sw.js'); // 這不是真正的文件名字
const workbox = new WorkboxSW();

// 您自訂的service worker邏輯

workbox.precache([
  {
    "url": "/index.html",
    "revision": "b3e78d93b20c49d0c927050682c99df3"
  },
  {
    "url": "/images/hamburger.svg",
    "revision": "d2cb0dda3e8313b990e8dcf5e25d2d0f"
  },
]);
```

您可以參考[`injectManifest()`](reference-docs/latest/module-workbox-build.html#.injectManifest)。

## 意見

還是不明白什麼是Workbox? 我們希望能聽到您的意見。請在[此文檔的repo開啟新的issue](https://github.com/GoogleChrome/workbox-microsite/issues/new?title=%5BOverview%5D)並告訴我們您的意見。

Translated by {% include "web/_shared/contributors/henrylim.html %}
