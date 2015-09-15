---
title: "按一下撥號"
description: "在具有電話功能的裝置上，方便使用者可輕易點選電話號碼，即可直接與您連線，通常稱為按一下撥號。"
updated_on: 2014-10-21
key-takeaways:
  c2c: 
    - 以 <code>tel:</code> 結構描述，將所有電話號碼都包裝在超連結裡。
    -  一律使用國際撥號格式。
comments:
  # 注意：如果章節標題或 URL 變更，以下短連結必須更新
  - g.co/mobilesiteprinciple12
---

<p class="intro">
  在具有電話功能的裝置上，方便使用者可輕易點選電話號碼，即可直接與您連線，通常稱為按一下撥號。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.c2c %}

## 針對按一下撥號，連結電話號碼

雖然許多最新行動瀏覽器會自動偵測電話號碼，並將它們轉換為連結，
但最好還是直接在您程式碼中為之。
通過手動方式將每個電話號碼標籤化，
您可以確保電話號碼能啟用按一下撥號，而樣式也符合您的網站。

要將電話號標記為連結，請使用 `tel:` 結構描述。  語法
很簡單：

{% highlight html %}
NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>
{% endhighlight %}

結果為以下：

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<img src="images/click-to-call_framed.jpg" class="center" alt="按一下撥號範例。">

在具有電話功能的大多數裝置上，
撥號之前，使用者將收到確認，
以確保使用者不會被拐騙撥號昂貴的長途或付費加值電話號碼。 
當裝置不支援電話撥號時，會呈現功能表給使用者，
允許他們選擇瀏覽器應如何處理該號碼。

不支援語音撥號的桌面瀏覽器將開啟電腦上的預設電話應用程式，
例如 Google Voice 或 Microsoft Communicator。


## 使用國際撥號格式

請一律使用國際撥號格式，以提供電話號碼： 
加號 (+)、國碼、區碼和電話號碼。  當非完全必要時，
最好將號碼的每一區段都以連字號 (-) 分隔，
以方便閱讀與自動偵測。

使用加連字號的國際撥號格式可以確保，無論使用者的撥號來源地點
 -- 無論是數百米或數千公里之外 -- 
撥號都能連線。

## 必要時停用自動偵測

最新的行動瀏覽器會自動偵測電話號碼，
並啟用按一下撥號。  Mobile Safari 會以相關的超連結樣式，
自動轉換電話號碼為連結。  Android 版 Chrome 會自動偵測電話號碼，
並允許使用者按一下撥號，但並不會將它們包裝在超連結中，
或是套用任何特殊樣式。

若要防止 Mobile Safari 自動偵測電話號碼，
新增以下中繼標籤至頁面的頂部：

{% highlight html %}
<meta name="format-detection" content="telephone=no">
{% endhighlight %}

## 其他按一下撥號功能

除了 `tel:`  結構描述，一些最新的瀏覽器也支援 `sms:`
 和 `mms:` 結構描述，
不過其支援並不一致，而像設定訊息本文等某些功能並不一定管用。  

