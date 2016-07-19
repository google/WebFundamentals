project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: This guide examines PageSpeed Insights rules in context: what to pay attention to when optimizing the critical rendering path, and why.

<p class="intro">
  This guide examines PageSpeed Insights rules in context: what to pay attention to when optimizing the critical rendering path, and why.
</p>



## Eliminate render-blocking JavaScript and CSS

To deliver the fastest time to first render, you want to minimize and (where possible) eliminate the number of critical resources on the page, minimize the number of downloaded critical bytes, and optimize the critical path length.

## Optimize JavaScript Use

JavaScript resources are parser blocking by default unless marked as `async` or added via a special JavaScript snippet. Parser blocking JavaScript forces the browser to wait for the CSSOM and pauses construction of the DOM, which in turn can significantly delay the time to first render.

### Prefer async JavaScript resources

Async resources unblock the document parser and allow the browser to avoid blocking on CSSOM prior to executing the script. Often, if the script can be made async, it also means it is not essential for the first render - consider loading async scripts after the initial render.

### Avoid synchronous server calls

Use the `navigator.sendBeacon()` method to limit data sent by XMLHttpRequests in
`unload` handlers. Because many browsers require such requests to be
synchronous, they can slow page transitions, sometimes noticeably. The following
code shows how to use `navigator.sendBeacon()` to send data to the server in the
`pagehide` handler instead of in the `unload` handler.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script&gt;</span>
  <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;pagehide&#39;</span><span class="p">,</span> <span class="nx">logData</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>
    <span class="kd">function</span> <span class="nx">logData</span><span class="p">()</span> <span class="p">{</span>
      <span class="nx">navigator</span><span class="p">.</span><span class="nx">sendBeacon</span><span class="p">(</span>
        <span class="s1">&#39;https://putsreq.herokuapp.com/Dt7t2QzUkG18aDTMMcop&#39;</span><span class="p">,</span>
        <span class="s1">&#39;Sent by a beacon!&#39;</span><span class="p">);</span>
    <span class="p">}</span>
  <span class="p">}();</span>
<span class="nt">&lt;/script&gt;</span></code></pre></div>

The new `fetch()` method provides an easy way to asynchronously request data. Because it is not available everywhere yet, you should use feature detection to test for its presence before use. This method processes responses with Promises rather than multiple event handlers. Unlike the response to an XMLHttpRequest, a fetch response is a stream object starting in Chrome 43. This means that a call to `json()` also returns a Promise. 

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script&gt;</span>
<span class="nx">fetch</span><span class="p">(</span><span class="s1">&#39;./api/some.json&#39;</span><span class="p">)</span>  
  <span class="p">.</span><span class="nx">then</span><span class="p">(</span>  
    <span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>  
      <span class="k">if</span> <span class="p">(</span><span class="nx">response</span><span class="p">.</span><span class="nx">status</span> <span class="o">!==</span> <span class="mi">200</span><span class="p">)</span> <span class="p">{</span>  
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Looks like there was a problem. Status Code: &#39;</span> <span class="o">+</span>  <span class="nx">response</span><span class="p">.</span><span class="nx">status</span><span class="p">);</span>  
        <span class="k">return</span><span class="p">;</span>  
      <span class="p">}</span>
      <span class="c1">// Examine the text in the response  </span>
      <span class="nx">response</span><span class="p">.</span><span class="nx">json</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span>  
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">data</span><span class="p">);</span>  
      <span class="p">});</span>  
    <span class="p">}</span>  
  <span class="p">)</span>  
  <span class="p">.</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>  
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Fetch Error :-S&#39;</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>  
  <span class="p">});</span>
<span class="nt">&lt;/script&gt;</span></code></pre></div>

The `fetch()` method can also handle POST requests.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;script&gt;</span>
<span class="nx">fetch</span><span class="p">(</span><span class="nx">url</span><span class="p">,</span> <span class="p">{</span>
  <span class="nx">method</span><span class="o">:</span> <span class="s1">&#39;post&#39;</span><span class="p">,</span>
  <span class="nx">headers</span><span class="o">:</span> <span class="p">{</span>  
    <span class="s2">&quot;Content-type&quot;</span><span class="o">:</span> <span class="s2">&quot;application/x-www-form-urlencoded; charset=UTF-8&quot;</span>  
  <span class="p">},</span>  
  <span class="nx">body</span><span class="o">:</span> <span class="s1">&#39;foo=bar&amp;lorem=ipsum&#39;</span>  
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span> <span class="c1">// Aditional code });</span>
<span class="nt">&lt;/script&gt;</span></code></pre></div>

### Defer parsing JavaScript

Any non-essential scripts that are not critical to constructing the visible content for the initial render should be deferred to minimize the amount of work the browser has to perform to render the page.

### Avoid long running JavaScript

Long running JavaScript blocks the browser from constructing the DOM, CSSOM, and rendering the page. As a result, any initialization logic and functionality that is non-essential for the first render should be deferred until later. If a long initialization sequence needs to be run, consider splitting it into several stages to allow the browser to process other events in between.

## Optimize CSS Use

CSS is required to construct the render tree and JavaScript will often block on CSS during initial construction of the page. You should ensure that any non-essential CSS is marked as non-critical (e.g. print and other media queries), and that the amount of critical CSS and the time to deliver it is as small as possible.

### Put CSS in the document head

All CSS resources should be specified as early as possible within the HTML document such that the browser can discover the `<link>` tags and dispatch the request for the CSS as soon as possible.

### Avoid CSS imports

CSS import (`@import`) directive enables one stylesheet to import rules from another stylesheet file. However, these directives should be avoided because they introduce additional roundtrips into the critical path: the imported CSS resources are discovered only after the CSS stylesheet with the `@import` rule itself has been received and parsed.

### Inline render-blocking CSS

For best performance, you may want to consider inlining the critical CSS directly into the HTML document. This eliminates additional roundtrips in the critical path and if done correctly can be used to deliver a "one roundtrip" critical path length where only the HTML is a blocking resource.


