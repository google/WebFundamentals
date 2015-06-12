---
layout: article
title: "WebApp 매니페스트 추가하기"
description: "웹 애플리케이션의 매니페스트는 원하는 영역(예: 모바일 홈 화면)에 표시되는 앱의 모양을 제어할 수 있는 기능을 개발자에게 제공하고 실행 가능한 것과 실행 방식을 지시하는 단순한 JSON 파일입니다. 미래에 매니페스트는 앱에 대한 더 세밀한 제어 기능을 제공할 것이지만, 현재로서는 앱 실행 방식에만 집중합니다."
introduction: "웹 애플리케이션의 매니페스트는 원하는 영역(예: 모바일 홈 화면)에 표시되는 앱의 모양을 제어할 수 있는 기능을 개발자에게 제공하고 실행 가능한 것과 실행 방식을 지시하는 단순한 JSON 파일입니다. 미래에 매니페스트는 앱에 대한 더 세밀한 제어 기능을 제공할 것이지만, 현재로서는 앱 실행 방식에만 집중합니다."
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - 모든 장치 폼 팩터에서 작동하도록 다양한 아이콘을 정의합니다.
    - 표시할 적절한 `short_name`을 선택합니다.
    - 앱 실행자 수를 추적할 수 있도록 시작 URL 및 Querystring 매개변수를 추가합니다.
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

WebApp 매니페스트를 추가하는 작업은 정말 쉽습니다. WebApp에 대한 설정과
리소스를 포함하는 manifest.json 파일을 생성한 후 html 페이지에서
이에 대한 *링크*를 추가합니다.

## 매니페스트 생성하기

매니페스트의 이름은 마음대로 지정할 수 있습니다. 대부분의 사람들은 아마 단순하게 manifest.json을 사용할 것입니다. 다음은 그 예입니다.

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

시작 관리자 텍스트에 사용할 *short_name*을 포함해야 합니다.

*start_url*을 제공하지 않으면 현재 페이지가 사용되며, 이는 사용자가 원하는 것이 아닐 가능성이 높습니다.

## 브라우저에 매니페스트 정보 알리기

매니페스트를 생성하고 사이트에 저장한 후에는 다음과 같이 웹 앱을 포함하는 모든 페이지에 링크 태그를 추가하는 작업만 수행하면 됩니다.

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## 장치에 대한 탁월한 앱 아이콘 생성하기

사용자가 홈 화면에 사이트를 추가하면 브라우저에서 사용할 일련의 아이콘을 정의할 수 있습니다.

웹 앱의 아이콘은 위의 예와 같이 유형, 크기 및 밀도를 사용하여 정의할 수 있습니다. 하지만 이러한 모든 항목을 정의할 필요는 없으며, 크기와 이미지 소스만 정의해도 됩니다.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="홈 화면에 추가한 아이콘">

        <figcaption>홈 화면에 추가한 아이콘</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 사이트 실행 방법 구성하기

*display* 유형을 *standalone*으로 정의하여 WebApp이 브라우저 UI를 표시하지 않도록 합니다.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

개발자는 브라우저의 일반 사이트로 페이지가 표시되는 것을 사용자가 선호할 경우 염려할 필요가 없습니다. 브라우저 표시 유형을 사용하면 됩니다.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>매니페스트 표시 옵션</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 페이지의 초기 방향 정의하기

특정 방향을 적용할 수 있습니다. 이 기능은 가로로만 작동하는 게임과 같은 몇몇 활용 사례에 정말로 유용합니다. 하지만, 이러한 기능은 주의하여 사용해야 합니다. 사용자는 두 가지 방향으로 앱을 볼 수 있는 것을 선호합니다.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="WebApp 매니페스트 방향 옵션">

        <figcaption>WebApp 매니페스트 방향 옵션</figcaption>
    </figure>
</div>

<div class="clear"></div>

## 현재 안전하게 사용할 수 있습니까? (브라우저 지원)

예.  매니페스트가 지원되는 브라우저의 사용자에게 더 나은 환경을 제공할 수 있는
혁신적인 기능입니다.  브라우저가 매니페스트를 지원하지 않더라도 사이트를 사용할 수
있습니다.

Chrome은 2014년 11월에 매니페스트 구현을 완료했습니다. Mozilla는 매니페스트를 구현하는 중이며 [IE는 연구 중입니다](https://status.modern.ie/webapplicationmanifest?term=manifest).

{% include modules/nextarticle.liquid %}

{% endwrap %}
