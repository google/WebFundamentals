project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: ImageCapture is an API for controlling camera settings and taking photos.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}
{# wf_tags: canvas,chrome56,media,webrtc #}
{# wf_featured_image: /web/updates/images/2016/12/imagecapture/featured.jpg #}
{# wf_featured_snippet: ImageCapture is an API for controlling camera settings and taking photos. #}

<style>
#demo .hidden {
  display: none;
}

#demo button {
  display: block;
  float: left;
  margin: 0 10px 20px 0;
  width: 120px;
}

#demo button:last-of-type {
  float: none;
  margin: 0 0 20px 0;
}

#demo canvas {
  display: block;
  margin: 0 0 20px 0;
}

#demo img {
  display: block;
  margin: 0 0 20px 0;
}

#demo input#zoom {
  margin: 0 0 20px 0;
  width: 100%;
}

#demo select {
  margin: 0 0 20px 0;
}

#demo video {
  margin: 0 12px 20px 0;
  vertical-align: top;
  max-width: 100%;
}

@media screen and (max-width: 500px) {
  #demo button {
    font-size: 0.8em;
    width: calc(33% - 5px);
  }
}

@media screen and (max-width: 720px) {
  #demo video {
    margin: 0 10px 10px 0;
  }
}

</style>

# Take photos and control camera settings {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

`ImageCapture` is an API for controlling camera settings and taking photos.

The API has four methods:

* `takePhoto()` returns a `Blob` which can be downloaded, stored by the browser or displayed in an `img` element.
* `grabFrame()` returns an `ImageData` object which can be post-processed — for example, to selectively change color values.
* `getPhotoCapabilities()` returns a `PhotoCapabilities` object that provides access to available camera options and their current values.
* `setOptions()` is used to configure [camera settings](http://www.w3.org/TR/image-capture/#photosettings) such as zoom, white balance or focus mode.

`ImageCapture` gets access to media streams from cameras via `getUserMedia()`:

    navigator.mediaDevices.getUserMedia({video: true})
      .then(gotMedia)
      .catch(error => console.error('getUserMedia() error:', error));

    function gotMedia(mediaStream){
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      console.log(imageCapture);
    }

Note: To choose between different cameras, such as the front and back camera on
a phone, get a list of available devices via the
`MediaDevices.enumerateDevicesMethod()`, then set `deviceId` in `getUserMedia()`
constraints.

You can use `takePhoto()` to get a still image and then set it as the `src` of
an `<img>`:

    imageCapture.<strong>takePhoto()</strong>
      .then(blob => {
        image.src = URL.createObjectURL(blob);
      })
      .catch(error => console.error('takePhoto() error:', error));

Use `grabFrame()` to get data for a frame of video and then draw
it on a `<canvas>`:

    imageCapture.<strong>grabFrame()</strong>
      .then(imageData => {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        canvas.getContext('2d').drawImage(imageData, 0, 0);
      })
      .catch(error => console.error('grabFrame() error:', error));

You can try out `takePhoto()` and `grabFrame()` below.

<div id="demo">
  <button id="grabFrame">Grab Frame</button>
  <button id="takePhoto">Take Photo</button>
  <div class="select">
  <label for="videoSource">Video source: </label><select id="videoSource"></select>
  </div>
  <input class="hidden" id="zoom" type="range" step="20">
</div>

<video autoplay class="hidden"></video>
<img>
<canvas class="hidden"></canvas>



## Camera capabilities

The full range of possible camera resolutions for still images can be accessed
via the `MediaSettingsRange` values for
`captureDevice.photoCapabilities.imageHeight` and `imageWidth`. Note that the
minimum and maximum width and height constraints for `getUserMedia()` are for
video, which may be less than the camera capabilities for still images. In other
words, you may not be able to access the full resolution capabilities of your
device when saving from `getUserMedia()` to a canvas. See the example at
https://webrtc.github.io/samples/src/content/getusermedia/resolution.)


## Demos


## Support


## Find out more


{% include "comment-widget.html" %}

<script>
'use strict';

/* globals ImageCapture */

var constraints;
var imageCapture;

var grabFrameButton = document.querySelector('#ic-demo button#grabFrame');
var takePhotoButton = document.querySelector('#ic-demo button#takePhoto');

var canvas = document.querySelector('#ic-demo canvas');
var img = document.querySelector('#ic-demo img');
var video = document.querySelector('#ic-demo video');
var videoSelect = document.querySelector('#ic-demo select#videoSource');
var zoomInput = document.querySelector('#ic-demo input#zoom');

grabFrameButton.onclick = grabFrame;
takePhotoButton.onclick = takePhoto;
videoSelect.onchange = getStream;
zoomInput.oninput = setZoom;

// Get a list of available media input (and output) devices.
navigator.mediaDevices.enumerateDevices().then(gotDevices).
  catch(error => {
    console.log('Error getting devices: ', error);
  });

// Get a video stream from the currently selected camera source.
function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  var videoSource = videoSelect.value;
  constraints = {
    audio: false,
    video: {deviceId: videoSource ? {exact: videoSource} : undefined}
  };
  navigator.mediaDevices.getUserMedia(constraints).
    then(gotStream).then(gotDevices).catch(error => {
      console.log('getUserMedia error: ', error);
    });
}

// From the list of media devices available, set up the camera source <select>,
// then get a video stream from the default camera source.
function gotDevices(deviceInfos) {
  for (var i = 0; i !== deviceInfos.length; ++i) {
    var deviceInfo = deviceInfos[i];
    console.log('Found media input or output device: ', deviceInfo);
    var option = document.createElement('option');
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === 'videoinput') {
      option.text = deviceInfo.label || 'Camera ' + (videoSelect.length + 1);
      videoSelect.appendChild(option);
    }
  }
  getStream();
}

// Display the stream from the currently selected camera source, and then
// create an ImageCapture object, using the video from the stream.
function gotStream(stream) {
  console.log('getUserMedia() got stream: ', stream);
  window.stream = stream; // global scope visible in browser console
  if (window.URL) {
    video.src = window.URL.createObjectURL(stream);
    video.classList.remove('hidden');
  } else {
    video.src = stream;
  }
  imageCapture = new ImageCapture(stream.getVideoTracks()[0]);
  setTimeout(getCapabilities, 100);
}

// Get the PhotoCapabilities for the currently selected camera source.
function getCapabilities() {
  imageCapture.getPhotoCapabilities().then(function(capabilities) {
    console.log('Camera capabilities:', capabilities);
    if (capabilities.zoom.max > 0) {
      zoomInput.min = capabilities.zoom.min;
      zoomInput.max = capabilities.zoom.max;
      zoomInput.value = capabilities.zoom.current;
      zoomInput.classList.remove('hidden');
    }
  }).catch(function(error) {
    console.log('navigator.getUserMedia error: ', error);
  });
}

// Get an ImageBitmap from the currently selected camera source and
// display this with a canvas element.
function grabFrame() {
  imageCapture.grabFrame().then(function(imageBitmap) {
    console.log('Grabbed frame:', imageBitmap);
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;
    canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
    canvas.classList.remove('hidden');
  }).catch(function(error) {
    console.log('grabFrame() error: ', error);
  });
}

function setZoom() {
  imageCapture.setOptions({
    zoom: zoomInput.value
  });
}

// Get a Blob from the currently selected camera source and
// display this with an img element.
function takePhoto() {
  imageCapture.takePhoto().then(function(blob) {
    console.log('Took photo:', blob);
    img.src = URL.createObjectURL(blob);
  }).catch(function(error) {
    console.log('takePhoto() error: ', error);
  });
}
</script>
