---
layout: updates/post
title: "Seek into local files with the File System API"
published_on: 2011-08-05
updated_on: 2011-08-05
authors:
  - sethladd
tags:
  - news
  - offline
  - filesystem
---
If you have a `File` object (say, one stored using the [FileSystem API](http://www.html5rocks.com/en/tutorials/file/filesystem/)), it's possible to seek into it and read chunks without reading the entire file into memory:

{% highlight javascript %}
var url = "filesystem:http://example.com/temporary/myfile.zip";

window.webkitResolveLocalFileSystemURL(url, function(fileEntry) {
  fileEntry.file(function(file) {
    var reader = new FileReader();

    reader.onload = function(e) {
      var ab = e.target.result; // arrayBuffer containing bytes 0-10 of file.
      var uInt8Arr = new Uint8Array(ab);
      ...
    };

    var blob = file.webkitSlice(0, 10, "application/zip");  // mimetype is optional
    reader.readAsArrayBuffer(blob);
  }, errorHandler);
}, errorHandler);
{% endhighlight %}
