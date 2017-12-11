project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單包含 start_url”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單包含 start_url {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

將您的網絡應用添加到用戶的主屏幕後，當用戶從主屏幕啓動應用時，網絡應用清單中的 `start_url` 屬性決定首先加載
應用的哪個頁面。



如果 `start_url` 屬性不存在，當用戶決定將應用添加到主屏幕時，瀏覽器將默認跳轉到任何處於活動狀態的頁面。


## 如何通過此審查 {: #how }

在您的網絡應用清單中添加一個 `start_url` 屬性。

    {
      ...
      "start_url": ".",
      ...
    }

有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清單並驗證它是否具有一個 `start_url` 屬性。Lighthouse 提取的清單獨立於 Chrome 當前在頁面上
使用的清單，這可能會產生不準確的結果。




{# wf_devsite_translation #}
