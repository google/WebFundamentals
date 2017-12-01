project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“速度指標”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 速度指標 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

速度指標是一個頁面加載性能指標，向您展示明顯填充頁面內容的速度。
此指標的分數越低越好。

## 如何通過此審查{: #how }

要降低速度指標分數，您需要優化您的頁面以使加載速度從視覺上顯得更快。
以下是兩個非常好的出發點：

* [優化內容效率](/web/fundamentals/performance/optimizing-content-efficiency/)。
* [優化關鍵渲染路徑](/web/fundamentals/performance/critical-rendering-path/)。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用一個名爲 [Speedline](https://github.com/pmdartus/speedline) 的節點模塊來生成速度指標分數。



如需瞭解速度指標背後的算法和方法的詳細信息，請參閱[速度指標](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)。


目標分數通過對數正態分佈的累積分佈函數計算得出。
如果您需要了解更多信息，請查看此審查的[源代碼](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)中的備註。




{# wf_devsite_translation #}
