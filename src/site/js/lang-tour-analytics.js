$(document).ready(function() {
  var links = document.querySelectorAll('ol.toc a');

  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    link.addEventListener('click', function(e) {
      var target = e.target;
      var section = target.href.substring(target.href.indexOf('#') + 1);
      _gaq.push(['_trackPageview', '/docs/dart-up-and-running/contents/ch02/' + section + '/']);
    });
  }
});