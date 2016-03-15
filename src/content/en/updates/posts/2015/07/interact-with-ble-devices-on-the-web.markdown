---
layout: updates/post
title: "Interact with BLE devices on the Web"
description: "A Web API has been added to Chrome that makes it possible for websites to discover and communicate with devices over the Bluetooth 4 wireless standard using GATT."
featured_image: /web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/featured.png
published_on: 2015-07-22
updated_on: 2016-02-26
authors:
  - beaufortfrancois
tags:
  - news
  - Bluetooth
  - IoT
  - WebBluetooth
  - PhysicalWeb
---

What if I told you websites could communicate with nearby Bluetooth devices
in a secure and privacy-preserving way? This way, heart rate monitors, singing
lightbulbs, [turtles](https://www.youtube.com/watch?v=1LV1Fk5ZXwA) and [flying
grumpy cats](https://www.youtube.com/watch?v=tRMcMDIyIGQ) could interact
directly with a website.

Until now, the ability to interact with bluetooth devices has been possible
only for native apps. The Web Bluetooth API aims to change this and brings it
to web browsers as well. Alongside efforts like [Physical
Web](https://google.github.io/physical-web/), people can walk up to and
interact with devices straight from the web. Check out this [drone controlled
from a web app](https://www.youtube.com/watch?v=yILD_ZdXJW4) video to get a
sense of how that would work.

## Before we start

This article assumes you have some basic knowledge of how Bluetooth Low
Energy (BLE) and the [Generic Attribute Profile
(GATT)](https://developer.bluetooth.org/TechnologyOverview/Pages/GATT.aspx)
work.

Even though the [Web Bluetooth API
specification](https://webbluetoothcg.github.io/web-bluetooth/) is not
finalized yet, the Chrome Team is actively looking for enthusiastic developers
(I mean you) to try out this work-in-progress API and give
[feedback on the spec](https://github.com/WebBluetoothCG/web-bluetooth/issues) and
[feedback on the implementation](https://bugs.chromium.org/p/chromium/issues/entry?components=Blink%3EBluetooth).

Web Bluetooth API is at the time of writing partially implemented in Chrome OS
and Chrome Dev for Android behind an experimental flag. Go to
`chrome://flags/#enable-web-bluetooth`,
enable the highlighted flag, restart Chrome and you should be able to
[scan for](#scan-for-bluetooth-devices) and [connect to](#connect-to-a-bluetooth-device)
nearby Bluetooth devices and
[read](#read-a-bluetooth-characteristic)/[write](#write-to-a-bluetooth-characteristic)
Bluetooth characteristics.

<img style="width:723px; max-height:250px" src="/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/web-bluetooth-flag.png" alt="Web Bluetooth Flag highlighted in chrome://flags"/>

## Security Requirements

### HTTPS Only

Because the Web Bluetooth API is a powerful new feature added to the Web,
Google Chrome aims to make it available only to [secure
contexts](https://w3c.github.io/webappsec/specs/powerfulfeatures/#intro).  This
means you'll need to build with TLS in mind.

During development you'll be able to play with Web Bluetooth through
http://localhost by using some tools like the [Chrome Dev
Editor](https://chrome.google.com/webstore/detail/chrome-dev-editor-develop/pnoffddplpippgcfjdhbmhkofpnaalpg),
but to deploy it on a site you'll need to have HTTPS setup
on your server. I personally enjoy [GitHub Pages](https://pages.github.com) for
demo purposes.
To add HTTPS to your server you'll need to get a TLS certificate and set
it up. Be sure to check out [Security with HTTPS
article](/web/fundamentals/security/)
for best practices there.

### User Gesture Required

As a security feature, discovering nearby Bluetooth devices with
`navigator.bluetooth.requestDevice` must be called via a user gesture
like a touch or mouse click.

## Get into the Code

The Web Bluetooth API relies heavily on JavaScript
[Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).
If you're not familiar with them, check out this great
[Promises tutorial](http://www.html5rocks.com/en/tutorials/es6/promises/). One
more thing, `() => {}` are simply ECMAScript 2015 [Arrow
functions](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
-- they have a shorter syntax compared to function expressions and lexically
bind the `this` value.

### Scan for Bluetooth Devices

This version of the Web Bluetooth API specification allows websites,
running in the Central role, to connect to remote GATT Servers over a BLE
connection. It supports communication among devices that implement
Bluetooth 4.0 or later.

When a website requests access to nearby devices using
`navigator.bluetooth.requestDevice`, Google Chrome will prompt user with a
device chooser where he can pick one device or simply cancel the request. At
the time of writing though, the device chooser hasn't been implemented yet in
Chrome OS. Only the first device that matches filters will be returned.

<img style="width:723px; max-height:250px" src="/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/bluetooth-device-chooser.png" alt="Bluetooth Device Chooser screenshot"/>

The `navigator.bluetooth.requestDevice` function takes a mandatory Object that
defines Bluetooth GATT service filters. These filters are used to return
only devices that advertise the selected services.

For instance, scanning for Bluetooth devices advertising the [Bluetooth GATT Battery Service](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.battery_service.xml) is this simple:

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {...})
.catch(error => { console.log(error); });
{% endhighlight %}

If your Bluetooth GATT Service is not on the list of [the standardized Bluetooth
GATT
services](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx)
though, you may provide either the full Bluetooth UUID or a short 16- or 32-bit
form.

{% highlight javascript %}
navigator.bluetooth.requestDevice({
  filters: [{
    services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
  }]
})
.then(device => {...})
.catch(error => { console.log(error); });
{% endhighlight %}

### Connect to a Bluetooth Device

So what do you do now that you have a `BluetoothDevice` returned from
`navigator.bluetooth.requestDevice`'s Promise? Let's connect to the Bluetooth
remote GATT Server which holds the
service and characteristic definitions.

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  // Human-readable name of the device.
  console.log(device.name);
  // Filtered UUIDs of GATT services the website origin has access to.
  console.log(device.uuids);

  // Attempts to connect to remote GATT Server.
  return device.connectGATT();
})
.then(server => {...})
.catch(error => { console.log(error); });
{% endhighlight %}


### Read a Bluetooth Characteristic

Here we are connected to the GATT Server of the remote Bluetooth device. Now we
want to get a Primary GATT Service and read a characteristic that belongs to
this service. Let's try, for instance, to read the current charge level of the
device's battery.

In the example below, `battery_level` is the [standardized
Battery Level
Characteristic](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml).

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => device.connectGATT())
.then(server => {
  // Getting Battery Service...
  return server.getPrimaryService('battery_service');
})
.then(service => {
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();
})
.then(value => {
  // In Chrome 50+, a DataView is returned instead of an ArrayBuffer.
  value = value.buffer ? value : new DataView(value);
  console.log('Battery percentage is ' + value.getUint8(0));
})
.catch(error => { console.log(error); });
{% endhighlight %}

If you use a custom Bluetooth GATT characteristic, you may provide either the
full Bluetooth UUID or a short 16- or 32-bit form to `service.getCharacteristic`.

### Write to a Bluetooth Characteristic

Writing to a Bluetooth GATT Characteristic is as easy as reading it. This time,
let's reset the value of the Energy Expended field in the Heart Rate
Measurement characteristic to 0 on a heart rate monitor device.

I promise there is no magic here. It's all explained in the [Heart Rate
Control Point Characteristic
page](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_control_point.xml).

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.connectGATT())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_control_point'))
.then(characteristic => {
  // Writing 1 is the signal to reset energy expended.
  var resetEnergyExpended = new Uint8Array([1]);
  return characteristic.writeValue(resetEnergyExpended);
})
.then(() => {
  console.log('Energy expended has been reset.');
})
.catch(error => { console.log(error); });
{% endhighlight %}

## Samples, Demos & Codelabs

The samples below have been tested on Chrome OS and Chrome Dev for Android with
the Web Bluetooth flag enabled. To enjoy these samples to their fullest, I
recommend you install the [BLE Peripheral Simulator Android
App](https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral)
which simulates a BLE Peripheral with a Battery Service or a Heart Rate
Service.

- Battery Level - [https://googlechrome.github.io/samples/web-bluetooth/battery-level.html](https://googlechrome.github.io/samples/web-bluetooth/battery-level.html)
- Reset Energy - [https://googlechrome.github.io/samples/web-bluetooth/reset-energy.html](https://googlechrome.github.io/samples/web-bluetooth/reset-energy.html)
- Device Info - [https://googlechrome.github.io/samples/web-bluetooth/device-info.html](https://googlechrome.github.io/samples/web-bluetooth/device-info.html)

You can also find some Web Bluetooth Demos at [https://github.com/WebBluetoothCG/demos](https://github.com/WebBluetoothCG/demos) and the Official Codelabs at [https://github.com/googlecodelabs?query=bluetooth](https://github.com/googlecodelabs?query=bluetooth).

## Dev Tips

A Bluetooth Console is available in Chrome OS developer shell. Press [ Ctrl ] [
Alt ] [ T ] to open a browser tab terminal and use the `bt_console` command to
start poking around your bluetooth settings. The `help` command will give you a
list of all available commands.

<img style="width:723px; max-height:250px" src="/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/bluetooth-developer-console.png" alt="Bluetooth Developer Console screenshot"/>

Resetting the first device resolved by `navigator.bluetooth.requestDevice` can
be done in two ways in Chrome OS:

- Restart Chrome OS.
- Enter `remove 01:23:45:67:89:01` in the Bluetooth Console where
  `01:23:45:67:89:01` is the Bluetooth address of the first device.

I would recommend you check out the official [Bluetooth debug page](https://sites.google.com/a/chromium.org/dev/developers/how-tos/file-web-bluetooth-bugs) as debugging Bluetooth can be hard sometimes.

## What's next

As the Web Bluetooth API implementation is not complete yet, here's a sneak
peek of what to expect in the coming months:

- Bluetooth GATT Characteristics will support the `startNotifications` and
  `stopNotifications` functions to [subscribe to
  notifications](https://webbluetoothcg.github.io/web-bluetooth/#notification-events)
  from Bluetooth Devices.
- A new `serviceadded` event will track newly discovered Bluetooth GATT Services
  while `serviceremoved` event will track removed ones. A new `servicechanged`
  event will fire when any characteristic and/or descriptor gets added or
  removed from the Bluetooth GATT Service.
- A Promise to [detect if Bluetooth is available on the
  platform](https://github.com/WebBluetoothCG/web-bluetooth/issues/127) will be
  added to improve user experience.

At the time of writing, Chrome OS and Android 6+ are [the most advanced
platforms](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md).
Mac OSX is partially working.  Windows 8.1+, Linux, and iOS will be supported
as much as feasible by the platforms.

## Resources

- Web Bluetooth Spec: [https://webbluetoothcg.github.io/web-bluetooth](https://webbluetoothcg.github.io/web-bluetooth)
- Chrome Feature Status: [https://www.chromestatus.com/feature/5264933985976320](https://www.chromestatus.com/feature/5264933985976320)
- Spec Issues: [https://github.com/WebBluetoothCG/web-bluetooth/issues](https://github.com/WebBluetoothCG/web-bluetooth/issues)
- Implementation Bugs: [https://crbug.com/?q=type=Bug%20label:Cr-Blink-Bluetooth](http://crbug.com/?q=type=Bug%20label:Cr-Blink-Bluetooth)
- BLE Peripheral Simulator App: [https://github.com/WebBluetoothCG/ble-test-peripheral-android](https://github.com/WebBluetoothCG/ble-test-peripheral-android)
- Google+ Community: [https://plus.google.com/communities/108953318610326025178](https://plus.google.com/communities/108953318610326025178)

{% ytvideo _BUwOBdLjzQ %}
