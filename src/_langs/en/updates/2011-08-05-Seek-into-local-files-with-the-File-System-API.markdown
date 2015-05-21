---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2011-08-05

title: "Seek into local files with the File System API"
description: ""
article:
  written_on: 2011-08-05
  updated_on: 2011-08-05
authors:
  - sethladd
tags:
  - offline
  - filesystem
permalink: /updates/2011/08/Seek-into-local-files-with-the-File-System-API.html
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
