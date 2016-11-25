project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 新しいプロジェクトの最も難しい部分は、開始時であることがよくあります。Web Starter Kit は、開発プロセスに沿って支援するための

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-07-16 #}

# Web Starter Kit でサイトをスタート {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

このガイドでは、Web Starter Kit で新しいサイトを構築するプロセスを手順ごとに説明し、提供されるツールを最大限に活用できるようにします。さまざまなツールの確かな情報を提供します。

<img src="images/wsk-on-pixel-n5.png">



## 開発のフェーズ 




開発では、定期的に使用する 3 つのコマンドがあります。gulp serve、gulp、および gulp serve:dist です。  それぞれのタスクがサイトを開発にどのように役立つかを見てみましょう。


### ローカル サーバーの起動

最初は次のタスクです: `$ gulp serve`。

表面上、このタスクはローカル HTTP サーバーを起動するためブラウザで
サイトを表示できますが、背後でいくつかのツールが動作しています。

#### Live Reload

Live Reload は、エディタで変更を行うの際に旧来のリフレッシュ ダンスを
排除します。先ずブラウザに切り替え、CTRL-R を押し、ページが再読み込み
されるのを待機します。

Live Reload では、エディタで変更を行い、その結果を任意のブラウザで開いたサイトで
すぐに確認できます。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="JE-ejS8N3YI"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### 端末間でのテスト

Browser Sync は、複数の端末間でサイトをテストするのに役立ちます。 任意のスクロール、
タップ、またはキーボードの操作が、接続されているすべてのブラウザ間で共有されます。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RKKBIs_3svM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

`gulp serve` でサイトを実行する場合にのみ機能します。 `gulp serve` 
を実行してこれを試してください。隣り合った 2 つのブラウザ ウィンドウで URL を開き、
1 つのページをスクロールします。

#### プレフィックスの自動生成

ブラウザの範囲をターゲットにする場合、ベンダーのプレフィックスを使用して、
それぞれで機能を使用できることを確認する必要があります。 Web Starter Kit は、
すべてのプレフィックスを自動生成します。

下の例の CSS は、どのベンダーのプレフィックスも含まれていません。

    .app-bar-container {
      display: flex;

      width: 100%;
      height: 60px;
      position: relative;

      flex-direction: row;

      margin: 0 auto;
    }

ビルド プロセスは、自動プレフィックス変換を介して CSS を実行し、次の
最終出力を生成します。

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

#### Javascript を確認する

JSHint は、JavaScript コードをスキャンするツールです。これを使用して、JavaScript のロジックで発生する可能性のある
問題および [enforces coding best practices](//www.jshint.com/docs/) をチェックします。

プロジェクトをビルドするたびにツールが実行されます。また、gulp サーバーを実行している場合は、
JavaScript ファイルに変更を加える度に実行されます。

#### Sass のコンパイル

サーバー コマンドを実行している間、プロジェクトの中の Sass 
ファイルに加えた変更はすべて、CSS にコンパイルされ、接頭語が付けられます。その後、
ページは Live Reload にリロードされます。

Sass に馴染みがない場合、プロジェクトそのものが「CSS 
の拡張言語」として説明されます。 基本的には、いくつかの追加機能を備えた CSS です。 たとえば、
変数および関数のサポートが追加されています。これによって、モジュラー内で再利用可能な方法で 
CSS を構築できます。

### サイトの実稼働向けのバージョンをビルドする

単純な `gulp`
コマンドで、サイトの実稼働向けのバージョンをビルドすることができます。 このコマンドは、これまでに見てきたいくつかのタスクを実行するとともに、サイトの負荷をより速く、
より効率的にするためのタスクも実行します。

実稼働向けビルドの主なタスクは次のとおりです。

#### スタイルのビルド

最初のビルドは、プロジェクト内の Sass をコンパイルします。 Sass がコンパイルされた後、
Autoprefixer がすべての CSS で実行されます。

#### Javascript の問題を確認する

第 2 のビルド ステップは、JavaScript で JSHint を実行することです。

###HTML ページのビルド

次のステップは、HTML ファイルを検査することです。ビルド ブロックを検索して連結し、
JavaScript を圧縮します。 JavaScript が処理されたら、ビルド プロセスは、HTML ページを
圧縮します。

圧縮によって、実際には必要のないコメントや空白文字を削除したり、
他の手法を用いて、最終の JavaScript ファイル内の
文字の数を減少させます。 これにより最終的なファイル サイズが小さくなり、サイトの読み込み時間
が高速化されます。

連結は複数のファイルの内容を 1 つに貼り付けることを意味します。 これを行う目的は、
ブラウザがサーバーに多くのリクエストを送信せずに、1 つのリクエストだけで済むようにすることであり、
これによって高速化を実現できます。

ビルド ブロックは、圧縮して共に連結する JavaScript ファイルを管理するために
必要なすべてを備えています。 ビルド ブロックのサンプルを見てみましょう。

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/example-1.js"></script>
    <script src="scripts/example-2.js"></script>
    <!-- endbuild -->

ビルド ブロックは、特別な形式のコメントにすぎません。
ビルド ブロックとの間の JavaScript ファイルのすべてが統合
 (結合) され、main.min.js という名前のファイルに圧縮されます。そして、
最終ビルドがこれらのスクリプトをスクリプト タグで置き換えます。

    <script src="scripts/main.min.js"></script>

#### 任意の画像アセットの最適化

JPEG および PNG 画像の場合、画像内のメタデータは取り除かれます。画像のレンダリングには
必要がないためです。 メタデータは、写真を撮るためのカメラに
使用されるような情報が含まれます。

SVG の場合、存在していても必要のない属性や空白、
コメントを削除します。

#### フォントのコピー

この単純なタスクでは、アプリからのフォントを、最終的なビルド ディレクトリへコピーします。

#### ルート ディレクトリから任意のファイルをコピーする

プロジェクトのルート ディレクトリ内のファイルをビルドが検出した場合、
それらは最終ビルドにもコピーされます。

### 実稼働向けビルドのテスト

実稼働に何をプッシュする前に、すべてが期待どおりに
動作することを確認する必要があります。 `gulp serve:dist` コマンドは、サイトの実稼働向けのバージョンをビルドし、
サーバーを起動し、ブラウザを開きます。 これは **Live Reload または 
Browser Sync** を備えていませんが、サイトを展開する前にテストするための信頼性の高い方法です。




## Web Starter Kit のセットアップ 




Web Starter Kit は NodeJS、NPM、および Sass で動作します。お使いのマシンでにこれらを導入したら、プロジェクトで Web Starter Kit を使用する環境が整ったことになります。方法を紹介します。


### これらのワンタイムの依存関係をインストールします。

Web Starter Kit を使用しているサイトを構築する前に、
マシンに 2 つのツール·セットをインストールする必要があります。NodeJS、NPM、および Sass です。

#### NodeJS および NPM

Web Starter Kit のビルドツールでは、Node および NPM が必要です。 Node は Gulp を起動する
タスクランナーです。 NPM は Gulp で特定のタスクを実行するために必要なモジュールを
ダウンロードするために使用されます。

NodeJS や NPM を所有しているかどうか分からない場合は、コマンドプロンプトを開き、`node -v` を
実行して確認します。 Node から応答があった場合は、バージョンがNodeJS.org の現在のバージョンと
一致していることを確認してください。

応答がなかったり古いバージョンである場合は、NodeJS.org に移動し、大きな緑の [インストール] ボタンを
クリックしてください。 NPM は NodeJS で自動的に
インストールされます。

### Your Web Starter Kit プロジェクトの設定

最初に [https://developers.google.com/web/starter-kit/](/web/starter-kit/)
に移動し、zip ファイルをダウンロードし、解凍します。 これはプロジェクトのための基礎となるため、フォルダ名を変更し、マシン上の関連する場所に置きます。 このガイドの残りの部分では、このフォルダを `my-project` と呼びます

次に、Web Starter Kit のローカル依存関係をインストールする必要があります。 コマンド プロンプトを開き、
プロジェクト フォルダでディレクトリを変更して、
次の NPM インストール スクリプトを実行します。

    cd my-project
    npm install
    npm install gulp -g

そうです!これで Web Starter 
Kit で Gulp ツールを使用する準備が整いました。

Note: 許可または <code>EPERM</code>、<code>EACCESS</code> のようなアクセス エラーが表示された場合は、<code>sudo</code> を回避策として使用しないでください。このページ <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>に問い合わせて、</a> より堅牢な解決策を入手してください。

このガイドの次のセクションでは、Gulp を使用する方法について説明しますが、どのように見えるか確認したい場合は、
`gulp serve` を入力して、ローカル サーバーを実行してください。

<img src="images/wsk-on-pixel-n5.png">


