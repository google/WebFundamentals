project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 민감한 통신을 처리하지 않는 경우에도 항상 HTTPS를 사용하여 모든 웹사이트를 보호해야 합니다. HTTPS는 웹사이트뿐만 아니라 해당 웹사이트를 믿고 개인 정보를 제공하는 사람들을 위해 중요한 보안 및 데이터 무결성을 제공합니다.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-11-23 #}

# HTTPS가 중요한 이유 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

민감한 통신을 처리하지 않는 경우에도 항상 HTTPS를 사용하여
모든 웹사이트를 보호해야 합니다. 웹사이트와 사용자의 개인정보 모두에 대한
중요한 보안 및 데이터 무결성을 제공하는 것과는 별개로, HTTPS는
수많은 새로운 브라우저 기능, 특히
[PWA(Progressive Web App)](/web/progressive-web-apps/)에 필요한 기능을 위한 필수 요건입니다.

### TL;DR {: .hide-from-toc }

* 악의가 있든 없든, 웹사이트 침입자는 웹사이트와 사용자 사이에서 보호되지 않는 모든 리소스를 이용합니다.
* 수많은 침임자들은 집단 행동을 관찰하면서 사용자를 식별합니다. 
* HTTPS는 웹사이트의 오용을 가로막지 못합니다. 이는 수많은 최첨단 기능과 서비스 워커처럼 앱 같은 기능을 위한 구현 기술의 요건이기도 합니다. 

## HTTPS는 웹사이트의 무결성 보호 

HTTPS는 침입자가 웹사이트와 사용자 브라우저 간 
통신을 변조하는 것을 방지하는 데 도움을 줍니다. 침입자란 
의도적인 악성 공격자와 합법적인 침입 회사(광고를 페이지에 삽입하는 
ISP 또는 호텔)를 포함합니다.

침입자는 보호되지 않은 통신을 이용하여 자신의 광고를 
리소스에 삽입하거나, 사용자를 속여 민감한 정보를 제공하거나 
맬웨어를 설치하게 합니다. 예를 들어, 일부 업체는 잠재적으로 
사용자 환경을 파괴하고 
보안상 취약점을 만드는 광고를 웹사이트에 삽입합니다.

침입자는 웹사이트와 사용자 사이에 오가는 모든 보호되지 않은 
리소스를 이용합니다. 이미지, 쿠키, 스크립트, HTML 등은 모두 
이용 대상입니다. 침입은 사용자 컴퓨터, Wi-Fi 핫스팟 또는 손상된 ISP를
비롯한 네트워크의 모든 지점에서 발생할 수 있습니다. 

## HTTPS는 사용자의 개인정보 및 보안 보호

HTTPS는 침입자가 웹사이트와 사용자 간 통신을 몰래 수신하지
못하도록 방지합니다.

민감한 통신을 처리하는 웹사이트만 
HTTPS가 필요하다고 많이 오해합니다. 모든 
보호되지 않은 HTTP 요청은 사용자의 
행동 및 신원 정보를 잠재적으로 노출할 수 있습니다. 보호되지 않은 웹사이트에 
방문한 침입자는 
집계된 사용자의 검색 활동을 확인하여 
사용자의 
행동 및 의도를 추측하고 사용자 신원을 
[탈익명화](https://en.wikipedia.org/wiki/De-anonymization){: .external}합니다. 예를 들어, 
직원이 보호되지 않은 의료 관련 글을 읽기만 했는데 그의 민감한 
건강 상태가 의도치 않게 고용주에게 알려질 수 있습니다.

## HTTPS는 웹의 미래

`getUserMedia()`를 통한
오디오 녹음 또는 사진 촬영, 서비스 워커를 통한 오프라인 앱 경험 활성화, 또는 Progressive Web App 빌드를 비롯한 강력한 새 플랫폼 기능은
사용자가 명시적으로
허가해야 실행됩니다. [geolocation](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external}
API 등과 같은 대부분의 이전 API도 실행하려면
허락이 필요하도록 업데이트되는
중입니다. HTTPS는 이러한 새 기능과 업데이트된 API에 대한 권한 워크플로의
주요 구성 요소입니다.








{# wf_devsite_translation #}
