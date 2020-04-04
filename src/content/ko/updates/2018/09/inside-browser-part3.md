project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 브라우저 렌더링 엔진의 내부 작동 방식

{# wf_published_on: 2018-09-20 #} {# wf_updated_on: 2019-05-30 #} {# wf_featured_image: /web/updates/images/inside-browser/cover.png #} {# wf_featured_snippet: Once the browser receives page data, what happens inside of the renderer process to display a page? #} {# wf_blink_components: N/A #}

<style>
  figcaption {
    font-size:0.9em;
  }
</style>

# 모던 웹 브라우저 들여다보기 (파트 3) {: .page-title }

{% include "web/_shared/contributors/kosamari.html" %}

## 렌더러 프로세스의 내부 동작

브라우저가 어떻게 동작하는지 살펴보는 블로그 4 연작 그 3번째 글입니다. 이전 글에서는 [멀티 프로세스 구조](/web/updates/2018/09/inside-browser-part1)와 [탐색 순서](/web/updates/2018/09/inside-browser-part2)를 보았습니다. 이번 글에서는, 렌더러 프로세스의 내부에서 무슨 일이 일어나는지 살펴 보도록 하죠.

렌더러 프로세스는 웹 성능에 여러 가지 측면에서 연관이 있습니다. 렌더러 프로세스 내부에서는  많은 일들이 일어나기 때문에, 본 글은 일반적인 개요일 뿐입니다. 더 알고 싶으신 경우, [Web Fundamentals의 성능 섹션](/web/fundamentals/performance/why-performance-matters/)에 더 많은 내용이 있습니다.

## 렌더러 프로세스의 웹 컨텐트 처리

렌더러 프로세스는 브라우저 탭 안에서 일어나는 모든 일들을 담당합니다. 렌더러 프로세스 안에서는 메인 스레드가 여러분이 구현한 대부분의 코드를 처리합니다. 여러분이 웹 워커 혹은 서비스 워커를 사용하실 경우에는 워커 스레드가 여러분의  자바스크립트 코드 일부분을 처리합니다. 컴포지터와 레지스터 스레드 또한 렌더러 프로세스 내부에서 페이지를  효율적이며 매끄럽게 렌더하기 위해 실행됩니다.

렌더러 프로세스의 핵심 역할은 HTML, CSS 그리고 자바스크립트를 사용자가 인터렉션할  수 있는 웹 페이지로 만드는 것입니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/renderer.png" alt="Renderer process">
  <figcaption>Figure 1: 메인 스레드, 워커 스레드, 컴포지터 스레드, 그리고 레스터 스레드가 있는 렌더러 프로세스</figcaption>
</figure>

## 파싱

### DOM 생성

렌더러 프로세스가 탐색을 위한 커밋 메세지를 받고 HTML 데이터를 받기 시작할 때, 메인 스레드는 텍스트 문자열 (HTML)을 파싱하기 시작하고 이를  **D**ocument **O**bject **M**odel (**DOM**)으로 변환합니다.

DOM은 페이지에 대한 브라우저의 내부 표현일 뿐만 아니라 웹 개발자가 자바스크립트를 통해 상호 작용할 수 있는 데이터 구조 및 API입니다.

HTML문서를 DOM으로 파싱하는 방법은 [HTML 표준](https://html.spec.whatwg.org/)에 정의되어 있습니다. 여러분은 HTML를 브라우저에 넘겼을 때  한번도 에러가 발생하지 않는 것을 눈치채셨을 것입니다. 예를 들어, `</p>` 태그로  닫지 않은 부분이 있는 HTML은 정상 동작합니다.   `Hi! <b>I'm <i>Chrome</b>!</i>` (b 태그가 i 태그 전에 닫힘) 와 같이  잘못된 마크업은 여러분이 마치  `Hi! <b>I'm <i>Chrome</i></b><i>!</i>`. 로 작성한 것처럼 동작합니다. 그 이유는 HTML 표준이 이러한 에러들을 적절하게 다루도록 설계되었기  때문입니다. 만약 이러한 것들이 어떻게 동작되는지 궁금하시면, HTML 표준의 "[파서에서의 에러 처리와 특이 사례들 소개](https://html.spec.whatwg.org/multipage/parsing.html#an-introduction-to-error-handling-and-strange-cases-in-the-parser)" 부분을 읽어보세요.

### 추가 리소스 로딩

웹 사이트는 종종 이미지, CSS 그리고 자바스크립트와 같은 외부 리소스를 사용합니다. 이러한 파일들은 네트워크 혹은 캐쉬로부터 로드되어야 합니다. 메인 스레드는 DOM을 구성하기 위한 파싱 중에  그런 리소스들을 찾을 때마다 *요청할 수 *있지만, 속도를 높이기 위해 "사전 로드 스캐너"가 동시에 실행됩니다. HTML 문서에 `<img>` 혹은 `<link>`가 있는 경우, 사전 로드 스케너는 HTML 파서에 의해 생성된  토큰들을 살짝 보고 브라우저 프로세스에 있는 네트워크 스레드에게 요청을 보냅니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/dom.png" alt="DOM">
  <figcaption>     Figure 2: HTML를 파싱하고 DOM 트리를 만드는 메인 스레드</figcaption>
</figure>

### 자바스크립트가 파싱을 중단 할 수 있음

HTML 파서는 `<script>` 태그를 발견하면, HTML 문서를 파싱하는 과정을 잠시 멈추고  자바스크립트 코드를 로드, 파스, 그리고 실행해야만 합니다. 왜 그럴까요? 왜냐하면 자바스크립트는 전체 DOM 구조(HTML 표준에 있는 멋진 [파싱 모델 개요](https://html.spec.whatwg.org/multipage/parsing.html#overview-of-the-parsing-model) 다이어그램)를  바꾸는 `document.write()`와 같은 방법으로 문서의 구성을 바꿀 수 있기 때문입니다. 이 것이 HTML 파서가 HTML 문서를 다시 파싱하기 전에 JavaScript를 기다려야만 하는 이유입니다. 자바스크립트가 실행될 때 어떤 일들이 일어나는 지 궁금하시다면, [그에 대해 V8 팀이 설명한 강연과 블로그 포스트](https://mathiasbynens.be/notes/shapes-ics) 가 있으니 살펴보세요.

## 브라우저에 어떻게 리소스를 로드할지 알려주기

리소스를 잘 로드하기 위해 웹 개발자들이 브라우저에게 알려주는 방법은 많이 있습니다. 만약 여러분의 자바스크립트가 `document.write()`을 사용하지 않는다면, 여려분은 [`async`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async) 혹은 [`defer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer) attribute를 `<script>` 태그에 추가할 수 있습니다. 그러면 브라우저는 자바스크립트 코드를 비동기적으로 로드하고 실행하며 파싱을 막지 않습니다. 여러분은 또한 [자바스크립트 모듈](/web/fundamentals/primers/modules)을 적절히 사용할 수도 있습니다. `<link rel="preload">`는 브라우저에게 리소스가 현재 탐색에서 반드시 필요하고 여러분이 가능하면 빨리 다운로드하고 싶다는 것을 알려주는 방법입니다. 이러한 내용은 [리소스 우선순위화 – 브라우저가 여러분을 도울수 있는 방법](/web/fundamentals/performance/resource-prioritization)에서 더 읽어보실 수 있습니다.

## 스타일 계산

DOM을 가지고 있는 것은 페이지가 어떻게 보이는 지를 알기에는 충분하지 않습니다. 왜냐하면 우리는 CSS에서 페이지 요소들에 대한 스타일을 정의할 수 있기 때문입니다. 메인 스레드는 CSS를 파스하여 각 DOM 노드에 대한 계산된 스타일을 결정합니다. 이는  CSS selector에 기반하여 각 요소들에 어떤 스타일이 적용되었는 지에 대한 정보입니다. 이러한 정보는 개발자 도구의 `computed` 섹션에서 볼 수 있습니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/computedstyle.png" alt="computed style">
  <figcaption>Figure 3: 계산된 스타일을 추가하기 위해 CSS를 파싱하는 메인 스레드</figcaption>
</figure>

여러분이 CSS를 전혀 활용하지 않더라도, 각 DOM 노드는 계산된 스타일을 가지고 있습니다. `<h1>` 태그는  `<h2>` 태그보다 더 크게 보여지며 margins은 각 요소마다 정의됩니다. 이러한 이유는 브라우저가 기본 스타일 시트를 가지기 때문입니다. 크롬의 기본 CSS를 알고 싶다면, [이 소스 코드를 확인하세요](https://cs.chromium.org/chromium/src/third_party/blink/renderer/core/html/resources/html.css).

## 레이아웃

이제 렌더러 프로세스는 문서의 구조와 각 노드에 대한 스타일을 알게되었습니다. 하지만, 페이지를 렌더하기에 충분하지 않습니다. 여러분이 어떤 그림을 친구에게 전화로 설명한다고  상상해보세요. "큰 빨간 원 하나와 작은 파란 사각형 하나가 있어"의 설명으로는 여러분의 친구가 정확히 그림이 어떻게 생겼는지 알기 쉽지 않습니다.

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part3/tellgame.png" alt="game of human fax machine">
  <figcaption>Figure 4: 그림 앞에 서 있는 사람이 다른 사람에게 연결된 전화 라인</figcaption>
</figure>

레이아웃은 요소들의 기하학적인 구조를 찾는 과정입니다. 메인 스레드는 DOM과 계산된 스타일을 따라가며 x y 좌표 및 bounding box의 크기와 같은 정보를 가지는 레이아웃 트리를  생성합니다. 레이아웃 트리는 DOM 트리와 유사할 수 있으나 페이지에 보이는 정보만을 담고 있습니다. 만약 임의의 요소에 `display: none`이 적용되면, 해당 요소는 레이아웃 트리에 포함되지 않습니다 (하지만, `visibility: hidden`이 명시된 요소는 레이아웃 트리에 있습니다).  유사하게, 만약 `p::before{content:"Hi!"}`와 같이 유사 클래스가 있는 컨텐츠는  DOM에는 없음에도 레이아웃 트리에는 포함됩니다.

<div class="clearfix"></div>

<figure>
  <img src="/web/updates/images/inside-browser/part3/layout.png" alt="layout">
  <figcaption>Figure 5: 계산된 스타일이 있는 DOM 트리를 지나 레이아웃 트리를 만드는 메인 스레드</figcaption>
</figure>

<figure class="attempt-right">
  <a href="/web/updates/images/inside-browser/part3/layout.mp4">
    <video src="/web/updates/images/inside-browser/part3/layout.mp4" autoplay loop muted playsinline controls alt="line break layout">
    </video>
  </a>
  <figcaption>Figure 6: 줄 개행으로 문단이 바뀔 때의 박스 레이아웃</figcaption>
</figure>

페이지의 레이아웃을 결정하는 것은 쉽지 않은 작업입니다. 위에서 아래 방향으로의 block flow 와 같은 가장 간단한 페이지 레이아웃일지라도 글꼴의 크기와 줄 바꿈 정도를 고려해야합니다. 왜냐하면 이런 것들은 단락의 크기와 모양에 영향을 주기 때문이죠. 더불어 다음 단락이 있어야 할 위치에도 영향을 줍니다.

CSS는 요소를 한쪽으로 띄우고 오버플로 항목을 마스크하고 글쓰기 방향을 변경할 수 있습니다. 이 레이아웃 단계에는 엄청난 작업이 있다고 상상할 수 있습니다. Chrome에서는 전체 엔지니어 팀이 레이아웃을 담당합니다. 자신의 작업에 대한 자세한 정보는 기록된 매우 흥미로운 [BlinkOn Conference의 대화](https://www.youtube.com/watch?v=Y5Xa4H2wtVA) 내용을 확인해 보십시오.

<div class="clearfix"></div>

## 페인트

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part3/drawgame.png" alt="drawing game">
  <figcaption>     Figure 7: 붓을 들고 캔버스 앞에 있는 한 사람이 원과 사각형 중 어떤 것을 먼저 그려야 할 지 고민하는 모습</figcaption>
</figure>

DOM, 스타일, 그리고 레이아웃이 있는 상태는 여전히 페이지를 렌더하기에 충분하지 않습니다. 여러분이 한 그림을 다시 그린다고 해보죠. 여러분은 요소들의 크기, 모양 그리고 위치를 알지만 여전히 이 것들을 어떤 순서로 그릴 지 판단해야만 합니다.

예를 들어, `z-index`는 임의의 요소들에 설정될 수 있는 데, 이 경우 HTML로 작성된 요소 순서로 그리면 잘못된 렌더링이 발생합니다.

<div class="clearfix"></div>

<figure>
  <img src="/web/updates/images/inside-browser/part3/zindex.png" alt="z-index fail">
  <figcaption>Figure 8: HTML 마크업 순서로 보여진 페이지 요소들이 z-index를 고려하지 않음으로 인해 잘못 렌더된 이미지가 된 경우</figcaption>
</figure>

이 페인트 단계에서, 메인 스레드는 레이아웃 트리를 따라가 페인트 기록을 생성합니다. 페인트 기록은 "먼저 배경, 그리고 텍스트, 그리고 사각형"와 같은 페인팅 과정의 내용입니다. 만약 여러분이  자바스크립트로 `<canvas>` 요소에 그려왔다면, 이 과정은 아마 익숙하실 것입니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/paint.png" alt="paint records">
  <figcaption>Figure 9: 레이아웃 트리를 통과하며 페인트 기록을 생성하는 메인 스레드</figcaption>
</figure>

### 렌더링 파이프라인 업데이트는 비용이 많이 듬

<figure class="attempt-right">
  <a href="/web/updates/images/inside-browser/part3/trees.mp4">
    <video src="/web/updates/images/inside-browser/part3/trees.mp4" autoplay loop muted playsinline controls alt="DOM+Style, Layout, and Paint trees">
    </video>
  </a>
  <figcaption>Figure 10: DOM+스타일, 레이아웃, 그리고 페인트 생성 순서</figcaption>
</figure>

렌더링 파이프라인을 이해할 때 가장 중요한 점은 각 단계에서 그 전 단계 실행 결과물이 새로운 데이터를  생성하는데 쓰인다는 것입니다. 예를 들어, 만약 레이아웃 트리에서 무엇인가 변한다면 문서에서  영향 받은 부분에 대하여 페인트하는 순서가 갱신될 필요가 있습니다.

<div class="clearfix"></div>

여러분이 요소들을 에니메이션할 경우, 브라우저는 이러한 동작을 매 프래임마다 실행해야 합니다. 대부분의 디스플레이는 매 초당 60번(60fps) 스크린을 새로 고침합니다. 그래야 매 프레임마다 스크린을  가로질러 무엇인가 이동하도록 만들어진 에니메이션이 사람 눈에 매끄러워 보입니다. 하지만 만약 에니메이션이 중간 프레임을 손실하는 경우, 그 페이지는 버벅이게 됩니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/pagejank1.png" alt="jage jank by missing frames">
  <figcaption>     Figure 11: 타임라인의 애니메이션 프레임</figcaption>
</figure>

여러분의 렌더링 동작이 스크린이 새로 고침하는 것에 뒤쳐지지 않는다고 하더라도, 이러한 연산은 메인 스레드에서 실행됩니다. 이는 이 과정이 여러분의 애플리케이션이 자바스크립트를 실행하고 있는 것을 방해할 수 있다는 뜻입니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/pagejank2.png" alt="jage jank by JavaScript">
  <figcaption>Figure 12: 자바스크립트에 의해 한 프레임이 차단된 타임라인의 애니메이션 프레임</figcaption>
</figure>

여러분은 자바스트립트 동작을 작은 단위로 나눌수 있고  `requestAnimationFrame()`을 이용하여 매 프레임마다 실행하는 것을  미리 설정할 수 있습니다. 이 주제에 대하여 더 자세한 내용은,  [자바스크립트 실행 최적화하기](/web/fundamentals/performance/rendering/optimize-javascript-execution)을 참고해주세요. 또한 [웹 워커에서의 자바스크립트 영상](https://www.youtube.com/watch?v=X57mh8tKkgE)을 보시면 메인 스레드를 막는 것을 피하는 방법을 알수 있습니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/raf.png" alt="request animation frame">
  <figcaption>Figure 13: 애니메이션 프레임의 타임라인에서 실행되는 작은 단위의 JavaScript</figcaption>
</figure>

## 컴포지팅

### 페이지를 그리는 방법

<figure class="attempt-right">
  <a href="/web/updates/images/inside-browser/part3/naive_rastering.mp4">
    <video src="/web/updates/images/inside-browser/part3/naive_rastering.mp4" autoplay loop muted playsinline controls alt="naive rastering">
    </video>
  </a>
  <figcaption>Figure 14: 최초 래스터링 프로세스 애니메이션</figcaption>
</figure>

이제 브라우저는 문서의 구조, 각 요소의 스타일, 페이지의 기하학 구조, 그리고 페인트 순서를 알았습니다. 그럼 어떻게 페이지를 그릴까요? 이러한 정보를 스크린의 픽셀로 바꾸는 것을 레스터라이징이라고 합니다.

아마 이를 처리하는 단순한 방법은 화면에 보이는 영역을 레스터하는 것일 겁니다. 만약 사용자가 페이지를 스크롤하면, 레스터된 프레임을 움직이고 더 레스터링을하여 부족한 부분을 메꿉니다. 이 것이 처음 크롬이 공개되었을 때 레스터라이징을 처리하는 방법이었습니다. 하지만, 모던 브라우저는 컴포지팅이라는 더 세련된 방식으로 동작합니다.

<div class="clearfix"></div>

### 컴포지팅이란?

<figure class="attempt-right">
  <a href="/web/updates/images/inside-browser/part3/composit.mp4">
    <video src="/web/updates/images/inside-browser/part3/composit.mp4" autoplay loop muted playsinline controls alt="composit">
    </video>
  </a>
  <figcaption>그림 15 : 합성 프로세스의 애니메이션</figcaption>
</figure>

컴포지팅은 한 페이지의 부분들을 여러 레이어로 나누고 그 것들을 각각 레스터하며  컴포지터 스레드에서 페이지를 합성하는 기술입니다. 만약 스크롤이 발생하면, 레이어들이 이미 레스터되었기 때문에, 해야 할 것은 새로운 프레임을 합성하는 것입니다. 에니메이션은 레이어들을 움직이는 동일한 방식으로 이뤄지고 새로운 프레임을 합성합니다.

여러분은 어떻게 웹 사이트가 여러 레이어로 나뉘는 지 개발자 도구의 [Layers panel](https://blog.logrocket.com/eliminate-content-repaints-with-the-new-layers-panel-in-chrome-e2c306d4d752?gi=cd6271834cea)에서 볼 수 있습니다.

<div class="clearfix"></div>

### 레이어에 대한 고찰

어떤 요소들이 어떤 레이어에 있어야 하는 지 알기 위해서, 메인 스레드는 레이아웃 트리를  순회하여 레이어 트리를 생성합니다. (이 부분은 개발자 도구 성능 탭의 "Update Layer Tree"입니다). 만약 별도의 레이어에 있어야만 하는 페이지의 어떤 부분(예를 들면 슬라이드되어 들어오는 사이드 메뉴)이  아직 처리되지 않은 경우엔, CSS 속성 `will-change`를 이용하여 브라우저에게 미리 알려줄 수 있습니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/layer.png" alt="layer tree">
  <figcaption>Figure 16: 레이아웃 트리를 따라 레이어 트리를 생성하는 메인 스레드</figcaption>
</figure>

여러분은 모든 요소들에 대해 레이어를 지정하고 싶을 수도 있습니다. 하지만 지나친 수의 레이어에 대해 컴포지팅하는 것은 모든 프레임마다 한 페이지의 작은 부분을 레스터라이징하는 것보다도 느린 동작입니다. 따라서 이 것은 여러분의 애플리케이션에 대한 렌더링 성능을 따질 때 아주 중요합니다. 더 자세한 내용은  [컴포지터만 사용하는 속성만을 사용하고 레이어 수 관리하기](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)을 참고해주세요.

### 메인 스레드를 사용하지 않고 레스터와 컴포지트 하기

레이어 트리가 생성되고 페인트 순서가 결정되고 나면, 메인 스레드는 컴포지터 스레드에게 정보를 커밋합니다. 그러면 컴포지터 스레드가 각 레이어를 레스터라이즈합니다. 레이어는 한 페이지의 전체 길이만큼 클 수 있기 때문에, 컴포지터 스레드는 레이어들을 여러 타일로 쪼개고 각 타일을 다수의 레스터 스레드에게 보냅니다. 레스터 스레드들은 각 타일을 레스터라이즈하고 그 것들을 GPU 메모리에 저장합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/raster.png" alt="raster">
  <figcaption>Figure 17: 타일들의 비트맵을 생성하고 GPU에 전송하는 래스터 스레드</figcaption>
</figure>

컴포지터 스레드는 서로 다른 레스터 스레드들에 대해 우선 순위를 정할 수 있어서 화면 안에 보이는 (혹은 가까이 있는) 것들이 먼저 레스터될 수 있습니다. 또한 한 레이어는 다른 해당도에 따라 다수의 타일링을 가질 수 있는 데, 이것은 줌 인 동작을 처리하기 위함입니다.

타일들이 레스터되면, 컴포지터 스레드는 **쿼드 군집(draw quads)** 라 하는 타일 정보를 모아 **컴포지터 프레임**을 생성합니다.

<table class="responsive">
  <tr>
    <td>쿼드 그리기</td>
    <td>메모리에서 타일의 위치 및 페이지 합성을 고려하여 타일을 그릴 페이지의 위치와 같은 정보를 포함합니다.</td>
  </tr>
  <tr>
    <td>컴포지터 프레임</td>
    <td>한 페이지의 프레임을 나타내는 쿼드 군집의 컬렉션입니다.</td>
  </tr>
</table>

컴포지터 프레임은 IPC를 통해서 브라우저 프로세스에게 넘어갑니다. 이 때, 다른 컴포지터 프레임이 브라우저 UI 변화에 따라 UI 스레드에 의해 혹은 확장 기능에 대한  다른 렌더러 프로세스들에 의해 추가될 수 있습니다. 이러한 컴포지터 프레임들은 GPU에게 보내져 화면에 보여집니다. 만약 스크롤 이벤트가 발생하면, 컴포지터 스레드는 GPU에게 보내질 다른 컴포지터 프레임을 생성합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part3/composit.png" alt="composit">
  <figcaption>Figure 18: 컴포지팅 프레임을 생성하는 컴포지터 스레드. 프레임은 브라우저 프로세스에게 전송된 후 GPU로 이동.</figcaption>
</figure>

컴포지팅의 장점은 메인 스레드의 개입 없이 수행된다는 것입니다. 컴포지터 스레드는 스타일 계산 혹은 자바스크립트 실행을 기다릴 필요가 없습니다. 이것이 [컴포지팅만 하는 에니메이션](https://www.html5rocks.com/en/tutorials/speed/high-performance-animations/)이 부드러운 성능을 위한 가장 좋은 방법으로 여겨지는 이유입니다. 만약 레이아웃 혹은 페인트가 다시 계산된다면 메인 스레드가 관여해야만 합니다.

## 마무리

본 글에서, 우리는 파싱부터 컴포지팅까지의 렌더링 파이프라인을 들여다보았습니다. 이제 여러분이 웹 사이트의 성능 최적화에 대한 내용을 더 수월하게 읽으실 수 있기를 바랍니다.

다음에는 이 시리즈의 마지막 글로, 더 자세히 컴포지터 스레드에 대해 살펴볼 것이며  사용자가 `mouse move` 그리고 `click`와 같은 입력을 했을 경우 어떤 결과가 나오는 지 알아봅니다.

이 글이 재밌으셨나요? 궁금한 점이나 새로운 글에 대한 제안이 있으시면, 아래 코멘트 란이나 트위터 [@kosamari](https://twitter.com/kosamari)로 알려주세요.

<a class="button button-primary gc-analytics-event attempt-right" href="/web/updates/2018/09/inside-browser-part4" data-category="InsideBrowser" data-label="Part3 / Next"> 다음: 컴포지터에 입력이 들어오는 경우 </a>

<div class="clearfix"></div>

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
