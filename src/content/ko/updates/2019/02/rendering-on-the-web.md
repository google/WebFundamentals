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

이 영역에 대한 우리의 이해도는 지난 몇 년 동안 Chrome에서 대형 사이트들을 상담하며 깊어졌습니다. 대체로 말하자면 개발자는 전체 rehydration 접근 방식을 통해 서버 렌더링이나 정적 렌더링을 고려하도록 권장합니다.

이러한 결정을 내릴 때 우리가 선택한 아키텍처를 더 잘 이해하기 위해서는 각 접근법에 대해 확실하게 이해하고 그에 대한 이야기를 할 때 일관된 용어를 사용해야 합니다. 이러한 접근 방식의 차이점은 성능 향상 렌즈를 통한 웹 렌더링 렌더링의 절충을 설명하는 데 도움이 됩니다.

## 용어 {: #terminology }

**렌더링**

- **SSR:** Server-Side Rendering (서버 측 렌더링) - 클라이언트 측 또는 유니버설 앱을 서버의 HTML로 렌더링합니다.
- **CSR:** Client-Side Rendering (클라이언트 측 렌더링) - 브라우저에서 애플리케이션을 렌더링합니다. 일반적으로 DOM을 사용합니다.
- **Rehydration:** 클라이언트가 서버에서 렌더링 한 HTML의 DOM 트리와 데이터를 재사용하도록 자바 스크립트 뷰를 "부팅"합니다.
- **Prerendering:** 빌드 타임에 클라이언트 측 애플리케이션을 실행하여 초기 상태를 정적 HTML로 캡처합니다.

**성능**

- **TTFB:** Time to First Byte (첫 번째 바이트까지의 시간) - 링크를 클릭한 후 처음으로 들어오는 콘텐츠 비트 사이의 시간을 나타냅니다.
- **FP:** First Paint - 픽셀이 처음으로 사용자에게 표시되는 시점.
- **FCP:**  First Contentful Paint - 요청 콘텐츠(기사 본문 등)가 표시되는 시점
- **TTI:** Time To Interactive - 페이지가 상호작용 가능하게 될 때까지의 시간 (이벤트 발생 등).

## 서버 렌더링 {: #server-rendering }

*서버 렌더링은 탐색에 대한 응답으로 서버의 페이지에 대한 전체 HTML을 생성합니다. 이렇게 하면 브라우저에서 응답을 받기 전에 처리되므로 클라이언트에서 데이터 가져 오기 및 템플릿 작성에 대한 추가 왕복이 발생하지 않습니다.*

서버 렌더링은 일반적으로 빠른 [First Paint](/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FP) 및 [First Contentful Paint](/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint) (FCP)를 생성합니다. 서버에서 페이지 로직 및 렌더링을 실행하면 많은 JavaScript를 클라이언트에 보내지 않아도 되므로 TTI ([Time to Interactive](/web/tools/lighthouse/audits/time-to-interactive)) 를 빠르게 수행 할 수 있습니다. 이것은 서버 렌더링을 통해 실제로 사용자의 브라우저에 텍스트와 링크를 보내는 것이기 때문에 의미가 있습니다. 이 접근법은 다양한 범위의 장치 및 네트워크 조건에서 잘 동작하며 스트리밍 문서 구문 분석과 같은 흥미로운 브라우저 최적화를 가능성을 열어줍니다.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png" alt="Diagram showing server rendering and JS execution affecting FCP and TTI" width="350">

서버 렌더링을 사용하면 사용자는 사이트를 사용하기 전에 CPU 바인딩 JavaScript가 처리되기를 기다리지 않아도 됩니다. [서드파티 JS](/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/)를 부득이하게 사용해야 할 경우에도 서버 렌더링을 사용하여 자사의 [JS 비용](https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4)을 줄이면 나머지 "[여유](https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3)"을 더 많이 확보 할 수 있습니다. 그러나 이 방법에는 서버에서 페이지를 생성하는 데 시간이 걸리는 단점이 있습니다. 그 결과 TTFB([Time to First Byte](https://en.wikipedia.org/wiki/Time_to_first_byte)) 가 느려질 수 있습니다.

애플리케이션이 서버 렌더링만으로 충분한 지는 크게 어떤 유형의 환경을 구축 하느냐에 달려 있습니다. 서버 렌더링과 클라이언트 측 렌더링의 올바른 애플리케이션에 대한 오랜 논쟁이 있지만 일부 페이지에서는 서버 렌더링을 사용하고 다른 페이지에서는 사용하지 않아도 됨을 기억하는 것이 중요합니다. 일부 사이트에서는 하이브리드 렌더링 기술을 사용하여 성공을 거두었습니다. [Netflix](https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9) 서버는 상대적으로 정적인 랜딩 페이지를 렌더링하는 반면 상호 작용이 많은 페이지는 JS를 [프리 페치](https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285)하여 클라이언트가 렌더링 한 무거운 페이지를 더 빠르게 로드하도록 합니다.

많은 현대 프레임워크, 라이브러리 및 아키텍처를 사용하면 클라이언트와 서버 모두에서 동일한 응용 프로그램을 렌더링 할 수 있습니다. 이러한 기술은 서버 렌더링에 사용할 수 있지만 서버***와*** 클라이언트 모두에서 렌더링이 이루어지는 아키텍처는 매우 다른 성능 특성과 절충점을 가진 자체 솔루션 클래스라는 점에 유의해야합니다. React 사용자는 [renderToString()](https://reactjs.org/docs/react-dom-server.html) 이나 서버 렌더링을 위한 [Next.js](https://nextjs.org) 와 같은 솔루션을 사용할 수 있습니다. Vue 사용자는 Vue의 [서버 렌더링 가이드](https://ssr.vuejs.org) 나 [Nuxt](https://nuxtjs.org)를 고려해 볼 수 있습니다. Angular에는 [유니버설](https://angular.io/guide/universal)이 있습니다. 대부분의 널리 사용되는 솔루션은 어떤 형태로든 hydration을 사용하기 때문에 도구를 선택하기 전에 사용법을 알아야 합니다.

## 정적 렌더링 {: #static-rendering }

[정적 렌더링](https://frontarm.com/articles/static-vs-server-rendering/)은 빌드 타임에 발생하며 빠른 First Paint, First Contentful Paint 및 Time To Interactive를 제공합니다. 클라이언트 측 JS의 양이 제한되어 있다고 가정합니다. 서버 렌더링과 달리 페이지의 HTML을 즉석에서 생성 할 필요가 없으므로 일관성있게 빠른 To First Byte를 달성 할 수 있습니다. 일반적으로 정적 렌더링은 미리 각 URL에 대해 별도의 HTML 파일을 생성하는 것을 의미합니다. HTML 응답을 미리 생성하면 정적 렌더링을 여러 CDN에 배포하여 에지 캐싱을 활용할 수 있습니다.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png" alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

정적 렌더링을 위한 솔루션은 어떤 모양도 형태도 될 수 있습니다. [Gatsby](https://www.gatsbyjs.org) 같은 도구는 개발자가 응용 프로그램을 빌드 단계로 생성하는 대신 동적으로 렌더링하는 것처럼 느낄 수 있도록 설계되었습니다. [Jekyl](https://jekyllrb.com) 이나 [Metalsmith](https://metalsmith.io)는 정적인 성질을 이용하여 좀 더 템플릿 중심의 접근 방식을 제공합니다.

정적 렌더링의 단점 중 하나는 가능한 모든 URL에 대해 개별 HTML 파일을 생성해야한다는 것입니다. 이러한 URL을 미리 예측할 수 없거나 독창적인 페이지가 많아 사이트의 URL을 예측할 수 없으면 어렵거나 실행이 불가능할 수도 있습니다.

React 사용자는 [Gatsby](https://www.gatsbyjs.org), [Next.js 정적 내보내기](https://nextjs.org/learn/excel/static-html-export/), [Navi](https://frontarm.com/navi/)에 익숙 할 수 있습니다. 전부 컴포넌트를 사용하여 편리하게 작성할수 있지만, 정적 렌더링과 사전 렌더링의 차이점을 이해하는 것은 중요합니다. 정적 렌더링 페이지는 많은 클라이언트 측 JS를 실행하지 않고도 상호 작용할 수 있지만 사전 렌더링은 단일 페이지 애플리케이션의 First Paint 나 First Contentful Paint를 향상시켜도 페이지의 인터렉션을 이용하려면 클라이언트에서의 부팅 과정이 필요합니다.

주어진 솔루션이 정적 렌더링인지 사전 렌더링인지 알 수 없다면 테스트를 해보세요. JavaScript를 비활성화하고 생성된 웹 페이지를 불러오세요. 정적으로 렌더링 된 페이지의 경우 대부분의 기능은 JavaScript가 활성화되지 않아도 계속 존재합니다. 사전 렌더링된 페이지는 링크와 같은 몇 가지 기본 기능이 동작하지만, 페이지의 대부분은 동작하지 않을 겁니다.

또 다른 유용한 테스트는 Chrome DevTools를 사용하여 네트워크 속도를 줄이고 페이지가 인터렉션을 이용 가능해지기 전에 얼마나 많은 JavaScript가 다운로드되었는지 관찰하는 것입니다. 사전 렌더링은 대개 인터렉션을 사용하기 위해 더 많은 JavaScript가 필요하며 JavaScript는 정적 렌더링에서 사용되는 [점진적 향상](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) 접근 방식보다 복잡합니다.

## 서버 렌더링 대 정적 렌더링 {: #server-vs-static }

서버 렌더링은 만능이 아니며 동적으로 계산하는 특성으로 [인해 상당한 계산 오버 헤드가](https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9) 발생할 수 있습니다. 많은 서버 렌더링 솔루션은 일찍 플러시되지 않고 TTFB를 지연 시키거나 전송되는 데이터를 두 배로 늘릴 수 있습니다 (예 : 클라이언트에서 JS가 사용하는 인라인 상태). React에서 renderToString()은 동기로 동작하는 단일 스레드이므로 느려질 수 있습니다. 서버 렌더링을 "올바르게" 수행 [하려면 구성 요소 캐싱](https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1) , 메모리 소비 관리, [메모화](https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization) 기법 적용 및 기타 여러 가지 문제에 대한 솔루션을 찾거나 구축해야 합니다. 일반적으로 클라이언트에서 한 번, 서버에서 한 번 같은 응용 프로그램을 여러 번 처리 / 다시 작성합니다. 서버 렌더링으로 인해 무언가를 더 빨리 보여줄 수 있다고 해서 갑자기 할 일이 적어지지는 않습니다.

서버 렌더링은 각 URL마다 맞춤형 HTML을 생성하지만 정적 렌더링 된 콘텐츠를 제공하는 것보다 느릴 수 있습니다. 추가 작업을 할 수 있으면 서버 렌더링 + [HTML 캐싱](https://freecontent.manning.com/caching-in-react/) 을 통해 서버 렌더링 시간을 크게 줄일 수 있습니다. 서버 렌더링의 장점은 정적 렌더링에서 가능한 것보다 더 많은 "실시간" 데이터를 가져와서 보다 완전한 요청 집합에 응답 할 수 있다는 것입니다. 개인정보가 필요한 페이지는 정적 렌더링에서 제대로 작동하지 않는 요청 유형의 구체적인 예입니다.

서버 렌더링으로 [PWA](/web/progressive-web-apps/)를 구축 할 때 흥미로운 결정을 내려야 합니다. 전체 페이지 [서비스 워커](/web/fundamentals/primers/service-workers/) 캐싱을 사용하는게 나을까요? 개별 콘텐츠를 서버 렌더링하는 것이 더 나을까요?

## 클라이언트 측 렌더링 (CSR) {: #csr }

*클라이언트 측 렌더링 (CSR)은 JavaScript를 사용하여 브라우저에서 페이지를 직접 렌더링하는 것을 의미합니다. 모든 로직, 데이터 가져오기, 템플릿 및 라우팅은 서버가 아닌 클라이언트에서 처리됩니다.*

클라이언트 측 렌더링은 모바일에서 구현하기 어려울 수 있습니다. 최소한의 작업만 수행하여 [JavaScript 자원 소모](https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144)를 최소화하고 최대한 적은 수의 [RTT](https://en.wikipedia.org/wiki/Round-trip_delay_time) 로 가치를 전달하면 순수한 서버 렌더링 성능에 접근할 수 있습니다. 중요한 스크립트와 데이터는 [HTTP/2 Server Push](https://www.smashingmagazine.com/2017/04/guide-http2-server-push/) 또는 `<link rel=preload>` 사용하여 더 빨리 전달할 수 있습니다. 이렇게 하면 파서가 더 빨리 작동합니다. [PRPL](/web/fundamentals/performance/prpl-pattern/)과 같은 패턴은 초기 및 순차 탐색이 즉각적으로 느껴지도록 평가할 가치가 있습니다.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png" alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

클라이언트 측 렌더링의 주된 단점은 응용 프로그램이 커짐에 따라 필요한 JavaScript의 양이 증가하는 경향이 있다는 것입니다. 특히 처리 능력을 놓고 경쟁하는 새로운 JavaScript 라이브러리, 폴리필 (polyfill) 및 서드파티 코드를 추가하면 페이지의 내용을 렌더링하기 전에 처리해야하는 경우가 종종 있습니다. 대규모 자바 스크립트 번들에 의존하는 CSR을 기반으로 구축된 경험은 [적극적인 코드 분할](/web/fundamentals/performance/optimizing-javascript/code-splitting/)을 고려해야하며 JavaScript를 "필요한 것만 필요할 때만 제공"해야 합니다. 인터렉션이 거의 없거나 전혀없는 경험의 경우, 서버 렌더링은 이러한 문제에 대해 보다 확장 가능한 솔루션일 수 있습니다.

단일 페이지 애플리케이션을 작성하는 사람들은 대부분의 페이지에서 공유되는 사용자 인터페이스의 핵심 부분을 식별함으로써 [애플리케이션 쉘 캐싱](/web/updates/2015/11/app-shell) 기술을 적용 할 수 있음을 의미합니다. 서비스 워커와 합께 사용하면 두 번째 이후의  방문시인지 성능를 획기적으로 향상시킬 수 있습니다.

## Rehydration을 통한 서버 렌더링과 CSR 결합 {: #rehydration }

유니버설 렌더링 또는 간단히 "SSR"이라고도 하는 이 접근 방식은 클라이언트 측 렌더링과 서버 렌더링 간의 절충을 원활하게 하려고 시도합니다. 전체 페이지 로드 또는 리로드와 같은 네비게이션 요청은 애플리케이션을 HTML로 렌더링하는 서버에서 처리 한 다음 렌더링에 사용된 JavaScript 및 데이터가 결과 문서에 포함됩니다. 신중하게 구현하면 서버 렌더링과 마찬가지로 빠른 First Contentful Paint를 구현한 다음 클라이언트에서 다시 렌더링 [rehydration](https://docs.electrode.io/guides/general/server-side-data-hydration) 이라는 기술을 사용하여 "픽업"합니다. 이것은 새로운 솔루션이지만 성능에 상당한 단점이 있을 수 있습니다.

Rehydration이 있는 SSR의 주된 단점은 First Paint를 개선하더라도 Time To Interactive에 심각한 부정적인 영향을 미칠 수 있다는 것입니다. SSR의 페이지는 종종 믿을 수 없을 정도로 빨리 로드되고 인터렉션 가능한 것처럼 보이지만 실제로 클라이언트 측 JS가 실행되고 이벤트 핸들러가 첨부 될 때까지 입력에 응답할 수 없습니다. 응답할 수 없는 시간은 모바일에서는 몇 초 또는 몇 분이 걸릴 수 있습니다.

페이지 로드가 완료된 것처럼 보이지만, 일정 시간동안 클릭하거나 두드려도 반응이 없는 경우를 직접 경험해보았을 수도 있습니다. 이것은 빠르게 실망으로 변합니다. *"왜 아무 일도 일어나지 않죠? 왜 스크롤 할 수 없죠?"*

### Rehydration 문제: 하나의 앱 두 배의 비용  {: #rehydration-issues }

Rehydration 문제는 JS로 인해 지연되는 상호 작용보다 더 나쁠 수 있습니다. 서버가 HTML을 렌더링하는 데 사용한 모든 데이터를 다시 요청하지 않고도 클라이언트 측 JavaScript가 정확하게 "픽업"할 수 있도록 하기 위해 현재의 SSR 솔루션은 일반적으로 UI의 응답을 직렬화합니다. 데이터를 스크립트 태그로 문서에 종속시킵니다. 결과 HTML 문서에는 다음과 같은 높은 수준의 복제가 포함됩니다.

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

보시다시피 서버는 탐색 요청에 대한 응답으로 애플리케이션 UI의 설명을 반환하지만 해당 UI를 작성하는 데 사용 된 소스 데이터와 클라이언트에서 부팅되는 UI 구현의 전체 사본을 반환합니다. bundle.js가 로드되고 실행 된 후에만 UI는 인터렉션이 가능해집니다.

SSR Rehydration를 사용하여 실제 웹 사이트에서 수집한 성능 메트릭은 그 사용이 심하게 실망스러움을 나타냅니다. 궁극적으로 그 이유는 사용자 경험에 달려 있습니다. 사용자를 "기괴한 계곡"에 남겨 두는 것은 매우 쉽습니다.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png" alt="Diagram showing client rendering negatively affecting TTI" width="600">

SSR Rehydration에 대한 희망도 있습니다. 단기적으로 캐시할 수 있는 콘텐츠에 대해 SSR만 사용하면 TTFB 지연이 줄어들어 사전 렌더링과 유사한 결과가 생성됩니다. [점진적](https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html), 점차적, 부분적인 Rehydration은 미래에 이 기술을 더 실용적으로 만드는 핵심 요소 일 수 있습니다.

## 스트리밍 서버 렌더링 및 점진적인 Rehydration {: #progressive-rehydration }

서버 렌더링은 지난 몇 년 동안 여러 가지 발전이있었습니다.

[스트리밍 서버 렌더링](https://zeit.co/blog/streaming-server-rendering-at-spectrum)을 사용하면 브라우저가 받은대로 점진적으로 렌더링 할 수 있는 청크로 HTML을 보낼 수 있습니다. 이것은 마크업이 사용자에게 더 빨리 도착할 때 빠른 First Paint와 First Contentful Paint를 제공 할 수 있습니다. React에서 [renderToNodeStream()](https://reactjs.org/docs/react-dom-server.html#rendertonodestream) 에서 비동기인 스트림은 동기 renderToString과 비교하여 유속이 빠르다는 것을 의미합니다.

점진적인 Rehydration 또한 주목할 가치가 있으며, React가 [탐구](https://github.com/facebook/react/pull/14717) 해온 것입니다. 이 방법을 사용하면 서버 렌더링 애플리케이션의 개별 부분이 전체 응용 프로그램을 한꺼번에 초기화하는 현재의 일반적인 방식보다는 시간이 지남에 따라 "부팅"됩니다. 이렇게 하면 페이지를 대화식으로 만드는 데 필요한 JavaScript의 양을 줄이는 데 도움이됩니다. 페이지의 우선 순위가 낮은 부분의 클라이언트 측 업그레이드를 지연하여 주 스레드를 차단하지 못하게 할 수 있기 때문입니다. 또한 서버 렌더링 된 DOM 트리가 손상되어 즉시 재구축되는 가장 일반적인 SSR Rehydration 함정 중 하나를 피하는 데 도움이 될 수 있습니다. 이 함정은 대부분의 경우 클라이언트 측 렌더링에서 필요한 초기 데이터가 준비 되지 않았기 때문에 발생합니다. 아마 Promise 해결을 await하고 있겠죠.

### 부분 Rehydration {: #partial-rehydration }

부분 Rehydration은 수행 과정이 어렵습니다. 개별 요소(구성요소/보기/트리)는 점진적으로 Rehydration 및 분석되고, 상호 활동이 거의 없거나 반응성을 확인할 수 없는 경우 이 방법을 통해 점진적인 Rehydration의 개념을 확장합니다. 대부분의 정적인 부분의 경우 일치하는 JavaScript 코드는 비활성 참조 및 장식 기능성으로 전환되어 클라이언트의 자취가 거의 없는 상태가 됩니다. 부분 Hydration 방법은 자체적인 문제와 손상을 포함합니다. 캐시에 대한 흥미로운 문제가 발생하며, 클라이언트 측의 메뉴는 애플리케이션의 비활성 부분을 위한 서버 렌더링 방식의 HTML을 추측할 수 없습니다. 서버 렌더링 방식의 HTML은 애플리케이션의 비활성 부분을 위해서 전체 페이지를 로드하지 않고 접근할 수 있습니다.

### 삼자형 렌더링 {: #trisomorphic }

[서비스 작업자](/web/fundamentals/primers/service-workers/)가 선택할 수 있는 옵션인 경우 “삼자형” 렌더링에 관심을 가질 수 있습니다. 초기/비 JS 메뉴를 위해 스트리밍 서버 렌더링을 사용할 수 있으며, 서비스 작업자는 설치를 완료한 후 메뉴를 위한 HTML 렌더링을 수행합니다. 이를 통해 캐시 구성요소와 템플릿의 최신 업데이트 상태를 유지하며, 동일한 세션에서 신규 보기를 렌더링하기 위해 SPA 스타일의 메뉴를 활성화합니다. 이와 같은 접근 방법은 사용자가 서버, 클라인트 페이지 및 서비스 작업자 간의 동일한 템플릿 및 라우팅 코드를 공유할 때 효과가 높습니다.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png" alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## 검색 엔진 최적화 고려 {: #seo}

웹 렌더링 전략을 선택할 때 보통 SEO 영향을 고려합니다. 크롤러가 쉽게 해석할 수있는 "완성된" 경험을 제공하기 위해 서버 렌더링이 종종 선택됩니다. 크롤러는 [JavaScript를 해석할 수도](https://web.dev/discoverable/how-search-works) 있지만 여기에는 알아둘만한 [제한 사항](/search/docs/guides/rendering)이 있습니다. 그것은 클라이언트 측 렌더링은 작동하지만 추가 테스트 및 여타 작업(leg work)이 없을 수 있다는 것 입니다. 최근에 [동적 렌더링](/search/docs/guides/dynamic-rendering)은 아키텍처가 클라이언트 측 JavaScript에 크게 의존하는 경우 고려할 가치가 있는 옵션이 되었습니다.

[모바일 친화적인 테스트](https://search.google.com/test/mobile-friendly) 도구는 선택한 방식이 원하는대로 작동하는지 테스트하는 데 사용할 수 있습니다. Google 크롤러에 표시되는 페이지, 자바 스크립트 실행 후 발견 된 일련의 HTML 콘텐츠 및 렌더링 중 발생한 모든 오류를 시각적으로 미리 보여줍니다.

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
