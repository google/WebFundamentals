project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解关键渲染路径优化中的关键因素。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2014-03-31 #}

# 优化关键渲染路径 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


  为尽快完成首次渲染，我们需要最大限度减小以下三种可变因素：


  <ul>
    <li>关键资源的数量。</li>
    <li>关键路径长度。</li>
    <li>关键字节的数量。</li>
  </ul>

关键资源是可能阻止网页首次渲染的资源。这些资源越少，浏览器的工作量就越小，对 CPU 以及其他资源的占用也就越少。

同样，关键路径长度受所有关键资源与其字节大小之间依赖关系图的影响：某些资源只能在上一资源处理完毕之后才能开始下载，并且资源越大，下载所需的往返次数就越多。

最后，浏览器需要下载的关键字节越少，处理内容并让其出现在屏幕上的速度就越快。要减少字节数，我们可以减少资源数（将它们删除或设为非关键资源），此外还要压缩和优化各项资源，确保最大限度减小传送大小。

**优化关键渲染路径的常规步骤如下：**

1. 对关键路径进行分析和特性描述：资源数、字节数、长度。
1. 最大限度减少关键资源的数量：删除它们，延迟它们的下载，将它们标记为异步等。
1. 优化关键字节数以缩短下载时间（往返次数）。
1. 优化其余关键资源的加载顺序：您需要尽早下载所有关键资产，以缩短关键路径长度。

<a href="page-speed-rules-and-recommendations" class="gc-analytics-event"
    data-category="CRP" data-label="Next / PageSpeed">
  <button>下一课：PageSpeed 规则和建议</button>
</a>


{# wf_devsite_translation #}
