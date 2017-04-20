HTMLElement.prototype.requestFullscreen = HTMLElement.prototype.requestFullscreen || HTMLElement.prototype.webkitRequestFullscreen;
HTMLDocument.prototype.exitFullscreen = HTMLDocument.prototype.exitFullscreen || HTMLDocument.prototype.webkitExitFullscreen;

if (!('fullscreenElement' in document)) {
  Object.defineProperty(document, 'fullscreenElement', {
    get: function() {
      return document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement;
    }
  });
}

for (var prefixedFullscreenChangeEvent of ['webkitfullscreenchange']) {
  document.addEventListener(prefixedFullscreenChangeEvent, function(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();

    var fullscreenChange = document.createEvent('Event');
    fullscreenChange.initEvent('fullscreenchange', true /*bubbles */, false /* cancelable */);
    event.target.dispatchEvent(fullscreenChange);
  });
}
