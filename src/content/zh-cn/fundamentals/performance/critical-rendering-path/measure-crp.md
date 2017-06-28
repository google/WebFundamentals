project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:学习评估关键渲染路径。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2014-03-31 #}

# 评估关键渲染路径 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

作为每个可靠性能策略的基础，准确的评估和检测必不可少。
无法评估就谈不上优化。本文说明了评估 CRP 性能的不同方法。


* Lighthouse 方法会对页面运行一系列自动化测试，然后生成关于页面的 CRP 性能的报告。
这一方法对您的浏览器中加载的特定页面的 CRP 性能提供了快速且简单的高级概览，让您可以快速地测试、循环访问和提高其性能。
* Navigation Timing API 方法会捕获[真实用户监控 (RUM)](https://en.wikipedia.org/wiki/Real_user_monitoring) 指标。如名称所示，这些指标捕获自真实用户与网站的互动，并为真实的 CRP 性能（您的用户在各种设备和网络状况下的体验）提供了准确的信息。




通常情况下，最好利用 Lighthouse 发现明显的 CRP 优化机会，然后使用 Navigation Timing API 设置您的代码，以便监控应用在实际使用过程中的性能。



## 使用 Lighthouse 审核页面 {: #lighthouse }

Lighthouse 是一个网络应用审核工具，可以对特定页面运行一系列测试，然后在汇总报告中显示页面的结果。
您可以将 Lighthouse 作为 Chrome 扩展程序或 NPM 模块运行，这对将 Lighthouse 与持续集成系统集成非常有用。



请参阅[使用 Lighthouse 审核网络应用](/web/tools/lighthouse/)，开始使用 Lighthouse。

您将 Lighthouse 作为 Chrome 扩展程序运行时，页面的 CRP 结果将如以下屏幕截图所示。


![Lighthouse 的 CRP 审核](images/lighthouse-crp.png)

请参阅[关键请求链][crc]，了解此审核结果的详细信息。


[crc]: /web/tools/lighthouse/audits/critical-request-chains

## 使用 Navigation Timing API 设置您的代码 {: #navigation-timing }

结合使用 Navigation Timing API 和页面加载时发出的其他浏览器事件，您可以捕获并记录任何页面的真实 CRP 性能。



<img src="images/dom-navtiming.png"  alt="Navigation Timing">

上图中的每一个标签都对应着浏览器为其加载的每个网页追踪的细粒度时间戳。实际上，在这个具体例子中，我们展示的只是各种不同时间戳的一部分。我们暂且跳过所有与网络有关的时间戳，但在后面的课程中还会做详细介绍。

那么，这些时间戳有什么含义呢？

* `domLoading`：这是整个过程的起始时间戳，浏览器即将开始解析第一批收到的 HTML 文档字节。
* `domInteractive`：表示浏览器完成对所有 HTML 的解析并且 DOM 构建完成的时间点。
* `domContentLoaded`：表示 DOM 准备就绪并且没有样式表阻止 JavaScript 执行的时间点，这意味着现在我们可以构建渲染树了。
    * 许多 JavaScript 框架都会等待此事件发生后，才开始执行它们自己的逻辑。因此，浏览器会捕获 `EventStart` 和 `EventEnd` 时间戳，让我们能够追踪执行所花费的时间。
* `domComplete`：顾名思义，所有处理完成，并且网页上的所有资源（图像等）都已下载完毕，也就是说，加载转环已停止旋转。
* `loadEvent`：作为每个网页加载的最后一步，浏览器会触发 `onload` 事件，以便触发额外的应用逻辑。

HTML 规范中规定了每个事件的具体条件：应在何时触发、应满足什么条件等等。对我们而言，我们将重点放在与关键渲染路径有关的几个关键里程碑上：

* `domInteractive` 表示 DOM 准备就绪的时间点。
* `domContentLoaded` 一般表示 [DOM 和 CSSOM 均准备就绪](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)的时间点。
    * 如果没有阻塞解析器的 JavaScript，则 `DOMContentLoaded` 将在 `domInteractive` 后立即触发。
* `domComplete` 表示网页及其所有子资源都准备就绪的时间点。


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[试一下](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

上面的例子乍一看可能有点晕，但实际上的确相当简单。Navigation Timing API 捕获所有相关时间戳，而我们的代码只是等待 `onload` 事件触发 - 回想一下，`onload` 事件在`domInteractive`、`domContentLoaded` 和 `domComplete` 之后触发 - 然后计算各个时间戳之间的间隔。

<img src="images/device-navtiming-small.png"  alt="NavTiming 演示">

完成了所有该做的工作，我们现在知道了需要追踪哪些具体的里程碑，以及用于输出这些评估的简单功能。请注意，除了将这些评估结果显示在网页上，您还可以修改代码，将这些评估结果发送到分析服务器上（[Google Analytics（分析）会自动完成这项工作](https://support.google.com/analytics/answer/1205784)），这是一种监控网页性能的好方法，可以借此找出哪些网页还需要作出进一步优化。

## DevTools 怎么样呢？{: #devtools }

尽管本文档使用 Chrome DevTools 的 Network 面板说明 CRP 概念，DevTools 当前并不非常适合 CRP 评估，因为它没有隔离关键资源的内置机制。运行 [Lighthouse](#lighthouse) 审核来帮助识别此类资源。


<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>下一课：分析关键渲染路径性能</button>
</a>


{# wf_devsite_translation #}
