project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: By default CSS is treated as a render blocking resource, learn how to prevent it from blocking rendering.

<p class="intro">
  By default CSS is treated as a render blocking resource, which means that the
  browser will hold rendering of any processed content until the CSSOM is
  constructed. Make sure to keep your CSS lean, deliver it as quickly as
  possible, and use media types and queries to unblock rendering.
</p>

In the previous section we saw that the critical rendering path requires that we have both the DOM and the CSSOM to construct the render tree, which creates an important performance implication: **both HTML and CSS are render blocking resources.** The HTML is obvious, since without the DOM we would not have anything to render, but the CSS requirement may be less obvious. What would happen if we try to render a typical page without blocking rendering on CSS?
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>By default, CSS is treated as a render blocking resource.</li>
    
    <li>Media types and media queries allow us to mark some CSS resources as non-render blocking.</li>
    
    <li>All CSS resources, regardless of blocking or non-blocking behavior, are downloaded by the browser.</li>
    
  </ul>
  
</div>



<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes with CSS">
    <figcaption>The New York Times with CSS</figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/nytimes-nocss-device.png" alt="NYTimes without CSS">
    <figcaption>The New York Times without CSS (FOUC)</figcaption>
  </figure>
</div>

The above example, showing the NYTimes website with and without CSS, demonstrates why rendering is blocked until CSS is available - without CSS the page is effectively unusable. In fact, the experience on the right is often referred to as a "Flash of Unstyled Content" (FOUC). As a result, the browser will block rendering until it has both the DOM and the CSSOM.

> **_CSS is a render blocking resource, get it down to the client as soon and as quickly as possible to optimize the time to first render!_**

However, what if we have some CSS styles that are only used under certain conditions, for example, when the page is being printed, or being projected onto a large monitor? It would be nice if we didn’t have to block rendering on these resources!

CSS "media types" and "media queries" allow us to address these use-cases:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;style.css&quot;</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;print.css&quot;</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;print&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;other.css&quot;</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;(min-width: 40em)&quot;</span><span class="nt">&gt;</span></code></pre></div>

A [media query](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries) consists of a media type and zero or more expressions that check for the conditions of particular media features. For example, our first stylesheet declaration does not provide any media type or query, hence it will apply in all cases - that is to say, it is always render blocking. On the other hand, the second stylesheet will only apply when the content is being printed - perhaps you want to rearrange the layout, change the fonts, etc - and hence this stylesheet does not need to block the rendering of the page when it is first loaded. Finally, the last stylesheet declaration provides a "media query" which is executed by the browser: if the conditions match, the browser will block rendering until the stylesheet is downloaded and processed.

By using media queries, our presentation can be tailored to specific use cases such as display vs. print, and also to dynamic conditions such as changes in screen orientation, resize events, and more. **When declaring your stylesheet assets, pay close attention to the media type and queries, as they will have big performance impact on the critical rendering path!**

Let's consider some hands-on examples:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;style.css&quot;</span>    <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;style.css&quot;</span>    <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;all&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;portrait.css&quot;</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;orientation:portrait&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">href=</span><span class="s">&quot;print.css&quot;</span>    <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">media=</span><span class="s">&quot;print&quot;</span><span class="nt">&gt;</span></code></pre></div>

* The first declaration is render blocking and matches in all conditions.
* The second declaration is also render blocking: "all" is the default type and if you don’t specify any type, it’s implicitly set to "all". Hence, the first and second declarations are actually equivalent.
* The third declaration has a dynamic media query which will be evaluated when the page is being loaded. Depending on the orientation of the device when the page is being loaded, portrait.css may or may not be render blocking.
* The last declaration is only applied when the page is being printed, hence it is not render blocking when the page is first loaded in the browser.

Finally, note that "render blocking" only refers to whether the browser will have to hold the initial rendering of the page on that resource. In either case, the CSS asset is still downloaded by the browser, albeit with a lower priority for non-blocking resources.


