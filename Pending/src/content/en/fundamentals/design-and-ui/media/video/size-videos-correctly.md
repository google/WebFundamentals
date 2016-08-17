project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: When it comes to keeping your users happy, size matters.

{# wf_review_required #}
{# wf_updated_on: 2014-09-18 #}
{# wf_published_on: 2014-04-15 #}

# Size videos correctly {: .page-title }

{% include "_shared/contributors/samdutton.html" %}

When it comes to keeping your users happy, file size is important.


## TL;DR
- Don't serve videos with a larger frame size or higher quality than the platform can handle.
- Don't make your videos any longer than they need be.
- Long videos can cause hiccups with download and seeking; some browsers may have to wait until the video downloads before beginning playback.


## Check video size

The actual video frame size as encoded may be different from the video
element dimensions (just as an image may not be displayed using its actual
dimensions).

To check the encoded size of a video, use the video element `videoWidth`
and `videoHeight` properties. `width` and `height` return the dimensions of
the video element, which may have been sized using CSS or inline width and
height attributes.

## Ensure videos don't overflow containers

When video elements are too big for the viewport, they may overflow their
container, making it impossible for the user to see the content or use
the controls.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--4-col"> 
    <img alt="Android Chrome screenshot, portrait: unstyled video element overflows viewport" src="images/Chrome-Android-portrait-video-unstyled.png">
    <figcaption>Android Chrome screenshot, portrait: unstyled video element overflows viewport</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--8-col">
    <img alt="Android Chrome screenshot, landscape: unstyled video element overflows viewport" src="images/Chrome-Android-landscape-video-unstyled.png">
    <figcaption>Android Chrome screenshot, landscape: unstyled video element overflows viewport</figcaption>
  </figure>
</div>

You can control video dimensions using JavaScript or CSS. JavaScript libraries
and plugins such as [FitVids](//fitvidsjs.com/) make it possible to maintain
appropriate size and aspect ratio, even for Flash videos from YouTube and
other sources.

Use [CSS media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) to specify the size of elements depending on the viewport dimensions; `max-width: 100%` is your friend.

{% include shared/related_guides.liquid inline=true list=page.related-guides.media %}

For media content in iframes (such as YouTube videos), try a responsive
approach (like the one [proposed by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).

<!-- TODO: Verify note type! -->
Note: Don't force element sizing that results in an aspect ratio different from the original video. Squashed or stretched looks bad.

**CSS:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="styling" lang=css %}
</pre>

**HTML:**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/media/video/_code/responsive_embed.html" region_tag="markup" lang=html %}
</pre>

Compare the <a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/media/video/responsive_embed.html">responsive sample</a> to the <a href="https://googlesamples.github.io/web-fundamentals/samples/fundamentals/design-and-ui/media/video/unyt.html">unresponsive version</a>.



