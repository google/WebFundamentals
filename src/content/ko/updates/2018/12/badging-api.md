project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: 'Badging API는 설치된 웹 앱이 응용 프로그램과 관련된 운영 체제 별 위치 (예 : 선반 또는 홈 화면)에 표시되는
  응용 프로그램 전체 배지를 설정할 수있는 새로운 웹 플랫폼 API입니다.'

{# wf_published_on: 2018-12-11 #} {# wf_updated_on: 2019-08-21 #} {# wf_featured_image: /web/updates/images/generic/notifications.png #} {# wf_tags: capabilities,badging,install,progressive-web-apps,serviceworker,notifications,origintrials #} {# wf_featured_snippet: The Badging API is a new web platform API that allows installed web apps to set an application-wide badge, shown in an operating-system-specific place associated with the application, such as the shelf or home screen. Badging makes it easy to subtly notify the user that there is some new activity that might require their attention, or it can be used to indicate a small amount of information, such as an unread count. #} {# wf_blink_components: UI>Browser>WebAppInstalls #}

{# When updating this post, don't forget to update /updates/capabilities.md #}

# 앱 아이콘에 대한 배지 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<aside class="caution">우리는 현재 새로운 <a href="/web/updates/capabilities">기능 프로젝트의</a> 일환으로이 API를 <a href="/web/updates/capabilities">개발</a> 하고 있으며 Chrome 73부터 시작하여 <a href="#ot"><b>시험</b></a> 사용이 가능합니다. 이 게시물은 Badging API가 발전함에 따라 업데이트됩니다. <br> <b>최종 업데이트 :</b> 2019 년 8 월 21 일</aside>

## Badging API 란 무엇입니까? {: #what }

<figure class="attempt-right">
  <img src="/web/updates/images/2018/12/badges-on-windows.jpg">
  <figcaption>8 개의 알림이있는 Twitter 및 플래그 유형 배지를 표시하는 다른 앱의 예</figcaption>
</figure>

Badging API는 설치된 웹 앱이 응용 프로그램과 관련된 운영 체제 별 위치 (예 : 선반 또는 홈 화면)에 표시되는 응용 프로그램 전체 배지를 설정할 수있는 새로운 웹 플랫폼 API입니다.

배팅은주의가 필요할 수있는 새로운 활동이 있거나 읽지 않은 수와 같은 소량의 정보를 나타내는 데 사용될 수 있음을 사용자에게 미묘하게 알리는 데 도움이됩니다.

배지는 알림보다 사용자 친화적 인 경향이 있으며 사용자를 방해하지 않기 때문에 훨씬 더 높은 빈도로 업데이트 할 수 있습니다. 또한 사용자를 방해하지 않기 때문에 특별한 권한이 필요하지 않습니다.

[설명자](https://github.com/WICG/badging/blob/master/explainer.md) {: .button .button-primary } [읽기](https://github.com/WICG/badging/blob/master/explainer.md)

<div class="clearfix"></div>

### Badging API {: #use-cases }의 권장 사용 사례

이 API를 사용할 수있는 사이트의 예는 다음과 같습니다.

- 채팅, 이메일 및 소셜 앱으로 새 메시지가 도착했음을 알리거나 읽지 않은 항목 수를 표시합니다.
- 이미지 또는 비디오 렌더링과 같은 장기 실행 백그라운드 작업이 완료되었음을 알리는 생산성 앱.
- 게임, 플레이어 행동이 필요함을 알리기 위해 (예 : 체스에서 플레이어의 차례 일 때).

## 현재 상태 {: #status }

단계 | 지위
--- | ---
1. 설명자를 작성하십시오 | [완전한](https://github.com/WICG/badging/blob/master/explainer.md)
2. 초기 사양 초안 작성 | [완전한](https://wicg.github.io/badging/)
**3. 피드백 수집 및 디자인 반복** | [**진행중**](#feedback)
**4. 원산지 시험** | [**진행중**](#ot)
5. 발사 | 시작되지 않음

### 실제로보기

1. Windows 또는 Mac에서 Chrome 73 이상을 사용하여 [Badging API 데모를](https://badging-api.glitch.me/) 엽니 다.
2. 메시지가 표시되면 **설치** 를 클릭하여 앱을 설치하거나 Chrome 메뉴를 사용하여 앱을 설치 한 다음 설치된 PWA로 엽니 다. 설치된 PWA (작업 표시 줄 또는 도크)로 실행 중이어야합니다.
3. 앱 아이콘에서 배지를 설정하거나 지우려면 **설정** 또는 **지우기** 버튼을 클릭하십시오. *배지 값에* 숫자를 제공 할 수도 있습니다.

참고 : *Chrome* 의 Badging API *에는* 실제로 배지를 지정할 수있는 아이콘이있는 설치된 앱이 필요하지만 설치 상태에 따라 Badging API를 호출하지 않는 것이 좋습니다. Badging API는 브라우저가 배지를 표시하려는 *모든 위치에* 적용될 수 있으므로 개발자는 브라우저가 배지를 작동시키는 상황에 대해 어떤 가정도하지 않아야합니다. API가 존재하면 호출하십시오. 작동하면 작동합니다. 그렇지 않으면 단순히 그렇지 않습니다.

## Badging API {: #use }를 사용하는 방법

Chrome 73부터는 Badging API가 Windows (7+) 및 macOS의 기본 평가판으로 제공됩니다. [오리진 평가판을](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/README.md) 사용하면 새로운 기능을 시험 해보고 유용성, 실용성 및 효율성과 웹 표준 커뮤니티에 대한 피드백을 제공 할 수 있습니다. 자세한 내용 [은 웹 개발자를위한 Origin Trials Guide를](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md) 참조하십시오.

### 플랫폼 간 배지 지원

Badging API는 Windows 및 macOS에서 (원본 시험판에서) 지원됩니다. Android는 알림을 표시해야하기 때문에 지원되지 않지만 나중에 변경 될 수 있습니다. Chrome OS 지원은 플랫폼에서 배팅 구현을 보류 중입니다.

### 오리진 평가판 {: #ot }에 등록

1. 오리진에 [대한 토큰](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481) 을 [요청](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481) 하십시오.
2. 귀하의 페이지에 토큰을 추가하십시오. 귀하의 원본 페이지에이 토큰을 제공하는 두 가지 방법이 있습니다 : 
    -  모든 페이지의 헤드에 `origin-trial` `<meta>` 태그를 추가하십시오. 예를 들어, 다음과 같이 보일 수 있습니다. `<meta http-equiv="origin-trial" content="TOKEN_GOES_HERE">` 
    -  서버를 구성 할 수있는 경우 `Origin-Trial` HTTP 헤더를 사용하여 페이지에 토큰을 제공 할 수도 있습니다. 결과 응답 헤더는 다음과 같아야합니다. `Origin-Trial: TOKEN_GOES_HERE` 

### 원산지 시험의 대안

오리진 시험없이 Badging API를 로컬 `#enable-experimental-web-platform-features` 하려면 `chrome://flags` 에서 `#enable-experimental-web-platform-features` 플래그를 사용하도록 설정하십시오.

### 오리진 평가 기간 동안 Badging API 사용

Dogfood : 오리진 시험 기간 동안 `window.ExperimentalBadge` 를 통해 API를 사용할 수 있습니다. 아래 코드는 현재 디자인을 기반으로하며 표준 API로 브라우저에 들어가기 전에 변경됩니다.

Badging API를 사용하려면 웹 앱이 [Chrome의 설치 가능성 기준](/web/fundamentals/app-install-banners/#criteria) 을 충족해야하며 사용자는이를 홈 화면에 추가해야합니다.

`ExperimentalBadge` 인터페이스는 `window` 의 멤버 객체입니다. 여기에는 두 가지 방법이 있습니다.

- `set([number])` : 앱의 배지를 설정합니다. 값이 제공되면 배지를 제공된 값으로 설정하고 일반 흰색 점 (또는 플랫폼에 적절한 다른 플래그)을 표시하십시오.
- `clear()` : 앱의 배지를 제거합니다.

```js
// In a web page
const unreadCount = 24;
window.ExperimentalBadge.set(unreadCount);
```

`ExperimentalBadge.set()` 및 `ExperimentalBadge.clear()` 는 포 그라운드 페이지에서 또는 나중에 서비스 담당자에게 호출 할 수 있습니다. 두 경우 모두 현재 페이지뿐만 아니라 전체 앱에 영향을줍니다.

경우에 따라 OS에서 배지를 정확하게 표현하지 못할 수도 있습니다.이 경우 브라우저는 해당 장치에 대한 최상의 표현을 제공하려고 시도합니다. 예를 들어, Badging API는 Android에서 지원되지 않지만 Android는 숫자 값 대신 점만 표시합니다.

참고 : 사용자 에이전트가 배지를 표시하는 방법에 대해서는 아무 것도 가정하지 마십시오. 일부 사용자 에이전트는 "4000"과 같은 숫자를 사용하여 "99+"로 다시 작성해야합니다. 직접 채도하면 (예 : "99") "+"가 나타나지 않습니다. 실제 숫자에 관계없이 `Badge.set(unreadCount)` 설정하고 사용자 에이전트가 적절하게 표시하도록 처리하십시오.

## 피드백 {: #feedback }

Badging API가 귀하의 요구를 충족시키는 방식으로 작동하고 주요 시나리오가 누락되지 않도록 귀하의 도움이 필요합니다.

<aside class="key-point"><b>우리는 당신의 도움이 필요합니다!</b> -현재 디자인 (정수 또는 플래그 값 허용)이 요구 사항을 충족합니까? 그렇지 않은 경우 <a href="https://github.com/WICG/badging/issues">WICG / 배지 저장소에</a> 문제를 제기하고 가능한 한 자세히 설명하십시오. 또한 아직 논의중인 수많은 <a href="https://github.com/WICG/badging/blob/master/choices.md">공개 질문</a> 이 있으며 귀하의 의견을 듣고 자합니다.</aside>

또한 Badging API 사용 계획에 관심이 있습니다.

- 유스 케이스에 대한 아이디어 나 어디에서 사용할 아이디어가 있습니까?
- 이것을 사용할 계획입니까?
- 그것을 좋아하고 당신의지지를 보여주고 싶습니까?

[Badging API WICG Discourse](https://discourse.wicg.io/t/badging-api-for-showing-an-indicator-on-a-web-apps-shelf-icon/2900) 토론에 대한 의견을 공유하십시오.

{% include "web/_shared/helpful.html" %}

## 유용한 링크 {: #helpful }

- [공개 설명자](https://github.com/WICG/badging/blob/master/explainer.md)
- [배팅 API 데모](https://badging-api.glitch.me/) | [Badging API 데모 소스](https://glitch.com/edit/#!/badging-api?path=demo.js)
- [추적 버그](https://bugs.chromium.org/p/chromium/issues/detail?id=719176)
- [ChromeStatus.com 항목](https://www.chromestatus.com/features/6068482055602176)
- [오리진 평가판 토큰](https://developers.chrome.com/origintrials/#/view_trial/1711367858400788481) 요청
- [오리진 평가판 토큰을 사용하는 방법](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md#how-do-i-enable-an-experimental-feature-on-my-origin)
- 깜박임 구성 요소 : `UI>Browser>WebAppInstalls`

{% include "web/_shared/rss-widget-updates.html" %}
