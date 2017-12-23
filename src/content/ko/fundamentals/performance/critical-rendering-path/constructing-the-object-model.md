project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 브라우저가 DOM 및 CSSOM 트리를 생성하는 방법에 대해 알아봅니다.

{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

# 객체 모델 생성 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

브라우저가 페이지를 렌더링하려면 먼저 DOM 및 CSSOM 트리를 생성해야 합니다. 따라서 HTML 및 CSS를 가능한 한 빨리 브라우저에 제공해야 합니다.

### TL;DR {: .hide-from-toc }

- 바이트 → 문자 → 토큰 → 노드 → 객체 모델.
- HTML 마크업은 DOM(Document Object Model)으로 변환되고, CSS 마크업은 CSSOM(CSS Object Model)으로 변환됩니다.
- DOM 및 CSSOM은 서로 독립적인 데이터 구조입니다.
- Chrome DevTools Timeline을 사용하면 DOM 및 CSSOM의 생성 및 처리 비용을 수집하고 점검할 수 있습니다.

## DOM(Document Object Model)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

가장 단순한 경우인 몇몇 텍스트와 하나의 이미지만 포함하는 일반 HTML 페이지부터 살펴보도록 하겠습니다. 브라우저가 이 페이지를 어떻게 처리하나요?

<img src="images/full-process.png" alt="DOM construction process">

1. **변환:** 브라우저가 HTML의 원시 바이트를 디스크나 네트워크에서 읽어와서, 해당 파일에 대해 지정된 인코딩(예: UTF-8)에 따라 개별 문자로 변환합니다.
2. **토큰화:** 브라우저가 문자열을 [W3C HTML5 표준](http://www.w3.org/TR/html5/){: .external }에 지정된 고유 토큰으로 변환합니다(예: '<html>', '<body>' 및 꺽쇠괄호로 묶인 기타 문자열). 각 토큰은 특별한 의미와 고유한 규칙을 가집니다.
3. **어휘 분석:** 방출된 토큰은 해당 속성 및 규칙을 정의하는 '객체'로 변환됩니다.
4. **DOM 생성:** 마지막으로, HTML 마크업이 여러 태그(일부 태그는 다른 태그 안에 포함되어 있음) 간의 관계를 정의하기 때문에 생성된 객체는 트리 데이터 구조 내에 연결됩니다. 이 트리 데이터 구조에는 원래 마크업에 정의된 상위-하위 관계도 포합됩니다. 즉, *HTML* 객체는 *body* 객체의 상위이고, *body* 는 *paragraph* 객체의 상위인 식입니다.

<img src="images/dom-tree.png" alt="DOM tree">

**이 전체 프로세스의 최종 출력이 바로 이 간단한 페이지의 DOM(Document Object Model)이며, 브라우저는 이후 모든 페이지 처리에 이 DOM을 사용합니다.**

브라우저는 HTML 마크업을 처리할 때마다 위의 모든 단계를 수행합니다. 즉, 바이트를 문자로 변환하고, 토큰을 식별한 후 노드로 변환하고 DOM 트리를 빌드합니다. 이 전체 프로세스를 완료하려면 시간이 약간 걸릴 수 있으며, 특히 처리해야 할 HTML이 많은 경우 그렇습니다.

<img src="images/dom-timeline.png" alt="Tracing DOM construction in DevTools">

참고: 여기서는 Chrome DevTools에 대한 기본적인 사항, 즉 네트워크 워터폴(waterfall)을 캡처하거나 타임라인을 기록하는 방법에 대해 알고 있다고 가정합니다. DevTools에 대해 한 번 더 간단하게 되짚어보려면 <a href="/web/tools/chrome-devtools/">Chrome DevTools 문서</a>를 확인하고, DevTools를 처음 사용하는 경우에는 Codeschool의 <a href="http://discover-devtools.codeschool.com/">Discover DevTools</a> 과정을 학습할 것을 권장합니다.

Chrome DevTools를 열고 페이지가 로드되는 동안 타임라인을 기록하면 이 단계를 수행하는 데 소요된 실제 시간을 확인할 수 있습니다. 위 예시에서는 HTML 조각을 DOM 트리로 변환하는 데 약 5ms 정도 걸립니다. 큰 페이지의 경우 이 프로세스가 훨씬 더 오래 걸릴 수 있습니다. 매끄러운 애니메이션을 만드는 경우, 브라우저가 대량의 HTML을 처리해야 한다면 쉽게 병목 현상이 발생할 수 있습니다.

DOM 트리는 문서 마크업의 속성 및 관계를 포함하지만 요소가 렌더링될 때 어떻게 표시될지에 대해서는 알려주지 않습니다. 이것은 CSSOM의 책임입니다.

## CSSOM(CSS Object Model)

브라우저는 단순한 페이지의 DOM을 생성하는 동안 외부 CSS 스타일시트인 style.css를 참조하는 문서의 헤드 섹션에서 링크 태그를 접합니다. 페이지를 렌더링하는 데 이 리소스가 필요할 것이라고 판단한 브라우저는 이 리소스에 대한 요청을 즉시 발송하고 요청의 결과로 다음 콘텐츠가 반환됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

HTML 마크업 내에 직접(인라인) 스타일을 선언할 수도 있지만 CSS를 HTML과 별도로 유지하면 콘텐츠와 디자인을 별도의 항목으로 처리할 수 있습니다. 즉, 디자이너는 CSS를 처리하고, 개발자는 HTML에만 집중할 수 있습니다.

HTML과 마찬가지로, 수신된 CSS 규칙을 브라우저가 이해하고 처리할 수 있는 형식으로 변환해야 합니다. 따라서 HTML 대신 CSS에 대해 HTML 프로세스를 반복합니다.

<img src="images/cssom-construction.png" alt="CSSOM construction steps">

CSS 바이트가 문자로 변환된 후 차례로 토큰과 노드로 변환되고 마지막으로 'CSS Object Model'(CSSOM)이라는 트리 구조에 링크됩니다.

<img src="images/cssom-tree.png" alt="CSSOM tree">

CSSOM이 트리 구조를 가지는 이유는 무엇일까요? 페이지에 있는 객체의 최종 스타일을 계산할 때 브라우저는 해당 노드에 적용 가능한 가장 일반적인 규칙(예: body 요소의 하위인 경우 모든 body 스타일 적용)으로 시작한 후 더욱 구체적인 규칙을 적용하는 방식으로, 즉 '하향식'으로 규칙을 적용하는 방식으로 계산된 스타일을 재귀적으로 세분화합니다.

더욱 구체화하기 위해 위에 나와 있는 CSSOM 트리를 살펴봅시다. body 요소 내에 있는 *span* 태그 안에 포함된 모든 텍스트의 글꼴 크기는 16픽셀이고 색상은 빨간색입니다. font-size 지시문은 body에서 span으로 하향식으로 적용되기 때문입니다. 하지만 span 태그가 단락(p) 태그의 하위인 경우 해당 콘텐츠는 표시되지 않습니다.

또한, 위의 트리는 완전한 CSSOM 트리가 아니고 스타일시트에서 재정의하도록 결정한 스타일만 표시한다는 점에 유의하세요. 모든 브라우저는 '사용자 에이전트 스타일'이라고 하는 기본 스타일 집합, 즉 개발자가 고유한 스타일을 제공하지 않을 경우 표시되는 스타일을 제공합니다. 개발자가 작성하는 스타일은 이러한 기본 스타일(예: [기본 IE 스타일](http://www.iecss.com/){: .external })을 간단하게 재정의합니다.

CSS 처리에 시간이 얼마나 걸리는지 알기 위해, DevTools에서 타임라인을 기록하고 'Recalculate Style' 이벤트를 찾을 수 있습니다. DOM 파싱과 달리, 타임라인에 'Parse CSS' 항목이 별도로 표시되지 않으며, 대신 파싱 및 CSSOM 트리 생성과 계산된 스타일의 재귀적 계산이 이 단일 이벤트에서 캡처됩니다.

<img src="images/cssom-timeline.png" alt="Tracing CSSOM construction in DevTools">

작은 스타일시트를 처리하는 데 0.6ms 미만이 걸리며, 페이지에 있는 8개 요소에 영향을 미칩니다. 많지는 않지만 비용이 전혀 안 드는 것은 아니죠. 그런데 8개 요소는 어디서 왔을까요? CSSOM 및 DOM은 서로 독립적인 데이터 구조입니다. 알고보니 브라우저에서 숨겨진 중요한 단계가 있습니다. 다음 섹션에서 DOM 및 CSSOM을 함께 연결하는 [렌더링 트리](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)에 대해 살펴보도록 하겠습니다.
