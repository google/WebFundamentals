---
title: "コンテンツと構造を作成する"
description: "コンテンツは、すべてのサイトにおいて最も重要な側面です。このガイドで紹介する方法を参考にして、はじめてのマルチデバイス対応サイトの構築計画をすぐに立てることができます。"
notes:
  styling:
    - スタイルは後に来る
updated_on: 2014-04-23
translators:
  - agektmr
related-guides:
  create-amazing-forms:
    -
      title: すばらしいフォームを作る
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "フォーム"
        href: fundamentals/input/form/
    -
      title: 入力の label と name を正しく設定する
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "フォーム"
        href: fundamentals/input/form/
    -
      title: 最適な input type を選ぶ
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "フォーム"
        href: fundamentals/input/form/
  video:
    -
      title: 動画を効果的に使う
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "動画"
        href: fundamentals/media/
    -
      title: 開始位置を変更する
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "動画"
        href: fundamentals/media/
    -
      title: ポスター画像を含める
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "動画"
        href: fundamentals/media/
  images:
    -
      title: 画像を効果的に使う
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "画像"
        href: fundamentals/media/
    -
      title:  マークアップにおける画像の正しい使い方
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "画像"
        href: fundamentals/media/
    -
      title: 画像の最適化
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "画像"
        href: fundamentals/media/
key-takeaways:
  content-critical:
    - まず必要なコンテンツを特定する。
    - 狭いビューポートと広いビューポート用の情報アーキテクチャ（IA）を作成する。
    - コンテンツ（スタイルは未適用）を含めたページのスケルトン ビューを作る。
---

<p class="intro">
   コンテンツは、すべてのサイトにおいて最も重要な側面です。デザインにコンテンツを規定させるのではなく、コンテンツに合わせてデザインしましょう。このガイドでは、まず必要なコンテンツを特定し、そのコンテンツを基にページ構造を作成してから、狭いビューポートと広いビューポートの両方に対応したシンプルなリニア レイアウトでページを表示します。
</p>

{% include shared/toc.liquid %}

## ページの構造を作る

以下のコンテンツが必要なことがわかりました。

1.  自社の商品「CS256: モバイルサイト構築」コースの概要を説明する領域
2.  商品に関心のあるユーザーの情報を収集するためのフォーム
3.  詳細な説明と動画
4.  商品を利用している画像
5.  説明内容を裏付ける情報のデータ表

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

また、狭いビューポートと広いビューポートの両方について、大まかな情報アーキテクチャとレイアウトを作成しました。

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="狭いビューポートの IA">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="広いビューポートの IA">
</div>

この情報アーキテクチャは、このプロジェクトの残りの部分で使うスケルトン ページの大まかな各セクションへと簡単に転換できます。

{% include_code src=_code/addstructure.html snippet=structure %}

## ページにコンテンツを追加する

サイトの基本構造は完成しました。必要なセクション、各セクションに表示するコンテンツ、情報アーキテクチャ内のどこにコンテンツを配置すべきかがわかりました。これで、サイト構築を開始できます。

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### ヘッドラインとフォームを作る

ヘッドラインとリクエスト フォームはこのページの重要な構成要素であり、ユーザーに対して即座に表示する必要があります。

ヘッドラインには、コースを説明する簡単なテキストを追加します。

{% include_code src=_code/addheadline.html snippet=headline %}

また、フォームも作成する必要があります。
ユーザーの名前、電話番号、折り返し電話の希望時間帯を入力してもらうシンプルなフォームを作成します。

すべてのフォームにラベルとプレースホルダを設定する必要があります。これらを設定することで、ユーザーが各要素に注目して入力項目をすぐに理解できるようになるほか、ユーザー補助ツールがフォームの構造を認識しやすくなります。name 属性は、フォームの値をサーバーに送信するだけでなく、ブラウザにフォームへの自動入力の方法についてのヒントを与える役割も持っています。

ユーザーが携帯端末で素早く簡単にコンテンツを入力できるよう、適切な入力タイプを設定します。たとえば、電話番号を入力する際には、ダイヤルパッドが表示されるようにします。

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### 動画と情報のセクションを作る

コンテンツの動画と情報のセクションには、もう少し詳しい情報を含めます。
商品の特徴の箇条書きリストと、商品がユーザーにとって役立つことを示す動画のプレースホルダを含めます。

{% include_code src=_code/addcontent.html snippet=section1 %}

動画は、コンテンツをよりインタラクティブに説明する手段として、コンセプトや商品のデモンストレーションによく利用されます。

以下に示すおすすめの方法に従って、簡単に動画をサイトに組み込むことができます。

*  controls 属性を追加して、ユーザーが動画を簡単に再生できるようにします。
*  poster でポスター画像を追加して、コンテンツのプレビューを表示します。
*  サポートされている動画形式に基づいて、複数の <source> 要素を追加します。
*  ユーザーがウィンドウ内で動画を再生できない場合に動画をダウンロードできるよう、代替テキストを追加します。

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### 画像のセクションを作る

画像を使用しないと、やや退屈なサイトになりかねません。画像には次の 2 つの種類があります。

*  コンテンツ画像 &mdash; ドキュメントにインラインで表示され、コンテンツに関する追加情報を伝える画像。
*  スタイル用画像 &mdash; サイトの外観の向上を目的として使用される画像。多くの場合、背景画像、パターン、グラデーションの画像を指す。スタイル画像については、[次の記事]({{page.nextPage.relative_url}})で説明します。

ページの画像セクションは、コンテンツ画像の集合で構成されます。

コンテンツ画像はページの内容を伝えるうえで不可欠です。新聞記事で使用される画像と同じ役割があると考えてください。ここでは、プロジェクトの講師である Chris Wilson、Peter Lubbers、Sean Bennet の写真の画像を使用します。

{% include_code src=_code/addimages.html snippet=images lang=html %}

画像は画面の幅 100% にスケーリングするよう設定されています。この設定は狭いビューポートのデバイスではうまく機能しますが、広いビューポートのデバイス（パソコンなど）では適切に機能しません。この問題はレスポンシブ デザインのセクションで対処します。

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

画像を見ることができないユーザーも少なくありません。そうしたユーザーは多くの場合、ページ上のデータを解析してその情報をユーザーに言葉で伝えるスクリーンリーダーなどの支援技術を利用します。スクリーン リーダーを使用するユーザーに画像の内容を言葉で確実に伝えられるよう、すべてのコンテンツ画像のタグに alt 属性でわかりやすい代替テキストを設定する必要があります。

タグに alt 属性を追加する際は、できるだけ簡潔な代替テキストで画像の内容を十分に説明するようにしてください。たとえば、このデモでは alt 属性の代替テキストを「名前: 役割」というシンプルな形式にしています。これで、ここが担当者とその役割についてのセクションだと理解するのに十分な情報がユーザーに伝わります。

### 表組みのデータ セクションを追加する

最後のセクションは、商品に関する具体的なデータを示したシンプルな表のセクションです。

表は、表組みのデータ（つまり、行と列で構成される情報）にのみ使用してください。

{% include_code src=_code/addcontent.html snippet=section3 %}

### フッターを追加する

多くのサイトでは、メインのナビゲーションやページの主なコンテンツ領域への掲載に向かない、利用規約や免責条項などのコンテンツを表示するためにフッターが必要です。

今回のサイトでは、利用規約、お問い合わせページ、ソーシャル メディアのプロフィールへのリンクのみを掲載します。

{% include_code src=_code/addcontent.html snippet=footer %}

## まとめ

サイトの概略を作成し、主な構成要素をすべて特定しました。また、ビジネスのニーズを満たすための、すべての関連コンテンツを用意して配置しました。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="コンテンツ">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

現時点ではページの見栄えが良くありませんが、これは意図的なものです。
コンテンツはすべてのサイトにおいて最も重要な側面であるため、まずしっかりとした情報アーキテクチャと密度を確実に構築する必要がありました。このガイドによって適切な構築の基礎が得られました。次のガイドでは、コンテンツにスタイルを適用します。



