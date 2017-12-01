project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站不使用 Web SQL”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 網站不使用 Web SQL {: .page-title }

## 爲什麼說此審查非常重要{: #why }

Web SQL 已棄用。請參閱 [Web SQL 數據庫][spec]瞭解更多信息。

[spec]: https://www.w3.org/TR/webdatabase/

## 如何通過此審查{: #how }

請考慮將您的 Web SQL 數據庫替換爲一個可替代它的現代數據庫（如 [IndexedDB][indexeddb]）。


有關其他可用存儲選擇的討論，請參閱[網絡存儲概覽][overview]。


[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 檢查此頁面是否具有一個 Web SQL 數據庫實例。


{# wf_devsite_translation #}
