project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單包含簡稱”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單包含簡稱 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

在用戶將您的應用添加到主屏幕後，`short_name` 是顯示在主屏幕上您的應用圖標旁的文本。
一般情況下，在沒有充足的空間顯示應用的完整名稱時使用它。


## 如何通過此審查{: #how }

在您的網絡應用清單中添加一個 `short_name` 屬性。

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Chrome 的[最大建議長度](https://developer.chrome.com/apps/manifest/name#short_name)爲 12 個字符。



有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果清單包含一個 `short_name` 或 `name` 屬性，則表示通過了審查。Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。




{# wf_devsite_translation #}
