project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse 감사 항목 "크리티컬 요청 체인"을 위한 참조 문서

{# wf_updated_on: 2017-02-20 #}
{# wf_published_on: 2016-10-06 #}

# 크리티컬 요청 체인 (Critical Request Chains) {: .page-title }

## 왜 이 감사가 중요한가 {: #why }

크리티컬 요청 체인(Critical Request Chains)은 CRP(크리티컬 렌더링 패스, Critical Rendering Path)
최적화 전략에서 따온 컨셉입니다. CRP를 사용하면 어떤 리소스가 로드되고 어떤 순서로 로드되는 지
순서를 정해 브라우저에서 최대한 빨리 페이지를 로딩할 수 있습니다.

더 자세한 사항은 [크리티컬 렌더링 패스(Critical Rendering
Path)](/web/fundamentals/performance/critical-rendering-path/) 문서를 살펴보길 바랍니다.

## 어떻게 이 감사를 통과하는가 {: #how }

이 감사는 "통과"나 "실패"로 구성하지 않습니다.
이 감사가 제공하는 정보는 앱의 페이지 로딩 성능 향상의 기회를 줍니다.

Lighthouse의 Chrome 확장프로그램 버전의 보고서에서는 다음과같은 다이어그램을 생성합니다.

<pre>
Initial navigation
|---lighthouse/ (developers.google.com)
    |---/css (fonts.googleapis.com) - 1058.34ms, 72.80KB
    |---css/devsite-googler-buttons.css (developers.google.com) - 1147.25ms, 70.77KB
    |---jsi18n/ (developers.google.com) - 1155.12ms, 71.20KB
    |---css/devsite-google-blue.css (developers.google.com) - 2034.57ms, 85.83KB
    |---2.2.0/jquery.min.js (ajax.googleapis.com) - 2699.55ms, 99.92KB
    |---contributors/kaycebasques.jpg (developers.google.com) - 2841.54ms, 84.74KB
    |---MC30SXJEli4/photo.jpg (lh3.googleusercontent.com) - 3200.39ms, 73.59KB
</pre>

이 다이어그램은 페이지의 크리티컬 요청 체인을 나타냅니다.
경로 `lighthouse/`부터 `/css`까지는 한 체인입니다.
경로 `lighthouse/`부터 `css/devsite-googler-buttons.css`는 다른 체인입니다. 기타등등.
이 감사의 최상위 점수는 이 체인 수를 나타냅니다.
예를 들어, 위 다이어그램의 "점수"는 7입니다.

또한 다이어그램은 각 리소스를 다운로드하는 데 소요 된 시간과 
각 리소스를 다운로드하는 데 필요한 바이트 수를 세분화합니다.

이 다이어그램을 사용하여 CRP를 향상시킬 수 있습니다.

* 주요 리소스 갯수 최적화: 리소스를 제거하고, 
  다운로드를 연기하고, 비동기로 표기하는 등의 작업을 수행할 수 있습니다.
* 다운로드 시간(왕복 횟수)를 줄이기 위해 주요 바이트 수를 최적화합니다.
* 나머지 주요 리소스가 로드되는 순서 최적화:
  주요한 경로 길이를 줄이려면 가능한 빨리 모든 주요 자산을 다운로드 하십시오.

이런 요인을 최적화하면 페이지 로딩이 빨라집니다.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 네트워크 우선 순위를 렌더링 차단 주요 리소스를 식별하는 프록시로 사용합니다.
Chrome에서 이러한 우선 순위를 정의하는 방법에 대한 자세한 내용은 
[Chrome Resource Priorities and Scheduling](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)을 
참고하세요.

Chrome Debugger Protocol에서 크리티컬 요청 체인, 리소스 크기 및 리소스 다운로드 시간에 대한 데이터가 추출됩니다.