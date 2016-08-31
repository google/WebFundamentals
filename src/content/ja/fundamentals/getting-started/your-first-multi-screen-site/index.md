project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ウェブは小さな携帯端末から大きなテレビまで、さまざまな画面サイズのデバイスからアクセスできます。これらすべてのデバイスに対応したサイトの構築方法について学びましょう。

{# wf_review_required #}
{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# はじめてのマルチデバイス サイト {: .page-title }

{% include "_shared/contributors/paulkinlan.html" %}


Translated By: 

{% include "_shared/contributors/agektmr.html" %}



マルチデバイス サイトを構築するのは、思ったほど大変ではありません。このガイドでは、<a href='https://www.udacity.com/course/cs256'>CS256 モバイルサイト構築コース</a>の商品ランディング ページを例に、さまざまなデバイスに対応したランディング ページを作成していきます。

<img src="images/finaloutput-2x.jpg" alt="完成したプロジェクトを表示している各デバイス">

機能だけでなく、画面サイズや操作方法が大きく異なる複数のデバイスに対応したサイトの構築に取り掛かることは、不可能ではないにしても大変な作業のように思えます。

完全なレスポンシブ サイトの構築は、思ったほど大変ではありません。このガイドでは、レスポンシブ サイトの構築の開始に役立つ手順を紹介します。作業は次の 2 つの手順に分かれます。

1.  情報アーキテクチャ（IA）とページ構造を定義する 
2.  デザイン要素を追加し、あらゆるデバイスで適切に表示されるレスポンシブなページにする




## コンテンツと構造を作成する 



Translated By: 




コンテンツは、すべてのサイトにおいて最も重要な側面です。デザインにコンテンツを規定させるのではなく、コンテンツに合わせてデザインしましょう。このガイドでは、まず必要なコンテンツを特定し、そのコンテンツを基にページ構造を作成してから、狭いビューポートと広いビューポートの両方に対応したシンプルなリニア レイアウトでページを表示します。


### ページの構造を作る

以下のコンテンツが必要なことがわかりました。

1.  自社の商品「CS256: モバイルサイト構築」コースの概要を説明する領域
2.  商品に関心のあるユーザーの情報を収集するためのフォーム
3.  詳細な説明と動画
4.  商品を利用している画像
5.  説明内容を裏付ける情報のデータ表

### TL;DR {: .hide-from-toc }
- まず必要なコンテンツを特定する。
- 狭いビューポートと広いビューポート用の情報アーキテクチャ（IA）を作成する。
- コンテンツ（スタイルは未適用）を含めたページのスケルトン ビューを作る。


また、狭いビューポートと広いビューポートの両方について、大まかな情報アーキテクチャとレイアウトを作成しました。

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="狭いビューポートの IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="広いビューポートの IA">
</div>

この情報アーキテクチャは、このプロジェクトの残りの部分で使うスケルトン ページの大まかな各セクションへと簡単に転換できます。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### ページにコンテンツを追加する

サイトの基本構造は完成しました。必要なセクション、各セクションに表示するコンテンツ、情報アーキテクチャ内のどこにコンテンツを配置すべきかがわかりました。これで、サイト構築を開始できます。

<!-- TODO: Verify note type! -->
Note: スタイルは後に来る

#### ヘッドラインとフォームを作る

ヘッドラインとリクエスト フォームはこのページの重要な構成要素であり、ユーザーに対して即座に表示する必要があります。

ヘッドラインには、コースを説明する簡単なテキストを追加します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

また、フォームも作成する必要があります。
ユーザーの名前、電話番号、折り返し電話の希望時間帯を入力してもらうシンプルなフォームを作成します。

すべてのフォームにラベルとプレースホルダを設定する必要があります。これらを設定することで、ユーザーが各要素に注目して入力項目をすぐに理解できるようになるほか、ユーザー補助ツールがフォームの構造を認識しやすくなります。name 属性は、フォームの値をサーバーに送信するだけでなく、ブラウザにフォームへの自動入力の方法についてのヒントを与える役割も持っています。

ユーザーが携帯端末で素早く簡単にコンテンツを入力できるよう、適切な入力タイプを設定します。たとえば、電話番号を入力する際には、ダイヤルパッドが表示されるようにします。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

#### 動画と情報のセクションを作る

コンテンツの動画と情報のセクションには、もう少し詳しい情報を含めます。
商品の特徴の箇条書きリストと、商品がユーザーにとって役立つことを示す動画のプレースホルダを含めます。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

動画は、コンテンツをよりインタラクティブに説明する手段として、コンセプトや商品のデモンストレーションによく利用されます。

以下に示すおすすめの方法に従って、簡単に動画をサイトに組み込むことができます。

*  controls 属性を追加して、ユーザーが動画を簡単に再生できるようにします。
*  poster でポスター画像を追加して、コンテンツのプレビューを表示します。
*  サポートされている動画形式に基づいて、複数の <source> 要素を追加します。
*  ユーザーがウィンドウ内で動画を再生できない場合に動画をダウンロードできるよう、代替テキストを追加します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

#### 画像のセクションを作る

画像を使用しないと、やや退屈なサイトになりかねません。画像には次の 2 つの種類があります。

*  コンテンツ画像 &mdash; ドキュメントにインラインで表示され、コンテンツに関する追加情報を伝える画像。
*  スタイル用画像 &mdash; サイトの外観の向上を目的として使用される画像。多くの場合、背景画像、パターン、グラデーションの画像を指す。スタイル画像については、[次の記事]({{page.nextPage.relative_url}})で説明します。

ページの画像セクションは、コンテンツ画像の集合で構成されます。

コンテンツ画像はページの内容を伝えるうえで不可欠です。新聞記事で使用される画像と同じ役割があると考えてください。ここでは、プロジェクトの講師である Chris Wilson、Peter Lubbers、Sean Bennet の写真の画像を使用します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

画像は画面の幅 100% にスケーリングするよう設定されています。この設定は狭いビューポートのデバイスではうまく機能しますが、広いビューポートのデバイス（パソコンなど）では適切に機能しません。この問題はレスポンシブ デザインのセクションで対処します。

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

画像を見ることができないユーザーも少なくありません。そうしたユーザーは多くの場合、ページ上のデータを解析してその情報をユーザーに言葉で伝えるスクリーンリーダーなどの支援技術を利用します。スクリーン リーダーを使用するユーザーに画像の内容を言葉で確実に伝えられるよう、すべてのコンテンツ画像のタグに alt 属性でわかりやすい代替テキストを設定する必要があります。

タグに alt 属性を追加する際は、できるだけ簡潔な代替テキストで画像の内容を十分に説明するようにしてください。たとえば、このデモでは alt 属性の代替テキストを「名前: 役割」というシンプルな形式にしています。これで、ここが担当者とその役割についてのセクションだと理解するのに十分な情報がユーザーに伝わります。

#### 表組みのデータ セクションを追加する

最後のセクションは、商品に関する具体的なデータを示したシンプルな表のセクションです。

表は、表組みのデータ（つまり、行と列で構成される情報）にのみ使用してください。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

#### フッターを追加する

多くのサイトでは、メインのナビゲーションやページの主なコンテンツ領域への掲載に向かない、利用規約や免責条項などのコンテンツを表示するためにフッターが必要です。

今回のサイトでは、利用規約、お問い合わせページ、ソーシャル メディアのプロフィールへのリンクのみを掲載します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### まとめ

サイトの概略を作成し、主な構成要素をすべて特定しました。また、ビジネスのニーズを満たすための、すべての関連コンテンツを用意して配置しました。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="コンテンツ">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

現時点ではページの見栄えが良くありませんが、これは意図的なものです。
コンテンツはすべてのサイトにおいて最も重要な側面であるため、まずしっかりとした情報アーキテクチャと密度を確実に構築する必要がありました。このガイドによって適切な構築の基礎が得られました。次のガイドでは、コンテンツにスタイルを適用します。





## レスポンシブにする 



Translated By: 




ウェブは小さな携帯端末から大きなテレビまで、さまざまな画面サイズのデバイスからアクセスできます。各デバイスにはそれぞれのメリットと制約があります。ウェブデベロッパーは、あらゆるデバイスに対応させることが求められます。


複数の画面サイズやデバイスの種類に対応できるサイトを構築します。[前の記事]({{page.previousPage.relative_url}})では、ページの情報アーキテクチャを策定し、基本構造を作成しました。
このガイドでは、コンテンツを含んだページの基本構造について取り上げ、さまざまな画面サイズに対応するレスポンシブな洗練されたページへと変えます。

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="コンテンツ">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> コンテンツと構造 </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> 最終的なサイト </a> </figcaption>
  </figure>
</div>

ウェブ開発におけるモバイル ファーストの原則に従い、携帯端末のような狭いビューポートから作業を開始し、まず狭いビューポート用のエクスペリエンスを構築します。
そのうえで、より大きなデバイスのクラスへとスケールを拡大します。
具体的には、ビューポートの幅を広げ、デザインとレイアウトの外観が適切かどうかを判断していきます。

これまでの作業で、コンテンツの表示方法を定めたハイレベルのデザインをいくつか作成しました。ここでは、ページをそれらの各レイアウトに合わせる必要があります。
コンテンツが画面サイズに合っているかを基準に、ブレークポイント（レイアウトとスタイルが変わるポイント）をどこに設定するかを決めていくことで、各レイアウトをページに適合させていきます。

### TL;DR {: .hide-from-toc }
- 必ずビューポートを使用する。
- 最初は必ず狭いビューポートから作業を始め、徐々に大きなサイズへと進む。
- コンテンツを適合させる必要がある場合は、ブレークポイントを基準として用いる。
- レイアウトについて、複数のメジャー ブレークポイント間にわたるハイレベルのビジョンを作成する。


### ビューポートを追加します

基礎段階のページでも、必ず meta viewport タグを含める**必要があります**。
ビューポートは、マルチデバイス対応サイトの構築に必要な最重要コンポーネントです。
ビューポートがないと、サイトは携帯端末上で正しく表示されません。

ビューポートは、画面に収めるためにページをスケーリングする必要があることをブラウザに通知します。ビューポートでページの表示を制御するために指定できる設定項目は数多くありますが、デフォルトとして、次のように設定することをおすすめします。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

ビューポートはドキュメントの head 部に配置します。宣言が必要なのは 1 回のみです。

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

### シンプルなスタイリングを適用します

今回の商品と企業では厳密なブランディングとフォントのガイドラインが既に存在し、スタイルガイドとして提供されています。

#### スタイルガイド

スタイルガイドを利用することで、ページの視覚表現の概要を理解できるほか、デザイン全体で一貫性を確実に保つことができます。

##### 色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### スタイル用画像を追加します

前のガイドでは「コンテンツ画像」と呼ばれる画像を追加しました。これらの画像は、商品のストーリーを伝えるうえで重要なものです。スタイル用画像は、主要コンテンツの一部として必要な画像ではなく、視覚的な効果を加えたり、ユーザーをコンテンツの特定部分に注目させるために用いられます。

スタイル用画像のわかりやすい例としては、「サイトの一面」のコンテンツのヘッドライン画像があります。商品の詳細情報へとユーザーを誘導する目的でヘッドライン画像が使用されていることがよくあります。

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="デザインされたサイト">
</div>

スタイル用画像は簡単に追加できます。今回の例では、ヘッドラインの背景にスタイル用画像を使用し、簡単な CSS で画像を適用します。


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

コンテンツよりも目立たないよう、ぼかしの入ったシンプルな背景画像を選び、要素全体にフィット（cover）するよう設定しました。これにより、画像は常に正しいアスペクト比を保ちつつ画面いっぱいに表示されます。

<br style="clear: both;">

### あなたの最初のブレークポイントを設定します

幅が 600px 近くになると、デザインの見栄えが悪くなり始めます。今回の例では、行の長さが 10 語（読みやすい適切な長さ）を超えるため、これを変更する必要があります。

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/firstbreakpoint.mov">動画をダウンロードしてください</a>。
  </p>
</video>

画面に合うよう要素を再配置する機会となることから、600px は最初のブレークポイントの作成に適したサイズと思われます。ブレークポイントは、[メディア クエリ]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)というテクノロジーを使用することで作成できます。


    @media (min-width: 600px) {
    
    }
    

大きな画面の場合はより多くのスペースがあるため、コンテンツをより柔軟な方法で表示できます。

<!-- TODO: Verify note type! -->
Note: すべての要素を一度に移動する必要はありません。必要に応じて細かい調整を加えることができます。

今回の商品ページでは、次の作業が必要と考えられます。

*  デザインの最大幅を抑制する。
*  要素のパディングを変更し、テキストのサイズを小さくする。
*  フォームを移動し、ヘッドラインのコンテンツの横に回り込ませる。
*  動画をコンテンツに回り込ませる。
*  画像のサイズを縮小し、見栄えよく並べて表示する。

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

### デザインの最大幅を抑制する

主なレイアウトを狭いビューポートと広いビューポートの 2 つのみとしたことで、構築のプロセスが大幅に簡略化されています。

また、狭いビューポート上に余白なしのセクションを作成することとしましたが、これらのセクションは広いビューポートでも余白なしのままとなります。このため、幅の極めて広い画面上でテキストや段落が横に長い 1 つの行になってしまわないよう、画面の最大幅を制限する必要があります。この制限を行うサイズを 800px 付近とすることにしました。

これを行うには、要素の幅を制限して中央揃えにする必要があります。各主要セクションを格納するコンテナを作成して、margin: 
auto を適用する必要があります。これにより、画面が大きくなってもコンテンツを最大幅 800px で中央揃えのままにすることができます。

コンテナには、次のような形式のシンプルな div を使用します。

{% highlight html %}<div class="container">...</div>{% endhighlight %}

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml" lang=html %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container" lang=css %}
</pre>

### パディングを変更してテキストのサイズを小さくする

狭いビューポートでは、コンテンツの表示スペースがあまり広くないため、画面に収まるように文字のサイズや太さを大幅に減らすことがよくあります。

大きいビューポートでは、ユーザーがさらに大きい画面を使用する可能性を考慮する必要があります。コンテンツを読みやすくするには、文字のサイズや太さを増やすことができるほか、パディングを変更して個々の領域を区別しやすくこともできます。

今回の商品ページでは、セクションの各要素のパディングを幅の 5% に設定することで、パディングを増やします。また、各セクションの見出しのサイズも大きくします。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

### 広いビューポートに要素を適合させる

狭いビューポートでは、直線的にコンテンツを積み重ねて表示しています。各主要セクションとそこに含まれるコンテンツは、上から下へ順に表示されます。

広いビューポートでは、より多くのスペースを使用できるため、大きな画面に適した方法でコンテンツを表示できます。これを今回の商品ページに当てはめると、IA に従って次のように変更できます。

*  フォームをヘッドラインの情報の横に回り込ませる。
*  動画を主な特徴の箇条書きの右側に配置する。
*  画像をタイル表示する。
*  表を大きくする。

#### フォーム要素を回り込ませる

狭いビューポートでは、画面上に要素を適切に配置するために使用できる横方向のスペースがそれほど多くありません。

横方向の画面スペースを有効利用するために、ヘッドラインのコンテンツを直線的に配置せずに、フォームとリストが隣り合わせになるよう移動させる必要があります。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat" lang=css %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/floatingform.mov">動画をダウンロードしてください</a>。
  </p>
</video>

#### 動画要素を回り込ませる

狭いビューポートのインターフェースでは、動画は画面幅いっぱいになるようにデザインされており、主な特徴のリストの後に配置されています。広いビューポートでは、特徴のリストの後ろに動画を配置すると、サイズが拡大されすぎて見づらくなります。

広いビューポートでは、動画要素を狭いビューポートでの縦に表示するフローから外して、コンテンツの箇条書きリストの隣に表示する必要があります。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo" lang=css %}
</pre>

#### 画像をタイル表示する

狭いビューポート（通常は携帯端末）のインターフェースでは、画像は画面幅いっぱいで縦に連けて表示するよう設定されています。この設定では、広いビューポートでは画像がうまくスケーリングされません。

画像を広いビューポートで正しく表示するために、画像をコンテナの幅の 30% にスケーリングして、（狭いビューでの縦方向ではなく）横方向に配置するよう設定します。また、border-radius と box-shadow を追加して、画像の見栄えを向上させます。

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages" lang=css %}
</pre>

#### DPI に応じて画像をレスポンシブにする

画像を使用する際は、ビューポートのサイズとディスプレイの解像度を考慮してください。

ウェブは元来 96dpi の画面向けに作成されています。ノートパソコンにおける Retina クラスのディスプレイや携帯端末の登場により、画面のピクセル密度は大幅に向上しました。そのため、96dpi 向けにエンコードされた画像は、解像度の高いデバイスでは見栄えがひどく低下することも少なくありません。

この問題には、まだあまり普及していない解決策があります。
これに対応しているブラウザでは、高密度のディスプレイにおいて高密度の画像を表示できます。


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

#### 表

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

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" lang=css %}
</pre>

### まとめ

**お疲れ様でした。** これで、さまざまなデバイス、形状、画面サイズに対応した、はじめてのシンプルな商品ランディングページの作成は完了です。

次のガイドラインに従うことで、構築作業を適切に開始できます。

1.  基本の IA を策定してコンテンツを理解してから、コーディングに入る。
2.  必ずビューポートを設定する。
3.  モバイルファーストのアプローチに基づいて、基本的なエクスペリエンスを作成する。
4.  モバイルのエクスペリエンスが完成したら、ディスプレイの幅を広げていき、表示が崩れるところでブレークポイントを設定する。
5.  上記を繰り返す。



