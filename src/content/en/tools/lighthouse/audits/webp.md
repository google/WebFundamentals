project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Serve Images As WebP" Lighthouse audit.

{# wf_updated_on: 2017-12-11 #}
{# wf_published_on: 2017-06-20 #}
{# wf_blink_components: N/A #}

# Serve Images As WebP  {: .page-title }

## Overview {: #overview }

WebP is a new image format that provides better lossy and lossless compression
for images on the web, compared to PNG and JPEG. Encoding your images in WebP
rather than JPEG or PNG means that they will load faster and consume less
cellular data. See [A New Image Format For The Web](/speed/webp/) for more on
WebP.

## Recommendations {: #recommendations }

Click **View Details** to see the potential savings of encoding your page's
images with WebP rather than JPEG or PNG. To pass this audit, encode all of
these images in WebP.

Browser support is not universal for WebP. You'll need to serve a fallback PNG
or JPEG image when WebP is not available. See [How can I detect browser
support for WebP?][fallback] for an overview of fallback techniques.

[fallback]: /speed/webp/faq#how_can_i_detect_browser_support_for_webp

## More information {: #more-info }

Lighthouse collects each JPEG and PNG image on the page, and then converts
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
