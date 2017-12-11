project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ほとんどのブラウザはユーザーのマイクにアクセスできます。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2016-08-23 #}

# ユーザーから音声データを取得する {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

現在、多くのブラウザには、ユーザーによる動画および音声ファイルの入力を処理する機能が備わっています。
ただしブラウザによっては、この機能が動的に組み込まれている場合や、ユーザーの端末上にある別のアプリに処理が委ねられる場合があります。


##  簡単なケースから始める

最も簡単な方法は、事前に録音済みのファイルをユーザーに要求することです。
そのためには、簡単なファイル入力要素を作成して `accept` フィルタを追加し、音声ファイルのみを受け入れる（理想的にはマイクから音声ファイルを直接取得する）ことを示します。



    <input type="file" accept="audio/*" capture="microphone">

この方法はすべてのプラットフォームで使用できます。PC の場合、ユーザーは、ファイル システムからファイルをアップロードするように求められます（`capture="microphone"` は無視されます）。
iOS 上の Safari にこの方法を使用すると、マイクアプリが起動し、音声を録音してウェブページに送信できるようになります。Android の場合、ユーザーは音声をウェブページに送信する前に、音声の録音に使用するアプリを選択できます。





ユーザーが録音を完了してウェブサイトに戻ったら、何らかの方法でそのファイルデータを取得する必要があります。
ファイルにすばやくアクセスするには、`onchange` イベントを入力要素にアタッチして、イベント オブジェクトの `files` プロパティを読み取ります



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

ファイルにアクセスできるようになると、ファイルに対してあらゆる操作を行えます。たとえば、次の操作が可能です。


* ファイルを `<audio>` 要素に直接アタッチして、ファイルを再生できるようにする
* ファイルをユーザーの端末にダウンロードする
* ファイルを `XMLHttpRequest` にアタッチして、サーバーにアップロードする
* Web Audio API を介してファイルを渡し、ファイルにフィルタを適用する  

入力要素を使用して音声データにアクセスする方法は汎用的ですが、好ましい方法ではありません。
理想的には、マイクにアクセスして、ページ内で適切なエクスペリエンスを直接提供する必要があります。


##  マイクにインタラクティブにアクセスする

最新のブラウザはマイクに直接アクセスできるため、ウェブページと完全に統合されたエクスペリエンスを実現できます。よって、ユーザーはブラウザから離れる必要がありません。



###  マイクへのアクセス権を取得する

WebRTC 仕様の `getUserMedia()` という APIを使用すると、マイクに直接アクセスできます。`getUserMedia()` を使用する場合、接続済みのマイクまたはカメラに対するアクセス権の付与を求めるメッセージがユーザーに表示されます。



アクセスが許可されると、API によって、カメラまたはマイクからのデータが含まれる `Stream` が返されます。このストリームは `<audio>` 要素や Web Audio の `AudioContext` にアタッチしたり、`MediaRecorder` API を使用して保存したりできます。




以下では、マイクからデータを取得するために、`getUserMedia()` API に渡す constraints オブジェクトで `audio: true` を指定しています。



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

この機能だけでは、音声データを取得して再生することしかできないため、あまり便利ではありません。


###  マイクの未加工データにアクセスする

マイクの未加工データにアクセスするには、`getUserMedia()` で作成されたストリームを取得し、Web Audio API を使用してそのデータを処理する必要があります。
Web Audio API はシンプルな API であり、入力ソースを取得すると、それを音声データを処理（ゲインの調整など）できるノードに接続し、最終的にはユーザーが音声を聞くことができるようにスピーカーに接続します。




`ScriptProcessorNode` は接続できるノードの 1 つです。このノードは、オーディオ バッファがいっぱいになるたびに `onaudioprocess` イベントを発行するため、それを処理する必要があります。この時点でデータを独自のバッファに保存しておき、あとで使用することができます。


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

バッファに保持されたデータはマイクの未加工データであり、そのデータに対して多くの操作を行うことができます。次に例を示します。


* データをサーバーに直接アップロードする
* データをローカルで保存する
* WAV などの専用のファイル形式に変換してから、サーバーまたはローカルで保存する


###  マイクのデータを保存する

マイクのデータを保存する最も簡単な方法は、`MediaRecorder` API を使用することです。


`MediaRecorder` API は `getUserMedia` で作成されたストリームを取得してから、ストリーム上のデータを任意の保存先に段階的に保存します。



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

ここでは、あとで `Blob` に変換できる配列にデータを直接保存しています。その後、これを使用して、ウェブサーバーまたは直接ユーザーの端末のストレージにデータを保存します。

 

##  マイクを適切に使用するためにパーミッションを要求する

ユーザーが、サイトによるマイクへのアクセスを許可したことがない場合は、`getUserMedia` を呼び出すと、マイクにアクセスするためのパーミッションを付与するよう求める画面が表示されます。

 

ユーザーは、マシン上の高機能なデバイスへのアクセス権を要求されることを好まず、リクエストを拒否する傾向があります。また、プロンプトが表示された理由がわからない場合は、リクエストを無視することもあります。よって、初めてマイクが必要になったときに、一度だけアクセス権を要求することを推奨します。アクセス権が付与されると、ユーザーに再度プロンプトが表示されることはありません。ただし、ユーザーがアクセスを拒否した場合は、再度アクセスしてユーザーにパーミッションを要求できなくなります。



警告:ページの読み込み時にマイクへのアクセス権を求めると、ユーザーが拒否する確率が非常に高くなります。

###  Permission API を使用してアクセス権の有無を確認する

`getUserMedia` API からの情報では、既にマイクへのアクセス権があるかどうかを確認できません。
これは問題になります。適切な UI を表示してマイクへのアクセスをユーザーに許可してもらうには、マイクへのアクセス権を求める必要があります。



この問題は、一部のブラウザでは Permission API を使用すると解決できます。`navigator.permission` API を使用すると、プロンプトを再度表示する必要なく、特定の API にアクセスできるかどうかを照会できます。



ユーザーのマイクへのアクセス権があるかどうかを照会する場合は、`{name: 'microphone'}` をクエリメソッドに渡すと、以下のいずれかが返されます。


*  `granted` &mdash; ユーザーは以前にマイクへのアクセス権を付与しています。 
*  `prompt` &mdash; ユーザーはアクセス権を付与したことがなく、`getUserMedia` を呼び出すと、ユーザーにプロンプトが表示されます。 
*  `denied` &mdash; システムまたはユーザーはマイクへのアクセスを明示的にブロックしているため、マイクにアクセスすることはできません。


これで、ユーザーが必要な操作を実行できるようにするためにユーザー インターフェースを変更する必要があるかどうかをすばやく確認できます。


    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
