project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单包含主题背景色”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单包含主题背景色 {: .page-title }

## 为什么说此审查非常重要{: #why }

当用户在 Chrome（Android 版）上访问您的应用时，您的网络应用清单的 `theme_color` 属性决定地址栏的颜色。
无论用户是否已将您的应用添加到主屏幕，该属性都会生效。


## 如何通过此审查{: #how }

在您的网络应用清单中添加一个 `theme_color` 属性。其值可以是任意有效的 CSS 颜色。


    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果清单包含一个 `theme_color` 属性，则表示通过了审查。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。Lighthouse 不会验证该值是否为有效的 CSS 颜色。



{# wf_devsite_translation #}
