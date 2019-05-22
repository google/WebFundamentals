project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# 여러분의 첫 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## 소개

### 웹 앱, 프로그레시브 웹 앱은 무엇입니까?

프로그레시브 웹 앱은 웹을 통해 직접 구축 및 제공되는 데스크톱 및 모바일에서 설치 가능하고 앱과 유사한 환경을 제공합니다. 빠르고 신뢰할 수있는 웹 앱입니다. 가장 중요한 것은 모든 브라우저에서 작동하는 웹 앱입니다. 오늘 웹 앱을 제작한다면, 이미 프로 그레시브 웹 앱을 구축하는 길에 서 있습니다.

#### 신속하고 신뢰할 수있는

모든 웹 경험은 빠르며, 특히 프로그레시브 웹 앱의 경우 더욱 그렇습니다. 빠름은 의미있는 콘텐츠를 화면에 표시하는 데 걸리는 시간을 말하며 5 초 이내에 대화 형 환경을 제공합니다.

그리고, 그것은 믿을 수 없을 정도로 빠릅니다. 훨씬 더 안정적인 성능이 얼마나 스트레스를 받는지는 어렵습니다. 이 방법으로 생각해보십시오. 기본 앱의 첫 번째로드는 실망 스럽습니다. 앱 스토어와 엄청난 다운로드에 의해 문이 열리지 만 일단 앱이 설치된 지점으로 가면 모든 앱 시작에 걸쳐 선불 비용이 상환되며 시작이 가변적 인 지연이 없습니다. 각 응용 프로그램 시작은 마지막, 분산 없음만큼 빠릅니다. 프로 그레시브 웹 앱은 사용자가 설치된 모든 환경에서 기대했던 안정적인 성능을 제공해야합니다.

#### 설치 가능

프로그레시브 웹 앱은 브라우저 탭에서 실행할 수 있지만 설치할 수도 있습니다. 사이트를 북 마킹하면 바로 가기가 추가되지만 설치된 Progressive Web App는 설치된 다른 모든 앱처럼 보이고 작동합니다. 다른 앱을 출시할 때와 같은 위치에서 실행됩니다. 사용자 지정 시작 화면, 아이콘 등을 포함하여 시작 환경을 제어할 수 있습니다. 주소창이나 다른 브라우저 UI가 없는 앱 창에서 앱으로 실행됩니다. 또한 설치된 다른 모든 앱과 마찬가지로 작업 전환기의 최상위 앱입니다.

설치 가능한 PWA가 빠르고 신뢰할 수있는 것이 중요합니다. PWA를 설치 한 사용자는 그들이 어떤 종류의 네트워크 연결을하고 있더라도 응용 프로그램이 작동 할 것으로 기대합니다. 설치된 모든 앱에서 충족시켜야하는 기본 기대치입니다.

#### 모바일 및 데스크톱

반응 형 디자인 기술을 사용하는 Progressive Web Apps는 플랫폼간에 단일 코드 기반을 사용하여 모바일 __ 및_ 데스크톱에서 작동합니다. 네이티브 앱 작성을 고려하고 있다면 PWA가 제공하는 혜택을 살펴보십시오.

### 빌드 할 내용

이 코드 랩에서는 Progressive Web App 기술을 사용하여 날씨 웹 앱을 제작할 것입니다. 앱에서 수행 할 작업 :

* 반응 형 디자인을 사용하여 데스크톱 또는 모바일에서 작동합니다.
* 서비스 작업자가 실행에 필요한 앱 리소스 (HTML, CSS, JavaScript, 이미지)를 미리 캐시하고 런타임시 기상 데이터를 캐시하여 성능을 향상 시키십시오.
* 웹 응용 프로그램 매니페스트와 `beforeinstallprompt` 이벤트를 사용하여 설치할 수 있음을 사용자에게 알립니다.

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: 이 코드 랩을 단순화하고 오프라인 환경을 제공하는 기본 사항을 설명하기 위해 Google은 바닐라 JavaScript를 사용하고 있습니다. 프로덕션 앱에서는 [Workbox](/web/tools/workbox/) 과 같은 도구를 사용하여 서비스 작업자를 구축하는 것이 좋습니다. 그것은 날카로운 모서리와 어두운 모서리를 제거합니다.

### 배울 점

* 웹 앱 매니페스트를 만들고 추가하는 방법
* 간단한 오프라인 경험 제공 방법
* 전체 오프라인 환경을 제공하는 방법
* 앱을 설치 가능하게 만드는 방법

이 코드 랩은 프로그레시브 웹 앱에 중점을 둡니다. 관련성이없는 개념과 코드 블록이 정리되어있어 복사하여 붙여 넣기 만하면됩니다.

### 무엇이 필요 ### ?

* 최근 버전의 Chrome (74 이상) PWA는 웹 앱으로 모든 브라우저에서 작동하지만 Chrome DevTools의 몇 가지 기능을 사용하여 브라우저 수준에서 어떤 일이 일어나는지 더 잘 이해하고이를 사용하여 설치 경험을 테스트하십시오.
* HTML, CSS, JavaScript 및 [Chrome DevTools](https://developer.chrome.com/devtools) .

## 설정하기

### Dark Sky API의 키 얻기

우리의 날씨 데이터는 [Dark Sky API](https://darksky.net/dev) 에서 가져 [Dark Sky API](https://darksky.net/dev) . 이를 사용하려면 API 키를 요청해야합니다. 사용하기 쉽고 비상업적 인 프로젝트에는 무료입니다.

[Register for API Key](https://darksky.net/dev/register)

Note: Dark Sky API 키가 없어도이 코드 랩을 완료 할 수 있습니다. Google 서버가 Dark Sky API에서 실제 데이터를 가져올 수없는 경우 가짜 데이터를 대신 반환합니다.

#### API 키가 올바르게 작동하는지 확인하십시오

API 키가 제대로 작동하는지 테스트하려면 DarkSky API에 대한 HTTP 요청을 만드십시오. 아래 URL을 업데이트하여 `DARKSKY_API_KEY` 을 API 키로 `DARKSKY_API_KEY` . 모든 것이 작동하면 뉴욕시의 최신 일기 예보를 볼 수 있습니다.

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

코드 ###

이 프로젝트에 필요한 모든 것을 Git repo에 넣었습니다. 시작하려면 코드를 잡고 원하는 개발 환경에서 열어야합니다. 이 코드 랩에서는 Glitch를 사용하는 것이 좋습니다.

#### 권장 사항 : Glitch를 사용하여 저장소 가져 오기

이 코드 랩을 사용하여 작업 할 때 Glitch를 사용하는 것이 좋습니다.

1. 새 브라우저 탭을 열고 [https://glitch.com](https://glitch.com) 이동 [https://glitch.com](https://glitch.com) .
2. 계정이 없다면 가입해야합니다.
3. __New Project__를 클릭 한 다음, Git Repo에서 __Clone을 클릭하십시오 .__
4. __https://github.com/googlecodelabs/your-first-pwapp.git__를 복제하고 OK를 클릭하십시오.
5. repo `.env` 드되면 `.env` 파일을 편집하고 DarkSky API 키로 업데이트하십시오.
6. __Show Live__ 단추를 클릭하여 PWA가 실제로 작동하는지 확인합니다.

#### 대안 : 코드 다운로드 및 로컬 작업

코드를 다운로드하고 로컬로 작업하려면 최신 버전의 노드와 코드 편집기를 설치해야하며 준비가되어 있어야합니다.

Caution: 로컬로 작업하는 경우 등대 검사의 일부가 통과하지 않으며 로컬 서버가 보안 컨텍스트를 통해 콘텐츠를 제공하지 않기 때문에 설치를 사용하지 못할 수 있습니다.

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. 다운로드 한 zip 파일의 압축을 푸십시오.
2. `npm install` 을 실행하여 서버를 실행하는 데 필요한 종속성을 설치하십시오.
3. `server.js` 편집하고 DarkSky API 키를 설정하십시오.
4. `node server.js` 을 실행하여 포트 8000에서 서버를 시작하십시오.
5. 브라우저 탭을 열어 [http://localhost:8000](http://localhost:8000)으로 이동합니다.

## 기준선 설정

### 우리의 출발점은 무엇입니까?

시작 지점은이 코드 랩을 위해 설계된 기본 날씨 앱입니다. 코드는이 코드 랩의 개념을 보여주기 위해 지나치게 간소화되었으며 오류 처리가 거의 없습니다. 프로덕션 응용 프로그램에서이 코드를 다시 사용하려면 오류를 처리하고 모든 코드를 완전히 테스트해야합니다.

시도 할 몇 가지 ...

1. 오른쪽 하단에 파란색 더하기 단추가 있는 새 도시를 추가하십시오.
2. 오른쪽 상단의 새로 고침 버튼을 사용하여 데이터를 새로 고칩니다.
3. 각 도시 카드의 오른쪽 위에 있는 x를 사용하여 도시를 삭제하십시오.
4. 데스크톱 및 모바일에서 어떻게 작동하는지 확인하십시오.
5. 오프라인 상태에서 어떤 일이 발생하는지 확인하십시오.
6. Chrome의 네트워크 패널을 사용하여 네트워크가 느린 3G로 스로틀되면 어떻게 되는지 확인합니다.
7. `FORECAST_DELAY` 에서 `server.js` 을 변경하여 예측 서버에 지연을 추가합니다.

### 감사

[Lighthouse](/web/tools/lighthouse/#devtools) 은 사이트 및 페이지의 품질을 향상하는데 도움이 되는 사용하기 쉬운 도구입니다. 성능, 접근성, 점진적 웹 응용 프로그램 등에 대한 감사 기능을 제공합니다. 각 감사에는 감사가 중요한 이유와 이를 고치는 방법을 설명하는 참조 문서가 있습니다.

![b112675caafccef0.png](img/b112675caafccef0.png)

Lighthouse를 사용하여 Weather 앱을 감사하고 변경 사항을 확인합니다.

Note: Lighthouse는 Chrome DevTools, 명령 줄 또는 노드 모듈에서 실행할 수 있습니다. 웹 응용 프로그램이 회귀하지 않도록 빌드 프로세스에 [adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot) 을 고려하십시오.

### 등대를

1. 새 탭에서 프로젝트를 엽니 다.
2. Chrome DevTools를 열고 __Audits__ 탭으로 전환하면 DevTools는 감사 카테고리 목록을 표시하고 모두 사용하도록 설정합니다.
3. __Run audits__을 클릭하십시오. 60-90 초 후에 Lighthouse가 페이지에 대한 보고서를 제공합니다.

### 프로그레시브 웹 앱 감사

Progressive Web App 감사 결과에 초점을 맞출 것입니다.

![af1a64a13725428e.png](img/af1a64a13725428e.png)

그리고 많은 빨간 부분에 집중해야합니다.

* __❗실패한:__ 현재 페이지가 오프라인 일 때 200으로 응답하지 않습니다.
* __❗실패한:__ `start_url` 은 오프라인 일 때 200으로 응답하지 않습니다.
* __❗실패한:__ 페이지 및 `start_url.` 을 제어하는 서비스 작업자를 등록하지 않습니다.
* __❗실패한:__ 웹 응용 프로그램 매니페스트가 설치 가능성 요구 사항을 충족하지 않습니다.
* __❗실패한:__ 사용자 정의 스플래시 화면에 대해 구성되지 않았습니다.
* __❗실패한:__ 주소 표시 줄의 테마 색을 설정하지 않습니다.

이 문제들에 뛰어 들어 시작하자.

## 웹 앱 매니페스트 추가

이 섹션이 끝날 무렵 날씨 앱은 다음과 같은 감사를 통과하게됩니다.

* 웹 앱 매니페스트가 설치 가능성 요구 사항을 충족하지 않습니다.
* 사용자 지정 시작 화면에 대해 구성되지 않았습니다.
* 주소 표시 줄의 테마 색을 설정하지 않습니다.

### 웹 앱 매니페스트 만들기

[web app manifest](/web/fundamentals/web-app-manifest) 은 개발자에게 앱이 사용자에게 표시되는 방식을 제어 할 수있는 기능을 제공하는 간단한 JSON 파일입니다.

웹 앱 매니페스트를 사용하면 웹 앱에서 다음 작업을 수행 할 수 있습니다.

* 독립 실행 형 윈도우 ( `display` )에서 앱을 열어 보도록 브라우저에 알리십시오.
* 앱을 처음 시작할 때 열리는 페이지를 정의하십시오 ( `start_url` ).
* 도크 또는 앱 실행기 ( `short_name` , `icons` )에서 앱의 모양을 정의합니다.
* 스플래시 화면을 만듭니다 ( `name` , `icons` , `colors` ).
* 가로 모드 또는 세로 모드 ( `orientation` )로 창을 열도록 브라우저에 `orientation` 하십시오.
* 그리고 [plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) .

프로젝트에 `public/manifest.json` 이라는 파일을 `public/manifest.json` 다음 내용을 복사 / 붙여 넣기하십시오.

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

매니페스트는 다양한 화면 크기를위한 일련의 아이콘을 지원합니다. 이 코드 실습실에는 iOS 통합에 필요한 코드가 포함되어 있으므로 몇 가지 다른 기능을 포함 시켰습니다.

Note: Chrome을 설치하려면 최소 192x192 픽셀 아이콘과 512x512 픽셀 아이콘을 제공해야합니다. 그러나 다른 크기를 제공 할 수도 있습니다. Chrome은 48dp에 가장 근접한 아이콘을 사용합니다 (예 : 2x 기기에서는 96px, 3x 기기에서는 144px).

### 웹 앱 매니페스트에 대한 링크 추가

다음으로 우리 앱의 각 페이지에 `<link rel="manifest"...` 을 추가하여 브라우저에 매니페스트에 대해 알려줄 필요가 있습니다. `index.html` 파일의 `<head>` 요소에 다음 행을 추가하십시오.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools 우회로

DevTools는 `manifest.json` 파일을 빠르고 쉽게 확인할 수있는 방법을 제공합니다. __Application__ 패널에서 __Manifest__ 창을 엽니 다. 매니 페스트 정보를 올바르게 추가 한 경우이 정보를 구문 분석하여이 창에 친숙한 형식으로 표시 할 수 있습니다.

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### iOS 메타 태그 및 아이콘 추가

iOS의 Safari는 웹 앱 매니페스트 ( [yet](https://webkit.org/status/#specification-web-app-manifest) )를 지원하지 않으므로 `index.html` 파일의 `<head>` 에 [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html) 을 추가해야합니다.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### 보너스 : 쉬운 등대 수정

우리 등대 감사는 수정하기 쉬운 몇 가지 다른 것들을 외쳤습니다. 그래서 우리가있는 동안 그 등을 돌 봅시다.

#### 메타 설명 설정

Lighthouse는 SEO 감사에서 Google의 &quot; [Document does not have a meta description.](/web/tools/lighthouse/audits/description) &quot;설명을 Google의 검색 결과에 표시 할 수 있다고 언급했습니다. 고품질의 고유 한 설명은 검색 사용자와의 관련성을 높이고 검색 트래픽을 높일 수 있습니다.

설명을 추가하려면 다음 `meta` 태그를 문서의 `<head>` 에 추가하십시오.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### 주소 표시 줄 테마 색상 설정

Lighthouse는 PWA 감사에서 &quot; [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) &quot;이라는 앱을 지적했습니다. 브라우저의 주소 표시 줄에 브랜드 색상을 일치 시키면보다 몰입 한 사용자 경험을 제공합니다.

모바일에서 테마 색상을 설정하려면 다음 `meta` 태그를 문서의 `<head>` 에 추가하십시오.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### 등의 변경 사항을 확인합니다

등대를 다시 실행하고 (감사 창의 왼쪽 상단 모서리에있는 + 기호를 클릭하여) 변경 사항을 확인합니다.

__SEO Audit__

* __✅ 합격 한:__ 문서에 메타 설명이 있습니다.

__프로 그래 시브 웹 앱 감사__

* __❗실패한:__ 현재 페이지가 오프라인 일 때 200으로 응답하지 않습니다.
* __❗실패한:__ `start_url` 은 오프라인 일 때 200으로 응답하지 않습니다.
* __❗실패한:__ 페이지 및 `start_url.` 을 제어하는 서비스 작업자를 등록하지 않습니다.
* __✅ 합격 한:__ 웹 앱 매니페스트가 설치 가능성 요구 사항을 충족합니다.
* __✅ 합격 한:__ 사용자 정의 스플래시 화면 용으로 구성되었습니다.
* __✅ 합격 한:__ 주소 표시 줄의 테마 색을 설정합니다.

## 기본 오프라인 경험을 제공

앱을 설치하면 오프라인 일 때 항상 기본 경험을 갖게된다는 사용자의 기대가 있습니다. 따라서 설치 가능한 웹 앱이 Chrome의 오프라인 공룡을 절대로 보여주지 않는 것이 중요합니다. 오프라인 환경은 단순한 오프라인 페이지부터 이전에 캐싱 된 데이터를 사용하는 읽기 전용 환경에서부터 네트워크 연결이 복원 될 때 자동으로 동기화되는 모든 기능을 갖춘 오프라인 환경에 이르기까지 다양합니다.

이 섹션에서는 날씨 앱에 간단한 오프라인 페이지를 추가 할 것입니다. 사용자가 오프라인에서 앱을로드하려고하면 브라우저에 표시되는 일반적인 오프라인 페이지 대신 사용자 정의 페이지가 표시됩니다. 이 섹션이 끝날 무렵 날씨 앱은 다음과 같은 감사를 통과하게됩니다.

* 현재 페이지는 오프라인 일 때 200으로 응답하지 않습니다.
* `start_url` 은 오프라인 일 때 200으로 응답하지 않습니다.
* 페이지 및 `start_url.` 을 제어하는 서비스 작업자를 등록하지 않습니다.

다음 섹션에서는 맞춤 오프라인 페이지를 전체 오프라인 환경으로 바꿀 것입니다. 이렇게하면 오프라인 환경이 개선되지만 더 중요한 것은 우리의 자산 (HTML, CSS 및 JavaScript)의 대부분이 로컬에 저장되어 제공되므로 잠재적 인 병목 현상으로 네트워크가 제거되므로 성능이 크게 향상 될 것입니다.

### 서비스 노동자 구조에

서비스 종사자에게 익숙하지 않다면, [Introduction To Service Workers](/web/fundamentals/primers/service-worker/) 가 할 수있는 일, 수명주기의 작동 방식 등을 읽고 기본적인 이해를 얻을 수 있습니다. 이 코드 실습을 [Debugging Service Workers code lab](http://goo.gl/jhXCBy) 을 확인하여 서비스 작업자와 작업하는 방법을 자세히 살펴보십시오.

서비스 작업자를 통해 제공되는 기능은 점진적 향상으로 간주되어야하며 브라우저에서 지원하는 경우에만 추가해야합니다. 예를 들어 서비스 작업자의 경우 [app shell](/web/fundamentals/architecture/app-shell) 및 앱 데이터를 캐시 할 수 있으므로 네트워크가없는 경우에도 사용할 수 있습니다. 서비스 작업자가 지원되지 않으면 오프라인 코드가 호출되지 않고 사용자는 기본 경험을 얻습니다. 기능 감지를 사용하여 점진적 향상 기능을 제공하면 오버 헤드가 거의 없으며 해당 기능을 지원하지 않는 구형 브라우저에서는 중단되지 않습니다.

Warning: 서비스 작업자 기능은 HTTPS를 통해 액세스하는 페이지에서만 사용할 수 있습니다 (http : // localhost 및 해당 항목도 테스트를 용이하게합니다).

### 서비스 노동자 등록

첫 번째 단계는 서비스 근로자를 등록하는 것입니다. `index.html` 파일에 다음 코드를 추가하십시오.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

이 코드는 서비스 작업자 API가 사용 가능한지 확인하고, 사용 가능한 경우 `/service-worker.js` 의 서비스 작업자는 페이지가 [loaded](/web/fundamentals/primers/service-workers/registration) 이되면 등록됩니다.

참고로, 서비스 작업자는 `/scripts/` 디렉터리가 아닌 루트 디렉터리에서 제공됩니다. 이것은 서비스 직원의 __ `scope` __을 (를) 설정하는 가장 쉬운 방법입니다. 서비스 작업자의 `scope` 는 서비스 작업자가 제어하는 파일, 즉 서비스 작업자가 요청을 가로 챌 경로를 결정합니다. 기본 `scope` 은 서비스 작업자 파일의 위치이며 아래의 모든 디렉터리로 확장됩니다. 따라서 `service-worker.js` 가 루트 디렉터리에 있으면 서비스 작업자는이 도메인에있는 모든 웹 페이지의 요청을 제어합니다.

### 캐시 오프라인 페이지

먼저 서비스 담당자에게 캐시 할 내용을 알려야합니다. 우리는 이미 네트워크 연결이 없을 때마다 우리가 `public/offline.html` 간단한 [offline page](https://your-first-pwa.glitch.me/offline.html) ( `public/offline.html` )을 만들었습니다.

`service-worker.js` 에서 `'/offline.html',` 을 `FILES_TO_CACHE` 배열에 추가하면 최종 결과는 다음과 같습니다.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

다음으로 `install` 이벤트를 업데이트하여 서비스 작업자에게 오프라인 페이지를 사전 캐시하도록 알려줍니다.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: 서비스 근로자 이벤트 및 수명주기는 다음 섹션에서 다룹니다.

이제 `install` 이벤트가 `caches.open()` 캐시를 `caches.open()` 캐시 이름을 제공합니다. 캐시 이름을 제공하면 파일을 버전 화하거나 캐시 된 자원에서 데이터를 분리 할 수 있으므로 쉽게 업데이트 할 수 있지만 다른 하나는 영향을받지 않습니다.

캐시가 열리면 `cache.addAll()` 을 호출 할 수 있습니다. `cache.addAll()` 은 URL 목록을 가져 와서 서버에서 가져 와서 응답을 캐시에 추가합니다. `cache.addAll()` 은 개별 요청 중 하나라도 실패하면 거부합니다. 즉, 설치 단계가 성공하면 캐시가 일관된 상태에 있음을 보장합니다. 그러나 어떤 이유로 든 실패하면 서비스 직원이 다음에 시작할 때 자동으로 다시 시도합니다.

#### DevTools 우회로

DevTools를 사용하여 서비스 작업자를 이해하고 디버깅하는 방법에 대해 살펴 보겠습니다. 페이지를 다시로드하기 전에 DevTools를 열고 __Application__ 패널의 __Service Workers__ 창으로 이동하십시오. 다음과 같이 보입니다.

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

이와 같이 빈 페이지가 표시되면 현재 열려있는 페이지에 등록 된 서비스 작업자가없는 것을 의미합니다.

이제 페이지를 새로 고침하십시오. Service Workers 창은 이제 다음과 같이 보입니다.

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

이와 같은 정보가 표시되면 페이지에 서비스 작업자가 실행 중임을 의미합니다.

상태 라벨 옆에 번호가 있습니다 (이 경우 *34251*). 서비스 근로자와 함께 일하면서 그 번호를 계속 주시하십시오. 서비스 직원이 업데이트되었는지 쉽게 알 수 있습니다.

### 이전 오프라인 페이지 정리

`activate` 이벤트를 사용하여 캐시의 이전 데이터를 정리합니다. 이 코드는 서비스 셸 파일이 변경 될 때마다 서비스 작업자가 캐시를 업데이트하도록합니다. 이 작업을 수행하려면 서비스 작업자 파일의 맨 위에있는 `CACHE_NAME` 변수를 증가시켜야합니다.

`activate` 이벤트에 다음 코드를 추가하십시오.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevTools 우회로

Service Workers 창을 열고 페이지를 새로 고치면 새로운 서비스 작업자가 설치되고 상태 번호가 증가하는 것을 볼 수 있습니다.

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

우리 때문에 업데이트 된 서비스 노동자는 즉시 제어됩니다 `install` 이벤트와 종료 `self.skipWaiting()` 하고 `activate` 이벤트와 종료 `self.clients.claim()` . 그것들이 없으면, 오래된 서비스 종사자는 페이지에 탭이 열려있는 한 계속 페이지를 제어 할 것입니다.

### 실패한 네트워크 요청 처리

마지막으로 `fetch` 이벤트를 처리 `fetch` 합니다. 우리는 [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache) 을 사용할 것입니다. 서비스 작업자는 먼저 네트워크에서 리소스를 가져 오려고 시도하고, 실패하면 캐시에서 오프라인 페이지를 반환합니다.

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

`fetch` 핸들러는 페이지 탐색을 처리하기 `fetch` 되므로 다른 요청은 핸들러에서 덤프 될 수 있으며 브라우저에서 정상적으로 처리됩니다. 그러나 `.mode` 요청이 `navigate` 인 경우 `fetch` 을 사용하여 네트워크에서 항목을 가져 오십시오. 실패하면 `catch` 핸들러는 `cache.match('offline.html')` 로 캐시를 `caches.open(CACHE_NAME)` 을 사용하여 미리 캐시 된 오프라인 페이지를 가져옵니다. 그 결과는 `evt.respondWith()` 사용하여 브라우저로 다시 전달됩니다.

Key Point: `fetch` 에서 `fetch` 호출을 [`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith) 하면 브라우저가 기본 페치 처리를하지 못하게하고 브라우저가 응답을 직접 처리하도록 지시합니다. `fetch` 핸들러 내에서 `evt.respondWith()` 호출하지 않으면 기본 네트워크 동작 만 수행됩니다.

#### DevTools 우회로

우리가 기대하는대로 모든 것이 제대로 작동하는지 확인합시다. Service Workers 창을 열고 페이지를 새로 고치면 새로운 서비스 작업자가 설치되고 상태 번호가 증가하는 것을 볼 수 있습니다.

캐시 된 내용을 확인할 수도 있습니다. DevTools의 __Application__ 패널에있는 __Cache Storage__ 창으로 이동하십시오. __Cache Storage__를 마우스 오른쪽 단추로 클릭하고 __Refresh Caches__를 선택하고 섹션을 확장하면 왼쪽에 나열된 정적 캐시의 이름이 표시됩니다. 캐시 이름을 클릭하면 캐시 된 모든 파일이 표시됩니다.

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

이제 오프라인 모드를 테스트 해 봅시다. DevTools의 __Service Workers__ 창으로 돌아가서 __Offline__ 확인란을 선택하십시오. 확인한 후 __Network__ 패널 탭 옆에 노란색 경고 아이콘이 나타납니다. 오프라인 상태임을 나타냅니다.

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

페이지를 새로 고침하면 작동합니다! Chrome의 오프라인 디노 대신 __our__ 오프라인 팬더를 사용합니다!

### 서비스 작업자 테스트 팁

서비스 작업자를 디버깅하는 것은 어려울 수 있으며, 캐싱이 필요한 경우 캐쉬가 예상대로 업데이트되지 않으면 악몽이 될 수 있습니다. 전형적인 서비스 근로자 라이프 사이클과 코드의 버그 사이에, 당신은 빨리 좌절하게 될 것입니다. __그러나하지 마세요 .__

#### DevTools 사용

응용 프로그램 패널의 서비스 작업자 창에는 인생을 훨씬 쉽게 만들어주는 몇 가지 확인란이 있습니다.

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ -이 옵션을 선택하면 오프라인 환경을 시뮬레이트하고 요청이 네트워크로 보내지는 것을 방지합니다.
* __Update on reload__ -이 옵션을 선택하면 최신 서비스 담당자가 설치되어 설치되고 즉시 활성화됩니다.
* __Bypass for network__ - 확인 된 요청이 서비스 작업자를 우회하여 네트워크로 직접 전송됩니다.

#### 신선한 시작

경우에 따라 캐시 된 데이터를로드하거나 예상대로 업데이트되지 않을 수 있습니다. 저장된 모든 데이터 (localStorage, indexedDB 데이터, 캐시 된 파일)를 지우고 서비스 작업자를 제거하려면 응용 프로그램 탭의 스토리지 지우기 창을 사용하십시오. 또는 시크릿 창에서 작업 할 수도 있습니다.

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

추가 팁 :

* 일단 서비스 직원이 등록 해제되면, 포함 된 브라우저 창이 닫힐 때까지 목록에 남아있을 수 있습니다.
* 앱에 대한 여러 창이 열리면 모든 서비스가 다시로드되어 최신 서비스 담당자에게 업데이트 될 때까지 새 서비스 작업자가 적용되지 않습니다.
* 서비스 작업자 등록을 취소해도 캐시가 지워지지 않습니다!
* 서비스 작업자가 존재하고 새로운 서비스 작업자가 등록 된 경우 [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 제외하고 페이지가 다시로드 될 때까지 새로운 서비스 작업자가 제어를받지 않습니다.

### 등의 변경 사항을 확인합니다

Lighthouse를 다시 실행하고 변경 사항을 확인하십시오. 변경 사항을 확인하기 전에 오프라인 확인란의 선택을 취소하는 것을 잊지 마십시오!

__SEO Audit__

* __✅ 합격 한:__ 문서에 메타 설명이 있습니다.

__프로 그래 시브 웹 앱 감사__

* __✅ 합격 한:__ 현재 페이지는 오프라인 일 때 200으로 응답합니다.
* __✅ 합격 한:__ `start_url` 은 오프라인 일 때 200으로 응답합니다.
* __✅ 합격 한:__ 페이지 및 `start_url.` 을 제어하는 서비스 작업자를 등록합니다.
* __✅ 합격 한:__ 웹 앱 매니페스트가 설치 가능성 요구 사항을 충족합니다.
* __✅ 합격 한:__ 사용자 정의 스플래시 화면 용으로 구성되었습니다.
* __✅ 합격 한:__ 주소 표시 줄의 테마 색을 설정합니다.

## 전체 오프라인 경험을 제공

잠시 시간을내어 휴대 전화를 비행기 모드로 전환 한 다음 자주 사용하는 앱 중 일부를 실행 해보십시오. 거의 모든 경우에있어 매우 강력한 오프라인 환경을 제공합니다. 사용자는 앱의 강력한 경험을 기대합니다. 그리고 웹은 전혀 다르지 않아야합니다. 프로그레시브 웹 앱은 오프라인 시나리오를 핵심 시나리오로 설계해야합니다.

Key Point: 오프라인 우선의 디자인은 앱이 만든 네트워크 요청 수를 줄임으로써 웹 앱의 성능을 대폭 향상시킬 수 있습니다. 대신 로컬 캐시에서 리소스를 사전 캐시하여 직접 처리 할 수 있습니다. 네트워크 연결이 가장 빠르더라도 로컬 캐시에서 서비스하는 것이 더 빠릅니다!

### 서비스 작업자 라이프 사이클

서비스 노동자의 라이프 사이클은 가장 복잡한 부분입니다. 그것이 무엇을하려고하는지, 어떤 이점이 있는지 모를 경우, 그것은 당신과 싸우는 것처럼 느낄 수 있습니다. 그러나 이것이 어떻게 작동하는지 알게되면 웹 및 기본 패턴을 최대한 혼합하여 사용자에게 원활하고 눈에 거슬리는 업데이트를 제공 할 수 있습니다.

Key Point: 이 코드 랩은 서비스 작업자 라이프 사이클의 기본 사항만을 다룹니다. 보다 자세한 내용은 [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle) 기사를 참조하십시오.

#### `install` 이벤트

서비스 작업자가받는 첫 번째 이벤트는 `install` 입니다. 작업자가 실행하자마자 실행되며 서비스 작업자 당 한 번만 호출됩니다. __서비스 작업자 스크립트를 변경하면 브라우저가 다른 서비스 작업자__로 간주하고 자체 `install` 이벤트를받습니다.

![72ed77b1720512da.png](img/72ed77b1720512da.png)

일반적으로 `install` 이벤트는 앱 실행에 필요한 모든 것을 캐시하는 데 사용됩니다.

#### `activate` 이벤트

서비스 작업자는 시작할 때마다 `activate` 이벤트를 수신합니다. `activate` 이벤트의 주요 목적은 서비스 작업자의 동작을 구성하고 이전 실행 (예 : 오래된 캐시)에서 남겨진 자원을 정리하고 서비스 `activate` (예 : 아래에 설명 된 `fetch` 이벤트)를 처리 할 준비가되도록하는 `fetch` 입니다.

#### `fetch` 이벤트

fetch 이벤트를 통해 서비스 작업자는 모든 네트워크 요청을 가로 채고 요청을 처리 할 수 있습니다. 자원을 얻기 위해 네트워크로 갈 수도 있고, 자체 캐시에서 가져올 수도 있고, 사용자 정의 응답이나 다른 옵션을 생성 할 수도 있습니다. [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/) 에서 사용할 수있는 다양한 전략을 확인하십시오.

#### 서비스 작업자 업데이트

브라우저는 각 페이지로드시 서비스 담당자의 새 버전이 있는지 확인합니다. 새 버전을 찾으면 새 버전이 다운로드되어 백그라운드에 설치되지만 활성화되지는 않습니다. 오래된 서비스 작업자를 사용하는 페이지가 더 이상 열리지 않을 때까지 대기 상태에 있습니다. 이전 서비스 작업자를 사용하는 모든 창을 닫으면 새 서비스 작업자가 활성화되어 제어 할 수 있습니다. 자세한 내용은 Service Worker Lifecycle 문서의 [Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates) 섹션을 참조하십시오.

### 올바른 캐싱 전략 선택

올바른 [caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/) 선택하는 것은 캐시하려는 자원의 유형과 나중에 필요할 수있는 방법에 따라 다릅니다. 날씨 애플리케이션의 경우 캐시 할 리소스를 두 가지 범주로 나눕니다. 즉, 미리 캐시하려는 리소스와 런타임에 캐시 할 데이터입니다.

#### 캐싱 정적 리소스

리소스를 미리 준비하는 것은 사용자가 데스크톱 또는 모바일 앱을 설치하는 경우와 유사한 개념입니다. 앱 실행에 필요한 주요 리소스는 기기에 설치되거나 캐싱되어 네트워크에 연결되어 있는지 여부에 관계없이 나중에로드 할 수 있습니다.

앱을 실행하는 데 필요한 모든 것이 사용자의 기기에 저장 될 수 있도록 서비스 직원이 설치되면 Google 앱에서 정적 리소스를 모두 미리 캐시합니다. 앱이 번개를 빨리 [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) 위해 [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) 전략을 사용합니다. 리소스를 얻기 위해 네트워크로가는 대신 로컬 캐시에서 리소스를 가져옵니다. 사용할 수없는 경우에만 네트워크에서 가져올 것입니다.

![44860840e2090bd8.png](img/44860840e2090bd8.png)

로컬 캐시에서 당기면 모든 네트워크 가변성이 제거됩니다. 사용자가 어떤 종류의 네트워크 (WiFi, 5G, 3G 또는 심지어 2G)에 있더라도, 우리가 실행해야하는 핵심 자원은 거의 즉시 사용할 수 있습니다.

Caution: 이 샘플에서는 정적 리소스가 [`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network) 전략을 사용하여 제공되므로 캐시 된 컨텐트의 복사본이 네트워크를 참조하지 않고 반환됩니다. `cache-first` 전략은 쉽게 구현할 수 있지만 앞으로 문제가 발생할 수 있습니다.

#### 앱 데이터 캐싱

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate) 은 이상적인 특정 유형의 데이터이며 앱용으로 적합합니다. 가능한 한 빨리 화면에 데이터를 가져온 다음 네트워크가 최신 데이터를 반환하면 업데이트합니다. Stale-while-revalidate는 캐시와 네트워크에 두 개의 비동기 요청을 시작해야 함을 의미합니다.

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

정상적인 상황에서 캐시 된 데이터는 거의 즉시 반환되어 사용 가능한 최신 데이터를 앱에 제공합니다. 그런 다음 네트워크 요청이 돌아 오면 네트워크의 최신 데이터를 사용하여 앱이 업데이트됩니다.

우리의 앱의 경우 네트워크보다 더 나은 환경을 제공합니다. 캐시 전략으로 넘어지는 것은 사용자가 네트워크 요청이 화면에 표시되기까지 시간이 만료 될 때까지 기다릴 필요가 없기 때문입니다. 처음에는 오래된 데이터를 볼 수 있지만 일단 네트워크 요청이 반환되면 앱은 최신 데이터로 업데이트됩니다.

### 앱 로직 업데이트

앞서 언급했듯이, 앱은 두 개의 비동기 요청을 캐시에서 캐시로, 네트워크에서 하나씩 킥오싱해야합니다. 앱이 사용 `caches` 에서 사용할 수있는 객체 `window` 캐시에 액세스하고 최신 데이터를 검색 할 수 있습니다. 이것은 `caches` 객체가 모든 브라우저에서 사용 가능하지 않을 수 있고 네트워크 요청이 여전히 작동해야하는 경우 점진적 향상의 훌륭한 예입니다.

`getForecastFromCache()` 함수를 업데이트하여 `getForecastFromCache()` 개체가 전역 `window` 개체에서 사용 `caches` 확인하고, `caches` 개체가 있으면 캐시에서 데이터를 요청하십시오.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

그런 다음 [`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) 을 수정하여 `getForecastFromNetwork()` 에서 네트워크에서 예측을 가져 `getForecastFromCache()` 에서 최신 캐시 된 예측을 가져 `getForecastFromCache()` 두 번 호출하도록 수정해야합니다.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

우리의 날씨 응용 프로그램은 이제 캐시와 `fetch` 통해 두 개의 비동기식 데이터 요청을합니다. 캐시에 데이터가 있으면 매우 빠르게 반환되고 렌더링됩니다 (수십 밀리 초). 그런 다음 `fetch` 응답하면 날씨 API에서 가장 최신 데이터로 카드가 업데이트됩니다.

캐쉬 요청과 `fetch` 요청의 양쪽 모두가 예측 된 카드를 갱신하기위한 호출로 어떻게 `fetch` 지 주목하십시오. 앱이 최신 데이터를 표시하는지 여부를 앱에서 어떻게 알 수 있습니까? 이것은 `renderForecast()` 의 다음 코드에서 처리됩니다.

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

카드가 업데이트 될 때마다 앱은 카드의 숨겨진 속성에 데이터의 타임 스탬프를 저장합니다. 앱에 이미 존재하는 타임 스탬프가 함수에 전달 된 데이터보다 최신 인 경우 앱이 작동하지 않습니다.

### 앱 리소스 사전 캐시

서비스 작업자의 경우 `DATA_CACHE_NAME` 추가하여 응용 프로그램 데이터를 응용 프로그램 쉘에서 분리 할 수 있습니다. 앱 셸이 업데이트되고 오래된 캐시가 제거되면 Google 데이터는 변경되지 않고 그대로 유지되어 매우 빠른로드가 가능합니다. 나중에 데이터 형식이 변경되면이를 처리하고 앱 셸과 콘텐츠가 동기화 상태를 유지할 수있는 방법이 필요합니다.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

`CACHE_NAME` 도 업데이트하는 것을 잊지 마십시오. 정적 리소스도 모두 변경하게 될 것입니다.

앱이 오프라인으로 작동하려면 필요한 모든 리소스를 미리 캐시해야합니다. 이는 우리의 성과에도 도움이 될 것입니다. 네트워크에서 모든 리소스를 가져 오는 대신 응용 프로그램은 로컬 캐시에서 모든 리소스를로드하여 네트워크 불안정성을 제거 할 수 있습니다.

`FILES_TO_CACHE` 배열을 파일 목록으로 업데이트하십시오.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

우리가 수동으로 캐시 할 파일 목록을 생성하기 때문에, 우리는 파일을 업데이트할 때마다 우리는 업데이트 __must `CACHE_NAME` __. 이제 앱에 오프라인 작업이 필요한 모든 리소스가 있고 오프라인 페이지를 다시 표시하지 않기 때문에 캐시 된 파일 목록에서 `offline.html` 을 (를) 제거할 수 있었습니다.

Caution: 이 샘플에서는 우리 직원이 직접 서비스 작업자를 압연했습니다. 정적 리소스를 업데이트 할 때마다 서비스 작업자를 다시 롤하고 캐시를 업데이트해야합니다. 그렇지 않으면 이전 컨텐트가 제공됩니다. 또한 한 파일이 변경되면 전체 캐시가 무효화되고 다시 다운로드해야합니다. 즉, 단순한 단일 문자 맞춤법 오류를 수정하면 캐시가 무효화되고 모든 것이 다시 다운로드되어야하므로 정확하지는 않습니다. [Workbox](/web/tools/workbox/) 빌드 프로세스에 통합하여 정상적으로 처리합니다. 변경된 파일 만 업데이트되어 사용자를위한 대역폭을 절약하고보다 쉽게 유지 관리 할 수 있습니다!

#### 활성화 이벤트 핸들러를 업데이트

우리 보장하기 위해 `activate` 실수에, 우리의 데이터를 삭제하지 않는 이벤트를 `activate` 의 이벤트 `service-worker.js` , 대체 `if (key !== CACHE_NAME) {` 함께 :

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### 가져 오기 이벤트 핸들러 업데이트

날씨 API에 대한 요청을 가로 채서 응답을 캐시에 저장하여 나중에 쉽게 액세스 할 수 있도록 서비스 작업자를 수정해야합니다. realeate stale-while 전략에서는 네트워크 응답이 항상 최신 정보를 제공하는 &#39;진실의 원천&#39;이라고 기대합니다. 불가능할 경우 이미 앱에서 최신 캐시 데이터를 검색 했으므로 실패 할 수도 있습니다.

다른 요청과 별도로 데이터 API에 대한 요청을 처리하도록 `fetch` 이벤트 처리기를 업데이트하십시오.

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

이 코드는 요청을 가로 챈 다음 일기 예보인지 여부를 확인합니다. 그럴 경우 `fetch` 을 사용하여 요청하십시오. 응답이 반환되면 캐시를 열고 응답을 복제하고 캐시에 저장 한 다음 원래 요청자에게 응답을 반환합니다.

`evt.request.mode !== 'navigate'` 검사를 제거해야하는 이유는 서비스 작업자가 탐색뿐만 아니라 모든 요청 (이미지, 스크립트, CSS 파일 등)을 처리하기를 원하기 때문입니다. 체크인을 맡기면 서비스 작업자 캐시에서 HTML 만 제공되고 나머지는 네트워크에서 요청됩니다.

### 사용해보기

앱이 완전히 오프라인 상태 여야합니다. 페이지를 새로 고침하여 최신 서비스 작업자를 설치했는지 확인한 다음 몇 도시를 저장하고 앱의 새로 고침 버튼을 눌러 기상 데이터를 가져옵니다.

그런 다음 DevTools의 __Application__ 패널에있는 __Cache Storage__ 창으로 이동하십시오. 섹션을 확장하면 정적 캐시와 데이터 캐시의 이름이 왼쪽에 나열됩니다. 데이터 캐시를 열면 각 도시에 저장된 데이터가 표시됩니다.

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

그런 다음 DevTools를 열고 Service Workers 창으로 전환 한 다음 오프라인 확인란을 선택한 다음 페이지를 다시로드하고 오프라인으로 이동하여 페이지를 다시로드하십시오.

당신이 고속 네트워크에있어 날씨 예보 데이터 연결 속도가 느린 업데이트하는 방법을보고 싶은 경우, 설정 `FORECAST_DELAY` 재산을 `server.js` 에 `5000` . 예측 API에 대한 모든 요청은 5000ms 지연됩니다.

### 등의 변경 사항을 확인합니다

등대를 다시 운영하는 것도 좋은 생각입니다.

__SEO Audit__

* __✅ 합격 한:__ 문서에 메타 설명이 있습니다.

__프로 그래 시브 웹 앱 감사__

* __✅ 합격 한:__ 현재 페이지는 오프라인 일 때 200으로 응답합니다.
* __✅ 합격 한:__ `start_url` 은 오프라인 일 때 200으로 응답합니다.
* __✅ 합격 한:__ 페이지 및 `start_url.` 을 제어하는 서비스 작업자를 등록합니다.
* __✅ 합격 한:__ 웹 앱 매니페스트가 설치 가능성 요구 사항을 충족합니다.
* __✅ 합격 한:__ 사용자 정의 스플래시 화면 용으로 구성되었습니다.
* __✅ 합격 한:__ 주소 표시 줄의 테마 색을 설정합니다.

## 설치 환경 추가

프로 그레시브 웹 앱을 설치하면 설치된 다른 모든 앱처럼 보이고 작동합니다. 다른 앱을 출시 할 때와 같은 위치에서 실행됩니다. 그것은 주소 표시 줄이나 다른 브라우저 UI없이 응용 프로그램에서 실행됩니다. 또한 설치된 다른 모든 앱과 마찬가지로 작업 전환기의 최상위 앱입니다.

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

Chrome에서 프로그레시브 웹 앱은 3 점 컨텍스트 메뉴를 통해 설치하거나 사용자에게 앱 설치를 요청하는 버튼 또는 기타 UI 구성 요소를 제공 할 수 있습니다.

Success: Chrome의 점 3 차원 메뉴에서의 설치 경험이 다소 묻혀 있기 때문에 앱에서 사용자에게 앱을 설치할 수 있음을 알리기 위해 앱 내 표시를 제공하고 설치 프로세스를 완료하려면 설치 버튼을 사용하는 것이 좋습니다.

### 감사

사용자가 프로그레시브 웹 앱을 설치할 수 있으려면 [certain criteria](/web/fundamentals/app-install-banners/#criteria) 을 충족 [certain criteria](/web/fundamentals/app-install-banners/#criteria) 합니다. Lighthouse를 사용하여 설치 가능한 기준을 충족하는지 확인하는 것이 가장 쉬운 방법입니다.

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

이 코드 테이블을 통해 작업 한 경우 PWA는 이미 이러한 기준을 충족해야합니다.

Key Point: 이 섹션에서는 DevTools의 **Application** 패널에있는 **Service Workers** 창에서 **Bypass for network** 확인란을 선택하십시오. 이 옵션을 선택하면 요청이 서비스 작업자를 우회하여 네트워크로 직접 전송됩니다. 이는이 섹션을 진행하면서 서비스 작업자를 업데이트 할 필요가 없기 때문에 개발 프로세스를 단순화합니다.

### index.html에 install.js를 추가하십시오

먼저, `install.js` 을 `index.html` 파일에 추가합시다.

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### `beforeinstallprompt` 이벤트 듣기

홈 화면 [criteria](/web/fundamentals/app-install-banners/#criteria) 추가되면 Chrome에서 `beforeinstallprompt` 이벤트를 실행하여 앱을 &#39;설치&#39;할 수 있음을 나타내는 데 사용할 수 있습니다. 그런 다음 사용자에게 설치하라는 메시지를 표시합니다. 아래 코드를 추가하여 `beforeinstallprompt` 이벤트를 수신하십시오.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### 이벤트 저장 및 설치 버튼 표시

우리 `saveBeforeInstallPromptEvent` 함수에서 나중에 `prompt()` 를 호출 할 수 있도록 `beforeinstallprompt` 이벤트에 대한 참조를 저장하고 UI를 업데이트하여 설치 버튼을 표시합니다.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### 프롬프트 표시 / 버튼 숨기기

사용자가 설치 버튼을 클릭하면 저장된 `beforeinstallprompt` 이벤트에 대해 `.prompt()` 을 호출해야합니다. 또한 `.prompt()` 는 저장된 이벤트마다 한 번만 호출 할 수 있기 때문에 설치 버튼을 숨길 필요가 있습니다.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

`.prompt()` 을 호출하면 사용자에게 모달 대화 상자가 표시되어 앱을 홈 화면에 추가하라는 메시지가 표시됩니다.

### 결과 기록

저장된 `beforeinstallprompt` 이벤트의 `userChoice` 특성에 의해 리턴 된 약속을 청취하여 사용자가 설치 대화 상자에 응답 한 방법을 확인할 수 있습니다. Promise는 프롬프트가 표시되고 사용자가 응답 한 후 `outcome` 속성을 가진 객체를 반환합니다.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

대한 한 의견 `userChoice` 의 [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) 아닌 기능을 당신은 예상대로.

#### 모든 설치 이벤트 기록

앱을 설치하기 위해 추가하는 모든 UI 외에도 사용자는 Chrome의 3 점 메뉴와 같은 다른 방법을 통해 PWA를 설치할 수 있습니다. 이러한 이벤트를 추적하려면 appinstalled 이벤트를 수신하십시오.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

그런 다음, 우리는 업데이트해야합니다 `logAppInstalled` 이 코드 랩을 위해, 우리는 그냥 사용합니다, 기능을 `console.log` 하지만, 생산 응용 프로그램에서, 당신은 아마 당신의 분석 소프트웨어와 이벤트로이를 기록합니다.

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### 서비스 작업자 업데이트

이미 캐싱 된 파일을 변경 `service-worker.js` 파일에서 `CACHE_NAME` 을 (를) 업데이트하는 것을 잊지 마십시오. DevTools의 응용 프로그램 패널에있는 Service Workers 창에서 network__에 대해__ 바이 패스를 사용하도록 설정하면 개발 단계에서 작동하지만 실제 환경에서는 도움이되지 않습니다.

### 사용해보기

우리의 설치 단계가 어떻게 진행되었는지 봅시다. 안전을 위해 DevTools의 응용 프로그램 패널에있는 __Clear site data__ 버튼을 사용하여 모든 것을 지우고 새로 시작하는지 확인하십시오. 이전에 앱을 설치했다면 앱을 제거해야합니다. 그렇지 않으면 설치 아이콘이 다시 표시되지 않습니다.

#### 설치 단추가 표시되는지 확인하십시오

먼저 설치 아이콘이 제대로 표시되는지 확인하고 데스크톱과 모바일 모두에서이 기능을 사용해보십시오.

1. Open the URL in a new Chrome tab.
2. Open Chrome's three-dot menu (next to the address bar).
▢ Verify you see "*Install Weather...*" in the menu.
3. Refresh the weather data using the refresh button in the upper right corner to ensure we meet the  [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria).
▢ Verify the install icon is visible in the app header.

#### 설치 단추 작동 확인

다음으로 모든 것이 제대로 설치되고 이벤트가 제대로 시작되는지 확인해 보겠습니다. 데스크톱 또는 모바일에서이 작업을 수행 할 수 있습니다. 모바일에서이를 테스트하려면 콘솔에 기록 된 내용을 볼 수 있도록 원격 디버깅을 사용해야합니다.

1. Chrome을 열고 새 브라우저 탭에서 날씨 PWA로 이동합니다.
2. DevTools를 열고 콘솔 창으로 전환하십시오.
3. 오른쪽 상단 모서리에있는 설치 단추를 누르십시오. install 설치 단추가 사라지는 지 확인하십시오. install 설치 모달 대화 상자가 표시되는지 확인하십시오.
4. 취소를 클릭하십시오.
▢ 콘솔 출력에 &quot;* 사용자가 A2HS 프롬프트를 무시했습니다 *&quot;가 표시되는지 확인하십시오. install 설치 버튼이 다시 나타나는지 확인하십시오.
5. 설치 단추를 다시 누른 다음 모달 대화 상자에서 설치 단추를 누르십시오. console &quot;* 사용자가 A2HS 프롬프트를 허용 함 *&quot;이 콘솔 출력에 표시되는지 확인하십시오. &quot;&quot;* 날씨 응용 프로그램이 설치되었습니다 * &quot;가 콘솔 출력에 표시되는지 확인하십시오. Weather 날씨 앱이 일반적으로 앱을 찾을 수있는 장소에 추가되었는지 확인합니다.
6. 날씨 PWA를 시작하십시오. app 앱이 데스크톱의 앱 창이나 모바일의 전체 화면에서 독립 실행 형 앱으로 열리는 지 확인합니다.

로컬 호스트에서 데스크톱을 실행중인 경우 로컬 호스트가 보안 호스트로 간주되지 않으므로 설치된 PWA에 주소 배너가 표시 될 수 있습니다.

#### iOS 설치가 제대로 작동하는지 확인하십시오

iOS에서 동작을 확인해 봅시다. iOS 기기가있는 경우이 기기를 사용하거나 Mac을 사용하는 경우 Xcode와 함께 제공되는 iOS 시뮬레이터를 사용해보십시오.

1. Safari를 열고 새 브라우저 탭에서 Weather PWA로 이동하십시오.
2. * Share *!를 클릭하십시오. [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png) 버튼.
3. 오른쪽으로 스크롤하고 *홈 화면에 추가* 버튼을 클릭하십시오. title 제목, URL 및 아이콘이 올바른지 확인하십시오.
4. * 추가를 클릭하십시오. * app 응용 프로그램 아이콘이 홈 화면에 추가되었는지 확인하십시오.
5. 홈 화면에서 날씨 PWA를 시작합니다. app 앱이 전체 화면으로 실행되는지 확인합니다.

### 보너스 : 앱이 홈 화면에서 시작되는지 감지

`display-mode` 미디어 쿼리를 사용하면 앱 시작 방식에 따라 스타일을 적용하거나 JavaScript로 시작된 방식을 결정할 수 있습니다.

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

또한 확인할 수 있습니다 `display-mode` 미디어 쿼리 [JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) .

### 보너스 : PWA 제거

앱이 이미 설치되어있는 경우 `beforeinstallevent` 이 실행되지 않으므로 개발 중에 앱이 여러 번 설치 및 제거되어 모든 것이 제대로 작동하는지 확인하십시오.

#### Android

Android의 경우 설치된 다른 응용 프로그램을 제거하는 것과 동일한 방식으로 PWA가 제거됩니다.

* 앱 서랍을 엽니 다.
* 아래로 스크롤하여 날씨 아이콘을 찾습니다.
* 앱 아이콘을 화면 상단으로 드래그하십시오.
* 제거 *를 선택하십시오.*

#### ChromeOS

ChromeOS에서 시작 프로그램 검색 창에서 PWA를 쉽게 제거 할 수 있습니다.

* 실행기를 엽니 다.
* &quot;* 날씨 *&quot;를 검색 상자에 입력하면 Weather PWA가 결과에 나타나야합니다.
* Weather PWA를 오른쪽 클릭 (alt-click)하십시오.
* Chrome에서 *제거 ...를 클릭합니다.*

#### macOS 및 Windows

Mac 및 Windows에서 PWAs는 Chrome을 통해 제거해야합니다.

* 새 브라우저 탭에서 chrome://apps를 엽니 다.
* Weather PWA를 오른쪽 클릭 (alt-click)하십시오.
* Chrome에서 *제거를 클릭합니다...*

## 축하

축하합니다. 첫 번째 프로그레시브 웹 앱을 성공적으로 만들었습니다!

웹 응용 프로그램 매니페스트를 추가하여 설치가 가능하도록하고 PWA가 항상 빠르고 안정적인지 확인하기 위해 서비스 작업자를 추가했습니다. DevTools를 사용하여 앱을 감사하는 방법과 사용자 경험을 향상시키는 데 도움이되는 방법을 배웠습니다.

웹 앱을 프로 그래 시브 웹 앱으로 전환하는 데 필요한 주요 단계를 알았습니다.

### 추가 읽기

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### 참조 문서

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## 문제가 있거나 의견이 있습니까? {: .hide-from-toc }

오늘 [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) 을 제출하면 코드 연구소를 개선하는 데 [issue](https://github.com/googlecodelabs/your-first-pwapp/issues) 됩니다. 그리고 감사합니다!

{% include "web/_shared/translation-end.html" %}
