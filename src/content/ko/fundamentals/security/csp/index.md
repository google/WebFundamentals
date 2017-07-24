project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 콘텐츠 보안 정책은 최신 브라우저에서 교차 사이트 스크립팅 공격의 위험과 영향을 현저히 줄일 수 있습니다.

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2012-06-15 #}

# 콘텐츠 보안 정책 {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

웹의 보안 모델은
[_동일 출처 정책_](//en.wikipedia.org/wiki/Same-origin_policy){: .external}에 근간을 두고 있습니다. `https://mybank.com`의
코드는 `https://mybank.com`의
데이터에만 액세스 권한이 있으며 `https://evil.example.com`에는 액세스 권한이 없습니다.
각 출처는 나머지 웹과 격리되며, 빌드하여 재생할 수 있는 안전한
샌드박스를 개발자에게 제공합니다. 이론상 완벽할 정도로 훌륭합니다. 실제로는
공격자가 영리하게 그 시스템을 파괴했습니다.

예를 들어, [교차 사이트 스크립팅(XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external}
공격은 사이트를 속여 악성 코드를 의도된 콘텐츠와 함께
전달하게 하여 동일 출처 정책을 우회합니다. 이는
브라우저가 페이지의 모든 코드를 해당 페이지의 
합법적인 보안 출처의 일부로 신뢰하므로 심각한 문제를 낳습니다. [XSS
Cheat Sheet](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external}는 오래된 방법이지만 공격자가 악성 코드를 삽입하여 해당 신뢰를 위반하는 데 사용할 수 있는 방법의 대표적인 예입니다. 공격자가 _어떤_ 코드를
조금이라도 삽입하면 거의 게임은 끝납니다. 사용자 세션 데이터가 위험에 노출되고
비밀로 유지되어야 할 정보가 나쁜 사람에게 넘어갑니다. 그런
상황을 가능한 한 예방하길 원하는 것은 명백합니다.

이 개요는 최신 브라우저에서 XSS 공격의 위험과
영향을 현저히 줄일 수 있는 방어책인 콘텐츠 보안 정책(CSP)에 중점을 두고 있습니다.

### TL;DR {: .hide-from-toc }
* 허용 목록을 사용하여 허용되는 것과 허용되지 않는 것을 클라이언트에게 알려줍니다.
* 어떤 지시문을 사용할 수 있는지 알아보세요.
* 지시문에서 취하는 키워드를 알아보세요.
* 인라인 코드와 `eval()`은 유해한 것으로 간주됩니다.
* 정책 위반 사항을 적용하기 전에 서버에 신고합니다.


## 소스 허용 목록 


XSS 공격에서는 브라우저가 애플리케이션에 속한 스크립트와
제삼자가 악의적으로 주입한 스크립트를
구분하지 못한다는 문제점을 악용합니다. 예를 들어, 이 페이지 하단에 있는 Google +1 버튼은
이 페이지의 출처라는 맥락에서
`https://apis.google.com/js/plusone.js`에서 코드를 로드하고 실행합니다. 우리는
그 코드를 신뢰하지만 브라우저가
`apis.google.com`에서 받은 코드는 유익한 코드이지만 `apis.evil.example.com`에서 받은 코드는 유익하지 않을 것이라고
스스로 알아내리라 기대할 수는 없습니다. 브라우저는 소스에 관계없이 페이지에서 요청하는 코드라면 무엇이든
다운로드하여 실행합니다.

서버에서 제공하는 _모든 것_ 을 맹목적으로 신뢰하는 대신,
CSP는 신뢰할 수 있는 콘텐츠 소스의 허용 목록을 생성할 수 있게 해주는 `Content-Security-Policy` HTTP
헤더를 정의하고 브라우저에는 이런 소스에서 받은 리소스만 실행하거나
렌더링할 것을 지시합니다. 공격자가 스크립트를 주입할 허점을 찾을 수도 있겠지만,
그 스크립트가 허용 목록과 일치하지 않을 것이므로 실행할 수 없을
것입니다.

우리는 `apis.google.com`에서 유효한 코드를 제공할 것이라 믿고 우리 스스로도 그렇게 할 것이라 믿으므로,
코드의 출처가 다음 두 가지 소스 중 하나일 때만 스크립트 실행을 허용하는
정책을 정의합시다.

    Content-Security-Policy: script-src 'self' https://apis.google.com

정말 간단하죠? 아마 추측하셨을 테지만, `script-src`는 특정 페이지에 대한 스크립트 관련 권한 집합을
제어하는 지시문입니다. `'self'`를
스크립트의 한 가지 유효한 소스로 지정하고 `https://apis.google.com` 역시
유효한 다른 소스로 지정했습니다. 브라우저는 현재 페이지의 출처뿐 아니라 HTTPS를 통해
`apis.google.com`에서도 제공되는 자바스크립트를 충실히 다운로드하고 실행합니다.

<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="콘솔 오류: 스크립트 'http://evil.example.com/evil.js'가 script-src 'self' https://apis.google.com이라는 콘텐츠 보안 정책을 위반하므로 로드를 거부함">
  </figure>
</div>

이 정책을 정의해두면 브라우저가 다른 소스에서 스크립트를 로드하는 대신
그냥 오류를 발생시킵니다. 영리한 공격자가 사이트로 악성 코드를 어떤 식으로든
주입하더라도 원래 기대했던 공격 효과를
전혀 거두지 못한 채 실행되는 즉시 곧바로 오류 메시지가 발생하게 되는 것입니다.

### 폭넓고 다양한 리소스에 정책 적용

스크립트 리소스가 가장 명백한 보안 위험이지만, CSP는 페이지가 로드하도록 허용되는
리소스를 상당히 세분화하여 제어할 수 있는 다양하고 충분한 정책 지시문을
제공합니다. 이미 `script-src`를 보셨으므로 개념이
명확하게 잡힐 것입니다. 다음의 나머지 리소스 지시문을 빠르게 훑어봅시다.

* **`base-uri`** 는 페이지의 `<base>` 요소에 나타날 수 있는 URL을 제한합니다.
* **`child-src`** 는 작업자와 삽입된 프레임 콘텐츠에 대한 URL을 나열합니다. 예:
`child-src https://youtube.com`을 사용하면 다른 출처가 아니라
  YouTube에서 가져온 동영상을 삽입할 수 있습니다. 지원 중단된
  **`frame-src`** 지시문 대신 이 지시문을 사용하세요.
* **`connect-src`** 는 (XHR,
  WebSockets 및 EventSource를 통해) 연결할 수 있는 출처를 제한합니다.
* **`font-src`** 는 웹 글꼴을 제공할 수 있는 출처를 지정합니다. `font-src https://themes.googleusercontent.com`을 통해 Google의 웹
글꼴을 사용할 수 있습니다.
* **`form-action`** 은 `<form>` 태그에서의 제출을 위해 유효한 엔드포인트를 나열합니다.
* **`frame-ancestors`** 는 현재 페이지를 삽입할 수 있는 소스를 지정합니다.
이 지시문은 `<frame>`, `<iframe>`, `<embed>` 및 `<applet>` 태그에 적용됩니다.
이 지시문은 `<meta>` 태그에서 사용할 수 없고 HTML 이외의 리소스에만
적용됩니다.
* **`frame-src`** 는 지원 중단되었습니다. **`child-src`** 를 대신 사용하세요.
* **`img-src`** 는 이미지를 로드할 수 있는 출처를 정의합니다.
* **`media-src`** 는 동영상과 오디오를 제공하도록 허용되는 출처를 제한합니다.
* **`object-src`** 는 플래시와 기타 플러그인에 대한 제어를 허용합니다.
* **`plugin-types`** 는 페이지가 호출할 수 있는 플러그인의 종류를 제한합니다.
* **`report-uri`** 은 콘텐츠 보안 정책 위반 시 브라우저가 보고서를 보낼 URL을
지정합니다. `<meta>`
태그에서는 이 지시문을 사용할 수 없습니다.
* **`style-src`** 는 `script-src`에서 스타일시트에 해당합니다.
* **`upgrade-insecure-requests`** 는 사용자 에이전트에 URL 구성표를 다시 작성하여
HTTP를 HTTPS로 변경하도록 지시합니다. 이 지시문은 다시 작성해야 할 이전 URL이 많은
웹사이트를 위한 것입니다.

기본적으로, 지시문은 무방비 상태입니다. 지시문(예:
`font-src`)에 대해 구체적인 정책을 설정하지 않을 경우에는
`*`를 유효한 소스로 지정하더라도 그 지시문이 기본적으로 동작합니다(예: 제한 없이 어디서든
글꼴을 로드할 수 있음).

**`default-src`**
지시문을 지정하여 이 기본 동작을 재정의할 수 있습니다. 이 지시문은 지정하지 않은 채로 두는 대부분의
지시문에 대한 기본값을 정의합니다. 일반적으로
`-src`로 끝나는 모든 지시문에 이 사항이 적용됩니다. `default-src`가 `https://example.com`으로 설정되어 있는데
`font-src` 지시문을 지정하지 못하면
`https://example.com`에서만 글꼴을 로드할 수 있고 다른 곳에서는 로드할 수 없습니다. 앞에서 든 예시에서는 `script-src`만
지정했는데, 이는 임의의 출처에서 이미지, 글꼴 등을
로드할 수 있다는 의미입니다.

다음 지시문은 `default-src`를 대안으로 사용하지 않습니다. 명심할 점은,
이런 지시문을 설정하지 않으면 무엇이든 허용한다는 것과 같다는 점입니다.

* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

특정 애플리케이션에 대해 타당성이 있는 한 이런 지시문을 많거나 적게 사용하여 HTTP 헤더에 각각 단순히 나열할 수 있으며,
이때 각 지시문은
세미콜론으로 구분합니다. _단일_ 지시문에 특정 유형의 필수 리소스를 _전부_
나열해야 합니다. `script-src https://host1.com; script-src https://host2.com`과 같이 작성한 경우
두 번째 지시문은
그냥 무시됩니다. 다음과 같은 지시문으로
두 출처를 모두 유효한 출처로 지정할 수 있습니다.

    script-src https://host1.com https://host2.com

예를 들어,
콘텐츠 전송 네트워크(예: `https://cdn.example.net`)에서 모든 리소스를 로드하는 애플리케이션이 있고
프레임이 지정된 콘텐츠나 플러그인이 필요하지 않음을 알 경우에는 정책이 다음과 같은
형태일 수 있습니다.

    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### 구현 세부정보

웹 상의 다양한 가이드에서 `X-WebKit-CSP` 및 `X-Content-Security-Policy` 헤더를 볼 수 있을
것입니다. 계속 진행할 때는 이렇게 앞에 붙은 헤더는
무시해야 합니다. 최신 브라우저(IE는 예외임)에서는 접두사가 없는
`Content-Security-Policy` 헤더를 지원합니다. 바로 그런 헤더를 사용해야 합니다.

사용하는 헤더와는 상관없이, 정책은 페이지 단위로 정의됩니다.
따라서 확실히 보호하고 싶은 응답을 보낼 때마다
HTTP 헤더를 함께 보내야 합니다. 구체적인 필요에 따라 특정 페이지에 대한 정책을
미세 조정할 수 있으므로 융통성을 폭넓게 발휘할 수 있습니다. 사이트에 한 페이지 세트에는
+1 버튼이 있는 반면, 다른 페이지 세트에는 없을 수도 있을 것입니다. 필요할 때만 버튼 코드가 로드되도록 허용할 수
있습니다.

각 지시문의 소스 목록은 유연하게 작성할 수 있습니다. 구성표(`data:`, `https:`)를 기준으로
소스를 지정하거나, 호스트 이름만 사용하는
것부터(해당 호스트에서 임의의 출처와 일치하는 `example.com`: 임의의 구성표, 임의의 포트) 정규화된 URI를 사용하는 것까지(HTTPS만, `example.com`만,
그리고 포트 443만 서로 일치하는 `https://example.com:443`)
범위를 특정하여 소스를 지정할 수 있습니다. 와일드 카드가 허용되지만, 구성표나 포트로만 허용되거나
호스트 이름의 맨 왼쪽 위치에서 허용됩니다. `*://*.example.com:*`은 임의의 포트에서 임의의 구성표를 사용하는
`example.com`의 모든 하위 도메인(하지만 `example.com` 자체는 _아님_)과
일치합니다.

소스 목록에는 다음 4개의 키워드도 허용됩니다.

* **`'none'`**은 예상할 수 있듯이 아무것과도 일치하지 않습니다.
* **`'self'`** 는 현재 출처와 일치하지만 하위 도메인은 일치하지 않습니다.
* **`'unsafe-inline'`**은 인라인 자바스크립트 및 CSS를 허용합니다. (이 점에 대해서는
  좀 더 자세히 다루겠습니다.)
* **`'unsafe-eval'`**은 `eval` 같은 텍스트-자바스크립트 메커니즘을 허용합니다. (이 사항 역시
  좀 더 자세히 설명하겠습니다.)

이런 키워드에는 작은따옴표가 필요합니다. 예를 들어, `script-src 'self'`(따옴표 포함)는
현재 호스트에서 자바스크립트를 실행할 권한을 부여합니다. 반면에, `script-src self`(따옴표 없음)는
현재 호스트가 _아니라_ '`self`'로 명명된 서버의 자바스크립트를 허용하는데, 아마 이런 의도는 아니었을
것입니다.

### 샌드박싱

설명하고 넘어가야 할 지시문이 하나 더 있는데, 그건 바로 `sandbox`입니다. 이 지시문은
페이지가 로드할 수 있는 리소스가 아니라 페이지가 취할 수 있는 작업에
제한을 두므로 지금까지 살펴본 다른 지시문과는 약간 다릅니다. `sandbox` 지시문이
있는 경우에는 페이지가 `sandbox` 속성을 가진 `<iframe>` 내부에서
로드된 것처럼 취급됩니다. 이는 페이지에 광범위한 효과를
미칠 수 있는데, 무엇보다도 페이지를 고유한 출처로 강제 적용하고
양식 제출을 방지한다는 점입니다. 본 문서의 범위를 약간 벗어나는
내용이긴 하지만,
[HTML5 사양의 '샌드박싱' 섹션](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.{: .external}에서 유효한 샌드박싱 속성에 대한 전체 세부정보를 확인할 수 있습니다.

### 메타 태그

CSP에서 기본 설정된 전송 메커니즘은 HTTP 헤더입니다. 하지만 마크업에서 페이지에 대한 정책을 직접 설정하는 데
유용할 수 있습니다. 다음과 같이 `http-equiv` 속성을 포함한 `<meta>` 태그를 사용하여
설정하세요.


    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


frame-ancestors, report-uri 또는 sandbox에는 사용할 수 없습니다.

## 인라인 코드는 유해한 것으로 간주됨

CSP는 브라우저에 특정 리소스 세트를 허용 가능한 것으로 처리하고
나머지는 거부하도록 명백히 지시하는 방법이므로
출처의 허용 목록 작성을 기반으로 한다는 점이 분명해야 합니다. 하지만 출처 기반 허용 목록 작성으로는
XSS 공격으로 발생하는 최대의 위협인 인라인 스크립트 주입 문제를 해결하지 못합니다.
공격자가 악성
페이로드(`<script>sendMyDataToEvilDotCom();</script>`)를
직접 포함하고 있는 스크립트 태그를 주입할 수 있는 경우
브라우저는 이런 태그를 정당한 스크립트 태그와 구분할 메커니즘이 없습니다. CSP는 인라인 스크립트를 완전히 금지하여 이 문제를 해결하는데,
이것이 유일하게 확실한 방법입니다.


이런 금지에는 `script` 태그에 직접 삽입된 스크립트뿐 아니라
인라인 이벤트 핸들러와 `javascript:` URL도 포함됩니다. `script` 태그의
콘텐츠를 외부 파일로 이동하고 `javascript:` URL과 `<a ...
onclick="[JAVASCRIPT]">`를 알맞은 `addEventListener()` 호출로 바꾸어야 합니다. 예를 들어,
다음과 같은 양식을


    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


다음과 같은 내용으로 다시 작성할 수 있을 것입니다.

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


다시 작성한 코드는 CSP와 제대로 작동한다는 차원을 뛰어넘어 여러 가지 장점이 있습니다.
이 코드는 CSP 사용과는 무관하게 이미 모범 사례입니다. 인라인
자바스크립트는 그렇게 해서는 안 되는 바로 그 방법으로 구조와 동작을 혼합합니다.
외부 리소스는 브라우저가 더 쉽게 캐시할 수 있으며 이는 개발자로서는 더 이해하기 쉽습니다.
그리고 코드 컴파일과 축소에 도움이 됩니다. 코드를 외부 리소스로
이동하는 작업을 수행할 경우 더 나은 코드를 작성할 것입니다.

인라인 스타일도 같은 방식으로
처리됩니다. CSS가 지원하는
[놀랍도록 영리한](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external}
여러 가지 데이터 누수 방법으로부터 데이터를 보호하기 위해 `style` 속성과 `style`태그를 둘 다 외부 스타일시트로 통합해야 합니다.

인라인 스크립트와 스타일이 있어야 하는 경우 `'unsafe-inline'`을 `script-src` 또는 `style-
src` 지시문에 허용되는 소스로 추가하여
사용할 수 있습니다. 또한, 난스(nonce)나 해시(아래 참조)도 사용할 수 있지만 실제로는 사용하면 안 됩니다. 인라인 스크립트를 금지하는 것은 CSP가 제공하는 가장 큰 보안상 강점이며,
인라인 스타일 금지 역시 애플리케이션을 강화하는 역할을 합니다. 모든 코드를 줄 밖으로 이동한 후
제대로 작동하도록 하려면 미리 약간의 작업을 해야 하지만,
그렇게 할 만한 가치가 충분히 있는 절충안입니다.

### 꼭 사용해야 한다면...

CSP Level 2는 암호화 난스(한 번 사용되는 숫자) 또는 해시를 사용하여
특정 인라인 스크립트를 허용 목록에 추가하도록 허용함으로써
인라인 스크립트에 대해 이전 버전과의 호환성을 제공합니다. 이는 번거로울 수 있지만
비상시에는 유용합니다.

난스를 사용하려면 스크립트 태그에 난스 속성을 부여하세요. 속성의 값은 신뢰할 수 있는 소스의 목록에 있는 값과
일치해야 합니다. 예를 들면 다음과 같습니다.


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


`nonce-` 키워드에 추가된 `script-src` 지시문에 난스를 추가하세요.

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

명심할 점은, 모든 페이지 요청에 대해 난스를 추측할 수 없도록 다시 생성해야
한다는 것입니다.

해시도 대체로 같은 방식으로 작동합니다. 스크립트 태그에 코드를 추가하는 대신,
스크립트 자체의 SHA 해시를 생성하여 `script-src` 지시문에 추가하세요.
예를 들어, 페이지에 다음 내용이 포함되어 있다고 해봅시다.


    <script>alert('Hello, world.');</script>


정책에 다음 내용이 포함될 것입니다.

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

여기서 주목해야 할 사항이 몇 가지 있습니다. `sha*-` 접두사는 해시를 생성하는 알고리즘을
지정합니다. 위 예시에서는 sha256-이 사용됩니다. CSP는
sha384-와 sha512-도 지원합니다. 해시를 생성할 때
`<script>` 태그를 포함하지 마세요. 또한, 대문자 표시와 선행 또는 후행 공백을 포함한 공백도
중요합니다.

SHA 해시 생성에 대해 Google에서 검색해보면 여러 가지 언어로 제시되는 해결책을
확인할 수 있을 것입니다. Chrome 40 이상을 사용할 때는 DevTools를 연 다음
페이지를 새로 고칠 수 있습니다. Console 탭에는 각 인라인 스크립트에 대해 알맞은
sha256 해시가 있는 오류 메시지가 포함됩니다.

## Eval도 마찬가지

공격자는 스크립트를 직접 주입할 수 없을 때조차도
애플리케이션을 속여 비활성 상태의 텍스트를 실행 가능한 자바스크립트로 변환하고
공격자 대신 실행하도록 할지도 모릅니다. `eval()`, `new
Function()`, `setTimeout([string], ...)` 및
`setInterval([string], ...)` 은 전부 벡터로서, 이들을 통해 주입된 텍스트가 의도와는 달리 악성 코드로 실행되는 결과를 낳을 수
있습니다. 이 위험에 대한 CSP의 기본
응답은 이런 벡터를 전부 완전히 차단하는 것입니다.


이는 애플리케이션을 빌드하는 방식에 적잖은 영향을 미칩니다.

*   `eval`에 의존하기보다는 기본 제공되는 `JSON.parse`를 통해 JSON을 파싱해야
    합니다. [IE8 이후의 모든 브라우저에서](http://caniuse.com/#feat=json){: .external}
    기본 JSON 작업을 수행할 수 있고
    완벽한 안전성을 보장합니다.
*   문자열이 아니라 인라인 함수로 현재의 모든 `setTimeout` 또는 `setInterval` 호출을
    다시 작성하세요. 예를 들면 다음과 같습니다.

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


위 코드를 아래와 같이 작성하면 더 나을 것입니다.


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   런타임에서 인라인 템플릿 방지: 많은 템플릿 라이브러리가 `new
    Function()`을 자유롭게 사용하여 런타임에서 템플릿 생성 속도를 높입니다. 멋진
    동적 프로그래밍 애플리케이션이지만 악성 텍스트를 평가할 위험이
    있습니다. 일부 프레임워크에서는 기본적으로 CSP를 지원하여
    `eval`이 없을 때 강력한 파서로 대체합니다.
    [AngularJS의 ng-csp 지시문](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external}이 이 점을 보여주는 좋은 예입니다.

하지만 예컨대 ([Handlebars가 수행하는](http://handlebarsjs.com/precompilation.html){: .external} 사전 컴파일을
제공하는 템플릿 언어를 선택하는 것이
더 나을 것입니다. 템플릿을 사전 컴파일하면 사용자 환경을 가장 빠른 런타임 구현 환경보다도 훨씬 더
빠르게 할 수 있을 뿐더러, 더 안전하기도 합니다.  eval과
해당 텍스트-자바스크립트 쌍이 애플리케이션에 필수적인 경우
`script-src`
지시문에 `'unsafe-eval'`을 허용되는 소스로 추가하여 이들을 사용할 수 있지만, 불기피한 경우가 아니라면 그렇게 하지 않는 것이 좋습니다. 문자열을 실행하지 못하게
하면 공격자로서는 사이트에서 인증되지 않은 코드를 실행하기가 훨씬 더
어려워집니다.

## 보고 


CSP를 통해 클라이언트 쪽에서 신뢰할 수 없는 리소스를 차단하는 것은
사용자 입장에서는 막대한 능력이겠지만, 악성 코드 주입을
허용하는 버그를 먼저 식별하여 박멸할 수 있도록
서버로 알림 메시지를 다시 보내도록 하는 것이 상당히 도움이 될 것입니다. 이를 위해,
 `report-uri` 지시문에 지정된 위치에
JSON 형식의 위반 보고서를  `POST` 하도록 브라우저에 지시할 수 있습니다.


    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

보고서는 다음과 같은 형태일 것입니다.


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



이 보고서에는 위반의 구체적인 원인을 추적하는 데
도움될 충분한 정보가 들어 있습니다.
위반이 발생한 페이지(`document-uri`), 그 페이지의 참조 페이지(HTTP
헤더 필드와는 달리, 키의 철자가 틀리지 _않음_),
페이지의 정책을 위반한 리소스(`blocked-uri`), 그 리소스가 위반한 특정
지시문(`violated-directive`), 페이지의 전체 정책(`original-policy`)이 이런 정보에 해당합니다.

### 보고서 전용

이제 막 CSP를 사용하기 시작하는 경우라면, 애플리케이션의 현재 상태를
평가한 후에 사용자에게도 엄격한 정책을 시행하는 것이 마땅할 것입니다.
완전한 배포를 위한 디딤돌로서, 브라우저에 어떤 정책을 모니터링하고
위반 사항이 있으면 제한을 가하지는 말고 일단 보고만 하도록 요구할 수 있습니다. `Content-Security-Policy`
헤더를 보내는 대신,
`Content-Security-Policy-Report-Only` 헤더를 보내세요.

    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

보고서 전용 모드에 지정된 정책은 한정된 리소스를 차단하지는 않지만
개발자가 지정하는 위치로 위반 보고서를 보낼 것입니다. 한 정책을 적용하는 한편으로 다른 정책은 모니터링하면서
_두_ 헤더를 모두 보낼 수도 있습니다. 이는
애플리케이션의 CSP에 미치는 변경 사항의 효과를 평가하는 훌륭한 방법입니다.
새 정책에 대한 보고 기능을 설정하고 위반 보고서를 모니터링하고 위반으로 나타나는 버그를 수정하세요.
결과가 만족스러우면 새 정책을 적용하기 시작하세요.



## 실제 환경에서의 사용법 

CSP 1은 Chrome, Safari 및 Firefox에서는 꽤 유용하지만
IE 10에서는 매우 제한적으로 지원됩니다. <a href="http://caniuse.com/#feat=contentsecuritypolicy">
canisue.com에서 구체적인 내용</a>을 볼 수 있습니다. Chrome의 경우 CSP Level 2는
버전 40 이후로 지원되기 시작했습니다. Twitter 및 Facebook과 같은 대규모 사이트에서는 이 헤더를
배포해왔으며(<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">Twitter의
사례 연구</a>를 읽어볼 만함), 개발자가 자신의 사이트에 바로 배포하기 시작할 수 있도록
표준이 완벽히 준비되어 있습니다.

애플리케이션에 적용할 정책을 마련하기 위한 첫 단계는
실제로 로드하는 리소스를 평가하는 것입니다. 앱에 리소스를 어떻게 배치할지
확실한 방법이 있다고 생각한다면 그런 요구사항을 바탕으로
정책을 설정하세요. 몇 가지 일반적인 사용 사례를 살펴보고 CSP의 보호 범위 내에서 이런 사례를 최상으로 지원할 수 있는 방법을
결정해봅시다.

### 사용 사례 #1: 소셜 미디어 위젯

* Google의 [+1 버튼](/+/web/+1button/){: .external}은
`https://apis.google.com`에서 받은 스크립트를 포함하고
`https://plusone.google.com`에서 받은 `<iframe>`을 삽입합니다. 버튼을 삽입하려면 이런 두 가지 출처를 모두
포함하는 정책이 필요합니다. 최소 정책은 다음과 같습니다. `script-src
https://apis.google.com; child-src https://plusone.google.com`. Google이 제공하는 자바스크립트의 스니펫이
외부 자바스크립트 파일로 추출되는지도
확인해야 합니다. `child-src`를 사용하는
기존 정책이 있는 경우 이를 `child-src`로 변경해야 합니다.

* Facebook의 [Like 버튼](//developers.facebook.com/docs/plugins/like-button){: .external }에는

여러 가지 구현 옵션이 있습니다. `<iframe>` 버전이
사이트 나머지 부분으로부터 안전하게 샌드박싱되어 있으므로 이 버전을 고수하는 것이 좋습니다. `child-src https://facebook.com`
지시문이 올바른 기능을 수행해야 합니다. 참고로,
Facebook이 제공하는 `<iframe>` 코드는 기본적으로 상대
URL인 `//facebook.com`을 로드합니다. 명시적으로 HTTPS를 지정하도록
`https://facebook.com`으로 변경하세요. 꼭 그럴 필요가 없는데도 HTTP를 사용할 이유는 없습니다.

* Twitter의 [Tweet 버튼](https://publish.twitter.com/#)은
스크립트와 프레임에 대한 액세스에 의존하며, 둘 다
`https://platform.twitter.com`에서 호스팅됩니다. (Twitter 역시 기본적으로 상대 URL을
제공합니다. URL을 로컬에서 복사해 붙여넣을 때는 HTTPS를 지정하도록 코드를 편집하세요.)
Twitter가 제공하는 자바스크립트 스니펫을 외부 자바스크립트 파일로 이동해 넣는 한, 전부 `script-src https://platform.twitter.com; child-src
https://platform.twitter.com`으로
설정될 것입니다.

* 다른 플랫폼에도 비슷한 요구사항이 있으며, 역시 비슷한 방법으로 해결할 수 있습니다.
그냥 `default-src`를 `'none'`으로 설정하고 콘솔을 살펴보면서
위젯이 작동하도록 하려면 어떤 리소스를 사용해야 할지 확인하는 방법을 추천합니다.

여러 위젯을 포함하는 방법은 간단합니다. 그냥 정책
지시문을 조합하면 되는데, 이때 단일 유형의 리소스는 전부
단일 지시문으로 병합한다는 점만 기억하면 됩니다. 3개의 소셜 미디어 위젯을 모두 원할 경우 정책은 다음과 같은
내용이 됩니다.

    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### 사용 사례 #2: 잠금

뱅킹 사이트를 운영하는데 자신이 직접 작성한
리소스만 로드할 수 있도록 하려는 경우를 생각해봅시다. 이 시나리오에서는
모든 것을 완전히 차단하는 기본 정책부터 시작해서(`default-src
'none'`) 하나씩 구성해나갑니다.

은행에서는 모든 이미지, 스타일 및 스크립트를
`https://cdn.mybank.net`의 CDN에서 로드하고 XHR을 통해 `https://api.mybank.com/`에
연결하여 다양한 비트의 데이터를 내려 받는다고 해봅시다. 프레임이 사용되지만 사이트에 대해 로컬인 페이지에만
사용됩니다(타사 출처 없음). 이 사이트에는 플래시도, 글꼴도, 추가 기능도
전혀 없습니다. 우리가 보낼 수 있는 가장 제한적인 CSP 헤더는 다음과 같습니다.

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### 사용 사례 #3: SSL 전용

한 결혼반지 토론 포럼 관리자가 모든 리소스를 보안 채널을 통해서만
로드하고 싶어하지만, 실제로는 코드를 많이 작성하지는 않습니다.
인라인 스크립트와 스타일로 넘쳐 흐르는 타사 포럼 소프트웨어 중 많은 부분을 다시 작성하는 것은
이 관리자의 능력을 벗어나는 문제이기도 합니다. 이럴 때는 다음과 같은 정책이
효과적일 것입니다.

    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

`default-src`에 `https:`가 지정되어 있지만 스크립트 및 스타일
지시문이 해당 소스를 자동으로 상속하지는 않습니다. 각 지시문은
그 특정 유형의 리소스에 대한 기본값을 완전히 덮어씁니다.

## 미래


Content Security Policy Level 2는 <a href="http://www.w3.org/TR/CSP2/">
Candidate Recommendation</a>입니다. W3C의 Web Application Security Working Group은
이 사양의 다음 반복 버전인
[Content Security Policy Level 3](https://www.w3.org/TR/CSP3/){: .external }에 대한 작업을 이미 시작했습니다. 


앞으로 등장할 기능에 대한 열띤 토론에 관심이 있으시면
[public-webappsec@ mailing list archives를 훑어보거나](http://lists.w3.org/Archives/Public/public-webappsec/)
직접 토론에 참가해보세요.


{# wf_devsite_translation #}
