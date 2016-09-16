project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 장치 모션 및 방향 이벤트는 모바일 장치에 기본 제공된 가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다.


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 장치 방향 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


장치 모션 및 방향 이벤트는 모바일 장치에 기본 제공된 가속도계, 자이로스코프 및 나침반에 대한 액세스를 제공합니다.

이러한 이벤트는 많은 용도로 사용할 수 있습니다. 예를 들어, 게임에서 
캐릭터의 방향을 제어하거나 캐릭터가 얼마나 높이 점프해야 할지 
결정할 때 사용할 수 있습니다. GeoLocation과 함께 사용할 경우 더욱 정확한 턴바이턴 내비게이션 
시스템을 생성하거나 가게의 위치 정보를 제공할 수 있습니다.

Note: 장치 모션이나 장치 방향 이벤트를 사용하기로 결정할 때는 <b>특히</b> 주의해야 합니다.  안타깝게도 모든 브라우저가  동일한 좌표계를 사용하지는 않으므로 동일한 상황에서도 각기 다른 값이 보고될 수 있습니다.

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

<figure>
  <img src="images/alpha.png">
  <figcaption>
    <b>알파:</b> z축을 기준으로 한 회전이며, 장치 상단이 정북향을 가리킬 때
    0&deg;입니다.  장치가 시계 반대 방향으로 회전할수록
    `alpha` 값이 증가합니다.
  </figcaption>
</figure>
<figure>
  <img src="images/beta.png">
  <figcaption>
    <b>베타:</b> x축을 기준으로 한 회전이며, 장치 상단과 하단이 지면에서 등거리에 
    있을 때 0&deg;입니다. 장치의
    상단이 지면을 향해 기울어질수록 값이 증가합니다.
  </figcaption>
</figure>

<figure>
  <img src="images/gamma.png">
  <figcaption>
    <b>감마:</b> y축을 기준으로 한 회전이며, 장치 왼쪽과 오른쪽이 지면에서 등거리에
    있을 때 0&deg;입니다.  장치의
    오른쪽이 지면을 향해 기울어질수록 값이 증가합니다. 
  </figcaption>
</figure>






## 장치 방향 




장치 방향 이벤트는 장치의 전후좌우 기울기와 방향(폰이나 랩톱에 나침반이 있는 경우)을 포함하는 회전 데이터를 반환합니다.


### TL;DR {: .hide-from-toc }
- 가급적 사용하지 않습니다.
- 지원 여부를 테스트합니다.
- 모든 방향 이벤트에 대해 UI를 업데이트하지 마십시오. 대신 requestAnimationFrame과 동기화하십시오.


### 장치 방향 이벤트를 사용하는 경우

장치 방향 이벤트의 용도는 몇 가지가 있습니다.  예:

* 사용자의 움직임에 따라 지도를 업데이트합니다.
* UI를 미세하게 조정합니다(예: 시차 효과(paralax effect) 추가).
* GeoLocation과 결합하여 턴바이턴 내비게이션에 사용할 수 있습니다.


### 지원 확인 및 이벤트 수신 대기

`DeviceOrientationEvent`를 수신 대기하려면 먼저 이벤트가
브라우저에서 지원되는지 여부를 확인합니다.  그런 다음, 이벤트 리스너를 `deviceorientation` 이벤트를 수신 대기하는 `window` 
개체에 연결합니다. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori"   adjust_indentation="auto" %}
</pre>

### 장치 방향 이벤트 처리

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




## 장치 모션 




장치 모션은 특정 시점에서 장치에 적용되는 가속력과 회전 속도에 대한 정보를 제공합니다.


### TL;DR {: .hide-from-toc }
- 현재 장치 모션이 필요한 경우 장치 모션을 사용합니다.
- <code>rotationRate</code>는 &deg;/초 단위로 제공됩니다.
- <code>acceleration</code> 및 <code>accelerationWithGravity</code>는 m/초<sup>2</sup> 단위로 제공됩니다.
- 브라우저 구현 간 차이점을 인식합니다.


### 장치 모션 이벤트를 사용하는 경우

장치 모션 이벤트를 사용하는 활용 사례로는 몇 가지가 있습니다.  예를 들면 다음과 같습니다.

* 흔들기 제스처를 통해 데이터 새로 고침
* 게임에서 캐릭터의 점프 또는 이동
* 건강 및 피트니스 앱용


### 지원 확인 및 이벤트 수신 대기

`DeviceMotionEvent`를 수신 대기하려면 점검을 통해 이벤트가
브라우저에서 지원되는지 여부를 확인해야 합니다.  그런 다음, 이벤트 리스너를 `devicemotion` 이벤트를 수신 대기하는 `window` 
개체에 연결합니다. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmot"   adjust_indentation="auto" %}
</pre>

### 장치 모션 이벤트 처리

장치 모션 이벤트는 정기적인 간격으로 발생하고 특정 시점에서 장치의
회전(&deg;/초) 및 가속도(m/초<sup>2</sup>)에
대한 데이터를 반환합니다.  일부 장치에는 중력 효과를 배제하는 하드웨어가
없습니다.

이 이벤트는 
<a href="#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="#device-frame-coordinate">`acceleration`</a>
(중력 효과 배제), 
<a href="#rotation-data">`rotationRate`</a> 및 `interval` 등 4가지 속성을 반환합니다.

예를 들어, 화면이 위를 향한 상태로 평평한 테이블에 폰이 놓여
있는 경우는 다음과 같습니다.

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
      <td data-th="State">오른쪽 위로 이동함</td>
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
      <td data-th="State">오른쪽 위로 이동함</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14.81, 0]</td>
    </tr>
  </tbody>
</table>

#### 샘플: 개체의 최대 가속도 계산

장치 모션 이벤트를 사용하는 방법 중 하나로 개체의 최대 가속도를
계산하는 것이 있습니다.  예를 들어, 사람의 점프 동작에 대한 최대 가속도를
계산합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/native-hardware/device-orientation/_code/jump-test.html" region_tag="devmothand"   adjust_indentation="auto" %}
</pre>

시작! 버튼을 누른 후 사용자에게 점프하라고 지시합니다!  그 동안
페이지가 최대(및 최소) 가속도 값을 저장하고 점프 후
 최대 가속도를 표시합니다.

