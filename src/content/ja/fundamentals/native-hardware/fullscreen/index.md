project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 全画面表示に移行します。

{# wf_updated_on: 2017-10-06 #}
{# wf_published_on:2016-10-01 #}

# 全画面表示にする {: .page-title }

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ZRqr5x73-ng" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

没入的な全画面表示のウェブサイトやアプリは簡単に作成できますが、ウェブ上のあらゆる要素と同じく、その実現方法は複数あります。現在、多くのブラウザで、全画面表示で起動する「インストール済みのウェブアプリ」の使用をサポートしているため、この点は非常に重要です。

<div class="clearfix"></div>

## アプリまたはサイトを全画面表示にする

ユーザーまたはデベロッパーは、次のような方法でウェブアプリを全画面表示にすることができます。

- ユーザー操作に応じて、ブラウザにリクエストして全画面表示にする。
- アプリをホーム画面にインストールする。
- 疑似的にアドレスバーを自動で非表示にする。

### ユーザー操作に応じて、ブラウザにリクエストして全画面表示にする

<a href="http://caniuse.com/#feat=fullscreen">Fullscreen API のサポート状況はプラットフォームによって異なります</a>。iOS Safari では非対応ですが、Android 向けの Chrome、Firefox、IE 11+ では対応しています。一般的にアプリを作成する際は、JS API と、全画面表示の仕様で提供されている CSS セレクターを組み合わせて使用することになります。
全画面表示のエクスペリエンスの構築するときは、次の JS API が特に重要になります。

- `element.requestFullscreen()` は全画面モードの要素を表示します（現在、Chrome、Firefox、および IE で接頭辞が必要）。
- `document.exitFullscreen()` は全画面モードをキャンセルします（現在、Chrome および IE で接頭辞が必要。Firefox では `cancelFullScreen()` を使用）。
- `document.fullscreenElement` はいずれかの要素が全画面モードになっていると true を返します（現在、Chrome、Firefox、および IE で接頭辞が必要）。

注: 接頭辞が付いたバージョンでは、画面上の「S」の文字種間に多くの不整合があることに気付くと思います。
これは不自然ですが、現在使用している仕様の問題です。

アプリが全画面表示になっている状態では、ブラウザの UI コントロールは使用できません。
そのため、ユーザーは別の方法でブラウザを操作します。
全画面表示には、「次に進む」や「前に戻る」などの標準のナビゲーション コントロールがありません。また、回避手段となる更新ボタンもありません。
このシナリオについて考慮する必要があります。
ブラウザが全画面表示になったときにサイトのスタイルと表示を変更するには、CSS セレクターが役に立ちます。

```
<button id="goFS">Go fullscreen</button>
<script>
  var goFS = document.getElementById("goFS");
  goFS.addEventListener("click", function() {
      document.body.requestFullscreen();
  }, false);
</script>
```

上記の例が少し不自然に見えるのは、ベンダー プレフィックスの使用に関する複雑な部分をすべて非表示にしているためです。

注: ベンダー接頭辞はやっかいなものです。

実際のコードははるかに複雑です。<ahref="https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Using_full_screen_mode">Mozilla では、全画面表示の切り替えに使用できる便利なスクリプトを作成しています。このように、指定の API に比べて、ベンダー プレフィックスを使用する状況では作業が複雑かつ面倒になります。次のようにコードを簡素化しても、まだ複雑です。

```
function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}
```

ウェブ デベロッパーは複雑なコードを嫌います。利用可能なハイレベルの抽象 API としては、<a href="http://sindresorhus.com/screenfull.js">Sindre Sorhus の <ahref="https://github.com/sindresorhus/screenfull.js">Screenfull.js モジュールがお勧めです。このモジュールは、2 つの少し異なる JS API とベンダー プレフィックスを一貫性のある 1 つの API に統合します。</a>

#### Fullscreen API のヒント

##### ドキュメントを全画面表示にする

<figure class="attempt-right" style="max-width: 320px;">
  <img src="images/body.png">
  <figcaption>図 1: body 要素の全画面表示。</figcaption>
</figure>

body 要素を全画面表示にすることは当然のように思われますが、WebKit または Blink ベースのレンダリング エンジンを使用している場合は、すべてのコンテンツを含むことが可能な最小サイズにまで body 要素の幅が縮小されるという現象が発生します（Mozilla Gecko では、この問題は発生しません）。

<div class="clearfix"></div>

<figure class="attempt-right" style="max-width: 320px;">
<img src="images/document.png">
<figcaption>図 2: document 要素の全画面表示。</figcaption>
</figure>

この問題を修正するには、body 要素の代わりに、document 要素を使用します。

```
document.documentElement.requestFullscreen();
```

<div class="clearfix"></div>

##### video 要素を全画面表示にする

video 要素を全画面表示にする方法は、その他の要素とまったく同じです。
video 要素で `requestFullscreen` メソッドを呼び出します。

```
<video id=videoElement></video>
<button id="goFS">Go Fullscreen</button>
<script>
  var goFS = document.getElementById("goFS");
  goFS.addEventListener("click", function() {
      var videoElement = document.getElementById("videoElement");
      videoElement.requestFullscreen();
  }, false);
</script>
```

`<video>` 要素で controls 属性を定義していない場合は、動画が全画面表示になると、動画を制御できなくなります。
動画を制御するには、ユーザーに表示する動画とコントロールをラップする基本的なコンテナを使用することをお勧めします。

```
<div id="container">
  <video></video>
  <div>
    <button>Play</button>
    <button>Stop</button>
    <button id="goFS">Go fullscreen</button>
  </div>
</div>
<script>
  var goFS = document.getElementById("goFS");
  goFS.addEventListener("click", function() {
      var container = document.getElementById("container");
      container.requestFullscreen();
  }, false);
</script>
```

この方法では、（たとえば、[goFS] ボタンを非表示にするために）container オブジェクトと CSS 疑似セレクターを組み合わせることができるため、柔軟性が向上します。

```
<style>
  #goFS:-webkit-full-screen #goFS {
    display: none;
  }
  #goFS:-moz-full-screen #goFS {
    display: none;
  }
  #goFS:-ms-fullscreen #goFS {
    display: none;
  }
  #goFS:fullscreen #goFS {
    display: none;
  }
</style>
```

これらのパターンを使用すると、全画面表示になっていることを検出して、以下のような適切なユーザー インターフェースを提供できます。

- スタート ページに戻るリンクを提供する
- ダイアログを閉じるまたは前に戻るための方法を提供する

### ホーム画面から全画面表示のページを起動する

ユーザーがウェブページに移動したときに、全画面表示のウェブページを起動することはできません。ブラウザ ベンダーは、各ページの読み込みごとに全画面表示になるとユーザーが不快に感じることを認識しています。そのため、全画面表示にするには、ユーザー操作が必要になります。ただし、ベンダーはユーザーがアプリを「インストール」することを許可しています。このインストールするという行為により、ユーザーがプラットフォーム上でアプリとして起動したいと考えていることがオペレーティング システムに示されます。

主要なモバイル プラットフォームでは、以下のように、メタタグまたはマニフェスト ファイルを使用して簡単に実装できます。

#### iOS

iPhone では、ユーザーはウェブアプリをホーム画面にインストールして、ウェブアプリを全画面表示のウェブアプリとして起動できます。

```
<meta name="apple-mobile-web-app-capable" content="yes">
```

> content が yes に設定されていると、ウェブアプリは全画面モードで実行されます。yes に設定されていない場合は、全画面モードで実行されません。
> デフォルトの動作では、Safari を使用してウェブ コンテンツを表示します。
> 読み取り専用ブール値の JavaScript プロパティ window.navigator.standalone を使用して、ウェブページを全画面モードで表示するかどうかを指定できます。<a href="https://developer.apple.com/library/safari/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">Apple</a>

#### Chrome for Android

Chrome チームは最近、ユーザーがホーム画面に追加した場合に、全画面表示のページを起動するようブラウザに指示する機能を実装しました。
この機能は、iOS Safari モデルの機能と類似しています。

```
<meta name="mobile-web-app-capable" content="yes">
```

> Chrome for Android の [Add to Home screen] メニュー アイテムを使用して、端末のホーム画面にアプリのショートカット アイコンを追加し、アプリが全画面「アプリモード」で起動するようにウェブアプリを設定することができます。<a href="https://developers.chrome.com/multidevice/android/installtohomescreen">Google Chrome</a>

より適切な方法は、ウェブアプリ マニフェストを使用することです。

#### ウェブアプリ マニフェスト（Chrome、Opera、Firefox、Samsung）

[ウェブアプリ マニフェスト](/web/fundamentals/web-app-manifest)はシンプルな JSON 形式のファイルです。デベロッパーはこのファイルを使用して、想定される表示場所（モバイルのホーム画面など）でのアプリの表示方法と、ユーザーが起動できる項目、さらに最も重要な起動方法を指定できます。マニフェストによって、さらに多くのアプリ制御を行うことは可能ですが、ここではアプリの起動方法のみに注目して説明します。特に次の点に注意が必要です。

1. マニフェストについてブラウザに通知する
2. 起動方法を記述する

マニフェストを作成して、サイトにホストしたら、次のようにアプリを含むすべてのページからのリンクタグを追加するだけです。

```
<link rel="manifest" href="/manifest.json">
```

Chrome では、Android 向けのバージョン 38（2014 年 10 月）以降でマニフェストをサポートしており、ホーム画面にインストールされている場合のウェブアプリの表示方法を制御したり（`short_name`、`name`、`icons` プロパティを介して）、ユーザーが起動アイコンをクリックしたときの起動方法を制御したり（`start_url`、`display`、および `orientation` を介して）できます。

マニフェストの例を以下に示します。この例は、マニフェストに含めることが可能なすべての要素を示しているわけではありません。

```
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ],
  "start_url": "/index.html",
  "display": "standalone",
  "orientation": "landscape"
}
```

この機能は現在開発中です。今後は、この機能をサポートするブラウザのユーザー向けに、より優れた統合エクスペリエンスを構築できるようになります。

ホーム画面へのサイトまたはアプリの追加は、それらをアプリのように扱いたいというユーザーの意図を表しています。
つまり、商品のランディング ページではなく、アプリの機能に直接ユーザーを誘導する必要があります。
たとえば、ユーザーにアプリへのログインを求めるページは、起動時に表示するページとして適しています。

##### ユーティリティ アプリ

大部分のユーティリティ アプリでは、簡単にマニフェストを活用することができます。これらのアプリは、モバイル プラットフォーム上のその他のアプリと同様に、スタンドアロンで起動したい場合が多くあります。アプリにスタンドアロンで起動するように指定するには、次の行をウェブアプリ マニフェストに追加します。

```
"display": "standalone"
```

##### ゲーム

大部分のゲームでは、簡単にマニフェストを活用することができます。大多数のゲームは全画面表示で起動し、特定の向きで使用する必要があります。

垂直のスクロールや Flappy Birds のようなゲームを開発している場合は、常にゲームを縦表示にする必要があります。

```
"display": "fullscreen",
"orientation": "portrait"
```

一方、パズルや X-Com のようなゲームを開発している場合は、ゲームを常に横向きで使用する必要があります。

```
"display": "fullscreen",
"orientation": "landscape"
```

##### ニュースサイト

ほとんどのニュースサイトはコンテンツベースで構成されます。大部分のデベロッパーは、マニフェストをニュースサイトに追加しようとは考えないでしょう。
マニフェストを使用すると、何を起動するか（ニュースサイトのフロントページなど）、およびその起動方法（全画面表示または通常のブラウザタブとして表示）を定義できます。

何をどのように起動するかは、デベロッパー側の選択であり、ユーザーが好むと考えられる表示方法に応じて決定します。
サイトにブラウザのすべての UI 要素を表示する場合は、display を `browser` に設定します。

```
"display": "browser"
```

ニュースサイトを、ニュースをメインとしたアプリのように表示して（表示内容をアプリとして扱う）、ウェブページにあるような要素を UI に表示しないようにするには、display を `standalone` に設定します。

```
"display": "standalone"
```

### 疑似的にアドレスバーを自動で非表示にする

次の行を追加してアドレスバーを自動的に非表示にすると、「疑似的な全画面表示」にすることができます。

```
window.scrollTo(0,1);
```

Warning: 助言としてお伝えします。この方法は確かに存在しますが、正規の手法ではありません。
使用は避けてください。— Paul

この方法は非常に単純で、ページを読み込み、ブラウザバーを非表示にするように指示しています。
ただ、残念ながら、この方法は標準化されおらず、十分にサポートされていません。
また、多くの不適切な振る舞いを回避する必要があります。

たとえば、多くの場合、ユーザーがページに戻ると、ブラウザは元のページの位置を復元します。
`window.scrollTo` を使用すると、この機能が無効になってしまうため、ユーザーは不快に感じます。
この問題を回避するには、最後の位置を localStorage に保存して、特殊なケース（たとえば、ユーザーがページを複数のウィンドウで開いている場合）に対応する必要があります。

## UX ガイドライン

全画面表示を活用したサイトを構築している場合、ユーザーが満足するようなサービスを提供するには、ユーザー エクスペリエンスを大きく変更しなければならない可能性があることに留意してください。

### ナビゲーション コントロールに依存しない

iOS 端末には、物理的な戻るボタンや更新操作がありません。したがって、操作不能な状態に陥ることなく、ユーザーがアプリ全体を使用できるようにする必要があります。

すべての主要なプラットフォームで、全画面モードまたはインストール モードで実行しているかどうかを簡単に検出できます。

#### iOS

iOS では、`navigator.standalone` ブール値プロパティを使用して、ユーザーがホーム画面から起動したかどうかを確認できます。

```
if(navigator.standalone == true) {
  // My app is installed and therefore fullscreen
}
```

#### ウェブアプリ マニフェスト（Chrome、Opera、Samsung）

インストール済みアプリとしてサイトが起動されると、Chrome は完全な全画面表示で実行されないため、`document.fullscreenElement` が null を返し、CSS セレクターが機能しなくなります。

ユーザーがサイトで操作することにより全画面表示をリクエストしたときは、次に示すように、CSS 疑似セレクターなどの標準の Fullscreen API を使用して、全画面状態に対応する UI を適用することができます。

```
selector:-webkit-full-screen {
  display: block; // displays the element only when in fullscreen
}

selector {
  display: none; // hides the element when not in fullscreen mode
}
```

ユーザーがホーム画面からサイトを起動した場合は、`display-mode` メディアクエリがウェブアプリ マニフェストで定義した状態に設定されます。
完全な全画面表示の場合は、次のようになります。

```
@media (display-mode: fullscreen) {

}
```

ユーザーがアプリをスタンドアロン モードで起動した場合は、`display-mode` メディアクエリが `standalone` に設定されます。

```
@media (display-mode: standalone) {

}
```

#### Firefox

ユーザーがサイトで全画面表示をリクエストしたとき、またはアプリを全画面モードで起動したときは、次に示すように、CSS 疑似セレクターを含むすべての標準の Fullscreen API を使用して、全画面状態に対応する UI を適用することができます。

```
selector:-moz-full-screen {
  display: block; // hides the element when not in fullscreen mode
}

selector {
  display: none; // hides the element when not in fullscreen mode
}
```

#### Internet Explorer

IE では CSS 擬似クラスにハイフンがありませんが、Chrome や Firefox と同じように機能します。

```
selector:-ms-fullscreen {
  display: block;
}

selector {
  display: none; // hides the element when not in fullscreen mode
}
```

#### 仕様

仕様で使用される書式は、IE で使用される構文と一致します。

```
selector:fullscreen {
  display: block;
}

selector {
  display: none; // hides the element when not in fullscreen mode
}
```

### ユーザーを全画面表示に留める

Fullscreen API には、少し扱いづらい側面があります。ブラウザ ベンダーは、ユーザーが全画面表示のページにロックされることを回避するために、可能になり次第、全画面表示から抜けるためのメカニズムを開発してきました。これにより、複数のページにまたがる全画面表示のウェブサイトを構築することができなくなっています。その理由は、次のとおりです。

- プログラムで `window.location = "http://example.com"` を使用して URL を変更すると、全画面表示が終了する。
- ユーザーがページ内で外部リンクをクリックすると、全画面表示が終了する。
- `navigator.pushState` API を使って URL を変更すると、全画面表示が終了する。

ユーザーを全画面表示に留める場合は、次の 2 つの方法を使用できます。

1. インストール可能なウェブアプリのメカニズムを使用して、全画面表示に移行する。
2. \# フラグメントを使用して、UI とアプリの状態を管理する。

#syntax を使用して URL をアップデートし（window.location = "#somestate"）、`window.onhashchange` イベントをリッスンすることにより、ブラウザの履歴スタックを使ってアプリの状態変化を管理したり、ユーザーがハードウェアの戻るボタンを使用できるようにしたり、次のような History API を使用してプログラムによるシンプルな戻るボタンを提供したりできます。

```
window.history.go(-1);
```

### 全画面表示に移行するタイミングをユーザーが選択できるようにする

ユーザーが最も不快に感じるのは、ウェブサイトが予期しない動作をすることです。
ユーザーがサイトに移動したときに、巧妙に全画面表示に誘導しないでください。

次の理由により、最初のタップイベントをインターセプトして `requestFullscreen()` を呼び出さないでください。

1. ユーザーが不快に感じます。
2. ブラウザが将来のある時点で、アプリを全画面表示にするための許可をユーザーに求める場合があります。

アプリを全画面モードで起動する必要がある場合は、各プラットフォームに対してインストール済みのアプリを使用することを検討してください。

### アプリをホーム画面にインストールするようユーザーに何度も求めない

インストール済みのアプリ メカニズムを利用して、全画面で表示しようと考えている場合は、以下の点についてユーザーに配慮する必要があります。

- 通知は控えめにしてください。バナーまたはフッターを使用して、アプリのインストールが可能であることをユーザーに通知します。
- ユーザーがプロンプトで拒否した場合は、プロンプトを再度表示しないでください。
- 初回アクセス時にサービスに満足しなかったユーザーが、アプリをインストールする見込みはありません。ユーザーがサイト上で好意的な操作をしている場合は、インストールを要求することを検討してください。
- ユーザーが定期的にサイトにアクセスしていても、アプリをインストールしていない場合は、今後もインストールする見込みはありません。ユーザーに何度もインストールするよう求めないでください。

## まとめ

完全に標準化および実装された API はありませんが、この記事で紹介したいくつかのガイダンスに従うと、クライアントに関係なく、ユーザー端末の画面をフルに活用したエクスペリエンスを簡単に生み出すことができます。
