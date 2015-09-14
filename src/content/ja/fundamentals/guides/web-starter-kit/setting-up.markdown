---
title: "Web Starter Kit のセットアップ"
description: "Web Starter Kit を初めて使用する場合は、このガイドが役立ちます。Web Starter Kit をできるだけ迅速に起動して、有効活用する"
notes:
  nosudo: 
    - "許可または <code>EPERM</code>、<code>EACCESS</code> のようなアクセス エラーが表示された場合は、<code>sudo</code> を回避策として使用しないでください。このページ <a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>に問い合わせて、</a> より堅牢な解決策を入手してください。"
updated_on: 2015-04-01
---

<p class="intro">
  Web Starter Kit は NodeJS、NPM、および Sass で動作します。お使いのマシンでにこれらを導入したら、プロジェクトで Web Starter Kit を使用する環境が整ったことになります。方法を紹介します。
</p>

{% include shared/toc.liquid %}

## これらのワンタイムの依存関係をインストールします。

Web Starter Kit を使用しているサイトを構築する前に、
マシンに 2 つのツール·セットをインストールする必要があります。NodeJS、NPM、および Sass です。

### NodeJS および NPM

Web Starter Kit のビルドツールでは、Node および NPM が必要です。 Node は Gulp を起動する
タスクランナーです。 NPM は Gulp で特定のタスクを実行するために必要なモジュールを
ダウンロードするために使用されます。

NodeJS や NPM を所有しているかどうか分からない場合は、コマンドプロンプトを開き、`node -v` を
実行して確認します。 Node から応答があった場合は、バージョンがNodeJS.org の現在のバージョンと
一致していることを確認してください。

応答がなかったり古いバージョンである場合は、NodeJS.org に移動し、大きな緑の [インストール] ボタンを
クリックしてください。 NPM は NodeJS で自動的に
インストールされます。

## Your Web Starter Kit プロジェクトの設定

最初に [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
に移動し、zip ファイルをダウンロードし、解凍します。 これはプロジェクトのための基礎となるため、フォルダ名を変更し、マシン上の関連する場所に置きます。 このガイドの残りの部分では、このフォルダを `my-project` と呼びます

次に、Web Starter Kit のローカル依存関係をインストールする必要があります。 コマンド プロンプトを開き、
プロジェクト フォルダでディレクトリを変更して、
次の NPM インストール スクリプトを実行します。

    cd my-project
    npm install
    npm install gulp -g

そうです!これで Web Starter 
Kit で Gulp ツールを使用する準備が整いました。

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

このガイドの次のセクションでは、Gulp を使用する方法について説明しますが、どのように見えるか確認したい場合は、
`gulp serve` を入力して、ローカル サーバーを実行してください。

<img src="images/wsk-on-pixel-n5.png">


