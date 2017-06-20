project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在此代码实验室中，您将学习如何向网络应用添加推送通知。

{# wf_updated_on: 2016-11-21T15:42:20Z #}
{# wf_published_on: 2016-01-01 #}


# 向网络应用添加推送通知 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



## 概览




推送消息提供了重新吸引用户的简单有效方式，在此代码实验室中，您将学习如何向网络应用添加推送通知。

### 您将学习的内容

* 如何为用户订阅或取消订阅推送消息
* 如何处理进入的推送消息
* 如何显示通知
* 如何响应通知点击

### 您需具备的条件

* Chrome 52 或更高版本
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)，或者使用您自己选择的网络服务器
* 文本编辑器
* 对 HTML、CSS、JavaScript 和 Chrome DevTools 的基本了解
* 示例代码，请参见“设置”


## 设置




### 下载示例代码

您可以通过以下其中一种方式获取此代码实验室的示例代码：下载 zip 文件：

[链接](https://github.com/googlechrome/push-notifications/archive/master.zip)

或者克隆此 Git 存储区：

    git clone https://github.com/GoogleChrome/push-notifications.git

如果以 zip 文件形式下载源代码，解压后是一个根文件夹 `push-notifications-master`。

### 安装并验证网络服务器

尽管您可以使用自己的网络服务器，但此代码实验室的设计只有与 Chrome Web Server 结合使用时才能正常运行。如果您尚未安装此应用，可以从 Chrome 网上应用店安装。

[链接](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

安装 Web Server for Chrome 后，点击书签栏上的 Apps 快捷方式： 

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

在随后出现的窗口中，点击 Web Server 图标： 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

接下来您将看到此对话框，您可以在其中配置本地网络服务器：

![433870360ad308d4.png](img/433870360ad308d4.png)

点击 __choose folder__ 按钮，然后选择 app 文件夹。这样您就可以通过网络服务器对话框（在 __Web Server URL(s)__ 部分）中突出显示的网址为正在进行的工作提供支持。

在 Options 下，选中“Automatically show index.html”旁边的框，如下所示：

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

然后将标记为“Web Server:STARTED”的切换按钮向左滑动，然后向右滑动，停止并重启服务器。

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

现在，在您的网络浏览器中访问您的网站（通过点击突出显示的 Web Server URL），然后您会看到如下页面：

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### 始终更新服务工作线程

在开发的过程中，非常有必要确保您的服务工作线程始终保持最新状态并拥有最新更改。

要在 Chrome 中进行设置，请打开 DevTools（点击右键 > Inspect）并转至 __Application__ 面板。点击 __Service Workers__ 标签，然后选中 __Update on Reload__ 复选框。如果启用此复选框，服务工作线程会在每次页面重新加载时强制更新。

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## 注册服务工作线程




在您的 `app` 目录中，请注意有一个名称为 `sw.js` 的空文件。这个文件是您的服务工作线程，目前此文件为空，我们稍后会向其添加代码。

首先，我们需要将此文件注册为服务工作线程。

我们的 `app/index.html` 页面会加载 `scripts/main.js`，它位于我们将注册服务工作线程的 JavaScript 文件中。

将以下代码添加到 `scripts/main.js`：

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

此代码会检查当前的浏览器是否支持服务工作线程和推送消息，如果支持，它便会注册我们的 `sw.js` 文件。

#### 试一试

请在浏览器中打开网址 __127.0.0.1:8887__ 以检查所做更改。

打开 Chrome DevTools 以检查 `Service Worker is registered` 的控制台，如下所示：

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### 获取应用服务器密钥

如需使用此代码实验室，您需要生成一些应用服务器密钥，我们可以使用此配套网站执行这一操作：[https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)

您可以在这里生成一个公私密钥对。

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

将公钥复制到 `scripts/main.js` 替换 `<Your Public Key>` 值：

```
const applicationServerPublicKey = '<Your Public Key>';
```

注：决不能将私钥放在网络应用中！


## 初始化状态




目前，网络应用的按钮处于禁用状态，无法点击。因为默认情况下最好禁用推送按钮，在了解推送受支持并且知道用户当前是否订阅后，再启用此按钮。

我们将在 `scripts/main.js` 中创建两个函数，一个称为 `initialiseUI`，会检查用户当前有没有订阅，另一个称为 `updateBtn`，将启用我们的按钮，以及更改用户是否订阅的文本。

我们希望 `initialiseUI` 函数如下所示：

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

我们的新方法使用之前步骤中的 `swRegistration`，在其 `pushManager` 上调用 `getSubscription()`。`getSubscription()` 方法可以在存在订阅时返回可使用当前订阅解析的 promise，否则，返回 `null`。这样我们就能检查用户是否已经订阅，设置特定的状态，然后调用 `updateBtn()`，以便启用按钮，并附带有用的文本。

添加以下代码以实现 `updateBtn()` 函数。

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

此函数会根据用户是否订阅而简单地更改文本，然后启用按钮。

最后就是在注册服务工作线程时调用 `initialiseUI()`。

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### 试一试

打开网络应用，您会看到“‘Enable Push Messaging”按钮现已启用（您可以点击了），并且您会在控制台中看到“User is NOT subscribed.”。

![15f6375617c11974.png](img/15f6375617c11974.png)

在我们继续学习此代码实验室的过程中，您会看到按钮文本会在用户订阅/取消订阅时发生更改。


## 订阅用户




目前我们的“Enable Push Messaging”按钮未执行太多的操作，让我们来修复这个问题。

向 `initialiseUI()` 函数中的按钮添加点击侦听器，如下所示：

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

当用户点击推送按钮时，我们会首先禁用按钮，这仅仅是为了确保用户无法在我们正在订阅推送消息时（这需要一些时间）第二次点击此按钮。

然后我们会在知道用户当前没有订阅时调用 `subscribeUser()`，因此复制以下代码并将其粘贴到 `scripts/main.js`。

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

我们来看看此代码执行什么操作，以及它如何为用户订阅推送消息。

首先我们获取应用服务器的公钥（base64 网址安全编码），然后将其转换为 `UInt8Array`（这是订阅调用的预期输入）。我们已经在 `scripts/main.js` 顶部为您提供 `urlB64ToUint8Array` 函数。

转换此值后，我们对调用服务工作线程的 `pushManager` 调用 `subscribe()` 方法，传递应用服务器的公钥和值 `userVisibleOnly: true`。

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

`userVisibleOnly` 参数基本上就表示承认您会在发送推送时显示通知。此时必须编写此值并且此值必须为 true。

调用 `subscribe()` 会返回在执行以下操作后解析的 promise：

1. 用户已授权显示通知。
2. 浏览器已向推送服务发送网络请求，以便获取详细信息来生成 PushSubscription。

如果这些步骤成功执行，`subscribe()` promise 将通过 `PushSubscription` 解析。如果用户未授权，或者如果订阅用户存在任何问题，promise 将会拒绝，并显示错误。这会在我们的代码实验室中向我们提供以下 promise 链：

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

如此一来，我们就可以收到订阅，并将用户视为已订阅用户，或者收到错误并将其打印到控制台。在这两种情况下，我们调用 `updateBtn()` 都是为了确保按钮已重新启用并且有合适的文本。

我们可以在实际应用中使用 `updateSubscriptionOnServer` 方法将订阅发送到后端，但我们的代码实验室会使用此方法打印 UI 中的订阅，这将在稍后为我们提供帮助。将此方法添加到 `scripts/main.js`：

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

#### 试一试

如果您返回到网络应用，并尝试点击此按钮，会看到如下所示的权限提示：

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

如果您进行授权，则会看到控制台使用 `PushSubscription` 打印 `User is subscribed:`，按钮的文本会更改为“Disable Push Messaging”，并且您将能够在页面底部以 JSON 形式查看订阅。

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## 处理拒绝的权限




我们目前为止还没有解决的事情是，如果用户阻止权限请求会怎么样。这需要考虑一些特殊的注意事项，因为如果用户阻止权限，我们的网络应用将无法重新显示权限提示，也不能订阅用户，因此，我们需要至少停用推送按钮，以便用户知道无法使用此按钮。

很明显，我们需要在 `updateBtn()` 函数中处理这个情况。我们只需要检查 `Notification.permission` 值，如下所示：

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

我们知道，如果权限为 `denied`，就无法订阅用户，并且我们无法执行其他操作，因此，停用此按钮是最好的做法。

#### 试一试

因为我们已经在之前的步骤中为网络应用授权，我们需要点击网址栏的圆圈中的 __i__，将通知权限更改为  *Use global default (Ask)* 。

![8775071d7fd66432.png](img/8775071d7fd66432.png)

更改此设置后，请刷新页面，然后点击 *Enable Push Messaging* 按钮，这次在权限对话框中选择 *Block*。按钮的文本现在为 *Push Messaging Blocked*，并且已停用。

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

进行此更改后，我们现在就可以订阅用户了，我们会考虑可能的权限情景。


## 处理推送事件




在我们介绍如何从后端发送推送消息之前，我们需要考虑在订阅用户收到推送消息后实际会发生什么。

在我们触发推送消息后，浏览器会收到推送消息，弄明白推送的服务工作线程，然后再唤醒相应的服务线程并分配推送事件。我们需要侦听此事件，显示通知作为结果。

将以下代码添加到 `sw.js` 文件：

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

我们来了解一下这个代码。我们通过向服务工作线程添加事件侦听器来侦听服务工作线程中的推送事件，代码如下所示：

```
self.addEventListener('push', ...... );
```

如果您之前没有使用过 Web Workers，`self` 就是新内容。`self` 会引用服务工作线程本身，以便我们向服务工作线程添加事件侦听器。

收到推送消息后，会触发我们的事件侦听器，我们通过在注册时调用 `showNotification()` 来创建通知。`showNotification()` 期望使用 `title`，我们可以提供 `options` 对象。现在我们来看看选项中的消息正文、图标和标志（标志仅在写入时在 Android 上使用）。

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

我们在推送事件中要介绍的最后一个内容是 `event.waitUntil()`。此方法带有 promise ，并且浏览器会保持服务工作线程处于活动状态并运行，直到传入的 promise 已进行解析。

为了简化上述代码，使其易于理解，我们可以重新编写代码，如下所示：

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

处理完推送事件后，我们来测试一下。

#### 试一试

通过使用服务工作线程中的推送事件，我们可以使用 DevTools 触发虚假的推送事件，测试收到消息后会发生什么。

在您的网络应用中，订阅推送消息（确保控制台中有 *User IS subscribed*），然后转至 DevTools 中的 *Application*  面板，并在 *Service Workers* 选项卡下，点击相应服务工作线程下的 *Push*  链接。

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

点击后，您会看到类似于如下的通知：

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

注：如果这个步骤不管用，请通过 DevTools Application 面板中的 *Unregister* 链接取消注册服务工作线程，等待服务工作线程停止，然后重新加载页面。


## 通知点击




如果您点击以下其中一个通知，会发现没有发生任何事情。我们可以通过侦听服务工作线程中的 `notificationclick` 事件，处理通知点击。

开始在 `sw.js` 中添加 `notificationclick` 侦听器，如下所示：

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

当用户点击通知时，会调用 `notificationclick` 事件侦听器。

在此代码实验室中，我们首先关闭点击过的通知：

```
event.notification.close();
```

然后，打开新窗口/标签加载网址 [developers.google.com](/web/)，您可以随意更改此网址：）

```
clients.openWindow('https://developers.google.com/web/')
```

我们重新调用 `event.waitUntil()`，确保浏览器不会在显示新窗口前终止服务工作线程。

#### 试一试

尝试重新在 DevTools 中触发推送消息，然后点击通知。您现在会看到通知关闭，并打开了新标签。


## 发送推送消息




我们已经看到网络应用能够使用 DevTools 显示通知，并且了解了如何通过点击关闭通知，接下来是发送实际的推送消息。

一般情况下，这个过程就是从网页向后端发送订阅，然后后端通过对订阅中的端点实施 API 调用，进而触发推送消息。

这超出了此代码实验室的讨论范围，但您可以使用此代码实验室的配套网站 ( [https://web-push-codelab.appspot.com/](https://web-push-codelab.appspot.com/)) 来触发实际的推送消息。复制粘贴页面底部的订阅：

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

然后将此内容粘贴到配套网站的 *Subscription to Send To*  文本区域：

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

然后，您可以在 *Text to Send* 下添加您想要与推送消息一起发送的任意字符串，最后点击 *Send Push Message* 按钮。

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

然后，您就能收到推送消息，其中包含的文本也将打印到控制台。

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

这可让您测试发送和接收数据，并最终操作通知。

配套应用其实就是使用  [web-push 库](https://github.com/web-push-libs/web-push) 发送消息的节点服务器。非常有必要查看  [Github 上的 web-push-libs org](https://github.com/web-push-libs/)，看看有哪些库可以向您发送推送消息（这样可以了解触发推送消息的详细信息）。


## 取消订阅用户




我们到现在还没介绍如何取消用户的推送消息订阅。为此，我们需要对 `PushSubscription` 调用 `unsubscribe()`。

返回到我们的 `scripts/main.js` 文件，将 `initialiseUI()` 中 `pushButton` 的点击侦听器更改为以下内容：

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

请注意，我们现在准备调用新函数 `unsubscribeUser()`。在此方法中，我们会获取当前的订阅，并对其调用取消订阅。将以下代码添加到 `scripts/main.js`：

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

我们来了解一下这个函数。

首先，我们通过调用 `getSubscription()` 获取当前的订阅：

```
swRegistration.pushManager.getSubscription()
```

这会返回使用 `PushSubscription` 进行解析的 promise（如果存在），否则返回 `null`。如果存在订阅，我们会对其调用 `unsubscribe()`，这会使 `PushSubscription` 无效。

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

调用 `unsubscribe()` 会返回一个 promise（因为这需要一些时间才能完成），因此我们返回该 promise，以便完成链中等待 `unsubscribe()` 的下一个 `then()`。同时，我们还添加了抓取处理程序，以防调用 `unsubscribe()` 导致错误。然后，我们就可以更新 UI 了。

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### 试一试

您应能够按网络应用中的 *Enable Push Messaging*  /  *Disable Push Messaging*，日志会向用户显示已经订阅或取消订阅的用户。

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## 完成




恭喜您完成此代码实验室！

此代码实验室向您介绍了如何设置和运行向网络应用中添加推送的过程。如果您想要了解有关网络通知可以执行的操作的详细信息，[请查看这些文档](/web/fundamentals/engage-and-retain/push-notifications/)。 

如果您准备在自己的网站上部署推送，可能会有兴趣了解为使用 GCM 的旧版/非标准合规浏览器添加支持，[在此处了解详细信息](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/)。

### 深入阅读

*  Web__Fundamentals__ 上的[网络推送通知](/web/fundamentals/engage-and-retain/push-notifications/)文档
*  [网络推送库](https://github.com/web-push-libs/) - 网络推送库包括 Node.js、PHP、Java 和 Python。

#### 相关博文

*  [网络推送负载加密](/web/updates/2016/03/web-push-encryption)
*  [应用服务器密钥和网络推送](/web/updates/2016/07/web-push-interop-wins)
*  [通知操作](/web/updates/2016/01/notification-actions)
*  [图标、关闭事件、重新通知首选项和时间戳](/web/updates/2016/03/notifications)





## 发现问题，或者有反馈？{: .hide-from-toc }
立即提交[问题](https://github.com/googlechrome/push-notifications/issues)，帮助我们让代码实验室更加强大。谢谢！

{# wf_devsite_translation #}
