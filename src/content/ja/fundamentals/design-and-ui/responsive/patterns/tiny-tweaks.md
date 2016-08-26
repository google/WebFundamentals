project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Tiny tweaks {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Tiny tweaks はレイアウトのための小さな変更を行います。非常にマイナーなフォント サイズの調整、画像サイズの変更、コンテンツの移動などです。

これは、1 ページの線形ウェブ サイト、テキストの多い記事のような、
単一列のレイアウトに適しています。

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg">
  お試しください
{% endlink_sample %}

名前からわかるように、このサンプルでは、画面サイズの変化など少しだけの変更です。
画面の幅が大きくなるにつれて、フォントサイズやパディングを行います。

このパターンを使用するサイトには以下が含まれます。

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/tiny-tweaks.html" region_tag="ttweaks" lang=css %}
</pre>


