project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 응답 시간 및 오프라인 지원 개선을 위해 데이터를 로컬에 저장하는 방법에 대해 알아봅니다.

{# wf_updated_on: 2016-09-29 #}
{# wf_published_on: 2016-09-29 #}

# Progressive Web App용 오프라인 저장소 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="DevTools의 PWA">
  <figcaption>
    <a href="https://pokedex.org" class="external">Pokedex</a>
    Cache API는 URL 주소 지정 가능한 리소스로 사용되는 반면에
   Progressive Web App은 애플리케이션 상태 및 Pokemon 데이터 집합에 IndexedDB를 사용합니다.
  </figcaption>
</figure>

인터넷 연결은 이동 중에 없거나 쉽게 끊어질 수 있으므로
 오프라인 지원 및 신뢰할 수 있는 성능은 [Progressive Web App](/web/progressive-web-apps/)의
일반적인 기능으로 제공됩니다. 완벽한
무선 환경에서도 캐싱 및 기타 저장 기술을 현명하게 사용하면
사용자 환경이 크게 향상될 수 있습니다. 이 글에서는
PWA용 오프라인 데이터 저장소에 대한 몇 가지 아이디어를 요약하여 설명합니다.
*의미 있는* 경험을 오프라인으로 제공하는 데 필요한
JSON 페이로드, 이미지 및 일반 정적 데이터에 대해 생각해 보세요.

<div class="clearfix"></div>

## 권장 사항

오프라인으로 데이터를 저장하는 것과 관련된 일반적인 권장 사항은 다음과
같습니다.

* URL 주소 지정 가능한 리소스의 경우 [서비스 워커](/web/fundamentals/primers/service-worker/)의 일부인
 [**Cache API**](https://davidwalsh.name/cache)를 사용합니다.
* 기타 모든 데이터의 경우 ([프라미스](/web/fundamentals/getting-started/primers/promises) 래퍼와 함께)
 [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를 사용합니다.

그 근거는 다음과 같습니다.

두 API는 모두 비동기식입니다(IndexedDB는 이벤트 기반이고
Cache API는 프라미스 기반). 또한 [웹 워커, 창 및
서비스 워커](https://nolanlawson.github.io/html5workertest/)를  사용합니다. IndexedDB는
[모든 곳](http://caniuse.com/#feat=indexeddb)에서 사용할 수 있습니다. 서비스 워커(및
Cache API)는 이제
Chrome, Firefox 및 Opera에서 [사용할 수 있으며](https://jakearchibald.github.io/isserviceworkerready/)
Edge용으로 개발 중입니다. IndexedDB에 대한
프라미스 래퍼는 IndexedDB 라이브러리와 함께 제공되는
강력하지만 복잡한 절차(예: 트랜잭션, 스키마 버전 관리)를
숨깁니다. IndexedDB는
탭 간 간편한 동기화를 허용하는 [관찰자(observer)](https://github.com/WICG/indexed-db-observers)를
지원합니다.

Safari 10은
최신 Tech Preview에서 [오래된 많은 IndexedDB 버그를
수정했습니다](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26). 참고:  Safari 10의 IndexedDB 및
PouchDB에서 안정성 문제가 발생하여 속도가 다소
느린 경우가 있습니다. 더 많은 연구가 이루어지기 전에는 마일리지가 다를 수 있습니다.
webkit 이용자 및 관련 OSS 라이브러리 작성자가 살펴볼 수 있도록
브라우저 버그를 테스트하고 정리하세요. LocalForage, PouchDB, YDN 및 Lovefield는
(끊어진 IndexedDB에 대한 효율적인 기능 테스트 방법이 없기 때문에)
기본적으로 Safari에서 WebSQL을 사용합니다. 즉, 해당 라이브러리는 
별도의 작업 없이 Safari 10에서 작동합니다(IndexedDB를 직접 사용하지 않음).

PWA의 경우 Cache API를 통해 애플리케이션 셸(JS/CSS/HTML 파일)을
작성하여 정적 리소스를 캐시하고 IndexedDB에서
오프라인 페이지 데이터를 채울 수 있습니다. IndexedDB에 대한 디버깅 지원은 이제
[Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)
(Application 탭),
Opera, [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)(Storage Inspector)
및 Safari(Storage 탭 참조)에서 사용할 수 있습니다.

## 다른 저장소 메커니즘은?

웹 저장소(예: LocalStorage 및 SessionStorage)는 동기식이며 Web Worker를
지원하지 않으며 크기와 유형(문자열 전용)이 제한되어 있습니다. 쿠키는 [용도가
있지만](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) 동기식이며
Web Worker를 지원하지 않으며 크기가 제한되어 있습니다.
WebSQL은 광범위한 브라우저 지원을 제공하지 않으므로 사용하지 않는 것이 좋습니다.
File System API는 Chrome을 제외한 모든 브라우저에서 지원되지 않습니다. [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)는
[File and Directory Entries API](https://wicg.github.io/entries-api/)
및
[File API](https://w3c.github.io/FileAPI/)
사양에서 개선 중이지만 아직은 널리
채택할 만큼 충분히 성숙되었거나 표준화되지 않았습니다.

## 저장 가능한 양은?

<table>
  <thead>
    <th>브라우저</th>
    <th>제한</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>여유 공간의 6% 미만</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>여유 공간의 10% 미만</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>50MB 미만</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>250MB 미만</td>
    </tr>
  <tbody>
</table>

Chrome 및 Opera에서 저장소 용량은 API 단위가 아닌 원본 단위(per origin)입니다. 이
두 저장소 메커니즘은 브라우저
[할당량](http://www.html5rocks.com/en/tutorials/offline/quota-research/)에 도달할 때까지 데이터를
저장합니다. 앱은 [Quota Management API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota)를
통해 사용 중인 할당량을 확인할 수 있습니다. Chrome에서
앱은 최대 6%의 디스크 여유 공간을
사용할 수 있습니다. Firefox에서 앱은 최대 10%의 디스크 여유 공간을 사용할 수 있지만
50MB의 데이터가 저장되면 추가 저장소를 요청하는 메시지를 표시합니다. 모바일 Safari에서
앱은 최대 50MB까지 사용할 수 있는 반면 데스크톱 Safari는
무제한 저장을 허용합니다(5MB 저장 후에 안내 메시지 표시). IE10+은 최대 250MB까지 사용할 수 있으며
10MB 저장 후에 안내 메시지를 표시합니다. PouchDB는 IDB 저장 동작을
[추적](https://pouchdb.com/faq.html#data_limits)합니다.

## 앱이 사용하는 저장소 공간의 크기를 확인하는 방법은?

Chrome에서 [Quota Management API](https://www.w3.org/TR/quota-api/)를
통해 현재 사용 중인 저장소 공간의 크기와 애플리케이션에서
사용할 수 있는 용량을 쿼리할 수 있습니다. 새로 제공된 [Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736)를 사용하면
프라미스 지원을 통해 원본에서 사용 중인 할당량을 훨씬 쉽게
찾을 수 있습니다.

## 캐시 제거 작동 방식은?

<table>
  <thead>
    <th>브라우저</th>
    <th>제거 정책</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>Chrome에 공간이 부족하면 오래 전에 사용한 항목 제거</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>전체 디스크가 가득 차면 오래 전에 사용한 항목 제거</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>제거 안 함</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>제거 안 함</td>
    </tr>
  <tbody>
</table>

원본에는 적당한 공간이 제공됩니다. 이 여유 공간은
각종 원본 저장소(IndexedDB, Cache API, localStorage 등)가
공유합니다. 제공되는 여유 공간은 사양으로 지정되지 않고 기기와 저장소 상태에
따라 다릅니다.

웹 저장소 공간이 부족하면 UA는 사용 가능한 공간을 확보하기 위해 저장소를 비웁니다. 이 경우
오프라인 응답성을 저해할 수 있으므로 최근에 업데이트된
[저장소](https://storage.spec.whatwg.org/) 사양은 'Persistent' 및
'Best effort'(기본값) 전략을 정의합니다. “Best effort”는
사용자를 방해하지 않고 저장소를 비울 수 있음을 의미하지만
장기간 및/또는 중요한 데이터에 대한 영구성이 떨어집니다. 현재 IndexedDB와 Cache API는
모두 “Best effort” 범주에 해당합니다.

'Persistent' 저장소는 저장소 공간이 부족할 때 자동으로 비워지지 않습니다. 사용자가
(브라우저 설정을 통해) 해당 저장소를 수동으로 비워야 합니다. Chrome은
Origin Trial을 통해 [Persistent
Storage](/web/updates/2016/06/persistent-storage)에
대한 지원을 실험해왔으며 최신 뉴스에 따르면
해당 저장소는 [Chrome
55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ)에 제공될 예정입니다.

## 현재 및 미래 오프라인 저장소 작업

오프라인 저장소에 관심이 있는 경우 다음을
참조하세요.

* [Durable Storage](https://storage.spec.whatwg.org/): 사용자 에이전트의
지우기 정책으로부터 저장소를 보호합니다.

* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): 고급
키-값 데이터 관리를 지원합니다.

* [Promisified
IndexedDB](https://github.com/inexorabletash/indexeddb-promises): 프라미스 친화적인
버전의 IndexedDB에 대한 기본 지원을 제공합니다.

* [IndexedDB Observers](https://github.com/WICG/indexed-db-observers): 데이터베이스 래퍼가
필요 없는 기본 IndexedDB 관찰을 지원합니다.

* [Async Cookies API](https://github.com/bsittler/async-cookies-api): 문서
및 워커에 대한 비동기 JavaScript Cookies API입니다.

* [Quota Management API](https://www.w3.org/TR/quota-api/): 앱/원본이
사용하는 할당량을 확인합니다.

* [writable-files](https://github.com/WICG/writable-files): 사이트에서
로컬 파일과 훨씬 원활하게 상호작용할 수 있도록 지원합니다.

* [Directory downloads](https://github.com/drufball/directory-download): 사이트에서
.zip 파일 없이 디렉토리를 다운로드할 수 있도록 지원합니다.

* [File and Directory Entries API](https://wicg.github.io/entries-api/):
드래그 앤 드롭 방식을 통한 파일 및 디렉토리 업로드를 지원합니다.

* 현재 [Async Cookies
API](https://github.com/WICG/async-cookies-api)는
폴리필을 통해 지원하도록 구상하고 있습니다.

* Debugging IndexedDB는 현재 Edge에서 지원되지 않습니다(기본 JetDB는
디버그할 수 있음).
기본 제공 지원에 대한 투표는 [여기](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)에서
하세요.

* 비동기 LocalStorage에 대한 [아이디어](https://github.com/slightlyoff/async-local-storage)는
과거부터 있었지만, 현재는 [IndexedDB 2.0](https://w3c.github.io/IndexedDB/)을
개선하는 데 중점을 두고 있습니다.

* [writable-files](https://github.com/WICG/writable-files) 제안은
원활한 로컬 파일 상호작용을 위한 더 나은 표준 추적 솔루션을
제공할 수 있습니다.

* 더욱 영구적인 저장소가 필요한 앱의 경우
[Durable Storage](https://storage.spec.whatwg.org/)에서 진행 중인 작업을 참조하세요.

오프라인 저장소는 마법 같은 것이 아니며 기본 API에 대한
이해는 현재 사용할 수 있는 기능을 최대한 활용하는 데 도움이 됩니다.
이러한 API를 직접 사용하든
추상화 라이브러리를 사용하든 그 방법을 숙지하세요.

이 가이드가 PWA를 빛나게 만드는 오프라인 경험을 만드는 데
일조하기를 바랍니다! ✨

### 관련 자료

* [State of Offline Storage
APIs](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)
(저자: Joshua Bell)

* [Browser Database
Comparison](http://nolanlawson.github.io/database-comparison/) (저자: Nolan Lawson)

* [IndexedDB, WebSQL, LocalStorage — What Blocks the
DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)

* [How to Think about Databases (Pokedex
research)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)

* [Which APIs are Supported in Web Workers and Service
Workers?](https://nolanlawson.github.io/html5workertest/)

###유용한 리소스

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)(동적/런타임 요청에
대한 오프라인 캐싱)

* [sw-precache](https://github.com/GoogleChrome/sw-precache)(정적 자산/애플리케이션 셸에
대한 오프라인 사전 캐싱)

* Webpack 사용자는 위의 항목 또는
[offline-plugin](https://github.com/NekR/offline-plugin)을 직접 사용할 수 있습니다.

### 검토할 가치가 있는 IndexedDB 라이브러리

* [localForage](https://github.com/localForage/localForage)(약 8KB, 프라미스, 훌륭한
레거시 브라우저 지원)

* [Dexie](http://dexie.org/)(약 16KB, 프라미스, 복잡한 쿼리, 보조
색인)

* [PouchDB](https://pouchdb.com/)(약 45KB ([사용자설정
빌드](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html) 지원),
동기화)

* [Lovefield](https://github.com/google/lovefield)(관계형)

* [LokiJS](http://lokijs.org/#/)(인메모리)

* [ydn-db](https://github.com/yathit/ydn-db)(dexie와 유사, WebSQL 사용)

**웹 저장소 공간에 대한 정보는 Nolan Lawson, Joshua Bell(Open Web Storage 및
[BlinkOn talk](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit) 관련 글에서 많은 영감을
받았음), Jake Archibald, Dru Knox 및 기타 연구자의 글을
참조했으며, 그들에게 감사드립니다.**



{# wf_devsite_translation #}
