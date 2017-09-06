project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 서비스 워커 라이브러리.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-11-07 #}

# 서비스 워커 라이브러리 {: .page-title }

[서비스 워커](/web/fundamentals/getting-started/primers/service-workers)
라이브러리로 서비스 워커 상용구
코드를 제거하여 개발을 단순화할 수 있습니다.

<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>서비스 워커 라이브러리 개요</figcaption>
</figure>

**sw-precache&mdash;** 빌드 프로세스와 통합하여 정적 자산(예: 애플리케이션 셸)을
사전 캐시하는 서비스 워커를 생성합니다.


**sw-toolbox&mdash;** 공통 런타임 캐싱 패턴(예: 동적 콘텐츠
, API 호출, 타사 리소스)을 README를 작성하는 것처럼 쉽게 구현할 수 있습니다.

**sw-offline-google-analytics&mdash;** 네트워크 단절로 인해 손실되지 않도록
분석 요청을 임시로 멈추었다가 다시 시도합니다.

<div class="clearfix"></div>

## 서비스 워커 라이브러리를 사용하는 이유

웹 앱에 서비스 워커를 추가해서
네트워크의 불확실성을 빠르고 오프라인을 우선하는 서비스 워커 경험으로 바꾸는
장점은 설득력이 있습니다. 그러나 서비스 워커를 처음부터 개발하려면
넘어야 할 장애물이 몇 가지 있습니다.

* URL을 쉽고 안정적으로 사전 캐시해야 합니다. 
* 캐시 버전 문자열을 증분해서 사전 캐시된 리소스를
업데이트해야 합니다.
* 캐시 크기나 항목 기한을 고려한 캐시 만료 전략을
구현해야 합니다.
* 공통 패턴(예: [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi)
 네트워크 제한 시간 및 상용구 코드)을 빌드해야 합니다.
* 오프라인 사용 시 Google 애널리틱스 데이터를 수집하고 보고해야 합니다.


서비스 워커 라이브러리를 사용하면 이 모든 단점을 해결할 수 있습니다.


## Service Worker Precache 

[Service Worker Precache](https://github.com/GoogleChrome/sw-precache/)(`sw-precache`)는
리소스를 사전 캐시하기 위한 서비스 워크를
생성하는 모듈입니다. 이 모듈은
[`gulp`](https://gulpjs.com/)로 작성한 것처럼 자바스크립트 기반 빌드 스크립트에서 사용할 수 있고 
[명령줄 인터페이스](https://github.com/GoogleChrome/sw-precache/#command-line-interface)도 제공합니다. 모듈을 직접 사용하거나,
원한다면 [`webpack`](https://webpack.github.io/)처럼 특정 빌드 환경에 대해 `sw-precache`에서 [래퍼](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)를
사용할 수 있습니다.


[`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
라이브러리와 [함께](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md) 사용할 수도 있습니다. [앱 셸 + 동적 콘텐츠 모델](/web/fundamentals/architecture/app-shell)을 따를 때 잘 작동합니다.

전체 문서는 [Readme](https://github.com/GoogleChrome/sw-precache/blob/master/README.md)에
있으며, [시작 가이드](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md)는
신속히 건너뛰면서 요점을 파악할 수 있습니다.

[sw-precache 가져오기](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### 기능

| 기능 | 요약 |
|---------|---------|
| 앱 셸 사전 캐시 | 웹 앱의 셸(핵심 HTML, 자바스크립트 및 CSS)은 사용자가 페이지를 방문할 때 사전 캐시될 수 있습니다. |
| 빌드 시간 통합 | 기존 빌드 프로세스에 포함됩니다([Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js) 또는 [명령줄](https://github.com/GoogleChrome/sw-precache#command-line-interface)). |
| 최신 상태 유지 | 빌드가 변경되면 서비스 워커 스크립트가 업데이트됩니다. 사용자는 업데이트를 받지만, 개발자가 수동으로 콘텐츠나 캐시의 버전을 관리할 필요가 없습니다. |
| 네트워크 없이 작동 | 정적 리소스는 네트워크 연결 상태와 관계없이 [캐시 우선](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)으로 빠르게 처리됩니다. |

## Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/)(`sw-toolbox`)는
서비스 워커를 직접 만드는 데 사용할 수 있는 몇 가지 간단한 도우미를 제공합니다. 특히,
런타임 전략 요청에 사용할 수 있는 공통 캐싱 패턴과 
[표현 접근방식](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)을
제공합니다. 

[sw-toolbox 가져오기](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### 기능

| 기능 | 요약 |
|---------|---------|
| 런타임 캐싱 | 런타임 시 이미지 등의 용량이 크거나 자주 사용하지 않는 리소스가 먼저 사용될 경우 캐시합니다. |
| 오프라인 대체 | 온라인일 때 새로운 이미지, API 응답 또는 다른 콘텐츠를 로드하지만, 오프라인일 때는 캐시된 자리표시자로 돌아갑니다. |
| 불안한 네트워크와 작별 | 네트워크가 너무 느리면 자동으로 캐시된 응답으로 돌아가서 [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0)에 대응합니다. |
| 캐시 팽창 방지 | 지난 달에 보았던 이미지를 영원히 캐시할 필요가 없습니다. 최소-최근 사용 및 수명 기반 캐시 만료 기능은 공간을 확보하는 데 도움이 됩니다.|

## Offline Google Analytics

[Offline Google Analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics)는
네트워크가 끊어지면서 손실되지 않도록 임시로 분석 요청을 보류했다가
다시 시도합니다. 이 도구는 npm을 사용하여 빌드 시스템에 쉽게 설치하고
서비스 워커 스크립트로 쉽게 가져올 수 있습니다. 매개변수화된 함수 호출을 사용하여
구성합니다.

[sw-offline-google-analytics 가져오기](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### 기능

| 기능 | 요약 |
|---------|---------|
| Offline Google Analytics | Google 애널리틱스 자바스크립트를 오프라인으로 제공하는 페치 핸들러를 재생합니다. |
| 임시 데이터 캐시 | 기기가 오프라인일 때 분석 요청을 보류했다가 다음에 서비스 워커가 시작되면 다시 시도합니다. |
| 사용자설정 재생 값 | 재생된 Google 애널리틱스 요청에 키/값 쌍을 추가합니다. 예를 들어 요청이 재생되었음을 나타내는 사용자설정 차원을 설정할 수 있습니다. |
| 수정된 히트 매개변수 | 히트 매개변수를 자동으로 수정할 수 있습니다. 예를 들어, 히트를 시도한 시간과 히트를 재생한 시간 사이의 경과 시간을 추적합니다. |

## 자세히 알아보기

### 문서

Dean Hume의 [sw-toolbox 시작하기](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134)

Jeffrey Posnick의 [오프라인 지원을 추가하여 sw-precache로 반응 앱 생성](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm)

[프로덕션에서 서비스 워커](/web/showcase/case-study/service-workers-iowa)
사용 사례 연구에서 `sw-precache`와 `sw-toolbox`
라이브러리를 함께 사용하여 
[Google I/O 2015 웹 앱](https://events.google.com/io2015/)을 구동하는 방법을 자세히 살펴봅니다.

### 코드랩

[sw-precache로 서비스 워커 추가](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### 동영상

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Jeff Posnick가 Chrome Dev Summit 2015에서 발표한
_서비스 워커로 인스턴트 로딩_ 은
`sw-precache`와 `sw-toolbox`를 함께 효과적으로 사용하여 빠르게 로드되고 오프라인에서 작동하는
웹 앱을 만드는 방법을 설명합니다.

[슬라이드](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt와 Addy Osmani는 서비스 워커 라이브러리가
웹 앱이 즉시 오프라인에서 작동하도록 돕는 방법을 설명합니다. 동영상에서는
`sw-precache`와 `sw-toolbox`를 모두 설명합니다.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Totally Tooling Mini-Tips 에피소드에서는 Matt와 Addy가
`sw-toolbox`를 단계별로 설명합니다.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Mat Scales는 Google I/O 2016에서 빠르게 로드되고, 오프라인에서 잘 작동하며 점진적으로 개선되고 최종적으로는 사용자 환경을 개선하는 Progressive Web App을 만들기 위한
유용한 라이브러리를
소개합니다.


{# wf_devsite_translation #}
