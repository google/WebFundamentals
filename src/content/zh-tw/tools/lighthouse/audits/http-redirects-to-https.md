project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站將 HTTP 流量重定向到 HTTPS”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# 網站將 HTTP 流量重定向到 HTTPS {: .page-title }

## 爲什麼說此審查非常重要{: #why }

所有網站都應使用 HTTPS 進行保護。請參閱以下 Lighthouse 文檔瞭解原因：[網站在 HTTPS 上](https)。


在您設置好 HTTPS 後，您需要確保將網站的所有不安全的 HTTP 流量重定向到 HTTPS。


## 如何通過此審查{: #how }

1. 在 HTML 的 `head` 中使用規範鏈接，以幫助搜索引擎瞭解到達此頁面的最佳方式。


       <link rel="canonical" href="https://example.com"/>

2. 配置您的服務器以將 HTTP 流量重定向到 HTTPS。請查看您的服務器的文檔以瞭解執行此操作的最佳方式。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 將頁面的網址更改爲 `http`，加載頁面，然後等待來自 Chrome Debugger 的一個事件，該事件可表明頁面安全。
如果 Lighthouse 在 10 秒內沒有收到此事件，則表明審查失敗。



{# wf_devsite_translation #}
