project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '첫 번째 페인트를 지연시키는 리소스를 사용하지 않는 사이트'와 '헤드에서 첫 번째 페인트를 지연시키는 스크립트 태그를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 첫 번째 페인트를 지연시키는 리소스를 사용하지 않는 사이트 {: .page-title }

## 감사가 중요한 이유 {: #why }

페이지 로드가 빠르면 사용자 참여가 높아지고, 페이지 조회가 늘어나며,
전환율이 개선됩니다.

첫 번째 페인트에 필요한 링크와 스크립트를
인라인 처리하고 그렇지 않은 링크와 스크립트는 지연시켜서 페이지 로드 속도를 개선할 수 있습니다.

## 감사를 통과하는 방법 {: #how }

Lighthouse는 렌더링을 차단하는 모든 링크 또는 스크립트를 탐지해서
보고서에 나열합니다. 목표는 이 수치를 낮추는 것입니다.

[감사 구현 방법](#implementation)에서 언급한 바와 같이 Lighthouse는
세 가지 유형의 렌더링 차단 링크(스크립트, 스타일시트, HTML
가져오기)를 플래그로 표시합니다. 최적화 방법은 어떤 리소스를 사용하는지에 따라 달라집니다.

참고: 아래와 같이 리소스를 '주요(critical)'라고 언급할 경우,
이 리소스는 첫 번째 페인트에 필요하거나 페이지의 핵심 기능에
중요합니다.

* 중요한 스크립트는 HTML에 인라인 처리하는 것을 고려해보세요. 중요하지 않은
스크립트의 경우 `async` 또는 `defer` 속성으로 표시하는 방안을 고려해보세요.
  자세한 내용은 [자바스크립트로 상호작용 추가][js]를 참조하세요.
* 스타일시트는 스타일을 여러 개의 파일로 분리하고
미디어 쿼리로 구성한 다음, 각 스타일시트 링크에 `media` 속성을
추가하는 방법을 고려해보세요. 페이지를 로드할 때 브라우저는
첫 번째 페인트만 차단하고 사용자의 기기와 일치하는 스타일시트를 검색합니다. 자세한 내용은 
[렌더링 차단 CSS][css]를 참조하세요.
* 중요하지 않은 HTML 가져오기는 `async` 속성으로 표시합니다. 통상
`async`는 최대한 HTML 가져오기와 함께 사용해야 합니다.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 세 가지 유형의 차단 리소스를 식별합니다.

`<script>` 태그:

* 문서의 `<head>`에 있습니다.
* `defer` 속성이 없습니다.
* `async` 속성이 없습니다.

`<link rel="stylesheet">` 태그:

* `disabled` 속성이 없습니다. 이 속성이 있을 경우에는
브라우저가 스타일시트를 다운로드하지 않습니다.
* 사용자의 기기에 일치하는 `media` 속성이 없습니다.

`<link rel="import">` 태그:

* `async` 속성이 없습니다.


{# wf_devsite_translation #}
