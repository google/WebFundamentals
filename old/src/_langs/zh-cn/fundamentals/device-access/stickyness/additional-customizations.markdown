---
layout: article
title: "其他自定义"
description: "以下是很有用的自定义，但只在部分浏览器中起作用。 这些设置全是可选的，但强烈建议进行设置，因为可进一步增强应用程序体验。"
introduction: "以下是很有用的自定义，但只在部分浏览器中起作用。 这些设置全是可选的，但强烈建议进行设置，因为可进一步增强应用程序体验。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 6
id: additional-customizations
authors:
  - pbakaus
  - mattgaunt
collection: stickyness
---

{% wrap content %}

{% include modules/toc.liquid %}

## 定义浏览器元素的颜色

Chrome、Firefox OS、Safari、Internet Explorer 和 Opera Coast 允许您使用 meta 标签来定义浏览器元素和/或平台的颜色。

{% highlight html %}
<!-- Chrome & Firefox OS -->
<meta name="theme-color" content="#4285f4">
<!-- Windows Phone -->
<meta name="msapplication-navbutton-color" content="#4285f4">
<!-- iOS Safari -->
<meta name="apple-mobile-web-app-status-bar-style" content="#4285f4">
{% endhighlight %}


<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/theme-color.png" alt="使用 theme-color Meta 标签的站点的示例">

        <figcaption>使用 theme-color Meta 标签的站点的示例</figcaption>
    </figure>
</div>

## Safari：启动图像、状态栏外观

Safari 允许您定制状态栏和指定启动图像。

### 指定启动图像

默认情况下，Safari 在加载过程中显示空白屏幕，在多次
加载之后会显示应用程序之前状态的屏幕快照。 要避免出现这种情况，您可以
通过
`rel=apple-touch-startup-image`添加一个链接标签，让 Safari 显示独特的启动图像。 例如：

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

图像必须为目标设备屏幕的特定尺寸，否则
不会被使用。 请参考
[Safari Web 内容指南](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
了解更多详情。

尽管 Apple 的文档缺少此主题的内容，但开发者社区
已想出一种针对所有设备的办法：使用高级媒体查询
来选择相应的设备，然后指定正确的图像。 以下是一个
可行的解决方法，此方法由[tfausak's gist](//gist.github.com/tfausak/2222823)提供：

{% highlight html %}
<!-- iOS 6 & 7 iPad (retina, portrait) -->
<link href="/static/images/apple-touch-startup-image-1536x2008.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPad (retina, landscape) -->
<link href="/static/images/apple-touch-startup-image-1496x2048.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (portrait) -->
<link href="/static/images/apple-touch-startup-image-768x1004.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: portrait)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPad (landscape) -->
<link href="/static/images/apple-touch-startup-image-748x1024.png"
     media="(device-width: 768px) and (device-height: 1024px)
        and (orientation: landscape)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone 5 -->
<link href="/static/images/apple-touch-startup-image-640x1096.png"
     media="(device-width: 320px) and (device-height: 568px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 & 7 iPhone (retina) -->
<link href="/static/images/apple-touch-startup-image-640x920.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 2)"
     rel="apple-touch-startup-image">

<!-- iOS 6 iPhone -->
<link href="/static/images/apple-touch-startup-image-320x460.png"
     media="(device-width: 320px) and (device-height: 480px)
        and (-webkit-device-pixel-ratio: 1)"
     rel="apple-touch-startup-image">
{% endhighlight %}

### 更改状态栏的外观

您可以默认状态栏的外观更改为`black`或
`black-translucent`。 通过 `black-translucent`，状态栏浮在
全屏内容的顶层，而不是将内容向下推。 这样使布局有
更大高度，但有点遮挡顶层。  以下是所需的代码：

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

以下是两种不同模式的外观的预览：

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="black-translucent">
      <figcaption>使用 <code>black-translucent</code> 的屏幕截图</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="black-black">
      <figcaption>使用<code>black</code>的屏幕截图</figcaption>
      </figure>
  </div>
</div>

## Internet Explorer:动态磁贴、通知和固定网站

Microsoft的“固定网站”及其轮转的“动态磁贴”远远超越了其他
实现方法，在此介绍其方法会令本指南过于累赘。 如果您想
了解更多，
[可在 MSDN 了解如何创建动态磁贴](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
