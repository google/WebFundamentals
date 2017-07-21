project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 대부분 브라우저는 사용자 카메라에 액세스할 수 있습니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-08-23 #}

# 사용자에게서 이미지 캡처 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

이제 대부분 브라우저는 사용자의 동영상 및 오디오 입력에 액세스할 수 있는 기능이
있습니다. 그러나 브라우저에 따라서 완전한 동적인 인라인
경험이거나 사용자 기기의 다른 앱에 위임될 수도 있습니다.

## 단순하고 점진적으로 시작

가장 간단한 방법은 사용자에게 사전에 기록된 파일을
요청하는 것입니다. 간단한 파일 입력 요소를 생성하고 이미지 파일만 받을 수 있다는 것을 나타내는
`accept` 필터를 추가하면 됩니다. 카메라에서 직접 받는 것이 이상적입니다.


    <input type="file" accept="image/*" capture>

이 메서드는 모든 플랫폼에서 작동합니다. 데스크톱에서는 사용자에게
파일 시스템에서 이미지 파일을 업로드하라는 메시지가 표시됩니다. iOS의 Safari에서
이 메서드는 카메라 앱을 열어서 이미지를 캡처할 수 있게 해줍니다.
그 다음에는 웹 페이지로 다시 전송합니다. Android에서 이 메서드는 사용자에게
이미지를 캡처하는 데 사용할 앱을 선택할 수 있는 옵션을 제공합니다. 그 다음에 이미지를
웹 페이지로 전송합니다.

데이터는 `<form>`에 첨부하거나
입력 요소에서 `onchange` 이벤트를 수신하여 자바스크립트로 조작한 다음,
`target` 이벤트의 `files` 속성을 읽을 수 있습니다.

### 단일 프레임 캡처

이미지 파일에 액세스하는 방법은 간단합니다.

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

파일에 액세스하면 파일을 원하는 대로 사용할 수 있습니다. 예를 들어 
다음과 같은 작업이 가능합니다.

* `<canvas>` 요소에 직접 첨부해서 조작할 수 있습니다.
* 사용자 기기에 다운로드합니다.
* `XMLHttpRequest`에 첨부해서 서버에 업로드합니다. 

이미지 액세스에 입력 요소 메서드를 사용하는 것이 보편적이지만 
웹 페이지에 바로 통합되지 않고 데스크톱에서는 사용자 웹캠에 액세스할 수 없기 때문에 
가장 매력이 떨어지는 옵션입니다.

## 카메라에 대화형으로 액세스

최신 브라우저는 카메라에 바로 액세스할 수 있습니다.
웹 페이지와 완전히 통합된 경험을 구현할 수 있어서 사용자가
전혀 브라우저를 떠날 필요가 없습니다.

Warning: 카메라에 직접 액세스하는 것은 강력한 기능입니다. 
사용자의 동의가 필요하고 사이트는 보안 출처(HTTPS)여야 합니다.

### 카메라 액세스 권한 획득

WebRTC
 사양 `getUserMedia()`에서 API를 사용하여 카메라와 마이크에 직접 액세스할 수 있습니다. 사용자에게 
연결된 마이크와 카메라에 액세스하도록 메시지가 표시됩니다.

성공하면 API가 카메라의 데이터가 포함된 `MediaStream`을 반환합니다.
이 데이터는 `<video>` 요소에 첨부해서
실시긴 미리보기를 보여주거나 `<canvas>`에 첨부해서
스냅샷을 얻을 수 있습니다.

카메라에서 데이터를 얻기 위해서는 
`getUserMedia()` API에 전달되는 제약 조건 객체에서 `video: true`를 설정하면 됩니다.

    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

이 자체만으로는 그다지 유용하지 않습니다. 동영상 데이터를 받아서 재생하는 동작밖에
할 수 없습니다.

### 카메라에서 스냅샷 찍기

카메라의 원시 데이터에 액세스하려면
`getUserMedia()`가 생성한 스트림을 받아서 데이터를 처리해야 합니다. `Web Audio`와 달리
웹상의 동영상에 사용할 수 있는 전용 스트리밍 처리 API가 없기 때문에
약간의 편법을 사용해서 사용자 카메라에서 스냅샷을 캡처해야 합니다.

그 과정은 다음과 같습니다.

1. 카메라의 프레임을 고정할 캔버스 객체를 생성합니다.
2. 카메라 스트림에 액세스합니다.
3. 동영상 요소에 첨부합니다.
4. 정확한 프레임을 캡처하고 싶다면
   `drawImage()`를 사용하여 동영상 요소의 데이터를 캔버스 객체에 추가합니다.

완료되었습니다.

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

캔버스에 카메라의 데이터를 저장한 다음에는
이 데이터를 여러 가지로 활용할 수 있습니다. 다음과 같은 작업이 가능합니다. 

* 서버에 바로 업로드
* 로컬에 저장
* 이미지에 독특한 효과 적용

### 필요 없을 때는 카메라에서 스트리밍 중단

필요하지 않을 때는 카메라를 사용하지 않는 것이 좋습니다.
배터리와 처리 성능을 아낄 수 있을 뿐만 아니라
사용자에게 여러분의 애플리케이션에 대한 신뢰를 심어줄 수 있습니다.

카메라 액세스를 중단하려면 각 동영상 트랙에서 
`getUserMedia()`가 반환한 스트림에 대해 `stop()`을 호출하면 됩니다.

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

## 책임감 있는 카메라 사용 권한 요청

사용자가 여러분의 사이트에 카메라 액세스 권한을 부여하지 않았다면
`getUserMedia`를 호출하는 즉시 브라우저가 사용자에게
여러분의 사이트에 카메라 액세스 권한을 요청하는 메시지를 표시합니다. 

사용자는 자신의 시스템에서 강력한 기기에 액세스하라는 메시지가 나타나는
것을 싫어합니다. 사용자가 메시지가 생성된 상황을 이해하지
못한다면 종종 요청을 차단하거나 무시할 것입니다. 처음에 필요할 때만
카메라 액세스를 요청하는 것이 좋습니다. 사용자가
액세스 권한을 부여받고 나면 다시 요청을 받지 않습니다. 그러나 사용자가 액세스를 거절하면,
사용자가 수동으로 카메라 권한 설정을
변경하지 않는 한 여러분은 카메라에 다시 액세스할 수 없습니다.

Warning: 페이지 로드 시 카메라 액세스를 요청하면
대부분 사용자는 액세스를 거절합니다.

## 호환성

모바일 및 데스크톱 브라우저 구현에 대한 추가 정보:
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

또한, [adapter.js](https://github.com/webrtc/adapter) 심을 사용하여 WebRTC 사양 변경과 접두사 차이로부터 앱을 보호하는 것이 좋습니다.


{# wf_devsite_translation #}
