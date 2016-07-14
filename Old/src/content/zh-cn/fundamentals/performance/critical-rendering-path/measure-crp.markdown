---
title: "使用 Navigation Timing 评估关键呈现路径"
description: "无法评估就谈不上优化。幸运的是，Navigation Timing API 提供了所有必备工具来评估关键呈现路径的每个步骤！"
updated_on: 2014-09-18
key-takeaways:
  measure-crp:
    - Navigation Timing 为评估关键呈现路径提供了细粒度的时间戳。
    - 浏览器发出一系列可捕获的事件，捕获关键呈现路径的不同阶段。
---

<p class="intro">
  无法评估就谈不上优化。幸运的是，Navigation Timing API 提供了所有必备工具来评估关键呈现路径的每个步骤！
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.measure-crp %}

作为每个有效性能策略的基础，准确的评估和检测必不可少。这也就是 Navigation Timing API 所提供的。

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

上图中的每一个标签对应着浏览器为加载的每个网页跟踪的细粒度时间戳。实际上，在这个具体的例子中，我们只展现了各种不同的时间戳中的一部分而已 - 我们暂且跳过所有与网络有关的时间戳，但是在后面的课程中还会详细介绍。

那么，这些时间戳到底有什么含义呢？

* **domLoading：**这是整个过程开始的时间戳，浏览器开始解析 HTML 文档第一批收到的字节
  document.
* **domInteractive：**标记浏览器完成解析并且所有 HTML 和 DOM 构建完毕的时间点。
* **domContentLoaded：**标记 DOM 准备就绪并且没有样式表阻碍 JavaScript 执行的时间点 - 意味着我们可以开始构建呈现树了。
    * 很多 JavaScript 框架等待此事件发生后，才开始执行它们自己的逻辑。因此，浏览器会通过捕获 _EventStart_ 和 _EventEnd_ 时间戳，跟踪执行逻辑所需的时间。
* **domComplete：** 顾名思义，所有的处理完成，网页上所有资源（图片等） 下载完成 - 即加载旋转图标停止旋转。
* **loadEvent：**作为每个网页加载的最后一步，浏览器会触发`onLoad`事件，以便触发附加的应用逻辑。

HTML 规范中指明了每一个事件的具体条件：什么时候触发，什么条件触发等等。在我们的教程中，会重点着眼于与关键呈现路径有关的一些关键里程碑：

* **domInteractive** 标记 DOM 准备就绪。
* **domContentLoaded** 通常标记 [DOM 和 CSSOM 都准备就绪] 的时间 (http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)。
    * 如果没有解析器阻塞 JavaScript，_DOMContentLoaded_ 会在 _domInteractive_ 之后立即触发。
* **domComplete** 标记网页及其所有附属资源都已经准备就绪的时间。

^

{% include_code src=_code/measure_crp.html snippet=full lang=html %}

上面的例子乍一看可能有点晕，但是它确实已经很简单了。Navigation Timing API 捕获所有相关的时间戳，而我们的代码只是等待 `onload` 事件触发 - 回忆一下，onLoad 事件在 domInteractive、domContentLoaded 和 domComplete 之后触发 - 然后计算各个时间戳之间的间隔。
<img src="images/device-navtiming-small.png" class="center" alt="NavTiming 演示">

通过上面的介绍和示例，我们现在知道了要跟踪哪些具体的里程碑以及用于输出这些评估结果的简单功能。注意，除了直接将评估结果显示在网页上，还可以修改代码，将这些评估结果发送到分析服务器上。（[Google Analytics 可以自动完成这些功能](https://support.google.com/analytics/answer/1205784?hl=en)），这是一种很有效的监控网页性能的方法，可以由此找出哪些网页还需要进一步优化性能。</cf>



