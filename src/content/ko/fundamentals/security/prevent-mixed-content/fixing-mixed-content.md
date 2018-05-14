project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 혼합 콘텐츠를 찾아 수정하는 것은 중요한 작업이지만 많은 시간이 소요될 수 있습니다. 이 가이드에서는 해당 프로세스를 지원하는 데 사용할 수 있는 몇몇 도구에 대해 설명합니다.

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2017-07-12 #}

# 혼합 콘텐츠 방지 {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

Success: 웹사이트에 대한 HTTPS 지원은 사이트와 사용자를 공격으로부터 보호하는 중요한 단계이지만 혼합 콘텐츠가 해당 보호를 쓸모없게 만들 수 있습니다. 사이트와 사용자를 보호하려면 혼합 콘텐츠 문제를 찾아 수정해야 합니다.

혼합 콘텐츠를 찾아 수정하는 것은 중요한 작업이지만 많은 시간이 소요될 수 있습니다. 이 가이드에서는 해당 프로세스를 지원하는 데 사용할 수 있는 몇몇 도구와 기술에 대해 설명합니다. 혼합 콘텐츠에 대한 자세한 내용은 [혼합 콘텐츠란?](./what-is-mixed-content)을 참조하세요.

### TL;DR {: .hide-from-toc }

* 페이지에서 리소스를 로드할 때 항상 https:// URL을 사용합니다.
* `Content-Security-Policy-Report-Only` 헤더를 사용하여 사이트에서 혼합 콘텐츠 오류를 모니터링합니다.
* `upgrade-insecure-requests` CSP 지시문을 사용하여 보안되지 않은 콘텐츠로부터 방문객을 보호합니다.

## 혼합 콘텐츠를 찾아 수정하기 

혼합 콘텐츠를 수동으로 찾는 것은 문제의 개수에 따라 많은 시간이 소요될 수 있습니다. 이 문서에서 설명하는 절차에서는 Chrome 브라우저를 사용하지만, 최신 브라우저라면 이 절차를 수행하는 데 도움되는 유사한 도구가 제공될 것입니다.

### 사이트를 방문하여 혼합 콘텐츠 찾기

Google Chrome에서 HTTPS 페이지를 방문하면 브라우저가 JavaScript 콘솔의 오류 및 경고로서 
혼합 콘텐츠가 있음을 경고합니다.

이런 경고를 보려면 혼합 콘텐츠 또는 능동적 혼합 콘텐츠 샘플 페이지로 이동해 Chrome JavaScript 콘솔을 여세요. 콘솔은 View 메뉴(_View_ -&gt; _Developer_ -&gt; _JavaScript Console_)에서 열거나 페이지를 마우스 오른쪽 버튼으로 클릭한 다음 _Inspect Element_ 와 _Console_ 을 차례로 선택하여 열 수 있습니다.

[혼합 콘텐츠란?](what-is-mixed-content#passive-mixed-content){: .external} 페이지에서 [수동적 혼합 콘텐츠의 예](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external}를 실행하면 아래와 같이 혼합 콘텐츠 경고가 표시됩니다.

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure video. This content should also be served over HTTPS.">
</figure>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

하지만 활성 혼합 콘텐츠 예시는 다음과 같이 혼합 콘텐츠 오류를 
표시합니다.

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure resource. This request has been blocked; the content must be served over HTTPS.">
</figure>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


사이트의 소스에서 이런 오류와 경고에 표시되는 http:// URL을 수정해야 합니다. 이런 오류와 경고를 찾은 페이지와 함께, 이들을 수정할 때 사용할 URL 목록을 만들면 도움이 됩니다. 

참고: 혼합 콘텐츠 오류 및 경고는 현재 보고 있는 페이지에 대해서만 표시되며, JavaScript 콘솔은 새 페이지로 이동할 때마다 지워집니다. 즉, 사이트의 모든 페이지를 개별적으로 보고 해당 오류를 찾아야 합니다. 일부 오류는 페이지의 일부와 상호작용한 후에만 표시될 수 있습니다. 이전 가이드에서 이미지 갤러리 혼합 콘텐츠 예시를 참조하세요.

### 소스 코드에서 혼합 콘텐츠 찾기

소스 코드에서 혼합 콘텐츠를 직접 검색할 수 있습니다. 소스에서 
`http://`를 검색하고 HTTP URL 속성을 포함하는 태그를 찾습니다.
특히 이전 가이드의 [혼합 콘텐츠 유형 및 관련 보안 위협](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external}에 나열된 태그를 찾습니다.
앵커 태그(`<a>`)의 href 속성에 `http://`가 있으면 
혼합 콘텐츠 문제가 아닌 경우가 많습니다(몇몇 현저한 예외는 나중에 설명함). 

Chrome 혼합 콘텐츠 오류 및 경고에서 HTTP URL 목록이 있는 경우 
소스에서 이러한 전체 URL을 검색하여 사이트에 포함된 위치를 찾을 
수도 있습니다. 

### 혼합 콘텐츠 수정

사이트의 소스에서 혼합 콘텐츠가 포함된 위치를 찾은 후에 
다음 단계에 따라 수정합니다.

Chrome에서 다음 혼합 콘텐츠 오류를 예시로 사용합니다.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure image. This content should also be served over HTTPS.">
</figure>

해당 오류를 아래 소스에서 찾았습니다.
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg"> 

#### 1단계

브라우저에서 새 탭을 열고
주소 표시줄에 URL을 입력하고 `http://`를 `https://`로 변경하여 HTTPS를 통해 해당 URL을 사용할 수 있는지 확인합니다.

**HTTP**와 **HTTPS**를 통해 표시된 리소스가 동일한 경우 아무 이상이 없습니다.
[2단계](#step-2)로 진행합니다.

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      HTTP 이미지가 오류 없이 로드됩니다.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      HTTPS 이미지가 오류 없이 로드되고 HTTP 이미지와 동일합니다. <a href="#step-2">2단계</a>로 이동하세요!
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

인증서 경고가 표시되는 경우 **HTTPS**를 통해 콘텐츠를
표시할 수 없는 경우 리소스를 안전하게 사용할 수 없습니다.

<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      HTTPS를 통해 사용할 수 없는 리소스
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      HTTPS를 통해 리소스를 보려고 시도할 때 발생한 인증서 경고
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

이 경우 다음 옵션 중 하나를 고려해야 합니다.

* 가능한 경우 다른 호스트의 리소스를 포함합니다.
* 권한이 있는 경우 사이트의 콘텐츠를 직접 다운로드하고 호스팅합니다.
* 사이트에서 리소스를 완전히 제외합니다.

#### 2단계

URI를 `http://`에서 `https://`로 변경하고 원본 파일을 저장하고 필요한 경우 업데이트한 파일을 다시 배포합니다.

#### 3단계

오류를 처음에 찾은 페이지를 보고 오류가 더 이상 나타나지 않는지 확인합니다.

### 비표준 태그 사용 주의

사이트에서 비표준 태그 사용에 주의합니다. 예를 들어, 앵커(`<a>`)
태그 URL은 브라우저가 새 페이지를 탐색하게 하므로 그 자체로 
혼합 콘텐츠를 유발하지 않습니다. 즉, 앵커 태그 URL은 수정할 필요가 없습니다. 그러나 
일부 이미지 갤러리 스크립트는 `<a>` 태그의 기능을 재정의하고 
`href` 속성이 지정한 HTTP 리소스를 페이지의 라이트박스 표시에 로드하여 
혼합 콘텐츠 문제를 발생시킵니다. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

위 코드에서 `<a>` 태그 href를 `http://`로 두는 것이 안전하지만 
샘플을 보고 이미지를 클릭하면 
혼합 콘텐츠 리소스를 로드하여 페이지에 표시합니다. 

## 혼합 콘텐츠를 일정한 척도에 따라 처리

위의 수동 단계는 작은 웹사이트에 잘 작동하지만 큰 웹사이트(개별 개발팀이 많은 사이트)의 
경우 로드 중인 모든 콘텐츠를 추적하는 것이 
어려울 수 있습니다. 이 작업을 지원하기 위해 콘텐츠 보안 정책을 
사용하여 혼합 콘텐츠에 대해 알리도록 브라우저에 지시하고 
페이지가 예기치 않게 보안되지 않은 리소스를 절대로 로드하지 않게 할 수 있습니다.

### 콘텐츠 보안 정책

[**콘텐츠 보안 정책**](/web/fundamentals/security/csp/)(CSP)은 혼합
콘텐츠를 일정한 척도에 따라 관리하는 데 사용할 수 있는 다용도 브라우저 
기능입니다. CSP 보고 메커니즘을 사용하여 사이트에서 혼합 콘텐츠를 추적할 수 있습니다.
그리고 적용 정책을 통해 혼합 콘텐츠를 업그레이드
또는 차단하여 사용자를 보호할 수 있습니다. 

페이지에 대한 이러한 기능은 서버에서 전송한 응답에 
`Content-Security-Policy` 또는 `Content-Security-Policy-Report-Only` 헤더를 포함하여 
활성화할 수 있습니다. 또한, 페이지의 `<head>` 섹션에서 `<meta>` 태그를 사용하여 (`Content-Security-Policy-Report-Only`가 **아니라**) 
`Content-Security-Policy`를 
설정할 수 있습니다. 아래 절에 있는 
예시를 참조하세요.

CSP는 혼합 콘텐츠 용도 이외의 많은 것에 유용합니다. 다른 CSP 지시문에 대한 정보는 다음 리소스에서 찾을 수 있습니다.

* [Mozilla의 CSP 소개](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [HTML5 Rocks의 CSP 소개](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP 놀이터](http://www.cspplayground.com/){: .external }
* [CSP 사양](//www.w3.org/TR/CSP/){: .external }

참고: 브라우저는 수신한 <b>모든</b> 콘텐츠 보안 정책을 적용합니다.
응답 헤더 또는
<code>&lt;meta&gt;</code> 요소에서 브라우저가 수신한 다중 CSP 헤더 값은 결합되어 단일 정책으로 적용됩니다. 마찬가지로 보고 정책도
결합됩니다. 정책은 정책의 교집합을 취하여 결합됩니다.
즉, 첫 번째 이후의 각 정책은 허용되는 콘텐츠를 추가로 제한할 수만 있으며
확장하지는 못합니다.

### 콘텐츠 보안 정책을 사용하여 혼합 콘텐츠 찾기 

콘텐츠 보안 정책을 사용하여 사이트에서 혼합 콘텐츠 보고서를 
수집할 수 있습니다. 이 기능을 활성화하려면 `Content-Security-Policy-Report-Only` 
지시문을 사이트에 대한 응답 헤더로 추가하여 설정합니다. 

응답 헤더:  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


사용자가 사이트의 페이지를 방문할 때마다 브라우저가 콘텐츠 보안 정책을 
위반 사항에 관한 JSON 서식의 보고서를 
`https://example.com/reportingEndpoint`로 보냅니다. 이 경우 HTTP를 통해 
하위 리소스가 로드될 때마다 보고서가 전송됩니다. 해당 보고서는 정책 위반이 발생한 
페이지 URL과 정책을 위반한 하위 리소스 URL을 
포함합니다. 보고 엔드포인트를 구성하여 해당 
보고서를 로그하면 각 페이지를 방문하지 않고 사이트에서 혼합 콘텐츠를 추적할 수 
있습니다. 

이와 관련하여 다음 두 가지를 주의해야 합니다.

* 사용자는 CSP 헤더를 이해하는 브라우저에서 페이지를 방문해야 합니다.
  대부분의 최신 브라우저는 CSP 헤더를 이해합니다.
* 사용자가 방문한 페이지에 대한 보고서만 가져옵니다. 따라서 트래픽이 많지 않은 
  페이지의 경우 전체 사이트에 대한 보고서를 가져오는 데 
  약간이 시간이 소요될 수 있습니다.

CSP 헤더 서식에 대한 자세한 내용은 [콘텐츠 보안 정책 사양](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}을 참조하세요. 

보고 엔드포인트를 구성하지 않으려면 
[https://report-uri.io/](https://report-uri.io/){: .external}가 합리적인 
대안입니다.

### 보안되지 않은 요청 업그레이드

혼합 콘텐츠를 자동 수정하는 최상의 최신 도구는 
[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external} 
CSP 지시문입니다. 이 지시문은 네트워크 요청을 하기 전에 보안되지 않은 URL을 
업그레이드하라고 브라우저에 지시합니다.

예를 들어, 페이지에 HTTP URL이 있는 이미지 태그가 포함된 경우

 
    <img src="http://example.com/image.jpg"> 


브라우저가 
<code><b>https:</b>//example.com/image.jpg</code>에 대한 보안 요청을 대신 수행하므로 사용자를 혼합 콘텐츠로부터 
보호합니다.

이 지시문과 함께 `Content-Security-Policy` 헤더를 전송하여 
이 동작을 활성화할 수 있습니다.


    Content-Security-Policy: upgrade-insecure-requests  


또는 `<meta>` 요소를 사용하여 문서의 `<head>` 
섹션에 동일한 지시문 인라인을 포함하여 동일한 효과를 낼 수 있습니다.

  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


HTTPS를 통해 리소스를 사용할 수 없는 경우 
업그레이드된 요청이 실패하고 리소스가 로드되지 않음에 주목할 만합니다. 이는 페이지의 보안을 유지합니다. 

`upgrade-insecure-requests` 지시문은 `<iframe>` 문서에 계단식으로 배열되며 
전체 페이지를 보호합니다.

### 모든 혼합 콘텐츠 차단

일부 브라우저는 upgrade-insecure-requests 지시문을 지원하지 
않으므로 
[**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external}
CSP 지시문을 대안으로 사용하여 사용자를 보호할 수 있습니다. 이 지시문은 혼합 콘텐츠를 절대로 로드하지 말라고 브라우저에 지시하므로 
활성 혼합 콘텐츠와 
수동적 혼합 콘텐츠를 포함한 모든 혼합 콘텐츠 리소스 요청은 차단됩니다. 이 옵션도 `<iframe>` 문서에 계단식으로 배열되며 
전체 페이지에 혼합 콘텐츠가 없게 합니다.

이 지시문과 함께 `Content-Security-Policy` 헤더를 전송하여 
페이지가 이 동작에 옵트인할 수 있습니다.

  
    Content-Security-Policy: block-all-mixed-content  


또는 `<meta>` 요소를 사용하여 문서의 `<head>` 
섹션에 동일한 지시문 인라인을 포함하여 동일한 효과를 낼 수 있습니다.

  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


`block-all-mixed-content`를 사용할 때 모든 콘텐츠가 차단된다는 
단점이 있습니다. 이로써 보안은 강화되지만 페이지에서 해당 리소스를 
더 이상 사용할 수 없습니다. 따라서 사용자가 기대하는 
기능과 콘텐츠를 사용할 수 없습니다. 

### CSP의 대안

Blogger와 같은 플랫폼에서 자동으로 사이트를 호스트해주는 경우 헤더를 수정하고 
CSP를 추가할 수 있는 액세스 권한이 없을 수도 있습니다.
대신에 웹사이트 크롤러를 사용하여 사이트 전반의 
문제를 찾는 것이 유력한 대안이 될 수 있습니다(예: 
[HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 
또는 
[Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external }).


{# wf_devsite_translation #}
