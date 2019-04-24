project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{% include "web/_shared/machine-translation-start.html" %}

{# wf_auto_generated #}
{# wf_updated_on: 2019-04-19 #}
{# wf_published_on: 2016-01-01 #}

# はじめてのプログレッシブ ウェブアプリ {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

## はじめに

### 何がWebアプリ、プログレッシブWebアプリを作るのですか？

プログレッシブWebアプリは、デスクトップとモバイルでインストール可能なアプリのような体験を提供します。これらはWeb経由で直接構築され配信されます。高速で信頼性の高いWebアプリです。そして最も重要なことに、それらはどのブラウザでも動作するWebアプリケーションです。今日Webアプリケーションを構築しているのであれば、すでにプログレッシブWebアプリケーションを構築する方向に向かっています。

#### 高速＆高信頼性

すべてのWebエクスペリエンスは高速である必要があります。これは特にプログレッシブWebアプリに当てはまります。高速とは、画面上に意味のあるコンテンツを表示し、5秒以内にインタラクティブな体験を提供するのにかかる時間のことです。

そして、それは確実に速いはずです。信頼性の高いパフォーマンスがどれほど優れているかを十分に強調することは困難です。このように考えてください。ネイティブアプリの最初のロードはイライラするものです。それはアプリストアと巨大なダウンロードによってゲートされます、しかし、あなたがアプリがインストールされるところに着くと、その前払い費用はすべてのアプリ開始にわたって償却されます、そしてそれらの開始のどれも可変遅延を持ちません。各アプリケーションの起動は、最後のものと同じくらい速く、変化はありません。プログレッシブWebアプリは、インストールされた経験からユーザーが期待するようになったこの信頼できるパフォーマンスを提供しなければなりません。

#### インストール可能

プログレッシブWebアプリはブラウザタブで実行できますが、インストールも可能です。サイトをブックマークしてもショートカットが追加されるだけですが、インストールされているプログレッシブWebアプリケーションは他のインストールされているアプリケーションと同じように見え、動作します。他のアプリの起動と同じ場所から起動します。カスタマイズしたスプラッシュスクリーン、アイコンなどを含めて、起動エクスペリエンスを制御できます。アドレスバーや他のブラウザUIなしのアプリウィンドウで、アプリとして実行されます。他のインストール済みアプリと同様に、タスクスイッチャーのトップレベルのアプリです。

覚えておいて、それはインストール可能なPWAが高速かつ信頼性が高いことが重要です。 PWAをインストールするユーザーは、どのような種類のネットワーク接続であっても、自分のアプリが機能することを期待します。これは、インストールされているすべてのアプリが満たすべき基本的な期待です。

#### モバイル＆デスクトップ

レスポンシブデザイン技法を使用して、プログレッシブWebアプリはプラットフォーム間で単一のコードベースを使用して、モバイルデスクトップとモバイルデスクトップの両方で機能します。ネイティブアプリの作成を検討している場合は、PWAが提供する利点を見てください。

### 何を構築します

このコードラボでは、Progressive Web Appの手法を使って天気予報Webアプリケーションを作成します。あなたのアプリは:

* レスポンシブデザインを使用するので、デスクトップまたはモバイルで機能します。
* 実行に必要なアプリケーションリソース（HTML、CSS、JavaScript、画像）を事前キャッシュし、実行時に天気データをキャッシュしてパフォーマンスを向上させるために、サービス担当者を使用して高速化
* Webアプリのマニフェストと`beforeinstallprompt`イベントを使用してインストール可能にし、ユーザーにインストール可能であることを通知します。

![95fe6f7fbeee5bb1.png](img/95fe6f7fbeee5bb1.png)

Warning: このコードラボを簡素化し、オフライン体験を提供するための基本を説明するために、私たちは標準のJavaScriptを使用します。プロダクションアプリでは、 [Workbox](/web/tools/workbox/)などのツールを使用してサービスワーカーを構築することを強くお勧めします。それはあなたが遭遇するかもしれない鋭いエッジと暗いコーナーの多くを取り除きます。

### あなたは何を学ぶでしょう

* Webアプリのマニフェストを作成および追加する方法
* 簡単なオフライン体験を提供する方法
* 完全なオフライン体験を提供する方法
* アプリをインストール可能にする方法

このコードラボはプログレッシブWebアプリに焦点を当てています。関連性のない概念やコードブロックについては、まとめてコピーして貼り付けるために提供されています。

### あなたが必要とするもの

* Chromeの最近のバージョン（74以降）PWAは単なるWebアプリケーションであり、すべてのブラウザで機能しますが、ブラウザレベルで何が起こっているのかをよりよく理解するためにChrome DevToolsのいくつかの機能を使用します。インストール体験をテストします。
* HTML、CSS、JavaScript、そして[Chrome DevTools](https://developer.chrome.com/devtools) 。

## Getting setup

### Dark Sky APIの鍵を手に###う

私たちの気象データは[Dark Sky API](https://darksky.net/dev)から来てい[Dark Sky API](https://darksky.net/dev) 。それを使用するためには、APIキーをリクエストする必要があります。それは使いやすく、そして非商業的なプロジェクトのために無料です。

[Register for API Key](https://darksky.net/dev/register)

Note: Dark Sky APIキーがなくても、このコードラボを完成させることができます。私たちのサーバーがDark Sky APIから本物のデータを取得できない場合は、代わりに偽のデータが返されます。

#### APIキーが正しく機能していることを確認してください

APIキーが正しく機能していることをテストするには、DarkSky APIにHTTPリクエストを送信します。下記のURLを更新して`DARKSKY_API_KEY`をあなたのAPIキーに置き換えてください。すべてうまくいったら、ニューヨークの最新の天気予報を見るべきです。

`https://api.darksky.net/forecast/DARKSKY_API_KEY/40.7720232,-73.9732319`

### コードを入手する

このプロジェクトに必要なものはすべてGitリポジトリに入れました。始めるには、コードを入手してお気に入りの開発環境で開く必要があります。このコードラボでは、Glitchの使用をお勧めします。

#### 強く推奨:レポをインポートするにはグリッチを使用してください。

このコードラボで作業するには、Glitchを使用することをお勧めします。

1. Open a new browser tab and go to  [https://glitch.com](https://glitch.com).
2. If you don't have an account, you'll need to sign up.
3. Click __New Project__, then __Clone from Git Repo.__
4. Clone __https://github.com/googlecodelabs/your-first-pwapp.git__ and click OK.
5. Once the repo has loaded, edit the `.env` file, and update it with your DarkSky API key.
6. Click the __Show Live__ button to see the PWA in action.

#### 代替案:コードをダウンロードしてローカルに作業する

コードをダウンロードしてローカルで作業する場合は、最新バージョンのNode、およびコードエディタをセットアップしてすぐに使用できる状態になっている必要があります。

Caution: あなたがローカルで作業している場合、Lighthouseの監査の一部は合格せず、ローカルサーバーは安全なコンテキストでコンテンツを提供しないため、インストールが利用できない場合があります。

[Download source code](https://github.com/googlecodelabs/your-first-pwapp/archive/master.zip)

1. ダウンロードしたzipファイルを解凍します。
2. `npm install`を実行して、サーバーの実行に必要な依存関係をインストールします。
3. `server.js`を編集して、DarkSky APIキーを設定します。
4. ファイル名を指定して実行`node server.js` 8000
5. 開きポート上のブラウザタブサーバを起動する[http://localhost:8000](http://localhost:8000)

## ベースラインを確立します

### 私たちの出発点は何ですか？

私たちの出発点は、このcodelab用に設計された基本的な天気アプリです。このコードラボの概念を示すためにコードが過度に単純化されており、エラー処理がほとんどありません。本番アプリケーションでこのコードを再利用することを選択した場合は、エラーを処理してすべてのコードを完全にテストするようにしてください。

試すべきいくつかのこと...

1. 右下隅に青いプラスボタンを使って新しい都市を追加します。
2. 右上隅の更新ボタンでデータを更新します。
3. 各都市カードの右上にあるxを使用して都市を削除します。
4. デスクトップとモバイルでどのように機能するかを確認します。
5. あなたがオフラインになったときに何が起こるか見てください。
6. Chromeの[ネットワーク]パネルを使用して、ネットワークがSlow 3Gに制限されたときに何が起こるかを確認します。
7. 変更することにより、予測サーバーに遅延を追加`FORECAST_DELAY`して`server.js`

### 灯台###監査

[Lighthouse](/web/tools/lighthouse/#devtools)はあなたのサイトやページの品質を向上させるのに役立つ使いやすいツールです。パフォーマンス、アクセシビリティ、プログレッシブWebアプリケーションなどの監査があります。各監査には、監査が重要である理由とその修正方法を説明する参照文書があります。

![b112675caafccef0.png](img/b112675caafccef0.png)

Lighthouseを使用してWeatherアプリを監査し、行った変更を確認します。

Note: Lighthouseは、Chrome DevTools内で、コマンドラインから、またはNodeモジュールとして実行できます。 Webアプリケーションが後退しないように、ビルドプロセスに[adding Lighthouse](https://github.com/GoogleChromeLabs/lighthousebot)を考慮してください。

### 灯台を###う

1. 新しいタブでプロジェクトを開きます。
2. Chrome DevToolsを開いて__Audits__タブに切り替えると、DevToolsは監査カテゴリのリストを表示します。それらはすべて有効のままにします。
3. [監査の実行]をクリックします。60〜90秒後に、Lighthouseによってページにレポートが表示されます。

### プログレッシブWebアプリ監査

プログレッシブWebアプリケーション監査の結果に焦点を当てます。

![af1a64a13725428e.png](img/af1a64a13725428e.png)

そして注目するべきたくさんの赤があります:

* __❗フェイル:__ 現在のページはオフライン時に200で応答しません。
* __❗フェイル:__ `start_url`はオフライン時に200で応答しません。
* __❗フェイル:__  ページと`start_url.`を制御するサービスワーカーを登録しません。
* __❗フェイル:__ Webアプリマニフェストはインストール可能性の要件を満たしていません。
* __❗フェイル:__ カスタムスプラッシュスクリーン用に設定されていません。
* __❗フェイル:__ アドレスバーのテーマカラーを設定しません。

飛び込んで、これらの問題のいくつかを修正し始めましょう！

## Webアプリのマニフェストを追加する

このセクションの終わりまでに、私たちの天気アプリは以下の監査に合格します。

* Webアプリマニフェストはインストール可能性の要件を満たしていません。
* カスタムスプラッシュスクリーン用に設定されていません。
* アドレスバーのテーマカラーを設定しません。

### Webアプリマニフェストを作成する

[web app manifest](/web/fundamentals/web-app-manifest)はシンプルなJSONファイルで、開発者はあなたのアプリがユーザーにどのように見えるかを制御することができます。

Webアプリマニフェストを使用すると、Webアプリは次のことができます。

* あなたのアプリをスタンドアローンウィンドウ（ `display` ）で開きたいブラウザに伝えてください。
* アプリを最初に起動したときに開くページを定義します（ `start_url` ）。
* ドックまたはアプリランチャー（ `short_name` 、 `icons` ）でアプリの外観を定義します。
* スプラッシュスクリーンを作成します（ `name` 、 `icons` 、 `colors` ）。
* ウィンドウを横長または縦長モード（ `orientation` ）で開くようブラウザに`orientation`ます。
* そして[plenty more](https://developer.mozilla.org/en-US/docs/Web/Manifest#Members) 。

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

Note: Chromeをインストールするには、少なくとも192 x 192 pxのアイコンと512 x 512 pxのアイコンを用意する必要があります。しかし他のサイズを提供することもできます。 Chromeは48dpに最も近いアイコンを使用します。たとえば、2倍速のデバイスでは96倍、3倍のデバイスでは144倍となります。

### Webアプリマニフェストへのリンクを追加する

次に、アプリの各ページに`<link rel="manifest"...`を追加して、ブラウザにマニフェストについて通知する必要があります。 `index.html`ファイルの`<head>`要素に次の行を追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L30)

```html
<!-- CODELAB: Add link rel manifest -->
<link rel="manifest" href="/manifest.json">
```

#### DevTools迂回路

DevToolsはあなたの`manifest.json`ファイルをチェックするための迅速で簡単な方法を提供します。 __Application__パネルの__Manifest__ペインを開きます。マニフェスト情報を正しく追加した場合は、解析されて見やすい形式でこのペインに表示されます。

![c462743e1bc26958.png](img/c462743e1bc26958.png)

### iOSのメタタグとアイコンを追加

iOSのSafariは、Webアプリケーションのマニフェスト（サポートされていない[yet](https://webkit.org/status/#specification-web-app-manifest)追加する必要がありますので、） [traditional `meta` tags](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)する`<head>`あなたの`index.html`ファイル:

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L31)

```html
<!-- CODELAB: Add iOS meta tags and icons -->
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta name="apple-mobile-web-app-title" content="Weather PWA">
<link rel="apple-touch-icon" href="/images/icons/icon-152x152.png">
```

### ボーナス:Easy Lighthouseの修正

私たちのLighthouseの監査では、修正が非常に簡単な他のいくつかの問題が指摘されています。

#### メタ####設定

SEO監査の下、LighthouseはGoogleの検索結果に「 [Document does not have a meta description.](/web/tools/lighthouse/audits/description) 」の説明が表示される可能性があると指摘しました。高品質で一意の説明は、検索結果を検索ユーザーにとってより関連性の高いものにし、検索トラフィックを増やすことができます。

説明を追加するには、文書の`<head>`に次の`meta`タグを追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L32)

```html
<!-- CODELAB: Add description here -->
<meta name="description" content="A sample weather app">
```

#### アドレスバーのテーマカラーを設定する

PWA監査で、Lighthouseは我々のアプリ「 [Does not set an address-bar theme color](/web/tools/lighthouse/audits/address-bar) 」に注目しました。ブランドの色に合わせてブラウザのアドレスバーをテーマにすると、より没入型のユーザーエクスペリエンスが提供されます。

モバイルでテーマカラーを設定するには、次の`meta`タグをドキュメントの`<head>`に追加します。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L33)

```html
<!-- CODELAB: Add meta theme-color -->
<meta name="theme-color" content="#2F3BA2" />
```

### Lighthouseで変更を確認してください

（[監査]ウィンドウ枠の左上隅にある+記号をクリックして）再度Lighthouseを実行し、変更内容を確認します。

__SEO監査__

* __✅過ぎた:__ 文書にメタ説明があります。

__プログレッシブWebアプリ監査__

* __❗フェイル:__ 現在のページはオフライン時に200で応答しません。
* __❗フェイル:__  `start_url`はオフライン時に200で応答しません。
* __❗フェイル:__ ページと`start_url.`を制御するサービスワーカーを登録しません。
* __✅過ぎた:__ Webアプリマニフェストはインストール可能性の要件を満たしています。
* __✅過ぎた:__ カスタムスプラッシュスクリーン用に設定されています。
* __✅過ぎた:__ アドレスバーのテーマカラーを設定します。

## 基本的なオフライン体験を提供する

ユーザーがオフラインであれば、インストールされたアプリは常に基本的なエクスペリエンスを維持することが期待されています。だからこそ、インストール可能なWebアプリにとってChromeのオフライン恐竜が絶対に表示されないようにすることが重要です。オフラインエクスペリエンスには、単純なオフラインページから、以前にキャッシュされたデータを含む読み取り専用エクスペリエンス、ネットワーク接続が回復したときに自動的に同期する完全に機能するオフラインエクスペリエンスまで、さまざまなものがあります。

このセクションでは、天気アプリに簡単なオフラインページを追加します。ユーザーがオフライン中にアプリをロードしようとすると、ブラウザに表示される通常のオフラインページの代わりに、カスタムページが表示されます。このセクションの終わりまでに、私たちの天気アプリは以下の監査に合格します。

* 現在のページはオフライン時に200で応答しません。
* `start_url`はオフライン時に200で応答しません。
* ページと`start_url.`を制御するサービスワーカーを登録しません

次のセクションでは、カスタムオフラインページを完全なオフラインエクスペリエンスに置き換えます。これによりオフライン環境が改善されますが、より重要なことに、ほとんどのアセット（HTML、CSS、およびJavaScript）がローカルに保存および配信され、潜在的なボトルネックとなるネットワークが排除されるため、パフォーマンスが大幅に向上します。

### サービス労働者が救助に

サービスワーカーに慣れていないのであれば、 [Introduction To Service Workers](/web/fundamentals/primers/service-worker/)を読んで彼らができること、ライフサイクルの仕組みなどについて基本的な理解を得ることができます。このコードラボを修了したら、必ず[Debugging Service Workers code lab](http://goo.gl/jhXCBy)をチェックして、サービスワーカーと連携する方法についてさらに詳しく調べてください。

サービスワーカー経由で提供される機能は漸進的な機能強化と見なされ、ブラウザでサポートされている場合にのみ追加されます。たとえば、サービスワーカーでは、アプリの[app shell](/web/fundamentals/architecture/app-shell)とデータをキャッシュできるため、ネットワークが利用できなくても利用できます。サービス担当者がサポートされていないと、オフラインコードは呼び出されず、ユーザーは基本的な操作を経験できます。プログレッシブエンハンスメントを提供するために機能検出を使用することはほとんどオーバーヘッドを持ちません、そしてそれはその機能をサポートしない古いブラウザで壊れることはありません。

Warning: Service Workerの機能はHTTPS経由でアクセスされるページでのみ利用可能です（http:// localhostと同等のものもテストを容易にするために機能します）。

### サービスワーカーを登録します

最初のステップはサービスワーカーを登録することです。次のコードを`index.html`ファイルに追加してください。

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

このコードは、サービスワーカーAPIが利用可能かどうかを確認し、利用可能な場合は、ページが[loaded](/web/fundamentals/primers/service-workers/registration) 、 `/service-worker.js`のサービスワーカーが登録されます。

サービスワーカーは、 `/scripts/`ディレクトリからではなく、ルートディレクトリからサービスを受けます。これは、サービスワーカーの`scope` __を設定する最も簡単な方法です。サービス作業員の`scope`は、サービス作業員がどのファイルを制御するか、つまり、サービス作業員がどのパスから要求を傍受するかを決定します。デフォルトの`scope`はサービスワーカーファイルの場所で、以下のすべてのディレクトリに拡張されています。したがって、 `service-worker.js`がルートディレクトリにある場合、サービスワーカーはこのドメインのすべてのWebページからの要求を制御します。

### Precacheオフラインページ

まず、何をキャッシュするかをサービスワーカーに伝える必要があります。単純な[offline page](https://your-first-pwa.glitch.me/offline.html) （ `public/offline.html` ）は既に作成されており、ネットワーク接続がない場合はいつでも表示されます。

`service-worker.js`で、 `'/offline.html',`を`FILES_TO_CACHE`配列に追加します。最終結果は次のようになります。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L23)

```js
// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  '/offline.html',
];
```

次に、 `install`イベントを更新して、サービスワーカーにオフラインページのプリキャッシュを指示します。

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

Note: サービスワーカーのイベントとライフサイクルは次のセクションで説明されています。

`install`イベントは`caches.open()`でキャッシュを開き、キャッシュ名を提供します。キャッシュ名を指定すると、ファイルをバージョン管理したり、キャッシュされたリソースからデータを分離したりして、一方を簡単に更新できるが他方には影響しないようにすることができます。

キャッシュがオープンされると、次に`cache.addAll()`を呼び出すことができます。これはURLのリストを取り、サーバーからそれらを取り出して、その応答をキャッシュに追加します。個々の要求のいずれかが失敗した場合、 `cache.addAll()`は拒否します。つまり、インストール手順が成功した場合、キャッシュは一貫した状態になるという保証があります。しかし、何らかの理由で失敗した場合は、次回サービスワーカーが起動したときに自動的に再試行されます。

#### DevTools迂回路

DevToolsを使用してサービスワーカーを理解し、デバッグする方法を見てみましょう。ページをリロードする前に、DevToolsを開き、__Application__パネルの__Service Workers__ペインに移動します。これは次のようになります。

![b3aa37b67863fd03.png](img/b3aa37b67863fd03.png)

このような空白のページが表示されたら、現在開いているページに登録されているサービス担当者がいないことを意味します。

今、あなたのページをリロードしてください。 [Service Workers]ペインは次のようになります。

![69808e4bf3aee41b.png](img/69808e4bf3aee41b.png)

このような情報が表示されたら、そのページでサービスワーカーが実行されているということです。

ステータスラベルの隣には番号があります（この場合は* 34251 *）。サービスワーカーと仕事をしているときはその番号を見てください。サービス担当者が更新されたかどうかを確認するのは簡単な方法です。

### 古いオフラインページのクリーンアップ

`activate`イベントを使用して、キャッシュ内の古いデータをクリーンアップします。このコードは、アプリケーションシェルファイルのいずれかが変更されるたびに、サービスワーカーがそのキャッシュを更新するようにします。これを機能させるには、サービスワーカーファイルの先頭にある`CACHE_NAME`変数を増やす必要があります。

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

#### DevTools迂回路

[Service Workers]ペインを開いてページを更新すると、新しいService Workerがインストールされ、ステータス番号が増えます。

![1db827d76bc0b359.png](img/1db827d76bc0b359.png)

私たちのために更新されたサービスの労働者は、すぐに制御を取る`install`イベントが終了して`self.skipWaiting()` 、および`activate`イベントが終わると`self.clients.claim()` 。それらがなければ、ページに開いているタブがある限り、古いサービス担当者はページを制御し続けます。

### 失敗したネットワーク要求を処理する

そして最後に、 `fetch`イベントを処理する必要があります。 [network, falling back to cache strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#network-falling-back-to-cache)を使います。サービスワーカーは最初にネットワークからリソースを取得しようとします。それが失敗すると、キャッシュからオフラインページを返します。

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

`fetch`ハンドラはページナビゲーションを処理する必要があるだけなので、他の要求はハンドラからダンプされ、通常はブラウザによって処理されます。しかし、要求の場合`.mode`ある`navigate` 、使用`fetch`ネットワークからアイテムを取得しようとします。それが失敗した場合、 `catch`ハンドラがでキャッシュを開き`caches.open(CACHE_NAME)`して使用しています`cache.match('offline.html')`プリキャッシュオフラインページを取得します。結果は`evt.respondWith()`を使ってブラウザに`evt.respondWith()`ます。

Key Point: `fetch`呼び出しを[`evt.respondWith()`](https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent/respondWith)すると、ブラウザのデフォルトのフェッチ処理が妨げられ、応答を自分で処理したいブラウザに通知されます。 `fetch`ハンドラー内で`evt.respondWith()`ないと、デフォルトのネットワーク動作が得られます。

#### DevTools迂回路

期待通りにすべてが機能することを確認しましょう。 [Service Workers]ペインを開いてページを更新すると、新しいService Workerがインストールされ、ステータス番号が増えます。

キャッシュされた内容を確認することもできます。 DevToolsの__Application__パネルの__Cache Storage__ペインに移動します。 __Cache Storage__を右クリックし、__Refresh Caches__を選択してセクションを展開すると、左側に静的キャッシュの名前が表示されます。キャッシュ名をクリックすると、キャッシュされているすべてのファイルが表示されます。

![c80a2a2e93c1c3ee.png](img/c80a2a2e93c1c3ee.png)

それでは、オフラインモードを試してみましょう。 DevToolsの__Service Workers__ペインに戻り、__ Offline__チェックボックスをオンにします。確認すると、__Network__パネルタブの横に小さな黄色い警告アイコンが表示されます。これはあなたがオフラインであることを示しています。

![984b34dc2aa667a.png](img/984b34dc2aa667a.png)

あなたのページをリロードすれば…それはうまくいく！ Chromeのオフラインディーノではなく、__our__オフラインパンダが表示されます。

サービス作業員をテストするための###ヒント

サービスワーカーをデバッグすることは困難な場合があり、それがキャッシュを含むとき、あなたがそれを期待するときにキャッシュが更新されないならば、物事はさらに悪夢になることができます。典型的なサービスワーカーのライフサイクルとあなたのコードのバグの間に、あなたはすぐにイライラするようになるかもしれません。 __しないでください。

#### 使用する

[アプリケーション]パネルの[Service Workers]ペインには、作業を楽にするいくつかのチェックボックスがあります。

![c7ac93904f473a91.png](img/c7ac93904f473a91.png)

* __Offline__ - チェックすると、オフラインの体験をシミュレートし、リクエストがネットワークに送信されるのを防ぎます。
* __Update on reload__ - チェックすると最新のサービスワーカーを取得してインストールし、すぐに有効にします。
* __Bypass for network__ - チェックすると、リクエストがサービスワーカーを迂回してネットワークに直接送信されます。

#### フレッシュスタート

場合によっては、キャッシュされたデータを自分でロードしているか、期待したとおりに更新されていないことがあります。保存されているすべてのデータ（localStorage、indexedDBデータ、キャッシュファイル）を消去してサービスワーカーを削除するには、[アプリケーション]タブの[ストレージの消去]ペインを使用します。または、シークレットウィンドウで作業することもできます。

![398bbcd285e2c5dd.png](img/398bbcd285e2c5dd.png)

追加のヒント

* サービスワーカーがいったん登録解除されると、それを含んでいるブラウザウィンドウが閉じられるまでそれはリストされたままになるかもしれません。
* あなたのアプリに複数のウィンドウが開いている場合、新しいサービスワーカーはすべてのウィンドウがリロードされて最新のサービスワーカーに更新されるまで有効になりません。
* サービスワーカーの登録を解除してもキャッシュはクリアされません。
* サービス担当者が存在し、新しいサービス担当者が登録されている場合、 [take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 、新しいサービス担当者はページがリロードされるまで制御を[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim)ませ[take immediate control](/web/fundamentals/primers/service-workers/lifecycle#clientsclaim) 。

### Lighthouseで変更を確認してください

Lighthouseをもう一度実行して、変更内容を確認してください。変更を確認する前に、必ず[オフライン]チェックボックスをオフにしてください。

__SEO監査__

* __✅過ぎた:__ 文書にメタ説明があります。

__プログレッシブWebアプリ監査__

* __✅過ぎた:__ 現在のページはオフライン時に200で応答します。
* __✅過ぎた:__ `start_url`はオフライン時に200で応答します。
* __✅過ぎた:__ ページと`start_url.`を制御するサービスワーカーを登録します
* __✅過ぎた:__ Webアプリマニフェストはインストール可能性の要件を満たしています。
* __✅過ぎた:__ カスタムスプラッシュスクリーン用に設定されています。
* __✅過ぎた:__ アドレスバーのテーマカラーを設定します。

## 完全なオフライン体験を提供する

少し時間をおいて、携帯電話を機内モードにして、お気に入りのアプリをいくつか実行してみてください。ほとんどの場合、これらはかなり堅牢なオフラインエクスペリエンスを提供します。ユーザーは自分のアプリからその強力な経験を期待しています。そしてウェブも変わらないはずです。プログレッシブWebアプリは、コアシナリオとしてオフラインを使用して設計する必要があります。

Key Point: オフライン優先の設計では、アプリからのネットワーク要求数を減らすことでWebアプリのパフォーマンスを大幅に向上させることができます。代わりに、リソースをローカルキャッシュから直接キャッシュして処理できます。最速のネットワーク接続でも、ローカルキャッシュからのサービスは速くなります。

### サービス作業員のライフサイクル

サービスワーカーのライフサイクルは最も複雑な部分です。あなたがそれが何をしようとしているのか、そして何が利益であるのかわからない場合は、それはあなたと戦っているように感じることができます。しかし、それがどのように機能するのかを理解すれば、Webとネイティブのパターンを組み合わせて、シームレスで目立たないアップデートをユーザーに配信できます。

Key Point: このコードラボでは、サービスワーカーのライフサイクルの基本についてのみ説明しています。さらに深く掘り下げるには、 [The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)に関する[The Service Worker Lifecycle](/web/fundamentals/primers/service-workers/lifecycle)記事を参照してください。

#### `install`イベント

サービス作業員が最初に`install`イベントは`install`です。ワーカーが実行されるとすぐにトリガーされ、サービスワーカーごとに1回だけ呼び出されます。 __サービスワーカースクリプトを変更した場合、ブラウザーはそれを別のサービスワーカースクリプトと見なし、独自の`install`イベントを取得します。

![72ed77b1720512da.png](img/72ed77b1720512da.png)

通常、 `install`イベントは、アプリの実行に必要なすべてのものをキャッシュするために使用されます。

#### `activate`イベント

サービス作業員は、起動するたびに`activate`イベントを受け取ります。 `activate`イベントの主な目的は、サービスワーカーの動作を設定し、前回の実行から残ったリソース（古いキャッシュなど）をクリーンアップし、サービスワーカーがネットワーク要求を処理できるようにすることです（たとえば、後述の`fetch`イベント）。

#### `fetch`イベント

フェッチイベントにより、サービスワーカーはネットワーク要求を傍受して要求を処理できます。ネットワークにアクセスしてリソースを取得したり、独自のキャッシュからリソースを取得したり、カスタムレスポンスやさまざまなオプションを生成したりできます。あなたが使用できるさまざまな戦略については[Offline Cookbook](/web/fundamentals/instant-and-offline/offline-cookbook/)をチェックしてください。

#### サービスワーカーの更新

ブラウザは、ページがロードされるたびに、サービスワーカーの新しいバージョンがあるかどうかを確認します。新しいバージョンが見つかると、新しいバージョンがバックグラウンドでダウンロードされインストールされますが、アクティブ化されません。古いサービスワーカーを使用するページが開いていなくなるまで、待機状態になります。古いサービスワーカーを使用しているすべてのウィンドウが閉じられると、新しいサービスワーカーがアクティブになり、制御を引き継ぎます。詳細については、Service Worker Lifecycleの[Updating the service worker](/web/fundamentals/primers/service-workers/lifecycle#updates)セクションを参照してください。

### 正しいキャッシング戦略を選ぶ

適切な[caching strategy](/web/fundamentals/instant-and-offline/offline-cookbook/)選択は、キャッシュしようとしているリソースの種類と、後で必要になる可能性がある方法によって異なります。天気アプリでは、キャッシュする必要があるリソースを2つのカテゴリに分けます。つまり、プリキャッシュするリソースと、実行時にキャッシュするデータです。

#### 静的リソースのキャッシュ

リソースを事前に把握することは、ユーザーがデスクトップまたはモバイルアプリをインストールしたときに起こることと似た概念です。アプリの実行に必要な主要なリソースは、ネットワーク接続があるかどうかにかかわらず後でロードできるように、インストールされるか、デバイスにキャッシュされます。

私たちのアプリでは、サービスワーカーがインストールされたときにすべての静的リソースを事前キャッシュして、アプリの実行に必要なすべてのものがユーザーのデバイスに保存されるようにします。我々のアプリが速く速くロードすることを確実にするために、我々は[cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)戦略を使います。ネットワークにアクセスしてリソースを取得する代わりに、それらはローカルキャッシュから取得されます。それが利用できない場合にのみ、ネットワークから取得しようとします。

![44860840e2090bd8.png](img/44860840e2090bd8.png)

ローカルキャッシュから取得することで、ネットワークの変動がなくなります。ユーザーがどのような種類のネットワーク（WiFi、5G、3G、さらには2Gまで）に接続していても、実行する必要がある主要なリソースはほとんどすぐに利用できます。

Caution: このサンプルでは、静的リソースは[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)戦略を使用して[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)されているため、ネットワークに[`cache-first`](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)ことなくキャッシュされたコンテンツのコピーが返されます。 `cache-first`戦略は実装が簡単ですが、将来的に課題を引き起こす可能性があります。

#### アプリデータのキャッシュ

[stale-while-revalidate strategy](/web/fundamentals/instant-and-offline/offline-cookbook/#stale-while-revalidate)は理想的な特定の種類のデータであり、我々のアプリにはうまく機能します。できるだけ早く画面上にデータを取得し、ネットワークが最新のデータを返した後にそれを更新します。再検証の期限切れとは、1つはキャッシュへ、もう1つはネットワークへの2つの非同期要求を開始する必要があることを意味します。

![6ebb2681eb1f58cb.png](img/6ebb2681eb1f58cb.png)

通常の状況下では、キャッシュされたデータはアプリが使用できる最新のデータをアプリに提供するとすぐに返されます。その後、ネットワーク要求が返されると、アプリはネットワークからの最新データを使用して更新されます。

私たちのアプリでは、これはネットワークよりも優れた体験を提供し、ユーザーがネットワーク要求がタイムアウトして画面に表示されるまでタイムアウトするまで待つ必要がないため、キャッシュ戦略に戻ります。最初は古いデータが表示されることがありますが、ネットワーク要求が返されると、アプリは最新のデータで更新されます。

### アプリロジックを更新する

前述したように、アプリケーションは2つの非同期要求（キャッシュへの要求とネットワークへの要求）を開始する必要があります。アプリが使用しています`caches`で利用可能なオブジェクト`window`キャッシュにアクセスし、最新のデータを取得します。 `caches`オブジェクトはすべてのブラウザで使用できるわけではないため、これはプログレッシブ拡張の優れた例です。それでもネットワーク要求が機能しない場合もあります。

更新`getForecastFromCache()`かどうかを確認するために、機能を`caches`オブジェクトはグローバルで利用可能です`window`オブジェクト、およびそれがある場合は、キャッシュからデータを要求します。

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

その後、我々は変更する必要があり[`updateData()`](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L196) 1つ、それは2つの呼び出しを行うように`getForecastFromNetwork()`ネットワークからの予測を得るために、そして1つ`getForecastFromCache()` 、最新のキャッシュされた予測を得るために:

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L200)

```js
// CODELAB: Add code to call getForecastFromCache.
getForecastFromCache(location.geo)
    .then((forecast) => {
      renderForecast(card, forecast);
    });
```

私たちの天気アプリは現在、データを2つの非同期要求、1つはキャッシュから、もう1つは`fetch`を介して`fetch`ます。キャッシュにデータがある場合、それは非常に速く（数十ミリ秒）返されレンダリングされます。その後、 `fetch`応答すると、天気予報APIから直接取得された最新のデータでカードが更新されます。

キャッシュ要求と`fetch`要求がどちらも予測カードを更新するための呼び出しで終了することに注意してください。アプリは最新のデータを表示しているかどうかをどのように判断しますか。これは、 `renderForecast()`からの次のコードで処理されます。

#### [public/scripts/app.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/app.js#L85)

```js
// If the data on the element is newer, skip the update.
if (lastUpdated >= data.currently.time) {
  return;
}
```

カードが更新されるたびに、アプリはカードの隠し属性にデータのタイムスタンプを保存します。カードにすでに存在するタイムスタンプが関数に渡されたデータよりも新しい場合、アプリは単に保釈します。

### アプリリソースをプリキャッシュする

サービスワーカーで、 `DATA_CACHE_NAME`追加して、アプリケーションデータをアプリケーションシェルから分離できるようにしましょう。アプリシェルが更新され、古いキャッシュが削除されても、データはそのまま維持され、超高速ロードに備えます。データフォーマットが将来変更された場合、それを処理し、アプリのシェルとコンテンツを確実に同期させる方法が必要になります。

#### [public/service-worker.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/service-worker.js#L21)

```js
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v2';
const DATA_CACHE_NAME = 'data-cache-v1';
```

`CACHE_NAME`も更新することを忘れないでください。静的リソースもすべて変更します。

アプリがオフラインで動作するためには、必要なすべてのリソースを事前キャッシュする必要があります。これも私たちのパフォーマンスに役立ちます。ネットワークからすべてのリソースを取得する代わりに、アプリはローカルキャッシュからそれらすべてを読み込むことができるため、ネットワークが不安定になることはありません。

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

キャッシュするファイルのリストを手動で生成しているので、ファイルを更新する`CACHE_NAME` WORDS0を更新する`CACHE_NAME`ます。我々のキャッシュされたファイルのリストから`offline.html`を削除することができました。これは我々のアプリがオフラインで動作するために必要なすべてのリソースを持っていて、再びオフラインページを表示することはないからです。

Caution: このサンプルでは、私達は私達の自身のサービスワーカーを手巻きしました。静的リソースを更新するたびに、サービスワーカーをロールし直してキャッシュを更新する必要があります。そうしないと、古いコンテンツが提供されます。さらに、1つのファイルが変更されると、キャッシュ全体が無効になり、再ダウンロードする必要があります。つまり、単純な1文字のスペルミスを修正するとキャッシュが無効になり、すべてのものを再度ダウンロードする必要がありますが、必ずしも効率的ではありません。 [Workbox](/web/tools/workbox/)はこれをあなたのビルドプロセスに統合することによって優雅に処理し、変更されたファイルだけが更新され、ユーザーのための帯域幅を節約し、あなたのためのメンテナンスを容易にします！

#### activateイベントハンドラを更新する

`activate`イベントが誤ってデータを削除しないようにするには、 `activate`イベントで、 `activate`を`service-worker.js`に置き換え`if (key !== CACHE_NAME) {` 。

#### public / service-worker.js

```js
if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
```

#### フェッチイベントハンドラを更新する

天気予報APIへのリクエストを傍受してそれらのレスポンスをキャッシュに保存するようにサービスワーカーを修正する必要があります。そうすれば後で簡単にアクセスできるようになります。再検証の時代遅れの戦略では、ネットワークの応答が「真実の源」であり、常に最新の情報を提供してくれることを期待しています。それができない場合は、アプリで最新のキャッシュデータをすでに取得しているため、失敗しても問題ありません。

`fetch`イベント・ハンドラーを更新して、他の要求とは別にデータAPIへの要求を処理するようにしてください。

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

コードは要求を傍受し、それが天気予報用かどうかを確認します。そうであれば、 `fetch`を使用して要求を出します。応答が返されたら、キャッシュを開き、応答を複製し、それをキャッシュに格納して、応答を元の要求者に返します。

ナビゲーションだけでなく、サービスワーカーにすべての要求（画像、スクリプト、CSSファイルなどを含む）を処理させたいので、 `evt.request.mode !== 'navigate'`チェックを削除する必要があります。そのチェックインを終了した場合、HTMLのみがサービスワーカーキャッシュから提供され、それ以外のものはすべてネットワークから要求されます。

### それを試してみる

アプリは完全にオフライン機能になります。最新のサービス担当者がインストールされていることを確認するためにページを更新してから、いくつかの都市を保存し、アプリの更新ボタンを押して新鮮な天気データを取得します。

その後、DevToolsの__Application__パネルの__Cache Storage__ペインに進みます。セクションを展開すると、左側に静的キャッシュとデータキャッシュの名前が表示されます。データキャッシュを開くと、各都市に保存されているデータが表示されます。

![731e91776cb6ef18.png](img/731e91776cb6ef18.png)

次に、DevToolsを開いて[Service Workers]ペインに切り替え、[Offline]チェックボックスをオンにしてからページをリロードしてから、オフラインにしてページをリロードします。

高速ネットワーク上にあり、低速接続で天気予報データがどのように更新されるかを知りたい場合は、 `FORECAST_DELAY`プロパティを`server.js`に`5000`ます。予測APIへのすべてのリクエストは5000ミリ秒遅れます。

### Lighthouseで変更を確認してください

Lighthouseをもう一度実行することもお勧めです。

__SEO監査__

* __✅過ぎた:__ 文書にメタ説明があります。

__プログレッシブWebアプリ監査__

* __✅過ぎた:__ 現在のページはオフライン時に200で応答します。
* __✅過ぎた:__ `start_url`はオフライン時に200で応答します。
* __✅過ぎた:__ ページと`start_url.`を制御するサービスワーカーを登録します
* __✅過ぎた:__ Webアプリマニフェストはインストール可能性の要件を満たしています。
* __✅過ぎた:__ カスタムスプラッシュスクリーン用に設定されています。
* __✅過ぎた:__ アドレスバーのテーマカラーを設定します。

## 経験をインストールします

プログレッシブWebアプリケーションがインストールされると、他のすべてのインストール済みアプリケーションと同じように見え、動作します。他のアプリの起動と同じ場所から起動します。アドレスバーや他のブラウザUIなしでアプリで実行されます。他のインストール済みアプリと同様に、タスクスイッチャーのトップレベルのアプリです。

![d824e1712e46a1cc.png](img/d824e1712e46a1cc.png)

Chromeでは、プログレッシブWebアプリは3ドットのコンテキストメニューからインストールすることも、アプリをインストールするように促すボタンやその他のUIコンポーネントをユーザーに提供することもできます。

Success: Chromeの3ドットコンテキストメニューのインストールエクスペリエンスは多少埋もれているため、アプリをインストールできることをユーザーに通知するための表示と、インストールプロセスを完了するためのインストールボタンを表示することをおすすめします。

### 灯台###監査

ユーザーがプログレッシブWebアプリケーションをインストールできるようにするには、 [certain criteria](/web/fundamentals/app-install-banners/#criteria)を満たす必要があります。確認する最も簡単な方法は、Lighthouseを使用してそれがインストール可能な基準を満たしていることを確認することです。

![b921f5583fcddf03.png](img/b921f5583fcddf03.png)

もしあなたがこのコードラボで作業しているのであれば、あなたのPWAはすでにこれらの基準を満たしているはずです。

Key Point:このセクションでは、DevToolsの** Application **パネルの** Service Workers **ペインで** Bypass for network **チェックボックスを有効にします。チェックすると、要求はサービスワーカーを迂回してネットワークに直接送信されます。このセクションで作業中にサービスワーカーを更新する必要がないので、これによって開発プロセスが簡単になります。

### index.htmlにinstall.jsを追加する

まず、 `install.js`を`index.html`ファイルに追加しましょう。

#### [public/index.html](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/index.html#L204)

```html
<!-- CODELAB: Add the install script here -->
<script src="/scripts/install.js"></script>
```

### `beforeinstallprompt`イベントを`beforeinstallprompt`

ホーム画面に追加[criteria](/web/fundamentals/app-install-banners/#criteria)が満たされると、Chromeは`beforeinstallprompt`イベントを発生させます。 `beforeinstallprompt`イベントを使用してアプリを「インストール」できることを示し、インストールを促すことができます。以下のコードを追加して`beforeinstallprompt`イベントをリッスンします。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L24)

```js
// CODELAB: Add event listener for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', saveBeforeInstallPromptEvent);
```

### イベントを保存してインストールボタンを表示

当社では`saveBeforeInstallPromptEvent`機能、我々はを参照節約できます`beforeinstallprompt`私たちが呼び出すことができるようにイベントを`prompt()`後でそれを、してインストールボタンを表示するために私たちのUIを更新します。

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

保存された`beforeinstallprompt`イベントの`userChoice`プロパティによって返される約束を聞いて、ユーザーがインストールダイアログにどのように応答したかを確認できます。プロンプトが表示され、ユーザーがそれに応答すると、promiseは`outcome`プロパティを持つオブジェクトを返します。

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

約コメント`userChoice` 、 [spec defines it as a property](https://w3c.github.io/manifest/#beforeinstallpromptevent-interface) 、ない機能あなたは想像のとおり。

#### すべてのインストールイベントをログに記録します

アプリをインストールするために追加したUIに加えて、ユーザーは他の方法、たとえばChromeの3ドットメニューを使ってPWAをインストールすることもできます。これらのイベントを追跡するには、appinstalledイベントを監視してください。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L51)

```js
// CODELAB: Add event listener for appinstalled event
window.addEventListener('appinstalled', logAppInstalled);
```

その後、我々は更新する必要があります`logAppInstalled`このコードラボのために、私たちは使用します、機能を`console.log` 、しかし生産アプリでは、おそらくあなたの分析ソフトウェアとのイベントとして、これをログに記録します。

#### [public/scripts/install.js](https://github.com/googlecodelabs/your-first-pwapp/blob/master/public/scripts/install.js#L60)

```js
// CODELAB: Add code to log the event
console.log('Weather App was installed.', evt);
```

### サービスワーカーを更新します

すでにキャッシュされているファイルを変更したので、 `service-worker.js`ファイルの`CACHE_NAME`を更新することを忘れないでください。 DevToolsの[アプリケーション]パネルの[Service Workers]ペインで[ネットワークへのバイパス]チェックボックスを有効にしても開発はできますが、実際には役に立ちません。

### それを試してみる

インストール手順がどのように行われたかを見てみましょう。安全のために、DevToolsの[アプリケーション]パネルにある[_サイトのクリアデータ]ボタンを使用してすべてを消去し、新しい作業を始めましょう。以前にアプリをインストールした場合は、必ずアンインストールしてください。そうしないと、インストールアイコンが再び表示されません。

#### インストールボタンが見えることを確認

まず、インストールアイコンが正しく表示されることを確認しましょう。デスクトップとモバイルの両方で試してください。

1. 新しいChromeタブでURLを開きます。
2. Chromeの3ドットメニュー（アドレスバーの横）を開きます。 menuメニューに「* Install Weather ... *」と表示されていることを確認します。
3. 右上隅にある更新ボタンを使用して気象データを更新し、 [user engagement heuristics](/web/fundamentals/app-install-banners/#criteria)を確実に満たします。 installインストールアイコンがアプリのヘッダーに表示されていることを確認します。

#### インストールボタンが機能することを確認する

次に、すべてが正しくインストールされ、イベントが正しく起動されるようにしましょう。これはデスクトップまたはモバイルのどちらでも実行できます。モバイルでこれをテストしたい場合は、コンソールに何が記録されているかを確認できるように、リモートデバッグを使用していることを確認してください。

1. Open Chrome, and in a new browser tab, navigate to your Weather PWA.
2. Open DevTools and switch to the Console pane.
3. Click the install button in the upper right corner.
▢ Verify the install button disappears
▢ Verify the install modal dialog is shown.
4. Click Cancel.
▢ Verify "*User dismissed the A2HS prompt*" is shown in the console output.
▢ Verify the install button reappears.
5. Click the install button again, then click the install button in the modal dialog.
▢ Verify "*User accepted the A2HS prompt*" is shown in the console output.
▢ Verify "*Weather App was installed*" is shown in the console output.
▢ Verify the Weather app is added to the place where you'd typically find apps.
6. Launch the Weather PWA.
▢ Verify the app opens as a standalone app, either in an app window on desktop, or full screen on mobile.

localhostからデスクトップで実行している場合、localhostはセキュアホストとは見なされないため、インストールしたPWAにアドレスバナーが表示されることがあります。

#### iOSのインストールが正しく機能していることを確認する

iOSの動作も確認しましょう。あなたがiOSデバイスを持っているならば、あなたはそれを使うことができます、またはあなたがMacを使っているならば、Xcodeで利用可能なiOSシミュレータを試してください。

1. Safariを開き、新しいブラウザタブでWeather PWAに移動します。
2. [共有]をクリックします。 [8ac92dd483c689d3.png](img/8ac92dd483c689d3.png)ボタン
3. 右にスクロールして[ホーム画面に追加]ボタンをクリックします。タイトル、URL、およびアイコンが正しいことを確認します。
4. [追加]をクリックします。homeアプリのアイコンがホーム画面に追加されたことを確認します。
5. ホーム画面からWeather PWAを起動します。 appアプリがフルスクリーンで起動することを確認します。

### ボーナス:あなたのアプリがホーム画面から起動されたかどうかを検出する

`display-mode`メディアクエリを使用すると、アプリの起動方法に応じてスタイルを適用したり、JavaScriptで起動した方法を判断したりできます。

```css
@media all and (display-mode: standalone) {
  body {
    background-color: yellow;
  }
}
```

また、チェックすることができ`display-mode`でメディアクエリ[JavaScript to see if you're running in standalone](/web/fundamentals/app-install-banners/#detect-mode) 。

### ボーナス:PWAのアンインストール

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

* 新しいブラウザタブで、chrome:// appsを開きます。
* Weather PWAを右クリック（alt-クリック）してください。
* クリック*Chromeから削除...*

## おめでとうございます

おめでとうございます、あなたは最初のProgressive Web Appを無事に構築しました！

Webアプリケーションマニフェストをインストールしてインストールできるようにし、サービスワーカーを追加して、PWAが常に高速で信頼できるものであることを確認しました。 DevToolsを使用してアプリを監査する方法と、ユーザーエクスペリエンスの向上にどのように役立つかを学びました。

これで、WebアプリケーションをプログレッシブWebアプリケーションに変えるために必要な主な手順がわかりました。

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

問題##問題が見つかったか、フィードバックがありますか？ {: .hide-from-toc }

今日[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)送信して、コードラボをより良くする[issue](https://github.com/googlecodelabs/your-first-pwapp/issues)ます。ありがとう！

{% include "web/_shared/translation-end.html" %}
