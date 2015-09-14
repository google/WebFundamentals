---
title: "アイコンに SVG を使用する"
description: "ページにアイコンを追加する際は、可能な限り SVG のアイコンを使用するか、場合によっては Unicode 文字を使用します。"
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - ラスター画像ではなく、SVG か Unicode のアイコンを使用する。
---

<p class="intro">
  ページにアイコンを追加する際は、可能な限り SVG のアイコンを使用するか、場合によっては Unicode 文字を使用します。
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## シンプルなアイコンを Unicode に置き換える

多くのフォントではさまざまな Unicode 記号をサポートしており、画像の代わりにこれらの記号を利用できます。画像とは異なり、Unicode フォントは劣化なしでスケーリングできるため、画面上でのサイズに関係なく鮮明に表示されます。

通常の文字セット以外に、Unicode には数字に準じるもの（&#8528;）、矢印（&#8592;）、数学記号（&#8730;）、幾何学模様（&#9733;）、制御機能用記号（&#9654;）、点字図形（&#10255;）、音楽記号（&#9836;）、ギリシャ文字（&#937;）、チェスの駒（&#9822;）などの記号が含まれています。

Unicode 文字は、HTML エンティティと同じように「&#XXXX」の形式で入力できます。「XXXX」には Unicode 文字の番号を指定します。次に例を示します。

{% highlight html %}
あなたはスーパー&#9733;です
{% endhighlight %}

あなたはスーパー&#9733;です

## 複雑なアイコンを SVG に置き換える
複雑なアイコンを使う必要がある場合は、SVG アイコンを使用します。SVG アイコンは一般に軽量で使いやすいほか、CSS でスタイルを設定できます。SVG には、ラスター画像と比較して次のような数多くのメリットがあります。

* ベクター グラフィックであるため、無限にスケーリングできます。
* 色、影、透明度、アニメーションなどの CSS 効果を直接適用できます。
* SVG 画像はドキュメントの行内に直接含めることができます。
* セマンティックです。
* 適切な属性の使用により、ユーザー補助にも対応できます。

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## アイコン フォントの使用には注意が必要

アイコン フォントは使いやすく、広く利用されていますが、SVG アイコンと比較するといくつか欠点があります。

* ベクター グラフィックであるため無限にスケーリングできますが、アンチエイリアス処理のためアイコンの輪郭が不鮮明になる場合があります。
* CSS によるスタイル設定に制限があります。
* line-height や letter-spacing などの設定によっては、ピクセル単位での完全な位置指定が難しい場合があります。
* セマンティックではないため、スクリーン リーダーなどの支援技術での利用が難しい場合があります。
* 使用範囲を適切に指定しないと、一部のアイコンを使用するためだけにファイルサイズが大きくなる場合があります。


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="フォント アイコンに FontAwesome を使用したページの例。">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

[Font Awesome](http://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/)、[GLYPHICONS](http://glyphicons.com/) など、有料および無料のアイコン フォントが数多く提供されています（リンク先はすべて英語）。

HTTP リクエストやファイルサイズの増加とアイコンの必要性を必ず比較検討してください。たとえば、必要なアイコンの数が少なければ、画像や画像ストライプを使用したほうが良い場合もあります。



