project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:一圖勝千言，圖像也是每個頁面不可或缺的組成部分。但是，圖像通常也佔了下載字節的多數。有了自適應網頁設計，不僅我們的佈局能根據設備特性而變化，圖像也可以。

{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2014-04-29 #}

# 圖像 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


自適應網頁設計意味着，不僅我們的佈局能根據設備特性而變化，內容也可以。
例如，高分辨率 (2x) 顯示屏上高分辨率圖形可保證清晰度。
當瀏覽器寬度爲 800px 時，一張 50% 寬度的圖像或許很適合，但在一款很窄的手機上，則會佔用太多屏幕空間，並且縮小圖像來適應較小的屏幕時，耗費的帶寬開銷卻是一樣的。




## 藝術指導

<img src="img/art-direction.png" alt="藝術指導示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

其餘時候，圖像也許需要更大幅度的修改：更改比例、裁剪甚至更換整個圖像。
在這種情況下，更改圖像通常稱作藝術指導。
請訪問 [responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external }，查看更多示例。



{% include "web/_shared/udacity/ud882.html" %}

## 標記中的圖像

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

`img` 元素很強大，它可下載、解碼然後渲染內容，而現代瀏覽器支持衆多圖像格式。跨設備使用圖像與桌面端並無二致，只需做一些微小調整，就能構建美好體驗。




### TL;DR {: .hide-from-toc }

- 爲圖像使用相對尺寸，防止它們意外溢出容器。
- 如果您要根據設備特性（亦稱藝術指導）指定不同圖像，則使用 `picture` 元素。
- 在 `img` 元素中使用 `srcset` 及 `x` 描述符，引導瀏覽器從不同密度圖像中選擇、使用最佳的一張。
- 如果您的頁面僅有一兩個圖像，且這些圖像沒有在您的網站上的其他地方使用，可考慮使用內聯圖像以減少文件請求。


### 圖像使用相對尺寸

在指定圖像寬度時，請記得使用相對單位，以防止它們意外溢出視口。
例如，`width: 50%;` 將圖片寬度設置爲包含元素寬度的 50%（並非視口或實際像素大小的 50%）。



因爲 CSS 允許內容溢出其容器，因此可能需要使用 max-width:
100% 來保證圖像及其他內容不會溢出。例如：



    img, embed, object, video {
      max-width: 100%;
    }
    

請務必藉助 `img` 元素的 `alt` 屬性提供有意義的描述；這些描述有助於提高您的網站的可訪問性，因爲它們能提供語境給屏幕閱讀器及其他輔助性技術。




### 高 DPI 設備上使用 `srcset` 來增強 `img`

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

`srcset` 屬性增強了 `img` 元素的行爲，讓您能夠輕鬆地針對不同設備特性提供多種圖片文件。類似於 CSS 原生的 `image-set` [CSS 函數](#use-image-set-to-provide-high-res-images)，`srcset` 也允許瀏覽器根據設備特性選擇最佳圖像，例如，在 2x 顯示屏上使用 2x 圖像，將來甚至允許在網絡帶寬有限時對 2x 設備使用 1x 圖像。







<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

在不支持 `srcset` 的瀏覽器上，瀏覽器只需使用 `src` 屬性指定的默認圖像文件。
正因如此，無論設備能力如何，一定要始終包含一個在任何設備上都能顯示的 1x 圖像。如果 `srcset` 受支持，則會在進行任何請求之前對逗號分隔的圖像/條件列表進行解析，並且只會下載和顯示最合適的圖像。



儘管條件可以包含從像素密度到寬度和高度等各種參數，但目前只有像素密度能夠得到很好的支持。
爲使當前行爲和未來特性保持平衡，請繼續在屬性中只提供 2x 圖像。



### 在自適應圖像中用 `picture` 實現藝術指導

<img class="attempt-right" src="img/art-direction.png" alt="藝術指導示例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

若要根據設備特性更改圖像（也稱爲藝術指導），請使用 `picture` 元素。
`picture` 元素定義了一個聲明性解決辦法，可根據設備大小、設備分辨率、屏幕方向等不同特性來提供一個圖像的多個版本。





<div style="clear:both;"></div>

Dogfood：`picture` 元素剛開始在瀏覽器上實現。雖然目前還不是每個瀏覽器都支持，但我們推薦使用它，因爲它具備出色的向後兼容性，還可以使用 [Picturefill polyfill](http://picturefill.responsiveimages.org/){: .external }。如需瞭解更多詳細信息，請參閱 [ResponsiveImages.org](http://responsiveimages.org/#implementation) 網站。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

當圖像源存在多種密度，或自適應設計要求在部分類型屏幕上顯示不太一樣的圖像時，可使用  <code>picture</code> 元素。類似於 <code>video</code> 元素，它可以包含多個  <code>source</code> 元素，使得根據媒體查詢或圖片格式指定不同圖片文件成爲可能。




<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

上面的例子中，如果瀏覽器寬度至少爲 800px，則將根據設備分辨率使用 `head.jpg` 或 `head-2x.jpg`。如果瀏覽器寬度在 450px 和 800px 之間，則將根據設備分辨率使用 `head-small.jpg` 或 `head-small-2x.jpg`。對於屏幕寬度小於 450px，且不支持 `picture` 元素向後兼容的情況，瀏覽器將渲染 `img` 元素，因此要始終包含該元素。







#### 相對大小的圖像

如果不知道圖像的最終尺寸，則很難給圖像源指定一個密度描述符。
對於寬度與瀏覽器寬度成比例的圖像更是如此，圖像尺寸是可變的，具體取決於瀏覽器的尺寸。



提供的每個圖像的尺寸可以通過添加寬度描述符和圖像元素的大小來指定，而不是提供固定的圖像尺寸和密度，從而允許瀏覽器自動計算有效的像素密度，然後選擇下載最佳圖像。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


在上面的例子中，渲染了一張寬度爲視口寬度一半 (`sizes="50vw"`) 的圖像，根據瀏覽器的寬度及其設備像素比，允許瀏覽器選擇正確的圖像，而不考慮瀏覽器窗口有多大。例如，下面的表格顯示了瀏覽器會選擇哪張圖像：


<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">瀏覽器寬度</th>
      <th data-th="Device pixel ratio">設備像素比</th>
      <th data-th="Image used">使用的圖像</th>
      <th data-th="Effective resolution">有效分辨率</th>
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


#### 考慮自適應圖像中的斷點

在許多情況下，圖像尺寸可能會根據網站的佈局斷點發生變化。
例如，在一個小屏幕上，您可能想要圖像佔滿視口的全寬，在大屏幕上，則應只佔一小部分。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

上面例子中的 `sizes` 屬性使用多個媒體查詢來指定圖片尺寸。
當瀏覽器寬度大於 600px 時，圖像佔據視口寬度的 25%，瀏覽器寬度在 500px 到 600px 之間時，圖像佔據視口寬度的 50%，如果低於 500px，圖像爲全寬。





### 讓產品圖像可擴展

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="帶有可擴展產品圖像的 J. Crews 網站">
  <figcaption class="success">
    帶有可擴展產品圖像的 J. Crew 網站。
  </figcaption>
</figure>

客戶想要看到他們買的是什麼。在零售網站上，用戶希望能夠看到高分辨率的產品特寫，以更好地看清細節，[調查對象](/web/fundamentals/getting-started/principles/#make-product-images-expandable)如果沒能看到商品特寫會感到非常沮喪。



J. Crew 網站提供了一個很好的可點按、可展開圖像的例子。一個消失中的疊層表示圖像可點按，點按後提供放大的圖像細節。



<div style="clear:both;"></div>

### 其他圖像技術

#### 壓縮的圖像

[壓縮的圖像技術](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)可以給所有設備提供一個高度壓縮的 2x 圖像，無論設備的實際能力如何。根據圖像的類型和壓縮級別，圖像質量可能看似沒有變化，但文件大小卻明顯減小。



[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

注意：請慎用壓縮技術，因爲它需要增加內存和解碼成本。在內存和處理能力有限的低端設備上，調整大圖像以適應較小屏幕的開銷非常大，並且費時費力。

#### JavaScript 圖像替換

JavaScript 圖像替換技術檢查設備能力，然後“做正確的事”。
您可以通過 `window.devicePixelRatio` 確定設備像素比，獲取屏幕的寬度和高度，甚至可通過 `navigator.connection` 或發出假請求來執行某種網絡連接嗅探。收集了所有這些信息後，您就可以決定加載哪個圖像。


此方法的一大缺陷是，使用 JavaScript 意味着您將延遲加載圖像，至少要等到先行解析器結束。
這意味着，圖像要等到 `pageload` 事件觸發後才能開始下載。此外，瀏覽器很可能會同時下載 1x 和 2x 圖像，導致頁面重量增加。



#### 內聯圖像：光柵圖像和矢量圖像

創建和存儲圖像有兩種全然不同的方式，這將決定您如何以自適應方式部署圖像。

**光柵圖像**：如相片及其他通過單個顏色點網格表示的圖像。光柵圖像可來自照相機或掃描儀，也可以藉助 HTML canvas 元素創建。可使用 PNG、JPEG 和 WebP 之類的格式存儲光柵圖像。

**矢量圖像**：如徽標和藝術線條，是由一系列的曲線、直線、形狀、填充色和漸變色定義的。矢量圖像可通過 Adobe Illustrator 或 Inkscape 之類的程序創建，或使用 SVG 等矢量格式在代碼中手動寫入。

##### SVG

使用 SVG 可在網頁中包含自適應矢量圖像。矢量文件格式比光柵文件格式有優勢的地方在於，瀏覽器可以渲染任何大小的矢量圖像。矢量格式描述的是圖像的幾何圖形，即該圖像是如何通過線條、曲線和顏色等構造的。而光柵格式僅提供與單個顏色點有關的信息，因此，在進行縮放時，瀏覽器必須猜測如何填充空白。

下面是同一個圖像的兩個版本：左邊是一個 PNG 圖像，右邊是一個 SVG 圖像。SVG 圖像在任何尺寸看上去都非常棒，而它旁邊的 PNG 圖像在顯示尺寸較大時會變得模糊。

<img class="side-by-side" src="img/html5.png" alt="HTML5 徽標，PNG 格式" />
<img class="side-by-side" src="img/html5.svg" alt="HTML5 徽標，SVG 格式" />

如果您要減少頁面發出的文件請求數量，您可以使用 SVG 或 Data URI 格式爲圖像內聯編寫代碼。如果您查看此頁面的源代碼，就會發現下面的這兩個徽標均被聲明爲內聯：Data URI 和 SVG。

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

SVG 在移動設備和桌面設備上能夠得到[很好的支持](http://caniuse.com/svg-html5)，[優化工具](https://sarasoueidan.com/blog/svgo-tools/)可以大大減小 SVG 尺寸。以下兩個內聯 SVG 徽標看起來完全相同，但一個大約 3KB，另一個僅 2KB：

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

##### Data URI

通過 Data URI 可以添加文件，如圖像，使用以下格式將  <code>img</code> 元素的 src 設置爲 Base64 編碼的字符串進行內聯：


    <img src="data:image/svg+xml;base64,[data]">
    

上述 HTML5 徽標的代碼開頭類似於下面所示：


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

（完整版本長度超過 5000 字符！）

可使用拖放式工具（例如 [jpillora.com/base64-encoder](https://jpillora.com/base64-encoder)）轉換二進制文件，如將圖像轉換爲 Data URI 格式。與 SVG 相似，移動設備和桌面設備瀏覽器都能爲 Data URI [提供很好的支持](http://caniuse.com/datauri)。

##### 在 CSS 中進行內聯

Data URI 和 SVG 還可以內聯到 CSS 中，移動設備和桌面設備均提供此支持。下面是兩個外觀完全相同的圖像，在 CSS 中作爲背景圖片實現；一個是 Data URI，另一個是 SVG：

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

##### 內聯的優缺點

圖像的內聯代碼可能很冗長，特別是 Data URI 格式的圖像，那麼您爲什麼要使用它呢？爲了減少 HTTP 請求！SVG 和 Data URI 可實現通過一個請求檢索整個網頁，包括圖像、CSS 和 JavaScript。

缺點：

* 與來自外部  <code>src</code> 的圖像相比，在移動設備上 Data URI 格式圖像的顯示速度要[慢得多](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/)。
* Data URI 會顯著增加 HTML 請求的大小。
* Data URI 會增加標記和工作流的複雜性。
* Data URI 格式的圖像比二進制格式的圖像大很多（最多大 30%），因此不會減小總下載大小。
* Data URI 無法緩存，因此必須爲使用它們的每一個頁面分別進行下載。
* IE 6 和 7 不支持 Data URI，IE8 僅提供有限支持。
* 對於 HTTP/2，減少資產請求的次數將使優先級下降。

由於所有格式都可以自適應，因此，您需要測試哪一種格式效果最佳。使用開發者工具衡量下載文件大小、請求的次數以及總延遲時間。對於光柵圖像，Data URI 有時候非常有用，例如，如果主頁只有一兩張圖像且這些圖像沒有在其他地方使用，則可使用 Data URI。如果您需要內聯矢量圖像，SVG 是一個比較好的選擇。



## CSS 中的圖像

CSS `background` 屬性是一個用於爲元素添加複雜圖像的工具，功能強大，可用於輕鬆添加多個圖像、重複圖像以及執行其他操作。與媒體查詢結合使用時，background 屬性變得更加強大，能夠根據屏幕分辨率、視口大小等有條件地加載圖像。




### TL;DR {: .hide-from-toc }
- 使用最適合顯示屏特性的圖像，考慮屏幕尺寸、設備分辨率及頁面佈局。
- 結合使用媒體查詢和 `min-resolution` 及`-webkit-min-device-pixel-ratio` 針對高分辨率顯示屏更改 CSS 中的 `background-image` 屬性。
- 除了標記中的 1x 圖像外，使用 srcset 提供高分辨率圖像。
- 使用 JavaScript 圖像替換技術時或爲低分辨率設備提供高度壓縮的高分辨率圖像時，請考慮性能成本。


### 利用媒體查詢有條件地加載圖像或提供藝術指導

媒體查詢不僅影響頁面佈局，還可以用於有條件地加載圖像，或是基於視口寬度提供藝術指導。



以下面的示例爲例，在較小屏幕上，只會 `small.png` 並將其應用於內容 `div`，而在較大屏幕上，會將 `background-image: url(body.png)` 應用於 body，`background-image: url(large.png)` 應用於內容 `div`。




<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

### 使用 image-set 提供高分辨率圖像

CSS 中的 `image-set()` 函數增強了 `background` 屬性的行爲，使它能夠輕鬆地針對不同設備特性提供多種圖像文件。這樣，瀏覽器就可以根據設備特性選擇最佳圖像，例如，在 2x 顯示屏上使用 2x 圖像，或在網絡帶寬有限時在 2x 的設備上使用 1x 圖像。




    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

除了加載合適的圖像外，瀏覽器也會相應地調整其大小。
換句話說，瀏覽器假設 2x 圖像是 1x 圖像的兩倍大，因此會將 2x 圖像縮小一半，最後圖像在頁面上看上去就一樣大。



對 `image-set()` 的支持目前還很少，僅 Chrome 和 Safari 上通過 `-webkit` 供應商前綴提供支持。
對於 `image-set()` 不受支持的情況，應注意加入備用圖像，例如：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

上例中，會在支持 image-set 的瀏覽器中加載合適的資產，否則將改爲加載 1x 資產。
需要特別注意的是，支持 `image-set()` 的瀏覽器非常少，大部分瀏覽器會加載 1x 資產。


### 利用媒體查詢提供高分辨率圖像或藝術指導

媒體查詢可根據[設備像素比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)創建規則，讓您可以針對 2x 和 1x 顯示屏分別指定不同的圖像。




    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox 和 Opera 都支持標準的 `(min-resolution: 2dppx)`，Safari 和 Android 瀏覽器則均需要不帶 `dppx` 單位的舊版供應商前綴語法。請謹記，這些樣式只有在設備與媒體查詢匹配時才被加載，且必須爲基礎案例指定樣式。
這樣也能夠確保當瀏覽器不支持分辨率特有的媒體查詢時，一些內容仍可以得到渲染。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

您也可以使用 min-width 語法根據視口大小顯示備用圖像。
此方法的好處是，如果媒體查詢不匹配，則圖像不會被下載。
例如，只有在瀏覽器寬度等於 500px 或更大時，`bg.png` 纔會被下載，然後應用於 `body`：



    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


## 爲圖標使用 SVG 

爲頁面添加圖標時，儘可能使用 SVG 圖標，某些情況下，請使用 unicode 字符。



### TL;DR {: .hide-from-toc }
- 爲圖標使用 SVG 或 unicode，而不是光柵圖像。


### 使用 unicode 替代簡單圖標

許多字體支持各種各樣的 unicode 字形，可用於替代圖像。
與圖像不同，unicode 字體可以縮放，不管在屏幕上的顯示大小如何，顯示效果都很好。


除了常見的字符集，unicode 可能包含的符號有箭頭 (&#8592;)、數學運算符 (&#8730;)、幾何形狀 (&#9733;)、控制圖片 (&#9654;)、音符 (&#9836;)、希臘字母 (&#937;)，甚至象棋子 (&#9822;)。




添加 unicode 字符的方式與指定的字符實體一樣：`&#XXXX`，其中 `XXXX` 代表 unicode 字符編碼。
例如：


    You're a super &#9733;
    

You're a super &#9733;

### 使用 SVG 替代複雜圖標

對於更爲複雜的圖標需求，SVG 圖標通常要輕量、易用，並且可以通過 CSS 設置樣式。
SVG 的優勢比光柵圖像多很多：


* 它們是矢量圖形，可以無限縮放。
* 顏色、陰影、透明度以及動畫等 CSS 效果非常簡單明瞭。
* SVG 圖像能夠直接內聯到文檔中。
* 它們是有語義的。
* 它們通過適當的屬性提供更佳的可訪問性。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

### 謹慎使用圖標字體

<figure class="attempt-right">
  <img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="使用 FontAwesome 作爲其圖標字體的頁面示例。">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
      使用 FontAwesome 作爲其圖標字體的頁面示例。
    </a>
  </figcaption>
</figure>

圖標字體很流行，使用也方便，但與 SVG 圖標相比，還是有些缺陷。


* 它們是可以無限縮放的矢量圖形，但可能會做抗鋸齒處理，導致圖標不如預期的那樣銳利。
* 有限的 CSS 樣式設置。
* 要實現像素完美定位效果很難，具體取決於行高、字符間距等。
* 它們沒有語義，可能很難與屏幕閱讀器及其他輔助性技術結合使用。
* 除非正確設置了作用域，否則它們可能造成文件很大，卻只使用了一小部分可用圖標的情況。
 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

免費及收費的圖標字體有數百種，包括 [Font Awesome](https://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/){: .external } 和 [Glyphicons](https://glyphicons.com/)。



請務必在對圖標的需求與額外增加的 HTTP 請求及文件大小之間取得平衡。
例如，如果只需要少量圖標，或許使用圖像或 image sprites 會更合適。



## 優化圖像以提升性能

圖像通常佔據了下載字節的大部分，通常也佔據了網頁上大量的視覺空間。
因此，優化圖像通常可以最大限度地減少從網站下載的字節數以及提高網站性能：瀏覽器需要下載的字節越少，佔用客戶端的帶寬就越少，瀏覽器下載並渲染所有資產的速度就越快。






### TL;DR {: .hide-from-toc }
- 不要只是隨意地選擇圖像格式，要了解不同的可用格式，並使用最適合的格式。
- 在您的工作流程中引入圖像優化與壓縮工具，減小文件大小。
- 將常用圖像放入 image sprites 中，減少 http 請求數量。
- 考慮在圖像滾動進入視圖後才加載圖像，以縮短頁面初始加載時間，減小初始頁面重量。


### 選擇正確的格式

有兩種圖像類型可以考慮：[矢量圖像](https://en.wikipedia.org/wiki/Vector_graphics)與[光柵圖像](https://en.wikipedia.org/wiki/Raster_graphics)。對於光柵圖像，您還需要選擇正確的壓縮格式，例如：`GIF`、`PNG`、`JPG`。




**光柵圖像**，如相片及其他通過單個的點或像素網格表示的圖像。
光柵圖像通常來自照相機或掃描儀，也可以在瀏覽器中藉助 `canvas` 元素創建。
隨着圖像尺寸的增加，文件大小也相應地增加。
如果光柵圖像放大時超過其初始尺寸，則會變得模糊，因爲瀏覽器需要猜測如何填補缺失的像素。



**矢量圖像**，如徽標和藝術線條，是由一系列的曲線、直線、形狀和填充色定義的。
矢量圖像使用 Adobe Illustrator 或 Inkscape 之類的程序創建，並保存爲矢量格式，如 [`SVG`](https://css-tricks.com/using-svg/)。由於矢量圖像是建立在簡單基元上的，因此，可以進行無損質量的縮放，且文件大小不變。在選擇正確的格式時，務必綜合考慮圖像的源格式（光柵圖像還是矢量圖像）及內容（顏色、動畫、文本等等）。沒有一種格式能夠適用所有圖像類型，它們各有優劣。




在選擇正確的格式時，先參考以下指導準則：

* 攝影圖像使用 `JPG`。
* 徽標和藝術線條等矢量插畫及純色圖形使用 `SVG`。
  如果矢量插畫不可用，試試 `WebP` 或 `PNG`。
* 使用 `PNG` 而非 `GIF`，因爲前者可以提供更豐富的顏色和更好的壓縮比。
* 長動畫考慮使用 `<video>`，它能提供更好的圖像質量，還允許用戶控制回放。


### 減小文件大小

可通過在保存圖像後對其進行“後處理”來大幅減小圖片文件的大小。
圖像壓縮工具有很多種 – 有損與無損壓縮、在線壓縮、GUI 壓縮及命令行壓縮工具。
在可能的情況下，最好自動進行圖像優化，這樣在您的工作流程中，它就是一等公民。


有多種工具可用來對 `JPG` 和 `PNG` 文件做進一步的無損壓縮，而不會對圖像質量造成影響。
對於 `JPG`，試試 [jpegtran](http://jpegclub.org/){: .external } 或 [jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external }（只在 Linux 上可用；通過 –strip-all 選項運行）。對於 `PNG`，試試 [OptiPNG](http://optipng.sourceforge.net/){: .external } 或 [PNGOUT](http://www.advsys.net/ken/util/pngout.htm)。



### 使用 image sprites

<img src="img/sprite-sheet.png" class="attempt-right" alt="示例中使用的 image sprites 表">

CSS 精靈是一項技術，可將許多圖像合併到一個“精靈表”圖像中。
然後，通過指定元素背景圖像（精靈表）以及指定用於顯示正確部分的位移，可以使用各個圖像。



<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

精靈化的好處是，減少了讀取多張圖像所需的下載數量，而且能保持啓用緩存。


### 考慮延緩加載

在首屏包含許多圖像的長頁面中，延緩加載能極大提高加載速度，可以按需加載圖像，或者在主要內容加載和渲染完成之後加載圖像。除了性能上的提升外，使用延緩加載能產生無限滾動的體驗。


在創建無限滾動的頁面時，需要注意，由於內容是可見後才加載的，因此搜索引擎可能永遠看不到該內容。
此外，用戶想查看頁腳信息也不可能了，因爲總是有新內容被加載。





## 完全避免使用圖像

有時，最好的圖像並不真是圖像。如果可以，請使用瀏覽器的原生功能實現相同或類似的效果。瀏覽器可以生成之前需要圖像才能生成的視覺效果。
   這意味着，瀏覽器不再需要下載單獨的圖像文件，從而避開糟糕的圖像縮放問題。
圖標可以使用 unicode 或特殊的圖標字體來呈現。

### 將文本放在標記內，而不要嵌入圖像內

如果可以，文本要單獨放置，而不要嵌入圖像內。例如將圖像用作標題，或直接在圖像中放入電話號碼或地址等聯繫信息會使用戶無法複製和粘貼信息；屏幕閱讀器也無法識別這些信息，而且這些內容無法自動調整。請改爲將文本放在標記中，並在必要時使用網絡字體以獲得所需的樣式。


### 使用 CSS 替換圖像

現代瀏覽器可以使用 CSS 功能創建之前需要圖像才能實現的樣式。
例如，複雜的漸變可以使用 `background` 屬性創建，陰影可以使用 `box-shadow` 創建，而圓角可以使用 `border-radius` 屬性添加。



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
nisl sed sollicitudin.Fusce placerat, ipsum ac vestibulum porta, purus dolor mollis nunc, pharetra vehicula nulla nunc quis elit.
Duis ornare
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
    

請注意，使用這些技巧需要呈現週期性，這一點在移動設備上非常顯著。
如果過度使用，您會失去您可能已經獲得的好處，而且可能會降低頁面性能。



{# wf_devsite_translation #}
