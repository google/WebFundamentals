---
rss: false
layout: section
title: "Test Device Input."
seotitle: "Test Device Input"
description: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
introduction: "Touch screens, GPS chips, and accelerometers can be difficult to test since most desktops don't have them. The Chrome DevTools sensor emulators reduce the overhead of testing by emulating common mobile device sensors."
article:
  written_on: 2015-04-14
  updated_on: 2015-05-18
  order: 4
authors:
  - megginkearney
priority: 0
collection: javascript
id: device-input
remember:
  sensors:
    - If your app detects sensors onload using JavaScript (such as Modernizr), make sure that you reload the page after enabling sensor emulators.
---

{% wrap content %}

To access the Chrome DevTools sensor controls, open the DevTools emulation drawer by clicking the **More overrides** ![open emulation drawer](imgs/icon-open-emulator-drawer.png)icon in the top right corner of the browser viewport. Then, select **Sensors** in the emulation drawer.

![sensors pane in the DevTools emulation drawer](imgs/emulation-drawer-sensors.png)

{% include modules/remember.liquid title="Remember" list=page.remember.sensors %}

{% endwrap %}