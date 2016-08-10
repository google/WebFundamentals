---
title: "서비스워커로 걸음마 떼기"
description: "서비스워커 설치를 위한 자바스크립트 추가하기"
notes:
  styling:
    - Styling will come later
updated_on: 2015-09-28
translators:
  - captainpangyo
---

이번 단계의 완성된 코드본은 completed/step3 디렉토리에 있습니다.

{% include shared/toc.liquid %}

## 1. index.html 생성하기

_app_ 디렉토리에서 _index.html_ 파일을 생성하고 아래와 같은 코드를 추가합니다:

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <title>Push Notification codelab</title>
</head>
<body>
  <h1>Push Notification codelab</h1>
  <p>This page must be accessed using HTTPS or via localhost.</p>
  <script src="js/main.js"></script>
</body>
</html>
{% endhighlight %}

크롬 브라우저에서 로컬호스트 URL로 _index.html_  을 접근합니다: URL은 다음 형태와 같아야 합니다. _http://localhost/push-notifications/app/index.html_

## 2. 서비스워커 추가하기

_app_ 디렉토리에서 _sw.js_ 파일을 생성합니다. 코드는 이후 단계에서 추가합니다.

서비스워커를 사용해보지 않았더라도 걱정하지마세요. 이 코드랩을 수행하기 위해서 그렇게 자세히 알 필요는 없습니다. *서비스워커는 네트워크 요청을 가로채거나, 푸쉬 메시지 또는 다른 작업들을 처리하기 위해 백그라운드에서 돌아가는 스크립트* 입니다. 만약 더 자세히 알고 싶으시다면, HTML5 Rocks 의 [Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 를 참고하시기 바랍니다.

푸쉬 메시지를 수신했을 때, 브라우저는 백그라운드에서 서비스워커를 실행하여 새로운 웹 페이지를 열지 않고 푸쉬 메시지를 처리합니다.

## 3. 서비스워커 등록 및 설치하기

이번 단계에서는 _index.html_ 파일에 참조되어 있는 _main.js_ 파일을 생성합니다.
이렇게 하여 서비스워커를 차례로 접근할 수 있습니다. _app_ 디렉토리에 _js_ 디렉토리를 새로 생성하고 _main.js_ 이름의 파일을 추가합니다. _main.js_ 코드 내용은 다음과 같습니다.

{% highlight javascript %}
if ('serviceWorker' in navigator) {
 console.log('Service Worker is supported');
 navigator.serviceWorker.register('sw.js').then(function(reg) {
   console.log(':^)', reg);
   // TODO
 }).catch(function(err) {
   console.log(':^(', err);
 });
}
{% endhighlight %}

이 코드는 브라우저가 서비스워커를 지원하는지 확인한 후, _sw.js_ 에서 생성한 서비스워커를 등록하고 설치합니다 - 아직 특별한 동작은 하지 않습니다.

## 4. localhost 에서 돌려보기

로컬호스트에서 _index.html_ 파일을 접근하고 크롬 개발자툴을 열어 콘솔창을 확인합니다.
확인 결과는 다음과 같습니다:

<img src="images/image01.png" width="965" height="901" alt="Codelab web page open in Chrome, showing ServiceWorkerRegistration in DevTools console" />

## 5. serviceworker-internals 체험하기

_chrome://serviceworker-internals_ 페이지에서는 서비스워커 동작을 확인하고 진단해 볼 수 있습니다:

<img src="images/image02.png" width="907" height="641" alt="chrome:serviceworker-internals diagnostic page open in Chrome" />

## 6. 서비스워커에 이벤트 리스너 등록하기

_sw.js_ 에 아래 코드를 추가합니다:

{% highlight javascript %}
console.log('Started', self);
self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});
self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});
self.addEventListener('push', function(event) {
  console.log('Push message received', event);
  // TODO
});
{% endhighlight %}

서비스워커에서는 `self`는 `ServiceWorkerGlobalScope` 객체를 의미합니다: 서비스워커 자신을 의미하기도 합니다.

**중요한 팁!**

기본적으로 오래된 서비스워커는 이를 사용하는 탭들이 닫히거나 언로딩 될 때까지 실행 상태로 남아있습니다. 새로운 서비스워커는 `waiting` 상태가 됩니다.

위 코드와 같이 `skipWaiting()` 가 호출되면, 서비스워커는 대기 상태를 건너뛰고, 즉시 활성화 됩니다.

디버깅하기 수월하시죠?!

_chrome://serviceworker-internals_ 에서 **Inspect** 버튼을 클릭하면 아래와 같은 화면이 나옵니다.

<img src="images/image03.png" width="888" height="845" alt="Chrome DevTools console showing service worker instal and activate events" />

**경고**: 만약 설치하는 동안 서비스워커 코드를 파싱할 때 에러가 발생하면, 설치가 되지 않고 에러가 던져집니다. 이는 코드를 변경할 때, 서비스워커가 미스테리하게 업데이트가 되지 않음을 초래할 수 있습니다. 변경할 때는 언제나 확인하고 유효성을 점검하세요!
