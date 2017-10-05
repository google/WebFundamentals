project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools의 Timeline 패널을 사용하면 애플리케이션에서 작업이 실행될 때 모든 작업을 기록하고 분석할 수 있습니다. 이는 애플리케이션에서 인지된 성능 문제를 조사하는 데 가장 좋은 출발점입니다.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-06-08 #}

# 타임라인 도구 사용법 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools의 <em>Timeline</em> 패널을 사용하면 애플리케이션에서 
작업이 실행될 때 모든 작업을 기록하고 분석할 수 있습니다. 이는 애플리케이션에서
인지된 성능 문제를 조사하는 데 가장 좋은
출발점입니다.

![타임라인 도구](imgs/timeline-panel.png)


### TL;DR {: .hide-from-toc }
- 타임라인 기록을 만들어 페이지 로드 또는 사용자 상호작용 후 발생한 모든 이벤트를 분석합니다.
- Overview 창에서 FPS, CPU 및 네트워크 요청을 볼 수 있습니다.
- Flame Chart 내에서 이벤트를 클릭하면 그에 대한 세부정보를 볼 수 있습니다.
- 기록의 한 부분을 확대하면 분석이 한결 쉬워집니다.


## Timeline 패널 개요 {:#timeline-overview}

Timeline 패널은 네 개의 창으로 구성되어 있습니다.

1. **Controls**. 기록을 시작하고 기록을 중단하거나 
기록 중에 캡처된 정보를 구성합니다. 
2. **Overview**. 페이지 성능에 대한 고차원적인 요약을 제공합니다. 이에 대한 자세한 내용은 
아래를 참조하세요. 
3. **Flame Chart** CPU 스택 추적을 시각화한 것입니다. 

   **Flame Chart**에는 세로 방향의 점선이 한 개 내지 세 개까지 표시될 수 있습니다. 
파란색 선은 `DOMContentLoaded` 이벤트를 나타냅니다. 녹색 선은 
첫 페인트까지의 시간을 나타냅니다. 빨간색 선은 `load` 이벤트를 나타냅니다.

4. **Details**. 이벤트를 선택하면 이 창에 해당 이벤트에 대한 자세한 정보가 
표시됩니다. 선택한 이벤트가 없는 경우, 이 창에는 선택한 타임 프레임에 대한
정보가 표시됩니다. 

![주석 처리된 Timeline 패널](imgs/timeline-annotated.png)

### Overview 창

**Overview** 창은 세 개의 그래프로 이루어져 있습니다.

1. **FPS**. 초당 프레임 수입니다. 녹색 막대가 높이 올라갈수록 
FPS가 높은 것입니다. FPS 그래프 위에 있는 빨간색 블록은 긴 프레임을 의미하는데, 이것은 
[버벅거림][jank] 발생 후보일 가능성이 높습니다. 
2. **CPU**. CPU 리소스입니다. 이 [영역 차트][ac]를 보면 CPU 리소스를 사용한 이벤트의 유형을
알 수 있습니다.
3. **NET**. 각 색상의 막대는 리소스를 나타냅니다. 막대 길이가 길수록 
리소스를 회수하는 데 시간이 오래 걸렸다는 뜻입니다. 각 막대의 색이 옅은 부분은 
대기 시간(리소스가 요청된 시간부터 첫 바이트를 
다운로드하는 데까지 걸린 시간)을 나타냅니다. 색이 짙은 부분은 
전송 시간(첫 바이트부터 마지막 바이트를 다운로드하는 데까지 걸린 
시간)을 나타냅니다.

   막대에 색상이 지정되는 방식은 다음과 같습니다. 
<!-- source: https://goo.gl/eANVFf -->
   
   * HTML 파일은 **<span style="color:hsl(214, 67%, 66%)">파란색</span>**입니다.
   * 스크립트는 **<span style="color:hsl(43, 83%, 64%)">노란색</span>**입니다.
   * 스타일시트는 **<span style="color:hsl(256, 67%, 70%)">보라색</span>**입니다.
   * 미디어 파일은 **<span style="color:hsl(109, 33%, 55%)">녹색</span>**입니다.
   * 기타 리소스는
     **<span style="color:hsl(0, 0%, 70%)">회색</span>**입니다.

![Overview 창, 주석 지정](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart 
[jank]: /web/fundamentals/performance/rendering/

## 기록 만들기

*페이지 로드*의 기록을 만들려면 **Timeline** 패널을 열어
기록하고자 하는 페이지를 연 다음 해당 페이지를 새로 고칩니다. **Timeline**
패널이 페이지 새로고침을 자동으로 기록합니다.

*페이지 상호작용*의 기록을 만들려면 **Timeline** 패널을 열고
**Record** 버튼
(![기록 버튼](imgs/record-off.png){:.inline})을 누르거나 단축키 <kbd>Cmd</kbd>+<kbd>E</kbd>(Mac) 또는 <kbd>Ctrl</kbd>+<kbd>E</kbd>
(Windows / Linux)를 눌러 기록을 시작합니다.
 **Record** 버튼은 기록 중에는 빨간색으로 변합니다. 페이지 상호작용을
수행한 다음 **Record** 버튼을 누르거나
단축키를 다시 입력하면 기록이 중단됩니다.

기록을 마치면 DevTools가 기록 중 사용자에게 가장 중요한
부분이 어디인지 추측하여 자동으로 해당 부분을 확대합니다.

### 기록 도움말

* **기록은 가급적 짧을수록 좋습니다**. 기록이 짧아야 분석하기 
쉽기 때문입니다.
* **불필요한 작업은 피하세요.** 기록하고 분석하고자 하는 활동에 관련 없는 다른 작업(마우스 클릭, 네트워크 로드 
등)은 피하는 것이 좋습니다.
  예컨대 Login
 버튼을 클릭한 다음 발생하는 이벤트를 기록하고자 하는 경우 페이지를 스크롤하거나 이미지를 로드하는 등 다른 작업도 함께 하지 마세요.
* **브라우저 캐시를 비활성화합니다.** 네트워크 작업을 기록할 때에는 
DevTools 설정 패널 또는 
[**Network conditions**][nc] 창에서 브라우저 캐시를 비활성화하는 것이 좋습니다.
* **확장 프로그램을 비활성화합니다**. Chrome 확장 프로그램을 사용하면 애플리케이션의 
타임라인 기록에 무관한 노이즈가 추가될 수 있습니다. Chrome 창을
  [incognito 모드][incognito]로 열거나 새 
  [Chrome 사용자 프로필][new chrome profile]을 만들어 환경에 확장 프로그램이 없도록
  하세요.

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## 기록 세부정보 보기

**Flame Chart**에서 이벤트를 선택하면 **Details** 창에 해당 이벤트에 대한
자세한 정보가 표시됩니다.

![Details 창](imgs/details-pane.png)

일부 탭(예: **Summary**)은 이벤트 유형을 불문하고 모두 표시됩니다. 다른 탭은 
특정 이벤트 유형에서만 이용할 수 있습니다. 각 기록 유형에 대한 자세한 내용은 [타임라인 이벤트
참조][event reference]를 참조하세요.

[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## 기록 중 스크린샷 캡처 {:#filmstrip}

**Timeline** 창은 페이지 로드 중 스크린샷을 캡처할 수 있습니다. 이 기능을 일명 
**필름스트립**이라고 합니다.

먼저 **Controls** 창의 **Screenshots** 확인란을 활성화해야
기록의 스크린샷을 캡처할 수 있습니다. 스크린샷은
**Overview** 창 아래에 표시됩니다.

![필름스트립을 사용한 타임라인 기록](imgs/timeline-filmstrip.png)

마우스를 **Screenshots** 또는 **Overview** 창 위로 가져가면 기록에서 해당 지점의 확대된 스크린샷을
볼 수 있습니다. 마우스를 좌우로 움직이면 기록의 애니메이션을
시뮬레이트할 수 있습니다.

<video src="animations/hover.mp4" autoplay muted loop controls></video>

## 자바스크립트 프로필 {:#profile-js}

기록을 하기 전에 **JS Profile** 확인란을 활성화해야 타임라인 기록의
자바스크립트 스택을 캡처할 수 있습니다. JS 프로파일러가 활성화되면 
Flame Chart에 호출된 자바스크립트 함수가 모두 표시됩니다. 

![JS 프로필이 활성화된 Flame Chart](imgs/js-profile.png)

## 페인팅 프로필 {:#profile-painting}

기록을 하기 전에 **Paint** 확인란을 활성화해야 
**Paint** 이벤트를 더 자세히 살펴볼 수 있습니다. 페인트 프로필을 활성화한 상태에서
**Paint** 이벤트를 클릭하면 새로운 **Paint Profiler** 탭이
**Details** 창에 표시되어 이벤트에 대해 더 상세한 정보를 보여줍니다.

![페인트 프로파일러](imgs/paint-profiler.png)

### 렌더링 설정 {:#rendering-settings}

기본 DevTools 메뉴를 열고 **More tools** > **Rendering settings**를
선택하면 페인트 문제를 디버그할 때 유용한 여러 가지 렌더링 설정에 액세스할 수 있습니다.
렌더링 설정은 **Console** 창 옆에 탭으로 열립니다(창이 숨겨져 있는 경우,
<kbd>esc</kbd>를 누르면 창이 표시됨).

![렌더링 설정](imgs/rendering-settings.png)

## 기록 검색

이벤트를 살펴볼 때에는 한 가지 유형의 이벤트에만 집중하고자 할 수 있습니다. 예를 
들어, 모든 `Parse HTML` 이벤트의 세부정보를 봐야 하는 경우를 생각해봅시다. 

**Timeline**에 포커스가 맞춰진 상태에서 <kbd>Cmd</kbd>+<kbd>F</kbd>(Mac) 또는 <kbd>Ctrl</kbd>+<kbd>F</kbd>
(Windows/Linux)를 누르면 검색 툴바가 열립니다.
검사하고자 하는 이벤트 유형의 이름, 예를 들어 `Event`를 입력합니다.

이 툴바는 현재 선택한 시간대에만 적용됩니다. 선택한 시간대를 
벗어난 모든 이벤트는 결과에 포함되지 않습니다. 

위쪽 및 아래쪽 화살표를 사용하면 결과 목록을 시간순으로 이동할 수 있습니다. 따라서, 
첫 번째 결과가 선택한 시간대 내에서 가장 일찍 일어난 이벤트이며 
마지막 결과가 마지막 이벤트를 나타냅니다. 위쪽 또는 
아래쪽 화살표를 누를 때마다 새로운 이벤트가 선택되므로 해당 이벤트의 세부정보를 
**Details** 창에서 볼 수 있습니다. 위쪽 및 아래쪽 화살표를 누르는 것은
**Flame Chart**에서 이벤트를 클릭하는 것과 같습니다.

![검색 툴바](imgs/find-toolbar.png)

## 시간대 영역 확대 {:#zoom}

기록의 한 부분을 확대하면 분석이 한결 쉬워집니다. 기록의 
한 영역만 확대하려면 **Overview** 창을 사용하면 됩니다. 확대하고 나면
**Flame Chart**가 같은 영역과 일치하도록 자동으로 확대됩니다.

![타임라인 기록의 영역 확대](imgs/zoom.png)

타임라인을 확대하는 방법

* **Overview** 창에서 마우스로 타임라인의 선택한 영역을 끌어오면 됩니다.
* 눈금자 영역에서 회색 슬라이더를 조정합니다.

영역을 선택한 후에 <kbd>W</kbd>,<kbd>A</kbd>,
<kbd>S</kbd> 및 <kbd>D</kbd> 키를 사용하여 선택을 조정할 수 있습니다. <kbd>W</kbd>
와 <kbd>S</kbd>는 각각 확대 및 축소 기능을 제공합니다. <kbd>A</kbd>와
<kbd>D</kbd>는 각각 좌우로 이동합니다.

## 기록 저장 및 로드

기록을 저장하고 열려면
**Overview** 또는 **Flame Chart** 창 안쪽을 마우스 오른쪽 버튼으로 클릭하여 관련 옵션을 선택합니다.

![기록 저장 및 열기](imgs/save-open.png)


{# wf_devsite_translation #}
