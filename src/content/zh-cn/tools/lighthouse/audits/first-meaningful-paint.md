project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“首次有效绘制”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# 首次有效绘制 {: .page-title }

## 为什么说此审查非常重要{: #why }

页面加载对用户如何看待对您的页面性能起着关键作用。
如需了解详细信息，请参阅[使用 RAIL 方法测量性能](/web/fundamentals/performance/rail)。

此审查可确定用户感觉到页面主要内容处于可见状态的时间。


## 如何通过此审查{: #how }

“首次有效绘制”分数越低，页面显示其主要内容的速度就越快。


[优化关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)对于实现更快的首次有效绘制非常有帮助。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

首次有效绘制至关重要，在该绘制后，将发生最重大的首屏布局变更，并加载网络字体。
请参阅以下规范以了解更多信息：[首次有效绘制：一个基于布局的方法](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)。


{# wf_devsite_translation #}
