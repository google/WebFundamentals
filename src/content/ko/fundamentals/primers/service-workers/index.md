project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸시 알림(일반적으로 기본 애플리케이션을 요구하는 기능)이 웹에서 지원되고 있습니다. 서비스 워커는 이러한 모든 기능의 기술적 기반을 제공합니다.

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2016-01-18 #}

# 서비스 워커: 소개 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸시
알림(일반적으로 원시
애플리케이션을 요구하는 기능)이 웹에서 지원되고 있습니다. 서비스 워커는 이러한 모든 기능의
기술적 기반을 제공합니다.

## 서비스 워커란?

서비스 워커는 브라우저가 백그라운드에서 실행하는 스크립트로,
웹페이지와는 별개로 작동하며, 웹페이지 또는 사용자 상호작용이 필요하지 않은 기능에
대해 문호를 개방합니다. 현재 
[푸시 알림](/web/updates/2015/03/push-notifications-on-the-open-web) 
및 [백그라운드 동기화](/web/updates/2015/12/background-sync)와 같은 기능은 이미 제공되고 있습니다. 향후 
서비스 워커는 주기적 동기화 또는 지오펜싱과 같은 다른 기능을 지원할 것입니다.
이 가이드에서는 프로그래밍 방식의 응답 캐시 관리를 비롯하여 
네트워크 요청을 가로채고 처리하는 핵심 기능에 대해
설명합니다.

이것이 이처럼 흥미로운 API인 이유는 오프라인 환경을 완벽히
통제할 수 있는 권한을 개발자에게 부여하여 오프라인 환경을 지원할 수 있도록 해주기
때문입니다.

서비스 워커 이전에는 웹에서 사용자에게 오프라인
경험을 지원하는 [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }라는 API가 있었습니다.
AppCache의 주요 문제는 실제로 존재하는 [문제의 수](http://alistapart.com/article/application-cache-is-a-douchebag)와 
디자인이 단일 페이지 웹 앱에는 특히 
잘 작동하지만 여러 페이지로 구성된 사이트에는 그다지 훌륭하게 작동하지 않는다는 사실입니다. 서비스 워커는 이러한 일반적인 문제점을 피하도록 
설계되었습니다.

다음은 서비스 워커와 관련된 유의 사항입니다.

* 서비스 워커는 [자바스크립트 Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external }이므로
  DOM에 직접 액세스할 수 없습니다.  대신에 
  서비스 워커는 
  [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 
  인터페이스를 통해 전달된 메시지에 응답하는 방식으로 제어 대상 페이지와 통신할 수 있으며, 해당 페이지는 필요한 경우 DOM을 조작할 수 있습니다.
* 서비스 워커는 프로그래밍 가능한 네트워크 프록시이며, 페이지의 
  네트워크 요청 처리 방법을 제어할 수 있습니다.
* 서비스 워커는 사용하지 않을 때는 종료되고 다음에 필요할 때 다시 시작되므로 
  서비스 워커의 `onfetch` 및 
  `onmessage` 핸들러의 전역 상태에 의존할 수 없습니다. 보관했다가 다시 시작할 때 재사용해야 하는 정보가 있는 경우 
  서비스 워커가 
  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)에 대한 액세스 권한을 가집니다.
* 서비스 워커는 프라미스를 광범위하게 사용하므로 프라미스에 대해 잘 모르는 경우 
  이 가이드를 읽는 것을 멈추고 
  [프라미스 소개](/web/fundamentals/getting-started/primers/promises)를 확인해 보세요.

## 서비스 워커 수명 주기

서비스 워커의 수명 주기는 웹페이지와 완전히 별개입니다.

서비스 워커를 사이트에 설치하려면 페이지에서 자바스크립트를
이용하여 등록해야 합니다. 서비스 워커를 등록하면 브라우저가
백그라운드에서 서비스 워커 설치 단계를 시작합니다.

일반적으로 설치 단계 동안 정적 자산을 캐시하고자 할 것입니다. 
모든 파일이 성공적으로 캐시되면 서비스 워커가
설치됩니다. 파일 다운로드 및 캐시에 실패하면 설치 단계가
실패하고 서비스 워커가 활성화되지 않습니다(즉, 설치되지 않음). 이런
상황이 발생하더라도 걱정하지 마세요. 다음에 다시 시도할 것입니다. 그러나 이는 설치가 이루어지면
정적 자산이  캐시됨을 의미합니다.

설치가 완료되면 활성화 단계가 진행되고 이 단계에서 오래된 캐시를 관리할 수 있는데,
이에 대해서는
서비스 워커 업데이트 섹션에서 다루겠습니다.

활성화 단계 후에 서비스 워커는 해당
범위 안의 모든 페이지를 제어하지만 서비스 워커를
처음으로 등록한 페이지는 다시 로드해야 제어할 수 있습니다. 서비스 워커에 제어
권한이 부여된 경우 서비스 워커는 메모리를 절약하기 위해
종료되거나, 페이지에서 네트워크 요청이나 메시지가
생성될 때 fetch 및 message 이벤트를 처리합니다.

다음은 첫 설치 시의 서비스 워커 수명 주기를 매우 단순화한
버전입니다.

![서비스 워커 수명 주기](imgs/sw-lifecycle.png)


## 사전 요구사항

### 브라우저 지원

브라우저 옵션은 성장하고 있습니다. Firefox와
Opera가 서비스 워커를 지원합니다. Microsoft Edge는 현재 
[공적 지원을 표명](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/serviceworker/)하고 있습니다.
Safari도 [향후 개발 예정](https://trac.webkit.org/wiki/FiveYearPlanFall2015)임을 밝혔습니다.
Jake Archibald의 
[is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/){: .external }
사이트에서 모든 브라우저의 진행 상황을 확인할 수 있습니다.

### HTTPS 필요

개발 중에 `localhost`를 통해 서비스 워커를 사용할 수 있지만
사이트에 배포하려면 서버에 HTTPS 설정을 해야 합니다.

서비스 워커를 사용하여 연결을 가로채고 조작하고 응답을
필터링할 수 있습니다. 강력한 기능입니다. 해당 기능을 유익하게 사용하고 싶겠지만
중간자는 그렇지 않을 수 있습니다. 이를 피하기 위해 HTTPS로 제공되는 페이지에만
서비스 워커를 등록할 수 있습니다. 따라서 브라우저가
수신하는 서비스 워커는 네트워크 통신 중에 변조되지 않습니다.

[Github Pages](https://pages.github.com/){: .external }는 HTTPS를 통해 제공되기 때문에
데모를 호스팅하기 좋은 장소입니다.

서버에 HTTPS를 추가하려면 TLS
인증서를 가져와서 서버에 설정해야 합니다. 이는 설정에 따라 다르므로 
서버의 설명서 및 
[Mozilla의 SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)의 모범 사례를 참조하세요.


## 서비스 워커 등록

서비스 워커를 설치하려면 페이지에
**등록**하여 설치 프로세스를 시작해야 합니다. 그러면 브라우저가
서비스 워커 자바스크립트 파일의 위치를 알게 됩니다.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

위 코드는 서비스 워커 API가 사용 가능한지 확인하고 사용 가능한 경우
[페이지가 로드되면](/web/fundamentals/instant-and-offline/service-worker/registration)
`/sw.js`에 있는 서비스 워커를 등록합니다.

페이지를 로드할 때마다 `register()`를 호출할 수 있습니다. 브라우저가
서비스 워커의 등록 여부를 확인하고
그에 따라 처리합니다.

`register()` 메서드에서 한 가지 주의할 점은 서비스 워커
파일의 위치입니다. 이 예에서는 서비스 워커 파일이 도메인의
루트에 있습니다. 즉, 서비스 워커의 범위는 전체
원천(origin)입니다. 다시 말하면, 서비스 워커는 이 도메인의 모든 항목에 대한
`fetch` 이벤트를 수신합니다. `/example/sw.js`에
있는 서비스 워커 파일을 등록하면 서비스 워커는
`/example/`로 시작하는 URL 페이지(예: `/example/page1/`, `/example/page2/`)에 대해서만 `fetch` 이벤트를 처리합니다.

이제 `chrome://inspect
/#service-workers`로 이동하 사이트를 찾아 서비스 워커가 활성화되었는지 확인할 수 있습니다.

![서비스 워커 검사](imgs/sw-chrome-inspect.png)

서비스 워커가 처음으로 구현 중일 때 `chrome://serviceworker-internals`를 통해 서비스 워커
세부정보를 확인할 수도 있었습니다. 이는
서비스 워커의
수명 주기 확인 시에는 유용할 수 있지만 곧
`chrome://inspect/#service-workers`로 완전히 대체됩니다.

Incognito 창에서 서비스 워커를 테스트하면
이전 서비스 워커가 새로운 창에
영향을 주지 않음을 알면서 닫고 다시 열 수 있다는 점에서 유용합니다. 
Incognito 창에서 생성한 등록 및 캐시는 창이 닫히면 지워집니다.


## 서비스 워커 설치

제어된 페이지가 등록 프로세스를 시작하면 `install` 이벤트를 처리하는
서비스 워커 스크립트를 살펴봅시다.

가장 기본적인 예의 경우, install 이벤트에 대한 콜백을 정의하고
캐시할 파일을 지정해야 합니다.

    self.addEventListener('install', function(event) {
      // Perform install steps
    });


`install` 콜백 안에서 다음 절차를 수행해야 합니다.

1. 캐시를 엽니다.
2. 파일을 캐시합니다.
3. 필요한 모든 자산이 캐시되었는지 확인합니다.

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


여기서 원하는 캐시 이름을 사용하여 `caches.open()`을 호출한 후에
`cache.addAll()`을 호출하고 파일 배열에 전달합니다. 이는
프라미스의 체인(`caches.open()` 및 `cache.addAll()`)입니다. `event.waitUntil()` 메서드는
프라미스를 사용하여 설치 소요 시간 및 설치 성공
여부를 확인할 수 있습니다.

모든 파일이 성공적으로 캐시되면 서비스 워커가
설치됩니다. **어느** 파일 하나라도 다운로드하지 못하면 설치 단계가
실패합니다. 이를 통해 정의한 모든 자산을 보유하는 것에 의존할 수 있지만
설치 단계에서 캐시하기로 결정한 파일 목록에
주의해야 합니다. 긴 파일 목록을 정의하면 한 파일이 캐시되지
못할 확률이 높아지고 서비스 워커
설치가 실패하게 됩니다.

이는 단지 하나의 예이며, `install` 이벤트에 다른 작업을 수행하거나
`install` 이벤트 리스너 설정을 완전히 피할 수 있습니다.

## 요청 캐시 및 반환

서비스 워커를 설치했으므로 아마도
  캐시된 응답 중 하나를 반환하길 원할 것입니다. 맞습니까?

서비스 워커를 설치하고 사용자가 다른 페이지로 이동하거나
새로 고친 후에 서비스 워커가 `fetch` 이벤트를 수신하기 시작합니다. 다음은 그
예입니다.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });


여기서 `fetch` 이벤트를 정의했으며 `event.respondWith()` 내
`caches.match()`에서 프라미스를 전달합니다. 이 메서드는 요청을 확인하고
서비스 워커가 생성한 캐시에서 캐시된 결과가 있는지 찾습니다.

일치하는 응답이 있는 경우 캐시된 값을 반환합니다. 그렇지 않은 경우
`fetch` 호출의 결과를 반환합니다. 해당 호출은 네트워크 요청을 수행하고 네트워크에서 검색한 데이터가 있으면
해당 데이터를 반환합니다. 이는 간단한 예이며
설치 단계에서 캐시한 자산을 사용합니다.

새로운 요청을 누적적으로 캐시하려면 아래와 같이 fetch 요청의
응답을 처리한 다음 캐시에 추가하면 됩니다.


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT: Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT: Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


진행하는 작업은 다음과 같습니다.

1. `fetch` 요청 시 `.then()`에 콜백을 추가합니다.
2. 응답을 받으면 다음을 확인합니다.

   1. 응답이 유효한지 확인합니다.
   2. 응답에서 상태가 `200`인지 확인합니다.
   3. 응답 유형이 자사에서 요청한 것임을 나타내는 
      **basic**인지 확인합니다. 이는 타사 자산에 대한 요청은 
      캐시되지 않음을 의미합니다.
3. 확인을 통과하면 
   응답을 [복제](https://fetch.spec.whatwg.org/#dom-response-clone)합니다. 그 이유는 응답이 [Stream](https://streams.spec.whatwg.org/){: .external }이고 
   본문은 한 번만 사용할 수 있기 
   때문입니다. 브라우저가 사용할 응답을 반환하고 캐시로도 전달하려면
   하나는 브라우저로, 다른 하나는 캐시로 보낼 수 있도록
   응답을 복제해야 합니다.

## 서비스 워커 업데이트 {: #update-a-service-worker }

서비스 워커를 업데이트해야 할 때가 
올 것입니다. 그 경우 다음 단계를 따라야 합니다.

1. 서비스 워커 자바스크립트 파일을 업데이트합니다. 사용자가
   사이트로 이동하면 브라우저가
   서비스 워커를 정의한 스크립트 파일을 백그라운드에서 다시 다운로드합니다. 서비스 워커 파일이 
   현재와 1바이트라도 차이가 나면 
   _새_ 파일로 간주합니다.
2. 새 서비스 워커가 시작되고 `install` 이벤트가 생성됩니다.
3. 이때 이전 서비스 워커가 아직 현재 페이지를 제어하고 있기 때문에 
   새 서비스 워커는 `waiting` 상태가 됩니다.
4. 현재 열려 있는 사이트 페이지가 닫히면 이전 서비스 워커가 
   종료되고 새 서비스 워커가 제어권을 갖게 됩니다.
5. 새 서비스 워커가 제어권을 가지면 `activate` 이벤트가 
   발생합니다.

`activate` 콜백에서 발생하는 한 가지 공통 작업은 캐시 관리입니다.
`activate` 콜백 단계에서 캐시 관리를 하는 이유는
설치 단계에서 이전 캐시들을 다 제거하면
모든 현재 페이지를 제어하는 이전 서비스 워커가 갑자기 해당 캐시에서 파일을
제공하지 못하게 되기 때문입니다.

`'my-site-cache-v1'`라는 캐시를
페이지에 대한 캐시와 블로그 게시물에 대한 캐시로 나눈다고 가정합시다.
이 경우 설치 단계에서 `'pages-cache-v1'`과
`'blog-posts-cache-v1'` 등 두 개의 캐시를 만들고 활성화 단계에서 이전
캐시인 `'my-site-cache-v1'`을 삭제해야 합니다.

이를 위해 아래 코드에서는
서비스 워커의 모든 캐시를 반복 탐색하고 캐시
화이트리스트에 정의되지 않은 캐시를 삭제합니다.


    self.addEventListener('activate', function(event) {

      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## 불편한 점과 잠재적 문제

최신 기술이므로 해결해야 할 아래와 같은 
일련의 문제가 있습니다. 아래 내용은 곧 삭제되겠지만 당분간
주목할 가치가 있습니다.


### 설치 실패 알림 기능 부족

서비스 워커가 등록되더라도 `chrome://inspect/#service-workers` 
또는 `chrome://serviceworker-internals`에 표시되지 않는 경우
오류가 발생했거나 
`event.waitUntil()`에 거부된 프라미스를 전달했기 때문에 설치하지 못했을 수 있습니다.

이 문제를 해결하려면 `chrome://serviceworker-internals`로 이동하여 'Open
DevTools window and pause JavaScript execution on service worker startup for
debugging'을 선택하고 설치 이벤트의 시작 위치에 디버거 문을 추가합니다.
이 옵션을 <a href="/web/tools/chrome-devtools/javascript/add-breakpoints#exceptions">확인할 수 없는 예외 시 일시 중지</a>와 함께
사용하면 문제를 찾을 수 있습니다.


### fetch() 기본값

#### 기본적으로 인증 정보 없음

`fetch`를 사용할 때 기본적으로 
쿠키와 같은 인증 정보가 요청에 포함되지 않습니다. 인증 정보를 원할 경우 다음과 같이 호출합니다.

    fetch(url, {
      credentials: 'include'
    })


이 동작은 의도적이고, URL 원천이 같은 경우 인증 정보를 전송하고
그렇지 않은 경우 생략하는 XHR의 더 복잡한 기본값보다
나을 수 있습니다. Fetch 동작은 `<img crossorigin="use-credentials">`를 사용하여 옵트인하지 않으면 쿠키를 전송하지 않는 `<img crossorigin>`과 같은 다른 CORS 요청과 훨씬 유사합니다.



#### 기본적으로 비 CORS는 실패함

기본적으로,
CORS를 지원하지 않는 타사 URL에서 리소스를 가져오는 작업은 실패합니다. 이 문제를 해결하기 위해 요청에 `no-CORS` 옵션을 추가할 수 있지만,
이 경우 '불투명(opaque)' 응답이 발생하여
응답의 성공 여부를 구별할 수 없습니다.

    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### 반응형 이미지 처리

`srcset` 속성 또는 `<picture>` 요소는 런타임에 가장
적절한 이미지 자산을 선택하고 네트워크 요청을 수행합니다.

서비스 워커의 경우 설치 단계에서 이미지를 캐시하려면
아래 옵션을 사용할 수 있습니다.

1. `<picture>` 요소 및 `srcset` 
   속성이 요청하는 모든 이미지를 설치합니다.
2. 단일 저해상도 버전 이미지를 설치합니다.
3. 단일 고해상도 버전 이미지를 설치합니다.

모든 이미지를 다운로드하면 저장 공간이 낭비되므로
현실적으로 2번과 3번 옵션 중 하나를 선택해야 합니다.

설치 시에 저해상도 버전을 사용하고,
페이지 로드 시에 네트워크에서 더 높은 해상도 이미지를 가져오려고 할 때
고해상도 이미지가 실패하면 저해상도 버전으로 대체합니다. 이 방법이 좋은 것 같지만
한 가지 문제점이 있습니다.

다음 두 이미지가 있는 경우

| 화면 밀도 | 너비 | 높이 |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

`srcset` 이미지에서 다음과 같은 마크업을 갖습니다.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


2x 화면 표시에서는 브라우저가 `image-2x.png`를 다운로드하고,
오프라인인 경우 `.catch()`를 사용하여 이 요청을 처리하고, 캐시된 경우 `image-src.png`를
대신 반환하지만 브라우저는 2x 화면에서 추가 픽셀을 고려하는
이미지를 기대하므로 이미지가 400x400 CSS 픽셀 대신
200x200 CSS 픽셀로 표시됩니다. 이를 해결하는 유일한 방법은
이미지의 높이와 너비를 고정하는 것입니다.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


아트 디렉션에 사용되는 `<picture>` 요소의 경우 이는
상당히 어려우며 이미지 생성 및 사용 방법에 따라 매우 다르지만
srcset에 유사한 접근 방법을 사용할 수 있습니다.

## 자세히 알아보기

서비스 워커 관련 유용한 문서 목록은 
[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html)
를 참조하세요.

## 도움 받기

하다가 막힐 경우 Stackoverflow에 질문을 올리고 
'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' 
태그를 사용하여 저희가 문제를 추적하고 최대한 도와줄 수 있도록 하세요.


{# wf_devsite_translation #}
