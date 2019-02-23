project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools Network 패널 기능의 종합 레퍼런스

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# 네트워크 분석 레퍼런스 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools Network 분석 기능의 종합 레퍼런스에서
페이지 로드 방식을 분석하는 새로운 방법을 찾아보세요.

참고: 이 레퍼런스는 Chrome 58을 기준으로 합니다. 다른 버전의
Chrome을 사용하고 있다면 DevTools의 UI 및 기능이 다를 수 있습니다.
`chrome://help`를 확인하여 현재 어떤 버전의 Chrome을 실행 중인지 확인하세요.

## 네트워크 요청 기록 {: #record }

DevTools는 기본적으로 DevTools가 열려 있는 한
Network 패널에 모든 네트워크 요청을 기록합니다.

<figure>
  <img src="imgs/network.png" alt="Network 패널.">
  <figcaption>
    <b>그림 1</b>. Network 패널
  </figcaption>
</figure>

### 네트워크 요청 기록 중지 {: #stop-recording }

요청 기록을 중지하려면 다음을 수행합니다.

* Network 패널에서 **Stop recording network log** ![네트워크
  로그 기록 중지](imgs/record-on.png)를{: .devtools-inline } 클릭합니다. 회색으로
  변하여 DevTools이 더 이상 요청을 기록하지 않는다는 것을 나타냅니다.
* Network 패널이 포커스 상태일 때 <kbd>Command</kbd>+<kbd>E</kbd>(Mac)를 누르거나
  <kbd>Ctrl</kbd>+<kbd>E</kbd>(Windows, Linux)를 누릅니다.


### 요청 모두 삭제 {: #clear }

Network 패널에서 **Clear** ![모두 삭제][clear]를 클릭하여{:.devtools-inline} Requests 표의 모든 요청을
모두 삭제합니다.

<figure>
  <img src="imgs/clear.svg" alt="Clear 버튼.">
  <figcaption>
    <b>그림 2</b>. 파란색 외곽선으로 표시한 Clear
  </figcaption>
</figure>

[clear]: imgs/clear-requests.png

### 페이지 로드 전체 요청 저장 {: #preserve-log }

페이지 로드 전체의 요청을 저장하려면 Network 패널의
**Preserve log** 확인란을 선택합니다. DevTools은
**Preserve log**를 중지할 때까지 모든 요청을 저장합니다.

<figure>
  <img src="imgs/preserve-log.svg" alt="Preserve Log 확인란">
  <figcaption>
    <b>그림 3</b>. 파란색 외곽선으로 표시한 Preserve Log 확인란
  </figcaption>
</figure>

### 페이지 로드 중 스크린샷 캡처 {: #screenshots }

스크린샷을 캡처하여 사용자가 페이지 로드를 기다리는 동안
무엇을 보는지 분석합니다.

스크린샷을 활성화하려면 Network 패널에서 **Capture screenshots** ![스크린샷
캡처][capture]를{: .devtools-inline } 클릭합니다. 활성화되면
파란색으로 변합니다.

Network 패널이 스크린샷 캡처를 위해 포커스 상태일 때 페이지를 새로고침합니다.

캡처된 후에는 다음의 방법으로 스크린샷과 상호작용할 수 있습니다.

* 스크린샷 위로 마우스를 가져가 스크린샷이
  캡처된 지점을 봅니다. Overview 창에 노란색 선이 나타납니다.
* 스크린샷의 썸네일 이미지를 클릭하여 스크린샷이 캡처된 후
  발생한 모든 요청을 필터링합니다.
* 썸네일 이미지를 두 번 클릭하여 확대합니다.

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="스크린샷 위로 마우스를 가져간 모습.">
  <figcaption>
    <b>그림 4</b>. 스크린샷 위로 마우스를 가져간 모습. Overview 창과
  Waterfall의 노란색 세로 선은 스크린샷이 캡처된
  시간을 나타냅니다.
  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### XHR 요청 재생 {: #replay-xhr }

XHR 요청을 재생하려면 Requests 표의 요청을 오른쪽 클릭한 다음
**Replay XHR**을 선택합니다.

<figure>
  <img src="imgs/replay-xhr.png" alt="Replay XHR 선택">
  <figcaption>
    <b>그림 5</b>. Replay XHR 선택
  </figcaption>
</figure>

## 로딩 동작 변경

### 브라우저 캐시 사용을 중지하여 첫 방문자 에뮬레이션 {: #disable-cache}

사이트에 처음 방문한 사용자 환경을 에뮬레이션하려면 **Disable
cache** 확인란을 선택합니다. DevTools이 브라우저 캐시를 중지합니다. 이렇게 하면 요청이 반복 방문의 브라우저 캐시로부터 제공되기 때문에
처음 방문하는 사용자의 환경을 정확하게
에뮬레이션할 수 있습니다.

<figure>
  <img src="imgs/disable-cache.svg" alt="Disable Cache 확인란.">
  <figcaption>
    <b>그림 6</b>. 파란색 외곽선으로 표시한 Disable Cache 확인란
  </figcaption>
</figure>

#### Network Conditions 창에서 브라우저 캐시 사용 중지 {: #disable-cache-network-conditions }

다른 DevTools 패널에서 작업하는 동안 캐시 사용을 중지하고 싶다면
Network Condition 창을 사용합니다.

1. [Network Conditions 창](#network-conditions)을 엽니다.
1. **Disable cache** 확인란을 선택하거나 선택 해제합니다.

### 수동으로 브라우저 캐시 모두 삭제 {: #clear-cache}

언제든지 브라우저 캐시를 수동으로 모두 삭제하고 싶다면
Requests 표의 아무 곳이나 오른쪽 클릭한 다음 **Clear Browser Cache**를 선택합니다.

<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="Clear Browser Cache 선택.">
  <figcaption>
    <b>그림 7</b>. Clear Browser Cache 선택
  </figcaption>
</figure>

### 오프라인 에뮬레이션 {: #offline }

[Progressive Web Apps][pwa]라는 웹 앱의 새 클래스가 있으며,
이 클래스는 [서비스 워커][sw]의 도움을 통해 오프라인으로 기능합니다. 이런 유형의
앱을 빌드할 때, 데이터 연결이 전혀 없는
기기를 빠르게 시뮬레이션하는 것이 유용합니다.

**Offline** 확인란을 선택하여 완전한 오프라인 네트워크 환경을
시뮬레이션하세요.

<figure>
  <img src="imgs/offline.svg"
       alt="Offline 확인란">
  <figcaption>
    <b>그림 8</b>. 파란색 외곽선으로 표시된 Offline 확인란
  </figcaption>
</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### 느린 네트워크 연결 에뮬레이션 {: #throttling }

**Network Throttling**
메뉴에서 2G, 3G 및 기타 연결 속도를 에뮬레이션합니다.

<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="Network Throttling 메뉴.">
  <figcaption>
    <b>그림 9</b>. 파란색 외곽선으로 표시된 Network Throttling 메뉴
  </figcaption>
</figure>

Regular 또는 Good 2G와 같은 다양한 사전 설정 값에서 선택할 수 있습니다. 또한,
Network Throttling 메뉴를
열고 **Custom** > **Add**를 선택하여 나만의 맞춤 사전 설정 값을 추가할 수 있습니다.

DevTools는 **Network** 탭 옆에 경고 아이콘을 표시하여
스로틀링이 활성화되었다는 것을 알립니다.

#### Network Conditions 창에서 느린 네트워크 연결 에뮬레이션 {: #throttling-network-conditions }

다른 DevTools
패널에서 작업하는 동안 네트워크 연결 사용을 중지하고 싶다면 Network Condition 창을 사용합니다.

1. [Network Conditions 창](#network-conditions)을 엽니다.
1. **Network Throttling** 메뉴에서 원하는 연결 속도를 선택합니다.

### 수동으로 브라우저 쿠키 모두 삭제 {: #clear-cookies }

언제든지 브라우저 쿠키를 수동으로 모두 삭제하고 싶다면
Requests 표의 아무 곳이나 오른쪽 클릭한 다음 **Clear Browser Cookies**를 클릭합니다.

<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="Clear Browser Cookies 선택.">
  <figcaption>
    <b>그림 10</b>. Clear Browser Cookies 선택.
  </figcaption>
</figure>

### 사용자 에이전트 재정의 {: #user-agent }

사용자 에이전트를 수동으로 재정의하려면 다음을 수행합니다.

1. [Network Conditions 창](#network-conditions)을 엽니다.
1. **Select automatically**를 선택 해제합니다.
1. 메뉴에서 사용자 에이전트 옵션을 선택하거나 텍스트 상자에
  사용자 설정을 입력합니다.

## 요청 필터링 {: #filter }

### 속성별 요청 필터링 {: #filter-by-property }

**Filter** 텍스트 상자를 사용하여
도메인이나 요청의 크기와 같은 속성별로 요청을 필터링합니다.

텍스트 상자가 보이지 않는다면 Filter 창이 숨겨져 있을 수 있습니다.
[Filters 창 숨기기](#hide-filters)를 확인하세요.

<figure>
  <img src="imgs/filter-text-box.svg" alt="Filters 텍스트 상자.">
  <figcaption>
    <b>그림 11</b>. 파란색 외곽선으로 표시된 Filters 텍스트 상자
  </figcaption>
</figure>

각 속성을
스페이스로 구분하여 여러 속성을 동시에 사용할 수 있습니다. 예를 들어, `mime-type:image/gif larger-than:1K`는
1KB보다 큰 모든 GIF를 표시합니다. 이러한 다중 속성 필터는
AND 연산자와 동일합니다. OR 연산자는 현재 지원되지
않습니다.

아래는 지원되는 속성의 전체 목록입니다.

* `domain`. 지정된 도메인의 리소스만 표시합니다. 와일드 카드 문자
(`*`)를  사용하여 여러 도메인을 포함할 수 있습니다. 예를 들어, `*.com`을 사용하면
  도메인 이름이 `.com`으로 끝나는 모든 리소스가 표시됩니다. DevTools는
  자동완성 드롭다운 메뉴를 그 동안 접한 모든 도메인으로
  채워넣습니다.
* `has-response-header`. 지정된 HTTP 응답 헤더가 포함된 리소스를
  표시합니다. DevTools는
  자동완성 드롭다운 메뉴를 그 동안 접한 모든 응답 헤더로 채워넣습니다.
* `is`. `is:running`을 사용하여 `WebSocket` 리소스를 찾습니다.
* `larger-than`. 지정된 크기보다 큰 리소스를 바이트 단위로
  표시합니다. 값을 `1000`으로 설정하는 것은 값을 `1k`로 설정하는 것과 같습니다.
* `method`. 지정된 HTTP 메서드
  유형을 통해 검색된 리소스를 표시합니다. DevTools는 드롭다운 메뉴를 그 동안 접한 모든 HTTP 메서드로
  채워넣습니다.
* `mime-type`. 지정된 MIME 유형의 리소스를 표시합니다. DevTools는
  드롭다운 메뉴를 그 동안 접한 모든 MIME 유형으로 채워넣습니다.
* `mixed-content`. 모든 혼합 콘텐츠 리소스(`mixed-content:all`)를 표시하거나
  현재 표시된 리소스(`mixed-content:displayed`)만 표시합니다.
* `scheme`. 보호되지 않은 HTTP(`scheme:http`)
  또는 보호된 HTTPS(`scheme:https`)를 통해 가져온 리소스를 표시합니다.
* `set-cookie-domain`. 지정된 값과 일치하는 `Domain` 속성과
  `Set-Cookie` 헤더를 가진 리소스를 표시합니다. DevTools는
  자동완성을 그 동안 접한 모든 쿠키 도메인으로
  채웁니다.
* `set-cookie-name`. 이름이 지정된 값과 일치하고 `Set-Cookie` 헤더를 가진
  리소스를 표시합니다. DevTools는
  자동완성을 그 동안 접한 모든 쿠키 이름으로 채웁니다.
* `set-cookie-value`. 값이 지정된 값과 일치하고 `Set-Cookie` 헤더를 가진
  리소스를 표시합니다. DevTools는 자동완성을
  그 동안 접한 모든 쿠키 값으로 채웁니다.
* `status-code`. HTTP 상태 코드가 지정된 코드와 일치하는
  리소스만 표시합니다. DevTools는 자동완성 드롭다운 메뉴를 그 동안 접한 모든
  상태 코드로 채웁니다.

### 유형별 요청 필터링 {: #filter-by-type }

요청을 요청 유형별로 필터링하려면 Network 패널에서 **XHR**, **JS**, **CSS**,
**Img**, **Media**, **Font**, **Doc**, **WS** (WebSocket), **Manifest**, 또는
**Other**(여기에 나열되지 않은 기타 유형) 버튼을 누릅니다.

이러한 버튼이 보이지 않는다면 Filters 창이 숨겨져 있기 때문일 수 있습니다.
[Filters 창 숨기기](#hide-filters)를 확인하세요.

여러 유형의 필터를 동시에 활성화하려면 <kbd>Cmmd</kbd>(Mac)
혹은 <kbd>Ctrl</kbd>(Windows, Linux)을 길게 누른 다음 클릭합니다.

<figure>
  <img src="imgs/multi-type-filter.png"
       alt="Type 필터를 사용하여 JS, CSS, Doc[ument]
        리소스 표시.">
  <figcaption>
    <b>그림 12</b>. Type 필터를 사용하여 JS, CSS, Doc[ument]
        리소스 표시.
  </figcaption>
</figure>

### 시간별 요청 필터링 {: #filter-by-time }

Overview 창의 오른쪽이나 왼쪽을 클릭하고 드래그하여
해당 시간 프레임 내에 활성 상태였던 요청만을 표시합니다. 이 필터는 포괄적입니다. 강조표시된 시간에 활성 상태였던 모든 요청이
표시됩니다.

<figure>
  <img src="imgs/overview-filter.png"
       alt="약 2500ms 간 활성 상태가 아니었던 모든 요청 제외.">
  <figcaption>
    <b>그림 13</b>. 약
    2500ms 간 활성 상태가 아니었던 모든 요청 제외.
  </figcaption>
</figure>

### 데이터 URL 숨기기

[데이터 URL][data-uris]은 기타 문서에 삽입된 소형 파일입니다. Requests
표에서
`data:`로 시작되는 모든 요청은 데이터 URL입니다.

**Hide data URL** 확인란을 선택하여 이러한 요청을 숨깁니다.

<figure>
  <img src="imgs/hide-data-urls.svg" alt="Hide Data URL 확인란.">
  <figcaption>
    <b>그림 14</b>. Hide Data URL 확인란.
  </figcaption>
</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## 요청 정렬

기본적으로 Requests 표에 있는 요청은 개시
시간별로 정렬되어 있지만, 다른 기준으로 표를 정렬할 수 있습니다.

### 열을 기준으로 정렬 {: #sort-by-column }

Requests의 아무 열의 헤더를 클릭하면 해당
열을 기준으로 요청을 정렬합니다.

### 활동 단계를 기준으로 정렬 {: #sort-by-activity }

Waterfall이 요청을 정렬하는 방식을 변경하려면,
Requests 표의 헤더를 오른쪽 클릭하고 **Waterfall** 위로 마우스를 가져간 후, 다음 중
하나의 옵션을 선택합니다.

* **시작 시간**. 첫 번째로 개시되었던 요청이 상단에 위치합니다.
* **응답 시간**. 첫 번째로 다운로드를 시작한 요청이 상단에 위치합니다.
* **종료 시간**. 첫 번째로 완료된 요청이 상단에 위치합니다.
* **총 소요 시간** 연결 설정 및 요청/반응 시간이
 가장 짧은 요청이 상단에 위치합니다.
* **지연 시간**. 응답을 가장 적게 기다린 요청이
  상단에 위치합니다.

이러한 설명은 각각의 옵션이 가장 짧은 것부터 가장 긴 것 순으로
순위가 매겨진다고 가정합니다. **Waterfall** 열의 헤더를 클릭하여 순서를 변경할 수 있습니다.

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="총 소요 시간을 기준으로 Waterfall 정렬.">
  <figcaption>
    <b>그림 15</b>. 총 소요 시간을 기준으로 Waterfall 정렬. 각 막대의
    밝은 부분은 대기에 소모한 시간입니다. 어두운 부분은
    바이트 다운로드에 소모한 시간입니다.
  </figcaption>
</figure>

## 요청 분석 {: #analyze }

DevTools은 창이 열려있는 한 Network 패널의 모든 요청을 로깅합니다.
Network 패널을 이용하여 요청을 분석합니다.

### 요청 로그 보기 {: #requests }

Requests 표를 사용하여 DevTools가 열려있는 동안
생성된 모든 요청의 로그를 봅니다. 요청을 클릭하거나 그 위로 마우스를 가져가면
더 많은 정보를 볼 수 있습니다.

<figure>
  <img src="imgs/requests-table.svg"
       alt="Requests 표.">
  <figcaption>
    <b>그림 16</b>. 파란색 외곽선으로 표시된 Requests 표
  </figcaption>
</figure>

Requests 표는 다음의 열을 기본으로 표시합니다.

* **이름**. 리소스의 파일 이름이나 식별자.
* **상태**. HTTP 상태 코드.
* **유형**. 요청한 리소스의 MIME 유형.
* **시작자**. 다음의 객체 또는 프로세스가 요청을 개시할 수 있습니다.
    * **파서**. Chrome의 HTML 파서.
    * **리디렉션**. HTTP 리디렉션.
    * **스크립트**. 자바스크립트 함수.
    * **기타**. 일부 다른 프로세스 또는 작업(예: 사용자가 링크를 통하거나
      주소 표시줄에 URL 입력하여 페이지로 이동).
* **크기**. 서버가 전달한 응답 헤더의 크기에
  응답 본문을 더한 크기.
* **시간**. 총 소요 시간, 즉 요청 시작부터 응답의 최종 바이트를
  수신할 때까지 걸린 시간입니다.
* [**Waterfall**](#waterfall). 각 요청의 활동에 대한 시각적 분석.

#### 열 추가 또는 삭제 {: #columns }

Request 표의 헤더를 오른쪽 클릭하고 숨기거나 표시하는
옵션을 선택합니다. 현재 표시된 옵션 옆에는 체크 표시가 있습니다.

<figure>
  <img src="imgs/add-column.png"
       alt="Requests 표에 열 추가.">
  <figcaption>
    <b>그림 17</b>. Requests 표에 열 추가.
  </figcaption>
</figure>

#### 사용자설정 열 추가 {: #custom-columns }

Requests 표에 사용자설정 열을 추가하려면
Requests 표의 헤더를 오른쪽 클릭하고 **Response Headers** > **Manage Header Columns**를 선택합니다.

<figure>
  <img src="imgs/custom-column.png"
       alt="Requests 표에 사용자설정 열 추가.">
  <figcaption>
    <b>그림 18</b>. Requests 표에 사용자설정 열 추가.
  </figcaption>
</figure>

### 요청 간의 타이밍 보기 {: #waterfall }

Waterfall을 사용하여 요청 간의 타이밍을 봅니다.
기본적으로 Waterfall은 요청의 시작 시간별로 정리되어 있습니다.
따라서, 왼쪽으로 끝에 있는 요청이 오른쪽 끝에 있는 것보다
더 먼저 시작된 것입니다.

[활동 단계를 기준으로 정렬](#sort-by-activity)을 참조하여
Waterfall을 정렬하는 여러 방법을 알아보세요.

<figure>
  <img src="imgs/waterfall.png"
       alt="Requests 창의 Waterfall 열.">
  <figcaption>
    <b>그림 19</b>. Requests 창의 Waterfall 열.
  </figcaption>
</figure>

### WebSocket Connection의 프레임 분석 {: #frames }

WebSocket Connection의 프레임을 분석하려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   WebSocket Connection의 URL을 클릭합니다.
1. **Frames** 탭을 클릭합니다. 표에 최근 100프레임이 표시됩니다.

표를 새로고침하려면 Requests 표의 **Name** 열 아래에 있는
WebSocket Connection의 이름을 다시 클릭합니다.

<figure>
  <img src="imgs/frames.svg"
       alt="Frames 탭.">
  <figcaption>
    <b>그림 20</b>. 파란색 외곽선으로 표시된 Frames 탭
  </figcaption>
</figure>

표에는 세 개의 열이 있습니다.

* **데이터**. 메시지 페이로드. 메시지가 일반 텍스트인 경우
  여기에 표시됩니다. 바이너리 연산 부호인 경우, 이 열은 해당 연산 부호의
  이름과 코드를 표시합니다. 지원되는 연산 부호는 다음과 같습니다. Continuation Frame,
  Binary Frame, Connection Close Frame, Ping Frame, 및 Pong Frame.
* **길이**. 바이트 단위의 메시지 페이로드 길이.
* **시간**. 메시지가 수신되거나 전송된 시간.

메시지는 유형에 따라 색상이 구분됩니다.

* 전송 텍스트 메시지는 연두색입니다.
* 수신 텍스트 메시지는 흰색입니다.
* WebSocket 연산 부호는 옅은 노란색입니다.
* 오류는 옅은 빨간색입니다.

### 응답 본문의 미리보기 보기 {: #preview }

응답 본문의 미리보기를 보려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   요청의 URL을 클릭합니다.
1. **Preview** 탭을 클릭합니다.

이 탭은 주로 이미지를 보는 데 유용합니다.

<figure>
  <img src="imgs/preview.svg"
       alt="Preview 탭.">
  <figcaption>
    <b>그림 21</b>. 파란색 외곽선으로 표시된 Preview 탭
  </figcaption>
</figure>

### 응답 본문 보기 {: #response }

요청에 대한 응답 본문을 보려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   요청의 URL을 클릭합니다.
1. **Response** 탭을 클릭합니다.

<figure>
  <img src="imgs/response.svg"
       alt="Response 탭.">
  <figcaption>
    <b>그림 22</b>. 파란색 외곽선으로 표시된 Response 탭
  </figcaption>
</figure>

### HTTP 헤더 보기 {: #headers }

요청에 관한 HTTP 헤더 데이터를 보려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   요청의 URL을 클릭합니다.
1. **Headers** 탭을 클릭합니다.

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="Headers 탭.">
  <figcaption>
    <b>그림 23</b>. 파란색 외곽선으로 표시된 Headers 탭
  </figcaption>
</figure>

#### HTTP 헤더 소스 보기 {: #header-source }

기본적으로 Headers 탭은 헤더 이름을 알파벳 순서로 표시합니다. HTTP 헤더 이름을 수신한 순서대로
보려면 다음을 수행합니다.

1. 보려고 하는 요청에 대한 **Headers** 탭을 엽니다.
[HTTP 헤더 보기](#headers)를 참조하세요.
1. **Request Header** 또는 **Response
   Header** 섹션 옆의 **view source**를 클릭합니다.

### 쿼리 문자열 매개변수 보기 {: #query-string }

URL 쿼리 문자열 매개변수를 읽을 수 있는 형식으로 보려면 다음을 수행합니다.

1. 보려고 하는 요청에 대한 **Headers** 탭을 엽니다.
[HTTP 헤더 보기](#headers)를 참조하세요.
1. **Query String Parameters** 섹션으로 이동합니다.

<figure>
  <img src="imgs/query-string.svg" alt="Query String Parameters 섹션.">
  <figcaption>
    <b>그림 24</b>. 파란색 외곽선으로 표시된 Query String Parameters 섹션
  </figcaption>
</figure>

#### 쿼리 문자열 매개변수 소스 보기 {: #query-string-source }

요청의 뭐리 문자열 매개변수 소스를 보려면 다음을 수행합니다.

1. Query String Parameters 섹션으로 이동합니다. [쿼리 문자열
   매개변수 보기](#query-string)를 참조하세요.
1. **view source**를 클릭합니다.

#### URL 인코딩된 쿼리 문자열 매개변수 보기 {: #query-string-encodings }

쿼리 문자열 매개변수를 인코딩이 유지된 상태에서 읽을 수 있는 형식으로 보려면
다음을 수행합니다.

1. Query String Parameters 섹션으로 이동합니다. [쿼리 문자열
   매개변수 보기](#query-string)를 참조하세요.
1. **view URL encoded**를 클릭합니다.

### 쿠키 보기 {: #cookies }

요청의 HTTP 헤더로 전송된 쿠키를 보려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   요청의 URL을 클릭합니다.
1. **Cookies** 탭을 클릭합니다.

[필드](/web/tools/chrome-devtools/manage-data/cookies#fields)를 참조하여
각 열의 설명을 확인하세요.

<figure>
  <img src="imgs/cookies.svg"
       alt="Cookies 탭.">
  <figcaption>
    <b>그림 25</b>. 파란색 외곽선으로 표시된 Cookies 탭
  </figcaption>
</figure>

### 요청의 타이밍 분석 보기 {: #timing }

요청의 타이밍 분석을 보려면 다음을 수행합니다.

1. Requests 표의 **Name** 열 아래에 있는
   요청의 URL을 클릭합니다.
1. **Timing** 탭을 클릭합니다.

[타이밍 분석 미리보기](#timing-preview)를 참조하여 이 데이터에 액세스하는 더 빠른 방법을
알아보세요.

[타이밍 분석 단계 설명](#timing-explanation)을 참조하여 Timing 탭에서 볼 수 있는 각 단계에 관한 더 많은
정보를 알아보세요.

<figure>
  <img src="imgs/timing.svg" alt="Timing 탭.">
  <figcaption>
    <b>그림 26</b>. 파란색 외곽선으로 표시된 Timing 탭
  </figcaption>
</figure>

각 단계에 관한 더 많은 정보가 있습니다.

[타이밍 분석 보기](#timing-breakdown)를 참조하여 이 보기
에 액세스하는 다른 방법을 알아보세요.

#### 타이밍 분석 미리보기 {: #timing-preview }

요청의 타이밍 분석 미리보기를 보려면,
Requests 표의 **Waterfall**열에서 해당 요청의 엔트리 위에 마우스를 가져가세요.

[요청의 타이밍 분석 보기](#timing)를 참조하여 마우스 오버 없이
해당 데이터에 액세스하는 방법을 알아보세요.

<figure>
  <img src="imgs/waterfall-hover.png"
       alt="요청의 타이밍 분석 미리보기.">
  <figcaption>
    <b>그림 27</b>. 요청의 타이밍 분석 미리보기.
  </figcaption>
</figure>

#### 타이밍 분석 단계 설명 {: #timing-explanation }

Timing
탭에서 볼 수 있는 각 단계에 관한 자세한 설명은 다음과 같습니다.

* **큐 추가**. 브라우저는 요청이 다음과 같을 때 큐에 추가합니다.
    * 더 높은 우선순위의 요청이 있습니다.
    * 이미 6개의 TCP 연결(한계)이
      해당 출발지에서 열려 있습니다. HTTP/1.0 및 HTTP/1.1에만 해당됩니다.
    * 브라우저가 일시적으로 디스크 캐시에 공간을 할당합니다.
* **지연**. 요청은
  **큐 추가**에서 설명한 이유로 지연될 수 있습니다.
* **DNS 룩업**. 브라우저가 요청의 IP 주소를 분석하고 있습니다.
* **프록시 협상**. 브라우저가 [프록시
  서버](https://en.wikipedia.org/wiki/Proxy_server)와 해당 요청을 협상 중입니다.
* **요청 전송됨**. 요청이 전송됩니다.
* **ServiceWorker 준비**. 브라우저가 서비스 워커를 시작 중입니다.
* **ServiceWorker에 대한 요청**. 요청이 서비스
  워커에 전송되고 있습니다.
**대기(TTFB)**. 브라우저가 응답의 첫 번째 바이트를 기다리고 있습니다.
  TTFB는 Time To First Byte(첫 바이트까지의 시간)의 두문자어입니다. 이 타이밍은 지연 시간의 1회 왕복
  및 서버가 응답을 준비하는 데 걸린 시간을 포함합니다.
* **콘텐츠 다운로드**. 브라우저가 응답을 수신 중입니다.
* **푸시 수신**. 브라우저가 HTTP/2
  서버 푸시를 통해 이 응답에 대한 데이터를 수신 중입니다.
* **푸시 읽기**. 브라우저가 이전에 수신한 로컬 데이터를 읽는 중입니다.

### 시작자 및 종속성 보기 {: #initiators-dependencies }

요청의 시작자와 종속성을 보려면 <kbd>Shift</kbd>를
길게 누르고 Requests 표에 있는 요청 위에 마우스를 가져갑니다. DevTools은 시작자를
초록색으로, 종속성을 빨간색으로 표시합니다.

<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="요청의 시작자 및 종속성 보기">
  <figcaption>
    <b>그림 28</b>. 요청의 시작자 및 종속성 보기
  </figcaption>
</figure>

Requests 표가 시간 순서로 정리되었을 때, 마우스를 가져간 요청 위에 있는 첫 번째
초록색 요청이 종속성의
시작자입니다. 그 위에 다른 초록색 요청이 있다면
그 더 높은 요청이 시작자의 시작자입니다. 이런 식으로 계속됩니다.

### 로드 이벤트 보기 {: #load }

DevTools는 `DOMContentLoaded` 및 `load` 이벤트의 타이밍을
Network 패널의 여러 곳에서 표시합니다. `DOMContentLoaded` 이벤트는
파란색으로 표시되며 `load` 이벤트는 빨간색입니다.

<figure>
  <img src="imgs/load-events.svg"
       alt="DOMContentLoaded 및 Network 패널의 로드 이벤트 위치.">
  <figcaption>
    <b>그림 29</b>. <code>DOMContentLoaded</code> 및
   Network 패널의 <code>load</code> 이벤트 위치.
   </figcaption>
</figure>

### 총 요청 수 보기 {: #total-number }

총 요청 수는 Network 패널 하단의
Summary 창에 나열되어 있습니다.

Caution: 이 수치는 DevTools이
열린 이후에 로깅된 요청만을 추적합니다. DevTools이 열리기 전에 다른 요청이 발생했다면, 이러한
요청은 포함되지 않습니다.

<figure>
  <img src="imgs/total-requests.svg"
       alt="DevTools이 열린 후의 총 요청 수">
  <figcaption>
    <b>그림 30</b>. DevTools이 열린 후의 총 요청 수
  </figcaption>
</figure>

### 총 다운로드 크기 보기 {: #total-size }

총 다운로드 크기는 Network 패널 하단의
Summary 창에 나열되어 있습니다.

Caution: 이 수치는 DevTools이
열린 이후에 로깅된 요청만을 추적합니다. DevTools이 열리기 전에 다른 요청이 발생했다면, 이러한
요청은 포함되지 않습니다.

<figure>
  <img src="imgs/total-size.svg"
       alt="요청의 총 다운로드 크기">
  <figcaption>
    <b>그림 31</b>. 요청의 총 다운로드 크기
  </figcaption>
</figure>

[압축 해제된 리소스 크기 보기](#uncompressed)를 참조하여
브라우저가 압축을 해제한 후의 리소스 크기를 확인하세요.

### 요청을 발생시킨 스택 추적 보기 {: #initiator-stack-trace }

자바스크립트 구문이 리소스 요청을 일으켰다면, **Initiator**
열에 마우스를 가져가 해당 요청까지의 스택 추적을 볼 수 있습니다.

<figure>
  <img src="imgs/initiator-stack.png"
       alt="리소스 요청까지의 스택 추적">
  <figcaption>
    <b>그림 32</b>. 리소스 요청까지의 스택 추적
  </figcaption>
</figure>

### 압축 해제된 리소스 크기 보기 {: #uncompressed }

**Use Large Request Rows** ![넓은 요청
행 사용](imgs/large-resource-rows-button.png)을 클릭한 다음{:.inline-icon} **Size** 열의
가장 아래 값을 봅니다.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="압축 해제된 리소스의 예">
  <figcaption>
    <b>그림 33</b>. 네트워크로 전송된 <code>jquery-bundle.js</code> 파일의 압축 크기는
    <code>30.9 KB</code>인 반면, 압축 해제된 크기는
   <code>86.3 KB</code>였습니다.
  </figcaption>
</figure>

## 요청 데이터 내보내기 {: #export }

### 모든 네트워크 요청을 HAR 파일에 저장하기 {: #save-as-har }

모든 네트워크 요청을 HAR 파일에 저장하려면 다음을 수행합니다.

1. Requests 표에서 임의의 요청을 오른쪽 클릭합니다.
1. **Save as HAR with Content**를 선택합니다. DevTools이 DevTools을 연 후에 발생한
   모든 요청을 HAR 파일에 저장합니다. 요청을 필터링하거나 단일 요청만을 저장하는
   방법은 없습니다.

HAR 파일을 받으면, DevTools에 다시 가져와 분석할 수 있습니다. HAR 파일을
Requests 표에 드래그 앤 드롭하기만 하기만 하면 됩니다. [HAR Analyzer][HAR
Analyzer]{: .external }도 참조하세요.

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="Save as HAR with Content 선택.">
  <figcaption>
    <b>그림 34</b>. <b>Save as HAR with Content</b> 선택
  </figcaption>
</figure>

### 하나 또는 여러 개의 요청을 클립보드에 복사 {: #copy }

Requests 표의 **Name** 열에서 요청을 오른쪽 클릭한 다음
**Copy**에 마우스를 가져가 다음 중 하나의 옵션을 선택합니다.

* **링크 주소 복사**. 요청의 URL을 클립보드에 복사합니다.
* **응답 복사**. 응답 본문을 클립보드에 복사합니다.
* **cURL로 복사**. 요청을 cURL 명령어로 복사합니다.
* **전체를 cURL로 복사**. 모든 요청을 일련의 cURL 명령어로 복사합니다.
* **전체를 HAR로 복사**. 모든 요청을 HAR 데이터로 복사합니다.

<figure>
  <img src="imgs/copy.png" alt="Copy Response 선택.">
  <figcaption>
    <b>그림 35</b>. Copy Response 선택.
  </figcaption>
</figure>

## Network 패널의 레이아웃 변경

Network panel UI의 섹션을 펼치거나 접어 중요한
내용에 집중할 수 있습니다.

### Filter 창 숨기기 {: #hide-filters }

기본적으로 DevTools는 [Filters 창](#filters)을 표시합니다.
**Filter** ![필터][filter]를 클릭하여{: .devtools-inline } 숨깁니다.

<figure>
  <img src="imgs/hide-filters.svg" alt="Hide Filters 버튼">
  <figcaption>
    <b>그림 36</b>. 파란색 외곽선으로 표시된 Hide Filters
  </figcaption>
</figure>

[filter]: imgs/filters.png

### 넓은 요청 행 사용 {: #request-rows }

네트워크
요청 테이블에 더 많은 공백을 원하는 경우, 넓은 행을 사용할 수 있습니다. 일부 열은
넓은 행을 사용할 때 더 많은 정보를 제공하기도 합니다. 예를 들어, **Size**
열의 하단 값은 압축 해제된 요청의 크기입니다.

<figure>
  <img src="imgs/large-request-rows.png"
       alt="Requests 창의 넓은 요청 행의 예.">
  <figcaption>
    <b>그림 37</b>. Requests 창의 넓은 요청 행의 예.
  </figcaption>
</figure>

**Use large request rows** ![넓은 요청 행
사용][large]을{:.devtools-inline} 클릭하여 넓은 행의 사용을 설정합니다.

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="Large Request Rows 버튼">
  <figcaption>
    <b>그림 38</b>. 파란색 외곽선으로 표시된 Large Reques Rows
  </figcaption>
</figure>

### Overview 창 숨기기 {: #hide-overview }

기본적으로 DevTools는 [Overview 창](#overview)을 표시합니다.
**Hide overview** ![overview 숨기기][hide]를 클릭하여{:.devtools-inline} 숨깁니다.

<figure>
  <img src="imgs/hide-overview.svg" alt="Hide Overview 버튼">
  <figcaption>
    <b>그림 39</b>. 파란색 외곽선으로 표시된 Hide Overview
  </figcaption>
</figure>

[hide]: imgs/hide-overview.png

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
