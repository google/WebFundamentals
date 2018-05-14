project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '스크립트에서 Date.now()를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 스크립트에서 Date.now()를 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

`Date.now()`로 시간을 측정하고 있다면 대신
`performance.now()` 사용을 고려하세요. `performance.now()`는 타임스탬프 해상도가 높고
수정되거나 수동으로 왜곡할 수 있는 시스템 시계와 관계없이 항상 일정한 속도로 증가합니다.


## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에서 찾은 `Date.now()`의 모든 인스턴스를
보고서에 나열합니다. 각각의 호출을 `performance.now()`로 교체합니다.

API에 대한 자세한 내용은 [`performance.now()`][MDN]를 참조하세요.

[MDN]: https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지와 같은 호스트에 있는 스크립트에서 찾은 모든 `Date.now()` 인스턴스를
보고합니다. Lighthouse는 여러분이 다른 호스트의 스크립트를
통제할 수 없다고 가정하기 때문에
이는 제외합니다. 페이지에 `Date.now()`를 사용하는 다른 스크립트가 있더라도
Lighthouse 보고서에는 나타나지 않습니다.


{# wf_devsite_translation #}
