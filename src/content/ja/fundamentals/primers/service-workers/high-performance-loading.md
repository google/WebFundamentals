project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:Service Worker を実装することで、間違いなく最高のパフォーマンスを実現できます。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-09-21 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Service Worker 読み込みの優れたパフォーマンス {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}

[Service Worker](/web/fundamentals/getting-started/primers/service-workers) をウェブアプリに追加することで、すべての[従来のブラウザ キャッシュのベスト プラクティス](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)を超える非常に優れたパフォーマンスを得ることができます。
しかし、読み込み時間を最適化するため取るべきベスト プラクティスもいくつかあります。
 以下のヒントを活用して Service Worker を実装するなら、間違いなく最高のパフォーマンスを実現できるでしょう。


## まずナビゲーション リクエストとは何かを理解する

ナビゲーション リクエストについて、[Fetch 仕様](https://fetch.spec.whatwg.org/#navigation-request)では（簡潔に）「
<em>ナビゲーション[リクエスト](https://fetch.spec.whatwg.org/#concept-request)とは、『<code>document</code>』を[宛先](https://fetch.spec.whatwg.org/#concept-request-destination)とするリクエストである」と定義されています。
</em>この定義では、技術的には正しいものの、微妙な意味合いが表現されておらず、ウェブアプリのパフォーマンスにおけるナビゲーションの重要性が伝わりません。
 わかりやすく言うと、ナビゲーション リクエストは、ブラウザのロケーション バーに URL を入力したり、<code>[window.location](https://developer.mozilla.org/en-US/docs/Web/API/Window/location)</code>と対話したり、リンクをクリックしてあるウェブページから別のウェブページにアクセスしたりするときに発生します。
 ページに `<iframe>` を挿入するときにも、`<iframe>` の `src` を要求するナビゲーション リクエストが発生します。


注: [履歴 API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) とインプレイス DOM 変更に依存する[シングルページ アプリケーション](https://en.wikipedia.org/wiki/Single-page_application)は、あるビューから別のビューに切り替える際にナビゲーション リクエストを回避する傾向があります。
 とはいえ、シングルページ アプリのブラウザ セッションの最初のリクエストはナビゲーションです。


ウェブアプリは（スクリプト、画像、スタイルなどの要素の）すべてのコンテンツを表示するために他にも多くの[サブリソース リクエスト](https://fetch.spec.whatwg.org/#subresource-request)を作成しますが、それらのすべてのリクエストを始めるのはナビゲーション レスポンスの HTML です。
 最初のナビゲーション リクエストに対するレスポンスに何らかの遅延があると、しばらく画面に何も表示されず、否が応でもユーザーは遅延していると気付きます。



注: この場合 [HTTP/2 サーバー プッシュ](/web/fundamentals/performance/http2/#server_push)を使用すると、ナビゲーション レスポンスとともにサブリソース レスポンスを返すことができ、待ち時間が増えないので非常に便利です。
 しかし、リモート サーバーへの接続を確立する際に遅延が発生すると、クライアントにプッシュダウンされるデータも遅延してしまいます。



Service Worker ではなく HTTP `Cache-Control` ヘッダーに依存する従来の[キャッシュのベスト プラクティス](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#top_of_page)では、すべてのサブリソース URL が最新の状態であることを確認するために、[ナビゲーションのたびにネットワークにアクセスする](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#invalidating_and_updating_cached_responses)必要があります。
 ウェブ パフォーマンスの最終的な目標は、ネットワークに依存するナビゲーション リクエストを*使わなくてよいように*、サブリソースのアグレッシブ キャッシュを最大限に活用することです。
 Service Worker をサイト独自のアーキテクチャに合わせてきちんと構成して使用することで、それが可能になりました。



## 最高のパフォーマンスを得るために、ネットワークにアクセスせずにナビゲーションする

ウェブ アプリケーションに Service Worker を追加することによる最大の効果は、ナビゲーション リクエストに応答する際にネットワークで待つ必要がないということです。
 その最もよい例は、ウェブサーバーへの接続にかかる時間が、ローカルにキャッシュされたデータを読み込む時間より桁違いに長いという場合です。
 クライアントの接続が理想的な速度に達しない状況では（基本的にモバイル ネットワークを利用する場合がこれに該当します）、ネットワークから最初のバイトを取得するまでにかかる時間が HTML 全体をレンダリングするのにかかる時間の合計を上回ってしまうことが多々あります。





キャッシュ優先の Service Worker 実装が正しく選択されているかどうかは、主にサイトのアーキテクチャによって決まります。


### ストリーミング コンポジット レスポンス

もともと HTML が静的ヘッダーとフッター、およびリクエスト URL によって内容が異なる中間部分とに分かれている場合は、ストリーム レスポンスを使用してナビゲーションを処理するのが理想的です。
 このレスポンスは、別々にキャッシュされたそれぞれの部分を組み合わせて作ることができます。
 ストリームを使用することで、レスポンスの最初の部分ができるだけ早くクライアントに公開され、それによって HTML の構文解析とその他のサブリソースのリクエストがスムーズに進行します。




「[Stream Your Way to Immediate Responses（ストリームを使って迅速なレスポンスを実現）](/web/updates/2016/06/sw-readablestreams)」の記事にこの方法の基本的な概要が述べられていますが、実例とデモについては Jake Archibald の「[2016 年 - ウェブストリームの年](https://jakearchibald.com/2016/streams-ftw/)」が決定版です。




注: ネットワークにアクセスしないとナビゲーション リクエストに応答できないウェブアプリもあります。
 サイトの各 URL の HTML がコンテンツ管理システムのデータに依存していたり、さまざまなレイアウトが使用されていて一般的なアプリケーション シェル構造に適合しないサイトであったりすることもあります。
 そのような場合でも、Service Worker を使えば HTML 読み込みの*現状*を打破することが可能です。
ストリームを使用すれば、一般的なキャッシュされた HTML のチャンク（サイトの完全な `<head>` および最初の `<body>` 要素）を使用してナビゲーション リクエストに即座に応答しつつ、特定の URL に固有の残りの HTML をネットワークから読み込むことができます。




### 静的 HTML のキャッシング

静的 HTML 文書にまったく依存するシンプルなウェブアプリを使用しているなら、それは非常に好都合で、ネットワークを回避する方法は実に簡単です。
 以前にキャッシュした HTML を使用するナビゲーションに応答し、サイトの発展に応じてサイトの HTML を最新の状態に保つためのノンブロッキング ロジックも組み込まれている Service Worker が必要です。



1 つの方法は、ナビゲーション リクエストに [revalidate while revalidate ポリシー](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)を実装する Service Worker `fetch`ハンドラを使用するというものです。たとえば、次のようにします。



```js
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // See /web/fundamentals/getting-started/primers/async-functions
    // for an async/await primer.
    event.respondWith(async function() {
      // Optional:Normalize the incoming URL by removing query parameters.
      // Instead of https://example.com/page?key=value,
      // use https://example.com/page when reading and writing to the cache.
      // For static HTML documents, it's unlikely your query parameters will
      // affect the HTML returned. But if you do use query parameters that
      // uniquely determine your HTML, modify this code to retain them.
      const normalizedUrl = new URL(event.request.url);
      normalizedUrl.search = '';

      // Create promises for both the network response,
      // and a copy of the response that can be used in the cache.
      const fetchResponseP = fetch(normalizedUrl);
      const fetchResponseCloneP = fetchResponseP.then(r => r.clone());

      // event.waitUntil() ensures that the service worker is kept alive
      // long enough to complete the cache update.
      event.waitUntil(async function() {
        const cache = await caches.open('my-cache-name');
        await cache.put(normalizedUrl, await fetchResponseCloneP);
      }());

      // Prefer the cached response, falling back to the fetch response.
      return (await caches.match(normalizedUrl)) || fetchResponseP;
    }());
  }
});
```

別の方法は、[Workbox](https://workboxjs.org/) のようなツールを使用するというものです。これは、ウェブアプリのビルドプロセスにフックしてすべての静的リソース（HTML ドキュメントだけではない）を処理する Service Worker を生成し、キャッシュしたリソースを優先的に提供し、それらを最新の状態に保ちます。




### アプリケーション シェルの使用

既にシングルページ アプリケーションがある場合、[アプリケーション シェル アーキテクチャ](/web/fundamentals/architecture/app-shell)を実装するのが王道です。
 ネットワークに依存せずにナビゲーション リクエストを処理するための明確な戦略があります。それは、特定の URL に関係なく、各ナビゲーション リクエストを HTML ドキュメントのキャッシュされた汎用「シェル」のコピーで実行するという方法です。
 このシェルにはシングルページ アプリケーションをブートストラップするために必要なものすべてが含まれており、リクエストされた URL に固有のコンテンツはクライアント側のルーティング ロジックでレンダリングすることができます。



さらっと書くと、それに対応する Service Worker `fetch` ハンドラは次のようになります。


```js
// Not shown: install and activate handlers to keep app-shell.html
// cached and up to date.
self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    // Always respond to navigations with the cached app-shell.html,
    // regardless of the underlying event.request.url value.
    event.respondWith(caches.match('app-shell.html'));
  }
});
```

ここでも [Workbox](https://workboxjs.org/) が、`app-shell.html` をキャッシュして最新の状態に保たれるようにするとともに、キャッシュされたシェルを使用してナビゲーション リクエストに応答するための[ヘルパー](https://workboxjs.org/reference-docs/latest/module-workbox-sw.Router.html#registerNavigationRoute)を提供するという、この 2 つの役割を果たします。




## ⚠️ パフォーマンスの落とし穴

厄介なのは、キャッシュされたデータを使用してナビゲーションに応答することはできないものの、（[オフラインのフォールバック コンテンツ](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)を提供したり、[プッシュ通知を処理する](/web/fundamentals/getting-started/codelabs/push-notifications/)といった）他の機能のために Service Worker が必要であるという場合です。
 このとき、特に事前の対策をしていないと、Service Worker を追加したときに、パフォーマンス ヒットが発生してしまう可能性があります。
しかし、こうした落とし穴を避けるなら、パフォーマンスを安定させることができます。

### 「パススルー」フェッチ ハンドラは使用しない

プッシュ通知のためだけに Service Worker を使用している場合は、次のコードが必要であると誤認してしまったり、次のコードを単に処理をしないものと見なしてしまう可能性があります。



```js
// Don't do this!
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
```

このタイプの「パススルー」フェッチ ハンドラはすべてがウェブ アプリケーション内で動作し続けるため、ネットワーク リクエストが行われたときはいつでも小さなレイテンシ ヒットが発生します。
 Service Worker を未動作の状態から起動するとオーバーヘッドが発生し、リクエストを行ったクライアントに Service Worker からのレスポンスを渡してもオーバーヘッドが発生します。




Service Worker に `fetch` ハンドラがまったく含まれていない場合、一部のブラウザはそれを認識して、ネットワーク リクエストがあればいつでも[遅滞なく Service Worker を起動](https://github.com/w3c/ServiceWorker/issues/718)します。




### 適切な場合にナビゲーションのプリロードを使用する

特定のサブリソースのためのキャッシュ戦略を使用するために `fetch` ハンドラが*必要*なのに、アーキテクチャのせいでナビゲーション リクエストに応答できないという場合があります。
 あるいは、ナビゲーション レスポンスにキャッシュされたデータを使用するのはよしとしても、ページ読み込み後に最新のデータをスワップインするネットワーク リクエストは実行したいと思うかもしれません。



こうした事例の両方に最適なのが、[ナビゲーション プリロード](https://developer.mozilla.org/en-US/docs/Web/API/NavigationPreloadManager)という機能です。
 この機能は、Service Worker がナビゲーションに応答しないために起こりえる遅延を軽減することができます。
 この機能は、ページ読み込み後にクライアント側のコードで使用することが可能な最新データの「アウトオブバンド」リクエストにも使用できます。
 「[Speed up  Service Worker with Navigation Preload（ナビゲーション プリロードを使用して Service Worker をさらに高速化する）](/web/updates/2017/02/navigation-preload)」には、Service Worker を構成するために必要な情報が詳しく説明されています。




## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
