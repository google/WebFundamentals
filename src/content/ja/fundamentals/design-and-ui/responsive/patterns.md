project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。


{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-10-20 #}

# Responsive Web Design Patterns {: .page-title }

{% include "_shared/contributors/petelepage.html" %}

レスポンシブ ウェブ デザイン パターンは急速に進化していますが、 デスクトップとモバイル端末間でうまく動作する 確立されたパターンは限られています。


レスポンシブ ウェブ ページで使用されるほとんどのレイアウトは、5 つのパターンのいずれかに分類することができます。
主にfluid、column drop、layout shifter、tiny tweaks、および off canvas です。
いくつかのケースでは、ページはパターンの組み合わせを使用します。たとえば、
column drop と off canvas の組み合わせです。  これらのパターンは本来 [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514)によって認識され、
レスポンシブ ページの起点を提供します。

## パターン

シンプルで分かりやすいサンプルを作成するために、
以下の各サンプルは、
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)を使用して、実際のマークアップで作成されました。
一般的に 3 つのコンテンツ `div` はプライマリ コンテナの中に含まれています。
 各サンプルは、最初に最小のビューで書き始められ、ブレークポイント
が必要に応じて追加されました。  最新のブラウザ向けに [flexbox レウアウトは適切に
サポートされていますが](http://caniuse.com/#search=flexbox)最適なサポートのためには
ベンダーのプレフィックスがまだ必要です。

## Mostly fluid 

ｊほとんどの fluid パターンは、主に fluid グリッドで構成されています。  大画面または 中画面では、通常は同じサイズを保ち、より広い画面  で余白を調整ます。

小さな画面では、fluid グリッドはリフローするメインコンテンツを引き起こし、
列は垂直方向に積層されます。  このパターンの主な利点の 1 つは、
通常、小画面と大画面の間に 1 つの
ブレークポイントだけが必要であることです。

<img src="imgs/mostly-fluid.svg">

最小ビューでは、各コンテンツ`div`は垂直に積層されます。  画面の幅が 600px になった場合
、プライマリ コンテンツ `div` は `width: 100%` にとどまり、
セカンダリ `div` はプライマリ `div` の下に 2 列で表示されます。  800px 
を超える場合、コンテナ `div` は固定幅となり、画面の中央に配置されます。

このパターンを使用するサイトには以下が含まれます。

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## Column Drop

全幅マルチ カラム レイアウトでは、ウィンドウ幅がコンテンツに合わせて狭くなりすぎないように、 列のドロップは単純に列を垂直にスタックします。  

最終的にこの結果は、
すべての列で垂直にスタックされます。  このレイアウト パターンのための
ブレークポイントの選択は、コンテンツに依存しており、
各デザインで変更されます。

<img src="imgs/column-drop.svg">


主に fluid サンプルでは、コンテンツは最小ビューで垂直にスタックされますが
、画面が 600px 以上になった場合、プライマリおよびセカンダリ コンテンツ
`div`は、画面の幅いっぱいになります。  `div` の順番はオーダー CSS プロパティで
設定されます。  800px で、すべてのコンテンツ `div` が表示され、
全画面幅が使用されます。

このパターンを使用するサイトには以下が含まれます。

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## Layout shifter

layout shifter パターンは、複数の画面の幅にわたって複数のブレークポイントを有する、 レスポンシブ パターンの代表例です。

このレイアウトの鍵は、リフローや他の列の下へのドロップではなく、
コンテンツの移動です。  各主要ブレイクポイント間の大きな差によって、維持が複雑になり、
全体的なコンテンツのレイアウトだけでなく、要素内の変化が
含まれる可能性があります。

<img src="imgs/layout-shifter.svg">

この簡単な例では、ayout shifter パターンを示しています。
小さな画面ではコンテンツは垂直にスタックされますが、
画面が大きくなるにつれて大幅に変化します。左に `div` および右に 2 つのスタックされた `div` を持ちます。

このパターンを使用するサイトには以下が含まれます。

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## Tiny tweaks

Tiny tweaks はレイアウトのための小さな変更を行います。非常にマイナーなフォント サイズの調整、画像サイズの変更、コンテンツの移動などです。

これは、1 ページの線形ウェブ サイト、テキストの多い記事のような、
単一列のレイアウトに適しています。

<img src="imgs/tiny-tweaks.svg">

名前からわかるように、このサンプルでは、画面サイズの変化など少しだけの変更です。
画面の幅が大きくなるにつれて、フォントサイズやパディングを行います。

このパターンを使用するサイトには以下が含まれます。

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>

## Off canvas



縦にコンテンツをスタックするよりも、オフキャンバス パターンは、使用頻度の低いコンテンツを配置します。おそらくナビゲーションやアプリ メニューでオフキャンバスになり、画面サイズが十分に大きい場合にのみ表示され、小さい画面ではコンテンツはクリックでが離れます。

<img src="imgs/off-canvas.svg">

縦にコンテンツをスタックするよりも、このサンプルでは `transform: translate(-250px, 0)` を使用して、コンテンツ
`div` の 2 つを非表示にします。  JavaScript を使用して、
オープンクラスを追加することで  div を表示し、要素を可視化します。  画面の幅が大きくなるにつれて、
オフスクリーンの位置は要素から除去され
可視ビューポート内に表示されます。

このサンプルでは、Safari for iOS 6 および Android Browser は `flexbox` の
`flex-flow: row nowrap` 機能をサポートしないことに注意してください。
このため、絶対位置にフォールバックしなければなりませんでした。

このパターンを使用するサイトには以下が含まれます。

 * [HTML5Rocks Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>
