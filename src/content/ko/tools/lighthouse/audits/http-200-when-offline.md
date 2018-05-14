project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '오프라인 시 200으로 응답하는 URL' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# 오프라인 시 200으로 응답하는 URL {: .page-title }

## 감사가 중요한 이유 {: #why }

Progressive Web App은 오프라인에서 작동합니다. Lighthouse가 오프라인으로 페이지에 액세스할 때 HTTP 200
응답을 수신하지 않으면 이 페이지는
오프라인 액세스가 불가능합니다.

## 감사를 통과하는 방법 {: #how }

1. 앱에 서비스 워커를 추가합니다.
2. 서비스 워커를 사용하여 파일을 로컬에서 캐시합니다.
3. 오프라인일 때 서비스 워커를 네트워크 프록시로 사용하여
로컬에서 캐시된 파일 버전을 반환합니다.

서비스 워커를 기존 앱에 추가하는 방법에 대한 자세한 내용은 [서비스 워커와
오프라인을
웹 앱에 추가](https://codelabs.developers.google.com/codelabs/offline)를 참조하세요. 이 단계별 실습 코드랩에서 배운 내용을
활용하여 서비스 워커를 앱에 추가하는 방법을
알아보세요. 위의 1단계와 3단계가 포함됩니다.

위의 코드랩은 Chrome DevTools를 사용하여 서비스 워커를
디버그하는 기본적 방법을 보여줍니다. 자세한 내용은 이 주제를 집중적으로 다룬 코드랩,
[서비스 워커
디버깅](https://codelabs.developers.google.com/codelabs/debugging-service-workers)을 참조하세요.

[오프라인 설명서](https://jakearchibald.com/2014/offline-cookbook/)에서
앱에 가장 알맞은 캐싱 전략을 확인하세요. 여기에는 위의 2단계가 포함됩니다.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 Chrome 디버깅 프로토콜을 사용하여 오프라인 연결을 에뮬레이트한 다음,
`XMLHttpRequest`를 사용하여 페이지 조회를 시도합니다.


{# wf_devsite_translation #}
