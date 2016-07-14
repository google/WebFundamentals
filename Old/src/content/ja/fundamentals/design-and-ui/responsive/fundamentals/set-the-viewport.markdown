---
title: "ビューポートを設定する"
description: "ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。"
updated_on: 2014-09-12
key-takeaways:
  set-viewport:
    - meta viewport タグを使用して、ブラウザのビューポートの幅とスケーリングを制御する。
    - <code>width=device-width</code> を追加して、画面の幅をデバイス非依存ピクセルに合わせる。
    - <code>initial-scale=1</code> を追加して、CSS ピクセルとデバイス非依存ピクセルの間に 1:1 の関係を確立する。
    - ユーザーによるスケーリングを無効にせず、ページに確実にアクセスできるようにする。
  size-content-to-vp:
    - 大きな固定幅の要素を使用しない。
    - コンテンツを正しくレンダリングするうえで、特定のビューポートの幅に依存しないようにする。
    - CSS メディア クエリを使用して、小さい画面と大きい画面で異なるスタイルを適用する。
  media-queries:
    - メディア クエリを使用して、デバイスの特性に基づいてスタイルを適用できる。
    - <code>min-device-width</code> ではなく <code>min-width</code> を使用して、広範な環境を確実にサポートする。
    - レイアウトの崩れを防ぐため、要素に相対サイズを使用する。
  choose-breakpoints:
    - コンテンツに基づいたブレークポイントを作成する。特定のデバイス、製品、ブランドは基準にしない。
    - まず最初に最も小さい携帯端末向けにデザインし、そのうえで、画面上で利用できるスペースの増加に応じて段階的にエクスペリエンスを広げる。
    - テキスト行の最大文字数は 70～80 文字程度に収める。
notes:
  use-commas:
    - 属性の区切りにはカンマを使用して、古いブラウザでも属性を正確に解釈できるようにする。
---
<p class="intro">
  ページをさまざまなデバイス向けに最適化するには、ドキュメントの head 部に meta viewport 要素を含める必要があります。meta viewport タグは、ページのサイズとスケーリングの制御方法についてブラウザに指示を与えます。
</p>



{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.set-viewport %}

最適なエクスペリエンスを提供するために、モバイル ブラウザではページをパソコンの画面幅（通常はおよそ 980px、ただしデバイスにより異なる）でレンダリングしたうえで、フォント サイズを大きくしたりコンテンツを画面に合わせてスケーリングすることで外観の向上を試みます。その結果、ユーザーにとっては、フォント サイズに一貫性がないように見えたり、コンテンツの表示や操作のためにダブルタップやピンチによるズーム操作が必要になります。

{% highlight html %}
<meta name="viewport" content="width=device-width, initial-scale=1.0">
{% endhighlight %}


meta viewport の値 width=device-width を使用すると、画面の幅をデバイス非依存ピクセルで合わせるようページに指示が与えられます。これにより、小さい携帯端末と大きいパソコン用モニターのどちらでレンダリングするかを問わず、さまざまな画面サイズに合わせてページのコンテンツをリフローすることができます。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="ビューポートが設定されていないページ">
      例を表示する
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="ビューポートが設定されたページ">
      例を表示する
    {% endlink_sample %}
  </div>
</div>

一部のブラウザでは、横向きモードに回転した際もページが同じ幅に保たれ、リフローではなくズームによってコンテンツを画面サイズに合わせます。属性 initial-scale=1 を追加すると、デバイスの向きに関係なく CSS ピクセルとデバイス非依存ピクセルとの間に 1:1 の関係を確立するようブラウザに指示が与えられます。これにより、横向きにした場合にページ幅全体を利用できるようになります。

{% include shared/remember.liquid inline="True" list=page.notes.use-commas %}

## ビューポートに確実にアクセスできるようにする

ビューポートには、initial-scale のほかに次の属性も設定できます。

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

これらの属性を設定するとユーザーがビューポートをズームできなくなる場合があるため、ユーザー補助関連の問題が生じる可能性があります。



