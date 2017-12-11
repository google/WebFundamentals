project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:从 Application 面板检查和管理存储、数据库与缓存。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 检查和管理存储、数据库与缓存 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}从 <strong>Application</strong> 面板检查和管理存储、数据库与缓存。




### TL;DR {: .hide-from-toc }
- 查看和修改本地存储与会话存储。
- 检查和修改 IndexedDB 数据库。
- 对 Web SQL 数据库执行语句。
- 查看应用缓存和服务工作线程缓存。
- 点击一次按钮即可清除所有存储、数据库、缓存和服务工作线程。


## 本地存储 {:#local-storage}

如果您使用[本地存储][ls]存储键值对 (KVP)，则可以从 **Local Storage** 窗格中检查、修改和删除这些 KVP。


![Local Storage 窗格][ls-pane]

* 双击键或值可以修改相应的值。
* 双击空白单元格可以添加新 KVP。
* 点击 KVP ，然后按 **Delete** 按钮 (![Delete 按钮][delete]{:.inline}) 可以删除该 KVP。
只需点击一次按钮，即可从 [**Clear storage** 窗格](#clear-storage)擦除所有本地存储数据。


* 如果您使用一种可以创建、删除或修改 KVP 的方式与页面交互，则不会看到这些更改实时更新。
点击 **refresh** 按钮 (![refresh 按钮][refresh]{:.inline}) 可以查看您的更改。


[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Session storage {:#session-storage}

**Session Storage** 窗格与 **Local Storage** 窗格的工作方式相同。
参阅上面的[本地存储](#local-storage)部分，了解如何查看和编辑[会话存储][ss]。


[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {:#indexeddb}

使用 **IndexedDB** 窗格可以检查、修改和删除 IndexedDB 数据。

展开 **IndexedDB** 窗格时，IndexedDB 下的第一个级别是数据库。
如果存在多个活动的数据库，您会看到多个条目。
在下面的屏幕截图中，页面只有一个活动的数据库。

![indexeddb 标签][idb-tab]

点击数据库的名称可以查看该数据库的安全源、名称和版本。


![indexeddb 数据库][idb-db]

展开数据库可以查看其键值对 (KVP)。

![indexeddb 键值对][idb-kvps]

使用 **Start from key** 文本字段旁的箭头按钮可以在 KVP 的页面之间移动。


展开值并双击可以编辑该值。在您添加、修改或删除值时，这些更改不会实时更新。

点击 **refresh** 按钮可以更新数据库。
![编辑 indexeddb kvp][idb-edit]

在 **Start from key** 文本字段中输入键可以过滤出值小于该值的所有键。


![过滤的 kvp][idb-filter]

在您添加、修改或删除值时，这些更改不会实时更新。
点击 **refresh** 按钮 (![refresh 按钮][refresh]{:.inline}) 可以更新数据库。


点击 **Clear Object Store** 按钮 (![Clear Object Store][cos]{:.inline}) 可以删除数据库中的所有数据。
从 [**Clear storage** 窗格](#clear-storage)中，点击一次按钮注销服务工作线程并移除其他存储与缓存也可以实现此目标。



[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {:#web-sql}

使用 **Web SQL** 窗格可以查询和修改 Web SQL 数据库。

点击数据库名称可以打开该数据库的控制台。从这里，您可以对数据库执行语句。


![web sql 控制台][wsc]

点击数据库表可以查看该表的数据。

![web sql 表][wst]

* 您无法从这里更新值，但是可以通过数据库控制台（参见上文）更新。

* 点击列标题可以按该列排序表格。
* 您对表格的更改不会实时更新。点击 **refresh** 按钮 (![refresh 按钮][refresh]{:.inline}) 可以查看更新。


* 在 **Visibile columns** 文本字段中输入一个由空格分隔或逗号分隔的列名称列表可以仅显示列表中包含的列。


[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## 应用缓存 {:#application-cache}

使用 **Application Cache** 窗格可以检查通过 [Application Cache API][appcache-api] 创建的资源和规则。


![Application Cache 窗格][appcache]

每一行表示一个资源。

**Type** 列的值为以下值之一：

* **Master**。资源上指示此缓存为其主文件的 `manifest` 属性。

* **Explicit**。此资源在清单中明确列出。
* **Network**。指定此资源的清单必须来自网络。

* **Fallback**。**Resource** 列中的网址作为另一个网址（未在 DevTools 中显示）的回退网址形式列出。


表格底部拥有指示网络连接和应用缓存状态的状态图标。
应用缓存可能拥有以下状态：


* **IDLE**。缓存没有新更改。
* **CHECKING**。正在提取清单并检查有无更新。
* **DOWNLOADING**。正在将资源添加到缓存中。
* **UPDATEREADY**。存在新版本的缓存。
* **OBSOLETE**。正在删除缓存。

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## 服务工作线程缓存 {:#service-worker-caches}

利用 **Application** 面板上的 **Cache Storage** 窗格，您可以检查、修改和调试使用（服务工作线程）Cache API 创建的缓存。
参阅下面的指南获取更多帮助。


{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## 清除服务工作线程、存储、数据库和缓存 {:#clear-storage}

有时，您只需要擦除给定源的所有数据。利用 **Application** 面板上的 **Clear Storage** 窗格，您可以选择性地注销服务工作线程、存储和缓存。要清除数据，只需启用您想要擦除的组件旁的复选框，然后点击 **Clear site data**。操作将擦除 **Clear storage** 标签下所列源的所有数据。


![clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
