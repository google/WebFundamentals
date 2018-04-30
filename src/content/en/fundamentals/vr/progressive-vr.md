



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
