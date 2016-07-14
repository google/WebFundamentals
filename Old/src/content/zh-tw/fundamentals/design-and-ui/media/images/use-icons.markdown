---
title: "使用 SVG 格式的圖示"
description: "當您在網頁新增圖示時，請儘可能使用 SVG 圖示 (在某些情況下，也可以使用 unicode 字元)。"
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - 使用 SVG 或 unicode (而非點陣圖片) 做為圖示。
---

<p class="intro">
  當您在網頁新增圖示時，請儘可能使用 SVG 圖示 (在某些情況下，也可以使用 unicode 字元)。
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

##使用 unicode 字元取代簡易圖示

許多字型都支援數量驚人的 unicode 字符，您可以使用這些字符來代替圖片。與圖片不同的是，unicode 字型縮放自如，無論多大多小，在螢幕上都可清晰可見。

除了正常的字元集，unicode 還包括數字型式的符號 (&#8528;)、箭頭符號 (&#8592;)、數學運算子 (&#8730;)、幾何圖形符號 (&#9733;)、控制項圖片符號 (&#9654;)、點字模式符號 (&#10255;)、音符 (&#9836;)、希臘字母 (&#937;)，甚至是西洋棋符號 (&#9822;)。

新增 unicode 字元的方式與新增命名實體的方式相同：`&#XXXX`，其中 `XXXX` 表示 unicode 字元的編號。舉例來說：

{% highlight html %}
您是超級巨 &#9733;
{% endhighlight %}

您是超級巨 &#9733;

## 使用 SVG 取代複雜的圖示
如果系統對圖示的要求較複雜，建議您使用 SVG 圖示，因為這類圖示大多輕巧靈活、容易使用而且還可以透過 CSS 變換樣式。與點陣圖片相比，SVG 佔有許多優勢：

* SVG 是可無限縮放的向量圖形。
* CSS 效果 (例如顏色、陰影、透明度和動畫) 設定十分簡單。
* SVG 圖片可直接嵌入文件中。
* SVG 具備語意特性。
* 使用適當的屬性提供更佳的協助工具。

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## 謹慎使用圖示字型

圖示字型廣受歡迎而且容易使用，但是與 SVG 圖示相比，圖示字型具有下列缺點。

* 圖示字型是可以無限縮放的向量圖形，但可能因為平滑化設定導致圖示的清晰度低於預期水準。
* 只可使用少數的 CSS 設定樣式。
* 取決於行高、字母間隙等因素，可能難以準確定位像素。
* 不具備語意特性，因此很難與螢幕閱讀器或其他輔助技術搭配使用。
* 除非明確設定範圍，不然為了一小部分圖示，可能會產生龐大的檔案。


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="使用 FontAwesome 字型圖示的網頁示例。">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

目前可用的免費及付費圖示字型多達數百種，其中包括 [Font Awesome](http://fortawesome.github.io/Font-Awesome/)、[Pictos](http://pictos.cc/) 和 [Glyphicons](http://glyphicons.com/)。

使用圖示時，請考量額外產生的 HTTP 請求和檔案大小，務必保持兩全其美。舉例來說，如果您只需要幾個圖示，那麼最好使用一個圖片或是一個圖片拼貼檔案下載所需的圖示。



