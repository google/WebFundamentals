project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Layout shifter {: .page-title }

{% include "_shared/contributors/TODO.html" %}



layout shifter パターンは、複数の画面の幅にわたって複数のブレークポイントを有する、 レスポンシブ パターンの代表例です。

このレイアウトの鍵は、リフローや他の列の下へのドロップではなく、
コンテンツの移動です。  各主要ブレイクポイント間の大きな差によって、維持が複雑になり、
全体的なコンテンツのレイアウトだけでなく、要素内の変化が
含まれる可能性があります。

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg">
  お試しください
{% endlink_sample %}

この簡単な例では、ayout shifter パターンを示しています。
小さな画面ではコンテンツは垂直にスタックされますが、
画面が大きくなるにつれて大幅に変化します。左に `div` および右に 2 つのスタックされた `div` を持ちます。

このパターンを使用するサイトには以下が含まれます。

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/layout-shifter.html" region_tag="lshifter" lang=css %}
</pre>


