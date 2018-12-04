project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:了解如何在本地存储数据以缩短响应时间和改进离线支持。

{# wf_updated_on:2016-09-29 #}
{# wf_published_on:2016-09-29 #}

# Progressive Web App 的离线存储 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="DevTools 中的 PWA">
  <figcaption>
    <a href="https://pokedex.org" class="external">Pokedex</a>
    Progressive Web App 针对应用状态和 Pokemon 数据集使用 IndexedDB，而对于网址可寻址的资源则使用 Cache API。
</figcaption>

</figure>

在路上时互联网连接会变得不稳定或无法上网，这是离线支持和可靠的性能成为 [Progressive Web App](/web/progressive-web-apps/) 中的常用功能的原因。即使在完美的无线环境中，明智地使用缓存和其他存储技术也可显著改善用户体验。在此博文中，我们将围绕 PWA  的离线数据存储总结一些想法—思考提供*有效的*离线体验所需的 JSON 负载、图像和常规静态数据。




<div class="clearfix"></div>

## 建议：

我们进入正题，首先介绍针对离线存储数据的建议：


* 对于网址可寻址的资源，使用 [**Cache API**](https://davidwalsh.name/cache)（[服务工作线程](/web/fundamentals/primers/service-worker/)的一部分）。
* 对于所有其他数据，使用 [**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)（具有一个 [Promise](/web/fundamentals/getting-started/primers/promises) 包装器）。


下面介绍基本原理：

上述两个 API 都是异步的（IndexedDB 基于事件的，而 Cache API 基于 Promise）。
它们也使用[网页工作线程、窗口和服务工作线程](https://nolanlawson.github.io/html5workertest/)。
IndexedDB 在[每个位置](http://caniuse.com/#feat=indexeddb)都可用。
服务工作线程（和 Cache API）目前在 Chrome、Firefox、Opera 中[可用](https://jakearchibald.github.io/isserviceworkerready/)，并正在针对 Edge 进行开发。IndexedDB 的 Promise 包装器隐藏了 IndexedDB 库自带的一些强大但同时也非常复杂的 machinery（例如，事务处理、架构版本）。IndexedDB 将支持 [observers](https://github.com/WICG/indexed-db-observers)，其让您可以轻松实现标签之间的同步。



Safari 10 在其最新的技术预览版中[修复了许多长期存在的 IndexedDB 错误](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)。Note: 一些用户发现 Safari 10 的 IndexedDB 和 PouchDB 存在稳定性问题，并发现其速度有些慢。在对此问题进行更多研究之前，您的情况可能有所不同。请进行测试并提交浏览器错误，以便 @webkit 工作任意和相关的 OSS 库作者可以查看。默认情况下，LocalForage、PouchDB、YDN 和 Lovefield 在 Safari 中使用 WebSQL（因为缺少有效的方法对损坏的 IndexedDB 进行功能测试）。这意味着这些库无需任何额外操作即可在 Safari 10 中使用（只是不直接使用 IndexedDB）。


对于 PWA，您可以缓存静态资源，从而使用 Cache API 编写您的应用 Application Shell（JS/CSS/HTML 文件），并从 IndexedDB 填充离线页面数据。

针对 IndexedDB 的调试支持目前在 [Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)（Application 标签）、Opera、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)(Storage Inspector) 和 Safari（请参阅 Storage 标签）中可用。





## 其他存储机制是怎样的？

Web Storage（例如 LocalStorage 和 SessionStorage）是同步的，不支持网页工作线程，并对大小和类型（仅限字符串）进行限制。
Cookie [具有自身的用途](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)，但它们是同步的，缺少网页工作线程支持，同时对大小进行限制。WebSQL 不具有广泛的浏览器支持，因此不建议使用它。File System API 在 Chrome 以外的任意浏览器上都不受支持。目前正在 [File and Directory Entries API](https://wicg.github.io/entries-api/) 和 [File API](https://w3c.github.io/FileAPI/) 规范中改进 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File)，但该 API 还不够成熟也未完全标准化，因此无法被广泛采用。






## 我能存储多少数据？

<table>
  <thead>
    <th>浏览器</th>
    <th>限制</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>可用空间 &lt;6%</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>可用空间 &lt;10%</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>&lt;50MB</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>&lt;250MB</td>
    </tr>
  <tbody>
</table>

在 Chrome 和 Opera 中，按照源（而不是 API）进行存储。这两个存储机制都将存储数据，直到达到浏览器[配额](http://www.html5rocks.com/en/tutorials/offline/quota-research/)。应用可以使用 [Quota Management API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota) 检查它们目前使用了多少配额。
在 Chrome 中，应用最多可使用 6% 的磁盘空间。在 Firefox 中，应用最多可使用 10% 的可用磁盘空间，但在存储 50MB 数据后将提示用户进行更多存储请求。
在 Mobile Safari 中，应用最多可使用 50MB 存储空间，而 Safari 桌面版不限制存储空间的使用（并在达到 5MB 后进行提示）。IE10+ 最多可存储 250MB，并在存储 10MB 后提示用户。
PouchDB [跟踪](https://pouchdb.com/faq.html#data_limits) IDB 存储行为。


## 如何了解我的应用目前使用了多少存储空间？

在 Chrome 中，您可以使用 [Quota Management API](https://www.w3.org/TR/quota-api/) 查询目前使用的存储空间大小，以及应用可使用多少空间。更新的 [Storage Quota Estimate API](https://www.chromestatus.com/features/5630353511284736) 尝试通过支持 Promise，让用户更容易了解源目前使用了多少配额。




## 缓存逐出是如何工作的？

<table>
  <thead>
    <th>浏览器</th>
    <th>逐出政策</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>在 Chrome 耗尽空间后采用 LRU 策略</td>
    </tr>
    <tr>
      <td>Firebox</td>
      <td>在整个磁盘已装满时采用 LRU 策略</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>无逐出</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>无逐出</td>
    </tr>
  <tbody>
</table>

根据源的需求为源提供空间量。此可用空间在所有形式的源存储（IndexedDB、Cache API、localStorage 等）中共享。提供的空间量未指定，具体容量因设备和存储条件而异。


如果网络存储容量低，则 UA 将清除存储以提供可用的空间。这会损害离线响应能力，因此，最近更新的[存储](https://storage.spec.whatwg.org/)规范定义了“持久化”和“尽力而为”策略，默认策略是“尽力而为”。“尽力而为”指的是在不干扰用户的情况下可以清除存储，但对于长期和/或关键数据而言持久性较差。IndexedDB 和 Cache API 目前都属于“尽力而为”类别。

“持久化”存储在存储容量低时不会自动清除。用户需要手动清除此存储（通过浏览器设置）。
Chrome 一直在来源试用版中试验对[持久化存储](/web/updates/2016/06/persistent-storage)的支持，最新消息表明将在 [Chrome 55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ) 中发布对持久化存储的支持。






## 当前和未来的离线存储运行

如果您对离线存储感兴趣，则要注意下面取得的成就。


* [Durable Storage](https://storage.spec.whatwg.org/)：防止存储受 User Agent 的清除政策影响。


* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/)：高级键/值数据管理。


* [Promisified IndexedDB](https://github.com/inexorabletash/indexeddb-promises)：为支持 Promise 的 IndexedDB 版本提供原生支持。



* [IndexedDB Observers](https://github.com/WICG/indexed-db-observers)：原生 IndexedDB observation，无需与数据库有关的包装器。


* [Async Cookies API](https://github.com/bsittler/async-cookies-api)：适用于文档和工作线程的异步 JavaScript cookie API。


* [Quota Management API](https://www.w3.org/TR/quota-api/)：检查应用/源目前使用了多少配额。


* [writable-files](https://github.com/WICG/writable-files)：允许网站更无缝地与本地文件进行交互。


* [Directory downloads](https://github.com/drufball/directory-download)：允许网站下载不带 .zip 文件的目录。


* [File and Directory Entries API](https://wicg.github.io/entries-api/)：支持通过拖放上传文件和目录。


* 目前正在拟定对 [Async Cookies API](https://github.com/WICG/async-cookies-api) 的支持以及在作品中使用 polyfill。



* 调试 IndexedDB 目前在 Edge 中不受支持（不过，它可以调试底层 JetDB） —[在此处](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)针对内置支持进行投票。




* 尽管过去我们讨论了有关异步 LocalStorage 的[想法](https://github.com/slightlyoff/async-local-storage)，但目前的重点是使 [IndexedDB 2.0](https://w3c.github.io/IndexedDB/) 进展顺利。



* [writable-files](https://github.com/WICG/writable-files) 提议可能最终为我们提供一个更好的标准跟踪解决方案，从而实现无缝的本地文件交互。



* 对于需要更多持久化存储的应用，请了解正在进行中的[持久化存储](https://storage.spec.whatwg.org/)。


离线存储并没有多神奇，了解底层 API 对您大有帮助，让您可充分利用我们现在提供的 API。无论您是否愿意直接使用这些 API 还是使用一个抽象库，都需要花些时间熟悉您的选项。




希望本指南将帮助您设计一个离线体验，让您的 PWA 大放光彩！✨


### 背景阅读

* [Offline Storage API 的状态](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)（作者：Joshua Bell）



* [浏览器数据库比较](http://nolanlawson.github.io/database-comparison/)（作者：Nolan Lawson）


* [IndexedDB、WebSQL、LocalStorage —什么阻止了 DOM？](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)


* [如何探讨数据库（Pokedex 研究）](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)


* [网络工作线程和服务工作线程中支持哪些 API？](https://nolanlawson.github.io/html5workertest/)


###实用资源

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)（针对动态/运行时请求的离线缓存）


* [sw-precache](https://github.com/GoogleChrome/sw-precache)（针对静态资产/Application Shell 的离线预缓存


* Webpack 用户可以直接使用上面的资源或 [offline-plugin](https://github.com/NekR/offline-plugin)


### 值得关注的 IndexedDB 库

* [localForage](https://github.com/localForage/localForage)（~8KB、Promise、旧版浏览器可以提供良好支持）


* [Dexie](http://dexie.org/)（~16KB、Promises、复杂查询、次要索引）


* [PouchDB](https://pouchdb.com/)（~45KB （支持[自定义版本](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)）、同步）



* [Lovefield](https://github.com/google/lovefield)（关系型）

* [LokiJS](http://lokijs.org/#/)（内存）

* [ydn-db](https://github.com/yathit/ydn-db)（与 dexie 类似、使用 WebSQL）

**在此我要感谢 Nolan Lawson、Joshua Bell （这篇文章的主要灵感来自于他在 Open Web Storage 方面的工作和 [BlinkOn 演讲](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit)）、Jake Archibald、Dru Knox 以及之前致力于网络存储空间的其他人。**





{# wf_devsite_translation #}
