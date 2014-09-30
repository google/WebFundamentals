---
layout: article
title: "Use DevTools Emulation"
description: "Learn how to use browser emulation tools to test a range of device features."
introduction: "Learn how to use browser emulation tools to test a range of device features."
article:
  written_on: 2014-05-29
  updated_on: 2014-09-25
  order: 2
collection: devices
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
  emulator:
    - Quickly test your site’s responsiveness and support for mobile APIs using DevTools emulation.
notes:
    - TBD.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.emulator %}

When you don’t have a particular device, or want to do a spot check on something,
the best option is to emulate the device right inside your browser.

Browser emulators are great for testing site responsiveness, but they don’t
emulate differences in API and CSS support. Test your site on browsers running
on the devices to be certain everything behaves as expected.

## Chrome DevTools Emulation

[Chrome DevTools](https://developer.chrome.com/devtools) has a Device emulation tool which will create a viewport with the right width and height to match a selected device and account for the screen density.

You can activate device emulation by following these four steps:

1. With Chrome DevTools open, click the arrow icon with three horizontal lines
2. Click the mobile device in the top left.
3. Select the 'emulation' tab at the bottom.
4. Then select the device you want to test against from the drop down.

<img src="imgs/chrome-devtools-emulation.png" alt="Chrome DevTools Emulation Guide" />

## Firefox Responsive View

Firefox has a [responsive design view](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_View)
which encourages you stop thinking in terms of specific devices and instead
explore how your design changes at common screen sizes or your own size by
dragging the edges.

To use the responsive view, open the developer tools in Firefox and click the
icon illustrated in step 1 below and use the handles at the side of the web page
to resize it, illustrated in step 2.

<img src="imgs/ff-responsive-design-mode.png" alt="Firefox Responsive Design View" />

## IE Device Emulation

IE11 has a feature where you can [change the viewport to match a Windows Phone](http://msdn.microsoft.com/en-gb/library/ie/dn255001(v=vs.85).aspx)
as well as view your site on older versions of IE.

To change the emulated browser, do the following:

1. Select the emulation tab.
2. Click the drop down labelled **Browser profile** and select your device.


<img src="imgs/ie-device-emulation.png" alt="IE Device Emulation" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
