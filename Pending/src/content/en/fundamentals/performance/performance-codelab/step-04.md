project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Fix slide-in/out animation

<p class="intro">
  Another problem area for our news aggregator app is the basic action of 
  sliding stories in and out. Apart from scrolling, this is the app's most 
  common user interaction feature. Be sure to view the <a href="http://udacity.github.io/news-aggregator/">live site</a> on a mobile device, but it is problematic on all platforms.
</p>

As usual, begin by taking a Timeline recording of a story sliding in and out, 
and examining the frame rate. The slide-in/out may actually range from a bit 
janky to basically unusable on various devices.

<figure>
  <img src="images/image05.png" alt="Forced synchronous layout on Recalculate Style">
</figure>



As you can see, the slide-in/out animation is firing a timer and, as you can 
tell from the red triangle ![TODO](images/image04.png) on the Recalculate 
Style event, there's a forced synchronous layout occurring. The details 
point to line 180 in the `app.js` file, which is a function called `animate`. 
Let's examine that function.

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
        <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">animate</span><span class="p">,</span> <span class="mi">4</span><span class="p">);</span>
  <span class="k">else</span>
        <span class="nx">left</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
  <span class="c1">// And update the styles. Wait, is this a read-write cycle?</span>
  <span class="c1">// I hope I don&#39;t trigger a forced synchronous layout!</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">left</span> <span class="o">=</span> <span class="nx">left</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

One of the first things you'll notice is the `setTimeout` that sets up the 
next call to `animate`. As you learned in the previous exercise, visible work 
that is done to the page should typically go inside a `requestAnimationFrame` 
call. But that `setTimeout` in particular is a problem.


















<div class="wf-highlight-list wf-highlight-list--note" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>A great deal of older code on the web uses <code>setTimeout</code> or <code>setInterval</code> for animations. That's because these functions existed before <code>requestAnimationFrame</code>. As we noted earlier, the JavaScript engine pays no attention to the rendering pipeline when scheduling these functions, so they just run whenever they are called. <br><br> They are perfectly good functions to use when you want to wait for some time to elapse before continuing, or when you want to do some repeated work inside a loop, as long as that work doesn't involve screen animation. <br><br> Again, the best tool at our disposal for page animation work today is <code>requestAnimationFrame</code>.</li>
    
  </ul>
  
</div>



The obvious -- and easy -- fix here is to force each call to `animate` to be 
scheduled at the beginning of its frame sequence by putting it inside a 
`requestAnimationFrame`.

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
        <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">animate</span><span class="p">,</span> <span class="mi">4</span><span class="p">);</span>
  <span class="k">else</span>
        <span class="nx">left</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
  <span class="c1">// And update the styles. Wait, is this a read-write cycle?</span>
  <span class="c1">// I hope I don&#39;t trigger a forced synchronous layout!</span>
  <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">left</span> <span class="o">=</span> <span class="nx">left</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
<span class="p">}</span></code></pre></div>

If you take another Timeline recording, you'll see a moderate to significant 
performance improvement, depending on the device.

**Bonus question**: Think about what's happening with story slide-in/out. We're 
just causing a story to appear and disappear on the page, revealing and hiding 
content. It seems to be a simple transition process; do we even need JavaScript 
for that, or could it be handled with CSS alone? We'll revisit this scenario 
in [Exercise 5](step-05).

