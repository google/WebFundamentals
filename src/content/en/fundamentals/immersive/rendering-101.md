project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: .

{# wf_updated_on: 2018-07-09 #}
{# wf_published_on: 2018-06-29 #}
{# wf_blink_components: Blink>WebVR #}

# Rendering 101 {: .page-title }

## Get access to VR Displays

TBD

```JavaScript
if (navigator.xr) {
  navigator.xr.requestDevice()
  .then(xrDevice => {
    // Advertise the AR/VR functionality to get a user gesture.
  })
  .catch(err => {
    if (err.name === 'NotFoundError') {
      // No XRDevices available.
      console.error('No XR devices available:', err);
    } else {
      // An error occurred while requesting an XRDevice.
      console.error('Requesting XR device failed:', err);
    }
  })
} else{
  console.log("This browser does not support the WebXR API.");
}
```

## Request an XR session

```JavaScript
xrPresentationContext = htmlCanvasElement.getContext('xrpresent');
let sessionOptions = {
  // The exclusive option is optional for non-exclusive sessions; the value
  //   defaults to false.
  immersive: false,
  outputContext: xrPresentationContext
}
xrDevice.requestSession(sessionOptions)
.then(xrSession => {
  // Use a WebGL context as a base layer.
  xrSession.baseLayer = new XRWebGLLayer(session, gl);
  // Start the render loop
})
```

## Draw your VR Scene

```JavaScript
// Do some Cottontail stuff.
let scene = new Scene();
scene.addNode(new CubeSea());

xrDevice.requestSession(sessionOptions)
.then(session => {
  // Use Cottontail's createWebGLContext() method.
  gl = createWebGLContext({
    // It needs an instance of XRDevice.
    compatibleXRDevice: session.device
  });
  // Use Cottontail's Renderer object.
  renderer = new Renderer(gl);
  scene.setRenderer(renderer);
  session.baseLayer = new XRWebGLLayer(session, gl);

  // Initialize the render loop.
})
```

## Run the render loop

```JavaScript
function onFrame(time, xrFrameOfRef) {
  let session = frame.session;
  let layer = new XRWebGLLayer(session, gl);
  scene.startFrame();
  gl.bindFramebuffer(gl.FRAMEBUFFER, session.baseLayer.framebuffer);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let pose = frame.getDevicePose(xrFrameOfRef);
  if (pose) {
    for (let view of frame.views) {
      let viewport = layer.getViewport(session.baseLayer);
      gl.viewport(viewport.x, viewport.y,
                  viewport.width, viewport.height);
      scene.draw(view.projectionMatrix, pose.getViewMatrix(view));
    }
  }
  frame.session.requestAnimationFrame(onFrame);
  scene.endFrame();
}
```

## Exit a session

```JavaScript
function onFrame(time, xrFrameOfRef) {
  let session = frame.session;
  let layer = new XRWebGLLayer(session, gl);
  scene.startFrame();
  gl.bindFramebuffer(gl.FRAMEBUFFER, session.baseLayer.framebuffer);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  let pose = frame.getDevicePose(xrFrameOfRef);
  if (pose) {
    for (let view of frame.views) {
      let viewport = layer.getViewport(session.baseLayer);
      gl.viewport(viewport.x, viewport.y,
                  viewport.width, viewport.height);
      scene.draw(view.projectionMatrix, pose.getViewMatrix(view));
    }
  }
  frame.session.requestAnimationFrame(onFrame);
  scene.endFrame();
}
```

## Closing thoughts and resources
