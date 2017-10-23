project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 애플리케이션 셸 아키텍처는 웹의 연결성과 검색 기능을 저해하지 않고 UI를 로컬로 유지하고 콘텐츠를 동적으로 로드합니다.

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-09-27 #}

# 앱 셸 모델 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**애플리케이션 셸**(또는 앱 셸) 아키텍처는
Progressive Web App을 빌드하는 방법 중 하나입니다. Progressive Web App은 네이티브 애플리케이션과 유사하게 사용자
화면에
안정적이고 즉각적으로 로드됩니다.

앱 '셸'은 사용자 인터페이스를 구동하는 데 필요한 최소한의 HTML, CSS 및 자바스크립트입니다.
오프라인으로 캐시되면 재방문하는 사용자에게 **즉각적이고 안정적이며 우수한
성능**을 보장할 수 있습니다. 즉, 애플리케이션 셸은
사용자가 방문할 때마다 네트워크에서 로드되지 않습니다. 필요한 콘텐츠만
네트워크에서 로드합니다.

자바스크립트가 많이 사용된 아키텍처로 만든 [단일 페이지
애플리케이션](https://en.wikipedia.org/wiki/Single-page_application)의 경우
애플리케이션 셸은 이동(go-to) 접근방식을 사용합니다. 이 접근방식은
공격적으로 셸을 캐싱하여([서비스
워커](/web/fundamentals/primers/service-worker/) 사용) 애플리케이션을
실행합니다. 그 다음에는 자바스크립트를 사용하여 각 페이지에 동적 콘텐츠를 로드합니다. 앱
셸은 네트워크 없이 첫 HTML을 화면에 빠르게 가져오는 데
유용합니다.


<img src="images/appshell.png" alt="Application Shell architecture">


다시 말해, 앱 셸은 기본 앱 작성 시에 여러분이
앱 스토어에 게시하는 코드 번들과 유사합니다. 앱 셸은 UI의 뼈대이자
앱을 시작하는 데 필요한
핵심 구성 요소이지만 대개 데이터는 포함하지 않습니다.

참고: [첫 Progressive Web
App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
코드랩을 사용하여 날씨 앱의 첫 번째 애플리케이션 셸을
설계하고 구현하는 방법을 자세히 배워보세요. [앱 셸
모델로 즉시 로드](https://www.youtube.com/watch?v=QhUzmR8eZAo)
동영상에서도 이 패턴을 단계별로 설명합니다.

### 앱 셸 모델을 사용하는 경우

PWA를 빌드한다고 해서 처음부터 시작해야 할 필요는 없습니다. 최신 단일 페이지 앱을
빌드하고 있다면 이름이 어떤지와는 관계없이 아마 앱 셸과 유사한 무언가를
사용하고 있을 것입니다. 사용하는 라이브러리나 프레임워크에 따라
세부사항은 달라질 수 있지만 개념 자체는
프레임워크와는 독립적입니다.

애플리케이션 셸 아키텍처는 내비게이션은 비교적 변화가 없지만 콘텐츠는 변화하는
앱과 사이트에 가장 적합합니다. 많은 최신
자바스크립트 프레임워크와 라이브러리는 이미 애플리케이션 로직과
콘텐츠를 분리하여 아키텍처를 더욱 간단히 적용하도록 권장하고 있습니다.
정적 콘텐츠만 있는 특정 클래스의 웹사이트에서는 여전히
같은 모델을 따를 수 있지만 사이트는 100% 앱 셸입니다.

Google이 앱 셸 아키텍처를 어떻게 빌드하는지 보려면
[Google I/O 2016 Progressive Web App 빌드](/web/showcase/2016/iowa2016)를 참조하세요.
이 실제 앱은 SPA로 시작해서 PWA를 생성합니다. 이 PWA는 서비스 워커를 사용하여
콘텐츠를 미리 캐시하고, 새로운 페이지를 동적으로 로드하고,
뷰를 적절히 전환하고, 첫 번째 로드 이후 콘텐츠를 재사용합니다.

### 혜택 {: #app-shell-benefits }

서비스 워커를 포함하는 앱 셸 아키텍처의 장점:

- **일관적으로 빠른 신뢰할 수 있는 성능**. 재방문 시
    매우 빠릅니다.  정적 자산과 UI(예: HTML, 자바스크립트, 이미지
    및 CSS)는 첫 번째 방문에서 캐시되어 재방문 시
    즉시 로드됩니다. 콘텐츠는 첫 번째 방문에서 캐시될 수 있지만
    일반적으로는 필요에 따라 로드됩니다.

- **네이티브에 가까운 상호작용**. 앱 셸 모드를 도입하면
    오프라인 지원이 갖추어진, 네이티브 애플리케이션에 가까운 즉각적인 내비게이션과 상호작용이 가능한
    경험을 구현할 수 있습니다.

- **데이터의 경제적인 사용**. 필수가 아닌 목록 파일(예를 들어, 모든 페이지에서 표시되지 않는 큰 이미지)로
    인해 브라우저가 실제 필요한 것보다 더 많은 데이터를
    다운로드하기 때문에 최소 데이터 사용을 목적으로 설계하고 무엇을
    캐시할지 신중히 선택해야 합니다. 데이터는 서구 국가에서 비교적 저렴하지만
    연결 비용과 데이터가 비싼 이머징 마켓에서는
    그렇지 못합니다.

## 요구사항 {: #app-shell-requirements }

이상적인 앱 셸:

- 빠른 로드
- 최대한 적은 데이터 사용
- 로컬 캐시에서 정적 자산 사용
- 내비게이션과 콘텐츠 분리
- 페이지별 콘텐츠(예: HTML, JSON) 검색 및 표시
- 선택적으로 동적 콘텐츠 캐싱

앱 셸은 UI를 로컬로 유지하고
API를 통해 콘텐츠를 동적으로 가져오지만 웹의 연결성과 검색 기능을 저해하지 않습니다. 다음에
사용자가 앱에 액세스하면 가장 최신 버전이 자동으로 표시됩니다.
사용 전에 새로운 버전을 다운로드할 필요가 없습니다.

참고: [Lighthouse](https://github.com/googlechrome/lighthouse) 감사
확장 프로그램을 사용하여 앱 셸을 사용하는 PWA가 높은 성능 기준을
충족하는지 확인할 수 있습니다. [To the
Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E)는
이 도구를 사용하여 PWA 최적화를 단계별로 설명합니다.

## 앱 셸 빌드 {: #building-your-app-shell }

폐이지 셸과 동적 콘텐츠가 명확히 구분되도록 앱 구조를
설계합니다. 일반적으로 앱은 최대한 단순한 셸을 로드하면서도
최초 다운로드에서 의미 있는 페이지 콘텐츠를 충분히 포함해야 합니다. 각 데이터 소스에서
속도와 데이터 최신 상태 사이에
적절한 균형을 잡습니다.


<figure>
<img src="images/wikipedia.jpg" alt="Offline Wikipedia app using an
application shell with content caching">
<figcaption data-parent-segment-id="475225">Jake Archibald의 <a
href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">오프라인 Wikipedia
애플리케이션</a>은 앱 셸 모델을 사용하는 PWA의 모범적 사례입니다. 재방문 시에 즉시 로드하지만 JS를 사용해서 콘텐츠를 동적으로
가져옵니다. 이후 방문에서 이 콘텐츠는 오프라인으로 캐시됩니다.
</figcaption>
</figure>


### 앱 셸의 예시 HTML {: #example-html-for-appshell }

이 예시는 핵심 애플리케이션 인프라 및 UI를 데이터와 구분합니다.
최초 로드를 최대한 단순하게 유지하여
웹 앱이 열리는 즉시 페이지 레이아웃만 표시하는 것이 중요합니다. 일부는
애플리케이션의 색인 파일(인라인 DOM, 스타일)에서 가져오고 나머지는
외부 스크립트와 스타일 시트에서 로드합니다.

모든 UI와 인프라는 서비스 워커를 사용하여 로컬에서 캐시되므로
다음에 로드할 때는 모든 것을 로드하지 않고 새로운 데이터나 변경된 데이터만
검색합니다.

작업 디렉토리의 `index.html` 파일은 다음 코드와
같아야 합니다. 이는 실제 콘텐츠의 일부이고 완전한
색인 파일이 아닙니다. 어떤 코드가 있는지 살펴보겠습니다.

- 내비게이션과 콘텐츠 자리표시자가 포함된 사용자 인터페이스의 '뼈대'에 사용되는 HTML과 CSS.
- 내비게이션과 UI 로직을 처리하는 외부 자바스크립트 파일(app.js)과서버에서 검색한 게시물을 표시하고 IndexedDB와 같은 저장소
메커니즘을 사용하여 로컬에 저장하는코드.
- 오프라인 기능을 활성화하는 웹 앱 매니페스트와 서비스 워커 로더.


<div class="clearfix"></div>


```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>App Shell</title>
  <link rel="manifest" href="/manifest.json">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Shell</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>

<body>
  <header class="header">
    <h1 class="header__title">App Shell</h1>
  </header>
  
  <nav class="nav">
  ...
  </nav>
  
  <main class="main">
  ...
  </main>

  <div class="dialog-container">
  ...
  </div>

  <div class="loader">
    <!-- Show a spinner or placeholders for content -->
  </div>

  <script src="app.js" async></script>
  <script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
  </script>
</body>
</html>
```


<div class="clearfix"></div>


참고: [https://app-shell.appspot.com/](https://app-shell.appspot.com/)에서
애플리케이션 셸과 서버측 콘텐츠 렌더링을 사용하는 매우 단순한 PWA의 실제 모습을
살펴보세요. 앱 셸은
<a href="https://www.youtube.com/watch?v=srdKq0DckXQ">모든 프레임워크에 적용되는 Progressive
Web App
</a>에서 다룬 모든 라이브러리 또는 프레임워크를 사용하여 구현할 수 있습니다. Polymer(<a
href="https://shop.polymer-project.org">Shop</a>)와 React(<a
href="https://github.com/insin/react-hn">ReactHN</a>,
<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>)를
사용한 샘플이 있습니다.

### 애플리케이션 셸 캐싱 {: #app-shell-caching }

앱 셸은 직접 작성한 서비스 워커 또는
[sw-precache](https://github.com/googlechrome/sw-precache)와 같은
정적 자산 사전 캐싱 도구를 사용하여 생성한 서비스 워커로 캐시할 수 있습니다.

참고: 이 예시는 일반적인 정보와 설명을 제공하기 위한 목적으로만
사용됩니다. 실제 사용되는 리소스는 대개 애플리케이션마다
다릅니다.

#### 앱 셸 수동 캐싱

다음은
서비스 워커의 `install` 이벤트를 사용하여 앱 셸의 정적 리소스를 [Cache
API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)로
캐시하는 예시 코드입니다.

```
var cacheName = 'shell-content';
var filesToCache = [
  '/css/styles.css',
  '/js/scripts.js',
  '/images/logo.svg',

  '/offline.html’,

  '/’,
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

#### sw-precache를 사용하여 앱 셸 캐시

sw-precache가 생성한 서비스 워커가 빌드 프로세스에서 구성한
리소스를 캐시하고 서비스를 제공합니다. 앱 셸을 구성하는 모든
HTML, 자바스크립트 및 CSS 파일에서 리소스를 미리 캐시할 수 있습니다. 모든 것이
오프라인에서도 작동하고 추가적인 노력 없이도 다음 방문 시 빠르게 로드됩니다.

다음은
[gulp](http://gulpjs.com) 빌드 프로세스에서 sw-precache를 사용하는 기본적 예시입니다.

```
gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});
```

정적 자산 캐싱에 대한 자세한 내용은 [sw-precache로 서비스 워커
추가](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)
코드랩을 참조하세요.

참고: sw-precache는 정적 리소스를 오프라인으로 캐시하는 데 유용합니다. 런타임/동적 리소스의 경우
무료 라이브러리
[sw-toolbox](https://github.com/googlechrome/sw-toolbox)를 사용하는 것이 좋습니다.

## 결론 {: #conclusion }

서비스 워커를 사용하는 앱 셸은 오프라인 캐싱을 위한 강력한 패턴일 뿐만 아니라
재방문 시 즉시 로드하는 방식으로 PWA에 상당한 성능
향상을 제공합니다. 애플리케이션 셸을 캐시하여
오프라인에서 작동하게 하고 자바스크립트로 콘텐츠를 채울 수 있습니다.

최종적으로는 콘텐츠를 네트워크에서 가져오더라도, 재방문 시 네트워크 없이 화면에 의미 있는 픽셀을
표시할 수 있습니다.
