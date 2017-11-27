project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单包含简称”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单包含简称 {: .page-title }

## 为什么说此审查非常重要{: #why }

在用户将您的应用添加到主屏幕后，`short_name` 是显示在主屏幕上您的应用图标旁的文本。
一般情况下，在没有充足的空间显示应用的完整名称时使用它。


## 如何通过此审查{: #how }

在您的网络应用清单中添加一个 `short_name` 属性。

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Chrome 的[最大建议长度](https://developer.chrome.com/apps/manifest/name#short_name)为 12 个字符。



有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果清单包含一个 `short_name` 或 `name` 属性，则表示通过了审查。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。




{# wf_devsite_translation #}
