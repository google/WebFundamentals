project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“User Timing 標記和測量結果”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-10-06 #}
{# wf_published_on:2016-10-06 #}

# User Timing 標記和測量結果 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

您可以通過 User Timing API 測量您的應用的 JavaScript 性能。基本思路是您決定您要優化的腳本部分，然後使用 User Timing API 測量腳本的這些部分。從此處，您可以使用此 API 訪問來自 JavaScript 的結果，或在您的 [Chrome DevTools Timeline 錄製](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)上查看它們。



## 如何通過此審查 {: #how }

此審查不採用“通過”或“未通過”測試這種結構。它只是讓您有機會發現可幫助您測量應用性能的實用性 API。Lighthouse 針對此審查報告的分數與它在您的應用中發現的 User Timing 標記和測量結果的數量相對應。


如果您的應用包含 User Timing 標記和測量結果，您將在您的 Lighthouse 報告中看到這些標記和測量結果。


有關使用 User Timing API 測量應用的 JavaScript 性能的簡介，請查看 [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 從 Chrome 的 Trace Event Profiling Tool 中提取 User Timing 數據。


{# wf_devsite_translation #}
