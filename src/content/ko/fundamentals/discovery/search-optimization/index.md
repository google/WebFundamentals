project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 웹사이트는 사람만 방문하는 곳이 아닙니다. 실은 검색 엔진 웹 크롤러도 방문하는 곳이죠. 웹사이트의 검색 정확도와 순위를 높이는 방법을 자세히 알아보세요.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-08-30 #}

# 검색 최적화 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

웹사이트는 사람만 방문하는 곳이 아닙니다. 실은 검색 엔진 웹 크롤러도 방문하는 곳이죠. 웹사이트의 검색 정확도와 순위를 높이는 방법을 자세히 알아보세요.

### TL;DR {: .hide-from-toc }
- 웹페이지의 URL 구조를 확인합니다.
- 반응형 디자인이 가장 바람직합니다.
- 별개의 데스크톱/모바일 사이트에는  <code>rel='canonical'</code> + <code>rel='alternate'</code>를 사용합니다.
- 별개의 데스크톱/모바일 HTML을 동적으로 제공하는 단일 URL에는  <code>Vary HTTP</code>를 사용합니다.
- 액세스 권한을 해당 URL을 아는 사용자로 제한하고 싶은 페이지에는  <code>noindex</code>를 사용합니다.
- 비공개로 유지하려는 페이지에는 적절한 인증 메커니즘을 사용합니다.

## 검색 엔진에 사이트 구조 제공

다중 기기 사이트 디자인에서는 웹사이트가 검색 결과에 표시되는 방식이 중요합니다. 이 가이드에서는 웹사이트의 URL 구조를 바탕으로 검색 엔진에 맞춰 웹사이트를 최적화하는 방법을 소개합니다.

반응형 웹페이지를 빌드할 계획이신가요? 별개의 URL이 있는 모바일 전용
버전을 만드실 건가요? 똑같은 URL에서 데스크톱 버전과
모바일 버전을 동시에 지원할 생각이세요? 어떤 경우든 상관없이, 언제든 검색 엔진에 맞춰 웹사이트를
최적화하는 작업을 더 나은 방법으로 수행할 수 있습니다.

### 사이트에 URL 구조 제공

다양한 기기에 콘텐츠를 제공하는 방법은 여러 가지가 있습니다. 그중에서 가장 흔히 사용하는
방법은 다음 세 가지입니다.

**반응형 웹 디자인:** 한 URL에서 동일한 HTML을 제공하고 CSS
미디어 쿼리를 사용하여 클라이언트 측에서 콘텐츠가 렌더링되는 방식을 결정합니다.
예를 들어, 데스크톱과 모바일에서 모두 http://www.example.com/을 사용합니다.

**별개의 모바일 사이트:** 사용자 에이전트에 따라 사용자를 다른 URL로
리디렉션합니다. 데스크톱은 http://www.example.com/,
모바일은 http://m.example.com/으로 사용하는 예를 들 수 있습니다.

**동적 서비스 제공:** 사용자 에이전트에 따라 한 URL에서 서로 다른 HTML을
 제공하는 방법입니다. 예를 들어, 데스크톱과 모바일에서 모두 http://www.example.com/을 사용합니다.

비록 수많은 웹사이트에서는 다른 방법을 사용하지만, 최선의 접근방식은 **반응형 웹 디자인**을 사용하는 것입니다.
 
어떤 URL 구조가 자신의 웹페이지에 적합한지 결정하세요. 그런 다음, 각각의 모범 사례를
바탕으로 검색 엔진에 맞춰 최적화해 보세요.

### 단연 반응형 웹 디자인을 권장합니다

웹사이트를 반응형 웹사이트로 만들 때의 이점은 다음과 같습니다.

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* 사용자 공유에 더욱 친화적인 환경
* 리디렉션 없이 더 빠르게 페이지 로드
* 검색 결과에 대한 단일 URL

<div style="clear:both;"></div>
  
[반응형 웹 디자인 기본 사항](/web/fundamentals/design-and-ux/responsive/)에서 반응형 웹 디자인으로 웹사이트를 빌드하는 방법에 대해 자세히 알아보세요.

### 별개의 URL을 제공할 때 `link[rel=canonical]` 및 `link[rel=alternate]` 사용

서로 다른 URL에서 데스크톱 버전과 모바일 버전으로 비슷한 콘텐츠를 제공하면
사용자와 검색 엔진에게 모두 혼동을 일으킬 수 있습니다.
웹사이트를 보는 사용자와 검색 엔진 입장에서 모두 해당 콘텐츠가 동일한 목적으로 제작된 것인지 분명치 않기 때문입니다. 따라서 다음 사항을 표시해야 합니다.

* 두 URL의 콘텐츠가 똑같다는 점
* 모바일 버전을 위한 URL
* 데스크톱 버전을 위한 URL(표준 URL)

이 정보는 검색 엔진이 콘텐츠의 색인을 더 올바르게 생성하는 데 도움되고
사용자 역시 찾으려던 콘텐츠를 자신이 사용하는 기기에 알맞은 형식으로 찾을 수 있게 해줍니다.

#### 데스크톱 버전에 대체 URL 사용

데스크톱 버전을 제공할 때 `href` 속성에서 모바일 버전을 가리키는 `rel="alternate" 속성이 있는
`link` 태그를 추가하여 다른 URL에
모바일 버전이 따로 제공된다는 점을 표시합니다.

[http://www.example.com/](http://www.example.com/){: .external } HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### 모바일 버전에 표준 URL 사용

모바일 버전을 제공할 때 `href` 속성에서 데스크톱 버전을 가리키는
`rel="canonical"` 속성이 있는 `link` 태그를 추가하여 다른 URL에 데스크톱(표준) 버전이
따로 제공된다는 점을 표시합니다. `"only screen and (max-width: 640px)"` 값을 가진 `media`
속성을 추가하여 검색 엔진이 모바일 버전은 명시적으로 작은 화면을 위한 것임을 이해할 수 있도록 하세요.

[http://m.example.com/](http://m.example.com/){: .external } HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Vary HTTP 헤더 사용

기기 유형을 기준으로 다른 HTML을 제공하면 불필요한 리디렉션이 감소하고
최적화된 HTML 서비스를 제공하고 검색 엔진을 위한 단일 URL을 제공할 수 있습니다. 단, 다음과 같은
여러 가지 단점도 있습니다.

* 사용자의 브라우저와 서버 사이에 중간 프록시가 있을 수 있습니다.
프록시가 사용자 에이전트에 따라 콘텐츠가 변한다는 사실을 모를 경우에는
예기치 않은 결과를 제공할 수도 있습니다.
* 사용자 에이전트에 따라 바뀌는 콘텐츠는
'[클로킹](https://support.google.com/webmasters/answer/66355)'으로 간주될 위험이 있습니다. 참고로, 클로킹은
Google의 웹마스터 가이드라인 위반입니다.

사용자 에이전트에 따라 콘텐츠가 바뀐다는 사실을 검색 엔진에 알려주면
쿼리를 보내고 있는 사용자 에이전트에 대한 검색 결과를 최적화할 수 있습니다.

URL이 사용자 에이전트에 따라 다른 HTML을 제공함을 표시하려면 HTTP 헤더에
`Vary: User-Agent`를 제공합니다. 이렇게 하면 검색 색인 지정 시
데스크톱 버전과 모바일 버전을 따로 처리하고 중간 프록시가
해당 콘텐츠를 정상적으로 캐시하도록 할 수 있습니다.

[http://www.example.com/](http://www.example.com/){: .external } HTTP 헤더


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

데스크톱과 모바일 버전에 URL 구조를 빌드하는 자세한 방법은 [스마트폰에 최적화된 웹사이트 빌드 정보](/webmasters/smartphone-sites/)를 참조하세요.


## 검색 엔진에서 크롤링 및 색인 생성 제어

힘들여 개발한 웹사이트를
전 세계 사람들이 쉽게 알아보고 아무런 문제 없이 방문할 수 있도록 하려면 검색 엔진에 적절히 등록되는 것이 무엇보다도 중요하지만, 잘못 구성하면 검색 결과에 엉뚱한 내용이 포함될 수
있습니다. 이 섹션에서는 크롤러의 작동 방식과 웹사이트 색인 생성 방식을
설명하겠습니다. 이 내용을 잘 이해하여 위와 같은 문제가 생기지 않도록 하세요.

정보를 공유하기에는 웹보다 나은 곳이 없습니다. 웹에 문서를 게시하면
전 세계 어느 곳에서든 바로 이 문서를 확인할 수 있습니다. URL만 정확히 알고 있다면
누구든 특정 웹페이지를 볼 수 있습니다. 바로 이런 점 때문에 검색 엔진이 필요한 것입니다. 검색 엔진이 해당 웹사이트를 찾을 수 있어야겠죠.

하지만 웹에 문서를 업로드하되
사람들이 찾지는 못하도록 하고 싶은 경우도 있을 것입니다. 예를 들어,
블로그의 관리자 페이지는 특정인만 액세스할 수 있어야 합니다. 다른 사람들이
검색 엔진을 통해 그런 페이지를 찾을 수 있게 할 아무런 이점이 없습니다.

이 섹션에서는 특정 페이지가 검색 결과에 나타나지 못하게 제한하는 방법도 설명합니다.


### '크롤링'과 '색인 생성'의 차이점

검색 결과 제어 방법에 대해 알아보기 전에, 먼저 검색 엔진이 웹페이지와 어떻게 상호작용하는지 이해할 필요가 있습니다. 사이트의 관점에서는 검색 엔진이 사이트에 대해 수행하는 작업은 크게 두 가지가 있는데, 그건 바로 크롤링과 색인 생성입니다.  

**크롤링**은 검색 엔진 봇이 웹페이지를 가져와 그 안에 들어 있는 콘텐츠를 분석하는 것입니다. 콘텐츠는 검색 엔진의 데이터베이스에 저장되는데, 콘텐츠를 사용하여 검색 결과 세부 정보를 채우고 페이지 순위를 매기고 링크를 따라 새 페이지를 검색할 수 있습니다.  

**색인 생성**은 검색 엔진이 웹사이트의 URL과 모든 관련 정보를 데이터베이스에 저장하여 언제든 바로 검색 결과로 제공할 수 있도록 하는 것입니다. 

참고: 많은 이들이 크롤링과 색인 생성을 혼동합니다. 크롤링을 금지한다고 해서 검색 결과에 해당 페이지가 나타나지 않는 것은 아닙니다. 예를 들어, 타사 웹사이트에 개발자 자신의 웹페이지 중 하나에 대한 링크가 걸려 있는 경우 크롤링에서 해당 페이지가 차단되더라도 색인은 계속 생성할 수 있습니다. 이 경우에는 검색 결과에 자세한 설명이 부족합니다.

### robots.txt로 크롤링 제어

`robots.txt`라는 텍스트 파일을 사용하여 정당하게 작동하는 크롤러가 웹페이지에 액세스하는 방식을 제어할 수 있습니다. `Robots.txt`는 검색 봇이
사이트를 크롤링하는 방식을 설명하는 간단한 텍스트 파일입니다. (모든 크롤러가 반드시
`robots.txt`를 따르는 것은 아닙니다. 누구든 자체적으로 여기저기 떠도는 크롤러를 만들 수 있다고 상상해 보세요.)

웹사이트 호스트의 루트 디렉토리에 `robots.txt`를 저장합니다. 예를 들어,
사이트의 호스트가 `http://pages.example.com/`인 경우에는 `robots.txt` 파일이
`http://pages.example.com/robots.txt`에 있어야 합니다. 도메인에 다른
스키마, 하위 도메인 또는 포트가 있는 경우
다른 호스트로 간주되므로 각각의 루트 디렉토리마다 `robots.txt`가 있어야
합니다.

간단한 예를 들자면 다음과 같습니다.  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

이는 어떤 봇이라도 웹사이트 전체를 크롤링하지는 못하도록 하겠다는
의미입니다.

다음은 또 다른 예입니다.

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

사용자 에이전트 이름을 표시하여 봇(사용자 에이전트)마다 동작을 지정할 수
있습니다. 위 사례에서는 `Googlebot`이라는
사용자 에이전트가 이 디렉토리 아래의 `/nogooglebot/`과 모든 콘텐츠를 크롤링하지 못하게 하는 경우입니다.  

다음 각 검색 엔진의 도움말 페이지에서 검색 엔진 봇에 대해 자세히 알아보세요.

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


참고: 사이트 크롤링 방식을 제어하려는 **경우** `robots.txt`만 있으면 됩니다. URL `/robots.txt`에 대해 응답 코드 500이 반환되지 않도록 하세요. 이 코드가 반환되면 전체 호스트에 대해 이후의 모든 크롤이 종료되어 빈 검색 결과 세부 정보가 반환되기 때문입니다.

#### robots.txt 테스트

robots.txt가 대상으로 삼는 크롤러가 무엇인지에 따라 검색 엔진
제공자가 `robots.txt` 테스트를 위한 도구를 제공할 수도 있습니다. 예를 들어, Google의 경우 
robots.txt를 테스트할 때 사용할 수 있는
[웹마스터 도구](https://www.google.com/webmasters/tools/robots-testing-tool)에
유효성 검사기가 있습니다.

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex 역시 [비슷한 도구](https://webmaster.yandex.com/tools/robotstxt/)를 제공합니다.  

### 메타 태그로 검색 색인 생성 제어

웹페이지가 검색 결과에 나타나지 않도록 하고 싶을 때는 robots.txt가
해결책이 아닙니다. 이때는 해당 페이지를 크롤링할 수 있도록 허용하고
페이지에 대한 색인을 생성하지 말 것을 명시적으로 나타내야 합니다. 다음 두 가지 해결 방법이 있습니다.

HTML 페이지에 대한 색인이 생성되지 않도록 할 것임을 표시하려면 속성이 `name="robots"` 및 `content="noindex"`로 설정된 특정한 종류의 `<meta>` 태그를 사용하세요.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

`name` 속성의 값을 특정 사용자 에이전트 이름으로 변경하면 범위를 좁힐 수 있습니다. 예를 들어, `name="googlebot"`(대/소문자 구분 없음)은 Googlebot이 페이지에 대한 색인을 생성하지 않을 것임을 나타냅니다.  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

robots 메타 태그에 대한 다른 옵션으로는 다음과 같은 것이 있습니다.  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

#### X-Robots-Tag

이미지, 스타일시트 또는 스크립트
파일과 같은 리소스에 대한 색인을 생성하지 않을 것임을 표시하려면 HTTP 헤더에 `X-Robots-Tag: noindex`를 추가하세요.


    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

특정 사용자 에이전트로 범위를 좁히려면 `noindex` 앞에 그 사용자 에이전트 이름을 삽입하세요.  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

X-Robots-Tag에 대해 자세히 알아보려면 다음을 참조하세요.  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

참고: `robots.txt`를 사용하여 크롤을 허용하지 않을 경우 검색 봇은 페이지 색인 생성을 하지 않을 것이라는 사실을 알지 못한 채 계속 페이지의 색인을 생성할 수 있습니다. 이런 일은 다음과 같은 이유 때문에 발생할 수 있습니다.<ul><li>검색 봇이 다른 웹사이트에 걸려 있는 링크를 따라 해당 웹페이지를 찾을 수 있습니다.</li><li>크롤링할 수 없는 검색 엔진은  <code>noindex</code>를 검색하지 못합니다.</li></ul>

`robots.txt`로 검색 색인을 제어할 수 있을 것이라 기대하지는 마세요.

### 콘텐츠 유형별 예시

크롤링과 색인 생성을 제어하는 최선의 해결책은 무엇일까요? 다양한 유형의 페이지에 대해 다음 몇 가지 해결책을 예시로 보여 드리겠습니다.

#### 누구든 완전히 액세스하고 검색할 수 있는 페이지

웹에서 대부분의 페이지가 이런 유형의 페이지입니다.  

* `robots.txt`가 필요하지 않습니다.
* robots 메타 태그가 필요하지 않습니다.

#### URL을 아는 사람에게만 제한적으로 액세스를 허용하는 페이지

다음과 같은 예를 들 수 있습니다.  

* 블로그 관리자 콘솔 로그인 페이지
* 인터넷 초보 사용자에게 URL을 전달하여 공유하는 비공개 콘텐츠

이런 경우에는 검색 엔진이 페이지 색인을 생성하지 않도록 하고 싶을 것입니다.  

* `robots.txt`가 필요하지 않습니다.
* HTML 페이지에 대해 `noindex` 메타 태그를 사용합니다.
* HTML이 아닌 리소스(이미지, PDF 등)에 대해서는 `X-Robots-Tag: noindex`를 사용합니다.

참고: 자바스크립트 및 스타일시트 파일의 크롤링을 금지해야 할지 궁금하세요? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google은 이런 파일을 이해하기 위해 최선을 다하고 있습니다.</a> 이는 AJAX와 같은 첨단 기술을 통해 사용 가능한 콘텐츠를 찾을 수 있도록 하기 위함입니다. 크롤러가 자바스크립트를 크롤링할 수 있도록 분명히 허용해야 합니다.

#### 권한이 부여된 사용자의 액세스 제한

이 경우에는 누군가 URL을 찾더라도 올바른 인증 정보를 제시하지 않으면 서버가 결과 제공을 거부합니다. 예:  

* 소셜 네트워크에 비공개로 공유한 콘텐츠
* 기업 비용 처리 시스템

이런 유형의 페이지에서는 검색 엔진이 페이지를 크롤링해서도, 색인을 생성해서도 안 됩니다.  

* 올바른 인증 정보 없이 시도하는 액세스에 대해
응답 코드 401 'Unauthorized'를 반환하거나 사용자를 로그인 페이지로 리디렉션합니다.
* 이런 페이지의 크롤링을 거부하기 위해 `robots.txt`를 사용하지 마세요. 사용할 경우 401을 검색할 수 없기 때문입니다.

여기서는 IP 주소, 쿠키, 기본 인증,
OAuth 등이 제한 메커니즘일 수 있습니다. 이런 인증/승인의 구현 방법은
인프라에 따라 다른데, 이 주제는 이 문서에서 다루는 범위를 벗어납니다.

### 검색 엔진의 페이지 삭제 요청

다음과 같은 경우에 검색 결과를 삭제할 수 있습니다.  

* 더 이상 존재하지 않는 페이지인 경우
* 기밀 정보를 포함하는 페이지에 대해 우연히 색인이 생성된 경우


주요 검색 엔진에서는 이런 페이지의 삭제 요청을 보낼 수 있는 방법이 있습니다. 보통 다음과 같은 절차에 따릅니다.  

1. 삭제하려는 페이지가 다음과 같은 페이지인지 확인합니다.
    * 서버에서 이미 삭제되어 404를 반환하는 페이지
    * 색인이 생성되지 않도록 구성된 페이지(예: noindex)

1. 각 검색 엔진에서 요청 페이지로 이동합니다. (Google과 Bing에서는 웹사이트의 소유권을 등록하고 유효성을 검사해야 합니다.)
1. 요청을 보냅니다.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

구체적인 절차는 다음 각 검색 엔진의 도움말 페이지에서 확인하세요.  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### 부록: 크롤러 사용자 에이전트의 목록

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
