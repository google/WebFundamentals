project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: project_path: /web/_project.yaml book_path: /web/fundamentals/_book.yaml description: 민감한 통신을 처리하지 않는 경우에도 항상 HTTPS를 사용하여 모든 웹사이트를 보호해야 합니다. HTTPS는 웹사이트뿐만 아니라 해당 웹사이트를 믿고 개인 정보를 제공하는 사용자를 위해 중요한 보안 및 데이터 무결성을 제공합니다.

{# wf_updated_on: 2019-01-18 #} {# wf_published_on: 2015-11-23 #} {# wf_blink_components: Internals>Network>SSL #}

# HTTPS가 중요한 이유 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

민감한 통신을 처리하는 경우가 아니라도 항상 HTTPS를 사용하여 모든 웹사이트를 보호해야 합니다. 웹사이트와 사용자의 개인정보에 중요한 보안 및 데이터 무결성을 제공할 뿐만 아니라, HTTPS는 브라우저 신기능 다수, 특히 [프로그레시브 웹 앱](/web/progressive-web-apps/)에 필요한 기능들을 위한 필수 요건이기도 합니다.

### TL;DR {: .hide-from-toc }

- 악의가 있든 없든, 웹사이트 침입자는 웹사이트와 사용자 사이에서 보호되지 않는 모든 리소스를 이용합니다.
- 수많은 침입자들은 집단 행동을 관찰하면서 사용자를 식별합니다.
- HTTPS는 웹사이트의 오용을 방지하는 게 끝이 아닙니다. 많은 첨단 기능의 요구 사항이며 서비스 워커와 같이 앱과 유사한 능력을 사용할 수 있게 하는 기술이기도 합니다.

## HTTPS는 웹사이트의 무결성을 보호합니다

HTTPS는 웹사이트와 사용자 브라우저 사이의 통신을 침입자가 건드리지 못하도록 합니다. 침입자로는 악의가 있는 공격자도 있고, 합법이지만 통신에 침입하여 페이지에 광고를 삽입하는 ISP나 호텔 같은 회사들도 있습니다.

침입자들은 보호되지 않은 통신을 악용하여 사용자들이 민감한 정보를 넘겨주거나 맬웨어를 설치하도록 유도합니다. 또는, 여러분의 리소스에 자신의 광고를 삽입하기도 합니다. 예를 들어 어떤 써드 파티들은 웹사이트에 광고를 삽입하는데, 이는 사용자 경험을 망가뜨리고 보안 취약점을 만들어 낼 수 있습니다.

침입자는 여러분의 웹사사이트와 사용자 사이에 이동하는 보호되지 않은 리소스 모두를 이용합니다. 이미지, 쿠키, 스크립트, HTML … 모두 악용할 수 있습니다. 네트워크 어느 지점에서나 침입이 일어날 수 있습니다. 몇 군데만 나열하자면 사용자의 머신, 와이파이 핫스팟, 감염된 ISP 등입니다.

## HTTPS는 사용자의 개인정보와 보안을 보호합니다

HTTPS는 침입자가 웹사이트와 사용자 사이의 통신을 몰래 수신하는 것을 방지합니다.

HTTPS에 대해 흔하게 오해하는 것 중 하나로 민감한 통신을 처리하는 웹사이트만 HTTPS가 필요하다는 것이 있습니다. 보호되지 않은 HTTP 요청은 모두 사용자의 행동과 신원에 대해 정보를 드러낼 가능성이 있습니다. 보호되지 않은 웹사이트 하나에 방문하는 것이 별 일이 아닌 것처럼 보일 수도 있지만, 침입자는 사용자의 인터넷 활동 집합체를 보고 사용자의 행동과 의도를 유추하거나, 신분을 [탈익명화](https://en.wikipedia.org/wiki/De-anonymization){: .external}하기도 합니다. 예를 들어, 직원이 보호되지 않은 의료 관련 글을 읽기만 해도 그의 민감한 건강 상태가 의도치 않게 고용주에게 알려질 수 있습니다.

## HTTPS는 웹의 미래입니다

`getUserMedia()`를 통한 사진 촬영이나 오디오 녹음, 서비스 워커를 통한 오프라인 앱 경험, 프로그레시브 웹 앱과 같은 강력한 웹 플랫폼 신기능들은 실행하려면 사용자의 명시적인 권한 허락을 필요로 합니다. [지오로케이션](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external} API와 같은 오래된 API들도 실행할 때 권한이 필요하도록 업데이트되고 있습니다. HTTPS는 이러한 새 기능과 업데이트된 API에 대한 권한 워크플로의 주요 구성 요소입니다.

## 피드백 {: #feedback }

{% include "web/_shared/helpful.html" %}
