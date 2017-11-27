project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools의 Elements 패널에 있는 DOM 트리 뷰에 현재 웹 페이지의 DOM 구조가 표시됩니다. DOM 업데이트를 통해 페이지의 콘텐츠와 구조를 실시간으로 편집할 수 있습니다.

{# wf_updated_on: 2015-04-29 #}
{# wf_published_on: 2015-04-29 #}

# DOM 편집 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Chrome DevTools의 Elements 패널에 있는 DOM 트리 뷰에 현재 웹 페이지의 DOM 구조가 표시됩니다. DOM 업데이트를 통해 페이지의 콘텐츠와 구조를 실시간으로 편집할 수 있습니다.


### TL;DR {: .hide-from-toc }
- DOM은 페이지 구조를 정의합니다. 각 DOM 노드는 페이지 요소입니다(헤더 노드, 단락 노드 등).
- 렌더링된 DOM을 통해 페이지의 콘텐츠와 구조를 실시간 편집할 수 있습니다.
- 다만 Elements 패널에서 DOM을 변경하여 원본 파일을 수정할 수 없다는 점을 기억하세요. 페이지를 새로 고치면 DOM 트리 수정 사항이 모두 지워집니다.
- DOM 중단점을 사용하여 DOM 변경 사항을 관찰하세요.


## 요소 검사 {:#inspect-an-element}

**Elements 패널**을 사용하면 페이지의 모든 요소를 단일
DOM 트리에서 검사할 수 있습니다. 아무 요소나 선택하여 적용된 스타일을 검사합니다.

<video autoplay muted src="animations/inspect-element.mp4">
</video>

요소를 검사하는 방법은 여러 가지가 있습니다.

페이지에서 아무 요소나 마우스 오른쪽 버튼으로 클릭한 다음 **Inspect**를 선택합니다.

![마우스 오른쪽 버튼 클릭을 통해 요소 검사](/web/tools/chrome-devtools/inspect-styles/imgs/right-click-inspect.png)

<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd>
+ <kbd class="kbd">C</kbd>(Windows) 또는 <kbd class="kbd">Cmd</kbd>
+ <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd>(Mac)를 눌러 
DevTools를 Inspect Element 모드로 연 다음, 요소 위로 마우스를 가져갑니다. DevTools가
**Elements** 패널에서 마우스를 가져간 요소를 자동으로
강조표시합니다. 해당 요소를 클릭하면 검사 모드를 종료해도 
**Elements** 패널에서 요소가 강조표시된 상태로 유지됩니다. 

**Inspect Element** 버튼
![검사 아이콘](/web/tools/chrome-devtools/inspect-styles/imgs/inspect-icon.png){:.inline}
을 클릭하여 요소 검사 모드로 들어간 다음, 요소를 클릭합니다.

콘솔에서 [`inspect`][검사] 메서드를 사용합니다(예: 
`inspect(document.body)`).

## DOM 탐색

마우스 또는 키보드를 사용하여 DOM 구조 전체를 탐색합니다.

축소된 노드 옆에 오른쪽을 가리키는 화살표가 있습니다.
![축소된 노드](imgs/collapsed-node.png){:.inline}

확장된 노드 옆에 아래쪽을 가리키는 화살표가 있습니다.
![확장된 노드](imgs/expanded-node.png){:.inline}

마우스 사용:

* 한 번 클릭하면 노드가 강조표시됩니다.
* 노드를 확장하려면 노드 위의 아무 곳이나 두 번 클릭하거나 그 옆에 있는 화살표를 
클릭합니다.
* 노드를 축소하려면 옆에 있는 화살표를 클릭합니다.

키보드 사용:

* **위쪽 화살표** 키를 눌러 현재 노드 위에 있는 노드를 선택합니다.
* **아래쪽 화살표** 키를 눌러 현재 노드 아래 있는 노드를 선택합니다.
* **오른쪽 화살표** 키를 누르면 축소된 노드가 확장됩니다. 다시 
누르면 (이제 확장된) 노드의 첫 번째 자식 노드로 이동합니다. 이 기법을
사용하여 깊이 중첩된 노드를 신속하게 탐색할 수 있습니다.

### 탐색경로 트레일 탐색

Elements 패널 하단에 탐색경로 트레일이 있습니다. 

![탐색경로 트레일](imgs/breadcrumb-body.png)

현재 선택된 노드가 파란색으로 강조표시되어 있습니다. 왼쪽에 있는 노드는 
현재 노드의 부모 노드입니다. 그 왼쪽에 있는 것이 부모 노드의 부모 노드입니다.
이런 식으로 트리 맨 위까지 진행됩니다.

![탐색경로 트레일 연장](imgs/breadcrumb-footer.png)

구조를 거슬러 탐색하면 강조표시가 옮겨집니다.

![탐색경로 트레일 위쪽으로 탐색](imgs/breadcrumb-trail.png)

DevTools는 트레일 내에서 가능한 한 많은 수의 항목을 표시합니다. 
전체 트레일이 상태 표시줄에 비해 너무 커서 다 표시되지 않는 경우, 줄임표(...)가 표시되어 
트레일이 잘린 부분을 나타냅니다. 줄임표를 클릭하면 
숨겨진 요소를 표시할 수 있습니다.

![탐색경로 줄임표](imgs/breadcrumb-ellipsis.png)

## DOM 노드 및 속성 편집

DOM 이름 또는 속성을 편집하려면:

* 노드 이름 또는 속성을 직접 두 번 클릭합니다.
* 노드를 강조표시하고 <kbd>Enter</kbd> 키를 누른 다음 원하는 이름 또는 속성이 표시될 때까지
  <kbd>Tab</kbd> 키를 누릅니다.
* [추가 작업 메뉴](#more-actions)를 연 다음 **Add Attribute** 
또는 **Edit Attribute**를 선택합니다. **Edit Attribute**는 상황별 메뉴로, 클릭하는 부분에 따라
편집되는 항목이 달라집니다.

작업을 마치면 닫는 태그가 자동으로 업데이트됩니다.

<video autoplay muted src="animations/edit-element-name.mp4">
</video>

### DOM 노드와 자식 노드를 HTML로 편집

DOM 노드와 자식 노드를 HTML로 편집하려면:

* [추가 작업 메뉴](#more-actions)를 열고 **Edit as HTML**을 선택합니다. 
* <kbd>F2</kbd>(Windows/Linux) 또는 <kbd>Fn</kbd>+<kbd>F2</kbd>(Mac)를 누릅니다.
* <kbd>Ctrl</kbd>+<kbd>Enter</kbd>(Windows/Linux) 또는 
<kbd>Cmd</kbd>+<kbd>Enter</kbd>(Mac)를 눌러 변경 내용을 저장합니다. 
* <kbd>Esc</kbd> 키를 누르면 작업한 내용을 저장하지 않고 편집기를 종료합니다.

![HTML로 편집](imgs/edit-as-html.png)

## DOM 노드 이동

노드를 클릭한 상태로 드래그하여 이동합니다.

<video autoplay muted src="animations/move-node.mp4">
</video>

## DOM 노드 삭제

DOM 노드를 삭제하려면:

* [추가 작업 메뉴](#more-actions)를 열고 **Delete Node**를 선택합니다.
* 노드를 선택하고 <kbd>Delete</kbd> 키를 누릅니다.

참고: 실수로 노드를 삭제하는 경우, <kbd class='kbd'>Ctrl</kbd> + <kbd class='kbd'>Z</kbd>(또는 Mac의 경우 <kbd class='kbd'>Cmd</kbd> + <kbd class='kbd'>Z</kbd>)를 사용하여 마지막 작업을 취소하면 됩니다.

## 추가 작업 메뉴 표시 {:#more-actions}

**추가 작업** 메뉴를 사용하면 DOM 노드와 여러 가지 방식으로 상호작용할 수
있습니다. 메뉴를 보려면 노드를 마우스 오른쪽 버튼으로 클릭하거나 노드를 선택하고 
**추가 작업** 버튼(![추가 작업 
버튼](imgs/more-actions-button.png){:.inline})을 누릅니다. 버튼은
현재 선택한 요소에서만 표시됩니다.

![추가 작업 메뉴](imgs/more-actions-menu.png)

## 스크롤하여 보기

DOM 노드 위로 마우스를 가져가거나 노드를 선택하면 렌더링된 노드가
뷰포트에서 강조표시됩니다. 노드를 스크롤하여 화면 밖으로 벗어나면
노드가 현재 뷰포트보다 위에 있는 경우
뷰포트 맨 위에, 노드가 현재 뷰포트 아래에 있는 경우 뷰포트 맨 아래에 도움말이
표시됩니다. 예를 들어 DevTools 아래의 스크린샷을 보면 현재
**Elements** 패널에서 선택한 요소가 뷰포트 아래에 있습니다.

![뷰포트 아래의 요소](imgs/below-viewport.png)

이 페이지를 아래로 스크롤하여 노드가 뷰포트에 표시되도록 하려면
해당 노드를 **마우스 오른쪽 버튼으로 클릭**한 다음 **Scroll into View**를 선택합니다.

## DOM 중단점 설정

DOM 중단점을 설정하면 복잡한 자바스크립트 애플리케이션을 디버그할 수 있습니다.
예를 들어, 자바스크립트가 DOM 요소의 스타일링 방식을 변경하는 경우,
요소의 속성이 수정될 때 작동하도록 DOM 중단점을 설정할 수 있습니다. 하위 트리 변경, 속성 변경 및 노드 제거와 같은 DOM 변경 중 하나에서 중단점을 트리거합니다.

{# include shared/related_guides.liquid inline=true list=page.related-guides.breakpoints #}

### 하위 트리 수정

하위 트리 수정 중단점은 하위 요소를 추가, 삭제 또는 이동하면 트리거됩니다. 예를 들어 `main-content` 요소에서 하위 트리 수정 중단점을 설정한 경우, 다음 코드가 중단점을 트리거합니다.


    var element = document.getElementById('main-content');
    //modify the element's subtree.
    var mySpan = document.createElement('span');
    element.appendChild( mySpan );
    

### 속성 수정

속성 수정은 요소의 속성(`class, id, name`)이 동적으로 변경될 때 발생합니다.


    var element = document.getElementById('main-content');
    // class attribute of element has been modified.
    element.className = 'active';
    

### 노드 삭제

노드 삭제 수정은 문제의 노드가
DOM에서 삭제되면 트리거됩니다.


    document.getElementById('main-content').remove();
    

## DOM 중단점과 상호작용

Elements 및 Sources 패널에는 모두 DOM
중단점을 관리할 수 있는 창이 포함되어 있습니다.

각 중단점은 요소 식별자 및 중단점 유형과 함께 나열됩니다.

![DOM 중단점 창](imgs/dom-breakpoints-pane.png)

다음 방법 중 하나를 사용하여 나열된 각 중단점과 상호작용합니다.

* 요소 식별자 위로 **마우스를 가져가서** 페이지에서 요소의 해당 
위치를 표시합니다(Elements 패널에서 노드 위로 마우스를 가져가는 것과 유사).
* Elements 패널에서 요소를 **클릭**하여 선택합니다.
* 확인란을 **전환**하여 중단점을 활성화 또는 비활성화합니다.

DOM 중단점을 트리거하면 해당 중단점이 DOM
Breakpoints 창에 강조표시됩니다. **Call Stack** 창에 디버거 일시 중지의 **이유**가 표시됩니다.


![중단점 이유](imgs/breakpoint-reason.png)

## 요소 이벤트 리스너 보기

DOM 노드와 연관된 자바스크립트 이벤트 리스너를 
**Event Listeners** 창에서 볼 수 있습니다. 

![이벤트 리스너 창](imgs/event-listeners-pane.png)

Event Listeners 창에서 맨 윗 단계의 항목은 등록된 리스너가 있는
이벤트 유형을 보여줍니다.

이벤트 유형 옆에 있는 화살표를 클릭하면(예: `click`)
등록된 이벤트 핸들러 목록을 볼 수 있습니다. 각 핸들러는 요소 식별자와 같은 CSS 
선택기로 식별할 수 있습니다(`document` 또는 
`button#call-to-action` 등). 같은 요소에 하나 이상의 핸들러가 등록된 경우,
해당 요소가 목록에 반복적으로 나열됩니다.

요소 식별자 옆의 확장 화살표를 클릭하면 이벤트 핸들러의 속성을 볼 수 있습니다. Event Listeners 창에는 각 리스너의 다음 속성이 나열됩니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">이벤트 리스너 속성 및 설명</th>
    </tr>
  </thead>
  <tbody>
  	<tr>
      <td data-th="Value"><code>handler</code></td>
      <td data-th="Description">콜백 함수를 포함합니다. 함수를 마우스 오른쪽 버튼으로 클릭하고 <strong>Show Function Definition</strong>을 선택하면 함수가 정의된 위치를 볼 수 있습니다(소스 코드가 제공되는 경우).</td>
    </tr>
    <tr>
      <td data-th="Value"><code>useCapture</code></td>
      <td data-th="Description"><a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener">useCapture</a> 플래그가  <code>addEventListener</code>에서 설정되어 있는지 여부를 나타내는 부울 값입니다.</td>
    </tr>
  </tbody>
</table>

참고: 대다수의 Chrome 확장 프로그램은 자체 이벤트 리스너를 DOM에 추가합니다. 본인의 코드로 설정되지 않은 이벤트 리스너가 많이 보이는 경우, [시크릿 창](https://support.google.com/chrome/answer/95464)에서 페이지를 다시 열 수 있습니다. 시크릿 창은 확장 프로그램이 기본적으로 실행되지 않도록 차단합니다.

### 스크린샷의 상위 항목 이벤트 리스너

{% comment %}

code for screenshot

<!doctype html>
<html>
<body onload="console.log('onload');">
  <div onfocus="console.log('focus');">
    <button id="button" onclick="console.log('onclick');">click me</button>
  </div>
</body>
</html>

{% endcomment %}

**Ancestors** 확인란이 활성화된 경우, 현재 선택된 노드의 상위 요소에 대한
이벤트 리스너가 현재 선택된 노드의
이벤트 리스너와 함께 추가적으로 표시됩니다.

![상위 요소 활성화됨](imgs/ancestors-enabled.png)

확인란이 비활성화된 경우, 현재 선택된 노드의
이벤트 리스너만 표시됩니다.

![상위 요소 비활성화됨](imgs/ancestors-disabled.png)

### 프레임워크 리스너 보기

{% comment %}

code for screenshot

<!doctype html>
<html>
<script src="https://code.jquery.com/jquery-2.2.0.js"></script>
<body>
  <button id="button">click me, please</button>
  <script>
    $('#button').click(function() {
      $('#button').text('hehe, that tickled, thanks');
    });
  </script>
</body>
</html>

{% endcomment %}

일부 자바스크립트 프레임워크와 라이브러리는 네이티브 DOM 이벤트를 자체 
사용자설정 이벤트 API에 래핑합니다. 이전에는 이 때문에 DevTools로 이벤트 리스너를 검사하기가 어려웠습니다.
왜냐하면 함수 정의가 단지 프레임워크 또는 라이브러리 코드를 다시 참조했기
때문입니다. **Framework listeners** 기능이 이 문제를
해결해줍니다.

**Framework listeners** 확인란이 활성화된 경우, DevTools가 자동으로
이벤트 코드의 프레임워크 또는 라이브러리 래핑 부분을 분석한 다음,
개발자에게 자체 코드로 이벤트를 실제로 바인딩할 지점을 알려줍니다.

![프레임워크 리스너 활성화됨](imgs/framework-listeners-enabled.png)

**Framework listeners** 확인란이 비활성화된 경우, 이벤트 리스너 코드는 아마도
프레임워크 또는 라이브러리 코드 중 어딘가에서 분석될 것입니다. 

![프레임워크 리스너 비활성화됨](imgs/framework-listeners-disabled.png)



[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
