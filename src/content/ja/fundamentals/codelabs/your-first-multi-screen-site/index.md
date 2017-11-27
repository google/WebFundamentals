project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 小さな画面のスマートフォ小さな画面のスマートフォンから大きな画面のテレビまで、非常に幅広い端末からウェブにアクセスできます。各デバイスにはそれぞれメリットと制約があります。ウェブ デベロッパーには、あらゆる端末を幅広くサポートすることが期待されます。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2013-12-31 #}

# はじめてのマルチデバイス サイト {: .page-title }

Warning: この記事はしばらくアップデートされていないため、現実が反映されていない可能性があります。代わりに、Udacity の無料の [Responsive Web Design](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) コースをご覧ください。

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="完成したプロジェクトを表示する多数の端末" class="attempt-right">

マルチデバイス サイトの構築は、思っているほど大変ではありません。
このガイドでは、[CS256 Mobile Web Development コース](https://www.udacity.com/course/mobile-web-development--cs256)
という商品のランディング ページを例に、さまざまな端末に対応したランディング ページを作成していきます。


機能だけでなく、画面サイズや操作方法が大きく異なる複数のデバイスに対応したサイトの構築に取り掛かることは、不可能ではないにしても大変な作業のように思えます。



しかし完全なレスポンシブ サイトを構築するのは、思っているほど大変ではありません。このガイドでは、レスポンシブ サイトの構築を始めるうえで必要な作業を順を追って説明していきます。作業は次の 2 つの手順に分かれます。

1. 情報アーキテクチャ（IA）とページ構造を定義する。
2. デザイン要素を追加し、あらゆるデバイスで適切に表示されるレスポンシブなページにする。


##  コンテンツを作成して構造を決める

コンテンツは、すべてのサイトにおいて最も重要な要素です。デザインでコンテンツを決めるのではなく、コンテンツに合わせてデザインをしましょう。
このガイドでは、まず必要なコンテンツを特定し、そのコンテンツを基にページ構造を作成してから、狭いビューポートと広いビューポートの両方に対応したシンプルなリニア レイアウトでページを表示します。





###  ページの構造を作る

必要なコンテンツは以下のとおりです。

1. 自社の商品「CS256: Mobile Web Development」コースの概要を説明する領域
2. 商品に関心のあるユーザーの情報を収集するためのフォーム
3. 詳細な説明と動画
4. 商品を利用している画像
5. 説明内容を裏付ける情報のデータ表

#### TL;DR {: .hide-from-toc }
- まず必要なコンテンツを特定する。
- 狭いビューポートと広いビューポート用の情報アーキテクチャ（IA）のベースを作成する。
- コンテンツ（スタイルは未適用）を含めたページのスケルトン ビューを作る。

狭いビューポートと広いビューポートの両方について、以下のように大まかな情報アーキテクチャとレイアウトを作成しました。


<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="狭いビューポートの情報アーキテクチャ">
    <figcaption>
      狭いビューポートの情報アーキテクチャ
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="広いビューポートの情報アーキテクチャ">
    <figcaption>
      広いビューポートの情報アーキテクチャ
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

この情報アーキテクチャから、このプロジェクトの残りの部分で使うスケルトン ページの暫定セクションを簡単に作成できます。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

###  ページにコンテンツを追加する

サイトの基本構造は完成しました。必要なセクション、各セクションに表示するコンテンツ、情報アーキテクチャ内のどこにコンテンツを配置するかが決まりました。これで、サイト構築を開始できます。

注: スタイル設定は後で行います。

###  ヘッドラインとフォームを作る

ヘッドラインとリクエスト フォームはこのページの重要な構成要素であり、
ユーザーに対して即座に表示する必要があります。

ヘッドラインには、コースについて簡単に説明したテキストを追加します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

また、フォームも作成する必要があります。ユーザーの名前、メールアドレス、電話番号を入力してもらうシンプルなフォームを作成します。



すべてのフォームにラベルとプレースホルダを設定する必要があります。これらを設定することで、ユーザーが各要素に注目して入力項目をすぐに理解できるようになるほか、ユーザー補助ツールがフォームの構造を認識しやすくなります。name 属性は、フォームの値をサーバーに送信するだけでなく、ブラウザにフォームの自動入力方法についてのヒントを与える役割も持っています。



ユーザーがモバイル端末で素早く簡単にコンテンツを入力できるよう、適切なセマンティック タイプを設定します。
たとえば、電話番号を入力する際には、ダイヤルパッドが表示されるようにします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

####  動画と情報のセクションを作る

コンテンツの動画と情報のセクションには、もう少し詳しい情報を含めます。商品の特徴の箇条書きリストと、ユーザーに商品の良さを伝える動画のプレースホルダを含めます。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

動画は、コンテンツをよりインタラクティブに説明する手段として、コンセプトや商品のデモンストレーションによく利用されます。


次のベスト プラクティスに従って、簡単に動画をサイトに組み込むことができます。

*  `controls` 属性を追加して、ユーザーが動画を簡単に再生できるようにする。
*  `poster` でポスター画像を追加して、コンテンツのプレビューを表示する。
*  サポートされている動画形式に基づいて、複数の `<source>` 要素を追加する。
*  ユーザーがウィンドウ内で動画を再生できない場合に動画をダウンロードできるよう、代替テキストを追加する。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

####  画像のセクションを作る

画像を使用しないと、やや退屈なサイトになりかねません。画像には次の 2 種類があります。

*  コンテンツ画像: ドキュメントにインライン表示され、コンテンツに関する追加情報を伝える画像。
*  スタイル用画像: サイトの見栄えを良くするために使用される画像。多くの場合、背景画像、パターン、グラデーションの画像を指す。
スタイル用画像については、[次のセクション](#make-it-responsive)で説明します。


ページの画像セクションは、コンテンツ画像の集合で構成されます。

コンテンツ画像はページの内容を伝えるうえで不可欠です。新聞記事で使用される画像と同じ役割があると考えてください。
ここでは、プロジェクトの講師である 
Chris Wilson、Peter Lubbers、Sean Bennet の写真を使用します。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

画像は画面の幅 100% にスケーリングするよう設定されています。この設定は狭いビューポートのデバイスではうまく機能しますが、広いビューポートのデバイス（パソコンなど）では適切に機能しません。この問題についてはレスポンシブ デザインのセクションで対処します。


画像を見ることができないユーザーも少なくありません。そうしたユーザーは多くの場合、ページ上のデータを解析してその情報をユーザーに音声で伝えるスクリーン リーダーなどの支援技術を利用しています。スクリーン リーダーを使用するユーザーに画像の内容を音声で確実に伝えられるよう、すべてのコンテンツ画像のタグに `alt` 属性でわかりやすい代替テキストを設定する必要があります。



`alt` タグを追加する際は、できるだけ簡潔な代替テキストで画像の内容を十分に説明するようにしてください。たとえば、このデモでは alt 属性の代替テキストを「名前: 
役割」というシンプルな形式にしています。これで、ここが担当者とその役割についてのセクションだと理解するのに十分な情報がユーザーに伝わります。



####  表組みのデータ セクションを追加する

最後のセクションは、商品に関する具体的なデータを示したシンプルな表のセクションです。


表は、表組みのデータ（つまり、行と列で構成される情報）にのみ使用してください。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

####  フッターを追加する

多くのサイトでは、メインのナビゲーションやページ内の主要なコンテンツ領域への掲載には向かない、利用規約や免責条項などのコンテンツを表示するためのフッターが必要です。



今回のサイトでは、簡単なプレースホルダのフッターを作成します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

###  まとめ

サイトの骨組みを作成し、主な構成要素をすべて洗い出しました。
また、ビジネスニーズを満たすための、すべての関連コンテンツを用意して配置しました。


<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="コンテンツ">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">コンテンツと構造</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="デザインしたサイト" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">最終的なサイト</a>
    </figcaption>
  </figure>
</div>

現時点ではページの見栄えが良くありませんが、これは意図的なものです。コンテンツはすべてのサイトにおいて最も重要な要素であるため、まずはしっかりとした情報アーキテクチャと適切な密度のページ構造になってるかを確認する必要がありました。このガイドでは、適切なページ作成の基本について説明しました。次のガイドでは、コンテンツにスタイルを適用します。



##  レスポンシブにする{: #make-it-responsive }

小さな画面のスマートフォンから大きな画面のテレビまで、非常に幅広い端末からウェブにアクセスできます。
各端末にはそれぞれメリットと制約があります。
ウェブ デベロッパーには、あらゆる端末を幅広くサポートすることが期待されます。



複数の画面サイズやデバイスの種類に対応できるサイトを構築します。
ページの情報アーキテクチャを策定し、基本構造を作成しました。
このガイドでは、コンテンツを含むページの基本構造について取り上げ、それを多様な画面サイズに対応したレスポンシブで洗練されたページへと作り変えます。



ウェブ開発におけるモバイル ファーストの原則に従い、まずはスマートフォンのような狭いビューポート用のエクスペリエンスを構築します。そのうえで、より大きな端末クラスへとスケールを拡大します。具体的には、ビューポートの幅を広げ、デザインとレイアウトの外観が適切かどうかを判断していきます。



これまでの作業で、コンテンツの表示方法を定めた大まかなデザインをいくつか作成しました。
ここでは、コンテンツが画面サイズに合っているかを基準に、ブレークポイント（レイアウトとスタイルが変わるポイント）をどこに設定するかを決めていくことで、各レイアウトをページに合わせていきます。




### TL;DR {: .hide-from-toc }
- 必ずビューポートを使用する。
- 必ず狭いビューポートから開始してスケールアウトする。
- コンテンツを適合させる必要がある場合は、ブレークポイントを基準にする。
- メジャー ブレークポイントを使用してレイアウトの概観をデザインする。


###  ビューポートを追加する

初期段階のページでも、必ずビューポートのメタタグを含める**必要があります**。ビューポートは、マルチデバイス対応サイトの構築に必要な最重要コンポーネントです。ビューポートがないと、サイトはモバイル端末上で正しく表示されません。

ビューポートは、画面に収めるためにページをスケーリングする必要があることをブラウザに通知します。ビューポートでページの表示を制御するために指定できる設定項目は数多くありますが、デフォルトとして、次のように設定することをおすすめします。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

ビューポートはドキュメントの head 部に配置します。宣言が必要なのは 1 回のみです。

###  シンプルなスタイル設定を適用する

今回の商品と企業では厳密なブランディングとフォントのガイドラインが既に存在し、スタイルガイドとして提供されています。


####  スタイルガイド

スタイルガイドを利用することで、ページの視覚表現の概要を理解できるほか、デザイン全体で一貫性を確実に保つことができます。


####  色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

####  スタイル用画像を追加する

<img  src="images/narrowsite.png" alt="デザインしたサイト"  class="attempt-right" />

前のガイドでは「コンテンツ画像」と呼ばれる画像を追加しました。これらの画像は、商品のストーリーを伝えるうえで重要なものです。
スタイル用画像は、主要コンテンツの一部として必要な画像ではなく、視覚的な効果を加えたり、ユーザーをコンテンツの特定部分に注目させるために用いられます。



このわかりやすい例としては、「スクロールせずに見える範囲」に表示されるコンテンツのヘッドライン画像があります。これは商品の詳細情報へとユーザーを誘導する目的で使用されることがよくあります。


スタイル用画像は簡単に追加できます。今回の例では、簡単な CSS によってヘッドラインの背景にスタイル用画像を適用します。


<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

コンテンツよりも目立たないよう、ぼかしの入ったシンプルな背景画像を選び、要素全体にフィット（`cover`）するよう設定しました。これにより、画像は常に正しいアスペクト比を保ちつつ画面いっぱいに表示されます。




###  最初のブレークポイントを設定する

幅が 600px 近くになると、デザインの見栄えが悪くなり始めます。今回の例では、行の長さが 10 語（読みやすい適切な長さ）を超える場所でデザインを変更する必要があります。



<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/firstbreakpoint.mov">動画をダウンロード</a>
  </p>
</video>

600px は画面に合うよう要素を再配置する機会になることから、最初のブレークポイントの作成に適したサイズだと言えます。ブレークポイントは、[メディアクエリ](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)という機能を使用することで作成できます。

    @media (min-width: 600px) {
    
    }
    
大きな画面では使えるスペースが広くなるため、コンテンツをより柔軟な方法で表示できます。


注: すべての要素を一度に変える必要はありません。必要に応じて微調整していきます。

今回の商品ページを作成するには、次の作業が必要になります。


*  デザインの最大幅を抑制する。
*  要素のパディングを変更し、テキストのサイズを小さくする。
*  フォームを移動し、ヘッドラインのコンテンツの横に回り込ませる。
*  動画をコンテンツに回り込ませる。
*  画像のサイズを縮小し、見栄えよく並べて表示する。


###  デザインの最大幅を抑制する

主要レイアウトを狭いビューポートと広いビューポートの 2 つのみにしたことで、構築プロセスが大幅に簡略化されています。


また、狭いビューポート上に余白なしのセクションを作成することとしましたが、これらのセクションは広いビューポートでも余白なしのままとなります。そのため、幅の極めて広い画面上でテキストや段落の 1 行が横に極端に長くなってしまわないよう、画面の最大幅を制限する必要があります。この制限を行うサイズを 800px 付近とすることにしました。


これを行うには、要素の幅を制限して中央揃えにする必要があります。よって各主要セクションを格納するコンテナを作成して、margin: auto を適用します。これにより、画面が大きくなってもコンテンツを最大幅 800px で中央揃えのままにすることができます。


コンテナには、次のような形式のシンプルな `div` を使用します。

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

###  パディングを変更してテキストのサイズを小さくする

狭いビューポートでは、コンテンツの表示スペースが限られるため、画面に収まるように文字のサイズや太さを大幅に減らすことがよくあります。



大きいビューポートでは、ユーザーがさらに大きい画面を使用する可能性を考慮する必要があります。
コンテンツを読みやすくするには、文字のサイズや太さを増やすことができるほか、パディングを変更して個々の領域を区別しやすくすることもできます。



今回の商品ページでは、セクションの各要素のパディングを幅の 5% に設定することで、パディングを増やします。
また、各セクションの見出しのサイズも大きくします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

###  広いビューポートに要素を適合させる

狭いビューポートでは、直線的にコンテンツを積み重ねて表示しています。各主要セクションとそこに含まれるコンテンツは、上から下へ順に表示されます。


広いビューポートでは、より多くのスペースを使用できるため、大きな画面に適した方法でコンテンツを表示できます。
これを今回の商品ページに当てはめると、IA に従って次のように変更できます。

*  フォームをヘッドラインの情報の横に回り込ませる。
*  動画を主な特徴の箇条書きの右側に配置する。
*  画像をタイル表示する。
*  表を大きくする。

####  フォーム要素を回り込ませる

狭いビューポートでは、画面上に要素を適切に配置するために使用できる横方向のスペースが限られています。


横方向の画面スペースを有効利用するには、ヘッドラインのコンテンツを直線的に配置せずに、フォームとリストが隣り合わせになるよう移動させる必要があります。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/floatingform.mov">動画をダウンロード</a>
  </p>
</video>

####  動画要素を回り込ませる

狭いビューポートのインターフェースでは、動画は画面幅いっぱいになるようにデザインされており、主な特徴のリストの下に配置されています。
広いビューポートでは、特徴のリストの下に動画を配置すると、サイズが拡大されすぎて見づらくなります。



よって広いビューポートでは、動画要素を縦に表示する狭いビューポートのフローから外して、コンテンツの箇条書きリストの隣に表示する必要があります。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

####  画像をタイル表示する

<img src="images/imageswide.png" class="attempt-right">

狭いビューポート（通常はモバイル端末）のインターフェースでは、画像は画面幅いっぱいで縦にスタックして表示するよう設定されています。
この設定では、広いビューポートになると画像がうまくスケーリングされません。


画像を広いビューポートで正しく表示するためには、画像をコンテナの幅の 30% にスケーリングして、（狭いビューでの縦方向ではなく）横方向に並べて配置するよう設定します。また、border-radius と box-shadow を追加して、画像の体裁を整えます。


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

####  DPI に応じて画像をレスポンシブにする

画像を使用する際は、ビューポートのサイズとディスプレイの密度を考慮してください。


ウェブは元来 96dpi の画面向けに作成されていました。しかしモバイル端末の登場により、ノートパソコンにおける Retina クラスのディスプレイを筆頭に、画面のピクセル密度は大幅に向上しました。そのため、96dpi 向けにエンコードされた画像は、高 DPI のデバイスでは見栄えが非常に悪くなることも少なくありません。


この問題には、まだあまり普及していませんが、以下の解決策があります。これに対応しているブラウザでは、高密度のディスプレイにおいて高密度の画像を表示できます。



    <img src="photo.png" srcset="photo@2x.png 2x">
    

####  表

狭いビューポートのデバイスで表を見やすく表示することは難しいため、特別な配慮が必要です。


狭いビューポートでは、表の各行をキーと値のペア（キーは元々の列の見出し、値はセルの値）に変更することをおすすめします。幸い、これはそれほど難しくありません。まず、各 `td` 要素のデータ属性として、対応する見出しで注釈を付けます（もう少し CSS を追加するまで、視覚的な効果は得られません）。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

ここで CSS を追加して、`:before` 疑似要素を使用して元の `thead` を非表示にし、`data-th` ラベルを表示する必要があります。これで次の動画のようなマルチデバイス エクスペリエンスが実現します。


<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>お使いのブラウザでは動画がサポートされていません。
     <a href="videos/responsivetable.mov">動画をダウンロード</a>
  </p>
</video>

今回のサイトでは、表のコンテンツ専用のブレークポイントを追加で作成する必要があります。モバイル端末向けのサイトを最初に構築する場合、適用済みのスタイルを取り消すことは難しいため、広いビューポートの table の CSS と狭いビューポートの table の CSS を分ける必要があります。これにより、明確で一貫したスタイルの変更が可能になります。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

##  まとめ

ポイント: これで、さまざまな端末、フォーム ファクタ、画面サイズに対応した、はじめてのシンプルな商品ランディング ページの作成は完了です。



最後に、構築作業をスムーズに開始するためのガイドラインを以下にまとめます。

1. 基本の IA を策定してコンテンツを理解してから、コーディングに入る。
2. 必ずビューポートを設定する。
3. モバイル ファーストのアプローチに基づいて、基本的なエクスペリエンスを作成する。
4. モバイルのエクスペリエンスが完成したら、ディスプレイの幅を広げていき、表示が崩れるところでブレークポイントを設定する。
5. 上記を繰り返す。


{# wf_devsite_translation #}
