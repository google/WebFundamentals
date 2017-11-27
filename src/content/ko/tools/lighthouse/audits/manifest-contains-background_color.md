project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'background_color를 포함한 매니페스트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 배경색을 포함한 매니페스트  {: .page-title }

## 감사가 중요한 이유 {: #why }

웹 앱이 사용자 홈 화면에서 로드될 때 브라우저는
`background_color` 속성을 사용하여 앱이 로드되는 동안 브라우저의 배경색을
그립니다. 따라서 앱을 실행하고부터 앱 콘텐츠를 로드할 때까지
원활하게 전환됩니다.

## 감사를 통과하는 방법 {: #how }

웹 앱 매니페스트에 `background_color` 속성을 추가합니다. 이 값은 유효한
CSS 색상이라면 무엇이든 가능합니다.

    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

매니페스트에 `background_color` 속성이 있으면 감사가 통과됩니다.
Lighthouse가 가져오는 매니페스트는 Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.
 Lighthouse는
이 값이 유효한 CSS 색상인지는 검증하지 않습니다.


{# wf_devsite_translation #}
