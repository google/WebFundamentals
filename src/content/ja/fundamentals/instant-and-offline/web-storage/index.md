project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-10-04 #}
{# wf_published_on: 2016-09-28 #}
{# wf_blink_components: Blink>Storage #}

# Web Storage Overview {: .page-title }

{% include "web/_shared/contributors/mco.html" %}

It’s important to choose the right storage mechanisms, both for local device
storage and for cloud based server storage. A good storage engine makes sure
your information is saved reliably, reduces bandwidth, and improves
responsiveness. The right storage caching strategy is a core building block for
enabling offline mobile web experiences.

This article provides a brief foundation for evaluating storage APIs and
services, after which we’ll provide a comparison table and some general
guidance. In the near future, we plan to add resources for understanding
selected storage topics in greater depth.

## Storage Taxonomy

Let’s start by understanding some of the dimensions by which we can analyze data
storage for web apps. Later, we’ll use this framework to enumerate and evaluate
the many storage options available to web developers.

### Data Model

The model for storing units of data determines how data is organized internally,
which impacts ease of use, cost and performance of storage and retrieval
requests.

- **構造化:** SQL ベースのデータベース管理システムに特有ですが、データは、事前定義されたフィールドを使用して表に格納され、幅広いクエリタイプが経験的に知られていないような状況で柔軟かつ動的なクエリに非常に役立ちます。構造化データストアの代表的な例として、ブラウザの IndexedDB があります。

- **キー値:** キー値データストアと関連する非 SQL データベースには、一意のキーでインデックスが登録された非構造化データを格納したり取得したりできる機能があります。キー値データストアは、インデックスが登録された不透明データに一定時間アクセスできるという点でハッシュ表に似ています。キー値データストアの代表的な例として、ブラウザの Cache API およびサーバー上の Apache Cassandra があります。

- **バイト ストリーム:** この単純なモデルは、データを可変長の不透明なバイト文字列として格納し、内部構造をアプリケーション層に委ねます。このモデルは、特にファイル システムやその他の階層構造のデータに適しています。バイト ストリーム データストアの代表的な例として、ファイル システムやクラウド ストレージ サービスがあります。

### Persistence

ウェブアプリのストレージ方法は、データの永続性が保持されるスコープに基づいて細かく分析できます。


- **セッション永続性:** このカテゴリのデータは、1 つのウェブ セッションまたはブラウザタブがアクティブである間のみ保持されます。 セッション永続性を持つストレージ メカニズムの例として、Session Storage API があります。

- **端末永続性:** このカテゴリのデータは、特定の端末内でセッションやブラウザタブ / ウィンドウをまたいで保持されます。 端末永続性を持つストレージ メカニズムの例として、Cache API があります。

- **グローバル永続性:** このカテゴリのデータは、セッションや端末をまたいで保持されます。 そのため、最も堅牢なデータ永続性です。グローバル永続性を持つストレージ メカニズムの例として、Google Cloud Storage があります。

### Browser Support

Developers should choose an API best suited to their problem domain; however,
they should also take into account the fact that standardized and well
established APIs are preferable to custom or proprietary interfaces, because
they tend to be longer lived and more widely supported. They may also enjoy a
broader knowledge base and a richer developer ecosystem.

### Transactions

Often, it is important for a collection of related storage operations to
succeed or fail atomically. Database management systems have traditionally
supported this feature using the transaction model, where related updates may be
grouped into arbitrary units. While not always necessary, this is a convenient,
and sometimes essential, feature in some problem domains.

### Sync/Async

Some storage APIs are synchronous in the sense that storage or retrieval
requests block the currently active thread until the request is completed. This
is particularly onerous in web browsers, where the storage request is sharing
the main thread with the UI. For efficiency and performance reasons,
asynchronous storage APIs are to be preferred.

## Comparison

In this section we take a look at the current APIs available for web developers
and compare them across the dimensions described above.


<table>
  <thead>
    <th>API</th>
    <th>Data
Model</th>
    <th>永続性</th>
    <th>ブラウザ対応</th>
    <th>トランザクション</th>
    <th>同期 / 非同期</th>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/FileSystem">File system</a></td>
      <td>Byte stream</td>
      <td>device</td>
      <td><a href="http://caniuse.com/#feat=filesystem">52%</a></td>
      <td>No</td>
      <td>Async</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">
          Local Storage
        </a>
      </td>
      <td>key/value</td>
      <td>device</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>No</td>
      <td>Sync</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">
          Session Storage
        </a>
      </td>
      <td>key/value</td>
      <td>session</td>
      <td><a href="http://caniuse.com/#feat=namevalue-storage">93%</a></td>
      <td>No</td>
      <td>Sync</td>
    </tr>
    <tr>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a></td>
      <td>structured</td>
      <td>device</td>
      <td>100%</td>
      <td>No</td>
      <td>Sync</td>
    </tr>
    <tr>
      <td><a href="https://www.w3.org/TR/webdatabase/">WebSQL</a></td>
      <td>structured</td>
      <td>device</td>
      <td><a href="http://caniuse.com/#feat=sql-storage">77%</a></td>
      <td>Yes</td>
      <td>Async</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage">Cache</a>
      </td>
      <td>key/value</td>
      <td>device</td>
      <td><a href="http://caniuse.com/#feat=serviceworkers">60%</a></td>
      <td>No</td>
      <td>Async</td>
    </tr>
    <tr>
      <td>
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API">IndexedDB</a>
      </td>
      <td>hybrid</td>
      <td>device</td>
      <td><a href="http://caniuse.com/#feat=indexeddb">83%</a></td>
      <td>Yes</td>
      <td>Async</td>
    </tr>
    <tr>
      <td><a href="https://cloud.google.com/storage/">cloud storage</a></td>
      <td>byte stream</td>
      <td>global</td>
      <td>100%</td>
      <td>No</td>
      <td>Both</td>
    </tr>
  </tbody>
<tbody>
</tbody>
</table>


As noted above, it’s wise to choose APIs that are widely supported across as
many browsers as possible and which offer asynchronous call models, to maximize
interoperability with the UI. These criteria lead naturally to the following
technology choices:

- For offline storage, use the [Cache API](cache-api). This API is available in any browser that
    supports [Service Worker technology](https://jakearchibald.github.io/isserviceworkerready/)
    necessary for creating offline apps. The Cache API is ideal for storing resources associated with a
    known URL.

- For storing application state and user-generated content, use IndexedDB. This enables users to
    work offline in more browsers than just those that support the Cache API.

- For global byte stream storage: use a Cloud Storage service.

This combination satisfies the basic storage needs for many mobile web apps.

## Debugging storage in Chrome DevTools {: #devtools }

Check out the following docs to learn more about using Chrome DevTools to
inspect and debug your web storage API of choice. APIs not mentioned
here are either not supported in DevTools or are not applicable.

- [Local Storage](/web/tools/chrome-devtools/manage-data/local-storage#local-storage)
- [Session Storage](/web/tools/chrome-devtools/manage-data/local-storage#session-storage)
- [Cookies](/web/tools/chrome-devtools/manage-data/cookies)
- [Web SQL](/web/tools/chrome-devtools/manage-data/local-storage#web-sql)
- [Cache](/web/tools/chrome-devtools/progressive-web-apps#caches)
- [IndexedDB](/web/tools/chrome-devtools/manage-data/local-storage#indexeddb)

If you're using multiple storage APIs, check out the Clear Storage feature of
DevTools. This feature lets you clear multiple stores with a single button
click. See [Clear service workers, storage, databases, and
caches](/web/tools/chrome-devtools/manage-data/local-storage#clear-storage) for
more information.

## Where to go next…

Now that we’ve reviewed some of the relevant ways to think about storage
mechanisms and compared the most popular APIs and services available today,
we'll be adding more content soon to dive more deeply into one or more topics
of interest:

- [Offline Storage Recommendations for Progressive Web Apps](offline-for-pwa)
- [Deep Dive: Cache API](cache-api)
