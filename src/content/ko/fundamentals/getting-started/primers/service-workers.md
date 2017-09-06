project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸쉬 알림&mdash;네이티브 어플리케이션이 일반적으로 요구하는 기능&mdash; 이 웹으로 오고 있습니다. 서비스워커는 이 모든 특징들이 기댈 수 있는 기술적 기반을 제공합니다.

{# wf_updated_on: 2016-01-17 #}
{# wf_published_on: 2000-01-01 #}

# 서비스워커 소개 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸쉬 알림&mdash;네이티브 어플리케이션에서 일반적으로 필요한 기능들&mdash; 이 앞으로 웹에서 지원이 가능합니다. 서비스워커는 이 모든 특징들이 구현 가능하도록 기술적 기반을 제공합니다.

## 서비스워커란 무엇인가?

서비스워커는 백그라운드에서 브라우저에 의해 동작되는 스크립트입니다, 웹 페이지와는 별개로 동작하며
웹 페이지나 사용자와의 인터렉션이 필요 없는 기능들에 대해서 새로운 길을 만들어주고 있습니다.
현재, [push notifications](/web/updates/2015/03/push-notifications-on-the-open-web)와 [background sync](/web/updates/2015/12/background-sync) 기능들이 나와 있습니다.
추후에는 서비스워커가 주기적인 동기화 또는 지포펜싱 (geofencing) 등이 지원될 것입니다.
이 튜토리얼에서 다뤄질 핵심 기능은 네트워크 요청을 가로채고 처리하는 것과 응답 캐쉬를 코드상에서 관리하는 것입니다.

서비스워커가 흥미로운 API인 이유는 개발자가 완벽히 통제할 수 있는 오프라인 경험을 지원한다는 사실입니다.

서비스워커 전에는 오프라인 경험을 지원하는 [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external } 라는 API가 있었습니다.
앱 캐쉬의 주된 문제점은 [number of gotcha's](http://alistapart.com/article/application-cache-is-a-douchebag){: .external }인데 이게 멀티 페이지 사이트가 아닌 싱글 페이지 웹앱에서만 잘 동작합니다. 서비스워커는 이러한 문제점들을 피하기 위해 만들어졌습니다.

서비스워커에 대해 알아둘 점:

* [JavaScript Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external } 입니다,
  그렇기 때문에 DOM을 직접적으로 접근할 수 없습니다. 대신, 서비스워커는 페이지와 [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 인터페이스를 통해 커뮤니케이션이 가능하고, 필요하면 페이지들이 DOM을 조작할 수 있습니다.
* 프로그래밍이 가능한 네트워크 프록시 입니다. 페이지의 네트워크 요청 처리를 제어할 수 있습니다.
* 사용하지 않을 때는 종료되고, 다음번에 필요하면 재시작됩니다. 서비스워커의 `onfetch`와 `onmessage` 핸들러의 전역 상태에 의존할 수 없습니다. 만약 유지해야 하는 정보가 있고 재시작시 다시 사용해야 한다면, [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API){: .external }를 이용합니다.
* 자바스크립트 프로미스를 확장하여 사용할 수 있습니다. 만약 프로미스를 모르면 더 읽기 전에 이 링크를 먼저 확인합니다. [Jake Archibald's article](/web/fundamentals/primers/promises/)


## 서비스워커 라이프싸이클 

서비스워커는 웹 페이지와 완전 별개의 라이프싸이클을 갖고 있습니다.

서비스워커를 사이트에 설치하기 위해서는 페이지에서 자바스크립트를 이용하여 등록해야 합니다.
서비스워커를 등록하면 브라우저가 백그라운드에서 서비스워커 설치 과정을 시작할 것입니다.

일반적으로 설치과정에서 정적인 자원들을 캐쉬해야 합니다. 만약 모든 파일들이 성공적으로 캐쉬가 되었다면,
그 때 서비스워커가 설치가 되었다는 것을 의미합니다. 만약 어느 파일이라도 다운로드나 캐쉬에 실패한다면,
설치가 실패할 것이고 서비스워커는 활성화 되지 않을 것입니다 (예를 들어, 설치 완료가 되지 않습니다).
만약 이런 일이 일어나도 걱정하지 마세요, 다음 기회에 다시 시도할 것이니까요.
하지만 이 말은 만약 설치가 이루어지면, 정적인 자원들의 캐슁이 완료 되었다는 것을 의미합니다.

설치가 완료되면, 활성화 단계가 진행되고 이 단계에서 오래된 캐쉬 관리를 할 수 있습니다.
이 부분은 서비스워커 업데이트 단계에서 다루겠습니다.

활성화 단계 이후에, 서비스워커는 해당 스코프 안의 모든 페이지를 제어하지만 서비스워커를 가장 처음에 등록한
페이지는 다시 로딩될 때까지 제어할 수 없습니다. 일단 서비스워커에게 제어권이 넘어오면,
이는 메모리를 절약하기 위해 서비스워커가 중료되거나 네트워크 요청이나 메시지가 일어날 때
fetch나 message event를 처리하는 형태의 2가지 상태 중 하나가 됩니다.

아래는 처음 설치 단계에서의 서비스워커 라이프싸이클을 단순화한 형태입니다.

![service worker lifecycle](imgs/sw-lifecycle.png)


## 전제 조건 


다음으로 넘어가기 전에 우리가 알맞은 기술환경을 가지고 있는지 확인합니다.

### 알맞은 브라우저 사용하기

브라우저는 점점 다양해 지고 있습니다. 서비스워커는 FireFox와 Opera 등이 지원하고,
마이크로소프트의 Edge의 [상태](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker){: .external }는 이러합니다.
Safari는 향후 서비스워커를 [지원할 계획](https://trac.webkit.org/wiki/FiveYearPlanFall2015){: .external }입니다.
[이 사이트](https://trac.webkit.org/wiki/FiveYearPlanFall2015){: .external }에서 브라우저 지원의 진행상황을 확인할 수 있습니다.

#### 크롬은 몇 버전을 지원할까요?

크롬 46 버전 또는 그 이상이 아니면, [please upgrade now](https://support.google.com/chrome/answer/95414){: .external } 를 참조합니다.
그 이하 버전의 경우에는 `Cache.addAll()` 를 포함한 서비스워커 기능들을 지원하지 않습니다.

만약 이전 버전을 사용해야만 하는 상황이라면, [a polyfill](https://github.com/coonsta/cache-polyfill){: .external } 를 이용하여
기능을 추가할 수 있습니다. `dist/serviceworker-cache-polyfill.js`을 사이트에 추가하고 `importScripts()` 메서드를 이용하여
서비스워커에서 사용합니다. 임포트된 스크립트는 서비스워커가 자동으로 캐쉬합니다.


    importScripts('serviceworker-cache-polyfill.js');
    

### HTTPS 통신이 필요합니다

개발 중에 `localhost`를 통해 서비스워커를 사용할 수 있지만,
사이트에 배포 하려면 서버에 HTTPS 설정을 해주어야만 합니다.

서비스워커를 사용하면 연결을 가로챌 수 있고, 조작할 수 있고, 응답을 필터링 할 수 있습니다.
정말 강력한 기능이죠. 당신이 이 기능들을 좋은 곳에 사용하는 반면에, 중간에 있는 사람은 그렇지 않을 수 있습니다.
이를 피하기 위해 HTTPS 통신으로 제공되는 페이지들에만 서비스워커를 등록할 수 있습니다.
그렇게 해서 브라우저가 받은 서비스워커가 네트워크 통신중에 조작되지 않는 것을 확인할 수 있습니다.

[Github Pages](https://pages.github.com/){: .external } 는 HTTPS를 통해 제공되기 때문에 데모를 올리기 좋은 장소입니다.

만약 서버에 HTTPS를 추가하고 싶으면 TLS 증명서를 구해서 서버에 세팅해야 합니다.
서버에 따라 설정이 다양하기 때문에 해당 서버의 문서나 이 링크를 확인하세요. [Mozilla's SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external }


## 서비스워커 등록하기 

서비스워커를 설치하려면 페이지에서 <b>등록</b>을 해야합니다. 이 과정에서 브라우저는 서비스워커 자바스크립트의 위치를 파악합니다.


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
    

위 코드는 서비스워커 API를 사용할 수 있는지 확인하고 만약 있으면 `/sw.js`에 있는 서비스워커가 등록됩니다.

페이지를 로딩할 때마다 `register()`를 부를 수 있습니다; 브라우저에서 서비스워커가 이미 등록되어 있는지 없는지 확인하고 알맞게 처리합니다.

`register()` 메서드에서 한가지 주의할 점은 서비스워커 파일의 위치입니다.
이 경우 서비스워커가 도메인의 루트에 위치하고 있을 것입니다. 이 말은 서비스워커의 스코프가 전체 origin이라는 의미입니다.
달리 달하면, 서비스워커는 이 도메인에 대한 모든 `fetch` 이벤트를 처리합니다.
만약 `/example/sw.js`에 있는 서비스워커 파일을 등록하면, 서비스워커는 `fetch` 이벤트를 `/example/` 로 시작하는 URL의 페이지에 대해서만
처리할 것입니다. (예, `/example/page1/`, `/example/page2/`)

주소창에 `chrome://inspect/#service-workers`를 입력하면 사이트에서 실행되고 있는 서비스워커를 확인할 수 있습니다.

![Inspect service workers](imgs/sw-chrome-inspect.png)

서비스워커가 처음 실행되고 있을 때 주소창에 `chrome://serviceworker-internals` 을 입력하면 서비스워커 상세 정보를 확인할 수 있습니다.
서비스워커의 라이프싸이클만 확인 하는 것이면 유용할지 모르나, `chrome://inspect/#service-workers`가 곧 완전히 이 자리를 대체할 것입니다.

Incognito 윈도우에서는 이전 서비스워커가 새로운 윈도우에 영향을 주지 않는 선에서 열기 닫기가 가능하기 때문에 서비스워커 테스트가 유용할 수도 있습니다.
다만 Incognito 윈도우 안에서 생성된 캐쉬나 서비스워커 등록은 윈도우가 닫히면 사라지게 됩니다.


## 서비스워커 설치하기 

페이지가 등록 절차를 시작하면 `install` 이벤트를 처리하는 서비스워커 스크립트를 봅니다.

아래는 가장 간단한 예제로 install 이벤트를 위한 콜백함수를 선언하고 어떤 파일을 캐쉬할 것인지 정합니다.


    self.addEventListener('install', function(event) {
      // Perform install steps
    });
    

`install` 콜백 안에서 다음 절차를 따라야 합니다.

1. 캐쉬를 연다.
2. 파일들을 캐쉬한다.
3. 필요한 파일들이 모두 캐쉬가 되었는지 확인한다.

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


위 코드처럼 `caches.open()`에 원하는 캐쉬 이름을 넣어 호출합니다.
그리고 `cache.addAll()`에 캐쉬할 파일의 배열을 값을 추가합니다. 이 두가지 메서드는 promise로 연결되어 있습니다.
`event.waitUntil()` 메서드는 프로미스를 이용하여 설치가 얼마나 걸리는지와 성공 여부를 확인할 수 있습니다.

만약 모든 파일들이 성공적으로 캐쉬가 되면 서비스워커 설치가 완료됩니다.
만일에 **어느** 파일 하나라도 다운로드를 실패하면 설치 과정 전체가 실패합니다.
이 과정은 모든 파일에 대해서 성공적으로 캐슁하는 것을 보장하지만, 달리 말하면 설치 과정에서 캐쉬할 파일 리스트를 신중하게 선정해야 한다는 걸 의미합니다.
긴 파일 리스트를 설정하면 실패할 확률이 높아지고 결국 서비스워커 설치를 실패합니다.

이건 단지 한 개의 예시입니다. 추가로 `install` 이벤트에다가 다른 작업을 수행할 수도 있고, `install` 이벤트 리스너를 분리하여 설정할 수도 있습니다.


## 캐쉬와 리턴 요청 


서비스워커를 설치했으니 캐쉬된 응답을 돌려줘야 할 차례입니다.

서비스워커가 설치되고 사용자가 다른 페이지로 이동하거나 새로고침을 하고나면 서비스워커가 `fetch` 이벤트를 받게 됩니다.
아래와 같은 방식으로 말이죠.


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
    

'fetch' 이벤트를 정의하고나서, `event.respondWith()` 안에 `caches.match()` 를 넣고 promise를 넘겨줍니다.
이 메서드는 요청을 확인하고 서비스워커가 생성한 캐쉬를 캐쉬하였는지 살펴봅니다.

만약 일치하는 응답이 있다면 캐쉬된 값을 반환해줍니다. 그렇지 않으면 `fetch`를 호출하여 네트워크 요청을 보내고,
네트워크로부터 받은 데이터가 있다면 반환합니다. 이 예제의 경우에는 우리가 설치 단계에서 캐쉬했던 캐쉬된 자원만 사용했기 때문에 매우 간단합니다.

새로운 요청들을 점차적으로 캐쉬하고 싶다면 아래와 같이 fetch 요청의 응답을 받아 캐쉬에 저장할 수 있습니다.


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
    

여기서 하고 있는 일은 아래와 같습니다:

1. `fetch` 요청에 `.then()` 콜백을 붙입니다.
2. 응답을 받고 나면 다음 3가지를 체크합니다.

   1. 응답이 유효한가
   2. 상태가 '200' 인가
   3. 응답 유형이 오리진에서 보낸 요청인 **basic** 인가 (3rd party 자원에 대한 요청은 캐쉬가 되지 않는다는 것을 의미)

3. 체크를 통과하면 응답을 [복제](https://fetch.spec.whatwg.org/#dom-response-clone) 합니다.
   응답의 타입이 [스트림](https://streams.spec.whatwg.org/){: .external } 방식이기 때문에 바디는 오직 한번만 사용될 수 있습니다.
   만약 브라우저로 응답을 보내거나 캐쉬에서 사용하려면 응답을 복제 해서 한개는 브라우저에 한개는 캐쉬에 보낼 수 있습니다.


## 서비스워커 업데이트 하기 


서비스워커 업데이트가 필요한 경우 아래의 절차를 따릅니다:

1. 서비스워커 자바스크립트 파일을 업데이트 합니다.
   사용자가 사이트로 접속할 때 브라우저는 서비스워커가 백그라운드에 정의해놓은 스크립트 파일을 다시 다운로드합니다.
   만약 서비스워커 파일에 현재와 1바이트라도 차이가 나면 _new_ 로 간주합니다.
2. 새로운 서비스워커가 시작되면 `install` 이벤트가 시작됩니다.
3. 이 시점에서 이전 서비스워커가 아직 현재 페이지를 제어하고 있기 때문에, 새로운 서비스워커는 `waiting` 상태에 들어갑니다.
4. 열려있던 현재 페이지가 닫히면 이전 서비스워커의 실행이 종료되고 새로운 서비스워커가 제어를 시작합니다.
5. 새로운 서비스워커가 제어를 시작하면 `activate` 이벤트가 실행됩니다.

`activate` 콜백에서 주로 하게 되는 일은 캐쉬 관리입니다.
`activate` 단계에서 캐쉬관리를 해야하는 이유는 인스톨 단계에서 이전 캐쉬들을 다 제거하면
현재 페이지의 제어를 담당하는 이전 서비스워커가 캐쉬를 이용하여 파일을 로딩하지 못하기 때문입니다.

`'my-site-cache-v1'` 라는 캐쉬가 있다고 가정합니다.
이 캐쉬를 둘로 나누어 한개는 캐시에 다른 한개는 블로그 포스트에 사용해야 한다고 합시다.
이 경우 인스톨 단계에서 `'pages-cache-v1'`와 `'blog-posts-cache-v1'` 두개를 생성해야 합니다. 그리고 activate 단계에서 이전 캐쉬인 `'my-site-cache-v1'`를 삭제해야 합니다.

아래 코드는 서비스워커 안의 모든 캐쉬를 루핑하며 오래된 캐쉬를 확인합니다.
그리고 캐쉬안에 정의되지 않은 캐쉬들은 모두 삭제합니다.


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
    


## 다듬어지지 않은 부분들과 배울점 


아래에 나와 있는 몇가지 이슈들은 최신 정보들입니다. 아래 내용이 빨리 없어졌으면 좋겠지만 일단 지금으로선 알아놓으면 도움이 될 것입니다.


### 설치가 실패해도 알기가 힘듭니다

서비스워커가 등록되더라도 `chrome://inspect/#service-workers` 또는 `chrome://serviceworker-internals` 에 표시되지 않습니다.
주로 던져진 에러나 `event.waitUntil()`에 rejected promise 가 들어오는 경우 설치에 실패합니다.

이 문제를 해결하기 위해서는 `chrome://serviceworker-internals` 로 가서 "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging." 를 체크합니다. 그리고 설치 이벤트의 시작 부분에 디버깅 로그를 추가합니다. (이 옵션은 크롬 47 이하 버전에서는 다른 이름을 가지고 있습니다.)

### fetch() 디폴트 옵션

#### 자격증명 미 포함

`fetch`를 사용할 때 디폴트 요청은 쿠키와 같은 자격증명을 포함하지 않습니다. 그러나 만약 자격증명을 포함하고 싶다면 아래와 같이 구현합니다:


    fetch(url, {
      credentials: 'include'
    })
    

이 구현방식은 의도적이고 URL이 같은 오리진일 경우에, 확실히 XHR의 더 복잡한 자격증명 송신 방식보다 낫습니다.
Fetch 동작은 `<img crossorigin="use-credentials">`을 추가하지 않는 이상 절대 쿠키를 보내지 않는 `<img crossorigin>` 종류의 CORS 요청과 흡사합니다.

#### Non-CORS 미 허용

기본적으로 CORS를 지원하지 않는 3rd 파티 URL 에서 리소스를 페치하면 실패합니다.
이 문제를 해결하려면 요청에 `no-CORS` 옵션을 추가하는 방법이 있지만 이는 'opaque' 응답을 야기합니다.
'opaque'는 응답이 성공인지 실패인지 식별이 불가능합니다.


    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });
    

#### 반응형 이미지 다루기

`srcset` 속성과 `<picture>` 요소는 런타임시에 가장 적절한 이미지를 선택하고 네트워크 요청을 보냅니다.

서비스워커 사용시 설치 과정에서 이미지를 캐쉬하려면 아래의 옵션을 사용합니다:

1. `<picture>` 요소와 `srcset` 속성이 요청할 모든 이미지를 설치
2. 낮은 해상도 이미지 이용
3. 높은 해상도 이미지 이용

모든 이미지를 다운로드 하면 저장공간이 낭비되므로 현실적인 옵션 2 나 3을 골라야 합니다.

설치 시에 낮은 해상도 이미지 를 사용한다고 하면 페이지가 로딩될 때 높은 해상도 이미지들을 받아와야 합니다. 하지만 만약 높은 해상도 이미지가 실패할 경우 낮은 해상도로 시도하게 됩니다.
이 방법이 괜찮아 보이지만 한가지 문제점이 있습니다.

아래와 같이 2개의 이미지가 있다고 합시다:

| Screen Density | Width | Height |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

이미지에 `srcset` 에 다음과 같은 마크업을 갖게 될 것입니다:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />
    

만약 2x display 를 이용하면 브라우저가 `image-2x.png` 를 다운로드할 것이고,
오프라인이라면 `.catch()` 를 이용하여 이 요청을 처리할 수 있게 됩니다.
이 때 `image-2x.png` 대신에 캐쉬가 되어 있다면 `image-src.png` 를 반환해줍니다.
여기서 브라우저는 2x 화면에 맞는 이미지를 예상할 것이고, 결국 이미지는 400x400 CSS 픽셀 대신에 200x200 CSS 픽셀로 표현됩니다. 이를 해결하는 방법은 이미지의 높이와 너비를 고정하는 것입니다.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
    style="width:400px; height: 400px;" />
    

`<picture>` 요소의 경우에 너비와 폭 고정이 이미지를 어떻게 생성하고 사용하는 것에 달려 있기 때문에 상당히 어렵습니다.
하지만 srcset 의 경우에는 위와 비슷한 방법으로 접근하면 될 것입니다.


## 더 알아보기; 도움 얻기 


### 더 알아보기

서비스워커에 관련 문서는 여기서 확인하세요.[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html){: .external }

### 도움 얻기

만약 하다가 막히는 부분이 있다면 Stackoverflow 에 질문을 올리고 '[service-worker](http://stackoverflow.com/questions/tagged/service-worker){: .external }' 태그를 달아주세요. 이 태그가 달린 이슈들을 최대한 모니터링해서 도움을 드리도록 하겠습니다.


Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}

