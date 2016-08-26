project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 大小对提升用户满意度十分重要。

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2000-01-01 #}

# 正确设置视频大小 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



大小对提升用户满意度十分重要。


## TL;DR {: .hide-from-toc }
- 请勿提供框架大小或质量超过平台处理范围的视频。
- 提供适当时长的视频。
- 视频较长可能会导致无法顺畅下载和定位：一些浏览器可能需要等待视频下载完成后才可播放。



## 查看视频大小

视频框架实际编码大小可能会与视频元素的尺寸有所不同（正如图片可能不会以实际尺寸显示一样）。

要查看视频的编码大小，请使用视频元素的 videoWidth 和 videoHeight 属性。width 和 height 会返回视频元素的尺寸，而这些尺寸可能已使用 CSS 或内联宽度和高度属性进行过调整。

## 确保视频不会溢出容器

如果视频元素过大，不适合当前视口，则可能会从容器中溢出，从而使用户无法观看内容或使用
控件。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome（纵向）屏幕截图：未设置样式的视频元素从视口溢出" src="images/Chrome-Android-portrait-video-unstyled.png">
    <img class="mdl-cell mdl-cell--6--col" alt="Android 版 Chrome（横向）屏幕截图：未设置样式的视频元素从视口溢出" src="images/Chrome-Android-landscape-video-unstyled.png">
</div>

您可以使用 JavaScript 或 CSS 控制视频尺寸。JavaScript 图库和插件（如 [FitVids](//fitvidsjs.com/)）可以维持合适的视频大小及宽高比，即使是 YouTube 和其他来源中的 Flash 视频也不例外。

使用 [CSS 媒体查询](../../layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness) 来根据视口尺寸指定元素大小；max-width: 100% 是您的最佳帮手。

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

对于 iframe 中的媒体内容（如 YouTube 视频），请尝试使用自适应方法（如 [John Surdakowski 提出的方法](//avexdesigns.com/responsive-youtube-embed/)）。

<!-- TODO: Verify note type! -->
Note: 请勿强制调整元素尺寸，否则会使宽高比异于原始视频。挤压或拉伸都会造成较差的视觉效果。

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

对比<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/responsive_embed.html">自适应示例</a>和<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/video/unyt.html">非自适应版本</a>。




