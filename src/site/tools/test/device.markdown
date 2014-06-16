---
layout: article
title: "Real Device Testing"
description: "There's no substitute for testing your site on real devices. But it can be cumbersome if you don't have the right tools. What you want is your target devices a click away from your testing site."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
collection: test
key-takeaways:
  starter-kit:
    - TBD.
notes:
  placeholder:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Cross device testing

<a href="http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/">cross device testing</a>
is important.
Being able to sync clicks, scrolls, navigation between devices is important
because you can see exactly what breaks and what visually needs improvement
in your RWD design instead of after the fact.

Ideally, you just want your target devices to be a click away.
The Web Starter Kit makes this possible.
Just navigate to local url and
external url on any device.

What Web Starter Kit gives you:

Cross-device Synchronization
Synchronize clicks, scrolls, forms and live-reload across multiple devices as you edit your project. Powered by BrowserSync.

Live Browser Reloading and Performance optmization
Reload the browser in real-time anytime an edit is made without the need for an extension.
Compile Sass into CSS with ease, bringing support for variables, mixins and more.
Minify and concatenate JavaScript, CSS, HTML and Images to help keep your pages lean.

Built in HTTP Server
A built in server for previewing your site means you can test your pages without messing with other tools.
PageSpeed Insights Reporting
Web performance metrics showing how well your site performs on mobile and desktop.

Pro-tip: If interested in running unit tests across browsers/devices, you’ll need a test runner that canrun your test suite on these platforms. Some options for this include Karma, Yeti and Thrill.

It’s not always possible to own the devices you’re targeting, especially if you’re a freelancer or don’t work for a large company. There are thankfully an increasing number of
<a href="http://opendevicelab.com/">open device-labs</a> that can loan you hardware,
but even if you do own your target devices,
it can be a tedious process setting them all up for testing.
DeviceAnywhere are another option that focus on the manual testing of real devices.

## Sychronized testing across devices

If you’re already using Grunt (or Yeoman) and have LiveReload setup,
it’s easy to update your workflow to enable cross-device testing
where each change you make in your editor causes a reload
in any of the devices you’ve opened up your local app on.
For more information on how to set this up,
see Matt Bailey’s write-up.

## Improve flow from desktop to target device

If you have access to some of your target devices,
there are a number of tools aimed at improving the flow
from desktop to your mobile devices.

Remote Preview is an open source tool where you host its html page and content
and point your device's browser to.
The page will regular check a file for a URL and load it into an iframe.
This is great for chaining devices together and easily changing URL
across all of them.

Adobe Edge Inspect is a tool which loads the url from your current Chrome tab,
onto any local device with the Adobe Edge Inspect app open.

Ghostlab has a nice flow where you create a local server
from within the app for any directory and
any connected browser will sync interactions with the page
(i.e. scrolling, clicking and form filling).

The biggest criticisms of these tools is that,
depending on the number of devices you intend to test,
the initial set-up and can be cumbersome and some tools fail
to support the way an end user would view your web app.
For instance Remote Preview loads the page in an iframe,
which can have adverse effects and
Adobe Edge Inspect loads the page into a WebView inside of their application.

In building the Web Starter Kit,
we looked at a range of these tools, and brought the best of them together
into the one kit so you just have to set up the kit
and you get an improved flow from desktop to any device pointing to the staging url.

{% include modules/nextarticle.liquid %}

{% endwrap %}
