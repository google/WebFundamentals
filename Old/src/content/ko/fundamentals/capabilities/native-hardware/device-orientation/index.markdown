---
title: "장치 방향"
description: "장치 모션 및 방향 이벤트는 모바일 장치에 기본 제공된 가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다."
updated_on: 2014-10-21
notes:
  not-stable:
    - "장치 모션이나 장치 방향 이벤트를 사용하기로 결정할 때는 <b>특히</b> 주의해야 합니다.  안타깝게도 모든 브라우저가  동일한 좌표계를 사용하지는 않으므로 동일한 상황에서도 각기 다른 값이 보고될 수 있습니다."
---
<p class="intro">
  장치 모션 및 방향 이벤트는 모바일 장치에 기본 제공된 가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다.
</p>

이러한 이벤트는 많은 용도로 사용할 수 있습니다. 예를 들어, 게임에서 
캐릭터의 방향을 제어하거나 캐릭터가 얼마나 높이 점프해야 할지 
결정할 때 사용할 수 있습니다. GeoLocation과 함께 사용할 경우 더욱 정확한 턴바이턴 내비게이션 
시스템을 생성하거나 가게의 위치 정보를 제공할 수 있습니다.

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

## 정확한 정보 파악하기

장치 방향 및 모션 이벤트에서 반환하는 데이터를 사용하려면
제공된 값을 이해하는 것이 중요합니다.  

### 지구 좌표계

`X`, `Y`, `Z` 값으로 나타내는 지구 좌표계는 중력 및 표준 자기 방향을 기준으로
정렬됩니다.

<ul>
  <li>
    <b>X:</b> 동서 방향을 나타냅니다(동쪽이 +임).
  </li>
    <li>
    <b>Y:</b> 남북 방향을 나타냅니다(북쪽이 +임).
  </li>
    <li>
    <b>Z:</b> 지면에서 수직인 상하 방향을 나타냅니다
    (위쪽이 +임).
  </li>
</ul>

### 장치 좌표계

`x`, `y`, `z` 값으로 나타내는 장치 좌표계는 장치의 중심을
기준으로 정렬됩니다.

<img src="images/axes.png" alt="장치 좌표계 그림">
<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy) 
  for his images which are in the public domain. -->

<ul>
  <li>
    <b>x:</b> 화면의 오른쪽이 +입니다.
  </li>
    <li>
    <b>y:</b> 화면의 위쪽이 +입니다.
  </li>
    <li>
    <b>z:</b> 화면이나 키보드에 수직으로 위쪽이
    +입니다.
  </li>
</ul>

폰이나 태블릿에서 장치 방향은 일반적인 화면 방향을
기준으로 합니다.  폰 및 태블릿의 경우 세로 모드 장치를
기준으로 합니다. 데스크톱 또는 노트북 컴퓨터의 경우 방향은 
키보드와 관련하여 고려됩니다.

### 회전 데이터

회전 데이터는 장치 좌표계와 지구 좌표계
사이의 각도 차이를 나타내는 [오일러각](http://en.wikipedia.org/wiki/Euler_angles)으로
반환됩니다.

<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>알파:</b> z축을 기준으로 한 회전이며, 장치 상단이 정북향을 가리킬 때
    0&deg;입니다.  장치가 시계 반대 방향으로 회전할수록
    `alpha` 값이 증가합니다.
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>베타:</b> x축을 기준으로 한 회전이며, 장치 상단과 하단이 지면에서 등거리에 
    있을 때 0&deg;입니다. 장치의
    상단이 지면을 향해 기울어질수록 값이 증가합니다.
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>감마:</b> y축을 기준으로 한 회전이며, 장치 왼쪽과 오른쪽이 지면에서 등거리에
    있을 때 0&deg;입니다.  장치의
    오른쪽이 지면을 향해 기울어질수록 값이 증가합니다. 
  </div>
</div>

<div style="clear:both;"></div>



