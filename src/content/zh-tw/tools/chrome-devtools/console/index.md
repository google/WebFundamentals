project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:瞭解如何導航 Chrome DevTools JavaScript 控制檯。

{# wf_updated_on:2016-02-01 #}
{# wf_published_on:2015-05-10 #}

# 使用控制檯 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

瞭解如何：打開 DevTools 控制檯；堆疊冗餘消息或將其顯示在各自的行上；清除或保留輸出，或者將其保存到文件中；過濾輸出，以及訪問其他控制檯設置。




### TL;DR {: .hide-from-toc }
- 以專用面板或任何其他面板旁的抽屜式導航欄的形式打開控制檯。
- 堆疊冗餘消息，或者將其顯示在各自的行上。
- 清除或保留頁面之間的輸出，或者將其保存到文件中。
- 按嚴重性等級、通過隱藏網絡消息或者按正則表達式模式對輸出進行過濾。

## 打開控制檯

以全屏模式的專用面板形式訪問控制檯：

![Console 面板](images/console-panel.png)

或以任何其他面板旁的抽屜式導航欄的形式：

![Console 抽屜式導航欄](images/console-drawer.png)

### 以面板形式打開

要打開專用的 **Console** 面板，請執行以下操作之一：

* 按 <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows / Linux) 或者 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd> (Mac)。
* 如果 DevTools 已打開，則按 **Console** 按鈕。

打開 Console 面板時，Console 抽屜式導航欄將自動摺疊。

### 以抽屜式導航欄形式打開

要以任何其他面板旁的抽屜式導航欄的形式打開控制檯，請執行以下操作之一：

* 在 DevTools 處於聚焦狀態時按 <kbd>Esc</kbd>。
* 按 **Customize and control DevTools** 按鈕，然後按 **Show console**。


![顯示控制檯](images/show-console.png)

## 消息堆疊

如果一條消息連續重複，而不是在新行上輸出每一個消息實例，控制檯將“堆疊”消息並在左側外邊距顯示一個數字。此數字表示該消息已重複的次數。


![消息堆疊](images/message-stacking.png)

如果您傾向於爲每一個日誌使用一個獨特的行條目，請在 DevTools 設置中啓用 **Show timestamps**。


![顯示時間戳](images/show-timestamps.png)

由於每一條消息的時間戳均不同，因此，每一條消息都將顯示在各自的行上。


![帶時間戳的控制檯](images/timestamped-console.png)

## 處理控制檯歷史記錄

### 清除歷史記錄{: #clearing}

您可以通過以下方式清除控制檯歷史記錄：

* 在控制檯中點擊右鍵，然後按 **Clear console**。
* 在控制檯中鍵入 `clear()`。
* 從您的 JavaScript 代碼內調用 `console.clear()`。
* 按 <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd> （Mac、Windows、Linux）。


### 保留歷史記錄{: #preserve-log}

啓用控制檯頂部的 **Preserve log** 複選框可以在頁面刷新或更改之間保留控制檯歷史記錄。
消息將一直存儲，直至您清除控制檯或者關閉標籤。


### 保存歷史記錄

在控制檯中點擊右鍵，然後選擇 **Save as**，將控制檯的輸出保存到日誌文件中。


![將控制檯的輸出保存到日誌文件](images/console-save-as.png)

## 選擇執行環境{: #execution-context }

以下屏幕截圖中以藍色突出顯示的下拉菜單稱爲 **Execution Context Selector**。


![Execution Context Selector](images/execution-context-selector.png)

通常，您會看到此環境設置爲 `top`（頁面的頂部框架）。

其他框架和擴展程序在其自身的環境中運行。要使用這些其他環境，您需要從下拉菜單中選中它們。
例如，如果您要查看 `<iframe>` 元素的日誌輸出，並修改該環境中存在的某個變量，您需要從 Execution Context Selector 下拉菜單中選中該元素。




控制檯默認設置爲 `top` 環境，除非您通過檢查其他環境中的某個元素來訪問 DevTools。
例如，如果您檢查 `<iframe>` 中的一個 `<p>` 元素，那麼，DevTools 將 Execution Context Selector 設置爲該 `<iframe>` 的環境。



當您在 `top` 以外的環境中操作時，DevTools 將 Execution Context Selector 突出顯示爲紅色，如下面的屏幕截圖中所示。
這是因爲開發者很少需要在 `top` 以外的任意環境中操作。
輸入一個變量，期待返回一個值，只是爲了查看該變量是否爲 `undefined`（因爲該變量是在不同環境中定義的），這會非常令人困惑。



![Execution Context Selector 突出顯示爲紅色](images/non-top-context.png)

## 過濾控制檯輸出

點擊 **Filter** 按鈕 
(![filter 按鈕](images/filter-button.png){:.inline})
可以過濾控制檯輸出。您可以按嚴重性等級、按正則表達式模式或者通過隱藏網絡消息的方式進行過濾。


![過濾的控制檯輸出](images/filtered-console.png)

按嚴重性等級進行過濾的說明如下所示：

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">選項及顯示的內容</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>顯示所有控制檯輸出</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td>僅顯示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a> 的輸出。</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td>僅顯示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a> 的輸出。</td>
  </tr>
  <tr>
    <td>Info</td>
    <td>僅顯示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a> 的輸出。</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td>僅顯示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> 的輸出。</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td>僅顯示 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a> 和<a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a> 的輸出。</td>
  </tr>
  </tbody>
</table>

## 其他設置

打開 DevTools 設置，轉至 **General** 標籤，然後向下滾動到 **Console** 部分，查看更多控制檯設置。


![控制檯設置](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">設置及說明</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>默認情況下，控制檯將報告網絡問題。啓用此設置將指示控制檯不顯示這些錯誤的日誌。例如，將不會記錄 404 和 500 系列錯誤。</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>確定控制檯是否記錄每一個 XMLHttpRequest。</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>在頁面刷新或導航時保留控制檯歷史記錄。</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>在調用時向顯示的每條控制檯消息追加一個時間戳。對於發生特定事件時的調試非常實用。這會停用消息堆疊。</td>
  </tr>
  <tr>
    <td>Enable custom formatters</td>
    <td>控制 JavaScript 對象的<a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">格式設置</a>。</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
