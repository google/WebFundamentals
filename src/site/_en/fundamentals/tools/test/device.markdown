---
layout: article
title: "Real Device Testing"
description: "When it comes to testing and developing on a real device there are a few things
to point out and some tips to bear in mind."
introduction: "When it comes to testing and developing on a real device there are a few things
to point out and some tips to bear in mind."
article:
  written_on: 2014-05-29
  updated_on: 2014-09-25
  order: 1
collection: test
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
  starter-kit:
    - There's no substitute for real device testing. You must test on real devices.
    - BrowserSync allows you to test user interaction on all devices at the same time.
notes:
  unit-tests:
    - If interested in running unit tests across browsers/devices, you’ll need a test runner that can run your test suite on these platforms. Some options for this include <a href="http://karma-runner.github.io/0.12/index.html">Karma</a>, <a href="http://www.yuiblog.com/blog/2010/08/25/introducing-yeti-the-yui-easy-testing-interface/">Yeti</a> and <a href="http://thrilljs.com/">Thrill</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Test a Local Server

One of the simplest ways to test on a real device is to simply find the IP
address of your computer, run your web server and then point your mobile devices
to your computers IP address.

Every OS has a different way of finding out your IP address. If you spot
the network panel on your computer, that will be the easiest way to find your
local IP address.  

OS X and Ubuntu users can always run \`ifconfig\` from the terminal; Windows
users can run \`ipconfig\` from the command prompt.

## Test on Mobile Using Port Forwarding

It's often easier and more flexible to test your using Chromes Port Forwarding
feature. This shares localhost sites from your computer, to your phone over
USB.

The first step is to enable USB debugging on your Android device. Go to
**Settings &gt; About Phone** and tap the **Build number** seven times (yes
seven times). Then return back to the **Settings** screen and select **Developer
Options**.

<div class="media media--video">
  <iframe src="//www.youtube.com/embed/06k_hSKZvbo?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf&amp;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

In Developer Options make sure the **USB debugging** is checked.

<img src="imgs/usb_debugging_on.png" alt="Enable USB Debugging" />

Now double check that your site running locally. In this example we have a
server running on port **3000**, so the URL is
[http://localhost:3000/](http://localhost:3000/):

<img src="imgs/port-forwarding-site-demo.png" alt="Demo site we are using as an example" />

Open a new tab in Chrome and type in the URL `chrome://inspect` and plug your
phone in over USB.

<img src="imgs/chrome-inspect.png" alt="Chrome Inspect Screenshot" />

Clicking on the \`Port Forwarding\` button will allow you to enter the port your
server is on as well as a localhost port on your phone.

<img src="imgs/port-forwarding-dialog.png" alt="Port Forwarding Settings" />

Make sure 'Enable port forwarding' is checked at the bottom.Press 'Done' and
you'll be able to open http://localhost:3000 on your mobile device and see your
site.

## Use DevTools for Mobile Browsers

Each browser/platform has it's own way to debug sites. Use the appropriate
DevTools to help debug problems.

### Chrome for Android

You can use Chrome DevTools with Chrome for Android by setting up your device
for development and then visiting chrome://inspect. [Check out our Chrome
docs](https://developer.chrome.com/devtools/docs/remote-debugging) on how to set
all of this up.

<img src="imgs/chrome-inspect-devtools.png" alt="Chrome Inspect Demo" />

### Safari for iOS

To debug Safari for iOS, follow these steps:

1. Open Safari on your iOS device.
1. Connect it to your computer via USB.
1. Open Safari on your computer.
1. In Safari's menu, go to "Develop" and, look for your devices name .
1. Select the tab you want to debug.

<img src="imgs/ios-safari-debugging.png" alt="Safari iOS Debugging Menu" />

### IE for Windows Phone

Unfortunately there is no way to debug a site on Windows Phone, but you can  
[emulate a mobile browser on the desktop version of IE
11](http://msdn.microsoft.com/en-us/library/ie/dn255001%28v=vs.85%29.aspx).
We'll cover this in the [next article](browseremulation.html).

## Browser Sync

If you have a large number of devices to test against, you may find it
overwhelming to do a basic test across all of the devices. [Browser
Sync](http://www.browsersync.io/) can help with this by synchronising
interactions across all of your devices. This includes scrolling, clicking and
form entry.

<div class="media media--video">
  <iframe src="//www.youtube.com/embed/RKKBIs_3svM?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf&amp;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

Browser Sync is enabled out of the box with [Web Starter
Kit](https://developers.google.com/web/starter-kit/), so try it out there or
check out the gulp file for how to integrate it in your own workflow.

If you aren't using Gulp, head on over to the [BrowserSync
site](http://www.browsersync.io/) for alternative approaches to using it.


{% include modules/nextarticle.liquid %}

{% endwrap %}
