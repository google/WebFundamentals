---
title: "动画与性能"
description: "动画必须表现良好，否则将对用户体验产生负面影响。"
updated_on: 2014-10-21
key-takeaways:
  code:
    - 注意您的动画不能导致性能问题；确保了解将指定 CSS 属性设置动画的影响。
    - 改变页面（布局）结构或导致绘图的动画属性特别消耗资源。
    - 尽可能坚持改变变形和透明度。
    - 使用<code>will-change</code>来确保浏览器知道您打算对什么设置动画。

related-guides:
  blocking-css:
  -
      title: "阻止呈现的 CSS"
      href: fundamentals/performance/critical-rendering-path/render-blocking-css.html
      section:
        id: critical-rendering-path
        title: "关键呈现路径"
        href: performance/critical-rendering-path/
---
<p class="intro">
  每次在设置动画时必须注意保持 60fps，因为任何卡顿或停顿都会引起用户注意，并对体验产生负面影响。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

给属性设置动画不是免费的，给一些属性设置动画的开销比其他属性要小。 例如，给元素的`width`和`height`设置动画会改变其几何形状，并且可能导致页面上的其他元素移动或改变大小。 此过程称为布局（在 Firefox 等基于 Gecko 的浏览器中称为重排），如果页面有很多元素，则可能开销很大。 每当触发布局时，页面或其一部分通常需要进行绘制，这一般比布局操作本身更消耗资源。

应尽可能避免给触发布局或绘制的属性设置动画。 对于大部分现代浏览器，这意味着将动画限制为`opacity`或`transform`，两种都可经浏览器高度优化；动画由 JavaScript 还是由 CSS 处理并不重要。

有关单个 CSS 属性触发的动作的完整列表，请参考[CSS触发器](http://csstriggers.com)，还可以[在 HTML5 Rocks 上找到有关创建高性能动画](http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)的完整指南。

{% include shared/related_guides.liquid inline=true list=page.related-guides.blocking-css %}

### 使用 will-change 属性

可以使用 [`will-change`](http://dev.w3.org/csswg/css-will-change/) 来确保浏览器知道您打算改变元素的属性。 这使浏览器能够在您做出更改之前，进行最合适的优化。 但是必须注意，不要过度使用`will-change`，因为它可能导致浏览器浪费资源，从而导致更多性能问题。

一般经验法则是，如果动画可能在接下来的 200 毫秒内触发（由用户交互触发或由应用的状态触发），则对动画元素使用 will-change 是个好主意。 对于大多数情况，在应用的当前视图中您打算设置动画的任何元素都应启用`will-change`，无论您打算改变哪个属性。 在我们在之前的指南中一直使用的方框示例中，为变形和透明度加上`will-change`属性将产生如下结果：

{% highlight css %}
.box {
  will-change: transform, opacity;
}
{% endhighlight %}

现在支持此属性的浏览器有 Chrome、Firefox 和 Opera，这些浏览器将在后台进行相应的优化，以支持这些属性的更改或动画。

## CSS 对比 JavaScript 的性能

网络上有很多网页和评论从性能的角度讨论了 CSS 和 JavaScript 动画的相对优点。 以下是要记住的几个要点：

* 基于 CSS 的动画一般由浏览器“主线程”之外的独立线程处理，在其中执行样式、布局、绘制和 JavaScript。 这意味着，如果浏览器正在主线程上运行一些高开销任务，则基于 CSS 的动画可以继续运行而不中断。 在许多情况下，变形和透明度的更改可由处理 CSS 动画的相同线程（称为“组合线程”）来处理，因此，您最好应坚持使用这些属性来设置动画。
* 如果任何动画触发绘制、布局或同时触发这两者，则“主线程”将必须执行工作。 这点同时适用于 CSS 和 JavaScript 动画，并且布局或绘制的开销可能拖慢与 CSS 或 JavaScript 执行相关的任何工作，使问题变得无意义。

如果想准确知道给指定属性设置动画会触发哪种工作，请查看[CSS 触发器](http://csstriggers.com)了解详细信息。


