project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:您已经见识了怎样才算好的通知。现在让我们了解如何实现它们。

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# 处理消息 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="示例通知。">
</figure>

早在[此文章开始](#anatomy)时，我们就展示了一个与下图类似的通知以及相关代码。


尽管我们向您稍加介绍了其编码方式，但实际上并未向您提供足够的实用性信息。
而这正是这一部分的主题。

<div style="clear:both;"></div>

## 服务工作线程

我们再来谈论一下服务工作线程。处理消息涉及仅存在于服务工作线程中的代码。
如果您需要了解一些背景，请再次参阅[简介](/web/fundamentals/getting-started/primers/service-workers)。我们还提供了一些使用 DevTools [调试服务工作线程](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)的便携说明。



## 更多通知详解 {: #more-anatomy }

收到服务器发出的通知时，服务工作线程会利用推送事件拦截通知。
其基本结构如下：


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


我们将在 `waitUntil()` 内的某处对服务工作线程注册对象调用 `showNotification()`。



    self.registration.showNotification(title, {
        body:'Are you free tonight?',
        icon: 'images/joe.png',
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: 'request',
        actions: [
          { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
          { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
        ]
      })


从技术上讲，标题是 `showNotification()` 的唯一必填参数。实际上讲，您至少应该包括正文和图标。
正如您看到的，通知有多种选项。
您可以在 MDN 上找到完整的[选项列表](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification)。


最后，我们将利用 `notificationclick` 和 `notificationclose` 方法处理用户的响应。



    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


其他结构不过是在这些基本思想基础上的加工。

## 选择不显示通知{: #choosing-not-to-show }

有时，收到推送消息时并不需要显示通知。
例如，如果应用已经打开并且推送内容已经显示给用户时就不需要再显示了。


幸运的是，服务工作线程可以测试应用是否处于打开状态。它们支持一个名称为 [`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients) 的接口，此接口是一个由当前服务工作线程所控制全部活动客户端组成的列表。要确定任何客户端是否处于活动状态，请调用 `clients.length`。
如果此属性返回 `0`，则显示通知。
否则采取其他操作。

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

## 准备消息内容 {: #preparing-messages }

如前所述，您的服务器发送两种消息：

* 带有数据负载的消息。
* 不带数据负载的消息，通常称作操作消息 (tickle)。

您的推送处理程序需要将这两种类型都考虑在内。对于不带负载的消息，您需要通过在告知用户数据可用前获取数据来提供良好的用户体验。



让我们先从包含 `event.waitUntil()` 调用的基本推送事件处理程序开始。
该方法只能带有 Promise 或能够解析为 Promise 的内容。
此方法可以将 `push` 事件的寿命延长至特定任务完成。
正如您很快就会看到的，我们会将 `push` 事件保持至通知显示完成。


    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

接下来，如果您在事件对象中发现数据，则获取它。

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


如果对象中没有数据，请调用 `fetch()` 从服务器获取数据。否则，只需返回数据。


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

在这两种情况下，我们最终都会得到一个 JSON 对象。现在该向用户显示通知了。


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

## 合并类似的通知 {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="合并来自同一发送者的消息。">
</figure>

有时，将多个通知合并成一个通知很有用处。例如，社交网络应用为了避免在某人每次发送帖子时都发消息通知用户，可能需要将它们合并在一起。



合并类似通知包括多个部分。我喜欢将合并拆分成以下步骤来说明。


1. 消息抵达 `push` 事件处理程序。
2. 调用 `self.registration.getNotifications()` 来查看是否存在想要合并的任何通知。
最常用的方式是检查通知标记。
3. 最后，通过调用 `self.registration.showNotification()` 确保您在选项中将 renotify 参数设为 true 来显示您的新通知（请参阅下面的示例）。




在我们查看另一个示例时请留意这些方面。我们假定您已按照上一部分所述收到或检索了消息数据。现在，让我们看一看如何处理它。

先从基本推送事件处理程序开始。`waitUntil()` 方法可以返回解析为通知数据的 Promise。



    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


在获得消息数据后，请使用 `data.tag` 调用 `getNotifications()`。

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

在其他示例中，我们已在对 `showNotification()` 的调用中将 `options` 对象实例化。
对于此方案，`options` 对象需要根据 `getNotifications()` 的结果变化。因此，我们需要将通知 `options` 对象实例化。



请注意，我们还为通知选项附加了通知数据。
我们这样做是为了确保其可用于 `notificationclick`，我们将在稍后的部分中对后者进行探讨。
为告知浏览器我们要合并通知，我们需要重用 `tag`，并将 `renotify` 设置为 `true`。
两者在下面的代码中均突出显示。

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

当我们为新通知填写其余属性时，我们还将为通知添加两个操作按钮。
一个用于打开应用；另一个用于忽略通知，不执行任何操作。推送事件不会处理任一操作。我们将在下一部分对此进行研究。
最后，显示通知（第 26 行）。

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

## 将操作包含在通知内 {: #notification-actions }

我们已经见过了内置操作的通知示例。下面，我们看一看它们是如何实现的以及如何对它们作出响应。


回想一下，`showNotification()` 带有一个包含一个或多个可选操作的 options 参数。



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
  <img src="images/confirmation.png" alt="带操作的通知。">
</figure>

通知指出，Stacy 确认了下午 3:00 的预约。
收件人可以通过自己的确认作出响应，也可请求重新安排预约。
对于前者，我们将直接向服务器发送一则消息。
对于后者，我们将打开应用并转到相应界面。


<div style="clear:both;"></div>

首先，让我们为服务工作线程添加一个 `notificationclick` 事件处理程序。此外，关闭通知。



    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


接下来，我们需要通过某种逻辑来了解通知的点击位置。用户点击了“Confirm”、“Ask for Reschedule”还是两者均未点击？


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

如果用户点击了“Confirm”，我们可以直接将该信息发送回服务器而不打开应用（第 3-13 行）。
请注意，我们将在向服务器发送确认后立即从 `notificationclick` 事件返回。这将阻止应用打开。

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

如果收件人点击了“Ask for Reschedule”，则我们需要打开应用并转到确认页面。如果用户点击的是操作按钮以外的其他地方，则我们只需打开应用。在这两种情况下，我们都将创建相应的网址。


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

注：从现在开始，代码示例开始变得有点庞大。受限于空间，我们需要将其截断。但请不要担心，我们会在最后向您展示完整的代码。

无论网址为何，我们都将调用 `clients.matchAll()` 以获取可以在导航时使用的客户端窗口。



    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


最后，我们需要根据客户端是否已打开采用不同的导航路径。


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


以下是从头到尾的完整 `notificationclick` 处理程序。


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
