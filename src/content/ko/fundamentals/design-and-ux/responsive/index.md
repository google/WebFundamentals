project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 상당수의 웹은 다중 기기 환경에 최적화되어 있지 않습니다. 모바일, 데스크톱 또는 화면이 있는 모든 기기에서 작동하는 사이트를 만들기 위한 기본 사항에 대해 알아봅니다.

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# 반응형 웹 디자인 기본 사항 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

웹 서핑을 위한 휴대기기의 사용량이 엄청난 속도로 증가하고 있지만, 
불행히도 상당수의 웹은 휴대기기에 최적화되어 있지 않습니다.
휴대기기는 대개 화면 크기가 제한되며, 콘텐츠가 화면에 배치되는 
방식에 따라 다른 접근방식이 필요합니다.

휴대폰, '패블릿',
태블릿, 데스크톱, 게임 콘솔, TV, 웨어러블 등 다양한 화면 크기가 존재합니다.  화면 크기는 항상
변하기 마련이므로, 현재나 미래에 모든 화면 크기에 맞게 사이트를 만드는
것이 중요합니다.

<video autoplay muted loop controls>
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>

[A List
Apart에서 Ethan Marcotte](http://alistapart.com/article/responsive-web-design/)에 의해
처음 정의된 반응형 웹 디자인은 사용자와 그들이 사용하는 기기의 요구사항에 맞게 반응합니다.  레이아웃은 기기의 크기와 기능에
따라 변합니다.  예를 들어, 휴대폰에서는 콘텐츠가
단일 열 뷰로 표시될 수 있지만, 태블릿에서는 동일한 콘텐츠가
두 개의 열로 표시될 수 있습니다.

{% include "web/_shared/udacity/ud893.html" %}

## 뷰포트 설정 {: #set-the-viewport }

다양한 기기에 최적화된 페이지는 문서의 헤드에 meta viewport 태그를 포함해야 합니다.  meta viewport 태그는 페이지의 크기 및 배율을 제어하는 방법을 브라우저에 알려줍니다.

### TL;DR {: .hide-from-toc }
- meta viewport 태그를 사용하여 브라우저 뷰포트의 너비와 배율을 제어합니다.
- 기기 독립적 픽셀에서 화면 너비에 맞추려면 `width=device-width`를 포함합니다.
- 기기 독립적 픽셀과 CSS 픽셀 간에 1:1 관계를 설정하려면 `initial-scale=1`을 포함합니다.
- 사용자 배율 조정을 비활성화하지 않고도 여러분의 페이지에 액세스할 수 있도록 합니다.


최적의 환경을 제공하기 위해, 모바일 브라우저는 데스크톱
화면 너비(기기마다 다르지만 일반적으로 약 980px)에서 웹페이지를
렌더링한 다음, 글꼴 크기를 늘리고 콘텐츠의 배율을 조정하여
화면에 맞추는 방식으로 콘텐츠를 더 보기 좋게 만들려고 시도합니다.  이 경우 글꼴 크기가 사용자에게 일관되지 않게 나타날 수 있으며, 사용자가 콘텐츠를
보고 상호작용하기 위해 두 번 탭하거나 손가락으로 확대해야 할 수도 있습니다.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


meta viewport 값 `width=device-width`를 사용하면 기기 독립적 픽셀에서
화면 너비에 맞게 페이지를 맞춥니다. 이렇게 하면 렌더링되는 화면이 작은
휴대폰이든 큰 데스크톱 모니터에든 상관없이, 다양한
화면 크기에 맞게 페이지의 콘텐츠를 재배치할 수 있습니다.

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="뷰포트 세트가 없는 페이지">
    <figcaption>
      뷰포트 세트가 없는 페이지
     </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="뷰포트 세트가 있는 페이지">
    <figcaption>
      뷰포트 세트가 있는 페이지
     </figcaption>
  </figure>
  </a>
</div>

일부 브라우저에서는 가로 모드로 회전할 때 페이지 너비를
일정하게 유지하며, 재배치하기 보다 확대/축소를 통해 화면을 채웁니다. `initial-scale=1` 속성을
추가하면, 기기 방향에 상관없이 브라우저가 기기 독립적 픽셀과 CSS 픽셀
간에 1:1 관계를 설정하고, 페이지에서 전체 가로 너비를 활용할 수
있습니다.


참고: 구버전의 브라우저가 올바로 속성을 파싱할 수 있도록, 쉼표를 사용하여 해당 속성을 구분합니다.

### 액세스 가능한 뷰포트 보장

`initial-scale` 설정과 더불어 뷰포트에서 다음 속성을 설정할 수도 있습니다.

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

이들 속성이 설정된 경우, 사용자가 뷰포트를 확대/축소할 수 없으므로 접근성에 문제가 생길 수 있습니다.


## 뷰포트에 맞게 콘텐츠 크기 조정

데스크톱 및 휴대기기에서 사용자는 가로가 아닌 세로로 웹사이트를 스크롤하는 데 익숙하며, 전체 페이지를 확인하기 위해 가로 스크롤이나 축소를 강제로 수행해야 한다면 사용자 환경이 나빠질 것입니다.

### TL;DR {: .hide-from-toc }
- 너비가 고정된 큰 요소를 사용하지 마세요.
- 잘 렌더링되기 위해서는 콘텐츠가 특정 뷰포트 너비에 종속되어서는 안 됩니다.
- 큰 화면과 작은 화면에 다른 스타일을 적용하려면 CSS 미디어 쿼리를 사용합니다.

`meta viewport` 태그로 모바일 사이트를 개발하는 경우에는,
지정된 뷰포트 내에 잘 맞지 않는 페이지 콘텐츠가 실수로 생성되기
쉽습니다. 예를 들어, 뷰포트보다 넓은 너비로 표시되는 이미지의 경우 뷰포트를
가로로 스크롤해야 할 수도 있습니다. 사용자가 가로로
스크롤할 필요가 없도록, 여러분이 뷰포트 너비 내에 맞도록 콘텐츠를
조정해야 합니다.

CSS 픽셀에서 화면 크기와 너비는 기기마다 크게 다르므로(예:
휴대폰과 태블릿 간, 심지어 다른 휴대폰 간), 잘 렌더링되기 위해서는
콘텐츠가 특정 뷰포트 너비에 종속되어서는 안 됩니다.

큰 절대 CSS 너비를 페이지 요소에 설정하면(아래 예시 참조),
좁은 기기(iPhone과 같이 너비가 320 CSS 픽셀인 기기)의 뷰포트에서 `div`가
너무 넓어집니다. 그 대신, `width: 100%`와 같은
상대 너비 값을 사용해 보세요.  마찬가지로, 작은 화면에서
요소가 뷰포트를 벗어날 수가 있으므로, 큰 절대 배치 값을 사용할 때
주의를 기울이세요.  

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x" alt="iPhone에서 344px 고정 너비 요소가 있는 페이지.">
    <figcaption>
      iPhone에서 344px 고정 너비 요소가 있는 페이지
    </figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x" alt="Nexus 5에서 344px 고정 너비 요소가 있는 페이지.">
    <figcaption>
      Nexus 5에서 344px 고정 너비 요소가 있는 페이지
    </figcaption>
  </figure>
  </a>
</div>
<div class="clearfix"></div>
         
## 응답성을 개선하기 위해 CSS 미디어 쿼리 사용 {: #css-media-queries }  

미디어 쿼리는 CSS 스타일에 적용될 수 있는 간단한 필터입니다. 이 필터를 사용하면,
콘텐츠를 렌더링하는 기기 특성(예: 표시 유형, 너비, 높이,
방향, 해상도 등을 포함)에 따라
쉽게 스타일을 변경할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 기기 특성을 기반으로 스타일을 적용하려면 미디어 쿼리를 사용합니다.
- `min-device-width`보다 `min-width`를 사용하여 가장 넓은 환경을 보장합니다.
- 레이아웃이 깨지는 것을 막으려면 요소에 상대 크기를 사용합니다.

예를 들어, 인쇄에 필요한 모든 스타일을 인쇄 미디어 쿼리 내에
배치할 수 있습니다.


    <link rel="stylesheet" href="print.css" media="print">
    

`media` 속성을 스타일시트 링크에 사용할 뿐만 아니라, CSS 파일에서
삽입 가능한 미디어 쿼리를 적용하기 위한 두 가지 다른 방법이
있습니다. 즉, `@media` 및 `@import`입니다.  성능상의 이유로, 처음 두 메서드 중 하나가 `@import` 구문에 비해
권장됩니다([CSS 가져오기 피하기](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)
참조).


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

미디어 쿼리에 적용되는 로직은 상호 배타적이 아니며,
해당 기준을 충족하는 모든 필터는 CSS에서 표준 우선순위 규칙을
사용하여 최종 CSS 블록이 적용됩니다.

### 뷰포트 크기에 따라 미디어 쿼리 적용

미디어 쿼리를 사용하면 반응형 환경을 만들 수 있습니다.
이 환경에서는 작은 화면과 큰 화면 및 그 사이의 모든 화면 크기에 특정 스타일이 적용됩니다.  미디어
쿼리 구문에서는 기기 특성에 따라 적용될 수 있는 규칙 생성을
허용합니다.


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

쿼리할 수 있는 항목에는 여러 가지가 있지만,
반응형 웹 디자인에 가장 자주 사용되는 항목은 `min-width`, `max-width`, `min-height` 및
`max-height`입니다.


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">매개변수</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">쿼리에 정의된 값보다 큰 브라우저 너비에 적용되는 규칙.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">쿼리에 정의된 값보다 작은 브라우저 너비에 적용되는 규칙.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">쿼리에 정의된 값보다 큰 브라우저 높이에 적용되는 규칙.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">쿼리에 정의된 값보다 작은 브라우저 높이에 적용되는 규칙.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">높이가 너비보다 크거나 같은 브라우저에 적용되는 규칙.</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">너비가 높이보다 큰 브라우저에 적용되는 규칙.</td>
    </tr>
  </tbody>
</table>

예시를 살펴봅시다.

<figure>
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html">
    <img src="imgs/mq.png" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="페이지의 크기가 조정될 때, 속성 변경을 위해 미디어 쿼리를 사용하는 페이지의 미리보기">
    <figcaption>
      페이지의 크기가 조정될 때, 속성 변경을 위해 미디어 쿼리를 사용하는 페이지의 미리보기
    </figcaption>
  </a>
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html){: target="_blank" .external }

* 브라우저 너비가 <b>0px</b> - <b>640px</b> 사이인 경우, `max-640px.css`가 적용됩니다.
* 브라우저 너비가 <b>500px</b> - <b>600px</b> 사이인 경우, `@media` 내의 스타일이 적용됩니다.
* 브라우저 너비가 <b>640px 이상인 경우</b>, `min-640px.css`가 적용됩니다.
* 브라우저 <b>너비가 높이보다 큰 경우</b>, `landscape.css`가 적용됩니다.
* 브라우저 <b>높이가 너비보다 큰 경우</b>, `portrait.css`가 적용됩니다.


### `min-device-width` 참고 사항

`min-device-width`에 따라 쿼리를 생성할 수도 있지만,
이 방법은 **그다지 권장되지 않습니다**.

그 차이점은 미세하지만 매우 중요합니다. `min-width`는
브라우저 창 크기를 기반으로 하는 반면, `min-device-width`는 화면 크기를
기반으로 합니다.  불행히도, 레거시 Android 브라우저를 비롯한
일부 브라우저는 기기 너비를 제대로 보고하지 못하며, 예상 뷰포트 너비가 아니라 기기 픽셀 단위로 화면 크기를 보고합니다.

또한 `min-device-width`를 사용할 경우에는, 창 크기 조정을 허용하는
데스크톱 또는 기타 기기에서 콘텐츠를 조정할 수 없습니다.
왜냐하면 해당 쿼리는 브라우저 창 크기가 아닌 실제 기기 크기를 기반으로 하기 때문입니다.

### 유연한 상호작용을 위해 `any-pointer` 및 `any-hover` 사용

Chrome 39부터는, 여러분의 스타일 시트에서 다양한 포인터 유형과 마우스 오버 동작을 포함하는
선택기를 작성할 수 있습니다. 사용자 포인터의 성능을
쿼리할 수 있다는 점에서, `any-pointer` 및 `any-hover`
미디어 기능은 `pointer` 및 `hover`와 유사합니다. 하지만 후자와는 달리, `any-pointer` 및
`any-hover`는 기본 포인터 기기에서만 아니라
모든 포인터 기기 조합에서 작동합니다.

### 상대 단위 사용

반응형 디자인의 핵심 개념은 고정 너비 레이아웃과 반대되는
유동성 및 비례성입니다.  측정 시에 상대 단위를 사용하면
레이아웃이 간단해지며, 뷰포트에 비해 너무 큰 구성요소가
실수로 만들어지는 것을 막아줍니다.

예를 들어, 최상위 `div`에서 너비를 100%로 설정할 경우, 뷰포트의
너비가 뷰포트에 비해 너무 크거나 너무 작지 않도록 조정됩니다.  320px 너비의
iPhone, 342px 너비의 Blackberry Z10
또는 360px 너비의 Nexus 5에 상관없이 `div`가 맞춰집니다.

또한 상대 단위를 사용하면 브라우저가 사용자 확대/축소 수준에 따라
콘텐츠를 렌더링할 수 있으며, 가로 스크롤 막대를 페이지에
추가할 필요가 없습니다.

<span class="compare-worse">권장되지 않음</span>&mdash;고정 너비

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">권장됨</span>&mdash;반응형 너비

    div.fullWidth {
      width: 100%;
    }


## 중단점을 선택하는 방법 

기기 클래스를 기준으로 중단점을 정의하지 마세요. 오늘날 사용 중인 특정 기기,
제품, 브랜드 이름 또는 운영체제에 따라 중단점을 정의하게 되면
유지 관리가 끔찍해질 수 있습니다. 그 대신, 콘텐츠가 직접 레이아웃을 컨테이너에 맞게
조정하는 방식을 결정해야 합니다.


### TL;DR {: .hide-from-toc }
- 콘텐츠에 따라 중단점을 만들고 절대로 특정 기기, 제품 또는 브랜드에 따라 만들지 마세요.
- 최소형 휴대기기용으로 먼저 디자인한 다음, 점진적으로 더 큰 화면으로 환경을 향상시켜 나갑니다.
- 텍스트 줄을 최대 약 70 ~ 80자로 유지합니다.


### 처음에는 작게 시작하고 늘려나가는 방식으로 주요 중단점을 선택

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      작은 화면에 표시된 날씨 예보의 미리보기
    </a>
  </figcaption>
</figure>

처음에는 작은 화면에 맞게 콘텐츠를 디자인하고, 중단점이
필요해질 때까지 화면을 늘려 나갑니다.  이렇게 하면 콘텐츠에 따라
중단점을 최적화할 수 있으며, 중단점 수를 최소한으로 유지할 수
있습니다.

앞에서 살펴보았던 날씨 예보의 예를
살펴보겠습니다. 첫 단계는 작은 화면에서 예보가 잘 보이게
만드는 것입니다.

<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="페이지가 더 넓어진 날씨 예보의 미리보기">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      페이지가 더 넓어진 날씨 예보의 미리보기
    </a>
  </figcaption>
</figure>

그 다음, 요소들 사이에 너무 많은 여백이 있어서 예보가
보기에 좋지 않은 모습이 될 때까지 브라우저의 크기를 조정합니다.  이 결정은 다소 주관적이지만,
600px 이상이면 확실히 너무 넓은 것입니다.

<div style="clear:both;"></div>

600px에서 중단점을 삽입하기 위해 두 개의 스타일시트를 새로 만듭니다.
하나는 브라우저가 600px 이하일 때 사용할 것이고 다른 하나는 600px보다 넓을 때 사용할 것입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html){: target="_blank" .external }

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="더 넓은 화면용으로 디자인된 날씨 예보의 미리보기">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html">
      더 넓은 화면용으로 디자인된 날씨 예보의 미리보기
    </a>
  </figcaption>
</figure>

마지막으로, CSS를 리팩터링합니다.  이 예시에서는 글꼴, 아이콘, 기본 배치, 색상 등의
공통 스타일을 `weather.css`에 배치했습니다.  그런 다음, 작은 화면용
특정 레이아웃은 `weather-small.css`에 배치하고
큰 화면용 스타일은 `weather-large.css`에 배치했습니다.

<div style="clear:both"></div>


### 필요한 경우 하위 중단점 선택

레이아웃이 대폭 변경될 경우 주요 중단점을 선택할 수 있는 기능과 더불어,
사소한 변경에 대해 조정할 수 있는 기능도 유용합니다.  예를 들어, 주요 중단점 간에
요소에서 여백이나 패딩을 조정하는 것이 유용할 수 있으며,
또는 레이아웃에서 더 자연스럽게 보이도록 글꼴 크기를 늘릴 수도 있습니다.

먼저 작은 화면의 레이아웃을 최적화해 보겠습니다.  이 경우, 뷰포트 너비가
360px보다 커지면 글꼴을 확대합니다.  두 번째로, 충분한 공간이
있는 경우에는, 위아래로 표시되는 대신 같은 줄에 표시되도록
최고 기온과 최저 기온을 구분할 수 있습니다.  날씨 아이콘을 좀더 크게
만들어 보겠습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="하위 중단점을 추가하기 전.">
    <figcaption>
      하위 중단점을 추가하기 전.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="하위 중단점을 추가한 후.">
    <figcaption>
      하위 중단점을 추가한 후.
     </figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


큰 화면에서도 마찬가지로, 전체 화면 너비가 소모되지 않도록
예보 패널의 최대 너비로 제한하는 것이 최선입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### 읽을 수 있도록 텍스트 최적화

전통적인 가독성 이론에 따르면 이상적인 경우 한 열에는
한 줄당 70 ~ 80자(영어로 약 8 ~ 10단어)가 포함되어야 합니다. 따라서 텍스트 블록의 너비가
약 10단어를 넘어갈 때마다 중단점 추가를 고려하세요.

<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="하위 중단점을 추가하기 전.">
    <figcaption>하위 중단점을 추가하기 전.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="하위 중단점을 추가한 후.">
    <figcaption>하위 중단점을 추가한 후.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

위의 블로그 게시물의 예를 더 자세히 살펴봅시다.  작은 화면에서는
1em의 Roboto 글꼴이 한 줄당 10단어를 완벽하게 표시하지만, 큰 화면에서는
중단점이 필요합니다. 이 경우, 브라우저 너비가
575px보다 크다면 이상적인 콘텐츠 너비는 550px입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/reading.html){: target="_blank" .external }

### 콘텐츠를 완전히 숨기지 마세요

화면 크기에 따라 어떤 콘텐츠를 숨기거나 표시할지 선택할 때 주의를 기울이세요.
화면에 맞지 않는다는 이유만으로 콘텐츠를 숨기지는 마세요.  사용자가 원하는 것을 화면 크기가
명확히 나타내지 않을 수도 있습니다.  봄철 알레르기
질환이 있는 사람이 외출 가능 여부를 결정해야 하는데, 날씨 예보에서
꽃가루 개수 정보를 없앤다면 심각한 문제가 될 수
있습니다.

## Chrome DevTools에서 미디어 쿼리 중단점 보기 {: #devtools }

미디어 쿼리 중단점 설정을 마치고 나면 사이트가 어떻게 달라 보일지
궁금할 것입니다. 브라우저 창의 크기를 조정하여 중단점을 트리거하는 것도 *가능*하긴 하겠지만, 더 나은 방법이
있습니다. 바로 Chrome DevTools를 사용하는 방법입니다. 아래의
두 스크린샷은 DevTools를 사용해 중단점이 서로 다른 상황에서 페이지가 어떻게 나타나는지를
보여줍니다.

![DevTools의 미디어 쿼리 기능 예시](imgs/devtools-media-queries-example.png)

중단점이 서로 다를 때 페이지를 보려면:

[DevTools를 열고](/web/tools/chrome-devtools/#open) [Device
Mode](/web/tools/chrome-devtools/device-mode/#toggle)를 설정합니다.

[뷰포트
컨트롤](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls)을
사용하여 **Responsive**를 선택합니다. 그러면 DevTools가 반응형 모드로 전환됩니다.

마지막으로, Device Mode 메뉴를 열고
[**미디어 쿼리 표시**](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)를
선택하여 페이지 위에 중단점을 색상 막대로 표시합니다.

막대 중 하나를 클릭하면 미디어 쿼리가 활성인 상태에서 페이지를
볼 수 있습니다. 미디어 쿼리의 정의로 바로 이동하려면 막대를 마우스 오른쪽 버튼으로
클릭하세요. 더 자세한 도움말은
[미디어 쿼리](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)를
참조하세요.


{# wf_devsite_translation #}
