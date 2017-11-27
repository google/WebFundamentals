project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '주요 요청 체인' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-10-06 #}
{# wf_published_on: 2016-10-06 #}

# 주요 요청 체인  {: .page-title }

## 감사가 중요한 이유 {: #why }

주요 요청 체인은 주요 렌더링 경로(CRP)
최적화 전략에서 나온 개념입니다. CRP는 로드할 리소스의 우선순위와 로드 순서를 정해서
브라우저가 최대한 빨리 페이지를 로드할 수 있게 해줍니다.


자세한 내용은 [주요
렌더링 경로](/web/fundamentals/performance/critical-rendering-path/) 문서를
참조하세요.

## 감사를 통과하는 방법 {: #how }

현재 이 감사는 '통과' 또는 '실패'로 구성되어 있지 않습니다. 이 감사가 제공하는 정보는
앱의 페이지 로드 성능을 개선할 수 있는
기회로 활용할 수 있습니다.

Lighthouse의 Chrome 확장 프로그램 버전은 보고서에서 다음과 같은
다이어그램을 생성합니다.

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

이 다이어그램은 페이지의 주요 요청 체인을 나타냅니다. 
`lighthouse/`에서 `/css`까지의 경로는 하나의 체인입니다. `lighthouse/`에서
`css/devsite-googler-buttons.css`까지의 경로는 다른 체인입니다. 이런 식으로 계속됩니다. 이 감사에서 가장 위에 있는 점수는
체인 개수를 나타냅니다. 예를 들어 위의 다이어그램의
'점수'는 7입니다.

또한, 이 다이어그램은 각 리소스를 다운로드하는 데 사용한 시간과
각 리소스 다운로드에 필요한 바이트 수를 분석합니다.

이 다이어그램을 사용하여 다음과 같이 CRP를 개선할 수 있습니다.

* 주요 리소스 개수 최소화: 리소스 제거,
다운로드 지연, 비동기로 표시 등.
* 주요 바이트 수를 최적화하여 다운로드 시간 절약(
왕복 횟수).
* 남은 주요 리소스를 로드하는 순서 최적화:
최대한 빨리 모든 주요 자산을 다운로드하여 주요 경로 길이 단축.


위 요소를 최적화하면 페이지 로드가 개선됩니다.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 네트워크 우선순위를 프록시로 사용하여 렌더링을 차단하는 주요 리소스를
식별합니다. Chrome이 우선순위를 정의하는 방법에 대한 자세한 정보는 [Chrome 리소스 우선순위 및
예약](https://docs.google.com/document/d/1bCDuq9H1ih9iNjgzyAL0gpwNFiEP4TZS-YLRp_RuMlc)을
참조하세요.

주요 요청 체인, 리소스 크기, 다운로드 시간에 대한 데이터는
Chrome Debugger Protocol에서 추출됩니다.


{# wf_devsite_translation #}
