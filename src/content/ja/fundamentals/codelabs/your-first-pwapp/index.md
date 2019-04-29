project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# はじめてのプログレッシブウェブアプリ {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## はじめに

### ウェブアプリとプログレッシブウェブアプリの特徴はなにか？

プログレッシブウェブアプリは、デスクトップとモバイルの両方でインストール可能なアプリと同等の体験を提供し、ウェブ上で直接構築・配信される高速で信頼性の高いウェブアプリです。何より重要なのは、それらがどのブラウザでも動作するウェブアプリでることです。いまウェブアプリを構築しているのであれば、すでにプログレッシブウェブアプリを構築する準備は整っています。

#### 高速＆高信頼性

あらゆるウェブ体験は高速でなければいけませんが、特にプログレッシブウェブアプリでは必須です。高速とは、画面上に意味のあるコンテンツを表示し、インタラクティブな体験を提供するまでにかかる時間が5秒以内ということです。

また、__高速さは確実__でなければいけません。信頼性の高いパフォーマンスの重要性はどれほど強調しても強調し過ぎということはありません。このように考えてください。ネイティブアプリの最初の読み込みは苛立たしいものです。これはアプリストアと巨大なダウンロードサイズによる制限です。しかし一度アプリをインストールしてアプリを開始すると、その苦労はすべて報われます。実行までに待たされる時間が変わるようなことはありません。アプリケーションの起動は前回と同じくらい早く、変わることはありません。インストールすることでユーザーが期待するようになるこの信頼できるパフォーマンスをプログレッシブウェブアプリは提供しなければなりません。

#### インストール可能

プログレッシブウェブアプリはブラウザタブで実行できますが、さらにインストールすることもできます。サイトをブックマークしてもショートカットが追加されるだけですが、プログレッシブウェブアプリをインストールすると、見た目も動作も他のインストールされているアプリケーションと同じようになります。他のアプリを起動するのと同じ場所から起動します。スプラッシュスクリーン、アイコンなどのカスタマイズを含む起動体験も制御できます。アドレスバーや他のブラウザUIのないウィンドウでアプリとして実行されます。もちろん他のインストール済みアプリと同様に、タスクスイッチャーのトップレベルのアプリです。

インストール可能なPWAは高速かつ信頼性が高いことが重要であることを忘れないようにしてください。 PWAをインストールするユーザーはネットワーク接続がどのような状態であっても自分のアプリが機能することを期待します。これはインストールされているすべてのアプリが満たすべき基本的な要件です。

#### モバイル＆デスクトップ

レスポンシブデザインのテクニックを使用して、プログレッシブウェブアプリはモバイルデスクトップ__と__モバイルデスクトップの両方で動作します。コードベースはプラットフォームによらず単一です。ネイティブアプリの作成を検討している場合は、PWAが提供する利点を見てください。

### 構築するもの

このコードラボでは、プログレッシブウェブアプリの手法を使って天気予報ウェブアプリを作成します。作成するアプリは:

* レスポンシブデザインを使用してデスクトップとモバイルで機能します。
* Service Workerを使用して実行に必要なアプリケーションリソース（HTML、CSS、JavaScript、画像）を事前キャッシュし、実行時に天気データをキャッシュしてパフォーマンスを向上させるため高速です。
* ウェブアプリマニフェストと`beforeinstallprompt`イベントを使用してユーザーにインストール可能であることを通知することで、インストール可能にします。

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: コードラボの単純化するためとオフライン体験を提供する基本を説明するために標準のJavaScriptを使用しますが、プロダクションアプリでは [Workbox](/web/tools/workbox/)などのツールを使用してService Workerを構築することを強くお勧めします。それによりはあなたが遭遇するかもしれない鋭いエッジと暗いコーナーの多くを避けることができます。

### 学ぶこと

* ウェブアプリのマニフェストを作成および追加する方法
* 簡単なオフライン体験を提供する方法
* 完全なオフライン体験を提供する方法
* アプリをインストール可能にする方法

このコードラボはプログレッシブウェブアプリに焦点を当てています。関連性のない概念やコードブロックはまとめてコピー＆ペーストできるように用意されています。

### 必要なもの

* 最近のバージョン（74以降）のChrome。
PWAは単なるウェブアプリであり、すべてのブラウザで機能しますが、ブラウザレベルで何が起こっているのかをよりよく理解してインストール体験をテストするためにChrome DevToolsのいくつかの機能を使用します。
* HTML、CSS、JavaScript、そして[Chrome DevTools](https://developer.chrome.com/devtools) に関する知識。

## 準備

### Dark Sky APIのキーを取得

気象データは[Dark Sky API](https://darksky.net/dev)で取得します。APIを使用するためには、APIキーをリクエストする必要があります。Dark Sky APIは簡単で、非商用プロジェクトであれば無料で利用できます。

[APIキーのための登録](https://darksky.net/dev/register)

Note: Dark Sky APIキーがなくても、このコードラボを完成させることができます。Dark Sky APIから本物のデータを取得できない場合は、サーバーが代わりに偽のデータを返します。

#### APIキーが正しく機能していることの確認

APIキーが正しく機能していることをテストするには、DarkSky APIにHTTPリクエストを送信します。下記のURLを更新して`DARKSKY_API_KEY`をあなたのAPIキーに置き換えてください。すべて問題なければ、ニューヨークの最新の天気予報が得られるはずです。

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### コードを入手する

このプロジェクトに必要なものはすべてGitリポジトリにあります。始めるには、コードを入手してお気に入りの開発環境で開く必要があります。このコードラボではGlitchの使用を推奨しています。

#### 強く推奨:リポジトリのインポートにはGlitchを使用してください。

このコードラボの作業には、Glitchを使用することをお勧めします。

1. 新しくブラウザタブを開き、[https://glitch.com](https://glitch.com)を表示します。
2. アカウントがなければ、サインアップします。
3. __New Project__をクリックし、次に__Clone from Git Repo__をクリックします。
4. __https://github.com/googlecodelabs/your-first-pwapp.git__をクローンしてOKをクリックします。
5. リポジトリが読み込まれたら、`.env`ファイルを編集し、DarkSky APIキーを更新します。
6. __Show Live__ボタンをクリックして、PWAが動くことを確認します。

#### 代案:コードをダウンロードしてローカルで作業する

コードをダウンロードしてローカルで作業する場合は、最新バージョンのNode、およびコードエディタをセットアップしてすぐに使用できる状態になっている必要があります。

Caution: ローカルで作業していると、Lighthouseの監査の一部は合格せず、ローカルサーバーは安全なコンテキストでコンテンツを提供しないため、インストールを利用できない場合があります。

[ソースコードのダウンロード](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. ダウンロードしたzipファイルを解凍します。
2. `npm install`を実行して、サーバーの実行に必要な依存関係をインストールします。
3. `server.js`を編集して、DarkSky APIキーを設定します。
4. `node server.js`をいjっこうしてサーバーをポート番号8000で開始します。
5. ブラウザタブで[http://localhost:8000](http://localhost:8000)を開きます。

## ベースラインの確立

### 出発点は何か？

出発点は、このcodelab用に設計された基本的な天気アプリです。このコードラボの概念を示すためにコードは極端に単純化されており、エラー処理がほとんどありません。本番アプリケーションでこのコードを再利用したければ、エラー処理を追加してすべてのコードを完全にテストしてください。

試すべきいくつかのこと...

1. 右下の青いプラスボタンを使って新しい都市を追加します。
2. 右上の更新ボタンでデータを更新します。
3. 各都市カードの右上にあるxを使用して都市を削除します。
4. デスクトップとモバイルでどのように機能するかを確認します。
5. オフラインになると何が起こるかを確認してください。
6. Chromeの[ネットワーク]パネルを使用して、ネットワークがSlow 3Gに制限されたときに何が起こるかを確認します。
7. `server.js`の`FORECAST_DELAY`を変更して予報サーバーち遅延を追加します。

### Lighthouseを使用した監査

[Lighthouse](/web/tools/lighthouse/#devtools)はサイトやページの品質を向上させる役に立つ便利なツールです。パフォーマンス、アクセシビリティ、プログレッシブウェブアプリなどの監査があります。各監査には、監査が重要である理由とその修正方法を説明する参照文書があります。

![b112675caafccef0.png](img/b112675caafccef0.png)

Lighthouseを使用してWeatherアプリを監査し、行った変更を確認します。

Note: Lighthouseは、Chrome DevTools内でコマンドラインから、またはNodeモジュールとして実行できます。 ウェブアプリが退行しないように、ビルドプロセスに[Lighthouseを追加すること](https://github.com/GoogleChromeLabs/lighthousebot)を検討してください。

### Lighthouseを実行

1. 新しいタブでプロジェクトを開きます。
2. Chrome DevToolsを開いて__Audits__タブに切り替えると、DevToolsは監査カテゴリのリストを表示します。それらはすべて有効のままにしておきます。
3. [監査の実行]をクリックします。60〜90秒後に、Lighthouseによってページにレポートが表示されます。

### プログレッシブウェブアプリ監査

プログレッシブウェブアプリ監査の結果に焦点を当てます。

![af1a64a13725428e.png](img/af1a64a13725428e.png)

たくさんの赤があることに注目してください:

* __❗FAILED:__ 現在のページはオフライン時に200で応答しません。
* __❗FAILED:__ `start_url`はオフライン時に200で応答しません。
* __❗FAILED:__ ページと`start_url.`を制御するService Workerが登録されません。
* __❗FAILED:__ ウェブアプリマニフェストはインストール可能の要件を満たしていません。
* __❗FAILED:__ カスタムスプラッシュスクリーンが設定されていません。
* __❗FAILED:__ アドレスバーのテーマカラーを設定しません。

それではさっそくこれらの問題のいくつかの修正を始めましょう！

## ウェブアプリのマニフェストを追加する

このセクションの最後には、天気アプリは以下の監査に合格します。

* ウェブアプリマニフェストはインストール可能の要件を満たしていません。
* カスタムスプラッシュスクリーンが設定されていません。
* アドレスバーのテーマカラーを設定しません。

### ウェブアプリマニフェストを作成する

[web app manifest](/web/fundamentals/web-app-manifest)はシンプルなJSONファイルで、これにより開発者はアプリがユーザーにどのように見えるかを制御することができます。

ウェブアプリマニフェストを使用すると、ウェブアプリは次のことができます。

* アプリをスタンドアローンウィンドウで開きたいということをブラウザに通知します（ `display` ）。
* アプリを最初に起動したときに開くページを定義します（ `start_url` ）。
* ドックまたはアプリランチャーでのアプリの外観を定義します（ `short_name` 、 `icons` ）。
* スプラッシュスクリーンを作成します（ `name` 、 `icons` 、 `colors` ）。
* ウィンドウを横長または縦長モードで開くようブラウザに通知します（ `orientation` ）。
* [他にも様々な指定があります](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) 。

プロジェクトに`public/manifest.json`という名前のファイルを作成し、以下の内容をコピーして貼り付けます。

`public/manifest.json`

```json
{
  "name": "Weather",
  "short_name": "Weather",
  "icons": [{
    "src": "/images/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    }, {
      "src": "/images/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }],
  "start_url": "/index.html",
  "display": "standalone",
  "background_color": "#3E4EB8",
  "theme_color": "#2F3BA2"
}
```

マニフェストは、さまざまな画面サイズ用の一連のアイコンをサポートしています。このコードラボでは、iOS統合に必要なので、他にもいくつか追加しました。

Note: Chromeをインストールするには、少なくとも192 x 192 pxのアイコンと512 x 512 pxのアイコンを用意する必要があります。しかし他のサイズを提供することもできます。 Chromeは48dpに最も近いアイコンを使用します。たとえば、2xのデバイスでは96px、3xのデバイスでは144pxとなります。

### ウェブアプリマニフェストへのリンクを追加する

次に、アプリの各ページに`<link rel="manifest"...`を追加して、ブラウザにマニフェストについて通知する必要があります。 `index.html`ファイルの`<head>`要素に次の行を追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevToolsの余談

DevToolsには`manifest.json`ファイルを高速で簡単にチェックする方法があります。 __Application__パネルの__Manifest__ペインを開いてください。マニフェスト情報がを正しく追加できている場合は、解析されて見やすい形式でこのペインに表示されます。

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### iOSのmetaタグとアイコンを追加

iOSのSafariはウェブアプリマニフェストが[まだ](https://webkit.org/status/#specification-web-app-manifest)サポートされていません。そのため`index.html`ファイルの`<head>`に[伝統的な`meta`タグ](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)を追加する必要があります。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### Bonus: 簡単なLighthouseの修正

Lighthouseの監査では、他に修正が非常に簡単ないくつかの問題が指摘されています。

#### meta descriptionの設定

SEO監査の下で、Lighthouseは「 [ドキュメントにmeta descriptionがない](/web/tools/lighthouse/audits/description) 」と指摘しています。このDescriptionはGoogleの検索結果に表示される可能性があります。高品質で一意の説明は、検索結果を検索ユーザーにとってより関連性の高いものにし、検索トラフィックを増やすことができます。

説明を追加するには、文書の`<head>`に次の`meta`タグを追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### アドレスバーのテーマカラーを設定する

PWA監査で、Lighthouseはアプリの「 [アドレスバーのテーマカラーが設定されていない](/web/tools/lighthouse/audits/address-bar) 」と指摘しています。ブランドの色に合わせてブラウザのアドレスバーをテーマにすると、より没入型のユーザー体験を提供できます。

モバイルでテーマカラーを設定するには、次の`meta`タグをドキュメントの`<head>`に追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Lighthouseで変更を確認してください

（[監査]ウィンドウ枠の左上隅にある+記号をクリックして）再度Lighthouseを実行し、変更内容を確認します。

__SEO監査__

* __✅PASSED:__ 文書にメタ説明があります。

__プログレッシブウェブアプリ監査__

* __❗FAILED:__ 現在のページはオフライン時に200で応答しません。
* __❗FAILED:__  `start_url`はオフライン時に200で応答しません。
* __❗FAILED:__ ページと`start_url.`を制御するService Workerが登録されません。
* __✅PASSED:__ ウェブアプリマニフェストはインストール可能の要件を満たしています。
* __✅PASSED:__ カスタムスプラッシュスクリーンが設定されています。
* __✅PASSED:__ アドレスバーのテーマカラーが設定されています。

## 基本的なオフライン体験を提供する

ユーザーがオフラインでも、インストールされたアプリは常に基本的な体験を維持することが期待されています。そのため、インストール可能なウェブアプリではChromeのオフライン恐竜が絶対に表示されないようにすることが重要です。オフライン体験には、単純なオフラインページから、以前にキャッシュされたデータを使用した読み取り専用の体験、ネットワーク接続が回復したときに自動的に同期する完全に機能するオフライン体験まで、さまざまなものがあります。

このセクションでは、天気アプリに簡単なオフラインページを追加します。ユーザーがオフライン中にアプリをロードしようとすると、ブラウザに表示される通常のオフラインページの代わりに、カスタムページが表示されます。このセクションの終わりまでに、私たちの天気アプリは以下の監査に合格します。

* 現在のページはオフライン時に200で応答しません。
* `start_url`はオフライン時に200で応答しません。
* ページと`start_url.`を制御するService Workerが登録されません

この次のセクションで、カスタムオフラインページを完全なオフライン体験に置き換えます。これによりオフライン環境が改善されますが、さらに重要なことは、ほとんどのアセット（HTML、CSS、およびJavaScript）がローカルに保存および配信され、潜在的なボトルネックとなるネットワークが排除されるため、パフォーマンスが大幅に向上することです。

### Service Workerが救助に

Service Workerに慣れていなければ、 [Introduction To Service Workers](/web/fundamentals/primers/service-worker/)を読むとできること、ライフサイクルの仕組みなどについて基本的な理解が得られます。このコードラボを修了したら、必ず[Debugging Service Workers code lab](http://goo.gl/jhXCBy)をチェックして、Service Workerと連携する方法についてさらに詳しく調べてください。

Service Worker経由で提供される機能はプログレッシブエンハンスメントと見なされ、ブラウザでサポートされている場合にのみ追加されます。たとえば、Service Workerでは、アプリの[app shell](/web/fundamentals/architecture/app-shell)とデータをキャッシュできるため、ネットワークが利用できなくても利用できます。Service Workerがサポートされていないと、オフラインコードは呼び出されず、ユーザーは基本的な操作を経験できます。プログレッシブエンハンスメントを提供するために機能検出を使用してもほとんどオーバーヘッドはありません。また、その機能をサポートしない古いブラウザで動作が壊れることもありません。

Warning: Service Workerの機能はHTTPS経由でアクセスされるページでのみ利用可能です（http://localhostと同等のURLでもテストを容易にするために機能します）。

### Service Workerを登録

最初のステップはService Workerを登録することです。次のコードを`index.html`ファイルに追加してください。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L206)

```js
// CODELAB: Register service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
        .then((reg) => {
          console.log('Service worker registered.', reg);
        });
  });
}
```

このコードは、Service Worker APIが利用可能かどうかを確認し、利用可能な場合は、ページが[読み込まれたときに](/web/fundamentals/primers/service-workers/registration) 、 `/service-worker.js`のService Workerが登録されます。

Service Workerは `/scripts/`ディレクトリからではなくルートディレクトリから提供されます。これは、Service Workerの__`scope`__を設定する最も簡単な方法です。Service Workerの`scope`は、Service Workerがどのファイルを制御するか、つまり、Service Workerがどのパスから要求を傍受するかを決定します。デフォルトの`scope`はService Workerファイルの場所で、以下のすべてのディレクトリに拡張されています。したがって、`service-worker.js`がルートディレクトリにある場合、Service Workerはこのドメインのすべてのウェブページからの要求を制御します。

### Precacheオフラインページ

まず、何をキャッシュするかをService Workerに伝える必要があります。単純な[オフラインページ](https://your-first-pwa.glitch.me/offline.html) （ `public/offline.html` ）は既に作成されており、ネットワーク接続がない場合はいつでも表示されます。

`service-worker.js`で、`'/offline.html',`を`FILES_TO_CACHE`配列に追加します。最終結果は次のようになります。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

次に、 `install`イベントを更新して、Service Workerにオフラインページのプリキャッシュを指示します。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L29)

```js
// CODELAB: Precache static resources here.
evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
);
```

Note: Service Workerのイベントとライフサイクルは次のセクションで説明されています。

`install`イベントは`caches.open()`でキャッシュを開き、キャッシュ名を提供します。キャッシュ名を指定すると、ファイルをバージョン管理したり、キャッシュされたリソースからデータを分離したりして、他の部分に影響を与えないように一部を簡単に更新できるようにできます。

キャッシュがオープンされると、次に`cache.addAll()`を呼び出すことができます。これはURLのリストを取り、サーバーからそれらを取り出して、その応答をキャッシュに追加します。個々の要求のいずれかが失敗した場合、`cache.addAll()`は失敗します。つまり、インストール手順が成功した場合、キャッシュは一貫した状態になっていることが保証されます。しかし、何らかの理由で失敗した場合は、次回Service Workerが起動したときに自動的に再試行されます。

#### DevToolsの余談

DevToolsを使用してService Workerを理解し、デバッグする方法を見てみましょう。ページをリロードする前に、DevToolsを開き、__Application__パネルの__Service Workers__ペインに移動します。これは次のようになります。

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

このような空白のページが表示されたら、現在開いているページに登録されているService Workerがいないことを意味します。

では、ページをリロードしてください。 [Service Workers]ペインは次のようになります。

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

このような情報が表示されたら、そのページでService Workerが実行されているということです。

ステータスラベルの隣には番号があります（この場合は*34251*）。Service Workerを使用しているときはその番号を見てください。これがService Workerが更新されたかどうかを確認する簡単な方法です。

### 古いオフラインページのクリーンアップ

`activate`イベントを使用して、キャッシュ内の古いデータをクリーンアップします。このコードは、アプリケーションシェルファイルのいずれかが変更されるたびに、Service Workerがそのキャッシュを更新するようにします。これを機能させるには、Service Workerファイルの先頭にある`CACHE_NAME`変数を増やす必要があります。

次のコードを`activate`イベントに追加してください。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L36)

```js
// CODELAB: Remove previous cached data from disk.
evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
);
```

#### DevToolsの余談

[Service Workers]ペインを開いてページを更新すると、新しいService Workerがインストールされ、ステータス番号が増えます。

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

`install`イベントは`self.skipWaiting()`で終わっていて、`activate`イベントは`self.clients.claim()`で終わっているので、Service Workerが更新されるとすぐに制御を受け取ります。それらがなければ、ページに開いているタブがある限り、古いService Workerがページを制御し続けます。

### 失敗したネットワーク要求を処理する

そして最後に、 `fetch`イベントを処理する必要があります。ここでは[まずネットワークを使用して、失敗したら代わりにキャッシュを使用するという戦略](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)を使います。Service Workerは最初にネットワークからリソースを取得しようとします。それが失敗すると、キャッシュからオフラインページを返します。

![6302ad4ba8460944.png](img/6302ad4ba8460944.png)

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L43)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.mode !== 'navigate') {
  // Not a page navigation, bail.
  return;
}
evt.respondWith(
    fetch(evt.request)
        .catch(() => {
          return caches.open(CACHE_NAME)
              .then((cache) => {
                return cache.match('offline.html');
              });
        })
);
```

`fetch`ハンドラはページナビゲーションを処理する必要があるだけなので、他の要求はハンドラからダンプされ、通常はブラウザによって処理されます。しかし、リクエストの`.mode`が`navitation`の場合、`fetch`を使用してネットワークからアイテムを取得しようとします。それが失敗すると、`catch`ハンドラで`caches.open(CACHE_NAME)`を使用してキャッシュを開き、`cache.match('offline.html')`を使用してプリキャッシュされたオフラインページを取得します。結果は`evt.respondWith()`を使ってブラウザに返します。

Key Point: `fetch`呼び出しを[`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)すると、ブラウザのデフォルトのフェッチ処理が妨げられ、応答を自分で処理したいブラウザに通知されます。 `fetch`ハンドラー内で`evt.respondWith()`しなければ、デフォルトのネットワーク動作が得られます。

#### DevToolsの余談

期待通りにすべてが機能することを確認しましょう。 [Service Workers]ペインを開いてページを更新すると、新しいService Workerがインストールされ、ステータス番号が増えます。

キャッシュされた内容を確認することもできます。 DevToolsの__Application__パネルの__Cache Storage__ペインに移動します。 __Cache Storage__を右クリックし、__Refresh Caches__を選択してセクションを展開すると、左側に静的キャッシュの名前が表示されます。キャッシュ名をクリックすると、キャッシュされているすべてのファイルが表示されます。

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

それでは、オフラインモードを試してみましょう。 DevToolsの__Service Workers__ペインに戻り、__ Offline__チェックボックスをオンにします。確認すると、__Network__パネルタブの横に小さな黄色い警告アイコンが表示されます。これはあなたがオフラインであることを示しています。

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

ページをリロードすれば…うまくいきます！ Chromeのオフライン恐竜ではなく、__独自の__オフラインパンダが表示されます。

### Service Workerをテストするためのヒント

Service Workerをデバッグすることは困難な場合があり、特にキャッシュを含むとき、期待どおりにキャッシュが更新されないと、物事はさらに悪夢のようになることがあります。典型的なService Workerのライフサイクルとあなたのコードのバグの間にすぐに不満がたまるかもしれません。 __しかしイライラしないでください。__

#### DevToolsを使用する

[アプリケーション]パネルの[Service Workers]ペインには、作業を楽にするいくつかのチェックボックスがあります。

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - チェックすると、オフラインの体験をシミュレートし、リクエストがネットワークに送信されるのを防ぎます。
* __Update on reload__ - チェックすると最新のService Workerを取得してインストールし、すぐに有効にします。
* __Bypass for network__ - チェックすると、リクエストがService Workerを迂回してネットワークに直接送信されます。

#### 新しく開始

場合によっては、キャッシュされたデータを自分でロードしているか、期待したとおりに更新されていないことがあります。保存されているすべてのデータ（localStorage、indexedDBデータ、キャッシュファイル）を消去してService Workerを削除するには、[アプリケーション]タブの[ストレージの消去]ペインを使用します。または、シークレットウィンドウで作業することもできます。

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

追加のヒント

* Service Workerがいったん登録解除されると、それを含んでいるブラウザウィンドウが閉じられるまでそれはリストされたままになるかもしれません。
* アプリが複数のウィンドウが開いている場合、新しいService Workerはすべてのウィンドウがリロードされて最新のService Workerに更新されるまで有効になりません。
* Service Workerの登録を解除してもキャッシュはクリアされません。
* Service Workerが存在しているときに新しいService Workerが登録しても、明示的に[すぐ制御を取らない限り](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 、ページがリロードされるまで新しいService Workerは制御を得ません

### Lighthouseで変更を確認

Lighthouseをもう一度実行して、変更内容を確認してください。変更を確認する前に、必ず[オフライン]チェックボックスをオフにしてください。

__SEO監査__

* __✅PASSED:__ 文書にメタ説明があります。

__プログレッシブウェブアプリ監査__

* __✅PASSED:__ 現在のページはオフライン時に200で応答します。
* __✅PASSED:__ `start_url`はオフライン時に200で応答します。
* __✅PASSED:__ ページと`start_url.`を制御するService Workerを登録します
* __✅PASSED:__ ウェブアプリマニフェストはインストール可能性の要件を満たしています。
* __✅PASSED:__ カスタムスプラッシュスクリーン用に設定されています。
* __✅PASSED:__ アドレスバーのテーマカラーを設定します。

## 完全なオフライン体験を提供する

少し時間をとって、携帯電話を機内モードにし、お気に入りのアプリをいくつか実行してみてください。ほとんどの場合、これらはかなり堅牢なオフライン体験を提供します。ユーザーは自分のアプリがその強力な体験を提供することを期待しています。それはウェブも変わらないはずです。プログレッシブウェブアプリは、コアシナリオとしてオフラインを使用して設計する必要があります。

Key Point: オフライン優先の設計では、アプリからのネットワーク要求数を減らすことでウェブアプリのパフォーマンスを大幅に向上させることができます。代わりに、リソースをローカルキャッシュから直接キャッシュして処理できます。最速のネットワーク接続を使用していたとしても、ローカルキャッシュからのサービスはさらに速いでしょう！

### Service Workerのライフサイクル

Service Workerのライフサイクルは最も複雑な部分です。あなたがそれが何をしようとしているのか、そして何が利益であるのかわからない場合は、それはあなたを打ちのめそうとしているように感じるかもしれません。しかし、それがどのように機能するのかを理解すれば、ウェブとネイティブのパターンを組み合わせて、シームレスで目立たないアップデートをユーザーに配信できます。

Key Point: このコードラボでは、Service Workerのライフサイクルの基本についてのみ説明しています。さらに深く掘り下げるには、WebFundamentalの[The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)を参照してください。

#### `install`イベント

Service Workerが最初に受け取るイベントは`install`です。ワーカーが実行されるとすぐにトリガーされ、Service Workerごとに1回だけ呼び出されます。 __Service Workerスクリプトを変更した場合、ブラウザーはそれを別のService Workerスクリプトと見なし__、新しく`install`イベントを発行します。

![72ed77b1720512da.png](img/72ed77b1720512da.png)

通常、`install`イベントは、アプリの実行に必要なすべてをキャッシュするために使用されます。

#### `activate`イベント

Service Workerは、起動するたびに`activate`イベントを受け取ります。 `activate`イベントの主な目的は、Service Workerの動作を設定し、前回の実行から残ったリソース（古いキャッシュなど）をクリーンアップし、Service Workerがネットワーク要求を処理できるようにすることです（たとえば、後述の`fetch`イベント）。

#### `fetch`イベント

フェッチイベントにより、Service Workerはネットワーク要求を傍受して要求を処理できます。ネットワークにアクセスしてリソースを取得したり、独自のキャッシュからリソースを取得したり、カスタムレスポンスやさまざまなオプションを生成したりできます。あなたが使用できるさまざまな戦略については[Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)をチェックしてください。

#### Service Workerの更新

ブラウザは、ページがロードされるたびに、Service Workerの新しいバージョンがあるかどうかを確認します。新しいバージョンが見つかると、新しいバージョンがバックグラウンドでダウンロードされインストールされますが、まだアクティブ化はされません。古いService Workerを使用するページが開いていなくなるまで、待機状態になります。古いService Workerを使用しているすべてのウィンドウが閉じられると、新しいService Workerがアクティブになり、制御を引き継ぎます。詳細については、Service Worker Lifecycleの[Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates)セクションを参照してください。

### 正しいキャッシング戦略を選ぶ

適切な[caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/)選択は、キャッシュしようとしているリソースの種類と、後で必要になる可能性がある方法によって異なります。天気アプリでは、キャッシュする必要があるリソースを2つのカテゴリに分けます。つまり、プリキャッシュするリソースと、実行時にキャッシュするデータです。

#### 静的リソースのキャッシュ

リソースを事前に把握することは、ユーザーがデスクトップまたはモバイルアプリをインストールしたときに起こることと似た概念です。アプリの実行に必要な主要なリソースは、ネットワーク接続があるかどうかにかかわらず後でロードできるように、インストールされるか、デバイスにキャッシュされます。

私たちのアプリでは、Service Workerがインストールされたときにすべての静的リソースを事前キャッシュして、アプリの実行に必要なすべてのものがユーザーのデバイスに保存されるようにします。我々のアプリが速く速くロードすることを確実にするために、[cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)戦略を使います。ネットワークにアクセスしてリソースを取得する代わりに、それらはローカルキャッシュから取得されます。それが利用できない場合にのみ、ネットワークから取得しようとします。

![44860840e2090bd8.png](img/44860840e2090bd8.png)

ローカルキャッシュから取得することで、ネットワークの変動がなくなります。ユーザーがどのような種類のネットワーク（WiFi、5G、3G、さらには2Gまで）に接続していても、実行する必要がある主要なリソースはほとんどすぐに利用できます。

Caution: このサンプルでは、静的リソースは[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)戦略を使用して提供されます。これによりネットワークに関係なくキャッシュされたコンテンツのコピーが返されることになります。`cache-first`戦略は実装が簡単ですが、将来的に課題を引き起こす可能性があります。

#### アプリデータのキャッシュ

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)は理想的な特定の種類のデータであり、我々のアプリではうまく機能します。できるだけ早く画面上にデータを表示し、ネットワークが最新のデータを返した後でそれを更新します。再検証の期限切れとは、1つはキャッシュへ、もう1つはネットワークへの2つの非同期要求を開始する必要があることを意味します。

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

通常の状況下では、キャッシュされたデータはアプリが使用できる最新のデータをアプリに提供するとすぐに返されます。その後、ネットワーク要求が返されると、アプリはネットワークからの最新データを使用して更新されます。

私たちのアプリでは、これはネットワークよりも優れた体験を提供し、ユーザーがネットワーク要求がタイムアウトして画面に表示されるまでタイムアウトするまで待つ必要がないため、キャッシュ戦略に戻ります。最初は古いデータが表示されることがありますが、ネットワーク要求が返されると、アプリは最新のデータで更新されます。

### アプリロジックを更新する

前述したように、アプリケーションは2つの非同期要求（キャッシュへの要求とネットワークへの要求）を開始する必要があります。アプリは`window`オブジェクトが持っている`caches`オブジェクトを使用して、キャッシュにアクセスし、最新のデータを取り出します。`caches`オブジェクトはすべてのブラウザで使用できるわけではないため、これはプログレッシブ拡張の優れた例です。`caches`オブジェクトがなくてもネットワークリクエストはまだ動作するはずです。

`getForecastFromCache()`関数を更新して、`caches`オブジェクトがグローバル`window`オブジェクトで利用できるかどうかを確認し、利用できればキャッシュにデータを要求するようにします。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L164)

```js
// CODELAB: Add code to get weather forecast from the caches object.
if (!('caches' in window)) {
  return null;
}
const url = `${window.location.origin}/forecast/${coords}`;
return caches.match(url)
    .then((response) => {
      if (response) {
        return response.json();
      }
      return null;
    })
    .catch((err) => {
      console.error('Error getting data from cache', err);
      return null;
    });
```

次にネットワークから予報を取得する`getForecastFromNetwork()`とキャッシュされた最新の予報を取得する`getForecastFromCache()`の２つの呼び出しを行うように、[`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196)を変更する必要があります。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

天気アプリは現在、1つはキャッシュから、もう1つは`fetch`を介してデータを得るため、２つの非同期要求を実行します。キャッシュにデータがある場合、それは非常に速く（数十ミリ秒）返されレンダリングされます。その後、`fetch`が応答すると、天気予報APIから直接取得された最新のデータでカードが更新されます。

キャッシュ要求と`fetch`要求がどちらも予報カードを更新するための呼び出しで終了することに注意してください。アプリは最新のデータを表示しているかどうかをどのように判断するのでしょうか？これは以下の`renderForecast()`のコードで処理されます。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

カードが更新されるたびに、アプリはカードの隠し属性にデータのタイムスタンプを保存します。カードにすでに存在するタイムスタンプが関数に渡されたデータよりも新しい場合、アプリは単に無視します。

### アプリリソースをプリキャッシュする

Service Workerで、 `DATA_CACHE_NAME`追加して、アプリケーションデータをアプリケーションシェルから分離できるようにしましょう。アプリシェルが更新され、古いキャッシュが削除されても、データはそのまま維持され、超高速ロードに備えます。データフォーマットが将来変更された場合、それを処理し、アプリのシェルとコンテンツを確実に同期させる方法が必要になります。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

`CACHE_NAME`も更新することを忘れないでください。静的リソースもすべて変更します。

アプリがオフラインで動作するためには、必要なすべてのリソースを事前キャッシュする必要があります。これも私たちのパフォーマンスに役立ちます。アプリはネットワークからすべてのリソースを取得する代わりに、ローカルキャッシュからそれらすべてを読み込むことができるため、ネットワークが不安定になることはありません。

ファイルのリストで`FILES_TO_CACHE`配列を更新します。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/install.js',
  '/scripts/luxon-1.11.4.js',
  '/styles/inline.css',
  '/images/add.svg',
  '/images/clear-day.svg',
  '/images/clear-night.svg',
  '/images/cloudy.svg',
  '/images/fog.svg',
  '/images/hail.svg',
  '/images/install.svg',
  '/images/partly-cloudy-day.svg',
  '/images/partly-cloudy-night.svg',
  '/images/rain.svg',
  '/images/refresh.svg',
  '/images/sleet.svg',
  '/images/snow.svg',
  '/images/thunderstorm.svg',
  '/images/tornado.svg',
  '/images/wind.svg',
];
```

キャッシュするファイルのリストを手動で生成しているので、ファイルを更新すると__毎回`CACHE_NAME`を更新しなければいけません__。キャッシュされたファイルのリストから`offline.html`を削除することができました。これは我々のアプリがオフラインで動作するために必要なすべてのリソースを持っていて、再びオフラインページを表示することはないからです。

Caution: このサンプルでは、私達はService Workerを自身で用意しました。静的リソースを更新するたびに、Service Workerを用意し直してキャッシュを更新する必要があります。そうしないと、古いコンテンツが提供されます。さらに、1つのファイルが変更されると、キャッシュ全体が無効になり、再ダウンロードする必要があります。つまり、単純な1文字のスペルミスを修正するとキャッシュが無効になり、すべてのものを再度ダウンロードする必要がありますが、必ずしも効率的ではありません。 [Workbox](/web/tools/workbox/)はこれをビルドプロセスに統合することによって優雅に処理し、変更されたファイルだけが更新され、ユーザーのための帯域幅を節約し、メンテナンスを容易にします！

#### activateイベントハンドラを更新する

`service-worker.js`の`activate`イベントで、`activate`イベントが誤ってデータを削除しないようにするには`if (key !== CACHE_NAME) {`を以下で置き換えてください。

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### フェッチイベントハンドラを更新する

天気予報APIへのリクエストを傍受してそれらのレスポンスをキャッシュに保存するようにService Workerを修正する必要があります。そうすれば後で簡単にアクセスできるようになります。stale-while-revalidate戦略では、ネットワークの応答が「真実の源」であり、常に最新の情報を提供してくれることを期待しています。それができない場合は、アプリで最新のキャッシュデータをすでに取得しているため、失敗しても問題ありません。

`fetch`イベントハンドラを更新して、他の要求とは別にデータAPIへの要求を処理するようにしてください。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L42)

```js
// CODELAB: Add fetch event handler here.
if (evt.request.url.includes('/forecast/')) {
  console.log('[Service Worker] Fetch (data)', evt.request.url);
  evt.respondWith(
      caches.open(DATA_CACHE_NAME).then((cache) => {
        return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
              return response;
            }).catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
      }));
  return;
}
evt.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(evt.request)
          .then((response) => {
            return response || fetch(evt.request);
          });
    })
);
```

コードは要求を傍受し、それが天気予報用かどうかを確認します。そうであれば、`fetch`を使用して要求を出します。応答が返されたら、キャッシュを開き、応答を複製し、それをキャッシュに格納して、応答を元の要求者に返します。

ナビゲーションだけでなく、Service Workerにすべての要求（画像、スクリプト、CSSファイルなどを含む）を処理させたいので、 `evt.request.mode !== 'navigate'`チェックを削除する必要があります。そのチェックインを終了した場合、HTMLのみがService Workerキャッシュから提供され、それ以外のものはすべてネットワークから要求されます。

### 試してみる

アプリは完全にオフラインで動作します。最新のService Workerがインストールされていることを確認するためにページを更新してから、いくつかの都市を保存し、アプリの更新ボタンを押して新鮮な天気データを取得します。

その後、DevToolsの__Application__パネルの__Cache Storage__ペインに進みます。セクションを展開すると、左側に静的キャッシュとデータキャッシュの名前が表示されます。データキャッシュを開くと、各都市に保存されているデータが表示されます。

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

次に、DevToolsを開いて[Service Workers]ペインに切り替え、[Offline]チェックボックスをオンにしてからページをリロードしてから、オフラインにしてページをリロードします。

高速ネットワーク上にあり、低速接続で天気予報データがどのように更新されるかを知りたい場合は、 `FORECAST_DELAY`プロパティを`server.js`に`5000`ます。予報APIへのすべてのリクエストは5000ミリ秒遅れます。

### Lighthouseで変更を確認

Lighthouseをもう一度実行してもいいでしょう。

__SEO監査__

* __✅PASSED:__ 文書にメタ説明があります。

__プログレッシブウェブアプリ監査__

* __✅PASSED:__ 現在のページはオフライン時に200で応答します。
* __✅PASSED:__ `start_url`はオフライン時に200で応答します。
* __✅PASSED:__ ページと`start_url.`を制御するService Workerを登録します
* __✅PASSED:__ ウェブアプリマニフェストはインストール可能性の要件を満たしています。
* __✅PASSED:__ カスタムスプラッシュスクリーン用に設定されています。
* __✅PASSED:__ アドレスバーのテーマカラーを設定します。

## インストール体験を追加

プログレッシブウェブアプリがインストールされると、他のすべてのインストール済みアプリケーションと同じように見え、動作します。他のアプリの起動と同じ場所から起動します。アドレスバーや他のブラウザUIなしでアプリで実行されます。他のインストール済みアプリと同様に、タスクスイッチャーのトップレベルのアプリです。

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

Chromeでは、プログレッシブウェブアプリは3ドットのコンテキストメニューからインストールすることも、アプリをインストールするように促すボタンやその他のUIコンポーネントをユーザーに提供することもできます。

Success: Chromeの3ドットコンテキストメニューのインストール体験は多少埋もれているため、アプリをインストールできることをユーザーに通知するための表示と、インストールプロセスを完了するためのインストールボタンを表示することをおすすめします。

### Lighthouseで監査

ユーザーがプログレッシブウェブアプリをインストールできるようにするには、 [いくつかの条件](/web/fundamentals/app-install-banners/#criteria)を満たす必要があります。それを知る最も簡単な方法は、Lighthouseを使用してそれがインストール可能な基準を満たしていることを確認することです。

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

もしあなたがこのコードラボで作業しているのであれば、PWAはすでにこれらの基準を満たしているはずです。

Key Point: このセクションでは、DevToolsの** Application **パネルの** Service Workers **ペインで** Bypass for network **チェックボックスを有効にします。チェックすると、要求はService Workerを迂回してネットワークに直接送信されます。このセクションで作業中にService Workerを更新する必要がないので、これによって開発プロセスが簡単になります。

### index.htmlにinstall.jsを追加する

まず、 `install.js`を`index.html`ファイルに追加しましょう。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### `beforeinstallprompt`イベントを`beforeinstallprompt`

ホーム画面に追加[するための条件](/web/fundamentals/app-install-banners/#criteria)が満たされると、Chromeは`beforeinstallprompt`イベントを発生させます。 `beforeinstallprompt`イベントを使用してアプリを「インストール」できることを示し、インストールを促すことができます。以下のコードを追加して`beforeinstallprompt`イベントをリスンします。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### イベントを保存してインストールボタンを表示

`saveBeforeInstallPromptEvent`関数で、後で`prompt()`を呼び出せるように`beforeinstallprompt`イベントの参照を保存して，インストールボタンを表示するようUIを更新できます。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L34)

```js
// CODELAB: Add code to save event & show the install button.
deferredInstallPrompt = evt;
installButton.removeAttribute('hidden');
```

### プロンプトを表示する/ボタンを隠す

ユーザーがインストールボタンをクリックすると、保存された`beforeinstallprompt`イベントで`.prompt()`を呼び出す必要があります。 `.prompt()`は保存されたイベントごとに一度だけ`.prompt()`ことができるため、インストールボタンも非表示にする必要があります。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L45)

```js
// CODELAB: Add code show install prompt & hide the install button.
deferredInstallPrompt.prompt();
// Hide the install button, it can't be called twice.
evt.srcElement.setAttribute('hidden', true);
```

`.prompt()`を呼び出すと、モーダルダイアログがユーザーに表示され、ホーム画面にアプリを追加するように求められます。

### 結果を記録する

保存された`beforeinstallprompt`イベントの`userChoice`プロパティによって返されるpromiseをリスンして、ユーザーがインストールダイアログにどのように応答したかを確認できます。プロンプトが表示され、ユーザーがそれに応答すると、promiseは`outcome`プロパティを持つオブジェクトを返します。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L47)

```js
// CODELAB: Log user response to prompt.
deferredInstallPrompt.userChoice
    .then((choice) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt', choice);
      } else {
        console.log('User dismissed the A2HS prompt', choice);
      }
      deferredInstallPrompt = null;
    });
```

`userChoice`について一点コメントとして、[仕様はプロパティとして定義され](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface)、期待するように関数としては定義されません。

#### すべてのインストールイベントをログに記録

アプリをインストールするために追加したUIに加えて、ユーザーは他の方法、たとえばChromeの3ドットメニューを使ってPWAをインストールすることもできます。これらのイベントを追跡するには、appinstalledイベントを監視してください。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

次に`logAppInstaled`関数を更新する必要があります。このコードラボでは単に`console.log`を使用しますが、実際のコードではおそらく解析ソフトウェアのイベントとしてログを残したいでしょう。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### Service Workerを更新

すでにキャッシュされているファイルを変更したので、 `service-worker.js`ファイルの`CACHE_NAME`を更新することを忘れないでください。 DevToolsの[アプリケーション]パネルの[Service Workers]ペインで[ネットワークへのバイパス]チェックボックスを有効にしても開発はできますが、実際には役に立ちません。

### 試してみる

インストール手順がどのように行われたかを見てみましょう。安全のために、DevToolsの[アプリケーション]パネルにある[サイトのクリアデータ]ボタンを使用してすべてを消去し、新しい作業を始めましょう。以前にアプリをインストールした場合は、必ずアンインストールしてください。そうしないと、インストールアイコンが再び表示されません。

#### インストールボタンが見えることを確認

まず、インストールアイコンが正しく表示されることを確認しましょう。デスクトップとモバイルの両方で試してください。

1. 新しいChromeタブでURLを開きます。
2. Chromeの3ドットメニュー（アドレスバーの横）を開きます。 メニューに「* Install Weather ... *」と表示されていることを確認します。
3. 右上隅にある更新ボタンを使用して気象データを更新し、 [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria)を確実に満たします。 installインストールアイコンがアプリのヘッダーに表示されていることを確認します。

#### インストールボタンが機能することを確認

次に、すべてが正しくインストールされ、イベントが正しく起動されるようにしましょう。これはデスクトップまたはモバイルのどちらでも実行できます。モバイルでこれをテストしたい場合は、コンソールに何が記録されているかを確認できるように、リモートデバッグを使用していることを確認してください。

1. Chromeを開き、新しいブラザタブでWeather PWAを表示します。
2. DevToolsを開き、Consoleペインを表示します。
3. 右上のインストールボタンをクリックします。
▢ インストールボタンが消えることを確認します。
▢ インストールモーダルダイアログが表示されることを確認します。
4. キャンセルをクリックします。
▢ コンソール出力に"*User dismissed the A2HS prompt*"が表示されていることを確認します。
▢ インストールボタンが再表示されることを確認します。
5. もう一度インストールボタンをクリックし、さらにモーダルダイアログでインストールボタンをクリックします。
▢ コンソール出力に"*User accepted the A2HS prompt*"が表示されていることを確認します。
▢ コンソール出力に"*Weather App was installed*"が表示されていることを確認します。
▢ 通常アプリが表示されるところにWeatherアプリが追加されていることを確認します。
6. Weather PWAを起動します。
▢ デスクトップのアプリウィンドウもしくはモバイルのフルスクリーンで、アプリがスタンドアロンアプリとして起動することを確認します。

localhostからデスクトップで実行している場合、localhostはセキュアホストとは見なされないため、インストールしたPWAにアドレスバナーが表示されることがあります。

#### iOSのインストールが正しく機能していることを確認する

iOSの動作も確認しましょう。あなたがiOSデバイスを持っているならば、それを使うことができます、またはMacを使っているならば、Xcodeで利用可能なiOSシミュレータを試してください。

1. Safariを開き、新しいブラウザタブでWeather PWAに移動します。
2. [共有]をクリックします。 [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png)ボタン
3. 右にスクロールして[ホーム画面に追加]ボタンをクリックします。タイトル、URL、およびアイコンが正しいことを確認します。
4. [追加]をクリックします。homeアプリのアイコンがホーム画面に追加されたことを確認します。
5. ホーム画面からWeather PWAを起動します。 appアプリがフルスクリーンで起動することを確認します。

### Bonus: アプリがホーム画面から起動されたかどうかを検出する

`display-mode`メディアクエリを使用すると、アプリの起動方法に応じてスタイルを適用したり、JavaScriptで起動した方法を判断したりできます。

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

[スタンドアロンで動作しているかどうかをJavaScript確認する](/web/fundamentals/app-install-banners/#detect-mode)ために`display-mode`メディアクエリを使用することもできます。

### Bonus: PWAのアンインストール

アプリが既にインストールされている場合は`beforeinstallevent`が`beforeinstallevent`しないことを忘れないでください。そのため、開発中は、 `beforeinstallevent`のアプリケーションが`beforeinstallevent`機能することを確認するために、アプリを何度かインストールおよびアンインストールすることがあります。

#### Android

Androidでは、他のインストール済みアプリがアンインストールされるのと同じ方法でPWAがアンインストールされます。

* アプリの引き出しを開きます。
* 下にスクロールして天気アイコンを見つけます。
* アプリのアイコンを画面上部にドラッグします。
* アンインストールを選択してください*

#### ChromeOS

ChromeOSでは、PWAはランチャー検索ボックスから簡単にアンインストールできます。

* ランチャーを開きます。
* 検索ボックスに「* Weather *」と入力すると、Weather PWAが結果に表示されます。
* Weather PWAを右クリック（alt-クリック）してください。
* クリック*Chromeから削除...*

#### macOSとWindows

MacおよびWindowsでは、PWAはChromeからアンインストールする必要があります。

* 新しいブラウザタブで、chrome://appsを開きます。
* Weather PWAを右クリック（alt-クリック）してください。
* クリック*Chromeから削除...*

## おめでとうございます

おめでとうございます、あなたは最初のプログレッシブウェブアプリを無事に構築しました！

ウェブアプリマニフェストをインストールしてインストールできるようにし、Service Workerを追加して、PWAが常に高速で信頼できるものであることを確認しました。 DevToolsを使用してアプリを監査する方法と、ユーザー体験の向上にどのように役立つかを学びました。

これで、ウェブアプリをプログレッシブウェブアプリに変えるために必要な主な手順がわかりました。

### さらに読む

* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Service Worker Caching Strategies Based on Request Types](https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c)

### 参考資料

* [Web App Manifest docs](/web/fundamentals/web-app-manifest)
* [Web App Manifest properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members)
* [Install & Add to Home Screen](/web/fundamentals/app-install-banners/)
* [Service Worker Overview](/web/fundamentals/primers/service-workers/)
* [Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)
* [High-performance service worker loading](/web/fundamentals/primers/service-workers/high-performance-loading)
* [Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/#generic-fallback)

## 問題が見つかったか、フィードバックがありますか？ {: .hide-from-toc }

[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)を登録してコードラボの改善を助けてください。ありがとう！

Translated by: Ando Yasushi

{% include "web/_shared/translation-end.html" %}
