project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2011-08-07 #}
{# wf_published_on: 2011-08-07 #}
{# wf_tags: news,filesystem #}

# Saving generated files on the client-side {: .page-title }

{% include "web/_shared/contributors/eligrey.html" %}


<p>Have you ever wanted to add a <q>Save as&hellip;</q> button to a web app? Whether you're making an advanced <a href="https://developer.mozilla.org/en/WebGL">WebGL</a>-powered <abbr title="computer-aided design">CAD</abbr> web app and want to save 3D object files or you just want to save plain text files in a simple Markdown text editor, saving files in the browser has always been a tricky business. Usually when you want to save a file generated with JavaScript, you have to send the data to your server and then return the data right back with a <code>Content-disposition: attachment</code> header. This is less than ideal for web apps that need to work offline. The W3C File API includes a <a href="http://www.w3.org/TR/file-writer-api/#the-filesaver-interface"><code>FileSaver</code> interface</a>, which makes saving generated data as easy as <code>saveAs(data, filename)</code>, though unfortunately it will eventually be removed from the spec. I have written a JavaScript library called <a href="https://github.com/eligrey/FileSaver.js">FileSaver.js</a>, which implements <code>FileSaver</code> in all modern browsers. Now that it's possible to generate any type of file you want right in the browser, document editors can have an instant save button that doesn't rely on an online connection. When paired with the standard HTML5 <a href="http://www.w3.org/TR/html5/the-canvas-element.html"><code>canvas.toBlob()</code></a> method, FileSaver.js lets you save canvases instantly and give them filenames, which is very useful for HTML5 image editing webapps. For browsers that don't yet support <code>canvas.toBlob()</code>, <a href="https://github.com/eboyjr">Devin Samarin</a> and I wrote <a href="https://github.com/eligrey/canvas-toBlob.js">canvas-toBlob.js</a>. Saving a canvas is as simple as running the following code:</p>


    canvas.toBlob(function(blob) {
      saveAs(blob, filename);
    });
    

<p>I have created a <a href="http://oftn.org/projects/FileSaver.js/demo/">demo</a> of FileSaver.js in action that demonstrates saving a canvas doodle, plain text, and rich text. Please note that saving with custom filenames is only supported in browsers that either natively support <code>FileSaver</code> or browsers like <a href="http://www.chromium.org/getting-involved/dev-channel">Google Chrome 14 dev</a> and <a href="http://tools.google.com/dlpage/chromesxs">Google Chrome Canary</a>, that support <a href="http://developers.whatwg.org/links.html#downloading-resources">&lt;a&gt;.download</a> or web filesystems via <a href="http://www.w3.org/TR/file-system-api/#using-localfilesystem"><code>LocalFileSystem</code></a>.</p>

<figure><a href="http://eligrey.com/demos/FileSaver.js/"><img style="border:1px solid #ccc;max-width: 100%;" src="/web/updates/images/2011/08/saving-generated-files/filesaverss.png">
<figcaption>View FileSaver.js demo</figcaption></a></figure>

## How to construct files for saving

<p>First off, you want to instantiate a <a href="https://developer.mozilla.org/en/DOM/BlobBuilder"><code>BlobBuilder</code></a>. The <code>BlobBuilder</code> API isn't supported in all current browsers, so I made <a href="https://github.com/eligrey/BlobBuilder.js">BlobBuilder.js</a> which implements it. The following example illustrates how to save an XHTML document with <code>saveAs()</code>.</p>


    var bb = new BlobBuilder();
    bb.append((new XMLSerializer).serializeToString(document));
    var blob = bb.getBlob("application/xhtml+xml;charset=" + document.characterSet);
    saveAs(blob, "document.xhtml");
    

<p>Not saving textual data? You can append binary <code>Blob</code>s and <a href="https://developer.mozilla.org/en/JavaScript_typed_arrays"><code>ArrayBuffer</code>s</a> to a <code>BlobBuilder</code> too! The following is an example of setting generating some binary data and saving it.</p>


    var bb = new BlobBuilder();
    var buffer = new ArrayBuffer(8); // allocates 8 bytes
    var data = new DataView(buffer);
    
    // You can write (u)int8/16/32s and float32/64s to dataviews
    data.setUint8 (0, 0x01);
    data.setUint16(1, 0x2345);
    data.setUint32(3, 0x6789ABCD);
    data.setUint8 (7, 0xEF);
    
    bb.append(buffer);
    var blob = bb.getBlob("example/binary");
    saveAs(blob, "data.dat");
    // The contents of data.dat are &lt;01 23 45 67 89 AB CD EF&gt;
    

<p>If you're generating large files, you can implement an abort button that aborts the <code>FileSaver</code>.</p>


    var filesaver = new FileSaver(blob, "video.webm");
    abort_button.addEventListener("click", function() {
      filesaver.abort();
    }, false);
    


{% include "comment-widget.html" %}
