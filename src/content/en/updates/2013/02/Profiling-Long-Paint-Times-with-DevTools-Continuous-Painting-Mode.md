project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2013-02-18 #}
{# wf_published_on: 2013-02-18 #}
{# wf_tags: news,performance,devtools #}

# Profiling Long Paint Times with DevTools' Continuous Painting Mode {: .page-title }

{% include "web/_shared/contributors/paulirish.html" %}



<p><strong>Continuous painting mode</strong> for paint profiling is now available in<a href="https://www.google.com/intl/en/chrome/browser/canary.html">
</a><a href="https://www.google.com/intl/en/chrome/browser/canary.html">Chrome
Canary</a>. This
article explains how you identify a problem in page painting time and how you
can use this new tool to detect bottlenecks in painting performance.
</p>
<h3>Investigating painting time on your page</h3>
<p>So you noticed that your page doesn't scroll smoothly. This is how you would
start tackling the problem. For our example, we'll use the demo page <a href="http://css3exp.com/moon/">Things We Left On The Moon</a> by <a href="http://simplebits.com/">Dan Cederholm</a> as our example.
</p>
<p>You open the Web Inspector, start a Timeline recording and scroll your page up
and down. Then you look at the vertical timelines, that show you what happened
in each frame.<br>
</p>
<img width="900" src="/web/updates/images/2013/02/profiling-paints/iM0oKjk.png">
<p>If you see that most time is spent painting (big green bars above 60fps), you
need to take a closer look at why this is happening. To investigate your paints,
use the <strong>Show paint rectangles</strong> setting of the Web Inspector (cog icon in the
bottom right corner of the Web Inspector). This will show you the regions where
Chrome paints.
</p>
<img width="900" src="/web/updates/images/2013/02/profiling-paints/5fa1nMd.png">
<p>There are different reasons for Chrome to repaint areas of the page:
</p>
<ul>
<li>
DOM nodes get changed in JavaScript, which causes Chrome to recalculate the
layout of the page.
</li>
<li>
Animations are playing that get updated in a frame-based cycle.
</li>
<li>
User interaction, like hovering, causes style changes on certain elements.
</li>
<li>
Any other operation that causes the page layout to change.
</li>
</ul>
<p>As a developer you need to be aware of the repaints happening on your page.
Looking at the paint rectangles is a great way of doing that. In the example
screenshot above you can see that the whole screen is covered in a big paint
rectangle. This means the whole screen is repainted as you scroll, which is not
good. In this specific case this is caused by the CSS style
<code>background-attachment:fixed</code> which causes the background image of the page to
stay at the same position while the content of the page moves on top of it as
you scroll.
</p>
<p>If you identify that the repaints cover a big area and/or take a long time, you
have two options:
</p>
<ol>
<li><p>You can try to change the page layout to reduce the amount of painting. If
possible Chrome paints the visible page only once and adds parts that have
not been visible as you scroll down. However, there are cases when Chrome
needs to repaint certain areas. For example the CSS rule <code>position:fixed</code>,
which is often used for navigation elements that stay in the same position,
can cause these repaints.
</p>
</li>
<li><p>If you want to keep your page layout, you can try to reduce the painting cost
of the areas that get repainted. Not every CSS style has the same painting
cost, some have little impact, others a lot. Figuring out the painting costs
of certain styles can be a lot of work. You can do this by toggling styles in
the Elements panel and looking at the difference in the Timeline recording,
which means switching between panels and doing lots of recordings. This is
where <strong>continuous painting mode</strong> comes into play.
</p>
</li>
</ol>
<h2>Continuous painting mode</h2>
<p><strong>Continuous painting mode</strong> is a tool that helps you identify which elements
are costly on the page. It puts the page into an always repainting state,
showing a counter of how much painting work is happening. Then, you can hide
elements and mutate styles, watching the counter, in order to figure out what is
slow.
</p>
<h3>Setup</h3>
<p>In order to use <strong>continuous painting mode</strong> you need to use <a href="https://www.google.com/intl/en/chrome/browser/canary.html">Chrome
Canary</a>.
</p>
<p>On <strong>Linux</strong> systems (and some Macs) you need to make sure that Chrome runs in
compositing mode. This can be permanently enabled using the <strong>GPU compositing on
all pages</strong> setting in <code>about:flags</code>.
</p>
<h3>How To Begin</h3>
<p><strong>Continuous painting mode</strong> can be enabled via the checkbox <strong>Enable continuous
page repainting</strong> in the Web Inspector's settings (cog icon in the bottom right
corner of the Web Inspector).
</p>
<img width="900" src="/web/updates/images/2013/02/profiling-paints/UYXJODj.png">
<p>The small display in the top right corner shows you the measured paint times in
milliseconds. More specifically it shows:
</p>
<ul>
<li>
The last measured paint time on the left.
</li>
<li>
The minimum and maximum of the current graph on the right.
</li>
<li>
A bar chart displaying the history of the last 80 frames on the bottom (the
line in the chart indicates 16ms as a reference point).
</li>
</ul>
<p>The paint time measurements are dependent on screen resolution, window size and
the hardware Chrome is running on. Be aware that these things are likely to be
different for your users.
</p>
<h3>Workflow</h3>
<p>This is how you can use <strong>continuous painting mode</strong> to track down elements and
styles that add a lot of painting cost:
</p>
<ol>
<li>
Open the Web Inspector's settings and check <strong>Enable continuous page
repainting</strong>.
</li>
<li>
Go to the Elements panel and traverse the DOM tree with the arrow keys or by
picking elements on the page.
</li>
<li>
Use the <strong>H keyboard shortcut</strong>, a newly introduced helper, to toggle visibility on an
element.
</li>
<li>
Look at the paint time graph and try to spot an element that adds a lot of
painting time.
</li>
<li>
Go through the CSS styles of that element, toggling them on and off while
looking at the graph, to find the style that causes the slow down.
</li>
<li>
Change this style and do another Timeline recording to check if this made
your page perform better.
</li>
</ol>
<p>The animation below shows toggling styles and its affect on paint time:
</p>
<p><img alt="continuouspaint screencast" src="/web/updates/images/2013/02/profiling-paints/cssmoon-continuouspaint.gif" >
</p>
<p>This example demonstrates how turning either one of the CSS styles <code>box-shadow</code>
or <code>border-radius</code> off, reduces the painting time by a big amount. Using both <code>box-shadow</code> and<code>border-radius</code> on an element leads to very expensive painting
operations, because Chrome can't optimize for this. So if you have an element
that gets a lot of repaints, like in the example, you should avoid this
combination.
</p>
<h3>Notes</h3>
<p><strong>Continuous painting mode</strong> repaints the whole visible page. This is usually
not the case when browsing a web page. Scrolling usually only paints the parts
that haven't been visible before. And for other changes on the page, only the
smallest possible area is repainted. So check with another Timeline recording if
your style improvements actually had an impact on the paint times of your page.
</p>
<p>When using <strong>continuous painting mode</strong> you might discover that e.g. the CSS
styles <code>border-radius</code> and <code>box-shadow</code> add a lot of painting time. It is not
discouraged to use those features in general, they are awesome and we are happy
they are finally here. But it's important to know when and where to use them.
Avoid using them in areas with lots of repaints and avoid overusing them in
general.
</p>
<p>Learn more about painting and related topics on <a href="http://jankfree.com">jankfree.com</a>
</p>



<aside class="bio clearfix" style="border: 3px double #CCC; padding: 10px;">
Eberhard Gräther is student of <a href="http://multimediatechnology.at/in-english/">MultiMediaTechnology</a> at <a href="http://www.fh-salzburg.ac.at/en/">Salzburg University of Applied Sciences</a>. He interned in the Chrome GPU team from 10/2012 to 03/2013 where he worked on rendering profiling tools. Follow him at  <a href="https://twitter.com/egraether">@egraether</a> or visit <a href="http://egraether.com">his site</a> to find graphics demos and web games he has built.
</aside>

### Live Demo

<p>
Click below for a demo where Paul Irish uses continuous painting to identify a uniquely expensive paint operation.</p>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="FY5iiuQRyEE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


{% include "comment-widget.html" %}
