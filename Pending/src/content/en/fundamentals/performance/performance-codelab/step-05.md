project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Test for inefficient memory use.

<p class="intro">
  Janky animations aren't the only cause of poor performance in web apps and 
  pages. Another major culprit is inefficient memory use and, as you might 
  guess, our news aggregator app is guilty of that as well.
</p>

When a story headline in the main list is clicked, the app builds the story 
content, adds it to the page, and slides it into view. It's the "adds it to 
the page" part that needs examining. Conveniently, the function that handles 
a story click is called `onStoryClick`. Let's have a look at it.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">onStoryClick</span><span class="p">(</span><span class="nx">details</span><span class="p">)</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">storyDetails</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;sd-&#39;</span> <span class="o">+</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">);</span>
  <span class="c1">// Wait a little time then show the story details.</span>
  <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">showStory</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">),</span> <span class="mi">60</span><span class="p">);</span>
  <span class="c1">// Create and append the story. A visual change...</span>
  <span class="c1">// perhaps that should be in a requestAnimationFrame?</span>
  <span class="c1">// And maybe, since they&#39;re all the same, I don&#39;t</span>
  <span class="c1">// need to make a new element every single time? I mean,</span>
  <span class="c1">// it inflates the DOM and I can only see one at once.</span>
  <span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">storyDetails</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">if</span> <span class="p">(</span><span class="nx">details</span><span class="p">.</span><span class="nx">url</span><span class="p">)</span>
      <span class="nx">details</span><span class="p">.</span><span class="nx">urlobj</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">URL</span><span class="p">(</span><span class="nx">details</span><span class="p">.</span><span class="nx">url</span><span class="p">);</span>
    <span class="kd">var</span> <span class="nx">comment</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">commentsElement</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">storyHeader</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">storyContent</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">storyDetailsHtml</span> <span class="o">=</span> <span class="nx">storyDetailsTemplate</span><span class="p">(</span><span class="nx">details</span><span class="p">);</span>
    <span class="kd">var</span> <span class="nx">kids</span> <span class="o">=</span> <span class="nx">details</span><span class="p">.</span><span class="nx">kids</span><span class="p">;</span>
    <span class="kd">var</span> <span class="nx">commentHtml</span> <span class="o">=</span> <span class="nx">storyDetailsCommentTemplate</span><span class="p">({</span>
      <span class="nx">by</span><span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">,</span> <span class="nx">text</span><span class="o">:</span> <span class="s1">&#39;Loading comment...&#39;</span>
    <span class="p">});</span>
    <span class="nx">storyDetails</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;section&#39;</span><span class="p">);</span>
    <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s1">&#39;id&#39;</span><span class="p">,</span> <span class="s1">&#39;sd-&#39;</span> <span class="o">+</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">);</span>
    <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;story-details&#39;</span><span class="p">);</span>
    <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">storyDetailsHtml</span><span class="p">;</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">storyDetails</span><span class="p">);</span>
    <span class="nx">commentsElement</span> <span class="o">=</span> <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-comments&#39;</span><span class="p">);</span>
    <span class="nx">storyHeader</span> <span class="o">=</span> <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-header&#39;</span><span class="p">);</span>
    <span class="nx">storyContent</span> <span class="o">=</span> <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-content&#39;</span><span class="p">);</span>
    <span class="kd">var</span> <span class="nx">closeButton</span> <span class="o">=</span> <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.js-close&#39;</span><span class="p">);</span>
    <span class="nx">closeButton</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="nx">hideStory</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">));</span>
    <span class="kd">var</span> <span class="nx">headerHeight</span> <span class="o">=</span> <span class="nx">storyHeader</span><span class="p">.</span><span class="nx">getBoundingClientRect</span><span class="p">().</span><span class="nx">height</span><span class="p">;</span>
    <span class="nx">storyContent</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">paddingTop</span> <span class="o">=</span> <span class="nx">headerHeight</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span>
    <span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">kids</span> <span class="o">===</span> <span class="s1">&#39;undefined&#39;</span><span class="p">)</span>
      <span class="k">return</span><span class="p">;</span>
    <span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">k</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">k</span> <span class="o">&lt;</span> <span class="nx">kids</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span> <span class="nx">k</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">comment</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;aside&#39;</span><span class="p">);</span>
      <span class="nx">comment</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s1">&#39;id&#39;</span><span class="p">,</span> <span class="s1">&#39;sdc-&#39;</span> <span class="o">+</span> <span class="nx">kids</span><span class="p">[</span><span class="nx">k</span><span class="p">]);</span>
      <span class="nx">comment</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;story-details__comment&#39;</span><span class="p">);</span>
      <span class="nx">comment</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">commentHtml</span><span class="p">;</span>
      <span class="nx">commentsElement</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">comment</span><span class="p">);</span>
      <span class="c1">// Update the comment with the live data.</span>
      <span class="nx">APP</span><span class="p">.</span><span class="nx">Data</span><span class="p">.</span><span class="nx">getStoryComment</span><span class="p">(</span><span class="nx">kids</span><span class="p">[</span><span class="nx">k</span><span class="p">],</span> <span class="kd">function</span><span class="p">(</span><span class="nx">commentDetails</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">commentDetails</span><span class="p">.</span><span class="nx">time</span> <span class="o">*=</span> <span class="mi">1000</span><span class="p">;</span>
        <span class="kd">var</span> <span class="nx">comment</span> <span class="o">=</span> <span class="nx">commentsElement</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span>
            <span class="s1">&#39;#sdc-&#39;</span> <span class="o">+</span> <span class="nx">commentDetails</span><span class="p">.</span><span class="nx">id</span><span class="p">);</span>
        <span class="nx">comment</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">storyDetailsCommentTemplate</span><span class="p">(</span>
            <span class="nx">commentDetails</span><span class="p">,</span>
            <span class="nx">localeData</span><span class="p">);</span>
      <span class="p">});</span>
    <span class="p">}</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre></div>

After the first group of variable declarations, notice the four lines that 
construct the variable `storyDetails`, setting its element type, attributes, 
and content. Directly after that, note that `storyDetails` is added to the 
DOM as a new node with the `appendChild` method.

At first, that isn't necessarily a problem, but it becomes increasingly 
wasteful as the app is used. Of course, the user only ever sees one story 
at a time, but the new nodes that are created for each viewed story are never 
discarded. After a few clicks, the DOM will be cluttered with abandoned nodes 
that take up memory and slow down the app -- and the longer the app is used, 
the worse its performance will get.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






A better way to accomplish this feature is to create just one permanent 
`storyDetails` node earlier in the script to hold the current story, and then 
use the trusty `innerHTML` property to reset its content each time instead of 
creating a new node. So this section of code

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">storyDetails</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="s1">&#39;section&#39;</span><span class="p">);</span>
<span class="nx">storyDetails</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s1">&#39;id&#39;</span><span class="p">,</span> <span class="s1">&#39;sd-&#39;</span> <span class="o">+</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">);</span>
<span class="nx">storyDetails</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="s1">&#39;story-details&#39;</span><span class="p">);</span>
<span class="nx">storyDetails</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">storyDetailsHtml</span><span class="p">;</span>
<span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">appendChild</span><span class="p">(</span><span class="nx">storyDetails</span><span class="p">);</span></code></pre></div>

can be simplified to this.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">storyDetails</span><span class="p">.</span><span class="nx">setAttribute</span><span class="p">(</span><span class="s1">&#39;id&#39;</span><span class="p">,</span> <span class="s1">&#39;sd-&#39;</span> <span class="o">+</span> <span class="nx">details</span><span class="p">.</span><span class="nx">id</span><span class="p">);</span>
    <span class="nx">storyDetails</span><span class="p">.</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">storyDetailsHtml</span><span class="p">;</span></code></pre></div>

That change will undoubtedly improve long term performance, but it doesn't do 
anything for us in the short term. We still need to finish addressing the 
story slide-in/out issue.

