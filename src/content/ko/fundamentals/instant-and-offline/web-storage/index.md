project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# 웹 저장소 개요 {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

로컬 기기 저장소와 클라우드 기반 서버 저장소 모두에 적합한
저장소 메커니즘을 선택해야 합니다.  우수한 저장소 엔진을 사용하면
정보를 안정적으로 저장하고 대역폭을 줄이며 응답성을 개선할 수
있습니다. 올바른 저장소 캐싱 전략은 오프라인 모바일 웹 환경을
활성화하는 핵심 구성 요소입니다. 

이 글은 저장소 API 및 서비스를 평가하는 간단한 근거를
제공하고 비교 표와 몇 가지 일반적인 지침을
제공합니다. 저장소를 심도 있게 이해할 수 있는 리소스를 조만간
추가할 예정입니다.

## 저장소 분류

먼저 웹 앱의 데이터 저장소를 분석할 수 있는 몇 가지 차원에 대해
알아보겠습니다. 그리고 나서 이 프레임 워크를 사용하여 웹 개발자가
이용할 수 있는 다양한 저장소 옵션을 열거하고 평가해 보겠습니다.

### 데이터 모델

데이터 단위 저장 모델은 저장 및 검색 요청의 사용 용이성, 비용 및 성능에
영향을 미치는 데이터 내부 구성 방식을
결정합니다. 

* **구조적: **전형적인 SQL 기반 데이터베이스 관리 시스템과
마찬가지로, 미리 정의된 필드가 있는 테이블에 저장된 데이터는
전 범위의 쿼리 유형이 선험적으로 알려지지 않은 유연하고 동적인 쿼리에
적합합니다. 구조적 데이터 저장소의 주요한 예로는 브라우저의
IndexedDB가 있습니다.

* **키/값:** 키/값 데이터 저장소 및 관련 NoSQL 데이터베이스는
고유한 키로 색인이 생성된 구조화되지 않은 데이터를 저장 및 검색하는 기능을 제공합니다.
키/값 데이터 저장소는 색인이 생성된 불투명한 데이터에 대한
액세스를 항상 허용한다는 점에서 해시 테이블과 비슷합니다. 키/값 데이터 저장소의 주요한 예로는
브라우저의 Cache API와 서버의 Apache Cassandra가 있습니다.

* **바이트 스트림:** 이 간단한 모델은 데이터를 가변 길이의 불투명한 바이트 문자열로
저장하여 애플리케이션 계층에 내부 조직의 형태를
유지합니다. 이 모델은 특히 파일 시스템 및 기타 계층적으로 구성된 데이터 blob에
적합합니다. 바이트 스트림 데이터 저장소의 주요한 예로는
파일 시스템 및 클라우드 저장소 서비스 등이 있습니다.

### 지속성

웹 앱의 저장소 메서드는 데이터 지속 범위에 따라 분석할 수
있습니다.

* **세션 지속성: **이 범주의 데이터는
단일 웹 세션 또는 단일 브라우저 탭이 활성 상태를 유지하는 동안만 보존됩니다. 세션 지속성이 있는
저장소 메커니즘의 예로는 Session Storage API가 있습니다.

* **기기 지속성:** 이 범주의 데이터는 특정 기기 내 
여러 세션 및 여러 브라우저 탭/창에 걸쳐 보존됩니다. 기기 지속성이 있는 
저장소 메커니즘의 예로는 Cache API가 있습니다.

* **전역 지속성:** 이 범주의 데이터는 여러 세션 및 여러 기기에 걸쳐
보존됩니다. 따라서 데이터 지속성 유형 중에 가장 강력합니다. 전역 지속성이 있는
저장소 메커니즘의 예로는 Google Cloud Storage가 있습니다.

### 브라우저 지원

개발자는 문제 도메인에 가장 적합한 API를 선택해야 합니다.
그러나 이때 표준화되고 잘 설정된 API는 훨씬 수명이 길고
훨씬 널리 지원되는 경향이 있으므로, 사용자설정 인터페이스 또는
독점적 인터페이스보다 훨씬 낫다는 사실을 고려해야 합니다. 또한 훨씬 광범위한 기술 자료와
훨씬 풍부한 개발자 생태계를 활용할 수 있습니다.

### 트랜잭션

종종 관련 저장소 작업 컬렉션이 세부 단위별로 성공하거나
실패하는 것은 중요합니다. 데이터베이스 관리 시스템은 전통적으로
관련 업데이트가 임의의 단위로 그룹화될 수 있는 트랜잭션 모델을 사용하여
이 기능을 지원했습니다. 이 기능은 항상 필요한 것은 아니지만 일부 문제 도메인에서
편리하고 때로는 필수적입니다.

### 동기/비동기

일부 저장소 API는 저장 또는 검색 요청이 완료될 때까지
현재 활성 스레드를 차단한다는 의미에서 동기 API입니다. 이는
저장 요청이 메인 스레드를 UI와 공유하는 웹 브라우저에서 특히
부담스럽습니다. 효율성 및 성능을 고려할 때
비동기 저장소 API가 선호됩니다.

## 비교

이 섹션에서는 웹 개발자가 사용할 수 있는 현재 API를 살펴보고
위에서 설명한 차원으로 비교합니다.

<table>
  <thead>
    <th>API</th>
    <th>데이터 
모델</th>
    <th>지속성</th>
    <th>브라우저
지원</th>
    <th>트랜잭션</th>
    <th>동기/비동기</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>바이트 스트림</td>
      <td>기기</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>아니요</td>
      <td>비동기</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>키/값</td>
      <td>기기</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>아니요</td>
      <td>동기</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>키/값</td>
      <td>세션</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>아니요</td>
      <td>동기</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>구조적</td>
      <td>기기</td>
      <td>100%</td>
      <td>아니요</td>
      <td>동기</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>구조적</td>
      <td>기기</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>예</td>
      <td>비동기</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>키/값</td>
      <td>기기</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>아니요</td>
      <td>비동기</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>하이브리드</td>
      <td>기기</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>예</td>
      <td>비동기</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">Cloud Storage</a></td>
      <td>바이트 스트림</td>
      <td>전역</td>
      <td>100%</td>
      <td>아니요</td>
      <td>모두</td>
    </tr>
  <tbody>
</table>

위에서 언급했듯이 UI와의 상호운용성을 극대화하기 위해
최대한 많은 브라우저에서 널리 지원되며 비동기 호출 모델을 제공하는 API를 선택하는
것이 좋습니다. 이러한 기준은 자연스럽게 다음과 같은
기술 선택으로 이어집니다.

* 기기 로컬 키/값 저장소의 경우 Cache API를 사용합니다.

* 기기 로컬 구조적 저장소의 경우 IndexedDB를 사용합니다.

* 전역 바이트 스트림 저장소의 경우 Cloud Storage 서비스를 사용합니다.

이 조합은 많은 모바일 웹 앱의 기본적인 저장소 요구를 충족시킵니다.
아래에 제시한 글을 통해 일반적인 저장소 패턴을 다루는
자세한 방법과 해당 코드 예시를 살펴보세요.

## Chrome DevTools에서 저장소 디버깅{: #devtools }

Chrome DevTools를 사용하여 웹 저장소 API를 검사하고 디버그하는
자세한 방법은 다음 문서를 참조하세요. 여기에 언급되지 않은
API는 DevTools에서 지원되지 않거나 적용할 수 없습니다.

* [로컬 저장소](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [세션 저장소](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [쿠키](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [캐시](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

여러 저장소 API를 사용하는 경우 DevTools의 Clear Storage 기능을
확인하세요. 이 기능을 사용하면 버튼을 한 번 클릭하여 여러 저장소를
지울 수 있습니다. 자세한 내용은
[서비스 워커, 저장소, 데이터베이스 및 캐시 지우기](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage)를
참조하세요.

## 다음에 다룰 내용

이 글에서 저장소 메커니즘에 대해 고려할 몇 가지 관련 방식을
검토하고 현재 사용 가능한 가장 인기 있는 API와 서비스를 비교했습니다.
다음과 같은 주제에 관한 글을 곧 추가하여 자세히
살펴보겠습니다.

* [Progressive Web App용 오프라인 저장소 권장 사항](offline-for-pwa)

* 일반적인 저장소 패턴(곧 제공 예정)

* 권장 백엔드 저장소 메서드(곧 제공 예정)

* 심층 분석: IndexedDB(곧 제공 예정)

* 심층 분석: Cache API(곧 제공 예정)

* 인기 있는 저장소 프레임워크 분석(곧 제공 예정)


{# wf_devsite_translation #}
