project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 성능 개선은 사용자가 다운로드하는 데이터를 최소화하거나 적어도 최적화하는 것부터 시작합니다. 코드의 효율성을 개선하기 위해서는 브라우저에서 리소스가 어떻게 렌더링되는지를 먼저 이해해야 합니다. 효율성을 개선한 후에는 테스트를 수행해야 합니다. 

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# 성능 {: .page-title }

성능 개선은 사용자가 다운로드하는 데이터를 최소화하거나 적어도 최적화하는 프로세스입니다. 코드의 효율성을 개선하기 위해서는 브라우저에서 리소스가 어떻게 렌더링되는지를 먼저 이해해야 합니다. 효율성을 개선한 후에는 테스트를 수행해야 합니다. 

## 콘텐츠 효율성 최적화

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

최적의 성능을 제공하기 위해서는 사이트의 모든 바이트 하나하나를 최적으로 전달해야 합니다.

[시작하기](optimizing-content-efficiency/)

<div style="clear:both;"></div>

## 주요 렌더링 경로

<img src="images/crp.png" class="attempt-right">

HTML, CSS 및 자바스크립트를 수신하고 처리하여 렌더링된 픽셀로 변환하는 중간 과정에서 어떤 일이 일어나는지 알고 계신가요?

[자세히 알아보기](critical-rendering-path/)

<div style="clear:both;"></div>

## 렌더링 성능

<img src="images/rend.png" class="attempt-right">

성능이 우수한 사이트와 앱을 작성하려면 브라우저가 HTML, 자바스크립트 및 CSS를 처리하는 방법을 이해해야 하며, 작성하는 코드(타사 코드 포함)가 최대한 효율적으로 실행되도록 보장해야 합니다.

[자세히 알아보기](rendering/)

<div style="clear:both;"></div>

## 낮은 대역폭 및 높은 지연 시간 이해

<img src="images/low.png" class="attempt-right">

연결 상태가 나쁘거나 불안정한 경우 앱이나 사이트의 사용 느낌이 어떤지를 파악하여 이에 따라 빌드하는 것이 중요합니다. 다양한 도구가 도움이 될 수 있습니다.

[자세히 알아보기](poor-connectivity/)

<div style="clear:both;"></div>

## PRPL 패턴

<img src="images/prpl.png" class="attempt-right">

PRPL(Push, Render, Pre-cache, Lazy-load)은
 PWA(Progressive Web App)를 구성하고 제공하기 위한 패턴이며,
 앱 전달 및 출시의 성능에 중점을 둡니다.

[자세히 알아보기](prpl-pattern/)

<div style="clear:both;"></div>


## 관련 자료

### 코드랩

[웹 앱 성능 문제를 찾아서 해결](/web/fundamentals/getting-started/codelabs/web-perf/) <br>
이 코드랩은 웹 앱 성능 병목 현상을 찾아서 해결하도록 도와드립니다.

### Chrome DevTools

* [성능을 판단하는 관점](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [런타임 성능](/web/tools/chrome-devtools/rendering-tools/)
* [페이지 로드 성능](/web/tools/chrome-devtools/network-performance/resource-loading)


### Udacity 교육과정

[브라우저 렌더링 최적화](https://www.udacity.com/course/browser-rendering-optimization--ud860)<br>
Google 성능 전문가인 Paul Lewis가 여러분이 버벅거림 현상을 없애고
 초당 60 프레임 성능을 유지하는 웹 앱을 만들도록 도와드립니다.

[주요 렌더링 경로](https://www.udacity.com/course/website-performance-optimization--ud884)<br>
HTML, CSS 및 자바스크립트를 살아있는 라이브 웹사이트로 전환하기 위해
 브라우저가 취해야 하는 단계와 주요 렌더링 경로에 대해 알아보세요.

[HTTP/1 - HTTP/2](https://www.udacity.com/course/client-server-communication--ud897)<br>
Surma는 HTTP/1의 기초부터 시작하여 HTTP/2로 진행하며,
 자산을 효율적으로 로드하는 방법과 이 프로토콜의 보안 측면에 대해서도 다룹니다. 
<div style="clear:both;"></div>




{# wf_devsite_translation #}
