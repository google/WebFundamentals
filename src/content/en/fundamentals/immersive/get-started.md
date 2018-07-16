project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Build a 'hellow world' app to get you feet wet with the WebXR Device API.

{# wf_updated_on: 2018-07-16 #}
{# wf_published_on: 2018-06-29 #}
{# wf_blink_components: Blink>WebVR #}

# Get started {: .page-title }

The immersive web encompasses a spectrum of experiences from complete reality to completely immersive, with various levels of augmented reality in between. To accomplish this, all flavors of the immersive web use the [WebXR Device API](https://immersive-web.github.io/webxr-reference/webxr-device-api/) with essentially the same code flow.

![The immersive web spectrum](/web/fundamentals/immersive/images/immersive-spectrum.png)

This article demonstrates this flow by building a _hello world_ app for a magic window. A _magic window_ shows immersive content without a headset wherein the app renders a single view based on the device's orientation sensor. This is a good place to start for several reasons.

* A magic window will often be default immersive experience because using a headset, whether it's stand-alone or a device headset such as Daydream View, requires a user gesture to enter.
* It avoids complications of more advanced use cases such as, for example, placing virtual objects on real-world surfaces or annotating objects in the visual field.
* It demonstrates the basic code structure required for the entire spectrum of  immersive experiences.

Before diving into the code, slip over to the [status and requirements page](status-requirements) and verify that you have the required hardware and software.

## Get the resources

Three.js
Web Server for Chrome
ARCore enabled mobile device in Developer mode
Port forwading enabled
A cable to connect your mobile device to your desktop or laptop.
Set the appropriate flags

## Build the sample

Think of it as drilling down to lower and lower levels of specificity.

navigator&nbsp;&gt;&nbsp;device&nbsp;&gt;&nbsp;session&nbsp;&gt;&nbsp;graphics&nbsp;layer&nbsp;&gt;&nbsp;pose&nbsp;&gt;&nbsp;view

### Get a device

navigator&nbsp;&gt;&nbsp;device

Intro

```

```

Try various combinations of device connection and permissions to see if you can hit all of the paths in this code. [need to know how to revoke localhost permissions]

### Get a session

navigator&nbsp;&gt;&nbsp;device&nbsp;&gt;&nbsp;session

Intro

Add a canvas element to the main page

```

```

Write the code.

```

```

1. Canvas to draw on.
1. Non immersive session. Immersive sessions can't go directly to requesting a session, but that's out of scope.

### base layers

Three.js handles this for you.
