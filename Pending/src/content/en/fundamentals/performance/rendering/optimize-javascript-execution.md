project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: JavaScript is often the trigger for visual changes. Sometimes that's directly through style manipulations, and sometimes it's calculations that will result in visual changes, like searching or sorting some data. Badly-timed or long-running JavaScript can be a common cause of performance issues, and you should look to minimize its impact where you can.

<p class="intro">
  JavaScript is often the trigger for visual changes. Sometimes that's 
  directly through style manipulations, and sometimes it's calculations that 
  will result in visual changes, like searching or sorting some data. 
  Badly-timed or long-running JavaScript can be a common cause of performance 
  issues, and you should look to minimize its impact where you can.
</p>


















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Avoid setTimeout or setInterval for visual updates; always use requestAnimationFrame instead.</li>
    
    <li>Move long-running JavaScript off the main thread to Web Workers.</li>
    
    <li>Use micro-tasks to make DOM changes over several frames.</li>
    
    <li>Use Chrome DevTools’ Timeline and JavaScript Profiler to assess the impact of JavaScript.</li>
    
  </ul>
  
</div>



JavaScript performance profiling can be something of an art, because the JavaScript you write is nothing like the code that is actually executed. Modern browsers use JIT compilers and all manner of optimizations and tricks to try and give you the fastest possible execution, and this substantially changes the dynamics of the code.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>If you really want to see JIT in action you should check out <a href='http://mrale.ph/irhydra/2/'>IRHydra<sup>2</sup> by Vyacheslav Egorov</a>. It shows the intermediate state of JavaScript code when Chrome’s JavaScript engine, V8, is optimizing it.</li>
    
  </ul>
  
</div>



With all that said, however, there are some things you can definitely do to help your apps execute JavaScript well.

## Use `requestAnimationFrame` for visual changes

When visual changes are happening on screen you want to do your work at the right time for the browser, which is right at the start of the frame. The only way to guarantee that your JavaScript will run at the start of a frame is to use `requestAnimationFrame`.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="cm">/**</span>
<span class="cm"> * If run as a requestAnimationFrame callback, this</span>
<span class="cm"> * will be run at the start of the frame.</span>
<span class="cm"> */</span>
<span class="kd">function</span> <span class="nx">updateScreen</span><span class="p">(</span><span class="nx">time</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Make visual updates here.</span>
<span class="p">}</span>

<span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">updateScreen</span><span class="p">);</span></code></pre></div>

Frameworks or samples may use `setTimeout` or `setInterval` to do visual changes like animations, but the problem with this is that the callback will run at _some point_ in the frame, possibly right at the end, and that can often have the effect of causing us to miss a frame, resulting in jank.

<img src="images/optimize-javascript-execution/settimeout.jpg" alt="setTimeout causing the browser to miss a frame.">

In fact, jQuery’s default `animate` behavior today is to use `setTimeout`! You can [patch it to use `requestAnimationFrame`](https://github.com/gnarf/jquery-requestAnimationFrame), which is strongly advised.

## Reduce complexity or use Web Workers

JavaScript runs on the browser’s main thread, right alongside style calculations, layout, and, in many cases, paint. If your JavaScript runs for a long time, it will block these other tasks, potentially causing frames to be missed.

You should be tactical about when JavaScript runs, and for how long. For example, if you’re in an animation like scrolling, you should ideally be looking to keep your JavaScript to something in the region of **3-4ms**. Any longer than that and you risk taking up too much time. If you’re in an idle period, you can afford to be more relaxed about the time taken.

In many cases you can move pure computational work to [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/basic_usage), if, for example, the it doesn’t require DOM access. Data manipulation or traversal, like sorting or searching, are often good fits for this model, as are loading and model generation.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">dataSortWorker</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Worker</span><span class="p">(</span><span class="s2">&quot;sort-worker.js&quot;</span><span class="p">);</span>
<span class="nx">dataSortWorker</span><span class="p">.</span><span class="nx">postMesssage</span><span class="p">(</span><span class="nx">dataToSort</span><span class="p">);</span>

<span class="c1">// The main thread is now free to continue working on other things...</span>

<span class="nx">dataSortWorker</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;message&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
   <span class="kd">var</span> <span class="nx">sortedData</span> <span class="o">=</span> <span class="nx">evt</span><span class="p">.</span><span class="nx">data</span><span class="p">;</span>
   <span class="c1">// Update data on screen...</span>
<span class="p">});</span></code></pre></div>

Not all work can fit this model: Web Workers do not have DOM access. Where your work must be on the main thread, consider a batching approach, where you segment the larger task into micro-tasks, each taking no longer than a few milliseconds, and run inside of `requestAnimationFrame` handlers across each frame.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">taskList</span> <span class="o">=</span> <span class="nx">breakBigTaskIntoMicroTasks</span><span class="p">(</span><span class="nx">monsterTaskList</span><span class="p">);</span>
<span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">processTaskList</span><span class="p">);</span>

<span class="kd">function</span> <span class="nx">processTaskList</span><span class="p">(</span><span class="nx">taskStartTime</span><span class="p">)</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">taskFinishTime</span><span class="p">;</span>

  <span class="k">do</span> <span class="p">{</span>
    <span class="c1">// Assume the next task is pushed onto a stack.</span>
    <span class="kd">var</span> <span class="nx">nextTask</span> <span class="o">=</span> <span class="nx">taskList</span><span class="p">.</span><span class="nx">pop</span><span class="p">();</span>

    <span class="c1">// Process nextTask.</span>
    <span class="nx">processTask</span><span class="p">(</span><span class="nx">nextTask</span><span class="p">);</span>

    <span class="c1">// Go again if there’s enough time to do the next task.</span>
    <span class="nx">taskFinishTime</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">performance</span><span class="p">.</span><span class="nx">now</span><span class="p">();</span>
  <span class="p">}</span> <span class="k">while</span> <span class="p">(</span><span class="nx">taskFinishTime</span> <span class="o">-</span> <span class="nx">taskStartTime</span> <span class="o">&lt;</span> <span class="mi">3</span><span class="p">);</span>

  <span class="k">if</span> <span class="p">(</span><span class="nx">taskList</span><span class="p">.</span><span class="nx">length</span> <span class="o">&gt;</span> <span class="mi">0</span><span class="p">)</span>
    <span class="nx">requestAnimationFrame</span><span class="p">(</span><span class="nx">processTaskList</span><span class="p">);</span>

<span class="p">}</span></code></pre></div>

There are UX and UI consequences to this approach, and you will need to ensure that the user knows that a task is being processed, either by [using a progress or activity indicator](https://www.google.com/design/spec/components/progress-activity.html). In any case this approach will keep your app's main thread free, helping it to stay responsive to user interactions.

## Know your JavaScript’s “frame tax”

When assessing a framework, library, or your own code, it’s important to assess how much it costs to run the JavaScript code on a frame-by-frame basis. This is especially important when doing performance-critical animation work like transitioning or scrolling.

The best way to measure your JavaScript’s cost and performance profile is to use Chrome DevTools. Typically you will get low detail records that look like this:

<img src="images/optimize-javascript-execution/low-js-detail.jpg" alt="Chrome DevTools' Timeline providing low JS execution detail.">

If you discover that you have long-running JavaScript, you can enable the JavaScript profiler at the top of the DevTools user interface:

<img src="images/optimize-javascript-execution/js-profiler-toggle.jpg" alt="Enabling the JS profiler in DevTools.">

There is an overhead to profiling JavaScript in this way, so be sure to only enable it when you want more insight into JavaScript runtime characteristics. With the checkbox enabled you can now perform the same actions and you’ll get significantly more information on which functions were called in your JavaScript:

<img src="images/optimize-javascript-execution/high-js-detail.jpg" alt="Chrome DevTools' Timeline providing high JS execution detail.">

Armed with this information you can assess the performance impact of the JavaScript on your application, and begin to find and fix any hotspots where functions are taking too long to execute. As mentioned earlier you should seek to either remove long-running JavaScript, or, if that’s not possible, move it to a Web Worker freeing up the main thread to continue on with other tasks.

## Avoid micro-optimizing your JavaScript

It may be cool to know that the browser can execute one version of a thing 100 times faster than another thing, like that requesting and element’s `offsetTop` is faster than computing `getBoundingClientRect()`, but it’s almost always true that you’ll only be calling functions like these a small number of times per frame, so it’s normally wasted effort to focus on this aspect of JavaScript’s performance. You'll typically only save fractions of milliseconds.

If you’re making a game, or a computationally expensive application, then you’re likely an exception to this guidance, as you’ll be typically fitting a lot of computation into a single frame, and in that case everything helps.

In short, you should be very wary of micro-optimizations because they won’t typically map to the kind of application you’re building.

