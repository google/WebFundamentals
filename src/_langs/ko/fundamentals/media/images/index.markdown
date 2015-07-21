---
layout: section
title: "이미지"
description: "한 장의 사진이 천 마디 말의 가치를 가진 것 처럼 이미지는 모든 페이지에서 필수 불가결한 요소이다. 하지만 대부분의 다운로드 용량을 차지하기도 한다. 반응형 웹 디자인에서 레이아웃 뿐만 아니라 이미지 또한 기기의 특성에 맞게 바뀌어야 한다."
introduction: "한 장의 사진이 천 마디 말의 가치를 가진 것 처럼 이미지는 모든 페이지에서 필수 불가결한 요소이다. 하지만 대부분의 다운로드 용량을 차지하기도 한다. 반응형 웹 디자인에서 레이아웃 뿐만 아니라 이미지 또한 기기의 특성에 맞게 바뀌어야 한다."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 1
collection: introduction-to-media
priority: 0
id: images
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

<div class="media media--video">
  <iframe src="https://www.youtube.com/embed/vpRsLPI400U?controls=2&modestbranding=1&showinfo=0&utm-source=crdev-wf" frameborder="0" allowfullscreen=""></iframe>
</div>

### 반응형 이미지

반응형 웹 디자인에서 레이아웃 뿐만 아니라 이미지 또한 기기의 특성에 맞게 바뀌어야
한다. 예를 들어, 고해상도 (2x) 화면에서 선명하게 보이려면 고해상도 이미지가 필요하다.
그 절반 크기의 이미지는, 브라우저가 800px 넓이 일때는 괜찮지만, 핸드폰에서 사용되기
에는 과하다. 스크린에 맞게 크기가 작아지더라도 대역폭은 그대로이기 때문이다.

### 아트 디렉션

<img class="center" src="img/art-direction.png" alt="Art direction example"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

사실 이미지는 좀 더 과감하게 바뀔 필요가 있다. 비율과 구도 정도만 바뀔 수도 있고
아예 다른 이미지가 사용될 수도 있다. 이렇게 이미지를 바꾸는 작업을 아트 디렉션
이라고 부른다. 
더 많은 예제들은 [responsiveimages.org/demos/](http://responsiveimages.org/demos/)
에서 확인할 수 있다.

{% include modules/nextarticle.liquid %}

{% endwrap %}
