project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A guide on how to pass the "Optimize Images" Lighthouse audit.

{# wf_updated_on: 2018-12-17 #}
{# wf_published_on: 2017-06-20 #}
{# wf_blink_components: N/A #}

[edit]: https://github.com/google/WebFundamentals/edit/master/src/content/en/tools/lighthouse/audits/optimize-images.md

# Optimize Images  {: .page-title }

A guide on how to pass the *Optimize Images* Lighthouse audit.

## Overview {: #overview }

Optimized images load faster and consume less cellular data.

Note: This audit only tests JPEG and BMP images.

## Recommendations {: #recommendations }

Warning: None of the tools or services mentioned on this page have been audited.
Do your own due diligence.

Note: Want to add a service or tool to one of the lists below? [Edit this page][edit]{: .external target="_blank" rel="noopener" }.

Click **View details** to see each JPEG or BMP image that can be optimized.
Optimize each of these images in order to pass this audit.

[EIO]: https://images.guide/

The canonical guide for image optimization is [Essential Image Optimization][EIO]{: .external rel="noopener" }.

### web.dev tutorials {: #webdev }

[web.dev](https://web.dev) has a collection of tutorials on the topic of optimizing images.
See [Optimize your images](https://web.dev/fast/#topic-Optimize-your-images).

### Explore different image formats {: #formats }

You might be able to yield significant savings just by changing image formats.
For example, SVG is often the best way to store simple logos:

    <?xml version="1.0" encoding="utf-8"?>
    <svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         x="0px" y="0px" viewBox="0 0 612 792" xml:space="preserve">
      <g id="XMLID_1_">
        <g>
          <circle fill="red" stroke="black" stroke-width="2" stroke-miterlimit="10"
                  cx="50" cy="50" r="40"/>
        </g>
      </g>
    </svg>

Because the image is defined geometrically, this SVG code can zoom and scale to any size.
And since it's stored as text, you can compress and minify the SVG.

[format]: https://images.guide/#choosing-an-image-format

See [How do I choose an image format?][format]{: .external target="_blank" rel="noopener" }
to understand when to use each image format.

### Provide multiple versions of an image {: #art-direction }

[picture]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture
[pete]: /web/fundamentals/design-and-ux/responsive/images#art_direction_in_responsive_images_with_picture

The [picture][picture]{: .external target="_blank" rel="noopener" } element enables you to tell
the browser to get a different version of an image, depending on the characteristic's
of the user's device. See [Art direction in responsive images with picture][pete].

### Image Optimization Web Services and CDNs {: #services }

[CDN]: https://images.guide/#image-processing-cdns

You might be better off letting a web service or CDN optimize your images for you.
See [Does an image processing CDN make sense for you?][CDN]{: .external target="_blank" rel="noopener" }
to understand if these options are right for you.

Image optimization CDNs:

* [Akamai Image Manager](https://www.akamai.com/us/en/products/web-performance/image-manager.jsp){: .external target="_blank" rel="noopener" }
* [imgix](https://www.imgix.com/){: .external target="_blank" rel="noopener" }
* [Image Engine](https://imageengine.io/){: .external target="_blank" rel="noopener" }
* [Cloudinary](https://cloudinary.com/){: .external target="_blank" rel="noopener" }
* [Uploadcare](https://uploadcare.com/){: .external target="_blank" rel="noopener" }

Image optimization APIs:

* [ShortPixel](https://shortpixel.com/){: .external target="_blank" rel="noopener" }
* [Fastly Image Optimizer](https://docs.fastly.com/api/imageopto/){: .external target="_blank" rel="noopener" }
* [Kraken.io](https://kraken.io/){: .external target="_blank" rel="noopener" }
* [TinyPNG](https://tinypng.com/){: .external target="_blank" rel="noopener" }
* [Imagify](https://imagify.io/){: .external target="_blank" rel="noopener" }

### GUI tools {: #gui }

Another approach is to run your images through an optimizer that you install onto your
computer and run as a GUI. For example, with [ImageOptim](https://imageoptim.com/mac){: .external target="_blank" rel="noopener" }
you drag and drop images into its UI, and then it automatically compresses the images
without compromising quality noticeably. If you're running a small site and can handle manually
optimizing all images, this option is probably good enough.

[Squoosh](https://squoosh.app/) is another option. Squoosh is maintained by the Google
Web DevRel team, the team that runs developers.google.com/web.

### Command line tools {: #cli }

The section below lists various command line image optimization tools that you can integrate into
your build toolchain.

JPEG:

* [Guetzli](https://github.com/google/guetzli){: .external target="_blank" rel="noopener" }
* [MozJPEG](https://github.com/mozilla/mozjpeg){: .external target="_blank" rel="noopener" }

PNG:

* [pngquant](https://pngquant.org/){: .external target="_blank" rel="noopener" }
* [Zopfli](https://github.com/google/zopfli){: .external target="_blank" rel="noopener" }

GIF:

* [Gifsicle](http://www.lcdf.org/gifsicle/){: .external target="_blank" rel="noopener" }
* [SVGO](https://github.com/svg/svgo){: .external target="_blank" rel="noopener" }

## More information {: #more-info }

Lighthouse collects all the JPEG or BMP images on the page, sets each image's compression
level to 85, and then compares the original version with the compressed
version. If the potential savings are 4KB or greater, Lighthouse flags the
image as optimizable.

[Audit source][src]{: .external }

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/byte-efficiency/uses-optimized-images.js

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
