project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:请求通知权限和为用户订阅通知只需与向用户显示通知一样轻轻一按。

{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

# 请求权限和订阅用户 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

请求通知权限和为用户订阅通知只需与向用户显示通知一样轻轻一按。

在这一部分和剩下的部分中，我将为您介绍实际代码。有必要了解在何处实施这些代码。
这就是理解服务工作线程之所以重要的原因。
请求权限和订阅用户的代码在您应用的代码中完成，而不是在服务工作线程代码中完成。稍后我们处理推送消息和将其显示给用户时，会使用服务工作线程。


## 检查权限 {: #check-permissions }

始终在页面加载时检查现有权限。如果已经获得权限，您可以立即开始发送通知。无论怎样，都可以利用这些信息来设置权限设置的状态。
权限检查的示例如下。需要明确的是，我们尚未请求获得任何权限。


注：为清晰起见，本示例不包括您应该始终执行的若干功能检查。
您可以在我们的<a href='https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications'>

GitHub Samples 存储区</a>中查看完整的原始代码。


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


## 避免页面加载订阅请求 {: #avoid-page-load-requests }

请注意，之前的示例_没有_调用 `pushManager.subscribe()`，但这似乎是对尚不存在订阅这一发现的逻辑响应。此类请求可能看似及时，但由于您尚不了解用户的任何情况，用户也可能对您一无所知，因此难以向他们发送精确或相关的消息。



## 请求权限 {: #requesting-permission }

<figure class="attempt-right">
  <img src="images/news-prompt.png" alt="发送通知前的第一个任务，并解释原因。">
</figure>

无论您何时请求权限，都需要执行一个两步式流程。首先，利用一则确切说明您为何想向用户发送通知的消息询问用户您的应用是否可以发送通知。



如果用户批准，我们可以从推送管理器获取订阅。
通过调用 `PushManager.subscribe()`（下面示例中着重说明）来执行此操作。
在本示例中，我们向其传递了一个 `userVisibleOnly` 设为 `true` 的对象，以告知浏览器我们会始终向用户显示通知。我们也会包含 `applicationServerKey`。


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

这是在 Chrome 中的结果。

![Chrome 的权限提示。](images/news-permissions.png){:width="296px"}

### 什么是 applicationServerKey？ {: #applicationserverkey }

`applicationServerKey` 值应由您的服务器生成。所有的服务器端问题我们会留到下一部分介绍。
现在，对于 `applicationServerKey`，您需要了解一点：将密钥传入 `subscribe()` 调用时，请确保密钥为 [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)（8 位不带符号的整型数组）。





## 从特定操作触发 {: #trigger-from-action }

<figure class="attempt-right">
  <img src="images/airline-prompt.png" alt="包含具体操作的提示。">
</figure>

请求权限以发送通知来响应特定上下文相关用户操作。
这样您就可以将您的通知与用户目标联系起来，并向用户明确说明您为何想发送通知。



例如，如果某个航空公司网站想通知用户航班延迟，他们会在醒目位置显示一个加入复选框，并且只会在用户选择加入后请求通知权限。



<div style="clear:both;"></div>

## 提供管理通知的地点 {: #manage-notifications }

方便用户更改甚至是停用您的网站通知。它可以防止用户在浏览器或设备一级终止通知。


在非常醒目的地方添加一个通知开关。此外，为其添加标签，向用户说明您想向他们发送的内容而非通知的实现方式。
用户对“推送通知”的了解并不比您对联盟号太空舱轨道调整方法的了解更多。



<div class="attempt-left">
  <figure>
    <img src="images/flight-delay.png">
    <figcaption class="success">
      <b>宜：</b>显示通知所包含内容的通知开关。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/send-push.png">
    <figcaption class="warning">
      <b>忌：</b>显示通知实现方式的通知开关。</figcaption>

  </figure>
</div>
<div style="clear:both;"></div>


## 向服务器传递订阅 {: #passing-subscription }

获得用户的通知发送许可并设置相关控件的状态后，您需要向推送服务器发送订阅信息（在规范中称作“推送资源”）。这涉及创建包含订阅数据的相应请求对象，然后将其传递给服务器。



当您创建请求（下面示例中着重说明）时，请使用 `POST` 谓词和 `application/json` 的 `Content-Type` 标头。
对于正文，您需要将订阅对象转换成字符串。
我们将在下一部分[发送消息](sending-messages)探讨该对象中包含的内容。
利用 `fetch()` 向服务器发送订阅请求。


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
