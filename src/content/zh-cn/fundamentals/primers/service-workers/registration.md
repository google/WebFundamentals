project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:确定服务工作线程注册时间的最佳做法。

{# wf_updated_on:2016-11-28 #}
{# wf_published_on:2016-11-28 #}

# 服务工作线程注册 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[服务工作线程](/web/fundamentals/getting-started/primers/service-workers)可有效加快重复访问网络应用的速度，但您应采取措施确保服务工作线程的初始安装不会恶化用户的首次访问体验。





一般情况下，延迟服务工作线程[注册](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register)直至初始页面完成加载可为用户（特别是网络连接较慢的移动设备用户）提供最佳体验。




## 通用注册样板文件

如果您曾阅读有关服务工作线程的内容，您可能会看到与以下内容实质相似的样板文件：


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

上述内容有时会附带几个 `console.log()` 语句，或包含[代码](https://github.com/GoogleChrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js#L20)（其检测是否对以前的服务工作线程注册进行了更新），以此通知用户刷新页面。但对于标准的几行代码而言，这些只是细微变化。


那么，`navigator.serviceWorker.register` 是否有任何细微差别？是否有任何可以遵循的最佳做法？
毫无意外（考虑到本文还未完结），对这两个问题的回答都是“有”。


## 用户的首次访问

我们考虑一下用户首次访问网络应用。此时还没有服务工作线程，浏览器无法提前知道最终是否会安装一个服务工作线程。



作为开发者，您的首要任务应该是确保浏览器快速获取显示交互页面所需的最低限度的关键资源集。拖慢检索这些响应速度的任何资源都不利于实现快速的交互体验。


现在，想象一下，在下载页面需要渲染的 JavaScript 或图像的进程中，您的浏览器决定启动一个后台线程或进程（为简单起见，我们假设启动一个线程）。假定您使用的不是较大的台式机，而是性能不足的手机，世界上很多人都将手机作为主要设备。启动这个额外的线程将加剧对 CPU 时间和内存的争用，从而影响浏览器渲染交互网页。



空闲的后台线程不太可能有重大意义。但是，如果该线程不处于空闲状态，而是决定也将开始从网络下载资源，那该怎么办？比起对 CPU 或内存的任何顾虑，我们更应该担心许多移动设备可用的有限带宽。带宽非常宝贵，因此，不要同时下载次要资源，这样会影响关键资源的下载。


所有这些都说明，在后台启动一个新的服务工作线程下载和缓存资源，违背了为用户首次访问网站提供最快交互体验的目标。




## 改进样板文件

解决方案是通过选择调用 `navigator.serviceWorker.register()` 的时间来控制服务工作线程的启动。
一个简单的经验法则是延迟注册，直到 <code>[load event](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onload)</code>在  <code>window</code> 上触发，如下所示：

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }

但是启动服务工作线程注册的适当时间还取决于您的网络应用在加载后将做什么。
例如，[Google I/O 2016 网络应用](https://events.google.com/io2016/)在过渡到主屏幕前先显示一个简短的动画。我们的团队[发现](/web/showcase/2016/iowa2016)，在显示动画期间启动服务工作线程注册会导致低端移动设备出现卡顿。当浏览器很有可能出现几秒的空闲状态时，我们可以[延迟](https://github.com/GoogleChrome/ioweb2016/blob/8cfa27261f9d07fe8a5bb7d228bd3f35dfc9a91e/app/scripts/helper/elements.js#L42)服务工作线程注册直到动画显示完毕，而不是为用户提供糟糕的体验。




同样，如果您的网络应用使用在页面加载后执行额外设置的框架，则查看一个框架特定的事件，其表明该工作何时完成。



## 后续访问

到目前为止，我们一直在关注首次访问体验，但延迟服务工作线程注册对重复访问您的网站会有什么影响吗？尽管这让一些人出乎意料，但应该不会有任何影响。



在注册服务工作线程后，它将完成 `install` 和 `activate` [生命周期事件](/web/fundamentals/instant-and-offline/service-worker/lifecycle)。在激活服务工作线程后，它可以处理 `fetch` 事件以对网络应用进行任意后续访问。根据服务工作线程的作用域，它将在请求任意页面*之前*启动，如果您仔细想一下，就会明白这非常有道理。如果在访问页面之前，现有服务工作线程还没有运行，那么，它将没有机会针对导航请求履行 `fetch` 事件。



因此，如果有活动的服务工作线程，那么，何时调用 `navigator.serviceWorker.register()`，或事实上*无论您是否调用它*都无关紧要。除非您更改服务工作线程脚本的网址，否则 `navigator.serviceWorker.register()` 在后续访问期间实际上是一个 [no-op](https://en.wikipedia.org/wiki/NOP)。因此，何时调用它都无关禁用。


## 尽早注册的原因

是否存在最好尽快注册服务工作线程的任何场景？
我想到一个这样的场景，当服务工作线程在首次访问期间使用 <code>[clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim)</code>控制页面时，服务工作线程积极执行其  <code>fetch</code> 处理程序内部的[运行时缓存](/web/fundamentals/instant-and-offline/offline-cookbook/#on-network-response)。在此情况下，最好是尽快激活服务工作线程，以设法使用稍后可能会用到的资源填充其运行时缓存。如果您的网络应用属于此类别，则考虑回退，以确保服务工作线程的  <code>install</code> 处理程序不会请求与主页面的请求争用带宽的资源。




## 进行测试

模拟首次访问的一个绝佳方法是在 [Chrome 隐身窗口](https://support.google.com/chromebook/answer/95464?co=GENIE.Platform%3DDesktop)中打开您的网络应用并查看 [Chrome 的 DevTools](/web/tools/chrome-devtools/) 中的网络流量。作为网页开发者，您每天可能会多次重新加载您的网络应用的某个本地实例。但是，如果在已有服务工作线程且已完全填充缓存的情况下重新访问您的网站，那么，您不会获得与新用户相同的体验，从而容易忽略潜在的问题。



以下示例描述了注册时间不同可能产生的差异。
在隐身模式下使用网络节流访问一个[示例应用](https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo)时截取了两个屏幕截图，以模拟缓慢的网速。



![尽早注册时的网络流量。](../images/early-registration.png
"Network traffic with early registration.")

上面的屏幕截图反映了修改示例以尽快执行服务工作线程注册时的网络流量。
您可以看到预缓存请求（旁边带有[齿轮图标](http://stackoverflow.com/questions/33590378/status-code200-ok-from-serviceworker-in-chrome-network-devtools/33655173#33655173)的条目，源自服务工作线程的 `install` 处理程序）与针对显示页面所需的其他资源的请求分散排列。





![延迟注册时的网络流量。](../images/late-registration.png
"Network traffic with late registration.")


在上面的屏幕截图中，延迟服务工作线程注册直到页面已加载。
您会看到在从网络获取所有资源之前预缓存请求不会启动，因此不会出现任何争用带宽的情况。此外，由于我们预缓存的某些项目已存在于浏览器的 HTTP 缓存中 — Size 列中带有 `(from disk cache)` 的项目，因此，我们可以填充服务工作线程的缓存，而无需再次访问网络。




如果您在真实的移动网络上从真实的低端设备运行这种测试，那就更好了。
您可以利用 Chrome 的[远程调试功能](/web/tools/chrome-devtools/remote-debugging/)将一部 Android 手机通过 USB 连接到台式机，并确保您运行的测试切实反映了许多用户的真实体验。





##  结论

总结一下，确保用户具有最佳的首次访问体验应成为重中之重。
在初始访问期间延迟服务工作线程注册直到页面已加载，可帮助确保这一点。
您仍可获得具有服务工作线程进行重复访问的所有优势。


为确保延迟服务工作线程的初始注册直到第一个页面已加载，一个简单的方法是使用以下代码：


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js');
      });
    }


{# wf_devsite_translation #}
