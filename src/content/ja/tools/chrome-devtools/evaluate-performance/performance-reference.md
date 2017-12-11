project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Timeline イベントモードでは、記録中に発生したイベントがすべて表示されます。この Timeline イベント リファレンスを使って、各種 Timeline イベントを確認します。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# Timeline イベント リファレンス {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}

Timeline イベントモードでは、記録中に発生したイベントがすべて表示されます。この Timeline イベント リファレンスを使って、各種 Timeline イベントを確認します。


##  Timeline イベント共通のプロパティ

すべての種類のイベントに示される情報と、特定の種類のイベントのみに示される情報があります。このセクションでは、さまざまな種類のイベントに共通するプロパティを一覧します。特定の種類のイベント固有のプロパティは、各種イベントのリファレンスで別途一覧します。

| プロパティ   |      示される状況                                                       |
|----------|:-----------------------------------------------------------------|
|Aggregated time | [ネストされるイベント](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)を持つイベントの場合、イベントのカテゴリ別にかかった時間。|
| Call Stack | [子イベント](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#view-nested-events)を持つイベントの場合、イベントのカテゴリ別にかかった時間。|
| CPU time | 記録されたイベントが使った CPU 時間。|
| Details | イベントに関するその他の詳細。|
| Duration（タイムスタンプ） | すべての子イベントを含めて、イベント完了までにかかった時間。タイムスタンプは、記録開始時点からの相対時間としてイベント発生時点を表した時間です。|
| Self time    |すべての子イベントを除いて、イベント完了までにかかった時間|
| Used Heap Size | イベント記録時にアプリケーションが使用していたメモリ量と、最後のサンプリング以降に使用されたヒープサイズの差分（+/-）。|

##  読み込みイベント

このセクションでは、読み込みカテゴリに属するイベントとそのプロパティを一覧します。

| イベント | 説明 |
|-------|:----------|
|Parse HTML|Chrome が HTML 解析アルゴリズムを実行した時点で発生します。|
|Finish Loading|ネットワーク リクエストが完了した時点で発生します。|
|Receive Data|リクエストしたデータを受信した時点で発生します。Receive Data イベントは 1 回以上発生します。|
|Receive Response|  リクエストから最初の HTTP レスポンスを受け取った時点で発生します。|
|Send Request|  ネットワーク リクエストを送信した時点で発生します。|

###  読み込みイベントのプロパティ

| プロパティ | 説明 |
|-------|:----------|
|Resource|リクエストされたリソースの URL。|
|Preview|リクエストされたリソースのプレビュー（イメージのみ）。|
|Request Method|リクエストに使用された HTTP メソッド（GET や POST など）。|
|Status Code|HTTP レスポンス コード。|
|MIME Type|リクエストされたリソースの MIME タイプ。|
|Encoded Data Length|リクエストされたリソースのバイト長。|

##  スクリプティング イベント

このセクションでは、スクリプティング カテゴリに属するイベントとそのプロパティを一覧します。

| イベント | 説明 |
|-------|:----------|
|Animation Frame Fired|予定されているアニメーション フレームが起動され、そのコールバック ハンドラが呼び出された時点で発生します。|
|Cancel Animation Frame|予定されているアニメーション フレームがキャンセルされた時点で発生します。|
|GC Event|ガベージ コレクションが実行された時点で発生します。|
|DOMContentLoaded|ブラウザによって [DOMContentLoaded](https://docs.webplatform.org/wiki/dom/events/DOMContentLoaded) が発生した時点で発生します。このイベントは、ページの DOM コンテンツがすべて読み込まれて解析された時点で発生します。|
|Evaluate Script| スクリプトが評価された時点で発生します。|
|Event| JavaScript イベント（mousedown、key など）によって発生します。|
|Function Call| 最上位の JavaScript 関数呼び出しが行われた時点で発生します（ブラウザが JavaScript エンジンに処理を受け渡したときにのみ発生します）。|
|Install Timer| [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval) または [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout) によってタイマーが作成された時点で発生します。|
|Request Animation Frame| `requestAnimationFrame()` 呼び出しによって新しいフレームのスケジュールが設定された時点で発生します。|
|Remove Timer|  以前に作成したタイマーが削除された時点で発生します。|
|Time|  スクリプトが [console.time()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimelabel) を呼び出した時点で発生します。|
|Time End|スクリプトが [console.timeEnd()](/web/tools/chrome-devtools/debug/console/console-reference#consoletimeendlabel) を呼び出した時点で発生します。|
|Timer Fired| `setInterval()` または `setTimeout()` によって予定されていたタイマーが起動された時点で発生します。|
|XHR Ready State Change|  XMLHTTPRequest がレディ状態に変化した時点で発生します。|
|XHR Load|  `XMLHTTPRequest` が読み込みを完了した時点で発生します。|

###  スクリプティング イベントのプロパティ

| プロパティ | 説明 |
|-------|:----------|
|Timer ID|タイマー ID。|
|Timeout|タイマーによって指定されたタイムアウト。|
|Repeats|タイマーを繰り返し起動するかどうかを指定するブール値。|
|Function Call|呼び出された関数。|

##  レンダリング イベント

このセクションでは、レンダリング カテゴリに属するイベントとそのプロパティを一覧します。

| イベント | 説明 |
|-------|:----------|
|Invalidate layout| ページ レイアウトが DOM の変更によって無効化された時点で発生します。|
|Layout|  ページ レイアウトが実行された時点で発生します。|
|Recalculate style| Chrome によって要素のスタイルが再計算された時点で発生します。|
|Scroll|  ネストされたビューのコンテンツがスクロールされた時点で発生します。|

###  レンダリング イベントのプロパティ

| プロパティ | 説明 |
|-------|:----------|
|Layout invalidated|レイアウト レコードの場合、レイアウト無効化の原因となるコードのスタックトレース。|
|Nodes that need layout|レイアウト レコードの場合、再レイアウト前にレイアウトが必要とマークされているノードの数。通常、これらはデベロッパーのコードによって無効化されるノードと、再レイアウト ルートに向かうパスです。|
|Layout tree size|レイアウト レコードの場合、再レイアウト ルート（Chrome によって再レイアウトが開始されるノード）の下にあるノードの総数。|
|Layout scope|有効な値は「Partial」（再レイアウトの境界が DOM の一部）または「Whole document」です。|
|Elements affected|再計算スタイル レコードの場合、スタイル再計算の影響を受ける要素の数。|
|Styles invalidated|再計算スタイル レコードの場合、スタイルを無効化する原因となるコードのスタックトレース。|

##  ペイント イベント

このセクションでは、ペイント カテゴリに属するイベントとそのプロパティを一覧します。

| イベント | 説明 |
|-------|:----------|
|Composite Layers|Chrome のレンダリング エンジンによってイメージ レイヤーが合成された時点で発生します。|
|Image Decode|イメージのリソースがデコードされた時点で発生します。|
|Image Resize|イメージのサイズが元のサイズから変更された時点で発生します。|
|Paint|合成されたレイヤーがディスプレイの領域にペイントされた時点で発生します。Paint レコードにカーソルを合わせると、アップデートされたディスプレイ領域がハイライト表示されます。|

###  ペイント イベントのプロパティ

| プロパティ | 説明 |
|-------|:----------|
|Location|ペイント イベントの場合、ペイントされる長方形の x 座標と y 座標|
|Dimensions|ペイント イベントの場合、ペイントされる領域の高さと幅。|




{# wf_devsite_translation #}
