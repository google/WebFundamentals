project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '페이지 로드 시 알림 권한을 자동 요청하지 않는 페이지' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 페이지 로드 시 알림 권한을 자동 요청하지 않는 페이지  {: .page-title }

## 감사가 중요한 이유 {: #why }

[좋은 알림이란 어떤 것입니까][good]에서 설명한 바와 같이 좋은 알림은
시기 적절하고 관련이 있으며 정확해야 합니다. 페이지가 페이지 로드 시 알림을 전송할 권한을
요청할 경우, 이러한 알림은 사용자와 관련이 없거나
사용자의 필요에 정확히 들어맞지 않을 수 있습니다. 이보다 나은 사용자 환경은
특정 유형의 알림을 전송할 것을 제안하고 사용자가 옵트인한 후에 권한 요청을
보여주는 것입니다.

[good]: /web/fundamentals/push-notifications/

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에서 코드가 알림 전송 권한을 요청하는 줄과 열 번호를
보고합니다. 이 호출을 제거하고
요청을 사용자 동작과 연결하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 감사 전에 알림 권한이 페이지에 이미 부여되어 있거나
거부되었을 경우 Lighthouse는
페이지 로드 시 알림 권한을 요청하는지 판단할 수 없습니다. 권한을 재설정하고
Lighthouse를 다시 실행하세요. 자세한 내용은 [웹사이트 권한 변경][help]을 참조하세요.

Lighthouse는 페이지 로드 시 실행된 자바스크립트를 수집합니다. 
코드에 `notification.requestPermission()` 호출이 포함되어 있고
알림 권한이 아직 부여되지 않았다면, 알림 권한이 요청됩니다.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
