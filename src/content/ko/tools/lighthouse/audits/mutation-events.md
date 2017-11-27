project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '스크립트에서 변이 이벤트를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 스크립트에서 변이 이벤트를 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

다음 변이 이벤트는 성능을 저해해서 DOM 이벤트 표준에서 지원이 중단되었습니다.


* `DOMAttrModified`
* `DOMAttributeNameChanged`
* `DOMCharacterDataModified`
* `DOMElementNameChanged`
* `DOMNodeInserted`
* `DOMNodeInsertedIntoDocument`
* `DOMNodeRemoved`
* `DOMNodeRemovedFromDocument`
* `DOMSubtreeModified`

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에 코드에서 발견된 각 변이 이벤트 리스너를
보고합니다. 각 변이 이벤트를 `MutationObserver`로 대체하세요.
자세한 내용은 MDN의 [`MutationObserver`][mdn]를 참조하세요.

[mdn]: https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지에 있는 모든 이벤트 리스너를 수집하고
[감사가 중요한
이유](#why)에 나열된 유형의 리스너를 플래그로 표시합니다.


{# wf_devsite_translation #}
