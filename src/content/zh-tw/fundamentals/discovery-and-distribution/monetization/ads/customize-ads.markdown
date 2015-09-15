---
title: "自訂廣告"
description: "出色的廣告可以改善使用者體驗。雖然廣告的實際內容由廣告客戶提供，但您仍然可以控制廣告的內容類型、顏色、大小和刊登位置。"
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - 請勿將廣告刊登在可能會干擾使用者體驗網站內容的位置；同時請確認位於不需捲動位置的廣告不會將重要內容向下擠。
    - 務必使用回應式廣告單元；如果自動調整大小功能無法滿足您的需求，請切換至進階模式。
    - 儘可能讓廣告穿插於內容之間，以免使用者對廣告視而不見。
    - 選擇與您的網站互相融合、互補或形成對比的文字樣式。
notes:
  targeting:
    - 根據網站整體內容 (而非關鍵字或類別) 指定廣告。如果您想顯示與特定主題相關的廣告，請新增與這些主題相關的完整句子和段落。
  testing:
    - 務必在不同的裝置和螢幕上測試廣告，以確認回應行為可正常發揮作用。
  images:
    - 廣告客戶可完全掌控多媒體廣告的呈現效果。您可以使用廣告刊登位置和自動調整大小功能，稍微篩選網站中所顯示的多媒體廣告類型，但您並無法實際控制圖片內容。
---

<p class="intro">
  出色的廣告可以改善使用者體驗。雖然廣告的實際內容由廣告客戶提供，但您仍然可以控制廣告的內容類型、顏色、大小和刊登位置。
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 將廣告刊登在對使用者最有利的位置

當您要決定廣告在網站上的刊登位置和
要新增的廣告數量時，請務必將使用者放在第一位！

* 使用廣告來襯托網站內容，而不是本末倒置。
* 頁面中廣告數量過多、廣告將重要內容向下推至需捲動位置、因廣告聚集在一起而佔用可視空間，或者廣告沒有明確標籤都會導致使用者滿意度降低，而且也違反了 AdSense 政策。
* 確保廣告可為使用者提供價值。如果您的廣告單元帶來的收益、點擊次數或瀏覽量非常少，很可能是這些廣告並沒有為使用者提供出色的價值。

行動廣告的刊登位置選項示例：

<img src="images/mobile_ads_placement.png" class="center" alt="行動圖片廣告示例">

詳情請參閱 AdSense 
[廣告刊登位置最佳做法](https://support.google.com/adsense/answer/1282097)。


## 如果回應式調整大小功能無法滿足您的需求，該怎麼辦？
在某些情況下，您可能需要進一步掌控廣告的展示方式，而不只是使用回應式廣告。在這種情況下，您可以切換至進階模式，並覆寫回應式廣告單元程式碼中的自動調整大小功能。
舉例來說，您可以使用[媒體查詢]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html)精確控制廣告大小：

1. 請按照相關說明[建立回應式廣告單元]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units)。
2. 在 [廣告程式碼] 方塊中，從「模式」下拉式選單中選擇 [進階 (需要修改程式碼)]<strong></strong>。
3. 修改廣告程式碼，以便根據使用者裝置設定精確的廣告大小：

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  動手做做看
{% endlink_sample %}

詳情請參閱 AdSense 說明中心的[進階功能](https://support.google.com/adsense/answer/3543893)。

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## 選擇與網站互補的樣式

[最成功的廣告](https://support.google.com/adsense/answer/17957)通常都會與網站樣式融合或形成對比。Google AdSense 提供一系列的[預先定義廣告樣式](https://support.google.com/adsense/answer/6002585)；請選擇最適合您網站的樣式或建立自訂廣告樣式。

### 可自行設定的樣式

您可以針對文字廣告自行設定下列任何樣式：

* 邊框顏色
* 背景顏色
文字字型系列和字型大小
* 預設文字顏色
* 廣告標題專用的文字顏色
* 網址專用的文字顏色

### 如何套用樣式

建立新廣告單元時，您可以展開<strong>文字廣告樣式</strong>屬性來為文字廣告套用其他樣式：

<img src="images/customize.png" class="center" alt="文字廣告樣式">

所有的文字廣告都會使用 Google AdSense 的<strong>預設</strong>樣式。您可以直接使用任何一種預先定義樣式、對預先定義樣式稍做修改，或建立自訂樣式。

儲存新樣式後，您就可將這些樣式套用到任何現有或 
新增的廣告單元：

1. 導覽至[廣告樣式](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES)。
2. 從<strong>適用於您正在使用的所有產品的廣告樣式</strong>清單中選擇您想變更的廣告樣式。
3. 變更後，即可<strong>儲存廣告樣式</strong>。

變更現有廣告樣式時，所有套用該樣式的有效廣告單元都會自動更新。

{% include shared/remember.liquid title="Note" list=page.notes.images %}


