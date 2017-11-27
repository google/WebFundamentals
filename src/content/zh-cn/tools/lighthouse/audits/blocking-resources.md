project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站不使用延迟首次绘制的链接标记”与“网站在标头中不使用延迟首次绘制的脚本标记”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 网站不使用延迟首次绘制的资源 {: .page-title }

## 为什么说此审查非常重要{: #why }

快速的页面加载可提高对用户的吸引力、增加网页浏览量和提高转化率。


通过内联首次绘制所需的链接和脚本，并延迟首次绘制不需要的链接和脚本，您可以提升页面加载速度。


## 如何通过此审查{: #how }

在您的报告中，Lighthouse 列出了其检测到的所有阻塞渲染的链接或脚本。
您的目标是减少这些链接或脚本的数量。

正如[如何实现审查](#implementation)中所述，Lighthouse 标记三种类型的阻塞渲染的链接：脚本、样式表和 HTML 导入。如何进行优化取决于您正在使用的资源类型。

注：如果某个资源称为“关键资源”，则意味着首次绘制需要该资源或该资源对页面的核心功能至关重要。



* 对于关键脚本，考虑在您的 HTML 中内联它们。对于非关键脚本，考虑使用 `async` 或 `defer` 属性标记它们。请参阅[使用 JavaScript 添加交互][js]了解更多信息。
* 对于样式表，考虑将您的样式分成不同的文件，按媒体查询进行组织，然后向每个样式表链接添加一个 `media` 属性。在加载页面时，浏览器仅阻止首次绘制以检索与用户的设备匹配的样式表。请参阅[阻塞渲染的 CSS][css] 了解更多信息。
* 对于非关键的 HTML 导入，使用 `async` 属性标记它们。作为一般规则，`async` 应尽可能与 HTML 导入一起使用。


[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 可标识三种类型的阻塞资源。

`<script>` 标记，其具有以下特征：

* 位于文档的 `<head>` 中。
* 没有 `defer` 属性。
* 没有 `async` 属性。

`<link rel="stylesheet">` 标记，其具有以下特征：

* 没有 `disabled` 属性。如果具有此属性，则浏览器不会下载样式表。
* 没有与用户的设备匹配的 `media` 属性。

`<link rel="import">` 标记，其具有以下特征：

* 没有 `async` 属性。


{# wf_devsite_translation #}
