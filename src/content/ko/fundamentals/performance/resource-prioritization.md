project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2019-05-25 #}
{# wf_published_on: 2017-11-01 #}
{# wf_blink_components: Blink>Network,Blink>Loader #}

<!--
  Aspect ratio CSS, Copyright 2017 Google Inc
  Maintains aspect ratio in blocks that use the class, so that content doesn't
  move around as media loads.

  Adapted from https://github.com/sgomes/css-aspect-ratio
-->
<style>
.aspect-ratio {
  /* aspect-ratio custom properties */
  /* The width portion of the aspect ratio, e.g. 16 in 16:9. */
  --aspect-ratio-w: 1;
  /* The height portion of the aspect ratio, e.g. 9 in 16:9. */
  --aspect-ratio-h: 1;

  position: relative;
  max-width: 100%;
  margin-bottom: 1ex;
}

.aspect-ratio > *:first-child {
  width: 100%;
}

@supports (--custom-props: "true") {
  .aspect-ratio::before {
    display: block;
    padding-top: calc(var(--aspect-ratio-h, 1) /
        var(--aspect-ratio-w, 1) * 100%);
    content: "";
  }

  .aspect-ratio > *:first-child {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

# 리소스 우선순위 지정 - 브라우저의 도움 받기 {: .page-title }

{% include "web/_shared/contributors/sgomes.html" %}

인터넷을 통해 브라우저에 전송되는 모든 바이트가 똑같이
중요한 것은 아니며, 브라우저도 이것을 알고 있습니다. 브라우저는 가장 중요한
리소스를 우선 로드(예: 스크립트나 이미지보다
CSS 우선)하기 위한 최선의 추측을 시도하는 추론 방법을 갖추고 있습니다.

그렇지만 다른 추론 방법과
마찬가지로 항상 맞는 것은 아닙니다. 당시에 충분한 정보가 없다면 브라우저가
올바르지 않은 결정을 내릴 수도 있습니다. 이 문서는 최신 브라우저에 나중에 필요한 항목을 알려
콘텐츠의 우선순위에 적절한 영향을 주는 방법을 설명합니다.

## 브라우저의 우선순위 기본값

이전에 언급한 것처럼, 브라우저는 리소스의 중요도에 따라 여러 유형의 리소스에
각각 상대적인 우선순위를 할당합니다. 예를 들면,
페이지 `<head>`의 `<script>` 태그는 Chrome에서
**높은** 우선순위로 로드(**가장 높은** CSS 다음)되지만,
비동기 속성(비동기로
로드 및 실행될 수 있음)이 있다면 **낮음**으로 우선순위가 변경됩니다.

우선순위는 사이트의 로딩 성능을 조사할 때 중요합니다.
[측정](/web/fundamentals/performance/critical-rendering-path/measure-crp)과
[중요한 렌더링 경로 분석](/web/fundamentals/performance/critical-rendering-path/analyzing-crp)의 일반적인 기법을 넘어서,
각 리소스에 대한 Chrome의
우선순위를 아는 데
유용합니다. Chrome Developer Tools의 Network 패널에서 우선순위를
찾을 수 있습니다. 그 내용은 다음과 같이 표시됩니다.


<figure>
  <div class="aspect-ratio"
       style="width: 1810px; --aspect-ratio-w: 1810; --aspect-ratio-h: 564">
    <img src="images/res-prio-priorities.png"
    alt="Chrome Developer Tools 내 우선순위 표시의 예">
  </div>
  <figcaption><b>그림 1</b>: Chrome Developer Tools의 우선순위. Priority 열을 사용하려면 열 헤더를 오른쪽 클릭해야
  합니다.
  </figcaption>
</figure>


이러한 우선순위를 통해 각 리소스에 대한
브라우저 속성의 상대적인 중요성을 알 수 있습니다. 브라우저가 서로 다른 우선순위를
할당하는 데는 약간의 차이로도 충분하다는 것을 잊지 마세요. 예를 들어, 초기
렌더링에 속한 이미지는 화면 밖에서 시작한 이미지보다
높은 우선 순위를 가집니다. 우선순위에 관해 궁금하다면
[Addy Osmani의 글](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf){: .external}이
Chrome의 현재 우선순위 상태에 대해 자세히 설명하고 있습니다.

원하는 우선순위와 다른 우선순위로 표시된 리소스를 찾았다면 어떻게 해야
할까요?

이 문서는 비교적 새로운 `<link>` 유형의
서로 다른 세 가지 선언적 솔루션을 알아봅니다. 리소스가 사용자
환경에 필수적이지만 너무 낮은 우선순위로 로드된다면, 미리 로드나 미리 연결의 두 가지 방법
중 하나로 수정할 수 있습니다. 다른 한편으로, 만약 브라우저가 다른 모든 작업을
끝낸 경우에만 일부 리소스를 가져오도록 하고
싶다면, 사전 가져오기를 시도해 보세요.

이 세 가지를 모두 살펴봅시다.

## 미리 로드

`<link rel="preload">`는 브라우저에게 현재 탐색에 리소스가 필요하며,
가능한 한 빠르게 가져오기를 시도해야 한다고
알립니다. 사용 방법은 다음과 같습니다.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

아마도 'as' 속성을 제외하면
이 중 대부분이 예상한 그대로일 것입니다. 이 방법은 브라우저에게 로딩 중인 리소스의 유형을 알려
올바르게 처리되도록 합니다. 브라우저는 올바른 유형이 설정되지 않는 한
미리 로드된 리소스를 사용하지 않습니다. 해당 리소스는
다른 때와 동일한 우선순위로 로드되지만, 이제 브라우저가
미리 알기 때문에 다운로드가 더 일찍 시작되도록 허용합니다.

`<link rel="preload">`는 브라우저에 대한 필수 안내라는 점에 유의하세요.
우리가 이야기할 다른 리소스 힌트와는 달리, 이것은
브라우저가 반드시 해야 하는 작업이며 선택적 힌트가 아닙니다. 이 방법은
실수로 두 번 가져오기를 발생시키거나 필요하지 않은 것을 가져오지 않도록 신중하게 테스트하는 데
특히 중요합니다.

`<link rel="preload">`를 이용해 가져왔지만
현재 페이지에서 3초 내로 사용되지 않는
리소스는 Chrome Developer Tools의 Console에 경고를 트리거합니다. 그러니 주의하세요!

<figure>
  <div class="aspect-ratio"
       style="width: 1050px; --aspect-ratio-w: 1050; --aspect-ratio-h: 244">
    <img src="images/res-prio-timeout.png"
    alt="Chrome Developer Tools 내 미리 로드 제한시간 오류의 예">
  </div>
</figure>

### 사용 사례: 글꼴

글꼴은 나중에 발견되었지만 반드시 가져와야 하는 리소스의 좋은 예로,
한 페이지가 로드하는 여러 CSS 파일의 맨 아래에 위치하는 경우가 많습니다.

사용자가 사이트의 텍스트 콘텐츠를 기다리는 시간을 감소시키고, 시스템 글꼴과
선호 글꼴이 충돌하여 발생하는 플래시를 방지하기 위해
`<link rel="preload">`를 HTML에 사용하면
글꼴이 필요하다는 것을 브라우저가 즉시 알 수 있습니다.

    <link rel="preload" as="font" crossorigin type="font/woff2" href="myfont.woff2">

여기에서 `crossorigin`의 사용이 중요하다는 점에 유의하세요. 이 속성 없이는
브라우저가 미리 로드된 글꼴을 무시하고 새로 가져온 항목이
그 자리를 차지합니다. 이것은 글꼴은 통상 브라우저를 통해 익명으로 가져오며, 미리 로드 요청은
`crossorigin` 속성 사용을
통해서만 익명으로 처리할 수 있기 때문입니다.

Caution: Google Fonts와 같은 CDN을 사용 중이라면 미리 로딩한 글꼴 파일이
CSS에 있는 것과 일치하는지 확인해야 합니다. 유니코드 범위, 두께, 다양한 글꼴로 인해 이 작업이
어려울 수 있습니다. 글꼴은 또한 정기적으로 업데이트될 수 있으며, 새로운 버전에 대해
CSS를 사용할 때 이전 버전을 미리 로드했다면
동일한 글꼴을 두 번 다운로드하여 사용자의
대역폭을 낭비하는 결과를 낳게 될 수 있습니다. 손쉬운 유지관리를 위해
`<link rel="preconnect">`를 대신 사용하는 것을 고려해 보세요.

### 사용 사례: CSS 및 자바스크립트 주요 경로

페이지 성능에 관해 이야기할 때의 유용한 개념으로 '주요 경로'라는 것이 있습니다.
주요 경로란 초기
렌더링 전에 반드시 로드되어야 하는 리소스를 일컫습니다. 이러한 리소스(예를 들어 CSS)는 사용자 화면의
첫 픽셀을 얻는 데 매우 중요합니다.

이전에는 이 콘텐츠를 HTML에 인라인 처리하는 것이 권장되었습니다.
그러나 페이지 수가 많고 서버 측에서 렌더링되는 경우, 이렇게 하면
바이트 낭비가 심해지게 됩니다. 주요 코드의 변경이 인라인 처리된 모든 페이지를
무효화하기 때문에 버전 관리도 더욱 어렵게 됩니다.

`<link rel="preload">`는 개별 파일
버전 관리 및 캐싱의 이점을 유지하면서도 리소스를 가능한 한 빠르게 요청하는
메커니즘을 선사합니다.

    <link rel="preload" as="script" href="super-important.js">
    <link rel="preload" as="style" href="critical.css">

미리 로드 이용에는 한 가지 단점이 있습니다. 추가적인 왕복에 영향을 받는다는 것입니다.
이러한 추가적인 왕복은 브라우저가 우선
HTML을 가져온 다음에야 다음 리소스에 대해 알 수 있다는 점에 기인합니다.

추가적인 왕복을 피하는 방법 중 하나는
HTML을 전송하는 것과 동일한 연결을 통해 선점적으로 주요 자산을 첨부하는 경우,
[HTTP/2](/web/fundamentals/performance/http2/#server_push)
푸시를 대신 사용하는 것입니다. 이 방법을 이용하면
사용자의 브라우저가 HTML을 가져오고 주요 자산의 다운로드를 시작하는
사이의 다운타임이 없습니다. 그러나 HTTP/2를 이용할 때는 주의해야 합니다. 사용자의 대역폭 사용을 매우 강제적으로 제어하는 방법('서버는
무엇이 최선인지 알고 있습니다')이며, 브라우저가 이미 캐시에 있는 파일을 가져오지 않는 등의 자체
결정을 내릴 수 있는 여지를
거의 남기지 않기 때문입니다.

## 미리 연결

`<link rel="preconnect">`는 브라우저에 여러분의 페이지가 다른 출발지에
연결하도록 구축되었다는 것과, 가능한 한 빠르게 처리를
시작하고자 한다는 것을 알립니다.

느린 연결에서는 연결 구축에 보통 상당한 시간이 소요되며,
특히 보안 연결의 경우에는 DNS
룩업, 리디렉션, 사용자의 요청을 처리하는 최종 서버로의 여러 차례 왕복이 관여할 수 있으므로
더욱 그러합니다. 이 모든 것을 미리 처리하면 대역폭 사용에
대한 부정적인 영향 없이 사용자에게 애플리케이션이 빠르다는
인상을 줄 수 있습니다. 연결 구축에 걸리는 시간 대부분은
데이터 교환이 아니라 기다리는 데 소요됩니다.

브라우저에게 여러분의 의도를 알리는 것은 페이지에 링크 태그를 추가하는 것만큼이나
간단합니다.

    <link rel="preconnect" href="https://example.com">

이 경우, 브라우저에게
`example.com`에 연결하고 여기에서 콘텐츠를 가져오려 한다는 것을 알립니다.

`<link rel="preconnect">`에는 꽤 적은 비용이 들긴 하지만 여전히 상당한 CPU 시간을 차지할 수 있으며,
보안 연결의 경우 더욱 그렇다는 점에 유념해야 합니다. 이것은 특히 연결이 10초 이내로 사용되지 않아 브라우저가
닫히면, 이전의 모든 연결 작업을 낭비하기 때문에
좋지 않습니다.

한마디로, `<link rel="preload">`는 종합적인 성능 변경이므로
사용할 수 있을 때마다 쓰되, `<link rel="preconnect">`는 만약을 대비하여
도구함에 가지고 있어야 합니다. 몇 가지를 살펴보겠습니다.

참고: 사실 연결에 관련된 또 다른 `<link>` 유형인
`<link rel="dns-prefetch">`도 있습니다. 이 유영은 DNS 룩업만을 처리하기 때문에 `<link rel="preconnect">`의 작은 하위
집단이지만, 더 폭넓은 브라우저 지원이 가능하여
우수한 폴백을 제공할 수 있습니다.
완전히 동일한 방법으로 사용합니다.
`<link rel="dns-prefetch" href="https://example.com">`

### 사용 사례: 가져오는 것이 *무엇*인지가 아니라 *어디서 왔는지* 알기

버전 관리된 종속성으로 인해 주어진 CDN으로부터 리소스를 받는다는 것은
알지만 정확히 어떤 경로인지는 모르는 상황에
처할 수 있습니다. 다른 경우, 미디어 쿼리나 사용자 브라우저의 런타임 기능 확인에 따라
여러 리소스 중 하나만 받을 수 있습니다.

이러한 경우에 가져오려는 리소스가 중요하다면, 서버에
미리 연결하여 최대한 많은 시간을 절약하고 싶을 것입니다. 브라우저는
파일이 필요하기 전에는 가져오기를 시작하지 않지만(즉, 일단 페이지에서
요청이 이루어진 경우),
적어도 연결 측면을 사전에 처리하여 사용자가
여러 번의 왕복을 기다리지 않아도 되게 합니다.

### 사용 사례: 미디어 스트리밍

연결 단계에서 시간을 절약하려 하지만 반드시 콘텐츠를 바로 가져올 필요는 없는 경우의
다른 예로는 서로 다른 출발지에서 미디어를
스트리밍하는 것이 있습니다.

페이지가 스트림된 콘텐츠를 처리하는 방법에 따라 스크립트가 로드되고 스트림을 처리할 준비가 될 때까지
기다리고 싶을 수 있습니다. 미리 연결은
일단 가져오기를 시작할 준비가 되면
단일 왕복으로 대기 시간을 줄이는 데 도움이 됩니다.

## 미리 가져오기

`<link rel="prefetch">`는 중요한 것이 더 빠르게 일어나도록 하는 것이 아니라,
기회가 있으면 중요하지 않은 것을
먼저 발생시키려 한다는 점에서 `<link rel="preload">`나
`<link rel="preconnect">`와 사뭇 다릅니다.

이 작업은 향후 탐색이나 사용자 상호작용(예:
사용자가 예상된
행동을 수행하는 경우, 나중에 필요*할 수도 있는* 것)에
필요할 수 있는 리소스를 브라우저에게 알림으로써 수행됩니다. 이러한 리소스는 현재 페이지가 로딩을 마쳤으며 사용 가능한 대역폭이 있을 때
Chrome에서 **가장 낮은** 우선순위로 가져옵니다.

즉, `prefetch`는 사용자가 다음에
할 행동을 선점하여 준비하는 데 가장 적합하다는 것을 의미합니다. 예를 들어, 결과 목록에서 첫 번째 제품 상세
페이지를 가져오거나 페이지 번호가 있는 콘텐츠의 다음 페이지를 가져오는 것이 여기에 해당합니다.

    <link rel="prefetch" href="page-2.html">

단, 미리 가져오기는 귀납적으로 작동되지 않는다는 점에 유념해야 합니다. 위의 예에서
여러분은 HTML만 가져왔습니다. `page-2.html`에 필요한 리소스는
여러분이 명시적으로 미리 가져오지 않는 한 사전에 다운로드되지
않을 것입니다.

### 미리 가져오기는 재정의로 사용할 수 없음

기존 리소스의 우선순위를 낮추는 방식으로 `<link rel="prefetch">`를
이용할 수 없다는 점을 아는 것이 중요합니다. 다음 HTML에서,
미리 가져오기에 `optional.css`를 선언하면 뒤따르는 `<link rel="stylesheet">`의 우선순위를
낮출 것이라 생각할 수 있습니다.

    <html>
      <head>
        <link rel="prefetch" href="optional.css">
        <link rel="stylesheet" href="optional.css">
      </head>
      <body>
        Hello!
      </body>
    </html>

그러나, 사실 이 방법은 (두 번째에 잠재적인 캐시 적중률이 있다고 하더라도)
스타일시트를 두 번 가져오도록 하며,
미리 가져오기가 각각의 가져오기에서 실행될 때 한 번은 **가장 높은**
우선순위 기본값, 다른 한 번은 **가장 낮은** 우선순위로 가져옵니다.

<figure>
  <div class="aspect-ratio"
       style="width: 1374px; --aspect-ratio-w: 1374; --aspect-ratio-h: 190">
    <img src="images/res-prio-prefetch.png"
         alt="optional.css를 두 번 불러온 것을 나타내는
              Chrome Developer Tools의 스크린샷">
  </div>
</figure>

이중 가져오기는 사용자에게 좋지 않습니다. 이 경우, 사용자는 렌더 차단 CSS를
기다려야 할뿐만 아니라, 잠재적으로는
파일을 두 번 다운로드함으로써 대역폭을 낭비할 수도 있습니다. 대역폭은
측정될 수 있다는 점을 잊지 마세요. 네트워크 요청을
철저하게 분석하고 이중 가져오기에 유의하세요!

## 기타 기법 및 도구

`<link rel="preload">`, `<link rel="preconnect">`, `<link rel="prefetch">`(및 추가적으로 `<link rel="dns-prefetch">`)는
브라우저에
리소스
및 연결을 사전에 선언적으로 알리고, 무엇인가가 발생했을 때
필요에 따라 변경하도록 하는 훌륭한 방법을 제공합니다.

리소스가 로드되는 우선순위
및 타이밍을 변경하는 데 사용할 수 있는 여러 가지의 다른 도구와 기법이 있습니다. [HTTP/2 서버 푸시](/web/fundamentals/performance/http2/#server_push),
[`IntersectionObserver`를 사용하여 이미지 및 기타 미디어 지연 로드](/web/updates/2016/04/intersectionobserver),
[렌더 차단 CSS 방지하기](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)와 함께
[loadCSS](https://github.com/filamentgroup/loadCSS){: .external} 등의
미디어 쿼리
및 라이브러리,

[비동기](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async){: .external}
및
[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer){: .external}을 통한 자바스크립트 가져오기, 컴파일, 실행 지연에 대해 읽어보세요.

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
