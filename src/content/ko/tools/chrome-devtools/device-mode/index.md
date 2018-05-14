project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome의 Device Mode에서 가상 기기를 사용하여 모바일 우선 웹사이트를 빌드할 수 있습니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Device Mode로 휴대기기 시뮬레이션 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Chrome DevTools의 Device Mode를 사용하면 모바일 우선의 완벽한 응답형 웹사이트를 빌드할 수 있습니다. 이 모드를 사용하여 다양한 기기와 기능을 시뮬레이션하는 방법을 알아보세요.

Warning: Device Mode는 휴대기기에서 보이는 사이트를 매우 근사하게 보여주지만
전체 그림을 보려면
실제 기기에서 테스트해야 합니다. 예를 들어 DevTools는 휴대기기의
성능 특성을 에뮬레이트할 수 없습니다.


## 요약

* 레티나 디스플레이 등 [여러 화면 크기와 해상도](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)에서 사이트를 에뮬레이트합니다.
* 시각화와 [CSS 미디어 쿼리 검사](/web/tools/chrome-devtools/iterate/device-mode/media-queries)를 통해 응답형 디자인을 완성합니다.
* [네트워크 에뮬레이터](/web/tools/chrome-devtools/network-performance/network-conditions)를 사용하면 다른 탭으로의 트래픽에 영향을 주지 않고 사이트 성능을 평가할 수 있습니다.
* 터치 이벤트, 위치정보 및 기기 방향 등에 대해 정확하게 [기기 입력을 시뮬레이션](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)할 수 있습니다.

## Device Mode 전환{: #toggle }

**Device Mode** 버튼을 전환하여 Device Mode를 켜거나 끕니다.

![Device Mode의 첫 시작](imgs/device-mode-initial-view.png)

Device Mode가 켜져 있으면 아이콘은 파란색입니다
(![Device Mode 활성화](imgs/device-mode-on.png)).

Device Mode가 꺼져 있으면 아이콘은 회색입니다
(![Device Mode 비활성화](imgs/device-mode-off.png)).

Device Mode는 기본적으로 활성화되어 있습니다. 

<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>(Mac) 또는
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>(Windows, Linux)을 누르면 Device Mode를 전환할 수 있습니다.
이 단축키를 사용하려면 마우스 포커스가 DevTools 창에 맞춰져 있어야 합니다.
마우스 포커스가 뷰포트에 있는 경우, [Chrome의 사용자 전환
단축키](https://support.google.com/chrome/answer/157179)를 트리거하게 됩니다.






{# wf_devsite_translation #}
