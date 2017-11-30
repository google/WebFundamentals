project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“頁面在其腳本不可用時包含一些內容”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-20 #}
{# wf_published_on:2016-09-20 #}

# 頁面在其腳本不可用時包含一些內容 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

[漸進式增強](https://en.wikipedia.org/wiki/Progressive_enhancement)是一個網絡開發策略，其確保讓儘可能多的目標設備能夠訪問您的網站。最常見的漸進式增強的定義如下：


基本內容和頁面功能應僅依賴最基礎的網絡技術，以確保頁面在所有瀏覽條件下可用。增強的體驗，如使用 CSS 的精細樣式設計，或使用 JavaScript 的交互性，可在支持這些技術的瀏覽器的頂部進行分層。但是基本內容和頁面功能不應依賴於 CSS 或 JavaScript。


## 如何通過此審查{: #how }

漸進式增強是一個很大的話題，而且頗具爭議性。其中一派認爲，爲遵循漸進式增強的策略，應對頁面進行分層，這樣基本內容和功能就只需要 HTML。有關此方法的示例，請參閱[漸進式增強：
概念及使用方式](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)。


另一派則認爲，對於許多現代的大型網絡應用，這個嚴格的方法不可行或者說沒有必要，並建議在文檔 `<head>` 中使用內聯關鍵路徑 CSS 以支持特別重要的頁面樣式。有關此方法的詳細信息，請參閱[關鍵渲染路徑](/web/fundamentals/performance/critical-rendering-path/)。




基於上述因素，此 Lighthouse 審查執行一個簡單的檢查，以確保在停用 JavaScript 時您的頁面不會處於空白狀態。
您的應用遵循漸進式增強的嚴格程度是一個爭議話題，但人們普遍認爲當停用 JavaScript 時，所有頁面都應至少顯示*一些*信息，即使顯示的內容只是提醒用戶使用此頁面需要 JavaScript。





對於必須絕對依賴 JavaScript 的頁面，一種方法是使用一個 [`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) 元素，以提醒用戶此頁面需要 JavaScript。這樣好過顯示空白頁面，因爲空白頁面會使用戶不確定是頁面有問題，還是他們的瀏覽器或計算機出現了問題。




要查看停用 JavaScript 時您的網站的外觀和性能，請使用 Chrome DevTools 的[停用 JavaScript](/web/tools/chrome-devtools/settings#disable-js) 功能。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 在頁面上停用 JavaScript，然後檢查頁面的 HTML。如果 HTML 爲空，則表示審查失敗。
如果 HTML 不爲空，則表示通過了審查。



{# wf_devsite_translation #}
