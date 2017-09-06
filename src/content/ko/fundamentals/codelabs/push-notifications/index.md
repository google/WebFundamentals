project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이 코드랩에서는 웹 앱에 푸시 알림을 추가하는 방법을 배워봅니다.

{# wf_updated_on: 2016-11-21T15:42:20Z #}
{# wf_published_on: 2016-01-01 #}


# 웹 앱에 푸시 알림 추가 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



## 개요




푸시 메시지는 사용자가 다시 참여하도록 유도하는 간단하면서도 효과적인 방법입니다. 이 코드랩에서는 자신의 개발한 웹 앱에 푸시 알림을 추가하는 방법을 배워보겠습니다.

### 배울 내용

* 푸시 메시지에 대한 사용자 구독 및 구독 취소 방법
* 수신 푸시 메시지 처리 방법
* 알림 표시 방법
* 알림 클릭에 대한 응답 방법

### 필요한 사항

* Chrome 52 이상
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb) 또는 자신이 직접 선택한 웹 서버
* 텍스트 편집기
* HTML, CSS, 자바스크립트 및 Chrome DevTools에 대한 기본적인 지식
* 샘플 코드(설치하기 참조)


## 설치하기




### 샘플 코드 다운로드

다음 링크에서 zip 파일을 다운로드하여 이 코드에 대한 샘플 코드를 얻을 수 있습니다.

[링크](https://github.com/googlechrome/push-notifications/archive/master.zip)

또는 다음 git 저장소를 복제해도 됩니다.

    git clone https://github.com/GoogleChrome/push-notifications.git

소스를 zip으로 다운로드한 경우 zip 파일을 풀면 루트 폴더가 `push-notifications-master`로 압축 해제되어야 합니다.

### 웹 서버 설치 및 인증

자체 웹 서버를 사용해도 되지만 이 코드랩은 Chrome Web Server에서 잘 돌아가도록 고안되어 있습니다. 이 앱을 아직 설치하지 않으셨다면 Chrome 웹 스토어에서 설치할 수 있습니다.

[링크](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

Web Server for Chrome 앱을 설치한 후 북마크바에서 Apps 단축키를 클릭하세요. 

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

확인하는 창에서 Web Server 아이콘을 클릭하세요. 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

그러면 아래 대화상자가 나타나는데, 여기서 로컬 웹 서버를 구성할 수 있습니다.

![433870360ad308d4.png](img/433870360ad308d4.png)

__choose folder__ 버튼을 클릭하고 앱 폴더를 선택하세요. 그러면 웹 서버 대화상자에 강조표시된 URL을 통해(__Web Server URL(s)__ 섹션) 진행 중인 작업을 제공할 수 있습니다.

아래 그림과 같이, Options 아래에서 'Automatically show index.html' 옆에 있는 확인란을 선택하세요.

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

그런 다음, 'Web Server: STARTED'라는 레이블로 표시된 전환 버튼을 왼쪽으로 밀었다가 다시 오른쪽으로 밀어 서버를 중지했다가 다시 시작하세요.

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

이제는 웹브라우저에서 사이트를 방문하세요(강조표시된 Web Server URL을 클릭함). 그러면 다음과 같은 페이지가 나타날 것입니다.

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### 서비스 워커는 항상 업데이트할 것

개발 중에 서비스 워커가 항상 최신 버전이고 최신 변경 사항이 적용된 상태인지 확인하는 것이 유용합니다.

Chrome에서 이를 설정하려면 DevTools(마우스 오른쪽 버튼 클릭 > Inspect)를 열고 __Application__ 패널로 이동하고 __Service Workers__ 탭을 클릭한 후 __Update on Reload__ 확인란을 선택하세요. 이 확인란을 선택하면 페이지를 새로 고칠 때마다 서비스 워커가 강제로 업데이트됩니다.

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## 서비스 워커 등록




`app` 디렉토리에는 `sw.js`로 명명된 빈 파일이 있습니다. 이 파일이 자신의 서비스 워커이며 지금은 빈 상태로 있을 수 있습니다. 이후에 코드를 추가해나갈 것입니다.

먼저 이 파일을 서비스 워커로 등록해야 합니다.

`app/index.html` 페이지에서 `scripts/main.js`를 로드하는데, 서비스 워커를 등록할 이 자바스크립트 파일에 들어 있습니다.

다음 코드를 `scripts/main.js`에 추가하세요.

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

이 코드는 현재 브라우저에서 서비스 워커와 푸시 메시지를 지원하는지 확인하며, 지원한다면 `sw.js` 파일을 등록합니다.

#### 실습

브라우저에서 URL __127.0.0.1:8887__을 열어 변경 내용을 확인하세요.

다음과 같이 Chrome DevTools를 열어 `Service Worker is registered`용 콘솔을 확인하세요.

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### 애플리케이션 서버 키 가져오기

이 코드랩으로 작업하려면 애플리케이션 서버 키를 몇 개 생성할 필요가 있는데, 도우미 사이트인 [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)에서 생성할 수 있습니다.

여기서 공개 키 쌍과 비공개 키 쌍을 생성할 수 있습니다.

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

다음과 같이 `scripts/main.js`로 공개 키를 복사하여 `<Your Public Key>` 값을 바꾸세요.

```
const applicationServerPublicKey = '<Your Public Key>';
```

참고: 절대로 비공개 키를 웹 앱에 두면 안 됩니다!


## 상태 초기화




지금은 웹 앱의 버튼이 비활성화되어 있어 클릭할 수 없습니다. 이는 푸시 버튼을 기본적으로 비활성화하고 푸시가 지원되는 사실을 알고 사용자가 현재 구독한 상태인지 알 수 있을 때 활성화하는 것이 좋은 방법이기 때문입니다.

`scripts/main.js`에서 두 개의 함수를 만들어봅시다. 하나는 `initialiseUI`라는 함수로서 사용자가 현재 구독한 상태인지 확인하고, 다른 하나는 `updateBtn`이라는 함수로서 사용자가 구독한 상태인지 여부에 따라 버튼을 활성화하고 텍스트를 변경합니다.

`initialiseUI` 함수를 다음과 같이 작성하려고 합니다.

```
function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

새 메서드는 이전 단계에서 `swRegistration`을 사용하고 `pushManager`에서 `getSubscription()`을 호출합니다. `getSubscription()`은 구독이 있는 경우 현재 구독으로 확인되는 프라미스를 반환하고 그렇지 않으면 `null`을 반환하는 메서드입니다. 이 메서드로 사용자가 이미 구독한 상태인지 확인하고 몇 가지 상태를 설정하고 `updateBtn()`을 호출하여 도움말 역할을 하는 텍스트와 함께 버튼을 활성화할 수 있습니다.

다음 코드를 추가하여 `updateBtn()` 함수를 구현하세요.

```
function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

이 함수는 사용자가 구독하는지 여부에 따라 단순히 텍스트를 변경한 후 버튼을 활성화합니다.

마지막으로 할 일은 서비스 워커가 등록될 때 `initialiseUI()`를 호출하는 것입니다.

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### 실습

웹 앱을 열면 ‘Enable Push Messaging' 버튼이 활성화되어 있을 것이며(즉, 클릭할 수 있음) 콘솔에 ‘User is NOT subscribed.'로 표시될 것입니다.

![15f6375617c11974.png](img/15f6375617c11974.png)

코드랩의 나머지 부분으로 계속 진행하면서 사용자가 구독/구독 취소할 때 버튼 텍스트가 바뀌는 것을 볼 수 있을 것입니다.


## 사용자 구독




지금은 ‘Enable Push Messaging' 버튼의 역할이 미미합니다. 이제 그 부분을 고쳐봅시다.

다음과 같이 `initialiseUI()` 함수에서 버튼에 클릭 리스너를 추가하세요.

```
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

사용자가 푸시 버튼을 클릭할 때 푸시를 구독하는 데 시간이 좀 걸릴 수 있으므로 먼저 버튼을 비활성화하여 구독하는 동안 사용자가 버튼을 다시 클릭할 수 없도록 합니다.

그런 다음, 사용자가 현재 구독하지 않은 상태임을 알 때 `subscribeUser()`를 호출하여 다음 코드를 복사해 `scripts/main.js`로 붙여넣습니다.

```
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

단계별로 진행하면서 이 코드가 수행하는 작업과 어떻게 사용자에 대해 푸시 메시지를 구독하는지 살펴보세요.

먼저 기본 64 URL 안전 인코딩된 애플리케이션 서버의 공개 키를 취하여 `UInt8Array`로 변환합니다. 이것이 바로 구독 호출의 예상 입력이기 때문입니다. `scripts/main.js`의 맨 위에 이미 `urlB64ToUint8Array` 함수를 제공했습니다.

값을 변환한 후 서비스 워커의 `pushManager`에서 `subscribe()` 메서드를 호출하여 애플리케이션 서버의 공개 키와 `userVisibleOnly: true` 값을 제출합니다.

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

`userVisibleOnly` 매개변수는 기본적으로 푸시가 전송될 때마다 알림을 표시하도록 허용하는 것입니다. 작성 시점에서는 이 값이 필수이고 true여야 합니다.

`subscribe()`를 호출하면 다음 단계 후 확인될 프라미스가 반환됩니다.

1. 사용자가 알림을 표시할 권한을 허용했습니다.
2. 브라우저가 PushSubscription 생성을 위한 세부 정보를 얻기 위해 푸시 서비스로 네트워크 요청을 보냈습니다.

이런 단계를 성공적으로 수행한 경우 `subscribe()` 프라미스는 `PushSubscription`으로 확인됩니다. 사용자가 권한을 허용하지 않거나 사용자 구독에 문제가 있는 경우 프라미스는 오류와 함께 거부합니다. 이에 따라 코드랩에 다음과 같은 프라미스 체인이 생깁니다.

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
```

이를 이용해 구독을 받고 사용자를 구독 상태로 처리하거나 오류를 파악해 콘솔로 출력합니다. 두 경우 모두 `updateBtn()`을 호출하여 버튼이 다시 활성화되고 알맞은 텍스트가 있는지 확인합니다.

메서드 `updateSubscriptionOnServer`는 실제 애플리케이션에서 백엔드로 구독을 보내는 메서드이지만, 이 코드랩에서는 나중에 도움이 되도록 UI에 구독을 출력하겠습니다. 다음과 같이 `scripts/main.js`에 이 메서드를 추가하세요.

```
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

#### 실습

웹 앱으로 다시 돌아가 버튼을 클릭하면 다음과 같은 권한 프롬프트가 나타날 것입니다.

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

권한을 허용하면 콘솔에서 `PushSubscription`과 함께 `User is subscribed:`를 출력하고 버튼의 텍스트가 ‘Disable Push Messaging'으로 바뀌는 것을 알 수 있고 페이지 하단에서 구독을 JSON으로 볼 수 있을 것입니다.

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## 거부된 권한 처리




우리가 아직 처리하지 않은 한 가지가 있는데, 그것은 사용자가 권한 요청을 차단할 경우에 발생하는 일입니다. 이 문제는 특별히 잘 생각해야 합니다. 왜냐하면 사용자가 권한을 차단하면 웹 앱이 권한 프롬프트를 다시 표시할 수 없고 사용자가 구독할 수 없게 되므로 사용자가 푸시 버튼을 사용할 수 없음을 알도록 최소한 버튼을 비활성화할 필요가 있기 때문입니다.

이런 상황을 다루어야 할 분명한 위치는 바로 `updateBtn()` 함수 내에 있습니다. 다음과 같이 `Notification.permission` 값을 확인하기만 하면 됩니다.

```
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

권한이 `denied`인 경우 사용자 구독이 불가능해서 우리가 할 수 있는 일은 더 이상 없으므로, 버튼을 영구적으로 비활성화하는 것이 최선의 방법입니다.

#### 실습

이전 단계에서 웹 앱에 대한 권한을 이미 허용했으므로 URL 표시줄의 원 안에 표시된 __i__를 클릭하고 알림 권한을 *Use global default (Ask)*로 변경해야 합니다.

![8775071d7fd66432.png](img/8775071d7fd66432.png)

이 설정을 변경한 후 페이지를 새로 고치고 *Enable Push Messaging* 버튼을 클릭한 후, 이번에는 권한 대화상자에서 *Block*을 선택하세요. 그러면 버튼 텍스트가 *Push Messaging Blocked*로 표시되면서 비활성화됩니다.

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

이렇게 변경하면 사용자 구독이 가능하고 가능한 권한 관련 시나리오를 처리할 수 있게 됩니다.


## 푸시 이벤트 처리




백엔드에서 푸시 메시지를 보내는 방법을 다루기 전에 먼저 구독한 사용자가 푸시 메시지를 받을 때 실제로 어떤 일이 일어날지 생각해볼 필요가 있습니다.

푸시 메시지를 트리거할 때 브라우저는 푸시 메시지를 수신하고 푸시의 대상이 되는 서비스 워커를 발견한 후 그 서비스 워커를 깨워 푸시 이벤트를 발송합니다. 이 이벤트를 수신 대기하고 이벤트를 수신했을 때 그 결과로서 알림을 표시해야 합니다.

`sw.js` 파일에 다음 코드를 추가하세요.

```
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

이 코드를 단계별로 진행해봅시다. 서비스 워커에 이벤트 리스너(아래의 코드)를 추가하여 서비스 워커에서 발생하는 푸시 이벤트를 수신할 수 있도록 합니다.

```
self.addEventListener('push', ...... );
```

이전에 웹 워커를 다루어본 적이 없다면 아마 `self`를 처음 접하실 것입니다. `self`는 서비스 워커 자체를 참조하므로 서비스 워커에 이벤트 리스너를 추가합니다.

푸시 메시지가 수신되면 이벤트 리스너가 실행되고, 등록 시 `showNotification()`을 호출하여 알림을 생성합니다. `showNotification()`은 `title`을 예상할 것이며 `options` 객체를 제공할 수 있습니다. 여기서는 옵션에서 본문 메시지, 아이콘 및 배지를 설정해보겠습니다(직성 시점에서 배지는 Android에서만 사용됨).

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

푸시 이벤트에서 마지막으로 다룰 사항은 `event.waitUntil()`입니다. 이 메서드는 프라미스를 취하며 브라우저는 전달된 프라미스가 확인될 때까지 서비스 워커를 활성화 및 실행 상태로 유지할 것입니다.

위의 코드를 좀 더 쉽게 이해할 수 있도록, 다음과 같이 다시 작성할 수 있습니다.

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

푸시 이벤트를 단계별로 진행해봤으므로, 이제 푸시 이벤트를 테스트해봅시다.

#### 실습

서비스 워커에 푸시 이벤트가 있는 상태에서 DevTools를 사용해 허위 푸시 이벤트를 트리거하여 메시지가 수신될 때 어떤 일이 발생하는지 테스트할 수 있습니다.

웹 앱에서 푸시 메시지를 구독하여 콘솔에 *User IS subscribed*가 표시되는지 확인한 다음, DevTools의 *Application* 채널로 이동해 *Service Workers* 탭에서 자신의 서비스 워커 아래에 있는 *Push* 링크를 클릭하세요.

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

클릭하면 다음과 같은 알림 메시지가 나타날 것입니다.

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

참고: 이 단계를 수행했는데 원하는 결과가 나오지 않으면 DevTools Application 패널에서 *Unregister* 링크를 통해 서비스 작업을 등록 취소하고 서비스 워커가 중지되기를 기다렸다가 페이지를 새로 고쳐 보세요.


## 알림 클릭




이런 알림 중 하나를 클릭해도 아무런 일도 일어나지 않는다는 사실을 알 수 있을 것입니다. 서비스 워커에서 `notificationclick` 이벤트를 수신 대기하는 방법으로 알림 클릭을 처리할 수 있습니다.

다음과 같이 `sw.js`에서 `notificationclick` 리스너를 추가하는 단계부터 시작합니다.

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

사용자가 알림을 클릭하면 `notificationclick` 이벤트 리스너가 호출됩니다.

이 코드랩에서는 먼저 클릭한 알림부터 닫습니다.

```
event.notification.close();
```

그런 다음, [developers.google.com](/web/) URL을 로드하는 새 창/탭을 엽니다. 이 URL은 마음대로 바꿔도 됩니다.

```
clients.openWindow('https://developers.google.com/web/')
```

`event.waitUntil()`을 다시 호출하여 새 창이 표시되기 전에는 브라우저가 서비스 워커를 종료하지 못하게 합니다.

#### 실습

DevTools에서 푸시 메시지를 다시 트리거하고 알림을 클릭해보세요. 그러면 알림이 닫히고 새 탭이 열리는 것을 확인할 수 있을 것입니다.


## 푸시 메시지 보내기




우리가 만든 웹 앱이 DevTools를 사용하여 알림을 표시할 수 있다는 점을 살펴보았고 클릭 알림을 닫는 방법도 알아보았습니다. 다음 단계는 실제 푸시 메시지를 보낼 차례입니다.

보통 이를 위한 프로세스는 웹페이지에서 백엔드로 구독을 전송하면 백엔드가 구독에서 엔드포인트에 대한 API 호출을 실행하여 푸시 메시지를 트리거하는 것입니다.

이 내용은 본 코드랩의 범위를 벗어나지만, 이 코드랩의 도우미 사이트([https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/))를 통해 실제 푸시 메시지를 트리거할 수 있습니다. 다음과 같이 구독 정보를 복사해 페이지 하단에 붙여넣으세요.

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

그런 다음, 아래와 같이 도우미 사이트의 *Subscription to Send To* 텍스트 영역에도 붙여넣으세요.

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

그러면 *Text to Send* 아래에서 푸시 메시지로 보내고 싶은 문자열을 추가할 수 있고, 마지막으로 *Send Push Message* 버튼을 클릭하면 됩니다.

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

그러면 푸시 메시지가 수신되고 자신이 포함한 텍스트가 콘솔에 출력될 것입니다.

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

이런 식으로 데이터 송수신을 테스트하면서 알림을 원하는 형태로 조작할 수 있습니다.

도우미 앱은 실제로는 [웹 푸시 라이브러리](https://github.com/web-push-libs/web-push)를 사용하여 메시지를 보내는 노드 서버일 뿐입니다. [Github의 web-push-libs org](https://github.com/web-push-libs/)를 확인해 어떤 라이브러리를 사용하여 자동으로 푸시 메시지를 보낼 수 있는지 알아보면 도움이 될 것입니다. 푸시 메시지를 트리거하기 위한 핵심적인 세부 사항을 많이 다루고 있기 때문입니다.


## 사용자 구독 취소




우리가 한 가지 놓치고 있는 점은 사용자가 푸시 알림 구독을 취소할 수 있도록 하는 기능입니다. 이를 위해 `PushSubscription`에서 `unsubscribe()`를 호출해야 합니다.

`scripts/main.js` 파일로 다시 돌아가서 `initialiseUI()`에서 `pushButton`의 클릭 리스너를 아래 코드로 변경하세요.

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});
```

우리는 이제 새로운 함수인 `unsubscribeUser()`를 호출하려고 합니다. 이 메서드에서는 현재 구독을 가져와 이에 대해 구독 취소를 호출할 것입니다. 다음 코드를 `scripts/main.js`에 추가하세요.

```
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}
```

이 함수를 단계별로 진행해봅시다.

먼저 `getSubscription()`을 호출하여 현재 구독을 가져옵니다.

```
swRegistration.pushManager.getSubscription()
```

이때 `PushSubscription`으로 확인되는 프라미스가 존재할 경우 이런 프라미스가 반환되고, 존재하지 않으면 `null`이 반환됩니다. 구독이 있을 경우 그 구독에 대해 `unsubscribe()`를 호출하여 `PushSubscription`을 무효로 만듭니다.

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
```

`unsubscribe()`를 호출하면 프라미스가 반환됩니다. 이 과정이 완료되기까지 어느 정도 시간이 걸릴 수 있으므로, 체인에서 그 다음 `then()`이 `unsubscribe()`가 작업을 마칠 때까지 대기하도록 해당 프라미스를 반환합니다. 또한, `unsubscribe()` 호출 시 오류가 발생하는 경우 catch 핸들러를 추가합니다. 그 후에 UI를 업데이트할 수 있습니다.

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### 실습

웹 앱에서 *Enable Push Messaging* / *Disable Push Messaging*을 누를 수 있어야 하며 로그에는 사용자의 구독 여부가 표시됩니다.

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## 완성




드디어 코드랩을 완성했습니다!

이 코드랩에서는 웹 앱에 푸시를 추가하여 활성화하고 실행하는 방법을 알 수 있었습니다. 웹 알림으로 무엇을 할 수 있을지 좀 더 자세히 알아보고 싶으면 [이 문서를 확인해보세요](/web/fundamentals/engage-and-retain/push-notifications/). 

사이트에 푸시를 배포할 방법을 찾고 있다면, GCM을 사용하는 과거의 브라우저나 표준을 준수하지 않는 브라우저를 위한 지원을 추가하는 데도 관심이 있을지 모르겠습니다. [자세한 내용은 여기서 확인할 수 있습니다](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/).

### 추가 자료

*  Web__Fundamentals__의 [웹 푸시 알림](/web/fundamentals/engage-and-retain/push-notifications/) 문서
*  [웹 푸시 라이브러리](https://github.com/web-push-libs/) - Node.js, PHP, 자바 및 Python을 포함한 웹 푸시 라이브러리

#### 관련 블로그 게시물

*  [웹 푸시 페이로드 암호화](/web/updates/2016/03/web-push-encryption)
*  [애플리케이션 서버 키와 웹 푸시](/web/updates/2016/07/web-push-interop-wins)
*  [알림 작업](/web/updates/2016/01/notification-actions)
*  [아이콘, 이벤트 닫기, 다시 알림 기본 설정 및 타임스탬프](/web/updates/2016/03/notifications)





## 문제가 있거나 의견이 있으세요? {: .hide-from-toc }
언제든 망설이지 말고 
[문제](https://github.com/googlechrome/push-notifications/issues)를 제출해 주시면 코드랩에서 더욱 나은 서비스를 제공하는 데 큰 도움이 될 것입니다. 감사합니다!

{# wf_devsite_translation #}
