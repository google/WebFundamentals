project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '스크롤 성능 개선을 위해 패시브 이벤트 리스너를 사용하는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# 스크롤 성능 개선을 위해 패시브 이벤트 리스너를 사용하는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

터치 및 휠 이벤트 리스너에 `passive` 옵션을 설정하면
스크롤 성능을 개선할 수 있습니다.

개요는 [패시브 이벤트 리스너로 스크롤 성능 개선][blog]을
참조하세요.

심층적 기술 정보는 패시브 이벤트 리스너 사양의 [Explainer][explainer]를 참조하세요.


[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

## 감사를 통과하는 방법 {: #how }

`passive` 플래그를 Lighthouse가 식별한 모든 관련 이벤트 리스너에 추가합니다.
 일반적으로 `preventDefault()`를 호출하지 않는 모든 `wheel`,
`mousewheel`, `touchstart` 및 `touchmove` 이벤트 리스너에
`passive`를 추가합니다.

패시브 이벤트 리스너를 지원하는 브라우저에서 리스너를
`passive`로 표시하면 가장 간단하게 플래그를 지정할 수 있습니다.

    document.addEventListener('touchstart', onTouchStart, {passive: true});

그러나 패시브 이벤트 리스너를 지원하지 않는 브라우저에서는
세 번째 매개변수가 이벤트를 버블할지 캡처할지 표시하는 부울입니다.
위의 구문을 사용하면 의도치 않은 결과를 낳을 수 있습니다.

패시브 이벤트 리스너를 안전하게 구현하는 방법은 [기능 탐지][polyfill]에서 폴리필을 참조하세요.


[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 다음 알고리즘을 사용하여 잠재적 패시브 이벤트 리스너 후보에
플래그를 지정합니다.

1. 페이지에서 모든 이벤트 리스너를 수집합니다.
1. 터치나 휠이 아닌 리스너를 필터링합니다.
1. `preventDefault()`를 호출하는 리스너를 필터링합니다.
1. 페이지의 호스트가 다른 리스너를 필터링합니다.


Lighthouse는 개발자가 다른 호스트의 리스너 스크립트에 대한 통제 권한이 없다고 가정하고
이들을 필터링합니다. 따라서 Lighthouse 감사는
페이지의 전체적 스크롤 성능을 평가하지 못합니다. 페이지 스크롤 성능을 저해하는
다른 스크립트가 있을 수 있으나,
Lighthouse 보고서에는 등록되지 않습니다.


{# wf_devsite_translation #}
