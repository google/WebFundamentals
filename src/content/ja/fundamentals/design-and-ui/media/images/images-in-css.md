project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS の background プロパティを使用して、要素に複雑な画像を追加したり、複数の画像を簡単に追加したり、画像を反復させたりすることができます。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# CSS 内での画像 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



CSS の background プロパティを使用して、要素に複雑な画像を追加したり、複数の画像を簡単に追加したり、画像を反復させたりすることができます。background プロパティをメディア クエリと組み合わせると、画面の解像度やビューポートのサイズなどの条件に基づいて選択的に画像を読み込むなどの高度な処理が可能です。



## TL;DR {: .hide-from-toc }
- ディスプレイの特性に合った最適な画像を使用し、画面サイズ、デバイスの解像度、ページ レイアウトを考慮する。
- メディア クエリで <code>min-resolution</code> と <code>-webkit-min-device-pixel-ratio</code> を使用し、高 DPI ディスプレイの場合は CSS の <code>background-image</code> プロパティを変更する。
- マークアップ内の 1x の画像に加えて、srcset を使用して高解像度の画像を提供する。
- JavaScript による画像置き換えを使用する場合や、低解像度のデバイスに高圧縮の高解像度画像を配信する場合は、パフォーマンスへの影響を検討する。


## メディア クエリを使用して画像の選択的な読み込みやアート ディレクションを行う

メディア クエリは、ページ レイアウトの変更だけでなく、ビューポートの幅に応じた画像の選択的な読み込みやアート ディレクションの適用などにも利用できます。

たとえば、以下の例では、小さい画面の場合は small.png のみがダウンロードされてコンテンツの div に適用されるのに対し、大きい画面の場合は background-image: url(body.png) が body に、background-image: url(large.png) がコンテンツの div にそれぞれ適用されます。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## image-set を使用して高解像度の画像を表示する

CSS の image-set() 関数を使用して background プロパティの動作を拡張することで、特性の異なる各デバイス向けに複数の画像ファイルを簡単に配信できます。これを利用して、ブラウザでデバイスの特性に応じて最適な画像を選択できます。たとえば、ディスプレイが 2x の場合は 2x の画像を使用する、デバイスが 2x でもネットワークが低速の場合は 1x の画像を使用する、といったことが可能です。


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

適切な画像を読み込むほかに、ブラウザではスケーリングも
適宜実施します。つまり、ブラウザでは 2x の画像のサイズは 1x の画像の 2 倍大きいと仮定し、2x の画像を係数 2 でスケールダウンして、ページ上で同じサイズに見えるようにします。

image-set() への対応は始まったばかりで、現在は Chrome と Safari のみで -webkit のベンダー プレフィックス付きでサポートされています。image-set() がサポートされていない場合の代替画像を含める場合も注意が必要です。以下を例に説明します。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

上の例では、image-set() をサポートしているブラウザには適切なアセットが読み込まれ、それ以外の場合は 1x のアセットにフォールバックします。ただし、image-set() をサポートするブラウザは少ないため、ほとんどのブラウザでは 1x のアセットを読み込む、という点に注意してください。

## メディア クエリを使用して高解像度の画像の表示やアート ディレクションを行う

メディア クエリで[デバイス ピクセル比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)（リンク先は英語）に基づいたルールを作成して、2x のディスプレイと 1x のディスプレイにそれぞれ別の画像を指定できます。


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox、Opera では標準の (min-resolution: 2dppx) という記述をサポートしていますが、Safari と Android ブラウザでは dppx の単位を付けない古いベンダー プレフィックスの構文を使用する必要があります。これらのスタイルはデバイスがメディア クエリに一致する場合にのみ読み込まれること、および、基本となるスタイルを指定する必要があることに注意してください。この方法には、ブラウザが解像度を条件とするメディア クエリをサポートしていない場合でも何らかの画像が確実にレンダリングされる、というメリットもあります。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

また、min-width 構文を使用して、ビューポートのサイズに応じた代替画像を表示することもできます。この方法には、メディア クエリに一致しなければ画像がダウンロードされないというメリットがあります。たとえば、以下の bg.png はブラウザの幅が 500px 以上ある場合にのみダウンロードされて body に適用されます。


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



