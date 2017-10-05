project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:学习如何将服务工作线程集成到现有应用内，以使应用能够离线工作。

{# wf_updated_on: 2016-11-09T18:31:19Z #}
{# wf_published_on: 2016-01-01 #}


# 在网络应用中添加服务工作线程和离线功能 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



## 概览



![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

在此代码实验室中，您将学习如何将服务工作线程集成到现有应用内，以使应用能够离线工作。该应用名为 [Air Horner](https://airhorner.com)。点击喇叭就会发声。

#### 您将学习的内容

* 如何向现有项目添加基础服务工作线程。
* 如何使用 Chrome DevTools 模拟离线模式以及检查和调试服务工作线程。
* 一种简单的离线缓存策略。

#### 您需具备的条件

* Chrome 52 或更高版本。
* 对  [Promises](/web/fundamentals/getting-started/primers/promises)、Git 和 Chrome DevTools 的基本了解。
* 示例代码。
* 文本编辑器。
* 本地网络服务器。如果您想要使用此代码实验室中所述的网络服务器，则需要在命令行中安装 Python。


## 获取示例代码



通过 SSH 从命令行克隆 GitHub 存储区。

    $ git clone git@github.com:GoogleChrome/airhorn.git

或 HTTPS：

    $ git clone https://github.com/GoogleChrome/airhorn.git


## 运行应用示例



首先，我们先看看应用示例的最终样子（提示：太奇妙了）。 

通过查看 `master` 分支确保您位于正确的（最终）分支。

    $ git checkout master

从本地网络服务器运行网站。您可以使用任意网络服务器，但对于此代码实验室的其他部分，我们假定您在端口 3000 上使用的是 Python 的 `SimpleHTTPServer`，以便从 `localhost:3000` 中运行应用。

    $ cd app
    $ python -m SimpleHTTPServer 3000

在 Chrome 中打开网站。您会看到：![9246b0abd8d860da.png](img/9246b0abd8d860da.png)


## 测试应用



点击喇叭，应能发声。

现在，您可以使用 Chrome DevTools 模拟离线模式了。

打开 DevTools，转至 __Application__ 面板，然后启用 __Offline __ 复选框。在下面的屏幕截图中，鼠标悬停在复选框上。 

![479219dc5f6ea4eb.png](img/479219dc5f6ea4eb.png)

点击复选框后，请注意 __Network __ 面板标签旁边的警告图标（带有感叹号的黄色三角形）。这表示您处于离线状态。 

如需证明您处于离线模式，请转至  [https://google.com](https://google.com)。您会看到 Chrome 的“there is no Internet connection”错误消息。 

现在，返回到应用中。尽管您处于离线状态，页面应仍然能够完全重新加载。您应仍然能够使用喇叭。

它能够离线工作的原因就是此 代码实验室的基础：通过服务工作线程提供离线支持。


## 构建初学者应用



您现在将要删除应用中的所有离线支持，学习如何使用服务工作线程重新将离线支持添加到应用中

请查看应用的“断开”版本，此版本未实现服务工作线程。

    $ git checkout code-lab

返回到 DevTools 的 __Application __ 面板，禁用 __Offline __ 复选框，以便重新返回在线状态。

运行页面。应用应能如期运行。

现在，使用 DevTools 重新模拟离线模式（通过在 __Application __ 面板中启用 __Offline __ 复选框）。__注意！如果您不是非常了解服务工作线程，则会看到一些异常行为。

您可能会看到什么？因为您处于离线状态，并且这个版本的应用没有服务工作线程，您将看到 Chrome 中显示典型的“there is no Internet connection”错误消息。

但您实际看到的是...功能完备的离线应用！

![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

这是怎么回事？回想一下您在开始此代码实验室时的情景，您尝试了应用的完整版本。当您运行那个版本时，应用实际上安装了服务工作线程。现在，在您每次运行应用时，服务工作线程都会自动运行。一旦 `localhost:3000` 等作用域（您将会在下一部分中了解有关作用域的更多内容）中安装了服务工作线程，服务工作线程会在您每次访问作用域时自动启动，除非您以编程方式或手动将其删除。 

如需修复这一问题，请转至 DevTools 的 __Application __ 面板，点击 __Service Workers __ 选项卡，然后点击 __Unregister __ 按钮。在下面的屏幕截图中，鼠标悬停在按钮上。 

![837b46360756810a.png](img/837b46360756810a.png)

现在，在您重新加载网站之前，请确保您仍然在使用 DevTools 模拟离线模式。重新加载页面，应会如期显示“there is no Internet connection”错误消息。

![da11a350ed38ad2e.png](img/da11a350ed38ad2e.png)


## 在网站上注册服务工作线程



现在，可以将离线支持重新添加到应用中。这个过程由两个步骤组成：

1. 创建一个将作为服务工作线程的 JavaScript 文件。
2. 指示浏览器将此 JavaScript 文件注册为“服务工作线程”。

首先，创建一个名为 `sw.js` 的空白文件，然后将其放入 `/app` 文件夹。 

现在打开 `index.html`，并将以下代码添加到 `<body>` 底部。

```
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

脚本会检查浏览器是否支持服务工作线程。如果不支持，它会将我们当前使用的空白文件 `sw.js` 注册为服务工作线程，然后记录到控制台。

在重新运行网站之前，返回到 DevTools，查看  __Application __面板的 __Service Workers __ 标签。此标签当前应为空，表示网站没有安装服务工作线程。 

![37d374c4b51d273.png](img/37d374c4b51d273.png)

确保已停用 DevTools 中的 __Offline __ 复选框。重新加载页面。在加载页面时，您可以看到服务工作线程已经完成注册。

![b9af9805d4535bd3.png](img/b9af9805d4535bd3.png)

在 __Source __ 标签旁边，您可以看到已注册的服务工作线程源代码的链接。 

![3519a5068bc773ea.png](img/3519a5068bc773ea.png)

如果您想要检查当前为页面安装的服务工作线程，请点击链接。这将会在 DevTools 的 __Sources __ 面板中为您显示服务工作线程的源代码。例如，现在点击链接，您会看到一个空文件。 

![dbc14cbb8ca35312.png](img/dbc14cbb8ca35312.png)


## 安装网站资产



注册服务工作线程后，当用户首次点击页面时，会触发 `install` 事件。此事件就是您要缓存页面资产的地方。

将以下代码添加到 sw.js。

```
importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
```

第一行会添加缓存 polyfill。此 polyfill 已经添加到存储区。我们需要使用 polyfill 是因为 Cache API 尚未在所有浏览器中得到完全支持。接下来是 `install` 事件侦听器。`install` 事件侦听器可以打开 `caches` 对象，然后使用我们要缓存的资源列表进行填充。关于 `addAll` 操作的一个重要事情就是要么全部添加，要么全部不添加。如果其中有一个文件不存在或无法抓取，整个 `addAll` 操作将会失败。合格的应用将会处理这种情况。

下一步是对服务工作线程编程，以将任意资源的请求返回给拦截，并使用 `caches` 对象返回每个资源的本地存储版本。


## 拦截网页请求



服务工作线程的一个强大的功能就是，一旦它控制页面，就可以拦截页面发出的每个请求，并确定对请求执行的操作。在本部分中，您将对服务工作线程进行编程，以拦截请求并返回缓存版本的资产，而不是到网络上检索这些资产。

第一步是将一个事件处理程序附加到 `fetch` 事件。发出的每个请求都会触发此事件。

将以下代码添加到 `sw.js` 的底部，以便记录父页面发出的请求。

我们来测试一下这个功能。__注意！__您将会看到更加异常的服务工作线程行为。 

打开 DevTools，转至 __Application__ 面板。应停用 __Offline __复选框。按 `Esc` 键以打开 DevTools 窗口底部的 __Console __抽屉。您的 DevTools 窗口应类似于以下屏幕截图：

![c96de824be6852d7.png](img/c96de824be6852d7.png)

现在重新加载页面并查看 DevTools 窗口。首先，我们预期能看到记录到控制台中的大量请求，但没有看到。其次，在 __Service Worker __窗格中，我们可以看到 __Status __已发生更改：

![c7cfb6099e79d5aa.png](img/c7cfb6099e79d5aa.png)

在 __Status __中，有一个新的服务工作线程正等待激活。这就是包含我们刚才所做更改的新的服务工作线程。因此，出于某种原因，我们以前安装的旧的服务工作线程（空白文件）仍然在控制页面。如果您点击 __Source __旁边的 `sw.js` 链接，便可验证旧的服务工作线程仍然在运行中。 

如需修复这种不便，请启用 __Update on reload__ 复选框。

![26f2ae9a805bc69b.png](img/26f2ae9a805bc69b.png)

启用此复选框后，DevTools 会始终在每个页面重新加载时更新服务工作线程。这在主动开发服务工作线程时非常有用。

现在重新加载页面，就会看到系统安装了新的服务工作线程，并且正在将请求网址记录到控制器，如预期一样。

![53c23650b131143a.png](img/53c23650b131143a.png)

现在，您需要确定使用这些请求要完成的任务。默认情况下，如果您未进行任何设置，请求会传递到网络，系统会将响应返回到网页。

要使应用离线工作，如果缓存中存在请求，我们需要从中获取请求。

请更新您的抓取事件侦听器，以匹配以下代码。

`event.respondWith()` 方法会让浏览器评估未来事件的结果。`caches.match(event.request)` 会获取触发抓取事件的当前网络请求，在缓存中寻找匹配的资源。匹配通过查找网址字符串执行。`match` 方法会返回可解析的 promise，即使未在缓存中找到相关文件。这意味着您可以选择要执行的操作。在您的简单案例中，如果未找到文件，您会想要从网络中 `fetch` 它，然后将其返回到浏览器。

这是最简单的情况，还有许多其他缓存情境。例如，您可以增量方式缓存之前未缓存请求的所有响应，以便以后从缓存返回这些响应。 


## 恭喜！



现在您获得离线支持了。在您处于在线状态时重新加载页面，将服务工作线程更新为最新版本，然后使用 DevTools 转至离线模式。重新加载页面，就可以拥有功能完备的离线汽笛了！

#### 我们已经阐述的内容

* 如何向现有项目添加基础服务工作线程。
* 如何使用 Chrome DevTools 模拟离线模式以及检查和调试服务工作线程。
* 一种简单的离线缓存策略。

#### 后续步骤

* 了解如何轻松添加功能强大的[具有 Polymer 离线元素的离线支持](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)
* 探索更多[高级缓存技巧](https://jakearchibald.com/2014/offline-cookbook/)

#### 了解详情

*  [服务工作线程简介](/web/fundamentals/primers/service-worker/)





## 发现问题，或者有反馈？{: .hide-from-toc }
立即提交[问题](https://github.com/googlesamples/io2015-codelabs/issues)，帮助我们让代码实验室更加强大。谢谢！

{# wf_devsite_translation #}
