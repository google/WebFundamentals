project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 크롬 버전 46 에서 캐쉬 관리에 대한 새로운 메서드가 추가 되었습니다. 크롬 47 도 추가된 것 처럼, 48 도 그렇게 되겠지요. 절대 멈추지 않습니다!


{# wf_updated_on: 2016-06-23 #}
{# wf_published_on: 2015-09-02 #}
{# wf_tags: news,serviceworker,cache #}


# 서비스워커 cache API 업데이트 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

요즘 서비스워커 캐쉬 API 작은 업데이트에 대해서 글을 써달라고 부탁을 받았습니다.
그렇다고 해서 기사를 써야하는 건 아닌거 같았지만 긴 토론 끝에 결국 가위바위보 게임으로 넘어왔고,
그 결과 이렇게 글이 나오게 되었습니다.

크롬의 서비스워커 cache API 구현에 관한 업데이트를 들을 준비가 되었나요?

대답이 잘 안들리네요! 준비 되셨나요?

(의자 위로 뛰어 올라서 "아싸" 라고 외치셔야 읽을 수 있을 겁니다, 그리고 동시에 밧줄을 돌리는 척 해야할 겁니다)

## 크롬 46에 도착한 cache.addAll

예 맞습니다! 캐쉬! 점 add all! 이 크롬 46버전에 추가되었어요.

자 풍자를 뒤로하고, 이건 정말 엄청난 겁니다 왜냐면 `cache.addAll`이 [cache “essentials” polyfill](https://github.com/coonsta/cache-polyfill/blob/master/index.js){: .external }의 마지막 남은 부분이었거든요.
이제 더이상 필요 없게 되었습니다.

`cache.addAll`가 어떻게 동작하는지 확인하시죠:


    // when the browser sees this SW for the first time
    self.addEventListener('install', function(event) {
      // wait until the following promise resolves
      event.waitUntil(
        // open/create a cache named 'mysite-static-v1'
        caches.open('mysite-static-v1').then(function(cache) {
          // fetch and add this stuff to it
          return cache.addAll([
            '/',
            '/css/styles.css',
            '/js/script.js',
            '/imgs/cat-falls-over.gif'
          ]);
        })
      );
    });
    

`addAll` 는 url과 필요한 리소스의 요청들을 배열로 받고, 페치합니다. 그리고 캐쉬에 저장하죠.
이건 transactional 한 성격을 지니고 있습니다. 왜냐면 어느 하나라도 페치나 쓰기가 실패하면 전체 동작이 실패하기 떄문이죠.
그리고 실패한 캐쉬는 이전 상태로 돌아갑니다. 이건 위와 같이 일부분이라도 실패하면 전체가 실패해야 하는 특정한 설치 상황에서만 유용합니다.

**업데이트**: 크롬 50 경우에는, `cache.addAll()`과 `cache.add()` 동작이 [조금 바뀌었습니다](https://github.com/dstockwell/chromium/commit/d8a95558a04b5734bc5568546097799d942aaec5#diff-c0babf201659e01414abe4a511fb8c7cR218).
현재는 캐쉬에 추가된 모든 응답들은 2.xx 응답 코드를 [갖고 있어야만 합니다.](https://github.com/slightlyoff/ServiceWorker/issues/823){: .external }
non-CORS 요청에서 비롯된 [opaque](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque)를 포함한 2xx 응답 코드가 아닌 응답들은 `cache.addAll()`를 거절합니다.

위 예제는 서비스워커 안에 있지만, 캐쉬 API 는 페이지에서 완전히 접근이 가능합니다.

Firefox는 [developer edition](https://www.mozilla.org/en-GB/firefox/developer/){: .external }에서 이 API를 이미 지원하고 있습니다. 곧 서비스워커 구현에 관련된 나머지 내용들에 대해서도 지원을 하겠죠.

여기서 잠깐, 이게 전부가 아닙니다. 이 과정안에 캐쉬의 개선된 부분이 더 있습니다.

## 크롬 47 버전에 추가될 cache.matchAll

이 API는 여러개의 매칭을 가능하게 합니다.


    caches.open('mysite-static-v1').then(function(cache) {
      return cache.matchAll('/');
    }).then(function(responses) {
      // …
    });
    

위 예제에서는 `mysite-static-v1` 안에서 `/`와 일치하는 모든 요청들을 얻어옵니다.
캐쉬는 각 URL 마다 여러 개의 엔트리 파일들을 얻게 합니다. 다만, 각 파일들은 독립적으로 캐쉬가 가능해야합니다.
예) 각각 다른 `Vary` 헤더가 필요합니다.

Firefox는 [developer edition](https://www.mozilla.org/en-GB/firefox/developer/){: .external }에서 이 API를 이미 지원하고 있습니다. 곧 서비스워커 구현에 관련된 나머지 내용들에 대해서도 지원을 하겠죠.

## 크롬에 곧.. 추가될 캐쉬 쿼리 옵션

아래는 표준적인 페치 핸들러의 예제입니다:


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });
    

만약 `/` 를 캐쉬하고 `/`의 요청을 받아오면, 이들은 캐쉬에서 제공됩니다.
그러나, `/?utm_source=blahblahwhatever` 의 요청은 캐쉬에서 받지 못합니다.
아래와 같이 로직에 url search string 무시 옵션을 넣어 해결이 가능합니다.


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request, {
          ignoreSearch: true
        }).then(function(response) {
          return response || fetch(event.request);
        })
      );
    });
    

이제 `/?utm_source=blahblahwhatever`가 `/`의 엔트리와 매치가 가능하니다. 이같은 옵션들은:
* `ignoreSearch` - 요청과 캐쉬된 결과에서 url 검색하는 부분을 무시한다.
* `ignoreMethod` - 요청 메서드를 무시하여, 캐쉬에서 POST 요청도 GET 엔트리에 접근할 수 있다.
* 'ignoreVary' - 캐쉬된 응답에서 vary 헤더를 무시한다.

Firefox 는 이미 이들을 지원합니다. [Ben Kelly](https://twitter.com/wanderview){: .external }에 한테 가서 얼마나 그가 대단한지 말해주세요.

만약 캐쉬 쿼리 옵션을 어떻게 크롬이 구현하는지 알고 싶으시다면, [crbug.com/426309](https://code.google.com/p/chromium/issues/detail?id=426309)를 확인하세요.

“what we implemented in the cache API” 챕터로 다시 찾아뵙겠습니다!


Translated By:
{% include "web/_shared/contributors/captainpangyo.html" %}

{% include "comment-widget.html" %}