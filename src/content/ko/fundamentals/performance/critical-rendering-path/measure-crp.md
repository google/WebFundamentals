project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 크리티컹 렌더링 패스를 측정하는 방법을 배워봅시다

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 네비게이션 타이밍으로 크리티컬 렌더링 패스 측정하기 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


여러분은 측정할 수 없는 것을 최적화 할 수는 없습니다. 고맙게도, 네비게이션 타이밍 API는
크리티컬 렌더링 패스의 각 단계 측정에 필요한 모든 툴들을 제공합니다.

### TL;DR {: .hide-from-toc }
- 네비게이션 타이밍 API는 크리티컬 렌더링 패스를 측정하기 위한 높은 정밀도의 타임스탬프를 제공합니다.
- 브라우저는 크리티컬 렌더링 패스의 다양한 스테이지를 나타내는 단발성 이벤트들을 발생시킵니다.


모든 단단한 성능 전략의 핵심은 훌륭한 측정과 도구입니다. 네비게이션 타이밍 API가 바로 그것입니다.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

위에 있는 다이어그램의 각 라벨은 브라우저가 모든 페이지를 로드하면서 추적한 높은 정밀도의 타임스탬프입니다. 사실, 이 특정한 경우는 타임스탬프의 모든 다른 부분을 보여주고 있습니다. 지금은 모든 네트워크와 관련된 타임스탬프는 생략하고, 이후의 강의에서 돌아오도록 하겠습니다.

그래서, 이 타임스탬프들이 의미하는게 무엇일까요?

* `domLoading`: 이것은 모든 프로세스의 첫번째 타임스탬프입니다. 브라우저는 수신된 HTML문서의 첫 바이트를 파싱하려고 합니다.
* `domInteractive`: 브라우저가 모든 HTML과 DOM 생성을 완료했을 때를 표시합니다.
* `domContentLoaded`: DOM이 준비되고 자바스크립트 실행을 블록하는 스타일 시트가 없을 때 표시됩니다 - 렌더 트리를 (잠재적으로) 생성할 수 있음을 의미합니다.
    * 많은 자바스크립트 프레임워크는 자체적인 로직을 실행하기 전에 이 이벤트를 기다립니다. 이러한 이유로 브라우저는 `EventStart` 와 `EventEnd` 타임스탬프를 캡쳐해서 실행이 얼마나 걸렸는 지를 추적할 수 있게 해줍니다.
* `domComplete`: 이름에서 알 수 있듯이, 모든 프로세싱이 끝나고 페이지의 모든 자원 (이미지, 기타) 다운로드가 끝났을 때 입니다. -
  i.e. 로딩 스피너가 스피너를 끝냈을 때 입니다.
* `loadEvent`: 각 페이지 로드의 마지막 단계로 브라우저가 `onload` 이벤트를 발생시켜 추가적인 어플리케이션 로직을 실행할 수 있게 합니다.

HTML 명세서는 각각의 모든 이벤트에 대해서 언제 발생되어야 하는 지, 어떤 조건이 충족되어야 하는 지 등의 상세한 조건을 지시합니다. 우리의 목적상, 크리티컬 렌더링 패스에 관련된 중요한 몇가지 마일스톤에 대해서 집중하겠습니다.

* `domInteractive` DOM이 준비 되었을 때 입니다.
* `domContentLoaded` [DOM과 CSSOM이 모두 준비되었을 때](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)만 표시 됩니다.
    * 파서를 블록하는 자바스크립트가 없을 때 `DOMContentLoaded`는 `domInteractive` 바로 다음에 발생합니다.
* `domComplete` 페이지와 그 페이지에 속한 모든 자원들이 준비 되었을 때 표시됩니다.

<div class="clearfix"></div>


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full" adjust_indentation="auto" %}
</pre>

위의 예제는 처음 보면 조금은 벅차보일 수 있지만, 사실은 매우 간단합니다. 네비게이션 타이밍 API는 모든 관련있는 타임스탬프를 캡쳐하고 우리의 코드는 `onload` 이벤트가 발생하기를 기다립니다. `onload` 이벤트는 `domInteractive`, `domContentLoaded` 그리고 `domComplete` 이벤트 후에 오는것을 상기하세요. 그리고 다양한 타임스탬프 사이의 차이점을 계산합니다.

<img src="images/device-navtiming-small.png" class="center" alt="NavTiming demo">

모든것이 말한대로 되었다면, 우리는 추적하기 위한 몇 가지 특정한 마일스톤과 그 결과를 출력하기 위한 간단한 함수가 생겼습니다. 페이지에 이러한 결과를 출력하는것 대신 여러분은 코드를 수정하여 분석 서버([Google Analytics does this automatically](https://support.google.com/analytics/answer/1205784))로 보낼 수 있습니다. 이것은 여러분들의 페이지 성능 색인을 유지하여 몇 가지 최적화 작업으로 이득을 얻을 페이지들을 선정하는 데 좋은 방법입니다.

Translated By: 
{% include "web/_shared/contributors/swengineer.html" %}
