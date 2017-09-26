project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Hardware video support brings efficient decoding to plugins as well as HTML5 video. Flash users should switch from the old style Video to the StageVideo object.

{# wf_updated_on: 2015-05-06 #}
{# wf_published_on: 2015-05-06 #}
{# wf_tags: news,video,flash,shaka-player,eme,mse,hardware-decoding,codecs #}

# High performance video with hardware decoding {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}



With the Chromium 42 release, H.264 hardware video decoding support has been expanded to OS X. Now Chromium on Macs, Windows 7+ and essentially all Chromebooks support power efficient decoding of video by default. Chromium's HTML5 video implementation will automatically make the best decision on when to use this feature based on driver and hardware support.

The same hardware support is available to browser plugins as well. Pepper Flash for instance provides full access to video acceleration via the ActionScript StageVideo object. Switching from the old style Video to the StageVideo object should in most cases be simple to do. We would like to refer to Adobe's excellent [Best Practices for High Performing and Efficient Flash Video](http://blogs.adobe.com/flashplayer/2015/04/best-practices-for-high-performing-and-efficient-flash-video.html).

For best platform support and video performance, we strongly recommend moving from plugins to HTML5 video. Using plugins such as Flash may also adversely affect search ranking on mobile: see Google's [Webmaster FAQ](http://googlewebmastercentral.blogspot.co.uk/2015/04/faqs-april-21st-mobile-friendly.html). The video element is implemented by [over 90% of browsers](http://caniuse.com/#feat=video) on mobile and desktop; Adobe ended support for Flash in Android Jelly Bean. The [Web Fundamentals video section](/web/fundamentals/media/video) shows how to make the most of plugin-free, cross-platform media. For adaptive streaming on the web we recommend [Shaka Player](https://github.com/google/shaka-player), an easy-to-use media player that implements DASH using [MSE](https://simpl.info/mse), with optional native support for content protection via [EME](http://www.html5rocks.com/en/tutorials/eme/basics/){: .external }. Likewise [ExoPlayer](https://developer.android.com/guide/topics/media/exoplayer.html) for Android native apps.

More information about plugin deprecation timelines, and how to move to native APIs, is available from the [NPAPI deprecation developer guide](https://www.chromium.org/developers/npapi-deprecation).


{% include "comment-widget.html" %}
