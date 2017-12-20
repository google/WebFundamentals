project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:從 Application 面板檢查和管理存儲、數據庫與緩存。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# 檢查和管理存儲、數據庫與緩存 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}從 <strong>Application</strong> 面板檢查和管理存儲、數據庫與緩存。




### TL;DR {: .hide-from-toc }
- 查看和修改本地存儲與會話存儲。
- 檢查和修改 IndexedDB 數據庫。
- 對 Web SQL 數據庫執行語句。
- 查看應用緩存和服務工作線程緩存。
- 點擊一次按鈕即可清除所有存儲、數據庫、緩存和服務工作線程。


## 本地存儲 {: #local-storage}

如果您使用[本地存儲][ls]存儲鍵值對 (KVP)，則可以從 **Local Storage** 窗格中檢查、修改和刪除這些 KVP。


![Local Storage 窗格][ls-pane]

* 雙擊鍵或值可以修改相應的值。
* 雙擊空白單元格可以添加新 KVP。
* 點擊 KVP ，然後按 **Delete** 按鈕 (![Delete 按鈕][delete]{:.inline}) 可以刪除該 KVP。
只需點擊一次按鈕，即可從 [**Clear storage** 窗格](#clear-storage)擦除所有本地存儲數據。


* 如果您使用一種可以創建、刪除或修改 KVP 的方式與頁面交互，則不會看到這些更改實時更新。
點擊 **refresh** 按鈕 (![refresh 按鈕][refresh]{:.inline}) 可以查看您的更改。


[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

## Session storage {: #session-storage}

**Session Storage** 窗格與 **Local Storage** 窗格的工作方式相同。
參閱上面的[本地存儲](#local-storage)部分，瞭解如何查看和編輯[會話存儲][ss]。


[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

## IndexedDB {: #indexeddb}

使用 **IndexedDB** 窗格可以檢查、修改和刪除 IndexedDB 數據。

展開 **IndexedDB** 窗格時，IndexedDB 下的第一個級別是數據庫。
如果存在多個活動的數據庫，您會看到多個條目。
在下面的屏幕截圖中，頁面只有一個活動的數據庫。

![indexeddb 標籤][idb-tab]

點擊數據庫的名稱可以查看該數據庫的安全源、名稱和版本。


![indexeddb 數據庫][idb-db]

展開數據庫可以查看其鍵值對 (KVP)。

![indexeddb 鍵值對][idb-kvps]

使用 **Start from key** 文本字段旁的箭頭按鈕可以在 KVP 的頁面之間移動。


展開值並雙擊可以編輯該值。在您添加、修改或刪除值時，這些更改不會實時更新。

點擊 **refresh** 按鈕可以更新數據庫。
![編輯 indexeddb kvp][idb-edit]

在 **Start from key** 文本字段中輸入鍵可以過濾出值小於該值的所有鍵。


![過濾的 kvp][idb-filter]

在您添加、修改或刪除值時，這些更改不會實時更新。
點擊 **refresh** 按鈕 (![refresh 按鈕][refresh]{:.inline}) 可以更新數據庫。


點擊 **Clear Object Store** 按鈕 (![Clear Object Store][cos]{:.inline}) 可以刪除數據庫中的所有數據。
從 [**Clear storage** 窗格](#clear-storage)中，點擊一次按鈕註銷服務工作線程並移除其他存儲與緩存也可以實現此目標。



[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

## Web SQL {: #web-sql}

使用 **Web SQL** 窗格可以查詢和修改 Web SQL 數據庫。

點擊數據庫名稱可以打開該數據庫的控制檯。從這裏，您可以對數據庫執行語句。


![web sql 控制檯][wsc]

點擊數據庫表可以查看該表的數據。

![web sql 表][wst]

* 您無法從這裏更新值，但是可以通過數據庫控制檯（參見上文）更新。

* 點擊列標題可以按該列排序表格。
* 您對錶格的更改不會實時更新。點擊 **refresh** 按鈕 (![refresh 按鈕][refresh]{:.inline}) 可以查看更新。


* 在 **Visibile columns** 文本字段中輸入一個由空格分隔或逗號分隔的列名稱列表可以僅顯示列表中包含的列。


[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

## 應用緩存 {: #application-cache}

使用 **Application Cache** 窗格可以檢查通過 [Application Cache API][appcache-api] 創建的資源和規則。


![Application Cache 窗格][appcache]

每一行表示一個資源。

**Type** 列的值爲以下值之一：

* **Master**。資源上指示此緩存爲其主文件的 `manifest` 屬性。

* **Explicit**。此資源在清單中明確列出。
* **Network**。指定此資源的清單必須來自網絡。

* **Fallback**。**Resource** 列中的網址作爲另一個網址（未在 DevTools 中顯示）的回退網址形式列出。


表格底部擁有指示網絡連接和應用緩存狀態的狀態圖標。
應用緩存可能擁有以下狀態：


* **IDLE**。緩存沒有新更改。
* **CHECKING**。正在提取清單並檢查有無更新。
* **DOWNLOADING**。正在將資源添加到緩存中。
* **UPDATEREADY**。存在新版本的緩存。
* **OBSOLETE**。正在刪除緩存。

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

## 服務工作線程緩存 {:#service-worker-caches}

利用 **Application** 面板上的 **Cache Storage** 窗格，您可以檢查、修改和調試使用（服務工作線程）Cache API 創建的緩存。
參閱下面的指南獲取更多幫助。


{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

## 清除服務工作線程、存儲、數據庫和緩存 {:#clear-storage}

有時，您只需要擦除給定源的所有數據。利用 **Application** 面板上的 **Clear Storage** 窗格，您可以選擇性地註銷服務工作線程、存儲和緩存。要清除數據，只需啓用您想要擦除的組件旁的複選框，然後點擊 **Clear site data**。操作將擦除 **Clear storage** 標籤下所列源的所有數據。


![clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
