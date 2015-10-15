---
title: "콘텐츠 및 구조 생성"
description: "콘텐츠는 모든 사이트에서 가장 중요한 부분입니다. 이 가이드는 여러분의 첫번째 멀티디바이스용 사이트의 구축 계획을 어떻게 빠르게 수립할 수 있는지를 보여드릴 것입니다."
notes:
  styling:
    - 스타일링은 이후에 진행할 것입니다.
updated_on: 2014-04-23
translators:
  - cwdoh
related-guides:
  create-amazing-forms:
    -
      title: Create amazing forms
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Label and name inputs correctly
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Choose the best input type
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: Forms
        href: fundamentals/input/form/
  video:
    -
      title: Using video effectively
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Change the starting position
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Include a poster image
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
  images:
    -
      title: Using images effectively
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title:  Correct use of images in markup
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title: Image optimization
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - 가장 필요한 콘텐츠 정의하기.
    - 좁고 넓은 뷰포트에 대한 대략적인 정보구조(Information Architecture, IA) 구성하기.
    - 스타일 없이 콘텐츠를 가진 페이지 뷰의 뼈대 만들기
---

<p class="intro">
  콘텐츠는 모든 사이트에서 가장 중요한 부분입니다. 따라서 우리는 콘텐츠를 줄줄 읊어대는 것이 아닌 콘텐츠를 위한 제대로된 기획을 해보도록 합시다. 이 가이드에서 우리는 가장 필요한 콘텐츠를 확인하고, 이에 기초하여 페이지 구조를 생성한 뒤 좁거나 넓은 뷰포트 모두에서 제대로 동작하는 간단한 선형의 레이아웃을 통해 페이지를 표현해 볼 것입니다.
</p>

{% include shared/toc.liquid %}

## 페이지 구조 생성하기

우리에게 필요한 것을 확인해보자면 다음과 같습니다.

1. "CS256: 모바일 웹 개발" 강좌 상품을 고급스럽게 기술할 영역
2. 상품에 관심있는 사용자로부터 정보를 입력받기 위한 폼(Form)
3. 상세한 설명과 비디오
4. 동작을 위한 상품의 이미지
5. 고객 클레임을 지원하기 위한 정보를 가지는 데이터 테이블

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

또한 대략적인 정보구조(Information Architecture)와 좁고 넓은 뷰포트 모두를 위한 레이아웃을 찾을 것입니다.

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

이는 프로젝트의 나머지 부분에서 사용할 페이지 뼈대 내의 대략적인 구역들로 쉽게 변환해 넣을 수 있습니다.

{% include_code src=_code/addstructure.html snippet=structure %}

## 콘텐츠를 페이지에 추가하기

이제 사이트의 기본 구조는 정리되었습니다. 우리는 필요한 섹션들과 섹션들 내에서 보여줄 콘텐츠 그리고 이들이 전체적인 정보구조 내에서 어떻게 위치해야 하는지를 알고 있으므로 이제 사이트 구축을 시작할 수 있을 것입니다.

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### 헤드라인과 폼 생성하기

헤드라인과 응답 요청 폼은 우리 페이지에서 중요한 구성요소입니다. 이들은 반드시 사용자들에게 즉시 보여질 수 있어야 합니다.

헤드라인 내에 다음과 같이 강좌를 설명하기 위한 간단한 텍스트를 추가해봅시다.

{% include_code src=_code/addheadline.html snippet=headline %}

우리는 또한 폼을 채울 필요가 있습니다.
이는 사용자들의 이름, 전화번호 그리고 상담 전화를 하기 좋은 시간을 수집하는 간단한 폼이 될 것입니다. 

모든 폼들은 사용자들이 요소들을 포커싱하고 그것들이 무엇인지 이해하기 쉽게 만들어 주며, 또한 접근성 도구들이 폼의 구조를 이해하는 것을 도와주기 위한 레이블과 플레이스홀더(Placeholder)들을 가져야 할 것입니다. name 속성은 서버에 폼 값을 보내기 위한 것만이 아니라 브라우저가 사용자를 위해 어떻게 자동으로 폼을 채워줄 수 있는지를 위한 중요한 힌트들을 주는데도 사용됩니다.


사용자들이 모바일 디바이스에서 빠르고 간단하게 콘텐트에 진입할 수 있도록 하기 위해 시멘틱 타입(Semantic Type)들을 추가할 것입니다. 예를 들자면, 전화번호에 진입했을 때 사용자는 바로 다이얼 패드를 볼 것입니다.


{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### 비디오와 정보 섹션의 생성

콘텐츠의 비디오 및 정보 섹션은 좀 더 많은 것을 포함하고 있습니다.
이는 상품 기능의 목록들을 포함하고 또한 상품을 사용자에게 보여줄 비디오 플레이스홀더(Placeholder)를 가질 것입니다.

{% include_code src=_code/addcontent.html snippet=section1 %}

비디오들은 종종 보다 인터랙티브한 방식으로 콘텐츠를 기술하는데 사용되며 상품이나 컨셉의 데모를 보여주기 위해 빈번하게 사용됩니다.

다음과 같이 최적의 사례를 따라 사이트에 비디오를 쉽게 통합할 수 있을 것입니다.

*  사람들이 비디오 재생을 쉽게 할 수 있도록 만들어주는 `controls` 속성 추가하기
*  콘텐츠의 미리보기를 제공하는 `poster` 이미지 추가하기
*  비디오 포맷들에 기반한 여러개의 `<source>` 요소들 추가하기
*  윈도우 내에서 비디오를 재생할 수 없을 경우 다운로드할 수 있도록 해주는 대체 텍스트 추가하기

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### 이미지 섹션 생성하기

이미지가 없는 사이트는 조금 지루할 수 있습니다. 여기 다음과 같은 두가지 형태의 이미지가 있습니다.

*  콘텐츠 이미지들(Content Images) &mdash; 문서 내에 나열되어 콘텐츠에 대한 추가적인 정보를 전달하기 위해 사용되는 이미지들
*  스타일 이미지들(Stylistic Image) &mdash; 사이트를 더 멋지게 보이도록 만들기 위해 사용하는 이미지들로써 대개 배경 이미지들, 패턴 및 그레이디언트들입니다. 우리는 이를 [다음 글]({{page.nextPage.relative_url}})에서 이를 다룰 것입니다.


우리 페이지에서 이미지 섹션은 콘텐츠 이미지들의 집합입니다.

콘텐츠 이미지들은 페이지의 의미를 전달하기 위해 중요합니다. 이들을 신문 기사에서 사용되는 이미지로써 생각해봅시다. 이 프로젝트에서 사용되는 이미지들은 Chris Wilson, Peter Lubbers 그리고 Sean Benner과 같은 강사들의 사진입니다.

{% include_code src=_code/addimages.html snippet=images lang=html %}

이미지들은 화면 폭의 100%로 스케일이 설정될 것입니다. 이는 좁은 뷰포트를 가진 디바이스에서 잘 동작하지만 (데스크탑과 같은) 넓은 뷰포트를 가진 디바이스에서는 그리 멋지게 동작하지는 않습니다. 이는 반응형 디자인에서 다시 다룰 것입니다.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

많은 사람들이 이미지를 보거나 스크린 리더와 같은 페이지의 데이터를 파싱하고 축약한 뒤 사용자에게 제공하는 보조 기술들을 사용하는데 익숙하지는 않습니다. 우리는 스크린 리더가 사용자에게 설명할 수 있도록 콘텐츠의 모든 이미지들이 서술적인 `alt` 태그를 가지도록 해야 합니다.

`alt` 태그들을 추가할 때 이미지를 충분히 설명할 수 있을 만큼만 간결한 대체 텍스트를 유지하도록 합니다. 예를 들어 데모에서 우리는 단순하게 "이름: 역할"로 속성을 구성하였으며 이는 사용자에게 이 세션을 이해하기 위한 충분한 정보인 저자와 그들의 분야가 무엇인지를 표현할 것입니다.

### 표 데이터 섹션 추가하기

마지막 섹션은 상품의 명확한 통계를 보여주기 위해 사용될 간단한 테이블입니다.

테이블은 (행렬 형태로 구성된 정보와 같은) 표 데이터를 위해서만 사용되어야 합니다.

{% include_code src=_code/addcontent.html snippet=section3 %}

### 꼬리말(Footer) 추가하기

대부분의 사이트들은 사용 조건, 면책 조항 그리고 페이지의 주요 메뉴나 주요 영역이 될 수 없는 다른 콘텐츠들과 같은 내용들을 보여주기 위해 꼬리말(Footer)를 필요로 합니다.

우리 사이트에서는 사용 조건, 연락처 페이지 그리고 소셜 미디어 프로필 정도를 링크할 것입니다.

{% include_code src=_code/addcontent.html snippet=footer %}

## 요약

우리는 사이트의 윤곽을 생성하고 주요한 모든 구조적인 요소들을 확인하였습니다. 또한 사업적 요구사항들을 만족하는데 필요한 모든 연관된 콘텐츠들을 보유하고 있는지를 확인하였습니다.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Content">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

여러분은 이제 페이지가 어설프게 보인다는 점이 신경쓰일 것입니다만 아직까지 이는 의도된 것입니다.
콘텐츠는 모든 사이트에서 가장 중요한 부분이며 훌륭한 정보구조와 충실한 정보를 가지고 있는지 확실히 하는 것이 필요합니다. 이 가이드는 구축을 위한 탁월한 기반을 제공할 것입니다. 다음 가이드에서는 이 콘텐츠들를 꾸며보도록 하겠습니다.


