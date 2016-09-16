project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのウェブサイトは、マルチデバイスのエクスペリエンスに最適化されていません。モバイルやパソコンのほか、画面を持つすべてのデバイスでサイトを正しく表示できるようにするための基礎を学びます。

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# レスポンシブ ウェブデザインの基礎 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


携帯端末からのウェブへのアクセスは急増し続けていますが、ウェブサイトのほとんどはそうした携帯端末向けに最適化されていません。多くの場合、携帯端末はディスプレイのサイズによる制約を受けるため、画面上でのコンテンツの配置の仕方には別のアプローチが必要です。


## Responsive Web Design Fundamentals
<div class="attempt-right">
  <figure>
    <img src="imgs/udacity-rwd.png">
  </figure>
</div>

Explore what makes a site responsive and how some common responsive design patterns work across different devices. Learn how to create your own responsive layouts and experiment with breakpoints, and optimizing text and more.

[View Course](https://udacity.com/ud893){: .external }

<div class="clearfix"></div>



携帯電話、「ファブレット」、タブレット、パソコン、ゲーム機、テレビ、そしてウェアラブルに至るまで、数多くの画面サイズが存在します。画面サイズは常に変わり続けているため、現在だけでなく将来のあらゆる画面サイズに対応できるウェブサイトを構築することが重要です。


<video autoplay loop controls class="responsiveVideo">
  <source src="videos/resize.webm" type="video/webm">
  <source src="videos/resize.mp4" type="video/mp4">
</video>


レスポンシブ ウェブデザイン（[A List Apart の Ethan Marcotte](http://alistapart.com/article/responsive-web-design/)（リンク先は英語）が最初に定義）によって、ユーザーとその使用デバイスのニーズに対応することができます。デバイスのサイズと機能に基づいてレイアウトが変化します。たとえば、携帯電話ではコンテンツが 1 カラムのビューで表示され、タブレットでは同じコンテンツが 2 カラムで表示されます。


## ビューポートを設定する 

ページをさまざまなデバイス向けに最適化するには、ドキュメントの head 部に meta viewport 要素を含める必要があります。meta viewport タグは、ページのサイズとスケーリングの制御方法についてブラウザに指示を与えます。



### TL;DR {: .hide-from-toc }
- meta viewport タグを使用して、ブラウザのビューポートの幅とスケーリングを制御する。
- <code>width=device-width</code> を追加して、画面の幅をデバイス非依存ピクセルに合わせる。
- <code>initial-scale=1</code> を追加して、CSS ピクセルとデバイス非依存ピクセルの間に 1:1 の関係を確立する。
- ユーザーによるスケーリングを無効にせず、ページに確実にアクセスできるようにする。


最適なエクスペリエンスを提供するために、モバイル ブラウザではページをパソコンの画面幅（通常はおよそ 980px、ただしデバイスにより異なる）でレンダリングしたうえで、フォント サイズを大きくしたりコンテンツを画面に合わせてスケーリングすることで外観の向上を試みます。その結果、ユーザーにとっては、フォント サイズに一貫性がないように見えたり、コンテンツの表示や操作のためにダブルタップやピンチによるズーム操作が必要になります。


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


meta viewport の値 width=device-width を使用すると、画面の幅をデバイス非依存ピクセルで合わせるようページに指示が与えられます。これにより、小さい携帯端末と大きいパソコン用モニターのどちらでレンダリングするかを問わず、さまざまな画面サイズに合わせてページのコンテンツをリフローすることができます。

<img src="imgs/no-vp.png" class="attempt-left" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="ビューポートが設定されていないページ">
<img src="imgs/vp.png" class="attempt-right"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="ビューポートが設定されたページ">
<div class="clearfix"></div>


一部のブラウザでは、横向きモードに回転した際もページが同じ幅に保たれ、リフローではなくズームによってコンテンツを画面サイズに合わせます。属性 initial-scale=1 を追加すると、デバイスの向きに関係なく CSS ピクセルとデバイス非依存ピクセルとの間に 1:1 の関係を確立するようブラウザに指示が与えられます。これにより、横向きにした場合にページ幅全体を利用できるようになります。

Note: 属性の区切りにはカンマを使用して、古いブラウザでも属性を正確に解釈できるようにする。

## ビューポートに確実にアクセスできるようにする

ビューポートには、initial-scale のほかに次の属性も設定できます。

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

これらの属性を設定するとユーザーがビューポートをズームできなくなる場合があるため、ユーザー補助関連の問題が生じる可能性があります。

## コンテンツのサイズをビューポートに合わせる 

ユーザーはパソコンと携帯端末のどちらにおいても、ウェブサイトを縦方向にスクロールすることには慣れていますが、横方向へのスクロールには慣れていません。このため、ページ全体を表示するためにユーザーに横方向へのスクロールやズームアウトをさせることは、ユーザー エクスペリエンスの低下につながります。


### TL;DR {: .hide-from-toc }
- 大きな固定幅の要素を使用しない。
- コンテンツを正しくレンダリングするうえで、特定のビューポートの幅に依存しないようにする。
- CSS メディア クエリを使用して、小さい画面と大きい画面で異なるスタイルを適用する。


meta viewport タグを設定したモバイルサイトを構築する際、指定されたビューポートにうまく合わないページ コンテンツを誤って作成してしまうことがよくあります。たとえば、ビューポートよりも広い幅で表示される画像があると、ビューポートで横方向へのスクロールが発生します。ユーザーが横方向にスクロールしなくて済むよう、このコンテンツをビューポートの幅に収まるよう調整することが必要です。

画面サイズと CSS ピクセルの幅はデバイス間（携帯電話とタブレットの間や、異なる携帯電話間など）で大きく異なるため、コンテンツを適切に表示するうえでは、特定のビューポートの幅に依存しないようにする必要があります。

CSS でページ要素の width に大きな絶対値を設定すると（以下の例を参照）、幅の狭い端末（iPhone などの、幅が 320 CSS ピクセルの端末）のビューポートでは div が広くなりすぎます。代わりに、width: 100% などの相対的な幅の値を使用してください。同様に、位置指定に大きな絶対値を使用すると、小さい画面では要素がビューポートの外に出てしまう可能性があるため注意が必要です。

<img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="固定幅 344px の要素を持つページを iPhone で表示した場合の例。" class="attempt-left">
<img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="固定幅 344px の要素を持つページを Nexus 5 で表示した場合の例。" class="attempt-right">
<div class="clearfix"></div>


## CSS メディア クエリを使用してレスポンシブにする 

メディア クエリは、CSS スタイルに適用できるシンプルなフィルタです。メディア クエリを使用すると、デバイスの種類、幅、高さ、向き、解像度など、コンテンツをレンダリングするデバイスの特性に基づいてスタイルを容易に変更できるようになります。




### TL;DR {: .hide-from-toc }
- メディア クエリを使用して、デバイスの特性に基づいてスタイルを適用できる。
- <code>min-device-width</code> ではなく <code>min-width</code> を使用して、広範な環境を確実にサポートする。
- レイアウトの崩れを防ぐため、要素に相対サイズを使用する。



たとえば、印刷時に必要なすべてのスタイルを、印刷用のメディア クエリ内に記述することができます。


    <link rel="stylesheet" href="print.css" media="print">
    

スタイルシートのリンクで media 属性を使用する方法のほかに、CSS ファイル内に @media または @import を挿入する方法でもメディア クエリを適用できます。パフォーマンス上の理由から、@import 構文ではなく、最初の 2 つの方法のいずれかを使用するようおすすめします（[CSS のインポートを避ける](/web/fundamentals/performance/critical-rendering-path/page-speed-rules-and-recommendations）をご覧ください）。


    @media print {
      /* print style sheets go here */
    }
    
    @import url(print.css) print;
    

メディア クエリに適用されるロジックは相互排他的ではないため、選択された CSS でブロックされる条件に一致するすべてのフィルタは、CSS の標準の優先ルールに従って適用されます。

## ビューポートのサイズに基づいてメディア クエリを適用する

メディア クエリを使用するとレスポンシブなエクスペリエンスを構築できます。レスポンシブなエクスペリエンスでは、小さい画面、大きい画面、それらの中間の任意のサイズに特定のスタイルが適用されます。メディア クエリの構文では、デバイスの特性に応じて適用されるルールを作成することができます。


    @media (query) {
      /* CSS Rules used when query matches */
    }
    

さまざまなアイテムをクエリすることができますが、レスポンシブ ウェブデザインでは、min-width、max-width、min-height、max-height がよく使用されます。


<table>
    <thead>
    <tr>
      <th data-th="attribute">属性</th>
      <th data-th="Result">結果</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="attribute"><code>min-width</code></td>
      <td data-th="Result">ブラウザの幅がクエリに定義された値より広い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-width</code></td>
      <td data-th="Result">ブラウザの幅がクエリに定義された値より狭い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>min-height</code></td>
      <td data-th="Result">ブラウザの高さがクエリに定義された値より高い場合にルールが適用されます。</td>
    </tr>
    <tr>
      <td data-th="attribute"><code>max-height</code></td>
      <td data-th="Result">ブラウザの高さがクエリに定義された値より低い場合にルールが適用されます。</td>
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

<img src="imgs/mq.png" class="center" srcset="imgs/mq.png 1x, imgs/mq-2x.png 2x" alt="メディア クエリを使用してサイズ変更時にプロパティを変更するページのプレビュー。">


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/media-queries.html" region_tag="mqueries" adjust_indentation="auto" %}
</pre>

* ブラウザの幅が <b>0px</b>～<b>640px</b> の場合、max-640px.css が適用されます。
* ブラウザの幅が <b>500px</b>～<b>600px</b> の場合、@media 内のスタイルが適用されます。
* ブラウザの幅が <b>640px 以上</b>の場合、min-640px.css が適用されます。
* ブラウザの<b>幅の値が高さよりも大きい</b>場合、landscape.css が適用されます。
* ブラウザの<b>高さの値が幅よりも大きい</b>場合、portrait.css が適用されます。


### min-device-width についての注意

*-device-width に基づくクエリを作成することもできますが、この方法は**使用しないことを強くおすすめします**。

前出の方法とこの方法の間には、わずかではあるものの極めて重要な違いがあります。min-width はブラウザ ウィンドウのサイズに基づきますが、min-device-width は画面のサイズに基づいています。一部のブラウザ（古い Android ブラウザを含む）ではデバイスの幅が正しく通知されず、画面の幅が、予期されるビューポートの幅ではなくデバイス ピクセルで通知される場合があります。

さらに、*-device-width を使用すると、ウィンドウのサイズ変更が可能なパソコンや他のデバイスでコンテンツが対応できないことがあります。これは、クエリがブラウザ ウィンドウのサイズではなく実際のデバイスのサイズに基づいているためです。

### 相対的な単位を使用する

レスポンシブ デザインを支える主なコンセプトとして、固定幅のレイアウトとは対照的な流動性と比例性が挙げられます。サイズに相対的な単位を使用すると、レイアウトをシンプルにできるほか、誤ってビューポートに収まらないコンポーネントを作成することを防止できます。

たとえば、トップレベルの div に width: 100% と設定すれば、その div の幅は確実にビューポートの幅になるため、ビューポートより大きすぎる（または小さすぎる）ということは生じません。この div は、幅が 320px の iPhone、342px の BlackBerry Z10、360px の Nexus 5 のどの端末でも適切に表示されます。

また、相対的な単位を使用することで、ブラウザがページに横スクロールバーを追加することなく、ユーザーのズームレベルに基づいてコンテンツを表示できます。

<span class="compare-worse">Not recommended</span> — fixed width

    div.fullWidth {
      width: 320px;
      margin-left: auto;
      margin-right: auto;
    }


<span class="compare-better">Recommended</span> — responsive width

    div.fullWidth {
      width: 100%;
    }



## ブレークポイントの選択方法 

デバイスのクラスに基づいてブレークポイントを定義する方法は便利な一方で、注意も必要です。現在使用されている特定のデバイス、製品、ブランド名、オペレーティング システムに基づいてブレークポイントを定義すると、メンテナンスが非常に困難になる可能性があります。コンテナに合わせてレイアウトをどのように調整するかは、コンテンツ自体によって決まるようにする必要があります。



### TL;DR {: .hide-from-toc }
- コンテンツに基づいたブレークポイントを作成する。特定のデバイス、製品、ブランドは基準にしない。
- まず最初に最も小さい携帯端末向けにデザインし、そのうえで、画面上で利用できるスペースの増加に応じて段階的にエクスペリエンスを広げる。
- テキスト行の最大文字数は 70～80 文字程度に収める。


### 小さい値から順にメジャー ブレークポイントを設定していく

まずコンテンツが小さな画面にコンテンツが収まるようにデザインし、そのうえで、ブレークポイントが必要となるまで画面を広げていきます。こうすることで、コンテンツに基づいてブレークポイントを最適化するとともに、ブレークポイントの数を最小限に抑えることができます。

最初に紹介した例（[天気予報](/web/fundamentals/design-and-ui/responsive/））で作業していきます。
まず、小さい画面での予報の外観を整えます。

<img src="imgs/weather-1.png" class="center" srcset="imgs/weather-1.png 1x, imgs/weather-1-2x.png 2x" alt="小さい画面に表示された天気予報のプレビュー。">


次に、要素の間の空白が広くなりすぎて予報が見づらくなるまで、ブラウザのサイズを大きくします。やや主観的な判断になりますが、サイズが 600px を超えると余白は明らかに広すぎます。

<img src="imgs/weather-2.png" class="center" srcset="imgs/weather-2.png 1x, imgs/weather-2-2x.png 2x" alt="ページの幅を広げた天気予報のプレビュー。">


600px にブレークポイントを設定するには、2 つのスタイルシートを新たに作成して、そのうちの 1 つをブラウザの幅が 600px 以下の場合に使用し、もう 1 つを 600px より広い場合に使用します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-2.html" region_tag="mqweather2" adjust_indentation="auto" %}
</pre>

最後に、CSS をリファクタリングします。この例では、フォント、アイコン、基本的な配置、色などの共通のスタイルが weather.css に記述されています。そのうえで、小さい画面用の具体的なレイアウトが weather-small.css に、大きい画面用のスタイルが weather-large.css に記述されています。

<img src="imgs/weather-3.png" class="center" srcset="imgs/weather-3.png 1x, imgs/weather-3-2x.png 2x" alt="Preview of the weather forecast designed for a wider screen.">


### 必要に応じてマイナー ブレークポイントを設定する

レイアウトが大きく変化する場合のメジャー ブレークポイントの選択に加えて、マイナーな変化にも対応することをおすすめします。たとえば、メジャー ブレークポイントの間において、要素のマージンやパディングを調整したり、レイアウト内でより自然になるようにフォントのサイズを大きくすると、見栄えが向上します。

まず、小さい画面のレイアウトを最適化します。このケースでは、ビューポートの幅が 360px を超えた際にフォントを大きくするようにします。次に、十分なスペースがある場合に、2 段重ねで表示されている最高気温と最低気温を分割し、同じ行に横に並べて表示します。また、天気のアイコンを少し大きくします。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-small.css" region_tag="mqsmallbpsm"  adjust_indentation="auto" %}
</pre>

<img src="imgs/weather-4-l.png" srcset="imgs/weather-4-l.png 1x, imgs/weather-4-l-2x.png 2x" alt="Before adding minor breakpoints." class="attempt-left">
<img src="imgs/weather-4-r.png" srcset="imgs/weather-4-r.png 1x, imgs/weather-4-r-2x.png 2x" alt="After adding minor breakpoints." class="attempt-right">
<div class="clearfix"></div>


大きい画面の場合も同様に、予報パネルが画面幅いっぱいまで広がらないよう、予報パネルの最大幅を制限することをおすすめします。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/weather-large.css" region_tag="mqsmallbplg" adjust_indentation="auto" %}
</pre>

### テキストを読みやすいよう最適化する

従来より、読みやすいカラム幅とするには、1 行あたりの文字数を 70～80 文字（英単語で約 8～10 語）とすることが理想とされています。従って、テキスト ブロックの幅が約 10 語分広がるごとにブレークポイントの設定を検討する必要があります。

<img src="imgs/reading-ph.png" srcset="imgs/reading-ph.png 1x, imgs/reading-ph-2x.png 2x" alt="マイナー ブレークポイントを追加する前。" class="attempt-left">
<img src="imgs/reading-de.png" srcset="imgs/reading-de.png 1x, imgs/reading-de-2x.png 2x" alt="マイナー ブレークポイントを追加した後。" class="attempt-right">


上記のブログ記事の例を詳しく見てみましょう。小さい画面では、1em の Roboto フォントで 1 行あたりの語数がちょうど 10 語になりますが、大きい画面ではブレークポイントが必要となります。この例では、ブラウザの幅が 575px を超えた場合の最適なコンテンツの幅は 550px です。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/responsive/_code/reading.html" region_tag="mqreading" adjust_indentation="auto" %}
</pre>

### コンテンツを完全に非表示にしないようにする

画面サイズに応じてどのコンテンツを表示し、どのコンテンツを非表示にするかを選ぶ際は、注意が必要です。
画面に収まらないという理由だけで、コンテンツを単に非表示にすることは避けてください。ユーザーにとっては、必ずしも画面サイズだけが重要というわけではありません。たとえば、天気予報で花粉情報を非表示にしてしまうと、春先に花粉症が出る人にとっては、外出の可否の判断にその情報が必要なことから深刻な問題となる可能性があります。




