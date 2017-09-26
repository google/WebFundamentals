project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '이름을 포함한 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 이름을 포함한 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

웹 앱 매니페스트의 `name` 속성은 사람이 읽을 수 있는 애플리케이션
이름이며, 사용자 휴대기기에 표시할 목적으로 사용합니다.

`short_name`이 제공되지 않는다면 `name`은
휴대기기의 홈 화면에서 앱 아이콘 옆에 레이블로 사용됩니다.

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트에 `name` 속성을 추가합니다.

    {
      ...
      "name": "Air Horner",
      ...
    }

Chrome의 [최대
길이](https://developer.chrome.com/apps/manifest/name)는 45자입니다.

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 매니페스트를 가져와서 `name` 속성이 있는지 확인합니다.
Lighthouse가 가져오는 매니페스트는 Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.



{# wf_devsite_translation #}
