---
layout: article
title: "What Is a Build Process"
description: "A build process is a set of tasks to compile and test code before deployment. Learn which tasks to include in your build process and why."
introduction: "A build process is a set of tasks to compile and test code before deployment. Learn which tasks to include in your build process and why."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
collection: build-your-site
key-takeaways:
  build-process:
    - Build steps shouldn't be linear and manually driven; they should be cyclical and automatic.
    - Testing across many devices is a laborous task. Automate as much as you can!
    - Limit context switching; integrate build tools with debugging tools so you can iterate with ease.
notes:
  tbd:
    - TBD.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.build-process %}

{% include modules/toc.liquid %}

## How should the build process be used in your workflow?

Your build process shouldn't be a separate set of tasks
that you run towards the end of your development workflow.
Instead, integrate your build process with your coding,
testing, and iterative debugging cylces.

Get tools that automatically run build tasks
so that you can keep coding.
Anytime you save code,
these tools automatically test the code compiles,
optimize the code, compile,
and run tests to check responsiveness,
performance, and brower/device compatibility.

##  What tasks should the build process automate?

Your build process should automatically do these three tasks:

* Compile code.
* Test compiled code.
* Integrate with debugging tools.

There's quite a bit that needs to happen within each of these tasks
so that your site is ready for deployment on many devices.

### Compile code

As you code,
your build tools should test the code compiles,
report errors so you can debug, optimize code,
compile new version of site with new code,
and automatically load the changes live.

Lots of build tools support this workflow:
<a href="http://gruntjs.com/">Grunt</a>,
<a href="http://www.gnu.org/software/make/">Make</a>,
<a href="https://github.com/broccolijs/broccoli">Broccolli</a>.
The Web Starter Kit uses
<a href="http://gulpjs.com/">Gulp</a>.

Regardless of whether or your using a command-line set of tools
or a GUI like <a href="https://incident57.com/codekit/">CodeKit</a>,
your build process tools should automatically
optimize your code as you work,
and iteratively update compiled code.

Build steps shouldn't be linear and manually driven;
they should be cyclical and automatic. 

### Test compiled code

Testing across many devices is a laborous task.
Automate as much as you can!

* Your build process should integrate with live reloading
and support synchronized navigation so you can test
your site on many devices in one-click.
* Integrate your build process with a responsive screenshot tool
like <a href="">BrowserStack</a> so you can check your site's
layout across lots and lots of devices.
* Integrate your build process with a performance tool like
<a href="">PageSpeed</a>. Make it easy to check performance
all the time and on any device.
* Get your build process to kick off unit tests that 'emulate' your site
on as many devices as possible. Mimic hardware and network constraints
as much as possible in these tests.

### Integrate with debugging tools

Limit context switching;
integrate build tools with debugging tools so you can interate with ease.
Avoid at all costs the separation between debugging your code
and seeing the results on a range of devices.
This slows your development to a halt
and you'll start to think maybe it's OK to just have a site that works nice on a desktop.

Seemless integration with debugging tools means you can debug your code
and see it live on as many real and emulated devices as you deem necessary.
You can keep debugging your code,
and the build tools automatically push code changes live.

## What's in the Web Starter Kit build process?

At a glance,
the Web Starter Kit build tools automate these tasks:

* Cross-device synchronization; synchronizes clicks, scrolls, forms, and live-reload across multiple devices as you edit your code.
* Live browser reloading; reloads the browser in real-time anytime you edit code.
* Built in HTTP Server for previewing your site so you can test your pages without setting up other tools.
* PageSpeed Insights Reporting.
* Performance optimization; minifies and concatenates JavaScript, CSS, HTML,
and images.
* Compiles Sass into CSS.

The next section covers the Web Starter Kit build process in detail.

<img src="imgs/web-starter-kit.gif" class="center" alt="web starter kit in action">

{% include modules/nextarticle.liquid %}

{% endwrap %}
