project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站不使用 Web SQL”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 网站不使用 Web SQL {: .page-title }

## 为什么说此审查非常重要{: #why }

Web SQL 已弃用。请参阅 [Web SQL 数据库][spec]了解更多信息。

[spec]: https://www.w3.org/TR/webdatabase/

## 如何通过此审查{: #how }

请考虑将您的 Web SQL 数据库替换为一个可替代它的现代数据库（如 [IndexedDB][indexeddb]）。


有关其他可用存储选择的讨论，请参阅[网络存储概览][overview]。


[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 检查此页面是否具有一个 Web SQL 数据库实例。


{# wf_devsite_translation #}
