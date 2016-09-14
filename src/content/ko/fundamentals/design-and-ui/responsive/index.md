project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# 반응형 웹 디자인 기본 {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}


Translated By: 

{% include "web/_shared/contributors/captainpangyo.html" %}



웹 서핑을 위한 모바일 기기의 사용은 천문학 적인 속도로 증가하고 있지만, 안타깝게도 많은 웹 사이트들이 모바일 기기를 위한 최적화가 되어 있지 않다. 모바일 기기들은 보통 화면 크기에 제약이 있고, 화면에 어떤식으로 내용들을 나타낼지에 대한 접근방식이 다르다.

패블릿, 태블릿, 데스크탑, 게임콘솔, 티비, 웨어러블 기기 등등 정말 다양한 화면 크기가 있습니다. 화면 크기는 언제나 변하기 때문에 당신의 사이트는 어떤 화면 크기에도 언제나 적응 가능하도록 설계되어야 합니다.

{% comment %}
{% link_sample _code/weather.html %}
  <video autoplay loop controls class="responsiveVideo">
    <source src="videos/resize.webm" type="video/webm">
    <source src="videos/resize.mp4" type="video/mp4">
  </video>
{% endlink_sample %}
{% endcomment %}

원래 [Ethan Marcotte in A List
Apart](http://alistapart.com/article/responsive-web-design/) 에 정의된 반응형 웹 디자인은 그들이 사용하는 기기와 사용자의 니즈에 맞춰졌습니다. 레이아웃은 기기의 특징과 크기에 따라 변합니다. 예를 들어, 핸드폰에서 사용자들이 컨텐츠를 1줄 뷰로 본다면, 태블릿에서는 2줄 뷰로 컨텐츠를 보는 것처럼 말이죠.


## viewport 세팅하기

다양한 기기들에 최적화 된 페이지는 다큐멘트 헤더에 meta viewport 요소를 포함하고 있어야 합니다. meta viewport 태그는 어떻게 브라우저가 페이지 스케일링과 크기를 제어할 수 있도록 가이드 합니다.

### TL;DR {: .hide-from-toc }
- meta viewport 태그를 사용하여 브라우저 뷰포트의 너비와 스케일링을 조절합니다.
- <code>width=device-width</code> 를 이용하여 기기 너비에 맞춰 화면의 크기를 맞춥니다.
- '<code>initial-scale=1</code> 를 이용하여 CSS 픽셀과 기기 종속적인 픽셀 간의 1:1 관계를 형성합니다.'
- 당신의 페이지는 사용자가 크기를 조정할 수 있도록 해야합니다.


사용자에게 더 나은 경험을 제공하기 위해서, 모바일 브라우저는 (대개 980px 정도, 기기 따라 다양함) 데스크탑 화면 너비로 페이지를 표시할 것입니다. 그리고 폰트 크기를 늘리고 화면에 맞게 컨텐츠를 조정함으로써 페이지 내용을 보기 좋게 합니다. 사용자들에게는 이것이 폰트 크기가 일정하지 않거나 컨텐츠를 보기 위해서 더블 터치 또는 줌인을 해야하는 것을 의미합니다.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


meta viewport의 `width=device-width` 값은 페이지가 특정 기기 크기에 맞춰 화면의 너비를 조정하게 합니다. 이것은 또한 페이지가 작은 모바일 폰이든 큰 데스크탑 모니터든 화면 크기에 따라 컨텐츠를 다시 그릴 수 있게 합니다.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page without a viewport set">
      See example
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page with a viewport set">
      See example
    {% endlink_sample %}
  </div>
</div>

몇몇 브라우저는 landscape 모드로 전환할 때 페이지 너비를 일정하게 하고, 화면 크기를 맞추기 위해 다시 그리기 보다 줌을 합니다. `initial-scale=1` 속성은 브라우저가 CSS 픽셀과 기기 오리엔테이션과 관계 없는 특정 기기 사이즈와의 1:1 관계를 맺게합니다. 또한, 페이지가 landscape 시에도 꽉찬 화면을 사용할 수 있도록 합니다.

<!-- TODO: Verify note type! -->
Note: 콤마를 사용하여 attributes를 분리하고, 오래된 브라우저들이 적절하게 그 attributes를 파싱할 수 있도록 하세요.

### 접근 가능한 viewport 설정

`initial-scale` 설정과 함께, 아래 속성들을 viewport에서 설정할 수 있습니다:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

위에 속성들이 설정되면, 사용자가 viewport를 줌하지 못하고 접근성에 있어 문제를 야기할 수 있습니다.


## viewport에 맞게 콘텐츠 크기 조정하기 

사용자들은 데스크탑과 모바일 기기에서 수평이 아닌 수직으로 스크롤링 하는 것에 익숙합니다. 그렇기 때문에 사용자들을 수평으로 스크롤하게 하거나 전체 페이지 결과를 보기 위해 줌을 강제하는 것은 조악한 사용자 경험을 야기합니다.

## TL;DR {: .hide-from-toc }
- 큰 사이즈로 고정되어 있는 너비 요소를 사용하지 마세요.
- 컨텐츠는 특정 viewport 너비에서만 잘 그려지면 안됩니다.
- CSS media queries 를 이용하여 작거나 큰 화면에 각기 다른 스타일링을 적용해보세요.


`meta viewport` 를 이용하여 모바일 사이트를 개발할 때, 지정된 viewport에 맞지 않는 페이지 컨텐츠를 우발적으로 생성하기 쉽습니다. 예를 들어, 설정한 viewport 보다 너비를 넓게 설정한 이미지는 스크롤을 수평으로 해야 하는 경우가 발생합니다. 이 컨텐츠를 설정한 viewport의 너비안에 들어오게 조절하여야 사용자들이 수평으로 스크롤 할 필요가 없습니다.

화면 크기와 너비의 CSS 픽셀은 기기에 따라 정말 다양하기 때문에 (심지어, 폰과 태블릿 그리고 서로 다른 폰들 간에), 컨텐츠는 특정 viewport 너비에 잘 그려지게 설계되서는 안됩니다.

페이지 요소에 절대값이 큰 CSS 너비를 설정하면 폭이 좁은 기기에서 `div` 가 너무 넓게 나타날 수 있습니다. (예를 들어, iPhone 같이 320 CSS pixels 너비의 기기). 대신, 너비에 `width: 100%` 와 같은 상대적 값을 사용해보세요. 비슷하게, 위치 값에 큰 절대 값을 사용하면 작은 화면에서 그 요소가 나타나지 않을 수 있습니다.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page with a 344px fixed width element on an iPhone.">
      See example
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page with a 344px fixed width element on a Nexus 5.">
      See example
    {% endlink_sample %}
  </div>
</div>


## 반응형 디자인을 위한 CSS 미디어쿼리 사용하기 

미디어 쿼리는 CSS 스타일에 적용될 수 있는 간단한 필터입니다. 이 필터는 기기의 특성에 맞춰 컨텐츠를 그릴 수 있고, 디스플레이 타입, 너비, 높이, 오리엔테이션, 해상도 등의 스타일을 손쉽게 변경할 수 있습니다.


### TL;DR {: .hide-from-toc }
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

### viewport 크기에 맞춰 미디어쿼리 적용하기

미디어쿼리는 작거나 큰 화면에 맞춰 스타일을 적용하는 반응형 경험을 제공합니다. 미디어쿼리 구문은 기기 특성에 따라 규칙을 생성할 수 있게 합니다.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

쿼리에 적용할 수 있는 속성들이 여러가지가 있지만, 그 중에서도 `min-width`, `max-width`, `min-height`, `max-height` 가 가장 흔하게 사용됩니다.


<table>
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
{% includecode content_path="web/fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* 브라우저가 <b>0px</b> 와 <b>640px</b> 사이 너비일 때, `max-640px.css`가 적용됩니다.
* 브라우저가 <b>500px</b> 와 <b>600px</b> 사이 너비일 때, styles 안에 있는 `@media` 가 적용됩니다.
* 브라우저가 <b>640px 이거나 더 넓으면</b>, `min-640px.css` 가 적용됩니다.
* 브라우저가 <b>너비가 높이보다 크면</b>, `landscape.css` 가 적용됩니다.
* 브라우저가 <b>높이가 너비보다 크면</b>, `portrait.css` 가 적용됩니다.


### `min-device-width` 에 대해 알아둘 점

`*-device-width` 에 맞춰 쿼리를 생성하는 것도 가능하지만 매우 추천되지 않는 방법입니다.

차이점은 미묘하지만 중요한 점: `min-device-width`가 스크린 크기에 기준하는 반면에 `min-width` 는 브라우저 윈도우 크기에 기준합니다. 아쉽게도 레거시 안드로이드 브라우저를 포함한 몇몇 브라우저는 기기 너비를 적절하게 알려주지 못하고 예상되는 viewport 너비 대신에 기기 픽셀에 맞춘 화면 크기를 알려줍니다.

또한, `*-device-width` 사용은 컨텐츠가 윈도우 리사이징이 가능한 데스크탑이나 다른 기기들에 맞춰 변경되는 것을 막습니다. 왜냐하면 쿼리는 브라우저 윈도우 크기에 기준하는 것이 아니라 실질기기 크기에 기준하기 때문입니다.

### 유연한 인터렉션을 위해 `any-pointer` 와 `any-hover` 사용하기

크롬 39 버전부터, 스타일시트는 여러개의 포인터 타입과 호버 행동을 커버할 수 있는 선택자를 쓸 수 있습니다. `any-pointer` 와 `any-hover`의 특징은 사용자 포인터를 쿼리할 수 있도록 한다는 점에서 `pointer` 그리고 `hover` 와 유사합니다. `any-pointer` 와 `any-hover` 단지 몇개의 주요 포인터 기기에서 동작하는 것이 아니라 거의 모든 포인터 기기에서 작동합니다.

### 상대적 단위 사용하기

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

## How to choose breakpoints 

While it may be helpful to think about defining breakpoints based on device
classes, use caution.  Defining breakpoints based on specific devices,
products,brand names, or operating systems that are in use today can result
in a maintenance nightmare. Instead, the content itself should determine how
the layout adjusts to its container.


### TL;DR {: .hide-from-toc }
- 'Create breakpoints based on content, never on specific devices, products, or brands.'
- 'Design for the smallest mobile device first, then progressively enhance the experience as more screen real estate becomes available.'
- Keep lines of text to a maximum of around 70 or 80 characters.


### Pick major breakpoints by starting small, then working up

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/responsive/weather-1.html">
      Preview of the weather forecast displayed on a small screen.
    </a>
  </figcaption>
</figure>

Design the content to fit on a small screen size first, then expand the screen
until a breakpoint becomes necessary.  This allows you to optimize
breakpoints based on content and maintain the fewest number of breakpoints
possible.

Let's work through the example we saw at the beginning,
the weather forecast. The first step is to make the forecast look good on a
small screen.

<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="Preview of the weather forecast as the page gets wider.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/responsive/weather-1.html">
      Preview of the weather forecast as the page gets wider.
    </a>
  </figcaption>
</figure>

Next, resize the browser until there is too much white space between the
elements and the forecast simply doesn't look as good.  The decision is somewhat
subjective, but above 600px is certainly too wide.

<div style="clear:both;"></div>

To insert a breakpoint at 600px, create two new stylesheets, one to use when the
browser is 600px and below, and one for when it is wider than 600px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/responsive/weather-2.html">
      Preview of the weather forecast designed for a wider screen.
    </a>
  </figcaption>
</figure>

Finally, refactor the CSS.  In this example, we've placed the common styles such
as fonts, icons, basic positioning, colors in `weather.css`.  Specific layouts
for the small screen are then placed in `weather-small.css` and large screen
styles are placed in `weather-large.css`.

<div style="clear:both"></div>


### Pick minor breakpoints when necessary

In addition to choosing major breakpoints when layout changes significantly, it
is also helpful to adjust for minor changes.  For example between major
breakpoints, it may be helpful to adjust the margins or padding on an element,
or increase the font size to make it feel more natural in the layout.

Let's start by optimizing the small screen layout.  In this case, let's boost
the font when the viewport width is greater than 360px.  Second, when there is
enough space, we can separate the high and low temperature so they're on the
same line, instead of on top of each other.  And let's also make the weather
icons a bit larger.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"  adjust_indentation="auto"  adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
    <figcaption>
      Before adding minor breakpoints.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
    <figcaption>
      After adding minor breakpoints.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


Similarly, for the large screens, it's best to limit to maximum width of the
forecast panel so it doesn't consume the whole screen width.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-large.css" region_tag="mqsmallbplg"  adjust_indentation="auto"  adjust_indentation="auto" %}
</pre>

### Optimize text for reading

Classic readability theory suggests that an ideal column should contain 70 to 80
characters per line (about  8 to 10 words in English). Thus each time the width
of a text block grows past about 10 words, a breakpoint should be considered.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="Before adding minor breakpoints.">
    <figcaption>Before adding minor breakpoints.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="After adding minor breakpoints.">
    <figcaption>After adding minor breakpoints.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Let's take a deeper look at the above blog post example.  On smaller screens,
the Roboto font at 1em works perfectly giving 10 words per line, but larger
screens will require a breakpoint. In this case, if the browser width is greater
than 575px, the ideal content width is 550px.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/reading.html" region_tag="mqreading"  adjust_indentation="auto"  adjust_indentation="auto" %}
</pre>

### Never completely hide content

Be careful when choosing what content to hide or show depending on screen size.
Don't simply hide content just because you can't fit it on screen.  Screen size
is not a definitive indication of what a user may want.  For example,
eliminating the pollen count from the weather forecast could be a serious issue
for spring time allergy sufferers who need the information to determine if they
can go outside or not.

