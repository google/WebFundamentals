project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: `ImageCapture` is an API for controlling camera settings and taking photos.

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}
{# wf_tags: canvas,chrome56,media,webrtc #}
{# wf_featured_image: /web/updates/images/2016/12/imagecapture/featured.jpg #}
{# wf_featured_snippet: `ImageCapture` is an API for controlling camera settings and taking photos. #}

<style>
video {
  max-width: 100%;
}
</style>

# Take photos {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

`ImageCapture` is an API for controlling camera settings and taking photos.

The API has four methods:

* `takePhoto()` returns a `Blob` which can be downloaded, stored by the browser or displayed in an img element.
* `grabFrame()` returns an `ImageData` object that can be post-processed.
* `getPhotoCapabilities()` returns a `PhotoCapabilities` object that provides access to available camera options and their current values.
* `setOptions()` is used to configure [camera settings](http://www.w3.org/TR/image-capture/#photosettings) such as zoom, white balance or focus mode.

`ImageCapture` accesses cameras via `getUserMedia()`:

    navigator.mediaDevices.getUserMedia({video: true})
      .then(gotMedia)
      .catch(error => console.error('getUserMedia() error:', error));

    function gotMedia(mediaStream){
      const mediaStreamTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);
      console.log(imageCapture);
    }

NOTE: To choose between different cameras, such as the front and back camera on a phone, get a list of available cameras via the `MediaDevices.enumerateDevicesMethod()`, then set `deviceId` in `getUserMedia()` constraints.

You can use `takePhoto()` to get a still image and then set it as the `src` of an `<img>`:

    imageCapture.takePhoto()
      .then(blob => {
        image.src = URL.createObjectURL(blob);
      })
      .catch(error => console.error('takePhoto() error:', error));

Use `grabFrame()` to get data for a frame of video and then draw it on a `<canvas>`:

    imageCapture.grabFrame()
      .then(imageData => {
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        canvas.getContext('2d').drawImage(imageData, 0, 0);
      })
      .catch(error => console.error('grabFrame() error:', error));

The full range of possible camera resolutions for still images can be accessed via the MediaSettingsRange values for `captureDevice.photoCapabilities.imageHeight` and `imageWidth`. Note that the minimum and maximum width and height constraints for `getUserMedia()` are for video, which may be less than the camera capabilities for still images. In other words, you may not be able to access the full resolution capabilities of your device when saving from `getUserMedia()` to a canvas. See the example at https://webrtc.github.io/samples/src/content/getusermedia/resolution.)


## Demos


## Support


## Find out more


{% include "comment-widget.html" %}
