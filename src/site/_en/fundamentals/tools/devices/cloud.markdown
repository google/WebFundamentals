---
layout: article
title: "Use Cloud Based Emulators and Devices"
description: "If you can’t use the simulators for whatever reason or all of the above looks a bit scary, then cloud based simulators are the next best thing."
introduction: "If you can’t use the simulators for whatever reason or all of the above looks a bit scary, then cloud based simulators are the next best thing."
article:
  written_on: 2014-05-29
  updated_on: 2014-09-25
  order: 4
collection: devices
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
  starter-kit:
    - Cloud testing lets you test your site on browsers, platforms, and devices in the cloud; you don't have to own the device to get a relatively good idea of how your site will behave.
    - Emulators mimic the mobile device hardware and operating systems; simulators don't.
    - If you don't have access to a real device, use an emulator rather than a simulator.
    - For iOS testing, use the iOS simulator in combination with testing on real iOS devices.
notes:
  emulatorsummary:
    - For the complete run-down on emulators and simulators, see <a href="http://www.mobilexweb.com/emulators">Mobile Emulators & Simulators: The Ultimate Guide</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

The one big advantage of cloud-based testing over real devices and emulators is
that you can automate unit tests for site across different platforms.

## BrowserStack

[BrowserStack (commercial)](https://www.browserstack.com/automate) is the
easiest to use, especially for manual testing: You select an operating system,
select your browser version and device type, select a URL to browse, and it
spins up a hosted virtual machine that you can interact with.

You can also fire up multiple emulators in the same screen, letting you test how
your app looks and feels across multiple devices at the same time.

## SauceLabs

[SauceLabs (Commercial)](https://saucelabs.com/) allows you to run unit tests
inside of an emulator, which can be really useful for scripting a flow through
your site and watch the video recording of this afterwards on various devices.

You can also do manual testing with your site, same as BrowserStack.

## Device Anywhere

Unlike BrowserStack and SauceLabs, [Device Anywhere
(commercial)](http://www.keynote.com/solutions/testing/mobile-testing) doesn't
use emulators, it uses real devices which you can control remotely.

This is very useful in the event where you need to reproduce a problems on a
specific device and can't see the bug on any of the above options.

{% include modules/nextarticle.liquid %}

{% endwrap %}
