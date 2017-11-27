project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'HTTP 트래픽을 HTTPS로 리디렉션하는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# HTTP 트래픽을 HTTPS로 리디렉션하는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

모든 사이트는 HTTPS로 보호해야 합니다. 그 이유는 Lighthouse 문서:
[HTTPS를 사용하는 사이트](https)를 참조하세요.

HTTPS를 설정하면 사이트로 들어오는 모든 비보안 HTTP 트래픽이
HTTPS로 리디렉션되는지 확인해야 합니다.

## 감사를 통과하는 방법 {: #how }

1. HTML `head`에서 표준 링크를 사용하여 검색 엔진이
페이지에 도달하는 가장 적절한 방법을 알아내도록 돕습니다.

       <link rel="canonical" href="https://example.com"/>

2. HTTP 트래픽을 HTTPS로 리디렉션하도록 서버를 구성합니다. 가장 알맞은 구성 방법을 알아보려면
서버의 문서를 참조하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지 URL을 `http`로 변경하고 페이지를 로드한 다음,
Chrome Debugger에서 페이지가 안전하다는 것을 나타내는 이벤트가 실행되기를 기다립니다. Lighthouse가
10초 이내에 이벤트를 수신하지 못하면 감사가 실패합니다.


{# wf_devsite_translation #}
