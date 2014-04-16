---
layout: article
title: "Layout basics"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: multi-device-layouts
key-takeaways:
  set-viewport:
    - Always add a meta viewport tag in the head of every document including 
      `width=device-width` and `initial-scale=1`
    - Ensure your page is accessible by not disabling user scaling.
    - <meta name=viewport content="width=device-width, initial-scale=1">
  size-content-to-viewport:
    - Do not use large fixed width elements.
    - Content should not rely on a particular viewport width to render well.
    - Use CSS media queries to apply different styling for small and large screens.
  use-media-queries:
    - Media queries can be used to apply styles based on device characteristics.
    - Use `min-width` over of `min-device-width` to ensure the broadest experience.
    - Use relative sizes for elements to avoid breaking layout.
  choose-breakpoints:
    - Create breakpoints based on content, never on specific devices, products or 
      brands. 
    - Design for the smallest mobile device first, then progressively enhance the 
      experience as more screen real estate becomes available.
    - Keep lines of text to around 70 or 80 characters.
    
---

{% wrap content%}

# A need for responsive pages

The use of mobile devices to surf the web is growing at an astronomical pace,
but unfortunately the much of the web isn't optimized for those mobile devices.
Mobile devices are often constrained by display size, and require a different
approach to how content is laid out on screen.

There are a multitude of different screen sizes across phones, phablets,
tablets, desktops, game consoles, TVs, even wearables, and the landscape is
always changing.  What is available today will likely be very different a year
from now.  For this reason, creating experiences based on specific devices is
nearly impossible.

## What is responsive web design

**[VIDEO of fully responsive site being resized]**

Responsive web design, originally defined by [Ethan Marcotte in A List
Apart](http://alistapart.com/article/responsive-web-design/) responds to the
needs of the user and the device they're using.  The layout changes based on the
size and capabilities of the device.  For example, on a phone, users would see
content shown in a single column view; a tablet might show the same content in
two columns.

# Set the viewport

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.set-viewport %}

In order to attempt to provide the best experience, mobile browsers will render 
the page at a desktop screen width (usually about 960px), and then try to make 
the content look better by increasing font sizes and scaling the content to fit 
the screen.  For users, this means that font sizes may appear inconsistently and 
they have double-tap or pinch-zoom in order to be able to see and interact with 
the content.

[IMAGE of page without a viewport]

Pages optimized for multi-screen experiences must include a meta viewport
element in the head of the document.  A meta viewport tag gives the browser
instructions on how to control the page's dimensions and scaling.

[IMAGE of page with a viewport]

    <meta name=viewport content="width=device-width, initial-scale=1">

Using the meta viewport value `width=device-width` instructs the page to match
the screen's width in device independent pixels. This allows the page to reflow
content to match different screen sizes, whether rendered on a small mobile
phone or a large desktop monitor.

Some browsers will keep the page's width constant when rotating to landscape
mode, and zoom rather than reflow to fill the screen. Adding the attribute
`initial-scale=1` instructs browsers to establish a 1:1 relationship between CSS
pixels and device independent pixels regardless of device orientation, and
allows the page to take advantage of the full landscape width.

{% class note %}
**Note:** Use a comma to separate attributes to ensure older browsers can
properly parse the attributes.
{% endclass %}

## Ensure an accessible viewport

In addition to setting an `initial-scale`, you can also set the `minimum-scale`,
`maximum-scale` and `user-scalable` attributes on the viewport.  When set, these
can disable the user's ability to zoom the viewport, potentially causing
accessibility issues.

# Size content to the viewport

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.size-content-to-viewport %}

On both desktop and mobile devices, users are used to scrolling websites 
vertically but not horizontally, and forcing the user to scroll horizontally or 
to zoom out in order to see the whole page results in a poor user experience.

When developing a mobile site with a `meta viewport` tag, it easy to
accidentally create page content that doesn't quite fit within the specified
viewport. For example, an image that is displayed at a width wider than the
viewport can cause the viewport to scroll horizontally. You should adjust this
content to fit within the width of the viewport, so that the user does not need
to scroll horizontally.

Since screen dimensions and width in CSS pixels vary widely between devices
(e.g. between phones and tablets, and even between different phones), content
should not rely on a particular viewport width to render well.

[SxS IMAGE HERE - `div{width:360px;}` on a small device & on a large device]
[OR video of horizontal scrolling]

Setting large absolute CSS widths for page elements (such as the example above),
will cause the `div` to be too wide for the viewport on a narrower device (e.g.
a device with a width of 320 CSS pixels, such as an iPhone). Instead, consider
using relative width values, such as `width: 100%`.  Similarly, beware of using
large absolute positioning values that may cause the element to fall outside the
viewport on small screens.

# Use CSS Media Queries For Responsiveness

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.use-media-queries %}

Media queries are simple filters that can be applied to CSS styles that makes it 
easy to change styles based on the characteristics of the device rendering the 
content, including the display type, width, height, orientation and even 
resolution.  For example, you could place all styles necessary for printing 
inside a print media query:

    <link rel="stylesheet" type="text/css" href="print.css" media="print" />

In addition to using the `media` syntax in the stylesheet link, there are two
other ways to apply media queries that can be embedded in a CSS file: `@media`
and `@import`.  For performance reasons either of the first two methods are
recommended over the `@import` syntax.

    @media print {
      // print style sheets go here
    }

    @import url(print.css) print;

The logic that applies media queries is not mutually exclusive and any filter
that meets that criteria the resulting CSS block will be applied using the
standard rules of precedence in CSS.

## Apply media queries based on viewport size

Media queries enable us to create a responsive experience, where specific styles
are applied to small screens, large screens and anywhere in between.  The media
query syntax allows for the creation of rules that can be applied depending on
device characteristics.

    @media (query) {
      /* CSS Rules used when query matches */
    }

While there are several different items we can query on, the ones used most
often for responsive web design are min-width, max-width, min-height and
max-height.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>min-width</td>
<td>This will apply for any browser width over the value defined in the query.</td>
</tr>
<tr>
<td>max-width</td>
<td>This will apply for any browser width under the value defined in the query.</td>
</tr>
<tr>
<td>min-height</td>
<td>This will apply for any browser height over the value defined in the query.</td>
</tr>
<tr>
<td>max-height</td>
<td>This will apply for any browser height under the value defined in the query.</td>
</tr>
<tr>
<td>orientation=portrait</td>
<td>This will apply for any browser where the height is greater than or equal to the width.</td>
</tr>
<tr>
<td>orientation=landscape</td>
<td>This will apply for any browser where the width is greater than the height.</td>
</tr>
</table>

Let's take a look at some specific examples:

    <link rel="stylesheet" media="(min-width: 640px)" href="over-640px.css" />

Applied when the browser width is 640px or wider.

    <link rel="stylesheet" media="(max-width: 640px)" href="under-640px.css" />

Applied when the browser width is between 0px and 640px.

    @media (min-width: 500px) and (max-width: 600px) {}

Applied when the browser width is between 500px and 600px.

    <link rel="stylesheet" media="(orientation: portrait)" href="portrait.css" />

Applied when the browsers height is greater or equal to it's width.

    <link rel="stylesheet" media="(orientation: landscape)" href="landscape.css" />

Applied when the browsers width is greater than its height.

## A note on `min-device-width`

In addition to `*-width`, it is also possible to create queries based on
`*-device-width`, and the difference is subtle but very important.  `min-width`
is based on the size of the browser window, where as `min-device-width` is based
on the size of the screen.

On a mobile device this really doesn't matter that much as in most cases the
user can't resize the window, but on a desktop users will often have control the
size of their windows and will expect the content to adapt naturally.
Therefore, you should avoid using `*-device-width,` since it will not cause the
page to respond as the desktop browser window is resized.

## Use relative units

A key concept behind responsive design is fluidity and proportionality as
opposed to fixed width layouts.  Thus using relative units for measurements can
help simplify layouts and prevent accidentally creating components that are too
big for the viewport.

For example, setting `width: 100%` to a `div` will ensure it spans the width of
the viewport, no matter if it's a 320px wide iPhone, a 360px wide Nexus 5 or a
342px wide Blackberry Z10, ensuring it doesn't break at a random point.  In
addition, using relative units allows browsers to render the content based on
the users zoom level, without the need for adding horizontal scroll bars to the
page.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>NO
div.fullWidth {
  width: 320px;
  margin-left: auto;
  margin-right: auto;
}</td>
<td>YES
div.fullWidth {
  width: 100%;
}</td>
</tr>
</table>

# How to choose breakpoints

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.choose-breakpoints %}

There are many different screen sizes a user may be looking at our content on, 
and the devices that they're using today won't necessarily be the same devices 
that they're using tomorrow.  While it may be helpful to think about defining 
breakpoints based on device classes, use caution.  Defining breakpoints based on 
specific devices, products, brand names or operating systems, will result in a 
maintenance nightmare.

Instead, the content itself should determine how the layout adjusts to its
container.

## Pick major breakpoints by starting small, then working up

Design the content to fit on a small screen size first, then expand the screen
until a breakpoint becomes necessary.  This will allow you to optimize
breakpoints based on content and maintain the fewest number of breakpoints
possible.  This concept also applies to JavaScript enhancements as well, if you
only load code when necessary, your sites will download faster.

Let's take a look at a specific example - the Chrome Developer Summit website.

<img src="image00.png" width="501" height="293" />

In the smallest view, the location is a hyperlink that redirects the user to
Google Maps with the appropriate location.  In larger screen sizes, the map is
embedded directly in the page, making it easy to see the address and visualize
the location.

**[INSERT INFO ABOUT ACTUAL SAMPLE HERE]**

## Pick minor breakpoints when necessary

In addition to choosing major breakpoints when layout changes significantly, it
is also helpful to adjust for minor changes.  For example between major
breakpoints, it may be helpful to adjust the margins or padding on an element,
or increase the font size to make it feel more natural in the layout.

**[INSERT INFO ABOUT ACTUAL SAMPLE HERE]**

## Optimize text for reading

Classic readability theory suggests that an ideal column should contain 70 to 80
characters per line (about  8 to 10 words in English), thus each time the width
of a text block grows past about 10 words, a breakpoint should be considered.

<img src="image01.png" width="624" height="340" />

Let's take a deeper look at the above blog post example.  On smaller screens,
the Roboto font at 1em works perfectly giving 10 words per line, but larger
screens will require a breakpoint. In this case, if the browser width is greater
than 575px, the ideal content width is 550px.

    @media (min-width: 575px) {
      article {
        width: 550px;
        margin-left: auto;
        margin-right: auto;
      }
    }

## Never completely hide content

By starting with your design on a small display encourages you to create a
focused experience that allows users to interact with your site, not matter the
display.  Be careful when choosing what content to hide or show depending on
screen size.  Avoid completely hiding content on smaller displays that may be
helpful.

{% endwrap %}
