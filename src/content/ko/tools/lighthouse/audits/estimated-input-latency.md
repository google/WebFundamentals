project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '예상된 입력 지연' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# 예상된 입력 지연  {: .page-title }

## 감사가 중요한 이유 {: #why }

입력 반응성은 사용자가 앱의 성능을 인식하는 주요 요소입니다.
 앱은 사용자 입력에 100ms 이내에 반응해야 합니다. 그보다 반응 시간이 길어지면
사용자는 앱이 느리다고 생각합니다. 자세한 내용은 [RAIL
모델로 성능 측정](/web/fundamentals/performance/rail)을 참조하세요.

이 감사 테스트가 목표 점수를 50ms 정한 이유는 이 문서의 [감사 테스트를 하는 이유](#what) 섹션을 참조하세요
(RAIL 모델이 권장하는 시간은
100ms입니다).

## 감사를 통과하는 방법 {: #how }

앱이 사용자 입력에 더욱 빠르게 반응하게 하려면 브라우저에서 코드가 실행되는 방식을 최적화해야 합니다.
 [렌더링 성능](/web/fundamentals/performance/rendering/)
문서에서 간략히 설명된 일련의 기법들을
참조하세요. 계산의 부하를 웹 워커에 분산하여
메인 스레드를 확보하거나, CSS 선택기를 리팩터링하여
계산을 줄이거나, 브라우저에 집중된 작업 수를 최소화하는 CSS 사용에 이르기까지
다양한 팁이 있습니다.

이 감사의 한 가지 중요한 유의 사항은 입력 지연을 완전히 측정하는 방법은
아니라는 것입니다. 이 문서의 [이 문서가 테스트하는 항목](#what) 섹션에서 설명하였듯이
이 감사는 앱이 사용자 입력에 반응하는 데 실제로 걸리는 시간을
측정하지 않습니다. 즉, 앱이 사용자의 입력에 반응하는 동작이
시각적으로 완료될 때까지 측정하지 않습니다.

이 값을 수동으로 측정하려면
Chrome DevTools 타임라인으로 기록하세요. 자세한 도움말은 [타임라인
도구 사용법](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)을
참조하세요. 기본적으로는 기록을 시작하고, 측정하고자 하는 사용자 입력을 실행하고,
기록을 정지한 다음, 플레임 차트를 분석하여
[픽셀
파이프라인](/web/fundamentals/performance/rendering/#the_pixel_pipeline)의 모든 단계가
50ms 이내에 완료되는지 확인하세요.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

RAIL 성능 모델에서는 앱이 사용자 입력에 100ms 이내에 반응하는 것을 권장하지만
Lighthouse의 목표 점수는 50ms입니다. 그 이유는 무엇일까요?

Lighthouse는 프록시 지표를 사용하여 앱이 사용자 입력에 얼마나 잘 반응하는지 측정합니다.
즉, 메인 스레드의 가용성을 측정합니다. Lighthouse는
앱이 사용자 입력에 완전히 반응하려면 50ms가 필요하다고
가정합니다(자바스크립트를 실행하는 것에서 화면에 물리적으로 새 픽셀을 그리는
것까지). 메인 스레드를 50ms 이상 사용할 수 없다면
앱이 반응을 완료할 시간이 부족해집니다.

사용자가 Lighthouse에서 보고하는 정도의 입력 지연 시간을
경험할 확률은 90% 이하입니다. 나머지 10% 사용자는
더 오랜 지연 시간을 경험합니다.


{# wf_devsite_translation #}
