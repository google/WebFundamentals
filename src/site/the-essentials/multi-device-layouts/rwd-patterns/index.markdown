---
layout: article
title: "Responsive Web Design Patterns"
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eros dolor, pharetra eu tincidunt et, sagittis et mi."
introduction: "Responsive web design patterns are quickly evolving, but there
              are a handful of established patterns that work well across the
              desktop and mobile devices."
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 2
collection: multi-device-layouts
---

{% wrap content%}

{% include modules/toc.liquid %}

Most layouts used by responsive web pages can be categorized into one of five
patterns: mostly fluid, column drop, layout shifter, tiny tweaks and off canvas.
In some cases, a page may use a combination of patterns, for example column drop
and off canvas.  These patterns, originally identified by [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), provide a solid starting
point for any responsive page.

### The patterns

To create simple, easy-to-understand samples, each the samples
below were created with real markup using
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
typically with three content `div`'s contained within a primary container `div`.
 Each sample was written starting with the smallest view first and breakpoints
were added when necessary.  The [flexbox layout mode is well
supported](http://caniuse.com/#search=flexbox) for modern browsers, though may
still require vendor prefixing for optimal support.

## Mostly Fluid

The mostly fluid pattern consists primarily of a fluid grid.  On large or medium
screens, it usually remains the same size, simply adjusting the margins on wider
screens.  On smaller screens, the fluid grid causes the main content to reflow,
while columns are stacked vertically.  One major advantage of this pattern is
that it usually only requires one breakpoint between small screens and large
screens.

{% link_sample _code/mostly-fluid.html %}
  <img src="imgs/mostly-fluid.svg" />
  Try it
{% endlink_sample %}

In the smallest view, each content `div` is stacked vertically.  Once the screen
width hits 600px, the primary content `div` remains at `width: 100%`, while the
secondary `div`'s are shown as two columns below the primary `div`.  Beyond
800px, the container `div` becomes fixed width and is centered on the screen.

Sites using this pattern include:

 * [A List Apart](http://mediaqueri.es/ala/)
 * [Media Queries](http://mediaqueri.es/)
 * [SimpleBits](http://simplebits.com/)


{% include_code _code/mostly-fluid.html mfluid css %}

## Column Drop

For full-width multi-column layouts, column drop simply stacks the columns
vertically as the window width becomes too narrow for the content.  Eventually
this results in all of the columns being stacked vertically.  Choosing
breakpoints for this layout pattern is dependent on the content and will change
for each design.

{% link_sample _code/column-drop.html %}
  <img src="imgs/column-drop.svg" />
  Try it
{% endlink_sample %}


Like the mostly fluid sample, content is stacked vertically in the smallest
view, but as the screen expands beyond 600px, the primary and secondary content
`div`'s take the full width of the screen.  The order of the `div`'s is set using
the order CSS property.  At 800px all three content `div`'s are shown, using the
full screen width.

Sites using this pattern include:

 * [Modernizr](http://modernizr.com/)
 * [Wee Nudge](http://weenudge.com/)

{% include_code _code/column-drop.html cdrop css %}

## Layout Shifter

The Layout shifter pattern is the most responsive to with multiple breakpoints
across several screen widths.  Key to this layout is the way content moves
about, instead of reflowing and dropping below other columns.  Due to the
significant differences between each major breakpoint, it is more complex to
maintain and likely involves changes within elements, not just overall content
layout.

{% link_sample _code/layout-shifter.html %}
  <img src="imgs/layout-shifter.svg" />
  Try it
{% endlink_sample %}

This simplified example shows the layout shifter pattern, on smaller screens
content is stacked vertically, but changes significantly as the screen becomes
larger, with a left `div` and two stacked `div`'s on the right.

Sites using this pattern include:

 * [Food Sense](http://foodsense.is/)
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/)

{% include_code _code/layout-shifter.html lshifter css %}

## Tiny Tweaks

Tiny tweaks simply makes small changes to the layout, such as adjusting font
size, resizing images or moving content around in very minor ways.  It works
well on single column layouts such as one page linear websites, text heavy
articles.

{% link_sample _code/tiny-tweaks.html %}
  <img src="imgs/tiny-tweaks.svg" />
  Try it
{% endlink_sample %}


As its name implies, little changes with this sample as the screen size changes.
As the screen width gets larger, so do the font size and padding.


Sites using this pattern include:

 * [Opera's Shiny Demos](http://shinydemos.com/)
 * [Ginger Whale](http://gingerwhale.com/)
 * [Future Friendly](http://futurefriendlyweb.com/)

{% include_code _code/tiny-tweaks.html ttweaks css %}

## Off Canvas

Rather than stacking content vertically, the off canvas pattern places less
frequently used content, perhaps navigation or app menus off screen, only
showing it when the screen size is large enough, and on smaller screens, content
is only a click away.

{% link_sample _code/off-canvas.html %}
  <img src="imgs/off-canvas.svg" />
  Try it
{% endlink_sample %}

Rather than stacking content vertically, this sample hides two of the content
`div`s off screen by using a `transform: translate(-250px, 0)`.  JavaScript is used
to show the divs by adding an open class to the element to make visible.  As the
screen gets wider, the off-screen positioning is removed from the elements and
they're shown within the visible viewport.

Note in this sample, Safari for iOS 6 and Android Browser do not support the
`flex-flow: row nowrap` feature of `flexbox`, so we’ve had to fallback to
absolute positioning.

Sites using this pattern include:

 * [HTML5Rocks
  Articles](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](http://www.google.com/nexus/)
 * [Facebook's Mobile Site](https://m.facebook.com/)

{% include_code _code/off-canvas.html ocanvas css %}

{% endwrap %}
