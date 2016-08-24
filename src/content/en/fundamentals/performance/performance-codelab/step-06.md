project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Fix forced synchronous layout.

<p class="intro">
  So far, you have certainly improved not only the overall performance of the 
  app, but you've addressed some specific performance issues, such as list 
  scrolling. Running the improved app, however, you can see there is still 
  some jank in the other major user interaction, story slide-in/out.
</p>

Let's examine this process. In the Timeline, turn on the JavaScript profiler, 
and take a Timeline recording while you click a story's headline to slide it 
in and then click the story's `X` button to slide it out. As you saw in 
[Exercise 3](step-03), the `onStoryClick` function is (still) causing a 
forced synchronous layout.

<figure>
  <img src="images/image09.png" alt="Forced synchronous layout still occurring in Timeline recording">
</figure>

In that exercise, we put the `animate` function calls into a 
`requestAnimationFrame` which certainly helped but didn't eliminate the 
problem entirely.

Recall from our earlier discussion (and from your research at 
[CSS Triggers](http://csstriggers.com/)) that using specific properties 
cause specific parts of the rendering pipeline to occur. Let's take another 
look at `animate`.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">animate</span> <span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Find out where it currently is.</span>
  <span class="kd">var</span> <span class="nx">storyDetailsPosition</span> <span class="o">=</span> <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">();</span>
  <span class="c1">// Set the left value if we don&#39;t have one already.</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">left</span> <span class="o">===</span> <span class="kc">null</span><span class="p">)</span>
        <span class="nx">left</span> <span class="o">=</span> <span class="nx">storyDetailsPosition</span><span class="p">.</span><span class="nx">left</span><span class="p">;</span>
  <span class="c1">// Now figure out where it needs to go.</span>
  <span class="nx">left</span> <span class="o">+=</span> <span class="p">(</span><span class="mi">0</span> <span class="o">-</span> <span class="nx">storyDetailsPosition</span><span class="p">.</span><span class="nx">left</span><span class="p">)</span> <span class="o">*</span> <span class="mf">0.1</span><span class="p">;</span>
  <span class="c1">// Set up the next bit of the animation if there is more to do.</span>
  <span class="k">if</span> <span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">abs</span><span class="p">(</span><span class="nx">left</span><span class="p">)</span> <span class="o">&gt;</span> <span class="mf">0.5</span><span class="p">)</span>
        <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">animate</span><span class="p">);</span>
  <span class="k">else</span>
        <span class="nx">left</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
  <span class="c1">// And update the styles. Wait, is this a read-write cycle?</span>
  <span class="c1">// I hope I don&#39;t trigger a forced synchronous layout!</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">left</span> <span class="o">=</span> <span class="nx">left</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

Near the end of the function, the `left` property is set; this causes the 
browser to run layout. Shortly thereafter, the `style` property is set; this 
causes the browser to run recalculate styles. As you know, if this happens 
more than once in a frame, it will cause a forced synchronous layout -- and 
it's happening multiple times in this function.

The `animate` function is contained inside the `showStory` function and its 
sister function, `hideStory`, both of which update the same properties and 
cause a forced synchronous layout problem.

As we learned earlier in this codelab, sometimes the best code fix is 
code removal. Yes, the `showStory` and `hideStory` functions do their 
jobs, but they are just too complex for what should be a simple effect. 
So let's leave them for a moment and see if we can get the job done with 
CSS instead. Consider this CSS code.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="nc">.story-details</span> <span class="p">{</span>
  <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">webkit</span><span class="o">-</span><span class="n">flex</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="o">-</span><span class="n">ms</span><span class="o">-</span><span class="n">flexbox</span><span class="p">;</span>
  <span class="k">display</span><span class="o">:</span> <span class="n">flex</span><span class="p">;</span>
  <span class="k">position</span><span class="o">:</span> <span class="k">fixed</span><span class="p">;</span>
  <span class="k">top</span><span class="o">:</span> <span class="m">0</span><span class="p">;</span>
  <span class="k">left</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">width</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">height</span><span class="o">:</span> <span class="m">100%</span><span class="p">;</span>
  <span class="k">background</span><span class="o">:</span> <span class="nb">white</span><span class="p">;</span>
  <span class="k">z-index</span><span class="o">:</span> <span class="m">2</span><span class="p">;</span>
  <span class="n">box</span><span class="o">-</span><span class="n">shadow</span><span class="o">:</span> <span class="m">0px</span> <span class="m">2px</span> <span class="m">7px</span> <span class="m">0px</span> <span class="n">rgba</span><span class="p">(</span><span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="o">,</span> <span class="m">0</span><span class="o">.</span><span class="m">10</span><span class="p">);</span>
  <span class="k">overflow</span><span class="o">:</span> <span class="k">hidden</span><span class="p">;</span>
  <span class="n">transition</span><span class="o">:</span> <span class="n">transform</span> <span class="m">0.3s</span><span class="p">;</span>
  <span class="n">will</span><span class="o">-</span><span class="n">change</span><span class="o">:</span> <span class="n">transform</span><span class="p">;</span>
<span class="p">}</span>

<span class="nc">.story-details.visible</span> <span class="p">{</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">-100</span><span class="n">vw</span><span class="p">);</span>
<span class="p">}</span>

<span class="nc">.story-details.hidden</span> <span class="p">{</span>
  <span class="n">transform</span><span class="o">:</span> <span class="n">translateX</span><span class="p">(</span><span class="m">0</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

The first thing to notice in the `.story-details` class is that we set the 
`left` property to 100%; regardless of the screen width, this pushes the 
entire story element to the right, completely off the visible page, effectively 
hiding it.

Next, in the `.story-details.visible` and `.story-details.hidden` classes, 
we set up a `transform` in each one to force the X (horizontal) position to 
`-100vw` (*viewport width*) and 0, respectively. Upon application, these 
classes will relocate the story content into view or back to its original 
off-screen position.

Then, to make sure that the story's appearance actually looks like an 
animation and doesn't just abruptly snap in and out, we set up a `transition` 
on the `transform` to allow it 0.3s (33ms) to take place. This ensures a 
smooth slide-in/out visual effect.

Finally, we use the `will-change` property to notify the browser about the 
likely `transform` changes.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






Returning to the `showStory` and `hideStory` functions, we can now greatly 
simplify them to just add or remove the new `visible` and `hidden classes, 
accomplishing the desired visual change without complex scripting.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">showStory</span><span class="p">(</span><span class="nx">id</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">storyDetails</span><span class="p">)</span>
    <span class="k">return</span><span class="p">;</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;visible&#39;</span><span class="p">);</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">remove</span><span class="p">(</span><span class="s1">&#39;hidden&#39;</span><span class="p">);</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">hideStory</span><span class="p">(</span><span class="nx">id</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;hidden&#39;</span><span class="p">);</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">remove</span><span class="p">(</span><span class="s1">&#39;visible&#39;</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

All of this should have significant positive benefits on our app's story 
slide-in/out performance, but of course the only way to know for sure is to 
test it. Take another Timeline recording of sliding a story in and out, and 
have a look.

<figure>
  <img src="images/image06.png" alt="Timeline recording looks good">
</figure>

The app should perform much better; all the frames are now well below the 
60fps line, and the forced synchronous layout warnings are gone. Best of all, 
we no longer need to use JavaScript to perform the slide-in/out animation.

Our basic performance improvement work is done.

