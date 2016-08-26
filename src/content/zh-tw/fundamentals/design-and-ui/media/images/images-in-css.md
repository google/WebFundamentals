project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: CSS `background` 屬性是功能強大的工具，可讓您將複雜的圖片新增到元素中，也可輕鬆新增多個圖片及重複顯示等。

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# CSS 圖片 {: .page-title }

{% include "_shared/contributors/TODO.html" %}



CSS `background` 屬性是功能強大的工具，可讓您將複雜的圖片新增到元素中，也可輕鬆新增多個圖片及重複顯示等。搭配媒體查詢使用時，「background」屬性的功效更大，系統會依據螢幕大小、檢視區大小等因素適時載入圖片。



## TL;DR {: .hide-from-toc }
- 針對顯示器的特性選用最佳圖片時，請考量螢幕大小、裝置解析度和網頁版面配置。
- 使用包含 <code>min-resolution</code> 和 <code>-webkit-min-device-pixel-ratio</code> 的媒體查詢，變更 CSS 中的 <code>background-image</code> 屬性後，即可用於高 DPI 顯示器。
- 除了標記中的 1x 圖片，還可使用 srcset 提供高解析度圖片。
- 使用 JavaScript 圖片取代技術，或者將經過高度壓縮的高解析度圖片放送到解析度較低的裝置時，請考量這麼做對於成效的影響。


## 針對條件式圖片載入或美學指導使用媒體查詢

媒體查詢不只會影響網頁版面配置，也可用來依據檢視區寬度的特定條件載入圖片，或者提供美學指導。

就下列的例子來說，在較小的螢幕上只會下載 `small.png` 並套用到內容 `div`，但是在較大的螢幕上，`background-image: url(body.png)` 會套用到內文，而 `background-image: url(large.png)` 會套用到內容 `div`。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/conditional-mq.html" region_tag="conditional" lang=css %}
</pre>

## 使用 image-set 提供高解析度圖片

CSS 中的 `image-set()` 函式可提升 `background` 屬性的行為，讓您輕鬆依據不同的裝置特性提供多個圖片檔案。這可讓瀏覽器依據裝置特性選擇最合適的圖片。舉例來說，在 2 倍大的螢幕上使用 2 倍大的圖片，或者當網路頻寬有限時，在 2 倍大的裝置上使用 1 倍大的圖片。


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

除了載入正確的圖片以外，瀏覽器也可以
視需要縮放。換句話說，瀏覽器會假設 2 倍大的圖片是 1 倍大圖片的兩倍，因此會將縮小兩倍，讓圖片與網站上看來一樣大。

`image-set()` 支援功能推出不久，目前只在具有 `-webkit` 供應商前置字元的 Chrome 和 Safari 的提供支援。在 `image-set()` 不受支援的情況下，如果您要納入備用圖片，請務必特別留意。舉例來說：

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/image-set.html" region_tag="imageset" lang=css %}
</pre>

上述示例將會在支援 image-set 的瀏覽器中載入適當的資產。如果瀏覽器不支援 image-set，就會選用備用的 1 倍大資產。特別需要留意的是，當瀏覽器無法充分支援 `image-set()` 時，大多數的瀏覽器會選用 1 倍大資產。

## 使用媒體查詢以提供高解析度圖片或美學指導

媒體查詢可以依據[裝置像素比](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)建立規則，方便您針對 2 倍大和 1 倍大的螢幕指定不同的圖片。


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome、Firefox 和 Opera 都支援標準的 `(min-resolution: 2dppx)`，而 Safari 和 Android 瀏覽器則需要沒有 `dppx` 單位的舊版供應商前置字元語法。請注意，只有當裝置符合媒體查詢條件時，才會載入這些樣式，而且您必須指定基本情況要套用的樣式。這麼做的好處是確保即使瀏覽器不支援指定解析度的媒體查詢，還是會顯示圖片。

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/media-query-dppx.html" region_tag="mqdppx" lang=css %}
</pre>

您也可以使用 min-width 語法，依據檢視區大小顯示替代圖片。這個技巧的優點就是：當媒體查詢找不到相符的結果時，就不會下載圖片。舉例來說，只有當瀏覽器的寬度為 500px 以上，才會下載 `bg.png` 並套用到 `body`。


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    	



