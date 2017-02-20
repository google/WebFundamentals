project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse 검사 항목 "콘텐츠 사이즈를 뷰포트에 맞춘다"를 위한 참조 문서

{# wf_updated_on: 2017-02-20 #}
{# wf_published_on: 2016-10-04 #}

# 콘텐츠 사이즈를 뷰포트에 맞춘다  {: .page-title }

## 왜 이 검사가 중요한가 {: #why }

이 검사는 페이지 콘텐츠 너비가 뷰포트 너비와 동일한지 검사합니다.
콘텐츠 너비가 뷰포트 너비보다 작거나 큰 경우 페이지가 모바일 화면 용으로 최적화되어 있지 않은 경우가 종종 있습니다.

## 어떻게 이 검사를 통과하는가 {: #how }

이 검사는 페이지가 모바일 디바이스에 맞게 최적화되어있는지 우회해서 확인하는 방법입니다.
만약 페이지가 최적화되어있지 않고 최적화하길 원한다면, [반응형 웹 디자인 기본](/web/fundamentals/design-and-ui/responsive/)으로 시작하길 바랍니다.

아래와 같은 경우 이 검사를 무시할 수 있습니다.

* 사이트가 모바일 화면에 최적화하지 않아도 되는 경우
* 페이지의 콘텐츠 너비가 의도적으로 뷰포트 너비보다 작거나 큰 경우

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

이 검사는 `window.innerWidth === window.outerWidth`한 경우 통과합니다.
