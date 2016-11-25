project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSSOM 树与 DOM 树融合成一棵渲染树，随后计算每个可见元素的布局，并输出给绘制过程，在屏幕上渲染像素。优化这里的每一步对实现最佳渲染性能至关重要。

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 渲染树构建、布局及绘制 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Translated By: 

{% include "web/_shared/contributors/samchen.html" %}



CSSOM 树与 DOM 树融合成一棵渲染树，随后计算每个可见元素的布局，并输出给绘制过程，在屏幕上渲染像素。优化这里的每一步对实现最佳渲染性能至关重要。


在前面的章节中，我们介绍了对象模型的构建，我们根据输入的 HTML 与 CSS 构建 DOM 树及 CSSOM 树。不过，它们是相互独立的对象，分别涵盖文档的不同面：一个描述内容，另一个描述应用于文档的样式规则。我们怎样合并它们然后让浏览器在屏幕上渲染像素呢？

### TL;DR {: .hide-from-toc }
- DOM 树与 CSSOM 树融合成渲染树。
- 渲染树只包括渲染页面需要的节点。
- 布局计算每个对象的精确位置及尺寸。
- 最后一步的绘制，输入确定的渲染树，在屏幕上渲染像素。


对浏览器来说，第一步是将 DOM 树与 CSSOM 树融合成「渲染树」，这样它既网罗页面上所有可见的 DOM 内容，又涵盖每个节点的 CSSOM 样式信息。

<img src="images/render-tree-construction.png" alt="DOM 树与 CSSOM 树融合形成渲染树" class="center">

为了构建渲染树，浏览器大致做了如下：

1. 从 DOM 树的根节点开始，遍历每个可见的节点。
  * 某些节点完全不可见（例如 script 标签、meta 标签等），因为它们不会在渲染结果中反映，所以会被忽略。
  * 某些节点通过 CSS 隐藏，因此在渲染树中也会被忽略。比方说，上面例子中的 span 节点，因为该节点有一条显式规则设置了 `display:none` 属性，所以不会出现在渲染树中。
1. 给每个可见节点找到相应匹配的 CSSOM 规则，并应用这些规则。
2. 发射可见节点，连带其内容及计算的样式。

Note: 简单提一句，注意 `visibility: hidden` 与 `display: none` 是不一样的。前者隐藏元素，但该元素在布局中仍占据空间（即被渲染成一个空盒子），而后者 (display: none) 是直接从渲染树中整个地移除元素，该元素既不可见，也不属于布局。

最终输出的渲染树包括了内容以及屏幕所有可见内容的样式信息。快要大功告成了！ **有了渲染树，我们就能进入「布局」阶段。**

到目前为止，我们已经计算了哪些节点是可见的，以及它们的计算样式，但我们还没计算它们在设备[视口](/web/fundamentals/design-and-ui/responsive/#set-the-viewport)中的准确位置与尺寸。这就是「布局」阶段（有时也称做「重排」）要做的工作。

为弄清每个对象的准确尺寸和位置，浏览器从渲染树的根节点开始遍历，以计算页面上每个对象的几何信息。下面就让我们动手做个简单例子：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
</pre>

上面页面的 body 包含两个嵌套 div：第一个 div（父元素）将节点尺寸设置为视口宽度的 50%，第二个包含在父元素中的 div 宽度为父元素的 50%，即视口宽度的 25%！

<img src="images/layout-viewport.png" alt="计算布局信息" class="center">

布局过程输出一个「盒模型」，它精确捕获每个元素在视口中的准确位置及尺寸：所有相对度量单位都被转换为屏幕上的绝对像素位置，等等。

最后，既然我们知道了哪些节点可见，它们的计算的样式以及几何信息，我们终于可以将这些信息传递给最后一个阶段，即把渲染树中的每个节点转换为屏幕上的实际像素 - 这一步通常称为「绘制」或者「栅格化」。

您都理解了吗？上述每一步都需要浏览器完成大量的工作，这也意味着它通常很耗时。所幸，Chrome DevTools 可以帮助我们深入了解上述三个阶段。让我们看一下最初的 "hello world" 示例中的布局阶段：

<img src="images/layout-timeline.png" alt="在 DevTools 中评估布局" class="center">

* Timeline 中，"Layout" 事件捕获渲染树的构建及位置、尺寸的计算。
* 一旦布局完成，浏览器便发布 'Paint Setup' 与 'Paint' 事件，将渲染树转化为屏幕上的实际像素。

渲染树的构建、布局与绘制所需的时间取决于文档大小、应用的样式，当然，还有运行文档的设备：文档越大，浏览器要完成的工作就越多；样式越复杂，绘制需要的时间就越长（例如，绘制单色成本较低，而计算、呈现阴影的成本就非常高了）。

一旦完成上述步骤，我们的页面便在视口上可见了 - 呜呼！

<img src="images/device-dom-small.png" alt="渲染的 Hello World 网页" class="center">

让我们快速回顾一下浏览器执行的所有步骤：

1. 处理 HTML 标记，构建 DOM 树。
2. 处理 CSS 标记，构建 CSSOM 树。
3. 将 DOM 树和 CSSOM 树融合成渲染树。
4. 根据渲染树来布局，计算每个节点的几何信息。
5. 在屏幕上绘制各个节点。

我们的演示页面看起来也许很简单，但也需要完成大量工作。您觉得如果修改了 DOM 或 CSSOM，会怎样呢？我们将不得不重复上述所有步骤，以确定需要在屏幕上重新渲染的像素。

**优化关键渲染路径即尽可能地缩短上述第 1 步到第 5 步耗费的总时间。** 这样，我们可以在屏幕上尽可能快地渲染内容，还可以缩短首次渲染后屏幕刷新之间的时间总量 - 也就是说，交互的内容可以有更高的刷新率。



