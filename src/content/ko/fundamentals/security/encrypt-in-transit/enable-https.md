project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서버에서 HTTPS를 활성화하는 것은 웹페이지 보안에 매우 중요한 요소입니다. 

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-03-27 #}

# 서버에서 HTTPS 활성화 {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* 2048비트 RSA 공개 키/비공개 키 쌍을 만듭니다.
* 공개 키를 포함하는 CSR(인증서 서명 요청)을 생성합니다.
* 생성한 CSR을 CA(인증 기관)와 공유하여 최종 인증서 또는 인증서 체인을 받습니다.
* `/etc/ssl` 등 웹 액세스가 불가능한 곳(Linux 및 Unix)이나 IIS가 인증서를 필요로 하는 곳(Windows)에 최종 인증서를 설치합니다.

## 키 및 CSR(인증서 서명 요청) 생성

이 절에서는 대부분의 Linux, BSD 및 Mac OS X 시스템과 함께 제공되는
openssl 명령줄 프로그램을 사용하여 비공개 키/공개 키 및 CSR를 생성합니다.


### 공개 키/비공개 키 쌍 생성

2,048비트 RSA 키 쌍을 생성하는 작업부터 시작합시다. 1,024비트와 같은
작은 키는 무차별 암호 대입 공격(brute-force guessing attack)에 대응하는 데 충분하지 않습니다. 4,096비트와
같은 큰 키는 대응이 과합니다. 시간이 지나면서 컴퓨터 처리 비용이
저렴해질수록 키 크기는 증가합니다. 현재는 2,048비트가 이상적입니다.

RSA 키 쌍을 생성하기 위한 명령어는 다음과 같습니다.

    openssl genrsa -out www.example.com.key 2048

그러면 다음과 같이 출력됩니다.

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### 인증서 서명 요청 생성

이 단계에서는 조직과 웹사이트에 대한 공개 키와 정보를
인증서 서명 요청(CSR)에 삽입합니다. *openssl*
명령어는 필요한 메타데이터가 있는지 대화식으로 질문합니다.

다음 명령을 실행하면

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

다음과 같이 출력됩니다.

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

CSR의 유효성을 확인하려면 다음 명령을 실행하세요.

    openssl req -text -in www.example.com.csr -noout

응답은 다음과 같습니다.

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### CSR를 인증 기관에 제출

인증 기관(CA)으로 CSR을 보낼 때 사용해야 하는 방법은 CA마다
제각기 다릅니다. 웹사이트에 있는 양식을 사용하거나 이메일로 CSR을 보내는 등
다양한 방법이 있습니다. 몇몇 CA(또는 해당 재판매업체)는 이 프로세스의 일부 또는 전체(경우에
따라 키 쌍 및 CSR 생성 포함)를 자동화할
수도 있습니다.

CA에 CSR를 보내고 지시에 따라 최종 인증서 또는 인증서 체인을
받습니다.

공개 키 보증 서비스 수수료는 CA마다 다를
수 있습니다.

복수의 고유한 DNS 이름(예: example.com, www.example.com,
example.net 및 www.example.net 모두)에 매핑하거나 \*.example.com과 같은 '와일드카드' 이름 등 둘 이상의
DNS 이름에 키를 매핑하는 옵션도 있습니다.

예를 들어, 한 CA가 현재 다음 가격을 제공하고 있다고 가정합니다.

* 표준: $16/년, example.com 및 www.example.com에 유효.
* 와일드카드: $150/년, example.com 및 \*.example.com에 유효.

이 가격을 기준으로 계산하면 하위 도메인이 10개 이상인 경우에는 와일드카드 인증서가
경제적이고, 9개 이하인 경우에는 1개 이상의 단일 이름 인증서를 구입하는 것이 좋습니다. (하위
도메인이 6개 이상인 경우 서버에서 HTTPS를 사용하도록 설정할 때
와일드카드 인증서가 더 편리할 것입니다.)

참고: 와일드카드 인증서에서 와일드카드는 단일 DNS 레이블에만 적용됩니다. \*.example.com에 유효한 인증서는 foo.example.com 및 bar.example.com에는 적용되지만 foo.bar.example.com에는 적용되지 _않습니다_.

`/etc/ssl` 등 웹 액세스가 불가능한 곳(Linux 및 Unix)이나 IIS가 인증서를
필요로 하는 곳(Windows)의 모든 프런트 엔드 서버에 인증서를 복사합니다.

## 서버에서 HTTPS 활성화

서버에서 HTTPS 활성화는 웹페이지에 보안을 제공하는 중요한 단계입니다.

* Mozilla의 Server Configuration 도구를 사용하여 HTTPS를 지원하도록 서버를 설정합니다.
* Qualys의 편리한 SSL Server Test를 통해 사이트를 정기적으로 테스트하여 A 또는 A+ 이상의 등급을 유지합니다.

이 시점에서 중대한 작업 결정을 내려야 합니다. 다음 중 하나를 선택합니다.

* 웹 서버에서 처리하는 콘텐츠의 호스트 이름 각각에 대해 고유한 IP 주소를
  지정합니다.
* 이름 기반 가상 호스팅을 사용합니다.

각 호스트 이름에 고유한 IP 주소를 사용해 왔다면 모든 클라이언트에서
HTTP와 HTTPS 모두를 손쉽게 지원할 수 있습니다.

하지만, 이름 기반 가상 호스팅이 일반적으로 더 편리하므로 대부분의 사이트 운영자는 이를 사용하여 IP
주소를 유지합니다. Windows XP 및 Android 2.3 이전
버전 기반의 IE 관련 문제는 HTTPS 이름 기반 가상 호스팅에 중요한 SNI([Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external})를
인식하지 않는다는 점입니다.

SNI를 지원하지 않는 클라이언트는 최신 소프트웨어로
언젠가 교체될 것이며, 곧 그렇게 되기를 바랍니다. 요청 로그에서 User Agent 문자열을 모니터링하여
충분한 수의 사용자 모집단이 최신 소프트웨어로 마이그레이션한 때를 파악합니다. (원하는
임계값을 결정할 수 있습니다. &lt; 5%, &lt; 1% 등으로 지정할 수 있습니다.)

서버에서 HTTPS 서비스를 사용할 수 있도록 설정하지 않은 경우 지금 사용하도록
설정합니다(HTTP에서 HTTPS로 리디렉션하지 않음. 아래 참조). 구입하고 설치한 인증서를 사용하도록
웹 서버를 구성합니다. [Mozilla의 편리한
Configuration
Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}가
유용하다는 것을 확인할 수 있을 것입니다.

호스트 이름/하위 도메인이 많은 경우 각각 올바른
인증서를 사용해야 합니다.

Warning: 이미 이런 절차를 완료했지만 클라이언트를 HTTP로 다시 리디렉션하는 용도로만 HTTPS를 사용하고 있다면 지금 사용을 중단하세요. HTTPS와 HTTP가 원활하게 작동하도록 하려면 다음 섹션을 참조하세요.

참고: 궁극적으로, HTTP 요청을 HTTPS로 리디렉션하고 HSTS(HTTP StrictTransport Security)를 사용해야 합니다. 하지만 이는 이 작업을 수행하기 위한 마이그레이션 프로세스에서 적절한 단계가 아닙니다. 'HTTP를 HTTPS로 리디렉션' 및 'STS(Strict Transport Security) 및 보안 쿠키 설정'을 참조하세요.

지금뿐만 아니라 사이트 수명 전체에 걸쳐 [Qualys의 편리한 SSL Server Test](https://www.ssllabs.com/ssltest/){: .external }를 사용하여
HTTPS 구성을 확인하세요. 운영하는 사이트는
A 또는 A+ 등급을 받아야 하며, 이보다 낮은 등급을 초래하는 모든 원인은 버그로 처리해야 합니다.
(알고리즘과 프로토콜을 상대로 한 공격은
항상 발전하므로 현재의 A 등급은 향후 B 등급이 됩니다!)

## 사이트 내 URL을 상대 URL로 만들기

HTTP뿐만 아니라 HTTPS로도 사이트를 제공하므로 프로토콜에 상관없이
사이트가 가능한 한 원활하게 작동해야 합니다. 중요한 요소는 사이트 내 링크에 대한
상대적 URL을 사용하는 것입니다.

사이트 내 URL과 외부 URL이 프로토콜에 구속되지 않도록 해야 합니다. 즉, 상대 경로를 사용하거나 프로토콜을 제외해야 합니다(예: `//example.com/something.js`).

HTTPS를 통해 HTTP 리소스를 포함하는
페이지를 제공하는 경우 [혼합 콘텐츠](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content)로 알려진 문제가 발생합니다. 브라우저는 사용자에게 HTTPS의 모든 강점이 손실되었다는 내용의 경고를 표시합니다. 실제로, 능동적 혼합 콘텐츠(스크립트, 플러그인, CSS, iframe)의 경우 브라우저가 콘텐츠를 로드 또는 실행하지 않아 페이지가 끊어집니다.

참고: HTTP 페이지에 HTTPS 리소스를 포함하는 것은 괜찮습니다.

또한, 사이트 내부에서 다른 페이지에 대한 링크를 포함하는 경우
HTTPS에서 HTTP로 다운그레이드될 수 있습니다.

이러한 문제는 페이지에 *http://* 스키마를 사용하는 정규화된 사이트 내 URL이
포함될 때 발생합니다. 

<p><span class="compare-worse">권장되지 않음</span> — 정규화된 사이트 내 URL을 사용하지 않는 것이 좋습니다.</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

즉, 사이트 내 URL을 가급적 프로토콜에 상대적으로(프로토콜 배제, `//example.com`으로 시작) 또는 호스트에 상대적으로(`/jquery.js`와 같이 경로만으로 시작) 만들어야 합니다.

<p><span class="compare-better">권장</span> — 프로토콜에 상대적인 사이트 내 URL을 사용하는 것이 좋습니다.</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">권장</span> — 상대적인 사이트 내 URL을 사용하는 것이 좋습니다.</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

이 작업은 직접 하지 말고 스크립트를 사용하여 수행하세요. 사이트 콘텐츠가 데이터베이스에 포함된 경우
데이터베이스의 개발 복사본에서 스크립트를 테스트하세요. 사이트
콘텐츠가 단순한 파일로 구성된 경우 파일의 개발 복사본에서 스크립트를 테스트하세요. 변경 사항이 QA를 통과한 후에만 평상시와 같이 운영 환경에 적용하세요. [Bram van Damme의 스크립트](https://github.com/bramus/mixed-content-scan)나 유사한 스크립트를 사용하여 사이트의 혼합 콘텐츠를 검색할 수 있습니다.

다른 사이트의 리소스를 포함하는 것과 달리 다른 사이트에 연결하는 경우에는
해당 사이트의 작동 방식을 제어할 수 없으므로
프로토콜을 변경하지 마세요.

Success: 대규모 사이트에 대한 마이그레이션 작업이 더 원활하게 진행되도록 하려면 프로토콜에 상대적인 URL을 사용하는 것이 좋습니다. 아직 HTTPS를 완전히 배포할 수 있을지 확실치 않은 경우에 사이트의 모든 하위 리소스에 대해 HTTPS를 강제로 사용하게 하면 역효과가 날 수 있습니다. 일정 기간 HTTPS가 새롭고 이상할 가능성이 크므로 HTTP 사이트도 계속해서 작동되어야 합니다. 시간이 지남에 따라 마이그레이션을 완료하고 HTTPS를 락인(lock in)할 것입니다(아래 두 섹션 참조).

사이트가 타사(예: CDN 또는 jquery.com)에서
제공하는 스크립트, 이미지 또는 기타 리소스를 사용하는 경우 두 가지 옵션을 사용할 수 있습니다.

* 이러한 리소스에 대해 프로토콜에 상대적인 URL을 사용합니다. 타사에서
HTTPS를 지원하지 않을 경우 이를 지원하도록 요청합니다. jquery.com을 포함하여 대부분의 업체에서 이미 HTTPS를 지원하고 있습니다. 
* 개발자가 제어하고 HTTP와 HTTPS를 모두 제공하는 서버에서 리소스를
제공합니다. 이 경우 사이트의 모양, 성능 및 보안을 더 효과적으로 제어할 수 있다는
장점이 있습니다. 또한,
타사를 따로 신뢰할 필요가 없습니다.

참고: HTML 페이지뿐만 아니라 스타일시트, 자바스크립트, 리디렉션 규칙, `<link>` 태그, CSP 선언에서도 사이트 내 URL을 변경해야 한다는 점을 명심하세요.

## HTTP를 HTTPS로 리디렉션

HTTPS가 사이트에 액세스할 수 있는 가장 좋은 방법임을 검색 엔진에 알리려면 [기본 링크](https://support.google.com/webmasters/answer/139066)를 페이지 헤드에 추가해야 합니다.

페이지에서 `<link rel="canonical" href="https://…"/>` 태그를 설정하세요. 그러면
검색 엔진이 사이트에 액세스할 수 있는 가장 좋은 방법을 결정하는 데 도움이 됩니다.

## STS(Strict Transport Security) 및 보안 쿠키 설정

이제 HTTPS 사용을 '락인(lock in)'할 준비가 되었습니다. 

* 301 리디렉션 비용을 방지하려면 HSTS(HTTP Strict Transport Security)를 사용하세요.
* 항상 쿠키에 보안 플래그를 설정하세요.

먼저, [STS(StrictTransportSecurity)](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)를
사용하여`http://` 참조를 따르는 경우에도 항상 HTTPS를 통해 서버에
연결해야 함을 클라이언트에 지시합니다. 이를 통해
[SSL 스트라이핑](http://www.thoughtcrime.org/software/sslstrip/){: .external }과 같은 공격이 차단되고
[HTTP를 HTTPS로 리디렉션](#redirect-http-to-https)에서 활성화한 `301 redirect`의
라운드 트립 비용도 방지됩니다.

참고: <a href="https://tools.ietf.org/html/rfc6797#section-12.1">사이트의 TLS 구성에 오류가 발생한 경우(예: 만료된 인증서) 알려진 HSTS 호스트로 사이트를 확인한 클라이언트는 <i>실패</i></a>할 가능성이 높습니다. HSTS는 이런 식으로 네트워크 공격자가 클라이언트를 속여 HTTPS로 보호되지 않는 사이트에 액세스하도록 유인할 수 없도록 한다는 명시적으로 목적으로 고안된 기술입니다. 인증서 유효성 검사 오류와 함께 HTTPS 배포를 방지하는 데 충분한 정도로 사이트 운영이 강력하다고 확신하기 전에는 HSTS를 활성화하지 마세요.

`Strict-Transport-Security` 헤더를 설정하여 HSTS(HTTP Strict Transport Security)를 설정하세요. [OWASP의 HSTS 페이지에 다양한 서버 소프트웨어에 대한 지침 링크가 나와 있습니다](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security).

대부분의 웹 서버는 사용자설정 헤더를 추가하기 위한 유사한 기능을 제공합니다.

참고: `max-age`는 초 단위로 측정됩니다. 낮은 값부터 시작하고 HTTPS 전용 사이트를 운영하는 데 더 편안해질수록 `max-age`를 점차 높이세요.

또한 클라이언트가 HTTP를 통해 쿠키(예:
인증 또는 사이트 기본 설정용 쿠키)를 전송하지 않도록 하는 것도 중요합니다. 예를 들어, 사용자의
인증 쿠키가 일반 텍스트 형식으로 노출되면 다른 모든 것이
올바르더라도 전체 세션의 보안이 보장되지 않게
됩니다.

따라서, 웹 애플리케이션을 변경하여 항상 이 애플리케이션에서 설정하는
쿠키에 보안 플래그를 설정하도록 하세요. [이 OWASP 페이지에서는 여러 애플리케이션 프레임워크에서 보안 플래그를 설정하는 방법에 대해 설명합니다](https://www.owasp.org/index.php/SecureFlag). 모든 애플리케이션 프레임워크에는 플래그를 설정하기 위한 방법이 있습니다.

대부분의 웹 서버는 단순한 리디렉션 기능을 제공합니다. `301 (Moved Permanently)`를 사용하여
검색 엔진 및 브라우저에 HTTPS 버전이 기본임을 알리고 사용자를 사이트의 HTTP 버전에서 HTTPS 버전으로 리디렉션하세요.

## 마이그레이션 우려 사항

대부분의 개발자는 HTTP에서 HTTPS로 마이그레이션에 대해 우려합니다.
Google 웹마스터 팀에서 [우수한 안내 서비스](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J)를 제공합니다.

### 검색 순위

Google은 [HTTPS를 긍정적인 검색 품질 지표로 사용합니다](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html).
또한 이 검색 순위를 유지하면서
[사이트 이전, 이동 또는 마이그레이션 방법](https://support.google.com/webmasters/topic/6029673)에
대한 가이드를 게시하고 있습니다. Bing도 [웹마스터를 위한
지침](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a)을 게시하고 있습니다.

### 성능

콘텐츠 및 애플리케이션 레이어가 잘 조율된 경우([Steve Souders의
서적](https://stevesouders.com/){: .external } 참조) 나머지 TLS 성능 우려 사항은
일반적으로 애플리케이션의 전반적인 비용에 대해
상대적으로 매우 작은 수준입니다. 또한, 이러한 비용은 절감하고
상각할 수 있습니다. (TLS 최적화를 비롯한 유용한 정보는 Ilya Grigorik의
[High Performance BrowserNetworking](http://chimera.labs.oreilly.com/books/1230000000545)을 참조하세요.) Ivan Ristic의 [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)과 [Bulletproof SSL 및 TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)도 참조하세요.

경우에 따라 TLS는 성능을 _향상_ 시킬 수 있습니다. 이는 주로 HTTP/2가 실현
가능해졌기 때문입니다. Chris Palmer는 [Chrome Dev Summit 2014에서 HTTPS 및 HTTP/2 성능](/web/shows/cds/2014/tls-all-the-things)에 관한 고찰을 발표했습니다.

### 참조자 헤더

사용자 에이전트는 사용자가 HTTPS 사이트의 링크를 따라 다른 HTTP 사이트에 접속할 때 참조자 헤더를 전송하지 않습니다. 이것이 문제라면 다음과 같은 방법을 활용하여 해결할
수 있습니다.

* 다른 사이트를 HTTPS로 마이그레이션해야 합니다. 피참조자 사이트가 이 가이드의 [서버에서 HTTPS 사용](#enable-https-on-your-servers) 섹션을 참조하여 설정을 완료할 수 있는 경우 사이트의 링크를 `http://`에서 `https://`로 변경하거나  프로토콜에 상대적인 링크를 사용할 수 있습니다.
* 참조자 헤더와 관련한 다양한 문제를 해결하려면 새 [참조자 정책 표준](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)을 사용하세요.

검색 엔진이 HTTPS로 마이그레이션하는 중이기 때문에 HTTPS로 마이그레이션하면 앞으로 _더 많은_ 참조자 헤더를 볼 가능성이 높습니다.

Caution: [HTTP RFC](https://tools.ietf.org/html/rfc2616#section-15.1.3)에 따라, 클라이언트는 참조 페이지가 보안 프로토콜로 이전된 경우 참조자 헤더 필드를 (보안이 유지되지 않는) HTTP 요청에 포함하지 **않아야** 합니다.

### 광고 수익

광고를 표시함으로써 사이트의 수익을 내는 사이트 운영자는 HTTPS
마이그레이션으로 인해 광고 효과가 저하되지 않도록 하기를 원합니다. 하지만, 혼합 콘텐츠
보안 문제로 인해 HTTP `<iframe>`이 HTTPS 페이지에서 작동하지 않습니다. 여기에 까다로운
집단 행동 문제가 있습니다. 광고주가 HTTPS를 통해 게시할 때까지
사이트 운영자는 광고 수익 손실 없이 HTTPS로 마이그레이션할 수
없습니다. 하지만 사이트 운영자가 HTTPS로 마이그레이션할 때까지 광고주는 HTTPS를 통해 게시할 생각을 거의 갖지 않습니다.

광고주는 적어도 HTTPS를 통해 광고 서비스를 제공해야 합니다(이 페이지의
'서버에서 HTTPS 활성화' 섹션을 참조하여 설정을 완료하는 방법을 통해). 많은 광고주가 이미 이렇게 하고 있습니다. HTTPS를
전혀 지원하지 않는 광고주에게는 적어도 이를 시작하도록 요청해야 합니다.
많은 광고주가 제대로 상호 운용할 때까지 개발자는 [사이트 내 URL을 상대 URL로 만들기](#make-intrasite-urls-relative)를 시도하는 것을 연기하고 싶을 수 있습니다.


{# wf_devsite_translation #}
