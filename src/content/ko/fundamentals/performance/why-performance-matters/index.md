project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 휴대기기와 네트워크의 확산 덕분에 이전보다 더 많은 사람들이 웹을 이용하고 있습니다. 이러한 사용자층이 증가함에 따라 성능이 여느 때보다 더 중요해졌습니다. 이 문서에서 성능이 중요한 이유에 대해 알아보고 모두를 위해 웹을 빠르게 하는 방법을 배워봅니다.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# 성능이 중요한 이유 {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

웹이 더 많은 것을 하도록 추구하는 과정에서 성능이라는
흔한 문제에 직면하게 됩니다. 사이트에는 그 어느 때보다
많은 기능이 있습니다. 그러다 보니, 여러 사이트가 다양한 네트워크 조건과 기기 전반에서
높은 수준의 성능을 달성하는 데 어려움을 겪고 있습니다.

성능 문제는 다양할 수 있습니다. 가장 좋은 경우는 사용자를 아주 잠시 성가시게 하는
짧은 지연을 발생시킵니다. 가장 나쁜 경우에는 사이트에 전혀 접근할 수 없고,
사용자의 입력에 반응하지 않거나, 두 가지가 모두 일어납니다.

## 성능은 사용자 유지에 중요합니다.

우리는 빌드한 사이트와 사용자가 의미 있게 상호작용하기를 바랍니다. 블로그라면,
게시물을 읽을 수 있어야 합니다. 온라인 스토어라면 물건을
살 수 있어야 합니다. 소셜 네트워크라면, 서로
상호작용할 수 있어야 합니다.

성능은 모든 온라인 벤처의 성공에 중요한 역할을 담당합니다. 여기에 저성능 사이트에 비해 고성능 사이트가 얼마나 더 잘
사용자를 끌어들이고 유지하는지
보여주는 몇 가지 사례 분석이 있습니다.

- 인지 대기 시간을 40% 감소시켰을 때 [Pinterest의 검색엔진 트래픽과 가입이 15% 증가되었습니다][pinterest]
.
- 평균 로드 시간을 850ms 감소시켰을 때 [COOK의 전환율이 7%
  증가했으며, 이탈률은 7% 감소하고 페이지당
  세션이 10% 증가되었습니다][COOK].

[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

낮은 성능이 비즈니스
목표에 부정적인 영향을 미친 경우에 대한 몇 가지 사례 분석은 다음과 같습니다.

- BBC는 사이트가 로드하는 데 1초씩
  더 걸릴 때마다 [추가적으로 10%의 사용자를 잃었다는 것을 발견했습니다][BBC].
- Google의 DoubleClick은 페이지
  로드에 3초가 넘는 시간이 걸리면 [53%의 모바일 사이트 방문이 취소된다는 것을 발견했습니다][DoubleClick].

[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

위에서 인용한 것과 같은 Google의 DoubleClick에서 밝혀진 바에 따르면, 
로딩에 5초가 걸리는 사이트는 그 네 배에 육박하는 19초가 걸리는 사이트에 비해 세션 길이가 70% 길고, 이탈률은
35% 낮았으며 광고 노출률은 25% 더 높은 것으로
나타났습니다. 경쟁자에 비해 나의 사이트 성능이
어떤지 대략적으로 알아보려면 [Speed Scorecard
도구를 확인해 보세요](https://www.thinkwithgoogle.com/feature/mobile/).

<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="4개의 유명한 뉴스 아웃렛의 성능을 비교한 Speed Scorecard
도구의 스크린샷.">
  <figcaption><b>그림 1</b>. 미국 내
4G 네트워크 사용자의 Chrome UX Report 데이터를 이용하여 4개의
경쟁 사이트 성능을 비교한 Speed Scorecard.</figcaption>
</figure>

## 전환율 향상에 중요한 성능

사용자 유지는 전환율 향상에 필수적입니다. 느린 사이트는
수익에 부정적인 영향을 미치고 그 반대도 마찬가지입니다. 다음은 성능이
비즈니스의 수익 향상(또는
하락)에 어떤 역할을 담당했는지에 대한 몇 가지 예입니다.

- Mobify의 경우, [홈페이지 로드 속도가 100ms 감소할 때마다 세션 기반 전환이 **1.11%
증가**했으며, **거의
$380,000**의 연평균 수익
향상을 가져왔습니다](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html).
또한, 구매 페이지 로드 속도가 100ms 감소하면 세션 기반 전환이 **1.55%
증가**하여 그 결과 **거의 $530,000**의 연평균 수익 향상을
가져왔습니다.
- DoubleClick은 [5초 이내로 로드되는 사이트의 게시자는 19초 내로 로드되는 사이트에 비해 최대
**두 배 더 많은 광고 수익**을 얻는다는 것을
발견했습니다](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/).
- [AutoAnything이 페이지 로드 시간을 절반으로 줄이자 **판매량이
12-13%로
폭발적인 증가**를 보였습니다](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/).

웹에서 비즈니스를 운영한다면 성능이 매우 중요합니다. 사이트의 사용자
환경이 빠르고 사용자 입력에 잘 반응한다면 좋은 결과를 가져다 줄 것입니다. 성능이 잠재적으로
여러분의 수익에 어떠한 영향을 미칠지 알아보려면 [Impact
Calculator](https://www.thinkwithgoogle.com/feature/mobile/) 도구를 확인하세요.

<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="성능이 향상되면
사이트 수익이 얼마나 증가하는지 추정한 Impact
Calculator의 스크린샷.">
  <figcaption><b>그림 2</b>. Impact Calculator이 추정하는
사이트 성능 향상으로 증가하는 수익.</figcaption>
</figure>

## 사용자 환경에 중요한 성능

URL로 이동할 때, 다양한 잠정
시작점에서부터 이동합니다. 연결 품질이나
사용하는 기기와 같은 여러 조건에 따라 여러분의
경험은 다른 사용자의 경험과 상당히 다를 수 있습니다.

<figure>
  <img src="images/speed-comparison.png" alt="페이지 로딩의 두 영사 슬라이드 릴
비교. 첫 번째는 느린 연결의 페이지 로딩을 보여주며,
두 번째는 빠른 연결의 페이지 로딩을 보여줍니다.">
  <figcaption><b>그림 3</b>. 매우 느린 연결(위)과
빠른 연결(아래)의 페이지 로드 비교.</figcaption>
</figure>

사이트가 로드를 시작할 때, 사용자가
콘텐츠 표시를 기다리는 일정 시간이 있습니다. 이때까지 사용자 환경이라고 할만한 것은 없습니다. 이러한 환경의
부재는 빠른 연결에서 금방 사라집니다. 반면, 느린 연결에서는
사용자가 기다려야 합니다. 사용자는 페이지 리소스가 천천히 들어오면서
더 많은 문제를 경험하게 됩니다.

성능은 좋은 사용자 환경의
근본적인 부분입니다. 사이트가 많은 코드를 담고 있으면 브라우저는 이 코드를 다운로드하기 위해 반드시 사용자 데이터 요금제에서 수 메가바이트를
이용해야 합니다. 휴대기기의 CPU 파워와 메모리에는
한계가 있습니다. 우리가 생각하기에 적은 양의 최적화되지 않은 코드에도
허덕일 수 있습니다. 이로 인해 성능이 불량해지고
반응이 없는 상태가 일어납니다. 익히 알고 있는 인간의 습성대로, 사용자는
저성능 애플리케이션을 오래 기다려주지 않고 버립니다.
사이트의 성능을 평가하는
방법을 알고 개선 기회를 찾아보려면,
[_How to Think About Speed Tools_](/web/fundamentals/performance/speed-tools/)를 확인하세요.

<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Lighthouse에서
보이는 페이지 성능 개요">
  <figcaption><b>그림 4</b>. <a
href="/web/tools/lighthouse/">Lighthouse</a>에서 보이는 페이지 성능 개요.</figcaption>
</figure>

## 사람을 위한 성능

제대로 작동하지 않는 사이트나 애플리케이션은 이것을 사용하는 사람들에게 실질적인 비용을
일으킬 수도 있습니다.

[모바일 사용자가 전 세계 인터넷 사용자의 커다란 부분을 차지하고 있기
때문에](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet),
이러한 대부분의 사용자가 LTE, 4G, 3G 또는 2G 네트워크를 통해
웹에 접속한다는 것을 명심하는 것이 중요합니다. Calibre의 Ben Schwarz가
[this study of real world
performance](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342)에서 지적했듯이,
선불 데이터 요금제가 감소하여 인터넷 사용이 값비쌌던 곳에서도
적절한 비용으로 이용할 수 있게 되었습니다. 휴대기기와
인터넷은 더 이상 사치품이 아닙니다.
점점 더
상호 연결성이 강해지는 세상에서 이동과 제 기능을 하기에 필요한 보편적인 도구입니다.

[총 페이지 크기는 적어도
2011년부터 꾸준히 증가](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal)하고 있으며, 이러한
경향은 지속되고 있는 듯 합니다. 일반적인 페이지가 더 많은 데이터를 보내면 사용자는
책정된 데이터 요금제를 더 자주 충전하게 되고, 이는 비용을 발생시킵니다.

사용자의 비용을 절약하는 것과 더불어, 가벼운 사용자 환경은
위기에 처한 사용자에게 매우 중요하다는 것이 익히 알려져 있습니다. 병원,
클리닉, 위기 센터와 같은 공공 자원은 사용자가 위기에 처했을 때 필요한
중요하고 구체적인 정보를 전달하는 온라인 리소스를 보유합니다. [힘든 상황에서 중요한 정보를 효율적으로 보여주는 데
디자인이 중요](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis)하긴 하지만,
이러한 정보를 빠르게 전달하는 것의 중요성은 몇 번을 말해도
부족합니다.
이것은 우리가 해야 할 일입니다.

## 나아가야 할 길

아래 목록이 감당하기 힘들어 보이지만,
사이트의
성능을 향상하기 위해 여러분이 이_모든_것을 할 필요는 없습니다. 이것은 시작점에 불과하니, 부담 갖지 마세요!
성능 향상을 위해 여러분이 하는_모든 것_은 사용자에게 도움이 될 것입니다.

### 전송하는 리소스에 유념하기

고성능 애플리케이션을 빌드하는 효과적인 방법은 [사용자에게_어떤_
리소스를 보내는지 감사](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads)하는
것입니다.
[Chrome DevTools의 네트워크 패널](/web/tools/chrome-devtools/network-performance/)이
주어진 페이지에서 사용된 모든 리소스를 훌륭하게 요약하고 있지만, 이제까지 성능에 대해 고려한 적이 없다면 어디서부터
시작해야 할지 막막할 것입니다. 다음과 같은
몇 가지 제안을 드립니다.

- UI 빌드에 Bootstrap이나 Foundation을 사용하고 있다면,
이것이 필요한지 자문해보세요. 이러한 추상성은 사이트 특정 CSS가
그림을 입력하기도 전에 브라우저가 페이지에 다운로드, 파싱,
적용해야 하는 CSS 힙을 추가합니다.
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)와
[Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)는 상대적으로 적은 코드로
단순한 레이아웃과 복잡한 레이아웃을 모두 생성하는 데 탁월합니다.
[CSS가
리소스를 차단하는 렌더이기 때문에](/web/fundamentals/performance/critical-rendering-path/render-blocking-css),
CSS 프레임워크의 오버헤드는 렌더링을 크게 지연시킬 수 있습니다. 언제든지 가능하다면 불필요한 오버헤드를 삭제하는 것으로
렌더링을 빠르게 할 수 있습니다.
- 자바스크립트 라이브러리는 편리하지만 언제나 필요한 것은 아닙니다. jQuery를
예로 들어보겠습니다. [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)나
[`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll)과
같은
메서드 덕분에 요소 선택이 크게 간소화되었습니다.
이벤트 바인딩은
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)를 이용하면 간편합니다.
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList),
[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute),
및
[`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute)는
클래스와 속성을 작업하는 쉬운 방법을 제공합니다. 반드시
라이브러리를 사용해야 한다면, 더 가벼운 대체재를 찾아보세요. 예를 들어,
[Zepto](http://zeptojs.com/)는 작은 jQuery 대체재이며,
[Preact](https://preactjs.com/)는 React보다 훨씬 작은 대체재입니다.
- 모든 웹사이트에 단일 페이지 애플리케이션(SPA)이 필요한 것은 아닙니다. SPA는 대체로
자바스크립트를 광범위하게 사용하기 때문입니다. 자바스크립트는
다운로드뿐만 아니라
파싱, 컴파일, 실행이 필요하기 때문에 [바이트당 웹에서 제공하는
가장 고비용의 리소스입니다](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e). 예를 들어,
최적화된 프런트 엔드 아키텍처를 갖춘 뉴스나 블로그 사이트는 기존의 멀티페이지 환경과 마찬가지로
잘 작동합니다. 특히 [HTTP
캐싱](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)이
적절하게 구성되었으며, 추가적으로 [서비스
워커](/web/fundamentals/primers/service-workers/)가 사용된 경우에 그러합니다.

### 리소스 전송 방법 유념하기

효율적인 전달은 빠른 사용자 환경을 빌드하는 데 필수적입니다.

- [HTTP/2로 마이그레이션](/web/fundamentals/performance/http2/) HTTP/2에는
HTTP/1.1에서 유래된 동시 요청 제한이나
헤더 압축 결여와 같은 다양한 성능 문제를 해결합니다.
- [리소스
힌트를 이용하여 조기 리소스 다운로드](/web/fundamentals/performance/resource-prioritization). `rel=preload`는
브라우저가 발견하기 전에
중요한 리소스를 조기에 가져오도록 하는 리소스 힌트 중 하나입니다. 이것은 현명하게 사용하면
페이지의 렌더링과 [상호작용
시간](/web/tools/lighthouse/audits/time-to-interactive)을 낮추는 데 [상당한 긍정적인
효과가 있습니다](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)
. [`rel=preconnect`는 타사
도메인에서 호스팅되는 리소스에 대한 새로운 연결 생성 지연을 마스크할 수 있는 또 다른
리소스 힌트입니다](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/).
- 최신 사이트는 평균적으로 [수_많은_
자바스크립트](http://httparchive.org/trends.php#bytesJS&reqJS) [및
CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS)를 담고 있습니다. HTTP/1 환경에서는 스타일과 스크립트를 대형 번들로 묶는 일이
흔했습니다.
이것은 대량의 요청이 성능에 해를 끼치기 때문이었습니다.
이것은 이제 다중,
동시 요청의 비용이 훨씬 저렴한 HTTP/2가 나왔으므로 더는 현실적으로 해당되는 내용이 아닙니다. [웹팩에서
코드 분할 사용을 고려](https://webpack.js.org/guides/code-splitting/)하여 현재 페이지나 뷰에서 필요한 한정된 양의
스크립트만 다운로드해 보세요. CSS를 작은 템플릿이나 구성요소에 특정적인 파일로
나누고, 리소스를 정말 사용될만한 곳에만
포함하세요.

### 데이터 전송량 유념하기

전송하는 데이터의_양_에 대한 몇 가지 제안이 있습니다.

- [텍스트
자산 최소화](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations).
최소화란 불필요한 공백, 주석, 텍스트 기반 리소스의 기타 콘텐츠를
삭제하는 것입니다. 이렇게 하면 기능에 영향을 미치지 않고도
사용자에게 보내는 데이터 양을 크게 줄일 수 있습니다. [자바스크립트에서
난독화(Uglification)](https://www.npmjs.com/package/uglifyjs)를 이용하여
변수와 메서드 이름을 줄임으로써 더욱 절약할 수 있습니다. SVG는 텍스트 기반 이미지
형식이므로 [SVGO로 최적화할 수 있습니다](https://github.com/svg/svgo).
- [서버가
리소스를 압축하도록 구성](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer).
압축은 사용자에게 전송하는 데이터 중에서도
_특히_텍스트 자산의 양을 크게 감소시킵니다. GZIP이 가장 인기 있는 선택지지만, [Brotli 압축은
더 많은 것을 할 수 있습니다](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/).
단, 압축은 성능 문제에 대한 능사가_ 아니라는_점을 알아야 합니다.
암묵적 압축된 일부 파일 형식(예: JPEG, PNG, GIF, WOFF
등)은 이미 압축되었으므로 압축에 반응하지 않습니다.
- [이미지를
최적화](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)하여
사이트가 최소한의 이미지 데이터를 전송하도록 합니다. [이미지는 웹에서 평균적인 페이지당
페이로드의 큰 부분을
차지하므로](http://httparchive.org/trends.php#bytesImg&reqImg), 이미지 최적화는
성능을 크게 향상하는 독자적인 다양한 기회를 제공합니다.
- 시간이 있다면 대체 이미지 형식을 제공하는 것을 고려해 보세요.
[WebP](/speed/webp/)는 상당히 [폭넓은 브라우저
지원](https://caniuse.com/#feat=webp)이 제공되며, 시각적 품질은 높게 유지하면서도 JPEG나 PNG보다
적은 데이터를 사용합니다. [JPEG XR는 IE 및 Edge에서 지원되는 또 다른
대체 형식](https://jpeg.org/jpegxr/index.html)으로,
유사하게 절약할 수 있습니다.
- [이미지를
반응형으로 전달](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).
기기와 화면의 폭넓은 다양성은
이미지가 나타나는 화면에 가장 알맞은 이미지를 전송함으로써
성능을 향상할 수 있는 엄청난 기회를 제공합니다. 가장 간단한 사용 사례는 [`srcset`
속성](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)을
`<img>` 요소에 추가하여 브라우저가 선택할 수 있는 다양한 이미지를 지정하는 것입니다.
조금 더 복잡한 측면으로는 `<picture>`을 이용하여 브라우저가
최적의 형식(예: JPEG나 PNG보다 WebP)을 선택하도록 돕거나 다양한 화면 크기에 대해 각기 다른 이미지 처리를
한꺼번에 제공할 수도 있습니다.
- [애니메이션
GIF 대신 동영상 사용](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/).
애니메이션 GIF는_거대합니다_. 비슷한 품질의
동영상은_훨씬_작습니다(보통 80% 정도). 사이트에 애니메이션 GIF를 많이 사용한다면
이 방식이 로딩 성능을 향상하는 데 가장 큰 영향을 미칠 것입니다.
- [클라이언트 힌트](http://httpwg.org/http-extensions/client-hints.html)는
현재 네트워크 상황과 기기
특징에 따라 리소스 전달을 재단합니다. `DPR`, `Width`, `Viewport-Width` 헤더가
[서버측 코드를 사용하는 기기에 대한 최적의 이미지 전달_및_적은
마크업 전달](/web/updates/2015/09/automating-resource-selection-with-client-hints)에 도움을 줄 수 있습니다.
`Save-Data` 헤더는 [특별히 가벼운 애플리케이션 경험을 요청하는
사용자에게 원하는 바를 제공할 수 있도록](/web/updates/2016/02/save-data) 도울 수 있습니다.
- [`NetworkInformation`
API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation)는
사용자의 네트워크 연결에 관한 정보를 노출합니다. 이 정보는 느린 네트워크를 이용하는 사용자를 위해 애플리케이션 경험을 수정하는 데
사용할 수 있습니다.

성능 향상에 관한 총체적인 가이드는
[the RAIL performance model](/web/fundamentals/performance/rail)에서 우리의 글을 확인해 보세요. 이 글은
로드 시간과 애플리케이션 반응성을 모두 향상하는 데 초점을 맞추고 있습니다. [PRPL 패턴
가이드](/web/fundamentals/performance/prpl-pattern/)도 최신 단일 페이지
애플리케이션의 성능 향상을 위한
훌륭한 리소스입니다.

성능 및 사이트
를 더 빠르게 하는 방법에 대해 자세히 알아보려면, 다양한 주제에 관한 우리의 성능 문서를
둘러보세요. 계속해서 새로운 가이드를 추가하고 기존 가이드를 업데이트하고 있으니
자주 방문해 주세요!

_이 리소스를 향상하고 런칭하는 데 폭넓은 의견을 제시해 주신 [Addy Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick), [Matt
Gaunt](/web/resources/contributors/mattgaunt), [Philip
Walton](/web/resources/contributors/philipwalton), [Vinamrata
Singal](/web/resources/contributors/vinamratasingal), [Daniel
An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/),
[Pete LePage](/web/resources/contributors/petelepage)께 특별한
감사를 드립니다._

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
