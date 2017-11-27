project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'start_url을 포함한 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 시작 URL을 포함한 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

웹 앱을 사용자 홈 화면에 추가한 후 웹 앱 매니페스트의 `start_url`
속성은 사용자가 앱을 홈 화면에서 실행했을 때 처음으로 로드할 앱 페이지를 결정합니다.


`start_url` 속성이 없으면 브라우저는 사용자가 앱을 홈 화면에 추가했을 때
활성화되어 있던 페이지를 기본값으로 지정합니다.

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트에 `start_url` 속성을 추가합니다.

    {
      ...
      "start_url": ".",
      ...
    }

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 매니페스트를 가져와서 `start_url` 속성이 있는지 확인합니다.
Lighthouse가 가져오는 매니페스트는 Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.



{# wf_devsite_translation #}
