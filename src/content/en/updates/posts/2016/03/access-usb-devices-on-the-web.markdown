---
layout: updates/post
title: "Access USB devices on the Web"
description: "The WebUSB API has been created to provide an easy way to safely expose USB device services to the Web."
featured_image: /web/updates/images/2016-03-02-access-usb-devices-on-the-web/web-usb-hero.jpg
published_on: 2016-03-02
updated_on: 2016-04-21
authors:
  - beaufortfrancois
tags:
  - news
  - USB
  - WebUSB
  - IoT
  - Arduino
---

If I said plain and simple "USB", there is a good chance that you will
immediately think of keyboards, mice, audio, video and storage devices. You're
right but you'll find other kinds of Universal Serial Bus (USB) devices out
there.

These non-standardized USB devices require hardware vendors to write native
drivers and SDKs in order for you (the developer) to take advantage of them.
Sadly this native code has historically prevented these devices from being used
by the Web. And that's exactly why the WebUSB API has been created: to
**provide an easy way to safely expose USB device services to the Web**. With
this API, hardware manufacturers will be able to build cross-platform
JavaScript SDKs for their devices.

## Before we start

This article assumes you have some basic knowledge of how USB works. If not, I
recommend reading [USB in a NutShell](http://www.beyondlogic.org/usbnutshell).
For background information about USB, check out the [official USB
specifications](http://www.usb.org/home).

The Chrome team is excited to be launching experimental features early to
developers. The [WebUSB API](https://wicg.github.io/webusb/) is currently a
draft which means that it is far enough along to be real and usable, but there
is still time to make fixes that developers need. That's why the Chrome Team is
actively looking for eager developers to give it a try and send
[feedback on the spec](https://github.com/wicg/webusb/issues) and
[feedback on the implementation](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EUSB).

At the time of writing, the WebUSB API is partially implemented behind an
experimental flag in Chrome for Windows, Mac OS, Linux and Chrome OS. Go to
`chrome://flags/#enable-experimental-web-platform-features`, enable the
highlighted flag, restart Chrome and you should be good to go.

<img style="width:723px; max-height:205px" src="/web/updates/images/2016-03-02-access-usb-devices-on-the-web/web-usb-flag.png" alt="Web USB Flag highlighted in chrome://flags"/>

## Privacy & Security

### Attacks against USB devices

The WebUSB API does not even try to provide a way for a web page to connect to
arbitrary USB devices. There are plenty of published attacks against USB
devices that makes it unsafe to allow this.

For this reason, a USB device can define a set of origins that are allowed to
connect to it. This is similar to the
[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
mechanism in HTTP. In other words, **WebUSB devices are associated with a web
origin** and can only be accessed from a page from the same origin.

Hardware manufacturers will have to update the firmware in their USB devices in order
to enable WebUSB access to their device via the [Platform Capability
descriptor](https://wicg.github.io/webusb/#webusb-platform-capability-descriptor).
Later a [Public Device Registry](https://wicg.github.io/webusb/#public-device-registry) 
will be created so that hardware manufacturers can support WebUSB on existing
devices.

### HTTPS Only

Because this experimental API is a powerful new feature added to the Web,
Chrome aims to make it available only to [secure
contexts](https://w3c.github.io/webappsec/specs/powerfulfeatures/#intro). This
means you'll need to build with TLS in mind.

> We care deeply about security, so you will notice that new Web capabilities
require HTTPS. The WebUSB API is no different, and is yet another good reason
to get HTTPS up and running on your site.

During development you'll be able to interact with WebUSB through
http://localhost by using tools like the [Chrome Dev
Editor](https://chrome.google.com/webstore/detail/pnoffddplpippgcfjdhbmhkofpnaalpg)
or the handy `python -m SimpleHTTPServer`, but to deploy it on a site you'll
need to have HTTPS set up on your server. I personally enjoy [GitHub
Pages](https://pages.github.com) for demo purposes.

To add HTTPS to your server you'll need to get a TLS certificate and set
it up. Be sure to check out the [Security with HTTPS
article](/web/fundamentals/security/)
for best practices there. For info, you can now get free TLS certificates with
the new Certificate Authority [Let's Encrypt](https://letsencrypt.org/).

### User Gesture Required

As a security feature, getting access to connected USB devices with
`navigator.usb.requestDevice` must be called via a user gesture
like a touch or mouse click.

## Let's start coding

The WebUSB API relies heavily on JavaScript
[Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).
If you're not familiar with them, check out this great
[Promises tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/). One
more thing, `() => {}` are simply ECMAScript 2015 [Arrow
functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
-- they have a shorter syntax compared to function expressions and lexically
bind the value of `this`.

### Get Access to USB devices

You can either prompt the user to select a single connected USB device using
`navigator.usb.requestDevice` or call `navigator.usb.getDevices` to get a list
of all connected USB devices the origin has access to.

The `navigator.usb.requestDevice` function takes a mandatory JavaScript object
that defines `filters`. These filters are used to match any USB device with the
given vendor (`vendorId`) and optionally product (`productId`) identifiers. The
`classCode`, `subclassCode` and `protocolCode` keys can also be defined there
as well.

<img style="width:723px; max-height:414px" src="/web/updates/images/2016-03-02-access-usb-devices-on-the-web/usb-device-chooser.png" alt="USB Device Chooser screenshot"/>

For instance, here's how to get access to a connected Arduino device configured
to allow the origin.

{% highlight javascript %}
navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
.then(device => {
  console.log(device.productName);      // "Arduino Micro"
  console.log(device.manufacturerName); // "Arduino LLC"
})
.catch(error => { console.log(error); });
{% endhighlight %}

Before you ask, I didn't magically come up with this `0x2341` hexadecimal
number. I simply searched for the word "Arduino" in this [List of USB
ID's](http://www.linux-usb.org/usb.ids).

The USB `device` returned in the fulfilled promise above has some basic, yet
important information about the device such as the supported USB version,
maximum packet size, vendor and product IDs, the number of possible
configurations the device can have - basically all fields contained in the
[device USB Descriptor](http://www.beyondlogic.org/usbnutshell/usb5.shtml#DeviceDescriptors)

For info, if a USB device announces its [support for WebUSB](https://wicg.github.io/webusb/#webusb-platform-capability-descriptor),
as well as defining a landing page URL, Chrome will show a persistent
notification when the USB device is plugged in. Clicking on this notification
will open the landing page.

<img style="width:723px; max-height:345px" src="/web/updates/images/2016-03-02-access-usb-devices-on-the-web/web-usb-notification.png" alt="WebUSB notification"/>

From there, you can simply call `navigator.usb.getDevices` and get access to
your Arduino device as shown below.

{% highlight javascript %}
navigator.usb.getDevices().then(devices => {
  devices.map(device => {
    console.log(device.productName);      // "Arduino Micro"
    console.log(device.manufacturerName); // "Arduino LLC"
  });
})
{% endhighlight %}

### Talk to an Arduino USB board

Okay, now let's see how easy it is to communicate from a WebUSB compatible
Arduino board over the USB port. Check out instructions at
[https://github.com/webusb/arduino](https://github.com/webusb/arduino) to
WebUSB-enable your [sketches](http://www.arduino.cc/en/Tutorial/Sketch).

{% highlight javascript %}
var device;

navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
.then(selectedDevice => {
   device = selectedDevice;
   return device.open(); // Begin a session.
 })
.then(() => device.selectConfiguration(1)) // Select configuration #1 for the device.
.then(() => device.claimInterface(2)) // Request exclusive control over interface #2.
.then(() => device.controlTransferOut({
    requestType: 'class',
    recipient: 'interface',
    request: 0x22,
    value: 0x01,
    index: 0x02})) // Ready to receive data
.then(() => device.transferIn(5, 64)) // Waiting for 64 bytes of data from endpoint #5.
.then(result => {
  let decoder = new TextDecoder();
  console.log('Received: ' + decoder.decode(result.data));
})
.catch(error => { console.log(error); });
{% endhighlight %}

Please keep in mind that the WebUSB library we are using here is just
implementing one example protocol (based on the standard USB serial protocol)
and that you can create any set and types of endpoints you
wish. Control transfers are especially nice for small configuration commands as
they get bus priority and have a well defined structure.

And here's the sketch that has been uploaded to the Arduino board.

{% highlight cpp %}
// Third-party WebUSB Arduino library
#include <WebUSB.h>

const WebUSBURL URLS[] = {
  { 1, "webusb.github.io/arduino/demos/" },
  { 0, "localhost:8000" },
};

const uint8_t ALLOWED_ORIGINS[] = { 1, 2 };

WebUSB WebUSBSerial(URLS, 2, 1, ALLOWED_ORIGINS, 2);

#define Serial WebUSBSerial

void setup() {
  Serial.begin(9600);
  while (!Serial) {
    ; // Wait for serial port to connect.
  }
  Serial.write("WebUSB FTW!");
  Serial.flush();
}

void loop() {
  // Nothing here for now.
}
{% endhighlight %}

The third-party [WebUSB Arduino
library](https://github.com/webusb/arduino/tree/gh-pages/library/WebUSB) used
in the sample code above does basically two things:

- The device acts as a WebUSB device enabling Chrome to read
  the [landing page URL](https://wicg.github.io/webusb/#webusb-platform-capability-descriptor)
  and the [list of origins](https://wicg.github.io/webusb/#get-allowed-origins) allowed to communicate with.
- It exposes a WebUSB Serial API that you may use to override the default one.

Let's focus back to the JavaScript code. Once we get the `device` picked by the
user, `device.open` simply runs all platform-specific steps to start a session
with the USB device. Then, we have to select an available USB Configuration
with `device.selectConfiguration`. Remember that a Configuration specifies how
the device is powered, its maximum power consumption and its number of
interfaces. Talking about interfaces, we also need to request exclusive access
with `device.claimInterface` since data can only be transferred to an interface
or associated endpoints when the interface is claimed. Finally calling
`device.controlTransferOut` is needed to set up the Arduino device with the
appropriate commands to communicate through the WebUSB Serial API.

From there, `device.transferIn` performs a Bulk Transfer onto the
device to inform that the host is ready to receive bulk data. Then, the promise
is fulfilled with a `result` object containing a
[DataView](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView)
`data` that has to be parsed appropriately.

For those who are familiar with USB, all of this should look pretty familiar.

### I want moar

The WebUSB API lets you interact with the all USB transfer/endpoint types:

- CONTROL transfers, used to send or receive configuration or command
  parameters to a USB device are handled with `controlTransferIn(setup,
  length)` and `controlTransferOut(setup, data)`.
- INTERRUPT transfers, used for small amount of time sensitive data are handled
  with same methods as BULK transfers with `transferIn(endpointNumber, length)`
  and `transferOut(endpointNumber, data)`.
- ISOCHRONOUS transfers, used for streams of data, like video and sound are
  handled with `isochronousTransferIn(endpointNumber, packetLengths)` and
 `isochronousTransferOut(endpointNumber, data, packetLengths)`.
- BULK transfers, used to transfer a large amount of non-time-sensitive data in
  a reliable way are handled with `transferIn(endpointNumber, length)` and
 `transferOut(endpointNumber, data)`.

You may also want to have a look at Mike Tsao's [WebLight
project](https://github.com/sowbug/weblight) which provides a ground-up example
of building a USB-controlled LED device designed for the WebUSB API (not using
an Arduino here). You'll find hardware, software, and firmware.

## Tips

Debugging USB in Chrome is made easier with the internal page
`chrome://device-log` where you can see all USB device related events in one
single place.

<img style="width:723px; max-height:414px" src="/web/updates/images/2016-03-02-access-usb-devices-on-the-web/web-usb-device-log-page.png" alt="Internal page to debug Web USB"/>

Early adopters who want to test their existing devices with WebUSB before they
can update their firmware or the [Public Device Registry](https://wicg.github.io/webusb/#public-device-registry) 
is [implemented](https://bugs.chromium.org/p/chromium/issues/detail?id=598765) 
are not out ouf luck there thanks to a dedicated switch. To disable checking of
the WebUSB allowed origins descriptors that implement a CORS-like mechanism to
secure origin to device communications, run `chrome` with the
`--disable-webusb-security` [switch](https://www.chromium.org/developers/how-tos/run-chromium-with-flags).

On most Linux systems, USB devices are mapped with read-only permissions by
default. To allow Chrome to open a USB device, you will need to add a new [udev rule](https://www.freedesktop.org/software/systemd/man/udev.html).
Create a file at `/etc/udev/rules.d/50-yourdevicename.rules` with the following
content:

```
SUBSYSTEM=="usb", ATTR{idVendor}=="[yourdevicevendor]", MODE="0664", GROUP="plugdev"
```

where `[yourdevicevendor]` is `2341` if your device is an Arduino for instance.
`ATTR{idProduct}` can also be added for a more specific rule. Make sure your
`user` is a member of the `plugdev` group.  Then, just reconnect your device.

## What's next

A second iteration on the WebUSB API will look at [Shared Worker](https://developer.mozilla.org/fr/docs/Web/API/SharedWorker)
and [Service Worker](https://jakearchibald.github.io/isserviceworkerready/resources.html)
support. Imagine for instance a security key website using the WebUSB API that
would install a service worker to act as a middle man to authenticate users.

And for your greatest pleasure, the WebUSB API will come later to Android.

## Resources

- WebUSB API Spec: [http://wicg.github.io/webusb/](https://wicg.github.io/webusb/)
- Chrome Feature Status: [https://www.chromestatus.com/features/5651917954875392](https://www.chromestatus.com/features/5651917954875392)
- Spec Issues: [https://github.com/WICG/webusb/issues](https://github.com/WICG/webusb/issues)
- Implementation Bugs: [http://crbug.com?q=component:Blink>USB](http://crbug.com?q=component:Blink>USB)
- WebUSB ❤ ️Arduino: [https://github.com/webusb/arduino](https://github.com/webusb/arduino)
