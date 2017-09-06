project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '이전 CSS Flexbox를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# 이전 CSS Flexbox를 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

Flexbox의 오래된 2009년 사양은 지원이 중단되었고 최신 사양보다 2.3배
속도가 느립니다. 자세한 내용은 [Flexbox 레이아웃은 느리지 않습니다][slow]를
참조하세요.

[slow]: https://developers.google.com/web/updates/2013/10/Flexbox-layout-isn-t-slow

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에 페이지의 스타일시트에서 찾은 모든 `display: box` 인스턴스를
목록으로 표시합니다. 모든 인스턴스를 새로운 구문
`display: flex`로 교체하세요.

스타일시트가 `display: box`를 사용하고 있다면 다른 지원 중단된
Flexbox 속성을 사용하고 있을 수 있습니다. 즉, `box`로 시작하는 모든 속성(
예: `box-flex`)은 지원이 중단되었으므로 교체해야 합니다. 오래된 속성이 새로운 속성으로 매핑되는 정확한 방식에 대한 자세한 내용은 
[CSS Flexbox 2009/2011 사양 구문 속성 매핑][map]을 참조하세요.


[map]: https://wiki.csswg.org/spec/flexbox-2009-2011-spec-property-mapping

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지에서 사용된 모든 스타일시트를 수집하고
`display: box`를 사용하는지 검사합니다. Lighthouse는 스타일시트가 지원 중단된 다른 속성을 사용하는지는
검사하지 않습니다.


{# wf_devsite_translation #}
