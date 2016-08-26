project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서비스워커를 설치했으니 아마도 캐쉬된 응답을 돌려줘야 할 차례인 것 같습니다.

{# wf_review_required #}
{# wf_updated_on: 2016-01-18 #}
{# wf_published_on: 2000-01-01 #}

# 캐쉬와 리턴 요청 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



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
   응답의 타입이 [스트림](https://streams.spec.whatwg.org/) 방식이기 때문에 바디는 오직 한번만 사용될 수 있습니다.
   만약 브라우저로 응답을 보내거나 캐쉬에서 사용하려면 응답을 복제 해서 한개는 브라우저에 한개는 캐쉬에 보낼 수 있습니다.
