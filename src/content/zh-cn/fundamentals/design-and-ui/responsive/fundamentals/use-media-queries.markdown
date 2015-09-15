---
title: "将 CSS 媒体查询用于自适应设计"
description: "很多网页都没有针对这些跨设备体验进行优化。学习相关基础知识，创建在移动设备、桌面设备或带有屏幕的任意设备上均可运行的网站。"
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - 使用元视口代码控制浏览器视口的宽度和缩放比例。
    - 添加 <code>width=device-width</code> 以便与屏幕宽度（以设备无关像素为单位）进行匹配。
    - 添加 <code>initial-scale=1</code> 以便将 CSS 像素与设备无关像素的比例设为 1:1。
    - 确保在不停用用户缩放功能的情况下，您的网页也可以访问。
  size-content-to-vp:
    - 请勿使用较大的固定宽度元素。
    - 在任何视口宽度下，内容均应正常显示。
    - 使用 CSS 媒体查询为不同尺寸的屏幕应用不同样式。
  media-queries:
    - 媒体查询可用于根据设备特点应用样式。
    - 优先使用 <code>min-width</code>（而非 <code>min-device-width</code>），以确保实现最宽阔的视觉体验。
    - 为元素使用相对尺寸，以免破坏版式完整性。
  choose-breakpoints:
    - 根据内容创建断点，绝对不要根据具体设备、产品或品牌来创建。
    - 从针对最小的移动设备进行设计入手，然后随着屏幕类型不断增加而逐渐改善体验。
    - 使每行的文字最多为 70 或 80 个字符左右。
notes:
  use-commas:
    - 使用英文逗号分隔属性，确保旧版浏览器可以准确解析相关属性。
---
<p class="intro">
  媒体查询是可应用于 CSS 样式的简单过滤器。有了这些过滤器，我们可以根据设备呈现内容的特点轻松更改样式，包括显示屏类型、宽度、高度、方向甚至是分辨率。
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}


例如，您可以将打印必需的所有样式放在打印媒体查询中：

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

除了在样式表链接中使用 media 属性之外，我们还可以通过另外两种方法应用可以嵌入 CSS 文件的媒体查询：@media 和 @import。出于性能方面的考虑，我们建议开发者优先考虑使用前两种方法，尽量避免使用 @import 语法（请参阅[避免 CSS 导入]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html)）。

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

不同媒体查询适用的逻辑并不是互斥的，因此，开发者可以根据 CSS 中优先级的标准规则，应用满足生成的 CSS 区块标准的任何过滤器。

## 根据视口大小应用媒体查询

通过媒体查询，我们可以打造自适应体验，使特定样式可应用于小屏幕、大屏幕和介于两者之间的屏幕。通过媒体查询语法，我们可以创建可根据设备特点应用的规则。

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

尽管我们可以查询多个不同的项目，但自适应网页设计最常使用的项目为：min-width、max-width、min-height 和 max-height。


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="属性">属性</th>
      <th data-th="结果">结果</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="属性"><code>min-width</code></td>
      <td data-th="结果">当任意浏览器宽度大于查询中定义的值时适用的规则。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>max-width</code></td>
      <td data-th="结果">当任意浏览器宽度小于查询中定义的值时适用的规则。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>min-height</code></td>
      <td data-th="结果">当任意浏览器高度大于查询中定义的值时适用的规则。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>max-height</code></td>
      <td data-th="结果">当任意浏览器高度小于查询中定义的值时适用的规则。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>orientation=portrait</code></td>
      <td data-th="结果">高度大于或等于宽度的任意浏览器适用的规则。</td>
    </tr>
    <tr>
      <td data-th="属性"><code>orientation=landscape</code></td>
      <td data-th="结果">宽度大于高度的任意浏览器适用的规则。</td>
    </tr>
  </tbody>
</table>

我们通过一个示例了解一下：

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="预览使用媒体查询的网页，以便在调整尺寸时更改属性。">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* 当浏览器宽度介于 <b>0 像素</b>和 <b>640 像素</b>之间时，系统将会应用 max-640px.css。
* 当浏览器宽度介于 <b>500 像素</b>和 <b>600 像素</b>之间时，系统将会应用 @media。
* 当浏览器宽度为 <b>640 像素或大于此值</b>时，系统将会应用 min-640px.css。
* 当浏览器<b>宽度大于高度</b>时，系统将会应用 landscape.css。
* 当浏览器<b>高度大于宽度</b>时，系统将会应用 portrait.css。


## min-device-width 注意事项

尽管开发者也可以根据 *-device-width 创建查询，但是我们**强烈建议不要这么做**。

这两种代码的差别虽然不明显但却十分重要：min-width 以浏览器窗口尺寸为依据，而 min-device-width 却是以屏幕尺寸为依据。很遗憾，有些浏览器（包括旧版 Android 浏览器）可能无法正确报告设备宽度，反而会以预期的视口宽度报告屏幕尺寸（以设备像素为单位）。

此外，使用 *-device-width 会阻止内容适应允许窗口调整大小的桌面设备或其他设备，因为该查询基于设备的实际大小，而非浏览器窗口大小。

## 使用相对单位

与固定宽度的版式相比，自适应设计的主要概念基础是流畅性和比例可调节性。使用相对衡量单位有助于简化版式，并防止无意间创建对视口来说过大的组件。

例如，在顶级 div 上设置 width: 100% 可以确保其横跨视口的宽度，对视口来说既不会太大也不会太小。无论设备是宽度为 320 像素的 iPhone、宽度为 342 像素的 Blackberry Z10，还是宽度为 360 像素的 Nexus 5，div 均会适合这些屏幕。

此外，使用相对单位可让浏览器根据用户缩放程度呈现内容，而无需为网页添加横向滚动条。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



