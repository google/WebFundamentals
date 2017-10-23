project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: App Shell アーキテクチャでは UI
をローカルに保持して、ウェブのリンク可能性と見つけやすさを損なうことなくコンテンツを動的に読み込むことができます。

{# wf_updated_on: 2016-09-26 #}
{# wf_published_on: 2016-09-27 #}

# App Shell モデル {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**アプリケーション シェル**（App Shell）アーキテクチャは、ネイティブ アプリのように瞬時に、そして確実にユーザーの画面に読み込める
Progressive Web App を構築する方法の 1 つです。

アプリの「シェル」とは、ユーザー インターフェースが機能するために必要な最小限の HTML、CSS、JavaScript
です。これらをオフラインで使用できるようにキャッシュしておくことで、ユーザーが同じページに再アクセスした際に、**瞬時に高いパフォーマンス**
が発揮されます。つまり App Shell
は、ユーザーがアクセスするたびにネットワークからすべて読み込まれるわけではなく、必要なコンテンツだけが読み込まれます。

JavaScript を多用したアーキテクチャの[シングルページ
アプリ](https://en.wikipedia.org/wiki/Single-page_application)に対しては、App Shell
が有力なアプローチとなります。このアプローチではアプリを実行させるために（[Service
Worker](/web/fundamentals/primers/service-worker/)
を使用して）積極的にセルをキャッシュします。次に、JavaScript を使用して各ページの動的コンテンツを読み込みます。App
Shell はオフライン環境で、最初の HTML コンテンツを高速で画面に表示するのに役立ちます。


<img src="images/appshell.png" alt="Application Shell architecture">


App Shell は、ネイティブ アプリを作成した際にアプリストアに公開するコード一式のようなもの、と言うこともできます。
これは UI の骨組みであり、アプリの起動に必要な主要コンポーネントですが、多くの場合データは含まれません。

注: [初めての Progressive Web
App](https://codelabs.developers.google.com/codelabs/your-first-pwapp/#0)
のコードラボを試して、天気情報アプリの App Shell を設計して実装する方法を確認してください。
このパターンは、[App Shell
モデルによる高速読み込み](https://www.youtube.com/watch?v=QhUzmR8eZAo)の動画でも詳しく説明されています。

### App Shell モデルの使用場面

PWA は、ゼロから開発する必要はありません。最新のシングルページ アプリを作成しているのであれば、名前を知らなかったとしても、すでに App Shell
に類似するものを使用しているはずです。使用しているライブラリやフレームワークによって詳細は異なる場合もありますが、そのコンセプト自体はフレームワークに依存しません。

App Shell アーキテクチャは、ナビゲーションには比較的変更がなく、コンテンツが変更されるアプリやサイトに最適です。多くの最新の JavaScript
フレームワークやライブラリでは、すでにアプリケーション
ロジックとコンテンツの分離が進んでいるため、このアーキテクチャが適用しやすくなっています。静的コンテンツのみ含まれるウェブサイトのあるクラスについては、同じモデルを追従しつつも
100% App Shell のサイトにできです。

Google による App Shell アーキテクチャの構築方法ついては、[Building the Google I/O 2016 Progressive
Web App](/web/showcase/2016/iowa2016) で紹介しています。実際に完成した PWA は SPA を基に作成されています。PWA
では Service Worker
を使用してコンテンツをプリキャッシュし、新たなページを動的に読み込み、ビュー間をスムーズに遷移し、最初の読み込みのあとにコンテンツを再利用します。

### メリット {: #app-shell-benefits }

App Shell アーキテクチャで Service Worker を使用すると次のようなメリットがあります。

- **常に高速で安定したパフォーマンス**。再アクセス時にページが高速で表示されます。最初のアクセスで静的アセットと UI （例:
HTML、JavaScript、イメージ、CSS）がキャッシュされるため、再アクセスしたときに瞬時に読み込むことができます。コンテンツは最初のアクセスでキャッシュされることもありますが、通常は必要に応じて読み込まれます。

- **ネイティブ アプリのような操作性**。App Shell モデルの採用により、瞬時に表示されるネイティブ
アプリのようなナビゲーションと操作性に加え、オフライン サポートを兼ね備えたエクスペリエンスを生み出すことができます。

-
**データの効率的な使用**。データ使用量を最小限に抑え、キャッシュするものを適切に判断するよう設計されています。これは、重要ではないファイル（すべてのページに表示されるわけではない大きな画像など）をリストすると、ブラウザが必須ではないデータまでダウンロードしてしまうためです。西洋諸国ではデータは比較的安価ですが、接続が高価でデータにコストのかかる新興市場ではこの限りではありません。

## 要件{: #app-shell-requirements }

App Shell に求められるもの:

- 瞬時の読み込み
- 最小限のデータ使用量
- ローカルのキャッシュから静的アセットを使用
- コンテンツとナビゲーションの分離
- ページ固有のコンテンツの取得と表示（HTML、JSON など）
- 必要に応じた動的コンテンツのキャッシュ

App Shell では UI をローカルに保持し、API
を経由して動的にコンテンツをプルしますが、ウェブのリンク可能性と見つけやすさが損なわれることはありません。ユーザーが次にアプリへアクセスする際、自動的に最新版が表示されます。使用前に新しいバージョンをダウンロードする必要はありません。

注: 監査用の拡張機能である [Lighthouse](https://github.com/googlechrome/lighthouse)
を利用すると、App Shell を使用した PWA が高いパフォーマンス基準を満たしているかを検証できます。[To the
Lighthouse](https://www.youtube.com/watch?v=LZjQ25NRV-E)
では、このツールを使用した PWA の最適化について順を追って説明しています。

## App Shell を作成する{: #building-your-app-shell }

ページのシェルと動的コンテンツを明確に区別してアプリを構築します。
一般的に、アプリでは極力シンプルなシェルを読み込むべきですが、初回ダウンロードには十分に意味のあるページ コンテンツを含める必要があります。
データソースごとに、スピードとデータの新鮮さ適正なバランスを決定してください。


<figure>
<img src="images/wikipedia.jpg" alt="Offline Wikipedia app using an
application shell with content caching">
<figcaption data-parent-segment-id="475225">Jake Archibald の <a
href="https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty">オフライン
Wikipedia アプリケーション</a> は、App Shell モデルを使用した PWA の優れた例です。再アクセスの際には即時に読み込まれますが、JS
を使用したコンテンツは動的に取得されます。このコンテンツは以降、再アクセスしたときのために、オフラインでも利用できるようにキャッシュされます。
</figcaption>
</figure>


### App Shell の HTML の例{: #example-html-for-appshell }

この例では、アプリケーションの核となるインフラストラクチャと UI を、データから切り離して扱います。
ウェブアプリが開かれたときに、すぐにページのレイアウトのみが表示されるよう、最初の読み込みはできる限りシンプルにしておくことが重要です。
一部はアプリケーションのインデックス ファイル（インラインの DOM、スタイル）から、残りは外部のスクリプトやスタイルシートから読み込まれます。

Service Worker を使用することで、すべての UI
とインフラストラクチャはローカルにキャッシュされます。したがってすべてが読み込まれるのではなく、新規または変更されたデータのみが読み込まれます。

お使いの作業ディレクトリの `index.html` ファイルには、以下のようなコードがあるはずです。
これは実際のコンテンツのサブセットであり、完全なインデックス ファイルではありません。
では、中身を見てみましょう。

- ユーザー インターフェースの「骨子」となる HTML と CSS。ナビゲーションとコンテンツのプレースホルダが備わっています。
- ナビゲーションと UI のロジックを処理する外部 JavaScript ファイル（app.js）。および、Indexed DB などのストレージ
メカニズムを使用して、サーバーから取得した情報を表示してローカルで保存するためのコード。
- オフライン機能を有効にするためのウェブアプリ マニフェストと Service Worker のローダー。


<div class="clearfix"></div>


```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>App Shell</title>
  <link rel="manifest" href="/manifest.json">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>App Shell</title>
  <link rel="stylesheet" type="text/css" href="styles/inline.css">
</head>

<body>
  <header class="header">
    <h1 class="header__title">App Shell</h1>
  </header>
  
  <nav class="nav">
  ...
  </nav>
  
  <main class="main">
  ...
  </main>

  <div class="dialog-container">
  ...
  </div>

  <div class="loader">
    <!-- Show a spinner or placeholders for content -->
  </div>

  <script src="app.js" async></script>
  <script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  }
  </script>
</body>
</html>
```


<div class="clearfix"></div>


注: コンテンツに App Shell とサーバー側のレンダリングを使用した非常にシンプルな PWA を
[https://app-shell.appspot.com/](https://app-shell.appspot.com/) で実際に確認できます。<a
href="https://www.youtube.com/watch?v=srdKq0DckXQ">あらゆるフレームワークをまたがる Progressive
Web App</a> の動画で紹介されているとおり、App Shell は、どのライブラリまたはフレームワークを使用しても実装できます。Polymer （<a
href="https://shop.polymer-project.org">Shop</a>）と React（<a
href="https://github.com/insin/react-hn">ReactHN</a>、<a
href="https://github.com/GoogleChrome/sw-precache/tree/master/app-shell-demo">iFixit</a>）を使用したサンプルもご覧いただけます。

### App Shell のキャッシング{: #app-shell-caching }

App Shell は、手動で記述された Service Worker、または
[sw-precache](https://github.com/googlechrome/sw-precache) などの静的なアセットのプリキャッシュ
ツールを使用して生成された Service Worker を使用してキャッシュすることができます。

注: 紹介している例は、一般情報の提供および説明のみを目的として提示しています。
実際に使用するリソースは、アプリごとに異なります。

#### App Shell を手動でキャッシュする

以下は、Service Worker の `install` イベントを使用して App Shell から [Cache
API](https://developer.mozilla.org/en-US/docs/Web/API/Cache)
に静的リソースをキャッシュするコードの例です。

```
var cacheName = 'shell-content';
var filesToCache = [
  '/css/styles.css',
  '/js/scripts.js',
  '/images/logo.svg',

  '/offline.html’,

  '/’,
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```

#### sw-precache を使用して App Shell をキャッシュする

sw-precache によって生成された Service Worker は、ビルドプロセスの一部として設定したリソースをキャッシュして供給します。
App Shell を構成する
HTML、JavaScript、CSS
ファイルそれぞれをプリキャッシュすることができます。余計な処理を必要とせず、すべてがオフライン状態でも機能し、以降のアクセスでも瞬時に読み込まれます。

以下は、[gulp](http://gulpjs.com) ビルドプロセスの一部として sw-precache を使用する基本的な例です。

```
gulp.task('generate-service-worker', function(callback) {
  var path = require('path');
  var swPrecache = require('sw-precache');
  var rootDir = 'app';

  swPrecache.write(path.join(rootDir, 'service-worker.js'), {
    staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,gif}'],
    stripPrefix: rootDir
  }, callback);
});
```

静的アセットのキャッシュについてさらに詳しく学ぶには、コードラボの [sw-precache を使用して Service Worker
を追加する](https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#0)をご覧ください。

注: sw-precache は、静的リソースのオフライン キャッシュに役立ちます。ランタイムまたは動的リソースには、無料ライブラリ
[sw-toolbox](https://github.com/googlechrome/sw-toolbox) の使用を推奨します。

## まとめ{: #conclusion }

Service Worker を使用した App Shell は、オフライン キャッシュの強力なパターンです。さらに、PWA
への再アクセス時には瞬時に読み込みが行われ、パフォーマンスを大幅に向上させることができます。App Shell
をキャッシュすることでオフラインでの稼働が可能になり、コンテンツは JavaScript を使用して追加できます。

結局はネットワークからコンテンツを取得しているにしても、再アクセスの際は、オフライン状態でも画面上に有効なピクセルを描画することができます。
