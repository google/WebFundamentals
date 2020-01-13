project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Priority Hints provide developers a way to indicate a resource's relative importance to the browser, allowing more control over the order resources are loaded.

{# wf_updated_on: 2019-09-13 #}
{# wf_published_on: 2019-02-14 #}
{# wf_tags: fundamentals, performance #}
{# wf_featured_image: /web/updates/images/2019/02/priority-hints/image1.png #}
{# wf_featured_snippet: Priority Hints are coming to an Origin Trial near you! Try them out! #}
{# wf_blink_components: Blink>Loader #}


{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/contributors/yoavweiss.html" %}
{% include "web/_shared/contributors/jeremywagner.html" %}


# Get Ready for Priority Hints {: .page-title }

As performance becomes increasingly important, it's exciting to see browsers
implement new features which give developers more control over resource
loading. Resource Hints such as
<code>[rel=preload](/web/fundamentals/performance/resource-prioritization#preload)</code>
and
<code>[rel=preconnect](/web/fundamentals/performance/resource-prioritization#preconnect)</code>
give developers more control over resource loading and connections to
cross-origin servers, respectively. [Client
Hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
expose details of a user's device and preferences that developers can use to
improve performance in nuanced ways. Continuing in this vein, a new
experimental feature known as [Priority
Hints](https://wicg.github.io/priority-hints/) is available through an [Origin
Trial](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/developer-guide.md)
in Chrome Beta which will allow you to tell the browser how resources should be
prioritized.


## Resource priority? What's that?

When a browser downloads a resource, the resource is assigned a priority. [By
default](/web/fundamentals/performance/resource-prioritization#default_priorities_in_the_browser),
priorities depend on the _type_ of resource (e.g., script, image, etc.), and
the location of the resource reference in the document. For example in Chrome,
CSS loaded in typical fashion via the `<link>` element in the `<head>` will be
assigned a priority of **highest**, as it blocks rendering.  Images in the
viewport may be assigned a priority of **high**, whereas images outside the
viewport may be assigned a priority of **low**. A `<script>` loaded at the
end of the document may receive a priority assignment of **medium** or **low**,
but this can be influenced by
<code>[defer](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-defer)</code>
and
<code>[async](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#attr-async)</code>.


![Resources and their priorities](../../images/2019/02/priority-hints/image1.png "Resources and
their priorities in Chrome DevTools network panel")


**_Figure 1. A list of resources and their corresponding priorities in the
network panel of DevTools._**

For a long time, we've had little control over resource priority beyond
[modifying the critical rendering
path](/web/fundamentals/performance/critical-rendering-path/) until
`rel=preload` came around. `rel=preload` changes the discovery order of a
resource by telling the browser about it before the browser would otherwise
find it in due course. At the same time, `rel=preload` doesn't _reprioritize_
the resource, but only sets it the default priority for that particular
resource type. Regardless, there are times when browsers prioritize resources
in undesirable ways in specific situations: async scripts may be assumed to be
of low priority when that may not have been the author's intent, images may be
of higher priority than, e.g., non-critical stylesheets, etc. These are the
kind of situations Priority Hints can help developers address.


## Using priority hints

Priority Hints can be set for resources in HTML by specifying an `importance`
attribute on a `<script>`, `<img>`, or `<link>` element (though other
elements such as `<iframe>` may see support later). An example can be something
like this:


``` 
<!-- An image the browser assigns "High" priority, but we don't actually want that. -->
<img src="/images/in_viewport_but_not_important.svg" importance="low" alt="I'm an unimportant image!">
```


The `importance` attribute accepts one of three values:



*   `high:` The resource may be prioritized, if the browser's own heuristics
    don't prevent that from happening.
*   `low:` The resource may be *de*prioritized, if the browser's heuristics
    permit.
*   `auto`: Let the browser decide what priority is appropriate for a resource.
    This is the default value.

Because `<link>` elements are affected by the `importance` attribute, this
means priority can be changed not only for typical stylesheet includes, but
also for `rel=preload` hints:


```
<!-- We want to initiate an early fetch for a resource, but also deprioritize it -->
<link rel="preload" href="/js/script.js" as="script" importance="low">
```


Priority Hints aren't restricted to HTML usage. You can also change the
priority of
<code>[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)</code>
requests via the <code>importance</code> option, which takes the same values as
the HTML attribute:


```
fetch("https://example.com/", {importance: "low"}).then(data => {
    // Do whatever you normally would with fetch data
});
```


Priority Hints have a slightly different impact depending on your network
stack. With HTTP/1.X, the only way for the browser to prioritize resources is
to delay their requests from going out. As a result, lower priority requests
simply hit the network after high priority ones, assuming that there are higher
priority requests in the queue. If there aren't, the browser may still delay
some low priority requests if it predicts that higher priority requests will
come along soon (e.g., if the document's `<head>` is still open and rendering
critical resources are likely to be discovered there).

With HTTP/2, the browser may still delay some low-priority requests, but on top
of that, it can also set their resource's [stream
priority](https://http2.github.io/http2-spec/#StreamPriority) to a lower level,
enabling the server to better prioritize the resources it is sending down.



---


**_Note_**: Priority Hints in its current form does not affect
`<iframe>` elements, but may, as the implementation matures. This
could be useful for demoting priority of third party `<iframe>`s and
their subresources.



---


So in what circumstances might Priority Hints come in useful? Let's take a look
at some quick use cases and find out!


## How can I tell if Priority Hints works?

The easiest way to tell if Priority Hints are working is to load your site,
open the network panel in DevTools, and ensure the Priority column is checked
by right clicking on any of the column headers and potentially enabling it.




![DevTools network panel header context menu](../../images/2019/02/priority-hints/image3.png
"DevTools network panel header context menu")


**_Figure 2. The header options context menu in the network panel of DevTools
with the Priority option highlighted._**

Once enabled, the priority information for resources will be visible as shown
in Figure 1. From here, pick any resource in the list and look at its priority.
For example, I've chosen a script assigned a low priority in the browser:



![Low priority script resource](../../images/2019/02/priority-hints/image2.png "Low priority script
resource")

**_Figure 3. A script element listed in DevTools given a low priority._**

This script is requested via a `<script>` tag in the footer and uses the
defer attribute as well, which causes the browser to lower this script's
priority. Let's change that and give it an `importance` attribute with a value
of `high`:


```
<script src="/js/app.js" defer importance="high"></script>
```


When this change is made and deployed, I reload the page and check the value of
the Priority column for the script, which should now be given a higher
priority:



![High priority script resource](../../images/2019/02/priority-hints/image4.png "High priority
script resource")


**_Figure 4. A script element listed in DevTools given a high priority._**

That's pretty much how it works: If you drop a hint that you would like an
element to be prioritized differently, check that resource's priority value in
DevTools. If it changes, your priority hint did something!


## Use cases

Resource priorities are nuanced and fluctuate based on a number of factors
determined by the browser. Once you modify them, the effect can start to become
a little less clear. Let's take a look at a few cases where Priority Hints can
improve performance.


### Deprioritizing images

Browsers do their best to assign reasonable priorities for images so that those
in the viewport appear as soon as reasonably possible. In most cases, that's
what you want them to do, but what if some above the fold imagery just isn't as
important as other page resources? Priority Hints may provide a solution for
that.

Here's a common scenario: A carousel of images is at the top of a page with the
first slide visible and the remaining slides invisible. The markup of this
carousel might look something like this:


```
<ul class="carousel">
    <!-- This item is visible, since it's the first. -->
    <li class="carousel__item"><img src="img/carousel-1.jpg" alt="I'm a carousel image!"></li>
    <!-- The next few, not so much, as they are hidden by CSS, or occluded by other elements. -->
    <li class="carousel__item"><img src="img/carousel-2.jpg" alt="I'm a carousel image!"></li>
    <li class="carousel__item"><img src="img/carousel-3.jpg" alt="I'm a carousel image!"></li>
    <li class="carousel__item"><img src="img/carousel-4.jpg" alt="I'm a carousel image!"></li>
</ul>
```


Because of browser heuristics, all four images may be given a high priority
ranking, even though three of them are not initially visible. The browser can't
really know when those image will actually be scrolled into view, so the
cautious thing to do here is to consider them "in the viewport". At the same
time, that may not be the desired outcome from the developer's perspective, as
they know that those images are of lower priority than the `async` script that
is responsible for making the carousel interactive in the first place.

They _could_ use `rel=preload` to preload the first image in the carousel, but
doing so may not provide the outcome we expect: Using `rel=preload` may
effectively prioritize that image above everything else, and if that image is
large, it may block rendering as it will get downloaded before critical
stylesheets or blocking scripts. Priority Hints may be the solution here:


```
<ul class="carousel">
    <!-- We'll let the browser know this image is important: -->
    <li class="carousel__item"><img src="img/carousel-1.jpg" alt="I'm a carousel image!" importance="high"></li>
    <!-- But we'll set the less-important ones to low priority: -->
    <li class="carousel__item"><img src="img/carousel-2.jpg" alt="I'm a carousel image!" importance="low"></li>
    <li class="carousel__item"><img src="img/carousel-3.jpg" alt="I'm a carousel image!" importance="low"></li>
    <li class="carousel__item"><img src="img/carousel-4.jpg" alt="I'm a carousel image!" importance="low"></li>
</ul>
```


When we assign the off-screen images low priority, this will create less
contention between the remaining high priority images and other high priority
resources.


### Re-prioritizing scripts

The priority of script resource downloads varies wildly in Chrome depending on
the script tag's location in the HTML, and on whether the script is declared as
`async` or `defer`. That means that as a developer, when you avoid making your
script a blocking one (which is a known best-practice), you're also implicitly
telling the browser that your script is not that important.

While those heuristics work well for many common cases, they may not work well
for you.

Maybe you're trying to load a critical script, but in a non-blocking way, so
you've made it `async` to make sure it runs whenever it is available. One
example for that may be a script that's responsible for parts of the page's
interaction, but which shouldn't block rendering.

Alternatively, maybe you have a blocking script at the bottom of the page (as
it relies on running in a specific DOM state), but at the same time, it should
not necessarily run before other async scripts, and therefore can be
deprioritized.

There exist various hacks that enable you to work around some of these
heuristics, but Priority Hints enable you to explicitly declare your intention
to the browser and have it do the right thing.

So, if you wanted to prioritize an async script, you could indicate:


```
<script src="async_but_important.js" async importance="high"></script>
```


Similarly, for a bottom-of-the-page blocking script, you could indicate the
fact that it's less important than other resources, by stating it explicitly:


```
<script src="blocking_but_unimportant.js" importance="low"></script> 
```



### Deprioritizing `fetch`es

This may not be a common scenario, but it can happen in modern applications:
Let's say you have a high volume of `fetch` calls that fire around the same
time. Because `fetch`es are given high priority, they'll contend with one
another (and other high priority requests) if enough of them occur in the same
space of time. What you _could_ do in this scenario is set an `importance` of
`low` on `fetch`es for non-critical data:


```
// Important user data (high by default)
let userData = await fetch("/user");

// Less important content data (explicitly low)
let newsFeedContent = await fetch("/content/news-feed", {importance: "low"});
let suggestedContent = await fetch("/content/suggested", {importance: "low"});
```


This approach ensures that `fetch`es for critical data won't contend with other
`fetch`es for less important data. This could potentially improve performance
in some scenarios, particularly where bandwidth is low, and the number of
`fetch` calls is high.


## Caveats and conclusion

Now that you've gotten a taste, and you're ready to run out there and start
using Priority Hints: hold on! There's a few things you should be aware of
before you start dropping hints all over the place.


### Priority Hints are _hints_, not _instructions_

_Hint_ is the key word. When it comes to resource prioritization, **the browser
has the final say**.  Sure, you can slap them on a bunch of elements, and the
browser _may_ do what you're asking it to.  Or it may ignore some hints and
decide the default priority is the best choice for the given situation. This
behavior may change as Chrome's implementation matures, so test often!


### It's going to take trial and error

Perhaps _because_ Priority Hints are hints rather than instructions, it will
take some trial and error to observe its effects. One useful way of looking at
how Priority Hints work is to compare them to `rel=preload`: Where
`rel=preload`'s effects are often observable and easily measurable, Priority
Hints are _much_ more nuanced. If you don't notice any difference when using
them, it could be for any number of reasons, including, but not limited to:



1.  Resource priorities help to make sure critical resources get to the browser
before non-critical ones. But that only helps in environments where resource
download is a bottleneck. That happens when you're using HTTP/1.X, where the
number of connections the browser has open is limiting the amount of resources
you can download for each round-trip-time. This also happens when using HTTP/2,
but mainly in bandwidth constrained environments. High bandwidth HTTP/2
connections are less likely to benefit from better resource prioritization.
1.  HTTP/2 servers and their prioritization implementations are… not always
perfect. [Pat Meenan](https://twitter.com/patmeenan) wrote about [common
hurdles](https://blog.cloudflare.com/http-2-prioritization-with-nginx/) in such
implementations and how to fix them. [Andy
Davies](https://twitter.com/andydavies) has run a few tests to see which CDNs
and services are [getting it
right](https://github.com/andydavies/http2-prioritization-issues#current-status).
But generally, if you see that HTTP/2 prioritization is not having the impact
you expect it to have, make sure that your server is handling it right.
1.  The browser either ignored the hint you gave it, or you attempted to set a
priority for a resource that would have been the same as the browser's original
choice.

A good way to approach using Priority Hints is that it's a fine-tuning
optimization technique that should come later in your performance improvement
plan rather than sooner. If you haven't looked at other techniques like image
optimization, code splitting, `rel=preload`, and so forth, _do those things
first_ and consider Priority Hints later.


### Priority Hints are experimental

The Priority Hints implementation is, like your favorite website from 1996:
under construction. The API shape and functionality is not yet set in stone.
Given this reality, you need to be aware that the behavior of Priority Hints
and their impact could change over time. If you plan to experiment with them,
you probably want to keep track of the feature and its implementation
evolution. At the same time, as Priority Hints is a performance optimization,
those modifications should not cause breaking changes, but may render what
you're trying to use Priority Hints for less effective.


### Try them out!

Starting from Chrome 73, Priority Hints are going to an Origin Trial. That
means that you can [register your
domain](https://developers.chrome.com/origintrials/#/trials/active) and have
the feature turned on for your users for the next two releases of Chrome.

We would love you to take the feature out for a spin, try it to improve your
site's performance, and report back the results. We want to get a better
understanding of the real world benefits of shipping what we have now, despite
the caveats mentioned above, before potentially iterating over the feature a
bit more.

So please, if you love speeding up websites and want to try to make them
faster while helping us improve the feature, take Priority Hints out for a
spin, and let us know how it went!


{% include "web/_shared/helpful.html" %}
