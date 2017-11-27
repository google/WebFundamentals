project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'HTTPS를 사용하는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-19 #}
{# wf_published_on: 2016-09-19 #}

# HTTPS를 사용하는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

민감한 데이터를 처리하지 않는 것을 포함하여 모든 웹사이트는 HTTPS로 보호되어야 합니다.
 HTTPS는 침입자가 데이터를 조작하거나
사이트와 사용자 간의 통신을 수신하지 못하도록 차단합니다.

또한, HTTPS는 많은 새롭고 강력한 웹 플랫폼 기능(예: 사진 촬영 또는 오디오 녹음)을 사용하기 위한
전제 조건입니다.

기본적으로 HTTPS에서 실행되지 않으면 Progressive Web App이라고 할 수 없습니다.
 핵심적인 Progressive Web App 기술 대부분(예: 서비스 워커)에
HTTPS가 필요하기 때문입니다.

모든 사이트를 HTTPS로 보호해야 하는 이유에 대한 자세한 내용은
[항상 HTTPS를 사용해야 하는 이유](/web/fundamentals/security/encrypt-in-transit/why-https)를 참조하세요.

## 감사를 통과하는 방법 {: #how }

사이트를 HTTPS로 마이그레이션합니다.

많은 호스팅 플랫폼(예:
[Firebase](https://firebase.google.com/docs/hosting/){: .external } 또는 [GitHub
Pages](https://pages.github.com/){: .external })은 기본적으로 안전합니다.

자체 서버를 운영하고 저렴하고 간단하게 인증서를 생성할 방법을 찾고 있다면
[Let's Encrypt](https://letsencrypt.org/){: .external }를 참조하세요. 서버에서 HTTPS를 활성화하는 방법에 대한 자세한 내용은
[전송 데이터
암호화](/web/fundamentals/security/encrypt-in-transit/enable-https) 문서 집합을 참조하세요.

이미 HTTPS에서 페이지를 실행하고 있지만 이 감사를 통과하지 못했다면
혼합된 콘텐츠에 문제가 있을 수 있습니다. 혼합된 콘텐츠는 보안 사이트가
보호되지 않은(HTTP) 리소스를 요청할 때 나타납니다. 이 상황을 해결하기 위한 자세한 방법은
Chrome DevTools Security 패널 관련 문서
[보안 문제 이해](/web/tools/chrome-devtools/debug/security)를 참조하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 Chrome Debugger Protocol에서
페이지가 보안 연결에서 실행 중임을 나타내는 이벤트를 기다립니다. 10초 이내에 이벤트를 수신하지 못하면
감사를 통과하지 못합니다.


{# wf_devsite_translation #}
