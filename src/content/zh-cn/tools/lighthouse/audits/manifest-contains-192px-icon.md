project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单包含像素至少达到 192px 的图标”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单包含像素至少达到 192px 的图标 {: .page-title }

## 为什么说此审查非常重要{: #why }

当用户将您的应用添加到主屏幕时，移动设备需要一个图标进行显示。
在网络应用清单的 `icons` 数组中指定该图标。

如果存在 192 像素的图标，则可确保您的图标在最大的 Android 设备上正常显示。
对于需要较小图标的小型设备，Android 可以使用合理的精度按比例缩小 192 像素的图标。
换句话说，尽管您可以在您的网络应用清单中提供尺寸较小的图标，但没有必要这么做。



## 如何通过此审查{: #how }

将一个 192 像素的图标添加到您的网络应用清单。

    {
      ...
      "icons": [{
        "src": "images/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
      }],
      ...
    }

有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

此审查只能保证您的图标在 Android 设备上正常显示。其他操作系统可能需要不同大小的图标才能实现最佳显示效果。



Lighthouse 提取清单并验证 `icons` 属性是否引用了一个 192 像素的图标。
Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。另请注意，Lighthouse 不会检查此图标是否切实存在于缓存中。
它只是确保网络应用清单定义一个 192 像素的图标。



{# wf_devsite_translation #}
