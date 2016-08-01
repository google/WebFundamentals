---
title: "서비스워커 업데이트 하기"
description: "서비스워커 업데이트가 필요한 시점이 있을 것입니다."
updated_on: 2016-01-19
translators:
  - captainpangyo
---

<p class="intro">서비스워커 업데이트가 필요한 경우 아래의 절차를 따릅니다:</p>

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

{% highlight javascript %}
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
{% endhighlight %}
