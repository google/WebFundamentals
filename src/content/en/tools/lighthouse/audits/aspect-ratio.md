project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Displays Images With Incorrect Aspect Ratio" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2018-01-03 #}
{# wf_blink_components: N/A #}

# Displays Images With Incorrect Aspect Ratio  {: .page-title }

## Overview {: #overview }

If a rendered image has a significantly different aspect ratio from the aspect ratio in its
source file (the "natural" aspect ratio), then the rendered image may look distorted, possibly
creating an unpleasant user experience.

## Recommendations {: #recommendations }

* Avoiding setting the width or height of an element as a percentage of a variably-sized
  container.
* Avoid setting explicit width or height values that differ from the source image's dimensions.
* Consider using [css-aspect-ratio](https://www.npmjs.com/package/css-aspect-ratio) or
  [Aspect Ratio Boxes](https://css-tricks.com/aspect-ratio-boxes/) to help preserve aspect
  ratios.
* When possible, it's a good practice to specify image width and height in HTML, so that the
  browser can allocate space for the image, which prevents it from jumping around as the page
  loads. It's more optimal to specify width and height in HTML rather than CSS, because the
  browser allocates space before parsing the CSS. In practice this approach can be difficult
  if you're working with responsive images, because there's no way to specify width and height
  until you know the viewport dimensions.

### Inspecting rendered images with incorrect aspect ratios {: #inspecting }

Chrome DevTools can show you the CSS declarations that affect an image's aspect ratio.
See [View only the CSS that's actually applied to an element][DevTools].

[DevTools]: /web/tools/chrome-devtools/css/reference#computed

## More information {: #more-info }

Lighthouse flags any image that has a rendered aspect ratio which is 5 percent or more different
than its natural ratio.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/image-aspect-ratio.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
