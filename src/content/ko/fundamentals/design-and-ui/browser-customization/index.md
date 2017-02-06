project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 모던 브라우저에서는 아이콘, 주소창 색상, 사용자 지정 타일을 수정하는 등 몇가지 컴포넌트를 사용자가 정의할 수 있습니다. 이런 간단한 조정으로 사용자의 참여도를 높이고 다시 사이트를 방문하도록 합니다.


{# wf_updated_on: 2017-01-31 #}
{# wf_published_on: 2015-09-21 #}

# 아이콘들과 브라우저 색상들 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

모던 브라우저에서는 아이콘, 주소창 색상, 사용자 지정 타일을 수정하는 등 몇가지 컴포넌트를 사용자가 정의할 수 있습니다. 이런 간단한 조정으로 사용자의 참여도를 높이고 다시 사이트를 방문하도록 합니다.

## 멋진 아이콘과 타일 제공

사용자가 웹페이지에 접속하면 브라우저는 HTML에서 아이콘을 다운받고자합니다.
아이콘은 브라우저 탭, 최근 앱 전환, 새로운 (혹은 최근에 방문한) 탭 페이지 등 다양한 곳에서 보여집니다.

높은 퀄리티의 이미지를 제공하면 사이트를 더 쉽게 알아볼 수 있어 사용자가 사이트를 찾기 쉽게 합니다.

모든 브라우저를 지원하기 위해, 각 페이지의 `<head>` 요소에 몇가지 태그를 추가해야합니다.


    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome & Opera

Chrome과 Opera는 디바이스에서 필요한 크기로 배율을 조정하는 `icon.png`를 사용합니다.
자동 배율 조정을 막기 위해 `sizes` 속성을 지정하여 추가적인 크기를 제공할 수 있습니다.

Note: 아이콘의 크기는 48px을 기본으로 합니다. 예를 들어 48px, 96px, 144px, 192px로 늘어납니다.

### Safari

Safari는 `rel` 속성의 값을 `apple-touch-icon`으로 가진 `<link>` 태그를 사용합니다.

OS에서 아이콘 리사이즈를 막기 위해, 각 아이콘별 개별 link 태그를 사용하여 [명시적 크기](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)를 지정할 수 있습니다.

    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer & Windows Phone

Windows 8의 새 홈 스크린은 고정된 사이트를 위한 네가지 다른 레이아웃을 지원하기 때문에 네가지 아이콘이 필요합니다.
특정 크기를 지원하지 않으려면 관련 메타 태그를 생략할 수 있습니다.


    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Internet Explorer의 타일

마이크로소프트의 "고정된 사이트"와 회전하는 "라이브 타일"은 다른 구현을 뛰어넘으며 이 가이드의 목적을 뛰어넘습니다.
MSDN의 [IE11의 웹 사이트에 대한 라이브 타일 만들기](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx)을 참고하세요.

## 브라우저 요소 색상

다른 `meta` 요소를 사용하여 플랫폼의 요소나 브라우저를 사용자 지정할 수 있습니다.
이 중 몇가지는 특정 플랫폼이나 브라우저에서만 동작함에 유의하시길 바랍니다. 하지만 경험을 크게 개선합니다.
Chrome, Firefox OS, Safari, Internet Explorer, Opera Coast를 사용하면
메타 태그를 이용하여 플랫폼의 요소나 브라우저의 요소의 색상을 정의할 수 있습니다.

### Chrome과 Opera를 위한 메타 테마 색상

Android용 Chrome을 위한 테마 컬러를 지정하려면 메타 테마 색상을 사용합니다.

    <!-- Chrome, Firefox OS, Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Theme colors styling the address bar in Chrome">

### Safari 특정 스타일링

Safari에서는 상태바의 스타일을 지정하고 시작 이미지를 지정할 수 있습니다.

#### 시작 이미지 지정

기본적으로 Safari는 로딩시간에 빈 화면을 보여주고 여러 페이지 로딩 후에는 앱의 이전 상태 스크린샷을 보여줍니다.
`rel=apple-touch-startup-image`를 가진 link 태그를 추가하여 명시적인 시작 이미지를 보여주도록 Safari에게 전해 이를 막을 수 있습니다. 예:


    <link rel="apple-touch-startup-image" href="icon.png">
    

이미지는 타겟 기기 화면의 특정 크기여야 합니다. 그렇지 않으면 사용하지 않습니다.
더 자세한 내용은 [Safari 웹 콘텐츠 가이드라인](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)을 참고하세요.

이 주제에 관한 Apple의 문서는 드물지만 개발자 커뮤니티는 고급 미디어 쿼리를 사용하여 적절한 장치를 선택하고 올바른 이미지를 지정하여 모든 장치를 대상으로 지정하는 방법을 찾아 냈습니다
[tfausak's gist](//gist.github.com/tfausak/2222823)에서 제공하는, 동작하는 해결법이 있습니다.

#### 상태바 외관 변경

상태바의 기본 외관을 `black`이나 `black-translucent`으로 변경할 수 있습니다.
`black-translucent`일 때 상태바는 풀스크린 콘텐츠의 내용 위로 올라갑니다.
이는 레이아웃의 높이를 키우지만, 상단을 가로막습니다.

아래 코드가 필요합니다:


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption><code>black-translucent</code>를 사용한 스크린샷</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption><code>black</code>을 사용한 스크린샷</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


