project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Properly Size Images" Lighthouse audit.

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2017-04-25 #}
{# wf_blink_components: N/A #}

# Properly Size Images  {: .page-title }

## Overview {: #overview }

Ideally, your page should never serve images that are larger than the
version that's rendered on the user's screen. Anything larger than that
just results in wasted bytes and slows down page load time.

## Recommendations {: #recommendations }

In the results of this audit, Lighthouse lists every image that failed.
Refactor how you serve these images to pass the audit.

The main strategy for serving appropriately-sized images is called
"responsive images". With responsive images, you generate multiple versions
of each image, and then specify which version to use in your HTML or CSS using
media queries, viewport dimensions, and so on. See [Images in markup][iim]
or [Images in CSS][iic] to learn more.

[iim]: /web/fundamentals/design-and-ux/responsive/images#images_in_markup
[iic]: /web/fundamentals/design-and-ux/responsive/images#images_in_css

Another strategy is to use vector-based image formats, like SVG. With a
finite amount of code, an SVG image can scale to any size. See [Replace
complex icons with SVG][svg] to learn more.

[svg]: /web/fundamentals/design-and-ux/responsive/images#replace_complex_icons_with_svg

Yet another strategy is called "client hints". With client hints, the browser
advertises its viewport dimensions and device pixel ratio when requesting
the image, and the server takes care of serving the correctly-sized image.
Note however, that browser support is limited. See [Automating Resource
Selection With Client Hints][ch] to learn more.

[ch]: /web/updates/2015/09/automating-resource-selection-with-client-hints

Tools like [gulp-responsive][gr] or [responsive-images-generator][rig] can
help automate the process of converting an image into multiple formats.
There are also image CDNs which let you generate multiple versions, either
when you upload an image, or request it from your page.

[gr]: https://www.npmjs.com/package/gulp-responsive
[rig]: https://www.npmjs.com/package/responsive-images-generator

## More information {: #more-info }

For each image on the page, Lighthouse compares the size of the rendered image
against the size of the actual image. The rendered size also accounts
for device pixel ratio. If the rendered size is at least 25KB smaller than
the actual size, then the image fails the audit.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
