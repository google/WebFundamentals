project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이 코드랩에서는 무척 느린 네트워크에서도 빠르게 로드되고 홈 화면에 아이콘이 있고 최상위의 전체 화면 환경으로 로드되는 Progressive Web App을 빌드합니다.

{# wf_updated_on: 2017-01-05T16:32:36Z #}
{# wf_published_on: 2016-01-01 #}


# 여러분의 첫 Progressive Web App {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



## 소개




[Progressive Web App](/web/progressive-web-apps)은 웹의 장점과 앱의 장점을 결합한 환경입니다. 이것은 사용자가브라우저 탭을 맨 처음 방문할 때부터 유용하며, 설치가 필요 없습니다. 시간의 흐름에 따라 사용자가 앱과의 관계를 점진적으로 쌓아갈수록 성능이 더욱 강력해질 것입니다. 이 웹 앱은 느린 네트워크에서도 빠르게 로드되고, 관련된 푸시 알림을 전송하며, 홈 화면에 아이콘이 있고, 최상위의 전체 화면 환경으로 로드됩니다.

### Progressive Web App이란?

Progressive Web App의 특징은 다음과 같습니다.

* __프로그레시브__ - 점진적인 개선을 통해 작성되므로, 어떤 브라우저를 선택하든 상관없이 모든 사용자에게 적합합니다.
* __반응형__ - 데스크톱, 모바일, 태블릿 등 모든 폼 팩터에 맞습니다.
* __연결 독립적__ - 서비스 워커를 사용하여 오프라인이나 느린 네트워크에서 작동하도록 향상됩니다.
* __앱과 유사__ - 앱 셸 모드에서 작성되기 때문에 앱 스타일의 상호작용 및 탐색 기능을 사용자에게 제공합니다.
* __최신 상태__ - 서비스 워커 업데이트 프로세스 덕분에 항상 최신 상태로 유지됩니다.
* __안전__ - HTTPS를 통해 제공되므로 스누핑이 차단되며, 콘텐츠가 변조되지 않도록 보장합니다.
* __검색 가능__ - W3C 매니페스트 및 서비스 워커 등록 범위 덕분에 '애플리케이션'으로 식별되므로, 검색 엔진에서 검색이 가능합니다.
* __재참여 가능__ - 푸시 알림과 같은 기능을 통해 쉽게 재참여가 가능합니다.
* __설치 가능__ - 앱 스토어에서 씨름할 필요 없이 사용자가 자신에게 가장 유용한 앱을 홈 화면에 유지할 수 있습니다.
* __링크 연결 가능__ - URL을 통해 손쉽게 공유할 수 있으며 복잡한 설치 작업이 불필요합니다.

이 코드랩에서는 Progressive Web App을 만드는 방법을 안내하며, 여기에는 Progressive Web App의 주요 원칙을 앱이 충족하도록 보장하는 디자인적인 고려 사항과 구체적인 구현 내용이 포함됩니다.

### 어떤 앱을 만들어 볼까요?

이 코드랩에서는 Progressive Web
App 기법을 사용하여 날씨 웹 앱을 빌드해 보겠습니다. Progressive Web App의 속성을 살펴보겠습니다.

* **프로그레시브** - 전반적으로 점진적인 개선을 사용
* **반응형** - 모든 폼 팩터에 맞도록 보장
* **연결** 독립적 - 서비스 워커를 사용하여 앱 셸 캐시
* **앱과 유사** - 앱 스타일의 상호작용을 사용하여 도시를 추가하고 데이터를 새로 고침
* **최신 상태** - 서비스 워커 업데이트로 최신 데이터 캐시
* **안전** - HTTPS를 지원하는 호스트에 앱을 배포
* **검색 가능 및 설치 가능** - 검색 엔진에서 쉽게 앱 검색이 가능하도록 매니페스트 포함
* **링크 가능** - 그래서 웹입니다!

### 배울 내용

* '앱 셸' 방식을 사용하여 앱을 디자인하고 구성하는 방법
* 앱이 오프라인으로 작동하도록 만드는 방법
* 나중에 오프라인 사용을 위해 데이터를 저장하는 방법

### 필요한 사항

* Chrome 52 이상
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 또는 자신이 직접 선택한 웹 서버
* 샘플 코드
* 텍스트 편집기
* HTML, CSS, 자바스크립트 및 Chrome DevTools에 대한 기본적인 지식

이 코드랩은 Progressive Web App에 초점을 맞추고 있습니다. 따라서 이와 관련 없는 개념과 코드 블록은 그냥 넘어가겠습니다. 단, 필요할 때 복사해서 붙여넣을 수 있도록 다른 설명 없이 제공만 해드리겠습니다.


## 준비 작업




### 코드 다운로드

다음 버튼을 클릭하면 이 코드랩을 위한 모든 코드를 다운로드할 수 있습니다.

[링크](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

다운로드한 zip 파일을 푸세요. 그러면 루트 폴더(`your-first-pwapp-master`)가 풀릴 것이고, 그 안에 이 코드랩의 각 단계마다 필요한 폴더 하나씩과 그 과정에서 필요한 모든 리소스가 들어 있습니다.

`step-NN` 폴더에는 코드랩의 각 단계에서 도달하고자 하는 최종 완성 코드가 들어 있으므로 참조하실 수 있습니다. 모든 코딩 작업은 `work` 디렉토리에서 수행하겠습니다.

### 웹 서버 설치 및 인증

자체 웹 서버를 사용해도 되지만 이 코드랩은 Chrome Web Server에서 잘 돌아가도록 고안되어 있습니다. 이 앱을 아직 설치하지 않으셨다면 Chrome 웹 스토어에서 설치할 수 있습니다.

[링크](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Web Server for Chrome 앱을 설치한 후 북마크바에서 Apps 단축키를 클릭하세요. 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

확인하는 창에서 Web Server 아이콘을 클릭하세요. 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

그러면 아래 대화상자가 나타나는데, 여기서 로컬 웹 서버를 구성할 수 있습니다.

![433870360ad308d4.png](img/433870360ad308d4.png)

__choose folder__ 버튼을 클릭하고 `work` 폴더를 선택하세요. 그러면 웹 서버 대화상자에 강조표시된 URL을 통해(__Web Server URL(s)__ 섹션) 진행 중인 작업을 제공할 수 있습니다.

아래 그림과 같이, Options 아래에서 'Automatically show index.html' 옆에 있는 확인란을 선택하세요.

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

그런 다음, 'Web Server: STARTED'라는 레이블로 표시된 전환 버튼을 왼쪽으로 밀었다가 다시 오른쪽으로 밀어 서버를 중지했다가 다시 시작하세요.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

이제는 웹브라우저에서 작업 사이트를 방문하세요(강조표시된 Web Server URL을 클릭). 그러면 다음과 같은 페이지가 나타날 것입니다.

![aa64e93e8151b642.png](img/aa64e93e8151b642.png)

이 앱은 아직은 뭔가 흥미로운 점이 전혀 없는 상태입니다. 아직까지는 웹 서버 기능을 확인하기 위해 사용할 스피너가 있는 최소한의 기본 골격에 불과합니다. 이후 단계에서 기능과 UI 요소를 추가해나갈 것입니다. 


## 앱 셸 설계




### 앱 셸이란?

앱의 셸은 Progressive Web App의 사용자 인터페이스를 구동하는 데 필요한 최소한의 HTML, CSS 및 자바스크립트이며, 안정적인 성능을 보장해주는 여러 구성 요소 중 하나입니다. 첫 로드가 극히 빠르고 즉시 캐시되어야 합니다. '캐시된다'는 것은 셸 파일이 네트워크를 통해 한 번 로드되고 나면 로컬 기기에 저장된다는 의미입니다. 그리고 이후에 사용자가 앱을 열 때마다 로컬 기기의 캐시에서 셸 파일이 로드되므로 시작 시간이 매우 빨라집니다. 

앱 셸 아키텍처는 핵심 애플리케이션 인프라 및 UI와 데이터를 구분합니다. 모든 UI 및 인프라는 서비스워커를 사용하여 로컬로 캐시되므로, 이후의 로드에서 Progressive Web App은 모든 것을 로드하는 대신 필요한 데이터만 검색하면 됩니다.

![156b5e3cc8373d55.png](img/156b5e3cc8373d55.png)

다시 말해, 앱 셸은 기본 앱 작성 시에 여러분이 앱 스토어에 게시하는 코드 번들과 유사합니다. 앱 셸은 앱을 시작하는 데 필요한 핵심 구성 요소이지만 대개 데이터는 포함하지 않습니다.

### 앱 셸 아키텍처를 사용하는 이유

앱 셸 아키텍처를 사용하면 속도에 집중할 수 있으며 기본 앱과 유사한 속성을 Progressive Web App에 제공할 수 있습니다. 즉, 앱 스토어 필요 없이 즉시 로드와 정기 업데이트가 가능합니다.

### 앱 셸 디자인 

첫 단계는 디자인을 핵심 구성 요소로 구분하는 것입니다.

스스로에게 물어보세요.

* 어떤 것이 화면에 즉시 표시되어야 합니까?
* 어떤 다른 UI 구성 요소가 우리의 앱에 필수적입니까?
* 어떤 지원 리소스가 앱 셸에 필요합니까? 예: 이미지, 자바스크립트, 스타일 등

우리의 첫 번째 Progressive Web App으로 날씨 앱을 만들어 보겠습니다. 핵심 구성 요소는 다음과 같습니다.

* 제목이 있는 헤더, 추가/새로 고침 버튼
* 예보 카드용 컨테이너
* 예보 카드 템플릿
* 새 도시를 추가하기 위한 대화상자
* 로딩 표시기

복잡한 앱을 디자인하는 경우, 초기 로드에 필요없는 콘텐츠는 나중에 요청될 수 있으며 향후 사용을 위해 캐시에 저장될 수 있습니다. 예를 들어, 우리는 최초 실행 환경의 렌더링을 마치고 어느 정도의 유휴 주기가 있기 전까지는New City 대화상자의 로딩을 지연시킬 수 있습니다.


## 앱 셸 구현




프로젝트를 시작하는 여러 가지 방법이 있으며 일반적으로 우리는 Web Starter Kit 사용을 권장합니다. 그러나 이 경우에는 프로젝트를 최대한 단순하게 유지하고 Progressive Web App에 집중하기 위해, 우리는 여러분에게 필요한 모든 리소스를 제공합니다.

### 앱 셸의 HTML 만들기

이제, [앱 셸 설계](/web/fundamentals/getting-started/your-first-progressive-web-app/step-01)에서 설명한 핵심 구성 요소를 추가하겠습니다.

앞서 말한 것처럼, 핵심 구성 요소는 다음과 같습니다.

* 제목이 있는 헤더, 추가/새로 고침 버튼
* 예보 카드용 컨테이너
* 예보 카드 템플릿
* 새 도시를 추가하기 위한 대화상자
* 로딩 표시기

이미 `work` 디렉토리에 있는 `index.html` 파일은 다음과 같은 형태여야 하며, 이것은 실제 콘텐츠의 일부이므로 이 코드를 파일에 복사하지는 마세요.

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather PWA</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather PWA</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main">
    <div class="card cardTemplate weather-forecast" hidden>
    . . .
    </div>
  </main>

  <div class="dialog-container">
  . . .
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
```

기본적으로 로더가 표시됩니다. 이렇게 하면 페이지가 로드될 때 사용자가 즉시 로더를 볼 수 있으므로, 콘텐츠가 로드 중임을 사용자가 확실히 알 수 있습니다.

시간을 줄이기 위해 우리는 여러분이 사용할 스타일시트도 이미 만들었습니다.

### 주요 자바스크립트 앱 코드 체크아웃

이제 대부분의 UI가 준비되었으므로, 동작을 확인하기 위해 코드를 서로 연결해 보겠습니다. 앱 셸의 나머지 부분도 마찬가지로, 핵심 경험의 일환으로 어떤 코드가 필요한지 그리고 어떤 코드가 나중에 로드될 수 있는지를 유의하세요.

또한, 작업 디렉토리에 앱 코드(`scripts/app.js`)가 이미 포함되어 있으며, 그 코드에서 다음과 같은 것을 찾을 수 있을 것입니다.

* 앱에 필요한 핵심 정보를 포함하는 `app` 객체
* 헤더에 있는 모든 버튼에 대한 이벤트 리스너(`add/refresh`/) 및 도시 추가 대화상자(/`add/cancel`)
* 예보 카드를 추가하거나 업데이트하는 메서드(`app.updateForecastCard`)
* Firebase Public Weather API에서 최신 날씨 예보 데이터를 가져오는 메서드(`app.getForecast`)
* 현재 카드를 반복하고 `app.getForecast`를 호출하여 최신 예보 데이터를 가져오는 메서드(`app.updateForecasts`)
* 렌더링 방식을 신속하게 테스트할 때 사용할 수 있는 모조 데이터(`initialWeatherForecast`)

### 테스트

이제 핵심 HTML, 스타일 및 자바스크립트가 있으므로 앱을 테스트할 차례입니다.

모조 날씨 데이터가 어떻게 렌더링되는지 보려면 `index.html` 파일 하단에서 다음 줄의 주석 처리를 제거하세요.

    <!--<script src="scripts/app.js" async></script>-->

그 다음, `app.js` 파일 맨 아래에서 다음 줄의 주석 처리를 제거하세요.

    // app.updateForecastCard(initialWeatherForecast);

앱을 새로 고치세요. (모조 데이터이긴 하지만 날짜를 표시할 수 있으므로) 다음과 같이 스피너가 비활성화된 상태로 보기 좋은 형식을 갖춘 예보 카드가 나타나야 합니다.

![166c3b4982e4a0ad.png](img/166c3b4982e4a0ad.png)

[링크](https://weather-pwa-sample.firebaseapp.com/step-04/)

시도해보고 예상한 대로 작동하는 것을 확인했으므로, 모조 데이터를 포함한 `app.updateForecastCard`에 대한 호출을 다시 삭제할 수 있습니다. 모든 것이 예상대로 작동했는지 확인하기 위해 필요했을 뿐이기 때문입니다.


## 빠른 최초 로드로 시작하기




Progressive Web App은 빠르게 시작되어야 하며 즉시 사용할 수 있어야 합니다. 현재 상태에서 날씨 앱은 신속하게 시작되지만 사용이 가능하지는 않습니다. 데이터가 없습니다. 이 데이터를 가져오기 위해 AJAX 요청을 수행할 수 있지만, 그럴 경우 추가적인 요청이 필요하게 되고 초기 로드가 더 길어집니다. 그 대신, 최초 로드 시에 실제 데이터를 제공합니다.

### 날씨 예보 데이터 주입

이 코드랩에서는 날씨 예보를 자바스크립트로 직접 주입하는 서버를 시뮬레이션하지만, 프로덕션 앱에서 최신 날씨 예보 데이터는 사용자의 IP 주소 위치 정보에 따라 서버에 의해 주입됩니다.

코드에는 우리가 주입하려는 데이터가 이미 포함되어 있습니다. 이전 단계에서 사용한 것이 바로 `initialWeatherForecast`입니다.

### 최초 실행 구별

그러나 이 정보의 표시 시기를 우리가 어떻게 알 수 있을까요? 이 정보는 날씨 앱을 캐시로부터 가져오는 향후 로드 시에는 관련이 없을 수도 있습니다. 사용자가 향후 방문 시에 앱을 로드할 때는 도시가 바뀌었을 수 있으므로, 우리는 사용자가 이전에 조회했던 첫 번째 도시가 아닌 바뀐 도시에 대한 정보를 로드해야 합니다.

사용자 기본 설정(예: 사용자가 구독했던 도시의 목록)은 IndexedDB 또는 다른 고속 저장소 메커니즘을 사용하여 로컬로 저장되어야 합니다. 코드랩을 최대한 단순화하기 위해 우리는 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)를 사용했습니다. 이것은 프로덕션 앱에는 적합하지 않은데 그 이유는 일부 기기에서 매우 느릴 가능성이 있는 동기식 차단 저장소 메커니즘이기 때문입니다.

먼저, 사용자 기본 설정을 저장하는 데 필요한 코드를 추가해보겠습니다. 코드에서 다음 TODO 주석을 찾으세요.

```
  // TODO add saveSelectedCities function here
```

그리고 주석 아래에 다음 코드를 추가하세요.

```
  // Save list of cities to localStorage.
  app.saveSelectedCities = function() {
    var selectedCities = JSON.stringify(app.selectedCities);
    localStorage.selectedCities = selectedCities;
  };
```

다음은 이 사용자가 저장한 도시가 있는지를 확인하고, 이 도시를 렌더링하거나 주입된 데이터를 사용하는 시작 코드를 추가해보겠습니다. 다음 주석을 찾으세요.

```
  // TODO add startup code here
```

그리고 이 주석 아래에 다음 코드를 추가하세요.

```
/************************************************************************
   *
   * Code required to start the app
   *
   * NOTE: To simplify this codelab, we've used localStorage.
   *   localStorage is a synchronous API and has serious performance
   *   implications. It should not be used in production applications!
   *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
   *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
   ************************************************************************/

  app.selectedCities = localStorage.selectedCities;
  if (app.selectedCities) {
    app.selectedCities = JSON.parse(app.selectedCities);
    app.selectedCities.forEach(function(city) {
      app.getForecast(city.key, city.label);
    });
  } else {
    /* The user is using the app for the first time, or the user has not
     * saved any cities, so show the user some fake data. A real app in this
     * scenario could guess the user's location via IP lookup and then inject
     * that data into the page.
     */
    app.updateForecastCard(initialWeatherForecast);
    app.selectedCities = [
      {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
    ];
    app.saveSelectedCities();
  }
```

시작 코드는 로컬 저장소에 저장된 도시가 있는지 확인합니다. 저장된 도시가 있으면 시작 코드가 로컬 저장소 데이터를 파싱한 다음 저장된 각 도시에 대한 예보 카드를 표시합니다. 아니면, 시작 코드는 단지 모조 예보 데이터를 사용하고 그 도시를 기본 도시로 저장합니다.

### 선택한 도시 저장

마지막으로, 'add city' 버튼 핸들러를 수정하여 선택한 도시를 로컬 저장소에 저장해야 합니다.

다음 코드와 일치하도록 `butAddCity` 클릭 핸들러를 업데이트하세요.

```
document.getElementById('butAddCity').addEventListener('click', function() {
    // Add the newly selected city
    var select = document.getElementById('selectCityToAdd');
    var selected = select.options[select.selectedIndex];
    var key = selected.value;
    var label = selected.textContent;
    if (!app.selectedCities) {
      app.selectedCities = [];
    }
    app.getForecast(key, label);
    app.selectedCities.push({key: key, label: label});
    app.saveSelectedCities();
    app.toggleAddDialog(false);
  });
```

새로 추가된 것은 `app.selectedCities`(존재하지 않는 경우)의 초기화와 `app.selectedCities.push()` 및 `app.saveSelectedCities()`에 대한 호출입니다.

### 테스트

* 최초 실행 시에, 앱은 `initialWeatherForecast` 사용자에게 즉시 예보를 표시해야 합니다.
* (오른쪽 위에서 + 아이콘을 클릭하여) 새 도시를 추가하고 두 개의 카드가 표시되는지 확인합니다.
* 브라우저를 새로 고치고, 두 예보가 앱에 로드되고 최신 정보가 표시되는지 확인합니다.

[링크](https://weather-pwa-sample.firebaseapp.com/step-05/)


## 서비스 워커를 사용하여 앱 셸을 사전 캐시




Progressive Web App은 빠르고 설치가 가능해야 합니다. 즉, 온라인과 오프라인으로 작동하고 간헐적인 연결이나 느린 연결에서 작동해야 합니다. 이를 실현하기 위해 우리는 서비스 워커를 사용하여 앱 셸을 캐시하므로, 신속하고 안정적으로 항상 앱 셸을 사용할 수 있습니다.

서비스 워커에 익숙하지 않다면, [서비스 워커 소개](/web/fundamentals/primers/service-worker/)를 읽고 서비스 워커의 기능과 수명 주기 및 제한사항에 대해 기본적인 내용들을 이해할 수 있습니다. 이 코드랩을 완료한 후 서비스 워커로 작업하는 방법을 더 깊이 알고 싶으면 [서비스 워커 디버깅 코드랩](https://goo.gl/jhXCBy)을 확인해 보세요.

서비스 워커를 통해 제공되는 기능은 점진적 기능 개선으로 간주되어야 하며, 브라우저에 의해 지원되는 경우에만 기능이 추가되어야 합니다. 예를 들어, 서비스 워커를 가지고 앱 셸과 앱 데이터를 캐싱할 수 있으므로, 네트워크가 없는 경우에도 사용이 가능합니다. 서비스 워커가 지원되지 않는 경우 오프라인 코드가 호출되지 않으며, 기본적인 경험이 사용자에게 제공됩니다. 기능 검색을 사용하여 점진적 기능 개선을 제공할 경우, 오버헤드가 거의 없으며 또한 이 기능을 지원하지 않는 구형 브라우저를 방해하지 않습니다.

### 사용 가능한 경우 서비스 워커를 등록

앱이 오프라인에서 작동하도록 만드는 첫 번째 단계는 서비스 워커를 등록하는 것입니다. 서비스 워커는 열린 웹페이지나 사용자 상호작용이 없이도 백그라운드 기능을 허용하는 스크립트입니다.

이 작업은 간단한 두 단계로 이루어집니다.

1. 자바스크립트 파일을 서비스 워커로 등록하라고 브라우저에 알려줍니다.
2. 서비스 워커를 포함한 자바스크립트 파일을 만듭니다.

먼저, 브라우저가 서비스 워커를 지원하는지 여부를 확인해야 하며, 지원할 경우 이 서비스 워커를 등록합니다. 다음 코드를 `app.js`에 추가하세요(`// TODO add service worker code here` 주석 뒤에).

```
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
```

### 사이트 자산 캐시

서비스 워커가 등록되면, 사용자가 페이지를 처음 방문할 때 설치 이벤트가 트리거됩니다. 이 이벤트 처리기에서 우리는 애플리케이션에 필요한 모든 자산을 캐시합니다.

서비스 워커가 실행되면 [캐시](https://developer.mozilla.org/en-US/docs/Web/API/Cache) 객체를 열어야 하며, 앱 셸을 로드하는 데 필요한 자산을 채워야 합니다. 애플리케이션 루트 폴더(`your-first-pwapp-master/work` 디렉토리가 되어야 함)에 `service-worker.js`라는 파일을 생성합니다. 이 파일은 애플리케이션 루트에 상주해야 하는데, 그 이유는 서비스 워커의 범위는 이 파일이 있는 디렉토리에 의해 정의되기 때문입니다. 이 코드를 새 `service-worker.js` 파일에 추가합니다.

```
var cacheName = 'weatherPWA-step-6-1';
var filesToCache = [];

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

먼저, `caches.open()`으로 캐시를 열고 캐시 이름을 지정해야 합니다. 캐시 이름을 지정하면 파일에 버전을 지정할 수 있거나 앱 셸로부터 데이터를 구분할 수 있으므로, 다른 데이터에는 영향을 미치지 않고 쉽게 데이터를 업데이트할 수 있습니다.

캐시가 열리면 `cache.addAll()`을 호출할 수 있습니다. 이 메서드는 URL의 목록을 취하며, 서버에서 URL을 가져오고 응답을 캐시에 추가합니다. 안타깝게도 `cache.addAll()`은 가장 작은 단위이며, 파일이 하나라도 실패하면 전체 캐시 단계가 실패합니다!

자, 이젠 DevTools의 사용 방법을 익히기 시작하면서 서비스 워커를 이해하고 디버그해봅시다. 페이지를 새로 고치기 전에, 먼저 DevTools를 열고 __Application __패널의 __Service Worker __창으로 이동하세요. 다음과 같이 나타날 것입니다.

![ed4633f91ec1389f.png](img/ed4633f91ec1389f.png)

이처럼 빈 페이지가 나타난다는 것은 현재 열려 있는 페이지에 등록된 서비스 워커가 없다는 뜻입니다.

이제, 페이지를 새로 고쳐 보세요. 그러면 서비스 워커가 다음과 같이 나타날 것입니다.

![bf15c2f18d7f945c.png](img/bf15c2f18d7f945c.png)

이와 같은 정보가 나타나면 페이지에서 실행 중인 서비스 워커가 있다는 뜻입니다.

여기서 잠깐만 화제를 돌려 서비스 워커를 개발할 때 자칫 실수했을 때 부딪힐 수 있는 문제를 보여 드리겠습니다. 이 문제를 시연하기 위해 `service-worker.js` 파일의 `install` 이벤트 리스너 아래에 `activate` 이벤트 리스너를 추가해봅시다. 

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});
```

서비스 워커가 시작될 때 `activate` 이벤트가 발생합니다.

DevTools Console을 열고 페이지를 새로 고치고, Application 패널에서 Service Worker 창으로 전환한 다음, 활성화된 서비스 워커에서 inspect를 클릭합니다. 콘솔에 기록된 `[ServiceWorker] Activate` 메시지를 볼 수 있으리라 기대했겠지만 그런 일은 발생하지 않았습니다. Service Worker 창을 확인해보면 새로운 서비스 워커(활성화된 이벤트 리스너를 포함한 서비스 워커)가 'waiting' 상태에 있는 것으로 나타납니다.

![1f454b6807700695.png](img/1f454b6807700695.png)

기본적으로, 페이지에 대해 열려 있는 탭이 있는 한 기존 서비스 워커가 계속 페이지를 제어합니다. 따라서 페이지를 닫았다가 다시 열거나 __skipWaiting __버튼을 누를 *수도 있겠지만*, 보다 장기적 해결책은 그냥 DevTools의 Service Worker 창에서 __Update on Reload __확인란을 선택하는 방법입니다. 이 확인란을 선택하면 페이지를 새로 고칠 때마다 서비스 워커가 강제로 업데이트됩니다.

이제 __update on reload __확인란을 선택하고 페이지를 새로 고쳐 새 서비스 워커가 활성화되는지 확인하세요.

__참고:__ Application 패널의 Service Worker 창에서 아래에 나와 있는 것과 유사한 오류가 발생할 수 있지만, 이 오류를 무시해도 __무방합니다__.

![b1728ef310c444f5.png](img/b1728ef310c444f5.png)

결국 그 모든 것은 DevTools에서 서비스 워커를 검사하고 디버그하는 작업에 관한 내용입니다. 이후에 몇 가지 요령을 더 설명해 드리겠습니다. 이제 다시 앱 빌드하는 과정으로 돌아가 보죠.

`activate` 이벤트 리스너를 확장해 캐시 업데이트를 위한 로직을 포함해봅시다. 아래 코드와 일치하도록 코드를 업데이트하세요.

```
self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});
```

코드를 이렇게 변경하면 앱 셸 파일이 변경될 때마다 서비스 워커가 캐시를 업데이트합니다. 이 코드가 작동하도록 하려면 서비스 워커 파일 맨 위에서 `cacheName` 변수를 증가시킬 필요가 있습니다.

마지막 명령문은 아래의 정보 상자(옵션)에 대해 읽을 수 있는 특수한 상황을 수정하는 역할을 합니다.

마지막으로, 앱 셸에 필요한 파일 목록을 업데이트해 보겠습니다. 배열에서 앱에 필요한 모든 파일을 포함해야 합니다(예: 이미지, 자바스크립트, 스타일시트 등). `service-worker.js` 파일 맨 위쪽 근처에서 `var filesToCache = [];`를 아래 코드로 바꾸세요.

```
var filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];
```

앱이 아직은 오프라인에서 그다지 잘 작동하지 않습니다. 우리는 앱 셸 구성 요소를 캐시했지만, 아직도 로컬 캐시에서 로드해야 합니다.

### 캐시로부터 앱 셸 제공

서비스 워커는 Progressive Web App에서 생성된 요청을 가로채서 서비스 워커 내에서 처리하는 기능을 제공합니다. 즉, 요청을 처리하는 방법과 캐시된 응답의 제공 방법을 우리가 결정할 수 있습니다.

예:

```
self.addEventListener('fetch', function(event) {
  // Do something interesting with the fetch here
});
```

이제 캐시로부터 앱 셸을 제공해 보겠습니다. 다음 코드를 `service-worker.js` 파일의 맨 아래에 추가합니다.

```
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
```

안쪽에서 바깥으로 단계별로 실행하는 동안 `caches.match()`는 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 이벤트를 트리거했던 웹 요청을 평가하고, 이것을 캐시에서 사용 가능한지 확인합니다. 그런 다음, 캐시된 버전을 가지고 응답하거나 또는 `fetch`를 사용하여 네트워크에서 복사본을 가져옵니다. `response`가 `e.respondWith()`와 함께 웹페이지로 전달됩니다.

### 테스트

이제는 앱을 오프라인에서 사용할 수 있습니다! 직접 시험해봅시다.

페이지를 새로 고친 후 DevTools의 __Application__ 창에 있는 __Cache Storage__ 창으로 이동하세요. 그 섹션을 펼치면 왼쪽에 앱 셸 캐시의 이름이 나열되어 있을 것입니다. 자신의 앱 셸 캐시를 클릭하면 현재 캐시되어 있는 리소스를 전부 볼 수 있습니다.

![ab9c361527825fac.png](img/ab9c361527825fac.png)

이제 오프라인 모드에서 테스트해봅시다. DevTools의 __Service Worker__ 창으로 다시 이동하고 __Offline__ 확인란을 선택하세요. 그러면 __Network__ 패널 탭 옆에 작은 노란색 경고 아이콘이 표시됩니다. 이는 오프라인 상태임을 나타내는 기호입니다.

![7656372ff6c6a0f7.png](img/7656372ff6c6a0f7.png)

페이지를 새로 고치세요. 그러면 올바로 작동할 것입니다! 말하자면, 최소한 그렇다는 얘기죠. 최초의 (모조) 날씨 데이터를 어떻게 로드하는지 지켜보세요.

![8a959b48e233bc93.png](img/8a959b48e233bc93.png)

`app.getForecast()`의 `else` 절을 확인해보면 앱이 모조 데이터를 로드할 수 있는 이유를 이해할 수 있을 것입니다.

다음 단계는 날씨 데이터를 캐시할 수 있는 앱 및 서비스 워커 로직을 수정하고, 앱이 오프라인 상태일 때 캐시에서 가장 최근 데이터를 반환하는 것입니다.

__팁:__ 새롭게 시작하기 위해 저장된 데이터를 전부 지우고(localStoarge, indexedDB 데이터, 캐시된 파일 삭제) 모든 서비스 워커를 삭제하려면 'Application' 탭에서 'Clear storage' 창을 사용하세요.

[링크](https://weather-pwa-sample.firebaseapp.com/step-06/)

### 돌발 상황에 유의

이전에 언급한 것처럼, 처리되지 않은 돌발 상황이 많이 있기 때문에 이 코드를 __프로덕션에서 사용하면 안 됩니다__.

#### 모든 변경에 대해 캐시 키 업데이트에 따라 캐시가 달라집니다

예를 들어, 이 캐싱 방법에서는 콘텐츠가 변경될 때마다 캐시 키를 업데이트해야 합니다. 그러지 않으면, 캐시가 업데이트되지 않으며 오래된 콘텐츠가 제공됩니다. 따라서 프로젝트에서 작업하는 중에 모든 변경 시마다 캐시 키를 변경해야 합니다!

#### 모든 변경에 대해 모든 것을 다시 다운로드해야 합니다

또 다른 단점은 전체 캐시가 무효화되므로 파일 변경 시마다 다시 다운로드해야 한다는 것입니다. 즉, 간단한 단어 맞춤법 오류 하나를 수정하더라도 캐시가 무효화되므로 모든 것을 다시 다운로드해야 합니다. 이것은 매우 비효율적입니다.

#### 브라우저 캐시가 서비스 워커 캐시가 업데이트되는 것을 차단할 수 있습니다

여기에는 또 다른 중요한 주의사항이 있습니다. 핸들러 설치 중에 생성된 HTTPS 요청은 네트워크로 바로 이동해야 하며 브라우저 캐시로부터 응답을 반환해서는 안 됩니다. 그렇지 않으면 캐시되어 있는 오래된 버전이 브라우저로부터 반환될 수 있으며, 이 경우 서비스 워커 캐시가 전혀 업데이트되지 않습니다!

#### 프로덕션에서 캐시 우선 전략에 유의해야 합니다

우리의 앱에서는 캐시 우선 전략을 사용하며, 이 전략에서는 캐시된 콘텐츠의 복사본이 반환될 때 네트워크를 참조하지 않습니다. 캐시 우선 전략은 구현이 용이하지만 향후에는 문제의 소지가 있습니다. 호스트 페이지와 서비스 워커 등록의 복사본이 캐시되면, 서비스 워커의 구성을 변경하기가 매우 어려울 수 있으며(이 구성은 정의된 위치에 종속되므로), 또한 배치된 사이트를 업데이트하기가 매우 어려울 수 있습니다.

#### 이러한 돌발 상황을 어떻게 피할 수 있을까요?

그렇다면 이러한 돌발 상황을 어떻게 피할 수 있을까요? [sw-precache](https://github.com/GoogleChrome/sw-precache)와 같은 라이브러리를 사용하세요. 이 라이브러리는 요청이 네트워크로 바로 이동하도록 보장하고 여러분의 모든 힘든 작업을 대신 처리해 줍니다.

### 라이브 서비스 워커 테스트를 위한 팁

서비스 워커를 디버깅하는 작업은 까다로울 수 있으며, 캐싱이 관련될 경우 이 캐시가 예상대로 업데이트되지 않으면 더 악몽이 될 수도 있습니다. 여러분은 일반적인 서비스 워커 수명 주기와 코드의 버그 사이에서 좌절감을 느낄 수도 있습니다. 그러나 좌절하지 마세요. 여러분의 삶을 편안하게 도와줄 몇 가지 도구가 있습니다.

#### 새롭게 시작

캐시된 데이터가 로드된다는 걸 알아차리거나 데이터가 예상대로 업데이트되지 않을 때가 있을 수 있습니다. 저장된 데이터를 전부 지우고(localStoarge, indexedDB 데이터, 캐시된 파일 삭제) 모든 서비스 워커를 삭제하려면 'Application' 탭에서 'Clear storage' 창을 사용하세요.

다른 몇 가지 팁:

* 서비스 워커의 등록이 해제되더라도, 이를 포함하는 브라우저 창이 닫힐 때까지는 서비스 워커가 목록에 남아 있을 수 있습니다.
* 앱에 여러 개의 창이 열린 경우, 모두 다시 로드되어 최신 서비스 워커로 업데이트될 때까지는 새 서비스 워커가 적용되지 않습니다.
* 서비스 워커의 등록을 해제하더라도 캐시는 비워지지 않으므로, 캐시 이름이 변경되지 않았다면 오래된 데이터가 여전히 표시될 수도 있습니다.
* 서비스 워커가 존재하는데 새 서비스 워커가 등록되는 경우, 여러분이 [즉시 제어권](https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker/immediate-control)을 가져오지 않는다면, 해당 페이지가 다시 로드될 때까지는 새 서비스 워커에게 제어권이 넘어가지 않을 것입니다.


## 서비스 워커를 사용하여 예보 데이터 캐시




데이터에 적합한 [캐싱 전략](https://jakearchibald.com/2014/offline-cookbook/)을 선택하는 것은 매우 중요하며, 이 전략은 앱에 나타나는 데이터 유형에 따라 다릅니다. 예를 들어, 날씨나 주식 시세 같이 시간에 민감한 데이터는 최대한 빨리 새로 고쳐야 하지만, 아바타 이미지나 기사 콘텐츠는 그렇게 자주 업데이트할 필요가 없습니다.

우리의 앱에는 [캐시 우선 네트워크 차선](https://jakearchibald.com/2014/offline-cookbook/#cache-network-race) 전략이 이상적입니다. 이 전략에서는 최대한 신속하게 데이터를 화면에 표시한 다음, 네트워크가 최신 데이터를 반환하면 화면의 데이터를 업데이트합니다. 네트워크 우선 캐시 차선 전략과 달리 사용자는 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 시간이 만료될 때까지 기다리지 않고도 캐시된 데이터를 가져올 수 있습니다.

캐시 우선 네트워크 차선 전략에서 우리는 두 개의 비동기 요청을 시작해야 하며, 하나는 캐시에 대한 요청이고 하나는 네트워크에 대한 요청입니다. 앱에 대한 네트워크 요청은 자주 변경할 필요가 없지만, 응답을 반환하기 전에 이 응답을 캐시하도록 서비스 워커를 수정해야 합니다.

정상적인 상황에서는 캐시된 데이터가 반환되고 이와 거의 동시에 최신 데이터가 앱에 제공됩니다. 그런 다음, 네트워크 요청이 반환될 때 네트워크로부터 최신 데이터를 사용하여 앱이 업데이트됩니다.

### 네트워크 요청을 가로채고 응답을 캐시

나중에 쉽게 액세스하기 위해, Weather API에 대한 요청을 가로채고 그 응답을 캐시에 저장하도록 서비스 워커를 수정해야 합니다. 캐시 우선 네트워크 차선 전략에서 우리는 네트워크 응답이 '단일 정보 소스'가 되기를 기대하며, 항상 우리에게 가장 최신 정보를 제공하기를 기대합니다. 설령 그렇지 않더라도 이미 우리는 캐시에 저장된 최신 데이터를 검색했기 때문에 실패하더라도 문제는 없습니다.

애플리케이션 데이터를 앱 셸에서 구분할 수 있도록, 서비스 워커에서 `dataCacheName`을 추가해 보겠습니다. 앱 셸이 업데이트되고 오래된 캐시가 제거되면, 데이터는 변경되지 않고 그대로 유지되며, 초고속 로드를 위한 준비가 됩니다. 명심할 점은, 향후에 데이터 형식이 변경되면 여러분이 이를 처리하고 앱 셸과 콘텐츠의 동기화를 유지해야 합니다.

다음 행을 `service-worker.js` 파일의 맨 위에 추가합니다.

```
var dataCacheName = 'weatherData-v1';
```

그 다음, 앱 셸 캐시를 정리할 때 데이터 캐시를 삭제하지 않도록 `activate` 이벤트 핸들러를 업데이트합니다.

```
if (key !== cacheName && key !== dataCacheName) {
```

마지막으로, 다른 요청과는 별도로 데이터 API에 대한 요청을 처리하도록 `fetch` 이벤트 핸들러를 업데이트합니다.

```
self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  var dataUrl = 'https://query.yahooapis.com/v1/public/yql';
  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh
     * weather data. In this case, the service worker always goes to the
     * network and then caches the response. This is called the "Cache then
     * network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName).then(function(cache) {
        return fetch(e.request).then(function(response){
          cache.put(e.request.url, response.clone());
          return response;
        });
      })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
  }
});
```

이 코드는 요청을 가로채고 URL이 Weather API의 주소로 시작되는지 확인합니다. 시작될 경우에는 우리는 [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)를 사용하여 요청을 수행합니다. 응답이 반환되면 코드에서 캐시를 열고, 이 응답을 복제하여 캐시에 저장하고, 마지막으로 응답을 원래 요청자에게 반환합니다.

아직은 우리의 앱이 오프라인으로 작동하지 않습니다. 앱 셸에 대한 캐싱과 검색을 구현했지만, 데이터를 캐시하더라도 앱이 아직은 캐시를 검사하여 날씨 데이터가 있는지 확인하지 못합니다. 

### 요청 수행하기

이전에 언급한 것처럼, 앱은 두 개의 비동기 요청을 시작해야 하며, 하나는 캐시에 대한 요청이고 하나는 네트워크에 대한 요청입니다. 이 앱은 `window`에 있는 `caches` 객체를 사용하여 캐시에 액세스하고 최신 데이터를 검색합니다. 이는 점진적 기능 개선의 좋은 예입니다. 이 경우 일부 브라우저에서는 `caches` 객체를 사용하지 못할 수도 있으며, 네트워크 요청이 아닌 경우에도 여전히 작동해야 합니다.

이를 위해 우리는 다음을 수행해야 합니다.

1. `caches` 객체가 전역 `window` 객체에서 사용 가능한지 확인합니다.
2. 캐시에서 데이터를 요청합니다. 

* 서버 요청이 여전히 대기 중이면 캐싱된 데이터로 앱을 업데이트합니다.

3. 서버에서 데이터를 요청합니다.

* 나중에 신속하게 액세스하도록 데이터를 저장합니다.
* 서버로부터 최신 데이터로 앱을 업데이트합니다.

#### 캐시에서 데이터 가져오기

다음은, `caches` 객체가 존재하는지 확인하고 이 객체로부터 최신 데이터를 요청해야 합니다. `app.getForecast()`에서 `TODO add cache logic here` 주석을 찾은 다음, 주석 아래에 다음 코드를 추가하세요.

```
    if ('caches' in window) {
      /*
       * Check if the service worker has already cached this city's weather
       * data. If the service worker has the data, then display the cached
       * data while the app fetches the latest data.
       */
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function updateFromCache(json) {
            var results = json.query.results;
            results.key = key;
            results.label = label;
            results.created = json.query.created;
            app.updateForecastCard(results);
          });
        }
      });
    }
```

우리의 날씨 앱은 이제 데이터에 대해 두 개의 비동기 요청을 생성합니다. 하나는 `cache`로부터의 요청이고 하나는 XHR을 통한 요청입니다. 캐시에 데이터가 있는 경우 이 데이터가 매우 빠르게(수십 밀리초) 반환되어 렌더링되며 아직도 XHR이 대기 중인 경우에만 카드를 업데이트합니다. 그리고 XHR이 응답하면, Weather API로부터 직접 가져온 최신 데이터로 카드가 업데이트됩니다.

예보 카드를 업데이트하기 위한 호출로 캐시 요청과 XHR 요청이 둘 다 어떻게 끝나는지 살펴보세요. 앱은 자신이 최신 데이터를 표시 중인지 어떻게 아는 것일까요? 이는 `app.updateForecastCard`의 다음 코드에서 처리됩니다.

```
    var cardLastUpdatedElem = card.querySelector('.card-last-updated');
    var cardLastUpdated = cardLastUpdatedElem.textContent;
    if (cardLastUpdated) {
      cardLastUpdated = new Date(cardLastUpdated);
      // Bail if the card has more recent data then the data
      if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
        return;
      }
    }
```

카드가 업데이트될 때마다 앱은 카드에 숨겨진 속성에 데이터의 타임스탬프를 저장합니다. 앱은 카드에 이미 존재하는 타임스탬프가 함수로 전달된 데이터보다 더 최근의 시점이면 그냥 손을 뗍니다.

### 테스트

이제는 앱이 오프라인에서 완벽한 기능을 발휘해야 합니다. 두 개의 도시를 저장하고 앱에서 새로고침 버튼을 눌러 새로운 날씨 데이터를 가져온 다음, 오프라인으로 전환하고 페이지를 새로 고치세요. 

그런 다음, DevTools의 __Application__ 창에 있는 __Cache Storage__ 창으로 이동하세요. 그 섹션을 펼치면 왼쪽에 앱 셸 및 데이터 캐시의 이름이 나열되어 있을 것입니다. 데이터 캐시를 열면 각 도시에 대해 저장된 데이터가 나타나야 합니다.

![cf095c2153306fa7.png](img/cf095c2153306fa7.png)

[링크](https://weather-pwa-sample.firebaseapp.com/step-07/)


## 기본 통합 지원




꼭 필요한 경우가 아니면 모바일 키보드에서 긴 URL을 입력하기 좋아할 사람은 없습니다. Add to Home Screen 기능을 사용하면 마치 스토어에서 기본 앱을 설치하듯이, 기기에 대한 바로가기 링크를 추가하도록 사용자가 선택할 수 있습니다.

###  Android의 Chrome에서 웹 앱 설치 배너 및 홈 화면에 추가

웹 앱 설치 배너를 사용하면 사용자가 신속하고 매끄럽게 웹 앱을 홈 화면에 추가할 수 있으며, 손쉽게 앱을 시작하고 앱으로 돌아갈 수 있습니다. 앱 설치 배너는 추가하기가 쉬우며, Chrome이 대부분의 힘든 작업을 대신 처리해 줍니다. 우리는 앱에 대한 세부정보를 웹 앱 매니페스트 파일에 포함하기만 하면 됩니다.

그러면 Chrome은 서비스 워커 사용, SSL 상태를 비롯한 일련의 기준과 방문 빈도 추론을 사용하여 언제 배너를 표시할지 판별합니다. 또한 사용자가 Chrome의 'Add to Home Screen' 메뉴 버튼을 통해 수동으로 배너를 추가할 수 있습니다.

#### `manifest.json` 파일로 앱 매니페스트 선언

웹 앱 매니페스트는 원하는 영역(예: 모바일 홈 화면)에 표시되는 앱의 모양을 제어할 수 있는 기능을 개발자에게 제공하고 실행 가능한 것과 실행 방식을 지시하는 단순한 JSON 파일입니다.

웹 앱 매니페스트를 사용하면:

* 웹 앱이 사용자의 Android 홈 화면에 널리 존재할 수 있습니다.
* Android에서 URL 표시줄이 없는 전체 화면 모드로 웹 앱을 시작할 수 있습니다.
* 최적의 보기를 위해, 웹 앱에서 화면 방향을 제어할 수 있습니다.
* 웹 앱에서 사이트의 '스플래시 화면' 시작 환경과 테마 색상을 정의할 수 있습니다.
* 홈 화면 또는 URL 표시줄에서의 시작 여부를 웹 앱이 추적할 수 있습니다.

`work` 폴더에 `manifest.json`이라는 이름의 파일을 만들고 다음 콘텐츠를 복사해 붙여넣으세요.

```
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

이 매니페스트는 다양한 화면 크기에 맞춰 고안된 일련의 아이콘을 지원합니다. 이 글을 작성하는 시점 기준으로, 웹 앱 매니페스트를 지원하는 브라우저는 Chrome과 Opera Mobile뿐인데, 192px보다 작은 것은 사용하지 않습니다.

앱 실행 방식을 손쉽게 추적하는 한 방법은 `start_url` 매개변수에 쿼리 문자열을 추가한 다음 분석 도구 세트를 사용하여 쿼리 문자열을 추적하는 것입니다. 이 방법을 사용할 경우 앱 셸에서 캐시되는 파일의 목록을 업데이트하여 쿼리 문자열을 포함한 파일이 캐시되도록 해야 합니다.

#### 브라우저에게 매니페스트 파일 정보 알려주기

`index.html` 파일에 있는 `<head>` 요소의 아래쪽에 다음 줄을 추가하세요. 

```
<link rel="manifest" href="/manifest.json">
```

#### 모범 사례

* 사이트의 모든 페이지에 매니페스트 링크를 배치하면, 사용자가 처음 방문할 때 Chrome이 이 링크를 검색할 것입니다(사용자가 어떤 페이지를 열더라도 상관 없음).
* Chrome에서는 `short_name`이 선호되며 이름 필드보다 먼저 사용됩니다(있을 경우).
* 다양한 밀도 화면에 대해 아이콘 세트를 정의합니다. Chrome은 48dp에 가장 가까운 아이콘을 사용하려고 시도합니다(예: 2x 기기에서 96px 또는 3x 기기에서 144px).
* 스플래시 화면에 적합한 크기의 아이콘을 포함하고 또한 `background_color` 설정을 잊지 마세요.

추가 자료:

[앱 설치 배너 사용](/web/fundamentals/engage-and-retain/simplified-app-installs/)

### iOS의 Safari용 Add to Homescreen 요소

`index.html`에서 `<head>` 요소의 맨 아래에 다음을 추가합니다.

```
  <!-- Add to home screen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Weather PWA">
  <link rel="apple-touch-icon" href="images/icons/icon-152x152.png">
```

### Windows용 타일 아이콘

`index.html`에서 `<head>` 요소의 맨 아래에 다음을 추가합니다.

```
  <meta name="msapplication-TileImage" content="images/icons/icon-144x144.png">
  <meta name="msapplication-TileColor" content="#2F3BA2">
```

### 테스트

이 섹션에서는 웹 앱 매니페스트를 테스트하는 두 가지 방법을 보여드리겠습니다.

첫 번째 방법은 DevTools입니다. __Application __패널에서 __Manifest __창을 여세요. 매니페스트 정보를 올바로 추가했다면 이 창에서 해당 정보가 사람이 쉽게 읽을 수 있는 형식으로 파싱되어 표시되는 것을 볼 수 있을 것입니다.

이 창에서 홈 화면 기능에 추가하는 것을 테스트할 수도 있습니다. __Add to homescreen __버튼을 클릭하세요. 아래의 스크린샷에서 보듯이 URL 표시줄 아래에 'add this site to your shelf' 메시지가 보일 것입니다.

![cbfdd0302b611ab0.png](img/cbfdd0302b611ab0.png)

이것은 휴대기기에서 홈 화면 기능에 추가하는 작업을 데스크톱 환경에서도 똑같이 하는 것을 보여줍니다. 데스크톱에서 이 프롬프트를 올바로 트리거할 수 있다면 모바일 사용자가 기기에 앱을 추가할 수 있음을 자신할 수 있을 것입니다.

두 번째 방법은 Web Server for Chrome을 통해 테스트하는 것입니다. 이 접근방식에서는 (데스크톱이나 노트북에서) 로컬 개발 서버를 다른 컴퓨터에 노출한 다음, 실제 휴대기기에서 Pogressive Wb App에 액세스할 뿐입니다.

Web Server for Chrome 구성 대화상자에서 다음과 같이 `Accessible on local network` 옵션을 선택하세요.

![81347b12f83e4291.png](img/81347b12f83e4291.png)

웹 서버를 `STOPPED`로 전환했다가 다시 `STARTED`로 전환하세요. 그러면 원격으로 앱에 액세스하는 데 사용할 수 있는 새 URL이 보일 것입니다.

새 URL을 사용하여 휴대기기에서 사이트에 액세스하세요.

HTTPS를 통해 서비스 워커를 사용할 수 없는 상태이므로 이런 식으로 테스트하면 콘솔에서 서비스 워커 오류 메시지가 표시될 것입니다.

Android 기기에서 Chrome을 사용하여 홈 화면에 앱을 추가하고 시작 화면이 올바로 나타나고 올바른 아이콘이 사용되는지 확인해 보세요.

Safari와 Internet Explorer에서는 앱을 홈 화면에 수동으로 추가할 수도 있습니다.

[링크](https://weather-pwa-sample.firebaseapp.com/step-08/)


## 보안 호스트에 배포하고 축하를 받으세요!




최종 단계는 HTTPS를 지원하는 서버에 날씨 앱을 배포하는 것입니다. 아직 없는 경우, 무료이면서도 가장 쉬운 접근방식은 Firebase에서 정적 콘텐츠 호스팅을 사용하는 것입니다. 이 방식은 무척 사용하기 쉽고, HTTPS를 통해 콘텐츠를 제공하며, 글로벌 CDN에 의해 지원됩니다.

### 추가 기능: CSS를 최소화하고 인라인으로 추가

여러분이 고려해야 하는 또 한 가지는 키 스타일을 최소화하여 `index.html`에 인라인으로 추가하는 것입니다. [Page Speed Insights](/speed)의 권장사항은, 요청의 최초 15킬로바이트 부분에 상단 콘텐츠를 제공하는 것입니다.

모든 것이 인라인된 상태에서 초기 요청이 얼마나 작을 수 있는지 확인하세요.

추가 자료: [PageSpeed Insight Rules](/speed/docs/insights/rules)

### Firebase에 배포

Firebase를 처음 사용하는 경우, 먼저 계정을 만들고 몇몇 도구를 설치해야 합니다.

1. [https://firebase.google.com/console/](https://firebase.google.com/console/)에서 Firebase 계정을 만듭니다.
2. npm을 통해(`npm install -g firebase-tools`) Firebase 도구를 설치합니다.

계정을 만들고 로그인했으면, 이제 배포 준비가 된 것입니다!

1. [https://firebase.google.com/console/](https://firebase.google.com/console/)에서 새 앱을 만듭니다.
2. 최근 Firebase 도구에 로그인한 적이 없으면 인증 정보를 업데이트합니다. `firebase login`
3. 앱을 초기화하고 완성된 앱이 상주하는 디렉토리(예: `work`)를 제공합니다. `firebase init`
4. 마지막으로, 앱을 Firebase에 배포합니다. `firebase deploy`
5. 축하드립니다. 모두 마쳤습니다! 앱이 `https://YOUR-FIREBASE-APP.firebaseapp.com` 도메인에 배치될 것입니다.

추가 자료: [Firebase Hosting Guide](https://www.firebase.com/docs/hosting/guide/)

### 테스트

* 앱을 홈 화면에 추가한 다음, 네트워크 연결을 끊고, 앱이 예상대로 오프라인으로 작동하는지 확인합니다.

[링크](https://weather-pwa-sample.firebaseapp.com/final/)





## 문제가 있거나 의견이 있으세요? {: .hide-from-toc }
언제든 망설이지 말고 
[문제](https://github.com/googlecodelabs/your-first-pwapp/issues)를 제출해 주시면 코드랩에서 더욱 나은 서비스를 제공하는 데 큰 도움이 될 것입니다. 감사합니다!


{# wf_devsite_translation #}
