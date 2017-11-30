project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:利用 Chrome DevTools 提供的工具，您可以修復引發異常的網頁和在 JavaScript 中調試錯誤。

{# wf_updated_on:2015-05-12 #}
{# wf_published_on:2015-04-13 #}

# 異常和錯誤處理 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
利用 Chrome DevTools 提供的工具，您可以修復引發異常的網頁和在 JavaScript 中調試錯誤。

如果您可以瞭解背後的詳細信息，頁面異常和 JavaScript 錯誤會非常有用。在頁面引發異常或腳本產生錯誤時，Console 可以提供具體、可靠的信息來幫助您定位和糾正問題。 

在控制檯中，您可以跟蹤異常和引發異常的執行路徑，顯式或隱式捕捉異常（或忽略它們），甚至設置錯誤處理程序來自動收集和處理異常數據。


### TL;DR {: .hide-from-toc }
- 觸發異常時啓用 Pause on Exceptions 來調試代碼上下文。
- 使用  <code>console.trace</code> 打印當前的 JavaScript 調用堆棧。
- 使用  <code>console.assert()</code> 在您的代碼中放置斷言和引發異常。
- 使用  <code>window.onerror</code> 記錄瀏覽器中發生的錯誤。


## 跟蹤異常

發生錯誤時，請打開 DevTools 控制檯 (`Ctrl+Shift+J` / `Cmd+Option+J`) 查看 JavaScript 錯誤消息。每一條消息都有一個指向文件名的鏈接，文件名帶有您可以導航到文件的行號。


異常示例：
![異常示例](images/track-exceptions-tracking-exceptions.jpg)

### 視圖異常堆疊追蹤

導致錯誤的執行路徑並不總是非常明顯。完整的 JavaScript 調用堆棧在控制檯中會伴隨着異常。展開這些控制檯消息可以查看堆棧框架和導航到代碼中的相應位置：



![異常堆疊追蹤](images/track-exceptions-exception-stack-trace.jpg)

### 出現 JavaScript 異常時暫停

下一次引發異常時，請暫停 JavaScript 執行並檢查其調用堆棧、範圍變量以及您應用的狀態。利用 Scripts 面板底部的三態停止按鈕，您可以在不同的異常處理模式之間切換：![暫停按鈕](images/track-exceptions-pause-gray.png){:.inline}




選擇暫停所有異常或僅暫停未捕捉的異常，您也可以集中忽略異常。

![暫停執行](images/track-exceptions-pause-execution.jpg)

## 打印堆疊追蹤

通過將日誌消息輸出到控制檯可更好地瞭解網頁的行爲。通過包含關聯的堆疊追蹤讓日誌條目的信息更豐富。有多種方式可以實現此目標。

### Error.stack
每個 Error 對象都有一個包含堆疊追蹤的字符串屬性命名的堆棧：

![Error.stack 示例](images/track-exceptions-error-stack.jpg)

### console.trace()

使用可以打印當前 JavaScript 調用跟蹤的 [`console.trace()`](./console-reference#consoletraceobject) 調用設置您的代碼：

![console.trace() 示例](images/track-exceptions-console-trace.jpg)

### console.assert()

通過將帶有錯誤條件的 [`console.assert()`](./console-reference#consoleassertexpression-object) 作爲第一個參數調用，在您的 JavaScript 代碼中放置斷言。當此表達式評估爲 false 時，您將看到一條相應的 Console 記錄：




![console.assert() 示例](images/track-exceptions-console-assert.jpg)

## 如何檢查堆疊追蹤來查找觸發器

我們來看一下如何使用剛剛學習的工具，並找出錯誤的真正原因。下面是一個包含兩個腳本的簡單 HTML 頁面：



![示例代碼](images/track-exceptions-example-code.png)

當用戶點擊頁面時，段落將更改其內部文本，將調用 `lib.js` 提供的 `callLibMethod()` 函數。



此函數會輸出一個 `console.log`，然後調用 `console.slog`，後者不是一種由 Console API 提供的方法。調用應觸發一個錯誤。




在頁面運行的時候點擊頁面時，將觸發下面的錯誤：


![觸發的錯誤](images/track-exceptions-example-error-triggered.png)

點擊箭頭可以展開錯誤消息：

![展開的錯誤消息](images/track-exceptions-example-error-message-expanded.png)

控制檯會告訴您錯誤在 `lib.js` 的第 4 行觸發，此腳本在 `addEventListener` 回調（匿名函數）的 `script.js` 中的第 3 行調用。



這是一個非常簡單的示例，不過，即使最複雜的日誌跟蹤調試也遵循相同的流程。


## 使用 window.onerror 處理運行時異常

Chrome 會公開 `window.onerror` 處理程序函數，每當 JavaScript 代碼執行中發生錯誤時都會調用此函數。當 JavaScript 異常每次在窗口上下文中引發並且未被 try/catch 塊捕捉時，調用此函數時還會調用異常的消息、引發異常的文件的網址、該文件中的行號，三者按照此順序作爲三個參數傳遞。








舉例來說，使用 AJAX POST 調用設置一個錯誤處理程序，用於收集未捕捉異常的相關信息並將其報告回服務器，您會發現這樣非常實用。這樣，您可以記錄用戶瀏覽器中發生的所有錯誤並獲得相關通知。

使用 `window.onerror` 的示例：

![window.onerror 處理程序的示例](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
