project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Find out more about how creating content for WebVR is different from creating regular web content.

{# wf_updated_on: 2018-07-09 #}
{# wf_published_on: 2018-06-29 #}
{# wf_blink_components: Blink>WebVR #}

# Seeing the Web from an immersive perspective {: .page-title }

There are several things about creating content for the WebXR Device API that
are not like regular web development. This means that you need different
techniques and a different way of thinking.

If you've done game development - particularly web game development - then some
of this may be familiar to you. But even for seasoned HTML5 game pros, there are
things specific to the immersive web that you need to think about.

## Performance is everything
TBD

## The display is not the window
If you are testing on a desktop VR headset then it is pretty easy to see that
the VR content is being displayed on a completely separate device. However, if
you are using a mobile VR viewer like Daydream, it can be hard to remember the
distinction.

### Use the correct frame rate
On any screen, the hardware will update every pixel at a fixed frequency, called
the frame rate. For many modern displays this will be 60 times per second.

No matter how quickly or slowly your code draws to your canvas, the actual
pixels the user sees will only be updated at exactly this frequency. So if
you draw your scene 100 times per second you will be wasting your time. And if
you update 50 times per second sometimes the scene won't change. Your audience
will experience this as stutter.

For many years the web has had an API called `requestAnimationFrame()` that helps
you to draw to the screen at the correct rate. Once per frame your callback will
be called, letting you know that it is time to draw.

With the WebXR Device API it is important to remember that `requestAnimationFrame()`
will be called at the correct frequency for the display that the web page is
being shown on - NOT the VR display. Some VR displays have frame rates of 90 or
even 120 frames per second. So instead of using the normal `requestAnimationFrame()`
function you need to call `XRSession.requestAnimationFrame()`.

    xrSession.requestFrameOfReference('eyeLevel')
    .then(xrFrameOfRef => {
      xrSession.requestAnimationFrame(onFrame(time, xrPresFrame) {
        // The time argument is for future use and not implemented at this time.
        // Process the frame.
        xrPresFrame.session.requestAnimationFrame(onFrame);
      }
    }

Even on mobile, where it is the same physical display with the same frame rate
whichever method you call, it is still important to use the session's
`requestAnimationFrame()` method. The browser may throttle or pause
`window.requestAnimationFrame()` because technically the page is not visible. It
is hidden behind the system's VR presentation layer.

## There is no DOM
Many HTML5 games will use DOM elements to render the user interface so that they
can take advantage of the browser's layout engine. With the WebXR Device API,
you can only send a canvas to the display. Everything that you want the user
to see must be drawn onto the canvas.

## Click and touch events not supported

Early versions of the Google Cardboard viewer had a magnetic button that was
detectable by the hardware as a touch event. It was tempting to listen for touch
events in a web VR app. Not all mobile viewers work this way. Recent version of
Cardboard have dropped the magnetic clicker. While Daydream View has never
supported this functionality since it uses touch to detect the position of the
mobile device within the viewer to make sure that the presented image lines up
with the lenses. And of course, non-mobile VR headsets will not trigger touch
events at all.

// This is for AR. What about VR?

Instead use the `xrSession.requestHitTest()` method. An example, taken from the [AR Hit Test demo](https://github.com/immersive-web/webxr-samples/blob/master/proposals/phone-ar-hit-test.html) is shown below. This is covered in more detail elsewhere. The thing to note is that `requestHitTest()` is part of the same loop used when drawing frames.  

```JavaScript
function onXRFrame(t, frame) {
  let xrSession = frame.session;
  // The frame of reference, which was set elsewhere, is 'eye-level'.
  // See onSessionStarted() ins the sample code for details.
  let xrPose = frame.getDevicePose(xrFrameOfRef);
  if (xrPose && xrPose.poseModelMatrix) {
    // Calculate the origin and direction for the raycast.
    xrSession.requestHitTest(rayOrigin, rayDirection, xrFrameOfRef)
    .then((results) => {
      if (results.length) {
        // Draw for each view.
      }
    });
  }
  session.requestAnimationFrame(onXRFrame);
}
```




Instead, use a combination of the session's select events and your own selection logic to detect when and what a user clicks. The `XRSession` object provides the `getInputSources()` method which allows you to query for the position of an input device and the direction that it is pointing. Updating this every frame lets you respond quickly when users click the device.

Because [anchor](https://www.chromestatus.com/feature/5129925015109632) and [hit test](https://www.chromestatus.com/features/4755348300759040) APIs are still in development your app will need to figure out what was clicked. Do this in the event handler callback. Session, as soon as its available, gets a select event. (`selectStart` and `selectEnd` events are also available.)

    xrDevice.requestSession(sessionOptions)
    .then(xrSession => {
      xrSession.addEventListener('select', onSelect);
    });

Inside the `select` event:

    xrSession.addEventListener("select", (evt) => {
      let pose = evt.frame.getInputPose(evt.inputSource, xrFrameOfRef);
      // Your code. Varies with rendering method: WebGL, some 3D or VR framework, etc.
      let selectedObj = getObjectIntersectingRay(pose.pointerPoseMatrix);
      if (selectedObj) {
        selectedObj.handleSelect();
      }
    });
