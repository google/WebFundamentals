---
title: "반응형 웹 디자인 기본"
description: "상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자"
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
  - g.co/mobilesiteprinciple19

---

<p class="intro">
  웹 서핑을 위한 모바일 기기의 사용은 천문학 적인 속도로 증가하고 있지만, 안타깝게도 많은 웹 사이트들이 모바일 기기를 위한 최적화가 되어 있지 않다. 모바일 기기들은 보통 화면 크기에 제약이 있고, 화면에 어떤식으로 내용들을 나타낼지에 대한 접근방식이 다르다.
</p>

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
