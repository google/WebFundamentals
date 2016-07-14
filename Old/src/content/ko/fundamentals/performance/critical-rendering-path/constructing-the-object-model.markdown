---
title: "객체 모델 생성"
description: "브라우저는 화면에 콘텐츠를 렌더링 하기 전에 DOM과 CSSOM 트리를 구축합니다. 따라서 HTML과 CSS를 가능한 한 빨리 브라우저에게 전달해야 합니다."
updated_on: 2014-09-12
translators:
  - jeokrang
key-takeaways:
  construct-object-model:
    - "바이트 → 문자 → 토큰 → 노드 → 객체 모델."
    - "HTML 마크업을 문서 객체 모델(DOM)로, CSS 마크업을 CSS 객체 모델(CSSOM)로 변환합니다."
    - "DOM과 CSSOM은 서로 별개로 존재하는 데이터 구조입니다."
    - "크롬 개발자 도구 타임라인을 이용해서 DOM과 CSSOM 구축, 처리 비용에 대한 데이터를 수집하고 검사할 수 있습니다."
notes:
  devtools:
    - "이 글은 독자가 크롬 개발자 도구를 이용해서 네트워크 워터폴 차트를 수집하거나 타임라인을 기록하는 등의 기본적인 사용법을 알고 있다고 가정하고 있습니다. 빠르게 다시 한 번 개발자 도구 사용법을 보고 싶다면 <a href='https://developer.chrome.com/devtools'>크롬 개발자 도구 문서</a>를 확인하세요. 개발자 도구를 처음 다뤄본다면 Codeschool이 제공하는 <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> 코스를 학습할 것을 추천합니다."
---
<p class="intro">
  브라우저는 페이지를 렌더링 하기 전에 DOM과 CSSOM 트리를 구축합니다. 따라서 HTML과 CSS를 가능한 한 빨리 브라우저에게 전달해야 합니다.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## 문서 객체 모델(Document Object Model, DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

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

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

브라우저가 페이지를 불러오는 동안에 크롬 개발자 도구를 열어서 타임라인을 기록해보면, 실제 이 작업 수행시간을 확인할 수 있습니다. 위에 있는 예제 HTML 마크업을 HTML 바이트에서 DOM 트리로 변환하는 데는 5ms가 걸렸습니다. 물론 페이지가 더 컸다면 수행 시간은 더 길어졌을 겁니다. 브라우저가 처리해야하는 HTML의 양이 많을 때 애니메이션은 쉽게 병목을 일으킵니다. 뒤에 나올 섹션에서 애니메이션을 부드럽게 만드는 방법을 살펴봅니다.

DOM 트리가 준비되었으니 이제 페이지를 하면에 렌더링 할 수 있을까요? 아니오, 아직 부족합니다! DOM 트리는 마크업의 프로퍼티와 마크업 간의 관계에 대한 정보를 가지고 있지만, 각 요소들을 어떻게 화면에 그려야 할 지에 대한 정보는 전혀 가지고 있지 않습니다. 이러한 정보는 다음에 나올 CSSOM이 가지고 있습니다.

## CSS 객체 모델(CSS Object Model, CSSOM)

브라우저는 DOM을 구축하면서 문서의 head에 있는 외부 CSS 스타일시트를 참조하는 link 태그를 만납니다. 페이지를 렌더링하는 데 이 자원이 필요할 것이라고 판단한 브라우저는 즉각 자원을 요청하고, 요청의 결과로 아래의 콘텐츠가 돌아옵니다.

{% include_code src=_code/style.css snippet=full lang=css %}

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


