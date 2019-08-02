project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Barcode Detection API allows for barcodes to be detected in images.

{# wf_updated_on: 2019-08-02 #}
{# wf_published_on: 2019-08-01 #}
{# wf_tags: capabilities,shape-detection,progressive-web-apps,webapp #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: The Barcode Detection API allows for barcodes to be detected in images. #}
{# wf_blink_components: Blink>ImageCapture #}

# Shipping the Barcode Detection Part of the Shape Detection API {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

You may remember [my post from January](../01/shape-detection)
on the [Shape Detection API](https://wicg.github.io/shape-detection-api),
an API that defines three interfaces: the `BarcodeDetector`, the `FaceDetector`,
and the `TextDetector` interface. I'm now happy to share that following a successful Origin Trial
we're shipping the `BarcodeDetector` part of the Shape Detection API in Chrome&nbsp;78.
The `FaceDetector` and the `TextDetector` interface still need some more fine-tuning.

### Working with the `BarcodeDetector` {: #barcodedetector}

Let's briefly recall how working with the `BarcodeDetector` looks like:

```js
const barcodeDetector = new BarcodeDetector();
try {
  const barcodes = await barcodeDetector.detect(image);
  barcodes.forEach(barcode => console.log(barcode));
} catch (e) {
  console.error('Barcode detection failed:', e);
}
```

### Origin Trial Feedback Summary

The primary feedback during the Origin Trial was around the limited availability
of barcode detection support across Blink platforms.
In response to this feedback, we have now added a new static `getSupportedFormats()` method
to more easily allow developers to detect when the current platform supports
the desired formats and when a polyfill is necessary.
The code sample below shows how this new method could be used to detect QR codes
(among several
[other possible barcode formats](https://wicg.github.io/shape-detection-api/#enumdef-barcodeformat)).

```js
// 🆕 Check if the platform supports QR codes
if ((await BarcodeDetector.getSupportedFormats()).includes('qr_code')) {
  try {
    // If it does, try to decode the QR code
    const detectedCodes = await (new BarcodeDetector()).detect(someImage, {
      formats: ['qr_code']
    });
    console.log(detectedCodes);
  } catch (err) {
    // Handle potential errors
    console.error(err);
  }
} else {
  // Load polyfill
}
```

### Barcode Detection Demo

To see the new `getSupportedFormats` method (and of course barcode detection itself) in action,
head over to this [simple demo](https://glitch.com/~codelab-barcode-detection).
For a more advanced real-world Progressive Web App
that you can actually install to your device's home screen,
check out [QR Snapper](https://qrsnapper.com/).

### Conclusion

The way from a first feature idea to a fully standardized and shipping API can be long.
While we're still iterating on face detection and text detection,
we're extremely happy that barcode detection has made it and is now a first-class browser API.
Please share what you create with it, we can't wait to see the cool new apps you build!

### Helpful Links

[spec]: https://wicg.github.io/shape-detection-api
[issues]: https://github.com/WICG/shape-detection-api/issues
[demo]: https://shape-detection-demo.glitch.me/
[demo-source]: https://glitch.com/edit/#!/shape-detection-demo
[cr-bug]: https://bugs.chromium.org/p/chromium/issues/detail?id=728474
[cr-status]: https://www.chromestatus.com/feature/4757990523535360
[explainer]: https://docs.google.com/document/d/1QeCDBOoxkElAB0x7ZpM3VN3TQjS1ub1mejevd2Ik1gQ/edit
[wicg-discourse]: https://discourse.wicg.io/t/rfc-proposal-for-face-detection-api/1642/3
[ot]: https://developers.chrome.com/origintrials/#/view_trial/-2341871806232657919

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
