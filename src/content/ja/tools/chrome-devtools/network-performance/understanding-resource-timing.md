project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: リソースがネットワーク経由で集められる際の複数のフェーズを理解しておくことは重要です。これを理解することが、読み込みの問題を解決する場合の基盤になります。

{# wf_published_on:2016-02-03 #}
{# wf_updated_on:2016-02-03 #}

#  Resource Timing について {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

リソースがネットワーク経由で集められる際の複数のフェーズを理解しておくことは重要です。これを理解することが、読み込みの問題を解決する場合の基盤になります。


### TL;DR {: .hide-from-toc }
- リソース タイミングの複数のフェーズについて理解します。
- Resource Timing API によって各フェーズに提供されるものを把握します。
- タイムライン グラフでパフォーマンスに関する問題のさまざまな兆候を見つけます。一連の透明のバーや緑色の大きなブロックなどがその例です。


すべてのネットワーク リクエストがリソースと考えられます。こうしたリクエストはネットワーク経由で取得されるため、リソースにはリソースのタイミングという点から表される独自のライフサイクルがあります。[Network] パネルでは、[Resource Timing API](http://www.w3.org/TR/resource-timing) が使用されています。この API はアプリケーションのデベロッパーが使用するのと同じものです。



注: クロスオリジン リソースで Resource Timing API を使用する場合、すべてのリソースに CORS ヘッダーが必要です。


Resource Timing API では、個別のアセットを受け取るタイミングについて、さまざまなレベルの詳細情報が提供されます。リクエストのライフサイクルには、以下の主要フェーズがあります。


* リダイレクト（Redirect）
  * 即座に `startTime` が始まります。
  * リダイレクトが行われると、`redirectStart` も始まります。
  * このフェーズの終わりにリダイレクトが発生すると、`redirectEnd` になります。
* アプリキャッシュ（App Cache）
  * アプリケーション キャッシュがそのリクエストを満たしている場合は、`fetchStart` 時間に入ります。
* DNS
  * DNS リクエストの開始時に `domainLookupStart` 時間が始まります。
  * DNS リクエストの終了時は `domainLookupEnd` 時間になります。
* TCP
  * サーバーへの初期接続時に `connectStart` が始まります。
  * TLS または SSL が使用中の場合、接続をセキュリティで保護するためのハンドシェイクが開始されたときに `secureConnectionStart` が始まります。
  * サーバーへの接続が完了時は `connectEnd` になります。
* リクエスト（Request）
  * リソースのリクエストがサーバーに送信された後、`requestStart` が始まります。
* レスポンス（Response）
  * サーバーがそのリクエストに最初にレスポンスを返したときに `responseStart` が始まります。
  * リクエストが終了し、データを取得したときに `responseEnd` になります。

![Resource Timing API の図](imgs/resource-timing-api.png)

##  DevTools での表示

[Network] パネルの特定のエントリについてのタイミング情報をすべて表示する方法は 3 つあります。

1. タイムライン列の下にあるタイミング グラフにカーソルを合わせます。これにより、すべてのタイミング データを示すポップアップが表示されます。
2. 任意のエントリをクリックして、そのエントリの [Timing] タブを開きます。
3. Resource Timing API を使用して、JavaScript から未加工のデータを取得します。

![Resource Timing の情報](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  以下のコードを DevTools コンソールで実行します。
  このコードは、Network Timing API を使用してすべてのリソースを取得します。
  その後、エントリにフィルタをかけ、名前に「style.css」を含むリソースを検索します。
  目的のリソースが見つかったら、そのリソースが返されます。
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
</code>
</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Resource Timing のエントリ">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>キューイング（Queueing）</strong></dt>
  <dd>
    リクエストがキューに登録されている場合、以下を示します。
      <ul>
        <li>
        リクエストは重要なリソース（スクリプトやスタイルなど）よりも優先度が低いと見なされ、レンダリング エンジンによって処理を延期されています。
        このような状態は画像でよく起こります。
        </li>
        <li>
        利用可能な TCP ソケットがなく、ソケットの解放を待機するために、リクエストが保留されています。
        </li>
        <li>
        ブラウザでは HTTP 1 のオリジン 1 つあたり <a href="https://crbug.com/12066">6 つの TCP 接続</a>しか許可されないため、リクエストが保留されています。
        </li>
        <li>
        ディスクキャッシュのエントリ作成にかかった時間（通常はごく短時間）。
        </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> ストール / ブロッキング（Stalled）</strong></dt>
  <dd>
    リクエストを送信できるようになるまでの待機時間。
    「キューイング（Queueing）」で示した理由で待機している場合もあります。
    また、この時間にはプロキシ ネゴシエーションにかかった時間も含まれます。
  </dd>

  <dt class="proxy-negotiation"><strong> プロキシ ネゴシエーション</strong></dt>
  <dd>プロキシ サーバー接続とのネゴシエーションにかかった時間。</dd>

  <dt class="dns-lookup"><strong><abbr title="Domain Name System"> DNS</abbr> 参照（DNS Lookup）</strong></dt>
  <dd>
    DNS 参照の実行にかかった時間。
    ページ上の新しいドメインはすべて、DNS 参照を行うために完全なラウンドトリップを必要とします。
  </dd>

  <dt class="initial-connection"><strong> 初期接続 / 接続中（Initial Connection）</strong></dt>
  <dd><abbr title="Transmission Control Protocol">TCP</abbr> のハンドシェイク / 再試行や <abbr title="Secure Sockets Layer">SSL</abbr> のネゴシエーションなど、接続の確立にかかった時間。</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>SSL ハンドシェイクの完了にかかった時間。</dd>

  <dt class="request-sent"><strong> リクエストの送信 / 送信中（Request Sent）</strong></dt>
  <dd>
    ネットワーク リクエストの発行にかかった時間。
    通常は、1000 分の 1 秒にも満たない時間です。
  </dd>

  <dt class="ttfb"><strong> 待機（Waiting（<abbr title="Time To First Byte">TTFB</abbr>））</strong></dt>
  <dd>
    初期レスポンスの待機にかかった時間。最初のバイトを受け取るまでの時間（TTFB: Time To First Byte）とも呼ばれます。
    この時間には、サーバーがレスポンスの配信を待機していた時間と、サーバーとのラウンドトリップの遅延が含まれます。
  </dd>

  <dt class="content-download"><strong> コンテンツのダウンロード / ダウンロード中（Content Download）</strong></dt>
  <dd>レスポンス データの受信にかかった時間。</dd>
</dl>


##  ネットワークの問題の診断

[Network] パネルで明らかになる潜在的な問題はたくさんあります。このような問題を検出できるようになるには、クライアントとサーバーが通信する仕組みと、プロトコルによって課せられる制限事項について十分理解しておく必要があります。


###  キューに登録されている、またはストールしている一連のアイテム

最も一般的な問題は、一連のアイテムがキューに登録されているか、ストールしている状態です。この状態は、１ つのドメインから取得されるリソースが多すぎることを示しています。HTTP 1.0/1.1 接続では、Chrome はホスト 1 つあたり最大 6 つの TCP 接続を許可します。一度にアイテムを 12 個リクエストすると、最初の 6 個が開始され、残り半分はキューに登録されます。最初の 6 個のうち 1 つが完了すると、キュー内の最初のアイテムがリクエストの処理を開始します。





![ストールしている一連のリクエスト](imgs/stalled-request-series.png)

従来の HTTP 1 トラフィックに関するこの問題を解決するには、[ドメイン シャーディング](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/)を実装する必要があります。ドメイン シャーディングでは、リソースの提供元アプリケーションに複数のサブドメインを作成します。その後、リソースを分割してサブドメインで均一に分配されるようにします。



この HTTP 1 接続の解決策は、HTTP 2 接続には**あてはまりません**。それどころか、悪影響を及ぼします。
HTTP 2 を採用している場合、HTTP 2 の動作設計に反した動きになるため、リソースのドメイン シャーディングは行わないでください。HTTP 2 では、サーバーへの TCP 接続は 1 つで、これが多重接続として機能します。これにより、HTTP 1 の 6 つの接続制限が取り除かれ、複数のリソースを 1 つの接続で同時に転送できます。



###  TTFB の低速化

<small>緑色の部分が多い</small>

![TTFB が長いことを示す兆候](imgs/indicator-of-high-ttfb.png)

待機時間が長くなることから、最初のバイトを受け取るまでの時間（TTFB）が低速になっていることがわかります。TTFB は [200 ミリ秒未満](/speed/docs/insights/Server) が推奨されます。TTFB の低速化は、以下に示す 2 つの主な問題のいずれかにつながります。

以下のいずれかの方法でプレビュー確認ができます。

1. クライアントとサーバー間のネットワークが不適切な状態
2. サーバー アプリケーションの応答が低速化

TTFB の低速化に対処するには、まず、可能な限り多くのネットワークを切断します。アプリケーションをローカルにホストして、それでも TTFB の状況が変わらないかどうかを確認するのが理想です。TTFB に時間がかかっている場合は、アプリケーションを最適化してレスポンスの速度を上げる必要があります。そのためには、データベース クエリの最適化や、コンテンツの特定部分へのキャッシュの実装、ウェブサーバーの構成変更などを行います。バックエンドが低速になる理由は多数あります。お使いのソフトウェアを調べて、想定パフォーマンスを満たしていないソフトウェアを把握してください。






ローカルでは TTFB に時間がかからない場合、クライアントとサーバー間のネットワークに問題があります。さまざまな要因によってネットワーク トラバーサルが妨げられている可能性があります。クライアントとサーバー間には多数のポイントがあり、それぞれに独自の接続制限があるため、問題が発生することもあります。こうした問題を減らすために簡単にテストするには、アプリケーションを別のホストに配置して、TTFB が改善するかどうかを確認します。




###  スループットのキャパシティ超過

<small>青色の部分が多い</small>

![スループットのキャパシティ超過の兆候](imgs/indicator-of-large-content.png)

コンテンツのダウンロード（Content Download）フェーズに多くの時間がかかっている場合、サーバー レスポンスの改善や連結は役に立ちません。主な解決策は、送信するバイト数を少なくすることです。



{# wf_devsite_translation #}
