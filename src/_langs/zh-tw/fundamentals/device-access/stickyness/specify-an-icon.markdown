---
layout: article
title: "指定一個圖示"
description: "若要使您的網站脫穎而出，一定要提供一個漂亮、全尺寸圖示，否則可能會使用網頁圖示 (favicon) 或低品質螢幕擷取畫面。"
introduction: "若要使您的網站脫穎而出，一定要提供一個漂亮、全尺寸圖示，否則可能會使用網頁圖示 (favicon) 或低品質螢幕擷取畫面。"
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
  <img src="images/icons.png" alt="根據平臺自訂圖示" />
  <figcaption>加入自訂圖示是脫穎而出的簡單方法。</figcaption>
</figure>


新增以下程式碼至您的 `<head>`，
以為 Safari、Opera 和 Internet Explorer 新增自訂圖示：

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

在此範例中，Opera 使用 icon.png，
由裝置縮放到必要的大小。 Safari 使用 
`<link>`標籤；標籤帶 `rel` 屬性：`apple-touch-icon`。

Windows 8 的新主螢幕體驗，針對釘選網站，
支援四種不同的版面配置，並需要四個圖示。 如果您不想要支援特定的大小，
您可以省略相關的中繼標籤。

您可以針對每一個圖示提供個別的連結標籤，以指定 [明確大小](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)，避免 OS 必須重新調整圖示大小：


{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
