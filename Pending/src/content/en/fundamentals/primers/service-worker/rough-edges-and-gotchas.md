project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: This stuff is really new. Here's a collection of issues that get in the way. 

<p class="intro">This stuff is really new. Here's a collection of issues that 
	get in the way. Hopefully this section can be deleted soon, but for now 
	these are worth being mindful of.
</p>



## If Installation Fails, We're Not so Good at Telling You About It

If a worker registers, but then doesn't appear in `chrome://inspect/#service-workers` 
or `chrome://serviceworker-internals`, it's likely failed to
install due to an error being thrown, or a rejected promise being passed to
`event.waitUntil()`.

To work around this, go to `chrome://serviceworker-internals` and check "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging.", and put a debugger statement at the start of your install event.
(This option is named differently in versions of Chrome earlier than 47.)
This, along with  "[Pause on uncaught exceptions](https://developer.chrome.com/devtools/docs/javascript-debugging
#pause-on-uncaught-exceptions)",  should reveal the issue.

## The Defaults of fetch()

### No Credentials by Default

When you use `fetch`, by default, requests won't contain credentials such as 
cookies. If you want credentials, instead call:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">fetch</span><span class="p">(</span><span class="nx">url</span><span class="p">,</span> <span class="p">{</span>
  <span class="nx">credentials</span><span class="o">:</span> <span class="s1">&#39;include&#39;</span>
<span class="p">})</span></code></pre></div>

This behaviour is on purpose, and is arguably better than XHR's more complex
default of sending credentials if the URL is same-origin, but omiting them
otherwise. Fetch's behaviour is more like other CORS requests, such as `<img
crossorigin>`, which never sends cookies unless you opt-in with `<img
crossorigin="use-credentials">`.

### Non-CORS Fail by Default

By default, fetching a resource from a third party URL will fail if it doesn't
support CORS. You can add a `no-CORS` option to the Request to overcome this,
although this will cause an 'opaque' response, which means you won't be able to
tell if the response was successful or not.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">cache</span><span class="p">.</span><span class="nx">addAll</span><span class="p">(</span><span class="nx">urlsToPrefetch</span><span class="p">.</span><span class="nx">map</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">urlToPrefetch</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">return</span> <span class="k">new</span> <span class="nx">Request</span><span class="p">(</span><span class="nx">urlToPrefetch</span><span class="p">,</span> <span class="p">{</span> <span class="nx">mode</span><span class="o">:</span> <span class="s1">&#39;no-cors&#39;</span> <span class="p">});</span>
<span class="p">})).</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;All resources have been fetched and cached.&#39;</span><span class="p">);</span>
<span class="p">});</span></code></pre></div>

### Handling Responsive Images

The `srcset` attribute or the `<picture>` element will select the most
appropriate image asset at run time and make a network request.

For service worker, if you wanted to cache an image during the install step, you
have a few options:

1. Install all the images that the  `<picture>` element and the `srcset` 
   attribute will request.
2. Install a single low-res version of the image.
3. Install a single high-res version of the image.

Realistically you should be picking option 2 or 3 since downloading all of the
images would be a waste of storage space.

Let's assume you go for the low res version at install time and you want to try
and retrieve higher res images from the network when the page is loaded, but if
the high res images fail, fallback to the low res version. This is fine and
dandy to do but there is one problem.

If we have the following two images:

| Screen Density | Width | Height |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

In a `srcset` image, we'd have some markup like this:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;image-src.png&quot;</span> <span class="na">srcset=</span><span class="s">&quot;image-src.png 1x, image-2x.png 2x&quot;</span> <span class="nt">/&gt;</span></code></pre></div>

If we are on a 2x display, then the browser will opt to download `image-2x.png`,
if we are offline you could `.catch()` this request and return `image-src.png`
instead if it's cached, however the browser will expect an image which takes
into account the extra pixels on a 2x screen, so the image will appear as
200x200 CSS pixels instead of 400x400 CSS pixels. The only way around this is to
set a fixed height and width on the image.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;image-src.png&quot;</span> <span class="na">srcset=</span><span class="s">&quot;image-src.png 1x, image-2x.png 2x&quot;</span>
<span class="na">style=</span><span class="s">&quot;width:400px; height: 400px;&quot;</span> <span class="nt">/&gt;</span></code></pre></div>

For `<picture>` elements being used for art direction, this becomes considerably
more difficult and will depend heavily on how your images are created and used,
but you may be able to use a similar approach to srcset.

