project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“清单是否存在”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-09-20 #}
{# wf_published_on:2016-09-20 #}

# 清单是否存在 {: .page-title }

## 为什么说此审查非常重要{: #why }

网络应用清单是一项网络技术，允许您将网络应用添加到用户的主屏幕。
此功能通常称为“添加到主屏幕 (A2HS)”。


## 如何通过此审查{: #how }

有关在现有应用中添加 A2HS 支持的实用分步指南，请查看以下代码实验室：[将网络应用添加到用户的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。



如需结构较为松散、深入探讨网络应用清单的指南，请参阅[通过网络应用清单改进用户体验](/web/fundamentals/engage-and-retain/web-app-manifest)。



运用您在这些指南中学到的知识，在您自己的网络应用中添加 A2HS 支持。


您可以在 Chrome DevTools 中模拟和测试 A2HS 事件。有关更多帮助，请参阅下文：[网络应用清单](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest)。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 提取清单并验证它是否具有数据。Lighthouse 提取的清单独立于 Chrome 当前在页面上使用的清单，这可能会产生不准确的结果。




{# wf_devsite_translation #}
