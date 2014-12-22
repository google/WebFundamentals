---
layout: article
title: "Create Your Content and Structure"
description: "Content is the most important aspect of any site. In this guide,
  we will show how you can quickly plan to build your first multi-device site."
introduction: "Content is the most important aspect of any site. So let’s design for the content and not let the design dictate the content. In this guide, we identify the content we need first, create a page structure based on this content, and then present the page in a simple linear layout that works well on narrow and wide viewports."
notes:
  styling:
    - Styling will come later
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 1
priority: 0
id: multi-screen-content
collection: multi-screen
authors:
  - paulkinlan
translators:
related-guides:
  create-amazing-forms:
    -
      title: Create amazing forms
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Label and name inputs correctly
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
    -
      title: Choose the best input type
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "Forms"
        href: fundamentals/input/form/
  video:
    -
      title: Using video effectively
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Change the starting position
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
    -
      title: Include a poster image
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "Video"
        href: fundamentals/media/
  images:
    -
      title: Using images effectively
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title:  Correct use of images in markup
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/
    -
      title: Image optimization
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "Images"
        href: fundamentals/media/

key-takeaways:
  content-critical:
    - Identify the content you need first.
    - Sketch out Information Architecture (IA) for narrow and wide viewports.
    - Create a skeleton view of the page with content but without styling.
---

{% wrap content %}

{% include modules/toc.liquid %}

## Create the page structure

We have identified we need:

1.  An area that describes at a high-level our product "CS256: Mobile web development" course
2.  A form to collect information from users who are interested in our product
3.  An in depth description and video
4.  Images of the product in action
5.  A data table with information to back the claims up

{% include modules/takeaway.liquid list=page.key-takeaways.content-critical %}

We have also come up with a rough information architecture and layout for both
the narrow and wide viewports.

<div class="demo clear" style="background-color: white;">
  <img class="g-wide--1 g-medium--half" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

This can be converted easily into the rough sections of a skeleton page that
we will use for the rest of this project.

{% include_code _code/addstructure.html structure %}

## Add content to the page

The basic structure of the site is complete. We know the sections we need, the
content to display in those sections, and where to position it in the overall
information architecture. We can now start to build out the site.

{% include modules/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### Create the headline and form

The headline and request notification form are the critical components of
our page. These must be presented to the user immediately.

In the headline, add simple text to describe the course:

{% include_code _code/addheadline.html headline %}

We need to also fill out the form.
It will be a simple form that collects the users' names,
their phone number, and a good time to call them back.

All forms should have labels and placeholders to make it easy for users to
focus elements, understand what is supposed to go in them, and to also help
accessibility tools understand the structure of the form.  The name attribute
not only sends the form value to the server, it is also used to give important
hints to the browser about how to automatically fill in the form for the user.

We will add semantic types to make it quick and simple for users to be able to
enter content on a mobile device.  For example, when entering a telephone
number, the user should just see a dial pad.

{% include_code _code/addform.html form %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### Create the Video and Information section

The Video and Information section of content will contain a little more depth.
It will have a bulleted list of features of our products and will also contain
a video placeholder that shows our product working for the user.

{% include_code _code/addcontent.html section1 %}

Videos are often used to describe content in a more interactive manner and are
frequently used to show a demonstration of a product or a concept.

By following the best practices, you can easily integrate video into your site:

*  Add a `controls` attribute to make it easy for people to play the video.
*  Add a `poster` image to give people a preview of the content.
*  Add multiple `<source>` elements based on supported video formats.
*  Add fall-back text to let people download the video if they can't play it in the window.

{% include_code _code/addvideo.html video html %}

{% include modules/related_guides.liquid inline=true list=page.related-guides.video %}

### Create the Images Section

Sites without images can be a little boring. There are two types of images:

*  Content images &mdash; images that are in-line in the document and are used
   to convey extra information about the content.
*  Stylistic images &mdash; images that are used to make the site look
   better; often these are background images, patterns and gradients.  We will
   cover this in the [next article]({{site.baseurl}}{{page.article.next.url}}).

The Images section in our page is a collection of content images.

Content images are critical to conveying the meaning of the page. Think of
them like the images used in newspaper articles.  The images we are using are
pictures of the tutors on the project:  Chris Wilson, Peter Lubbers and Sean
Bennet.

{% include_code _code/addimages.html images html %}

The images are set to scale to 100% of the width of the screen. This works
well on devices with a narrow vieport, but less well on those with a
wide viewport (like desktop).  We will manage this in the responsive design
section.

{% include modules/related_guides.liquid inline=true list=page.related-guides.images %}

Many people don't have the ability to view images and often use an assistive
technology such as a screen reader that will parse the data on the page and
relay that to the user verbally.  You should ensure that all your content
images  have a descriptive `alt` tag that the screen reader can speak out to
the user.

When adding `alt` tags make sure that you keep the alt text as concise as
possible to fully describe  the image.  For example in our demo we simply
format the attribute to be "Name: Role", this presents enough information
to the user to understand that this section is about the authors and what
their job is.

### Add the Tabulated Data Section

The final section is a simple table that is used to show specific product stats
about the product.

Tables should only be used for tabular data, i.e, matrices of information.

{% include_code _code/addcontent.html section3 %}

### Add a Footer

Most sites need a footer to display content such as Terms and Conditions,
disclaimers, and other content that isn't meant to be in the main navigation
or in the main content area of the page.

In our site, we will just link to Terms and Conditions, a Contact page, and
our social media profiles.

{% include_code _code/addcontent.html footer %}

## Summary

We have created the outline of the site and we have identified all the main
structural elements.  We have also made sure that we have all the relevant
content ready and in-place to satisfy our business needs.

<div class="clear">
  <img class="g-wide--2 g-medium--half" src="images/content.png" alt="Content" style="max-width: 100%;">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/narrowsite.png" alt="" style="max-width: 100%;">
</div>

You will notice that the page looks terrible right now; this is intentional.
Content is the most important aspect of any site and we needed to make sure we
had a good solid information architecture and density. This guide has given us
an excellent base to build upon. We will style our content in the next guide.

{% include modules/nextarticle.liquid %}

{% endwrap %}
