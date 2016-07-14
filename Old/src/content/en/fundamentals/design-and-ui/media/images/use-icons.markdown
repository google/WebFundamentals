---
layout: shared/narrow
title: "Use SVG for icons"
description: "When adding icons to your page, use SVG icons where possible or in some cases, unicode characters."
authors:
  - petelepage
published_on: 2014-06-10
updated_on: 2014-06-10
order: 3
translation_priority: 1
key-takeaways:
  avoid-images:
    - "Use SVG or unicode for icons instead of raster images."
---

<p class="intro">
  When adding icons to your page, use SVG icons where possible or in some cases, unicode characters.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Replace simple icons with unicode

Many fonts include support for the myriad of unicode glyphs, which can be used
instead of images. Unlike images, unicode fonts scale well, and look good no
matter how small or large they appear on screen.

Beyond the normal character set, unicode may include symbols for number forms
(&#8528;), arrows (&#8592;), math operators (&#8730;), geometric shapes
(&#9733;), control pictures (&#9654;), braille patterns (&#10255;), music
notation (&#9836;), Greek letters (&#937;), even chess pieces (&#9822;).

Including a unicode character is done in the same way named entities are:
`&#XXXX`, where `XXXX` represents the unicode character number. For example:

{% highlight html %}
You're a super &#9733;
{% endhighlight %}

You're a super &#9733;

## Replace complex icons with SVG

For more complex icon requirements, SVG icons are generally lightweight, 
easy to use and can be styled with CSS. SVG have a number of advantages over
raster images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as color, shadowing, transparency and animations are 
  straightforward.
* SVG images can be inlined right in the document.
* They are semantic.
* Provide better accessibility with the appropriate attributes.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Use icon fonts with caution

Icon fonts are popular, and can be easy to use, but have some drawbacks 
compared to SVG icons.

* They're vector graphics that can be infinitely scaled, but may be 
  anti-aliased resulting in icons that aren’t as sharp as expected.
* Limited styling with CSS.
* Pixel perfect positioning can be difficult, depending on line-height, 
  letter spacing, etc.
* Are not semantic, and can be difficult to use with screen readers or 
  other assistive technology.
* Unless properly scoped, can result in a large file size for only using a 
  small subset of the icons available. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for its font icons.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

There are hundreds of free and paid icon fonts available including [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/) and [Glyphicons](https://glyphicons.com/).

Be sure to balance the weight of the additional HTTP request and file size with
the need for the icons. For example, if you only need a handful of icons, it
may be better to use an image or an image sprite.


