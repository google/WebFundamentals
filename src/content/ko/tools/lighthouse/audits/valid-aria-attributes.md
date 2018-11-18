project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse 검사 항목 "요소의 ARIA 속성은 유효해야 한다"를 위한 참조 문서

{# wf_updated_on: 2017-02-20 #}
{# wf_published_on: 2017-01-18 #}

# 요소의 ARIA 속성은 유효해야 한다 {: .page-title }

## 왜 이 검사가 중요한가 {: #why }

맞춤법이 틀렸거나 존재하지 않는 ARIA 속성으로 인해 스크린 리더가 위젯의 현재 상태를
제대로 이해하지 못할 수 있습니다. 이로 인해 스크린 리더에 의존하는 사용자가
페이지를 사용하지 못할 수 있습니다.

## 어떻게 이 검사를 통과하는가 {: #how }

<<_shared/query.md>>

리스트의 각 요소에서 잘못된 속성명을 찾으려면 다음을 수행하세요:

1. 요소의 `role` 및 `aria-*` 속성을 확인하세요.

1. [Definition of Roles][roles]로 이동하세요.

1. 이 요소의 `role` 페이지로 이동하세요.

1. **Required States and Properties**나 **Supported States and Properties** 목록에서
  요소의 `aria-*` 속성을 다시한번 체크하세요.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[roles]: https://www.w3.org/TR/wai-aria/roles#role_definitions

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

이 검사는 aXe 접근성 엔진에 의해 검사합니다.
더 자세한 정보는 [Elements must only use allowed ARIA attributes][axe]를 참고하세요.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-valid-attr
