project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Mostly fluid {: .page-title }

{% include "_shared/contributors/TODO.html" %}



ｊほとんどの fluid パターンは、主に fluid グリッドで構成されています。  大画面または 中画面では、通常は同じサイズを保ち、より広い画面  で余白を調整ます。

小さな画面では、fluid グリッドはリフローするメインコンテンツを引き起こし、
列は垂直方向に積層されます。  このパターンの主な利点の 1 つは、
通常、小画面と大画面の間に 1 つの
ブレークポイントだけが必要であることです。

{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg">
  お試しください
{% endlink_sample %}

最小ビューでは、各コンテンツ`div`は垂直に積層されます。  画面の幅が 600px になった場合
、プライマリ コンテンツ `div` は `width: 100%` にとどまり、
セカンダリ `div` はプライマリ `div` の下に 2 列で表示されます。  800px 
を超える場合、コンテナ `div` は固定幅となり、画面の中央に配置されます。

このパターンを使用するサイトには以下が含まれます。

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/mostly-fluid.html" region_tag="mfluid" lang=css %}
</pre>


