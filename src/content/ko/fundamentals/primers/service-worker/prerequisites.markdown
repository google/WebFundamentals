---
title: "전제 조건"
description: "다른 걸 하기전에, 우리가 알맞은 기술환경을 가지고 있는지 확인합니다."
updated_on: 2016-02-04
translators:
  - captainpangyo
---

<p class="intro">
다른 걸 하기전에, 우리가 알맞은 기술환경을 가지고 있는지 확인합니다.
</p>

## 알맞은 브라우저 사용하기

브라우저는 점점 다양해 지고 있습니다. 서비스워커는 파이어폭스와 오페라 등이 지원하고,
마이크로소프트의 Edge는 현재 다음 상태입니다. [showing public support](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker)
Safari는 향후 서비스워커를 지원할 계획입니다. [hints of future development](https://trac.webkit.org/wiki/FiveYearPlanFall2015)
이 사이트에서 브라우저 지원의 진행상황을 확인할 수 있습니다. [is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/)

### 크롬 버전은 몇을 지원할까요?

크롬 46 버전 또는 그 이상이 아니면, [please upgrade now](https://support.google.com/chrome/answer/95414) 를 참조합니다.
그 이하 버전의 경우에는 `Cache.addAll()` 를 포함한 서비스워커 기능들을 지원하지 않습니다.

만약 이전 버전을 사용해야만 하는 상황이라면, [a polyfill](https://github.com/coonsta/cache-polyfill) 를 이용하여
기능을 추가할 수 있습니다. `dist/serviceworker-cache-polyfill.js`을 사이트에 추가하고 `importScripts()` 메서드를 이용하여
서비스워커에서 사용합니다. 임포트된 스크립트는 서비스워커가 자동으로 캐쉬합니다.

{% highlight javascript %}
importScripts('serviceworker-cache-polyfill.js');
{% endhighlight %}

## HTTPS 통신이 필요합니다

개발 중에 `localhost`를 통해 서비스워커를 사용할 수 있지만,
사이트에 디플로이 하려면 서버에 HTTPS 설정을 해주어야만 합니다.

서비스워커를 사용하면 연결을 가로챌 수 있고, 조작할 수 있고, 응답을 필터링 할 수 있습니다.
정말 강력한 기능이죠. 당신이 이 기능들을 좋은 곳에 사용하는 반면에, 중간에 있는 사람은 그렇지 않을 수 있습니다.
이를 피하기 위해 HTTPS 통신으로 제공되는 페이지들에만 서비스워커를 등록할 수 있습니다.
그렇게 해서 브라우저가 받은 서비스워커가 네트워크 통신중에 조작되지 않는 것을 확인할 수 있습니다.

[Github Pages](https://pages.github.com/) 는 HTTPS를 통해 제공되기 때문에, 데모를 올리기 좋은 장소입니다.

만약 서버에 HTTPS를 추가하고 싶으면, TLS 증명서를 구해서 서버에 세팅해야 합니다.
서버에 따라 설정이 다양하기 때문에 해당 서버의 다큐멘트나 이 링크를 확인하세요. [Mozilla's SSL config generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
