---
layout: article
title: "简化描绘的复杂度、减小描绘区域"
description: "描绘，是填充像素的过程，这些像素将最终显示在用户的屏幕上。通常，这个过程是整个渲染流水线中耗时最长的一环，因此也是最需要避免发生的一环。"
introduction: "描绘，是填充像素的过程，这些像素将最终显示在用户的屏幕上。通常，这个过程是整个渲染流水线中耗时最长的一环，因此也是最需要避免发生的一环。"
article:
  written_on: 2015-03-20
  updated_on: 2015-03-20
  order: 4
collection: rendering-performance
priority: 0
authors:
  - paullewis
notes:
  highdpi:
    - "在DPI较高的屏幕上，固定定位的元素会自动地被提升到一个它自有的渲染层中。但在DPI较低的设备上却并非如此，因为这个渲染层的提升会使得字体渲染方式由子像素变为灰阶（详细内容请参考：[Text Rendering](http://www.html5rocks.com/en/tutorials/internals/antialiasing-101/?redirect_from_locale=zh#toc-text-rendering)），我们需要手动实现渲染层的提升。"

key-takeaways:
  - 除了transform和opacity之外，修改任何属性都会触发描绘
  - 一般情况下，描绘是整个渲染流水线中代价最高的环节，要尽可能避免它
  - 通过渲染层提升和仔细规划动画渲染来减小描绘区域
  - 使用Chrome DevTools的来检测描绘复杂度和时间消耗；尽可能降低这些指标


---
{% wrap content%}

{% include modules/takeaway.liquid list=page.key-takeaways %}

如果布局被触发，那么描绘_一定_会被触发。因为改变一个元素的几何属性就意味着该元素的所有像素都需要重新渲染！

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame.jpg" class="g--centered" alt="The full pixel pipeline.">

除此之外，改变元素的非几何属性，也可能触发描绘。比如背景、文字颜色或者阴影效果。这些属性的改变不会触发布局，整个渲染流水线会像下图所示：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/frame-no-layout.jpg" class="g--centered" alt="The pixel pipeline without layout.">

## 使用Chrome DevTools来迅速定位描绘瓶颈

使用Chrome DevTools能够迅速定位出当前页面中正在进行描绘的区域。打开DevTools，按下键盘的ESC键。在弹出的面板中，选中rendering选项卡，然后选中“Show paint rectangles”：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles.jpg" class="g--centered" alt="The show paint rectangles option in DevTools.">

打开了Chrome的这个选项之后，每当页面中有描绘发生时，屏幕上就会闪现绿色的方框。如果你看到绿色方框覆盖了整个屏幕，或者覆盖了一些你觉得不应该发生描绘的区域，那么很可能这次描绘是可以被优化的，你就需要看看这次描绘的更多细节了。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/show-paint-rectangles-green.jpg" class="g--centered" alt="The page flashing green whenever painting occurs.">

Chrome DevTools中有一个选项能让你看到更多关于描绘的细节：描绘分析器。打开DevTools的Timeline选项卡，选中面板顶部的“Paint”选项，你就开启了描绘分析器。需要注意的是，请_仅在需要分析描绘问题的时候开启该选项_。因为运行描绘分析器本身也会耗费浏览器的资源，对页面性能分析结果多少会有点影响。最好是按需启用它，而不是一直让它开启着。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-toggle.jpg" class="g--centered" alt="The toggle to enable paint profiling in Chrome DevTools.">

完成了上述设置之后，你就可以对页面进行性能分析了。运行Timeline记录功能，你就会记录到相当详细的描绘记录信息。在某一帧的记录上点击paint记录，你就会看到这一帧的描绘分析结果：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler-button.jpg" class="g--centered" alt="The button to bring up the paint profiler.">

点击paint profiler，会打开一个视图，里面会显示描绘了哪些元素、花了多长时间、以及每个具体的paint调用：

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/paint-profiler.jpg" class="g--centered" alt="Chrome DevTools Paint Profiler.">

这个分析器能让你了解描绘区域和描绘复杂度（体现为花费了多长时间），这两个方面正好是你可以对描绘做优化的地方（当然我们首先得努力避免描绘的发生，在无法避免的情况下才对描绘做优化）。

## 提升移动或渐变元素的描绘层

描绘不总是在内存中的单张图片里完成的。实际上，浏览器在必要时将会把一帧描绘成多张图片，然后将这些图片组合成一张图片显示到屏幕上。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/layers.jpg" class="g--centered" alt="A representation of compositor layers.">

这种描绘方式的好处是，使用tranforms来实现移动效果的元素将会被正常描绘，同时还不会导致其他元素也被描绘。这种处理方式和思想跟图像处理软件（比如Sketch/GIMP/Photoshop）是一致的，它们都是可以在单个图层上做操作，最后合并所有图层得到最终的图像。

在页面中创建一个新的渲染层的最好方式就是使用CSS属性`will-change`，Chrome/Opera/Firefox都支持该属性。同时再与`transform`属性一起使用，就会创建一个新的组合层：

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

对于那些目前还不支持`will-change`属性、但支持创建渲染层的浏览器，比如Safari和Mobile Safari，你可以使用一个3D transform属性来强制浏览器创建一个新的渲染层：

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

但需要注意的是，不要创建太多的渲染层，因为每创建一个新的渲染层，以为着新的内存分配和层的管理变复杂。关于这方面的更多信息，请参考[Stick to compositor-only properties and manage layer count](stick-to-compositor-only-properties-and-manage-layer-count)。

如果你已经把一个元素放到一个新的渲染层里，使用DevTools来确认这么做是否真的改进了渲染性能。**别盲目创建渲染层，一定要分析其实际性能表现**。

## 减少描绘区域

有时候尽管把元素提升到了一个单独的渲染层，渲染工作依然是必须的。渲染问题中一个比较有挑战的问题是，浏览器会把两个相邻区域的渲染任务合并在一起进行，这将导致整个屏幕区域都会被描绘。比如，你的页面顶部有一个固定位置的header，而此时屏幕底部有某个区域正在发生描绘的话，整个屏幕都将会被描绘。

{% include modules/remember.liquid title="Note" list=page.notes.highdpi %}

减少描绘区域通常需要对动画和转移效果进行精密设计，以保证各自区域之间不会有太多重叠，或者想办法避免对页面中某些区域执行动画效果。

## 简化描绘的复杂度
在描绘所涉及的一些问题中，有些问题是相对更耗费昂贵的。比如，描绘一个blur效果（比如阴影）就比描绘其他效果（比如一个红色方框）更费时。然而，在CSS方面，这些问题并非都是显而易见的：`background: red`和`box-shadow: 0, 4px, 4px, rgba(0,0,0,0.5);`可能看上去在性能方面没有太大的差别，但事实却并非如此。

<img src="images/simplify-paint-complexity-and-reduce-paint-areas/profiler-chart.jpg" class="g--centered" alt="The time taken to paint part of the screen.">

上面提到的描绘分析器能让你意识到是否该问问自己：有没有其他的方式（比如其他的样式修改方案）来实现同样的效果，却能达到更好的性能。

你应该要尽可能的避免描绘的发生，特别是在动画效果中。因为每帧**10毫秒**的预算一般来说是不足以完成描绘工作的，尤其是在移动设备上。

{% include modules/nextarticle.liquid %}

{% endwrap%}
