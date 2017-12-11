project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“网站不使用旧版 CSS Flexbox”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

# 网站不使用旧版 CSS Flexbox {: .page-title }

## 为什么说此审查非常重要{: #why }

2009 年的旧 Flexbox 规范已弃用，其速度比最新的规范慢 2.3 倍。
请参阅 [Flexbox 布局并不慢][slow]了解更多信息。


[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## 如何通过此审查{: #how }

在 **URLs** 下，Lighthouse 列出了它在页面样式表中找到的 `display: box` 的每个实例。
将每个实例替换为新语法，`display: flex`。


如果样式表当前在使用 `display: box`，则它可能在使用其他已弃用的 Flexbox 属性。
简言之，以 `box` 开头的每个属性（如 `box-flex`）已弃用并且应予以替换。
请参阅 [CSS Flexbox 2009/2011 规范语法属性对应关系][map]以准确了解旧版属性与新版属性的对应关系。



[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 收集页面上使用的所有样式表，并检查否有任何样式表使用 `display: box`。
Lighthouse 不会检查样式表是否使用任何其他已弃用的属性。



{# wf_devsite_translation #}
