project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Web Starter Kit はボイラプレートとして使用できる、マルチデバイス対応の開発ツールです。

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-09-12 #}

#  Web Starter Kit {: .page-title }

[Web Starter Kit（ベータ版）のダウンロード](https://github.com/google/web-starter-kit/releases/latest){: .button .button-primary }

##  Web Starter Kit とは

[Web Starter Kit](https://github.com/google/web-starter-kit) はウェブ開発用の独自のボイラプレートです。このツールにより、[パフォーマンスを優先して](#web-performance)、多くの端末に対応した快適なエクスペリエンスを実現することができます。Google の [Web Fundamentals](/web/fundamentals/) に記載されているベスト プラクティスを順守して、生産性を維持する上でも役に立ちます。この業界のプロの方も初心者の方も、まずはご利用ください。

###  機能

| 機能                                | 概要                                                                                                                                                                                                                                                     |
|----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|レスポンシブ ボイラプレート | マルチスクリーン ウェブ用に最適化されたレスポンシブ ボイラプレート。[Material Design Lite](http://getmdl.io) を活用します。希望に応じて、このボイラプレートを使用するか、[basic.html](https://github.com/google/web-starter-kit/blob/master/app/basic.html) で未加工のボイラプレートを入手できます。                          |
| Sass のサポート                           | [Sass](http://sass-lang.com/) を CSS に簡単にコンパイルし、変数や mixin などをサポートできます（本番環境では、`gulp serve` または `gulp` を実行します）。                                                                                                      |
| パフォーマンスの最適化               | JavaScript、CSS、HTML、およびイメージを圧縮して連結し、ページのサイズを小さくします（`gulp` を実行して、プロジェクトの最適化されたバージョンを `/dist` に作成します）。                                                                                                |
| コードの Lint チェック              | [ESLint](http://eslint.org)（JavaScript のパターンを識別およびレポートする柔軟な linter ツール）を使用して、JavaScript コードの Lint チェックを実行します。Web Starter Kit では、ESLint と [eslint-config-google](https://github.com/google/eslint-config-google) を使用して、Google JavaScript スタイルガイドに準拠するよう努めています。                                                                                                |
| Babel 6.0 を使用した ES2015                   | [Babel](https://babeljs.io/){: .external } を使用した ES2015 のオプション サポート。ES2015 のサポートを有効にするには、[.babelrc](https://github.com/google/web-starter-kit/blob/master/.babelrc) ファイル内の`"only": "gulpfile.babel.js",` の行を削除します。ES2015 のソースコードは、幅広いブラウザ サポートに対応するために、ES5 に自動的にトランスパイルされます。  |
| 組み込みの HTTP サーバー                   | 開発と反復処理の際にサイトをローカルでプレビューするための組み込みのサーバー。                                                                                                                                                                            |
| ライブブラウザの再読み込み                 | 編集が行われた時点でリアルタイムにブラウザを再読み込みします。拡張機能は必要ありません（`gulp serve` を実行して、ファイルを編集します）。                                                                                                                           |
| 複数端末の同期           | プロジェクトを編集するときに、複数の端末でクリック、スクロール、フォーム、LiveReload を同期します。[BrowserSync](http://browsersync.io) を活用します（`gulp serve` を実行し、ネットワーク上の他の端末で指定されている IP を開きます）。                       |
| オフライン サポート                     | Google が作り上げた [Service Worker](/web/fundamentals/getting-started/primers/service-workers) の[事前キャッシュ](https://github.com/google/web-starter-kit/blob/master/gulpfile.babel.js#L226)機能により、`dist` を HTTPS ドメインにデプロイするサイトはオフラインでも動作します。このサポートは、[sw-precache](https://github.com/GoogleChrome/sw-precache/) により可能になります。                                                                                                                                              |
| PageSpeed Insights                     | モバイル上または PC 上でのサイトの性能を示すウェブ パフォーマンス指標（`gulp pagespeed` を実行します）。                                                                                                                                                    |

##  クイックスタート

Web Starter Kit を[ダウンロード](https://github.com/google/web-starter-kit/releases/latest)するか、[リポジトリ](https://github.com/google/web-starter-kit)のクローンを作成して、`app` ディレクトリのコンテンツを基に環境を構築します。



HTML のベースとなるファイルは、以下の 2 つから選択できます。

- `index.html` - マテリアル デザイン レイアウトが含まれるデフォルトのベース。
- `basic.html` - レイアウトはありませんが、モバイル向けの最小限のベスト プラクティスが含まれます。

[インストール ドキュメント](https://github.com/google/web-starter-kit/blob/master/docs/install.md)に目を通して、自身の環境で WSK を実行する準備が整っていることを確認します。システムで WSK を実行できることを確認したら、サイトの構築に使用できる[コマンド](https://github.com/google/web-starter-kit/blob/master/docs/commands.md)を確認してください。


##  ウェブ パフォーマンス

Web Starter Kit は、面倒な作業を必要とせず、ユーザーが最初から高いパフォーマンスを実現できるように作られています。実際、デフォルト テンプレートの中央値ウェブページ テストの[スコア](http://www.webpagetest.org/result/151201_VW_XYC/){: .external } は、Service Worker の事前キャッシュを活用したことで、[Speed Index](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/metrics/speed-index) が約 1100（1000 が理想値）、再アクセスの Speed Index が約 550 という数値になっています。 

##  ブラウザ対応

現在、次のブラウザの最新バージョンとその直前のバージョンを公式にサポートすることを目指しています。

* Chrome
* Edge
* Firefox
*  Safari
* Opera
* Internet Explorer 9+

これは、上記のバージョンよりも古いブラウザでは Web Starter Kit を使用できないという意味ではなく、レイアウトが適切に行われるようにする際は、上記のバージョンに重点を置いているという意味になります。

## トラブルシューティング

ツールのインストール中または実行中に問題が発生した場合は、[トラブルシューティング](https://github.com/google/web-starter-kit/wiki/Troubleshooting) ガイドを参照してから、[問題](https://github.com/google/web-starter-kit/issues)をご報告ください。問題の解決方法についてご提案させていただきます。

##  ボイラプレートのみのオプション

Google が提供するツールを使用しない場合は、プロジェクトから `package.json`、`gulpfile.babel.js`、`.jshintrc`、および `.travis.yml` ファイルを削除してください。削除すると、代替ビルドシステムを使用して、またはビルドシステムを使わずにボイラプレートを安全に使用できます。

##  ドキュメントとレシピ

* [ファイルの付録](https://github.com/google/web-starter-kit/blob/master/docs/file-appendix.md) - さまざまなファイルの用途。
* [Material Design Lite の Sass の使用](https://github.com/google/web-starter-kit/blob/master/docs/mdl-sass.md) - MDL の Sass と WSK と併用する方法。
* [デプロイメント ガイド](https://github.com/google/web-starter-kit/blob/master/docs/deploy.md) - Firebase、Google App Engine、およびその他のサービスで利用可能。
* [Gulp レシピ](https://github.com/gulpjs/gulp/tree/master/docs/recipes) - 公式の Gulp レシピ ディレクトリには、プロジェクトに追加できるさまざまなワークフローのガイドを網羅したリストが含まれています。

##  インスピレーション

Web Starter Kit は、[Mobile HTML5 Boilerplate](https://html5boilerplate.com/mobile/){: .external } と Yeoman の [generator-gulp-webapp](https://github.com/yeoman/generator-webapp) から着想を得ています。開発の際には、両プロジェクトに貢献者した方々からの情報を参考にさせていただきました。[よくある質問](https://github.com/google/web-starter-kit/wiki/FAQ)では、プロジェクトに関する一般的な質問に回答しています。


##  さらに詳しく知る

詳細については、コードを確認するか、問題をご報告ください。または、GitHub リポジトリ（[https://github.com/google/web-startfer-kit](https://github.com/google/web-starter-kit)）をご覧ください。



{# wf_devsite_translation #}
