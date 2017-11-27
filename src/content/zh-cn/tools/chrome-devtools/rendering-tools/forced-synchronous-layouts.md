project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:请遵循此互动指南，了解如何使用 DevTools 诊断强制同步布局。

{# wf_updated_on: 2016-03-31 #}
{# wf_published_on: 2015-04-13 #}

# 诊断强制同步布局 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

了解如何使用 DevTools 诊断强制同步布局。


在本指南中，您将学习如何通过确定和解决实时演示中的问题调试[强制同步布局][fsl]。
演示使用 [`requestAnimationFrame()`][raf] 对图像进行动画处理，这是处理基于帧的动画的推荐方法。不过，动画中会有大量的卡顿。
您的目标是确定卡顿的原因并解决问题，以便演示以流畅的 60 FPS 运行。
 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## 收集数据

首先，您需要捕获数据，以便准确了解页面运行时会发生什么。
 

1. 打开[演示](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html)。
1. 打开 DevTools 的 **Timeline** 面板。
1. 启用 **JS Profile** 选项。稍后分析火焰图时，您可以通过此选项准确地查看调用了哪些函数。

1. 点击页面上的 **Start** 启动动画。
1. 点击 Timeline 面板上的 **Record** 按钮启动 Timeline 记录。

1. 等待两秒。
1. 再次点击 **Record** 按钮停止记录。 

完成记录后，您在 Timeline 面板上应看到如下所示的内容。
 

![卡顿演示的 Timeline 记录](imgs/demo-recording.png)

## 确定问题

现在，您已获取数据，可以着手弄清楚它们了。 

您可以在 Timeline 记录的 **Summary** 窗格中一眼看出浏览器在渲染上花费的时间最多。
一般来说，如果您可以[优化页面布局操作][layout]，就可以减少花费在渲染上的时间。

 

![Timeline 摘要](imgs/summary.png)

现在，请将注意力转移到 **Overview** 窗格下方的粉色条形上。
这些表示帧。将鼠标悬停在上面可以查看与帧相关的更多信息。


![长时间帧](imgs/long-frame.png)

完成这些帧需要较长的时间。要使动画流畅，您需要达到 60 FPS。
 

现在，可以准确地诊断哪里出错了。使用您的鼠标，在调用堆栈上[放大][zoom]。
 

![缩放的 Timeline 记录](imgs/zoom.png)

堆栈的顶端是 `Animation Frame Fired` 事件。只要触发此事件，就会调用传递至 `requestAnimationFrame()` 的函数。在 `Animation Frame Fired` 下方，您会看到 `Function Call`，在它的下方，您会看到 `update`。您可以推断名为 `update()` 的方法是 `requestAnimationFrame()` 的回调。
 

注：这是您之前启用 **JS Profile** 选项的作用。
如果停用，您就会看到 `Function Call`，后面是所有紫色小事件（稍后介绍），不包含具体调用了哪些函数的详情。



现在，请将注意力转移到 `update` 事件下方的所有紫色小事件上。
许多这些事件的顶部为红色。那是警告标志。
将鼠标悬停在这些事件上方，您会看到 DevTools 在警告您页面可能会被强制自动重排。
强制自动重排是强制同步布局的另一种说法。
 

![鼠标指针悬停在 layout 事件上](imgs/layout-hover.png)

现在，可以看一下导致全部强制同步布局的函数。
点击其中一个布局事件可以选择它。现在，在 Summary 窗格中，您会看到与此事件有关的详细信息。
点击 **Layout Forced** (`update @ forcedsync.html:457`) 下面的链接跳转到函数定义。



![跳转到函数定义](imgs/jump.png)

现在，您在 **Sources** 面板中应看到函数定义。 

![Sources 面板中的函数定义](imgs/definition.png)

`update()` 函数是 `requestAnimationCallback()` 的回调处理程序。
处理程序会根据每个图像的 `offsetTop` 值计算其 `left` 属性。
这将强制浏览器立即执行新布局，以便确保其提供正确的值。在每个动画帧期间强制布局是导致页面上出现动画卡顿的原因。
 

现在，您已经确定了问题，可以尝试在 DevTools 中直接解决问题。


[layout]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## 在 DevTools 中应用修复

此脚本内已嵌入 HTML，因此，您无法通过 **Sources** 面板对其进行编辑（不过，可以在 Sources 面板中编辑格式为 `*.js` 的脚本）。
 

不过，要测试您的更改，可以在 Console 中重新定义函数。从 HTML 文件复制函数定义，并将其粘贴到 DevTools 的 Console 中。删除使用 `offsetTop` 的语句并取消注释其下面的语句。
完成后，按 `Enter`。 

![重新定义有问题的函数](imgs/redefinition.png)

重启动画。您可以直观地验证现在顺畅多了。 

## 使用另一个记录验证

最好使用另一个记录来验证动画确实比之前更快且性能更好。
 

![优化后的 Timeline 记录](imgs/after.png)

效果好多了。


{# wf_devsite_translation #}
