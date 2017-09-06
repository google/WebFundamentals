project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 'User Timing 마크 및 측정' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# User Timing 마크 및 측정  {: .page-title }

## 감사가 중요한 이유 {: #why }

User Timing API를 사용하면 앱의 자바스크립트 성능을 측정할 수 있습니다.
기본적으로 스크립트에서 어느 부분을 최적화할지 결정한 다음,
User Timing API로 해당 스크립트를 계측합니다.
 여기서 API를 사용하여 자바스크립트 결과에 액세스하거나
[Chrome DevTools 타임라인
기록](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)에서 확인할 수 있습니다.

## 감사를 통과하는 방법 {: #how }

이 감사는 '통과' 또는 '실패' 테스트로 구성되지 않았습니다. 앱의 성능을 측정하는 데 도움이 되는
유용한 API를 발견할 기회입니다.
 이 감사에서 Lighthouse가 보고하는 점수는
앱에서 발견한 User Timing 마크 및 측정 횟수와 같습니다.

앱에 User Timing 마크 및 측정이 포함되어 있으면
Lighthouse 보고서에서 이들을 확인할 수 있습니다.

User Timing API를 사용하여 앱의 자바스크립트 성능을 측정하는 방법에 대한 안내는 [User Timing API](https://www.html5rocks.com/en/tutorials/webperformance/usertiming/)를
참조하세요.


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 Chrome의 추적 이벤트 프로파일링 도구에서 User Timing 데이터를 추출합니다.


{# wf_devsite_translation #}
