project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: DeviceOrientationEvent uses relative degrees, and there's a new DeviceOrientationAbsoluteEvent.

{# wf_updated_on: 2016-03-14 #}
{# wf_published_on: 2016-03-13 #}
{# wf_tags: orientation,chrome50 #}
{# wf_featured_image: /web/updates/images/generic/screen-rotation.png #}

# Device Orientation Changes Are Coming to Chrome 50 {: .page-title }

{% include "web/_shared/contributors/jeffposnick.html" %}



Developers working on virtual or augmented reality web apps are undoubtedly
familiar with the [`DeviceOrientationEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent).
For the uninitiated, “[This End Up: Using Device Orientation](http://www.html5rocks.com/en/tutorials/device/orientation/){: .external }”
provides a great overview of how a `deviceorientation` event listener can
respond to a device twisting and turning.

In earlier versions of Chrome, the [`alpha`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/alpha),
[`beta`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/beta),
and [`gamma`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/gamma)
values included in the `DeviceOrientationEvent` were provided as
[`absolute`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/absolute)
degrees with respect to the Earth’s coordinate frame. Providing absolute degrees
requires using a device’s [magnetometer](https://en.wikipedia.org/wiki/Magnetometer)
sensor to detect the Earth’s magnetic field, and that in turn is susceptible to
nearby magnetic field fluctuations that could throw off the readings. In
practice, this could lead to a web app registering a bunch of
`DeviceOrientationEvent`s due to a nearby magnet, despite the device itself not
actually moving. For a virtual reality application that only cares about
tracking changes in orientation, this magnetic noise is bad news.

## What’s Changing?

Starting with Chrome 50, the degrees included in the `DeviceOrientationEvent`
are by default no longer absolute with respect to the Earth’s coordinate frame. This means
that `DeviceOrientationEvent`s should only be triggered when there’s actual
movement, as detected by some combination of a device’s accelerometer and
gyroscope. The magnetometer, and false readings due to magnetic field
fluctuations, are out of the picture.

## But I Still Need Absolute Degrees!

If you’re writing JavaScript that needs to use absolute degrees, perhaps as part
of an augmented reality web application that needs to map directly onto the
physical world, you’re not out of luck. The previous behavior, dependent on a
device’s magnetometer, is available via a new
[`deviceorientationabsolute` event](http://w3c.github.io/deviceorientation/spec-source-orientation.html#deviceorientationabsolute).
From a developer’s perspective, it’s analogous to the existing
`DeviceOrientationEvent`, with the guarantee that the
[`absolute`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceOrientationEvent/absolute)
property will be set to `true`.

## Detecting What’s Supported

Developers who would prefer absolute degrees can use feature detection to
determine whether they’re on a browser that supports the new
`DeviceOrientationAbsoluteEvent` event:


    if ('ondeviceorientationabsolute' in window) {
      // We can listen for the new deviceorientationabsolute event.
    } else if ('ondeviceorientation' in window) {
      // We can still listen for deviceorientation events.
      // The `absolute` property of the event tells us whether
      // or not the degrees are absolute.
    }
    

## Cross-Browser Compatibility

The values reported in the `DeviceOrientationEvent` have never been consistent.

Safari and Firefox on iOS uses relative values for the degrees, which matches the
implementation change introduced in Chrome 50. The change should lead to more
consistency with web applications that were written with iOS in mind.

Firefox (on platforms other than iOS), Edge, and Chrome versions prior to 50 use absolute degree
values for the`DeviceOrientationEvent` when run on devices with the appropriate
sensors.

As of this writing, Chrome 50 is the first browser to support the new
`DeviceOrientationAbsoluteEvent`.

## Advanced Orientation Tracking with the DeviceMotionEvent

[Boris Smus](http://smus.com/about/){: .external } has a
[fantastically detailed article](http://smus.com/sensor-fusion-prediction-webvr/)
detailing with some of the downsides of using the `DeviceOrientationEvent`, and
how to implement a bespoke sensor fusion using
[`DeviceMotionEvent`](https://developer.mozilla.org/en-US/docs/Web/API/DeviceMotionEvent)s.
They provide low-level access to the accelerometer and gyroscope, and can lead
to a more accurate virtual reality experience for your users.

## Additional Resources

* [The DeviceOrientation Event specification](http://w3c.github.io/deviceorientation/spec-source-orientation.html)
* [A `deviceorientation` diagnostics page](https://timvolodine.github.io/deviceorientation-test/)


{% include "comment-widget.html" %}
