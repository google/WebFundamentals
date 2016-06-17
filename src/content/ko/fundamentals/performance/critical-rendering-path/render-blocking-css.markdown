---
title: "렌더링을 블록 하는 CSS"
description: "기본적으로 CSS는 렌더링을 블록 시키는 자원으로 여겨집니다, 어떻게 하면 렌더링이 블록되는 것을 막을 수 있는 지 배워봅시다."
updated_on: 2014-09-18
translation_priority: 0
translators:
  - swengineer
related-guides:
  media-queries:
    -
      title: "Use CSS media queries for responsiveness"
      href: fundamentals/design-and-ui/responsive/fundamentals/use-media-queries
      section:
        title: "Responsive Web design"
        href: fundamentals/design-and-ui/responsive/
key-takeaways:
  render-blocking-css:
    - "기본적으로 CSS는 렌더링을 블록 시키는 자원으로 여겨집니다."
    - "미디어 타입과 미디어 쿼리는 몇 가지 CSS 자원들에 대해 렌더링을 블록 하지 않게 해줍니다."
    - "모든 CSS 자원은, 렌더링 블록 여부와 상관없이 브라우저로부터 다운로드 됩니다."
---

<p class="intro">
  기본적으로 CSS는 렌더링을 블록 시키는 자원으로 여겨집니다, 그것은 브라우저가 CSSOM이 형성될 때까지 어떠한 컨텐츠에 대한 렌더링도 중지 한다는 것을 뜻합니다. 반드시 CSS를 가볍게 유지하고, 가능한 빨리 전달하세요. 그리고 렌더링을 블록 하지 않도록 미디어 타입과 쿼리를 사용하세요.
</p>

지난 섹션에서 크리티컬 렌더링 패스가, 성능에 있어 중요한 영향을 가지고 있는 렌더 트리를 만들기 위한 DOM과 CSSOM을 필요로 하는 것을 봤습니다: **HTML과 CSS모두 렌더링을 블록 하는 자원들입니다.** HTML은 DOM이 없으면 렌더링 할 것이 없기 때문에 분명합니다. 그런데 CSS는 그에 비해 약간 불분명합니다. 일반적인 페이지에서 CSS에 대해 렌더링을 블록 하지 않고 렌더링 하려고 하면 무슨일이 벌어질까요?

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes with CSS">
    <figcaption>The New York Times with CSS</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS">
    <figcaption>The New York Times without CSS (FOUC)</figcaption>
  </figure>
</div>

위의 예에서, CSS 없이 NYTimes를 보여주는것이, 왜 CSS가 사용 가능해질 때까지 렌더링이 블록 되어야 하는 지 설명합니다. CSS 없는 그 페이지는 효율적으로 사용이 불가능합니다. 사실, 오른쪽의 실험은 종종 "Flash Of Unstyled Content"(FOUC)로 언급됩니다. 결국, 브라우저는 DOM과 CSSOM이 생길때까지 렌더링을 블록합니다.

> **_CSS는 렌더링을 블록 하는 자원입니다, 처음 렌더링 되는 시간을 최적화하기 위해 클라이언트에게 가능한 최대한 빠르게 다운로드 되어야 합니다._**

그런데, 만약 우리가 분명한 몇 가지 조건하에서만 적용 하는 CSS 스타일이 있다면, 예를 들어, 페이지를 프린트 할 때, 큰 모니터에서 출력할 때? 우리는 이러한 자원들에 대해 렌더링을 블록 할 필요가 없었으면 좋을 것 같습니다.

CSS "미디어 타입"과 "미디어 쿼리"가 이러한 경우에 우리에게 그것을 허용해 줍니다:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

 [미디어 쿼리](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) 는 미디어 타입과 0 또는 특정한 미디어 기능의 조건을 체크하는 더 많은 표현들로 구성됩니다. 예를 들어, 우리의 첫번째 스타일시트 정의는 미디어 타입 또는 쿼리를 제공하지 않습니다. 그러므로 그것은 모든 경우에 적용됩니다. 다시 말해서, 그것은 항상 렌더링을 블록합니다. 반면에 두번째 스타일 시트는 오직 그 컨텐츠가 프린트 될 때만 적용됩니다. 아마 당신은 레이아웃 재정렬, 폰트 변경, 등이 필요할 것입니다. 그리고 이러한 스타일시트는 처음 로드될 때 렌더링을 블록 하는것을 필요로 하지 않습니다. 마지막으로, 마지막 스타일 시트 정의는 브라우저에 의해 실행되는 "미디어 쿼리"를 제공합니다. 만약 조건이 맞으면, 브라우저는 스타일시트가 다운로드 되고 실행될 때까지 렌더링을 블록할 것입니다.

미디어 쿼리를 사용함으로서, 우리의 표현은 프린트나 디스플레이 같은 특정한 경우 뿐만 아니라 스크린 오리엔테이션, 리사이즈 이벤트 등과 같은 동적인 조건에도 맞춤형이 될 수 있습니다. **당신의 스타일 시트를 정의할 때, 미디어 타입과 쿼리에 많은 신경을 쓰세요, 그것들이 크리티컬 렌더링 패스에 엄청난 성능 효과를 가져올 수 있습니다!**

직접 해보는 예제로 생각해보죠:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* 첫번째 선언은 모든 매칭되는 조건에 대해 렌더링을 블록합니다.
* 두번째 선언 또한 렌더링을 블록합니다: "all"은 기본 타입이며, 만약 type을 명시하지 않으면 암묵적으로 "all"로 설정됩니다. 그러므로 첫번째와 두번째 선언은 사실 똑같습니다
* 세번째 선언은 페이지가 로딩될때 평가되는 동적인 미디어 쿼리를 가집니다. 디바이스의 오리엔테이션에 따라 페이지가 로드되면, portrait.css는 렌더링을 블록할 수도 블록 하지 않을 수도 있습니다.
* 마지막 선언은 오직 페이지가 프린트 될 때만 적용됩니다. 그러므로 브라우저에 처음 페이지가 로드 될 때는 렌더링이 블록되지 않습니다.

마지막으로, "렌더링을 블록 하는것"은 브라우저가 페이지 자원들을 처음 렌더링 할 때 중지시켜야 할 지에 대해서만 관련이 있습니다. 어느 경우에나, CSS 자원들이 블록 하지 않는 자원들에 비해 비록 낮은 우선순위를 가지게 되더라도, 브라우저에 의해 여전히 다운로드 됩니다.
