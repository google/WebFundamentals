project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:豐富的離線體驗、定期的後臺同步以及推送通知等通常需要將面向本機應用的功能將引入到網絡應用中。服務工作線程提供了所有這些功能所依賴的技術基礎。

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2016-01-18 #}

# 服務工作線程：簡介 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

豐富的離線體驗、定期的後臺同步以及推送通知等通常需要將面向本機應用的功能將引入到網絡應用中。服務工作線程提供了所有這些功能所依賴的技術基礎。


## 什麼是服務工作線程

服務工作線程是瀏覽器在後臺獨立於網頁運行的腳本，它打開了通向不需要網頁或用戶交互的功能的大門。現在，它們已包括如[推送通知](/web/updates/2015/03/push-notifications-on-the-open-web)和[後臺同步](/web/updates/2015/12/background-sync)等功能。將來，服務工作線程將會支持如定期同步或地理圍欄等其他功能。本教程討論的核心功能是攔截和處理網絡請求，包括通過程序來管理緩存中的響應。



這個 API 之所以令人興奮，是因爲它可以支持離線體驗，讓開發者能夠全面控制這一體驗。



在服務工作線程出現前，存在能夠在網絡上爲用戶提供離線體驗的另一個 API，稱爲 [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }。App Cache 的主要問題是，它具有[相當多的缺陷](http://alistapart.com/article/application-cache-is-a-douchebag)，並且，雖然它對單頁網絡應用支持較好，但對多頁網站來說則不盡人意。服務工作線程則能很好地避免這些常見的難點。


服務工作線程相關注意事項：

* 它是一種 [JavaScript 工作線程](//www.html5rocks.com/en/tutorials/workers/basics/){: .external }，無法直接訪問 DOM。
服務工作線程通過響應 [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 接口發送的消息來與其控制的頁面通信，頁面可在必要時對 DOM 執行操作。
* 服務工作線程是一種可編程網絡代理，讓您能夠控制頁面所發送網絡請求的處理方式。
* 它在不用時會被中止，並在下次有需要時重啓，因此，您不能依賴於服務工作線程的 `onfetch` 和 `onmessage` 處理程序中的全局狀態。如果存在您需要持續保存並在重啓後加以重用的信息，服務工作線程可以訪問 [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)。
* 服務工作線程廣泛地利用了 promise，因此如果您不熟悉 promise，則應停下閱讀此內容，看一看 [Promise 簡介](/web/fundamentals/getting-started/primers/promises)。



## 服務工作線程生命週期

服務工作線程的生命週期完全獨立於網頁。

要爲網站安裝服務工作線程，您需要先在頁面的 JavaScript 中註冊。
註冊服務工作線程將會導致瀏覽器在後臺啓動服務工作線程安裝步驟。


在安裝過程中，您通常需要緩存某些靜態資產。如果所有文件均已成功緩存，那麼服務工作線程就安裝完畢。如果任何文件下載失敗或緩存失敗，那麼安裝步驟將會失敗，服務工作線程就無法激活（也就是說，不會安裝）。
如果發生這種情況，不必擔心，它下次會再試一次。
但這意味着，如果安裝完成，您可以知道您已在緩存中獲得那些靜態資產。


安裝之後，接下來就是激活步驟，這是管理舊緩存的絕佳機會，我們將在服務工作線程的更新部分對此詳加介紹。



激活之後，服務工作線程將會對其作用域內的所有頁面實施控制，不過，首次註冊該服務工作線程的頁面需要再次加載纔會受其控制。服務工作線程實施控制後，它將處於以下兩種狀態之一：服務工作線程終止以節省內存，或處理獲取和消息事件，從頁面發出網絡請求或消息後將會出現後一種狀態。




以下是服務工作線程初始安裝時的簡化生命週期。


![服務工作線程生命週期](imgs/sw-lifecycle.png)


## 先決條件

### 瀏覽器支持

可用的瀏覽器日益增多。服務工作線程受 Firefox 和 Opera 支持。
Microsoft Edge 現在[表示公開支持](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/)。甚至 Safari 也[暗示未來會進行相關開發](https://trac.webkit.org/wiki/FiveYearPlanFall2015)。
您可以在 Jake Archibald 的 [is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/){: .external } 網站上查看所有瀏覽器的支持情況。



###  您需要 HTTPS

在開發過程中，可以通過 `localhost` 使用服務工作線程，但如果要在網站上部署服務工作線程，需要在服務器上設置 HTTPS。


使用服務工作線程，您可以劫持連接、編撰以及過濾響應。
這是一個很強大的工具。您可能會善意地使用這些功能，但中間人可會將其用於不良目的。
爲避免這種情況，可僅在通過 HTTPS 提供的頁面上註冊服務工作線程，如此我們便知道瀏覽器接收的服務工作線程在整個網絡傳輸過程中都沒有被篡改。



[Github 頁面](https://pages.github.com/){: .external } 通過 HTTPS 提供，因此這些頁面是託管演示的絕佳位置。


如果想要向服務器添加 HTTPS，您需要獲得 TLS 證書並在服務器上進行設置。
具體因您的設置而異，因此請查看服務器的文檔，並務必查閱 [Mozilla SSL 配置生成器](https://mozilla.github.io/server-side-tls/ssl-config-generator/)，瞭解最佳做法。




## 註冊服務工作線程

要安裝服務工作線程，您需要通過在頁面中對其進行**註冊**來啓動安裝。
這將告訴瀏覽器服務工作線程 JavaScript 文件的位置。


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

此代碼用於檢查 Service Worker API 是否可用，如果可用，則[在頁面加載後](/web/fundamentals/instant-and-offline/service-worker/registration)註冊位於 `/sw.js` 的服務工作線程。。



每次頁面加載無誤時，即可調用 `register()`；瀏覽器將會判斷服務工作線程是否已註冊並做出相應的處理。



`register()` 方法的精妙之處在於服務工作線程文件的位置。
您會發現在本例中服務工作線程文件位於根網域。
這意味着服務工作線程的作用域將是整個來源。
換句話說，服務工作線程將接收此網域上所有事項的 `fetch` 事件。
如果我們在 `/example/sw.js` 處註冊服務工作線程文件，則服務工作線程將只能看到網址以 `/example/` 開頭（即 `/example/page1/`、`/example/page2/`）的頁面的 `fetch` 事件。



現在，您可以通過轉至 `chrome://inspect
/#service-workers` 並尋找您的網站來檢查服務工作線程是否已啓用。

![檢查服務工作線程](imgs/sw-chrome-inspect.png)

首次實施服務工作線程時，您還可以通過 `chrome://serviceworker-internals`來查看服務工作線程詳情。
如果只是想了解服務工作線程的生命週期，這仍很有用，但是日後其很有可能被 `chrome://inspect/#service-workers` 完全取代。




您會發現，它還可用於測試隱身窗口中的服務工作線程，您可以關閉服務工作線程並重新打開，因爲之前的服務工作線程不會影響新窗口。從隱身窗口創建的任何註冊和緩存在該窗口關閉後均將被清除。



## 安裝服務工作線程

在受控頁面啓動註冊流程後，我們來看看處理 `install` 事件的服務工作線程腳本。


最基本的例子是，您需要爲安裝事件定義回調，並決定想要緩存的文件。


    self.addEventListener('install', function(event) {
      // Perform install steps
    });


在 `install` 回調的內部，我們需要執行以下步驟：

1. 打開緩存。
2. 緩存文件。
3. 確認所有需要的資產是否緩存。

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


在這裏您可以看到，我們以所需的緩存名稱調用 `caches.open()`，之後再調用 `cache.addAll()` 並傳入文件數組。
這是一個 promise 鏈（`caches.open()` 和 `cache.addAll()`）。
`event.waitUntil()` 方法帶有 promise 參數並使用它來判斷安裝所花費的時間以及安裝是否成功。



如果所有文件都成功緩存，則將安裝服務工作線程。
如有**任何**文件無法下載，則安裝步驟將失敗。
這可讓您依賴於所定義的所有資產，但也意味着需要對您決定在安裝步驟緩存的文件列表格外留意。定義一個過長的文件列表將會增加文件緩存失敗的機率，從而導致服務工作線程未能安裝。



這僅是一個示例，實際您可以在 `install` 事件中執行其他任務，或完全避免設置 `install` 事件偵聽器。


## 緩存和返回請求

您已安裝服務工作線程，現在可能會想要返回一個緩存的響應，對吧？


在安裝服務工作線程且用戶轉至其他頁面或刷新當前頁面後，服務工作線程將開始接收 `fetch` 事件。下面提供了一個示例。



    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });


這裏我們定義了 `fetch` 事件，並且在 `event.respondWith()` 中，我們傳入來自 `caches.match()` 的一個 promise。
此方法檢視該請求，並從服務工作線程所創建的任何緩存中查找緩存的結果。


如果發現匹配的響應，則返回緩存的值，否則，將調用 `fetch` 以發出網絡請求，並將從網絡檢索到的任何數據作爲結果返回。這是一個簡單的例子，它使用了在安裝步驟中緩存的所有資產。


如果希望連續緩存新請求，可以通過處理 fetch 請求的響應並將其添加到緩存來實現，如下所示。



    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


執行的操作如下：

1. 在 `fetch` 請求中添加對 `.then()` 的回調。
2. 獲得響應後，執行以下檢查：

   1. 確保響應有效。
   2. 檢查並確保響應的狀態爲 `200`。
   3. 確保響應類型爲 **basic**，亦即由自身發起的請求。
這意味着，對第三方資產的請求不會添加到緩存。
3. 如果通過檢查，則[克隆](https://fetch.spec.whatwg.org/#dom-response-clone)響應。這樣做的原因在於，該響應是 [Stream](https://streams.spec.whatwg.org/){: .external }，因此主體只能使用一次。由於我們想要返回能被瀏覽器使用的響應，並將其傳遞到緩存以供使用，因此需要克隆一份副本。我們將一份發送給瀏覽器，另一份則保留在緩存。



## 更新服務工作線程 {: #update-a-service-worker }

在某個時間點，您的服務工作線程需要更新。
此時，您需要遵循以下步驟：

1. 更新您的服務工作線程 JavaScript 文件。用戶導航至您的站點時，瀏覽器會嘗試在後臺重新下載定義服務工作線程的腳本文件。如果服務工作線程文件與其當前所用文件存在字節差異，則將其視爲“新服務工作線程”。
2. 新服務工作線程將會啓動，且將會觸發 `install` 事件。
3. 此時，舊服務工作線程仍控制着當前頁面，因此新服務工作線程將進入 `waiting` 狀態。
4. 當網站上當前打開的頁面關閉時，舊服務工作線程將會被終止，新服務工作線程將會取得控制權。
5. 新服務工作線程取得控制權後，將會觸發其 `activate` 事件。






出現在 `activate` 回調中的一個常見任務是緩存管理。您希望在 `activate` 回調中執行此任務的原因在於，如果您在安裝步驟中清除了任何舊緩存，則繼續控制所有當前頁面的任何舊服務工作線程將突然無法從緩存中提供文件。





比如說我們有一個名爲 `'my-site-cache-v1'` 的緩存，我們想要將該緩存拆分爲一個頁面緩存和一個博文緩存。這就意味着在安裝步驟中我們創建了兩個緩存：`'pages-cache-v1'` 和 `'blog-posts-cache-v1'`，且在激活步驟中我們要刪除舊的 `'my-site-cache-v1'`。





以下代碼將執行此操作，具體做法爲：遍歷服務工作線程中的所有緩存，並刪除未在緩存白名單中定義的任何緩存。




    self.addEventListener('activate', function(event) {

      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## 瑕疵和問題

這是一項新事物，下面是我們可能會遇到的問題彙總。
希望這些問題很快能消除，不過當前我們需要對這些問題多加留意。



###  如果安裝失敗，我們未必能告知您詳情

如果工作線程註冊後未在 `chrome://inspect/#service-workers` 或 `chrome://serviceworker-internals` 中顯示，則有可能是引發錯誤或向 `event.waitUntil()` 發送被拒絕的 promise 而導致無法安裝。




要解決該問題，請轉至 `chrome://serviceworker-internals` 並選中“Open DevTools window and pause JavaScript execution on service worker startup for debugging”，然後將調試程序語句置於安裝事件開始處。這與<a href="/web/tools/chrome-devtools/javascript/add-breakpoints#exceptions">未捕獲異常中的暫停</a>共同揭露問題。



### fetch() 默認值

#### 默認情況下沒有憑據

使用 `fetch` 時，默認情況下請求中不包含 Cookie 等憑據。
如需憑據，改爲調用：

    fetch(url, {
      credentials: 'include'
    })


這一行爲是有意爲之，可以說比 XHR 更復雜的以下默認行爲更好：如果網址具有相同來源，則默認發送憑據，否則忽略。獲取的行爲更接近於其他 CORS 請求，如 `<img crossorigin>`，它將決不會發送 Cookie，除非您使用 `<img crossorigin="use-credentials">` 選擇加入。



#### 非 CORS 默認失敗

默認情況下，從不支持 CORS 的第三方網址中獲取資源將會失敗。
您可以向請求中添加 `no-CORS` 選項來克服此問題，不過這可能會導致“不透明”的響應，這意味着您無法辨別響應是否成功。



    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### 處理自適應圖像

`srcset` 屬性或 `<picture>` 元素將在運行期間選擇最適當的圖像資產，併發出網絡請求。


對於服務工作線程，如果您想要在安裝過程中緩存圖像，您有下列幾種選擇：


1. 安裝 `<picture>` 元素和 `srcset` 屬性將請求的所有圖像。
2. 安裝一個低分辨率版本的圖像。
3. 安裝一個高分辨率版本的圖像。


實際上，您應該選擇 2 或 3，因爲下載所有圖像會浪費存儲空間。


假定您在安裝期間選擇安裝低分辨率版本的圖像，在頁面加載時您想要嘗試從網絡中檢索高分辨率的圖像，但是如果檢索高分辨率版本失敗，則回退到低分辨率版本。這沒有問題，而且這種做法很好，但是有另外一個問題。


如果我們有以下兩張圖像：

| 屏幕密度 | 寬度 | 高度 |
| -------------- | ----- | ------ |
|1x             | 400   | 400    |
| 2x             | 800   | 800    |

在 `srcset` 圖像中，我們有一些像這樣的標記：


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


如果我們使用的是 2x 顯示屏，瀏覽器將會選擇下載 `image-2x.png`。如果我們處於離線狀態，您可以對請求執行 `.catch()` 並返回 `image-src.png`（如已緩存）。但是，瀏覽器會期望 2x 屏幕上的圖像有額外的像素，這樣圖像將顯示爲 200x200 CSS 像素而不是 400x400 CSS 像素。解決該問題的唯一辦法是設定固定的圖像高度和寬度。



    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


對於要用於藝術指導的 `<picture>` 元素，這會變得相當困難，而且很大程度上取決於圖像的創建和使用方式，但是您可以使用類似於 srcset 的方法。



## 瞭解詳情

如需瞭解詳情，位於 [https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html) 的服務工作線程文檔列表會很有用。



## 獲取幫助

如果遇到問題，請在 Stack Overflow 上發佈您的問題並使用 “[service-worker](http://stackoverflow.com/questions/tagged/service-worker)” 標記，以便我們可跟蹤這些問題並儘可能地提供幫助。




{# wf_devsite_translation #}
