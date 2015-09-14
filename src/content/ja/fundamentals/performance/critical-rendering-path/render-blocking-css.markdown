---
title: "レンダリング ブロック CSS"
description: "デフォルトでは、CSS はレンダリング ブロック リソースとして扱われます。つまり、ブラウザは、CSSOM の構築が完了するまで、処理済みコンテンツのレンダリングを保留します。CSS をシンプルにして、できる限り早く配信されるようにし、メディアタイプやメディアクエリを利用して、レンダリングをブロックしないようにします。"
updated_on: 2014-09-18
related-guides:
  media-queries:
    -
      title: 反応性を高めるため CSS メディアクエリを利用する
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "レスポンシブなウェブデザイン"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - デフォルトでは、CSS はレンダリング ブロック リソースとして扱われます。
    - メディアタイプやメディアクエリを利用すると、一部の CSS リソースを非レンダリング ブロックとしてマーキングすることができます。
    - CSS リソースは、ブロック リソースであるか非ブロック リソースであるかにかかわらず、すべてブラウザによってダウンロードされます。
---
<p class="intro">
  デフォルトでは、CSS はレンダリング ブロック リソースとして扱われます。つまり、ブラウザは、CSSOM の構築が完了するまで、処理済みコンテンツのレンダリングを保留します。CSS をシンプルにして、できる限り早く配信されるようにし、メディアタイプやメディアクエリを利用して、レンダリングをブロックしないようにします。
</p>



前のセクションでは、クリティカル レンダリング パスにおいて DOM と CSSOM の両方がレンダリング ツリーの構築に必要だということを理解しました。これは、パフォーマンスを最適化する上で重要なポイントです。**HTML も CSS も、レンダリング ブロック リソースなのです。**HTML の方は明白です。DOM がなければ、何もレンダリングすることはできません。しかし、CSS の要件はそれほど明白ではありません。CSS によるレンダリングのブロックを回避して、一般的なページをレンダリングした場合、何が起こるのでしょうか？

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
<b>CSS のある NYTimes</b>
<img class="center" src="images/nytimes-css-device.png" alt="CSS のある NYTimes">

  </div>

  <div class="mdl-cell mdl-cell--6--col">
<b>CSS のない NYTimes（FOUC）</b>
<img src="images/nytimes-nocss-device.png" alt="CSS のない NYTimes">

  </div>
</div>

{% comment %}
<table class="mdl-data-table mdl-js-data-table">
<tr>
<td>CSS のある NYTimes</td>
<td>CSS のない NYTimes（FOUC）</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="CSS のある NYTimes" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="CSS のない NYTimes" class="center"></td>
</tr>
</table>
{% endcomment %}

上記のサンプルは、NYTimes のウェブサイトを例に CSS があるバージョンと CSS がないバージョンを示しています。なぜ CSS の準備が整うまでレンダリングがブロックされるのか、これでわかります。CSS がない場合、ページは実質的に利用不可能です。右側のような状態は「FOUC（Flash of Unstyled Content）」と呼ばれます。そのため、ブラウザは、DOM と CSSOM の両方が揃うまでレンダリングをブロックします。

> **CSS は、レンダリング ブロック リソースです。できる限り早くクライアントに渡し、最初のレンダリング時間を最適化する必要があります。**

CSS スタイルが特定の状況でしか利用されない場合、たとえば、ページを印刷する場合や、大きなモニターに映し出す場合に限定されるのであれば、このようなリソースでレンダリングがブロックされないことが重要です。

CSS の「メディアタイプ」や「メディアクエリ」は、このような利用方法での対策に最適です。

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

[メディアクエリ]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html)は、メディアタイプと、0 個または 1 個以上の式で構成されます。式は、特定のメディア機能の条件をチェックするためのものです。たとえば、1 番目のスタイルシートの宣言は、メディアタイプやメディアクエリを指定していないため、あらゆるケースに適用されます。つまり、常にレンダリング ブロックになります。他方、2 番目のスタイルシートは、コンテンツが印刷される場合にのみ適用されます。レイアウトやフォントを変更したい、といった理由が考えられます。このスタイルシートは、最初の読み込まれても、ページのレンダリングをブロックする必要はありません。最後に、3 番目のスタイルシートの宣言は、ブラウザが実行する「メディアクエリ」を指定しています。条件に合致すると、ブラウザは、スタイルシートのダウンロードと処理が完了するまで、レンダリングをブロックします。

メディアクエリを利用することで、ディスプレイ表示時と印刷時の区別など、個々の利用方法に応じてページ表示を調整できます。また、画面方向の変化やサイズ変更イベントなど、動的な条件に合わせて調整することもできます。**スタイルシート アセットを宣言する際は、メディアタイプとメディアクエリに十分注意してください。クリティカル レンダリング パスに対してパフォーマンス面で大きな影響を持ちます。**

{% include shared/related_guides.liquid inline=true list=page.related-guides.media-queries %}

実践的なサンプルで考察してみましょう。

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* 1 番目の宣言はレンダリング ブロックで、あらゆる条件に合致します。
* 2 番目の宣言もレンダリング ブロックです。「all」はデフォルト タイプであり、タイプを指定しなかった場合、自動的に「all」に設定されます。したがって、1 番目と 2 番目の宣言は実質的に同じものです。
* 3 番目の宣言は、動的メディアクエリを含んでおり、ページが読み込まれる際に評価されます。ページが読み込まれたときのデバイスの方向に応じて、portrait.css がレンダリング ブロックになるかどうかが決まります。
* 4 番目の宣言は、ページが印刷される場合にのみ適用されます。そのため、ページが最初にブラウザに読み込まれる際にはレンダリング ブロックとはなりません。

最後に、「レンダリング ブロック」とは、そのリソースのために、ページの最初のレンダリングをブラウザが保留する必要があるかどうかということだけを示す表現です。CSS アセットは、非ブロック リソースとして優先順位が低い場合であっても、必ずブラウザによってダウンロードされます。



