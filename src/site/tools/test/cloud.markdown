---
layout: article
title: "Cloud Testing"
description: "While there's no substitute for real device testing, cloud testing gets you most of the way. Your testing story should include both real and cloud-based testing."
introduction: "While there's no substitute for real device testing, cloud testing gets you most of the way. Your testing story should include both real and cloud-based testing."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: test
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

## What is cloud testing?

Cloud testing uses tools in the cloud to test your site.
These tools emulate real device testing,
but they aren't a replacement for real device testing.
There are, however, big enough advantages to testing in the cloud;
your development workflow should incorporate both real device testing and cloud testing.

Three key advantages to testing in the cloud:

* You don't need to buy lots of devices.
* You can test your site in the same development workspace as your code editor and debugging tools.
* Automated unit tests can run your site on many browsers, platforms, and devices at the same time.

## Difference between emulators and simulators?

Emulators 'emulate' device hardware and operating systems,
letting you test and debug your application and see how it is working
almost as if testing on the actual device.
Use the Chrome DevTools [mobile emulation tool]({{site.baseurl}}/tools/test/emulator.html).

<img src="imgs/emulate.png" class="center" alt="Chrome DevTools emulator">

Simulators let you 'simulate' how your site looks and feels
on a device.
They typically don't emulate operating system or hardware features.

If you have a Mac,
the iOS simulator is a great tool for seeing how your site behaves
on an iOS device while working with the Web Inspector
(see below for more on how to use the iOS simulator).

Emulators tests more than just your site's responsiveness.
You can emulate network performance, hardware features like geolocation,
and other platform features.
Some emulators let you run a local server via local tunneling,
so that you are testing your site on an actual device somewhere.

Simulators are usually easier to use than emulators,
but they aren't as useful; they don't give the full picture
of how your site will behave on a device.
For the complete run-down on emulators and simulators,
see <a href="http://www.mobilexweb.com/emulators">Mobile Emulators & Simulators: The Ultimate Guide</a>.

## How to use the iOS simulator

According to the <a href="https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html">iOS Simulator User Guide</a>,
you should "think of the simulator as a preliminary testing tool to use
before testing your app on an actual device".

The iOS simulator comes with Xcode,
which you can <a href="https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12">install from the App Store</a>.
To open your site in the simulator:

1. Launch Xcode.
2. Choose Xcode > Open Developer Tool > iOS Simulator. The simulator displays the Home screen of whichever simulated device was last used.
3. From the Home screen, click Safari.
4. In the address field in Safari, type your site's URL and press the Return key.

If your Mac is connected to the internet,
Safari displays your site in the simulator:

<img src="imgs/WebFundamentalsIOS.png" class="center" alt="web fundamentals site in iOS simulator">

## Unit testing

When testing on real devices,
you are somewhat limited by the number of devices you have access to.
But with cloud testing services,
you have the ability to test your site against
any number of browsers, platforms, and devices at the same time.

Both <a href="https://saucelabs.com/">Sauce Labs (commercial)</a>
and <a href="http://www.keynote.com/solutions/testing/mobile-testing">DeviceAnywhere (commercial)</a>
let you write unit tests in any number of languages
and run them against a range of emulated environments.

If you use Grunt,
there are tasks available for
<a href="https://www.npmjs.org/package/grunt-saucelabs-qunit">running unit tests via Sauce Labs</a>.

<a href="https://www.browserstack.com/automate">BrowserStack (commercial)</a>
is the easiest to use:
You select an operating system, select your browser version and device type,
select a URL to browse, and it spins up a hosted virtual machine
that you can interact with.

You can also fire up multiple emulators in the same screen,
letting you test how your app looks and feels across multiple devices
at the same time.

## Take screenshots of your site

Many cloud testing services include a screenshot tool.
Screenshots are an important comparison tool
between views on different devices. 
With no set-up required,
you can type in a URL on the
<a href="http://www.browserstack.com/responsive">BrowserStack website</a>.

The tool automatically creates screenshots
for the URL on a range of devices and saves them in a downloadable URL:

<img src="imgs/browserstack.png" class="center" alt="screenshots of URL on range of devices">

{% include modules/nextarticle.liquid %}

{% endwrap %}
