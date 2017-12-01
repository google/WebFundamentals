project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站不使用延遲首次繪製的鏈接標記”與“網站在標頭中不使用延遲首次繪製的腳本標記”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 網站不使用延遲首次繪製的資源 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

快速的頁面加載可提高對用戶的吸引力、增加網頁瀏覽量和提高轉化率。


通過內聯首次繪製所需的鏈接和腳本，並延遲首次繪製不需要的鏈接和腳本，您可以提升頁面加載速度。


## 如何通過此審查{: #how }

在您的報告中，Lighthouse 列出了其檢測到的所有阻塞渲染的鏈接或腳本。
您的目標是減少這些鏈接或腳本的數量。

正如[如何實現審查](#implementation)中所述，Lighthouse 標記三種類型的阻塞渲染的鏈接：腳本、樣式表和 HTML 導入。如何進行優化取決於您正在使用的資源類型。

注：如果某個資源稱爲“關鍵資源”，則意味着首次繪製需要該資源或該資源對頁面的核心功能至關重要。



* 對於關鍵腳本，考慮在您的 HTML 中內聯它們。對於非關鍵腳本，考慮使用 `async` 或 `defer` 屬性標記它們。請參閱[使用 JavaScript 添加交互][js]瞭解更多信息。
* 對於樣式表，考慮將您的樣式分成不同的文件，按媒體查詢進行組織，然後向每個樣式錶鏈接添加一個 `media` 屬性。在加載頁面時，瀏覽器僅阻止首次繪製以檢索與用戶的設備匹配的樣式表。請參閱[阻塞渲染的 CSS][css] 瞭解更多信息。
* 對於非關鍵的 HTML 導入，使用 `async` 屬性標記它們。作爲一般規則，`async` 應儘可能與 HTML 導入一起使用。


[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 可標識三種類型的阻塞資源。

`<script>` 標記，其具有以下特徵：

* 位於文檔的 `<head>` 中。
* 沒有 `defer` 屬性。
* 沒有 `async` 屬性。

`<link rel="stylesheet">` 標記，其具有以下特徵：

* 沒有 `disabled` 屬性。如果具有此屬性，則瀏覽器不會下載樣式表。
* 沒有與用戶的設備匹配的 `media` 屬性。

`<link rel="import">` 標記，其具有以下特徵：

* 沒有 `async` 屬性。


{# wf_devsite_translation #}
