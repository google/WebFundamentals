project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站不使用舊版 CSS Flexbox”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

# 網站不使用舊版 CSS Flexbox {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

2009 年的舊 Flexbox 規範已棄用，其速度比最新的規範慢 2.3 倍。
請參閱 [Flexbox 佈局並不慢][slow]瞭解更多信息。


[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## 如何通過此審查 {: #how }

在 **URLs** 下，Lighthouse 列出了它在頁面樣式表中找到的 `display: box` 的每個實例。
將每個實例替換爲新語法，`display: flex`。


如果樣式表當前在使用 `display: box`，則它可能在使用其他已棄用的 Flexbox 屬性。
簡言之，以 `box` 開頭的每個屬性（如 `box-flex`）已棄用並且應予以替換。
請參閱 [CSS Flexbox 2009/2011 規範語法屬性對應關係][map]以準確瞭解舊版屬性與新版屬性的對應關係。



[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集頁面上使用的所有樣式表，並檢查否有任何樣式表使用 `display: box`。
Lighthouse 不會檢查樣式表是否使用任何其他已棄用的屬性。



{# wf_devsite_translation #}
