project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# CSS メディア クエリを使用してレスポンシブにする {: .page-title }

{% include "_shared/contributors/TODO.html" %}


メディア クエリは、CSS スタイルに適用できるシンプルなフィルタです。メディア クエリを使用すると、デバイスの種類、幅、高さ、向き、解像度など、コンテンツをレンダリングするデバイスの特性に基づいてスタイルを容易に変更できるようになります。




## TL;DR {: .hide-from-toc }
- メディア クエリを使用して、デバイスの特性に基づいてスタイルを適用できる。
- <code>min-device-width</code> ではなく <code>min-width</code> を使用して、広範な環境を確実にサポートする。
- レイアウトの崩れを防ぐため、要素に相対サイズを使用する。



たとえば、印刷時に必要なすべてのスタイルを、印刷用のメディア クエリ内に記述することができます。


    <link rel="stylesheet" href="print.css" media="print">
    

スタイルシートのリンクで media 属性を使用する方法のほかに、CSS ファイル内に @media または @import を挿入する方法でもメディア クエリを適用できます。パフォーマンス上の理由から、@import 構文ではなく、最初の 2 つの方法のいずれかを使用するようおすすめします（[CSS のインポートを避ける]({{site.fundamentals}}/performance/critical-rendering-path/page-speed-rules-and-recommendations.html）をご覧ください）。


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

メディア クエリに適用されるロジックは相互排他的ではないため、選択された CSS でブロックされる条件に一致するすべてのフィルタは、CSS の標準の優先ルールに従って適用されます。

## ビューポートのサイズに基づいてメディア クエリを適用する

メディア クエリを使用するとレスポンシブなエクスペリエンスを構築できます。レスポンシブなエクスペリエンスでは、小さい画面、大きい画面、それらの中間の任意のサイズに特定のスタイルが適用されます。メディア クエリの構文では、デバイスの特性に応じて適用されるルールを作成することができます。


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

さまざまなアイテムをクエリすることができますが、レスポンシブ ウェブデザインでは、min-width、max-width、min-height、max-height がよく使用されます。


<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="attribute">属性</th>
      <th data-th="Result">結果</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">ブラウザの幅がクエリに定義された値より広い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">ブラウザの幅がクエリに定義された値より狭い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">ブラウザの高さがクエリに定義された値より高い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">ブラウザの高さがクエリに定義された値より低い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">ブラウザの高さが、幅と同じかそれ以上の場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">ブラウザの幅の値が、高さよりも大きい場合にルールが適用されます。</td>
    </tr>
  </tbody>
</table>

以下の例で説明します。

<figure>
  {% link_sample _code/media-queries.html %}
    <img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="メディア クエリを使用してサイズ変更時にプロパティを変更するページのプレビュー。">
  {% endlink_sample %}
</figure>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/fundamentals/_code/media-queries.html" region_tag="mqueries" %}
</pre>

* ブラウザの幅が <b>0px</b>～<b>640px</b> の場合、max-640px.css が適用されます。
* ブラウザの幅が <b>500px</b>～<b>600px</b> の場合、@media 内のスタイルが適用されます。
* ブラウザの幅が <b>640px 以上</b>の場合、min-640px.css が適用されます。
* ブラウザの<b>幅の値が高さよりも大きい</b>場合、landscape.css が適用されます。
* ブラウザの<b>高さの値が幅よりも大きい</b>場合、portrait.css が適用されます。


## min-device-width についての注意

*-device-width に基づくクエリを作成することもできますが、この方法は**使用しないことを強くおすすめします**。

前出の方法とこの方法の間には、わずかではあるものの極めて重要な違いがあります。min-width はブラウザ ウィンドウのサイズに基づきますが、min-device-width は画面のサイズに基づいています。一部のブラウザ（古い Android ブラウザを含む）ではデバイスの幅が正しく通知されず、画面の幅が、予期されるビューポートの幅ではなくデバイス ピクセルで通知される場合があります。

さらに、*-device-width を使用すると、ウィンドウのサイズ変更が可能なパソコンや他のデバイスでコンテンツが対応できないことがあります。これは、クエリがブラウザ ウィンドウのサイズではなく実際のデバイスのサイズに基づいているためです。

## 相対的な単位を使用する

レスポンシブ デザインを支える主なコンセプトとして、固定幅のレイアウトとは対照的な流動性と比例性が挙げられます。サイズに相対的な単位を使用すると、レイアウトをシンプルにできるほか、誤ってビューポートに収まらないコンポーネントを作成することを防止できます。

たとえば、トップレベルの div に width: 100% と設定すれば、その div の幅は確実にビューポートの幅になるため、ビューポートより大きすぎる（または小さすぎる）ということは生じません。この div は、幅が 320px の iPhone、342px の BlackBerry Z10、360px の Nexus 5 のどの端末でも適切に表示されます。

また、相対的な単位を使用することで、ブラウザがページに横スクロールバーを追加することなく、ユーザーのズームレベルに基づいてコンテンツを表示できます。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-danger text-center">NO</h2>
{% highlight css %}div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}{% endhighlight %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <h2 class="text-success text-center">YES</h2>
{% highlight css %}div.fullWidth {
  width: 100%;
}{% endhighlight %}
  </div>
</div>



