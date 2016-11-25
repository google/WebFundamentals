project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 브라우저는 CSSOM과 DOM 트리를 결합해서 만든 렌더 트리를 만듭니다. 그리고 화면에 출력할 엘리먼트의 레이아웃(Layout)을 계산하여 화면에 픽셀을 그리는 페인트(Paint) 단계를 수행할 때 렌더트리를 입력 값으로 사용합니다. 최상의 렌더링 성능을 얻으려면 이 과정을 최적화해야 합니다.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2014-03-31 #}

# 렌더 트리(Render-tree) 생성, 레이아웃(Layout), 페인트(Paint) {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


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
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/nested.html" region_tag="full" adjust_indentation="auto" %}
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


Translated By: 
{% include "web/_shared/contributors/jeokrang.html" %}
