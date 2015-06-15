---
layout: article
title: "추가 사용자 지정"
description: "다음 사용자 지정은 매우 유용하지만 일부 브라우저에서만 작동합니다. 사용자 지정은 모두 선택 항목이지만 앱 환경을 개선하므로 강력히 권장됩니다."
introduction: "다음 사용자 지정은 매우 유용하지만 일부 브라우저에서만 작동합니다. 사용자 지정은 모두 선택 항목이지만 앱 환경을 개선하므로 강력히 권장됩니다."
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

## 브라우저 요소의 색 지정

Chrome, Firefox OS, Safari, Internet Explorer 및 Opera Coast에서는 메타 태그를 사용하여 브라우저 및/또는 플랫폼 요소의 색을 정의할 수 있습니다.

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
        <img src="images/theme-color.png" alt="theme-color 메타 태그를 사용하는 사이트의 예">

        <figcaption>theme-color 메타 태그를 사용하는 사이트의 예</figcaption>
    </figure>
</div>

## Safari: 시작 이미지, 상태 표시줄 모양

Safari에서는 상태 표시줄 스타일과 시작 이미지를 지정할 수 있습니다.

### 시작 이미지 지정

기본적으로 Safari는 로드하는 동안에는 빈 화면을 표시하고 여러 번
로드한 후에는 이전 앱 상태의 스크린샷을 표시합니다. Safari에 명시적인 시작 이미지를 표시하도록 지시하여
(`rel=apple-touch-startup-image`를 사용하여 링크 태그를 추가하여
) 이 동작을 차단할 수 있습니다. 예를 들면 다음과 같습니다.

{% highlight html %}
<link rel="apple-touch-startup-image" href="icon.png">
{% endhighlight %}

이미지는 대상 장치 화면의 특정 크기여야 하며, 그렇지 않을 경우
사용되지 않습니다. 자세한 내용은
[Safari 웹 콘텐츠 지침](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)을
참조하십시오.

이 항목에 대한 Apple 설명서는 별로 없지만 개발자 커뮤니티에서는
고급 미디어 쿼리를 사용하여 적절한 장치를 선택한 다음 올바른 이미지를
지정하는 방식으로 모든 장치를 대상으로 지정하는 방법을 고안해냈습니다. 다음은
효과적인 솔루션입니다. 이는 [tfausak의 gist](//gist.github.com/tfausak/2222823)의 양해를 구해 발췌한 것입니다.

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

### 상태 표시줄 모양 변경

기본 상태 표시줄의 모양을 `black` 또는
`black-translucent`로 변경할 수 있습니다. `black-translucent`를 사용하면 상태 표시줄이
전체 화면 콘텐츠를 아래로 밀어내리지 않고 전체 화면 콘텐츠 맨 위에 표시됩니다. 그러면 레이아웃의
높이가 높아지지만 상단이 가려집니다.  여기에 필요한 코드는 다음과 같습니다.

{% highlight html %}
<meta name="apple-mobile-web-app-status-bar-style" content="black">
{% endhighlight %}

다음은 이 두 개의 서로 다른 모드가 어떻게 표시되는지를 보여 주는 미리 보기입니다.

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="images/status-bar-translucent.png" srcset="images/status-bar-translucent.png 1x, images/status-bar-translucent-2x.png 2x" alt="black-translucent">
      <figcaption><code>black-translucent</code>를 사용한 경우의 스크린샷</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="images/status-bar-black.png" srcset="images/status-bar-black.png 1x, images/status-bar-black-2x.png 2x" alt="black-black">
      <figcaption><code>black</code>을 사용한 경우의 스크린샷</figcaption>
      </figure>
  </div>
</div>

## Internet Explorer: Live Tile, 알림 및 고정된 사이트

Microsoft의 "고정된 사이트"와 회전형 "Live Tile"은 다른
구현을 훨씬 넘어서는 기능이며, 이 가이드의 내용과 맞지 않으므로 여기서는 다루지 않습니다. 자세한 내용을
알아보려면
[MSDN에서 Live Tile을 만드는 방법을 참조하십시오](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

{% include modules/nextarticle.liquid %}

{% endwrap %}
