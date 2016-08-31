project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹은 작은 화면을 가진 전화기부터 커다한 화면을 가진 텔레비전까지 아주 넓은 범위의 디바이스에서 접근할 수 있습니다. 이 모든 디바이스들에서 잘 동작하는 사이트를 어떻게 구축할 수 있는지에 대해 배워봅시다.

{# wf_review_required #}
{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# 멀티 디바이스용 사이트로의 첫걸음 {: .page-title }

{% include "_shared/contributors/paulkinlan.html" %}


Translated By: 

{% include "_shared/contributors/cwdoh.html" %}



멀티디바이스 사례를 만드는 것은 듣는 것만큼 어렵지는 않습니다. 우리는 이 가이드를 따라 다양한 형태의 모든 디바이스에서 잘 동작하는 예제로써 <a href='https://www.udacity.com/course/cs256'>CS256 모바일 웹 개발 강좌</a>의 방문 페이지를 구축할 것입니다.

<img src="images/finaloutput-2x.jpg" alt="many devices showing the final project">

각기 다른 기능들과 다양한 화면 사이즈, 인터랙션 방식을 가진 디바이스들을 위한 사이트 구축을 시작할 수는 있겠지만 어렵게 느껴질 수는 있습니다.

완전한 반응형 사이트를 구축하는 것은 생각하는 것만큼 힘들지는 않습니다. 이 가이드는 시작부터 적용이 가능한 여러 단계들을 통해 이를 확실시켜 드릴 것입니다. 이를 위해 우리는 가이드를 다음과 같이 2개의 단순한 단계로 나누었습니다.

1.  정보구조(Information Architecture, IA)와 페이지 구조 정의하기
2.  이를 반응형으로 만들고 모든 디바이스에서 잘 보이도록 디자인 요소 추가하기



## 콘텐츠 및 구조 생성 



Translated By: 




콘텐츠는 모든 사이트에서 가장 중요한 부분입니다. 따라서 우리는 콘텐츠를 줄줄 읊어대는 것이 아닌 콘텐츠를 위한 제대로된 기획을 해보도록 합시다. 이 가이드에서 우리는 가장 필요한 콘텐츠를 확인하고, 이에 기초하여 페이지 구조를 생성한 뒤 좁거나 넓은 뷰포트 모두에서 제대로 동작하는 간단한 선형의 레이아웃을 통해 페이지를 표현해 볼 것입니다.


### 페이지 구조 생성하기

우리에게 필요한 것을 확인해보자면 다음과 같습니다.

1. "CS256: 모바일 웹 개발" 강좌 상품을 고급스럽게 기술할 영역
2. 상품에 관심있는 사용자로부터 정보를 입력받기 위한 폼(Form)
3. 상세한 설명과 비디오
4. 동작을 위한 상품의 이미지
5. 고객 클레임을 지원하기 위한 정보를 가지는 데이터 테이블

### TL;DR {: .hide-from-toc }
- 가장 필요한 콘텐츠 정의하기.
- '좁고 넓은 뷰포트에 대한 대략적인 정보구조(Information Architecture, IA) 구성하기.'
- 스타일 없이 콘텐츠를 가진 페이지 뷰의 뼈대 만들기


또한 대략적인 정보구조(Information Architecture)와 좁고 넓은 뷰포트 모두를 위한 레이아웃을 찾을 것입니다.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

이는 프로젝트의 나머지 부분에서 사용할 페이지 뼈대 내의 대략적인 구역들로 쉽게 변환해 넣을 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### 콘텐츠를 페이지에 추가하기

이제 사이트의 기본 구조는 정리되었습니다. 우리는 필요한 섹션들과 섹션들 내에서 보여줄 콘텐츠 그리고 이들이 전체적인 정보구조 내에서 어떻게 위치해야 하는지를 알고 있으므로 이제 사이트 구축을 시작할 수 있을 것입니다.

<!-- TODO: Verify note type! -->
Note: 스타일링은 이후에 진행할 것입니다.

#### 헤드라인과 폼 생성하기

헤드라인과 응답 요청 폼은 우리 페이지에서 중요한 구성요소입니다. 이들은 반드시 사용자들에게 즉시 보여질 수 있어야 합니다.

헤드라인 내에 다음과 같이 강좌를 설명하기 위한 간단한 텍스트를 추가해봅시다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

우리는 또한 폼을 채울 필요가 있습니다.
이는 사용자들의 이름, 전화번호 그리고 상담 전화를 하기 좋은 시간을 수집하는 간단한 폼이 될 것입니다. 

모든 폼들은 사용자들이 요소들을 포커싱하고 그것들이 무엇인지 이해하기 쉽게 만들어 주며, 또한 접근성 도구들이 폼의 구조를 이해하는 것을 도와주기 위한 레이블과 플레이스홀더(Placeholder)들을 가져야 할 것입니다. name 속성은 서버에 폼 값을 보내기 위한 것만이 아니라 브라우저가 사용자를 위해 어떻게 자동으로 폼을 채워줄 수 있는지를 위한 중요한 힌트들을 주는데도 사용됩니다.


사용자들이 모바일 디바이스에서 빠르고 간단하게 콘텐트에 진입할 수 있도록 하기 위해 시멘틱 타입(Semantic Type)들을 추가할 것입니다. 예를 들자면, 전화번호에 진입했을 때 사용자는 바로 다이얼 패드를 볼 것입니다.


<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

#### 비디오와 정보 섹션의 생성

콘텐츠의 비디오 및 정보 섹션은 좀 더 많은 것을 포함하고 있습니다.
이는 상품 기능의 목록들을 포함하고 또한 상품을 사용자에게 보여줄 비디오 플레이스홀더(Placeholder)를 가질 것입니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

비디오들은 종종 보다 인터랙티브한 방식으로 콘텐츠를 기술하는데 사용되며 상품이나 컨셉의 데모를 보여주기 위해 빈번하게 사용됩니다.

다음과 같이 최적의 사례를 따라 사이트에 비디오를 쉽게 통합할 수 있을 것입니다.

*  사람들이 비디오 재생을 쉽게 할 수 있도록 만들어주는 `controls` 속성 추가하기
*  콘텐츠의 미리보기를 제공하는 `poster` 이미지 추가하기
*  비디오 포맷들에 기반한 여러개의 `<source>` 요소들 추가하기
*  윈도우 내에서 비디오를 재생할 수 없을 경우 다운로드할 수 있도록 해주는 대체 텍스트 추가하기

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

#### 이미지 섹션 생성하기

이미지가 없는 사이트는 조금 지루할 수 있습니다. 여기 다음과 같은 두가지 형태의 이미지가 있습니다.

*  콘텐츠 이미지들(Content Images) &mdash; 문서 내에 나열되어 콘텐츠에 대한 추가적인 정보를 전달하기 위해 사용되는 이미지들
*  스타일 이미지들(Stylistic Image) &mdash; 사이트를 더 멋지게 보이도록 만들기 위해 사용하는 이미지들로써 대개 배경 이미지들, 패턴 및 그레이디언트들입니다. 우리는 이를 [다음 글]({{page.nextPage.relative_url}})에서 이를 다룰 것입니다.


우리 페이지에서 이미지 섹션은 콘텐츠 이미지들의 집합입니다.

콘텐츠 이미지들은 페이지의 의미를 전달하기 위해 중요합니다. 이들을 신문 기사에서 사용되는 이미지로써 생각해봅시다. 이 프로젝트에서 사용되는 이미지들은 Chris Wilson, Peter Lubbers 그리고 Sean Benner과 같은 강사들의 사진입니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

이미지들은 화면 폭의 100%로 스케일이 설정될 것입니다. 이는 좁은 뷰포트를 가진 디바이스에서 잘 동작하지만 (데스크탑과 같은) 넓은 뷰포트를 가진 디바이스에서는 그리 멋지게 동작하지는 않습니다. 이는 반응형 디자인에서 다시 다룰 것입니다.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

많은 사람들이 이미지를 보거나 스크린 리더와 같은 페이지의 데이터를 파싱하고 축약한 뒤 사용자에게 제공하는 보조 기술들을 사용하는데 익숙하지는 않습니다. 우리는 스크린 리더가 사용자에게 설명할 수 있도록 콘텐츠의 모든 이미지들이 서술적인 `alt` 태그를 가지도록 해야 합니다.

`alt` 태그들을 추가할 때 이미지를 충분히 설명할 수 있을 만큼만 간결한 대체 텍스트를 유지하도록 합니다. 예를 들어 데모에서 우리는 단순하게 "이름: 역할"로 속성을 구성하였으며 이는 사용자에게 이 세션을 이해하기 위한 충분한 정보인 저자와 그들의 분야가 무엇인지를 표현할 것입니다.

#### 표 데이터 섹션 추가하기

마지막 섹션은 상품의 명확한 통계를 보여주기 위해 사용될 간단한 테이블입니다.

테이블은 (행렬 형태로 구성된 정보와 같은) 표 데이터를 위해서만 사용되어야 합니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

#### 꼬리말(Footer) 추가하기

대부분의 사이트들은 사용 조건, 면책 조항 그리고 페이지의 주요 메뉴나 주요 영역이 될 수 없는 다른 콘텐츠들과 같은 내용들을 보여주기 위해 꼬리말(Footer)를 필요로 합니다.

우리 사이트에서는 사용 조건, 연락처 페이지 그리고 소셜 미디어 프로필 정도를 링크할 것입니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### 요약

우리는 사이트의 윤곽을 생성하고 주요한 모든 구조적인 요소들을 확인하였습니다. 또한 사업적 요구사항들을 만족하는데 필요한 모든 연관된 콘텐츠들을 보유하고 있는지를 확인하였습니다.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

여러분은 이제 페이지가 어설프게 보인다는 점이 신경쓰일 것입니다만 아직까지 이는 의도된 것입니다.
콘텐츠는 모든 사이트에서 가장 중요한 부분이며 훌륭한 정보구조와 충실한 정보를 가지고 있는지 확실히 하는 것이 필요합니다. 이 가이드는 구축을 위한 탁월한 기반을 제공할 것입니다. 다음 가이드에서는 이 콘텐츠들를 꾸며보도록 하겠습니다.




## 반응형으로 만들기 



Translated By: 




웹은 작은 화면의 전화기부터 커다란 화면의 텔레비전까지 폭넓은 범주의 디바이스에서 접근이 가능합니다. 각 디바이스는 자체적인 장점들과 더불어 단점들을 가지고 있습니다. 웹 개발자로서의 여러분은 모든 범주의 디바이스를 지원하기를 원할 것입니다.


현재 여러분은 여러가지 화면 크기들과 형태의 디바이스들에서 동작하는 사이트를 구축하고 있습니다. [이전 글]({{page.previousPage.relative_url}})에서 우리는 페이지의 정보구조를 만들고 기초적인 형태를 생성했습니다. 이 가이드에서 여러분은 콘텐츠를 포함한 기초적인 형태를 가지게 될 것이며 이를 대다수의 화면 크기에 반응하는 아름다운 페이지로 만들어 낼 것입니다.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Content">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Content and structure </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Final site </a> </figcaption>
  </figure>
</div>

모바일 우선(Mobile First) 웹 개발의 원칙을 따라 &mdash; 모바일 폰과 같은 &mdash; 좁은 뷰포트에서 시작하여 이에 대한 사례를 먼저 구축합니다.
그리고나서 보다 큰 디바이스 종류들로 확장합니다.
이는 뷰포트를 점점 더 크게 만들어 가는 것으로 작업할 수 있으며 디자인과 레이아웃이 옳게 보이는지에 대한 판단을 할 수 있도록 합니다.

이전에 우리는 어떻게 콘텐츠가 보여져야 할지에 대한 각기 다른 고수준 디자인 2개를 만들었습니다. 이제 페이지가 그 각각의 레이아웃에 적용되도록 만들 필요가 있습니다. 우리는 콘텐츠가 화면 크기에 어떻게 어울릴지에 기초하여 &mdash; 레이아웃과 스타일이 변경되는 위치인 &mdash; 분할지점(Breakpoint)의 위치들을 결정함으로써 이를 진행할 수 있습니다.

### TL;DR {: .hide-from-toc }
- 항상 뷰포트(viewport)를 사용하세요.
- 언제나 좁은 뷰포트부터 시작해서 확대해나가세요.
- 콘텐츠 적용이 필요할 때 분할지점에 기반해서 작업하세요.
- 주요 분할지점들 간의 고품질 레이아웃을 예측하며 작업하세요.


### 뷰포트 추가하기

기본 페이지를 위해서라도 **반드시** 뷰포트(viewport) 메타 태그를 포함시켜야 합니다.
뷰포트는 멀티 디바이스용 사례들을 구축하기 위해 필요한 가장 중요한 요소입니다.
즉, 뷰포트 없이는 사이트가 모바일 디바이스에서 제대로 동작하지 않을 것입니다.

뷰포트는 페이지가 화면에 어떻게 맞춰져야 하는지를 브라우저에게 알려줍니다. 페이지 표현를 제어하기 위한 뷰포트를 정의할 수 있는 방법은 다양합니다. 기본적으로는 다음을 권장합니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

뷰포트는 문서의 head 내에 존재하며 딱 한번만 정의하면 됩니다.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

### 간단한 스타일 적용하기

우리 상품과 회사는 이미 스타일 가이드 내에 매우 명확한 브랜딩 방법과 폰트 가이드라인을 가지고 있습니다.

#### 스타일 가이드

스타일 가이드는 페이지의 시각적 표현에 대한 높은 수준의 이해를 할 수 있는 유용한 방법을 제공하며, 이는 디자인 전체에 대해 밀접하게 작업할 수 있도록 만들어 줍니다.

##### 색상들

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### 스타일 이미지 추가하기

이전 가이드에서 우리는 "콘텐츠 이미지"라고 불리는 이미지를 추가했습니다. 이는 상품의 서술에 중요한 이미지들입니다. 스타일 이미지(Stylistic Image)는 핵심적인 콘텐츠의 일부로 필요한 것은 아니지만 시각적인 효과를 추가하거나 콘텐츠의 특정 부분에 사용자의 주의를 환기시키는데 도움을 줍니다.

이에 대한 좋은 예는 '상단노출면'의 헤드라인 이미지입니다. 이는 사용자가 상품에 대해 더 많은 내용을 읽도록 이끄는데 종종 사용됩니다.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Designed site">
</div>

이들은 매우 쉽게 포함될 수 있습니다. 우리의 경우에는 헤더의 배경이 될 것이고 몇가지 간단한 CSS를 통해 이를 적용할 수 있습니다.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

(사용자의 시점이) 콘텐츠로부터 벗어나지 않도록 흐림 효과가 적용된 단순한 배경 이미지를 선택했으며 언제나 정확한 비율을 유지하여 늘어나도록 하는 방법으로 전체 엘리먼트가 `커버`되도록 설정했습니다.


<br style="clear: both;">

### 첫 분할지점 설정하기

디자인은 600px 정도로 넓어지면 예쁘지않게 보이기 시작합니다. 이 경우, 한 라인의 길이는 10 단어(읽기에 최적화된 길이) 이상으로 변경되며 이곳이 수정하고자 하는 위치입니다.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/firstbreakpoint.mov">비디오 다운로드하기</a>.
  </p>
</video>

화면에 더 잘 맞도록 엘리먼트들의 위치들을 변경하기에는 600px이 유리할 것이므로 첫번째 분할지점(Breakpoint)를 설정하기에 좋은 위치로 보입니다. 이는 [미디어 쿼리(Media Queries)]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)로 불리는 기술을 사용하여 처리할 수 있습니다.




    @media (min-width: 600px) {
    
    }
    

더 큰 화면은 더 많은 여백이 존재하므로 어떻게 콘텐츠를 보여줄 것인지에 대해 더욱 더 유연합니다.

<!-- TODO: Verify note type! -->
Note: 한번에 모든 엘리먼트들을 이동할 필요는 없으며, 필요하다면 더 작은 단위의 조정을 할 수 있을 것입니다.

우리 상품 페이지의 흐름 상 다음과 같은 것들이 필요할 것으로 보입니다.

*  디자인의 최대 폭 제한하기
*  엘리먼트의 패딩(Padding) 바꾸기와 텍스트 크기 줄이기
*  폼을 헤딩 콘텐츠와 한 줄(In-line)로 만들기
*  비디오를 콘텐츠 주변에 배치하도록 만들기
*  이미지의 사이즈를 줄이기와 보다 나은 그리드 내에 나타나도록 만들기

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

### 디자인의 최대 폭 제한하기

우리는 구축 과정을 크게 단순하게 만들어줄 좁은 뷰포트와 넓은 뷰포트 이 두 가지의 주요 레이아웃만을 가지기로 하였습니다. 

또한 좁은 뷰포트에서뿐만이 아니라 넓은 뷰포트에서도 여백없이 가득 차도록 처리되는 섹션들을 생성하기로 하였습니다. 이는 엄청나게 넓은 화면들에서 텍스트와 문단들이 길고 단일한 하나로 확장되지 않도록 화면의 최대폭을 제한해야한다는 것을 의미합니다. 이 지점을 약 800px로 선택하도록 하겠습니다.


이를 위해 엘리먼트들의 폭과 중점을 제한할 필요가 있습니다. 우리는 각 주요 세션들 주위에 컨테이너를 생성하고 `margin: auto`를 적용하여야 할 것입니다. 이는 화면이 커지더라도 콘텐츠는 800px의 최대 폭에서 중앙에 위치한 채로 남아있도록 할 것입니다.

컨테이너는 다음과 같이 간단한 `div`가 될 것입니다.

{% highlight html %}<div class="container">...</div>{% endhighlight %}

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml" lang=html %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container" lang=css %}
</pre>

### 패딩 바꾸기와 텍스트 크기 줄이기

좁은 뷰포트는 콘텐츠를 보여주기 위한 많은 공간이 없으므로 종종 이를 화면에 맞추기 위해 활자의 크기와 가중치(Weight)를 과감히 줄일 수 있습니다.

더 큰 뷰포트에 대해 사용자가 좀더 큰 화면을 사용할 것이라는 고려를 할 필요는 있지만 이는 지나친 것일 수도 있습니다. 콘텐츠의 가독성을 증가시키기 위해 활자의 크기와 가중치를 증가할 수 있으며 또한 구분된 영역이 더욱 두드러지게 하기 위해 패딩(Padding)을 바꿀 수도 있습니다.

우리는 상품 페이지에서 섹션 엘리먼트들의 패딩을 폭(Width)의 5%로 설정하여 통해 여백이 늘어나도록 할 것입니다. 또한 각 섹션에 대한 헤더 크기도 증가시킬 것입니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

### 넓은 뷰포트에 대한 엘리먼트 적용하기

우리의 좁은 뷰포트는 선형의 디스플레이가 차곡차곡 쌓인 형태입니다. 각 주요 섹션들과 섹션들 내의 콘텐츠는 위에서 아래까지 순서대로 보여질 것입니다.

넓은 뷰포트는 콘텐츠를 화면에 대해 최적화된 방식으로 보여주기 위해 사용할 수 있는 추가적인 여백을 제공합니다. 이는 상품 페이지에서 우리가 정보구조(IA)에 따라 다음과 같은 일들을 할 수 있다는 것을 의미합니다.

*  헤더 정보 주변으로 폼 이동하기
*  비디오를 알맞은 요점 부분에 위치시키기
*  이미지를 이용한 타일 구성하기
*  테이블의 확장하기

#### 폼(Form) 엘리먼트 다루기

좁은 뷰포트는 화면 상에 엘리먼트들을 편안하게 배치할 수 있는 것이 가능한 수평 공간이 별로 없음을 의미합니다.

수평 화면 공간의 보다 효율적인 사용을 위해 헤더가 선형으로 구성되는 것을 깨뜨려야 할 필요가 있으며 폼과 리스트를 나란하도록 옮겨야 할 것입니다.


<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat" lang=css %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/floatingform.mov">비디오 다운로드하기</a>.
  </p>
</video>

#### 비디오 엘리먼트 다루기

좁은 뷰포트 내의 비디오 인터페이스는 화면의 전체 너비가 되며 주요 기능들의 리스트 다음에 위치하도록 디자인되었습니다. 넓은 뷰포트에서는 비디오 인터페이스가 너무 크게 확대되고 기능 리스트 다음에 위치할 때 이상하게 보일 수 있을 것입니다.

비디오 엘리먼트는 좁은 뷰포트에서는 수직 형태의 흐름으로 구성될 필요가 있으며 넓은 뷰포트에서는 콘텐츠의 항목 리스트와 나란히 보여져야 할 것입니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo" lang=css %}
</pre>

#### 이미지를 이용한 타일 구성하기

(대부분의 모바일 디바이스들과 같은) 좁은 뷰포트에서 이미지 인터페이스는 화면의 전체 너비로 설정되어야 하며 수직 형태로 쌓여집니다. 이는 더 넓은 뷰포트에서는 잘 확대되지 않습니다.

이미지를 넓은 뷰포트에서 제대로 보여지도록 하기 위해서는 이는 컨테이너 너비의 30%로 조절하고 (좁은 뷰포트에서처럼 수직으로 펼쳐지는 것 대신) 수평으로 펼쳐집니다. 또한 이미지가 보다 매력적으로 보이도록 하기 위해 약간의 둥근 테두리와 box-shadow를 추가할 것입니다.


<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages" lang=css %}
</pre>

#### 이미지를 DPI에 반응형으로 만들기

이미지를 사용할 때,
뷰포트의 사이즈와 화면의 밀도(Density)를 고려해야 합니다.

웹은 96dpi 화면을 위해 구축되었습니다. 랩탑의 레티나급 디스플레이를 언급할 필요도 없이 우리는 화면의 픽셀 밀집도가 모바일 디바이스들의 도입과 함께 비약적으로 증가하는 것을 보아왔습니다. 96dpi로 인코딩된 이미지는 일반적으로 높은 DPI 디바이스에서 몹시 이상하게 보일 수 있습니다.

이에 대해 폭넓게 적용할 수 있는 해결방법은 아직 없습니다만,
지원 브라우저에 한하여 고밀도 디스플레이에서는 고밀도 이미지를 보여줄 수는 있습니다.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

#### 테이블

테이블은 작은 뷰포트를 가진 디바이스에서 제대로 처리하기 매우 힘들고 특별한 고려 사항을 필요로 합니다.

작은 뷰포트에서 2개의 행을 가진 테이블을 만들고 세로로 구분되도록 하기 위해 우리는 헤딩과 하나의 행 내의 셀들을 바꾸는 것을 추천합니다.



<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>현재 브라우저에서 비디오를 지원하지 않습니다.
     <a href="videos/responsivetable.mov">비디오 다운로드하기</a>.
  </p>
</video>

우리 사이트에서,
우리는 테이블 콘텐츠만을 위한 추가적인 분할지점을 생성해야 했습니다.
여러분이 모바일 우선으로 사이트를 구축할 때, 적용된 스타일들을 원래대로 되돌리는 것은 매우 힘들기 때문에 반드시 작은 뷰포트의 테이블에 대한 CSS를 넓은 뷰포트용 CSS에서 잘라내어야 합니다.
이는 깔끔하고 일관적인 분할을 할 수 있도록 해줍니다.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" lang=css %}
</pre>

### 정리

**축하합니다.** 이 가이드를 읽는 동안, 여러분은 광범위한 디바이스과 형식인자(Form-factor)들, 화면 사이즈를 가지는 디바이스에서 동작하는 간단한 상품 방문 페이지에 대한 첫걸음을 내딛었습니다.


이 가이드라인을 따랐다면, 다음과 같은 사항에 대해 순조롭게 출발할 수 있을 것입니다.

1.  기초적인 정보구조(IA) 생성하기와 코딩 이전의 콘텐츠에 대해 이해하기.
2.  항시 뷰포트 설정하기.
3.  모바일 우선(Mobile First)에 대한 기반 사례 구축하기.
4.  먼저 모바일 사례를 구축한 뒤, 제대로 보이지 않을 때까지 디스플레이 너비를 증가하고 그 부분에 분할지점 설정하기.
5.  반복적으로 수행하기


