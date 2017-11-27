project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单包含名称”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单包含名称 {: .page-title }

## 为什么说此审查非常重要{: #why }

网络应用清单的 `name` 属性是应用的用户可读名称，因为其作用是在用户的移动设备上显示。


如果未提供 `short_name`，则 `name` 将作为标签显示在移动设备主屏幕上的应用图标旁。


## 如何通过此审查{: #how }

在您的网络应用清单中添加一个 `name` 属性。

    {
      ...
      "name": "Air Horner",
      ...
    }

Chrome 的[最大长度](https://developer.chrome.com/apps/manifest/name)为 45 个字符。


有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清单并验证它是否具有一个 `name` 属性。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。




{# wf_devsite_translation #}
