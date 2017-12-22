project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解如何使用 Chrome 和 DevTools 查找影響頁面性能的內存問題，包括內存泄漏、內存膨脹和頻繁的垃圾回收。

{# wf_updated_on:2015-08-03 #}
{# wf_published_on:2015-04-13 #}

# 解決內存問題 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

瞭解如何使用 Chrome 和 DevTools 查找影響頁面性能的內存問題，包括內存泄漏、內存膨脹和頻繁的垃圾回收。




### TL;DR {: .hide-from-toc }
- 使用 Chrome 的任務管理器瞭解您的頁面當前正在使用的內存量。
- 使用 Timeline 記錄可視化一段時間內的內存使用。
- 使用堆快照確定已分離的 DOM 樹（內存泄漏的常見原因）。
- 使用分配時間線記錄瞭解新內存在 JS 堆中的分配時間。


## 概覽

在 [RAIL][RAIL] 性能模型的精髓中，您的性能工作的焦點應是用戶。


內存問題至關重要，因爲這些問題經常會被用戶察覺。
用戶可通過以下方式察覺內存問題：


* **頁面的性能隨着時間的延長越來越差。** 這可能是內存泄漏的症狀。
內存泄漏是指，頁面中的錯誤導致頁面隨着時間的延長使用的內存越來越多。
* **頁面的性能一直很糟糕。** 這可能是內存膨脹的症狀。
內存膨脹是指，頁面爲達到最佳速度而使用的內存比本應使用的內存多。
* **頁面出現延遲或者經常暫停。** 這可能是頻繁垃圾回收的症狀。
垃圾回收是指瀏覽器收回內存。
瀏覽器決定何時進行垃圾回收。
  回收期間，所有腳本執行都將暫停。因此，如果瀏覽器經常進行垃圾回收，腳本執行就會被頻繁暫停。


### 內存膨脹：如何界定“過多”？

內存泄漏很容易確定。如果網站使用的內存越來越多，則說明發生內存泄漏。
但內存膨脹比較難以界定。
什麼情況纔算是“使用過多的內存”？

這裏不存在硬性數字，因爲不同的設備和瀏覽器具有不同的能力。
在高端智能手機上流暢運行的相同頁面在低端智能手機上則可能崩潰。



界定的關鍵是使用 RAIL 模型並以用戶爲中心。瞭解什麼設備在您的用戶中深受歡迎，然後在這些設備上測試您的頁面。如果體驗一直糟糕，則頁面可能超出這些設備的內存能力。


[RAIL]: /web/tools/chrome-devtools/profile/evaluate-performance/rail

## 使用 Chrome 任務管理器實時監視內存使用

使用 Chrome 任務管理器作爲內存問題調查的起點。
任務管理器是一個實時監視器，可以告訴您頁面當前正在使用的內存量。


1. 按 <kbd>Shift</kbd>+<kbd>Esc</kbd> 或者轉到 Chrome 主菜單並選擇 **More tools** > **Task manager**，打開任務管理器。



   ![打開任務管理器](imgs/task-manager.png)


1. 右鍵點擊任務管理器的表格標題並啓用 **JavaScript memory**。


   ![啓用 JavaScript memory](imgs/js-memory.png)


下面兩列可以告訴您與頁面的內存使用有關的不同信息：

* **Memory** 列表示原生內存。DOM 節點存儲在原生內存中。
如果此值正在增大，則說明正在創建 DOM 節點。
* **JavaScript Memory** 列表示 JS 堆。此列包含兩個值。
您感興趣的值是實時數字（括號中的數字）。
實時數字表示您的頁面上的可到達對象正在使用的內存量。
如果此數字在增大，要麼是正在創建新對象，要麼是現有對象正在增長。



<!-- live number reference: https://groups.google.com/d/msg/google-chrome-developer-tools/aTMVGoNM0VY/bLmf3l2CpJ8J -->

## 使用 Timeline 記錄可視化內存泄漏

您也可以使用 Timeline 面板作爲調查的起點。
Timeline 面板可以幫助您直觀瞭解頁面在一段時間內的內存使用情況。


1. 在 DevTools 上打開 **Timeline** 面板。
1. 啓用 **Memory** 複選框。
1. [做記錄][recording]。

提示：一種比較好的做法是使用強制垃圾回收開始和結束記錄。
在記錄時點擊 **Collect garbage** 按鈕 (![強制垃圾回收按鈕][cg]{:.inline}) 可以強制進行垃圾回收。



要顯示 Timeline 內存記錄，請考慮使用下面的代碼：

    var x = [];
    
    function grow() {
      for (var i = 0; i < 10000; i++) {
        document.body.appendChild(document.createElement('div'));
      }
      x.push(new Array(1000000).join('x'));
    }
    
    document.getElementById('grow').addEventListener('click', grow);

每次按代碼中引用的按鈕時，將向文檔正文附加 1 萬個 `div` 節點，並將一個由 100 萬個 `x` 字符組成的字符串推送到 `x` 數組。運行此代碼會生成一個類似於以下屏幕截圖的 Timeline 記錄：


![簡單增長示例][sg]

首先，我們來說明一下用戶界面。**Overview** 窗格中的 **HEAP** 圖表（**NET** 下方）表示 JS 堆。**概覽**窗格下方是**計數器**窗格。從這裏，您可以看到內存使用按 JS 堆 （與 **Overview** 窗格中的 **HEAP** 圖表相同）、文檔、DOM 節點、偵聽器和 GPU 內存細分。停用對應的複選框可以將其在圖表中隱藏。




現在，我們將根據屏幕截圖來分析代碼。如果查看節點計數器（綠色圖表），您會看到它與代碼完全匹配。節點計數以離散步長方式增大。
您可以假定節點計數的每次增大都是對 `grow()` 的一次調用。
JS 堆圖表（藍色圖表）的顯示並不直接。爲了符合最佳做法，第一次下降實際上是一次強制垃圾回收（通過按 **Collect garbage** 按鈕實現）。隨着記錄的進行，您會看到 JS 堆大小高低交錯變化。這種現象是正常的並且在預料之中：每次點擊按鈕，JavaScript 代碼都會創建 DOM 節點，在創建由 100 萬個字符組成的字符串期間，代碼會完成大量工作。這裏的關鍵是，JS 堆在結束時會比開始時大（這裏“開始”是指強制垃圾回收後的時間點）。在實際使用過程中，如果您看到這種 JS 堆大小或節點大小不斷增大的模式，則可能存在內存泄漏。


[recording]: https://developers.google.com/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#make-a-recording

[cg]: imgs/collect-garbage.png

[sg]: imgs/simple-growth.png

[hngd]: https://jsfiddle.net/kaycebasques/tmtbw8ef/

## 使用堆快照發現已分離 DOM 樹的內存泄漏

只有頁面的 DOM 樹或 JavaScript 代碼不再引用 DOM 節點時，DOM 節點纔會被作爲垃圾進行回收。
如果某個節點已從 DOM 樹移除，但某些 JavaScript 仍然引用它，我們稱此節點爲“已分離”。已分離的 DOM 節點是內存泄漏的常見原因。此部分將教您如何使用 DevTools 的堆分析器確定已分離的節點。



下面是一個已分離 DOM 節點的簡單示例。 

    var detachedNodes;
    
    function create() {
      var ul = document.createElement('ul');
      for (var i = 0; i < 10; i++) {
        var li = document.createElement('li');
        ul.appendChild(li);
      }
      detachedTree = ul;
    }
    
    document.getElementById('create').addEventListener('click', create);

點擊代碼中引用的按鈕將創建一個包含 10 個 `li` 子級的 `ul` 節點。
這些節點由代碼引用，但不存在於 DOM 樹中，因此它們已分離。


堆快照是確定已分離節點的一種方式。顧名思義，堆快照可以爲您顯示拍攝快照時內存在您頁面的 JS 對象和 DOM 節點間的分配。



要創建快照，請打開 DevTools 並轉到 **Profiles** 面板，選擇 **Take Heap Snapshot** 單選按鈕，然後按 **Take Snapshot** 按鈕。

 

![Take Heap Snapshot][ths]

快照可能需要一些時間處理和加載。完成後，請從左側面板（名稱爲 **HEAP SNAPSHOTS**）中選擇該快照。
 

在 **Class filter** 文本框中鍵入 `Detached`，搜索已分離的 DOM 樹。


![針對已分離的節點過濾][df]

展開三角符號以調查分離的樹。

![調查分離的樹][ed]

以黃色突出顯示的節點具有 JavaScript 代碼對它們的直接引用。
以紅色突出顯示的節點則沒有直接引用。只有屬於黃色節點的樹時，它們才處於活動狀態。
一般而言，您需要將注意力放在黃色節點上。
修復代碼，使黃色節點處於活動狀態的時間不長於需要的時間，您也需要消除屬於黃色節點樹的紅色節點。



點擊黃色節點對其進行進一步調查。在 **Object** 窗格中，您可以看到與正在引用該節點的代碼相關的更多信息。
例如，在下面的屏幕截圖中，您可以看到 `detachedTree` 變量正在引用該節點。要解決這一特定的內存泄漏，您需要研究使用 `detachedTree` 的代碼並確保在不需要時，此代碼可以移除其對節點的引用。



![調查黃色節點][yn]

[ths]: imgs/take-heap-snapshot.png

[df]: imgs/detached-filter.png

[ed]: imgs/expanded-detached.png

[yn]: imgs/yellow-node.png

## 使用分配時間線確定 JS 堆內存泄漏

分配時間線是您可以用於跟蹤 JS 堆中內存泄漏的另一種工具。
 

要顯示分配時間線，請考慮使用下面的代碼：

    var x = [];

    function grow() {
      x.push(new Array(1000000).join('x'));
    }

    document.getElementById('grow').addEventListener('click', grow);

每次按代碼中引用的按鈕時，都會向 `x` 數組添加一個由 100 萬個字符組成的字符串。


要記錄分配時間線，請打開 DevTools，然後轉到 **Profiles** 面板，選擇 **Record Allocation Timeline** 單選按鈕，按 **Start** 按鈕，執行您懷疑導致內存泄漏的操作。完成後，按 **stop recording** 按鈕 (![stop recording 按鈕][sr]{:.inline})。




 

記錄時，請注意分配時間線上是否顯示任何藍色豎線（如下面的屏幕截圖所示）。
 

![新分配][na]

這些藍色豎線表示新內存分配。新內存分配中可能存在內存泄漏。
您可以在豎線上放大，將 **Constructor** 窗格篩選爲僅顯示在指定時間範圍內分配的對象。

 

![縮放的分配時間線][zat]

展開對象並點擊它的值，可以在 **Object** 窗格中查看其更多詳情。
例如，在下面的屏幕截圖中，通過查看新分配對象的詳細信息，您可以看到它被分配到 `Window` 作用域中的 `x` 變量。



![對象詳情][od]

[sr]: imgs/stop-recording.png

[na]: imgs/new-allocations.png

[zat]: imgs/zoomed-allocation-timeline.png

[od]: imgs/object-details.png

## 按函數調查內存分配 {: #allocation-profile }

使用 **Record Allocation Profiler** 類型可按 JavaScript 函數查看內存分配。


![Record Allocation Profiler](imgs/record-allocation-profile.png)

1. 選擇 **Record Allocation Profiler** 單選按鈕。如果頁面上有一個工作線程，您可以使用 **Start** 按鈕旁的下拉菜單選擇它作爲分析目標。
1. 按 **Start** 按鈕。
1. 在您想調查的頁面上執行操作。
1. 完成所有操作時按 **Stop** 按鈕。



DevTools 按函數顯示內存分配明細。默認視圖爲 **Heavy (Bottom Up)**，將分配了最多內存的函數顯示在最上方。



![分配分析](imgs/allocation-profile.png)

## 發現頻繁的垃圾回收

如果感覺頁面經常暫停，則可能存在垃圾回收問題。
 

您可以使用 Chrome 任務管理器或者 Timeline 內存記錄發現頻繁的垃圾回收。
在任務管理器中，**Memory** 或 **JavaScript Memory** 值頻繁上升和下降表示存在頻繁的垃圾回收。在 Timeline 記錄中，JS 堆或節點計數圖表頻繁上升和下降指示存在頻繁的垃圾回收。


確定問題後，您可以使用分配時間線記錄找出內存正在分配到什麼地方，以及哪些函數導致分配。

 


{# wf_devsite_translation #}
