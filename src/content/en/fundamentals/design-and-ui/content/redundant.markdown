---
layout: shared/narrow
title: "Eliminate unnecessary content"
description: "Page weights on the web are big and getting bigger, and content is often difficult to read and interact with on mobile. This article describes techniques for streamlining page content."
published_on: 2016-05-10
updated_on: 2015-04-29
order: 2
authors:
  - samdutton
translation_priority: 1
---

<p class="intro">In terms of byte size, web pages are <a href="http://httparchive.org/trends.php#bytesTotal&reqTotal" title="HTTP Archive: Total Transfer Size and Total Requests">big and getting bigger</a>.
</p>

[Responsive design techniques](/web/fundamentals/design-and-ui/responsive/fundamentals/) make it possible to serve different content for smaller viewports, but it's always sensible to start by streamlining text, images and other content.

> Web users are often action oriented, "leaning forward" in the hunt for answers to their current question, rather than leaning back to absorb a good book.
>
> — [Jakob Nielsen](https://www.nngroup.com/articles/concise-scannable-and-objective-how-to-write-for-the-web/)

Ask yourself: what are people are trying to achieve when they visit my site?

Does every page component help users achieve their goal?

## Remove redundant page elements

HTML files constitute nearly 70k and more than nine requests for the average web page, according to [HTTP Archive](http://httparchive.org/trends.php#bytesHtml&reqHtml).

Many popular sites use several thousand HTML elements per page, and several thousand lines of code, even on mobile. Excessive HTML file size [may not make pages load more slowly](http://jsbin.com/zofavunapo/1/edit?html,js,output), but a heavy HTML payload can be a sign of content bloat: larger .html files mean more elements, more text content, or both.

Reducing HTML complexity will also reduce page weight, help enable localization and internationalization and make responsive design easier to plan and debug. For information about writing more efficient HTML, see [High performance HTML](https://samdutton.wordpress.com/2015/04/02/high-performance-html/).

> Every step you make a user perform before they get value out of your app will cost you 20% of users
>
>— [Gabor Cselle, Twitter](http://blog.gaborcselle.com/2012/10/every-step-costs-you-20-of-users.html)

The same applies to content: help users get to what they want as quickly as possible.

Don't just hide content from mobile users. Aim for [content parity](http://bradfrost.com/blog/mobile/content-parity/), since guessing what features your mobile users won't miss is bound to fail for someone. If you have the resources, create alternative versions of the same content for different viewport sizes — even if only for high priority page elements.

Consider content management and workflow: are legacy systems resulting in legacy content?

## Simplify text

As the web goes mobile, you need to change the way you write. Keep it simple, reduce clutter and get to the point.

See [Write for mobile](write.html) for more information.

## Remove redundant images

According to [HTTP Archive data](http://httparchive.org/trends.php#bytesImg&reqImg), the average web page makes 54 requests for images.

<a href="http://httparchive.org/trends.php#bytesImg&reqImg" title="HTTP Archive"><img src="images/http-archive-images.png" alt="HTTP Archive showing increasing number of image transfer sizes and image requests" /></a>

Images constitute over 60% of page weight.

<a href="http://httparchive.org/interesting.php#bytesperpage" title="HTTP Archive"><img src="images/http-archive-content-type-pie-chart.png" alt="HTTP Archive pie chart showing average bytes per page by content type, around 60% of which is images"></a>

Images can be beautiful, fun and informative — but they also use page real estate, add to page weight, and increase the number of file requests. [Latency gets worse as connectivity gets worse](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/), meaning that an excess of image file requests is an increasing problem as the web goes mobile.

Images also consume power. After the screen, radio is the second biggest drain on your battery. More image requests, more radio usage, more flat batteries. Even just to render images takes power – and this is proportional to size and number. Check out the Stanford report [Who Killed My Battery?](http://cdn.oreillystatic.com/en/assets/1/event/79/Who%20Killed%20My%20Battery_%20Analyzing%20Mobile%20Browser%20Energy%20Consumption%20Presentation.pdf)

If you can, get rid of images!

Here are some suggestions:

* Consider designs that avoid images altogether, or use images sparingly. [Text-only can be beautiful](https://onepagelove.com/tag/text-only)! Ask yourself, "What are visitors to my site trying to achieve? Do images help that process?"
* In the old days, it was commonplace to save headings and other text as graphics. That approach does not respond well to viewport size changes, and adds to page weight and latency. Using text as a graphic also means the text can't be found by search engines, and isn't accessible by screenreaders and other assistive technologies. Use "real" text where possible — Web Fonts and CSS can enable beautiful typography.
* Use CSS rather than images for gradients, shadows, rounded corners, and [background textures](http://lea.verou.me/css3patterns/), features [supported by all modern browsers](http://caniuse.com/#search=shadows). Bear in mind, however, that CSS may be better than images, but there can still be a [processing and rendering penalty](http://www.smashingmagazine.com/2013/04/03/build-fast-loading-mobile-website/), especially significant on mobile.
* Background images rarely work well on mobile. You can [use media queries](http://udacity.github.io/responsive-images/examples/2-06/backgroundImageConditional/) to avoid background images on small viewports.
* Avoid splash screen images.
* [Use CSS for UI animations](https://developers.google.com/web/fundamentals/design-and-ui/animations/?hl=en).
* Get to know your glyphs; use [Unicode symbols and icons](https://en.wikipedia.org/wiki/List_of_Unicode_characters) instead of images, with Web Fonts if necessary.
* Consider [icon fonts](http://weloveiconfonts.com/#zocial); they are vector graphics that can be infinitely scaled, and an entire set of images can be downloaded in one font. (Be aware of [these concerns](https://sarasoueidan.com/blog/icon-fonts-to-svg/), however.)
* The &lt;canvas&gt; element can be used to build images in JavaScript from lines, curves, text, and other images.
* [Inline SVG or Data URI images](http://udacity.github.io/responsive-images/examples/2-11/svgDataUri/) will not reduce page weight, but they can reduce latency by reducing the number of resource requests. Inline SVG has [great support on mobile and desktop browsers](http://caniuse.com/#feat=svg-html5), and [optimization tools](http://petercollingridge.appspot.com/svg-optimiser) can significantly reduce SVG size. Likewise, Data URIs are [well supported](http://caniuse.com/datauri). Both can be inlined in CSS.
* Consider using &lt;video&gt; instead of animated GIFs. [The video element is supported by all browsers on mobile](http://caniuse.com/video) (apart from Opera Mini).

For more information see [Image Optimization](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization?hl=en) and [Eliminating and replacing images](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization?hl=en#eliminating-and-replacing-images).
