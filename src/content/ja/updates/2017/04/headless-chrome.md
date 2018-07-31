project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: ヘッドレス Chrome とはなにか、そしてその使い方を紹介します。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on: 2017-04-27 #}

{# wf_tags: chrome59,headless,testing #}
{# wf_featured_image: /web/updates/images/generic/headless-chrome.png #}
{# wf_featured_snippet: Chrome 59 から搭載されたヘッドレス Chrome は Chrome をヘッドレス環境で実行するものです。ヘッドレス Chrome によって、Chromium とそのエンジン Blink が提供するモダンなウェブプラットフォームの機能すべてがコマンドラインにもたらされます。 #}

# ヘッドレス Chrome ことはじめ {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure {
  text-align: center;
}
</style>

### TL;DR {: #tldr .hide-from-toc}

[Headless Chrome](https://chromium.googlesource.com/chromium/src/+/master/headless/README.md) が Chrome 59 に搭載されます！これは Chrome をヘッドレス環境で実行する手段です。Chrome をクローム（ブラウザーのUIのこと）なしに実行します！ヘッドレス Chrome によって、Chromium とそのエンジン Blink が提供する**モダンなウェブプラットフォームの機能すべて**がコマンドラインにもたらされるのです。

でも、いったいその何が便利なんでしょうか？

ヘッドレスブラウザは、GUI を持つ必要のない自動テスト環境やサーバー環境にとてもよいツールです。例としては、実際のウェブページに対してなにかテストを実行する、そのページの PDF を生成する、またはただ、そのページがどう表示されるかを検証するなどが挙げられるでしょうか。

Note: ヘッドレスモードは Chrome 59 から、Mac と Linux で提供されます。[Windows のサポート](https://bugs.chromium.org/p/chromium/issues/detail?id=686608)はもうちょっとです！現在使っている Chrome のバージョンを調べるには、`chrome://version` を開きます。

## ヘッドレス Chrome を立ち上げる (CLI) {: #cli }

もっとも楽なヘッドレスモードの起動方法は、Chrome のバイナリをコマンドラインから開くことです。Chrome 59 以降を用意し、`--headless` フラグをつけて Chrome を実行します。

    chrome \
      --headless \                   # Chrome をヘッドレスモードで実行する
      --disable-gpu \                # 暫定的に必要なフラグ
      --remote-debugging-port=9222 \
      https://www.chromestatus.com   # 開きたい URL（デフォルトは about:blank）

Note: 現在は、`--disable-gpu` を含めなければいけません。このフラグはそのうち不要になります。

ここで `chrome` はインストールされた Chrome のパスを指します。正確なインストール先はプラットフォームによって異なります。わたしは Mac を使っているのですが、以下のようなエイリアスを作っています。

もし Chrome の Stable（安定版）を使っており、Beta をインストールできない場合は、`chrome-canary` をおすすめします。

    alias chrome="/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome"
    alias chrome-canary="/Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary"
    alias chromium="/Applications/Chromium.app/Contents/MacOS/Chromium"

[Chrome Canary のダウンロードはこちら](https://www.google.com/chrome/browser/canary.html)

## コマンドラインの機能 {: features }

やりたいことによっては、[プログラムを書く](#node)必要さえありません。よくあるタスクには、[便利なコマンドラインフラグ](https://cs.chromium.org/chromium/src/headless/app/headless_shell_switches.cc)が用意されています。

### DOM を出力する {: dom }

`--dump-dom` フラグを使うと、`document.body.innerHTML` 標準出力に表示します。

    chrome --headless --disable-gpu --dump-dom https://www.chromestatus.com/

### PDF を作成する {: pdf }

`--print-to-pdf` フラグを使うと、ページの PDF を作成します。

    chrome --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/

### スクリーンショットを撮る {: #screenshots }

スクリーンショットを撮るには、`--screenshot` フラグを使用します。

    chrome --headless --disable-gpu --screenshot https://www.chromestatus.com/

    # レターヘッドの大きさ
    chrome --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/

    # Nexus 5X
    chrome --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/

`--screenshot` フラグつきでヘッドレス Chrome を実行すると、現在のディレクトリに `screenshot.png` というファイルが生成されます。ページ全体のスクリーンショットを撮りたい場合、やることは少し複雑になります。こちらは David Schnurr がすでに “[Using headless Chrome as an automated screenshot tool](https://medium.com/@dschnr/using-headless-chrome-as-an-automated-screenshot-tool-4b07dffba79a)” というブログ記事で取り上げているので、そちらをご覧ください。

## ブラウザ UI なしに Chrome をデバッグ？ {: #frontend }

Chrome を `--remote-debugging-port=9222` フラグつきで実行すると、[DevTools Protocol][dtviewer] が有効になった状態でインスタンスが起動します。このプロトコルは Chrome と通信し、ヘッドレスブラウザのインスタンスを制御するのに使われています。また、Sublime や VS Code、Node がアプリケーションをリモートデバッグする際にも使われます。 #シナジー

ヘッドレスモードではページを見るためのブラウザ UI が存在しないため、他のブラウザから `http://localhost:9222` に移動し、問題がないかを確認します。ページに移動すると、ヘッドレス Chrome がレンダリングしている、検証可能なページのリストを見られます。

<figure>
  <img src="/web/updates/images/2017/04/headless-chrome/remote-debugging-ui.png"
       class="screenshot">
  <figcaption>DevTools のリモートデバッグ UI</figcaption>
</figure>

リモートデバッグ UI では、検証やデバッグ、コンテンツの編集など、いつも使っている DevTools の機能を普段通りに使えます。ヘッドレス Chrome をプログラムから利用する場合も、ブラウザと通信している生の DevTools プロトコルのコマンドを確認できるためとても便利です。

## プログラムから利用する（Node） {: #node }

### Chrome の起動 {: #nodelaunch }

前のセクションでは、`--headless --remote-debugging-port=9222` フラグをつけ [Chrome を手動で起動](#cli)していました。しかしテストを完全に自動化するには、アプリケーション「から」Chrome を実行したくなるのではないでしょうか。

それを実現するひとつの方法が `child_process` です。

```javascript
const execFile = require('child_process').execFile;

function launchHeadlessChrome(url, callback) {
  // macOS を想定
  const CHROME = '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
  execFile(CHROME, ['--headless', '--disable-gpu', '--remote-debugging-port=9222', url], callback);
}

launchHeadlessChrome('https://www.chromestatus.com', (err, stdout, stderr) => {
  ...
});
```

しかしこの方法では、複数のプラットフォームをサポートしようとするときにめんどくさくなります。ハードコードされた Chrome のパスを見てください :(

#### Lighthouse の ChromeLauncher を使う {: #nodechromelauncher }

[Lighthouse](/web/tools/lighthouse/) ウェブアプリのクオリティをテストする素晴らしいツールです。ご存じないかもしれませんが、Lighthouse には Chrome を操作するとても便利なヘルパーモジュールが搭載されています。そのモジュールのひとつが `ChromeLauncher` です。`ChromeLauncher` は Chrome がどこにインストールされているかを探したり、デバッグ用のインスタンスをセットアップしたり、Chrome を起動したり、プログラムが終了したときに Chrome も終了したりと、いろんなことをしてくれます。なによりも嬉しいのが、Node のお陰でクロスプラットフォームなことです！

Note: Lighthouse チームはよりよい API を搭載した `ChromeLauncher` のスタンドアロン版を検討しています。気になることがあれば、ぜひ[フィードバックを](https://github.com/GoogleChrome/lighthouse/issues/2092)お願いします。

デフォルトでは、**`ChromeLauncher` は Chrome Canary を起動しようとします**（インストールされていれば）。もちろんどの Chrome を利用するかは決められます。`ChromeLauncher` を使うには、まず Lighthouse をインストールします。

    yarn add lighthouse

**例** - `ChromeLauncher` を使ってヘッドレス Chrome を起動する

```javascript
const {ChromeLauncher} = require('lighthouse/lighthouse-cli/chrome-launcher');

/**
 * デバッグ用の Chrome インスタンスをポート 9222 で起動する。
 * @param {boolean=} headless Chrome をヘッドレスモードで起動。
 *     デフォルトは true。値を false にセットすると通常モードで起動。
 * @return {Promise<ChromeLauncher>}
 */
function launchChrome(headless = true) {
  const launcher = new ChromeLauncher({
    port: 9222,
    autoSelectChrome: true, // false にした場合は手動で Chrome を選択する
    additionalFlags: [
      '--window-size=412,732',
      '--disable-gpu',
      headless ? '--headless' : ''
    ]
  });

  return launcher.run().then(() => launcher)
    .catch(err => {
      return launcher.kill().then(() => { // エラーな場合 Chrome を終了
        throw err;
      }, console.error);
    });
}

launchChrome(true).then(launcher => {
  ...
});
```

このスクリプトは小さいものですが、`about:blank` を読み込んだ Chrome のインスタンスがタスクマネージャに現れるのを確認できると思います。なお、ブラウザ UI は立ち上がりません。ヘッドレスですから。

立ち上がった Chrome を操作するには、DevTools プロトコルが必要です！

### ページの情報を取得する {: #useprotocol }

[chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) は [DevTools Protocol][dtviewer] 上に構築された、ハイレベルな API を提供するとてもいい Node のパッケージです。これを使うとヘッドレス Chrome を操作し、ページを移動し、そしてページに関する情報を取得できます。

要Note: DevTools プロトコルでほんとに色んなことができるので、最初はすこしウッとなるかと思います。まずは [DevTools Protocol Viewer][dtviewer] を眺めましょう。そのあと `chrome-remote-interface` の API ドキュメンテーションを読み、生プロトコルをどうラップしているのか確認するとといでしょう。

では、ライブラリをインストールしましょう。

    yarn add chrome-remote-interface

#### 例

**例** - UA 文字列を出力する

```javascript
launchChrome().then(launcher => {
  chrome.Version().then(version => console.log(version['User-Agent']));
});
```

`HeadlessChrome/60.0.3082.0` といった文字列が出てくるでしょう。

**例** - サイトに [web app manifest](/web/fundamentals/web-app-manifest) があるかを確認する

```javascript
const chrome = require('chrome-remote-interface');

function onPageLoad(Page) {
  return Page.getAppManifest().then(response => {
    if (!response.url) {
      console.log('Site has no app manifest');
      return;
    }
    console.log('Manifest: ' + response.url);
    console.log(response.data);
  });
}

launchChrome().then(launcher => {

  chrome(protocol => {
    // DevTools プロトコルから、必要なタスク部分を抽出する。
    // API ドキュメンテーション: https://chromedevtools.github.io/devtools-protocol/
    const {Page} = protocol;

    // まず、使用する Page ドメインを有効にする。
     Page.enable().then(() => {
      Page.navigate({url: 'https://www.chromestatus.com/'});

      // window.onload を待つ。
      Page.loadEventFired(() => {
        onPageLoad(Page)).then(() => {
          protocol.close();
          launcher.kill(); // Chrome を終了させる。
        });
      });
    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });

});
```

**例** - DOM API を使ってページの `<title>` を抽出する

```javascript
const chrome = require('chrome-remote-interface');

function onPageLoad(Runtime) {
  const js = "document.querySelector('title').textContent";

  // ページ内で JS の式を評価する。
  return Runtime.evaluate({expression: js}).then(result => {
    console.log('Title of page: ' + result.result.value);
  });
}

launchChrome().then(launcher => {

  chrome(protocol => {
    // DevTools プロトコルから、必要なタスク部分を抽出する。
    // API ドキュメンテーション: https://chromedevtools.github.io/devtools-protocol/
    const {Page, Runtime} = protocol;

    // まず、使用するドメインを有効にする。
    Promise.all([
      Page.enable(),
      Runtime.enable()
    ]).then(() => {
      Page.navigate({url: 'https://www.chromestatus.com/'});

      // window.onload を待つ。
      Page.loadEventFired(() => {
        onPageLoad(Runtime).then(() => {
          protocol.close();
          launcher.kill(); // Chrome を終了させる。
        });
      });

    });

  }).on('error', err => {
    throw Error('Cannot connect to Chrome:' + err);
  });

});
```

## あわせて読みたい

ヘッドレス Chrome を始めるにあたり便利なリソースを紹介します。

ドキュメンテーション

* [DevTools Protocol Viewer][dtviewer] - API リファレンス

ツール

* [chrome-remote-interface](https://www.npmjs.com/package/chrome-remote-interface) - DevTools プロトコルのラッパーを提供する Node モジュール
* [Lighthouse](https://github.com/GoogleChrome/lighthouse) - ウェブアプリのクオリティをテストする自動化ツール

デモ

* "[The Headless Web](https://paul.kinlan.me/the-headless-web/)" - ヘッドレス Chrome と api.ai を組み合わせる、Paul Kinlan のとてもよいブログ記事

## FAQ

**`--diable-gpu` フラグは必要ですか？**

今のところですが、必要です。`--disable-gpu` フラグはいくつかのバグを回避するための暫定的な手段です。将来の Chrome のバージョンでは必要なくなるでしょう。詳しくは [https://crbug.com/546953#c152](https://bugs.chromium.org/p/chromium/issues/detail?id=546953#c152) と [https://crbug.com/695212](https://bugs.chromium.org/p/chromium/issues/detail?id=695212) をご覧ください。

**Xvfb はまだ必要なのでしょうか？**

いいえ。ヘッドレス Chrome はウインドウを仕様しないため、Xvfb などのディスプレイサーバはもう必要ありません。自動化テストを Xvfb なしに実行できます。うれしいですね。

Xvfb がわからない？Xvfb は Unix ライクなシステム向けに提供される、インメモリなディスプレイサーバです。これを使うと、グラフィカルなアプリケーション（Chrome など）を、ディスプレイを物理的に接続せず実行できます。「ヘッドレス」なテストを実行する際、以前は Xvfb を利用して古い Chrome を動かしていました。

**ヘッドレス Chrome を実行できる Docker コンテナはどうやって作れますか？**

[lighthouse-ci](https://github.com/ebidel/lighthouse-ci) をチェックしてください。Ubuntu をベースイメージに、App Engine Flexible コンテナ内で Lighthouse をインストールし実行する [Dockerfile の例](https://github.com/ebidel/lighthouse-ci/blob/master/builder/Dockerfile) があります。

**PhantomJS との関連は？**

ヘッドレス Chrome は [PhantomJS](http://phantomjs.org/) に似ています。どちらもヘッドレス環境での自動化テストに使われます。大きな違いは、PhantomJS が古い WebKit を使用するのに対し、ヘッドレス Chrome は最新版の Blink を使用するということです。

現時点で、PhantomJS のほうが [DevTools Protocol][dtviewer] よりもハイレベルな API を提供しています。

**ヘッドレス Chrome を Selenium / WebDriver / ChromeDriver と組み合わせられますか？**

現時点で、Selenium は Chrome のフルインスタンスを実行します。つまり、Selenium は自動化ソリューションではありますが、完全にヘッドレスではないということです。しかし、将来的には `--headless` の採用もありうるでしょう。

Selenium でヘッドレス Chrome を試したいという方は、[Running Selenium with Headless Chrome](https://intoli.com/blog/running-selenium-with-headless-chrome/) を読んでセットアップしてみましょう。

Note: [ChromeDriver](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver) でバグに出会ったかもしれません。執筆時点での最新版（2.29）は Chrome 58 のみをサポートしています。ヘッドレス Chrome は Chrome 59 以降が必要です。

**バグの報告先はどこですか？**

ヘッドレス Chrome についてのバグは [crbug.com](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink&blocking=705916&cc=skyostil%40chromium.org&Proj=Headless) にお願いします。

DevTools プロトコルに関するバグは [github.com/ChromeDevTools/devtools-protocol](https://github.com/ChromeDevTools/devtools-protocol/issues/new) にお願いします。

<br>

{% include "comment-widget.html" %}

[dtviewer]: https://chromedevtools.github.io/debugger-protocol-viewer/
