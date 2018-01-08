project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Console API를 사용하여 콘솔에 정보를 기록하고 자바스크립트 프로필을 만들고 디버깅 세션을 시작합니다.

{# wf_updated_on: 2016-03-21 #}
{# wf_published_on: 2016-03-21 #}

# Console API 참조 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Console API를 사용하여 콘솔에 정보를 기록하고 자바스크립트 프로필을 만들고 디버깅 세션을 시작합니다.



## console.assert(expression, object) {:#assert}

평가된 식이
`false`이면 콘솔에 [오류](#error)를 기록합니다. 


    function greaterThan(a,b) {
      console.assert(a > b, {"message":"a is not greater than b","a":a,"b":b});
    }
    greaterThan(5,6);
    

![console.assert() 예시](images/assert.png)

## console.clear() {:#clear}

콘솔을 지웁니다.


    console.clear();
    

[**Preserve log**](index#preserve-log) 확인란을 활성화하면 
`console.clear()`가 비활성화됩니다. 그러나 Console에 포커스를 맞춘 상태에서 **콘솔 지우기** 버튼 
(![콘솔 지우기 버튼](images/clear-console-button.png){:.inline})을 누르거나
단축키<kbd>Ctrl</kbd>+<kbd>L</kbd>을 누르는 동작을
 여전히 사용할 수 있습니다. 

자세한 내용은 [콘솔 지우기](index#clearing)를 참조하세요.

## console.count(label) {:#count}

`count()`가 호출된 횟수를 동일한 
줄에 동일한 레이블을 사용하여 기록합니다.


    function login(name) {
      console.count(name + ' logged in');
    }
    

![console.count() 예시](images/count.png)

자세한 예시는 [명령문 실행 카운트][cse]를 참조하세요.

[cse]: track-executions#counting-statement-executions

## console.debug(object [, object, ...])

[`console.log()`](#log)와 같습니다.

## console.dir(object) {:#dir}

지정된 객체의 자바스크립트 표현을 출력합니다. 로그 중인 객체가 
HTML 요소인 경우 DOM 표현의 속성이 
아래와 같이 출력됩니다.


    console.dir(document.body);
    

![`console.dir()` 예시](images/dir.png)

기능상 동일한 객체 포맷터(`%O`) 등에 대한 자세한 내용은
[문자열 대체 및 서식 지정][of]을 참조하세요.

[of]: console-write#string-substitution-and-formatting

## console.dirxml(object)

가능하면 `object`의 하위 요소의 XML 표현을 출력하고
그렇지 않은 경우 자바스크립트 표현을 출력합니다. HTML 및 XML 요소에서 `console.dirxml()`
을 호출하는 것은 [`console.log()`](#log) 호출과 동일합니다.


    console.dirxml(document);
    

![console.dirxml() 예시](images/dirxml.png)

## console.error(object [, object, ...]) {:#error}

[`console.log()`](#log)와 유사한 메시지를 출력하고
오류와 같은 메시지의 스타일을 지정하고 메서드가
호출된 스택 추적을 포함합니다.


    console.error('error: name is undefined');
    

![console.error() 예시](images/error.png)

## console.group(object[, object, ...])

선택적 제목을 사용하여 새로운 로깅 그룹을 시작합니다. `console.group()` 후와
`console.groupEnd()` 전에 발생하는 모든 콘솔 출력은 시각적으로
그룹화됩니다. 


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    name({"first":"Wile","middle":"E","last":"Coyote"});
    

![console.group() 예시](images/group.png)

그룹을 중첩할 수도 있습니다.


    function name(obj) {
      console.group('name');
      console.log('first: ', obj.first);
      console.log('middle: ', obj.middle);
      console.log('last: ', obj.last);
      console.groupEnd();
    }
    
    function doStuff() {
      console.group('doStuff()');
      name({"first":"Wile","middle":"E","last":"coyote"});
      console.groupEnd();
    }
    
    doStuff();
    

![nested console.group() 예시](images/nested-group.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.organizing #}

## console.groupCollapsed(object[, object, ...])

처음에는 열리지 않고 접힌 새 로깅 그룹을 만듭니다. 


    console.groupCollapsed('status');
    console.log("peekaboo, you can't see me");
    console.groupEnd();
    

## console.groupEnd() {:#groupend}

로깅 그룹을 닫습니다. 예로 [`console.group`](#group)을 참조하세요.

## console.info(object [, object, ...])

[`console.log()`](#log)와 같은 메시지를 출력할 뿐만 아니라 출력 옆에 아이콘(흰색 'i'가 있는 파란색
원)을 표시합니다. 

## console.log(object [, object, ...]) {:#log}

콘솔에 메시지를 표시합니다. 한 개 이상의 객체를 이 메서드로 전달합니다.
각 객체는 평가되어 공백으로 구분된 문자열로 연결됩니다.


    console.log('Hello, Logs!');
    

### 서식 지정자 {:#format-specifiers}

전달한 첫 번째 객체는 **서식 지정자**를 한 개 이상 포함할 수 있습니다. 
서식 지정자는 퍼센트 기호(`%`)와 그 뒤에 적용할 서식을 나타내는 문자로
구성됩니다. 

관련 가이드:

* [콘솔 출력 구성](console-write)

## console.profile([label]) {:#profile}

선택적 레이블을 사용하여 자바스크립트 CPU 프로필을 시작합니다. 
프로필을 완료하려면 `console.profileEnd()`를 호출합니다. 각 프로필은 **Profiles**
패널에 추가됩니다.


    function processPixels() {
      console.profile("processPixels()");
      // later, after processing pixels
      console.profileEnd();
    }
    

## console.profileEnd() {:#profileend}

진행 중인 자바스크립트 CPU 프로파일링 세션을 중지하고 
보고서를 **Profiles** 패널에 출력합니다.

예로 [`console.profile()`](#profile)을 참조하세요.

## console.time(label) {:#time}

연결된 레이블을 사용하여 새로운 타이머를 시작합니다. 동일한 레이블로 `console.timeEnd()`를 호출하면 
타이머가 중지하고 경과 시간이
콘솔에 표시됩니다. 타이머 값은 밀리초 이하까지 정확합니다.
`time()` 및 `timeEnd()`에 전달된 문자열은 일치해야 합니다. 그렇지 않으면 타이머가 
끝나지 않습니다.


    console.time("Array initialize");
    var array = new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
      array[i] = new Object();
    }
    console.timeEnd("Array initialize");
    

![console.time() 예시](images/time.png)

## console.timeEnd(label) {:#timeend}

진행 중인 현재 타이머를 중지하고 타이머 레이블과 
경과 시간을 콘솔에 차례로 출력합니다. 

예로 [`console.time()`](#time)을 참조하세요. 

## console.timeStamp([label]) {:#timestamp}

기록 세션 동안 이벤트를 **타임라인**에 추가합니다. 


    console.timeStamp('check out this custom timestamp thanks to console.timeStamp()!');
    

![console.timeStamp() 예시](images/timestamp.png)

관련 가이드:

* [Timeline
  도구 사용](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)

## console.trace(object) {:#trace}

메서드를 호출한 지점에서 스택 추적을 출력합니다. 

    console.trace();

![console.trace() 예시](images/trace.png)

## console.warn(object [, object, ...]) {:#warn}

[`console.log()`](#log)와 같은 메시지를 출력하면서
로깅된 메시지 옆에 노란색 경고 아이콘도 표시합니다.

    console.warn('user limit reached!');

![console.warn() 예시](images/warn.png)


{# wf_devsite_translation #}
