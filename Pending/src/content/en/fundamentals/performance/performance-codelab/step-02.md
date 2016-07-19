project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Fix juddering in list scrolling

<p class="intro">
  During scrolling in the main screen of the <a href="http://udacity.github.io/news-aggregator">live site</a>, you'll notice that the story list judders. Also, you'll see that the individual story point indicators (the circled numbers) not only change values, but also change color. This exercise is about identifying these problems and deciding how to approach them.
</p>

Let's see what's really happening when we scroll the main screen, using the 
Timeline. In DevTools, start a recording, scroll down the list a bit, and 
then stop the recording.

In the recording's results, notice that the frames are way over the 
30fps line, not even close to hitting 60fps. In fact, the frames are so slow 
that the 60fps line isn't even shown on the graph.

<figure>
  <img src="images/image03.png" alt="Slow frames in Timeline recording">
</figure>

Zoom in on a frame and see that after the scroll event is a
function call, followed by many separate layout events.
Each separate layout event includes a red warning triangle.
This is a sure sign that a
<i>forced synchronous layout</i> is occurring.

<figure>
  <img src="images/image01.png" alt="Forced synchronous layout">
</figure>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">newWidth</span> <span class="o">=</span> <span class="nx">container</span><span class="p">.</span><span class="nx">offsetWidth</span><span class="p">;</span>
<span class="nx">divs</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">elem</span><span class="p">,</span> <span class="nx">index</span><span class="p">,</span> <span class="nx">arr</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">elem</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="nx">newWidth</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>

There are many CSS properties that cause layout to happen;
see a list of properties and their pipeline effects at
[CSS Triggers](http://csstriggers.com/).

Look at the details of a layout event, and you can see that the forced 
synchronous layout warning is being produced by the 
`colorizeAndScaleStories` function in `app.js`.

![colorizeandscalestories.png](images/image00.png)

Let's examine that function.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">colorizeAndScaleStories</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">storyElements</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelectorAll</span><span class="p">(</span><span class="s1">&#39;.story&#39;</span><span class="p">);</span>
  <span class="c1">// It does seem awfully broad to change all the</span>
  <span class="c1">// colors every time!</span>
  <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">s</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">s</span> <span class="o">&lt;</span> <span class="nx">storyElements</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">s</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">story</span> <span class="o">=</span> <span class="nx">storyElements</span><span class="p">[</span><span class="nx">s</span><span class="p">];</span>
    <span class="kd">var</span> <span class="nx">score</span> <span class="o">=</span> <span class="nx">story</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.story__score&#39;</span><span class="p">);</span>
    <span class="kd">var</span> <span class="nx">title</span> <span class="o">=</span> <span class="nx">story</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.story__title&#39;</span><span class="p">);</span>
    <span class="c1">// Base the scale on the y position of the score.</span>
    <span class="kd">var</span> <span class="nx">height</span> <span class="o">=</span> <span class="nx">main</span><span class="p">.</span><span class="nx">offsetHeight</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">mainPosition</span> <span class="o">=</span> <span class="nx">main</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">();</span>
    <span class="kd">var</span> <span class="nx">scoreLocation</span> <span class="o">=</span> <span class="nx">score</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">().</span><span class="nx">top</span> <span class="o">-</span>
        <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">().</span><span class="nx">top</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">scale</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span> <span class="o">-</span> <span class="p">(</span><span class="mf">0.05</span> <span class="o">*</span> <span class="p">((</span><span class="nx">scoreLocation</span> <span class="o">-</span> <span class="mi">170</span><span class="p">)</span> <span class="o">/</span> <span class="nx">height</span><span class="p">)));</span>
    <span class="kd">var</span> <span class="nx">opacity</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="mi">1</span><span class="p">,</span> <span class="mi">1</span> <span class="o">-</span> <span class="p">(</span><span class="mf">0.5</span> <span class="o">*</span> <span class="p">((</span><span class="nx">scoreLocation</span> <span class="o">-</span> <span class="mi">170</span><span class="p">)</span> <span class="o">/</span> <span class="nx">height</span><span class="p">)));</span>
    <span class="nx">score</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="p">(</span><span class="nx">scale</span> <span class="o">*</span> <span class="mi">40</span><span class="p">)</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
    <span class="nx">score</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="p">(</span><span class="nx">scale</span> <span class="o">*</span> <span class="mi">40</span><span class="p">)</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
    <span class="nx">score</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">lineHeight</span> <span class="o">=</span> <span class="p">(</span><span class="nx">scale</span> <span class="o">*</span> <span class="mi">40</span><span class="p">)</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
    <span class="c1">// Now figure out how wide it is and use that to saturate it.</span>
    <span class="nx">scoreLocation</span> <span class="o">=</span> <span class="nx">score</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">();</span>
    <span class="kd">var</span> <span class="nx">saturation</span> <span class="o">=</span> <span class="p">(</span><span class="mi">100</span> <span class="o">*</span> <span class="p">((</span><span class="nx">scoreLocation</span><span class="p">.</span><span class="nx">width</span> <span class="o">-</span> <span class="mi">38</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span><span class="p">));</span>
    <span class="nx">score</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">backgroundColor</span> <span class="o">=</span> <span class="s1">&#39;hsl(42, &#39;</span> <span class="o">+</span> <span class="nx">saturation</span> <span class="o">+</span> <span class="s1">&#39;%, 50%)&#39;</span><span class="p">;</span>
    <span class="nx">title</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">opacity</span> <span class="o">=</span> <span class="nx">opacity</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre></div>

Notice that `height`, `width`, and `line-height` are accessed, all of which 
which cause layout to run. Opacity is also set and -- while an opacity change 
doesn't trigger layout -- this line of code applies a new style, which 
triggers recalculate and, again, layout. These two techniques used in the 
function's main loop are causing the forced synchronous layout problem.

Next, consider the visual effect on the story point indicators, which doesn't 
add any informational value. We could achieve the effect with CSS properties 
instead of JavaScript, but we might be better off dropping the effect 
completely. The takeaway: sometimes the best code fix is code removal.

Let's remove the calls to the `colorizeAndScaleStories` function 
(at lines 89 and 305 in app.js), as well as the entire function itself 
(lines 255-286, shown above), so the story points will now look the same 
all the time.

Run the app again and take a Timeline recording of some scrolling activity, 
and then zoom in on a scroll event. This time, you'll see that there is only 
one style recalculation after the scroll, and that the frames are all well 
under the 60fps line, which is now shown on the graph.

<figure>
  <img src="images/image02.png" alt="Much better Timeline recording">
</figure>

The extra layouts and their forced synchronous layout warnings are gone, and 
frame rate is excellent. One jank problem solved!

