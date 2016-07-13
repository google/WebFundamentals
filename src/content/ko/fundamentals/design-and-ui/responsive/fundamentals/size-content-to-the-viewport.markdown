---
title: "viewport에 맞게 콘텐츠 크기 조정하기"
description: "상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자."
updated_on: 2014-04-30
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
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---

<p class="intro">
  사용자들은 데스크탑과 모바일 기기에서 수평이 아닌 수직으로 스크롤링 하는 것에 익숙합니다. 그렇기 때문에 사용자들을 수평으로 스크롤하게 하거나 전체 페이지 결과를 보기 위해 줌을 강제하는 것은 조악한 사용자 경험을 야기합니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

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
