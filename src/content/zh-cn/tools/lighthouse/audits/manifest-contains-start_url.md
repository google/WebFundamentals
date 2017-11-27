project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单包含 start_url”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# 清单包含 start_url {: .page-title }

## 为什么说此审查非常重要{: #why }

将您的网络应用添加到用户的主屏幕后，当用户从主屏幕启动应用时，网络应用清单中的 `start_url` 属性决定首先加载应用的哪个页面。



如果 `start_url` 属性不存在，当用户决定将应用添加到主屏幕时，浏览器将默认跳转到任何处于活动状态的页面。


## 如何通过此审查{: #how }

在您的网络应用清单中添加一个 `start_url` 属性。

    {
      ...
      "start_url": ".",
      ...
    }

有关向您展示如何在应用中正确实现和测试“添加到主屏幕”支持的指南清单，请查看[清单是否存在](manifest-exists#how)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清单并验证它是否具有一个 `start_url` 属性。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。




{# wf_devsite_translation #}
