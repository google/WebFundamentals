project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站在其自身的脚本中不使用突变事件”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 网站在其自身的脚本中不使用突变事件 {: .page-title }

## 为什么说此审查非常重要{: #why }

以下突变事件会损害性能，在 DOM 事件规范中已弃用：


* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## 如何通过此审查{: #how }

在 **URLs** 下，Lighthouse 报告它在您的代码中发现的每个突变事件侦听器。
将每个突变事件替换为 `MutationObserver`。请参阅 MDN 上的 [`MutationObserver`][mdn] 以获取更多帮助。


[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集页面上的所有事件侦听器，并对使用[为什么说此审查非常重要](#why)中列出的任意类型的任何侦听器进行标记。




{# wf_devsite_translation #}
