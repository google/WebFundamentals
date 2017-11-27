project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '첫 번째 의미 있는 페인트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# 첫 번째 의미 있는 페인트 {: .page-title }

## 감사가 중요한 이유 {: #why }

페이지 로드는 사용자가 페이지의 성능을 이해하는 중요한 요소입니다.
 자세한 내용은 [RAIL 메서드로 성능 측정](/web/fundamentals/performance/rail)을 참조하세요.

이 감사는 사용자가 페이지의 기본 콘텐츠가 보인다고 느끼는 시간을
알아냅니다.

## 감사를 통과하는 방법 {: #how }

첫 번째 의미 있는 페인트 점수가 낮을수록 페이지가 기본 콘텐츠를 표시하는 시간이
빠른 것입니다.

[주요 렌더링 경로 최적화](/web/fundamentals/performance/critical-rendering-path/)는
첫 번째 의미 있는 페인트 속도를 높이는 데 특히 유용합니다.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

기본적으로, 첫 번째 의미 있는 페인트는
가장 큰 상단부 레이아웃 변경이 발생하고 웹 글꼴이 로드된 다음에 발생하는 페인트입니다. 자세한 내용은
[첫 번째 의미 있는 페인트:
 레이아웃 기반 접근법](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)을 참조하세요.


{# wf_devsite_translation #}
