project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Most browsers can get access to the user's camera.

{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2016-08-23 #}

# Capturing an Image from the User {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Many browsers now have the ability to access video and audio input from the 
user. However, depending on the browser it might be a full dynamic and inline 
experience, or it could be delegated to another app on the user's device.

## Start simple and progressively

The easiest thing to do is simply ask the user for a pre-recorded
file. Do this by creating a simple file input element and adding 
an `accept` filter that indicates we can only accept image files and ideally we 
will get them directly from the camera.

    <input type="file" accept="image/*" capture>

This method works on all platforms. On desktop it will prompt the user to 
upload an image file from the file system. In Safari
on iOS this method will open up the camera app, allowing you to capture an image 
and then send it back to the web page; on Android this method will give the user 
a choice of which app to use to capture the image before sending it back to the
web page.

The data can then be attached to a `<form>` or manipulated with JavaScript by 
listening for an `onchange` event on the input element and then reading 
the `files` property of the event `target`.

### Capture a single frame

Getting access to the image file is simple.

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

Once you have access to the file you can do anything you want with it. For 
example, you can:

* Attach it directly to a `<canvas>` element so that you can manipulate it
* Download it to the user's device
* Upload it to a server by attaching to an `XMLHttpRequest` 

Whilst using the input element method of getting access to images is 
ubiquitous, it is the least appealing option because it is not integrated 
directly into the web page, and on desktop can't access the user's webcam.

## Access the camera interactively

Modern browsers can get direct access to cameras, allowing us to build
experiences that are fully integrated with the web page, so the user need never
leave the browser.

Warning: Direct access to the camera is a powerful feature, it requires consent 
from the user and your site needs to be on a secure origin (HTTPS).

### Acquire access to the camera

We can directly access a camera and microphone by using an API in the WebRTC 
specification called `getUserMedia()`. This will prompt the user for 
access to their connected microphones and cameras.

If successful the API will return a `MediaStream` that contains data from
the camera, and we can then either attach it to a `<video>` element and play it
to show a real time preview, or attach it to a `<canvas>` to get a
snapshot.

To get data from the camera we just set `video: true` in the constraints 
object that is passed to the `getUserMedia()` API.

    <video id="player" controls autoplay></video>
    <script>  
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        player.srcObject = stream;
      };

      navigator.mediaDevices.getUserMedia({video: true})
          .then(handleSuccess);
    </script>

By itself, this isn't that useful. All we can do is take the video data and play
it back.

### Take a snapshot from the camera

To access the raw data from the camera we have to take the stream created by
`getUserMedia()` and process the data. Unlike `Web Audio`, there isn't a 
dedicated stream processing API for video on the web so we have to resort to 
a tiny bit of hackery to capture a snapshot from the user's camera.

The process is as follows:

1. Create a canvas object that will hold the frame from the camera
2. Get access to the camera stream
3. Attach it to a video element
4. When you want to capture a precise frame, add the data from the video element 
   to a canvas object using `drawImage()`.

Done.

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

Once you have data from the camera stored in the canvas you can do many
things with it. You could: 

* Upload it straight to the server
* Store it locally
* Apply funky effects to the image

### Stop streaming from the camera when not needed

It is good practice to stop using the camera when you no longer need it. 
Not only will this save battery and processing power, it will also give 
users confidence in your application.

To stop access to the camera you can simply call `stop()` on each video track 
for the stream returned by `getUserMedia()`.

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

## Ask permission to use camera responsibly

If the user has not previously granted your site access to the camera then
the instant that you call `getUserMedia` the browser will prompt the user to
grant your site permission to the camera. 

Users hate getting prompted for access to powerful devices on their machine 
and they will frequently block the request, or they will ignore it if they don't 
understand the context for which the prompt has been created. It is best 
practice to only ask to access the camera when first needed. Once the user has
granted access they won't be asked again. However, if the user rejects access, 
you can't get access again, unless they manually change camera permission 
settings.

Warning: Asking for access to the camera on page load will result in most of 
your users rejecting access to it.

## Compatibility

More information about mobile and desktop browser implementation:
* [srcObject](https://www.chromestatus.com/feature/5989005896187904)
* [navigator.mediaDevices.getUserMedia()](https://www.chromestatus.com/features/5755699816562688)

We also recommend using the [adapter.js](https://github.com/webrtc/adapter) shim to protect apps from WebRTC spec changes and prefix differences.
