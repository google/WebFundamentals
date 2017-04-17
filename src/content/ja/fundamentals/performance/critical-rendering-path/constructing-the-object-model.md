project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ブラウザで DOM ツリーおよび CSSOM ツリーを構築する方法を説明します。

{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2014-03-31 #}

#  オブジェクト モデルの構築 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

ブラウザでは、ページをレンダリングする前に、DOM ツリーおよび CSSOM ツリーを構築する必要があります。そのため、HTML と CSS の両方ができるだけ早くブラウザに提供されるようにする必要があります。


### TL;DR {: .hide-from-toc }
- バイト→文字→トークン→ノード→オブジェクトモデル。
- HTML マークアップはドキュメント オブジェクト モデル（DOM）に変換され、CSS マークアップは CSS オブジェクト モデル（CSSOM）に変換されます。
- DOM と CSSOM は独立したデータ構造です。
- Chrome DevTools の Timeline を利用すると、DOM と CSSOM の構築コストと処理コストをキャプチャして調査することができます。


## ドキュメント オブジェクト モデル（DOM）

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/basic_dom.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/basic_dom.html){: target="_blank" .external }

まずは、テキストと画像 1 枚から成るシンプルな HTML ページから始めましょう。ブラウザが、このページをどのように処理するのか見ていきます。

<img src="images/full-process.png" alt="DOM 構築プロセス">

1. **変換: ** ブラウザは、ディスクやネットワークから HTML の未加工のバイトを読み取り、ファイルに指定されているエンコード方法（UTF-8 など）に基づいて個々の文字に変換します。
1. **トークン化:** ブラウザは、文字列を [W3C HTML5 標準](http://www.w3.org/TR/html5/){: .external }で指定されている個々のトークン（「&lt;html&gt;」、「&lt;body&gt;」などの山括弧で囲まれた文字列）に変換します。各トークンには、固有の意味と、一連のルールがあります。
1. **字句解析:** 発行されたトークンは、プロパティとルールを定義する「オブジェクト」に変換されます。
1. **DOM の構築:** HTML マークアップには各種タグ間の関係（一部のタグは他のタグの内部に含まれる）が定義されているため、最終的に、元のマークアップで定義されている親子関係もキャプチャしているツリー型のデータ構造に、作成されたオブジェクトがリンクされます。つまり、_HTML_ オブジェクトは _body_ オブジェクトの親であり、_body_ は _paragraph_ オブジェクトの親という関係になります。

<img src="images/dom-tree.png"  alt="DOM ツリー">

**このプロセス全体の最終的な結果が、このシンプルなサンプルページのドキュメント オブジェクト モデル（DOM）です。ブラウザでは以降このページを処理する際に、必ずこの DOM を使用します。**

ブラウザは HTML マークアップを処理するたびに、バイトを文字に変換し、トークンを識別してトークンをノードに変換し、DOM ツリーを構築するという上記の全ステップを行う必要があります。この一連のプロセスには時間がかかることがあります。特に処理する HTML が大量の場合は、その傾向が顕著です。

<img src="images/dom-timeline.png"  alt="DevTools での DOM 構築のトレース">

注: ここでは、Chrome DevTools に関する基本知識、つまり、ネットワーク ウォーターフォールのキャプチャ方法やタイムラインの記録方法に関する知識があることを前提としています。これらの内容を簡単に復習する必要がある場合は、<a href='/web/tools/chrome-devtools/'>Chrome DevTools のドキュメント</a>をご覧ください。DevTools を始めて使用する場合は、Code School の <a href='http://discover-devtools.codeschool.com/'>Discover DevTools</a> コースの受講をおすすめします。

Chrome DevTools を開き、ページの読み込み時にタイムラインを記録すると、そのステップを実行するために実際にかかった時間を確認できます。上記のサンプルの場合、一連の HTML を DOM ツリーに変換するのに 5 ms 近くかかっています。さらに大きなページの場合は、このプロセスが大幅に長くなる可能性があります。スムーズなアニメーションを作成するとき、ブラウザが大量の HTML を処理しなければならない場合に、この仕組みによって容易にボトルネックが生じるおそれがあります。

DOM ツリーは、ドキュメント マークアップのプロパティおよび関係性をキャプチャしていますが、各要素がレンダリング時にどのように表示されるのかは示していません。こは CSSOM の範疇です。

##  CSS オブジェクト モデル（CSSOM）

ブラウザで、このシンプルなページの DOM を構築している間に、ドキュメントの head セクションで link タグに遭遇しました。このタグは、外部の CSS スタイルシート style.css を参照しています。ブラウザは、ページのレンダリングにはこのリソースが必要であると想定して、このリソースに対するリクエストを即座にディスパッチします。これにより、次のコンテンツが返されます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/style.css" region_tag="full" adjust_indentation="auto" %}
</pre>

HTML マークアップの内部で直接スタイルを宣言することもできますが（インライン）、CSS を HTML から独立させておくことで、コンテンツとデザインを切り離して扱うことができます。デザイナーは CSS で作業をして、デベロッパーは HTML に集中するといったことが可能です。

HTML と同じく、取得した CSS ルールをブラウザで認識および処理できる状態に変換する必要があります。このため、HTML ではなく CSS のために HTML のプロセスを繰り返します。

<img src="images/cssom-construction.png"  alt="CSSOM 構築ステップ">

CSS のバイトが文字、トークン、ノードへと変換されていき、最終的に「CSS オブジェクト モデル」（CSSOM）というツリー構造にリンクされます。

<img src="images/cssom-tree.png"  alt="CSSOM ツリー">

CSSOM はなぜツリー構造をしているのでしょうか。ページ上の任意のオブジェクトに対する最終的な一連のスタイルを計算する際に、ブラウザでは、そのノードに当てはまる最も一般的なルールから開始します（たとえば、body 要素の子要素には、すべての body スタイルを適用）。次に、より具体的なルールを適用することで、一度計算したスタイルを再帰的に調整します。つまり、「カスケード ダウン」でルールを適用します。

上記の CSSOM ツリーを使って具体的に説明します。body 要素の内部に配置されている _span_ タグに囲まれたテキストは、フォントサイズ 16 ピクセルの赤色のテキストになります。font-size ディレクティブが、body から span にカスケード ダウンされています。一方、span タグが段落（p）タグの子である場合、そのコンテンツは表示されません。

また、上記のツリーは、完全な CSSOM ツリーではなく、独自のスタイルシートでオーバーライドすると決めたスタイルだけが表示されています。各ブラウザには、「ユーザー エージェント スタイル」というデフォルトの一連のスタイルが用意されています。独自のスタイルを指定していない場合は、このスタイルで表示されます。スタイルを指定すると、このデフォルト（[デフォルト IE スタイル](http://www.iecss.com/){: .external }など）が単純にオーバーライドされます。

CSS の処理時間を把握するには、DevTools でタイムラインを記録し、「Recalculate Style」イベントを探します。DOM 解析とは異なり、タイムラインには個別の「Parse CSS」エントリはありません。代わりに、この単一のイベントにおいて、解析、CSSOM ツリー構築、計算済みスタイルの再起計算がキャプチャされます。

<img src="images/cssom-timeline.png"  alt="DevTools での CSSOM 構築のトレース">

この小さなスタイルシートは、処理に最大 0.6 ms かかり、ページ内の 8 つの要素に影響を与えています。ささいな影響とはいえ、ゼロではありません。ところで、この 8 個の要素はどこにあったのでしょう。CSSOM と DOM は独立したデータ構造です。そうです、ブラウザに重要なステップが隠されているのです。次に、DOM と CSSOM をリンクする[レンダリング ツリー](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)について説明します。

<a href="render-tree-construction" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Render-Tree Construction">
  <button>次のトピック: レンダリング ツリーの構築、レイアウト、ペイント</button>
</a>


{# wf_devsite_translation #}
