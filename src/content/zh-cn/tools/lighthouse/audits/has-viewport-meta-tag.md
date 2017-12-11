project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“HTML 具有视口元标记”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# HTML 具有视口元标记 {: .page-title }

## 为什么说此审查非常重要{: #why }

如果没有视口元标记，移动设备将以典型的桌面设备屏幕宽度渲染页面，然后对页面进行缩放以适合移动设备屏幕。
通过设置视口，您可以控制视口的宽度和缩放比例。查看以下链接可了解详情：



* [配置视口](/speed/docs/insights/ConfigureViewport)。
* [设置视口](/web/fundamentals/design-and-ux/responsive/#set-the-viewport)。

## 如何通过此审查{: #how }

在 HTML 的 `<head>` 中添加一个视口 `<meta>` 标记。

    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ...
    </head>

`width=device-width` 键值对将视口宽度设置为设备宽度。
在访问页面时，`initial-scale=1` 键值对设置初始缩放级别。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 检查文档的 `<head>` 中是否有 `<meta name="viewport">` 标记。
它也会检查此节点是否包含 `content` 属性，且该属性值是否包含文本 `width=`。
不过，它不会检查 `width` 是否等于 `device-width`。
Lighthouse 也不会检查 `initial-scale` 键值对。



{# wf_devsite_translation #}
