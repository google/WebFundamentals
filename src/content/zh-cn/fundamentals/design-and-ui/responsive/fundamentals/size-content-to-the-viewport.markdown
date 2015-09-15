---
title: "调整内容大小，使其适合视口"
description: "很多网页都没有针对这些跨设备体验进行优化。学习相关基础知识，创建在移动设备、桌面设备或带有屏幕的任意设备上均可运行的网站。"
updated_on: 2014-04-30
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
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  无论在桌面设备上还是在移动设备上，用户都习惯上下滚动网站，而不是横向滚动，因此，如果用户必须横向滚动或缩小页面才能查看整个网页，那么这将给用户带来糟糕的体验。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

使用 meta viewport 代码开发移动版网站时，开发者很容易在无意间创建出不太适合指定视口的网页内容。例如，如果图片宽度大于视口宽度，那么就会导致视口横向滚动。您应该调整此内容，使其适合视口内的宽度，以便用户无需横向滚动。

由于不同设备（例如手机和平板电脑，甚至不同手机之间）的屏幕尺寸和宽度（以 CSS 像素为单位）差别很大，因此内容不应只在特定视口下正常显示。

为网页元素设置较大的 CSS 绝对宽度（如下例所示）会导致 div 因过宽而不适合窄视口设备（例如，iPhone 等宽度为 320 CSS 像素的设备）。因此，请改为使用相对宽度值，例如 width: 100%。同样请注意，使用较大的绝对定位值可能会使元素脱离小屏幕上的视口。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="iPhone 上带有 344 像素的固定宽度元素的网页。">
      查看示例
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Nexus 5 上带有 344 像素的固定宽度元素的网页。">
      查看示例
    {% endlink_sample %}
  </div>
</div>



