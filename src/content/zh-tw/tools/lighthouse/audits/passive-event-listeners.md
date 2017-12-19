project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“網站使用被動事件偵聽器以提升滾動性能”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

# 網站使用被動事件偵聽器以提升滾動性能 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

在您的觸摸和滾輪事件偵聽器上設置 `passive` 選項可提升滾動性能。


有關概述，請參閱[通過被動事件偵聽器提升滾動性能][blog]。


有關技術詳細信息，請參閱被動事件偵聽器規範中的[說明][explainer]。


[blog]: /web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## 如何通過此審查 {: #how }

將 `passive` 標誌添加到 Lighthouse 已識別的所有事件偵聽器。
一般情況下，將 `passive` 標誌添加到每個沒有調用 `preventDefault()` 的 `wheel`、`mousewheel`、`touchstart` 和 `touchmove` 事件偵聽器。



在支持被動事件偵聽器的瀏覽器中，將偵聽器標記爲 `passive` 與設置標誌一樣簡單：


    document.addEventListener('touchstart', onTouchStart, {passive: true});

不過，在不支持被動事件偵聽器的瀏覽器中，第三個參數是一個布爾值，以表明此事件是應觸發還是採集。因此，使用上面的語法可能會導致意外後果。



如需瞭解如何安全地實現被動事件偵聽器，請參閱[功能檢測][polyfill]中的 polyfill。


[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用以下算法標記潛在的被動事件偵聽器候選項：


1. 收集頁面上的所有事件偵聽器。
1. 過濾非觸摸和非滾輪偵聽器。
1. 過濾調用 `preventDefault()` 的偵聽器。
1. 過濾與頁面不在同一個主機上的偵聽器。


Lighthouse 過濾來自不同主機的偵聽器，因爲您可能無法控制這些腳本。
因此，請注意，Lighthouse 的審查並不代表您的頁面的完整滾動性能。
可能存在損害頁面的滾動性能的第三方腳本，但這些不會在您的 Lighthouse 報告中列出。




{# wf_devsite_translation #}
