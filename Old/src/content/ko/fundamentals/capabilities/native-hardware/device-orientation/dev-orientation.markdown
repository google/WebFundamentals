---
title: "장치 방향"
description: "장치 방향 이벤트는 장치의 전후좌우 기울기와 방향(폰이나 랩톱에 나침반이 있는 경우)을 포함하는 회전 데이터를 반환합니다."
updated_on: 2014-10-21
key-takeaways:
  devorientation: 
    - 가급적 사용하지 않습니다.
    - 지원 여부를 테스트합니다.
    - 모든 방향 이벤트에 대해 UI를 업데이트하지 마십시오. 대신 requestAnimationFrame과 동기화하십시오.
---

<p class="intro">
  장치 방향 이벤트는 장치의 전후좌우 기울기와 방향(폰이나 랩톱에 나침반이 있는 경우)을 포함하는 회전 데이터를 반환합니다.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devorientation %}

## 장치 방향 이벤트를 사용하는 경우

장치 방향 이벤트의 용도는 몇 가지가 있습니다.  예:

<ul>
  <li>사용자의 움직임에 따라 지도를 업데이트합니다.</li>
  <li>UI를 미세하게 조정합니다(예: 시차 효과(paralax effect) 추가).</li>
  <li>GeoLocation과 결합하여 턴바이턴 내비게이션에 사용할 수 있습니다.</li>
</ul>

## 지원 확인 및 이벤트 수신 대기

`DeviceOrientationEvent`를 수신 대기하려면 먼저 이벤트가
브라우저에서 지원되는지 여부를 확인합니다.  그런 다음, 이벤트 리스너를 `deviceorientation` 이벤트를 수신 대기하는 `window` 
개체에 연결합니다. 

{% include_code src=_code/dev-orientation.html snippet=devori lang=javascript %}

## 장치 방향 이벤트 처리

장치 방향 이벤트는 장치가 이동하거나 방향을 변경할 때 
발생합니다.  <a href="index.html#earth-coordinate-frame">지구 좌표계</a>와 관련하여 장치의 
현재 위치 변화에 대한
데이터를 반환합니다.

이 이벤트는 일반적으로 
<a href="index.html#rotation-data">`alpha`</a>, 
<a href="index.html#rotation-data">`beta`</a> 및 
<a href="index.html#rotation-data">`gamma`</a> 등 3가지 속성을 반환합니다.  Mobile Safari에서는
추가 매개변수 <a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a>이 나침반 기수 방향과 함께
반환됩니다.


