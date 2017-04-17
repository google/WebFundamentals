project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在此代码实验室中，您将学习如何使用新版 DevTools Application 面板调试服务工作线程。您还将学习如何模拟推送通知以验证您的订阅是否正确设置。

{# wf_updated_on:2016-10-19T18:28:32Z #}
{# wf_published_on:2016-01-01 #}


# 调试服务工作线程 {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}



## 简介




服务工作线程为开发者提供应对参差不齐的网络和创建真正离线优先网络应用的惊人能力。但是作为一种新技术，它们有时可能难以调试，特别是当我们等待工具跟上时。

此代码实验室将引导您创建基本的服务工作线程，并演示如何使用 Chrome DevTools 中新的 Application 面板来调试和检查工作线程。

### 我们将要开发什么应用？

![6ffdd0864a80600.png](img/6ffdd0864a80600.png)

在此代码实验室中，您将使用一个非常简单的 Progressive Web App，并学习在您遇到问题时可以在自己的应用中使用的技术。

因为此代码实验室的重点是指导您使用工具，所以您可以在各个点和试验上随时停止。使用代码、刷新页面、打开新标签等。学习调试工具的最好方法只是打破传统并亲自动手安装它们。

### 您将学习的内容

* 如何使用 Application 面板检查服务工作线程
* 如何浏览 Cache 和 IndexedDB
* 如何模拟不同网络情况
* 如何使用调试程序语句和断点调试服务工作线程
* 如何模拟推送事件

### 您需具备的条件

* Chrome 52 或更高版本
* 安装  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)，或者使用您自己选择的 Web 服务器。
* 示例代码
* 文本编辑器
* HTML、CSS 和 JavaScript 的基础知识

此代码实验室的重点是调试服务工作线程以及有关使用服务工作线程的一些先备知识。某些概念只是一掠而过，有些则向您提供代码块（例如样式或不相关的 JavaScript）以直接复制和粘贴后使用。如果您对服务工作线程不熟悉，请务必[通读 API 入门指南](/web/fundamentals/primers/service-worker/)，然后再继续。


## 设置




### 下载代码

可通过点击以下按钮下载此代码实验室的所有代码：

[链接](https://github.com/googlecodelabs/debugging-service-workers/archive/master.zip)

解压下载的 zip 文件。这将解压根文件夹 (`debugging-service-workers-master`)，其中包含此代码实验室的每个步骤的对应文件夹，以及您需要的所有资源。

`step-NN` 文件夹包含此代码实验室的每个步骤所需的结束状态。这些文件夹供您参考。我们将在一个名为 `work` 的目录中完成所有的编码工作。

### 安装并验证网络服务器

尽管您可以使用自己的网络服务器，但此代码实验室的设计只有与 Chrome Web Server 结合使用时才能正常运行。如果您尚未安装此应用，可以从 Chrome 网上应用店安装。

[链接](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

安装 Web Server for Chrome 后，点击书签栏上的 Apps 快捷方式： 

![9efdf0d1258b78e4.png](img/9efdf0d1258b78e4.png)

在随后出现的窗口中，点击 Web Server 图标： 

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

接下来您将看到此对话框，您可以在其中配置本地网络服务器：

![433870360ad308d4.png](img/433870360ad308d4.png)

点击 __choose folder__ 按钮，然后选择 `work` 文件夹。这样您就可以通过网络服务器对话框（在 __Web Server URL(s)__ 部分）中突出显示的网址为正在进行的工作提供支持。

在 Options 下，选中“Automatically show index.html”旁边的框，如下所示：

![8937a38abc57e3.png](img/8937a38abc57e3.png)

然后将标记为“Web Server:STARTED”的切换按钮向左滑动，然后向右滑动，停止并重启服务器。

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

现在，在您的网络浏览器中访问您的工作网站（通过点击突出显示的 Web Server URL），然后您会看到如下页面：

![693305d127d9fe80.png](img/693305d127d9fe80.png)

显然，此应用还没有做任何有趣的事情。我们将添加功能，以便验证其是否可在后续步骤中离线工作。## Application 标签简介







### 检查清单

构建 Progressive Web App 需要将许多不同的核心技术（包括服务工作线程和网络应用清单）以及有用的支持技术（如 Cache Storage API、IndexedDB 和推送通知）结合在一起。为使开发人员能够轻松获得各种技术的协调视图，Chrome DevTools 在新版 Application 面板中为每个技术加入了检查器。

* 打开 Chrome DevTools，然后点击显示为 __Application__ 的标签。

![b380532368b4f56c.png](img/b380532368b4f56c.png)

查看边栏，请注意 __Manifest__ 当前处于突出显示状态。此视图显示与 `manifest.json` 文件有关的重要信息，例如其应用名称、启动网址、图标等。

虽然我们不会在此代码实验室中对其进行介绍，但请注意，有一个 __Add to homescreen__ 按钮，它可用于模拟添加应用到用户主屏幕的体验。

![56508495a6cb6d8d.png](img/56508495a6cb6d8d.png)

### 检查服务工作线程

过去，检查服务工作线程需要在 Chrome 内部环境中进行调查，而且绝对不是最方便的用户体验。所有这一切都随着新的 __Application__ 标签而改变！

* 点击当前选择的 __Manifest__ 项下方的 __Service Workers__ 菜单项

![3dea544e6b44979d.png](img/3dea544e6b44979d.png)

__Service Workers__ 视图提供有关当前源中活动的服务工作线程的信息。顶部的一行是一系列复选框。

* __Offline __- 将模拟断开与网络的连接。这将有助于快速验证您的服务工作线程的抓取处理程序是否正常运行。
* __Update on reload__ - 将用新的服务工作线程强制替换当前服务工作线程（如果开发者已更新 `service-worker.js`）。通常情况下，浏览器将等待，直到用户在更新到新的服务工作线程之前关闭包含当前网站的所有标签。
* __Bypass for network__ - 将强制浏览器忽略所有活动服务工作线程并从网络中获取资源。这有助于您使用 CSS 或 JavaScript 而不必担心服务工作线程意外缓存或返回旧文件。
* __Show all__ - 将在不考虑来源的情况下，显示所有活动服务工作线程。

您将下方看到与当前活动服务工作线程（如果存在）有关的信息。最有用的字段之一是 __Status__ 字段，它显示服务工作线程的当前状态。由于这是首次启动应用，当前的服务工作线程已成功安装并激活，因此它显示一个绿色圆圈表示一切正常。

请注意绿色状态指示灯旁边的 ID 号。这是当前活动服务工作线程的 ID。请记住它或写下来，因为稍后我们将使用它进行比较。

* 在您的文本编辑器中，打开 `service-worker.js` 文件

当前服务工作线程的代码非常简单，只有几个控制台日志。

    self.addEventListener('install', function(event) {
      console.log('Service Worker installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Service Worker activating.');  
    });

如果您切换回 DevTools 然后查看控制台，可以看到两个日志都已成功输出。

![5fcfd389f5357c09.png](img/5fcfd389f5357c09.png)

请更新 `service-worker.js` 的代码以查看其完成生命周期变更。

* 更新 `service-worker.js` 中的注释，使其包含新消息。

    self.addEventListener('install', function(event) {
      console.log('A *new* Service Worker is installing.');
    });
    
    self.addEventListener('activate', function(event) {
      console.log('Finally active. Ready to start serving content!');  
    });

* 刷新页面并在 DevTools 中打开控制台

控制台记录 `A *new* Service Worker is installing.`，但不显示处于活动状态的新服务工作线程的第二条消息。

* 切换到 DevTools 中的 Application 标签

在 Application 标签中，现有两个状态指示灯，各表示我们的两个服务工作线程的状态。

![2e41dbf21437944c.png](img/2e41dbf21437944c.png)

请注意第一个服务工作线程的 ID。它应该与原始服务工作线程 ID 匹配。当您安装新的服务工作线程时，在用户下一次访问页面之前，以前的工作线程将保持活动状态。

第二个状态指示灯显示我们刚刚编辑的新服务工作线程。现在它处于等待状态。

强制激活新服务工作线程的简单方法是使用 __skipWaiting__ 按钮。

![7a60e9ceb2db0ad2.png](img/7a60e9ceb2db0ad2.png)

* 点击 skipWaiting 按钮，然后切换至控制台

请注意现在控制台记录来自 `activate` 事件处理程序的消息。

`Finally active. Ready to start serving content!`


## 浏览缓存




使用服务工作线程管理您的离线缓存文件是令人难以置信的超能力。新版 __Application__ 面板有很多有用的工具，用于浏览和修改存储的资源，这些工具在开发期间非常有用。

### 为服务工作线程添加缓存

在您可以检查缓存之前，您需要编写一些代码来存储一些文件。在服务工作线程的安装阶段，预缓存文件是一种有用的技术，可以确保在用户即将离线时关键资源可用。让我们由此开始。

* 在更新 `service-worker.js` 之前，打开 DevTools __Application__ 面板，导航至 __Service Workers__ 菜单，然后选中显示为 __Update on reload__ 的框

![d4bcfb0983246797.png](img/d4bcfb0983246797.png)

这一有用的技巧将强制页面使用最新的服务工作线程，因此您不必在每次要更改服务工作线程时点击 __skipWaiting__ 选项。

* 接下来，更新 `service-worker.js` 中的代码，显示如下

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

* 刷新页面

在 Application 面板中，您可能会注意到显示了错误。这似乎很可怕，但是点击 __details__ 按钮后，就会发现这只是 __Application__ 面板告知您的旧服务工作线程已被强制更新。由于这是预期行为，所以完全没问题，但是它可以起到警告的作用。因此请不要忘记在完成编辑 `service-worker.js` 文件后关闭复选框。

![a039ca69d2179199.png](img/a039ca69d2179199.png)

### 检查 Cache Storage

请注意 __Application__ 中的 __Cache Storage__ 菜单项现有一个插入符，显示它可展开。

* 点击以展开 __Cache Storage__ 菜单，然后点击 `my-site-cache-v1`

![af2b3981c63b1529.png](img/af2b3981c63b1529.png)

在这里您可看到由服务工作线程缓存的所有文件。如果您需要从缓存中移除文件，可以右键点击该文件，然后从上下文菜单中选择 __delete__ 选项。同样，您可以通过右键点击 `my-site-cache-v1`，然后选择 delete 以删除整个缓存。

![5c8fb8f7948066e6.png](img/5c8fb8f7948066e6.png)

### 清理平板

您可能已经注意到，除 __Cache Storage__，还有一些与存储资源有关的其他菜单项：Local Storage、Session Storage、IndexedDB、Web SQL、Cookie 以及 Application Cache ("AppCache")。在一个面板中精细控制每个资源是非常有用的！但是如果您处于想删除所有存储资源的情形下，访问每个菜单项并删除其内容是相当繁琐的。更好的做法是，您可以使用 __Clear storage__ 选项来一次性清理平板（请注意这也将注销所有的服务工作线程）。

* 选择 __Clear storage__ 菜单选项
* 点击 __Clear site data__ 按钮以删除所有存储资源

![59838a73a2ea2aaa.png](img/59838a73a2ea2aaa.png)

如果您返回并点击 `my-site-cache-v1`，将看到已删除所有存储文件。

![317d24238f05e69c.png](img/317d24238f05e69c.png)

齿轮是什么？

因为服务工作线程能够提出自己的网络请求，所以可有助于识别来自工作线程本身的网络流量。

* 当 `my-site-cache-v1` 仍然为空时，切换至 Network 面板
* 刷新页面

在 Network 面板中，您应该看到对文件（例如 `main.css`）的一组初始请求。之后是前面带有齿轮图标的第二轮请求，这些请求似乎要获取相同的资源。

![2ba393cf3d41e087.png](img/2ba393cf3d41e087.png)

齿轮图标表示这些请求来自服务工作线程本身。具体而言，这些是由服务工作线程的 `install` 处理程序提出以填充离线缓存的请求。


## 模拟不同网络条件




服务工作线程的杀手锏功能之一是即使在用户离线时，它们也能够为其提供缓存内容。要验证一切是否按计划进行，请测试 Chrome 提供的一些网络节流工具。

### 离线时提供请求服务

为提供离线内容，您需要将 `fetch` 处理程序添加到 `service-worker.js`中。

* 将以下代码添加到紧跟在 `activate` 处理程序后的 `service-worker.js`中。

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

* 切换到 __Application__ 面板，并验证 __Update on reload__ 仍处于选中状态
* 刷新页面以安装新服务工作线程
* 取消选中 __Update on reload__
* 选中 __Offline__

您的 __Application__ 面板应该如下显示：

![873b58278064b627.png](img/873b58278064b627.png)

请注意 __Network__ 面板现在有一个黄色警告标志，表示您已离线（并提醒您如果要继续使用网络进行开发，您需要取消选中该复选框）。

随着您的 `fetch` 处理程序到位，您的应用设置为 __Offline__，现在到了关键时刻。刷新页面，如果一切顺利，您应该继续看到网站内容，即使网络未提供任何信息。您可以切换至 __Network__ 面板以验证 Cache Storage 是否提供所有资源。请注意在 __Size__ 列中，表示这些资源来自 `(from Service Worker)`。这是一个信号，告诉我们服务工作线程拦截了请求，并提供了来自缓存的响应而不是碰撞网络。

![a6f485875ca088db.png](img/a6f485875ca088db.png)

您将注意到有失败的请求（例如对新服务工作线程或 `manifest.json` 的请求）。这是完全正常且符合预期的。

### 测试缓慢或奇怪的网络

因为我们在各种不同的环境中使用我们的移动设备，不断在各种连接状态之间转换。不仅如此，在世界上的许多地方，3G 和 2G 速度仍是常态。为验证我们的应用适用于这些消费者，我们应该测试即使在较慢的连接情况下，它也能保持高性能。

首先，让我们在服务工作线程不运行的情况下，模拟在缓慢的网络上应用是如何工作的。

* 在 __Application__ 面板中，取消选中 __Offline__
* 选中 __Bypass for network__

![739dc5811e4aa937.png](img/739dc5811e4aa937.png)

__Bypass for network__ 选项将告诉浏览器，当需要发出网络请求时跳过我们的服务工作线程。这表示 Cache Storage 未能提供任何内容，就好像我们没有安装任何服务工作线程一样。

* 接下来，切换至 __Network__ 面板
* 使用 __Network Throttle__ 下拉菜单将网络速度设置为 `Regular 2G`。

__Network Throttle__ 下拉菜单位于 __Network__ 面板的右上角、__Network__ 面板的 __Offline__ 复选框旁边。默认情况下，它被设置为 `No throttling`。

![c59b54a853215598.png](img/c59b54a853215598.png)

* 将速度设置为 `Regular 2G`，刷新页面

请注意响应时间会飙升！现在每个资源的下载需要几百毫秒的时间。

![70e461338a0bb051.png](img/70e461338a0bb051.png)

让我们看看服务工作线程在后台运行时有何不同。

* 仍将速度设置为 `Regular 2G`，切换回 __Application__ 标签
* 取消选中 __Bypass for network__ 复选框
* 切换回 __Network__ 面板
* 刷新页面

现在我们的响应时间急速下降至每个资源仅需几毫秒。对于网络速度较慢的用户来说，这是天壤之别！

![f0f6d3b0a1b1f18d.png](img/f0f6d3b0a1b1f18d.png)


## 请记住，它只是 JavaScript




服务工作线程就像一种魔法，但是在后台，它们实际上只是常规 JavaScript 文件。这表示您可以使用现有的工具（如 `debugger` 语句和断点）来调试它们。

### 使用调试程序

许多开发者在他们的应用出现问题时，依赖于出色的旧版 `console.log()`。但是，工具箱中有一个更强大的工具：`debugger`。

将这一行添加到您的代码中将暂停执行，并打开 DevTools 中的 __Sources__ 面板。从这里开始，您可以逐步执行函数、检查对象，甚至使用控制台对当前 作用域运行命令。这对于调试一个奇怪的服务工作线程尤其有用。

为了对其进行测试，我们来调试 `install` 处理程序。

* 在 `service-worker.js` 中 `install` 处理程序的开头添加一个 `debugger` 语句。

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

* 从 __Application__ 面板中，刷新页面
* 点击 __skipWaiting__ 以激活新服务工作线程
* 再次刷新页面以允许 `fetch` 处理程序运行

应用将暂停执行并将面板切换至 __Sources__，其中 `debugger` 语句现在将在 `service-worker.js` 中突出显示。

![d960b322c020d6cc.png](img/d960b322c020d6cc.png)

此视图提供了大量有用的工具。有一个工具是 __Scope__ 检查器，它让我们在当前函数作用域内看到对象的当前状态。

* 点击 `event: ExtendableEvent` 下拉菜单

![5116146f838a566.png](img/5116146f838a566.png)

从这里，您可以了解有关当前作用域内对象的各种有用的信息。例如，查看 `type` 字段，您可以验证当前事件对象是否为 `install` 事件。

### 使用断点

如果您正在 __Sources__ 面板中检查代码，您可能会发现设置一个断点比在您的实际文件中添加 `debugger` 语句更容易些。断点有类似的目的（它冻结执行，让我们检查应用），但是它可以在 DevTools 中自行设置。

要设置断点，您需要点击您希望应用停止执行的行号。

* 从 __Sources__ 面板向下滚动到 `service-worker.js` 的第 25 行，然后点击行号

![da7b5f76723ca525.png](img/da7b5f76723ca525.png)

这将在 `fetch` 处理程序的开头设置断点，以便可以检查其事件对象。

* 刷新页面

请注意，与您使用 `debugger` 语句时类似，执行现在已停在有断点的行上。这表示您现在可以检查在您的应用中传递的 `FetchEvent` 对象，并确定它们请求的资源。

* 在 __Scope__ 检查器中，展开 `event` 对象
* 展开 `request` 对象
* 请注意 `url` 属性

![f9b0c00237b4400d.png](img/f9b0c00237b4400d.png)

您可以看到该 `FetchEvent` 正在 `http://127.0.0.1:8887/` 上请求资源，这是我们的 `index.html`。因为应用将处理许多 `fetch` 请求，您可以将断点留在原处并恢复执行。这使您能在每个 `FetchEvent` 在应用在传递时对其进行检查。有一项非常有用的技术，用于精确观察您的应用中的所有请求。

* 按下 __Resume__ 按钮以允许继续脚本执行

![ce7b5e8df4e8bc07.png](img/ce7b5e8df4e8bc07.png)

稍后，执行将在同一断点处暂停。检查 `event.request.url` 属性，并请注意现在它显示 `http://127.0.0.1:8887/styles/main.css`。您可以继续用这种方式查看它请求 `smiley.svg`、`main.js`，最后是 `manifest.json`。


## 测试推送通知




推送通知是创造互动体验的重要组成部分。由于通知需要在应用服务器、消息服务（如 Google Cloud Messaging）和您的服务工作线程之间进行协调，因此首先要独立测试服务工作线程以验证其是否正确设置，这可能非常有用。

### 添加推送支持

您可能已经注意到在应用中心有一个  __Subscribe for Push Notifications__ 按钮，它要求用户订阅推送通知。此按钮已被远程配置，以在用户点击时请求推送通知权限。

![3e7f08f9d8c1fc5c.png](img/3e7f08f9d8c1fc5c.png)

最后的步骤是将 `push` 事件的支持添加至 `service-worker.js`。

* 打开 `service-worker.js`，然后在 `fetch` 处理程序后添加以下几行

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

处理程序就绪后，就可以很轻松地模拟推送事件。

* 打开 __Application__ 面板
* 刷新页面，当您看到新的服务工作线程进入 `waiting` 阶段时，点击 __skipWaiting__ 按钮
* 点击 __Subscribe to Push Notifications__ 按钮
* 接受权限提示

![a8a8fa8d35b0667a.png](img/a8a8fa8d35b0667a.png)

* 最后，点击 __Update__ 和 __Unregister__ 旁边的 __Push__ 按钮

![eacd4c5859f5f3ff.png](img/eacd4c5859f5f3ff.png)

您现在应该会看到在屏幕的右上角，出现一个确认服务工作线程是否按预期处理 `push` 事件的推送通知。

![b552ed129bc6cdf6.png](img/b552ed129bc6cdf6.png)

干得不错！

现在您的工具箱中有一些调试工具，您应该有能力解决项目中出现的任何问题。剩下的唯一的事情就是您要走出去，然后构建下一个惊人的 Progressive Web App！





## 发现问题，或者有反馈？{: .hide-from-toc }
立即提交[问题](https://github.com/googlecodelabs/debugging-service-workers/issues)，帮助我们让代码实验室更加强大。
谢谢！

{# wf_devsite_translation #}
