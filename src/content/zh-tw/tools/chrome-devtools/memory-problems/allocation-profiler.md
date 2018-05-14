project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用分配分析器工具可以查找未正確執行垃圾回收的對象，並繼續保留內存。

{# wf_updated_on:2015-07-08 #}
{# wf_published_on:2015-04-13 #}

# 如何使用分配分析器工具 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}使用分配分析器工具可以查找未正確執行垃圾回收的對象，並繼續保留內存。



## 工具的工作方式

**分配分析器**將[堆分析器](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots)的詳細快照信息與 [Timeline 面板](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)的增量式更新和跟蹤相結合。與這些工具類似，跟蹤對象的堆分配涉及開始記錄，執行一系列操作，然後停止記錄進行分析。






該工具在整個記錄過程中定期（頻率高達每 50 毫秒一次！）拍攝堆快照，並在記錄結束時最後拍攝一次快照。

![分配分析器](imgs/object-tracker.png)

Note: @ 後面的數字是存在於拍攝的多個快照之間的對象 ID。使用此 ID 可以精確比較堆狀態。顯示對象的地址毫無意義，因爲對象在垃圾回收過程中會被移動。

## 啓用分配分析器

要開始使用分配分析器，請執行以下操作：

1. 確保您已安裝最新的 [Chrome Canary](https://www.google.com/intl/en/chrome/browser/canary.html)。
2. 打開 Developer Tools，然後點擊右下方的齒輪圖標。
3. 現在，打開 Profiler 面板，您會看到名爲“Record Heap Allocations”的配置文件

![Record heap allocations 分析器](imgs/record-heap.png)

## 讀取堆分配配置文件

堆分配配置文件會顯示正在創建對象的位置並確定保留路徑。在下面的快照中，頂部的豎線指示在堆中發現新對象的時間。


每條線的高度與最近分配的對象大小對應，豎線的顏色表示這些對象是否仍然顯示在最終的堆快照中。藍色豎線表示在時間線最後對象仍然顯示，灰色豎線表示對象已在時間線期間分配，但曾對其進行過垃圾回收：





![分配分析器快照](imgs/collected.png)

在下面的快照中，操作執行了 10 次。示例程序緩存了五個對象，因此纔有最後五條藍色豎線。最左邊藍色豎線指示潛在問題。



然後，您可以使用上面時間線中的滑塊放大特定快照並查看最近在該點分配的對象：


![放大快照](imgs/sliders.png)

點擊堆中的特定對象會在堆快照的底部顯示其保留樹。檢查對象的保留路徑能夠爲您提供足夠的信息以瞭解對象爲什麼未被回收，您可以進行必要的代碼更改以移除不必要的引用。

## 按函數查看內存分配 {: #allocation-profiler }

您還可以按 JavaScript 函數查看內存分配。如需瞭解詳細信息，請參閱[按函數調查內存分配](index#allocation-profile)。




{# wf_devsite_translation #}
