---
title: "讓使用者同意位置共用"
description: ""
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 假設使用者不會提供您他們的位置。
    - 闡明您為什麼需要存取使用者位置。
    - 闡明您為什麼需要存取使用者位置。
comments:
  # 注意：如果章節標題或 URL 變更，以下短連結必須更新
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  身為網頁程式開發人員，存取使用者的位置可容許更多可能性，例如進階篩選、在地圖上精確定位使用者，以及根據使用者的目前位置，針對其所能做的事，提供主動建議。
</p>

身為使用者，您的實體位置是應該保護的資訊，
只能提供給您信任的人。  這就是為什麼瀏覽器會在網站詢問您位置時顯示提示。


{% include shared/toc.liquid %}

最近的使用者研究顯示，<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf"></a>
對於在頁面載入時要求提供他們位置的網站，使用者會不信任。
 因此最佳做法為何？

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## 假設使用者將不會提供您他們的位置。

這可能很痛苦，但您的許多使用者不會想提供您他們的位置，
因此您需要採取一種防禦性的開發風格。

1.  處理掉 GeoLocation API 中的所有錯誤，
以便您可以針對這個情況調整您的網站。
2.  針對您對位置的需求，要表達清楚和明確。
3.  如果必要，請使用遞補解決方案。

## 若需要地理位置，請使用遞補

我們的建議不在於讓您的網站或應用程式，
綁死於要求存取使用者目前位置的方案，
但如果您的應用程式或網站有此需求，
目前有第三方解決方案可讓您取得使用者目前位置的最佳猜測。

這些解決方案的運作方式，
通常是查看使用者 IP，並將之對應至 RIPE 資料庫註冊的實體地址。  這些位置往往不是很精確，
通常只能給您離使用者最近的電訊集線器或手機基地塔的位置。
  在許多情況下，這些位置不怎麼精確，
特別是使用者在 VPN 或某個其他 Proxy 服務上時。


## 請一律在使用者示意的情況下，才要求存取位置

請確保使用者瞭解您要求其位置的原因，
以及對他們有什麼好處。  在網站載入結果時立即在首頁上要求此資訊，
會形成差勁的使用者經驗。

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>在網站載入結果時立即在首頁上要求此資訊，會形成差勁的使用者經驗。</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption>請一律在使用者示意的情況下，才要求存取位置。</figcaption>
      </figure>
  </div>
</div>

反之，您應該給使用者明確的動作請求或指示，
說明操作將需要存取他們的位置。  然後，
使用者將能更輕鬆地關聯系統存取提示和剛剛起始的動作。


## 給予明確指示，說明動作將要求他們的位置

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">由 Google Ads 團隊所做的研究中</a>，在特定旅館網站上，當使用者針對即將召開的會議被要求預定波士頓的旅館房間時，在首頁點選「尋找與預約」行動要求之後，會立即被提示分享其 GPS 位置。

在某些情況下，使用者難以理解當想要預訂波士頓的房間時，
會顯示舊金山的旅館，因此產生失望的感覺。


比較好的使用經驗是，
確保使用者能夠理解您要求他們位置的原因。 加入一個跨裝置常見的知名表示程式 (signifier)，
例如測距程式。

<img src="images/indication.png">

或考慮採用非常明確的行動要求，例如「在我附近尋找」。

<img src="images/nearme.png">

## 稍微勸說使用者授與其位置的權限

您不能存取使用者正在做的任何步驟。  您可以明確知道使用者何時不容許其位置存取，
但不知道何時授與您存取；只有當出現結果時，您才知道已取得存取權。


如果您需要使用者完成行動，「取悅」使用者以採取行動，這是不錯的方法。

我們建議： 

1.  設定會在短期內觸發的計時器 -- 5 秒是不錯的建議值。
2.  如果您得到錯誤訊息，請對使用者顯示訊息。
3.  如果您得到正面回應，停用計時器並處理結果。
4.  如果逾時後，您還沒有得到正面回應，向使用者顯示通知。
5.  如果回應在稍後才進來，而該通知仍然存在，將之從螢幕上移除。

{% highlight javascript %}
button.onclick = function() {
  var startPos;
  var element = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId); 

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

