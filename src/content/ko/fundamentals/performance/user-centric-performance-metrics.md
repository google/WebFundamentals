project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 사용자 중심적인 성능 측정항목

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-06-01 #}
{# wf_tags: performance #}
{# wf_blink_components: Blink>PerformanceAPIs #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# 사용자 중심적인 성능 측정항목 {: .page-title }

{% include "web/_shared/contributors/philipwalton.html" %}

성능이 중요하고 웹 앱이 빠른 것이 필수적이라는
이야기를 수도 없이 들었을 것입니다.

그러나 *내 앱이 얼마나 빠르지?*라는 질문에 대답하려고 하면
빠르다는 것이 모호한 용어라는 것을 알게 될 것입니다. 우리가 빠르다고 할 때, 그 의미는 정확히 무엇일까요? 어떤
맥락에서 그런 걸까요? 누구에게 빠르다는 걸까요?

<aside>
  <strong>참고:</strong> 글을 읽는 것보다 동영상을 시청하고 싶다면,
  제 동료
  <a href="https://twitter.com/shubhie">Shubhie Panicker</a>와 함께 Google I/O 2017에서 이 주제에 대해 발언한 적이 있습니다.
</aside>

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6Ljq-Jn-EgU"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

성능에 대해 이야기할 때는
오해를 불러일으키거나 허위 정보를 퍼뜨리지 않도록 정확하게 말해야 합니다. 잘못하면 좋은 의도를 가진
개발자가 잘못된 것을 최적화하여 사용자
환경을 개선하는 것이 아니라 오히려 저해할 수 있습니다.

구체적인 예를 들자면, 오늘날 흔히 사람들이 다음과 같이 이야기하는 것을 들을 수
있습니다.__*내 앱을 테스트해 봤는데 X.XX초만에 로드됐어*__.

이 문장의 문제는 거짓이라는 것이 *아니라*, 실상을 곡해한다는
점입니다. 로드 시간은 기기 성능이나 네트워크 조건에 따라
사용자마다 크게 다를 수 있습니다. 로드
시간을 하나의 숫자로 나타내면 더 긴 로딩을 경험하는 사용자를 무시하게 됩니다.

현실에서는 앱의 로드 시간이란 모든
개별 사용자의 총 로드 시간의 집합이며, 이것을 온전하게 표현하는 유일한 방법은 아래와 같은
히스토그램으로 분산을 나타내는 것입니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-histogram.png"
       alt="웹사이트 방문자의 로드 시간 히스토그램"/>
</figure>

x축의 숫자는 로드 시간을 나타내며,
y축의 막대 높이는 해당 특정 시간 버킷에서 로드 시간을 경험한 상대적인 사용자의
수를 나타냅니다. 이 도표가 보여주듯이, 가장 큰 사용자 항목은
1초나 2초 미만의 로드를 경험한 것에 반해, 대부분의 사용자는 여전히
훨씬 더 긴 로드 시간을 경험합니다.

'내 사이트는 X.XX초 만에 로드돼'가 허구인 또 다른 이유는 로드는
시간의 한 순간이 아니기 때문입니다. 이것은 하나의 측정항목으로는 온전히
포착할 수 없는 경험입니다. 사용자가 '빠르다'고 인지하는 데
영향을 미치는 로드 시간에는 다양한 순간이 있으며, 하나에만 중점을 두면
다른 때에 발생하는 나쁜 경험은 놓칠 수 있습니다.

예를 들어, 빠른 초기 렌더링에 최적화되어 콘텐츠를
사용자에게 즉시 전달하는 앱을 생각해 보겠습니다. 이 앱이 그 후 파싱과 실행에 수초가 소요되는 거대한
자바스크립트 번들을 로드한다면, 해당 페이지의 콘텐츠는
자바스크립트가 실행될 때까지 이용할 수 없습니다. 사용자가
페이지의 링크를 볼 수 있지만 클릭할 수 없거나 텍스트 상자는 보이지만
입력할 수 없다면, 아마 페이지가 얼마나 빠르게 렌더링되었는지는 중요하게 생각하지 않을 것입니다.

따라서 하나의 측정항목으로 로드를 측정하기보다,
사용자의 로드 *인식*에 영향을 미칠 수 있는 경험 전체의
모든 순간을 측정해야 합니다.

성능 허구의 두 번째 예는__*성능은 로드
시간에만 신경 쓰면 돼*__라는 것입니다.

우리 모두는 이런 실수에 책임이 있습니다. 또한, 대부분의 성능 도구가
로드 성능*만* 측정한다는 사실이 이 문제를 더욱 크게 만듭니다.

그러나 실제로 불량한 성능은 로드
중 뿐만 아니라 언제든지 발생할 수 있습니다. 탭이나 클릭에 빠르게 반응하지 않는 앱이나 매끄럽게 스크롤되거나
애니메이션이 재생되지 않는 앱은 느리게 로드되는 앱만큼이나 나쁩니다. 사용자는
전체 경험을 중시하며, 우리 개발자들도 그래야 합니다.

이러한 모든 성능에 관한 오해의 공통분모는 사용자 환경과 전혀,
혹은 거의 관련이 없는 것에 중점을 둔다는 것입니다. 마찬가지로
[로드](https://developer.mozilla.org/en-US/docs/Web/Events/load) 시간이나
[DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded)
시간과 같은 종래의 성능 측정항목은, 이것이 발생했을 때가
사용자가 앱이 로드되었다고 생각하는 시점과 일치할 수도,
그렇지 않을 수도 있기 때문에 극히 신뢰도가 떨어집니다.

따라서 이러한 실수를 반복하지 않으려면, 다음의 질문에
답할 수 있어야 합니다.

1. 어떤 측정항목이 가장 정확하게 사람이 인식하는 성능을 측정할 수 있을까?
2. 이러한 측정항목을 실제 사용자에게서 어떻게 측정할 수 있을까?
3. 앱이 '빠른지' 알 수 있으려면 측정값을 어떻게 해석해야 할까?
4. 앱의 실제 사용자 성능을 알게 된 후에,
 이것을 반복하지 않도록 하고 미래에 성능을 향상하기 위해 무엇을 해야 할까?

## 사용자 중심적인 성능 측정항목

웹페이지를 탐색할 때, 사용자는 일반적으로 모든 것이 예상대로 작동하고 있다는 것을 확인시켜 주는 시각적
피드백을 찾습니다.

<table>
  <tr>
   <td><strong>작동되는 걸까?</strong></td>
   <td>탐색이 성공적으로 시작되었나? 서버가 응답했나?</td>
  </tr>
  <tr>
   <td><strong>유용한가?</strong></td>
   <td>충분한 양의 콘텐츠가 렌더링되어 사용자가 이에 참여할 수 있는가?</td>
  </tr>
  <tr>
   <td><strong>사용할 수 있나?</strong></td>
   <td>사용자가 페이지와 상호작용할 수 있나? 아니면 여전히 로딩 중인가?</td>
  </tr>
  <tr>
   <td><strong>즐거운가?</strong></td>
   <td>상호작용이 매끄럽고 자연스러우며, 지연이나 쟁크 현상(jank)이 없나?</td>
  </tr>
</table>

페이지가 이러한 피드백을 사용자에게 언제 전달하는지 알기 위해 몇 가지 새로운
측정항목을 정의했습니다.

### 첫 번째 페인트와 첫 번째 콘텐츠가 있는 페인트

[Paint Timing](https://github.com/WICG/paint-timing) API는 두 가지
측정항목을 정의합니다. *첫 번째 페인트*(FP)와 *첫 번째 콘텐츠가 있는 페인트*(FCP)가 바로 그것입니다. 이러한 측정항목은
탐색 직후, 브라우저가 화면에 픽셀을
렌더링할 때 해당 지점을 표시합니다. 이것은 다음 질문에 답하기 때문에 사용자에게 중요합니다.
*작동되는 걸까?*

두 측정항목의 근본적인 차이는 FP는 브라우저가
탐색 전에
화면에 있던 것과 시각적으로 다른 *어떤 것이든* 렌더링할 때의 지점을 표시한다는 것입니다. 반대로, FCP는 브라우저가 DOM 콘텐츠의 첫 비트를
렌더링할 때(예: 텍스트, 이미지, SVG,
혹은 `<canvas>` 요소)의 지점입니다.

### 첫 번째 의미 있는 페인트 및 히어로 요소 타이밍

첫 번째 의미 있는 페인트(FMP)는
'유용한가?'라는 질문에 답하는 측정항목입니다. '유용성'이라는 개념이 모든 웹페이지에 일반적으로 적용되는 방식으로
구체화하기 매우 어렵지만(따라서 아직 구체적인 내용 없음), 웹 개발자들은 어떤 페이지가
사용자에게 가장 유용할지
쉽게 알 수 있습니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-hero-elements.png"
       alt="다양한 웹사이트의 히어로 요소 예"/>
</figure>

웹페이지의 이러한 '가장 중요한 부분'은 종종 *히어로
요소*라고 불립니다. 예를 들어, YouTube 시청 페이지에서 히어로 요소는
주요 동영상입니다. Twitter에서는 아마도 알림 배지와 첫 번째
트윗일 것입니다. 날씨 앱에서는 특정 위치에 대한 일기예보입니다. 그리고
뉴스 사이트에서는 아마도 주요 기사 및 특집 이미지일 것입니다.

웹페이지에는 항상 다른 부분보다 중요한 부분이 있습니다. 페이지의 가장 중요한
부분이 빠르게 로드되면, 사용자는
나머지 페이지가 로드되지 않았다는 것을 눈치채지도 못할 것입니다.

### 장기 작업

브라우저는 기본 스레드의 큐에 작업을 추가하여 한 번에
하나씩 실행되도록 함으로써 사용자의 입력에 반응합니다. 브라우저가 애플리케이션의
자바스크립트를 실행하는 경우도 마찬가지이므로, 이런 관점에서 브라우저는 단일 스레드입니다.

일부 경우에 이러한 작업은 실행에 오랜 시간이 걸리며, 이렇게 되면
기본 스레드가 차단되고 큐에 있는 모든 기타 작업이 대기해야 합니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-long-tasks.png"
       alt="Chrome DeveloperTools에서 보이는 장기 작업"/>
</figure>

사용자에게는 이것이 지연이나 쟁크 현상으로 나타나며, 이것은 오늘날
나쁜 웹 경험의 주요 원인이 됩니다.

[장기 작업 API](https://w3c.github.io/longtasks/)는 50ms보다 오래
소요되는 모든 작업을 잠재적인 문제로 식별하고, 이러한 작업을
앱 개발자에게 알립니다. 50ms가 선정된 이유는
애플리케이션이 100ms 안에 사용자 입력에 반응하는
[RAIL 가이드라인](/web/fundamentals/performance/rail)을 충족할 수 있도록 하기 위한 것입니다.

### 상호작용 시간

*상호작용 시간*(TTI)는 애플리케이션이
시각적으로 렌더링되었으며 사용자 입력에 안정적으로 반응할 수 있는 지점을 표시합니다. 애플리케이션이 사용자의 입력에 반응하지 못하는 이유에는 몇 가지가
있습니다.

* 자바스크립트가 아직 로드되지 않은
  페이지 작업에 요소를 구성해야 합니다.
* 장기 작업이 기본 스레드를 차단하고 있습니다(마지막
  섹션에서 설명).

TTI 측정항목은 페이지의 초기 자바스크립트가
로드되고 기본 스레드가 유휴 상태(장기 작업 없음)인 지점을 식별합니다.

### 사용자 환경에 대한 측정항목 매핑

이전에 사용자 환경에 가장 중요하다고 식별한 질문으로 돌아가서,
이 표는 우리가 지금 나열한 각 측정항목이 최적화하고자 하는 환경을 어떻게 매핑하는지
개략적으로 보여줍니다.

<table>
  <tr>
    <th>환경</th>
    <th>측정항목</th>
  </tr>
  <tr>
    <td>작동되는 걸까?</td>
    <td>첫 번째 페인트(FP)/첫 번째 콘텐츠가 있는 페인트(FCP)</td>
  </tr>
  <tr>
    <td>유용한가?</td>
    <td>첫 번째 페인트(FMP)/히어로 요소 타이밍</td>
  </tr>
  <tr>
    <td>사용할 수 있나?</td>
    <td>상호작용 시간(TTI)</td>
  </tr>
  <tr>
    <td>즐거운가?</td>
    <td>장기 작업(정확하게는 장기 작업의 부재)</td>
  </tr>
</table>

이러한 로드 타임라인의 스크린샷은 로드 환경에 알맞은 로드
측정항목을 시각화하는 데 도움을 줍니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-load-timeline.png"
       alt="로드 환경 내 이러한 측정 항목이 발생하는 지점의 스크린샷"/>
</figure>

다음 섹션은 실제 사용자의 기기에서 이러한 측정항목을 측정하는 방법을 자세하게 설명합니다.

## 실제 사용자의 기기에서 측정항목 측정

역사적으로 로드 및
`DOMContentLoaded`와 같은 측정항목을 최적화한 주요 이유 중 하나는 이것들이 브라우저에 이벤트로 나타나고 실제 사용자 측에서
측정하기 쉽기 때문입니다.

반면, 수많은 측정항목은 역사적으로 매우
측정하기 어려웠습니다. 예를 들어, 이 코드는 개발자가 장기 작업을 검색하는 데
종종 사용하는 요령입니다.

```
(function detectLongFrame() {
  var lastFrameTime = Date.now();
  requestAnimationFrame(function() {
    var currentFrameTime = Date.now();

    if (currentFrameTime - lastFrameTime > 50) {
      // Report long frame here...
    }

    detectLongFrame(currentFrameTime);
  });
}());
```

이 코드는 무한 `requestAnimationFrame` 루프로 시작하며
각 반복의 시간을 기록합니다. 만약 현재 시간이 이전
시간 후 50ms을 초과한다면, 장기 작업의 결과라고 가정합니다. 이 코드는
대체로 잘 작동하지만, 여러 단점이 있습니다.

* 오버헤드를 모든 프레임에 추가합니다.
* 유휴 블록을 방지합니다.
* 배터리 수명에 치명적입니다.

성능 측정 코드의 가장 중요한 규칙은
성능을 더 나쁘게 해서는 안 된다는 것입니다.

[Lighthouse](/web/tools/lighthouse/)나 [Web Page
Test](https://www.webpagetest.org/)와 같은 서비스는 꽤 이전부터
이러한 새 측정항목을 제공했지만(대체로 릴리스 전의
성능 테스트에 좋은 도구입니다), 이러한 도구는 사용자의 기기에서 실행되지 않으므로 사용자가 경험하는
실제 성능을 반영하지 않습니다.

다행히 몇 가지 새로운 브라우저 API가 추가되었습니다. 덕분에 드디어, 성능을 저하시킬 가능성이 있는
핵(hack)을 많이 쓰거나 해결 방법을 동원하지 않고도 실제 기기에서 이러한 측정항목을
측정할 수 있게 되었습니다.

이러한 새 API는
[`PerformanceObserver`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver),
[`PerformanceEntry`](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry),
및
[`DOMHighResTimeStamp`](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)입니다.
실행 중인 이러한 새 API의 일부 코드를 표시하기 위해, 다음 코드 예시에서는
새 `PerformanceObserver` 인스턴스를 생성하고 페인트
엔트리(예: FP 및 FCP) 및 발생한 장기 작업의 알림을 받도록 구독합니다.

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // `entry` is a PerformanceEntry instance.
    console.log(entry.entryType);
    console.log(entry.startTime); // DOMHighResTimeStamp
    console.log(entry.duration); // DOMHighResTimeStamp
  }
});

// Start observing the entry types you care about.
observer.observe({entryTypes: ['resource', 'paint']});
```

`PerformanceObserver`가 제공하는 것은
성능 이벤트 발생을 구독하고
비동기 방식으로 응답하는 이전에 없던 능력입니다. 이 인스턴스는 데이터를 이용할 수 있는지 확인하기 위해
폴링을 요구하던 구식
[성능 타이밍](https://www.w3.org/TR/navigation-timing/#sec-navigation-timing-interface)
인터페이스를 대체합니다.

### FP/FCP 추적

일단 특정 성능 이벤트에 대한 데이터를 얻으면 현재 사용자에 대한
측정항목을 포착하기 위해 사용하는 어떤 분석 서비스에나 보낼 수 있습니다.
예를 들어, Google 애널리틱스를 사용하여 첫 번째 페인트 시간을 다음과 같이
추적할 수 있습니다.

```
<head>
  <!-- Add the async Google Analytics snippet first. -->
  <script>
  window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
  ga('create', 'UA-XXXXX-Y', 'auto');
  ga('send', 'pageview');
  </script>
  <script async src='https://www.google-analytics.com/analytics.js'></script>

  <!-- Register the PerformanceObserver to track paint timing. -->
  <script>
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      // `name` will be either 'first-paint' or 'first-contentful-paint'.
      const metricName = entry.name;
      const time = Math.round(entry.startTime + entry.duration);

      ga('send', 'event', {
        eventCategory: 'Performance Metrics',
        eventAction: metricName,
        eventValue: time,
        nonInteraction: true,
      });
    }
  });
  observer.observe({entryTypes: ['paint']});
  </script>

  <!-- Include any stylesheets after creating the PerformanceObserver. -->
  <link rel="stylesheet" href="...">
</head>
```

<aside>
  <p><strong>중요:</strong> 스타일시트 전에 문서의 <code>&lt;head&gt;</code>에 <code>PerformanceObserver
  </code>가 등록되었는지 확인하여 FP/FCP 발생 이전에
  실행되도록 해야 합니다.<p>
  <p>이것은 <code>PerformanceObserver</code> 생성 이전에 큐에 추가된 성능
엔트리에 접근할 수 있게 해주는 <a
    href="https://w3c.github.io/performance-timeline/#dom-performanceobserverinit-
  buffered"><code>buffered</code></a> 플래그를 도입하기 때문에 <a
  href="https://w3c.github.io/performance-timeline/">Performance Observer spec
  </a>의 레벨 2가 구현되면
  더이상 필요하지 않습니다.</p>
</aside>

### 히어로 요소를 이용하여 FMP 추적

페이지의 어떤 요소가 히어로 요소인지 식별한 후에는
이것이 사용자에게 보이는 지점을 추적하고 싶을 것입니다.

아직 FMP에 대한 표준 정의는 없습니다(따라서 성능
엔트리 유형도 없습니다). 부분적인 이유는 모든 페이지에 대해 '의미 있다'는 것이
포괄적으로 무엇을 의미하는지 결정하는 것이 어렵기 때문입니다.

그러나, 단일 페이지 또는 단일 애플리케이션이라는 문맥에서는
FMP가 화면에 히어로 요소가 나타나는 순간이라고 생각하는 것이 일반적으로
가장 좋습니다.

Steve Souders는
브라우저의 성능 API를 이용하여 다양한 유형의 미디어가 가시화될 때를
코드에서 확인하는 여러 기술을 상세히 기술한 [User Timing and Custom
Metrics](https://speedcurve.com/blog/user-timing-and-custom-metrics/)라는 기사를 작성했습니다.

### TTI 추적

장기적으로 TTI 측정항목이 표준화되고 PerformanceObserver를 통해
브라우저에서 표시되기를 바랍니다. 그 동안, 오늘날의 TTI를
검색할 수 있고 [장기 작업 API](https://w3c.github.io/longtasks/)을 지원하는 모든 브라우저에서 작동하는
폴리필을 개발했습니다.

이 폴리필은 `getFirstConsistentlyInteractive()` 메서드를 나타내며, 이것은 TTI 값으로 분석하는
프라미스를 반환합니다. Google 애널리틱스를 이용하여
TTI를 다음과 같이 추적할 수 있습니다.

```
import ttiPolyfill from './path/to/tti-polyfill.js';

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  ga('send', 'event', {
    eventCategory: 'Performance Metrics',
    eventAction: 'TTI',
    eventValue: tti,
    nonInteraction: true,
  });
});
```

`getFirstConsistentlyInteractive()` 메서드는 선택적 `startTime`
구성 옵션을 허용하기 때문에 이전에 앱이 상호작용을 할 수 없었던
하한 경계를 특정할 수 있습니다. 기본적으로 폴리필은 DOMContentLoaded를 시작 시간으로 이용하지만,
보통은 히어로 요소가 보이는 순간이나 모든 이벤트 리스너가 추가된
지점과 같은 것을 이용하는 것이
더 정확합니다.

[TTI 폴리필
문서](https://github.com/GoogleChrome/tti-polyfill)를 참조하여 전체 설치
및 사용 안내를 확인하세요.

<aside>
  <strong>참고:</strong> FMP와 마찬가지로 TTI 측정항목
  정의를 모든 웹페이지에서 완벽하게 작동하도록 구체화하는 것은 꽤 어렵습니다. 이 폴리필에 구현한
  버전은 대부분의 앱에서 작동하지만, 여러분의 특정
  앱에서는 작동하지 않을 수 있습니다. 여기에 의존하기 전에
  테스트해 보는 것이 중요합니다. TTI의 구체적인 내용에 관한
  정의 및 구현의 자세한 내용을 알고 싶다면
  <a href="https://goo.gl/OSmrPk">TTI 측정항목 정의 문서</a>를 읽어보세요.
</aside>

### 장기 작업 추적

위에서 장기 작업이 종종 부정적인 사용자
환경(예: 느린 이벤트 핸들러 또는 낮은 프레임)을 발생시킨다고 언급했습니다. 이것이 얼마나
자주 일어나는지 알면 최소화하려는 노력을 기울일 수 있습니다.

자바스크립트의 장기 작업을 검색하려면 새로운 `PerformanceObserver`를 생성하고
`longtask` 유형의 엔트리를 관찰합니다. 장기 작업 엔트리의 한 가지 좋은 특징은
[애트리뷰션
속성](https://w3c.github.io/longtasks/#sec-TaskAttributionTiming)을 담고 있어
어떤 코드가 장기 작업을 일으키는지 쉽게 추적할 수 있다는 것입니다.

```
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    ga('send', 'event', {
      eventCategory: 'Performance Metrics',
      eventAction: 'longtask',
      eventValue: Math.round(entry.startTime + entry.duration),
      eventLabel: JSON.stringify(entry.attribution),
    });
  }
});

observer.observe({entryTypes: ['longtask']});
```

애트리뷰션 속성은 어떤 프레임 컨텍스트가
장기 작업을 일으키는지 알려주며,
타사 iframe 스크립트가 문제를 일으키는지 확인하는 데 도움이 됩니다. 이 사양의 향후 버전은 더 많은 입도(粒度)를 추가하고,
자신의 스크립트가 지연을 일으키는 경우 이것을 확인하는 데 매우 유용한 스크립트 URL, 줄, 열 번호를
표시할 예정입니다.

### 입력 지연 시간 추적

기본 스레드를 차단하는 장기 작업은 이벤트 리스너가 적시에
실행되는 것을 막습니다. [RAIL 성능
모델](/web/fundamentals/performance/rail)은 사용자
인터페이스가 매끄럽게 느껴지려면 사용자 입력의 100ms 내에 반응해야 하며,
문제가 없더라도 알아두는 것이 중요하다는 것을 가르쳐줍니다.

코드 내 지연 시간을 검색하려면 이벤트의 타임 스탬프를
현재 시간과 비교할 수 있어야 하며, 차이가 100ms보다 크다면 보고할 수
있습니다(또 그렇게 해야 합니다).

```
const subscribeBtn = document.querySelector('#subscribe');

subscribeBtn.addEventListener('click', (event) => {
  // Event listener logic goes here...

  const lag = performance.now() - event.timeStamp;
  if (lag > 100) {
    ga('send', 'event', {
      eventCategory: 'Performance Metric'
      eventAction: 'input-latency',
      eventLabel: '#subscribe:click',
      eventValue: Math.round(lag),
      nonInteraction: true,
    });
  }
});
```

이벤트 지연 속도는 보통 장기 작업으로 인해 발생하므로,
이벤트 지연 시간 검색 논리를 장기 작업 검색 논리와 결합할 수 있습니다. 장기
작업이 `event.timeStamp`와 동일한 시간에 기본 스레드를 차단한다면, 장기 작업의 애트리뷰션 값도 보고할
수 있습니다. 이를 통해 부정적인 성능 경험과
이를 야기하는 코드를
명확하게 구분할 수 있습니다.

이 기술이 완벽한 것은 아니지만(나중의 전파 단계에서 장기 이벤트 리스너를 처리하지 않으며 기본 스레드에서 실행되지 않는 스크롤이나 합성
애니메이션에서는 사용할 수 없음),
장기 실행 중인 자바스크립트 코드가
사용자
환경에 미치는 영향을 이해하는 데 좋은 시작점입니다.

## 데이터 해석

실제 사용자의 성능 측정항목을 수집하기 시작했다면,
이 데이터를 사용해야 합니다. 실제 사용자 성능 데이터는 몇 가지
주요한 이유에서 유용합니다.

* 앱이 예상대로 작동한다는 것을 검증합니다.
* 불량한 성능이 전환에 부정적인 영향을 미치는 곳을 식별합니다
  (이것이 앱에서 어떤 의미인지와 무관).
* 사용자 환경을 개선하고 사용자에게 즐거움을 주는 기회를 찾을 수 있습니다.

한가지 해볼 만한 가치가 있는 것은 앱이 휴대기기와
데스크탑에서 어떻게 작동하는지 비교하는 것입니다. 다음 도표는 여러 데스크탑(파란색)
및 모바일(주황색)의 TTI 분산을 나타낸 것입니다. 이 예에서 볼 수 있듯이 모바일의 TTI 값은
데스크탑에 비해 상당히 깁니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-tti-mobile-v-desktop.png"
       alt="여러 데스크탑 및 모바일의 TTI 분산"/>
</figure>

이 수치는 앱 특정 값이긴 하지만(이 수치가 여러분의 수치와 같을 것이라고
가정해서는 안 됩니다. 자신의 수치를 직접 측정하세요),
사용 측정항목 보고의 접근 방식에 대한 예시를 제공합니다.

#### 데스크톱

<table>
  <tr>
   <td><strong>백분위</strong></td>
   <td align="right"><strong>TTI(초)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">2.3</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">4.7</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">8.3</td>
  </tr>
</table>

#### 모바일

<table>
  <tr>
   <td><strong>백분위</strong></td>
   <td align="right"><strong>TTI(초)</strong></td>
   </td>
  </tr>
  <tr>
   <td>50%</td>
   <td align="right">3.9</td>
  </tr>
  <tr>
   <td>75%</td>
   <td align="right">8.0</td>
  </tr>
  <tr>
   <td>90%</td>
   <td align="right">12.6</td>
  </tr>
</table>

결과를 여러 모바일 및 데스크탑으로 세분화하고, 데이터를 분산으로 분석하면
실제 사용자 환경에 관한 그림을 빠르게 얻을 수 있습니다.
예를 들어, 위의 표에서 이 앱의 경우
**10%의 휴대 기기 이용자가 상호작용을 할 수 있기까지 12초 이상 소요되었다**는 것을 알 수 있습니다.

### 성능이 비즈니스에 미치는 영향

분석 도구에서 성능을 추적하는 가장 큰 이점은
이 데이터를 이용해 성능이 비즈니스에 어떤 영향을 미치는지 분석할 수 있다는 점입니다.

분석에서 목표 성취나 전자상거래 전환을 추적 중이라면,
이러한 항목과 앱의
성능 측정항목 간의 모든 상관관계를 탐색하는 보고서를 생성할 수 있습니다. 예:

* 상호작용이 더 빠른 사용자가 더 많은 물건을 구매하는가?
* 결제에서 더 많은 장기 작업을 경험하는 사용자가 더 높은 비율로 이탈하는가?

상관관계를 찾았다면 성능이 중요하며 이를 우선시해야 한다는 비즈니스 사례를 만드는 것이
훨씬 쉬워집니다.

### 로드 포기

우리는 페이지가 로드되는 데 너무 오랜 시간이 걸리면 사용자가 떠나버린다는 것을 알고 있습니다.
안타깝게도, 이것은 우리의 모든 성능 측정 항목이 [생존자 바이어스](https://en.wikipedia.org/wiki/Survivorship_bias)의
문제를 공유한다는 것을 의미합니다.
즉, 데이터에는 페이지의
로드 완료를 기다리지 않은 사람들(아마도 수치가 너무 낮음)의 로드 측정항목이 포함되지 않습니다.

이러한 사용자가 계속
기다렸다면 어떤 수치였을지 추적할 수는 없지만, 이것이 얼마나 자주 발생하는지, 각 사용자가 얼마나 오래
기다렸는지는 추적할 수 있습니다.

이 방법은 analytics.js 라이브러리가
보통 비동기로 로드되며, 사용자가
이탈을 결심했을 때는 이용할 수 없기 때문에 Google 애널리틱스로 작업하기에는 조금 어렵습니다. 그러나, Google 애널리틱스에 데이터를 전송하기 전에 analytics.js가
로드되는 것을 기다릴 필요가 없습니다. [측정 프로토콜](/analytics/devguides/collection/protocol/v1/)을 통해
직접 전송할 수 있습니다.

이 코드는
[`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/Events/visibilitychange)
이벤트(페이지가 로드되지 않거나 백그라운드로 전환되었을 때 시작됨)에 리스너를 추가하고,
해당 시점의 `performance.now()` 값을 전송합니다.

```
<script>
window.__trackAbandons = () => {
  // Remove the listener so it only runs once.
  document.removeEventListener('visibilitychange', window.__trackAbandons);
  const ANALYTICS_URL = 'https://www.google-analytics.com/collect';
  const GA_COOKIE = document.cookie.replace(
    /(?:(?:^|.*;)\s*_ga\s*\=\s*(?:\w+\.\d\.)([^;]*).*$)|^.*$/, '$1');
  const TRACKING_ID = 'UA-XXXXX-Y';
  const CLIENT_ID =  GA_COOKIE || (Math.random() * Math.pow(2, 52));

  // Send the data to Google Analytics via the Measurement Protocol.
  navigator.sendBeacon && navigator.sendBeacon(ANALYTICS_URL, [
    'v=1', 't=event', 'ec=Load', 'ea=abandon', 'ni=1',
    'dl=' + encodeURIComponent(location.href),
    'dt=' + encodeURIComponent(document.title),
    'tid=' + TRACKING_ID,
    'cid=' + CLIENT_ID,
    'ev=' + Math.round(performance.now()),
  ].join('&'));
};
document.addEventListener('visibilitychange', window.__trackAbandons);
</script>
```

이 코드를 문서의 `<head>`에 복사하고
`UA-XXXXX-Y` 자리표시자를
[추적 ID](https://support.google.com/analytics/answer/1008080)로 교체하여 사용할 수 있습니다.

아울러, 일단 페이지가
상호작용할 수 있게 되면 이 리스너를 삭제해야 합니다. 그렇지 않으면 TTI를 보고한
로드의 폐기를 보고하게 됩니다.

```
document.removeEventListener('visibilitychange', window.__trackAbandons);
```

## 성능 최적화 및 회귀 방지

사용자 중심적 측정항목을 정의하는 것의 좋은 점은 이러한 항목을 최적화할 때
반드시 사용자 환경을 향상하게 된다는 것입니다.

성능을 향상하는 가장 간단한 방법은 클라이언트에 더 적은 자바스크립트
코드를 전송하는 것이지만, 코드 크기를 줄이는 선택지를 고를 수 없는 경우에는
*어떻게* 자바스크립트를 전달할지 생각하는 것이 중요합니다.

### FP/FCP 최적화

문서의 `<head>`에서
렌더 차단 스크립트나 스타일시트를 삭제하여 첫 번째 페인트와 첫 번째 콘텐츠가 담긴 페인트까지의 시간을 줄일 수 있습니다.

시간을 들여
사용자에게 '작동 중'이라는 것을 보여주는 데 필요한 최소한의 스타일 집합을 식별하고, `<head>`에 인라인 처리(또는 [HTTP/2 서버
푸시](/web/fundamentals/performance/http2/#server_push))함으로써 매우
빠른 첫 번째 페인트 시간을 얻을 수 있습니다.

[앱 셸 패턴](/web/updates/2015/11/app-shell)은 [프로그래시브 웹 앱](/web/progressive-web-apps/)에 대해 이것을 어떻게 하는지
보여주는 훌륭한 예입니다.

### FMP/TTI 최적화

페이지에서 가장 중요한 UI 요소(히어로
요소)를 식별한 후에는, 초기 스크립트 로드가 이러한 요소를 렌더링하는 데 필요한
코드만 담고 있으며 상호작용이 가능하도록 해야 합니다.

초기
자바스크립트 번들에 포함된 히어로 요소와 관련 없는 모든 코드는 상호작용 시간을 지연시킵니다. 사용자의 기기가
바로 필요하지 않은 자바스크립트 코드를 다운로드 및 파싱하도록 강요할
필요가 없습니다.

기본적으로, FMP와 TTI 사이의
시간을 가능한 한 최소화하기 위해 최선을 다해야 합니다. 이 시간을 최소화하는 것이 불가능한 경우에는
인터페이스에서 아직 상호작용을
할 수 없다는 것을 명확하게 보여주는 것이 절대적으로 중요합니다.

사용자에게 가장 짜증나는 경험은 요소를 탭했을 때
아무 일도 일어나지 않는 것입니다.

### 장기 작업 방지하기

코드를 분할하고 코드가 로드되는 우선순위를 매기는 것으로 페이지가 더욱 빠르게 상호작용이 가능해질 뿐만
아니라 장기 작업을 감소시켜
입력 지연 시간과 느린 프레임이 줄어들 수 있을 것입니다.

코드를 여러 개의 파일로 분할하는 것과 더불어, 큰 덩어리의
동기화 코드를
비동기로 실행되거나
[다음 유휴 지점까지 지연](/web/updates/2015/08/using-requestidlecallback)되는 작은 덩어리로 분할할 수도 있습니다.
더 작은 덩어리로 논리를 비동기 실행함으로써
브라우저가 사용자 입력에 응답하는 데 필요한 기본 스레드 공간을 만들 수 있습니다.

마지막으로, 타사 코드를 테스트하고
느리게 실행되는 코드에 대한 설명을 요구해야 합니다. 많은 장기 작업을 발생시키는
타사 광고나 스크립트 추적은 여러분의 비즈니스를 돕기보다 오히려
해를 끼치게 될 수 있습니다.

## 회귀 방지

이 문서는 실제 사용자의 성능 측정에 크게 중점을 두었습니다.
결국에 중요한 성능 데이터는 RUM 데이터인 것이 맞지만,
실험실 데이터도 새 기능을 릴리스하기 전에 앱이 잘 작동하는지(또한
회귀하지 않는지) 확인하는 데 여전히 중요합니다. 실험실 테스트는 제어된 환경에서 실행되고 RUM 테스트의
무작위 변동성에 덜 취약하므로
회귀 감지에 이상적입니다.

[Lighthouse](/web/tools/lighthouse/)나 [Web Page
Test](https://www.webpagetest.org/)와 같은 도구는 지속적 통합 서버에 통합될 수 있으며, 주요 측정항목이
회귀하거나 특정 임계점 아래로 내려갔을 때 빌드를 실패하게 하는
테스트를 작성할 수 있습니다.

이미 릴리스된 코드에 대해서는 [사용자설정
경고](https://support.google.com/analytics/answer/1033021)를 추가하여
부정적인 성능 이벤트 발생이 예기치 않게 급증했을 때 알림을 받을 수 있습니다.
이러한 일은 예를 들어 타사가 새 버전의 서비스를
릴리스하자 여러분의 사용자가 갑작스레 훨씬 더 많은 장기
작업을 경험하는 경우 발생할 수 있습니다.

성공적으로 회귀를 예방하려면 실험실과
통제되지 않은 환경 모두에서 릴리스된 모든 새로운 기능으로 성능을 테스트해야 합니다.

<figure>
  <img src="/web/fundamentals/performance/images/perf-metrics-test-cycle.png"
       alt="릴리스 프로세스 내 RUM 및 실험실 테스트 흐름도"/>
</figure>

## 요약 및 향후 전망

작년에 우리는 브라우저
내 사용자 중심 측정항목을 개발자들에게 알리면서 큰 걸음을 떼었지만,
아직 끝난 것이 아닙니다. 우리는 더 많은 계획을 갖고 있습니다.

상호작용 시간과 히어로 요소 측정항목을 표준화하여
개발자가 직접 측정하거나 폴리필에 의존하지 않아도 되도록 하고자 합니다. 또한
개발자가 특정 장기 작업을 유발하는 낮은 프레임과 지연 시간을 찾고
그 원인인 코드를 규명하는 과정을 쉽게 만들고자 합니다.

아직 할 일이 많이 남아 있지만 우리가 지금까지 이루어낸 것을 기쁘게 생각합니다. 개발자는 `PerformanceObserver`와 같은 새로운API나 브라우저에서
기본으로 지원되는 장기 작업을 이용하여 마침내
사용자의 환경을 저해하지 않고 실제 사용자의
성능을 측정할 프리미티브를 갖게 됩니다.

가장 중요한 측정항목은 실제 사용자
환경을 대표하는 것이며, 우리는 개발자가 가능한 한 쉽게
사용자에게 즐거움을 주고 훌륭한 애플리케이션을 만들 수 있도록 하고자 합니다.

## 최신 정보를 놓치지 마세요

{% include "web/_shared/helpful.html" %}

파일 사양 문제:

* [https://github.com/w3c/longtasks/issues](https://github.com/w3c/longtasks/issues)
* [https://github.com/WICG/paint-timing/issues](https://github.com/WICG/paint-timing/issues)
* [https://github.com/w3c/performance-timeline/issues](https://github.com/w3c/performance-timeline/issues)

파일 폴리필 문제:

* [https://github.com/GoogleChrome/tti-polyfill/issues](https://github.com/GoogleChrome/tti-polyfill/issues)

질문하기:

* [progressive-web-metrics@chromium.org](mailto:progressive-web-metrics@chromium.org)
* [public-web-perf@w3.org](mailto:public-web-perf@w3.org)

새 API 제안에 관한 지원과 우려에 관한 의견:

* [https://github.com/w3c/charter-webperf/issues](https://github.com/w3c/charter-webperf/issues)
