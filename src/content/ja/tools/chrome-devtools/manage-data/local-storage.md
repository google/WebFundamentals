project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: ストレージ、データベース、およびキャッシュを [Application] パネルから調査および管理します。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# ストレージ、データベース、およびキャッシュの調査と管理 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
ストレージ、データベース、およびキャッシュを [<strong>Application</strong>] パネルから調査および管理します。



### TL;DR {: .hide-from-toc }
- ローカル ストレージとセッション ストレージを表示および編集します。
- IndexedDB データベースを調査および変更します。
- ウェブ SQL データベースに対して文を実行します。
- アプリケーションと Service Worker のキャッシュを表示します。
- すべてのストレージ、データベース、キャッシュ、および Service Worker を、1 回のボタンクリックで消去します。


##  ローカル ストレージ{:#local-storage}

キー値ペア（KVP）の格納に[ローカル ストレージ][ls]を使用している場合は、これらの KVP を [**Local Storage**] ペインから調査、変更、および削除できます。


![[Local Storage] ペイン][ls-pane]

* 値を編集するには、キーまたは値をダブルクリックします。
* 新しい KVP を追加するには、空のセルをダブルクリックします。
* KVP を削除するには、その KVP をクリックしてから**削除**ボタン（![削除ボタン][delete]{:.inline}）をクリックします。
1 回のボタンクリックで、[[**Clear storage**] ペイン](#clear-storage)からすべてのローカル ストレージ データを消去できます。
* ページで KVP の作成、削除、または変更操作をしている場合、それらの変更がリアルタイムでアップデートされることはありません。
変更を表示するには、**更新**ボタン（![更新ボタン][refresh]{:.inline}）をクリックします。


[ls]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[ls-pane]: /web/tools/chrome-devtools/manage-data/imgs/local-storage.png
[refresh]: /web/tools/chrome-devtools/manage-data/imgs/refresh.png
[delete]: /web/tools/chrome-devtools/manage-data/imgs/delete.png

##  セッション ストレージ{:#session-storage}

[**Session Storage**] ペインの機能は [**Local Storage**] ペインと同じです。
[セッション ストレージ][ss]を表示および編集する方法については、前述の[ローカル ストレージ](#local-storage)セクションを参照してください。


[ss]: https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage

##  IndexedDB{:#indexeddb}

[**IndexedDB**] ペインは、IndexedDB データを調査、変更、および削除するために使用します。

[**IndexedDB**] ペインを展開してその下に表示される最初のレベルはデータベースです。
複数のデータベースがアクティブの場合は、複数のエントリが表示されます。
次のスクリーンショットでは、ページに対してアクティブになっているのは 1 つのデータベースのみです。

![[IndexedDB] タブ][idb-tab]

データベースの名前をクリックすると、そのデータベースのセキュリティ オリジン、名前、およびバージョンが表示されます。


![IndexedDB データベース][idb-db]

データベースを展開すると、そのキー値ペア（KVP）が表示されます。

![IndexedDB のキー値ペア][idb-kvps]

KVP のページ間を移動するには、[**Start from key**] テキスト項目の横にある矢印ボタンを使用します。


値を編集するには、その値を展開してダブルクリックします。値を追加、変更、または削除する場合、それらの変更がリアルタイムでアップデートされるわけではありません。**更新**ボタンをクリックしてデータベースをアップデートします。
![IndexedDB の KVP の編集][idb-edit]

[**Start from key**] テキスト項目にキーを入力し、そのキーよりも小さい値を持つすべてのキーを除外します。


![除外された KVP][idb-filter]

値を追加、変更、または削除しても、これらの変更がリアルタイムでアップデートされるわけではありません。
**更新**ボタン（![更新ボタン][refresh]{:.inline}）をクリックしてデータベースをアップデートします。


データベースからすべてのデータを削除するには、**オブジェクト ストアの消去**ボタン（![オブジェクト ストアの消去][cos]{:.inline}）をクリックします。
これは、Service Worker の登録を解除して [[**Clear storage**] ペイン](#clear-storage)から 1 回のクリックで他のストレージとキャッシュを削除しても実現できます。



[idb-tab]: /web/tools/chrome-devtools/manage-data/imgs/idb-tab.png
[idb-db]: /web/tools/chrome-devtools/manage-data/imgs/idb-db.png
[idb-kvps]: /web/tools/chrome-devtools/manage-data/imgs/idb-kvps.png
[idb-edit]: /web/tools/chrome-devtools/manage-data/imgs/idb-edit.png
[idb-filter]: /web/tools/chrome-devtools/manage-data/imgs/idb-filter.png
[cos]: /web/tools/chrome-devtools/manage-data/imgs/clear-object-store.png

##  ウェブ SQL{:#web-sql}

[**Web SQL**] ペインは、ウェブ SQL データベースをクエリおよび変更するために使用します。

データベース名をクリックすると、そのデータベースのコンソールが開きます。ここでデータベースに対して文を実行できます。


![ウェブ SQL コンソール][wsc]

データベース テーブルをクリックすると、そのテーブルのデータが表示されます。

![ウェブ SQL テーブル][wst]

* ここでは値を更新できませんが、データベース コンソールからアップデートできます（上記を参照）。
* 列の見出しをクリックすると、テーブルがその列で並べ替えられます。
* テーブルに加えた変更がリアルタイムでアップデートされるわけではありません。**更新**ボタン（![更新ボタン][refresh]{:.inline}）をクリックするとアップデートが表示されます。
* [**Visibile columns**] テキスト項目にスペースまたはコンマ区切りの列名のリストを入力すると、その列のみが表示されます。


[wsc]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-console.png
[wst]: /web/tools/chrome-devtools/manage-data/imgs/web-sql-table.png

##  アプリケーション キャッシュ{:#application-cache}

[**Application Cache**] ペインは、[Application Cache API][appcache-api] を使用して作成されたリソースやルールを調査するために使用します。


![[Application Cache] ペイン][appcache]

各行はリソースを表しています。

[**Type**] 列の値は次のいずれかになります。

* **Master**。リソースの `manifest` 属性で、このキャッシュがそのリソースのマスターであることが示されています。
* **Explicit**。このリソースはマニフェストに明示的にリストされています。
* **Network**。マニフェストで、このリソースをネットワークから取得する必要があることが示されています。
* **Fallback**。[**Resource**] 列の URL が（DevTools では表示されない）別の URL の代わりとしてリストされています。


テーブルの一番下に、ネットワーク接続とアプリケーション キャッシュのステータスを示すステータス アイコンがあります。
アプリケーション キャッシュのステータスは次のいずれかです。


* **IDLE**。キャッシュに新しい変更はありません。
* **CHECKING**。マニフェストが取得され、アップデートがないか確認中です。
* **DOWNLOADING**。リソースがキャッシュに追加されています。
* **UPDATEREADY**。新しいバージョンのキャッシュが利用可能です。
* **OBSOLETE**。キャッシュが削除されています。

[appcache-api]: https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache
[appcache]: /web/tools/chrome-devtools/manage-data/imgs/appcache.png

##  Service Worker のキャッシュ{:#service-worker-caches}

[**Application**] パネルの [**Cache Storage**] ペインでは、（Service Worker）Cache API を使用して作成されたキャッシュを調査、変更、およびデバッグできます。
詳しくは、次のガイドをご覧ください。


{# include shared/related_guides.liquid inline=true list=page.related-guides.pwa #}

##  Service Worker、ストレージ、データベース、およびキャッシュの消去{:#clear-storage}

特定のオリジンのデータをすべて消去することが必要になる場合があります。[**Application**] パネルの [**Clear Storage**] ペインでは、Service Worker、ストレージ、およびキャッシュを選択的に登録解除できます。
データを消去するには、消去するコンポーネントの横にあるチェックボックスをオンにし、[**Clear site data**] をクリックします。
[**Clear storage**] ラベルの下に表示されているオリジンのデータがすべて消去されます。


![Clear storage][clear]

[clear]: /web/tools/chrome-devtools/manage-data/imgs/clear-storage.png


{# wf_devsite_translation #}
