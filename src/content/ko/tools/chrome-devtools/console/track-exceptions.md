project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools는 예외가 발생한 웹페이지를 수정하고 자바스크립트 오류를 디버그하는 데 도움이 되는 도구를 제공합니다.

{# wf_updated_on: 2015-05-12 #}
{# wf_published_on: 2015-04-13 #}

# 예외 및 오류 처리 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools는 예외가 발생한 웹페이지를 수정하고 자바스크립트 오류를 디버그하는 데 도움이 되는 도구를 제공합니다.

페이지 예외 및 자바스크립트 오류는 관련 세부정보에 접근할 수 있는 경우 실제로 매우 유용합니다. 페이지 예외 또는 스크립트 오류가 발생하면 콘솔이 문제를 찾고 해결하는 데 도움이 되는 구체적이고 신뢰할 수 있는 정보를 제공합니다. 

콘솔에서 예외를 추적하고, 예외를 유발하는 실행 경로를 추적하고, 예외를 명시적으로 또는 묵시적으로 포착하고(또는 무시하고) 심지어 예외 데이터를 자동으로 수집 및 처리하도록 오류 핸들러를 설정할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 예외 발생 시 코드 컨텍스트를 디버그하도록 예외 시 일시 중지를 켭니다.
-  <code>console.trace</code>를 사용하여 현재 자바스크립트 호출 스택을 인쇄합니다.
-  <code>console.assert()</code>를 사용하여 코드에 어설션을 배치하고 예외를 발생합니다.
-  <code>window.onerror</code>를 사용하여 브라우저에서 발생하는 오류를 기록합니다.


## 예외 추적

문제가 발생한 경우 DevTools 콘솔을 열어(`Ctrl+Shift+J` / `Cmd+Option+J`) 자바스크립트 오류 메시지를 봅니다.
각 메시지에는 파일 이름에 대한 링크와 이동할 수 있는 줄 번호가 있습니다.

예외 관련 예시:
![예외 예시](images/track-exceptions-tracking-exceptions.jpg)

### 예외 스택 추적 보기

오류를 유발한 실행 경로가 무엇인지 분명하지 않은 경우가 있습니다.
전체 자바스크립트 호출 스택은 콘솔에서 예외를 수반합니다.
이러한 콘솔 메시지를 확장하여 코드에서 스택 프레임을 보거나 해당 위치로 이동합니다.

![예외 스택 추적](images/track-exceptions-exception-stack-trace.jpg)

### 자바스크립트 예외에서 일시 중지

다음에 예외가 발생할 경우
자바스크립트 실행을 일시 중지하고 호출 스택,
범위 변수 및 앱 상태를 검사합니다.
Scripts 패널 아래쪽의 3상 중지 버튼을 사용하여 여러 예외 처리 모드 간에 전환할 수 있습니다. ![일시 중지 버튼](images/track-exceptions-pause-gray.png){:.inline}

모든 예외 발생 시 일시 중지하거나 포착할 수 없는 예외에서만 일시 중지하거나 예외를 완전히 무시할 수 있습니다.

![일시 중지 실행](images/track-exceptions-pause-execution.jpg)

## 스택 추적 출력

로그 메시지를 콘솔에 출력하여
웹페이지 작동 방식을 더 잘 이해할 수 있도록 합니다.
관련 스택 추적을 포함하여 로그 항목을 더 많은 정보를 제공하도록 만듭니다. 이를 위한 여러 방법이 있습니다.

### Error.stack
각 Error 객체는 스택 추적을 포함하는 stack이라는 문자열 속성을 갖고 있습니다.

![Error.stack 예시](images/track-exceptions-error-stack.jpg)

### console.trace()

현재 자바스크립트 호출 스택을 출력하는 [`console.trace()`](./console-reference#consoletraceobject) 호출을 코드에 포함합니다.

![console.trace() 예시](images/track-exceptions-console-trace.jpg)

### console.assert()

첫 번째 매개변수가 오류 조건인 [`console.assert()`](./console-reference#consoleassertexpression-object)
를 호출하여 자바스크립트 코드에 어설션을 배치합니다.
이 식이 false로 평가되는 경우
해당 콘솔 기록을 확인할 수 있습니다.

![console.assert() 예시](images/track-exceptions-console-assert.jpg)

## 스택 추적을 조사하여 트리거를 찾는 방법

방금 배운 도구를 사용하는 방법을 살펴보고
오류의 실제 원인을 찾아봅시다.
다음은 2개의 스크립트를 포함하는 간단한 HTML 페이지입니다.

![예시 코드](images/track-exceptions-example-code.png)

사용자가 해당 페이지를 클릭하면
단락이 내부 텍스트를 변경하고
`lib.js`가 제공하는 `callLibMethod()` 함수가 호출됩니다.

이 함수는 `console.log`를 출력한
후에 Console API가 제공하지 않는 메서드인 `console.slog`
를 호출합니다.
이 경우 오류가 트리거됩니다.

실행 중인 해당 페이지를 클릭하면
다음 오류가 트리거됩니다.

![오류 트리거됨](images/track-exceptions-example-error-triggered.png)

화살표를 클릭하면 오류 메시지가 확장됩니다.

![오류 메시지 확장됨](images/track-exceptions-example-error-message-expanded.png)

콘솔은 오류가 `lib.js`(4번째 줄)에서 트리거되었고
익명 함수인 `addEventListener` 콜백에서
`script.js`(3번째 줄)가 호출했음을 알려줍니다.

이 예시는 매우 간단하지만
매우 복잡한 로그 추적 디버깅의 프로세스도 이와 동일합니다.

## window.onerror를 사용하여 런타임 예외 처리

Chrome은 자바스크립트 코드 실행에서 오류가 발생할 때마다 호출되는 `window.onerror` 핸들러 함수를
 노출합니다.
창 상황에서 자바스크립트 예외가 발생하고
try/catch 블록에서 포착되지 않은 경우,
해당 함수가 예외 메시지,
예외가 발생한 파일의 URL
및 해당 파일에서 줄 번호
와 함께 호출되고, 이 순서대로 3개의 인수가 전달됩니다.

포착되지 않은 예외에 대한 정보를 수집하고 AJAX POST 호출 등을 사용하여 서버에 다시 보고하도록 오류 핸들러를 설정하는 것이 유용할 수 있습니다. 이런 식으로 사용자의 브라우저에서 발생하는 모든 오류를 기록하고 해당 오류에 대한 알림을 받을 수 있습니다.

`window.onerror` 사용 예시:

![window.onerror 핸들러의 예시](images/runtime-exceptions-window-onerror.jpg)




{# wf_devsite_translation #}
