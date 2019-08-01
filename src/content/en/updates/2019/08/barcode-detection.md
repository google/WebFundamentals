project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: The Barcode Detection API allows for barcodes to be detected in images.

{# wf_updated_on: 2019-08-01 #}
{# wf_published_on: 2019-08-01 #}
{# wf_tags: capabilities,shape-detection,progressive-web-apps,webapp #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: The Barcode Detection API allows for barcodes to be detected in images. #}
{# wf_blink_components: Blink>ImageCapture #}

# Shipping the Barcode Detection Part of the Shape Detection API {: .page-title}

{% include "web/_shared/contributors/thomassteiner.html" %}

<div class="clearfix"></div>

You may remember my post from January on the [Shape Detection API](../01/shape-detection),
an API that defines three interfaces: the `BarcodeDetector`, the `FaceDetector`,
and the `TextDetector` interface. I'm now happy to say that following a successful Origin Trial
we're shipping the `BarcodeDetector` part in Chrome&nbsp;77.
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
In response to this feedback we added a `getSupportedFormats()` method
to more easily allow developers to detect when the current platform supports
the desired formats and when a polyfill is necessary.


