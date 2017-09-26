project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站不使用 document.write()”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 网站不使用 document.write() {: .page-title }

## 为什么说此审查非常重要{: #why }

对于网速较慢（如 2G、3G 或较慢的 WLAN）的用户，外部脚本通过 `document.write()` 动态注入会使主要页面内容的显示延迟数十秒。



请参阅[干预 `document.write()`][blog] 了解更多信息。

[blog]: /web/updates/2016/08/removing-document-write

## 如何通过此审查{: #how }

在您的报告中，Lighthouse 列出了对 `document.write()` 的每次调用。查看此列表，并注意动态注入脚本的任何调用。如果脚本符合[干预 `document.write()`][blog] 简介中列出的条件，则 Chrome 不会执行注入的脚本。这些调用的是您要更改的 `document.write()`。
请参阅[如何解决此问题？][fix]，了解可能的解决方案。 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 报告它遇到的 `document.write()` 的每个实例。请注意，Chrome 的干预 `document.write()` 仅适用于动态注入的阻塞渲染的脚本。`document.write()` 的其他用法是可以接受的。



{# wf_devsite_translation #}
