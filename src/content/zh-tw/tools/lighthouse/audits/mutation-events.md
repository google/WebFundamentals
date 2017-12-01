project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站在其自身的腳本中不使用突變事件”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 網站在其自身的腳本中不使用突變事件 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

以下突變事件會損害性能，在 DOM 事件規範中已棄用：


* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## 如何通過此審查{: #how }

在 **URLs** 下，Lighthouse 報告它在您的代碼中發現的每個突變事件偵聽器。
將每個突變事件替換爲 `MutationObserver`。請參閱 MDN 上的 [`MutationObserver`][mdn] 以獲取更多幫助。


[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集頁面上的所有事件偵聽器，並對使用[爲什麼說此審查非常重要](#why)中列出的任意類型的任何偵聽器進行標記。




{# wf_devsite_translation #}
