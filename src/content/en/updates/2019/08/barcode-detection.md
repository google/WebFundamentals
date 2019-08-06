project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Barcode Detection API allows for barcodes to be detected in images.

{# wf_updated_on: 2019-08-06 #}
{# wf_published_on: 2019-08-01 #}
{# wf_tags: capabilities,shape-detection,progressive-web-apps,webapp #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: The Barcode Detection API allows for barcodes to be detected in images. #}
{# wf_blink_components: Blink>ShapeDetection #}

# Shipping the Barcode Detection Part of the Shape Detection API {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

Success: We were working on the specification for this API as part of the
[capabilities project](/web/updates/capabilities). Following a successful Origin Trial,
barcode detection has now launched.

You may remember [my post from January](../01/shape-detection)
on the [Shape Detection API](https://wicg.github.io/shape-detection-api),
an API that defines three interfaces: `BarcodeDetector`, `FaceDetector`,
and `TextDetector`. I'm now happy to share that following a successful Origin Trial,
we're shipping the `BarcodeDetector` part of the Shape Detection API in Chrome&nbsp;78.
The `FaceDetector` and the `TextDetector` interface still need some more fine-tuning.

### Working With the `BarcodeDetector` {: #barcodedetector}

Let's briefly recall how working with the `BarcodeDetector` looks like:

```js
const barcodeDetector = new BarcodeDetector();
try {
  const barcodes = await barcodeDetector.detect(image);
  barcodes.forEach(barcode => console.log(barcode));
} catch (err) {
  console.error('Barcode detection failed:', err);
}
```

## Current Status {: #status }

| Step                                       | Status                               |
| ------------------------------------------ | ------------------------------------ |
| 1. Create explainer                        | [Complete][explainer]                |
| 2. Create initial draft of specification   | [Complete][spec]                     |
| 3. Gather feedback & iterate on design     | [Complete][wicg-discourse]           |
| 4. Origin trial                            | [Complete][ot]                       |
| 5. **Launch**                              | **Complete**                         |

### Origin Trial Feedback Summary

The primary feedback during the Origin Trial was around the limited availability
of barcode detection support across the various Blink platforms.
In response to this feedback, we've now added a new static `getSupportedFormats()` method
to more easily allow developers to detect when the current platform supports
the desired formats, and when a polyfill is necessary.
We've also hooked up the `formats` hint options parameter to the underlying implementation,
which allows it to optimize for detecting only the formats specified.
The code sample below shows how the new method could be used to detect QR codes
(among several
[other possible barcode formats](https://wicg.github.io/shape-detection-api/#enumdef-barcodeformat)).

```js
// 🆕 Check if the platform supports QR codes.
if ((await BarcodeDetector.getSupportedFormats()).includes('qr_code')) {
  // Initialize the barcode detector. As this could be costly,
  // do this only once and from thereon reuse the instance.
  const barcodeDetector = new BarcodeDetector({
    // Hint at the format(s) we're after, allowing the implementation
    // to optimize and only run detection for the mentioned format(s).
    formats: ['qr_code']
  });
  try {
    // Try to decode QR codes.
    const detectedCodes = await barcodeDetector.detect(someImage);
    console.log(detectedCodes);
  } catch (err) {
    // Handle potential errors.
    console.error(err);
  }
} else {
  // Load a polyfill in form of a JavaScript-based QR code library.
}
```

### Barcode Detection Demo

To see the new `getSupportedFormats` method (and of course barcode detection itself) in action,
head over to this [simple demo][demo].
For a more advanced real-world Progressive Web App
that you can actually install to your device's home screen,
check out [QR Snapper](https://qrsnapper.com/).

### Perception Toolkit

An exciting software package that leverages barcode detection is the
[Perception Toolkit](https://perceptiontoolkit.dev/), an open-source library
that provides the tools for you to add an augmented experience to your website.
The toolkit works by taking a stream from the device camera,
and passing it through a set of detectors, one of which is for barcodes.
For more details, read the
[*Getting Started* guide](https://perceptiontoolkit.dev/getting-started/)
and head over to the
[GitHub repo](https://github.com/GoogleChromeLabs/perception-toolkit/).

### Conclusion

The way from a first feature idea to a fully standardized and shipping API can be long.
While we're still iterating on face detection and text detection,
we're extremely happy that barcode detection has made it and is now a first-class browser API.
Please share what you create with it, we can't wait to see the cool new apps you build!

### Helpful Links

* [Public explainer][explainer]
* [API Demo][demo]
* [Tracking bug][cr-bug]
* [ChromeStatus.com entry][cr-status]
* Blink Component: `Blink>ShapeDetection`

### Acknowledgements

Thanks to [@kyarik](https://github.com/kyarik) and [Reilly Grant](https://github.com/reillyeon)
for their reviews of this article.

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[spec]: https://wicg.github.io/shape-detection-api
[issues]: https://github.com/WICG/shape-detection-api/issues
[demo]: https://glitch.com/~codelab-barcode-detection
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=728474
[cr-status]: https://www.chromestatus.com/feature/4757990523535360
[explainer]: https://docs.google.com/document/d/1QeCDBOoxkElAB0x7ZpM3VN3TQjS1ub1mejevd2Ik1gQ/edit
[wicg-discourse]: https://discourse.wicg.io/t/rfc-proposal-for-face-detection-api/1642/3
[ot]: https://developers.chrome.com/origintrials/#/view_trial/-2341871806232657919
