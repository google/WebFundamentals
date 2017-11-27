project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:自适应网页设计模式正在快速发展，但只有少数几种成熟的模式可以跨桌面设备和移动设备流畅运行

{# wf_updated_on:2014-10-20 #}
{# wf_published_on:2014-04-29 #}

# 自适应网页设计模式 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

自适应网页设计模式正在快速发展，但只有少数几种成熟的模式可以跨桌面设备和移动设备流畅运行。

自适应网页所用的大部分布局可以归类为五种模式之一：mostly fluid、column drop、layout shifter、tiny tweaks 和 off canvas。在某些情况下，页面可能使用组合模式，例如 column drop 和 off canvas。这些模式最初由 [Luke Wroblewski](http://www.lukew.com/ff/entry.asp?1514) 确定，为任何自适应页面提供了可靠的起点。



### 模式

出于简单易懂上的考虑，下面每个示例都是使用 [`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) 通过真实标记创建的，一般在主要容器 `div` 内容纳了三个内容 `div`。每个示例都先从最小的视图开始，然后在必要时加上断点。
现代浏览器[能很好地支持 flexbox 布局模式](http://caniuse.com/#search=flexbox)，尽管可能仍需要供应商前缀才能实现最佳支持。



## Mostly Fluid

Mostly fluid 模式主要由流动网格组成。在较大和中等屏幕上，它通常保持相同大小，只在更宽的屏幕上调整边距。



在较小屏幕上，流动网格使主内容自动重排，同时各列垂直排列。
此模式的一个主要优点是，在小屏幕和大屏幕之间通常只需要一个视图断点。



<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">试一下</a>

在最小的视图中，每个内容 `div` 都垂直排列。在屏幕宽度达到 600px 时，主要内容 `div` 保持 `width: 100%`，而辅助 `div` 在主要 `div` 下面显示为两列。宽度超过 800px 时，容器 `div` 变为固定宽度并在屏幕上居中。


使用此模式的网站包括：

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Column drop 

对于全宽度的多列布局，当窗口宽度太窄不能容纳内容时，Column drop 就将各列垂直排列。


最终使所有列都垂直排列。为此布局模式选择视图断点时要依据内容，并随不同设计而改变。



<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">试一下</a>

与 Mostly fluid 示例类似，内容在最小视图中垂直排列，但当屏幕宽度超过 600px 时，主要内容和辅助内容 `div` 占用屏幕的全宽度。`div` 的顺序是使用 CSS 属性的顺序进行设置的。
在 800px 时，使用全屏宽度来显示全部三个内容 `div`。


使用此模式的网站包括：

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

Layout shifter 模式是自适应性最强的模式，在多种屏幕宽度上采用多个断点。


此布局的关键是内容移动的方式，而不是自动重排并放到其他列下面。
由于每个主要视图断点之间的显著差异，其维护更复杂，并且可能涉及元素内的更改，而不只是总体内容布局的更改。



<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">试一下</a>

这个简化示例显示了 Layout shifter 模式，在较小的屏幕上内容垂直排列，但在屏幕变大时就会发生显著变化，左侧一个 `div`，右侧排列两个 `div`。



使用此模式的网站包括：

 * [Food Sense](http://foodsense.is/){: .external }
 * [Seminal 自适应设计示例](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

Tiny tweaks 只对布局进行细微的更改，例如调整字体大小、调整图像大小或对内容进行极其细微的移动。


它在单列布局上表现很好，例如单页面线性网站和文本为主的文章。

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">试一下</a>

顾名思义，使用本示例时，屏幕大小改变时发生的变化不大。当屏幕宽度增加时，字体大小和内边距也变大。


使用此模式的网站包括：

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## Off canvas

Off canvas 模式不是垂直排列内容，而是将不常用的内容（可能是导航或应用的菜单）放在屏幕之外，只在屏幕足够大时才显示。在较小屏幕上，只需点击就能显示内容。




<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">试一下</a>

此示例不是垂直排列内容，而是使用 `transform: translate(-250px, 0)` 将两个内容 `div` 隐藏在屏幕之外。然后通过给元素添加 open 类来使其可见，使用 JavaScript 来显示这些 div。
当屏幕变宽时，从元素中去掉屏幕外的定位，并且让它显示在可见视口内。



注意，在本示例中，Safari for iOS 6 和 Android 浏览器不支持 `flexbox` 的 `flex-flow: row nowrap` 功能，因此我们必须回退到绝对定位。



使用此模式的网站包括：

 * [HTML5Rocks 文章](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Facebook 的移动网站](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
