project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Chrome DevTools の [Network] パネルを使って、ウェブ アプリケーションのネットワーク パフォーマンスを測定します。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# リソース読み込み時間の測定 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}


Warning: このページは推奨されていません。 各セクションの上部には、同じ情報が載っている最新ページへのリンクがあります。


サイトのネットワーク パフォーマンスを測定するには、<strong>[Network]</strong> パネルを使用します。



**[Network]** パネルでは、タイミングの詳細データ、HTTP リクエストとレスポンスのヘッダー、Cookie など、ページでの各ネットワーク操作についての情報が記録されます。




### TL;DR {: .hide-from-toc }
- [Network] パネルを使って、ネットワーク アクティビティを記録、分析します。
- リソースの読み込み情報を集約した状態で、またはリソースごとに個別に表示します。
- フィルタをかけ、並べ替えてリソースの表示方法を変えます。
- ネットワークの記録を保存、コピー、クリアします。
- ニーズに合わせて [Network] パネルをカスタマイズします。

## [Network] パネルの概要

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、以下のセクションをご覧ください。

  <ul>
    <li><a href="reference#controls">[Controls] ペイン</a></li>
    <li><a href="reference#filters">[Filters] ペイン</a></li>
    <li><a href="reference#overview">[Overview] ペイン</a></li>
    <li><a href="reference#requests">[Requests] ペイン</a></li>
    <li><a href="reference#summary">[Summary] ペイン</a></li>
  </ul>
</aside>

[Network] パネルは以下の 5 つのペインで構成されます。

1. **Controls**。 これらのオプションを使って、**[Network]** パネルの外観と機能を管理します。
2. **Filters**。 これらのオプションを使って、**[Requests Table]** にどのリソースを表示するか管理します。
 使い方: 複数のフィルタを同時に選択するには、<kbd>Cmd</kbd>（Mac）または <kbd>Ctrl</kbd>
   （Window/Linux）を押しながらフィルタをクリックします。
3. **Overview**。 このグラフは、リソースが取得された時点のタイムラインを示します。
   複数のバーが縦に積み重なっている場合、それらのリソースが同時に取得されたことを表します。
4. **Requests Table**。 この表には、取得されたリソースがすべて一覧されます。
   デフォルトでは、この表は時系列に並べ替えられ、先頭が最初に取得されたリソースになります。
   リソースの名前をクリックすると、詳細情報が表示されます。
   使い方: 表の見出しのいずれか（**[Timeline]** 以外）を右クリックすると、情報の列を追加または削除できます。
5. **Summary**。 このペインでは、リクエストの総数、データ転送量、読み込み時間がひと目でわかります。


![[network] パネルのペイン](imgs/panes.png)

**[Requests Table]** には、以下の列がデフォルトで表示されます。 [列の追加と削除](#add-and-remove-table-columns)が可能です。


* **Name**。 リソースの名前。
* **Status**。 HTTP ステータス コード。
* **Type**。 リクエストされたリソースの MIME タイプ。
* **Initiator**。 リクエストを開始したオブジェクトまたはプロセス。 以下の値のいずれかになります。
  * **Parser**。 リクエストを開始したのは Chrome の HTML パーサー。
  * **Redirect**。 リクエストを開始した HTTP リダイレクト。
  * **Script**。 リクエストを開始したのはスクリプト。
  * **Other**。 リクエストを開始したのは上記以外のプロセスまたは操作。ユーザーがリンクを使ってページを移動した場合や、アドレスバーに URL を入力した場合などです。
* **Size**。 サーバーから配信されたときのレスポンス ヘッダーとレスポンス本文の合計サイズ（通常は、数百バイト）。
* **Time**。 リクエスト開始からレスポンスの最終バイトを受け取るまでにかかった合計時間。
* **Timeline**。 [Timeline] 列には、すべてのネットワーク リクエストの流れが目に見える形で表示されます。
 この列見出しをクリックすると、追加の並べ替えフィールドのメニューが表示されます。


## ネットワーク アクティビティの記録

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#record">記録の開始または終了</a>

  をご覧ください。
</aside>

**[Network]** パネルが開くと、デフォルトでは、DevTools によってすべてのネットワーク アクティビティが記録されます。
 記録するには、パネルが開いているときにページを再読み込みするか、現在読み込んでいるページでネットワーク アクティビティを待機します。


**記録** ボタンを見れば、DevTools によって記録が行われているかどうかを判断できます。
 ボタンが赤の場合（![記録ボタン オン](imgs/record-on.png)
{:.inline}）、DevTools は記録中です。
ボタンが灰色の場合（![記録ボタン オフ](imgs/record-off.png){:.inline}）、DevTools は記録を行っていません。
 記録を開始または終了するには、このボタンをクリックするか、キーボード ショートカット <kbd>Cmd/Ctrl</kbd>+<kbd>e</kbd> を押します。


## 記録中のスクリーンショットの取得 {:#filmstrip}

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#screenshots">記録中のスクリーンショットの取得</a>

  をご覧ください。
</aside>

**[Network]** パネルでは、ページ読み込み中にスクリーンショットを取得できます。 この機能を **Filmstrip** と呼びます。


Filmstrip を有効にするには、**カメラ**アイコンをクリックします。 アイコンが灰色の場合、Filmstrip は無効になっています（![Filmstrip
無効](imgs/filmstrip-disabled.png)
{:.inline}）。 アイコンが青の場合、Filmstrip は有効になっています（![Filmstrip 有効](imgs/filmstrip-enabled.png){:.inline}）。

スクリーンショットを取得するには、ページを再読み込みします。 スクリーンショットは **Overview** ペインに表示されます。


![Filmstrip を使用した記録](imgs/filmstrip.png)

スクリーンショットにカーソルを合わせると、フレームが取得された時点を示す黄色の縦線が **[Timeline]** に表示されます。


![[Timeline] 上の Filmstrip のオーバーレイ](imgs/filmstrip-timeline-overlay.png)

スクリーンショットをダブルクリックすると、スクリーンショットが拡大表示されます。 スクリーンショットの拡大表示中は、キーボードの左矢印キーと右矢印キーを使用してスクリーンショット間を移動します。



![Filmstrip の拡大されたスクリーンショット](imgs/filmstrip-zoom.png)

## DOMContentLoaded イベントと load イベントの情報の表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#load">load イベントの表示</a>

  をご覧ください。
</aside>

**[Network]** パネルには 2 つのイベントがハイライト表示されます。
[`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) および[`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load)です。


`DOMContentLoaded` は、ページの最初のマークアップが解析されたときに発生します。
 このイベントは、**[Network]** パネルの以下の 2 か所に表示されます。

1. **[Overview]** ペインの青い縦線がこのイベントを表します。
2. **[Summary]** ペインにこのイベントの正確な時間が表示されます。

![[Network] パネルの DOMContentLoaded イベント](imgs/domcontentloaded.png)

`load` は、ページが完全に読み込まれたときに発生します。 このイベントは、以下の 3 か所に表示されます。

1. **[Overview]** ペインの赤い縦線がこのイベントを表します。
2. **[Requests Table]** の赤い縦線もこのイベントを表します。
3. **[Summary]** ペインにこのイベントの正確な時間が表示されます。

![[Network] パネルの load イベント](imgs/load.png)

## 1 つのリソースの詳細を表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#details">詳細を表示</a>

  をご覧ください。
</aside>

リソース名（**[Requests Table]** の **[Name]** 列にある）をクリックすると、そのリソースに関する詳細情報が表示されます。


利用できるタブは、選択したリソースの種類によって異なりますが、最も一般的なタブは以下の 4 つです。


* **Headers**。 リソースに関連付けられた HTTP ヘッダー。
* **Preview**。 JSON、イメージ、テキストの各リソースのプレビュー。
* **Response**。 HTTP レスポンス データ（存在する場合）。
* **Timing**。 リソースのリクエスト ライフサイクルの詳細。


![1 つのリソースの詳細表示](imgs/network-headers.png)

### ネットワークのタイミングの表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#timing">[Timing] タブ</a>

  をご覧ください。
</aside>

**[Timing]** タブをクリックすると、1 つのリソースのリクエスト ライフサイクルが詳しく表示されます。


ライフサイクルは、以下のカテゴリにかかった時間を示します。

<!-- the screenshot above and list below are redundant, but we include
     the text for SEO -->

* キューイング
* ストール
* （該当する場合）:DNS 参照、初期接続、SSL ハンドシェイク
* リクエスト送信
* 待機（最初のバイトを受け取るまでの時間（TTFB））
* コンテンツのダウンロード

![[Timing] タブ](imgs/timing-tab.png)

**[Timeline]** グラフ内のリソースにマウスカーソルを合わせても、同じ情報が表示されます。


![タイムライン内の 1 つのリソースのタイミング データ](imgs/timeline-view-hover.png)

{# include shared/related_guides.liquid inline=true list=page.related-guides.timing #}

関連ガイド:

* [リソース タイミングについて](understanding-resource-timing)

### HTTP ヘッダーの表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#headers">[Headers] タブ</a>

  をご覧ください。
</aside>

**[Headers]** をクリックすると、そのリソースのヘッダーが表示されます。

**[Headers]** タブには、リソースのリクエスト URL、HTTP メソッド、レスポンスのステータス コードが表示されます。
 また、HTTP レスポンスとリクエスト ヘッダーとその値、クエリ文字列パラメータも一覧表示されます。


![1 つのリソースの HTTP ヘッダー](imgs/network-headers.png)

各セクションの横にある `view source` または `view parsed` リンクをクリックすると、レスポンス ヘッダー、リクエスト ヘッダー、またはクエリ文字列パラメータをソース形式か解析後の形式で表示できます。



![ヘッダーのソースの表示](imgs/view-header-source.png)

また、クエリ文字列パラメータ セクションの隣にある `view URL encoded` または `view decoded` リンクをクリックすると、文字列パラメータを URL にエンコードまたはデコードされた形式で表示できます。


![URL エンコードの表示](imgs/view-url-encoded.png)

### リソースのプレビュー

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#preview">[Preview] タブ</a>

  をご覧ください。
</aside>

**[Preview]** タブをクリックすると、そのリソースのプレビューが表示されます。 **[Preview]** タブは、選択したリソースの種類によって、有益な情報を表示する場合もあれば、そうでない場合もあります。



![イメージリソースのプレビュー](imgs/preview-png.png)

### HTTP レスポンス コンテンツの表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#response">[Response] タブ</a>

  をご覧ください。
</aside>

**[Response]** タブをクリックすると、リソースの HTTP レスポンスのコンテンツが書式設定なしで表示されます。
 **[Response]** タブは、選択したリソースの種類によって、有益な情報を表示する場合もあれば、そうでない場合もあります。


![JSON リソースのレスポンス データ](imgs/response-json.png)

### Cookie の表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#cookies">[Cookies] タブ</a>

  をご覧ください。
</aside>

**[Cookies]** タブをクリックすると、リソースの HTTP リクエストとレスポンスのヘッダーで送信される Cookie の表が表示されます。
 このタブは、Cookie が送信される場合のみ利用できます。


以下に、表内の各列について説明します。

* **Name**。 Cookie の名前。
* **Value**。 Cookie の値。
* **Domain**。 Cookie が所属するドメイン。
* **Path**。 Cookie の送信元 URL パス。
* **Expires / Max-Age**。 Cookie の expires プロパティまたは max-age プロパティの値。
* **Size**。 Cookie のサイズ（バイト単位）。
* **HTTP**。 Cookie はブラウザが HTTP リクエストで設定し、JavaScript からはアクセスできないことを示します。
* **Secure**。 この属性が存在する場合、セキュリティ保護された接続経由で Cookie を送信する必要があることを示します。


![リソースの Cookie](imgs/cookies.png)

### WebSocket フレームの表示

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#frames">[Frames] タブ</a>

  をご覧ください。
</aside>

**[Frames]** タブをクリックすると、[`WebSocket`](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) 接続情報が表示されます。
 このタブは、選択したリソースが `WebSocket` 接続を開始した場合にのみ表示されます。


![WebSocket の [Frames] タブ](imgs/websocket-frames.png)

**[Frames]** タブの表に含まれる各列について説明します。


* **Data**。 メッセージ ペイロード。 メッセージが書式なしテキストの場合、ここに表示されます。
 バイナリ オペコードの場合、このフィールドにはオペコードの名前とコードが表示されます。
 サポートされるオペコードは以下のとおりです。
  * 継続フレーム
  * バイナリ フレーム
  * 接続クローズ フレーム
  * ping フレーム
  * pong フレーム
* **Length**。 メッセージ ペイロードの長さ（バイト単位）。
* **Time**。 メッセージが作成された時点のタイムスタンプ。

以下のように、メッセージは種類に応じて色分けされます。

* 発信テキスト メッセージは薄い緑。
* 着信テキスト メッセージは白。
* WebSocket オペコードは薄い黄色。
* エラーは薄い赤。

**現在の実装についての注意事項:**

* 新しいメッセージの到着後に **[Frames]** 表を更新するには、左側のリソース名をクリックします。
* **[Frames]** 表に保持されるのは、最新の 100 件の `WebSocket` メッセージだけです。

## リソースの開始元と依存関係の表示 {:#initiators-dependencies}

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#initiators-dependencies">開始元と依存関係の表示</a> をご覧ください。


</aside>

<kbd>Shift</kbd> キーを押しながらリソースにカーソルを合わせると、そのリソースの開始元と依存関係が表示されます。
 このセクションでは、**ターゲット** としてカーソルを合わせているリソースについて説明します。


ターゲットの上にあり、緑に色付けされ最初のリソースがターゲットの開始元です。
 ターゲットの上に、緑に色付けされた 2 つ目のリソースがある場合、ターゲットの開始元の開始元です。
 ターゲットの下にあり、赤に色付けされたリソースはすべてターゲットに依存します。


以下のスクリーンショットではこのターゲットが `dn/` です。 ターゲットの開始元は、`rs=AA2Y` で始まるスクリプトです。
 その開始元（`rs=AA2Y`）の開始元が `google.com` です。
 最後に、`dn.js` はターゲット（`dn/`）に依存します。


![リソースの開始元と依存関係の表示](imgs/initiators-dependencies.png)


多数のリソースを含むページでは、開始元と依存関係が一部表示されない場合があります。


## リクエストの並べ替え

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#sort-by-activity">アクティビティ フェーズによる並べ替え</a>

  をご覧ください。
</aside>

デフォルトでは、**[Requests Table]** 内のリソースが各リクエストの開始時間で並べ替えられるため、先頭にあるのが最初に開始されたリクエストになります。


列見出しをクリックすると、その見出しのリソース値の順番で表が並べ替えられます。
 もう一度同じ見出しをクリックすると、並べ替えの昇順と降順が切り替わります。


**[Timeline]** 列は他の列とは異なり独自の操作があります。 この列見出しをクリックすると、並べ替えフィールドのメニューが表示されます。


* **Timeline**。 各ネットワーク リクエストを開始時間順に並べ替えます。 これはデフォルトの並べ替え順で、**[Start Time]** オプションで並べ替えるのと同じです。
* **Start Time**。 各ネットワーク リクエストを開始時間順に並べ替えます（**[Timeline]** オプションで並べ替えるのと同じです）。
* **Response Time**。 各リクエストをレスポンスにかかった時間順に並べ替えます。
* **End Time**。 各リクエストを完了時間順に並べ替えます。
* **Duration**。 各リクエストを合計時間順に並べ替えます。 このフィルタを選択すると、読み込みに最も時間がかかるリソースを判断できます。
* **Latency**。 リクエストを開始してからレスポンスが始まるまでにかかった時間で並べ替えます。
 このフィルタを選択すると、最初のバイトを受け取るまでの時間（TTFB）が最も長かったリソースを判断できます。


![Timeline の並べ替え項目](imgs/timeline-sort-fields.png)

## リクエストのフィルタ処理

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#filters">[Filters] パネル</a>

  をご覧ください。
</aside>

**[Network]** パネルには、どのリソースを表示するのかフィルタ処理するさまざまな手段が用意されています。
 **[filters]** ボタン (![[filters] ボタン](imgs/filters.png)
{:.inline})をクリックし、**[filters]** ペインを非表示にしたり表示したりします。


コンテンツの種類ボタンを使用すると、選択した種類のリソースのみが表示されます。


注: 複数のフィルタを同時に有効にするには、<kbd>Cmd</kbd>（Mac）または <kbd>Ctrl</kbd>（Windows/Linux）を押しながらフィルタをクリックします。

![複数のコンテンツの種類を同時に選択してフィルタ](imgs/multiple-content-type-filters.png)


**フィルタ** のテキスト フィールドはかなり効果的です。 任意の文字列を入力すると、**[Network]** パネルには、入力された文字列に一致するファイル名を持つリソースだけが表示されます。



![リソース名でのフィルタリング](imgs/resource-name-filtering.png)

**フィルタ** のテキスト フィールドでは、`larger-than` キーワードを使用してファイルサイズを指定するなど、多様なプロパティでリソースを並べ替えることができるようにさまざまなキーワードがサポートされています。



すべてのキーワードについて以下で説明します。

* `domain`。 指定したドメインのリソースのみを表示します。 複数のドメインを含めるには、ワイルドカード文字（`*`）を使用します。
 たとえば、`*.com` はドメイン名が `.com` で終わるすべてのドメインのリソースを表示します。
 DevTools では、見つかったすべてのドメインを含むオートコンプリート ドロップダウン メニューが設定されます。
* `has-response-header`。 指定した HTTP レスポンス ヘッダーを含むリソースを表示します。
 DevTools では、見つかったすべてのレスポンス ヘッダーを含むオートコンプリート ドロップダウンが設定されます。
* `is`。 `is:running` を使用して、`WebSocket` リソースを検索します。
* `larger-than`。 指定したサイズ（バイト単位）よりも大きいリソースを表示します。
 値 `1000` を設定するのと値 `1k` を設定するのは同じです。
* `method`。 指定した HTTP メソッドの種類で取得されたリソースを表示します。
 DevTools では、見つかったすべての HTTP メソッドを含むドロップダウンが設定されます。
* `mime-type`。 指定した MIME タイプのリソースを表示します。 DevTools では、見つかったすべての MIME タイプを含むドロップダウンが設定されます。
* `mixed-content`。 すべての混在コンテンツ リソース（`mixed-content:all`）または現在表示されている混在コンテンツ リソースのみ（`mixed-content:displayed`）を表示します。
* `scheme`。 保護されていない HTTP （`scheme:http`）または保護されている HTTPS （`scheme:https`）を経由して取得されたリソースを表示します。
* `set-cookie-domain`。 指定した値と一致する `Domain` 属性を持つ `Set-Cookie` ヘッダーを含むリソースを表示します。
 DevTools では、見つかったすべての Cookie ドメインを含むオートコンプリート ドロップダウンが設定されます。
* `set-cookie-name`。 指定した値と一致する名前を持つ `Set-Cookie` ヘッダーを含むリソースを表示します。
 DevTools では、見つかったすべての Cookie 名を含むオートコンプリート ドロップダウンが設定されます。
* `set-cookie-value`。 指定した値と一致する値を持つ `Set-Cookie` ヘッダーを含むリソースを表示します。
 DevTools では、見つかったすべての Cookie 値を含むオートコンプリート ドロップダウンが設定されます。
* `status-code`。 指定したコードと一致する HTTP ステータス コードを持つリソースだけを表示します。
 DevTools では、見つかったすべてのステータス コードを含むオートコンプリート ドロップダウン メニューが設定されます。


![ファイルサイズによるフィルタリング](imgs/larger-than.png)

上記のキーワードのいくつかで、オートコンプリート ドロップダウン メニューに触れています。 オートコンプリート メニューをトリガーするには、キーワードの後にコロンを入力します。
 たとえば、以下のスクリーンショットでは「`domain:`」と入力して、オートコンプリート ドロップダウンをトリガーしています。


![テキスト フィールドのオートコンプリートでフィルタ](imgs/filter-autocomplete.png)

## ネットワーク情報のコピー、保存、クリア

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、以下のセクションをご覧ください。

  <ul>
    <li><a href="reference#copy"> 1 つまたはすべてのリクエストのコピー</a></li>
    <li><a href="reference#save-as-har">コンテンツ付きで HAR として保存</a></li>
    <li><a href="reference#clear-cache">ブラウザ キャッシュのクリア</a></li>
    <li><a href="reference#clear-cookies">ブラウザ cookie のクリア</a></li>
  </ul>
</aside>

ネットワーク情報をコピー、保存、または削除するには、**[Requests Table]** 内でその情報を右クリックします。
 一部のオプションは状況に依存するため、1 つのリソースを操作する場合、そのリソースの行を右クリックする必要があります。

 以下に、それぞれのオプションについて説明します。

* **Copy Response**。 選択したリソースの HTTP レスポンスをシステム クリップボードにコピーします。
* **Copy as cURL**。 選択したリソースのネットワーク リクエストを [cURL](http://curl.haxx.se/){: .external } コマンド文字列としてシステム クリップボードにコピーします。
  [リクエストを cURL コマンドとしてコピーする](#copy-requests-as-curl-commands)をご覧ください。
* **Copy All as HAR**。 すべてのリソースを [HAR](https://en.wikipedia.org/wiki/.har){: .external } データとしてシステム クリップボードにコピーします。
  HAR ファイルには、ネットワークの「ウォーターフォール」について記述する JSON データ構造が含まれています。
 いくつかの [サード パーティ](https://ericduran.github.io/chromeHAR/){: .external }
  の [ツール](https://code.google.com/p/harviewer/){: .external } は、HAR ファイル内のデータからネットワーク ウォーターフォールを再構築できます。
 詳細については、「[Web Performance Power Tool:
HTTP Archive (HAR)](https://www.igvita.com/2012/08/28/web-performance-power-tool-http-archive-har/)」をご覧ください。
* **Save as HAR with Content**。 すべてのネットワーク データを各ページリソースと共に HAR ファイルに保存します。
 イメージなどのバイナリ リソースは、Base64 エンコードのテキストとしてエンコードされます。
* **Clear Browser Cache**。 ブラウザ キャッシュをクリアします。
  **ヒント**:[**Network conditions**][nc] ドロワーからブラウザ キャッシュを有効または無効にすることもできます。
* **Clear Browser Cookies**。 ブラウザの Cookie をクリアします。
* **Open in Sources Panel**。 選択したリソースを **[Sources]** パネルで開きます。
* **Open Link in New Tab**。 選択したリソースを新しいタブで開きます。 [Network] の表内のリソース名をダブルクリックすることもできます。
* **Copy Link Address**。 リソースの URL をシステム クリップボードにコピーします。
* **Save**。 選択したテキスト リソースを保存します。 テキスト リソースのみに表示されます。
* **Replay XHR**。 選択した `XMLHTTPRequest` を再送信します。 XHR リソースのみに表示されます。


![コピーと保存のコンテキスト メニュー](imgs/copy-save-menu.png)

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions

### 1 つまたはすべてのリクエストを cURL コマンドとしてコピー {: #curl }

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#copy"> 1 つまたはすべてのリクエストをコピー</a>

  をご覧ください。
</aside>

[cURL](http://curl.haxx.se/){: .external } は、HTTP トランザクションを作成するコマンドライン ツールです。


[Requests Table] 内のリソースを右クリックし、**[Copy]** にカーソルを合わせて **[Copy as cURL]** を選択すると、[Network] パネルで検出されたすべてのリソースの cURL リクエスト文字列がコピーされます。



![1 つのリクエストを cURL コマンドとしてコピー](imgs/copy-as-curl.png)

**[Copy All as cURL]** を選択すると、[Network] パネルで検出されたすべてのリソースの cURL リクエスト文字列がコピーされます。


すべてをコピーする場合は、フィルタは無視されます（たとえば、 [Network] パネルでフィルタして CSS リソースのみを表示した状態で **[Copy All as cURL]** を選択すると、CSS だけではなく検出されたリソースすべてがコピーされます）。



## [Network] パネルのカスタマイズ

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#request-rows">リクエストの表示にサイズの大きい行またはサイズの小さい行を使用する</a>

  をご覧ください。
</aside>

デフォルトの **[Requests Table]** には、短いサイズの行でリソースが表示されます。 **[Use large resource rows]** ボタン（![リソースをサイズの大きい行で表示ボタン](imgs/large-resource-rows-button.png){:.inline}）をクリックして、各行のサイズを大きくします。


サイズの大きい行を使用すると、列によっては 2 つのテキストフィールド（プライマリ フィールドとセカンダリ フィールド）が表示されるようになります。
 その列見出しにはセカンダリ フィールドの意味が示されます。


![サイズを増やしたリソース行](imgs/large-resource-rows.png)

### 表への列の追加と削除

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、以下のセクションをご覧ください。

  <ul>
    <li><a href="reference#columns">列の表示または非表示</a></li>
    <li><a href="reference#custom-columns">カスタム列を追加</a></li>
  </ul>
</aside>

列を追加または削除するには、**[Requests Table]** の見出しのいずれかを右クリックします。


![列を追加または削除する](imgs/add-remove-columns.png)

### ナビゲーション時のネットワーク ログの保存

<aside class="warning">
  <b>Warning: </b> このページは推奨されていません。 最新情報については、<a href="reference#preserve-log">ログの保存</a>

  をご覧ください。
</aside>

ネットワーク アクティビティの記録は、デフォルトでは、現在のページを再読み込みするか別のページを読み込むたびに破棄されます。
**[Preserve log]** チェックボックスをオンにすると、このようなシナリオでもネットワークの以前のログが保存されます。
 新しいレコードは、**[Requests Table]** の下に追加されます。

## 参考資料

アプリケーションのネットワーク パフォーマンスの最適化については、以下の資料で詳細をご覧ください。

* サイトに適用できるパフォーマンスのベスト プラクティスを特定するには、[PageSpeed Insights](/speed/pagespeed/insights) を使用し、それらのベスト プラクティスを適用するプロセスを自動化するには、[PageSpeed 最適化ツール](/speed/pagespeed/optimization)を使用します。
* [Google Chrome の高パフォーマンス ネットワーク](https://www.igvita.com/posa/high-performance-networking-in-google-chrome/)では、Chrome ネットワークの内部と、それを利用してサイトを高速にする方法について説明されています。
* [GZIP による圧縮の仕組み](/speed/articles/gzip)では、GZIP 圧縮の概要と GZIP が適している理由について説明されています。
* [ウェブ パフォーマンスのベスト プラクティス](/speed/docs/best-practices/rules_intro)では、ウェブページまたはウェブ アプリケーションのネットワーク パフォーマンスを最適化する場合のヒントが示されています。




## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
