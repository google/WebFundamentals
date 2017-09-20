project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 각 페이지에 코드를 몇 줄 추가하여 소셜 미디어를 통해 공유할 때의 사이트 모습에 변화를 줄 수 있습니다. 그러면 이런 방법을 사용할 수 없을 때에 비해 미리보기에 더욱 풍성한 정보를 포함시킬 수 있으므로 사이트로 더 많은 방문자를 끌어들이는 효과를 거둘 수 있습니다.

{# wf_updated_on: 2014-11-08 #}
{# wf_published_on: 2014-10-07 #}

# 소셜 검색 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

각 페이지에 코드를 몇 줄 추가하여 소셜 미디어를 통해 공유할 때의
사이트 모습에 변화를 줄 수 있습니다. 그러면 이런 방법을 사용할 수 없을 때에 비해
미리보기에 더욱 풍성한 정보를 포함시킬 수 있으므로
사이트로 더 많은 방문자를 끌어들이는 효과를 거둘 수 있습니다.


### TL;DR {: .hide-from-toc }
- schema.org 마이크로데이터를 사용하여 Google+에 대한 페이지 제목, 설명 및 이미지를 제공합니다.
- OGP(Open Graph Protocol)를 사용하여 Facebook에 대한 페이지 제목, 설명 및 이미지를 제공합니다.
- Twitter Card를 사용하여 Twitter에 대한 페이지 제목, 설명, 이미지 및 Twitter ID를 제공합니다.

각 페이지에 코드를 몇 줄 추가하여 소셜 미디어를 통해 공유할 때의
사이트 모습에 변화를 줄 수 있습니다. 그러면 이런 방법을 사용할 수 없을 때에 비해
미리보기에 더욱 풍성한 정보를 포함시킬 수 있으므로 사용자 참여도를 높이는 효과를 거둘 수 있습니다.
이런 방법을 사용할 수 없다면
소셜 사이트에서 이미지나 다른 유용한 정보가 없는 기본적인 정보만 제공할 것입니다. 

둘 중 어떤 소셜 사이트를 클릭할 가능성이 더 높을까요? 사람들은 무미건조한 텍스트보다는
이미지에 끌리게 마련이고, 미리보기가 제공되어 찾으려 했던 정보와 연관된 이미지가 보이면
더욱 확신을 가지고 클릭하게 됩니다.

<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      적절한 마크업이 있으면 알맞은 제목, 짧은
      설명, 이미지가 포함됩니다. 이들 항목을 추가하면
      참여도를 높일 수 있습니다.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      적절한 마크업이 없으면 페이지 제목만
      포함됩니다.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

소셜 네트워크에서 친구와 웹사이트를 공유하고 싶은 사용자가 있다면
아마 이 웹사이트가 얼마나 멋진 사이트인지 설명하는 메모를 추가하여 공유할지 모릅니다.
하지만 어떤 웹사이트를 제대로 설명하기가 말처럼 쉬운 일은 아니며 페이지 소유자의 관점에서 중요한 사항을
놓칠 수도 있습니다. 일부 서비스에서는 사용자가 메모로 입력할 수 있는 글자 수가
제한되기도 합니다.

따라서 웹사이트를 개발할 때 웹페이지에 알맞은 메타데이터를 추가해두고 적절한
제목, 설명 및 매력적인 이미지를 제공하면 사용자 입장에서 훨씬 더 쉽고 간편하게 다른 사람과
공유할 수 있을 것입니다. 즉, 사용자가 웹사이트로 연결되는 링크를 설명하느라
소중한 시간을 허비하거나 글자 수에 맞춰 작성하느라 애쓸 필요가 없다는 뜻입니다.

## Google+에서 schema.org + 마이크로데이터를 사용하여 풍부한 스니펫 제공

크롤러는 수많은 메서드를 사용해 페이지를 파싱하고 페이지의 콘텐츠를 이해합니다. [마이크로데이터](http://www.w3.org/TR/microdata/){: .external }와
[schema.org](https://schema.org/){: .external } 용어를
사용하면 소셜 사이트와 검색 엔진이 페이지의 콘텐츠를
더욱 잘 이해할 수 있습니다.

예:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

대부분의 메타데이터는 웹페이지의 헤드 부분에 삽입되지만 마이크로데이터는
컨텍스트가 존재하는 곳에 있습니다.

### `itemscope`를 추가하여 마이크로데이터 범위 정의
`itemscope`를 추가하여 태그를 특정 항목에 대한 콘텐츠 블록으로
지정할 수 있습니다.

### `itemtype`을 추가하여 웹사이트의 유형 정의
`itemscope`와 함께 `itemtype` 속성을 사용하여 항목의 유형을 지정할 수
있습니다. 웹페이지에서 콘텐츠의 유형에 따라 `itemtype`의 값을 결정할 수
있습니다. [이 페이지](https://schema.org/docs/full.html)에서 관련 사항을 찾을 수 있을
것입니다.

### schema.org 용어를 사용해 `itemprop`을 추가하여 각 항목 설명
`itemprop`은 범위에 있는 `itemtype`에 대한 속성을 정의합니다. 소셜 사이트에
메타데이터를 제공할 경우 일반적인 `itemprop` 값은 `name`, `description`
및 `image`입니다.

### 자세히 알아보기
이런 마이크로데이터는 보통
[Google+](https://plus.google.com/){: .external }와 Google 검색을 위해 크롤러에 의미론적 정보를 제공합니다. Google+에서의 스니펫과
렌더링에 대한 자세한 내용은 다음 문서를 참조하세요.

* [문서 렌더링 - Google+ 플랫폼](/+/web/snippet/article-rendering)
* [스니펫 - Google+ 플랫폼](/+/web/snippet/)

### 리치 스니펫 유효성 검사
Google+에서는 다음과 같은 도구를 사용하여 리치 스니펫의 유효성을 검사할 수 있습니다.

* [구조적 데이터 테스트 도구](https://www.google.com/webmasters/tools/richsnippets) - 웹마스터 도구  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## Facebook에서 OGP(Open Graph Protocol)를 사용하여 리치 스니펫 제공

[OGP(Open Graph Protocol)](http://ogp.me/){: .external }는 웹페이지가
다른 Facebook 객체와 동일한 기능을 가질 수 있도록 하기 위해 필요한
메타데이터를 Facebook에 제공합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

이 메타데이터는 페이지의 헤드 부분에 포함시키면 페이지를 공유할 때 리치 스니펫
정보를 제공합니다.

### `og:` 네임스페이스가 지정된 `meta` 태그를 사용하여 메타데이터 설명
`meta` 태그는 `property` 속성과 `content` 속성으로 구성되어 있습니다.
속성과 콘텐츠는 다음과 같은 값을 취할 수 있습니다.

<table>
  <thead>
    <tr>
      <th data-th="Property">속성</th>
      <th data-th="Content">콘텐츠</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">웹페이지의 제목</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">웹페이지의 설명</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">웹페이지의 표준 URL</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">공유 게시물에 첨부된 이미지의 URL</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">웹페이지의 유형을 나타내는 문자열. 자신이 개발한 웹페이지에 적합한 유형은 <a href="https://developers.facebook.com/docs/reference/opengraph/">여기</a>서 찾을 수 있습니다.</td>
    </tr>
  </tbody>
</table>

이런 메타 태그는
전형적으로 [Google+](https://plus.google.com/){: .external } 및
[Facebook](https://www.facebook.com/){: .external } 같은 소셜 사이트에서 크롤러에게 의미론적 정보를 제공합니다.

### 자세히 알아보기
Facebook의 게시물에 첨부할 수 있는 항목에 대한 자세한 내용은
Open Graph Protocol 공식 사이트에서 확인할 수 있습니다.

* [ogp.me](http://ogp.me/){: .external }

### 리치 스니펫 유효성 검사
다음과 같은 도구를 사용하여 Facebook에서 마크업의 유효성을 검사할 수 있습니다.

* [디버거](https://developers.facebook.com/tools/debug/){: .external }

## Twitter Card를 사용하여 Twitter에서 리치 스니펫 제공
[Twitter Card](https://dev.twitter.com/docs/cards)는 
[Twitter에 사용할 수 있는 Open Graph Protocol](https://twitter.com/){: .external }에 대한 확장 프로그램입니다. Twitter Card를
사용하면 자신의 웹페이지로 연결되는 링크를 포함한 트윗에 이미지와 동영상 같은 미디어 첨부파일을 추가할 수
있습니다. 알맞은 메타데이터를 추가하면 페이지로 연결되는 링크를 포함한 트윗에 자신이 추가한
다양하고 풍부한 디테일을 포함하는 카드가 추가됩니다.

### `twitter:` 네임스페이스가 지정된 메타 태그를 사용하여 메타데이터 설명
Twitter Card가 작동하도록 하려면 [도메인 승인을 받아야
하고](https://cards-dev.twitter.com/validator)
`twitter:card`가 `property` 속성 대신 `name` 속성으로 있는 메타 태그가 도메인에 포함되어 있어야
합니다.
  
간단한 예를 들면 다음과 같습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Twitter 사이트의 값에 Twitter ID를 할당하면 Twitter가 공유 게시물에 이 정보를
삽입하므로 사람들이 쉽게 페이지 소유자와 함께
참여할 수 있습니다.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### 자세히 알아보기
Twitter Card에 대해 자세히 알아보려면 아래 사이트를 방문해 보세요.

* [Twitter 개발자 사이트](https://dev.twitter.com/docs/cards)

### 리치 스니펫 유효성 검사
마크업의 유효성을 검사하기 위해 Twitter에서는 다음 도구를 제공합니다.

* [카드 유효성 검사기](https://cards-dev.twitter.com/validator)

## 모범 사례
세 가지 옵션이 모두 주어진 상태에서, 최선의 방법은 그 모두를 웹페이지에
포함시키는 것입니다. 예를 들면 다음과 같습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

마이크로데이터와 OGP는 마크업을 일부 공유한다는 점에 유의하세요.

* `itemscope`는 `head` 태그에 위치함
* `title`과 `description`은 마이크로데이터와 OGP 사이에 공유됨
* `itemprop="image"`는 `property="og:image"`로 `meta` 태그를 재사용하는 대신
`href` 속성이 있는 `link` 태그를 사용함
  
마지막으로, 웹페이지가 각각의 소셜 사이트에서 생각했던 대로 나타나는지 확인한 후에
게시해야 합니다.



{# wf_devsite_translation #}
