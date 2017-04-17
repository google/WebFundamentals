project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 주요 렌더링 경로 성능 병목 현상을 식별하고 해결하는 방법을 배워보세요.

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# 주요 렌더링 경로 성능 분석 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

주요 렌더링 경로 성능 병목 현상을 식별하고 해결하려면 
흔히 있는 함정들에 대해 잘 파악하고 있어야 합니다. 실습 과정을 통해 
페이지를 최적화하는 데 도움이 되는 일반적인 성능 패턴을 
알아보도록 하겠습니다.


주요 렌더링 경로를 최적화하게 되면 브라우저가 가능한 한 빨리 페이지를 그릴 수 있습니다. 더 빠른 페이지는 더 높은 몰입도, 더 많은 페이지 조회 수 및 [전환율 향상](https://www.google.com/think/multiscreen/success.html)으로 이어집니다. 방문자가 빈 화면에서 보내는 시간을 최소화하기 위해 어떤 리소스를 어떤 순서로 로드할지 최적화해야 합니다.

이 프로세스를 설명하는 데 도움이 되도록 가능한 가장 간단한 사례부터 시작하고 점차적으로 페이지를 확대하여 추가 리소스, 스타일 및 애플리케이션 로직을 포함해 보도록 하겠습니다. 이 프로세스에서 우리는 각 사례를 최적화하고 어떤 부분이 잘못될 수 있는지도 살펴볼 것입니다.

지금까지 우리는 처리할 리소스(CSS, JS 또는 HTML 파일)가 준비가 되면 브라우저에 어떤 일이 일어나는지에 대해서만 초점을 맞췄습니다. 캐시나 네트워크에서 리소스를 가져오는 데 걸리는 시간을 무시했습니다. 우리는 다음 사항을 가정할 것입니다.

* 서버에 대한 네트워크 왕복 시간(전파 지연 시간)은 100ms입니다.
* 서버 응답 시간은 HTML 문서의 경우 100ms이고 기타 모든 파일의 경우 10ms입니다.

## Hello World 체험

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

기본적인 HTML 마크업과 하나의 이미지로 시작해 보겠습니다. CSS 또는 자바스크립트는 포함하지 않습니다. Chrome DevTools에서 네트워크 타임라인을 열고 결과로 나타나는 리소스 워터폴(waterfall)을 검토합니다.

<img src="images/waterfall-dom.png" alt=""  alt="CRP">

참고: 이 문서에서는 CRP 개념을 설명하기 위해 DevTools를 사용하지만
현재는 DevTools가 CRP 분석에 잘 맞지 않습니다. 자세한 내용은 [DevTools
소개](measure-crp#devtools)를 참조하세요.

예상대로, HTML 파일의 다운로드 시간은 약 200ms가 걸렸습니다. 파란색 선의 투명한 부분은 브라우저가 응답 바이트를 수신하지 않고 네트워크에서 대기하는 시간을 나타내는 반면, 진한 부분은 첫 응답 바이트가 수신된 후에 다운로드가 완료된 시간을 보여줍니다. HTML 다운로드 크기는 매우 작기 때문에(4K 미만) 전체 파일을 가져오기 위해서는 한 번의 왕복만 필요합니다. 따라서 HTML 문서를 가져오려면 약 200ms가 걸립니다. 이 시간 중 절반은 네트워크에서 대기하는 데 사용되고 절반은 서버 응답에서 대기하는 데 사용됩니다.

HTML 콘텐츠를 사용할 수 있게 되면 브라우저가 바이트를 파싱하고 토큰으로 변환한 후 DOM 트리를 빌드합니다. DevTools는 개발자가 편하게 볼 수 있도록 DOMContentLoaded 이벤트 시간(216ms)을 맨 아래에 표시합니다. 이는 파란색 수직선에 해당합니다. HTML 다운로드 완료 시점과 파란색 수직선(DOMContentLoaded) 사이의 격차는 브라우저가 DOM 트리를 빌드하는 데 소요된 시간을 나타냅니다. 이 경우에는 몇 밀리초만 걸립니다.

'awesome photo'가 `domContentLoaded` 이벤트를 차단하지 않았다는 점에 주목하세요. 이는 페이지의 각 자산을 기다릴 필요 없이 렌더링 트리를 생성하고 페이지를 그릴 수 있음을 의미합니다. **일부 리소스는 페이지를 신속하게 처음 그리는 데 중요하지는 않습니다**. 실제로, 우리가 주요 렌더링 경로에 대해 이야기할 때 일반적으로 HTML 마크업, CSS 및 자바스크립트에 대해 언급합니다. 이미지는 페이지의 초기 렌더링을 차단하지 않습니다. 물론 이미지를 가능한 한 빨리 그리도록 해야 합니다.

하지만 `load` 이벤트(`onload`라고도 불림)는 이미지에서 차단됩니다. DevTools는 335ms에 `onload` 이벤트를 보고합니다. `onload` 이벤트는 페이지에 필요한 **모든 리소스**가 다운로드되고 처리되는 시점을 표시한다는 것을 기억하세요. 이 시점에서 로딩 스피너가 브라우저에서 회전을 멈출 수 있습니다(워터폴에서 빨간색 수직선).


## 자바스크립트 및 CSS를 함께 추가

'Hello World 체험' 페이지는 단순해 보이지만 자세히 들여다보면 많은 일들이 벌어지고 있습니다. 실제로는 HTML 외에 다른 것도 필요합니다. 아마 페이지에 일부 상호작용을 추가하기 위해 CSS 스타일시트와 하나 이상의 스크립트가 필요할 것입니다. 이 두 가지를 모두 추가해보고 어떤 일이 일어나는지 확인해봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_timing.html){: target="_blank" .external }

_자바스크립트 및 CSS 추가 전:_

<img src="images/waterfall-dom.png" alt="DOM CRP" >

_자바스크립트 및 CSS 추가 후:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center" >

외부 CSS 및 자바스크립트 파일을 추가하면 위의 워터폴에 두 개의 요청이 더 추가됩니다. 두 개 모두 브라우저가 거의 같은 시간에 발송합니다. 하지만, **`domContentLoaded`와 `onload` 이벤트 간에 훨씬 작은 시간 차이가 있습니다.**

무슨 일이 일어난 걸까요?

* 일반 HTML 예시와 달리 CSSOM을 생성하기 위해 CSS 파일도 가져오고 파싱해야 하며, 렌더링 트리를 빌드하기 위해 DOM과 CSSOM이 모두 필요합니다.
* 페이지에는 또한 파서 차단 자바스크립트 파일이 포함되기 때문에, CSS 파일이 다운로드되어 파싱될 때까지 `domContentLoaded` 이벤트가 차단됩니다. 자바스크립트가 CSSOM을 쿼리할 수도 있기 때문에, 자바스크립트를 실행하기 전에 CSS 파일이 다운로드될 때까지 차단해야 합니다.

**외부 스크립트를 인라인 스크립트로 바꾸면 어떻게 될까요?** 스크립트가 페이지에 바로 인라인 처리되더라도, CSSOM이 생성될 때까지는 브라우저가 이 스크립트를 실행할 수 없습니다. 간단히 말해서, 인라인 자바스크립트도 파서를 차단합니다.

CSS를 차단하더라도 스크립트를 인라인 처리하면 페이지 렌더링 속도가 빨라질까요? 같이 살펴보고 어떠한 일이 일어나는지 확인해봅시다.

_외부 자바스크립트:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center" >

_인라인 자바스크립트:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM 및 인라인 JS" >

요청을 하나 더 적게 수행하지만 `onload` 및 `domContentLoaded` 시간은 거의 같습니다. 그 이유는 무엇일까요? 그 이유는 자바스크립트가 인라인이든 외부이든 상관이 없기 때문입니다. 브라우저는 스크립트 태그를 만나자마자 스크립트 실행을 차단하고 CSSOM이 생성될 때까지 대기합니다. 또한 첫 번째 예시에서 브라우저가 CSS 및 자바스크립트를 동시에 다운로드하고 거의 동일한 시간에 다운로드를 완료합니다. 이 경우 자바스크립트 코드를 인라인 처리해도 그다지 도움이 되지 못합니다. 그러나 페이지 렌더링 속도를 높일 수 있는 여러 가지 전략이 있습니다.

첫째, 모든 인라인 스크립트가 파서를 차단하지만 외부 스크립트의 경우 'async' 키워드를 추가하여 파서의 차단을 해제할 수 있다는 점을 기억하세요. 인라인 처리를 취소하고 다음과 같이 해봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_async.html){: target="_blank" .external }

_파서 차단(외부) 자바스크립트:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center" >

_비동기(외부) 자바스크립트:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, 비동기 JS" >

훨씬 낫네요! `domContentLoaded` 이벤트는 HTML이 파싱된 후 바로 실행됩니다. 브라우저가 자바스크립트를 차단하지 않는다는 것을 알고 있고 다른 파서 차단 스크립트가 없으므로 CSSOM 생성 또한 동시에 처리될 수 있습니다.

또는 CSS와 자바스크립트를 모두 인라인 처리할 수도 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/measure_crp_inlined.html){: target="_blank" .external }

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, 인라인 CSS, 인라인 JS" >

`domContentLoaded` 시간은 이전의 예시와 거의 비슷합니다. 자바스크립트를 비동기로 표시하는 대신 CSS와 JS를 모두 페이지 내에 인라인으로 추가했습니다. 이로 인해 HTML 페이지가 더 커지지만, 장점은 페이지 안에 필요한 모든 요소가 있기 때문에 브라우저가 외부 리소스를 가져올 때까지 기다릴 필요가 없다는 점입니다.

이처럼, 아주 단순한 페이지더라도 주요 렌더링 경로를 최적화하는 것은 사소한 문제가 아닙니다. 서로 다른 리소스 간의 의존성 그래프를 파악해야 하며, 어떤 리소스가 '중요'한지 식별해야 하고, 이러한 리소스를 페이지에 포함할 방법에 대한 다양한 전략 중에서 선택해야 합니다. 이 문제를 해결할 수 있는 방법이 한 가지만 있는 것은 아닙니다. 각 페이지가 서로 다르기 때문에 자신만의 유사한 프로세스에 따라 최적의 전략을 찾아야 합니다.

이제 위의 과정에서 몇 가지 일반적인 성능 패턴을 찾을 수 있는지 살펴봅시다.

## 성능 패턴

가장 간단한 페이지는 CSS, 자바스크립트 및 기타 유형의 리소스 없이 HTML 마크업으로만 이루어져 있습니다. 이 페이지를 렌더링하려면 브라우저가 요청을 시작하고, HTML 문서가 도착할 때까지 기다리고, 해당 문서를 파싱하고, DOM을 빌드한 후 최종적으로 화면에 렌더링해야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom_nostyle.html){: target="_blank" .external }

<img src="images/analysis-dom.png" alt="Hello world CRP" >

**T<sub>0</sub>와 T<sub>1</sub> 사이의 시간은 네트워크 및 서버 처리 시간을 나타냅니다.** 최상의 경우(HTML 파일이 작을 경우) 한 번의 네트워크 왕복만으로 전체 문서를 가져옵니다. TCP 전송 프로토콜의 작동 방식으로 인해 큰 파일은 더 많은 왕복이 필요할 수 있습니다. **결과적으로, 최상의 경우 위 페이지는 (최소) 1회 왕복의 주요 렌더링 경로를 갖게 됩니다.**

이제 외부 CSS 파일이 추가된 동일한 페이지를 살펴보도록 하겠습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css.html){: target="_blank" .external }

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

다시 한 번, HTML 문서를 가져오기 위한 네트워크 왕복을 발생시킵니다. 그러면 가져온 마크업이 CSS 파일도 필요하다고 알려줍니다. 즉, 브라우저가 화면에 페이지를 렌더링하기 전에 서버로 돌아가서 CSS를 가져와야 합니다. **따라서, 이 페이지는 표시되기 전에 최소 두 번의 왕복이 발생합니다.** 다시 말하자면 CSS 파일은 여러 번의 왕복이 필요할 수 있으므로 '최소'라는 표현을 썼습니다.

주요 렌더링 경로를 설명하기 위해 우리가 사용할 용어에 대한 정의를 살펴보겠습니다.

* **주요 리소스:**페이지의 초기 렌더링을 차단할 수 있는 리소스입니다.
* **주요 경로 길이:**왕복 횟수, 또는 모든 주요 리소스를 가져오는 데 필요한 총 시간입니다.
* **주요 바이트:**페이지의 최초 렌더링에 필요한 총 바이트 수로, 모든 주요 리소스에 대한 전송 파일 크기의 합계입니다.
단일 주요 리소스(HTML 문서)가 포함된 단일 HTML 페이지로 구성된 첫 번째 예시에서 주요 경로 길이는 한 번의 네트워크 왕복과 같으며(파일이 작다고 가정했을 때) 총 주요 바이트 수는 HTML 문서의 전송 크기입니다.

이제, 위에 나오는 HTML + CSS 예시의 주요 경로 특성과 비교해봅시다.

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" >

* **2**개의 주요 리소스
* **2**번 이상의 왕복(최소 주요 경로 길이)
* **9**KB의 주요 바이트

렌더링 트리를 생성하기 위해서는 HTML과 CSS가 모두 필요합니다. 따라서 HTML과 CSS는 모두 주요 리소스입니다. CSS 가져오기는 브라우저가 HTML 문서를 가져온 후에만 수행됩니다. 따라서 주요 경로 길이는 최소 2번의 왕복입니다. 두 리소스 크기의 합은 총 9KB의 주요 바이트입니다.

이제 여기에 자바스크립트 파일을 하나 더 추가해봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js.html){: target="_blank" .external }

우리는 `app.js`를 추가했습니다. 이것은 페이지에서 외부 자바스크립트 자산이자 파서 차단 리소스(즉, 주요 리소스)입니다. 더 안 좋은 경우, 자바스크립트 파일을 실행하기 위해 작업을 차단하고 CSSOM이 처리될 때까지 기다려야 합니다. 자바스크립트가 CSSOM을 처리할 수 있기 때문에 `style.css`가 다운로드되고 CSSOM이 생성될 때까지 브라우저가 일시 중지된다는 것을 기억하세요.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, 자바스크립트 CRP" >

하지만 실제로는 이 페이지의 '네트워크 워터폴'을 보면 CSS와 자바스크립트 요청이 모두 거의 같은 시간에 시작된다는 것을 알 수 있습니다. 브라우저가 HTML을 가져오고 두 리소스를 검색한 후 두 요청을 모두 실행합니다. 결과적으로, 위 페이지는 다음 주요 경로 특성을 갖습니다.

* **3**개의 주요 리소스
* **2**번 이상의 왕복(최소 주요 경로 길이)
* **11**KB의 주요 바이트

이제 총 11KB의 주요 바이트에 해당하는 3개의 주요 리소스를 갖게 되었습니다. 하지만 주요 경로 길이는 여전히 2번 왕복입니다. 그 이유는 CSS와 자바스크립트를 동시에 전송할 수 있기 때문입니다. **주요 렌더링 경로 특성을 파악하면 주요 리소스를 식별할 수 있으며 브라우저가 이에 대한 가져오기 작업을 예약하는 방식을 이해할 수 있습니다.** 다른 예시도 살펴보도록 하겠습니다.

우리는 Google 사이트 개발자와 얘기를 나눈 후 페이지에 포함한 자바스크립트를 차단할 필요가 없다는 사실을 알게 되었습니다. 몇 가지 분석 방법과 페이지 렌더링을 차단할 필요가 없는 다른 코드가 있습니다. 즉, 'async' 속성을 스크립트 태그에 추가하여 파서 차단을 해제할 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, 비동기 자바스크립트 CRP" >

비동기 스트립트는 여러 가지 이점이 있습니다.

* 스크립트가 더 이상 파서를 차단하지 않고 주요 렌더링 경로에 포함되지 않습니다.
* 주요 스크립트가 없기 때문에 CSS가 `domContentLoaded` 이벤트를 차단할 필요가 없습니다.
* `domContentLoaded` 이벤트가 빨리 실행될수록 다른 애플리케이션 로직도 빨리 실행될 수 있습니다.

그 결과, 최적화된 페이지가 이제 다시 2개의 주요 리소스(HTML 및 CSS), 최소 2번 왕복의 주요 경로 길이, 총 9KB의 주요 바이트를 갖게 됩니다.

마지막으로, CSS 스타일시트가 인쇄에만 필요하다면 어떻게 보일까요?

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/analysis_with_css_nb_js_async.html){: target="_blank" .external }

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, 미차단 CSS 및 비동기 자바스크립트 CRP" >

style.css 리소스는 인쇄에만 사용되기 때문에 브라우저가 페이지를 렌더링하기 위해 차단할 필요가 없습니다. 따라서, DOM 생성이 완료되자마자 브라우저가 페이지를 렌더링하는 데 충분한 정보를 갖게 됩니다. 그 결과, 이 페이지는 하나의 주요 리소스(HTML 문서)만 가지며, 최소 주요 렌더링 경로 길이는 1회 왕복이 됩니다.

<a href="optimizing-critical-rendering-path" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Optimizing CRP">
  <button>다음 차례: 주요 렌더링 경로 최적화</button>
</a>


{# wf_devsite_translation #}
