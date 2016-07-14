---
title: "在您的網站中納入 AdSense 廣告"
description: "請按照這份指南中的步驟，瞭解如何在您的網站中納入廣告。建立 AdSense 帳戶、建立廣告單元、將廣告單元刊登到您的網站，然後設定付款設定，就可輕鬆賺取收益。"
updated_on: 2014-07-31
key-takeaways:
  tldr:
    - 您必須年滿 18 歲且擁有 Google 帳戶和位址，才可建立 AdSense 帳戶。
    - 提交註冊申請之前，您的網站必須已上線運作，而且網站內容必須符合 AdSense 政策。
    - 建立回應式廣告單元，以確保無論使用者使用任何裝置，您的廣告都能符合螢幕大小。
    - 驗證付款設定後，您就可以輕鬆賺取收益了。
notes:
  crawler:
    - 確認您沒有禁止 AdSense 檢索器造訪您的網站 (請參閱<a href="https://support.google.com/adsense/answer/10532">這個說明主題</a>)。
  body:
    - 將所有廣告程式碼貼到正文標記內，否則廣告將無法正常放送。
  smarttag:
    - 您產生的每個廣告都將具有唯一的 <code>data-ad-client</code> 和 <code>data-ad-slot</code>。
    - 在產生的廣告程式碼中，<code>data-ad-format=auto</code> 標記可為回應式廣告單元啟用自動調整大小行為。
---

<p class="intro">
  請按照這份指南中的步驟，瞭解如何在您的網站中納入廣告。建立 AdSense 帳戶、建立廣告單元、將廣告單元刊登到您的網站，然後設定付款設定，就可輕鬆賺取收益。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 建構包含廣告的示例網頁

在這份逐步指南中，您將使用 Google AdSense 和網站開發新手工具包建構包含回應式廣告的簡單網頁：

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="同時在電腦和行動裝置上投放廣告的示例網站">

如果您不熟悉網站開發新手工具包，請參閱[設定網站開發新手工具包]({{site.fundamentals}}/tools/setup/setup_kit.html)文件。

為了將廣告新增到您的網站並賺取收益，您需要按照下面的幾個簡單步驟操作：

1. 建立 AdSense 帳戶。
2. 建立廣告單元。
3. 將廣告單元刊登在網頁上。
4. 設置付款設定。

## 建立 AdSense 帳戶
為了在您的網站上放送廣告，您需要一個有效的 AdSense 帳戶。如果還沒有，請[建立一個](https://www.google.com/adsense/)帳戶，並接受 AdSense 服務條款。建立帳戶時，您需要驗證以下事項：

* 您已年滿 18 歲，且擁有經過驗證的 Google 帳戶。
* 您擁有正常運作的網站或其他線上內容，
且都符合 [Google AdSense 計劃政策](https://support.google.com/adsense/answer/48182)；廣告將由這個網站代管。
* 您擁有與銀行帳戶相關聯的郵政地址和郵寄地址，以確保收到款項。

## 建立廣告單元

廣告單元包含一組廣告，當您為網頁新增 JavaScript 後，廣告單元就會顯示在網頁上。您可以使用下列三個選項調整廣告單元大小：

* **[回應式(建議使用)](https://support.google.com/adsense/answer/3213689)**。
* [預先定義](https://support.google.com/adsense/answer/6002621)。
* [自訂大小](https://support.google.com/adsense/answer/3289364)。

您正在建立回應式網站，因此請使用回應式廣告單元。
回應式廣告會根據裝置大小和上層容器的寬度自動調整大小。
回應式廣告內嵌在回應式版面配置中，藉此確保您的網站在所有裝置上都一樣賞心悅目。

如果您不使用回應式廣告單元，就必須編寫更多程式碼來控制廣告在使用者裝置上的顯示方式。即使您必須指定廣告單元的確切大小，也可以在[進階模式]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough)下使用回應式廣告單元。

為了簡化您的程式碼，並讓您省時省力，回應式廣告程式碼會自動調整廣告單元大小，完全符合您的網頁版面配置。
程式碼會根據廣告單元上層容器的寬度動態計算所需的大小，然後選擇最適合這個容器的廣告大小。
例如，寬度為 360px 且針對行動裝置最佳化的網站可能會顯示 320x50 的廣告單元。

您可以參閱 Google AdSense [廣告大小指南](https://support.google.com/adsense/answer/6002621#top)，追蹤目前[效果最好的廣告大小](https://support.google.com/adsense/answer/6002621#top)。

### 如何建立回應式廣告單元

1. 前往[我的廣告分頁](https://www.google.com/adsense/app#myads-springboard)。
2. 按一下 <strong>+新增廣告單元</strong>。
3. 為您的廣告單元輸入獨特的名稱。這個名稱會顯示在貼到網站內的廣告程式碼中，因此建議您使用描述性名稱。
4. 從「廣告大小」下拉式選單中選擇<strong>回應式</strong>。
5. 從「廣告類型」下拉式選單中選擇<strong>文字和多媒體廣告</strong>。
6. 按一下<strong>儲存並取得程式碼</strong>。
7. 在顯示的<strong>廣告程式碼</strong>方塊中，從「模式」下拉式選單選取<strong>自動調整大小 (建議)</strong> 選項。
這是建議使用的模式，而且您不需要對廣告程式碼做出任何變更。

建立廣告單元後，AdSense 會提供要納入您網站的一段程式碼，類似下方的示例：

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## 在您的網站中納入廣告單元

如要將廣告納入網頁中，我們需要將系統提供的 AdSense 程式碼片段貼到標記中。如果您想納入多個廣告，則可以重複使用同一廣告單元，或建立多個廣告單元。

1. 開啟 `app` 資料夾中的 `index.html`。
2. 將提供的程式碼片段貼到 `main` 標記中。
3. 儲存檔案後，嘗試在瀏覽器中查看，然後再嘗試透過行動裝置或 Chrome 模擬器開啟檔案。

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="同時在電腦和行動裝置上投放廣告的示例網站">
    <br>
    動手做做看
  </a>
</div>

## 設置付款設定

想知道您的 AdSense 付款何時寄達嗎？ 還是想釐清您會在本月還是下個月收到款項？ 請確認您已完成以下所有步驟：

1. 在[受款人資料](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE) 中，確認您已提供了必要的納稅資訊。
2. 確認您的受款人姓名和地址正確無誤。
3. 在[「付款設定」頁面](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS)中選擇您的付款方式。
4. 輸入您的[個人識別碼 (PIN 碼)](https://support.google.com/adsense/answer/157667)。PIN 碼有助驗證您帳號資訊的準確性。
5. 查看您的餘額是否達到[款項起付額度](https://support.google.com/adsense/answer/1709871)。

如有其他問題，請參閱 [AdSense 付款簡介](https://support.google.com/adsense/answer/1709858)。


