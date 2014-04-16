---
layout: article
title: "Optimizing content efficiency"
description: "Our web applications continue to grow in their scope, ambition, and 
              functionality - that's a good thing. However, the relentless march towards a 
              richer web is driving another trend: the amount of data downloaded by each 
              application continues to increase at a steady pace. "
introduction: "Our web applications continue to grow in their scope, ambition, and 
               functionality - that's a good thing. However, the relentless march towards a 
               richer web is driving another trend: the amount of data downloaded by each 
               application continues to increase at a steady pace. "
article:
  written_on: 2014-01-01
  updated_on: 2014-01-05
  order: 1
collection: performance
key-takeaways:
  eliminate-downloads:
    - Inventory all your own and third party assets on your pages
    - Measure the performance of each asset: its value and its technical performance
    - Determine if the resources are providing sufficient value
  compression-101:
    - Compression is the process of removing redundant and unnecessary data
    - Eliminating unnecessary data always yields the best results
    - There are many different compression techniques and algorithms
    - You will need a variety of techniques to achieve the best compression
  minification:
    - Content-specific optimizations can significantly reduce the size of delivered resources.
    - Content-specific optimizations apply to every content-type: text, images, video, etc.
    - Content-specific optimizations are best applied as part of your build/release cycle.
  text-compression:
    - GZIP performs best on text-based assets: CSS, JavaScript, HTML.
    - All modern browsers support GZIP compression and will automatically request it.
    - Your server needs to configured to enable GZIP compression.
    - Some CDNs require special care to ensure that GZIP is enabled.
  image-compression-101:
    - An image is a grid of pixels
    - Each pixel encodes color and transparency information (RGB/RGBA)
    - Image compressors use variety of techniques to reduce the number of required bits per pixel to reduce file size of the image
  lossless-vs-lossy:
    - Lossless compression reconstructs an exact replica of the input file
    - Lossy compression reconstructs an approximation of the input file
    - Unlike most other data types, images are great candidates for lossy compression
    - There is no single best "quality" setting for all images: each combination of particular compressor and image contents produces a unique output
  select-right-image:
    - There is no single best image format for every use case
    - New image formats (WebP / JPEG XR) provide improved functionality and compression but are not (yet) universally supported by all browsers
    - Selecting the "right" image format for a particular asset requires understanding of the required features (e.g. transparency) and capabilities of the various formats (e.g. lossy support)
  optimize-hidpi-images:
    - High resolution screens have multiple device pixels per CSS pixel
    - High resolution images require significantly higher number of pixels and bytes
    - Image optimization techniques are the same regardless of resolution
  delivering-scaled-images:
    - Delivering scaled assets is one of the simplest and most effective optimizations
    - Reduce the number of unnecessary pixels by scaling your images to their display size
    - Pay close attention to large assets as they result in high overhead
  replace-raster-with-vector:
    - Vector formats are ideally suited for high-resolution screens
    - Audit your image assets and replace them with vector formats where possible
  validate-etags:
    - Validation token is communicated by the server via the ETag HTTP header
    - Validation token enables efficient resource update checks: no data transfer if the resource has not changed.
  cache-contel:
    - Each resource can define its caching policy via Cache-Control HTTP header
    - Cache-Control directives control who can cache the resource, under which conditions, and for how long
  invalidate-cache:
    - Locally cached resources are used until the resource "expires"
    - Embedding a file content fingerprint in the URL enables us to force the client to update to a new version of the resource
    - Each application needs to define its own cache hierarchy for optimal performance 

---

{% wrap content%}

What does a modern web application look like? [HTTP 
Archive](http://httparchive.org/) can help us answer this question. The project 
tracks how the web is built by periodically crawling the most popular sites 
(300,000+ from the Alexa Top 1M list) and recording and aggregating analytics on 
the number of used resources, content types, and other metadata for each 
individual destination.

<img src="image00.png" width="596" height="216" />

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td></td>
<td>50% (median)</td>
<td>75%</td>
<td>90%</td>
</tr>
<tr>
<td>HTML</td>
<td>13 KB (1%)</td>
<td>26 KB (1%)</td>
<td>54 KB (2%)</td>
</tr>
<tr>
<td>Images</td>
<td>528 KB (50%)</td>
<td>1213 KB (61%)</td>
<td>2384 KB (68%)</td>
</tr>
<tr>
<td>JavaScript</td>
<td>207 KB (20%)</td>
<td>385 KB (19%)</td>
<td>587 KB (17%)</td>
</tr>
<tr>
<td>CSS</td>
<td>24 KB (2%)</td>
<td>53 KB (3%)</td>
<td>108 KB (3%)</td>
</tr>
<tr>
<td>Other</td>
<td>282 KB (27%)</td>
<td>308 KB (16%)</td>
<td>353 KB (10%)</td>
</tr>
<tr>
<td>Total</td>
<td>1054 KB</td>
<td>1985 KB</td>
<td>3486 KB</td>
</tr>
</table>

The above data captures the trend in growth of number of downloaded bytes for 
popular destinations on the web between January 2013 and January 2014. Of 
course, not every site grows at the same rate or requires same amount of data, 
hence the reason why we are highlighting the different quantiles within the 
distribution: 50th (median), 75th, and 90th. 

A median site at the beginning of 2014 is composed of 75 requests that add up to 
1054 KB of total transferred bytes, and the total number of bytes (and requests) 
has grown at a steady pace throughout the previous year. This by itself should 
not be all that surprising, but it does carry important performance 
implications: yes, internet speeds are getting faster, but they are getting 
faster at different rates in different countries, and many users are still 
subject to data caps and expensive metered plans - especially on mobile. 

Unlike their desktop counterparts, web applications do not require a separate 
installation process: type in the URL, hit Go, and we are up and running -- 
that's a key feature of the web. However, to make this happen **we often have to 
fetch dozens, and sometime hundreds, of various resources, all of which can add 
up to megabytes of data and must come together in hundreds of milliseconds to 
facilitate the ****instant web experience**** we are aiming for. **

Achieving an instant web experience in light of these requirements is no small 
feat, which is why optimizing content efficiency is critical: eliminating 
unnecessary downloads, optimizing transfer encoding of each resource through 
various compression techniques, and leveraging caching whenever possible to 
eliminate redundant downloads. 

# Eliminating unnecessary downloads

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.eliminate-downloads %}

The fastest and best optimized resource is a resource not sent. Of course, this 
may seem like an obvious statement, but in practice it is all too often 
overlooked: as a performance engineer, it is your job to always maintain a 
critical eye for any opportunity to eliminate unnecessary resources from your 
application. It's a good practice to question, and periodically revisit, the 
implicit and explicit assumptions with your team. A few examples:

* We've always included resource X on our pages, but does the cost of 
  downloading and displaying it offset the value it delivers to the user? How do 
  we know if this resource / widget, is delivering value? Can we measure and 
  prove its value?
* Does the resource -- especially if it is a third party resource -- deliver 
  consistent performance? Is this resource in the critical path, or need to be? 
  If the resource is in the critical path, could it be a single point of failure 
  for our site - i.e. if the resource is unavailable, will it affect performance 
  and the user experience of our pages?
* Does this resource need or have an SLA? Does this resource follow performance 
  best practices: compression, caching, and so on?

All too frequently our pages contain resources which are unnecessary, or worse, 
hinder their performance without delivering much value to the visitor or the 
site they are hosted on. This applies equally to first-party and third-party 
resources and widgets:

* Site A has decided to display a photo carousel on its homepage to allow the 
  visitor to preview multiple photos with a quick click -- all the photos are 
  loaded when the page is loaded, and photos are advanced by the user. 
    * **Question: **have you measured how many users view multiple photos in the 
      carousel? You could be incurring high overhead by downloading unnecessary 
      resources which are never viewed by most visitors.
* Site B has decided to install a third-party widget to display related content, 
  improve social engagement, or provide some other service.
    * **Question:** have you tracked how many visitors use the widget or 
      click-through on the content provided by the widget? Is the engagement 
      generated by this widget enough to justify its overhead?

As you can see, while eliminating unnecessary downloads seems like a trivial 
statement, in practice it is anything but, as it often requires a lot careful 
thinking and measurement to make the call. In fact, for best results you should 
periodically inventory and revisit these questions for each and every asset on 
your pages. 

# Optimizing encoding and transfer size

Once we've eliminated any unnecessary resources, the next step is to minimize 
the total size of the remaining resources the browser has to download - i.e. 
compress them. Depending on the resource type - text, images, fonts, and so on - 
we have a number of different techniques at our disposal: generic tools that can 
be enabled on the server, pre-processing optimizations for specific 
content-types, and resource specific optimizations that require input from the 
developer.

Delivering the best performance requires the combination of all of these 
techniques. 

## Data compression 101

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.compression-101 %}


The process of reducing the size of data is known as "data compression", and it 
is a deep field of study on its own: many people have spent their entire careers 
working on algorithms, techniques, and optimizations to improve compression 
ratios, speed, and memory requirements of various compressors. Needless to say, 
a full discussion on this topic is out of our scope, but it is still important 
to understand, at a high level, how compression works and the techniques we have 
at our disposal to reduce the size of various assets required by our pages.

To illustrate the core principles of these techniques in action, let's consider 
how we can go about optimizing a simple text message format that we'll invent 
just for this example:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td># Below is a secret message, which consists of a set of headers in 
# key-value format followed by a newline and the encrypted message.
format: secret-cipher
date: 04/04/14
AAAZZBBBBEEEMMM EEETTTAAA</td>
</tr>
</table>

* Messages may contain arbitrary annotations, which are indicated by the "#" 
  prefix. Annotations do not affect the meaning or any other behavior of the 
  message.
* Messages may contain "headers" which are key-value pairs (separated by ":") 
  and have to appear at the beginning at the message.
* Messages carry text payloads.

What could we do reduce the size of the above message, which is currently 200 
characters long? 

1. Well, the comment is interesting, but we know that it doesn't actually affect 
   the meaning of the message, so we eliminate it when we're transmitting the 
   message. 
1. There are probably some clever techniques we could use to encode headers in 
   an efficient manner -- e.g. we don't know if all messages always have 
   "format" and "date", but if they did, we could convert those to short integer 
   IDs and just send those! That said, we're not sure if that's the case, so 
   we'll leave it alone for now.
1. The payload is text only, and while we don't know what the contents of it 
   really are (apparently, it's using a "secret-cipher"), just looking at the 
   text seems to show that there is a lot of redundancy in it. Perhaps, instead 
   of sending repeated letters, we can just count the number of repeated letters 
   and encode them more efficiently?
    1. E.g. "AAA" becomes "3A" - or, sequence of three A's. 

Combining our techniques, we arrive at the following result:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>format: secret-cipher
date: 04/04/14
3A2Z4B3E3M 3E3T3A</td>
</tr>
</table>

The new message is 56 characters long, which means we managed to compress our 
original message by an impressive 72% - not bad, all things considered, and 
we're only getting started!

Of course, you may be wondering, this is all great, but how does this help us 
optimize our web pages? Surely we're not going to try to invent our compression 
algorithms, are we? The answer is no, we won't, but as you will see, we will use 
the exact same techniques and way of thinking when optimizing various resources 
on our pages: preprocessing, context-specific optimizations, and different 
algorithms for different content.

## Minification: preprocessing & context-specific optimizations

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.minification %}


The best way to compress redundant or unnecessary data is to eliminate it 
altogether. Of   
course, we can't just delete arbitrary data, but in some contexts where we may 
have content-specific knowledge of the data format and its properties, it is 
often possible to significantly reduce the size of the payload without affecting 
its actual meaning. 

    <html>
      <head>
      <style>
         /* awesome-container is only used on the landing page */
         .awesome-container { font-size: 120% }
         .awesome-container { width: 50% }
      </style>
     </head>
     
     <body>
       <!-- awesome container content: START -->
         <div>…</div>
       <!-- awesome container content: END -->
       <script>
         awesomeAnalytics(); // beacon conversion metrics
       </script>
     </body>
    </html>

Consider the simple HTML page above and the three different content types that 
it contains: HTML markup, CSS styles, and JavaScript. Each of these content 
types has different rules for what constitutes valid HTML markup, CSS rules, or 
JavaScript code, different rules for indicating comments, and so on. How could 
we reduce the size of this page? 

* Code comments are a developers best friend, but the browser does not need to 
  see them! Simply stripping the CSS (/* ... */), HTML (<!-- … -->), and 
  JavaScript (// …) comments can significantly reduce the total size of the 
  page.
* A "smart" CSS compressor could notice that we're using an inefficient way of 
  defining rules for '.awesome-container' and collapse the two declarations into 
  one without affecting any other styles, saving yet more bytes.
* Whitespace (spaces and tabs) is a developer convenience in HTML, CSS, and 
  JavaScript. An additional compressor could strip out all the tabs and spaces.

    <html><head><style>.awesome-container{font-size:120%;width: 50%}</style></head><body><div>…</div><script>awesomeAnalytics();</script></body></html>

After applying the above steps our page goes from 406 to 150 characters - 63% 
compression savings! Granted, it's not very readable, but it also doesn't have 
to be: we can keep the original page as our "development version" and then apply 
the steps above whenever we are ready to release the page on our website. 

Taking a step back, the above example illustrates an important point: a general 
purpose compressor - say one designed to compress arbitrary text - could 
probably also do a pretty good job of compressing the page above, but it would 
never know to strip the comments, collapse the CSS rules, or dozens of other 
content-specific optimizations. This is why preprocessing / minification / 
context-aware optimization can be such a powerful tool.

> _Case in point, the uncompressed development version of the JQuery library is 
> now approaching ~300KB. The same library, but minified (removed comments, 
> etc.) is about 3x smaller: ~100KB._

Similarly, above techniques can be extended beyond just text-based assets. 
Images, video, and other content types all contain their own forms of meta-data 
and various payloads. For example, whenever you take a picture with a camera, 
the photo also typically embeds a lot of extra information: camera settings, 
location, and so on. Depending on your application, this data may be critical 
(e.g. a photo sharing site), or completely useless and you should consider 
whether it is worth removing. In practice, this meta-data can add up to tens of 
kilobytes for every image!

In short, as a first step in optimizing the efficiency of your assets, build an 
inventory of the different content types and consider what kinds of 
content-specific optimizations you can apply to reduce their size - doing so can 
yield significant savings! Then, once you've figured out what they are, automate 
them by adding them to your build and release processes - that's the only way 
you can guarantee that the optimizations will stay in place.

Tools to help you optimize your resources:

* links to pages under tools section…

## Text compression with GZIP

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.text-compression %}

All modern browsers support and automatically negotiate [GZIP 
compression](http://en.wikipedia.org/wiki/Gzip) for all HTTP requests: our job 
is to ensure that the server is properly configured to serve the compressed 
resource when requested by the client. However, before we get to that…

GZIP is a generic compressor that can be applied to any stream of bytes: under 
the hood it uses a "sliding window" which remembers some of the previously seen 
content and attempts to encode redundant content in a more efficient way - for 
the curious, [great low-level explanation of 
GZIP](https://www.youtube.com/watch?v=whGwm0Lky2s&feature=youtu.be&t=14m11s). 
However, in practice, GZIP performs best on text-based content, often achieving 
compression rates of as high as 70-90% for larger files, whereas running GZIP on 
assets that are already compressed via alternative algorithms (e.g. most image 
formats) yields little to no improvement.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Library</td>
<td>Size</td>
<td>Compressed size</td>
<td>Compression ratio</td>
</tr>
<tr>
<td>jquery-1.11.0.js</td>
<td>276 KB</td>
<td>82 KB</td>
<td>70%</td>
</tr>
<tr>
<td>jquery-1.11.0.min.js</td>
<td>94 KB</td>
<td>33 KB</td>
<td>65%</td>
</tr>
<tr>
<td>angular-1.2.15.js</td>
<td>729 KB</td>
<td>182 KB</td>
<td>75%</td>
</tr>
<tr>
<td>angular-1.2.15.min.js</td>
<td>101 KB</td>
<td>37 KB</td>
<td>63%</td>
</tr>
<tr>
<td>bootstrap-3.1.1.css</td>
<td>118 KB</td>
<td>18 KB</td>
<td>85%</td>
</tr>
<tr>
<td>bootstrap-3.1.1.min.css</td>
<td>98 KB</td>
<td>17 KB</td>
<td>83%</td>
</tr>
<tr>
<td>foundation-5.css</td>
<td>186 KB</td>
<td>22 KB</td>
<td>88%</td>
</tr>
<tr>
<td>foundation-5.min.css</td>
<td>146 KB</td>
<td>18 KB</td>
<td>88%</td>
</tr>
</table>

Above table illustrates the savings provided by GZIP compression for a few of 
the most popular JavaScript libraries and CSS frameworks. The savings range from 
60 to 88%, and note that the combination of minified files (identified by ".min" 
in their filenames), plus GZIP, offers an even larger win - in some cases by an 
order of magnitude. 

1. **Apply content-specific optimizations first: CSS, JS, and HTML minifiers.**
1. **Apply GZIP to compress the minified output. **

Best part is, enabling GZIP is likely one of the simplest and highest payoff 
optimizations to implement - sadly, many people still forget to implement it. 
Most web servers will compress content on your behalf, and you just need to 
verify that the server is correctly configured to compress all the content types 
that would benefit from GZIP compression.

What's the best config for your server? The HTML5 Boilerplate project contains 
[sample configuration files](https://github.com/h5bp/server-configs) for all the 
most popular servers with detailed comments for each configuration flag and 
setting: find your favorite server in the list, look for the GZIP section, and 
copy / confirm that your server is configured with recommended settings.

<img src="image01.png" width="624" height="137" />

A quick and simple way to see GZIP in action is to open Chrome Developer Tools 
and inspect the "Size / Content" column in the Network panel: "Size" indicates 
the transfer size of the asset, and "Content" the uncompressed size of the 
asset. For the HTML asset in above example, GZIP saved 24.8 KB during transfer! 

> _For the eagle-eyed: yes, it's true in some cases GZIP can increase the size 
> of the asset - e.g. the CSS asset in above example. Typically, this happens 
> when the asset is small and the overhead of the GZIP dictionary is higher than 
> the savings, or if__ the __resource is __already well compressed__. Some 
> servers allow you to specify a "minimum filesize to compress" to avoid this 
> problem._

Finally, a word of warning: while most servers will automatically compress the 
assets for you when serving them to the user, some CDNs require extra care and 
manual effort to ensure that the GZIP asset is served. Consult the documentation 
of your CDN provider to ensure that your assets are, in fact, [being 
compressed](http://www.whatsmyip.org/http-compression-test/)!

## Image optimization

Images often account for most of the [downloaded 
bytes](https://docs.google.com/a/google.com/document/d/1EdBtvM_OIdmZlPhtOq_oLuQ4nGEq1dycOsN8A-KtExY/edit#) 
and also often occupy a significant amount of the visual space on the page. As a 
result, optimizing images can often yield some of the largest byte savings and 
performance improvements for your website: the fewer bytes the browser has to 
download, the less competition there is for client's bandwidth and the faster 
the browser can download and display all the assets.  

### Image compression 101

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.image-compression-101 %}

Image compression is both an art and science: an art because there is no one 
definitive answer for how to best compress an individual image, and a science 
because there are many well developed techniques and algorithms that can 
significantly reduce the size of an image. Finding the optimal settings for your 
image requires careful analysis along many dimensions: format capabilities, 
content of encoded data, quality, pixel dimensions, and more.  

However, before we get to all that, what exactly is an image after all? 

A [raster image](http://en.wikipedia.org/wiki/Raster_graphics) is simply a 
2-dimensional grid of individual "pixels" - e.g. a 100x100 pixel image is a 
sequence of 10,000 pixels. In turn, each pixel stores the 
"[RGBA](http://en.wikipedia.org/wiki/RGBA_color_space)" values: (R) red channel, 
(G) green channel, (B) blue channel, and (A) alpha (transparency) channel.

Internally, the browser allocates 256 values (shades) for each channel, which 
translates to 8 bits per channel (28 = 256), and 4 bytes per pixel (4 channels * 
8 bits = 32 bits = 4 bytes). As a result, if we know the dimensions of the grid 
we can easily calculate the filesize: 

* 100x100px image is composed of 10,000 pixels
* 10,000 pixels x 4 bytes = 40,000 bytes
* 40,000 bytes / 1024 = 39 KB

> _As an aside, regardless of the image format used to transfer the data from 
> the server to the client,__ when the image is __decoded by the browser__, each 
> pixel __always occupies 4 bytes of memory__. This can be an important 
> constraint for large images and devices which do not have a lot of available 
> memory - e.g. low-end mobile devices._

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Dimensions</td>
<td>Pixels</td>
<td>File size</td>
</tr>
<tr>
<td>100x100</td>
<td>10,000</td>
<td>39KB</td>
</tr>
<tr>
<td>200x200</td>
<td>40,000</td>
<td>156KB</td>
</tr>
<tr>
<td>300x300</td>
<td>90,000</td>
<td>351KB</td>
</tr>
<tr>
<td>500x500</td>
<td>250,000</td>
<td>977KB</td>
</tr>
<tr>
<td>800x800</td>
<td>640,000</td>
<td>2500KB</td>
</tr>
</table>

39KB for a 100x100 pixel image may not seem like a big deal, but the filesize 
quickly explodes for larger images and makes image assets both slow and 
expensive to download. Thankfully, what we've described so far is the 
"uncompressed" image format. What could we do to reduce the image file size?

One simple strategy is to reduce the "bit-depth" of the image from 8 bits per 
channel to a smaller color palette: 8 bits per channel gives us 256 values per 
channel and 16,777,216 (2563) colors in total. What if we reduced the palette to 
256 colors? Then we would only need 8 bits in total for the RGB channels and 
immediately save two bytes per pixel -- that's 50% compression savings over our 
original 4 bytes per pixel format!

<img src="image02.png" width="612" height="265" />

> _Left to right (PNG): 32-bit (16M colors), 7-bit (128 colors), 5-bit (32 
> colors). Complex scenes with gradual color transitions (gradients, sky, etc.) 
> require larger color palettes to avoid visual artifacts such as the pixelated 
> sky in the 5-bit asset. On the other hand, if the image only uses a few 
> colors, then a large palette is simply wasting precious bits!_

Next, once we've optimized the data stored in individual pixels we could get 
more clever and look at nearby pixels as well: turns out, many images, and 
especially photos, have many nearby pixels with similar colors - e.g. the sky, 
repeating textures, and so on. Using this information to our advantage the 
compressor can apply "[delta 
encoding](http://en.wikipedia.org/wiki/Delta_encoding)" where instead of storing 
the individual values for each pixel, we can store the difference between nearby 
pixels: if the adjacent pixels are the same, then the delta is "zero" and we 
only need to store a single bit! But why stop there…

* The human eye has different level of sensitivity to different colors: we can 
  optimize our color encoding to account for this by reducing and increase the 
  palette for those colors.
* "Nearby" pixels form a two dimensional grid, which means that each pixel has 
  multiple neighbors: we can use this fact to further improve delta encoding.
* Instead of looking at just the immediate neighbors for each pixel, we can look 
  at larger blocks of nearby pixels and encode different blocks with different 
  settings.
* And so on… 

As you can tell, image optimization gets complicated quickly (or fun, depending 
on your perspective), and is an active area of academic and commercial research. 
Images occupy a lot of bytes and there is a lot of value in developing better 
image compression techniques! If you're curious to learn more, head to the 
[Wikipedia page](http://en.wikipedia.org/wiki/Image_compression), or check out 
the [WebP compression techniques 
whitepaper](https://developers.google.com/speed/webp/docs/compression) for a 
hands-on example.

So, once again, this is all great, but also very academic: how does it help us 
optimize images that go our pages? Well, we are definitely not in a position to 
invent new compression techniques, but it's important to understand the shape of 
the problem: RGBA pixels, bit-depth, and various optimization techniques. All of 
these concepts will be critical when we talk about the various image formats and 
their respective optimization options and knobs. 

### Lossless vs. lossy compression

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.lossless-vs-lossy %}

For certain types of data, such as source code for a page, or an executable 
file, it is critical that a compressor does not alter or lose any of the 
original information: a single missing or wrong bit of data could completely 
change the meaning of the contents of the file, or worse, break it entirely. 
Whereas for some other types of data, such as images, audio, and video, it may 
be perfectly acceptable to deliver an "approximate" representation of the 
original data: while we may lose some of the information (e.g. reduced color 
palette for images), the tradeoff of requiring fewer bytes may well be worth it. 

* **Lossless data compression** is a class of data compression algorithms that 
  allows the original data to be perfectly reconstructed from the compressed 
  data.
* **Lossy data compression** permits reconstruction of an approximation of the 
  original data, which allows for improved compression rates and smaller file 
  sizes.

<!-- No converter for: INLINE_DRAWING -->

> _In practice, lossy compression is followed by a lossless step: lossy 
> compression produces an approximation of original input and lossless 
> compression then takes over and compresses the approximation of original 
> file._

We've already seen some examples of lossy image compression: by reducing a 
palette of colors used in the image we are producing an "approximation" of the 
original file but with a lot fewer bits per pixel. Similarly, other techniques, 
such as rounding of nearby pixel values, using different encoding settings for 
different colors, and so on, can all yield significant byte savings. 

So, which is better, lossy or lossless? The answer depends on the image contents 
and your own criteria such as the tradeoff between filesize and artifacts 
introduced by lossy compression: in some cases you may need to use lossless 
compression to communicate some intricate detail contained in the image, and in 
others the filesize may be a far more important constraint. This is where your 
own judgement and context needs to come into play.

When using a lossy format such as JPEG the compressor will typically expose a 
customizable "quality" setting, which is typically a number between 1 and 100 
that controls the inner workings of the specific collection of algorithms - e.g. 
quality slider provided by "save for web" functionality by Adobe Photoshop. Note 
that quality levels for different image formats are not directly comparable due 
to differences in algorithms used to encode the image: quality 90 JPEG will 
produce a very different result than a quality 90 
[WebP](https://developers.google.com/speed/webp/).

What's the optimal quality setting for a particular image format? You guessed 
it, there is no single value as the results will vary based on the particular 
input image and your requirements. For absolute best results you can tune each 
image with a custom quality level, or pick some common "safe" default for part 
or all of your assets - e.g. you may want to use a different level setting for 
high-resolution product photos vs. other assets.

### Selecting the right image format

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.select-right-image %}


<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Format</td>
<td>Lossless</td>
<td>Lossy</td>
<td>Alpha</td>
<td>Animation</td>
<td>Browser</td>
</tr>
<tr>
<td>GIF</td>
<td>Yes</td>
<td>No1</td>
<td>Yes</td>
<td>Yes</td>
<td>All</td>
</tr>
<tr>
<td>PNG</td>
<td>Yes</td>
<td>No2</td>
<td>Yes</td>
<td>No</td>
<td>All</td>
</tr>
<tr>
<td>JPEG</td>
<td>No3</td>
<td>Yes</td>
<td>No</td>
<td>No</td>
<td>All</td>
</tr>
<tr>
<td>JPEG XR</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>No</td>
<td>IE</td>
</tr>
<tr>
<td>WebP</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Yes</td>
<td>Chrome, Opera, Android</td>
</tr>
</table>

> _1,2 __GIF and PNG formats both use lossless data compression. However, both 
> formats support reduced color palettes, the use of which can be treated as 
> lossy compression. More generally, while the compression algorithms are lossy, 
> there is no restriction on pre-processing of the input fed into lossless 
> compression - e.g. reduced number of colors._

> _3 __JPEG standard does specify a lossless compression method, but it is not 
> implemented by most compressors. Hence, for all intents and purposes JPEG is a 
> lossy-only format._

There are three universally supported image formats: GIF, PNG, and JPEG. In 
addition to these formats, some browsers also support newer formats such as WebP 
and JPEG XR, which offer better compression and more features. That said, 
unfortunately, there is no one format that is a "perfect fit" for every 
situation: some have features that others don't, while others don't (yet) have 
universal support in all browsers. Let's take a quick run through our options:

* **GIF:** up to 256 colors (8-bit), transparency, and (most famously) 
  animation, lossless.
* **PNG: **up to** **16M colors (24-bit), optional transparency, lossless.
* **JPG:** up to 16M colors (24-bit), no transparency, lossy.
* **JPEG XR:** up to 16M colors (24-bit), optional transparency, lossy and 
  lossless modes, better compression.
* **WebP: **up to 16M colors (24-bit), optional transparency, lossy and lossless 
  modes, animation, better compression.

> _Note that the optional transparency channel adds extra 8 bits per pixel. As a 
> result, the total number of bits per pixel is the sum of color palette (up to 
> 24 bits), plus 8 bits for transparency: 32 bits. _

To determine the best format for a particular image, evaluate the above list 
bottom up: 

1. **Can we use one of the newer image formats such as WebP or JPGXR? **
    1. In some cases you may not need universal browser support - e.g. the 
       images are always displayed by a [Chrome 
       Webview](https://developer.chrome.com/apps/tags/webview) and hence you 
       are guaranteed to have WebP support. 
    1. Alternatively, you can configure [Accept 
       negotiation](http://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/) 
       on your server, or use a CDN that can provide WebP and JPEG XR assets on 
       your behalf. This way visitors with a modern browser can get better 
       compressed images, while older clients would fallback to an older image 
       format.

1. **Does the image require transparency? **
    1. Newer formats support transparency (alpha channel) alongside all other 
       features. However, if you are restricted to universal formats only, then 
       you are likely best off using PNG format.
        1. GIF supports transparency but 8-bit PNG offers better compression.

1. **Can the image be optimized with lossy compression?**
    1. Lossy compression is optimized for photographs and images with repeated 
       patterns. Lossy compression can significantly reduce the filesize of such 
       images, but in the process may also introduce some "compression 
       artifacts" - in some cases this is acceptable (not noticeable, even), in 
       others it may be a poor fit. 
    1. When using lossy compression, don't forget to test several different 
       quality settings to find the right tradeoff between file size and final 
       results.

The above list is not a complete decision tree, but it covers the critical 
highlights: where possible, use newer formats, as they offer more functionality 
and better overall compression; understand your requirements in terms of 
transparency, and lossy vs. lossless tradeoffs and pick the appropriate format, 
mode, and quality setting (where applicable) for each of your files.

For example, the image on the left illustrates the effect of gradual decrease of 
quality in JPEG format: the lower the quality the higher the compression, and 
the higher the amount of introduced artifacts (loss of detail, blurriness, etc).

For best results you will need to find the right tradeoff between visual 
quality, required format features, and file size for each individual image. 
There is no one format, or a quality setting that is "best" for all cases. With 
that in mind, while there is no rulebook, a couple of tips: 

* If a GIF file does not need animation, it is better encoded as an 8-bit PNG.
* Text, and other high precision imagery is best encoded with a lossless 
  compressor.1
* Photos are best encoded with a lossy compressor, which offers significant 
  savings.

> _1 __Ideally you should not be encoding text in your images! Text in images 
> delivers a poor user experience: it is not searchable, selectable, or 
> indexable, and if the user zooms in it becomes blurry. If your text has 
> specific design constraints, consider using a web font._

TODO: do we have a tools section / guidance on tools that you can use to figure 
out best settings?

### Optimizing HiDPI raster images

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.optimize-hidpi-images %}

<img src="image03.png" width="469" height="204" />  
When we talk about pixels, we need to distinguish between different kinds of 
pixels: CSS pixels and device pixels. A single CSS pixel may contain multiple 
device pixels - e.g. a single CSS pixel may correspond directly to a single 
device pixel, or may be backed by multiple device pixels. What's the point? 
Well, the more device pixels there are, the finer the detail of the displayed 
content on the screen. 

High DPI (HiDPI) screens produce beautiful results, but there is one obvious 
tradeoff: more pixels also translate to larger filesizes for underlying assets. 
As an example, let's consider the difference between a photo asset displayed at 
100x100 (CSS) pixels: 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Screen resolution</td>
<td>Total pixels</td>
<td>Uncompressed filesize</td>
</tr>
<tr>
<td>1x</td>
<td>100 * 100 = 10,000</td>
<td>40,000 bytes</td>
</tr>
<tr>
<td>2x </td>
<td>100 * 100 * 4 = 40,000</td>
<td>160,000 bytes</td>
</tr>
<tr>
<td>3x</td>
<td>100 * 100 * 16 = 160,000</td>
<td>640,000 bytes</td>
</tr>
</table>

When we double the resolution the physical screen the total number of pixels 
increased by a factor of four: double the number of horizontal pixels, times 
double the number of vertical pixels. Hence, a "2x" screen requires four times 
as many physical pixels, and a 3x screen requires sixteen times as many pixels!

So, what does this mean in practice? High resolution screens enable us to 
deliver beautiful images, which can be a great product feature (when used 
wisely), but you should also use them judiciously: high resolution assets 
require a significantly higher number of pixels and bytes to encode them. Beyond 
that, there is no difference for optimizing image assets for high-resolution 
screens. At the end of the day it's all about optimizing how we encode each 
pixel, and minimizing the total number of pixels:

* Select the appropriate image format for the high-resolution asset.
* Select the appropriate compression parameters: number of colors, quality, and 
  so on.

### Delivering scaled images

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.delivering-scaled-images %}

Image optimization boils down to two criteria: optimizing the number of bytes 
used to encode each image pixel, and optimizing the total number of pixels: the 
filesize of the image is simply the total number of pixels times the number of 
bytes used to encode each pixel. Nothing more, nothing less.

As a result, one of the simplest and most effective image optimization 
techniques is to ensure that we are not shipping any more pixels than needed to 
display the asset at its intended size in the browser. Sounds simple, right? 
Unfortunately, most pages fail this test for many of their image assets: 
typically, they ship larger assets and rely on the browser to rescale them - 
which also consumes extra CPU resources - and display them at a lower 
resolution.

<img src="image04.png" width="436" height="202" />

> _Hovering over the image element in Chrome DevTools reveals both the "natural" 
> and "display" sizes of the image asset. In above example the 300x260 pixel 
> image is downloaded but is then downscaled (245x212) on the client when it is 
> displayed._

The overhead of shipping unnecessary pixels, only to have the browser rescale 
the image on our behalf, is a big missed opportunity to reduce and optimize the 
total number of bytes required to render the page. Further, note that resizing 
is not simply a function of the number of pixels by which the image is reduced 
by, but also of its natural size.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Natural size</td>
<td>Display size</td>
<td>Unnecessary pixels</td>
</tr>
<tr>
<td>110x110</td>
<td>100x100</td>
<td>110x110 - 100x100 = 2100</td>
</tr>
<tr>
<td>410x410</td>
<td>400x400</td>
<td>410x410 - 400x400 = 8100</td>
</tr>
<tr>
<td>810x810</td>
<td>800x800</td>
<td>810x810 - 800x800 = 16100</td>
</tr>
</table>

Note that in all three cases above the display size is "only 10 pixels smaller" 
than the natural size of the image. However, the number of extra pixels that we 
would have to encode and ship is significantly higher the larger the natural 
size! As a result, while you may not be able to guarantee that every single 
asset is delivered at the exact display size, **you should ensure that the 
number of unnecessary pixels is minimal, and that your large assets in 
particular are delivered as close as ****possible to their display size**.

### Replacing raster images with vector-based formats

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.replace-raser-with-vector %}

Images are often the [single largest 
contributor](https://docs.google.com/a/google.com/document/d/1EdBtvM_OIdmZlPhtOq_oLuQ4nGEq1dycOsN8A-KtExY/edit#) 
to the total bytesize of the page. As a result, ensuring that each image asset 
is optimized: sized to its display size (or as close a possible), and is using 
the least number of bits to encode each pixel (compressed well) are critical to 
the overall performance of the page. However, in addition to optimizing each 
image resource, you should consider if there is an alternative technology or 
format that could achieve similar results but with lower overhead and better 
results:

* CSS effects (gradients, shadows, etc.) and CSS animations can be used to 
  produce resolution-independent assets that always look sharp at every 
  resolution and zoom level, often at a fraction of the bytes required by an 
  image file. 
* Vector image formats (e.g. [SVG](http://caniuse.com/svg)) allow us to author 
  resolution-independent assets.
* Web fonts enable use of beautiful typefaces while preserving the ability to 
  select, search, and resize text - a significant improvement in usability.

<img src="image05.png" width="200" height="200" />             <img 
src="image05.png" width="200" height="200" />  
_[SVG](http://upload.wikimedia.org/wikipedia/en/d/d0/Chrome_Logo.svg)__ (5.3KB 
compressed)                                 
__[PNG](http://upload.wikimedia.org/wikipedia/en/thumb/d/d0/Chrome_Logo.svg/200px-Chrome_Logo.svg.png)__ 
(36KB)_

The growth in adoption of high-resolution screens on mobile devices translates 
to an increasing demand of high-resolution assets on our pages. Vector formats, 
such as SVG, web fonts, and CSS-styled elements and effects can be ideal 
replacements for images: they deliver sharp results at every resolution, often 
(but not always) at a fraction of bytes required by a similar raster image. 

Vector formats perform best when the complexity of the object they describe is 
relatively low: small number of components, simple shapes and gradients, and so 
on. When the scene is complicated (e.g. a photo) the amount of SVG markup (and 
its filesize) that would be required to describe it can be prohibitively high - 
yes, there is still a time and place for raster images. That said, **perform a 
regular audit on your site and identify assets that can be replaced by 
vector-based assets!**

> _Note that vector formats require their own optimization toolchain: __[SVG 
> optimizers](https://www.google.com/search?q=svg+optimizer&oq=svg+optimizer)__, 
> __[font 
> subsetting](https://developers.google.com/fonts/docs/getting_started#Subsets)__, 
> tools to __[detect unused CSS 
> rules](http://addyosmani.com/blog/removing-unused-css/)__, and so on._

### Image optimization checklist

Image optimization is both an art and a science: an art because there is no one 
definitive answer for how to best compress an individual image, and a science 
because there are well-developed techniques and algorithms that can help 
significantly reduce the size of an image. 

Some tips and techniques to keep in mind as you work on optimizing your images:

* **Serve scaled images:** resize images on the server and ensure that the 
  "display" size is as close as possible to the "natural" size size of the 
  image.
* **Pick correct image format:** there is no one best image format. Determine 
  your requirements and select the one that suits each particular asset.
* **Find optimal quality setting (if applicable): **use lossy formats where 
  possible to reduce the number of bytes required to encode the image. Find the 
  optimal quality setting for your image - there is no one "best" value.
* **Remove unnecessary meta-data: **many images contain unnecessary metadata 
  about the asset (geo information, camera information, and so on).
* **Replace raster images with vector-based formats: **vector formats are 
  ideally suited for high-resolution screens and often deliver significant byte 
  savings.

# Resource caching

Fetching a resource over the network is both slow and expensive: large resources 
require many roundtrips between the client and server, which delays when the 
resource is available and can be processed by the browser, and also incurs data 
costs for the visitor. As a result, the ability to cache and reuse previously 
fetched resources is a critical aspect of optimizing for performance. 

The good news is, every browser ships with an implementation of an HTTP resource 
cache. All we have to do is ensure that each server response provides correct 
HTTP header directives to instruct the browser on when and for how long the 
resource can be cached by browser. 

> _If you are using a __Webview__ to fetch and display web content in your 
> application, you may need to provide additional configuration flags to ensure 
> that the HTTP cache is enabled, its size is set to a reasonable number to 
> match your use case, and that the cache is persisted. Check the platform 
> documentation and confirm your settings!_

<!-- No converter for: INLINE_DRAWING -->

When the server returns a response it also emits a collection of response HTTP 
headers, describing the content-type, length, caching directives, validation 
token, and more. For example, in above exchange the server returns a 1024 byte 
response, instructs the client to cache it for up to 120 seconds, and provides a 
validation token ("x234dff") that can be used after the resource has expired to 
check if the resource has been modified.

## Validating cached resource with ETag's

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.validate-etags %}


Let's assume 120 seconds have passed since our initial fetch and the browser has 
initiated a new request for the same resource. First, the browser checks the 
local cache and finds the previous response, unfortunately it cannot use it as 
the resource has now "expired". At this point it could simply dispatch a new 
request and fetch the new full response, but that's inefficient because if the 
resource has not changed then there is no reason to download the exact same 
bytes that are already in cache!

That's the problem that validation tokens, as specified in the ETag header, are 
designed to solve: the server generates and returns an arbitrary token which is 
typically a hash or some other fingerprint of the contents of the file. The 
client does not need to know how the fingerprint is generated, it only needs to 
send it to the server on the next request: if the fingerprint is still the same 
then the resource has not changed and we can skip the resource download.

<!-- No converter for: INLINE_DRAWING -->

In above example the client automatically provides the ETag token within the 
"If-None-Match" HTTP request header, server checks the token against the current 
resource, and if it has not changed returns a "304 Not Modified" response which 
tells the browser that the response it has in cache has not changed and can be 
renewed for another 120 seconds. Note that we do not have to download the 
resource once more - this saves time and bandwidth.

As a web developer, how do you take advantage of efficient resource 
revalidation? The browser does all the work on our behalf: it will automatically 
detect if a validation token has been previously specified, it will append it to 
an outgoing request, and it will update the cache timestamps as necessary based 
on received response from the server. **The only thing that's left for us to do 
is to ensure that the server is, in fact, providing the necessary ETag tokens: 
check your server documentation for necessary configuration flags. **

> _Tip: __HTML5 Boilerplate project contains __[sample configuration 
> files](https://github.com/h5bp/server-configs)__ for all the most popular 
> servers with detailed comments for each configuration flag and setting: find 
> your favorite server in the list, look for appropriate settings, and copy / 
> confirm that your server is configured with recommended settings._

## Cache-Control 

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.cache-contel %}

The best resource request is a request that does not need to communicate with 
the server: a local copy of the resource allows us to eliminate all network 
latency and avoid data charges for the data transfer. To achieve this, the HTTP 
specification allows the server to return a [number of different Cache-Control 
directives](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) that 
control how, and for how long, the individual resource can be cached by the 
browser and other intermediate caches. 

> _Cache-Control header was defined as part of the HTTP/1.1 specification and 
> supersedes previous headers (e.g. Expires) used to define response caching 
> policies. All modern browsers support Cache-Control, hence that is all we will 
> need._

<!-- No converter for: INLINE_DRAWING -->

### "no-cache" and "no-store"

"no-cache" indicates that the returned response cannot be used to satisfy a 
subsequent request to the same URL without first checking with the server if the 
response has changed. As a result, if a proper validation token (ETag) is 
present, no-cache will incur a roundtrip to validate the resource, but can 
eliminate the download if the resource has not changed.

By contrast, "no-store" is much simpler, as it simply disallows the browser and 
all intermediate caches to store any version of the returned response - e.g. 
response containing private personal or banking data. Everytime the user 
requests this asset, a request is sent to the server and a full response is 
downloaded each and every time.

### "public" vs. "private"

If the resource is marked as public then it can be cached by the browser, as 
well as any intermediate cache - e.g.  CDNs and other proxy caches will 
typically only cache and serve "public" resources, unless configured otherwise. 

By contrast, "private" resources can be cached by the browser but are typically 
intended for a single user and hence are not allowed to be cached by any 
intermediate cache - e.g. an HTML page with private user information can be 
cached by that user's browser, but not by a CDN. 

### "max-age"

This directive specifies the maximum time in seconds that the fetched response 
is allowed to be cached for from the time of the request - e.g. "max-age=60" 
indicates that the response can be cached and reused for the next 60 seconds. 

## Defining optimal Cache-Control policy

<!-- No converter for: INLINE_DRAWING -->

Follow the decision tree above to determine the optimal caching policy for a 
particular resource, or a set of resources used by your application. Ideally, 
you should aim to cache as many resources as possible on the client for the 
longest possible period, and provide validation tokens for each resource to 
enable efficient resource revalidation. 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Cache-Control directives</td>
<td>Explanation</td>
</tr>
<tr>
<td>public, max-age=86400</td>
<td>Resource can be cached by browser and any intermediary caches for up to 1 day (60 seconds x 60 minutes x 24 hours)</td>
</tr>
<tr>
<td>private, max-age=600</td>
<td>Resource can be cached by the client's browser only for up to 10 minutes (60 seconds x 10 minutes)</td>
</tr>
<tr>
<td>private, no-store</td>
<td>Resource is not allowed to be cached and must be fetched in full on every request.</td>
</tr>
</table>

According to HTTP Archive, amongst the top 300,000 sites (by Alexa rank), 
[nearly half of all the downloaded resources can be 
cached](http://httparchive.org/trends.php#maxage0) by the browser, which is a 
huge savings for repeat pageviews and visits! Of course, that doesn't mean that 
your particular application will have 50% of resources that can be cached: some 
sites can cache 90%+ of their resources, while others may have a lot of private 
or time-sensitive data that can't be cached at all. 

**Audit your pages to identify which resources can be cached and ensure that the 
server is returning appropriate Cache-Control and ETag headers.**

## Invalidating and updating cached resources

{% include modules/takeaway.liquid title="Key Takeaway" list=page.key-takeaways.invalidate-cache %}


All HTTP requests made by the browser are first routed to the browser cache to 
check if there is a valid cached response that can be used to fulfill the 
request. If there is a match, the response is read from the cache and we 
eliminate both the network latency and the data costs incurred by the transfer. 
**However, what if we want to update or invalidate a cached resource? **

For example, let's say we've told our visitors to cache a CSS stylesheet for up 
to 24 hours (max-age=86400), but our designer has just committed an update that 
we would like to make available to all users. How do we notify all the visitors 
with what is now a "stale" cached copy of our CSS to update their caches? Trick 
question, we can't, at least not without changing the URL of the resource.

Once the resource is cached by the browser, the cached version of the resource 
will be used until the specified cache directives are no longer valid (i.e. 
max-age expires), or until the resource is evicted from cache for some other 
reason - e.g. user clearing their browser cache. As a result, different users 
might end up using different versions of the file when the page is constructed: 
users who just fetched the resource will use the new version, while users who 
cached an earlier (but still valid) copy will use an older version of the 
resource. 

**So, how do we get the best of both worlds: client-side caching and quick 
updates?** Simple, we can change the URL of the resource and force the user to 
download the new resource whenever its content changes. Typically, this is done 
by embedding a fingerprint of the file, or a version number, in its filename - 
e.g. style.**x234dff**.css.

<!-- No converter for: INLINE_DRAWING -->

The ability to define per-resource caching policies allows us to define "cache 
hierarchies" that allow us to control not only how long each resource is cached 
for, but also how quickly new versions of that resource are seen by visitor. For 
example, let's analyze the above example:

* The HTML is marked with "no-cache", which means that the browser will always 
  revalidate the document on each request and fetch the latest version if the 
  contents change. Also, within the HTML markup we embed resource fingerprints 
  in the URLs for CSS and JavaScript assets: if the contents of those files 
  change, than the HTML of the page will change as well and new copy of the HTML 
  response will be downloaded.
* CSS resource is marked as public, which allows it to be cached by intermediate 
  caches (e.g. a CDN), and is set to expire in 1 year. Note that we can use the 
  "far future expires" of 1 year safely because we embed the file fingerprint 
  its filename: if the CSS is updated, the URL will change as well.
* JavaScript resource is also set to expire in 1 year, but is marked as private, 
  perhaps because it contains some private user data that the CDN shouldn't 
  cache. 
* The image is cached without a version or unique fingerprint and is set to 
  expire in 1 day.

The combination of ETag, Cache-Control, and unique URLs allows us to deliver the 
best of all worlds: long-lived expiry times, control over where the response can 
be cached, and on-demand updates.

## Resource caching checklist

There is no one best cache policy. Depending on your traffic patterns, type of 
data served, and application specific requirements for data freshness, you will 
have to define and configure the appropriate per-resource settings, as well as 
the overall "caching hierarchy". 

Some tips and techniques to keep in mind as you work on resource caching 
strategy:

* **Use consistent URLs: **if you serve the same content on different URLs, then 
  that content will be fetched and stored multiple times - avoid this.
* **Ensure the server provides a validation token (ETag):** validation tokens 
  eliminate the need to transfer the same bytes when a resource has not changed 
  on the server.
* **Identify which resources can be cached by intermediaries:** resources that 
  are identical for all users are great candidates to be cached by a CDN and 
  other intermediaries. 
* **Determine the optimal cache lifetime for each resource: **different 
  resources may have different freshness requirements, audit and determine the 
  appropriate max-age for each one.
* **Determine the best cache hierarchy for your site: **combination of resource 
  URLs with content fingerprints, and short or no-cache lifetimes for HTML 
  documents allows you to control how quickly resource updates are picked up by 
  the client. 
* **Minimize resource churn:** some resources are updated more frequently than 
  others. If there is a particular part of resource (e.g. JavaScript function, 
  or set of CSS styles) that are being updated, consider delivering that code as 
  a separate file. Doing so allows the remainder of the content (e.g. library 
  code that does not change very often), to be fetched from cache and minimizes 
  the amount of downloaded content whenever an update is fetched.

- - -

# PageSpeed Rules and Recommendations

**TODO****: do we need this content?**

### Minify resources: HTML, CSS, JavaScript, and others.

Some resources, such as HTML, JavaScript, CSS, and even images may contain a lot 
of redundant information that is unnecessary to construct the page - e.g. 
comments in HTML, CSS, and JavaScript, or photo meta-data containing geo 
information or camera settings. 

By using a content specific minifier, this extra information can be eliminated 
prior to applying other compression (e.g. GZIP for text) techniques and yield 
significant additional savings.

### GZIP text-based resources

GZIP is optimized for compressing text-based resources and can decrease the size 
of the resource by up to 90% during transfer. Fewer bytes translates to faster 
downloads and smaller data charges for the visitor. 

Ensure that your server is configured 

Compress text resources with GZIP

### Optimize Images

JavaScript resources are 'parser-blocking' by default unless marked as 'async' 
or added via a special JavaScript snippet. Parser blocking JavaScript forces the 
browser to wait for the CSSOM and pauses construction of the DOM, which in turn 
can significantly delay the time to first render.

#### **Prefer async JavaScript resources**

Async resources unblock the document parser and allow the browser to avoid 
blocking on CSSOM prior to executing the script. Often, if the script can be 
made async, it also means it is not essential for the first render - consider 
deferring async scripts.

* minifycss
* minifyhtml
* minifyjavascript
* optimizeimages
    * servescaledimages
* specifyavaryacceptencodingheader

* avoidbadrequests
* leveragebrowsercaching
    * serveresourcesfromaconsistenturl
    * specifyacachevalidator

{% endwrap %}
