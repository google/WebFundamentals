project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 브라우저가 탐색 요청을 처리하는 방법을 학습하십시오.

{# wf_published_on: 2018-09-07 #} {# wf_updated_on: 2018-09-21 #} {# wf_featured_image: /web/updates/images/inside-browser/cover.png #} {# wf_featured_snippet: 여러분이 URL을 주소창에 입력할 때 어떤 일이 벌어질까요? 언제 보안 확인이 끝나고 어떻게 브라우저의 실행 속도를 빠르게 할 수 있을까요? 브라우저에서 페이지 탐색이 어떻게 진행되는 지 알아봅시다! #} {# wf_blink_components: N/A #}

<style>
  figcaption {
    font-size:0.9em;
  }
</style>

# 모던 웹 브라우저 들여다보기 (파트 2) {: .page-title }

{% include "web/_shared/contributors/kosamari.html" %}

## 탐색할 때 일어나는 일

크롬의 내부 구조에 대해 살펴보는 블로그 4 연작 중 두 번째 글입니다. [이전 포스트](/web/updates/2018/09/inside-browser-part1)에서, 개별 프로세스와 스레드가 브라우저의 여러 부분들을 어떻게 처리하는지 살펴 보았습니다. 이 포스트에서는 웹사이트를 디스플레이하기 위해 각 프로세스와 스레드들이 어떻게 통신하는 지 조금 더 깊게 파볼까 합니다.

간단하게 웹 서핑하는 케이스를 생각해 봅시다: 브라우저에 주소를 치면, 브라우저는 인터넷에서 데이터를 받아 페이지를 표시합니다. 이 포스트에서는 - 탐색(Navigation)이라 불리는 - 사용자의 요청을 받아 브라우저가 페이지를 렌더링하는 과정을 집중 설명합니다.

## 브라우저 프로세스에서 시작합니다

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part2/browserprocesses.png" alt="Browser processes">
  <figcaption>     Figure 1: 위는 브라우저 UI, 아래는 UI에 붙은 브라우저 프로세스, 네트워크, 스토리지 스레드의 도식도</figcaption>
</figure>

[파트 1: CPU, GPU, Memory, 그리고 멀티 프로세스 아키텍쳐](/web/updates/2018/09/inside-browser-part1)에서 보았듯이 탭 밖에 있는 것들은 모두 브라우저 프로세스가 담당합니다. 브라우저 프로세스는 버튼이나 입력창을 그리는 UI 스레드, 인터넷에서 데이터를 수신하기 위해 통신 스택을 건드리는 네트워크 스레드, 파일 같은 것들에 접근하기 위한 스토리지 스레드등을 가지고 있습니다. 주소창에서 URL을 입력하는 순간 브라우저 프로세스의 UI 스레드가 캐치하죠.

<div class="clearfix"></div>

## 단순한 탐색

### Step 1: 입력 처리

사용자가 주소창에 입력하기 시작하면 UI 스레드는 우선 "검색어인가 URL인가?"부터 판단합니다. 크롬에서는 주소창이 검색창도 겸하거든요, 그래서 UI 스레드가 입력 문구를 파싱해서 검색 엔진에 보낼 지, 요청한 페이지로 연결할 지 결정합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/input.png" alt="Handling user input">
  <figcaption>     Figure 1: 입력이 검색어인가 URL인가 확인하는 UI 스레드.</figcaption>
</figure>

### Step 2: 탐색 시작

사용자가 엔터를 치면 UI 스레드가 사이트 컨텐츠를 받기 위해 네트워크 요청을 초기화합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/navstart.png" alt="Navigation start">
  <figcaption>     Figure 2: mysite.com 사이트로 이동하기 위해 네트워크 스레드에게 알리는 UI 스레드.</figcaption>
</figure>

이 시점에서 네트워크 스레드는 HTTP 301 같은 서버의 리다이렉션 헤더를 수신할 수도 있습니다. 그럴 경우 네트워크 스레드는 UI 스레드에게 서버가 리다이렉션을 요청했음을 알리죠. 그러면 새로운 URL 요청을 초기화 합니다.

### Step 3: 응답 읽기

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part2/response.png" alt="HTTP response">
  <figcaption>     Figure 3: Content-Type을 포함한 응답 헤더와 실질적 데이터인 페이로드</figcaption>
</figure>

응답 바디 (payload)가 들어오기 시작할 때, 필요하면 네트워크 스레드가 스트림의 처음 몇 바이트를 확인합니다. 응답의 Content-Type 헤더는 데이터 타입이 무엇인지 알려 줍니다만, 빠지거나 틀릴 수 있으므로, [MIME Type 스니핑](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)을 수행합니다. 이 부분은 [소스 코드](https://cs.chromium.org/chromium/src/net/base/mime_sniffer.cc?sq=package:chromium&dr=CS&l=5)에 코멘트되어 있는 것처럼 "까다로운 작업(tricky business)"입니다. 주석을 조금 더 읽으시면 다른 브라우저들이 content-type과 payload를 어떻게 처리하는 지 알 수 있습니다.

<div class="clearfix"></div>

응답이 HTML 파일이면 다음 단계로 렌더러 프로세스에 데이터를 전달합니다. 하지만 zip 또는 다른 형식의 파일이라면 다운로드 요청이라는 뜻이므로 다운로드 매니저에 데이터를 넘깁니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/sniff.png" alt="MIME type sniffing">
  <figcaption>     Figure 4: 응답 데이터가 안전한 사이트에서 전송된 HTML인지 확인하는 네트워크 스레드</figcaption>
</figure>

이 시점에서 [안전 브라우징](https://safebrowsing.google.com/) 체크도 수행합니다. 만약 도메인과 응답 데이터가 이미 알려진 악성 사이트와 일치 한다면, 네트워크 스레드는 warning 페이지를 보여주어 경고합니다. 추가적으로,  [**C**ross **O**rigin **R**ead **B**locking (**CORB**)](https://www.chromium.org/Home/chromium-security/corb-for-developers) 체크를 하여 반드시 민감한 cross-site 데이터가 렌더러 프로세스에 도달하지 못하게 합니다.

### Step 3: 렌더러 프로세스 찾기

모든 확인 작업이 끝나고 네트워크 스레드가 브라우저가 요청된 사이트로 이동해야 함을 확신하면, 네트워크 스레드는 UI 스레드에게 데이터가 준비되었다고 알려줍니다. 그럼 UI 스레드는 웹 페이지를 렌더링을 담당 할 렌더러 프로세스를 찾죠.

<figure>
  <img src="/web/updates/images/inside-browser/part2/findrenderer.png" alt="Find renderer process">
  <figcaption>     Figure 5: 렌더러 프로세스를 찾기 위해 UI 스레드에게 알리는 네트워크 스레드</figcaption>
</figure>

네트워크 요청이 응답을 받는데 수 백 밀리 초 정도 소요될 수 있으므로 이 과정을 빠르게 하는 최적화가 적용됩니다. Step 2에서 UI 스레드가 네트워크 스레드에게 URL 요청을 보내면, 어느 사이트로 가야 할 지 이미 알고 있는 상황이죠. UI 스레드는 네트워크 요청과 병행하여 적극적으로 렌더러 프로세스를 찾거나 시작하려 합니다. 이 경우, 모든 게 계획대로라면, 네트워크 스레드가 데이터를 수신했을 때 렌더러 프로세스는 이미 대기하고 있습니다. 만약 탐색 도중 cross-site로 리다이렉트한다면 준비된 프로세스는 사용되지 않고, 다른 프로세스가 필요할 겁니다.

### Step 4: 탐색 수행

이제 데이터와 렌더러 프로세스가 준비 됐으니, 탐색을 커밋하기 위해 브라우저 프로세스에서 렌더러 프로세스로 IPC가 전송됩니다. 또 데이터 스트림을 전달하여 렌더러 프로세스가 HTML 데이터를 계속 받을 수 있게 합니다. 렌더러 프로세스에서 커밋이 확인되면 브라우저 프로세스는 탐색을 완료하고 문서 로딩 단계를 시작합니다.

이 시점에서 주소창이 갱신되고 보안 알리미(security indicator)와 사이트 설정 UI가 새 페이지의 사이트 정보를 반영합니다. 탭의 세션 이력이 갱신되어 뒤로/앞으로 가기 버튼에 방금 방문한 사이트가 추가될 것이구요. 탭/세션 복구 기능을 위해 탭이나 윈도우를 닫을 때, 세션 이력은 디스크에 저장됩니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/commit.png" alt="Commit the navigation">
  <figcaption>     Figure 6: 페이지 렌더를 요청하는 브라우저 프로세스와 렌더러 프로세스 간의 IPC</figcaption>
</figure>

### Extra Step: 초기 로딩 완료

탐색이 커밋되고 나면, 렌더러 프로세스가 리소스 로딩과 페이지 렌더를 지속합니다. 다음 포스트에서 이 단계에 대해 조금 더 자세히 알아볼 예정입니다. 렌더러 프로세스가 렌더링을 "끝"내면, 브라우저 프로세스에 IPC를 반환합니다(`onload` 이벤트가 페이지의 모든 프레임에서 발생하고 실행까지 완료된 후가 됩니다). 이 시점에서, UI 스레드는 탭의 로딩 스피너를 정지합니다.

"끝"이라고 말한 이유는, 클라이언트 사이드 자바스크립트는 이 시점 이후에도 계속 추가적인 리소스를 로드하거나 새로운 뷰를 렌더할 수 있기 때문입니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/loaded.png" alt="Page finish loading">
  <figcaption>Figure 7: 렌더러에서 브라우저 프로세스까지 페이지가 "로드"되었음을 알리는 IPC.</figcaption>
</figure>

## 다른 사이트 탐색

단순한 탐색이 완료되었습니다! 근데 사용자가 주소창에 다른 URL을 다시 입력하면 어떻게 될까요? 뭐, 브라우저가 동일한 방법으로 다른 사이트를 탐색하겠죠. 하지만 그 전에, 현재 렌더링된 사이트가 [`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) 이벤트를 처리하는 지 확인할 필요가 있습니다.

`beforeunload` 이벤트는 다른 사이트를 방문하거나 탭을 닫을 때 "이 사이트에서 나가시겠습니까?" 팝업을 띄울 수 있습니다. JavaScript 코드를 포함한 탭 안의 모든 것들은 렌더러 프로세스가 처리하므로, 브라우저 프로세스는 새 탐색 요청이 들어올 때 렌더러 프로세스를 체크할 필요가 있습니다.

Caution: 무조건적으로 `beforeunload` 이벤트 핸들러들을 추가하지 마세요. 탐색을 시작하기도 전에 해당 이벤트에 대한 헨들러를 실행시켜야 하기 때문에 대기 시간이 더 생깁니다. 페이지에 작성한 데이터가 소실될 수 있음을 경고하는 등, 반드시 필요한 경우에만 추가하세요.

<figure>
  <img src="/web/updates/images/inside-browser/part2/beforeunload.png" alt="beforeunload event handler">
  <figcaption>     Figure 8: 브라우저 프로세스부터 렌더러 프로세스까지 다른 사이트로 이동하여 탐색한다는 정보를 알리는 IPC.</figcaption>
</figure>

렌더러 프로세스가 탐색 과정을 초기화 하면 (사용자가 링크를 클릭하거나 클라이언트-사이드 JavaScript가 `window.location = "https://newsite.com"` 코드를 돌리는 등) 렌더러 프로세스는 우선 `beforeunload` 핸드러를 체크합니다. 이후, 브라우저 프로세스가 탐색 초기화하는 프로세스를 동일하게 진행하죠. 유일한 차이점은 렌더러 프로세스가 탐색 요청을 브라우저 프로세스에게 토스(kicked off) 한다는 것입니다.

새로운 탐색이 현재 렌더링된 사이트와는 다른 곳으로 새로 탐색하게 된다면, 현재 렌더러 프로세스가 `unload` 같은 이벤트를 처리하는 동안 별개의 렌더러 프로세스가 새 탐색을 처리하기 위해 호출됩니다. 더 자세히는, [페이지 라이프 사이클 현황 개요](/web/updates/2018/07/page-lifecycle-api#overview_of_page_lifecycle_states_and_events)와 어떻게 [ Page Lifecycle API](/web/updates/2018/07/page-lifecycle-api)로 이벤트들을 캐치하는 지 살펴보세요.

<figure>
  <img src="/web/updates/images/inside-browser/part2/unload.png" alt="new navigation and unload">
  <figcaption>     Figure 9: 2 브라우저 프로세스가 새 렌더러 프로세스에게 페이지 렌더링을 요청하고 이전 렌더러 프로세스에게는 페이지를 unload 하도록 요청하는 IPC 도식도</figcaption>
</figure>

## Service Worker의 경우

탐색 프로세스에 있어 최근 변경점은 [service worker](/web/fundamentals/primers/service-workers/)의 도입입니다. Service Worker는 여러분의 앱 코드에 네트워크 프록시를 작성할 수 있는 수단이죠;웹 개발자로 하여금 로컬에 캐시할 데이터와 네트워크로부터 받아올 데이터를 컨트롤할 권한을 더 가지게 합니다. Service Worker가 페이지를 캐시에서 로드하도록 세팅되면, 네트워크에서 데이터를 받아올 필요가 없어지죠.

기억해야 할 중요한 점은 서비스 워커가 렌더러 프로세스에서 돌아가는 JavaScript 코드라는 것입니다. 근데 탐색 요청이 들어오자마자, 사이트에 서비스 워커가 있다는 걸 브라우저가 어떻게 알 수 있을까요?

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part2/scope_lookup.png" alt="Service worker scope lookup">
  <figcaption>     Figure 10: 서비스 워커 범위를 검색하는 브라우저 프로세스의 네트워크 스레드.</figcaption>
</figure>

서비스 워커가 등록되면, 서비스 워커 스코프가 레퍼런스로 취급됩니다 (스코프에 대한 자세한 내용은 [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) 글을 참조하세요). 탐색을 시작할 때, 네트워크 스레드는 등록된 서비스 워커 스코프와 도메인을 비교하여, 동일한 URL에 서비스 워커가 등록되어 있으면, UI 스레드가 해당 서비스 워커 코드를 실행하기 위해 렌더러 프로세스를 찾습니다. 서비스 워커는 데이터를 캐시에서 로드할테니, 네트워크 데이터 요청을 다 날리거나, 새로운 리소스를 요청할 겁니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/serviceworker.png" alt="serviceworker navigation">
  <figcaption>     Figure 11: 브라우저 프로세스의 UI 스레드가 서비스 워커를 처리하도록 렌더러 프로세스를 시작하는 모습. 렌더러 프로세스의 워커 스레드가 네트워크에 데이터 요청.</figcaption>
</figure>

## 선제 탐색(Navigation Preload)

서비스 워커가 결국 네트워크에 데이터를 요청하기로 결정한다면 브라우저 프로세스와 렌더러 프로세스간의 이런 반복 행위는 딜레이가 발생할 요인으로 보일겁니다. [Navigation Preload](/web/updates/2017/02/navigation-preload)는 서비스 워커의 시작과 동시에 리소스들을 병행 로딩하여 이 과정을 빠르게 하는 메커니즘입니다. 이런 요청들에 헤더를 표기하여, 서버가 다른 콘텐츠를 보낼 지 결정하게끔 하죠;예를 들면, 전체 문서 대신에 갱신된 내용 만 보내거나요.

<figure>
  <img src="/web/updates/images/inside-browser/part2/navpreload.png" alt="Navigation preload">
  <figcaption>     Figure 12: 브라우저 프로세스의 UI 스레드가 서비스 워커를 처리하도록 렌더러 프로세스를 시작하면서 동시에 네트워크 요청을 병행하는 모습</figcaption>
</figure>

## 마무리

이번 포스트에서, 탐색 과정에서 일어나는 일들과 응답 헤더와 클라이언트-사이드 JavaScript 같은 여러분의 웹 어플리케이션 코드들이 브라우저와 어떻게 상호작용 하는지 알아보았습니다. 브라우저가 네트워크를 통해 데이터를 가져오는 단계를 알아두면 선제 탐색 같은 API들을 왜 개발했는지 이해하기 쉽습니다.  다음 포스트에서는, 브라우저가 페이지를 렌더링하기 위해 HTML/CSS/JavaScript를 어떻게 다루는 지 알아봅시다.

재밌으셨나요? 궁금한 점이나 이어질 글에 의견이 있으시다면, 아래 코멘트란이나 트위터 [@kosamari](https://twitter.com/kosamari)로 언제든지 연락 주세요.

<a class="button button-primary gc-analytics-event attempt-right" href="/web/updates/2018/09/inside-browser-part3" data-category="InsideBrowser" data-label="Part2 / Next"> 다음: 렌더러 프로세스의 내부 동작 살펴보기</a>

<div class="clearfix"></div>

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
