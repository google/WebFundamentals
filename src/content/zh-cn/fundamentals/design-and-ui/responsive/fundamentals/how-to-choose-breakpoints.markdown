---
title: "如何选择断点"
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
  尽管根据设备类定义断点的方法可能很有用，但请慎用这种方法。如果根据具体设备、产品、品牌名称或现今正在使用的操作系统定义断点，后期维护起来可能会困难重重。相反，内容本身应该确定版式调整方式，使其适合自己的容器。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## 以从小屏幕开始、不断扩展的方式选择主要断点

先针对小屏幕尺寸进行内容设计，然后扩展至不同尺寸的屏幕，直到必须添加断点为止。如此一来，您便可以根据内容优化断点，并使断点数量降至最低。

我们来分析一下在开头部分看到的示例[天气预报]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html)。
首先使天气预报在较小的屏幕上呈现效果良好。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="在较小的屏幕上预览天气预报的显示效果。">
  {% endlink_sample %}
</figure>

接下来，调整浏览器大小，直到元素之间的空间过大，天气预报根本无法正常显示为止。具体应调整到多大是由自己主观决定的，但超过 600 像素肯定就过宽了。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="在网页逐渐变宽时预览天气预报的显示效果。">
  {% endlink_sample %}
</figure>

要在 600 像素处插入断点，请新建两个样式表，一个在浏览器不超过 600 像素时使用，另一个在超过 600 像素时使用。

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

最后，重新设计 CSS。在本例中，我们已将常用的样式（例如字体、图标、基本定位和颜色）放入 weather.css。然后，针对小屏幕的特定版式会放入 weather-small.css，而大屏幕样式则放入 weather-large.css。

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## 必要时选择小断点

除了选择主要断点使版式发生重大变化外，做出适当调整产生微小变化的做法也很有用。例如，进行以下调整可能会很有用：在主要断点之间调整某个元素的边距或内边距，或增加字体大小使其在版式中看起来更自然。

首先优化小屏幕版式。在本例中，当视口宽度超过 360 像素时，我们来增加字体大小。接下来，当有足够的空间时，我们可以将高温和低温分隔开，使其在同一行中显示，而不是以上下排列的形式显示。然后，我们来调大天气图标。

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

同样，如果是大屏幕，我们最好限制天气预报面板的宽度，使其不会占用整个屏幕宽度。

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## 优化文本，提高可读性

传统的可读性理论建议：理想栏目的每一行应该包含 70 到 80 个字符（大约 8 到 10 个英文单词），因此，每次文本块宽度超过 10 个单词时，就应考虑添加断点。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="添加小断点之前。">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="添加小断点之后。">
  </div>
</div>

我们来深入分析一下上述博文示例。在较小的屏幕上，大小为 1em 的 Roboto 字体可以使每行完美地呈现 10 个单词，而在较大的屏幕上就需要添加断点了。在本例中，如果浏览器宽度超过了 575 像素，那么内容的理想宽度是 550 像素。

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## 绝不能完全隐藏内容

在根据屏幕大小选择要隐藏或显示的内容时请务必谨慎。
不要只是因为内容无法适合屏幕而将其隐藏。屏幕大小并非确定用户需求的决定性因素。例如，如果去除天气预报中的花粉统计数据，那么对春天容易过敏的用户来说就是非常严重的问题，因为这些用户要根据这类信息决定是否外出。




