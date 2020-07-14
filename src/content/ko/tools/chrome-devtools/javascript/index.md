project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Chrome DevTools의 이용 방법 및 자바스크립트 버그 수정 방법에 대해 알아봅니다.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-01-04 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Chrome DevTools에서 자바스크립트 디버깅 시작하기 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

이 가이드는 DevTools에서 자바스크립트 문제를 디버깅하는 기본 워크플로를 알려줍니다.
계속 읽거나 아래에서 이 가이드의 동영상 버전을 시청하세요.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="H0XScE08hy8"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


## 1단계: 버그 재현 {: #reproduce }

지속적으로 버그를 생성하는 일련의 동작을 찾는 것이 언제나
디버깅의 첫 번째 단계입니다.

1. **Open Demo**를 클릭합니다. 데모가 새 탭에서 열립니다.

     <a href="https://googlechrome.github.io/devtools-samples/debug-js/get-started"
       target="devtools"
       rel="noopener noreferrer">
       <button>Open Demo</button>
     </a>

1. **Number 1** 텍스트 상자에 `5`를 입력합니다.
1. **Number 2** 텍스트 상자에 `1`을 입력합니다.
1. **Add Number 1 and Number 2**를 클릭합니다. 버튼 아래의 라벨이 `5 + 1 = 51`로 나타납니다. 결과는
   `6`이어야 합니다. 이제부터 이 버그를 수정하겠습니다.

     <figure>
       <img src="imgs/bug.png"
         alt="5 + 1의 결과가 51입니다. 정답은 6이어야 합니다."/>
       <figcaption>
         <b>그림 1</b>. 5 + 1의 결과가 51입니다. 정답은 6이어야 합니다.
     </figcaption>
     </figure>

## 2단계: 소스 패널 UI 익히기 {: #sources-ui }

DevTools은 CSS 변경, 페이지 로드 성능
프로파일링, 네트워크 요청 모니터링과 같은 다양한 작업을 위한 다양한 도구를 제공합니다. **Source** 패널은 자바스크립트를
디버그하는 곳입니다.

1. <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd>(Mac)
   또는 <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd>(Windows, Linux)를 눌러서 DevTools를 엽니다. 이 단축키는
   **Console** 패널을 엽니다.

     <figure>
       <img src="imgs/console.png" alt="Console 패널"/>
       <figcaption>
         <b>그림 2</b>. <b>Console</b> 패널
       </figcaption>
     </figure>

1. **Sources** 탭을 클릭합니다.

     <figure>
       <img src="imgs/sources.png" alt="Sources 패널."/>
       <figcaption>
         <b>그림 3</b>. <b>Sources</b> 패널
       </figcaption>
     </figure>

**Sources** 패널 UI는 3개 부분으로 나뉩니다.

<figure>
  <img src="imgs/sources-annotated.png" alt="Sources 패널 UI의 3개 부분."/>
  <figcaption>
    <b>그림 4</b>. <b>Sources</b> 패널 UI의 3개 부분
  </figcaption>
</figure>

1. **File Navigator** 창. 해당 페이지가 요청하는 모든 파일이 여기에 나열됩니다.
2. **Code Editor** 창. **File Navigator** 창에서 파일을 선택한 후, 해당 파일의 콘텐츠가
   여기에 표시됩니다.
3. **JavaScript Debugging** 창. 페이지의 자바스크립트를 검사하는 다양한 도구입니다. DevTools 창이 넓다면
   이 창이 **Code Editor** 창의 오른쪽에 표시됩니다.

## 3단계: 중단점으로 코드 일시 중지 {: #event-breakpoint }

이러한 문제를 디버깅하는 흔한 방법은 코드에 `console.log()`
문을 많이 넣어 스크립트가 실행되는 동안 값을 검사하는 것입니다. 예:

<pre class="prettyprint">function updateLabel() {
  var addend1 = getNumber1();
  <strong>console.log('addend1:', addend1);</strong>
  var addend2 = getNumber2();
  <strong>console.log('addend2:', addend2);</strong>
  var sum = addend1 + addend2;
  <strong>console.log('sum:', sum);</strong>
  label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;
}</pre>

`console.log()` 메서드로도 작업을 완료할 수는 있지만, **중단점**이 더 빠르게 수행할 수 있습니다.
중단점을 이용하면 실행 도중에 코드를 일시 중지하고 해당 시점의 *모든* 변수
값을 시간 내에 검사할 수 있습니다. 중단점은 `console.log()` 메서드에 비해 몇 가지 이점이 있습니다.

* `console.log()`을 이용하면 수동으로 소스 코드를 열고, 관련 코드를 찾고,
  `console.log()` 문을 삽입한 다음, 메시지가
  콘솔에 들어갔는지 확인하기 위해 페이지를 새로고침해야 합니다. 중단점을 이용하면 코드의 구조를
  모르더라도 관련 코드에서 일시 중지할 수 있습니다.
* `console.log()` 문에서 검사하고 싶은
  각 값을 명시적으로 밝혀야 합니다. 중단점을 이용하여 DevTools는 해당 시점의 모든 변수의 값을
  제시간 내에 보여줍니다. 때때로 본인도 알지 못하는 변수가 코드에 영향을 미치기도 합니다.

정리하면, 중단점은 여러분이 `console.log()` 메서드보다 더 빠르게 버그를 찾고 수정하는 데 도움을 줍니다.

잠시 시간을 갖고 앱이 어떻게 작동하는지 생각해보면 올바르지 않은 합(`5 + 1 = 51`)이 `click` 이벤트 리스너에서 연산되었다는 것을
추론할 수 있습니다. 이 이벤트 리스너는
**Add Number 1 and Number 2** 버튼과 관련되어 있습니다. 따라서, `click` 리스너가 실행될 때 쯤에 코드를
일시 중지하고 싶을 것입니다. **이벤트 리스너 중단점**이
이 작업을 도와줍니다.

1. **JavaScript Debugging** 창에서 **Event Listener Breakpoints**를 클릭하여 섹션을
   펼칩니다. DevTools이 **Animation** 및
   **Clipboard**와 같은 펼칠 수 있는 이벤트 카테고리의 목록을 표시합니다.
1. **Mouse** 이벤트 카테고리 옆의 **Expand** ![펼치기
   아이콘](/web/tools/chrome-devtools/images/expand.png)를 클릭합니다{: .devtools-inline}.
   DevTools이 **click** 및 **mousedown**과 같은 마우스 이벤트의 목록을 표시합니다. 각 이벤트 옆에는
  확인란이 있습니다.
1. **click**의 확인란을 체크합니다. DevTools이 이제 *모든*
   `click` 이벤트 리스너가 실행될 때마다 자동으로 일시 중지되도록 설정됩니다.


     <figure>
       <img src="imgs/get-started-click-breakpoint.png"
         alt="클릭 확인란이 활성화되었습니다."/>
       <figcaption>
         <b>그림 5</b>. <b>클릭</b> 확인란이 활성화되었습니다.
       </figcaption>
     </figure>


1. 다시 데모로 돌아와 **Add Number 1 and Number 2**를 클릭합니다. DevTools이
   데모를 일시 중지하고 **Source** 패널의 코드를 강조표시합니다.
   DevTools는 해당 코드 줄에서 일시 중지해야 합니다.

     <pre class="prettyprint">function onClick() {</pre>

     다른 코드 줄에서 일시 중지된다면 올바른 줄에서 일시 중지될 때까지 **Resume Script Execution** ![스크립트
     실행 재개][resume]을{:.cdt-inl} 누릅니다.

     <aside class="note">
       **참고**: 다른 줄에서 일시 중지되었다면 여러분이 방문한 모든 페이지의 `click` 이벤트 리스너를 등록하는
       브라우저 확장 프로그램을 사용 중일 수 있습니다. 해당
       확장 프로그램의 `click` 리스너에서 일시 중지됩니다. [비공개로
       브라우징][incognito]하기 위해 시크릿 모드를 사용하면, 이 모드는 모든 확장 프로그램을 비활성화하기 때문에 매번
       올바른 코드에서 일시 중지하는 것을 볼 수 있습니다.
     </aside>

[incognito]: https://support.google.com/chrome/answer/95464

**Event Listener Breakpoints**는 DevTools에서 이용할 수 있는 여러 중단점 중 하나에 불과합니다.
모든 유형을 외워두는 것이 좋습니다. 각 유형은 다양한 시나리오에서 가능한 한 빠르게 디버그하는
데 도움을 주기 때문입니다. [Pause Your Code With Breakpoints][breakpoints]를
참조하여 각 유형의 사용 시점과 방법을 배워보세요.

[resume]: /web/tools/chrome-devtools/images/resume-script-execution.png
[breakpoints]: /web/tools/chrome-devtools/javascript/breakpoints

## 4단계: 단계별 코드 실행 {: #code-stepping }

일반적으로 버그는 스크립트를 잘못된 순서로 실행했을 때
발생합니다. 코드를 단계별로 실행하면 코드 실행을 한 번에 한 줄씩 따라가면서
기대한 것과 다른 순서로 실행되는 곳이 어디인지
알아낼 수 있습니다. 체험해 보세요.

1. DevTools의 **Sources** 패널에서 **Step into next function
   call** ![다음 함수 호출 Step Into][into]를 클릭하여{:.devtools-inline} 한 줄에 한 번씩 `onClick()` 함수 실행
   단계를 거칩니다.
   DevTools가 다음 코드 줄을 강조표시합니다.

     <pre class="prettyprint">if (inputsAreEmpty()) {</pre>

1. **Step over next function call** ![다음 함수 호출 Step
Over][over]를 클릭합니다{:.devtools-inline}. DevTools가 Step Into하지 않고 `inputsAreEmpty()`를
   실행합니다. DevTools가 어떻게 몇 줄의 코드를 건너뛰는지 확인해 보세요.
   이것은 `inputsAreEmpty()`가 false로 평가되었기 때문이며, 따라서 `if`
   문의 코드 블록이 실행되지 않습니다.

이는 단계별 코드 실행의 기본 개념입니다. `get-started.js`의
코드를 보면 버그가
`updateLabel()` 함수 어딘가에 있다는 것을 알 수 있습니다. 모든 코드 줄을 단계별로 실행하지 않고
다른 유형의 중단점을 사용하여 버그 위치에 가까운 곳에서 코드를
일시 중지시킬 수 있습니다.

[into]: /web/tools/chrome-devtools/images/step-into.png
[over]: /web/tools/chrome-devtools/images/step-over.png

## 5단계: 코드 줄 중단점 설정 {: #line-breakpoint }

코드 줄 중단점(Line-of-code breakpoints)은 가장 일반적인 유형의 중단점입니다. 일시 중지하고 싶은
코드 줄이 있다면 코드 줄
중단점을 사용하세요.

1. `updateLabel()`의 마지막 코드 줄을 보세요.

     <pre class="prettyprint">label.textContent = addend1 + ' + ' + addend2 + ' = ' + sum;</pre>

1. 이 코드 왼쪽에 **32**라는 코드 줄의 줄 번호가
   보일 것입니다. **32**를 클릭합니다. DevTools가
   **32**. 위에 파란색 아이콘을 표시합니다. 이 줄에 코드 줄 중단점이 있다는 뜻입니다.
   이제 DevTools는 이 코드 줄을 실행하기 전에 항상 일시 중지합니다.
1. **Resume script
execution** ![스크립트 실행 재개][resume]을 클릭합니다{:.devtools-inline}. 이 스크립트가 32에 도달할 때까지
   계속 실행됩니다. 29, 30, 31번째 줄에서 DevTools는
   `addend1`, `addend2`, `sum`의 값을 각 줄의 세미콜론 오른쪽에 출력합니다.

     <figure>
       <img src="imgs/line-of-code-breakpoint.png"
         alt="DevTools이 32번째 줄의 코드 줄 중단점에서 일시 중지합니다."/>
       <figcaption>
         <b>그림 6</b>. DevTools이 32번째 줄의 코드 줄 중단점에서 일시 중지합니다.
       </figcaption>
     </figure>

## 6단계: 변수 값 확인 {: #check-values }

`addend1`, `addend2`, `sum`의 값이 수상합니다. 앞 뒤에 따옴표가 있으니
문자열이라는 뜻입니다. 이것은 버그의 원인을 설명하는 좋은 가설입니다.
이제 정보를 더 많이 모아야 할 때입니다. DevTools은 변수
값을 검사하는 수많은 도구를 제공합니다.

### 방법 1: Scope 창 {: #scope }

코드 줄에서 일시 중지하면 **Scope** 창이 현재 정의된 로컬 및 전역 변수가 무엇인지 각 변수의
값과 함께 표시합니다. 가까운 변수가 있는 경우에는
이것도 표시합니다. 변수 값을 편집하려면 두 번 클릭합니다. 코드 줄에서 일시 중지하지
않으면 **Scope** 창은 빈 상태입니다.

<figure>
  <img src="imgs/scope-pane.png"
    alt="Scope 창."/>
  <figcaption>
    <b>그림 7</b>. <b>Scope</b> 창
  </figcaption>
</figure>

### 방법 2: Watch Expressions {: #watch-expressions }

**Watch Expressions** 탭을 이용하면 시간에 따른 변수 값을 모니터링할 수 있습니다.
'표현식 보기'라는 이름에서 알 수 있듯이, Watch Expressions는 변수에만 국한되지 않습니다. 모든 유효한 자바스크립트 표현식을 Watch Expressions에 저장할
수 있습니다. 체험해 보세요.

1. **Watch** 탭을 클릭합니다.
1. **Add Expression** ![Expression 추가][add]를 클릭합니다{:.devtools-inline}.
1. `typeof sum`을 입력합니다.
1. <kbd>Enter</kbd>를 누릅니다. DevTools이 `typeof sum: "string"`를 표시합니다. 콜론 오른쪽의 값은
   Watch Expression의 결과입니다.

     <figure>
       <img src="imgs/get-started-watch-expression.png"
         alt="Watch Expression 창."/>
       <figcaption>
         <b>그림 8</b>. <code>typeof sum</code> Watch Expression 생성 후의
         Watch Expression 창(오른쪽 아래).
         DevTools 창이 큰 경우 Watch Expression 창은
         <b>Event Listener Breakpoints</b> 창 위의 오른쪽에 있습니다.
       </figcaption>
     </figure>

예상한 바와 같이 `sum`이
숫자여야 하는데 문자열로 평가되고 있습니다. 이제 버그의 원인을 확인했습니다.

### 방법 3: Console {: #console }

`console.log()` 메시지를 보는 것에 더하여, Console을 이용해
임의 자바스크립트 구문을 평가할 수 있습니다. 디버깅의 경우,
잠재적인 버그 수정을 테스트하기 위해 Console을 사용할 수 있습니다. 체험해 보세요.

1. 열린 Console 창이 없다면, <kbd>Esc</kbd>를 눌러
  엽니다. DevTools 창 하단에서 창이 열립니다.
1. Console에 `parseInt(addend1) + parseInt(addend2)`를 입력합니다. 이 구문은
   `addend1`과 `addend2`이 범위 내에 있는 코드 줄에서 일시 중지했기 때문에 작동합니다.
1. <kbd>Enter</kbd>를 누릅니다. DevTools가 명령문을 평가하고
   `6`을 출력합니다. 이 값은 데모가 생성할 것이라 기대한 결과입니다.

     <figure>
       <img src="imgs/get-started-console.png"
         alt="parseInt(addend1) + parseInt(addend2) 평가 후의 Console 창."/>
       <figcaption>
         <b>그림 9</b>. <code>parseInt(addend1) + parseInt(addend2)</code>
         평가 후의 Console 창.
       </figcaption>
     </figure>

[add]: /web/tools/chrome-devtools/javascript/imgs/add-expression.png

## 7단계: 수정 내용 적용 {: #apply-fix }

버그 수정 방법을 찾았습니다. 이제
코드를 편집하고 데모를 다시 실행해 보는 일만 남았습니다. 수정 내용을 적용하기 위해
DevTools를 떠날 필요는 없습니다. DevTools UI 내에서 자바스크립트 코드를
직접 수정할 수 있습니다. 체험해 보세요.

1. **Resume script
execution** ![스크립트 실행 재개][resume]을 클릭합니다{:.devtools-inline}.
1. **Code Editor**에서 31번째 줄 `var sum = addend1 + addend2`을
   `var sum = parseInt(addend1) + parseInt(addend2)`로 바꿉니다.
1. <kbd>Cmmd</kbd>+<kbd>S</kbd>(Mac) 또는
   <kbd>Ctrl</kbd>+<kbd>S</kbd>(Windows, Linux)를 눌러 변경 사항을 저장합니다.
1. **Deactivate breakpoints** ![중단점
   비활성화][deactivate]를 클릭합니다{:.devtools-inline}. 활성화를 나타내도록 파란색을
   변경합니다. 이렇게 설정되면 DevTools은 설정한 모든 중단점을
   무시합니다.
1. 다른 값으로 데모를 테스트합니다. 이제 데모가 올바르게 연산합니다.

Caution: 이 워크플로는 여러분의 브라우저에서 실행되는 코드에만 적용됩니다.
페이지를 방문하는 모든 사용자의 코드를 수정하지는 않습니다. 그렇게 하려면 서버에 있는
코드를 수정해야 합니다.

[deactivate]: /web/tools/chrome-devtools/images/deactivate-breakpoints-button.png

## 다음 단계 {: #next-steps }

축하합니다! 이제
자바스크립트 디버깅에 Chrome DevTools를 활용하는 방법을 배웠습니다. 이 가이드에서 배운 도구와 방법으로 수 시간을 절약할 수 있습니다.

이 가이드는 중단점을 설정하는 두 가지 방법만 보여줍니다. DevTools는
다음을 포함한 여러 가지 다른 방법을 제공합니다.

* 제공한 조건이
  true일 때만 트리거되는 조건부 중단점
* 포착/미포착 예외의 중단점
* 요청된 URL이 입력한
  하위 문자열과 일치했을 때 트리거되는 XHR 중단점

[Pause Your Code With Breakpoints](/web/tools/chrome-devtools/javascript/breakpoints)를
참조하여 각 유형의 사용 시점과 방법을 배워보세요.

이 가이드에서 설명하지 않은 코드 단계별 실행 제어가 몇 가지 있습니다. [Step
over line of code](/web/tools/chrome-devtools/javascript/reference#stepping)를 참조하여 자세히 알아보세요.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
