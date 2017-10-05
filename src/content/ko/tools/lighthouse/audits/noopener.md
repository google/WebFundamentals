project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'rel="noopener"을 사용하여 외부 앵커를 여는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# rel="noopener"을 사용하여 외부 앵커를 여는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

페이지가 `target="_blank"`를 사용하여 다른 페이지에 링크되었을 때 새 페이지는
원래의 페이지와 같은 프로세스에서 실행됩니다. 새로운 페이지가 부담이 큰
자바스크립트를 실행한다면 페이지 성능이 저하될 수 있습니다.

게다가 `target="_blank"`는 보안에 취약합니다. 새 페이지는
`window.opener`를 통해 window 객체에 액세스하고, `window.opener.location = newURL`를 사용하여
원래의 페이지를 다른 URL로 이동시킬 수 있습니다.

자세한 내용은 [rel=noopener의 성능 이점][jake]을 참조하세요.

[jake]: https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/

## 감사를 통과하는 방법 {: #how }

Lighthouse가 보고서에서 식별한 각각의 링크에 `rel="noopener"`를
추가합니다. 일반적으로 새 창이나 탭에서 외부 링크를 열 때는 언제나 `rel="noopener"`를
추가합니다.

    <a href="https://examplepetstore.com" target="_blank" rel="noopener">...</a>

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 다음 알고리즘을 사용하여 링크에 `rel="noopener"`
후보 플래그를 표시합니다.

1. `target="_blank"` 속성이 포함되어 있고
`rel="noopener"` 속성은 포함하지 않은 모든 `<a>` 노드를 수집합니다.
1. 동일한 호스트 링크는 걸러냅니다.

Lighthouse는 동일한 호스트 링크를 필터링하기 때문에
대규모 사이트 작업을 하는 경우 돌발 상황에 대해 알아두어야 합니다. 페이지가
`rel="noopener"`를 사용하지 않고 사이트의 다른 섹션을 열더라도
이 감사의 성능 평가가 계속 적용됩니다. 그러나 Lighthouse 결과에는
이 링크가 나타나지 않습니다.


{# wf_devsite_translation #}
