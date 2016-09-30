project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 1 枚の写真は 1000 語にも匹敵します。画像すべてのページにおいて不可欠です。一方で、ダウンロードされるデータ量のほとんどを画像が占めることも少なくありません。レスポンシブ ウェブデザインでは、レイアウトだけでなく画像もデバイスの特性に応じて変えることができます。

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# 画像 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

1 枚の写真は 1000 語にも匹敵します。画像すべてのページにおいて不可欠です。一方で、ダウンロードされるデータ量のほとんどを画像が占めることも少なくありません。レスポンシブ ウェブデザインでは、レイアウトだけでなく画像もデバイスの特性に応じて変えることができます。


### レスポンシブ画像

レスポンシブ ウェブデザインでは、レイアウトだけでなく、コンテンツもデバイスの特性に応じて変えることができます。たとえば、高解像度（2x）のディスプレイで鮮明な画像を表示するには、高解像度のグラフィックが必要です。幅が 50% の画像は、ブラウザの幅が 800px の場合は適切に表示されますが、画面幅が狭い携帯端末では画像が占めるスペースが大きすぎるほか、狭い画面に合わせてスケールダウンしても送信されるデータ量は変わりません。

### アート ディレクション

<img class="center" src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

サイズの変更、トリミング、画像全体の置き換えなど、画像の大幅な変更が必要となる場合もあります。このような画像の変更は通常、アート ディレクションと呼ばれます。詳しい例は、[responsiveimages.org/demos/](http://responsiveimages.org/demos/)（英語）をご覧ください。


{% include "web/_shared/udacity/ud882.html" %}

<div class="clearfix"></div>


## マークアップ内の画像

<code>img</code> 要素はコンテンツをダウンロードし、デコードしてレンダリングする高度な能力を備えているほか、最新のブラウザでは幅広い画像形式をサポートしています。さまざまなデバイスに対応した画像の追加は、パソコン向けの場合と変わりません。多少の調整を加えるだけで優れたエクスペリエンスを構築できます。



### TL;DR {: .hide-from-toc }
- 画像に相対サイズを使用することにより、不注意でコンテナからはみ出ることを防ぐ。
- デバイスの特性に応じて異なる画像を指定（アート ディレクション）する場合は、<code>picture</code> 要素を使用する。
- <code>img</code> 要素で <code>srcset</code> および <code>x</code> 記述子を使用して、ブラウザが最適な解像度の画像を選択する際のヒントを与える。



### 画像に相対サイズを使用する

不注意で画像がビューポートからはみ出ることを防ぐために、画像の幅の指定では必ず相対的な単位を使用してください。たとえば、width: 50%; と指定すると、画像の幅が、その画像を含む要素（ビューポートや実際のピクセルのサイズではない）の幅の 50% になります。

CSS ではコンテンツをコンテナからオーバーフローさせることができるため、画像や他のコンテンツがはみ出さないよう、max-width: 100% の使用が必要となります。次に例を示します。


    img, embed, object, video {
      max-width: 100%;
    }
    

img 要素の alt 属性を使用して、画像についてのわかりやすい説明を必ず追加してください。これらの説明でスクリーン リーダーなどの支援技術にコンテキストを提供することにより、サイトへのアクセスのしやすさが向上します。

### 高 DPI のデバイス向けに srcset で img の動作を拡張する

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<code>img</code> 要素で <code>srcset</code> 属性を使用して動作を拡張することで、特性の異なる各デバイスに複数の画像ファイルを簡単に配信できます。CSS ネイティブの <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS 関数</a>と同様に、<code>srcset</code> を使用して、ブラウザでデバイスの特性に応じて最適な画像を選択できます。たとえば、ディスプレイが 2x の場合は 2x の画像を使用したり、将来的には、デバイスが 2x でもネットワークが低速の場合は 1x の画像を使用する、といったことが可能になります。

<div class="clearfix"></div>



    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

srcset をサポートしていないブラウザでは、src 属性に指定されたデフォルトの画像ファイルが使用されます。このため、機能に関係なくあらゆるデバイスで表示できる 1x の画像を必ず含めることが重要です。srcset がサポートされている場合は、カンマ区切りで指定された複数の画像 / 条件のリストの解析後にリクエストが送出され、最適な画像のみがダウンロードされて表示されます。

この条件にはピクセル密度から幅や高さまでのあらゆる項目を指定できますが、現時点で十分にサポートされているのはピクセル密度のみです。現在の動作と将来的な機能のバランスを考慮し、この属性は 2x の画像の提供にのみ利用してください。

### picture を使用したレスポンシブ画像のアート ディレクション

デバイスの特性に基づく画像の変更（アート ディレクション）は、picture 要素を使用して行うことができます。<code>picture</code> 要素は、デバイスのサイズ、解像度、向きなどのさまざまな特性に基づいて複数のバージョンの画像を配信する、宣言型のソリューションを定義します。

<img class="center" src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">


Note: <code>picture</code> 要素はブラウザへの実装が開始されたばかりです。 現状では一部のブラウザでしか利用できませんが、十分な後方互換性があり、<a href='http://picturefill.responsiveimages.org/'>Picturefill によるポリフィル</a>（リンク先は英語）を利用できることから、この要素を使用することをおすすめします。 詳しくは、<a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>（英語）をご覧ください。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<code>picture</code> 要素は、1 つの画像のソースが複数の解像度で存在する場合か、レスポンシブ デザインで特定の画面タイプに別の画像を表示するよう指示する場合に使用してください。<code>video</code> 要素と同様に、複数の <code>source</code> 要素を追加することによって、メディア クエリや画像形式に応じて個別の画像ファイルを指定することができます。

<div class="clearfix"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

上の例では、ブラウザの幅が 800px 以上の場合に、デバイスの解像度に応じて head.jpg か head-2x.jpg のいずれかが使用されます。ブラウザの幅が 450px～800px の場合は、デバイスの解像度に応じて head-small.jpg か head-small-2x.jpg のいずれかが使用されます。画面の幅が 450px より狭い場合や、picture 要素がサポートされていない場合の後方互換性では、ブラウザは代わりに img 要素をレンダリングします。このため、img 要素は必ず含める必要があります。

#### 画像サイズを相対値で指定する

画像の最終的なサイズがわからない場合は、画像ソースに対して解像度の記述子を指定することが困難です。これは特に、ブラウザのサイズに応じて、ブラウザの幅に比例したサイズになるフルードな画像の場合に当てはまります。

画像のサイズと解像度を固定値で指定する代わりに、配信する各画像のサイズを、幅の記述子と画像要素のサイズで指定することにより、ブラウザ側で自動的に実際のピクセル密度を計算して最適な画像を選択してダウンロードすることができます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

上の例では、ビューポートの幅の半分（sizes="50vw"）の画像をレンダリングし、ブラウザ ウィンドウの大きさに関係なく、ブラウザの幅とデバイス ピクセル比に応じて、ブラウザに適切な画像を選択させることができます。この例でブラウザがどの画像を選択するかを、以下の表に示します。

<table>
    <thead>
    <tr>
      <th data-th="Browser width">ブラウザの幅</th>
      <th data-th="Device pixel ratio">デバイス ピクセル比</th>
      <th data-th="Image used">使用される画像</th>
      <th data-th="Effective resolution">実際の解像度</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


#### レスポンシブ画像におけるブレークポイントの効果

多くの場合、サイズや画像はサイトのレイアウトのブレークポイントによって変わる可能性があります。たとえば、狭い画面では画像をビューポートの幅全体に広げたほうがよいのに対し、広い画面では画像の占める部分を抑える必要があります。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

上の例では、sizes 属性で複数のメディア クエリを使用して画像のサイズを指定しています。ブラウザの幅が 600px より広い場合は画像をビューポートの幅の 25% に、ブラウザの幅が 500px～600px の場合はビューポートの幅の 50%に、ブラウザの幅が 500px 未満の場合はビューポートの幅と同じになるように、それぞれ指定しています。


### 商品画像を拡大できるようにする

ユーザーは購入しようとしている商品を確認したいと求めます。ユーザーはショッピング サイトにおいて、商品画像を高解像度で拡大して詳細を確認できることを期待します。これを行えない場合、[調査の参加者](/web/fundamentals/principles/research-study)は不満を感じたとの研究結果が出ています。

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="商品画像を拡大できる J. Crew のウェブサイト">
  <figcaption>商品画像を拡大できる J. Crew のウェブサイト。</figcaption>
</figure>

画像をタップして拡大できる適切な例として、J. Crew のサイトが挙げられます。一定時間後に非表示になるオーバーレイで画像をタップできることを説明し、画像をズームインして適切な詳細を見ることができます。


### その他の画像テクニック

#### 圧縮画像

[圧縮画像
技術](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)（リンク先は英語）を使用すると、実際のデバイスの能力に関係なく、高圧縮の 2x 画像をあらゆるデバイスに配信できます。画像の種類や圧縮レベルによっては、画像の品質に変化がないように見える場合もありますが、ファイルサイズは大幅に削減されます。

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/compressive.html">      例を表示する</a>


Note: 圧縮を使用する場合は、必要なメモリ容量やデコード処理が増加することに注意する。大きい画像をサイズ変更して小さい画面に収める処理は負荷が大きく、メモリと処理能力の両方が限られているローエンドのデバイスでは特にパフォーマンスが大きく低下する場合があります。

#### JavaScript で画像を置き換える

JavaScript による画像の置き換えでは、デバイスの機能をチェックして「適切な処理」を行います。window.devicePixelRatio によるデバイス ピクセル比の判別や、画面の幅と高さの取得のほか、navigator.connection によるネットワーク接続状況の取得や疑似リクエストの発行も可能です。この情報をすべて収集した後、読み込む画像を決定できます。

この方法の大きな欠点として、JavaScript を使用するため、少なくとも先行するパーサーの処理が完了するまで画像が読み込まれないという問題があります。つまり、画像のダウンロードは、pageload イベントが発生するまで開始されません。また、ブラウザは 1x と 2x の両方の画像をダウンロードする可能性が高いため、ページの容量が増加します。

## CSS 内での画像



CSS の background プロパティを使用して、要素に複雑な画像を追加したり、複数の画像を簡単に追加したり、画像を反復させたりすることができます。background プロパティをメディア クエリと組み合わせると、画面の解像度やビューポートのサイズなどの条件に基づいて選択的に画像を読み込むなどの高度な処理が可能です。



### TL;DR {: .hide-from-toc }
- ディスプレイの特性に合った最適な画像を使用し、画面サイズ、デバイスの解像度、ページ レイアウトを考慮する。
- メディア クエリで <code>min-resolution</code> と <code>-webkit-min-device-pixel-ratio</code> を使用し、高 DPI ディスプレイの場合は CSS の <code>background-image</code> プロパティを変更する。
- マークアップ内の 1x の画像に加えて、srcset を使用して高解像度の画像を提供する。
- JavaScript による画像置き換えを使用する場合や、低解像度のデバイスに高圧縮の高解像度画像を配信する場合は、パフォーマンスへの影響を検討する。


### メディア クエリを使用して画像の選択的な読み込みやアート ディレクションを行う

メディア クエリは、ページ レイアウトの変更だけでなく、ビューポートの幅に応じた画像の選択的な読み込みやアート ディレクションの適用などにも利用できます。

たとえば、以下の例では、小さい画面の場合は small.png のみがダウンロードされてコンテンツの div に適用されるのに対し、大きい画面の場合は background-image: url(body.png) が body に、background-image: url(large.png) がコンテンツの div にそれぞれ適用されます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

### image-set を使用して高解像度の画像を表示する

CSS の image-set() 関数を使用して background プロパティの動作を拡張することで、特性の異なる各デバイス向けに複数の画像ファイルを簡単に配信できます。これを利用して、ブラウザでデバイスの特性に応じて最適な画像を選択できます。たとえば、ディスプレイが 2x の場合は 2x の画像を使用する、デバイスが 2x でもネットワークが低速の場合は 1x の画像を使用する、といったことが可能です。


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

適切な画像を読み込むほかに、ブラウザではスケーリングも
適宜実施します。つまり、ブラウザでは 2x の画像のサイズは 1x の画像の 2 倍大きいと仮定し、2x の画像を係数 2 でスケールダウンして、ページ上で同じサイズに見えるようにします。

image-set() への対応は始まったばかりで、現在は Chrome と Safari のみで -webkit のベンダー プレフィックス付きでサポートされています。image-set() がサポートされていない場合の代替画像を含める場合も注意が必要です。以下を例に説明します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

上の例では、image-set() をサポートしているブラウザには適切なアセットが読み込まれ、それ以外の場合は 1x のアセットにフォールバックします。ただし、image-set() をサポートするブラウザは少ないため、ほとんどのブラウザでは 1x のアセットを読み込む、という点に注意してください。

### メディア クエリを使用して高解像度の画像の表示やアート ディレクションを行う

メディア クエリで[デバイス ピクセル比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)（リンク先は英語）に基づいたルールを作成して、2x のディスプレイと 1x のディスプレイにそれぞれ別の画像を指定できます。


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox、Opera では標準の (min-resolution: 2dppx) という記述をサポートしていますが、Safari と Android ブラウザでは dppx の単位を付けない古いベンダー プレフィックスの構文を使用する必要があります。これらのスタイルはデバイスがメディア クエリに一致する場合にのみ読み込まれること、および、基本となるスタイルを指定する必要があることに注意してください。この方法には、ブラウザが解像度を条件とするメディア クエリをサポートしていない場合でも何らかの画像が確実にレンダリングされる、というメリットもあります。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

また、min-width 構文を使用して、ビューポートのサイズに応じた代替画像を表示することもできます。この方法には、メディア クエリに一致しなければ画像がダウンロードされないというメリットがあります。たとえば、以下の bg.png はブラウザの幅が 500px 以上ある場合にのみダウンロードされて body に適用されます。


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
   
## アイコンに SVG を使用する

ページにアイコンを追加する際は、可能な限り SVG のアイコンを使用するか、場合によっては Unicode 文字を使用します。

### TL;DR {: .hide-from-toc }
- ラスター画像ではなく、SVG か Unicode のアイコンを使用する。


### シンプルなアイコンを Unicode に置き換える

多くのフォントではさまざまな Unicode 記号をサポートしており、画像の代わりにこれらの記号を利用できます。画像とは異なり、Unicode フォントは劣化なしでスケーリングできるため、画面上でのサイズに関係なく鮮明に表示されます。

通常の文字セット以外に、Unicode には数字に準じるもの（&#8528;）、矢印（&#8592;）、数学記号（&#8730;）、幾何学模様（&#9733;）、制御機能用記号（&#9654;）、点字図形（&#10255;）、音楽記号（&#9836;）、ギリシャ文字（&#937;）、チェスの駒（&#9822;）などの記号が含まれています。

Unicode 文字は、HTML エンティティと同じように「&#XXXX」の形式で入力できます。「XXXX」には Unicode 文字の番号を指定します。次に例を示します。


    あなたはスーパー&#9733;です
    

あなたはスーパー&#9733;です

### 複雑なアイコンを SVG に置き換える
複雑なアイコンを使う必要がある場合は、SVG アイコンを使用します。SVG アイコンは一般に軽量で使いやすいほか、CSS でスタイルを設定できます。SVG には、ラスター画像と比較して次のような数多くのメリットがあります。

* ベクター グラフィックであるため、無限にスケーリングできます。
* 色、影、透明度、アニメーションなどの CSS 効果を直接適用できます。
* SVG 画像はドキュメントの行内に直接含めることができます。
* セマンティックです。
* 適切な属性の使用により、ユーザー補助にも対応できます。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

### アイコン フォントの使用には注意が必要

アイコン フォントは使いやすく、広く利用されていますが、SVG アイコンと比較するといくつか欠点があります。

* ベクター グラフィックであるため無限にスケーリングできますが、アンチエイリアス処理のためアイコンの輪郭が不鮮明になる場合があります。
* CSS によるスタイル設定に制限があります。
* line-height や letter-spacing などの設定によっては、ピクセル単位での完全な位置指定が難しい場合があります。
* セマンティックではないため、スクリーン リーダーなどの支援技術での利用が難しい場合があります。
* 使用範囲を適切に指定しないと、一部のアイコンを使用するためだけにファイルサイズが大きくなる場合があります。


<img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="フォント アイコンに FontAwesome を使用したページの例。">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto"%}
</pre>

[Font Awesome](http://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/)、[GLYPHICONS](http://glyphicons.com/) など、有料および無料のアイコン フォントが数多く提供されています（リンク先はすべて英語）。

HTTP リクエストやファイルサイズの増加とアイコンの必要性を必ず比較検討してください。たとえば、必要なアイコンの数が少なければ、画像や画像ストライプを使用したほうが良い場合もあります。


## 画像を最適化してパフォーマンスを向上させる



画像は、ダウンロードするデータ量のほとんどを占めることが多く、また、ページ上の面積の多くを占めることもよくあります。そのため、画像の最適化によって、かなりのデータ量を節約してウェブサイトのパフォーマンスを向上できる場合が少なくありません。ブラウザでダウンロードする必要のあるデータが減れば、クライアントの帯域幅の競合も減るため、すべてのアセットを素早くダウンロードして表示できるようになります。


### TL;DR {: .hide-from-toc }
- 画像形式は無作為に選択せず、利用可能な各形式を理解したうえで最適な形式を使用する。
- ワークフローに画像最適化ツールと圧縮ツールを組み込み、ファイルのサイズを小さくする。
- 利用頻度の高い画像をスプライト画像に置くことで、HTTP リクエストの回数を減らす。
- ページの初期読み込み時間を短縮して初期のページ容量を削減するために、スクロールして画像がビューに表示された時点で読み込むようにすることを検討する。


### 適切な形式を選ぶ

画像については、[ベクター画像](https://en.wikipedia.org/wiki/Vector_graphics)と[ラスター画像](https://en.wikipedia.org/wiki/Raster_graphics)の 2 種類を検討する必要があります。ラスター画像では、適切な圧縮形式（GIF、PNG、JPG など)を選ぶことも必要です。

**ラスター画像**とは、独立したドットやピクセルのグリッドとして表現される、写真などの画像です。ラスター画像は通常、カメラやスキャナで作成されますが、ブラウザ内で canvas 要素を使用して作成することもできます。画像サイズが大きくなると、ファイルのサイズも大きくなります。ラスター画像は元のサイズよりも大きくスケーリングすると不鮮明になるため、ブラウザ側で欠落しているピクセルを推測して補正する必要があります。

**ベクター画像**（ロゴやラインアートなど）は、曲線、直線、形状、塗りつぶし色のセットで定義されます。ベクター画像は、Adobe Illustrator や Inkscape などのプログラムを使用して作成され、[SVG](http://css-tricks.com/using-svg/)（リンク先は英語）などのベクター形式で保存されます。ベクター画像はシンプルなプリミティブで構成されているため、ファイルサイズを変えることなく、品質を低下させずにスケーリングできます。

適切な形式の選択にあたっては、画像の起源（ラスターまたはベクター）とコンテンツ（色、アニメーション、テキストなど）の両方を考慮することが重要です。すべての画像タイプに対応できる形式は存在しません。各形式にはそれぞれ長所と短所があります。

適切な形式を選ぶ際は、まず次のガイドラインを参考にします。

* 写真画像には JPG を使用します。
* ベクターアートや無地のグラフィック（ロゴやラインアートなど）には SVG を使用します。
  ベクターアートを利用できない場合は、WebP か PNG を使用します。
* GIF ではなく PNG を使用します。これは、PNG のほうが使用できる色数が多く、圧縮率も優れているためです。
* 長いアニメーションには、画質に優れユーザーが再生を制御できる <video> の使用を検討します。

### ファイルサイズを小さくする

画像ファイルのサイズは、保存後に後処理を行うことで大幅に削減できます。画像圧縮用のツールには、可逆と非可逆、オンライン、GUI、コマンドライン用など数多くのツールがあります。可能であれば、ワークフローにおける画像の最適化作業を自動化することをおすすめします。

JPG および PNG ファイルで画質を損なわずに、さらに可逆の圧縮を行うことのできるツールがいくつかあります。JPG の場合は、[jpegtran](http://jpegclub.org/) または [jpegoptim](http://freshmeat.net/projects/jpegoptim/)（Linux でのみ利用可能、--strip-all オプションを付けて実行）を利用できます（リンク先はすべて英語）。PNG の場合は、[OptiPNG](http://optipng.sourceforge.net/) または [PNGOUT](http://www.advsys.net/ken/util/pngout.htm) を利用できます（リンク先はすべて英語）。

### 画像スプライトを使用する

CSS スプライトは、複数の画像を 1 つの「スプライト シート」画像にまとめる手法です。個々の画像を使用するには、要素（スプライト シート）の背景画像とオフセットを指定して目的のパーツを表示します。

<a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/design-and-ui/media/images/image-sprite.html"><img src="img/sprite-sheet.png" class="center" alt="例で使用されている画像スプライト シート"></a>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

画像スプライトを使用すると、複数の画像を取得するために必要なダウンロードの数を減らせるメリットがありますが、キャッシュを有効にしておく必要があります。

### 遅延読み込みの使用を検討する

遅延読み込みを使用すると、未表示の部分に多数の画像を含んだ長いページの読み込みを大幅に短縮できます。必要に応じて画像を読み込むか、メイン コンテンツの読み込みとレンダリングの完了後に画像を読み込むことで時間を短縮します。遅延読み込みを使用すると、パフォーマンスの向上だけでなく、無限にスクロールするページの作成も可能になります。

無限にスクロールするページを作成する場合、コンテンツは表示される時点で読み込まれるため、検索エンジンがそのコンテンツを認識できない場合があることに注意する必要があります。また、ユーザーがフッターに掲載されている情報を探している場合、新しいコンテンツが常に読み込まれるため、フッターをなかなか表示できない可能性があります。

## 可能な限り画像を使用しない


最適な画像は、実際には画像でなくてもよいという場合もあります。可能であれば、同じ機能や類似した機能を提供する、ブラウザのネイティブ機能を使用してください。従来画像が必要であった視覚効果を、ブラウザで生成できます。これにより、ブラウザで画像ファイルを個別にダウンロードする必要がなくなるほか、不適切にスケーリングされた画像の表示を防止できます。アイコンは、Unicode やアイコン専用フォントを使用して表示できます。




### TL;DR {: .hide-from-toc }
- 影、グラデーション、角丸などには可能な限り画像の使用を避け、代わりにブラウザの機能を利用します。


### テキストは画像に埋め込まずマークアップ内に配置する

可能な限り、テキストはテキスト形式にする必要があります。画像に埋め込む（たとえば、見出しに画像を使用する、電話番号や住所などの連絡先情報を画像に直接含めるなど）ことは避けてください。画像に埋め込むと、ユーザーが情報をコピーして貼り付けられなくなり、スクリーン リーダーも情報にアクセスできなくなるほか、レスポンシブにできなくなります。テキストはマークアップ内に配置し、必要な場合はウェブフォントを使用して所要のスタイルを適用してください。

### CSS を使用して画像を置き換える

最近のブラウザでは、従来は画像を必要としていたスタイルを、CSS の機能を使用して実現できます。たとえば、<code>background</code> プロパティを使用して複雑なグラデーションを、<code>box-shadow</code> プロパティを使用して影を、<code>border-radius</code> プロパティを使用して角丸を作成できます。

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

これらの手法の使用はレンダリング サイクルを必要とするため、携帯端末ではパフォーマンスに影響する可能性があります。使用しすぎると、CSS 化で得られるメリットが失われるほか、パフォーマンスが低下する可能性もあります。








