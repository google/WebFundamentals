project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: レスポンシブ ウェブデザイン パターンは急速に進化していますが、パソコンでもモバイル端末でもうまく動作する確立されたパターンは限られています。

{# wf_updated_on:2014-10-20 #}
{# wf_published_on:2014-04-29 #}

# レスポンシブ ウェブデザイン パターン {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

レスポンシブ ウェブ デザイン パターンは急速に進化していますが、デスクトップでもモバイル端末間でもうまく動作する確立されたパターンは限られています。

レスポンシブ ウェブページで使用されるレイアウトはたいてい、mostly fluid、column drop、layout shifter、tiny tweaks、off canvas という 5 つのパターンのいずれかに分類できます。ページ内でこれらのパターンを組み合わせて使用する場合もあります。たとえば、column drop と off canvas の組み合わせです。
これらのパターンは本来 [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514) によって認識され、
レスポンシブ ページの起点を提供します。

###  パターン

以下の各サンプルでは、シンプルさとわかりやすさを重視し、[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes) を使用して、実際のマークアップで作成しています。基本的に 3 つのコンテンツの
`div` はプライマリ コンテナの `div` に含まれています。各サンプルは、まず最小のビューから描画され、必要に応じてブレークポイントが追加されます。
最新のブラウザ向けに [flexbox レウアウトは適切にサポートされていますが](http://caniuse.com/#search=flexbox)最適なサポートのためにはベンダーのプレフィックスがまだ必要です。

##  Mostly Fluid

ほとんどの fluid パターンは、主に fluid グリッドで構成されています。一般的に、大画面または中画面ではサイズを保ち、より広い画面上では余白の調整のみを行います。



小さな画面の場合、fluid グリッドではメインコンテンツのリフローが発生し、列が垂直方向にスタックされます。
このパターンの主な利点の 1 つは、
通常、小画面と大画面の間に 1 つの
ブレークポイントだけが必要であることです。

<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">お試しください</a>

最小ビューでは、各コンテンツの `div` は垂直にスタックされます。画面幅が 600px になると、プライマリ コンテンツの
`div` は `width: 100%` を維持し、セカンダリ コンテンツの `div` はプライマリ コンテンツの `div` の下に 2 列で表示されます。
800px を超える場合、コンテナの `div` は固定幅となり、画面の中央に配置されます。


このパターンを使用するサイトをいくつかご紹介します。

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

##  Column drop 

Column drop は幅いっぱいに表示するマルチカラム レイアウトです。コンテンツに対してウィンドウ幅が狭くなると、単純に列を垂直にスタックします。


最終的には、すべての列が垂直にスタックされます。このレイアウト パターンでは、コンテンツやデザインの変化に合わせてブレークポイントを指定します。



<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">お試しください</a>

主に fluid サンプルでは、コンテンツは最小ビューで垂直にスタックされますが、画面が 600px 以上になった場合、プライマリおよびセカンダリ コンテンツの `div` は、画面の幅いっぱいに表示されます。`div` の順番は CSS の order プロパティで設定されます。
800px で、すべてのコンテンツの `div` が表示され、全画面幅が使用されます。


このパターンを使用するサイトをいくつかご紹介します。

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

##  Layout shifter

Layout shifter パターンは最もレスポンシブなパターンで、さまざまな画面幅に合わせて複数のブレークポイントを設定します。


このレイアウトの鍵は、リフローや他の列の下へのドロップではなく、コンテンツの移動です。
各主要ブレイクポイント間の大きな差によって、維持が複雑になり、
全体的なコンテンツのレイアウトだけでなく、要素内の変化が
含まれる可能性があります。

<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">お試しください</a>

この簡単な例では、layout shifter パターンを使用しています。小さな画面ではコンテンツは垂直にスタックされますが、画面が大きくなるにつれて大幅に変化し、左に 1 つの `div`、右に 2 つのスタックされた `div` が表示されるようになります。



このパターンを使用するサイトをいくつかご紹介します。

 * [Food Sense](http://foodsense.is/){: .external }
 * [Seminal Responsive Design Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

##  Tiny tweaks

Tiny tweaks では、フォントサイズの調整、画像のリサイズ、コンテンツの移動など、レイアウトの微調整を行います。


このパターンは、1 ページから成るリニアなウェブサイトや、テキストの多い記事サイトなど、一列で構成されるレイアウトに適しています。

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">お試しください</a>

名前からわかるように、このサンプルでは画面サイズの調整などの軽微な変更を行います。画面の幅が大きくなると、フォントサイズやパディングを調整します。


このパターンを使用するサイトをいくつかご紹介します。

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


##  Off canvas

Off canvas パターンでは、コンテンツを縦にスタックせずに、ナビゲーションやアプリメニューのような使用頻度の低いコンテンツをオフスクリーンに配置します。これらのコンテンツは画面サイズが十分に大きい場合にのみ表示され、小さい画面ではクリックしたときのみ表示されます。




<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">お試しください</a>

このサンプルでは縦にコンテンツをスタックせずに、`transform: translate(-250px, 0)` 宣言を使用して、2 つのコンテンツの `div` のオフスクリーンを非表示にしています。JavaScript を使用して open クラスを追加することで div を表示し、要素を可視化します。
画面の幅が大きくなるにつれて、オフスクリーンの位置は要素の外に移動し、要素が可視ビューポート内に表示されます。



このサンプルを使用する際は、Safari for iOS 6 および Android ブラウザでは `flexbox` の
`flex-flow: row nowrap` 機能がサポートされていないため、代わりに絶対位置を使用する必要がある点に注意してください。


このパターンを使用するサイトをいくつかご紹介します。

 * [HTML5Rocks の記事](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Facebook のモバイルサイト](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
