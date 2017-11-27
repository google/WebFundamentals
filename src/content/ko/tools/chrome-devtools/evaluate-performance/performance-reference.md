project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 타임라인 이벤트 모드는 기록을 작성하는 동안 트리거된 모든 이벤트를 표시합니다. 타임라인 이벤트 참조를 이용하여 각 타임라인 이벤트 유형에 대해 자세히 알아봅니다.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 타임라인 이벤트 참조 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

타임라인 이벤트 모드는 기록을 작성하는 동안 트리거된 모든 이벤트를 표시합니다. 타임라인 이벤트 참조를 이용하여 각 타임라인 이벤트 유형에 대해 자세히 알아봅니다.


## 일반적인 타임라인 이벤트 속성

일부 세부정보는 모든 유형의 이벤트에 골고루 존재하는 반면, 몇 가지는 특정 이벤트 유형에만 해당되기도 합니다. 이 섹션에는 여러 가지 이벤트 유형에 공통되는 속성이 나열됩니다. 특정 이벤트 유형에 고유한 속성은 다음에 나오는 해당 이벤트 유형의 참조에 나열됩니다.

| 속성   |      표시 시기                                                       |
|----------|:-----------------------------------------------------------------|
| Aggregated time | [중첩된 이벤트](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)가 있는 이벤트의 경우, 각 범주의 이벤트에서 소요된 시간입니다.|
| Call Stack | [하위 이벤트](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)가 있는 이벤트의 경우, 각 범주의 이벤트에서 소요된 시간입니다.|
| CPU time | 기록된 이벤트에서 소요된 CPU 시간입니다.|
| Details | 이벤트에 대한 기타 세부정보입니다.|
| Duration (at time-stamp) | 하위 항목을 모두 포함하여 이벤트가 완료되는 데 걸린 시간입니다. 타임스탬프는 이벤트가 발생한 시간으로, 기록이 시작된 시간에 상대적입니다.|
| Self time    | 하위 항목 없이 이벤트에서 걸린 시간입니다.|
| Used Heap Size |이벤트가 기록될 때 애플리케이션이 사용 중이던 메모리 양으로, 마지막 샘플링 이후 사용된 힙 크기에서 델타(+/-) 변동량을 의미합니다.

## 로딩 이벤트

이 섹션에는 로딩(Loading) 범주에 속하는 이벤트와 각각의 속성이 나열됩니다.

| 이벤트 | 설명 |
|-------|:----------|
|Parse HTML| Chrome이 HTML 파싱 알고리즘을 실행했습니다.|
|Finish Loading| 네트워크 요청을 완료했습니다.|
|Receive Data| 요청에 대한 데이터가 수신되었습니다. 하나 이상의 Receive Data 이벤트가 있습니다. |
|Receive Response| 요청에서 온 최초 HTTP 응답입니다.|
|Send Request| 네트워크 요청을 전송했습니다.

### 로딩 이벤트 속성

| 속성 | 설명 |
|-------|:----------|
|Resource|요청한 리소스의 URL입니다.|
|Preview|요청한 리소스의 미리보기입니다(이미지만 해당).|
|Request Method|요청에 사용된 HTTP 방식입니다(예: GET 또는 POST).|
|Status Code|HTTP 응답 코드입니다.|
|MIME Type|요청한 리소스의 MIME 유형입니다.|
|Encoded Data Length|바이트 단위의 요청한 리소스의 길이입니다.

## 스크립팅 이벤트

이 섹션에는 스크립팅(Scripting) 범주에 속하는 이벤트와 그 속성이 나열됩니다.

| 이벤트 | 설명 |
|-------|:----------|
|Animation Frame Fired| 일정이 예약된 애니메이션 프레임이 작동하여 그 콜백 핸들러를 호출했습니다.|
|Cancel Animation Frame| 일정이 예약된 애니메이션 프레임이 취소되었습니다.|
|GC Event| 가비지 수집이 발생했습니다.|
|DOMContentLoaded| 브라우저가 [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded)를 작동시켰습니다. 이 이벤트는 페이지의 DOM 콘텐츠가 모두 로드되어 파싱되면 발생합니다.|
|Evaluate Script| 스크립트가 평가되었습니다.|
|Event| 자바스크립트 이벤트입니다(예: 'mousedown' 또는 'key').|
|Function Call| 최상위 단계 자바스크립트 함수 호출이 있었습니다(브라우저가 자바스크립트 엔진에 진입하는 경우에만 나타남).|
|Install Timer| [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) 또는 [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout)으로 타이머가 설치되었습니다.|
|Request Animation Frame| `requestAnimationFrame()` 호출이 새 프레임을 예약했습니다.|
|Remove Timer| 이전에 생성된 타이머가 삭제되었습니다.|
|Time| [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel)으로 불리는 스크립트입니다.|
|Time End| [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel)로 불리는 스크립트입니다.|
|Timer Fired| `setInterval()` 또는 `setTimeout()`으로 예약된 타이머가 작동했습니다.|
|XHR Ready State Change| XMLHTTPRequest의 대기 상태가 변경되었습니다.|
|XHR Load| `XMLHTTPRequest` 로드를 완료했습니다.

### 스크립팅 이벤트 속성

| 속성 | 설명 |
|-------|:----------|
|Timer ID|타이머 ID입니다.
|Timeout|타이머에 지정된 제한 시간입니다.|
|Repeats|타이머가 반복되는지 지정하는 부울 값입니다.|
|Function Call|호출된 함수입니다.|

## 렌더링 이벤트

이 섹션에는 렌더링(Rendering) 범주에 속하는 이벤트와 그 속성이 나열됩니다.

| 이벤트 | 설명 |
|-------|:----------|
|Invalidate layout| DOM 변경으로 페이지 레이아웃이 무효화되었습니다.|
|Layout| 페이지 레이아웃이 실행되었습니다.|
|Recalculate style| Chrome이 요소 스타일을 다시 계산했습니다.|
|Scroll| 중첩된 뷰의 콘텐츠가 스크롤되었습니다.

### 렌더링 이벤트 속성

| 속성 | 설명 |
|-------|:----------|
|Layout invalidated|레이아웃 기록의 경우, 레이아웃 무효화를 초래한 코드의 스택 추적입니다.|
|Nodes that need layout|Layout 기록의 경우, 재레이아웃이 시작되기 전에 레이아웃이 필요한 것으로 표시된 노드 수입니다. 이들은 대개 개발자 코드로 무효화된 노드이며, 재레이아웃 루트로 향하는 상향 경로도 포함됩니다. |
|Layout tree size|레이아웃 기록의 경우, 레이아웃 루트 아래의 총 노드 개수입니다(Chrome이 레이아웃을 시작하는 노드).|
|Layout scope|가능한 값은 'Partial'(재레이아웃 경계가 DOM의 일부분인 경우) 또는 'Whole document'입니다.|
|Elements affected|Recalculate style 기록의 경우, 스타일 재계산으로 영향을 받는 요소의 개수입니다.|
|Styles invalidated|Recalculate style 기록의 경우, 스타일 무효화를 초래한 코드의 스택 추적을 제공합니다.

## 페인팅 이벤트

이 섹션에는 페인팅(Painting) 범주에 속하는 이벤트와 그 속성이 나열됩니다.

| 이벤트 | 설명 |
|-------|:----------|
|Composite Layers| Chrome의 렌더링 엔진으로 합성된 이미지 레이어입니다.|
|Image Decode| 이미지 리소스가 디코딩되었습니다.|
|Image Resize|이미지가 원래 치수에서 크기가 조정되었습니다.|
|Paint| 합성된 레이어가 디스플레이 영역에 페인팅되었습니다. Paint 기록 위로 마우스를 가져가면 업데이트된 디스플레이 영역이 강조표시됩니다.

### 페인팅 이벤트 속성

| 속성 | 설명 |
|-------|:----------|
|Location|페인트 이벤트의 경우, 페인트 직사각형의 x 및 y 좌표입니다.|
|Dimensions|페인트 이벤트의 경우, 페인팅된 영역의 높이와 너비입니다.|




{# wf_devsite_translation #}
