project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 1 枚の写真は 1000 語にも匹敵する内容を伝えます。また、画像はすべてのページにおいて非常に重要な役割を果たします。一方で、ダウンロードされるデータ量のほとんどを画像が占めることも少なくありません。レスポンシブ ウェブデザインでは、レイアウトだけでなく画像もデバイス特性に応じて変えることができます。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# 画像 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


レスポンシブ ウェブデザインでは、レイアウトだけでなくコンテンツもデバイス特性に応じて変えることができます。
たとえば高解像度（2x）のディスプレイでは、高解像度のグラフィックを使用することで鮮明に表示されます。
50%
幅の画像は、幅が
800px のブラウザでは適切に表示されても、画面幅が狭い携帯端末では占有するスペースが大きすぎます。また、狭い画面に合わせてスケールダウンしても必要な帯域幅は変わりません。


##  アート ディレクション

<img src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

比率の変更、トリミング、画像全体の置き換えなど、画像の大幅な変更が必要となる場合もあります。
このような画像の変更は通常、アート ディレクションと呼ばれます。
詳しい例については [responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external }
をご覧ください。


{% include "web/_shared/udacity/ud882.html" %}

##  マークアップを用いた画像処理

<style>
  .side-by-side {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 45%;
  }

  span#data_uri {
    background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2016.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%22396.74px%22%20height%3D%22560px%22%20viewBox%3D%22281.63%200%20396.74%20560%22%20enable-background%3D%22new%20281.63%200%20396.74%20560%22%20xml%3Aspace%3D%22preserve%22%0D%0A%09%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23E44D26%22%20points%3D%22409.737%2C242.502%20414.276%2C293.362%20479.828%2C293.362%20480%2C293.362%20480%2C242.502%20479.828%2C242.502%20%09%09%09%0D%0A%09%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23E44D26%22%20d%3D%22M281.63%2C110.053l36.106%2C404.968L479.757%2C560l162.47-45.042l36.144-404.905H281.63z%20M611.283%2C489.176%0D%0A%09%09%09%09L480%2C525.572V474.03l-0.229%2C0.063L378.031%2C445.85l-6.958-77.985h22.98h26.879l3.536%2C39.612l55.315%2C14.937l0.046-0.013v-0.004%0D%0A%09%09%09%09L480%2C422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283%2C489.176z%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22480%2C192.833%20604.247%2C192.833%20603.059%2C206.159%20600.796%2C231.338%20599.8%2C242.502%20599.64%2C242.502%20%0D%0A%09%09%09%09480%2C242.502%20480%2C293.362%20581.896%2C293.362%20595.28%2C293.362%20594.068%2C306.699%20582.396%2C437.458%20581.649%2C445.85%20480%2C474.021%20%0D%0A%09%09%09%09480%2C474.03%20480%2C525.572%20611.283%2C489.176%20642.17%2C143.166%20480%2C143.166%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22540.988%2C343.029%20480%2C343.029%20480%2C422.35%20535.224%2C407.445%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22414.276%2C293.362%20409.737%2C242.502%20479.828%2C242.502%20479.828%2C242.38%20479.828%2C223.682%20%0D%0A%09%09%09%09479.828%2C192.833%20355.457%2C192.833%20356.646%2C206.159%20368.853%2C343.029%20479.828%2C343.029%20479.828%2C293.362%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22479.828%2C474.069%20479.828%2C422.4%20479.782%2C422.413%20424.467%2C407.477%20420.931%2C367.864%20%0D%0A%09%09%09%09394.052%2C367.864%20371.072%2C367.864%20378.031%2C445.85%20479.771%2C474.094%20480%2C474.03%20480%2C474.021%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22343.784%2C50.229%20366.874%2C50.229%20366.874%2C75.517%20392.114%2C75.517%20392.114%2C0%20366.873%2C0%20366.873%2C24.938%20%0D%0A%09%09%09%09343.783%2C24.938%20343.783%2C0%20318.544%2C0%20318.544%2C75.517%20343.784%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22425.307%2C25.042%20425.307%2C75.517%20450.549%2C75.517%20450.549%2C25.042%20472.779%2C25.042%20472.779%2C0%20403.085%2C0%20%0D%0A%09%09%09%09403.085%2C25.042%20425.306%2C25.042%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22508.537%2C38.086%20525.914%2C64.937%20526.349%2C64.937%20543.714%2C38.086%20543.714%2C75.517%20568.851%2C75.517%20568.851%2C0%20%0D%0A%09%09%09%09542.522%2C0%20526.349%2C26.534%20510.159%2C0%20483.84%2C0%20483.84%2C75.517%20508.537%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22642.156%2C50.555%20606.66%2C50.555%20606.66%2C0%20581.412%2C0%20581.412%2C75.517%20642.156%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22480%2C474.021%20581.649%2C445.85%20582.396%2C437.458%20594.068%2C306.699%20595.28%2C293.362%20581.896%2C293.362%20%0D%0A%09%09%09%09480%2C293.362%20479.828%2C293.362%20479.828%2C343.029%20480%2C343.029%20540.988%2C343.029%20535.224%2C407.445%20480%2C422.35%20479.828%2C422.396%20%0D%0A%09%09%09%09479.828%2C422.4%20479.828%2C474.069%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22479.828%2C242.38%20479.828%2C242.502%20480%2C242.502%20599.64%2C242.502%20599.8%2C242.502%20600.796%2C231.338%20%0D%0A%09%09%09%09603.059%2C206.159%20604.247%2C192.833%20480%2C192.833%20479.828%2C192.833%20479.828%2C223.682%20%09%09%09%22%2F%3E%0D%0A%09%09%3C%2Fg%3E%0D%0A%09%3C%2Fg%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E%0D%0A) no-repeat;
    background-size: cover;
    height: 484px;
  }

  span#svg {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='50%' height='560px' viewBox='281.63 0 396.74 560' enable-background='new 281.63 0 396.74 560' xml:space='preserve'><g><g><g><polygon fill='#E44D26' points='409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5'/><path fill='#E44D26' d='M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z'/><polygon fill='#F16529' points='480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2'/><polygon fill='#F16529' points='541,343 480,343 480,422.4 535.2,407.4'/><polygon fill='#EBEBEB' points='414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4'/><polygon fill='#EBEBEB' points='479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474'/><polygon points='343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5'/><polygon points='425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25'/><polygon points='508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5'/><polygon points='642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5'/><polygon fill='#FFFFFF' points='480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1'/><polygon fill='#FFFFFF' points='479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7'/></g></g></g></svg>") no-repeat;
    background-size: cover;
    height: 484px;
  }
</style>

`img` 要素はコンテンツのダウンロード、デコード、レンダリングをする際に非常に便利です。また、最新のブラウザでは幅広い画像形式がサポートされています。デスクトップの場合と同様に、複数の端末に対応した画像を用意すると、わずかな調整だけで快適なエクスペリエンスを実現できます。




### TL;DR {: .hide-from-toc }

- 相対サイズを使用すると、意図せず画像がコンテナからはみ出るのを防止できます。
- デバイス特性に応じて異なる画像を指定（アート ディレクション）する場合は、`picture` 要素を使用します。
- `img` 要素で `srcset` および `x` 記述子を使用して、ブラウザがさまざまな密度の中から最適な画像を選択できるようにします。
- ページ上に画像が 1 つか 2 つしかなく、その画像がサイト上の別の場所では使用されていない場合は、インライン画像を使用してファイルのリクエストを削減することを検討します。


###  画像に相対サイズを使用する

意図せず画像がビューポートからはみ出ることを防ぐために、画像の幅の指定では必ず相対的な単位を使用してください。
たとえば `width: 50%;`
と指定すると、親要素に対して画像幅が 50% になります（ビューポートや実際のピクセルサイズの
50% ではない）。

CSS ではコンテンツをコンテナからオーバーフローさせることができるため、画像やほかのコンテンツのオーバーフローを避けるため、最大幅
100% の使用が必要となります。次に例を示します。



    img, embed, object, video {
      max-width: 100%;
    }
    

`img` 要素の `alt` 属性を使用して、画像についてのわかりやすい説明を必ず追加してください。これらの情報をスクリーン リーダーなどのユーザー補助機能に提供することで、サイトのアクセシビリティを向上させることができます。




###  高 DPI のデバイス向けに `srcset` で `img` を拡張する

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

`srcset` 属性で
`img` 要素の機能を拡張すると、さまざまなデバイス特性に合わせた複数の画像ファイルを簡単に提供できます。
CSS ネイティブの
`image-set`
[CSS 関数](#use-image-set-to-provide-high-res-images)
と同様に
`srcset` を使用すると、ブラウザ側でデバイス特性に応じて最適な画像を選択できます。たとえば、2x のディスプレイでは 2x の画像を使用することができます。さらに将来的には、2x のデバイスでもネットワークの帯域幅が限られている場合は 1x の画像を使用するなどの対応が可能になります。



<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

`srcset` をサポートしていないブラウザでは、`src` 属性に指定されたデフォルトの画像ファイルが使用されます。このため、機能に関係なくあらゆるデバイスで表示できる 1x の画像を必ず含めることが重要です。
`srcset` がサポートされている場合は、カンマ区切りで指定された複数の画像と 条件のリストの解析後にリクエストが送信され、最適な画像のみがダウンロードされて表示されます。



この条件にはピクセル密度、幅、高さなどのあらゆる項目を含めることができますが、現時点で十分にサポートされているのはピクセル密度のみです。
現在の動作と将来的な機能のバランスを考慮し、この属性は 2x の画像の提供にのみ利用してください。



###  `picture` を使用したレスポンシブ画像のアート ディレクション

<img class="attempt-right" src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

デバイス特性に基づいて画像を変更（アート ディレクション）するには、`picture` 要素を使用します。
`picture`
要素は、デバイスのサイズ、解像度、画面の向きなどさまざまな特性に基づいて複数のバージョンの画像を提供する、宣言型のソリューションを定義します。




<div style="clear:both;"></div>

試験運用:`picture` 要素に対応したブラウザが増えてきています。まだ未対応のブラウザもありますが、強力な下位互換性があり、[Picturefill polyfill](http://picturefill.responsiveimages.org/){: .external } を使用できるものもあるため、使用することをお勧めします。さらに詳しい内容は [ResponsiveImages.org](http://responsiveimages.org/#implementation) のサイトをご覧ください。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

 <code>picture</code> 要素は、1 つの画像のソースに対して密度の異なる画像が複数存在する場合、またはレスポンシブ デザインで一部のタイプの画面に別の画像を表示するよう指定する場合に使用します。

<code>video</code>
要素と同様に、複数の  <code>source</code>
要素を追加して、メディアクエリや画像形式に応じて別の画像ファイルを指定できます。


<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

上の例では、ブラウザの幅が
800px 以上の場合に、デバイスの解像度に応じて
`head.jpg` または
`head-2x.jpg` が使用されます。ブラウザの幅が 450px ～ 800px の場合も同様に、デバイスの解像度に応じて
`head-small.jpg` または
`head-small-2x.jpg` が使用されます。画面の幅が 450px より狭い場合や、`picture` 要素がサポートされていない下位互換の場合は、ブラウザは代わりに `img` 要素をレンダリングします。このため、img 要素は必ず含める必要があります。


####  画像サイズを相対値で指定する

画像の最終的なサイズがわからない場合は、画像ソースに対して密度の記述子を指定することが困難です。
これは特に、ブラウザのサイズに応じて、ブラウザの幅に比例したサイズになるフルードな画像の場合に当てはまります。



画像のサイズと密度を固定値で指定する代わりに、提供する各画像サイズを幅の記述子と画像要素のサイズで指定すると、ブラウザ側で自動的に実際のピクセル密度を計算して最適な画像を選択してダウンロードできます。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


上の例では、横幅がビューポート幅の半分（`sizes="50vw"`）になるように画像をレンダリングし、ブラウザ ウィンドウのサイズに関係なく、ブラウザの幅とデバイス ピクセル比に応じて、ブラウザで適切な画像を選択しています。


この例でブラウザがどの画像を選択するかを、以下の表に示します。


<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">ブラウザの幅</th>
      <th data-th="Device pixel ratio">デバイス ピクセル比</th>
      <th data-th="Image used">使用される画像</th>
      <th data-th="Effective resolution">実際の解像度</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


####  レスポンシブ画像におけるブレークポイントの効果

多くの場合、画像サイズはサイトのレイアウトのブレークポイントによって変わる可能性があります。
たとえば、狭い画面では画像をビューポートの幅全体に広げたほうがよいのに対し、広い画面では画像の占める部分を抑える必要があります。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

上の例では、`sizes` 属性で複数のメディアクエリを使用して画像サイズを指定しています。
ブラウザ幅が
600px
より広い場合は画像をビューポート幅の 25% に、ブラウザ幅が 500px ～ 600px の場合はビューポート幅の 50% に、ブラウザ幅が 500px 未満の場合はビューポート幅と同じになるように、それぞれ指定しています。



###  商品の画像を拡大できるようにする

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="商品画像を拡大できる J. Crew のウェブサイト">
  <figcaption class="success">
    商品画像を拡大できる J. Crew のウェブサイト
  </figcaption>
</figure>

ユーザーは購入しようとしている商品を見たいと考えます。また、ショッピング サイトでは商品画像を高解像度で拡大して詳細を確認できることを期待します。これができないと、[調査の参加者](/web/fundamentals/getting-started/principles/#make-product-images-expandable)は不満を感じるとの研究結果が出ています。



画像をタップして拡大できる適切な例として、J. Crew のサイトが挙げられます。一定時間後に非表示になるオーバーレイで画像をタップできることを説明し、画像をズームインして適切な詳細を見ることができるようにしています。



<div style="clear:both;"></div>

###  その他の画像テクニック

####  圧縮画像

[圧縮画像技術](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
を使用すると、デバイスの実際の性能に関係なく、高圧縮の 2x 画像をあらゆるデバイスで表示できます。
画像の種類や圧縮レベルによっては、画像の品質に変化がないように見える場合もありますが、ファイルサイズは大幅に削減されます。



[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

Warning: メモリや必要なデコードの負荷が増加するため、圧縮技術の使用には注意が必要です。大きな画像を小さい画面に合わせてサイズ変更する処理はリソースを消費し、特にメモリと処理能力が限られているローエンド端末では負荷が大きくなります。

####  JavaScript で画像を置き換える

JavaScript で画像を置換する際は、デバイスの性能をチェックして「適切な処理」を行います。
`window.devicePixelRatio` によるデバイス ピクセル比の判別や、画面の幅と高さの取得のほか、`navigator.connection` によるネットワーク接続状況の取得や疑似リクエストの発行も可能です。これらの情報をすべて収集すると、読み込む画像を決定できます。


この方法の大きな欠点として、JavaScript を使用するため、少なくとも先行するパーサーの処理が完了するまで画像が読み込まれないという問題があります。つまり、画像のダウンロードは、`pageload` イベントが発生するまで開始されません。また、ブラウザは 1x と 2x の両方の画像をダウンロードする可能性が高いため、ページの容量が増加します。



####  ラスター画像とベクター画像をインライン化する

画像の作成および保存には、根本的に異なる 2 種類の方法があります。どちらを使用するかによって、画像をレスポンシブに表示する方法が変わります。

**ラスター画像**: 写真などの画像が該当します。色の付いた個々のドットから成るグリッドで画像が表現されます。ラスター画像はカメラやスキャナーから生成されるか、HTML Canvas 要素を使用して作成されます。ラスター画像の保存には、PNG、JPEG、WebP などの形式が使用されます。

**ベクター画像**: ロゴやラインアートなどが該当します。曲線、直線、形状、塗り潰し色、グラデーションで定義されます。ベクター画像は、Adobe Illustrator や Inkscape といったプログラムで作成したり、SVG などのベクター形式を使用してコードを記述して作成することもできます。

#####  SVG

SVG を使用すると、ウェブページにレスポンシブなベクター グラフィックを含めることができます。ベクター ファイル形式がラスター ファイル形式よりも優れているのは、ブラウザが任意のサイズでベクター画像をレンダリングできる点です。ベクター形式では、直線、曲線、色などで構成される図形として画像を表現します。一方ラスター形式では、独立した色のドットに関する情報のみを使用するため、ブラウザはスケーリング時に空白を埋める方法を推測する必要があります。

以下に、同じ画像を 2 種類の形式で示します。左が PNG、右が SVG です。SVG はどのサイズでも適切に表示されますが、左の PNG は大画面では不鮮明になります。

<img class="side-by-side" src="img/html5.png" alt="PNG 形式の HTML5 ロゴ" />
<img class="side-by-side" src="img/html5.svg" alt="SVG 形式の HTML5 ロゴ" />

ページが発行するファイル リクエスト数を削減したい場合は、SVG や Data URI 形式を使用してインラインで画像のコードを記述できます。このページのソースを表示すると、以下のロゴが Data URI と SVG を使用してインラインで宣言されていることがわかります。

<img class="side-by-side" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
      BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW
      9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RUR
      CBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2
      ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8
      vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OT
      kveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzk2Ljc0cHgiIGhlaWdodD0iNTYwc
      HgiIHZpZXdCb3g9IjI4MS42MyAwIDM5Ni43NCA1NjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcg
      MjgxLjYzIDAgMzk2Ljc0IDU2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8Zz4NCgk8Zz4
      NCgkJPGc+DQoJCQk8cG9seWdvbiBmaWxsPSIjRTQ0RDI2IiBwb2ludHM9IjQwOS43MzcsMjQyLj
      UwMiA0MTQuMjc2LDI5My4zNjIgNDc5LjgyOCwyOTMuMzYyIDQ4MCwyOTMuMzYyIDQ4MCwyNDIuN
      TAyIDQ3OS44MjgsMjQyLjUwMiAJCQkNCgkJCQkiLz4NCgkJCTxwYXRoIGZpbGw9IiNFNDREMjYi
      IGQ9Ik0yODEuNjMsMTEwLjA1M2wzNi4xMDYsNDA0Ljk2OEw0NzkuNzU3LDU2MGwxNjIuNDctNDU
    uMDQybDM2LjE0NC00MDQuOTA1SDI4MS42M3ogTTYxMS4yODMsNDg5LjE3Ng0KCQkJCUw0ODAsNT
    I1LjU3MlY0NzQuMDNsLTAuMjI5LDAuMDYzTDM3OC4wMzEsNDQ1Ljg1bC02Ljk1OC03Ny45ODVoM
    jIuOThoMjYuODc5bDMuNTM2LDM5LjYxMmw1NS4zMTUsMTQuOTM3bDAuMDQ2LTAuMDEzdi0wLjAw
    NA0KCQkJCUw0ODAsNDIyLjM1di03OS4zMmgtMC4xNzJIMzY4Ljg1M2wtMTIuMjA3LTEzNi44NzF
    sLTEuMTg5LTEzLjMyNWgxMjQuMzcxSDQ4MHYtNDkuNjY4aDE2Mi4xN0w2MTEuMjgzLDQ4OS4xNz
    Z6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjQ4MCwxOTIuODMzIDYwN
    C4yNDcsMTkyLjgzMyA2MDMuMDU5LDIwNi4xNTkgNjAwLjc5NiwyMzEuMzM4IDU5OS44LDI0Mi41
    MDIgNTk5LjY0LDI0Mi41MDIgDQoJCQkJNDgwLDI0Mi41MDIgNDgwLDI5My4zNjIgNTgxLjg5Niw
    yOTMuMzYyIDU5NS4yOCwyOTMuMzYyIDU5NC4wNjgsMzA2LjY5OSA1ODIuMzk2LDQzNy40NTggNT
    gxLjY0OSw0NDUuODUgNDgwLDQ3NC4wMjEgDQoJCQkJNDgwLDQ3NC4wMyA0ODAsNTI1LjU3MiA2M
    TEuMjgzLDQ4OS4xNzYgNjQyLjE3LDE0My4xNjYgNDgwLDE0My4xNjYgCQkJIi8+DQoJCQk8cG9s
    eWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjU0MC45ODgsMzQzLjAyOSA0ODAsMzQzLjAyOSA
    0ODAsNDIyLjM1IDUzNS4yMjQsNDA3LjQ0NSAJCQkiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiNFQk
    VCRUIiIHBvaW50cz0iNDE0LjI3NiwyOTMuMzYyIDQwOS43MzcsMjQyLjUwMiA0NzkuODI4LDI0M
    i41MDIgNDc5LjgyOCwyNDIuMzggNDc5LjgyOCwyMjMuNjgyIA0KCQkJCTQ3OS44MjgsMTkyLjgz
    MyAzNTUuNDU3LDE5Mi44MzMgMzU2LjY0NiwyMDYuMTU5IDM2OC44NTMsMzQzLjAyOSA0NzkuODI
    4LDM0My4wMjkgNDc5LjgyOCwyOTMuMzYyIAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0VCRU
    JFQiIgcG9pbnRzPSI0NzkuODI4LDQ3NC4wNjkgNDc5LjgyOCw0MjIuNCA0NzkuNzgyLDQyMi40M
    TMgNDI0LjQ2Nyw0MDcuNDc3IDQyMC45MzEsMzY3Ljg2NCANCgkJCQkzOTQuMDUyLDM2Ny44NjQg
    MzcxLjA3MiwzNjcuODY0IDM3OC4wMzEsNDQ1Ljg1IDQ3OS43NzEsNDc0LjA5NCA0ODAsNDc0LjA
    zIDQ4MCw0NzQuMDIxIAkJCSIvPg0KCQkJPHBvbHlnb24gcG9pbnRzPSIzNDMuNzg0LDUwLjIyOS
    AzNjYuODc0LDUwLjIyOSAzNjYuODc0LDc1LjUxNyAzOTIuMTE0LDc1LjUxNyAzOTIuMTE0LDAgM
    zY2Ljg3MywwIDM2Ni44NzMsMjQuOTM4IA0KCQkJCTM0My43ODMsMjQuOTM4IDM0My43ODMsMCAz
    MTguNTQ0LDAgMzE4LjU0NCw3NS41MTcgMzQzLjc4NCw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWd
    vbiBwb2ludHM9IjQyNS4zMDcsMjUuMDQyIDQyNS4zMDcsNzUuNTE3IDQ1MC41NDksNzUuNTE3ID
    Q1MC41NDksMjUuMDQyIDQ3Mi43NzksMjUuMDQyIDQ3Mi43NzksMCA0MDMuMDg1LDAgDQoJCQkJN
    DAzLjA4NSwyNS4wNDIgNDI1LjMwNiwyNS4wNDIgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9
    IjUwOC41MzcsMzguMDg2IDUyNS45MTQsNjQuOTM3IDUyNi4zNDksNjQuOTM3IDU0My43MTQsMzg
    uMDg2IDU0My43MTQsNzUuNTE3IDU2OC44NTEsNzUuNTE3IDU2OC44NTEsMCANCgkJCQk1NDIuNT
    IyLDAgNTI2LjM0OSwyNi41MzQgNTEwLjE1OSwwIDQ4My44NCwwIDQ4My44NCw3NS41MTcgNTA4L
    jUzNyw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9IjY0Mi4xNTYsNTAuNTU1IDYw
    Ni42Niw1MC41NTUgNjA2LjY2LDAgNTgxLjQxMiwwIDU4MS40MTIsNzUuNTE3IDY0Mi4xNTYsNzU
    uNTE3IAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI0ODAsNDc0Lj
    AyMSA1ODEuNjQ5LDQ0NS44NSA1ODIuMzk2LDQzNy40NTggNTk0LjA2OCwzMDYuNjk5IDU5NS4yO
    CwyOTMuMzYyIDU4MS44OTYsMjkzLjM2MiANCgkJCQk0ODAsMjkzLjM2MiA0NzkuODI4LDI5My4z
    NjIgNDc5LjgyOCwzNDMuMDI5IDQ4MCwzNDMuMDI5IDU0MC45ODgsMzQzLjAyOSA1MzUuMjI0LDQ
    wNy40NDUgNDgwLDQyMi4zNSA0NzkuODI4LDQyMi4zOTYgDQoJCQkJNDc5LjgyOCw0MjIuNCA0Nz
    kuODI4LDQ3NC4wNjkgCQkJIi8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9I
    jQ3OS44MjgsMjQyLjM4IDQ3OS44MjgsMjQyLjUwMiA0ODAsMjQyLjUwMiA1OTkuNjQsMjQyLjUw
    MiA1OTkuOCwyNDIuNTAyIDYwMC43OTYsMjMxLjMzOCANCgkJCQk2MDMuMDU5LDIwNi4xNTkgNjA
    0LjI0NywxOTIuODMzIDQ4MCwxOTIuODMzIDQ3OS44MjgsMTkyLjgzMyA0NzkuODI4LDIyMy42OD
    IgCQkJIi8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==">
<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg>

SVG はモバイルおよびデスクトップに[幅広く対応](http://caniuse.com/svg-html5)しており、[最適化ツール](https://sarasoueidan.com/blog/svgo-tools/)によって SVG のサイズを大幅に削減できます。次のインライン SVG ロゴは一見同じようですが、一方は約 3 KB、他方はわずか 2 KB です。

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

#####  Data URI

Data URI を使用して、次の形式で  <code>img</code> 要素の src を Base64 エンコード文字列として設定すると、画像などのファイルをインラインで埋め込むことできます。


    <img src="data:image/svg+xml;base64,[data]">
    

上記の HTML5 ロゴのコードの開始部分は次のようになります。


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

（完全なコードの長さは 5000 文字に及びます！）

[jpillora.com/base64-encoder](https://jpillora.com/base64-encoder) などのドラッグ アンド ドロップ ツールを使用して、画像などのバイナリ ファイルを Data URI に変換することができます。SVG と同様に、Data URI はモバイルおよびデスクトップのブラウザで[幅広くサポート](http://caniuse.com/datauri)されています。

#####  CSS でのインライン化

Data URI と SVG は CSS でインライン化することもできます。これはモバイルとデスクトップの両方でサポートされています。以下に示すのは、CSS で背景画像として実装された 2 つの画像です。どちらも同じように見えますが、片方は Data URI でもう片方は SVG です。

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

#####  インライン化の長所と短所

画像のインライン コード、特に Data URI は冗長になる可能性があります。では、なぜこの技術を使う必要があるのでしょうか。それは、HTTP リクエストを減らすためです。SVG や Data URI を使用すると、画像、CSS、JavaScript を含むウェブページ全体を 1 回のリクエストで取得できます。

短所:

* モバイルでは、外部の  <code>src</code> の画像よりも Data URI を表示するほうが[はるかに遅くなる](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/)可能性があります。
* Data URI によって HTML リクエストのサイズが大幅に増加する場合があります。
* マークアップやワークフローが複雑になります。
* Data URI 形式はバイナリ形式よりもサイズかなり大きくなります（最大 30%）。したがって、ダウンロード全体のサイズを削減できません。
* Data URI はキャッシュされないため、使用されるページごとにダウンロードする必要があります。
* IE 6 および 7 はサポート対象外で、IE8 でも完全にはサポートされていません。
* HTTP/2 では、アセット リクエストを削減すると優先順位が下がります。

他のあらゆるレスポンシブ対応と同様に、テストによって最適な方法を見つける必要があります。デベロッパー ツールを使用してダウンロードするファイルのサイズ、リクエスト数、総遅延時間を測定してください。Data URI はラスター画像で有用な場合があります（たとえば、他の場所で使用されていない写真が 1 枚か 2 枚のみあるホームページなど）。ベクター画像をインライン化する必要がある場合は、SVG の使用をお勧めします。



##  CSS での画像処理

CSS の `background`
プロパティを使用すると、要素に複雑な画像を追加できます。さらに、複数の画像の追加したり、画像を繰り返し使用したり、さまざまな処理が簡単に行えます。
background
プロパティをメディアクエリと併用すると、より高度な処理が可能になり、画面の解像度やビューポートのサイズなどの条件に応じて適切な画像を読み込むことができます。



### TL;DR {: .hide-from-toc }
- 画面サイズ、端末の解像度、ページ レイアウトを考慮して、ディスプレイ特性に合った最適な画像を使用します。
- メディアクエリで `min-resolution` と `-webkit-min-device-pixel-ratio` を使用し、高 DPI ディスプレイの場合は CSS の `background-image` プロパティを変更します。
- マークアップで 1x の画像に加えて srcset を使用し、高解像度の画像を提供します。
- JavaScript の画像置換を利用する場合や、低解像度の端末に高圧縮かつ高解像度の画像を表示する場合は、パフォーマンスへの影響を考慮します。


###  メディアクエリを使用して画像の選択的な読み込みやアート ディレクションを行う

メディアクエリはページ レイアウトの変更に加え、ビューポート幅に応じた画像の条件付き読み込みやアート ディレクションにも利用できます。



たとえば以下の例では、小さい画面の場合は `small.png` のみがダウンロードされてコンテンツの `div` に適用されるのに対し、大きい画面の場合は
`background-image: url(body.png)` が body に、`background-image: url(large.png)` がコンテンツの `div` にそれぞれ適用されます。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

###  image-set を使用して高解像度の画像を表示する

CSS の `image-set()` 関数を使用して `background` プロパティの動作を拡張することで、特性の異なる各デバイス向けに複数の画像ファイルを簡単に配信できます。これを利用して、ブラウザでデバイスの特性に応じて最適な画像を選択できます。たとえば、ディスプレイが 2x の場合は 2x の画像を使用する、デバイスが 2x でもネットワークが低速の場合は 1x の画像を使用する、といったことが可能です。




    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

適切な画像を読み込むほかに、ブラウザではスケーリングも適宜実施します。つまり、ブラウザでは
2x の画像は 1x の画像の 2 倍のサイズであると推定し、2x の画像を係数 2 でスケールダウンして、ページ上で同じサイズに見えるようにします。


`image-set()` への対応は始まったばかりで、現在は Chrome と Safari のみで `-webkit` のベンダー プレフィックス付きでサポートされています。
`image-set()` がサポートされていない場合に使う代替画像を準備する際は注意が必要です。以下を例に説明します。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

上の例では、image-set に対応しているブラウザでは適切なアセットを読み込み、非対応の場合は 1x のアセットを代用します。
ただし `image-set()` に対応しているブラウザは少ないため、ほとんどのブラウザでは 1x のアセットが読み込まれる点に注意してください。


###  メディアクエリを使用して高解像度の画像の表示やアート ディレクションを行う

メディア クエリでは、[デバイス ピクセル比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)に基づいたルールを作成し、2x
のディスプレイと 1x のディスプレイにそれぞれ別の画像を指定できます。



    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox、Opera は標準の `(min-resolution: 2dppx)` をサポートしていますが、Safari と Android のブラウザでは、`dppx`
単位を付けない古いベンダー プレフィックスの構文を使用する必要があります。
これらのスタイルはデバイスがメディアクエリに一致する場合にのみ読み込まれること、および、基本となるスタイルを指定する必要があることに注意してください。
この方法には、ブラウザが解像度固有のメディアクエリに非対応であっても、なんらかの画像が確実にレンダリングされるというメリットもあります。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

また、min-width 構文を使用して、ビューポートのサイズに応じた代替画像を表示することもできます。
この方法には、メディアクエリに一致しない限り画像がダウンロードされないというメリットがあります。
たとえば、以下の `bg.png` はブラウザの幅が 500px 以上ある場合にのみダウンロードされて `body` に適用されます。



    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


##  アイコンに SVG を使用する 

ページにアイコンを追加する際は、できるだけ SVG のアイコンを使用し、状況に応じて Unicode 文字を使います。



### TL;DR {: .hide-from-toc }
- アイコンにはラスター画像ではなく、SVG か Unicode を使用します。


###  シンプルなアイコンを Unicode に置き換える

多くのフォントではさまざまな Unicode グリフをサポートしており、画像の代わりにこれらのグリフを利用できます。
Unicode フォントは画像と違って適切にスケーリングされ、画面上での表示サイズにかかわらず鮮明に見えます。


Unicode
には通常の文字セット以外にも、矢印（&#8592;）、数学記号（&#8730;）、幾何学模様（&#9733;）、制御機能用記号（&#9654;）、音楽記号（&#9836;）、ギリシャ文字（&#937;）、チェスの駒（&#9822;）などの記号が含まれています。



Unicode 文字は、HTML エンティティと同じように「`&#XXXX`」の形式で入力できます。「`XXXX`」には Unicode 文字の番号を指定します。
次に例を示します。


    You're a super &#9733;
    

You're a super &#9733;

###  複雑なアイコンを SVG に置き換える

複雑なアイコンを使う必要がある場合は、SVG アイコンを使用します。SVG アイコンは一般に軽量で使いやすいく、CSS でスタイルを設定できます。
SVG には、ラスター画像と比較して次のような数多くのメリットがあります。


* ベクター グラフィックであるため、無限にスケーリングできます。
* 色、影、透明度、アニメーションなどの CSS 効果を直接適用できます。
* SVG 画像はインラインでドキュメントに直接含めることができます。
* セマンティックです。
* 適切な属性の使用により、ユーザー補助機能にも対応できます。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

###  アイコン フォント使用時の注意点

<figure class="attempt-right">
<img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="フォント アイコンに Font Awesome を使用するページの例">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
      フォント アイコンに Font Awesome を使用するページの例
    </a>
  </figcaption>
</figure>

アイコン フォントは使いやすく、広く利用されていますが、SVG アイコンと比較するといくつかの欠点があります。


* ベクター グラフィックであるため無限にスケーリングできますが、アンチエイリアス処理のためアイコンの輪郭が不鮮明になる場合があります。
* CSS によるスタイル設定に制限があります。
* line-height や letter-spacing などの設定によっては、ピクセル単位での完全な位置指定が難しい場合があります。
* セマンティックではないため、スクリーン リーダーなどのユーザー補助機能で利用しづらい場合があります。
* 適切な範囲で使用しないと、一部のアイコンを使用するためだけにファイルサイズが大きくなる場合があります。
 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

[Font
Awesome](https://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/){: .external }、[Glyphicons](https://glyphicons.com/)
など、有料および無料のアイコン フォントが数多く提供されています。

HTTP リクエストやファイルサイズの増加分とアイコンの必要性のバランスを必ず考慮してください。
たとえば、必要なアイコンの数が少なければ、画像や画像スプライトを使用したほうが良い場合もあります。



##  画像を最適化してパフォーマンスを向上させる

ダウンロード容量の大半を画像が占めることはよくあり、ページ上の表示スペースの大部分を画像が占有することも少なくありません。
そのため、画像を最適化することでウェブサイトの容量が大幅に削減され、パフォーマンスの改善につながるケースが多くあります。ブラウザでダウンロードしなければならない容量が少ないほど、クライアントの帯域幅における競合は減り、ブラウザですべてのアセットをダウンロードして画面に表示するまでの時間が短縮されます。






### TL;DR {: .hide-from-toc }
- 画像形式は無作為に選択せず、利用可能な各形式を理解したうえで最適なものを使用します。
- ワークフローの中で画像最適化ツールと圧縮ツールを使用し、ファイルのサイズを縮小します。
- 利用頻度の高い画像を image sprites にまとめて、HTTP リクエストの回数を減らします。
- 最初に読み込むページ容量を減らし、読み込み時間を短縮するために、画面をスクロールして画像がビューに表示されてからデータを読み込むようにします。


###  適切な形式を選ぶ

画像については、[ベクター画像](https://en.wikipedia.org/wiki/Vector_graphics)
と[ラスター画像](https://en.wikipedia.org/wiki/Raster_graphics)
の 2 種類を検討する必要があります。ラスター画像の場合は、適切な圧縮形式（`GIF`、`PNG`、`JPG` など）の選択も必要です。


**ラスター画像**とは、個々のドットやピクセルのグリッドで表現される写真などの画像です。
ラスター画像は通常、カメラやスキャナで作成されますが、ブラウザ内で `canvas` 要素を使用して作成することもできます。
画像サイズが大きくなると、ファイルのサイズも大きくなります。
ラスター画像は元のサイズよりも大きくスケーリングすると、ブラウザ側で欠落しているピクセルを推測して補間する必要があるため、画像が不鮮明になります。



**ベクター画像**（ロゴやラインアートなど）は、曲線、直線、形状、塗りつぶし色の集合として定義されます。ベクター画像は、Adobe Illustrator や Inkscape などのプログラムを使用して作成され、[`SVG`](https://css-tricks.com/using-svg/) などのベクター形式で保存されます。ベクター画像は基本的な要素で構成されているため、ファイルサイズを変えずに、品質を保ったままスケーリングが可能です。



適切な形式を選択するには、画像形式（ラスターまたはベクター）とコンテンツ（色、アニメーション、テキストなど）の両方を考慮することが重要です。すべての画像タイプに最適な形式はなく、各形式にはそれぞれ長所と短所があります。




適切な形式を選ぶ際は、まず次のガイドラインを参考にしてください。

* 写真画像には `JPG` を使用します。
* ベクターアートや無地のグラフィック（ロゴやラインアートなど）には `SVG` を使用します。
  ベクターアートを利用できない場合は、`WebP` か `PNG` を使用します。
* `GIF` ではなく `PNG` を使用します。これは、PNG のほうが使用できる色数が多く、圧縮率も優れているためです。
* 長いアニメーションには、画質が良く、ユーザー側での再生操作が可能な `<video>` を使用することを検討します。


###  ファイルサイズを小さくする

画像ファイルのサイズは、保存後に「後処理」を行うことで大幅に削減できます。
画像圧縮用のツールには、可逆および非可逆圧縮ツールや、オンライン、GUI、コマンドライン タイプのツールなど、さまざまな種類があります。
可能であれば、ワークフローにおける画像の最適化作業を自動化することをおすすめします。


また、`JPG`
および `PNG` ファイルを、画質を下げずに可逆圧縮できるツールもいくつかあります。`JPG`
の場合は、[jpegtran](http://jpegclub.org/){: .external }
または
[jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external }（Linux でのみ利用可能、–strip-all オプションを付けて実行）を利用できます。`PNG` の場合は、[OptiPNG](http://optipng.sourceforge.net/){: .external }
または
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm) を利用できます。

###  image sprites を使用する

<img src="img/sprite-sheet.png" class="attempt-right" alt="例で使用されている image sprites シート">

CSS スプライトとは、複数の画像を 1 つの「スプライト シート」という画像にまとめるテクニックです。
個々の画像を使用するには、要素の背景画像（スプライト シート）とオフセットを指定して目的のパーツを表示します。



<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

画像スプライトを使用すると、複数の画像を取得するために必要なダウンロードの回数を減らせるというメリットがあります。ただし、キャッシュは有効にしておく必要があります。


###  遅延読み込みの使用を検討する

長いページの未表示の部分に画像が多く含まれている場合は、遅延読み込みによって、読み込み時間を大幅に短縮できます。具体的には、必要になった時点で画像を読み込むか、主要コンテンツの読み込みとレンダリングが完了した時点で画像を読み込みます。遅延読み込みを使用すると、パフォーマンスの向上だけでなく、無限にスクロールするページの作成も可能になります。


無限にスクロールするページを作成する場合、コンテンツは表示される時点で読み込まれるため、検索エンジンでコンテンツを認識できない場合があることに注意してください。
また、ユーザーがフッターにある情報を見たい場合でも、新しいコンテンツが次々と読み込まれるため、フッターにたどり着きません。





##  画像は極力使用しない

画像そのものを使わずに、画像を表現した方が好ましい場合もあります。できるだけブラウザのネイティブ機能を利用して、同じ機能や同等の機能を提供するようにしてください。以前は画像が必要だったビジュアルを、今ではブラウザで表現できます。そのため、ブラウザで個々の画像ファイルをダウンロードする必要がなく、画像のサイズが不自然に変更されることもありません。アイコンのレンダリングには、Unicode または専用のアイコン フォントを使用できます。

###  テキストは画像に埋め込まずにマークアップに含める

テキストは、できるだけ画像に埋め込まず、テキスト形式のままにします。たとえば見出しに画像を使用したり、電話番号や住所などの連絡先情報を画像に埋め込んでしまうと、ユーザーはその情報をコピー＆ペーストできません。さらに、スクリーン リーダーも情報を取得できず、レスポンシブでなくなります。



テキストはマークアップ内に配置し、必要な場合はウェブフォントを使用して所要のスタイルを適用してください。


###  CSS を使用して画像を置き換える

最新のブラウザでは、従来は画像を必要としていたスタイルを CSS の機能を使用して実現できます。
たとえば
`background` プロパティで複雑なグラデーションを、`box-shadow` プロパティで影を、`border-radius` プロパティで角丸を作成できます。


<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque sit
amet augue eu magna scelerisque porta ut ut dolor.Nullam placerat egestas
nisl sed sollicitudin.Fusce placerat, ipsum ac vestibulum porta, purus
dolor mollis nunc, pharetra vehicula nulla nunc quis elit.Duis ornare
fringilla dui non vehicula.In hac habitasse platea dictumst.Donec
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

これらの手法はレンダリング サイクルを必要とするため、モバイルではパフォーマンスに影響する可能性があります。
使いすぎると、CSS のメリットが失われるだけでなく、パフォーマンスが低下するおそれもあります。



{# wf_devsite_translation #}
