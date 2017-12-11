project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單包含背景色”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單包含背景色 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

當您的網絡應用從用戶的主屏幕加載時，瀏覽器使用 `background_color` 屬性提取應用加載時瀏覽器的背景色。這會在啓動應用和加載應用的內容之間產生平穩過渡。


## 如何通過此審查 {: #how }

在您的網絡應用清單中添加一個 `background_color` 屬性。其值可以是任意有效的 CSS 顏色。


    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果清單包含一個 `background_color` 屬性，則表示通過了審查。Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。Lighthouse 不會驗證該值是否爲有效的 CSS 顏色。



{# wf_devsite_translation #}
