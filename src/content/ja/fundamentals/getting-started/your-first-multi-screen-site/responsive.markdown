---
title: "レスポンシブにする"
description: "ウェブは小さな携帯端末から大きなテレビまで、さまざまな画面サイズのデバイスからアクセスできます。これらすべてのデバイスに対応したサイトの構築方法について学びましょう。"
key-takeaways:
  make-responsive:
    - 必ずビューポートを使用する。
    - 最初は必ず狭いビューポートから作業を始め、徐々に大きなサイズへと進む。
    - コンテンツを適合させる必要がある場合は、ブレークポイントを基準として用いる。
    - レイアウトについて、複数のメジャー ブレークポイント間にわたるハイレベルのビジョンを作成する。
translators:
  - agektmr
related-guides:
  responsive:
    -
      title: ビューポートを設定する
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "レスポンシブなウェブデザイン"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: コンテンツのサイズをビューポートに合わせる
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "レスポンシブなウェブデザイン"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: メディア クエリを使用する
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "レスポンシブなウェブデザイン"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: レイアウトのパターン
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "レイアウトのパターン"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: 大部分がフルードなレイアウト
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "レスポンシブなウェブデザイン"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "高 DPI のデバイス向けに srcset で img の動作を拡張する"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "画像"
        href: media/images/
    - 
      title: "メディア クエリを使用して高解像度の画像やアート ディレクションを提供する"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "画像"
        href: media/images/

notes:
  styling:
    - ブランドのガイドラインに合った色、パディング、フォントのスタイル設定を含む、一連のスタイルを適用済みです。
  not-all-at-once:
    - すべての要素を一度に移動する必要はありません。必要に応じて細かい調整を加えることができます。
updated_on: 2014-04-23
---

<p class="intro">
  ウェブは小さな携帯端末から大きなテレビまで、さまざまな画面サイズのデバイスからアクセスできます。各デバイスにはそれぞれのメリットと制約があります。ウェブデベロッパーは、あらゆるデバイスに対応させることが求められます。
</p>

{% include shared/toc.liquid %}

複数の画面サイズやデバイスの種類に対応できるサイトを構築します。[前の記事]({{page.previousPage.relative_url}})では、ページの情報アーキテクチャを策定し、基本構造を作成しました。
このガイドでは、コンテンツを含んだページの基本構造について取り上げ、さまざまな画面サイズに対応するレスポンシブな洗練されたページへと変えます。

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="コンテンツ">
    <figcaption>{% link_sample _code/content-without-styles.html %} コンテンツと構造 {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} 最終的なサイト {% endlink_sample %} </figcaption>
  </figure>
</div>

ウェブ開発におけるモバイル ファーストの原則に従い、携帯端末のような狭いビューポートから作業を開始し、まず狭いビューポート用のエクスペリエンスを構築します。
そのうえで、より大きなデバイスのクラスへとスケールを拡大します。
具体的には、ビューポートの幅を広げ、デザインとレイアウトの外観が適切かどうかを判断していきます。

これまでの作業で、コンテンツの表示方法を定めたハイレベルのデザインをいくつか作成しました。ここでは、ページをそれらの各レイアウトに合わせる必要があります。
コンテンツが画面サイズに合っているかを基準に、ブレークポイント（レイアウトとスタイルが変わるポイント）をどこに設定するかを決めていくことで、各レイアウトをページに適合させていきます。

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## ビューポートを追加します

基礎段階のページでも、必ず meta viewport タグを含める**必要があります**。
ビューポートは、マルチデバイス対応サイトの構築に必要な最重要コンポーネントです。
ビューポートがないと、サイトは携帯端末上で正しく表示されません。

ビューポートは、画面に収めるためにページをスケーリングする必要があることをブラウザに通知します。ビューポートでページの表示を制御するために指定できる設定項目は数多くありますが、デフォルトとして、次のように設定することをおすすめします。

{% include_code src=_code/viewport.html snippet=viewport %}

ビューポートはドキュメントの head 部に配置します。宣言が必要なのは 1 回のみです。

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## シンプルなスタイリングを適用します

今回の商品と企業では厳密なブランディングとフォントのガイドラインが既に存在し、スタイルガイドとして提供されています。

### スタイルガイド

スタイルガイドを利用することで、ページの視覚表現の概要を理解できるほか、デザイン全体で一貫性を確実に保つことができます。

#### 色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### スタイル用画像を追加します

前のガイドでは「コンテンツ画像」と呼ばれる画像を追加しました。これらの画像は、商品のストーリーを伝えるうえで重要なものです。スタイル用画像は、主要コンテンツの一部として必要な画像ではなく、視覚的な効果を加えたり、ユーザーをコンテンツの特定部分に注目させるために用いられます。

スタイル用画像のわかりやすい例としては、「サイトの一面」のコンテンツのヘッドライン画像があります。商品の詳細情報へとユーザーを誘導する目的でヘッドライン画像が使用されていることがよくあります。

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="デザインされたサイト">
</div>

スタイル用画像は簡単に追加できます。今回の例では、ヘッドラインの背景にスタイル用画像を使用し、簡単な CSS で画像を適用します。

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

コンテンツよりも目立たないよう、ぼかしの入ったシンプルな背景画像を選び、要素全体にフィット（cover）するよう設定しました。これにより、画像は常に正しいアスペクト比を保ちつつ画面いっぱいに表示されます。

<br style="clear: both;">

## あなたの最初のブレークポイントを設定します

幅が 600px 近くになると、デザインの見栄えが悪くなり始めます。今回の例では、行の長さが 10 語（読みやすい適切な長さ）を超えるため、これを変更する必要があります。

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/firstbreakpoint.mov">動画をダウンロードしてください</a>。
  </p>
</video>

画面に合うよう要素を再配置する機会となることから、600px は最初のブレークポイントの作成に適したサイズと思われます。ブレークポイントは、[メディア クエリ]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)というテクノロジーを使用することで作成できます。

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

大きな画面の場合はより多くのスペースがあるため、コンテンツをより柔軟な方法で表示できます。

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

今回の商品ページでは、次の作業が必要と考えられます。

*  デザインの最大幅を抑制する。
*  要素のパディングを変更し、テキストのサイズを小さくする。
*  フォームを移動し、ヘッドラインのコンテンツの横に回り込ませる。
*  動画をコンテンツに回り込ませる。
*  画像のサイズを縮小し、見栄えよく並べて表示する。

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## デザインの最大幅を抑制する

主なレイアウトを狭いビューポートと広いビューポートの 2 つのみとしたことで、構築のプロセスが大幅に簡略化されています。

また、狭いビューポート上に余白なしのセクションを作成することとしましたが、これらのセクションは広いビューポートでも余白なしのままとなります。このため、幅の極めて広い画面上でテキストや段落が横に長い 1 つの行になってしまわないよう、画面の最大幅を制限する必要があります。この制限を行うサイズを 800px 付近とすることにしました。

これを行うには、要素の幅を制限して中央揃えにする必要があります。各主要セクションを格納するコンテナを作成して、margin: 
auto を適用する必要があります。これにより、画面が大きくなってもコンテンツを最大幅 800px で中央揃えのままにすることができます。

コンテナには、次のような形式のシンプルな div を使用します。

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## パディングを変更してテキストのサイズを小さくする

狭いビューポートでは、コンテンツの表示スペースがあまり広くないため、画面に収まるように文字のサイズや太さを大幅に減らすことがよくあります。

大きいビューポートでは、ユーザーがさらに大きい画面を使用する可能性を考慮する必要があります。コンテンツを読みやすくするには、文字のサイズや太さを増やすことができるほか、パディングを変更して個々の領域を区別しやすくこともできます。

今回の商品ページでは、セクションの各要素のパディングを幅の 5% に設定することで、パディングを増やします。また、各セクションの見出しのサイズも大きくします。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## 広いビューポートに要素を適合させる

狭いビューポートでは、直線的にコンテンツを積み重ねて表示しています。各主要セクションとそこに含まれるコンテンツは、上から下へ順に表示されます。

広いビューポートでは、より多くのスペースを使用できるため、大きな画面に適した方法でコンテンツを表示できます。これを今回の商品ページに当てはめると、IA に従って次のように変更できます。

*  フォームをヘッドラインの情報の横に回り込ませる。
*  動画を主な特徴の箇条書きの右側に配置する。
*  画像をタイル表示する。
*  表を大きくする。

### フォーム要素を回り込ませる

狭いビューポートでは、画面上に要素を適切に配置するために使用できる横方向のスペースがそれほど多くありません。

横方向の画面スペースを有効利用するために、ヘッドラインのコンテンツを直線的に配置せずに、フォームとリストが隣り合わせになるよう移動させる必要があります。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/floatingform.mov">動画をダウンロードしてください</a>。
  </p>
</video>

### 動画要素を回り込ませる

狭いビューポートのインターフェースでは、動画は画面幅いっぱいになるようにデザインされており、主な特徴のリストの後に配置されています。広いビューポートでは、特徴のリストの後ろに動画を配置すると、サイズが拡大されすぎて見づらくなります。

広いビューポートでは、動画要素を狭いビューポートでの縦に表示するフローから外して、コンテンツの箇条書きリストの隣に表示する必要があります。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### 画像をタイル表示する

狭いビューポート（通常は携帯端末）のインターフェースでは、画像は画面幅いっぱいで縦に連けて表示するよう設定されています。この設定では、広いビューポートでは画像がうまくスケーリングされません。

画像を広いビューポートで正しく表示するために、画像をコンテナの幅の 30% にスケーリングして、（狭いビューでの縦方向ではなく）横方向に配置するよう設定します。また、border-radius と box-shadow を追加して、画像の見栄えを向上させます。

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### DPI に応じて画像をレスポンシブにする

画像を使用する際は、ビューポートのサイズとディスプレイの解像度を考慮してください。

ウェブは元来 96dpi の画面向けに作成されています。ノートパソコンにおける Retina クラスのディスプレイや携帯端末の登場により、画面のピクセル密度は大幅に向上しました。そのため、96dpi 向けにエンコードされた画像は、解像度の高いデバイスでは見栄えがひどく低下することも少なくありません。

この問題には、まだあまり普及していない解決策があります。
これに対応しているブラウザでは、高密度のディスプレイにおいて高密度の画像を表示できます。

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### 表

狭いビューポートのデバイスで表を見やすく表示することは容易ではないため、特別な配慮が必要です。

狭いビューポートでは、行の見出しを 1 つの列、行のデータセルをもう 1 つの列にして、見出しとデータの 2 行分の情報を 2 つの列で表示した縦長の表にすることをおすすめします。

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/responsivetable.mov">動画をダウンロードしてください</a>。
  </p>
</video>

今回のサイトでは、表のコンテンツ専用のブレークポイントを追加で作成する必要があります。
携帯端末向けのサイトを最初に構築する場合、適用済みのスタイルを取り消すことは難しいため、広いビューポートの table の CSS と狭いビューポートの table の CSS を分ける必要があります。
これにより、明確で一貫したスタイルの変更が可能になります。

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## まとめ

**お疲れ様でした。** これで、さまざまなデバイス、形状、画面サイズに対応した、はじめてのシンプルな商品ランディングページの作成は完了です。

次のガイドラインに従うことで、構築作業を適切に開始できます。

1.  基本の IA を策定してコンテンツを理解してから、コーディングに入る。
2.  必ずビューポートを設定する。
3.  モバイルファーストのアプローチに基づいて、基本的なエクスペリエンスを作成する。
4.  モバイルのエクスペリエンスが完成したら、ディスプレイの幅を広げていき、表示が崩れるところでブレークポイントを設定する。
5.  上記を繰り返す。



