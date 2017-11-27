project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Command Line API 참조 {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Command Line API에는  DOM 요소 선택 및 검사, 데이터를 읽을 수 있는 서식으로 표시, 프로파일러 중지 및 시작, DOM 이벤트 모니터링 등 일반 작업을 수행하는 데 편리한 기능 컬렉션이 들어 있습니다.

참고: 이 API는 콘솔 내에서만 사용할 수 있습니다. 페이지의 스크립트에서 Command Line API에 액세스할 수 없습니다.


## $_

`$_`는 가장 최근에 평가된 식의 값을 반환합니다.

다음 예시에서
간단한 식(`2 + 2`)이 평가됩니다.
그런 다음 동일한 값을 포함하는
`$_` 속성이 평가됩니다.

![$_는 가장 최근에 평가된 식입니다](images/recently-evaluated-expression-1.png)

다음 예시에서
평가된 식은 처음에 이름 배열을 포함합니다.
배열의 길이를 찾기 위해 `$_.length`를 평가하면
`$_`에 저장된 값이
변경되어 가장 최근의 평가된 식(4)이 됩니다.

![$_는 새 명령이 평가되면 변경됩니다](images/recently-evaluated-expression-2.png)

## $0-$4

`$0`, `$1`, `$2`, `$3` 및 `$4` 명령은 Elements 패널에서 검사한 마지막 다섯 DOM 요소
또는 Profiles 패널에서 선택한 마지막 다섯 자바스크립트 힙 객체에 대한 기록 참조로 작동합니다.
`$0`은 가장 최근에 선택한 요소 또는 자바스크립트 객체를 반환하며
`$1`은 두 번째로 최근에 선택한 항목을 반환합니다.

다음 예시에서
클래스 `medium`을 가진 요소가 Elements 패널에서 선택됩니다.
Console 창에서 `$0`이 평가되었으며
동일한 요소를 표시합니다.

![$0의 예시](images/element-0.png)

아래 이미지는 동일한 페이지에서 선택한 다른 요소를 표시합니다.
이제 `$0`은 새로 선택한 요소를 참조하며
`$1`은 이전에 선택한 요소를 반환합니다.

![$1의 예시](images/element-1.png)

## $(selector)

`$(selector)`는 지정된 CSS 선택기를 사용하여
첫 번째 DOM 요소에 대한 참조를 반환합니다.
이 함수는
[document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector) 함수의 별칭입니다.

다음 예시는 문서에서
첫 번째 `<img>` 요소에 대한 참조를 반환합니다.

![$('img')의 예시](images/selector-img.png)

반환된 결과를 마우스 오른쪽 버튼으로 클릭하고
'Reveal in Elements Panel'을 선택하여 DOM에서 검색하거나
'Scroll in to View'를 선택하여 페이지에 표시합니다.

다음 예시는 현재 선택한 요소에 대한 참조를 반환하고 src 속성을 표시합니다.

![$('img').src의 예시](images/selector-img-src.png)

참고:  <code>$</code>를 사용하는 jQuery와 같은 라이브러리를 사용하는 경우 이 기능을 덮어씁니다.  <code>$</code>는 이 라이브러리의 구현에 해당합니다.

## $$(selector)

`$$(selector)`는 지정된 CSS 선택기와
일치하는 요소의 배열을 반환합니다.
이 명령은
[document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll) 호출과 동일합니다.

다음 예시는 `$$()`를 사용하여 현재 문서에서 모든 `<img>` 요소의
배열을 만들고 각 요소의
`src` 속성 값을 표시합니다.

		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![$$()를 사용하여 문서의 모든 이미지를 선택하고 해당 소스를 표시하는 예시.](images/all-selector.png)

참고: 콘솔에서 <kbd class='kbd'>Shift</kbd> + <kbd class='kbd'>Enter</kbd>를 눌러 스크립트를 실행하지 않고 새 줄을 시작합니다.

## $x(path)

`$x(path)`는 주어진 XPath 식과 일치하는
DOM 요소의 배열을 반환합니다.

예를 들어,
다음은 페이지의 모든 `<p>` 요소를 반환합니다.

		$x("//p")

![XPath 선택기 사용의 예시](images/xpath-p-example.png)

다음 예시는 `<a>` 요소를 포함하는
모든 `<p>` 요소를 반환합니다.

		$x("//p[a]")

![더욱 복잡한 XPath 선택기 사용의 예시](images/xpath-p-a-example.png)

## clear()

`clear()`는 콘솔의 기록을 지웁니다.

		clear();

## copy(object)

`copy(object)`는 지정된 객체의 문자열 표현을
클립보드에 복사합니다.

		copy($0);

## debug(function)

지정된 함수가 호출되면
디버거가 호출되고 
Sources 패널의 함수 내부에서 중단하여 코드를 단계별로 실행하고 디버그합니다.

		debug(getData);

![debug()로 함수 내부에서 중단](images/debug.png)

`undebug(fn)`를 사용하여 함수 중단을 중지하거나
UI를 사용하여 모든 중단점을 비활성화합니다.

중단점에 대한 자세한 내용은
[중단점으로 디버그](/web/tools/chrome-devtools/javascript/add-breakpoints)를 참조하세요.

## dir(object)

`dir(object)`는 모든 지정된 객체
속성의 객체 스타일 목록을 표시합니다.
이 메서드는 Console API의 `console.dir()` 메서드의 별칭입니다.

다음 예시는 명령줄에서 `document.body`를 직접
평가하는 방법과
`dir()`로 동일한 요소를 표시하는 방법 간의 차이를 보여줍니다.

		document.body;
		dir(document.body);

![dir() 함수를 사용하거나 사용하지 않고 document.body 로깅](images/dir.png)

자세한 내용은
Console API의 [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) 항목을 참조하세요.

## dirxml(object)

`dirxml(object)`는 Elements 탭에서 보듯이
지정된 객체의 XML 표현을 출력합니다.
이 메서드는 [console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console) 메서드와 동일합니다.

## inspect(object/function) {:#inspect}

`inspect(object/function)`은 적절한 패널에서 지정된 요소 또는 객체를 열고 선택합니다(DOM 요소의 경우 Elements 패널
또는 자바스크립트 힙 객체의 경우 Profiles 패널).

다음 예시는 Elements 패널에서 `document.body`를 엽니다.

		inspect(document.body);

![inspect()로 요소 검사](images/inspect.png)

검사할 함수를 전달하면
해당 함수가
Sources 패널에서 검사할 문서를 엽니다.

## getEventListeners(object)

`getEventListeners(object)`는 지정된 객체에 등록된
이벤트 리스너를 반환합니다.
반환 값은 등록된 각 이벤트 유형(예: 'click' 또는 'keydown')에 대한
배열을 포함하는 객체입니다.
각 배열의 멤버는 각 유형에 등록된
리스너를 설명하는 객체입니다.
예를 들어,
다음은 document 객체에 등록된
모든 이벤트 리스너를 나열합니다.

		getEventListeners(document);

![getEventListeners() 사용 시의 출력](images/get-event-listeners.png)

지정된 객체에 리스너를 두 개 이상 등록한 경우
배열이 각 리스너에 대한 구성원을 포함합니다.
다음 예에는
'mousedown' 이벤트에 대해
#scrollingList 요소에 등록된 2개의 이벤트 리스너가 있습니다.

![다중 리스너](images/scrolling-list.png)

이러한 각 객체를 확장하여 속성을 탐색할 수 있습니다.

![리스너 객체의 확장된 뷰](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)`는 지정된 객체에 속하는 속성의
이름을 포함하는 배열을 반환합니다.
동일한 속성의 연관된 값을 획득하려면
`values()`를 사용합니다.

예를 들어,
여러분의 애플리케이션이 다음 객체를 정의했다고 가정합시다.

		var player1 = { "name": "Ted", "level": 42 }

`player1`을 전역 네임스페이스에 정의한 경우(단순화하기 위한 가정) `keys(player1)` 및 `values(player1)`을 콘솔에 입력하면
다음 결과가 출력됩니다.

![keys() 및 values() 메서드의 예](images/keys-values.png)

## monitor(function)

지정된 함수를 호출하면
호출될 때 함수에 전달된 인수와 함께
함수 이름을 나타내는 메시지가
콘솔에 기록됩니다.

		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![monitor() 메서드의 예](images/monitor.png)

`unmonitor(function)`을 사용하여 모니터링을 중단합니다.

## monitorEvents(object[, events])

지정된 이벤트 중 하나가 지정된 객체에서 발생하면
Event 객체가 콘솔에 기록됩니다.
모니터링할 단일 이벤트,
이벤트 배열 또는 사전 정의된 이벤트 컬렉션에 매핑된 제네릭 이벤트 '유형' 중 하나를
지정할 수 있습니다. 아래 예를 참조하세요.

다음은 window 객체에서 모든 resize 이벤트를 모니터링합니다.

		monitorEvents(window, "resize");

![window resize 이벤트 모니터링](images/monitor-events.png)

다음은 window 객체에서 "resize" 및 "scroll" 이벤트를 모니터링할 배열을 정의합니다.

		monitorEvents(window, ["resize", "scroll"])

사용 가능한 이벤트 '유형' 중 하나인,
미리 정의된 이벤트 집합에 매핑하는 문자열을 지정할 수도 있습니다.
아래 표에는 사용 가능한 이벤트 유형과
그와 연관된 이벤트 매핑이 나열되어 있습니다.

<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">이벤트 유형 &amp; 해당 매핑된 이벤트</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td>
		</tr>
		<tr>
			<td>key</td>
			<td>"keydown", "keyup", "keypress", "textInput"</td>
		</tr>
		<tr>
			<td>touch</td>
			<td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
		</tr>
		<tr>
			<td>control</td>
			<td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td>
		</tr>
	</tbody>
</table>

예를 들어,
다음은 Elements 패널에서 현재 선택한 입력 텍스트 필드에 "key" 이벤트 유형과 모든 상응하는
키 이벤트를 사용합니다.

		monitorEvents($0, "key");

아래는 텍스트 필드에 문자를 입력한 후의 샘플 출력입니다.

![key 이벤트 모니터링](images/monitor-key.png)

## profile([name]) 및 profileEnd([name])

`profile()`은 선택 항목인 이름을 사용하여
자바스크립트 CPU 프로파일링 세션을 시작합니다.
`profileEnd()`는 프로필을 완료하고 그 결과를
Profile 패널에 표시합니다.
([자바스크립트 실행 속도 개선](/web/tools/chrome-devtools/rendering-tools/js-execution)을 참조하세요.)

프로파일링을 시작하려면 다음과 같이 합니다.

		profile("My profile")

프로파일링을 중지하고 그 결과를 Profiles 패널에 표시하려면 다음과 같이 합니다.

		profileEnd("My profile")

프로필을 중첩할 수도 있습니다. 예를 들어, 다음은 임의의 순서로 작동합니다.

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

Profiles 패널의 결과는 다음과 같습니다.

![그룹화된 프로필](images/grouped-profiles.png)


참고: 복수의 CPU 프로필은 동시에 작동할 수 있으며 생성순으로 닫지 않아도 됩니다.

## table(data[, columns])

선택 항목인 열 제목과 데이터 객체를 전달하여
객체 데이터를 테이블 형식으로 기록합니다.
예를 들어,
콘솔에서 테이블을 사용하여 이름 목록을 표시하려면
다음 코드를 사용할 수 있습니다.

		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![table() 메서드의 예](images/table.png)

## undebug(function)

`undebug(function)`은 지정된 함수를 호출할 때
디버거가 더 이상 호출되지 않도록
지정된 함수의 디버깅을 중지합니다.

		undebug(getData);

## unmonitor(function)

`unmonitor(function)`은 지정된 함수의 모니터링을 중지합니다.
이를 `monitor(fn)`와 함께 사용합니다.

		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])`는 지정된 객체 및 이벤트에 대한
이벤트 모니터링을 중지합니다.
예를 들어,
다음은 window 객체에서 모든 이벤트 모니터링을 중지합니다.

		unmonitorEvents(window);

객체에서 특정 이벤트의 모니터링을 선택적으로 중지할 수 있습니다.
예를 들어,
다음 코드는 현재 선택한 요소에서
모든 마우스 이벤트 모니터링을 시작한 후에
'mousemove' 이벤트 모니터링을 중지합니다(대개 콘솔 출력에서 노이즈를 줄일 목적으로).

		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)`는 지정된 객체에 속하는 모든 속성의
값을 포함하는 배열을 반환합니다.

		values(object);




{# wf_devsite_translation #}
