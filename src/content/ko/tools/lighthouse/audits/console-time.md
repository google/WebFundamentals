project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: '스크립트에서 console.time()을 사용하지 않는 사이트' Lighthouse 감사의 참조 문서입니다.

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# 스크립트에서 console.time()을 사용하지 않는 사이트  {: .page-title }

## 감사가 중요한 이유 {: #why }

`console.time()`을 사용하여 페이지 성능을 측정하고 있다면
대신 User Timing API를 사용하세요. 이점은 다음과 같습니다.

* 고해상도 타임스탬프
* 내보낼 수 있는 타이밍 데이터
* Chrome DevTools 타임라인과의 통합. 타임라인 기록 시 User Timing 함수가
`performance.measure()`를 호출하면
아래 스크린샷의 `my custom measurement` 레이블과 같이 DevTools가
타임라인의 결과에 측정을 자동으로 추가합니다.

![Chrome DevTools 타임라인에서 User Timing 측정][timeline]

[timeline]: /web/tools/lighthouse/images/user-timing-measurement-in-devtools.png

## 감사를 통과하는 방법 {: #how }

Lighthouse는 **URLs**에서 찾은 `console.time()`의 모든 인스턴스를
보고서에 나열합니다. 각각의 호출을 `performance.mark()`로 교체합니다.
두 개의 마크 사이에서 경과한 시간을 측정하고 싶다면
`performance.measure()`를 사용하세요.

API 사용 방법에 대한 자세한 내용은 [User Timing API: 웹 앱의 이해][html5rocks]를
참조하세요.

[html5rocks]: https://www.html5rocks.com/en/tutorials/webperformance/usertiming/

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse는 페이지와 같은 호스트에 있는 스크립트에서 찾은 모든 `console.time()` 인스턴스를
보고합니다. Lighthouse는 여러분이 다른 호스트의 스크립트를
통제할 수 없다고 가정하기 때문에
이는 제외합니다. 페이지에 `console.time()`을 사용하는 다른 스크립트가 있더라도
Lighthouse 보고서에는 나타나지 않습니다.


{# wf_devsite_translation #}
