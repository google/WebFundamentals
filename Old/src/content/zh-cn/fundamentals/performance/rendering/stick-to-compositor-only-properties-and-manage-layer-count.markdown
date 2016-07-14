---
title: "优先使用渲染层合并属性、控制层数量"
description: "渲染层的合并，就是把页面中完成了绘制过程的部分合并成一层，然后显示在屏幕上。"
updated_on: 2015-03-20
translators:
  - samchen
notes:
  flip:
    - "如果你担心无法仅靠那些transform/opacity属性来实现你需要的动画效果，也许这篇文章能帮帮你：<a href=\"http://aerotwist.com/blog/flip-your-animations\">FLIP principle</a>。"

key-takeaways:
  - 只使用transform/opacity来实现动画效果
  - 用`will-change`/`translateZ`属性把动画元素提升到单独的渲染层中
  - 避免滥用渲染层提升：更多的渲染层需要更多的内存和更复杂的管理

---
<p class="intro">
  渲染层的合并，就是把页面中完成了绘制过程的部分合并成一层，然后显示在屏幕上。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

在这部分内容中有两个关键点：需要管理的渲染层的数量、实现动画效果的样式属性。

## 使用transform/opacity实现动画效果
从性能方面考虑，最理想的渲染流水线是没有布局和绘制环节的，只需要做渲染层的合并即可：

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-no-layout-paint.jpg" class="g--centered" alt="The pixel pipeline with no layout or paint.">

为了实现上述效果，你需要对元素谨慎使用会被修改的样式属性，只能使用那些仅触发渲染层合并的属性。目前，只有两个属性是满足这个条件的：**transforms**和**opacity**：

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/safe-properties.jpg" class="g--centered" alt="The properties you can animate without triggering layout or paint.">

上图底部的那句提示语的意思是，应用了transforms/opacity属性的元素必须_独占一个渲染层_。为了对这个元素创建一个自有的渲染层，你必须提升该元素。接下来我们来看看如何把一个元素提升到单独的渲染层中。

{% include shared/remember.liquid title="Note" list=page.notes.flip %}

## 提升动画效果中的元素

在本系列中的“[简化绘制的复杂度、减小绘制区域](simplify-paint-complexity-and-reduce-paint-areas)”中我们曾经提到过， 你应该把动画效果中的元素提升到其自有的渲染层中（但不要滥用）：

{% highlight css %}
.moving-element {
  will-change: transform;
}
{% endhighlight %}

或者，对于旧版本或不支持will-change属性的浏览器：

{% highlight css %}
.moving-element {
  transform: translateZ(0);
}
{% endhighlight %}

使用这个CSS属性能提前告知浏览器：这个元素将会执行动画效果。从而浏览器可以提前做一些准备，比如为这个元素创建一个新的渲染层。

## 管理渲染层、避免过多数量的层

看完了上面的部分，你学习到了为动画元素创建新的渲染层将会达到更好的性能。这看上去非常诱人，以致于你准备对页面中所有元素都这么处理：

{% highlight css %}
* {
  will-change: transform;
  transform: translateZ(0);
}
{% endhighlight %}

上面这段代码意味着你想对页面中每个元素都创建一个自有的渲染层。问题是，创建一个新的渲染层并不是免费的，它得消耗额外的内存和管理资源。实际上，在内存资源有限的设备上，由于过多的渲染层来带的开销而对页面渲染性能产生的影响，甚至远远超过了它在性能改善上带来的好处。由于每个渲染层的纹理都需要上传到GPU处理，因此我们还需要考虑CPU和GPU之间的带宽问题、以及有多大内存供GPU处理这些纹理的问题。

简而言之，**当且仅当需要的时候才为元素创建渲染层**。

## 使用Chrome DevTools来了解页面中的渲染层的情况

为了了解页面中的渲染层的情况，以及为什么某个DOM元素会有单独的一个渲染层的问题，你需要在Chrome DevTools的Timeline面板中开启Paint选项：

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/paint-profiler.jpg" class="g--centered" alt="The toggle for the paint profiler in Chrome DevTools.">

开启之后，就可以对页面进行渲染性能采样了。当采样过程结束之后，你就能在frames-per-second横条上点击每一个单独的帧，看到每个帧的渲染细节：

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/frame-of-interest.jpg" class="g--centered" alt="A frame the developer is interested in profiling.">

点击之后，你就会在视图中看到一个新的选项卡：Layers。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-tab.jpg" class="g--centered" alt="The layer tab button in Chrome DevTools.">

点击这个Layers选项卡，你会看到一个新的视图。在这个视图中，你可以对这一帧中的所有渲染层进行扫描、缩放等操作，同时还能看到每个渲染层被创建的原因。

<img src="images/stick-to-compositor-only-properties-and-manage-layer-count/layer-view.jpg" class="g--centered" alt="The layer view in Chrome DevTools.">

有了这个视图，你就能知道页面中到底有多少个渲染层。如果你在对页面滚动或渐变效果的性能分析中发现渲染层的合并过程耗费了太多时间（相对于**4-5毫秒**的预期），那么你可以从这个视图里看到页面中有多少个渲染层，它们为何被创建，从而对渲染层的数量进行优化。


