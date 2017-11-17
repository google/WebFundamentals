project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单的 display 属性已设置”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单的 display 属性已设置 {: .page-title }

## 为什么说此审查非常重要{: #why }

当您的应用从主屏幕启动时，您可以使用网络应用清单中的 `display` 属性指定应用的显示模式。


## 如何通过此审查{: #how }

将一个 `display` 属性添加到您的网络应用清单，并将其设置为以下值之一：`fullscreen`、`standalone` 或 `browser`。


    {
      ...
      "display": "fullscreen",
      ...
    }

如需了解每个值的详细信息，请参阅 [MDN 上针对显示属性的参考](https://developer.mozilla.org/en-US/docs/Web/Manifest#display)。



有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清单并验证 `display` 属性是否存在，且其值是否为 `fullscreen`、`standalone` 或 `browser`。


Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。



{# wf_devsite_translation #}
