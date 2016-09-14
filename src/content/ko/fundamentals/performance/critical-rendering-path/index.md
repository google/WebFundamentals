project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 사용자가 페이지에서 행하는 주요 동작과 관련있는 콘텐츠를 우선 노출하여 크리티컬 렌더링 패스를 최적화하는 방법을 설명합니다.

{# wf_review_required #}
{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# 크리티컬 렌더링 패스(Critical Rendering Path) {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Translated By: 

{% include "web/_shared/contributors/jeokrang.html" %}
{% include "web/_shared/contributors/captainpangyo.html" %}



<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    사용자가 페이지에서 행하는 주요 동작과 관련있는 콘텐츠를 우선 노출하여 크리티컬 렌더링 패스를 최적화하는 방법을 설명합니다.
    <p>
      빠른 웹 경험을 사용자에게 제공하기 위해서 브라우저는 많은 작업을 합니다. 하지만 이 작업의 대부분은 웹 개발자인 우리가 볼 수 없는 곳에서 이루어집니다. 그냥 마크업을 작성하면 멋진 페이지가 스크린에 나올 뿐이죠. 그렇다면 브라우저는 어떻게 정확히 HTML, CSS, JavaScript를 스크린에 픽셀로 그리는 걸까요?
    </p>
  </div>
  
## Website Performance Optimization
<div class="attempt-right">
  <figure>
    <img src="images/crp-udacity.png">
  </figure>
</div>

Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages.

[View Course](https://udacity.com/ud884){: .external }


</div>

성능을 최적화 한다는 말은 HTML, CSS, Javascript 코드를 받아 이를 모두 픽셀로 화면에 그리는 과정 중간 중간을 이해하는 것입니다. 이게 바로 **크리티컬 렌더링 패스** 입니다.

<img src="images/progressive-rendering.png" class="center" alt="progressive page rendering">

크리티컬 렌더링 패스를 최적화하면 페이지 최초 렌더링 시간을 크게 향상시킬 수 있습니다. 게다가, 크리티컬 렌더링 패스에 대한 이해를 토대로 좋은 인터랙션을 가진 애플리케이션을 만들 수도 있습니다. 대화식 업데이트 처리과정은 단지 이상적인 초당 60프레임으로 작업을 계속해서 반복하는 것과 같습니다. 하지만 아직 결론 내리기에는 이릅니다. 먼저 브라우저가 어떻게 간단한 페이지를 화면에 그리는지 간략한 개요를 살펴봅시다.


## 객체 모델 생성 



Translated By: 



브라우저는 페이지를 렌더링 하기 전에 DOM과 CSSOM 트리를 구축합니다. 따라서 HTML과 CSS를 가능한 한 빨리 브라우저에게 전달해야 합니다.



### TL;DR {: .hide-from-toc }
- 바이트 → 문자 → 토큰 → 노드 → 객체 모델.
- 'HTML 마크업을 문서 객체 모델(DOM)로, CSS 마크업을 CSS 객체 모델(CSSOM)로 변환합니다.'
- DOM과 CSSOM은 서로 별개로 존재하는 데이터 구조입니다.
- '크롬 개발자 도구 타임라인을 이용해서 DOM과 CSSOM 구축, 처리 비용에 대한 데이터를 수집하고 검사할 수 있습니다.'


### 문서 객체 모델(Document Object Model, DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" %}
</pre>

아주 간단한 예제를 가지고 이야기해 봅시다. 어떤 텍스트와 간단한 이미지가 있는 단순한 HTML 페이지가 있습니다. 이 페이지를 브라우저는 어떻게 처리할까요?

<img src="images/full-process.png" alt="DOM construction process">

1. **변환:** 브라우저는 디스크나 네트워크로부터 HTML를 바이트 코드로 그대로 읽어들여 지정된 파일 인코딩 값에 따라 개별 문자로 변환합니다(예, UTF-8).
1. **토큰화:** 문자 스트링을 [W3C HTML5 standard](http://www.w3.org/TR/html5/)가 지정하고 있는 고유 토큰으로 변환합니다. "<html>", "<body"> 그리고 꺽쇠 괄호 안에 있는 다른 문자열들이 여기에 해당합니다. 각각의 토큰은 특별한 의미와 규칙을 갖습니다.
1. **렉싱:** 토큰을 "객체"로 변환합니다. 이 객체는 자신의 프로퍼티와 규칙을 정의합니다.
1. **DOM 구축:** HTML 마크업이 정의하고 있는 다른 태그들 사이의 관계(어떤 태그는 다른 태그의 하위에 존재합니다)를 표현하고 있기 때문에, 마지막으로 위에서 만든 객체를 트리 데이터 구조로 연결하면 객체가 원래 마크업이 정의하고 있는 것처럼 부모-자식 관계를 가질 수 있습니다. _HTML_ 객체는 body 객체의 부모이고, _body_ 객체는 _paragraph_ 객체의 부모입니다.

<img src="images/dom-tree.png" class="center" alt="DOM tree">

**전체 과정를 거친 마지막 산출물이 바로 이 간단한 페이지의 문서 객체 모델(Document Object Model), "DOM"입니다.브라우저는 이후 페이지를 추가 처리할 때 이 DOM을 사용합니다.**

브라우저는 HTML 마크업을 처리할 때마다 위의 단계를 수행합니다. 바이트를 문자로 바꾸고, 토큰을 식별해서 노드로 변경한 다음, 노드를 가지고 DOM 트리를 만듭니다. 이 전체 과정을 수행하는 데 약간의 시간이 걸리며, 처리해야 할 HTML 페이지가 클 경우에는 시간이 더 필요합니다.

<img src="images/dom-timeline.png" class="center" alt="Tracing DOM construction in DevTools">

Note: 이 글은 독자가 크롬 개발자 도구를 이용해서 네트워크 워터폴 차트를 수집하거나 타임라인을 기록하는 등의 기본적인 사용법을 알고 있다고 가정하고 있습니다. 빠르게 다시 한 번 개발자 도구 사용법을 보고 싶다면 <a href='https://developer.chrome.com/devtools'>크롬 개발자 도구 문서</a>를 확인하세요. 개발자 도구를 처음 다뤄본다면 Codeschool이 제공하는 <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> 코스를 학습할 것을 추천합니다.

브라우저가 페이지를 불러오는 동안에 크롬 개발자 도구를 열어서 타임라인을 기록해보면, 실제 이 작업 수행시간을 확인할 수 있습니다. 위에 있는 예제 HTML 마크업을 HTML 바이트에서 DOM 트리로 변환하는 데는 5ms가 걸렸습니다. 물론 페이지가 더 컸다면 수행 시간은 더 길어졌을 겁니다. 브라우저가 처리해야하는 HTML의 양이 많을 때 애니메이션은 쉽게 병목을 일으킵니다. 뒤에 나올 섹션에서 애니메이션을 부드럽게 만드는 방법을 살펴봅니다.

DOM 트리가 준비되었으니 이제 페이지를 하면에 렌더링 할 수 있을까요? 아니오, 아직 부족합니다! DOM 트리는 마크업의 프로퍼티와 마크업 간의 관계에 대한 정보를 가지고 있지만, 각 요소들을 어떻게 화면에 그려야 할 지에 대한 정보는 전혀 가지고 있지 않습니다. 이러한 정보는 다음에 나올 CSSOM이 가지고 있습니다.

### CSS 객체 모델(CSS Object Model, CSSOM)

브라우저는 DOM을 구축하면서 문서의 head에 있는 외부 CSS 스타일시트를 참조하는 link 태그를 만납니다. 페이지를 렌더링하는 데 이 자원이 필요할 것이라고 판단한 브라우저는 즉각 자원을 요청하고, 요청의 결과로 아래의 콘텐츠가 돌아옵니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full"   adjust_indentation="auto" %}
</pre>

물론 HTLM 마크업 내에 직접(inline) 스타일을 선언할 수도 있지만, CSS를 HTML에서 분리해서 콘텐츠와 디자인을 별도의 관심사로 처리할 수 있습니다. 이렇게 함으로써 디자이너는 CSS, 개발자는 HTML 등 디자인이 아닌 다른 부분에 집중할 수 있습니다.

HTML과 마찬가지로 CSS도 브라우저가 이해하고 처리할 수 있는 무언가로 변환해야 합니다. 브라우저는 이전에 HTML을 처리할 때 했던 것과 비슷한 과정을 다시 한 번 반복합니다.

<img src="images/cssom-construction.png" class="center" alt="CSSOM construction steps">

브라우저는 CSS 바이트를 문자열로 변환해서 토큰과 노드를 만들고 마지막으로 각 노드를 연결하여 "CSS 객체 모델(CSS Object Model)" 또는 줄여서 CSSOM으로 불리는 트리를 구조를 만듭니다.

<img src="images/cssom-tree.png" class="center" alt="CSSOM tree">

왜 CSSOM을 트리 구조로 구성하는 걸까요? 페이지에 있는 어떤 객체의 최종 스타일을 계산할 때, 브라우저는 처음에 가장 일반적인 규칙을 노드에 적용(예를 들어, body의 자식 엘리먼트에게 body의 모든 스타일을 적용)한 다음, 더 구체화된 하위 스타일 규칙을 반영하여 계산한 스타일을 재귀적으로 노드에 재적용합니다. 즉, "cascade down" 방식으로 규칙을 적용하기 때문에 CSSOM을 트리 구조로 만듭니다.

좀 더 구체화하기 위해서 위에 있는 CSSOM 트리를 살펴봅시다. body 태그 안에 있는 _span_ 태그가 가지고 있는 텍스트의 폰트 사이즈는 16 픽셀이고 색상은 빨간색입니다. font-size 지시자를 body에서 span까지 하향식으로 적용하기 때문입니다. 하지만 span 태그가 p 태그의 자식이라면, 브라우저는 이를 화면에 표시하지 않을 것입니다.

그리고 위에 있는 트리는 완전한 CSSOM 트리가 아니라는 사실을 명심하십시오. 기본 스타일을 덮어쓰기 위해서 스타일시트에 작성한 스타일만을 보여주고 있을 뿐입니다. 모든 브라우저는 사용자가 아무런 스타일도 작성하지 않았을 때 볼 수 있는 "user agent styles"라는 기본 스타일 세트를 제공합니다. 사용자가 작성하는 스타일은 간단하게 이런 기본 스타일을 덮어씁니다(예, [기본 IE 스타일](http://www.iecss.com/)). 크롬 개발자 도구에서 "computed styles"을 검사하다가 자신이 지정하지 않은 스타일이 어떻게 적용되어 있는 건지 궁금한 적이 있었다면 여러분은 지금 그 궁금증을 해결했습니다.

CSS 처리 시간은 얼마나 걸릴까요? 크롬 개발자 도구의 타임라인을 기록하고 "Recalculate Style" 이벤트를 보십시오. DOM을 해석할 때와 다르게 타임라인에 "Parse CSS" 과정을 따로 구분해서 볼 수 없습니다. 대신 CSS 해석과 CSSOM 트리 구축 시간에 계산한 스타일을 재귀적으로 적용하는 시간을 더해서 하나의 이벤트로 묶어서 보여줍니다.

<img src="images/cssom-timeline.png" class="center" alt="Tracing CSSOM construction in DevTools">

위에 있는 작은 스타일시트를 처리하는 데는 0.6ms가 걸리며, 이 스타일시트는 페이지 내에 있는 8개의 엘리먼트에 영향을 미칩니다. 긴 시간은 아니지만 공짜는 아닙니다. 그런데 엘리먼트 8개는 어디에서 왔을까요? CSSOM과 DOM은 서로 별개인 데이터 구조입니다. 그렇습니다. 감춰진 중요한 단계가 있습니다. 다음 섹션에서 DOM과 CSSOM을 연결하는 렌더 트리에 대해서 함께 이야기하겠습니다.




## 렌더 트리(Render-tree) 생성, 레이아웃(Layout), 페인트(Paint) 



Translated By: 



브라우저는 CSSOM과 DOM 트리를 결합해서 만든 렌더 트리를 만듭니다. 그리고 화면에 출력할 엘리먼트의 레이아웃(Layout)을 계산하여 화면에 픽셀을 그리는 페인트(Paint) 단계를 수행할 때 렌더트리를 입력 값으로 사용합니다. 최상의 렌더링 성능을 얻으려면 이 과정을 최적화해야 합니다.


객체 모델을 생성하는 과정을 다뤘던 이전 섹션에서, HTML, CSS를 가지고 DOM과 CSSOM 트리를 만들었습니다. 하지만 이 두 개의 트리는 문서의 다른 부분을 담당하는 상호 별개인 객체로서 DOM은 콘텐츠를, CSSOM은 문서에 적용할 스타일 규칙을 담당합니다. 어떻게 하면 두 객체를 하나로 합쳐서 브라우저가 화면에 픽셀을 그리게 할 수 있을까요?

### TL;DR {: .hide-from-toc }
- DOM과 CSSOM 트리를 결합해서 렌더 트리를 만듭니다.
- 렌더 트리는 화면에 출력할 노드만 가지고 있습니다.
- 레이아웃은 객체의 정확한 위치와 크기를 계산하는 과정입니다.
- 페인트는 다 만들어진 렌더 트리를 가져다 화면에 픽셀을 그리는 마지막 단계입니다.


첫번째 단계로 브라우저는 DOM과 CSSOM을 결합해서 "렌더 트리"를 만듭니다. 렌더 트리는 페이지에서 사용자가 볼 수 있는 모든 DOM 정보를 가지고 있으며, 여기에 더해 각 노드의 CSSOM 스타일 정보까지 가지고 있습니다.

<img src="images/render-tree-construction.png" alt="DOM and CSSOM are combined to create the render tree" class="center">

브라우저는 대략 아래의 과정을 거쳐서 렌더 트리를 구성합니다.

1. DOM 트리의 루트에서 시작해서 화면에 그려야 할 노드(visible node)를 하나씩 탐색합니다.
* 브라우저가 화면에 출력하지 않는 일부 노드(script 태그, meta 태그 등)는 렌더링 할 때 반영하지 않으므로 건너뜁니다.
* CSS로 감춘 노드 역시 렌더 트리에 포함하지 않습니다. 예를 들어, 위의 예제에서 span 노드가 그렇습니다. "display:none" 프로퍼티를 부여하는 규칙을 span에 지정했기 때문입니다.
1. 위에서 찾은 노드에 적합한 CSSOM 규칙을 찾아서 적용합니다.
1. 계산한 스타일(computed style) 정보와 콘텐츠를 가지고 있는 노드를 렌더 트리에 넣습니다.

Note: 여기서 잠깐, 'visibility: hidden'과 'display: none'이 다르다는 것에 주의하세요. 전자(visibility: hidden)는 엘리먼트를 화면에서 감추기만 할 뿐 레이아웃에서 제거하지는 않습니다(비어있는 공간으로 존재). 반면에 후자(display:none)는 엘리먼트를 화면에서 감추고, 레이아웃에서도 분리함으로써 엘리먼트를 렌더 트리에서 완전히 제거합니다.

최종 결과물인 렌더트리는 화면에 보이는 모든 콘텐츠의 내용과 스타일 정보를 가지고 있습니다. **렌더 트리를 만들었으니 "레이아웃" 단계로 넘어갈 수 있습니다.**

지금까지 화면에 출력해야 할 노드를 결정하고, 해당 노드의 스타일 값을 계산했습니다. 하지만 단말기의 [뷰포트(viewport)](/web/fundamentals/design-and-ui/responsive/#set-the-viewport) 안에서 노드가 가져야 할 정확한 위치와 크기는 계산하지 않았습니다. 이게 레이아웃 단계에서 할 일입니다. 레이아웃은 리플로우(reflow)라고 알려져 있기도 합니다.

객체의 정확한 크기와 위치를 파악하기 위해서 브라우저는 렌더 트리의 루트에서부 각 노드를 순회하면서 페이지에 있는 각 객체의 형상을 계산합니다. 간단한 실습 예제를 살펴봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" %}
</pre>

위에 있는 예제의 body는 두 개의 중첩 div를 가지고 있습니다. 첫번째 부모 div의 width는 뷰포트 width의 50%입니다. 자식 div의 width는 부모가 가지고 있는 width의 50%입니다. 즉, 뷰포트 width의 25%인 셈이죠.

<img src="images/layout-viewport.png" alt="Calculating layout information" class="center">

브라우저는 레이아웃 과정의 결과로 "박스 모델(box model)"을 만듭니다. 박스 모델은 뷰포트 안에 있는 각 엘리먼트의 정확한 위치와 크기를 가지고 있습니다. 이 때, 모든 상대적인 수치 값을 스크린 내의 절대 픽셀 위치 값 등등으로 변환합니다.

마침내 화면에 그릴 노드, 그 노드의 계산 스타일 그리고 형상까지 알아냈습니다. 이제 이 정보를 마지막 단계로 전달해서 렌더트리의 각 노드를 화면 상의 실제 픽셀로 변환합니다. 이 단계를 보통 페인팅(painting) 또는 래스터라이징(rasterizing)이라고 부릅니다.

여기까지 잘 따라오셨나요? 각 단계를 수행할 때 브라우저는 적지 않은 작업을 합니다. 그래서 가끔 시간이 꽤 많이 걸릴 수도 있습니다. 고맙게도 크롬 개발자 도구를 이용하면 위에서 이야기한 세 단계에 대한 정보를 얻을 수 있습니다. "hello world" 예제의 레이아웃 과정을 분석해 봅시다.

<img src="images/layout-timeline.png" alt="Measuring layout in DevTools" class="center">

* 타임라인의 "Layout" 이벤트가 렌더 트리 구축과 위치, 크기 계산을 나타냅니다.
* 레이아웃을 마친 다음에 브라우저는 "Paint Setup"과 "Paint"를 진행해서 렌더 트리를 화면 위에 실제 픽셀로 그립니다.

렌더 트리 구축, 레이아웃, 페인트를 수행하는 데 필요한 시간은 문서의 크기, 적용한 스타일, 실행한 단말기에 따라 다릅니다. 문서가 크면 클수록 브라우저가 해야할 일이 더 많아지겠죠. 더 복잡한 스타일을 적용하려면 더 많은 시간을 페인팅 작업에 써야 할 것입니다(예를 들어 단색을 그리는 일은 "저렴"하지만, 그림자 효과를 주는 일은 계산하고 그리는 데 훨씬 더 "비싼" 비용을 들여야 합니다).

이제 모든 과정이 끝이났습니다. 드디어 뷰포트에 우리가 만든 페이지가 나왔네요. 유후!

<img src="images/device-dom-small.png" alt="Rendered Hello World page" class="center">

지금까지 설명한 내용의 요점을 빠르게 다시 짚어 보겠습니다.

1. HTML 마크업을 해석해서 DOM 트리를 만듭니다.
1. CSS 마크업을 해석해서 CSSOM 트리를 만듭니다.
1. DOM과 CSSOM을 결합해서 렌더 트리를 만듭니다.
1. 렌더 트리에 레이아웃을 수행해서 각 노드의 형상을 계산합니다.
1. 화면에 개별 노드를 그립니다.

이렇게 간단해 보이는 데모 페이지를 처리하는 데에도 많은 작업이 필요하다는 사실을 알았습니다! DOM이나 CSSOM을 변경하면 어떻게 될까요? 브라우저는 화면에 다시 그려야 하는 픽셀 정보를 알아내기 위해서 같은 과정을 또 반복합니다.

**크리티컬 렌더링 패스 최적화는 위에 있는 1단계에서 5단계까지 수행하는 데 걸리는 시간을 최소화하는 과정입니다.** 그렇게하면 브라우저가 콘텐츠를 빠르게 화면에 그릴 수 있습니다. 또한 초기 렌더링 후에 화면을 갱신하는 시간도 줄일 수 있습니다. 즉, 대화형 콘텐츠의 리프레시 속도를 더 높일 수 있습니다.




## 렌더링을 블록 하는 CSS 



Translated By: 




기본적으로 CSS는 렌더링을 블록 시키는 자원으로 여겨집니다, 그것은 브라우저가 CSSOM이 형성될 때까지 어떠한 컨텐츠에 대한 렌더링도 중지 한다는 것을 뜻합니다. 반드시 CSS를 가볍게 유지하고, 가능한 빨리 전달하세요. 그리고 렌더링을 블록 하지 않도록 미디어 타입과 쿼리를 사용하세요.

지난 섹션에서 크리티컬 렌더링 패스가, 성능에 있어 중요한 영향을 가지고 있는 렌더 트리를 만들기 위한 DOM과 CSSOM을 필요로 하는 것을 봤습니다: **HTML과 CSS모두 렌더링을 블록 하는 자원들입니다.** HTML은 DOM이 없으면 렌더링 할 것이 없기 때문에 분명합니다. 그런데 CSS는 그에 비해 약간 불분명합니다. 일반적인 페이지에서 CSS에 대해 렌더링을 블록 하지 않고 렌더링 하려고 하면 무슨일이 벌어질까요?

### TL;DR {: .hide-from-toc }
- 기본적으로 CSS는 렌더링을 블록 시키는 자원으로 여겨집니다.
- 미디어 타입과 미디어 쿼리는 몇 가지 CSS 자원들에 대해 렌더링을 블록 하지 않게 해줍니다.
- '모든 CSS 자원은, 렌더링 블록 여부와 상관없이 브라우저로부터 다운로드 됩니다.'


<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes with CSS">
    <figcaption>The New York Times with CSS</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS">
    <figcaption>The New York Times without CSS (FOUC)</figcaption>
  </figure>
</div>

위의 예에서, CSS 없이 NYTimes를 보여주는것이, 왜 CSS가 사용 가능해질 때까지 렌더링이 블록 되어야 하는 지 설명합니다. CSS 없는 그 페이지는 효율적으로 사용이 불가능합니다. 사실, 오른쪽의 실험은 종종 "Flash Of Unstyled Content"(FOUC)로 언급됩니다. 결국, 브라우저는 DOM과 CSSOM이 생길때까지 렌더링을 블록합니다.

> **_CSS는 렌더링을 블록 하는 자원입니다, 처음 렌더링 되는 시간을 최적화하기 위해 클라이언트에게 가능한 최대한 빠르게 다운로드 되어야 합니다._**

그런데, 만약 우리가 분명한 몇 가지 조건하에서만 적용 하는 CSS 스타일이 있다면, 예를 들어, 페이지를 프린트 할 때, 큰 모니터에서 출력할 때? 우리는 이러한 자원들에 대해 렌더링을 블록 할 필요가 없었으면 좋을 것 같습니다.

CSS "미디어 타입"과 "미디어 쿼리"가 이러한 경우에 우리에게 그것을 허용해 줍니다:


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

 [미디어 쿼리](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) 는 미디어 타입과 0 또는 특정한 미디어 기능의 조건을 체크하는 더 많은 표현들로 구성됩니다. 예를 들어, 우리의 첫번째 스타일시트 정의는 미디어 타입 또는 쿼리를 제공하지 않습니다. 그러므로 그것은 모든 경우에 적용됩니다. 다시 말해서, 그것은 항상 렌더링을 블록합니다. 반면에 두번째 스타일 시트는 오직 그 컨텐츠가 프린트 될 때만 적용됩니다. 아마 당신은 레이아웃 재정렬, 폰트 변경, 등이 필요할 것입니다. 그리고 이러한 스타일시트는 처음 로드될 때 렌더링을 블록 하는것을 필요로 하지 않습니다. 마지막으로, 마지막 스타일 시트 정의는 브라우저에 의해 실행되는 "미디어 쿼리"를 제공합니다. 만약 조건이 맞으면, 브라우저는 스타일시트가 다운로드 되고 실행될 때까지 렌더링을 블록할 것입니다.

미디어 쿼리를 사용함으로서, 우리의 표현은 프린트나 디스플레이 같은 특정한 경우 뿐만 아니라 스크린 오리엔테이션, 리사이즈 이벤트 등과 같은 동적인 조건에도 맞춤형이 될 수 있습니다. **당신의 스타일 시트를 정의할 때, 미디어 타입과 쿼리에 많은 신경을 쓰세요, 그것들이 크리티컬 렌더링 패스에 엄청난 성능 효과를 가져올 수 있습니다!**

직접 해보는 예제로 생각해보죠:


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* 첫번째 선언은 모든 매칭되는 조건에 대해 렌더링을 블록합니다.
* 두번째 선언 또한 렌더링을 블록합니다: "all"은 기본 타입이며, 만약 type을 명시하지 않으면 암묵적으로 "all"로 설정됩니다. 그러므로 첫번째와 두번째 선언은 사실 똑같습니다
* 세번째 선언은 페이지가 로딩될때 평가되는 동적인 미디어 쿼리를 가집니다. 디바이스의 오리엔테이션에 따라 페이지가 로드되면, portrait.css는 렌더링을 블록할 수도 블록 하지 않을 수도 있습니다.
* 마지막 선언은 오직 페이지가 프린트 될 때만 적용됩니다. 그러므로 브라우저에 처음 페이지가 로드 될 때는 렌더링이 블록되지 않습니다.

마지막으로, "렌더링을 블록 하는것"은 브라우저가 페이지 자원들을 처음 렌더링 할 때 중지시켜야 할 지에 대해서만 관련이 있습니다. 어느 경우에나, CSS 자원들이 블록 하지 않는 자원들에 비해 비록 낮은 우선순위를 가지게 되더라도, 브라우저에 의해 여전히 다운로드 됩니다.


## 자바스크립트로 상호작용 더하기 



Translated By: 




자바스크립트는 컨텐츠, 스타일, 그리고 유저와의 상호작용과 같은 페이지의 모든 부분을 변경할 수 있게 해줍니다. 또한 자바스크립트는 DOM 생성을 블록 할 수 있고 페이지가 렌더링 될 때 지연 시킬 수도 있습니다. 최적화된 성능을 제공하기 위해 당신의 자바스크립트를 비동기로 만들고 크리티컬 렌더링 패스에서 불필요한 자바스크립트는 삭제하세요.

### TL;DR {: .hide-from-toc }
- 자바스크립트는 DOM과 CSSOM을 쿼리 또는 수정할 수 있습니다.
- 자바스크립트 실행은 CSSOM에 블록됩니다.
- 자바스크립트는 명시적으로 비동기 선언이 되지 않으면 DOM 생성을 막습니다.


자바스크립트는 브라우저에서 실행되고 페이지 동작에 관한 모든 면에 대해 수정이 가능한 동적인 언어입니다. 우리는 DOM 트리로부터 요소를 추가하거나 삭제함으로서 페이지 컨텐츠를 수정할 수 있고 각 요소의 CSSOM 속성들을 수정할 수 있습니다. 그리고 유저의 입력을 다루거나 더 많은 것들도 할 수 있습니다. 이러한 동작을 보여주기 위해, 예전의 " Hello world" 인라인 스크립트 예제를 더 확장시켜 봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" %}
</pre>

* 자바스크립트는 우리가 DOM에 접근할 수 있게 해주고 숨겨진 span 노드도 참조할 수 있도록 해줍니다. 그 숨겨진 노드는 아마 렌더트리에서 보이지 않을것 입니다. 그러나 DOM에는 여전히 존재합니다. 그렇게 한번 참조를 가지게 되면, 우리는 텍스트도 수정하고(.textContent를 통해) 심지어 계산된 디스플레이 스타일 속성도 'none'에서 'inline'으로 덮어쓰기 할 수 있습니다. 한번에 모든것이 말한대로 되었다면, 우리의 페이지는 "**Hello interactive students!**" 를 보여줄 것 입니다.

* 자바스크립트는 우리가 DOM에 새로운 요소를 생성, 스타일링, 그리고 추가 및 삭제를 할 수 있게 해줍니다. 사실, 기술적으로 우리의 전체 페이지는 요소를 하나씩 생성하고 스타일링하는 하나의 커다란 자바스크립트 파일이 될 수 있었습니다. 그것은 동작할것이지만, HTML, CSS를 이용하는것이 보통 더 쉽습니다. 우리의 자바스크립트 함수 두번째 파트에서 새로운 div 요소를 만들고, 그것의 텍스트 컨텐츠를 설정하고, 스타일링해서 body 태그에 붙입니다.

<img src="images/device-js-small.png" class="center" alt="page preview">

그것과 함께, 우리는 DOM에 이미 존재하는 노드의 컨텐츠와 CSS 스타일을 변경했습니다. 그리고 문서에 전체적으로 새로운 노드를 추가했습니다. 우리의 페이지는 어떠한 디자인상도 수상하진 않았지만, 자바스크립트가 우리에게 해줄 수 있는 힘과 유연성을 보여주었습니다.

그러나, 그 기저에는 숨겨진 커다란 성능 경고가 있습니다. 자바스크립트는 우리에게 많은 힘을 주지만, 페이지가 렌더링되는 때와 방법에 많은 추가적인 제약을 만듭니다.

먼저, 우리의 예제에서 인라인 스크립트는 페이지의 바닥에 가까웠음을 인지하세요. 왜냐하면, 음, 여러분은 스스로 해봐야 합니다. 만약 우리가 스크립트를 _span_ 요소 위로 움직이면, 여러분은 스크립트가 실패하고 문서에서 _span_ 요소를 찾을 수 없다는 불평을 보게 될 것입니다. 예를들어 _getElementsByTagName(‘span')_ 은 _null_ 을 리턴할 것입니다. 이것은 중요한 속성을 보여줍니다: 우리의 스크립트는 정확하게 문서에 삽입한 위치에서 실행된다는 것입니다. HTML 파서가 스크립트 태그를 만나면 파서는 DOM 생성을 중지하고 자바스크립트 엔진에게 그 컨트롤을 넘기게 됩니다. 자바스크립트 엔진이 실행을 완료하면, 브라우저는 떠났던 위치로 돌아와 다시 DOM 생성을 실행합니다.

다시 말해서, 우리의 스크립트는 블록은 아직 프로세스가 진행되지 않았기 때문에 페이지에서 어떤 요소도 찾지 못한것입니다. 비슷하게 다시 말하면: **인라인 스크립트의 실행이 DOM 생성을 막고, 첫 렌더링에 지연을 줄 것입니다.**

우리의 페이지를 통해 스크립트에 대해 소개할 또 다른 미묘한 점은 스크립트가 DOM뿐만 아니라 CSSOM 속성까지 읽고 수정할 수 있다는 것입니다. 사실, 이것은 span요소의 디스플레이 속성을 'none'에서 'inline'으로 변경함으로서 정확히 우리의 예제를 통해 한 것입니다. 그 결과는? 우리는 이제 경합 조건이 생겼습니다.

만약 브라우저가 CSSOM을 다운로드하고 빌드하는 것이 끝나지 않았을 때 우리의 자바스크립트가 실행되길 원하면 어떻게 될까요? 답은 간단하지만 성능에는 좋지 않습니다: **그 브라우저는 CSSOM을 다운로드하고 생성할 때 까지 스크립트 실행을 지연시킵니다. 그리고 우리가 기다리는 동안, DOM 생성 또한 블록됩니다.**

간단히 말해서, 자바스크립트는 DOM, CSSOM, 자바스크립트 실행과 같은 새로운 의존성을 소개합니다. 그리고 이것은 브라우저가 얼마나 빠르게 페이지를 프로세스하고 스크린에 렌더링하는 지에 대해 상당한 지연을 만들 수 있습니다.

 1. 문서에서 스크립트의 위치는 중요합니다.
 2. 한 스크립트 태그를 만났을 때 스크립트의 실행이 끝날때 까지 DOM 생성은 중지됩니다.
 3. 자바스크립트는 DOM과 CSSOM을 쿼리하고 수정할 수 있습니다.
 4. 자바스크립트 실행은 CSSOM이 준비될 때 까지 연기 됩니다.

 우리가 "크리티컬 렌더링패스의 최적화"를 이야기할 때, 상당 부분으로 HTML, CSS, 그리고 자바스크립트 의존성 그래프를 이해하고 최적화하는 것이 중요하다는 것을 말하고 있습니다.


### 파서의 블록 vs. 비동기적인 자바스크립트

기본적으로, 자바스크립트 실행은 "파서 블록"입니다: 브라우저가 문서안에서 스크립트 태그를 만났을 때, 그것은 반드시 DOM 생성을 중지시킵니다. 자바스크립트 런타임에게 컨트롤을 넘기고 자바스크립트가 실행되도록 둡니다. 이후에 DOM 생성을 진행합니다. 우리는 이전 예제를 통해 인라인스크립트가 이러한 동작을 하는것을 이미 봤습니다. 사실 인라인 스크립트는 당신이 특별한 주의를 가하고 실행을 지연시키기 위한 추가적인 코드를 덧붙이지 않으면 항상 파서를 블록시킵니다.

스크립트 태그를 통해 포함된 스크립트는 어떨까요? 우리의 이전 예제를 별도의 파일이 되도록 코드를 분리해보겠습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full"   adjust_indentation="auto" %}
</pre>

우리가 인라인 자바스크립트 조각을 사용하는 대신 `<script>`를 사용하면 실행 순서가 달라질 것이라 기대하시나요? 물론 대답은 "아니요"입니다. 그것들은 동일하며 같은 방식으로 동작 해야 합니다. 두가지 경우 모두 브라우저는 문서의 나머지 부분을 프로세스 하기 전에 정지하고 자바스크립트를 실행합니다. 그러나, **브라우저의 외부 자바스크립트파일인 경우에도 마찬가지로 정지하고 스크립트가 원격 서버 또는 캐쉬, 디스크로 부터 받아오기 까지 기다립니다. 그것들은 크리티컬 렌더링 패스에 몇 초의 시간을 더할 수도 있습니다.**

그 말은, 좋은 소식으로, 우리는 방법이 있다는 것입니다. 기본적으로 모든 자바스크립트는 파서를 블록하고 브라우저는 그 스크립트가 무엇을 할 지 모릅니다. 그러므로 브라우저는 최악의 시나리오를 가정하고 파서를 블록시키는 것입니다. 그러나 브라우저에게 그 스크립트는 문서에 위치한 정확한 때에 실행될 필요가 없다고 알려주면 어떻게 될까요? 그것은 브라우저에게 DOM을 생성을 계속하게 하고 자바스크립트는 준비가 됐을 때 실행하도록 허용해줍니다. 예를들어 자바스크립트 파일이 캐쉬나 원격 서버로부터 받아졌을 때 말입니다.

그래서 어떻게 이러한 트릭을 적용할까요? 매우 간단합니다 우리의 스크립트를 _async_ 표시해주면 됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" %}
</pre>

비동기 키워드를 스크립트에 추가하는 것은 스크립트를 다운로드 받고 이용가능할 때 까지 기다리는 동안 DOM 생성을 막지 말라고 브라우저에게 말해주는것 입니다. 이것이 성능의 커다란 개선을 가져다 줍니다.


## 네비게이션 타이밍으로 크리티컬 렌더링 패스 측정하기 



Translated By: 




여러분은 측정할 수 없는 것을 최적화 할 수는 없습니다. 고맙게도, 네비게이션 타이밍 API는
크리티컬 렌더링 패스의 각 단계 측정에 필요한 모든 툴들을 제공합니다.

### TL;DR {: .hide-from-toc }
- 네비게이션 타이밍 API는 크리티컬 렌더링 패스를 측정하기 위한 높은 정밀도의 타임스탬프를 제공합니다.
- 브라우저는 크리티컬 렌더링 패스의 다양한 스테이지를 나타내는 단발성 이벤트들을 발생시킵니다.


모든 단단한 성능 전략의 핵심은 훌륭한 측정과 도구입니다. 네비게이션 타이밍 API가 바로 그것입니다.

<img src="images/dom-navtiming.png" class="center" alt="Navigation Timing">

위에 있는 다이어그램의 각 라벨은 브라우저가 모든 페이지를 로드하면서 추적한 높은 정밀도의 타임스탬프입니다. 사실, 이 특정한 경우는 타임스탬프의 모든 다른 부분을 보여주고 있습니다. 지금은 모든 네트워크와 관련된 타임스탬프는 생략하고, 이후의 강의에서 돌아오도록 하겠습니다.

그래서, 이 타임스탬프들이 의미하는게 무엇일까요?

* `domLoading`: 이것은 모든 프로세스의 첫번째 타임스탬프입니다. 브라우저는 수신된 HTML문서의 첫 바이트를 파싱하려고 합니다.
* `domInteractive`: 브라우저가 모든 HTML과 DOM 생성을 완료했을 때를 표시합니다.
* `domContentLoaded`: DOM이 준비되고 자바스크립트 실행을 블록하는 스타일 시트가 없을 때 표시됩니다 - 렌더 트리를 (잠재적으로) 생성할 수 있음을 의미합니다.
    * 많은 자바스크립트 프레임워크는 자체적인 로직을 실행하기 전에 이 이벤트를 기다립니다. 이러한 이유로 브라우저는 `EventStart` 와 `EventEnd` 타임스탬프를 캡쳐해서 실행이 얼마나 걸렸는 지를 추적할 수 있게 해줍니다.
* `domComplete`: 이름에서 알 수 있듯이, 모든 프로세싱이 끝나고 페이지의 모든 자원 (이미지, 기타) 다운로드가 끝났을 때 입니다. -
  i.e. 로딩 스피너가 스피너를 끝냈을 때 입니다.
* `loadEvent`: 각 페이지 로드의 마지막 단계로 브라우저가 `onload` 이벤트를 발생시켜 추가적인 어플리케이션 로직을 실행할 수 있게 합니다.

HTML 명세서는 각각의 모든 이벤트에 대해서 언제 발생되어야 하는 지, 어떤 조건이 충족되어야 하는 지 등의 상세한 조건을 지시합니다. 우리의 목적상, 크리티컬 렌더링 패스에 관련된 중요한 몇가지 마일스톤에 대해서 집중하겠습니다.

* `domInteractive` DOM이 준비 되었을 때 입니다.
* `domContentLoaded` [DOM과 CSSOM이 모두 준비되었을 때](http://calendar.perfplanet.com/2012/deciphering-the-critical-rendering-path/)만 표시 됩니다.
    * 파서를 블록하는 자바스크립트가 없을 때 `DOMContentLoaded`는 `domInteractive` 바로 다음에 발생합니다.
* `domComplete` 페이지와 그 페이지에 속한 모든 자원들이 준비 되었을 때 표시됩니다.

<!-- Span required to prevent rest of page from being indented.
  https://github.com/google/WebFundamentals/issues/1873 -->
<span></span>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp.html" region_tag="full"   adjust_indentation="auto" %}
</pre>

위의 예제는 처음 보면 조금은 벅차보일 수 있지만, 사실은 매우 간단합니다. 네비게이션 타이밍 API는 모든 관련있는 타임스탬프를 캡쳐하고 우리의 코드는 `onload` 이벤트가 발생하기를 기다립니다. `onload` 이벤트는 `domInteractive`, `domContentLoaded` 그리고 `domComplete` 이벤트 후에 오는것을 상기하세요. 그리고 다양한 타임스탬프 사이의 차이점을 계산합니다.

<img src="images/device-navtiming-small.png" class="center" alt="NavTiming demo">

모든것이 말한대로 되었다면, 우리는 추적하기 위한 몇 가지 특정한 마일스톤과 그 결과를 출력하기 위한 간단한 함수가 생겼습니다. 페이지에 이러한 결과를 출력하는것 대신 여러분은 코드를 수정하여 분석 서버([Google Analytics does this automatically](https://support.google.com/analytics/answer/1205784?hl=en))로 보낼 수 있습니다. 이것은 여러분들의 페이지 성능 색인을 유지하여 몇 가지 최적화 작업으로 이득을 얻을 페이지들을 선정하는 데 좋은 방법입니다.


## 크리티컬 렌더링 패스 성능 분석하기 



Translated By: 




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

### Hello World 경험하기

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" %}
</pre>

간단하게 기본적인 HTML 마크업과 한 개 이미지 파일로 시작을 합니다. - CSS랑 Javascript는 포함하지 않습니다 -
그리고 Chrome DevTools에서 Network timeline를 열고 resulting resource waterfall을 검사합니다.

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

예상대로, HTML 파일은 다운로드 하는데 ~200ms 가 걸렸습니다. 이 그림에서 투명한 파란색 선이 의미하는 것은 브라우저가 네트워크에서 대기하고 있는 시간입니다. - 예. 응답 바이트가 아직 오지 않음 - 반면 진한 부분은 첫 응답 바이트가 수신되고 난 후에 다운로드가 끝난 시간을 보여줍니다. 위 예제에서 HTML 다운로드 양은 매우 작기 때문에 **(<4K)**, 전체 파일을 페치하기 위한 1번의 왕복을 하면 됩니다. 결과적으로, HTML 다큐멘트는 페치를 하려면 ~200ms 가 걸리고 이 시간 중 절반은 네트워크에서 대기 하는 시간에서 사용되고, 절반은 서버 응답에 사용됩니다.

HTML 컨텐츠를 사용할 수 있게되면, 브라우저는 바이트를 토큰으로 변환하고 DOM 트리를 생성합니다. DevTools은 개발자가 편하게 볼 수 있도록 DOMContentLoaded 이벤트 시간(216ms)을 아래에 표기해줍니다. 수직으로 그려진 파란색 선과 HTML 다운로드 완료 점의 사이 시간에는 브라우저가 DOM 트리를 그리는 시간을 의미합니다, 이 경우에는 몇 milliseconds 가 걸릴 뿐입니다.

마지막으로, 흥미로운 점을 보자면: "awesome photo" 가 domContentLoaded 이벤트를 방해하지 않았다는 것입니다!
이러한 의미는 페이지의 모든 자원에 대해서 기다려야 할 필요 없이 렌더 트리를 생성 및 페이지 그리기가 가능하다는 것이죠: **모든 리소스가 페이지를 처음 그리는데 크리티컬 하지 않는다는 의미**. 사실, 크리티컬 렌더링 패스를 말할 떄는 일반적으로 HTML 마크업, CSS, Javascript 등을 의미 합니다. 이미지는 페이지의 초기 렌더링을 방해하지 않습니다 - 비록, 물론 이미지도 렌더링 속도를 지연시키지 않게 최대한 빨리 그려야 합니다.

그렇더 하더라도, "load" 이벤트 ("onload"로 잘 알려진)는 이미지 로딩시 까지 기다려야 합니다: DevTools에서 onload 이벤트는 335ms에서 실행된다고 알려줍니다. onload 이벤트가 페이지에서 요청한 모든 자원들을 다 다운로드 받고 처리 되었을 때 실행되는 것을 주목하세요 - 이 시점이 브라우저에 나타나는 로딩 스피너가 회전을 멈추는 시점이자 위 표에서 빨간색 수직 선이 가리키는 곳입니다.


### Javascript와 CSS를 함께 추가하기

"Hello World experience" 페이지의 화면은 간단해 보일지 모릅니다. 하지만, 이 화면을 그리기 위해 겉에서 보이지 않지만 브라우저 내에서 많은 것들이 동작을 하고 있습니다. 이처럼, 실습에서는 HTML외에 다른 것도 필요합니다: CSS 스타일시트와 페이지에 상호 인터렉션을 추가하기 위해 한 개 이상의 스크립트가 필요합니다. 두 개 모두 페이지에 추가해보고 어떤 일이 일어나는지 화인해봅니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_timing.html" region_tag="full" %}
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
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_async.html" region_tag="full" %}
</pre>

_Parser-blocking (외장) JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Async (외장) JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, async JS" class="center">

훨씬 낫네요! `domContentLoaded` 이벤트는 HTML이 파싱이 된 바로 후에 실행됩니다: 브라우저는 Javascript에 방해받지 않고, parser blocking 스크립트가 없기 때문에 CSSOM 생성이 병행으로 이루어집니다.

대안으로, 다른 방법으로 접근하여 인라인 CSS, Javascript를 사용할 수 있습니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/measure_crp_inlined.html" region_tag="full" %}
</pre>

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, inline CSS, inline JS" class="center">

`domContentLoaded` 시간은 이전 예제와 거의 비슷합니다: Javascript에 async 속성을 추가하는 대신에, CSS와 JS를 모두 페이지에 인라인 처리하였습니다. 이렇게 해서 HTML 페이지가 훨씬 커졌지만, 좋은 면은 페이지 안에 필요한 자원들이 있기 때문에 브라우저가 외부 리소스 페치를 기다릴 필요가 없어집니다.

이처럼, 매우 간단한 페이지로도 크리티컬 렌더링 패스를 최적화 하는 것은 그리 평범하지 않은 절차입니다: 서로 다른 리소스 간의 디펜던시 그래프를 이해하는 것이 필요합니다. 어떤 리소스가 "크리티컬" 한지 식별해야하고, 어떻게 그 리소스들을 페이지에 포함 시킬지 전략을 세워야 합니다. 이러한 문제에 대해서 한가지 답만 있는 것이 아닙니다 - 모든 페이지가 다 다르기 때문에 최적화 할 수 있는 방안을 찾을 수 있도록 위처럼 비슷한 단계를 거쳐야 합니다.

이렇다 하더라도, 혹시 우리가 위 절차에서 몇가지 일반적인 성능 패턴을 찾을 수 있는지 봅시다...

### 성능 패턴

가장 간단한 페이지는 HTML 마크업으로만 이루어져 있습니다: CSS, Javascript 및 다른 리소스는 전혀 없습니다.
이 페이지를 렌더링 하기 위해서 브라우저는 요청을 초기화 하고, HTML 다큐멘트가 다운될 때 까지 기다리고, 파싱하고, DOM을 생성하고, 마지막으로 화면에 뿌려줍니다:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom_nostyle.html" region_tag="full" %}
</pre>

<img src="images/analysis-dom.png" alt="Hello world CRP" class="center">

**T<sub>0</sub> 와 T<sub>1</sub> 시간 사이에 일어나는 네트워크 요청과 서버 처리 시간들을 표현하였습니다.** 최상의 시나리오는 (HTML 파일이 작다고 가정), 전체 다큐먼트를 페치하기 위한 네트워크 요청이 왕복으로 한번만 필요할 것입니다 - TCP 전송프로토콜 동작방식 때문에, 용량이 큰 파일들은 아마 더 많은 왕복요청이 필요할 것입니다. 이 부분에 대해서는 나중에 다른 강의에서 다루겠습니다. **결과적으로, 최선의 시나리오에서 최소 왕복 요청 크리티컬 패스를 갖게 됩니다.**

자 이제 같은 구조에서 외장 CSS 파일만 추가된 페이지를 봅시다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css.html" region_tag="full" %}
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
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js.html" region_tag="full" %}
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
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_js_async.html" region_tag="full" %}
</pre>

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, async JavaScript CRP" class="center">

비동기 스크립트는 몇가지 이점이 있습니다:

* 비동기 스크립트는 파서를 방해하지 않고, 크리티컬 렌더링 패스에 포함되지 않습니다.
* 스크립트가 크리티컬 자원이 아니기 때문에, CSS는 domContentLoaded 이벤트를 막을 필요가 없습니다.
* domContentLoaded 이벤트가 빨리 실행 될수록, 다른 어플리케이션 로직이 빨리 시작될 수 있습니다.

결과적으로, 우리의 최적화된 페이지는 다시 HTML,CSS 2개의 크리티컬 리소스, 2번의 네트워크 왕복 크리티컬 패스 길이, 전체 9KB의 크리티컬 바이트만 갖게됩니다.

마지막으로, CSS 스타일시트가 프린트 할 시에만 필요하다고 하면 어떻게 될까요?

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/analysis_with_css_nb_js_async.html" region_tag="full" %}
</pre>

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, non-blocking CSS, and async JavaScript CRP" class="center">

style.css 리소스는 프린트 시에만 사용되기 때문에, 브라우저는 페이지 렌더링을 할 때 이 스타일시트를 거치지 않아도 됩니다.
고로, DOM이 생성되자마자, 브라우저는 페이지를 렌더하기 위한 필요 리소스들을 다 갖게 됩니다. 결론적으로, 페이지는 오직 HTML 한 개의 크리티컬 리소스, 1번의 네트워크 왕복 크리티컬 패스 길이를 갖게됩니다.


## 크리티컬 렌더링 패스 최적화하기 



Translated By: 




페이지의 초기 렌더링을 막는 리소스는 치명적입니다. 페이지에 이런 리소스가 적을수록 브라우저가 화면에 컨텐츠를 표시하는게 수월하고 CPU와 다른 리소스를 차지하기 위한 경쟁이 줄어듭니다.

  첫 렌더링을 가장 빠르게 하기 위해서는 3개의 변수를 최적화해야 합니다:

  <ul>
    <li>크리티컬 리소스의 수 줄이기</li>
    <li>크리티컬 바이트의 수 줄이기</li>
    <li>크리티컬 패스 길이 줄이기</li>
  </ul>

유사하게, 브라우저가 크리티컬 바이트를 더 적게 다운로드 받을수록 화면에 컨텐츠를 표시하는 과정이 훨씬 빨라집니다. 바이트 숫자를 줄이기 위해서는 리소스의 숫자를 줄이거나 (제거하거나 크리티컬하지 않게 만듬으로써) 각 리소스를 최적화 또는 압축하여 전송 크기를 최소화 합니다.

마지막으로, 크리티컬 패스 길이는 페이지에서 요청한 모든 크리티컬 리소스와 그 바이트 크기 간의 연관 그래프라고 볼 수 있습니다: 몇몇 리소스 다운로드는 이전 리소스가 처리되어야지만 실행될 수 있습니다. 리소스가 클수록 리소스를 다운받기 위한 왕복시간이 길어집니다.

달리 말해, 리소스 숫자, 바이트 크기, 크리티컬 패스 길이는 서로 연관이 있습니다. 하지만, 이게 모두 동일한 것을 의미하지는 않습니다. 예를 들어, 크리티컬 자원 숫자나 크리티컬 패스 길이를 줄일 수 없더라도 크리티컬 바이트 숫자를 줄이는 것은 여전히 중요한 최적화 작업일 수 있기 때문입니다 &mdash; 반대의 경우도 마찬가지입니다.

**크리티컬 렌더링 패스를 최적화 하기 위한 일반적인 순서:**

1. 리소스 수, 바이트 수, 길이에 대한 분석 및 특성을 파악한다.
1. 크리티컬 리소스 숫자를 줄인다: 제거하거나, 다운로드를 연기하거나, async 태그를 이용하거나 등등
1. 크리티컬 자원의 다운로드 순서를 최적화 한다: 크리티컬 패스 길이를 줄이기 위해 크리티컬 자원을 가능한 한 빨리 다운받아야 한다.
1. 다운로드 시간 (왕복시간 포함)을 줄이기 위해 크리티컬 바이트 숫자를 최적화 한다.


## PageSpeed 규칙과 권고사항 



Translated By: 




이 가이드는 PageSpeed Insights 규칙을 살펴봅니다: 크리티컬 렌더링 패스 최적화 시에 어떤 것에 주의를 기울여야 하는지, 이유는 어떤건지 알아봅니다.


### 렌더를 가로막는 JavaScript 와 CSS 제거하기

첫 렌더를 가장 빠르게 하기 위해서는, 페이지의 크리티컬 리소스를 최소화 하거나 가능하면 제거해야 하고, 다운로드 된 크리티컬 바이트 숫자를 최소하 하고, 크리티컬 패스 길이를 최적화 해야합니다.

### JavaScript 사용 최적화 하기

JavaScript 리소스는 `async` 태그를 사용하지 않거나 특별한 JavaScript 스니펫을 추가하지 않으면 파서 블락킹 입니다. 파서를 블락하는 JavaScript는 브라우저가 DOM을 형성하는 것을 막고, CSSOM 을 기다리게 합니다. 이는 첫 번째 렌더에서 상당한 시간을 지연시킵니다.

#### async JavaScript 리소스 선호하기

Async 리소스는 다큐먼트 파서를 막지 않고 브라우저가 스크립트 실행에 앞서 CSSOM을 막지 않도로 합니다. 종종, 스크립트가 async 이면, 그 스크립트가 첫 번째 렌더에서 그리 중요하지 않음을 알 수 있습니다 - 첫번째 로딩이 된 다음에 async 스크립트가 로딩되는 것을 고려하면요

#### 순차적으로 서버 호출하지 않기

`navigator.sendBeacon()` 메서드를 이용하여 `unload` 안의 XMLHttpRequests 에서 받은 데이터를 제한한다. 왜냐하면 많은 브라우저가 순차적 요청을 보내기 때문에, 가끔씩 확연하게 페이지 전환이 느려질 수 있다. 아래 코드는 어떻게 `navigator.sendBeacon()` 를 사용하여 `unload` 핸들러 대신에 `pagehide` 핸들러로 데이터를 서버에 보내는 지 보여준다.


    <script>
      function() {
        window.addEventListener('pagehide', logData, false);
        function logData() {
          navigator.sendBeacon(
            'https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop',
            'Sent by a beacon!');
        }
      }();
    </script>
    


새로나온 `fetch()` 메서드를 이용하면 비동기적으로 데이터 요청하기가 수월하다. 이 방법은 아직 널리 퍼져있지 않기 때문에, 사용하기 전에 기능 구현이 가능한지 점검해봐야 한다. 이 방법은 응답처리를 이벤트 핸들러가 아닌 Promise로 한다. XMLHttpRequest의 응답과는 다르게, fetch 응답은 크롬 43 버전부터 지원하는 스트림 객체로 이뤄져 있다. 이 말은 `json()` 에 대한 콜이 Promise 를 반환 한다는 의미다.


    <script>
    fetch('./api/some.json')
      .then(
        function(response) {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +  response.status);
            return;
          }
          // Examine the text in the response
          response.json().then(function(data) {
            console.log(data);
          });
        }
      )
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
    </script>
    

`fetch()` 메서드는 POST 요청 또한 처리할 수 있다.


    <script>
    fetch(url, {
      method: 'post',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'foo=bar&lorem=ipsum'
    }).then(function() { // Aditional code });
    </script>
    

#### JavaScript 파싱 지연하기

초기 렌더링에서 컨텐츠를 가시화 하는데 크리티컬하지 않은 비 필수 스크립트는 브라우저가 페이지 렌더링을 수행하는 부담을 최소화 하기 위해 지연되어야 합니다.

#### 오래 실행되는 JavaScript 피하기

오래 실행되는 JavaScript는 브라우저가 DOM, CSSOM 를 생성하는 것과 페이지 렌더링을 막습니다. 결론적으로, 첫 렌더에 필수가 아닌 기능과 초기화 로직을 나중으로 미뤄야 합니다. 만약 길게 연결된 초기화 작업이 실행되어야 한다면, 브라우저가 사이사이에 다른 이벤트를 처리할 수 있도록 여러가지 단계로 쪼개는 것도 생각해봐야 합니다.

### CSS 사용 최적화 하기

CSS는 렌더 트리를 생성하기 위해 필요하고, JavaScript는 종종 초기 페이지 생성시에 CSS를 막습니다. 비필수적인 CSS는 주요하지 않음으로 표시를 해야합니다 (예, print 또는 다른 미디어쿼리), 그리고 크리티컬한 CSS의 양과 이를 로딩하는 시간은 가능한 한 작게 해야 합니다.

#### CSS를 다큐멘트 헤더에 넣기

모든 CSS 리소스는 브라우저에서 `<link>` 태그를 인식하고 해당 CSS를 빨리 요청할 수 있도록 HTML 다큐멘트 안에서 최대한 일찍 정의되어야 합니다.

#### CSS 임포트 기능 피하기

CSS import (`@import`) 디렉티브는 다른 스타일시트 파일에서 특정 규칙을 불러오는 것을 허용합니다. 그러나, 이러한 디렉티브들이 크리티컬 패스에 추가적인 왕복비용을 유도하므로 사용하지 않아야 합니다: 임포트 된 CSS 리소스는 `@import` 규칙을 가진 CSS가 수신되고 파싱된 후에 실행됩니다.

#### 렌더링 막는 CSS를 다큐멘트 안에 넣기

최고 성능을 위해서는 크리티컬 CSS를 HTML 다큐멘트 안에 직접 포함해야 합니다. 이렇게 하면 크리티컬 패스의 추가적인 왕복비용을 줄일 수 있고, 만약 올바르게 사용되었다면 오직 HTML만 페이지 렌더링을 저해하는 "one roundtrip" 크리티컬 패스 길이가 됩니다.
