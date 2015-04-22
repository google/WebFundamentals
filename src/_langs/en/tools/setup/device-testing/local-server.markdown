---
layout: article
title: "Access Your Site Through Local Server Connection"
seotitle: "Access Your Development Site Through Local Server Connection Using Port Forwarding"
description: "TBD."
introduction: "TBD."
authors:
  - megginkearney
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
collection: device-testing
key-takeaways:
  local-server: 
    - There's no substitute for running your site on a real device. You must try your site on real devices.
    - Something on local server connection (and port forwarding).
    - BrowserSync allows you to synchronise user interactions across a number of devices at the same time.
---
{% wrap content%}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.local-server %}

TBD. Merge port-forwaring content in remote-debugging docs with the content below.

One of the simplest ways to test on a real device, is to simply find the IP
address of your computer, run your web server and then point your mobile devices
to your computer's IP address.

Every OS has a different way of finding out your IP address. If you spot
the network panel on your computer, that will be the easiest way to find your
local IP address.  

OS X and Ubuntu users can always run `ifconfig` from a command prompt; Windows
users can run `ipconfig` from the command prompt.

python -m SimpleHTTPServe

## What to Do When Development Site and Device Are on Different Networks

It's often easier and more flexible to test your site using Chromes Port Forwarding
feature. This shares localhost sites from your computer, to your phone over
USB.

First [enable USB debugging on your Android device](#access-site-on-android-device).

<div class="media media--video">
  <iframe src="//www.youtube.com/embed/06k_hSKZvbo?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf&amp;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

Check your site running locally. In this example we have a
server running on port **3000**, so the URL is
[http://localhost:3000/](http://localhost:3000/):

![Demo site we are using as an example](imgs/port-forwarding-site-demo.png)

Open a new tab in Chrome and type in the URL `chrome://inspect` and plug your
phone in over USB.

![Chrome Inspect Screenshot](imgs/chrome-inspect.png) 

Click on the `Port Forwarding` button and enter the port your
server is on as well as a localhost port on your phone.

![Port Forwarding Settings](imgs/port-forwarding-dialog.png)

Make sure the 'Enable port forwarding' checkbox at the bottom of the popup
is checked. Press 'Done' and you'll be able to open http://localhost:3000 on
your mobile device and see your site.

## Get and Sync Devices

There are two key considerations when needing to test against a large number of devices: how to get access to those devices (and keep upgrading over time); how to simplify testing across all those devices.

Device Anywhere
(commercial)](http://www.keynote.com/solutions/testing/mobile-testing) lets you control any number of real devices remotely,
without having to actual own those devices outright.
True, you pay for the service, but it's a lot less expensive
and easier than manually setting up connections to
hundreds of devices.

If you have a large number of devices to test against, you may find it
overwhelming to do a basic test across all of the devices. [Browser
Sync](http://www.browsersync.io/) can help with this by synchronising
interactions across all of your devices. This includes scrolling, clicking and
form entry.

<div class="media media--video">
  <iframe src="//www.youtube.com/embed/RKKBIs_3svM?controls=2&amp;modestbranding=1&showinfo=0&;utm-source=crdev-wf&;rel=0" frameborder="0" allowfullscreen=""></iframe>
</div>

BrowserSync is enabled out of the box with [Web Starter
Kit](https://developers.google.com/web/starter-kit/), so try it out there or
check out the gulp file for how to integrate it in your own workflow.

If you aren't using Gulp, head on over to the [BrowserSync
site](http://www.browsersync.io/) for alternative approaches to using it.

If interested in running unit tests across browsers/devices, you’ll need a test runner that can run your test suite on these platforms. Some options for this include [Karma](http://karma-runner.github.io/0.12/index.html), [Yeti](http://www.yuiblog.com/blog/2010/08/25/introducing-yeti-the-yui-easy-testing-interface/) and [Thrill](http://thrilljs.com/).

{% include modules/nextarticle.liquid %}

{% endwrap %}
