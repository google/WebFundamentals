---
title: "STS(Strict Transport Security) 및 보안 쿠키 설정"
updated_on: 2015-03-27
key-takeaways:
  - 301 리디렉션 비용을 방지하려면 HSTS(HTTP Strict Transport Security)를 사용해야 합니다.
  - 항상 쿠키에 보안 플래그를 설정해야 합니다.
---

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

이제 HTTPS 사용을 "락인(lock in)"할 준비가 되었습니다. 먼저, [STS(Strict
Transport
Security)](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)를 사용하여
http:// 참조를 따르는 경우에도 항상 HTTPS를 통해 서버에
연결해야 함을 클라이언트에 지시합니다. 이를 통해 [SSL
스트라이핑](http://www.thoughtcrime.org/software/sslstrip/)과 같은 공격이 차단되고,
"HTTP를 HTTPS로 리디렉션"에서 활성화한 301 리디렉션의 라운드 트립 비용도 방지됩니다.

**참고:** [사이트의 ](https://tools.ietf.org/html/rfc6797#section-12.1)[TLS 구성에
오류가 발생한 경우](https://tools.ietf.org/html/rfc6797#section-12.1)(예:
만료된 인증서) 알려진 HSTS 호스트로 사이트를 확인한 클라이언트는
_[하드 실패](https://tools.ietf.org/html/rfc6797#section-12.1)_할
가능성이 높습니다. 이는 HSTS에 대한 명시적인 설계 옵션이며
네트워크 공격자가 HTTPS를 사용하지 않고
사이트에 액세스하도록 클라이언트를 속이지 못하게 하는 데 도움이 됩니다. 인증서 유효성 검사 오류와 함께 HTTPS 배포를
방지하는 데 충분한 정도로 사이트 운영이 강력하다고 확신하기 전에는
HSTS를 활성화하지 마십시오.

Strict-Transport-Security 헤더를 설정하여 HSTS(HTTP Strict Transport Security)를
설정하십시오. [OWASP의 HSTS 페이지에 다양한 서버
소프트웨어에 대한 지침 링크가
나와 있습니다](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security).

대부분의 웹 서버는 사용자 지정 헤더를 추가하기 위한 유사한 기능을 제공합니다.

**참고:** max-age는 초 단위로 측정됩니다. 낮은 값부터 시작하고
HTTPS 전용 사이트를 운영하는 데 더 편안해질수록
max-age를 점차 높이십시오.

또한 클라이언트가 HTTP를 통해 쿠키(예: 인증 또는 사이트 기본 설정용 쿠키)를
 전송하지 않도록 하는 것도 중요합니다. 예를 들어, 사용자의
인증 쿠키가 일반 텍스트 형식으로 노출되면 다른 모든 것이
올바르더라도 전체 세션의 보안이 보장되지 않게
됩니다.

따라서, 웹 애플리케이션을 변경하여 항상 이 애플리케이션에서 설정하는
쿠키에 보안 플래그를 설정하도록 하십시오. [이 OWASP 페이지에서는 여러 애플리케이션
프레임워크에서 보안 플래그를 설정하는 방법에 대해
설명합니다](https://www.owasp.org/index.php/SecureFlag). 모든 애플리케이션 프레임워크에는 플래그를 설정하기 위한 방법이 있습니다.

