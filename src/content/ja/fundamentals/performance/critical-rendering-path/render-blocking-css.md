project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: デフォルトでは CSS はレンダリング ブロック リソースとして扱われます。CSS によるレンダリングのブロックを回避する方法について説明します。

{# wf_updated_on:2014-09-17 #}
{# wf_published_on:2014-03-31 #}

#  レンダリング ブロック CSS {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

デフォルトでは、CSS はレンダリング ブロック リソースとして扱われます。つまり、ブラウザは、CSSOM の構築が完了するまで、処理済みコンテンツのレンダリングを保留します。
CSS のサイズを削減して、できるだけ早く配信されるようにし、メディアタイプやメディアクエリを利用してレンダリングのブロックを解除してください。


[レンダリング ツリーの構築](render-tree-construction)セクションで、クリティカル レンダリング パスでは、レンダリング ツリーを構築するために DOM と CSSOM の両方が必要であるということを説明しました。このことは、パフォーマンス上重要な意味を持ちます。すなわち、**HTML と CSS の両方がレンダリング ブロック リソースなのです。**DOM がなければレンダリングできないのですから HTML については理解できます。しかし、CSS が必要である理由はわかりにくいかもしれません。CSS によるレンダリングのブロックを回避して、一般的なページをレンダリングするとどうなるでしょうか。

### TL;DR {: .hide-from-toc }
- デフォルトでは、CSS はレンダリング ブロック リソースとして扱われます。
- メディアタイプやメディアクエリを利用すると、一部の CSS リソースを非レンダリング ブロックとして指定することができます。
- CSS リソースは、ブロック リソースであるか非ブロック リソースであるかにかかわらず、すべてブラウザでダウンロードされます。


<div class="attempt-left">
  <figure>
    <img src="images/nytimes-css-device.png" alt="CSS ありの NYTimes">
    <figcaption>CSS ありの The New York Times</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/nytimes-nocss-device.png" alt="CSS なしの NYTimes">
    <figcaption>CSS なしの The New York Times（FOUC）</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

上記の例では、CSS ありと CSS なしで NYTimes のウェブサイトを表示しています。これを見ると、CSS の準備が整うまでレンダリングがブロックされる理由がわかります。CSS がない場合、ページは実質的に利用不可能です。右側のような状態は、一般に「FOUC（Flash of Unstyled Content）」と呼ばれます。ブラウザは、DOM と CSSOM の両方が揃うまでレンダリングをブロックします。

> **_CSS はレンダリング ブロック リソースです。できるだけ早くクライアントに配信して、最初のレンダリングまでの時間を最適化する必要があります。_**

一方、ページの印刷や大型モニターへの投影など、特定の状況でのみ使用される CSS スタイルがある場合はどうなるでしょうか。このようなリソースでは、レンダリングをブロックする必要がないということは耳よりな情報でしょう。

CSS の「メディアタイプ」および「メディアクエリ」を使用すると、次のようなユースケースに対応できます。


    <link href="style.css" rel="stylesheet">
    <link href="print.css" rel="stylesheet" media="print">
    <link href="other.css" rel="stylesheet" media="(min-width: 40em)">
    

[メディアクエリ](../../design-and-ux/responsive/#use-css-media-queries-for-responsiveness)は、メディアタイプと、0 個以上の式（式は特定のメディア機能の条件をチェック）で構成されます。たとえば、1 番目のスタイルシートの宣言は、メディアタイプやメディアクエリを指定していないため、あらゆるケースに適用されます。つまり、常にレンダリング ブロックになります。一方で 2 番目のスタイルシートは、コンテンツが印刷される場合にのみ適用されます。レイアウトやフォントを変更したい、といった理由が考えられます。このスタイルシートは、最初の読み込まれても、ページのレンダリングをブロックする必要はありません。最後のスタイルシートの宣言は、ブラウザによって実行される「メディアクエリ」を規定しています。条件が一致すると、ブラウザは、スタイルシートのダウンロードと処理が完了するまで、レンダリングをブロックします。

メディアクエリを利用することで、表示用と印刷用など、具体的なユースケースに合わせて体裁を調整でき、画面方向の変化やサイズ変更イベントなど、動的な条件に合わせて調整を行うこともできます。**スタイルシート アセットを宣言する際は、メディアタイプとメディアクエリに十分注意してください。クリティカル レンダリング パスのパフォーマンスに大きな影響を与えます。**

実践的なサンプルで考察してみましょう。


    <link href="style.css"    rel="stylesheet">
    <link href="style.css"    rel="stylesheet" media="all">
    <link href="portrait.css" rel="stylesheet" media="orientation:portrait">
    <link href="print.css"    rel="stylesheet" media="print">
    

* 1 つ目の宣言はレンダリング ブロックであり、すべての条件と一致します。
* 2 つ目の宣言もレンダリング ブロックです。「all」はデフォルトのタイプであり、タイプを指定しなかった場合、暗黙で「all」に設定されます。したがって、1 つ目と 2 つ目の宣言は、実のところ同等です。
* 3 つ目の宣言には、ページの読み込み時に評価される動的メディアクエリが含まれています。ページが読み込まれるときの端末画面の向きに応じて、portrait.css がレンダリング ブロックになるかどうかが決まります。
* 最後の宣言は、ページが印刷される際にのみ適用されます。したがって、ページが最初にブラウザに読み込まれる際にはレンダリング ブロックにはなりません。

最後になりますが「レンダリング ブロック」とは、ブラウザが、該当するリソースでページの初回レンダリングを保留する必要があるか否かということだけを指しています。いずれの場合も、非ブロック リソースで優先順位が低い CSS アセットもブラウザによってダウンロードされます。

<a href="adding-interactivity-with-javascript" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Adding Interactivity with JS">
  <button>次のトピック: JavaScript を使用してインタラクティブにする</button>
</a>


{# wf_devsite_translation #}
