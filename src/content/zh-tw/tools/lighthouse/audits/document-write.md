project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站不使用 document.write()”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 網站不使用 document.write() {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

對於網速較慢（如 2G、3G 或較慢的 WLAN）的用戶，外部腳本通過 `document.write()` 動態注入會使主要頁面內容的顯示延遲數十秒。



請參閱[干預 `document.write()`][blog] 瞭解更多信息。

[blog]: /web/updates/2016/08/removing-document-write

## 如何通過此審查 {: #how }

在您的報告中，Lighthouse 列出了對 `document.write()` 的每次調用。查看此列表，並注意動態注入腳本的任何調用。如果腳本符合[干預 `document.write()`][blog] 簡介中列出的條件，則 Chrome 不會執行注入的腳本。這些調用的是您要更改的 `document.write()`。
請參閱[如何解決此問題？][fix]，瞭解可能的解決方案。 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 報告它遇到的 `document.write()` 的每個實例。請注意，Chrome 的干預 `document.write()` 僅適用於動態注入的阻塞渲染的腳本。`document.write()` 的其他用法是可以接受的。



{# wf_devsite_translation #}
