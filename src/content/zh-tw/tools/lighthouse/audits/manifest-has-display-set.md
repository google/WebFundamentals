project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單的 display 屬性已設置”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單的 display 屬性已設置 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

當您的應用從主屏幕啓動時，您可以使用網絡應用清單中的 `display` 屬性指定應用的顯示模式。


## 如何通過此審查{: #how }

將一個 `display` 屬性添加到您的網絡應用清單，並將其設置爲以下值之一：`fullscreen`、`standalone` 或 `browser`。


    {
      ...
      "display": "fullscreen",
      ...
    }

如需瞭解每個值的詳細信息，請參閱 [MDN 上針對顯示屬性的參考](https://developer.mozilla.org/en-US/docs/Web/Manifest#display)。



有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清單並驗證 `display` 屬性是否存在，且其值是否爲 `fullscreen`、`standalone` 或 `browser`。


Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。



{# wf_devsite_translation #}
