project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:大多數瀏覽器都可訪問用戶的攝像頭。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# 採集用戶的圖像 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

許多瀏覽器現在都能訪問用戶的視頻和音頻輸入。
不過，根據瀏覽器的不同，這一功能可能體現爲一種全動態的內置體驗，也可能通過授權給用戶設備上的其他應用來實現。


## 從簡單做起，循序漸進

最簡易的做法是直接要求用戶提供預先錄製的文件。
其實現步驟是：創建一個簡單的文件輸入元素，然後添加一個表示我們只能接受圖像文件的 `accept` 過濾器，在理想的情況下，我們可以直接從攝像頭獲取這些文件。



    <input type="file" accept="image/*" capture>

此方法在所有平臺上都有效。在桌面平臺上，它會提示用戶通過文件系統上傳圖像文件。
在 iOS 上的 Safari 中，此方法會打開攝像頭應用以便您採集圖像，然後將其傳回網頁；在 Android 上，此方法允許用戶選擇使用哪一個應用來採集圖像，採集完畢後將其傳回網頁。





然後可將數據附加到一個 `<form>`，或通過 JavaScript 操作數據：偵聽 input 元素上的 `onchange` 事件，然後讀取事件 `target` 的 `files` 屬性。



### 採集單個幀

獲得對圖像文件的訪問權很簡單。

    <input type="file" accept="image/*" capture="camera" id="camera">
    <img id="frame">
    <script>
      var camera = document.getElementById('camera');
      var frame = document.getElementById('frame');

      camera.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the image file.
        frame.src = URL.createObjectURL(file);
      });
    </script>

獲得對文件的訪問權後，便可隨意對其執行任何操作。例如，可以執行以下操作：


* 將其直接附加到一個 `<canvas>` 元素，這樣便能對其進行操作
* 將其下載至用戶的設備
* 通過將其附加到一個 `XMLHttpRequest`，上傳至服務器 

儘管使用 input 元素方法獲得對圖像訪問權的情況普遍存在，卻是最沒有吸引力的方案，因爲它並未直接集成在網頁內，並且在桌面設備上無法訪問用戶的網絡攝像頭。



## 以交互方式訪問攝像頭

現代瀏覽器可直接訪問攝像頭，我們可以藉此打造與網頁完全集成的體驗，讓用戶永遠都不需要離開瀏覽器。



Warning: 直接訪問攝像頭是一項強大功能，需要徵得用戶的同意，並且網站需要託管在安全來源 (HTTPS) 上。


### 獲得對攝像頭的訪問權

我們可以利用 WebRTC 規範中名爲 `getUserMedia()` 的 API 直接訪問攝像頭。
此時系統將提示用戶授予對其相連麥克風和攝像頭的訪問權。


如果授權成功，該 API 將返回一個 `MediaStream`，其中包含來自攝像頭的數據，然後我們可以將數據附加到一個 `<video>` 元素、播放它以顯示實時預覽或將其附加到一個 `<canvas>` 以獲取快照。




要從攝像頭獲取數據，我們只需在傳遞給 `getUserMedia()` API 的約束對象中設置 `video: true`。


    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

這段代碼本身的用處並不大。我們所能做的就是獲取視頻數據並進行播放。


### 從攝像頭獲取快照

要從攝像頭獲取原始數據，我們需要獲取 `getUserMedia()` 創建的卡片信息流，然後處理數據。
不同於 `Web Audio`，並沒有專用的卡片信息流處理 API 可用來處理網絡視頻，因此我們需要稍微用點歪招才能從用戶的攝像頭採集快照。



操作流程如下：

1. 創建一個 canvas 對象，用來容納來自攝像頭的圖幀
2. 獲得對攝像頭卡片信息流的訪問權
3. 將其附加到一個 video 元素
4. 如果想精確地採集某一幀，可以利用 `drawImage()` 將 video 元素中的數據添加到 canvas 對象。


沒問題。

    <video id="player" controls autoplay></video>
    <button id="capture">Capture</button>
    <canvas id="snapshot" width=320 height=240></canvas>
    <script>
      var player = document.getElementById('player'); 
      var snapshotCanvas = document.getElementById('snapshot');
      var captureButton = document.getElementById('capture');

      var handleSuccess = function(stream) {
        // Attach the video stream to the video element and autoplay.
        player.srcObject = stream;
      };

      captureButton.addEventListener('click', function() {
        var context = snapshot.getContext('2d');
        // Draw the video frame to the canvas.
        context.drawImage(player, 0, 0, snapshotCanvas.width, 
            snapshotCanvas.height);
      });

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

將來自攝像頭的數據存儲在 canvas 對象中後，就可以對其進行多種處理。
您可以： 

* 將其直接上傳至服務器
* 將其存儲在本地
* 對圖像應用好玩的特效

### 不需要時停止從攝像頭流式傳輸視頻

最好在不再需要時停止使用攝像頭。
這樣做不僅可以節約電池電量和處理能力，還能增加用戶對應用的信心。


要停止訪問攝像頭，只需在 `getUserMedia()` 返回的卡片信息流的每個視頻磁軌上調用 `stop()`。


<pre class="prettyprint">
&lt;video id="player" controls autoplay>&lt;/video>
&lt;button id="capture">Capture&lt;/button>
&lt;canvas id="snapshot" width=320 height=240>&lt;/canvas>
&lt;script>
  var player = document.getElementById('player'); 
  var snapshotCanvas = document.getElementById('snapshot');
  var captureButton = document.getElementById('capture');
  <strong>var videoTracks;</strong>

  var handleSuccess = function(stream) {
    // Attach the video stream to the video element and autoplay.
    player.srcObject = stream;
    <strong>videoTracks = stream.getVideoTracks();</strong>
  };

  captureButton.addEventListener('click', function() {
    var context = snapshot.getContext('2d');
    context.drawImage(player, 0, 0, snapshotCanvas.width, snapshotCanvas.height);

    <strong>// Stop all video streams.
    videoTracks.forEach(function(track) {track.stop()});</strong>
  });

  navigator.mediaDevices.getUserMedia({video: true})
      .then(handleSuccess);
&lt;/script>
</pre>

## 以負責任的方式請求攝像頭使用權限

如果用戶之前未授予網站對攝像頭的訪問權，則調用 `getUserMedia` 時瀏覽器會立即提示用戶授予網站對攝像頭的訪問權。

 

用戶討厭在其機器上收到索要功能強大設備訪問權的提示，他們常常會屏蔽權限請求，而如果他們不瞭解提示的產生環境，也會將其忽略。最好的做法是在首次需要權限時只請求訪問攝像頭。
一旦用戶授予了訪問權，就不會再次收到提示。
但如果用戶拒絕授權，您就無法再次獲得訪問權，除非他們手動更改攝像頭權限設置。



Warning: 在頁面加載時請求獲得對攝像頭的訪問權將導致大多數用戶拒絕您訪問攝像頭。


## 兼容性

有關移動和桌面瀏覽器實現的更多信息：
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

我們還建議使用 [adapter.js](https://github.com/webrtc/adapter) shim 來防止應用受到 WebRTC 規範變更和前綴差異的影響。


{# wf_devsite_translation #}
