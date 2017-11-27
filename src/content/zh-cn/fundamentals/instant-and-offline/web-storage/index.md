project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-09-28 #}
{# wf_published_on:2016-09-28 #}

# 网页存储概览 {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

选择正确的存储机制对于本地设备存储和基于云的服务器存储都非常重要。
良好的存储引擎可确保以可靠的方式保存信息，并减少带宽和提升响应能力。正确的存储缓存策略是实现离线移动网页体验的核心构建基块。
 

本文为评估存储 API 和服务提供简要的基础，然后，我们将提供一个比较表格和一些通用的指南。近期，为方便您更深入地理解选择的存储主题，我们计划增加相关资源。


## 存储分类

首先，我们了解一下分析网络应用的数据存储时可以依据的一些标准。
稍后，我们将使用此框架枚举和评估为网页开发者提供的许多存储选项。


### 数据模型

用于存储数据单元的模型可确定在内部组织数据的方式，这会影响存储的易用性、成本和性能以及检索请求。

 

* **结构化：**在具有预定义字段的表格中存储数据，与典型的基于 SQL 的数据库管理系统一样，非常适用于灵活的动态查询，其中所有查询类型可能不是一个可知的先验。浏览器中的 IndexedDB 是结构化数据存储区的一个突出例子。


* **键/值：** 键/值数据存储区和相关的 NoSQL 数据库让您可以存储和检索按唯一键值索引的非结构化的数据。键/值数据存储区与哈希值表格相似，它们都允许在固定时间访问已编入索引的不透明数据。键/值数据存储区的突出例子包括浏览器中的 Cache API 以及服务器上的 Apache Cassandra。


* **字节流：** 这个简单模型以可变长度、不透明的字节字符串形式存储数据，将任意形式的内部组织置于应用层。此模型特别适合文件系统和其他按层次结构组织的数据块。
字节流数据存储区的突出例子包括文件系统和云端存储服务。


### 持久化

网络应用的存储方法，可根据使数据持久化的作用域进行分析。


* **会话持久化：**仅在一个网页会话或浏览器标签处于活动状态时保留此类别中的数据。
Session Storage API 是采用会话持久化的存储机制的一个例子。


* **设备持久化：** 在特定设备中跨会话和浏览器标签/窗口保留此类别中的数据。
Cache API 是采用设备持久化的存储机制的一个例子。


* **全局持久化：**跨会话和设备保留此类别中的数据。
因此，它是最可靠的数据持久化形式。Google 云端存储是采用全局持久化的存储机制的一个例子。


### 浏览器支持

开发者应选择一个最适合他们的问题域的 API；不过，开发者还应考虑到标准化和完全确立的 API 优于自定义或专有界面这一事实，因为这些 API 往往使用寿命更长并能够得到更广泛的支持。开发者还会享有更广泛的知识库和更丰富的开发者生态系统。


### 事务处理

通常，它对于是否能以原子方式成功收集相关存储操作非常重要。
数据库管理系统在传统上使用事务处理模型支持此功能，其中可能会将相关更新组合到任意单元。尽管不是始终需要，但在某些问题域，它是一个便捷的功能，并且有时候非常重要。


### 同步/异步

由于存储或检索请求会阻止当前活动的线程直到请求已完成，因此，某些存储 API 是同步的。
这在网页浏览器中是特别沉重的负担，其中存储请求会与 UI 共享主线程。出于效率和性能的考虑，将异步存储 API 作为首选。


## 比较

在此部分中，我们看一下网页开发者当前可用的 API，并根据上述标准比较它们的异同。


<table>
  <thead>
    <th>API</th>
    <th>数据模型</th>
    <th>持久化</th>
    <th>浏览器支持</th>
    <th>事务处理</th>
    <th>同步/异步</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>字节流</td>
      <td>设备</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>不支持</td>
      <td>异步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>键/值</td>
      <td>设备</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>键/值</td>
      <td>会话</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookie</a></td>
      <td>结构化</td>
      <td>设备</td>
      <td>100%</td>
      <td>不支持</td>
      <td>同步</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>结构化</td>
      <td>设备</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>支持</td>
      <td>异步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>键/值</td>
      <td>设备</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>不支持</td>
      <td>异步</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>混合</td>
      <td>设备</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>支持</td>
      <td>异步</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">cloud storage</a></td>
      <td>字节流</td>
      <td>全局</td>
      <td>100%</td>
      <td>不支持</td>
      <td>两者皆有</td>
    </tr>
  <tbody>
</table>

如上所述，最好选择在尽可能多的浏览器上受广泛支持的 API，其可提供异步调用模型，以最大程度提高与 UI 的互操作性。这些条件自然会产生以下技术选择：


* 对于设备本地键/值存储：使用 Cache API。

* 对于设备本地结构化存储：使用 IndexedDB。

* 对于全局字节流存储：使用云端存储服务。

这种组合可满足许多移动网络应用的基本存储需求。我们即将发表的一篇文章，在该文章中详细介绍了如何处理常见存储模式，并随附代码示例，敬请期待！



## 调试 Chrome DevTools 中的存储{: #devtools }

请查看以下文档，了解有关使用 Chrome DevTools 检查和调试您选择的网络存储 API 的更多信息。
此处未提及 DevTools 中不支持或不适用的 API。


* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

如果您目前使用多个存储 API，请查看 DevTools 的 Clear Storage 功能。
此功能允许您通过点击一个按钮清除多个存储。
如需了解详细信息，请参阅[清除服务工作线程、存储、数据库和缓存](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage)。



## 后续计划…

现在，我们已介绍了一些考虑存储机制的相关方法，并比较了目前可用的最常见的 API 和服务的异同，不久，我们将添加更多内容以深入探讨一个或多个关注的主题：




* [针对 Progressive Web App 的离线存储建议](offline-for-pwa)

* 常用存储模式（即将推出）

* 建议的后端存储方法（即将推出）

* 深度教程：IndexedDB（即将推出）

* 深度教程：Cache API（即将推出）

* 对常见存储框架进行分析（即将推出）


{# wf_devsite_translation #}
