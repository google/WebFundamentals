project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 주요 렌더링 경로를 측정하는 방법에 대해 알아봅니다.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 주요 렌더링 경로 측정 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

모든 탄탄한 성능 전략은 훌륭한 측정과 계측을
바탕으로 합니다. 측정할 수 없는 사항을 최적화할 수 없습니다. 이 문서에서는
다른 접근방식의 CRP 성능 측정에 대해 설명합니다.

* Lighthouse 접근방식에서는 일련의 자동화된 테스트를 페이지에 실행한 다음,
이 페이지의 CRP 성능에 대한 보고서를 생성합니다. 이 접근방식은
 브라우저에 로드된 특정 페이지의 CRP 성능을 쉽고 빠르게 측정해 주며,
신속하게 테스트를 수행하고 반복하여 성능을
개선해 줍니다.
* Navigation Timing API 접근방식에서는 [RUM(Real User
Monitoring)](https://en.wikipedia.org/wiki/Real_user_monitoring)
지표를 캡처합니다. 이름에서 알 수 있듯이, 이 지표는
 실제 사용자의 사이트 상호작용으로부터 캡처되며,
 다양한 기기와 네트워크 조건에서 사용자가 경험하는
 실제 CRP 성능을 정확하게 보여줍니다.

일반적인 좋은 접근방식은 Lighthouse를 사용하여 CRP
최적화의 명확한 기회를 파악하는 것입니다. 그런 다음,
Navigation Timing API로 코드를 작성하여 앱의 실제 성능을 모니터링합니다.

## Lighthouse로 페이지 감사 {: #lighthouse }

Lighthouse는 웹 앱 감사 도구이며 해당 페이지에 대해 일련의 테스트를 수행한 다음,
이 페이지의 결과를 통합된 보고서로 표시해줍니다. Lighthouse를
Chrome 확장 프로그램이나 NPM 모듈로서 실행할 수 있으며,
이는 Lighthouse와 지속적 통합 시스템을 통합하는 데 유용합니다.

시작하려면 [Lighthouse로 웹 앱 페이지 감사](/web/tools/lighthouse/)를 참조하세요.

Lighthouse를 Chrome 확장 프로그램으로 실행하는 경우,
페이지의 CRP 결과는 아래 스크린샷과 같이 보입니다.

![Lighthouse의 CRP 감사](images/lighthouse-crp.png)

이 감사의 결과에 대한 자세한 내용은 [주요 요청 체인][crc]을
참조하세요.

[crc]: /web/tools/lighthouse/audits/critical-request-chains

## Navigation Timing API로 코드 작성 {: #navigation-timing }

Navigation Timing API와 기타 여러 브라우저 이벤트를 조합해서 사용하여
임의 페이지의 실제 CRP 성능을 캡처하고 기록할 수
있습니다.

<img src="images/dom-navtiming.png"  alt="Navigation Timing">

위 다이어그램의 각 레이블은 로드되는 각각의 모든 페이지에 대해 브라우저가 추적하는 고해상도 타임스탬프에 해당합니다. 사실상, 이 특정 경우에서는 다양한 모든 타임스탬프 중 일부만 보여줍니다. 지금은 모든 네트워크 관련 타임스탬프를 건너뛰지만 이후 과정에서 이에 대해 다시 살펴볼 것입니다.

그렇다면 이러한 타임스탬프가 의미하는 바는 무엇일까요?

* `domLoading`: 전체 프로세스의 시작 타임스탬프입니다.
브라우저가 처음 수신한 HTML
문서 바이트의 파싱을 시작하려고 합니다.
* `domInteractive`: 브라우저가 파싱을 완료한 시점을 표시합니다. 모든
HTML 및 DOM 생성 작업이 완료되었습니다.
* `domContentLoaded`: DOM이 준비되고 자바스크립트 실행을 차단하는 스타일시트가 없는 시점을 표시합니다. 즉, 이제 (잠재적으로) 렌더링 트리를 생성할 수 있습니다.
    * 많은 자바스크립트 프레임워크가 자체 로직을 실행하기 전에 이 이벤트를 기다립니다. 이러한 이유로 브라우저는 `EventStart` 및 `EventEnd` 타임스탬프를 캡처합니다. 이를 통해 이 실행이 얼마나 오래 걸렸는지 추적할 수 있습니다.
* `domComplete`: 이름이 의미하는 바와 같이, 모든 처리가 완료되고
페이지의 모든 리소스(이미지 등) 다운로드가 완료되었습니다(
예: 로딩 스피너가 회전을 멈춤).
* `loadEvent`: 각 페이지 로드의 최종 단계로, 브라우저가
추가 애플리케이션 로직을 트리거할 수 있는 `onload` 이벤트를 발생시킵니다.

HTML 사양은 이벤트가 발생하는 시기, 충족해야 하는 조건 등 각 이벤트에 대한 특정 조건을 규정합니다. 여기서는 주요 렌더링 경로와 관련된 몇 가지 주요 마일스톤을 중점적으로 살펴보겠습니다.

* `domInteractive`는 DOM이 준비된 시점을 표시합니다.
* `domContentLoaded`는 일반적으로 [DOM 및 CSSOM이 모두 준비](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)된 시점을 표시합니다.
    * 파서 차단 자바스크립트가 없으면 `domInteractive` 직후에 `DOMContentLoaded`가 발생할 것입니다.
* `domComplete`는 페이지 및 해당 하위 리소스가 모두 준비된 시점을 표시합니다.


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp.html){: target="_blank" .external }

위 예시는 처음 보면 조금 복잡해 보일 수 있지만 사실은 매우 간단합니다. Navigation Timing API는 모든 관련 타임스탬프를 캡처하고 개발자 코드는 단순히 `onload` 이벤트가 발생하기를 기다립니다. `onload` 이벤트는 `domInteractive`, `domContentLoaded` 및 `domComplete` 이후에 발생한다는 사실을 상기하세요. 또한 이 API는 다양한 타임스탬프 간의 차이를 계산합니다.

<img src="images/device-navtiming-small.png"  alt="NavTiming 데모">

모든 것이 말한대로 이루어졌으면, 이제 측정할 몇 가지 특정한 마일스톤과 이러한 측정 결과를 출력하기 위한 간단한 함수가 만들어졌을 것입니다. 페이지에 이러한 메트릭을 출력하는 대신 분석 서버로 전송하도록 코드를 수정할 수도 있습니다([Google 애널리틱스에서는 이 작업을 자동으로 수행함](https://support.google.com/analytics/answer/1205784)). 이는 페이지의 성능을 감시하고 몇 가지 최적화 작업을 통해 성능을 높일 수 있는 페이지를 식별하기 위한 훌륭한 방법입니다.

## DevTools 소개{: #devtools }

이 문서에서는 CRP 개념을 설명하기 위해
Chrome DevTools Network 패널을 사용하기도 하지만
현재는 DevTools가 CRP 분석에 잘 맞지 않습니다.
그 이유는 DevTools에는 주요 리소스를 분리하기 위한 내장 메커니즘이 없기 때문입니다. 이러한 리소스를 식별하도록 도우려면
[Lighthouse](#lighthouse) 감사를 실행하세요.

<a href="analyzing-crp" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Analyzing CRP">
  <button>다음 차례: 주요 렌더링 경로 성능 분석</button>
</a>


{# wf_devsite_translation #}
