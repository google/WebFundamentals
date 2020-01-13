project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:モバイル端末とネットワークの普及のおかげで、かつてないほど大勢の人々がウェブを利用しています。 このユーザーベースが拡大するにつれて、これまで以上にパフォーマンスが重要となっています。 この記事では、パフォーマンスが重要なのはなぜか、またすべてのユーザーがより高速なウェブを利用できるようにするためにデベロッパーとして何ができるかについて考察します。

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-03-08 #}
{# wf_blink_components: N/A #}

# パフォーマンスが重要なのはなぜか {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

ウェブでできることが増えていくにつれて、誰もがパフォーマンスという同じ問題に直面するようになっています。
 ウェブサイトで実行できる機能はかつてないほどに多くなりました。
 そのため多くのサイトでは、さまざまなネットワーク条件や端末に対して、高いレベルのパフォーマンスを実現することに苦慮しています。


パフォーマンスの問題は多岐にわたります。 条件が非常に良ければ、わずかな遅延が発生するのみで、ユーザーへの影響も小さくて済みます。
 しかし最悪の場合には、サイトに完全にアクセスできなくなったり、ユーザー入力に反応しなくなったり、あるいはその両方になることもあります。


## ユーザーを引きつけておくために必要とされるパフォーマンス

ユーザーには自分が作成したものを有意義に利用してほしいと思うものです。 それがブログであれば、投稿を読んでもらいたいと思います。
 オンラインストアであれば、商品を購入してもらいたいと思います。
 ソーシャル ネットワークであれば、ユーザー同士が対話してほしいと思います。


パフォーマンスがオンライン ベンチャーの成功に及ぼす影響は非常に大きくなっています。 パフォーマンスの低いサイトと比較してパフォーマンスの高いサイトがどのようにユーザーの注意を引き、ユーザーを引きつけておくことができるかを示すいくつかの事例があります。



- Pinterest では、ユーザーが体感している待ち時間を 40% 削減した結果、[検索エンジンのトラフィックとサインアップ数が 15% 増加しました][pinterest]。
- COOK では平均ページ読み込み時間を 850 ミリ秒短縮したところ、[コンバージョン数が 7% 増加し、直帰率が 7% 減少し、セッション当たりの閲覧ページ数が 10% 増加しました][COOK]。



[pinterest]: https://medium.com/@Pinterest_Engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7
[COOK]: https://www.nccgroup.trust/uk/about-us/resources/cook-real-user-monitoring-case-study/?style=Website+Performance&resources=Case+Studies

パフォーマンスが悪かったことが原因で、ビジネス目標に悪い影響が及んだいくつかの事例があります。


- 自社サイトの読み込みにかかる時間が 1 秒増えるごとに [BBC はユーザーが 10% ずつ減少することを発見][BBC]しました。
- ページの読み込みにかかる時間が 3 秒を超えると、[DoubleClick by Google は 53% のユーザーがモバイルサイトの訪問をあきらめることを発見][DoubleClick]しました。


[BBC]: https://www.creativebloq.com/features/how-the-bbc-builds-websites-that-scale
[DoubleClick]: https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/

上記の引用元の DoubleClick by Google の研究では、5 秒以内に読み込めるサイトは読み込みにその 4 倍近い 19 秒かかるサイトに比べて、セッション時間が 70％ 長く、直帰率は 35％ 低く、広告視認度が 25% 高いことが判明しました。
 自社サイトのパフォーマンスを競合他社と比較する方法の概要については、[Speed Scorecard ツールをご覧ください](https://www.thinkwithgoogle.com/feature/mobile/)。



<figure>
  <img srcset="images/speed-scorecard-2x.png 2x, images/speed-scorecard-1x.png 1x"
src="images/speed-scorecard-1x.png" alt="人気のある 4 つのニュース報道サイトのパフォーマンスを比較した Speed Scorecard ツールのスクリーンショット。">

  <figcaption><b>図 1</b>。 Speed Scorecard で、米国の 4G ネットワーク ユーザーから送信される Chrome UX レポートのデータを使用して、競合する 4 つのサイトのパフォーマンスを比較。</figcaption>


</figure>

## コンバージョン数を増やすために必要とされるパフォーマンス

ユーザーを引きつけておくことは、コンバージョン数を増やすために欠かせません。 サイトの読み込み速度が遅いと収益に悪い影響が及び、その逆もまた成り立ちます。
 ビジネスの収益性を上げる（または下げる）上でパフォーマンスがどのような役割を果たしているかを示すいくつかの例があります。



- Mobify の場合、[ホームページの読み込み速度が 100 ミリ秒速くなるごとに、セッションベースのコンバージョン数が **1.11% 増加**し、結果として年平均で**約 4,200 万円**の増収となりました](http://resources.mobify.com/2016-Q2-mobile-insights-benchmark-report.html)。
また、注文会計のページの読み込み速度を100 ミリ秒速くしたところ、セッションベースのコンバージョンが **1.55% 増加**し、結果として年平均で**約 5,830 万円**の増収となりました。
- DoubleClick によれば、[読み込み時間が 5 秒以内であるサイトの発行者は、読み込みに 19 秒かかるサイトに比べて **2 倍もの広告収入**を上げている](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/)ことが分かっています。
- [AutoAnything はページの読み込み時間を半分に短縮したところ、**売上が 12-13% 増加する**結果となりました](https://www.digitalcommerce360.com/2010/08/19/web-accelerator-revs-conversion-and-sales-autoanything/)。



ウェブを使ったビジネスを経営する場合は、パフォーマンスが非常に重要です。 すばやく操作することができ、ユーザーの入力への応答性に優れているサイトであるなら、それだけでも十分にメリットがあります。
 パフォーマンスがどのように収益に影響を与え得るかについては、[Impact Calculator](https://www.thinkwithgoogle.com/feature/mobile/) ツールでご確認ください。



<figure>
  <img srcset="images/impact-calculator-2x.png 2x, images/impact-calculator-1x.png
1x" src="images/impact-calculator-1x.png" alt="Impact Calculator のスクリーンショット。パフォーマンスが改善された場合に、サイトがどれだけ収益を上げることができるかを予測するツール。">


  <figcaption><b>図 2</b>。 Impact Calculator を使用することで、サイトのパフォーマンスを向上させることによって得られる収益を見積もることができます。</figcaption>

</figure>

## ユーザー エクスペリエンスのために必要とされるパフォーマンス

ある URL にアクセスしようとするとき、そのために取ることのできる方法はいくつもあります。
 接続品質や使用する端末など、いくつもの条件によって、ユーザー エクスペリエンスはまったく異なるものとなり得ます。



<figure>
  <img src="images/speed-comparison.png" alt="あるページ読み込みの 2 枚のフィルムストリップ リールの比較。
 最初のリールは低速接続でページ読み込みを示しており、2 番目のリールは同じページを高速接続で読み込んだ場合を示している。">

  <figcaption><b>図 3</b>。 非常に低速な接続（上）と高速接続（下）でページを読み込んだ場合の比較。</figcaption>

</figure>

サイトの読み込みを開始すると、コンテンツが表示されるまでユーザーが待機する時間があります。
 コンテンツが表示されないうちは、ユーザー エクスペリエンスというものはありません。 ユーザー エクスペリエンスがないこの状態は、高速接続ではほんの一瞬です。
 しかし、低速接続では、ユーザーは待つことを余儀なくされます。
 ページ リソースのダウンロードが少しずつしか行われず非常にゆっくりとしている場合はなおのこと、ユーザーの利用に支障が出ることもあります。


パフォーマンスは心地よいユーザー エクスペリエンスの土台をなすものです。
 サイトから送信されるコードが多いと、ブラウザはそのコードをダウンロードするために、ユーザーのデータプランのデータ容量を何メガバイトも消費します。
 モバイル端末の CPU パワーやメモリは限られています。
 サイズが小さくても最適化されていないコードが送られてくると、こうした端末ではコードの処理が手に負えなくなることもよくあります。
 そのため、パフォーマンスが低下して端末は反応しなくなってしまいます。
 また人の常として、ユーザーはパフォーマンスの悪いアプリケーションの処理を待ちきれずに、途中であきらめてしまうのです。
自分のサイトのパフォーマンスを評価する方法について詳しく知り、パフォーマンスを向上するために何かしたいと思っておられるなら、[_How to Think About Speed Tools_](/web/fundamentals/performance/speed-tools/) をご覧ください。



<figure>
  <img srcset="images/lighthouse-2x.png 2x, images/lighthouse-1x.png 1x"
src="images/lighthouse-1x.png" alt="Lighthouse で表示されるページ パフォーマンスの概要">

  <figcaption><b>図 4</b>。 <a
href="/web/tools/lighthouse/">Lighthouse</a> で表示されるページ パフォーマンスの概要</figcaption>
</figure>

## ユーザーのために必要とされるパフォーマンス

パフォーマンスの悪いサイトやアプリケーションは、その利用者に実際に費用をかけさることにもなりかねません。


[モバイル ユーザーが世界中のインターネット利用者の大半を占めるようになるにつれて](http://gs.statcounter.com/platform-market-share/desktop-mobile-tablet)、そのユーザーの多くがモバイル LTE、4G、3G、さらには 2G のネットワークからウェブにアクセスするということを念頭におくことは重要です。
 Calibre の作者である Ben Schwarz が [現実世界におけるパフォーマンスの研究](https://building.calibreapp.com/beyond-the-bubble-real-world-performance-9c991dcd5342)で指摘しているように、プリペイド データプランの利用料金が安価になってきたことによって、かつてはインターネットに手が届かなかった地域でインターネットへのアクセスがより手頃に利用できるようになっています。
 モバイル端末とインターネット アクセスはもはや贅沢品ではないのです。
これらは、ますます相互に接続されていく世界を行き巡り行動するために必要なありふれたツールです。


[総ページサイズは少なくとも 2011 年以来着実に増加しており](http://beta.httparchive.org/reports/state-of-the-web#bytesTotal)、引き続きその傾向が見られます。
 標準的なページから送信されるデータが増えるにつれて、ユーザーは従量制のデータプランをより頻繁に補充しなければならなくなり、それには費用がかかります。


ユーザーがお金を節約できるようにすることに加えて、高速で軽量なユーザー エクスペリエンスを提供することは、危機的な状況にあるユーザーのためにも非常に重要です。
 病院、クリニック、および電話緊急相談センターなどの公的機関には、危機的な状態にある人に対して、その人が必要とする重要かつ具体的な情報を提供するオンライン リソースがあります。
 [ストレスを伴う状況で重要な情報を効果的に提供するためにデザインは非常に重要ですが](https://aneventapart.com/news/post/eric-meyer-designing-for-crisis)、その情報を高速に提供することの重要性を過小評価することはできません。



それをわたしたちがするのです。

## どうすればよいか

下に挙げられている事柄を見るとできそうにないと感じてしまうかもしれませんが、サイトのパフォーマンスを改善するためにこれらのことを_すべて_実行する必要はありません。
 ここはあくまでスタート地点なので、圧倒されないでください。パフォーマンスを改善するためにあなたがすることは_すべて_ユーザーのためになります。


### 送信するリソースに気を配る

高性能なアプリケーションを構築する効果的な方法は、[ユーザーに_どんな_リソースを送信するかをチェックすること](/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads)です。
[Chrome DevTools の[ネットワーク] パネル](/web/tools/chrome-devtools/network-performance/)には特定のページで使用されるすべてのリソースがみごとに要約されていますが、これまでパフォーマンスのことなど考えてこなかった人にしてみれば、いったいどこから始めればよいのかと戸惑ってしまうかもしれません。
 そのためのいくつかの提案があります。


- UI のビルドに Bootstrap や Foundation を使用している場合は、それらが必要か自問してください。
 これらの抽象化を使用すると、サイト固有の CSS を描画する前に、ブラウザがダウンロードし解析してページに適用しなければならない CSS のヒープが増えてしまいます。
[Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout) と [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) は、比較的少ないコードで単純なレイアウトと複雑なレイアウトの両方を作成する点で優れています。
[CSS はレンダリング ブロック リソースなので](/web/fundamentals/performance/critical-rendering-path/render-blocking-css)、CSS フレームワークのオーバーヘッドはレンダリングをかなり遅くする可能性があります。
 できるだけ不要なオーバーヘッドを除去することで、レンダリングを高速化できます。
- JavaScript ライブラリは便利ですが、必ずしも必要ではありません。 例として jQuery を考えてみましょう。
[`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) や [`querySelectorAll`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) などのメソッドのおかげで、要素選択は大幅に簡略化されました。
[`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) を使用することで、イベント バインディングも簡単に行えます。
[`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList)、[`setAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute)、および [`getAttribute`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) によって、クラスと要素属性の処理が簡単になりました。
 ライブラリを使用する必要がある場合は、サイズの小さい代わりになるものを探しましょう。
 例えば、[Zepto](http://zeptojs.com/) を jQuery の代わりに、[Preact](https://preactjs.com/) を React の代わりに使用することができ、そうしたほうがそれぞれサイズは小さくなります。
- JavaScript を多用しているサイトも多いため、すべてのウェブサイトをシングル ページ アプリケーション（SPA）にする必要はありません。
 JavaScript は、ダウンロードするだけでなく、構文解析し、コンパイルし、実行する必要があるため、[サイズに応じて考えると、ウェブで提供するリソースとしては JavaScript が最も費用がかかります](https://medium.com/dev-channel/the-cost-of-javascript-84009f51e99e)。
 例えば、フロント エンド アーキテクチャが最適化されているニュースサイトやブログサイトは、従来のマルチページ エクスペリエンスのようによくスムーズに機能します。
 [HTTP キャッシング](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)が適正に設定されていたり、[サービス ワーカー](/web/fundamentals/primers/service-workers/)を使用している場合は特にそう言えます。




### リソースを送信する方法に気を配る

効率的な配信は、高速なユーザー エクスペリエンスを達成するために不可欠です。

- [HTTP/2 に移行します](/web/fundamentals/performance/http2/)。 HTTP/2 では、同時要求数の制限やヘッダー圧縮がないといった HTTP/1.1 につきもののパフォーマンス上の多くの問題が解消されています。
- [リソースのヒントを使用して、先にリソースをダウンロードするようにします](/web/fundamentals/performance/resource-prioritization)。
 `rel=preload` はそのようなリソースのヒントで、ブラウザがリソースの必要を認識する前に、重要なリソースを事前にフェッチしておくことができます。
 この方法は、賢く利用すると、ページ レンダリングや[操作可能になるまでの時間](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf#0106)の短縮に[顕著なプラスの効果があります](/web/tools/lighthouse/audits/time-to-interactive)。
 [`rel=preconnect` は、もう 1 つのリソースのヒントで、サードパーティ ドメインでホストされているリソースのための新しい接続を開くための待ち時間をマスクすることができます](https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/)。
- 最近のほとんどのサイトは[_たくさん_の JavaScript](http://httparchive.org/trends.php#bytesJS&reqJS) [と CSS](http://httparchive.org/trends.php#bytesCSS&reqCSS) を送信します。
 HTTP/1 環境では、スタイルやスクリプトをまとめて大きなバンドルにするのが一般的でした。
それは、大量のリクエストをやりとりすることがパフォーマンスの低下につながっていたからです。
しかし、今や HTTP/2 が登場して、複数の同時リクエストを安価にやりとりできるようになると、こうしたことはもはや問題ではなくなりました。
 [webpack でのコード分割の使用を考慮して](https://webpack.js.org/guides/code-splitting/)、ダウンロードされるスクリプトの量を現在のページやビューで必要とされる分だけに制限します。
 CSS を小さなテンプレートまたはコンポーネント固有のファイルに分割して、使用する可能性があるリソースだけを含めます。



### 送信するデータの量に気を配る

　送信するデータの_量_を制限するためのいくつかの提案があります。

- [テキスト資産を縮小する](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#minification_preprocessing_context-specific_optimizations)。
縮小するとは、テキストベースのリソースに含まれる不要なホワイトスペースやコメントや他のコンテンツを除去することを意味します。
 そうすることで、機能性に影響を与えることなく、ユーザーに送信するデータ量を大幅に削減することができます。
 [JavaScript で uglify 化を使って](https://www.npmjs.com/package/uglifyjs)、変数名やメソッド名を短くしてさらにデータ量を節約します。
 SVG はテキストベースの画像フォーマットなので、[SVGO を使って最適化することができます](https://github.com/svg/svgo)。
- [リソースを圧縮するようにサーバーを構成します](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer)。
圧縮すると、ユーザーに送信するデータ量、_特に_テキスト資産を大幅に削減することができます。
 GZIP 
が一般によく使われていますが、[Brotli 圧縮のほうがさらに高機能です](https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/)。
しかし、圧縮がパフォーマンスを向上させる万能薬では_ない_ことに注意してください。
暗黙的に圧縮されているいくつかのファイル フォーマット（JPEG、PNG、GIF、WOFF など）は、既に圧縮済みなので圧縮しても効果はありません。
- [画像を最適化して](/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/)、サイトから送信される画像データのサイズをできるだけ小さくします。
 [ウェブの平均的なページ当たりのペイロードの大部分を画像が占めるため](http://httparchive.org/trends.php#bytesImg&reqImg)、画像の最適化はパフォーマンスを飛躍的に改善するうってつけの方法です。
- 時間があれば、別の画像フォーマットを使用することを検討します。
[WebP](/speed/webp/) はかなり[広範にブラウザをサポート](https://caniuse.com/#feat=webp)しており、JPEG や PNG よりも少ないデータで高い表示品質を維持しています。
 [JPEG XR はまた別の代替フォーマット](https://jpeg.org/jpegxr/index.html)で、IE と Edge でサポートされていて、同じくらいデータを節約できます。
- [画像をレスポンシブに配信します](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)。
端末とその画面は多岐にわたるため、表示する画面に最適な画像を送信することにより、パフォーマンスを改善できる非常に大きな余地があります。
 一番単純な事例では、`<img>` 要素に [`srcset` 属性](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset)を追加して複数の画像を指定し、その中からブラウザが表示する画像を選択するようにできます。
複雑なケースでは、`<picture>` を使用して、ブラウザが最適なフォーマット（WebP over JPEG や PNG など）を選択できるようにしたり、画面サイズによってまったく異なる画像処理が行われるようにしたりすることができます。
- [アニメーション GIF ではなくビデオを使用します](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/)。
アニメーション GIF は_データサイズの大きいファイル_です。 それに比べて同等品質のビデオはデータサイズが_かなり_小さく、ほとんどの場合 80％ 程度小さくなります。
 サイトがアニメーション GIF を多用しているのであれば、読み込みパフォーマンスの向上にはこの方法が最も効果があります。
- [クライアント ヒント](http://httpwg.org/http-extensions/client-hints.html)は、現在のネットワーク条件と端末特性に基づいてリソースの配信を調整するのに役立ちます。
 `DPR`、`Width` および `Viewport-Width` といったヘッダーは、[サーバーサイド コードを使用して端末に最適な画像を配信し、_かつ_ 送信するマークアップを少なくする](/web/updates/2015/09/automating-resource-selection-with-client-hints)のに役立ちます。
`Save-Data` ヘッダーは、[特に動作が軽いアプリケーションが配信されることを希望するユーザーの要望に応える](/web/updates/2016/02/save-data)のに役立ちます。
- [`NetworkInformation` API](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation) は、ユーザーのネットワーク接続に関する情報を提供します。
 この情報を使用して、低速ネットワークを利用するユーザーのアプリケーション体験を調整することができます。

パフォーマンスの向上に関する総合的なガイドについては、読み込み時間とアプリケーションの応答性の両方を向上させることに焦点を当てた [RAIL パフォーマンス モデル](/web/fundamentals/performance/rail)に関する記事を参照してください。
 [Google による PRPL パターン ガイド](/web/fundamentals/performance/prpl-pattern/)も、最新のシングル ページ アプリケーションのパフォーマンスを向上させるのに役立つ優れた記事です。




パフォーマンスとサイトの高速化についてさらに詳しくは、Google のパフォーマンスに関する資料から、さまざまなトピックのガイド情報をご覧ください。
 Google では定期的に新しいガイドの追加と既存のガイドの更新を行っていますので、定期的に情報を確認することをお勧めします。


_本資料の推敲と発行のために貴重な意見を寄せてくれた [Addy Osmani](/web/resources/contributors/addyosmani)、[Jeff Posnick](/web/resources/contributors/jeffposnick)、[Matt Gaunt](/web/resources/contributors/mattgaunt)、[Philip Walton](/web/resources/contributors/philipwalton)、[Vinamrata Singal](/web/resources/contributors/vinamratasingal)、[Daniel An](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/)、[Pete LePage](/web/resources/contributors/petelepage) の各氏に深く感謝いたします。_








## フィードバック {: #feedback }

{% include "web/_shared/helpful.html" %}
