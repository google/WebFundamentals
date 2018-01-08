project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 대부분 브라우저는 사용자 마이크에 액세스할 수 있습니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# 사용자에게서 오디오 녹음 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

이제 대부분 브라우저는 사용자의 동영상 및 오디오 입력에 액세스할 수 있는 기능이
있습니다. 그러나 브라우저에 따라서 완전한 동적인 인라인
경험이거나 사용자 기기의 다른 앱에 위임될 수도 있습니다.

## 단순하고 점진적으로 시작

가장 간단한 방법은 사용자에게 사전에 기록된 파일을
요청하는 것입니다. 간단한 파일 입력 요소를 생성하고 이미지 파일만 받을 수 있다는 것을 나타내는
`accept` 필터를 추가하면 됩니다. 마이크에서 직접 받는 것이 이상적입니다.


    <input type="file" accept="audio/*" capture="microphone">

이 메서드는 모든 플랫폼에서 작동합니다. 데스크톱에서는 사용자에게
파일 시스템에서 이미지 파일을 업로드하라는 메시지가 표시됩니다(`capture="microphone"` 무시). iOS의 Safari
에서는 마이크 앱을 열어서 오디오를 녹음하게 한 다음,
웹 페이지로 다시 전송합니다. Android에서는 사용자에게 오디오를 녹음할 앱을 선택하게 한 다음,
웹 페이지로 전송합니다.


사용자가 녹음을 완료하고 웹사이트로 돌아오면
파일 데이터를 찾아야 합니다. `onchange` 이벤트를
입력 요소에 연결하고 이벤트 객체의
`files` 속성을 읽으면 신속히 액세스할 수 있습니다.

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

파일에 액세스하면 파일을 원하는 대로 사용할 수 있습니다. 예를 들어
다음과 같은 작업이 가능합니다.

* `<audio>` 요소에 직접 연결해서 재생합니다.
* 사용자 기기에 다운로드합니다.
* `XMLHttpRequest`에 첨부해서 서버에 업로드합니다.
* Web Audio API를 통해 전달하고 필터를 적용합니다.  

오디오 데이터에 액세스하기 위해 입력 요소 메서드를 사용하는 것이 보편적이지만
가장 매력은 떨어지는 옵션입니다. 사실 우리는 마이크에 액세스하고
페이지에서 직접 멋진 경험을 제공하고 싶어 합니다.

## 마이크에 대화형으로 액세스

최신 브라우저는 마이크에 직접 연결되어 있기 때문에
사용자가 브라우저를 떠날 필요가 없는 웹 페이지와 완벽히 통합된 경험을
빌드할 수 있습니다.

### 마이크 액세스 권한 획득

`getUserMedia()`라는 WebRTC 표준에서
API를 사용하여 마이크에 직접 액세스할 수 있습니다. `getUserMedia()`는 사용자에게 연결된 마이크와 카메라에
액세스한다는 메시지를 표시합니다.

허락을 받는 데 성공하면 API가 카메라 또는 마이크의 데이터가 포함된 `Stream`을
반환합니다. 이를
`<audio>` 요소에 첨부하거나 Web Audio `AudioContext`에 첨부하거나
`MediaRecorder` API로 저장할 수 있습니다.

마이크에서 데이터를 얻기 위해서는
`getUserMedia()` API에 전달되는 제약 조건 객체에서 `audio: true`를 설정하면 됩니다.


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

이 자체만으로는 그다지 유용하지 않습니다. 오디오 데이터를 받아서 재생하는 동작밖에
할 수 없습니다.

### 마이크에서 원시 데이터 액세스

마이크의 원시 데이터에 액세스하려면
`getUserMedia()`가 생성한 스트림을 받아서 Web Audio API로 데이터를 처리해야 합니다. Web Audio API는 단순한 API로,
입력 소스를 받아서 오디오 데이터를 처리하는 노드(Gain 조정 등)와
스피커에 연결해서 사용자에게 소리를 들려줍니다.


연결 가능한 노드로는 `ScriptProcessorNode`가 있습니다. 이 노드는
오디오 버퍼가 채워질 떄마다 `onaudioprocess` 이벤트를 내보내고
여러분 이 이벤트를 처리해야 합니다. 이때 나중에 사용할 수 있도록 데이터를 자체 버퍼에 저장할 수 있습니다.


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

버퍼에 보관된 데이터는 마이크의 원시 데이터이고
이 데이터를 활용할 수 있는 여러 가지 옵션이 있습니다.

* 서버에 바로 업로드
* 로컬에 저장
* 전용 파일 형식(예: WAV)으로 변환하고 서버나
  로컬에 저장

### 마이크 데이터 저장

마이크 데이터를 저장하는 가장 간단한 방법은
`MediaRecorder` API를 사용하는 것입니다.

`MediaRecorder` API는 `getUserMedia`가 생성한 스트림을 받아서
스트림에 있는 데이터를 여러분이 원하는 대상에 점진적으로
저장합니다.

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

우리의 경우에는 나중에
`Blob`으로 바꿔서 웹 서버에 저장하거나 사용자 기기의 저장소에 직접 저장할 수 있는 배열에
바로 데이터를 저장합니다. 

## 마이크를 책임감 있게 사용하기 위한 권한 요청

사용자가 여러분의 사이트에 마이크 액세스 권한을 부여하지 않았다면
`getUserMedia`를 호출하는 즉시 브라우저가 사용자에게
여러분의 사이트에 마이크 액세스 권한을 요청하는 메시지를 표시합니다. 

사용자는 자신의 시스템에서 강력한 기기에 액세스하라는 메시지가 나타나는
것을 싫어합니다. 사용자가 메시지가 생성된 상황을 이해하지
못한다면 종종 요청을 차단하거나 무시할 것입니다. 처음에 필요할 때만
마이크 액세스를 요청하는 것이 좋습니다. 사용자가 액세스 권한을 부여하고 나면 다시 사용자에게 권한을 요청하지 않습니다.
그러나 사용자가 액세스를 거부한다면 사용자에게 다시 액세스 권한을 요청할 수 없습니다.


Warning: 페이지 로드 시 마이크 액세스를 요청하면 대부분 사용자는 액세스를 거절합니다.

### Permission API를 사용하여 액세스 권한이 있는지 확인

`getUserMedia` API로는 마이크 액세스 권한이 있는지
확인할 수 없습니다. 여기에서 문제가 발생합니다. 사용자에게 마이크 액세스 권한을 부여하기 위한 멋진 UI를
제공하려면 마이크 액세스 권한을
요청해야 합니다.

일부 브라우저에서 Permission API를 사용해서 이 문제를 해결할 수 있습니다. `navigator.permission` API를 사용하면
메시지를 다시 표시하지 않고도
특정 API에 액세스하는 기능의 상태를 쿼리할 수 있습니다.

사용자의 마이크에 액세스 권한이 있는지 쿼리하고 싶을 경우
`{name: 'microphone'}`을 쿼리 메서드에 전달하면 메서드가 다음 중 하나를 반환합니다.

*  `granted` &mdash; 사용자에게 이미 마이크 액세스 권한이 부여되었습니다. 
*  `prompt` &mdash; 사용자에게 마이크 액세스 권한이 부여되지 않았고 
    `getUserMedia`를 호출하면 메시지가 표시됩니다. 
*  `denied` &mdash; 시스템 또는 사용자가 명시적으로 마이크 액세스를 차단하여
    마이크에 액세스할 수 없습니다.

이제 사용자가 취할 동작에 맞게 사용자 인터페이스를 변경해야 하는지
신속히 확인할 수 있습니다.

    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });


{# wf_devsite_translation #}
