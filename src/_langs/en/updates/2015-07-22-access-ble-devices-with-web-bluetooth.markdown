---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2015-07-22

title: "Access BLE devices with Web Bluetooth"
description: "A Web API has been added to Chrome OS M45 that
makes it possible for websites to discover and communicate with devices over
the Bluetooth 4 wireless standard using GATT."
article:
  written_on: 2015-07-22
  updated_on: 2015-07-22

authors:
  - beaufortfrancois
tags:
  - Bluetooth
  - IoT
  - WebBluetooth
  - PhysicalWeb
permalink: /updates/2015/07/access-ble-devices-with-web-bluetooth.html
---

How about I tell you websites could communicate with nearby Bluetooth devices
in a secure and privacy-preserving way? This way, heart rate monitors, singing
lightbulbs and [turtles](https://www.youtube.com/watch?v=1LV1Fk5ZXwA) could
be managed directly from a website.

## Before we start

This article assumes you have some basic knowledge of how works Bluetooth Low
Energy (BLE) and Generic Attribute Profile (GATT).

Even though the [Web Bluetooth API
specification](https://webbluetoothcg.github.io/web-bluetooth/) is not
finalized yet, the Chrome Team is actively looking for enthusiastic developers
(I mean you) to try out this work-in-progress API and give
[feedback](https://code.google.com/p/chromium/issues/entry?labels=Cr-Blink-Bluetooth).

Web Bluetooth API is at the time of writing partially implemented in Chrome OS
M45 behind an experimental flag. Go to `chrome://flags/#enable-web-bluetooth`,
enable the highlighted flag, restart Chrome and you should be able to
[scan](#scan-bluetooth-devices) and [connect](#connect-to-a-bluetooth-device)
to nearby Bluetooth devices and
[read](#read-a-bluetooth-characteristic)/[write](#write-to-a-bluetooth-characteristic)
Bluetooth characteristics.

<img src="/web/updates/images/2015-07-22-access-ble-devices-with-web-bluetooth/web-bluetooth-flag.png" alt="Web Bluetooth Flag highlighted in chrome://flags"/>

## Security Requirements

### HTTPS Only

Because the Web Bluetooth API is a powerful new feature added to the Web,
Google Chrome aims to make it [available only to secure
origins](https://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features).
This means you'll need to build with TLS in mind.

During development you'll be able to play with Web Bluetooth through
http://localhost, but to deploy it on a site you'll need to have HTTPS setup
on your server. I personally enjoy [GitHub Pages](https://pages.github.com) for
demo purposes.
To add HTTPS to your server then you'll need to get a TLS certificate and set
it up. Be sure to check out [Mozilla's SSL config
generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) for
best practices there.

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
- they have a shorter syntax compared to function expressions and lexically
bind the `this` value.

### Scan Bluetooth Devices

This version of the Web Bluetooth API specification intends to allow websites,
running in the Central role, to connect to GATT Remote Servers over either a
Basic Rate/Enhanced Data Rate (BR/EDR) or BLE connection. It also aims to
support communication among devices that only implement Bluetooth 4.0 or 4.1.

When a website requests access to nearby BLE devices using
`navigator.bluetooth.requestDevice`, Google Chrome will prompt user with a
device chooser where he can pick one device or simply cancel the request. At
the time of writing though, **the device chooser hasn't been implemented yet.**
Only the closer device that matches filters will be returned.

The `navigator.bluetooth.requestDevice` function takes a mandatory Object that
define Bluetooth GATT services filters. These filters are used to return
only devices that advertise these services.

For instance, scanning Bluetooth devices advertising [Bluetooth GATT Battery Service](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.battery_service.xml) is that simple.

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {...})
.catch(error => { console.log(error); });
{% endhighlight %}

If your Bluetooth GATT Service is not the list of [the officially adopted Bluetooth
GATT
services](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx)
though, you may want to use the handy `window.BluetoothUUID.getService` helper
function then. Calling it with `0x1234` will return
`"00001234-0000-1000-8000-00805f9b34fb"`.

{% highlight javascript %}
var myService = BluetoothUUID.getService(0x1234);
navigator.bluetooth.requestDevice({ filters: [{ services: [myService] }] })
.then(device => {...})
.catch(error => { console.log(error); });
{% endhighlight %}

### Connect to a Bluetooth Device

So what do you do now that you have a `BluetoothDevice` resolved by the
`navigator.bluetooth.requestDevice` Promise? Let's connect to the Bluetooth
GATT Remote Server which holds the Attribute Protocol (ATT) lookup data and
service and characteristic definitions.

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  // Human-readable name of the device.
  console.log(device.name);
  // Indicates whether or not the device is paired with the system.
  console.log(device.paired);
  // UUIDs of protocols, profiles and services advertised by the device.
  console.log(device.uuids);

  // Attempts to connect to GATT Remote Server.
  return device.connectGATT();
})
.then(server => {...})
.catch(error => { console.log(error); });
{% endhighlight %}


### Read a Bluetooth Characteristic

Here we are connected to the GATT Remote Server of the Bluetooth device. Now we
want to get a Primary Bluetooth GATT Service and read a characteristic that
belongs to this service. Let's try for instance to read the current charge
level of a connected device battery.

In the example below, `battery_level` is the [adopted Bluetooth GATT
Characteristic Battery
Level](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml).

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => device.connectGATT())
.then(server => {
  // Getting Battery Service...
  return server.getPrimaryService('battery_service');
})
.then(service => {
  if (!service) throw 'Battery Service not found';
  // Getting Battery Level Characteristic...
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {
  // Reading Battery Level...
  return characteristic.readValue();
})
.then(buffer => {
  var data = new DataView(buffer);
  console.log('Battery percentage is ' + data.getUint8(0));
})
.catch(error => { console.log(error); });
{% endhighlight %}

If you use a custom Bluetooth GATT characteristic,
`window.BluetoothUUID.getCharacteristic` definitely comes in handy. Calling it
with `0x5678` will return `"00005678-0000-1000-8000-00805f9b34fb"`.

{% highlight javascript %}
...
.then(service => {
  var myCharacteristic = BluetoothUUID.getCharacteristic(0x5678);
  return service.getCharacteristic(myCharacteristic);
})
{% endhighlight %}

### Write to a Bluetooth Characteristic

Writing to a Bluetooth GATT Characteristic is as easy as reading it. This time,
let's reset the value of the Energy Expended field in the Heart Rate
Measurement characteristic to 0 on a heart rate monitor device.

There is no magic there I promise. It's all explained in the [Heart Rate
Control Point Characteristic
page](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_control_point.xml).

{% highlight javascript %}
navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.connectGATT())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_control_point'))
.then(characteristic => {
  var resetEnergyExpended = new Uint8Array([1]);
  return characteristic.writeValue(resetEnergyExpended);
})
.then(function(value) {
  console.log('Energy expended has been reset.');
})
.catch(error => { console.log(error); });
{% endhighlight %}

## Samples

Samples below have been tested on Chrome OS M45 with the Web Bluetooth flag
enabled. To enjoy these samples to their fullest, I recommend you install the [BLE Peripheral Simulator Android
App](https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral)
which simulates a BLE Peripheral with a Battery Service or a Heart Rate
Service.

- Battery Level Sample - [https://googlechrome.github.io/samples/web-bluetooth](https://googlechrome.github.io/samples/web-bluetooth)
- Reset Energy Expended Sample - [https://scheib.github.io/bluetooth-demos/heart-rate-write.html](https://scheib.github.io/bluetooth-demos/heart-rate-write.html)
- Device Info Sample - [https://scheib.github.io/bluetooth-demos/device-info.html](https://scheib.github.io/bluetooth-demos/device-info.html)

## Dev Tip

A Bluetooth Console is available in Chrome OS developer shell. Press [ Ctrl ] [
Alt ] [ T ] to open a browser tab terminal and use the `bt_console` command to
start poking around your bluetooth settings. The `help` command will give you a
list of all available commands.

<img src="/web/updates/images/2015-07-22-access-ble-devices-with-web-bluetooth/bluetooth-developer-console.png" alt="Bluetooth Developer Console screenshot"/>

## What's next

As the Web Bluetooth API implementation is not complete yet, here's a sneak
peek of what to expect in the coming months:

- Bluetooth GATT Characteristics will support `startNotifications` and
  `stopNotifications` functions to [subscribe to
  notifications](https://webbluetoothcg.github.io/web-bluetooth/#notification-events)
  from Bluetooth Devices.
- Connecting and disconnecting a Bluetooth Device will be possible with
  new `BluetoothDevice.connect()` and `BluetoothDevice.disconnect()` functions.
- A new `serviceadded` event will track newly discovered Bluetooth GATT Services
  while `serviceremoved` event will track removed ones. A new `servicechanged`
  event will fire when any characteristic and/or descriptor gets added or
  removed from the Bluetooth GATT Service.
- A Promise to [detect if Bluetooth is available on the
  platform](https://github.com/WebBluetoothCG/web-bluetooth/issues/127) will be
  added to improve user experience.

At the time of writing, Chrome OS M45 is [the most advanced
platform](https://developer.chrome.com/apps/bluetoothLowEnergy) as the low
level work has been done already. Android and Mac OS will follow shortly after.
Windows 8.1+ and Linux will be supported as much as feasible by the platforms.

## Resources

- Web Bluetooth Spec: [https://webbluetoothcg.github.io/web-bluetooth](https://webbluetoothcg.github.io/web-bluetooth)
- Chrome Feature Status: [https://www.chromestatus.com/feature/5264933985976320](https://www.chromestatus.com/feature/5264933985976320)
- Web Bluetooth Bugs: [http://crbug.com/?q=type=Bug%20label:Cr-Blink-Bluetooth](http://crbug.com/?q=type=Bug%20label:Cr-Blink-Bluetooth)
- BLE Peripheral Simulator App: [https://github.com/WebBluetoothCG/ble-test-peripheral-android](https://github.com/WebBluetoothCG/ble-test-peripheral-android)
- Google+ Community: [https://plus.google.com/communities/108953318610326025178](https://plus.google.com/communities/108953318610326025178)

{% video //www.youtube.com/embed/I3obFcCw8mk %} {% endvideo %}
