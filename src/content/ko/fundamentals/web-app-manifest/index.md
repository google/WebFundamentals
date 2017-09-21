project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹 앱 매니페스트는 사용자가 네이티브 앱을 볼 것으로 예상되는 영역(예: 기기의 홈 화면)에 웹 앱이나 사이트를 나타내는 방식을 제어하고, 사용자가 시작할 수 있는 항목을 지시하고, 시작 시의 모습을 정의할 수 있는 JSON 파일입니다.

{# wf_updated_on: 2016-08-19 #}
{# wf_published_on: 2016-02-11 #}

# 웹 앱 매니페스트 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

[웹 앱 매니페스트](https://developer.mozilla.org/en-US/docs/Web/Manifest)는 사용자가 앱을 볼 것으로 예상되는 영역(예: 휴대기기 홈 화면)에 웹 앱이나 사이트를 나타내는 방식을 개발자가 제어하고, 사용자가 시작할 수 있는 항목을 지시하고, 시작 시의 모습을 정의할 수 있는 JSON 파일입니다.

웹 앱 매니페스트는 사이트 북마크를 기기의 홈 화면에 저장하는 기능을 제공합니다. 사이트가 이러한 방식으로 시작될 경우: 

* 고유한 아이콘과 이름을 가지므로, 사용자가 다른 사이트와 구분할 수 있습니다.
* 리소스가 다운로드되거나 캐시에서 복원되는 경우 사용자에게 무엇인가를 표시합니다.
* 사이트 리소스가 사용 가능해질 때 너무 갑작스러운 전환을 막기 위해, 기본 디스플레이 특성을 브라우저에 제공합니다. 

이 모든 작업은 텍스트 파일에 있는 메타데이터의 간단한 메커니즘을 통해 수행됩니다. 이것이 바로 웹 앱 매니페스트입니다.

참고: 웹 앱 매니페스트는 모든 사이트에 사용될 수 있으며, Progressive Web App(/web/progressive-web-apps/)에는 필수입니다.

### TL;DR {: .hide-from-toc }
- 매니페스트를 생성하고 페이지에 연결하는 과정은 간단합니다.
- 홈 화면에서 실행할 때 사용자에게 무엇을 보여줄지 제어합니다.
- 여기에는 스플래시 화면, 테마 색상, 심지어 열린 URL까지 포함됩니다. 

## 매니페스트 만들기

웹 앱 매니페스트 파일을 자세히 알아보기 전에, 기본적인
매니페스트 파일을 생성하고 이 파일에 웹 페이지를 링크해 보겠습니다.

원할 때마다 매니페스트를 호출할 수 있습니다. 대부분은 `manifest.json`을 사용합니다. 예를 들면 다음과 같습니다.


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
    

다음 항목을 반드시 포함하세요. 

* `short_name` - 사용자 홈 화면의 텍스트로 사용  
* `name` - 웹 앱 설치 배너에 사용  
  

## 브라우저에게 매니페스트 정보 알려주기

매니페스트를 생성하고 사이트에 넣었다면
다음과 같이 웹 앱을 포함하는 모든 페이지에 `link` 태그를 추가합니다.


    <link rel="manifest" href="/manifest.json">
  
## 시작 URL 설정

`start_url`을 제공하지 않으면 현재 페이지가 사용되며,
이는 사용자가 원하지 않을 것입니다. 하지만 이것이 포함할
유일한 이유는 아닙니다. 이제 앱이 시작되는 방식을 정의할 수 있기 때문에,
앱이 시작된 방식을 나타내는 쿼리 문자열 매개변수를 `start_url`에 추가합니다. 

    "start_url": "/?utm_source=homescreen"

원하는 값은 무엇이든 추가할 수 있습니다. 우리가 사용하는 값은 Google 애널리틱스에 의미가 있다는 장점이 있습니다.
 

## 아이콘 사용자설정

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="홈 화면에 추가 아이콘">
  <figcaption>홈 화면에 추가 아이콘</figcaption>
</figure>

 사용자가 홈 화면에 여러분의 사이트를 추가하면, 브라우저에서 사용할 일련의 아이콘을 정의할 수 있습니다. 다음과 같은 형식과 크기로 정의할 수 있습니다.

<div style="clear:both;"></div>

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
    

참고: 아이콘을 홈 화면에 저장할 때, Chrome은 먼저 디스플레이의 밀도와 일치하고 크기가 48dp 화면 밀도인 아이콘을 찾습니다. 하나도 발견되지 않을 경우에는, 기기 특성과 가장 일치하는 아이콘을 찾습니다. 어떤 이유로 아이콘을 특정 픽셀 밀도로 표시하려는 경우, 숫자를 취하는  <code>density</code> 멤버(선택 항목)를 사용할 수 있습니다. 밀도를 선언하지 않으면 기본적으로 1.0으로 설정됩니다. 이는 '화면 밀도가 1.0 이상인 경우 이 아이콘을 사용'한다는 의미이며, 이 밀도는 일반적으로 여러분이 원하는 것입니다.

## 스플래시 화면 추가

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="배경 색상">
  <figcaption>시작 화면의 배경 색상</figcaption>
</figure>

홈 화면에서 웹 앱을 시작하면 그 이면에서는 다음과 같은
여러 가지 일이 발생합니다.

1. Chrome이 시작됩니다.
2. 해당 페이지를 표시하는 렌더러가 시작됩니다.
3. 여러분의 사이트가 네트워크에서 로드됩니다. (또는 서비스 워커가 있는 경우 캐시에서 로드됩니다.)

이 동작이 실행되는 동안 화면은 흰색으로 바뀌고 정지한 듯이 보입니다.
네트워크에서 웹 페이지를 로드할 때는 특히 눈에 띄는데,
페이지가 홈페이지에 표시되기까지 1~2초 이상이 걸립니다.

더 나은 사용자 환경을 제공하기 위해 흰색 화면을 제목, 색상 및 이미지로 대체할 수 있습니다. 

### 이미지 및 제목 설정

처음부터 따라 오셨다면 여러분은 이미 이미지와 제목을 설정했을 것입니다. Chrome은 매니페스트의 특정 멤버로부터 이미지와 제목을 추론합니다. 여기서 중요한 점은 세부 사항을 아는 것입니다. 

스플래시 화면 이미지는 `icons` 배열에서 그려집니다. Chrome은 기기에 대해 128dp에 가장 가까운 이미지를 선택합니다. 제목은 단순히 `name` 멤버에서 가져옵니다.

### 배경 색상 설정 

적절하게 명명된 `background_color` 속성을 사용하여
배경 색상을 지정합니다. Chrome은 웹 앱이 실행될 때 이 색상을 사용하고
이 색상은 웹 앱이 처음 렌더링될 때까지 화면에 남아 있습니다.

배경 색상을 설정하려면 매니페스트에서 다음을 설정합니다.


    "background_color": "#2196F3",
    

이제 홈 화면에서 사이트가 시작될 때 흰색 화면이 나타나지 않습니다.

이 속성에 제안되는 적합한 값은 로드 페이지의 배경 색상입니다.  로드 페이지와 동일한 색상을 사용하면, 시작 화면에서 홈페이지로
매끄러운 전환이 가능합니다.

### 테마 색상 설정

`theme_color` 속성을 사용하여 테마 색상을 지정합니다. 이 속성은
툴바의 색상을 설정합니다. 이를 위해 기존 색상을 중복 사용할 것을
제안합니다(특히 `theme-color` `<meta>`).


## 시작 스타일 설정

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>매니페스트 표시 옵션</figcaption>
</figure>

웹 앱 매니페스트 파일을 사용하여 디스플레이 유형 및 페이지 방향을 제어합니다.

### 디스플레이 유형 사용자설정

웹 앱이 브라우저의 UI를 숨기도록 만들려면 `display` 유형을 `standalone`으로 설정합니다.


    "display": "standalone"
    

여러분의 페이지가 브라우저에서 일반 사이트로 표시되는 것을 사용자가 선호할 것이라고 생각한다면 `display` 형식을 `browser`로 설정할 수 있습니다.


    "display": "browser"
    
<div style="clear:both;"></div>

### 페이지의 초기 방향 지정

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="웹 앱 매니페스트 방향 옵션">
  <figcaption>웹 앱 매니페스트 방향 옵션</figcaption>
</figure>

특정 방향을 강제로 지정할 수 있으며, 이 기능은
한 방향에서만 작동하는 앱(예: 게임)에서 유용합니다. 이 기능은 선택적으로
사용하세요. 사용자는 방향을 선택하는 것을 선호합니다.


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## 사이트 전체에 테마 색상 제공

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="배경 색상">
  <figcaption>테마 색상</figcaption>
</figure>

Chrome은 사이트에 사용되는 테마 색상의 개념을 2014년에 도입했습니다. 테마 색상은
[주소 표시줄과 같은 UI 요소](/web/fundamentals/design-and-ux/browser-customization/)에 어떤 색조를 사용할지
브라우저에 알려줍니다.  

매니페스트가 없으면 여러분이 모든 단일 페이지에서 테마 색상을 정의해야 하며,
큰 사이트나 레거시 사이트가 있는 경우라면 많은 사이트 범위의 변경을 수행하기가 어렵습니다.

<div style="clear:both;"></div>

`theme_color` 속성을 매니페스트에 추가하고, 사이트가 홈 화면에서 시작되면
해당 도메인의 모든 페이지에 자동으로 테마 색상이 적용됩니다.



    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="배경 색상">
  <figcaption>사이트 테마 색상</figcaption>
</figure>

## 매니페스트 테스트 {: #test }

여러분의 웹 앱 매니페스트가 올바르게 설정되었는지 수동으로 검증하려면 
Chrome DevTools의 **Application** 창에서 **Manifest** 탭을 사용하세요.

![Chrome DevTools의 Manifest 탭](images/devtools-manifest.png)

이 탭은 매니페스트 속성 대부분에 대해 사람이 읽을 수 있는
버전을 제공합니다. 이 탭에 대한 자세한 내용은 Chrome DevTools에서 [웹 앱
매니페스트](/web/tools/chrome-devtools/progressive-web-apps#manifest)를
참조하세요. 또한
여기서 Add to Homescreen 이벤트를 시뮬레이션할 수 있습니다. 이 주제에 대한 자세한 내용은 [앱 설치 배너
테스트](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)를
참조하세요.

웹 앱 매니페스트를 자동으로 검증하고 싶다면
[Lighthouse](/web/tools/lighthouse/)를 살펴보세요. Lighthouse는
Chrome 확장 프로그램 또는 NPM 모듈로 실행할 수 있는 웹 앱 감사 도구입니다. Lighthouse에
URL을 입력하면 Lighthouse가 해당 페이지에 대해 감사 스위트를 실행한 다음
결과를 보고서로 표시합니다. Lighthouse 감사는
웹 앱 매니페스트와 관련하여 다음 내용을 검사합니다.

* 앱을 홈 화면에 추가할 수 있습니다.
* 앱은 홈 화면에 추가된 후, 사용자설정 스플래시 화면을 실행합니다.
* 브라우저 주소 표시줄의 색상은 사용자설정이 가능합니다.
* 앱은 HTTPS에 있습니다(Add to Homescreen을 사용하기 위한 전제 조건).

## 추가 정보

이 문서에서는 웹 앱 매니페스트에 대해 간단히 소개했습니다.
그러나 알아야 할 것이 더 많이 있습니다.

* 웹 앱 매니페스트를 사용 중인 경우, 아마
[앱 설치 배너](/web/fundamentals/engage-and-retain/app-install-banners/)도 함께 설치할 것입니다. 

* 웹 앱 매니페스트에 대한 [전체 참조](https://developer.mozilla.org/en-US/docs/Web/Manifest)는
Mozilla 개발자 네트워크에서 구할 수 있습니다.

* 웹 앱 매니페스트를
작성했던 엔지니어로부터 기능 설명을 원하면, [실제 W3C 사양](http://www.w3.org/TR/appmanifest/){: .external }을 읽어보세요.

참고: 앞으로 `manifest.json` 파일을 업데이트할 경우,
사용자가 앱을 홈 화면에 다시 추가하지 않는 한 변경 사항이 자동으로
적용되지 않습니다.





{# wf_devsite_translation #}
