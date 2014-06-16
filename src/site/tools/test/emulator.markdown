---
layout: article
title: "Emulator Testing"
description: "Device emulation is the next best thing to real device testing."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
collection: test
key-takeaways:
  starter-kit:
    - TBD.
notes:
  comparions:
    - Describe different between emulation and simulation and then point to simulation docs. Emulation is more than simulation. It tries to mimic everything about the device, not just the layout, for example.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.starter-kit %}

## Testing multiple versions at the same time

There are of course emulators available for Android and if you are interested in testing against multiple versions of Android at the same time, Paul Kinlan has a write-up that shows you how to set this up.

## Emulate viewport

It's often easier to start prototyping on the desktop and then tackle the mobile-specific parts on the devices you intend to support. Device emulation can make this process more straightforward.

The DevTools support for device emulation includes native User Agent and dimension overriding. This allows developers to debug mobile browsers on different devices and operating systems via the Overrides menu.

IMAGE PLACEHOLDER

## Emulate touch events

Touch is an input method that's difficult to test on the desktop, since most desktops don't have touch input. Having to test on mobile can lengthen your development cycle, since every change you make needs to be pushed out to a server and then loaded on the device.

A solution to this problem is to simulate touch events on your development machine. For single-touches, the Chrome DevTools supports single touch event emulation to make it easier to debug mobile applications on the desktop.

IMAGE PLACEHOLDER

Multi-touch events can be simulated if you have a device with touch input, such as a modern Apple MacBook. For further assistance with multi-touch event simulation, see Multi-touch web development.

## Emulate orientation

Many new mobile devices are now shipping with accelerometers, gyroscopes, compasses and other hardware designed to determine capture motion and orientation data.
Web browsers are providing increasingly more access to that new hardware, including such examples as the HTML5 DeviceOrientation events. These events provide developers with information about the orientation, motion and acceleration of the device.
If your application is taking advantage of device orientation events, it can also be useful to override the values received by these events during debugging to avoid the need to test them on a physical mobile device.
The DevTools also support overriding device orientation.
For more information, read the DevTools mobile emulation documentation.

IMAGE PLACEHOLDER

## Emulate network conditions

You may wish to emulate the network conditions your users might experience during development. Luckily there are a few tools that can assist with this. 

If on a Mac, you can try out the Network Link Conditioner found in the Lion Developer Tools. These can be installed by going to Applications > Utilities > Network Link Conditioner and double-clicking the prefpane file.  Once you've launched it you'll see a drop-down listing a number of preconfigured network scenarios including 3G and EDGE.

IMAGE PLACEHOLDER

On Windows, options also include Fiddler and Charles - a HTTP proxy which can throttle your connection speeds. As you can see below, there are plenty of settings available for defining the network characteristics you would like to simulate.

IMAGE PLACEHOLDER

There are also a few other options for slow connection emulation which we didn’t get a chance to try out including Slowly.app (OSX, $), ipfw (Mac, Linux) and wipfw (Windows).

## Emulate user agent

TBD.

## Emulate geolocation

TBD.

{% include modules/nextarticle.liquid %}

{% endwrap %}
