project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 大多數瀏覽器和裝置可以存取使用者的地理位置。 學習如何在您網站和應用程式中善用使用者位置。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 使用者位置 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



GeoLocation API 可以讓您知道使用者所在，但一律要獲得使用者同意。 此功能也可用於使用者查詢的一部分，例如引導某人到達目標點。 它也可以用於「地理標記 使用者已建立的某些內容， 例如標記照片拍攝的地點。

GeoLocation API  還可讓您觀看使用者所在地點，並在他們移動時加上標籤，但一律要獲得使用者同意 (同時只有在頁面開啟時才可以)，
這開啟了很多有趣的使用案例 - 例如與後端系統整合，以在使用者接近時，先準備好供使用者收藏的訂單。

使用 GeoLocation API 時，您有很多事情必須注意，本指南將逐步引導您完成常見的使用案例和解決方案。



## 讓使用者同意位置共用 




身為網頁程式開發人員，存取使用者的位置可容許更多可能性，例如進階篩選、在地圖上精確定位使用者，以及根據使用者的目前位置，針對其所能做的事，提供主動建議。

身為使用者，您的實體位置是應該保護的資訊，
只能提供給您信任的人。  這就是為什麼瀏覽器會在網站詢問您位置時顯示提示。



最近的使用者研究顯示，<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf"></a>
對於在頁面載入時要求提供他們位置的網站，使用者會不信任。
 因此最佳做法為何？

### TL;DR {: .hide-from-toc }
- 假設使用者不會提供您他們的位置。
- 闡明您為什麼需要存取使用者位置。
- 闡明您為什麼需要存取使用者位置。


### 假設使用者將不會提供您他們的位置。

這可能很痛苦，但您的許多使用者不會想提供您他們的位置，
因此您需要採取一種防禦性的開發風格。

1.  處理掉 GeoLocation API 中的所有錯誤，
以便您可以針對這個情況調整您的網站。
2.  針對您對位置的需求，要表達清楚和明確。
3.  如果必要，請使用遞補解決方案。

### 若需要地理位置，請使用遞補

我們的建議不在於讓您的網站或應用程式，
綁死於要求存取使用者目前位置的方案，
但如果您的應用程式或網站有此需求，
目前有第三方解決方案可讓您取得使用者目前位置的最佳猜測。

這些解決方案的運作方式，
通常是查看使用者 IP，並將之對應至 RIPE 資料庫註冊的實體地址。  這些位置往往不是很精確，
通常只能給您離使用者最近的電訊集線器或手機基地塔的位置。
  在許多情況下，這些位置不怎麼精確，
特別是使用者在 VPN 或某個其他 Proxy 服務上時。


### 請一律在使用者示意的情況下，才要求存取位置

請確保使用者瞭解您要求其位置的原因，
以及對他們有什麼好處。  在網站載入結果時立即在首頁上要求此資訊，
會形成差勁的使用者經驗。

<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>DO</b>: Always request access to location on a user gesture.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>DON'T</b>: Ask for it immediately on the homepage as the site loads; it results in a poor user experience.
    </figcaption>
  </figure>
</div>

反之，您應該給使用者明確的動作請求或指示，
說明操作將需要存取他們的位置。  然後，
使用者將能更輕鬆地關聯系統存取提示和剛剛起始的動作。


### 給予明確指示，說明動作將要求他們的位置

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">由 Google Ads 團隊所做的研究中</a>，在特定旅館網站上，當使用者針對即將召開的會議被要求預定波士頓的旅館房間時，在首頁點選「尋找與預約」行動要求之後，會立即被提示分享其 GPS 位置。

在某些情況下，使用者難以理解當想要預訂波士頓的房間時，
會顯示舊金山的旅館，因此產生失望的感覺。


比較好的使用經驗是，
確保使用者能夠理解您要求他們位置的原因。 加入一個跨裝置常見的知名表示程式 (signifier)，
例如測距程式。

<img src="images/indication.png">

或考慮採用非常明確的行動要求，例如「在我附近尋找」。

<img src="images/nearme.png">

### 稍微勸說使用者授與其位置的權限

您不能存取使用者正在做的任何步驟。  您可以明確知道使用者何時不容許其位置存取，
但不知道何時授與您存取；只有當出現結果時，您才知道已取得存取權。


如果您需要使用者完成行動，「取悅」使用者以採取行動，這是不錯的方法。

我們建議： 

1.  設定會在短期內觸發的計時器 -- 5 秒是不錯的建議值。
2.  如果您得到錯誤訊息，請對使用者顯示訊息。
3.  如果您得到正面回應，停用計時器並處理結果。
4.  如果逾時後，您還沒有得到正面回應，向使用者顯示通知。
5.  如果回應在稍後才進來，而該通知仍然存在，將之從螢幕上移除。


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
    



## 取得使用者目前的位置 




GeoLocation API 可以讓您找到使用者所在，但一律要取得使用者同意。 此功能可用於使用者查詢的一部分，例如導引某人到達目的地。 它可能也會用於「地理標記」使用者已建立的內容，例如標記照片的拍攝地點。


### TL;DR {: .hide-from-toc }
- 使用 API 之前，請先檢查相容性。
- 捨較精細的位置，而就更粗略的位置。
- 一律處理錯誤。
- 別太頻繁輪詢資料，以節省使用者電力。


API 無視裝置類型；它不管瀏覽器如何判斷位置，
只要用戶端可以標準方式要求和接收位置資料。
 底層機制可能是透過 GPS、Wi-Fi 運作，
或只要要求使用者手動輸入他們的位置。 因為任何查詢都要花些時間，
所以 API 為非同步；每當您要求一個位置，就會傳遞給它一個回呼方法。


### 使用地理位置的時機

*  找出使用者在何處最接近您的一個實體位置，
以量身訂做使用者體驗。
*  針對使用者位置量身訂做資訊 (例如新聞)。
*  在地圖上顯示使用者的位置。
*  以使用者位置標記您應用程式建立的資料
  (也就是說地理標記一張圖片)。


### 查看相容性

現在大部分的瀏覽器均支援 GeoLocation API，
但在進行之前最好先查看是否支援，這才是好習慣。

您可以測試地理位置物件是否存在，
以輕易查看相容性：


    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    

### 判斷使用者的目前位置

GeoLocation API 提供了一個簡單的「一次性」
方法來取得使用者位置`getCurrentPosition()`。  呼叫此方法可非同步回報使用者的目前位置。



    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
    

如果這是此網域的應用程式首次要求這項權限，
瀏覽器通常會查看使用者的同意。 視瀏覽器而定，偏好設定可能為一律允許或不允許權限查詢，
在這種情況下則會略過確認程序。


根據您瀏覽器使用的定位裝置而定，
位置物件可能包含不僅是緯度和經度，例如還可能包含海拔高度或方向。  在定位系統傳回資料之前，您無法知道該系統將使用什麼額外資訊。

### 以您的網站測試地理位置

當在應用程式中使用 HTML5 支援時，
以不同的經緯值來除錯收到的輸出資料，非常實用。


DevTools 會針對無法透過覆寫功能表提供的 navigator.geolocation 與模擬地理位置，
支援所有兩個覆寫位置值。

<img src="images/emulategeolocation.png">

1. 在 DevTools 中開啟覆寫功能表。
2. 查看「Override Geolocation」所在，並輸入 Lat = 41.4949819 和 Lon = -0.1461206。
3. 重新整理頁面，它現在將針對地理位置使用您被覆寫的位置。

### 一律處理錯誤

遺憾的是，並不是所有位置查詢都會成功。 或許是無法找到 GPS，
或使用者突然停用位置查詢。 發生錯誤時，
會呼叫 `getCurrentPosition()` 的第二個選用引數，
這樣您就可以在回呼中通知使用者：


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
    

### 降低啟動地理位置硬體的必要性

就許多使用案例而言，您不需要使用使用者的最新位置，
您只需要一個粗略估計值。

使用 `maximumAge` 選用屬性以要求瀏覽器使用最近取得的地理位置結果。
  如果使用者在資料阻止瀏覽器必須啟動其地理位置硬體介面 (例如 Wi-Fi 三角定位或 GPS) 之前已要求資料，
這種方式會回傳更快。



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
    

### 別讓使用者等待，要設定逾時。

別讓使用者等待，要設定逾時。


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
    

### 捨較精細的位置，而就更粗略的位置。

如果您想要找到離使用者最近的商店，
那可能不需要 1 公尺精度才能辦到。  API 設計可以提供
可儘快傳回的粗略位置。

如果您確實需要高精度，
是可以 `enableHighAccuracy` 選項來覆寫預設設定。  請保守使用這項功能：不但解析速度慢，
電力也用得更多。


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
    




## 監視使用者位置 




GeoLocation API 可讓您監看使用者身處何處，並在他們移動的同時密切注意他們，但一律要獲得使用者同意。


API 無視裝置類型；它不管瀏覽器如何判斷位置，
只要用戶端可以標準方式要求和接收位置資料。
 底層機制可能是透過 GPS、Wi-Fi 運作。 因為任何查詢都要花些時間，所以 API 為非同步；每當您要求一個位置，
就會傳遞給它一個回呼方法。


### TL;DR {: .hide-from-toc }
- 使用 API 之前，請先檢查相容性。
- 儘量降低監看使用者位置的次數，以節省電池。
- 一律處理錯誤。


### 使用地理位置以監看使用者位置的時機

* 您想要更精確鎖定使用者位置。
* 您的應用程式需要根據新位置資訊，
以更新 UI。
* 當使用者進入特定定義區域，
您的應用程式即需要更新業務邏輯。

### 監看使用者位置

GeoLocation API 
允許您以對 `getCurrentPosition()` 的單一呼叫，取得使用者的位置 (使用者同意之下)。  

如果您想要持續監視使用者的位置，
GeoLocation API 提供一種稱為 `watchPosition()` 的方法。 它用類似方式
以 `getCurrentPosition()`，但當定位軟體在以下情況下，它會觸發多次：


1.  更精確鎖定使用者。
2.  使用者的位置變更。
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });
    

### 總是清理和節省電池

監看地理位置變化並非可自由操作。  雖然作業系統可能會導入平台功能，
以讓應用程式連結地理子系統，但身為網頁開發人員的您，
不會知道使用者裝置有何支援功能可以監視使用者位置。
而且當您正在監看一位置時，
會讓裝置承受許多處理負載

一旦您無需追蹤使用者的位置時，呼叫 `clearWatch` 以關閉地理位置系統。


### 一律處理錯誤。

遺憾的是，並不是所有位置查詢都會成功。 或許是無法找到 GPS，
或使用者突然停用位置查詢。 發生錯誤時，
會呼叫 getCurrentPosition() 的第二個選用引數，
這樣您就可以在回呼中通知使用者：


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
    


