project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The MediaRecorder API enables you to record audio and video from a web app. It's available now in Firefox and in Chrome for Android and desktop.

{# wf_updated_on: 2016-09-21 #}
{# wf_published_on: 2016-01-30 #}
{# wf_tags: audio,codecs,media,news,recording,video,webrtc,chrome49 #}
{# wf_featured_image: /web/updates/images/2016/01/mediarecorder/featured.jpg #}

# Record Audio and Video with MediaRecorder {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

<style>
@media screen and (max-width: 500px) {
  img.screenshot {
    max-width: 100%;
  }
}
</style>


Break out the champagne and doughnuts!  The <a href="https://code.google.com/p/chromium/issues/detail?id=113676">most starred</a> Chrome feature EVER has now been implemented.

Imagine a ski-run recorder that synchronizes video with GeoLocation data, or a super-simple voice memo app, or a widget that enables you to record a video and upload it to YouTube — all without plugins.

The [MediaRecorder API](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder_API) enables you to record audio and video from a web app. It's available now in Firefox and in Chrome for Android and desktop.

Try it out [here](https://webrtc.github.io/samples/src/content/getusermedia/record).

<img class="screenshot" src="/web/updates/images/2016/01/mediarecorder/screenshot.jpg" alt="Screenshot of mediaRecorder demo on Android Nexus 5X">

> <strong>A word about support</strong>:
>
> • To use MediaRecorder in Chrome 47 and 48, enable **experimental Web Platform features** from the chrome://flags page.
>
> • Audio recording work in Firefox and in Chrome 49 and above; Chrome 47 and 48 only support video recording.
>
> • In Chrome on Android you can save and download recordings made with MediaRecorder, but it's not yet possible to view a recording in a video element via `window.URL.createObjectURL()`. See [this bug](https://code.google.com/p/chromium/issues/detail?id=253465).

The API is straightforward, which I'll demonstrate using code from the [WebRTC sample repo demo](https://webrtc.github.io/samples/src/content/getusermedia/record). Note that the API can only be used from [secure origins only](https://www.chromium.org/Home/chromium-security/deprecating-powerful-features-on-insecure-origins): HTTPS or localhost.

First up, instantiate a MediaRecorder with a MediaStream. Optionally, use an `options` parameter to specify the desired output format:


    var options = {mimeType: 'video/webm; codecs=vp9'};
    mediaRecorder = new MediaRecorder(stream, options);
    

The MediaStream can be from:

* A `getUserMedia()` call.
* The receiving end of a WebRTC call.
* A screen recording.
* Web Audio, once [this issue](https://codereview.chromium.org/1579693006) is implemented.

For `options` it's possible to specify the [MIME type](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder) and, in the future, audio and video [bitrates](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder/MediaRecorder).

MIME types have more or less specific values, combining container and codecs. For example:

* audio/webm
* video/webm
* video/webm;codecs=vp8
* video/webm;codecs=vp9

Use the static method `MediaRecorder.isTypeSupported()` to check if a MIME type is supported, for example when you instantiate MediaRecorder:


    var options;
    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
      options = {mimeType: 'video/webm; codecs=vp9'};
    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
       options = {mimeType: 'video/webm; codecs=vp8'};
    } else {
      // ...
    }
    

The full list of MIME types supported by MediaRecorder in Chrome is available [here](https://code.google.com/p/chromium/codesearch#chromium/src/third_party/WebKit/LayoutTests/fast/mediarecorder/MediaRecorder-isTypeSupported.html).

Caution: Instantiation will fail if the browser doesn't support the MIME type specified, so use `MediaRecorder.isTypeSupported()` or try/catch — or leave out the `options` argument if you're happy with the browser default.

Next, add a data handler and call the `start()` method to begin recording:


    var recordedChunks = [];
    
    var options = {mimeType: 'video/webm;codecs=vp9'};
    mediaRecorder = new MediaRecorder(stream, options);
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    
    function handleDataAvailable(event) {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      } else {
        // ...
      }
    }
    

This examples adds a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) to the `recordedChunks` array whenever data becomes available. The `start()` method can optionally be given a `timeSlice` argument that specifies the length of media  to capture for each Blob.

When you've finished recording, tell the MediaRecorder:


    mediaRecorder.stop();
    

Play the recorded Blobs in a video element by creating a 'super-Blob' from the array of recorded Blobs:


    function play() {
      var superBuffer = new Blob(recordedChunks);
      videoElement.src =
        window.URL.createObjectURL(superBuffer);
    }
    

Alternatively, you could upload to a server via XHR, or use an API like [YouTube](/youtube/v3/code_samples/javascript#upload_video) (see [the experimental demo](https://jeffy.info/google-youtube-upload/components/google-youtube-upload/demo/) below).

Download can be achieved with some link hacking:


    function download() {
      var blob = new Blob(recordedChunks, {
        type: 'video/webm'
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      document.body.appendChild(a);
      a.style = 'display: none';
      a.href = url;
      a.download = 'test.webm';
      a.click();
      window.URL.revokeObjectURL(url);
    }
    

## Feedback on the APIs and demos

The ability to record audio and video without plugins is relatively new to web apps, so we particularly appreciate your feedback on the APIs.

* MediaRecorder implementation bug: [crbug.com/262211](https://crbug.com/262211)
* Chrome: [crbug.com/new](https://crbug.com/new)
* Firefox: [bugzil.la](https://bugzil.la)
* Demos: [github.com/webrtc/samples](https://github.com/webrtc/samples/issues/new)

We'd also like to know what usage scenarios are most important to you, and what features you would like us to prioritize. Comment on this article or track progress at [crbug.com/262211](https://crbug.com/262211).

## Demos

* [webrtc.github.io/samples/src/content/getusermedia/record](https://webrtc.github.io/samples/src/content/getusermedia/record/){: .external }
* [simpl.info/mr](https://simpl.info/mediarecorder) (same code, easier URL for mobile!)
* [Record a video and upload it to YouTube](https://jeffy.info/google-youtube-upload/components/google-youtube-upload/demo/) with an experimental custom &lt;google-youtube-upload&gt; element

## Apps

* Paul Lewis's [Voice Memos](https://voice-memos.appspot.com/) app now has MediaRecorder support, polyfilled for browsers that don't support MediaRecorder audio.

## Polyfills

* Muaz Khan's [MediaStreamRecorder](https://www.webrtc-experiment.com/msr/) is a JavaScript library for recording audio and video, compatible with MediaRecorder.
* [Recorderjs](https://github.com/mattdiamond/Recorderjs) enables recording from a Web Audio API node. You can see this in action in Paul Lewis's [Voice Memos](https://voice-memos.appspot.com/) app.

## Browser support

* Chrome 49 and above by default
* Chrome desktop 47 and 48 with Experimental Web Platform features enabled from chrome://flags
* Firefox from version 25
* [Edge](https://dev.windows.com/en-us/microsoft-edge/platform/status/mediarecorder): 'Under Consideration'

## Spec

[w3c.github.io/mediacapture-record/MediaRecorder.html](https://w3c.github.io/mediacapture-record/MediaRecorder.html)

## API information

[developer.mozilla.org/en/docs/Web/API/MediaRecorder_API](https://developer.mozilla.org/en/docs/Web/API/MediaRecorder_API)


{% include "comment-widget.html" %}
