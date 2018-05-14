project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのウェブサイトは、マルチデバイス エクスペリエンスという観点で最適化されていません。モバイルやパソコンなど、さまざまな端末の画面上でサイトを適切に機能させるための基本情報について説明します。

{# wf_updated_on:2014-04-29 #}
{# wf_published_on:2014-04-29 #}

# レスポンシブ ウェブデザインの基本 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

モバイル端末からのウェブアクセスは目覚ましいペースで増加していますが、残念なことにウェブサイトの多くはモバイル端末向けに最適化されていません。一般的に、モバイル端末は画面サイズによる制約を受けるため、画面上にコンテンツを配置する際は異なるアプローチが必要です。


スマートフォン、ファブレット、タブレット、パソコン、ゲーム機、テレビ、そしてウェアラブルに至るまで、さまざまな画面サイズが存在します。
画面サイズは常に変化しているため、今ある画面サイズだけでなく、今後登場するあらゆるサイズに対応できるウェブサイトを構築することが重要です。



<video autoplay muted loop controls>
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>

レスポンシブ ウェブデザイン（元々は [Ethan Marcotte が A List Apart](http://alistapart.com/article/responsive-web-design/) で定義した概念）を採用することで、ユーザーと使用端末に応じたニーズに対応できます。レイアウトはデバイスのサイズと機能に基づいて変化します。たとえば、スマートフォンでは
1 列のビューで表示されるコンテンツが、タブレットでは 2 列で表示される場合があります。


{% include "web/_shared/udacity/ud893.html" %}

##  ビューポートを設定する{: #set-the-viewport }

さまざまなデバイス向けにページを最適化するには、ドキュメントの head 部に meta viewport タグを含める必要があります。meta viewport タグは、ページのサイズとスケーリングの制御方法についてブラウザに指示を与えます。

### TL;DR {: .hide-from-toc }
- meta viewport タグを使用して、ブラウザのビューポートの幅とスケーリングを制御します。
- `width=device-width` を追加して、デバイス非依存ピクセルで画面の幅を合わせます。
- `initial-scale=1` を追加して、CSS ピクセルとデバイス非依存ピクセルが 1:1 の関係になるように指定します。
- ユーザーによるスケーリングを無効にせず、確実にページを見れるようにします。


ユーザーに最適な画面を表示するために、モバイル ブラウザではページをパソコンの画面幅（通常は約 980px、ただしデバイスよって異なる）でレンダリングしたのち、画面に合わせてフォント サイズを拡大し、コンテンツをスケーリングして体裁を整えます。この調整により、ユーザーにはフォント サイズが統一されていないように見える可能性があります。また、コンテンツを表示したり、操作したりするために、ダブルタップやピンチ操作によるズームが必要な場合もあります。



    <meta name="viewport" content="width=device-width, initial-scale=1">
    


meta viewport の値 `width=device-width` を使用すると、画面の幅をデバイス非依存ピクセルで合わせるようページに指示が与えられます。
これにより、小さいスマートフォンと大きいパソコン用モニターのどちらでレンダリングするかを問わず、さまざまな画面サイズに合わせてページのコンテンツをリフローすることができます。



<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-no.html">
  <figure>
    <img src="imgs/no-vp.png" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="ビューポートを設定していないページ">
    <figcaption>
      ビューポートを設定していないページ
</figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp.html">
  <figure>
    <img src="imgs/vp.png" srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="ビューポートを設定したページ">
    <figcaption>
      ビューポートを設定したページ
</figcaption>
  </figure>
  </a>
</div>

一部のブラウザでは、回転して横表示になったあともページが幅が保たれ、リフローではなくズームによってコンテンツが画面いっぱいに表示されます。
属性 `initial-scale=1` を追加すると、デバイスの向きに関係なく CSS ピクセルとデバイス非依存ピクセルとの間に 1:1 の関係を確立するようブラウザに指示が与えられます。これにより、横向きにした場合にページ幅全体を利用できるようになります。





注: 属性の区切りにはカンマを使用して、古いブラウザでも属性を適切に解析できるようにします。

###  ビューポートに確実にアクセスできるようにする

ビューポートには、`initial-scale` のほかに次の属性も設定できます。

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

これらの属性を設定するとユーザーがビューポートをズームできなくなる場合があるため、ユーザー補助機能に関連する問題が生じる可能性があります。


##  コンテンツのサイズをビューポートに合わせる

パソコンとモバイル端末のどちらにおいても、ユーザーはウェブサイトを縦方向にスクロールすることには慣れていますが、横方向へのスクロールには慣れていません。そのため、横方向へのスクロールやズームアウトをしないとページ全体が表示されないサイトは、ユーザーにとっては不便です。

### TL;DR {: .hide-from-toc }
- 幅が固定された大きな要素の使用を避けます。
- 特定のビューポート幅に依存したコンテンツの使用を避け、適切にレンダリングされるようにします。
- CSS メディアクエリを使用して、画面のサイズに応じて異なるスタイルを適用します。

`meta viewport` タグを設定したモバイルサイトを構築する際、特定のビューポートにうまく合わないページ コンテンツを誤って作成してしまうことがよくあります。たとえば、ビューポートよりも広い幅で表示される画像があると、ビューポートで横方向へのスクロールが発生します。
ユーザーが横方向にスクロールしなくて済むよう、このコンテンツをビューポートの幅に収まるよう調整することが必要です。



CSS
ピクセルでの画面のサイズと幅はデバイスによって大きく異なるため（スマートフォンとタブレット間、異なるスマートフォン間で差がある）、コンテンツを適切にレンダリングするには、特定のビューポート幅に依存しないようにする必要があります。


CSS でページ要素の幅に絶対値の大きな値を指定すると（以下の例を参照）、幅の狭い端末（iPhone などの幅が 320 CSS ピクセルの端末）では、ビューポートに対して `div`
が広すぎてしまいます。
代わりに、`width: 100%` などの相対的な幅の値を使用してください。
同様に、位置指定に大きな絶対値を使用すると、小さい画面では要素がビューポートの外にはみ出してしまう可能性があるため注意が必要です。

  

<div class="attempt-left">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x" alt="固定幅 344px の要素が表示された iPhone 上のページ。">
    <figcaption>
      固定幅 344px の要素が表示された iPhone 上のページ
</figcaption>
  </figure>
  </a>
</div>
<div class="attempt-right">
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/vp-fixed.html">
  <figure>
    <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x" alt="固定幅 344px の要素が表示された Nexus 5 上のページ。">
    <figcaption>
      固定幅 344px の要素が表示された Nexus 5 上のページ
</figcaption>
  </figure>
  </a>
</div>
<div class="clearfix"></div>
         
##  CSS メディアクエリを使用してレスポンシブにする{: #css-media-queries }  

メディア クエリは、CSS スタイルに適用できるシンプルなフィルタです。メディアクエリを使用すると、画面の種類、幅、高さ、向き、解像度など、コンテンツをレンダリングするデバイスの特性に基づいて、スタイルを容易に変更できます。





### TL;DR {: .hide-from-toc }
- メディア クエリを使用して、デバイスの特性に応じたスタイルを適用します。
- `min-device-width` の代わりに `min-width` を使用して、幅広いエクスペリエンスを提供します。
- レイアウトの崩れを防ぐため、要素に相対サイズを使用します。

たとえば、印刷時に必要なすべてのスタイルを、印刷用のメディア クエリ内に記述することができます。



    <link rel="stylesheet" href="print.css" media="print">
    

CSS ファイルに埋め込み可能なメディアクエリを適用するには、スタイルシートのリンクで `media` 属性を使用するほかに、`@media`
および `@import` を使用する方法があります。
パフォーマンス上の理由から、`@import` 構文ではなく、最初の 2 つの方法のいずれかを使用することをおすすめします（[CSS のインポートを避ける](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations)をご覧ください）。




    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

メディアクエリに適用されるロジックは相互排他的ではないため、条件に一致するすべてのフィルタに対して、CSS 標準の優先ルールに基づいて最終的な CSS
ブロックが適用されます。


###  ビューポートのサイズに基づいてメディア クエリを適用する

メディアクエリを使用すると、小さい画面から大きな画面まで、さまざまな画面サイズに固有のスタイルを適用できるため、レスポンシブなサイトを作成できます。
メディア クエリの構文では、デバイスの特性に応じて適用されるルールを作成できます。




    @media (query) {
      /* CSS Rules used when query matches */
    }
    

さまざまなアイテムについてクエリを記述できますが、レスポンシブ ウェブデザインでは、`min-width`、`max-width`、`min-height`、`max-height`
が最もよく使用されます。



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">パラメータ</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">ブラウザの幅の値がクエリに定義された値よりも大きい場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">ブラウザの幅の値がクエリに定義された値よりも小さい場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">ブラウザの高さの値がクエリに定義された値よりも大きい場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">ブラウザの高さの値がクエリに定義された値よりも小さい場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=portrait</code></td>
      <td data-th="Result">ブラウザの高さが、幅と同じかそれ以上の場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>orientation=landscape</code></td>
      <td data-th="Result">ブラウザの幅の値が、高さよりも大きい場合にルールが適用されます。</td>
    </tr>
  </tbody>
</table>

以下の例で説明します。

<figure>
  <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html">
    <img src="imgs/mq.png" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="メディアクエリを使用してリサイズ時にプロパティを変更するページのプレビュー。">
    <figcaption>
      メディアクエリを使用してリサイズ時にプロパティを変更するページのプレビュー。
</figcaption>
  </a>
</figure>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/media-queries.html){: target="_blank" .external }

* ブラウザの幅が <b>0px</b>～<b>640px</b> の場合、`max-640px.css` が適用されます。
* ブラウザの幅が <b>500px</b>～<b>600px</b> の場合、`@media` 内のスタイルが適用されます。
* ブラウザの幅が <b>640px 以上</b>の場合、`min-640px.css` が適用されます。
* ブラウザの<b>幅が高さよりも長い</b>場合、`landscape.css` が適用されます。
* ブラウザの<b>幅が高さよりも短い</b>場合、`portrait.css` が適用されます。


###  `min-device-width` についての注意

`min-device-width`
を基準にしたクエリも作成できますが、この方法は**使用しないことを強くおすすめします**。

`min-width` と `min-device-width`
には、わずかではあるものの極めて重要な違いがあります。前者はブラウザのウィンドウ サイズを基準にしており、後者は画面サイズを基準にしています。
一部のブラウザ（以前の Android ブラウザを含む）ではデバイスの幅が正しく通知されず、期待されるビューポートの幅の代わりに、画面サイズがデバイス ピクセルで通知される場合があります。


さらに、`min-device-width` を使用すると、ウィンドウのサイズ変更が可能なパソコンや他のデバイスでコンテンツが対応しないことがあります。これは、クエリがブラウザ ウィンドウのサイズではなく実際のデバイスのサイズに基づいているためです。



###  `any-pointer` と `any-hover` を使用して柔軟に操作できるようにする

Chrome 39 以降、スタイルシートに、数種類のポインターやカーソルを合わせたときの動作についてセレクタを記述できるようになりました。
メディア特性の `any-pointer` および `any-hover`
を使用すると、`pointer` と `hover` と同様に、ユーザーのポインター機能を照会できます。
ただし、`any-pointer` および
`any-hover` の場合は、最も主要なポインター デバイスだけでなく、すべてのポインター デバイスを対象に機能します。


###  相対的な単位を使用する

レスポンシブ デザインを支える主なコンセプトとして、固定幅のレイアウトとは対照的な流動性と比例性が挙げられます。
サイズに相対単位を使用すると、レイアウトをシンプルにできるほか、誤ってビューポートに収まらないコンポーネントを作成することを防止できます。



たとえば、トップレベルの div に width:100% と指定すると、その `div` の幅は確実にビューポートの幅になるため、ビューポートより大きすぎる（または小さすぎる）という問題は生じません。
幅が 320px の iPhone、342px の BlackBerry Z10、360px の Nexus 5 など、どの端末でもこの
`div` は適切に表示されます。


さらに、相対単位を使用すると、ブラウザ側でユーザーのズームレベルに基づいてコンテンツをレンダリングできるため、横方向のスクロールバーをページに追加する必要がありません。



<span class="compare-worse">非推奨</span> - 固定幅

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">推奨</span> - レスポン  シブな幅

    div.fullWidth {
      width: 100%;
    }


##  ブレークポイントの決め方 

ブレークポイントは、デバイスクラスを基準に設定しないでください。現在使用されている特定のデバイス、製品、ブランド名、オペレーティング システムを基準にブレークポイントを設定すると、メンテナンスが非常に大変になる可能性があります。代わりにコンテンツ内容に基づいて、コンテナに合ったレイアウト方法を決定するようにしてください。



### TL;DR {: .hide-from-toc }
- 特定のデバイス、製品、ブランドではなく、コンテンツ内容に基づいてブレークポイントを作成します。
- まず、サイズが最小のモバイル端末向けにデザインします。その後、使用できる画面領域の増加に合わせて段階的にエクスペリエンスを拡張します。
- 一行に表示する文字数は最大で 70～80 文字程度にします。


###  小さい値から順にメジャー ブレークポイントを設定していく

<figure class="attempt-right">
  <img src="imgs/weather-1.png" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      小さい画面に表示された天気予報のプレビュー。
</a>
  </figcaption>
</figure>

まず小さな画面にコンテンツが収まるようにデザインし、そのうえで、ブレークポイントが必要となるまで画面を広げていきます。
こうすることで、コンテンツに基づいて最適なブレークポイントを設定し、その数を最小限に抑えることができます。



では、最初に紹介した天気予報の例で説明しましょう。
まずは小さい画面で天気予報の表示を整えます。


<div style="clear:both;"></div>

<figure class="attempt-right">
  <img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="ページ幅を広げたときの天気予報のプレビュー。">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-1.html">
      ページ幅を広げたときの天気予報のプレビュー。
</a>
  </figcaption>
</figure>

次に、要素間の余白が空きすぎて天気予報の見た目が悪くなるまで、ブラウザのサイズを大きくします。
やや主観的な判断になりますが、横幅が 600px を超えると余白は明らかに広すぎます。


<div style="clear:both;"></div>

600px にブレークポイントを設定するには、2 つのスタイルシートを新たに追加します。1 つはブラウザの幅が 600px 以下の場合に、もう 1 つは幅が 600px より広い場合に使用します。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html){: target="_blank" .external }

<figure class="attempt-right">
  <img src="imgs/weather-3.png"  srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="広い画面用にデザインされた天気予報のプレビュー。">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/weather-2.html">
      広い画面用にデザインされた天気予報のプレビュー。
</a>
  </figcaption>
</figure>

最後に、CSS をリファクタリングします。この例では、フォント、アイコン、基本的な配置、色などの共通のスタイルを `weather.css` に記述しています。
さらに、小さい画面専用のレイアウトを `weather-small.css`
に、大きい画面専用のレイアウトを `weather-large.css` に記述しています。


<div style="clear:both"></div>


###  必要に応じてマイナー ブレークポイントを設定する

レイアウトが大きく変化する場合のメジャー ブレークポイントの選択に加えて、マイナーな変化にも対応することをおすすめします。たとえば、メジャー ブレークポイントの間で、要素の余白やパディングを調整したり、レイアウトになじむようにフォントサイズを拡大したりすると、見栄えが良くなります。



まず、小さい画面のレイアウトを最適化します。このケースでは、ビューポートの幅が 360px を超えた際にフォントを大きくするようにします。次に、上下に表示されている最高気温と最低気温を、十分なスペースがある場合は同じ行に横並びで表示します。また、天気のアイコンを少し大きくします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-small.css" region_tag="mqsmallbpsm" adjust_indentation="auto" %}
</pre>

<div class="attempt-left">
  <figure>
    <img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="マイナー ブレークポイントを追加する前">
    <figcaption>
      マイナー ブレークポイントを追加する前
</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="マイナー ブレークポイントを追加した後">
    <figcaption>
      マイナー ブレークポイントを追加した後
</figcaption>
  </figure>
</div>


<div style="clear:both;"></div>


大きい画面の場合も同様に、予報パネルが画面の横幅いっぱいに表示されないように、予報パネルの最大幅を制限することをおすすめします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

###  テキストを読みやすく最適化する

従来より、読みやすいカラム幅にするには、1 行あたりの文字数を 70～80 文字（英単語で約 8～10 語）にするのが理想とされています。
よって、テキスト ブロックの幅が約 10 語分に達するたびにブレークポイントを設定するとよいでしょう。


<div class="attempt-left">
  <figure>
    <img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="マイナー ブレークポイントを追加する前">
    <figcaption>マイナー ブレークポイントを追加する前</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="マイナー ブレークポイントを追加した後">
    <figcaption>マイナー ブレークポイントを追加した後</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

上記のブログ記事の例を詳しく見てみましょう。小さい画面の場合は、1em の Roboto
フォントだと 1 行あたりちょうど 10 語になりますが、大きい画面の場合はブレークポイントが必要です。
この例では、ブラウザの幅が 575px を超えた場合の最適なコンテンツの幅は 550px です。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/reading.html){: target="_blank" .external }

###  コンテンツを完全に非表示にしないようにする

画面サイズに応じてどのコンテンツを表示し、どのコンテンツを非表示にするかを選ぶ際は、注意が必要です。画面に収まらないという理由だけで、コンテンツを単に非表示にすることは避けてください。
画面サイズだけで、ユーザーが必要とする情報を判断してはいけません。
たとえば、天気予報の画面から花粉情報を削除してしまうと、春先に花粉症に悩む人は、その情報を見て外出の可否の判断を下せなくなるという大きな問題が生じます。




##  Chrome DevTools でメディアクエリのブレークポイントを表示する{: #devtools }

メディアクエリ ブレークポイントを設定したあとに、サイトの見栄えを確認したい場合があります。
ブレークポイントをトリガーするには、ブラウザのウィンドウ サイズを変更する方法がありますが、
よりおすすめなのは Chrome DevTools を使う方法です。以下の 2 つのスクリーンショットは、DevTools
を使用してブレークポイントが異なるページを表示した例です。


![DevTools のメディアクエリ機能の例](imgs/devtools-media-queries-example.png)

ブレークポイントが異なるページを表示するには、

[DevTools を起動して](/web/tools/chrome-devtools/#open)、[Device Mode](/web/tools/chrome-devtools/device-mode/#toggle) を有効にします。


[viewport controls](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#viewport-controls)
を使用して [**Responsive**] を選択すると、DevTools がレスポンシブ モードに切り替わります。


最後に、[Device Mode] メニューを開いて
[[**Show media queries**](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)]
を選択すると、ページ上にブレークポイントがカラーバーとして表示されます。

バーを 1 つクリックすると、そのメディアクエリが有効になった状態のページが表示されます。
メディアクエリの定義へ移動するには、バーを右クリックします。
詳細は[メディアクエリ](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports#media-queries)の説明を参照してください。




{# wf_devsite_translation #}
