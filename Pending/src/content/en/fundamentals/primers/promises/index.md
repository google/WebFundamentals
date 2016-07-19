project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Promises simplify deferred and asynchronous computations. A promise represents an operation that hasn't completed yet.

Ladies and gentlemen, prepare yourself for a pivotal moment in the history of web development…

<em>[Drumroll begins]</em>

Promises have arrived natively in JavaScript!

<em>[Fireworks explode, glittery paper rains from above, the crowd goes wild]</em>

At this point you fall into one of these categories:

* People are cheering around you, but you're not sure what all the fuss is about. Maybe you're not even sure what a "promise" is. You'd shrug, but the weight of glittery paper is weighing down on your shoulders. If so, don't worry about it, it took me ages to work out why I should care about this stuff. You probably want to begin at the [beginning](#whats-all-the-fuss-about).
* You punch the air! About time right? You've used these Promise things before but it bothers you that all implementations have a slightly different API. What's the API for the official JavaScript version? You probably want to begin with the [terminology](#promise-terminology).
* You knew about this already and you scoff at those who are jumping up and down like it's news to them. Take a moment to bask in your own superiority, then head straight to the [API reference](#promise-api-reference)



## What's all the fuss about?

JavaScript is single threaded, meaning that two bits of script cannot run at the same time, they have to run one after another. In browsers, JavaScript shares a thread with a load of other stuff. What that stuff is differs from browser to browser, but typically JavaScript is in the same queue as painting, updating styles, and handling user actions (such as highlighting text and interacting with form controls). Activity in one of these things delays the others.

As a human being, you're multithreaded. You can type with multiple fingers, you can drive and hold a conversation at the same time. The only blocking function we have to deal with is sneezing, where all current activity must be suspended for the duration of the sneeze. That's pretty annoying, especially when you're driving and trying to hold a conversation. You don't want to write code that's sneezy.

You've probably used events and callbacks to get around this. Here are events:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">img1</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.img-1&#39;</span><span class="p">);</span>

<span class="nx">img1</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;load&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// woo yey image loaded</span>
<span class="p">});</span>

<span class="nx">img1</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;error&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// argh everything&#39;s broken</span>
<span class="p">});</span></code></pre></div>

This isn't sneezy at all. We get the image, add a couple of listeners, then JavaScript can stop executing until one of those listeners is called.

Unfortunately, in the example above, it's possible that the events happened before we started listening for them, so we need to work around that using the "complete" property of images:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">img1</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.img-1&#39;</span><span class="p">);</span>

<span class="kd">function</span> <span class="nx">loaded</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// woo yey image loaded</span>
<span class="p">}</span>

<span class="k">if</span> <span class="p">(</span><span class="nx">img1</span><span class="p">.</span><span class="nx">complete</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">loaded</span><span class="p">();</span>
<span class="p">}</span>
<span class="k">else</span> <span class="p">{</span>
  <span class="nx">img1</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;load&#39;</span><span class="p">,</span> <span class="nx">loaded</span><span class="p">);</span>
<span class="p">}</span>

<span class="nx">img1</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;error&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// argh everything&#39;s broken</span>
<span class="p">});</span></code></pre></div>

This doesn't catch images that error'd before we got a chance to listen for them, unfortunately the DOM doesn't give us a way to do that. Also, this is loading one image, things get even more complex if we want to know when a set of images have loaded.


## Events aren't always the best way

Events are great for things that can happen multiple times on the same object — keyup, touchstart etc. With those events you don't really care about what happened before you attached the listener. But when it comes to async success/failure, ideally you want something like:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">img1</span><span class="p">.</span><span class="nx">callThisIfLoadedOrWhenLoaded</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// loaded</span>
<span class="p">}).</span><span class="nx">orIfFailedCallThis</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// failed</span>
<span class="p">});</span>

<span class="c1">// and…</span>
<span class="nx">whenAllTheseHaveLoaded</span><span class="p">([</span><span class="nx">img1</span><span class="p">,</span> <span class="nx">img2</span><span class="p">]).</span><span class="nx">callThis</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// all loaded</span>
<span class="p">}).</span><span class="nx">orIfSomeFailedCallThis</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// one or more failed</span>
<span class="p">});</span></code></pre></div>

This is what promises do, but with better naming. If HTML image elements had a "ready" method that returned a promise, we could do:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">img1</span><span class="p">.</span><span class="nx">ready</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// loaded</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// failed</span>
<span class="p">});</span>

<span class="c1">// and…</span>
<span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">([</span><span class="nx">img1</span><span class="p">.</span><span class="nx">ready</span><span class="p">(),</span> <span class="nx">img2</span><span class="p">.</span><span class="nx">ready</span><span class="p">()]).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// all loaded</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// one or more failed</span>
<span class="p">});</span></code></pre></div>

At their most basic, promises are a bit like event listeners except:

* A promise can only succeed or fail once. It cannot succeed or fail twice, neither can it switch from success to failure or vice versa
* If a promise has succeeded or failed and you later add a success/failure callback, the correct callback will be called, even though the event took place earlier

This is extremely useful for async success/failure, because you're less interested in the exact time something became available, and more interested in reacting to the outcome.


## Promise terminology

[Domenic Denicola](https://twitter.com/domenic) proof read the first draft of this article and graded me "F" for terminology. He put me in detention, forced me to copy out [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) 100 times, and wrote a worried letter to my parents. Despite that, I still get a lot of the terminology mixed up, but here are the basics:

A promise can be:

* **fulfilled** - The action relating to the promise succeeded
* **rejected** - The action relating to the promise failed
* **pending** - Hasn't fulfilled or rejected yet
* **settled** - Has fulfilled or rejected


[The spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects) also uses the term **thenable** to describe an object that is promise-like, in that it has a `then` method. This term reminds me of ex-England Football Manager [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables) so I'll be using it as little as possible.


## Promises arrive in JavaScript!

Promises have been around for a while in the form of libraries, such as:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

The above and JavaScript promises share a common, standardised behaviour called [Promises/A+](https://github.com/promises-aplus/promises-spec). If you're a jQuery user, they have something similar called [Deferreds](https://api.jquery.com/category/deferred-object/). However, Deferreds aren't Promise/A+ compliant, which makes them [subtly different and less useful](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/), so beware. jQuery also has [a Promise type](https://api.jquery.com/Types/#Promise), but this is just a subset of Deferred and has the same issues.

Although promise implementations follow a standardised behaviour, their overall APIs differ. JavaScript promises are similar in API to RSVP.js. Here's how you create a promise:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">promise</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// do a thing, possibly async, then…</span>

  <span class="k">if</span> <span class="p">(</span><span class="cm">/* everything turned out fine */</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">resolve</span><span class="p">(</span><span class="s2">&quot;Stuff worked!&quot;</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="k">else</span> <span class="p">{</span>
    <span class="nx">reject</span><span class="p">(</span><span class="nb">Error</span><span class="p">(</span><span class="s2">&quot;It broke&quot;</span><span class="p">));</span>
  <span class="p">}</span>
<span class="p">});</span></code></pre></div>

The promise constructor takes one argument, a callback with two parameters, resolve and reject. Do something within the callback, perhaps async, then call resolve if everything worked, otherwise call reject.

Like `throw` in plain old JavaScript, it's customary, but not required, to reject with an Error object. The benefit of Error objects is they capture a stack trace, making debugging tools more helpful.

Here's how you use that promise:


<div class="highlight"><pre><code class="language-html" data-lang="html">promise.then(function(result) {
  console.log(result); // &quot;Stuff worked!&quot;
}, function(err) {
  console.log(err); // Error: &quot;It broke&quot;
});</code></pre></div>

`then` takes two arguments, a callback for a success case, and another for the failure case. Both are optional, so you can add a callback for the success or failure case only.

JavaScript promises started out in the DOM as "Futures", renamed to "Promises", and finally moved into JavaScript. Having them in JavaScript rather than the DOM is great because they'll be available in non-browser JS contexts such as Node.js (whether they make use of them in their core APIs is another question).

Although they're a JavaScript feature, the DOM isn't afraid to use them. In fact, all new DOM APIs with async success/failure methods will use promises. This is happening already with [Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), [Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready), [ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options), [Streams](https://github.com/whatwg/streams#basereadablestream), and more.


## Browser support &amp; polyfill

There are already implementations of promises in browsers today.

As of Chrome 32, Opera 19, Firefox 29, Safari 8 &amp; Microsoft Edge, promises are enabled by default.

To bring browsers that lack a complete promises implementation up to spec compliance, or add promises to other browsers and Node.js, check out [the polyfill](https://github.com/jakearchibald/ES6-Promises#readme) (2k gzipped).


## Compatibility with other libraries

The JavaScript promises API will treat anything with a `then` method as promise-like (or `thenable` in promise-speak _sigh_), so if you use a library that returns a Q promise, that's fine, it'll play nice with the new JavaScript promises.

Although, as I mentioned, jQuery's Deferreds are a bit… unhelpful. Thankfully you can cast them to standard promises, which is worth doing as soon as possible:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">jsPromise</span> <span class="o">=</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">ajax</span><span class="p">(</span><span class="s1">&#39;/whatever.json&#39;</span><span class="p">))</span></code></pre></div>


Here, jQuery's `$.ajax` returns a Deferred. Since it has a "then" method, `Promise.resolve` can turn it into a JavaScript promise. However, sometimes deferreds pass multiple arguments to their callbacks, eg:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">jqDeferred</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">ajax</span><span class="p">(</span><span class="s1">&#39;/whatever.json&#39;</span><span class="p">);</span>

<span class="nx">jqDeferred</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">,</span> <span class="nx">statusText</span><span class="p">,</span> <span class="nx">xhrObj</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// ...</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">(</span><span class="nx">xhrObj</span><span class="p">,</span> <span class="nx">textStatus</span><span class="p">,</span> <span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// ...</span>
<span class="p">})</span></code></pre></div>


Whereas JS promises ignore all but the first:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">jsPromise</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// ...</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">(</span><span class="nx">xhrObj</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// ...</span>
<span class="p">})</span></code></pre></div>


…thankfully this is usually what you want, or at least gives you access to what you want. Also, be aware that jQuery doesn't follow the convention of passing Error objects into rejections.


## Complex async code made easier

Right, let's code some things. Say we want to:

1. Start a spinner to indicate loading
1. Fetch some JSON for a story, which gives us the title, and urls for each chapter
1. Add title to the page
1. Fetch each chapter
1. Add the story to the page
1. Stop the spinner

…but also tell the user if something went wrong along the way. We'll want to stop the spinner at that point too, else it'll keep on spinning, get dizzy, and crash into some other UI.

Of course, you wouldn't use JavaScript to deliver a story, [serving as HTML is faster](https://jakearchibald.com/2013/progressive-enhancement-is-faster/), but this pattern is pretty common when dealing with APIs: Multiple data fetches, then do something when it's all done.

To start with, let's deal with fetching data from the network:

## Promisifying XMLHttpRequest

Old APIs will be updated to use promises, if it's possible in a backwards compatible way. `XMLHttpRequest` is a prime candidate, but in the mean time let's write a simple function to make a GET request:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">get</span><span class="p">(</span><span class="nx">url</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Return a new promise.</span>
  <span class="k">return</span> <span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Do the usual XHR stuff</span>
    <span class="kd">var</span> <span class="nx">req</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">XMLHttpRequest</span><span class="p">();</span>
    <span class="nx">req</span><span class="p">.</span><span class="nx">open</span><span class="p">(</span><span class="s1">&#39;GET&#39;</span><span class="p">,</span> <span class="nx">url</span><span class="p">);</span>

    <span class="nx">req</span><span class="p">.</span><span class="nx">onload</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
      <span class="c1">// This is called even on 404 etc</span>
      <span class="c1">// so check the status</span>
      <span class="k">if</span> <span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">status</span> <span class="o">==</span> <span class="mi">200</span><span class="p">)</span> <span class="p">{</span>
        <span class="c1">// Resolve the promise with the response text</span>
        <span class="nx">resolve</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">response</span><span class="p">);</span>
      <span class="p">}</span>
      <span class="k">else</span> <span class="p">{</span>
        <span class="c1">// Otherwise reject with the status text</span>
        <span class="c1">// which will hopefully be a meaningful error</span>
        <span class="nx">reject</span><span class="p">(</span><span class="nb">Error</span><span class="p">(</span><span class="nx">req</span><span class="p">.</span><span class="nx">statusText</span><span class="p">));</span>
      <span class="p">}</span>
    <span class="p">};</span>

    <span class="c1">// Handle network errors</span>
    <span class="nx">req</span><span class="p">.</span><span class="nx">onerror</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
      <span class="nx">reject</span><span class="p">(</span><span class="nb">Error</span><span class="p">(</span><span class="s2">&quot;Network Error&quot;</span><span class="p">));</span>
    <span class="p">};</span>

    <span class="c1">// Make the request</span>
    <span class="nx">req</span><span class="p">.</span><span class="nx">send</span><span class="p">();</span>
  <span class="p">});</span>
<span class="p">}</span></code></pre></div>

Now let's use it:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Success!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="s2">&quot;Failed!&quot;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


[Click here to see that in action](_code/story.json), check the console in DevTools to see the result. Now we can make HTTP requests without manually typing `XMLHttpRequest`, which is great, because the less I have to see the infuriating camel-casing of `XMLHttpRequest`, the happier my life will be.


## Chaining

`then` isn't the end of the story, you can chain `then`s together to transform values or run additional async actions one after another.


### Transforming values
You can transform values simply by returning the new value:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">promise</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">resolve</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span>
<span class="p">});</span>

<span class="nx">promise</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">val</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">val</span><span class="p">);</span> <span class="c1">// 1</span>
  <span class="k">return</span> <span class="nx">val</span> <span class="o">+</span> <span class="mi">2</span><span class="p">;</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">val</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">val</span><span class="p">);</span> <span class="c1">// 3</span>
<span class="p">})</span></code></pre></div>


As a practical example, let's go back to:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Success!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


The response is JSON, but we're currently receiving it as plain text. We could alter our get function to use the JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType), but we could also solve it in promises land:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">(</span><span class="nx">response</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Yey JSON!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


Since `JSON.parse` takes a single argument and returns a transformed value, we can make a shortcut:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Yey JSON!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


[Click here to see that in action](_code/story.json), check the console in DevTools to see the result. In fact, we could make a `getJSON` function really easily:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">url</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">get</span><span class="p">(</span><span class="nx">url</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">);</span>
<span class="p">}</span></code></pre></div>

`getJSON` still returns a promise, one that fetches a url then parses the response as JSON.


### Queuing asynchronous actions

You can also chain "then"s to run async actions in sequence.

When you return something from a "then" callback, it's a bit magic. If you return a value, the next "then" is called with that value. However, if you return something promise-like, the next "then" waits on it, and is only called when that promise settles (succeeds/fails). For example:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter1</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Got chapter 1!&quot;</span><span class="p">,</span> <span class="nx">chapter1</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


Here we make an async request to `story.json`, which gives us a set of URLs to request, then we request the first of those. This is when promises really start to stand out from simple callback patterns.

You could even make a shortcut method to get chapters:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">storyPromise</span><span class="p">;</span>

<span class="kd">function</span> <span class="nx">getChapter</span><span class="p">(</span><span class="nx">i</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">storyPromise</span> <span class="o">=</span> <span class="nx">storyPromise</span> <span class="o">||</span> <span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">);</span>

  <span class="k">return</span> <span class="nx">storyPromise</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">[</span><span class="nx">i</span><span class="p">]);</span>
  <span class="p">})</span>
<span class="p">}</span>

<span class="c1">// and using it is simple:</span>
<span class="nx">getChapter</span><span class="p">(</span><span class="mi">0</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">chapter</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">getChapter</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">chapter</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


We don't download `story.json` until `getChapter` is called, but the next time(s) `getChapter` is called we reuse the story promise, so `story.json` is only fetched once. Yay Promises!


## Error handling

As we saw earlier, "then" takes two arguments, one for success, one for failure (or fulfill and reject, in promises-speak):


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Success!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Failed!&quot;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


You can also use "catch":


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Success!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Failed!&quot;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


There's nothing special about "catch", it's just sugar for `then(undefined, func)`, but it's more readable. Note that the two code examples above do not behave the same, the latter is equivalent to:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">response</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Success!&quot;</span><span class="p">,</span> <span class="nx">response</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kc">undefined</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">error</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Failed!&quot;</span><span class="p">,</span> <span class="nx">error</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


The difference is subtle, but extremely useful. Promise rejections skip forward to the next "then" with a rejection callback (or "catch", since it's equivalent). With `then(func1, func2)`, `func1` or `func2` will be called, never both. But with `then(func1).catch(func2)`, both will be called if `func1` rejects, as they're separate steps in the chain. Take the following:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">asyncThing1</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">asyncThing2</span><span class="p">();</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">asyncThing3</span><span class="p">();</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">asyncRecovery1</span><span class="p">();</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">asyncThing4</span><span class="p">();</span>
<span class="p">},</span> <span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">asyncRecovery2</span><span class="p">();</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;Don&#39;t worry about it&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;All done!&quot;</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


The flow above is very similar to normal JavaScript try/catch, errors that happen within a "try" go immediately to the "catch" block. Here's the above as a flowchart (because I love flowcharts):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Follow the green lines for promises that fulfill, or the red for ones that reject.

### JavaScript exceptions and promises
Rejections happen when a promise is explicitly rejected, but also implicitly if an error is thrown in the constructor callback:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">jsonPromise</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// JSON.parse throws an error if you feed it some</span>
  <span class="c1">// invalid JSON, so this implicitly rejects:</span>
  <span class="nx">resolve</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">(</span><span class="s2">&quot;This ain&#39;t JSON&quot;</span><span class="p">));</span>
<span class="p">});</span>

<span class="nx">jsonPromise</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// This never happens:</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;It worked!&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Instead, this happens:</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;It failed!&quot;</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


This means it's useful to do all your promise-related work inside the promise constructor callback, so errors are automatically caught and become rejections.

The same goes for errors thrown in "then" callbacks.


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">get</span><span class="p">(</span><span class="s1">&#39;/&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// This never happens, &#39;/&#39; is an HTML page, not JSON</span>
  <span class="c1">// so JSON.parse throws</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;It worked!&quot;</span><span class="p">,</span> <span class="nx">data</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Instead, this happens:</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;It failed!&quot;</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
<span class="p">})</span></code></pre></div>


### Error handling in practice

With our story and chapters, we can use catch to display an error to the user:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter1</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter1</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Failed to show chapter&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


If fetching `story.chapterUrls[0]` fails (eg http 500 or user is offline), it'll skip all following success callbacks, which includes the one in `getJSON` which tries to parse the response as JSON, and also skips the callback that adds chapter1.html to the page. Instead it moves onto the catch callback. As a result, "Failed to show chapter" will be added to the page if any of the previous actions failed.

Like JavaScript's try/catch, the error is caught and subsequent code continues, so the spinner is always hidden, which is what we want. The above becomes a non-blocking async version of:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="k">try</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">story</span> <span class="o">=</span> <span class="nx">getJSONSync</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">chapter1</span> <span class="o">=</span> <span class="nx">getJSONSync</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter1</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
<span class="p">}</span>
<span class="k">catch</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Failed to show chapter&quot;</span><span class="p">);</span>
<span class="p">}</span>

<span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span></code></pre></div>


You may want to "catch" simply for logging purposes, without recovering from the error. To do this, just rethrow the error. We could do this in our `getJSON` method:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">url</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="nx">get</span><span class="p">(</span><span class="nx">url</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;getJSON failed for&quot;</span><span class="p">,</span> <span class="nx">url</span><span class="p">,</span> <span class="nx">err</span><span class="p">);</span>
    <span class="k">throw</span> <span class="nx">err</span><span class="p">;</span>
  <span class="p">});</span>
<span class="p">}</span></code></pre></div>

So we've managed to fetch one chapter, but we want them all. Let's make that happen.


## Parallelism and sequencing - Getting the best of both


Thinking async isn't easy. If you're struggling to get off the mark, try writing the code as if it were synchronous. In this case:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="k">try</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">story</span> <span class="o">=</span> <span class="nx">getJSONSync</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">);</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

  <span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">chapter</span> <span class="o">=</span> <span class="nx">getJSONSync</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">);</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
  <span class="p">});</span>

  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
<span class="p">}</span>
<span class="k">catch</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">}</span>

<span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span></code></pre></div>

<a href="/web/resources/samples/fundamentals/primers/promises/sync-example.html">see example</a>
That works (<a href="/web/resources/samples/fundamentals/primers/promises/sync-example.html">see example</a>)!
But it's sync and locks up the browser while things download. To make this
work async we use "then" to make things happen one after another.


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

  <span class="c1">// TODO: for each url in story.chapterUrls, fetch &amp;amp; display</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// And we&#39;re all done!</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Catch any error that happened along the way</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Always hide the spinner</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


But how can we loop through the chapter urls and fetch them in order? This **doesn't work**:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Fetch chapter</span>
  <span class="nx">getJSON</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// and add it to the page</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">})</span></code></pre></div>


`forEach` isn't async-aware, so our chapters would appear in whatever order they download, which is basically how Pulp Fiction was written. This isn't Pulp Fiction, so let's fix it…


### Creating a sequence
We want to turn our `chapterUrls` array into a sequence of promises. We can do that using "then":


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="c1">// Start off with a promise that always resolves</span>
<span class="kd">var</span> <span class="nx">sequence</span> <span class="o">=</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">();</span>

<span class="c1">// Loop through our chapter urls</span>
<span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Add these actions to the end of the sequence</span>
  <span class="nx">sequence</span> <span class="o">=</span> <span class="nx">sequence</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">);</span>
  <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">})</span></code></pre></div>


This is the first time we've seen `Promise.resolve`, which creates a promise that resolves to whatever value you give it. If you pass it an instance of `Promise` it'll simply return it (**note:** this is a change to the spec that some implementations don't yet follow). If you pass it something promise-like (has a 'then' method), it creates a genuine `Promise` that fulfills/rejects in the same way. If you pass in any other value, eg `Promise.resolve('Hello')`, it creates a promise that fulfills with that value. If you call it with no value, as above, it fulfills with "undefined".


There's also `Promise.reject(val)`, which creates a promise that rejects with the value you give it (or undefined).

We can tidy up the above code using [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="c1">// Loop through our chapter urls</span>
<span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">reduce</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">sequence</span><span class="p">,</span> <span class="nx">chapterUrl</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Add these actions to the end of the sequence</span>
  <span class="k">return</span> <span class="nx">sequence</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
    <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">);</span>
  <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">},</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">())</span></code></pre></div>


This is doing the same as the previous example, but doesn't need the separate "sequence" variable. Our reduce callback is called for each item in the array. "sequence" is `Promise.resolve()` the first time around, but for the rest of the calls "sequence" is whatever we returned from the previous call. `array.reduce` is really useful for boiling an array down to a single value, which in this case is a promise.

Let's put it all together…


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

  <span class="k">return</span> <span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">reduce</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">sequence</span><span class="p">,</span> <span class="nx">chapterUrl</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// Once the last chapter&#39;s promise is done…</span>
    <span class="k">return</span> <span class="nx">sequence</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
      <span class="c1">// …fetch the next chapter</span>
      <span class="k">return</span> <span class="nx">getJSON</span><span class="p">(</span><span class="nx">chapterUrl</span><span class="p">);</span>
    <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// and add it to the page</span>
      <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
    <span class="p">});</span>
  <span class="p">},</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">());</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// And we&#39;re all done!</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Catch any error that happened along the way</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// Always hide the spinner</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


And there we have it (<a href="/web/resources/samples/fundamentals/primers/promises/async-example.html">see example</a>), a fully async version of the sync version. But we can do better. At the moment our page is downloading like this:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Browsers are pretty good at downloading multiple things at once, so we're losing performance by downloading chapters one after the other. What we want to do is download them all at the same time, then process them when they've all arrived. Thankfully there's an API for this:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span><span class="nx">arrayOfPromises</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">arrayOfResults</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">//...</span>
<span class="p">})</span></code></pre></div>


`Promise.all` takes an array of promises and creates a promise that fulfills when all of them successfully complete. You get an array of results (whatever the promises fulfilled to) in the same order as the promises you passed in.


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

  <span class="c1">// Take an array of promises and wait on them all</span>
  <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">all</span><span class="p">(</span>
    <span class="c1">// Map our array of chapter urls to</span>
    <span class="c1">// an array of chapter json promises</span>
    <span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">getJSON</span><span class="p">)</span>
  <span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapters</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// Now we have the chapters jsons in order! Loop through…</span>
  <span class="nx">chapters</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// …and add to the page</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
  <span class="p">});</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// catch any error that happened so far</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


Depending on connection, this can be seconds faster than loading one-by-one (<a href="/web/resources/samples/fundamentals/primers/promises/async-all-example.html">see example</a>), and it's less code than our first try. The chapters can download in whatever order, but they appear on screen in the right order.


<figure>
  <img src="imgs/promise2.gif">
</figure>

However, we can still improve perceived performance. When chapter one arrives we should add it to the page. This lets the user start reading before the rest of the chapters have arrived. When chapter three arrives, we wouldn't add it to the page because the user may not realise chapter two is missing. When chapter two arrives, we can add chapters two and three, etc etc.

To do this, we fetch JSON for all our chapters at the same time, then create a sequence to add them to the document:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">story</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

  <span class="c1">// Map our array of chapter urls to</span>
  <span class="c1">// an array of chapter json promises.</span>
  <span class="c1">// This makes sure they all download parallel.</span>
  <span class="k">return</span> <span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">getJSON</span><span class="p">)</span>
    <span class="p">.</span><span class="nx">reduce</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">sequence</span><span class="p">,</span> <span class="nx">chapterPromise</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// Use reduce to chain the promises together,</span>
      <span class="c1">// adding content to the page for each chapter</span>
      <span class="k">return</span> <span class="nx">sequence</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
        <span class="c1">// Wait for everything in the sequence so far,</span>
        <span class="c1">// then wait for this chapter to arrive.</span>
        <span class="k">return</span> <span class="nx">chapterPromise</span><span class="p">;</span>
      <span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">chapter</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
      <span class="p">});</span>
    <span class="p">},</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">());</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
<span class="p">}).</span><span class="k">catch</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// catch any error that happened along the way</span>
  <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
<span class="p">}).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


And there we go (<a href="/web/resources/samples/fundamentals/primers/promises/async-best-example.html">see example</a>), the best of both! It takes the same amount of time to deliver all the content, but the user gets the first bit of content sooner.


<figure>
  <img src="imgs/promise3.gif">
</figure>

In this trivial example, all of the chapters arrive around the same time, but the benefit of displaying one at a time will be exaggerated with more, larger chapters.


Doing the above with [Node.js-style callbacks or events](https://gist.github.com/jakearchibald/0e652d95c07442f205ce) is around double the code, but more importantly isn't as easy to follow. However, this isn't the end of the story for promises, when combined with other ES6 features they get even easier…


## Bonus round: Promises and Generators


This next bit involves a whole bunch of new ES6 features, but it's not something you need to understand to use promises in your code today. Treat it like a movie trailer for some upcoming blockbuster features.

ES6 also gives us [generators](http://wiki.ecmascript.org/doku.php?id=harmony:generators), which allow functions to exit at a particular point, like "return", but later resume from the same point and state. Eg:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="o">*</span><span class="nx">addGenerator</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span>
  <span class="k">while</span> <span class="p">(</span><span class="kc">true</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">i</span> <span class="o">+=</span> <span class="k">yield</span> <span class="nx">i</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">}</span></code></pre></div>

Notice the star before the function name, this makes it a generator. The yield keyword is our return/resume point. We can use it like this:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">adder</span> <span class="o">=</span> <span class="nx">addGenerator</span><span class="p">();</span>
<span class="nx">adder</span><span class="p">.</span><span class="nx">next</span><span class="p">().</span><span class="nx">value</span><span class="p">;</span> <span class="c1">// 0</span>
<span class="nx">adder</span><span class="p">.</span><span class="nx">next</span><span class="p">(</span><span class="mi">5</span><span class="p">).</span><span class="nx">value</span><span class="p">;</span> <span class="c1">// 5</span>
<span class="nx">adder</span><span class="p">.</span><span class="nx">next</span><span class="p">(</span><span class="mi">5</span><span class="p">).</span><span class="nx">value</span><span class="p">;</span> <span class="c1">// 10</span>
<span class="nx">adder</span><span class="p">.</span><span class="nx">next</span><span class="p">(</span><span class="mi">5</span><span class="p">).</span><span class="nx">value</span><span class="p">;</span> <span class="c1">// 15</span>
<span class="nx">adder</span><span class="p">.</span><span class="nx">next</span><span class="p">(</span><span class="mi">50</span><span class="p">).</span><span class="nx">value</span><span class="p">;</span> <span class="c1">// 65</span></code></pre></div>

But what does this mean for promises? Well, you can use this return/resume behaviour to write async code that looks like (and is as easy to follow as) synchronous code. Don't worry too much about understanding it line-for-line, but here's a helper function that lets us use 'yield' to wait for promises to settle:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">function</span> <span class="nx">spawn</span><span class="p">(</span><span class="nx">generatorFunc</span><span class="p">)</span> <span class="p">{</span>
  <span class="kd">function</span> <span class="nx">continuer</span><span class="p">(</span><span class="nx">verb</span><span class="p">,</span> <span class="nx">arg</span><span class="p">)</span> <span class="p">{</span>
    <span class="kd">var</span> <span class="nx">result</span><span class="p">;</span>
    <span class="k">try</span> <span class="p">{</span>
      <span class="nx">result</span> <span class="o">=</span> <span class="nx">generator</span><span class="p">[</span><span class="nx">verb</span><span class="p">](</span><span class="nx">arg</span><span class="p">);</span>
    <span class="p">}</span> <span class="k">catch</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
      <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">reject</span><span class="p">(</span><span class="nx">err</span><span class="p">);</span>
    <span class="p">}</span>
    <span class="k">if</span> <span class="p">(</span><span class="nx">result</span><span class="p">.</span><span class="nx">done</span><span class="p">)</span> <span class="p">{</span>
      <span class="k">return</span> <span class="nx">result</span><span class="p">.</span><span class="nx">value</span><span class="p">;</span>
    <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
      <span class="k">return</span> <span class="nx">Promise</span><span class="p">.</span><span class="nx">resolve</span><span class="p">(</span><span class="nx">result</span><span class="p">.</span><span class="nx">value</span><span class="p">).</span><span class="nx">then</span><span class="p">(</span><span class="nx">onFulfilled</span><span class="p">,</span> <span class="nx">onRejected</span><span class="p">);</span>
    <span class="p">}</span>
  <span class="p">}</span>
  <span class="kd">var</span> <span class="nx">generator</span> <span class="o">=</span> <span class="nx">generatorFunc</span><span class="p">();</span>
  <span class="kd">var</span> <span class="nx">onFulfilled</span> <span class="o">=</span> <span class="nx">continuer</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">continuer</span><span class="p">,</span> <span class="s2">&quot;next&quot;</span><span class="p">);</span>
  <span class="kd">var</span> <span class="nx">onRejected</span> <span class="o">=</span> <span class="nx">continuer</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">continuer</span><span class="p">,</span> <span class="s2">&quot;throw&quot;</span><span class="p">);</span>
  <span class="k">return</span> <span class="nx">onFulfilled</span><span class="p">();</span>
<span class="p">}</span></code></pre></div>

…which I pretty much [lifted verbatim from Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500), but adapted for JavaScript promises. With this, we can take our final best-case chapter example, mix it with a load of new ES6 goodness, and turn it into:


<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">spawn</span><span class="p">(</span><span class="kd">function</span> <span class="o">*</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">try</span> <span class="p">{</span>
    <span class="c1">// &#39;yield&#39; effectively does an async wait,</span>
    <span class="c1">// returning the result of the promise</span>
    <span class="kd">let</span> <span class="nx">story</span> <span class="o">=</span> <span class="k">yield</span> <span class="nx">getJSON</span><span class="p">(</span><span class="s1">&#39;story.json&#39;</span><span class="p">);</span>
    <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">story</span><span class="p">.</span><span class="nx">heading</span><span class="p">);</span>

    <span class="c1">// Map our array of chapter urls to</span>
    <span class="c1">// an array of chapter json promises.</span>
    <span class="c1">// This makes sure they all download parallel.</span>
    <span class="kd">let</span> <span class="nx">chapterPromises</span> <span class="o">=</span> <span class="nx">story</span><span class="p">.</span><span class="nx">chapterUrls</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="nx">getJSON</span><span class="p">);</span>

    <span class="k">for</span> <span class="p">(</span><span class="kd">let</span> <span class="nx">chapterPromise</span> <span class="nx">of</span> <span class="nx">chapterPromises</span><span class="p">)</span> <span class="p">{</span>
      <span class="c1">// Wait for each chapter to be ready, then add it to the page</span>
      <span class="kd">let</span> <span class="nx">chapter</span> <span class="o">=</span> <span class="k">yield</span> <span class="nx">chapterPromise</span><span class="p">;</span>
      <span class="nx">addHtmlToPage</span><span class="p">(</span><span class="nx">chapter</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span>
    <span class="p">}</span>

    <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;All done&quot;</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="k">catch</span> <span class="p">(</span><span class="nx">err</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// try/catch just works, rejected promises are thrown here</span>
    <span class="nx">addTextToPage</span><span class="p">(</span><span class="s2">&quot;Argh, broken: &quot;</span> <span class="o">+</span> <span class="nx">err</span><span class="p">.</span><span class="nx">message</span><span class="p">);</span>
  <span class="p">}</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;.spinner&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
<span class="p">})</span></code></pre></div>


This works exactly as before, but so much easier to read. This works in Chrome and Opera today (<a href="/web/resources/samples/fundamentals/primers/promises/async-generators-example.html">see example</a>), and works in Microsoft Edge by going to `about:flags` and turning on the **Enable experimental Javascript features** setting. This will be enabled by default in an upcoming version.


This throws together a lot of new ES6 stuff: promises, generators, let, for-of. When we yield a promise, the spawn helper waits for the promise to resolve and returns the final value. If the promise rejects, spawn causes our yield statement to throw an exception, which we can catch with normal JavaScript try/catch. Amazingly simple async coding!


This pattern is so useful, it's coming to ES7 in the form of [async functions](https://jakearchibald.com/2014/es7-async-functions/). It's pretty much the same as above, but no need for a `spawn` method.


## Promise API Reference

All methods work in Chrome, Opera, Firefox, Microsoft Edge, and Safari unless otherwise noted. [The polyfill](https://github.com/jakearchibald/ES6-Promises#readme) provides the below for all browers.


### Static Methods

#### `Promise.resolve(promise);`
Returns promise (only if `promise.constructor == Promise`)

#### `Promise.resolve(thenable);`
Make a new promise from the thenable. A thenable is promise-like in as far as it has a "then" method.


#### `Promise.resolve(obj);`
Make a promise that fulfills to `obj`.` in this situation.

#### `Promise.reject(obj);`
Make a promise that rejects to `obj`. For consistency and debugging (e.g. stack traces), `obj` should be an `instanceof Error`.

#### `Promise.all(array);`
Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects. Each array item is passed to `Promise.resolve`, so the array can be a mixture of promise-like objects and other objects. The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.

#### `Promise.race(array);`
Make a Promise that fulfills as soon as any item fulfills, or rejects as soon as any item rejects, whichever happens first.

**Note:** I'm unconvinced of `Promise.race`'s usefulness; I'd rather have an opposite of `Promise.all` that only rejects if all items reject.

### Constructor
<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="k">new</span> <span class="nx">Promise</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">resolve</span><span class="p">,</span> <span class="nx">reject</span><span class="p">)</span> <span class="p">{});</span></code></pre></div>

#### `resolve(thenable)`
Your promise will be fulfilled/rejected with the outcome of `thenable`

#### `resolve(obj)`
Your promise is fulfilled with `obj`

#### `reject(obj)`
Your promise is rejected with `obj`. For consistency and debugging (eg stack traces), obj should be an `instanceof Error`. Any errors thrown in the constructor callback will be implicitly passed to `reject()`.

### Instance Methods

#### `promise.then(onFulfilled, onRejected)`
`onFulfilled` is called when/if "promise" resolves. `onRejected` is called when/if "promise" rejects. Both are optional, if either/both are omitted the next `onFulfilled`/`onRejected` in the chain is called. Both callbacks have a single parameter, the fulfillment value or rejection reason. "then" returns a new promise equivalent to the value you return from `onFulfilled`/`onRejected` after being passed through `Promise.resolve`. If an error is thrown in the callback, the returned promise rejects with that error.

#### `promise.catch(onRejected)`
Sugar for `promise.then(undefined, onRejected)`


Many thanks to Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans, and Yutaka Hirano who proofread this and made corrections/recommendations.

Also, thanks to [Mathias Bynens](https://mathiasbynens.be/) for [updating various parts](https://github.com/html5rocks/www.html5rocks.com/pull/921/files) of the article.

