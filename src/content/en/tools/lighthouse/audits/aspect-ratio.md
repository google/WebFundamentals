project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Displays Images With Incorrect Aspect Ratio" Lighthouse audit.

{# wf_updated_on: 2017-12-14 #}
{# wf_published_on: 2017-12-14 #}
{# wf_blink_components: N/A #}

# Displays Images With Incorrect Aspect Ratio  {: .page-title }

## Overview {: #overview }

If a rendered image has a significantly different aspect ratio from the aspect ratio in its
source file (the "natural" aspect ratio), then the rendered image may look distorted, possibly
creating an unpleasant user experience.

## Recommendations {: #recommendations }

Use `vw` for *both* the width and height of images.

    img {
      width: 20vw;
      height: 20vw;
    }

`1vw` is equal to 1% of the width of the viewport. Adjust the width and height values based on
the aspect ratio that you want to maintain. For example, for an image that is twice as wide as
it is tall, you can preserve the aspect ratio by setting `width` to `20vw` and `height` to
`10vw`. The `vw` unit is well-supported in modern browsers. See [Can I use viewport
units?][caniuse] You could alternatively use the `vh` unit, which maps to the viewport height.

[caniuse]: https://caniuse.com/#feat=viewport-units

### Inspecting rendered images with incorrect aspect ratios {: #inspecting }

Chrome DevTools can show you the CSS declarations that affect an image's aspect ratio.
See [View only the CSS that's actually applied to an element][DevTools].

[DevTools]: /web/tools/chrome-devtools/css/reference#computed

## More information {: #more-info }

Lighthouse flags any image that has a rendered aspect ratio which is 5 percent or more different
than its natural ratio.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/image-aspect-ratio.js
