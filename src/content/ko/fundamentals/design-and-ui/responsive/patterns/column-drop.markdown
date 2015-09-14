---
title: "열 끌어놓기(Column Drop)"
description: " 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다."
updated_on: 2014-10-21
---

<p class="intro">
  전체 너비가 가득 찬 다중 열 레이아웃의 경우 열 끌어놓기는 창 너비가 콘텐츠에 비해 너무 좁아지면 열을 수직으로 쌓습니다.
</p>

결국 모든 열이 수직으로 쌓이게 됩니다.
  이 레이아웃 패턴의 중단점 선택은 콘텐츠에 따라 다르며 디자인에 따라 변할 수 있습니다.



{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  체험해 보기
{% endlink_sample %}


유동형 샘플처럼 콘텐츠는 가장 작은 보기에서 수직으로 쌓이지만, 화면이 600px 이상으로 커지면 기본 및 보조 콘텐츠 `div`가 화면의 전체 너비를 차지합니다.

  `div`의 순서는 order CSS 속성을 사용하여 설정됩니다.
  800px에서는 전체 화면 너비에 3개의 콘텐츠 `div`가 모두 표시됩니다.


다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code src=_code/column-drop.html snippet=cdrop lang=css %}


