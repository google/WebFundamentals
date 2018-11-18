project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:確定服務工作線程註冊時間的最佳做法。

{# wf_updated_on:2016-11-28 #}
{# wf_published_on:2016-11-28 #}

# 服務工作線程註冊 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[服務工作線程](/web/fundamentals/getting-started/primers/service-workers)可有效加快重複訪問網絡應用的速度，但您應採取措施確保服務工作線程的初始安裝不會惡化用戶的首次訪問體驗。





一般情況下，延遲服務工作線程[註冊](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)直至初始頁面完成加載可爲用戶（特別是網絡連接較慢的移動設備用戶）提供最佳體驗。




## 通用註冊樣板文件

如果您曾閱讀有關服務工作線程的內容，您可能會看到與以下內容實質相似的樣板文件：


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

上述內容有時會附帶幾個 `console.log()` 語句，或包含[代碼](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)（其檢測是否對以前的服務工作線程註冊進行了更新），以此通知用戶刷新頁面。但對於標準的幾行代碼而言，這些只是細微變化。


那麼，`navigator.serviceWorker.register` 是否有任何細微差別？是否有任何可以遵循的最佳做法？
毫無意外（考慮到本文還未完結），對這兩個問題的回答都是“有”。


## 用戶的首次訪問

我們考慮一下用戶首次訪問網絡應用。此時還沒有服務工作線程，瀏覽器無法提前知道最終是否會安裝一個服務工作線程。



作爲開發者，您的首要任務應該是確保瀏覽器快速獲取顯示交互頁面所需的最低限度的關鍵資源集。拖慢檢索這些響應速度的任何資源都不利於實現快速的交互體驗。


現在，想象一下，在下載頁面需要渲染的 JavaScript 或圖像的進程中，您的瀏覽器決定啓動一個後臺線程或進程（爲簡單起見，我們假設啓動一個線程）。假定您使用的不是較大的臺式機，而是性能不足的手機，世界上很多人都將手機作爲主要設備。啓動這個額外的線程將加劇對 CPU 時間和內存的爭用，從而影響瀏覽器渲染交互網頁。



空閒的後臺線程不太可能有重大意義。但是，如果該線程不處於空閒狀態，而是決定也將開始從網絡下載資源，那該怎麼辦？比起對 CPU 或內存的任何顧慮，我們更應該擔心許多移動設備可用的有限帶寬。帶寬非常寶貴，因此，不要同時下載次要資源，這樣會影響關鍵資源的下載。


所有這些都說明，在後臺啓動一個新的服務工作線程下載和緩存資源，違背了爲用戶首次訪問網站提供最快交互體驗的目標。




## 改進樣板文件

解決方案是通過選擇調用 `navigator.serviceWorker.register()` 的時間來控制服務工作線程的啓動。
一個簡單的經驗法則是延遲註冊，直到 <code>[load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>在  <code>window</code> 上觸發，如下所示：

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

但是啓動服務工作線程註冊的適當時間還取決於您的網絡應用在加載後將做什麼。
例如，[Google I/O 2016 網絡應用](https://events.google.com/io2016/)在過渡到主屏幕前先顯示一個簡短的動畫。我們的團隊[發現](/web/showcase/2016/iowa2016)，在顯示動畫期間啓動服務工作線程註冊會導致低端移動設備出現卡頓。當瀏覽器很有可能出現幾秒的空閒狀態時，我們可以[延遲](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)服務工作線程註冊直到動畫顯示完畢，而不是爲用戶提供糟糕的體驗。




同樣，如果您的網絡應用使用在頁面加載後執行額外設置的框架，則查看一個框架特定的事件，其表明該工作何時完成。



## 後續訪問

到目前爲止，我們一直在關注首次訪問體驗，但延遲服務工作線程註冊對重複訪問您的網站會有什麼影響嗎？儘管這讓一些人出乎意料，但應該不會有任何影響。



在註冊服務工作線程後，它將完成 `install` 和 `activate` [生命週期事件](/web/fundamentals/instant-and-offline/service-worker/lifecycle)。在激活服務工作線程後，它可以處理 `fetch` 事件以對網絡應用進行任意後續訪問。根據服務工作線程的作用域，它將在請求任意頁面*之前*啓動，如果您仔細想一下，就會明白這非常有道理。如果在訪問頁面之前，現有服務工作線程還沒有運行，那麼，它將沒有機會針對導航請求履行 `fetch` 事件。



因此，如果有活動的服務工作線程，那麼，何時調用 `navigator.serviceWorker.register()`，或事實上*無論您是否調用它*都無關緊要。除非您更改服務工作線程腳本的網址，否則 `navigator.serviceWorker.register()` 在後續訪問期間實際上是一個 [no-op](https://en.wikipedia.org/wiki/NOP)。因此，何時調用它都無關禁用。


## 儘早註冊的原因

是否存在最好儘快註冊服務工作線程的任何場景？
我想到一個這樣的場景，當服務工作線程在首次訪問期間使用 <code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>控制頁面時，服務工作線程積極執行其  <code>fetch</code> 處理程序內部的[運行時緩存](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)。在此情況下，最好是儘快激活服務工作線程，以設法使用稍後可能會用到的資源填充其運行時緩存。如果您的網絡應用屬於此類別，則考慮回退，以確保服務工作線程的  <code>install</code> 處理程序不會請求與主頁面的請求爭用帶寬的資源。




## 進行測試

模擬首次訪問的一個絕佳方法是在 [Chrome 隱身窗口](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)中打開您的網絡應用並查看 [Chrome 的 DevTools](/web/tools/chrome-devtools/) 中的網絡流量。作爲網頁開發者，您每天可能會多次重新加載您的網絡應用的某個本地實例。但是，如果在已有服務工作線程且已完全填充緩存的情況下重新訪問您的網站，那麼，您不會獲得與新用戶相同的體驗，從而容易忽略潛在的問題。



以下示例描述了註冊時間不同可能產生的差異。
在隱身模式下使用網絡節流訪問一個[示例應用](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)時截取了兩個屏幕截圖，以模擬緩慢的網速。



![儘早註冊時的網絡流量。](../images/early-registration.png
"Network traffic with early registration.")

上面的屏幕截圖反映了修改示例以儘快執行服務工作線程註冊時的網絡流量。
您可以看到預緩存請求（旁邊帶有[齒輪圖標](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)的條目，源自服務工作線程的 `install` 處理程序）與針對顯示頁面所需的其他資源的請求分散排列。





![延遲註冊時的網絡流量。](../images/late-registration.png
"Network traffic with late registration.")


在上面的屏幕截圖中，延遲服務工作線程註冊直到頁面已加載。
您會看到在從網絡獲取所有資源之前預緩存請求不會啓動，因此不會出現任何爭用帶寬的情況。此外，由於我們預緩存的某些項目已存在於瀏覽器的 HTTP 緩存中 — Size 列中帶有 `(from disk cache)` 的項目，因此，我們可以填充服務工作線程的緩存，而無需再次訪問網絡。




如果您在真實的移動網絡上從真實的低端設備運行這種測試，那就更好了。
您可以利用 Chrome 的[遠程調試功能](/web/tools/chrome-devtools/remote-debugging/)將一部 Android 手機通過 USB 連接到臺式機，並確保您運行的測試切實反映了許多用戶的真實體驗。





##  結論

總結一下，確保用戶具有最佳的首次訪問體驗應成爲重中之重。
在初始訪問期間延遲服務工作線程註冊直到頁面已加載，可幫助確保這一點。
您仍可獲得具有服務工作線程進行重複訪問的所有優勢。


爲確保延遲服務工作線程的初始註冊直到第一個頁面已加載，一個簡單的方法是使用以下代碼：


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
