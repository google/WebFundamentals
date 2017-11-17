project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on: 2014-12-09 #}

# 오프라인 설명서 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

AppCache가 현장에 도착했을 때 콘텐츠를 오프라인으로 작동하게 하는
몇 가지 패턴을 제공했습니다. 해당 패턴이 필요로 했던 패턴이라면 
(잭팟은 아니지만) 여러분은 AppCache 복권에 당첨된 것입니다. 하지만 남은 사람들은
[중심을 잡지 못하고](http://alistapart.com/article/application-cache-is-a-douchebag) 코너에
몰린 상황이었습니다.

[ServiceWorker][sw_primer]와 함께 우리는 오프라인으로 해결을 시도하는 것을 포기하고 
개발자에게 스스로 해결하도록 필요한 수단을 제공했습니다. 이를 통해 여러분은 캐싱 
및 요청 처리 방법을 제어할 수 있습니다. 즉, 자신만의 패턴을
만들 수 있습니다. 가능한 몇 가지 패턴을 따로 살펴보겠지만
실제로는 URL 및 컨텍스트에 따라
여러 패턴을 함께 사용할 것입니다.

별도의 언급이 없는 한 모든 코드 예시는 Chrome과 Firefox에서 작동합니다.
서비스 워커 지원에 대한 자세한 내용은 ['Is Service Worker Ready?'][is_sw_ready]를 참조하세요.

이러한 일부 패턴의 실제 데모를 보려면 [Trained-to-thrill][ttt]과, 
성능 영향을 보여주는 [이 동영상](https://www.youtube.com/watch?v=px-J9Ghvcx4)을 
살펴보세요.

## 캐시 시스템 - 리소스를 저장할 때

[ServiceWorker][sw_primer]를 사용하면 캐싱과 독립적으로 요청을
처리할 수 있으므로 별도로 살펴보겠습니다. 먼저, 캐싱은 언제 해야
합니까?

### 설치 시 -  종속성 있음{: #on-install-as-dependency }

<img src="images/cm-on-install-dep.png">

ServiceWorker는 `install` 이벤트를 제공합니다. 이를 사용하면 다른 이벤트를
처리하기 전에 필요한 항목들을 준비할 수 있습니다. 이 경우
ServiceWorker의 이전 버전이 여전히 실행 중이며 페이지를 제공하고
있으므로 여기에서 수행하는 작업이 그것을 방해해서는 안 됩니다.

**이상적인 대상:** CSS, 이미지, 글꼴, JS, 템플릿… 기본적으로 사이트의
해당 '버전'에 정적인 것으로 간주되는 모든 것.

이들은 가져오기에 실패할 경우 사이트가 완전히 작동하지
못하게 하고, 해당 네이티브 앱이 초기 다운로드에
포함하는 것들입니다.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mysite-static-v3').then(function(cache) {
          return cache.addAll([
            '/css/whatever-v3.css',
            '/css/imgs/sprites-v6.png',
            '/css/fonts/whatever-v8.woff',
            '/js/all-min-v4.js'
            // etc
          ]);
        })
      );
    });

`event.waitUntil`은 프라미스를 사용하여 설치의 길이와 성공을
정의합니다. 프라미스가 거부되면 설치가 실패로 간주되어
이 ServiceWorker가 중단됩니다(이전 버전이
실행 중인 경우 그대로 유지됨). `caches.open` 및 `cache.addAll`은 
프라미스를 반환합니다. 리소스가 가져오기가 실패할 경우 `cache.addAll` 호출이
거부됩니다.

[trained-to-thrill][ttt]에서 이를 사용하여
[정적 자산을 캐시](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L3)합니다.


### 설치 시 - 종속성 없음 {: #on-install-not }

<img src="images/cm-on-install-not.png">

위와 비슷하지만 설치가 지연되지 않으며 캐싱이 실패할 경우
설치가 실패하지 않습니다.

**이상적인 대상:** 게임의 후반부 레벨을 위한 자산과 같이 즉시 필요하지 않은
더 큰 리소스.

    self.addEventListener('install', function(event) {
      event.waitUntil(
        caches.open('mygame-core-v1').then(function(cache) {
          cache.addAll(
            // levels 11-20
          );
          return cache.addAll(
            // core assets & levels 1-10
          );
        })
      );
    });

레벨 11-20에 대한 `cache.addAll` 프라미스는 
`event.waitUntil`로 다시 전달되지 않으므로 실패하더라도 게임을 오프라인에서 계속 
이용할 수 있습니다. 물론, 해당 레벨이 존재하지 않을 가능성에 대비하고
누락된 경우 캐싱을 다시 시도해야 할 것입니다.

ServiceWorker는 이벤트 처리를 마쳤으므로 레벨 11-20이
다운로드되는 동안 종료될 수 있습니다. 즉, 해당 이벤트는 캐시되지 않습니다. 앞으로 이와 같은
경우를 다루는 백그라운드 다운로드 API와 영화와 같은
훨씬 큰 다운로드를 추가할 계획입니다.

### 활성화 시 {: #on-activate }

<img src="images/cm-on-activate.png">

**이상적인 대상:** 정리 및 마이그레이션

새 ServiceWorker가 설치되고 이전 버전이 사용되지 않는 경우
새 버전이 활성화되고 `activate` 이벤트를 가져옵니다. 이 경우 이전 버전이
방해하지 않으므로 IndexedDB에서 스키마 마이그레이션을
처리하고 사용되지 않는 캐시를 삭제할 수 있는 좋은 기회입니다.

    self.addEventListener('activate', function(event) {
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.filter(function(cacheName) {
              // Return true if you want to remove this cache,
              // but remember that caches are shared across
              // the whole origin
            }).map(function(cacheName) {
              return caches.delete(cacheName);
            })
          );
        })
      );
    });

활성화하는 동안 `fetch`와 같은 다른 이벤트가 큐에 배치되므로
긴 활성화로 인해 페이지 로드가 잠재적으로 차단될 수 있습니다. 활성화를 가능한 한
가볍게 유지하고 이전 버전이 활성화되어 있을 때 할 수 없는 작업에만
사용하세요.

[trained-to-thrill][ttt]에서 이를 사용하여
[이전 캐시를 삭제](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L17)합니다.

### 사용자 상호작용 시 {: #on-user-interaction }

<img src="images/cm-on-user-interaction.png">

**이상적인 대상:** 전체 사이트를 오프라인으로 만들 수 없는 경우
사용자가 오프라인에서 사용할 콘텐츠를 선택할 수 있습니다. (예: YouTube 등의
동영상, Wikipedia의 글, Flickr의 특정 갤러리)

사용자에게 'Read later' 또는 'Save for offline' 버튼을 제공합니다. 해당 버튼을
클릭하면 네트워크에서 필요한 것을 가져와서 캐시에 넣습니다.

    document.querySelector('.cache-article').addEventListener('click', function(event) {
      event.preventDefault();

      var id = this.dataset.articleId;
      caches.open('mysite-article-' + id).then(function(cache) {
        fetch('/get-article-urls?id=' + id).then(function(response) {
          // /get-article-urls returns a JSON-encoded array of
          // resource URLs that a given article depends on
          return response.json();
        }).then(function(urls) {
          cache.addAll(urls);
        });
      });
    });

[Caches API][caches_api]는 서비스 워커뿐만 아니라 페이지에서도
사용할 수 있습니다. 즉, 캐시에 항목을 추가하기 위해
서비스 워커를 개입시킬 필요가 없습니다.


### 네트워크 응답 시 {: #on-network-response }

<img src="images/cm-on-network-response.png">

**이상적인 대상:** 사용자의 받은 편지함 또는 글 내용과 같은
자주 업데이트되는 리소스. 아바타와 같이 비필수적인 콘텐츠에도 유용하지만
주의가 필요합니다.

요청이 캐시의 내용과 일치하지 않으면 네트워크에서 요청을 가져와서
페이지로 보내고 그와 동시에 캐시에 추가합니다.

아바타와 같이 다양한 URL에 대해 이 작업을 수행하는 경우
원본 저장소를 부풀리지 않도록 조심해야 합니다(주요 후보로 원치 않는
디스크 공간을 사용자가 다시 회수해야 하는 경우). 더 이상 필요하지 않은
캐시 항목은 제거합니다.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
              cache.put(event.request, response.clone());
              return response;
            });
          });
        })
      );
    });

효율적인 메모리 사용을 위해 응답/요청의 본문을 한 번만 읽을
수 있습니다. 위의 코드에서 
[`.clone()`](https://fetch.spec.whatwg.org/#dom-request-clone)은 별도로
읽을 수 있는 추가 복사본을 만드는 데 사용됩니다.

[trained-to-thrill][ttt]에서 이를 사용하여
[Flickr 이미지를 캐시](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L109)합니다.

### Stale-while-revalidate {: #stale-while-revalidate }

<img src="images/cm-stale-while-revalidate.png">

**이상적인 대상:** 최신 버전을 유지하는 것이 필수적이지 않은,
자주 업데이트되는 리소스. 아바타가 이 범주에 해당될 수 있습니다.

캐시된 버전이 있으면 사용하되 다음을 위해 업데이트를
가져옵니다.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return cache.match(event.request).then(function(response) {
            var fetchPromise = fetch(event.request).then(function(networkResponse) {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            })
            return response || fetchPromise;
          })
        })
      );
    });

이는 HTTP의
[stale-while-revalidate](https://www.mnot.net/blog/2007/12/12/stale)와 매우 유사합니다.

### 푸시 메시지에서 {: #on-push-message }

<img src="images/cm-on-push.png">

[Push API](/web/fundamentals/push-notifications)는
ServiceWorker 위에 빌드된 또 다른 기능입니다. 이 기능을 사용하여
OS의 메시징 서비스의 메시지에 대한 응답으로 ServiceWorker를
활성화할 수 있습니다. 이는 사용자가 사이트에 대해 탭을 열지 않은 경우에도
발생하는데, ServiceWorker만 활성화됩니다. 페이지에서 이 작업을 수행할
수 있는 권한을 요청하면 사용자에게 메시지가 표시됩니다.

**이상적인 대상:** 채팅 메시지, 속보 또는 이메일과 같은
알림 관련 콘텐츠. 그리고 할 일 목록 업데이트
또는 달력 변경과 같은 즉각적인 동기화를 활용하는
드물게 변경되는 콘텐츠.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="0i7YdSEQI1w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

일반적인 최종 결과는 누를 때 관련 페이지를 열거나
포커스를 받는 알림이지만 이 상황이 발생하기 전에 캐시를
업데이트하는 것은 _매우_ 중요합니다. 사용자는 푸시 메시지를 수신할 때 분명히
온라인 상태이지만 알림과 최종 상호작용할 때에는 온라인 상태가
아니기 때문에 이 콘텐츠를 오프라인에서 사용할 수 있도록 만드는 것이 중요합니다. 일반적으로
오프라인을 우선시하는 훌륭한 예에 해당하는 Twitter 네이티브 앱은
이를 약간 잘못 사용하고 있습니다.

연결이 없으면 Twitter는 푸시 메시지와 관련된 콘텐츠를
제공하지 못합니다. 그러나 푸시 메시지를 누르면 알림은 제거되고 사용자가
누르기 전보다 적은 정보를 제공합니다. 이렇게 하지 마세요!

<div style="clear:both;"></div>

다음 코드는 알림을 표시하기 전에 캐시를 업데이트합니다.

    self.addEventListener('push', function(event) {
      if (event.data.text() == 'new-email') {
        event.waitUntil(
          caches.open('mysite-dynamic').then(function(cache) {
            return fetch('/inbox.json').then(function(response) {
              cache.put('/inbox.json', response.clone());
              return response.json();
            });
          }).then(function(emails) {
            registration.showNotification("New email", {
              body: "From " + emails[0].from.name
              tag: "new-email"
            });
          })
        );
      }
    });

    self.addEventListener('notificationclick', function(event) {
      if (event.notification.tag == 'new-email') {
        // Assume that all of the resources needed to render
        // /inbox/ have previously been cached, e.g. as part
        // of the install handler.
        new WindowClient('/inbox/');
      }
    });


### 백그라운드 동기화 시 {: #on-background-sync }

<img src="images/cm-on-bg-sync.png">

Dogfood: 백그라운드 동기화는 아직 Chrome에 안착되지 않았습니다.

[백그라운드 동기화](/web/updates/2015/12/background-sync)는
ServiceWorker 위에 빌드된
또 다른 기능입니다. 이 기능을 사용하여 일회용으로 또는 (매우 경험적인)
간격으로 백그라운드 데이터 동기화를 요청할 수 있습니다. 이는 사용자가
사이트에 대해 탭을 열지 않은 경우에도 발생하는데, ServiceWorker만
활성화됩니다. 페이지에서 이 작업을 수행할 수 있는 권한을 요청하면
사용자에게 메시지가 표시됩니다.

**이상적인 대상:** 긴급하지 않은 업데이트, 특히 소셜 일정이나 뉴스 기사와
같이 업데이트별 푸시 메시지가 매우 자주 주기적으로
발생하는 업데이트.

    self.addEventListener('sync', function(event) {
      if (event.id == 'update-leaderboard') {
        event.waitUntil(
          caches.open('mygame-dynamic').then(function(cache) {
            return cache.add('/leaderboard.json');
          })
        );
      }
    });


## 캐시 지속성 {: #cache-persistence }

원본에는 적당한 특정 여유 공간이 제공됩니다.
해당 여유 공간은 LocalStorage,
IndexedDB, Filesystem 및 Caches 등 모든 원본 저장소 사이에 공유됩니다.

제공되는 여유 공간은 사양으로 지정되지 않고, 기기와 저장소 상태에
따라 다릅니다. 다음을 통해 여유 공간을 확인할 수 있습니다.

    navigator.storageQuota.queryInfo("temporary").then(function(info) {
      console.log(info.quota);
      // Result: <quota in bytes>
      console.log(info.usage);
      // Result: <used data in bytes>
    });

그러나 모든 브라우저 저장소와 마찬가지로 브라우저는
기기가 저장 압력을 받게 되면 이를 버릴 수 있습니다. 불행히도 브라우저는
꼭 보존하고 싶은 영화와 별로 관심 없는 게임을 구분하지
못합니다.

이 문제를 해결하도록 제안된 API인
[`requestPersistent`](https://storage.spec.whatwg.org/){: .external }가 있습니다.

    // From a page:
    navigator.storage.requestPersistent().then(function(granted) {
      if (granted) {
        // Hurrah, your data is here to stay!
      }
    });

물론 사용자가 권한을 부여해야 합니다. 이제 사용자가 삭제를
제어할 수 있기 때문에 이 흐름에 사용자가 참여하도록 하는 것이 중요합니다.
기기가 저장 압력을 받는 상태에서 비필수적인 데이터를
지워도 해결되지 않는 경우 사용자가 보존하고 삭제할 항목을
판단하게 됩니다.

이를 위해 브라우저를 단일 항목으로 보고하지 않고 '지속형' 원본을
네이티브 앱과 동일한 것으로 취급하는
운영체제가 필요합니다.


## 제안 제공 - 요청에 응답 {: #serving-suggestions }

얼마나 많이 캐시를 수행하는가는 중요하지 않습니다. 시간과 방법을 지정하지 않으면
ServiceWorker가 캐시를 사용하지 않습니다. 다음은 요청 처리를 위한
몇 가지 패턴입니다.

### 캐시 전용 {: #cache-only }

<img src="images/ss-cache-only.png">

**이상적인 대상:** 사이트의 해당 '버전'에 정적인 것으로 간주되는 모든 것.
설치 이벤트에서 이를 캐시해야 했으므로 거기에 있는 것에
의존할 수 있습니다.

    self.addEventListener('fetch', function(event) {
      // If a match isn't found in the cache, the response
      // will look like a connection error
      event.respondWith(caches.match(event.request));
    });

…이 경우를 구체적으로 처리해야 할 필요는 좀처럼 없지만
[캐시 요청 시도 후 네트워크로 복귀](#cache-falling-back-to-network)에서 이 문제를 다루고 있습니다.

### 네트워크 전용 {: #network-only }

<img src="images/ss-network-only.png">

**이상적인 대상:** 분석 ping, 비 GET 요청과 같이 상응하는
오프라인 요소가 없는 항목.

    self.addEventListener('fetch', function(event) {
      event.respondWith(fetch(event.request));
      // or simply don't call event.respondWith, which
      // will result in default browser behaviour
    });

…이 경우를 구체적으로 처리해야 할 필요는 좀처럼 없지만
[캐시 요청 시도 후 네트워크로 복귀](#cache-falling-back-to-network)에서 이 문제를 다루고 있습니다.

### 캐시 요청 시도 후 네트워크로 복귀 {: #cache-falling-back-to-network }

<img src="images/ss-falling-back-to-network.png">

**이상적인 대상:** 오프라인을 우선적으로 빌드하는 경우에
대부분의 요청을 처리하는 방법이 여기에 해당합니다. 다른 패턴은 들어오는 요청에 기반한
예외가 됩니다.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

이렇게 하면 캐시 항목에 대한 '캐시 전용' 동작과
캐시되지 않은 항목(캐시할 수 없는 모든 비 GET 요청 포함)에 대한 '네트워크 전용' 동작이
제공됩니다.

### 캐시와 네트워크의 경쟁 {: #cache-and-network-race }

<img src="images/ss-cache-and-network-race.png">

**이상적인 대상:** 디스크 액세스 속도가 느린 기기에서 성능을 추적 중인
소규모 자산.

오래된 하드 드라이브, 바이러스 스캐너 및 고속 인터넷 연결을
조합하면 네트워크에서 리소스를 가져오는 것이 디스크로 이동하는 것보다
빠를  수 있습니다. 그러나 사용자의 기기에 있는 콘텐츠를 가져오기 위해
네트워크로 이동하는 것은 데이터 낭비에 해당할 수 있으므로 주의해야 합니다.

    // Promise.race is no good to us because it rejects if
    // a promise rejects before fulfilling. Let's make a proper
    // race function:
    function promiseAny(promises) {
      return new Promise((resolve, reject) => {
        // make sure promises are all promises
        promises = promises.map(p => Promise.resolve(p));
        // resolve this promise as soon as one resolves
        promises.forEach(p => p.then(resolve));
        // reject if all promises reject
        promises.reduce((a, b) => a.catch(() => b))
          .catch(() => reject(Error("All failed")));
      });
    };

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        promiseAny([
          caches.match(event.request),
          fetch(event.request)
        ])
      );
    });


### 네트워크 요청 시도 후 캐시로 폴백 {: #network-falling-back-to-cache }

<img src="images/ss-network-falling-back-to-cache.png">

**이상적인 대상:** 사이트의 '버전' 범위 밖에서 자주 업데이트되는 리소스에
대한 빠른 수정. 기사, 아바타, 소셜 미디어 타임라인,
게임 순위표 등이 여기에 해당합니다.

즉, 온라인 사용자는 최신 콘텐츠를 제공받지만 오프라인 사용자는
오래된 버전의 캐시를 사용합니다. 네트워크 요청이 성공하면
[캐시 항목을 업데이트](#on-network-response)하려고 할 것입니다.

그러나 이 방법에는 결함이 있습니다. 연결이 원활하지 않거나 느린 경우
사용자는 네트워크가 실패할 때까지 기다렸다가 기기에
이미 있는 완벽하게 허용되는 콘텐츠를 얻어야 합니다. 이는 매우
긴 시간이 소요될 수 있으므로 사용자를 좌절하게 합니다. 훨씬 나은 해결책에 대해서는 다음 패턴인
[캐시 요청 후 네트워크](#cache-then-network)를 참조하세요.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        fetch(event.request).catch(function() {
          return caches.match(event.request);
        })
      );
    });

### 캐시 요청 후 네트워크 {: #cache-then-network }

<img src="images/ss-cache-then-network.png">

**이상적인 대상:** 자주 업데이트되는 콘텐츠. 기사, 소셜 미디어 타임라인,
게임 순위표 등이 여기에 해당합니다.

이를 위해서는 페이지가 두 개의 요청(캐시에 요청, 네트워크에 요청)을
해야 합니다. 캐시된 데이터를 먼저 표시한 다음 네트워크 데이터가 도착하면
페이지를 업데이트하는 방식입니다.

때로는 새로운 데이터(예: 게임 순위표)가 도착할 때 현재 데이터를 바꿀
수 있지만 훨씬 큰 콘텐츠로 인해 혼란스러울
수 있습니다. 기본적으로 사용자가 읽고 있거나 상호작용하고 있을 수 있는
항목을 '사라지게 하지' 마세요.

Twitter는 이전 콘텐츠 위에 새 콘텐츠를 추가하고 사용자를
방해하지 않도록 스크롤 위치를 조정합니다. Twitter는 일반적으로
콘텐츠를 선형 순서로 유지하기 때문에 이것이 가능합니다. 콘텐츠를 가급적 빨리
화면에 표시하기 위해 이 패턴을
[trained-to-thrill][ttt]로 복사했는데, 최신 콘텐츠는 도착해야 표시됩니다.

**페이지 코드:**

    var networkDataReceived = false;

    startSpinner();

    // fetch fresh data
    var networkUpdate = fetch('/data.json').then(function(response) {
      return response.json();
    }).then(function(data) {
      networkDataReceived = true;
      updatePage();
    });

    // fetch cached data
    caches.match('/data.json').then(function(response) {
      if (!response) throw Error("No data");
      return response.json();
    }).then(function(data) {
      // don't overwrite newer network data
      if (!networkDataReceived) {
        updatePage(data);
      }
    }).catch(function() {
      // we didn't get cached data, the network is our last hope:
      return networkUpdate;
    }).catch(showErrorMessage).then(stopSpinner);


**ServiceWorker 코드:**

캐시는 항상 네트워크로 이동할 때 업데이트됩니다.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.open('mysite-dynamic').then(function(cache) {
          return fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        })
      );
    });

참고: `fetch` 및 `caches`를 페이지에 노출([1번 티켓](https://code.google.com/p/chromium/issues/detail?id=436770), [2번 티켓](https://code.google.com/p/chromium/issues/detail?id=439389))하지 않으므로 위의 코드는 Chrome에서 작동하지 않습니다.

[trained-to-thrill][ttt]에서
[fetch 대신 XHR](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/utils.js#L3)을
사용하고, Accept 헤더를 사용하여 ServiceWorker에게 결과를
가져올 출처([페이지 코드](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/index.js#L70),
[ServiceWorker 코드](https://github.com/jakearchibald/trained-to-thrill/blob/3291dd40923346e3cc9c83ae527004d502e0464f/www/static/js-unmin/sw/index.js#L61))를 알려주고 이 문제를 해결했습니다.

### 일반적인 폴백 {: #generic-fallback }

<img src="images/ss-generic-fallback.png">

캐시 및/또는 네트워크에서 응답이 없으면 일반적인 폴백을
제공하도록 지정할 수 있습니다.

**이상적인 대상:** 실패한 POST 요청, '오프라인에서 사용할 수 없음' 페이지,
아바타와 같은 보조 이미지.

    self.addEventListener('fetch', function(event) {
      event.respondWith(
        // Try the cache
        caches.match(event.request).then(function(response) {
          // Fall back to network
          return response || fetch(event.request);
        }).catch(function() {
          // If both fail, show a generic fallback:
          return caches.match('/offline.html');
          // However, in reality you'd have many different
          // fallbacks, depending on URL & headers.
          // Eg, a fallback silhouette image for avatars.
        })
      );
    });

폴백할 대상 항목은 [설치 종속성](#on-install-as-dependency)일 가능성이 있습니다.

페이지에 이메일을 게시 중인 경우 ServiceWorker가 IDB '보낼 편지함'에
이메일을 저장하는 작업으로 폴백하고 보내기가 실패했지만
데이터를 성공적으로 보존했음을 알려줍니다.

### ServiceWorker 측 템플릿 {: #serviceworker-side-templating }

<img src="images/ss-sw-side-templating.png">

**이상적인 대상:** 서버 응답을 캐시할 수 없는 페이지.

[서버의 페이지를 렌더링하면 작업 속도가 빨라지지만](https://jakearchibald.com/2013/progressive-enhancement-is-faster/)
 캐시에서 이해할 수
없는 상태 데이터(예: 'Logged in as…')를 포함할 수 있습니다. ServiceWorker가 페이지를 제어하는 경우
그 대신에 JSON 데이터를 템플릿과 함께 요청하여
렌더링할 수 있습니다.

    importScripts('templating-engine.js');

    self.addEventListener('fetch', function(event) {
      var requestURL = new URL(event.request);

      event.respondWith(
        Promise.all([
          caches.match('/article-template.html').then(function(response) {
            return response.text();
          }),
          caches.match(requestURL.path + '.json').then(function(response) {
            return response.json();
          })
        ]).then(function(responses) {
          var template = responses[0];
          var data = responses[1];

          return new Response(renderTemplate(template, data), {
            headers: {
              'Content-Type': 'text/html'
            }
          });
        })
      );
    });


## 종합적으로 살펴보기

이러한 메서드 중 하나를 선택할 필요가 없고, 요청 URL에 따라
많은 메서드를 사용할 수 있습니다. 예를 들어,
[trained-to-thrill][ttt]은 다음을 사용합니다.

* [설치 시 캐시](#on-install-as-dependency): 정적 UI 및 동작의 경우
* [네트워크 응답 시 캐시](#on-network-response): Flickr 이미지 및 데이터의 경우
* [캐시에서 가져오기, 네트워크로 복귀](#cache-falling-back-to-network): 대부분의 요청의 경우
* [캐시에서 가져온 다음 네트워크에서 가져오기](#cache-then-network): Flickr 검색 결과의 경우

요청을 살펴보고, 무엇을 할지 결정하세요.

    self.addEventListener('fetch', function(event) {
      // Parse the URL:
      var requestURL = new URL(event.request.url);

      // Handle requests to a particular host specifically
      if (requestURL.hostname == 'api.example.com') {
        event.respondWith(/* some combination of patterns */);
        return;
      }
      // Routing for local URLs
      if (requestURL.origin == location.origin) {
        // Handle article URLs
        if (/^\/article\//.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/\.webp$/.test(requestURL.pathname)) {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (request.method == 'POST') {
          event.respondWith(/* some other combination of patterns */);
          return;
        }
        if (/cheese/.test(requestURL.pathname)) {
          event.respondWith(
            new Response("Flagrant cheese error", {
              status: 512
            })
          );
          return;
        }
      }

      // A sensible default pattern
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });

…이해하셨을 것입니다.


### 크레딧 {: hide-from-toc }
…아름다운 아이콘:

* [코드](http://thenounproject.com/term/code/17547/){: .external } 아이콘: buzzyrobot 제공
* [달력](http://thenounproject.com/term/calendar/4672/){: .external } 아이콘: Scott Lewis 제공
* [네트워크](http://thenounproject.com/term/network/12676/){: .external } 아이콘: Ben Rizzo 제공
* [SD 카드](http://thenounproject.com/term/sd-card/6185/) 아이콘: Thomas Le Bas 제공
* [CPU](http://thenounproject.com/term/cpu/72043/){: .external } 아이콘: iconsmind.com 제공
* [휴지통](http://thenounproject.com/term/trash/20538/){: .external } 아이콘: trasnik 제공
* [알림](http://thenounproject.com/term/notification/32514/){: .external } 아이콘: @daosme 제공
* [레이아웃](http://thenounproject.com/term/layout/36872/){: .external } 아이콘: Mister Pixel 제공
* [구름](http://thenounproject.com/term/cloud/2788/){: .external } 아이콘: P.J. Onori 제공

'게시하기' 전에 많은 오류를 찾아 주신 [Jeff Posnick](https://twitter.com/jeffposnick)에게도
감사드립니다.

### 추가 자료
* [서비스 워커 소개][sw_primer]
* [Is ServiceWorker ready?][is_sw_ready] - 주요 브라우저에서 구현 상태 추적
* [자바스크립트 프라미스 소개](/web/fundamentals/getting-started/primers/promises) - 프라미스 안내


[ttt]: https://jakearchibald.github.io/trained-to-thrill/
[is_sw_ready]: https://jakearchibald.github.io/isserviceworkerready/
[sw_primer]: /web/fundamentals/getting-started/primers/service-workers
[caches_api]: https://developer.mozilla.org/en-US/docs/Web/API/Cache


{# wf_devsite_translation #}
