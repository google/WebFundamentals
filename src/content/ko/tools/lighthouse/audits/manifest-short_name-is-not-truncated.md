project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '홈 화면에 표시되었을 때 매니페스트의 short_name이 잘리지 않음' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 홈 화면에 표시되었을 때 매니페스트의 짧은 이름이 잘리지 않음 {: .page-title }

## 감사가 중요한 이유 {: #why }

사용자가 홈 화면에 웹 앱을 추가하면 `short_name` 속성은
앱 아이콘 옆에 레이블로 표시됩니다. `short_name`이
12자보다 길면 홈 화면에 잘려서 표시됩니다.

`short_name`이 없으면 Chrome은
`name` 속성으로 돌아갑니다(길이가 짧을 경우).

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트의 `short_name` 속성을 12자 미만으로 설정합니다.

    {
      ...
      "short_name": "Air Horner",
      ...
    }

또는 매니페스트에서 `short_name` 속성을 지정하지 않은 경우
`name` 속성을 12자 미만으로 설정합니다.

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse가 매니페스트를 가져와서 `short_name` 속성이
12자 미만인지 확인합니다. `name` 속성은
`short_name` 대신 사용할 수 있기 때문에 Lighthouse는 이 속성도 대체용으로 검사합니다.
매니페스트에 `short_name`을 포함하지 않았지만 `name`이
12자 미만이라면 감사가 통과됩니다. Lighthouse가 가져오는 매니페스트는
Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.



{# wf_devsite_translation #}
