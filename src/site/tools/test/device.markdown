---
layout: article
title: "Real Device Testing"
description: "Always test on real devices. Don't waste time on manually setting up each testing device. Choose tools that let you test across many devices in one-click."
introduction: "Always test on real devices. Don't waste time on manually setting up each testing device. Choose tools that let you test across many devices in one-click."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
collection: test
key-takeaways:
  starter-kit:
    - There's no substitute for real device testing. You must test on real devices.
    - You don't need to dread the set-up and manual testing process anymore. Testing your site on real devices need only be a click away.
    - Choose a testing solution that has live reloading. Change in one place and see those changes everywhere.
    - Synchronized testing solution let you test user interaction on all devices at the same time.
notes:
  unit-tests:
    - If interested in running unit tests across browsers/devices, you’ll need a test runner that canrun your test suite on these platforms. Some options for this include <a href="http://karma-runner.github.io/0.12/index.html">Karma</a>, <a href="http://www.yuiblog.com/blog/2010/08/25/introducing-yeti-the-yui-easy-testing-interface/">Yeti</a> and <a href="http://thrilljs.com/">Thrill</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Set up device testing in one click

If you've started testing your site on different devices within the last two years,
it's likely you've gone through set up steps for the different platforms
multiple times.

You've experienced the frustration of using your site on a device,
seeing something wrong,
having to switch back to your development environment,
fix it, rebuild, push to each device again, maybe having to repeat some or all of the set-up steps.

Manual device testing isn't a practical workflow.

<img src="imgs/manual.png" class="center" alt="developer struggling to test on mobile manually">

What you need is a tool that lets you connect to any device in one-click.
Once connected to any device,
changes made in your development environment are automatically pushed to connected devices.

The Web Starter Kit has a built in HTTP Server for previewing your site.
This means that you can test your pages on any device without messing with other tools.
So long as your development environment and devices can be on the same network,
you can access the same local version of your site on any external devices.

## Live Browser Reloading

Arguably the biggest frustration with testing on real devices is the inability
to quickly fix a bug that you see on the real device in your source code.

With live browser reloading,
you don't need to access developer tools on your mobile device.
As you change your source code,
any instance of your site opened on any device is automatically reloaded live.

The Web Starter Kit takes reloading that bit further.
As you change your source code,
the tools compile Sass into CSS,
minify and concatenate JavaScript, CSS, HTML, and Images
and push the optmized site.

## Synchronize testing across devices

Sync clicks, scrolls, and navigation between devices
so you can see exactly what breaks and what visually needs improvement.

Powered by <a href="http://browsersync.io/">BrowserSync</a>,
the Web Starter Kit synchronizes clicks, scrolls, forms and live-reload
across multiple devices as you edit your project.

## Which devices you need and how to get them

Brad Frost's
<a href="http://bradfrostweb.com/blog/mobile/test-on-real-mobile-devices-without-breaking-the-bank/">Test on Mobile Devices without Breaking the Bank</a>
is a good starting point for deciding which devices you need
and provides links to get those devices.
But it's not always possible to own the devices you're targeting,
especially if you’re a freelancer or don’t work for a large company.

There are an increasing number of
<a href="http://opendevicelab.com/">open device-labs</a> that can loan you hardware,
but even if you do own your target devices,
it can be a tedious process setting them all up for testing.

The next section covers a range of cloud testing services
that can get you most of the way in terms of testing on a range of devices,without actually having those devices.

{% include modules/remember.liquid title="Note" list=page.notes.unit-tests %}

## Summary of device testing tools

Here's a summary of cross-device testing tools
(inspired by
<a href="http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/#toc-intro">Synchronized Cross Device Testing</a>):

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="tool">Cross-device Testing Tool</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="tool"><a href="https://github.com/google/web-starter-kit">Web Starter Kit</a></td>
      <td data-th="Description">Point any device to local version of your site. Update source files and tool automatically optimizes and pushes content to browser. Synchronized testing across devices. Develop on Mac, Linux, or Windows platforms; it's free.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="http://blog.mattbailey.co/post/50337824984/grunt-synchronised-testing-between-browsers-devices">Grunt + LiveReload</a></td>
      <td data-th="Description">Similar to Web Starter Kit, you can enable cross-device testing where each change you make in your editor causes a reload in any device you've opened your local site on. Some set-up required to get this going.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="http://html.adobe.com/edge/inspect/">Adobe Edge Inspect</a></td>
      <td data-th="Description">Loads the URL from your current Chrome tab onto any local device into a Webview inside the Adobe Edge Inspect app. You need to install each device manually and use specific clients on each single device. Requires a subscription to Creative Cloud.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="http://viljamis.com/blog/2012/remote-preview/">Remote Preview</a></td>
      <td data-th="Description">You host the tool's html page and content and point your device's browser to it. The tool regular checks a file for a URL and loads it into an iframe. Light-weight tool great for chaining devices together and easily changing URL across all of them. Doesn't support synchronized testing though.</td>
    </tr>
    <tr>
      <td data-th="tool"><a href="http://vanamco.com/ghostlab/">Ghostlab</a></td>
      <td data-th="Description">Creates a local server from within the app for any directory. Any connected browser will sync interactions with the page. Only available for Mac; purchase fee.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
