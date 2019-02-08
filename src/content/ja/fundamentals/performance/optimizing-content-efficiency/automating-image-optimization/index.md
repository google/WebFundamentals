project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:画像形式!

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# 画像の最適化を自動化する {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**画像圧縮はすべて自動化されるべき。**

2017 年は、画像最適化の自動化が行われるべきです。 忘れることは簡単で、ベストプラクティスは変化していき、ビルド パイプラインを通らないコンテンツは簡単に滑り落ちていってしまいます。
 自動化するには、ビルドプロセスに [imagemin](https://github.com/imagemin/imagemin)
や [libvps](https://github.com/jcupitt/libvips) を使用します。 代替手段も多く存在します。

ほとんどの CDN（[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp)
など）や [Cloudinary](https://cloudinary.com)、[imgix](https://imgix.com)、[Fastly の Image Optimizer](https://www.fastly.com/io/)、[Instart Logic の SmartVision](https://www.instartlogic.com/technology/machine-learning/smartvision)、[ImageOptim API](https://imageoptim.com/api) などのサードパーティ ソリューションには、総合的な自動化された画像最適化ソリューションが含まれています。

ブログ投稿を読んだり構成をいじったりするのに費やす時間は、サービスの月額料金より高くつきます（Cloudinary には[無料版](http://cloudinary.com/pricing)があります）。

 コストや遅延を心配してこの作業をアウトソーシングしたくないと思うなら、上記のオープンソースのオプションが有効です。
[Imageflow](https://github.com/imazen/imageflow) や [Thumbor](https://github.com/thumbor/thumbor) などのプロジェクトでは、セルフホストの代替手段が可能です。

**皆が効率的に画像圧縮するべき。**

最低でも、[ImageOptim](https://imageoptim.com/) を使用しましょう。 それにより、視覚的品質を維持したまま画像サイズが大幅に減ります。
 Windows と Linux の[代替手段](https://imageoptim.com/versions.html)もあります。

さらに具体的に言うと、JPEG を [MozJPEG](https://github.com/mozilla/mozjpeg)（ウェブ コンテンツでは `q=80` 以下が適当）で処理してください。さらに [Progressive JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) のサポート、PNG については [pngquant](https://pngquant.org/)、SVG については [SVGO](https://github.com/svg/svgo) を考慮してください。
 膨れ上がることがないよう、メタデータ（pngquant では `--strip`）を明示的に削除してください。
 アニメーション GIF はやたらと大きくなるので、その代わりに [H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) 動画で配信します（または Chrome、Firefox、Opera には [WebM](https://www.webmproject.org/)）。
それができない場合、少なくとも [Giflossy](https://github.com/pornel/giflossy) を使用してください。
 平均以上のウェブ品質が必要で、余分の CPU サイクルを消費してエンコード時間が長くなってもよいのであれば、[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html) を試してみてください。

Accept リクエスト ヘッダーで画像形式に対応しているブラウザも一部あります。
これは、条件に応じて形式を配信するために使用できます。たとえば、Chrome のような Blink ベースのブラウザでは不可逆 [WebP](/speed/webp/) を配信し、その他のブラウザでは JPEG/PNG などにフォールバックします。

今よりできることは必ずあるはずです。 `srcset`
ブレークポイントを生成し、処理するツールがあります。 Blink ベースのブラウザでは、[client-hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
によりリソース選択を自動化できます。また、ブラウザ内の「データサイズ削減」を好むユーザーに対しては、[Save-Data](/web/updates/2016/02/save-data) のヒントを当てはめることにより、配信バイト数を削減することができます。

画像のファイルサイズが小さいほど、ユーザー、特にモバイル ユーザーにとってネットワーク エクスペリエンスがよくなります。
 ここでは、品質への影響が最小限で済む最新の圧縮技術を使った画像サイズ削減方法をご紹介します。

## はじめに {: #introduction }

**画像は、引き続きウェブの混雑の第 1 原因である。**

画像は、ファイルサイズが大きくなることが多いため、インターネット帯域幅の大部分を占めています。
 [HTTP Archive](http://httparchive.org/) によれば、ウェブページ読み込みのために転送されるデータの 60% は、JPEG、PNG、GIF の画像です。
 2017 年 7 月の時点で、平均的なサイトで読み込まれる 3.0 MB のコンテンツのうち [1.7 MB](http://httparchive.org/interesting.php#bytesperpage) が画像です。

Tammy Everts 氏によると、一方で、画像をページに追加したり、既存の画像を大きくしたりすることで、コンバージョン率が上がることが[証明](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)されています。
 今後画像が使われなくなるとはないでしょう。それで、データ量抑制のための効率的な圧縮戦略に投資することがますます重要になっています。

<img src="images/Modern-Image00.jpg" alt="ページ当たりの画像数が少ない方がコンバージョン率が上がる。
 1 ページの平均画像数が 19 の方が 1 ページ平均 31 よりもコンバージョン率が良い。" />

2016 の [Soasta/Google 調査](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)によれば、画像はコンバージョン予測で 2 番目に強力な要素です。画像数が 38% 少ないページが一番高いコンバージョン率でした。

画像の最適化は、画像のファイルサイズを減らすさまざまな手段から成っています。
 その手段は、最終的には求められる画像の品質によって変わります。

<img src="images/image-optimisation.jpg" alt="画像の最適化は、数多くのさまざまな技術で構成されます" />
<strong>画像の最適化:</strong>適切な形式と圧縮方式を注意深く選択し、読み込みを遅らせることが可能な他の要素よりも速く読み込まれるよう、重要な画像の優先度を高くします。

一般的な画像の最適化には圧縮が含まれます。それは、[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images)を使用することにより画面サイズに基づいて適切な処理し、サイズ変更することによって画像デコードのコストを削減します。

<img src="images/chart_naedwl.jpg" alt="HTTP Archive による潜在的な画像削減のグラフ、95% のケースで 30 KB の画像サイズ削減。
" /> [HTTP
Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/) によれば、95% のケース（累積分布関数による）で画像 1 個あたりサイズ削減が 30 KB になります!</strong>

全体としての画像最適化にはまだ改善の余地が大いにあります。

<img src="images/image-optim.jpg" alt="Mac で ImageOptim を使用することにより、多くの画像を圧縮して 50% を超えるサイズ削減を達成" />

ImageOptim は、最新の圧縮技術を利用し、不要な EXIF メタデータを除去することにより画像サイズを削減するフリーソフトです。

デザイナの方であれば、エクスポート時にアセットを最適化する [Sketch 用 ImageOptim プラグイン](https://github.com/ImageOptim/Sketch-plugin)があります。
 これは大いに時短になります。

### 画像の最適化が必要かどうかはどうすれば分かるか? {: #do-my-images-need-optimization }

[WebPageTest.org](https://www.webpagetest.org/) でサイトを診断してみてください。画像をさらに最適化できる可能性がハイライト表示されます（[Compress Images] を見る）。

<img src="images/Modern-Image1.jpg" alt="WebPage テストの [Compress Images] セクションで画像圧縮の診断をサポート" />

WebPageTest レポートの [Compress Images] セクションには、圧縮率を上げることのできる画像と、圧縮率を上げた場合の推定ファイルサイズのリストが示されます。

<img src="images/Modern-Image2.jpg" alt="webpagetest による画像の圧縮の推奨事項" />

[Lighthouse](/web/tools/lighthouse/) はパフォーマンス ベスト プラクティスを診断します。 これには、画像最適化の診断が含まれており、圧縮率を上げることのでる画像や、画面に表示されないため読み込みを遅らせることのできる画像を提案することができます。

Chrome 60 の場合、Chrome DevTools の [Audits パネル](/web/updates/2017/05/devtools-release-notes#lighthouse)は Lighthouse により機能強化されています:

<img src="images/hbo.jpg" alt="HBO.com の Lighthouse 診断結果、画像最適化の推奨事項が表示されている" /> Lighthouse では、ウェブ パフォーマンス、ベスト プラクティス、プログレッシブ ウェブアプリのさまざまな機能について診断することができます。

また、[PageSpeed Insights](/speed/pagespeed/insights/) や、詳細な画像解析診断機能のある Cloudinary の [Website Speed Test](https://webspeedtest.cloudinary.com/) など、他のパフォーマンス診断ツールもご存知かもしれません。

## <a id="choosing-an-image-format" href="#choosing-an-image-format">画像形式はどのように選ぶか?</a>

Ilya Grigorik 氏が書いた[画像最適化ガイド](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)で述べられているように、画像の「適切な形式」は、求められている視覚的結果と機能的な要件とを組み合わせて考えます。
 ラスター画像やベンター画像で作業していますか?

<img src="images/rastervvector.png" alt="ベクター画像とラスター画像"
         />

[ラスター グラフィック](https://en.wikipedia.org/wiki/Raster_graphics)では、長方形のグリッドに含まれた各ピクセルの値を個々にエンコードすることで画像を表します。
これは解像度やズームに依存します。 WebP や一般的にサポートされている他の形式（JPEG や PNG など）では、写真としての現実感が必要な場合にラスター グラフィックが適切に処理されます。
前に触れた Guetzli、MozJPEG などは、ラスター グラフィックに該当します。

[ベクター グラフィック](https://en.wikipedia.org/wiki/Vector_graphics)では、点、線、多角形といった単純な幾何図形を使用して画像や形式が表現され（ロゴなど）、高解像度やズームが可能です。このようなユースケースでは SVG 形式が有用です。

形式の選択を誤ると、コストが増大することがあります。 適切な形式を選択するための論理フローでは注意を要する点がたくさんあり、他の形式で可能なサイズ削減との比較実験を注意深く実行するようにしてください。

Jeremy Wagner 氏は、画像の最適化に関する話の中で、さまざまな形式を評価する際に考慮する価値のあるさまざまな[利点と不利点](http://jlwagner.net/talks/these-images/#/2/2)について述べています。

## 単純な JPEG {: #the-humble-jpeg }

[JPEG](https://en.wikipedia.org/wiki/JPEG) は、世界で最も広く使用されている画像形式と言っていいでしょう。
 前述のように、HTTP
Archive がクロールしたサイトで表示される[画像の 45%](http://httparchive.org/interesting.php) は JPEG です。
 スマートフォン、デジタル SLR、今では過去のものとなったウェブカメラなど、実にあらゆるところでこのコーデックがサポートされています。
 その最初のリリースは 1992 年の昔にまでさかのぼります。
 その時点で、機能改善を目指したさまざまな調査が実施されました。

JPEG は、スペース節約のために情報を破棄する不可逆圧縮アルゴリズムであり、それ以来、ファイルサイズを可能な限り小さくしたまま、視覚的な忠実性を維持するために多くの努力が注がれてきました。

**あなたのユースケースではどの画質が許容範囲か?**

JPEG のような形式は、複数のカラー領域を含む写真や画像に適しています。
 ほとんどの最適化ツールでは、好みの圧縮レベルを設定することができます。圧縮率が高いとファイルのサイズは小さくなりますが、アーティファクト、光輪状のノイズ、また濃淡むらといった品質低下を招くことがあります。

<img src="images/Modern-Image5.jpg" alt="JPEG 圧縮で品質を最高から最低にした場合、アーティファクトが顕著になることがある" />

JPEG:JPEG 圧縮で品質を最高から最低にした場合、アーティファクトが顕著になることがあります。
 画像品質スコアは、ツールによって大きく異なる場合があることに注意してください。

どんな品質設定にするかを選ぶ際には、画像が以下のどの品質分類になるかを考慮してください。

*   **最高品質** - 帯域幅よりも品質が重要な場合。 これは、デザインの中でその画像が特に目立つものである場合や、フル解像度で表示される場合などです。
*   **高品質** - 配信するファイルサイズはなるべく小さくしたいが、画像品質が大きく下がっては困る場合。
 ユーザーが画像の品質をある程度気にする場合。
*   **低品質** - 帯域幅が重要で、画像の品質が下がってもかまわないという場合。
 これらの画像は、ネットワークの状態にむらがあったり貧弱であったりする場合に適しています。
*   **最低品質** - 帯域幅の節約が最重要事項である場合。 ユーザーにとっては、動作がきびきびとしていることが望ましく、品質がかなり低下するとしても、ページの読み込みが速いというメリットのほうが重要な場合。

次に、JPEG のさまざまな圧縮モードについて考慮しましょう。これは、ユーザーが感じるパフォーマンスに大きな影響を及ぼします。

注: ユーザーが必要とするよりも高い画像品質が必要だと考えてしまうことがあります。
 画像品質が、圧縮されていない理想的な状態のソースから逸脱していると見なしてしまいがちです。
 主観的な評価にもなりがちです。

## JPEG 圧縮モード {: #jpeg-compression-modes }

JPEG 画像形式には、多くの異なる[圧縮モード](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf)があります。
 よく使用される 3 つのモードは、ベースライン（順次）、プログレッシブ JPEG（PJPEG）、および可逆です。

**ベースライン（順次）JPEG とプログレッシブ JPEG はどう違うか?**

ベースライン JPEG（画像の編集ツールや最適化ツールのほとんどで既定値）では、上部から下部へと向かう比較的シンプルな方法でエンコードとデコードが実行されます。
 低速接続や不安定な接続でベースライン JPEG が読み込まれる場合、ユーザーにはまず画像の上部が表示され、読み込みが進むにつれて残りの部分が見えてきます。
 可逆 JPEG もそれに似ていますが、圧縮率は小さくなります。

<img src="images/Modern-Image6.jpg" alt="ベースライン JPEG は上部から下部に向かって読み込まれる" />
        ベースライン JPEG は上部から下部に向かって読み込まれるのに対し、プログレッシブ JPEG の読み込みでは、ぼやけた状態からシャープな状態へと進みます。

プログレッシブ JPEG では、画像をスキャンの数に分割します。 最初のスキャンで画像がぼやけた状態または低品質な設定で表示された後、後続のスキャンで画像品質が向上していきます。
 「プログレッシブに」（漸進的に）鮮明になっていく、というようにお考えください。 画像を「スキャン」するごとに、詳細レベルが上がっていきます。
 組み合わさってフル品質の画像が作成されます。

<img src="images/Modern-Image7.jpg" alt="プログレッシブ JPEG を読み込むと低解像度から高解像度へと移っていきます" /> </picture> ベースライン JPEG を読み込むと上部から下部へ向かって画像が読み込まれていきます。
 PJPEG を読み込むと、低解像度（ぼやけた状態）から高解像度へと進みます。
 Pat Meenan 氏は、プログレッロシブ JPEG スキャンについてもテストしたり学習したりするための[インタラクティブなツール](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)を作成しました。

可逆 JPEG 最適化は、デジタルカメラやエディタによって追加された [EXIF データを削除](http://www.verexif.com/en/)し、画像の[ハフマン表](https://en.wikipedia.org/wiki/Huffman_coding)を最適化するか、または画像を再スキャンすることによって達成することができます。
[jpegtran](http://jpegclub.org/jpegtran/) などのツールでは、画像を低下させることなく圧縮データを再編成することにより、可逆圧縮が実現されます。
[jpegrescan](https://github.com/kud/jpegrescan)、[jpegoptim](https://github.com/tjko/jpegoptim)、および [mozjpeg](https://github.com/mozilla/mozjpeg)（後述）でも、可逆 JPEG 圧縮がサポートされています。

### プログレッシブ JPEG のメリット {: #the-advantages-of-progressive-jpegs }

PJPEG では読み込み時に画像の低解像度「プレビュー」を提供することが可能であり、それにより認識パフォーマンスが高くなります。ユーザーにとっては、アダプティブな画像に比べて画像の読み込みが速いと感じられます。

低速の 3G 接続では、ユーザーは、ファイルの一部のみ受信した時点で画像の内容を大雑把に把握することができ、全体が読み込まれるのを待機するかどうかを判断できます。
 これは、ベースライン JPEG で上から下へ表示される場合よりも快適な表示になります。

<img src="images/pjpeg-graph.png" alt="プログレッシブ jpeg への切り替えが待ち時間に与えた影響" /> 2015 年に [Facebook が（その iOS アプリで） PJPEG に切り替えた](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)結果、データ使用量が
10% 削減されました。
 以前に比べて 15% 高速に、高品質の画像を表示することができ、上記の図のように、認識されるまでの読み込み時間が最適化されました。

PJPEG では圧縮が改善され、10 KB を超える画像では、ベースライン/シンプル JPEG に比べて消費帯域幅が [2～10%](http://www.bookofspeed.com/chapter5.html) 少なくなります。
 高い圧縮率は、JPEG でのスキャンごとにオプションで専用の[ハフマン表](https://en.wikipedia.org/wiki/Huffman_coding)によって達成されています。
 最新の JPEG エンコーダ（[libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/) や MozJPEG など）では、PJPEG の柔軟性を活用してデータの圧縮率が上がっています。

注: PJPEG の圧縮率が高いのはなぜでしょうか?ベースライン JPEG ブロックは、一度に 1 つずつエンコードされます。
 PJPEG の場合は、複数のブロックを通じて類似の[離散コサイン変換](https://en.wikipedia.org/wiki/Discrete_cosine_transform)係数を適用してまとめてエンコードすることにより、圧縮率が高くなります。

### だれが実動環境でプログレッシブ JPEG を使用しているか? {: #whos-using-progressive-jpegs-in-production }

*   [Twitter.com ではプログレッシブ JPEG](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)
を品質 85% を基準に利用しています。
 彼らはユーザーが認識するレイテンシ（初回スキャンから全読み込みまでの時間）を測定し、全体として PJPEG は、ファイルサイズが小さく、トランスコードとデコードの時間が許容範囲に収まるという必要条件を満たすうえで優位であることを確認しました。
*   [Facebook は iOS アプリについてプログレッシブ JPEG を利用しています](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)。
    その結果、データ使用量が 15% 削減され、優れた品質の画像を表示する速度が 15% 高速になりました。
*   [Yelp はプログレッシブ JPEG に切り替えた](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)結果、一部そのおかげで約 4.5% の画像サイズ削減が達成されました。
 さらに MozJPEG 使用により 13.8% の節約を達成しています。

### プログレッシブ JPEG のメリット {: #the-disadvantages-of-progressive-jpegs }

PJPEG はベースライン JPEG に比べてデコードが遅く、時には 3 倍の時間がかかります。
 強力な CPU を搭載したデスクトップ マシンではそれほど問題になりませんが、それほど強力でない、リソースの限られたモバイル端末では問題になります。
 基本的に画像を複数回でコードすることになるため、不完全レイヤの表示には手間がかかります。
 それら複数回のパスのために CPU サイクルが消費される場合があります。

また、常にプログレッシブ JPEG の方がサイズが小さいとは*限りません*。 （サムネイルなど）非常に小さい画像の場合、プログレッシブ JPEG はベースラインの場合よりもサイズが大きくなることがあります。
しかし、そのような小さいサムネイルの場合、プログレッシブな表示にすることに大して価値がありません。

つまり、PJPEG を利用するかどうかを決定する際には、実験することが必要であり、ファイルサイズ、ネットワーク遅延、および CPU サイクルの使用量の適切なバランスを見極める必要があります。

注: PJPEG（およびすべての JPEG）は、時にはモバイル端末上でハードウェア デコードが可能です。
 RAM への影響を軽減することはありませんが、CPU の問題をいくらか軽減することができます。
 すべての Android 端末でハードウェア アクセラレーションがサポートされるわけではありませんが、ハイエンド端末ではサポートされており、すべての iOS 端末でサポートされています。

画像の読み込みがいつ完了したかがはっきりしないという理由でプログレッシブな読み込みをデメリットと考えるユーザーもいます。
 これはオーディエンスによって判断が大きく異なるため、あなたのユーザーに最適なものを考えてください。

### どのようにプログレッシブ JPEG を作成するか? {: #how-to-create-progressive-jpegs }

[ImageMagick](https://www.imagemagick.org/)、[libjpeg](http://libjpeg.sourceforge.net/)、[jpegtran](http://jpegclub.org/jpegtran/)、[jpeg-recompress](http://jpegclub.org/jpegtran/)、[imagemin](https://github.com/imagemin/imagemin) などのツールやライブラリで、プログレッシブ JPEG のエクスポートがサポートされています。
 既存の画像最適化パイプラインがあるなら、プログレッシブな読み込みのサポートを追加するのが妥当な方法になるでしょう。

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

多くの画像編集ツールでは、ベースライン JPEG ファイルで画像を保存することがデフォルトになっています。

<img src="images/photoshop.jpg" alt="photoshop では、ファイル エクスポート メニューからプログレッシブ jpeg へのエクスポートがサポートされている" /> 多くの画像編集ツールでは、ベースライン JPEG ファイルで画像を保存することがデフォルトになっています。
 Photoshop の場合、作成するどの画像もプログレッシブ JPEG として保存できます。そのためには、[ファイル]->[エクスポート]->[ウェブ用に保存]（レガシー）で、[プログレッシブ]のオプションをクリックします。
 Sketch でも、JPG としてプログレッシブ JPEG をエクスポートする機能がサポートされています。そのためには、画像を保存する際に [プログレッシブ] チェックボックスをオンにします。

### 彩度（または色）サブサンプリング {: #chroma-subsampling }

人間の目は、画像の色の詳細（彩度）の喪失に対する許容度が、輝度（明るさ）の場合より大きくなっています。
 [彩度サブサンプリング](https://en.wikipedia.org/wiki/Chroma_subsampling)は、輝度を重視しつつ色信号の精度を下げる圧縮の形式の一つです。
それにより、画像品質を大きく損なうことなく、場合によっては最大 [15～17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/) ファイルサイズが小さくなります。これは、JPEG 画像で利用可能な 1 つのオプションです。
 サブサンプリングは、画像のメモリ使用量も下げます。

<img src="images/luma-signal.jpg" alt="信号 = 彩度 + 輝度" />

画像の中にさまざまな形が見えるのはコントラストによるため、それを定義する輝度は非常に重要です。
 古い白黒写真やフィルタ処理した白黒写真には色が含まれていませんが、輝度のおかげでカラー写真と同じくらい細部を識別することができます。
 視覚的認識において、彩度（色）の影響はそれほどではありません。

<img src="images/no-subsampling.jpg"
     alt="JPEG には、なし、横、縦横など、多くの種類のサブサンプリングのサポートが含まれています。" />

JPEG では、なし、横、縦横など、多くの種類のサブサンプリングがサポートされています。
 この図は、Frédéric Kayser 氏の[カブトガニの JPEG](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf) から取ったものです。

サブサンプリングについて扱う際によく使用されるサンプルがいくつかあります。
`4:4:4`、`4:2:2`、および `4:2:0` が一般的です。 それにしても、これらは何を表すのでしょうか?あるサブサンプルの形式が A:B:C であるとしましょう。
 A は 1 行のピクセル数であり、JPEG の場合、通常は 4 です。B は 1 行目の色の量、C は 2 行目の色の量です。

* `4:4:4` は圧縮なしであり、彩度と輝度の情報が完全に伝達されます。
* `4:2:2` では、水平方向にハーフサンプリング、垂直方向にフルサンプリングになります。
* `4:2:0` では、1 行目のピクセルのうち半分から色をサンプリングし、2 行目は無視します。

注: jpegtran と cjpeg では、輝度と彩度に対して別々の品質設定を指定することがサポートされています。
 そのためには、`-sample` フラグ（例: `-sample 2x1`）を追加します。

一般的な規則: 写真にはサブサンプリング（`-sample 2x2`）が適しています。
サブサンプリングなし（`-sample 1x1`）は、スクリーンショット、バナー、ボタンに最適です。
どれを使用したらよいか分からない場合には、最終的な妥協案（`2x1`）になります。</aside>

ここでの彩度成分のピクセル数を減らすことにより、色成分を大幅に減らすことができ、最終的にバイトサイズが小さくなります。

<img src="images/subsampling.jpg" alt="品質 80 での JPEG に対する彩度サブサンプリング構成
" /> 品質 80 での JPEG の彩度サブサンプリング構成

彩度サブサンプリングは、ほとんどのタイプの画像で考慮に値します。 顕著な例外もいくつかあります。サブサンプリングは人間の目の限界を利用するものであるため、彩度の詳細が輝度の詳細と同じように重要という場合（医療用画像など）には、画像の圧縮手段として適していません。

活字が含まれる画像の場合も、テキストの貧弱なサブサンプリングのために読みにくくなってしまうことがあります。
 JPEG は、変化が穏やかな風景写真がうまく処理されるように設計されたものであるため、境界が明確なものは圧縮が困難です。

<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="テキストが含まれる画像で強度のサブサンプリングを使用する際には注意が必要" /> [Understanding JPEG](http://compress-or-die.com/Understanding-JPG/) では、テキストが含まれる画像の場合は、あくまでサブサンプリング 4:4:4 （1x1）を使用することが勧められています。

トリビア:正確な彩度サブサンプリングの方法が JPEG の仕様で指定されていなかったため、デコーダごとに処理方法が異なっています。
 MozJPEG と libjpeg-turbo では、同じスケーリング方式が使用されています。
 libjpeg の以前のバージョンでは、異なる方法を使って色にリンギング アーティファクトを追加しています。

注: Photoshop では、[ウェブ用に保存] 機能を使用すると自動的に彩度サブサンプリングが設定されます。
 画像品質が 51～100 の範囲に設定されている場合、サブサンプリングはまったく使用されません（`4:4:4`）。
 品質がそれを下回る場合、`4:2:0` サブサンプリングが使用されます。
 品質を 51 から 50 にしたとたんに、ファイルサイズが急激に小さくなるのはそのためです。

注: サブサンプリングの話では、しばしば [YCbCr](https://en.wikipedia.org/wiki/YCbCr) という用語が使用されます。
 これは、ガンマ補正 [RGB](https://en.wikipedia.org/wiki/RGB_color_model) 色空間を表すことのできるモードです。
 Y はガンマ補正輝度、Cb は青の色差成分、Cr は赤の色差成分です。
 ExifData では、サンプリング レベルの横に YCbCr が表示されます。

色差サブサンプリングの参照資料については、[Why aren’t your images using Chroma subsampling?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/) をご覧ください。

### JPEG からどれだけ発展してきたか? {: #how-far-have-we-come-from-the-jpeg }

**ウェブの画像形式の現状:**

*tl;dr - 多くのフラグメンテーションがあります。 多くの場合、最新技術を活用するためには、さまざまな形式をさまざまなブラウザに合わせて条件付きで配信することが必要です。*

<img src="images/format-comparison.jpg" alt="いくつかの最新画像形式の品質比較
" /> さまざまな最新の画像形式（および最適化処理）を使用した場合、ターゲット ファイルサイズ 26 KB でどうなるかをここに示します。
 品質を比較するには、後述の [SSIM](https://en.wikipedia.org/wiki/Structural_similarity)（構造的類似性）または [Butteraugli](https://github.com/google/butteraugli) を使用することができます。

*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000)（2000 年）** - 離散コサインに基づく変換からウェーブレット方式に切り替えた JPEG の改良版。
 **ブラウザ サポート:Safari デスクトップ + iOS**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR)（2009 年）** - JPEG および JPEG 2000 に替わるもの。[HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) およびワイドな [gamut](http://wikivisually.com/wiki/Gamut) 色空間に対応。
 JPEG に比べて生成ファイルサイズは小さく、エンコード/デコードの速度は若干遅い。
 **ブラウザ サポート:
    Edge、IE。**
*   **[WebP](https://en.wikipedia.org/wiki/WebP)（2010 年）** - Google によるブロック予測ベースの形式で、不可逆圧縮と可逆圧縮に対応。
    JPEG に関連したバイト数節約機能と透過性サポートを提供し、バイト数の多い PNG がしばしば使用される。
 彩度サブサンプリング構成とプログレッシブ読み込みはいずれも非対応。
 デコード時間も JPEG デコードに比べて遅い。
    **ブラウザ サポート:Chrome、Opera。 Safari および Firefox で実験済み。**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format)（2015 年）**    - PNG、可逆 WebP、可逆 BPG、および可逆 JPEG 2000 よりも圧縮率が優れているとされる可逆画像形式。
 **ブラウザ サポート:
    なし。**
*   **HEIF と BPG。** 圧縮の点では同じだが、ラッパーが異なる。
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics)（2015 年）** -
 JPEG よりも圧縮効率を高くすることを意図した、HEVC（[高効率動画コーディング](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)）に基づく形式。
 ファイルサイズの点で MozJPEG や WebP に勝るものとして登場。
 ライセンスの問題があるため、普及するとは思えない。
 **ブラウザ サポート: なし。 *[ブラウザ デコーダの JS](https://bellard.org/bpg/) があります。***
* **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
（2015 年）** - 限定内部予測を適用した、HEVC エンコード画像を格納するための画像および画像シーケンス用形式。
 Apple 社は [WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
で、ファイルサイズの点で 2 倍の節約になるとして、iOS では JPEG から HEIF に切り替えると発表。
 **ブラウザ サポート:なし（執筆時点）。
    最終的に Safari デスクトップおよび iOS 11**

ビジュアル データを扱うことが多くなると、上記のいずれかで[これらの](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)ビジュアル比較ツールのうちの [1 つ](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml)が重宝することでしょう。

それで、**ブラウザ サポートは断片的であり**、上記のいずれかを活用するのであれば、ターゲット ブラウザごとに条件付きでフォールバックを配信することが必要になります。
 Google では、WebP を有望視しており、まもなく本格的に検討する予定です。

また、ブラウザでメディア タイプを判別できる画像ならレンダリング可能であるため、画像形式（WebP や JPEG 2000 など）を .jpg 拡張子で配信できるようになります。
 これにより、サーバー側の[コンテンツ タイプ ネゴシエーション](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)が可能になり、HTML をまったく変更することなく、送信画像を決定できるようになります。
Instart Logic などのサービスは、画像を顧客に配信する際にこの手法を使っています。

次に、さまざまな画像形式の条件付き配信ができない場合のオプションについて考慮しましょう。それは**JPEG エンコーダを最適化**することです。

### JPEG エンコーダの最適化 {: #optimizing-jpeg-encoders }

最新の JPEG エンコーダでは、既存ブラウザや画像処理アプリとの互換性を保ったまま、JPEG ファイルのサイズを小さくし、信頼性を高めるための試みがなされています。
 圧縮上のメリットを可能にするために、新しい画像形式やエコシステムでの変更を導入することはしていません。
 そのようなエンコーダに、MozJPEG と Guetzli の 2 つがあります。

***tl;dr どの最適化 JPEG エンコーダを使用するべきか?***

* 一般的なウェブ アセット:MozJPEG
* 品質が重要で、エンコード時間が長くてもかまわない場合: Guetzli を使用
* 構成可能性が必要な場合:
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive)（背後で MozJPEG を使用）
 * [JPEGMini](http://www.jpegmini.com/)。
 Guetzli に類似 - 自動的に最高品質を選択します。
 Guetzli ほど技術的に精錬されてはいませんが、高速であり、ウェブに適した品質を目指します。
 * [ImageOptim API](https://imageoptim.com/api)（[こちら](https://imageoptim.com/online)から無料のオンライン インターフェースを入手可能） - 独特な色の処理。
 色の品質は全体の品質とは別個に選択できます。 スクリーンショットでは高解像度を保つため、自動的に彩度サブサンプリング レベルを選択しますが、自然の写真では色の平滑化のためにバイトを消費することはしません。

### MozJPEG について {: #what-is-mozjpeg }

Mozilla では、[MozJPEG](https://github.com/mozilla/mozjpeg) の形で最新の JPEG エンコーダを提供しています。
 JPEG ファイルのサイズを 10% 小さくすると[公言](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)しています。
 MozJPEG で圧縮したファイルは複数のブラウザで動作し、機能として、プログレッシブ スキャン最適化、[格子量子化](https://en.wikipedia.org/wiki/Trellis_quantization)（最低圧縮の詳細を破棄）、より滑らかな高 DPI 画像の生成に役立つ優れた[量子化テーブル プリセット](https://calendar.perfplanet.com/2014/mozjpeg-3-0/)（ただしこれは、XML の設定をいとわなければ ImageMagick によって可能）が含まれます。

MozJPEG は [ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) の両方でサポートされており、比較的信頼性の高い、構成可能な [imagemin プラグイン](https://github.com/imagemin/imagemin-mozjpeg)があります。
 Gulp を使った実装の例をここに示します:

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality:85

    })]))
    .pipe(gulp.dest('dist'))
);
```

<img src="images/Modern-Image10.jpg" alt="mozjpeg をコマンドラインから実行" />

<img src="images/Modern-Image11.jpg" alt="異なる品質での mozjpeg 圧縮。
 q=90、841 KB。 q=85、562 KB。 q=75、324 KB。 同じように、ここでは品質を少し下げたため、Butteraugli と SSIM のスコアが若干悪くなっています。" />

MozJPEG:異なる品質でファイルサイズと視覚的類似性のスコアを比較。

ここでは、ソース画像の SSIM（構造的類似性）スコアを計算するため、[jpeg-archive](https://github.com/danielgtaylor/jpeg-archive) プロジェクトの [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
を使用しました。
SSIM は、2 つの画像の類似性を測る尺度であり、SSIM スコアは、「完全」と見なされる画像に対して、もう 1 つの画像の品質尺度となります。

私の経験からすると、MozJPEG は、配布時のファイルサイズを抑えつつ高い視覚品質でウェブ用に画像を圧縮するための優れたオプションです。
 小中規模のサイズの画像の場合、MozJPEG（品質=80～85）は、妥当な SSMI を維持した上で 30～40% のファイルサイズ節約になり、jpeg-turbo 上で 5～6% の改善を実現します。
 これには、ベースライン JPEG に比べて[エンコードが遅い](http://www.libjpeg-turbo.org/About/Mozjpeg)という犠牲が伴いますが、必ずしも大きな問題とはならない場合もあります。

注: 付加的な構成機能のサポートや画像圧縮の補助的ユーティリティが含まれる MozJPEG 対応のツールが必要な場合、[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive) をチェックしてみてください。
 『Web Performance in Action』の著者である Jeremy Wagner 氏は、[この](https://twitter.com/malchata/status/884836650563579904)構成で使用して成功しています。

### Guetzli について {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli) は、多少遅いとしても、人間の目の知覚力ではオリジナルとの区別が付かないような最小 JPEG を追求する、Google 提供の知覚性の高い優れた JPEG エンコーダです。
 これは、一連の実験候補を生成してから、各候補の心理視覚的誤差を考慮に入れて最終 JPEG を提案します。
 それらの候補の中から、スコアが一番高い候補を最終出力として選択します。

複数画像の間の差異を測定するため、Guetzli では [Butteraugli](https://github.com/google/butteraugli) を使用しています。これは、人の知覚力に基づいて画像の差異を測定するための 1 つのモデルです（後述）。
 Guetzli では、他の JPEG エンコーダでは考慮されないいくつかの視覚特性を考慮に入れることができます。
 たとえば、緑色の光の量と青色の知覚感度との間には関係があるため、緑色の近くにある青色に変化が生じると、エンコードの精度が若干落ちることがあります。

注: 画像ファイルサイズは、どの**コーデック**を選択するかよりも、どんな**品質**を選択するかにより大きく依存します。
 JPEG の最低品質と最高品質の間には、コーデックを切り替えることによるファイルサイズの違いよりも、はるかに大きなサイズの違いが生じます。
 許容範囲内で最低品質を使用することは、非常に重要です。
 注意深く考慮せずに品質を高く設定しすぎることは避けてください。

Guetzli の[主張](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html)によると、特定の Butteraugli スコアでの画像データ サイズは、他の圧縮方法に比べて 20～30% 小さくなるとのことです。
 Guetzli を使用する際の大きな危険の 1 つは、それが非常に遅いということ、そして現在のところ静的コンテンツにのみ適していることです。
README によれば、Guetzli では大量のメモリが必要です - メガピクセル当たり 1 分以上、200 MB の RAM が必要になることがあります。
 [この Github スレッド](https://github.com/google/guetzli/issues/50)には、Guetzli の実体験についての大変参考になるスレッドがあります。
 これは、静的サイトのビルドプロセスの一部として画像を最適化する場合には理想的ですが、オンデマンドでの実行にはそれほど適していません。

注: むしろ Guetzli が適しているのは、静的サイトのビルドプロセスの一部として、または画像最適化がオンデマンドでは実行されない状況において画像を最適化する場合です。

Guetzli 最適化に対応しているツールには、ImageOptim などがあります（[最新バージョン](https://imageoptim.com/)）。

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```

<img src="images/Modern-Image12.jpg" alt="最適化のために guetzli を gulp から実行" />

Guetzli でさまざまな節約手法を使用して 3 × 3MP の画像をエンコードするのに 7 分近くかかりました（その上、高い CPU 使用率です）。
 高解像度の写真をアーカイブする場合には、このオファリングにある程度の価値があるかもしれません。

<img src="images/Modern-Image13.jpg" alt="異なる品質の guetzli の比較。
 q=100、945KB。 q=90、687KB。 q=85、542KB。" /> Guetzli:異なる品質でファイルサイズと視覚的類似性のスコアを比較。

注: Guetzli は、高品質の画像（未圧縮入力画像、100% やそれに近い品質の PNG ソースまたは JPEG）で使用することをお勧めします。
 他の画像（品質 84 以下の JPEG など）でも動作しますが、結果は貧弱なものになることがあります。

Guetzli での画像圧縮にはあまりにも時間がかかり、マシンのファンがうなりを上げるかもしれませんが、大きな画像ではやる価値があります。
 私が見たところ、視覚的な再現性を維持しつつ、40% のファイルサイズ削減を達成している例が数多くありました。
 これは、写真をアーカイブする場合に理想的です。 小中規模のサイズの画像（10～15 KB の範囲）でもそこそこの節約になっていますが、それほど目立った効果は出ていません。
 Guetzli では、小さいレベル画像の圧縮中に液化（liquify）歪が発生する率が高くなります。

効果性の異なるデータ ポイントについて、Guetzli と Cloudinary の自動圧縮を[比較](https://cloudinary.com/blog/a_closer_look_at_guetzli)した Eric Portis 氏の調査は、参考になるかもしれません。

### MozJPEG と Guetzli を比較するとどうか? {: #mozjpeg-vs-guetzli }

異なる JPEG エンコーダの比較は複雑です - 圧縮後の画像の品質と再現性に加えて最終サイズも比較する必要があります。
 画像圧縮の達人である Kornel Lesi&#x144;ski 氏は、これらの 2 つの面の一方だけのベンチマークを見て判断すると、[意味のない](https://kornel.ski/faircomparison)結論に至ってしまうと述べています。

Guetzli と MozJPEG を比較するとどうでしょうか? - Kornel の見解はこうです:

* Guetzli は高品質の画像のために調整されています（`q=90` 以上では butteraugli が最善と言われており、MozJPEG が適するのは `q=75` 前後です）
* Guetzli の圧縮には非常に時間がかかります（ちらも標準の JPEG を生成し、デコードは普通に速い）
* MozJPEG では品質設定が自動選択されませんが、
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive) などの外部ツールを使用すれば最適品質になる可能性があります。

圧縮後の画像が元の画像と視覚的に類似している、または認識可能であるかどうかを判断する手法がいくつか存在します。
 画像品質の研究でよく使用されるのは、[SSIM](https://en.wikipedia.org/wiki/Structural_similarity)
（構造化類似性）などの手法です。
 しかし、Guetzli は Butteraugli について最適化します。

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli) は Google によるプロジェクトの 1 つであり、人が 2 つの画像の視覚的画像劣化（心理的類似性）に気付くポイントを推定します。
 これは、違いがほとんど見分けられないような領域で信頼できる画像のスコアを出します。
 Butteraugli はスカラー スコアを出すだけでなく、差のレベルの空間マップも計算します。
 SSIM は画像から誤差の集約値を調べるのに対して、Butteraugli は最悪の部分を調べます。

<img src="images/Modern-Image14.jpg" alt="butteraugli によるオウムの写真の検証" /> 上記の例では、Butteraugli を使用することにより、視覚的に劣化して、どこかクリアでないところがあるとユーザーが気付く最小 JPEG 品質しきい値を見つけたところです。
 結果的に、合計ファイルサイズが 65% 削減しました。

現実の処理では、視覚的品質の目標を定義した後、複数の画像最適化戦略を実施して、Butteraugli 得点を調べ、ファイルサイズとレベルの最適バランスを実現するものを選ぶということになるでしょう。

<img src="images/Modern-Image15.jpg"
        alt="butteraugli をコマンドラインから実行" /> 私の Mac で Bazel をインストールし、C++ ソースを適切にコンパイルしてビルドするには、全体として 30 分かかりました。
 使い方はどちらかというと分かりやすいものです。比較する 2 つの画像（ソースと圧縮バージョン）を指定すると、スコアが出ます。

**Butteraugli は、視覚的類似性を比較する他の方法とどう違いますか?**

Guetzli プロジェクトのメンバーの[このコメント](https://github.com/google/guetzli/issues/10#issuecomment-276295265)によると、Guetzli スコアは Butteraugli では最高、SSIM では最低、そして MozJPEG スコアはどちらも同じ程度に良いとされています。
 これは、私自身の画像最適化戦略で実施した調査とも合致しています。
 私は、さまざまな画像に対し、Butteraugli や [img-ssim](https://www.npmjs.com/package/img-ssim) などの Node モジュールを実行して、Guetzli と MozJPEG の前後でソースとその SSIM スコアと比較しました。

**複数エンコーダの組み合わせ?**

大きな画像の場合、MozJPEG（jpegtran、Guetzli による作業が失われないよう cjpeg ではない）で Guetzli と**可逆圧縮**を組み合わせると、ファイルサイズの点でさらに 10～15% 下がり（全体では 55%）、SSIM ではごくわずか下がるだけでした。
 私はこのことに注意を向けたいと思っています。実験や分析が必要ですが、[Ariya Hidayat 氏](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli)などこの分野の他の人によっても試されて、有望な結果が得られています。

MozJPEG は、比較的高速で、高品質の画像を生成する、ウェブアセット用としてはビギナーに優しいエンコーダです。
 Guetzli はリソース消費が激しく、サイズの大きい高品質の画像に最適であり、私としては中級から上級のユーザー用のオプションと言えるでしょう。

## WebP について {: #what-is-webp }

[WebP](/speed/webp/) は Google による最新の画像形式であり、可逆圧縮でも不可逆圧縮でもファイルサイズが小さく、視覚的品質も許容範囲になるよう意図されています。
 アルファ チャンネル透明度とアニメーションもサポートされています。

昨年、WebP は、圧縮の点では不可逆モードでも可逆モードでも数パーセントの向上を達成し、速度の点ではアルゴリズムとして 2 倍速くなり、解凍でも 10% 改善されました。
  WebP は多目的に使えるツールというわけではありませんが、画像圧縮コミュニティで一定の立ち位置を確立し、ユーザーベースも拡大しています。
 その理由を調べてみましょう。

<img src="images/Modern-Image16.jpg" alt="異なる品質設定の webp の比較。
 q=90、646 KB。 q=80、290 KB。 q=75、219 KB。 q=70、199 KB" />
WebP:異なる品質でファイルサイズと視覚的類似性のスコアを比較。

### WebP のパフォーマンスはどうか? {: #how-does-webp-perform }

**不可逆圧縮**

WebP 不可逆ファイルは、VP8 または VP9 の動画 キー フレーム エンコード バリアントを使用した場合、WebP チームによれば、JPEG ファイルより平均で [25～34%](/speed/webp/docs/webp_study) 小さくなるとされています。

低品質範囲（0～50）の場合、WebP には、JPEG に比べ、濃淡むらのアーティファクトが目立たなくなるという大きなメリットがあります。
 中品質設定（-m 4 -q 75）では、デフォルトで速度とファイルサイズのバランスを取ります。
 高品質範囲（80～99）の場合、WebP のメリットはあまりありません。
 WebP は、品質よりもスピードが重要である場合にお勧めします。

**可逆圧縮**

[WebP 可逆ファイルは、PNG ファイルに比べて 26% 小さくなります](/speed/webp/docs/webp_lossless_alpha_study)。
PNG と比べた場合、可逆読み込み時間は 3% 減少します。 とは言うものの、通常は、ウェブでユーザーに可逆ファイルを配信することはありません。
 可逆ということと縁がシャープであること（非 JPEG など）の間には違いがあります。
可逆 WebP は、どちらかというとアーカイブ コンテンツに適しています。

**透明度**

PNG に比べてわずか 22% バイト数が増えるだけで、WebP には可逆 8 ビット透明度チャンネルがあります。
 また、不可逆 RGB 透明度もサポートされており、これは WebP 独特の機能です。

**メタデータ**

WebP ファイル形式では、EXIF 写真メタデータおよび XMP デジタル ドキュメント メタデータがサポートされています。
 また、ICC 色プロファイルも含まれています。

WebP では、CPU の消費は大きくなりますが、圧縮率は高くなります。 かつて 2013 年には、WebP の圧縮速度は JPEG に比べて 10 倍も遅い場合がありましたが、現在では無視できる程度です（一部の画像では 2 倍遅くなります）。
 ビルドの一部として処理される静的画像の場合、これは大して問題になりません。
 動的に生成される画像では、CPU のオーバーヘッドが感じられるようになり、評価が必要になってきます。

注: WebP 不可逆品質設定は、JPEG と直接には比較できません。 「70% 品質」の JPEG は、「70% 品質」の WebP とは大きく異なっています。というのは、WebP では、より小さいファイルサイズが達成される代わりに、破棄されるデータが多くなるからです。

### だれが実動環境で WebP を利用しているか? {: #whos-using-webp-in-production }

多くの大企業では、コストを削減し、ウェブページの読み込み時間を短くするために、実稼働環境で WebP を使用しています。

Google の報告によれば、1 日に 43 億回の画像リクエストをこなし、そのうち可逆圧縮が 26% であった時に、他の不可逆圧縮スキーマと比べて WebP を使用した場合には、30～35% の節約になるとのことです。
これは膨大なリクエスト数であり、かなりの節約になります。 もし[ブラウザ サポート](http://caniuse.com/#search=webp)がさらに良くて、さらに範囲が広かったら、もっと節約になることでしょう。
 Google でも、Google Play や YouTube などの実稼働サイトでそれを使用しています。

Netflix、Amazon、Quora、Yahoo、Walmart、Ebay、The Guardian、Fortune、USA Today のいずれも、WebP に対応しているブラウザでは WebP の画像を圧縮し配信しています。
VoxMedia は、Chrome ユーザーについては WebP に切り替えることにより、The Verge の[読み込み時間を 1～3 秒短縮](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)しています。
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) では、Chrome ユーザーに対してそれによる処理に切り替えたところ、画像品質は同じかそれ以上として、画像ファイルサイズに関しては平均 25% の削減を達成しました。

このサンプルリストが示すよりも、さらに多くの企業が使用しています。

<img src="images/webp-conversion.jpg" alt="Google での WebP の統計: 43 億を超える画像リクエスト" /> Google での WebP の利用状況:
1 日に 43 億件の WebP 画像リクエストが、YouTube、Google Play、Chrome Data Saver、および G+ で処理されています。

### WebP エンコードの仕組み {: #how-does-webp-encoding-work }

WebP の不可逆エンコードは、静止画像の JPEG に匹敵するように設計されています。 WebP の不可逆エンコードには、次の 3 つの主要なフレームがあります:

**マクロブロッキング** - 画像を輝度ピクセルの 16x16 の（マクロ）ブロック、および色差ピクセルの 2 つの 8x8 ブロックに分割。
 JPEG の色空間変換、色差チャンネル ダウンサンプリング、および画像細分化のアイディアと似ているように聞こえるかもしれません。

<img src="images/Modern-Image18.png" alt="Google Doodle のマクロブロッキングの例。一定の範囲のピクセルを輝度および色差のブロックに分割。"/>

**予測** - マクロブロックの各 4x4 サブブロックには予測モードが適用され、実質的にはそれによってフィルタリングが実行されます。
 これにより、1 つのブロックの周囲に、A（すぐ上の行）と L（左側の列）の 2 つのピクセル集合が定義されます。
これらの 2 つを使ってエンコーダは、4x4 ピクセルのテスト ブロックを塗りつぶし、元のブロックに最も近い値を生成するのがどちらであるかが判断されます。
 Colt McAnlis 氏は、[How WebP lossy mode works](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670) の中で、これについてさらに詳しく述べています。

<img src="images/Modern-Image19.png" alt="Google Doodle のセグメントの例。予測モデルを考慮する際の、行、ターゲットブロック、列 L を表示。"/>

JPEG エンコードと同じようないくつかの手順により、離散コサイン変換（TCT）が適用されます。
 重要な違いは、JPEG のハフマンではなく、[算術圧縮方式](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)を使用している点です。

さらに詳しくは、Google Developer の記事 [WebP Compression Techniques](/speed/webp/docs/compression) を参照してください。

### WebP のブラウザ サポート {: #webp-browser-support }

すべてのブラウザが WebP に対応しているわけではありませんが、[CanIUse.com](http://caniuse.com/webp) によれば、グローバルなユーザー サポートは約 74% に達しています。
Chrome と Opera では、ネイティブでサポートされています。 Safari、Edge、Firefox も実験を実施していますが、公式リリースには至っていません。
 WebP 画像をユーザーに見られるようにするというタスクは、しばしばウェブ デベロッパーに課されることになります。
この点については後ほど詳しく説明します。

主要ブラウザとそれぞれのサポート情報を次に示します:

* Chrome:Chrome はバージョン 23 以降、完全サポートを開始しました。
* Chrome for Android:Chrome 50 以降
* Android:Android 4.2 以降
* Opera:Since 12.1 以降
* Opera Mini:全バージョン
* Firefox:一部ベータ版サポート
* Edge:一部ベータ版サポート
* Internet Explorer:未対応
* Safari:一部ベータ版サポート

WebP にもマイナス面があります。 フル解像度色空間のオプションはありません。そして、プログレッシブ デコードをサポートしていません。
 それでも、WebP の利便性は優れており、ブラウザ サポートは執筆時点では Chrome や Opera だけに限られていますが、フォールバックを用意して検討する価値があると言えるほど、十分なユーザーをカバーできるでしょう。

### 画像を WebP に変換するにはどうすればいいか? {: #how-do-i-convert-to-webp }

複数の商用およびオープンソースの画像編集処理パッケージで、WebP がサポートされています。
 特に便利なアプリケーションは XnConvert です。これは、無料のクロス プラットフォーム一括画像処理変換ツールです。

注: 低品質または平均的な品質の JPEG を WebP に変換することは避けてください。
これはよくある間違いであり、JPEG 圧縮のアーティファクトが入る WebP 画像が生成されることになります。
 その場合、画像と共に JPEG による歪みも保存しなければならないことになるため、品質が二重に損なわれてしまい、WebP の効率が低くなってしまいます。
 変換アプリには、入手可能な最高品質のソース ファイル、できればオリジナルを使用してください。

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert では、500 を超える画像形式と互換性のある一括画像処理が可能です。
 80 を超える別個のアクションを組み合わせて、複数の方法で画像を変換または編集することができます。

<img src="images/Modern-Image20.png" alt="Mac の XNConvert アプリにより多数の画像を WebP に変換" />

XnConvert では、一括画像最適化がサポートされており、ソース ファイルから WebP やその他の形式への変換が可能です。
 圧縮機能に加えて XnConvert は、メタデータ削除、切り取り、色深度カスタマイズ、その他の変換を実行するのにも便利です。

xnview のウェブサイトに示されているオプションを一部以下に挙げます:

*   メタデータ:編集
*   変換:回転、切り取り、リサイズ
*   調整:輝度、コントラスト、彩度
*   フィルタ:ぼかし、エンボス、シャープ
*   効果:マスキング、すかし、ビネット

操作結果は、WebP を含む約 70 の異なるファイル形式でエクスポートできます。
 XnConvert はLinux、Mac、および Windows で無料で利用できます。
XnConvert は、特にスモール ビジネスにお勧めです。

**ノード モジュール**

[Imagemin](https://github.com/imagemin/imagemin) は広く使用されている画像圧縮モジュールです。これには、画像を WebP に変換するためのアドオン（[imagemin-webp](https://github.com/imagemin/imagemin-webp)）があります。
 不可逆モードと可逆モードの両方をサポートしています。

imagemin および imagemin-webp をインストールするには、次のコマンドを実行します:

```
> npm install --save imagemin imagemin-webp
```

その上で、両方のモジュールで require() を実行し、プロジェクト ディレクトリにある任意の画像（JPEG など）に対して実行することができます。
 以下は、WebP エンコーダの品質 60 による不可逆エンコードを使用しています:

```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```

JPEG と同じように、この場合の出力でも圧縮によるアーティファクトが出ることがあります。
使用する画像ごとに品質設定を評価してください。 Imagemin-webp は、`lossless: true` をオプションに渡すことにより、可逆品質の WebP 画像（24 ビット カラーおよびフル透明度をサポート）をエンコードするためにも使用できます。

```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```

imagemin-webp をベースに Sindre Sorhus 氏によりビルドされた [Gulp 用 WebP プラグイン](https://github.com/sindresorhus/gulp-webp)、および [WebPack 用 WebP ローダ](https://www.npmjs.com/package/webp-loader)も利用できます。
 Gulp プラグインには、imagemin アドオンで指定できるすべてのオプションを指定できます:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

または可逆:

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Bash を使用した一括画像最適化**

XNConvert では一括画像圧縮がサポートされていますが、アプリやビルド システムを使用したくない場合は、bash および画像最適化バイナリで非常にシンプルに対応できます。

[cwebp](/speed/webp/docs/cwebp) を使用して画像を WebP に一括変換できます:

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

または、[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive) を使用して MozJPEG により画像ソースを一括最適化できます:

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

そしてそれらの SVG を、[svgo](https://github.com/svg/svgo)（後述）を使用してトリミングします:

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner 氏は、[Bash を使用した画像最適化](https://jeremywagner.me/blog/bulk-image-optimization-in-bash)や[別の記事](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)の中で、この実行方法についての総合的な内容の投稿をしており、一読の価値があります。

**その他の WebP 画像処理および編集アプリ:**

   * Leptonica — オープンソース画像処理および分析アプリのウェブサイト全体。

*   Sketch では、WebP への直接出力がサポートされています
 * GIMP — Photoshop の代替になる、無料のオープンソース。 画像エディタ。
    * ImageMagick — ビットマップ画像の作成、合成、変換、編集。 無料。
      コマンドライン アプリ。
    * Pixelmator — Mac 用商用画像エディタ。
    * Photoshop WebP プラグイン — 無料。 画像のインポートとエクスポート。 Google 提供。

**Android:** Android Studio を使用して、既存の BMP、JPG、PNG、または静的 GIF 画像を WebP 形式に変換できます。
 詳しくは、[Android Studio を使用した WebP 画像の作成](https://developer.android.com/studio/write/convert-webp.html)を参照してください。

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">自分の OS で WebP 画像を表示するにはどうすればいいか?</a>

WebP 画像を Blink ベースのブラウザ（Chrome、Opera、Brave）にドラッグ＆ドロップしてプレビューを表示することができますが、Mac または Windows 用のアドオンを使用することにより、使用している OS から直接プレビューを表示することもできます。

数年前に [Facebook では WebP の実験を実行](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)し、写真を右クリックしてディスクに保存しようとしたユーザーが、それが WebP であるためにブラウザの外部では表示されないことに気付きました。
 これには 3 つの問題があります:

<ul> <li>WebP ファイルを「名前を付けて保存」しても、ローカルで表示できない。 これは、Chrome がそれ自身を ".webp" ハンドラとして登録することにより修正されました。
</li> <li> 画像を「名前を付けて保存」した後、メールに添付し、Chrome を使用していない他の人に送付する。

Facebook では、UI
に [ダウンロード] ボタンを目立つ仕方で導入し、ユーザーがダウンロードを要求した時点で JPEG を返すことによって解決しました。</li> <li>Right click >
URL をコピー -> ウェブで URL を共有。 これは、[content-type のネゴシエーション](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)により解決されました。</li>

</ul>

これらの問題はユーザーにとってあまり重要ではないかもしれませんが、ソーシャル共有性に関して興味深い点です。
 ありがたいことに今では、さまざまなオペレーティング システム上で WebP を表示したり操作したりするユーティリティがあります。

Mac では、[WebP 用 Quick Look プラグイン](https://github.com/Nyx0uf/qlImageSize)（qlImageSize）をお試しください。
 なかなか優れています:

<img src="images/Modern-Image22.jpg" alt="WebP 用 Quick Look プラグインを使用して Mac デスクトップに WebP ファイルをプレビュー表示"
         />

Windows の場合は、[WebP コーデック パッケージ](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)をダウンロードすることによって、WebP 画像のプレビューをファイル エクスプローラや Windows フォト ビューアで表示することができます。

### どうすれば WebP を配信できるか? {: #how-do-i-serve-webp }

WebP に未対応のブラウザでは、画像がまったく表示されないことがあり、それは理想的ではありません。
 これを回避するため、ブラウザ サポートに基づいて条件付きで WebP を配信するために使用できる戦略があります。

<img src="images/play-format-webp.jpg" alt="Chrome の Chrome DevTools Network パネル。Play Store のウォーターフォールを Chrome で表示し、そこで WebP を配信。"
         />Chrome DevTools Network パネルで、[Type] 列の下に、Blink ベースのブラウザに対して条件付きで配信される WebP ファイルをハイライト表示します。

<img src="images/play-format-type.jpg" alt="Play Store で WebP を Blink に配信するが、Firefox などのブラウザでは JPEG にフォールバックする。"
         />Play Store は WebP を Blink に配信しますが、Firefox などのブラウザでは JPEG にフォールバックします。

WebP 画像をサーバーからユーザーに届けるためのオプションを以下にいくつか示します:

**.htaccess を使用して WebP のコピーを配信**

JPEG/PNG ファイルに対応する .webp バージョンがサーバー上に存在する場合に、.htaccess ファイルを使用して対応しているブラウザに WebP ファイルを配信する方法を以下に示します。

Vincent Orback 氏は、このアプローチを推奨しています:

ブラウザは、[Accept ヘッダー](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)により、[WebP 対応であることを明示](http://vincentorback.se/blog/using-webp-images-with-htaccess/)できます。
 バックエンドを自分で制御している場合、JPEG や PNG などの形式ではなく、画像の WebP バージョンを返すことができます（ディスク上に存在している場合）。
 しかし、これはいつでも可能とは限りません（GitHub ページや S3 などの静的ホストの場合など）。したがって、このオプションを考慮する前に確認するようにしてください。

Apache ウェブサーバーの .htaccess のサンプル ファイルを以下に示します:

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

ページ上に表示される .webp 画像に問題がある場合、image/webp MIME タイプがサーバーで有効になっていることを確認してください。

Apache: .htaccess ファイルに次のコードを追加します。

```
AddType image/webp .webp
```

Nginx: mime.types ファイルに次のコードを追加します。

```
image/webp webp;
```

注: Vincent Orback 氏は、参照用に WebP を配信するためのサンプル [htaccess config](https://github.com/vincentorback/WebP-images-with-htaccess) を用意しています。Ilya Grigorik 氏は、便利な [WebP 配信用の構成スクリプト](https://github.com/igrigorik/webp-detect)のコレクションを維持管理しています。

**`<picture>` タグの使用**

`<picture>` タグを使用することにより、表示する画像形式をブラウザ自体が選択できます。
 `<picture>` タグは、1 つの `<img>` タグで複数の `<source>` 要素を利用します。それは画像を含む実際の DOM 要素です。
 ブラウザは、ソースを順に見て最初にマッチしたものを取り出します。
`<picture>` タグがユーザーのブラウザでサポートされていない場合、`<div>` がレンダリングされ、`<img>` タグが使用されます。

注: 順序に意味があるため、`<source>` の位置には注意してください。 image/webp ソースは、レガシー形式より後にではなく、その前に配置してください。
 それを認識するブラウザはそれを使用し、認識しないブラウザはもっと広くサポートされているフレームワークに移ります。
 また、物理サイズがすべて同じである場合、ファイルサイズの順に画像を配置することもできます（`media` 属性を使用しない場合）。
一般に、これはレガシーを最後に置くのと同じ順序になります。

HTML の例を以下に示します:

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**WebP への自動 CDN 変換**

一部の CDN は、自動化された WebP への変換をサポートしており、client hints を使用して、[可能な場合は必ず](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints) WebP 画像を配信できます。
使用している CDN で、サービスに WebP サポートが含まれているかどうかを確認してください。 それだけで済む場合もあります。

**WordPress の WebP サポート**

Jetpack — Jetpack は広く使用されている WordPress プラグインです。これには、[Photon](https://jetpack.com/support/photon/) と呼ばれる CDN 画像サービスが含まれています。
 Photon を使用すれば、シームレスな WebP 画像サポートを得られます。
 Photon CDN は Jetpack の無料版に含まれているため、お値打ちであり、操作しなくても導入できます。
 欠点として、Photon では画像のサイズが変更され、URL にクエリ文字列が入れられ、画像ごとに余分の DNS 参照が必要になるということがあります。

**Cache Enabler と Optimizer** — WordPress を使用している場合、少なくとも 1 つの半オープンソースのオプションがあります。
 オープンソース プラグインの [Cache Enabler](https://wordpress.org/plugins/cache-enabler/) には、配信する WebP 画像をキャッシュに保存する、メニュー・チェックボックス オプションがあります（利用可能で、現在のユーザーのブラウザがそれをサポートしている場合）。
 これにより、WebP 画像の配信が簡単になります。 欠点もあります:
Cache Enabler では、Optimizer と呼ばれる姉妹プログラムを使用する必要がありますが、これには年間使用料金がかかります。
 そのため、真のオープンソース ソリューションとは言えません。

**ShortPixel** — スタンドアロンで、または Cache
Enabler と共に使用できる別のオプションは、ShortPixel です。 スタンドアロンとして使用する場合、[ShortPixel](https://shortpixel.com) は、通常、ブラウザに合わせて画像の適切なタイプを配信する `<picture>` タグを追加することができます。
 無料で月間最大 100 の画像を最適化できます。

**アニメーション GIF の圧縮と `<video>` が優れている理由**

アニメーション GIF も、制限の多い形式であるにもかかわらず、引き続き広く使用されています。
 ソーシャル ネットワークから人気メディア サイトに至るまでアニメーション GIF の埋め込みが広く利用されていますが、この形式は動画の保存やアニメーションを意図して設計されたものでは*決して*ありません。
 事実、[GIF89a spec](https://www.w3.org/Graphics/GIF/spec-gif89a.txt) は、「GIF はアニメーションのプラットフォームとして意図されたものではない」と述べています。
 [色数、フレームとディメンションの数](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)は、すべてアニメーション GIF のサイズに影響します。
 動画に切り替えることで大きな節約になります。

<img src="images/animated-gif.jpg" alt="アニメーション GIF と 動画: 異なる形式の同等品質でのファイルサイズの比較"
         />
アニメーション GIF と 動画: 異なる形式の同等品質でのファイルサイズの比較。

**多くの場合、MP4 動画で同じファイルを配信すると、80% 以上のファイルサイズの削減になります。**GIF はかなりの帯域幅を浪費するだけでなく、読み込みにも時間がかかり、色数は少なく、ユーザー エクスペリエンスの副次的な部分を占めるものです。
 Twitter にアップロードしたアニメーション GIF は、Twitter 上でのほうが他のウェブサイトよりもパフォーマンスが良いということにお気付きかもしれません。
 [Twitter 上のアニメーション GIF は実際には GIF ではありません](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW)。
ユーザー エクスペリエンスを向上させ、帯域幅の消費を削減するため、Twitter にアップロードされたアニメーション GIF は、実際には動画に変換されています。
 同じように、アップロード時に[Imgur は GIF を動画に変換し](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)、通知を出すことなく自動的に MP4 に変換します。

GIF のほうが大きくなることが多いのはなぜしょうか?アニメーション GIF では、各フレームが可逆 GIF 画像として格納されています - そう、可逆です。
 しばしば起きる劣化は、GIF では 256 色のパレットに制限されているのが理由です。
 この形式では、H.264 などの動画コーデックとは異なり、圧縮において近傍フレームを考慮していないため、しばしばサイズが大きくなります。
MP4 動画では各キーフレームが不可逆 JPEG として保存されるため、元のデータの一部が破棄されて圧縮率が上がるようになっています。

**動画に切り替えることが可能なら**

*   [ffmpeg](https://www.ffmpeg.org/) を使用して、アニメーション GIF （またはそのソース）を H.264 MP4 に変換してください。
 私の場合、[Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video) から次の 1 行コマンドを使用しています:
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
*   ImageOptim API でも、[アニメーション GIF から WebM/H.264 動画への変換](https://imageoptim.com/api/ungif)がサポートされており、[GIF のディザリングが解消](https://github.com/pornel/undither#examples)されるため、動画コーデックによる圧縮率はさらに上がることがあります。

**どうしてもアニメーション GIF を使用しなければならない場合**

*   Gifsicle などのツールを使用すれば、メタデータや不要なパレット エントリを削除し、フレーム間の変化を最小限にすることができます
*   不可逆 GIF エンコーダを検討してください。
 Gifsicle の [Giflossy](https://github.com/pornel/giflossy) は、`—lossy` フラグによりこれがサポートされており、約 60～65% のサイズ削減が可能です。
 また、これに基づく優れたツールとして、[Gifify](https://github.com/vvo/gifify) もあります。
 非アニメーション GIF の場合は、PNG または WebP に変換してください。

詳しくは、Rigor 提供の [Book of GIF](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf) を参照してください。

## SVG の最適化 {: #svg-optimization }

SVG をスリムに保つということは、不要なものをすべて削除するということです。 多くの場合、エディタで作成される SVG ファイルには、大量の冗長な情報が含まれています（メタデータ、コメント、隠しレイヤなど）。
 このコンテンツはしばしば、安全に削除したり、レンダリングされる最終 SVG に影響与えずにもっと小さい形式に変換したりできます。

<img src="images/Modern-Image26.jpg" alt="svgo"
         />Jake Archibald 氏提供の [SVGOMG](https://jakearchibald.github.io/svgomg/) は、出力マークアップのプレビューを見ながらさまざまな最適化を選択することにより、個人の好みに合わせて SVG を最適化することのできる GUI インターフェースです。

**SVG 最適化の一般的なルール（SVGO）:**

*   SVG ファイルを最小化し、gzip します。 SVG は、CSS、HTML、JavaScript と同じく、実際には XML で表現されたテキスト アセットです。パフォーマンス向上のためには、それを最小化し、gzip してください。
* 折れ線の代わりに `<rect>`、`<circle>`、`<ellipse>`、`<line>`、`<polygon>` などの SVG の定義済み図形を使用してください。
 定義済み図形を優先的に使用することにより、最終的な図形の作成に必要なマークアップ量が減り、ブラウザが解析してラスター化するコードが少なくなります。
 SVG の複雑度が下がるなら、ブラウザによる表示速度も上がります。
*   折れ線を使う必要がある場合は、曲線や折れ線の量が少なくなるようにします。 可能な限り簡素化して、組み合わせます。
 Illustrator の[簡素化ツール](http://jlwagner.net/talks/these-images/#/2/10)は、複雑なアートワークであっても、不規則な部分を平滑化しつつ、不要な点を除去する点で巧みに機能します。
*   グループの使用は控えます。 どうしても使用する場合は、できるだけ簡素化してください。
*   非表示のレイヤは削除します。
*   Photoshop や Illustrator のエフェクトは使用しないようにします。 それらは、大きなラスター画像に変換される場合があります。
*   SVG と親和しない埋め込みラスター画像がないかどうか、ダブルチェックします
* ツールを使用して SVG を最適化します。
  [SVGOMG](https://jakearchibald.github.io/svgomg/) は、Jake Archibald 氏が提供する、手軽に使えるウェブベースの [SVGO](https://github.com/svg/svgo) 用 GUI であり、私はそれを大変重宝しています。
 Sketch を使用しているなら、エクスポート時にファイルサイズを縮小するため、SVGO Compressor プラクイン（[SVGO を実行するための Sketch プラグイン](https://www.sketchapp.com/extensions/plugins/svgo-compressor/)）を使用できます。

<img src="images/svgo-precision.jpg" alt="svgo
精度削減が、サイズに対して望ましい効果をもたらす場合がある"
         />
SVGO による SVG ソースの実行例: 高精度モード（サイズについて 29% の改善を実現）と
 低精度モード（38% のサイズ改善）。

[SVGO](https://github.com/svg/svgo) は、ノードベースの SVG 最適化ツールです。
SVGO を使用すれば、<path>定義の数値の*精度*を下げることにより、ファイルサイズを削減できます
。 小数点以下の各桁で 1 バイトが追加されるため、精度（桁数）を変えるとファイルサイズが大きく影響することがあります。
 ただし、図形の視覚表示に影響する可能性があるため、精度の変更には十分な注意が必要です。

<img src="images/Modern-Image28.jpg" alt="svgo の誤用で折れ線やアートワークを簡素化しすぎた例"
         />前の例では SVGO を使用して折れ線や図形を簡素化しすぎることなくうまくいきましたが、うまくいかない場合も多々あります。

 上記のロケットで光の当たっている帯は、精度を下げたためにガタガタになっています。

**コマンドラインでの SVGO の使用:**

GUI より CLI を好まれる方は、SVGO を[グローバル npm CLI](https://www.npmjs.com/package/svgo)
としてインストールすることもできます。

```
npm i -g svgo
```

それから、ローカル SVG ファイルに対して次のようにして実行できます:

```
svgo input.svg -o output.svg
```

浮動小数点精度の調整も含め、期待されるあらゆるオプションがサポートされます。

```
svgo input.svg --precision=1 -o output.svg
```

サポートされているオプションの全一覧は、SVGO の [readme](https://github.com/svg/svgo) を参照してください。

**SVG の圧縮を忘れないようにしてください!**

<img src="images/before-after-svgo.jpg" alt="svgo
による画像処理の前と後"
         />
前の例では SVGO を使用して折れ線や図形を簡素化しすぎることなくうまくいきましたが、うまくいかない場合も多々あります。
 上記のロケットで光の当たっている帯は、精度を下げたためにガタガタになっています。

また、[SVG
アセットを gzip する](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)こと、または Brotli を使って配信することも忘れないようにしてください。
 それらはテキストベースであり、高い率で圧縮されます（元のソースの約 50%）。

Google が新しいロゴを公開した時、その[最小](https://twitter.com/addyosmani/status/638753485555671040)バージョンのサイズはわずか 305 バイトであると発表しました。

<img src="images/Modern-Image30.jpg" alt="新しい google
ロゴの最小バージョンのサイズはわずか 305 バイト"
         />

さらにサイズを小さくするために（146 バイトにまで）使用できる [SVG
に関する高度な技](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/)がたくさんあります!
言うまでもなく、ツールを使うにせよ、手動にせよ、SVG のサイズ縮小のために、さらに*もう少し*できることがおそらくあります。

**SVG スプライト**

SVG は、アイコンについても[強力な](https://css-tricks.com/icon-fonts-vs-svg/)道具となり得ます。アイコン フォントのために必要な[奇妙な](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)回避手段を使わなくても、視覚化をスプライトとして表現するための手段を提供します。
 アイコン フォントよりもきめ細かい CSS スタイル制御機能（SVG の stroke プロパティ）があり、位置指定制御の点でも勝っています（擬似要素や CSS の`display` のハッキングが不要）。それに SVG のほうがはるかに [アクセスが容易](http://www.sitepoint.com/tips-accessible-svg/) です。

[svg-sprite](https://github.com/jkphl/svg-sprite) や [IcoMoon](https://icomoon.io/) などのツールを使えば、複数の SVG を組み合わせてスプライトにする処理を自動化することができ、それを [CSS スプライト](https://css-tricks.com/css-sprites/)、[シンボル スプライト](https://css-tricks.com/svg-use-with-external-reference-take-2)、[重ねスプライト](http://simurai.com/blog/2012/04/02/svg-stacks) などで利用することが可能です。
 Una Kravetz 氏が、SVG スプライト ワークフローで ulp-svg-sprite を使用する方法について書いた実際的な[記事](https://una.im/svg-icons/#💁)は、チェックしてみる価値があります。
 Sara Soudein 氏も、[アイコン フォントから SVG への移行](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/)についてブログで書いています。

**参考資料**

Sara Soueidan 氏の[ウェブ用に SVG 配信を最適化する際のヒント](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)および Chris Coyier 氏の[『Practical SVG』の書籍](https://abookapart.com/products/practical-svg)は、いずれもすばらしい内容です。
 また、Andreas Larsen 氏の SVG 最適化に関する投稿も啓発的だと思います（[part 1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035)、[part 2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46)）。[Preparing and exporting SVG icons in Sketch](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)
もお勧めです。

## 不可逆コーデックでの画像再圧縮を避ける {: #avoid-recompressing-images-lossy-codecs }

圧縮は、常にオリジナルの画像に対して実行するようお勧めします。 画像の再圧縮には副作用があります。
 品質 60 で圧縮済みの JPEG があるとしましょう。
この画像を不可逆エンコードで再圧縮すると、さらに見た目が悪くなります。
 圧縮を重ねるごとに、各世代の損失が積み重なっていきます。情報が失われ、圧縮による画像のアーティファクトが増幅し始めます。
 たとえ高品質の設定で再圧縮してもそうなります。

この落とし穴を回避するには、**最初の段階で許容範囲内の最低品質を設定し**、最初からファイルのサイズを最大限に節約するようにします。
 そのようにしてこの落とし穴を回避します。品質を下げることでファイルサイズを削減しただけでも、見た目は悪くなるからです。

不可逆ファイルを再エンコードすると、たいていはファイルサイズは小さくなりますが、思うような品質が得られるとは限りません。

<img src="images/generational-loss.jpg" alt="画像の再エンコードを繰り返した結果の世代損失蓄積"
         />上記は、Jon Sneyers 氏の[すばらしい動画](https://www.youtube.com/watch?v=w7vXJbLhTyI)と[それに付随する記事](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier)から取ったものですが、複数の形式を使用した再圧縮の世代蓄積損失の影響を見ることができます。
 これは、ソーシャル ネットワークから得た画像（圧縮済み）を保存して、再アップロード（再圧縮が発生）する場合に発生する問題です。
品質の損失が蓄積することになります。

MozJPEG が、（たまたまでしょうが）格子量子化のおかげで再圧縮の劣化に対する耐性が強くなっています。
 すべての DCT 値をそのまま正確に圧縮する代わりに、+1/-1 の範囲内の近似値を調べ、類似の値の圧縮結果のほうがビット数が少なくなるかどうかを確認することができます。
 不可逆 FLIF では、不可逆 PNG と似た切れ目が入っていますが、（再）圧縮の前にデータを調べて、何を捨てるかを決定することできます。
 再圧縮 PNG には、それ以上のデータ変更を回避するために検出可能な「穴」があります。

**ソースファイルを編集する際には、PNG や TIFF などの可逆形式で保存するようにしてください。それにより、可能な限り高い品質を維持するようにします。**その後、ビルドツールや画像圧縮サービスの処理により圧縮バージョンを出力し、それをユーザーに配信することにより、品質の損失を最小限に抑えるようにします。

## 不要な画像デコードやサイズ変更のコストを削減する {: #reduce-unnecessary-image-decode-costs }

以前には、必要以上に解像度が高い、大きな画像をユーザーに対して公開していました。
 それにはコストがかかります。 画像のデコードとサイズ変更は、平均的なモバイル ハードウェアのブラウザにとってコストの高い操作です。
 これは、大きな画像を送信し、CSS や width/height の属性を使用してサイズを変更すると発生することが多く、パフォーマンスに影響します。

<img src="images/image-pipeline.jpg" alt="タグで指定されている画像をブラウザが認識して画面に表示するまでに、多くのステップがあります。
 それには、リクエスト、デコード、サイズ変更、GPU へのコピー、表示が含まれます。"
         />

ブラウザが画像をフェッチする際には、元のソース形式（例: JPEG）をデコードして、メモリでビットマップにする必要があります。
 しばしば画像のサイズ変更が必要になります（幅がコンテナに対するパーセンテージとして設定されている場合など）。
 画像のデコードとサイズ変更はコストがかかり、画像表示のための時間が長くなる場合があります。

サイズ変更なしでブラウザが表示できる画像を送信するのが理想的です。
 それで、ターゲットの画面サイズと解像度に適した最小の画像を配信して、[`srcset` と `sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
を活用するようにしてください - `srcset` については後で説明します。

画像の `width` 属性や `height` 属性を省略することによっても、パフォーマンスが下がることがあります。
 これらの属性がないと、適切な寸法を判別するために必要なだけのバイト数を受信するまで、ブラウザは画像の位置に小さいプレースホルダ領域を割り当てることになります。
 寸法が分かった時点で、ドキュメント レイアウトを更新することが必要になりますが、それはリフローと呼ばれるコストのかかる手順です。

<img src="images/devtools-decode.jpg" alt="Chrome devtools に表示された画像デコードコスト"
         />ブラウザが画面に画像を表示するには、多くのステップが必要です。
 フェッチすることに加えて、画像をデコードし、しばしばサイズ変更もしなければなりません。
 Chrome DevTools
[Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference) で、それらのイベントを監査することができます。

サイズの大きい画像では、メモリサイズのコストも高くなります。 デコード後の画像にはピクセル当たり最大 4 バイト必要です。
 注意していないと、ブラウザが文字通りクラッシュしてしまう可能性があります。スペックの低い端末では、すぐにメモリスワップが始まります。
それで画像のデコード、サイズ変更、およびメモリの各コストに注意を払うようにしてください。

<img src="images/image-decoding-mobile.jpg" alt="ローエンドのモバイル ハードウェアでは、画像のデコードのコストが信じられないほど高くなる場合があります"
         />ローエンドのスマートフォンでは、画像のデコードのコストが信じられないほど高くなる場合があります。
デコードが 5 倍遅くなる場合もあります（それより長くはないとしても）。

Twitter が新しい[モバイルウェブ
エクスペリエンス](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)をビルドした時は、適切なサイズに変更された画像がユーザーに配信されるようにすることにより、画像デコードのパフォーマンスを改善しました。
 それにより、Twitter タイムライン内の多くの画像のデコード時間が最大 400 ms から 19 ms にまで短くなりました!

<img src="images/image-decoding.jpg" alt="Chrome DevTools のタイムライン/パフォーマンスのパネルで、Twitter Lite での画像パイプラインの最適化を実施する前と後の画像デコード時間がハイライト表示されているところ。
 前のほうが値が高くなっています。"
         />Chrome DevTools の [Timeline/Performance] パネルで、Twitter Lite での画像パイプラインの最適化を実施する前と後の画像デコード時間がハイライト表示されています（緑色）。

### `srcset` を使用した HiDPI 画像の配信 {: #delivering-hidpi-with-srcset }

ユーザーは、さまざまなモバイル端末や高解像度画面のデスクトップ端末からサイトにアクセスします。
 [デバイス ピクセル比](https://stackoverflow.com/a/21413366)（DPR）（「CSS ピクセル比」とも呼ばれる）は、端末の画面解像度が CSS によりどう解釈されるかを決定します。
 DPR は、スマートフォンのメーカーにより、表示要素が小さくなり過ぎないようにしつつ、モバイル画面の解像度と鮮明度を上げるために作られたものです。

ユーザーの求める画像品質に対応するには、最適な解像度の画像を端末に配信します。
 鮮明で DPR の高い画像（2x、3x など）は、それをサポートしている端末に送信できます。
 DPR が標準以下の画像は、高解像度画面のないユーザーに対して配信してください。2x 以上の画像は、しばしばバイト数がかなり大きくなるからです。

<img src="images/device-pixel-ratio.jpg" alt="デバイス ピクセル比 1x、2x、3x の図。
 DPR が上がるにつれて画像品質はより鮮明になっていきます。デバイス ピクセルと CSS ピクセルと比較した図が示されています。"
         />デバイス ピクセル比:
[material.io](https://material.io/devices/) や [mydevice.io](https://mydevice.io/devices/) など、人気のある端末の DPR をトラックするサイトはたくさんあります。

[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
を利用すれば、端末ごとにブラウザで利用可能な最適な画像を選択できます。つまり、2x のモバイル ディスプレイには 2x 画像を選択するという具合です。
 `srcset` に対応していないブラウザでは、`<img>` タグで指定されているデフォルトの `src` にフォールバックします。

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
や [Imgix](https://docs.imgix.com/apis/url/dpr) といった画像 CDN は、いずれも、画像密度制御をサポートしており、単一の正当なソースから最適密度でユーザーに配信します。

注: デバイス ピクセル比およびレスポンシブ画像について詳しくは、[Udacity](https://www.udacity.com/course/responsive-images--ud882) の無料コースや Web Fundamentals の [画像](/web/fundamentals/design-and-ui/responsive/images) ガイドを参照してください。

[Client Hints](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)
は、レスポンシブ画像マークアップの可能なピクセル密度と形式をそれぞれ指定する代替手段にもなります。
 Client Hints は、その情報を HTTP リクエストに付加するため、現在の端末の画面密度に最適な値をウェブサーバー側で選択できます。

### アート ディレクション {: #art-direction }

適切な解像度をユーザーに送信することは重要ですが、サイトによっては、それを**[アート ディレクション](http://usecases.responsiveimages.org/#art-direction)**の観点から考慮することが必要になります。
 ユーザーの画面が小さい場合、クロッピングまたはズームインして対象を表示することにより、使用可能なスペースを最大限活用するのがよいかもしれません。
 アート ディレクションについてはこの記事では扱いませんが、[Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
などのサービスでは、可能な限りこれを自動化するための API が提供されています。

<img src="images/responsive-art-direction.jpg" alt="レスポンシブ アート ディレクションの利用により、端末に応じてクロッピングした形で画像の表示量を増減するよう調整"
         />
アート ディレクション:Eric Portis 氏は、アート ディレクションにレスポンシブ画像を使用する方法を示す優れた[サンプル](https://ericportis.com/etc/cloudinary/)をまとめています。
 この例では、利用可能なスペースを最大限活用するため、さまざまなブレークポイントで主人公の画像の視覚特性を調整しています。

## 色の管理 {: #color-management }

色には、少なくとも 3 つの観点があります。生物学、物理学、そして印刷です。
 生物学において色は[知覚現象](http://hubel.med.harvard.edu/book/ch8.pdf)です。
 物体は、複数の波長のさまざまに異なる組み合わせの光を反射します。
 人間の目の光受容体は、それらの波長を色としての感覚に変換します。
 物理学においては、光、つまり光の周波数と輝度が意味を持ちます。
 印刷では、どちらかといえば色環、インク、芸術的モデルが関係します。

理想としては、世界中のあらゆる画面およびウェブブラウザで色が正確に同一の仕方で表示されてほしいものです。
 残念ながら、本質的に一貫性がないため、それは不可能です。
 色の管理の、色モデル、スペース、プロファイルにより色表示の 1 つの妥協点に達することができます。

#### 色モデル {: #color-models }

[色モデル](https://en.wikipedia.org/wiki/Gamma_correction)とは、少数の基本原色から全範囲の色を生成するための体系です。
色スペースには異なる種類があり、それぞれ色を制御するために異なるパラメータを使用しています。
 色スペースによって、制御パラメータの数は異なります。たとえば、グレースケールの場合は、黒色と白色の間の輝度を制御するパラメータが 1 つあるだけです。

広く使用されている 2 つの色モデルに、加法モデルと減法モデルがあります。 加法色モデル（RGB などデジタル表示に使用される）は色を表示するために光を使用するのに対して、減法色モデル（CMYK など印刷で使用される）は光を除去します。

<img src="images/colors_ept6f2.jpg" alt="sRGB、Adobe RGB、ProPhoto RGB" />RGB では、赤色、緑色、青色の光がさまざまに異なる組み合わせで加算されて、幅広い色のスペクトラムを生成します。
 CYMK（シアン、マゼンタ、イエロー、ブラック）は、白紙から輝度を引いて、さまざまなインクの色を生み出します。

[Understanding Color Models and Spot Color
Systems](https://www.designersinsights.com/designer-resources/understanding-color-models/)
では、他の色モデルやモード（HSL、HSV、LAB など）について分かりやすく説明されています。

#### 色スペース {: #color-spaces }

[色スペース](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)は、特定の画像で表現可能な特定の色の範囲です。
 たとえば、ある画像に最大 1670 万の色がある場合、異なる色スペースにより、これらの色から使用する範囲を狭めたり広げたりすることができます。
 デベロッパーによっては、色モデルと色スペースを同じものとして言及しています。

[sRGB](https://en.wikipedia.org/wiki/SRGB) は、ウェブ[標準](https://www.w3.org/Graphics/Color/sRGB.html)の色スペースとして設計されたものであり、RGB がベースになっています。
 これは、しばしば最小公倍数的なものと見なされ、ブラウザを越えて色の管理に使用できる無難なオプションです。
 その他の色スペース（Photoshop や Lightroom で使用される [Adobe RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) や [ProPhoto RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space) など）は sRGB よりも幅広い色を表現できますが、sRGB のほうが多くのウェブブラウザ、ゲーム、モニターで普及しており、一般的に注目されています。

<img src="images/color-wheel_hazsbk.jpg" alt="sRGB、Adobe RGB、ProPhoto RGB"
 />上記は、色域（色スペースにより定義できる色の範囲）を視覚化したものです。

色スペースには 3 つのチャンネル（赤、緑、青）があります。 8 ビット モードではチャンネルごとに 255 色が可能であり、合計で 1670 万色になります。
 16 ビット画像では、兆の単位の色数が表示可能になります。

<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB、Adobe RGB、ProPhoto RGB" />
        [Yardstick](https://yardstick.pictures/tags/img%3Adci-p3) の画像を使用した sRGB、Adobe RGB、ProPhoto RGB の比較。
 目に見えない色を表示することはできない以上、この概念を sRGB で示すのは非常に困難です。
 sRGB の通常の写真と色域が広い写真を比較すると、すべては同じで、ただ「ジューシーな」色という点が違っています。

色スペースの違い（sRGB、Adobe RGB、ProPhoto RGB など）は、その色域（陰影付きで再現可能な色の範囲）、光源、[ガンマ](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)曲線によるものです。
 sRGB は Adobe RGB と比べて約 20% 小さく、ProPhoto RGB は Adobe RGB と比べて約 [50% 大きく](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm)なっています。
 上記の画像のソースは [Clipping Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers) です。

[ワイド色域](http://www.astramael.com/)とは、sRGB より色域の大きい色スペースを指す語です。
 そのようなタイプの表示はますます一般的になっています。 とはいえ、多くのデジタル ディスプレイでは、sRGB よりもはるかに優れた色プロファイルを単に表示することすらできないのが現状です。
 Photoshop でウェブ用に保存する場合、対象ユーザーがワイド色域のハイエンド画面を使用しているのでない限り、[sRGB に変換] オプションを使用することを考慮してください。

<aside class="key-point"><b>注: </b> オリジナルの写真で作業している時は、sRGB を基本原色スペースとして使用しないようにしてください。
 それは、ほとんどのカメラがサポートしている色スペースよりも小さく、クリッピングが発生する可能性があります。
 その代わり、大きい色スペース（ProPhoto RGB など）で作業し、ウェブ用にエクスポートする時点で sRGB に出力するようにします。</aside>

**ウェブ コンテンツでワイド色域の使用が適切である場合があるか?**

はい。 画像に非常に飽和した/ジューシーな/強烈な色が含まれていて、それをサポートしている画面上でも同様にジューシーな感じで表示されてほしいという場合です。
 しかし、実際の写真で、そのようなケースはまずありません。
 実際に sRGB 色域を超えなくても、色を操作して強烈な表示にすることは容易です。

人間の色認識は絶対的ではなく、周囲の環境に相対的なものであり、容易に欺かれてしまいます。
 画像に強い蛍光色が含まれている場合であれば、ワイド色域が好都合となるでしょう。

#### ガンマ補正と圧縮 {: #gamma-correction }

[ガンマ補正](https://en.wikipedia.org/wiki/Gamma_correction)（または単に「ガンマ」）は、画像の全体の輝度を制御します。
 ガンマを変更すると、赤、緑、青の比率も変わることがあります。
 ガンマ補正なしの画像は、白すぎるか、暗すぎることがあります。

動画やコンピュータ グラフィックスの場合、データ圧縮と同じように、圧縮するためにガンマが使用されます。
 それにより、より少ないビット数（12 や 16 ではなく 8 ビット）の中に有用な輝度レベルを凝縮することができます。
 人間の輝度認識は、物理的な光の量に比例しているわけではありません。
 人間の目に合わせて画像をエンコードする際には、物理的に真の形で色を表現しても意味がないのです。
 ガンマ圧縮は、人間の認識に近いスケールで輝度をエンコードするために使用されます。

ガンマ圧縮により、輝度の有用なスケールが 8 ビットの精度に収まります（ほとんどの RGB 色で 0～255 を使用）。
 物理値と 1:1 の関係にある何らかの単位が色で使用されているとするなら、RGB 値は 1 対 1000000 になります。0～1000 は見た目で区別できるものの、999000～1000000 は同じに見えるからです。
 暗い部屋にいて、ろうそくが 1 個だけ点いているところを想像してみてください。
 2 本目のろうそくを点けると、部屋の光の明るさは大幅に増加することに気付きます。
 3 本目のろうそくを追加すると、さらに明るくなります。
そのようにして、100 本のろうそくを点けたとします。 101 本目のろうそく、そして 102 本目のろうそくを点けます。
明るさの変化に気付かなくなることでしょう。

どの場合も、追加された光の量は、物理的には同じです。
 それで、光が明るいと目の感度は低くなるため、ガンマ圧縮では明るい値を「圧縮」することにより、物理的には輝度レベルの正確度は落ちるものの、人間に合わせてスケールを調整して、人間の観点からはすべての値が同じように正確になるようにするわけです。

<aside class="key-point"><b>注: </b> ここで言うガンマ圧縮/補正は、Photoshop で設定するような画像のガンマ曲線とは異なります。
 ガンマ圧縮で想定されている作用は、独自のものです。</aside>

#### 色プロファイル {: #color-profiles }

色プロファイルは、端末の色スペースがどれかを記述している情報です。
 これは、異なる色スペース間での変換で使用されます。 プロファイルは、異なる種類の画面や媒体でも、可能な限り同じように画像が表示されるようにします。

画像には、色がどう表示されるべきかを正確に表現するための色プロファイルを埋め込むことができます。これについては、[International Color Consortium](http://www.color.org/icc_specs2.xalter)（ICC）で説明されています。
 これは、JPEG、PNG、SVG、[WebP](/speed/webp/docs/riff_container) など、さまざまな形式でサポートされており、ほとんどの主要ブラウザが埋め込み ICC プロファイルをサポートしています。
 画像がアプリで表示され、モニターの機能が認識されれば、色プロファイルに基づいてそれらの色を調整することができます。

<aside class="key-point"><b>注:</b> 一部のモニターの色プロファイルは sRGB に似ており、それを超えるプロファイルを表示できないため、対象ユーザーのディスプレイによっては、プロファイルを埋め込む価値が限定される場合があります。

 ご自分の対象ユーザーについて確認してください。</aside>

さらに埋め込み色プロファイルのために、画像のサイズが大幅に増えることがあるため（場合によっては 100 KB 以上）、埋め込みには注意が必要です。
 ImageOptim などのツールは、色プロファイルが検出された場合に、それを実際に[自動的に](https://imageoptim.com/color-profiles.html)削除します。
 これに対して、サイズ削減のために ICC プロファイルが削除された場合、ブラウザは、モニターの色スペースで画像を表示することを余儀なくされ、その結果、期待された彩度やコントラストとは異なる表示になる場合があります。
 自分のユースケースに応じて、ここで述べた長所短所を検討してください。

プロファイルについて詳しく知りたい場合、[Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)
に、ICC プロファイルの色管理に関する優れた参考資料が一通り揃っています。

#### 色プロファイルとウェブブラウザ {: #color-profiles }

Chrome の以前のバージョンでは色管理のサポートが貧弱でしたが、2017 年の[色修正レンダリング](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo)で改善されています。
sRGB ではないディスプレイ（最新の Macbook Pro）では、色が sRGB からディスプレイ プロファイルに変換されます。
 これは、異なるシステムやブラウザの間での色の類似度が高くなることを意味しています。
 Safari、Edge、Firefox でも現在では ICC プロファイルを考慮できるようになっており、使用している画面がワイド色域かどうかに関係なく、異なる色プロファイル（ICC など）の画像も適切に表示することができます。

注: ウェブ上でのさまざまな操作に色がどう適用されるかについては、Sarah Drasner 氏による [nerd’s guide to color on the web](https://css-tricks.com/nerds-guide-color-web/) を参照してください。

## 画像スプライト {: #image-sprites }

[画像スプライト](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)（CSS スプライト）はウェブ上で長い歴史があり、すべてのブラウザでサポートされています。複数スプライトを組み合わせてスライスされた大きな単一画像にすることにより、1 つのページで読み込まれる画像数を減らすための手段として広く使用されています。

<img src="images/i2_2ec824b0_1.jpg" alt="画像スプライトは、Google ホームページも含め、大規模な実動サイトで今でも広く使用されています。"
         />画像スプライトは、Google ホームページも含め、大規模な実動サイトで今でも広く使用されています。

HTTP/1.x において、一部のデベロッパーは、HTTP リクエストを減らすためにスプライトを使用していました。 それにはいろいろとメリットがありましたが、すぐにキャッシュ無効化という課題に直面することになるため、注意が必要でした。1 つの画像スプライトのどこかを少しでも変えると、ユーザーのキャッシュで画像全体が無効になるためです。

現在では、スプライトは [HTTP/2](https://hpbn.co/http2/) のアンチパターンと言えるかもしれません。
現在の HTTP/2 では単一の接続で複数のリクエストが可能であるため、[画像を個別に読み込む](https://deliciousbrains.com/performance-best-practices-http2/)のがベストでしょう。
 ご自分のネットワーク セットアップでこれが当てはまるかどうかを調べてください。

## 重要度の低い画像の遅延読み込み {: #lazy-load-non-critical-images }

遅延読み込みとは、ウェブ パフォーマンス パターンの 1 つであり、ユーザーが見る必要があるまで、ブラウザでの画像の読み込みを遅らせるというものです。
 1 つの例は、スクロールしていくにつれて、オンデマンドで非同期に画像が読み込まれるというものです。
 これは、画像圧縮戦略によるバイト数削減をさらに補足するものとなります。

<img src="images/scrolling-viewport.jpg" alt="画像の遅延読み込み"
         />

「アバブ ザ フォールド」、つまりウェブページが最初に表示された時点で表示しなければならない画像は、すぐに読み込まれます。
 一方、「ビロウ ザ フォールド」（スクロールしなければ見えない部分）の画像は、ユーザーにはまだ見えていません。
 それらについては、すぐにブラウザに読み込む必要はありません。
 それらは後で、ユーザーが下にスクロールしてそれを表示することが必要になった時点でのみ、読み込むことができます（遅延読み込み）。

遅延読み込みは、ブラウザ自体でネイティブ サポートはまだされていません（ただし、過去には、それについて[さまざまな議論](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)がなされてきました）。
 代わりに、JavaScript を使用して、この機能を追加します。

**遅延読み込みはなぜ便利か?**

必要になってから画像を読み込むこの「遅延」方式には、多くのメリットがあります:

* **データ消費量の削減**:ユーザーがすべての画像をすぐにフェッチする必要があると仮定していないなら、最小限の数のリソースのみを読み込みます。
 これは常に良いことであり、特にデータプランの限られているモバイル端末では望ましいことです。
* **電池消費量の削減**:ユーザーのブラウザのワークロードが少なくなるため、電池寿命が延びる可能性があります。
* **ダウンロード速度の改善**:画像を多用したウェブサイトのページ読み込み時間が全体として短くなって数秒ではなくほんの一瞬になるため、ユーザー エクスペリエンスが格段に向上します。
 事実これは、ユーザーがサイトを楽しんで長くとどまるか、それともちょっと立ち寄って統計の数値を上げるだけか、という違いをもたらし得るものです。

**しかし、あらゆるツールと同じく、強力であればあるほど、責任も大きくなります。**

**アバブ ザ フォールドの画像には遅延読み込みを適用しないようにします。**画像（プロダクトなど）の長いリストやユーザー アバターのリストに使用してください。
 ページの主人公となる画像には使用しないようにしてください。
 アバブ ザ フォールドの画像に遅延読み込みを適用すると、読み込みの表示が、技術的にも人間の認識的にも遅くなる場合があります。
 ブラウザのプリロード機能やプログレッシブ読み込みの機能を封印してしまうことがあり、JavaScript によってブラウザの負担が余分に増えてしまうことがあります。

**スクロール時の遅延読み込みには十分な注意が必要です。**ユーザーがスクロールするまで読み込みを遅らせるなら、すでにユーザーがそこより先にスクロールしたことがあるのでない限り、まずプレースホルダが表示され、それからやっと画像が表示されることになります。
 アバブ ザ フォールド部分が読み込まれた後に遅延読み込みを開始し、ユーザーの操作とは関係なく画像をすべて読み込むようにすることをお勧めします。

**だれが遅延読み込みを使用しているか?**

遅延読み込みの例として、多数の画像をホストしているメジャーなサイトをご紹介しましょう。
 際立っているのは、[Medium](https://medium.com/) と [Pinterest](https://www.pinterest.com/) です。

<img src="images/Modern-Image35.jpg" alt="medium.com の画像のインライン プレビュー"
         />medium.com の画像のガウスぼかしインライン プレビュー

多くのサイト（例: Medium）では、小さなガウスぼかしインライン プレビュー（100 バイト程度）がまず表示され、フェッチされた後、フル品質画像に移行していきます（遅延読み込み）。

José M. Pérez 氏は、[CSS フィルタ](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)を使用して Medium 効果を実装する方法について書いており、さらにそのようなプレースホルダをサポートするために[さまざまな画像形式](https://jmperezperez.com/webp-placeholder-images/)で実験しました。
 Facebook も、その[カバー写真](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)のプレースホルダに使われている有名な 200 バイト アプローチについて書いており、一読の価値があります。
 Webpack のユーザーであれば、この作業の一部を自動化する上で、[LQIP loader](https://lqip-loader.firebaseapp.com/) が役立つでしょう。

事実、高解像度の写真のお気に入りのソースを検索してから、ページを下にスクロールすることができます。
 ほとんどの場合、ウェブサイトの中のいくつかのフル解像度の画像のみ一度に読み込まれ、残りについてはプレースホルダの色または画像が表示される様子を見ることができます。
 スクロールを続けると、プレースホルダ画像がフル解像度の画像に置き換えられていきます。
 そのようにして遅延読み込みが機能しています。

**遅延読み込みを自分のページに適用するにはどうすればいいですか?**

遅延読み込みに使用できる多くのテクニックやプラグインがあります。 私のお勧めは、Alexander Farkas 氏が提供する [lazysizes](https://github.com/aFarkas/lazysizes) です。パフォーマンスと機能の点で優れており、任意で [Intersection Observer](/web/updates/2016/04/intersectionobserver) に統合することができ、プラグインがサポートされているからです。

**Lazysizes で何ができるか?**

Lazysizes は JavaScript ライブラリです。 構成は不要です。 縮小された js ファイルをダウンロードし、それを自分のウェブページに組み込みます。

README ファイルから取ったサンプルコードを以下に示します:

クラス "lazyload" を、data-src や data-srcset の属性と共に image/iframe に追加します。

オプションとして、低品質画像を指定した src 属性を追加することもできます:

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

本書のウェブ バージョンには、私はオンデマンドのレスポンシブ画像用に Lazysizes と Cloudinary をペアにしました。他の手段も使うことができます。
 それにより、スケール、品質、形式、および最小限の労力でプログレッシブに読み込みできるかどうかについて、さまざまな異なる値を指定して実験することができました:

<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary では、画像の品質、形式、その他の機能のオンデマンド制御がサポートされています。"
         />

**Lazysizes の機能には、次のものがあります:**

* 現在および将来の遅延読み込み要素に対する視覚的変化を自動検出する
* 標準的レスポンシブ画像のサポートが含まれる（picture および srcset）
* 自動サイズ計算およびメディアクエリの別名の機能を追加
* CSS や JS を多用するページやウェブアプリにおいて何百という image/iframe で使用可能
* 拡張可能:
プラグインをサポート
* 軽量だが完成度の高いソリューション
* SEO の改善:images/assets をクローラから隠さない

**遅延読み込みのその他のオプション**

Lazysizes だけがオプションではありません。 その他の遅延読み込みライブラリには、次のものがあります:

*   [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
*   [BLazy.js](https://github.com/dinbror/blazy) （または [Be]Lazy）
*   [Unveil](http://luis-almeida.github.io/unveil/)
*   [yall.js （Yet Another Lazy Loader）](https://github.com/malchata/yall.js)
    約 1 KB であり、サポートされている場合は Intersection Observer を使用します。

**遅延読み込みにはどんな落とし穴がありますか?**

* スクリーン リーダー、一部の検索ボット、JavaScript を無効にしているユーザーには、JavaScript で遅延読み込みされる画像が表示されません。
 しかしこれは、`<noscript>` というフォールバックを使って回避できます。
* 遅延読み込みのタイミングを決定するために使用されるスクロール リスナーにより、ブラウザのスクロールのパフォーマンスが低下することがあります。
 ブラウザの再描画の反復を引き起こすことがあり、その場合、クロールに対する処理が遅くなります。しかし、スマートな遅延読み込みライブラリでは、スロットリングを使用することで、それが軽減されます。
    1 つの解決策は Intersection Observer であり、これは lazysizes でサポートされています。

遅延読み込み画像は、帯域幅削減、コスト削減、ユーザー エクスペリエンス向上のために広く使用されているパターンです。
 自分が提供するエクスペリエンスでこれが妥当であるかを調べてください。
 詳しくは、[画像の遅延読み込み](https://jmperezperez.com/lazy-loading-images/)および [Medium のプログレッシブ読み込みの実装](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)を参照してください。

## display:none の落とし穴を避ける {: #display-none-trap }

古いレスポンシブ画像ソリューションでは、CSS の `display` プロパティを設定する際に、ブラウザが画像リクエストを処理する方法について間違っていました。
 そのため、予期した画像数をかなり上回る数の画像がリクエストされることになります。これは、レスポンシブ画像を読み込む際に
`<picture>` と `<img srcset>` が好まれるもう一つの理由になっています。

特定のブレークポイントで画像を `display:none` に設定するメディアクエリを作成したことがありますか?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

あるいは、`display:none` クラスを使用して非表示にする画像を切り替えたことがありますか？

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Chrome DevTools ネットワークのパネルと照らしてクイック チェックを実行すると、これらのアプローチを使用する非表示画像が、期待に反してフェッチされるのが確認されます。
 この動作は、埋め込まれたリソースの仕様に従っており、実際には正しいものです。

<img src="images/display-none-images.jpg" alt="display:none で非表示になっている画像がフェッチされる"
         />

**`display:none` により、画像 `src` のリクエストのトリガーは回避されますか?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

いいえ。 指定された画像は、やはりリクエストされます。 JavaScript が src を変更することができるようになる前に画像がリクエストされるため、この場合、ライブラリで display:none を当てにすることはできません。

**`display:none` により、`background: url()` のリクエストのトリガーは回避されますか?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

はい。 CSS 背景は、要素が解析されたらすぐにフェッチされるわけではありません。 `display:none` が指定された要素の子の CSS スタイルを計算しても、ドキュメントのレンダリングには影響しないため、役に立ちません。
 子要素の背景画像は計算されず、ダウンロードもされません。

Jake Archibald 氏の [Request Quest](https://jakearchibald.github.io/request-quest/)
には、レスポンシブ画像の読み込みで `display:none` を使用することに伴う落とし穴に関してすばらしいクイズがあります。
 特定のブラウザが画像リクエスト読み込みをどう処理するかについて疑問がある場合、対応する DevTools をポップアップで開き、自分で確認してください。

この場合も、`display:none` に頼るのではなく、可能な限り `<picture>` と `<img srcset>` を使用してください。

## 画像処理 CDN は自分にとって有用となるか? {: #image-processing-cdns }

*自分の画像処理パイプラインを設定するためにブログ投稿を読み、構成をいじるために費やす時間は、しばしばサービスに払う料金よりはるかに高くつきます。
 無料サービスを提供する [Cloudinary](http://cloudinary.com/)、[Imgix](https://www.imgix.com/) の無料試用版、および OSS に代わるものとして存在する [Thumbor](https://github.com/thumbor/thumbor) など、自動化のために利用できるオプションは豊富にあります。*

最適なページ読み込み時間を実現するには、画像読み込みを最適化する必要があります。
その最適化にはレスポンシブ画像戦略が必要であり、それにより、サーバー上での画像圧縮、最適形式の自動選択、およびレスポンシブ サイズ変更のメリットを活用できます。
 大切なのは、適切なサイズに調整した画像を、できる限り速く、適切な端末に、適切な解像度で配信することです。
 これは、それほど容易なことではありません。

**サーバーの使用と CDN の使用の比較**

画像操作は複雑であり、また常に発展を続けていくものであるため、まずは、この分野で経験のある方の言葉を引用し、その後で提案を述べたいと思います。

「自分のプロダクトが画像操作ではないのであれば、画像操作を自分で実行しないでください。
Cloudinary [または imgix や Ed] などのサービスで実行するほうがはるかに効率的であり、結果もはるかに良いものとなります。それで、ぜひそれらを使用してください。
 コストが心配なら、自分で開発して維持するのにどれだけのコストがかかるか、またホスティング、保存、配信のコストはどれだけになるかを考えてください。」— [Chris Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)

今のところは、画像処理の必要を満たすために CDN を使用することを検討するようお勧めします。
 2 つの CDN について検討し、前述のタスクのリストと比べるとどうなのかを考慮することにします。

**Cloudinary と imgix**

[Cloudinary](http://cloudinary.com/) と [imgix](https://www.imgix.com/) は、確立されている 2 つの画像処理 CDN です。
 Netflix や Red Bull など、世界中の何十万というデベロッパーや企業がそれらを選択しています。
 それらについて詳しく調べてみましょう。

**基本的な点**

サーバー ネットワークの所有者でない限り、独自のソリューションを展開することに比べた場合の圧倒的なメリットでまず挙げられるのは、分散グローバル ネットワーク システムを駆使して、画像のコピーをユーザーの近くに持っていける点です。
 また、CDN なら、変化するトレンドに合わせて自分の画像読み込み戦略の将来性を確保することがはるかに容易になります。独自にそれをしようとすると、メンテナンスし、新たに出現する形式のブラウザ サポートを絶えず追跡し、画像圧縮コミュニティをフォローすることが必要になります。

第 2 の点として、各サービスに段階的価格プランがあることです。Cloudinary には[無料レベル](http://cloudinary.com/pricing)のものが提供されており、imgix では高ボリュームのプレミアム プランと比べると、標準レベルの価格が低く設定されています。
 Imgix には、サービスに使えるクレジットが付いた無料の[試用版](https://www.imgix.com/pricing)が用意されているため、実質的に無料レベルと同じになります。

第 3 の点として、どちらのサービスにも API アクセスが提供されています。 デベロッパーは、プログラム的に CDN にアクセスでき、その処理を自動化できます。
 一部の機能は高額の有料レベルに限定されてはいますが、クライアント ライブラリ、フレームワーク プラグイン、API ドキュメンテーションもあります。

**画像処理を開始しましょう**

当面は、静的画像に限定してお話しします。 Cloudinary と Imgix は、いずれも画像処理の幅広い手段を提供し、いずれも標準プランと無料プランにおいて圧縮、サイズ変更、クロッピング、サムネイル作成などの基本的機能をサポートしています。

<img src="images/Modern-Image36.jpg" alt="cloudinary メディア ライブラリ"
         />
Cloudinary メディア ライブラリ:デフォルトで Cloudinary は、[非プログレッシブ JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) をエンコードします。
 非プログレッシブ JPEG を生成することをオプトインする場合は、[More options] の [Progressive] オプションにチェックを入れるか、'fl_progressive' フラグを渡します。

Cloudinary では、[7 つの幅広い画像変換](http://cloudinary.com/documentation/image_transformations)カテゴリと、その中の合計 48 のサブカテゴリのリストがあります。
 Imgix では、[100 を超える画像処理操作](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780)について公開されています。

**デフォルトではどうなるか?**

* Cloudinary は、デフォルトで次の最適化を実行します:
* [MozJPEG を使用して JPEG をエンコードします](https://twitter.com/etportis/status/891529495336722432)（デフォルトでは Guetzli ではなく MozJPEG が選択されます）
* 変換後の画像ファイルから関連メタデータをすべて削除します（元の画像は変更なし）。
 この動作をオーバーライドして、メタデータに変更を加えることなく変換した画像を配信するには、`keep_iptc` フラグを追加します。
* 自動品質で WebP、GIF、JPEG、JPEG-XR 形式で生成することができます。 デフォルトの調整をオーバーライドするには、変換で品質パラメータを設定します。
* PNG、JPEG、GIF のいずれかの形式で画像を生成する場合は、[最適化](http://cloudinary.com/documentation/image_optimization#default_optimizations)アルゴリズムを実行して、視覚的品質への影響は最小限にとどめつつ、ファイルサイズを最小化します。

Imgix には、Cloudinary のようなデフォルトの最適化はありません。 設定可能なデフォルトの画像品質はあります。
 imgix の場合、自動パラメータにより、画像カタログを通じてベースライン最適化レベルを自動化することができます。

現在のところ、[4 つの異なる手法](https://docs.imgix.com/apis/url/auto)があります:

* 圧縮
* 視覚的拡張
* ファイル形式変換
* 赤目解消

Imgix は、以下の画像形式に対応しています:JPEG、JPEG2000、PNG、GIF、アニメーション GIF、TIFF、BMP、ICNS、ICO、PDF、PCT、PSD、AI

Cloudinary は、以下の画像形式に対応しています:JPEG、JPEG 2000、JPEG XR、PNG、GIF、アニメーション GIF、WebP、アニメーション WebP、BMP、TIFF、ICO、PDF、EPS、PSD、SVG、AI、DjVu、FLIF、TARGA。

**パフォーマンスはどうか?**

CDN の配信パフォーマンスは、ほとんど[レイテンシ](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)とスピードに関するものです。

完全に未キャッシュの画像の場合、レイテンシは常にいくらか大きくなります。 しかし、画像がキャッシュに入れられて複数のネットワーク サーバーの間に配布されたなら、適切に処理された画像ではバイト数が節約されることに加えて、グローバル CDN によりユーザーに至るまでの最短ホップが検出可能であるという事実により、処理が不十分な画像や単独サーバーが地球を回って到達しようとする場合に比べれば、ほとんど常にレイテンシの問題は緩和されされます。

どちらのサービスも、高速で幅広い CDN を使用します。 この構成により、レイテンシは緩和され、ダウンロード速度が上がります。
 ダウンロード速度はページ読み込み時間に影響するものであり、ユーザー エクスペリエンスにとっても変換にとっても最も重要な指標の 1 つです。

**比較結果はどうか?**

Cloudinary には、Netflix、eBay、Dropbox を含む [16 万の顧客](http://cloudinary.com/customers)がいます。
 Imgix は顧客数を報告していませんが、Cloudinary より少ない数です。
 とはいえ、imgix のベースには、Kickstarter、Exposure、unsplash、Eventbrite などの重量級画像ユーザーが含まれます。

画像操作にはあまりに多くの制御不能変数が関係するため、2 つのサービスを直接的なパフォーマンスで比較することは困難です。
 画像をどの程度処理する必要があるか（所要時間に影響）、最終出力に必要なサイズと解像度（速度とダウンロード時間に影響）に応じて大きく異なります。
 結局は、コストが最も重要な要素かもしれません。

CDN には、金銭的にコストがかかります。 トラフィックが多く、画像を多用するサイトでは、CDN 月額料金として何百米ドルのコストがかかることがあります。
 これらのサービスを最大限利用するには、前提条件として特定のレベルの知識とプログラミング スキルが必要です。
何から何までよほど凝ったことをするというのでなければ、特にトラブルは発生しないでしょう。

しかし、画像処理のツールや API での作業に慣れていない場合は、学習曲線をたどることになります。
 CDN サーバーの位置に適応させるには、ローカルリンクの一部の URL を変えることが必要になります。
 適切な注意を払ってください。

**結論**

現在のところ独自の画像を配信している場合、あるいはその計画がある場合、CDN について検討してみてください。

## 画像アセットをキャッシュに入れる {: #caching-image-assets }

リソースでは、[HTTP キャッシュ ヘッダー](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)を使ってキャッシュ ポリシーを指定することができます。
特に、`Cache-Control` では、だれがレスポンスをキャッシュに入れ、どれだけの時間キャッシュに入れるのかを定義できます。

ユーザーに配信する画像のほとんどは、将来も[変化しない](http://kean.github.io/post/image-caching)静的アセットです。
 そのようなアセットの場合の最善のキャッシュ戦略は、攻撃的キャッシュです。

HTTP キャッシュ ヘッダーを設定する際、max-age を 1 年として Cache-Control を設定します（`Cache-Control:public; max-age=31536000`）。
 この種の攻撃的キャッシュは、ほとんどのタイプの画像でうまく動作します。特に、アバターや画像ヘッダーなど、寿命の長いもので有効です。

注: PHP を使用して画像を配信する場合、[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
のデフォルト設定のため、キャッシュが破壊されることがあります。
 これは画像キャッシュにとっては災難となり得ることであり、session_cache_limiter（'public'）を設定することにより、[回避](https://stackoverflow.com/a/3905468)するほうがよいかもしれません。その場合、`public, max-age=` を設定することになります。
 カスタム cache-control ヘッダーを無効にしたり設定したりするのも優れた方法です。

## 重要な画像アセットのプリロード {: #preload-critical-image-assets }

重要画像アセットは、[`<link
rel=preload>`](https://www.w3.org/TR/preload/) を使用してプリロードできます。

`<link rel=preload>` は宣言的フェッチであり、それにより、ドキュメントの `onload` イベントをブロックすることなく、ブラウザがリソースをリクエストするように強制することができます。
これにより、後でドキュメント解析プロセスになるまで発見されないであろうリソースのリクエストの優先度を上げることができます。

画像は、`image` の `as` 値を指定することによってプリロードできます:

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

`<img>`、`<picture>`、`srcset` の画像リソースおよび SVG には、すべてこの最適化を利用できます。

注: `<link rel="preload">` は Chrome、Blink ベースのブラウザ Opera、[Safari 技術プレビュー](https://developer.apple.com/safari/technology-preview/release-notes/)で[サポート](http://caniuse.com/#search=preload)されており、Firefox では[実装](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)されています。

[Philips](https://www.usa.philips.com/)、[FlipKart](https://www.flipkart.com/)、[Xerox](https://www.xerox.com/) などのサイトでは、`<link rel=preload>` を使用することにより、主要ロゴアセット（しばしばドキュメントの中で早期に使用される）をプリロードしています。
 さらに [Kayak](https://kayak.com/) では、プリロードを使用することにより、ヘッダーの主人公の画像が可能な限り速く読み込まれるようにしています。

<img src="images/preload-philips.jpg" alt="Philips では、ロゴ画像をプリロードするために、link rel=preload
を使用しています"
         />

**リンク プリロード ヘッダーとは?**

プリロード リンクは、HTML タグか [HTTP
リンクヘッダー](https://www.w3.org/wiki/LinkHeader)のいずれかを使用して指定できます。 いずれの場合も、プリロード リンクがブラウザにメモリ キャッシュにリソースを読み込み始めるよう指示します。これは、高い確率でそのリソースが使用されることをページが予期しており、プリロード スキャナーやパーサーがリソースを検出まで待ちたくないことを示しています。

画像のリンク プリロード ヘッダーは、次のようなものです:

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Financial Times が自分のサイトにリンク プリロード ヘッダーを導入した結果、マストヘッドの画像を表示するのにかかる時間が [1 秒短く](https://twitter.com/wheresrhys/status/843252599902167040)なりました。

<img src="images/preload-financial-times.jpg" alt="FT でのプリロードの使用。
        WebPageTest のビフォー＆アフターが表示されており、改善が示されています。"
         />
下: `<link rel=preload>` を指定、上: 指定なし。 WebPageTest での Moto G4 と 3G の比較、それら 2 つの[ビフォー](https://www.webpagetest.org/result/170319_Z2_GFR/)と[アフター](https://www.webpagetest.org/result/170319_R8_G4Q/)。

同じように、Wikipedia では、リンク プリロード ヘッダーにより、ロゴ表示の時間のパフォーマンスが改善されました。これについては、[ケーススタディ](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/)を参照してください。

**この最適化を使用する際の注意点**

画像アセットをプリロードするだけの価値が本当にあるということを十分に確かめてください。ユーザー エクスペリエンスにとってそれが重要でないのであれば、そのページに、読み込みが早くなるように注力したほうがよい別のコンテンツがあるかもしれません。
 画像リクエストの優先度を上げることにより、他のリソースをキューの後のほうに押しやってしまう危険性があります。

幅広いブラウザ サポートを持たない画像形式（WebP など）をプリロードするために `rel=preload` を使用することがないようにするのは重要です。
 また、`srcset` で定義されるレスポンシブ画像の場合も、取り出されるソースが端末の状態に応じて異なる可能性があるため、使用しないようにするのが賢明です。

プリロードについて詳しくは、[Preload, Prefetch and Priorities in
Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
および [Preload:What Is It Good
For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/) を参照してください。

## 画像のためのウェブ パフォーマンス予算 {: #performance-budgets }

パフォーマンス予算は、チームとして超えないように努めるウェブページ パフォーマンスの「予算」です。
 たとえば、「どのページでも画像は 200 KB を超えないようにする」とか、「ユーザー エクスペリエンスが 3 秒以内に使用可能にならなければならない」というようなことです。
 予算内に収まっていない場合、その理由や目標値以内に収める方法を追求します。

予算は、関係者とパフォーマンスについて議論する上で有用なフレームワークを提供します。
デザイン上またはビジネス上の意思決定がサイトのパフォーマンスに影響する場合、予算を考慮してください。
 それらは、サイトのユーザー エクスペリエンスに悪影響を及ぼす可能性がある場合に、変更を元に戻したり再検討したりするための基準になります。

私の観察では、パフォーマンス予算によりチームが最善の結果を得るのは、予算のモニタリングが自動化されている場合です。
 手動でネットワーク フォーターフォールから予算回帰を調査するのではなく、予算をオーバーした時点でフラグを立てるように自動化することができます。
 パフォーマンス予算追跡のために有用な 2 つのサービスに、[Calibre](https://calibreapp.com/docs/metrics/budgets) と [SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/) があります。

画像サイズのパフォーマンス予算が定義されたなら、SpeedCurve がモニタリングを開始し、予算を超えるとアラートが出ます:

<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="SpeedCurve 画像サイズのモニタリング。"
         />

Calibre も同様の機能を提供していますが、ターゲットとする端末クラスごとに予算を設定することができます。
 これは、Wi-Fi 経由でのデスクトップでの画像サイズの予算とモバイルでの予算が大きく変わる場合に便利です。

<img src="images/budgets.jpg" alt="Calibre は画像サイズの予算をサポートしています。"
         />

## 結論としての推奨事項 {: #closing-recommendations }

結局のところ画像最適化戦略の選択は、どのタイプの画像をユーザーに配信するかということであり、合理的な一連の評価基準によって決定するものです。
 SSIM または Butteraugli を使用するか、あるいは少数の画像のセットなら、最も有用なものは人間の認識を超えているかもしれません。

**以下に結論としての私の推奨事項をまとめます:**

ブラウザ サポートに基づいて条件付きでさまざまな形式を配信するという方法に投資**できない**場合:
"
* 品質が 90 を超える JPEG に適した形式は Guetzli + MozJPEG の jpegtran です。
    * ウェブの場合 `q=90` は無駄に高すぎます。 `q=80` で十分であり、2x ディスプレイなら `q=50` で十分です。
 Guetzli ではそこまで低くならないため、ウェブには MozJPEG を使用できます。
    * Kornel Lesi&#x144;ski 氏は、最近、mozjpeg の cjpeg コマンドを改善することにより、小さな sRGB プロファイルを追加して、Chrome がワイド色域のディスプレイ上で自然な色を表示するようにしました
* PNG pngquant + advpng は速度/圧縮比の点で非常に優れています
* （`<picture>`、[Accept ヘッダー](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)、または [Picturefill](https://scottjehl.github.io/picturefill/) を使用して）条件付きの配信が**可能な**場合:
    * WebP 対応のブラウザには WebP を配信します
        * WebP 画像は、100% 品質の元の画像から作成してください。 それ以外の方法を取ると、WebP をサポートするブラウザに対して、JPEG の歪*および* WebP の歪を伴う見栄えの劣る画像を配信することになります!
未圧縮のソース画像を WebP を使用して圧縮すれば、WebP 歪は目に付かなくなり、圧縮率も上がることがあります。
        * WebP チームの使用する `-m 4 -q 75` のデフォルト設定は、多くの場合、速度/比率について最適化するほとんどのケースに適しています。
        * また、WebP には特殊な可逆モード（`-m 6 -q 100`）があります。その場合、あらゆるパラメータ組み合わせを調べることにより、最小サイズにまでファイルを縮小できます。
 桁違いに遅くなりますが、静的アセットには利用する価値があります。
    * フォールバックとして、他のブラウザには Guetzli/MozJPEG で圧縮したソースを配信します

圧縮が成功しますように。

