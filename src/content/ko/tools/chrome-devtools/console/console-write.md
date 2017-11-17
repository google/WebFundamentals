project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 콘솔 로깅은 페이지 또는 애플리케이션이 수행하는 작업을 검사하는 강력한 방법입니다. console.log()로 시작하고 다른 고급 용도를 탐구해 봅시다.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 진단 및 콘솔에 로그 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
콘솔 로깅은 페이지 또는 애플리케이션이 수행하는 작업을 검사하는 강력한 방법입니다. console.log()로 시작하고 다른 고급 용도를 탐구해 봅시다.


### TL;DR {: .hide-from-toc }
- <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a>를 사용하여 기본적인 로깅을 수행합니다.
- <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> 및 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a>을 사용하여 시선을 끄는 정보를 제공합니다.
- <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> 및 <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a>를 사용하여 관련 메시지를 그룹화하고 정리합니다.
- <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a>를 사용하여 조건부 오류 메시지를 표시합니다.


## 콘솔에 쓰기

<a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> 메서드를 사용하여 콘솔에 기본적인 로깅을 수행합니다. 해당 메서드는 하나 이상의 식을 매개변수로 취하고 현재 값을 콘솔에 쓰고 여러 매개변수를 공백으로 구분된 줄에 연결합니다.

자바스크립트에서 다음 코드 줄을 실행하면


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

Console에 다음과 같이 출력됩니다.
![여러 항목 로그](images/console-write-log-multiple.png)

## 명령 자동완성{:#autocomplete}

Console에 입력하면 Console이 이미 입력된 텍스트와 일치하는 관련 메서드의 
자동완성 드롭다운 메뉴를 
표시합니다. 이는 실행한 이전 명령을 포함합니다.

![자동완성의 예시](images/autocomplete.png)

## 콘솔 출력 구성 {:#organizing}

### 메시지 그룹화

그룹 명령을 사용하여 관련 출력을 그룹화할 수 있습니다. [`console.group()`](./console-reference#consolegroupobject-object-) 명령은 단일 문자열 매개변수를 사용하여 그룹 이름을 설정합니다. 자바스크립트에서 호출하면 콘솔이 모든 후속 출력을 그룹화하기 시작합니다.

그룹화를 끝내려면 작업 완료 후에 [`console.groupEnd()`](./console-reference#consolegroupend)를 호출하기만 하면 됩니다.

입력 예시:


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

출력 예시:
![간단한 콘솔 그룹 출력](images/console-write-group.png)

#### 중첩된 그룹

로그 그룹은 서로 중첩될 수도 있습니다. 이는 큰 그룹을 더 작게 한꺼번에 보는 데 유용합니다.

다음 예시는 로그인 프로세스 인증 단계에 대한 로그 그룹을 보여줍니다.


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

다음은 콘솔에서 중첩된 그룹 출력입니다.
![간단한 콘솔 그룹 출력](images/console-write-nestedgroup.png)

#### 그룹 자동 축소

그룹을 많이 사용하는 경우 일부 항목이 표시되지 않도록 하면 매우 유용할 수 있습니다. 이런 경우 `console.group()` 대신 [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-)을 호출하여 그룹을 자동으로 축소할 수 있습니다.


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

groupCollapsed() output:
![처음에 축소된 그룹](images/console-write-groupcollapsed.png)

## 오류 및 경고

오류 및 경고는 일반 로깅과 동일하게 작동합니다. 유일한 차이는 `error()`와 `warn()`이 주의를 환기시키는 스타일이 있다는 점입니다.

### console.error()

[`console.error()`](./console-reference#consoleerrorobject--object-) 메서드는 빨간색 아이콘과 빨간색 메시지 텍스트를 표시합니다.


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

다음과 같이 나타납니다.

![오류 예시 출력](images/console-write-error-server-not-resp.png)

### console.warn()

[`console.warn()`](./console-reference#consolewarnobject--object-) 메서드는 노란색 경고 아이콘과 메시지 텍스트를 표시합니다.


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

다음과 같이 나타납니다.

![경고 예시](images/console-write-warning-too-few-nodes.png)

## 어설션

[`console.assert()`](./console-reference#consoleassertexpression-object) 메서드는 첫 번째 매개변수가 `false`로 평가되는 경우에만 오류 문자열(두 번째 매개변수)을 조건부로 표시합니다.

### 간단한 어설션 및 표시 방법

다음 코드는 `list` 요소에 속하는 자식 노드가 500보다 큰 경우에만 콘솔에 오류 메시지를 표시합니다.


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

어설션 실패가 콘솔에 표시되는 모습:
![어설션 실패](images/console-write-assert-failed.png)

## 문자열 대체 및 서식 지정

로깅 메서드로 전달되는 첫 번째 매개변수는 하나 이상의 서식 지정자를 포함할 수 있습니다. 서식 지정자는 `%` 기호와 그 뒤에 값에 적용되는 서식을 나타내는 문자로 구성됩니다. 문자열 뒤의 매개변수는 자리표시자에 순서대로 적용됩니다.

다음 예시는 문자열과 숫자 포맷터를 사용하여 출력 문자열에 값을 삽입합니다. 콘솔에 'Sam has 100 points'가 표시됩니다.

    console.log("%s has %d points", "Sam", 100);

서식 지정자의 전체 목록은 다음과 같습니다.

| 지정자 | 출력                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | 값의 서식을 문자열로 지정합니다.                                                     |
| %i or %d  | 값의 서식을 정수로 지정합니다.                                                   |
| %f        | 값의 서식을 부동 소수점 값으로 지정합니다.                                       |
| %o        | 값의 서식을 확장 가능한 DOM 요소로 지정합니다. Elements 패널 참조     |
| %O        | 값의 서식을 확장 가능한 자바스크립트 객체로 지정합니다.                              |
| %c        | 두 번째 매개변수에서 지정한 대로 CSS 스타일 규칙을 출력 문자열에 적용합니다.

다음 예시는 숫자 지정자를 사용하여 `document.childNodes.length` 값의 서식을 지정합니다. 또한 부동 소수점 지정자를 사용하여 `Date.now()` 값의 서식을 지정합니다.

코드:


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

이전 코드 샘플의 출력:
![대체 출력 예시](images/console-write-log-multiple.png)

### CSS로 콘솔 출력 스타일 지정

CSS 서식 지정자를 사용하여 콘솔 표시를 사용자설정할 수 있습니다.
해당 지정자를 사용하여 문자열을 시작하고 두 번째 매개변수로 적용할 스타일을 제공합니다.

다음 코드를 사용하면


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

..로그 출력을 파란색으로 크게 표시되게 할 수 있습니다.

![서식이 있는 문자열](images/console-write-format-string.png)

### DOM 요소를 자바스크립트 객체로 서식 지정

기본적으로 DOM 요소는 HTML 표현으로 콘솔에 로그되지만 DOM 요소를 자바스크립트 객체로 액세스하여 해당 속성을 검사하길 원할 수 있습니다. 이 경우 `%o` 문자열 지정자를 사용하거나(위 참조) `console.dir`을 사용할 수 있습니다. 

![dir()을 사용하여 요소 로깅](images/dir-element.png)




{# wf_devsite_translation #}
