project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse 검사 항목 "역할을 위해 요소에 ARIA 속성을 허용합니다"를 위한 참조 문서

{# wf_updated_on: 2017-02-20 #}
{# wf_published_on: 2017-01-13 #}

# 역할을 위해 요소에 ARIA 속성을 허용합니다.  {: .page-title }

## 왜 이 검사가 중요한가 {: #why }

잘못된 role-속성 조합은 페이지의 접근성을 불가하게 할 수 있습니다.

## 어떻게 이 검사를 통과하는가{: #how }

<<_shared/query.md>>

각 요소의 잘못된 조합(들)을 찾으려면 다음을 수행하세요:

1. 요소의 `role` 및 `aria-*` 속성을 확인하세요.

1. [Definition of Roles][roles]로 이동하세요.

1. 이 요소의 `role` 페이지로 이동하세요.

1. **Required States and Properties**나 **Supported States and Properties** 목록에서
  요소의 `aria-*` 속성을 다시한번 체크하세요. 이 두 목록 중 하나에없는 속성은 유효하지 않습니다.

유효하지 않은 조합을 수정하려면 요소에서 유효하지 않은 속성을 
제거하거나 요소의 역할을 속성이 지원하는 것으로 변경하십시오.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[roles]: https://www.w3.org/TR/wai-aria/roles#role_definitions

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

이 검사는 aXe 접근성 엔진에 의해 검사합니다.
더 자세한 정보는 [Elements must only use allowed ARIA attributes][axe]를 참고하세요.

[axe]: https://dequeuniversity.com/rules/axe/1.1/aria-allowed-attr
