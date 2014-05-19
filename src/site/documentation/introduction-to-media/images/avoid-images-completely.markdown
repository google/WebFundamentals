---
layout: article
title: "Avoid images completely"
description: "Sometimes, the best image isn't actually an image at all. Whenever possible, use
the native capabilities of the browser to provide the same or similar
functionality."
introduction: "Sometimes, the best image isn't actually an image at all. Whenever possible, use
the native capabilities of the browser to provide the same or similar
functionality.  Browsers generate visuals that would have previously required
images.   This means that browsers no longer need to download separate image
files and prevents awkwardly scaled images.  Icons can be rendered using unicode
or special icon fonts."
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 3
collection: images
key-takeaways:
  use-right-image:
    - Use the best image for the characteristics of the display, consider
      screen size, device resolution and page layout.
    - Change the <code>background-image</code> property in CSS for high DPI
      displays using media queries with <code>min-resolution</code> and
      <code>-webkit-min-device-pixel-ratio</code>.
    - Use srcset to provide high resolution images in addition to the 1x
      image in markup.
    - Consider the performance costs when using JavaScript image replacement
      techniques or when serving highly compressed high resolution images to
      lower resolution devices.
  avoid-images:
    - Avoid images whenever possible, instead, leverage browser capabilities,
      use unicode characters in place of images, and replace complex icons
      with icon fonts.
  optimize-images:
    - Don't just randomly choose an image format, understand the different
      formats available, and use the format best suited.
    - Include image optimization and compression tools into your workflow to
      reduce file sizes.
    - Reduce the number of http requests by placing frequently used images
      into image sprites.
    - Consider loading images only after they’ve scrolled into view to
      improve the initial page load time and reduce the initial page weight.
remember:
  compressive:
    - Use caution with the compressive technique because of the increased
      memory and decoding costs it requires.  Resizing large images to fit on
      smaller screens is expensive and can be particularly painful on low-end
      devices where both memory and processing is limited.
related:
  optimize:
    - <a href="../../performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html#image-optimization">Image optimization</a>
    - <a href="../../performance/optimizing-content-efficiency/">Optimizing content efficiency</a>
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}


{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Place text in markup, instead of embedded in images

Wherever possible, text should be text, and not embedded into images, for
example using images for headlines, or placing contact information like phone
numbers or addresses directly into images.  This prevents people from being able
to copy and paste the information, makes it inaccessible for screen readers, and
isn't responsive.  Instead, place the text in your markup and if necessary use
webfonts to achieve the style you need.

## Use CSS to replace images

Modern browsers can use CSS features to create styles that would previously
required images.  For examples, complex gradients can be created using the
<code>background</code> property, shadows can be created using
<code>box-shadow</code> and rounded corners can be added with the
<code>border-radius</code> property.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
  
  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>
<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Keep in mind that using these techniques does require rendering cycles, which
can be significant on mobile.  If over-used, you'll lose any benefit you may
have gained and may hinder performance.

## Replace simple icons with unicode

Many fonts include support for the myriad of unicode glyphs, which can be used
instead of images.  Unlike images, unicode fonts scale well, and look good no
matter matter how small or large they appear on screen.

Beyond the normal character set, unicode may include symbols for number forms
(&#8528;), arrows (&#8592;), math operators (&#8730;), geometric shapes
(&#9733;), control pictures (&#9654;), braille patterns (&#10255;), music
notation (&#9836;), Greek letters (&#937;), even chess pieces (&#9822;).

Including a unicode character is done in the same way named entities are:
`&#XXXX`, where `XXXX` represents the unicode character number.  For example:

{% highlight html %}
You're a super &#9733;
{% endhighlight %}

You're a super &#9733;

## Replace complex icons with icon fonts

For more complex icon requirements, icon fonts are generally lightweight, easy
to use and can be served in a single HTTP request. Icon fonts have a number of
advantages to images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as color, shadowing, transparency and animations are
  straightforward.
* An entire set of icons can be downloaded in one font.

{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for it's font icons.">
{% endlink_sample %}
{% include_code _code/icon-font.html iconfont html %}

There are hundreds of free and paid icon fonts available including [Font
Awesome](http://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/) and [Glyphicons](http://glyphicons.com/).

Be sure to balance the weight of the additional HTTP request and file size with
the need for the icons.  For example, if you only need a handful of icons, it
may be better to use an image or an image sprite.

{% include modules/nextarticle.liquid %}

{% endwrap %}
