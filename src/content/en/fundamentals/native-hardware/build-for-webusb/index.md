project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: This article explains how to build a device to take full advantage of the WebUSB API.

{# wf_updated_on: 2019-03-15 #}
{# wf_published_on: 2018-12-20 #}
{# wf_blink_components: Blink>USB #}

# Building a Device for WebUSB {: .page-title }

{% include "web/_shared/contributors/reillyg.html" %}

This article explains how to build a device to take full advantage of the
[WebUSB API](https://wicg.github.io/webusb). For a brief introduction to the API
itself see
[this previous article](/web/updates/2016/03/access-usb-devices-on-the-web).

## Background

The Universal Serial Bus (USB) has become the most common physical interface for
connecting peripherals to desktop and mobile computing devices. In addition to
defining the electrical characteristics of the bus and a general model for
communicating with a device, USB specifications include a set of device class
specifications. These are general models for particular classes of devices such
as storage, audio, video, networking, etc. that device manufacturers can
implement. The advantage of these device class specifications is that an
operating system vendor can implement a single driver based on the class
specification (a "class driver") and any device implementing that class will be
supported. This was a great improvement over every manufacturer needing to write
their own device drivers.

Some devices however don't fit into one of these standardized device classes. A
manufacturer may instead choose to label their device as implementing the
vendor-specific class. In this case the operating system chooses which device
driver to load based on information provided in the vendor's driver package,
typically a set of vendor and product IDs which are known to implement a
particular vendor-specific protocol.

Another feature of the USB is that devices may provide multiple interfaces to
the host they are connected to. Each interface can implement either a
standardized class or be vendor-specific. When an operating system chooses the
right drivers to handle the device each interface can be claimed by a different
driver. For example, a USB webcam typically provides two interfaces, one
implementing the USB video class (for the camera) and one implementing the USB
audio class (for the microphone). The operating system does not load a single
"webcam driver" but instead independent video and audio class drivers which take
responsibility for the separate functions of the device. This composition of
interface classes provides for greater flexibility.

## Introduction

Many of the standard USB classes have corresponding web APIs. For example, a
page can capture video from a video class device using
[`getUserMedia()`](/web/fundamentals/media/recording-video)
or receive input events from a human interface (HID) class device by listening
for
[KeyboardEvents](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent)
or
[PointerEvents](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events),
or using the
[Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API).
Just as not all devices implement a standardized class definition not all
devices implement features that correspond to existing web platform APIs. When
this is the case the WebUSB API can fill that gap by providing a way for sites
to claim a vendor-specific interface and implement support for it from directly
within their page.

The specific requirements for a device to be accessible via WebUSB vary slightly
from platform to platform due to differences in how operating systems manage USB
devices but the basic requirement is that a device should not already have a
driver claiming the interface the page wants to control. This could be either a
generic class driver provided by the OS vendor or a device driver provided by
the vendor. As USB devices can provide multiple interfaces, each of which may
have its own driver, it is possible to build a device for which some interfaces
are claimed by a driver and others are left accessible to the browser.

For example, a high-end USB keyboard may provide an HID class interface that
will be claimed by the operating system's input subsystem and a vendor-specific
interface that remains available to WebUSB for use by a configuration tool. This
tool can be served on the manufacturer's website allowing the user to change
aspects of the device's behavior such as macro keys and lighting effects without
installing any native software. Such a device's configuration descriptor would
look something like this:

<table>
  <tr>
   <th>Value</th>
   <th>Field</th>
   <th>Description</th>
  </tr>
  <tr class="alt">
   <td colspan="3">Configuration descriptor</td>
  </tr>
  <tr>
   <td><code>0x09</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x02</code></td>
   <td>bDescriptorType</td>
   <td>Configuration descriptor</td>
  </tr>
  <tr>
   <td><code>0x0039</code></td>
   <td>wTotalLength</td>
   <td>Total length of this series of descriptors</td>
  </tr>
  <tr>
   <td><code>0x02</code></td>
   <td>bNumInterfaces</td>
   <td>Number of interfaces</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bConfigurationValue</td>
   <td>Configuration 1</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>iConfiguration</td>
   <td>Configuration name (none)</td>
  </tr>
  <tr>
   <td><code>0b1010000</code></td>
   <td>bmAttributes</td>
   <td>Self-powered device with remote wakeup</td>
  </tr>
  <tr>
   <td><code>0x32</code></td>
   <td>bMaxPower</td>
   <td>Max Power is expressed in 2 mA increments</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Interface descriptor</td>
  </tr>
  <tr>
   <td><code>0x09</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x04</code></td>
   <td>bDescriptorType</td>
   <td>Interface descriptor</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bInterfaceNumber</td>
   <td>Interface 0</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bAlternateSetting</td>
   <td>Alternate setting 0 (default)</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bNumEndpoints</td>
   <td>1 endpoint</td>
  </tr>
  <tr>
   <td><code>0x03</code></td>
   <td>bInterfaceClass</td>
   <td>HID interface class</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bInterfaceSubClass</td>
   <td>Boot interface subclass</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bInterfaceProtocol</td>
   <td>Keyboard</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>iInterface</td>
   <td>Interface name (none)</td>
  </tr>
  <tr class="alt">
   <td colspan="3">HID descriptor</td>
  </tr>
  <tr>
   <td><code>0x09</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x21</code></td>
   <td>bDescriptorType</td>
   <td>HID descriptor</td>
  </tr>
  <tr>
   <td><code>0x0101</code></td>
   <td>bcdHID</td>
   <td>HID version 1.1</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bCountryCode</td>
   <td>Hardware target country</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bNumDescriptors</td>
   <td>Number of HID class descriptors to follow</td>
  </tr>
  <tr>
   <td><code>0x22</code></td>
   <td>bDescriptorType</td>
   <td>Report descriptor type</td>
  </tr>
  <tr>
   <td><code>0x003F</code></td>
   <td>wDescriptorLength</td>
   <td>Total length of the Report descriptor</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0x07</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bDescriptorType</td>
   <td>Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0b10000001</code></td>
   <td>bEndpointAddress</td>
   <td>Endpoint 1 (IN)</td>
  </tr>
  <tr>
   <td><code>0b00000011</code></td>
   <td>bmAttributes</td>
   <td>Interrupt</td>
  </tr>
  <tr>
   <td><code>0x0008</code></td>
   <td>wMaxPacketSize</td>
   <td>8 byte packets</td>
  </tr>
  <tr>
   <td><code>0x0A</code></td>
   <td>bInterval</td>
   <td>10ms interval</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Interface descriptor</td>
  </tr>
  <tr>
   <td><code>0x09</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x04</code></td>
   <td>bDescriptorType</td>
   <td>Interface descriptor</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bInterfaceNumber</td>
   <td>Interface 1</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bAlternateSetting</td>
   <td>Alternate setting 0 (default)</td>
  </tr>
  <tr>
   <td><code>0x02</code></td>
   <td>bNumEndpoints</td>
   <td>2 endpoints</td>
  </tr>
  <tr>
   <td><code>0xFF</code></td>
   <td>bInterfaceClass</td>
   <td>Vendor-specific interface class</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bInterfaceSubClass</td>
   <td></td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bInterfaceProtocol</td>
   <td></td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>iInterface</td>
   <td>Interface name (none)</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0x07</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bDescriptorType</td>
   <td>Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0b10000010</code></td>
   <td>bEndpointAddress</td>
   <td>Endpoint 1 (IN)</td>
  </tr>
  <tr>
   <td><code>0b00000010</code></td>
   <td>bmAttributes</td>
   <td>Bulk</td>
  </tr>
  <tr>
   <td><code>0x0040</code></td>
   <td>wMaxPacketSize</td>
   <td>64 byte packets</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bInterval</td>
   <td>N/A for bulk endpoints</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0x07</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bDescriptorType</td>
   <td>Endpoint descriptor</td>
  </tr>
  <tr>
   <td><code>0b00000011</code></td>
   <td>bEndpointAddress</td>
   <td>Endpoint 3 (OUT)</td>
  </tr>
  <tr>
   <td><code>0b00000010</code></td>
   <td>bmAttributes</td>
   <td>Bulk</td>
  </tr>
  <tr>
   <td><code>0x0040</code></td>
   <td>wMaxPacketSize</td>
   <td>64 byte packets</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bInterval</td>
   <td>N/A for bulk endpoints</td>
  </tr>
</table>

Note: Values in this and other tables in this document are presented in
hexadecimal or binary, whichever is more readable. The USB is a little-endian
bus and so any integer value larger than 1 byte should be sent least-significant
byte first.

The configuration descriptor consists of multiple descriptors concatenated
together. Each begins with `bLength` and `bDescriptorType` fields so that they
can be identified. The first interface is an HID interface with an associated
HID descriptor and a single endpoint used to deliver input events to the
operating system. The second interface is a vendor-specific interface with two
endpoints that can be used to send commands to the device and receive responses
in return.

## WebUSB descriptors

While WebUSB can work with many devices without firmware modifications however
additional functionality is enabled by marking the device with specific
descriptors indicating support for WebUSB. For example, you can specify a
landing page URL that the browser can direct the user to when your device is
plugged in.

The Binary device Object Store (BOS) is a concept introduced in USB 3.0 but has
also been backported to USB 2.0 devices as part of version 2.1. Declaring
support for WebUSB starts with including the following Platform Capability
Descriptor in the BOS descriptor:

<table>
  <tr>
   <th style="width: 33%">Value</th>
   <th style="width: 33%">Field</th>
   <th style="width: 33%">Description</th>
  </tr>
  <tr class="alt">
   <td colspan="3">Binary device Object Store descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0F</code></td>
   <td>bDescriptorType</td>
   <td>Binary device Object Store descriptor</td>
  </tr>
  <tr>
   <td><code>0x001D</code></td>
   <td>wTotalLength</td>
   <td>Total length of this series of descriptors</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bNumDeviceCaps</td>
   <td>Number of device capability descriptors in the BOS</td>
  </tr>
  <tr class="alt">
   <td colspan="3">WebUSB platform capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x18</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x10</code></td>
   <td>bDescriptorType</td>
   <td>Device capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bDevCapabilityType</td>
   <td>Platform capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bReserved</td>
   <td></td>
  </tr>
  <tr>
   <td><code>{0x38, 0xB6, 0x08, 0x34, 0xA9, 0x09, 0xA0, 0x47, 0x8B, 0xFD, 0xA0,
   0x76, 0x88, 0x15, 0xB6, 0x65}</code></td>
   <td>PlatformCapablityUUID</td>
   <td>WebUSB platform capability descriptor GUID in little-endian format</td>
  </tr>
  <tr>
   <td><code>0x0100</code></td>
   <td>bcdVersion</td>
   <td>WebUSB descriptor version 1.0</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bVendorCode</td>
   <td>bRequest value for WebUSB</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>iLandingPage</td>
   <td>URL for landing page</td>
  </tr>
</table>

Note: The UUID above would be written as
`{3408b638-09a9-47a0-8bfd-a0768815b665}` however when sent as part of a USB
descriptor its component fields must be sent in little-endian order. This
transformation is complex (see
[RFC4122](https://tools.ietf.org/html/rfc4122)) and so the proper encoding is
given here for reference.

The platform capability UUID identifies this as a
[WebUSB Platform Capability descriptor](https://wicg.github.io/webusb/#webusb-platform-capability-descriptor),
which provides basic information about the device. For the browser to fetch more
information about the device it uses the `bVendorCode` value to issue additional
requests to the device. The only request currently specified is `GET_URL` which
returns a [URL descriptor](https://wicg.github.io/webusb/#url-descriptor).
These are similar to string descriptors however are designed to encode URLs in
the fewest bytes. A URL descriptor for "https://google.com" would look like
this:

<table>
  <tr>
   <th>Value</th>
   <th>Field</th>
   <th>Description</th>
  </tr>
  <tr class="alt">
   <td colspan="3">URL descriptor</td>
  </tr>
  <tr>
   <td><code>0x0D</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x03</code></td>
   <td>bDescriptorType</td>
   <td>URL descriptor</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bScheme</td>
   <td>https://</td>
  </tr>
  <tr>
   <td><code>"google.com"</code></td>
   <td>URL</td>
   <td>UTF-8 encoded URL content</td>
  </tr>
</table>

When your device is first plugged in the browser reads the BOS descriptor by
issuing this standard `GET_DESCRIPTOR` control transfer:

<table>
  <tr>
   <th>bmRequestType</th>
   <th>bRequest</th>
   <th>wValue</th>
   <th>wIndex</th>
   <th>wLength</th>
   <th>Data (response)</th>
  </tr>
  <tr>
   <td><code>0b10000000</code></td>
   <td><code>0x06</code></td>
   <td><code>0x0F00</code></td>
   <td><code>0x0000</code></td>
   <td>*</td>
   <td>The BOS descriptor</td>
  </tr>
</table>

This request is usually made twice, the first time with a large enough `wLength`
so that the host finds out the value of the `wTotalLength` field without
committing to a large transfer and then again now that the full descriptor
length is known.

If the WebUSB Platform Capability descriptor has the `iLandingPage` field set to
a non-zero value the browser then performs a WebUSB-specific `GET_URL` request
by issuing a control transfer with the `bRequest` set to the `bVendorCode` value
from the platform capability descriptor and `wValue` set to the `iLandingPage`
value. The request code for `GET_URL` (`0x02`) goes in `wIndex`:

<table>
  <tr>
   <th>bmRequestType</th>
   <th>bRequest</th>
   <th>wValue</th>
   <th>wIndex</th>
   <th>wLength</th>
   <th>Data (response)</th>
  </tr>
  <tr>
   <td><code>0b11000000</code></td>
   <td><code>0x01</code></td>
   <td><code>0x0001</code></td>
   <td><code>0x0002</code></td>
   <td>*</td>
   <td>The URL descriptor</td>
  </tr>
</table>

Again, this request may be issued twice in order to first probe for the length
of the descriptor being read.

Note: Support for displaying a notification when a USB device is plugged in is
not available yet in Google Chrome on Android and Windows.

## Platform-specific considerations

While the WebUSB API attempts to provide a consistent interface for accessing
USB devices developers should still be aware of requirements imposed on
applications such as a web browsers in order to access devices.

### macOS

Nothing special is necessary for macOS. A website using WebUSB can connect to
the device and claim interfaces any interfaces that aren't claimed by a kernel
driver or another application.

### Linux

Linux is like macOS however by default most distributions do not set up user
accounts with permission to open USB devices. A system daemon called udev is
responsible for assigning the user and group allowed to access a device. A rule
such as this will assign ownership of a device matching the given vendor and
product IDs to the `plugdev` group which is a common group for users with access
to peripherals:

    SUBSYSTEM=="usb", ATTR{idVendor}=="XXXX", ATTR{idProduct}=="XXXX", GROUP="plugdev"

Replace `XXXX` with the hexadecimal vendor and product IDs for your device,
e.g. `ATTR{idVendor}=="18d1", ATTR{idProduct}=="4e11"` would match a Nexus One
phone. These must be written without the usual "0x" prefix and all lowercase
to be recognized correctly. To find the IDs for your device run the command line
tool `lsusb`.

This rule should be placed in a file in the `/etc/udev/rules.d` directory and
takes effect as soon as the device is plugged in. No need to restart udev.

### Android

The Android platform is based on Linux but does not require any modification to
system configuration. By default any device which does not have a driver is
accessible to the browser as long as the user acknowledges a permission prompt.
This is an additional step that occurs when the application calls
[`open()`](https://wicg.github.io/webusb/#dom-usbdevice-open) on a device and
must be repeated every time the browser reloads. In addition more devices will
be accessible on Android than on desktop Linux because fewer drivers are
included by default. A notable omission, for example, is the USB CDC-ACM class
commonly implemented by USB-to-serial adapters as there is no API in the Android
SDK for communicating with a serial device.

### Chrome OS

Chrome OS is based on Linux as well and also does not require any modification
to system configuration. The permission_broker service controls access to USB
devices and will allow the browser to access them as long as there is at least
one unclaimed interface.

### Windows

The Windows driver model introduces an additional requirement. Unlike the
platforms above the ability to open a USB device from a user application is not
the default, even if there is no driver loaded. Instead there is a special
driver, WinUSB, that needs to be loaded in order to provide the interface
applications use to access the device. This can be done with either a custom
driver information file (INF) installed on the system or by modifying the device
firmware to provide the Microsoft OS Compatibility Descriptors during
enumeration.

#### Driver Information File (INF)

A driver information file tells Windows what to do when encountering a device
for the first time. Since the user's system already includes the WinUSB driver
all that's necessary is for the INF file to associate your vendor and product ID
with this new installation rule. The file below is a basic example. Save it to a
file with the `.inf` extension, change the sections marked with "X", then right
click on it and choose "Install" from the context menu.

    [Version]
    Signature   = "$Windows NT$"
    Class       = USBDevice
    ClassGUID   = {88BAE032-5A81-49f0-BC3D-A4FF138216D6}
    Provider    = %ManufacturerName%
    CatalogFile = WinUSBInstallation.cat
    DriverVer   = 09/04/2012,13.54.20.543

    ; ========== Manufacturer/Models sections ===========

    [Manufacturer]
    %ManufacturerName% = Standard,NTx86,NTia64,NTamd64

    [Standard.NTx86]
    %USB\MyCustomDevice.DeviceDesc% = USB_Install,USB\VID_XXXX&PID_XXXX

    [Standard.NTia64]
    %USB\MyCustomDevice.DeviceDesc% = USB_Install,USB\VID_XXXX&PID_XXXX

    [Standard.NTamd64]
    %USB\MyCustomDevice.DeviceDesc% = USB_Install,USB\VID_XXXX&PID_XXXX

    ; ========== Class definition ===========

    [ClassInstall32]
    AddReg = ClassInstall_AddReg

    [ClassInstall_AddReg]
    HKR,,,,%ClassName%
    HKR,,NoInstallClass,,1
    HKR,,IconPath,%REG_MULTI_SZ%,"%systemroot%\system32\setupapi.dll,-20"
    HKR,,LowerLogoVersion,,5.2

    ; =================== Installation ===================

    [USB_Install]
    Include = winusb.inf
    Needs   = WINUSB.NT

    [USB_Install.Services]
    Include = winusb.inf
    Needs   = WINUSB.NT.Services

    [USB_Install.HW]
    AddReg = Dev_AddReg

    [Dev_AddReg]
    HKR,,DeviceInterfaceGUIDs,0x10000,"{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"

    ; =================== Strings ===================

    [Strings]
    ManufacturerName              = "Your Company Name Here"
    ClassName                     = "Your Company Devices"
    USB\MyCustomDevice.DeviceDesc = "Your Device Name Here"

The `[Dev_AddReg]` section configures the set of DeviceInterfaceGUIDs for the
device. Every device interface must have a GUID in order for an application to
find and connect to it through the Windows API. Use the `New-Guid` PowerShell
cmdlet or an online tool to generate a random GUID.

#### Microsoft OS compatibility descriptors

The INF file approach above is cumbersome because it requires configuring every
user's machine ahead of time. Windows 8.1 and higher offer an alternative
through the use of custom USB descriptors. These descriptors provide information
to the Windows operating system when the device is first plugged in that would
normally be included in the INF file.

Once you have WebUSB descriptors set up it is easy to add Microsoft's OS
compatibility descriptors as well. First extend the BOS descriptor with this
additional platform capability descriptor. Make sure to update `wTotalLength`
and `bNumDeviceCaps` to account for it. 

<table>
  <tr>
   <th style="width: 33%">Value</th>
   <th style="width: 33%">Field</th>
   <th style="width: 33%">Description</th>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 platform capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x1C</code></td>
   <td>bLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x10</code></td>
   <td>bDescriptorType</td>
   <td>Device capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x05</code></td>
   <td>bDevCapabilityType</td>
   <td>Platform capability descriptor</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bReserved</td>
   <td></td>
  </tr>
  <tr>
   <td><code>{0xDF, 0x60, 0xDD, 0xD8, 0x89, 0x45, 0xC7, 0x4C, 0x9C, 0xD2, 0x65,
   0x9D, 0x9E, 0x64, 0x8A, 0x9F}</code></td>
   <td>PlatformCapablityUUID</td>
   <td>Microsoft OS 2.0 platform compatibility descriptor GUID in little-endian format</td>
  </tr>
  <tr>
   <td><code>0x06030000</code></td>
   <td>dwWindowsVersion</td>
   <td>Minimum compatible Windows version (Windows 8.1)</td>
  </tr>
  <tr>
   <td><code>0x00B2</code></td>
   <td>wMSOSDescriptorSetTotalLength</td>
   <td>Total length of the descriptor set</td>
  </tr>
  <tr>
   <td><code>0x02</code></td>
   <td>bMS_VendorCode</td>
   <td>bRequest value for retrieving further Microsoft descriptors </td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bAltEnumCode</td>
   <td>Device does not support alternate enumeration</td>
  </tr>
</table>

As with the WebUSB descriptors we have to pick a `bRequest` value to be used by
control transfers related to these descriptors. In this example we've picked
`0x02`. `0x07`, placed in `wIndex`, is the command to retrieve the Microsoft OS
2.0 Descriptor Set from the device.

<table>
  <tr>
   <th>bmRequestType</th>
   <th>bRequest</th>
   <th>wValue</th>
   <th>wIndex</th>
   <th>wLength</th>
   <th>Data (response)</th>
  </tr>
  <tr>
   <td><code>0b11000000</code></td>
   <td><code>0x02</code></td>
   <td><code>0x0000</code></td>
   <td><code>0x0007</code></td>
   <td>*</td>
   <td>MS OS 2.0 Descriptor Set</td>
  </tr>
</table>

A USB device can have multiple functions and so the first part of the descriptor
set describes which function the properties that follow are associated with. The
example below configures interface 1 of a composite device. The descriptor gives
the OS two important pieces of information about this interface. The compatible
ID descriptor tells Windows that this device is compatible with the WinUSB
driver. The registry property descriptor functions similarly to the
`[Dev_AddReg]` section of the INF example above, setting a registry property to
assign this function a device interface GUID.

<table>
  <tr>
   <th style="width: 33%">Value</th>
   <th style="width: 33%">Field</th>
   <th style="width: 33%">Description</th>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 descriptor set header</td>
  </tr>
  <tr>
   <td><code>0x000A</code></td>
   <td>wLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0000</code></td>
   <td>wDescriptorType</td>
   <td>Descriptor set header descriptor</td>
  </tr>
  <tr>
   <td><code>0x06030000</code></td>
   <td>dwWindowsVersion</td>
   <td>Minimum compatible Windows version (Windows 8.1)</td>
  </tr>
  <tr>
   <td><code>0x00B2</code></td>
   <td>wTotalLength</td>
   <td>Total length of the descriptor set</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 configuration subset header</td>
  </tr>
  <tr>
   <td><code>0x0008</code></td>
   <td>wLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0001</code></td>
   <td>wDescriptorType</td>
   <td>Configuration subset header desc.</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bConfigurationValue</td>
   <td>
    Applies to configuration 1 (indexed from 0 despite configurations
    normally indexed from 1)
   </td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bReserved</td>
   <td>Must be set to 0</td>
  </tr>
  <tr>
   <td><code>0x00A8</code></td>
   <td>wTotalLength</td>
   <td>Total length of the subset including this header</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 function subset header</td>
  </tr>
  <tr>
   <td><code>0x0008</code></td>
   <td>wLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0002</code></td>
   <td>wDescriptorType</td>
   <td>Function subset header descriptor</td>
  </tr>
  <tr>
   <td><code>0x01</code></td>
   <td>bFirstInterface</td>
   <td>First interface of the function</td>
  </tr>
  <tr>
   <td><code>0x00</code></td>
   <td>bReserved</td>
   <td>Must be set to 0</td>
  </tr>
  <tr>
   <td><code>0x00A0</code></td>
   <td>wSubsetLength</td>
   <td>Total length of the subset including this header</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 compatible ID descriptor</td>
  </tr>
  <tr>
   <td><code>0x0014</code></td>
   <td>wLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0003</code></td>
   <td>wDescriptorType</td>
   <td>Compatible ID descriptor</td>
  </tr>
  <tr>
   <td><code>"WINUSB\0\0"</code></td>
   <td>CompatibileID</td>
   <td>ASCII string padded to 8 bytes</td>
  </tr>
  <tr>
   <td><code>"\0\0\0\0\0\0\0\0"</codE></td>
   <td>SubCompatibleID</td>
   <td>ASCII string padded to 8 bytes</td>
  </tr>
  <tr class="alt">
   <td colspan="3">Microsoft OS 2.0 registry property descriptor</td>
  </tr>
  <tr>
   <td><code>0x0084</code></td>
   <td>wLength</td>
   <td>Size of this descriptor</td>
  </tr>
  <tr>
   <td><code>0x0004</code></td>
   <td>wDescriptorType</td>
   <td>Registry property descriptor</td>
  </tr>
  <tr>
   <td><code>0x0007</code></td>
   <td>wPropertyDataType</td>
   <td>REG_MULTI_SZ</td>
  </tr>
  <tr>
   <td><code>0x002A</code></td>
   <td>wPropertyNameLength</td>
   <td>Length of the property name</td>
  </tr>
  <tr>
   <td><code>"DeviceInterfaceGUIDs\0"</code></td>
   <td>PropertyName</td>
   <td>Property name with null terminator encoded in UTF-16LE</td>
  </tr>
  <tr>
   <td><code>0x0050</code></td>
   <td>wPropertyDataLength</td>
   <td>Length of the property value</td>
  </tr>
  <tr>
   <td><code>"{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}\0\0"</code></td>
   <td>PropertyData</td>
   <td>GUID plus two null terminators encoded in UTF-16LE</td>
  </tr>
</table>

Windows will only query the device for this information once. If the device does
not respond with valid descriptors it will not ask again the next time the
device is connected. This
[page](https://docs.microsoft.com/en-us/windows-hardware/drivers/usbcon/usb-device-specific-registry-settings)
describes the registry entries created when enumerating a device. When testing
it is useful to delete the entries created for a device in order to get Windows
to try to read the descriptors again.

For more information check out Microsoft's
[blog post](https://blogs.msdn.microsoft.com/usbcoreblog/2012/09/26/how-to-install-winusb-sys-without-a-custom-inf/)
on how to use these descriptors.

## Examples

Example code implementing WebUSB-aware devices that include both WebUSB
descriptors and Microsoft OS descriptors can be found in these projects:

 * [WebLight](https://github.com/sowbug/weblight)
 * [WebUSB Arduino Library](https://github.com/webusb/arduino)

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}
