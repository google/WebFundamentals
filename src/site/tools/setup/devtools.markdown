---
layout: article
title: "Set Up Developer Tools"
description: "Learn how to set up essential tools for the multi-device development workflow. Your tools should test your site's responsiveness and performance with minimum manual effort."
introduction: "Learn how to set up essential tools for the multi-device development workflow. Your tools should test your site's responsiveness and performance with minimum manual effort."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: set-up
key-takeaways:
  devtools:
    - Make the command line work for you; create aliases that are easy to remember and fast to type.
    - 
notes:
  alias:
    - Check out this good use case for aliases: list of <a href="http://tjholowaychuk.tumblr.com/post/26904939933/git-extras-introduction-screencast"> Git aliases</a>.
  firefox:
    - To test on Firefox browser, enable <a href="https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View">Responsive Design View</a>.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.devtools %}

{% include modules/toc.liquid %}

## Tools you need and why

There's no shortage of options when it comes to tools in the web development world.
There's often so much choice, it's daunting, and so you try and find the simplest
path to building a great site and stick with it as long as it's working for you.

If you want your site to work on smaller devices with less network reliability,
you need to build tools to optimize performance,
check your site's responsiveness,
and push changes to a live url on many devices.

Tools for testing across devices include a combination of actual devices,
device emulation, and device debugging tools.
It's kind of scary, the thought of testing your site on any number of devices.
But you need to do this and you need tools to help you make this as easy as possible.

<img src="imgs/url.png" class="center" alt="lots of devices open to same url">

## Set up aliases for common commands

Testing your site across devices takes time.
You need to steal back that time any way you can.
If you are still looking at a list of command shortcuts every time
you make your way into the terminal and/or
you are manually typing the same long commands,
it's time to create some short-cuts.

The easiest way create command-line short-cuts is to
add aliases for common commands to your `bashrc` file.
On Mac or Linux,
(see these <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx">instructions for setting up Windows aliases</a>):

* From the command line anywhere, type `vim ~/.bashrc
* Add a new alias, for example, `master = 'git checkout master'`
* From your source directory, run `master`.

Another slightly more advanced way to create short-cuts is
to <a href="http://dotfiles.github.io/">store dotfiles in GitHub</a>.
One major gain: your short-cuts won't be device dependent.

{% include modules/remember.liquid title="Note" list=page.notes.alias %}

##Set up responsive tools

Checking your site's responsiveness needn't be a manual task
of resizing the browser and watching for changes in behavior.
Get at least one tool to resize the browser,
and preferably one with image capturing
so that you can compare multiple views.

For Chrome,
<a href="http://outof.me/responsive-inspector-beta-released/">Responsive Inspect Chrome extension
visually shows the media queries of an opened site,
lets you resize the site in the browser,
and take a screenshot.

<img src="imgs/inspector.png" class="center" alt="Responsive Inspector Chrome extension">

To set-up and use the extension:

* <a href="https://chrome.google.com/webstore/detail/responsive-inspector/memcdolmmnmnleeiodllgpibdjlkbpim?hl=en">Download</a> the extension from the Chrome Web Store.
* On any opened site,
press the Responsive Inspect icon in the extension tool bar.
* Resize screen and take a screen shot.

{% include modules/remember.liquid title="Note" list=page.notes.firefox %}

## Set up build and live reloading tools

Build tooling-- lots out there, we've chosen Gulp in WSK
(others include Grunt, Broccoli, Make)

Obvious-- build tools builds your assets into a distribution folder,
something that you can then host somewhere.

What you need to think about now in build tools:
automatic optmization of all files

Hook into live reloading-- very important to be able to automatically push changes live to urls.

Performance is key ingredient for building for multi-device web.
Build tools not only should optimize for you, but also report performance changes
as you code 
(run builds and check what the exact term of stuff constantly being reported by build tools).

LiveReload. Navigate to same URL, synchronize scrolls, clicks, navigation (GhostLab),
and test across devices, actual, real devices.

Adobe Edge Inspect: http://html.adobe.com/edge/inspect/

## Set up device emulation

Emulation tool needs to be covered here-- set up anyway.
Should be used at all times.

Emulate viewport, touch events, orientation, user agent, geolocation

## Set up remote debugging

Chrome DevTools, Weinre comparison?

Adobe Edge Inspect: http://html.adobe.com/edge/inspect/

Firefox for Android + ADB, Safari remote debugging

chrome://inspect Raw USB debugging

Remote debugging + timeline
Rendering performance tooling

{% include modules/nextarticle.liquid %}

{% endwrap %}
