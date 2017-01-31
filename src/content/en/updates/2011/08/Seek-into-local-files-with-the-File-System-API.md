project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2011-08-04 #}
{# wf_published_on: 2011-08-04 #}
{# wf_tags: news,offline,filesystem #}

# Seek into local files with the File System API {: .page-title }

{% include "web/_shared/contributors/sethladd.html" %}


If you have a `File` object (say, one stored using the [FileSystem API](http://www.html5rocks.com/en/tutorials/file/filesystem/){: .external }), it's possible to seek into it and read chunks without reading the entire file into memory:


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
    


{% include "comment-widget.html" %}
