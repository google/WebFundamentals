project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '등록된 서비스 워커가 있음' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# 등록된 서비스 워커가 있음 {: .page-title }

## 감사가 중요한 이유 {: #why }

서버스 워커를 등록하는 것은 다음의 Progressive Web App 기능을
활성화하는 첫걸음입니다.

* 오프라인
* 푸시 알림
* 홈 화면에 추가

## 감사를 통과하는 방법 {: #how }

서비스 워커를 등록하는 데는 코드 몇 줄만 있으면 되지만
서비스 워커를 사용하는 이유는 위의 Progressive Web App 기능을
구현하기 위해서입니다. 이러한 기능을 구현하려면
더 많은 노력이 필요합니다.

오프라인용으로 파일을 캐싱하는 방법에 대한 자세한 내용은
Lighthouse 문서 [오프라인 시 200으로 응답하는 URL
](http-200-when-offline#how)의 '감사를 통과하는 방법' 섹션을 참조하세요.

푸시 알림이나 '홈 화면에 추가'를 활성화하려면
다음의 단계별 가이드를 완료한 다음, 배운 내용을 활용하여
앱에서 기능을 구현하세요.

* [웹 앱에서 푸시 알림 활성화
](https://codelabs.developers.google.com/codelabs/push-notifications).
* [사용자 홈 화면에 웹 앱
추가](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Chrome Debugger가 서비스 워커 버전을 반환하는지 검사합니다.


{# wf_devsite_translation #}
