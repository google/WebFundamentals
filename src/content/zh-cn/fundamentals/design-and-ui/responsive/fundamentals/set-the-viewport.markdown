---
title: "设置视口"
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
  对于针对各种设备优化过的网页，其文档标头中必须包含元视口元素。元视口代码会指示浏览器如何对网页尺寸和缩放比例进行控制。
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

为了提供最佳体验，移动浏览器会以桌面设备的屏幕宽度（通常大约为 980 像素，但不同设备可能会有所不同）来呈现网页，然后再增加字体大小并将内容调整为适合屏幕的大小，从而改善内容的呈现效果。对用户来说，这就意味着，字体大小可能会不一致，他们必须点按两次或张合手指进行缩放，才能查看内容并与之互动。

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


使用元视口值 width=device-width 指示网页与屏幕宽度（以设备无关像素为单位）进行匹配。这样一来，网页便可以重排内容，使之适合不同的屏幕大小（从较小的手机到较大的桌面设备显示器，不一而足）。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="未设置视口的网页">
      查看示例
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="已设置视口的网页">
      查看示例
    {% endlink_sample %}
  </div>
</div>

有些浏览器会在旋转到横向模式时保持固定的网页宽度，然后通过缩放（而不是重排）填满屏幕。添加属性 initial-scale=1 会指示浏览器在不考虑设备方向的情况下，指示浏览器将 CSS 像素与设备无关像素的比例设为 1:1，并允许网页完全占用横向宽度。

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## 确保视口可以访问

除了设置 initial-scale 外，您还可以在视口上设置以下属性：

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

但是，设置后，这些属性可以停用用户缩放视口的功能，可能会造成网页访问方面的问题。



