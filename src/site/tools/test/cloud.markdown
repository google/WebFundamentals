---
layout: article
title: "Cloud Testing"
description: "While there's no absolute substitute for testing your site works on real devices, there are lots of cloud testing services that will get you most of the way."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 2
collection: test
key-takeaways:
  starter-kit:
    - Cloud testing lets you test a specific device in the cloud; you don't actually have to own the device to get a relatively good idea of how your site will behave.
    - Emulators mimic the mobile device hardware and operating systems; simulators don't.
    - If you don't have access to a real device, use an emulator to test on that device, rather than a simulator.
    - For iOS testing, use the iOS simulator in combination with testing on real iOS devices.
notes:
  placeholder:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## What is cloud testing?

Cloud testing allows you to test a device with a specific operating system
and browser in the cloud from your browser window.
The disadvantage to debugging in the cloud is you can never be absolutely sure
how your site will perform on a device in the cloud.

That said, there are big enough advantages to testing in the cloud,
that your development workflow should incorporate both real device testing and cloud testing.

Two key advantages to testing in the cloud:

* You don't need to buy lots of devices.
* You can line up your code editor, debugging tools, and view of your site
on a device in your development workspace.
This can be a faster way to debug than having to context switch to actual devices.

## What's the difference between emulators and simulators?

Emulators 'emulate' device hardware and operating systems,
letting you test and debug your application and see how it is working
almost as if you were watching it's behavior on the actual device.
If you haven't chosen an emulator yet,
go with the Chrome DevTools Mobile Emulator 
(see the <a href="https://developers.google.com/web/fundamentals/tools/test/emulator.html">next section for a detailed overview</a>.

IMAGE PLACEHOLDER
Todo: screenshot of index.html in mobile emulator

Simulators let you 'simulate' how your site would look and feel
on a device.
They typically don't emulate operating system or hardware features.
Typically they let you test your site's responsive layout and not a lot more.
The iOS simulator is the exception,
letting you simulate quite a bit more than just layout
(there are <a href="https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/TestingontheiOSSimulator/TestingontheiOSSimulator.html#//apple_ref/doc/uid/TP40012848-CH4-SW1">limitations</a> though).
If you have a Mac,
the iOS simulator is a great tool for seeing how your site behaves
on an iOS device while working with the Web Inspector
(see below for more information on using the iOS simulator):

IMAGE PLACEHOLDER
Todo: screenshot of index.html in iOS simulator

Emulators tests more than just your site's responsiveness.
You can emulate network performance, hardware features like geolocation,
and other platform features.
Some emulators let you run a local server via local tunneling,
so that you are testing your site on an actual device somewhere.
Simulators are usually easier to use than emulators,
but they aren't as useful; they don't give the full picture
of how your site will behave on a device.
For a complete run-down of emulators and simulators out there,
check out <a href="http://www.mobilexweb.com/emulators">Mobile Emulators & Simulators: The Ultimate Guide</a>.

## How to use the iOS simulator

According to the <a href="https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/Introduction/Introduction.html">iOS Simulator User Guide</a>,
you should "think of the simulator as a preliminary testing tool to use
before testing your app on an actual device".

The iOS simulator comes with XCode,
which you can <a href="https://itunes.apple.com/us/app/xcode/id497799835?ls=1&mt=12">install from the App Store</a>.
To open your site in the simulator:

* Launch Xcode.
* Choose Xcode > Open Developer Tool > iOS Simulator. The simulator displays the Home screen of whichever simulated device was last used.
* From the Home screen, click Safari.
* In the address field in Safari, type your site's URL and press the Return key.

If your Mac is connected to the internet,
Safari displays your site in the simulator:

IMAGE PLACEHOLDER
Todo: Take a picture of web fundamentals site in iOS simulator
(not going to try and take picture of app this late in the game).

## Cloud testing services

### Take pictures and videos of your site

TBD.

Todo: Figure out the main featurs of the varous services
and use these to shape subsections and put in product descriptions within.

If you’re working on an open-source project,
Sauce Labs are an excellent option as they’re free to use.
DeviceAnywhere
Ghost Labs
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

{% include modules/nextarticle.liquid %}

{% endwrap %}
