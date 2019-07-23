project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: fundamentals, performance, app-shell #}
{# wf_featured_image: /web/updates/images/2019/02/rendering-on-the-web/icon.png #}
{# wf_featured_snippet: 애플리케이션의 어디에 로직과 렌더링을 구현해야 하는가? 서버 사이드 렌더링을 써야 할까? Rehydration은 뭐고? 답을 찾아봅시다! #}
{# wf_blink_components: N/A #}

# 웹 렌더링 {: .page-title }

{% include "web/_shared/contributors/developit.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

개발자로서 우리는 종종 애플리케이션의 전체 아키텍처에 영향을 미칠 의사 결정을 하곤 합니다. 웹 개발자가 하는 가장 핵심적인 결정 중 하나는 애플리케이션에서 로직와 렌더링을 구현하는 것입니다. 이는 생각보다 어려울 수 있습니다. 웹 사이트를 구축하는 데는 여러 가지 방법이 있으니까요.

Our understanding of this space is informed by our work in Chrome talking to
large sites over the past few years. Broadly speaking, we would encourage
developers to consider server rendering or static rendering over a full
rehydration approach.

In order to better understand the architectures we’re choosing from when we make
this decision, we need to have a solid understanding of each approach and
consistent terminology to use when speaking about them. The differences between
these approaches help illustrate the trade-offs of rendering on the web through
the lens of performance.

## 용어 {: #terminology }

**렌더링**

- **SSR:** Server-Side Rendering (서버 측 렌더링) - 클라이언트 측 또는 유니버설 앱을 서버의 HTML로 렌더링합니다.
- **CSR:** Client-Side Rendering (클라이언트 측 렌더링) - 브라우저에서 애플리케이션을 렌더링합니다. 일반적으로 DOM을 사용합니다.
- **Rehydration:** 클라이언트가 서버에서 렌더링 한 HTML의 DOM 트리와 데이터를 재사용하도록 자바 스크립트 뷰를 "부팅"합니다.
- **Prerendering:** 빌드 타임에 클라이언트 측 애플리케이션을 실행하여 초기 상태를 정적 HTML로 캡처합니다.

**성능**

- **TTFB:** Time to First Byte (첫 번째 바이트까지의 시간) - 링크를 클릭한 후 처음으로 들어오는 콘텐츠 비트 사이의 시간을 나타냅니다.
- **FP:** First Paint - 픽셀이 처음으로 사용자에게 표시되는 시점.
- **FCP:**  First Contentful Paint - the time when requested content (articlebody, etc) becomes visible.
- **TTI:**  Time To Interactive - the time at which a page becomes interactive(events wired up, etc).

## 서버 렌더링 {: #server-rendering }

*서버 렌더링은 탐색에 대한 응답으로 서버의 페이지에 대한 전체 HTML을 생성합니다. 이렇게 하면 브라우저에서 응답을 받기 전에 처리되므로 클라이언트에서 데이터 가져 오기 및 템플릿 작성에 대한 추가 왕복이 발생하지 않습니다.*

Server rendering generally produces a fast [First Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FP) and [First
Contentful Paint](https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FCP). Running page logic and rendering on the server makes it
possible to avoid sending lots of JavaScript to the client, which helps achieve
a fast [Time to Interactive](https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive) (TTI). This makes sense, since with server
rendering you’re really just sending text and links to the user’s browser. This
approach can work well for a large spectrum of device and network conditions,
and opens up interesting browser optimizations like streaming document parsing.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png" alt="Diagram showing server rendering and JS execution affecting FCP and TTI" width="350">

서버 렌더링을 사용하면 사용자는 사이트를 사용하기 전에 CPU 바인딩 JavaScript가 처리되기를 기다리지 않아도 됩니다. [서드파티 JS](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)를 부득이하게 사용해야 할 경우에도 서버 렌더링을 사용하여 자사의 [JS 비용](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)을 줄이면 나머지 "[여유](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)"을 더 많이 확보 할 수 있습니다. 그러나 이 방법에는 서버에서 페이지를 생성하는 데 시간이 걸리는 단점이 있습니다. 그 결과 TTFB([Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte)) 가 느려질 수 있습니다.

애플리케이션이 서버 렌더링만으로 충분한 지는 크게 어떤 유형의 환경을 구축 하느냐에 달려 있습니다. 서버 렌더링과 클라이언트 측 렌더링의 올바른 애플리케이션에 대한 오랜 논쟁이 있지만 일부 페이지에서는 서버 렌더링을 사용하고 다른 페이지에서는 사용하지 않아도 됨을 기억하는 것이 중요합니다. 일부 사이트에서는 하이브리드 렌더링 기술을 사용하여 성공을 거두었습니다. [Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9) 서버는 상대적으로 정적인 랜딩 페이지를 렌더링하는 반면 상호 작용이 많은 페이지는 JS를 [프리 페치](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)하여 클라이언트가 렌더링 한 무거운 페이지를 더 빠르게 로드하도록 합니다.

많은 현대 프레임워크, 라이브러리 및 아키텍처를 사용하면 클라이언트와 서버 모두에서 동일한 응용 프로그램을 렌더링 할 수 있습니다. 이러한 기술은 서버 렌더링에 사용할 수 있지만 서버***와*** 클라이언트 모두에서 렌더링이 이루어지는 아키텍처는 매우 다른 성능 특성과 절충점을 가진 자체 솔루션 클래스라는 점에 유의해야합니다. React 사용자는 [renderToString()](https://reactjs.org/docs/react-dom-server.html) 이나 서버 렌더링을 위한 [Next.js](https://nextjs.org) 와 같은 솔루션을 사용할 수 있습니다. Vue 사용자는 Vue의 [서버 렌더링 가이드](https://ssr.vuejs.org) 나 [Nuxt](https://nuxtjs.org)를 고려해 볼 수 있습니다. Angular에는 [유니버설](https://angular.io/guide/universal)이 있습니다. 대부분의 널리 사용되는 솔루션은 어떤 형태로든 hydration을 사용하기 때문에 도구를 선택하기 전에 사용법을 알아야 합니다.

## 정적 렌더링 {: #static-rendering }

[정적 렌더링](https://frontarm.com/articles/static-vs-server-rendering/)은 빌드 타임에 발생하며 빠른 First Paint, First Contentful Paint 및 Time To Interactive를 제공합니다. 클라이언트 측 JS의 양이 제한되어 있다고 가정합니다. 서버 렌더링과 달리 페이지의 HTML을 즉석에서 생성 할 필요가 없으므로 일관성있게 빠른 To First Byte를 달성 할 수 있습니다. 일반적으로 정적 렌더링은 미리 각 URL에 대해 별도의 HTML 파일을 생성하는 것을 의미합니다. HTML 응답을 미리 생성하면 정적 렌더링을 여러 CDN에 배포하여 에지 캐싱을 활용할 수 있습니다.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png" alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

정적 렌더링을 위한 솔루션은 어떤 모양도 형태도 될 수 있습니다. [Gatsby](https://www.gatsbyjs.org) 같은 도구는 개발자가 응용 프로그램을 빌드 단계로 생성하는 대신 동적으로 렌더링하는 것처럼 느낄 수 있도록 설계되었습니다. [Jekyl](https://jekyllrb.com) 이나 [Metalsmith](https://metalsmith.io)는 정적인 성질을 이용하여 좀 더 템플릿 중심의 접근 방식을 제공합니다.

One of the downsides to static rendering is that individual HTML files must be
generated for every possible URL. This can be challenging or even infeasible
when you can't predict what those URLs will be ahead of time, or for sites with
a large number of unique pages.

React users may be familiar with [Gatsby](https://www.gatsbyjs.org), [Next.js static export](https://nextjs.org/learn/excel/static-html-export/) or [Navi](https://frontarm.com/navi/) -
all of these make it convenient to author using components. However, it’s
important to understand the difference between static rendering and
prerendering:  static rendered pages are interactive without the need to execute
much client-side JS, whereas prerendering improves the First Paint or First
Contentful Paint of a Single Page Application that must be booted on the client
in order for pages to be truly interactive.

If you’re unsure whether a given solution is static rendering or prerendering,
try this test:  disable JavaScript and load the created web pages.  For
statically rendered pages, most of the functionality will still exist without
JavaScript enabled.  For prerendered pages, there may still be some basic
functionality like links, but most of the page will be inert.

Another useful test is to slow your network down using Chrome DevTools, and
observe how much JavaScript has been downloaded before a page becomes
interactive. Prerendering generally requires more JavaScript to get interactive,
and that JavaScript tends to be more complex than the [Progressive Enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement)
approach used by static rendering.

## 서버 렌더링 대 정적 렌더링 {: #server-vs-static }

Server rendering is not a silver bullet - its dynamic nature can come with
[significant compute overhead](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9) costs. Many server rendering solutions don't
flush early, can delay TTFB or double the data being sent (e.g. inlined state
used by JS on the client). In React, renderToString() can be slow as it's
synchronous and single-threaded. Getting server rendering "right" can involve
finding or building a solution for [component caching](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1), managing memory
consumption, applying [memoization](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization) techniques, and many other concerns. You're
generally processing/rebuilding the same application multiple times - once on
the client and once in the server. Just because server rendering can make
something show up sooner doesn't suddenly mean you have less work to do.

Server rendering produces HTML on-demand for each URL but can be slower than
just serving static rendered content. If you can put in the additional leg-work,
server rendering + [HTML caching](https://freecontent.manning.com/caching-in-react/) can massively reduce server render time. The
upside to server rendering is the ability to pull more "live" data and respond
to a more complete set of requests than is possible with static rendering. Pages
requiring personalization are a concrete example of the type of request that
would not work well with static rendering.

서버 렌더링으로 [PWA](https://developers.google.com/web/progressive-web-apps/)를 구축 할 때 흥미로운 결정을 내려야 합니다. 전체 페이지 [서비스 워커](https://developers.google.com/web/fundamentals/primers/service-workers/) 캐싱을 사용하는게 나을까요? 개별 콘텐츠를 서버 렌더링하는 것이 더 나을까요?

## 클라이언트 측 렌더링 (CSR) {: #csr }

*Client-side rendering (CSR) means rendering pages directly in the browser using
JavaScript. All logic, data fetching, templating and routing are handled on the
client rather than the server.*

Client-side rendering can be difficult to get and keep fast for mobile. It can
approach the performance of pure server-rendering if doing minimal work, keeping
a [tight JavaScript budget](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144) and delivering value in as few [RTTs](https://en.wikipedia.org/wiki/Round-trip_delay_time) as possible.
Critical scripts and data can be delivered sooner using [HTTP/2 Server Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) or
`<link rel=preload>`, which gets the parser working for you sooner. Patterns
like [PRPL](https://developers.google.com/web/fundamentals/performance/prpl-pattern/) are worth evaluating in order to ensure initial and subsequent
navigations feel instant.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png" alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

The primary downside to Client-Side Rendering is that the amount of JavaScript
required tends to grow as an application grows. This becomes especially
difficult with the addition of new JavaScript libraries, polyfills and
third-party code, which compete for processing power and must often be processed
before a page’s content can be rendered. Experiences built with CSR that rely on
large JavaScript bundles should consider [aggressive code-splitting](https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/), and be
sure to lazy-load JavaScript - "serve only what you need, when you need it". For
experiences with little or no interactivity, server rendering can represent a
more scalable solution to these issues.

단일 페이지 애플리케이션을 작성하는 사람들은 대부분의 페이지에서 공유되는 사용자 인터페이스의 핵심 부분을 식별함으로써 [애플리케이션 쉘 캐싱](https://developers.google.com/web/updates/2015/11/app-shell) 기술을 적용 할 수 있음을 의미합니다. 서비스 워커와 합께 사용하면 두 번째 이후의  방문시인지 성능를 획기적으로 향상시킬 수 있습니다.

## Rehydration을 통한 서버 렌더링과 CSR 결합 {: #rehydration }

Often referred to as Universal Rendering or simply “SSR”, this approach attempts
to smooth over the trade-offs between Client-Side Rendering and Server Rendering
by doing both. Navigation requests like full page loads or reloads are handled
by a server that renders the application to HTML, then the JavaScript and data
used for rendering is embedded into the resulting document. When implemented
carefully, this achieves a fast First Contentful Paint just like Server
Rendering, then “picks up” by rendering again on the client using a technique
called [(re)hydration](https://docs.electrode.io/guides/general/server-side-data-hydration). This is a novel solution, but it can have some
considerable performance drawbacks.

The primary downside of SSR with rehydration is that it can have a significant
negative impact on Time To Interactive, even if it improves First Paint. SSR’d
pages often look deceptively loaded and interactive, but can’t actually respond
to input until the client-side JS is executed and event handlers have been
attached. This can take seconds or even minutes on mobile.

페이지 로드가 완료된 것처럼 보이지만, 일정 시간동안 클릭하거나 두드려도 반응이 없는 경우를 직접 경험해보았을 수도 있습니다. 이것은 빠르게 실망으로 변합니다. *"왜 아무 일도 일어나지 않죠? 왜 스크롤 할 수 없죠?"*

### A Rehydration Problem: One App for the Price of Two {: #rehydration-issues }

Rehydration 문제는 JS로 인해 지연되는 상호 작용보다 더 나쁠 수 있습니다. 서버가 HTML을 렌더링하는 데 사용한 모든 데이터를 다시 요청하지 않고도 클라이언트 측 JavaScript가 정확하게 "픽업"할 수 있도록 하기 위해 현재의 SSR 솔루션은 일반적으로 UI의 응답을 직렬화합니다. 데이터를 스크립트 태그로 문서에 종속시킵니다. 결과 HTML 문서에는 다음과 같은 높은 수준의 복제가 포함됩니다.

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

As you can see, the server is returning a description of the application’s UI in
response to a navigation request, but it’s also returning the source data used
to compose that UI, and a complete copy of the UI’s implementation which then
boots up on the client. Only after bundle.js has finished loading and executing
does this UI become interactive.

SSR Rehydration를 사용하여 실제 웹 사이트에서 수집한 성능 메트릭은 그 사용이 심하게 실망스러움을 나타냅니다. 궁극적으로 그 이유는 사용자 경험에 달려 있습니다. 사용자를 "기괴한 계곡"에 남겨 두는 것은 매우 쉽습니다.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png" alt="Diagram showing client rendering negatively affecting TTI" width="600">

There’s hope for SSR with rehydration, though. In the short term, only using SSR
for highly cacheable content can reduce the TTFB delay, producing similar
results to prerendering. Rehydrating [incrementally](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html), progressively, or
partially may be the key to making this technique more viable in the future.

## 스트리밍 서버 렌더링 및 점진적인 Rehydration {: #progressive-rehydration }

Server rendering has had a number of developments over the last few years.

[스트리밍 서버 렌더링](https://zeit.co/blog/streaming-server-rendering-at-spectrum)을 사용하면 브라우저가 받은대로 점진적으로 렌더링 할 수 있는 청크로 HTML을 보낼 수 있습니다. 이것은 마크업이 사용자에게 더 빨리 도착할 때 빠른 First Paint와 First Contentful Paint를 제공 할 수 있습니다. React에서 [renderToNodeStream()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) 에서 비동기인 스트림은 동기 renderToString과 비교하여 유속이 빠르다는 것을 의미합니다.

점진적인 Rehydration 또한 주목할 가치가 있으며, React가 [탐구](https://github.com/facebook/react/pull/14717) 해온 것입니다. 이 방법을 사용하면 서버 렌더링 애플리케이션의 개별 부분이 전체 응용 프로그램을 한꺼번에 초기화하는 현재의 일반적인 방식보다는 시간이 지남에 따라 "부팅"됩니다. 이렇게 하면 페이지를 대화식으로 만드는 데 필요한 JavaScript의 양을 줄이는 데 도움이됩니다. 페이지의 우선 순위가 낮은 부분의 클라이언트 측 업그레이드를 지연하여 주 스레드를 차단하지 못하게 할 수 있기 때문입니다. 또한 서버 렌더링 된 DOM 트리가 손상되어 즉시 재구축되는 가장 일반적인 SSR Rehydration 함정 중 하나를 피하는 데 도움이 될 수 있습니다. 이 함정은 대부분의 경우 클라이언트 측 렌더링에서 필요한 초기 데이터가 준비 되지 않았기 때문에 발생합니다. 아마 Promise 해결을 await하고 있겠죠.

### 부분 Rehydration {: #partial-rehydration }

Partial rehydration has proven difficult to implement. This approach is an
extension of the idea of progressive rehydration, where the individual pieces
(components / views / trees) to be progressively rehydrated are analyzed and
those with little interactivity or no reactivity are identified. For each of
these mostly-static parts, the corresponding JavaScript code is then transformed
into inert references and decorative functionality, reducing their client-side
footprint to near-zero.
The partial hydration approach comes with its own issues and compromises. It
poses some interesting challenges for caching, and client-side navigation means
we can't assume server-rendered HTML for inert parts of the application will be
available without a full page load.

### 삼자형 렌더링 {: #trisomorphic }

If [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) are an option for you, “trisomorphic” rendering may also be
of interest. It's a technique where you can use streaming server rendering for
initial/non-JS navigations, and then have your service worker take on rendering
of HTML for navigations after it has been installed. This can keep cached
components and templates up to date and enables SPA-style navigations for
rendering new views in the same session. This approach works best when you can
share the same templating and routing code between the server, client page, and
service worker.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png" alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## 검색 엔진 최적화 고려 {: #seo}

웹 렌더링 전략을 선택할 때 보통 SEO 영향을 고려합니다. 크롤러가 쉽게 해석할 수있는 "완성된" 경험을 제공하기 위해 서버 렌더링이 종종 선택됩니다. 크롤러는 [JavaScript를 해석할 수도](https://web.dev/discoverable/how-search-works) 있지만 여기에는 알아둘만한 [제한 사항](/search/docs/guides/rendering)이 있습니다. 그것은 클라이언트 측 렌더링은 작동하지만 추가 테스트 및 여타 작업(leg work)이 없을 수 있다는 것 입니다. 최근에 [동적 렌더링](/search/docs/guides/dynamic-rendering)은 아키텍처가 클라이언트 측 JavaScript에 크게 의존하는 경우 고려할 가치가 있는 옵션이 되었습니다.

When in doubt, the
[Mobile Friendly Test](https://search.google.com/test/mobile-friendly) tool is
invaluable for testing that your chosen approach does what you're hoping for.
It shows a visual preview of how any page appears to Google's crawler, the
serialized HTML content found (after JavaScript executed), and any errors
encountered during rendering.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png" alt="Screenshot of the Mobile Friendly Test UI">

## 마치며... {: #wrapup }

렌더링에 대한 접근 방식을 결정할 때 병목 현상을 측정하고 이해하세요. 정적 렌더링 또는 서버 렌더링이 그 중 90%를 얻을 수 있는지 여부를 고려하십시오. 인터랙티브 경험을 제공하기 위해 최소화된 JS로 HTML을 전송해도 괜찮습니다. 다음 유용한 인포그래픽은 서버 - 클라이언트 스펙트럼을 보여줍니다.

<img src="../../images/2019/02/rendering-on-the-web/infographic.png" alt="Infographic showing the spectrum of options described in this article">

## 크레딧 {: #credits }

리뷰와 영감을 주신 모든 분들께 감사합니다.

Jeffrey Posnick,
Houssein Djirdeh,
Shubhie Panicker,
Chris Harrelson, and
Sebastian Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
