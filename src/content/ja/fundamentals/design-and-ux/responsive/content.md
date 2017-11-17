project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 幅広いユーザーや端末を対象にする場合、レイアウトやグラフィックだけでなく、コンテンツについても配慮が必要です。

{# wf_updated_on: 2016-05-10 #}
{# wf_published_on: 2016-05-10 #}

# さまざまな端末に対応したコンテンツ {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

##  ユーザーはウェブをどう読むのか

[米国政府の記述ガイド](http://www.usability.gov/how-to-and-tools/methods/writing-for-the-web.html)には、ウェブの記述に関する要件がまとめられています。

> ウェブ向けの記述では、ユーザーが必要なものを見つける、見つけたものを理解する、ニーズを満たすために使用することができるように、わかりやすい言葉を使用します。
>
> また、実行、検索、共有が可能である必要もあります。

ある調査によると、[ユーザーはウェブページを読むというよりも、ざっと目を通します](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)。平均で、[ウェブページのコンテンツのうち読まれるのは 20 ～ 28% に過ぎません](https://www.nngroup.com/articles/how-little-do-users-read/)。画面で読む場合、紙面で読むよりも時間がかかります。情報に容易にアクセスでき、わかりやすい内容でなければ、ユーザーは途中で挫折してサイトを離れてしまいます。

##  モバイル向けの記述方法

目下のテーマに焦点を当て、その内容を最初に説明します。幅広いデバイスとビューポートで動作するように記述するには、最初に要点を述べるようにします。一般に、[先頭から 4 段落、70 単語程度](http://www.bbc.co.uk/academy/journalism/article/art20130702112133610)にまとめるのが理想的です。

ユーザーがあなたのサイトに何を求めているのかをよく検討してください。また、何かを探そうとしているのか考えてみてください。サイトにアクセスしたユーザーが情報を求めている場合、その目標を達成しやすいテキストになっているか全体を確認しましょう。[能動態](https://learnenglish.britishcouncil.org/en/english-grammar/verbs/active-and-passive-voice)で書き、行動や解決策を提案します。

閲覧者が求めている情報のみを公開します。

[英国政府の研究](https://www.gov.uk/guidance/content-design/writing-for-gov-uk)でも、以下の内容が示されています。

> 80% の人々は明確な英語で書かれた文章を好みます。そしてこの傾向は、話題が複雑であるほど強くなります（例： 97% がラテン語の「inter alia（とりわけ）」よりも「among other things（とりわけ）」を好む）。
>
> 教養のある、専門知識の豊富な人ほど、
> わかりやすい英語をより好みます。



よって、わかりやすく短い言葉を使用し、シンプルな構文を心がけます。これは、教養のある人や技術者が対象でも同じです。特に理由がない限り、話し言葉で書きます。ジャーナリストの間では古くから、11 歳の読者に向けて話すように書く、というルールがあります。

##  これから使用する数十億のユーザー

モバイル端末の読者向けには、簡潔に書くことが特に重要です。これはビューポートの小さい低価格のスマートフォン向けにコンテンツを作成する際にも重要です。このようなスマートフォンでは必要なスクロール回数が多く、ディスプレイの画質が低く、画面の応答性が低いためです。

これからインターネットを使用する数十億のユーザーの多くは、低価格の端末を使用します。このようなユーザーは、冗長なコンテンツのナビゲーションにデータ料金がかかることを好まず、コンテンツを母国語以外で読んでいる可能性もあります。テキストを簡潔にするには、文は短く、句読点は最小限に抑え、1 段落につき 5 行以下にして、見出しは 1 行に収めます。レスポンシブ対応テキストについて検討してください（たとえば、小さいビューポートでは短い見出しを使用します）。[ただし、これにはデメリットもあります](https://www.smashingmagazine.com/2012/02/ever-justification-for-responsive-text/)。

テキストに対してミニマリズムを心がけると、コンテンツのローカライズや国際化も容易になり、ソーシャル メディアでコンテンツが引用される可能性が高まります。

まとめ: 

* シンプルにする
* 見やすくする
* 要点を伝える


##  不要なコンテンツを省く

バイトサイズで見ると、ウェブページのデータ量は[増加する一方です](http://httparchive.org/trends.php#bytesTotal&reqTotal)。

[レスポンシブ デザインのテクニック](/web/fundamentals/design-and-ux/responsive/)を使用すると、小さいビューポートに合わせて異なるコンテンツを配信できますが、その前にテキスト、画像、その他のコンテンツを簡素化するほうが現実的です。

> ウェブのユーザーは一般的に行動指向的であり、ゆったりと腰掛けて良書から知識を吸収するよりも、今抱いている疑問に対する答えを「今すぐ」見つけようとします。
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

サイトにアクセスするユーザーが何を達成しようとしているのかをよく考えてください。

すべてのページ コンポーネントが、その目標の達成をサポートできるようになっていますか。

###  冗長なページ要素を削除する

[HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml) によると、平均的なウェブページでは、HTML ファイルはおよそ 70k 以上になり、 9 回を超えるリクエストが発生します。

多くの人気サイトではページあたり数千もの HTML 要素を使用しており、モバイルでもコードは数千行に及びます。HTML ファイルのサイズが大きすぎるからといって[ページの読み込みがさらに遅くなるとは限りません](http://jsbin.com/zofavunapo/1/edit?html,js,output)が、HTML のサイズが大きい場合、コンテンツが肥大している可能性があります。これは、.html ファイルのサイズが大きくなるほど、要素数、テキストのコンテンツ、またはその両方が多いことを意味するためです。

HTML の複雑さを軽減するとページが軽くなり、ローカライズや国際化に対応できるようになって、レスポンシブ デザインの計画やデバッグも容易になります。効率的な HTML を記述する方法の詳細については、[High performance HTML](https://samdutton.wordpress.com/2015/04/02/high-performance-html/) をご覧ください。

> アプリで目的を達成するまでにユーザーが実行するステップが 1 つ増えるたび、ユーザーの 20% を失うことになります。
>
>— [Gabor Cselle、Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

コンテンツについても同様です。できるだけ速やかに、ユーザーが求める情報を表示してください。

モバイルで、ただコンテンツを非表示にするという方法は望ましくありません。[コンテンツ パリティ](http://bradfrost.com/blog/mobile/content-parity/)を目指してください。モバイル ユーザーに最低限必要な機能を推測するという方針では、失敗する可能性があります。優先度の高いページ要素だけでもよいので、1 つのコンテンツに対して、さまざまなビューポートのサイズに合わせた別バージョンを複数作成します。

従来のシステムでは、従来のコンテンツに終わってしまうため、コンテンツ管理とワークフローについて検討してください。

###  テキストを簡素化する

ウェブをモバイルで表示する場合は、記述方法を変更する必要があります。シンプルに見やすくして、要点を明確にしてください。

###  冗長なイメージを削除する

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-images.png" alt="画像の転送サイズと画像のリクエスト数の増加を示す HTTP Archive のデータ" />
    <figcaption><a href="http://httparchive.org/trends.php#bytesImg&reqImg">HTTP Archive のデータ</a>によると、平均的なウェブページは画像のリクエストを 54 回発行します。</figcaption>
  </figure>
</div>

画像は美しく、楽しく、情報も豊富ですが、ページ内で一定の面積を占め、ページのデータ量やファイルのリクエスト数が増加する原因になります。[接続状況が悪くなるとさらに遅延します](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/)。また、画像のファイル リクエスト数があまりにも多いと、ウェブをモバイルで表示したときの問題が増加します。


<div style="clear:both;"></div>

<div class="attempt-right">
  <figure>
    <img src="imgs/http-archive-content-type-pie-chart.png" alt="コンテンツの種類別のページあたりの平均バイト数を示す HTTP Archive の円グラフ。約 60% を画像が占めている">
    <figcaption>画像はページのデータ量の 60% 以上を占めます。</figcaption>
  </figure>
</div>

画像は電池も消費します。画面に続いて、無線は電池を消耗する 2 番目の要因です。画像のリクエストが増加すると無線の使用量が増え、電池切れを引き起こします。画像のレンダリングだけでも電池を消費します。これは画像のサイズと数に比例します。Stanford のレポート、[Who Killed My Battery?](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf) をご覧ください。

イメージはなるべく使用しないでください。

以下の推奨事項をご確認ください。

* 画像を使わない、または控えめに使用することを検討してください。[テキストだけでも美しいデザインになります](https://onepagelove.com/tag/text-only)。「自分のサイトにアクセスするユーザーが達成したいことは何か。そのプロセスで画像が役立つか。」を検討してください。
* かつては、見出しなどのテキストをグラフィックで保存するのが一般的でした。このアプローチではビューポート サイズの変更にうまく対応できず、ページのデータ量が増えて遅延を引き起こします。テキストをグラフィック化すると、検索エンジンでテキストを検出することができないうえ、スクリーンリーダーやその他の支援技術を活用できません。できるだけ「実際の」テキストを使用してください。ウェブフォントや CSS によって、美しいタイポグラフィを表現できます。
* グラデーション、シャドウ、角丸、[背景のテクスチャ](http://lea.verou.me/css3patterns/){: .external }、[すべての最新ブラウザでサポートされる機能](http://caniuse.com/#search=shadows)を使用する際は、画像ではなく CSS を使用します。ただし、CSS が画像より優れているとしても、依然として[処理やレンダリングの負荷](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/)がかかります。特に、モバイルではそれが顕著になります。
* 背景画像はほとんどの場合、モバイルではうまく機能しません。小さいビューポートでは[メディア クエリを使用](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/)すると、背景画像の使用を避けることができます。
* スプラッシュ画面の画像の使用は避けてください。
* [UI アニメーションには CSS を使用します](/web/fundamentals/design-and-ux/animations/)。
* グリフについて理解を深め、画像の代わりに [Unicode のシンボルとアイコン](https://en.wikipedia.org/wiki/List_of_Unicode_characters)と、必要に応じてウェブフォントを使用してください。
* [アイコン フォント](http://weloveiconfonts.com/#zocial)の使用を検討します。アイコン フォントは無限に拡大できるベクター グラフィックで、1 つのフォントで画像セット一式をダウンロードできます（[こちらの注意事項](https://sarasoueidan.com/blog/icon-fonts-to-svg/)をご確認ください）。
* `<canvas>` 要素を使用すると、線、曲線、テキスト、その他の画像を用いて JavaScript で画像を作成できます。
* [インライン SVG や Data URI の画像](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/)は、ページのデータ量の削減にはつながりませんが、リソースのリクエスト数を削減することで遅延を短縮できます。インライン SVG は[モバイルおよびデスクトップのブラウザに幅広く対応](http://caniuse.com/#feat=svg-html5)しており、[最適化ツール](http://petercollingridge.appspot.com/svg-optimiser)によって SVG のサイズを大幅に削減できます。同様に、Data URI も[幅広くサポート](http://caniuse.com/datauri)されています。どちらも CSS でインライン化できます。
* GIF アニメーションではなく `<video>` の使用を検討してください。[video 要素はモバイルのすべてのブラウザで対応しています](http://caniuse.com/video)（Opera Mini を除く）。

詳細については、[画像の最適化](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)および[画像の除去と置換](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization#eliminating-and-replacing-images)をご覧ください。


##  さまざまなビューポート サイズで良好に動作するコンテンツの設計{: #viewport }

> "あくまで製品を作成するのであって、小さな画面向けに設計し直すわけではありません。移植するのではなく、優れたモバイル向けの製品を作成するのです。"

>
> - 『<a href="https://goo.gl/KBAXj0">Mobile Design and Development</a>』（Brian Fling 著）


優れたデザイナーは「モバイル向けに最適化」するのではなく、幅広いデバイスで動作するサイトをレスポンシブに構築することを考えます。テキストやその他のページ コンテンツの構成は、複数のデバイスで適切に表示するうえで重要です。"

これからオンラインを使い始める数十億のユーザーの多くは、低価格でビューポートが小さい端末を使用します。低解像度の 3.5 インチまたは 4 インチの画面でテキストを読むのは、なかなか大変です。

この 2 つを並べた写真です。

![ハイエンド端末と低価格のスマートフォンのディスプレイを比較した写真](imgs/devices-photo.jpg)

大きい画面では、小さいテキストも読むことができます。

小さい画面では、ブラウザでレイアウトは正しくレンダリングされていますが、ズームインしてもテキストを読むことができません。ディスプレイがぼやけて、「カラーキャスト」が発生し、白が適切に表示されず、コンテンツが読みづらくなっています。

###  モバイル向けのコンテンツをデザインする

幅広いビューポートを対象に構築するときは、レイアウトやグラフィックのほか、コンテンツについても配慮が必要です。[ダミー コンテンツではなく、実際のテキストや画像を使用してデザインしてください](http://uxmyths.com/post/718187422/myth-you-dont-need-the-content-to-design-a-website)。


> "コンテンツはデザインよりも重要です。コンテンツのないデザインはデザインではなく、ただの飾りです。"
>
> - Jeffrey Zeldman

* 最も重要なコンテンツをトップに配置します。[ユーザーは、F 字型パターンでウェブページを読む傾向がある](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)からです。
* ユーザーは目標を達成するためにサイトにアクセスします。その目標を達成するために求められているものは何かをよく検討し、それ以外のものはすべて排除します。ビジュアルおよびテキストの装飾、旧来のコンテンツ、過剰なリンク、その他の雑然としたものについては、厳しい目で見直してください。
* ソーシャルの共有アイコンによってレイアウトが煩雑になったり、そのコードが原因でページの読み込みが遅くなる場合があるため、注意してください。
* 端末のサイズを固定せず、[レスポンシブ レイアウト](/web/fundamentals/design-and-ux/responsive/)でコンテンツをデザインします。

###  コンテンツをテストする

ポイント:なによりもまず、**テスト**が重要です。

* Chrome DevTools やその他の[エミュレーション ツール](/web/fundamentals/performance/poor-connectivity/)を使用して、小さいビューポートで可読性を確認します。
* [低帯域幅および高レイテンシの条件でコンテンツをテストします](/web/fundamentals/performance/poor-connectivity/)。さまざまな接続シナリオでコンテンツを試してください。
* 低価格のスマートフォンで、コンテンツの読み取りと操作を試します。
* 友人や同僚に、アプリやサイトの試用を依頼します。
* 簡単なデバイス用テストラボを構築します。Google の Mini Mobile Device Lab の [GitHub リポジトリ](https://github.com/GoogleChrome/MiniMobileDeviceLab) に、独自のラボを構築する手順が記載されています。[OpenSTF](https://github.com/openstf/stf) は、複数の Android 端末でウェブサイトをテストするためのシンプルなウェブ アプリケーションです。

以下は、実際の OpenSTF の画面です。

[![OpenSTF のインターフェース](imgs/stf.png)](https://github.com/openstf/stf)

モバイル端末は、コミュニケーション、ゲーム、メディアに留まらず、コンテンツの利用や情報収集にますます使用されるようになっています。

このため、さまざまなデバイスに対応したレイアウト、インターフェース、インタラクションのデザインを検討する際は、コンテンツが幅広いビューポートで適切に表示されるようにコンテンツの内容を検討し、コンテンツの優先順位を決めることがますます重要になってきています。


##  データのコストを把握する

ウェブページは拡大の一途をたどっています。<br><br><a href="http://httparchive.org/trends.php#bytesTotal&reqTotal">HTTP Archive</a> によると、<a href="http://httparchive.org/about.php#listofurls">上位 100 万位までのサイト</a>における、ページのデータ量の平均は 2 MB を超えています。


ユーザーは、遅いまたはコストがかかると判断したサイトやアプリを避けるため、ページやアプリのコンポーネントの読み込みにかかるコストを把握しておくことが非常に重要です。

ページのデータ量を削減すると、収益性も高まります。[YouTube の Chris Zacharias](http://blog.chriszacharias.com/page-weight-matters) は、視聴ページのサイズを 1.2 MB から 250 KB まで削減したときに、その事実に気づきました。

> 以前は多数のユーザーが YouTube を利用できませんでした。それが突然、利用できるようになったのです。

つまり、ページのデータ量の削減は**新規市場開拓につながります**。

###  ページのデータ量を計算する{: #weight }

ページのデータ量を計算するツールは数多く存在します。Chrome DevTools の [Network] パネルにはすべてのリソースの合計サイズがバイト単位で表示されるため、アセットの種類ごとにデータ量を確認できます。ブラウザのキャッシュから取得されたアイテムを確認することもできます。

![リソースのサイズを示す Chrome DevTools の [Network] パネル](imgs/chrome-dev-tools.png)

Firefox やその他のブラウザでも同様のツールが提供されています。

[WebPagetest](http://webpagetest.org) では、最初のページと後続のページの読み込みをテストする機能を使用できます。[スクリプト](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting)を使用して（たとえば、サイトへのログインなどを）テストを自動化することができます。また、[RESTful API](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis) も使用できます。次の例（[developers.google.com/web](/web/) の読み込み）では、キャッシュに成功し、それ以降のページの読み込みでは追加のリソースの読み込みが不要になっています。

![ページへの最初のアクセスと以降のアクセスにおけるバイト単位の合計サイズを示す WebPagetest の結果](imgs/webpagetest-first-and-repeat.png)

WebPagetest では、MIME タイプ別にサイズとリクエストの詳細を見ることもできます。

![MIME タイプ別にリクエストとバイト単位のサイズを示す WebPagetest の円グラフ](imgs/webpagetest-requests-and-bytes-pie-charts.png)

###  ページの料金を計算する

多くのユーザーにとって、データはサイズやパフォーマンスに影響するだけでなく、コストが発生するものです。

サイト [What Does My Site Cost?](https://whatdoesmysitecost.com/){: .external } では、サイトの読み込みにかかるコストを見積もることができます。以下のヒストグラムは、[amazon.com](https://www.amazon.com/) の読み込みにかかる料金を示しています（プリペイド データプランを使用）。

![12 か国で amazon.com のホームページの読み込みにかかる推定データ料金](imgs/what-does-my-site-cost.png)

これは、収入と比較して安価かどうかについては考慮されていない点に注意してください。[blog.jana.com](https://blog.jana.com/2015/05/21/the-data-trap-affordable-smartphones-expensive-data/) のデータに、データ料金が示されています。

<table>
  <tr>
    <td></td>
    <td><strong>500 MB データプラン<br>の料金（USD）</strong></td>
    <td><strong>最低時給<br>（USD）</strong></td>
    <td><strong>500 MB データプランの価格<br>に相当する労働時間</strong></td>
  </tr>
  <tr>
    <td>インド</td>
    <td>$3.38</td>
    <td>$0.20</td>
    <td>17 時間</td>
  </tr>
  <tr>
    <td>インドネシア</td>
    <td>$2.39</td>
    <td>$0.43</td>
    <td>6 時間</td>
  </tr>
  <tr>
    <td>ブラジル</td>
    <td>$13.77</td>
    <td>$1.04</td>
    <td>13 時間</td>
  </tr>
</table>


ページのデータ量が問題になるのは、新興市場だけではありません。多くの国では、ユーザーはデータ量に上限のあるデータプランを利用しているため、重い、つまりコストがかかると感じたサイトやアプリは避けようとします。無制限の携帯電話ネットワークや WiFi データプランでも通常はデータ量に上限があり、それを超えるとブロックまたは制限されます。

まとめ: ページのデータ量はパフォーマンスや料金に影響します。[コンテンツの効率の最適化](/web/fundamentals/performance/optimizing-content-efficiency/)に、これらのコストを削減する方法が紹介されています。


{# wf_devsite_translation #}
