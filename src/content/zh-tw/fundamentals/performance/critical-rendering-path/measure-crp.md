project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 無法評估就談不上最佳化。幸運的是，Navigation Timing API 提供了所有必備工具來評估關鍵轉譯路徑的每個步驟！

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 使用 Navigation Timing 評估關鍵轉譯路徑 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


無法評估就談不上最佳化。幸運的是，Navigation Timing API 提供了所有必備工具來評估關鍵轉譯路徑的每個步驟！


### TL;DR {: .hide-from-toc }
- Navigation Timing 為評估關鍵轉譯路徑提供了高解析度的時間戳記。
- 瀏覽器發出一系列可採用的事件，藉此捕捉關鍵轉譯路徑的不同階段。


每個有效的效能策略背後絕對少不了準確的評估和檢測。這也就是 Navigation Timing API 所提供的。

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

在上圖中，每一個標籤都對應到瀏覽器針對載入的每個網頁追蹤的高解析度時間戳記。實際上，在這個具體的例子中，我們只顯示了各種不同時間戳記中的一小部分而已。我們現在暫時跳過所有與網路有關的時間戳記，但是在後續的課程中還會詳細介紹。

那麼，這些時間戳記到底有什麼含義呢？

* **domLoading：**這是整個過程開始的時間戳記，瀏覽器開始解析 HTML 文件第一批收到的位元組
  。
* **domInteractive：**標記瀏覽器完成解析並且所有 HTML 和 DOM 都建構完畢的時間點。
* **domContentLoaded：**標記 DOM 準備就緒並且沒有樣式表禁止 JavaScript 執行的時間點，表示我們現在 (大概) 可以開始建構轉譯樹狀結構了。
    * 很多 JavaScript 框架等待這個事件發生後，才會開始執行自己的邏輯。因此，瀏覽器會透過捕捉 _EventStart_ 和 _EventEnd_ 時間戳記，方便我們追蹤執行邏輯所需的時間。
* **domComplete：** 顧名思義，所有的處理程序都已完成，網頁上所有資源 (圖片等) 也下載完成，表示載入旋轉圖示停止旋轉了。
* **loadEvent：**這是每個網頁載入的最後一步，瀏覽器會觸發「onLoad」事件，以便觸發額外的應用程式邏輯。

HTML 規格中指明了每一個事件的具體條件：該在什麼時候觸發、在什麼條件下觸發等等。在我們的課程中，則會將重點放在與關鍵轉譯路徑有關的一些關鍵里程碑：

* **domInteractive** 標記 DOM 準備就緒。
* **domContentLoaded** 通常標記 [DOM 和 CSSOM 都準備就緒]的時間(http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)。
    * 如果沒有禁止剖析器的 JavaScript，_DOMContentLoaded_ 會在 _domInteractive_ 之後立即觸發。
* **domComplete** 標記網頁和所有附屬資源都已經準備就緒的時間。

^

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full"   adjust_indentation="auto" %}
</pre>

上述示例乍看之下可能會令人頭昏眼花，但實際上它確實很簡單。Navigation Timing API 會捕捉所有相關的時間戳記，而我們的程式碼只是等待`onload` 事件觸發，然後計算各個時間戳記之間的間隔。請記得，onLoad 事件會在 domInteractive、domContentLoaded 和 domComplete 之後觸發。
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming 示範">

透過上面的介紹和示例，我們現在知道要追蹤哪些具體的里程碑，以及可用來輸出這些評估結果的簡單功能。注意，除了直接將指標顯示在網頁上，您還可以修改程式碼，將這些指標傳送到分析伺服器上 ([Google Analytics (分析) 可自動完成這項功能](https://support.google.com/analytics/answer/1205784))。這是一種有效監控網頁效能的方法，您可以藉此找出哪些網頁的效能還需要進一步最佳化。



