project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools Command Line API는 이벤트 리스너를 관찰 및 검사하는 다양한 방법을 제공합니다.

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# 이벤트 모니터링 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
Chrome DevTools Command Line API는 이벤트 리스너를 관찰 및 검사하는 다양한 방법을 제공합니다. 자바스크립트가 대화형 페이지에서 핵심 역할을 하고 브라우저가 이벤트 및 이벤트 핸들러를 디버그하는 유용한 도구를 제공합니다.


### TL;DR {: .hide-from-toc }
-  <code>monitorEvents()</code>를 사용하여 특정 유형의 이벤트를 수신합니다.
-  <code>unmonitorEvents()</code>를 사용하여 수신을 중지합니다.
-  <code>getEventListeners()</code>를 사용하여 DOM 요소의 리스너를 가져옵니다.
- Event Listeners Inspector 패널을 사용하여 이벤트 리스너에 대한 정보를 가져옵니다.


## 이벤트 모니터링

[monitorEvents()](/web/tools/chrome-devtools/debug/command-line/command-line-reference#monitoreventsobject-events)
메서드는 지정된 대상에 정보를 기록하도록 DevTools에 지시합니다.

첫 번째 매개변수는 모니터링할 객체입니다.
모든 이벤트는 두 번째 매개변수가 입력되지 않으면 반환됩니다.
수신할 이벤트를 지정하려면
문자열 또는 문자열 배열을 두 번째 매개변수로 전달하세요.

페이지 본문에서 클릭 이벤트 수신:

    monitorEvents(document.body, "click");

모니터링하는 이벤트가 DevTools에서 표준 이벤트 이름 집합으로 매핑되는 지원 *이벤트 유형*이라면
이 메서드는 해당 유형의 이벤트를 수신합니다.


[Command Line API](/web/tools/chrome-devtools/debug/command-line/command-line-reference)는 대상 이벤트에 대해 완전한 *이벤트 유형* 매핑을 가지고 있습니다.

이벤트 모니터링을 중단하려면
`unmonitorEvents()` 메서드를 호출하고 객체에 전달합니다.

`body` 객체에서 이벤트 수신 중단:

    unmonitorEvents(document.body);

## 객체에 등록된 이벤트 리스너 보기

[getEventListeners() API](/web/tools/chrome-devtools/debug/command-line/command-line-reference#geteventlistenersobject)는
지정된 객체에 등록된 이벤트 리스너를 반환합니다.

반환 값은 등록된 각 이벤트 유형(예: `click` 또는 `keydown`)에 대한 배열을 포함하는 객체입니다.
각 배열의 멤버는 각 유형에 등록된 리스너를 설명하는 객체입니다.
예를 들어,
다음 코드는 document 객체에 등록된
모든 이벤트 리스너를 나열합니다.

    getEventListeners(document);

![getEventListeners() 사용 시의 출력](images/events-call-geteventlisteners.png)

지정된 객체에 리스너를 두 개 이상 등록한 경우
배열이 각 리스너에 대한 구성원을 포함합니다.
다음 예시에는
`mousedown` 이벤트에 대해 #scrollingList 요소에 등록된 2개의 이벤트 리스너가 있습니다.

![mousedown에 첨부된 이벤트 리스너 보기](images/events-geteventlisteners_multiple.png)

각 객체를 확장하여 속성을 탐색할 수 있습니다.

![리스너 객체의 확장된 뷰](images/events-geteventlisteners_expanded.png)

## DOM 요소에 등록된 이벤트 리스너 보기

기본적으로
Element Inspector의 *Event Listeners* 패널은 페이지에 첨부된 모든 이벤트를 보여줍니다.

![Event Listeners 패널](images/events-eventlisteners_panel.png)

이 필터는 선택된 노드로 이벤트를 제한합니다.

![선택된 노드로만 필터링된 Event Listeners 패널](images/events-eventlisteners_panel_filtered.png)

객체를 확장하면 패널에 이벤트 리스너 세부정보가 표시됩니다.
이 예시의 페이지에는
jQuery를 통해 첨부된 2개의 이벤트 리스너가 있습니다.

![확장된 이벤트 리스너 뷰](images/events-eventlisteners_panel_details.png)



{# wf_devsite_translation #}
