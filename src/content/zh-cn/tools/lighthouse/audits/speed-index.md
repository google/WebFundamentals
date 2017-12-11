project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“速度指标”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 速度指标 {: .page-title }

## 为什么说此审查非常重要{: #why }

速度指标是一个页面加载性能指标，向您展示明显填充页面内容的速度。
此指标的分数越低越好。

## 如何通过此审查{: #how }

要降低速度指标分数，您需要优化您的页面以使加载速度从视觉上显得更快。
以下是两个非常好的出发点：

* [优化内容效率](/web/fundamentals/performance/optimizing-content-efficiency/)。
* [优化关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用一个名为 [Speedline](https://github.com/pmdartus/speedline) 的节点模块来生成速度指标分数。



如需了解速度指标背后的算法和方法的详细信息，请参阅[速度指标](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)。


目标分数通过对数正态分布的累积分布函数计算得出。
如果您需要了解更多信息，请查看此审查的[源代码](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)中的备注。




{# wf_devsite_translation #}
