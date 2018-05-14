project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站使用 rel="noopener" 打開外部錨”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

# 網站使用 rel="noopener" 打開外部錨 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

當您的頁面鏈接至使用 `target="_blank"` 的另一個頁面時，新頁面將與您的頁面在同一個進程上運行。
如果新頁面正在執行開銷極大的 JavaScript，您的頁面性能可能會受影響。


此外，`target="_blank"` 也是一個安全漏洞。新的頁面可以通過 `window.opener` 訪問您的窗口對象，並且它可以使用 `window.opener.location = newURL` 將您的頁面導航至不同的網址。



如需瞭解詳細信息，請參閱 [rel=noopener 的性能優勢][jake]。

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## 如何通過此審查 {: #how }

將 `rel="noopener"` 添加至 Lighthouse 在您的報告中識別的每個鏈接。
一般情況下，當您在新窗口或標籤中打開一個外部鏈接時，始終添加 `rel="noopener"`。


    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用以下算法將鏈接標記爲 `rel="noopener"` 候選項：


1. 收集所有包含屬性 `target="_blank"`、但不包含屬性 `rel="noopener"` 的 `<a>` 節點。
1. 過濾任何主機相同的鏈接。


由於 Lighthouse 會過濾主機相同的鏈接，因此，如果您處理大型網站，則會出現您可能需要注意的邊緣情況。
如果您的頁面在未使用 `rel="noopener"` 的情況下打開一個指向網站另一個區域的鏈接，則此審查的性能影響仍然適用。
不過，在您的 Lighthouse 結果中您不會看到這些鏈接。



{# wf_devsite_translation #}
