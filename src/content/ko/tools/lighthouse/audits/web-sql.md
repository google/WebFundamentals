project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'Web SQL을 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# Web SQL을 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

Web SQL은 지원이 중단되었습니다. 자세한 내용은 [Web SQL 데이터베이스][spec]를 참조하세요.

[spec]: https://www.w3.org/TR/webdatabase/

## 감사를 통과하는 방법 {: #how }

Web SQL 데이터베이스를 최신 데이터베이스(예:
[IndexedDB][indexeddb])로 교체하세요.

다른 이용 가능한 저장소 옵션은 [웹 저장소 개요][overview]를 참조하세요.


[indexeddb]: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
[overview]: /web/fundamentals/instant-and-offline/web-storage/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지에 Web SQL 데이터베이스 인스턴스가 있는지 검사합니다.


{# wf_devsite_translation #}
