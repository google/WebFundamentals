---
title: "取得使用者目前的位置"
description: "GeoLocation API 可以讓您找到使用者所在，但一律要取得使用者同意。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - 使用 API 之前，請先檢查相容性。
    - 捨較精細的位置，而就更粗略的位置。
    - 一律處理錯誤。
    - 別太頻繁輪詢資料，以節省使用者電力。
---

<p class="intro">
  GeoLocation API 可以讓您找到使用者所在，但一律要取得使用者同意。 此功能可用於使用者查詢的一部分，例如導引某人到達目的地。 它可能也會用於「地理標記」使用者已建立的內容，例如標記照片的拍攝地點。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

API 無視裝置類型；它不管瀏覽器如何判斷位置，
只要用戶端可以標準方式要求和接收位置資料。
 底層機制可能是透過 GPS、Wi-Fi 運作，
或只要要求使用者手動輸入他們的位置。 因為任何查詢都要花些時間，
所以 API 為非同步；每當您要求一個位置，就會傳遞給它一個回呼方法。


## 使用地理位置的時機

*  找出使用者在何處最接近您的一個實體位置，
以量身訂做使用者體驗。
*  針對使用者位置量身訂做資訊 (例如新聞)。
*  在地圖上顯示使用者的位置。
*  以使用者位置標記您應用程式建立的資料
  (也就是說地理標記一張圖片)。


## 查看相容性

現在大部分的瀏覽器均支援 GeoLocation API，
但在進行之前最好先查看是否支援，這才是好習慣。

您可以測試地理位置物件是否存在，
以輕易查看相容性：

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## 判斷使用者的目前位置

GeoLocation API 提供了一個簡單的「一次性」
方法來取得使用者位置`getCurrentPosition()`。  呼叫此方法可非同步回報使用者的目前位置。


{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

如果這是此網域的應用程式首次要求這項權限，
瀏覽器通常會查看使用者的同意。 視瀏覽器而定，偏好設定可能為一律允許或不允許權限查詢，
在這種情況下則會略過確認程序。


根據您瀏覽器使用的定位裝置而定，
位置物件可能包含不僅是緯度和經度，例如還可能包含海拔高度或方向。  在定位系統傳回資料之前，您無法知道該系統將使用什麼額外資訊。

## 以您的網站測試地理位置

當在應用程式中使用 HTML5 支援時，
以不同的經緯值來除錯收到的輸出資料，非常實用。


DevTools 會針對無法透過覆寫功能表提供的 navigator.geolocation 與模擬地理位置，
支援所有兩個覆寫位置值。

<img src="images/emulategeolocation.png">

1. 在 DevTools 中開啟覆寫功能表。
2. 查看「Override Geolocation」所在，並輸入 Lat = 41.4949819 和 Lon = -0.1461206。
3. 重新整理頁面，它現在將針對地理位置使用您被覆寫的位置。

## 一律處理錯誤

遺憾的是，並不是所有位置查詢都會成功。 或許是無法找到 GPS，
或使用者突然停用位置查詢。 發生錯誤時，
會呼叫 `getCurrentPosition()` 的第二個選用引數，
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
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## 降低啟動地理位置硬體的必要性

就許多使用案例而言，您不需要使用使用者的最新位置，
您只需要一個粗略估計值。

使用 `maximumAge` 選用屬性以要求瀏覽器使用最近取得的地理位置結果。
  如果使用者在資料阻止瀏覽器必須啟動其地理位置硬體介面 (例如 Wi-Fi 三角定位或 GPS) 之前已要求資料，
這種方式會回傳更快。


{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
  	maximumAge: 5 * 60 * 1000,
  }

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

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## 別讓使用者等待，要設定逾時。

別讓使用者等待，要設定逾時。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## 捨較精細的位置，而就更粗略的位置。

如果您想要找到離使用者最近的商店，
那可能不需要 1 公尺精度才能辦到。  API 設計可以提供
可儘快傳回的粗略位置。

如果您確實需要高精度，
是可以 `enableHighAccuracy` 選項來覆寫預設設定。  請保守使用這項功能：不但解析速度慢，
電力也用得更多。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}


