project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Polymer Starter Kit

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

#  Polymer Starter Kit {: .page-title }

[Polymer Starter Kit のダウンロード](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

##  Polymer Starter Kit とは

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external } を土台として、ドロワーベースのレイアウトを使用したアプリを作成できます。
レイアウトは、`app-layout` 要素で提供されます。


このテンプレートを `polymer-cli` ツールチェーンと使用すると、「PRPL パターン」の使用方法を確認することができます。PRPL パターンを使用すると、ユーザーによる初回の転送リクエストでコンテンツの迅速な配信と操作が可能になります。さらに、アプリに必要な残りのコンポーネントを事前にキャッシュしておくことで、以降の操作が高速になり、ユーザーがアプリを操作するときにオンデマンドでコンポーネントを段階的に読み込めるようになります。





PRPL パターンの概要は次のとおりです。

* 最初に転送が必要なコンポーネントを**プッシュする（Push）**
* 最初に転送したリソースをできるだけ迅速に**レンダリングする（Render）**
* その後に転送するコンポーネントを**事前にキャッシュする（Pre-cache）**
* 次の転送するリソースを**遅延読み込みし（Lazy-load）**、オンデマンドで段階的に更新する

###  Polymer Starter Kit v1 からの移行

[PSK2 での変更点と移行方法について説明しているブログ投稿をご覧ください。](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

##  セットアップ

###  前提条件

[polymer-cli](https://github.com/Polymer/polymer-cli){: .external } をインストールします。

    npm install -g polymer-cli

###  テンプレートを指定してプロジェクトを初期化する

    mkdir my-app
    cd my-app
    polymer init starter-kit

###  開発サーバーを起動する

以下のコマンドを実行すると、`http://localhost:8080` でアプリが起動し、基本的な URL ルーティングがアプリに提供されます。


    polymer serve --open


###  ビルド

build のコマンドを実行すると、アプリケーションの依存関係に基づいて HTML、CSS および JS が縮小され、service-worker.js ファイルが生成されます。このファイルには、`polymer.json` で指定されたエントリポイントとフラグメントに基づいて依存関係を事前にキャッシュするためのコードが含まれます。縮小されたファイルは `build/unbundled` フォルダに出力され、HTTP/2+Push 互換サーバーからの配信に適しています。





このコマンドは、フォールバックの `build/bundled` フォルダも作成します。このフォルダは、フラグメント バンドルを使用して生成され、H2/Push 非互換サーバーからの配信と H2/Push をサポートしていないクライアントへの配信に適しています。



    polymer build

###  ビルドをプレビューする

以下のコマンドでは、アプリが Push 互換サーバーで実行される場合のように、`http://localhost:8080` でアプリの縮小バージョンをバンドルされていない状態で実行します。


    polymer serve build/unbundled

以下のコマンドは、`http://localhost:8080` でアプリの縮小バージョンを実行します。このバージョンは、フラグメント バンドルで生成されます。


    polymer serve build/bundled

###  テストを実行する

以下のコマンドは、マシンに現在インストールされているブラウザに対して [Web Component Tester](https://github.com/Polymer/web-component-tester){: .external } を実行します。



    polymer test

###  新しいビューを追加する

オンデマンドで読み込まれるビューを追加してアプリを拡張することができます。（転送ルートに基づいて読み込む、アプリケーションの重要でないセクションを段階的にレンダリングするなど）
新たにオンデマンドで読み込まれた各フラグメントは、含まれている `polymer.json` ファイル内の `fragments` のリストに追加する必要があります。
この処理により、これらのコンポーネントとその依存関係が、事前にキャッシュされたコンポーネントのリストに追加されるようになります（さらに、フォールバック `bundled` ビルドにバンドルが作成されます）。



##  次のステップ

[スタートガイド](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }をご覧ください。

##  さらに詳しく知る

詳細については、コードを確認するか、問題をご報告ください。または、GitHub リポジトリ（[https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }）をご覧ください。



{# wf_devsite_translation #}
