project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 성능을 향상시키는 과정은 사용자가 다운받은 데이터의 최적화 또는 압축으로 시작됩니다. 브라우저가 어떻게 그 해당 리소스들을 화면에 렌더하는지를 이해하는 것은 코드 효율성을 향상시키기 위한 필요조건이기도 합니다. 성능 향상 후에는 이를 테스트하는 방법이 필요합니다.

{# wf_updated_on: 2016-09-09 #}
{# wf_published_on: 2015-09-08 #}

# 성능 {: .page-title }

성능을 향상시키는 과정은 사용자가 다운로드한 데이터를 최적화 또는 압축부터 시작됩니다. 브라우저가 어떻게 그 해당 리소스들을 화면에 렌더하는지를 이해하는 것은 코드 효율성을 향상시키기 위한 필요조건이기도 합니다. 성능 향상 후에는 이를 테스트하는 방법이 필요합니다.

## 콘텐츠 효율 최적화

<img src="images/oce.png" class="attempt-right" style="max-height: 200px;">

최고의 성능을 내기 위해서는 웹 사이트의 모든 바이트 전송을 최적화해야 합니다.

[시작하기](optimizing-content-efficiency/)

<div style="clear:both;"></div>

## 크리티컬 렌더링 패스

<img src="images/crp.png" class="attempt-right">

HTML, CSS, Javascript 를 다운받고 화면 픽셀로 변환하는 중간에 일어나는 과정들을 이해하고 있으신가요?

[더 알아보기](critical-rendering-path/)

<div style="clear:both;"></div>

## 렌더링 성능

<img src="images/rend.png" class="attempt-right">

고 성능의 사이트와 앱을 제작하기 위해서는 브라우저에서 HTML, Javascript, CSS 를 어떻게 처리하는지 이해해야 합니다. 그리고 당신이 쓴 코드가 (외부 라이브러리 포함) 최대한 효율적으로 동작해야 합니다.

[더 알아보기](rendering/)

<div style="clear:both;"></div>

## 낮은 대역폭과 높은 지연시간

<img src="images/low.png" class="attempt-right">

인터넷 연결 상태가 안 좋거나 속도가 낮을 때 당신의 앱이나 사이트가 사용성 측면에서 어떤 느낌을 주는지 아는 것도 중요합니다. 이를 진단하는데 여러 툴이 있습니다.

[더 알아보기](poor-connectivity/)

<div style="clear:both;"></div>

## PRPL 패턴

<img src="images/prpl.png" class="attempt-right">

PRPL (push, render, pre-cache and lazy-load) 는 프로그레시브 웹을 구조화하고 서비스하기 위한 패턴입니다. 특히 이 패턴은 앱 전달과 시작에서의 성능을 강조합니다.

[더 알아보기](prpl-pattern/)

<div style="clear:both;"></div>


## 관련 리소스들

### 코드랩

[웹 앱의 성능 문제를 찾고 기치기](/web/fundamentals/getting-started/codelabs/web-perf/) <br>
이 코드랩에서는 웹 어플리케이션의 성능과 병목 현상을 진단하고 고치는 방법을 익힙니다.

### 크롬 개발자 도구

* [성능을 확인하는 방법](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [런타임 성능](/web/tools/chrome-devtools/rendering-tools/)
* [페이지 로딩 성능](/web/tools/chrome-devtools/network-performance/resource-loading)


### 유다시티 강의

[브라우저 렌더링 최적화](https://udacity.com/ud860)<br>
구글의 성능 대가인 Paul Lewis 가 jank 를 제거하는 방법과 초당 60 프레임의 성능을 자랑하는 웹 앱을 제작하는 방법을 가르쳐줍니다.
Google performance guru Paul Lewis is here to help you destroy jank and create
web apps that maintain 60 frames per second performance.

[크리티컬 렌더링 패스](https://udacity.com/ud884)<br>
크리티컬 렌더링 패스에 대해서 배워보세요. 또한, 브라우저가 HTML, CSS, Javascript 를 생기있고 활기 가득한 웹 사이트로 변환하기 위한 절차들을 배웁니다.

[HTTP/1 에서 HTTP/2 까지](https://udacity.com/ud897)<br>
Surma 가 HTTP/1 기본부터 HTTP/2 까지 모두 알려줄 겁니다. 어떻게 자원을 효율적으로 로딩하고, 해당 프로토콜들의 보안 측면은 어떻게 신경 써야 하는지에 대해서 다룹니다.
<div style="clear:both;"></div>
