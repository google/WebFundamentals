project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: When it comes to keeping your users happy, size matters.

<p class="intro">
  When it comes to keeping your users happy, file size is important.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






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


<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/"
            title="Responsive Web Design Basics">
            Responsive Web Design Basics
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries">
          
          Use CSS media queries for responsiveness
        </a>
      </li>
    
    </ul>

  </div>
</div>




For media content in iframes (such as YouTube videos), try a responsive
approach (like the one [proposed by John Surdakowski](//avexdesigns.com/responsive-youtube-embed/)).





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






**CSS:**


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.video-container</span> <span class="p">{</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">relative</span><span class="p">;</span>
    <span class="k">padding-bottom</span><span class="o">:</span> <span class="m">56.25%</span><span class="p">;</span>
    <span class="k">padding-top</span><span class="o">:</span> <span class="m">30px</span><span class="p">;</span>
    <span class="k">height</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">overflow</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.video-container</span> <span class="nt">iframe</span><span class="o">,</span>
<span class="nc">.video-container</span> <span class="nt">object</span><span class="o">,</span>
<span class="nc">.video-container</span> <span class="nt">embed</span> <span class="p">{</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
    <span class="k">top</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">left</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
    <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/video/responsive_embed.html">Try full sample</a>
      </p>
  </div>



**HTML:**


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;video-container&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;iframe</span> <span class="na">src=</span><span class="s">&quot;//www.youtube.com/embed/l-BA9Ee2XuM&quot;</span>
          <span class="na">frameborder=</span><span class="s">&quot;0&quot;</span> <span class="na">width=</span><span class="s">&quot;560&quot;</span> <span class="na">height=</span><span class="s">&quot;315&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;/iframe&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/video/responsive_embed.html">Try full sample</a>
      </p>
  </div>



Compare the <a href="/web/resources/samples/fundamentals/design-and-ui/media/video/responsive_embed.html">responsive sample</a> to the <a href="/web/resources/samples/fundamentals/design-and-ui/media/video/unyt.html">unresponsive version</a>.




