project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Column Drop {: .page-title }

{% include "_shared/contributors/TODO.html" %}



全幅マルチ カラム レイアウトでは、ウィンドウ幅がコンテンツに合わせて狭くなりすぎないように、 列のドロップは単純に列を垂直にスタックします。  

最終的にこの結果は、
すべての列で垂直にスタックされます。  このレイアウト パターンのための
ブレークポイントの選択は、コンテンツに依存しており、
各デザインで変更されます。

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg">
  お試しください
{% endlink_sample %}


主に fluid サンプルでは、コンテンツは最小ビューで垂直にスタックされますが
、画面が 600px 以上になった場合、プライマリおよびセカンダリ コンテンツ
`div`は、画面の幅いっぱいになります。  `div` の順番はオーダー CSS プロパティで
設定されます。  800px で、すべてのコンテンツ `div` が表示され、
全画面幅が使用されます。

このパターンを使用するサイトには以下が含まれます。

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/responsive/patterns/_code/column-drop.html" region_tag="cdrop" lang=css %}
</pre>


