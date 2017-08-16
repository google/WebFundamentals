project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 전체 화면 보기

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-10-01 #}

# 전체 화면 경험 구현 {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

몰입형 전체 화면 웹사이트와 애플리케이션을 쉽게 만들 수 있지만
웹상의 다른 기술과 마찬가지로 이를 실행하는 방법은 여러 가지가 있습니다.
전체 화면을 실행하는 '설치형 웹 앱' 경험을 지원하는 브라우저가 늘어나고 있는 요즘에는
이 점이 특히 중요합니다.

<div class="clearfix"></div>

## 앱 또는 사이트를 전체 화면으로 구현

사용자 또는 개발자가 웹 앱 전체 화면을 구현하는 방법은 여러 가지가 있습니다.

* 사용자 동작에 응답하여 브라우저에 전체 화면 요청
* 홈 화면에 앱 설치
* 주소 표시줄을 자동으로 숨겨서 가상으로 전체 화면 구성

### 사용자 동작에 응답하여 브라우저에 전체 화면 요청

<a href="http://caniuse.com/#feat=fullscreen">플랫폼은 동일하지 않습니다</a>.
iOS Safari는 Fullscreen API가 없지만 Android의 Chrome과
Firefox, IE 11+에는 있습니다. 여러분이 빌드하는 대부분 애플리케이션은 전체 화면 사양에서 제공하는
JS API와 CSS 선택기를 함께 사용합니다. 전체 화면 경험을 빌드할 때
주의해야 할 주요 JS API는 다음과 같습니다.

* `element.requestFullscreen()`: (현재 Chrome, Firefox, IE에서 프리픽스됨)
  전체 화면 모드에서 요소를 표시합니다.
* `document.exitFullscreen()`: (현재 Chrome, Firefox 및 IE에서 프리픽스됨.
  Firefox는 `cancelFullScreen()` 사용) 전체 화면 모드를 취소합니다.
* `document.fullscreenElement`: (현재 Chrome, Firefox 및 IE에서 프리픽스됨)
  전체 화면 모드인 요소가 있으면 true를 반환합니다.

참고: 프리픽스된 버전은
      화면에서 'S'의 대소문자 표기가 일관적이지 못합니다. 곤란한 문제이지만,
      현재 적용되는 사양과 관련이 있습니다.

앱이 전체 화면이 되면
브라우저의 UI 컨트롤을 더 이상 사용할 수 없게 됩니다. 이로 인해 사용자가 여러분의 경험과 상호작용하는 방식이
변경됩니다. 앞으로, 뒤로 등과 같은 표준 탐색 컨트롤이
 없고 탈출 수단인 새로고침 버튼도 없습니다.  이 시나리오를
수용하는 것이 중요합니다.  몇 가지 CSS 선택기를 사용하여
브라우저가 전체 화면 모드로 진입할 때 사이트 스타일과 표현을 변경할 수 있습니다.


    <button id="goFS">Go fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          document.body.requestFullscreen();
      }, false);
    </script>

위의 예시는 공급업체 프리픽스 사용과 관련된 모든 복잡한 내용을
감추었기 때문에 다소 부자연스럽습니다.

참고: 공급업체 프리펙스는 골치가 아픕니다!

실제 코드는 훨씬 더 복잡합니다. <a
href="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Mozilla</a>는
전체 화면 전환에 사용할 수 있는 매우 유용한 스크립트를 개발했습니다.  보다시피
공급업체 프리픽스 상황에서는 지정된 API에 비해
코드가 복잡하고 느려집니다. 아래와 같이 코드를 단순화하더라도
여전히 복잡합니다.

    function toggleFullScreen() {
      var doc = window.document;
      var docEl = doc.documentElement;

      var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
      }
      else {
        cancelFullScreen.call(doc);
      }
    }

우리 웹 개발자들은 복잡한 것을 싫어합니다.  여러분이 사용할 만한 멋진 고수준 추상 API로는
<a href="http://sindresorhus.com/screenfull.js"/>Sindre Sorhus</a>의 <a
href="https://github.com/sindresorhus/screenfull.js">Screenfull.js</a> 모듈이 있습니다.
이 모듈은 약간 차이가 있는 JS API와 공급업체 프리픽스를
하나의 일관적인 API로 통합합니다.

#### Fullscreen API 팁

##### 문서를 전체화면으로 구현

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>그림 1: 본문 요소의 전체 화면</figcaption>
</figure>


본문 요소를 전체 화면으로 구현하는 것이 당연하다고 생각할 수 있지만,
WebKit 또는 Blink 기반 렌더링 엔진을 사용하는 경우
본문 너비가 촤대한 작은 크기로 줄어들고 그 안에 모든 콘텐츠가 들어가는 이상한 현상을
보게 될 것입니다. (Mozilla Gecko는 괜찮습니다.)

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png" >
<figcaption>그림 2: 문서 요소의 전체 화면</figcaption>
</figure>

이 문제를 해결하려면 본문 요소 대신 문서 요소를 사용해야 합니다.

    document.documentElement.requestFullscreen();



<div class="clearfix"></div>


##### 동영상 요소를 전체 화면으로 구현

동영상 요소를 전체 화면으로 구현하는 과정은 다른
요소를 전체 화면으로 구현하는 방법과 정확히 같습니다. 동영상 요소에서 `requestFullscreen` 메서드를
호출합니다.

    <video id=videoElement></video>
    <button id="goFS">Go Fullscreen</button>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var videoElement = document.getElementById("videoElement");
          videoElement.requestFullscreen();
      }, false);
    </script>

`<video>` 요소에 컨트롤 속성이 정의되지 않았다면
전체 화면일 때 사용자가 동영상을 제어할 방법이 없습니다. 권장되는 방법은
동영상을 래핑하는 기본 컨테이너와
사용자에게 보여줄 컨트롤을 갖는 것입니다.

    <div id="container">
      <video></video>
      <div>
        <button>Play</button>
        <button>Stop</button>
        <button id="goFS">Go fullscreen</button>
      </div>
    </div>
    <script>
      var goFS = document.getElementById("goFS");
      goFS.addEventListener("click", function() {
          var container = document.getElementById("container");
          container.requestFullscreen();
      }, false);
    </script>

이렇게 하면 컨테이너 객체를
CSS 의사 선택기와 결합할 수 있기 때문에 유연성이 높아집니다(예: 'goFS' 버튼 숨기기).

    <style>
      #goFS:-webkit-full-screen #goFS {
        display: none;
      }
      #goFS:-moz-full-screen #goFS {
        display: none;
      }
      #goFS:-ms-fullscreen #goFS {
        display: none;
      }
      #goFS:fullscreen #goFS {
        display: none;
      }
    </style>

이런 패턴을 사용하면 전체 화면이 실행되는 시기를 감지하고
사용자 인터페이스를 적절히 수정할 수 있습니다. 예를 들어, 다음과 같은 방법을 사용합니다.

* 시작 페이지로 돌아가는 링크 제공
* 대화상자를 닫거나 되돌아가는 메커니즘 제공


### 홈 화면에서 페이지 전체 화면 시작

사용자가 웹 페이지를 탐색할 때 전체 화면 웹 페이지를 시작하는 것은 불가능합니다.
브라우저 공급업체는 페이지를 로드할 때마다 전체 화면이 되면 매우 짜증을 유발할 수 있으므로
전체 화면으로 진입하려면 사용자 동작이 필요하다는 것을 잘 알고 있습니다.
그러나 공급업체는 사용자가 앱을 '설치'하는 것은 허용합니다.
앱을 설치하면 사용자가 플랫폼에서 앱을 시작하고 싶다는 신호를 
운영체제에 보내는 것과 같습니다.

주요 모바일 플랫폼에서는 다음과 같이 메타 태그나 매니페스트 파일을 사용한
구현이 매우 쉽습니다.

#### iOS

iPhone이 출시된 이후로 사용자는 웹 앱을 홈 화면에
설치하고 전체 화면 웹 앱으로 실행할 수 있게 되었습니다.

    <meta name="apple-mobile-web-app-capable" content="yes">

> content가 yes로 설정되어 있으면 웹 애플리케이션이 전체 화면 모드에서 실행됩니다.
> 그렇지 않을 경우에는 이 모드에서 실행되지 않습니다. 기본 동작은 Safari를 사용하여 웹
> 콘텐츠를 표시하는 것입니다. window.navigator.standalone 읽기 전용 부울 자바스크립트 속성을 사용하면
> 웹 페이지가 전체 화면으로 표시되는지 확인할 수 있습니다.
> <a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">Apple</a>

#### Android용 Chrome

최근 Chrome 팀은 사용자가 홈 화면에 앱을 추가하면 페이지를 전체 화면으로 실행하라고
브라우저에게 알리는 기능을 구현했습니다.  이는
iOS Safari 모델과 유사합니다.

    <meta name="mobile-web-app-capable" content="yes">

> 애플리케이션 바로가기 아이콘을 기기 홈 화면에 추가하고
> Android용 Chrome의 'Add to Home screen' 메뉴 항목을 사용하여 
> 앱을 전체 화면으로 실행하도록 웹 앱을 설정할 수 있습니다.
>  <a href="https://developers.chrome.com/multidevice/android/installtohomescreen">Google Chrome</a>

이보다 더 좋은 방법은 웹 앱 매니페스트를 사용하는 것입니다.

#### 웹 앱 매니페스트(Chrome, Opera, Firefox, Samsung)

[웹 애플리케이션의 매니페스트](/web/fundamentals/engage-and-retain/web-app-manifest/)
는 원하는 영역(예: 모바일 홈 화면)에 표시되는 앱의 모양을 제어할 수 있는 기능을
개발자에게 제공하고 실행 가능한 것과 실행 방식을
지시하는 단순한 JSON 파일입니다.
 미래에 매니페스트는
앱에 대한 더 세밀한 제어 기능을 제공할 것이지만, 현재로서는 앱 실행 방식에만 집중합니다.
 구체적인 사항은 다음과 같습니다.

1. 브라우저에 매니페스트에 대한 정보 전달
2. 실행 방법 설명

맨니페스트를 생성하고 사이트에 호스팅한 후에는 다음과 같이
앱을 포함하는 모든 페이지에 링크 태그를 추가하는 작업만 수행하면 됩니다.

    <link rel="manifest" href="/manifest.json">

Chrome은 Android 버전 38 이후(2014년 10월)부터 매니페스트를 지원하고 있습니다.
이 기능을 사용하면 웹 앱을 홈 화면에 설치했을 때 웹 앱이 나타나는 방식을 제어하고(`short_name`, `name` 및 `icons` 속성을 통해),
사용자가 실행 아이콘을 클릭했을 때
실행 방식(`start_url`,
`display` 및 `orientation`을 통해)을 제어할 수 있습니다.

다음은 예시 매니페스트입니다. 이 예시는 매니페스트에 포함할 수 있는 모든 것을
보여주지는 않습니다.

    {
      "short_name": "Kinlan's Amaze App",
      "name": "Kinlan's Amazing Application ++",
      "icons": [
        {
          "src": "launcher-icon-4x.png",
          "sizes": "192x192",
          "type": "image/png"
        }
      ],
      "start_url": "/index.html",
      "display": "standalone",
      "orientation": "landscape"
    }

이 기능은 완전히 점진적이며,
이 기능을 지원하는 브라우저 사용자를 위해 더욱 개선되고 통합된 경험을 개발할 수 있습니다.

사용자가 여러분의 사이트나 앱을 홈 화면에 추가하는 것은
앱처럼 취급하겠다는 사용자의 의도를 나타냅니다. 즉, 사용자를 제품 방문 페이지가 아니라
앱의 기능으로 안내하는 것을 목표로 삼아야 합니다. 예를 들어
사용자가 앱에 로그인해야 한다면
이 페이지를 시작 페이지로 삼는 것이 좋습니다.

##### 유틸리티 앱

대부분의 유틸리티 앱은 이 기능을 바로 활용할 수 있습니다. 
다른 앱과 마찬가지로 이러한 앱이 모바일 플랫폼에서 독립적으로 실행되기를
바랄 것입니다. 앱을 독립적으로 실행하려면
다음 내용을 웹 앱 매니페스트에 추가하세요.

    "display": "standalone"

##### 게임

대부분 게임도 매니페스트를 바로 활용할 수 있습니다. 대다수 게임은
전체 화면으로 실행하고 특정 방향을
강제로 지정하고자 할 것입니다.

수직 스크롤러를 개발하거나 Flappy Birds와 같은 게임을 개발 중이라면
게임을 항상 세로 모드로 유지시켜야 합니다.

    "display": "fullscreen",
    "orientation": "portrait"

반면 퍼즐 게임이나 X-Com과 같은 게임을 개발 중이라면
아마 게임을 항상 가로 방향으로 사용하기를 원할 것입니다.

    "display": "fullscreen",
    "orientation": "landscape"

##### 뉴스 사이트

대부분의 경우 뉴스 사이트는 순수한 콘텐츠 기반 환경입니다. 당연히 대부분의 개발자는
뉴스 사이트를 매니페스트에 추가하려고 생각하지 않습니다.  매니페스트를 사용하면
실행할 페이지(뉴스 사이트의 1면)와
실행 방법(전체 화면 또는 일반 브라우저 탭)을 정의할 수 있습니다.

선택은 여러분 자신에 달려 있습니다. 또한 여러분이 생각하는 사용자가 원하는 액세스 방식에도
영향을 받습니다. 여러분의 사이트가 다른 사이트와 같은 모든 브라우저 chrome 요소를 갖도록 하려면
디스플레이를 `browser`로 설정하면 됩니다.

    "display": "browser"

여러분의 뉴스 사이트에 뉴스 중심적인 앱 느낌을 주기 위해
앱처럼 취급하고 UI에서 모든 웹과 유사한 chrmome을 제거하고 싶다면
디스플레이를 `standalone`으로 설정하세요.

    "display": "standalone"

### 주소 표시줄을 자동으로 숨겨서 가상으로 전체 화면 구성

다음과 같이 주소 표시줄을 자동으로 숨겨서 '가짜 전체 화면'을 만들 수 있습니다.

    window.scrollTo(0,1);

Caution: 친구로서 말씀드립니다. 그런 방법이 있기는 합니다. 하지만
         편법입니다. 이 방법을 사용하지 마세요. &mdash; Paul

방법은 상당히 간단합니다. 페이지가 로드되고 브라우저 메뉴에게
사라지라고 지시합니다. 안타깝게도 이 방법은 표준이 아니고
지원되지 않는 곳도 많습니다. 여러 가지 문제도 해결해야 합니다.

예를 들어 사용자가 페이지로 돌아가면 브라우저가 해당 페이지의
위치를 복구하는 경우가 많습니다. `window.scrollTo`를 사용하면 이 설정을 재정의하기 때문에
사용자에게 짜증을 유발합니다. 이 문제를 해결하려면
localStorage에 마지막 위치를 저장하고 돌발 상황을 해결해야 합니다(예를 들어 사용자가 여러 창에서 페이지를 열었을
경우).

## UX 가이드라인

여러분이 전체 화면을 사용하는 사이트를 구축하고 있을 경우
사용자가 좋아하는 서비스를 구현하려면 알아두어야 할 잠재적 사용자 환경 변경 사항이
여러 가지 있습니다.

### 내비게이션 컨트롤에 의존하지 마세요.

iOS는 하드웨어 뒤로 버튼이나 새로고침 동작이 없습니다. 그러므로
사용자가 갇히지 않고 앱을 탐색할 수 있게 해야 합니다.

모든 주요 플랫폼에서 전체 화면 모드로 실행되는지 설치 모드로 실행되는지
쉽게 탐지할 수 있어야 합니다.

#### iOS

iOS에서는 `navigator.standalone` 부울을 사용하여 사용자가
홈 화면에서 실행했는지 알 수 있습니다.

    if(navigator.standalone == true) {
      // My app is installed and therefore fullscreen
    }

#### 웹 앱 매니페스트(Chrome, Opera, Samsung)

설치된 앱으로 실행하면 Chrome은 실제 전체 화면으로
실행되지 않으므로 `document.fullscreenElement`는 null을 반환하고 CSS 선택기가
작동하지 않습니다.

사용자가 사이트에서 동작을 통해 전체 화면을 요청하면

표준 Fullscreen API를 사용할 수 있습니다. 예를 들어, 다음과 같이 전체 화면 상태에 반응하도록 UI를 변경할 수 있는 CSS 의사 선택기 등이 있습니다.

    selector:-webkit-full-screen {
      display: block; // displays the element only when in fullscreen
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

사용자가 홈 화면에서 사이트를 실행하면 `display-mode` 미디어
쿼리가 웹 앱 매니페스트에 정의된 내용으로 설정됩니다. 순수 전체 화면의 경우
다음과 같습니다.

    @media (display-mode: fullscreen) {

    }

사용자가 독립 모드로 애플리케이션을 실행하면 `display-mode`
미디어 쿼리는 `standalone`이 됩니다.

    @media (display-mode: standalone) {

    }


#### Firefox

사용자가 사이트에서 전체 화면을 요청하거나
전체 화면 모드에서 앱을 실행하면 표준 Fullscreen API를 사용할 수 있습니다. 예를 들어, 다음과 같이 전체 화면 상태에 반응하도록 UI를 변경할 수 있는
CSS 의사 선택기 등이 있습니다.


    selector:-moz-full-screen {
      display: block; // hides the element when not in fullscreen mode
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### Internet Explorer

IE에서 CSS 의사 클래스에 하이픈이 들어가지 않는 것을 제외하면
Chrome 및 Firefox와 유사하게 동작합니다.

    selector:-ms-fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

#### 사양

사양의 철자는 IE가 사용하는 구문과 일치합니다.

    selector:fullscreen {
      display: block;
    }

    selector {
      display: none; // hides the element when not in fullscreen mode
    }

### 사용자를 전체 화면에 고정

Fullscreen API는 때로 세심한 주의가 필요합니다. 브라우저 공급업체는
사용자를 전체 화면 페이지에 가두고 싶어 하지 않으므로 최대한 빨리 전체 화면에서 벗어나는
메커니즘을 개발했습니다.  즉, 여러 페이지에 걸친
전체 화면 웹사이트를 빌드할 수 없다는 뜻입니다.

* `window.location =
  "http://example.com"`을 사용하여 URL을 자동 변경하면 전체 화면에서 빠져나옵니다.
* 사용자가 페이지 안의 외부 링크를 클릭해도 전체 화면이 종료됩니다.
* `navigator.pushState` API를 통해 URL을 변경해도 전체 화면에서
  빠져나옵니다.

사용자를 전체 화면에 고정하고 싶다면 두 가지 옵션이 있습니다.

1. 설치 가능한 웹 앱 메커니즘을 사용하여 전체 화면을 실행합니다.
2. \# 프래그먼트를 사용하여 UI와 앱 상태를 관리합니다.

\#syntax를 사용하여 url (window.location = "#somestate")을 업데이트하고
`window.onhashchange` 이벤트를 수신하면 브라우저의 자체
기록 스택으로 애플리케이션 상태 변경을 관리할 수 있습니다. 이 방법으로 사용자가
하드웨어 뒤로 버튼을 사용할 수 있게 하거나 다음과 같이 기록 API를 사용하여 간단한 프로그래밍 방식의 뒤로 버튼
을 제공합니다.

    window.history.go(-1);

### 전체 화면으로 이동 시 사용자에게 선택권 부여

사용자가 가장 크게 짜증을 느끼는 순간은 웹사이트가 예상치 못한 동작을 하는 때입니다.
 사용자가 여러분의 사이트로 이동할 때 속임수로 전체 화면으로
안내하려고 하지 마세요.

첫 번째 터치 이벤트에 개입해서 `requestFullscreen()`을 호출하지 마세요.

1. 짜증스럽습니다.
2. 나중에 언젠가 브라우저에서 앱을 전체 화면으로 바꿀지 묻는 메시지를
   사용자에게 표시할 수도 있습니다.

앱을 전체 화면으로 실행하고 싶다면 각 플랫폼의 설치 경험을
활용해보세요.

### 앱을 홈 화면에 설치하라는 스팸을 사용자에게 보내지 마세요

설치된 앱 메커니즘을 통해 전체 화면 경험을 제공하고 싶다면
사용자를 배려하세요.

* 신중하게 행동해야 합니다. 배너나 바닥글을 사용하여 앱을 설치할 수 있다고 사용자에게 알리세요.

* 사용자가 프롬프트를 무시한다면 다시 표시하지 마세요.
* 사용자가 처음 방문했을 때는 여러분의 서비스에 만족하지 않는다면
앱을 설치하려고 할 가능성이 낮습니다. 여러분의 사이트에서 긍정적인 상호작용을 한 후에
사용자에게 설치 메시지를 보여주세요.
* 사용자가 여러분의 사이트를 정기적으로 방문하고 앱을 설치하지 않는다면
앞으로도 설치할 가능성은 낮습니다. 계속 스팸을 보내지 마세요.

## 결론

완벽히 표준화되어 구현된 API가 있는 것은 아니지만
이 문서에 있는 지침을 몇 가지 활용하면 클라이언트와 관계없이 사용자의 화면 전체를 활용하는
경험을 쉽게 빌드할 수 있습니다.


{# wf_devsite_translation #}
