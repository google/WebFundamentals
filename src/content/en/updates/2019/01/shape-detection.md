project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Shape Detection API allows for faces, barcodes, and text to be detected in images.

{# wf_updated_on: 2019-02-22 #}
{# wf_published_on: 2019-01-07 #}
{# wf_tags: capabilities,shape-detection,progressive-web-apps,webapp #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: The Shape Detection API allows for faces, barcodes, and text to be detected in images. #}
{# wf_blink_components: Blink>ImageCapture #}

# A Picture is Worth a Thousand Words, Faces, and Barcodes—The Shape Detection API {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

Warning: We’re currently working the specification for this API as part of the [capabilities
project](/web/updates/capabilities). We’ll keep this post updated as this new API moves from design
to implementation.

## What is the Shape Detection API? {: #what }

With APIs like
[`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
and the new Chrome for Android [photo
picker](https://bugs.chromium.org/p/chromium/issues/detail?id=656015), it has become fairly easy to
capture images or live video data from device cameras, or to upload local images. So far, this
dynamic image data—as well as static  images on a page—has been opaque, even though images may
actually contain a lot of interesting features such as faces, barcodes, and text.

In the past, if developers wanted to extract such features on the client side, for example to build
a [QR code reader](https://qrsnapper.appspot.com/), they had to rely on external JavaScript
libraries. This could be expensive from a performance point of view and increase the overall page
weight. On the other side, operating systems including Android, iOS, and macOS, but also hardware
chips found in camera modules, typically already have performant and highly optimized feature
detectors such as the Android
[`FaceDetector`](https://developer.android.com/reference/android/media/FaceDetector) or the iOS
generic feature detector
[`CIDetector`](https://developer.apple.com/documentation/coreimage/cidetector?language=objc).

The Shape Detection API opens up these native implementations and exposes them through a set of
JavaScript interfaces. Currently, the supported features are face detection through the
`FaceDetector` interface, barcode detection through the `BarcodeDetector` interface, and text
detection (Optical Character Recognition, [OCR]) through the `TextDetector` interface.

Note: Text detection, despite being an interesting field, is not considered stable enough across
either computing platforms or character sets to be standardized at the moment, which is why text
detection has been moved to a separate [informative
specification](https://wicg.github.io/shape-detection-api/text.html).

[Read explainer][explainer]{: .button .button-primary }

### Suggested use cases for the Shape Detection API {: #use-cases }

As outlined above, the Shape Detection API currently supports the detection of faces, barcodes, and
text. The following bullet list contains examples of use cases for all three features.

* Face detection
    - Online social networking or photo sharing sites commonly let their users annotate people in
      images. By highlighting the boundaries of detected faces, this task can be facilitated.
    - Content sites can dynamically crop images based on potentially detected faces rather than rely
      on other heuristics, or highlight detected faces with
      [Ken Burns](https://en.wikipedia.org/wiki/Ken_Burns_effect) panning and zooming effects in
      story-like formats.
    - Multimedia messaging sites can allow their users to overlay funny objects like
      [sunglasses or mustaches](https://beaufortfrancois.github.io/sandbox/media-recorder/mustache.html)
      on detected face landmarks.

* Barcode detection
    - Web applications that read QR codes can unlock interesting use cases like online payments or
      web navigation, or use barcodes for establishing social connections on messenger applications.
    - Shopping apps can allow their users to scan
      [EAN](https://en.wikipedia.org/wiki/International_Article_Number) or
      [UPC](https://en.wikipedia.org/wiki/Universal_Product_Code) barcodes of items in a physical
      store to compare prices online.
    - Airports can expose web kiosks where passengers can scan their boarding passes’
      [Aztec codes](https://en.wikipedia.org/wiki/Aztec_Code) to show personalized information
      related to their flights.

* Text detection
    - Online social networking sites can improve the accessibility of user-generated image content
      by adding detected texts as `img[alt]` attribute values when no other descriptions are
      provided.
    - Content sites can use text detection to avoid placing headings on top of hero images with
      contained text.
    - Web applications can use text detection to translate texts, for example, to translate
      restaurant menus.

## Current status {: #status }

| Step                                       | Status                       |
| ------------------------------------------ | ---------------------------- |
| 1. Create explainer                        | [Complete][explainer]        |
| 2. Create initial draft of specification   | [In Progress][spec]          |
| 3. Gather feedback & iterate on design     | [In progress](#feedback)     |
| **4. Origin trial**                        | [**In progress**](ot)        |
| 5. Launch                                  | Not started                  |

## How to use the Shape Detection API {: #use }

Note: The origin trial is expected to end in Chrome 74 and the API will be turned off while we integrate
developer feedback. You can always use the Shape Detection API for local experiments by enabling the
[`enable-experimental-web-platform-features` flag 🚩](chrome://flags/#enable-experimental-web-platform-features).

The interfaces of all three detectors, the `FaceDetector`, the `BarcodeDetector`, and the
`TextDetector`, are very similar. They all provide a single asynchronous method `detect` that takes
an
[`ImageBitmapSource`](https://html.spec.whatwg.org/multipage/imagebitmap-and-animations.html#imagebitmapsource)
as an input (that is, either a
[`CanvasImageSource`](https://html.spec.whatwg.org/multipage/canvas.html#canvasimagesource),  a
[`Blob`](https://w3c.github.io/FileAPI/#dfn-Blob), or
[`ImageData`](https://html.spec.whatwg.org/multipage/canvas.html#imagedata)).

In the case of `FaceDetector` and `BarcodeDetector`, optional parameters can be passed to the
detector’s constructor that allow for providing hints to the underlying native detectors.

Note: Please carefully check the support matrix in the [Explainer](https://github.com/WICG/shape-detection-api#overview)
for a detailed overview of the different platforms.

Note: If your `ImageBitmapSource` has an [effective script
origin](https://html.spec.whatwg.org/multipage/#concept-origin) which is not the same as the
document’s effective script origin, then attempts to call `detect` will fail with a new
[`DOMException`](https://heycam.github.io/webidl/#idl-DOMException) whose name is SecurityError. If
your image origin supports CORS, you can use the
[`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)
attribute to request CORS access.

### Working with the `FaceDetector` {: #facedetector}

```js
const faceDetector = new FaceDetector({
  // (Optional) Hint to try and limit the amount of detected faces
  // on the scene to this maximum number.
  maxDetectedFaces: 5,
  // (Optional) Hint to try and prioritize speed over accuracy
  // by, e.g., operating on a reduced scale or looking for large features.
  fastMode: false
});
try {
  const faces = await faceDetector.detect(image);
  faces.forEach(face => console.log(face));
} catch (e) {
  console.error('Face detection failed:', e);
}
```
### Working with the `BarcodeDetector` {: #barcodedetector}

```js
const barcodeDetector = new BarcodeDetector({
  // (Optional) A series of barcode formats to search for.
  // Not all formats may be supported on all platforms
  formats: [
    'aztec',
    'code_128',
    'code_39',
    'code_93',
    'codabar',
    'data_matrix',
    'ean_13',
    'ean_8',
    'itf',
    'pdf417',
    'qr_code',
    'upc_a',
    'upc_e'
  ]
});
try {
  const barcodes = await barcodeDetector.detect(image);
  barcodes.forEach(barcode => console.log(barcode));
} catch (e) {
  console.error('Barcode detection failed:', e);
}
```

### Working with the `TextDetector` {: #textdetector}

```js
const textDetector = new TextDetector();
try {
  const texts = await textDetector.detect(image);
  texts.forEach(text => console.log(text));
} catch (e) {
  console.error('Text detection failed:', e);
}
```

## Feature detection {: #featuredetection}

Purely checking for the existence of the constructors to feature detect the Shape Detection
API doesn’t suffice, as Chrome on Linux and Chrome OS currently still expose the detectors, but
they are known to not work ([bug](https://crbug.com/920961)). As a temporary measure, we instead
recommend doing feature detection like this:

```js
const supported = await (async () => 'FaceDetector' in window &&
    await new FaceDetector().detect(document.createElement('canvas'))
    .then(_ => true)
    .catch(e => e.name === 'NotSupportedError' ? false : true))();
```

## Best practices {: #bestpractices}

All detectors work asynchronously, that is, they are not blocking the main thread 🎉, so don’t rely
on realtime detection, but rather allow for some time for the detector to do its work.

If you are a fan of [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
(and who isn’t?), the good news is that the detectors are exposed there as well. The detection
results are serializable and can thus be passed back from the worker to the main app via
`postMessage`. The [demo][demo] shows this in action.

Not all platform implementations support all features, so be sure to check the support situation
carefully and see the API more like a progressive enhancement. For example, some platforms might
support face detection per se, but not face landmark detection (eyes, nose, mouth,…); or the
existence and the location of text may be recognized, but not the actual text contents.

Note: This API is an optimization and not something guaranteed to be available from the platform
for every user. Developers are expected to combine this with their own image recognition code and
take advantage of the native optimization when it is available.

## Feedback {: #feedback }

We need your help to ensure that the Shape Detection API works in a way that meets your needs and
that we’re not missing any key scenarios.

<aside class="key-point">
<b>We need your help!</b> - Will the current design of the Shape Detection API meet your needs? If
it won’t, please file an issue in the <a href="https://github.com/WICG/shape-detection-api">Shape
Detection API repo</a> and provide as much detail as you can.
</aside>

We’re also interested to hear how you plan to use the Shape Detection API:

* Have an idea for a use case or an idea where you’d use it?
* Do you plan to use this?
* Like it, and want to show your support?

Share your thoughts on the [Shape Detection API WICG Discourse][wicg-discourse] discussion.

## Helpful Links {: #helpful }

* [Public explainer][explainer]
* [API Demo][demo] | [API Demo source][demo-source]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `Blink>ImageCapture`

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/shape-detection-api
[issues]: https://github.com/WICG/shape-detection-api/issues
[demo]: https://shape-detection-demo.glitch.me/
[demo-source]: https://glitch.com/edit/#!/shape-detection-demo
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=728474
[cr-status]: https://www.chromestatus.com/feature/4757990523535360
[explainer]: https://docs.google.com/document/d/1QeCDBOoxkElAB0x7ZpM3VN3TQjS1ub1mejevd2Ik1gQ/edit
[wicg-discourse]: https://discourse.wicg.io/t/rfc-proposal-for-face-detection-api/1642/3
[ot]: https://developers.chrome.com/origintrials/#/view_trial/-2341871806232657919
