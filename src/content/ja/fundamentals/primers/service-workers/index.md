project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブ アプリを必要としていた機能が Web にもやってきます。 Service Worker はそれらの機能を提供する基盤技術です。

{# wf_published_on: 2014-12-01 #}
{# wf_updated_on: 2020-07-24 #}
{# wf_blink_components: Blink>ServiceWorker #}

# Service Worker の紹介 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブアプリを必要としていた機能が Web にもやってきます。
 Service Worker はそれらの機能を提供する基盤技術です。


## Service Worker とは

Service Worker はブラウザが Web ページとは別にバックグラウンドで実行するスクリプトで、Web ページやユーザーのインタラクションを必要としない機能を Web にもたらします。
 既に現在、[プッシュ通知](/web/updates/2015/03/push-notifications-on-the-open-web)や[バックグラウンド同期](/web/updates/2015/12/background-sync)が提供されています。
 さらに将来は定期的な同期、ジオフェンシングなども導入されるでしょう。
このチュートリアルで説明する機能は、ネットワーク リクエストへの介入や処理機能と、レスポンスのキャッシュをプログラムから操作できる機能です。



この API にとてもわくわくするのは、それがオフライン体験をサポートし、そして開発者がその体験を完全に制御できるからです。



Service Worker 以前にも、オフライン体験を Web にもたらすものとして [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/){: .external }というものがありました。
AppCache API にはいくつもの問題があり、Service Worker はこれらの弱点を避けるように設計されています。


Service Worker について、知っておきたいことは次のとおりです。

* Service Worker は [JavaScript Worker](//www.html5rocks.com/en/tutorials/workers/basics/){: .external } のひとつです。そのため DOM に直接アクセスできません。
 その代わり、Service Worker は、制御するページとの通信を [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) インターフェースで送られるメッセージに応答することで行い、それらのページで DOM を操作できます。
* Service Worker はプログラム可能なネットワーク プロキシです。ページからのネットワーク リクエストを制御できます。
* Service Worker は使用されていない間は終了しており、必要なときになったら起動します。そのため `onfetch` や `onmessage` ハンドラ内でグローバルに設定したステートを頼りに実行させることはできません。
 持続的で再利用可能な情報を Service Worker の複数のライフサイクル間で共有したい場合は、[IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) にアクセスする必要があります。
* Service Worker は JavaScript の Promises を多用します。Promises についてよく知らない方はこの記事を読むのをいったん止めて、[Promises: 概要](/web/fundamentals/getting-started/primers/promises)の記事をお読みください。



## Service Worker のライフサイクル

Service Worker はウェブページとはまったく異なるライフサイクルで動作します。

サイトの Service Worker をインストールするには、ページの JavaScript から登録する必要があります。
 Service Worker を登録すると、ブラウザは Service Worker のインストール処理をバックグラウンドで実行します。


一般的に言って、インストール中に、いくつかの静的なアセットをキャッシュすることでしょう。 すべてのファイルがキャッシュされたら、Service Worker のインストールは完了です。
 もしファイルがひとつでもダウンロードもしくはキャッシュに失敗した場合、インストールステップは失敗し Service Worker はアクティベートされません
 （つまりインストールされません）。 失敗しても心配しないでください。またやり直します。
 逆にもし Service Worker がインストールされたなら、静的なアセットが確実にキャッシュされているということなのです。


インストールが完了したら、アクティベーション処理が続きます。この段階は古いキャッシュの処理などに最適です。これについては Service Worker の更新のセクションで詳しく説明します。



アクティベーションステップが終了したら、Service Worker はそのスコープ内のすべてのページを制御します。しかし、Service Worker を登録したページについては登録時点では制御されず、次に読み込まれた際に制御されるようになります。
 Service Worker が制御を行っている間、その状態は 2 つしかありません。メモリ節約のため Service Worker は終了しているか、ページで起こったネットワーク リクエストまたはメッセージに対して fetch イベントもしくは message イベントの処理を行おうとしているかのどちらかです。




次の図は最初のインストール後の Service Worker のライフサイクルをおおまかに図示したものです。


![Service Worker のライフサイクル](images/sw-lifecycle.png)


## 前提条件

### サポートしているブラウザを使う

Service Worker をサポートするブラウザは増えています。 現在 Service worker は Chrome と Firefox と Opera でサポートされています。
 Microsoft Edge も[支持を表明](https://developer.microsoft.com/en-us/microsoft-edge/status/serviceworker/)しています。
Safari も[将来の展開を示唆](https://trac.webkit.org/wiki/FiveYearPlanFall2015)しています。
ブラウザによるサポート状況は、Jake Archibald による [is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/){: .external }
サイトで確認できます。

### HTTPS が必要

開発中は、`localhost` から Service Worker を使用できますが、サイトにデプロイするには、サーバーで HTTPS が設定されている必要があります。


Service Worker を使うと接続のハイジャック、改ざん、フィルタリングができてしまいます。
 とても強力です。 良いことに使えばそれでよいのですが、攻撃を行う中間者はそうではないでしょう。
 悪用を避けるために、Service Worker は HTTPS を介して提供されるページでしか登録できません。こうすることで、ブラウザで受信する Service Worker がネットワークを経由して送信される途中で改ざんされていないことを保証できます。



[GitHub Pages](https://pages.github.com/){: .external }
は HTTPS で提供されるので、デモをホストするには絶好の環境です。

サーバーに HTTPS を設定する場合は、TLS 証明書を取得してサーバーにセットアップしなければなりません。
 セットアップ方法は環境によるので、サーバーのドキュメントを読み、そして [Mozilla の SSL コンフィグ ジェネレータ](https://mozilla.github.io/server-side-tls/ssl-config-generator/)を使ってベスト プラクティスを見つけてください。




## Service Worker の登録

Service Worker をインストールするには、まずページから Service Worker を**登録**しプロセスを開始しなければなりません。
 登録によって、ブラウザに Service Worker の JavaScript ファイルの場所が知らされます。


    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
          // Registration was successful
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
          // registration failed :(
          console.log('ServiceWorker registration failed: ', err);
        });
      });
    }

このコードはまず、Service Worker API が利用可能かチェックし、利用可能であれば、[ページを読み込む](/web/fundamentals/instant-and-offline/service-worker/registration)ときに `/sw.js` にある Service Worker を登録します。



ページが読み込まれるたびに `register()` メソッドが呼ばれますが、心配はいりません。ブラウザは Service Worker が既に登録されているかどうかを調べ、結果に応じて登録処理をするかしないか判断してくれます。



`register()` メソッドについて気にかけておきたいところが、Service Worker ファイルの場所です。
 この例の場合、Service Worker のファイルはドメインのルートにあります。
 これはこの Service Worker のスコープが origin 全体ということです。
 つまり、この Service Worker はこのドメインのすべての `fetch` イベントを受け取ります。
 もし `/example/sw.js` にある Service Worker ファイルを登録した場合、その Service Worker は `fetch` イベントのうちページの URL が `/example/` から始まるもの（例: `/example/page1/`、`/example/page2/`）のみを受け取ります。

Service Worker が有効になっているかどうかは、`chrome://inspect/#service-workers` にある自分のサイトからわかります。


![Service Worker の調査](images/sw-chrome-inspect.png)

Service Worker が Chrome で実装された当初は、`chrome://serviceworker-internals` からその詳細を確認できました。
 これも Service Worker のライフサイクルを知りたいというだけの場合には有用かもしれません。ただもし今後 `chrome://inspect/#service-workers` に置き換わってもびっくりしないでください。




Service Worker のテストはシークレット ウインドウで行うと便利です。というのも、ウインドウを閉じてまた新しいウインドウにすれば、古い Service Worker に影響されることがないからです。
 シークレット ウインドウへの登録やキャッシュは、そのウインドウが閉じられたらすべて消去されます。



## Service Worker のインストール

制御されたページが登録プロセスを発生させると、主役は Service Worker のスクリプトに移ります。そしてスクリプトは `install` イベントを処理します。


最も簡単なケースとして、install イベントにコールバックを定義し、キャッシュさせたいファイルを指定します。


    self.addEventListener('install', function(event) {
      // Perform install steps
    });


この `install` コールバック内で、次のステップを実行する必要があります。

1. キャッシュを開きます。
2. ファイルをキャッシュします。
3. 必要なアセットがすべてキャッシュされたか確認します。

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];

    self.addEventListener('install', function(event) {
      // Perform install steps
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


ここでは、好きなキャッシュ名をつけて `caches.open()` をコールし、その後キャッシュさせたいファイルの配列を `cache.addAll()` に渡しています。
 一連の処理は Promise をチェーンさせています（`caches.open()` と `cache.addAll()`）。
 `event.waitUntil()` メソッドは Promise をとり、インストールにかかる時間と、インストールが成功したかどうかを知るために使われます。



渡したファイルがすべて無事にキャッシュされた場合、Service Worker のインストールが完了します。
 渡したファイルのうち**どれかひとつでも**ダウンロードに失敗した場合、インストールは失敗します。
 こうすることにより定義したすべてのアセットが存在していると保証できますが、インストール時にキャッシュさせるファイルは慎重に決めなければいけません。
 ファイルの数が多くなれば、いずれかのファイルのキャッシュが失敗して Service Worker がインストールされない確率も高くなります。



これはあくまで一例です。`install` イベントでは他の処理もできますし、`install` にイベン トリスナーを設定しなくてもいいのです。


## リクエストをキャッシュして返す

Service Worker がインストールされた今、あなたがしたいのはキャッシュさせたレスポンスを返すことですね？


Service Worker がインストールされた状態で、他のページヘ移動したりページを更新したりすると、Service Worker は `fetch` イベントを受け取ります。



    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });


この例では `fetch` イベントを定義し、`event.respondWith()` 内で `caches.match()` から Promise を渡しています。
 このメソッドはリクエストを確認して、Service Worker が作成したあらゆるキャッシュの中から、キャッシュされた結果すべてを検出します。


一致するレスポンスがある場合は、キャッシュされた値を返します。そうでない場合は、`fetch` への呼び出しの結果を返します。この呼び出しはネットワーク リクエストを行い、ネットワークからデータを取得できた場合に、そのデータを返します。
 インストール時にキャッシュしたアセットは、基本的にこのようにして使います。


もし新しいリクエストを逐次キャッシュさせたい場合は、つぎのように、fetch リクエストのレスポンスを処理しキャッシュに追加すればよいのです。



    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response;
            }

            // IMPORTANT:Clone the request. A request is a stream and
            // can only be consumed once. Since we are consuming this
            // once by cache and once by the browser for fetch, we need
            // to clone the response.
            var fetchRequest = event.request.clone();

            return fetch(fetchRequest).then(
              function(response) {
                // Check if we received a valid response
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }

                // IMPORTANT:Clone the response. A response is a stream
                // and because we want the browser to consume the response
                // as well as the cache consuming the response, we need
                // to clone it so we have two streams.
                var responseToCache = response.clone();

                caches.open(CACHE_NAME)
                  .then(function(cache) {
                    cache.put(event.request, responseToCache);
                  });

                return response;
              }
            );
          })
        );
    });


ここでは以下のことを実行しています。

1. `fetch` リクエストに対する `.then()` にコールバックを追加します。
2. レスポンスを取得したら、以下のチェックを行います。
    1. レスポンスが正しいか確認します。
    2. レスポンスのステータスコードが 200`200` かチェックします。
    3. レスポンスの型が **basic** であることを確認します。これは、リクエストの送信元と送信先のドメインが同じであることを示します。
 これはまた、サードパーティのアセットへのリクエストがキャッシュされないことも意味します。
3. チェックが通ったら、レスポンスを [clone](https://fetch.spec.whatwg.org/#dom-response-clone) します。
 これはレスポンスが [Stream](https://streams.spec.whatwg.org/){: .external } なので、
その中身を一度しか使えないからです。
 この例ではレスポンスをブラウザに返すだけではなく、キャッシュにも渡さなければいけません。そのため、レスポンスを clone して、ひとつをブラウザに、もうひとつをキャッシュに渡します。



## Service Worker の更新 {: #update-a-service-worker }

開発が進むと、やがて Service Worker を更新しなければいけないときが来ます。
 更新は以下の手順で行います。

1. Service Worker の JavaScript ファイルを更新します。 ユーザーがサイトに移動してきたとき、ブラウザは Service Worker を定義するスクリプト ファイルをバックグラウンドで再度ダウンロードしようとします。
 現在ブラウザが保持しているファイルとダウンロードしようとするファイルにバイトの差異がある場合、それは「_新しい_」と認識されます。
2. 新しい Service Worker がスタートし、`install` イベントが起こります。
3. この時点では、まだ古い Service Worker が現在のページを制御しているため、新しい Service Worker は `waiting` 状態になります。
4. 開かれているページが閉じると、古い Service Worker は終了し、新しい Service Worker がページを制御するようになります。
5. 新しい Service Worker がページを制御するようになると、`activate` イベントが起こります。


`activate` コールバックで一般に行われるタスクが、キャッシュの管理です。
`activate` コールバックでキャッシュを管理する必要がある理由の 1 つは、インストール ステップで古いキャッシュをすべて消去すると、現在のページすべてを制御している古い Service Worker が突然、そのキャッシュからファイルを提供することができなくなるためです。




たとえば、`'my-site-cache-v1'` というキャッシュが 1 つあり、これをページ用の 1 つのキャッシュと、ブログ投稿用の 1 つのキャッシュに分割する必要があるとしましょう。
この場合、インストール ステップで 2 つのキャッシュ（`'pages-cache-v1'` と
`'blog-posts-cache-v1'`）を作成し、アクティベーション ステップで古い
`'my-site-cache-v1'` を削除する必要があります。

次のコードは、Service Worker のすべてのキャッシュをループ処理して、キャッシュのホワイトリストに定義されていないキャッシュをすべて削除することで、この処理を行います。




    self.addEventListener('activate', function(event) {

      var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheAllowlist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });

## つまずきやすいポイント

Service Worker はまだ新しい技術です。 ここでは、つまずきやすいポイントをまとめています。
 早くこのセクションがなくなればいいですが、いま Service Worker で何かをする場合は以下の点を気に留めておいてください。



### インストールが失敗したときのフィードバックが少ない

Worker が登録されても `chrome://inspect/#service-workers`
や `chrome://serviceworker-internals` に現れない場合、エラーがスローされたか`event.waitUntil()`
に渡された Promise が reject されたためインストールが失敗した可能性が高いです。


回避策は、`chrome://serviceworker-internals` にアクセスし、[Open DevTools window and pause JavaScript execution on service worker startup for debugging] にチェックを入れて、install イベントの開始時に debugger 文を記述してください。
これを、[Pause on uncaught exceptions](/web/tools/chrome-devtools/javascript/breakpoints) とともに使用すると、問題が明らかになります。




### fetch() の既定動作

#### 既定では認証情報が含まれない

`fetch` を使用する場合、既定では、リクエストに Cookie などの認証情報は含まれません。
 認証情報が必要な場合は、代わりに次のような呼び出しを行います。

    fetch(url, {
      credentials: 'include'
    })


この動作は意図的なもので、XHR の複雑な既定動作（URL が同一ドメインの場合は認証情報を送信し、そうでない場合は認証情報を省略する）より明らかに優れています。
 fetch の動作はむしろ、`<img
crossorigin>` などの他の CORS リクエストに似ています。これは、`<img
crossorigin="use-credentials">` で指定しない限り、Cookie を送信しません。

#### 非 CORS が既定で失敗する

既定では、サードパーティ URL からのリソースの取得は、この URL が CORS をサポートしていない場合、失敗します。
 リクエストに `no-CORS` オプションを追加することでこれを解決できますが、こうするとレスポンスが「不透明」になります。つまり、レスポンスが成功したのかどうかを判断できなくなります。



    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });


### レスポンシブ イメージの処理

`srcset` 属性または `<picture>` 要素は、実行時に最も適切なイメージ アセットを選択し、ネットワーク リクエストを行います。


Service Worker インストール ステップでのイメージのキャッシュには、以下のいくつかのオプションがあります。


1. `<picture>` 要素や `srcset`
属性でリクエストされる画像すべてをインストールする。
2. 低解像度版の画像を 1 つだけインストールする。
3. 高解像度版の画像を 1 つだけインストールする

すべてのイメージをダウンロードすることはストレージ スペースの無駄使いなので、オプション 2 または 3 を選ぶのが現実的です。


インストール時に低解像度バージョンを選び、ページが読み込まれたらネットワークから高解像度のイメージの取得を試み、高解像度イメージの取得に失敗したら、低解像度バージョンにフォールバックするとしましょう。
 これはいい考えですが、1 つ問題があります。


次の 2 つのイメージがあるとします。

| 画面密度 | 幅 | 高さ |
|-------------- | ----- | ------|
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

`srcset` イメージでは、次のようなマークアップが使用されます。


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />


画面密度が 2x の場合、ブラウザは `image-2x.png` をダウンロードします。オフラインの場合は、このリクエストを `.catch()` し、`image-src.png`
がキャッシュされていれば代わりにこれを返します。ただし、ブラウザは 2x 画面で表示するためのピクセル数が多いイメージを想定しているので、イメージは 400 x 400 CSS ピクセルではなく 200 x 200 CSS ピクセルで表示されます。
 これを回避する唯一の方法は、イメージに固定の高さと幅を設定することです。



    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
     style="width:400px; height: 400px;" />


アート ディレクションで使用される `<picture>` 要素の場合、これはかなり難しくなり、イメージの作成方法と使用方法に大きく依存しますが、srcset の場合と同じようなアプローチを使用することもできます。



## 詳細を見る

Service Worker に関する便利なドキュメントが
[https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html)
にまとめられています。

## 質問する

行き詰まったら、StackOverflow に質問を投稿してください。投稿する際は、'[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' タグを付けてください。Google はこのタグの付いた質問を追跡し、できるだけ回答するようにしています。



## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
