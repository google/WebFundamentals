project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Application 패널을 사용하여 웹 앱 매니페스트, 서비스 워커 및 서비스 워커 캐시를 검사, 수정 및 디버그합니다.

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Progressive Web App 디버그 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<strong>Application</strong> 패널을 사용하여 웹 앱 매니페스트, 서비스 워커 및 서비스 워커 캐시를 검사, 수정
및 디버그합니다.

관련 가이드: 

* [Progressive Web App](/web/progressive-web-apps)

이 가이드는
**Application** 패널의 Progressive Web App 기능만 설명합니다. 다른 창에 대한 도움말이 필요한 경우
이 가이드의 마지막 섹션인 [기타 Application 패널
가이드](#other)를 참조하세요.


### TL;DR {: .hide-from-toc }
- <strong>App Manifest</strong> 창을 사용하여 웹 앱 매니페스트를 검사하고 Add to Homescreen 이벤트를 트리거합니다.
- 서비스 등록 취소 또는 업데이트, 푸시 이벤트 에뮬레이션, 오프라인으로 변경 또는 서비스 워커 중지와 같은 모든 서비스 워커 관련 작업용으로 <strong>Service Worker</strong> 창을 사용합니다.
- <strong>Cache Storage</strong> 창에서 서비스 워커 캐시를 봅니다.
- <strong>Clear Storage</strong> 창에서 서비스 워커를 등록 취소하고 버튼을 한 번 클릭하여 모든 저장소와 캐시를 지웁니다.


## 웹 앱 매니페스트 {:#manifest}

사용자가 여러분의 앱을 모바일 홈 화면에 추가할 수 있도록 하려면
웹 앱 매니페스트가 필요합니다. 매니페스트는 앱이 홈 화면에 나타나는
방법, 홈 화면에서 시작할 때 사용자를 안내하는 대상 위치, 시작할
때 앱의 모습을 정의합니다.

관련 가이드:

* [웹 앱 매니페스트로 사용자
  환경 개선](/web/fundamentals/engage-and-retain/web-app-manifest)
* [앱 설치 배너
  사용](/web/fundamentals/engage-and-retain/app-install-banners)

매니페스트를 설정하면 **Application** 패널의
**Manifest** 창을 사용하여 매니페스트를 검사할 수 있습니다.

![매니페스트 창][manifest]

* 매니페스트 소스를 보려면 **App Manifest** 레이블
 아래에 있는 링크(위 스크린샷에서 `https://airhorner.com/manifest.json`)를 클릭합니다.
* **Add to homescreen** 버튼을 눌러 Add to Homescreen
  이벤트를 시뮬레이션합니다. 자세한 내용은 다음 섹션을 참조하세요.
* **Identity** 및 **Presentation** 섹션은 매니페스트 소스의 필드를
  사용자에게 친숙한 방식으로 표시합니다.
* **Icons** 섹션은 사용자가 지정한 모든 아이콘을 표시합니다.

[manifest]: images/manifest.png

### Add to Homescreen 이벤트 시뮬레이션 {:#add-to-homescreen}

사이트를 5분 이상 간격으로 2회 이상 방문한 경우에만 웹 앱을
 화면에 추가할 수 있습니다. Add to Homescreen 워크플로를
개발하거나 디버그하는 경우 이 기준이 불편할 수 있습니다.
**App Manifest** 창의 **Add to homescreen** 버튼을 사용하여
필요할 때마다 Add to Homescreen을 시뮬레이션할 수 있습니다.

dd to Homescreen을 적절하게 지원하는 [Google I/O 2016 Progressive Web
app](https://events.google.com/io2016/){: .external }을
사용하여 이 기능을 테스트할 수 있습니다. 앱이 열린 상태에서 **Add to Homescreen**을 클릭하면
'add this site to your shelf' 배너가 표시됩니다. 이는
휴대기기용 'add to homescreen' 배너와 같은 데스크톱용 배너입니다.

![데스크톱 선반에 추가][shelf]

**팁**: Add to Homescreen
 이벤트를 시뮬레이션하는 동안 **Console** 창을 열어두세요. Console이 매니페스트에 문제가 있으면 알려주고 Add to Homescreen 수명 주기에
대한 기타 정보를 기록합니다.

**Add to Homescreen** 기능은 아직 휴대기기의 워크플로를
시뮬레이션할 수 없습니다. 위 스크린샷에서 DevTools가 Device Mode인 경우에도 'add to shelf' 프롬프트가 트리거된 방식을 확인하세요.
 그러나 데스크톱 선반에
앱을 추가할 수 있는 경우 모바일에도
가능합니다.

진정한 모바일 경험을 테스트하려면
실제 휴대기기를 [원격 디버깅][remote
debugging]을 통해 DevTools에 연결한 다음 DevTools의 **Add to Homescreen** 버튼을
클릭하여 연결된 휴대기기에서 'add to homescreen' 프롬프트를 트리거할 수 있습니다.

[shelf]: images/io.png
[remote debugging]: /web/tools/chrome-devtools/debug/remote-debugging/remote-debugging

## 서비스 워커 {:#service-workers}

서비스 워커는 미래 웹 플랫폼의 기본 기술입니다. 이는
브라우저가 웹페이지와 별도로 백그라운드로 실행하는 스크립트입니다.
해당 스크립트를 사용하여 웹페이지 또는 사용자
상호작용(예: 푸시 알림, 백그라운드 동기화 및 오프라인 경험)이 필요 없는 기능에 액세스할 수 있습니다.

관련 가이드:

* [서비스 워커 소개](/web/fundamentals/primers/service-worker)
* [푸시 알림: 시기 적절, 관련성,
  섬세함](/web/fundamentals/engage-and-retain/push-notifications)

**Application** 패널의 **Service Workers** 창은 DevTools에서 서비스 워커를 검사하고 디버그하기 위한
기본 장소입니다.

![service worker 창][sw]

* 서비스 워커가 현재 열린 페이지에 설치된 경우
  이 창에 표시됩니다. 예를 들어, 위 스크린샷에는 `https://events.google.com/io2016/`의 범위에 대해
  설치된 서비스 워커가 있습니다.
* **Offline** 확인란을 선택하면 DevTools가 오프라인 모드로 변경됩니다. 이는
  **Network** 패널에서 사용할 수 있는 오프라인 모드 또는
  [명령 메뉴][cm]의 `Go offline` 옵션과 동일합니다.
* **Update on reload** 확인란을 선택하면
  페이지 로드 시마다 서비스 워커가 강제로 업데이트됩니다.
* **Bypass for network** 확인란을 선택하면 서비스 워커가 무시되고
  요청한 리소스의 네트워크로 브라우저가 강제로 이동합니다.
* **Update** 버튼을 누르면 지정된 서비스 워커가 한 번
  업데이트됩니다.
* **Push** 버튼을 누르면 페이로드([tickle][tickle]이라고도
  함) 없이 푸시 알림이 에뮬레이트됩니다.
* **Sync** 버튼을 누르면 백그라운드 동기화 이벤트가 에뮬레이트됩니다.
* **Unregister** 버튼을 누르면 지정된 서비스 워커가 등록 취소됩니다. 서비스 워커를
  등록 취소하고 버튼을 한 번 클릭하여 저장소와 캐시를 초기화하는
  방법은 [저장소 비우기](#clear-storage)를 참조하세요.
* **Source** 줄은 현재 실행 중인 서비스 워커가 설치된 시간을
  알려줍니다. 링크는 서비스 워커의 소스 파일 이름입니다. 해당 링크를
  클릭하면 서비스 워커의 소스로 이동합니다.
* **Status** 줄은 서비스 워커의 상태를 알려줍니다. 이 줄의
  숫자(위 스크린샷의 `#1`)는 서비스 워커의 업데이트
  횟수입니다. **update on reload** 확인란을 활성화하면
  페이지 로드 시마다 이 값이 증분됩니다. 상태 옆에는
  **start** 버튼(서비스 워커가 중지된 경우) 또는
  **stop** 버튼(서비스 워커가 실행 중인 경우)이 표시됩니다. 서비스 워커는
  언제든 브라우저가 시작/중단할 수 있도록 설계되었습니다. **stop** 버튼을
  사용하여 서비스 워커를 명시적으로 중단하면 이를 시뮬레이션할 수 있습니다.
  서비스 워커를 중단하는 것은
  서비스 워커가 다시 시작되었을 때 코드가 어떻게 동작하는지 테스트할 수 있는 좋은 방법입니다. 지속적인 전역 상태에 대한
  잘못된 가정으로 인한 버그를 종종 확인할 수 있습니다.
* **Clients** 줄은 서비스 워커의 범위가 지정된 출처를
  알려줍니다. **focus** 버튼은
  **show all** 확인란을 활성화한 경우 매우 유용합니다. 이 확인란을 활성화하면 등록된 모든
  서비스 워커가 나열됩니다. 다른 탭에서 실행 중인 서비스 워커의 옆에 있는 **focus**
  버튼을 클릭하면 Chrome이 해당 탭에 포커스를 맞춥니다.

서비스 워커가 오류를 유발하는 경우 **Errors**라는 새로운 레이블이
표시됩니다.

![오류가 있는 서비스 워커][errors]

[sw]: images/sw.png
[cm]: /web/tools/chrome-devtools/settings#command-menu
[tickle]: /web/fundamentals/engage-and-retain/push-notifications/sending-messages#ways-to-send
[errors]: images/sw-error.png

## 서비스 워커 캐시 {:#caches}

**Cache Storage** 창은 (서비스 워커)
[Cache API][sw-cache]를 사용하여 캐시된 읽기 전용 리소스 목록을 제공합니다.

![service worker cache 창][sw-cache-pane]

캐시를 처음으로 열고 리소스를 추가하면 DevTools가
변경 사항을 감지하지 못할 수 있습니다. 페이지를 다시 로드하면 캐시가 표시됩니다.

캐시를 두 개 이상 열면
**Cache Storage** 드롭다운 아래에 나열됩니다.

![여러 서비스 워커 캐시][multiple-caches]

[sw-cache]: https://developer.mozilla.org/en-US/docs/Web/API/Cache
[sw-cache-pane]: images/sw-cache.png
[multiple-caches]: images/multiple-caches.png

## 저장소 비우기 {:#clear-storage}

**Clear Storage** 창은 Progressive Web App을 개발할 때
사용할 수 있는 매우 유용한 기능입니다. 이 창에서 서비스 워커를 등록 취소하고
버튼을 한 번 클릭하여 모든 캐시와 저장소를 비울 수 있습니다. 자세한 내용은
아래 섹션을 참조하세요.

관련 가이드:

* [저장소
비우기](/web/tools/chrome-devtools/iterate/manage-data/local-storage#clear-storage)

## 기타 Application 패널 가이드 {:#other}


**Application** 패널의 다른 창에 대한 자세한 도움말은 아래 가이드를 참조하세요.

관련 가이드:

* [페이지 리소스 검사](/web/tools/chrome-devtools/iterate/manage-data/page-resources)
* [로컬 저장소와 캐시 검사 및
관리](/web/tools/chrome-devtools/iterate/manage-data/local-storage)


{# wf_devsite_translation #}
