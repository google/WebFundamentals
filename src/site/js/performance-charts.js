$(document).ready(function() {
  var nav = $('#performance-charts-nav');
  var charts = $('#performance-charts');

  $.getJSON('//public-golem.storage.googleapis.com/benchmarks.json',
    function(data) {
      $.each(data, function(index) {
        var benchmark = data[index];
        $(nav).append('<li class="' +
          (index == 0 ? 'active' : '') +
          '"><a href="#' + benchmark['name'] +
          '" data-toggle="tab">' + benchmark['name'] + '</a></li>');
        $(charts).append('<div class="tab-pane ' +
          (index == 0 ? 'active' : '') +
          '" id="' + benchmark['name'] + '">' +
          '<iframe style="border: 0" src="//public-golem.storage.googleapis.com/' +
          benchmark['graph'] + '" ' +
          'width="900" height="440"></iframe></div>');
      });
    });
});