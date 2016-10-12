project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹 앱 매니페스트 파일은 네이티브 앱에서 볼법한 당신이 어떻게 웹 앱을 제어하고 사용자에게 사이트를 어떻게 표현하는지의 기능들을 제공하는 JSON 파일입니다. 예를 들어, 모바일 홈스크린을 어떻게 실행하고 어떤 것을 나타낼지 정의가 가능합니다.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2016-02-11 #}

# 웹 앱 매니페스트 파일로 사용자 경험 향상시키기 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}


[웹 앱 매니페스트 파일](https://developer.mozilla.org/en-US/docs/Web/Manifest)은 네이티브 앱에서 볼법한 당신이 어떻게 웹 앱을 제어하고 사용자에게 사이트를 어떻게 표현하는지의 기능들을 제공하는 JSON 파일입니다. 예를 들어, 모바일 홈스크린을 어떻게 실행하고 어떤 것을 나타낼지 정의가 가능합니다.

웹 앱 매니페스트 파일은 사이트의 즐겨찾기 기능으로 모바일의 홈 스크린에 아이콘을 추가할 수 있는 기능을 제공합니다. 아래와 같은 환경에서 사이트가 실행되는 경우에 사용할 수 있습니다:

* 독자적인 아이콘과 이름으로 사용자가 다른 사이트와 구분할 수 있어야 합니다
* 리소스가 다운로드 되거나 캐쉬가 되는 동안 사용자에게 무언가를 보여줄 수 있어야 합니다
* 사이트의 리소스가 준비가 되었을 때, 브라우저에 매우 급작스러운 변화를 피할 수 있는 기본 디스플레이 속성 값들을 제공해야 합니다.

위 목록은 텍스트 파일 안의 메타데이터의 간단한 메커니즘을 통해 가능합니다. 이게 바로 웹 앱 매니페스트 파일입니다.

Note: Though you can use a web app manifest on any site, they are required for <a href='/web/progressive-web-apps'>progressive web apps</a>.


## Create the Manifest 

웹 앱 매니페스트 파일을 자세히 알아보기 전에 기본적인 매니페스트 파일을 생성하고 웹 페이지에 추가해봅니다.


### 매니페스트 파일 생성하기

매니페스트 파일은 원하면 언제든지 호출이 가능합니다. 대부분의 사람들은 보통 아래와 같은 `manifest.json` 파일을 사용합니다.


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

매니페스트 파일의 속성 중 `short_name`는 사용자의 홈스크린에 표시될 텍스트를 의미합니다. 그리고 `name` 는 웹 앱 설치 배너에 사용됩니다.

### 시작 URL 설정하기

`start_url` 속성을 추가하지 않으면 현재 페이지가 사용됩니다. 이 방식은 사용자가 원하지 않는 방향이죠.
하지만 이게 추가해야 할 유일한 이유는 아닙니다. 이 방법으로 당신은 앱이 어떻게 실행되는 지 정의할 수 있기 때문에,
어떻게 시작되었는지 알 수 있는 쿼리 스트링 파라미터를 `start_url` 에 추가할 수 있습니다. 예를 들면:


    "start_url": "/index.html?homescreen=1"
    

### 매니페스트 파일 정보를 브라우저에 등록하기

일단 매니페스트 파일을 생성하고 사이트에 등록하면, `link` 태그를 이용해서 앱의 모든 페이지에 다음과 같이 추가합니다:


    <link rel="manifest" href="/manifest.json">
    


## 아이콘 개인화 

사용자가 당신의 사이트를 홈스크린에 추가할 때, 브라우저에서 사용할 아이콘을 정의할 수 있습니다.
웹앱 아이콘의 타입, 크기, 추가적인 밀도를 아래와 같이 정의할 수 있습니다.


    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

Note: 홈 스크린에 아이콘을 저장할 때, 크롬은 화면 밀도에 맞는 아이콘을 먼저 찾습니다. 그리고 나서 48dp * 화면 밀도로 조정합니다. 만약 아무것도 찾지 못하면, 디바이스 특성과 가장 근접한 아이콘을 찾습니다. 어떤 이유에서든지 만약 특정 픽셀 밀도에 해당하는 아이콘을 설정하고 싶다면, 숫자 값을 갖는 <code>density</code> 멤버를 사용할 수 있습니다. 만약 밀도를 지정하지 않으면, 디폴트 값으로 1.0 을 갖습니다. 이는 “화면 밀도를 1.0 이상으로 갖는 아이콘을 사용합니다” 라는 일반적인 의미를 갖습니다.

<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>


## 스플래쉬 스크린 추가하기 



홈 화면에서 웹 앱을 실행할 때 화면 뒤쪽에서 몇가지 일들이 발생합니다:

1. 크롬이 실행됩니다.
2. 페이지 시작을 표시하는 renderer가 실행됩니다.
3. 네트워크로 사이트를 로드하거나 서비스워커가 있으면 캐쉬로 로딩합니다.

상기 작업들이 일어나는 동안 화면은 하얗게 보여서 아마 지연되는 것으로 보일 것입니다.
만약 이 웹 앱을 홈페이지에 보일 페이지당 1초에서 2초가 걸리는 네트워크 환경에서 로딩하는 경우 더 그렇게 보입니다.

더 나은 사용자 경험을 제공하기 위해서 이 하얀색 화면을 제목, 색깔, 이미지 등으로 대체할 수 있습니다.

### 이미지와 제목 설정하기

만약 이 튜토리얼을 처음부터 보셨다면, 이미 이미지와 제목을 설정하셨을 겁니다. 크롬은 매니페스트 파일의 지정된 멤버들로 이미지와 제목을 추론합니다.
여기서 중요한 점은 구체적으로 아는 것입니다.

스플래쉬 스크린 이미지는 `icons` 배열에서 도출됩니다. 크롬은 디바이스를 위해 128dp 에 근접한 이미지를 선택합니다. 제목은 `name` 멤버에서 지정한 값으로 생성됩니다.

### 배경 색 지정하기

`background_color` 속성을 이용하여 배경색을 설정합니다.
웹 앱이 실행되는 즉시 크롬에서 이 색으로 정하여, 첫 렌더링이 될 때 까지 화면에 남아있습니다.

배경색을 설정하기 위해서는 아래와 같이 매니페스트 파일을 설정합니다.


    "background_color": "#2196F3",
    

이제는 홈 화면에서 사이트를 실행해도 더이상 하얀 화면이 존재하지 않습니다.

이 속성에 권고되는 값은 로딩 페이지의 배경 색입니다. 로딩 페이지와 같은 색을 사용함으로써 스플래쉬 스크린과 홈페이지 사이의 화면을 부드럽게 전환할 수 있습니다.

<figure>
  <img src="images/background-color.gif" alt="backgroud color" style="max-height: 550px;">
  <figcaption>Background color for launch screen</figcaption>
</figure>

### 테마 색 지정하기

`theme_color` 속성을 이용하여 테마 색을 지정합니다. 이 속성은 툴바의 색깔을 지정합니다.
기존의 `<meta>` 값을 `theme-color` 에 중복하여 사용하기를 추천합니다.


## 실행 유형 설정하기 


웹 앱 매니페스트 파일을 사용하여 화면 유형과 페이지 오리엔테이션을 제어합니다.


### 화면 유형 개인화 하기

`display` 타입을 `standalone`으로 설정하면 웹앱에서 브라우저 UI를 숨길 수 있습니다.


    "display": "standalone"
    

사용자가 만약 당신의 페이지를 브라우저의 일반 사이트로 보고 싶다는 생각이 든다면,
`display` 를 `browser` 로 지정하면 됩니다.


    "display": "browser"
    

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

### 페이지의 초기 오리엔테이션 지정하기

게임과 같은 앱 처럼 특정 오리엔테이션에서 혜택이 더 많을 경우, 그 오리엔테이션을 지정할 수 있습니다.
오리엔테이션을 선택적으로 적용해보세요. 사용자는 오리엔테이션을 선택하는 것을 선호합니다.


    "orientation": "landscape"
    

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>


## 사이트 너비의 테마색 제공하기 



크롬은 2014년에 사이트 테마색의 개념을 소개하였습니다.
테마색은 [주소바와 같은 UI 요소](/web/fundamentals/design-and-ui/browser-customization/)에 어떤 색을 넣을지 브라우저에게 힌트를 주는 역할을 합니다.


<figure>
  <img src="images/theme-color.png" alt="backgroud color">
  <figcaption>Theme color</figcaption>
</figure>

매니페스트 파일이 없으면 모든 페이지에 사이트 테마색을 넣어야 합니다. 그리고 만약 사이트가 거대하거나 오래된 사이트인 경우, 여러 페이지의 변화는 실현하기 어렵습니다.

매니페스트 파일에 `theme_color` 속성을 추가하면, 홈 화면으로 사이트를 실행할 때, 해당 도메인의 모든 페이지에 자동으로 테마색이 적용됩니다.


    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="backgroud color">
  <figcaption>Sitewide theme color</figcaption>
</figure>


## 더 보기 



이 글은 웹 앱 매니페스트 파일에 대해 간략히 소개하고, 더 많은 정보를 얻을 수 있는 리소스를 제공합니다.

* 웹 앱 매니페스트 파일을 사용하고 계신다면, 아마 [앱 설치 배너](/web/fundamentals/engage-and-retain/app-install-banners)도 설정해볼만 합니다.

* 웹 앱 매니페스트 파일은 Mozilla Developer Network 에 자세하게 [가이드](https://developer.mozilla.org/en-US/docs/Web/Manifest)가 되어있습니다.

* 웹 앱 매니페스트를 만든 제작자에게 기능 설명을 듣고 싶다면, [W3C 스펙](http://www.w3.org/TR/appmanifest/) 을 확인하세요.

Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}
