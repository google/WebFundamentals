project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how browser handles navigation request.

{# wf_published_on: 2018-09-07 #}
{# wf_updated_on: 2018-09-21 #}
{# wf_featured_image: /web/updates/images/inside-browser/cover.png #}
{# wf_featured_snippet: When you type a URL into the address bar, what happens after? When are security checks done and how does the browser speed up the process? Let's look at the page navigation process in browser! #}
{# wf_blink_components: N/A #}

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
  <figcaption>
    Figure 1: Browser UI at the top, diagram of the browser process with UI, network, and storage
    thread inside at the bottom
  </figcaption>
</figure>

[파트 1: CPU, GPU, Memory, 그리고 멀티 프로세스 아키텍쳐](/web/updates/2018/09/inside-browser-part1)에서 보았듯이 탭 밖에 있는 것들은 모두 브라우저 프로세스가 담당합니다. 브라우저 프로세스는 버튼이나 입력창을 그리는 UI 스레드, 인터넷에서 데이터를 수신하기 위해 통신 스택을 건드리는 네트워크 스레드, 파일 같은 것들에 접근하기 위한 스토리지 스레드등을 가지고 있습니다. 주소창에서 URL을 입력하는 순간 브라우저 프로세스의 UI 스레드가 캐치하죠.

<div class="clearfix"></div>

## A simple navigation

### Step 1: 입력 처리

사용자가 주소창에 입력하기 시작하면 UI 스레드는 우선 "검색어인가 URL인가?"부터 판단합니다. 크롬에서는 주소창이 검색창도 겸하거든요, 그래서 UI 스레드가 입력 문구를 파싱해서 검색 엔진에 보낼 지, 요청한 페이지로 연결할 지 결정합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/input.png" alt="Handling user input">
  <figcaption>
    Figure 1: UI Thread asking if the input is a search query or a URL
  </figcaption>
</figure>

### Step 2: 탐색 시작

사용자가 엔터를 치면 UI 스레드가 사이트 컨텐츠를 받기 위해 네트워크 요청을 초기화합니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/navstart.png" alt="Navigation start">
  <figcaption>
    Figure 2: the UI thread talking to the network thread to navigate to mysite.com
  </figcaption>
</figure>

이 시점에서 네트워크 스레드는 HTTP 301 같은 서버의 리다이렉션 헤더를 수신할 수도 있습니다. 그럴 경우 네트워크 스레드는 UI 스레드에게 서버가 리다이렉션을 요청했음을 알리죠. 그러면 새로운 URL 요청을 초기화 합니다.

### Step 3: 응답 읽기

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part2/response.png" alt="HTTP response">
  <figcaption>
    Figure 3: response header which contains Content-Type and payload which is the actual data
  </figcaption>
</figure>

Once the response body (payload) starts to come in, the network thread looks at the first few bytes
of the stream if necessary. The response's Content-Type header should say what type of data it is,
but since it may be missing or wrong,
[MIME Type sniffing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
is done here. This is a "tricky business" as commented in [the source code](https://cs.chromium.org/chromium/src/net/base/mime_sniffer.cc?sq=package:chromium&dr=CS&l=5).
You can read the comment to see how different browsers treat content-type/payload pairs.

<div class="clearfix"></div>

응답이 HTML 파일이면 다음 단계로 렌더러 프로세스에 데이터를 전달합니다. 하지만 zip 또는 다른 형식의 파일이라면 다운로드 요청이라는 뜻이므로 다운로드 매니저에 데이터를 넘깁니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/sniff.png" alt="MIME type sniffing">
  <figcaption>
    Figure 4: Network thread asking if response data is HTML from a safe site
  </figcaption>
</figure>

This is also where the [SafeBrowsing](https://safebrowsing.google.com/) check happens.
If the domain and the response data seems to match a known malicious site, then the network thread
alerts to display a warning page. Additionally,
[**C**ross **O**rigin **R**ead **B**locking (**CORB**)](https://www.chromium.org/Home/chromium-security/corb-for-developers)
check happens in order to make sure sensitive cross-site
data does not make it to the renderer process.

### Step 3: 렌더러 프로세스 찾기

Once all of the checks are done and Network thread is confident that browser should navigate to the
requested site, the Network thread tells UI thread that the data is ready. UI thread then finds a
renderer process to carry on rendering of the web page.

<figure>
  <img src="/web/updates/images/inside-browser/part2/findrenderer.png" alt="Find renderer process">
  <figcaption>
    Figure 5: Network thread telling UI thread to find Renderer Process
  </figcaption>
</figure>

Since the network request could take several hundred milliseconds to get a response back, an
optimization to speed up this process is applied. When the UI thread is sending a URL request to
the network thread at step 2, it already knows which site they are navigating to. The UI thread
tries to proactively find or start a renderer process in parallel to the network request. This way,
if all goes as expected, a renderer process is already in standby position when the network thread
received data. This standby process might not get used if the navigation redirects cross-site, in
which case a different process might be needed.

### Step 4: Commit navigation

Now that the data and the renderer process is ready, an IPC is sent from the browser process to the
renderer process to commit the navigation. It also passes on the data stream so the renderer
process can keep receiving HTML data. Once the browser process hears confirmation that the commit
has happened in the renderer process, the navigation is complete and the document loading phase
begins.

이 시점에서 주소창이 갱신되고 보안 알리미(security indicator)와 사이트 설정 UI가 새 페이지의 사이트 정보를 반영합니다. 탭의 세션 이력이 갱신되어 뒤로/앞으로 가기 버튼에 방금 방문한 사이트가 추가될 것이구요. 탭/세션 복구 기능을 위해 탭이나 윈도우를 닫을 때, 세션 이력은 디스크에 저장됩니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/commit.png" alt="Commit the navigation">
  <figcaption>
    Figure 6: IPC between the browser and the renderer processes, requesting to render the page
  </figcaption>
</figure>

### Extra Step: 초기 로딩 완료

탐색이 커밋되고 나면, 렌더러 프로세스가 리소스 로딩과 페이지 렌더를 지속합니다. 다음 포스트에서 이 단계에 대해 조금 더 자세히 알아볼 예정입니다. 렌더러 프로세스가 렌더링을 "끝"내면, 브라우저 프로세스에 IPC를 반환합니다(`onload` 이벤트가 페이지의 모든 프레임에서 발생하고 실행까지 완료된 후가 됩니다). 이 시점에서, UI 스레드는 탭의 로딩 스피너를 정지합니다.

I say "finishes", because client side JavaScript could still load
additional resources and render new views after this point.

<figure>
  <img src="/web/updates/images/inside-browser/part2/loaded.png" alt="Page finish loading">
  <figcaption>
    Figure 7: IPC from the renderer to the browser process to notify the page has "loaded"
  </figcaption>
</figure>

## 다른 사이트 탐색

The simple navigation was complete! But what happens if a user puts different URL to address bar
again? Well, the browser process goes through the same steps to navigate to the different site.
But before it can do that, it needs to check with the currently rendered site if they care about
[`beforeunload`](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload) event.

`beforeunload` can create "Leave this site?" alert when you try to navigate away or close the tab.
Everything inside of a tab including your JavaScript code is handled by the renderer process, so
the browser process has to check with current renderer process when new navigation request comes in.

Caution: Do not add unconditional `beforeunload` handlers. It creates more latency because the
handler needs to be executed before the navigation can even be started. This event handler should
be added only when needed, for example if users need to be warned that they might lose data they've
entered on the page.

<figure>
  <img src="/web/updates/images/inside-browser/part2/beforeunload.png" alt="beforeunload event handler">
  <figcaption>
    Figure 8: IPC from the browser process to a renderer process telling it that it's about to
    navigate to a different site
  </figcaption>
</figure>

렌더러 프로세스가 탐색 과정을 초기화 하면 (사용자가 링크를 클릭하거나 클라이언트-사이드 JavaScript가 `window.location = "https://newsite.com"` 코드를 돌리는 등) 렌더러 프로세스는 우선 `beforeunload` 핸드러를 체크합니다. 이후, 브라우저 프로세스가 탐색 초기화하는 프로세스를 동일하게 진행하죠. 유일한 차이점은 렌더러 프로세스가 탐색 요청을 브라우저 프로세스에게 토스(kicked off) 한다는 것입니다.

When the new navigation is made to a different site than currently rendered one, a separate render
process is called in to handle the new navigation while current render process is kept around to
handle events like `unload`. For more, see [an overview of page lifecycle states](/web/updates/2018/07/page-lifecycle-api#overview_of_page_lifecycle_states_and_events)
and how you can hook into events with
[the Page Lifecycle API](/web/updates/2018/07/page-lifecycle-api).

<figure>
  <img src="/web/updates/images/inside-browser/part2/unload.png" alt="new navigation and unload">
  <figcaption>
    Figure 9: 2 IPCs from a browser process to a new renderer process telling to render the page
    and telling old renderer process to unload
  </figcaption>
</figure>

## In case of Service Worker

One recent change to this navigation process is the introduction of
[service worker](/web/fundamentals/primers/service-workers/). Service worker is a way to write
network proxy in your application code; allowing web developers to have more control over what to
cache locally and when to get new data from the network. If service worker is set to load the page
from the cache, there is no need to request the data from the network.

기억해야 할 중요한 점은 서비스 워커가 렌더러 프로세스에서 돌아가는 Javascript 코드라는 것입니다. 근데 탐색 요청이 들어오자마자, 사이트에 서비스 워커가 있다는 걸 브라우저가 어떻게 알 수 있을까요?

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part2/scope_lookup.png" alt="Service worker scope lookup">
  <figcaption>
    Figure 10: the network thread in the browser process looking up service worker scope
  </figcaption>
</figure>

서비스 워커가 등록되면, 서비스 워커 스코프가 레퍼런스로 취급됩니다 (스코프에 대한 자세한 내용은 [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) 글을 참조하세요). 탐색을 시작할 때, 네트워크 스레드는 등록된 서비스 워커 스코프와 도메인을 비교하여, 동일한 URL에 서비스 워커가 등록되어 있으면, UI 스레드가 해당 서비스 워커 코드를 실행하기 위해 렌더러 프로세스를 찾습니다. 서비스 워커는 데이터를 캐시에서 로드할테니, 네트워크 데이터 요청을 다 날리거나, 새로운 리소스를 요청할 겁니다.

<figure>
  <img src="/web/updates/images/inside-browser/part2/serviceworker.png" alt="serviceworker navigation">
  <figcaption>
    Figure 11: the UI thread in a browser process starting up a renderer process to handle service
    workers; a worker thread in a renderer process then requests data from the network
  </figcaption>
</figure>

## 선제 탐색(Navigation Preload)

서비스 워커가 결국 네트워크에 데이터를 요청하기로 결정한다면 브라우저 프로세스와 렌더러 프로세스간의 이런 반복 행위는 딜레이가 발생할 요인으로 보일겁니다. [Navigation Preload](/web/updates/2017/02/navigation-preload)는 서비스 워커의 시작과 동시에 리소스들을 병행 로딩하여 이 과정을 빠르게 하는 메커니즘입니다. 이런 요청들에 헤더를 표기하여, 서버가 다른 콘텐츠를 보낼 지 결정하게끔 하죠;예를 들면, 전체 문서 대신에 갱신된 내용 만 보내거나요.

<figure>
  <img src="/web/updates/images/inside-browser/part2/navpreload.png" alt="Navigation preload">
  <figcaption>
    Figure 12: the UI thread in a browser process starting up a renderer process to handle service
    worker while kicking off network request in parallel
  </figcaption>
</figure>

## 마무리

In this post, we looked at what happens during a navigation and how your web application code such
as response headers and client-side JavaScript interact with the browser. Knowing the steps browser
goes through to get data from the network makes it easier to understand why APIs like navigation
preload were developed. In the next post, we’ll dive into how the browser evaluates our
HTML/CSS/JavaScript to render pages.

재밌으셨나요? 궁금한 점이나 이어질 글에 의견이 있으시다면, 아래 코멘트란이나 트위터 [@kosamari](https://twitter.com/kosamari)로 언제든지 연락 주세요.

<a class="button button-primary gc-analytics-event attempt-right" href="/web/updates/2018/09/inside-browser-part3" data-category="InsideBrowser" data-label="Part2 / Next">
Next: Inner workings of a Renderer Process
</a>

<div class="clearfix"></div>

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
