---
layout: article
title: "Cloud Testing"
description: "TBD."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 4
#collection: test
key-takeaways:
  starter-kit:
    - TBD.
notes:
  placeholder:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

TBD.

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## TBD.

Fortunately a number of real-time testing services have popped up allowing you
to test a device with a specific operating system and browser in the cloud
from the comfort of your browser window.
Many even have support for not just testing remote sites
but also those running on a local server via local tunneling.

If you’re working on an open-source project,
Sauce Labs are an excellent option as they’re free to use.
Otherwise you can sign up for a free account which comes with 30 minutes of manual testing.
They have an extensive list of desktop browsers,
some mobile browsers and also support a screenshot service for taking periodic shots
of how your application looks on a variety of your target devices.

Pro-tips:
* If you would prefer to use an open-source tool for your device screenshots,
a lot of developers enjoy using Casper for this.
We’ve also had some success using grunt-autoshot for creating screenshots of our pages
at different responsive breakpoints.
* If you use Grunt,
there are tasks available for running your unit tests via Sauce Labs.

BrowserStack are our preferred option and have a larger catalog of setups available
for mobile device testing and are fairly easy to use.
You select an operating system, select your browser version and device type,
select a URL to browse and it will spin up a hosted virtual machine
that you can interact with.
You also get access to the most common browser developer tools
such as Chrome DevTools and Firebug.

You also get access to the most common browser developer tools
such as Chrome DevTools and Firebug.

What many developers don’t realize is that if you fire up one device emulator,
you can also ask BrowserStack to fire up other emulators in the same screen,
meaning you can test out how your app looks and feels
on a Nexus tablet and an iPad at the same time.

Pro-tips:

* There are Grunt tasks available for firing new emulators up using BrowserStack
such as grunt-browserstack.
In our experience, however, it’s usually just easier to use grunt-open
to open up your browser window for you then navigate to the browserstack site
with the device/OS you want to test.
* You can also setup command-line aliases
for firing up combinations of browsers and devices.
See these dotfiles for an example.

A quick note BrowserStack is officially used by the jQuery team for testing their builds whilst Sauce Labs sponsor the Selenium testing project.

Pro-tip: for those more interested in running their unit tests
across browsers/devices,
you’ll need a test runner that can run your test suite on these platforms.
Some options for this include Testacular, Yeti and Thrill.

## TBD.

TBD.

## TBD.

TBD.

{% include modules/nextarticle.liquid %}

{% endwrap %}
