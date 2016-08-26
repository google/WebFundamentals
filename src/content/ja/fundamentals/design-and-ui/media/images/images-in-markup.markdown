---
title: "マークアップ内の画像"
description: "img 要素はコンテンツをダウンロードし、デコードしてレンダリングする高度な能力を備えているほか、最新のブラウザでは幅広い画像形式をサポートしています。"
updated_on: 2014-09-30
key-takeaways:
  img-in-markup:
    - 画像に相対サイズを使用することにより、不注意でコンテナからはみ出ることを防ぐ。
    - デバイスの特性に応じて異なる画像を指定（アート ディレクション）する場合は、<code>picture</code> 要素を使用する。
    - <code>img</code> 要素で <code>srcset</code> および <code>x</code> 記述子を使用して、ブラウザが最適な解像度の画像を選択する際のヒントを与える。
notes:
  picture-support:
    - "<code>picture</code> 要素はブラウザへの実装が開始されたばかりです。 現状では一部のブラウザでしか利用できませんが、十分な後方互換性があり、<a href='http://picturefill.responsiveimages.org/'>Picturefill によるポリフィル</a>（リンク先は英語）を利用できることから、この要素を使用することをおすすめします。 詳しくは、<a href='http://responsiveimages.org/#implementation'>ResponsiveImages.org</a>（英語）をご覧ください。"
  compressive:
    - 圧縮を使用する場合は、必要なメモリ容量やデコード処理が増加することに注意する。大きい画像をサイズ変更して小さい画面に収める処理は負荷が大きく、メモリと処理能力の両方が限られているローエンドのデバイスでは特にパフォーマンスが大きく低下する場合があります。
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple21
---

<p class="intro">
  <code>img</code> 要素はコンテンツをダウンロードし、デコードしてレンダリングする高度な能力を備えているほか、最新のブラウザでは幅広い画像形式をサポートしています。さまざまなデバイスに対応した画像の追加は、パソコン向けの場合と変わりません。多少の調整を加えるだけで優れたエクスペリエンスを構築できます。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.img-in-markup %}


## 画像に相対サイズを使用する

不注意で画像がビューポートからはみ出ることを防ぐために、画像の幅の指定では必ず相対的な単位を使用してください。たとえば、width: 50%; と指定すると、画像の幅が、その画像を含む要素（ビューポートや実際のピクセルのサイズではない）の幅の 50% になります。

CSS ではコンテンツをコンテナからオーバーフローさせることができるため、画像や他のコンテンツがはみ出さないよう、max-width: 100% の使用が必要となります。次に例を示します。

{% highlight css %}
img, embed, object, video {
  max-width: 100%;
}
{% endhighlight %}

img 要素の alt 属性を使用して、画像についてのわかりやすい説明を必ず追加してください。これらの説明でスクリーン リーダーなどの支援技術にコンテキストを提供することにより、サイトへのアクセスのしやすさが向上します。

## 高 DPI のデバイス向けに srcset で img の動作を拡張する

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>img</code> 要素で <code>srcset</code> 属性を使用して動作を拡張することで、特性の異なる各デバイスに複数の画像ファイルを簡単に配信できます。CSS ネイティブの <code>image-set</code> <a href="images-in-css.html#use-image-set-to-provide-high-res-images">CSS 関数</a>と同様に、<code>srcset</code> を使用して、ブラウザでデバイスの特性に応じて最適な画像を選択できます。たとえば、ディスプレイが 2x の場合は 2x の画像を使用したり、将来的には、デバイスが 2x でもネットワークが低速の場合は 1x の画像を使用する、といったことが可能になります。
    </p>
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo Pzc5Dly_jEM %}
  </div>
</div>

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x" ...>
{% endhighlight %}

srcset をサポートしていないブラウザでは、src 属性に指定されたデフォルトの画像ファイルが使用されます。このため、機能に関係なくあらゆるデバイスで表示できる 1x の画像を必ず含めることが重要です。srcset がサポートされている場合は、カンマ区切りで指定された複数の画像 / 条件のリストの解析後にリクエストが送出され、最適な画像のみがダウンロードされて表示されます。

この条件にはピクセル密度から幅や高さまでのあらゆる項目を指定できますが、現時点で十分にサポートされているのはピクセル密度のみです。現在の動作と将来的な機能のバランスを考慮し、この属性は 2x の画像の提供にのみ利用してください。

## picture を使用したレスポンシブ画像のアート ディレクション

デバイスの特性に基づく画像の変更（アート ディレクション）は、picture 要素を使用して行うことができます。<code>picture</code> 要素は、デバイスのサイズ、解像度、向きなどのさまざまな特性に基づいて複数のバージョンの画像を配信する、宣言型のソリューションを定義します。

<img class="center" src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

{% include shared/remember.liquid title="Important" list=page.notes.picture-support %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <p>
      <code>picture</code> 要素は、1 つの画像のソースが複数の解像度で存在する場合か、レスポンシブ デザインで特定の画面タイプに別の画像を表示するよう指示する場合に使用してください。<code>video</code> 要素と同様に、複数の <code>source</code> 要素を追加することによって、メディア クエリや画像形式に応じて個別の画像ファイルを指定することができます。
    </p>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    {% ytvideo QINlm3vjnaY %}
  </div>
</div>

{% include_code src=_code/media.html snippet=picture lang=html %}

上の例では、ブラウザの幅が 800px 以上の場合に、デバイスの解像度に応じて head.jpg か head-2x.jpg のいずれかが使用されます。ブラウザの幅が 450px～800px の場合は、デバイスの解像度に応じて head-small.jpg か head-small-2x.jpg のいずれかが使用されます。画面の幅が 450px より狭い場合や、picture 要素がサポートされていない場合の後方互換性では、ブラウザは代わりに img 要素をレンダリングします。このため、img 要素は必ず含める必要があります。

### 画像サイズを相対値で指定する

画像の最終的なサイズがわからない場合は、画像ソースに対して解像度の記述子を指定することが困難です。これは特に、ブラウザのサイズに応じて、ブラウザの幅に比例したサイズになるフルードな画像の場合に当てはまります。

画像のサイズと解像度を固定値で指定する代わりに、配信する各画像のサイズを、幅の記述子と画像要素のサイズで指定することにより、ブラウザ側で自動的に実際のピクセル密度を計算して最適な画像を選択してダウンロードすることができます。

{% include_code src=_code/sizes.html snippet=picture lang=html %}

上の例では、ビューポートの幅の半分（sizes="50vw"）の画像をレンダリングし、ブラウザ ウィンドウの大きさに関係なく、ブラウザの幅とデバイス ピクセル比に応じて、ブラウザに適切な画像を選択させることができます。この例でブラウザがどの画像を選択するかを、以下の表に示します。

<table class="mdl-data-table mdl-js-data-table">
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


### レスポンシブ画像におけるブレークポイントの効果

多くの場合、サイズや画像はサイトのレイアウトのブレークポイントによって変わる可能性があります。たとえば、狭い画面では画像をビューポートの幅全体に広げたほうがよいのに対し、広い画面では画像の占める部分を抑える必要があります。

{% include_code src=_code/breakpoints.html snippet=picture lang=html %}

上の例では、sizes 属性で複数のメディア クエリを使用して画像のサイズを指定しています。ブラウザの幅が 600px より広い場合は画像をビューポートの幅の 25% に、ブラウザの幅が 500px～600px の場合はビューポートの幅の 50%に、ブラウザの幅が 500px 未満の場合はビューポートの幅と同じになるように、それぞれ指定しています。


## 商品画像を拡大できるようにする

ユーザーは購入しようとしている商品を確認したいと求めます。ユーザーはショッピング サイトにおいて、商品画像を高解像度で拡大して詳細を確認できることを期待します。これを行えない場合、[調査の参加者](/web/fundamentals/principles/research-study.html)は不満を感じたとの研究結果が出ています。

<figure>
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="商品画像を拡大できる J. Crew のウェブサイト">
  <figcaption>商品画像を拡大できる J. Crew のウェブサイト。</figcaption>
</figure>

画像をタップして拡大できる適切な例として、J. Crew のサイトが挙げられます。一定時間後に非表示になるオーバーレイで画像をタップできることを説明し、画像をズームインして適切な詳細を見ることができます。


## その他の画像テクニック

### 圧縮画像

[圧縮画像
技術](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)（リンク先は英語）を使用すると、実際のデバイスの能力に関係なく、高圧縮の 2x 画像をあらゆるデバイスに配信できます。画像の種類や圧縮レベルによっては、画像の品質に変化がないように見える場合もありますが、ファイルサイズは大幅に削減されます。

{% link_sample _code/compressive.html %}
      例を表示する
{% endlink_sample %}

{% include shared/remember.liquid title="Important" list=page.remember.compressive %}

### JavaScript で画像を置き換える

JavaScript による画像の置き換えでは、デバイスの機能をチェックして「適切な処理」を行います。window.devicePixelRatio によるデバイス ピクセル比の判別や、画面の幅と高さの取得のほか、navigator.connection によるネットワーク接続状況の取得や疑似リクエストの発行も可能です。この情報をすべて収集した後、読み込む画像を決定できます。

この方法の大きな欠点として、JavaScript を使用するため、少なくとも先行するパーサーの処理が完了するまで画像が読み込まれないという問題があります。つまり、画像のダウンロードは、pageload イベントが発生するまで開始されません。また、ブラウザは 1x と 2x の両方の画像をダウンロードする可能性が高いため、ページの容量が増加します。



