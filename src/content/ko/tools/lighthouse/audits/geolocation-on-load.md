project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '페이지 로드 시 위치정보를 자동 요청하지 않는 페이지' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# 페이지 로드 시 위치정보를 자동 요청하지 않는 페이지  {: .page-title }

## 감사가 중요한 이유 {: #why }

사용자는 페이지 로드 시 자동으로 위치를 요청하는 페이지를 신뢰하지 않거나
이러한 페이지에 혼란을 느낍니다. 페이지 로드 시 사용자 위치를 자동으로 요청하지 않고
요청을 사용자 동작(예: 'Find Stores Near Me' 버튼 누르기)과 연결합니다.
 동작이 사용자 위치의 필요성을 명확하고 명시적으로
표현해야 합니다.

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에서 코드가 사용자 위치를 요청하는 줄과 열 번호를
보고합니다. 이 호출을 제거하고
요청을 사용자 동작과 연결하세요. 

사용자 위치를 요청하는 모범 사례 목록은 [책임감 있게 권한 요청][ask]을 참조하세요.


[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse 감사 전에 이미 위치정보 권한이 페이지에 부여되었다면
Lighthouse는 페이지 로드 시 사용자 권한을 요청했는지
알아낼 수 없습니다. 권한을 재설정하고 Lighthouse를 다시 실행하세요. 자세한 내용은
[웹사이트 권한 변경][help]을 참조하세요.

Lighthouse는 페이지 로드 시 실행된 자바스크립트를 수집합니다. 이 코드에
`geolocation.getCurrentPosition()` 또는
`geolocation.watchPosition()` 호출이 포함되어 있다면 위치정보 권한이 아직 부여되지 않은 상태이고
그 다음에 사용자 위치를 요청한 것입니다.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
