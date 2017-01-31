project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブアプリを必要としていた機能が Web にもやってきます。Service Worker はそれらの機能を提供する基盤技術です。

{# wf_updated_on: 2016-08-16 #}
{# wf_published_on: 2014-12-01 #}

# Service Worker の紹介 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

リッチなオフライン体験、定期的なバックグラウンド同期、プッシュ通知など、これまでネイティブアプリを必要としていた機能が Web にもやってきます。Service Worker はそれらの機能を提供する基盤技術です。

## Service Worker とは

Service Worker はブラウザが Web ページとは別にバックグラウンドで実行するスクリプトで、Web ページやユーザのインタラクションを必要としない機能を Web にもたらします。すでに現在、[プッシュ通知](/web/updates/2015/03/push-notifications-on-the-open-web)や[バックグラウンド同期](/web/updates/2015/12/background-sync)が提供されています。さらに将来は定期的な同期、ジオフェンシングなども導入されるでしょう。このチュートリアルで説明する機能は、ネットワークリクエストへの介入や処理機能と、レスポンスをプログラムから操作できるキャッシュ機能です。

この API にとてもわくわくするのは、それがオフライン体験をサポートし、そして開発者がその体験を完全にコントロールできるからです。

Service Worker 以前にも、オフライン体験を Web にもたらすものとして [AppCache](//www.html5rocks.com/en/tutorials/appcache/beginner/) というものがありました。しかし AppCache の重大な問題として、[たくさんの意図しない挙動](http://alistapart.com/article/application-cache-is-a-douchebag)があったこと、シングルページ Web アプリにはうまく動いてくれたものの、複数のページにまたがるサイトではうまく動いてくれないという設計がありました。Service Worker はこれらの弱点を避けるように設計されています。

Service Worker について、知っておきたいことは次のとおりです。

* Service Worker は [JavaScript Worker](http://www.html5rocks.com/ja/tutorials/workers/basics/) のひとつです。ですので DOM に直接アクセスできません。Service Worker がコントロールするページとの通信は [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) インターフェースから送られるメッセージに返信することで行えます。DOM を操作したい場合は、コントロールするページ経由で行えます。
* Service Worker はプログラム可能なネットワークプロキシです。ページからのネットワークリクエストをコントロールできます。
* Service Worker は使用されていない間は終了され、必要な時になったら起動します。ですので `onfetch`、`onmessage` ハンドラ内でグローバルに設定したステートに依存できません。持続的で再利用可能な情報を Service Worker のライフサイクル間で共有したい場合は、[IndexedDB API](https://developer.mozilla.org/ja/docs/Web/API/IndexedDB_API) API にアクセスしなければいけません。
* Service Worker は JavaScript の Promises を多用します。Promises についてよく知らない方はこの記事を読むのをいったん止めて、[Jake Archibaldの記事](/web/fundamentals/primers/promises/)を読みましょう。


## Service Worker のライフサイクル 


Service Worker は Web ページとはまったく異なるライフサイクルで動作します。

Service Worker を Web ページにインストールするには、ページの JavaScript から登録しなければいけません。Service Worker の登録をすると、ブラウザは Service Worker のインストール処理をバックグラウンドで実行します。

インストールは、静的なアセットをキャッシュするために使われることが多いでしょう。すべてのファイルがキャッシュされたら、Service Worker のインストールは完了です。もしファイルがひとつでもダウンロード失敗、もしくはキャッシュに失敗した場合、インストールステップは失敗し Service Worker はアクティベートされません（つまりインストールされません）。ただ、失敗しても心配しないでください。またトライしますから。どういうことかというと、Service Worker がインストールされたなら、静的なアセットが確実にキャッシュされているということなのです。

インストールが完了したら、アクティベーション処理が続きます。ここでは古いキャッシュの処理などに最適です。これは [Service Worker の更新](#update-a-service-worker/)を説明する時に紹介しますね。

アクティベーションステップが終了したら、Service Worker はそのスコープ内のすべてのページをコントロールします。しかし、Service Worker を登録したページについては登録時点ではコントロールされず、次に読み込まれた際にコントロールされます。Service Worker が管理中、その状態は2つしかありません。メモリ節約のため Service Worker が終了されているか、ページで起こったネットワークリクエストまたはメッセージに対して `fetch` イベントもしくは `message` イベントの処理を行おうとしているかのどちらかです。

次の図は最初のインストール後の Service Worker のライフサイクルをおおまかに図示したものです。

![service worker lifecydle](imgs/sw-lifecycle.png)


## はじめる前に 


はじめる前に、まずちゃんとした環境を整えているかを確かめましょう。

### サポートしているブラウザを使う

Service Worker をサポートするブラウザは増えています。現在は Firefox と Opera でサポートされています。Microsoft Edge も[支持を表明](https://dev.windows.com/en-us/microsoft-edge/platform/status/serviceworker)しています。Safariも[将来の展開を示唆](https://trac.webkit.org/wiki/FiveYearPlanFall2015)しています。ブラウザの実装状況は、Jake Archibald による [is Serviceworker ready](https://jakearchibald.github.io/isserviceworkerready/) で確認できます。

#### Chrome のバージョンは？

もし Chrome 46 以降のバージョンを使っていない場合は、[アップグレードしてください](https://support.google.com/chrome/answer/95414)。Chrome 46 より前のバージョンでは、Service Worker で必要になるだろう機能、たとえば `Cache.addAll()` などが使えません。

もし古いバージョンの Chrome に固定されている場合、足りない機能を補う [polyfill](https://github.com/coonsta/cache-polyfill) があります。`dist/serviceworker-cache-polyfill.js` をサイトのどこかにコピーし、Service Worker のスクリプトから `importScripts()` メソッドで呼び出します。インポートされたすべてのスクリプトは Service Worker によってキャッシュされます。


    importScripts('serviceworker-cache-polyfill.js');
    

### HTTPS が必要

Service Worker は `localhost` では動作しますが、デプロイ時にはサーバに HTTPS を設定しなければいけません。

Service Worker を使うと接続へのハイジャック、改ざん、フィルタリングができてしまいます。とても強力です。良いことに使えばそれでよいのですが、中間者（man-in-the-middle）はそうではないかもしれません。これを防ぐため、Service Worker は HTTPS で提供されるページのみに登録できるようになっています。こうすることでブラウザが受け取る Service Worker は、ネットワークの旅の途中で改ざんされていないことを保証できます。

[Github Pages](https://pages.github.com/) は HTTPS で提供されるので、デモをホストするには絶好の環境です。

サーバに HTTPS を設定したい場合は、TLS 証明書を取得しサーバにセットアップしなければなりません。セットアップ方法は環境によるので、サーバのドキュメントを読み、そして [Mozilla の SSL コンフィグジェネレータ](https://mozilla.github.io/server-side-tls/ssl-config-generator/)を使ってベストプラクティスを得てください。


## Service Worker の登録 



Service Worker をインストールするには、ページから Service Worker を<strong>登録</strong>しなければいけません。登録によって、ブラウザに Service Worker の JavaScript ファイルの場所を知らせられます。


    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // 登録成功
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(function(err) {
        // 登録失敗 :(
        console.log('ServiceWorker registration failed: ', err);
      });
    }
    

このコードはまず、Service Worker API が存在しているかをチェックし、あればさらに `/sw.js` にある Service Worker が登録されてるかをチェックします。

ページが読み込まれるたびに `register()` メソッドが呼ばれますが、心配はいりません。ブラウザは Service Worker が登録されているかを調べてから登録処理をするかしないか判断してくれます。

`register()` メソッドについて気にかけておきたいところが、Service Worker ファイルの場所です。この例の場合、Service Worker のファイルはドメインのルートにあります。これはこの Service Worker のスコープが origin 全体ということです。つまり、この Service Worker はこのドメイン下ですべての `fetch` イベントを受け取ります。もし `/example/sw.js` という Service Worker ファイルを登録した場合、その Service Worker はページのパスが `/example/` から始まるもの（例：`/example/page1/`, `/example/page2`）のみの `fetch` イベントを受け取ります。

Service Worker が有効になっているかは、`chrome://inspect/#service-workers` にある自分のサイトからわかります。

![Service Worker の調査](imgs/sw-chrome-inspect.png)

Service Worker が Chrome で実装された当初は、`chrome://serviceworker-internals` からその詳細を確認できました。これも Service Worker のライフサイクルを知りたいというだけの場合には有用かもしれません。ただもし今後 `chrome://inspect/#service-workers` に置き換わってもびっくりしないでくださいね。

Service Worker のテストはシークレットウインドウで行うと便利です。というのもウインドウを閉じてまた新しいウインドウにすれば、古い Service Worker に影響されることがないからです。シークレットウインドウへの登録やキャッシュは、そのウインドウが閉じられたらすべて消去されます。


## Service Worker のインストール 



コントロールされたページが登録プロセスを発生させると、主役は Service Worker のスクリプトに移ります。そしてスクリプトは `install` イベントを処理します。

最も簡単なケースとして、`install` イベントにコールバックを定義し、キャッシュさせたいファイルを指定します。


    self.addEventListener('install', function(event) {
      // インストール処理
    });
    

セットしたコールバックでは以下を実行しています。

1. キャッシュを開く
2. ファイルをキャッシュさせる
3. 必要なアセットがすべてキャッシュされたかを確認する

<div style="clear:both;"></div>

    var CACHE_NAME = 'my-site-cache-v1';
    var urlsToCache = [
      '/',
      '/styles/main.css',
      '/script/main.js'
    ];
    
    self.addEventListener('install', function(event) {
      // インストール処理
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
          })
      );
    });


ここでは、好きなキャッシュ名をつけ `caches.open()` をコールし、その後キャッシュさせたいファイルの配列を `cache.addAll()` に渡しています。一連の処理は `Promise` をチェーンさせています（`caches.open()` と `cache.addAll()`）。 `event.waitUntil()` は `Promise` をとり、インストールにかかる時間と、与えた処理が成功したかどうかを知るために使われます。

渡したファイルがすべて無事にキャッシュされた場合、Service Worker のインストールが完了します。渡したファイルのうち**どれかひとつでも**ダウンロードに失敗した場合、インストールは失敗します。こうすることによりすべてのアセットが存在していると保証できますが、インストール時にキャッシュさせたいファイルを決めなければいけません。ファイルの数が大きくなれば、キャッシュが失敗して Service Worker がインストールされない確率も高くなります。

これはあくまで一例です。`install` イベントでは他の処理もできますし、`install` にイベントリスナを設定しなくてもいいのです。


## リクエストをキャッシュして返す 



Service Worker がインストールされたいま、あなたがしたいのはキャッシュさせたレスポンスを返すことですよね？

Service Worker がインストールされた状態で、他のページヘ移動したりページを更新したりすると、Service Worker は `fetch` イベントを受け取ります。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // キャッシュがあったのでそのレスポンスを返す
            if (response) {
              return response;
            }
            return fetch(event.request);
          }
        )
      );
    });
    

ここでは `fetch` イベント内に `event.respondWith()` を定義しています。その中には `caches.match()` の Promise を渡しています。`caches.match()` はリクエストを見て、Service Worker が生成したキャッシュの中に該当するものがあるかを探します。

ここでは、マッチするレスポンスがある場合はその値を返し、そうでない場合はコール結果を `fetch()` に渡しています。これによりネットワークリクエストが発生し、結果が得られたらそれを返します。インストール時にキャッシュしたアセットは基本的にこうやって使います。

もし新しいリクエストを逐次キャッシュさせたい場合は、`fetch()` のレスポンスを処理しキャッシュに追加すればいいのです。


    self.addEventListener('fetch', function(event) {
      event.respondWith(
        caches.match(event.request)
          .then(function(response) {
            // キャッシュがあったのでレスポンスを返す
            if (response) {
              return response;
            }
    
            // 重要：リクエストを clone する。リクエストは Stream なので
            // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
            // 必要なので、リクエストは clone しないといけない
            var fetchRequest = event.request.clone();
    
            return fetch(fetchRequest).then(
              function(response) {
                // レスポンスが正しいかをチェック
                if(!response || response.status !== 200 || response.type !== 'basic') {
                  return response;
                }
    
                // 重要：レスポンスを clone する。レスポンスは Stream で
                // ブラウザ用とキャッシュ用の2回必要。なので clone して
                // 2つの Stream があるようにする
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
    

ここでは以下を実行しています。

1. `fetch` リクエストに対する `then()` にコールバックを追加
2. レスポンスを取得したら、以下のチェックを行う

   1. レスポンスが正しいかを保証
   2. レスポンスのステータスコードが `200` かを確認
   3. レスポンスの型が `basic` かを確認。これは同じ origin からのリクエストということを表します。これはまた、サードパーティのアセットがキャッシュされないことも意味します
3. チェックが通れば、レスポンスを [clone](https://fetch.spec.whatwg.org/#dom-response-clone) する。これはレスポンスが [Stream](https://streams.spec.whatwg.org/) なので、その中身を一度しか使えないからです。この例ではレスポンスをブラウザに返すだけではなく、キャッシュに渡さなければいけません。ですのでレスポンスを clone し、ひとつをブラウザに、もうひとつをキャッシュに渡します。


## Service Worker の更新 {: #update-a-service-worker }


開発が進むと、Service Worker を更新しなければいけない時が来るでしょう。更新は以下の手順で行います。

1. Service Worker の JavaScript ファイルを更新します。ユーザーがあなたのサイトに移動してきた時、ブラウザは Service Worker を定義する JavaScript ファイルを再度ダウンロードしようとします。現在ブラウザが保持しているファイルとダウンロードしようとするファイルにバイト差異がある場合、それは「新しいもの」と認識されます
2. 新しい Service Worker がスタートし、`install` イベントが発火します
3. この時点では、まだ古い Service Worker が現在のページをコントロールしているため、新しい Service Worker は `waiting` 状態になります
4. 開かれているページが閉じられたら、古い Service Worker は終了され、新しい Service Worker がページをコントロール可能になります
5. 新しい Service Worker がページをコントロール可能になったら、`activate` イベントが発火します

`activate` のコールバックで行いたいのが、キャッシュの管理です。なぜかというと、古いキャッシュをインストール時に削除すると、現在のページを管理する古い Service Worker がそのキャッシュからリソースを提供できなくなるからです。

たとえば、`my-site-cache-v1` という名前のキャッシュがあり、これをページ用、ブログ用のふたつのキャッシュに分割したいとしましょう。インストール時に `pages-cache-v1` と `blog-posts-cache-v1` というふたつのキャッシュを作り、アクティベーション時に古い `my-site-cache-v1` を削除するわけです。

次のコードは Service Worker 中のキャッシュすべてをループ処理し、ホワイトリストにないものを削除するものです。


    self.addEventListener('activate', function(event) {
    
      var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
    
      event.waitUntil(
        caches.keys().then(function(cacheNames) {
          return Promise.all(
            cacheNames.map(function(cacheName) {
              if (cacheWhitelist.indexOf(cacheName) === -1) {
                return caches.delete(cacheName);
              }
            })
          );
        })
      );
    });
    


## つまづきポイント 



Service Worker はまだ新しい技術です。ここではつまづきやすいポイントを紹介します。早くこのセクションがなくなればいいですが、いま Service Worker で何かをする場合は気に留めておいてください。

### インストールが失敗したときのフィードバックが少ない

Worker が登録されても `chrome://inspect/#service-workers` や `chrome://serviceworker-internals` に現れない場合、`event.waitUntil` に渡された `Promise` が reject されたなどの理由からインストールに失敗した可能性が高いです。

インストールが成功したか失敗したかを知るには、`chrome://serviceworker-internals` に行き、「Open DevTools window and pause JavaScript execution on service worker startup for debugging」にチェックを入れ、そして `install` イベントの開始時に `debugger` ステートメントを記述してください（このオプションは Chrome 47 より前のバージョンでは名前が異なります）。これと DevTools の [Pause on exception ボタン](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints#exceptions)」で問題を見つけられるでしょう。

### fetch() のデフォルト

#### クレデンシャルがデフォルトでは送られない

`fetch()` はデフォルトでは Cookie などのクレデンシャルをリクエストに含めません。含めたい場合は次のようにします。


    fetch(url, {
      credentials: 'include'
    })
    

この挙動は意図的で、XHR の「URL が同一 origin の場合にだけクレデンシャルを含める」という複雑な挙動よりも明らかに良いものです。Fetch の挙動は他の CORS リクエストに似ています。CORS リクエストはたとえば `<img crossorigin>` といったものです。この場合、`<img crossorigin="use-credentials">` とオプトインしなければ Cookie は送られません。

#### 非 CORS なリクエストはデフォルトで失敗する

サードパーティの URL を取得しようとしても、CORS がサポートされていない場合 `fetch` は失敗します。非 CORS なリクエストを送るためには、`Request` オブジェクトに `no-cors` オプションを指定しなければいけません。しかしこうすると、返ってくるのは「不透明（opaque）」なレスポンスになります。これはレスポンスが成功したかどうかが分からないということです。


    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });
    

#### レスポンシブ・イメージの処理

`srcset` 属性や `<picture>` 要素は、最も適切な画像アセットを選択しリクエストする仕組みです。

Service Worker のインストール時に画像をキャッシュさせたい場合、以下のパターンが考えられます。

1. `srcset` 属性や `<picture>` 要素に指定された画像すべてをインストールする
2. 低解像度版の画像をインストールする
3. 高解像度版の画像をインストールする

実際には、2番か3番を選ぶべきでしょう。すべての画像をダウンロードするのは無駄ですから。

低解像度の画像をインストール時にキャッシュさせるなら、後でネットワークが繋がった時に高解像度の画像をダウンロードするようにすればいいのです。高解像度の画像がダウンロードされなくても手元には低解像度の画像があるのでフォールバックできます。素敵な考えですが、ひとつ問題があります。

以下の様なふたつの画像があるとします。

| ピクセル密度 | 幅  | 高さ |
| ---------- | --- | ---- |
| 1x         | 400 | 400  |
| 2x         | 800 | 800  |

`srcset` 属性を使ったマークアップは次のようになります。


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x">
    

2x な画面では、ブラウザは `image-2x.png` をダウンロードするでしょう。オフラインであれば `catch()` し、キャッシュした `image-src.png` を返せます。しかしブラウザは 2x な画面での表示を想定しているので、画像は 400×400 CSS ピクセルではなく 200×200 CSS ピクセルで表示されます。これを回避するには、画像の幅と高さを明示します。


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
    style="width:400px; height: 400px;">
    

アート・ディレクションで `<picture>` 要素を使う場合、この方法はとても難しくなり、画像がどのように作られ使われるかにかなり依存します。しかし `srcset` と同じような方法は使えます。


## もっと知るためのリンクとヘルプ 



### もっと知る

Service Worker についてのドキュメンテーションは [https://jakearchibald.github.io/isserviceworkerready/resources](https://jakearchibald.github.io/isserviceworkerready/resources.html) にまとめられています。

### ヘルプ

もしつまづいた場合、Stack Overflow に質問してみてください。また '[service-worker](http://stackoverflow.com/questions/tagged/service-worker)' タグを使ってください。また、お互いに助けあったりもしてくださいね。


Translated By: 
{% include "web/_shared/contributors/myakura.html" %}
