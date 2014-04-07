---
layout: article
title: "Layout basics"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: multi-device-layouts
---

<style type="text/css">
  div.takeaways {
    color: #31708f;
    background-color: #d9edf7;
    border: 1px solid #bce8f1;
    padding: 15px;
    margin: 20px 25px 20px 25px;
    border-radius: 4px;
  }
  div.takeaways h2 {
    color: #31708f;
    margin-top: 0;
  }
  div.takeaways ul {
    margin: 0;
  }

  div.notes {
    border: 1px solid #dddddd;
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 10px;
    margin-left: 25px;
    margin-right: 25px;
  }
</style>

# A need for responsive pages

* the landscape is shifting
* Mobile browsing is expected to outpace desktop-based access
* multitude of different screen sizes, phones, phablets, tablets, desktops, even 
  wearables
* capabilities changing, touch on desktop
* can build one site for each, or build one site that responds to the needs of 
  the user
* constraints of display

# Set the viewport

<div class="takeaways">
  <h2>Key Takeaways</h2>
  <ul>
    <li>Always add a meta viewport tag in the head of every document including width=device-width and initial-scale=1</li>
    <li>Ensure your page is accessible by not disabling user scaling.</li>
  </ul>
</div>

In order to attempt to provide the best experience, mobile browsers will render 
the page at a desktop screen width (usually about 960px), and then scale the 
content to fit the screen.  For users, this means that they have double-tap or 
pinch-zoom in order to be able to see and interact with the content.

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

<div class="notes">
  <b>Note:</b> Use a comma to separate attributes to ensure older browsers can properly parse the attributes.
</div>

## Ensure an accessible viewport

In addition to setting an initial-scale, you can also set the minimum-scale, 
maximum-scale and user-scalable attributes on the viewport.  When set, these can 
disable the user's ability to zoom the viewport, potentially causing 
accessibility issues.

# Size content to the viewport

<div class="takeaways">
  <h2>Key Takeaways</h2>
  <ul>
    <li>Do not use large fixed width elements.</li>
    <li>Content should not rely on a particular viewport width to render well.</li>
    <li>Use CSS media queries to apply different styling for small and large screens.</li>
  </ul>
</div>

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

Setting large absolute CSS widths for page elements (such as the example above), 
will cause the `div` to be too wide for the viewport on a narrower device (e.g. 
a device with a width of 320 CSS pixels, such as an iPhone). Instead, consider 
using relative width values, such as `width: 100%`.  Similarly, beware of using 
large absolute positioning values that may cause the element to fall outside the 
viewport on small screens.

# Use CSS Media Queries For Responsiveness 

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

The difference between `min-width` and `min-device-width` is subtle but very 
important.  `min-width` is based on the size of the browser window, where as 
`min-device-width` is based on the size of the screen.

On a mobile device this really doesn't matter that much as in most cases the 
user can't resize the window, but on a desktop users will often have control the 
size of their windows and will expect the content to adapt naturally.  
Therefore, you should avoid using `*-device-width,` since it will not cause the 
page to respond as the window is resized.

## Use relative units

* include bits about why using relative sizes for elements is best

# How to choose breakpoints

There are many different screen sizes a user may be looking at our content on, 
and the devices that they're using today won't necessarily be the same devices 
that they're using tomorrow.  For this reason, the content itself should 
determine how the layout adjusts to its container.  

It may be helpful to think about defining breakpoints based on device classes, 
such as phones, tablets, laptops & desktops, TVs and game consoles.  Defining 
breakpoints based on specific device classes, products, brand names or operating 
systems, will result in a maintenance nightmare. 

## Start small, then work up

Design the content to fit on a small screen size first, then expand the screen 
until a breakpoint becomes necessary.  This will allow you to optimize 
breakpoints based on content and maintain the fewest number of breakpoints 
possible.

* need more thinking here
* most likely will pick apart the [sample from the getting 
  started](http://jsbin.com/jiqub/latest/edit) and walk through that in more 
  detail

## Optimize text for reading

Classic readability theory suggests that an ideal column should contain 8 to 10 
words per line, thus each time the width of a text block grows past about 10 
words, a breakpoint should be considered.  Of course, 10 words is subjective and 
can vary depending on language, font and font size ranging anywhere from 22em to 
as much as 40em.

<img src="imgs/laybas-tmp1.png" />

Let's take a deeper look at the above blog post example.  On smaller screens, 
the Roboto font at 1em works perfectly giving 10 words per line, but larger 
screens will require a breakpoint.  Finding the right breakpoint is somewhat 
trial and error, but because we know a line will fall between 22em and 40em, we 
have a good starting point.

In this case, if the browser width is greater than 26em, the ideal content width 
is 25em.

    @media (min-width: 26em) {
      article {
        width: 25em;
        margin-left: auto;
        margin-right: auto;
      }
    }

## Never completely hide content

* because that's just mean! 
