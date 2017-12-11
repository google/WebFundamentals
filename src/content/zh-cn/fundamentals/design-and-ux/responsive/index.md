project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 创建灵活设计，而不是固定的设计,布局。并且能够在任何尺寸的屏幕正常运行。

{# wf_updated_on: 2016-05-13 #}
{# wf_published_on: 2014-04-29 #}

# 响应用户界面 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


Translated By: 

{% include "web/_shared/contributors/henrylim.html" %}



<div>
  <div class="attempt-right">
    创建灵活设计，而不是固定的设计,布局。并且能够在任何尺寸的屏幕正常运行。
  </div>
 
{% include "web/_shared/udacity/ud893.html" %}


</div>


## 设置视口 


对于针对各种设备优化过的网页，其文档标头中必须包含元视口元素。元视口代码会指示浏览器如何对网页尺寸和缩放比例进行控制。




### TL;DR {: .hide-from-toc }
- 使用元视口代码控制浏览器视口的宽度和缩放比例。
- 添加 <code>width=device-width</code> 以便与屏幕宽度（以设备无关像素为单位）进行匹配。
- 添加 <code>initial-scale=1</code> 以便将 CSS 像素与设备无关像素的比例设为 1:1。
- 确保在不停用用户缩放功能的情况下，您的网页也可以访问。


为了提供最佳体验，移动浏览器会以桌面设备的屏幕宽度（通常大约为 980 像素，但不同设备可能会有所不同）来呈现网页，然后再增加字体大小并将内容调整为适合屏幕的大小，从而改善内容的呈现效果。对用户来说，这就意味着，字体大小可能会不一致，他们必须点按两次或张合手指进行缩放，才能查看内容并与之互动。


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


使用元视口值 width=device-width 指示网页与屏幕宽度（以设备无关像素为单位）进行匹配。这样一来，网页便可以重排内容，使之适合不同的屏幕大小（从较小的手机到较大的桌面设备显示器，不一而足）。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="未设置视口的网页">
    <figcaption>
          查看示例
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="已设置视口的网页">
    <figcaption>
          查看示例
     </figcaption>
  </figure>
  </a>
</div>

有些浏览器会在旋转到横向模式时保持固定的网页宽度，然后通过缩放（而不是重排）填满屏幕。添加属性 initial-scale=1 会指示浏览器在不考虑设备方向的情况下，指示浏览器将 CSS 像素与设备无关像素的比例设为 1:1，并允许网页完全占用横向宽度。

Note: 使用英文逗号分隔属性，确保旧版浏览器可以准确解析相关属性。

### 确保视口可以访问

除了设置 initial-scale 外，您还可以在视口上设置以下属性：

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

但是，设置后，这些属性可以停用用户缩放视口的功能，可能会造成网页访问方面的问题。


## 调整内容大小，使其适合视口

无论在桌面设备上还是在移动设备上，用户都习惯上下滚动网站，而不是横向滚动，因此，如果用户必须横向滚动或缩小页面才能查看整个网页，那么这将给用户带来糟糕的体验。


### TL;DR {: .hide-from-toc }
- 请勿使用较大的固定宽度元素。
- 在任何视口宽度下，内容均应正常显示。
- 使用 CSS 媒体查询为不同尺寸的屏幕应用不同样式。


使用 meta viewport 代码开发移动版网站时，开发者很容易在无意间创建出不太适合指定视口的网页内容。例如，如果图片宽度大于视口宽度，那么就会导致视口横向滚动。您应该调整此内容，使其适合视口内的宽度，以便用户无需横向滚动。

由于不同设备（例如手机和平板电脑，甚至不同手机之间）的屏幕尺寸和宽度（以 CSS 像素为单位）差别很大，因此内容不应只在特定视口下正常显示。

为网页元素设置较大的 CSS 绝对宽度（如下例所示）会导致 div 因过宽而不适合窄视口设备（例如，iPhone 等宽度为 320 CSS 像素的设备）。因此，请改为使用相对宽度值，例如 width: 100%。同样请注意，使用较大的绝对定位值可能会使元素脱离小屏幕上的视口。

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
      <img src="imgs/vp-fixed-iph.png" class="attempt-left" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone 上带有 344 像素的固定宽度元素的网页。">
    <figcaption>
      查看示例
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
      <img src="imgs/vp-fixed-n5.png" class="attempt-right" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5 上带有 344 像素的固定宽度元素的网页。">
    <figcaption>
      查看示例
     </figcaption>
  </figure>
  </a>
</div>


## 将 CSS 媒体查询用于自适应设计

媒体查询是可应用于 CSS 样式的简单过滤器。有了这些过滤器，我们可以根据设备呈现内容的特点轻松更改样式，包括显示屏类型、宽度、高度、方向甚至是分辨率。




### TL;DR {: .hide-from-toc }
- 媒体查询可用于根据设备特点应用样式。
- 优先使用 <code>min-width</code>（而非 <code>min-device-width</code>），以确保实现最宽阔的视觉体验。
- 为元素使用相对尺寸，以免破坏版式完整性。



例如，您可以将打印必需的所有样式放在打印媒体查询中：


    <link rel="stylesheet" href="print.css" media="print">
    

除了在样式表链接中使用 media 属性之外，我们还可以通过另外两种方法应用可以嵌入 CSS 文件的媒体查询：@media 和 @import。出于性能方面的考虑，我们建议开发者优先考虑使用前两种方法，尽量避免使用 @import 语法（请参阅[避免 CSS 导入](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)）。


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

不同媒体查询适用的逻辑并不是互斥的，因此，开发者可以根据 CSS 中优先级的标准规则，应用满足生成的 CSS 区块标准的任何过滤器。

### 根据视口大小应用媒体查询

通过媒体查询，我们可以打造自适应体验，使特定样式可应用于小屏幕、大屏幕和介于两者之间的屏幕。通过媒体查询语法，我们可以创建可根据设备特点应用的规则。


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

尽管我们可以查询多个不同的项目，但自适应网页设计最常使用的项目为：min-width、max-width、min-height 和 max-height。


<table>
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
  
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="预览使用媒体查询的网页，以便在调整尺寸时更改属性。">
  
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* 当浏览器宽度介于 <b>0 像素</b>和 <b>640 像素</b>之间时，系统将会应用 max-640px.css。
* 当浏览器宽度介于 <b>500 像素</b>和 <b>600 像素</b>之间时，系统将会应用 @media。
* 当浏览器宽度为 <b>640 像素或大于此值</b>时，系统将会应用 min-640px.css。
* 当浏览器<b>宽度大于高度</b>时，系统将会应用 landscape.css。
* 当浏览器<b>高度大于宽度</b>时，系统将会应用 portrait.css。


### min-device-width 注意事项

尽管开发者也可以根据 *-device-width 创建查询，但是我们**强烈建议不要这么做**。

这两种代码的差别虽然不明显但却十分重要：min-width 以浏览器窗口尺寸为依据，而 min-device-width 却是以屏幕尺寸为依据。很遗憾，有些浏览器（包括旧版 Android 浏览器）可能无法正确报告设备宽度，反而会以预期的视口宽度报告屏幕尺寸（以设备像素为单位）。

此外，使用 *-device-width 会阻止内容适应允许窗口调整大小的桌面设备或其他设备，因为该查询基于设备的实际大小，而非浏览器窗口大小。

### 使用相对单位

与固定宽度的版式相比，自适应设计的主要概念基础是流畅性和比例可调节性。使用相对衡量单位有助于简化版式，并防止无意间创建对视口来说过大的组件。

例如，在顶级 div 上设置 width: 100% 可以确保其横跨视口的宽度，对视口来说既不会太大也不会太小。无论设备是宽度为 320 像素的 iPhone、宽度为 342 像素的 Blackberry Z10，还是宽度为 360 像素的 Nexus 5，div 均会适合这些屏幕。

此外，使用相对单位可让浏览器根据用户缩放程度呈现内容，而无需为网页添加横向滚动条。

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }


## 如何选择断点

尽管根据设备类定义断点的方法可能很有用，但请慎用这种方法。如果根据具体设备、产品、品牌名称或现今正在使用的操作系统定义断点，后期维护起来可能会困难重重。相反，内容本身应该确定版式调整方式，使其适合自己的容器。



### TL;DR {: .hide-from-toc }
- 根据内容创建断点，绝对不要根据具体设备、产品或品牌来创建。
- 从针对最小的移动设备进行设计入手，然后随着屏幕类型不断增加而逐渐改善体验。
- 使每行的文字最多为 70 或 80 个字符左右。


### 以从小屏幕开始、不断扩展的方式选择主要断点

先针对小屏幕尺寸进行内容设计，然后扩展至不同尺寸的屏幕，直到必须添加断点为止。如此一来，您便可以根据内容优化断点，并使断点数量降至最低。

我们来分析一下在开头部分看到的示例[天气预报](/web/fundamentals/design-and-ux/responsive/)。
首先使天气预报在较小的屏幕上呈现效果良好。

<figure>
  
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="在较小的屏幕上预览天气预报的显示效果。">
  
</figure>

接下来，调整浏览器大小，直到元素之间的空间过大，天气预报根本无法正常显示为止。具体应调整到多大是由自己主观决定的，但超过 600 像素肯定就过宽了。

<figure>
  
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="在网页逐渐变宽时预览天气预报的显示效果。">
  
</figure>

要在 600 像素处插入断点，请新建两个样式表，一个在浏览器不超过 600 像素时使用，另一个在超过 600 像素时使用。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

最后，重新设计 CSS。在本例中，我们已将常用的样式（例如字体、图标、基本定位和颜色）放入 weather.css。然后，针对小屏幕的特定版式会放入 weather-small.css，而大屏幕样式则放入 weather-large.css。

<figure>
  
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  
</figure>

### 必要时选择小断点

除了选择主要断点使版式发生重大变化外，做出适当调整产生微小变化的做法也很有用。例如，进行以下调整可能会很有用：在主要断点之间调整某个元素的边距或内边距，或增加字体大小使其在版式中看起来更自然。

首先优化小屏幕版式。在本例中，当视口宽度超过 360 像素时，我们来增加字体大小。接下来，当有足够的空间时，我们可以将高温和低温分隔开，使其在同一行中显示，而不是以上下排列的形式显示。然后，我们来调大天气图标。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"   adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
    <figcaption>
      Before adding minor breakpoints.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
    <figcaption>
      After adding minor breakpoints.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>

同样，如果是大屏幕，我们最好限制天气预报面板的宽度，使其不会占用整个屏幕宽度。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg"   adjust_indentation="auto" %}
</pre>

### 优化文本，提高可读性

传统的可读性理论建议：理想栏目的每一行应该包含 70 到 80 个字符（大约 8 到 10 个英文单词），因此，每次文本块宽度超过 10 个单词时，就应考虑添加断点。

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="添加小断点之前。">
    <figcaption>Before adding minor breakpoints.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="添加小断点之后。">
    <figcaption>After adding minor breakpoints.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

我们来深入分析一下上述博文示例。在较小的屏幕上，大小为 1em 的 Roboto 字体可以使每行完美地呈现 10 个单词，而在较大的屏幕上就需要添加断点了。在本例中，如果浏览器宽度超过了 575 像素，那么内容的理想宽度是 550 像素。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading"   adjust_indentation="auto" %}
</pre>

### 绝不能完全隐藏内容

在根据屏幕大小选择要隐藏或显示的内容时请务必谨慎。
不要只是因为内容无法适合屏幕而将其隐藏。屏幕大小并非确定用户需求的决定性因素。例如，如果去除天气预报中的花粉统计数据，那么对春天容易过敏的用户来说就是非常严重的问题，因为这些用户要根据这类信息决定是否外出。







