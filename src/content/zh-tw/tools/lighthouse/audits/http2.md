project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站使用 HTTP/2 傳輸自身資源”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 網站使用 HTTP/2 傳輸自身資源 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

HTTP/2 可更快地提供頁面的資源，並且可減少通過網絡傳輸的數據。


有關 HTTP/2 通過 HTTP/1.1 提供的優勢的列表，請參閱 [HTTP/2 常見問題解答][faq]。


有關深入的技術概覽，請參閱 [HTTP/2 簡介][intro]。

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## 如何通過此審查{: #how }

在 **URLs** 下，Lighthouse 列出不是通過 HTTP/2 提供的每個資源。要通過此審查，需要通過 HTTP/2 提供其中的每個資源。


要了解如何在您的服務器上啓用 HTTP/2，請參閱[設置 HTTP/2][setup]。

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集與頁面來自同一個主機的所有資源，然後檢查每個資源的 HTTP 協議版本。


Lighthouse 從此審查中排除來自其他主機的資源，因爲它假定您無法控制這些資源的提供方式。



{# wf_devsite_translation #}
