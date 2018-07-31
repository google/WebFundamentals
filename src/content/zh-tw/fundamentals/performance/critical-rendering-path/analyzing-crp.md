project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 您需要瞭解很多常見問題，才可確定並解決關鍵轉譯路徑效能方面的瓶頸。現在就讓我們開始實作之旅，找出常見的效能模式，以便您將網頁最佳化。

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# 分析關鍵轉譯路徑效能 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


您需要瞭解很多常見問題，才可確定並解決關鍵轉譯路徑效能方面的瓶頸。現在就讓我們開始實作之旅，找出常見的效能模式，以便您將網頁最佳化。



最佳化關鍵轉譯路徑的目標是讓瀏覽器儘快繪製網頁：較快的頁面轉譯速度可以提高使用者的參與度、增加網頁瀏覽量並[提高轉換率](http://www.google.com/think/multiscreen/success.html)。因此，透過最佳化要載入的資源和載入順序，我們希望盡量減少訪客注視空白螢幕的時間。

為了更清楚介紹這項過程，我們先從最簡單的情況開始講解，再逐步建構我們的網頁，讓其中包含更多資源、樣式和套用邏輯；在這個過程中，我們還會探討出錯的環節，以及如何針對每種情況最佳化。

最後，在開始之前，我們還要處理一件事...到目前為止，我們一直專注於資源(CSS、JS 或 HTML 檔案) 可進行處理之後，瀏覽器當中所發生的情況，但忽略了從快取或網路中擷取資源的時間。在下一課中，我們將從應用程式的網路連線層面深入研究如何最佳化，但同時 (為了更貼近現實) 也將做出以下假設：

* 到伺服器的網路往返 (傳播延遲) 將花費 100 毫秒
* HTML 文件的伺服器回應時間為 100 毫秒，而其他所有檔案的回應時間都為 10 毫秒

## Hello World 體驗

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

我們將從基本的 HTML 標記和單一圖片開始，沒有 CSS 或 JavaScript，就是這麼簡單。現在，我們在 Chrome DevTools 中開啟網路時間軸，並檢查產生的資源瀑布：

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

不出我們所料，HTML 檔案的下載時間大約為 200 毫秒。注意，藍線的透明部分表示瀏覽器在網路上等待 (也就是尚未收到任何回應位元組) 的時間，而實線部分則顯示收到第一個回應位元組之後完成下載的時間。在上述示例中，HTML 下載量極少 (不足 4K)，因此我們僅需單一往返過程即可擷取整個檔案。因此，擷取 HTML 檔案大約耗時 200 毫秒，其中一半的時間在網路上等待，而另一半的時間則在等待伺服器回應。

HTML 內容準備就緒後，瀏覽器必須剖析位元組、將其轉換為權杖，並建構 DOM 樹狀結構。為方便查看，DevTools 會在底部回報 DOMContentLoaded 事件的時間 (216 毫秒)，該時間也與藍色垂直線相對應。HTML 下載結束和藍色垂直線 (DOMContentLoaded) 之間的間隔是瀏覽器建構 DOM 樹狀結構花費的時間，在此示例中僅為幾毫秒。

最後，我們注意到一個有趣的現象：我們的「趣照」竟然沒有禁止 domContentLoaded 事件！ 由此可知，我們無需等待網頁上的每個資源，即可建構轉譯樹狀結構，甚至是繪製網頁：**快速初次繪製並不需要所有資源**。事實上，就像我們接下來將要說明的，談論關鍵轉譯路徑時，我們通常談論的是 HTML 標記、CSS 和 JavaScript。圖片不會阻止網頁的初次轉譯，儘管如此，我們也應努力確保系統儘快繪製圖片！

不過，系統會禁止圖片上的「load」事件 (也常稱為「onload」)：DevTools 在 335 毫秒時回報了 onload 事件。回想一下，onload 事件代表網頁所需的**所有資源**都已下載並經過處理的時間點，這是瀏覽器的載入旋轉圖示停止旋轉的時間，而資訊瀑布會以紅色垂直線標記這一點。


## 搭配使用 JavaScript 和 CSS

我們的「Hello World 體驗」頁面表面看起來好像非常簡單，但背後需要完成大量的工作才能呈現出這種成效！ 不過在實際使用時，我們還需要 HTML 以外的許多資源：我們可能需要 CSS 樣式表以及一個或多個新增網頁互動性的指令碼。我們將兩者搭配使用，看看會產生什麼結果：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_新增 JavaScript 和 CSS 之前：_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_新增 JavaScript 和 CSS 之後：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM 和 JS" class="center">

新增外部 CSS 和 JavaScript 檔案時，也一併增加了額外兩個向瀑布流發出的請求 (瀏覽器幾乎會同時發出這兩個請求)，目前一切順利。但請注意，**現在 domContentLoaded 事件和 onload 事件之間的時間差縮短許多了。這是怎麼一回事？**

* 與只有 HTML 的示例不同，我們現在還需要擷取並剖析 CSS 檔案以建構 CSSOM，而且我們必須使用 DOM 和 CSSOM 來建構轉譯樹狀結構。
* 我們的網頁上還有一個禁止剖析器的 JavaScript 檔案，因此在系統下載並剖析 CSS 檔案之前，domContentLoaded 事件將會遭到禁止：JavaScript 可能會查詢 CSSOM，因此在執行 JavaScript 之前，我們必須阻止並等待 CSS。

**如果我們使用內嵌指令碼代替外部指令碼會產生什麼結果？**表面上看來，這是一個微不足道的問題，但實際上卻非常棘手。結果證明，即使將指令碼直接內嵌到網頁中，如果要確保瀏覽器得知指令碼的意圖，唯一可靠的方式還是實際執行該指令碼。而且正如我們所瞭解的，在 CSSOM 建構完成之前，我們無法直接內嵌指令碼。總之，內嵌 JavaScript 也會禁止剖析器。

雖然內嵌指令碼會禁止 CSS，但這項操作仍可加快網頁轉譯速度嗎？ 如果上一種情況很棘手，那這個問題會更棘手！ 我們試著實際操作一下，看看會發生什麼事...

_外部 JavaScript：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM 和 JS" class="center">

_內嵌 JavaScript：_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM、CSSOM 和 內嵌 JS" class="center">

我們減少了一個請求，但為什麼 onload 和 domContentLoaded 的時間仍然沒有變化呢？ 我們發現，無論 JavaScript 是內嵌或外部都無關痛癢，因為只要瀏覽器遇到指令碼標記，它就會禁止及等待，直到 CSSOM 建構完成。此外，在我們的第一個示例中，瀏覽器同時下載 CSS 和 JavaScript，而且下載程序幾乎是在同一時間完成。因此，在這個特定實例中，內嵌 JavaScript 程式並沒有太大意義！ 難道我們就陷入僵局，沒辦法加快網頁轉譯速度了嗎？ 實際上，我們還有多個不同的應對策略。

首先回想一下，所有內嵌指令碼都會禁止剖析器，但是對於外部指令碼來說，我們可以新增「async」關鍵字來取消禁止剖析器。讓我們取消內嵌，並嘗試上述方法：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_禁止剖析器的 (外部) JavaScript：_

<img src="images/waterfall-dom-css-js.png" alt="DOM、CSSOM 和 JS" class="center">

_非同步 (外部) JavaScript：_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM、CSSOM 和非同步 JS" class="center">

好多了！ 剖析 HTML 之後，不久即會觸發 domContentLoaded 事件：瀏覽器已得知不要禁止 JavaScript，而且因為沒有其他禁止剖析器的指令碼，CSSOM 建構也可以同步進行了。

此外，我們也可以嘗試另一種方法，也就是同時內嵌 CSS 和 JavaScript：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM、內嵌 CSS 和內嵌 JS" class="center">

Note: _domContentLoaded_ 時間與前一個示例中的時間沒有區別：我們並沒有將 JavaScript 設定為非同步，而是將 CSS 和 JS 同時內嵌到網頁中。雖然我們的 HTML 網頁因此變得更大，但好處是瀏覽器無需等待擷取外部資源，因為每個元素都已納入網頁。

如您所見，即使是非常簡單的網頁，最佳化關鍵轉譯路徑也不是一件輕而易舉的事情：我們需要瞭解不同資源之間的依存關係圖，需要確定哪些資源是「關鍵資源」，而且我們必須在許多的策略中做出選擇，並找出在網頁中新增這些資源的適當方式。這個問題不是一個方案就能解決的，每個網頁都不盡相同，因此您必須按照相似的解決流程，找出最佳策略。

話說回來，讓我們看看能否找出某些常見的效能模式...


## 效能模式

只要使用 HTML 標記就可組成最簡單的可用網頁：沒有 CSS、JavaScript 或其他類型的資源。如要轉譯此網頁，瀏覽器必須發出請求、等待 HTML 文件準備就緒、進行剖析、建構 DOM，最後再顯示在螢幕上：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom.png" alt="Hello world CRP" class="center">

**T<sub>0</sub> 和 T<sub>1</sub> 之間的時間表示網路和伺服器的處理時間。** 在最理想的情況下 (HTML 檔案較小)，我們僅需一個網路往返過程即可擷取整份文件；由於 TCP 傳輸協定的工作方式，較大的檔案可能需要多個往返過程，我們將在以後的課程中深入探討這個主題。**因此，在最理想的情況下，上述網頁具有一個往返過程 (最少) 關鍵轉譯路徑。**

現在，讓我們看看帶有外部 CSS 檔案的相同網頁：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

再重複一下，我們需要一個網路往返過程來擷取 HTML 文件，然後檢索到的標記告知我們還需要 CSS 檔案：這代表瀏覽器必須返回伺服器並取得 CSS，然後才能在螢幕上呈現網頁。**因此，這個網頁最少需要兩個往返過程才能顯示**。請記得，CSS 檔案可能需要多個往返過程，因此重點應放在如何以「最少」時間達成目標。

我們來定義用於描述關鍵轉譯路徑的詞彙：

* **關鍵資源**：可能禁止網頁初次轉譯的資源。
* **關鍵路徑長度**：即往返過程數量，或擷取所有關鍵資源所需的總時間。
* **關鍵位元組**：實現網頁初次轉譯所需的總位元組數，這是所有關鍵資源的傳輸檔案大小總和。
第一個示例的單一 HTML 網頁包含一項關鍵資源 (HTML 文件)，關鍵路徑長度也與 1 個網路往返過程 (假設檔案較小) 相等，而且總關鍵位元組數正好是 HTML 文件本身的傳輸大小。

現在，我們將第一個示例與「HTML + CSS」示例的關鍵路徑特徵稍做比較：

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

* **2** 種關鍵資源
* **2** 個或更多往返過程的最短關鍵路徑長度
* **9** KB 的關鍵位元組

我們必須同時使用 HTML 和 CSS 來建構轉譯樹狀結構，因此 HTML 和 CSS 都是關鍵資源：瀏覽器僅會在取得 HTML 文件之後擷取 CSS，因此關鍵路徑長度最少為兩個往返過程；兩種資源加起來的關鍵位元組總量最多為 9 KB。

現在我們再於組合中新增一個額外的 JavaScript 檔案！

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

我們新增了 app.js (網頁上的外部 JavaScript 資源)，而且據我們目前所瞭解，這是一種剖析器禁止 (即關鍵) 資源。更糟的是，為了執行 JavaScript 檔案，我們還必須禁止並等待 CSSOM。請注意，在「style.css」下載和 CSSOM 建構完成之前，瀏覽器將會暫停。

<img src="images/analysis-dom-css-js.png" alt="DOM、CSSOM 和 JavaScript CRP " class="center">

不過，如果我們實際查看該網頁的「網路瀑布流」，就會發現 CSS 和 JavaScript 請求幾乎會在同一時間發出：瀏覽器獲得 HTML，發現這兩種資源，然後發出兩項請求。因此，上述網頁具有下列關鍵路徑特徵：

* **3** 種關鍵資源
* **2** 個或更多往返過程的最短關鍵路徑長度
* **11** KB 的關鍵位元組

現在，我們擁有三種關鍵資源，關鍵位元組總量為 11 KB，但是我們的關鍵路徑長度仍然是兩個往返過程，因為我們可以同時傳輸 CSS 和 JavaScript！ **瞭解關鍵轉譯路徑的特徵後，表示您將能確定關鍵資源，並瞭解瀏覽器將如何安排擷取時間。** 讓我們繼續分析示例...

與網站開發人員交流之後，我們發現網頁中新增的 JavaScript 不必是禁止指令碼：我們的某些分析和其他程式碼不需要禁止網頁轉譯。瞭解這些要點後，我們就可以在指令碼標記中新增「async」屬性，取消對剖析器的禁止令：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-js-async.png" alt="DOM、CSSOM 和非同步 JavaScript CRP" class="center">

對指令碼採用非同步模式具有以下幾項優勢：

* 指令碼再也不會禁止剖析器，也不再是關鍵轉譯路徑的一部分。
* 因為沒有其他關鍵指令碼，CSS 也不需要阻止 domContentLoaded 事件
* domContentLoaded 事件越早觸發，其他應用程式邏輯就可越早開始執行

因此，我們的最佳化網頁恢復到具有兩種關鍵資源 (HTML 和 CSS)、具有兩個往返過程的最短關鍵路徑長度和 9 KB 的總關鍵位元組數量。

最後，假設只有在列印時才需要用到 CSS 樣式表， 網頁看起來又會如何呢？

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM、非禁止性 CSS 和非同步 JavaScript CRP" class="center">

因為 style.css 資源僅用於列印，因此，瀏覽器不必禁止它即可轉譯網頁。因此，只要 DOM 建構完成，瀏覽器即具備轉譯網頁的足夠資訊！ 所以，這個網頁僅具有一種關鍵資源 (HTML 檔案)，最小關鍵轉譯路徑長度為一個往返過程。



