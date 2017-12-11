project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 기기 모션 및 방향 이벤트는 휴대기기에 기본 제공된 가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-06-17 #}

# 기기 방향 및 모션 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

기기 모션 및 방향 이벤트는 휴대기기에 기본 제공된
가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다.

이러한 이벤트는 많은 용도로 사용될 수 있습니다(예: 게임에서 캐릭터의 방향이나 동작을 제어).
 위치정보와 함께 사용할 경우
더욱 정확한 턴바이턴 내비게이션을 생성하거나 특정 위치에 대한 정보를 제공할 수 있습니다.


Caution: 모든 브라우저가 동일한 좌표계를 사용하지는 않으므로 동일한 상황에서도 각기 다른 값이 보고될 수 있습니다. 시간이 지나면서 개선되었지만 반드시 상황을 테스트하세요.

##TL;DR

* 기기의 어느 쪽이 위이고 기기가 어떻게 회전하는지 감지합니다.
* 모션 및 방향 이벤트에 언제 어떻게 반응하는지 알아보세요.


## 정확한 정보 파악하기

기기 방향 및 모션 이벤트에서 반환하는 데이터를 사용하려면
제공된 값을 이해하는 것이 중요합니다.  

### 지구 좌표계

`X`, `Y`, `Z` 값으로 나타내는 지구 좌표계는 중력 및 표준 자기 방향을 기준으로
정렬됩니다.

<table class="responsive">
<tr><th colspan="2">좌표계</th></tr>
<tr>
  <td><code>X</code></td>
  <td>동서 방향을 나타냅니다(동쪽이 +입니다).</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>남북 방향을 나타냅니다(북쪽이 +입니다).</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>지면에서 수직인 상하 방향을
나타냅니다(위쪽이 +입니다).
</td>
</tr>
</table>

### 기기 좌표계

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/axes.png" alt="기기 좌표계 그림">
    <figcaption>
      기기 좌표계 그림
</figcaption>
  </figure>
</div>

<!-- Special thanks to Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy)
  for his images which are in the public domain. -->

`x`, `y`, `z` 값으로 나타내는 기기 좌표계는 기기의 중심을
기준으로 정렬됩니다.

<table class="responsive">
<tr><th colspan="2">좌표계</th></tr>
<tr>
  <td><code>X</code></td>
  <td>화면의 오른쪽이 +입니다.</td>
</tr>
<tr>
  <td><code>Y</code></td>
  <td>화면의 위쪽이 +입니다.</td>
</tr>
<tr>
  <td><code>Z</code></td>
  <td>화면이나 키보드에 수직으로
위쪽이 +입니다.
</td>
</tr>
</table>

폰이나 태블릿에서 기기 방향은 일반적인 화면 방향을
기준으로 합니다. 폰 및 태블릿의 경우 세로 모드 기기를
기준으로 합니다. 데스크톱 또는 노트북 컴퓨터의 경우 방향은
키보드와 관련하여 고려됩니다.

### 회전 데이터

회전 데이터는 기기 좌표계와 지구 좌표계
사이의 각도 차이를 나타내는 [오일러각](https://en.wikipedia.org/wiki/Euler_angles)으로
반환됩니다.

#### 알파

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/alpha.png" alt="기기 좌표계 그림">
    <figcaption>
      기기 좌표계의 알파 그림
    </figcaption>
  </figure>
</div>

z 축을 기준으로 회전합니다. 기기 상단이 정북향을 가리킬 때 `alpha`값이
0&deg;입니다. 기기가 시계 반대 방향으로 회전할수록
`alpha` 값이 증가합니다.

<div style="clear:both;"></div>

#### 베타

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/beta.png" alt="기기 좌표계 그림">
    <figcaption>
      기기 좌표계의 베타 그림
</figcaption>
  </figure>
</div>

x 축을 기준으로 한 회전입니다. 기기 상단과 하단이 지면에서 등거리에 있을 때 `beta`값은
0&deg;입니다. 기기의
상단이 지면을 향해 기울어질수록 값이 증가합니다.

<div style="clear:both;"></div>

#### 감마

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/gamma.png" alt="기기 좌표계 그림">
    <figcaption>
      기기 좌표계의 감마 그림
</figcaption>
  </figure>
</div>

y 축을 기준으로 한 회전입니다. 기기 왼쪽과 오른쪽 가장자리가 지면에서 등거리에 있을 때 `gamma`값은
0&deg;입니다.  기기의
오른쪽이 지면을 향해 기울어질수록 값이 증가합니다.

<div style="clear:both;"></div>

## 기기 방향

기기 방향 이벤트는 기기의 전후좌우 기울기와 방향(폰이나 노트북에 나침반이 있는 경우)을
포함하는 회전 데이터를 반환합니다.


가급적 사용하지 않습니다.
지원 여부를 테스트합니다.
모든 방향 이벤트에 대해 UI를 업데이트하지 않습니다. 대신 `requestAnimationFrame`과 동기화하세요.

### 기기 방향 이벤트를 사용하는 경우

기기 방향 이벤트의 용도는 몇 가지가 있습니다. 예시는 다음을 포함합니다.

* 사용자의 움직임에 따라 지도를 업데이트합니다.
* UI를 미세하게 조정합니다(예: 시차 효과(parallax effect) 추가).
* 위치정보와 함께 턴바이턴 탐색에 사용할 수 있습니다.

### 지원 확인 및 이벤트 수신 대기

`DeviceOrientationEvent`를 수신 대기하려면 먼저 이벤트가 브라우저에서 지원되는지 확인합니다. 그런 다음, 이벤트 리스너를 `deviceorientation` 이벤트를 수신 대기하는 `window` 객체에 연결합니다. 

    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', deviceOrientationHandler, false);
      document.getElementById("doeSupported").innerText = "Supported!";
    }

### 기기 방향 이벤트 처리

기기 방향 이벤트는 기기가 이동하거나 방향을 변경할 때
발생합니다. [지구 좌표계](#earth-coordinate-frame)와 관련하여 기기의
현재 위치 변화에 대한 데이터를
반환합니다.

이 이벤트는 일반적으로 [`alpha`](#alpha), 
[`beta`](#beta) 및 [`gamma`](#gamma) 등의 세 가지 속성을 반환합니다. 모바일 Safari에서는 추가 매개변수
[`webkitCompassHeading`](https://developer.apple.com/library/ios/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/){: .external }
이 나침반 기수 방향과 함께 반환됩니다.

## 기기 모션 

기기 방향 이벤트는 기기의 전후좌우 기울기와 방향(폰이나 노트북에 나침반이 있는 경우)을
포함하는 회전 데이터를 반환합니다.


기기의 현재 모션이 필요할 때 기기 모션을 사용합니다.
`rotationRate`는 &deg;/초 단위로 제공됩니다.
`acceleration`과 `accelerationWithGravity`는 m/초<sup>2</sup> 단위로 제공됩니다.
브라우저 구현의 차이에 유의하세요.

### 기기 모션 이벤트를 사용하는 경우

기기 모션 이벤트를 사용하는 활용 사례로는 몇 가지가 있습니다. 예시는 다음을 포함합니다.

* 흔들기 동작을 통해 데이터 새로 고침
* 게임에서 캐릭터의 점프 또는 이동
* 건강 및 피트니스 앱용


### 지원 확인 및 이벤트 수신 대기

`DeviceMotionEvent`를 수신 대기하려면 먼저 이벤트가
브라우저에서 지원되는지 여부를 확인합니다.  그런 다음, 이벤트 리스너를 `devicemotion` 이벤트를 수신 대기하는 `window`
객체에 연결합니다. 

    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', deviceMotionHandler);
      setTimeout(stopJump, 3*1000);
    }

### 기기 모션 이벤트 처리

기기 모션 이벤트는 정기적인 간격으로 발생하고 특정 시점에서 기기의
회전(&deg;/초) 및 가속도(m/초<sup>2</sup>)에
대한 데이터를 반환합니다. 일부 기기에는 중력 효과를 배제하는 하드웨어가
없습니다.

이 이벤트는
[`accelerationIncludingGravity`](#device-coordinate-frame), 
[`acceleration`](#device-coordinate-frame)(중력 효과 배제),
[`rotationRate`](#rotation-data) 및 `interval`의 네 가지 속성을 반환합니다.

예를 들어, 화면이 위를 향한 상태로 평평한 테이블에 폰이 놓여있는 경우를
살펴보겠습니다.

<table>
  <thead>
    <tr>
      <th data-th="State">상태</th>
      <th data-th="Rotation">회전</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">가속도(m/초<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">중력이 적용된 가속도(m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">이동하지 않음</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9.8]</td>
    </tr>
    <tr>
      <td data-th="State">하늘을 향해 위로 이동함</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14.81]</td>
    </tr>
    <tr>
      <td data-th="State">오른쪽으로만 이동함</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9.81]</td>
    </tr>
    <tr>
      <td data-th="State">위쪽과 오른쪽으로 이동</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14.81]</td>
    </tr>
  </tbody>
</table>

역으로, 화면이 지면에 수직이고 뷰어에서 바로 볼 수 있도록 폰이
고정된 경우는 다음과 같습니다.

<table>
  <thead>
    <tr>
      <th data-th="State">상태</th>
      <th data-th="Rotation">회전</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">가속도(m/초<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">중력이 적용된 가속도(m/s<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">이동하지 않음</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">하늘을 향해 위로 이동함</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">오른쪽으로만 이동함</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9.81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">위쪽과 오른쪽으로 이동</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

### 샘플: 객체의 최대 가속도 계산

기기 모션 이벤트를 사용하는 방법 중 하나로 객체의 최대 가속도를
계산하는 것이 있습니다. 예를 들어, 사람의 점프 동작에 대한 최대 가속도를
계산합니다.

    if (evt.acceleration.x > jumpMax.x) {
      jumpMax.x = evt.acceleration.x;
    }
    if (evt.acceleration.y > jumpMax.y) {
      jumpMax.y = evt.acceleration.y;
    }
    if (evt.acceleration.z > jumpMax.z) {
      jumpMax.z = evt.acceleration.z;
    }


Go! 버튼을 누른 후 사용자에게 점프하라고 지시합니다. 그 동안
페이지가 최대(및 최소) 가속도 값을 저장하고, 점프 후에는
최대 가속도를 표시합니다.


{# wf_devsite_translation #}
