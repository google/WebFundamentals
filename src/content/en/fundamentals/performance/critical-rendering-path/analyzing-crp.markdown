---
layout: shared/narrow
title: "Analyzing critical rendering path performance"
description: "Learn to identify and resolve critical rendering path performance bottlenecks."
published_on: 2014-04-01
updated_on: 2014-04-28
order: 7
translation_priority: 0
authors:
  - ilyagrigorik
---

<p class="intro">
  Identifying and resolving critical rendering path performance bottlenecks 
  requires good knowledge of the common pitfalls. Let's take a hands-on tour 
  and extract common performance patterns that will help you optimize your 
  pages.
</p>

{% include shared/toc.liquid %}

The goal of optimizing the critical rendering path is to allow the browser to paint the page as quickly as possible: faster pages translate to higher engagement, number of pages viewed, and [improved conversion](https://www.google.com/think/multiscreen/success.html). As a result, we want to minimize the amount of time the visitor has to spend staring at a blank screen by optimizing which resources are loaded and in which order.

To help illustrate this process, let's start with the simplest possible case and incrementally build up our page to include additional resources, styles, and application logic - in the process, we'll also see where things can go wrong, and how to optimize each of these cases.

Finally, one more thing before we start... So far we've focused exclusively on what happens in the browser once the resource (CSS, JS, or HTML file) is available to process and have ignored the time to fetch it either from cache or from the network. We'll dive into how to optimize the networking aspects of our application in great detail in the next lesson but in the meantime (to make things more realistic) we'll assume the following:

* A network roundtrip (propagation latency) to the server will cost 100ms
* Server response time will be 100ms for the HTML document and 10ms for all other files

## The Hello World experience

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

We'll start with basic HTML markup and a single image - no CSS or JavaScript - which is about as simple as it gets. Now let's open up our Network timeline in Chrome DevTools and inspect the resulting resource waterfall:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

As expected, the HTML file took ~200ms to download. Note that the transparent portion of the blue line indicates the time the browser is waiting on the network - i.e. no response bytes have yet been received - whereas the solid portion shows the time to finish the download after the first response bytes have been received. In our example above, the HTML download is tiny (<4K), so all we need is a single roundtrip to fetch the full file. As a result, the HTML document takes ~200ms to fetch, with half the time spent waiting on the network and other half on the server response.

Once the HTML content becomes available, the browser has to parse the bytes, convert them into tokens, and build the DOM tree. Notice that DevTools conveniently reports the time for DOMContentLoaded event at the bottom (216ms), which also corresponds to the blue vertical line. The gap between the end of the HTML download and the blue vertical line (DOMContentLoaded) is the time it took the browser to build the DOM tree - in this case,  just a few milliseconds.

Finally, notice something interesting: our "awesome photo" did not block the domContentLoaded event! Turns out, we can construct the render tree and even paint the page without waiting for each and every asset on the page: **not all resources are critical to deliver the fast first paint**. In fact, as we will see, when we talk about the critical rendering path we are typically talking about the HTML markup, CSS, and JavaScript. Images do not block the initial render of the page - although, of course, we should try to make sure that we get the images painted as soon as possible also!

That said, the "load" event (also commonly known as "onload"), is blocked on the image: DevTools reports the onload event at 335ms. Recall that the onload event marks the point when **all resources** required by the page have been downloaded and processed - this is the point when the loading spinner can stop spinning in the browser and this point is marked by the red vertical line in the waterfall.


## Adding JavaScript and CSS into the mix

Our "Hello World experience" page may seem simple on the surface, but there is a lot going on under the hood to make it all happen! That said, in practice we'll also need more than just the HTML: chances are, we'll have a CSS stylesheet and one or more scripts to add some interactivity to our page. Let's add both to the mix and see what happens:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Before adding JavaScript and CSS:_

<img src="images/waterfall-dom.png" alt="DOM CRP" class="center">

_With JavaScript and CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Adding external CSS and JavaScript files added two extra requests to our waterfall, all of which are dispatched at about the same time by the browser - so far so good. However, **note that there is now a much smaller timing difference between the domContentLoaded and onload events. What happened?**

* Unlike our plain HTML example, we now also need to fetch and parse the CSS file to construct the CSSOM, and we know that we need both the DOM and CSSOM to build the render tree.
* Because we also have a parser blocking JavaScript file on our page, the domContentLoaded event is blocked until the CSS file is downloaded and parsed: the JavaScript may query the CSSOM, hence we must block and wait for CSS before we can execute JavaScript.

**What if we replace our external script with an inline script?** A trivial question on the surface but actually its very tricky. Turns out, even if the script is inlined directly into the page the only reliable way for the browser to know what that script is intending to do is, well, to execute it, and as we already know, we can't do that until the CSSOM is constructed.  In short, inlined JavaScript is also parser blocking.

That said, despite blocking on CSS, will inlining the script make the page render faster? If the last scenario was tricky, then this one is even more so! Let's try it and see what happens...

_External JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Inlined JavaScript:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM, and inlined JS" class="center">

We are making one less request, but our onload and domContentLoaded times are effectively the same, why? Well, we know that it doesn't matter if the JavaScript is inlined or external, because as soon as the browser hits the script tag it will block and wait until the CSSOM is constructed. Further, in our first example, both CSS and JavaScript are being downloaded in parallel by the browser and finish at about the same time. As a result, in this particular instance, inlining the JavaScript code doesn't help us much! Hmm, so are we stuck and is there nothing that we can do to make our page render faster? Actually, we have several different strategies.

First, recall that all inline scripts are parser blocking, but for external scripts we can add the "async" keyword to unblock the parser. Let's undo our inlining and give that a try:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_Parser-blocking (external) JavaScript:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_Async (external) JavaScript:_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, async JS" class="center">

Much better! The `domContentLoaded` event fires shortly after the HTML is parsed: the browser knows not to block on JavaScript and since there are no other parser blocking scripts the CSSOM construction can also proceed in parallel.

Alternatively, we could have tried a different approach and inlined both the CSS and JavaScript:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, inline CSS, inline JS" class="center">

Notice that the `domContentLoaded` time is effectively the same as in the previous example: instead of marking our JavaScript as async, we've inlined both the CSS and JS into the page itself. This made our HTML page much larger, but the upside is that the browser doesn't have to wait to fetch any external resources - everything is right there in the page.

As you can see, even with a very simple page, optimizing the critical rendering path is a non-trivial exercise: we need to understand the dependency graph between different resources, we need to identify which resources are "critical," and we must choose among different strategies for how to include those resources on the page. There is no one solution to this problem - each page is different, and you'll have to follow a similar process on your own to figure out the optimal strategy.

That said, let's see if we can step back and identify some general performance patterns…

## Performance Patterns

The simplest possible page consists of just the HTML markup: no CSS, no JavaScript, or other types of resources. To render this page the browser has to initiate the request, wait for the HTML document to arrive, parse it, build the DOM, and then finally render it on the screen:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="Hello world CRP" class="center">

**The time between T<sub>0</sub> and T<sub>1</sub> captures the network and server processing times.** In the best case (if the HTML file is small), all we will need is just one network roundtrip to fetch the entire document - due to how the TCP transports protocols work, larger files may require more roundtrips, this is a topic we'll come back to in a future lesson. **As a result, we can say that the above page, in the best case, has a one roundtrip (minimum) critical rendering path.**

Now, let's consider the same page but with an external CSS file:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

Once again, we incur a network roundtrip to fetch the HTML document and then the retrieved markup tells us that we will also need the CSS file: this means that the browser has to go back to the server and get the CSS before it can render the page on the screen. **As a result, this page will incur a minimum of two roundtrips before the page can be displayed** - once again, the CSS file may take multiple roundtrips, hence the emphasis on "minimum".

Let's define the vocabulary we'll be using to describe the critical rendering path:

* **Critical Resource:** resource that may block initial rendering of the page.
* **Critical Path Length:** number of roundtrips, or the total time required to fetch all of the critical resources.
* **Critical Bytes:** total amount of bytes required to get to first render of the page, which is the sum of the transfer filesizes of all critical resources.
Our first example with a single HTML page contained a single critical resource (the HTML document), the critical path length was also equal to 1 network roundtrip (assuming file is small), and the total critical bytes was just the transfer size of the HTML document itself.

Now let's compare that to the critical path characteristics of the HTML + CSS example above:

<img src="images/analysis-dom-css.png" alt="DOM + CSSOM CRP" class="center">

* **2** critical resources
* **2** or more roundtrips for the minimum critical path length
* **9** KB of critical bytes

We need both the HTML and CSS to construct the render tree, as a result both HTML and CSS are critical resources: the CSS is fetched only after the browser gets the HTML document, hence the critical path length is at minimum two roundtrips; both resources add up to a total of 9KB of critical bytes.

Ok, now let's add an extra JavaScript file into the mix!

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

We added app.js, which is an external JavaScript asset on the page, and as we know by now, it is a parser blocking (i.e. critical) resource. Worse, in order to execute the JavaScript file we will also have to block and wait for CSSOM - recall that JavaScript can query the CSSOM and hence the browser will pause until "style.css" is downloaded and CSSOM is constructed.

<img src="images/analysis-dom-css-js.png" alt="DOM, CSSOM, JavaScript CRP" class="center">

That said, in practice if we look at the "network waterfall" of this page you'll notice that both the CSS and JavaScript requests will be initiated at about the same time: the browser gets the HTML, discovers both resources and initiates both requests. As a result, the above page has the following critical path characteristics:

* **3** critical resources
* **2** or more roundtrips for the minimum critical path length
* **11** KB of critical bytes

We now have three critical resources that add up to 11KB of critical bytes, but our critical path length is still two roundtrips because we can transfer the CSS and JavaScript in parallel! **Figuring out the characteristics of your critical rendering path means being able to identify which are the critical resources, and also understanding how the browser will schedule their fetches.** Let's continue with our example…

After chatting with our site developers we realized that the JavaScript we included on our page doesn't need to be blocking: we have some analytics and other code in there that doesn't need to block the rendering of our page. Knowing that, we can add the "async" attribute to the script tag to unblock the parser:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="DOM, CSSOM, async JavaScript CRP" class="center">

Making the script asynchronous has several advantages:

* The script is no longer parser blocking and is not part of the critical rendering path
* Because there are no other critical scripts, the CSS also does not need to block the domContentLoaded event
* The sooner the domContentLoaded event fires, the sooner other application logic can begin executing

As a result, our optimized page is now back to two critical resources (HTML and CSS), with a minimum critical path length of two roundtrips, and a total of 9KB of critical bytes.

Finally, let's say the CSS stylesheet was only needed for print? How would that look?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, non-blocking CSS, and async JavaScript CRP" class="center">

Because the style.css resource is only used for print, the browser does not need to block on it to render the page. Hence, as soon as DOM construction is complete, the browser has enough information to render the page! As a result, this page has only a single critical resource (the HTML document), and the minimum critical rendering path length is one roundtrip.
