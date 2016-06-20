---
layout: updates/post
title: "Connect to Physical Web beacons"
description: "TODO"
featured_image: /web/updates/images/2016-04-04-connect-to-physical-web-beacons/featured.png
published_on: 2016-04-04
updated_on: 2016-04-04
authors:
  - beaufortfrancois
tags:
  - news
  - PhysicalWeb
  - Bluetooth
  - IoT
  - WebBluetooth
  - eddystone
  - mbed
  - bleno
  - Arduino
---

A Physical Web Beacon is a tiny Bluetooth Low Energy (BLE) device that
broadcasts continously a URL that can be discovered by nearby users. This is
great for discovering websites but how do I get to interact with the device
that actually broadcasts its presence? Until now, you would build an app that
user would have to manually install from a store. However with the upcoming
experimental Web Bluetooth API, a website can now interact directly with a BLE
device.

So how do we make this Physical Web Beacon connectable so that any
user could communicate with a device by simply clicking on a Physical Web
notification?

## Connect to Physical Web Beacons

First, we'll see below some ways to make your Physical Web Beacon connectable with
different platforms:

- [With Node.js](#with-nodejs)
- [With Arduino BLEPeripheral](#with-arduino-bleperipheral)
- [In mbed OS](#on-mbed-os)

For each of these samples, you can replace `https://www.example.com` with [`https://googlechrome.github.io/samples/web-bluetooth/device-disconnect.html`](https://googlechrome.github.io/samples/web-bluetooth/device-disconnect.html)
and enter `Francois bot` as the name and click on the "Scan" button.

TODO

### With Node.js

The [node-eddystone-beacon](https://github.com/don/node-eddystone-beacon) is a
Node.js module for creating Eddystone beacons. Under the hood it uses the
popular [bleno](https://github.com/sandeepmistry/bleno) module.

Here's below some JavaScript sample for a [Intel Edison](http://www.intel.com/content/www/us/en/do-it-yourself/edison.html)
board that broadcasts `https://www.example.com` and allows connection to its
GATT Server. 

{% highlight javascript %}
// Note that you need to require a nested version of bleno
var beacon = require('eddystone-beacon');
var bleno = require('eddystone-beacon/node_modules/bleno');

const DEVICE_NAME = 'Francois bot';

process.env['BLENO_DEVICE_NAME'] = DEVICE_NAME;

var characteristic = new bleno.Characteristic({
  uuid: 'fff1',
  properties: ['read']
});

var service = new bleno.PrimaryService({
  uuid: 'fff0',
  characteristics: [ characteristic ]
});

function advertiseUrl() {
  beacon.advertiseUrl('https://www.example.com', { name: DEVICE_NAME });
}

bleno.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    bleno.startAdvertising('Francois Bot', ['fff0']);
    advertiseUrl();
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('advertisingStart: ' + (error ? 'error ' + error : 'success'));
  if (!error) {
    bleno.setServices([ service ]);
  }
});

bleno.on('accept', function(address) {
  console.log("Accepting connection. Stop advertising...");
  beacon.stop();
});

bleno.on('disconnect', function(address) {
  console.log("Client disconnected. Restart advertising...");
  advertiseUrl();
})
{% endhighlight %}

### With Arduino BLEPeripheral

[Arduino BLEPeripheral](https://github.com/sandeepmistry/arduino-BLEPeripheral)
is an Arduino library for creating custom Bluetooth Low Energy peripherals with
[Nordic Semiconductor](http://www.nordicsemi.com)'s [nRF8001](http://www.nordicsemi.com/eng/Products/Bluetooth-R-low-energy/nRF8001)
or [nR51822](http://www.nordicsemi.com/eng/Products/Bluetooth-R-low-energy/nRF51822).
It enables developers to create more customized BLE Peripheral's compared to
the basic [UART](http://www.arduino.cc/en/Reference/Serial) most other Arduino
BLE libraries provide.

It is compatible with Adafruit Bluefruit LE - nRF8001 Breakout, RedBearLab BLE
Shield, Blend Micro, Blend, RFduino and more. Check out the official [Compatible Hardware
list](https://github.com/sandeepmistry/arduino-BLEPeripheral#compatible-hardware)
for an exhaustive list.

Here's below a sample Arduino [sketch](http://www.arduino.cc/en/Tutorial/Sketch) for a [Blend
Micro](http://redbearlab.com/blendmicro/) board that broadcasts
`https://www.example.com` and allows connection to its GATT Server. 

{% highlight cpp %}
// Import libraries (EddystoneBeacon depends on SPI)
#include <SPI.h>
#include <EddystoneBeacon.h>

#define EDDYSTONE_BEACON_REQ   6
#define EDDYSTONE_BEACON_RDY   7
#define EDDYSTONE_BEACON_RST   4

// Create beacon instance, see Blend Micro pinouts above
EddystoneBeacon beacon = EddystoneBeacon(EDDYSTONE_BEACON_REQ,
                                         EDDYSTONE_BEACON_RDY,
                                         EDDYSTONE_BEACON_RST);

// Create one service
BLEService service = BLEService("fff0");

// Create one characteristic
BLECharCharacteristic characteristic = BLECharCharacteristic("fff1", BLERead);

void setup() {
  Serial.begin(9600);

#if defined (__AVR_ATmega32U4__)
  delay(5000);  // needed to see the start up comments on the serial board
#endif

  beacon.setConnectable(true);
  beacon.setLocalName("Francois Bot");
  beacon.setAdvertisedServiceUuid(service.uuid());
  beacon.addAttribute(service);
  beacon.addAttribute(characteristic);

  beacon.begin(-18, "https://www.example.com"); // TX Power, URI
}

void loop() {
  beacon.loop();
}
{% endhighlight %}

### In mbed OS

TODO

{% highlight cpp %}
#include "mbed-drivers/mbed.h"
#include "minar/minar.h"
#include "core-util/FunctionPointer.h"
#include "ble/BLE.h"
#include "eddystone/EddystoneService.h"

using namespace mbed::util;

// Eddystone URL to be advertised
static const char url[] = "https://www.example.com";

// Beacon name
static char beaconName[] = "Francois bot";

// Service UUIDs for the beacon
static uint16_t uuid16_list[] = { 0xfff0 };

// Values for ADV packets related to firmware levels
static const PowerLevels_t defaultAdvPowerLevels = {-47, -33, -21, -13};

// Values for radio power levels, provided by manufacturer
static const PowerLevels_t radioPowerLevels      = {-30, -16, -4, 4};

void disconnectionCallback(const Gap::DisconnectionCallbackParams_t *params)
{
    BLE::Instance().gap().startAdvertising(); // restart advertising
}

void onBleInitError(BLE &ble, ble_error_t error)
{
    (void)ble;
    (void)error;
   // Initialization error handling should go here...
}

void bleInitComplete(BLE::InitializationCompleteCallbackContext *params)
{
    BLE&        ble   = params->ble;
    ble_error_t error = params->error;

    if (error != BLE_ERROR_NONE) {
        onBleInitError(ble, error);
        return;
    }

    if (ble.getInstanceID() != BLE::DEFAULT_INSTANCE) {
        return;
    }

    ble.gap().onDisconnection(disconnectionCallback);

    // Set up beacon
    auto beacon = new EddystoneService(ble, defaultAdvPowerLevels, radioPowerLevels, 0);
    beacon->setURLData(url);
    beacon->setNormalFrameData(beaconName, strlen(beaconName), uuid16_list, sizeof(uuid16_list));

    // Every 500 ms. Eddystone URL, then Normal frame
    beacon->setUIDFrameAdvertisingInterval(0);
    beacon->setTLMFrameAdvertisingInterval(0);
    beacon->setURLFrameAdvertisingInterval(500);
    beacon->setNormalFrameAdvertisingInterval(500);

    beacon->startBeaconService();
}

void app_start(int, char**) {
    BLE::Instance().init(bleInitComplete);
}
{% endhighlight %}
