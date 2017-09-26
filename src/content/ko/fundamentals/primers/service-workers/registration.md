project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 서비스 워커 등록 타이밍 관련 모범 사례

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2016-11-28 #}

# 서비스 워커 등록 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[서비스
워커](/web/fundamentals/getting-started/primers/service-workers)는
웹 앱 반복 방문을 의미 있을 정도로 촉진할 수 있지만 서비스 워커의
초기 설치가 사용자의 첫 번째 방문을 나쁜 경험이 되지 않도록
조치를 취해야 합니다.

일반적으로 초기 페이지가 로드된
이후까지 서비스 워커 [등록](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)을
연기하면 사용자, 특히 네트워크 연결이 느린 휴대기기 사용자에게
최상의 경험을 제공합니다.

## 일반적인 등록 상용구

서비스 워커에 대한 정보를 읽은 적이 있다면 실질적으로
다음과 유사한 상용구를 보았을 것입니다.

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

여기에는 사용자에게 페이지 새로고침을 알리는 방법으로 몇 가지
`console.log()` 문 또는 이전 서비스 워커 등록에 대한
업데이트를 감지하는 [코드](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)가
수반될 수 있습니다. 그러나 이는 표준 코드 몇 줄을
살짝 바꾼 것에 불과합니다.

`navigator.serviceWorker.register`에 어떤 뉘앙스가 있을까요? 준수해야 할
모범 사례가 있나요? (이 글이 여기서 끝나지 않는다면) 이 두 질문에
대한 대답이 '예'라는 것은 놀라울 바가 아닙니다.

## 사용자의 첫 번째 방문

사용자가 웹 앱에 처음으로 방문했다고 가정해 봅시다. 아직 서비스 워커가 없고,
브라우저는 결국 설치될 서비스 워커가 있는지 여부를 미리 알 수
없습니다.

개발자는 대화형 페이지를 표시하는 데 필요한 최소한의
중요한 리소스 집합을 브라우저가 신속하게 가져오도록
보장해야 합니다. 이러한 응답을 가져오는 속도를 저하시키는 것은 신속한
대화형 경험의 적입니다.

이제 페이지가 렌더링해야 하는 자바스크립트 또는 이미지를
다운로드하는 과정에서 브라우저가 백그라운드 스레드 또는 프로세스를
시작하기로 결정했다고 상상해봅시다(단순화하기 위해 스레드라고 가정함). 육중한
데스크톱 컴퓨터가 아니라 대부분의 세계가 기본 기기라고 생각하는
저전력 휴대폰 유형을 사용하고 있다고 가정해봅시다. 이
추가 스레드를 구동하면 브라우저가 대화형 웹 페이지를
렌더링하는 데 소비할 수 있는 CPU 시간과 메모리에 대한 경쟁이 추가됩니다.

유휴 백그라운드 스레드가 큰 차이를 만들 것 같지는 않습니다. 그러나
스레드가 유휴 상태가 아니고 네트워크에서 리소스 다운로드를
시작하기로 결정한 경우 어떻게 될까요? CPU 또는 메모리 사용 경쟁에
대한 우려는 대부분의 휴대기기에서 사용할 수 있는 제한된 대역폭에
대한 우려보다 우선시해서는 안 됩니다. 대역폭은 중요하므로 중요한 리소스와
보조 리소스를 동시에 다운로드하여 중요한 리소스를 손상시키지 마세요.

즉, 백그라운드에서 리소스를 다운로드 및 캐시하는 새로운 서비스 워커 스레드를
구동하면, 사용자가 처음으로 사이트를 방문할 때
가장 짧은 대화형 경험을 제공한다는 목표에 부합할 수
있습니다.

## 상용구 개선

해결책은 `navigator.serviceWorker.register()`를 호출할 시간을 선택하여 서비스 워커의
시작을 제어하는 것입니다. 다음과 같이
<code>[로드
이벤트](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>가
 <code>window</code>에서 발생한 이후까지 등록을 연기하면 간단히 해결할 수 있습니다.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

그러나 서비스 워커 등록을 시작하는 적절한 시간은 웹 앱이 로드된 직후에
수행하는 작업에 따라 다를 수 있습니다. 예를 들어, [Google I/O
2016 웹 앱](https://events.google.com/io2016/)은 주 화면으로
전환하기 전에 짧은 애니메이션을 제공합니다. 애니메이션
동안 서비스 워커 등록을 시작하면
저급 휴대기기에서 버벅거림이 발생할 수 있다는 사실이
[확인](/web/showcase/2016/iowa2016)되었습니다. 우리는 사용자에게 나쁜 경험을 제공하는 대신에
브라우저가 몇 초 동안 유휴 상태가 될 가능성이
가장 높은 애니메이션 이후까지 서비스 워커 등록을
[연기](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)했습니다.

마찬가지로 웹 앱에서 페이지가 로드된 후 추가 설정을 수행하는
프레임워크를 사용하는 경우에도 해당 작업이 완료될 때 신호를 보내는
프레임워크별 이벤트를 찾으면 됩니다.

## 후속 방문

지금까지 첫 번째 방문 경험에 중점을 두었는데 서비스 워커 등록을
연기하면 사이트를 다시 방문할 때 어떤 영향이 있을까요?
놀랍게도 어떤 영향도 미치지 않습니다.

서비스 워커가 등록되면 `install` 및
`activate` [수명 주기 이벤트](/web/fundamentals/instant-and-offline/service-worker/lifecycle)가
발생합니다.
서비스 워커는 활성화되면 웹 앱 후속 방문 동안
`fetch` 이벤트를 처리할 수 있습니다. 서비스 워커는 범위 내에 있는
페이지 요청이 있기 *전에* 시작합니다. 그 이유는 생각해보면 이해가
될 것입니다. 기존 서비스 워커가 페이지를 방문하기 전에 이미 실행 중이
아닌 경우 탐색 요청에 대한 `fetch` 이벤트를 수행할
기회가 없습니다.

따라서 활성화된 서비스 워커가 있는 경우 `navigator.serviceWorker.register()` 호출 시간
또는 *호출 여부*는 전혀 중요하지 않습니다.
서비스 워커 스크립트의 URL을 변경하지 않는 한
`navigator.serviceWorker.register()`는 후속 방문 동안
사실상 [무작동](https://en.wikipedia.org/wiki/NOP)합니다. 호출 시간은
관련 없습니다.

## 일찍 등록해야 하는 이유

서비스 워커를 가급적 일찍 등록하는 것이 좋은 경우에 해당하는
시나리오가 있을까요? 예를 들면, 서비스 워커가 첫 번째 방문 동안
<code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>을 사용하여
페이지를 제어하고 서비스 워커가  <code>fetch</code> 핸들러 내부에서
[런타임 캐싱](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)을
적극적으로 수행하는 경우가
이에 해당합니다. 이러한 상황에서
서비스 워커를 가급적 빨리 활성화하고 나중에 사용 가능한 리소스로 런타임 캐시를
채우면 도움이 됩니다. 웹 앱이
이 범주에 해당하는 경우 서비스 워커의  <code>install</code> 핸들러가
대역폭을 차지하기 위해 기본 페이지 요청과 경쟁하는
리소스를 요청하지 않도록 미리 조치를 취하는 것이 좋습니다.

## 테스트

첫 번째 방문을 시뮬레이션하는 가장 좋은 방법은
[Chrome 시크릿 창](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)에서
웹 앱을 열고 [Chrome DevTools](/web/tools/chrome-devtools/)에서
네트워크 트래픽을
확인하는 것입니다. 웹 개발자는
아마도 웹 앱의 로컬 인스턴스를 하루에 수십 번 다시 로드할
것입니다. 그러나 서비스 워커와 완전히 채워진 캐시가
이미 있을 때 사이트를 다시 방문하면, 새로운 사용자가 얻을 수
있는 것과 동일한 경험을 얻을 수 없으며 잠재적인 문제를 무시하기 쉽습니다.

다음은 등록 타이밍에 따른 차이점을 보여주는
예시입니다. 다음 두 스크린샷은 시크릿 모드에서 [샘플 앱](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)을
방문하는 동안 네트워크 제한을 통해
느린 연결을 시뮬레이션하여 촬영했습니다.

![일찍 등록한 경우의 네트워크 트래픽](../images/early-registration.png
"Network traffic with early registration.")

위의 스크린샷은 서비스 워커 등록을 가급적 빨리 수행하도록
샘플을 수정한 경우의 네트워크 트래픽을 반영합니다. 페이지를
표시하는 데 필요한 다른 리소스에
대한 요청이 섞여 있는 사전 캐싱 요청(서비스 워커의 `install` 핸들러에서
나온, [기어 아이콘](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)이 옆에 표시된 항목)을
볼 수 있습니다.

![늦게 등록한 경우의 네트워크 트래픽](../images/late-registration.png
"Network traffic with late registration.")


위의 스크린샷에서 서비스 워커 등록은 페이지가 로드된 이후까지
연기되었습니다. 네트워크에서 모든 자원을 가져올 때까지 사전 캐싱 요청은
시작되지 않고 대역폭에 대한 경쟁을 제거한 상태임을
확인할 수 있습니다. 또한 사전 캐싱을 시도할 항목 중 일부는 브라우저의
HTTP 캐시(Size 열에 `(from disk cache)`가 있는 항목)에 이미 있기 때문에
네트워크로 다시 이동하지 않고 서비스 워커의 캐시를 채울 수
있습니다.

실제 모바일 네트워크의 실제 저급 기기에서 이러한 종류의 테스트를
실행하면 보너스 점수를 받을 수 있습니다. Chrome의 [원격 디버깅 기능](/web/tools/chrome-devtools/remote-debugging/)을
활용하여 USB를 통해 Android 스마트폰을
데스크톱 컴퓨터에 연결하고 실행 중인 테스트가 많은 사용자의 실제 세계 경험을
실제로 반영하도록 보장할 수
있습니다.

## 결론

요컨대, 사용자의 첫 번째 방문이 좋은 경험이 되도록 보장하는 작업을
최우선시해야 합니다. 첫 번째 방문 동안 페이지가 로드된 이후까지
서비스 워커 등록을 연기하면 이를 보장하는 데 도움이 될 수 있습니다. 재방문 동안
서비스 워커의 모든 혜택을 여전히 누리게 됩니다.

다음 코드를 사용하면 첫 번째 페이지가 로드된 이후까지 서비스 워커의
초기 등록을 쉽게 연기할 수 있습니다.

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
