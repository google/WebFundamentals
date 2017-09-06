project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: DevTools의 모양을 변경하고 숨겨진 기능에 액세스합니다.

{# wf_updated_on: 2016-07-26 #}
{# wf_published_on: 2016-03-28 #}

# DevTools 구성 및 사용자설정 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

DevTools의 모양을 변경하고 숨겨진 기능에 
액세스합니다.


### TL;DR {: .hide-from-toc }
- 기본 메뉴 및 Settings 메뉴를 엽니다.
- DevTools의 모양을 사용자설정합니다.
- 숨겨진 기능에 액세스합니다.


## 기본 메뉴 열기 {:#main-menu}

DevTools의 **기본 메뉴**는 DevTools의 모양 구성,
추가 도구 액세스, Settings 열기 등을 위한 드롭다운 메뉴입니다.

기본 메뉴를 열려면 DevTools 창의 오른쪽 위에 있는
**기본 메뉴** 버튼을 클릭합니다.

![기본 메뉴](images/main-menu.png)

## Settings 열기 {:#settings}

DevTools Settings를 열려면 DevTools에 포커스를 둔 상태에서 <kbd>F1</kbd> 키를
누르거나 [기본 메뉴를 연](#main-menu) 다음 **Settings**를 선택합니다.

## 명령 메뉴 열기 {:#command-menu}

명령 메뉴를 열려면 <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Mac) 또는
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd>(Windows, Linux)를
누릅니다.

![명령 메뉴](images/command-menu.png)

## 패널 탭 순서 재정렬 {:#panel-tabs}

패널 탭을 클릭하고 누른 채 드래그하여 순서를 변경합니다. 맞춤 탭 순서는
DevTools 세션 동안 유지됩니다.

예를 들어, 기본적으로 **Network** 탭은 일반적으로 왼쪽에서 네 번째에 있습니다.

![순서 재정렬 전](images/before-reorder.png)

탭을 원하는 위치(왼쪽에서 첫 번째)로 드래그할 수 있습니다.

![순서 재정렬 후](images/after-reorder.png)

## DevTools 배치 사용자설정 {:#placement}

페이지 하단의 DevTools를 페이지 오른쪽에 도킹하거나 
새 창에서 열 수 있습니다. 

DevTools의 배치를 변경하려면, 우선 [기본 메뉴를 열고](#main-menu) 
**별도 창으로 도킹 해제**
(![도킹 해제 버튼](images/undock.png){:.inline})
 버튼, **하단에 도킹**
(![하단에 도킹 버튼](images/dock-bottom.png){:.inline})
 버튼 또는 
**오른쪽에 도킹**
(![오른쪽에 도킹 버튼](images/dock-right.png){:.inline})
 버튼을 선택합니다. 

## 어두운 테마 사용 {:#dark-theme}

어두운 DevTools 테마를 사용하려면 [DevTools Settings를 열고](#settings), 
**Preferences** 페이지로 이동한 다음 **Appearance** 섹션을 찾아 
**Theme** 드롭다운 메뉴에서 **Dark**를 선택합니다.

![어두운 테마](images/dark-theme.png)

## 창 열기 및 닫기 탭 {:#drawer-tabs}

<kbd>Esc</kbd> 키를 누르면 DevTools **창**을 열고 닫을 수 있습니다. 아래
스크린샷은 **Console** 창이 아래쪽에 열려 있는 상태인 **Elements** 패널의
예를 보여줍니다.

![창이 있는 Elements 패널](images/drawer.png)

이 창에서 Console에서 명령을 실행하고, 애니메이션 
검사기를 보고, 네트워크 구성 및 렌더링 설정을 구성하고, 문자열 
및 파일을 검색하고, 모바일 센서를 에뮬레이트할 수 있습니다.

창이 열린 상태에서 **Console** 탭 왼쪽에 있는
세 점 아이콘(![세 점 아이콘](images/three-dot.png){:.inline})을
클릭한 다음 드롭다운 메뉴 옵션 중 하나를 선택하여
다른 탭을 엽니다.

![창 탭 메뉴](images/drawer-tabs.png)

## 실험 사용 설정 {:#experiments}

DevTools Experiments를 사용 설정하면 **Experiments**라는
새 페이지가 DevTools Settings에 표시됩니다. 이 페이지에서 실험 기능을
사용 설정하거나 중지할 수 있습니다.

Experiments를 사용 설정하려면 `chrome://flags/#enable-devtools-experiments`로
이동하여 **Enable**을 클릭합니다. 페이지 하단에 있는 **Relaunch Now** 버튼을 
클릭합니다. 

이제 DevTools Settings를 열면 **Experiments**라는 새 페이지가
표시됩니다.

![DevTools Experiments](images/experiments.png)

## 인쇄 미디어 에뮬레이트 {:#emulate-print-media}

페이지를 인쇄 미리보기 모드로 보려면 [DevTools 
기본 메뉴를 열고](#main-menu) **More Tools** > **Rendering Settings**를 선택한 다음 
드롭다운 메뉴를 **print**로 설정한 상태로 **Emulate media** 확인란을 선택합니다.

![인쇄 미리보기 모드 사용 설정](images/emulate-print-media.png)

## HTML 주석 표시 {: #show-html-comments }

**Elements** 패널에 HTML 주석을 표시하거나 숨기려면
[**Settings**를 열고](#settings) **Preferences** 패널로 이동하여
**Elements** 섹션을 찾은 다음 **Show HTML comments** 확인란을 전환합니다.


{# wf_devsite_translation #}
