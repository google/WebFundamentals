project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站将 HTTP 流量重定向到 HTTPS”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# 网站将 HTTP 流量重定向到 HTTPS {: .page-title }

## 为什么说此审查非常重要{: #why }

所有网站都应使用 HTTPS 进行保护。请参阅以下 Lighthouse 文档了解原因：[网站在 HTTPS 上](https)。


在您设置好 HTTPS 后，您需要确保将网站的所有不安全的 HTTP 流量重定向到 HTTPS。


## 如何通过此审查{: #how }

1. 在 HTML 的 `head` 中使用规范链接，以帮助搜索引擎了解到达此页面的最佳方式。


       <link rel="canonical" href="https://example.com"/>

2. 配置您的服务器以将 HTTP 流量重定向到 HTTPS。请查看您的服务器的文档以了解执行此操作的最佳方式。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 将页面的网址更改为 `http`，加载页面，然后等待来自 Chrome Debugger 的一个事件，该事件可表明页面安全。
如果 Lighthouse 在 10 秒内没有收到此事件，则表明审查失败。



{# wf_devsite_translation #}
