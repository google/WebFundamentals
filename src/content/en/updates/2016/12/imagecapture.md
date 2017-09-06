project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Image Capture is an API to control camera settings and take photos.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}
{# wf_tags: canvas,chrome56,media,webrtc #}
{# wf_featured_image: /web/updates/images/2016/12/imagecapture/featured.jpg #}
{# wf_featured_snippet: Image Capture is an API to control camera settings and take photos. #}

# Take Photos and Control Camera Settings {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

Image Capture is an API to capture still images and configure camera hardware
settings.

The API enables control over camera features such as zoom, focus mode,
contrast, ISO and white balance. Best of all, Image Capture allows you to access
the full resolution capabilities of any available device camera or webcam.
Previous techniques for taking photos on the Web have used video snapshots,
which are lower resolution than that available for still images.

Image Capture is available in Chrome 56 on Android and desktop as an
[Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md),
or in Chrome Canary on desktop and Android with **Experimental Web Platform**
features enabled.

The API has four methods:

* `takePhoto()` returns a `Blob`, [the result of a single photographic exposure](https://www.w3.org/TR/image-capture/#dom-imagecapture-takephoto),
which can be downloaded, stored by the browser or displayed in an `img` element.
This method uses the highest available photographic camera resolution.
* `grabFrame()` returns an `ImageBitmap` object,
[a snapshot of live video](https://www.w3.org/TR/image-capture/#dom-imagecapture-grabframe),
which could (for example) be drawn on a canvas and then post-processed to
selectively change color values. Note that the `ImageBitmap` will only have the
resolution of the video source — which will be lower than the camera's
still-image capabilities.
* `getPhotoCapabilities()` returns a `PhotoCapabilities` object that provides
access to available camera options and their current values.
* `setOptions()` is used to configure
[camera settings](http://www.w3.org/TR/image-capture/#photosettings) such as
zoom, white balance or focus mode.

The Image Capture API gets access to a camera via a `MediaStream` from `getUserMedia()`:

    navigator.mediaDevices.getUserMedia({video: true})
      .then(gotMedia)
      .catch(error => console.error('getUserMedia() error:', error));

    function gotMedia(mediaStream) {
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      console.log(imageCapture);
    }

You can try out this code from the DevTools console.

Note: To choose between different cameras, such as the front and back camera on
a phone, get a list of available devices via the
`MediaDevices.enumerateDevices()` method, then set `deviceId` in `getUserMedia()`
constraints as per the demo [here](https://webrtc.github.io/samples/src/content/devices/input-output/).

You can use `takePhoto()` to get a still image and then set it as the `src` of
an `<img>`:

    const img = document.querySelector('img');
    // ...
    imageCapture.takePhoto()
      .then(blob => {
        img.src = URL.createObjectURL(blob);
      })
      .catch(error => console.error('takePhoto() error:', error));

Use `grabFrame()` to get data for a frame of video and then draw
it on a `<canvas>`:

    const canvas = document.querySelector('canvas');
    // ...
    imageCapture.grabFrame()
      .then(imageBitmap => {
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        canvas.getContext('2d').drawImage(imageBitmap, 0, 0);
      })
      .catch(error => console.error('grabFrame() error:', error));

## Camera capabilities

If you run the code above, you'll notice a difference in dimensions between the
`grabFrame()` and `takePhoto()` results.

The `takePhoto()` method gives access to the camera's maximum resolution.

`grabFrame()` just takes the next-available `VideoFrame` in the `MediaStream`
inside the renderer process, whereas `takePhoto()` interrupts the `MediaStream`,
reconfigures the camera, takes the photo (usually in a compressed format,
hence the `Blob`) and then resumes the `MediaStream`. In essence, this means
that `takePhoto()` gives access to the full still-image resolution
capabilities of the camera. Previously, it was only possible to 'take a photo' by
calling `drawImage()` on a `canvas` element, using a video as the source (as per the
example [here](https://webrtc.github.io/samples/src/content/getusermedia/canvas/)).

In this demo, the `<canvas>` dimensions are set to the resolution of the video
stream, whereas the natural size of the `<img>` is the maximum still-image
resolution of the camera. CSS, of course, is used to set the display
size of both.

The full range of available camera resolutions for still images can be get and set
using the `MediaSettingsRange` values for `PhotoCapabilities.imageHeight` and
`imageWidth`. Note that the minimum and maximum width and height constraints for
`getUserMedia()` are for video, which (as discussed) may be different from the
camera capabilities for still images. In other words, you may not be able to
access the full resolution capabilities of your device when saving from
`getUserMedia()` to a canvas. The WebRTC [resolution constraint
demo](https://webrtc.github.io/samples/src/content/getusermedia/resolution)
shows how to set `getUserMedia()` constraints for resolution.

## Anything else?

* The [**Shape Detection API**](https://www.chromestatus.com/feature/4757990523535360) works well with Image Capture: call `grabFrame()`
repeatedly to feed `ImageBitmap`s to a `FaceDetector` or `BarcodeDetector`. Find
out more about the API from Paul Kinlan's [blog post](https://paul.kinlan.me/face-detection/).

* The **Camera flash** (device light) can be accessed via
[`FillLightMode`](https://w3c.github.io/mediacapture-image/#FillLightMode).

## Demos and code samples
* [Chrome Samples demo](https://googlechrome.github.io/samples/image-capture/index.html)
* [simpl.info/ic](https://simpl.info/ic)
* [WebRTC samples](https://webrtc.github.io/samples)

## Support
* Chrome 56 on Android and desktop as an [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Chrome Canary on Android and desktop with **Experimental Web Platform** features enabled.

## Find out more
* [Image Capture spec](https://www.w3.org/TR/image-capture/)
* [Image Capture implementation status](https://github.com/w3c/mediacapture-image/blob/gh-pages/implementation-status.md)
* [Shape Detection API](https://wicg.github.io/shape-detection-api/#introduction)
* [Shape Detection explainer and readme](https://github.com/WICG/shape-detection-api)
* [Face detection demo](https://codepen.io/miguelao/pen/VKOPdX)
* [Barcode detection demo](https://codepen.io/miguelao/pen/bBWOzM)

{% include "comment-widget.html" %}
