project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站在其自身的腳本中不使用 Date.now()”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 網站在其自身的腳本中不使用 Date.now() {: .page-title }

## 爲什麼說此審查非常重要{: #why }

如果您使用 `Date.now()` 測量時間，請考慮改用 `performance.now()`。`performance.now()` 可提供較高的時間戳分辨率，並始終以恆定的速率增加，它不受系統時鐘（可以調整或手動傾斜）的影響。




## 如何通過此審查{: #how }

在您的報告中，Lighthouse 列出了其在 **URLs** 下找到的 `Date.now()` 的每個實例。
將每個調用替換爲 `performance.now()`。

如需瞭解此 API 的詳細信息，請參閱 [`performance.now()`][MDN]。

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 報告它從與頁面位於同一主機的腳本中發現的 `Date.now()` 的每個實例。
來自其他主機的腳本被排除在外，因爲 Lighthouse 假定您不能控制這些腳本。因此，您的頁面上可能有使用 `Date.now()` 的其他腳本，但這些腳本不會顯示在您的 Lighthouse 報告中。



{# wf_devsite_translation #}
