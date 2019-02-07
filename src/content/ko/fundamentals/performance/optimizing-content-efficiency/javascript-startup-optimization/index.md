project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 네트워크 전송 및 자바스크립트에 대한 파싱/컴파일 비용을 낮추어 페이지를 빠르게 이용할 수 있도록 합니다.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-11-30 #}
{# wf_blink_components: Blink>JavaScript #}

# 자바스크립트 시작 최적화 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

자바스크립트에 더욱 크게 의존하는 사이트를 빌드하면서,
때때로 쉽게 볼 수 없는 방식으로 보낸 것에 대한 대가를 치러야 합니다. 이 글에서는
사이트를 휴대기기에서 빠르게 로드하고 상호작용이
가능하게 하는 데 간단한 **규칙**이 도움이 되는 이유에 대해 다룹니다. 더 적은 자바스크립트를 전달하는 것은 네트워크 전송에 걸리는
시간, 코드 압축 해제의 비용, 자바스크립트의 파싱 및 컴파일에 드는 시간이 줄어든다는
것을 의미합니다.

## 네트워크

대부분이 개발자가 자바스크립트의 비용을 생각할 때는
**다운로드 및 실행 비용**의 관점에서 생각합니다. 유선으로 더 많은 용량의 자바스크립트를
전송하는 것은 사용자의 연결이 느릴수록 오래 걸립니다.

<img src="images/1_U00XcnhqoczTuJ8NH8UhOw.png" alt="브라우저가
리소스를 요청하면, 해당 리소스를 가져와 압축 해제해야 합니다. 자바스크립트와 같은
리소스의 경우, 실행 전에
파싱 및 컴파일되어야 합니다."/>

선진국에서조차 이것은 문제입니다. 사용자가 이용하는 **효과적인 네트워크
연결 유형**이 3G나 4G, Wi-Fi가 아닐 수 있기 때문입니다. 카페의
Wi-Fi가 있지만 2G 속도의 모바일 핫스팟에 연결되어있을 수 있습니다.

다음의 방법으로 자바스크립트의 네트워크 전송 비용을 **감소**시킬 수 있습니다.

* **사용자에게 필요한 코드만 전송합니다**.
    * [코드 분할](/web/updates/2017/06/supercharged-codesplit)을 사용하여
      자바스크립트를 필수적인 부분과 그렇지 않은 부분으로 구분합니다. [webpack](https://webpack.js.org)과 같은
      모듈 번들러는
      [코드 분할](https://webpack.js.org/guides/code-splitting/)을 지원합니다.
    * 필수적이지 않은 코드의 지연 로딩.
* **최소화**
    * [UglifyJS](https://github.com/mishoo/UglifyJS)를 사용하여
      ES5 코드
      [최소화](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations).
    * [babel-minify](https://github.com/babel/minify) 또는
      [uglify-es](https://www.npmjs.com/package/uglify-es)를 사용하여 ES2015+ 최소화.
* **압축**
    * 최소한
      [gzip](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text_compression_with_gzip)을
      사용하여 텍스트 기반 리소스를 압축합니다.
    * [Brotli](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)
      ~[q11](https://twitter.com/paulcalvano/status/924660429846208514)
      사용을 고려합니다. Brotli
      는 압축률에서 gzip보다 우월합니다. 이 방법을 이용하여 CertSimple은 압축 자바스크립트 용량의
      [17%](https://speakerdeck.com/addyosmani/the-browser-hackers-guide-to-instant-loading?slide=30)를
      절약했으며, LinkedIn은 로드 시간의
      [4%](https://engineering.linkedin.com/blog/2017/05/boosting-site-speed-using-brotli-compression)를
      절약했습니다.
* **사용되지 않은 코드 제거**.
    * [DevTools 코드
      대상 범위](/web/updates/2017/04/devtools-release-notes#coverage)에서
      삭제되거나 지연 로드될 수 있는 코드의 기회를 식별합니다.
    * [babel-preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)
      및 브라우저 목록을
      사용하여 이미 최신 브라우저에 있는 트랜스파일 기능을 방지합니다.
      [웹팩
      번들의 조심스러운 분석](https://github.com/webpack-contrib/webpack-bundle-analyzer)은
      고급 개발자가 필요 없는 종속성을 잘라낼 기회를 식별하는 데 도움이 됩니다.
    * 코드 스트립에 대한 정보는
      [tree-shaking](https://webpack.js.org/guides/tree-shaking/), [Closure
      Compiler](/closure/compiler/)의 고급 최적화 및 [lodash-babel-plugin](https://github.com/lodash/babel-plugin-lodash)과 같은 라이브러리
      트리밍 플러그인 또는
      Moment.js와 같은
      라이브러리를 위한 웹팩의
      [ContextReplacementPlugin](https://iamakulov.com/notes/webpack-front-end-size-caching/#moment-js)을
      참조하세요.
* **네트워크 트립 최소화를 위한 코드 캐싱.**
    * [HTTP
      캐싱](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)을
      이용하여 브라우저가 응답을 효율적으로 캐시하도록 합니다. 스크립트의 최적
    수명(max-age)을 결정하고 유효 토큰(ETag)를 제공하여
    변경되지 않은 바이트 전송을 방지합니다.
    * 서비스 워커 캐싱은 앱 네트워크의 회복력을 높이고
      [V8의 코드
      캐시](https://v8project.blogspot.com/2015/07/code-caching.html)와 같은 원하는 기능에 접근할 수 있도록 합니다.
    * 장기적인 캐싱을 사용하여 변경되지
      않은 리소스를 다시 가져오는 일을 방지합니다. 웹팩을 사용하는 경우, [파일 이름
      해싱](https://webpack.js.org/guides/caching/)을 참조하세요.

## 파싱/컴파일

일단 다운로드되면, 자바스크립트의 **가장 큰** 비용 중 하나는 JS
엔진이 이 코드를 **파싱/컴파일**하는 시간입니다. [Chrome
DevTools](/web/tools/chrome-devtools/)에서는 파싱과 컴파일이 Performance 패널 내 노란색
"스크립팅" 시간에 포함됩니다.

<img src="images/1__4gNDmBlXxOF2-KmsOrKkw.png"/>

Bottom-Up 및 Call Tree 탭은 정확한 파싱/컴파일 타이밍을 보여줍니다.

<figure> <img src="images/1_GdrVt_BTTzzBOIoyZZsQZQ.png"/> <figcaption> Chrome
DevTools Performance 패널 > Bottom-Up. V8의 Runtime Call Stats가 활성화되면
Parse and Compile 등의 단계에서 걸리는 시간을 볼 수 있습니다 </figcaption> </figure>

참고: Runtime Call Stats를 지원하는 Performance 패널은 현재 시험용입니다.
활성화하려면, chrome://flags/#enable-devtools-experiments -> Chrome 다시 시작 ->
DevTools로 이동 -> Settings -> Experiments -> Shift 6번 입력 ->
`Timeline: V8 Runtime Call Stats on Timeline`이라는 옵션 체크 후 DevTools를 닫고 다시 엽니다.

그런데, 이것이 왜 중요할까요?

<img src="images/1_Dirw7RdQj9Dktc-Ny6-xbA.png"/>

코드 파싱/컴파일에 오랜 시간을 소모하는 것은 사용자가 여러분의 사이트와
상호작용을 시작할 수 있는 시간을 크게 지연시킵니다. 더 많은 자바스크립트를 전송할수록
사이트를 이용할 수 있기까지 파싱과 컴파일에 더 많은 시간이 소요됩니다.

> 바이트별로 보면, **자바스크립트는 같은 크기의 이미지나 웹폰트보다
> 브라우저가 처리하는 비용이 많이 듭니다** — Tom Dale

자바스크립트와 비교하면
같은 크기의 이미지(여전히 디코딩 필요) 처리에는 수많은 비용이 들지만, 평균적인 모바일
하드웨어에서는 자바스크립트가 페이지 상호작용에 부정적인 영향을 미칠 가능성이 더 높습니다.

<figure> <img src="images/1_PRVzNizF9jQ_QADF5lQHpA.png"/> <figcaption>자바스크립트
및 이미지 바이트는 매우 다른 비용이 듭니다. 이미지는 보통 기본
스레드를 차단하거나 디코딩 및 래스터링 중에
인터페이스의 상호작용을 방지하지 않습니다. 그러나 자바스크립트는 파싱, 컴파일,
실행 비용으로 인해 상호작용성을 지연시킵니다.</figcaption> </figure>

파싱과 컴파일이 느리다고 할 때의 맥락이 중요합니다. 여기서는
**평균적인** 모바일 전화에 관해 이야기하고 있습니다. **평균적인 사용자는 CPU 및 GPU가 느리고, L2/L3 캐시가 없으며 메모리
제약도 있는 전화를
가지고 있을 수 있습니다.**

> 네트워크 성능과 기기의 성능이 항상 일치하는 것은 아닙니다. 우수한 광통신에 연결된 사용자일지라도
> 기기에 전송되는 자바스크립트를 파싱 및 평가하는 데 필요한
> 최고의 CPU를 가지고 있지 않을 수 있습니다. 그 반대의 경우도
> 마찬가지입니다. 네트워크 연결은 열악하지만 매우 빠른 CPU를 보유하고 있을 수 있습니다. — Kristofer
> Baxter, LinkedIn

아래는 저가 하드웨어 및 고급 하드웨어에서
1MB 미만의 압축 해제된(심플) 자바스크립트의 파싱 비용을 나타낸 것입니다. **시중에서 판매 중인 가장 빠른 기종의 전화기와 평균적인 기종의
코드 파싱/컴파일링 시간은 약 2~5배 정도 차이가 납니다**.

<figure> <img src="images/1_8BQ3bCYu1AVvJWPR1x8Yig.png"/> <figcaption>이 그래프는
데스크탑과 여러 등급의 휴대기기에서
자바스크립트의 1MB 번들(~250KB gzip됨)에 대한 파싱 시간을 강조 표시한 것입니다. 파싱
비용을 볼 때, 압축 해제된 크기를 고려해야 합니다. 예를 들어, ~250KB gzip으로 압축된 자바스크립트는
~1MB의 코드로 압축 해제됩니다.</figcaption></figure>

CNN.com과 같은 실제 사이트는 어떤가요?

**CNN의 자바스크립트 파싱/컴파일이 평균적인 전화(Moto G4)에서 최대 13초 걸리는 데 비해
고급 iPhone 8에서는 최대 4초밖에 걸리지 않습니다**. 이는 사용자가
얼마나 빠르게 해당 사이트와 완벽하게 상호작용할 수 있는지에 상당한 영향을 미칩니다.

<figure> <img src="images/1_7ysArXJ4nN0rQEMT9yZ_Sg.png"/> <figcaption>위에서
Apple의 A11 바이오닉 칩의 성능을
평균적인 Android 하드웨어의 Snapdragon 617과 비교한 파싱 시간을 볼 수 있습니다.</figcaption> </figure>

이 내용은 여러분이 사용하는 전화가 아니라 **평균적인** 하드웨어(Moto
G4 등)에서 테스트하는 것의 중요성을 잘 나타냅니다. 컨텍스트도 중요하지만,
**사용자가 보유한 기기와 네트워크 조건에 대해 최적화해야 합니다.**

<figure> <img src="images/1_6oEpMEi_pjRNjmtN9i2TCA.png"/> <figcaption>Google
애널리틱스에서 여러분의 실제 사용자가 사이트에 접근하는 데 사용하는 <a
href="https://crossbrowsertesting.com/blog/development/use-google-analytics-find-devices-customers-use/">휴대
기기 등급</a>의 통계를 제공합니다. 이 정보는
사용자가 이용하는 실제 CPU/GPU의 제약을 이해하는 데
도움이 됩니다.</figcaption></figure>


**너무 많은 자바스크립트를 전송하고 있지는 않나요? 음, 그럴지도 몰라요 :)**

HTTP 아카이브(상위 최대 500,000개 사이트)를 사용하여 [모바일의
자바스크립트](http://beta.httparchive.org/reports/state-of-javascript#bytesJs) 상태를 분석하면, 50%의 사이트가 상호작용에 도달하기까지
14초 이상이 소요된다는 것을 알 수 있습니다. 이러한 사이트는 자바스크립트의 파싱 및 컴파일링에만
최대 4초를 소모합니다.

<img src="images/1_sVgunAoet0i5FWEI9NSyMg.png"/>

자바스크립트와 기타 리소스를 가져오고 처리하는 데 드는 시간을 고려하면,
사용자가 페이지를 사용할 수 있다고 느끼기 전까지 한동안
기다려야 하는 것은 당연합니다. 이 부분은 확실히 개선할 수 있습니다.

**페이지에서 필수적이지 않은 자바스크립트를 제거하여 전송
시간, CPU를 많이 소모하는 파싱과 컴파일, 잠재적인 메모리 오버헤드를 감소시킬 수 있습니다. 또한,
페이지가 더 빠르게 상호작용할 수 있게 됩니다.**

## 실행 시간

비용이 드는 것은 파싱과 컴파일뿐만이 아닙니다. **자바스크립트
실행**(파싱/컴파일 후 코드 실행)은
기본 스레드에서 발생해야 하는 작업 중 하나입니다. 긴 실행 시간 역시 사용자가 사이트를 이용할 수 있게 되는 데
걸리는 시간을 늘립니다.

<img src="images/1_ec0wEKKVl7iQidBks3oDKg.png"/>

> 스크립트가 50ms 이상 실행되면 상호작용까지의 시간(time-to-interactive)이
> 자바스크립트를 다운로드, 컴파일, 실행하는 데 걸리는 *전체* 시간만큼 지연됩니다 —
> Alex Russell

이 문제를 해결하기 위해 자바스크립트는 **작은 크기**의 이점을 이용하여
기본 스레드에 고정되는 것을 방지합니다. 실행 중 얼마나 많은 작업을 줄일 수 있는지
탐색해 보세요.

## 기타 비용

자바스크립트는 다른 방식으로 페이지 성능에 영향을 미칠 수 있습니다.

* 메모리. GC(가비지
컬렉션) 때문에 페이지에 쟁크(jank) 현상이 일어나거나 일시적으로 중지되는 일이 자주 있는 것처럼 보일 수 있습니다. 브라우저가 메모리를 회수할 때, 자바스크립트 실행이 일시 정지되어, 가비지를 자주 수집하는
  브라우저가 원하는 것 보다 더 자주
  실행을 멈출 수 있습니다. [메모리 누수](/web/tools/chrome-devtools/memory-problems/)
  및 잦은 gc 중지를 방지하여 페이지에 쟁크 현상이 일어나지 않게 하세요.
* 런타임 시, 장기 실행 중인 자바스크립트는 기본 스레드를 차단하여
  페이지가 반응하지 않게 됩니다. 작업을 작은 조각으로(스케줄링에
  <code><a
  href="/web/fundamentals/performance/rendering/optimize-javascript-execution#use_requestanimationframe_for_visual_changes">requestAnimationFrame()</a></code>
  또는 <code><a
  href="/web/updates/2015/08/using-requestidlecallback">requestIdleCallback()</a></code>
  사용) 나눔으로써 응답 문제를 최소화할 수 있습니다.

## 자바스크립트 전달 비용 감소 패턴

자바스크립트의 파싱/컴파일 및 네트워크 전송 시간을
느리게 유지하고자 할 때 도움이 되는 경로 기반 청킹 또는
[PRPL](/web/fundamentals/performance/prpl-pattern/)과 같은 패턴이 있습니다.

### PRPL

PRPL(푸시, 렌더링, 사전 캐시, 지연 로드)는 적극적인 코드 분할 및 캐싱을 통해
상호작용을 최적화하는 패턴입니다.

<img src="images/1_VgdNbnl08gcetpqE1t9P9w.png"/>

이 패턴이 미칠 수 있는 영향을 시각화해 봅시다.

V8의 Runtime Call Stats를
사용하여 인기 있는 모바일 사이트 및 프로그레시브 웹 앱의 로드 타임을 분석했습니다. 보시다시피, 파싱 시간(주황색 표시)이
이러한 여러 사이트가 소비하는 시간의 상당 부분을 차지합니다.

<img src="images/1_9BMRW5i_bS4By_JSESXX8A.png"/>

PRPL을 이용하는 사이트인 [Wego](https://www.wego.com)는 경로의 파싱 시간을 낮게 유지하여
매우 빠르게 상호작용합니다. 위의
여러 다른 사이트는 자바스크립트
비용을 낮추기 위해 코드 분할 및 성능 예산을 적용했습니다.


### 점진적 부트스트랩

많은 사이트가 상호작용에 많은 비용을 들여 콘텐츠 가시성을 최적화합니다. 개발자는
대규모 자바스크립트 번들이 있을 때 빠르게 첫 번째 페인트를 가져오기 위해
때때로 서버 측 렌더링을 사용하며, 최종적으로 자바스크립트를 가져오면 이를 '업그레이드'하여 이벤트
핸들러에 첨부합니다.

주의하세요. 이 방식도 비용이 발생합니다. 왜냐하면 1) 일반적으로 *더 큰* HTML
응답을 전송하는데 이 때문에 상호작용이 지연될 수 있고, 2) 사용자는 자바스크립트가 처리를 마칠 때까지
환경의 절반이 실제로는 상호작용이 되지 않는
모호하고 불안한 상태에 빠진 채 방치될 수 있기 때문입니다.

점진적 부트스트랩은 더 나은 접근 방식입니다. 최소한의
기능 페이지(현재 경로에서 필요한 HTML/자바스크립트/CSS만으로 구성)를 전송합니다.
더 많은 리소스가 도착하면, 앱이 더 많은 기능을 지연 로드하고 개방할 수 있습니다.

<figure> <img src="images/1_zY03Y5nVEY21FXA63Qe8PA.png"/> <figcaption> <a
href="https://twitter.com/aerotwist/status/729712502943174657">점진적
부트스트랩</a> by Paul Lewis </figcaption> </figure>

누구나 보이는 부분에 비례하여 코드를 로딩하는 것을 원합니다. PRPL 및
점진적 부트스트랩은 이것을 달성하는 데 도움이 되는 패턴입니다.

## 결론

**전송 크기는 저사양 네트워크에 매우 중요합니다. 파싱 시간은
CPU 바운드 기기에 중요합니다. 이 값을 낮게 유지하는 것이 중요합니다.**

팀에서 엄격한 성능 예산을 적용함으로써
자바스크립트 전송 및 파싱/컴파일 시간을 낮게 유지하는 데 성공했습니다. 모바일 예산에 대한 지침은 Alex Russell의 "[Can You
Afford It?: Real-world Web Performance
Budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)"을
참조하세요.

<figure> <img src="images/1_U8PJVNrA_tYADQ6_S4HUYw.png"/> <figcaption>이 문서는
우리가 결정한 아키텍처가 앱 로직에 얼마나 자바스크립트 '헤드룸'을 제공하는지 고려하는 데
유용합니다.</figcaption> </figure>

휴대기기를 대상으로 사이트를 빌드하는 경우, 대표적인 하드웨어에서
개발할 수 있도록 최선을 다하고
자바스크립트 파싱/컴파일 시간을 낮게 유지하며, 자바스크립트 비용을 주시할 수 있도록 하는 성능 예산을
적용해야 합니다.

## 자세히 알아보기

* [Chrome Dev Summit 2017 - Modern Loading Best
  Practices](https://www.youtube.com/watch?v=_srJ7eHS3IM)
* [JavaScript Start-up
  Performance](https://medium.com/reloading/javascript-start-up-performance-69200f43b201)
* [Solving the web performance
  crisis](https://nolanlawson.github.io/frontendday-2016/) — Nolan Lawson
* [Can you afford it? Real-world performance
  budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/)
  — Alex Russell
* [Evaluating web frameworks and
  libraries](https://twitter.com/kristoferbaxter/status/908144931125858304) —
  Kristofer Baxter
* [Cloudflare’s Results of experimenting with
  Brotli](https://blog.cloudflare.com/results-experimenting-brotli/) 압축
 관련(참고: 더 높은 품질에서는 동적 Brotli가 초기 페이지
  렌더링을 지연시킬 수 있으므로 신중하게 평가해야 합니다. 그런 경우에는 대신 통계적인
  압축을 하는 것이 나을 것입니다.)
* [Performance
  Futures](https://medium.com/@samccone/performance-futures-bundling-281543d9a0d5)
  — Sam Saccone
