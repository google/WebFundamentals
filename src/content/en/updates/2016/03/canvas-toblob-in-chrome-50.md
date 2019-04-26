project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Support for canvas.toBlob set to land in Chrome 50.

{# wf_updated_on: 2016-03-14 #}
{# wf_published_on: 2016-03-14 #}
{# wf_tags: images,performance,workers,chrome50 #}
{# wf_featured_image: /web/updates/images/generic/photo.png #}

# Canvas toBlob() Support Added in Chrome 50 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}



The canvas element is getting an upgrade as of Chrome 50: it now supports the `toBlob()` method! This is great news for anyone generating images on the client side, who wants to -- say -- upload them to their server, or store them in IndexedDB for future use.


    function sendImageToServer (canvas, url) {
    
      function onBlob (blob) {
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.onload = function (evt) {
          // Blob sent to server.
        }
    
        request.send(blob);
      }
    
      canvas.toBlob(onBlob);
    }
    

Using `toBlob()` is great, because instead of manipulating a base64 encoded string that you get from `toDataURL()`, you can now you work with the encoded binary data directly. It’s smaller, and it tends to fit more use-cases than a data URI.

If you’re wondering whether you can draw image blobs to another canvas context, the answer is -- in Firefox and Chrome -- yes, absolutely! [You can do this with the `createImageBitmap()` API](./createimagebitmap-in-chrome-50), which is also landing in Chrome 50.


