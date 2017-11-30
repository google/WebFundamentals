project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站在其自身的腳本中不使用 console.time()”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 網站在其自身的腳本中不使用 console.time() {: .page-title }

## 爲什麼說此審查非常重要{: #why }

如果您使用 `console.time()` 測量頁面的性能，請考慮改用 User Timing API。
其優勢包括：

* 高分辨率時間戳。
* 可導出的計時數據。
* 與 Chrome DevTools Timeline 相集成。在 Timeline 錄製期間調用 User Timing 函數 `performance.measure()` 時，DevTools 自動將此測量結果添加到 Timeline 的結果中，如以下屏幕截圖中的 `my custom measurement` 標籤中所示。




![Chrome DevTools Timeline 中的 User Timing 測量結果][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## 如何通過此審查{: #how }

在您的報告中，Lighthouse 列出了其在 **URLs** 下找到的 `console.time()` 的每個實例。
將每個調用替換爲 `performance.mark()`。如果您要測量在兩個標記之間經過的時間，則使用 `performance.measure()`。



請參閱 [User Timing API：瞭解您的網絡應用][html5rocks]以瞭解如何使用此 API。


[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 報告它從與頁面位於同一主機的腳本中發現的 `console.time()` 的每個實例。
來自其他主機的腳本被排除在外，因爲 Lighthouse 假定您不能控制這些腳本。因此，您的頁面上可能有使用 `console.time()` 的其他腳本，但這些腳本不會顯示在您的 Lighthouse 報告中。



{# wf_devsite_translation #}
