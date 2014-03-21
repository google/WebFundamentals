$(document).ready(function() {
  var link = document.querySelector('#see-code');

  link.addEventListener('click', function(e) {
    _gaq.push(['_trackEvent', 'In-Page Clicks', 'See code']);
  });
});
