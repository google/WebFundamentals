project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 네트워크 성능 분석 시작하기.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Chrome DevTools에서 네트워크 성능 분석 시작하기 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

참고: 로드 속도 향상의 종합적인
접근 방식에 대해서는 [웹사이트 속도 최적화](/web/tools/chrome-devtools/speed/get-started)를 참조하세요. 이 가이드에는 로드 성능 분석을 위한
권장 워크플로가 담겨 있습니다.

Chrome DevTools Network 패널을 사용하는 방법을 배워 페이지가 느리게 로드되는 이유를
단계별 대화식 가이드로 알아보세요.

## 1단계: DevTools 설정 {: #set-up }

모바일 이용자로부터 사이트의 특정 페이지가
느리다는 보고를 수신했다고 가정해 봅시다. 여러분이 할 일은 이 페이지를 빠르게 하는 것입니다.

1. **Open Slow Page**를 클릭합니다. 이 페이지가 새 탭에서 열립니다.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>Open Slow Page</button>
     </a>

1. 페이지가 포커스 상태일 때
   <kbd>Cmmd</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>(Mac)를 누르거나
   <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>(Windows, Linux)를 눌러
   이 페이지에 DevTools을 엽니다.

1. DevTools에서 **Network** 탭을 클릭합니다.

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="Chrome DevTools Network 패널, 진단할
              느린 페이지에서 열린 모습.">
       <figcaption>
         <b>그림 1</b>. Chrome DevTools Network 패널, 진단할
              느린 페이지 옆에 열린 모습.
       </figcaption>
     </figure>

     <aside class="note">
       <b>참고:</b> 나머지 스크린샷의 경우, 콘텐츠를 더 잘 볼 수 있도록 DevTools이 <a
       href="/web/tools/chrome-devtools/ui#placement" target="_blank">
       고정되지 않은 별도의 창</a>으로
       열려있습니다.
     </aside>

1. **Capture Screenshots** ![스크린샷
   캡처][screenshots]을 활성화합니다.{:.devtools-inline}활성화되면 파란색으로 변합니다.
   DevTools가 페이지 로드 중 스크린샷을 캡처합니다.

## 2단계: 모바일 사용자의 경험 에뮬레이션 {: #emulate }

노트북이나 데스크탑에서 네트워크 성능을 테스트하면 잘못된 결과가 나올 수 있습니다. 여러분의
인터넷 연결은 모바일 사용자보다 훨씬 빠르며, 브라우저가 이전 방문에서 리소스를
캐시합니다.

1. **Disable Cache** 확인란을 선택합니다. 이
  확인란이 활성화되면 DevTools는 캐시로부터 어떤 리소스도 제공하지 않습니다.
   이렇게 하면 처음 사용하는 사용자가 페이지를 볼 때의
  환경을 더욱 정확하게 에뮬레이션할 수 있습니다.

1. 현재 **No Throttling**이라고 표시된 드롭다운 메뉴에서
  **Regular 2G**를 선택합니다. DevTools가 네트워크 연결을 스로틀링하여
   일반 2G 환경을 시뮬레이션합니다. 이것이 연결이 불량한 곳에서
   여러분의 사이트를 방문하는 모바일 사용자의 환경입니다.

<figure>
  <img src="imgs/get-started-setup.svg"
    alt="스크린샷 설정,
         캐시 중단, 스로틀링 후의 Chrome DevTools Network 패널.">
  <figcaption>
    <b>그림 2</b>. 모바일 사용자의 환경을 에뮬레이션하도록 설정된
    Chrome DevTools Network 패널 왼쪽에서부터 오른쪽으로 스크린샷, 캐시
    중단, 스로틀링이 파란색으로 테두리가
    처져 있습니다.
  </figcaption>
</figure>

이것은 최악의 상황을 설정한 것입니다. 이 설정에서 페이지가 빠르게
로드된다면, 모든 사용자에게 빠른 것입니다.

[screenshots]: imgs/capture-screenshots.png

## 3단계: 요청 분석 {: #analyze }

페이지를 새로고침하고 들어오는 요청을 분석하여 페이지를
느리게 하는 원인을 찾습니다.

### 파트 A: 렌더 차단 스크립트 찾기

브라우저가 `<script>` 태그를 마주하면 반드시 렌더링을 일시 중지하고 즉시 스크립트를
실행해야 합니다. 로드 시간을 향상하기 위해 페이지 로드에 필요하지 않은 스크립트를 찾고
비동기로 표시하거나 실행을 지연하세요.

1. <kbd>Cmmd</kbd>+<kbd>R</kbd>(Mac)을 누르거나
   <kbd>Ctrl</kbd>+<kbd>R</kbd>(Windows, Linux)을 눌러 페이지를 새로고침합니다.
   양호한 Wi-Fi 연결에서 이 페이지가 완전히 로드하는 데
  10초 이상 소요됩니다.

     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="페이지 새로고침 후의 Chrome DevTools Network 패널.">
       <figcaption>
         <b>그림 3</b>. 페이지 새로고침 후의
         Chrome DevTools Network 패널.
       </figcaption>
     </figure>

1. Network 패널의 하단에 위치한 [Summary
  창](reference#summary)의 [`DOMContentLoaded`][DOMContentLoaded] 값을 확인하세요.
   최소 4초의 값이 나타나야 합니다. 이렇게 느리게 시작되는
  이벤트를 확인했을 때, 기본 문서의 로딩 및 파싱을
  지연하는 스크립트를 경계해야 합니다.

1. **main.js**을 클릭하여 해당 요청을 더 조사합니다. DevTools는
   해당 요청에 관한 더 많은 정보를 제공하는 새로운 탭의 집합을 표시합니다.

1. **Preview** 탭을 클릭하여 이 요청의 소스 코드를 봅니다. 스크립트가 4000ms 동안 멈춰있기만 한 것을
   볼 수 있습니다.
   이 스크립트를 `async` 속성으로 표시하고
  문서의 `<body>` 하단으로 이동시키면 페이지가
  해당 스크립트를 기다리지 않고 로드됩니다.

     <figure>
       <img src="imgs/get-started-preview.png"
         alt="Preview 창에서 main.js의 소스 코드 보기">
       <figcaption>
         <b>그림 4</b>. Preview 창에서 <code>main.js</code>의
         소스 코드 보기
       </figcaption>
     </figure>

[파서 차단과 비동기 자바스크립트 비교][async]를 확인하여 렌더 차단 스크립트에 관해 자세히
알아보세요.

### 파트 B: 대형 요청 찾기

페이지가 로드되었을 때 DevTools 로고가 로드되는 데
오랜 시간이 걸린다는 것을 눈치 채셨나요? 이것이 로드를 차단하지는 않지만 페이지가 느리게 *나타나게*
합니다. 사용자는 페이지가 빠르게 *나타나는* 것을 좋아합니다.

1. **Close** ![닫기][close]를 클릭하여{:.devtools-inline} 다시
   [**Requests 창**](reference#requests)이 보이게 합니다.

1. 스크린샷의 왼쪽 상단을 두 번 클릭합니다.

1. 오른쪽 방향키를 눌러 여러 개의 스크린샷을 스캔합니다. 스크린샷 아래
  시간은 스크린샷이 캡처된 시간을 나타냅니다. 이
  스크린샷은 로드하는 데 수 초가 소요됩니다. 즉, 너무 큰 파일일
  수 있습니다.

1. 스크린샷 바깥의 임의의 부분을 클릭하여 최소화합니다.

1. `logo-1024px.png`
  요청에 대한 [Waterfall](reference#waterfall)에 마우스를 가져갑니다. 이 요청은 대부분의 시간을
  이미지 다운로드에 사용합니다. 즉, 이미지가 너무 크다는 것을 보여줍니다.

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="logo-1024px.png에 대한 Waterfall">
       <figcaption>
         <b>그림 5</b>. <code>logo-1024px.png</code>에 대한 Waterfall
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png 

## 4단계: 업데이트된 페이지 수정 사항 검증 {: #verify }

거의 다 끝났습니다. 이미 페이지에 두 가지를 변경했다고
가정합시다.

* 스크립트를 `<body>`의 하단으로 이동시키고 `async`로
 표시하여 페이지 로드 차단을 방지했습니다.
* 로고 크기를 줄이기 위해 SVG로 변환했습니다.

해야 할 남은 일은 업데이트된 페이지를 테스트하여 수정
사항이 실제로 페이지 로드를 빠르게 하는지 검증하는 것입니다.

1. **Open Fast Page**를 클릭합니다. 수정된 페이지가 새 탭에서 열립니다.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>Open Fast Page</button>
     </a>

1. DevTools를 이전과 동일하게 설정합니다. 스크린샷 및 캐시 중지가
  켜져 있어야 하며, 네트워크 스로틀링은 **Regular 2G**로 설정되어야 합니다.
1. 페이지를 새로고침합니다. 페이지가 훨씬 빠르게 로드됩니다.

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="수정 사항 적용 후 페이지 로드 기록">
       <figcaption>
         <b>그림 6</b>. 수정 사항 적용 후
         페이지 로드 기록 이전에는 페이지가 시각적으로 완전히
         나타나는 데 약 10초가 걸렸습니다. 이제 약 1초밖에 걸리지 않습니다.
       </figcaption>
     </figure>

<aside class="note">
  <b>참고</b>: 이 페이지가 훨씬 빠르게 로드되지만 여전히 약
  5초간 사용할 수 없습니다. 그 이유는 페이지의 기본 스레드에 멈춰 있는
  스크립트를 아직 실행하기 때문입니다.
</aside>

## 다음 단계 {: #next-steps }

잘 하셨습니다. 여러분은 이제 Chrome DevTools Network
패널의 진정한 전문가입니다. 음... 전문가 수준은 아닌가요? 어쨌든 기술과 지식의
훌륭한 토대를 갖추었습니다.

* <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / CRP"
  href="/web/fundamentals/performance/critical-rendering-path">주요
  렌더링 경로</a>를 참조하여 광속 페이지
  로딩에 관해 자세히 알아보세요.
* 더 많은 네트워크 문제를 포착하려면 <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Issues Guide" href="issues">Network
  문제 가이드</a>를 참조하세요.
* Network 패널 기능에 관한 종합 목록은 <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">Network
  패널 레퍼런스</a>를 참조하세요.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
