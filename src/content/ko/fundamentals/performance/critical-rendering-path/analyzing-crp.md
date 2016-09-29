project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 크리티컬 렌더링 패스 성능의 병목 현상을 식별하고 해결하는 법을 배웁니다.

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# 크리티컬 렌더링 패스 성능 분석하기 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


크리티컬 렌더링 패스 병목을 식별하고 해결하기 위해서는 여러 함정이나 문제들에 대한 이해도가 있어야 합니다.
페이지를 최적화 할 수 있는 흔한 성능 패턴들을 알아보고 손에 익혀봅니다.


크리티컬 렌더링 패스를 최적화 하는 목적은 브라우저가 페이지를 최대한 빨리 그리게 하기 위해서 입니다:
빠른 페이지는 높은 사용율과, 페이지 조회수, [improved conversion](https://www.google.com/think/multiscreen/success.html) 를 이끕니다.
결과적으로, 우리는 페이지 방문자가 빈 스크린을 멍하게 쳐다보고 있는 시간을 최소하 하기 위해 리소스들의 로딩 순서들을 최적화 해야합니다.

이 과정을 상세히 설명하기 위해서, 가장 간단한 케이스 부터 시작하여 페이지에 리소스, 스타일, 어플리케이션 로직들을 차근차근 추가하겠습니다 - 또한 과정 중에 잘못될 수 있는 부분과 그 점들을 어떻게 바로 잡아 최적화 할 수 있는지 살펴봅니다.

마지막으로 시작하기에 앞서 한가지 더 볼 부분은, 여태까지 우리는 일단 CSS, JS, HTML 파일과 같은 리소스들을 로딩하면 브라우저에서 어떤 일이 일어나는 지 집중해서 살펴보았고, 캐쉬나 네트워크에서 페치하는 시간에 대해서는 신경쓰지 않았습니다.

다음 레슨에서는 네트워킹 관점에서 어플리케이션을 어떻게 최적화 하는지 자세하게 알아볼 것입니다. 그동안 더 현실적으로 하기 위해 아래 상황들을 가정합니다:

* 서버로 가는 네트워크 왕복 지연속도는 100ms입니다.
* 서버 응답 시간은 HTML 다큐멘트에 대해 100ms가 걸리고 다른 파일들은 10ms가 걸립니다.

## Hello World 경험하기

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

간단하게 기본적인 HTML 마크업과 한 개 이미지 파일로 시작을 합니다. - CSS랑 Javascript는 포함하지 않습니다 -
그리고 Chrome DevTools에서 Network timeline를 열고 resulting resource waterfall을 검사합니다.

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

예상대로, HTML 파일은 다운로드 하는데 ~200ms 가 걸렸습니다. 이 그림에서 투명한 파란색 선이 의미하는 것은 브라우저가 네트워크에서 대기하고 있는 시간입니다. - 예. 응답 바이트가 아직 오지 않음 - 반면 진한 부분은 첫 응답 바이트가 수신되고 난 후에 다운로드가 끝난 시간을 보여줍니다. 위 예제에서 HTML 다운로드 양은 매우 작기 때문에 **(<4K)**, 전체 파일을 페치하기 위한 1번의 왕복을 하면 됩니다. 결과적으로, HTML 다큐멘트는 페치를 하려면 ~200ms 가 걸리고 이 시간 중 절반은 네트워크에서 대기 하는 시간에서 사용되고, 절반은 서버 응답에 사용됩니다.

HTML 컨텐츠를 사용할 수 있게되면, 브라우저는 바이트를 토큰으로 변환하고 DOM 트리를 생성합니다. DevTools은 개발자가 편하게 볼 수 있도록 DOMContentLoaded 이벤트 시간(216ms)을 아래에 표기해줍니다. 수직으로 그려진 파란색 선과 HTML 다운로드 완료 점의 사이 시간에는 브라우저가 DOM 트리를 그리는 시간을 의미합니다, 이 경우에는 몇 milliseconds 가 걸릴 뿐입니다.

마지막으로, 흥미로운 점을 보자면: "awesome photo" 가 domContentLoaded 이벤트를 방해하지 않았다는 것입니다!
이러한 의미는 페이지의 모든 자원에 대해서 기다려야 할 필요 없이 렌더 트리를 생성 및 페이지 그리기가 가능하다는 것이죠: **모든 리소스가 페이지를 처음 그리는데 크리티컬 하지 않는다는 의미**. 사실, 크리티컬 렌더링 패스를 말할 떄는 일반적으로 HTML 마크업, CSS, Javascript 등을 의미 합니다. 이미지는 페이지의 초기 렌더링을 방해하지 않습니다 - 비록, 물론 이미지도 렌더링 속도를 지연시키지 않게 최대한 빨리 그려야 합니다.

그렇더 하더라도, "load" 이벤트 ("onload"로 잘 알려진)는 이미지 로딩시 까지 기다려야 합니다: DevTools에서 onload 이벤트는 335ms에서 실행된다고 알려줍니다. onload 이벤트가 페이지에서 요청한 모든 자원들을 다 다운로드 받고 처리 되었을 때 실행되는 것을 주목하세요 - 이 시점이 브라우저에 나타나는 로딩 스피너가 회전을 멈추는 시점이자 위 표에서 빨간색 수직 선이 가리키는 곳입니다.


## Javascript와 CSS를 함께 추가하기

"Hello World experience" 페이지의 화면은 간단해 보일지 모릅니다. 하지만, 이 화면을 그리기 위해 겉에서 보이지 않지만 브라우저 내에서 많은 것들이 동작을 하고 있습니다. 이처럼, 실습에서는 HTML외에 다른 것도 필요합니다: CSS 스타일시트와 페이지에 상호 인터렉션을 추가하기 위해 한 개 이상의 스크립트가 필요합니다. 두 개 모두 페이지에 추가해보고 어떤 일이 일어나는지 화인해봅니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_Javascript와 CSS를 추가하기 전:_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_Javascript와 CSS를 추가한 후:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

외장 CSS와 Javscript 파일들을 추가하면 위의 기존 표에 두 개의 추가 요청이 추가됩니다, 두 개 모두 브라우저에서 거의 비슷한 시간에 처리를 합니다.
그러나, **이제는 기존의 표와 다르게 domContentLoaded와 onload이벤트에 매우 조그만한 시간 차이가 발생합니다. 무슨 일이 일어난 걸까요?**

* plain HTML 예제와는 다르게, CSSOM 생성을 위해 CSS 파일을 페치하고 파싱해야 합니다. 그리고 렌더 트리를 그리기 위해 DOM과 CSSOM이 필요합니다.
* 우리가 parser blocking 인 Javscript 파일을 페이지에 추가했기 때문에, domContentLoaded 이벤트는 CSS 파일이 다운로드되고 파싱이 완료될 때 까지 수행되지 않습니다. 따라서, 우리는 Javascript를 실행하기 전에 CSS가 다운로드 되기까지 기다려야 합니다.

**만약 우리가 외장 스크립트를 인라인 스크립트로 바꾸면 어떻게 될까요?** 겉으로 보기에는 사소한 질문처럼 보일지 모르나 사실은 매우 까다롭습니다.
페이지에 인라인 스크립트가 들어가더라도 그 스크립트가 어떤 것을 의도하고 있는지를 브라우저가 아는 가장 믿음직한 방법은 스크립트를 실행시키는 것입니다.
그리고 이 스크립트의 실행은 CSSOM 생성이 완료될 때 까지 대기하고 있게 됩니다. 짧게 말해서, 인라인 Javascript 또한 parser blocking 입니다.

CSS에 진행에 방해를 받더라도 인라인 스크립트가 페이지 렌더링을 빠르게 할까요? 만약 마지막 시나리오가 까다로웠다면, 이번에 저희가 다룰 내용은 더 어려울 수 있습니다. 한번 같이 살펴보시죠...

_외장 Javascript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_인라인 Javascript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM, and inlined JS" class="center">

아래 표에서 요청을 한 번 더 적게 보내지만, onload 와 domContentLoaded 시간이 거의 같습니다. 왜 그럴까요?
그 이유는 Javascript가 인라인이건 외장이건 상관 없기 때문입니다. 브라우저는 스크립트 태그를 만나자마자 CSSOM이 생성될 때까지 대기할 것입니다.
나아가서, 첫 번째 예제를 보면 브라우저가 CSS와 Javascript를 나란히 다운로드 하고, 거의 같은 시각에 완료됩니다.
결과적으로, 이 특정 경우에는 인라인 Javascript가 별로 도움이 되지 못합니다. 우리가 페이지를 빠르게 렌더링하기 위해 할 수 있는게 없는 걸까요?
사실 몇 가지 전략이 있긴 합니다.

첫 번째, 모든 인라인 스크립트가 parser blocking 이라는 것을 기억하세요. 하지만 외장 스크립트에 "async" 키워드를 추가하면 parser를 방해하지 않습니다. 인라인 스크립트를 취소하고 이렇게 한번 해볼까요.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

_Parser-blocking (외장) JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Async (외장) JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, async JS" class="center">

훨씬 낫네요! `domContentLoaded` 이벤트는 HTML이 파싱이 된 바로 후에 실행됩니다: 브라우저는 Javascript에 방해받지 않고, parser blocking 스크립트가 없기 때문에 CSSOM 생성이 병행으로 이루어집니다.

대안으로, 다른 방법으로 접근하여 인라인 CSS, Javascript를 사용할 수 있습니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, inline CSS, inline JS" class="center">

`domContentLoaded` 시간은 이전 예제와 거의 비슷합니다: Javascript에 async 속성을 추가하는 대신에, CSS와 JS를 모두 페이지에 인라인 처리하였습니다. 이렇게 해서 HTML 페이지가 훨씬 커졌지만, 좋은 면은 페이지 안에 필요한 자원들이 있기 때문에 브라우저가 외부 리소스 페치를 기다릴 필요가 없어집니다.

이처럼, 매우 간단한 페이지로도 크리티컬 렌더링 패스를 최적화 하는 것은 그리 평범하지 않은 절차입니다: 서로 다른 리소스 간의 디펜던시 그래프를 이해하는 것이 필요합니다. 어떤 리소스가 "크리티컬" 한지 식별해야하고, 어떻게 그 리소스들을 페이지에 포함 시킬지 전략을 세워야 합니다. 이러한 문제에 대해서 한가지 답만 있는 것이 아닙니다 - 모든 페이지가 다 다르기 때문에 최적화 할 수 있는 방안을 찾을 수 있도록 위처럼 비슷한 단계를 거쳐야 합니다.

이렇다 하더라도, 혹시 우리가 위 절차에서 몇가지 일반적인 성능 패턴을 찾을 수 있는지 봅시다...

## 성능 패턴

가장 간단한 페이지는 HTML 마크업으로만 이루어져 있습니다: CSS, Javascript 및 다른 리소스는 전혀 없습니다.
이 페이지를 렌더링 하기 위해서 브라우저는 요청을 초기화 하고, HTML 다큐멘트가 다운될 때 까지 기다리고, 파싱하고, DOM을 생성하고, 마지막으로 화면에 뿌려줍니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom.png" alt="Hello world CRP" class="center">

**T<sub>0</sub> 와 T<sub>1</sub> 시간 사이에 일어나는 네트워크 요청과 서버 처리 시간들을 표현하였습니다.** 최상의 시나리오는 (HTML 파일이 작다고 가정), 전체 다큐먼트를 페치하기 위한 네트워크 요청이 왕복으로 한번만 필요할 것입니다 - TCP 전송프로토콜 동작방식 때문에, 용량이 큰 파일들은 아마 더 많은 왕복요청이 필요할 것입니다. 이 부분에 대해서는 나중에 다른 강의에서 다루겠습니다. **결과적으로, 최선의 시나리오에서 최소 왕복 요청 크리티컬 패스를 갖게 됩니다.**

자 이제 같은 구조에서 외장 CSS 파일만 추가된 페이지를 봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

다시 한번, HTML 다큐멘트를 페치하기 위한 네트워크 왕복 요청을 발생시킵니다. 그리고 수신된 마크업에서 CSS 파일도 필요하다는 것을 알게됩니다: 이것은 브라우저가 서버로 다시 가서 화면에 페이지를 렌더하기 전에 CSS 파일을 얻어와야 한다는 걸 의미합니다. **결과적으로, 이 페이지는 페이지가 화면에 표시되기 전에 최소 2번의 네트워크 왕복 요청을 발생시킵니다.** - 다시 한번 말하지만, CSS 파일이 아마 여러번의 왕복요청이 필요할 수 있으니 앞에서 최소 2번이라고 언급하였습니다.

크리티컬 렌더링 패스를 표현하기 위해서 사용할 용어들을 정의해봅시다.

* **크리티컬 리소스:** 페이지 초기 렌더링을 저해하는 리소스
* **크리티컬 패스 길이:** 네트워크 왕복 수, 모든 크리티컬 리소스를 페치하기 위해 필요한 전체 시간
* **크리티컬 바이트:** 페이지 첫 렌더링을 하기 위해 필요한 모든 바이트의 양. 크리티컬 리소스 파일 크기의 전체 합.

위에 설명한 첫 번째 예제에서 HTML 페이지 (1개의 크리티컬 리소스인 HTML 다큐멘트를 포함하고 있음), 이 예제의 크리티컬 패스 길이는 1 번의 네트워크 왕복과 같습니다 (파일이 작다고 했을 때),
그리고 전체 크리티컬 바이트는 HTML 다큐멘트 전송 크기와 같습니다.

이 첫 번째 예제와 위의 HTML + CSS 예제를 비교해봅시다:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

* **2** 크리티컬 리소스
* **2** 개 또는 그 이상 왕복 (최소 크리티컬 패스 길이를 위함)
* **9** KB 의 크리티컬 바이트

렌더 트리를 그리기 위해서 HTML과 CSS 두개가 필요합니다. 따라서, HTML과 CSS 모두 크리티컬 리소스 입니다:
CSS는 브라우저가 HTML 다큐멘트를 처리한 후에만 페치됩니다, 그렇기 때문에 크리티컬 패스 길이는 최소 2 왕복이 됩니다; 두개 리소소 크기의 합은 9KB의 크리티컬 바이트가 됩니다.

자 이제 Javascript 파일을 여기에 추가해봅시다!

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" adjust_indentation="auto" %}
</pre>

페이지에 외부 Javascript 자원인 app.js를 추가하였습니다, 아마 다들 아시겠지만 이건 parser blocking (달리 말하면, 크리티컬 리소스) 입니다.
더 나쁜 상황인 것은, Javscript 파일을 실행하기 위해서 처리를 멈추고 CSSOM를 기다려야 합니다 - Javascript 가 CSSOM 을 제어할 수 있기 때문에 브라우저가 "style.css"가 다운로드 되고 CSSOM이 생성될 때 까지 기다리는 것을 기억하세요.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" class="center">

이처럼, 예제에서 보면 이 페이지의 "network waterfall"을 봤을 때, CSS와 Javascript 요청이 거의 비슷한 시각에 일어난다는 것을 알게됩니다:
브라우저가 HTML을 받고나면, 두 리소스를 발견하고 요청을 날립니다. 결과적으로, 위 페이지는 아래의 크리티컬 패스 특성을 갖습니다:

* **3** 크리티컬 리소스
* **2** 개 또는 그 이상의 네트워크 왕복
* **11** KB 의 크리티컬 바이트

자 이제 11KB의 크리티컬 바이트에 해당하는 3개의 크리티컬 리소스를 갖게 되었습니다. 하지만 크리티컬 패스 길이는 여전히 2번의 왕복입니다 왜냐하면 우린 CSS와 Javascript를 모두 동시에 전송할 수 있기 떄문이죠!
**크리티컬 렌더링 패스 특성을 파악하는 것은 어떤 리소스가 크리티컬 하고 브라우저가 자원을 어떤 순서로 페치하고 처리하는 지 이해하는 것과 같습니다.**
다른 예제도 살펴봅시다.

저희 웹 사이트 개발자와 얘기를 나누고 나니, 저희 페이지에 포함된 Javascript가 렌더링을 방해하는 요인이 되지 않을 수 있다는 것을 알게 되었습니다:
몇 가지 분석과 페이지에 있는 코드가 페이지 렌더링을 방해하지 않게 할 수 있는 법을 알게됩니다.
그 중 한 가지가 "async" 속성을 스크립트 태그에 추가하여 파싱을 방해하지 않도록 하는 것입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, async JavaScript CRP" class="center">

비동기 스크립트는 몇가지 이점이 있습니다:

* 비동기 스크립트는 파서를 방해하지 않고, 크리티컬 렌더링 패스에 포함되지 않습니다.
* 스크립트가 크리티컬 자원이 아니기 때문에, CSS는 domContentLoaded 이벤트를 막을 필요가 없습니다.
* domContentLoaded 이벤트가 빨리 실행 될수록, 다른 어플리케이션 로직이 빨리 시작될 수 있습니다.

결과적으로, 우리의 최적화된 페이지는 다시 HTML,CSS 2개의 크리티컬 리소스, 2번의 네트워크 왕복 크리티컬 패스 길이, 전체 9KB의 크리티컬 바이트만 갖게됩니다.

마지막으로, CSS 스타일시트가 프린트 할 시에만 필요하다고 하면 어떻게 될까요?

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, non-blocking CSS, and async JavaScript CRP" class="center">

style.css 리소스는 프린트 시에만 사용되기 때문에, 브라우저는 페이지 렌더링을 할 때 이 스타일시트를 거치지 않아도 됩니다.
고로, DOM이 생성되자마자, 브라우저는 페이지를 렌더하기 위한 필요 리소스들을 다 갖게 됩니다. 결론적으로, 페이지는 오직 HTML 한 개의 크리티컬 리소스, 1번의 네트워크 왕복 크리티컬 패스 길이를 갖게됩니다.

Translated By: 
{% include "web/_shared/contributors/captainpangyo.html" %}
