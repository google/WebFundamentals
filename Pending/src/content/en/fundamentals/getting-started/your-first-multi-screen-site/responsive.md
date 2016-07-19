project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The web is accessible on a huge range of devices, from small-screen phones to big-screen televisions. Each device presents its own benefits and constraints. As a web developer, you are expected to support a full ranges of devices.

<p class="intro">
  The web is accessible on a huge range of devices from small-screen phones
  through to huge-screen televisions. Each device presents its own unique
  benefits and also constraints. As a web developer, you are expected to
  support all ranges of devices.
</p>



We are building a site that works across multiple screen sizes and device
types. In the [previous
article](/web/fundamentals/getting-started/your-first-multi-screen-site/content?hl=en), we crafted the
Information Architecture of the page and created a basic structure.
In this guide, we will take our basic structure with content and turn it into
a beautiful page that is responsive across a large number of screen sizes.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
    <img  src="images/content.png" alt="Content" style="max-width: 100%;">
    <figcaption><a href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Content and structure </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--4-col mdl-cell--6-col-desktop">
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption><a href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Final site </a> </figcaption>
  </figure>
</div>

Following the principles of Mobile First web development,
we start with a narrow viewport &mdash; similar to a mobile phone &mdash;
and build for that experience first.
Then we scale up to larger device classes.
We can do this by making our viewport wider and
making a judgment call on whether the design and layout look right.

Earlier we created a couple of different high-level designs for how our content
should be displayed. Now we need to make our page adapt to those different layouts.
We do this by making a decision on where to place our breakpoints &mdash; a point
where the layout and styles change &mdash; based on how the content fits the
screen-size.
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Always use a viewport.</li>
    
    <li>Always start with a narrow viewport first and scale out.</li>
    
    <li>Base your breakpoints off when you need to adapt the content.</li>
    
    <li>Create a high-level vision of your layout across major breakpoints.</li>
    
  </ul>
  
</div>



## Add a viewport

Even for a basic page, you **must** always include a viewport meta tag.
The viewport is the most critical component you need for building multi-device experiences.
Without it, your site will not work well on a mobile device.

The viewport indicates to the browser that the page needs to be scaled to fit
the screen.  There are many different configurations that you can specify for
your viewport to control the display of the page.  As a default, we recommend:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;viewport&quot;</span> <span class="na">content=</span><span class="s">&quot;width=device-width, initial-scale=1&quot;</span><span class="nt">&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/viewport.html">Try full sample</a>
      </p>
  </div>



The viewport lives in the head of the document and only needs to be declared once.


<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport"
            title="Responsive Web design">
            Responsive Web design
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport">
          
          Setting the viewport
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/fundamentals/size-content-to-the-viewport"
            title="Responsive Web design">
            Responsive Web design
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/fundamentals/size-content-to-the-viewport">
          
          Size content to the viewport
        </a>
      </li>
    
    </ul>

  </div>
</div>




## Apply simple styling

Our product and company already has a very specific branding and font guide-lines supplied
in a style guide.

### Style guide

A style guide is a useful way to get a high-level understanding of the visual representation
of the page and it helps you ensure that you are consistent throughout the design.

#### Colors

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Add stylistic images

In the previous guide, we added images called "content images".  These were
images that were important to the narrative of our product.  Stylistic images
are images that are not needed as part of the core content but add visual flare
or help guide the user's attention to a specific piece of content.

A good example of this is a headline image for the 'above the fold' content.  It
is often used to entice the user to read more about the product.

<div class="center">
  <img  src="images/narrowsite.png" alt="Designed site" />
</div>

They can be very simple to include. In our case, it will be the background to the
header and we will apply it via some simple CSS.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nf">#headline</span> <span class="p">{</span>
  <span class="k">padding</span><span class="o">:</span> <span class="m">0.8em</span><span class="p">;</span>
  <span class="k">color</span><span class="o">:</span> <span class="nb">white</span><span class="p">;</span>
  <span class="k">font-family</span><span class="o">:</span> <span class="n">Roboto</span><span class="o">,</span> <span class="k">sans-serif</span><span class="p">;</span>
  <span class="k">background-image</span><span class="o">:</span> <span class="sx">url(backgroundimage.jpg)</span><span class="p">;</span>
  <span class="k">background</span><span class="o">-</span><span class="k">size</span><span class="o">:</span> <span class="n">cover</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

We have chosen a simple background image that is blurred so it doesn't take away
from the content and we have set it to `cover` the entire element; that way it
always stretches whilst maintaining the correct aspect ratio.

<br style="clear: both;">

## Set your first breakpoint

The design starts to look bad at about 600px wide.  In our case, the length of
the line is going above 10 words (the optimal reading length) and that is
where we want to change it.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Sorry your browser doesn't support video.
     <a href="videos/firstbreakpoint.mov">Download the video</a>.
  </p>
</video>

600px appears to be a good place to create our first breakpoint as it will give us scope
to reposition elements to make them fit the screen better.  We can do this
using a technology called [Media Queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries).

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@media</span> <span class="o">(</span><span class="nt">min-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>

<span class="p">}</span></code></pre></div>

There is more space on a larger screen so there is more flexibility with how
content can be displayed.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>You don't have to move all the elements at once, you can make smaller adjustments if needed.</li>
    
  </ul>
  
</div>



In the context of our product page, it looks like we will
need to:

*  Constrain the maximum width of the design.
*  Alter the padding of elements and reduce the text size.
*  Move the form to float in-line with the heading content.
*  Make the video float around the content.
*  Reduce the size of the images and have them appear in a nicer grid.


<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries"
            title="Responsive Web design">
            Responsive Web design
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries">
          
          Using Media Queries
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/patterns/"
            title="Layout Patterns">
            Layout Patterns
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/patterns/">
          
          Layout patterns
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/responsive/patterns/mostly-fluid"
            title="Responsive Web design">
            Responsive Web design
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/responsive/patterns/mostly-fluid">
          
          Mostly Fluid layout
        </a>
      </li>
    
    </ul>

  </div>
</div>




## Constrain the maximum width of the design

We have chosen to have only two major layouts: a narrow viewport and a wide
viewport, which greatly simplifies our build process.

We have also decided to create full-bleed sections on the narrow viewport that
stay full-bleed on the wide viewport.  This means we should constrain the
maximum width of the screen so that the text and paragraphs don't extend into one
long, single line on ultra-wide screens.  We have chosen this point to be
about 800px.

To achieve this, we need to constrain the width and center the elements.  We
need  to create a container around each major section and apply a `margin:
auto`.  This will allow the screen to grow but the content remain centered
and at a maximum size of 800px.

The container will be a simple `div` in the following form:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;container&quot;</span><span class="nt">&gt;</span>...<span class="nt">&lt;/div&gt;</span></code></pre></div>


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section1&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;container&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;h2&gt;</span>What will I learn?<span class="nt">&lt;/h2&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html">Try full sample</a>
      </p>
  </div>




  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nc">.container</span> <span class="p">{</span>
  <span class="k">margin</span><span class="o">:</span> <span class="k">auto</span><span class="p">;</span>
  <span class="k">max-width</span><span class="o">:</span> <span class="m">800px</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html">Try full sample</a>
      </p>
  </div>



## Alter the padding and reduce text size

On the narrow viewport, we don't have a lot of space to display content so
the size and weight of the typography is often drastically reduced to fit the
screen.

With a larger viewport, we need to consider that the user is more likely to be
on a larger screen but further away.  To increase the readability of the
content, we can increase the size and weight of the typography and we can also
alter the padding to make distinct areas stand out more.

In our product page, we will increase the padding of the section elements by
setting it to remain at 5% of the width.  We will also increase the size of
the headers for each of the sections.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nf">#headline</span> <span class="p">{</span>
  <span class="k">padding</span><span class="o">:</span> <span class="m">20px</span> <span class="m">5%</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html">Try full sample</a>
      </p>
  </div>



## Adapt elements to wide viewport

Our narrow viewport was a stacked linear display.  Each major section and the content
inside them was displayed in order from top to bottom.

A wide viewport gives us extra space to use to display the content in an optimal way
for that screen.  For our product page, this means that according to our IA we can:

*  Move the form around the header information.
*  Position the video to the right of the key points.
*  Tile the images.
*  Expand the table.

### Float the Form element

The narrow viewport means that we have a lot less horizontal space available for
us to comfortably position elements on the screen.

To make more effective use of the horizontal screen space, we need to break out
of the linear flow of the header and move the form and list to be next
to each other.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nf">#headline</span> <span class="nf">#blurb</span> <span class="p">{</span>
  <span class="k">float</span><span class="o">:</span> <span class="k">left</span><span class="p">;</span>
  <span class="k">font-weight</span><span class="o">:</span> <span class="m">200</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
  <span class="k">font-size</span><span class="o">:</span> <span class="m">18px</span><span class="p">;</span>
  <span class="n">box</span><span class="o">-</span><span class="n">sizing</span><span class="o">:</span> <span class="k">border</span><span class="o">-</span><span class="n">box</span><span class="p">;</span>
  <span class="k">padding-right</span><span class="o">:</span> <span class="m">10px</span><span class="p">;</span>
<span class="p">}</span>

<span class="nf">#headline</span> <span class="nf">#register</span> <span class="p">{</span>
  <span class="k">float</span><span class="o">:</span><span class="k">right</span><span class="p">;</span>
  <span class="k">padding</span><span class="o">:</span> <span class="m">20px</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
  <span class="n">box</span><span class="o">-</span><span class="n">sizing</span><span class="o">:</span> <span class="k">border</span><span class="o">-</span><span class="n">box</span><span class="p">;</span>
  <span class="k">font-weight</span><span class="o">:</span> <span class="m">300</span><span class="p">;</span>
<span class="p">}</span>

<span class="nf">#headline</span> <span class="nt">br</span> <span class="p">{</span>
  <span class="k">clear</span><span class="o">:</span> <span class="k">both</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html">Try full sample</a>
      </p>
  </div>



<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Sorry your browser doesn't support video.
     <a href="videos/floatingform.mov">Download the video</a>.
  </p>
</video>

### Float the Video element

The video in the narrow viewport interface is designed  to be the full width of
the screen and positioned after the list of key features. On a wide viewport,
the video will scale up to be too large and look incorrect when placed next
to our list of features.

The video element needs to be moved out of the vertical flow of the narrow
viewport and should be displayed side-by-side with the bulleted list of content on a wide viewport.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nf">#section1</span> <span class="nt">ul</span> <span class="p">{</span>
  <span class="n">box</span><span class="o">-</span><span class="n">sizing</span><span class="o">:</span> <span class="k">border</span><span class="o">-</span><span class="n">box</span><span class="p">;</span>
  <span class="k">float</span><span class="o">:</span> <span class="k">left</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
  <span class="k">padding-right</span><span class="o">:</span> <span class="m">1em</span><span class="p">;</span>
<span class="p">}</span>

<span class="nf">#section1</span> <span class="nt">video</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
  <span class="k">float</span><span class="o">:</span> <span class="k">right</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html">Try full sample</a>
      </p>
  </div>



### Tile the Images

The images in the narrow viewport (mobile devices mostly) interface are set to
be  the full width of the screen and stacked vertically.  This doesn't scale
well on a wide viewport.

To make the images look correct on a wide viewport, they are scaled to 30%
of the container width and laid out horizontally (rather than vertically in
the narrow view). We will also add some border radius and box-shadow to make
the images look more appealing.

<img src="images/imageswide.png" style="width:100%">


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nf">#section2</span> <span class="nt">div</span> <span class="nt">img</span> <span class="p">{</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">30%</span><span class="p">;</span>
  <span class="k">margin</span><span class="o">:</span> <span class="m">1%</span><span class="p">;</span>
  <span class="n">box</span><span class="o">-</span><span class="n">sizing</span><span class="o">:</span> <span class="k">border</span><span class="o">-</span><span class="n">box</span><span class="p">;</span>
  <span class="k">border</span><span class="o">-</span><span class="n">radius</span><span class="o">:</span> <span class="m">50%</span> <span class="m">50%</span><span class="p">;</span>
  <span class="n">box</span><span class="o">-</span><span class="n">shadow</span><span class="o">:</span> <span class="nb">black</span> <span class="m">0px</span> <span class="m">0px</span> <span class="m">5px</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html">Try full sample</a>
      </p>
  </div>



### Make images responsive to DPI

When using images,
take the size of the viewport and the density of the display into consideration.

The web was built for 96dpi screens.  With the introduction of mobile devices,
we have seen a huge increase in the pixel density of screens not to mention
Retina class displays on laptops.  As such, images that are encoded to 96dpi
often look terrible on a hi-dpi device.

We have a solution that is not widely adopted yet.
For browsers that support it, you can display a high density image on a high density display.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;photo.png&quot;</span> <span class="na">srcset=</span><span class="s">&quot;photo@2x.png 2x&quot;</span><span class="nt">&gt;</span></code></pre></div>


<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/images"
            title="Images">
            Images
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices">
          
          Enhance imgs with srcset for high DPI devices
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/images"
            title="Images">
            Images
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction">
          
          Use media queries to provide high res images or art direction
        </a>
      </li>
    
    </ul>

  </div>
</div>




### Tables

Tables are very hard to get right on devices that have a narrow viewport and need
special consideration.

We recommend on a narrow viewport that you transform your table by changing
each row into a block of key-value pairs (where the key is what was
previously the column header, and the value is still the cell value).
Fortunately, this isn't too difficult. First, annotate each `td` element with
the corresponding heading as a data attribute. (This won't have any visible
effect until we add some more CSS.)


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;tbody&gt;</span>
 <span class="nt">&lt;tr&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Country&quot;</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-IN-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>India<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Desktop share&quot;</span><span class="nt">&gt;</span>32%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Table share&quot;</span><span class="nt">&gt;</span>1%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Mobile share&quot;</span><span class="nt">&gt;</span>67%<span class="nt">&lt;/td&gt;</span>
  <span class="nt">&lt;/tr&gt;</span>
  <span class="nt">&lt;tr&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Country&quot;</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-GB-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>GB<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Desktop share&quot;</span><span class="nt">&gt;</span>69%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Table share&quot;</span><span class="nt">&gt;</span>13%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Mobile share&quot;</span><span class="nt">&gt;</span>18%<span class="nt">&lt;/td&gt;</span>
  <span class="nt">&lt;/tr&gt;</span>
  <span class="nt">&lt;tr&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Country&quot;</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-US-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>US<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Desktop share&quot;</span><span class="nt">&gt;</span>69%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Table share&quot;</span><span class="nt">&gt;</span>9%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Mobile share&quot;</span><span class="nt">&gt;</span>22%<span class="nt">&lt;/td&gt;</span>
  <span class="nt">&lt;/tr&gt;</span>
  <span class="nt">&lt;tr&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Country&quot;</span><span class="nt">&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-CN-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>China<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Desktop share&quot;</span><span class="nt">&gt;</span>86%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Table share&quot;</span><span class="nt">&gt;</span>4%<span class="nt">&lt;/td&gt;</span>
    <span class="nt">&lt;td</span> <span class="na">data-th=</span><span class="s">&quot;Mobile share&quot;</span><span class="nt">&gt;</span>10%<span class="nt">&lt;/td&gt;</span>
  <span class="nt">&lt;/tr&gt;</span>
<span class="nt">&lt;/tbody&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html">Try full sample</a>
      </p>
  </div>



Now we just need to add the CSS to hide the original `thead` and instead show
the `data-th` labels using a `:before` pseudoelement. This will result in
the multi-device experience seen in the following video.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Sorry your browser doesn't support video.
     <a href="videos/responsivetable.mov">Download the video</a>.
  </p>
</video>

In our site,
we had to create an extra breakpoint just for the table content.
When you build for a mobile device first, it is harder to undo applied styles,
so we must section off the narrow viewport table CSS from the wide viewport css.
This gives us a clear and consistent break.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="k">@media</span> <span class="nt">screen</span> <span class="nt">and</span> <span class="o">(</span><span class="nt">max-width</span><span class="o">:</span> <span class="nt">600px</span><span class="o">)</span> <span class="p">{</span>
  <span class="nt">table</span> <span class="nt">thead</span> <span class="p">{</span>
    <span class="k">display</span><span class="o">:</span> <span class="k">none</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nt">table</span> <span class="nt">td</span> <span class="p">{</span>
    <span class="k">display</span><span class="o">:</span> <span class="k">block</span><span class="p">;</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">relative</span><span class="p">;</span>
    <span class="k">padding-left</span><span class="o">:</span> <span class="m">50%</span><span class="p">;</span>
    <span class="k">padding-top</span><span class="o">:</span> <span class="m">13px</span><span class="p">;</span>
    <span class="k">padding-bottom</span><span class="o">:</span> <span class="m">13px</span><span class="p">;</span>
    <span class="k">text-align</span><span class="o">:</span> <span class="k">left</span><span class="p">;</span>
    <span class="k">background</span><span class="o">:</span> <span class="m">#e9e9e9</span><span class="p">;</span>
  <span class="p">}</span>

  <span class="nt">table</span> <span class="nt">td</span><span class="nd">:before</span> <span class="p">{</span>
    <span class="k">content</span><span class="o">:</span> <span class="n">attr</span><span class="p">(</span><span class="n">data</span><span class="o">-</span><span class="n">th</span><span class="p">)</span> <span class="s2">&quot; :&quot;</span><span class="p">;</span>
    <span class="k">display</span><span class="o">:</span> <span class="k">inline</span><span class="o">-</span><span class="k">block</span><span class="p">;</span>
    <span class="k">color</span><span class="o">:</span> <span class="m">#000000</span><span class="p">;</span>
    <span class="k">background</span><span class="o">:</span> <span class="m">#e9e9e9</span><span class="p">;</span>
    <span class="k">border-right</span><span class="o">:</span> <span class="m">2px</span> <span class="k">solid</span> <span class="k">transparent</span><span class="p">;</span>
    <span class="k">position</span><span class="o">:</span> <span class="k">absolute</span><span class="p">;</span>
    <span class="k">top</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">left</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">bottom</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
    <span class="k">width</span><span class="o">:</span> <span class="m">33%</span><span class="p">;</span>
    <span class="k">max-height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>

    <span class="k">font-size</span><span class="o">:</span> <span class="m">16px</span><span class="p">;</span>
    <span class="k">font-weight</span><span class="o">:</span> <span class="m">300</span><span class="p">;</span>
    <span class="k">padding-left</span><span class="o">:</span> <span class="m">13px</span><span class="p">;</span>
    <span class="k">padding-top</span><span class="o">:</span> <span class="m">13px</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">Try full sample</a>
      </p>
  </div>



## Wrapping up

**CONGRATULATIONS.** By the time you read this, you will have created your
first simple product landing page that works across a large range of devices,
form-factors, and screen sizes.

If you follow these guidelines, you will be off to a good start:

1.  Create a basic IA and understand your content before you code.
2.  Always set a viewport.
3.  Create your base experience around mobile-first approach.
4.  Once you have your mobile experience, increase the width of the display
   until it doesn't look right and set your breakpoint there.
5.  Keep iterating.

