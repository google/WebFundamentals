project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서비스 워커 구현을 통해 최고의 성능을 누려보세요.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# 고성능 서비스 워커 로딩 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[서비스
워커](/web/fundamentals/getting-started/primers/service-workers)를 웹 앱에 추가하면
[기존의 브라우저 캐싱 모범
사례](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)를 모두 따를 때
가능한 것보다 상당한 성능 이점을 얻을 수 있습니다.
그러나 로드
시간을 최적화하는 데 지켜야 할 모범 사례에는 여러 가지가 있습니다. 다음의 팁은
서비스 워커 구현을 통해 최고의 성능을 얻을 수 있도록 도와줍니다.

## 우선, 탐색 요청은 무엇입니까?

탐색 요청은 [가져오기
사양](https://fetch.spec.whatwg.org/#navigation-request)에서 (간략하게) 다음과 같이 정의되어 있습니다. <em>탐색
[요청](https://fetch.spec.whatwg.org/#concept-request)은
[수신지](https://fetch.spec.whatwg.org/#concept-request-destination)가
"<code>document</code>"인
요청입니다.</em> 기술적으로는 맞지만, 이 정의에는
뉘앙스가 부족하며, 웹 앱의 성능 탐색의
중요성을 과소평가합니다. 쉬운 말로 하면, 탐색 요청은 브라우저 위치 바에 URL을 입력할 때 혹은
<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code>과 상호작용하거나,
웹페이지의 링크에서
다른 웹페이지를 방문할 때마다 발생합니다. 페이지에 `<iframe>`을
배치해도 `<iframe>`의 `src`에 대한 탐색 요청으로 이어집니다.

참고: [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
및 제자리 DOM 수정에 의존하는 [단일 페이지 애플리케이션](https://en.wikipedia.org/wiki/Single-page_application)은 뷰에서 뷰로 전환할 때
탐색 요청을
회피하는 경향이 있습니다. 그러나 단일 페이지 앱에
대한 브라우저 세션의 초기 요청은 여전히 탐색입니다.

웹 앱이 여러 다른 [하위 리소스를
요청](https://fetch.spec.whatwg.org/#subresource-request)하여 모든 콘텐츠(스크립트, 이미지, 스타일과 같은 요소)를 표시하려 할 수는 있지만, 다른 모든
요청을 시작하는 것은
탐색 요청 내 HTML의
몫입니다. 초기 탐색 요청에 대한 지연이 발생하면 이는 모두 사용자에게
너무나 명백하게 드러납니다. 사용자가 기약도 없이 빈 화면만
응시해야 하기 때문입니다.

참고: [HTTP/2 서버 푸시](/web/fundamentals/performance/http2/#server_push)는
탐색 응답과 더불어 추가적인 지연 시간 없이 하위 리소스 응답을 반환하므로 여기에 새로운 측면을
가져옵니다. 그러나 원격 서버에 대한
연결 구축의 지연은 클라이언트에게 전송되는 데이터의 지연으로도
이어집니다.

서비스 워커가
아닌 HTTP `Cache-Control` 헤더에 의존하는 유형의 기존의 [캐싱
모범 사례](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page)는
모든 하위 리소스 URL이 최신 상태가 되도록 [각 탐색마다
네트워크로의 이동](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses)을
요구합니다. 웹 성능이 추구하는 바는
공격적으로 캐시된 하위 리소스의 모든 이점을 네트워크 종속적인 탐색 요청의 필요
*없이* 누리는 것입니다. 이제 사이트의 특정 아키텍처에 맞는 서비스 워커를
적절하게 구성하여 사용하면
이룰 수 있습니다.

## 최고의 성능을 위해 탐색에 대한 네트워크 우회

서비스 워커를 웹 애플리케이션에 추가하는 것의 가장 큰 영향은
네트워크상에서 기다릴 필요 없이 탐색 요청에 응답하는 것에서 시작됩니다. 웹 서버에 연결의
가장 좋은 상황에서도 로컬에 캐시된 데이터를 읽는 데
걸리는 시간보다 한참 더 오래 소요될 수 있습니다. 클라이언트의
연결이 이상적이지 못한
이러한 경우(즉, 대부분의 모바일
네트워크 연결), 네트워크에서 데이터의 첫 바이트를 가져오는 데 걸리는 시간은 전체 HTML을 렌더링하는 데
걸리는 총 시간을 넘어섭니다.

올바른 캐시 우선 서비스 워커 구현을 선택하는 것은 사이트
아키텍처에 크게 좌우됩니다.

### 혼합 응답 스트리밍

HTML을 정적 헤더
및 푸터, 요청 URL에 따른 다양한 중간 부분으로
자연스럽게 작은 조각으로 나눌 수 있다면, 스트림된 응답을 이용하여 탐색을 처리하는 것이 이상적입니다. 개별적으로 캐시된 각각의 조각에서
응답을 구성할 수 있습니다. 스트림을
이용하면 응답의 초기 부분이
클라이언트에 가능한 한 빠르게 노출될 수 있으므로 HTML 파싱을 유리하게 시작할 수 있으며,
추가 하위 리소스 요청을 만들 수 있습니다.

"[즉각적인 응답을 위한 나만의 방식 스트림](/web/updates/2016/06/sw-readablestreams)"
문서는 이러한 접근 방식에 대한 기본적인 개요를 제공하며, 실질적인 사례와
데모에 대해서는 Jake Archibald의 "[2016 - the year of web streams](https://jakearchibald.com/2016/streams-ftw/)"가 완벽한
가이드입니다.

참고: 일부 웹 앱의 경우, 탐색 요청에
응답할 때 네트워크 회피가 없습니다. 사이트의 각 URL의 HTML은 콘텐츠 관리 시스템의 데이터에
따라 다르거나, 사이트가 다양한 레이아웃을 사용하고 일반적인
애플리케이션 셸 구조에 맞지 않기 때문일 수 있습니다. 서비스 워커는
HTML 로딩의 *현상*에 대한 향상의 기회를 여전히 열어두고 있습니다.
스트림을 사용하면 탐색 요청에
일반적인 캐시된 HTML 덩어리(사이트의 전체 `<head>` 및 일부 초기
`<body>` 요소)로 즉시 응답하면서도 주어진
URL에 대한 나머지 HTML을 네트워크에서 로딩할 수 있습니다.

### 정적 HTML 캐싱

정적 HTML
문서에 완전히 의존하는 단순한 웹 앱을 보유하고 있다면, 행운입니다. 네트워크 회피 경로가
단순하기 때문입니다. 이전에 캐시된 HTML으로
탐색에 응답하고, 사이트의 변화에 따라 HTML을 최신으로
유지하는 비차단 논리를 포함하는 서비스 워커가 필요합니다.

서비스 워커 `fetch` 핸들러를 사용하는 한 가지 접근 방식은 탐색 요청에 대해 다음과 같이
[stale-while-revalidate 정책](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)을
구현하는 것입니다.

```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional: Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

다른 접근 방식은 [Workbox](https://workboxjs.org/)와 같은 도구를 이용하는 것입니다. 이 도구는
웹 앱의 빌드 절차에 들어가 모든 정적 리소스(HTML 문서에 한정되지 않음)의 캐싱을 처리하는 서비스 워커를 생성하여 캐시 우선을
제공하고 최신 상태로
유지합니다.

### 애플리케이션 셸 사용

기존의 단일 페이지 애플리케이션이 있다면,
[애플리케이션 셸 아키텍처](/web/fundamentals/architecture/app-shell)를
바로 구현할 수 있습니다. 네트워크에 의존하지 않고 탐색 요청을 처리하는 명쾌한 전략이 있습니다.
각 탐색 요청은 특정 URL과 관계 없이 HTML 문서의 캐시된 일반
'셸' 사본으로
해결됩니다. 이 셸은 단일 페이지 애플리케이션의 부트스트랩에 필요한 모든 것을 포함하며,
클라이언트측 라우팅 논리는
요청의 URL에 특정한 콘텐츠를 렌더링합니다.

직접 작성한 해당 서비스 워커 `fetch` 핸들러는 다음과
같습니다.

```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

[Workbox](https://workboxjs.org/)도
`app-shell.html`를 캐시하고 최신 상태로 유지하며
[헬퍼](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)가
캐시된 셸로 탐색 요청에 응답하도록 하는 두 가지 방법으로 도움을 줄 수 있습니다.

## ⚠️ 성능 실수

캐시된 데이터를 사용하여 탐색에 응답할 수 없지만 다른
기능([오프라인 폴백 콘텐츠](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)
또는 [푸시 알림 처리](/web/fundamentals/getting-started/codelabs/push-notifications/))에 서비스
워커가 필요하다면
곤란한 상황에 놓인 것입니다. 특정 예방 조치를
취하지 않으면 서비스 워커를 추가할 때 성능 문제를 일으키게 될 수 있습니다.
하지만 이러한 실수를 잘 피한다면 걱정이 없습니다.

### '패스스루' 가져오기 핸들러 사용 금지

서비스 워커를 푸시 알림용으로만 사용한다면,
다음 내용이 필수적이거나
작동하지 않음(No-op)으로만 취급된다고 착각할 수 있습니다.

```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

이러한 유형의 '패스스루' 가져오기 핸들러는 교묘합니다.
웹 애플리케이션에서는 모든 것이 계속 작동하지만 네트워크 요청이 이루어질 때마다 사소한
지연 시간이 발생하게 되기 때문입니다. 서비스 워커가 이미 실행 중이 아닌 경우,
이를 실행할 때 오버헤드가 발생합니다.
그리고 서비스 워커에서 요청을 보낸
클라이언트로의 응답 전달에도 오버헤드가 있습니다.

서비스 워커가 `fetch` 핸들러를 전혀
포함하고 있지 않다면, 일부 브라우저는
이를 감지하고, 네트워크
요청이 있을 때마다 [서비스 워커를 시작하는 수고를 들이지 않습니다](https://github.com/w3c/ServiceWorker/issues/718).

### 적절한 경우에는 탐색 미리 로드 사용

특정 하위 리소스를 위한 캐싱
전략에 사용하기 위해 `fetch` 핸들러가 *필요*하지만, 아키텍처로 인해 탐색 요청에 응답하는 것이
불가능한 상황이 있습니다. 또는, 탐색 요청에
캐시된 데이터를 사용해도 되지만 페이지가 로드된 후
새로운 데이터로 스왑하기 위해 여전히 네트워크 요청이 필요할 수 있습니다.

[탐색 미리 로드](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)로
알려진 기능이
두 가지 사용 사례 모두에 적합합니다. 탐색에 응답하지 않는
서비스 워커가 발생시킬 수 있는 지연을 완화할 수 있습니다. 또한, 새로운 데이터를 위한
'대역 외' 요청에도 사용할 수 있습니다. 그러면
페이지가 로드된 후 클라이언트측 코드에 사용됩니다. "[탐색 미리 로드로 서비스 워커 속도 내기](/web/updates/2017/02/navigation-preload)"
문서에는 서비스
워커를 적절하게 구성하는 데 필요한 모든 세부 내용이
담겨 있습니다.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
