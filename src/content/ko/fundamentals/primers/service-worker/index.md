project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸쉬 알림&mdash;네이티브 어플리케이션이 일반적으로 요구하는 기능&mdash; 이 웹으로 오고 있습니다. 서비스워커는 이 모든 특징들이 기댈 수 있는 기술적 기반을 제공합니다.

{# wf_review_required #}
{# wf_updated_on: 2016-01-17 #}
{# wf_published_on: 2000-01-01 #}

# 서비스워커 소개 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



풍부한 오프라인 경험, 주기적 백그라운드 동기화, 푸쉬 알림&mdash;네이티브 어플리케이션에서 일반적으로 필요한 기능들&mdash; 이 앞으로 웹에서 지원이 가능합니다. 서비스워커는 이 모든 특징들이 구현 가능하도록 기술적 기반을 제공합니다.

## 서비스워커란 무엇인가?

서비스워커는 백그라운드에서 브라우저에 의해 동작되는 스크립트입니다, 웹 페이지와는 별개로 동작하며
웹 페이지나 사용자와의 인터렉션이 필요 없는 기능들에 대해서 새로운 길을 만들어주고 있습니다.
현재, [push notifications](/web/updates/2015/03/push-notifications-on-the-open-web)와 [background sync](/web/updates/2015/12/background-sync) 기능들이 나와 있습니다.
추후에는 서비스워커가 주기적인 동기화 또는 지포펜싱 (geofencing) 등이 지원될 것입니다.
이 튜토리얼에서 다뤄질 핵심 기능은 네트워크 요청을 가로채고 처리하는 것과 응답 캐쉬를 코드상에서 관리하는 것입니다.

서비스워커가 흥미로운 API인 이유는 개발자가 완벽히 통제할 수 있는 오프라인 경험을 지원한다는 사실입니다.

서비스워커 전에는 오프라인 경험을 지원하는 [AppCache](http://www.html5rocks.com/en/tutorials/appcache/beginner/) 라는 API가 있었습니다.
앱 캐쉬의 주된 문제점은 [number of gotcha's](http://alistapart.com/article/application-cache-is-a-douchebag)인데 이게 멀티 페이지 사이트가 아닌 싱글 페이지 웹앱에서만 잘 동작합니다. 서비스워커는 이러한 문제점들을 피하기 위해 만들어졌습니다.

서비스워커에 대해 알아둘 점:

* [JavaScript Worker](http://www.html5rocks.com/en/tutorials/workers/basics/) 입니다,
  그렇기 때문에 DOM을 직접적으로 접근할 수 없습니다. 대신, 서비스워커는 페이지와 [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 인터페이스를 통해 커뮤니케이션이 가능하고, 필요하면 페이지들이 DOM을 조작할 수 있습니다.
* 프로그래밍이 가능한 네트워크 프록시 입니다. 페이지의 네트워크 요청 처리를 제어할 수 있습니다.
* 사용하지 않을 때는 종료되고, 다음번에 필요하면 재시작됩니다. 서비스워커의 `onfetch`와 `onmessage` 핸들러의 전역 상태에 의존할 수 없습니다. 만약 유지해야 하는 정보가 있고 재시작시 다시 사용해야 한다면, [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를 이용합니다.
* 자바스크립트 프로미스를 확장하여 사용할 수 있습니다. 만약 프로미스를 모르면 더 읽기 전에 이 링크를 먼저 확인합니다. [Jake Archibald's article](/web/fundamentals/primers/promises/)
