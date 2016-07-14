---
title: "自适应网页设计基础知识"
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
  - g.co/mobilesiteprinciple19
udacity:
  id: ud893
  title: Responsive Web Design Fundamentals
  description: "Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more."
  image: imgs/udacity-rwd.png
---
<p class="intro">
  使用移动设备上网的用户数量激增，遗憾的是，很多网页并未针对移动设备进行优化。移动设备通常会受到显示屏大小限制，因此需要通过不同的方式将内容呈现在屏幕上。
</p>


{% comment %}
{% ytvideo oK09n_PGhTo %}
{% endcomment %}

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}


手机、"超大屏智能手机"、平板电脑、桌面设备、游戏机、电视和穿戴式设备的屏幕尺寸各异。屏幕尺寸将会不断变化，因此您的网站应能够适应当今或未来的所有屏幕尺寸，这一点很重要。

{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}

自适应网页设计（这一概念最初是由 [Ethan Marcotte 在'A List Apart'中](http://alistapart.com/article/responsive-web-design/)提出的）回应了用户及其所用设备的需求。版式会因根据设备的大小和功能而变化。例如，手机可能会以单列视图的形式呈现内容，而同样的内容可能会以双列的形式呈现在平板电脑上。



