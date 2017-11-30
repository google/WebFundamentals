project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 的 Timeline 面板可以記錄和分析您的應用在運行時的所有活動。這裏是開始調查應用中可覺察性能問題的最佳位置。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-06-08 #}

# 如何使用 Timeline 工具 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 的 <em>Timeline</em> 面板可以記錄和分析您的應用在運行時的所有活動。
這裏是開始調查應用中可覺察性能問題的最佳位置。



![Timeline 工具](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- 執行 Timeline 記錄，分析頁面加載或用戶交互後發生的每個事件。
- 在 Overview 窗格中查看 FPS、CPU 和網絡請求。
- 點擊火焰圖中的事件以查看與其相關的詳細信息。
- 放大顯示一部分記錄以簡化分析。


## Timeline 面板概覽 {:#timeline-overview}

Timeline 面板包含以下四個窗格：

1. **Controls**。開始記錄，停止記錄和配置記錄期間捕獲的信息。
2. **Overview**。
頁面性能的高級彙總。更多內容請參見下文。
3. **火焰圖**。
CPU 堆疊追蹤的可視化。 

   您可以在**火焰圖**上看到一到三條垂直的虛線。藍線代表 `DOMContentLoaded` 事件。
綠線代表首次繪製的時間。
紅線代表 `load` 事件。

4. **Details**。選擇事件後，此窗格會顯示與該事件有關的更多信息。
未選擇事件時，此窗格會顯示選定時間範圍的相關信息。
 

![帶標註的 Timeline 面板](imgs/timeline-annotated.png)

### Overview 窗格

**Overview** 窗格包含以下三個圖表：

1. **FPS**。每秒幀數。綠色豎線越高，FPS 越高。
FPS 圖表上的紅色塊表示長時間幀，很可能會出現[卡頓][jank]。
2. **CPU**。
CPU 資源。此[面積圖][ac]指示消耗 CPU 資源的事件類型。

3. **NET**。每條彩色橫槓表示一種資源。橫槓越長，檢索資源所需的時間越長。
每個橫槓的淺色部分表示等待時間（從請求資源到第一個字節下載完成的時間）。

深色部分表示傳輸時間（下載第一個和最後一個字節之間的時間）。



   橫槓按照以下方式進行彩色編碼：
   <!-- source: https://goo.gl/eANVFf -->
   
   * HTML 文件爲**<span style="color:hsl(214, 67%, 66%)">藍色</span>**。
   * 腳本爲**<span style="color:hsl(43, 83%, 64%)">黃色</span>**。
   * 樣式表爲**<span style="color:hsl(256, 67%, 70%)">紫色</span>**。
   * 媒體文件爲**<span style="color:hsl(109, 33%, 55%)">綠色</span>**。
   * 其他資源爲**<span style="color:hsl(0, 0%, 70%)">灰色</span>**。


![Overview 窗格，帶標註](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## 做記錄

要記錄*頁面加載*，請打開 **Timeline** 面板，打開想要記錄的頁面，然後重新加載頁面。
**Timeline** 面板會自動記錄頁面重新加載。


要記錄*頁面交互*，請打開 **Timeline** 面板，然後按 **Record** 按鈕 (![Record 按鈕](imgs/record-off.png){:.inline}) 或者鍵入鍵盤快捷鍵 <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows / Linux)，開始記錄。記錄時，**Record** 按鈕會變成紅色。執行頁面交互，然後按 **Record** 按鈕或再次鍵入鍵盤快捷鍵停止記錄。



完成記錄後，DevTools 會猜測哪一部分記錄與您最相關，並自動縮放到那一個部分。


### 記錄提示

* **儘可能保持記錄簡短**。簡短的記錄通常會讓分析更容易。
* **避免不必要的操作**。避免與您想要記錄和分析的活動無關聯的操作（鼠標點擊、網絡加載，等等）。例如，如果您想要記錄點擊 Login 按鈕後發生的事件，請不要滾動頁面、加載圖像，等等。
* **停用瀏覽器緩存**。記錄網絡操作時，最好從 DevTools 的 Settings 面板或 [**Network conditions**][nc] 抽屜式導航欄停用瀏覽器的緩存。
* **停用擴展程序**。Chrome 擴展程序會給應用的 Timeline 記錄增加不相關的噪聲。
以[隱身模式][incognito]打開 Chrome 窗口或者創建新的 [Chrome 用戶個人資料][new chrome profile]，確保您的環境中沒有擴展程序。




[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## 查看記錄詳細信息

在**火焰圖**中選擇事件時，**Details** 窗格會顯示與事件相關的其他信息。


![Details 窗格](imgs/details-pane.png)

一些標籤（如 **Summary**）適用於所有事件類型。其他標籤則僅對特定事件類型可用。
請參閱 [Timeline 事件參考][event reference]，瞭解與每個記錄類型相關的詳細信息。


[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## 在記錄期間捕捉屏幕截圖{:#filmstrip}

**Timeline** 面板可以在頁面加載時捕捉屏幕截圖。此功能稱爲**幻燈片**。


在您開始記錄之前，請在 **Controls** 窗格中啓用 **Screenshots** 複選框，以便捕捉記錄的屏幕截圖。
屏幕截圖顯示在 **Overview** 窗格下方。


![帶幻燈片的 Timeline 記錄](imgs/timeline-filmstrip.png)

將您的鼠標懸停在 **Screenshots** 或 **Overview** 窗格上可以查看記錄中該點的縮放屏幕截圖。
左右移動鼠標可以模擬記錄的動畫。


<video src="animations/hover.mp4" autoplay muted loop controls></video>

## 分析 JavaScript {:#profile-js}

開始記錄前，請啓用 **JS Profile** 複選框，以便在您的時間線記錄中捕捉 JavaScript 堆棧。
啓用 JS 分析器後，您的火焰圖會顯示調用的每個 JavaScript 函數。
 

![啓用 JS 分析的火焰圖](imgs/js-profile.png)

## 分析繪製 {:#profile-painting}

開始記錄前，請啓用 **Paint** 複選框，以便獲取有關 **Paint** 事件的更多數據分析。
啓用繪製分析並點擊 **Paint** 事件後，新 **Paint Profiler** 標籤會出現在 **Details** 窗格中，後者顯示了許多與事件相關的更精細信息。



![paint profiler](imgs/paint-profiler.png)

### 渲染設置 {:#rendering-settings}

打開主 DevTools 菜單，然後選擇**More tools** > **Rendering settings** 訪問渲染設置，這些設置在調試繪製問題時非常有用。渲染設置會作爲一個標籤顯示在 **Console** 抽屜式導航欄（如果隱藏，請按 <kbd>esc</kbd> 顯示抽屜式導航欄）旁邊。




![渲染設置](imgs/rendering-settings.png)

## 搜索記錄

查看事件時，您可能希望側重於一種類型的事件。例如，您可能需要查看每個 `Parse HTML` 事件的詳細信息。
 

在 **Timeline** 處於焦點時，按 <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) 或 <kbd>Ctrl</kbd>+<kbd>F</kbd> (Windows / Linux) 以打開一個查找工具欄。鍵入您想要檢查的事件類型的名稱，如 `Event`。

工具欄僅適用於當前選定的時間範圍。選定時間範圍以外的任何事件都不會包含在結果中。
 

利用上下箭頭，您可以按照時間順序在結果中移動。所以，第一個結果表示選定時間範圍內最早的事件，最後一個結果表示最後的事件。每次按向上或向下箭頭會選擇一個新事件，因此，您可以在 **Details** 窗格中查看其詳細信息。按向上和向下箭頭等同於在**火焰圖**中點擊事件。


![查找工具欄](imgs/find-toolbar.png)

## 在 Timeline 部分上放大 {:#zoom}

您可以放大顯示一部分記錄，以便簡化分析。使用 **Overview** 窗格可以放大顯示一部分記錄。
放大後，**火焰圖**會自動縮放以匹配同一部分。


![放大 Timeline 記錄的一部分](imgs/zoom.png)

要在 Timeline 部分上放大，請執行以下操作：

* 在 **Overview** 窗格中，使用鼠標拖出 Timeline 選擇。
* 在標尺區域調整灰色滑塊。

選擇部分後，可以使用 <kbd>W</kbd>、<kbd>A</kbd>、<kbd>S</kbd> 和 <kbd>D</kbd> 鍵調整您的選擇。
<kbd>W</kbd> 和 <kbd>S</kbd> 分別代表放大和縮小。
<kbd>A</kbd> 和 <kbd>D</kbd> 分別代表左移和右移。


## 保存和打開記錄

您可以在 **Overview** 或**火焰圖**窗格中點擊右鍵並選擇相關選項，保存和打開記錄。


![保存和打開記錄](imgs/save-open.png)


{# wf_devsite_translation #}
