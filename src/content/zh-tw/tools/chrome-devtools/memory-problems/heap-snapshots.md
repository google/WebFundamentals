project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解如何使用 Chrome DevTools 的堆分析器記錄堆快照以及如何查找內存泄漏。

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-06-08 #}

# 如何記錄堆快照 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

瞭解如何使用 Chrome DevTools 的堆分析器記錄堆快照以及如何查找內存泄漏。

Chrome DevTools 的堆分析器可以按頁面的 JavaScript 對象和相關 DOM 節點顯示內存分配（另請參閱[對象保留樹](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree)）。使用分析器可以拍攝 JS 堆快照、分析內存圖、比較快照以及查找內存泄漏。






## 拍攝快照

在 Profiles 面板上，選擇 **Take Heap Snapshot**，然後點擊 **Start** 或者按 <span class="kbd">Cmd</span> + <span class="kbd">E</span> 或 <span class="kbd">Ctrl</span> + <span class="kbd">E</span>：

![選擇分析類型](imgs/profiling-type.png)

**快照**最初存儲在渲染器進程內存中。當您點擊快照圖標進行查看時，它們將根據要求傳輸到 DevTools 中。


在快照加載到 DevTools 中並解析後，快照名稱下方將出現一個數字，顯示[可到達 JavaScript 對象](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)的總大小：



![可到達對象的總大小](imgs/total-size.png)

注：只有可到達對象纔會包含到快照中。此外，拍攝快照始終從垃圾回收開始。

## 清除快照

按 Clear all profiles 圖標可以（同時從 DevTools 和渲染器內存）移除快照：

![移除快照](imgs/remove-snapshots.png)

關閉 DevTools 窗口不會從渲染器內存中刪除配置文件。重新打開 DevTools 時，之前拍攝的所有快照都會重新顯示在快照列表中。

<p class="note"><strong>示例：</strong>查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">離散對象</a>示例，並使用堆分析器對其進行分析。您應看到多個（對象）項目分配。</p>

## 查看快照

從不同角度查看不同任務的快照。

**Summary 視圖**可以顯示按構造函數名稱分組的對象。使用此視圖可以根據按構造函數名稱分組的類型深入瞭解對象（及其內存使用）。此視圖特別適用於[跟蹤 DOM 泄漏](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks)。


**Comparison 視圖**可以顯示兩個快照之間的不同。使用此視圖可以比較兩個（或多個）內存快照在某個操作前後的差異。檢查已釋放內存的變化和參考計數讓您可以確認是否存在內存泄漏及其原因。

**Containment 視圖**允許您探索堆內容。此視圖提供了一種更好的對象結構視圖，有助於分析全局命名空間 (window) 中引用的對象以找出是什麼讓它們始終如影隨形。使用此視圖可以分析閉包以及在較低級別深入瞭解您的對象。

**Dominators 視圖**可以顯示[支配樹](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)，並且對於查找聚集點非常有用。此視圖有助於確認對對象的意外引用已消失，以及刪除/垃圾回收正在運行。




要在視圖間切換，請使用視圖底部的選擇器：

![切換視圖選擇器](imgs/switch-views.png)

注：並不是所有屬性都存儲在 JavaScript 堆上。不會捕捉使用執行原生代碼的 getter 實現的屬性。另外，也不會捕捉數字等非字符串值。

### Summary 視圖

快照最初會在 Summary 視圖下打開並顯示對象概覽，可以將此視圖展開以顯示實例：

![Summary 視圖](imgs/summary-view.png)

頂級條目爲“概覽”行。這些行顯示：

* **Constructor** 表示使用此構造函數創建的所有對象。
* **對象實例數**顯示在 # 列中。
* **Shallow Size** 列顯示通過特定構造函數創建的所有對象淺層大小的總和。淺層大小是指對象自身佔用的內存大小（一般來說，數組和字符串的淺層大小比較大）。另請參閱[對象大小](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)。
* **Retained Size** 列顯示同一組對象中最大的保留大小。某個對象刪除後（其依賴項不再可到達）可以釋放的內存大小稱爲保留大小。另請參閱[對象大小](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes)。
* **Distance** 顯示使用節點最短簡單路徑時距根節點的距離。

在上面的視圖中展開一個概覽行後，將顯示其所有實例。對於每一個實例，其淺層大小和保留大小將顯示在相應的列中。@ 字符後面的數字是對象的唯一 ID，您可以使用此 ID 以對象爲基礎比較堆快照。

請注意，黃色對象具有 JavaScript 引用，紅色對象則是引用自具有黃色背景的對象的已分離節點。

**各個構造函數（組）條目在堆分析器中與什麼對應？**

![構造函數組](imgs/function Object() { [native code] }-groups.jpg)

* **（全局屬性）**– 全局對象（例如“window”）與其引用的對象之前的中間對象。如果對象使用構造函數 Person 創建且由某個全局對象佔用，那麼保留路徑將類似於 [global] >（全局屬性）> Person。這與常規相反，常規情況下對象直接引用彼此。我們出於性能原因而採用中間對象。全局項會定期修改，而屬性訪問優化則非常適合不適用於全局項的非全局對象。

* **（根）**– 保留樹中的根條目是引用選定對象的條目。這些條目也可能是引擎出於其自身目的創建的引用。引擎具有引用對象的緩存，但所有此類引用非常弱，並且如果沒有很強的引用，無法阻止對象被回收。

* **（閉包）**– 通過函數閉包對一組對象的引用計數

* **（array、string、number、regexp）** – 不同對象類型的列表，這些類型具有引用 Array、String、Number 或正則表達式的屬性。

* **（已編譯代碼）**– 簡單地說就是與已編譯代碼相關的任何內容。腳本與函數類似，但對應於 &lt;script&gt; 正文。SharedFunctionInfo (SFI) 是位於函數與已編譯代碼之間的對象。函數通常具有上下文，而 SFI 則沒有。

* **HTMLDivElement**、**HTMLAnchorElement**、**DocumentFragment**等 – 引用元素或者您的代碼所引用特定類型的文本對象。


<p class="note"><strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">演示頁面</a>，瞭解如何使用 Summary 視圖。</p>

### Comparison 視圖

通過相互比較多個快照，查找泄漏的對象。要驗證某個特定的應用操作不會引起泄漏（例如，通常來說，一對直接和反向操作（比如打開一個文檔然後將其關閉）不應泄漏任何垃圾），您可以按照下面的情形操作：

1. 在執行任何操作前拍攝一個堆快照。
2. 執行操作（以一種您認爲會引起泄漏的方式與頁面交互）。
3. 執行反向操作（執行反向交互並重復幾次）。
4. 拍攝第二個堆快照，然後將其視圖更改爲 Comparison，並與快照 1 進行比較。

在 Comparison 視圖中，將顯示兩個快照之間的不同。展開概覽條目時，將顯示已添加和刪除的對象實例：

![Comparison 視圖](imgs/comparison-view.png)

<p class="note"><strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">演示頁面</a>，瞭解如何使用快照比較檢測泄漏。</p>

### Containment 視圖

Containment 視圖基本上是您應用的對象結構的“俯瞰視圖”。利用此視圖，您可以深入瞭解函數閉包、觀察共同組成您的 JavaScript 對象的 VM 內部對象，以及從一個非常低的級別瞭解您的應用使用的內存量。

此視圖提供了多個入口點：

* **DOMWindow 對象**是被視爲 JavaScript 代碼“全局”對象的對象。
* **GC 根**是 VM 的垃圾使用的實際 GC 根。GC 根可以由內置對象映射、符號表、VM 線程堆棧、編譯緩存、句柄作用域和全局句柄組成。
* **原生對象**是“推送”至 JavaScript 虛擬機內以允許自動化的瀏覽器對象，例如 DOM 節點和 CSS 規則。

![Containment 視圖](imgs/containment-view.png)

<p class="note">
  <strong>示例：</strong>查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">演示頁面</a>，瞭解如何使用此視圖探索閉包和事件處理程序。</p>


<strong>閉包提示</strong>

閉包有助於爲函數命名，讓您可以輕鬆地在快照中區分不同的閉包。例如，下面的示例未使用已命名的函數：


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

而下面的示例則使用了已命名的函數：


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![爲函數命名以區分閉包](imgs/domleaks.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">爲什麼 eval 是魔鬼</a>示例，分析閉包對內存的影響。您可能還想深入研究此示例，瞭解如何記錄<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">堆分配</a>。</p>


### Dominators 視圖

[Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) 視圖可以顯示堆圖的支配樹。此視圖類似於 Containment 視圖，但缺少屬性名稱。這是因爲對象的支配項可能缺少對它的直接引用；支配樹不是堆圖的生成樹。但它仍然非常有用，可以幫助我們快速確定內存聚集點。






<p class="note"><strong>注：</strong>在 Chrome Canary 中，可以通過轉到 Settings > Show advanced heap snapshot properties 然後重啓 DevTools 的方式啓用 Dominators 視圖。</p>

![Dominators 視圖](imgs/dominators-view.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">演示</a>，瞭解如何查找聚集點。深入研究此示例，瞭解<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">保留路徑和支配項</a>。</p>


## 查詢顏色編碼

對象的屬性和屬性值具有不同的類型，並採用相應的顏色進行編碼。
每個屬性都具有以下四種類型之一：

* **a: property** - 具有名稱的正則屬性，可以通過 .（點）運算符或者 [ ]（方括號）標記訪問，例如 ["foo bar"]；
* **0: element** - 具有數字索引的正則屬性，可以通過 [ ]（方括號）標記訪問；
* **a: context var** - 函數上下文中的變量，可以通過其名稱從函數閉包內訪問；
* **a: system prop** - 由 JavaScript VM 添加的屬性，無法從 JavaScript 代碼訪問。

被指定爲 `System ` 的對象沒有對應的 JavaScript 類型。這些對象是 JavaScript VM 的對象系統實現的一部分。V8 會將相同堆中的大多數內部對象分配爲用戶的 JS 對象。因此，這些對象只是 v8 內部項。

## 查找特定對象

要在回收的堆中查找某個對象，您可以使用 <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> 搜索並提供對象 ID。

## 發現 DOM 泄漏

堆分析器可以反映瀏覽器原生對象（DOM 節點、CSS 規則）與 JavaScript 對象之間的雙向依賴關係。這樣有助於發現由被遺忘的已分離 DOM 子樹引起的不可見泄漏。




DOM 泄漏可能比您想象的要大。思考下面的示例 - 什麼時候發生 #tree GC？



      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` 可以維持對其父級 (parentNode) 的引用，並以遞歸方式返回 `#tree`，因此，只有 leafRef 被作廢後，`#tree` 下的整個樹纔會成爲 GC 的候選。



![DOM 子樹](imgs/treegc.png)

<p class="note">
    <strong>示例：</strong>
    查看此<a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">泄漏的 DOM 節點</a>示例，瞭解 DOM 節點的什麼地方可能出現泄漏以及如何檢測泄漏。您還可以查看這個 <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">DOM 泄漏超出預期</a>示例，繼續深入研究。</p>


要詳細瞭解 DOM 泄漏和內存分析基礎知識，請參閱 Gonzalo Ruiz de Villa 編寫的[使用 Chrome DevTools 查找和調試內存泄漏](http://slid.es/gruizdevilla/memory)。


<p class="note">
    <strong>示例</strong>：
    查看此<a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">演示</a>，瞭解已分離的 DOM 樹。</p>





{# wf_devsite_translation #}
