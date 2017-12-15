project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Serve Images in Next-Gen Formats" Lighthouse audit.

{# wf_updated_on: 2017-12-15 #}
{# wf_published_on: 2017-06-20 #}
{# wf_blink_components: N/A #}

# Serve Images in Next-Gen Formats  {: .page-title }

## Overview {: #overview }

JPEG 2000, JPEG XR, and WebP are image formats that have superior compression and quality
characteristics compared to their older JPEG and PNG counterparts. Encoding your images
in these formats rather than JPEG or PNG means that they will load faster and consume
less cellular data.

WebP is supported in Chrome and Opera and provides better lossy and lossless compression
for images on the web. See [A New Image Format For The Web](/speed/webp/) for more on
WebP.

## Recommendations {: #recommendations }

Click **View Details** to see the potential savings of encoding your page's
images with WebP rather than JPEG or PNG. To pass this audit, encode all of
these images in WebP.

Browser support is not universal for WebP, but similar savings should be available in
most major browsers in an alternative next-gen format. You'll need to serve a fallback PNG
or JPEG image for other browser support. See [How can I detect browser
support for WebP?][fallback] for an overview of fallback techniques and the table below for browser support of image formats.

[fallback]: /speed/webp/faq#how_can_i_detect_browser_support_for_webp

| Browser | WebP | JPEG 2000 | JPEG XR | JPEG | PNG |
| -- | :--: | :--: | :--: | -- | -- |
| Chrome | ✓ | | | ✓ | ✓ |
| Edge/IE | | | ✓ | ✓ | ✓ |
| Firefox | | | | ✓ | ✓ |
| Opera | ✓ | | | ✓ | ✓ |
| Safari | | ✓ |  | ✓ | ✓ |

## More information {: #more-info }

Lighthouse collects each BMP, JPEG, and PNG image on the page, and then converts
each to WebP. Lighthouse omits the image from its report if the potential
savings are less than 8KB.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/uses-webp-images.js

## Feedback {: #feedback }

{% framebox width="auto" height="auto" enable_widgets="true" %}
<script>
var label = 'WebP / Helpful';
var url = 'https://github.com/google/webfundamentals/issues/new?title=[' +
      label + ']';
var feedback = {
  "category": "Lighthouse",
  "choices": [
    {
      "button": {
        "text": "This Doc Was Helpful"
      },
      "response": "Thanks for the feedback.",
      "analytics": {
        "label": label
      }
    },
    {
      "button": {
        "text": "This Doc Was Not Helpful"
      },
      "response": 'Sorry to hear that. Please <a href="' + url +
          '" target="_blank">open a GitHub issue</a> and tell us how to ' +
          'make it better.',
      "analytics": {
        "label": label,
        "value": 0
      }
    }
  ]
};
</script>
{% include "web/_shared/multichoice.html" %}
{% endframebox %}
