project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Service Worker Libraries

{# wf_published_on:2015-01-01 #}
{# wf_updated_on:2016-11-07 #}

#  Service Worker Libraries {: .page-title }

Google の [Service Worker](/web/fundamentals/getting-started/primers/service-workers) Libraries を使用し、Service Worker ボイラプレート コードを削除して開発作業をシンプルにします。



<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>Service Worker Libraries の概要</figcaption>
</figure>

**sw-precache &mdash;** ビルドプロセスに統合され、アプリケーション シェルなどの静的アセットを事前キャッシュする Service Worker
を生成します。


**sw-toolbox &mdash;** 動的コンテンツ、API 呼び出し、サードパーティのリソースなどの一般的なランタイム キャッシュ パターンを、README の記述と同じくらい簡単に実装できます。


**sw-offline-google-analytics &mdash;** アナリティクス リクエストを一時的に保持して再試行することにより、ネットワークの切断時にリクエストが失われないようにします。


<div class="clearfix"></div>

##  Service Worker Libraries を使用する理由

Service Worker をウェブアプリに追加して、ネットワークの不確実性を排除し、Service Worker を活用した高速かつオフライン ファーストのサービスを提供するメリットについてはご理解されていると思います。
しかし、独自の Service Worker を一から記述する場合は、次のような条件を満たす必要があります。


* URL を容易かつ確実に事前キャッシュする。 
* キャッシュ バージョンの文字列をインクリメントして、事前キャッシュされたリソースを確実にアップデートする。
* キャッシュの有効期限を設定して、キャッシュ サイズまたはエントリ期間を明確にする。
* [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi) ネットワーク タイムアウトやボイラプレート コードなどの一般的なパターンを構成する。
* オフライン使用時に Google アナリティクス データを取得およびレポートする。


Google の Service Worker Libraries を使用すると、これらのすべての条件に対応できます。


##  Service Worker Precache 

[Service Worker Precache](https://github.com/GoogleChrome/sw-precache/)（`sw-precache`）は、リソースを事前キャッシュする Service Worker を生成するためのモジュールです。
このモジュールは、[`gulp`](https://gulpjs.com/) で記述されたスクリプトなど、JavaScript ベースのビルド スクリプトで使用でき、[コマンドライン インターフェース](https://github.com/GoogleChrome/sw-precache/#command-line-interface)も提供されています。
このモジュールを直接使用するか、もしくは必要に応じて [`webpack`](https://webpack.github.io/) など、特定のビルド環境向けの `sw-precache` の[ラッパー](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)を使用することが可能です。




このモジュールは [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox) ライブラリと[併用](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md)することができます。この使用方法は、[App Shell と動的コンテンツ モデル](/web/fundamentals/architecture/app-shell)を採用している場合に効果があります。


詳細については、[README](https://github.com/GoogleChrome/sw-precache/blob/master/README.md) をご覧ください。簡単な使用方法は、[スタートガイド](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md)で説明されています。



[sw-precache の入手](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

###  機能

| 機能 | 概要 |
|---------|---------|
| App Shell の事前キャッシュ | ユーザーがページにアクセスしたときに、ウェブアプリのシェル（コア HTML、JavaScript、CSS）を事前キャッシュできます。 |
| ビルド時の統合 | [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js)、[Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js)、または[コマンドライン](https://github.com/GoogleChrome/sw-precache#command-line-interface)など、既存のビルドプロセスに sw-precache を取り入れます。 |
| 最新状態に保つ | ビルドに変更があると、Service Worker スクリプトがアップデートされます。ユーザーは最新版を入手できますが、コンテンツやキャッシュのバージョンをデベロッパーが手動で管理する必要はありません。 |
| オフライン対応 | ネットワークの利用可否に関係なく、[キャッシュを優先](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network)してすぐに静的リソースを利用します。 |

##  Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/)（`sw-toolbox`）には、独自の Service Worker を作成するときに使用できるシンプルなヘルパーがいくつか用意されています。
具体的には、共通キャッシュ パターンや[表現的なアプローチ](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)などがあり、こうした戦略はランタイム リクエストに利用できます。


 

[sw-toolbox の入手](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

###  機能

| 機能 | 概要 |
|---------|---------|
| ランタイム キャッシュ | 容量が大きい、または利用頻度が少ない画像などのリソースは、実行時にそのリソースが初めて使用されるときにキャッシュします。 |
| オフライン時のフォールバック | オンライン時は、最新のイメージ、API レスポンスなどの動的コンテンツをネットワークから読み込みます。一方でオフライン時は、キャッシュしたプレースホルダーにフォールバックします。 |
| Lie-Fi への対処 | [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) に対処し、ネットワークが超低速の場合は、自動的にキャッシュされたレスポンスにフォールバックします。 |
| キャッシュの肥大化防止 | 古いイメージをいつまでもキャッシュしておく必要はありません。最近利用されていないこと、および長期間キャッシュされていることを基準に有効期限を設け、スペースを解放します。|

##  Offline Google Analytics

[Offline Google Analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) では、アナリティクス リクエストを一時的に保持して再試行することにより、ネットワークの切断時にリクエストが失われないようにします。
このツールは、npm を使用してビルドシステムに簡単にインストールしたり、Service Worker スクリプトに簡単にインポートしたりできます。
このツールは、パラメータ化された関数呼び出しを使用して設定します。


[sw-offline-google-analytics の入手](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

###  機能

| 機能 | 概要 |
|---------|---------|
| Offline Google Analytics | fetch ハンドラを作成して、Google アナリティクス JavaScript がオフラインで利用できるようにします。 |
| データの一時的なキャッシュ | 端末がオフラインのときに作成されたアナリティクス リクエストを保持し、Service Worker が次回起動したときにそのリクエストを再試行します。 |
| カスタム再試行値 | 再試行された Google アナリティクス リクエストに追加するキー値ペアです。たとえば、カスタム ディメンションを設定して、リクエストが再試行されたことを示します。 |
| ヒット パラメータの変更 | ヒットのパラメータをプログラムで変更して、ヒットの試行から再試行までの経過時間などをトラックします。 |

##  さらに詳しく知る

###  記事

[sw-toolbox のスタートガイド](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134) Dean Hume 投稿 

[sw-precache を使用して create-react-app にオフライン サポートを追加する方法](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm) Jeffrey Posnick 投稿

[Service Workers in Production](/web/showcase/case-study/service-workers-iowa) の事例紹介では、`sw-precache` ライブラリと `sw-toolbox` ライブラリを一緒に使用して、[Google I/O 2015 ウェブアプリ](https://events.google.com/io2015/)を強化する方法が詳しく解説されています。




###  コードラボ

[sw-precache を使用して Service Worker を追加する](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

###  動画

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Jeff Posnick は Chrome Dev Summit 2015 で行ったプレゼンテーション「Instant Loading with Service Workers」で、`sw-precache` と `sw-toolbox` を効果的に併用して、読み込みが速くオフラインで動作するウェブアプリをビルドする方法について説明しています。




[スライド](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt と Addy Osmani は、Google の Service Worker Libraries を使用して、ウェブアプリをオフラインですばやく動作させる方法について説明しています。
この動画では、`sw-precache` と `sw-toolbox` の両方について解説しています。


<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

この Totally Tooling Mini-Tips では、Matt と Addy が `sw-toolbox` について解説しています。


<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Mat Scales は Google I/O 2016 で、優れたユーザー エクスペリエンスを実現するために、Progressive Web App の高速読み込み、オフラインでの適切な動作、段階的な拡張を可能にするツールとライブラリについて説明しています。




{# wf_devsite_translation #}
