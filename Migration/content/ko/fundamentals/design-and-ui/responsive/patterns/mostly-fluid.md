---
title: "유동형(Mostly fluid)"
description: " 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다."
updated_on: 2014-10-21
---

<p class="intro">
  유동형 패턴은 주로 유동형 그리드로 구성됩니다.  더 넓은 화면에서는 여백만 조정하므로 대형 화면이나 중형 화면에서 이 패턴은 일반적으로 동일한 크기를 유지합니다.
</p>

더 작은 화면에서는 열이 수직 방향으로 쌓이면서 기본 콘텐츠가 재배치됩니다.
  이 패턴의 한 가지 주요 이점은 대개 소형 화면과 대형 화면에서 하나의 중단점만 필요하다는 것입니다.



{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  체험해 보기
{% endlink_sample %}

가장 작은 보기에서 각 콘텐츠 `div`가 수직으로 쌓입니다.  화면 너비가 600px에 도달하면 기본 콘텐츠 `div`가 `width: 100%`로 유지되지만 보조 `div`는 기본 `div` 아래 2열로 나타납니다.

  
800px를 넘으면 컨테이너 `div`는 너비가 고정되고 화면 중앙에 배치됩니다.

다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


{% include_code src=_code/mostly-fluid.html snippet=mfluid lang=css %}


