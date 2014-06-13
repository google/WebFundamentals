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
    - Don't check responsive layouts manually; get a tool to resize and capture screen views.
    - Set up build tools that automatically optimize, build, and live reload your testing url.
    - Don't wait to see your site on a device; use device emulation and remote debugging now not later. 
notes:
  alias:
    - Check out this good use case for aliases: list of <a href="http://tjholowaychuk.tumblr.com/post/26904939933/git-extras-introduction-screencast"> Git aliases</a>.
  firefox:
    - To test on Firefox browser, enable <a href="https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View">Responsive Design View</a>.
  grunt:
    - Check out this easy-to-follow <a href="http://24ways.org/2013/grunt-is-not-weird-and-hard/">blog post on using the grunt build tools</a>-- good resource if your new to build tools.
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

Build tools streamline the process of transferring source files to a target result
(examples:
<a href="http://gruntjs.com/">Grunt</a>, 
<a href="https://github.com/broccolijs/broccoli">Broccoli</a>,
<a href="http://www.gnu.org/software/make/">Make</a>,
and <a href="http://gulpjs.com/">Gulp</a>).
You want build tools that keep track of your site's performance;
they optimize source files automatically and measure your site's performance.

Live reloading tools apply source file changes
(CSS, HTML, JavaScript, image changes)
to your site live,
no reloading required, compilers, templating just works
(examples:
<a href="http://livereload.com/">LiveReload</a>
<a href="http://html.adobe.com/edge/inspect/">Adobe Edge Inspect</a>). 
You want live reloading tools that let you navigate to the same URL
on different devices. Scrolling, clicks, and navigation are synchronized.

The Web Starter Kit does it all:
watches for changes, optmizes files, builds your site,
and reloads the browser live.
The next guide provides step-by-step instructions
on how to set up and Web Starter Kit.

{% include modules/remember.liquid title="Note" list=page.notes.grunt %}

## Set up multi-device debugging now, not later

Search for "device emulator";
lots and lots of options out there for emulating your site
on any kind of device.
If you've got one and it does what you need,
then move on to the next topic.

If you don't,
use the Chrome DevTools emulator:

Learn the all the tricks for using this emulator
in <a href="">Emulation Testing</a>.

Chrome DevTools, Weinre comparison?

Adobe Edge Inspect: http://html.adobe.com/edge/inspect/

Firefox for Android + ADB, Safari remote debugging

chrome://inspect Raw USB debugging

Remote debugging + timeline
Rendering performance tooling

{% include modules/nextarticle.liquid %}

{% endwrap %}
