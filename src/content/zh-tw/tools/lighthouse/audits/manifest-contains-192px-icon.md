project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清單包含像素至少達到 192px 的圖標”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清單包含像素至少達到 192px 的圖標 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

當用戶將您的應用添加到主屏幕時，移動設備需要一個圖標進行顯示。
在網絡應用清單的 `icons` 數組中指定該圖標。

如果存在 192 像素的圖標，則可確保您的圖標在最大的 Android 設備上正常顯示。
對於需要較小圖標的小型設備，Android 可以使用合理的精度按比例縮小 192 像素的圖標。
換句話說，儘管您可以在您的網絡應用清單中提供尺寸較小的圖標，但沒有必要這麼做。



## 如何通過此審查 {: #how }

將一個 192 像素的圖標添加到您的網絡應用清單。

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

有關向您展示如何在應用中正確實現和測試“添加到主屏幕”支持的指南清單，請查看[清單是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

此審查只能保證您的圖標在 Android 設備上正常顯示。其他操作系統可能需要不同大小的圖標才能實現最佳顯示效果。



Lighthouse 提取清單並驗證 `icons` 屬性是否引用了一個 192 像素的圖標。
Lighthouse 提取的清單獨立於 Chrome 當前在頁面上使用的清單，這可能會產生不準確的結果。另請注意，Lighthouse 不會檢查此圖標是否切實存在於緩存中。
它只是確保網絡應用清單定義一個 192 像素的圖標。



{# wf_devsite_translation #}
