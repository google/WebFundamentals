---
title: "장치 모션"
description: "장치 모션은 특정 시점에서 장치에 적용되는 가속력과 회전 속도에 대한 정보를 제공합니다."
updated_on: 2014-10-21
key-takeaways:
  devmotion: 
    - 현재 장치 모션이 필요한 경우 장치 모션을 사용합니다.
    - <code>rotationRate</code>는 &deg;/초 단위로 제공됩니다.
    - <code>acceleration</code> 및 <code>accelerationWithGravity</code>는 m/초<sup>2</sup> 단위로 제공됩니다.
    - 브라우저 구현 간 차이점을 인식합니다.
---

<p class="intro">
  장치 모션은 특정 시점에서 장치에 적용되는 가속력과 회전 속도에 대한 정보를 제공합니다.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.devmotion %}

## 장치 모션 이벤트를 사용하는 경우

장치 모션 이벤트를 사용하는 활용 사례로는 몇 가지가 있습니다.  예를 들면 다음과 같습니다.

<ul>
  <li>흔들기 제스처를 통해 데이터 새로 고침</li>
  <li>게임에서 캐릭터의 점프 또는 이동</li>
  <li>건강 및 피트니스 앱용</li>
</ul>

## 지원 확인 및 이벤트 수신 대기

`DeviceMotionEvent`를 수신 대기하려면 점검을 통해 이벤트가
브라우저에서 지원되는지 여부를 확인해야 합니다.  그런 다음, 이벤트 리스너를 `devicemotion` 이벤트를 수신 대기하는 `window` 
개체에 연결합니다. 

{% include_code src=_code/jump-test.html snippet=devmot lang=javascript %}

## 장치 모션 이벤트 처리

장치 모션 이벤트는 정기적인 간격으로 발생하고 특정 시점에서 장치의
회전(&deg;/초) 및 가속도(m/초<sup>2</sup>)에
대한 데이터를 반환합니다.  일부 장치에는 중력 효과를 배제하는 하드웨어가
없습니다.

이 이벤트는 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="index.html#device-frame-coordinate">`acceleration`</a>
(중력 효과 배제), 
<a href="index.html#rotation-data">`rotationRate`</a> 및 `interval` 등 4가지 속성을 반환합니다.

예를 들어, 화면이 위를 향한 상태로 평평한 테이블에 폰이 놓여
있는 경우는 다음과 같습니다.

<table class="mdl-data-table mdl-js-data-table">
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

<table class="mdl-data-table mdl-js-data-table">
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

### 샘플: 개체의 최대 가속도 계산

장치 모션 이벤트를 사용하는 방법 중 하나로 개체의 최대 가속도를
계산하는 것이 있습니다.  예를 들어, 사람의 점프 동작에 대한 최대 가속도를
계산합니다.

{% include_code src=_code/jump-test.html snippet=devmothand lang=javascript %}

시작! 버튼을 누른 후 사용자에게 점프하라고 지시합니다!  그 동안
페이지가 최대(및 최소) 가속도 값을 저장하고 점프 후
 최대 가속도를 표시합니다.

