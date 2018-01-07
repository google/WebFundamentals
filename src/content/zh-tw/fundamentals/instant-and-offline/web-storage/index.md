project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-09-28 #}
{# wf_published_on:2016-09-28 #}

# 網頁存儲概覽 {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

選擇正確的存儲機制對於本地設備存儲和基於雲的服務器存儲都非常重要。
良好的存儲引擎可確保以可靠的方式保存信息，並減少帶寬和提升響應能力。正確的存儲緩存策略是實現離線移動網頁體驗的核心構建基塊。
 

本文爲評估存儲 API 和服務提供簡要的基礎，然後，我們將提供一個比較表格和一些通用的指南。近期，爲方便您更深入地理解選擇的存儲主題，我們計劃增加相關資源。


## 存儲分類

首先，我們瞭解一下分析網絡應用的數據存儲時可以依據的一些標準。
稍後，我們將使用此框架枚舉和評估爲網頁開發者提供的許多存儲選項。


### 數據模型

用於存儲數據單元的模型可確定在內部組織數據的方式，這會影響存儲的易用性、成本和性能以及檢索請求。

 

* **結構化：**在具有預定義字段的表格中存儲數據，與典型的基於 SQL 的數據庫管理系統一樣，非常適用於靈活的動態查詢，其中所有查詢類型可能不是一個可知的先驗。瀏覽器中的 IndexedDB 是結構化數據存儲區的一個突出例子。


* **鍵/值：** 鍵/值數據存儲區和相關的 NoSQL 數據庫讓您可以存儲和檢索按唯一鍵值索引的非結構化的數據。鍵/值數據存儲區與哈希值表格相似，它們都允許在固定時間訪問已編入索引的不透明數據。鍵/值數據存儲區的突出例子包括瀏覽器中的 Cache API 以及服務器上的 Apache Cassandra。


* **字節流：** 這個簡單模型以可變長度、不透明的字節字符串形式存儲數據，將任意形式的內部組織置於應用層。此模型特別適合文件系統和其他按層次結構組織的數據塊。
字節流數據存儲區的突出例子包括文件系統和雲端存儲服務。


### 持久化

網絡應用的存儲方法，可根據使數據持久化的作用域進行分析。


* **會話持久化：**僅在一個網頁會話或瀏覽器標籤處於活動狀態時保留此類別中的數據。
Session Storage API 是採用會話持久化的存儲機制的一個例子。


* **設備持久化：** 在特定設備中跨會話和瀏覽器標籤/窗口保留此類別中的數據。
Cache API 是採用設備持久化的存儲機制的一個例子。


* **全局持久化：**跨會話和設備保留此類別中的數據。
因此，它是最可靠的數據持久化形式。Google 雲端存儲是採用全局持久化的存儲機制的一個例子。


### 瀏覽器支持

開發者應選擇一個最適合他們的問題域的 API；不過，開發者還應考慮到標準化和完全確立的 API 優於自定義或專有界面這一事實，因爲這些 API 往往使用壽命更長並能夠得到更廣泛的支持。開發者還會享有更廣泛的知識庫和更豐富的開發者生態系統。


### 事務處理

通常，它對於是否能以原子方式成功收集相關存儲操作非常重要。
數據庫管理系統在傳統上使用事務處理模型支持此功能，其中可能會將相關更新組合到任意單元。儘管不是始終需要，但在某些問題域，它是一個便捷的功能，並且有時候非常重要。


### 同步/異步

由於存儲或檢索請求會阻止當前活動的線程直到請求已完成，因此，某些存儲 API 是同步的。
這在網頁瀏覽器中是特別沉重的負擔，其中存儲請求會與 UI 共享主線程。出於效率和性能的考慮，將異步存儲 API 作爲首選。


## 比較

在此部分中，我們看一下網頁開發者當前可用的 API，並根據上述標準比較它們的異同。


<table>
  <thead>
    <th>API</th>
    <th>數據模型</th>
    <th>持久化</th>
    <th>瀏覽器支持</th>
    <th>事務處理</th>
    <th>同步/異步</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>字節流</td>
      <td>設備</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>不支持</td>
      <td>異步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>鍵/值</td>
      <td>設備</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>鍵/值</td>
      <td>會話</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookie</a></td>
      <td>結構化</td>
      <td>設備</td>
      <td>100%</td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>結構化</td>
      <td>設備</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>支持</td>
      <td>異步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>鍵/值</td>
      <td>設備</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>不支持</td>
      <td>異步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>混合</td>
      <td>設備</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>支持</td>
      <td>異步</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">cloud storage</a></td>
      <td>字節流</td>
      <td>全局</td>
      <td>100%</td>
      <td>不支持</td>
      <td>兩者皆有</td>
    </tr>
  <tbody>
</table>

如上所述，最好選擇在儘可能多的瀏覽器上受廣泛支持的 API，其可提供異步調用模型，以最大程度提高與 UI 的互操作性。這些條件自然會產生以下技術選擇：


* 對於設備本地鍵/值存儲：使用 Cache API。

* 對於設備本地結構化存儲：使用 IndexedDB。

* 對於全局字節流存儲：使用雲端存儲服務。

這種組合可滿足許多移動網絡應用的基本存儲需求。我們即將發表的一篇文章，在該文章中詳細介紹瞭如何處理常見存儲模式，並隨附代碼示例，敬請期待！



## 調試 Chrome DevTools 中的存儲{: #devtools }

請查看以下文檔，瞭解有關使用 Chrome DevTools 檢查和調試您選擇的網絡存儲 API 的更多信息。
此處未提及 DevTools 中不支持或不適用的 API。


* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

如果您目前使用多個存儲 API，請查看 DevTools 的 Clear Storage 功能。
此功能允許您通過點擊一個按鈕清除多個存儲。
如需瞭解詳細信息，請參閱[清除服務工作線程、存儲、數據庫和緩存](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage)。



## 後續計劃…

現在，我們已介紹了一些考慮存儲機制的相關方法，並比較了目前可用的最常見的 API 和服務的異同，不久，我們將添加更多內容以深入探討一個或多個關注的主題：




* [針對 Progressive Web App 的離線存儲建議](offline-for-pwa)

* 常用存儲模式（即將推出）

* 建議的後端存儲方法（即將推出）

* 深度教程：IndexedDB（即將推出）

* 深度教程：Cache API（即將推出）

* 對常見存儲框架進行分析（即將推出）


{# wf_devsite_translation #}
