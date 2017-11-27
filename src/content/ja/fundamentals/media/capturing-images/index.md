project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのブラウザはユーザーのカメラにアクセスできます。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# ユーザーから画像を取得する {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

現在、多くのブラウザには、ユーザーによる動画および音声ファイルの入力を処理する機能が備わっています。
ただしブラウザによっては、この機能が動的に組み込まれている場合や、ユーザーの端末上にある別のアプリに処理が委ねられる場合があります。


##  簡単なケースから始める

最も簡単な方法は、事前に撮影済みのファイルをユーザーに要求することです。
そのためには、簡単なファイル入力要素を作成して `accept` フィルタを追加し、画像ファイルのみを受け入れる（理想的にはカメラから画像ファイルを直接取得する）ことを示します。



    <input type="file" accept="image/*" capture>

この方法はすべてのプラットフォームで使用できます。PC の場合、ユーザーは、ファイル システムから画像ファイルをアップロードするように求められます。
iOS 上の Safari にこの方法を使用すると、カメラアプリが起動し、画像を取得してウェブページに送信できるようになります。Android の場合、ユーザーは画像をウェブページに送信する前に、画像の取得に使用するアプリを選択できます。





送信されたデータは `<form>` にアタッチできます。または、入力要素の `onchange` イベントをリッスンして、`target` イベントの `files` プロパティを読み取ると、JavaScript でデータを操作することが可能です。



###  単一フレームを取得する

画像ファイルへのアクセスは簡単です。

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

ファイルにアクセスできるようになると、ファイルに対してあらゆる操作を行えます。たとえば、次の操作が可能です。


* ファイルを `<canvas>` に直接アタッチして操作可能にする
* ファイルをユーザーの端末にダウンロードする
* ファイルを `XMLHttpRequest` にアタッチして、サーバーにアップロードする 

入力要素を使用して画像にアクセスする方法は汎用的ですが、ウェブページに直接要素を組み込むことができず、PC ではユーザーのウェブカメラにアクセスできないため、これは好ましい方法ではありません。



##  カメラにインタラクティブにアクセスする

最新のブラウザはカメラに直接アクセスできるため、ウェブページと完全に統合されたエクスペリエンスを実現できます。よって、ユーザーはブラウザから離れる必要がありません。



警告:カメラに直接アクセスする機能は強力なので、ユーザーの同意を得るとともに、サイトを安全なオリジン（HTTPS）に配置する必要があります。


###  カメラへのアクセス権を取得する

WebRTC 仕様の API（`getUserMedia()`）を使用して、カメラやマイクに直接アクセスできます。
この API を使用すると、接続済みのマイクまたはカメラに対するアクセス権の付与を求めるメッセージがユーザーに表示されます。


アクセスに成功すると、API からカメラデータを含む `MediaStream` が返されます。これを `<video>` 要素にアタッチして再生すると、リアルタイム プレビューを表示できます。または、`<canvas>` にアタッチしてスナップショットを取得することも可能です。




カメラからデータを取得するために、`getUserMedia()` API に渡す constraints オブジェクトで `video: true` を設定しています。


    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

この機能だけでは、動画データを取得して再生することしかできないため、あまり便利ではありません。


###  カメラからスナップショットを取得する

カメラの未加工データにアクセスするには、`getUserMedia()` で作成されたストリームを取得して、そのデータを処理する必要があります。
ウェブ上の動画には、`Web Audio` のような専用のストーム処理 API がないため、ユーザーのカメラからスナップショットを取得する際は、やや巧妙な処理が必要になります。



その手順は次のとおりです。

1. カメラから取得したフレームを保持する canvas オブジェクトを作成します。
2. カメラ ストリームにアクセスします。
3. ストリームを video 要素にアタッチします。
4. 正確なフレームを取得する必要がある場合は、`drawImage()` を使用して、video 要素のデータを canvas オブジェクトに追加します。


これで完了です。

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

カメラから取得したデータを canvas に保存すると、そのデータをさまざまな方法で操作できます。
次のような操作が可能です。 

* データをサーバーに直接アップロードする
* データをローカルで保存する
* 画像に斬新な効果を適用する

###  不要になった時点でカメラからのストリーミングを停止する

カメラが不要になったら、使用を停止することをお勧めします。
カメラを停止すると、端末の電力消費が抑えられ、処理能力が向上します。さらに、ユーザーがアプリを安心して使用できるようになります。


カメラへのアクセスを停止するには、`getUserMedia()` から返されたストリームの各動画トラックで `stop()` を呼び出します。


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

##  カメラを適切に使用するためにパーミッションを要求する

ユーザーが、サイトによるカメラへのアクセスを許可したことがない場合、`getUserMedia` を呼び出すと、カメラへのアクセス権をサイトに付与するよう求める画面が表示されます。

 

ユーザーは、マシン上の高機能なデバイスへのアクセス権を要求されることを好まず、リクエストを拒否する傾向があります。また、プロンプトが表示された理由がわからない場合は、リクエストを無視することもあります。よって、初めてカメラが必要になったときに、一度だけアクセス権を要求するようにしてください。アクセス権が付与されると、ユーザーに再度プロンプトが表示されることはありません。ただし、ユーザーがアクセスを拒否した場合は、ユーザーが手動でカメラのパーミッション設定を変更するまで、カメラにアクセスできなくなります。



警告:ページの読み込み時にカメラへのアクセス権を求めると、ユーザーが拒否する確率は非常に高くなります。


##  互換性

モバイルおよび PC でのブラウザ実装に関する詳細: 
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

WebRTC 仕様の変更と接頭辞の差異によるアプリへの影響を軽減するために、[adapter.js](https://github.com/webrtc/adapter) shim を使用することをお勧めします。


{# wf_devsite_translation #}
