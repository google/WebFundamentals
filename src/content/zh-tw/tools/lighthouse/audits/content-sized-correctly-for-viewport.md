project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“正確調整內容大小，使其適合視口”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 正確調整內容大小，使其適合視口 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

該審查檢查頁面上內容的寬度是否等於視口寬度。
如果內容寬度小於或大於視口寬度，則通常表明頁面沒有針對移動設備屏幕進行優化。



## 如何通過此審查{: #how }

此審查是一種確定頁面是否已針對移動設備進行優化的迂迴方式。
如果您的網站未優化，並且您想要優化它，請先參閱[自適應網頁設計基礎知識](/web/fundamentals/design-and-ux/responsive/)。



如果屬於以下情形，您可忽略該審查：

* 您的網站不需要針對移動設備屏幕進行優化。
* 您的頁面內容寬度特意設計成小於或大於視口寬度。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果 `window.innerWidth === window.outerWidth`，則表示通過了審查。


{# wf_devsite_translation #}
