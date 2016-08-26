project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 페이지가 등록 절차를 시작하면 서비스워커 스크립트에서 `install` 이벤트를 처리하는 서비스워커 스크립트를 봅니다.

{# wf_review_required #}
{# wf_updated_on: 2016-01-18 #}
{# wf_published_on: 2000-01-01 #}

# 서비스워커 설치하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



페이지가 등록 절차를 시작하면 `install` 이벤트를 처리하는 서비스워커 스크립트를 봅니다.

아래는 가장 간단한 예제로 install 이벤트를 위한 콜백함수를 선언하고 어떤 파일을 캐쉬할 것인지 정합니다.


    self.addEventListener('install', function(event) {
      // Perform install steps
    });
    

`install` 콜백 안에서 다음 절차를 따라야 합니다.

1. 캐쉬를 연다.
2. 파일들을 캐쉬한다.
3. 필요한 파일들이 모두 캐쉬가 되었는지 확인한다.


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
