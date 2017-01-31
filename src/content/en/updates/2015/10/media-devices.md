project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The MediaDevices interface gives access to input and output devices available to the browser including cameras, microphones and speakers.

{# wf_updated_on: 2015-10-12 #}
{# wf_published_on: 2015-10-12 #}
{# wf_tags: news,audio,video,media,webrtc,getusermedia #}
{# wf_featured_image: /web/updates/images/2015-10-13-media-devices/featured.jpg #}

# Choose Cameras, Microphones and Speakers from Your Web App {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

Modern browsers make it possible to select input and output devices including cameras, microphones and speakers.

For example:

* On a phone, select the front or rear-facing camera.
* On a laptop, choose the internal speakers or a speaker connected by Bluetooth.
* For a video chat, choose internal or external microphone or camera.

All this functionality is exposed by the  MediaDevices object, which is returned
by `navigator.mediaDevices`.

MediaDevices has two methods, both implemented in Chrome 47 on desktop and
Android: `enumerateDevices()` and `getUserMedia()`.

<img src="/web/updates/images/2015-10-13-media-devices/select-audio-output.jpg" alt="Selecting an audio output device" />

### enumerateDevices()

Returns a Promise giving access to an array of `MediaDeviceInfo` objects for
available devices.

The method is similar to
[`MediaStreamTrack.getSources()`](https://simpl.info/getusermedia/sources) but unlike that
method (which was only ever implemented in Chrome) it's standards compliant and
includes audio output devices. You can try this out with the demos below.

Here's some slightly simplified code from one of the demos:


    navigator.mediaDevices.enumerateDevices()
      .then(gotDevices)
      .catch(errorCallback);
    ...
    function gotDevices(deviceInfos) {

      ...

      for (var i = 0; i !== deviceInfos.length; ++i) {
        var deviceInfo = deviceInfos[i];
        var option = document.createElement('option');
        option.value = deviceInfo.deviceId;
        if (deviceInfo.kind === 'audioinput') {
          option.text = deviceInfo.label ||
            'Microphone ' + (audioInputSelect.length + 1);
          audioInputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'audiooutput') {
          option.text = deviceInfo.label || 'Speaker ' +
            (audioOutputSelect.length + 1);
          audioOutputSelect.appendChild(option);
        } else if (deviceInfo.kind === 'videoinput') {
          option.text = deviceInfo.label || 'Camera ' +
            (videoSelect.length + 1);
          videoSelect.appendChild(option);
        }

      ...

    }


Having retrieved the IDs of available devices with `enumerateDevices()`, you can use `setSinkId()` (defined in the [Audio Output Devices API](http://www.w3.org/TR/audio-output/#setsinkid)) to change the audio output destination for a video or audio element:


    element.setSinkId(sinkId)
      .then(function() {
        console.log('Audio output device attached: ' + sinkId);
      })
      .catch(function(error) {
        // ...
      });


This method sets the output device for audio from the element. Once `setSinkId()` has been called, you can get the ID of the current output audio device for the element with the `sinkId` property.

### getUserMedia()

This replaces `navigator.getUserMedia()`, but instead of using a callback, returns
a Promise that gives access to a `MediaStream`. Developers are encouraged to use
`MediaDevices.getUserMedia()`, but there's no plan to remove
`navigator.getUserMedia()`: [it remains part of the
spec](https://w3c.github.io/mediacapture-main/getusermedia.html#local-content).

There's a demo at the [WebRTC samples
site](https://webrtc.github.io/samples/src/content/getusermedia/gum).

Here's a fragment of code from the demo:


    navigator.mediaDevices.getUserMedia(constraints)
      .then(function(stream) {
        var videoTracks = stream.getVideoTracks();
        console.log('Got stream with constraints:', constraints);
        console.log('Using video device: ' + videoTracks[0].label);
        stream.onended = function() {
          console.log('Stream ended');
        };
        window.stream = stream; // make variable available to console
        video.srcObject = stream;
      })
      .catch(function(error) {
        // ...
      }


### Flag waiving

The `enumerateDevices()` method is 'flagless' in Chrome, whereas for
`MediaDevices.getUserMedia()` you still need to enable **Experimental Web
Platform features** in chrome://flags or use the following command line flag:


    --enable-blink-features=GetUserMedia


Likewise for `setSinkId()`: enable **Experimental Web Platform features** or use a flag:


    --enable-blink-features=AudioOutputDevices


More details about browser support below.

### The future

The proposed `ondevicechange` event handler does what it says: the `devicechange` event is fired when the set of
available devices changes, and in a handler you can call `enumerateDevices()` to
get the new list of devices. This hasn't been implemented in any browser
yet.

The [Screen Capture
draft](https://w3c.github.io/mediacapture-screen-share/#example) is an extension
to the Media Capture API which proposes a `MediaDevices.getDisplayMedia()` method
that enables regions of a user's display to be used as the source of a media
stream. There is also a `MediaDevices` extension proposal for
[`getSupportedConstraints()`](https://w3c.github.io/mediacapture-main/#mediadevices-interface-extensions)
, which provides information about what constraints could be used for a
`getUserMedia()` call: audio and video capabilities supported by the browser.

### Demos

* [getUserMedia()](https://webrtc.github.io/samples/src/content/getusermedia/gum/){: .external }
* enumerateDevices():
    * [Select sources &amp; outputs](https://webrtc.github.io/samples/src/content/devices/input-output/)
    * [Output device
      selection](https://webrtc.github.io/samples/src/content/devices/multi/){: .external }
* [MediaDevices shim](https://github.com/webrtc/adapter)

### Find out more

* [Mozilla Developer Network: Media
  Devices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
* [Implementation
  status](https://www.chromestatus.com/features/4906859072847872)
* Media Capture and Streams Editor's Draft:
  [MediaDevices](https://w3c.github.io/mediacapture-main/#mediadevices)
* [Audio Output Devices API](http://www.w3.org/TR/audio-output)





{% include "comment-widget.html" %}
