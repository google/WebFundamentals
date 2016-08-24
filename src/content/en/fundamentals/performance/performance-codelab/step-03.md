project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Remove jank from scrolling when stories added

<p class="intro">
  Another issue that affects the app's smoothness is the janky scrolling when 
  stories are added to the list. Note the call to <code>loadStoryBatch</code> 
  in the <code>scroll</code> event listener code.
</p>

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">main</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;scroll&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="p">...</span>
  <span class="c1">// Check if we need to load the next batch of stories.</span>
  <span class="kd">var</span> <span class="nx">loadThreshold</span> <span class="o">=</span> <span class="p">(</span><span class="nx">main</span><span class="p">.</span><span class="nx">scrollHeight</span> <span class="o">-</span> <span class="nx">main</span><span class="p">.</span><span class="nx">offsetHeight</span> <span class="o">-</span>
      <span class="nx">LAZY_LOAD_THRESHOLD</span><span class="p">);</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">main</span><span class="p">.</span><span class="nx">scrollTop</span> <span class="o">&gt;</span> <span class="nx">loadThreshold</span><span class="p">)</span>
    <span class="nx">loadStoryBatch</span><span class="p">();</span>
<span class="p">});</span></code></pre></div>

This function makes visible changes to the page by inserting new stories to the 
page as it's loaded, specifically by appending DOM nodes using `appendChild`. 
There's nothing inherently wrong in the function, nor in the design approach 
that uses it, but consider how it is being called.

The `loadStoryBatch` function is catch-as-catch-can; it runs whenever it 
needs to, based on the `loadThreshold` test, without regard to what else is 
going on in the page or where the browser is in the frame construction 
process. This is because the JavaScript engine pays no attention to the 
rendering pipeline when executing scripts. That immediacy will cause a 
performance problem, especially as more stories are added to the list. We 
can address this issue by using `requestAnimationFrame`.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue







Ideally, anything that makes a visible change to the page should happen inside 
a `requestAnimationFrame` call. Let's make that modification to the `scroll` 
event listener code.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">main</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;scroll&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="p">...</span>
  <span class="c1">// Check if we need to load the next batch of stories.</span>
  <span class="kd">var</span> <span class="nx">loadThreshold</span> <span class="o">=</span> <span class="p">(</span><span class="nx">main</span><span class="p">.</span><span class="nx">scrollHeight</span> <span class="o">-</span> <span class="nx">main</span><span class="p">.</span><span class="nx">offsetHeight</span> <span class="o">-</span>
      <span class="nx">LAZY_LOAD_THRESHOLD</span><span class="p">);</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">main</span><span class="p">.</span><span class="nx">scrollTop</span> <span class="o">&gt;</span> <span class="nx">loadThreshold</span><span class="p">)</span>
    <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">loadStoryBatch</span><span class="p">);</span>
<span class="p">});</span></code></pre></div>

This simple change ensures that our animation-related script runs early in the 
pipeline process, and provides a small but significant performance boost.

