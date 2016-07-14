---
title: "ブレークポイントの選択方法"
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
  デバイスのクラスに基づいてブレークポイントを定義する方法は便利な一方で、注意も必要です。現在使用されている特定のデバイス、製品、ブランド名、オペレーティング システムに基づいてブレークポイントを定義すると、メンテナンスが非常に困難になる可能性があります。コンテナに合わせてレイアウトをどのように調整するかは、コンテンツ自体によって決まるようにする必要があります。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.choose-breakpoints %}

## 小さい値から順にメジャー ブレークポイントを設定していく

まずコンテンツが小さな画面にコンテンツが収まるようにデザインし、そのうえで、ブレークポイントが必要となるまで画面を広げていきます。こうすることで、コンテンツに基づいてブレークポイントを最適化するとともに、ブレークポイントの数を最小限に抑えることができます。

最初に紹介した例（[天気予報]({{site.fundamentals}}/layouts/rwd-fundamentals/index.html））で作業していきます。
まず、小さい画面での予報の外観を整えます。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="小さい画面に表示された天気予報のプレビュー。">
  {% endlink_sample %}
</figure>

次に、要素の間の空白が広くなりすぎて予報が見づらくなるまで、ブラウザのサイズを大きくします。やや主観的な判断になりますが、サイズが 600px を超えると余白は明らかに広すぎます。

<figure>
  {% link_sample _code/weather-1.html %}
    <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="ページの幅を広げた天気予報のプレビュー。">
  {% endlink_sample %}
</figure>

600px にブレークポイントを設定するには、2 つのスタイルシートを新たに作成して、そのうちの 1 つをブラウザの幅が 600px 以下の場合に使用し、もう 1 つを 600px より広い場合に使用します。

{% include_code src=_code/weather-2.html snippet=mqweather2 %}

最後に、CSS をリファクタリングします。この例では、フォント、アイコン、基本的な配置、色などの共通のスタイルが weather.css に記述されています。そのうえで、小さい画面用の具体的なレイアウトが weather-small.css に、大きい画面用のスタイルが weather-large.css に記述されています。

<figure>
  {% link_sample _code/weather-2.html %}
    <img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">
  {% endlink_sample %}
</figure>

## 必要に応じてマイナー ブレークポイントを設定する

レイアウトが大きく変化する場合のメジャー ブレークポイントの選択に加えて、マイナーな変化にも対応することをおすすめします。たとえば、メジャー ブレークポイントの間において、要素のマージンやパディングを調整したり、レイアウト内でより自然になるようにフォントのサイズを大きくすると、見栄えが向上します。

まず、小さい画面のレイアウトを最適化します。このケースでは、ビューポートの幅が 360px を超えた際にフォントを大きくするようにします。次に、十分なスペースがある場合に、2 段重ねで表示されている最高気温と最低気温を分割し、同じ行に横に並べて表示します。また、天気のアイコンを少し大きくします。

{% include_code src=_code/weather-small.css snippet=mqsmallbpsm lang=css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints.">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints.">
  </div>
</div>

大きい画面の場合も同様に、予報パネルが画面幅いっぱいまで広がらないよう、予報パネルの最大幅を制限することをおすすめします。

{% include_code src=_code/weather-large.css snippet=mqsmallbplg lang=css %}

## テキストを読みやすいよう最適化する

従来より、読みやすいカラム幅とするには、1 行あたりの文字数を 70～80 文字（英単語で約 8～10 語）とすることが理想とされています。従って、テキスト ブロックの幅が約 10 語分広がるごとにブレークポイントの設定を検討する必要があります。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="マイナー ブレークポイントを追加する前。">
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="マイナー ブレークポイントを追加した後。">
  </div>
</div>

上記のブログ記事の例を詳しく見てみましょう。小さい画面では、1em の Roboto フォントで 1 行あたりの語数がちょうど 10 語になりますが、大きい画面ではブレークポイントが必要となります。この例では、ブラウザの幅が 575px を超えた場合の最適なコンテンツの幅は 550px です。

{% include_code src=_code/reading.html snippet=mqreading lang=css %}

## コンテンツを完全に非表示にしないようにする

画面サイズに応じてどのコンテンツを表示し、どのコンテンツを非表示にするかを選ぶ際は、注意が必要です。
画面に収まらないという理由だけで、コンテンツを単に非表示にすることは避けてください。ユーザーにとっては、必ずしも画面サイズだけが重要というわけではありません。たとえば、天気予報で花粉情報を非表示にしてしまうと、春先に花粉症が出る人にとっては、外出の可否の判断にその情報が必要なことから深刻な問題となる可能性があります。




