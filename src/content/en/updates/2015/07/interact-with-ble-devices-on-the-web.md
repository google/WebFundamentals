project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: A Web API has been added to Chrome that makes it possible for websites to discover and communicate with devices over the Bluetooth 4 wireless standard using GATT.

{# wf_updated_on: 2016-11-16 #}
{# wf_published_on: 2015-07-21 #}
{# wf_tags: news,iot,webbluetooth,physicalweb,origintrials #}
{# wf_featured_image: /web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/featured.png #}

# Interact with Bluetooth devices on the Web {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}



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

A subset of the Web Bluetooth API is aiming to [ship on Chrome OS, Chrome for Android M, and Mac](https://groups.google.com/a/chromium.org/forum/#!msg/blink-dev/Ono3RWkejAA/2skvuBhSCQAJ) 
in Chrome 56. In Chrome 55 or earlier, it can be enabled experimentally 
on your origin in Origin Trials, or locally on your machine using an experimental flag.
The implementation is partially complete and currently available on Chrome OS, 
Chrome for Android M, Linux, and Mac.

In Chrome 56 or later, go to `chrome://flags/#enable-experimental-web-platform-features` 
otherwise go to `chrome://flags/#enable-web-bluetooth`, enable the highlighted flag,
restart Chrome and you should be able to
[scan for](#scan-for-bluetooth-devices) and [connect to](#connect-to-a-bluetooth-device)
nearby Bluetooth devices,
[read](#read-a-bluetooth-characteristic)/[write](#write-to-a-bluetooth-characteristic)
Bluetooth characteristics, [receive GATT Notifications](#receive-gatt-notifications), and know when a [Bluetooth device gets
disconnected](#get-disconnected-from-a-bluetooth-device).

### Available for Origin Trials

In order to get as much feedback as possible from developers using the Web
Bluetooth API in the field, we're also adding this feature in Chrome 53 as an
[origin trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md) for Chrome
OS, Android M, and Mac. **Origin Trials allow you to temporarily enable the
feature for all of users of your website.** During the origin trial, the API may
still change in backward-incompatible ways before we freeze it into the web
platform.  To use this experimental API in Chrome with no flag, you'll need to
[request a token for your origin](http://bit.ly/WebBluetoothOriginTrial) and
[insert it in your application](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).

The trial will end in January 2017. By that point, we expect to have figured
out any changes necessary to stabilize the feature and move it out from Origin
Trials.

## Security Requirements

To understand the security tradeoffs, I recommend the [Web Bluetooth Security
Model](https://medium.com/@jyasskin/the-web-bluetooth-security-model-666b4e7eed2)
post from Jeffrey Yasskin, a software engineer on the Chrome team, working on
the Web Bluetooth API specification.

### HTTPS Only

Because this experimental API is a powerful new feature added to the Web,
Google Chrome aims to make it available only to [secure
contexts](https://w3c.github.io/webappsec-secure-contexts/#intro). This
means you'll need to build with TLS in mind.

Note: We care deeply about security, so you will notice that new Web capabilities require HTTPS. The Web Bluetooth API is no different, and is yet another good reason to get HTTPS up and running on your site.

During development you'll be able to interact with Web Bluetooth through
http://localhost by using tools like the [Chrome Dev
Editor](https://chrome.google.com/webstore/detail/pnoffddplpippgcfjdhbmhkofpnaalpg)
or the handy `python -m SimpleHTTPServer`, but to deploy it on a site you'll
need to have HTTPS set up on your server. I personally enjoy [GitHub
Pages](https://pages.github.com) for demo purposes.

To add HTTPS to your server you'll need to get a TLS certificate and set
it up. Be sure to check out the [Security with HTTPS
article](/web/fundamentals/security/)
for best practices there. For info, you can now get free TLS certificates with
the new Certificate Authority [Let's Encrypt](https://letsencrypt.org/){: .external }.

### User Gesture Required

As a security feature, discovering Bluetooth devices with
`navigator.bluetooth.requestDevice` must be triggered by [a user
gesture](https://html.spec.whatwg.org/multipage/interaction.html#activation)
such as a touch or a mouse click. We're talking about listening to
[`pointerup`](/web/updates/2016/10/pointer-events),
`click`, and `touchend` events.

    button.addEventListener('pointerup', function(event) {
      // Call navigator.bluetooth.requestDevice
    });

## Get into the Code

The Web Bluetooth API relies heavily on JavaScript
[Promises](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise).
If you're not familiar with them, check out this great
[Promises tutorial](/web/fundamentals/getting-started/primers/promises). One
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
device chooser where they can pick one device or simply cancel the request.

<img style="width:723px; max-height:250px" src="/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/bluetooth-device-chooser.png" alt="Bluetooth Device Chooser screenshot"/>

The `navigator.bluetooth.requestDevice` function takes a mandatory Object that
defines filters. These filters are used to return only devices that match some
advertised Bluetooth GATT services and/or the device name.

For instance, scanning for Bluetooth devices advertising the [Bluetooth GATT Battery Service](https://developer.bluetooth.org/gatt/services/Pages/ServiceViewer.aspx?u=org.bluetooth.service.battery_service.xml) is this simple:


    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => { /* ... */ })
    .catch(error => { console.log(error); });
    

If your Bluetooth GATT Service is not on the list of [the standardized Bluetooth
GATT
services](https://developer.bluetooth.org/gatt/services/Pages/ServicesHome.aspx)
though, you may provide either the full Bluetooth UUID or a short 16- or 32-bit
form.


    navigator.bluetooth.requestDevice({
      filters: [{
        services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
      }]
    })
    .then(device => { /* ... */ })
    .catch(error => { console.log(error); });
    

You can also scan for Bluetooth devices based on the device name being
advertised with the `name` filters key, or even a prefix of this name with the
`namePrefix` filters key. Note that in this case, you will also need to define
the `optionalServices` key to be able to access some services. If you don't,
you'll get an error later when trying to access them.


    navigator.bluetooth.requestDevice({
      filters: [{
        name: 'Francois robot'
      }],
      optionalServices: ['battery_service']
    })
    .then(device => { /* ... */ })
    .catch(error => { console.log(error); });
    

### Connect to a Bluetooth Device

So what do you do now that you have a `BluetoothDevice` returned from
`navigator.bluetooth.requestDevice`'s Promise? Let's connect to the Bluetooth
remote GATT Server which holds the service and characteristic definitions.


    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => {
      // Human-readable name of the device.
      console.log(device.name);
    
      // Attempts to connect to remote GATT Server.
      return device.gatt.connect();
    })
    .then(server => { /* ... */ })
    .catch(error => { console.log(error); });
    

### Read a Bluetooth Characteristic

Here we are connected to the GATT Server of the remote Bluetooth device. Now we
want to get a Primary GATT Service and read a characteristic that belongs to
this service. Let's try, for instance, to read the current charge level of the
device's battery.

In the example below, `battery_level` is the [standardized
Battery Level
Characteristic](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.battery_level.xml).


    navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => device.gatt.connect())
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
      console.log('Battery percentage is ' + value.getUint8(0));
    })
    .catch(error => { console.log(error); });
    

If you use a custom Bluetooth GATT characteristic, you may provide either the
full Bluetooth UUID or a short 16- or 32-bit form to `service.getCharacteristic`.

Note that you can also add a `characteristicvaluechanged` event listener on a
characteristic to handle reading its value. Check out [Read Characteristic Value Changed Sample](https://googlechrome.github.io/samples/web-bluetooth/read-characteristic-value-changed.html) 
to see how to optionally handle upcoming GATT notifications as well.


    ...
    .then(characteristic => {
      // Set up event listener for when characteristic value changes.
      characteristic.addEventListener('characteristicvaluechanged',
                                      handleBatteryLevelChanged);
      // Reading Battery Level...
      return characteristic.readValue();
    })
    .catch(error => { console.log(error); });
    
    function handleBatteryLevelChanged(event) {
      let batteryLevel = event.target.value.getUint8(0);
      console.log('Battery percentage is ' + batteryLevel);
    }
    


### Write to a Bluetooth Characteristic

Writing to a Bluetooth GATT Characteristic is as easy as reading it. This time,
let's use the Heart Rate Control Point to reset the value of the Energy
Expended field to 0 on a heart rate monitor device.

I promise there is no magic here. It's all explained in the [Heart Rate
Control Point Characteristic
page](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_control_point.xml).


    navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => service.getCharacteristic('heart_rate_control_point'))
    .then(characteristic => {
      // Writing 1 is the signal to reset energy expended.
      var resetEnergyExpended = new Uint8Array([1]);
      return characteristic.writeValue(resetEnergyExpended);
    })
    .then(_ => {
      console.log('Energy expended has been reset.');
    })
    .catch(error => { console.log(error); });
    

### Receive GATT Notifications

Now, let's see how to be notified when the [Heart Rate Measurement](https://developer.bluetooth.org/gatt/characteristics/Pages/CharacteristicViewer.aspx?u=org.bluetooth.characteristic.heart_rate_measurement.xml)
characteristic changes on the device:


    navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
    .then(device => device.gatt.connect())
    .then(server => server.getPrimaryService('heart_rate'))
    .then(service => service.getCharacteristic('heart_rate_measurement'))
    .then(characteristic => {
      return characteristic.startNotifications()
      .then(_ => {
        characteristic.addEventListener('characteristicvaluechanged',
                                        handleCharacteristicValueChanged);
      });
    })
    .then(_ => {
      console.log('Notifications have been started.');
    })
    .catch(error => { console.log(error); });
    
    function handleCharacteristicValueChanged(event) {
      var value = event.target.value;
      console.log('Received ' + value);
      // TODO: Parse Heart Rate Measurement value.
      // See https://github.com/WebBluetoothCG/demos/blob/gh-pages/heart-rate-sensor/heartRateSensor.js
    }
    

The [Notifications Sample](https://googlechrome.github.io/samples/web-bluetooth/notifications.html)
will show you to how to stop notifications with `stopNotifications()` and
properly remove the added `characteristicvaluechanged` event listener.

### Get disconnected from a Bluetooth Device

To provide a better user experience, you may want to show a warning message if
the `BluetoothDevice` gets disconnected to invite the user to reconnect.


    navigator.bluetooth.requestDevice({ filters: [{ name: 'Francois robot' }] })
    .then(device => {
      // Set up event listener for when device gets disconnected.
      device.addEventListener('gattserverdisconnected', onDisconnected);
    
      // Attempts to connect to remote GATT Server.
      return device.gatt.connect();
    })
    .then(server => { /* ... */ })
    .catch(error => { console.log(error); });
    
    function onDisconnected(event) {
      let device = event.target;
      console.log('Device ' + device.name + ' is disconnected.');
    }
    

You can also call `device.gatt.disconnect()` to disconnect your web app from
the Bluetooth device. This will trigger existing `gattserverdisconnected` event
listeners. Note that it will NOT stop bluetooth device communication if another
app is already communicating with the Bluetooth device. Check out the [Device
Disconnect Sample](https://googlechrome.github.io/samples/web-bluetooth/device-disconnect.html)
and the [Automatic Reconnect Sample](https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html)
to dive deeper.

Warning: Bluetooth GATT attributes, services, characteristics, etc. are
invalidated when a device disconnects. This means your code should always
retrieve (through `getPrimaryService(s)`, `getCharacteristic(s)`, etc.) these
attributes after reconnecting.

## Samples, Demos and Codelabs

All [Web Bluetooth samples](https://googlechrome.github.io/samples/web-bluetooth/index.html) below
have been tested with the Web Bluetooth flag enabled. To enjoy these samples to
their fullest, I recommend you install the
[BLE Peripheral Simulator Android App](https://play.google.com/store/apps/details?id=io.github.webbluetoothcg.bletestperipheral)
which simulates a BLE Peripheral with a Battery Service or a Heart Rate
Service.

### Beginner

- [Device Info](https://googlechrome.github.io/samples/web-bluetooth/device-info.html) - retrieve basic device information from a BLE Device.
- [Battery Level](https://googlechrome.github.io/samples/web-bluetooth/battery-level.html) - retrieve battery information from a BLE Device advertising Battery information.
- [Reset Energy](https://googlechrome.github.io/samples/web-bluetooth/reset-energy.html) - reset energy expended from a BLE Device advertising Heart Rate.
- [Characteristic Properties](https://googlechrome.github.io/samples/web-bluetooth/characteristic-properties.html) - display all properties of a specific characteristic from a BLE Device.
- [Notifications](https://googlechrome.github.io/samples/web-bluetooth/notifications.html) - start and stop characteristic notifications from a BLE Device.
- [Device Disconnect](https://googlechrome.github.io/samples/web-bluetooth/device-disconnect.html) - disconnect and get notified from a disconnection of a BLE Device after connecting to it.
- [Get Characteristics](https://googlechrome.github.io/samples/web-bluetooth/get-characteristics.html) - get all characteristics of an advertised service from a BLE Device.

### Combining multiple operations

- [GAP Characteristics](https://googlechrome.github.io/samples/web-bluetooth/gap-characteristics.html) - get all GAP characteristics of a BLE Device.
- [Device Information Characteristics](https://googlechrome.github.io/samples/web-bluetooth/device-information-characteristics.html) - get all Device Information characteristics of a BLE Device.
- [Link Loss](https://googlechrome.github.io/samples/web-bluetooth/link-loss.html) - set the Alert Level characteristic of a BLE Device (readValue & writeValue).
- [Discover Services & Characteristics](https://googlechrome.github.io/samples/web-bluetooth/discover-services-and-characteristics.html) - discover all accessible primary services and their characteristics from a BLE Device.
- [Automatic Reconnect](https://googlechrome.github.io/samples/web-bluetooth/automatic-reconnect.html) - reconnect to a disconnected BLE device using an exponential backoff algorithm.
- [Read Characteristic Value Changed](https://googlechrome.github.io/samples/web-bluetooth/read-characteristic-value-changed.html) - read battery level and be notified of changes from a BLE Device.

Check out our [curated Web Bluetooth Demos](https://github.com/WebBluetoothCG/demos) and [official Web Bluetooth Codelabs](https://github.com/googlecodelabs?query=bluetooth) as well.

## Libraries

- [web-bluetooth-utils](https://www.npmjs.com/package/web-bluetooth-utils) is a npm module that adds some convenience functions to the API.
- [&lt;platinum-bluetooth>](https://elements.polymer-project.org/elements/platinum-bluetooth?active=platinum-bluetooth-device) is a new set of [Polymer](https://www.polymer-project.org/) elements to discover and communicate with nearby Bluetooth devices based on the Web Bluetooth API. For instance, here's how to read battery level from a nearby bluetooth device advertising a Battery service:

<div class="clearfix"></div>

    <platinum-bluetooth-device services-filter='["battery_service"]'>
      <platinum-bluetooth-service service='battery_service'>
        <platinum-bluetooth-characteristic characteristic='battery_level'>
        </platinum-bluetooth-characteristic>
      </platinum-bluetooth-service>
    </platinum-bluetooth-device>

<div class="clearfix"></div>

    var bluetoothDevice = document.querySelector('platinum-bluetooth-device');
    var batteryLevel = document.querySelector('platinum-bluetooth-characteristic');
    
    bluetoothDevice.request()
    .then(_ => batteryLevel.read())
    .then(value => {
      console.log('Battery percentage is ' + value.getUint8(0));
    })
    .catch(error => { console.log(error); });

## Tools

- [Get Started with Web Bluetooth](https://beaufortfrancois.github.io/sandbox/web-bluetooth/generator/) is a simple Web App that will generate all the JavaScript boilerplate code to start interacting with a Bluetooth device. Enter a device name, a service, a characteristic, define its properties and you’re good to go.
- If you’re already a Bluetooth developer, the [Web Bluetooth Developer Studio Plugin](https://github.com/beaufortfrancois/sandbox/tree/gh-pages/web-bluetooth/bluetooth-developer-studio-plugin) will also generate the Web Bluetooth JavaScript code for your Bluetooth device.

## Dev Tips

A Bluetooth Console is available in Chrome OS developer shell. Press [ Ctrl ] [
Alt ] [ T ] to open a browser tab terminal and use the `bt_console` command to
start poking around your bluetooth settings. The `help` command will give you a
list of all available commands.

<img style="width:723px; max-height:250px" src="/web/updates/images/2015-07-22-interact-with-ble-devices-on-the-web/bluetooth-developer-console.png" alt="Bluetooth Developer Console screenshot"/>

I would recommend you check out the official [Bluetooth debug page](https://sites.google.com/a/chromium.org/dev/developers/how-tos/file-web-bluetooth-bugs) as debugging Bluetooth can be hard sometimes.

## What's next

Check the [browser and platform implementation
status](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md)
first to know which parts of the Web Bluetooth API are currently being implemented.

Though it's still incomplete, here's a sneak peek of what to expect in the
coming months:

- [Scanning for nearby BLE advertisements](https://github.com/WebBluetoothCG/web-bluetooth/pull/239)
  will happen with `navigator.bluetooth.requestLEScan()`.
- [Specifying the Eddystone upgrade](https://github.com/WebBluetoothCG/web-bluetooth/pull/230) will
  allow a website opened from a Physical Web notification, to communicate
  with the device that advertised its URL.
- A new `serviceadded` event will track newly discovered Bluetooth GATT Services
  while `serviceremoved` event will track removed ones. A new `servicechanged`
  event will fire when any characteristic and/or descriptor gets added or
  removed from a Bluetooth GATT Service.

At the time of writing, Chrome OS, Android M, Linux, and Mac are [the most advanced
platforms](https://github.com/WebBluetoothCG/web-bluetooth/blob/gh-pages/implementation-status.md).
Windows 8.1+ and iOS will be supported as much as feasible by the platforms.

## Resources

- Web Bluetooth Community: [https://plus.google.com/communities/108953318610326025178](https://plus.google.com/communities/108953318610326025178)
- Chrome Feature Status: [https://www.chromestatus.com/feature/5264933985976320](https://www.chromestatus.com/feature/5264933985976320)
- Implementation Bugs: [https://crbug.com/?q=component:Blink>Bluetooth](https://crbug.com/?q=component:Blink>Bluetooth)
- Web Bluetooth Spec: [https://webbluetoothcg.github.io/web-bluetooth](https://webbluetoothcg.github.io/web-bluetooth)
- Spec Issues: [https://github.com/WebBluetoothCG/web-bluetooth/issues](https://github.com/WebBluetoothCG/web-bluetooth/issues)
- BLE Peripheral Simulator App: [https://github.com/WebBluetoothCG/ble-test-peripheral-android](https://github.com/WebBluetoothCG/ble-test-peripheral-android)

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="_BUwOBdLjzQ"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


{% include "comment-widget.html" %}
