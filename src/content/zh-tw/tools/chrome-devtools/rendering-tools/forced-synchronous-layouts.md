project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:請遵循此互動指南，瞭解如何使用 DevTools 診斷強制同步佈局。

{# wf_updated_on: 2016-03-31 #}
{# wf_published_on: 2015-04-13 #}

# 診斷強制同步佈局 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

瞭解如何使用 DevTools 診斷強制同步佈局。


在本指南中，您將學習如何通過確定和解決實時演示中的問題調試[強制同步佈局][fsl]。
演示使用 [`requestAnimationFrame()`][raf] 對圖像進行動畫處理，這是處理基於幀的動畫的推薦方法。不過，動畫中會有大量的卡頓。
您的目標是確定卡頓的原因並解決問題，以便演示以流暢的 60 FPS 運行。
 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## 收集數據

首先，您需要捕獲數據，以便準確瞭解頁面運行時會發生什麼。
 

1. 打開[演示](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html)。
1. 打開 DevTools 的 **Timeline** 面板。
1. 啓用 **JS Profile** 選項。稍後分析火焰圖時，您可以通過此選項準確地查看調用了哪些函數。

1. 點擊頁面上的 **Start** 啓動動畫。
1. 點擊 Timeline 面板上的 **Record** 按鈕啓動 Timeline 記錄。

1. 等待兩秒。
1. 再次點擊 **Record** 按鈕停止記錄。 

完成記錄後，您在 Timeline 面板上應看到如下所示的內容。
 

![卡頓演示的 Timeline 記錄](imgs/demo-recording.png)

## 確定問題

現在，您已獲取數據，可以着手弄清楚它們了。 

您可以在 Timeline 記錄的 **Summary** 窗格中一眼看出瀏覽器在渲染上花費的時間最多。
一般來說，如果您可以[優化頁面佈局操作][layout]，就可以減少花費在渲染上的時間。

 

![Timeline 摘要](imgs/summary.png)

現在，請將注意力轉移到 **Overview** 窗格下方的粉色條形上。
這些表示幀。將鼠標懸停在上面可以查看與幀相關的更多信息。


![長時間幀](imgs/long-frame.png)

完成這些幀需要較長的時間。要使動畫流暢，您需要達到 60 FPS。
 

現在，可以準確地診斷哪裏出錯了。使用您的鼠標，在調用堆棧上[放大][zoom]。
 

![縮放的 Timeline 記錄](imgs/zoom.png)

堆棧的頂端是 `Animation Frame Fired` 事件。只要觸發此事件，就會調用傳遞至 `requestAnimationFrame()` 的函數。在 `Animation Frame Fired` 下方，您會看到 `Function Call`，在它的下方，您會看到 `update`。您可以推斷名爲 `update()` 的方法是 `requestAnimationFrame()` 的回調。
 

Note: 這是您之前啓用 **JS Profile** 選項的作用。
如果停用，您就會看到 `Function Call`，後面是所有紫色小事件（稍後介紹），不包含具體調用了哪些函數的詳情。



現在，請將注意力轉移到 `update` 事件下方的所有紫色小事件上。
許多這些事件的頂部爲紅色。那是警告標誌。
將鼠標懸停在這些事件上方，您會看到 DevTools 在警告您頁面可能會被強制自動重排。
強制自動重排是強制同步佈局的另一種說法。
 

![鼠標指針懸停在 layout 事件上](imgs/layout-hover.png)

現在，可以看一下導致全部強制同步佈局的函數。
點擊其中一個佈局事件可以選擇它。現在，在 Summary 窗格中，您會看到與此事件有關的詳細信息。
點擊 **Layout Forced** (`update @ forcedsync.html:457`) 下面的鏈接跳轉到函數定義。



![跳轉到函數定義](imgs/jump.png)

現在，您在 **Sources** 面板中應看到函數定義。 

![Sources 面板中的函數定義](imgs/definition.png)

`update()` 函數是 `requestAnimationCallback()` 的回調處理程序。
處理程序會根據每個圖像的 `offsetTop` 值計算其 `left` 屬性。
這將強制瀏覽器立即執行新佈局，以便確保其提供正確的值。在每個動畫幀期間強制佈局是導致頁面上出現動畫卡頓的原因。
 

現在，您已經確定了問題，可以嘗試在 DevTools 中直接解決問題。


[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## 在 DevTools 中應用修復

此腳本內已嵌入 HTML，因此，您無法通過 **Sources** 面板對其進行編輯（不過，可以在 Sources 面板中編輯格式爲 `*.js` 的腳本）。
 

不過，要測試您的更改，可以在 Console 中重新定義函數。從 HTML 文件複製函數定義，並將其粘貼到 DevTools 的 Console 中。刪除使用 `offsetTop` 的語句並取消註釋其下面的語句。
完成後，按 `Enter`。 

![重新定義有問題的函數](imgs/redefinition.png)

重啓動畫。您可以直觀地驗證現在順暢多了。 

## 使用另一個記錄驗證

最好使用另一個記錄來驗證動畫確實比之前更快且性能更好。
 

![優化後的 Timeline 記錄](imgs/after.png)

效果好多了。


{# wf_devsite_translation #}
