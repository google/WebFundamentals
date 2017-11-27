project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'Application Cache를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# Application Cache를 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

Application Cache(또는 AppCache)는 [지원이 중단][deprecated]되었습니다.

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## 감사를 통과하는 방법 {: #how }

대신 서비스 워커 [Cache API][API]를 사용하는 방법을 고려해보세요.

AppCache에서 서비스 워커로 마이그레이션하려면
[sw-appcache-behavior][sw-appcache-behavior] 라이브러리 사용을 고려해보세요. 이 라이브러리는
AppCache 매니페스트에서 정의된 동작을 서비스 워커 기반으로
구현합니다.

서비스 워커로 사이트를 오프라인에서 작동시키는 방법에 관한 자세한 내용은
[오프라인 시 200으로 응답하는 URL](http-200-when-offline) 감사
참조를 참조하세요.

[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

AppCache 매니페스트가 탐지되지 않으면 감사가 통과됩니다.


{# wf_devsite_translation #}
