$(document).ready(function() {
  var displayVersion = function() {
    fetchEditorVersion('stable');
  };

  var updatePlaceholders = function(channel, version) {
    $('.editor-build-rev-' + channel).each(function(index, elem) {
      elem.innerHTML = version;
    });
  };

  var fetchEditorVersion = function(channel) {
    $.ajax({
      type: "GET",
      url: 'https://storage.googleapis.com/dart-archive/channels/' + channel + '/release/latest/VERSION',
      dataType: "json",
      success: function(data) {
        updatePlaceholders(channel, data['version']);
      },
      error: function(xhr, textStatus, errorThrown) {
        console.log(textStatus);
      }
    })
  };

  displayVersion();
});
