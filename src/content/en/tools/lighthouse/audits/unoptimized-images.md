project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Unoptimized Images" Lighthouse audit.

{# wf_updated_on: 2017-04-20 #}
{# wf_published_on: 2017-04-20 #}

# Unoptimized Images  {: .page-title }

## Why the audit is important {: #why }

Optimized images take less time to download, resulting in faster page
loads. Page load time is one of the most important metrics for how users
perceive the performance of your site. See [Load: Deliver content under
1000ms](/web/fundamentals/performance/rail#load) to learn more.

## How to pass the audit {: #how }

There are two types of images: vector and raster. See [Vector vs. raster
images][overview] for an overview.

[overview]: /web/fundamentals/performance/optimizing-content-efficiency/image-optimization#vector_vs_raster_images

For simple geometric shapes like logos, use a vector format like SVG, as it
can significantly reduce file size.

For complex images like photos, use WebP wherever possible. Browser support
is not universal, though, so you'll need to use fallback mechanisms when
WebP is not available. See [How can I detect browser support for
WebP?][fallback] for an overview of techniques.

[fallback]: /speed/webp/faq#how_can_i_detect_browser_support_for_webp

To determine how to encode your fallback image, in other words when to use
PNG versus JPEG, see [Selecting the right image format][select].

[select]: /web/fundamentals/performance/optimizing-content-efficiency/image-optimization#selecting_the_right_image_format

Remember to optimize your fallback images, too. See [Tools and parameter
tuning][tools] for some examples of optimization tools.

[tools]: /web/fundamentals/performance/optimizing-content-efficiency/image-optimization#tools_and_parameter_tuning

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse optimizes each image it finds on the page, and then compares
the version used on the page against its own optimized version. The audit
fails when one of the following conditions is met:

* A JPEG image could be at least 10KB smaller if its quality is set to 80
  and its metadata is removed.
* An image could be at least 100KB smaller if it is encoded in WebP.
* The savings of encoding all images in WebP is greater than 1MB.

{% include "web/tools/lighthouse/audits/_feedback/unoptimized-images.html" %}
