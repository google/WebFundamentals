project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Console API를 사용하여 실행 시간을 측정하고 문 실행을 계산합니다.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 실행 측정 및 계산 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Console API를 사용하여 실행 시간을 측정하고 문 실행을 계산합니다.


### TL;DR {: .hide-from-toc }
-  <code>console.time()</code> 및 <code>console.timeEnd()</code>를 사용하여 코드 실행 지점 간 경과 시간을 추적합니다.
-  <code>console.count()</code>를 사용하여 동일한 문자열이 함수에 전달된 횟수를 계산합니다.


## 실행 시간 측정

[`time()`](./console-reference#consoletimelabel) 메서드는 새로운 타이머를 시작하며, 소요된 시간을 측정하는 데 매우 유용합니다. 문자열을 해당 메서드에 전달하여 마커의 이름을 지정합니다.

타이머를 중지하려면 [`timeEnd()`](./console-reference#consoletimeendlabel)를 호출하고, 이니셜라이저에 전달된 것과 동일한 문자열을 전달합니다.

그러면 콘솔이 `timeEnd()` 메서드가 실행될 때 경과한 시간과 레이블을 기록합니다.

### 기본 예시

여기에서는 백만 개의 새 배열의 초기화를 측정합니다.


    console.time("Array initialize");
    var array= new Array(1000000);
    for (var i = array.length - 1; i >= 0; i--) {
        array[i] = new Object();
    };
    console.timeEnd("Array initialize");
    

콘솔에 다음과 같이 출력됩니다.
![경과한 시간](images/track-executions-time-duration.png)

###  타임라인의 타이머

[타임라인](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) 기록이 `time()` 작업 중에 발생하는 경우 타임라인에 주석도 답니다. 애플리케이션의 작업과 출처를 추적하고자 할 때 이를 사용합니다.

`time()`에서 타임라인 주석의 모습은 다음과 같습니다.

![타임라인의 시간 주석](images/track-executions-time-annotation-on-timeline.png)

### 타임라인 만들기

*참고: 타임라인 기록이 진행 중인 동안에는 `timeStamp()` 메서드만 작동합니다.*

[Timeline 패널](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)은 엔진이 시간을 소모하는 부분을 전체적으로 보여줍니다.
[`timeStamp()`](./console-reference#consoletimestamplabel)를 사용하여 콘솔에서 타임라인에 표시를 추가할 수 있습니다. 이 방식으로 애플리케이션의 이벤트와 다른 이벤트의 상관 관계를 쉽게 지정할 수 있습니다.

`timeStamp()`는 다음 위치에 타임라인 주석을 답니다.

- 타임라인의 요약 및 세부정보 뷰에서 노란색 세로줄.
- 이벤트 목록에 기록을 추가합니다.

다음 예시 코드는


    function AddResult(name, result) {
        console.timeStamp("Adding result");
        var text = name + ': ' + result;
        var results = document.getElementById("results");
        results.innerHTML += (text + "<br>");
    }
    

다음 타임라인 타임스탬프를 생성합니다.

![타임라인의 타임스탬프](images/track-executions-timestamp2.png)

## 명령문 실행 카운트

`count()` 메서드를 사용하여 제공된 문자열과 그 문자열 제공 횟수를 함께 기록합니다. 동일한 줄의 `count()`에 정확한 문이 제공되면 이 값이 증분됩니다.

`count()`를 동적 콘텐츠와 함께 사용한 예시 코드:


    function login(user) {
        console.count("Login called for user " + user);
    }
    
    users = [ // by last name since we have too many Pauls.
        'Irish',
        'Bakaus',
        'Kinlan'
    ];
    
    users.forEach(function(element, index, array) {
        login(element);
    });
    
    login(users[0]);
    

코드 샘플의 출력:

![console.count() 예시 출력](images/track-executions-console-count.png)




{# wf_devsite_translation #}
