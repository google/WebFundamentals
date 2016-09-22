project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 在这个codelab,你将会学到如何在web app里加入推送通知。这也将会重新接触用户与新内容的最新新闻和信息。

{# wf_updated_on: 2016-05-13 #}
{# wf_published_on: 2000-01-01 #}

# 你的首个推送通知 web app {: .page-title }

{% include "_shared/contributors/samdutton.html" %}

<img src="images/image00.png" width="373" height="93" alt="Screenshot of push notification" />

在这个codelab,你将会学到如何在web app里加入推送通知。

这将会重新接触用户与新内容的最新新闻和信息。

你也会学到 Service Workers 的基础。

## 你将会学到

* Service Worker 的基本: 安装 和 事件处理器
* 如何设置 Google 云端推送（GCM）帐号
* 如何添加 web manifest
* 请求 GCM 发送到 web 客户端的技巧
* 显示推送通知
* 推送通知的单击事件处理器

## 你需要

* Chrome 42 或以上
* [git](https://git-scm.com/) 和 [Chrome DevTools](/web/tools/chrome-devtools) 基本的了解
* 拥有 [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/) 和 [service worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/) 的经验将会带来些好处，但不是关键
* 示例代码
* 代码编辑器
* 命令行以运行命令行工具
* Python 或其他的 Local Web Server（见下文）


## 获取示例代码


您可以下载所有的示例代码到你的电脑：

[下载ZIP文件](https://github.com/GoogleChrome/push-notifications/archive/master.zip)

...或根据以下的命令行以复制GitHub仓库:


    $ git clone git@github.com:GoogleChrome/push-notifications.git
    

这将会创建一个名为 **_push-notifications_** 的文件夹。这文件夹包括了这codelab每个步骤的完整的代码。

在 **_app_** 的文件夹里，创建你自己的代码。在这整个codelab, 我们将会参照那文件夹。

## 运行本地Web服务器


**在localhost1开启一个Web服务器**

在这个codelab中，你需要运行一个本地Web服务器。你或许已经自己设置了。若没有，开启命令提示符,
导航至 **_push-notifications_** 文件夹。运行以下的Python命令以启动服务器:


    $ python -m SimpleHTTPServer
    

这将会在默认的HTTP端口开启一个Web服务器。
从你的游览器，导航到[localhost](http://localhost)。
你将会看到 **_push-notifications_** 的顶层目录。

导航到[localhost/app](http://localhost/app)以查看在 **_app_** 文件夹里自己的代码。
导航到[localhost/completed](http://localhost/completed)以查看这codelab每个步骤的完整的代码。

如果你没有安装Python,你可以在[这里](https://www.python.org/downloads/)下载。如果在启动服务器时遇到问题，[请检查](https://www.google.com/search?q=what+is+using+port) 是不是有其他的服务在使用SimpleHTTPServer的端口。

这codelab里的命令行示例都使用 bash shell。

Windows用户需使用命令提示符里的MS-DOS命令: 检查这指南里相等的DOS / bash命令。要不然，你可能需要使用Cygwin环境。

另外，你也可以使用: [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/).

## 开始使用Service Worker


你可以在completed/step3目录找到这步骤的完整代码。


### 1. 创建 index.html

在 _app_ 目录里，创建一个名为 _index.html_ 的文件并把以下的代码添加进去:


    <!DOCTYPE html>
    <html>
    <head>
      <title>推送通知 codelab</title>
    </head>
    <body>
      <h1>推送通知 codelab</h1>
      <p>这网页必须使用HTTPS或通过localhost。</p>
      <script src="js/main.js"></script>
    </body>
    </html>
    

使用Chrome, 在本地开启 _index.html_ : 该URL应该像
http://localhost/push-notifications/app/index.html_.

### 2. 添加Service Worker

在 _app_ 目录里，创建一个名为 _sw.js_ 的文件。稍后你将会把代码添加进去。

如果你从来没有使用过Service Workers, 别担心。就算你不是很了解，你还是可以完成这codelab. Service workers是个在后台执行的worker scripts。它是用来拦截网络请求，处理推送消息以及执行其他任务。如果你想知道更多，你可以在HTML5 Rocks网页中的[Introduction to Service Worker](http://www.html5rocks.com/en/tutorials/service-worker/introduction/)找到更多资料。

当接收到一个推送消息时，游览器能在后台运行service worker。并在网页没有开启的情况下，处理推送消息。

### 3. 注册和安装Service Worker

在这个步骤里，创建一个名为 _sw.js_ 的JavaScript文件。并在 _index.html_ 导入 _sw.js_ 。这将应许网页存取该Service Worker的脚本。

在 _app_ 目录里，创建一个名为 _js_ 的文件夹。并把以下的代码加进 _main.js—_:


    if ('serviceWorker' in navigator) {
     console.log('Service Worker is supported');
     navigator.serviceWorker.register('sw.js').then(function(reg) {
       console.log(':^)', reg);
       // TODO
     }).catch(function(err) {
       console.log(':^(', err);
     });
    }
    

这代码将确保该游览器支持service worker。如果该游览器支持service worker, 他将会注册和安装Service Worker。

### 4. 从本地主机试试吧

在Chrome中使用本地主机打开 _index.html_。然后打开Chrome开发者工具中的控制台。

它应该是这样的：

<img src="images/image01.png" width="965" height="901" alt="Codelab web page open in Chrome, showing ServiceWorkerRegistration in DevTools console" />

### 5. 尝试 serviceworker-internals

使用 _chrome://serviceworker-internals_ 诊断页以检查你的service workers是否正常运作:

<img src="images/image02.png" width="907" height="641" alt="chrome:serviceworker-internals diagnostic page open in Chrome" />

### 6. 添加事件监听器进你的 Service Worker

把以下的代码添加进 _sw.js_:


    console.log('Started', self);
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Installed', event);
    });
    self.addEventListener('activate', function(event) {
      console.log('Activated', event);
    });
    self.addEventListener('push', function(event) {
      console.log('Push message received', event);
      // TODO
    });
    

在这service worker里，`self` 指的是 `ServiceWorkerGlobalScope` 物件，也就是service worker。

**小贴士!**

在默认中，旧的service worker将会保持运行直到所有正在是用该service worker的网页关闭。而新的service worker将会保持在`waiting`的状态下。

当`skipWaiting()`被引用时(见以上的代码),service worker将会跳过waiting(等待)状态，并立即启用新的service worker。

这能方便调试!

在 _chrome://serviceworker-internals_ 里，点击 **Inspect** 按钮。你将会看到以下的情况:

<img src="images/image03.png" width="888" height="845" alt="Chrome DevTools console showing service worker instal and activate events" />

**警告**: 如果service worker中有任何错误,service worker将不会被安装。
因此, 当Service worker正在安装时，错误将会被运行。
当你更改代码时，这可能导致你的service worker更新失败。当你更改任何代码，请检查和验证您的代码.

## 在谷歌开发者控制台创建项目


Web app的推送通知需要后端要处理推送通知的信息。Chrome目前使用[谷歌云端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/) (GCM)。
这个的最终目标是让Chrome和GCM支持
[Web推送协议/Web Push Protocol](https://datatracker.ietf.org/doc/draft-ietf-webpush-protocol/).

其他游览器可以使用其他的服务。

在这个步骤，你将会在谷歌开发者控制台建立一个项目。

**在这里有很多步骤，但别放弃。其实这是非常简单的。**

### 1. 创建项目

从[谷歌开发者控制台/Google Developers Console](https://console.developers.google.com),
创建一个新的项目:

<img src="images/image04.png" width="907" height="845" alt="Web page screenshot: create a new project from the Google Developers Console" />

### 2. 为该项目选择API

从 **Use Google APIs**, 选择 **Enable and manage APIs**:

<img src="images/image05.png" width="907" height="845" alt="Web page screenshot: select APIs from the Google Developers Console" />

从 **Google APIs** 目录中, 选择 **Google Cloud Messaging**:

<img src="images/image06.png" width="907" height="845" alt="Web page screenshot: select Google Cloud Messaging API" /> 如果API顺利的被添加，你将会看到以下的情况:

<img src="images/image07.png" width="965" height="901" alt="Web page screenshot: Google Developers Console, Google Cloud Messaging enabled" />

### 3. 获取证书

从 **API Manager** 的菜单中, 选择 **Credentials**, 点击 **Create
credentials**，然后在下拉列表中选择 **API key**:

<img src="images/image08.png" width="965" height="901" alt="Web page screenshot: add credentials from the Google Developers Console" />

选择 **Browser key** 按钮:

<img src="images/image09.png" width="907" height="822" alt="Web page screenshot: click Browser key button to select new API key type in the Google Developers Console" />

为你的Browser key命名(任何名字都可以!), 并在HTTP referrers留下空白。点击 **Create** 按钮继续。

<img src="images/image10.png" width="907" height="822" alt="Web page screenshot: click the Create button to create a browser API key from the Google Developers Console" />

获取你的 **API key** — 之后你需要这个:

<img src="images/image11.png" width="907" height="822" alt="Web page screenshot: get the API key for your project from the Google Developers Console" />

回去主页，获取你的 **Project Number** — 之后你也需要这个:

<img src="images/image12.png" width="965" height="901" alt="Web page screenshot: get the Project Number for your project from the Google Developers Console" />

恭喜!

你已经成功创建了一个新的谷歌云端推送项目。

## 添加manifest档案 


你可以在completed/step5目录找到这步骤的完整代码。

Manifest是个JSON档案，它提供Web app各种的资讯，包括了推送通知的配置。

### 1. 创建一个Manifest档案

在 _app_ 目录里，创建一个名为 _manifest.json_ 的文件。

添加以下的代码至 _manifest.json_ 。在 _gcm\_sender\_id_ 填入你在上个步骤获取的Project Number:


    {
      "name": "Push Notifications codelab",
      "gcm_sender_id": "593836075156"
    }
    

除此之外, web manifests也带来许多其他的功能，包括了设置App图示以及添加至主屏幕。

更多关于Web Manifest的资料，请见网页基础的文章[Installable Web Apps](/web/updates/2014/11/Support-for-installable-web-apps-with-webapp-manifest-in-chrome-38-for-Android).

### 2. 告诉游览器你的web app的manifest的路径

将以下的代码添加进 _index.html_ 里的head标题：


    <link rel="manifest" href="manifest.json">

## 订阅推送通知



你可以在completed/step6目录找到这步骤的完整代码。

### 1. 添加订阅代码

更换 _main.js_ 里的 TODO注解。更换之后，代码应该是这样的:


    if ('serviceWorker' in navigator) {
        console.log('Service Worker is supported');
        navigator.serviceWorker.register('sw.js').then(function(reg) {
            console.log(':^)', reg);
            reg.pushManager.subscribe({
                userVisibleOnly: true
            }).then(function(sub) {
                console.log('endpoint:', sub.endpoint);
            });
        }).catch(function(error) {
            console.log(':^(', error);
        });
    }
    

这代码是用`ServiceWorkerRegistration` 物件中的`pushManager`来订阅你在manifest设定的gcm\_sender\_id的推送通知。

你必须传递`{userVisibleOnly: true}`参数至subscribe()方法。这将会告诉游览器, 当收到推送消息时，推送通知将会被显示。目前，这将会强制显示通知。

### 2. 在localhost试试吧

从localhost中打开 _index.html_。然后用Chrome开发者工具打开控制台。

你将会看到以下的情况：

<img src="images/image13.png" width="888" height="590" alt="Web page screenshot: permissions dialog for Push Notifications" />

**重要**: Chrome的隐身模式目前不接受Push API. 如果你想重置推送通知的权限，点击URL左边的页面图标。

<img src="images/image14.png" width="713" height="672"  alt="Web page screenshot: Push notifications permissions setting dialog" />

### 3. 获取订阅ID
从Chrome开发者工具里，右键点击 `endpoint` 然后选择 **Copy Link Address/复制链接地址** 以复制值。它应该是这样的:

_https://android.googleapis.com/gcm/send/**APA91bGdUldXgd4Eu9MD0qNmGd0K6fu0UvhhNGL9FipYzisrRWbc-qsXpKbxocgSXm7lQuaEOwsJcEWWadNYTyqN8OTMrvNA94shns\_BfgFH14wmYw67KZGHsAg74sm1\_H7MF2qoyRCwr6AsbTf5n7Cgp7ZqsBZwl8IXGovAuknubr5gaJWBnDc**_

把订阅ID记录起来(URL的最后一部分，也就是被加粗的部分)。

在下个步骤，你将会使用这订阅ID, 告诉谷歌云端推送在把消息发送到哪里。

<img src="images/image15.png" width="774" height="932" alt="Web page screenshot: Chrome DevTools console showing Push Notifications endpoint value" />

## 从命令行发送GCM请求以发送推送通知


在上个步骤，我们说到Chrome的推送通知是使用谷歌云端推送(GCM).

为了让GCM发送推送通知到Web客户端，你需要发送一个GCM请求。请求的内容包括:

* 在前个步骤创建的 **public API key** 这看起来像下面这样:<br>
  <br>
  _AIzaSyAc2e8MeZHA5NfhPANea01wnyeQD7uVY0c_<br>
  <br>
  GCM将匹配这与你从Google Developer Console里获取到的Project Number。
  这将会和manifest里的`gcm_sender_id`一起使用。

* 一个适当的 **Content-Type header**, 例如 `application/json`.

* 一个 **subscription IDs** 的数组。每个数组中的值就是代表每个客户端应用程序,
  也就是订阅 endpoint URL的最后一部分:<br>
  <br>
  _APA91bHMaA-R0eZrPisZCGfwwd7z1EzL7P7Q7cyocVkxBU3nXWed1cQYCYvF
  glMHIJ40kn-jZENQ62UFgg5QnEcqwB5dFZ-AmNZjATO8QObGp0p1S6Rq2tcCu
  UibjnyaS0UF1gIM1mPeM25MdZdNVLG3dM6ZSfxV8itpihroEN5ANj9A26RU2Uw_

至于已经发布或待发布的网页或web应用程序，你应该在服务器设置GCM，并从服务器发送GCM请求。
(代码样本请见 [Push Notifications on the Open Web](/web/updates/2015/03/push-notifications-on-the-open-web).) 但是在这个codelab,你可以使用命令提示符来发送GCM请求。

你可以使用cURL实用程来发送GCM请求。

如果你没用过cURL, 以下的网站可能对你有帮助:

* [Getting Started guide](http://ethanmick.com/getting-started-with-curl)
* [Reference documentation](http://curl.haxx.se/docs/manpage.html)

你需要像以下的cURL命令以发送GCM请求:
    curl --header "Authorization: key=**&lt;PUBLIC\_API\_KEY&gt;**" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration\_ids\":[\"**&lt;SUBSCRIPTION\_ID&gt;**\"]}"

 让我们开始吧!

### 1. 对GCM发出请求

在你的命令提示符, 运行以下的cURL命令 - 但确保你使用你在前个步骤获取的API key和订阅ID:


    curl --header "Authorization: key=XXXXXXXXXXXX" --header "Content-Type: application/json" https://android.googleapis.com/gcm/send -d "{\"registration_ids\":[\"fs...Tw:APA...SzXha\"]}"
    

### 2. 检查响应

如果没有问题，你将会在你的命令提示符看到以下的情况:

<img src="images/image16.png" width="890" height="551" alt="BASH terminal screenshot: successful response to cURL request to GCM to send a push message" />

如果出现授权错误，确保你的授权号是对的。如果响应出现注册无效的错误，确保你的订阅ID是对的。

### 3. 检查诊断

看一下 _chrome://serviceworker-internals_. 你应该看到一样或类是的情况:

<img src="images/image17.png" width="1547" height="492" alt="Chrome DevTools screenshot:  Push message received" />

开启你的Chrome Canary和Chrome，然后尝试向GCM请求推送通知。

确保你把每个订阅ID放上引号。

### 4. 尝试改变窗口焦点

尝试关闭或改变你的应用程序的游览器的窗口焦点。你应该会看到像这样的推送通知:

<img src="images/image18.png" width="373" height="109" alt="Push notification screenshot: 'This site has been updated in the background'" />

**重要**: 每个客户端都会有不一样的订阅ID. 当你在向GCM发送请求时，确保你全部要接受推送通知的用户的订阅ID包括在内！
 当你在建构这codelab的代码时，这codelab每个步骤的订阅ID都会不一样。


## 使用XHR (Ajax)来请求发送推送通知



另外一个来请求发送推送通知的方法是通过XHR。

但是，我们会把这个当成你们的练习!

**提示**: 你可以常考这个演示：
[simple-push-demo.appspot.com](https://simple-push-demo.appspot.com).


## 显示推送通知 {: .page-title }





你可以在completed/step9目录找到这步骤的完整代码。

在这个步骤，你将会把你的代码添加到service worker的push handler以显示推送通知。

### 1. 添加 showNotification()代码

更改 _sw.js_ 中的代码，用以下的代码代替 _TODO_ 注释：


    console.log('Started', self);
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Installed', event);
    });
    self.addEventListener('activate', function(event) {
      console.log('Activated', event);
    });
    self.addEventListener('push', function(event) {
      console.log('Push message', event);
      var title = 'Push message';
      event.waitUntil(
        self.registration.showNotification(title, {
          body: 'The Message',
          icon: 'images/icon.png',
          tag: 'my-tag'
        }));
    });
    // TODO
    

这`event.waitUntil()`拿到一个promise并延长了他的生命周期直到`showNotification()`返回了promise。

每一个标记值（Tag）都会显示一个通知: 如果接收到新的推送消息，旧的推送消息将会被替换。 如果你要显示多个不同的推送通知，在每个 showNotification() 的函数, 请使用不一样的标记值，或者不要放入标记值。

### 2. 发送一个请求至GCM以发送推送通知

运行在上个步骤的cURL命令或者XHR请求。

你将会看到像这样的推送通知：

<img src="images/image19.png" width="394" height="114" alt="Screenshot of Push Notification" />


## 处理推送通知的点击



你可以在completed/step10目录找到这步骤的完整代码。

在这个步骤，你将会添加代码以让用户点击通知时,启动一个行动(例如打开网页)。

更改 _sw.js_ 中的代码，用以下的代码代替第六步骤的 _TODO_ 注释：


    self.addEventListener('notificationclick', function(event) {
        console.log('Notification click: tag ', event.notification.tag);
        event.notification.close();
        var url = 'https://youtu.be/gYMkEMCHtJ4';
        event.waitUntil(
            clients.matchAll({
                type: 'window'
            })
            .then(function(windowClients) {
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
        );
    });
    

这代码将会用在监听click事件。例如说，他可以用来开启网页。

这代码将会检查是否有没有正在使用这service worker的窗口:
如果被请求的URL已经在标签里开着，他会把焦点移到那个标签 — 不然他将会开启新的标签。

**注意**: 当你点击Android的通知，他不会[自动地关闭](https://crbug.com/463146)通知。

这就是为什么我们需要`event.notification.close();`。


## 退订推送通知


你可以在completed/step11目录找到这步骤的完整代码。

要如何让用户退订及重新订阅推送通知呢？

非常简单: 用户只需调用`PushSubscription`对象中的 `unsubscribe()`函数， 便可以退订推送通知。

在一个生产实现中，你也必须从服务器删除用户的订阅数据, 以避免发送不必要的推送通知。

### 1. 添加订阅/退订按钮到你的应用程序里

在你之前创建的 _index.html_ 里，将以下的代码添加进去:


    <!DOCTYPE html>
    <html>
    <head>
      <title>Push Notification codelab</title>
      <link rel="manifest" href="manifest.json">
    </head>
    <body>
      <h1>Push Notification codelab</h1>
      <p>This page must be accessed using HTTPS or via localhost.</p>
      <button disabled>Subscribe</button>
      <script src="js/main.js"></script>
    </body>
    </html>
    

### 2. 添加订阅/退订功能到 _main.js_ 里

更改你的 _main.js_, 代码应该看起来是这样的:


    var reg;
    var sub;
    var isSubscribed = false;
    var subscribeButton = document.querySelector('button');
    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('sw.js').then(function() {
        return navigator.serviceWorker.ready;
      }).then(function(serviceWorkerRegistration) {
        reg = serviceWorkerRegistration;
        subscribeButton.disabled = false;
        console.log('Service Worker is ready :^)', reg);
      }).catch(function(error) {
        console.log('Service Worker Error :^(', error);
      });
    }
    subscribeButton.addEventListener('click', function() {
      if (isSubscribed) {
        unsubscribe();
      } else {
        subscribe();
      }
    });
    function subscribe() {
      reg.pushManager.subscribe({userVisibleOnly: true}).
      then(function(pushSubscription){
        sub = pushSubscription;
        console.log('Subscribed! Endpoint:', sub.endpoint);
        subscribeButton.textContent = 'Unsubscribe';
        isSubscribed = true;
      });
    }
    function unsubscribe() {
      sub.unsubscribe().then(function(event) {
        subscribeButton.textContent = 'Subscribe';
        console.log('Unsubscribed!', event);
        isSubscribed = false;
      }).catch(function(error) {
        console.log('Error unsubscribing', error);
        subscribeButton.textContent = 'Subscribe';
      });
    }
    

在这个代码中，当service worker在安装是，ServiceWorkerRegistration物件的reg，是在之后在subscribe()函數以用来订阅推送通知。

`subscribe()`函數将会创建`PushSubscription` 物件 **sub**, 并使用在`unsubscribe()`函數。

记得: 每一次推送通知被重新订阅时，客户端将会获取新的注册ID, 所以你必须为GCM请求作出相应的调整。


## 恭喜 {: .page-title }



恭喜你! 你完成了你首个的推送通知web app。

### 常问问题

* **为什么我的service worker不会被更新!**<br>
你确定吗？请检查 _chrome://serviceworker-internals_  
里的源代码的标签。如果真的没有被更新，尝试重新启动Chrome。

* **我已经尝试了全部方法，但我的service worker还是不会被更新:^|**<br>
你检查你的代码了嘛? 如果你的service worker代码无法被解析，service worker是无法安装的。

* **我的GCM请求失败**<br>
请到[console.developers.google.com](https://console.developers.google.com/)
检查你的项目。并确保 _gcm\_sender\_id_ 和项目号码(Project Number)吻合，以及Authorization
key和你的API密钥吻合。最重要的是，你实在参阅正确的项目。

* **我的GCM请求成功，但是推送事件没有被启动**<br>
从控制台中，检查 _main.js_ 出现的订阅ID。这订阅ID数组里的订阅ID是否正确的被请求？
确保你已经从[console.developers.google.com](https://console.developers.google.com/)
启用了消息API。

* **我一直得到我不明白的错误信息**<br>
尝试使用Chrome Canary: 这通常提供更多的关于service worker的错误信息。

* **我从控制台里没看到任何service worker的日志诊断信息**<br>
你只会在Service Worker刚被安装，Service Worker第一次被启用或Service Worker的代码被更改，
你才会在控制台中看到日志诊断信息。

* **那么火狐浏览器接受推送通知吗?**<br>
在默认情况下，
[火狐浏览器42](https://groups.google.com/forum/#!topic/mozilla.dev.platform/BL6TrHN73dY))
或以上，推送API（Push API）是已经被开启的。
## 我们所涵盖的

* 安装service worker和处理事件
* 设置一个谷歌云端推送帐号
* 添加manifest档案
* 启动service worker以处理推送通知的事件
* 使用cURL或XHR来发送GCM请求
* 显示推送通知
* 处理推送通知的点击事件

### 下一步

* Service worker codelab (如果你还没做过!)

### 更多

* [Push Notifications on the Open
  Web](/web/updates/2015/03/push-notifications-on-the-open-web)
* [谷歌云端推送/Google Cloud Messaging](https://developers.google.com/cloud-messaging/)
* [Best Practices for Push Notifications Permission
  UX](https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/edit)
* [Do's and Don'ts for
  Notifications](http://android-developers.blogspot.co.uk/2015/08/get-dos-and-donts-for-notifications.html)
* [Notifications
  guidelines](https://www.google.com/design/spec/patterns/notifications.html)
* [Service Worker
  API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)


Translated By: 
{% include "_shared/contributors/henrylim.html" %}
