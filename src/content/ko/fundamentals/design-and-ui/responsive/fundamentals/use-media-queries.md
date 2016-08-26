project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자.

{# wf_review_required #}
{# wf_updated_on: 2014-10-09 #}
{# wf_published_on: 2000-01-01 #}

# 반응형 디자인을 위한 CSS 미디어쿼리 사용하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



미디어 쿼리는 CSS 스타일에 적용될 수 있는 간단한 필터입니다. 이 필터는 기기의 특성에 맞춰 컨텐츠를 그릴 수 있고, 디스플레이 타입, 너비, 높이, 오리엔테이션, 해상도 등의 스타일을 손쉽게 변경할 수 있습니다.


## TL;DR {: .hide-from-toc }
- media query는 기기 특성에 따른 스타일을 적용할 수 있습니다.
- <code>min-device-width</code> 보다는 <code>min-width</code> 를 사용하여 사용성을 높입니다.
- 레이아웃이 깨지는 것을 방지하기 위해 각 요소에 상대적인 크기를 적용합니다.


예를 들어, 프린트 미디어 쿼리 안에 프린팅에 필요한 모든 스타일을 설정할 수 있습니다:


    <link rel="stylesheet" href="print.css" media="print">
    

stylesheet link 에 `media` 속성을 사용하는 방법과 함께, 내장된 CSS 파일에 미디어 쿼리를 적용하는 방법으로 `@media` 와 `@import` 가 더 있습니다.
성능상의 이유로, `@import` 를 제외한 위 두가지 방법을 추천합니다. (자세한 내용은 [Avoid CSS imports](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations.html))


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

미디어쿼리에 적용되는 로직은 상호배제 되지 않고 CSS block 을 야기하는 조건을 충족하는 필터는 CSS의 선행 룰에 맞춰 적용됩니다.

## viewport 크기에 맞춰 미디어쿼리 적용하기

미디어쿼리는 작거나 큰 화면에 맞춰 스타일을 적용하는 반응형 경험을 제공합니다. 미디어쿼리 구문은 기기 특성에 따라 규칙을 생성할 수 있게 합니다.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

쿼리에 적용할 수 있는 속성들이 여러가지가 있지만, 그 중에서도 `min-width`, `max-width`, `min-height`, `max-height` 가 가장 흔하게 사용됩니다.


<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="attribute">attribute</th>
      <th data-th="Result">Result</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">Rules applied for any browser width over the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">Rules applied for any browser width below the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">Rules applied for any browser height over the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">Rules applied for any browser height below the value defined in the query.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">Rules applied for any browser where the height is greater than or equal to the width.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">Rules for any browser where the width is greater than the height.</td>
    </tr>
  </tbody>
</table>

아래 예제를 봅시다:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Preview of a page using media queries to change properties as it is resized.">
  {% endlink_sample %}
</figure>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* 브라우저가 <b>0px</b> 와 <b>640px</b> 사이 너비일 때, `max-640px.css`가 적용됩니다.
* 브라우저가 <b>500px</b> 와 <b>600px</b> 사이 너비일 때, styles 안에 있는 `@media` 가 적용됩니다.
* 브라우저가 <b>640px 이거나 더 넓으면</b>, `min-640px.css` 가 적용됩니다.
* 브라우저가 <b>너비가 높이보다 크면</b>, `landscape.css` 가 적용됩니다.
* 브라우저가 <b>높이가 너비보다 크면</b>, `portrait.css` 가 적용됩니다.


## `min-device-width` 에 대해 알아둘 점

`*-device-width` 에 맞춰 쿼리를 생성하는 것도 가능하지만 매우 추천되지 않는 방법입니다.

차이점은 미묘하지만 중요한 점: `min-device-width`가 스크린 크기에 기준하는 반면에 `min-width` 는 브라우저 윈도우 크기에 기준합니다. 아쉽게도 레거시 안드로이드 브라우저를 포함한 몇몇 브라우저는 기기 너비를 적절하게 알려주지 못하고 예상되는 viewport 너비 대신에 기기 픽셀에 맞춘 화면 크기를 알려줍니다.

또한, `*-device-width` 사용은 컨텐츠가 윈도우 리사이징이 가능한 데스크탑이나 다른 기기들에 맞춰 변경되는 것을 막습니다. 왜냐하면 쿼리는 브라우저 윈도우 크기에 기준하는 것이 아니라 실질기기 크기에 기준하기 때문입니다.

## 유연한 인터렉션을 위해 `any-pointer` 와 `any-hover` 사용하기

크롬 39 버전부터, 스타일시트는 여러개의 포인터 타입과 호버 행동을 커버할 수 있는 선택자를 쓸 수 있습니다. `any-pointer` 와 `any-hover`의 특징은 사용자 포인터를 쿼리할 수 있도록 한다는 점에서 `pointer` 그리고 `hover` 와 유사합니다. `any-pointer` 와 `any-hover` 단지 몇개의 주요 포인터 기기에서 동작하는 것이 아니라 거의 모든 포인터 기기에서 작동합니다.

## 상대적 단위 사용하기

반응형 디자인의 중요한 컨셉은 고정된 너비 레이아웃에 반해 가변하고 비례할 수 있다는 점입니다. 상대적 단위를 사용하면 레이아웃을 쉽게 설계할 수 있고 viewport에 비해 컴포넌트를 너무 크게 만드는 실수도 줄일 수 있습니다.

예를 들어, 가장 상위의 div 너비를 100%로 지정하면 viewport의 너비보다 너무 작거나 너무 크게 되지 않습니다. 320px의 iPhone이든, 342px의 Blackberry Z10이든, 360px Nexus 5 이든 div 길이가 맞춰질테니까요.

또한, 상대적 단위를 사용하면 브라우저가 페이지를 수평으로 스크롤 할 필요 없이 사용자의 줌 레벨에 맞춰 컨텐츠가 그려질 것입니다.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <h2>YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
  <div class="mdl-cell mdl-cell--6-col">
    <h2>NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>
</div>
