---
title: "Use CSS media queries for responsiveness"
description: "Much of the web isn't optimized for those multi-device experiences. Learn the fundamentals to get your site working on mobile, desktop or anything else with a screen."
updated_on: 2014-10-10
translators:
  - captainpangyo
key-takeaways:
  set-viewport:
    - "meta viewport 태그를 사용하여 브라우저 뷰포트의 너비와 스케일링을 조절합니다."
    - "<code>width=device-width</code> 를 이용하여 기기 너비에 맞춰 화면의 크기를 맞춥니다."
    - "<code>initial-scale=1</code> 를 이용하여 CSS 픽셀과 기기 종속적인 픽셀 간의 1:1 관계를 형성합니다."
    - "당신의 페이지는 사용자가 크기를 조정할 수 있도록 해야합니다."
  size-content-to-vp:
    - "큰 사이즈로 고정되어 있는 너비 요소를 사용하지 마세요."
    - "컨텐츠는 특정 viewport 너비에서 잘 그려지면 안됩니다."
    - "CSS media queries 를 이용하여 작거나 큰 화면에 각기 다른 스타일링을 적용해보세요."
  media-queries:
    - "media query는 기기 특성에 따른 스타일을 적용할 수 있습니다."
    - "<code>min-device-width</code> 보다는 <code>min-width</code> 를 사용하여 사용성을 높입니다."
    - "레이아웃이 깨지는 것을 방지하기 위해 각 요소에 상대적인 크기를 적용합니다."
  choose-breakpoints:
    - "컨텐츠에 따라 브레이크포인트를 설정하고 특정 기기, 상품, 브랜드에 한정짓지 마세요."
    - "가장 작은 모바일 기기에 맞춰 디자인을 하고, 점진적으로 큰 화면들에 적용하여 사용성을 확장합니다."
    - "한 라인의 텍스트 수를 최대 70에서 80까지 유지하세요."
notes:
  use-commas:
    - "콤마를 사용하여 attributes를 분리하고, 오래된 브라우저들이 적절하게 그 attributes를 파싱할 수 있도록 하세요."
---

<p class="intro">
  미디어 쿼리는 CSS 스타일에 적용될 수 있는 간단한 필터입니다. 이 필터는 기기의 특성에 맞춰 컨텐츠를 그릴 수 있고, 디스플레이 타입, 너비, 높이, 오리엔테이션, 해상도 등의 스타일을 손쉽게 변경할 수 있습니다.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.media-queries %}

예를 들어, 프린트 미디어 쿼리 안에 프린팅에 필요한 모든 스타일을 설정할 수 있습니다:

{% highlight html %}
<link rel="stylesheet" href="print.css" media="print">
{% endhighlight %}

stylesheet link 에 `media` 속성을 사용하는 방법과 함께, 내장된 CSS 파일에 미디워 쿼리를 적용하는 두가지 방법이 더 있습니다: `@media` 와 `@import`
성능상의 이유로, `@import` 를 제외한 위 두가지 방법을 추천합니다. (자세한 내용은 [Avoid CSS imports](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations.html))

{% highlight css %}
@media print {
  /* print style sheets go here */
}

@import url(print.css) print;
{% endhighlight %}

미디어쿼리에 적용되는 로직은 상호배제 되지 않고 CSS block 을 야기하는 조건을 충족하는 필터는 CSS의 선행 룰에 맞춰 적용됩니다.

## viewport 크기에 맞춰 미디어쿼리 적용하기


Media queries enable us to create a responsive experience, where specific styles
are applied to small screens, large screens and anywhere in between.  The media
query syntax allows for the creation of rules that can be applied depending on
device characteristics.

{% highlight css %}
@media (query) {
  /* CSS Rules used when query matches */
}
{% endhighlight %}

While there are several different items we can query on, the ones used most
often for responsive web design are `min-width`, `max-width`, `min-height` and
`max-height`.


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

Let's take a look an example:

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="Preview of a page using media queries to change properties as it is resized.">
  {% endlink_sample %}
</figure>

{% include_code src=_code/media-queries.html snippet=mqueries %}

* When the browser is between <b>0px</b> and <b>640px</b> wide, `max-640px.css` will be applied.
* When the browser is between <b>500px</b> and <b>600px</b> wide, styles within the `@media` will be applied.
* When the browser is <b>640px or wider</b>, `min-640px.css` will be applied.
* When the browser <b>width is greater than the height</b>, `landscape.css` will be applied.
* When the browser <b>height is greater than the width</b>, `portrait.css` will be applied.


## A note on `min-device-width`

It is also possible to create queries based on
`*-device-width`; though this practice is **strongly discouraged**.

The difference is subtle but very important: `min-width` is based on the
size of the browser window, whereas `min-device-width` is based on
the size of the screen.  Unfortunately some browsers, including the legacy
Android browser may not report the device width properly and instead
report the screen size in device pixels instead of the expected viewport width.

In addition, using `*-device-width` can prevent content from adapting on
desktops or other devices that allow windows to be resized because the query
is based on the actual device size, not the size of the browser window.

## Use `any-pointer` and `any-hover` for flexible interactions

Starting with Chrome 39, your style sheets can write selectors that cover
multiple pointer types and hover behaviors. The `any-pointer` and `any-hover`
media features are similar to `pointer` and `hover` in allowing you to query the
capabilities of the user's pointer. Unlike the later, `any-pointer` and
`any-hover` operate on the union of all pointer devices rather than the just the
primary pointer device.

## Use relative units

A key concept behind responsive design is fluidity and proportionality as
opposed to fixed width layouts.  Using relative units for measurements can help
simplify layouts and prevent accidentally creating components that are too big
for the viewport.

For example, setting width: 100% on a top level div, ensures that it spans the
width of the viewport and is never too big or too small for the viewport.  The
div will fit, no matter if it's a 320px wide iPhone, 342px wide Blackberry Z10
or a 360px wide Nexus 5.

In addition, using relative units allows browsers to render the content based on
the users zoom level without the need for adding horizontal scroll bars to the
page.

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
