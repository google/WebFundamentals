project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“关键请求链”Lighthouse 审查的参考文档。

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# 关键请求链 {: .page-title }

## 为什么说此审查非常重要{: #why }

关键请求链这个概念源自关键渲染路径 (CRP) 优化策略。
CRP 通过确定优先加载的资源以及加载顺序，允许浏览器尽可能快地加载页面。



请参阅[关键渲染路径](/web/fundamentals/performance/critical-rendering-path/)文档了解详情。



## 如何通过此审查{: #how }

目前，此审查不采用“通过”或“未通过”这种结构。其提供的信息让您有机会改进您的应用的页面加载性能。



在 Lighthouse 的 Chrome 扩展程序版本中，您的报告将生成一个类似如下的图表：


<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

此图表表示页面的关键请求链。从 `lighthouse/` 到 `/css` 的路径形成一条链。
从 `lighthouse/` 到 `css/devsite-googler-buttons.css` 的路径形成另一条链。
以此类推。审查的最高得分体现了这些链条的数量。
例如，上面的图表的“分数”为七分。


该图表也详细列出下载每个资源花了多少时间，以及下载每个资源所需的字节数。


您可以根据此图表利用以下方式提升您的 CRP：

* 将关键资源数降至最低：消除关键资源、延迟关键资源的下载并将它们标记为不同步等。

* 优化关键字节数以缩短下载时间（往返次数）。

* 优化其余关键资源的加载顺序：尽早下载所有关键资产，以缩短关键路径长度。



优化以上任一因素都可提升页面加载速度。

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 使用网络优先级作为代理以识别阻塞渲染的关键资源。
有关 Chrome 如何定义这些优先级的更多信息，请参阅 [Chrome 资源优先级和调度](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)。



可通过 Chrome Debugger Protocol 提取有关关键请求链、资源大小和下载资源所花时间的数据。



{# wf_devsite_translation #}
