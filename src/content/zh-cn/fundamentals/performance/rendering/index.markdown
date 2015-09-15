---
title: "渲染性能"
description: "页面渲染性能的优化非常重要！如果你的网站渲染很慢，用户马上就会注意到。"
updated_on: 2015-03-20
translators:
  - samchen
notes:
  csstriggers:
    如果你想对哪些属性会触发<a href="http://csstriggers.com">CSS Triggers</a>和高性能动画方面了解更多，请参考：<a href="stick-to-compositor-only-properties-and-manage-layer-count">使用渲染层合并属性</a>。
  rasterize:
    "你可能听说过 \"rasterize\" 这个术语，它通常被用在绘制过程中。绘制过程本身包含两步: ：1）创建一系列draw调用；2）填充像素。

    第二步的过程被称作 \"rasterization\" 。因此当你在DevTools中查看页面的paint记录时，你可以认为它已经包含了 rasterization。（有些浏览器会使用不同的线程来完成这两步，不过这也不是web开发者能控制的了）"
udacity:
  id: ud860
  title: 浏览器渲染优化
  description: "想深入了解渲染性能吗？快看看这堂课程吧！它能帮助你了解浏览器是如何把HTML/CSS/JavaScript代码转换成屏幕上你看到的一个个像素的、如何使用DevTools来测量页面性能、以及如何优化你的页面渲染速度。"
  image: images/rp-udacity.jpg
---
<p class="intro">
  用户都 <a href=\"http://paul.kinlan.me/what-news-readers-want/\">希望他们访问的web应用是可交互且运行流畅的</a>。因此，作为web开发者，你也要在这方面多花点功夫。你所做的页面，不但要能被快速加载，还要能流畅运行：页面的滚动要快速响应手指的动作，动画和交互效果更要如丝般顺滑。
</p>

<img src="images/intro/response.jpg" class="center" alt="User interacting with a website.">

要想编写高性能的web站点或应用，你需要充分了解浏览器是如何处理HTML/JavaScript/CSS的，从而确保你写的代码（或引用的第三方代码）是尽可能高效的。

## 60fps和设备刷新率

当今大多数设备的屏幕刷新率都是 **60次/秒** 。因此，如果在页面中有一个动画或渐变效果，或者用户正在滑动页面，那么浏览器渲染动画或页面的每一帧的速率，也需要跟设备屏幕的刷新率保持一致。

也就是说，浏览器对每一帧画面的渲染工作需要在16毫秒（1秒 / 60 = 16.66毫秒）之内完成。但实际上，在渲染某一帧画面的同时，浏览器还有一些额外的工作要做（比如渲染队列的管理，渲染线程与其他线程之间的切换等等）。因此单纯的渲染工作，一般需要控制在10毫秒之内完成，才能达到流畅的视觉效果。如果超过了这个时间限度，页面的渲染就会出现卡顿效果，也就是常说的jank，它是很糟糕的用户体验。

## 像素渲染流水线
在编写web页面时，你需要理解你所写的页面代码是如何被转换成屏幕上显示的像素的。这个转换过程可以归纳为这样的一个流水线，包含五个关键步骤：

<img src="images/intro/frame-full.jpg" class="center" alt="The full pixel pipeline">

* **JavaScript**。一般来说，我们会使用JavaScript来实现一些视觉变化的效果。比如用jQuery的`animate`函数做一个动画、对一个数据集进行排序、或者往页面里添加一些DOM元素等。当然，除了JavaScript，还有其他一些常用方法也可以实现视觉变化效果，比如：CSS Animations, Transitions和Web Animation API。
* **计算样式**。这个过程是根据CSS选择器，比如`.headline`或`.nav > .nav_item`，对每个DOM元素匹配对应的CSS样式。这一步结束之后，就确定了每个DOM元素上该应用什么CSS样式规则。
* **布局**。上一步确定了每个DOM元素的样式规则，这一步就是具体计算每个DOM元素最终在屏幕上显示的大小和位置。web页面中元素的布局是相对的，因此一个元素的布局发生变化，会联动地引发其他元素的布局发生变化。比如，`<body>`元素的宽度的变化会影响其子元素的宽度，其子元素宽度的变化也会继续对其孙子元素产生影响。因此对于浏览器来说，布局过程是经常发生的。
* **绘制**。绘制，本质上就是填充像素的过程。包括绘制文字、颜色、图像、边框和阴影等，也就是一个DOM元素所有的可视效果。一般来说，这个绘制过程是在多个层上完成的。
* **渲染层合并**。由上一步可知，对页面中DOM元素的绘制是在多个层上进行的。在每个层上完成绘制过程之后，浏览器会将所有层按照合理的顺序合并成一个图层，然后显示在屏幕上。对于有位置重叠的元素的页面，这个过程尤其重要，因为一旦图层的合并顺序出错，将会导致元素显示异常。

上述过程的每一步中都有发生jank的可能，因此一定要弄清楚你的代码将会运行在哪一步。

{% include shared/remember.liquid title="Note" list=page.notes.rasterize %}

虽然在理论上，页面的每一帧都是经过上述的流水线处理之后渲染出来的，但并不意味着页面每一帧的渲染都需要经过上述五个步骤的处理。实际上，对视觉变化效果的一个帧的渲染，有这么三种 _常用的_ 流水线：

### 1. JS / CSS > 计算样式 > 布局 > 绘制 > 渲染层合并

<img src="images/intro/frame-full.jpg" class="center" alt="The full pixel pipeline">

如果你修改一个DOM元素的”layout”属性，也就是改变了元素的样式（比如宽度、高度或者位置等），那么浏览器会检查哪些元素需要重新布局，然后对页面激发一个reflow过程完成重新布局。被reflow的元素，接下来也会激发绘制过程，最后激发渲染层合并过程，生成最后的画面。

### 2. JS / CSS > 计算样式 > 绘制 > 渲染层合并

<img src="images/intro/frame-no-layout.jpg" class="center" alt="The  pixel pipeline without layout.">

如果你修改一个DOM元素的“paint only”属性，比如背景图片、文字颜色或阴影等，这些属性不会影响页面的布局，因此浏览器会在完成样式计算之后，跳过布局过程，只做绘制和渲染层合并过程。

### 3. JS / CSS > 计算样式 > 渲染层合并

<img src="images/intro/frame-no-layout-paint.jpg" class="center" alt="The pixel pipeline without layout or paint.">

如果你修改一个非样式且非绘制的CSS属性，那么浏览器会在完成样式计算之后，跳过布局和绘制的过程，直接做渲染层合并。

第三种方式在性能上是最理想的，对于动画和滚动这种负荷很重的渲染，我们要争取使用第三种渲染流程。

{% include shared/remember.liquid title="Note" list=page.notes.csstriggers %}

性能优化是一门做减法的艺术。我们首要要尽力简化页面渲染过程，然后要使渲染过程的每一步都尽量高效。在很多时候，我们需要跟浏览器一起努力来创建高性能web应用，而不是跟浏览器对着干。要记住，以上列举的流水线中的每一步，在时间消耗上是各不相同的，有些步骤是相对更费时的。

接下来，让我们深入到这个流水线中的每一步去看看。我们会以一些常见问题为例，阐述如何发现和分析这些问题，并尝试去解决它们。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}

