project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Off canvas {: .page-title }

{% include "_shared/contributors/TODO.html" %}



縦にコンテンツをスタックするよりも、オフキャンバス パターンは、使用頻度の低いコンテンツを配置します。おそらくナビゲーションやアプリ メニューでオフキャンバスになり、画面サイズが十分に大きい場合にのみ表示され、小さい画面ではコンテンツはクリックでが離れます。

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg">
  お試しください
{% endlink_sample %}

縦にコンテンツをスタックするよりも、このサンプルでは `transform: translate(-250px, 0)` を使用して、コンテンツ
`div` の 2 つを非表示にします。  JavaScript を使用して、
オープンクラスを追加することで  div を表示し、要素を可視化します。  画面の幅が大きくなるにつれて、
オフスクリーンの位置は要素から除去され
可視ビューポート内に表示されます。

このサンプルでは、Safari for iOS 6 および Android Browser は `flexbox` の
`flex-flow: row nowrap` 機能をサポートしないことに注意してください。
このため、絶対位置にフォールバックしなければなりませんでした。

このパターンを使用するサイトには以下が含まれます。

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/off-canvas.html" region_tag="ocanvas" lang=css %}
</pre>


