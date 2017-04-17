project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 알림 권한 요청 시와 사용자의 알림 구독 시에는 알림을 최대한 단순하게 사용자에게 표시해야 합니다.

{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# 권한 요청 및 사용자 구독 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

알림 권한 요청 시와 사용자의 알림 구독 시에는 알림을 최대한 단순하게 사용자에게 표시해야 합니다.

이 섹션과 나머지 섹션에서는 실제 코드를 보여드릴 것입니다.
이 코드가 어디에 구현되는지 확실히 아는 것이 중요합니다. 여기서는
서비스 워커에 대해 이해하는 것이 중요합니다. 권한을 요청하고
사용자를 구독하는 코드는 서비스 워커 코드가 아니라
앱 코드에서 실행됩니다. 서비스 워커는
푸시 메시지를 처리하고 사용자에게 표시할 때 사용됩니다.

## 권한 확인{: #check-permissions }

페이지가 로드될 때 항상 기존 권한을 확인하세요. 이미 권한이
 부여되어 있다면 즉시 알림을
전송할 수 있습니다. 두 가지 방법 중 하나로 이 정보를 사용하여 권한 설정 상태를
설정합니다. 아래의 예시를 참조하세요. 명확한 설명을 위해, 아직 우리는 아무것도 요청하지
않습니다.

참고: 명확한 설명을 위해, 이 예시에서는 반드시 수행해야 하는 여러 가지 기능 검사를
제외합니다. 원본 코드 전체를
보려면<a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>
GitHub 샘플 저장소</a>를 참조하세요.


    function initialiseState() {
      if (Notification.permission !== 'granted') {
        console.log('The user has not granted the notification permission.');
        return;
      } else if (Notification.permission === “blocked”) {
       /* the user has previously denied push. Can't reprompt. */
      } else {
        /* show a prompt to the user */
      }

      // Use serviceWorker.ready so this is only invoked
      // when the service worker is available.
      navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
        serviceWorkerRegistration.pushManager.getSubscription()
          .then(function(subscription) {
            if (!subscription) {
              // Set appropriate app states.
              return;
            }
          })
          .catch(function(err) {
            console.log('Error during getSubscription()', err);
          });
      });
    }


## 페이지-로드 구독 요청 피하기{: #avoid-page-load-requests }

앞의 샘플에서는
`pushManager.subscribe()`를 호출하지 않지만
기존 구독 요청이 없는 것이 당연한 응답처럼 보입니다. 이러한 요청은 시기 적절한 것으로 보일 수도 있습니다.
그러나 여러분은 아직 사용자에 대해 전혀 모르고 
사용자도 여러분에 대해 전혀 모를 수 있기 때문에, 정확한 메시지나 관련된 메시지를 사용자에게 보내는 것이 어렵습니다.

## 권한 요청{: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="알림을 보내기 전에 사용자에게 먼저 물어보고 그 이유를 설명합니다.">
</figure>

언제 수행하는지에 상관없이 권한 요청은 2단계 프로세스입니다.
먼저, 여러분이 사용자에게 알림을 보내려는 이유를 정확히 설명하는 메시지를 사용하여
여러분의 애플리케이션이 알림을 보낼 수 있는지 여부를 물어봅니다.

사용자가 허락하면 푸시 관리자로부터 구독을
가져올 수 있습니다. 이를 위해서는 `PushManager.subscribe()`를 호출합니다(아래 예시에서 강조
). 이 예시에서는 `userVisibleOnly`가
`true`로 설정된 객체에 전달하여 사용자에게 항상 알림을 표시한다고
브라우저에 알립니다. 또한 `applicationServerKey`도 포함합니다.


<div style="clear:both;"></div>

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    <strong>return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });</strong>
  })
  .then(subscription => {
    // Do something with the subscription.
  })
  .catch(error => {
    // Do something with the error.
  });
}
</pre>

다음은 Chrome에서의 결과입니다.

![권한을 묻는 Chrome 프롬프트.](images/news-permissions.png){:width='296px'}

### applicationServerKey란 무엇인가요? {: #applicationserverkey }

`applicationServerKey` 값은 서버에서 생성되어야 합니다. 모든 서버측 문제는
다음 섹션에서 다룰 것입니다. 지금은
`applicationServerKey`에 대해 한 가지만 알아두면 됩니다.
`subscribe()` 호출에 키를 전달할 때는 키가
[Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)(8비트 무서명 정수 배열)인지
확인하세요.

## 특정 액션으로부터 트리거{: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="특정 액션이 있는 프롬프트.">
</figure>

특정한 상황별 사용자 액션에 응답하여 알림을 보내는 권한을
요청합니다. 이렇게 하면
사용자의 목적에 맞게 알림을 보낼 수 있으며, 알림을 보내려는 이유를
명확히 할 수 있습니다.

예를 들어, 항공사 사이트가 사용자에게 항공기 지연을 알리려는 경우,
항공사는 눈에 띄는 옵트인 확인란을 표시하고
사용자가 이 옵트인을 선택한 후에만 알림 권한을 요청할 것입니다.

<div style="clear:both;"></div>

## 알림을 관리하는 위치 제공{: #manage-notifications }

여러분의 사이트에 대해 사용자가 쉽게 알림을 변경하고 비활성화까지 수행할 수 있도록 만듭니다.
브라우저나 기기 수준에서 사용자가 알림을 제거하지 못하도록 합니다.

눈에 잘 띄는 위치에 알림 스위치를 추가합니다. 또한 여러분이 보내고 싶은 것을
사용자에게 보여주기 위해 알림에 레이블을 붙입니다. 알림 구현 방식을 보여줄 필요는 없습니다. 여러분이
소유즈 우주선의 궤도 조정 방법을 모르는 것처럼 사용자는
'푸시 알림'이 무엇인지 모릅니다.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>권장:</b> 어떤 알림이 포함될지를 보여주는 알림 스위치.
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>금지:</b> 어떻게 알림이 구현되는지를 보여주는 알림 스위치.
</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>


## 구독을 서버로 전달{: #passing-subscription }

사용자로부터 알림 전송 권한을 얻고 관련 컨트롤의 상태를 설정한 후에는
구독 정보(사양에서 '푸시 리소스'로 불림)를 푸시 서버로
보내야 합니다. 이 때, 구독 데이터가 포함된
적절한 요청 객체가 만들어지고, 이 객체가 서버로
전달됩니다.

요청을 생성할 때는(아래 예시에 강조) `POST`
동사와 `application/json`의 `Content-Type` 헤더를 사용합니다. 본문의 경우에는
구독 객체를 문자열로 변환해야 합니다. 다음 섹션인 [메시지 보내기](sending-messages)에서는
이 객체에 무엇이 있는지를 살펴보겠습니다. `fetch()`
를 사용하여 구독 요청을 서버로 보냅니다.

<pre class="prettyprint">
if ('showNotification' in ServiceWorkerRegistration.prototype) {
  navigator.serviceworker.ready
  .then(registration => {
    return registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: new Uint8Array([...])
    });
  })
  <strong>.then(subscription => {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(subscription)
    };
    return fetch('/your-web-server/api', fetchOptions);
  })</strong>
  .catch(error => {
    // Do something with the error.
  });
}
</pre>


{# wf_devsite_translation #}
