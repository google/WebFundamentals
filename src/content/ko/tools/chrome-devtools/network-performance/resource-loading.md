project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools Network 패널을 사용하여 웹 애플리케이션의 네트워크 성능을 측정합니다.

{# wf_updated_on: 2016-02-21 #}
{# wf_published_on: 2015-04-13 #}

# 리소스 로드 시간 측정 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

사이트의 네트워크 성능을 측정하려면
<strong>Network</strong> 패널을 사용합니다.

![chrome devtools network 패널](imgs/network-panel.png)

**Network** 패널은 
페이지의 각 네트워크 작업에 대한 정보를 기록합니다. 여기에는 자세한 타이밍 데이터, HTTP 요청 및 응답 
헤더, 쿠키 등이 포함됩니다.


### TL;DR {: .hide-from-toc }
- Network 패널을 사용하여 네트워크 활동을 기록하고 분석합니다.
- 집계 형식으로 또는 개별 리소스에 대해 로드 정보를 봅니다.
- 리소스 표시 방식을 필터링하고 정렬합니다.
- 네트워크 기록을 저장, 복사하고 지웁니다.
- Network 패널을 자신의 요구사항에 맞게 사용자설정합니다.


## Network 패널 개요

Network 패널은 다음 5개의 창으로 구성됩니다.

1. **Controls**. 이들 옵션을 사용하여 **Network** 패널의 모양과 
기능을 제어합니다. 
2. **Filters**. 이들 옵션을 사용하여 
**Requests Table**에 리소스가 표시되는 방법을 제어합니다. 팁: <kbd>Cmd</kbd>(Mac) 또는 <kbd>Ctrl</kbd>
   (Window/Linux)을 길게 누른 다음 필터를 클릭하면 여러 개의 필터를
동시에 한꺼번에 선택할 수 있습니다.
3. **Overview**. 이 그래프는 리소스를 검색한 시점의 타임라인을 보여줍니다.
   여러 개의 막대가 세로 방향으로 쌓여 있으면 이러한 리소스를 동시에 검색했다는
의미입니다. 
4. **Requests Table**. 이 테이블에는 그간 검색한 모든 리소스가 나열됩니다.
   기본적으로 이 테이블은 시간 순서대로 정렬되며, 
가장 이른 시간의 리소스가 맨 위에 옵니다.
   리소스의 이름을 클릭하면 그에 대한 자세한 정보를 제공합니다.
   팁: 아무 테이블 헤더나(**Timeline** 제외) 마우스 오른쪽 버튼으로 클릭하면 
정보의 열을 추가 또는 제거할 수 있습니다. 
5. **Summary**. 이 패널을 살펴보면 요청의 총 수,
전송된 데이터의 양과 로드 시간 등을 알 수 있습니다.

 ![네트워크 패널 창](imgs/panes.png)

**Requests Table**에는 기본적으로 다음과 같은 열이 표시됩니다. 
[열을 추가 또는 제거](#add-and-remove-table-columns)할 수 있습니다.

* **Name**. 리소스의 이름입니다.
* **Status** HTTP 상태 코드입니다.
* **Type**. 요청한 리소스의 MIME 유형입니다.
* **Initiator**. 이 요청을 시작한 객체 또는 프로세스입니다. 다음 값 
중 하나를 가질 수 있습니다.
  * **Parser**. Chrome의 HTML 파서가 요청을 시작했습니다.
  * **Redirect**. HTTP 리디렉션이 이 요청을 시작했습니다.
  * **Script**. 스크립트가 요청을 시작했습니다.
  * **Other**. 일부 다른 프로세스 또는 작업이 요청을 시작했습니다(
사용자가 링크를 통해 페이지로 이동 또는 주소 표시줄에 
URL 입력 등).
* **Size**. 응답 헤더의 크기(보통 
수백 바이트 정도)에 응답 본문을 더한 것으로, 서버가 전달합니다. 
* **Time**. 총 소요 시간, 즉 요청 시작부터 응답의 최종 바이트를 
수신할 때까지 걸린 시간입니다. 
* **Timeline**. 타임라인 열에는 모든 네트워크 요청의 시각적 워터폴이 
표시됩니다. 이 열의 헤더를 클릭하면 추가 정렬 필드 메뉴가 
나타납니다.

## 네트워크 활동 기록

**Network** 패널이 열려 있으면 DevTools가 기본적으로 모든 네트워크 활동을 
기록합니다. 기록하려면, 패널이 열려 있는 동안 페이지를 새로 고치거나 
현재 로드된 페이지에서 네트워크 활동이 발생하기를 기다리기만 하면 됩니다.

DevTools가 기록을 하고 있는지 여부는
**기록** 버튼을 통해 알 수 있습니다. 이 버튼이 빨간색이면 
(![기록 버튼 켜짐](imgs/record-on.png){:.inline}) DevTools가 기록 중인 것입니다.
이 버튼이 회색이면 (![기록 버튼 꺼짐](imgs/record-off.png){:.inline}) DevTools가 
기록을 하지 않고 있는 것입니다. 기록을 시작하거나 중단하려면 이 버튼을 클릭하거나 
단축키 <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd>를 누릅니다.

## 기록 중 스크린샷 캡처 {:#filmstrip}

**Network** 패널을 사용하여 페이지가 로드 중일 때 스크린샷을 캡처할 수 있습니다. 이 기능을 일명 
**필름스트립**이라고 합니다. 

**카메라** 아이콘을 클릭하여 필름스트립을 활성화합니다. 이 아이콘이 회색이면 
필름스트립이 비활성화된 상태입니다(![필름스트립 
비활성화됨](imgs/filmstrip-disabled.png){:.inline}). 이 아이콘이 파란색이면
활성화된 상태입니다(![필름스트립 활성화됨](imgs/filmstrip-enabled.png){:.inline}).

페이지를 새로 고치면 스크린샷이 캡처됩니다. 스크린샷은
**Overview** 위에 표시됩니다. 

![필름스트립으로 기록](imgs/filmstrip.png)

스크린샷 위로 마우스를 가져가면 **Timeline**에 세로 방향의 노란색
선이 표시되어 프레임이 캡처된 시점을 나타냅니다.

![타임라인에 중첩된 필름스트립](imgs/filmstrip-timeline-overlay.png)

스크린샷을 두 번 클릭하면 해당 스크린샷의 확대 버전을 볼 수 있습니다. 스크린샷이 확대된 동안 키보드의 왼쪽/오른쪽 화살표를 사용하여
스크린샷 사이를 이동할 수 있습니다.


![확대된 필름스트립 스크린샷](imgs/filmstrip-zoom.png)

## DOMContentLoaded 및 로드 이벤트 정보 표시

**Network** 패널에 두 개의 이벤트(
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 및 
[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load))가 강조표시됩니다.

페이지의 첫 마크업이 파싱되면 `DOMContentLoaded`가
실행됩니다. 이 이벤트는 **Network** 패널의 두 위치에 표시됩니다.

1. **Overview** 창의 파란색 세로 막대는 이벤트를 의미합니다.
2. **Summary** 창에서 해당 이벤트의 정확한 시간을 확인할 수 있습니다.

![Network 패널에 표시된 DOMContentLoaded 이벤트](imgs/domcontentloaded.png)

`load`는 페이지가 완전히 로드되면 발생합니다. 이 이벤트는 세 위치에 표시됩니다.

1. **Overview** 창의 빨간색 세로줄은 이벤트를 의미합니다.
2. **Requests Table**의 빨간색 세로줄도 이벤트를 의미합니다.
3. **Summary** 창에서 이벤트의 정확한 시간을 확인할 수 있습니다.

![Network 패널에 표시된 로드 이벤트](imgs/load.png)

## 단일 리소스의 세부정보 보기

리소스 이름(**Requests Table**의 **Name** 열 아래)을
클릭하면 해당 리소스에 대한 자세한 정보를 볼 수 있습니다.

사용 가능한 탭은 어떤 유형의 리소스를 선택했는지에 따라 달라지지만,
아래의 4개 탭이 가장 일반적입니다.

* **Headers**. 리소스와 연결된 HTTP 헤더입니다.
* **Preview**. JSON, 이미지 및 텍스트 리소스의 미리보기입니다.
* **Response**. HTTP 응답 데이터입니다(있는 경우).
* **Timing**. 리소스에 대한 요청 수명 주기의
세분화된 내역입니다.

![단일 리소스에 대한 세부정보 보기](imgs/network-headers.png)

### 네트워크 타이밍 보기

**Timing**을 클릭하면 단일 리소스에 대한 요청 수명 주기의 세분화된 내역을
볼 수 있습니다. 

이 수명 주기는 다음 범주에서 각각 얼마나 시간을 소비했는지 보여줍니다.

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* Queuing
* Stalled
* 해당되는 경우: DNS Lookup, Initial connection, SSL handshake
* Request sent
* Waiting (Time to first byte (TTFB))
* Content Download

![timing 탭](imgs/timing-tab.png)


**Timeline** 그래프 내에서 리소스 위로 마우스를 가져가면 이와 동일한 정보를 볼 수 있습니다. 

![타임라인에서 단일 리소스에 대한 타이밍 데이터](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

관련 가이드:

* [Resource Timing의 이해](understanding-resource-timing)

### HTTP 헤더 보기

**Headers**를 클릭하면 해당 리소스의 헤더가 표시됩니다.

**Headers** 탭은 리소스의 요청 URL, HTTP 메서드 및
응답 상태 코드 등을 표시합니다. 또한 HTTP 응답과 요청
헤더 및 해당 값, 모든 쿼리 문자열 매개변수도 표시됩니다. 

![단일 리소스에 대한 HTTP 헤더](imgs/network-headers.png)

각 섹션 옆의
`view source` 또는 `view parsed`
링크를 클릭하면 응답 헤더, 요청 헤더 또는 쿼리 문자열 매개변수를 소스 또는 파싱된 형식으로 볼 수 있습니다.

![헤더 소스 보기](imgs/view-header-source.png)

쿼리 문자열 매개변수는 URL 인코딩 또는 디코딩된 형식으로 볼 수도 있습니다.
해당 섹션 옆의 `view URL encoded` 또는 `view decoded` 링크를 클릭하면 됩니다.

![URL 인코딩 보기](imgs/view-url-encoded.png)

### 리소스 미리보기

**Preview** 탭을 클릭하면 해당 리소스의 미리보기를 볼 수 있습니다. **Preview**
탭은 선택한 리소스 유형에 따라
유용한 정보를 표시하거나 그렇지 않을 수도 있습니다.

![이미지 리소스 미리보기](imgs/preview-png.png)

### HTTP 응답 콘텐츠 보기

**Response** 탭을 클릭하면 리소스의 형식이 지정되지 않은 HTTP 응답
콘텐츠가 표시됩니다. **Response** 탭에는 선택한 리소스의 유형에 따라
유용한 정보가 포함되어 있을 수도 있고, 아닐 수도 있습니다.

![JSON 리소스 응답 데이터](imgs/response-json.png)

### 쿠키 보기

**Cookies** 탭을 클릭하면
리소스의 HTTP 요청 및 응답 헤더로 전송된 쿠키 테이블이 표시됩니다. 이 탭은 쿠키가 전송되는 경우에만
사용할 수 있습니다.

아래는 테이블의 각 열에 대한 설명입니다.

* **Name**. 쿠키의 이름입니다.
* **Value**. 쿠키의 값입니다.
* **Domain**. 쿠키가 속한 도메인입니다.
* **Path**. 쿠키가 온 URL 경로입니다.
* **Expires / Max-Age**. 쿠키의 expires 또는 max-age
속성의 값입니다.
* **Size**. 바이트 단위의 쿠키 크기입니다.
* **HTTP**. 쿠키가 HTTP 요청에서 브라우저에 의해서만 설정되고
자바스크립트로는 액세스할 수 없음을 나타냅니다.
* **Secure**. 이 속성이 있는 경우, 쿠키가 보안 연결을 통해서만
전송되어야 함을 나타냅니다.

![리소스 쿠키](imgs/cookies.png)

### WebSocket 프레임 보기

**Frames** 탭을 클릭하면
[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
연결 정보가 표시됩니다. 이 탭은 선택한 리소스가
`WebSocket` 연결을 시작한 경우에만 표시됩니다.

![websocket 프레임 탭](imgs/websocket-frames.png)

아래의 표는 **Frames**
탭의 테이블에 나오는 각 열에 대한 설명입니다.

* **Data**. 메시지 페이로드입니다. 메시지가 일반 텍스트인 경우 
여기에 표시됩니다. 바이너리 연산 부호인 경우, 이 필드는 해당 연산 부호의 
이름과 코드를 표시합니다. 지원되는 연산 부호는 다음과 같습니다.
  * 연속 프레임
  * 바이너리 프레임
  * 연결 닫기 프레임
  * Ping 프레임
  * Pong 프레임
* **Length**. 바이트 단위의 메시지 페이로드 길이입니다.
* **Time**. 메시지가 생성될 때의 타임스탬프입니다.

메시지는 유형에 따라 색상이 구분됩니다. 

* 발신 텍스트 메시지는 옅은 녹색으로 색상이 구분됩니다.
* 수신 텍스트 메시지는 흰색입니다. 
* WebSocket 연산 부호는 옅은 노란색입니다.
* 오류는 옅은 빨간색입니다.

**현재 구현에 대한 참고 사항:**

* 새 메시지가 도착한 후 **Frames** 테이블을 새로 고치려면, 
왼쪽의 리소스 이름을 클릭합니다.
* **Frames** 테이블에서는 마지막 100개의 `WebSocket` 메시지만 보존합니다.

## 리소스 시작자 및 종속성 보기 {:#initiators-dependencies}

<kbd>Shift</kbd> 키를 길게 누르고 리소스 위로 마우스를 가져가면 해당 항목의 시작자와
종속성이 표시됩니다. 이 섹션에서는 마우스를 가져간 리소스를 
**대상**이라고 부르겠습니다. 

녹색으로 색상이 구분된 대상 위에 있는 첫 번째 리소스는 대상의 
시작자입니다. 녹색으로 색상이 구분된 대상 위에 두 번째 리소스가 있는 경우, 
시작자의 시작자입니다. 빨간색으로 색상이 구분된 대상
아래 있는 모든 리소스는 해당 대상의 종속성입니다.

아래 스크린샷에서 대상은 `dn/`입니다. 대상의 시작자는 
`rs=AA2Y`로 시작하는 스크립트입니다. 시작자(`rs=AA2Y`)의 시작자는 
`google.com`입니다. 마지막으로, `dn.js`는
대상(`dn/`)의 종속성입니다.

![리소스 시작자와 종속성
보기](imgs/initiators-dependencies.png)

많은 리소스가 있는 페이지의 경우, 시작자 또는 종속성을
모두 볼 수 없는 경우도 있다는 점에 유의하세요. 

## 요청 정렬

기본적으로 **Requests Table**에 있는 리소스는 각 요청의 시작
시간을 기준으로 정렬되고, 가장 이른 요청이 맨 위에 나옵니다.

열의 헤더를 클릭하면 해당 헤더의 각 리소스 값을
기준으로 테이블이 정렬됩니다. 동일한 헤더를 다시 한 번 클릭하면 정렬 순서가
오름차순 또는 내림차순으로 변경됩니다.

**Timeline** 열은 다른 열과는 다른 고유한 열입니다. 이 열을 클릭하면 
정렬 필드의 메뉴가 표시됩니다.

* **Timeline**. 각 네트워크 요청의 시작 시간을 기준으로 정렬합니다. 이는 
기본 정렬이며, **Start Time** 옵션을 기준으로 정렬하는 것과 동일합니다.
* **Start Time**. 각 네트워크 요청의 시작 시간을 기준으로 정렬합니다(
**Timeline** 옵션을 기준으로 정렬하는 것과 동일).
* **Response Time**. 요청의 응답 시간을 기준으로 정렬합니다.
* **End Time**. 각 요청이 완료된 시간을 기준으로 정렬합니다.
* **Duration**. 각 요청의 총 시간을 기준으로 정렬합니다. 이 필터를 
선택하면 어느 리소스가 로드하는 데 가장 오랜 시간이 걸리는지 판별할 수 있습니다.
* **Latency**. 요청 시작과 
응답 시작 사이의 시간을 기준으로 정렬합니다. 이 필터를 선택하면 TTFB가 가장 오래 걸리는 리소스를
판별할 수 있습니다.

![타임라인 정렬 필드](imgs/timeline-sort-fields.png)

## 필터 요청 

**Network** 패널은 리소스를 표시하는 다양한 필터링 방법을
제공합니다. **filters** 버튼
(![필터 버튼](imgs/filters.png){:.inline})
을 클릭하면 **Filters** 창을 숨기거나 표시할 수 있습니다.

콘텐츠 유형 버튼을 사용하여 선택한 콘텐츠 유형의 리소스만
표시할 수 있습니다. 

참고: <kbd>Cmd</kbd>(Mac) 또는 <kbd>Ctrl</kbd>(Windows/Linux) 키를 길게 누른 다음 클릭하여 여러 개의 필터를 동시에 활성화합니다.

![여러 콘텐츠 유형 필터를 동시에
선택](imgs/multiple-content-type-filters.png)

**filter** 텍스트 필드는 놀라울 정도로 강력합니다. 여기에
임의의 문자열을 입력하면 **Network** 패널에 주어진 문자열과 일치하는 파일 이름을 가진
리소스만 표시됩니다.

![리소스 이름 필터링](imgs/resource-name-filtering.png)

**filter** 텍스트 필터는 또한
리소스를 다양한 속성에 따라 정렬할 수 있는 다양한 키워드도 지원합니다. 예를 들어 `larger-than`
키워드를 사용하면 파일 크기를 기준으로 정렬할 수 있습니다.

아래 목록은 모든 키워드에 대한 설명입니다. 

* `domain`. 지정된 도메인의 리소스만 표시합니다. 와일드 카드 문자(`*`)를 
사용하여 여러 도메인을 포함할 수 있습니다. 예를 들어 `*.com`을 사용하면 
도메인 이름이 `.com`으로 끝나는 모든 리소스가 표시됩니다. DevTools는 
자동완성 드롭다운 메뉴를 그동안 접한 모든 도메인으로 
채워넣습니다.
* `has-response-header`. 지정된 HTTP 응답 헤더가 포함된 리소스를 
표시합니다. DevTools는 
자동완성 드롭다운 메뉴를 그동안 접한 모든 응답 헤더로 채워넣습니다.
* `is`. `is:running`을 사용하여 `WebSocket` 리소스를 찾습니다.
* `larger-than`. 지정된 크기보다 큰 리소스를 바이트 단위로 
표시합니다. 값을 `1000`으로 설정하면 값을 `1k`로 설정하는 것과 같습니다.
* `method`. 지정된 HTTP 메서드 
유형을 통해 검색된 리소스를 표시합니다. DevTools는 드롭다운 메뉴를 그동안 접한 모든 HTTP 메서드로 
채워넣습니다.
* `mime-type`. 지정된 MIME 유형의 리소스를 표시합니다. DevTools는 
드롭다운 메뉴를 그동안 접한 모든 MIME 유형으로 채워넣습니다.
* `mixed-content`. 모든 혼합 콘텐츠 리소스(`mixed-content:all`)를 표시하거나 
현재 표시된 리소스(`mixed-content:displayed`)만 표시합니다.
* `scheme`. 보호되지 않은 HTTP(`scheme:http`) 
또는 보호된 HTTPS(`scheme:https`)를 통해 검색한 리소스를 표시합니다.
* `set-cookie-domain`. 지정된 값과 일치하는 `Domain` 속성과 
`Set-Cookie` 헤더를 가진 리소스를 표시합니다. DevTools는 
자동완성을 그동안 접한 모든 쿠키 도메인으로 
채웁니다.
* `set-cookie-name`. 이름이 지정된 값과 일치하고 `Set-Cookie` 헤더를 가진 
리소스를 표시합니다. DevTools는 
자동완성을 그동안 접한 모든 쿠키 이름으로 채웁니다.
* `set-cookie-value`. 값이 지정된 값과 일치하고 `Set-Cookie` 헤더를 가진 
리소스를 표시합니다. DevTools는 자동완성을 
그동안 접한 모든 쿠키 값으로 채웁니다.
* `status-code`. HTTP 상태 코드가 지정된 코드와 일치하는 
리소스만 표시합니다. DevTools는 자동완성 드롭다운 메뉴를 그동안 접한 모든
상태 코드로 채웁니다.

![파일 크기로 필터링](imgs/larger-than.png)

위의 키워드 중 일부는 자동완성 드롭다운 메뉴에서 언급됩니다. 자동완성 
메뉴를 트리거하려면 키워드에 콜론을 붙여 입력합니다. 예를 들어
아래의 스크린샷에서는 `domain:`을 입력하면 자동완성 드롭다운 메뉴가 트리거됩니다.

![필터 텍스트 필드 자동완성](imgs/filter-autocomplete.png)

## 네트워크 정보 복사, 저장 및 지우기

**Requests Table** 안쪽을 마우스 오른쪽 버튼으로 클릭하여 네트워크 정보를
복사, 저장 또는 삭제할 수 있습니다. 일부 옵션은 상황에 따라 달라지므로, 
단일 리소스에서 작업하려는 경우 해당 리소스의 
행을 마우스 오른쪽 버튼으로 클릭해야 합니다. 아래 목록은 각 옵션에 대한 설명입니다.

* **Copy Response**. 선택한 리소스의 HTTP 응답을 시스템 클립보드에 
복사합니다.
* **Copy as cURL**. 선택한 리소스의 네트워크 요청을 
[cURL](http://curl.haxx.se/){: .external } 명령어 문자열 형태로 시스템 클립보드에 복사합니다.
  [요청을 cURL 명령으로 복사](#copy-requests-as-curl-commands)를 참조하세요.
* **Copy All as HAR**. 모든 리소스를 시스템 클립보드에
[HAR](https://en.wikipedia.org/wiki/.har){: .external } 데이터로 복사합니다.
  HAR 파일에는 네트워크 
'워터폴'을 설명하는 JSON 데이터 구조가 포함되어 있습니다. 여러 [타사](https://ericduran.github.io/chromeHAR/){: .external }
[도구](https://code.google.com/p/harviewer/){: .external }는 HAR 파일의 데이터에서 가져온 네트워크 워터폴을
재구성할 수 있습니다. 자세한 내용은
[웹 성능 개선 도구: HTTP 아카이브
(HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)
를 참조하세요.
* **Save as HAR with Content**. 모든 네트워크 데이터를 각 페이지 리소스와 함께 
HAR 파일로 저장합니다. 이미지를 포함한 바이너리 리소스는 
Base64 인코딩 텍스트로 인코딩됩니다.
* **Clear Browser Cache**. 브라우저 캐시를 비웁니다.
  **팁**: [**Network Conditions**][nc] 창에서 브라우저 
캐시를 활성화하거나 비활성화할 수도 있습니다.
* **Clear Browser Cookies**. 브라우저 쿠키를 비웁니다.
* **Open in Sources Panel**. 선택한 리소스를 **Sources**
 패널에서 엽니다.
* **Open Link in New Tab**. 선택한 리소스를 새 탭에서 엽니다. Network 
테이블에서 리소스 이름을 두 번 클릭해도 됩니다.
* **Copy Link Address**. 리소스 URL을 시스템 클립보드에 복사합니다.
* **Save**. 선택한 텍스트 리소스를 저장합니다. 텍스트 리소스에만 
표시됩니다.
* **Replay XHR**. 선택한 `XMLHTTPRequest`를 다시 전송합니다. XHR 리소스에만
표시됩니다.

![컨텍스트 메뉴 복사 및 저장](imgs/copy-save-menu.png) 

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### 요청을 cURL 명령으로 복사 {: #curl }

[cURL](http://curl.haxx.se/){: .external }은 HTTP 트랜잭션을 만들기 위한
명령줄 도구입니다. 

Requests Table의 리소스를 마우스 오른쪽 버튼으로 클릭하고
**Copy**에 마우스를 올린 다음 **Copy as cURL**을 선택하여 Network 패널에서 탐지된 모든 리소스에 대해 cURL
요청 문자열을 복사합니다.

![단일 요청을 cURL 명령으로 복사](imgs/copy-as-curl.png)

**Copy as cURL**을 선택하여 Network 패널에서 탐지된 모든 리소스에 대해
cURL요청 문자열을 복사합니다.

모두 복사하면 필터링은 무시합니다(예: CSS 리소스만 표시하도록 Network 패널을
필터링한 다음 **Copy All as cURL**을 누르면
CSS뿐만 아니라 모든 탐지된 리소스가 복사됨).

## Network 패널 사용자설정

기본적으로 **Requests Table**은 리소스를 작은 행으로 표시합니다. 
**Use large resource row** 버튼
(![큰 리소스 행 버튼](imgs/large-resource-rows-button.png){:.inline})
을 클릭하여 각 행의 크기를 늘립니다. 

큰 행은 일부 열에서 2개의 텍스트 필드를 표시할 수 있습니다. 하나는 기본 
필드이고 다른 하나는 보조 필드입니다. 열 헤더는 보조 필드의
의미를 나타냅니다. 

![큰 리소스 행](imgs/large-resource-rows.png)

### 테이블 열 추가 및 제거

**Requests Table**의 아무 헤더나 마우스 오른쪽 버튼으로 클릭하여 열을 추가하거나 제거할 수
있습니다.

![열 추가 또는 제거](imgs/add-remove-columns.png)

### 탐색 시 네트워크 로그 보존

기본적으로 네트워크 활동 기록은 현재 페이지를 새로 고치거나
다른 페이지를 로드할 때마다 폐기됩니다.
이 시나리오 전체에 걸쳐 네트워크 로그를 저장하려면 
**Preserve log** 확인란을 선택합니다. 새 기록은 **Requests Table**의 맨 아래 추가됩니다.

## 추가 리소스

애플리케이션의 네트워크 성능을 최적화하는 방법에 대해 더 알아보려면 다음 리소스를 참조하세요.

* [PageSpeed 
 Insights](/speed/pagespeed/insights)를 사용하여 
사이트에 적용할 수 있는 성능 모범 사례를 식별하고, 
[PageSpeed  최적화 
도구](/speed/pagespeed/optimization)를 사용하여 
그러한 모범 사례를 적용하는 프로세스를 자동화할 수 있습니다.
* [Google Chrome의 고성능 
네트워킹](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)에서는 Chrome 
네트워크 내부 구조와 이를 활용하여 사이트를 더 빠르게 만드는 
방법을 살펴봅니다.
* [gzip 압축 작동 
원리](/speed/articles/gzip)에서는 
gzip 압축 원리와 장점에 대해 자세히 설명합니다.
* [웹 성능 모범 
사례](/speed/docs/best-practices/rules_intro)에서는
웹 페이지 또는 애플리케이션의 네트워크 성능을 최적화하는 데 유용한 
정보를 제공합니다.




{# wf_devsite_translation #}
