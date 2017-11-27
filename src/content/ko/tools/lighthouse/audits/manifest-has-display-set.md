project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '매니페스트의 display 속성 설정' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-09-21 #}

# 매니페스트의 display 속성 설정  {: .page-title }

## 감사가 중요한 이유 {: #why }

앱을 홈 화면에서 실행하면 웹 앱 매니페스트의 `display`
속성을 사용하여 앱의 디스플레이 모드를 지정할 수 있습니다.

## 감사를 통과하는 방법 {: #how }

`display` 속성을 웹 앱 매니페스트에 추가하고
`fullscreen`, `standalone`, `browser` 값 중 하나로 설정합니다.

    {
      ...
      "display": "fullscreen",
      ...
    }

각 값에 대한 자세한 내용은 [MDN의 display 속성
참조](https://developer.mozilla.org/en-US/docs/Web/Manifest#display)를
참조하세요.

앱에서 'Add to Homescreen'을 적절히 구현하고 테스트하는 방법을 안내하는 가이드 목록은 [매니페스트의 존재](manifest-exists#how)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 매니페스트를 가져와서 `display` 속성이
있는지, 값이 `fullscreen`, `standalone`, `browser` 중 하나인지 확인합니다.

Lighthouse가 가져오는 매니페스트는
Chrome이 페이지에서 사용하는 것과 별개로, 부정확한 결과가 나올 수 있습니다.


{# wf_devsite_translation #}
