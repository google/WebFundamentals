---
layout: article
title: "オブジェクト モデルを構築する"
description: "ブラウザは、コンテンツを画面にレンダリングする前に、DOM ツリーと CSSOM ツリーを構築する必要があります。そのため、HTML と CSS の両方をできる限り早くブラウザに渡す必要があります。"
introduction: "ブラウザは、ページをレンダリングする前に、DOM ツリーと CSSOM ツリーを構築する必要があります。そのため、HTML と CSS の両方をできる限り早くブラウザに渡す必要があります。"
article:
  written_on: 2014-04-01
  updated_on: 2014-09-12
  order: 1
collection: critical-rendering-path
authors:
  - ilyagrigorik
key-takeaways:
  construct-object-model:
    - バイト→文字→トークン→ノード→オブジェクト モデル。
    - HTML マークアップは、ドキュメント オブジェクト モデル（DOM）に変換され、CSS マークアップは、CSS オブジェクト モデル（CSSOM）に変換されます。
    - DOM と CSSOM は、独立したデータ構造です。
    - Chrome DevTools の Timeline を利用すると、DOM と CSSOM の構築コストと処理コストを把握し、調査することができます。
notes:
  devtools:
    - ここでは、Chrome DevTools の基本については理解していることを前提としています。つまり、ネットワーク ウォーターフォールの取得方法やタイムラインの記録方法について理解していることが前提となります。簡単な復習が必要な場合、<a href="https://developer.chrome.com/devtools">Chrome DevTools ドキュメント</a>をご覧ください。DevTools がまったく初めての場合、Code School の <a href="http://discover-devtools.codeschool.com/">Discover DevTools</a> コースを受けることをおすすめします。
---
{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## ドキュメント オブジェクト モデル（DOM）

{% include modules/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code _code/basic_dom.html full %}

まず、ごく基本的なケースから始めましょう。シンプルな HTML ページにテキストが少し、画像が 1 つあるとします。このシンプルなページを処理する際、ブラウザはどのような作業を必要とするでしょうか？

<img src="images/full-process.png" alt="DOM 構築プロセス">

1. **変換:** ブラウザは、ディスクやネットワークから HTML の未加工のバイトを読み取り、ファイルに指定されているエンコード方法（UTF-8 など）に基づいて個々の文字に翻訳します。
2. **トークン化:** ブラウザは、文字列を [W3C HTML5 標準](http://www.w3.org/TR/html5/)で規定されている個々のトークンに変換します。たとえば、「<html>」や「<body>」など、山括弧に囲まれている文字列が該当します。各トークンには、固有の意味と、ルールセットがあります。
3. **字句解析:** 発行されたトークンは、プロパティとルールを定義する「オブジェクト」に変換されます。
4. **DOM 構築:** 最後に、作成されたオブジェクトが、HTML マークアップで定義されているタグごとの関係性に基づき（一部のタグは他のタグの内部に含まれます）、ツリー型のデータ構造の中でリンクされます。また、このツリーでは、元のマークアップで定義されている親子関係（_HTML_ オブジェクトは _body_ オブジェクトの親、_body_ オブジェクトは _paragraph_ オブジェクトの親、など）も反映されます。

<img src="images/dom-tree.png" class="center" alt="DOM ツリー">

**このプロセス全体の最終的な結果として、シンプルなサンプルページのドキュメント オブジェクト モデル（DOM）が構築されます。ブラウザはこれを利用して、その後のページの処理を行います。**

ブラウザが HTML マークアップを処理するたびに、上記のステップをすべて行う必要となります。バイトを文字に変換し、トークンを識別し、トークンをノードに変換し、DOM ツリーを構築します。この全体のプロセスは時間がかかるもので、特に処理する HTML が大規模な場合、顕著になります。

<img src="images/dom-timeline.png" class="center" alt="DevTools で DOM 構築をトレースする">

{% include modules/remember.liquid title="Note" list=page.notes.devtools %}

Chrome DevTools を開き、ページの読み込み時にタイムラインを記録すると、このステップを実行する上で必要とされた実際の時間を知ることができます。上記のサンプルの場合、HTML のバイトのかたまりを DOM ツリーに変換するのに、約 5 ms かかります。多くのページが実際そうであるように、ページが大規模になると、このプロセスにかかる時間は大幅に長くなります。後のセクションでは、スムーズなアニメーションを作成するので、ブラウザが大規模な HTML を処理しなければならない場合に、容易にボトルネックになることが実感できるでしょう。

DOM ツリーの準備が整うと、ページを画面にレンダリングする上で必要な情報はすべて揃うでしょうか。いいえ、まだです。DOM ツリーは、ドキュメント マークアップのプロパティと関係性を示しますが、各要素がレンダリング時にどのように表示されるのかという点については何も伝えません。これは、CSSOM の仕事です。次は CSSOM について見てみましょう。

## CSS オブジェクト モデル（CSSOM）

ブラウザがシンプルなサンプルページの DOM を構築している間、ドキュメントの head セクションで link タグに遭遇します。このタグは、外部の CSS スタイルシート「style.css」を参照しています。ブラウザは、ページのレンダリングにはこのリソースが必要であると想定しつつ、すぐにこのリソースに対してリクエストをディスパッチします。すると、次のコンテンツが返ってきます。

{% include_code _code/style.css full css %}

もちろん、HTML マークアップの内部で直接スタイルを宣言することもできますが（インライン）、CSS を HTML から独立させておくことで、コンテンツの問題とデザインの問題を別個のものとして扱うことができます。たとえば、デザイナーは CSS について作業を行い、デベロッパーは HTML に集中するといった分業が可能になります。

取得した CSS ルールは、HTML と同様、ブラウザが理解可能、処理可能なものに変換する必要があります。そのため、HTML のケースと同様のプロセスが繰り返されます。

<img src="images/cssom-construction.png" class="center" alt="CSSOM 構築ステップ">

CSS のバイトは文字に変換され、トークンとノードに変換され、「CSS オブジェクト モデル（CSSOM）」というツリー構造にリンクされます。

<img src="images/cssom-tree.png" class="center" alt="CSSOM ツリー">

CSSOM はなぜツリー構造なのでしょうか？ページ上のオブジェクトに対して最終的なスタイルセットを処理する際、ブラウザは、そのノードに当てはまる最も一般的なルールから開始します（たとえば、body 要素の子である場合、すべての body スタイルが適用されます）。そして、個々のルールを適用することで、一度処理したスタイルを順次調整します。このルールは「カスケード ダウン」と呼ばれます。

上記の CSSOM ツリーを例に、具体的に理解しましょう。body 要素の内部に配置される _span_ タグに囲まれたテキストは、フォントサイズが 16 ピクセルで赤色のテキストになります。font-size ディレクティブは、body から span にカスケード ダウンされています。ただし、span タグが paragraph（p）タグの子である場合、そのコンテンツは表示されません。

なお、上記のツリーは、完全な CSSOM ツリーではなく、スタイルシートでオーバーライドすると決めたスタイルだけが表示されています。各ブラウザには、「ユーザー エージェント スタイル」というデフォルトのスタイルセットが用意されており、独自のスタイルを指定していない場合、このスタイルで表示されます。スタイルを指定すると、デフォルト スタイル（[デフォルト IE スタイル](http://www.iecss.com/)など）はすぐにオーバーライドされます。Chrome DevTools で「処理済みスタイル」について調べてみると、上記に示したように、さまざまな由来のスタイルがあることがわかります。

CSS の処理はどれくらい時間がかかるでしょうか。DevTools でタイムラインを記録し、[Recalculate Style] を選択します。DOM 解析とは異なり、タイムラインには個別の [Parse CSS] は表示されません。解析、CSSOM ツリー構築、このイベント下の処理済みスタイルの順次的計算が取得されます。

<img src="images/cssom-timeline.png" class="center" alt="DevTools で CSSOM 構築をトレースする">

シンプルなサンプル スタイルシートは、処理に約 0.6 ms かかり、ページ内の 8 つの要素に影響を与えています。たいしたことはないようですが、決してゼロではありません。さて、8 つの要素はどこから来たのでしょうか。CSSOM と CSSOM は独立したデータ構造です。したがって、ブラウザは、重要なステップを背後で行っていることになります。次のトピックでは、DOM と CSSOM をリンクさせるレンダリング ツリーについて説明します。

{% include modules/nextarticle.liquid %}

{% endwrap %}

