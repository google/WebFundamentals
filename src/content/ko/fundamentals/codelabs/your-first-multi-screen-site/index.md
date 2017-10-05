project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 작은 화면의 휴대폰에서 큰 화면의 TV에 이르기까지 수많은 기기들에서 웹에 액세스할 수 있습니다. 각 기기에는 고유한 장점과 제한이 있습니다. 웹 개발자로서 여러분은 모든 종류의 기기를 지원하도록 해야 합니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# 여러분의 첫 다중 기기 사이트 {: .page-title }

Caution: 이 문서는 한동안 업데이트되지 않았으므로 현실을 반영하지 못할 수도 있습니다. 그 대신, Udacity에서 무료 [반응형 웹 디자인](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) 과정을 확인해 보세요.

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="최종 프로젝트를 보여주는 많은 기기들" class="attempt-right">

다중 기기 환경을 구축하는 것은 보기보다 그렇게 어려운 것이 아닙니다.
이 가이드에서 우리는 
[CS256 모바일 웹개발 과정](https://www.udacity.com/course/mobile-web-development--cs256)을
위해, 다양한 기기 유형에서 잘 작동하는 제품 랜딩 페이지를 빌드할 것입니다.

매우 다양한 화면 크기와 다양한 기능을 갖춘 다중 기기에 맞는
환경을 구축하는 것은 엄청난 일처럼 보일 수
있습니다.

완벽한 반응형 사이트를 구축하는 것은 생각보다 그렇게
어렵지 않으며, 이 가이드는 여러분이 시작하는 데 필요한 단계를 안내합니다.
이 단계는 크게 두 단계로 구분됩니다.

1.  정보 아키텍처(흔히 IA로 불림)와 페이지 구조 정의
2.  모든 기기에서 반응하고 올바로 표시되도록 디자인 요소 추가.


## 콘텐츠와 구조 만들기

콘텐츠는 모든 사이트에서 가장 중요한 요소입니다. 따라서 콘텐츠를
디자인해보겠습니다. 디자인이 콘텐츠보다 우선하지 않도록 하세요. 이 가이드에서
우리는 먼저 콘텐츠를 식별하고, 이 콘텐츠에 따라 페이지 구조를 만든 다음, 이 페이지를
간단한 선형 레이아웃에 표시합니다. 이 선형 레이아웃은 좁은 뷰포트와
넓은 뷰포트에서 잘 작동합니다.


### 페이지 구조 만들기

우리에게 필요한 것을 식별했습니다.

1.  우리의 제품 'CS256에 대해 간단히 설명하는 영역: 모바일 웹 개발' 과정
2.  우리의 제품에 관심이 있는 사용자로부터 정보를 수집하는 양식
3.  상세 설명 및 동영상
4.  실제 제품의 이미지
5.  주장을 뒷받침하는 정보가 있는 데이터 테이블

#### TL;DR {: .hide-from-toc }
- 먼저 필요한 콘텐츠를 식별합니다.
- 좁은 뷰포트와 넓은 뷰포트에 대한 정보 아키텍처(IA)를 스케치합니다.
- 스타일 지정은 없지만 콘텐츠가 있는 페이지의 기본 템플릿을 만듭니다.

또한 좁은 뷰포트와 넓은 뷰포트를 위한 대략적인
정보 아키텍처와 레이아웃을 제공합니다.

<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="좁은 뷰포트 IA">
    <figcaption>
      좁은 뷰포트 IA
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="넓은 뷰포트 IA">
    <figcaption>
      넓은 뷰포트 IA
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

이는 대략적인 섹션의 골격 페이지로 쉽게 변환될 수 있으며,
이 프로젝트의 나머지 부분에서 사용될 것입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

### 페이지에 콘텐츠 추가

사이트의 기본 구조는 완전합니다. 우리는 우리에게 필요한 섹션
, 이 섹션에 표시할 콘텐츠,
전체 정보 아키텍처에서 콘텐츠가 배치되는 위치를 알고 있습니다. 이제 사이트 구축을 시작해 보겠습니다.

참고: 스타일 지정은 나중에 추가할 것입니다.

### 헤드라인 및 양식 만들기

헤드라인 및 요청 알림 양식은 저희 페이지의 중요한
구성 요소입니다. 이들은 사용자에게 즉시 표시되어야 합니다.

헤드라인에는 해당 과정을 설명하는 간단한 텍스트를 추가합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

또한 양식을 채워야 합니다.
이 양식은 사용자의 이름, 이메일 주소 및 전화 번호를 수집하는
간단한 양식입니다.

모든 양식에는 레이블과 자리표시자가 있어야 합니다.
그러면 사용자가 쉽게 요소에 포커스를 맞출 수 있고, 양식 안에 무엇이
들어갈지 이해할 수 있고, 또한 접근성 도구가 양식의 구조를 이해하도록 도울 수 있습니다.  name 속성은 양식 값을
서버로 보낼 뿐만 아니라, 사용자의 양식을 자동으로 채우는
방법에 대한 중요한 힌트를 브라우저에 제공하기도 합니다.

우리는 사용자가 휴대기기에서 쉽고 빠르게 콘텐츠를
입력할 수 있도록 문맥적 입력 유형을 추가할 것입니다.  예를 들어, 전화 번호를 입력할 때는
사용자에게 다이얼 패드만 보여야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

#### 동영상 및 정보 섹션 만들기

콘텐츠의 동영상 및 정보 섹션에는 좀더 상세한 내용이 포함됩니다.
여기에는 저희 제품의 기능들이 나열되며, 또한 저희 제품의
작동 모습을 사용자에게 보여주는 동영상 자리표시자가 포함됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

동영상은 상호작용 방식으로 콘텐츠를 설명하는 데 흔히 사용되며,
제품이나 컨셉의 데모를 보여주는 데 자주 사용됩니다.

모범 사례를 따라하면 동영상을 사이트에 쉽게 통합할 수 있습니다.

*  사람들이 동영상을 쉽게 재생할 수 있도록 `controls` 속성을 추가합니다.
*  사람들이 콘텐츠를 미리 볼 수 있도록 `poster` 이미지를 추가합니다.
*  지원되는 동영상 형식에 따라 여러 `<source>` 요소를 추가합니다.
*  사람들이 동영상을 창에서 재생할 수 없는 경우 동영상을 다운로드하도록 대체 텍스트를 추가합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

#### 이미지 섹션 만들기

이미지가 없는 사이트는 다소 지루할 수 있습니다. 이미지에는 두 가지 유형이 있습니다.

*  콘텐츠 이미지 &mdash; 문서에 인라인으로 표시되는 이미지이며,
콘텐츠에 대한 추가적인 정보를 전달하는 데 사용됩니다.
*  스타일 이미지 &mdash; 사이트를 더 보기 좋게 만들어주는 이미지이며,
이 이미지는 대개 배경 이미지, 패턴 및 그라데이션입니다.  이에 대해서는
   [다음 섹션](#make-it-responsive)에서 다룹니다.

저희 페이지의 이미지 섹션은 콘텐츠 이미지 모음입니다.

콘텐츠 이미지는 페이지의 의미를 전달하는 데 매우 중요합니다. 이 이미지는
뉴스 기사에 사용되는 이미지라고 생각하면 됩니다.  우리가 사용하는 이미지는
프로젝트에서 강사들인  Chris Wilson, Peter Lubbers 및 Sean
Bennet의 사진입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

이 이미지는 화면 너비의 100%로 배율이 조정되도록 설정됩니다. 이 배율은
좁은 뷰포트의 기기에서는 잘 작동하지만, 데스크톱 같은 넓은 뷰포트의
기기에서는 잘 작동하지 않습니다.  이에 대해서는 반응형 디자인
섹션에서 다룰 것입니다.

상당수 사람들은 이미지를 볼 수 있는 능력이 없으며
대개는 스크린 리더와 같은 보조 기술을 사용합니다. 스크린 리더는 페이지에서
데이터를 분석하여 사용자에게 음성으로 전해 줍니다.  스크린 리더가 사용자에게
음성으로 말할 수 있도록, 여러분의 모든 콘텐츠 이미지에는 설명적인 `alt` 태그가
있어야 합니다.

`alt` 태그를 추가할 경우, 이미지를 최대한 설명하기 위해서는
alt 텍스트를 최대한 간결하게 유지해야 합니다.  예를 들어 우리의 데모에서는
이 속성을 'Name: Role'이라고 지정하며, 사용자는
이 섹션이 저자와 저자의 직업에 관한 내용이라는 것을 충분히 이해할 수
있습니다.

#### 테이블식 데이터 섹션을 추가

마지막 섹션은 제품의 특정한 통계를 표시하는 데 사용되는
간단한 테이블입니다.

테이블은 테이블식 데이터(즉, 정보 매트릭스)에만 사용되어야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

#### 바닥글 추가

약관, 면책 조항 및 기타 콘텐츠(메인 탐색이나 페이지의
메인 콘텐츠 영역에 나타나지 않는 콘텐츠)를 표시하기 위해,
대부분의 사이트에는 바닥글이 필요합니다.

우리의 사이트에서는 간단한 자리표시자 바닥글을 만들 것입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

### 요약

우리는 사이트에 대한 윤곽도를 만들었으며 모든 기본 구조 요소를
식별했습니다.  또한 우리의 비즈니스 요구사항을 충족하도록
모든 관련 콘텐츠를 준비하고 제자리에 배치했습니다.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="콘텐츠">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">콘텐츠 및 구조</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="디자인된 사이트" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">최종 사이트</a>
    </figcaption>
  </figure>
</div>

지금은 페이지가 엉망으로 보일 것이며, 이는 의도적인 것입니다.
콘텐츠는 모든 사이트에서 가장 중요한 요소이며,
저희는 정확하고 견고한 정보 아키텍처와 기반을 구축해야 했습니다. 이 가이드는 우리의 구축 과정에서
훌륭한 기반이 되었습니다. 다음 가이드에서는 우리의 콘텐츠에 스타일을 지정할 것입니다.



## 반응형으로 만들기 {: #make-it-responsive }

작은 화면의 휴대폰에서 큰 화면의 TV에 이르기까지 수많은 기기들에서 웹에
액세스할 수 있습니다. 각 기기에는 고유한 장점과
또한 제한이 있습니다. 웹 개발자로서 여러분은
모든 종류의 기기를 지원하도록 해야 합니다.


우리는 다양한 화면 크기와 기기 유형에서 작동하는 사이트를
구축하는 중입니다. 페이지의 정보 아키텍처와 기본 구조를
만들었습니다. 이 섹션에서는 기본 구조와
콘텐츠를 잘 조화시켜 여러 가지 화면 크기에 걸쳐 보기 좋은
반응형 페이지로 바꾸어 보겠습니다.

모바일 우선(Mobile First) 웹 개발의 원칙에 따라,
휴대폰과 유사하게 좁은 뷰포트와
모바일 환경을 우선적으로 고려한 빌드 작업을 시작합니다. 그런 다음, 더 큰 기기 클래스로 확장합니다. 뷰포트를
더 넓게 만들고 디자인과 레이아웃이 올바로 나타나는지
판단하여 확장할 수 있습니다.

앞에서 우리는 콘텐츠가 표시되는 방식에 대한 몇 가지
서로 다른 디자인을 만들었습니다. 이제 이 페이지를 다양한 레이아웃에 맞게 적용해야 합니다.
이를 위해 콘텐츠가 화면 크기에 맞춰지는 방식에 따라
중단점(레이아웃과 스타일이 변경되는 지점)의 배치 위치를
결정해야 합니다.

### TL;DR {: .hide-from-toc }
- 항상 뷰포트를 사용하세요.
- 항상 좁은 뷰포트로 먼저 시작하고 크기를 늘려 나가세요.
- 콘텐츠를 적용해야 하면 중단점을 해제하세요.
- 주요 중단점에서 레이아웃의 하이레벨 비전을 만드세요.


### 뷰포트 추가

기본적인 페이지에도 항상 뷰포트 메타 태그를 **포함해야** 합니다.
뷰포트는 다중 기기 환경에 필요한 가장 중요한 구성
요소입니다. 뷰포트가 없으면 사이트가 휴대기기에서 제대로 작동하지 않습니다.

뷰포트는 화면에 맞게 페이지의 배율 조정이 필요함을
브라우저에게 알려줍니다. 페이지 표시를 제어하기 위해 뷰포트에 지정할 수 있는
여러 종류의 구성이 있습니다.  기본적으로 다음을 권장합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

뷰포트는 문서의 헤드 부분에 존재하며 한번만 선언되어야 합니다.

### 간단한 스타일 적용

이미 저희 제품과 회사는 매우 구체적인 브랜드와 글꼴 가이드라인을 스타일 가이드에서
제공하고 있습니다.

#### 스타일 가이드

스타일 가이드는 페이지의 시각적 표현을 간단히 이해할 수 있는 유용한 방법이며,
일관된 디자인을 유지하도록 도와줍니다.

#### 색상

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

####  스타일 이미지 추가

<img  src="images/narrowsite.png" alt="디자인된 사이트"  class="attempt-right" />

이전 가이드에서 우리는 '콘텐츠 이미지'라는 이미지를 추가했습니다.  이 이미지는
저희 제품의 홍보에 중요한 이미지였습니다.  스타일 이미지란
핵심 콘텐츠에는 포함되지 않지만 시각적 효과를 더해주고
특정한 콘텐츠 부분에 사용자의 관심을 모아주는 이미지입니다.

이 이미지의 좋은 예는 '스크롤 없이 볼 수 있는 부분' 콘텐츠의 헤드라인 이미지입니다.  이 이미지는
사용자가 제품에 대해 더 읽어보도록 유인하는 데 흔히 사용됩니다.

이 이미지는 매우 간단하게 포함할 수 있습니다. 우리의 사례에서 이 이미지는 헤더의 배경이 되며
간단한 CSS를 통해 이 이미지를 적용할 것입니다.

<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

콘텐츠로부터
시선을 뺏지 않도록 단순한 흐린 배경 이미지를 선택했습니다. 또한 전체 요소를 포함하도록 `cover`로 설정했습니다.
따라서 올바른 화면비를 유지하면서도 언제든지 확대가 가능합니다.


### 첫 번째 중단점 설정

약 600px의 너비에서 디자인이 나빠지기 시작합니다.  우리의 사례에서는
선의 길이가 10단어(최적의 읽기 길이)를 넘어가며, 이 위치에서
변경하려고 합니다.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>죄송합니다, 브라우저가 동영상을 지원하지 않습니다.
     <a href="videos/firstbreakpoint.mov">동영상 다운로드</a>.
  </p>
</video>

600px 위치의 경우, 화면에 더 잘 맞도록 요소의 위치를 조정할 수 있는 여지가 있으므로,
첫 번째 중단점을 만들기에 좋은 위치입니다.
이를 위해 우리는 [미디어 쿼리](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)라는 기술을 사용할 수 있습니다.

    @media (min-width: 600px) {
    
    }
    
큰 화면에는 더 많은 공간이 있으므로, 콘텐츠 표시 방법에
더 유연성이 있습니다.

참고: 한번에 모든 요소를 이동할 필요는 없으며, 필요할 경우에 사소한 조정을 수행할 수 있습니다.

우리의 제품 페이지의 경우에는 다음 작업을 수행해야
할듯 합니다.

*  디자인의 최대 너비를 제한합니다.
*  요소의 여백을 변경하고 텍스트 크기를 축소합니다.
*  제목 콘텐츠와 나란히 떠다니도록 양식을 이동합니다.
*  동영상이 콘텐츠 주변에서 떠다니도록 만듭니다.
*  이미지의 크기를 축소하고 더 나은 그리드로 나타나도록 만듭니다.


### 디자인의 최대 너비 제한

우리는 주요 레이아웃을 두 개만 선택했으며(좁은 뷰포트 및 넓은 뷰포트),
이로 인해 구축 절차가 훨씬 단순해졌습니다.

또한 넓은 뷰포트에서와 마찬가지로 좁은 뷰포트에서도 화면이 여백없이 가득 채워지는 섹션을
만들기로 결정했습니다.  즉, 매우 넓은 화면에서
텍스트와 단락이 한 줄로 길게 늘어지지 않도록, 화면의 최대 너비를
제한해야 합니다.  우리는 이 값을 약
800px로 선택했습니다.

이를 실현하기 위해서는 너비를 제한하고 요소를 중앙에 맞춰야 합니다.  또한
각각의 주요 섹션 주변에 컨테이너를 만들고 `margin:
auto`를 적용해야 합니다.  이렇게 하면 화면은 늘어날 수 있지만, 콘텐츠는 최대 800px 크기로
중앙에 유지됩니다.

컨테이너는 다음과 같은 형식의 간단한 `div`가 될 것입니다.

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

### 여백을 변경하고 텍스트 크기를 축소

좁은 뷰포트에서는 콘텐츠를 표시할 공간이 많지 않으므로,
화면 크기에 맞게 서체의 크기와 두께가 상당히
줄어듭니다.

큰 뷰포트의 경우 사용자의 화면도 더 크면 좋겠지만
추가로 고려할 사항들이 있습니다.  콘텐츠의 가독성을 높이기 위해
서체의 크기와 두께를 늘릴 수 있지만 또한 특정 영역이
더 두드러지게 보이도록 여백을 변경할 수도 있습니다.

우리의 제품 페이지에서는 너비의 5%로 유지되도록 여백을 설정하여
섹션 요소의 여백을 늘릴 것입니다.  또한 각 섹션의 헤더 크기도
늘릴 것입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

### 넓은 뷰포트에 맞게 요소 적용

우리의 좁은 뷰포트는 선형으로 쌓여 표시되는 형태였습니다.  각각의 주요 섹션과 섹션 내의
콘텐츠는 위에서 아래로 순서대로 표시되었습니다.

넓은 뷰포트는 해당 화면에 맞게 콘텐츠를 최적으로 표시할 수 있는
추가적인 공간을 제공합니다.  즉, 우리의 제품 페이지에서 IA에 따라 다음 작업을 수행할 수 있습니다.

*  헤더 정보 주변으로 양식을 이동합니다.
*  핵심 지점의 오른쪽에 동영상을 배치합니다.
*  이미지를 타일로 만듭니다.
*  테이블을 확장합니다.

#### 양식 요소를 떠다니도록 만들기

좁은 뷰포트의 경우, 요소를 화면에 편안하게 배치하기에는
가로 공간이 너무 적습니다.

가로 화면 공간을 효과적으로 사용하기 위해서는 헤더의
선형 흐름을 끊고 양식이 서로 나란히 배치되도록
이동해야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>죄송합니다, 브라우저가 동영상을 지원하지 않습니다.
     <a href="videos/floatingform.mov">동영상 다운로드</a>.
  </p>
</video>

#### 동영상 요소를 떠다니도록 만들기

좁은 뷰포트 인터페이스에 있는 동영상은 화면의 전체 너비를 차지하도록
디자인되며 핵심 기능 목록 뒤에 배치됩니다. 넓은 뷰포트에서는,
동영상이 기능 목록 다음에 배치될 경우 너무 크게 확대되어
부정확하게 보입니다.

동영상 요소는 좁은
뷰포트의 세로 흐름에서 탈피하여, 넓은 뷰포트에서 콘텐츠 목록과 함께 나란히 표시되어야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

#### 이미지를 타일로 만들기

<img src="images/imageswide.png" class="attempt-right">

좁은 뷰포트(대부분 휴대기기) 인터페이스에 있는 이미지는
화면의 전체 너비를 차지하고 수직 방향으로 쌓이도록 설정됩니다.  이 경우 넓은 뷰포트에서는 제대로
확대되지 않습니다.

넓은 뷰포트에서 이미지가 올바로 보이도록 하려면,
컨테이너 너비의 30%로 배율이 조정되고 (좁은 뷰의 세로 방향이 아니라) 가로로 배치되어야
합니다. 우리는 이미지를 더 멋지게 만들기 위해
둥근 모서리와 박스 그림자 효과도 추가할 것입니다.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

#### 이미지를 DPI에 반응하게 만들기

이미지를 사용할 경우,
뷰포트의 크기와 디스플레이의 밀도를 고려해야 합니다.

웹은 96dpi 화면용으로 구축되었습니다.  휴대기기가 도입됨에 따라,
노트북의 레티나 등급 디스플레이는 물론이고 화면의 픽셀 밀도가 엄청나게
증가했습니다.  이로 인해 96dpi로 인코딩된 이미지는 종종
높은 DPI 기기에서 형편없이 보입니다.

우리에게는 아직 널리 채택되지는 않은 해결책이 있습니다. 이를 지원하는 브라우저에서는
고밀도 이미지를 고밀도 디스플레이에 표시할 수 있습니다.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

#### 테이블

좁은 뷰포트가 있는 기기에서는 테이블을 올바로 보기가 매우 어려우며,
특별한 사항을 고려해야 합니다.

좁은 뷰포트에서는 각 행을 키-값 쌍의 블록으로 변경하여
테이블을 변환하는 것이 좋습니다(이 경우 이전의 열 헤더가 키가 되며,
값은 그대로 셀 값입니다).
다행히 이 방법은 그리 어렵지 않습니다. 먼저, 해당 제목을 데이터 속성으로 가진 각 `td` 요소를
주석 처리합니다. (CSS를 더 추가할 때까지
눈에 띄는 효과는 없을 것입니다.)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

이제 원래의 `thead`를 숨기고 그 대신 `:before` 의사 요소를 사용하여
`data-th` 레이블을 표시하는 CSS를 추가하기만 하면 됩니다. 그러면 다음 동영상에 나오는
다중 기기 환경이 생성됩니다.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>죄송합니다, 브라우저가 동영상을 지원하지 않습니다.
     <a href="videos/responsivetable.mov">동영상 다운로드</a>.
  </p>
</video>

우리의 사이트에서는 테이블 콘텐츠 전용의 중단점을 추가로 만들어야 했습니다.
휴대기기용으로 처음 구축하는 경우에는 적용된 스타일을 취소하는 것이 더 어려우므로,
좁은 뷰포트 테이블 CSS를 넓은 뷰포트 CSS에서 잘라내야 합니다.
이렇게 하면 명확하고 일관된 중단이 가능해집니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

## 마무리하기

Success: 여기를 읽을 즈음이면, 매우 다양한 기기와
폼 팩터 및 화면 크기에서 작동하는 간단한 제품 방문 페이지를
처음으로 만들었을 것입니다.

다음 가이드라인을 따른다면 순조롭게 출발할 수 있을 것입니다.

1.  기본 IA를 만들고 코딩 전에 콘텐츠를 이해하세요.
2.  항상 뷰포트를 설정하세요.
3.  '모바일 우선' 접근방식에 따라 기본적인 환경을 만드세요.
4.  모바일 환경이 구축되면 안 좋게 보일 때까지 디스플레이의 너비를 늘리고, 그곳에 중단점을 설정하세요.
5.  과정을 반복하세요.


{# wf_devsite_translation #}
