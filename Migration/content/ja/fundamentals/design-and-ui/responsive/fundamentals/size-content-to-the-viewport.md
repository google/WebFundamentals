---
title: "コンテンツのサイズをビューポートに合わせる"
description: "ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。"
updated_on: 2014-04-30
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
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple20
---
<p class="intro">
  ユーザーはパソコンと携帯端末のどちらにおいても、ウェブサイトを縦方向にスクロールすることには慣れていますが、横方向へのスクロールには慣れていません。このため、ページ全体を表示するためにユーザーに横方向へのスクロールやズームアウトをさせることは、ユーザー エクスペリエンスの低下につながります。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.size-content-to-vp %}

meta viewport タグを設定したモバイルサイトを構築する際、指定されたビューポートにうまく合わないページ コンテンツを誤って作成してしまうことがよくあります。たとえば、ビューポートよりも広い幅で表示される画像があると、ビューポートで横方向へのスクロールが発生します。ユーザーが横方向にスクロールしなくて済むよう、このコンテンツをビューポートの幅に収まるよう調整することが必要です。

画面サイズと CSS ピクセルの幅はデバイス間（携帯電話とタブレットの間や、異なる携帯電話間など）で大きく異なるため、コンテンツを適切に表示するうえでは、特定のビューポートの幅に依存しないようにする必要があります。

CSS でページ要素の width に大きな絶対値を設定すると（以下の例を参照）、幅の狭い端末（iPhone などの、幅が 320 CSS ピクセルの端末）のビューポートでは div が広くなりすぎます。代わりに、width: 100% などの相対的な幅の値を使用してください。同様に、位置指定に大きな絶対値を使用すると、小さい画面では要素がビューポートの外に出てしまう可能性があるため注意が必要です。

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="固定幅 344px の要素を持つページを iPhone で表示した場合の例。">
      例を表示する
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="固定幅 344px の要素を持つページを Nexus 5 で表示した場合の例。">
      例を表示する
    {% endlink_sample %}
  </div>
</div>



