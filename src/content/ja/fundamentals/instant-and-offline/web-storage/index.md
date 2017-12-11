project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2016-09-28 #}
{# wf_published_on:2016-09-28 #}

# ウェブ ストレージの概要 {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

ローカル端末のストレージにも、クラウドベースのサーバーのストレージにも、適切なストレージ メカニズムを選択することが重要です。優れたストレージ エンジンを使用すると、情報は確実に保存され、帯域幅は低減され、応答性が向上します。適切なストレージ キャッシュ戦略は、オフライン モバイルウェブ エクスペリエンスを実現するための核となる構成要素です。
 

この記事では、ストレージ API とサービスを評価するための基本事項を簡単に説明し、その後、比較表と一般的なガイダンスを示します。近いうちに、選択したストレージ トピックをより深く理解するためのリソースを追加する予定です。


##  ストレージの分類

ウェブアプリのデータ ストレージを細かく見ていくためのいくつかの特徴を理解することから始めましょう。
その後、この枠組みを使用して、ウェブ デベロッパーが使用できる多数のストレージ オプションを示し、評価します。


###  データモデル

データの格納モデルによって、データの内部的な整理方法が決まります。これは、ストレージや取得リクエストの使いやすさ、コスト、パフォーマンスに影響します。

 

* **構造化: **SQL ベースのデータベース管理システムに特有ですが、データは、事前定義されたフィールドを使用して表に格納され、幅広いクエリタイプが経験的に知られていないような状況で柔軟かつ動的なクエリに非常に役立ちます。構造化データストアの代表的な例として、ブラウザの IndexedDB があります。


* **キー値: **キー値データストアと関連する非 SQL データベースには、一意のキーでインデックスが登録された非構造化データを格納したり取得したりできる機能があります。キー値データストアは、インデックスが登録された不透明データに一定時間アクセスできるという点でハッシュ表に似ています。キー値データストアの代表的な例として、ブラウザの Cache API およびサーバー上の Apache Cassandra があります。


* **バイト ストリーム: **この単純なモデルは、データを可変長の不透明なバイト文字列として格納し、内部構造をアプリケーション層に委ねます。このモデルは、特にファイル システムやその他の階層構造のデータに適しています。バイト ストリーム データストアの代表的な例として、ファイル システムやクラウド ストレージ サービスがあります。


### 永続性

ウェブアプリのストレージ方法は、データの永続性が保持されるスコープに基づいて細かく分析できます。


* **セッション永続性: **このカテゴリのデータは、1 つのウェブ セッションまたはブラウザタブがアクティブである間のみ保持されます。
セッション永続性を持つストレージ メカニズムの例として、Session Storage API があります。


* **端末永続性: **このカテゴリのデータは、特定の端末内でセッションやブラウザタブ / ウィンドウをまたいで保持されます。
端末永続性を持つストレージ メカニズムの例として、Cache API があります。


* **グローバル永続性: **このカテゴリのデータは、セッションや端末をまたいで保持されます。
そのため、最も堅牢なデータ永続性です。グローバル永続性を持つストレージ メカニズムの例として、Google Cloud Storage があります。


###  ブラウザ対応

デベロッパーは、問題のドメインに最も適した API を選択する必要があります。ただし、標準化されて定評のある API の方が、長く利用されてサポート範囲も広い傾向があるため、カスタム インターフェースや独自のインターフェースより好ましいという事実も考慮する必要があります。ナレッジベースも広範囲で、デベロッパー エコシステムも充実しています。


###  トランザクション

多くの場合、関連する一連のストレージ操作の成功または失敗はアトミックであることが重要です。
データベース管理システムは、通常、トランザクション モデルを使用してこの機能をサポートしており、この場合、関連するアップデートが任意の単位にグループ化されることがあります。必ず必要というわけではありませんが、これは問題のドメインでは便利な機能であり、不可欠な場合もあります。


###  同期 / 非同期

一部のストレージ API は、ストレージまたは取得リクエストが完了するまで現在アクティブなスレッドをブロックするという意味で同期的です。これは、特にストレージ リクエストが UI とメインスレッドを共有するウェブブラウザでは重荷になります。効率とパフォーマンス上の理由から、非同期ストレージ API を使用することをお勧めします。


##  比較

このセクションでは、ウェブ デベロッパーが現在利用できる API を示し、前述した特徴についてこれらの API を比較します。


<table>
  <thead>
    <th>API</th>
    <th>データモデル</th>

    <th>永続性</th>
    <th>ブラウザ対応</th>

    <th>トランザクション</th>
    <th>同期 / 非同期</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File System</a></td>
      <td>バイト ストリーム</td>
      <td>端末</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>非対応</td>
      <td>非同期</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">Local Storage</a></td>
      <td>キー値</td>
      <td>端末</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>非対応</td>
      <td>同期</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">Session Storage</a></td>
      <td>キー値</td>
      <td>セッション</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>非対応</td>
      <td>同期</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>構造化</td>
      <td>端末</td>
      <td>100%</td>
      <td>非対応</td>
      <td>同期</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>構造化</td>
      <td>端末</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>対応</td>
      <td>非同期</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a></td>
      <td>キー値</td>
      <td>端末</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>非対応</td>
      <td>非同期</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a></td>
      <td>ハイブリッド</td>
      <td>端末</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>対応</td>
      <td>非同期</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">Cloud Storage</a></td>
      <td>バイト ストリーム</td>
      <td>グローバル</td>
      <td>100%</td>
      <td>非対応</td>
      <td>両方</td>
    </tr>
  <tbody>
</table>

上記のように、UI との相互運用性を最大限に高めるには、できるだけ多くのブラウザで幅広くサポートされ、非同期呼び出しモデルを提供する API を選択するのが賢明です。このような基準に従うと、自然に次の技術を選択することになります。


* 端末のローカルキー値ストレージの場合は Cache API を使用します。

* 端末ローカル構造化ストレージの場合は、IndexedDB を使用します。

* グローバル バイト ストリーム ストレージの場合は、Cloud Storage サービスを使用します。

この組み合わせにより、多くのモバイル ウェブアプリの基本的なストレージ ニーズが満たされます。一般的なストレージ パターンへの対処方法の詳細とコード例については、今後の記事をご覧ください。



##  Chrome DevTools でのストレージのデバッグ{: #devtools }

Chrome DevTools を使用したご利用のウェブ ストレージ API の調査やデバッグの詳細については、次のドキュメントをご覧ください。
ここに示されていない API は、DevTools でサポートされていないか、該当しません。


* [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
* [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
* [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
* [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
* [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
* [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

複数のストレージ API を使用している場合は、DevTools の [Clear Storage] 機能をチェックしてください。
この機能を使用すると、1 回のボタンクリックで複数のストレージを消去できます。
詳しくは、[Service Worker、ストレージ、データベース、およびキャッシュの消去](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage)をご覧ください。



##  次のステップ

ストレージ メカニズムの検討方法について説明し、現在利用できる最も一般的な API とサービスを比較したので、次はコンテンツを追加して、関心のある次のトピックについて詳しく説明します。




* [Progressive Web App のオフライン ストレージの推奨](offline-for-pwa)

* 一般的なストレージ パターン（近日公開）

* 推奨されるバックエンド ストレージ メソッド（近日公開）

* 詳細:IndexedDB（近日公開）

* 詳細:Cache API（近日公開）

* 一般的なストレージ フレームワークの分析（近日公開）


{# wf_devsite_translation #}
