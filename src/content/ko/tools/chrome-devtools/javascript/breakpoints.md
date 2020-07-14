project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Chrome DevTools에서 코드를 일시 중지하는 모든 방법을 알아봅니다.

{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2017-02-03 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# 중단점으로 코드 일시 중지하기 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

중단점을 사용하여 자바스크립트 코드를 일시 중지합니다. 이 가이드는 DevTools에서 이용할 수 있는
중단점의 각 유형을 설명하고, 각각을 사용해야 하는 경우와
설정 방법도 설명합니다. 디버깅 프로세스 실습 가이드는 [Get
Started with Debugging JavaScript in Chrome
DevTools](/web/tools/chrome-devtools/javascript/)를 참조하세요.

## 각 중단점 유형을 사용해야 하는 경우에 대한 개요 {: #overview }

가장 잘 알려진 유형의 중단점은 코드 줄(Line-of-code)입니다. 그러나 코드 줄
중단점 설정은 정확히 어디를 봐야 하는지
모를 때나, 큰 규모의 코드베이스로 작업할 때 특히 비효율적입니다. 언제 어떤 다른
유형의 중단점을 사용해야 하는지 알면 디버깅을 할 때 시간을 절약할 수
있습니다.

<table>
  <tr><th>중단점 유형</th><th>일시 중지하고 싶은 지점</th></tr>
  <tr>
    <td><a href="#loc">코드 줄</a></td>
    <td>
      정확한 코드 영역.
    </td>
  </tr>
  <tr>
    <td><a href="#conditional-loc">조건부 코드 줄</a></td>
    <td>
      정확한 코드 영역(몇 가지 다른 조건이 참일 때에만).
    </td>
  </tr>
  <tr>
    <td><a href="#dom">DOM</a></td>
    <td>
      특정 DOM
      노드나 그 하위 요소를 변경 또는 삭제하는 코드.
    </td>
  </tr>
  <tr>
    <td><a href="#xhr">XHR</a></td>
    <td>
      XHR URL이 문자열 패턴을 보유할 때
    </td>
  </tr>
  <tr>
    <td><a href="#event-listeners">이벤트 리스너</a></td>
    <td>
      이벤트 후에 실행되는
      <code>click</code>과 같은 코드가 실행될 때.
    </td>
  </tr>
  <tr>
    <td><a href="#exceptions">예외</a></td>
    <td>
      포착 또는
      미포착 예외를 생성하는 코드 줄.
    </td>
  </tr>
  <tr>
    <td><a href="#function">함수</a></td>
    <td>
      특정 함수가 호출될 때마다.
    </td>
  </tr>
</table>

## 코드 줄 중단점 {: #loc }

조사해야 하는 정확한 코드 영역을 알고 있을 때 코드 줄 중단점을
사용합니다. DevTools은 *항상* 이 코드 줄이
실행되기 전에 일시 중지합니다.

DevTools에서 코드 줄 중단점을 설정하려면 다음을 수행합니다.

1. **Sources** 탭을 클릭합니다.
1. 중단하고 싶은 코드 줄이 담긴 파일을 엽니다.
1. 해당 코드 줄로 이동합니다.
1. 코드 줄의 왼쪽에 줄 번호 열이 있습니다. 이것을 클릭합니다. 파란
 아이콘이 줄 번호 열 위에 나타납니다.

<figure>
  <img src="imgs/loc-breakpoint.png"
       alt="코드 줄 중단점."
  <figcaption>
    <b>그림1</b>: <b>29</b>번째 줄에 설정된 코드 줄 중단점
  </figcaption>
</figure>

### 코드 내 코드 줄 중단점 {: #debugger }

코드 내의 일시 중지할 줄에서 `debugger`를 호출합니다. 이 방법은
[코드 줄 중단점](#loc)과 동일하지만, 중단점이 DevTools UI가 아니라
코드 내에 설정된다는 점이 다릅니다.

    console.log('a');
    console.log('b');
    debugger;
    console.log('c');

### 조건부 코드 줄 중단점 {: #conditional-loc }

조사할 정확한 코드 영역을 알고 있지만 일부 조건이 참일 때만
일시 중지하고 싶을 때 조건부 코드 줄 중단점을
사용합니다.

조건부 코드 줄 중단점을 설정하려면 다음을 수행합니다.

1. **Sources** 탭을 클릭합니다.
1. 중단하고 싶은 코드 줄이 담긴 파일을 엽니다.
1. 해당 코드 줄로 이동합니다.
1. 코드 줄의 왼쪽에 줄 번호 열이 있습니다. 오른쪽 클릭합니다.
1. **Add conditional breakpoint**를 선택합니다. 해당 코드 줄 아래에
   대화상자가 표시됩니다.
1. 조건을 대화상자에 입력합니다.
1. <kbd>Enter</kbd>를 눌러 중단점을 활성화합니다. 주황색 아이콘이
   줄 번호 열 위에 나타납니다.

<figure>
  <img src="imgs/conditional-loc-breakpoint.png"
       alt="조건부 코드 줄 중단점"
  <figcaption>
    <b>그림 2</b>:
    <b>32</b>번째 줄에 설정된 조건부 코드 줄 중단점
  </figcaption>
</figure>

### 코드 줄 중단점 관리하기 {: #manage-loc }

**Breakpoints** 창을 이용하여
한 위치에서 코드 줄 중단점을 비활성화하거나 삭제할 수 있습니다.

<figure>
  <img src="imgs/breakpoints-pane.png"
       alt="Breakpoints 창."
  <figcaption>
    <b>그림 3</b>: 두 개의 코드 줄
    중단점이 표시된 <b>Breakpoints</b> 창: 하나는 <code>get-started.js</code>의 15번째 줄이며, 다른 하나는
    32번째 줄
  </figcaption>
</figure>

* 엔트리 옆의 확인란을 선택하여 해당 중단점을 비활성화합니다.
* 엔트리를 오른쪽 클릭하여 해당 중단점을 삭제합니다.
* **Breakpoints** 창의 임의의 지점을 오른쪽 클릭하면 모든
  중단점을 비활성화하거나, 중지하거나, 삭제합니다. 모든 중단점을
  비활성화하는 것은 각각을 선택 해제하는 것과 동일합니다. 모든
  중단점을 비활성화하면 DevTools이 모든 코드 줄 중단점을 무시하지만
  사용 상태를 유지하여
  다시 활성화할 때 이전과 동일한 상태가 되도록 지시합니다.

<figure>
  <img src="imgs/deactivated-breakpoints.png"
       alt="Breakpoints 창 내의 비활성화된 중단점."
  <figcaption>
    <b>그림 4</b>: <b>Breakpoints</b> 창 내의 비활성화된 중단점이
    중지되어 투명합니다
  </figcaption>
</figure>

## DOM 변경 중단점 {: #dom }

DOM 노드 또는 그 하위 요소를 변경하는
코드에서 일시 중지하고 싶을 때 DOM 변경 중단점을 사용합니다.

DOM 변경 중단점을 설정하려면 다음을 수행합니다.

1. **Elements** 탭을 클릭합니다.
1. 중단점을 설정하고 싶은 요소로 이동합니다.
1. 요소를 오른쪽 클릭합니다.
1. **Break on**으로 마우스를 가져간 다음 **Subtree modifications**, **Attribute
  modifications**, 또는 **Node removal**을 선택합니다.

<figure>
  <img src="imgs/dom-change-breakpoint.png"
       alt="DOM 변경 중단점 생성을 위한 컨텍스트 메뉴."
  <figcaption>
    <b>그림 5</b>: DOM 변경 중단점 생성을 위한 컨텍스트 메뉴
  </figcaption>
</figure>

### DOM 변경 중단점의 유형 {: #dom-types }

* **Subtree modifications**. 현재 선택한
 노드의 하위 요소가 삭제 또는 추가되거나 하위 요소의 콘텐츠가 변경될 때 트리거됩니다. 하위 요소 노드의
  속성이 변경되거나 현재 선택한 노드가 변경될 때는
  트리거되지 않습니다.

* **Attributes modifications**: 현재 선택한 노드에 속성을 추가 또는 삭제하거나
  속성 값이 변경될 때 트리거됩니다.

* **Node Removal**: 현재 선택된 노드가 삭제될 때 트리거됩니다.

## XHR/Fetchbreakpoints {: #xhr }

XHR의 요청 URL이 특정 문자열을 담고 있는 경우 중단하려면 XHR
중단점을 사용합니다. DevTools은 XHR이
`send()`를 호출하는 코드 줄에서 일시 중지합니다.

참고: 이 기능은 [Fetch][Fetch] 요청에도 작동합니다.

이 방법이 유용한 예로는
페이지가 올바르지 않은 URL을 요청한 것을 확인하고, 올바르지 않은 요청을 일으키는 AJAX나
Fetch 소스 코드를 빠르게 찾고자 할 때입니다.

XHR 중단점을 설정하려면 다음을 수행합니다.

1. **Sources** 탭을 클릭합니다.
1. **XHR Breakpoints** 창을 펼칩니다.
1. **Add breakpoint**를 클릭합니다.
1. 중단하고 싶은 문자열을 입력합니다. DevTools는 이
   문자열이 XHR의 요청 URL 내에 존재하면 일시 중지합니다.
1. <kbd>Enter</kbd>를 눌러 확인합니다.

<figure>
  <img src="imgs/xhr-breakpoint.png"
       alt="XHR 중단점 생성."
  <figcaption>
    <b>그림 6</b>: <b>XHR Breakpoints</b>에서
    URL에 <code>org</code>을 포함하는 모든 요청에 대한 XHR 중단점 생성
  </figcaption>
</figure>

[Fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

## 이벤트 리스너 중단점 {: #event-listeners }

이벤트가 시작된 후 실행되는 이벤트 리스너 코드에서 일시 중지하고 싶을 때
이벤트 리스너 중단점을 사용합니다. `click`과
같은 특정 이벤트를 선택하거나, 모든 마우스 이벤트와 같은 여러 범주의 이벤트를 선택할 수도 있습니다.

1. **Sources** 탭을 클릭합니다.
1. **Event Listener Breakpoints** 창을 펼칩니다. DevTools이 **Animation**과 같은 이벤트 카테고리 목록을
   표시합니다.
1. 해당 카테고리의 이벤트가
   실행될 때 일시 중지하고 싶은 카테고리를 하나 선택하거나, 카테고리를 펼쳐 특정 이벤트를 선택합니다.

<figure>
  <img src="imgs/event-listener-breakpoint.png"
       alt="이벤트 리스너 중단점 생성."
  <figcaption>
    <b>그림 7</b>: <code>deviceorientation</code>에
    대한 이벤트 리스너 중단점 생성
  </figcaption>
</figure>

## 예외 중단점 {: #exceptions }

포착 또는 미포착 예외를 생성하는
코드 줄에서 일시 중지하고 싶은 경우 예외 중단점을 사용합니다.

1. **Sources** 탭을 클릭합니다.
1. **Pause on exceptions** ![예외에서
   일시 중지](imgs/pause-on-exceptions.png)를 클릭합니다{:.devtools-inline}. 활성화되면
   파란색으로 변합니다.
1. (옵션) 미포착 예외와 더불어 포착 예외에도 일시 중지하고 싶다면
   **Pause On Caught Exceptions** 확인란을 선택합니다.

<figure>
  <img src="imgs/uncaught-exception.png"
       alt="미포착 예외에서 일시 중지."
  <figcaption>
    <b>그림 7</b>: 미포착 예외에서 일시 중지
  </figcaption>
</figure>

## 함수 중단점 {: #function }

특정 함수가 호출될 때마다 일시 중지하고 싶다면 `debug(functionName)`를 호출합니다. 이때, `functionName`은
디버그하고 싶은 함수입니다. 코드에 `debug()`를
입력(예: `console.log()` 문)하거나, DevTools 콘솔에서
호출합니다. `debug()`는
[코드 줄 중단점](#loc) 설정과 함수의 첫 번째 줄이 동일합니다.

    function sum(a, b) {
      let result = a + b; // DevTools pauses on this line.
      return result;
    }
    debug(sum); // Pass the function object, not a string.
    sum();


### 대상 함수가 범위 내에 있는지 확인 {: #scope }

DevTools은 디버그하려는 함수가
범위 내에 없으면 `ReferenceError`를 생성합니다.

    (function () {
      function hey() {
        console.log('hey');
      }
      function yo() {
        console.log('yo');
      }
      debug(yo); // This works.
      yo();
    })();
    debug(hey); // This doesn't work. hey() is out of scope.

DevTools 콘솔에서 `debug()`를
호출하는 경우, 대상 함수가 범위 내에 있는지 확인하는 것이 어려울 수 있습니다. 한 가지 전략은 다음과 같습니다.

1. 함수가
   범위인 영역 어딘가에 [코드 줄 중단점](#loc)을 설정합니다.
1. 중단점을 트리거합니다.
1. 코드가 코드 줄 중단점에서
   아직 일시 중지된 동안 DevTools 콘솔에서 `debug()`를 호출합니다.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
