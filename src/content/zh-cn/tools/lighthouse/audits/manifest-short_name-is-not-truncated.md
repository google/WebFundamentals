project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单的简称在主屏幕上显示时不会截断”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单的简称在主屏幕上显示时不会截断 {: .page-title }

## 为什么说此审查非常重要{: #why }

在用户将您的网络应用添加到主屏幕时，`short_name` 属性作为标签显示在您的应用的图标旁。
如果 `short_name` 超过 12 个字符，则它在主屏幕上显示时将被截断。


请注意，如果 `short_name` 不存在，Chrome 可以回退到 `name` 属性（如果它足够短）。


## 如何通过此审查{: #how }

在您的网络应用清单中将 `short_name` 属性设置为少于 12 个字符。

    {
      ...
      "short_name": "Air Horner",
      ...
    }

或者，如果您没有在清单中指定 `short_name` 属性，则将 `name` 属性设置为少于 12 个字符。


有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清单并验证 `short_name` 属性是否少于 12 个字符。
请注意，由于 `name` 属性可以用作 `short_name` 的后备选项，因此，Lighthouse 还会将此属性作为后备选项进行测试。因此，如果您没有在清单中添加 `short_name`，但是您的 `name` 少于 12 个字符，则可以通过审查。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。




{# wf_devsite_translation #}
