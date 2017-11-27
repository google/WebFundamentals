project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'short_name을 포함한 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 짧은 이름을 포함한 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

사용자가 홈 화면에 앱을 추가한 후 `short_name`는
홈 화면에서 앱 아이콘 옆에 표시되는 텍스트로 사용됩니다. 일반적으로
앱의 전체 이름을 표시하기에 공간이 충분하지 않을 때 사용합니다.

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트에 `short_name` 속성을 추가합니다.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Chrome의 [최대 권장
길이](https://developer.chrome.com/apps/manifest/name#short_name)는 12자입니다.


앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

매니페스트에 `short_name` 또는 `name` 속성이 있으면 감사가 통과됩니다.
Lighthouse가 가져오는 매니페스트는 Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.



{# wf_devsite_translation #}
