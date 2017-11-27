project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“缓存包含来自清单的 start_url”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# 缓存包含来自清单的 start_url {: .page-title }

## 为什么说此审查非常重要{: #why }

可确保在离线状态下从移动设备主屏幕正确启动 Progressive Web App。


## 如何通过此审查{: #how }

1. 在您的 `manifest.json` 文件中定义一个 `start_url` 属性。
2. 确保您的服务工作线程正确缓存与 `start_url` 的值匹配的资源。


如需了解将应用添加到主屏幕的基础知识，请参阅[将网络应用添加到用户的主屏幕](https://codelabs.developers.google.com/codelabs/add-to-home-screen)。这是一个实用的分步操作的代码实验室，在其中可将“添加到主屏幕”功能添加到现有应用中。运用您在此代码实验室中学到的知识将“添加到主屏幕”功能集成到您自己的应用中。


如需有关如何使用服务工作线程缓存文件以供离线使用的更多帮助，请参阅以下 Lighthouse 文档：[处于离线状态时访问网址返回 200](http-200-when-offline#how) 中的“如何通过此审查”部分



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

从移动设备的主屏幕启动一个 Progressive Web App 时，此应用将在特定网址上打开。
该网址在应用的 `manifest.json` 文件中被定义为 `start_url` 属性。


此审查解析来自 `manifest.json` 的 `start_url` 的值，然后确保将匹配的资源缓存在服务工作线程的缓存中。


**如果您的服务工作线程重定向** `start_url` **请求，则此审查可能会生成不准确的结果**。


此审查的一个缺点是它直接检查缓存内容，而不是要求服务工作线程解析 `start_url` 请求。如果您的缓存缺少与 `start_url` 的精确值匹配的资源，这会生成一个假阴性结果，即使在实际场景中由于服务工作线程将请求重定向到缓存中的另一个资源从而能够成功解析请求。反过来，如果您的缓存包含一个与 `start_url` 匹配的资源，则此审查会生成一个假阳性结果，但是您的服务工作线程将请求重定向到一个不存在的资源。





{# wf_devsite_translation #}
