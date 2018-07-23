project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:瞭解如何在本地存儲數據以縮短響應時間和改進離線支持。

{# wf_updated_on:2018-07-23 #}
{# wf_published_on:2016-09-29 #}

# Progressive Web App 的離線存儲 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="DevTools 中的 PWA">
  <figcaption>
    <a href="https://pokedex.org" class="external">Pokedex</a>
    Progressive Web App 針對應用狀態和 Pokemon 數據集使用 IndexedDB，而對於網址可尋址的資源則使用 Cache API。
</figcaption>

</figure>

在路上時互聯網連接會變得不穩定或無法上網，這是離線支持和可靠的性能成爲 [Progressive Web App](/web/progressive-web-apps/) 中的常用功能的原因。即使在完美的無線環境中，明智地使用緩存和其他存儲技術也可顯著改善用戶體驗。在此博文中，我們將圍繞 PWA  的離線數據存儲總結一些想法—思考提供*有效的*離線體驗所需的 JSON 負載、圖像和常規靜態數據。




<div class="clearfix"></div>

## 建議：

我們進入正題，首先介紹針對離線存儲數據的建議：


* 對於網址可尋址的資源，使用 [**Cache API**](https://davidwalsh.name/cache)（[服務工作線程](/web/fundamentals/primers/service-worker/)的一部分）。
* 對於所有其他數據，使用 [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)（具有一個 [Promise](/web/fundamentals/getting-started/primers/promises) 包裝器）。


下面介紹基本原理：

上述兩個 API 都是異步的（IndexedDB 基於事件的，而 Cache API 基於 Promise）。
它們也使用[網頁工作線程、窗口和服務工作線程](https://nolanlawson.github.io/html5workertest/)。
IndexedDB 在[每個位置](http://caniuse.com/#feat=indexeddb)都可用。
服務工作線程（和 Cache API）目前在 Chrome、Firefox、Opera 中[可用](https://jakearchibald.github.io/isserviceworkerready/)，並正在針對 Edge 進行開發。IndexedDB 的 Promise 包裝器隱藏了 IndexedDB 庫自帶的一些強大但同時也非常複雜的 machinery（例如，事務處理、架構版本）。IndexedDB 將支持 [observers](https://github.com/WICG/indexed-db-observers)，其讓您可以輕鬆實現標籤之間的同步。



Safari 10 在其最新的技術預覽版中[修復了許多長期存在的 IndexedDB 錯誤](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)。Note: 一些用戶發現 Safari 10 的 IndexedDB 和 PouchDB 存在穩定性問題，並發現其速度有些慢。在對此問題進行更多研究之前，您的情況可能有所不同。請進行測試並提交瀏覽器錯誤，以便 @webkit 工作任意和相關的 OSS 庫作者可以查看。默認情況下，LocalForage、PouchDB、YDN 和 Lovefield 在 Safari 中使用 WebSQL（因爲缺少有效的方法對損壞的 IndexedDB 進行功能測試）。這意味着這些庫無需任何額外操作即可在 Safari 10 中使用（只是不直接使用 IndexedDB）。


對於 PWA，您可以緩存靜態資源，從而使用 Cache API 編寫您的應用 Application Shell（JS/CSS/HTML 文件），並從 IndexedDB 填充離線頁面數據。

針對 IndexedDB 的調試支持目前在 [Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)（Application 標籤）、Opera、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)(Storage Inspector) 和 Safari（請參閱 Storage 標籤）中可用。





## 其他存儲機制是怎樣的？

Web Storage（例如 LocalStorage 和 SessionStorage）是同步的，不支持網頁工作線程，並對大小和類型（僅限字符串）進行限制。
Cookie [具有自身的用途](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)，但它們是同步的，缺少網頁工作線程支持，同時對大小進行限制。WebSQL 不具有廣泛的瀏覽器支持，因此不建議使用它。File System API 在 Chrome 以外的任意瀏覽器上都不受支持。目前正在 [File and Directory Entries API](https://wicg.github.io/entries-api/) 和 [File API](https://w3c.github.io/FileAPI/) 規範中改進 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)，但該 API 還不夠成熟也未完全標準化，因此無法被廣泛採用。






## 我能存儲多少數據？

<table>
  <thead>
    <th>瀏覽器</th>
    <th>限制</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>可用空間 &lt;6%</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>可用空間 &lt;10%</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>&lt;50MB</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>&lt;250MB</td>
    </tr>
  <tbody>
</table>

在 Chrome 和 Opera 中，按照源（而不是 API）進行存儲。這兩個存儲機制都將存儲數據，直到達到瀏覽器[配額](http://www.html5rocks.com/en/tutorials/offline/quota-research/)。應用可以使用 [Quota Management API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota) 檢查它們目前使用了多少配額。
在 Chrome 中，應用最多可使用 6% 的磁盤空間。在 Firefox 中，應用最多可使用 10% 的可用磁盤空間，但在存儲 50MB 數據後將提示用戶進行更多存儲請求。
在 Mobile Safari 中，應用最多可使用 50MB 存儲空間，而 Safari 桌面版不限制存儲空間的使用（並在達到 5MB 後進行提示）。IE10+ 最多可存儲 250MB，並在存儲 10MB 後提示用戶。
PouchDB [跟蹤](https://pouchdb.com/faq.html#data_limits) IDB 存儲行爲。


## 如何瞭解我的應用目前使用了多少存儲空間？

在 Chrome 中，您可以使用 [Quota Management API](https://www.w3.org/TR/quota-api/) 查詢目前使用的存儲空間大小，以及應用可使用多少空間。更新的 [Storage Quota Estimate API](https://www.chromestatus.com/features/5630353511284736) 嘗試通過支持 Promise，讓用戶更容易瞭解源目前使用了多少配額。




## 緩存逐出是如何工作的？

<table>
  <thead>
    <th>瀏覽器</th>
    <th>逐出政策</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>在 Chrome 耗盡空間後採用 LRU 策略</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>在整個磁盤已裝滿時採用 LRU 策略</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>無逐出</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>無逐出</td>
    </tr>
  <tbody>
</table>

根據源的需求爲源提供空間量。此可用空間在所有形式的源存儲（IndexedDB、Cache API、localStorage 等）中共享。提供的空間量未指定，具體容量因設備和存儲條件而異。


如果網絡存儲容量低，則 UA 將清除存儲以提供可用的空間。這會損害離線響應能力，因此，最近更新的[存儲](https://storage.spec.whatwg.org/)規範定義了“持久化”和“盡力而爲”策略，默認策略是“盡力而爲”。“盡力而爲”指的是在不干擾用戶的情況下可以清除存儲，但對於長期和/或關鍵數據而言持久性較差。IndexedDB 和 Cache API 目前都屬於“盡力而爲”類別。

“持久化”存儲在存儲容量低時不會自動清除。用戶需要手動清除此存儲（通過瀏覽器設置）。
Chrome 一直在來源試用版中試驗對[持久化存儲](/web/updates/2016/06/persistent-storage)的支持，最新消息表明將在 [Chrome 55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ) 中發佈對持久化存儲的支持。






## 當前和未來的離線存儲運行

如果您對離線存儲感興趣，則要注意下面取得的成就。


* [Durable Storage](https://storage.spec.whatwg.org/)：防止存儲受 User Agent 的清除政策影響。


* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/)：高級鍵/值數據管理。


* [Promisified IndexedDB](https://github.com/inexorabletash/indexeddb-promises)：爲支持 Promise 的 IndexedDB 版本提供原生支持。



* [IndexedDB Observers](https://github.com/WICG/indexed-db-observers)：原生 IndexedDB observation，無需與數據庫有關的包裝器。


* [Async Cookies API](https://github.com/bsittler/async-cookies-api)：適用於文檔和工作線程的異步 JavaScript cookie API。


* [Quota Management API](https://www.w3.org/TR/quota-api/)：檢查應用/源目前使用了多少配額。


* [writable-files](https://github.com/WICG/writable-files)：允許網站更無縫地與本地文件進行交互。


* [Directory downloads](https://github.com/drufball/directory-download)：允許網站下載不帶 .zip 文件的目錄。


* [File and Directory Entries API](https://wicg.github.io/entries-api/)：支持通過拖放上傳文件和目錄。


* 目前正在擬定對 [Async Cookies API](https://github.com/WICG/async-cookies-api) 的支持以及在作品中使用 polyfill。



* 調試 IndexedDB 目前在 Edge 中不受支持（不過，它可以調試底層 JetDB） —[在此處](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)針對內置支持進行投票。




* 儘管過去我們討論了有關異步 LocalStorage 的[想法](https://github.com/slightlyoff/async-local-storage)，但目前的重點是使 [IndexedDB 2.0](https://w3c.github.io/IndexedDB/) 進展順利。



* [writable-files](https://github.com/WICG/writable-files) 提議可能最終爲我們提供一個更好的標準跟蹤解決方案，從而實現無縫的本地文件交互。



* 對於需要更多持久化存儲的應用，請了解正在進行中的[持久化存儲](https://storage.spec.whatwg.org/)。


離線存儲並沒有多神奇，瞭解底層 API 對您大有幫助，讓您可充分利用我們現在提供的 API。無論您是否願意直接使用這些 API 還是使用一個抽象庫，都需要花些時間熟悉您的選項。




希望本指南將幫助您設計一個離線體驗，讓您的 PWA 大放光彩！✨


### 背景閱讀

* [Offline Storage API 的狀態](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)（作者：Joshua Bell）



* [瀏覽器數據庫比較](http://nolanlawson.github.io/database-comparison/)（作者：Nolan Lawson）


* [IndexedDB、WebSQL、LocalStorage —什麼阻止了 DOM？](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)


* [如何探討數據庫（Pokedex 研究）](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)


* [網絡工作線程和服務工作線程中支持哪些 API？](https://nolanlawson.github.io/html5workertest/)


###實用資源

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)（針對動態/運行時請求的離線緩存）


* [sw-precache](https://github.com/GoogleChrome/sw-precache)（針對靜態資產/Application Shell 的離線預緩存


* Webpack 用戶可以直接使用上面的資源或 [offline-plugin](https://github.com/NekR/offline-plugin)


### 值得關注的 IndexedDB 庫

* [localForage](https://github.com/localForage/localForage)（~8KB、Promise、舊版瀏覽器可以提供良好支持）


* [Dexie](http://dexie.org/)（~16KB、Promises、複雜查詢、次要索引）


* [PouchDB](https://pouchdb.com/)（~45KB （支持[自定義版本](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)）、同步）



* [Lovefield](https://github.com/google/lovefield)（關係型）

* [LokiJS](http://lokijs.org/#/)（內存）

* [ydn-db](https://github.com/yathit/ydn-db)（與 dexie 類似、使用 WebSQL）

**在此我要感謝 Nolan Lawson、Joshua Bell （這篇文章的主要靈感來自於他在 Open Web Storage 方面的工作和 [BlinkOn 演講](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)）、Jake Archibald、Dru Knox 以及之前致力於網絡存儲空間的其他人。**





{# wf_devsite_translation #}
