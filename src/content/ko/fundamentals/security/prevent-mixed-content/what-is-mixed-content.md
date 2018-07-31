project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 최초 HTML이 안전한 HTTPS 연결을 통해 로드될 때 혼합이 발생하지만 다른 리소스는 안전하지 않은 HTTP 연결을 통해 로드됩니다.

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2015-09-25 #}

# 혼합 콘텐츠란? {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

최초 HTML이 안전한 HTTPS 연결을 통해 로드될 때 **혼합 콘텐츠**가 발생하지만
다른 리소스(예: 이미지, 동영상, 스타일시트, 스크립트)는 안전하지
않은 HTTP 연결을 통해 로드됩니다. 이는
HTTP 콘텐츠와 HTTPS 콘텐츠가 함께 로드되어 동일한 페이지를 표시하므로 혼합 콘텐츠라고
하는데, 최초의 요청은 HTTPS 연결을 통해 보안 처리되었습니다. 최신 브라우저는
이 유형의 콘텐츠에 대한 경고를 표시하여 해당 페이지에 보안되지 않은 리소스가 포함되어
있음을 사용자에게 알려 줍니다.

### TL;DR {: .hide-from-toc }

* HTTPS는 사이트와 사용자를 공격으로부터 보호하는 중요한 역할을 합니다.
* 혼합 콘텐츠는 HTTPS 사이트의 보안 및 사용자 환경을 저하시킵니다.

## 리소스 요청 및 웹 브라우저

브라우저가 웹사이트 페이지를 _방문_할 때 HTML을 요청합니다. 그러면 웹 서버가 HTML 콘텐츠를 반환하고, 브라우저는 해당 콘텐츠를 파싱하여 사용자에게 표시합니다. 일반적으로 단일 HTML 파일로 전체 페이지를 표시하는 데 충분하지 않으므로 HTML 파일은 브라우저가 요청해야 하는 다른 리소스에 대한 참조를 포함합니다. 이와 같은 하위 리소스의 예로는 이미지, 비디오, 추가 HTML, CSS 또는 자바스크립트 등이 있으며 각 항목은 개별 요청으로 가져옵니다.

## HTTPS의 이점

브라우저가 HTTPS(HTTP Secure)를 통해 리소스를 요청할 때
암호화된 연결을 사용하여 웹 서버와 통신합니다.

HTTPS를 사용하면 다음과 같은 세 가지 주요 이점이 있습니다.

* 인증
* 데이터 무결성
* 보안

### 인증

_통신 중인 웹사이트가 요청한 웹사이트가 맞습니까?_

HTTPS는 올바른 웹사이트를 열었고 악성 사이트로 리디렉션되지
않았음을 브라우저에게 확인하게 합니다. 은행 웹사이트를 탐색할 때
브라우저가 웹사이트를 _인증_하므로 공격자가 은행을 가장하여
로그인 인증 정보를 훔치지 못하도록 예방합니다.

### 데이터 무결성

_누군가 내가 보내거나 받고 있는 콘텐츠를 변조했습니까?_

HTTPS는 공격자가 브라우저 수신 데이터를 변경했는지
여부를 브라우저에게 검색하게 합니다. 은행 웹사이트를 사용하여 송금할 때 요청을 전송하는 동안
공격자가 수취인 계좌번호를 변경하는 것을
방지합니다.

### 보안

_내가 전송 또는 수신 중인 콘텐츠를 누군가가 볼 수 있습니까?_

HTTPS는 공격자가 브라우저의 요청을 도청하거나 방문한 웹사이트를 추적하거나
전송 또는 수신한 정보를 훔치지 못하게 합니다.

### HTTPS, TLS 및 SSL

HTTPS는 HTTP Secure(Hyper(t)ext Transfer Protocol Secure)의 약자입니다. 여기서
**secure(보안)** 부분은 브라우저가 전송 및 수신한
요청에 추가한 암호화와 관련 있습니다. 현재 대부분의 브라우저는 TLS 프로토콜을 사용하여
암호화를 제공하는데, **TLS**는 SSL이라고도 합니다.

HTTPS, TLS 및 SSL에 대한 자세한 정보는 이 글에서는 다루지 않습니다.
자세한 정보는 다음을 참조하세요.

* [Wikipedia HTTPS](https://en.wikipedia.org/wiki/HTTPS)
* [Wikipedia TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security)
* [Khan Academy Cryptography course](https://www.khanacademy.org/computing/computer-science/cryptography)
* [High Performance Browser Networking](https://hpbn.co/) 의 [TLS 장](https://hpbn.co/transport-layer-security-tls/) (저자: Ilya Grigorik)

## 혼합 콘텐츠로 인한 HTTPS 약화

보안되지 않은 HTTP 프로토콜을 사용하여 하위 리소스를 요청하는
경우 해당 요청은 공격자가 네트워크 연결을 도청하고 양자 간 통신을 보거나 수정하는 수단인
**중간자(man-in-the-middle) 공격**에 취약하므로
전체 페이지의 보안이 약화됩니다. 공격자는 해당 리소스를 사용하여
손상된 자원뿐만 아니라 페이지를 완전히 제어할
수 있습니다.

대부분의 브라우저가 혼합 콘텐츠 경고를 사용자에게 보고하지만 그때는
너무 늦습니다. 보안되지 않은 요청이 이미 수행되었고
해당 페이지의 보안이 손상되었기 때문입니다. 불행하게도 이 시나리오는 웹에서
흔히 발생하는데, 대부분의 사이트의 기능을 제한하지 않고는
모든 혼합 요청을 차단할 수 없기 때문입니다.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure image. This content should also be served over HTTPS.">
  <figcaption>
    애플리케이션에서 혼합 콘텐츠 문제는 개발자가 수정해야 합니다.
  </figcaption>
</figure>

### 간단한 예시

HTTPS 페이지에서 보안되지 않은 스크립트를 로드합니다.

**HTTPS**를 통해 보는 이 샘플 페이지([**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external})에는 혼합 콘텐츠를 로드하려고 시도하는 **HTTP** 스크립트 태그가 포함되어 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

이 예시에서 **HTTP** URL을 사용하는 스크립트 `simple-example.js`가 로드됩니다. 이는 가장 간단한 혼합 콘텐츠 사례입니다. 브라우저가 `simple-example.js` 파일을 요청하면 공격자가 반환된 콘텐츠에 코드를 삽입하고
전체 페이지를 제어할 수 있습니다.

다행히 대부분의 최신 브라우저는 이와 같은 유형의 위험한 콘텐츠를
기본적으로 차단합니다. [혼합 콘텐츠가 있는 브라우저 동작](#browser-behavior-with-mixed-content){: .external}을 참조하세요.

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure script. This request has been blocked; the content must be served over HTTPS.">
  <figcaption>Chrome이 비보안 스크립트를 차단합니다.</figcaption>
</figure>

### XMLHttpRequest 예시

XMLHttpRequest를 통해 비보안 데이터를 로드합니다.

**HTTPS**를 통해 보는 이 샘플 페이지[**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external}에는 혼합 콘텐츠 `JSON` 데이터를 가져오는 **HTTP**를 통한 `XMLHttpRequest`가 포함되어 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

여기서 **HTTP** URL은 자바스크립트에서 동적으로 구성되고 비보안 리소스를
`XMLHttpRequest`가 로드하는 데 사용됩니다. 위의 간단한 예시처럼, 브라우저가
`xmlhttprequest-data.js` 파일을 요청하면 공격자가 반환된
콘텐츠에 코드를 삽입하고 전체 페이지를
제어할 수 있습니다.

대부분의 최신 브라우저는 이러한 위험한 요청을 차단합니다.

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint. This request has been blocked; the content must be served over HTTPS.">
  <figcaption>Chrome이 비보안 XMLHttpRequest를 차단합니다.</figcaption>
</figure>

### 이미지 갤러리 예시

JQuery 라이트박스를 사용하여 보안되지 않은 이미지를 로드합니다.

**HTTPS**를 통해 이 샘플 페이지([**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external})를 볼 때, 처음에는 어떤 혼합 콘텐츠 문제도 없지만 미리보기 이미지를 클릭하면 전체 크기 혼합 콘텐츠 이미지가 **HTTP**를 통해 로드됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

이미지 갤러리는 `<img>` 태그 `src` 속성을 사용하여
페이지에 미리 보기 이미지를 표시하며 앵커(`<a>`) 태그 `href` 속성을 사용하여
갤러리 오버레이에 대한 전체 크기 이미지를 로드합니다. 일반적으로
`<a>` 태그는 혼합 콘텐츠를 유발하지 않지만 이 경우에 jQuery 코드가
새 페이지를 탐색하는 기본 링크 동작을 다시 정의하고
해당 페이지에 **HTTP** 이미지를 대신 로드합니다.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure image. This content should also be served over HTTPS.">
</figure>

비보안 이미지는 사이트의 보안을 약화시키지만 다른 유형의 혼합 콘텐츠만큼
위험하지는 않습니다. 최신 브라우저도 여전히 혼합 콘텐츠 이미지를
로드하지만 사용자에게 경고를 표시합니다.

## 혼합 콘텐츠 유형 및 관련 보안 위협

혼합 콘텐츠는 능동적 혼합 콘텐츠와 수동적 혼합 콘텐츠 등 두 가지 유형이 있습니다.

**수동적 혼합 콘텐츠**란 페이지의 나머지와
상호작용하지 않는 콘텐츠를 말하므로 해당 콘텐츠를
가로채거나 변경하는 경우 가로채기 공격이 제한됩니다. 수동적 혼합 콘텐츠는
페이지의 나머지와 상호작용할 수 없는 이미지, 비디오, 오디오 콘텐츠 등의
리소스를 포함합니다.

**능동적 혼합 콘텐츠**는 페이지 전체와 상호작용하며 공격자가
해당 페이지에서 거의 모든 것을 할 수 있습니다. 능동적 혼합 콘텐츠는
브라우저가 다운로드하고 실행할 수 있는 스크립트, 스타일시트, iframe, 플래시 리소스 및
기타 코드를 포함합니다.

### 수동적 혼합 콘텐츠

수동적 혼합 콘텐츠는 여전히 사이트와 사용자의 보안을 위협합니다.
예를 들어, 공격자는 사이트에서 이미지에 대한 HTTP 요청을 가로채고 해당 이미지를
교체하거나 대체할 수 있습니다. 공격자는 _저장_ 및 _삭제_
버튼 이미지를 교체하여 사용자가 콘텐츠를 의도치 않게 삭제하거나
제품 그림을 음란 콘텐츠 또는 포르노 콘텐츠로 대체하여 사이트를 더럽히거나
제품 사진을 다른 사이트 또는 제품의 광고로 대체할 수 있습니다.

공격자가 사이트의 콘텐츠를 변경하지 않은 경우에도
혼합 콘텐츠 요청을 사용하여 사용자를 추적하여
중대한 개인 정보 보호 문제를 유발할 수 있습니다. 공격자는 브라우저가 로드하는 이미지 또는 기타 리소스에 따라 사용자가 방문하는 페이지와
관심을 갖고 보는 제품을 구별할 수 있습니다.

다음은 수동적 혼합 콘텐츠의 예시입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

대부분의 브라우저는 여전히 이 유형의 혼합 콘텐츠를 사용자에게 제공하지만
사이트 및 사용자의 보안 및 개인 정보가 위험에 처하므로
경고도 표시합니다.

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure video. This content should also be served over HTTPS.">
  <figcaption>Chrome JavaScript 콘솔에서 발생한 혼합 콘텐츠 경고.</figcaption>
</figure>

### 능동적 혼합 콘텐츠

능동적 혼합 콘텐츠는 수동적 혼합 콘텐츠보다 보안을 더 위협합니다. 공격자는
활성 콘텐츠를 가로채서 다시 작성하여 페이지 또는 심지어
전체 웹사이트를 완전히 제어할 수 있습니다. 이로써 공격자는 완전히 다른 콘텐츠를 표시하거나
사용자 암호 또는 기타 로그인 인증 정보를 훔치거나
사용자 세션 쿠키를 훔치거나 사용자를 다른 사이트로
완전히 리디렉션하는 등 페이지에 대한 모든 것을 변경할 수 있습니다.

이 위협의 심각성 때문에 대부분의 브라우저는 기본적으로 이런 유형의 콘텐츠를
차단하여 사용자를 보호하지만 브라우저 공급업체 및
버전에 따라 기능이 다릅니다.

다음은 능동적 혼합 콘텐츠의 예시입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Mixed Content: The page was loaded over HTTPS, but requested an insecure resource. This request has been blocked; the content must be served over HTTPS.">
  <figcaption>Chrome JavaScript 콘솔에서 발생한 혼합 콘텐츠 오류.</figcaption>
</figure>

## 혼합 콘텐츠가 있는 브라우저 동작

위에서 설명한 위협 때문에 브라우저가 모든
혼합 콘텐츠를 차단하는 것이 바람직합니다. 그러나 그렇게 하면 수백만 사용자가 매일 사용하는
수많은 웹사이트가 중단됩니다. 현재는 가장 위험한 유형의 혼합 콘텐츠는
차단하고 비교적 덜 위험한 유형은
요청되게 하는 식으로 타협할 수 있습니다.

최신 브라우저는 [**선택적으로 차단할 수 있는 콘텐츠**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external} 및 [**차단할 수 있는 콘텐츠**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external} 범주를 정의하는 [혼합 콘텐츠 사양](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }을 따릅니다.

해당 사양에서 리소스는 '웹의
상당한 부분을 중단시키는 위험이 혼합 콘텐츠 사용을 허용하는
위험보다 클 때' 선택적으로 차단할 수 있는 콘텐츠 자격을 충족합니다. 이는 위에서 설명한 [수동적 혼합
콘텐츠](#passive-mixed-content) 범주의 하위 집합입니다. 이 글을 작성하는 시점에서 사전에 가져온 링크뿐만 아니라 이미지,
비디오 및 오디오 리소스는 선택적으로 차단할 수 있는 콘텐츠에
포함되는 유일한 리소스 유형입니다. 이 범주는
시간이 지남에 따라 더 줄어들 것입니다.

**선택적으로 차단할 수** 없는 모든 콘텐츠는 **차단할 수 있는** 콘텐츠로 간주되며
브라우저가 차단합니다.

### 브라우저 버전

웹사이트의 일부 방문객은 최신 브라우저를 사용하지 않는다는 점을
기억해야 합니다. 여러 브라우저 공급업체의 각 버전은 혼합 콘텐츠에
대해 달리 동작합니다. 최악의 일부 브라우저 및 버전은
혼합 콘텐츠를 전혀 차단하지 않으므로 사용자에게 매우 불안합니다.

각 브라우저의 정확한 동작은 끊임없이 변화하고 있으므로 여기서는
구체적으로 다루지 않겠습니다. 특정 브라우저가 동작하는 방법에 대해서는
공급업체가 제공한 정보를 직접 찾아 참조하세요.

참고: 웹사이트를 방문하는 사용자는 개발자가 그들을 보호할 것이라고 믿습니다. 구식 브라우저 사용자를 비롯한 <b>모든</b> 방문객을 보호하려면 혼합 콘텐츠 문제를 수정해야 합니다.




{# wf_devsite_translation #}
