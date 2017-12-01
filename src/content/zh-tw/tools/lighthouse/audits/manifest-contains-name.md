project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單包含名稱”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單包含名稱 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

網絡應用清單的 `name` 屬性是應用的用戶可讀名稱，因爲其作用是在用戶的移動設備上顯示。


如果未提供 `short_name`，則 `name` 將作爲標籤顯示在移動設備主屏幕上的應用圖標旁。


## 如何通過此審查{: #how }

在您的網絡應用清單中添加一個 `name` 屬性。

    {
      ...
      "name": "Air Horner",
      ...
    }

Chrome 的[最大長度](https://developer.chrome.com/apps/manifest/name)爲 45 個字符。


有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清單並驗證它是否具有一個 `name` 屬性。Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。




{# wf_devsite_translation #}
