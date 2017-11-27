project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 기본적으로, CSS는 렌더링 차단 리소스로 취급됩니다. CSS가 렌더링을 차단하지 않도록 방지하는 방법에 대해 알아보세요.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 렌더링 차단 CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

기본적으로, CSS는 렌더링 차단 리소스로 취급됩니다. 즉,
CSSOM이 생성될 때까지
브라우저는 처리되는 모든 콘텐츠를 렌더링하지 않습니다. CSS를 간단하게 유지하고 가능한 한 빨리 제공하고,
미디어 유형과 미디어 쿼리를 사용하여 렌더링의 차단을 해제해야 합니다.

[렌더링 트리 생성](render-tree-construction)에서 우리는 렌더링 트리를 생성하는 데 DOM 및 CSSOM이 둘다 필요하다는 점을 확인했습니다. 이것은 성능에 중요한 영향을 미칩니다. **HTML 및 CSS는 둘다 렌더링 차단 리소스입니다.** HTML의 경우 DOM이 없으면 렌더링할 것이 없기 때문에 명확하지만, CSS 요구사항은 다소 불명확할 수 있습니다. CSS에서 렌더링을 차단하지 않고 일반 페이지를 렌더링하려고 하면 어떠한 일이 벌어질까요?

### TL;DR {: .hide-from-toc }
- 기본적으로, CSS는 렌더링 차단 리소스로 취급됩니다.
- 미디어 유형과 미디어 쿼리를 통해 일부 CSS 리소스를 렌더링을 비차단 리소스로 표시할 수 있습니다.
- 브라우저는 차단 동작이든 비차단 동작이든 관계없이 모든 CSS 리소스를 다운로드합니다.


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="NYTimes(CSS 사용)">
    <figcaption>The New York Times(CSS 사용)</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes(CSS 미사용)">
    <figcaption>The New York Times(CSS 미사용)(FOUC)</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

위의 예에서는 CSS가 사용 가능해질 때까지 렌더링이 차단되는 이유를 설명하기 위해 CSS가 있는 NYTimes 웹사이트와 CSS가 없는 NYTimes 웹사이트를 보여줍니다.---CSS가 없는 페이지는 상대적으로 사용성이 떨어집니다. 오른쪽의 환경은 흔히 'Flash of Unstyled Content'(FOUC)로 불립니다. 브라우저는 DOM과 CSSOM을 모두 사용할 수 있게 될 때까지 렌더링을 차단합니다.

> **_CSS는 렌더링 차단 리소스입니다. 최초 렌더링에 걸리는 시간을 최적화하려면 클라이언트에 최대한 빠르게 다운로드되어야 합니다._**

하지만 특정한 조건, 예를 들어 페이지가 인쇄될 때나 대형 모니터에 출력하는 경우에만 사용되는 몇 가지 CSS 스타일이 있다면 어떻게 될까요? 이러한 리소스에서 렌더링을 차단할 필요가 없었다면 좋았을 것입니다.

CSS '미디어 유형'과 '미디어 쿼리'를 사용하면 이러한 사용 사례를 해결할 수 있습니다.


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[미디어 쿼리](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness)는 하나의 미디어 유형과 특정 미디어 기능의 조건을 확인하는 0개 이상의 식으로 구성됩니다. 예를 들어, 우리의 첫 번째 스타일시트 선언은 미디어 유형이나 미디어 쿼리를 제공하지 않으며, 따라서 모든 경우에 적용됩니다. 다시 말해서, 항상 렌더링을 차단합니다. 반면에, 두 번째 스타일시트 선언은 콘텐츠가 인쇄될 때만 적용됩니다.---아마도 여러분은 레이아웃을 다시 정렬하거나 글꼴을 변경하는 등의 기능을 원할 것입니다. 따라서 이 스타일시트 선언은 처음에 로드될 때 페이지 렌더링을 차단할 필요가 없습니다. 마지막으로, 마지막 스타일시트 선언은 브라우저가 실행하는 '미디어 쿼리'를 제공합니다. 조건이 일치하면 스타일시트가 다운로드되고 처리될 때까지 브라우저가 렌더링을 차단합니다.

미디어 쿼리를 사용하면 우리가 특정한 사용 사례(예: 표시 또는 인쇄)와 동적인 조건(예: 화면 방향 변경, 크기 조정 이벤트 등)에 맞게 프레젠테이션을 조정할 수 있습니다. **스타일시트 자산을 선언할 때 미디어 유형과 미디어 쿼리에 세심한 주의를 기울여야 합니다. 이러한 요소들은 주요 렌더링 경로의 성능에 큰 영향을 미칩니다.**

몇 가지 실습 예시를 살펴봅시다.


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* 첫 번째 선언은 렌더링을 차단하고 모든 조건에서 일치합니다.
* 두 번째 선언도 렌더링을 차단합니다. 'all'이 기본 유형이므로 특정 유형을 지정하지 않을 경우 암묵적으로 'all'로 설정됩니다. 따라서 첫 번째와 두 번째 선언은 사실상 똑같습니다.
* 세 번째 선언은 페이지가 로드될 때 평가되는 동적 미디어 쿼리를 가집니다. portrait.css의 렌더링 차단 여부는 페이지가 로드되는 중에 기기의 방향에 따라 달라질 수 있습니다.
* 마지막 선언은 페이지가 인쇄될 때만 적용됩니다. 따라서 페이지가 브라우저에서 처음 로드될 때는 렌더링이 차단되지 않습니다.

마지막으로, '렌더링 차단'은 브라우저가 해당 리소스에 대해 페이지의 초기 렌더링을 보류해야 하는지 여부만 나타냅니다. 어느 경우든지, 비차단 리소스의 우선순위가 낮더라도 브라우저가 여전히 CSS 자산을 다운로드합니다.

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>다음 차례: 자바스크립트로 상호작용 추가</button>
</a>


{# wf_devsite_translation #}
