project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 新しいプロジェクトで最も苦労するのは、立ち上げ時である場合が多くあります。Web Starter Kit では、開発プロセスの基盤となる便利なツールが幅広く提供されています。

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2014-07-16 #}

# Web Starter Kit でサイトを構築する {: .page-title }

Warning: この記事はしばらくアップデートされていないため、現実が反映されていない可能性があります。最新の詳細については、Web Starter Kit の[ドキュメント](https://github.com/google/web-starter-kit/)を確認してください。

{% include "web/_shared/contributors/mattgaunt.html" %}

<img src="images/wsk-on-pixel-n5.png" class="attempt-right">

このガイドでは、Web Starter Kit で新しいサイトを構築するプロセスを手順ごとに説明し、提供されるツールを最大限に活用できるようにします。


<div style="clear:both;"></div>

##  開発のフェーズ

開発では `gulp serve`、`gulp`、`gulp serve:dist` の 3 つのコマンドをよく使用します。各コマンドが開発プロセスでどのように役立つかを見てみましょう。


###  ローカル サーバーの起動

最初は `$ gulp serve` です。

表面上、このタスクはローカル HTTP サーバーを起動して、ブラウザにサイトを表示できますが、背後ではいくつかのツールが動作しています。


####  LiveReload

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

従来はエディタで変更を行った後に、ブラウザに切り替えて、CTRL-R を押し、ページが再読み込みされるのを待機する必要がありました。この一連の処理を自動化したのが LiveReload です。



LiveReload では、エディタで変更を行うだけで、任意のブラウザで開いたサイトに変更内容がすぐに反映されます。



####  端末間でのテスト

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Browser Sync は、複数の端末間でサイトをテストするのに役立ちます。任意のスクロール、タップ、またはキーボードの操作が、接続されているすべてのブラウザ間で共有されます。


これは `gulp serve` でサイトを実行する場合にのみ機能します。実際に `gulp serve` を実行して、同じ URL を開いた 2 つのブラウザ ウィンドウを並べ、1 つのページをスクロールして確認してみてください。



<div style="clear:both;"></div>

####  プレフィックスの自動付与

さまざまなブラウザをターゲットにする場合、ベンダーのプレフィックスを使用して、それぞれで機能を使用できることを確認する必要があります。
Web Starter Kit は、すべてのプレフィックスを自動で付与します。


下の例の CSS には、ベンダーのプレフィックスがまったく含まれていません。

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

ビルド プロセスで CSS に Autoprefixer が適用されると、次の最終出力が得られます。


    .app-bar-container {
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      -webkit-flex-direction: row;
          -ms-flex-direction: row;
              flex-direction: row;

      margin: 0 auto;
    }

####  JavaScript を確認する

JSHint は JavaScript のコードをスキャンして、JavaScript のロジックで発生し得る問題をチェックし、[コーディングのベスト プラクティスの適用](//www.jshint.com/docs/){: .external }を行うツールです。


プロジェクトをビルドするたびにツールが実行されます。また、gulp サーバーを実行している場合は、JavaScript ファイルに変更を加えるたびに実行されます。


####  Sass のコンパイル

サーバー コマンドを実行している間は、プロジェクトの中の Sass ファイルに加えた変更はすべて CSS にコンパイルされ、プレフィックスが付けられます。その後、ページは LiveReload によってリロードされます。



Sass に馴染みがない方は、「CSS の拡張言語」だと考えてください。
基本的に Sass は、いくつかの追加機能を備えた CSS です。たとえば、変数および関数のサポートが追加されています。これによって、モジュラー内で再利用可能な方法で CSS を構築できます。



###  サイトの実稼働向けのバージョンをビルドする

単純な `gulp` コマンドで、サイトの実稼働向けのバージョンをビルドすることができます。
このコマンドは、これまでに見てきたいくつかのタスクを実行するとともに、サイトの読み込みをより速く、より効率的にするためのタスクも実行します。


実稼働向けビルドの主なタスクは次のとおりです。

####  スタイルのビルド

まず、ビルドでプロジェクト内の Sass がコンパイルされます。Sass がコンパイルされた後、すべての CSS にAutoprefixer が適用されます。


####  JavaScript の問題を確認する

第 2 のビルド ステップは、JavaScript で JSHint を実行することです。

####  HTML ページのビルド

次のステップは、HTML ファイルを検査することです。ビルド ブロックを検索して連結し、JavaScript を圧縮します。
JavaScript が処理されたら、ビルド プロセスの中で HTML ページを圧縮します。


実際には必要のないコメントや空白文字を削除するなどの手法を用いて圧縮し、最終的な JavaScript ファイル内の文字の数を減少させます。これにより最終的なファイル サイズが小さくなり、サイトの読み込み時間が短縮されます。


なお、連結とは複数のファイルの内容を 1 つファイルに貼り付けることを意味します。これにより、ブラウザはサーバーに 1 回だけリクエストを送信すれば済むようになり、結果的に高速化につながります。



ビルド ブロックには、圧縮して連結する JavaScript ファイルを管理するために必要な情報がすべて備わっています。
以下はビルド ブロックのサンプルです。

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

ビルド ブロックは、特別な形式のコメントにすぎません。ビルド ブロックの間にある JavaScript ファイルがすべて統合（結合）され、main.min.js という名前のファイルに圧縮されます。そして、最終ビルドでこれらのスクリプトがスクリプト タグに置き換えられます。




    <script src="scripts/main.min.js"></script>

####  任意の画像アセットの最適化

JPEG および PNG 画像の場合、画像内のメタデータは取り除かれます。画像のレンダリングには必要がないためです。
メタデータには、写真撮影に使用されたカメラなどの情報が含まれます。


SVG の場合は、不要な属性や空白、コメントが削除されます。


####  フォントのコピー

これは単純なタスクで、アプリのフォントを最終的なビルド ディレクトリにコピーします。

####  ルート ディレクトリから任意のファイルをコピーする

ビルド時にプロジェクトのルート ディレクトリ内でファイルが検出された場合、それらは最終ビルドにもコピーされます。


###  実稼働向けビルドのテスト

実稼働サイトに何かをプッシュする前に、すべて期待どおりに動作することを確認する必要があります。
`gulp serve:dist` コマンドは、サイトの実稼働向けのバージョンのビルドし、サーバーを起動し、ブラウザを開きます。
これは **LiveReload や Browser Sync には対応していません**が、サイトを開設する前にテストするための信頼性の高い方法です。



##  Web Starter Kit のセットアップ


Web Starter Kit には NodeJS、NPM、および Sass が必要です。これらをインストールしたら、プロジェクトで Web Starter Kit を使用する環境が整ったことになります。


###  ワンタイムの依存関係をインストールする

Web Starter Kit を使用してサイトを構築する前に、マシンに 2 つのツールセットをインストールする必要があります。
NodeJS と NPM、および Sass

####  NodeJS と NPM

Web Starter Kit のビルドツールでは、Node および NPM が必要です。Node は Gulp を起動するタスクランナーです。
NPM は Gulp で特定のタスクを実行するために必要なモジュールをダウンロードするために使用されます。


NodeJS や NPM を所有しているかどうか分からない場合は、コマンドプロンプトを開き、`node -v` を実行して確認します。
Node から応答があった場合は、バージョンが NodeJS.org の現行バージョンと一致していることを確認してください。


応答がなかったり古いバージョンである場合は、NodeJS.org に移動し、大きな緑のインストール ボタンをクリックしてください。
NPM は NodeJS と一緒に自動的にインストールされます。


###  Web Starter Kit プロジェクトの設定

最初に [/web/tools/starter-kit/](/web/tools/starter-kit/) に移動し、zip ファイルをダウンロードし、解凍します。
これはプロジェクトの基礎になります。フォルダ名を変更し、マシン上の関連する場所に置きます。このガイドの残りの部分では、このフォルダを `my-project.` と呼びます。

次に、Web Starter Kit のローカル依存関係をインストールする必要があります。コマンド プロンプトを開き、プロジェクト フォルダに移動して、次の NPM インストール スクリプトを実行します。



    cd my-project
    npm install
    npm install gulp -g

これで完了です。Web Starter Kit で Gulp ツールを使用する準備が整いました。



注:  `EPERM`、 `EACCESS` などのパーミッション エラーやアクセス エラーが発生した場合に、回避策として  `sudo` は使用しないでください。このページ <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>に問い合わせて、</a> より堅牢な解決策を入手してください。

<!--
The next section of this guide covers how to use Gulp, but if you want to see
how things look, try running the local server by typing `gulp serve`.
-->
<img src="images/wsk-on-pixel-n5.png">


{# wf_devsite_translation #}
