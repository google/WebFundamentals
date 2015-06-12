---
layout: article
title: "아이콘 지정"
description: "사이트를 눈에 띄게 만들려면 보기에 좋은 전체 크기의 아이콘을 제공해야 합니다. 또는 즐겨찾기 아이콘이나 저화질 스크린샷을 사용할 수도 있습니다."
introduction: "사이트를 눈에 띄게 만들려면 보기에 좋은 전체 크기의 아이콘을 제공해야 합니다. 또는 즐겨찾기 아이콘이나 저화질 스크린샷을 사용할 수도 있습니다."
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
  <img src="images/icons.png" alt="플랫폼별 아이콘 사용자 지정" />
  <figcaption>사용자 지정 아이콘을 추가함으로써 쉽게 사이트를 눈에 띄게 만들 수 있습니다.</figcaption>
</figure>


다음 코드를 `<head>`에 추가하여 사용자 지정 아이콘을 Safari, Opera 
및 Internet Explorer에 추가합니다.

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

이 예에서 Opera는 icon.png를 사용하며, 이 아이콘은 
장치에 필요한 크기로 조정됩니다. Safari는 
`rel` 특성 `apple-touch-icon`과 함께 `<link>` 태그를 사용합니다.

Windows 8의 새로운 홈 화면은 고정된 사이트에 대한 네 개의 서로 다른 
레이아웃을 지원하므로 네 개의 아이콘을 필요로 합니다. 특정 크기를 지원하지 않으려는 경우 관련 
메타 태그를 제외할 수 있습니다.

각 아이콘에 대해 별도의 링크 태그를 제공하여 [명시적인 크기](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)를 
지정함으로써 OS가 아이콘의 크기를 다시 조정할 필요가 없도록 할 수 있습니다.

{% highlight html %}
<link rel="apple-touch-icon" href="touch-icon-iphone.png">
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
<link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
<link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
{% endhighlight %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
