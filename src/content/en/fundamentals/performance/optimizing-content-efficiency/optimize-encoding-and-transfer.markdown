---
layout: shared/narrow
title: "Optimizing encoding and transfer size of text-based assets"
description: "Next to eliminating unnecessary resource downloads, the best thing we can do to improve page load speed is to minimize our overall download size by optimizing and compressing the remaining resources."
published_on: 2014-04-01
updated_on: 2015-10-06
order: 3
translation_priority: 0
authors:
  - ilyagrigorik
key-takeaways:
  compression-101:
    - Compression is the process of encoding information using fewer bits
    - Eliminating unnecessary data always yields the best results
    - There are many different compression techniques and algorithms
    - You will need a variety of techniques to achieve the best compression
  minification:
    - Content-specific optimizations can significantly reduce the size of delivered resources.
    - Content-specific optimizations are best applied as part of your build/release cycle.
  text-compression:
    - "GZIP performs best on text-based assets: CSS, JavaScript, HTML"
    - All modern browsers support GZIP compression and will automatically request it
    - Your server needs to be configured to enable GZIP compression
    - Some CDNs require special care to ensure that GZIP is enabled
notes:
  jquery-minify:
    - "Case in point, the uncompressed development version of the JQuery library is now approaching ~300KB. The same library, but minified (removed comments, etc.) is about 3x smaller: ~100KB."
  gzip:
    - "Believe it or not, there are cases where GZIP can increase the size of the asset. Typically, this happens when the asset is very small and the overhead of the GZIP dictionary is higher than the compression savings, or if the resource is already well compressed. Some servers allow you to specify a “minimum filesize threshold” to avoid this problem."
---

<p class="intro">
  Next to eliminating unnecessary resource downloads, the best thing we can do to improve page load speed is to minimize our overall download size by optimizing and compressing the remaining resources.
</p>

{% include shared/toc.liquid %}

## Data compression 101

Once we’ve eliminated any unnecessary resources, the next step is to minimize the total size of the remaining resources the browser has to download - i.e. compress them. Depending on the resource type - text, images, fonts, and so on - we have a number of different techniques at our disposal: generic tools that can be enabled on the server, pre-processing optimizations for specific content-types, and resource specific optimizations that require input from the developer.

Delivering the best performance requires the combination of all of these techniques.

{% include shared/takeaway.liquid list=page.key-takeaways.compression-101 %}

The process of reducing the size of data is known as “data compression,” and it is a deep field of study on its own: many people have spent their entire careers working on algorithms, techniques, and optimizations to improve compression ratios, speed, and memory requirements of various compressors. Needless to say, a full discussion on this topic is out of our scope, but it is still important to understand, at a high level, how compression works and the techniques we have at our disposal to reduce the size of various assets required by our pages.

To illustrate the core principles of these techniques in action, let’s consider how we can go about optimizing a simple text message format that we’ll invent just for this example:

    # Below is a secret message, which consists of a set of headers in
    # key-value format followed by a newline and the encrypted message.
    format: secret-cipher
    date: 04/04/14
    AAAZZBBBBEEEMMM EEETTTAAA

1. Messages may contain arbitrary annotations, which are indicated by the “#” prefix. Annotations do not affect the meaning or any other behavior of the message.
1. Messages may contain “headers” which are key-value pairs (separated by “:”) and have to appear at the beginning at the message.
1. Messages carry text payloads.

What could we do reduce the size of the above message, which is currently 200 characters long?

1. Well, the comment is interesting, but we know that it doesn’t actually affect the meaning of the message, so we eliminate it when we’re transmitting the message.
1. There are probably some clever techniques we could use to encode headers in an efficient manner -- e.g. we don’t know if all messages always have “format” and “date”, but if they did, we could convert those to short integer IDs and just send those! That said, we’re not sure if that’s the case, so we’ll leave it alone for now.
1. The payload is text only, and while we don’t know what the contents of it really are (apparently, it’s using a “secret-message”), just looking at the text seems to show that there is a lot of redundancy in it. Perhaps, instead of sending repeated letters, we can just count the number of repeated letters and encode them more efficiently?
    * E.g. “AAA” becomes “3A” - or, sequence of three A’s.


Combining our techniques, we arrive at the following result:

    format: secret-cipher
    date: 04/04/14
    3A2Z4B3E3M 3E3T3A

The new message is 56 characters long, which means we managed to compress our original message by an impressive 72% - not bad, all things considered, and we’re only getting started!

Of course, you may be wondering, this is all great, but how does this help us optimize our web pages? Surely we’re not going to try to invent our compression algorithms, are we? The answer is no, we won’t, but as you will see, we will use the exact same techniques and way of thinking when optimizing various resources on our pages: preprocessing, context-specific optimizations, and different algorithms for different content.


## Minification: preprocessing & context-specific optimizations

{% include shared/takeaway.liquid list=page.key-takeaways.minification %}

The best way to compress redundant or unnecessary data is to eliminate it altogether. Of course, we can’t just delete arbitrary data, but in some contexts where we may have content-specific knowledge of the data format and its properties, it is often possible to significantly reduce the size of the payload without affecting its actual meaning.

{% include_code src=_code/minify.html snippet=full %}

Consider the simple HTML page above and the three different content types that it contains: HTML markup, CSS styles, and JavaScript. Each of these content types has different rules for what constitutes valid HTML markup, CSS rules, or JavaScript content, different rules for indicating comments, and so on. How could we reduce the size of this page?

* Code comments are a developer’s best friend, but the browser does not need to see them! Simply stripping the CSS (`/* … */`), HTML (`<!-- … -->`), and JavaScript (`// …`) comments can significantly reduce the total size of the page.
* A “smart” CSS compressor could notice that we’re using an inefficient way of defining rules for ‘.awesome-container’ and collapse the two declarations into one without affecting any other styles, saving yet more bytes.
* Whitespace (spaces and tabs) is a developer convenience in HTML, CSS, and JavaScript. An additional compressor could strip out all the tabs and spaces.

^
{% include_code src=_code/minified.html snippet=full %}

After applying the above steps our page goes from 406 to 150 characters - 63% compression savings! Granted, it’s not very readable, but it also doesn’t have to be: we can keep the original page as our “development version” and then apply the steps above whenever we are ready to release the page on our website.

Taking a step back, the above example illustrates an important point: a general purpose compressor - say one designed to compress arbitrary text - could probably also do a pretty good job of compressing the page above, but it would never know to strip the comments, collapse the CSS rules, or dozens of other content-specific optimizations. This is why preprocessing / minification / context-aware optimization can be such a powerful tool.

{% include shared/remember.liquid list=page.notes.jquery-minify %}

Similarly, above techniques can be extended beyond just text-based assets. Images, video, and other content types all contain their own forms of metadata and various payloads. For example, whenever you take a picture with a camera, the photo also typically embeds a lot of extra information: camera settings, location, and so on. Depending on your application, this data may be critical (e.g. a photo sharing site), or completely useless and you should consider whether it is worth removing. In practice, this metadata can add up to tens of kilobytes for every image!

In short, as a first step in optimizing the efficiency of your assets, build an inventory of the different content types and consider what kinds of content-specific optimizations you can apply to reduce their size - doing so can yield significant savings! Then, once you’ve figured out what they are, automate these optimizations by adding them to your build and release processes - that’s the only way you can guarantee that the optimizations will stay in place.

## Text compression with GZIP

{% include shared/takeaway.liquid list=page.key-takeaways.text-compression %}

[GZIP](https://en.wikipedia.org/wiki/Gzip) is a generic compressor that can be applied to any stream of bytes: under the hood it remembers some of the previously seen content and attempts to find and replace duplicate data fragments in an efficient way - for the curious, [great low-level explanation of GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). However, in practice, GZIP performs best on text-based content, often achieving compression rates of as high as 70-90% for larger files, whereas running GZIP on assets that are already compressed via alternative algorithms (e.g. most image formats) yields little to no improvement.

All modern browsers support and automatically negotiate GZIP compression for all HTTP requests: our job is to ensure that the server is properly configured to serve the compressed resource when requested by the client.


<table class="mdl-data-table mdl-js-data-table">
<colgroup><col span="1"><col span="1"><col span="1"><col span="1"></colgroup>
<thead>
  <tr>
    <th>Library</th>
    <th>Size</th>
    <th>Compressed size</th>
    <th>Compression ratio</th>
  </tr>
</thead>
<tbody>
<tr>
  <td data-th="library">jquery-1.11.0.js</td>
  <td data-th="size">276 KB</td>
  <td data-th="compressed">82 KB</td>
  <td data-th="savings">70%</td>
</tr>
<tr>
  <td data-th="library">jquery-1.11.0.min.js</td>
  <td data-th="size">94 KB</td>
  <td data-th="compressed">33 KB</td>
  <td data-th="savings">65%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.js</td>
  <td data-th="size">729 KB</td>
  <td data-th="compressed">182 KB</td>
  <td data-th="savings">75%</td>
</tr>
<tr>
  <td data-th="library">angular-1.2.15.min.js</td>
  <td data-th="size">101 KB</td>
  <td data-th="compressed">37 KB</td>
  <td data-th="savings">63%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.css</td>
  <td data-th="size">118 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">85%</td>
</tr>
<tr>
  <td data-th="library">bootstrap-3.1.1.min.css</td>
  <td data-th="size">98 KB</td>
  <td data-th="compressed">17 KB</td>
  <td data-th="savings">83%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.css</td>
  <td data-th="size">186 KB</td>
  <td data-th="compressed">22 KB</td>
  <td data-th="savings">88%</td>
</tr>
<tr>
  <td data-th="library">foundation-5.min.css</td>
  <td data-th="size">146 KB</td>
  <td data-th="compressed">18 KB</td>
  <td data-th="savings">88%</td>
</tr>
</tbody>
</table>

The above table illustrates the savings provided by GZIP compression for a few of the most popular JavaScript libraries and CSS frameworks. The savings range from 60 to 88%, and note that the combination of minified files (identified by “.min” in their filenames), plus GZIP, offers an even larger win.

1. **Apply content-specific optimizations first: CSS, JS, and HTML minifiers.**
1. **Apply GZIP to compress the minified output.**

The best part is that enabling GZIP is one of the simplest and highest payoff optimizations to implement - sadly, many people still forget to implement it. Most web servers will compress content on your behalf, and you just need to verify that the server is correctly configured to compress all the content types that would benefit from GZIP compression.

What’s the best config for your server? The HTML5 Boilerplate project contains [sample configuration files](https://github.com/h5bp/server-configs) for all the most popular servers with detailed comments for each configuration flag and setting: find your favorite server in the list, look for the GZIP section, and confirm that your server is configured with recommended settings.

<img src="images/transfer-vs-actual-size.png" class="center" alt="DevTools demo of actual vs transfer size">

A quick and simple way to see GZIP in action is to open Chrome DevTools and inspect the “Size / Content” column in the Network panel: “Size” indicates the transfer size of the asset, and “Content” the uncompressed size of the asset. For the HTML asset in above example, GZIP saved 98.8 KB during transfer!

{% include shared/remember.liquid list=page.notes.gzip %}

Finally, a word of warning: while most servers will automatically compress the assets for you when serving them to the user, some CDNs require extra care and manual effort to ensure that the GZIP asset is served. Audit your site and ensure that your assets are, in fact, [being compressed](http://www.whatsmyip.org/http-compression-test/)!
