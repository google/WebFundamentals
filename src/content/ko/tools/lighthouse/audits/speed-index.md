project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'Speed Index' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Speed Index  {: .page-title }

## 감사가 중요한 이유 {: #why }

Speed Index는 페이지 콘텐츠가 얼마나 빠르게
시각적으로 채워지는지 보여주는 페이지 로드 성능 지표입니다. 점수가 낮을수록 좋습니다.

## 감사를 통과하는 방법 {: #how }

Speed Index 점수를 낮추려면 페이지를 최적화하여
시각적으로 빠르게 로드해야 합니다. 다음 두 가지에서부터 시작하면 좋습니다.

* [콘텐츠 효율성 최적화](/web/fundamentals/performance/optimizing-content-efficiency/)
* [주요 렌더링 경로 최적화](/web/fundamentals/performance/critical-rendering-path/)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는
[Speedline](https://github.com/pmdartus/speedline)이라는
노드 모듈을 사용하여 Speed Index 점수를 생성합니다.

Speed Index를 구성하는 알고리즘과 방법론에 대한 자세한 내용은
[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index)를 참조하세요.

목표 점수는 로그 정규 분포의 누적 분포 함수로
계산됩니다. 자세한 내용은 감사의 
[소스](https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/speed-index-metric.js)에서
코멘트를 확인하세요.


{# wf_devsite_translation #}
