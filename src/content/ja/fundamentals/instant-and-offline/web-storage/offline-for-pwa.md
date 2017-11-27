project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンス タイムとオフライン サポートの向上のためにデータをローカルに保存する方法について説明します。

{# wf_updated_on:2016-09-29 #}
{# wf_published_on:2016-09-29 #}

# Progressive Web App のオフライン ストレージ {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}
{% include "web/_shared/contributors/mco.html" %}

<figure class="attempt-right">
  <img src="images/pwa-in-devtools.jpg" alt="DevTools での PWA">
  <figcaption>
    <a href="https://pokedex.org" class="external">Pokedex</a> 
    Progressive Web App では、アプリの状態とポケモン データセットには IndexedDB を使用し、
    URL 指定可能なリソースには Cache API を使用しています。
  </figcaption>
</figure>

外出中はインターネット接続が不安定であったり存在しなかったりする場合があります。このような理由から、オフライン サポートと信頼性の高いパフォーマンスが [Progressive Web App](/web/progressive-web-apps/) における一般的な特徴となっています。完全なワイヤレス環境であっても、キャッシュやその他のストレージ テクニックを適切に利用すれば、ユーザー エクスペリエンスを大幅に向上させることができます。この投稿は、PWA のオフライン データ ストレージに関するアイデアをまとめたものです。有意義なエクスペリエンスをオフラインで提供するために必要な JSON ペイロード、画像、一般的な静的データについて考えてみましょう。




<div class="clearfix"></div>

##  推奨事項

データをオフラインで保存するための一般的な推奨事項を示します。


* URL 指定可能なリソースには、[**Cache API**](https://davidwalsh.name/cache)（[Service Worker](/web/fundamentals/primers/service-worker/) の一部）を使用します。
* その他のすべてのデータには、（[Promise](/web/fundamentals/getting-started/primers/promises) ラッパーで）[**IndexedDB**](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) を使用します。


その理由を次に示します。

両方の API は非同期です（IndexedDB はイベントベース、Cache API は Promise ベースです）。両方とも [Web Worker、ウィンドウ、および Service Worker](https://nolanlawson.github.io/html5workertest/) でも動作します。IndexedDB は[どこでも](http://caniuse.com/#feat=indexeddb)利用できます。Service Worker（および Cache API）は、Chrome、Firefox、Opera で[利用可能](https://jakearchibald.github.io/isserviceworkerready/)になりましたが、Edge については開発中です。IndexedDB の Promise ラッパーにより、IndexedDB ライブラリに付属の強力で複雑な機構（トランザクション、スキーマ バージョニングなど）の一部は隠されます。IndexedDB は[オブザーバー](https://github.com/WICG/indexed-db-observers)をサポートしているため、タブ間で簡単に同期を取ることができます。



Safari 10 は、最新の Tech Preview で[長年にわたる多くの IndexedDB バグ](https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26)を修正しました。注: 一部のユーザーの方は、Safari 10 の IndexedDB と PouchDB の安定性の問題に遭遇し、動作が少し遅いと感じたことがあるでしょう。さらに調査が行われるまでは、状況は異なっている可能性があります。ブラウザのバグをテストして報告し、@webkit や関連する OSS ライブラリの作成者が確認できるようにしてください。LocalForage、PouchDB、YDN、および Lovefield は、Safari ではデフォルトで WebSQL を使用しています（壊れた IndexedDB の機能テストを効率的に実行する方法がないため）。つまり、これらのライブラリは、余分な労力なしで Safari 10 で動作します（IndexedDB を直接使用しないだけでなく）。


PWA では、Cache API を使用したアプリシェル（JS / CSS / HTML シェル）を作成して静的リソースをキャッシュし、IndexedDB からオフライン ページデータを入力できます。IndexedDB のデバッグ サポートは、現在は [Chrome](/web/tools/chrome-devtools/iterate/manage-data/local-storage)（[Application] タブ）、Opera、[Firefox](https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector)（Storage Inspector）、および Safari（[Storage] タブ）で利用できます。





##  その他のストレージ メカニズムについて

ウエブ ストレージ（LocalStorage、SessionStorage など）は同期的であり、Web Worker のサポートはありません。また、サイズとタイプ（文字列のみ）が制限されています。Cookie には[固有の用途](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)がありますが、同期的であり、Web Worker のサポートはありません。また、サイズが制限されています。WebSQL は広範なブラウザ サポートがないため、その使用は推奨されていません。File System API は Chrome 以外のブラウザではサポートされていません。[File API](https://developer.mozilla.org/en-US/docs/Web/API/File) は [File and Directory Entries API](https://wicg.github.io/entries-api/) と [File API](https://w3c.github.io/FileAPI/) 仕様で改良されているものの、どちらも十分に成熟または標準化されていないため、まだ幅広く採用されていません。






##  保存可能な量

<table>
  <thead>
    <th>ブラウザ</th>
    <th>制限</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>空き領域の 6% 未満</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>空き領域の 10% 未満</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>50 MB 未満</td>
    </tr>
    <tr>
      <td>IE10</td>
      <td>250 MB 未満</td>
    </tr>
  <tbody>
</table>

Chrome と Opera では、ストレージは（API ごとではなく）オリジンごとです。両方のストレージ メカニズムでは、ブラウザの[割り当て](http://www.html5rocks.com/en/tutorials/offline/quota-research/)に到達するまでデータを保存します。アプリで [Quota Management
API](https://developer.mozilla.org/en-US/docs/Web/API/StorageQuota) を使用して現在使用している割り当てを確認できます。Chrome では、アプリは空きディスク領域の最大 6% を使用できます。Firefox では、アプリは空きディスク領域の最大 10% を使用できますが、50 MB のデータが保存されると、ユーザーはストレージを増やすよう要求されます。モバイル Safari のアプリは最大 50 MB を使用できますが、PC 用 Safari ではストレージは無制限です（5 MB を超えるとストレージを増やすよう要求されます）。IE10 以降では、250 MB で限度に達しますが、10 MB でユーザーに通知します。PouchDB は、IDB ストレージの動作を[追跡](https://pouchdb.com/faq.html#data_limits)します。


##  アプリで使用しているストレージ領域を知る方法

Chrome では、[Quota Management API](https://www.w3.org/TR/quota-api/) を使用して、現在使用されているストレージ領域のサイズとアプリで利用できるサイズを問い合わせることができます。新しい [Storage Quota Estimate
API](https://www.chromestatus.com/features/5630353511284736) を使用すると、Promise のサポートにより、オリジンで使用している割り当てを簡単に調べることができます。



##  キャッシュ エビクションの動作

<table>
  <thead>
    <th>ブラウザ</th>
    <th>エビクション ポリシー</th>
  </thead>
  <tbody>
    <tr>
      <td>Chrome</td>
      <td>Chrome が領域不足になったら LRU</td>
    </tr>
    <tr>
      <td>Firefox</td>
      <td>ディスク全体がいっぱいになったら LRU</td>
    </tr>
    <tr>
      <td>Safari</td>
      <td>エビクションなし</td>
    </tr>
    <tr>
      <td>Edge</td>
      <td>エビクションなし</td>
    </tr>
  <tbody>
</table>

オリジンには、好きなように利用できる領域が与えられます。この空き領域は、あらゆる形式のオリジン ストレージ（IndexedDB、Cache API、localStorage など）で共有されます。与えられる領域のサイズは決まっておらず、端末とストレージの条件によって異なります。


ウェブ ストレージが少なくなると、UA はストレージを消去して領域を使用できるようにします。これにより、オフラインの応答性が低下する可能性があるため、最近アップデートされた[ストレージ](https://storage.spec.whatwg.org/)仕様では、「永続性」および「ベスト エフォート」戦略（デフォルトは「ベスト エフォート」）が定義されています。「ベスト エフォート」ではユーザーを妨げることなくストレージを消去できますが、長期間のデータや重要なデータに対しては永続性が低くなります。現在、IndexedDB と Cache API は両方とも「ベスト エフォート」カテゴリに分類されます。


「永続性」ストレージは、ストレージが少なくなっても自動的に消去されることはありません。ユーザーが（ブラウザ設定により）手動でこのストレージを消去する必要があります。Chrome は、オリジン トライアルで[永続性ストレージ](/web/updates/2016/06/persistent-storage)のサポートをテストしており、最新のニュースで [Chrome 55](https://groups.google.com/a/chromium.org/d/msg/blink-dev/5Sihi1iAXYc/wnvNDFIPAQAJ) から対応することを示唆しています。






##  オフライン ストレージへの現在の取り組みとこれからの取り組み

オフライン ストレージに興味がある場合は、次の取り組みを常にチェックすることをお勧めします。


* [永続性ストレージ](https://storage.spec.whatwg.org/): ストレージをユーザー エージェントの消去ポリシーから保護します。


* [Indexed Database API 2.0](https://w3c.github.io/IndexedDB/): 高度なキー値データ管理。


* [Promise 化された IndexedDB](https://github.com/inexorabletash/indexeddb-promises): Promise 対応版の IndexedDB のネイティブ サポート。



* [IndexedDB オブザーバー](https://github.com/WICG/indexed-db-observers): データベースのラッパーを必要としないネイティブの IndexedDB 監視。


* [非同期 Cookie API](https://github.com/bsittler/async-cookies-api): ドキュメントや Worker 用の非同期の JavaScript Cookie API。


* [Quota Management API](https://www.w3.org/TR/quota-api/): アプリやオリジンが使用している割り当てを確認します。


* [書き込み可能ファイル](https://github.com/WICG/writable-files): サイトがローカル ファイルをよりシームレスに操作できるようにします。


* [ディレクトリ ダウンロード](https://github.com/drufball/directory-download): サイトが .zip ファイルなしでディレクトリをダウンロードできるようにします。


* [File and Directory Entries API](https://wicg.github.io/entries-api/): ドラッグ アンド ドロップによるファイルとディレクトリのアップロードのサポート。


* [非同期 Cookie API](https://github.com/WICG/async-cookies-api) のサポートは、現在 Polyfill を使用して概要を作成中です。



* IndexedDB のデバッグは、現在 Edge でサポートされていません（ただし、その基本となる JetDB はデバッグできます）。組み込みサポート実現のための賛成票を[ここで](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6517763-indexeddb-explorer-in-dev-tools)投票してください。




* 非同期 LocalStorage の[アイデア](https://github.com/slightlyoff/async-local-storage)は過去に検討されましたが、現在は [IndexedDB 2.0](https://w3c.github.io/IndexedDB/) を良好な状態で取得することに重点が置かれています。



* [書き込み可能ファイル](https://github.com/WICG/writable-files)の提案により、最終的には、シームレスなローカル ファイル操作のためのより優れた標準化過程ソリューションが提供される可能性があります。



* より永続性の高いストレージがアプリに必要な場合は、[永続性ストレージ](https://storage.spec.whatwg.org/)に関する継続的な取り組みをご覧ください。


オフライン ストレージは、それほど不思議なものではありません。基礎となる API を理解すると、現在手元にあるものを最大限に活用することができます。これらの API を直接使用する場合も、抽象化ライブラリを使用する場合も、少し時間をかけてオプションを理解していってください。




このガイダンスが、PWA に輝きを与えるようなオフライン エクスペリエンスを実現するのに役立つことを願っています。


###  背景資料

* [State of Offline Storage APIs](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit): Joshua Bell



* [Browser Database Comparison](http://nolanlawson.github.io/database-comparison/): Nolan Lawson


* [IndexedDB, WebSQL, LocalStorage  -  What Blocks the DOM?](https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/)


* [How to Think about Databases (Pokedex research)](https://nolanlawson.com/2016/02/08/how-to-think-about-databases/)


* [Which APIs are Supported in Web Workers and Service Workers?](https://nolanlawson.github.io/html5workertest/)


### 役立つリソース

* [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox)（動的 / ランタイム リクエストのオフライン キャッシュ）


* [sw-precache](https://github.com/GoogleChrome/sw-precache)（静的アセット / アプリシェルのオフライン プリキャッシュ）


* webpack ユーザーは、上記または [offline-plugin](https://github.com/NekR/offline-plugin) を直接使用できます。


###  確認する価値のある IndexedDB ライブラリ

* [localForage](https://github.com/localForage/localForage)（約 8 KB、Promise、適切な以前のブラウザのサポート）


* [Dexie](http://dexie.org/)（約 16 KB、Promise、複雑なクエリ、セカンダリ インデックス)


* [PouchDB](https://pouchdb.com/)（約 45 KB、[カスタムビルド](https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html)をサポート、同期）



* [Lovefield](https://github.com/google/lovefield)（リレーショナル）

* [LokiJS](http://lokijs.org/#/)（メモリ内）

* [ydn-db](https://github.com/yathit/ydn-db)（dexie に類似、WebSQL で動作）

**Nolan Lawson, Joshua Bell（Open Web Storage と [BlinkOn talk](https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit) への取り組みがこの記事を書くきっかけとなりました）、Jake Archibald、Dru Knox、およびその他の方々に、ウェブストレージ領域へのこれまでの取り組みに対し感謝の意を述べたいと思います。
**





{# wf_devsite_translation #}
