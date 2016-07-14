---
title: "미세 조정(Tiny tweaks)"
description: " 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다."
updated_on: 2014-10-21
---

<p class="intro">
  미세 조정은 글꼴 크기 미세 조정, 이미지 크기 미세 변경 또는 콘텐츠 미세 이동 등과 같이 레이아웃을 약간 변경합니다.
</p>

이 패턴은 1페이지 선형 웹사이트, 텍스트가 많은 문서 등 단일 열 레이아웃에서 잘 작동합니다.


{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  체험해 보기
{% endlink_sample %}

이름에서 알 수 있듯이 이 샘플은 화면 크기의 변화에 비해 거의 변화가 없습니다.
화면 너비가 커질수록 글꼴 크기와 여백도 커집니다.

다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code src=_code/tiny-tweaks.html snippet=ttweaks lang=css %}


