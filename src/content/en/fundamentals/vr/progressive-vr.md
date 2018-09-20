project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn how to take a WebGL scene in Three.js and add WebVR capabilities.

{# wf_updated_on: 2018-05-02 #}
{# wf_published_on: 2018-05-02 #}
{# wf_blink_components: Blink>WebVR #}

# Progressive enhancement with WebXR {: .page-title }



function getSession() {
  sessionOptions = {
    exclusive: true,
    outputContext: vrCanvas.getContext('xrpresent')
  }
  xrDevice.supportsSession(sessionOptions)
  .then(() => {
    xrButton.style.display = "block";
  })
  .catch(() => {
    sessionOptions.exclusive = false;
  });
  return xrDevice.requestSession(sessionOptions)
}
