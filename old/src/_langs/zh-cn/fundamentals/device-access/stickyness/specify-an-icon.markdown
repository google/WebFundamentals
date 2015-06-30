---
layout: article
title: "指定图标"
description: "要使网站与众不同，一定要提供漂亮的全尺寸图标，另外也可使用收藏图标或低质量的屏幕截图。"
introduction: "要使网站与众不同，一定要提供漂亮的全尺寸图标，另外也可使用收藏图标或低质量的屏幕截图。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 3
id: specify-an-icon
authors:
  - pbakaus
collection: stickyness
---

{% wrap content %}

<figure>
  <img src="images/icons.png" alt="自定义每种平台的图标" />
  <figcaption>添加自定义图标是一种实现脱颖而出的简单方法。</figcaption>
</figure>


将以下代码添加到 `<head>`，以添加自定义图标到 Safari、
Opera 和 Internet Explorer：

{% highlight html %}
<!-- icon in the highest resolution we need it for -->
<link rel="icon" sizes="228x228" href="icon.png">
<!-- reuse same icon for Safari -->
<link rel="apple-touch-icon" href="ios-icon.png">
<!-- multiple icons for IE -->
<meta name="msapplication-square70x70logo" content="icon\_smalltile.png">
<meta name="msapplication-square150x150logo" content="icon\_mediumtile.png">
<meta name="msapplication-wide310x150logo" content="icon\_widetile.png">
<meta name="msapplication-square310x310logo" content="icon\_largetile.png">
{% endhighlight %}

在本例中，Opera 使用 icon.png，它
被缩放到设备所需的大小。 Safari 使用
`<link>` 标签，带有 `rel` 属性： `apple-touch-icon`。

Windows 8 的新主屏幕体验可支持 4 种不同
固定网站布局，因此需要 4 个图标。 如果您不想支持特定尺寸，则可以省去相关的元
标签。

您可以指定 [显式尺寸](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)，即为每个图标提供单独的链接标签
，防止操作系统调整图标的大小：

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
