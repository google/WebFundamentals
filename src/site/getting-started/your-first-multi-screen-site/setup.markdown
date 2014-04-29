---
layout: article
title: "Set-up your environment"
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
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 0
#collection: multi-screen
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

## Test your page

Testing your page is one of the most important things you can do to ensure you
offer a great experience across all the devices your user will access your
content on. There are a number of tools that you can use in each browser that
can help you.  Firefox has its inspector [link], IE has it's DevTools and Chrome
has Developer tools.

{% include modules/takeaway.liquid list=page.key-takeaways.test-page %}

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

{% include modules/nextarticle.liquid %}

{% endwrap %}
