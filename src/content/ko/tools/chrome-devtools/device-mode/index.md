project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Chrome의 Device Mode에서 가상 기기를 사용하여 모바일 우선 웹사이트를 빌드할 수 있습니다.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

[capture]: /web/tools/chrome-devtools/images/shared/capture-settings.png
[customize]: /web/tools/chrome-devtools/images/shared/customize-and-control-devtools.png

# Chrome DevTools에서 Device Mode로 휴대기기 시뮬레이션 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Device Mode를 이용해 페이지가 휴대기기에서 어떻게 나타나고 작동하는지 짐작할 수 있습니다.

Device Mode는 휴대 기기 시뮬레이션을
돕는 Chrome DevTools의 여러 기능의 집단을 이르는 말입니다. 이러한 기능에는 다음이 포함됩니다.

* [모바일 표시 영역 시뮬레이션](#viewport)
* [네트워크 스로틀링](#network)
* [CPU 스로틀링](#cpu)
* [위치정보 시뮬레이션](#geolocation)
* [방향 설정](#orientation)

## 제한 사항 {: #limitations }

Device Mode를 휴대 기기에서 페이지가 어떻게 나타나고 어떤 경험을 주는지에 대한 [1차 근사값][approximation]으로{:.external} 
생각해야 합니다. Device Mode를 이용하면 코드를 휴대 기기에서
직접 실행할 필요가 없습니다. 노트북이나 데스크탑에서 모바일 사용자 환경을 시뮬레이션합니다.

[approximation]: https://en.wikipedia.org/wiki/Order_of_approximation#First-order

DevTools에서 절대로 시뮬레이션할 수 없는 휴대기기의 몇 가지 측면이 있습니다. 예를 들어,
모바일 CPU의 아키텍처는 노트북이나
데스크탑 CPU의 아키텍처와 매우 다릅니다. 미심쩍을 때는 실제로 페이지를 휴대기기에서 실행하는 것이 가장 좋습니다. 
[원격 디버깅](/web/tools/chrome-devtools/remote-debugging/)을 사용하여 페이지의 코드가 휴대 기기에서 실제로 실행되는 동안
노트북이나 데스크탑에서 페이지 코드를 보고, 변경하고, 디버깅하거나 프로파일링하세요.

## 모바일 표시 영역 시뮬레이션 {: #viewport }

**Toggle Device Toolbar** ![기기 툴바 전환][TDB]을 클릭하여{: .inline-icon } 모바일 표시 영역을 시뮬레이션하는
UI를 엽니다.

[TDB]: /web/tools/chrome-devtools/images/shared/toggle-device-toolbar.png

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar."/>
  <figcaption>
    <b>그림 1</b>. Device Toolbar.
  </figcaption>
</figure>

기본적으로 Device Toolbar는 Responsive Viewport 모드에서 열립니다. 

### Responsive Viewport 모드 {: #responsive }

핸들을 드래그하여 필요한 크기로 표시 영역의 크기를 조절합니다. 또는, 너비 및 높이 상자에
특정 값을 입력합니다. **그림 2**에서 너비는 `628`, 높이는
`662`로 설정되었습니다.

<figure>
  <img src="imgs/responsive-handles.png"
       alt="Responsive Viewport 모드일 때 표시 영역의 크기를 변경하기 위한 핸들"/>
  <figcaption>
    <b>그림 2</b>. Responsive Viewport 모드일 때 표시 영역의 크기를 변경하기 위한 핸들
  </figcaption>
</figure>

#### Show media queries {: #queries }

미디어 쿼리 중단점을 표시 영역 위에 표시하려면, **More options**를 클릭한 다음 **Show media
queries**를 선택합니다.

<figure>
  <img src="imgs/show-media-queries.png"
       alt="Show media queries."/>
  <figcaption>
    <b>그림 3</b>. Show media queries.
  </figcaption>
</figure>

중단점을 클릭하여 표시 영역의 너비를 변경함으로써 중단점을 트리거시킵니다.

<figure>
  <img src="imgs/breakpoint.png"
       alt="중단점을 클릭하여 표시 영역의 너비를 변경합니다."/>
  <figcaption>
    <b>그림 4</b>. 중단점을 클릭하여 표시 영역의 너비를 변경합니다.
  </figcaption>
</figure>

### Mobile Device Viewport 모드 {: #device }

특정 휴대 기기의 치수를 시뮬레이션하려면 **Device** 목록에서 기기를 선택합니다.

<figure>
  <img src="imgs/device-list.png"
       alt="Device 목록."/>
  <figcaption>
    <b>그림 5</b>. Device 목록
  </figcaption>
</figure>

#### 표시 영역을 가로 모드 방향으로 회전 {: #landscape }

**Rotate** ![회전](imgs/rotate.png)을 클릭하여{: .inline-icon } 표시 영역을 가로 모드 방향으로 회전합니다.

<figure>
  <img src="imgs/landscape.png"
       alt="가로 모드 방향."/>
  <figcaption>
    <b>그림 6</b>. 가로 모드 방향.
  </figcaption>
</figure>

**Device Toolbar**가 좁으면 **Rotate** 버튼이 사라집니다.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar."/>
  <figcaption>
    <b>그림 7</b>. Device Toolbar.
  </figcaption>
</figure>

[방향 설정](#orientation)도 참조하세요.

#### Show device frame {: #frame }

iPhone 6와 같은 특정 휴대 기기의 치수를 시뮬레이션 하려면 **More options**를
연 다음 **Show device frame**을 선택하여 표시 영역 주변에 물리적 기기 프레임을 표시합니다.

참고: 특정 기기의 기기 프레임을 찾을 수 없다면, DevTools에는
해당 특정 옵션을 갖추고 있지 않다는 것을 의미합니다.

<figure>
  <img src="imgs/show-device-frame.png"
       alt="Show device frame."/>
  <figcaption>
    <b>그림 8</b>. Show device frame.
  </figcaption>
</figure>

<figure>
  <img src="imgs/iphone-frame.png"
       alt="iPhone 6의 기기 프레임."/>
  <figcaption>
    <b>그림 9</b>. iPhone 6의 기기 프레임.
  </figcaption>
</figure>

### Show rulers {: #rulers }

**More options**를 클릭한 다음 **Show rulers**를 선택하여 표시 영역
상단과 왼쪽에 눈금자를 표시합니다. 눈금자의 크기 단위는 픽셀입니다.

<figure>
  <img src="imgs/show-rulers.png"
       alt="Show rulers."/>
  <figcaption>
    <b>그림 10</b>. Show rulers.
  </figcaption>
</figure>

<figure>
  <img src="imgs/rulers.png"
       alt="표시 영역 상단 및 왼쪽의 눈금자."/>
  <figcaption>
    <b>그림 11</b>. 표시 영역 상단 및 왼쪽의 눈금자.
  </figcaption>
</figure>

### 표시 영역 확대/축소 {: #zoom }

**Zoom** 목록을 사용하여 확대/축소합니다.

<figure>
  <img src="imgs/zoom-viewport.png"
       alt="Zoom."/>
  <figcaption>
    <b>그림 11</b>. Zoom
  </figcaption>
</figure>

## 네트워크 및 CPU 스로틀링 {: #throttle }

네트워크 및 CPU를 스로틀링하려면 **Throttle** 목록에
**Mid-tier mobile** 또는 **Low-end mobile**를 선택합니다.

<figure>
  <img src="imgs/throttling.png"
       alt="Throttle 목록."/>
  <figcaption>
    <b>그림 12</b>. Throttle 목록.
  </figcaption>
</figure>

**Mid-tier mobile**은 빠른 3G를 시뮬레이션하고 컴퓨터의 CPU를 스로틀링하여 일반 속도보다 4배
느리게 합니다. **Low-end mobile**은 느린 3G를 시뮬레이션하고 컴퓨터의 CPU를 스로틀링하여 일반 속도보다 6배 느리게 합니다.
스로틀링은 여러분의 노트북이나 데스크탑의 일반 성능에 상대적이라는 점을 유념하세요. 

**Throttle**목록은 **Device Toolbar**가 좁으면 숨겨집니다.

<figure>
  <img src="imgs/device-toolbar.png"
       alt="Device Toolbar."/>
  <figcaption>
    <b>그림 13</b>. Device Toolbar.
  </figcaption>
</figure>

### CPU만 스로틀링 {: #cpu }

네트워크는 제외하고 CPU만 스로틀링하려면, **Performance** 패널로 이동하여
**Capture Settings** ![설정 캡처][capture]를 클릭한 다음{:.inline-icon},
**CPU** 목록에서 **4x slowdown** 또는 **6x slowdown**을 선택합니다.

<figure>
  <img src="imgs/cpu.png"
       alt="CPU 목록."/>
  <figcaption>
    <b>그림 14</b>. CPU 목록
  </figcaption>
</figure>

### 네트워크만 스로틀링 {: #network }

CPU를 제외한 네트워크만 스로틀링하려면 **Network** 패널로 이동하여 **Throttle** 목록에서
**Fast 3G** 또는 **Slow 3G**를 선택합니다.

<figure>
  <img src="imgs/network.png"
       alt="Throttle 목록."/>
  <figcaption>
    <b>그림 14</b>. Throttle 목록.
  </figcaption>
</figure>

또는 <kbd>Cmmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Mac)를 누르거나 
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Windows, Linux, Chrome OS)를 눌러
Command Menu를 열고, `3G`를 입력한 다음 **Enable fast 3G throttling** 또는
**Enable slow 3G throttling**을 선택합니다.

<figure>
  <img src="imgs/commandmenu.png"
       alt="Command Menu."/>
  <figcaption>
    <b>그림 15</b>. Command Menu
  </figcaption>
</figure>

**Performance** 패널에서도 네트워크 스로틀링을 설정할 수 있습니다. **Capture Settings** ![설정 캡처][capture]를
클릭한 다음,{: .inline-icon } **Network** 목록에서 **Fast 3G** 또는 **Slow 3G**를
선택합니다.

<figure>
  <img src="imgs/network2.png"
       alt="Performance 패널에서 네트워크 스로틀링 설정."/>
  <figcaption>
    <b>그림 16</b>. Performance 패널에서 네트워크 스로틀링 설정
  </figcaption>
</figure>

## 위치정보 재정의 {: #geolocation }

위치정보 재정의 UI를 열려면 **Customize and control DevTools**
![DevTools 사용자설정 및 제어][customize]를 클릭하고{: .inline-icon } **More tools** > **Sensors**를
선택합니다.

<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>그림 17</b>. Sensors
  </figcaption>
</figure>

또는 <kbd>Cmmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Mac)를 누르거나 
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Windows, Linux, Chrome OS)를 눌러
Command Menu를 열고, `Sensors`를 입력한 다음 **Show Sensors**를 선택합니다.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>그림 18</b>. Show Sensors
  </figcaption>
</figure>

**Geolocation** 목록의 프리셋 중 하나를 선택하거나 **Custom location**을 선택하여
자신의 좌표를 입력하고, 또는 **Location unavailable**을 선택하여 위치정보가 오류 상태일 때
어떻게 행동하는지 테스트할 수 있습니다.

<figure>
  <img src="imgs/geolocation.png"
       alt="위치정보"/>
  <figcaption>
    <b>그림 19</b>. 위치정보
  </figcaption>
</figure>

## 방향 설정 {: #orientation }

방향 UI를 열려면 **Customize and control DevTools**
![DevTools 사용자설정 및 제어][customize]를 클릭하고{: .inline-icon } **More tools** > **Sensors**를
선택합니다.


<figure>
  <img src="imgs/sensors.png"
       alt="Sensors"/>
  <figcaption>
    <b>그림 20</b>. Sensors
  </figcaption>
</figure>

또는 <kbd>Cmmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Mac)를 누르거나 
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Windows, Linux, Chrome OS)를 눌러
Command Menu를 열고, `Sensors`를 입력한 다음 **Show Sensors**를 선택합니다.

<figure>
  <img src="imgs/show-sensors.png"
       alt="Show Sensors"/>
  <figcaption>
    <b>그림 21</b>. Show Sensors
  </figcaption>
</figure>

**Orientation** 목록의 프리셋 중 하나를 선택하거나 **Custom orientation**을 선택하여
알파, 베타, 감마값을 직접 입력합니다.

<figure>
  <img src="imgs/orientation.png"
       alt="방향"/>
  <figcaption>
    <b>그림 22</b>. 방향
  </figcaption>
</figure>

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}

의견을 남기는 다른 방법은 [DevTools 커뮤니티 가입하기](/web/tools/chrome-devtools/#community)를 
참조하세요.
