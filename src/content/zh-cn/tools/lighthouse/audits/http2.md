project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站使用 HTTP/2 传输自身资源”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 网站使用 HTTP/2 传输自身资源 {: .page-title }

## 为什么说此审查非常重要{: #why }

HTTP/2 可更快地提供页面的资源，并且可减少通过网络传输的数据。


有关 HTTP/2 通过 HTTP/1.1 提供的优势的列表，请参阅 [HTTP/2 常见问题解答][faq]。


有关深入的技术概览，请参阅 [HTTP/2 简介][intro]。

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## 如何通过此审查{: #how }

在 **URLs** 下，Lighthouse 列出不是通过 HTTP/2 提供的每个资源。要通过此审查，需要通过 HTTP/2 提供其中的每个资源。


要了解如何在您的服务器上启用 HTTP/2，请参阅[设置 HTTP/2][setup]。

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集与页面来自同一个主机的所有资源，然后检查每个资源的 HTTP 协议版本。


Lighthouse 从此审查中排除来自其他主机的资源，因为它假定您无法控制这些资源的提供方式。



{# wf_devsite_translation #}
