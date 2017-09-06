project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 중단점을 사용하여 자바스크립트 코드를 일시 중지하고 특정 시간의 호출 스택 및 변수 값을 조사합니다.

{# wf_updated_on: 2016-07-17 #}
{# wf_published_on: 2015-04-13 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

# 중단점 설정 방법 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

중단점을 사용하여 자바스크립트 코드를 일시 중지하고
특정 시간의 호출 스택 및 변수 값을
조사합니다.

중단점을 설정한 경우 [코드를 단계별로 실행하는
방법](step-code)에서 코드를 단계별로 실행하고
변수 및 호출 스택을 조사하는 방법에 대해 자세히 알아봅니다.


### TL;DR {: .hide-from-toc }
- 중단점을 설정하는 가장 기본적인 방법은 특정 코드 줄에 중단점을 수동으로 추가하는 것입니다. 특정 조건이 충족되는 경우에만 트리거되도록 해당 중단점을 구성할 수 있습니다.
- 일반 조건이 충족되는 경우(예: 이벤트, DOM 변경 또는 확인할 수 없는 예외)에 트리거되는 중단점을 설정할 수도 있습니다.


## 특정 코드 줄에 중단점 설정하기 {:#line-number}

조사하려는 문을 알고 있는 경우 특정 코드 줄에 중단점을 설정하면
유용합니다. 예를 들어,
로그인 워크플로가 예기치 않게 작동하고 코드에서 로그인을 처리하는
함수가 하나뿐인 경우, 버그가
아마도 해당 함수에 있을 것이라고 가정하는 것이 안전합니다. 이 시나리오에서 해당 함수의 첫 번째 줄에
중단점을 추가하는 것이 적절합니다.

코드 줄에 중단점을 설정한 경우, 해당 중단점을
삭제하거나 비활성화하거나
조건을 설정하지 않으면 해당 코드는 항상 해당 코드 줄에서 일시 중지합니다.

특정 코드 줄에 중단점을 설정하려면 먼저 **Sources**
패널을 열고 왼쪽 **File Navigator** 창에서 스크립트를
선택합니다. **File Navigator**가 표시되지 않은 경우 **파일
탐색기 전환**
버튼(![파일 탐색기 숨기기/표시 버튼][fn]{:.devtools-inline})을 누릅니다.


**팁**: 최소화된 코드를 사용하는 경우 **pretty print**
버튼 
(![pretty print 버튼][pp]{:.devtools-inline})
을 눌러 읽을 수 있도록 만듭니다. 

소스 코드의 왼쪽을 따라 줄 번호를 볼 수 있습니다. 이 영역은
**줄 번호 여백(line number gutter)**이라고 합니다. 줄 번호 여백 내부를 클릭하여
해당 코드 줄에 중단점을 추가합니다.

![줄 번호 중단점][lnb]

한 식이 여러 줄에 걸쳐있는 경우
식 중간에 줄 중단점을 삽입하면, DevTools는 그 다음 식에 중단점을
설정합니다. 예를 들어, 아래 스크린샷에서
줄 4에 중단점을 설정하려고 시도하면 DevTools가 줄 6에 중단점을 삽입합니다.

![식 중간 중단점](imgs/mid-expression-breakpoint.png)

[pp]: imgs/pretty-print.png
[fn]: imgs/file-navigator.png
[lnb]: imgs/line-number-breakpoint.png

### 조건부 줄 번호 중단점 만들기

조건부 중단점은 지정한 조건이 참인 경우에만
트리거됩니다.

아직 중단점이 없는 줄 번호를 마우스 오른쪽 버튼으로 클릭하고
**Add conditional breakpoint**를 눌러 조건부 중단점을 만듭니다.
코드 줄에 이미 추가한 중단점을 조건부로 만들려면
마우스 오른쪽 버튼을 클릭하고 **Edit breakpoint**를 누릅니다.

텍스트 필드에 조건을 입력하고 <kbd>Enter</kbd> 키를 누릅니다.

![조건 추가][ac]

조건부 중단점은 황금색으로 지정됩니다. 

![조건부 중단점][cb]

[ac]: imgs/adding-condition.png
[cb]: imgs/conditional-breakpoint.png

### 줄 번호 중단점 삭제 또는 비활성화

중단점을 일시적으로 무시하려면 비활성화합니다.
**줄 번호 여백** 내부를 마우스 오른쪽 버튼으로 클릭하고 **Disable
breakpoint**를 선택합니다.

![중단점 비활성화][db]

중단점이 더 이상 필요하지 않은 경우 삭제합니다. **줄 번호 여백** 내부를
마우스 오른쪽 버튼으로 클릭하고 **Remove breakpoint**를 선택합니다.

또한 단일 위치에서 전체 스크립트에 걸친 모든 줄 번호 중단점을
관리할 수도 있습니다. 이 위치는 **Sources** 패널의
**Breakpoints** 창입니다.

**Breakpoints** 창 UI에서 중단점을 삭제하려면 마우스 오른쪽 버튼으로 해당 중단점을 클릭하고
**Remove breakpoint**를 선택합니다.

![Breakpoints 창][bp]

이 창에서 중단점을 비활성화하려면 그 확인란을 비활성화합니다.

모든 중단점을 비활성화하려면 마우스 오른쪽 버튼으로 이 창을 클릭하고 **Deactivate
breakpoints**를 선택합니다. 이는 **Disable All
Breakpoints** 옵션과 동일한 효과를 만듭니다.

또한 **Sources** 패널에서 **중단점
비활성화** 버튼
(![중단점 비활성화 버튼][dbb]{:.devtools-inline})을 눌러 모든 중단점을 비활성화할 수도
있습니다.

[db]: imgs/disable-breakpoint.png
[bp]: imgs/breakpoints-pane.png
[dbb]: imgs/deactivate-breakpoints-button.png

## DOM 변경에 중단점 설정하기 {:#dom}

DOM 노드를 잘못 변경하거나 삭제하거나 추가하는 버그가 코드 어딘가에 있을 경우
DOM 변경 중단점을 사용합니다.

변경의 원인이 되는 코드를 수동으로 검색하는 대신,
DevTools를 사용하여 해당 노드에 중단점을 설정할 수 있습니다. 노드(또는 그 하위 노드)가
추가, 삭제 또는 변경될 때마다 DevTools는 페이지를 일시 중지하고
이 변경의 원인이 되는 정확한 코드 줄로
이동합니다.

다음은 DOM 변경 중단점을 설정하는 방법에 대한 라이브 데모입니다.
**Increment**를 클릭하면 **Count**가 하나씩 증가합니다. 체험해 보세요.

이 대화식 가이드에서 여러분의 목적은
**Count**가 증가할 때 트리거되는 DOM 변경 중단점을 설정하여,
어떤 코드가 **Count**를 수정 중인지 검사하는 것입니다.

{% framebox height="auto" %}
<p><b>DOM Change Breakpoints Demo</b></p>
<button>Increment</button>
<p>Count: <span>0</span></p>
<script>
var buttons = document.querySelectorAll('button');
var increment = buttons[0];
var toggle = buttons[1];
var count = document.querySelector('span');
increment.addEventListener('click', function() {
  count.textContent = parseInt(count.textContent) + 1;
});
</script>
{% endframebox %}

**DOM 변경 중단점을 추가하려면**:

1. **Count**를 마우스 오른쪽 버튼으로 클릭하고 **Inspect**를 선택합니다. DevTools에서
노드가 파란색으로 강조 표시됩니다. `<p>` 노드여야 합니다. 노드를 두 번 클릭하면
노드가 확장됩니다. 확장된 노드의 콘텐츠를 보면
올바른 노드인지 확인할 수 있습니다.

1. 강조표시된 노드를 마우스 오른쪽 버튼으로 클릭하고 **Break on** >
   **Subtree Modifications**를 선택합니다. 노드 왼쪽의 파란색 아이콘 ![DOM 중단점
아이콘][icon]{:.devtools-inline}은 DOM
중단점이 노드에 설정됨을 나타냅니다. 파란색 배경에 파란색 아이콘이기 때문에
노드가 강조 표시되더라도 아이콘이 잘 보이지
않습니다.

1. 데모로 돌아가서 **Increment**를 클릭합니다. DevTools가 페이지를 일시 중지하고
**Sources**로 이동하여, 변경의 원인이 되는 코드 줄을
스크립트에서 강조 표시합니다.

1. **스크립트 실행 재개** ![스크립트 실행 재개
버튼][resume]{:.devtools-inline}를 두 번 눌러
스크립트 실행을 재개합니다. 두 번 누르는 이유는 카운트 텍스트가 삭제될 때
중단점이 한번 트리거되고 이 텍스트가 새 카운트로 업데이트될 때 중단점이
다시 트리거되기 때문입니다.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

선택한 노드의 속성이 변경되거나 선택한 노드가 삭제될 때 중단하려면,
위의 2단계에서 **Subtree Modifications** 대신 **Attributes modifications** 또는
**Node Removal**을 선택하면 됩니다.

팁: 이들 중단점은 배타적이 아닙니다. 단일 노드에서 중단점을 두 개나 세 개 모두 동시에 활성화할 수 있습니다.

**중단점을 일시적으로 끄려면**:

1. DevTools에서 **Elements**로 이동합니다.
1. **DOM Breakpoints**를 클릭합니다. DevTools 창이 작으면 **DOM
Breakpoints**가 오버플로 메뉴 ![오버플로
메뉴][overflow]{:.devtools-inline} 뒤에 숨겨질 수도 있습니다. 그 옆에 `p` 텍스트가 있는 확인란이 나타나야 하고
 `p` 아래에 **Subtree Modified**가 나타나야 합니다.
1. **Subtree Modified** 옆의 확인란을 비활성화합니다.
1. **Increment**를 다시 클릭합니다. 카운터가 증가하고 DevTools가 페이지를
더 이상 일시 중지하지 않습니다.

팁: 뷰포트에서 노드를 강조 표시하려면 `p` 위로 마우스를 이동합니다. `p`를 클릭하여
**Elements**에서 노드를 선택합니다.

**중단점을 삭제하려면**:

1. **DOM Breakpoints**로 이동합니다.
1. 삭제하려는 중단점을 마우스 오른쪽 버튼으로 클릭하고
**Remove breakpoint**를 선택합니다.

[icon]: imgs/dom-breakpoint-icon.png
[overflow]: imgs/overflow.png

### DOM 변경 중단점 유형에 대한 추가 정보

다음은 각 유형의 DOM
변경 중단점이 트리거되는 정확한 시기와 방법에 대한 상세 정보입니다.

* **Subtree modifications**: 현재 선택한
  노드의 자식이 제거 또는 추가되거나 자식의 콘텐츠가 변경될 때 트리거됩니다. 자식 노드의
  속성이 변경되거나 현재 선택한 노드가 변경될 때
  트리거되지 않습니다.

* **Attributes modifications**: 현재 선택한 노드에 속성을 추가 또는 제거하거나
  속성 값이 변경될 때 트리거됩니다.

* **Node Removal**: 현재 선택된 노드가 제거될 때 트리거됩니다.

## XHR에서 중단

XHR에서 중단점을 트리거할 수 있는 두 가지 방법이 있습니다. 즉, *임의* XHR이
XHR 수명 주기의 특정 단계(`readystatechange`, `load` 등)에 도달할 때나
XHR의 URL이 특정 문자열과 일치할 때가 있습니다. 

XHR 수명 주기의 특정 단계에 중단하려면
[event listener breakpoints 창](#events)에서 **XHR** 범주를 선택 취소합니다.

XHR의 URL이 특정 문자열과 일치할 때 중단하려면 **Sources** 패널의 **XHR
Breakpoints** 창을 사용하세요. 

![XHR breakpoints 창][xbp]

[xbp]: imgs/xhr-breakpoints-pane.png

더하기 기호 버튼을 클릭하여 새 중단점 패턴을 추가합니다. 텍스트 필드에
문자열을 입력하고 <kbd>Enter</kbd> 키를 눌러 저장합니다.

**팁**: 더하기 기호를 클릭한 다음 <kbd>Enter</kbd> 키를 즉시 눌러
XHR이 전송되기 전에 중단점을 트리거합니다.

## 이벤트 발생 시 중단 {:#events}

특정 이벤트(예: `click`) 또는 이벤트 범주(예: 모든
`mouse` 이벤트)가 발생할 때 중단하려면 **Sources** 패널의 **Event Listener Breakpoints** 창을
사용합니다.

![event listener breakpoints 창][elbp]

최상위는 이벤트의 범주를 나타냅니다. 해당 확인란 중 하나를 활성화하여
해당 범주의 이벤트가 트리거될 때마다 일시 중지합니다. 최상위 범주를 확장하여
어떤 이벤트가 포함되어 있는지 확인합니다.

특정 이벤트를 모니터링하려면
해당 이벤트가 속한 최상위 범주를 찾은 다음, 대상 이벤트 옆에 있는 확인란을 활성화합니다.

![확장된 event listener breakpoints 창][eelbp]

[elbp]: imgs/event-listener-breakpoints-pane.png

[eelbp]: imgs/expanded-event-listener-breakpoints-pane.png

## 예외 중단점 {:#exceptions}

예외가 발생했을 때 예외 중단점으로 스크립트를 일시 중지한 다음,
예외가 발생한 코드 줄로 점프합니다.


다음은 버그가 있는 데모입니다. 아래의 지시에 따라
예외 중담점으로 버그를 수정하는 방법을 알아보세요.

{% framebox height="auto" width="auto" %}
<button>Print Random Number</button>
<p>무작위 숫자: <span></span></p>
<script type="text/javascript">
  var nodes = {};
  nodes.button = document.querySelector('button');
  nodes.num = document.querySelector('span');
  nodes.button.addEventListener('click', function onClick() {
    nodes.number.textContent = Math.random();
  });
</script>
{% endframebox %}

1. **Print Random Number**를 클릭합니다. 버튼 아래의 **Random Number** 레이블은
무작위 숫자를 출력해야 하지만 실행되지 않습니다.
   이 버그를 수정해야 합니다.
1. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>(Mac) 또는
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>(Windows, Linux)를 눌러서
DevTools를 엽니다.
1. **Sources** 탭을 클릭합니다.
1. **Pause on exceptions** ![pause on exception][pause on exception]{:.devtools-inline}를 클릭합니다.
1. **Print Random Number**를 다시 클릭하여 중단점을 트리거합니다.
   DevTools가
`nodes.number.textContent = Math.random();`이 포함된 코드 줄에서 일시 중지해야 합니다. 이제 모든 내용을 배웠으므로
예외 중단점을 사용해야 합니다. 나머지 부분에서는
이 버그를 해결하는 방법을 설명합니다.
1. 현재 DevTools가 일시 중지된 코드 줄에서 `nodes` 위로 마우스를 가져가서
객체가 제대로 참조되었는지 확인합니다. 세 가지 속성(`button`, `num` 및 `__proto__`)이 포함된 것을 확인할 수 있습니다.
   잘못된 점은 없는 듯합니다. 여기는 버그가 있는 곳이 아닙니다.
1. `number` 위로 마우스를 가져갑니다. `undefined`로 평가되고 있는 것을 확인할 수 있습니다.
   여기가 버그의 원입니다. 속성 이름이 `number`가 아니라 `num`이어야 합니다.
1. DevTools에서 `nodes.number.textContent`를 `nodes.num.textContent`로 변경합니다.
1. <kbd>Command</kbd>+<kbd>S</kbd>(Mac) 또는 <kbd>Control</kbd>+<kbd>S</kbd>(Windows, Linux)를 눌러서 변경 사항을 저장합니다.
   DevTools가 저장 후 바로 스크립트 실행을 계속합니다.
1. **Print Random Number**를 다시 눌러서 버그가 해결되었는지 확인합니다. 이제 버튼을 클릭한 후에 DevTools가 멈추지 않습니다.
즉, 스크립트에 예외가 발생하지 않는다는 뜻입니다.

[pause on exception]: /web/tools/chrome-devtools/images/pause-on-exception.png


{# wf_devsite_translation #}
