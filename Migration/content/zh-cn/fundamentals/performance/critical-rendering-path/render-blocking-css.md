---
title: "阻塞渲染的 CSS"
description: "默认情况下，CSS 被视为阻塞渲染的资源，这意味着在 CSSOM 构建完成前，浏览器会暂停渲染任何已处理的内容。确保精减你的 CSS，尽快传送它，并使用媒体类型与媒体查询来解除阻塞。"
updated_on: 2014-09-18
translators:
  - samchen
related-guides:
  media-queries:
    -
      title: 使用 CSS 媒体查询实现响应
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "响应式 web 设计"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - 默认情况下，CSS 被视为阻塞渲染的资源。
    - 媒体类型与媒体查询允许我们将一些 CSS 资源标记为不阻塞渲染。
    - 所有的 CSS 资源，不论阻塞或不阻塞，浏览器都会下载。
---

<p class="intro">
  默认情况下，CSS 被视为阻塞渲染的资源，这意味着在 CSSOM 构建完成前，浏览器会暂停渲染任何已处理的内容。确保精减你的 CSS，尽快传送它，并使用媒体类型与媒体查询来解除阻塞。
</p>



在上一节，我们看到了，关键渲染路径要求我们兼有 DOM 和 CSSOM 来构造渲染树，这就有一个重要的性能影响：**HTML 和 CSS 都是阻塞渲染的资源。** HTML 没什么说的，因为没有 DOM 我们就没有任何可渲染的内容，但是 CSS 的必要性可能就没那么明显。如果我们在 CSS 不阻塞的情况下尝试渲染一个普通页面会怎样？

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>有 CSS 的纽约时报</b>
    <img class="center" src="images/nytimes-css-device.png" alt="有 CSS 的纽约时报">

  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>没有 CSS 的纽约时报 (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="没有 CSS 的纽约时报">

  </div>
</div>

{% comment %}
<table class="mdl-data-table mdl-js-data-table">
<tr>
<td>有 CSS 的纽约时报</td>
<td>没有 CSS 的纽约时报</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="有 CSS 的纽约时报" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="没有 CSS 的纽约时报" class="center"></td>
</tr>
</table>
{% endcomment %}

上面的例子，显示了纽约时报有 CSS 与没有 CSS 的情况，这证实了为什么要在 CSS 可用之前阻塞渲染 - 没有 CSS 的页面基本不可用。实际上，右侧的情况通常称为「内容样式短暂失效」(FOUC)。因此，在同时拥有 DOM 和 CSSOM 前，浏览器会阻塞渲染。

> **_CSS 是阻塞渲染的资源，需要将它尽早、尽快地下载到客户端，以便缩短首次渲染的时间。_**

但是，如果我们有一些 CSS 样式只在特定条件下使用，比如，页面打印，又或页面投影到大屏幕上？如果这些资源不阻塞渲染，那就太棒了！

CSS 「媒体类型」和「媒体查询」允许我们解决这类情况：

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

[媒体查询]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html)由媒体类型以及零个或多个检查特定媒体特征的表达式组成。例如，我们的第一个样式表声明没有提供任何媒体类型或媒体查询，因此，将适用所有情况 - 换句话说，始终会阻塞渲染。另一方面，第二个样式表将只适用内容打印 - 也许您希望重排布局、更改字体，等等 - 因此，在页面首次加载时，这个样式表不需要阻塞渲染。最后一个样式表声明提供了媒体查询，由浏览器判定：如果条件符合，则在该样式表下载并处理完以前，浏览器阻塞渲染。

通过使用媒体查询，我们的外观可以根据不同使用场景定制，比如显示或打印，也可以根据不同情况比如屏幕方向改变、尺寸调整事件等定制。**在声明样式表资源时，一定要多注意媒体类型和媒体查询，因为它们对关键渲染路径有极大的性能影响！**

{% include shared/related_guides.liquid inline=true list=page.related-guides.media-queries %}

下面就让我们看一些简单例子：

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* 第一条声明阻塞渲染，匹配所有情况。
* 第二条声明一样阻塞渲染："all" 是默认类型，如果你未指定任何类型，则默认为 "all"。因此，第一条声明和第二条声明实际上是一样的。
* 第三条声明有一条动态媒体查询，在页面加载时判断。根据页面加载时设备的方向，portrait.css 可能阻塞渲染，也可能不阻塞。
* 最后一条声明只适用打印，因此，页面在浏览器中首次加载时，不会阻塞渲染。

最后，请注意，「阻塞渲染」仅是指该资源是否会暂停浏览器的首次页面渲染。无论 CSS 是否阻塞渲染，CSS 资源都会被下载，只是说非阻塞性资源的优先级比较低而已。



