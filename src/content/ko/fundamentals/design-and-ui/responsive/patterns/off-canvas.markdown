---
title: "오프 캔버스(Off canvas)"
description: " 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다."
updated_on: 2014-10-21
---

<p class="intro">
  오프 캔버스 패턴은 콘텐츠를 수직으로 쌓지 않고 사용 빈도가 낮은 콘텐츠(예: 탐색 또는 앱 메뉴)를 화면 밖에 배치하고, 화면 크기가 충분히 커지면 표시하고, 작은 화면에서는 클릭했을 때만 보여줍니다.
</p>

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  체험해 보기
{% endlink_sample %}

이 샘플은 콘텐츠를 수직으로 쌓지 않고 `transform: translate(-250px, 0)`을 사용하여 두 개의 콘텐츠
`div`를 화면에서 숨깁니다.  JavaScript로 열린 클래스를 요소에 추가하여 보이게 만드는 방식으로 div를 표시할 수 있습니다.
  화면이 넓어짐에 따라 요소의 화면 밖 위치가 없어지고 가시적인 뷰포트 내에 표시됩니다.



이 샘플에서 Safari for iOS 6 및 Android Browser는 `flexbox`의 `flex-flow: row nowrap` 기능을 지원하지 않으므로 절대 위치로 대체했어야 합니다.



다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

{% include_code src=_code/off-canvas.html snippet=ocanvas lang=css %}


