---
title: "서버에서 HTTPS 사용"
description: "서버에서 HTTPS를 사용하도록 설정하는 데 필요한 모든 중요한 단계를 수행할 준비가 되었습니다."
updated_on: 2015-03-27
key-takeaways:
  - Mozilla의 Server Configuration 도구를 사용하여 HTTPS를 지원하도록 서버를 설정합니다.
  - Qualys의 편리한 SSL Server Test를 통해 사이트를 정기적으로 테스트하여 A 또는 A+ 이상의 등급을 유지합니다.
---

<p class="intro">
  서버에서 HTTPS를 사용하도록 설정하는 데 필요한 모든 중요한 단계를 수행할 준비가 되었습니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

이 단계에서 중대한 작업 결정을 내려야 합니다.

* 웹 서버에서 처리하는 콘텐츠의 호스트 이름 각각에 대해 고유한 IP 주소를
 지정하거나
* 이름 기반 가상 호스팅을 사용합니다.

각 호스트 이름에 고유한 IP 주소를 사용해 왔다면 잘 하셨습니다! 모든 클라이언트에서
HTTP와 HTTPS 모두를 손쉽게 지원할 수 있습니다.

하지만, 이름 기반 가상 호스팅이 일반적으로 더 편리하므로 대부분의 사이트 운영자는 이를 사용하여 IP
주소를 유지합니다. Windows XP 및 Android 2.3 이전
버전 기반의 IE 관련 문제는 HTTPS 이름 기반 가상 호스팅에 중요한 SNI([Server
Name Indication](https://en.wikipedia.org/wiki/Server_Name_Indication))를
인식하지 않는다는 점입니다.

SNI를 지원하지 않는 클라이언트는 모두 최신 소프트웨어로
언젠가 교체될 것이며, 곧 그렇게 되기를 바랍니다. 요청 로그에서 사용자 에이전트 문자열을 모니터링하여
충분한 수의 사용자 모집단이 최신 소프트웨어로 마이그레이션한 때를 파악합니다. (원하는
임계값을 결정할 수 있습니다. &lt; 5%, &lt; 1% 등으로 지정할 수 있습니다.)

서버에서 HTTPS 서비스를 사용할 수 있도록 설정하지 않은 경우 지금 사용하도록 설정하십시오
(HTTP에서 HTTPS로 리디렉션하지 않음. 아래 참조). 구입하고 설치한 인증서를 사용하도록
웹 서버를 구성합니다. [Mozilla의 편리한
Configuration
Generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)가
유용하다는 것을 확인할 수 있을 것입니다.

호스트 이름/하위 도메인이 많은 경우 각각 올바른
인증서를 사용해야 합니다.

**참고:** 많은 사이트 운영자가 여기서 설명하는 단계를 이미 완료했지만
클라이언트를 HTTP로 다시 리디렉션하는 용도로만 HTTPS를 사용하고 있습니다. 그런 식으로 사용하고
있는 경우에는 지금 바로 사용을 중단하십시오. HTTPS와 HTTP가 원활하게 작동하도록 하려면
다음 절을 참조하십시오.

**참고:** 궁극적으로, HTTP 요청을 HTTPS로 리디렉션하고 HSTS(HTTP Strict
Transport Security)를 사용해야 합니다. 이는 이 작업을 수행하기 위한 마이그레이션 프로세스에서
적절한 단계가 아니며 "HTTP를 HTTPS로 리디렉션" 및 "STS(Strict Transport Security) 및 보안 쿠키 설정"을 참조하십시오.

지금뿐만 아니라 사이트 수명 전체에 걸쳐 [Qualys의 편리한 SSL Server Test](https://www.ssllabs.com/ssltest/)를 사용하여
HTTPS 구성을 확인하십시오. 운영하는 사이트는
A 또는 A+ 등급을 받아야 하며, 이보다 낮은 등급을 초래하는 모든 원인은 버그로 처리해야 합니다.
(알고리즘과 프로토콜을 상대로 한 공격은 항상 발전하므로
현재의 A 등급은 향후 B 등급이 됩니다!)

