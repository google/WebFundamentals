project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Service Worker を既存のアプリに組み込み、オフラインで動作させる方法を学びます。

{# wf_auto_generated #}
{# wf_updated_on: 2016-11-09T18:31:19Z #}
{# wf_published_on: 2016-01-01 #}


# ウェブアプリへの Service Worker とオフラインの追加 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



##  概要



![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

このコードラボでは、Service Worker を既存のアプリに組み込み、オフラインで動作させる方法を学びます。これは [Air Horner](https://airhorner.com) というアプリです。警笛をクリックして音を出します。

####  学習内容

* 基本的な Service Worker を既存のプロジェクトに追加する方法
* Chrome DevTools を使用してオフライン モードをシミュレートし、Service Worker の調査やデバッグを行う方法
* 単純なオフライン キャッシュ戦略

####  必要なもの

* Chrome 52 以上。
* [Promises](/web/fundamentals/getting-started/primers/promises)、Git、Chrome DevTools に関する基本知識。
* サンプルコード。
* テキスト エディタ。
* ローカル ウェブサーバー。このコードラボで説明されているウェブサーバーを使用する場合は、コマンドラインに Python がインストールされている必要があります。


##  サンプルコードを入手する



コマンドラインから GitHub レポジトリのクローンを作成します。SSH 経由:

    $ git clone git@github.com:GoogleChrome/airhorn.git

HTTPS 経由:

    $ git clone https://github.com/GoogleChrome/airhorn.git


##  サンプルアプリを実行する



まず、サンプルアプリが完成するとどのようなものになるか見てみましょう（ヒント: すばらしいですよ）。 

`master` ブランチをチェックアウトして、正しい（完成版の）ブランチを使用していることを確認してください。

    $ git checkout master

ローカル ウェブサーバーからサイトを実行します。どのウェブサーバーでも使用できますが、このコードラボではこれ以降、ポート 3000 で Python の `SimpleHTTPServer` を使用していることを前提としているため、アプリは `localhost:3000` から利用可能になります。

    $ cd app
    $ python -m SimpleHTTPServer 3000

Chrome でサイトを開きます。次のように表示されます。![9246b0abd8d860da.png](img/9246b0abd8d860da.png)


##  アプリをテストする



警笛をクリックしてください。音が鳴るはずです。

ここで、Chrome DevTools を使用してオフラインになった状況をシミュレートします。

DevTools を開き、[__Application__] パネルに移動して [__Offline__] チェックボックスを有効にします。以下のスクリーンショットでは、このチェックボックスの上にカーソルが合わせられています。 

![479219dc5f6ea4eb.png](img/479219dc5f6ea4eb.png)

チェックボックスをクリックした後、[__Network__] パネルタブの横にある警告アイコン（感嘆符が付いた黄色の三角形）に注目してください。これは、オフラインであることを示しています。 

オフラインであることを試すには、[https://google.com](https://google.com) にアクセスします。Chrome の「there is no Internet connection」というエラー メッセージが表示されます。 

ここで、アプリに戻ってください。オフラインであっても、ページは完全に再読み込みされるはずです。警笛も鳴らすことができます。

このアプリがオフラインでも動作する理由こそが、このコードラボで学習する基礎知識です。つまり、Service Worker のオフライン サポートです。


##  基本的なアプリを作成する



ここでは、アプリからすべてのオフライン サポートを削除し、Service Worker を使用してアプリにオフライン サポートを追加する方法を学びます。

Service Worker が実装されていない不完全なバージョンのアプリをご覧ください。

    $ git checkout code-lab

DevTools の [__Application__] パネルに戻り、[__Offline__] チェックボックスを無効にしてオンライン状態にします。

ページを実行します。アプリは想定どおりに動作します。

ここで、DevTools を使用して再度オフライン モードをシミュレートします（[__Application__] パネルの [__Offline__] チェックボックスを有効にします）。__注意してください。__Service Worker についてまだよく知らない場合、動作は想定していないものになります。

何が起こると思いますか。現在オフラインで、このアプリのバージョンには Service Worker がないため、通常は Chrome から「there is no Internet connection」というエラー メッセージが表示されると考えるでしょう。

しかし、実際に表示されるのは、完全に機能的なオフライン アプリです。

![9246b0abd8d860da.png](img/9246b0abd8d860da.png)

何が起きたのでしょう？このコードラボの初めに完成版のアプリを試したことを思い出してください。そのバージョンを実行したとき、アプリは実際には Service Worker をインストールしました。その Service Worker が、アプリを実行するたびに自動的に実行されています。Service Worker が `localhost:3000` などのスコープにインストールされると、プログラムや手動で削除されるまで、ユーザーがスコープにアクセスするたびにその Service Worker が自動的に起動されます（スコープの詳細については次のセクションをご覧ください）。 

これを修正するには、DevTools の [__Application__] パネルに移動し、[__Service Workers__] タブをクリックして [__Unregister__] ボタンをクリックします。以下のスクリーンショットでは、ボタンの上にカーソルが合わせられています。 

![837b46360756810a.png](img/837b46360756810a.png)

サイトを再読み込みする前に、DevTools を使用してオフライン モードをシミュレートしていることを確認してください。ページを再読み込みすると、想定したとおり、「there is no Internet connection」というエラー メッセージが表示されます。

![da11a350ed38ad2e.png](img/da11a350ed38ad2e.png)


##  サイトで Service Worker を登録する



ここで、アプリにオフライン サポートを追加します。これには 2 つのステップがあります。

1. Service Worker のコードを提供する JavaScript ファイルを作成します。
2. この JavaScript ファイルを Service Worker として登録するようブラウザに伝えます。

まず、`/app` フォルダ内に `sw.js` という空のファイルを作成します 

`index.html` を開いて `<body>` の下部に次のコードを追加します。

```
<script>
if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/sw.js')
           .then(function() { console.log("Service Worker Registered"); });
}
</script>
```

このスクリプトは、ブラウザが Service Worker をサポートしているかどうかを確認します。サポートしている場合は、現在空のファイル `sw.js` を Service Worker として登録し、コンソールにログを出力します。

サイトを再実行する前に DevTools に戻り、[__Application__] パネルの [__Service Workers__] タブを確認します。現在これは空になっており、サイトに Service Worker がインストールされていないことを示しています。 

![37d374c4b51d273.png](img/37d374c4b51d273.png)

DevTools の [__Offline__] チェックボックスが無効になっていることを確認します。再度ページを再読み込みします。ページが読み込まれると、Service Worker が登録されていることがわかります。

![b9af9805d4535bd3.png](img/b9af9805d4535bd3.png)

[__Source__] ラベルの横に、登録された Service Worker のソースコードへのリンクが表示されます。 

![3519a5068bc773ea.png](img/3519a5068bc773ea.png)

あるページについて、現在インストールされている Service Worker を調べる場合は、このリンクをクリックします。これにより、DevTools の [__Sources__] パネルに Service Worker のソースコードが表示されます。たとえば、今このリンクをクリックすると、空のファイルが表示されます。 

![dbc14cbb8ca35312.png](img/dbc14cbb8ca35312.png)


##  サイトのアセットをインストールする



Service Worker が登録されている場合は、ユーザーがページに初めてアクセスしたときに `install` イベントがトリガーされます。このイベントはページのアセットをキャッシュします。

sw.js ファイルに次のコードを追加します。

```
importScripts('/cache-polyfill.js');


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/styles/main.css',
       '/scripts/main.min.js',
       '/sounds/airhorn.mp3'
     ]);
   })
 );
});
```

最初の行は Cache ポリフィルを追加します。このポリフィルは既にレポジトリ内に含まれています。Cache API はまだすべてのブラウザで完全にサポートされていないため、ポリフィルを使用する必要があります。次に来るのが `install` イベント リスナーです。`install` イベント リスナーは `caches` オブジェクトを開いて、キャッシュするリソースのリストを移入します。`addAll` 操作に関する重要なことの 1 つは、これはゼロかすべてかであるということです。ファイルの 1 つが存在しないか、フェッチに失敗すると、`addAll` 操作全体が失敗します。このようなシナリオにも対処するのが、優れたアプリというものです。

次のステップは、これらのいずれかのリソースに対するリクエストのインターセプトを返し、`caches` オブジェクトを使用して各リソースのローカルに格納されているバージョンを返すように Service Worker をプログラムします。


##  ウェブページのリクエストをインターセプトする



Service Worker の強力な機能の 1 つは、Service Worker がページを制御すると、ページで生成されたすべてのリクエストをインターセプトして、そのリクエストの処理方法を決定できることです。このセクションでは、アセットを取得するためにネットワークにアクセスするのではなく、Service Worker がリクエストをインターセプトして、アセットのキャッシュされたバージョンを返すようにプログラムします。

最初のステップでは、`fetch` イベントに対してイベント ハンドラを登録します。このイベントはリクエストが生成されるたびにトリガーされます。

次のコードを `sw.js` の下部に追加して、親ページから生成されたリクエストを出力します。

これをテストしてみましょう。Service Worker が想定外の動作をするので__注意してください__。 

DevTools を開いて [__Application__] パネルに移動します。[__Offline__] チェックボックスが無効になっているはずです。`Esc` キーを押して DevTools ウィンドウの下部にある [__Console__] ドロワーを開きます。DevTools ウィンドウは次のスクリーンショットのようになります。

![c96de824be6852d7.png](img/c96de824be6852d7.png)

ページを再読み込みして DevTools ウィンドウを再度確認します。まず、[Console] に一連のリクエストのログが出力されることを想定していましたが、何も表示されていません。次に、[__Service Worker__] ペインの [__Status__] が変更されていることがわかります。

![c7cfb6099e79d5aa.png](img/c7cfb6099e79d5aa.png)

[__Status__] には、アクティベートを待機している新しい Service Worker が表示されています。これは、変更を行ったばかりの新しい Service Worker です。つまり、なんらかの理由で、インストールされている（空のファイルの）古い Service Worker がまだページを制御しています。[__Source__] の横の `sw.js` リンクをクリックすると、古い Service Worker がまだ実行されていることを確認できます。 

この不都合を修正するには、[__Update on reload__] チェックボックスを有効にします。

![26f2ae9a805bc69b.png](img/26f2ae9a805bc69b.png)

このチェックボックスが有効になっている場合は、DevTools はページが再読み込みされるたびに常に Service Worker をアップデートします。これは、Service Worker をアクティブに開発する場合に非常に役に立ちます。

ここでページを再読み込みすると、想定どおりに新しい Service Worker がインストールされていることと、リクエストの URL が [Console] に出力されていることを確認できます。

![53c23650b131143a.png](img/53c23650b131143a.png)

これらすべてのリクエストの処理方法を決定する必要があります。デフォルトでは、何も実行しなければリクエストはネットワークに渡され、レスポンスがウェブページに返されます。

アプリをオフラインで動作させるには、リクエストがキャッシュに存在する場合はキャッシュから取得する必要があります。

fetch イベント リスナーをアップデートして以下のコードに一致させます。

`event.respondWith()` メソッドは、以降に発生するイベントの結果を評価するようブラウザに指示します。`caches.match(event.request)` は、fetch イベントをトリガーした現在のウェブ リクエストを取得して、一致するリソースのキャッシュを調べます。この一致は URL 文字列を検索して実行されます。`match` メソッドは、キャッシュにファイルが見つからない場合でも解決する Promise を返します。これにより、処理を選択できます。今回の単純なケースでは、ファイルが見つからなかった場合はネットワークから単純に `fetch` して、ブラウザに返します。

これは最も単純なケースで、他にもキャッシュのシナリオは数多く存在します。たとえば、まだキャッシュされていないリクエストに対するすべてのレスポンスを順次キャッシュに追加して、以降はすべてキャッシュから返すようにすることもできます。 


## これで完了です。



オフライン サポートを追加できました。オンライン中にページを再読み込みして Service Worker を最新バージョンにアップデートし、DevTools を使用してオフライン モードにします。再度ページを再読み込みすると、完全に機能するオフラインの警笛を使用できます。

####  これまでの学習内容

* 基本的な Service Worker を既存のプロジェクトに追加する方法
* Chrome DevTools を使用してオフライン モードをシミュレートし、Service Worker の調査やデバッグを行う方法
* 単純なオフライン キャッシュ戦略

####  次のステップ

* 堅牢な [Polymer オフライン要素を使用したオフライン サポート](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)を簡単に追加する方法を学びます。
* 詳細については、[高度なキャッシュ テクニック](https://jakearchibald.com/2014/offline-cookbook/)をご覧ください。

####  さらに詳しく知る

*  [Service Worker の紹介](/web/fundamentals/primers/service-worker/?hl=en)





##  問題の発見やフィードバック{: .hide-from-toc }
コードラボの向上のために[問題](https://github.com/googlesamples/io2015-codelabs/issues)がある場合はお知らせください。
ご協力お願いします。

{# wf_devsite_translation #}
