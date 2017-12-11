project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“正确调整内容大小，使其适合视口”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 正确调整内容大小，使其适合视口 {: .page-title }

## 为什么说此审查非常重要{: #why }

该审查检查页面上内容的宽度是否等于视口宽度。
如果内容宽度小于或大于视口宽度，则通常表明页面没有针对移动设备屏幕进行优化。



## 如何通过此审查{: #how }

此审查是一种确定页面是否已针对移动设备进行优化的迂回方式。
如果您的网站未优化，并且您想要优化它，请先参阅[自适应网页设计基础知识](/web/fundamentals/design-and-ux/responsive/)。



如果属于以下情形，您可忽略该审查：

* 您的网站不需要针对移动设备屏幕进行优化。
* 您的页面内容宽度特意设计成小于或大于视口宽度。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

如果 `window.innerWidth === window.outerWidth`，则表示通过了审查。


{# wf_devsite_translation #}
