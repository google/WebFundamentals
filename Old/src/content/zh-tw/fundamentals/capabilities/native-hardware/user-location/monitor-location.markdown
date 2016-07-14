---
title: "監視使用者位置"
description: "GeoLocation API 可讓您監看使用者身處何處，並在他們移動的同時密切注意他們，但一律要獲得使用者同意。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 使用 API 之前，請先檢查相容性。
    - 儘量降低監看使用者位置的次數，以節省電池。
    - 一律處理錯誤。
---

<p class="intro">
  GeoLocation API 可讓您監看使用者身處何處，並在他們移動的同時密切注意他們，但一律要獲得使用者同意。
</p>

{% include shared/toc.liquid %}

API 無視裝置類型；它不管瀏覽器如何判斷位置，
只要用戶端可以標準方式要求和接收位置資料。
 底層機制可能是透過 GPS、Wi-Fi 運作。 因為任何查詢都要花些時間，所以 API 為非同步；每當您要求一個位置，
就會傳遞給它一個回呼方法。


{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## 使用地理位置以監看使用者位置的時機

* 您想要更精確鎖定使用者位置。
* 您的應用程式需要根據新位置資訊，
以更新 UI。
* 當使用者進入特定定義區域，
您的應用程式即需要更新業務邏輯。

## 監看使用者位置

GeoLocation API 
允許您以對 `getCurrentPosition()` 的單一呼叫，取得使用者的位置 (使用者同意之下)。  

如果您想要持續監視使用者的位置，
GeoLocation API 提供一種稱為 `watchPosition()` 的方法。 它用類似方式
以 `getCurrentPosition()`，但當定位軟體在以下情況下，它會觸發多次：


1.  更精確鎖定使用者。
2.  使用者的位置變更。
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## 總是清理和節省電池

監看地理位置變化並非可自由操作。  雖然作業系統可能會導入平台功能，
以讓應用程式連結地理子系統，但身為網頁開發人員的您，
不會知道使用者裝置有何支援功能可以監視使用者位置。
而且當您正在監看一位置時，
會讓裝置承受許多處理負載

一旦您無需追蹤使用者的位置時，呼叫 `clearWatch` 以關閉地理位置系統。


## 一律處理錯誤。

遺憾的是，並不是所有位置查詢都會成功。 或許是無法找到 GPS，
或使用者突然停用位置查詢。 發生錯誤時，
會呼叫 getCurrentPosition() 的第二個選用引數，
這樣您就可以在回呼中通知使用者：

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


