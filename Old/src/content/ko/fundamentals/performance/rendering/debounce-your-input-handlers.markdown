---
title: "입력 핸들러 디바운스"
description: "입력 핸들러는 프레임 완성을 차단할 수 있기 때문에 앱에서 성능 문제를 일으키고 추가적인 (그리고 불필요한) 레이아웃 작업을 유발할 수 있습니다."
updated_on: 2015-03-20
notes:
  highdpi:
    - "높은 DPI 화면에서 위치가 고정된 요소는 자체 컴포지터 레이어로 자동 승격됩니다. 이는 낮은 DPI 장치에는 적용되지 않습니다. 승격이 텍스트 렌더링을 하위 픽셀에서 회색조로 변경하고 레이어 승격이 수동으로 수행되어야 하기 때문입니다."
  csstriggers:
    - "레이아웃, 그림 그리기 또는 합성을 트리거하는 명확한 CSS 속성 목록이 필요한 경우 <a href='http://csstriggers.com/'>CSS 트리거</a>를 참조하십시오."
key-takeaways:
  - 오래 실행되는 입력 핸들러를 피하십시오. 스크롤을 차단할 수 있습니다.
  - 입력 핸들러에서 스타일을 변경하지 마십시오.
  - 입력 핸들러를 디바운스하십시오. 이벤트 값을 저장하고 다음 requestAnimationFrame 콜백에서 스타일 변경을 처리하십시오.
---
<p class="intro">
  입력 핸들러는 프레임 완성을 차단할 수 있기 때문에 앱에서 성능 문제를 일으키고 추가적인 (그리고 불필요한) 레이아웃 작업을 유발할 수 있습니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

## 오래 실행되는 입력 핸들러 피하기

가장 빠른 가능한 경우에, 사용자가 페이지와 상호작용할 때 페이지의 컴포지터 스레드가 사용자의 터치 입력을 취하고 단순히 콘텐츠를 이동할 수 있습니다. 이 과정은 JavaScript, 레이아웃, 스타일 또는 그림 그리기가 수행되는 기본 스레드에서 어떤 작업도 필요하지 않습니다.

<img src="images/debounce-your-input-handlers/compositor-scroll.jpg" class="center" alt="가벼운 스크롤. 컴포지터 전용">

하지만 `touchstart`, `touchmove` 또는 `touchend`와 같은 입력 핸들러를 첨부하는 경우, `preventDefault()`를 호출하여 터치 스크롤이 발생하지 않도록 차단할 수 있기 때문에 컴포지터 스레드는 입력 핸들러가 실행을 마칠 때까지 대기해야 합니다. `preventDefault()`를 호출하지 않더라도 컴포지터는 대기해야 하므로 사용자의 스크롤이 차단되어 버벅거림 또는 프레임 누락이 발생할 수 있습니다.

<img src="images/debounce-your-input-handlers/ontouchmove.jpg" class="center" alt="무거운 스크롤: 컴포지터가 JavaScript에서 차단됩니다.">

간단히 말해서 입력 핸들러가 빠르게 실행되고 컴포지터의 작업 수행을 허용해야 합니다.

## 입력 핸들러에서 스타일 변경 피하기

스크롤 및 터치 등에 대한 입력 핸들러는 `requestAnimationFrame` 콜백 직전에 실행되도록 예약됩니다.

이러한 핸들러 내부에서 시각적 변경을 수행하면 `requestAnimationFrame` 시작 시 스타일 변경이 보류됩니다. _그런 다음_ requestAnimationFrame 콜백 시작 시 시각적 속성을 읽으면, "[크고 복잡한 레이아웃 및 레이아웃 스래싱 피하기](avoid-large-complex-layouts-and-layout-thrashing)"에서 제안한 대로 강제 동기 레이아웃을 트리거하게 됩니다!

<img src="images/debounce-your-input-handlers/frame-with-input.jpg" class="center" alt="무거운 스크롤: 컴포지터가 JavaScript에서 차단됩니다.">

## 스크롤 핸들러 디바운스

위의 두 가지 문제를 해결하는 방법은 동일합니다. 시각적 변경을 항상 다음 `requestAnimationFrame` 콜백으로 디바운스해야 합니다.

{% highlight javascript %}
function onScroll (evt) {

  // Store the scroll value for laterz.
  lastScrollY = window.scrollY;

  // Prevent multiple rAF callbacks.
  if (scheduledAnimationFrame)
    return;

  scheduledAnimationFrame = true;
  requestAnimationFrame(readAndUpdatePage);
}

window.addEventListener('scroll', onScroll);
{% endhighlight %}

그러면 컴퓨팅 비용이 많이 드는 코드에서 스크롤이나 터치 등을 차단하지 않기 때문에 입력 핸들러를 가볍게 유지할 수 있다는 이점이 있습니다!


