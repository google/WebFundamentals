project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Chrome DevTools の [Network] パネル機能の包括的リファレンス。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

<style>
figcaption {
  text-align: center;
}
</style>

[ui]: #ui-overview
[requests]: #requests
[overview]: #overview

# ネットワーク分析リファレンス {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools のネットワーク分析機能のこの包括的なリファレンスで、ページがどのように読み込まれるかを分析する新しい方法をご覧ください。


注: このリファレンスは Chrome 58 に基づいています。別のバージョンの Chrome を使用している場合、DevTools の UI と機能が異なる場合があります。
 どのバージョンの Chrome を実行しているかを確認するには、`chrome://help` をチェックしてください。


## ネットワーク リクエストの記録 {: #record }

デフォルトでは、DevTools が開いている限り、DevTools はすべてのネットワーク リクエストを [Network] パネルに記録します。


<figure>
  <img src="imgs/network.png" alt="[Network] パネル。">
  <figcaption>
    <b>図 1</b>。 [Network] パネル</figcaption>

</figure>

### ネットワーク リクエストの記録の停止 {: #stop-recording }

リクエストの記録を停止するには:

* [Network] パネルで [**Stop recording network log**] ![Stop recording network log](imgs/record-on.png) をクリックします。
{: .devtools-inline } それは灰色に変わり、DevTools がリクエストの記録を停止したことを示します。
* [Network] パネルにフォーカスを設定した状態で、<kbd>Command キー</kbd>+<kbd>E</kbd>（Mac）または <kbd>Control キー</kbd>+<kbd>E</kbd>（Windows、Linux）を押します。



### リクエストのクリア {: #clear }

リクエスト表からすべてのリクエストをクリアするために、[Network] パネルで [**Clear**] ![Clear][clear]をクリックします。{:.devtools-inline}


<figure>
  <img src="imgs/clear.svg" alt="[Clear] ボタン。">
  <figcaption>
    <b>図 2</b>。 青い枠で示されている [Clear]</figcaption>

</figure>

[clear]: imgs/clear-requests.png

### ページの読み込み後もリクエストを保存 {: #preserve-log }

ページの読み込み後もリクエストを保存するには、[Network] パネルで [**Preserve log**] チェックボックスをオンにします。
 DevTools は、[**Preserve log**] を無効にするまで、すべてのリクエストを保存します。


<figure>
  <img src="imgs/preserve-log.svg" alt="[Preserve Log] チェックボックス。">
  <figcaption>
    <b>図 3</b>。 青い枠で示されている [Preserve Log] チェックボックス</figcaption>

</figure>

### ページの読み込み中のスクリーンショットの取得 {: #screenshots }

ページの読み込みを待機する間にユーザーに表示されるものを分析するために、スクリーンショットを取得します。


スクリーンショットを有効にするには、[Network] パネルで [**Capture screenshots**] ![Capture screenshots][capture] をクリックします。
{: .devtools-inline } 有効になると青色に変わります。


スクリーンショットを取得するために [Network] パネルにフォーカスを設定した状態で、ページを再読み込みします。

取得したスクリーンショットは、以下の方法で操作できます。

* スクリーンショットにカーソルを合わせると、スクリーンショットが取得された時点が表示されます。
 [Overview] ペインには黄色い線が表示されます。
* スクリーンショットのサムネイルをクリックすると、スクリーンショットが取得された後に発生したリクエストを除外できます。
* サムネイルをダブルクリックすると、拡大できます。

<figure>
  <img src="imgs/screenshot-hover.png"
       alt="スクリーンショットにカーソルを合わせる。">
  <figcaption>
    <b>図 4</b>。 スクリーンショットにカーソルを合わせる。 [Overview] ペインの黄色の縦線とウォーターフォールはスクリーンショットが取得された時点を表しています。


  </figcaption>
</figure>

[capture]: imgs/capture-screenshots.png

### XHR リクエストのリプレイ {: #replay-xhr }

XHR リクエストをリプレイするには、リクエスト表でリクエストを右クリックし、[**Replay XHR**] を選択します。


<figure>
  <img src="imgs/replay-xhr.png" alt="[Replay XHR] の選択。">
  <figcaption>
    <b>図 5</b>。 [Replay XHR] の選択</figcaption>

</figure>

## 読み込み動作の変更

### ブラウザのキャッシュを無効にすることによる、初回訪問者のエミュレート {: #disable-cache}

初めてサイトを訪問するユーザーのエクスペリエンスをエミュレートするには、[**Disable cache**] チェックボックスをオンにします。
 DevTools により、ブラウザのキャッシュが無効にされます。 リクエストは再アクセスの際にブラウザのキャッシュから提供されるので、これは、初めてのユーザーのエクスペリエンスをより正確にエミュレートします。



<figure>
  <img src="imgs/disable-cache.svg" alt="[Disable Cache] チェックボックス。">
  <figcaption>
    <b>図 6</b>。 青い枠で示されている [Disable Cache] チェックボックス</figcaption>

</figure>

#### [Network Conditions] ドロワーからブラウザのキャッシュを無効にする {: #disable-cache-network-conditions }

他の DevTools パネルで作業している間にキャッシュを無効にする場合は、[Network Conditions] ドロワーを使用します。


1. [[Network Conditions] ドロワー](#network-conditions)を開きます。
1. [**Disable Cache**] チェックボックスをオンまたはオフにします。

### ブラウザのキャッシュの手動でのクリア {: #clear-cache}

ブラウザのキャッシュを手動でクリアする場合は、いつでも、リクエスト表の任意の場所を右クリックして [**Clear Browser Cache**] を選択します。


<figure>
  <img src="imgs/clear-browser-cache.png"
       alt="[Clear Browser Cache] の選択。">
  <figcaption>
    <b>図 7</b>。 [Clear Browser Cache] の選択</figcaption>

</figure>

### オフラインでのエミュレート {: #offline }

[プログレッシブ ウェブアプリ][pwa]と呼ばれる新しい種類のウェブアプリがあります。これは [Service Worker][sw] を利用してオフラインで動作できます。
 この種のアプリを構築する場合、データ接続のない端末を簡単にシミュレートできると便利です。



[**Offline**] チェックボックスをオンにして、完全にオフラインのネットワーク エクスペリエンスをシミュレートします。


<figure>
  <img src="imgs/offline.svg"
       alt="[Offline] チェックボックス">
  <figcaption>
    <b>図 8</b>。 青い枠で示されている [Offline] チェックボックス</figcaption>

</figure>

[pwa]: /web/progressive-web-apps/
[sw]: /web/fundamentals/getting-started/primers/service-workers

### 低速ネットワーク接続のエミュレート {: #throttling }

[**Network Throttling**] メニューから 2G、3G、およびその他の接続速度をエミュレートします。


<figure>
  <img src="imgs/network-panel-throttling-menu.svg"
       alt="[Network Throttling] メニュー。">
  <figcaption>
    <b>図 9</b>。 青い枠で示されている [Network Throttling] メニュー。</figcaption>

</figure>

Regular または Good 2G などのさまざまなプリセットから選択できます。 [Network Throttling] メニューを開いて、[**Custom**] > [**Add**] を選択することにより、独自のカスタム プリセットを追加することもできます。



DevTools では、スロットリングが有効であることを示すために、[**Network**] タブの横に警告アイコンを表示します。


#### [Network Conditions] ドロワーから低速ネットワーク接続をエミュレートする {: #throttling-network-conditions }

他の DevTools パネルで作業している間にネットワーク接続をスロットリングする場合は、[Network Conditions] ドロワーを使用します。


1. [[Network Conditions] ドロワー](#network-conditions)を開きます。
1. [**Network Throttling**] メニューから希望の接続速度を選択します。

### ブラウザの cookie の手動でのクリア {: #clear-cookies }

ブラウザの cookie を手動でクリアする場合は、いつでも、リクエスト表の任意の場所を右クリックして、[**Clear Browser Cookies**] を選択します。


<figure>
  <img src="imgs/clear-browser-cookies.png"
       alt="[Clear Browser Cookies] の選択。">
  <figcaption>
    <b>図 10</b>。 [Clear Browser Cookies] の選択</figcaption>

</figure>

### ユーザー エージェントのオーバーライド {: #user-agent }

ユーザー エージェントを手動でオーバーライドするには:

1. [[Network Conditions] ドロワー](#network-conditions)を開きます。
1. [**Select automatically**] チェックボックスをオフにします。
1. メニューからユーザー エージェント オプションを選択するか、テキスト ボックスにカスタム オプションを入力します。


## リクエストのフィルタ処理 {: #filter }

### プロパティでのリクエストのフィルタ処理 {: #filter-by-property }

[**Filter**] テキスト ボックスを使用して、ドメインまたはリクエストのサイズなどのプロパティでリクエストをフィルタ処理します。


テキスト ボックスが表示されない場合、おそらく [Filters] ペインが非表示になっています。
[[Filters] ペインの非表示](#hide-filters)をご覧ください。

<figure>
  <img src="imgs/filter-text-box.svg" alt="[Filters]テキスト ボックス。">
  <figcaption>
    <b>図 11</b>。 青い枠で示されている [Filters] テキスト ボックス</figcaption>

</figure>

各プロパティをスペースで区切ることで、複数のプロパティを同時に使用できます。
 たとえば、`mime-type:image/gif larger-than:1K` は 1 KB より大きいすべての GIF を表示します。
 これらの複数のプロパティ フィルタは AND 演算と同等です。
 OR 演算は現在サポートされていません。


以下は、サポートされているプロパティの完全なリストです。

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


### タイプでのリクエストのフィルタ処理 {: #filter-by-type }

リクエスト タイプでリクエストをフィルタ処理するには、[Network] パネルで、[**XHR**]、[**JS**]、[**CSS**]、[**Img**]、[**Media**]、[**Font**]、[**Doc**]、[**WS**] （WebSocket）、[**Manifest**]、または [**Other**] （ここにリストされていないその他のタイプ）ボタンをクリックします。



これらのボタンが表示されない場合、おそらく [Fillter] ペインが非表示になっています。
[[Filters] ペインの非表示](#hide-filters)をご覧ください。

複数のタイプのフィルタを同時に使用可能にするには、<kbd>Command</kbd> キー（Mac）または <kbd>Control</kbd> キー（Windows、Linux）を押したままクリックします。


<figure>
  <img src="imgs/multi-type-filter.png"
       alt="タイプフィルタを使用して、JS、CSS、および Doc （文書）リソースを表示する。">

  <figcaption>
    <b>図 12</b>。 タイプフィルタを使用して、JS、CSS、および Doc （文書）リソースを表示する。

  </figcaption>
</figure>

### 時間でのリクエストのフィルタ処理 {: #filter-by-time }

[Overview] ペインで、クリックして左または右にドラッグすることで、そのタイムフレーム中にアクティブであったリクエストのみを表示します。
 フィルタの時間も含まれます。 ハイライト表示されている時間中にアクティブであったリクエストがすべて表示されます。


<figure>
  <img src="imgs/overview-filter.png"
       alt="2500ms 周辺でアクティブではなかったリクエストの除外。">
  <figcaption>
    <b>図 13</b>。 2500ms 周辺でアクティブではなかったリクエストの除外</figcaption>


</figure>

### データ URL の非表示

[データ URL][data-uris] は、他のドキュメントに埋め込まれている小さなファイルです。 リクエスト表に示されているリクエストのうち、`data:` で始まるものがすべてデータ URL です。



[**Hide data URLs**] チェックボックスをオンにして、これらのリクエストを非表示にします。

<figure>
  <img src="imgs/hide-data-urls.svg" alt="[Hide Data URLs] チェックボックス。">
  <figcaption>
    <b>図 14</b>。 [Hide Data URLs] チェックボックス</figcaption>

</figure>

[data-uris]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs

## リクエストの並べ替え

デフォルトでは、リクエスト表のリクエストは開始時間で並べ替えられていますが、他の基準を使用して表を並べ替えることができます。


### 列順で並べ替え {: #sort-by-column }

リクエストの任意の列のヘッダーをクリックして、その列でリクエストを並べ替えます。


### アクティビティ フェーズ順で並べ替え {: #sort-by-activity }

ウォーターフォールでのリクエストの並べ替え方法を変更するには、リクエスト表のヘッダーを右クリックし、カーソルを [**Waterfall**] に合わせ、以下のオプションのうちの 1 つを選択します。



* **Start Time**。 最初に開始されたリクエストが先頭になります。
* **Response Time**。 最初にダウンロードを開始したリクエストが先頭になります。
* **End Time**。 最初に終了したリクエストが先頭になります。
* **Total Duration**。 接続セットアップおよびリクエスト / レスポンスが最も短いリクエストが先頭になります。
* **Latency**。 レスポンスの待機時間が最も短いリクエストが先頭になります。


これらの説明は、各オプションがそれぞれ最短から最長にランク付けされていることが前提です。
 [**Waterfall**] 列のヘッダーをクリックすると、順序が逆になります。

<figure>
  <img src="imgs/waterfall-total-duration.png"
       alt="合計時間によるウォーターフォールの並べ替え。">
  <figcaption>
    <b>図 15</b>。 合計時間によるウォーターフォールの並べ替え。 棒グラフの色の薄い部分は待機に費やした時間です。
 色の濃い部分は、バイトのダウンロードに費やした時間です。

  </figcaption>
</figure>

## リクエストの分析 {: #analyze }

DevTools が開いている限り、[Network] パネルにすべてのリクエストのログが記録されます。
[Network] パネルを使用して、リクエストを分析します。

### リクエストのログの表示 {: #requests }

リクエスト表を使用して、DevTools が開いている間に行われたすべてのリクエストのログを表示します。
 リクエストをクリックするか、カーソルを合わせると、それらについての詳細情報が表示されます。


<figure>
  <img src="imgs/requests-table.svg"
       alt="リクエスト表。">
  <figcaption>
    <b>図 16</b>。 青い枠で示されているリクエスト表</figcaption>

</figure>

リクエスト表は、デフォルトで以下の列を表示します。

* **Name**。 リソースのファイル名または ID。
* **Status**。 HTTP ステータス コード。
* **Type**。 リクエストされたリソースの MIME タイプ。
* **Initiator**。 以下のオブジェクトまたはプロセスがリクエストを開始できます。
    * **Parser**。 Chrome の HTML パーサー。
    * **Redirect**。 HTTP リダイレクト。
    * **Script**。 JavaScript 関数。
    * **Other**。 リンクを使ってページを移動したり、アドレスバーに URL を入力するなどの他のいくつかのプロセスまたは操作。
* **Size**。 サーバーから配信された時のレスポンス ヘッダーとレスポンス本文の合計サイズ。
* **Time**。 リクエスト開始からレスポンスの最終バイトを受け取るまでにかかった合計時間。
* [**Waterfall**](#waterfall)。 各リクエストの操作の視覚的詳細。

#### 列の追加または削除 {: #columns }

リクエスト表のヘッダーを右クリックして、それを非表示または表示するオプションを選択します。
 現在表示されているオプションには、それらの横にチェックマークがあります。

<figure>
  <img src="imgs/add-column.png"
       alt="リクエスト表への列の追加。">
  <figcaption>
    <b>図 17</b>。 リクエスト表への列の追加。
  </figcaption>
</figure>

#### カスタム列の追加 {: #custom-columns }

リクエスト表にカスタム列を追加するには、リクエスト表のヘッダーを右クリックし、[**Response Headers**] > [**Manage Header Columns**] を選択します。


<figure>
  <img src="imgs/custom-column.png"
       alt="リクエスト表にカスタム列を追加。">
  <figcaption>
    <b>図 18</b>。 リクエスト表にカスタム列を追加。
  </figcaption>
</figure>

### 各リクエストの相対的なタイミングの表示 {: #waterfall }

ウォーターフォールを使用して、各リクエストの相対的なタイミングを表示します。
デフォルトでは、ウォーターフォールはリクエストの開始時間を基準に並べられています。
つまり、左側のリクエストは、右側のリクエストより早く開始されています。


ウォーターフォールを並べ替える別の方法については、[アクティビティ フェーズ順で並べ替え](#sort-by-activity)をご覧ください。


<figure>
  <img src="imgs/waterfall.png"
       alt="[Requests] ペインの [Waterfall] 列。">
  <figcaption>
    <b>図 19</b>。 [Requests] ペインの [Waterfall] 列。
  </figcaption>
</figure>

### WebSocket 接続のフレームの分析 {: #frames }

WebSocket 接続のフレームを表示するには:

1. リクエスト表の [**Name**] 列にある、WebSocket 接続の URL をクリックします。
1. [**Frames**] タブをクリックします。 表には、最後の 100 フレームが表示されます。

表を更新するには、リクエスト表の [**Name**] 列にある WebSocket 接続の名前を再度クリックしてください。


<figure>
  <img src="imgs/frames.svg"
       alt="[Frames] タブ。">
  <figcaption>
    <b>図 20</b>。 青い枠で示されている [Frames] タブ</figcaption>

</figure>

表には、以下の 3 つの列が含まれています。

* **Data**。 メッセージ ペイロード。 メッセージが書式なしテキストの場合、ここに表示されます。
 バイナリ オペコードの場合、この列にはオペコードの名前とコードが表示されます。
 サポートされるオペコードは以下のとおりです。継続フレーム、バイナリ フレーム、接続クローズ フレーム、Ping フレーム、および Pong フレーム。
* **Length**。 メッセージ ペイロードの長さ（バイト単位）。
* **Time**。 メッセージが送受信された時間。

以下のように、メッセージは種類に応じて色分けされます。

* 発信テキスト メッセージは薄い緑。
* 着信テキスト メッセージは白。
* WebSocket オペコードは薄い黄色。
* エラーは薄い赤。

### レスポンス本文のプレビューの表示 {: #preview }

レスポンス本文のプレビューを表示するには:

1. リクエスト表の [**Name**] 列にある、リクエストの URL をクリックします。
1. [**Preview**] タブをクリックします。

このタブは、主にイメージを表示するのに便利です。

<figure>
  <img src="imgs/preview.svg"
       alt="[Preview] タブ。">
  <figcaption>
    <b>図 21</b>。 青い枠で示されている [Preview] タブ</figcaption>

</figure>

### レスポンス本文の表示 {: #response }

リクエストへのレスポンス本文を表示するには:

1. リクエスト表の [**Name**] 列にある、リクエストの URL をクリックします。
1. [**Response**] タブをクリックします。

<figure>
  <img src="imgs/response.svg"
       alt="[Response] タブ。">
  <figcaption>
    <b>図 22</b>。 青い枠で示されている [Response] タブ</figcaption>

</figure>

### HTTP ヘッダーの表示 {: #headers }

リクエストについての HTTP ヘッダーデータを表示するには:

1. リクエスト表の [**Name**] 列にある、リクエストの URL をクリックします。
1. [**Headers**] タブをクリックします。

<figure>
  <img src="/web/tools/chrome-devtools/images/headers.svg"
       alt="[Headers] タブ。">
  <figcaption>
    <b>図 23</b>. 青い枠で示されている [Headers] タブ</figcaption>

</figure>

#### HTTP ヘッダーソースの表示 {: #header-source }

デフォルトでは、[Headers] タブにはヘッダー名がアルファベット順に表示されます。 HTTP ヘッダー名を受信した順に表示するには:


1. 対象のリクエストの [**Headers**] タブを開きます。 [HTTP ヘッダーの表示](#headers)をご覧ください。
1. [**Request Header**] または [**Response Header**] セクションの横にある [**view source**] をクリックします。


### クエリ文字列パラメータの表示 {: #query-string }

URL のクエリ文字列パラメータを人の読める形式で表示するには:

1. 対象のリクエストの [**Headers**] タブを開きます。 [HTTP ヘッダーの表示](#headers)をご覧ください。
1. [**Query String Parameters**] セクションに移動します。

<figure>
  <img src="imgs/query-string.svg" alt="[Query String Parameters] セクション。">
  <figcaption>
    <b>図 24</b>. 青い枠で示されている [Query String Parameters] セクション</figcaption>

</figure>

#### クエリ文字列パラメータ ソースの表示 {: #query-string-source }

リクエストのクエリ文字列パラメータ ソースを表示するには:

1. [Query String Parameters] セクションに移動します。 [クエリ文字列パラメータの表示](#query-string)をご覧ください。
1. [**view source**] をクリックします。

#### URL エンコードされたクエリ文字列パラメータの表示 {: #query-string-encodings }

クエリ文字列パラメータを人の読める形式で、エンコードを保持したまま表示するには:


1. [Query String Parameters] セクションに移動します。 [クエリ文字列パラメータの表示](#query-string)をご覧ください。
1. [**view URL encoded**] をクリックします。

### Cookie の表示 {: #cookies }

リクエストの HTTP ヘッダーで送信された Cookie を表示するには:

1. リクエスト表の [**Name**] 列にある、リクエストの URL をクリックします。
1. [**Cookies**] タブをクリックします。

各列の説明については、[項目](/web/tools/chrome-devtools/manage-data/cookies#fields)をご覧ください。


<figure>
  <img src="imgs/cookies.svg"
       alt="[Cookies] タブ。">
  <figcaption>
    <b>図 25</b>. 青い枠で示されている [Cookies] タブ</figcaption>

</figure>

### リクエストのタイミングの詳細の表示 {: #timing }

リクエストのタイミングの詳細を表示するには:

1. リクエスト表の [**Name**] 列にある、リクエストの URL をクリックします。
1. [**Timing**] タブをクリックします。

このデータにアクセスするより迅速な方法については、[タイミングの詳細のプレビュー](#timing-preview)をご覧ください。


[Timing] タブに表示される各フェーズについて詳しくは、[タイミングの詳細フェーズの説明](#timing-explanation)をご覧ください。


<figure>
  <img src="imgs/timing.svg" alt="[Timing] タブ。">
  <figcaption>
    <b>図 26</b>. 青い枠で示されている [Timing] タブ</figcaption>

</figure>

各フェーズについての詳細は以下のとおりです。

このビューにアクセスする別の方法については、[タイミングの詳細の表示](#timing-breakdown)をご覧ください。


#### タイミングの詳細のプレビュー {: #timing-preview }

リクエストのタイミングの詳細のプレビューを表示するには、リクエスト表の [**Waterfall**] 列のリクエストのエントリにカーソルを合わせます。


カーソルを合わせずに、このデータにアクセスする方法については、[リクエストのタイミングの詳細の表示](#timing)をご覧ください。


<figure>
  <img src="imgs/waterfall-hover.png"
       alt="リクエストのタイミングの詳細のプレビュー。">
  <figcaption>
    <b>図 27</b>. リクエストのタイミングの詳細のプレビュー。</figcaption>

</figure>

#### タイミングの詳細フェーズの説明 {: #timing-explanation }

[Timing] タブに表示される各フェーズについての詳細は以下のとおりです。


* **Queueing**。 以下の場合にブラウザがリクエストをキューイングします。
    * 優先度の高いリクエストがある。
    * このオリジン用に開かれている 6 つの TCP 接続（これが上限です）がすでにある。
 HTTP/1.0 および HTTP/1.1 にのみ適用されます。
    * ブラウザがディスク キャッシュにスペースを一時的に割り当てている。
* **Stalled**。
 [**Queueing**] で説明されている理由のためリクエストが滞る可能性があります。
* **DNS Lookup**。 ブラウザがリクエストの IP アドレスを解決しています。
* **Proxy negotiation**。 ブラウザがリクエストを[プロキシ サーバー](https://en.wikipedia.org/wiki/Proxy_server)とネゴシエーションしています。
* **Request sent**。 リクエストが送信されています。
* **ServiceWorker Preparation**。 ブラウザが Service Worker を起動しています。
* **Request to ServiceWorker**。 リクエストが Service Worker に送信されています。
* **Waiting (TTFB)**。 ブラウザがレスポンスの最初のバイトを待機しています。
  TTFB は最初のバイトを受け取るまでの時間（Time To First Byte）の略です。 このタイミングには、1 往復のレイテンシとサーバーがレスポンスを準備するのにかかった時間が含まれています。
* **Content Download**。 ブラウザがレスポンスを受信しています。
* **Receiving Push**。 ブラウザは、HTTP/2 サーバー プッシュを介してこのレスポンスのデータを受信しています。
* **Reading Push**。 ブラウザは以前に受信したローカルデータを読み取っています。

### 開始元と依存関係の表示 {: #initiators-dependencies }

リクエストの開始元と依存関係を表示するには、<kbd>Shift</kbd> キーを押しながら、リクエスト表のリクエストにカーソルを合わせます。
 DevTools は開始元を緑に、依存関係を赤に設定します。


<figure>
  <img src="imgs/initiators-dependencies.png"
       alt="リクエストの開始元と依存関係の表示。">
  <figcaption>
    <b>図 28</b>. リクエストの開始元と依存関係の表示</figcaption>

</figure>

リクエスト表が時系列順に並べられている場合、カーソルを合わせているリクエストの上にある、最初の緑色のリクエストが依存関係の開始元です。
 その上に別の緑色のリクエストがある場合、そのリクエストが開始元の開始元です。
 さらに上にある場合も同様です。

### load イベントの表示 {: #load }

DevTools では、[Nerwork] パネルの複数の場所に `DOMContentLoaded` および `load` イベントのタイミングを表示します。
 `DOMContentLoaded` イベントは青色、`load` イベントは赤色で表示されます。


<figure>
  <img src="imgs/load-events.svg"
       alt="[Network] パネルの DOMContentLoaded および load イベントの場所。">
  <figcaption>
    <b>図 29</b>. [Network] パネルの <code>DOMContentLoaded</code> および <code>load</code> イベントの場所</figcaption>


</figure>

### リクエストの合計数の表示 {: #total-number }

リクエストの合計数は、[Network] パネルの下部にある [Summary] ペインに示されます。


Note: この数は、DevTools が開かれて以来ログに記録されたリクエストのみを追跡しています。
 他のリクエストが DevTools が開かれる前に発生した場合、それらのリクエストは含められません。


<figure>
  <img src="imgs/total-requests.svg"
       alt="DevTools が開かれて以来のリクエストの合計数">
  <figcaption>
    <b>図 30</b>. DevTools が開かれて以来のリクエストの合計数</figcaption>

</figure>

### 合計ダウンロード サイズの表示 {: #total-size }

リクエストの合計ダウンロード サイズは、[Network] パネルの下部にある [Summary] ペインに示されます。


Note: この数は、DevTools が開かれて以来ログに記録されたリクエストのみを追跡しています。
 他のリクエストが DevTools が開かれる前に発生した場合、それらのリクエストは含められません。


<figure>
  <img src="imgs/total-size.svg"
       alt="リクエストの合計ダウンロード サイズ">
  <figcaption>
    <b>図 31</b>. リクエストの合計ダウンロード サイズ</figcaption>

</figure>

ブラウザが解凍した後のリソースのサイズを確認するには、[リソースの未圧縮サイズの表示](#uncompressed)をご覧ください。


### リクエストが行われたスタック トレースの表示 {: #initiator-stack-trace }

JavaScript ステートメントが原因でリソースがリクエストされた場合、[**Initiator**] 列にカーソルを合わせると、そのリクエストが行われたスタック トレースを表示できます。


<figure>
  <img src="imgs/initiator-stack.png"
       alt="リソースのリクエストが行われたスタック トレース">
  <figcaption>
    <b>図 32</b>. リソースのリクエストが行われたスタック トレース</figcaption>

</figure>

### リソースの未圧縮サイズの表示 {: #uncompressed }

[**Use Large Request Rows**] ![Use Large Request Rows](imgs/large-resource-rows-button.png) をクリックして、
{:.inline-icon} [**Size**] 列の下の値を確認します。


<figure>
  <img src="imgs/large-request-rows.png"
       alt="未圧縮リソースの例。">
  <figcaption>
    <b>図 33</b>. ネットワーク経由で送信された <code>jquery-bundle.js</code> ファイルの圧縮後のサイズは <code>30.9 KB</code> ですが、未圧縮サイズは <code>86.3 KB</code> です。


  </figcaption>
</figure>

## リクエスト データのエクスポート {: #export }

### すべてのネットワーク リクエストの HAR ファイルへの保存 {: #save-as-har }

すべてのネットワーク リクエストを HAR ファイルに保存するには:

1. リクエスト表で任意のリクエストを右クリックします。
1. [**Save as HAR with Content**] を選択します。 DevTools は、DevTools が開かれて以来発生したすべてのリクエストを HAR ファイルに保存します。
 リクエストをフィルタ処理したり、1 つのリクエストだけを保存する方法はありません。


HAR ファイルを取得すると、分析のためにそれを DevTools にインポートし直すことができます。 これには、単にリクエスト表に HAR ファイルをドラッグ アンド ドロップします。
 [HAR Analyzer][HAR Analyzer]{: .external } も参照してください。

[HAR Analyzer]: https://toolbox.googleapps.com/apps/har_analyzer/

<figure>
  <img src="imgs/save-as-har.png"
       alt="[Save as HAR with Content] の選択。">
  <figcaption>
    <b>図 34</b>. [<b>Save as HAR with Content</b>] の選択
  </figcaption>
</figure>

### 1 つ以上のリクエストのクリップボードへのコピー {: #copy }

リクエスト表の [**Name**] 列で、リクエストを右クリックし、[**Copy**] にカーソルを合わせ、以下のオプションのいずれかを選択します。


* **Copy Link Address**。 リクエストの URL をクリップボードにコピーします。
* **Copy Response**。 レスポンス本文をクリップボードにコピーします。
* **Copy as cURL**。 リクエストを cURL コマンドとしてコピーします。
* **Copy All as HAR**。 すべてのリクエストを一連の cURL コマンドとしてコピーします。
* **Copy All as HAR**。 すべてのリクエストを HAR データとしてコピーします。

<figure>
  <img src="imgs/copy.png" alt="[Copy Response] の選択。">
  <figcaption>
    <b>図 35</b>. [Copy Response] の選択</figcaption>

</figure>

## [Network] パネルのレイアウトの変更

重要なセクションに集中するために、[Network] パネルの UI のセクションを展開するか、折りたたみます。


### [Filters] ペインの非表示 {: #hide-filters }

デフォルトでは、DevTools には [[Filters] ペイン](#filters)が表示されています。
[**Filter**] ![Filter][filter] をクリックしてそれを非表示にします。{: .devtools-inline }

<figure>
  <img src="imgs/hide-filters.svg" alt="[Hide Filters] ボタン">
  <figcaption>
    <b>図 36</b>. 青い枠で示されている [Hide Filters]</figcaption>

</figure>

[filter]: imgs/filters.png

### 大きいリクエスト行の使用 {: #request-rows }

ネットワーク リクエスト表により広い空間が必要な場合は、大きい行を使用します。
 列によっては、大きい行を使用した場合、追加の情報も示されます。
 たとえば、[**Size**] 列の下の値はリクエストの未圧縮サイズです。


<figure>
  <img src="imgs/large-request-rows.png"
       alt="[Requests] ペインの大きいリクエスト行の例。">
  <figcaption>
    <b>図 37</b>. [Requests] ペインの大きいリクエスト行の例</figcaption>

</figure>

[**Use large request rows**] ![Use large request rows][large] をクリックして、大きい行を使用可能にします。
{:.devtools-inline}

[large]: imgs/large-resource-rows-button.png

<figure>
  <img src="imgs/large-request-rows.svg" alt="[Large Request Rows] ボタン">
  <figcaption>
    <b>図 38</b>. 青い枠で示されている [Large Request Rows]</figcaption>

</figure>

### [Overview] ペインの非表示 {: #hide-overview }

デフォルトでは、DevTools では [[Overview] ペイン](#overview)が表示されています。
[**Hide overview**] ![Hide overview][hide]{:.devtools-inline} をクリックしてそれを非表示にします。

<figure>
  <img src="imgs/hide-overview.svg" alt="[Hide Overview] ボタン">
  <figcaption>
    <b>図 39</b>. 青い枠で示されている [Hide Overview]</figcaption>

</figure>

[hide]: imgs/hide-overview.png

## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
