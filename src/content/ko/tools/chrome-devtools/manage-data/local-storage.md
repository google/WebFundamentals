project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Application 패널에서 저장소, 데이터베이스 및 캐시를 검사하고 관리합니다.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# 저장소, 데이터베이스 및 캐시를 검사하고 관리 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
<strong>Application</strong> 패널에서 저장소, 데이터베이스 및 캐시를 검사하고 관리합니다.



### TL;DR {: .hide-from-toc }
- 로컬 및 세션 저장소를 보고 편집합니다.
- IndexedDB 데이터베이스를 검사하고 수정합니다.
- Web SQL 데이터베이스에서 명령문을 실행합니다.
- 애플리케이션 및 서비스 워커 캐시를 봅니다.
- 한 번의 버튼 클릭으로 모든 저장소, 데이터베이스, 캐시 및 서비스 워커를 한꺼번에 지웁니다.


## 로컬 저장소 {:#local-storage}

로컬 저장소 키-값 쌍(KVP)을 저장하기 위해 [로컬 저장소][ls]를 사용하는 경우, 이와 같은 KVP를 
**Local Storage** 창에서 검사, 수정 및 삭제할 수 있습니다.

![Local Storage 창][ls-pane]

* 키 또는 값을 두 번 클릭하면 해당 값을 편집할 수 있습니다.
* 빈 셀을 두 번 클릭하면 새 KVP를 추가할 수 있습니다.
* KVP를 클릭하고 **delete** 버튼
(![delete 버튼][delete]{:.inline})을 누르면 해당 KVP가 삭제됩니다. [**Clear storage** 창](#clear-storage)에서 
한 번의 버튼 클릭으로 로컬 저장소 데이터를 
모두 지울 수 있습니다.
* 페이지와 상호작용하면서 KVP를 생성, 삭제 또는 수정하면 
변경 내용이 실시간으로 업데이트되는 것을 확인할 수 없습니다. 변경 내용을 확인하려면
**refresh** 버튼(![refresh 버튼][refresh]{:.inline})을 클릭합니다.

[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## 세션 저장소{:#session-storage}

**Session Storage** 창도 **Local Storage**
창과 똑같이 작용합니다. 위의 [로컬 저장소](#local-storage) 섹션에서
[세션 저장소][ss]를 보고 편집하는 방법을 알 수 있습니다.

[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

**IndexedDB** 창을 사용하면 IndexedDB 데이터를 검사, 수정 및 삭제할 수 있습니다.

**IndexedDB** 창을 확장하면 그 아래 맨 첫 단계가
데이터베이스입니다. 활성 상태인 데이터베이스가 여러 개인 경우에는 항목이 여러 개 
표시됩니다. 아래 스크린샷에서는 페이지에 대한 활성 데이터베이스가 하나뿐입니다.

![indexeddb 탭][idb-tab]

데이터베이스의 이름을 클릭하면 해당 데이터베이스의 보안 시작점, 이름 및 버전을
볼 수 있습니다.

![indexeddb 데이터베이스][idb-db]

데이터베이스를 확장하면 해당 데이터베이스의 키-값 쌍(KVP)을 볼 수 있습니다.

![indexeddb 키-값 쌍][idb-kvps]

**Start from key** 텍스트 입력란 옆에 있는 화살표 버튼을 사용하면 여러 개의 KVP 페이지 사이를
이동할 수 있습니다.

값을 확장하고 두 번 클릭하면 해당 값을 편집할 수 있습니다.
값을 추가, 수정 또는 삭제하는 경우 변경 내용이 실시간으로 업데이트되지
않습니다. 데이터베이스를 업데이트하려면 **refresh** 버튼을 클릭합니다.
![indexeddb kvp 편집][idb-edit]

**Start from key** 텍스트 입력란에 키를 입력하면 해당 키보다 값이 작은 모든 키를 필터링하여
걸러내게 됩니다.

![필터링된 kvp][idb-filter]

값을 추가, 수정 또는 삭제해도 변경 내용이 실시간으로 업데이트되지
않습니다. 데이터베이스를 업데이트하려면 **refresh** 버튼(![refresh 버튼][refresh]{:.inline})
을 클릭합니다.

**clear object store** 버튼(![clear object store][cos]{:.inline})
을 클릭하면 데이터베이스에서 모든 데이터가 삭제됩니다. 이는 서비스 워커 등록을 해제하고
다른 저장소와 캐시를 삭제하는 방법으로도 가능합니다. 그러려면
[**Clear storage** 창](#clear-storage)에서 한 번만 클릭하면 됩니다.

[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

**Web SQL** 창은 Web SQL 데이터베이스를 쿼리하고 수정하는 데 사용합니다.

데이터베이스 이름을 클릭하면 해당 데이터베이스의 콘솔이 열립니다. 여기에서
해당 데이터베이스의 명령문을 실행할 수 있습니다.

![web sql 콘솔][wsc]

데이터베이스 테이블을 클릭하면 해당 테이블의 데이터를 볼 수 있습니다.

![web sql 테이블][wst]

* 여기에서 값을 업데이트할 수 없지만, 데이터베이스 콘솔을 통해 
할 수 있습니다(위 내용 참조).
* 열 헤더를 클릭하면 테이블이 해당 열을 기준으로 정렬됩니다.
* 테이블을 변경해도 변경 내용이 실시간으로 업데이트되지 않습니다. 업데이트한 내용을 확인하려면 
**refresh** 버튼(![refresh 버튼][refresh]{:.inline})을 
클릭합니다.
* 공백으로 구분되거나 쉼표로 구분된 열 이름 목록을
**Visibile columns** 텍스트 입력란에 입력하면 해당 열만 표시됩니다.

[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## 애플리케이션 캐시 {:#application-cache}

**Application Cache** 창을 사용하면
[Application Cache API][appcache-api]를 통해 생성된 리소스와 규칙을 검사할 수 있습니다.

![Application Cache 창][appcache]

각 행은 리소스를 나타냅니다.

**Type** 열에는 다음 값 중 하나가 표시됩니다.

* **Master**. 리소스에 `manifest` 속성이 있으면 이 캐시가 
해당 리소스의 마스터라는 뜻입니다.
* **Explicit**. 이 리소스가 매니페스트에 명시적으로 나열되어 있습니다.
* **Network**. 매니페스트에 이 리소스는 네트워크에서 가져와야 한다고 지정되어 
있습니다.
* **Fallback**. **Resource** 열의 URL이 또 다른 URL(DevTools에 표시되지 않음)
을 대체하여 나열되어 있습니다.

테이블 맨 아래를 보면 상태 아이콘이 있고, 네트워크
연결 및 애플리케이션 캐시의 상태를 나타냅니다. 애플리케이션 캐시의 상태는 
다음과 같습니다.

* **IDLE**. 캐시에 새 변경 사항이 없습니다.
* **CHECKING**. 매니페스트를 가져오는 중이며 업데이트된 내용이 있는지 확인 중입니다.
* **DOWNLOADING**. 캐시에 리소스가 추가되는 중입니다.
* **UPDATEREADY**. 캐시의 새 버전을 이용할 수 있습니다.
* **OBSOLETE**. 캐시를 삭제하는 중입니다.

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## 서비스 워커 캐시 {:#service-worker-caches}

**Application** 패널에 있는 **Cache Storage** 창을 사용하면 (서비스 워커) Cache API로 생성한 캐시를 검사, 
수정 및 디버그할 수 있습니다. 추가 도움이
필요하면 아래의 가이드를 참조하세요.

{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## 서비스 워커, 저장소, 데이터베이스 및 캐시 지우기 {:#clear-storage}

때로는 주어진 출처에서 가져온 데이터를 모두 지워야 하는 경우가 있습니다. **Application** 패널의 **Clear 
Storage** 창을 사용하면 서비스 워커 저장소 및 캐시를 선택적으로 등록 해제할 수 
있습니다. 데이터를 지우려면 지우고자 하는 구성 요소 옆에 있는 확인란을 
선택한 다음 **Clear site 
data**를 클릭하기만 하면 됩니다. 이 작업은 
**Clear storage** 레이블 아래 나열된 출처의 데이터를 모두 지웁니다.

![clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
