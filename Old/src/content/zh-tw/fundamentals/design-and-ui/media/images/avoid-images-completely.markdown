---
title: "請勿使用圖片"
description: "有時候，最棒的圖片可能根本不是圖片。請儘可能使用瀏覽器內建功能提供相同或相似的功能。"
updated_on: 2014-06-10
key-takeaways:
  避免-images:
    - 儘量避免使用圖片，請善用瀏覽器的功能，為網頁加上陰影、漸層、圓角等效果。
---

<p class="intro">
  有時候，最棒的圖片可能根本不是圖片。請儘可能使用瀏覽器內建功能提供相同或相似的功能。以往必須仰賴圖片的部分，現在瀏覽器都可產生美觀的視覺效果。這表示瀏覽器不再需要另行下載圖片檔案，也不會再出現縮放後完全走樣的圖片。您可以使用 unicode 或特殊的圖示字型顯示圖示。
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## 將文字放在標記中，而不是嵌入圖片

請儘量讓文字保持原始狀態，而不要嵌入圖片，例如使用圖片作為標題，或將電話號碼或地址等聯絡資訊直接放在圖片中。這麼做會阻礙使用者複製並貼上資訊，導致螢幕閱讀器無法剖析資訊，回應成效也會因此降低。要避免這類情形，請將文字放在標記中。如有需要，請使用網路字型呈現您想要的樣式。

## 使用 CSS 取代圖片

現代瀏覽器都可使用 CSS 功能建立樣式，取代以往需要圖片的限制。舉例來說，您可使用 <code>background</code> 屬性建立複雜的漸層，使用 <code>box-shadow</code> 建立陰影，以及使用 <code>border-radius</code> 屬性新增圓角。

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

請注意，使用這些技巧時需要經過轉譯循環，這對於行動裝置而言非常吃重。如果過度使用，您可能會得不償失，效能也會大打折扣。



