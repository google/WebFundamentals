project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:大多数浏览器都可访问用户的麦克风。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# 录制用户的音频 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

许多浏览器现在都能访问用户的视频和音频输入。
不过，根据浏览器的不同，这一功能可能体现为一种全动态的内置体验，也可能通过授权给用户设备上的其他应用来实现。


## 从简单做起，循序渐进

最简易的做法是直接要求用户提供预先录制的文件。
其实现步骤是：创建一个简单的文件输入元素，然后添加一个表示我们只能接受音频文件的 `accept` 过滤器，在理想的情况下，我们可以直接从麦克风获取这些文件。



    <input type="file" accept="audio/*" capture="microphone">

此方法在所有平台上都有效。在桌面平台上，它会提示用户通过文件系统上传文件（忽略 `capture="microphone"`）。
在 iOS 上的 Safari 中，它会打开麦克风应用以便您录制音频，然后将其传回网页；在 Android 上，它允许用户选择使用哪一个应用来录制音频，录制完毕后将其传回网页。





用户完成录制并返回网站后，您需要以某种方式掌握文件数据。
为 input 元素附加一个 `onchange` 事件，然后读取事件对象的 `files` 属性，便可快速获得文件访问权。



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

获得对文件的访问权后，便可随意对其执行任何操作。例如，可以执行以下操作：


* 将其直接附加到一个 `<audio>` 元素，这样便能播放文件
* 将其下载至用户的设备
* 通过将其附加到一个 `XMLHttpRequest`，上传至服务器
* 通过 Web Audio API 传递文件并对其应用过滤器  

尽管使用 input 元素方法获得对音频数据访问权的情况普遍存在，却是最没有吸引力的方案。
因为我们真正需要的是获得对麦克风的访问权，直接在页面内提供良好的体验。


## 以交互方式访问麦克风

现代浏览器可直连麦克风，我们可以借此打造与网页完全集成的体验，让用户永远都不需要离开浏览器。



### 获得对麦克风的访问权

我们可以利用 WebRTC 规范中名为 `getUserMedia()` 的 API 直接访问麦克风。`getUserMedia()` 将提示用户授予对其相连麦克风和摄像头的访问权。



如果授权成功，该 API 将返回一个 `Stream`，其中包含来自摄像头或麦克风的数据，然后我们可以将数据附加到一个 `<audio>` 元素、将其附加到一个网络音频 `AudioContext` 或使用 `MediaRecorder` API 对其进行保存。




要从麦克风获取数据，我们只需在传递给 `getUserMedia()` API 的约束对象中设置 `audio: true`



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

这段代码本身的用处并不大。我们所能做的就是获取音频数据并进行播放。


### 从麦克风获取原始数据

要从麦克风获取原始数据，我们需要获取 `getUserMedia()` 创建的卡片信息流，然后利用 Web Audio API 处理数据。
Web Audio API 是一个简单的 API，用于获取输入源并将这些输入源连接到可以处理音频数据（调节增益等）的节点，最终目的是连接到扬声器以便用户能够听到声音。




可以连接的其中一个节点是 `ScriptProcessorNode`。每次音频缓冲区已满，需要您进行处理时，该节点都会发出一个 `onaudioprocess` 事件。此时，您可以将数据保存到自己的缓冲区内，留供以后使用。


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

保留在缓冲区内的数据是来自麦克风的原始数据，在这些数据的处理上有以下这几种选择：


* 将其直接上传至服务器
* 将其存储在本地
* 将其转换为专用文件格式（例如 WAV），然后保存至服务器或本地


### 保存来自麦克风的数据

要想保存来自麦克风的数据，最简便的方法是使用 `MediaRecorder` API。


`MediaRecorder` API 将获取 `getUserMedia` 创建的卡片信息流，然后渐进式地将卡片信息流中的数据保存到首选目的地。



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

在我们这种情况下，我们要将数据直接保存到一个数组中，然后在稍后转换成 `Blob` 后再将其保存到网络服务器，或直接保存在用户设备的存储内。

 

## 以负责任的方式请求麦克风使用权限

如果用户之前未授予网站对麦克风的访问权，则调用 `getUserMedia` 时浏览器会立即提示用户授予网站对麦克风的访问权。

 

用户讨厌在其机器上收到索要功能强大设备访问权的提示，他们常常会屏蔽权限请求，而如果他们不了解提示的产生环境，也会将其忽略。最好的做法是在首次需要权限时只请求访问麦克风。
一旦用户授予了访问权，就不会再次收到提示，但如果他们拒绝授权，您就无法再次获得访问权以向用户请求权限。



警告：在页面加载时请求获得对麦克风的访问权将导致大多数用户拒绝您访问麦克风。

### 利用 Permission API 确认是否已获得访问权

`getUserMedia` API 并不能让您了解自己是否已获得对麦克风的访问权。
这就带来了一个问题：为了提供友善的 UI，让用户愿意授予对麦克风的访问权，您就必须请求获得对麦克风的访问权。



在某些浏览器中，可以利用 Permission API 来解决这个问题。`navigator.permission` API 让您不必再次提示用户便可查询到访问特定 API 能力的状态。



要想查询是否有权访问用户的麦克风，可以将 `{name: 'microphone'}` 传入 query 方法，后者将返回：


*  `granted` &mdash; 用户之前已授予对麦克风的访问权； 
*  `prompt` &mdash; 用户尚未授予访问权，调用 `getUserMedia` 时将会收到提示；
*  `denied` &mdash; 系统或用户已显式屏蔽对麦克风的访问权，您将无法获得对其的访问权。


现在您就可以进行快速检查，以确认是否需要改动用户界面来适应用户需要执行的操作。


    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
