project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 코드를 한 번에 한 줄씩 또는 한 함수씩 실행함으로써, 데이터와 페이지의 변경사항을 관찰하여 무슨 일이 발생하는지 정확히 이해할 수 있습니다.

{# wf_updated_on: 2015-09-01 #}
{# wf_published_on: 2015-04-13 #}

# 코드를 단계별로 실행하는 방법 {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

코드를 한 번에 한 줄씩 또는 한 함수씩 실행함으로써, 데이터와 페이지의 변경사항을 관찰하여 무슨 일이 발생하는지 정확히 이해할 수 있습니다. 또한 스크립트가 사용하는 데이터 값을 수정할 수도 있으며 스크립트 그 자체도 수정할 수 있습니다.

*이 변수 값이 왜 30이 아니라 20입니까? 해당 코드 줄이 왜 어떤 효과도 없는 듯이 보입니까? 이 플래그가 false여야 하는데 왜 true입니까?* 모든 개발자는 이런 질문에 직면하며 코드를 단계별로 실행하여 원인을 찾아냅니다.

[중단점 설정](add-breakpoints) 후에 페이지로 돌아가서 중단점이 도달할 때까지 정상적으로 사용합니다. 그러면 페이지에서 모든 자바스크립트가 일시 중지되고 포커스가 DevTools Sources 패널로 이동하고 중단점이 강조표시됩니다. 이제 단계별로 코드를 선택적으로 실행하고 데이터를 조사할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 코드를 단계별로 실행하여 문제 발생 전 또는 발생 동안 문제를 관찰하고 라이브 편집을 통해 변경사항을 테스트합니다.
- 로그된 데이터가 콘솔에 도달한 순간에 이미 오래된 버전이 되므로 콘솔 로깅을 단계별로 실행하는 것이 좋습니다.
- 'Async call stack' 기능을 활성화하여 비동기 함수의 호출 스택에 대한 더욱 뛰어난 가시성을 확보합니다.
- 스크립트를 블랙박스 처리하여 호출 스택에서 타사 코드를 숨깁니다.
- 익명 함수보다 명명된 함수를 사용하여 호출 스택 가독성을 개선합니다.


## 단계별 작업

모든 단계 옵션은 사이드바에 클릭할 수 있는 아이콘 ![중단점 버튼 모음](imgs/image_7.png){:.inline}을 통해 나타나지만 단축키를 통해서만 트리거할 수 있습니다. 다음은 요약한 내용입니다.

<table>
  <thead>
    <tr>
      <th data-th="Icon/Button">아이콘/버튼</th>
      <th data-th="Action">작업</th>
      <th data-th="Description">설명</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_8.png" alt="다시 시작" class="inline"></td>
      <td data-th="Action">다시 시작</td>
      <td data-th="Description">다음 중단점까지 실행을 재개합니다. 중단점이 없는 경우 정상 실행이 재개됩니다.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_9.png" alt="Long Resume" class="inline"></td>
      <td data-th="Action">길게 다시 시작</td>
      <td data-th="Description">중단점을 500ms 동안 비활성화하여 실행을 재개합니다. 코드를 계속 일시 중지하는 중단점(예: 루프 내부 중단점)을 순간적으로 건너뛰는 데 편리합니다. <p><b><i>Resume</i>이 펼쳐지고 작업이 표시될 때까지 길게 클릭합니다.</b></p></td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_10.png" alt="Step Over" class="inline"></td>
      <td data-th="Action">Step Over</td>
      <td data-th="Description">다음 줄에 나오는 명령을 실행하고 다음 줄로 점프합니다.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_11.png" alt="Step Into" class="inline"></td>
      <td data-th="Action">Step Into</td>
      <td data-th="Description">다음 줄에 함수 호출이 포함되어 있다면 <i>Step Into</i>는 해당 함수로 점프하고 첫 줄에서 멈춥니다.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_12.png" alt="Step Out" class="inline"></td>
      <td data-th="Action">Step Out</td>
      <td data-th="Description">현재 함수의 나머지 부분을 실행한 다음 함수 호출 뒤 다음 명령문에서 일시 중지합니다.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_13.png" alt="Deactivate breakpoints" class="inline"></td>
      <td data-th="Action">중단점 비활성화</td>
      <td data-th="Description">모든 중단점을 일시적으로 비활성화합니다. 중단점을 실제로 제거하지 않고 전체 실행을 재개하는 데 사용합니다. 다시 클릭하면 중단점이 다시 활성화됩니다.</td>
    </tr>
    <tr>
      <td data-th="Icon/Button"><img src="imgs/image_14.png" alt="Pause on exceptions" class="inline"></td>
      <td data-th="Action">예외 시 일시 중지</td>
      <td data-th="Description">예외 발생 시 코드를 자동으로 일시 중지합니다.</td>
    </tr>
  </tbody>
</table>

**step into**는 어떤 함수로 진입하거나 빠져나오든 상관없이 하나의 명령문만 실행되도록 보장하므로 일반적인 '한 번에 한 줄씩' 작업으로 사용합니다.

확인할 수 없는 예외로 문제가 발생한 것 같은데 예외 발생 위치를 모르는 경우 [예외 시 일시 중지](add-breakpoints#break-on-uncaught-exception)를 사용합니다. 이 옵션이 활성화된 경우 **Pause On Caught Exceptions** 확인란을 클릭하여 미세 조정할 수 있습니다. 이 경우 구체적으로 처리된 예외가 발생하는 경우에만 실행이 일시 중지됩니다.

## 범위별 속성 보기 {: #scope }

스크립트를 일시 중지하면 **Scope** 창에
특정 시점에서 현재 정의된 속성이 모두 나타납니다.

아래 스크린샷에서 창은 파란색으로 강조표시되어 있습니다.

![Sources 패널의 Scope 창](imgs/scope-pane.png)

Scope 창은 스크립트가 일시 중지되었을 때만 채워집니다.
페이지가 실행 중일 때는 Scope 창이 비어 있습니다.

Scope 창은 로컬, 클로저,
전역 수준에서 정의된 속성을 보여줍니다.

속성 옆에 캐럿 아이콘이 있다면 객체라는 뜻입니다. 캐럿 아이콘을
클릭하여 객체를 펼치고 속성을 확인합니다.

때로 속성이 어둡게 표시될 때도 있습니다. 예를 들어 아래 스크린샷에서 `constructor`속성은
`confirm` 속성보다 흐릿합니다.

![흐릿해진 속성](imgs/enumerables.png)

어두운 속성은 열거 가능합니다. 그보다 밝고 흐릿한 속성은
그렇지 않습니다. 자세한 내용은 다음의 Stack Overflow 스레드를 참조하세요.
[Chrome Developer Tools Scope
패널에서 색상은 어떤 의미인가요?](What do the colors mean in Chrome Developer Tools Scope panel?)

## 호출 스택

**Call Stack** 섹션은 사이드바의 상단 근처에 있습니다. 중단점에서 코드가 일시 중지되면 호출 스택이 코드를 해당 중단점으로 안내한 실행 경로를 역순으로 표시합니다. 이는 실행의 *현재* 위치는 물론 그 위치에 이르게 된 경로를 이해하는 데 도움이 되며, 이는 중요한 디버깅 요소입니다.

### 예시

<img src="imgs/image_15.png" alt="호출 스택" class="attempt-left">

이 예에서는 `index.html` 파일의 50번째 줄에서 첫 번째 onclick 이벤트가 
`setone()` 함수를 `dgjs.js` 자바스크립트 파일의 18번째 줄에서 호출했으며,
이어서 동일한 파일의 4번째 줄에서 `setall()` 함수를 호출했습니다.
해당 파일의 현재 중단점에서 예외가 일시 중지되었습니다.

<div class="clearfix"></div>

### 비동기 호출 스택 활성화

비동기 호출 스택 기능을 활성화하여 비동기 함수 호출의 실행에 대한
더욱 뛰어난 가시성을 확보합니다.

1. DevTools의 **Sources** 패널을 엽니다.
2. **Call Stack** 창에서 **Async** 확인란을 활성화합니다.

아래 동영상은 비동기 호출 스택 기능을 보여주는 간단한 스크립트가 포함되어 
있습니다. 이 스크립트에서는 타사 라이브러리를 사용하여
DOM 요소를 선택합니다. `onClick` 함수는 
해당 요소의 `onclick` 이벤트 핸들러로 등록됩니다. `onClick`을 호출할 때마다
`f`라는 이름의 함수를 호출합니다. 이 함수는 
`debugger` 키워드를 통해 스크립트를 강제로 일시 중지합니다. 

<video src="animations/async-call-stack-demo.mp4"
       autoplay muted loop controls></video>

이 동영상에서는 중단점이 트리거되고 호출 스택이 확장됩니다.
해당 스택에 하나의 호출(`f`)만 있습니다. 이어서 비동기 호출 스택 기능이 활성화되고
스크립트가 다시 시작되고 중단점이 다시 트리거된 후에
호출 스택이 두 번째로 확장됩니다. 이번에는 호출 스택에 
타사 라이브러리 호출 및 `onClick` 호출을 비롯하여 `f`에 이르기까지의 모든 호출이
포함됩니다. 스크립트가 처음 호출되었을 때  
호출 스택에 하나의 호출만 있었습니다. 두 번째로 호출했을 때는 4개가 있었습니다. 요컨대,
비동기 호출 스택 기능은 
비동기 함수의 전체 호출 스택에 대한 향상된 가시성을 제공합니다.

### 팁: 함수의 이름을 지정하여 호출 스택 가독성 개선

익명 함수는 호출 스택을 읽기 어렵게 만듭니다. 함수의 이름을 지정하여
가독성을 개선할 수 있습니다.

아래 스크린샷 두 개의 코드 스니펫은 기능이 같습니다. 코드의
정확한 기능은 중요하지 않습니다.
첫 번째 스크린샷의 코드는 익명 함수를 사용하는 반면에
두 번째는 이름이 지정된 함수를 사용한다는 점이 중요합니다.

첫 번째 스크린샷의 호출 함수에서 맨 위 두 함수는
단지`(anonymous function)`이라는 제목이 달려있습니다. 두 번째 스크린샷에서 맨 위 두
함수는 이름이 지정되어 프로그램 흐름을 한 눈에 훨씬 쉽게 이해할 수
있습니다. 타사 라이브러리 및 프레임워크를 비롯한 수많은 스크립트 파일을 사용하고
호출 스택의 깊이가 5개 또는 10개의 호출로 구성된 경우,
함수의 이름이 지정되면 호출 스택 흐름을 훨씬 쉽게 이해할 수 있습니다.


익명 함수를 사용한 호출 스택:

![읽기 어려운 익명 함수를 사용한 호출 스택](imgs/anon.png)

이름이 지정된 함수를 사용한 호출 스택: 

![읽기 쉬운 이름이 지정된 함수를 사용한 호출 스택](imgs/named.png)

<!-- blackbox OR disable third-party code??? -->

### 타사 코드 블랙박스 처리

스크립트 파일을 블랙박스 처리하여 호출 스택에서 타사 파일을 생략합니다.

블랙박스 처리 전:

![블랙박스 처리 전 호출 스택](imgs/before-blackbox.png)

블랙박스 처리 후:

![블랙박스 처리 후 호출 스택](imgs/after-blackbox.png)

파일을 블랙박스 처리하려면

1. DevTools Settings를 엽니다.

   ![DevTools Settings 열기](imgs/open-settings.png)

2. 왼쪽 탐색 메뉴에서 **Blackboxing**을 클릭합니다.

   ![Chrome DevTools의 Blackboxing 패널](imgs/blackbox-panel.png)

3. **Add pattern**을 클릭합니다.

4. **Pattern** 텍스트 필드에 호출 스택에서 제외할
파일 이름 패턴을 입력합니다. DevTools가 패턴과 일치하는 스크립트를
제외합니다. 

   ![블랙박스 패턴 추가](imgs/add-pattern.png)

5. 텍스트 필드 오른쪽 드롭다운 메뉴에서 **Blackbox**를 선택하고
호출 스택의 호출을 제외한 스크립트 파일을 실행하거나
**Disabled**를 선택하여 파일이 실행되지 못하게 합니다.

6. **Add**를 클릭하여 저장합니다.

다음에 페이지를 실행하고 중단점을 트리거할 때 DevTools가
호출 스택의 블랙박스 스크립트에서 함수 호출을 숨깁니다.

## 데이터 조작

코드 실행이 일시 중지하면 처리 중인 데이터를 관찰 및 수정할 수 있습니다. 이는 예기치 않은 전달된 매개변수 또는 잘못된 값을 가진 듯한 변수를 추적하려고 시도할 때 중요합니다.

**Show/Hide drawer** ![Show/Hide drawer](imgs/image_16.png){: .inline}를 클릭하여 Console 창을 표시하거나 <kbd class="kbd">Esc</kbd> 키를 누릅니다. 단계별로 실행하는 동안 콘솔이 열린 상태에서 다음을 수행할 수 있습니다.

* 변수의 이름을 입력하여 현재 함수의 범위에서 현재 값을 봅니다.
* 자바스크립트 대입문을 입력하여 값을 변경합니다.

값을 수정한 다음 계속 실행하여 코드의 결과가 어떻게 변경되는지, 예상대로 동작하는지 여부를 확인합니다.

#### 예시

<img src="imgs/image_17.png" alt="Console Drawer" class="attempt-left">

매개변수 `dow`의 값이 현재 2인데 다시 실행하기 전에 수동으로 3으로 변경합니다.


<div class="clearfix"></div>

## 라이브 편집

실행 중인 코드를 관찰하고 일시 중지하면 오류를 찾는 데 도움이 되며, 라이브 편집을 사용하여 새로 고치지 않고 변경사항을 신속하게 미리 볼 수 있습니다.

스크립트를 라이브 편집하려면 단계별로 실행하는 동안 Sources 패널의 편집기 부분을 클릭합니다. 편집기에서 원하는 변경을 수행한 다음  <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd>(또는 Mac의 경우 <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd>)를 눌러 변경사항을 적용합니다. 이 시점에서 전체 JS 파일이 VM에 패치되고 모든 함수 정의가 업데이트됩니다. 

이제 실행을 재개할 수 있습니다. 수정된 스크립트는 원래의 위치에서 실행되고 사용자는 변경사항의 결과를 관찰할 수 있습니다.

#### 예시

![라이브 편집](imgs/image_18.png)

매개변수 `dow`가 함수 `setone()` 에 전달될 때 모든 경우에 +1씩 추가된다고 생각합니다.
즉, 수신된 `dow<` 값은 0이어야 할 때 1이고, 1이어야 할 때 2인 식입니다.
 전달된 값의 감소가 이것이 문제라고 확인하는지 여부를 신속하게 테스트하기 위해 함수의 시작 위치에 17번째 줄을 추가하고
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd>를
눌러 변경 사항을 적용하고 다시 시작합니다.


## 스레드 실행 관리 {: #threads }

Sources 패널의 **Threads** 창을 사용하여 다른 스레드(예: 서비스 워커 또는 웹 워커 스레드)를
일시 중지, Step Into 및 검사합니다.

Threads 창을 보여주기 위해 이 섹션에서는 다음 데모를 사용합니다.
[웹 워커 기본 예시](http://mdn.github.io/simple-web-worker/).

앱에서 DevTools를 열면 메인 스크립트가
`main.js`에 위치한 것이 보입니다.

![메인 스크립트](imgs/main-script.png)

웹 워커 스크립트는 `worker.js`에 있습니다.

![워커 스크립트](imgs/worker-script.png)

메인 스크립트는 **Multiply number 1** 또는
**Multiply number 2** 입력 필드의 변경 사항을 수신합니다. 변경 시 메인 스크립트는
두 개의 곱할 숫자 값을 포함한 메시지를 웹 워커에 보냅니다. 웹 워커는
곱셈을 하고 결과를 메인 스크립트에
전달합니다.

첫 번째 숫자를 변경했을 때 트리거되는 `main.js`에
중단점을 설정했다고 가정하세요.

![메인 스크립트 중단점](imgs/main-script-breakpoint.png)

또한, 워커가 메시지를 받았을 때 `worker.js`의 중단점도
설정할 수 있습니다.

![워커 스크립트 중단점](imgs/worker-script-breakpoint.png)

앱 UI에서 첫 번째 숫자를 수정하면 두 개의 중단점이 모두 트리거됩니다.

![트리거된 메인 및 워커 스트립트 중단점](imgs/breakpoints-triggered.png)

Threads 창에서 파란색 화살표는 현재 선택된 스레드를
나타냅니다. 예를 들어 위의 스크린샷에서 **Main** 스레드가 선택된 것입니다. 

코드 순차 실행을 위한
모든 DevTools 컨트롤(스크립트 실행 다시 시작/일시 중지,
다음 함수 호출 Step Over, 다음 함수 호출 Step Into 등)은
해당 스레드와 관련이 있습니다. 즉, DevTools가 위의 스크린샷과 같은 상태에서 **Resume script execution**
버튼을 눌렀다면 메인 스레드가
다시 실행되지만 워커 스레드는
여전히 일시 중지되어 있습니다. **Call Stack**과 **Scope** 섹션은
메인 스레드의 정보만 표시합니다.

웹 워커 스레드의 코드를 단계별로 실행하거나
웹 워커 스레드의 범위와 호출 스택을 보고 싶은 경우 Threads 창의 레이블을 클릭하면
스레드 옆에 파란색 화살표가 나타납니다. 아래 스크린샷은
워커 스레드를 선택한 후에 호출 스택과 범위 정보가 어떻게 바뀌는지 보여줍니다.
코드 단계별 실행 버튼(스크립트
다시 시작, 다음 함수 호출 Step Over 등) 중 하나를 눌렀다면, 이 작업은
워커 스레드와만 관련됩니다. 메인 스레드는 영향을 받지 않습니다.

![포커스를 가진 워커 스레드](imgs/worker-thread.png)


{# wf_devsite_translation #}
