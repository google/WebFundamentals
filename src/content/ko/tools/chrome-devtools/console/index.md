project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools JavaScript 콘솔을 탐색하는 방법에 대해 자세히 알아봅니다.

{# wf_updated_on: 2016-02-01 #}
{# wf_published_on: 2015-05-10 #}

# 콘솔 사용 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

방법: DevTools Console을 열고 중복 
메시지를 스택하거나 자체 줄에 표시하고, 출력을 지우거나 유지하거나
파일에 저장하고, 출력을 필터링하고 추가
Console 설정에 액세스합니다.

### TL;DR {: .hide-from-toc }
- Console을 전용 패널로 열거나 다른 패널 옆에 창으로 엽니다.
- 중복 메시지를 스택하거나 자체 줄에 표시합니다.
- 페이지 사이의 출력을 지우거나 유지하거나 파일에 저장합니다.
- 출력을 심각도 레벨, 네트워크 메시지 숨기기 또는 정규 표현식 패턴으로 필터링합니다.

## 콘솔 열기

Console을 전체 화면에 표시되는 전용 패널로 액세스합니다.

![Console 패널](images/console-panel.png)

또는 다른 패널 옆에 열리는 창으로 액세스합니다.

![Console 창](images/console-drawer.png)

### 패널로 열기

전용 **Console** 패널로 열려면 다음 두 방법 중 하나를 사용합니다.

* <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows / Linux) 또는
  <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd class="kbd">J</kbd> (Mac)를 누릅니다.
* DevTools가 이미 열린 경우 **Console**  버튼을 누릅니다.

Console 패널을 열면  Console 창이 자동으로 접힙니다.

### 창으로 열기

Console을 다른 패널 옆의 창으로 열려면 다음 두 방법 중 하나를 사용합니다.

* DevTools에 포커스를 맞춘 상태에서 <kbd>Esc</kbd> 키를 누릅니다.
* **Customize and control DevTools** 버튼을 누른 다음 
  **Show console**을 누릅니다.

![콘솔 표시](images/show-console.png)

## 메시지 스태킹

메시지가 연속으로 반복되는 경우 메시지의 각
인스턴스를 새로운 줄에 출력하지 않고 Console이 메시지를 '스택'하고
왼쪽 여백에 숫자를 대신 표시합니다. 해당 숫자는 메시지가 반복된
횟수를 나타냅니다.

![메시지 스태킹](images/message-stacking.png)

각 로그에 대해 고유한 줄 입력을 선호하는 경우 DevTools 설정에서 **Show timestamps**를
활성화합니다.

![타임스탬프 표시](images/show-timestamps.png)

각 메시지의 타임스태프는 서로 다르므로 각 메시지는 자신의 줄에
표시됩니다.

![타임스탬프된 콘솔](images/timestamped-console.png)

## 콘솔 기록 관련 작업

### 기록 지우기 {: #clearing}

다음 방법을 통해 콘솔 기록을 지울 수 있습니다.

* Console을 마우스 오른쪽 버튼으로 클릭하고 **Clear console**을 누릅니다.
* Console에 `clear()`를 입력합니다.
* 자바스크립트 코드 내에서 `console.clear()`를 호출합니다.
* <kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd>
  (Mac, Windows, Linux)을 입력합니다.

### 기록 유지 {: #preserve-log}

 콘솔 맨 위에 있는 **Preserve log** 확인란을 활성화하여 페이지 새로고침 또는 변경 사이에
콘솔 기록을 유지합니다. Console을 지우거나
해당 탭을 닫을 때까지 메시지가 저장됩니다.

### 기록 저장

Console을 마우스 오른쪽 버튼으로 클릭하고 **Save as** 선택하여 콘솔의
출력을 로그 파일에 저장합니다.

![콘솔을 로그 파일에 저장](images/console-save-as.png)

## 실행 컨텍스트 선택 {: #execution-context }

아래 스크린샷에 파란색으로 강조된 드롭다운 메뉴는
**Execution Context Selector**입니다.

![Execution Context Selector](images/execution-context-selector.png)

일반적으로는 컨텍스트가 `top`(페이지 프레임 위쪽)에 설정됩니다.

다른 프레임과 확장 프로그램은 자체 컨텍스트로 작동합니다. 이런 다른
컨텍스트와 함께 작동하려면 드롭다운 메뉴에서 선택해야 합니다. 예를 들어
`<iframe>` 요소의 로깅 출력을 확인하고
컨텍스트 안에 있는 변수를 수정하고 싶다면
Execution Context Selector 드롭다운 메뉴에서 선택해야 합니다.

다른 컨텍스트 안의 요소를 검사하는 방식으로 DevTools에 액세스하지 않으면 Console의 기본값은
`top` 컨텍스트로 설정됩니다. 예를 들어
`<iframe>`에 있는 `<p>` 요소를 검사한다면 DevTools가 Execution Context
Selector를 `<iframe>`의 컨텍스트로 설정합니다.

`top` 이외의 컨텍스트로 작업할 경우 DevTools가 아래의 스크린샷과 같이
Execution Context Selector를 빨간색으로 강조표시합니다. 개발자가
`top` 이외의 컨텍스트로 작업하는 경우가 드물기 때문입니다. 값이 나오기를 기대하면서
변수를 입력했는데
(다른 컨텍스트에 정의되어 있어서) `undefined`가 나오면 상당히 혼란스러울 수 있습니다.

![빨간색으로 강조표시된 Execution Context Selector](images/non-top-context.png)

## Console 출력 필터링

**Filter** 버튼
(![필터 버튼](images/filter-button.png){:.inline})
을 클릭하여 콘솔 출력을 필터링합니다. 심각도 레벨, 정규 표현식,
또는 네트워크 메시지 숨기기로 필터링할 수 있습니다.

![필터링된 콘솔 출력](images/filtered-console.png)

심각도 레벨 필터링은 다음과 같습니다.

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">옵션 및 표시</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>All</td>
    <td>모든 콘솔 출력을 표시합니다.</td>
  </tr>
  <tr>
    <td>Errors</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-">console.error()</a>의 출력만 표시합니다.</td>
  </tr>
  <tr>
    <td>Warnings</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-">console.warn()</a>의 출력만 표시합니다.</td>
  </tr>
  <tr>
    <td>Info</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoleinfoobject--object-">console.info()</a>의 출력만 표시합니다.</td>
  </tr>
  <tr>
    <td>Logs</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a>의 출력만 표시합니다.</td>
  </tr>
  <tr>
    <td>Debug</td>
    <td><a href="/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel">console.timeEnd()</a>와 <a href="/web/tools/chrome-devtools/debug/console/console-reference#consoledebugobject--object-">console.debug()</a>의 출력만 표시합니다.</td>
  </tr>
  </tbody>
</table>

## 추가 설정

추가 Console 설정을 하려면 DevTools settings를 열고 **General** 탭으로 이동하여
아래쪽 **Console** 섹션으로 스크롤합니다.

![Console 설정](images/console-settings.png)

<table class="responsive">
  <thead>
     <tr>
      <th colspan="2">설정 및 설명</th>
    </tr>   
  </thead>
  <tbody>
  <tr>
    <td>Hide network messages</td>
    <td>기본적으로 콘솔은 네트워크 문제를 보고합니다. 이 옵션을 켜면 해당 오류에 대한 로그를 표시하지 않도록 콘솔에 지시합니다. 예를 들어, 404 및 500 시리즈 오류는 기록되지 않습니다.</td>
  </tr>
  <tr>
    <td>Log XMLHttpRequests</td>
    <td>콘솔이 각 XMLHttpRequest를 기록할지 여부를 지정합니다.</td>
  </tr>
  <tr>
    <td>Preserve log upon navigation</td>
    <td>페이지 새로고침 또는 탐색 동안 콘솔 기록을 유지합니다.</td>
  </tr>
  <tr>
    <td>Show timestamps</td>
    <td>각 콘솔 메시지 앞에 타임스탬프를 추가하여 호출 시간을 표시합니다. 특정 이벤트가 발생한 경우 디버그하는 데 유용합니다. 이 옵션은 메시지 스태킹을 비활성화합니다.</td>
  </tr>
  <tr>
    <td>Enable custom formatters</td>
    <td>자바스크립트 객체의 <a href="https://docs.google.com/document/d/1FTascZXT9cxfetuPRT2eXPQKXui4nWFivUnS_335T3U/preview">서식 지정</a>을 제어합니다.</td>
  </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
