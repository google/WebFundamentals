(function() {
  var demo = document.querySelector('iframe.demo');
  window.addEventListener('message', function(event) {
    var origin = event.origin || event.originalEvent.origin;
    if (origin.toLowerCase() !== "https://googlechrome.github.io")
      return;
    demo.style.height = `${event.data}px`;
  });
  demo.addEventListener('load', function() {
    demo.style.height = '';
    demo.contentWindow.postMessage({}, 'https://googlechrome.github.io');
  });
})();
