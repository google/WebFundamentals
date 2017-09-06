project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“预计输入延迟时间”Lighthouse 审查的参考文档。

{# wf_updated_on:2016-10-05 #}
{# wf_published_on:2016-10-05 #}

# 预计输入延迟时间 {: .page-title }

## 为什么说此审查非常重要{: #why }

输入响应能力对用户如何看待您应用的性能起着关键作用。
应用有 100 毫秒的时间响应用户输入。如果超过此时间，用户就会认为应用反应迟缓。
如需了解详细信息，请参阅[使用 RAIL 模型测量性能](/web/fundamentals/performance/rail)。


有关为什么此审查测试的目标得分是 50 毫秒（而不是 RAIL 模型建议的 100 毫秒）的解释，请参阅本文档的[此审查测试的目的](#what)部分。



## 如何通过此审查{: #how }

要使您的应用更快地响应用户输入，您需要优化您的代码在浏览器中的运行方式。
请查看[渲染性能](/web/fundamentals/performance/rendering/)文档中列出的一系列技巧。这些技巧包括将计算转移到网络工作线程以腾出主线程、重构 CSS 选择器以执行较少的计算，以及使用 CSS 属性，其可将浏览器密集型的操作数降至最低。




对于此审查，需要特别注意的一点是它不能完整测量输入延迟时间。
正如本文档的[此审查测试的目的](#what)部分所述，此审查不会测量您的应用真正花了多少时间来响应用户输入。换句话说，它不会测量您的应用对用户输入的响应在视觉上是否完整。


要手动对此进行测量，请使用 Chrome DevTools Timeline 进行录音。
请参阅[如何使用 Timeline 工具](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)以获取更多帮助。

基本思路是启动一个录制、执行您要测量的用户输入、停止录制，然后分析火焰图以确保[像素管道](/web/fundamentals/performance/rendering/#the_pixel_pipeline)的所有阶段都在 50 毫秒内完成。





{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

RAIL 性能模型建议应用在 100 毫秒内响应用户输入，而 Lighthouse 的目标得分是 50 毫秒。
为什么呢？

原因是 Lighthouse 使用一个代理指标来测量您的应用在响应用户输入方面的表现：主线程的可用性。
Lighthouse 假定您的应用需要 50 毫秒的时间来完全响应用户的输入（从实现任意 JavaScript 执行到以物理方式将新像素绘制到屏幕）。


如果主线程的不可用时间达 50 毫秒或更长，那么，您的应用将没有足够的时间完成响应。


用户遇到 Lighthouse 报告的输入延迟时间的可能性为 90% 或以下。
10% 的用户会出现额外的延迟。



{# wf_devsite_translation #}
