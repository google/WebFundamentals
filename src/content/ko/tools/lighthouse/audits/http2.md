project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '자체 리소스에 HTTP/2를 사용하는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 자체 리소스에 HTTP/2를 사용하는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

HTTP/2는 적은 데이터 전송으로 페이지 리소스를 더욱 빠르게 서비스할 수 있습니다.


HTTP/2가 HTTP/1.1보다 나은 이유 목록은 [HTTP/2 자주 묻는 질문][faq]을
참조하세요.

심층적 기술 개요는 [HTTP/2 소개][intro]를 참조하세요.

[faq]: https://http2.github.io/faq/
[intro]: /web/fundamentals/performance/http2/

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에서 HTTP/2로 서비스되지 않는 모든 리소스의 목록을 표시합니다.
이 감사를 통과하려면 각 리소스를 HTTP/2로 서비스하세요.

서버에서 HTTP/2를 활성화하는 방법은 [HTTP/2 설정][setup]을 참조하세요.

[setup]: https://dassur.ma/things/h2setup/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지와 같은 호스트에 있는 모든 리소스를 수집하고
각 리소스의 HTTP 프로토콜 버전을 검사합니다.

Lighthouse는 이 검사에서 다른 호스트의 리소스는 제외합니다.
개발자가 이런 리소스의 서비스 방법을 제어할 수 없다고 간주하기 때문입니다.


{# wf_devsite_translation #}
