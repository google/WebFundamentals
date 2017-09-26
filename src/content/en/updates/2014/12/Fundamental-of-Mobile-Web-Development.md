project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A quick look at some of the efforts the Chrome team are doing to helps developers get started with Web Development and iterate on their sites.

{# wf_updated_on: 2014-12-01 #}
{# wf_published_on: 2014-12-01 #}
{# wf_tags: news,fundamentals,mobile,frontend #}

# Fundamentals of Mobile Web Development {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

At [Chrome Dev Summit 2014](https://developer.chrome.com/devsummit/){: .external } there was a
whole host of topics and brand spanking new API's covered, but its not all about
the new and shiny.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="z6dg_V22wV0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

If you are a new Web Developer or even an experienced developer about to embark
on exploring new APIs, chances are you'll follow these three steps: learn, build
and iterate.

[Matt Gaunt](https://twitter.com/gauntface) covers the ongoing efforts to
address these problems from the Chrome Developer Platform team.


## Learn.

<p style="text-align: center;">
  <img src="/web/updates/images/2014/12/wf.png" width="498" height="332"
  alt="WebFundamentals on a HTML5Rocks" style="max-width:100%;height: auto;"/>
</p>

[Web Fundamentals](/web/fundamentals/) is a set of
use case led documentation covering a range of topics. The core goal is get
developers from little or no knowledge, to implementing best practices as
quickly as possible.

One of the main goals of Web Fundamentals is to ensure that if you are new to a
topic, the guidance reduces "choice paralysis" as much as possible. [Addy
Osmani](http://addyosmani.com) covers this perfectly over at [Pastry
Box](https://the-pastry-box-project.net/addy-osmani/2014-January-19).

If you do spot any issues with the site or it's content or you'd like Web
Fundamentals to cover a particular topic, then please do let us know by
[submitting feedback on
Github](https://github.com/Google/WebFundamentals/issues/new?title=Feedback%20for:%20/fundamentals/index.html).

## Build.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image01.gif" alt="Web Starter Kit on a Range Devices" width="464" height="252" style="max-width: 100%; height: auto;" />
</p>

To help you kick off a new web project we created [Web Starter
Kit](/web/tools/starter-kit/). It has everything you
need:

* A solid build process
* Boilerplate HTML
* Styleguide

### The Build Process

For those of you who are new to build processes, the easiest way to think of a
build process is to view it as a program which takes a set of files and performs
certain tasks on them and outputs new versions in a different location. The
tasks optimise the files to improve load times, check for possible errors or
handle tasks that can be automated.

In Web Starter Kit we have the following processes:

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image02.png" alt="Diagram of Web Starter Kits Build Process" width="624" height="470" style="max-width: 100%; height: auto;" />
</p>

We minify and concatenate CSS and JavaScript so that the browser can fetch the
file quickly, the JavaScript is also run through JSHint to check for JavaScript
best practices and common coding mistakes. Images are minified with imagemin and
you can get **huge** reductions in file size by using this. We also have a
process to create the styleguides CSS.

### Boilerplate for Multi-Device HTML

The first set of HTML you write for a new page is pretty bog standard and
chances are you'll have some way of quickly getting hold a stock HTML file that
works well across multiple devices and screen sizes.

In Web Starter Kit we wanted to add in support for any features which blurred
the lines between the platform and your site, so we've added support for [add to
home screen](/web/fundamentals/design-and-ux/browser-customization/)
and splash screens for Android, Windows Phone, iOS and Opera Coast.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image03.gif" alt="Example of Web Starter Kit Add to home screen" width="313" height="274" style="max-width: 100%; height: auto;" />
</p>

### Styleguide

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image04.gif" alt="Web Starter Kit Styleguide on Chromebook Pixel" width="624" height="416" style="max-width: 100%; height: auto;" />
</p>

The final piece of Web Starter Kit is it's Styleguide.

This gives any new project a great set of default styles and components that
encourages style driven development. You can alter existing styles to elements
and add your own.

In the next version of WSK, due for release early next year, we are working hard
to simplify how the styleguide fits together and switching to a [Material
Design](https://github.com/google/web-starter-kit/tree/material-sprint) look and
feel. [Matt ](http://youtu.be/z6dg_V22wV0?t=15m5s)[showed
an](http://youtu.be/z6dg_V22wV0?t=15m5s)[ early
mock](http://youtu.be/z6dg_V22wV0?t=15m5s) of what this may look like at Chrome
Dev Summit and you can see an example below.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image05.gif" alt="Web Starter Kit's Material Design Styleguide Mock" width="624" height="416"  style="max-width: 100%; height: auto;" />
</p>

## Iterate.

Once you've started to put your new knowledge into practice, you'll want to use
DevTools to debug, improve and maintain your work.

There are some huge new features landing in DevTools and Matt takes a look at
the following new features.

### Device Mode

Device mode is a new section in DevTools which allows you to quickly see how
your site works across different mobile devices, while viewing the media queries
in your CSS.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image06.gif" alt="Screenshot of Device Mode Feature in Chrome DevTools" width="532" height="297" style="max-width: 100%; height: auto;" />
</p>

One of the great features of Device Mode is the ability to throttle the network
speeds, allowing you simulate the experience of a user on a GPRS, EDGE, 3G, DSL
or Wifi connection.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image07.png" alt="Screenshot of Network Throttling in Chrome DevTools" width="624" height="336" style="max-width: 100%; height: auto;" />
</p>

### Paint Profiler

If you've ever opened up the timeline tab and hit the record button, you've
probably seen some paint events happen in the waterfall. Normally this would be
a black box with no way for you to know why the browser had done, or what it was
doing.

Paint profiler no gives you more information on what exactly the browser is
doing during that paint.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image08.jpg" alt="Screenshot of the Paint Profiler in Chrome DevTools" width="624" height="348" style="max-width: 100%; height: auto;" />
</p>

### Invalidation Tracking

DevTools now gives a reason why a paint or layout occurred whenever it can, this
is useful for anyone learning about the timeline, the browser behaviours and
allows you to optimise your code to prevent performance issues.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image09.png" alt="Screenshot of Invalidation Tracking in Chrome Devtools" width="624" height="396" style="max-width: 100%; height: auto;" />
</p>

### Flame Chart View

This is a very different way of viewing the information available in the
timeline. This makes it much easier to see how tasks overlap and what browser
behaviour happened as a result of other tasks.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image10.png" alt="Screenshot of Flame Chart View in Chrome DevTools" width="624" height="384" style="max-width: 100%; height: auto;" />
</p>

### Frame Viewer

While in Flame Chart view, you can select a specific frame and within this,
you'll be able to explore which elements in the page had been promoted to a
composite layer as well as why they've been promoted.

<p style="text-align: center;">
<img src="/web/updates/images/2014-12-02-fundamentals-of-web-dev/image11.jpg" alt="Screenshot of Frame Viewer in Chrome DevTools" width="624" height="537" style="max-width: 100%; height: auto;" />
</p>

## Learn. Build. Iterate.

These are some of the efforts from the Chrome team to help developers get up to
speed with web development, so be sure to check out [Web
Fundamentals](/web/fundamentals/), [Web Starter
Kit](/web/tools/starter-kit/) and the new features in
[Chrome DevTools](/web/tools/chrome-devtools).


{% include "comment-widget.html" %}
