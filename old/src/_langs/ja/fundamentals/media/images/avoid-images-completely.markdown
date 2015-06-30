---
layout: article
title: "可能な限り画像を使用しない"
description: "最適な画像は、実際には画像でなくてもよいという場合もあります。可能であれば、同じ機能や類似した機能を提供する、ブラウザのネイティブ機能を使用してください。"
introduction: "最適な画像は、実際には画像でなくてもよいという場合もあります。可能であれば、同じ機能や類似した機能を提供する、ブラウザのネイティブ機能を使用してください。従来画像が必要であった視覚効果を、ブラウザで生成できます。これにより、ブラウザで画像ファイルを個別にダウンロードする必要がなくなるほか、不適切にスケーリングされた画像の表示を防止できます。アイコンは、Unicode やアイコン専用フォントを使用して表示できます。"
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-06-10
  order: 5
collection: images
key-takeaways:
  avoid-images:
    - 影、グラデーション、角丸などには可能な限り画像の使用を避け、代わりにブラウザの機能を利用します。
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


{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

## テキストは画像に埋め込まずマークアップ内に配置する

可能な限り、テキストはテキスト形式にする必要があります。画像に埋め込む（たとえば、見出しに画像を使用する、電話番号や住所などの連絡先情報を画像に直接含めるなど）ことは避けてください。画像に埋め込むと、ユーザーが情報をコピーして貼り付けられなくなり、スクリーン リーダーも情報にアクセスできなくなるほか、レスポンシブにできなくなります。テキストはマークアップ内に配置し、必要な場合はウェブフォントを使用して所要のスタイルを適用してください。

## CSS を使用して画像を置き換える

最近のブラウザでは、従来は画像を必要としていたスタイルを、CSS の機能を使用して実現できます。たとえば、<code>background</code> プロパティを使用して複雑なグラデーションを、<code>box-shadow</code> プロパティを使用して影を、<code>border-radius</code> プロパティを使用して角丸を作成できます。

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
  
  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>
<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

これらの手法の使用はレンダリング サイクルを必要とするため、携帯端末ではパフォーマンスに影響する可能性があります。使用しすぎると、CSS 化で得られるメリットが失われるほか、パフォーマンスが低下する可能性もあります。

{% include modules/nextarticle.liquid %}

{% endwrap %}

