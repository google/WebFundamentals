---
layout: article
title: "Make it responsive"
description: "The web is accessible on a huge range of devices from small-screen phones to huge-screen televisions. Learn how to build a site that works well across all these devices."
introduction: "The web is accessible on a huge range of devices from small-screen phones through to huge-screen televisions.  Each device presents its own unique benefits and also constraints and as a web developer you are expected to support all ranges of devices."
key-takeaways:
  make-responsive:
    - Always use a viewport 
    - Always start with a narrow viewport first and scale out
    - Base your breakpoints off when you need to adapt the content
    - Create a high-level vision of your layout across major breakpoints
notes:
  styling: 
    - We have assumed a set of styles that include color, padding and font styling that match our brand guidelines.
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 2
collection: multi-screen
---

{% wrap content %}

{% include modules/toc.liquid %}

We are building a site that works across in multiple screen sizes and device
types. In the [previous
article]({{site.baseurl}}{{page.article.previous.url}}) we crafted the
Infomration Architecture of the page and created a basic structure that we
will now use to make work across all of our target screens and form-factors.

We are using the principles of Mobile First web development.  We start with a
narrow viewport &mdash; similar to a mobile phone &mdash; and build for that
experience first and start to scale up to larger device classes.  We can do 
this by making our viewport wider and making a judgement call on whether the
design and layout look right.

Earlier we created a couple of different high-level designs for how our content
should be displayed and now we need make our page adapt to those different layouts.
We do this by making a decision on where to place our breakpoints &mdash; a point
where the layout and styles change &mdash; based on how the contents fits the
screen-size.

{% include modules/takeaway.liquid title="TL;DR" list=page.key-takeaways.make-responsive %}

We are going to  {% link_sample _code/content-without-styles.html %} take our content and structure {% endlink_sample %} and create our {% link_sample _code/content-with-styles.html %} final result. {% endlink_sample %}

## Add a viewport

Even for a basic page you **must** always include a viewport meta tag.  The viewport
is the most critical component you need for building mobile-first experiences.
Without it, your site will not work well on a mobile device.

The viewport indicates to the browser that the page needs to be scaled to fit
the screen.  There are many different configurations that you can specify for
your viewport to control the display of the page.  As a default, we recommend:

{% include_code _code/viewport.html viewport %}

The viewport lives in the head of the document and only needs to be declared once.

<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

* [Setting the Viewport]({{site.baseurl}}/the-essentials/multi-device-layouts/rwd-fundamentals/index.html#set-the-viewport)
{: .list--links}

</div>
</div>
</div>
</div>

[TODO: Add Images]

To apply the correct styling at these break-points we will use 
[Media Queries](/web/essentials/the-essentials/multi-device-layouts/rwd-fundamentals/index.html#use-css-media-queries-for-responsiveness) 
to let us adapt the style and layout of the content to the width of the screen.

<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

*  [Using Media Queries](/web/essentials/the-essentials/multi-device-layouts/rwd-fundamentals/index.html#use-css-media-queries-for-responsiveness) 
*  [Major Breakpoints](/web/essentials/the-essentials/multi-device-layouts/rwd-fundamentals/index.html#use-css-media-queries-for-responsiveness) 
*  [Minor Breakpoints](/web/essentials/the-essentials/multi-device-layouts/rwd-fundamentals/index.html#use-css-media-queries-for-responsiveness)
</div>
</div>
</div>
</div>

## Set your first breakpoint

[TODO: GIF of it starting to look bad].

The design starts to look bad at about 600px wide.  This is a good place to
create our first breakpoint as it  will give us scope to reposition elements to
make them fit the screen better.  We can do this as follows:

{% include_code _code/firstbreakpoint.html first css %}

There is more space on a larger screen so there is more flexibility with how
content can be displayed.  In the context of this page it looks like we will
need to:

*  Constrain the maximum width of the design
*  Alter the padding of elements and reduce the text size
*  Move the form to float inline with the heading content
*  Make the video float around the content
*  Reduce the size of the images and have them appear in a nicer grid

## Constrain the maximum width of the design

We have chosen to have only two major design: a narrow viewport and a wide
viewport.

This means we should constrain the maximum width of the screen to be 800px so
that the  content doesn't stretch out too far on large screens.

We need to create a container around each major section to make a system
that has an auto margin.  This will allow the screen to grow but the content
centered and at a maximum size of 800px.

To achieve this effect we need to edit our structure slightly to do this.

{% include_code _code/fixingfirstbreakpoint.html containerhtml html %}

And then create a style that ensures that the content is padded and centered.

{% include_code _code/fixingfirstbreakpoint.html container css %}

#### Alter the padding of elements and reduce the text size

On the narrow viewport we normally have a lot less space to display content so
the size and weight of the typography is often drastically reduced to fit the
screen.

With the larger viewport we need to consider that the user is more likely
further away from the screen so to increase the readability of the content we
can increase the size and weight of the typography and we can alter the padding
to make distinct areas stand out more.

{% include_code _code/fixingfirstbreakpoint.html padding css %}

[TODO: GIF of it starting to look better with altered].

### Float the Form element

The narrow viewport means that we have a lot less horizontal space available for
us to comfortably position elements on the screen.

To make more effective use of the horizontal screen space we need to break out
of the  the linear flow of the header and move the form and the list to be next
to each other.

{% include_code _code/fixingfirstbreakpoint.html formfloat css %}

{% include_code _code/fixingfirstbreakpoint.html padding css %}

[sratch]: 

## Add stylistic images

Stylistic images are images that are not needed as part of the core content.

A good example of this is a headline image for the 'above the fold' content.

[TODO: Add Image]

{% include_code _code/addimages.html styles css %}

We have chosen a simple background image that is blurred so it doesn't take away
from the content and we have set it to `cover` the entire element.


## Float the Video element

The video element can also be moved out of the vertical flow of the narrow
viewport and  can be display side by side with the bulleted list of content.

[TODO: Animated GIF]

{% include_code _code/fixingfirstbreakpoint.html floatvideo css %}

## Tile the Images

The images in the narrow viewport (mobile devices mostly) interface are set to
be  the full width of the screen.  This doesn't scale well on a screen with a
wide viewport.

[TODO: Animated GIF]

To make the images look correct on the screen they are scaled to 50% of the
container width.  This means that we will get a nice grid of images and the
images will inflate to large.

{% include_code _code/fixingfirstbreakpoint.html tileimages css %}

[TODO:  Make the images reposnive to DPI.]

## Wrapping up

We have created a simple product landing page that works across a large range of
devices, form-factors and screen sizes.

*  Always set a viewport
*  Create your base experience around mobile first
*  Understand the content you want to display
*  Once you have your mobile experience, increase the width of the display until it doesn't look right and set your breakpoint


<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

* Todo: list the major topics to explore
{: .list--links}

</div>
</div>
</div>
</div>

{% include modules/nextarticle.liquid %}

{% endwrap %}
