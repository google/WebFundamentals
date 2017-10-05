project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 사용자는 페이지가 대화형으로 원활하게 작동할 것을 기대합니다. 픽셀 파이프라인의 각 단계는 버벅거림이 발생할 가능성을 나타냅니다. 런타임 성능을 저하시키는 보편적인 문제를 식별하고 해결하는 여러 가지 도구와 전략에 대해 알아보세요.

{# wf_updated_on: 2016-03-15 #}
{# wf_published_on: 2015-04-13 #}

# 런타임 성능 분석 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

사용자는 페이지가 대화형으로 원활하게 작동할 것을 기대합니다. 픽셀 파이프라인의 
각 단계는 버벅거림이 발생할 가능성을 나타냅니다. 런타임 성능을 
저하시키는 보편적인 문제를 식별하고 해결하는 여러 가지 
도구와 전략에 대해 알아보세요.


### TL;DR {: .hide-from-toc }
- 브라우저가 레이아웃을 강제로 재계산하게 만드는 자바스크립트를 작성하지 마세요. 읽기와 쓰기 기능을 분리하여 읽기부터 먼저 수행하세요.
- CSS를 지나치게 복잡하게 만들지 마세요. CSS는 가급적 적게 사용하고 CSS 선택기를 단순하게 유지하는 것이 좋습니다.
- 레이아웃은 가급적 피하세요. 레이아웃을 전혀 트리거하지 않는 CSS를 선택하세요.
- 페인팅에는 다른 어떤 렌더링 활동보다도 많은 시간이 소요됩니다. 페인트 병목 현상에 주의하세요.


## 자바스크립트 

자바스크립트 계산, 특히 광범위한 시각적 변경을 트리거하는 계산의 경우 
애플리케이션 성능을 지연시킬 수 있습니다. 타이밍이 나쁘거나 실행 시간이 긴 
자바스크립트가 사용자 상호작용을 중단시키지 않도록 주의해야 합니다.

### 도구

**타임라인** [기록][recording]을 만들어 의심스러울 정도로 긴 
**Evaluate Script** 이벤트를 찾아봅니다. 하나라도 발견되면,
[JS 프로파일러][profiler]를 활성화하여 기록을 다시 수행하면 정확히 어느 JS 함수를 호출했고 각각 어느 정도의 시간이
걸렸는지 좀 더 자세한 정보를 얻을 수
있습니다.

자바스크립트에 버벅거림이 꽤 많이 발견되는 경우, 한층 심층적인 분석을 수행하여
자바스크립트 CPU 프로필을 수집할 수 있습니다.
CPU 프로필에는 페이지 함수 내 어느 지점에서 실행 시간이 소모되는지 표시됩니다.
CPU 프로필을 만드는 방법은 [자바스크립트 실행 속도 개선][cpu]을 참조하세요.

[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### 문제

다음 표에 몇 가지 보편적인 자바스크립트 문제와 가능한 해결책이 설명되어 있습니다.

<table>
  <thead>
      <th>문제</th>
      <th>예시</th>
      <th>해결 방법</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">고비용 입력 핸들러가 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">터치, 시차 스크롤링.</td>
      <td data-th="Solution">브라우저가 터치와 스크롤을 처리하도록 하거나, 리스너를 가급적 늦게 바인딩합니다(<a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis의 런타임 성능 검사 목록 중 고비용 입력 핸들러</a> 참조).</td>
    </tr>
    <tr>
      <td data-th="Problem">타이밍이 나쁜 자바스크립트가 응답, 애니메이션, 로드에 영향을 미칩니다.</td>
      <td data-th="Example">사용자가 페이지 로드, setTimeout/setInterval 직후 스크롤합니다.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">자바스크립트 실행 최적화</a>:  <code>requestAnimationFrame</code>를 사용하고, DOM 조작을 여러 프레임에 분산하고 Web Worker를 사용합니다.
    </tr>
    <tr>
      <td data-th="Problem">실행 시간이 긴 자바스크립트가 응답에 영향을 미칩니다.</td>
      <td data-th="Example"><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded 이벤트</a>가 JS 작업으로 수렁에 빠져 중단됩니다.</td>
      <td data-th="Solution">순수 계산 작업을 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Worker</a>로 이동합니다. DOM 액세스가 필요한 경우,  <code>requestAnimationFrame</code>을 사용합니다(<a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">자바스크립트 실행 최적화</a> 참조).</td>
    </tr>
    <tr>
      <td data-th="Problem">쓸모없는 스크립트가 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">가비지 수집이 어디서든 발생할 수 있습니다.</td>
      <td data-th="Solution">쓸모없는 스크립트를 덜 작성합니다(<a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Paul Lewis의 런타임 성능 검사 목록 중 애니메이션에서 가비지 수집</a> 참조).</td>
    </tr>
  </tbody>
</table>

## 스타일 

스타일 변경은 비용이 많이 듭니다. 특히 DOM에서 한 개 이상의 요소에
영향을 미치는 변경이라면 더욱 그렇습니다. 요소에 스타일을 적용할 때면 언제든, 브라우저는 관련 요소 모두에 미치는 
영향을 알아내고 레이아웃을 재계산하여 
다시 페인팅해야 합니다.

관련 가이드:

* [스타일 계산의 범위와 복잡성
줄이기](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

### 도구

**타임라인 **[기록][recording]을 만듭니다. 대형
**Recalculate Style**이벤트 기록을 확인합니다(보라색으로 표시됨).

**Recalculate Style** 이벤트를 클릭하면 이에 대한 자세한 정보를
**Details** 창에서 볼 수 있습니다. 스타일 변경에 시간이 오래 걸리는 경우, 성능에 
영향을 줍니다. 스타일 계산으로 다수의 요소에 영향이 미치는 경우 
이는 또 다른 개선의 여지가 있는 부분입니다.

![장기 스타일 재계산](imgs/recalculate-style.png)

**Recalculate Style** 이벤트의 영향을 줄이는 방법은 다음과 같습니다.

* [CSS 트리거](https://csstriggers.com)를 사용하여 
레이아웃, 페인트 및 복합(composite)을 트리거하는 CSS 속성이 무엇인지 알아봅니다. 이들 속성은 렌더링 성능에 최악의 영향을 
미칩니다.
* 영향력이 덜한 속성으로 전환하세요. 자세한 지침은 [컴포지터 전용 속성 고수 및
레이어 수 관리][컴포지터]를 참조하세요.

[컴포지터]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### 문제

다음 표는 몇 가지 보편적인 스타일 문제와 가능한 해결책에 대한
설명입니다.

<table>
  <thead>
      <th>문제</th>
      <th>예시</th>
      <th>해결 방법</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">고비용 스타일 재계산으로 인해 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">요소의 기하학적 형상, 예를 들어 너비, 높이 또는 위치 등을 변경시키는 모든 CSS 속성의 경우 브라우저가 다른 모든 요소를 확인하고 레이아웃을 다시 수행해야 합니다.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">레이아웃을 트리거하는 CSS를 피합니다.</a></td>
    </tr>
    <tr>
      <td data-th="Problem">복잡한 선택기가 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">중첩된 선택기가 브라우저가 다른 모든 요소에 대해 알도록 강요합니다. 여기에는 상위 및 하위 항목도 모두 포함됩니다.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">CSS에서 클래스만 있는 요소를 참조합니다.</a></td>
    </tr>
  </tbody>
</table>

관련 가이드:

* [스타일 계산의 범위와 복잡성
줄이기](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

## 레이아웃 

레이아웃(또는 Firefox의 경우 리플로우)은 브라우저가 페이지 내 모든 요소의 위치와 크기를 
계산하는 프로세스입니다. 웹의 레이아웃 모델이란 
한 가지 요소가 다른 요소에 영향을 미칠 수 있다는 의미입니다. 예를 들어 
`<body>` 요소의 너비는 일반적으로 그 하위 항목의 너비에 영향을 미치며, 이와 같은 방식으로 트리 위아래 전체에 
영향을 미치게 됩니다. 이 프로세스는 브라우저 관점에서 보면 상당히 손이 많이
갈 수 있습니다.

일반적인 기본 원칙으로, 프레임이 완료되기 전에 DOM으로부터 기하학적 값을 되돌려달라고 요청하면
'강제 동기식 레이아웃'이 발생하게 됩니다.
이 과정이 자주 반복되거나 대형 DOM 트리에 대해 수행되면
엄청난 성능 병목 현상을 초래할 수 있습니다. 

관련 가이드:

* [레이아웃 스래싱
피하기](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [강제 동기식 레이아웃
진단](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)


### 도구

Chrome DevTools의 **Timeline**은 페이지가 강제
동기식 레이아웃을 유발하는 시점을 파악합니다. 이러한 **Layout** 이벤트는 빨간색 막대로 표시됩니다. 

![강제 동기식 레이아웃](imgs/forced-synchronous-layout.png)

'레이아웃 스래싱'은 강제 동기식 레이아웃 조건의 반복입니다.
이는 자바스크립트가 DOM에서 읽고 쓰기를 반복할 때 발생하는데, 이렇게 되면 
브라우저가 레이아웃을 몇 번이고 되풀이해서 재계산해야 하기 때문입니다. 레이아웃 스래싱을 
알아보는 방법은 여러 개의 강제 동기식 레이아웃 
경고가 발생한 패턴을 찾아보는 것입니다(위의 스크린샷에서처럼).

### 문제

다음 표에서는 보편적인 레이아웃 문제와 가능한 해결책을
설명합니다.

<table>
  <thead>
      <th>문제</th>
      <th>예시</th>
      <th>해결 방법</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">강제 동기식 레이아웃이 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">브라우저가 픽셀 파이프라인 초기에 레이아웃을 수행하도록 강제하여 렌더링 프로세스에서 단계를 반복하는 결과를 초래합니다.</td>
      <td data-th="Solution">스타일 읽기부터 일괄 처리한 다음, 모든 쓰기 작업을 수행합니다(<a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">크고 복잡한 레이아웃 및 레이아웃 스래싱 피하기</a> 참조).</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">레이아웃 스래싱이 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">브라우저를 읽기-쓰기-읽기-쓰기 주기로 만드는 루프로, 브라우저가 레이아웃 재계산을 몇 번이고 되풀이하도록 강요합니다.</td>
      <td data-th="Solution"><a href="https://github.com/wilsonpage/fastdom">FastDom 라이브러리</a>를 사용하여 읽기-쓰기 작업을 자동으로 일괄 처리합니다.</td>
    </tr>
  </tbody>
</table>

## 페인트 및 합성 

페인트는 픽셀을 채우는 프로세스입니다. 이는 렌더링 프로세스에서 가장 
비용이 많이 드는 부분인 경우가 많습니다. 페이지에 어떤 식으로든 버벅거림이 많다는 느낌이 든다면,
페인트 문제일 가능성이 높습니다.

합성(compositing)은 화면에 표시하기 위해 페이지에서 페인트된 부분을
합치는 과정입니다. 대부분의 경우, 컴포지터 전용 
속성만 고수하고 페인트를 아예 회피하면 성능이 대폭 개선되지만, 
레이어 수가 과도하지 않은지 주의해야 합니다(
[컴포지터 전용 속성 고수 및 레이어 수 관리](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count) 참조).

### 도구

장기 페인팅에 걸리는 시간이나 페인팅 발생 빈도를 알아봅시다. **Timeline** 패널의 
[Paint profiler][paint]를 활성화한 다음 [기록을 
만듭니다][recording]. 렌더링 시간의 대부분을 페인팅에 소비한다면, 페인트 문제가
있는 것입니다. 

![타임라인 기록의 긴 페인트 시간](imgs/long-paint.png)

추가 구성에 쓰이는 [**rendering settings**][rendering settings] 메뉴를 확인하면
페인트 문제를 진단하는 데 도움이 됩니다. 

### 문제

다음 표에서는 몇 가지 보편적인 페인트 및 합성 문제와 가능한 해결책을 설명합니다.

<table>
  <thead>
      <th>문제</th>
      <th>예시</th>
      <th>해결 방법</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">페인트 스톰이 응답 또는 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">페인트 면적이 크거나 부담이 큰 페인트 때문에 응답 또는 애니메이션에 영향이 미칩니다.</td>
      <td data-th="Solution">페인트를 피하고, 자체 레이어로 이동하는 요소를 승격하고, 변형과 투명도를 이용합니다(<a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">페인트 복잡성 단순화 및 페인트 면적 줄이기</a> 참조).</td>
    </tr>
        <tr>
      <td data-th="Problem">레이어 폭증이 애니메이션에 영향을 미칩니다.</td>
      <td data-th="Example">너무 많은 translateZ(0)가 있는 요소를 과도하게 승격하면 애니메이션 성능에 엄청난 영향을 미칩니다.
</td>
      <td data-th="Solution">레이어로 승격을 드물게 하고, 현실적인 개선을 확신하는 경우에만 승격합니다(<a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">컴포지터 전용 속성 고수 및 레이어 수 관리</a> 참조).</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
