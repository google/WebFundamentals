project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 透過 JavaScript，我們可以修改網頁的各個層面，例如內容、樣式以及與使用者互動的行為。但是，JavaScript 也會禁止 DOM 建構，並導致網頁轉譯時間出現延遲。請採用 JavaScript 的非同步功能，藉此消除關鍵轉譯路徑中不必要的 JavaScript，以便提供最佳效能。

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# 使用 JavaScript 新增互動功能 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


透過 JavaScript，我們可以修改網頁的各個方面，例如內容、樣式以及與使用者互動的行為。但是，JavaScript 也會禁止 DOM 建構，並導致網頁轉譯時間出現延遲。請採用 JavaScript 的非同步功能，藉此消除關鍵轉譯路徑中不必要的 JavaScript，以便提供最佳效能。



### TL;DR {: .hide-from-toc }
- JavaScript 可以查詢及修改 DOM 和 CSSOM。
- CSSOM 執行完畢後，JavaScript 才會執行。
- 除非明確聲明 DOM 建構為非同步，否則 JavaScript 會禁止這項程序。


JavaScript 是一種在瀏覽器執行的動態語言，可讓我們修改網頁行為方式的各個層面。透過在 DOM 樹狀結構新增或從中移除元素，我們可以修改網頁內容。我們也可以修改每個元素的 CSSOM 屬性，還可以處理使用者輸入等更多層面。為了實際說明 JavaScript 的功能，我們要用簡單的內嵌指令碼擴充先前的「Hello World」示例：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

* 透過 JavaScript，我們可以存取 DOM，並提取對隱藏的 span 節點的參照資源。該節點可能不會出現在轉譯樹狀結構中，但仍然會在 DOM 中！ 獲得參照資源之後，我們就可以變更其中的文字 (透過 .textContent)，甚至可以將經過計算的顯示樣式屬性從「none」改為「inline」。完成上述所有步驟後，我們的頁面將會顯示「**Hello interactive students!**」。

* 透過 JavaScript，我們還可以為 DOM 新建元素、設計新元素樣式，以及附加或移除新元素。事實上，就技術層面來說，我們的整個頁面可以只是一個大型 JavaScript 檔案。這個檔案可逐一建立元素並定義元素樣式；這種方法雖然可行，但是使用 HTML 和 CSS 要簡單得多。在 JavaScript 函式的第二部分，我們建立了新的 div 元素，接著又設定文字內容、設定樣式，最後再附加到內文中。

<img src="images/device-js-small.png" class="center" alt="網頁預覽">

透過這些操作，我們修改了現有 DOM 節點的內容和 CSS 樣式，並為文件新增了全新的節點。雖然我們的網頁無法贏得任何設計大賞，但是它真實呈現了 JavaScript 賦予我們的強大功能和靈活性。

不過，這背後潛藏的效能問題也值得您留意。JavaScript 為我們提供了許多功能，但是對於頁面轉譯方式和時機也帶來了很多額外的限制。

首先請注意，在上述示例中，我們的內嵌指令碼靠近頁面底部。為什麼呢？ 其實只要試一下就知道了！如果我們將指令碼移到 _span_ 元素的上方，您會發現指令碼將無法運作，並回報無法在文件中找到對任何 _span_ 元素的參照資源，也就是說 _getElementsByTagName('span')_ 會傳回 _null_。這表明一個重要的特性：我們的指令碼會在文件中的確切插入點執行。遇到指令碼標記時，HTML 剖析器會暫停建構 DOM 的流程，並將控制權交給 JavaScript 引擎；等到 JavaScript 引擎執行完畢後，瀏覽器就會從中斷的地方繼續執行並恢復 DOM 建構作業。

換句話說，我們的指令碼區塊找不到網頁後段中的元素，因為這些元素尚未經過處理！ 讓我們再說清楚一點：**執行內嵌指令碼會禁止 DOM 建構作業，也會導致首次轉譯時出現延遲。**

將指令碼導入網頁的另一個隱性特性是：這些指令碼不僅可以讀取及修改 DOM 屬性，還可以讀取及修改 CSSOM 屬性。事實上，這正是我們在將 span 元素的顯示屬性從「none」變更為「inline」時，在示例中所執行的操作。這會產生什麼結果呢？ 現在的情況就好比一場賽跑。

當我們想執行指令碼時，如果瀏覽器尚未完成 CSSOM 的下載及建構操作，結果會如何？ 答案很簡單，但會影響效能：**瀏覽器會將執行指令碼的作業延遲到 CSSOM 下載及建構完成之後；在等待的同時，DOM 建構作業也會遭到禁止！**

總之，JavaScript 在 DOM、CSSOM 和 JavaScript 執行層面導入了牽一髮而動全身的依存關係，因此可能會導致瀏覽器處理網頁，以及在螢幕上呈現網頁的速度大幅延遲：

1. 指令碼在文件中的位置很重要。
2. 在遇到指令碼標記之後，到指令碼執行完畢之前的這段時間，DOM 建構程序將處於暫停狀態。
3. JavaScript 可以查詢及修改 DOM 和 CSSOM。
4. JavaScript 執行作業會延遲到 CSSOM 準備就緒之後。

當我們談到「最佳化關鍵轉譯路徑」時，大部分指的是瞭解及最佳化 HTML、CSS 和 JavaScript 之間的依存關係圖。


## 剖析器禁止與非同步 JavaScript

在預設情況下，JavaScript 執行作業是一種「禁止剖析器」的行為：當瀏覽器遇到文件中的指令碼時，必須暫停 DOM 建構程序，將控制權移交給 JavaScript 執行階段，並在繼續處理 DOM 建構之前執行指令碼。在先前的示例中，我們已經實際瞭解了具有內嵌指令碼的這類操作。事實上，內嵌指令碼一律會禁止剖析器，除非您特意編寫其他程式碼來延後執行。

透過指令碼標記新增的指令碼會如何？ 讓我們以先前的示例做為分析物件，並將程式碼擷取到單獨的檔案中：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full"   adjust_indentation="auto" %}
</pre>

當我們使用 `<script>` 標記代替內嵌 JavaScript 程式碼片段時，執行順序會有所不同嗎？ 當然不會，這些標記是一樣的，因此應該會以相同的方式運作。在這兩個情況中，瀏覽器都必須先暫停，執行完指令碼後，才能處理文件的剩餘部分。**即使是外部 JavaScript 檔案，瀏覽器也必須暫停，並等待系統從硬碟、快取或遠端伺服器中擷取指令碼，這可能會導致關鍵轉譯路徑的延遲時間增加數萬毫秒。**

話雖如此，但好消息是我們有緊急逃生門！ 在預設情況下，所有 JavaScript 都會禁止剖析器，這是因為瀏覽器不知道指令碼想在網頁上執行什麼操作，所以這個瀏覽器必須假定最糟狀況並禁止剖析器。但是，如果我們能夠向瀏覽器發送信號，說明指令碼不必在檔案中的確切參照點執行，這樣又會產生什麼結果呢？ 如此一來，瀏覽器會繼續建構 DOM，並在指令碼準備就緒後 (例如，從快取或遠端伺服器中擷取到檔案之後) 執行指令碼。

我們要如何變出這個小把戲呢？ 很簡單，我們可以將指令碼標記為 _async_：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

將非同步關鍵字新增到指令碼標記中，就是告訴瀏覽器，在等待指令碼準備就緒之前不應禁止 DOM 建構作業，這將可大幅提升效能！
