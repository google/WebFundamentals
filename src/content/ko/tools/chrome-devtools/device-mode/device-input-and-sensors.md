project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 터치 스크린, GPS 칩과 가속도계는 대부분의 데스크톱에 없는 항목이라 테스트하기 어려울 수 있습니다. Chrome DevTools 센서 에뮬레이터는 일반 휴대기기 센서를 에뮬레이트하여 테스트 부담을 줄여줍니다.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# 센서 에뮬레이트: 위치정보 및 가속도계 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

GPS 칩과 가속도계는 대부분의 데스크톱에는 없는 항목이라 테스트하기 어려울 수 있습니다. Chrome DevTools 센서 에뮬레이션 패널은 일반 휴대기기 센서를 에뮬레이트하여 테스트 부담을 줄여줍니다.


### TL;DR {: .hide-from-toc }
- 위치정보 좌표를 에뮬레이트하여 위치정보 재정의를 테스트합니다.
- 기기 방향을 시뮬레이트하여 가속도계 데이터를 테스트합니다.


## 센서 컨트롤 액세스

<div class="wf-devtools-flex">
  <div>
    <p>Chrome DevTools 센서 컨트롤에 액세스하려면:</p>
    <ol>
      <li>DevTools 기본 메뉴를 엽니다. 그럼 다음,</li>
      <li><strong>More Tools</strong> 아래에서 <strong>Sensors</strong>를 클릭합니다.</li>
    </ol>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/navigate-to-sensors.png" alt="Sensors 패널로 이동">
  </div>
</div>

참고: 앱이 자바스크립트(예: Modernizr)를 사용하여 센서 온로드를 감지하는 경우, 센서 에뮬레이터를 활성화한 후 페이지를 다시 로드해야 합니다.

## 위치정보 데이터 재정의

휴대기기는 데스크톱과 달리 일반적으로 GPS 하드웨어를 사용하여 위치를 감지합니다. Sensors 창에서 <a href='http://www.w3.org/TR/geolocation-API/'>Geolocation API</a>와 함께 사용할 위치정보 좌표를 시뮬레이트할 수 있습니다.

<div class="wf-devtools-flex">
  <div>
    <p>에뮬레이션 창의 Sensors 창에서 <strong>Emulate geolocation coordinates</strong> 확인란을 선택하여 위치정보 에뮬레이션을 활성화합니다.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-geolocation.png" alt="위치정보 에뮬레이터가 활성화됨">
  </div>
</div>

이 에뮬레이터를 사용하여 `navigator.geolocation`의 위치 값을 재정의하거나, 위치정보 데이터를 이용할 수 없는 경우 사례를 시뮬레이트할 수도 있습니다.

## 가속도계 에뮬레이트(기기 방향)

<div class="wf-devtools-flex">
  <div>
    <p><a href='http://www.w3.org/TR/screen-orientation/'>Orientation API</a>에서 유입되는 가속도계 데이터를 테스트하려면 Sensors 창에서 <strong>Accelerometer</strong> 확인란을 선택하여 가속도계 에뮬레이터를 활성화합니다.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/emulation-drawer-accelerometer.png" alt="가속도계 컨트롤">
  </div>
</div>

다음과 같은 방향 매개변수를 조작할 수 있습니다.

<dl>
<dt><abbr title="alpha">α</abbr></dt>
<dd>Z축 기준 회전</dd>
<dt><abbr title="beta">β</abbr></dt>
<dd>좌우 기울기</dd>
<dt><abbr title="gamma">γ</abbr></dt>
<dd>앞뒤 기울기</dd>
</dl>

모델 가속도계를 클릭하여 원하는 방향으로 드래그할 수도 있습니다.

이 [기기 방향 데모](http://googlesamples.github.io/web-fundamentals/fundamentals/native-hardware/device-orientation/dev-orientation.html)를 사용하여 가속도계 에뮬레이터를 체험해 보세요.




{# wf_devsite_translation #}
