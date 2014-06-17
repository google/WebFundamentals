---
layout: article
title: "Emulator Testing"
description: "Device emulation is the next best thing to real device testing. Learn how to use the Chrome DevTools Mobile Emulator to test your site across many devices."
introduction: "Device emulation is the next best thing to real device testing. Learn how to use the Chrome DevTools Mobile Emulator to test your site across many devices."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 3
collection: test
key-takeaways:
  emulator:
    - Start prototyping on the desktop; then tackle the mobile-specific parts on the devices you intend to support. Device emulation makes this process more straightforward.
    - The Chrome DevTools Mobile Emulation tool lets you emulate your site on a range of devices, testing not just the site's responsive, but how the site responds to user interactions and hardware constraints.
    - Devices often have unreliable connectivity; emulate network conditions.
notes:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.emulator %}

## Emulate viewport

When you select a device and press the Emulator button,
the tool zooms the page out to the physical default viewport of that device.
In the case of the Nexus 4, the device-width is 768.
See the
<a href="https://developer.chrome.com/devtools/docs/mobile-emulation">Chrome DevTools Mobile Emulation docs</a>
for detailed information on using the Chrome DevTools Mobile Emulator.

IMAGE PLACEHOLDER
Todo: screenshot of web fundamentals site emulated on Nexus 4
with DevTools open to show Enable Viewport setting.

## Emulate touch events

Touch is an input method that's difficult to test on the desktop,
since most desktops don't have touch input.
Having to test on mobile can lengthen your development cycle,
since every change you make needs to be pushed out to a server and then loaded on the device.

A solution to this problem is to simulate touch events on your development machine.
For single-touches,
the Chrome DevTools supports single touch event emulation
to make it easier to debug mobile applications on the desktop.

To enable support for touch event emulation:

1. Open the Emulation panel in the DevTools.
2. Enable "Emulate touch screen" in the Sensors pane.

IMAGE PLACEHOLDER
Todo: screenshot of web fundamentals site and DevTools
with Sensors pane open and setting enabled.

Multi-touch events can be simulated if you have a device with touch input,
such as a modern Apple MacBook.
For further assistance with multi-touch event simulation,
see <a href="http://www.html5rocks.com/en/mobile/touch/">Multi-touch web development</a>.

## Emulate orientation

Many new mobile devices are now shipping with accelerometers, gyroscopes,
compasses and other hardware designed to determine capture motion and orientation data.
Web browsers are providing increasingly more access to that new hardware,
including such examples as the
<a href="http://dev.w3.org/geo/api/spec-source-orientation">HTML5 DeviceOrientation events</a>.
These events provide developers with information about the orientation,
motion, and acceleration of the device.

If your application is taking advantage of device orientation events,
it can also be useful to override the values received by these events
during debugging to avoid the need to test them on a physical mobile device.

The DevTools also support overriding device orientation.
For more information,
read the
<a href="https://developer.chrome.com/devtools/docs/mobile-emulation#device-orientation-overrides"> Chrome DevTools device orientation overrides documentation</a>.

## Emulate network conditions

If you aren't able to test on all real devices,
you should emulate network conditions
your users might experience.

If on a Mac,
try out the
<a href="http://www.neglectedpotential.com/2012/05/slow-your-apps-roll/">Network Link Conditioner</a>
found in the Lion Developer Tools.
These can be installed by going to Applications > Utilities > Network Link Conditioner
and double-clicking the prefpane file.

Once you've launched it,
you'll see a drop-down listing a number of preconfigured network scenarios including 3G and EDGE:

IMAGE PLACEHOLDER
Todo: Just use image from Addy's notes.

On Windows,
options also include
<a href="http://www.telerik.com/fiddler">Fiddler</a> and
<a href="http://www.charlesproxy.com/">Charles</a>, an HTTP proxy which can throttle your connection speeds.

As you can see below, there are plenty of
<a href="http://roderick.dk/2012/05/11/simulate-slow-web-connections/">settings</a>
available for defining the network characteristics you would like to simulate.

IMAGE PLACEHOLDER
Todo: Just use image from Addy's notes.

## Emulate user agent

The DevTools support for device emulation includes native User Agent and dimension overriding.
This allows developers to debug mobile browsers
on different devices and operating systems via the Overrides menu.

1. Within the Emulation panel, open up the Sensors pane. 
2. Check "Spoof user agent" and select "Android 2.3 - Nexus S".
3. Refresh the page.

An updated user-agent field is now sent as part of the request headers for page resources.
Some websites may decide to serve optimized versions of the page depending on the user-agent,
this is one case where
<a href="https://developer.chrome.com/devtools/docs/mobile-emulation#useragent-spoofing">spoofing a user-agent</a> may be useful.

IMAGE PLACEHOLDER
Todo: Show web fundamentals and user agent field.

## Emulate geolocation

When working with HTML5 geolocation support in an application,
it can be useful to debug the output received
when using different values for longitude and latitude.
The DevTools support both overriding position values for navigator.geolocation
and simulating geolocation not being available via the Sensors pane.
See the <a href="https://developer.chrome.com/devtools/docs/mobile-emulation#device-geolocation-overrides">Chrome DevTools geolocation overrides</a> documentation.

## Testing multiple versions at the same time

The Web Starter Kit's live reloading makes it possible
to emulate your site on multiple devices and test at the same time:

1. Navigate to your site's URL.
2. Open up the Emulation panel and select a device.
3. Repeat this process for multiple devices.

Any changes you make to your site with automatically be pushed to each device emulation.

{% include modules/nextarticle.liquid %}

{% endwrap %}
