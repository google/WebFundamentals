project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Optimize Images" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-06-20 #}
{# wf_blink_components: N/A #}

# Optimize Images  {: .page-title }

## Overview {: #overview }

Optimized images load faster and consume less cellular data.

Note: This audit only tests JPEG and WebP images.

## Recommendations {: #recommendations }

Click **View details** to see each image that can be optimized.
To pass the audit, set the compression level to 92 or lower for each JPEG image, and 85 or lower for each WebP image.

See [Image Optimization][IO] to learn more about the topic in general.

[IO]: /web/fundamentals/performance/optimizing-content-efficiency/image-optimization

Web services like [TinyJPG](https://tinyjpg.com/) can help automate the
process of image optimization.

## More information {: #more-info }

Lighthouse collects each JPEG or WebP image on the page, sets its quality to the maximum permissible level (92 for JPEG and 85 for WebP), and then compares the original version with the compressed
version. If the potential savings are 4KB or greater, Lighthouse includes the
image in its report.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/uses-optimized-images.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
