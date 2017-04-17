project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이 코드랩에서는 새로운 DevTools Application 패널을 사용하여 서비스 워커를 디버그하는 방법을 배울 수 있습니다. 푸시 알림을 시뮬레이션하여 구독이 올바로 설정되어 있는지 확인하는 방법도 살펴보겠습니다.

{# wf_updated_on: 2016-10-19T18:28:32Z #}
{# wf_published_on: 2016-01-01 #}


# 서비스 워커 디버깅 {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



## 소개




서비스 워커는 다루기 까다로운 네트워크를 적절히 다루고 진정한 오프라인 최초의 웹 앱을 만들 수 있는 놀라운 능력을 개발자에게 부여해 줍니다. 하지만 새로운 기술이란 때로는 디버그하기 어려울 수 있다는 뜻이고, 특히 우리가 사용하는 여러 가지 디버그 도구가 이런 신기술에 적응해 업그레이드되기를 기다려야 하는 상황이라면 더욱 그렇습니다.

이 코드랩에서는 기본적인 서비스 워커를 만드는 과정을 살펴보고 Chrome DevTools에서 새로운 Application 패널을 사용하여 워커를 디버그하고 검사하는 방법을 보여 드리겠습니다.

### 어떤 앱을 만들어 볼까요?

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

이 코드랩에서는 매우 간단한 Progressive Web App 작업을 해보면서 문제가 발생할 때 자체 애플리케이션에서 사용할 수 있는 기술을 익힙니다.

이 코드랩은 도구 사용법을 가르치는 데 초점이 맞춰져 있으므로 실험 중간에 언제든 필요하면 멈추셔도 됩니다. 코드를 이리저리 조작해 보고 페이지를 새로 고쳐보고 새 탭을 여는 등, 자유롭게 실험해 보세요. 디버깅 도구를 익히는 최선의 방법은 코드를 이곳저곳 망가뜨린 후 직접 하나하나 뜯어고치는 방법입니다.

### 배울 내용

* Application 패널을 이용한 서비스 워커 검사 방법
* Cache 및 IndexedDB 탐색 방법
* 다양한 네트워크 상태 시뮬레이션 방법
* 디버거 명령문과 중단점을 사용한 서비스 워커 디버그 방법
* 푸시 이벤트 시뮬레이션 방법

### 필요한 사항

* Chrome 52 이상
* [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)을 설치하거나 본인이 직접 선택한 웹 서버를 사용하세요.
* 샘플 코드
* 텍스트 편집기
* HTML, CSS 및 자바스크립트에 대한 기본 지식

이 코드랩은 서비스 워커 디버깅에 초점을 맞추고 있으므로 서비스 워커를 사용한 작업에 어느 정도 사전 지식이 있다는 전제하에 진행하겠습니다. 일부 개념은 대충 지나가거나(예: 스타일 또는 관련성이 없는 자바스크립트) 간단히 복사하여 붙여넣을 수 있도록 코드 블록이 제공됩니다. 서비스 워커를 처음 사용하는 개발자라면 꼭 [API 입문서를 검토](/web/fundamentals/primers/service-worker/)한 후 진행하세요.


## 준비 작업




### 코드 다운로드

다음 버튼을 클릭하면 이 코드랩을 위한 코드를 전부 다운로드할 수 있습니다.

[링크](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

다운로드한 zip 파일을 푸세요. 그러면 루트 폴더(`debugging-service-workers-master`)가 풀릴 것이고, 그 안에 이 코드랩의 각 단계마다 필요한 폴더 하나씩과 그 과정에서 필요한 모든 리소스가 들어 있습니다.

`step-NN` 폴더에는 코드랩의 각 단계에서 도달하고자 하는 최종 완성 코드가 들어 있으므로 참조하실 수 있습니다. 모든 코딩 작업은 `work` 디렉토리에서 수행하겠습니다.

### 웹 서버 설치 및 인증

자체 웹 서버를 사용해도 되지만 이 코드랩은 Chrome Web Server에서 잘 돌아가도록 고안되어 있습니다. 이 앱을 아직 설치하지 않으셨다면 Chrome 웹 스토어에서 설치할 수 있습니다.

[링크](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Web Server for Chrome 앱을 설치한 후 북마크바에서 Apps 단축키를 클릭하세요. 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

확인하는 창에서 Web Server 아이콘을 클릭하세요. 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

그러면 아래 대화상자가 나타나는데, 여기서 로컬 웹 서버를 구성할 수 있습니다.

![433870360ad308d4.png](img/433870360ad308d4.png)

__choose folder__ 버튼을 클릭하고 `work` 폴더를 선택하세요. 그러면 웹 서버 대화상자에 강조표시된 URL을 통해(__Web Server URL(s)__ 섹션) 진행 중인 작업을 제공할 수 있습니다.

아래 그림과 같이, Options 아래에서 'Automatically show index.html' 옆에 있는 확인란을 선택하세요.

![8937a38abc57e3.png](img/8937a38abc57e3.png)

그런 다음, 'Web Server: STARTED'라는 레이블로 표시된 전환 버튼을 왼쪽으로 밀었다가 다시 오른쪽으로 밀어 서버를 중지했다가 다시 시작하세요.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

이제는 웹브라우저에서 작업 사이트를 방문하세요(강조표시된 Web Server URL을 클릭). 그러면 다음과 같은 페이지가 나타날 것입니다.

![693305d127d9fe80.png](img/693305d127d9fe80.png)

이 앱은 아직은 뭔가 흥미로운 점이 전혀 없는 상태입니다. 이어지는 단계에서 기능을 추가하면서 앱이 오프라인에서 작동하는지 확인해 볼 것입니다. 


## Application 탭 소개




### 매니페스트 검사

Progressive Web App을 빌드하려면 서비스 워커와 웹 앱 매니페스트를 포함한 여러 가지 핵심 기술뿐 아니라, Cache Storage API, IndexedDB 및 푸시 알림과 같은 유용한 지원 기술을 함께 묶어야 합니다. 개발자가 이런 각각의 기술에 대해 어렵지 않게 균형 있는 시각으로 바라볼 수 있도록 하기 위해, Chrome DevTools에는 새로운 Application 패널에 각 기술에 대한 검사 기능이 통합되어 있습니다.

* Chrome DevTools를 열고 __Application__ 탭을 클릭하세요.

![b380532368b4f56c.png](img/b380532368b4f56c.png)

사이드바를 보면 __Manifest__가 현재 강조표시되어 있는 것이 보일 것입니다. 이 뷰는 애플리케이션 이름, 시작 URL, 아이콘 등, `manifest.json` 파일과 관련된 중요한 정보를 보여줍니다.

이 코드랩에서 다루지는 않겠지만, 사용자의 홈 화면에 앱을 추가하는 경험을 시뮬레이션하는 데 사용할 수 있는 __Add to homescreen__ 버튼이 있습니다.

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### 서비스 워커 검사

과거에는 서비스 워커를 검사하려면 Chrome 내부를 뒤져야 했는데, 분명히 그다지 사용자 친화적 환경은 아니었던 셈입니다. 하지만 이제는 새로운 __Application__ 탭의 등장으로 그 모든 것이 바뀌었습니다!

* 현재 선택되어 있는 __Manifest__ 항목 아래에서 __Service Workers__ 메뉴 항목을 클릭하세요.

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

__Service Workers__ 뷰는 현재 기준에서 활성 상태인 서비스 워커에 대한 정보를 제공합니다. 위쪽 행을 따라 다음과 같은 일련의 확인란이 있습니다.

* __Offline __- 네트워크에서 연결이 끊긴 상태를 시뮬레이션합니다. 이를 통해 서비스 워커 페치 핸들러가 올바로 작동하는지 빠르게 확인할 수 있습니다.
* __Update on reload__ - 기존의 서비스 워커를 강제로 새로운 서비스 워커로 바꿉니다(개발자가 `service-worker.js`에 대한 업데이트를 만든 경우). 일반적으로 브라우저는 사용자가 현재 사이트를 포함하는 탭을 전부 닫을 때까지 기다린 후 새로운 서비스 워커로 업데이트할 것입니다.
* __Bypass for network__ - 브라우저가 모든 활성 서비스 워커를 무시하고 네트워크에서 리소스를 가져오도록 강제 적용합니다. 이는 CSS 또는 자바스크립트 작업을 하고 싶은데 서비스 워커가 우연히 이전 파일을 캐시하여 반환하지 않을까 하는 걱정을 떨쳐버리고 싶은 경우에 매우 유용합니다.
* __Show all__ - 출처에 상관없이 모든 활성 서비스 워커의 목록을 표시합니다.

아래에는 현재 활성 서비스 워커(하나가 있는 경우)와 관련된 정보가 나와 있습니다. 가장 유용한 필드 중 하나는 서비스 워커의 현재 상태를 표시하는 __Status__ 필드입니다. 이번에 이 앱을 처음으로 시작하는 것이고 현재 서비스 워커가 올바로 설치되어 활성화되었으므로, 모든 것이 정상적임을 나타내는 녹색 원을 표시합니다.

녹색 상태 표시기 옆에 ID 번호가 있습니다. 이 번호는 현재 활성 상태인 서비스 워커의 ID입니다. 잠시 후 비교해봐야 하므로 이 ID를 잘 기억하거나 적어 두세요.

* 텍스트 편집기에서 `service-worker.js` 파일을 엽니다.

현재 서비스 워커의 코드는 두 개의 콘솔 로그가 전부로, 무척 간단합니다.

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

DevTools로 다시 전환해 Console을 살펴보면 두 로그가 모두 올바로 출력된 사실을 확인할 수 있습니다.

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

`service-worker.js`의 코드를 업데이트하여 수명 주기를 거치며 어떻게 변하는지 살펴봅시다.

* `service-worker.js`에서 새로운 메시지를 포함하도록 주석을 업데이트합니다.

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* 페이지를 새로 고치고 DevTools에서 콘솔을 엽니다.

콘솔에 `A *new* Service Worker is installing.`이라는 로그가 기록되지만 활성 상태의 새로운 서비스 워커에 대한 두 번째 메시지는 표시되지 않습니다.

* DevTools에서 Application 탭으로 전환합니다.

Application 탭에는 이제 두 개의 상태 표시기가 있으며, 두 서비스 워커의 상태를 각각 나타냅니다.

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

첫 번째 서비스 워커의 ID를 기록해 두세요. 이 ID는 원래 서비스 워커 ID와 일치해야 합니다. 새로운 서비스 워커를 설치하면 사용자가 다음에 해당 페이지를 방문할 때까지는 이전 워커가 활성 상태로 남습니다.

두 번째 상태 표시기는 방금 편집한 새로운 서비스 워커를 표시합니다. 지금은 대기 상태에 있습니다.

새로운 서비스 워커를 강제로 활성화하는 한 가지 쉬운 방법은 바로 __skipWaiting__ 버튼을 사용하는 것입니다.

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* skipWaiting 버튼을 클릭하고 콘솔로 전환합니다.

이제 `activate` 이벤트 핸들러에서 생성된 메시지가 콘솔에 기록되는 것을 볼 수 있습니다.

`Finally active. Ready to start serving content!`


## 캐시 탐색




서비스 워커를 사용하여 자신의 오프라인 파일 캐시를 관리하는 기능은 엄청나게 강력한 힘을 발휘합니다. 새로운 __Application__ 패널에는 저장된 리소스를 탐색하고 수정하는 데 유용한 여러 가지 도구가 있는데, 이들은 개발 기간 동안 매우 유용하게 쓰일 수 있습니다.

### 서비스 워커에 캐싱 추가

작은 코드를 하나 작성해서 몇몇 파일에 저장한 후 해당 캐시를 검사할 수 있습니다. 서비스 워커 설치 단계 중에 파일을 미리 캐시하는 기술은 매우 중요한 리소스가 우연히 오프라인 상태로 전환될 경우에도 사용자가 계속 리소스를 사용할 수 있도록 보장하는 데 유용합니다. 바로 그 지점에서 시작해 봅시다.

* `service-worker.js`를 업데이트하기 전에 DevTools __Application__ 패널을 열고 __Service Workers__ 메뉴로 이동한 후 __Update on reload__ 확인란을 선택합니다.

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

이런 유용한 방법으로 강제로 페이지가 최신 서비스 워커를 사용하도록 강제할 수 있으므로, 서비스 워커를 변경하고 싶을 때마다 __skipWaiting__ 옵션을 클릭할 필요가 없습니다.

* 그 다음, 다음과 같은 형태가 되도록 `service-worker.js`에서 코드를 업데이트합니다.

```
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/smiley.svg'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});

self.addEventListener('activate', function(event) {
  console.log('Finally active. Ready to start serving content!');  
});
```

* 페이지를 새로 고칩니다.

Application 패널에서 Error가 나타날 수도 있습니다. 뭔가 큰 잘못이라도 있나 싶기도 하겠지만, __details__ 버튼을 클릭하면 이전 서비스 워커가 강제로 업데이트되었음을 알려주는 __Application__ 패널일 뿐입니다. 의도적으로 그렇게 한 것이므로 아무 상관이 없지만, `service-worker.js` 파일 편집을 마쳤을 때 확인란의 선택을 해제하는 것을 잊지 않도록 경고하는 유용한 역할을 해줄 수 있습니다.

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### Cache Storage 검사

__Application__ 패널의 __Cache Storage__ 메뉴 항목에 이제는 메뉴를 펼칠 수 있음을 나타내는 캐럿이 있습니다.

* __Cache Storage__ 메뉴를 클릭하여 펼친 후 `my-site-cache-v1`을 클릭하세요.

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

여기서 서비스 워커가 캐시한 파일을 전부 볼 수 있습니다. 캐시에서 파일을 삭제해야 할 경우 파일을 마우스 오른쪽 버튼으로 클릭하고 컨텍스트 메뉴에서 __delete__ 옵션을 선택하면 됩니다. 마찬가지로 `my-site-cache-v1`을 마우스 오른쪽 버튼으로 클릭하고 delete를 선택하여 전체 캐시를 삭제할 수 있습니다.

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### 슬레이트 정리

이미 눈치채셨을 수도 있겠지만 __Cache Storage__ 외에도 Local Storage, Session Storage, IndexedDB, Web SQL, Cookies, Application Cache("AppCache")를 포함하여, 저장된 리소스와 관련된 다른 여러 가지 메뉴 항목이 있습니다. 이런 각각의 리소스를 전부 한 패널에서 세분화하여 제어할 수 있으므로 무척 유용합니다. 하지만 저장된 리소스를 전부 삭제하고 싶을 때 각 메뉴 항목으로 일일이 이동하여 콘텐츠를 삭제해야 한다면 무척 지루한 일이 될 것입니다. 그 대신, __Clear storage__ 옵션을 사용하여 한꺼번에 슬레이트를 정리할 수 있습니다. 참고로, 이렇게 하면 모든 서비스 워커가 등록 취소된다는 점에도 유의하세요.

* __Clear storage__ 메뉴 옵션을 선택하세요.
* 저장된 리소스를 전부 삭제하려면 __Clear site data__ 버튼을 클릭하세요.

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

뒤로 이동하여 `my-site-cache-v1`을 클릭하면 저장된 파일이 전부 삭제되었음을 확인할 수 있을 것입니다.

![317d24238f05e69c.png](img/317d24238f05e69c.png)

__톱니바퀴 아이콘__

서비스 워커는 자체적으로 네트워크를 요청할 수 있으므로, 워커 자체에서 시작된 네트워크 트래픽을 식별하는 데 유용할 수 있습니다.

* `my-site-cache-v1`이 여전히 비어 있는 상태에서 Network 패널로 전환합니다.
* 페이지를 새로 고칩니다.

Network 패널에서 `main.css`와 같은 파일에 대해 처음에 요청한 사항들이 보이고, 그 다음에 같은 자산을 가져오는 것으로 보이는 두 번째 요청들이 나타나는데 여기에는 톱니바퀴 아이콘이 앞에 붙어 있습니다.

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

톱니바퀴 아이콘은 요청이 서비스 워커 자체에서 비롯된 것임을 나타냅니다. 특히, 이런 요청은 오프라인 캐시를 채우기 위해 서비스 워커의 `install` 핸들러에서 생성되는 요청입니다.


## 다양한 네트워크 상태 시뮬레이션




서비스 워크의 강력한 기능 중 하나는 오프라인 상태일 때도 사용자에게 캐시된 콘텐츠를 제공하는 기능입니다. 모든 것이 계획한 대로 작동하는지 확인하기 위해 Chrome에서 제공하는 네트워크 제한 도구 몇 가지를 테스트해 봅시다.

### 오프라인 상태에서 요청에 대응

오프라인 콘텐츠를 제공하려면 `service-worker.js`에 `fetch` 핸들러를 추가해야 합니다.

* `activate` 핸들러 바로 뒤에 있는 `service-worker.js`에 다음 코드를 추가합니다.

```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

* __Application__ 패널로 전환하고 __Update on reload__가 계속 선택되어 있는지 확인합니다.
* 새로운 서비스 워커를 설치하려면 페이지를 새로 고칩니다.
* __Update on reload__를 선택 취소합니다.
* __Offline__을 선택합니다.

그러면 __Application__ 패널이 다음과 같은 모습이 될 것입니다.

![873b58278064b627.png](img/873b58278064b627.png)

__Network__ 패널에는 이제 오프라인 상태임을 나타내는 노란색 경고 기호가 있음을 알 수 있습니다. 이 기호는 네트워크를 이용해 개발 작업을 계속 진행하려면 이 확인란을 선택 취소해야 한다는 것을 알려줍니다.

`fetch` 핸들러가 마련되었고 앱이 __Offline__으로 설정되어 있으므로, 이제 준비는 끝났습니다. 페이지를 새로 고치세요. 모든 것이 정상적으로 작동하면 설령 네트워크에서 아무런 응답이 없더라도 사이트 콘텐츠를 계속 확인해야 합니다. __Network__ 패널로 전환하여 Cache Storage에서 모든 리소스가 제공되고 있는지 확인할 수 있습니다. __Size__ 열에는 이런 리소스의 출처가 `(from Service Worker)`라고 표시되어 있습니다. 이는 바로 서비스 워커가 요청을 가로채어 네트워크를 거치는 대신 캐시에서 응답을 제공했음을 알려주는 신호입니다.

![a6f485875ca088db.png](img/a6f485875ca088db.png)

(새로운 서비스 워커나 `manifest.json`의 경우처럼) 실패한 요청이 있을 것입니다. 하지만 이미 예상한 일이므로 전혀 신경 쓰지 마세요.

### 느리거나 완전히 먹통이 된 네트워크 테스트

사용자들은 여기저기 이동하면서 너무나도 다양한 환경과 상황에서 휴대기기를 사용하므로 늘 다양한 연결 상태 사이를 오가고 있는 셈입니다. 뿐만 아니라, 지구촌 곳곳에는 아직도 3G와 2G 네트워크 속도가 기준으로 되어 있는 곳도 많습니다. 힘들여 개발한 앱이 이런 소비자들에게도 잘 작동할지 확인하려면 연결 속도가 느린 조건에서도 기능을 수행하는지 테스트해야 합니다.

먼저, 서비스 워커가 작동하지 않을 때 속도가 느린 네트워크에서 애플리케이션이 어떻게 작동하는지 시뮬레이션해 봅시다.

* __Application__ 패널에서 __Offline__을 선택 취소합니다.
* __Bypass for network__를 선택합니다.

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

__Bypass for network__ 옵션을 선택하면 네트워크 요청을 해야 할 때 서비스 워커를 건너뛰라고 브라우저에 알려주게 됩니다. 즉, Cache Storage에서 아무것도 올 수 없게 될 것이고 이는 마치 아무런 서비스 워커도 설치하지 않은 것처럼 될 것이라는 의미입니다.

* 그 다음, __Network__ 패널로 전환합니다.
* __Network Throttle__ 드롭다운을 사용하여 네트워크 속도를 `Regular 2G`로 설정합니다.

__Network Throttle__ 드롭다운은 __Network__ 패널의 오른쪽 위, __Network__ 패널의 자체 __Offline__ 확인란 오른쪽에 있습니다. 이 드롭다운은 기본적으로 `No throttling`으로 설정되어 있습니다.

![c59b54a853215598.png](img/c59b54a853215598.png)

* 속도를 `Regular 2G`로 설정한 상태에서 페이지를 새로 고칩니다.

응답 시간이 갑자기 증가하는 게 보이죠? 이제는 각 자산을 다운로드하는 데 수백 밀리초 정도 걸립니다.

![70e461338a0bb051.png](img/70e461338a0bb051.png)

그럼, 여기서 서비스 워커를 작동시켜 어떤 차이가 있는지 살펴봅시다.

* 네트워크는 그대로 `Regular 2G`로 설정한 상태에서 __Application__ 탭으로 다시 전환합니다.
* __Bypass for network__ 확인란을 선택 취소합니다.
* __Network__ 패널로 다시 전환합니다.
* 페이지를 새로 고칩니다.

그러면 응답 시간이 놀랍도록 빠른 리소스당 수 밀리초 정도의 수준으로 단축됩니다. 네트워크 속도가 느린 환경의 사용자에게 이런 변화는 낮과 밤의 차이만큼이나 엄청나죠!

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## 결국 자바스크립트일 뿐




서비스 워커가 마법처럼 느껴질 수도 있겠지만, 그 이면을 잘 살펴보면 그저 일반적인 자바스크립트 파일일 뿐입니다. 즉, `debugger` 명령문과 중단점 같은 기존 도구를 사용하여 디버그할 수 있다는 뜻입니다.

### 디버거를 이용한 작업

많은 개발자들은 앱에 문제가 있을 때 오랜 친구 같은 `console.log()`를 애용합니다. 하지만 도구 상자에서 `debugger`라는 훨씬 더 강력한 도구를 사용할 수 있습니다.

코드에 이 한 줄을 추가하는 것만으로도 실행을 일시 중지하고 DevTools에서 __Sources__ 패널을 열 수 있습니다. 여기서부터 함수를 단계별로 진행하면서 객체를 검사하고, 심지어 콘솔을 사용해 현재 범위에 대해 명령을 실행할 수도 있습니다. 이 도구는 까다로운 서비스 워커를 디버그하는 데 특히 유용할 수 있습니다.

테스트를 위해 `install` 핸들러를 디버그해 봅시다.

* `service-worker.js`에서 `install` 핸들러 시작 부분에 `debugger` 명령문을 추가합니다.

```
self.addEventListener('install', function(event) {
  debugger;
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );  
});
```

* __Application__ 패널에서 페이지를 새로 고칩니다.
* __skipWaiting__을 클릭하여 새로운 서비스 워커를 활성화합니다.
* `fetch` 핸들러를 실행할 수 있도록 페이지를 다시 새로 고칩니다.

애플리케이션이 실행을 일시 중지하고 패널을 __Sources__로 전환합니다. 이때 `service-worker.js`에서 `debugger` 명령문이 강조표시됩니다.

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

이 뷰에서 사용할 수 있는 매우 많은 유용한 도구들이 있습니다. 그중 하나가 __Scope__ 검사기인데, 현재 함수의 범위에서 객체의 현재 상태를 확인해 봅시다.

* `event: ExtendableEvent` 드롭다운을 클릭합니다.

![5116146f838a566.png](img/5116146f838a566.png)

여기서 현재 범위 내 객체에 대한 유용한 모든 종류의 정보를 알아볼 수 있습니다. 예를 들어, `type` 필드를 살펴보면 현재 이벤트 객체가 `install` 이벤트용임을 확인할 수 있습니다.

### 중단점을 대신 사용

__Sources__ 패널에서 코드를 이미 검사 중이라면 실제 파일에 `debugger` 명령문을 추가하는 것에 비해 중단점을 설정하는 것이 더 쉽다는 생각이 들 수도 있습니다. 중단점은 비슷한 목적을 지니고 있지만(실행을 중지하고 그 상태로 고정시켜 주므로 앱을 검사할 수 있음) DevTools 자체 내에서 설정할 수 있습니다.

중단점을 설정하려면 애플리케이션 실행을 중단시키고 싶은 줄 번호를 클릭해야 합니다.

* __Sources__ 패널에서 `service-worker.js`의 25번 줄까지 아래로 스크롤하고 줄 번호를 클릭합니다.

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

그러면 `fetch` 핸들러의 시작 부분에 중단점이 설정되므로 이벤트 객체를 검사할 수 있습니다.

* 페이지를 새로 고칩니다.

`debugger` 명령문을 사용했을 때와 유사하게, 중단점이 있는 줄에서 실행이 중지된 것을 볼 수 있습니다. 이는 곧 앱을 통과하는 `FetchEvent` 객체를 검사하고 이런 객체가 요청하는 리소스가 무엇인지 확인할 수 있다는 뜻입니다.

* __Scope__ 검사기에서 `event` 객체를 펼칩니다.
* `request` 객체를 펼칩니다.
* `url` 속성을 확인합니다.

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

이 `FetchEvent`가 `http://127.0.0.1:8887/`(`index.html`)에서 리소스를 요청하고 있었음을 알 수 있습니다. 이 앱은 수많은 `fetch` 요청을 처리할 것이므로, 중단점을 제자리에 남겨두고 실행을 계속할 수 있습니다. 이를 통해 앱을 통과할 때의 `FetchEvent`를 각각 검사할 수 있습니다. 앱에서 이루어지는 모든 요청을 세분화하여 볼 수 있는 매우 유용한 방법입니다.

* __Resume__ 버튼을 눌러 스크립트 실행을 계속 진행하도록 허용합니다.

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

잠시 후에 같은 중단점에서 실행이 일시 중지됩니다. `event.request.url` 속성을 확인하세요. 참고로, 지금은 `http://127.0.0.1:8887/styles/main.css`를 표시합니다. 이런 식으로 계속 진행하면 `smiley.svg`, `main.js`, 그리고 마지막으로 `manifest.json`를 요청하는 과정을 볼 수 있습니다.


## 푸시 알림 테스트




푸시 알림은 참여도를 높이는 환경을 만드는 데 중요한 기능입니다. 알림 메시지를 보내려면 애플리케이션 서버, 메시징 서비스(예: Google 클라우드 메시징) 및 서비스 워커 간의 조정이 필수적이기 때문에, 먼저 서비스 워커만 따로 떼어놓고 테스트하여 올바로 설정되어 있는지 확인하는 것이 유익할 수 있습니다.

### 푸시 지원 추가

애플리케이션 가운데 부분에 사용자에게 __Subscribe for Push Notifications__를 요청하는 버튼이 있습니다. 이 버튼은 클릭했을 때 사용자에게서 푸시 알림 권한을 요청하도록 이미 설정되어 있습니다.

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

유일하게 남아 있는 단계는 `push` 이벤트를 위한 지원을 `service-worker.js`에 추가하는 작업입니다.

* `service-worker.js`를 열고 `fetch` 핸들러 뒤에 다음 줄을 추가합니다.

```
self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/smiley.svg';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
```

핸들러가 있으면 푸시 이벤트를 쉽게 시뮬레이션할 수 있습니다.

* __Application__ 패널을 엽니다.
* 페이지를 새로 고칩니다. 새로운 서비스 워커가 보이면 `waiting` 단계로 들어가 __skipWaiting__ 버튼을 클릭합니다.
* __Subscribe to Push Notifications__ 버튼을 클릭합니다.
* 권한 프롬프트를 수락합니다.

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* 마지막으로, __Update__와 __Unregister__ 옆에 있는 __Push__ 버튼을 클릭합니다.

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

이제 화면 오른쪽 위에 푸시 알림이 나타나는 것이 보일 것입니다. 이 알림은 서비스 워커가 `push` 이벤트를 정상적으로 처리 중임을 확인해 줍니다.

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

멋지게 해내셨어요!

이제 도구 상자에 자신 있게 사용할 수 있는 몇 가지 디버깅 도구가 구비되어 있으므로 프로젝트를 진행하면서 발생하는 어떤 문제라도 해결할 준비가 되셨을 것입니다. 따라서 각자가 직접 훌륭하고 근사한 Progressive Web App을 빌드할 일만 남았습니다!





## 문제가 있거나 의견이 있으세요? {: .hide-from-toc }
언제든 망설이지 말고 
[문제](https://github.com/googlecodelabs/debugging-service-workers/issues)를 제출해 주시면 코드랩에서 더욱 나은 서비스를 제공하는 데 큰 도움이 될 것입니다. 감사합니다!

{# wf_devsite_translation #}
