project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2014-12-09 #}

# 離線指南 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

使用 AppCache 可爲我們提供支持內容離線工作的幾種模式。
如果這些正是您需要的模式，那麼恭喜您，您贏了 AppCache 彩票大獎（頭獎依然無人認領），剩下的人仍蜷縮在一個角落裏[來回搖晃](http://alistapart.com/article/application-cache-is-a-douchebag)。




對於 [ServiceWorker][sw_primer]，我們放棄了嘗試解決離線問題，併爲開發者提供了靈活組件讓他們自行解決此問題。
您可以通過 ServiceWorker 控制緩存和處理請求的方式。
這意味着您可以創建自己的模式。
我們看一下隔離環境中的幾個可行模式，但在實踐中，您可能會根據網址和上下文以串聯方式使用其中的多個模式。



除非另有說明，目前，所有代碼示例都可以在 Chrome 和 Firefox 中運行。如需有關服務工作線程支持的完整詳情，請參閱[“服務工作線程是否已就緒”?][is_sw_ready]。


對於其中部分模式的運行演示，請查看 [Trained-to-thrill][ttt]，以及展示性能影響的[視頻](https://www.youtube.com/watch?v=px-J9Ghvcx4)。



## 緩存計算機 - 何時存儲資源

您可以通過 [ServiceWorker][sw_primer] 獨立地從緩存處理請求，我們來單獨看一下它們。
首先，應在什麼時候進行緩存？


### 安裝時 - 以依賴項形式 {: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker 爲您提供一個 `install` 事件。您可以使用該事件做好準備，即處理其他事件之前必須完成的操作。
在進行這些操作時，任何以前版本的 ServiceWorker 仍在運行和提供頁面，因此您在此處進行的操作一定不能干擾它們。



**適合於：** CSS、圖像、字體、JS、模板等，基本上囊括了您視爲網站“版本”的靜態內容的任何對象。


如果未能提取上述對象，將使您的網站完全無法運行，對應的本機應用會將這些對象包含在初始下載中。



    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil` 選取一個 promise 以定義安裝時長和安裝是否成功。
如果 promise 拒絕，則安裝被視爲失敗，並捨棄這個 ServiceWorker （如果一個較舊的版本正在運行，它將保持不變）。`caches.open` 和 `cache.addAll` 將返回 promise。如果其中有任一資源獲取失敗，則 `cache.addAll` 調用將拒絕。


在 [trained-to-thrill][ttt] 上，我使用此方法[緩存靜態資源](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3)。



### 安裝時 - 不是以依賴項的形式{: #on-install-not }

<img src="images/cm-on-install-not.png">

與上述相似，但如果緩存失敗，既不會延遲安裝也不會導致安裝失敗。


**適合於：** 不是即刻需要的大型資源，如用於遊戲較高級別的資源。


    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

我們不會將級別 11-20 的 `cache.addAll` promise 傳遞迴 `event.waitUntil`，因此，即使它失敗，遊戲在離線狀態下仍然可用。當然，您必須考慮到可能缺少這些級別的情況，並且如果缺少，則重新嘗試緩存它們。


當級別 11-20 進行下載時，ServiceWorker 可能會終止，因爲它已完成處理事件，意味着它們將不會被緩存。
將來，我們計劃添加一個後臺下載 API 以處理此類情況和較大文件下載，如電影。



### 激活時 {: #on-activate }

<img src="images/cm-on-activate.png">

**適合於：** 清理和遷移。

在新的 ServiceWorker 已安裝並且未使用以前版本的情況下，新 ServiceWorker 將激活，並且您將獲得一個 `activate` 事件。
由於舊版本退出，此時非常適合處理 IndexedDB 中的架構遷移和刪除未使用的緩存。



    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

在激活期間，`fetch` 等其他事件會放置在一個隊列中，因此長時間激活可能會阻止頁面加載。
儘可能讓您的激活簡潔，僅針對舊版本處於活動狀態時無法執行的操作使用它。



在 [trained-to-thrill][ttt] 上，我使用此方法[移除舊緩存](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17)。


### 用戶交互時{: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**適合於：** 如果整個網站無法離線工作，您可以允許用戶選擇他們需要離線可用的內容。
例如，YouTube 上的某個視頻、維基百科上的某篇文章、Flickr 上的某個特定圖庫。


爲用戶提供一個“Read later”或“Save for offline”按鈕。在點擊該按鈕後，從網絡獲取您需要的內容並將其置於緩存中。


    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

[caches API][caches_api] 可通過頁面以及服務工作線程獲取，這意味着您不需要通過服務工作線程向緩存添加內容。




### 網絡響應時 {: #on-network-response }

<img src="images/cm-on-network-response.png">

**適合於：** 頻繁更新諸如用戶收件箱或文章內容等資源。
同時適用於不重要的資源，如頭像，但需要謹慎處理。


如果請求的資源與緩存中的任何資源均不匹配，則從網絡中獲取，將其發送到頁面同時添加到緩存中。


如果您針對一系列網址執行此操作，如頭像，那麼您需要謹慎，不要使源的存儲變得臃腫，如果用戶需要回收磁盤空間，您不會想成爲主要候選對象。請確保將緩存中不再需要的項目刪除。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

爲留出充足的內存使用空間，每次您只能讀取一個響應/請求的正文。
在上面的代碼中，[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone) 用於創建可單獨讀取的額外副本。



在 [trained-to-thrill][ttt] 上，我使用此方法[緩存 Flickr 圖像](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109)。


### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**適合於：** 頻繁更新最新版本並非必需的資源。
頭像屬於此類別。

如果有可用的緩存版本，則使用該版本，但下次會獲取更新。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

這與 HTTP 的 [stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale) 非常相似。


### 推送消息時 {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications) 是基於 ServiceWorker 構建的另一個功能。
該 API 允許喚醒 ServiceWorker 以響應來自操作系統消息傳遞服務的消息。即使用戶沒有爲您的網站打開標籤，也會如此，僅喚醒 ServiceWorker。
您從頁面請求執行此操作的權限，用戶將收到提示。


**適合於：** 與通知相關的內容，如聊天消息、突發新聞或電子郵件。
同時可用於頻繁更改受益於立即同步的內容，如待辦事項更新或日曆更改。
<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

常見的最終結果是出現一個通知，在點按該通知時，打開/聚焦一個相關頁面，但在進行此操作前一定要先更新緩存。

很明顯，用戶在收到推送通知是處於在線狀態，但是，當他們最終與通知交互時可能已經離線，因此，因此，允許離線訪問此內容非常重要。Twitter 本機應用在大多數情況下都是非常好的離線優先例子，但在這點上卻有點問題。



如果沒有網絡連接，Twitter 無法提供與推送消息相關的內容。
不過，點按通知會移除通知，從而使用戶獲取的信息將比點按通知前少。
不要這樣做！

<div style="clear:both;"></div>

在顯示通知之前，以下代碼將更新緩存：

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### 後臺同步時 {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

Dogfood：後臺同步在 Chrome stable 中尚不穩定。

[後臺同步](/web/updates/2015/12/background-sync)是基於 ServiceWorker 構建的另一個功能。它允許您一次性或按（非常具有啓發性的）間隔請求後臺數據同步。
即使用戶沒有爲您的網站打開標籤，也會如此，僅喚醒 ServiceWorker。您從頁面請求執行此操作的權限，用戶將收到提示。


**適合於：** 非緊急更新，特別那些定期進行的更新，每次更新都發送一個推送通知會顯得太頻繁，如社交時間表或新聞文章。



    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## 緩存持久化 {: #cache-persistence }

爲您的源提供特定量的可用空間以執行它需要的操作。該可用空間可在所有源存儲之間共享。
LocalStorage、IndexedDB、Filesystem，當然還有 Caches。


您獲取的空間容量未指定，其因設備和存儲條件而異。
您可以通過以下代碼瞭解您已獲得多少空間容量：

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

不過，與所有瀏覽器存儲一樣，如果設備出現存儲壓力，瀏覽器將隨時捨棄這些空間。
遺憾的是，瀏覽器無法區分您想要不惜任何代價保留的電影和您不太關心的遊戲之間有什麼不同。



爲解決此問題，建議使用 API [`requestPersistent`](https://storage.spec.whatwg.org/){: .external }：


    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

當然，用戶必須授予權限。讓用戶參與此流程非常重要，因爲現在我們可以預期用戶會控制刪除。如果用戶的設備出現存儲壓力，而且清除不重要的數據沒能解決問題，那麼用戶需要憑判斷力決定保留哪些項目以及移除哪些項目。





爲實現此目的，需要操作系統將“持久化”源等同於其存儲使用空間細分中的本機應用，而不是作爲單個項目報告給瀏覽器。




## 提供建議 - 響應請求 {: #serving-suggestions }

無論您緩存多少內容 ServiceWorker 都不會使用緩存，除非您指示它在何時使用緩存以及如何使用。
以下是用於處理請求的幾個模式：


### 僅緩存 {: #cache-only }

<img src="images/ss-cache-only.png">

**適合於：** 您認爲屬於該“版本”網站靜態內容的任何資源。您應在安裝事件中緩存這些資源，以便您可以依靠它們。



    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

…儘管通常您不需要以特殊方式處理此情況，但[緩存、回退到網絡](#cache-falling-back-to-network)涵蓋了此內容。


### 僅網絡 {: #network-only }

<img src="images/ss-network-only.png">

**適合於：** 沒有相應離線資源的對象，如 analytics pings、non-GET 請求。


    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

…儘管通常您不需要以特殊方式處理此情況例，但[緩存、回退到網絡](#cache-falling-back-to-network)涵蓋了此內容。


### 緩存、回退到網絡 {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**適合於：** 如果您以離線優先的方式進行構建，這將是您處理大多數請求的方式。
根據傳入請求而定，其他模式會有例外。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

其針對緩存中的資源爲您提供“僅緩存”行爲，而對於未緩存的資源則提供“僅網絡”行爲（其包含所有 non-GET 請求，因爲它們無法緩存）。



### 緩存和網絡競態 {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**適合於：** 小型資源，可用於改善磁盤訪問緩慢的設備的性能。


在硬盤較舊、具有病毒掃描程序且互聯網連接很快這幾種情形相結合的情況下，從網絡獲取資源比訪問磁盤更快。不過，如果在用戶設備上具有相關內容時訪問網絡會浪費流量，請記住這一點。


    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling.Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### 網絡回退到緩存 {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**適合於：** 快速修復（在該“版本”的網站外部）頻繁更新的資源。
例如，文章、頭像、社交媒體時間表、遊戲排行榜。


這意味着您爲在線用戶提供最新內容，但離線用戶會獲得較舊的緩存版本。
如果網絡請求成功，您可能需要[更新緩存條目](#on-network-response)。


不過，此方法存在缺陷。如果用戶的網絡時斷時續或很慢，他們只有在網絡出現故障後才能獲得已存在於設備上的完全可接受的內容。這需要花很長的時間，並且會導致令人失望的用戶體驗。
請查看下一個模式，[緩存然後訪問網絡](#cache-then-network)，以獲得更好的解決方案。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### 緩存然後訪問網絡{: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**適合於：** 頻繁更新的內容。例如，文章、社交媒體時間表、遊戲排行榜。


這需要頁面進行兩次請求，一次是請求緩存，另一次是請求訪問網絡。
該想法是首先顯示緩存的數據，然後在網絡數據到達時更新頁面。


有時候，當新數據（例如，遊戲排行榜）到達時，您可以只替換當前數據，但是具有較大的內容時將導致數據中斷。從根本上講，不要使用戶正在讀取或交互的內容“消失”。


Twitter 在舊內容上添加新內容，並調整滾動位置，以便用戶不會感覺到間斷。
這是可能的，因爲 Twitter 通常會保持使內容最具線性特性的順序。
我爲 [trained-to-thrill][ttt] 複製了此模式，以儘快獲取屏幕上的內容，但當它出現時仍會顯示最新內容。



**頁面中的代碼：**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**ServiceWorker 中的代碼：**

我們始終訪問網絡並隨時更新緩存。

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });

注：上述代碼在 Chrome 中還不可用，我們還沒有向頁面公開 `fetch` 和 `caches`（[ticket #1](https://code.google.com/p/chromium/issues/detail?id=436770)、[ticket #2](https://code.google.com/p/chromium/issues/detail?id=439389)）。

在 [trained-to-thrill][ttt] 中，我解決了此問題，方法是使用 [XHR 而不是獲取](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3)，濫用 Accept 標頭以通知 ServiceWorker 在哪裏獲取來自（[頁面代碼](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70)、[ServiceWorker 代碼](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61)）的結果。





### 常規回退{: #generic-fallback }

<img src="images/ss-generic-fallback.png">

如果您未能從緩存和/或網絡提供一些資源，您可能需要提供一個常規回退。


**適合於：** 次要圖像，如頭像、失敗的 POST 請求、“Unavailable while offline”頁面。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

您回退到的項目可能是一個[安裝依賴項](#on-install-as-dependency)。

如果您的頁面正在發佈電子郵件，您的 ServiceWorker 可能回退以在 IDB 的發件箱中存儲電子郵件並進行響應，讓用戶知道發送失敗，但數據已成功保存。



### ServiceWorker-side templating {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**適合於：** 無法緩存其服務器響應的頁面。

[在服務器上渲染頁面可提高速度](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)，但這意味着會包括在緩存中沒有意義的狀態數據，例如，“Logged in as…”。如果您的頁面由 ServiceWorker 控制，您可能會轉而選擇請求 JSON 數據和一個模板，並進行渲染。



    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## 總結

您不必選擇上述的某一個方法，您可能會根據請求網址使用其中的多個方法。
例如，[trained-to-thrill][ttt] 使用：


* [在安裝時緩存](#on-install-as-dependency)，適用於靜態 UI 和行爲
* [在網絡進行響應時緩存](#on-network-response)，適用於 Flickr 圖像和數據
* [從緩存獲取、回退到網絡](#cache-falling-back-to-network)，適用於大多數請求
* [從緩存獲取，然後訪問網絡](#cache-then-network)，適用於 Flickr 搜索結果

看看請求，決定要採取的措施：

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

…您將獲得圖片。


### 參考 {: hide-from-toc }
…可愛的圖標：

* [代碼](http://thenounproject.com/term/code/17547/){: .external }，由 buzzyrobot 提供
* [日曆](http://thenounproject.com/term/calendar/4672/){: .external }，由 Scott Lewis 提供
* [網絡](http://thenounproject.com/term/network/12676/){: .external }，由 Ben Rizzo 提供
* [SD](http://thenounproject.com/term/sd-card/6185/)，由 Thomas Le Bas 提供
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external }，由 iconsmind.com 提供
* [垃圾桶](http://thenounproject.com/term/trash/20538/){: .external }，由 trasnik 提供
* [通知](http://thenounproject.com/term/notification/32514/){: .external }，由 @daosme 提供
* [佈局](http://thenounproject.com/term/layout/36872/){: .external }，由 Mister Pixel 提供
* [雲](http://thenounproject.com/term/cloud/2788/){: .external }，由 P.J. Onori 提供

同時感謝 [Jeff Posnick](https://twitter.com/jeffposnick) 在我點擊“publish”之前找出了許多明顯的錯誤。


###  深入閱讀
* [ServiceWorker - 簡介][sw_primer]
* [ServiceWorker 是否已就緒？][is_sw_ready] - 跟蹤主要瀏覽器的實現狀態
* [JavaScript Promises - 簡介](/web/fundamentals/getting-started/primers/promises) -promise 指南


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
