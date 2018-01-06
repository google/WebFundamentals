project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:大多數瀏覽器都可訪問用戶的麥克風。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# 錄製用戶的音頻 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

許多瀏覽器現在都能訪問用戶的視頻和音頻輸入。
不過，根據瀏覽器的不同，這一功能可能體現爲一種全動態的內置體驗，也可能通過授權給用戶設備上的其他應用來實現。


## 從簡單做起，循序漸進

最簡易的做法是直接要求用戶提供預先錄製的文件。
其實現步驟是：創建一個簡單的文件輸入元素，然後添加一個表示我們只能接受音頻文件的 `accept` 過濾器，在理想的情況下，我們可以直接從麥克風獲取這些文件。



    <input type="file" accept="audio/*" capture="microphone">

此方法在所有平臺上都有效。在桌面平臺上，它會提示用戶通過文件系統上傳文件（忽略 `capture="microphone"`）。
在 iOS 上的 Safari 中，它會打開麥克風應用以便您錄製音頻，然後將其傳回網頁；在 Android 上，它允許用戶選擇使用哪一個應用來錄製音頻，錄製完畢後將其傳回網頁。





用戶完成錄製並返回網站後，您需要以某種方式掌握文件數據。
爲 input 元素附加一個 `onchange` 事件，然後讀取事件對象的 `files` 屬性，便可快速獲得文件訪問權。



    <input type="file" accept="audio/*" capture="microphone" id="recorder">
    <audio id="player" controls></audio>
    <script>
      var recorder = document.getElementById('recorder');
      var player = document.getElementById('player')'

      recorder.addEventListener('change', function(e) {
        var file = e.target.files[0]; 
        // Do something with the audio file.
        player.src =  URL.createObjectURL(file);
      });
    </script>

獲得對文件的訪問權後，便可隨意對其執行任何操作。例如，可以執行以下操作：


* 將其直接附加到一個 `<audio>` 元素，這樣便能播放文件
* 將其下載至用戶的設備
* 通過將其附加到一個 `XMLHttpRequest`，上傳至服務器
* 通過 Web Audio API 傳遞文件並對其應用過濾器  

儘管使用 input 元素方法獲得對音頻數據訪問權的情況普遍存在，卻是最沒有吸引力的方案。
因爲我們真正需要的是獲得對麥克風的訪問權，直接在頁面內提供良好的體驗。


## 以交互方式訪問麥克風

現代瀏覽器可直連麥克風，我們可以藉此打造與網頁完全集成的體驗，讓用戶永遠都不需要離開瀏覽器。



### 獲得對麥克風的訪問權

我們可以利用 WebRTC 規範中名爲 `getUserMedia()` 的 API 直接訪問麥克風。`getUserMedia()` 將提示用戶授予對其相連麥克風和攝像頭的訪問權。



如果授權成功，該 API 將返回一個 `Stream`，其中包含來自攝像頭或麥克風的數據，然後我們可以將數據附加到一個 `<audio>` 元素、將其附加到一個網絡音頻 `AudioContext` 或使用 `MediaRecorder` API 對其進行保存。




要從麥克風獲取數據，我們只需在傳遞給 `getUserMedia()` API 的約束對象中設置 `audio: true`



    <audio id="player" controls></audio>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        if (window.URL) {
          player.src = window.URL.createObjectURL(stream);
        } else {
          player.src = stream;
        }
      };

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(handleSuccess)
    </script>

這段代碼本身的用處並不大。我們所能做的就是獲取音頻數據並進行播放。


### 從麥克風獲取原始數據

要從麥克風獲取原始數據，我們需要獲取 `getUserMedia()` 創建的卡片信息流，然後利用 Web Audio API 處理數據。
Web Audio API 是一個簡單的 API，用於獲取輸入源並將這些輸入源連接到可以處理音頻數據（調節增益等）的節點，最終目的是連接到揚聲器以便用戶能夠聽到聲音。




可以連接的其中一個節點是 `ScriptProcessorNode`。每次音頻緩衝區已滿，需要您進行處理時，該節點都會發出一個 `onaudioprocess` 事件。此時，您可以將數據保存到自己的緩衝區內，留供以後使用。


<pre class="prettyprint">
&lt;script>  
  var handleSuccess = function(stream) {
    <strong>var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024,1,1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e){
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer);
    };</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
&lt;/script>
</pre>

保留在緩衝區內的數據是來自麥克風的原始數據，在這些數據的處理上有以下這幾種選擇：


* 將其直接上傳至服務器
* 將其存儲在本地
* 將其轉換爲專用文件格式（例如 WAV），然後保存至服務器或本地


### 保存來自麥克風的數據

要想保存來自麥克風的數據，最簡便的方法是使用 `MediaRecorder` API。


`MediaRecorder` API 將獲取 `getUserMedia` 創建的卡片信息流，然後漸進式地將卡片信息流中的數據保存到首選目的地。



<pre class="prettyprint">
&lt;a id="download">Download</a>
&lt;button id="stop">Stop</button>
&lt;script> 
  let shouldStop = false;
  let stopped = false;
  const downloadLink = document.getElementById('download');
  const stopButton = document.getElementById('stop');

  stopButton.addEventListener('click', function() {
    shouldStop = true;
  })

  var handleSuccess = function(stream) {  
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    <strong>const mediaRecorder = new MediaRecorder(stream, options);  

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

&lt;/script>
</pre>

在我們這種情況下，我們要將數據直接保存到一個數組中，然後在稍後轉換成 `Blob` 後再將其保存到網絡服務器，或直接保存在用戶設備的存儲內。

 

## 以負責任的方式請求麥克風使用權限

如果用戶之前未授予網站對麥克風的訪問權，則調用 `getUserMedia` 時瀏覽器會立即提示用戶授予網站對麥克風的訪問權。

 

用戶討厭在其機器上收到索要功能強大設備訪問權的提示，他們常常會屏蔽權限請求，而如果他們不瞭解提示的產生環境，也會將其忽略。最好的做法是在首次需要權限時只請求訪問麥克風。
一旦用戶授予了訪問權，就不會再次收到提示，但如果他們拒絕授權，您就無法再次獲得訪問權以向用戶請求權限。



Warning: 在頁面加載時請求獲得對麥克風的訪問權將導致大多數用戶拒絕您訪問麥克風。

### 利用 Permission API 確認是否已獲得訪問權

`getUserMedia` API 並不能讓您瞭解自己是否已獲得對麥克風的訪問權。
這就帶來了一個問題：爲了提供友善的 UI，讓用戶願意授予對麥克風的訪問權，您就必須請求獲得對麥克風的訪問權。



在某些瀏覽器中，可以利用 Permission API 來解決這個問題。`navigator.permission` API 讓您不必再次提示用戶便可查詢到訪問特定 API 能力的狀態。



要想查詢是否有權訪問用戶的麥克風，可以將 `{name: 'microphone'}` 傳入 query 方法，後者將返回：


*  `granted` &mdash; 用戶之前已授予對麥克風的訪問權； 
*  `prompt` &mdash; 用戶尚未授予訪問權，調用 `getUserMedia` 時將會收到提示；
*  `denied` &mdash; 系統或用戶已顯式屏蔽對麥克風的訪問權，您將無法獲得對其的訪問權。


現在您就可以進行快速檢查，以確認是否需要改動用戶界面來適應用戶需要執行的操作。


    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
