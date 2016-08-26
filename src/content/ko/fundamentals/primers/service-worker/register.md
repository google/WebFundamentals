project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서비스워커를 설치하려면 페이지에서 **등록**을 해야합니다.

{# wf_review_required #}
{# wf_updated_on: 2016-01-18 #}
{# wf_published_on: 2000-01-01 #}

# 서비스워커 등록하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



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

![Inspect service workers](images/sw-chrome-inspect.png)

서비스워커가 처음 실행되고 있을 때 주소창에 `chrome://serviceworker-internals` 을 입력하면 서비스워커 상세 정보를 확인할 수 있습니다.
서비스워커의 라이프싸이클만 확인 하는 것이면 유용할지 모르나, `chrome://inspect/#service-workers`가 곧 완전히 이 자리를 대체할 것입니다.

Incognito 윈도우에서는 이전 서비스워커가 새로운 윈도우에 영향을 주지 않는 선에서 열기 닫기가 가능하기 때문에 서비스워커 테스트가 유용할 수도 있습니다.
다만 Incognito 윈도우 안에서 생성된 캐쉬나 서비스워커 등록은 윈도우가 닫히면 사라지게 됩니다.
