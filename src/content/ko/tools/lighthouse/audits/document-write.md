project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'document.write()를 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# document.write()를 사용하지 않는 사이트 {: .page-title }

## 감사가 중요한 이유 {: #why }

2G, 3G 또는 느린 Wi-Fi와 같이 느린 연결을 사용하는 사용자의 경우
`document.write()`를 통해 동적으로 삽입되는 외부 스크립트로 인해
메인 페이지 콘텐츠 표시 속도가 수십 초 가량 지연될 수 있습니다.

자세한 내용은 [`document.write()`에 대한 개입][blog]을 참조하세요.

[blog]: /web/updates/2016/08/removing-document-write

## 감사를 통과하는 방법 {: #how }

Lighthouse는 `document.write()`에 대한 모든 호출을 보고서에 나열합니다.
이 목록을 검토하고 스크립트를 동적으로 삽입하는 호출이 있는지 살펴봅니다.
스크립트가
[`document.write()`에 대한 개입][blog] 소개에서 제시한 기준을 충족한다면 Chrome은
삽입된 스크립트를 실행하지 않을 것입니다. 이들은 변경하려는 `document.write()`
호출입니다. 가능한 해결 방법은 [해결 방법은?][fix]을 참조하세요. 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthous는 마주치는 모든 `document.write()` 인스턴스를 보고합니다.
Chrome이 `document.write()`에 개입하는 것은
렌더링을 차단하는 동적으로 삽입된 스크립트에만 적용됩니다. 다른 용도로 `document.write()`를 사용하는 것은
허용됩니다.


{# wf_devsite_translation #}
