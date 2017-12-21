project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:時間線事件模式可以顯示記錄時觸發的所有事件。使用時間線事件參考可以詳細瞭解每一個時間線事件類型。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 時間線事件參考 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

時間線事件模式可以顯示記錄時觸發的所有事件。使用時間線事件參考可以詳細瞭解每一個時間線事件類型。


## 常見的時間線事件屬性

某些詳細信息存在於所有類型的事件中，而一些僅適用於特定的事件類型。本部分列出了不同事件類型的通用屬性。特定於特定事件類型的屬性列在這些事件類型遵循的參考中。

| 屬性   |      顯示時間                                                       |
|----------|:-----------------------------------------------------------------|
|Aggregated time | 對於帶[嵌套事件](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)的事件，每個類別的事件所用的時間。|
| Call Stack | 對於帶[子事件](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)的事件，每個類別的事件所用的時間。|
| CPU time | 記錄的事件所花費的 CPU 時間。|
| Details | 有關事件的其他詳細信息。|
| Duration (at time-stamp) | 事件及其所有子事件完成所需的時間，時間戳是事件發生的時間（相對於記錄開始的時間）。|
| Self time    | 事件（不包括任何子事件）花費的時間。|
| Used Heap Size | 記錄事件時應用使用的內存大小，以及自上次採樣以來已使用堆大小的增減 (+/-) 變化。|

## Loading 事件

本部分列出了屬於加載類別的事件及其屬性。

| 事件 | 說明 |
|-------|:----------|
|Parse HTML| Chrome 執行其 HTML 解析算法。|
|Finish Loading| 網絡請求已完成。|
|Receive Data| 請求的數據已被接收。存在一個或多個 Receive Data 事件。|
|Receive Response| 請求的初始 HTTP 響應。|
|Send Request| 網絡請求已被髮送。|

### Loading 事件屬性

| 屬性 | 說明 |
|-------|:----------|
|Resource| 請求的資源的網址。|
|Preview| 請求的資源的預覽（僅圖像）。|
|Request Method| 用於請求的 HTTP 方法（例如，GET 或 POST）。|
|Status Code| HTTP 響應代碼。|
|MIME Type| 請求的資源的 MIME 類型。|
|Encoded Data Length| 請求的資源的長度（以字節爲單位）。|

## Scripting 事件

本部分列出了屬於腳本類別的事件及其屬性。

| 事件 | 說明 |
|-------|:----------|
|Animation Frame Fired| 預定的動畫幀被觸發，其回調處理程序被調用。|
|Cancel Animation Frame| 預定的動畫幀被取消。|
|GC Event| 發生垃圾回收。|
|DOMContentLoaded| 瀏覽器觸發 [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded)。當頁面的所有 DOM 內容都已加載和解析時，將觸發此事件。|
|Evaluate Script| 腳本已被評估。|
|Event| JavaScript 事件（例如，“mousedown”或“key”）。|
|Function Call| 發生頂級 JavaScript 函數調用（只有瀏覽器進入 JavaScript 引擎時纔會出現）。|
|Install Timer| 已使用 [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) 或 [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) 創建定時器。|
|Request Animation Frame| `requestAnimationFrame()` 調用已預定一個新幀。|
|Remove Timer| 之前創建的定時器已被清除。|
|Time| 一個腳本調用了 [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel)|
|Time End| 一個腳本調用了 [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel)|
|Timer Fired| 使用 `setInterval()` 或 `setTimeout()` 創建的定時器已被觸發。|
|XHR Ready State Change| XMLHTTPRequest 的就緒狀態已發生變化。|
|XHR Load| `XMLHTTPRequest` 已結束加載。|

### Scripting 事件屬性

| 屬性 | 說明 |
|-------|:----------|
|Timer ID| 定時器 ID。|
|Timeout| 定時器指定的超時。|
|Repeats| 指定定時器是否重複的布爾值。|
|Function Call| 已調用一個函數。|

## Rendering 事件

本部分列出了屬於渲染類別的事件及其屬性。

| 事件 | 說明 |
|-------|:----------|
|Invalidate layout| 頁面佈局被 DOM 更改聲明爲無效。|
|Layout| 頁面佈局已被執行。|
|Recalculate style| Chrome 重新計算了元素樣式。|
|Scroll| 嵌套視圖的內容被滾動。|

### Rendering 事件屬性

| 屬性 | 說明 |
|-------|:----------|
|Layout invalidated| 對於 Layout 記錄，導致佈局失效的代碼的堆疊追蹤。|
|Nodes that need layout| 對於 Layout 記錄，被標記爲需要在重新佈局啓動前佈局的節點的數量。正常情況下，這些代碼是被開發者代碼聲明爲無效的代碼，以及向上追溯到重新佈局根目錄的路徑。|
|Layout tree size| 對於佈局記錄，重新佈局根目錄下節點（Chrome 啓動重新佈局的節點）的總數。|
|Layout scope| 可能的值爲“Partial”（重新佈局邊界是 DOM 的一部分）或“Whole document”。|
|Elements affected| 對於 Recalculate 樣式記錄，受樣式重新計算影響的元素的數量。|
|Styles invalidated| 對於 Recalculate 樣式記錄，提供導致樣式失效的代碼的堆疊追蹤。|

## Painting 事件

本部分列出了屬於打印類別的事件及其屬性。

| 事件 | 說明 |
|-------|:----------|
|Composite Layers| Chrome 的渲染引擎合成了圖像層。|
|Image Decode| 一個圖像資源被解碼。|
|Image Resize| 一個圖像的大小相對於其原生尺寸發生了變化。|
|Paint| 合成的圖層被繪製到顯示畫面的一個區域。將鼠標懸停到 Paint 記錄上會突出顯示已被更新的顯示畫面區域。|

### Painting 事件屬性

| 屬性 | 說明 |
|-------|:----------|
|Location| 對於 Paint 事件，繪製矩形的 x 和 y 座標。|
|Dimensions| 對於 Paint 事件，已繪製區域的高度和寬度。|




{# wf_devsite_translation #}
