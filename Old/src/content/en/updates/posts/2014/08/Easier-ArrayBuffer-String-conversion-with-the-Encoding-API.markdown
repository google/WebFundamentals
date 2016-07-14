---
layout: updates/post
title: "Easier ArrayBuffer <-> String conversion with the Encoding API"
description: "The native Encoding API offers a straightforward way to convert between raw binary data and JavaScript strings."
published_on: 2014-08-28
updated_on: 2014-08-28
authors:
  - jeffposnick
tags:
  - news
  - arraybuffer
  - decoding
  - strings
  - unicode
  - encoding
---
Over two years ago, [Renato Mangini](http://www.html5rocks.com/en/profiles/#renatomangini) described a [method](http://updates.html5rocks.com/2012/06/How-to-convert-ArrayBuffer-to-and-from-String) for converting between raw [ArrayBuffers](https://developer.mozilla.org/en-US/docs/Web/API/ArrayBuffer) and the corresponding string representation of that data. At the end of the post, Renato mentioned that an official standardized API to handle the conversion was in the process of being drafted. The [specification](http://encoding.spec.whatwg.org/) has now matured, and both [Firefox](https://developer.mozilla.org/en-US/Firefox/Releases/18) and [Google Chrome](http://www.chromestatus.com/feature/5714368087982080) have added native support for the [TextDecoder](http://encoding.spec.whatwg.org/#interface-textdecoder) and [TextEncoder](http://encoding.spec.whatwg.org/#interface-textencoder) interfaces.

As demonstrated by [this live sample](https://googlechrome.github.io/samples/encoding-api/index.html), excerpted below, the [Encoding API](http://encoding.spec.whatwg.org/) makes it simple to translate between raw bytes and native JavaScript strings, regardless of which of the many standard encodings you need to work with.

{% highlight HTML %}
<pre id="results"></pre>

<script>
  if ('TextDecoder' in window) {
    // The local files to be fetched, mapped to the encoding that they're using.
    var filesToEncoding = {
      'utf8.bin': 'utf-8',
      'utf16le.bin': 'utf-16le',
      'macintosh.bin': 'macintosh'
    };

    Object.keys(filesToEncoding).forEach(function(file) {
      fetchAndDecode(file, filesToEncoding[file]);
    });
  } else {
    document.querySelector('#results').textContent = 'Your browser does not support the Encoding API.'
  }

  // Use XHR to fetch `file` and interpret its contents as being encoded with `encoding`.
  function fetchAndDecode(file, encoding) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', file);
    // Using 'arraybuffer' as the responseType ensures that the raw data is returned,
    // rather than letting XMLHttpRequest decode the data first.
    xhr.responseType = 'arraybuffer';
    xhr.onload = function() {
      if (this.status == 200) {
        // The decode() method takes a DataView as a parameter, which is a wrapper on top of the ArrayBuffer.
        var dataView = new DataView(this.response);
        // The TextDecoder interface is documented at http://encoding.spec.whatwg.org/#interface-textdecoder
        var decoder = new TextDecoder(encoding);
        var decodedString = decoder.decode(dataView);
        // Add the decoded file's text to the <pre> element on the page.
        document.querySelector('#results').textContent += decodedString + '\n';
      } else {
        console.error('Error while requesting', file, this);
      }
    };
    xhr.send();
  }
</script>
{% endhighlight %}

The sample above uses feature detection to determine whether the required `TextDecoder` interface is available in the current browser, and displays an error message if it’s not. In a real application, you would normally want to fall back on an alternative implementation if native support isn’t available. Fortunately, the [text-encoding library](https://github.com/inexorabletash/text-encoding) that Renato mentioned in his original article is still a good choice. The library uses the native methods on browsers that support them, and offers polyfills for the Encoding API on browsers that haven’t yet added support.

**Update, September 2014**: Modified the sample to illustrate checking whether the Encoding API is available in the current browser.
