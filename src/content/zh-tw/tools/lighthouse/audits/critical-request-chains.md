project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“關鍵請求鏈”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# 關鍵請求鏈 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

關鍵請求鏈這個概念源自關鍵渲染路徑 (CRP) 優化策略。
CRP 通過確定優先加載的資源以及加載順序，允許瀏覽器儘可能快地加載頁面。



請參閱[關鍵渲染路徑](/web/fundamentals/performance/critical-rendering-path/)文檔瞭解詳情。



## 如何通過此審查{: #how }

目前，此審查不採用“通過”或“未通過”這種結構。其提供的信息讓您有機會改進您的應用的頁面加載性能。



在 Lighthouse 的 Chrome 擴展程序版本中，您的報告將生成一個類似如下的圖表：


<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

此圖表表示頁面的關鍵請求鏈。從 `lighthouse/` 到 `/css` 的路徑形成一條鏈。
從 `lighthouse/` 到 `css/devsite-googler-buttons.css` 的路徑形成另一條鏈。
以此類推。審查的最高得分體現了這些鏈條的數量。
例如，上面的圖表的“分數”爲七分。


該圖表也詳細列出下載每個資源花了多少時間，以及下載每個資源所需的字節數。


您可以根據此圖表利用以下方式提升您的 CRP：

* 將關鍵資源數降至最低：消除關鍵資源、延遲關鍵資源的下載並將它們標記爲不同步等。

* 優化關鍵字節數以縮短下載時間（往返次數）。

* 優化其餘關鍵資源的加載順序：儘早下載所有關鍵資產，以縮短關鍵路徑長度。



優化以上任一因素都可提升頁面加載速度。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用網絡優先級作爲代理以識別阻塞渲染的關鍵資源。
有關 Chrome 如何定義這些優先級的更多信息，請參閱 [Chrome 資源優先級和調度](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)。



可通過 Chrome Debugger Protocol 提取有關關鍵請求鏈、資源大小和下載資源所花時間的數據。



{# wf_devsite_translation #}
