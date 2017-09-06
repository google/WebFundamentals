project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'theme_color를 포함한 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 테마 색상을 포함한 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

사용자가 Android용 Chrome에 액세스하면 웹 앱 매니페스트의 `theme_color` 속성이
주소 표시줄의 색을 결정합니다. 사용자가 앱을 홈 화면에
추가하지 않더라도 작동합니다.

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트에 `theme_color` 속성을 추가합니다. 이 값은 유효한
CSS 색상이라면 무엇이든 가능합니다.

    {
      ...
      "theme_color": "cornflowerblue",
      ...
    }

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

매니페스트에 `theme_color` 속성이 있으면 감사가 통과됩니다.
Lighthouse가 가져오는 매니페스트는 Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.
 Lighthouse는
이 값이 유효한 CSS 색상인지는 검증하지 않습니다.


{# wf_devsite_translation #}
