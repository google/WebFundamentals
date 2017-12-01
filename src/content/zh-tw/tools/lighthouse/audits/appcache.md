project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站不使用應用緩存”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# 網站不使用應用緩存 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

應用緩存（也稱爲 AppCache）已[棄用][deprecated]。

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## 如何通過此審查{: #how }

考慮使用服務工作線程 [Cache API][API]。

爲幫助您從 AppCache 遷移到服務工作線程，請考慮使用 [sw-appcache-behavior][sw-appcache-behavior] 內容庫。
此內容庫將針對 AppCache 清單中定義的行爲生成一個基於服務工作線程的實現。



有關使用服務工作線程爲網站提供離線支持的更多資源，請參閱[處於離線狀態時訪問網址返回 200](http-200-when-offline) 審查參考。



[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果未檢測到 AppCache 清單，則表示通過了審查。


{# wf_devsite_translation #}
