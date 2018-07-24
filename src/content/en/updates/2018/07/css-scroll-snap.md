project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Introduction to CSS Scroll Snap.


{# wf_updated_on: 2018-07-25 #}
{# wf_published_on: 2018-07-24 #}
{# wf_tags: chrome69,css,snap,scroll #}
{# wf_blink_components: Blink>CSS #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_featured_snippet: CSS Scroll Snap allows web developers to create well-controlled scroll experiences by declaring scroll snapping positions. This enables common UX scroll patterns without the need for JavaScript. #}

# Well-Controlled Scrolling with CSS Scroll Snap {: .page-title }

{% include "web/_shared/contributors/flackr.html" %}
{% include "web/_shared/contributors/majidvp.html" %}


<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
</style>


## TL;DR {: #tldr .hide-from-toc}

[CSS Scroll Snap](https://drafts.csswg.org/css-scroll-snap/) feature allows web
developers to create well-controlled scroll experiences by declaring scroll
snapping positions. Paginated articles and image carousels are two commonly used
examples of this. CSS Scroll Snap provides an easy to use and consistent API for
building these popular UX patterns and Chrome is shipping a high fidelity and
fast implementation of it in version 69.


## Background {: #background}

### The case for scroll snapping

Scrolling is a popular and natural way to interact with content on the web. It
is the platform's native means of providing access to more information than is
visible on the screen at once, becoming especially vital on mobile platforms
with limited screen real estate. So it is no surprise that web authors
increasingly prefer to organize content into scrollable flat lists as opposed to
deep hierarchies.

Scrolling's main drawback is its lack of precision. Rarely does a scroll end up
aligned to a paragraph or sentence. This is even more pronounced for paginated
or itemized content with meaningful boundaries when the scroll finishes at the
middle of the page or image leaving it partially visible. These use cases
benefit from a well-controlled scrolling experience.

Web developers have long relied on Javascript based solutions for controlling
the scroll to help address this shortcoming. However, Javascript based solutions
fall short of providing a full fidelity solution due to lack of scroll
customization primitives or access to composited scrolling. CSS Scroll Snap
ensures there is a fast, high fidelity and easy to use solution that works
consistently across browsers.

CSS Scroll Snap allows web authors to mark each scroll container with boundaries
for scroll operations at which to finish. Browsers then choose the most
appropriate end position depending on the particulars of the scroll operation,
scroll container's layout and visibility, and details of the snap positions,
then smoothly animate to it. Going back to our earlier example, as the user
finishes scrolling the carousel, its visible image snaps into place. No scroll
adjustments needed by Javascript.


<figure>
  <a href="/web/updates/images/2018/07/css-scroll-snap/center-snap-example.png">
    <img
    src="/web/updates/images/2018/07/css-scroll-snap/center-snap-example.png"
    alt="Example of using css scroll snap with an image carousel"> </a>
  <figcaption>Example of using css scroll snap with an image carousel.
    Here scroll snapping ensures at the end of scrolling an image horizontal
    center is aligned with the horizontal center of the scroll container.
  </figcaption>
</figure>


### The API history

CSS Scroll Snap has been under discussion for [several
years](https://gist.github.com/majido/9900261e1b7e2b1eb180b01c03656b42). As a
result, several browsers implemented earlier draft specifications, before it
underwent a fundamental [design
change](https://lists.w3.org/Archives/Public/www-style/2014Feb/0816.html). The
final design changed the underlying point alignment based snapping model to a
box alignment model. The change ensures scroll snapping can handle responsive
designs and layout changes by default without requiring authors to re-calculate
snap points. It also enables browsers to make better scroll snapping decisions
e.g., correctly snapping targets larger than the scroll container.

Chrome, Opera and Safari are shipping the latest specifications with the other
major browser vendors planning to follow along in the near future
([Firefox bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1231777),
[Edge bug](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/18394960/)).

This means you'll find several tutorials on the web which discuss the old syntax
which is still currently implemented by Edge and Firefox.

<figure>
  <a
    href="/web/updates/images/2018/07/css-scroll-snap/specification-history.png">
    <img
    src="/web/updates/images/2018/07/css-scroll-snap/specification-history.png"
    alt="Major changes in scroll snap specification"> </a>
  <figcaption>Major changes in scroll snap specification.</figcaption>
</figure>


## CSS Scroll Snap


Scroll snapping is the act of adjusting the scroll offset of a scroll container
to be at a preferred **snap position** once the scroll operation is finished.

A scroll container may be opted into scroll snapping by using `scroll-snap-type`
property. This tells the browser that it should consider snapping this scroll
container to the snap positions produced by its descendents.  `scroll-snap-type`
determines the axis on which scrolling occurs: `x`, `y`, or `both`, and the
snapping strictness: `mandatory`, `proximity`. More on these later.

A snap position can be produced by declaring a desired alignment on an element.
This position is the scroll offset at which the nearest ancestor scroll
container and the element are aligned as specified for the given axis. The
following alignments are possible on each axis: `start`, `end`, `center`.

A `start` alignment means that the scroll container snapport start edge should
be flushed with the element snap area start edge. Similarly, the `end` and
`center` alignments mean that the scroll container snapport end edge or center
should be flushed with the element snap area end edge or center.

[Snapport](https://drafts.csswg.org/css-scroll-snap/#scroll-padding) is the area
of the scroll container to which the snap areas are aligned. By default it is
the same as the visual viewport of the scroll container but it can be adjusted
using `scroll-padding` property.



<figure>
    <video src="/web/updates/images/2018/07/css-scroll-snap/interactive-alignment.mp4"
    autoplay loop muted playsinline alt="Alignment demo"> </video>
  <figcaption>
    Example of a various alignments on horizontal scrolling axis.
 </figcaption>
</figure>



The following examples illustrate how these concepts can be used in practice.


### Example - Horizontal gallery

A common use case for scroll snapping is an  image carousel. For example, to
create a horizontal image carousel that snaps to each image as you scroll, we
can specify the scroll container to have a mandatory ``scroll-snap-type`` on the
horizontal axis.  set each image to ``scroll-snap-align: center`` to ensure that
the snapping centers the image within the carousel.


```
<style>
#gallery {
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  display: flex;
}

#gallery img {
   scroll-snap-align: center;
}
</style>

<div id="gallery">
  <img src="cat.jpg">
  <img src="dog.jpg">
  <img src="another_cute_animal.jpg">
</div>
```

Because snap positions are associated with an element, the snapping algorithm
can be smart about when and how it snaps given the element and the scroll
container size. For example, consider the case where one image is larger than
the carousel. A naïve snapping algorithm may prevent the user from panning
around to see the full image. But the
[specification](https://drafts.csswg.org/css-scroll-snap/#snap-overflow)
requires implementations to detect this case and allow the user to freely scroll
around within that image only snapping at its edges.


<figure>
  <a href="/web/updates/images/2018/07/css-scroll-snap/gallery-page.mp4"
     target="_blank">
    <video src="/web/updates/images/2018/07/css-scroll-snap/gallery-page.mp4"
           autoplay loop muted playsinline controls alt="Gallery page demo" height="600"></video>
  </a>
  <figcaption>
    <a href="https://snap.glitch.me/carousel.html"
       target="_blank">View demo</a> |
    <a href="https://glitch.com/edit/#!/snap?path=carousel.html:1:0"
       target="_blank">Source</a>
  </figcaption>
</figure>


### Example - Journeyed product page

Another common case that can benefit from scroll snapping are pages with
multiple logical sections that are vertically scrolled through, e.g., a typical
product page. ``scroll-snap-type: y proximity;` is a `more natural fit for cases
like this. It does not interfere when user scrolls to the middle of a particular
section but also snaps and brings attention to a new section when they scroll
close enough to it.

Here is how this can be achieved:


```
<style>
article {
  scroll-snap-type: y proximity;
  /* Reserve space for header plus some extra space for sneak peeking. */
  scroll-padding-top: 15vh;
  overflow-y: scroll;
}
section {
  /* Snap align start. */
  scroll-snap-align: start;
}
header {
  position: fixed;
  height: 10vh;
}
</style>

<article>
  <header> Header </header>
  <section> Section One </section>
  <section> Section Two </section>
  <section> Section Three </section>
</article>
```


#### Scroll padding and margin

Our product page has a fixed position top header. Our design also asked for some
of the top section to remain visible when scroll container is snapped in order
to provide a design cue to users about the content above.


`scroll-padding` is a new css property that can be used to adjust the effective
viewable region of scroll container.  This region is also known as snapport and
is used when calculating scroll snap alignments. The property defines an inset
against the scroll container's padding box. In our example 15vh additional inset
was added to the top which instructs the browser to consider a lower position,
15vh below the top edge of the scroll container, as its vertical start edge for
scroll snapping. When snapping, the start edge of the snap target element will
become flushed with this new position thus leaving space above.

`scroll-margin` defines the outset amount used to adjust the snap target
effective box similar to how `scroll-padding` functions on snap scroll
container.

You may have noticed that these two properties do not have the word "`snap`" in
them. This is intentional as they actually modify the box for all relevant
scroll operations and are not just scroll snapping. For example Chrome takes
them into account when calculating page size for paging scroll operations such
as PageDown and PageUp and also when calculating scroll amount for
`Element.scrollIntoView()` operation.


<figure>
  <a href="/web/updates/images/2018/07/css-scroll-snap/product-page.mp4"
     target="_blank">
    <video src="/web/updates/images/2018/07/css-scroll-snap/product-page.mp4"
           autoplay muted playsinline loop controls alt="Product page demo" height="600"></video>
  </a>
  <figcaption>
    <a href="https://snap.glitch.me/product.html"
       target="_blank">View demo</a> |
    <a href="https://glitch.com/edit/#!/snap?path=product.html:1:0"
       target="_blank">Source</a>
  </figcaption>
</figure>

## Interaction with other scrolling APIs

### DOM Scrolling API {#dom-scrolling-api}

Scroll snapping happens **after** all scroll operations including those
initiated by script. When you are using APIs like `Element.scrollTo`, the
browser will calculate the intended scroll position of the operation, then apply
appropriate snapping logic to find the final snapped location. Thus,  there is
no need for user script to do any manual calculations for snapping.


### Smooth Scrolling  {#smooth-scrolling}

Smooth scrolling controls the behavior of a programmatic scroll operation while
scroll snap determines its destination. Since they control orthogonal aspects of
scrolling, they can be used together and complement each other.


### Overscroll Behavior {#overscroll-behavior}

[Overscroll behavior
API](https://developers.google.com/web/updates/2017/11/overscroll-behavior)
controls how scroll is chained across multiple elements and it is not affected
by scroll snap.


## Caveats and best practices


Avoid using mandatory snapping when target elements are widely spaced apart.
This can cause content in between the snap positions to become inaccessible.

Use `CSS.supports` for feature detecting CSS Scroll Snap.  But avoid using
`scroll-snap-type` which is also present in the deprecated specification and can
be unreliable.


```
if (CSS.supports('scroll-snap-align: start')) {
  // use css scroll snap
} else {
  // use fallback
}
```


Do not assume that programmatically scrolling APIs such as `Element.scrollTo`
always finish at the requested scroll offset. Scroll snapping may adjust the
scroll offset after programmatic scrolling is complete. Note that this was not a
good assumption even before scroll snap since scrolling may have been
interrupted for other reasons but it is especially the case with scroll
snapping.


<aside>
  <strong>Note:</strong>
  There is an upcoming proposal to change various scrolling APIs to return a
  promise. This promise is resolved when user agent either completes or aborts
  that scrolling operation. Once this is standardized and implemented, it provides
  an ergonomic and efficient way for following up a user script initiated scroll
  with other actions.
</aside>


## Future work

Chrome 69 ships the core functionality specified in CSS Scroll Snap
specification. The main omissions are snapping for keyboard scrolling and
fragment navigations which at the moment are not supported by any other
implementations. Chrome will continue improving this feature over time
particularly focusing on missing features, improving snap selection algorithm,
animation smoothness, and devtools facilities.
