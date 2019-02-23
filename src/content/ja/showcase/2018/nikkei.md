project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2018-11-19 #}
{# wf_updated_on: 2018-11-19 #}
{# wf_blink_components: N/A #}
{# wf_featured_image: /web/showcase/2018/images/nikkei/featured.jpg #}
{# wf_featured_snippet: 日本経済新聞は140年を超える歴史を持つ、日本において信頼されるメディアの1つです。より優れたユーザ体験とWebにおけるビジネスを加速するため、日本経済新聞社は2017年11月、プログレッシブウェブアプリをローンチし、新たなプラットフォームで優れた結果を出すことができました。 #}
{# wf_tags: casestudy,progressive-web-apps #}
{# wf_region: asia #}
{# wf_vertical: media #}
{# wf_featured_date: 2018-11-19 #}
{# wf_blink_components: N/A #}

# 日本経済新聞社は複数ページのPWAで新しいレベルの品質とパフォーマンスを実現  {: .page-title}

<style>
  figcaption {
    text-align: center;
    font-size: small;
  }
  .no-bullets {
    list-style-type: none;
    padding-inline-start: 0;
  }
</style>

140年以上の歴史を持つ[日本経済新聞](https://r.nikkei.com/)は、日本で最も権威のあるメディア事業の1つです。紙媒体の新聞に加えて、毎月4億5,000万人以上のユーザがデジタルの媒体を訪れています。日経では2017年11月に、より良いユーザーエクスペリエンスと、ウェブにおけるビジネスを加速するため、「プログレッシブウェブアプリ(PWA) - [https://r.nikkei.com](https://r.nikkei.com)」を成功裏に立ち上げました。 

<div class="attempt-left">
  <p><b>パフォーマンスの改善</b></p>
  <ul class="no-bullets">
    <li>
      <span class="compare-better"> <b>2X</b> のSpeed Index
    </span>
</li>
    <li>
      <span class="compare-better">
      <b>14</b> 秒早いTime-To-Interactive
    </span>
</li>
    <li>
      <span class="compare-better">
      <b>75%</b> の読み込み速度改善(prefetch利用時)
    </span>
</li>
  </ul>
</div>

<div class="attempt-right">
  <p><b>ビジネスインパクト</b></p>
  <ul class="no-bullets">
    <li>
      <span class="compare-better"> <b>2.3X</b> のオーガニック流入
    </span>
</li>
    <li>
      <span class="compare-better">
      <b>58%</b> のコンバージョン増(会員登録)
    </span>
</li>
    <li>
      <span class="compare-better">
      <b>49%</b> の1日当りアクティブユーザー数増
    </span>
</li>
    <li>
      <span class="compare-better">
      <b>2X</b> のセッションあたりPV増
    </span>
</li>
  </ul>
</div>

<a class="button button-primary" download href="/web/showcase/2018/pdf/nikkei-pwa.pdf">ビジネス中心のPDFケーススタディをダウンロード(英語)</a>

<div class="clearfix"></div>

## ビジネスの概要

### チャレンジ

日経では、スマートフォン利用者が増え、多くのユーザのウェブへの主導線となるにつれ、従来のウェブサイトへのモバイルからの流入が急激に増えていく中、[Lighthouse](/web/tools/lighthouse/)、ウェブページをスキャンし、複数のカテゴリにまたがって改善する方法についての改善レコメンデーションを提供する監査ツール、を利用し調査を行った結果、サイトが複数のエリアにおいてモバイル向けに最適化されていないこと、また読み込み速度にも多くの改善余地を見つけることができました。

従来のウェブサイトでは、操作可能な状態となるのに20秒かかる場合があり、Speed Indexは平均10秒となっていました。サイトの読み込みに3秒以上かかると、モバイルユーザの53%はサイトを離れてしまうという調査結果があり、日経では読み込み速度を速めることでよりよい体験を提供し、Webにおけるビジネスを加速させる方針を固めました。

> 特に経済ニュースの場合、スピードの価値は明白です。我々はスピードを主な指標の1つとし、ユーザにもその価値を理解していただけた。 <br>**重森 泰平** デジタル戦略担当マネージャー

### 結果

<figure class="attempt-right screenshot">
  <a href="/web/showcase/2018/images/nikkei/nikkei-01.jpg">
    <img src="/web/showcase/2018/images/nikkei/nikkei-01.jpg">
  </a>
  <figcaption>
    2018年4月に従来のウェブサイト
    <a href="http://mw.nikkei.com">mw.nikkei.com</a>にて実行
  </figcaption>
</figure>

日経ではLighthouseのスコアが23点から82点に急上昇するという驚異的なパフォーマンス改善を行いました。Time-to-Interactive指標は14秒向上し、オーガニック流入、速度、コンバージョン率、1日当りアクティブユーザー数もすべて向上するという結果となりました。

バニラのJavaScriptでもフロントエンドの複雑性を低減するためにPWAは複数ページのアプリ(MPA)を採用しています。1年という期間、5人のコアメンバーでこのパフォーマンスを達成しています。

<div class="clearfix"></div>

> 日本経済新聞社のエンジニアは優れたUXがビジネスのパフォーマンスにも貢献すること証明しました。我々はWebにおいて新たなレベルの品質をこれからも届けるために全力で投資をしつづけていきたい。<br> **東 弘行**,
> プロダクト・マネージャー 日本経済新聞社

<div class="clearfix"></div>

### ソリューション

日経では心地よいユーザ体験を目標に、プログレッシブウェブアプリをレスポンシブ・デザインで、かつ、複数ページのアーキテクチャをバニラJavaScriptを用いて開発し、ローンチしました。
Service Workerを採用することで、ネットワークの状態に関わらず、予見しやすいパフォーマンスを提供し、キャッシュ・ストレージを利用することでトップ記事をどんな状況でも表示できるように、そして、ほぼ瞬時に読み込むこともできるようになりました。
ウェブアプリマニフェストを追加し、Service Workerを用いることで、PWAをインストールできるようにし、アクセスを容易にできるようにしています。
また、パフォーマンス全体きちんと管理できるようにサードパーティのJavaScriptの対応を含めた最適化を行いました。

### ベストプラクティス

- 最新のWeb API、圧縮方式、コード最適化の手法を使用して、読み込み速度と操作可能な状態になるまでの速度を向上。
- オフラインサポートやホーム画面に追加などのPWAの機能を追加することで、UXを段階的に改善。
- パフォーマンスバジェットをパフォーマンス戦略に組み込む。

## 技術面の詳解 {: #deep-dive }

### スピードは重要

スピードはこれまで以上に重要視されるべき指標です。スマートフォンが多くのユーザにとってウェブを閲覧するメインのデバイスとなるにつれ、日本経済新聞社が提供するサービスでもモバイルからのトラフィックが急激に増えてきていました。しかし、[Lighthouse](/web/tools/lighthouse/)を使った調査で従来のサイトでSpeed Indexが平均10秒であり、初期読み込みが非常に遅く、巨大なJavaScriptを読み込んでいるなど、モバイル向けに最適化されていない状況であることを認識しました。 
日経ではこれを機にウェブ・パフォーマンスにおけるベストプラクティスを適用しサイトをリニューアルすることにしました。以下に、新たに構築したPWA、<r.nikkei.com>における結果と、主要なパフォーマンス改善について紹介しましょう。

### Web APIとベストプラクティスを活用して読み込みを高速化する

#### 主要なリクエストのPreload

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-02.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-02.jpg">
</a>

[クリティカル・パスの読み込みを優先することは重要](/web/tools/lighthouse/audits/critical-request-chains)です。HTTP/2のサーバープッシュを利用し、ページを読み込むのに必要なJavaScriptとCSSの読み込みを優先させています。

<div class="clearfix"></div>

#### あらゆるオリジンからのコストの高い、複数のラウンド・トリップを避ける

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-03.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-03.jpg">
</a>

日経電子版では集計や広告などを様々なケースでサードパーティからのリソースを読み込む必要がありました。主要なサードパーティのオリジンからのDNS/TCP/SSLのハンドシェークやネゴシエーションを[`<link rel=preconnect>`](/web/fundamentals/performance/resource-prioritization#preconnect)を活用して事前に行っています。

<div class="clearfix"></div>

#### 次のページを動的にプリフェッチする

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-04.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-04.jpg">
</a>
<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-05.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-05.jpg">
</a>
<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-06.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-06.jpg">
</a>

ユーザーが特定のページへ遷移することを確実に予測できる場合、遷移をただ待つのではなく、[`<link rel=prefetch>`](/web/fundamentals/performance/resource-prioritization#prefetch)
を `<head>` に動的に追加をし、ユーザが実際にリンクをクリックする前に、次のページを取得しています。
こうすることで瞬時にページを表示できるようになります。

<div class="clearfix"></div>

#### クリティカス・パスにあるCSSをインライン化

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-07.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-07.jpg">
</a>

読み込み速度向上において、レンダリングの流れを止めるCSSを減らすことはベストプラクティスの1つです。このサイトではクリティカルなCSSをすべてインライン化し、[レンダリングの流れを止めるスタイルシート](/web/tools/lighthouse/audits/blocking-resources)へのリクエストを無くしました。
この最適化によってFirst Meaningful Paintまでの速度を1秒以上削減しています。

<div class="clearfix"></div>

#### JavaScriptバンドルの最適化

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-08.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-08.jpg">
</a>

従来のモバイル向けサイトではJavaScriptのバンドルサイズは300kbを超える巨大なものとなっていた。バニラのJavaScriptやルートベースのチャンク生成やツリーシェイキングなどの最新のバンドル最適化を用いることで、このバンドルサイズを削減しています。 RollUpを利用しJavaScriptバンドルのサイズを80％、60KBまで削減しています。

<div class="clearfix"></div>

#### その他のベストプラクティスの実装

- [圧縮方式](/web/tools/lighthouse/audits/text-compression): Fastly CDNを通じて、すべてのリソースをGzip/Brotliで圧縮
- [キャッシュ](/web/tools/lighthouse/audits/cache-policy): HTTPキャッシュやエッジ・サイドのキャッシの活用
- [画像の最適化](/web/tools/lighthouse/audits/unoptimized-images): [imgix](https://www.imgix.com/) を利用して、画像のファイルサイズ最適化と画像フォーマットの検出を実施
- [クリティカル・パス外のリソースの後読み](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/): Intersection Observer APIを利用し、初期画面以下の部分に関わるリソースを後読み
- [Webフォントの読み込み戦略](/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization):システムフォントの利用を最優先する
- [First Meaningful Paintの最適化](/web/tools/lighthouse/audits/first-contentful-paint):コンテンツをサーバーサイドでレンダリング
- [パフォーマンスバジェットを採用](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/) ：JavaScriptの送信と解析/コンパイル時間を抑え続ける

### サードパーティJavaScriptの最適化

自前のJavaScriptの最適化に比べて、サーとパーティから供給されるJavaScriptを最適化することは簡単ではありませんが、日経では広告に関連するJavaScriptをすべてミニファイ、バンドル化し、日経側のコンテンツデリバリーネットワーク(CDN)から配信するようにしました。
広告に関連するタグには大抵の場合、広告の表示などに必要となる他のJavaScriptを呼び出すスニペットが含まれており、ほとんどの場合にページのレンダリングの流れを止めてしまったり、必要なJavaScriptを呼び出すために複数のネットワーク処理が必要になってしまったりします。
日経では以下のアプローチを採用し、初期化にかかる時間を100ms改善し、JavaScriptファイルサイズを30％削減しました。

- 必要となるJavaScriptをすべてJavaScriptバンドラ(例: Webpack)を使ってバンドル化
- バンドル化したJavaScriptは非同期で呼び出し、ページのレンダリングの流れを止めないように
- 表示される広告を可能な限りShadow DOMに(対iframe)で処理する
- Intersection Observer APIを利用し、ユーザのスクロールに合わせて広告を読み込む

### ウェブサイトをプログレッシブエンハンスメントで構築

<video autoplay loop muted class="screenshot attempt-right">
  <source src="/web/showcase/2018/images/nikkei/nikkei-09.webm" type="video/webm"></source>
  <source src="/web/showcase/2018/images/nikkei/nikkei-09.mp4" type="video/mp4"></source>
</video>

これらの基本的な最適化に加えて、日経では[ウェブアプリマニフェスト](/web/fundamentals/web-app-manifest/)と[Service Worker](/web/fundamentals/primers/service-workers/)を活用してウェブサイトを[インストール可能にし](/web/fundamentals/app-install-banners/) 、オフラインでも使用できるようにしています。Service Worker[キャッシュ・ファースト](/web/fundamentals/instant-and-offline/offline-cookbook/)戦略を採用し、核となるリソースのすべてとトップ記事がキャッシュストレージに格納され、ネットワークが不安定な状況やオフラインの状況でも再利用され、一貫した最適なパフォーマンス維持することを可能にしています。

<div class="clearfix"></div>

### 日経をハックせよ

140年以上の歴史を持つ伝統的な新聞社は、ウェブとPWAの力でデジタル化を加速しました。日経のエンジニアは、優れたUXが高いビジネスパフォーマンスを発揮することを証明しました。同社はウェブに新しいレベルの品質をもたらすための旅をこれからも続けていきます。

## 参考資料:

<ul class="attempt-left">
  <li>
    <a href="https://hack.nikkei.com/blog/nikkei-featured-at-google-io/">
      Google I/Oで日経電子版が事例として紹介された話
    </a>
  </li>
  <li>
    <a href="https://hack.nikkei.com/blog/tech_book_fest04_ds_ad_tech/">
      日経電子版を支える広告技術
    </a>
  </li>
</ul>
<div class="video-wrapper attempt-right">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Mv-l3-tJgGk" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
