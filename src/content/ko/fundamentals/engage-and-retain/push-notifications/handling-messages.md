project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 좋은 알림이 어떤 것인지 살펴보았습니다. 이제 알림 구현 방법에 대해 살펴보겠습니다.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# 메시지 처리 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="알림의 예">
</figure>

[이 글의 시작 부분](#anatomy)에서
이 이미지와 유사한 알림과 그 코드를 보여줬습니다.

이 알림의 코딩 방식은 약간 보여줬지만, 아직 유용할 만큼 충분한 정보는
 제공하지 않았습니다. 이 섹션에서 제공하겠습니다.

<div style="clear:both;"></div>

## 서비스 워커 다시 살펴보기

서비스 워커에 대해 다시 살펴봅시다. 메시지 처리는 서비스 워커에만
존재하는 코드를 포함합니다. 약간의 배경 지식이 필요한 경우
[서비스 워커 소개](/web/fundamentals/getting-started/primers/service-workers)를
다시 읽어보세요. 또한 DevTools를 사용하여
[서비스 워커를 디버그](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)하는 데 유용한
몇 가지 지침도 참조하세요.

## 추가적인 알림 분석{: #more-anatomy }

서버로부터 알림이 수신되면, 서비스 워커가 푸시 이벤트를 사용하여
이 알림을 가로챕니다. 이 알림의 기본 구조는 다음과 같습니다.


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


`waitUntil()` 내에서 우리는 서비스 워커 등록 객체에 대해
`showNotification()`을 호출할 것입니다.


    self.registration.showNotification(title, {
        body: 'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


기술적으로는 `showNotification()`에 필요한 유일한 매개변수가 제목뿐이지만,
실제로는 본문과 아이콘을 포함해야 합니다. 보시다시피
알림에는 다양한 옵션이 있습니다. 전체 목록은 [MDN 페이지](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)에서
찾을 수 있습니다.

마지막으로, `notificationclick` 및
`notificationclose` 메서드를 사용하여 사용자의 응답을 처리하겠습니다.


    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


그 외의 모든 것은 이 기본 아이디어를 다듬는 것에 불과합니다.

## 알림을 표시하지 않도록 선택 {: #choosing-not-to-show }

푸시
메시지가 수신될 때 알림을 표시할 필요가 없는 경우가 있습니다. 예를 들어, 앱이 이미 열려 있고 푸시
콘텐츠가 이미 사용자에게 표시되어 있는 경우가 이에 해당합니다.

다행히 서비스 워커는 애플리케이션이 열려 있는지 여부를 테스트할 수 있습니다.
서비스 워커는 현재 서비스 워커가 제어하는 모든 활성 클라이언트 목록인
[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients)라는
인터페이스를 지원합니다. 클라이언트가
활성인지 확인하려면 `clients.length`를 호출합니다. 이 속성이 `0`을 반환하는 경우
알림을 표시합니다. 그렇지 않은 경우 다른 작업을 수행합니다.

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

## 메시지 콘텐츠 준비{: #preparing-messages }

앞서 언급했듯이, 여러분의 서버는 두 종류의 메시지를 보냅니다.

* 데이터 페이로드가 있는 메시지.
* 데이터 페이로드가 없는 메시지(대개 Tickle이라고 부름).

여러분의 푸시 핸들러는 둘 다 고려해야 합니다. 페이로드가 없는 메시지의 경우
사용자에게 뛰어난 환경을 제공하려면, 데이터의 가용성을 사용자에게 알리기 전에
먼저 이 데이터를 가져와야 합니다.

`event.waitUntil()`을 호출하는 기본 푸시 이벤트 핸들러로
시작해 보겠습니다.  이 메서드는 프라미스 또는 프라미스로 분석되는
항목만 취할 수 있습니다. 이 메서드는 특정 작업을 완료할 때까지 `push` 이벤트의
수명을 연장합니다. 아래에서 간략하게 볼 수 있듯이 알림이
표시될 때까지 `push` 이벤트를 보류할 것입니다.

    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

그 다음, 이벤트 객체에서 데이터를 발견하면 데이터를 가져옵니다.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


객체에 데이터가 없으면, `fetch()`를 호출하여 서버에서 데이터를 가져옵니다.
그렇지 않은 경우 데이터를 반환합니다.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

두 경우에 모두 JSON 객체를 사용합니다. 이제 알림을
사용자에게 표시할 차례입니다.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

## 유사한 알림을 결합{: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="동일한 보낸 사람의 메시지를 결합">
</figure>

때로는 여러 개의 알림을 하나로 결합하는 것이 유용합니다. 예를 들어,
소셜 네트워킹 앱에서는 특정 개인의 모든 게시물에 메시징 사용자를
연결하는 대신 이 사용자를 차단할 수 있습니다.

유사한 알림의 결합은 많은 난제들이 있습니다. 그러나
다음 단계에서 중요하게 다룰 주제라고 생각합니다.

1. `push` 이벤트 핸들러에 메시지가 도착합니다.
2. `self.registration.getNotifications()`를 호출하여
 결합할 알림이 있는지 확인합니다. 이는 일반적으로 알림 태그를 확인하는 방식으로 
 수행됩니다.
3. 마지막으로 `self.registration.showNotification()`을 호출하여 옵션에서
 renotify 매개변수가 true로 설정되었는지 확인하고 새 알림을 표시합니다(아래
 예시 참조).

다른 예시를 통해 이에 대해 살펴봅시다. 지난 섹션에서 설명한 대로
메시지 데이터를 이미 수신했거나 검색했다고
가정하겠습니다. 이제 이 데이터로 무엇을 할지 살펴보겠습니다.

기본 푸시 이벤트 핸들러로 시작합니다. `waitUntil()` 메서드는
알림 데이터로 확인되는 프라미스를 반환합니다.


    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


메시지 데이터를 확보한 후에 `data.tag`를 사용하여 `getNotifications()`를 호출합니다.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

다른 예시에서 우리는 `showNotification()` 호출에서 곧바로 `options` 객체를
인스턴스화했습니다. 이 시나리오에서는 `getNotifications()` 결과에 따라
`options` 객체가 변경되어야 하므로 알림
`options` 객체를 인스턴스화합니다.

또한 우리는 알림 데이터를 알림 옵션에
첨부했습니다. 이렇게 하는 이유는, 우리가 나중에 살펴볼 `notificationclick`에
사용하기 위해서입니다. 알림을 결합한다는 것을
브라우저에 알리기 위해, `tag`를 재사용하고`renotify`를 `true`로 설정해야 합니다. 이 둘은 아래에 강조표시되어 있습니다.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

새 알림의 나머지 속성을 채울 때 두 개의 액션 버튼도
알림에 추가할 것입니다. 하나는
애플리케이션을 열고 다른 하나는 액션을 취하지 않고
알림을 해제합니다. 이 액션 중 어느 것도 푸시 이벤트에 의해 처리되지 않습니다. 이에 대해서는
다음 섹션에서 살펴보겠습니다. 마지막으로, 알림을 표시합니다(라인 26).

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

## 액션을 알림에 넣기{: #notification-actions }

액션이 빌드되어 있는 알림의 예를 이미 살펴봤습니다. 이제
액션이 구현되는 방식과 액션에 반응하는 방식을 살펴보겠습니다.

`showNotification()`은 하나 이상의
선택적 액션과 함께 옵션 인수를 취한다는 점을 기억하세요.


    ServiceWorkerRegistration.showNotification(title, {  
      body: data.body,  
      icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
      vibrate: [200, 100, 200, 100, 200, 100, 400],  
      tag: data.tag,  
      actions: [  
        {action: 'change', title: 'Ask for reschedule'},  
        {action: 'confirm', title: 'Confirm'}  
      ],  
      data: data  
    })

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="액션이 있는 알림">
</figure>

이 알림에서는 Stacy가
오후 3시 약속을 확인했다고 말합니다. 수신인은 약속을 확인하는
응답을 하거나 또는 약속 변경을 요청할 수 있습니다. 전자의 경우
메시지를 서버로 직접 보냅니다. 후자의 경우
애플리케이션을 적절한 인터페이스로 엽니다.

<div style="clear:both;"></div>

먼저, `notificationclick` 이벤트 핸들러를 서비스 워커에 추가해 보겠습니다. 또한,
알림을 닫습니다.


    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


그 다음, 알림이 어디에서 클릭되었는지 알기 위한 로직이 필요합니다. 사용자가
'Confirm'이나 'Ask for Reschedule'을 클릭했나요, 아니면 어느 것도 클릭하지 않았나요?

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

사용자가 'Confirm'을 클릭한 경우, 우리는 애플리케이션을 열지 않고
이를 곧바로 서버로 보낼 수 있습니다(라인 3 ~ 13). 서버로
확인을 보낸 후 우리는 곧바로 `notificationclick` 이벤트로부터
돌아옵니다. 이 경우 앱이 열리지 않습니다.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

수신인이 'Ask for Reschedule'을 클릭하면 우리는 확인 페이지를 열고자 합니다. 사용자가 액션 버튼이 아닌 다른 곳을 클릭하면, 우리는 그저 앱을 열고자 합니다.
두 경우 모두 적절한 URL을 만듭니다.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

참고: 지금부터는 코드 샘플이 조금씩 커지기 시작합니다. 공간이 제약되어 있으므로 코드 샘플을 자를 것입니다. 그러나 걱정하지 마세요. 끝에 가서 전체 코드를 보여줄 것입니다.

URL에 상관없이 우리는 탐색에 사용할 클라이언트 창을
가져오기 위해 `clients.matchAll()`을 호출할 것입니다.


    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


마지막으로, 클라이언트가 열려 있는지 여부에 따라 
다른 탐색 경로를 취해야 합니다.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


다음은 처음부터 끝까지 전체 `notificationclick` 핸들러입니다.


    self.addEventListener('notificationclick', function(event) {
      event.notification.close();
      if (event.action === 'confirm') {
        var fetchOptions = {
          method: 'post',
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: event.notification.data.confirmation_id
        };
        var confirmation = new Request('/back/end/system/confirm');
        event.waitUntil(fetch(confirmation, fetchOptions));
        return; // So we don't open the page when we don't need to.
      } else if (event.action === 'change') {
        var appUrl = '?confirmation_id=' +
          event.notification.data.confirmation_id + '#reschedule';
      } else {
        var appUrl = '/';
      }

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        }).then( activeClients => {
          if (activeClients.length > 0) {
            activeClients[0].navigate(appUrl);
            activeClients[0].focus();
          } else {
            clients.openWindow(appUrl);
          }
        })
      );
    });


{# wf_devsite_translation #}
