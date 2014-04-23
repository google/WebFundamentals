---
layout: article
title: "Build your first multi-screen site"
description: "The web is accessible on a huge range of devices from small-screen phones
to huge-screen televisions. Learn how to build a site that works well across all these devices."
introduction: "The web is accessible on a huge range of devices from small-screen phones
through to huge-screen televisions.  Each device presents its own unique
benefits and also constraints and as a web developer you are expected to support
all ranges of devices."
key-takeaways:
  include-viewport:
    - All pages must include a viewport and make sure it has the recommended
      configuration.
  test-page:
    - Set up your environment to be able to easily test
    - Use Chrome Dev Tools
  flesh-out:
    - Before you start, understand the content you need to display (text, images,
      tables and videos)
    - Start with the narrow viewport first (in many cases a mobile device) - often
      this is called Mobile first development
  great-form:
    - Use labels to let the user quickly focus on the field
    - Use placeholders to give an indication about the data to enter in the field
    - Use common names to help the user auto fill their forms
    - Use semantic types to help the user enter data quickly
  add-images:
    - Use the highest DPI possible for your source
    - Each source image should be made for 2x DPI and 1x DPI
    - Highly compress all your images
  add-video:
    - TODO
  make-responsive:
    - Always start with a narrow viewport first and scale out
    - Base your breakpoints off when you need to adapt the content
    - Create a high-level vision of your layout across major breakpoints
notes:
  styling: 
    - We have assumed a set of styles that include color, padding and font styling that match our brand guidelines.

collection: getting-started
---

{% wrap content %}

{% include modules/toc.liquid %}

Building multi-screen experiences is not as hard as it sounds. In this
guide, we are going to create a simple landing page that shows you the basics of
building a web site using "[Mobile First](link to mobile first)" design principles that
enable you to easily scale your experiences up from a mobile device through
to desktops and beyond.  We will show you best practices for interacting with both touch 
and mice as well as structuring your content across screen sizes.

Our goal in this guide is to build an example product landing page for our
hypothetical Smiles product.  The end result will be a fully functioning page
that covers many of the core principles of building experiences that work well
across all different device types.

# Getting Ready

## Set up development workspace

Great news. There is no need to set anything up. You just need a text editor
and 30 minutes to read this guide.

If you don't know what text editor to use here are some that we use:

* Textmate
* Sublime text
* Vim

We also recommend that you have a mobile device to hand to be able to test your
experiences on, however if you haven't got one this is not a problem there are
tools that you can use to help you along the way.

## Create first multi-screen page

Even for a basic page you must include a viewport meta tag.  The viewport is the
most critical[link to viewport doc] component you need for building mobile-first
experiences.  Without it, your site will not work well on a mobile device.

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.include-viewport %}

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

## Test your page

Testing your page is one of the most important things you can do to ensure you
offer a great experience across all the devices your user will access your
content on. There are a number of tools that you can use in each browser that
can help you.  Firefox has its inspector [link], IE has it's DevTools and Chrome
has Developer tools.

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.test-page %}

We are going to concentrate on using Chrome Developer Tools in this guide.  The
Chrome DevTools let you inspect any aspect of a web-page in real-time and
make changes on the fly.  It also has mobile emulation built in so that you can
rapidly test your layouts across a huge number of screen sizes without the need
to touch a mobile device.

[todo: insert animated gif of screen fitting]

1. Open your page
2. Open the inspector
3. Go to 'Emulation'
4. Pick your device and refresh the page

By using the mobile inspector throughout your project you can quickly see how this will
look across many different device classes.

If you have real device even better, you can hook up the Chrome DevTools to ensure
that you are always testing how it works for your users.

[TODO: Add link to setting up remote devtools.]


# Adding Structure

Once you are have your environment set up it is time to get started.  We are now going
to cover structuring your page with content such as text, video and images for a narrow viewport
(mobile) experience and before we then move on to work out how we make it responsive across
larger screens.

## Create the page structure

We believe that the content is the most important aspect.
So let's design for the content and not let the design dictate the content.  In
this lesson we will present a simple linear layout.

We have identified we need:

*  An area that describes at a high-level our product "Smiles"
*  A form to collect information from users who are interested in our product
*  An in depth description and video
*  Images of the product in action
*  A data table with information to back the claims up

Now that there is content, it is not too hard to create the structure of the
page. Based on the content we know we need a heading area, 3 sections of information and a footer.

We have also come up with a rough information architecture and layout for both the narrow
and wide viewports.

[TODO: Show a rough sketch of the IA for narrow viewport]

[TODO: Show a rough sketch of the IA for wide viewport]

This can be converted easily in to the rough sections of a skeleton page.

{% include_code _code/addstructure.html structure %}

## Add Content

The basic structure of the site is complete and we know what sections we need, what content
we will display and where it will be positioned in the overall information architecture we can now
start to build out the site.

{% include modules/remember.liquid title="Note" list=page.notes.styling %}

### Add the Headline

The headline is the first section that a user will see when they land on the page.
We need to create a concise introduction and a place holder for a form that we will
complete later.

{% include_code _code/addcontent.html headline %}

[TODO: Add Image]

### Add the Video and Information section

The Video and Information section of content will contain a little more depth.  It will 
have a bulleted list of features of our products and will also contain a video placeholder 
that will show our product working for the user.

{% include_code _code/addcontent.html section1 %}

[TODO: Add Image]

### Add the Images Section

The Images section is a collection of images that we will use that demonstrate four different
scenarios where our product can be used.

{% include_code _code/addcontent.html section2 %}

[TODO: Add Image]

### Add the Tabulated Data Section

The final section is a simple table that is used to show specific product stats about the product.

{% include_code _code/addcontent.html section3 %}

[TODO: Add Image]

### Add Footer

Most sites need a footer to display content such as Terms and Conditions, disclaimers and other content that is 
not meant to be in the main navigation.

{% include_code _code/addcontent.html footer %}

[TODO: Add Image]

{% link_sample _code/content-with-styles.html %} See example {% endlink_sample %}

## Create a great form

We are creating a product landing page so it makes sense to be able to let the
user pass us some of their details so that they can register interest.

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.great-form %}

In the heading area we will create a section for the form.  It will be a simple
form that collects the users names, their phone number and a good time to call
them back.

All forms should have labels and placeholders to make it easy for users to focus elements,
understand what is supposed to go in them and to also help accessibility tools
understand the structure of the form.  The name attribute not only sends the
form value to the server it is also used to give important hints to the browser
about how to automatically fill the form for the user.

We will add semantic types to make it quick and simple for users to be able to
enter content on a mobile device.  For example when entering a telephone number
the user should just see a dial pad.

[todo add screen shot]

{% include_code _code/withform.html form %}

<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

* [Create amazing forms]({{site.baseurl}}/the-essentials/user-input/form-input/index.html)
{: .list--links}

</div>
</div>
</div>
</div>

## Add Images to the Site

Sites without images can be a little boring.  There are two types of images:

*  Content images &mdash; Images that are in-line in the document and are used to convey 
extra information about the content.
*  Stylistic images &mdash; images are often used to make the site look better, often these are
background images, patterns and gradients.

### Add Stylistic images

Stylistic images are images that are not needed as part of the core content.

A good example of this is a headline image for the 'above the fold' content.

[TODO: Add Image]

{% include_code _code/addimages.html styles css %}

We have chosen a simple background image that is blurred so it doesn't take away from the content
and we have set it to `cover` the entire element.

### Add Content Images

Content images are images that are critical to conveying the meaning of the page.
Think of it as images that are used in newspaper articles.

[TODO: Add Image]

{% include_code _code/addimages.html images html %}

The images in this case our set to scale to 100% of the width of the screen.  This works well on 
mobile devices, but less well on desktop.  We will manage this in the responsive design section.

<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

* [Using images effectively]({{site.baseurl}}/the-essentials/introduction-to-media/images/index.html)
* [Optimizing images 101]({{site.baseurl}}/the-essentials/optimizing-performance/optimizing-content-efficiency/index.html#image-compression-101)
{: .list--links}

</div>
</div>
</div>
</div>

## Add a video to the site

Videos are often used to describe content in a more interactive manner and are
frequently used to show a demonstration of a product or a concept.  

By following the best practices you can easily integrate video in to your site:

*  Add a `controls` attribute to make it easy for people to play the video
*  Add a `poster` image to give people a preview of the content
*  Add multiple `<source>` elements based on supported video formats.
*  Add fall-back text to let people download the video if they can't play it in the window.

{% include_code _code/addvideo.html video html %}

<div class="related-items">
<div class="related-items">
<div class="container">
<div markdown='1' class="g-wide--push-1 g-medium--push-1">
### Related information
{: .related-items--title}

*  [Using video effectively]({{site.baseurl}}/the-essentials/introduction-to-media/video/index.html)
*  Another link once we have the article finalised
*  Another link once we have the article finalised
*  Another link once we have the article finalised
{: .list--links}

</div>
</div>
</div>
</div>

# Make your page responsive

The page has all the content needed to display on a narrow viewport, but on different screen sizes it doesn't
 look good because we have simply created a linear site.

[TODO: Image of widening the viewport.] 

We are using the principles of Mobile First web development.  We started
with a narrow viewport &mdash; similar to a mobile phone &mdash; and built for that 
experience first.  

Earlier we created a couple of different high-level designs for how our content should be displayed and
now we need to choose our breakpoints &mdash; a point where the layout and styles change &mdash; based on how the
contents fits the screen-size.

We can do this by making our viewport wider and making a judgement call on whether the design and layout look right.

[TODO: Add Images]

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.make-responsive %}

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

### Adding your first breakpoint

[TODO: GIF of it starting to look bad].

The design starts to look bad at about 600px wide.  This is a good place to create our first breakpoint as it 
will give us scope to reposition elements to make them fit the screen better.  We can do this as follows:

{% include_code _code/firstbreakpoint.html first css %}

There is more space on a larger screen so there is more flexibility with how
content can be displayed.  In the context of this page it looks like we will need to:

*  Constrain the maximum width of the design
*  Alter the padding of elements and reduce the text size
*  Move the form to float inline with the heading content
*  Make the video float around the content
*  Reduce the size of the images and have them appear in a nicer grid


#### Constrain the maximum width of the design

We have chosen to have only two major design: a narrow viewport and a wide viewport. 

This means we should constrain the maximum width of the screen to be 800px so that the 
content doesn't stretch out too far on large screens.

We need to create a container around each major section to make a system
that has an auto margin.  This will allow the screen to grow but the content
centered and at a maximum size of 800px.

To achieve this effect we need to edit our structure slightly to do this.

{% include_code _code/fixingfirstbreakpoint.html containerhtml html %}

And then create a style that ensures that the content is padded and centered.

{% include_code _code/fixingfirstbreakpoint.html container css %}

#### Alter the padding of elements and reduce the text size

On the narrow viewport we normally have a lot less space to display content so 
the size and weight of the typography is often drastically reduced to fit the screen.

With the larger viewport we need to consider that the user is more likely further away
from the screen so to increase the readability of the content we can increase the size and
weight of the typography and we can alter the padding to make distinct areas stand out more.

{% include_code _code/fixingfirstbreakpoint.html padding css %}

[TODO: GIF of it starting to look better with altered].

#### Float the Form Element

The narrow viewport means that we have a lot less horizontal space available for us
to comfortably position elements on the screen.

To make more effective use of the horizontal screen space we need to break out of the
 the linear flow of the header and move the form and the list to be next to each other.

{% include_code _code/fixingfirstbreakpoint.html formfloat css %}

{% include_code _code/fixingfirstbreakpoint.html padding css %}


#### Float the Video Element

The video element can also be moved out of the vertical flow of the narrow viewport and 
can be display side by side with the bulleted list of content.

[TODO: Animated GIF]

{% include_code _code/fixingfirstbreakpoint.html floatvideo css %}

#### Tile the Images

The images in the narrow viewport (mobile devices mostly) interface are set to be 
the full width of the screen.  This doesn't scale well on a screen with a 
wide viewport.

[TODO: Animated GIF]

To make the images look correct on the screen they are scaled to 50% of the container width.  This
means that we will get a nice grid of images and the images will inflate to large.

{% include_code _code/fixingfirstbreakpoint.html tileimages css %}

[TODO:  Make the images reposnive to DPI.]

# Summary

We have created a simple product landing page that works across a large range of devices,
form-factors and screen sizes.

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


{% endwrap %}
