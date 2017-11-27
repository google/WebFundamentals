project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 이 대화형 가이드에서는 Chrome DevTools를 사용한 자바스크립트 디버깅을 시작합니다.

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
</style>

<!-- TODO
     make demo responsive
-->

# Chrome DevTools에서 자바스크립트 디버깅 시작하기 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

이 단계별 대화형 가이드는
Chrome DevTools에서 자바스크립트를 디버깅하는 기본 워크플로를 알려줍니다. 이 가이드에서는
특정 문제를 디버그하는 방법을 보여주지만
여기서 배운 전체적 워크플로를 활용하여 모든 유형의 자바스크립트 버그를 디버그할 수 있습니다.

`console.log()`를 사용하여 코드에서 버그를 찾고 수정하고 있다면
이 가이드에서 간략히 소개한 워크플로를 사용해보세요. 대체로 더 빠르고 효과적입니다.


## 1단계: 버그 재현 {: #step-1 }

버그 재현은 항상 디버깅의 첫 단계입니다.
'버그 재현'이란 일관적으로 버그를 일으키는 일련의
액션을 찾는 것입니다. 버그를 여러 번 재현해야 할 수도 있으므로
불필요한 단계가 있으면 제거하세요.

아래의 지시에 따라 이 가이드에서 수정할 버그를 재현합니다.


1. **Open Demo**를 클릭합니다. 데모가 새 탭에서 열립니다.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. 데모에서 **Number 1**에 `5`를 입력합니다.
1. **Number 2**에 `1`을 입력합니다.
1. **Add Number 1 and Number 2**를 클릭합니다.
1. 입력과 버튼 아래의 레이블을 살펴봅니다. `5 + 1 = 51`라고 되어 있습니다.

이런, 잘못된 결과입니다. 올바른 결과는 `6`입니다. 이 버그를
수정해야 합니다.

## 2단계: 중단점으로 코드 일시 중지

DevTools에서는 코드를 실행하는 도중에 일시 중지하고
특정 시점의 *모든* 변수 값을 검사할 수 있습니다. 코드를 일시 중지하는
도구는 **중단점**이라고 합니다. 체험해보세요.

1. 데모에서
<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>(Mac) 또는
<kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>(Windows, Linux)를 눌러서 DevTools를 엽니다.

1. **Sources** 탭을 클릭합니다.

<!-- TODO add a screenshot. Don't create the screenshot until demo design is
     finished. Add it here rather than previous screenshot in case Sources
     is hidden -->

1. **Event Listener Breakpoints**를 클릭하여 섹션을 펼칩니다. DevTools에
확장 가능한 이벤트 범주 목록(예: **애니메이션**과**클립보드**)이 나타납니다.

<!-- TODO or maybe add it here -->

1. **Mouse** 이벤트 범주 옆에서 **Expand** ![Expand아이콘](/web/tools/chrome-devtools/images/expand.png){: .devtools-inline}를 클릭합니다.
   DevTools에 마우스 이벤트 목록(예: **click**)이 나타납니다.
그 옆에 확인란이 있습니다.
1. **click** 확인란에 표시합니다.

     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="데모에서 열린 DevTools, Sources 패널에 포커스가 있고
              click 이벤트 리스너 중단점이 활성화되어 있습니다."
       <figcaption>
         <b>그림 1</b>: 데모에서 열린 DevTools,
	Sources 패널에 포커스가 있고 click 이벤트 리스너 중단점이 활성화되어 있습니다.
         DevTools 창이 큰 경우 <b>Event
	Listener Breakpoints</b> 창은 스크린샷과 같이 왼쪽 아래가 아니라 오른쪽에
	있습니다.
	</figcaption>
     </figure>

1. 데모로 돌아가서 다시 **Add Number 1 and Number 2**를 클릭합니다. DevTools는
데모를 일시 중지하고 **Sources** 패널의 코드 줄을 강조표시합니다.
   DevTools가 강조표시하는 코드 줄은 다음과 같습니다.

       `function onClick() {`

**click** 확인란을 선택하면
모든 `click` 이벤트에 이벤트 기반 중단점이 설정됩니다. *아무* 노드나 클릭했을 때 그 노드에 `click`
핸들러가 있다면 DevTools가 해당 노드의
`click` 핸들러 첫 줄에서 자동으로 일시 중지합니다.

참고: 이는 DevTools가 제공하는 여러 가지 유형의 중단점 중 하나에 불과합니다.
어떤 중단점을 사용할지는 어떤 유형의 문제를 디버깅하는지에 따라 달라집니다.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png

## 3단계: 단계별 코드 실행

일반적으로 버그는 스크립트를 잘못된 순서로 실행했을 때
발생합니다. 코드를 단계별로 실행하면 코드 실행을 한 번에 한 줄씩 따라가면서
기대한 것과 다른 순서로 실행되는 곳이 어디인지
알아낼 수 있습니다. 체험해보세요.

1. DevTools의 **Sources** 패널에서 **Step into next function
call** ![Step into next function call][into]{:.devtools-inline}을 클릭하여
`onClick()` 함수를 한 번에 한 줄씩 순차 실행합니다.
   DevTools가 다음 코드 줄을 강조표시합니다.

       `if (inputsAreEmpty()) {` 

1. **Step over next function call** ![Step over next function
   call][over]{:.devtools-inline}을 클릭합니다. DevTools가 Step Into하지 않고 `inputsAreEmpty()`
를 실행합니다. DevTools가 어떻게 몇 줄의 코드를 건너뛰는지 살펴봅니다.
   `inputsAreEmpty()`가 false로 평가되었기 때문이며, 따라서 `if`
문의 코드 블록이 실행되지 않습니다.

이는 단계별 코드 실행의 기본 개념입니다. 
`get-started.js`에서 코드를 보면 버그가
`updateLabel()` 함수 어딘가 있다는 것을 알 수 있습니다. 모든 코드 줄을 단계별로 실행하지 않고
다른 유형의 중단점을 사용하여 버그 위치에 가까운 곳에서 코드를
일시 중지시킬 수 있습니다.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## 4단계: 다른 중단점 설정

코드 줄 중단점은 가장 일반적인 유형의 중단점입니다. 일시 중지하고 싶은
코드 줄이 있다면 코드 줄
중단점을 사용하세요. 체험해보세요.

1. `updateLabel()`에서 마지막 코드 줄을 보면 아래와 같습니다.

       `label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;`

1. 이 코드 왼쪽에 다음과 같이 코드 줄의 줄 번호가
보일 것입니다. **32**. **32**를 클릭합니다. DevTools가
**32** 위에 파란색 아이콘을 표시합니다. 이 줄에 코드 줄 중단점이 있다는 뜻입니다.
   이제 DevTools는 이 코드 줄을 실행하기 전에 항상 일시 중지합니다.
1. **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}을 클릭합니다. 스크립트는 중단점을 넣은
코드 줄에 도달할 때까지 계속 실행됩니다.
1. 이미 실행된 `updateLabel()` 코드 줄을 살펴보세요.
   DevTools가 `addend1`, `addend2` 및 `sum` 값을 출력합니다.

`sum`의 값이 의심스럽습니다. 숫자여야 하는데
문자열로 평가되는 듯합니다. 이것이 버그의 원인일 수 있습니다.

## 5단계: 변수 값 확인

그 외에 변수 또는 함수가 예상과 다른 값을 발생시킬 때
버그가 자주 일어납니다. 많은 개발자가 `console.log()`을 사용하여
시간에 따른 값 변화를 확인하지만 `console.log()`은 두 가지 이유로 지루하고
효과도 없습니다. 첫째,
`console.log()`를 여러 번 호출하여 코드를 수동으로 수정해야 할 수 있습니다. 둘째, 어느 변수가 버그와 관련이 있는지
알기 어려워서 여러 변수를 로그아웃해야 할 수 있습니다.

`console.log()`를 대신하는 DevTools의 도구는 Watch Expression입니다. 
Watch Expression을 사용하여 시간에 따라 변수 값을 모니터링합니다.
이름에서 알 수 있듯이 Watch Expression은 변수에만 국한되지 않습니다. Watch Expression에서는
모든 유효한 자바스크립트 식을 저장할 수 있습니다. 체험해보세요.

1. DevTools의 **Sources** 패널에서 **Watch**를 클릭합니다. 섹션이 펼쳐집니다.
1. **Add Expression** ![Add Expression][add]{:.devtools-inline}을 클릭합니다.
1. `typeof sum`을 입력합니다.
1. <kbd>Enter</kbd> 키를 누릅니다. DevTools가 `typeof sum: "string"`을 보여줍니다. 콜론 오른쪽
값이 Watch Expression의 결과입니다.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Watch Expression 창."
       <figcaption>
         <b>그림 1</b>: Watch Expression 창(오른쪽 아래),
 <code>typeof sum</code> Watch Expression 생성 이후.
         DevTools 창이 큰 경우 Watch Expression 창이
<b>Event Listener Breakpoints</b> 창 위의 오른쪽에 있습니다.
</figcaption>
     </figure>

예상한 바와 같이 `sum`이 
숫자여야 하는데 문자열로 평가되고 있습니다. 이것이 데모 버그의 원입니다.

`console.log()`를 대신할 DevTools의 두 번째 대안은 Console입니다. 
Console을 사용하여 임의의 자바스크립트 문을 평가합니다.
일반적으로 개발자는 Console을 사용하여 디버깅 시 변수 값을
재정의합니다. 이 경우, Console이 방금 발견한 버그의 잠재적 해결책을
테스트하는 데 도움을 줄 수 있습니다. 체험해보세요.

1. Console 창이 열려 있지 않으면 <kbd>Esc</kbd> 키를 눌러서
창을 엽니다. 이 창은 DevTools 창 아래에서 열립니다.
1. Console에서 `parseInt(addend1) + parseInt(addend2)`를 입력합니다.
1. <kbd>Enter</kbd> 키를 누릅니다. DevTools가 명령문을 평가하고
`6`을 출력합니다. 원래 데모에서 발생시킬 것으로 기대한 결과입니다.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="명령문을 평가한 후 콘솔 창."
       <figcaption>
         <b>그림 1</b>: 콘솔 창,
 <code>parseInt(addend1) + parseInt(addend2)</code>평가 후.
</figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## 6단계: 수정 내용 적용

버그의 잠재적 해결책을 알아냈습니다. 이제
코드를 편집하고 데모에 다시 실행해서 수정 내용을 테스트하는 작업만 남았습니다. 수정 내용을 적용하기 위해
DevTools를 떠날 필요는 없습니다. DevTools UI 내에서 자바스크립트 코드를
직접 수정할 수 있습니다. 체험해보세요.

1. DevTools의 **Sources** 패널에 있는 코드 에디터에서
`var sum = addend1 + addend2`를
`var sum = parseInt(addend1) + parseInt(addend2);`로 교체합니다. 현재 일시 중지한
위치 위에 있는 한 줄입니다.
1. <kbd>Command</kbd>+<kbd>S</kbd>(Mac) 또는
<kbd>Control</kbd>+<kbd>S</kbd>(Windows, Linux)를 눌러서 변경 사항을 저장합니다.
   코드 배경이 빨간색으로 변경되어 DevTools에서
스크립트가 변경되었음을 나타냅니다.
1. **Deactivate breakpoints** ![Deactivate
   breakpoints][deactivate]{:.devtools-inline}를 클릭합니다. 파란색으로 바뀌어서
활성화되었음을 나타냅니다. 이 기능이 설정되면 DevTools가 설정된 중단점을
모두 무시합니다.
1. **Resume script execution** ![Resume script
   execution][resume]{:.devtools-inline}을 클릭합니다.
1. 다른 값으로 데모를 시험합니다. 이제 데모가 합계를 올바르게
계산할 것입니다.

이 워크플로는 수정 내용을 브라우저에서 실행되는
코드에만 적용한다는 점에 유의하세요. 모든 사용자에 대해 페이지에서 실행되는 코드를
수정하지는 않습니다. 그렇게 하려면 페이지를 제공하는 서버에서 실행되는 코드를
수정해야 합니다.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## 다음 단계

축하합니다! 이제 DevTools에서 자바스크립트를 디버깅하는 기본적인 방법을 익혔습니다.

이 가이드는 중단점을 설정하는 두 가지 방법만 보여줍니다. DevTools는
다음을 포함한 여러 가지 다른 방법을 제공합니다.

* 제공한 조건이 true일 때만 트리거되는 조건부 중단점

* 포착/미포착 예외의 중단점
* 요청된 URL이 입력한 하위 문자열과 일치했을 때 트리거되는 XHR 중단점


<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="add-breakpoints" target="_blank"
   rel="noopener noreferrer"><button>Show Me All The Breakpoints</button></a>

이 가이드에서 설명하지 않은 코드 단계별 실행 컨트롤이
몇 가지 있습니다. 자세한 내용은 아래 링크를 참조하세요.

<a class="gc-analytics-event"
   data-category="DevTools / Debug JS / Get Started / Next Steps / Breakpoints"
   href="step-code#stepping_in_action" target="_blank"
   rel="noopener noreferrer"><button>I Want To Master Code Stepping</button></a>

## 피드백

아래 질문에 답해서 이 가이드를 개선하도록 도와주세요.

{% framebox width="auto" height="auto" %}

<p>가이드를 성공적으로 완료했나요?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / Yes">예</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Completed / No">아니요</button>

<p>이 가이드에 찾던 정보가 포함되어 있나요?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / Yes">예</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Relevant / No">아니요</button>

<p>가이드가 너무 길었나요?</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / Yes">예</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS / Get Started"
        data-label="Too Long / No">아니요</button>

{% endframebox %}


{# wf_devsite_translation #}
