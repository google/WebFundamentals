


<p class="intro">
  When it comes to keeping your users happy, file size is important.
</p>



{% include shared/takeaway.liquid list=page.key-takeaways.size-matters %}

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

{% include shared/remember.liquid title="Remember" list=page.notes.dont-overflow %}

**CSS:**

{% include_code src=_code/responsive_embed.html snippet=styling lang=css %}

**HTML:**

{% include_code src=_code/responsive_embed.html snippet=markup lang=html %}

Compare the {% link_sample _code/responsive_embed.html %}responsive sample{% endlink_sample %} to the {% link_sample _code/unyt.html %}unresponsive version{% endlink_sample %}.






