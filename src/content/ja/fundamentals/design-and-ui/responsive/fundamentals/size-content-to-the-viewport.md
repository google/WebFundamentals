project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# コンテンツのサイズをビューポートに合わせる {: .page-title }

{% include "_shared/contributors/TODO.html" %}


ユーザーはパソコンと携帯端末のどちらにおいても、ウェブサイトを縦方向にスクロールすることには慣れていますが、横方向へのスクロールには慣れていません。このため、ページ全体を表示するためにユーザーに横方向へのスクロールやズームアウトをさせることは、ユーザー エクスペリエンスの低下につながります。


## TL;DR {: .hide-from-toc }
- 大きな固定幅の要素を使用しない。
- コンテンツを正しくレンダリングするうえで、特定のビューポートの幅に依存しないようにする。
- CSS メディア クエリを使用して、小さい画面と大きい画面で異なるスタイルを適用する。


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



