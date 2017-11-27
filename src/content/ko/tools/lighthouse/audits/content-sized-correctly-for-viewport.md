project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '뷰포트에 맞게 정확히 크기가 조정된 콘텐츠' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# 뷰포트에 맞게 정확히 크기가 조정된 콘텐츠  {: .page-title }

## 감사가 중요한 이유 {: #why }

이 감사는 페이지 콘텐츠의 너비가 뷰포트의 너비와 같은지
검사합니다. 콘텐츠 너비가 뷰포트 너비보다 크거나 작으면
대개 페이지가 모바일 화면에 최적화되지 않은 경우일 수 있습니다.


## 감사를 통과하는 방법 {: #how }

이 감사는 페이지가 휴대기기에 최적화되었는지 확인하는
우회적 방법입니다. 사이트가 최적화되지 않았고 사이트를 최적화하고 싶다면,
[반응형 웹 디자인 기본 사항](/web/fundamentals/design-and-ux/responsive/)을
참조하여 시작하세요.

다음과 같은 경우 이 감사를 무시할 수 있습니다.

* 사이트를 모바일 화면에 최적화할 필요가 없을 경우.
* 페이지의 콘텐츠 너비를 일부러 뷰포트 너비보다 작거나 크게 한 경우.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

`window.innerWidth === window.outerWidth`일 경우 감사를 통과합니다.


{# wf_devsite_translation #}
