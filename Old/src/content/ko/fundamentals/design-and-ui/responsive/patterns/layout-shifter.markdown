---
title: "레이아웃 시프터(Layout shifter)"
description: " 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다."
updated_on: 2014-10-21
---

<p class="intro">
  레이아웃 시프터 패턴은 반응성이 가장 뛰어난 패턴이며 여러 화면 너비에 복수의 중단점을 가집니다.
</p>

이 레이아웃의 핵심은 다른 열 아래로 이동 및 재배치하는 방식이 아니라 콘텐츠의 자리 이동 방식에 있습니다.
  각 주요 중단점 간의 현저한 차이로 인해 유지 관리하기가 훨씬 복잡하고 전체 콘텐츠 레이아웃뿐만 아니라 요소 내의 변경도 포함합니다.



{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  체험해 보기
{% endlink_sample %}

이 간단한 레이아웃 시프터 패턴의 예를 보면 작은 화면에서 콘텐츠가 수직으로 쌓이지만 화면이 커짐에 따라 한 `div`는 왼쪽에, 두 `div`는 오른쪽에 쌓이게 되는 큰 변화가 일어납니다.



다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code src=_code/layout-shifter.html snippet=lshifter lang=css %}


