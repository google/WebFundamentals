project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:大多数浏览器都可访问用户的摄像头。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# 采集用户的图像 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

许多浏览器现在都能访问用户的视频和音频输入。
不过，根据浏览器的不同，这一功能可能体现为一种全动态的内置体验，也可能通过授权给用户设备上的其他应用来实现。


## 从简单做起，循序渐进

最简易的做法是直接要求用户提供预先录制的文件。
其实现步骤是：创建一个简单的文件输入元素，然后添加一个表示我们只能接受图像文件的 `accept` 过滤器，在理想的情况下，我们可以直接从摄像头获取这些文件。



    <input type="file" accept="image/*" capture>

此方法在所有平台上都有效。在桌面平台上，它会提示用户通过文件系统上传图像文件。
在 iOS 上的 Safari 中，此方法会打开摄像头应用以便您采集图像，然后将其传回网页；在 Android 上，此方法允许用户选择使用哪一个应用来采集图像，采集完毕后将其传回网页。





然后可将数据附加到一个 `<form>`，或通过 JavaScript 操作数据：侦听 input 元素上的 `onchange` 事件，然后读取事件 `target` 的 `files` 属性。



### 采集单个帧

获得对图像文件的访问权很简单。

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

获得对文件的访问权后，便可随意对其执行任何操作。例如，可以执行以下操作：


* 将其直接附加到一个 `<canvas>` 元素，这样便能对其进行操作
* 将其下载至用户的设备
* 通过将其附加到一个 `XMLHttpRequest`，上传至服务器 

尽管使用 input 元素方法获得对图像访问权的情况普遍存在，却是最没有吸引力的方案，因为它并未直接集成在网页内，并且在桌面设备上无法访问用户的网络摄像头。



## 以交互方式访问摄像头

现代浏览器可直接访问摄像头，我们可以借此打造与网页完全集成的体验，让用户永远都不需要离开浏览器。



警告：直接访问摄像头是一项强大功能，需要征得用户的同意，并且网站需要托管在安全来源 (HTTPS) 上。


### 获得对摄像头的访问权

我们可以利用 WebRTC 规范中名为 `getUserMedia()` 的 API 直接访问摄像头。
此时系统将提示用户授予对其相连麦克风和摄像头的访问权。


如果授权成功，该 API 将返回一个 `MediaStream`，其中包含来自摄像头的数据，然后我们可以将数据附加到一个 `<video>` 元素、播放它以显示实时预览或将其附加到一个 `<canvas>` 以获取快照。




要从摄像头获取数据，我们只需在传递给 `getUserMedia()` API 的约束对象中设置 `video: true`。


    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

这段代码本身的用处并不大。我们所能做的就是获取视频数据并进行播放。


### 从摄像头获取快照

要从摄像头获取原始数据，我们需要获取 `getUserMedia()` 创建的卡片信息流，然后处理数据。
不同于 `Web Audio`，并没有专用的卡片信息流处理 API 可用来处理网络视频，因此我们需要稍微用点歪招才能从用户的摄像头采集快照。



操作流程如下：

1. 创建一个 canvas 对象，用来容纳来自摄像头的图帧
2. 获得对摄像头卡片信息流的访问权
3. 将其附加到一个 video 元素
4. 如果想精确地采集某一帧，可以利用 `drawImage()` 将 video 元素中的数据添加到 canvas 对象。


没问题。

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

将来自摄像头的数据存储在 canvas 对象中后，就可以对其进行多种处理。
您可以： 

* 将其直接上传至服务器
* 将其存储在本地
* 对图像应用好玩的特效

### 不需要时停止从摄像头流式传输视频

最好在不再需要时停止使用摄像头。
这样做不仅可以节约电池电量和处理能力，还能增加用户对应用的信心。


要停止访问摄像头，只需在 `getUserMedia()` 返回的卡片信息流的每个视频磁轨上调用 `stop()`。


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

## 以负责任的方式请求摄像头使用权限

如果用户之前未授予网站对摄像头的访问权，则调用 `getUserMedia` 时浏览器会立即提示用户授予网站对摄像头的访问权。

 

用户讨厌在其机器上收到索要功能强大设备访问权的提示，他们常常会屏蔽权限请求，而如果他们不了解提示的产生环境，也会将其忽略。最好的做法是在首次需要权限时只请求访问摄像头。
一旦用户授予了访问权，就不会再次收到提示。
但如果用户拒绝授权，您就无法再次获得访问权，除非他们手动更改摄像头权限设置。



警告：在页面加载时请求获得对摄像头的访问权将导致大多数用户拒绝您访问摄像头。


## 兼容性

有关移动和桌面浏览器实现的更多信息：
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

我们还建议使用 [adapter.js](https://github.com/webrtc/adapter) shim 来防止应用受到 WebRTC 规范变更和前缀差异的影响。


{# wf_devsite_translation #}
