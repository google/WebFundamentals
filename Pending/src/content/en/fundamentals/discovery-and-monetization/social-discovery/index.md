project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: You can influence the way your site appears when shared via social media by adding a few lines of code to each page. This can help bring more people to your site by providing previews with richer information than would otherwise be available.

<p class="intro">
  You can influence the way your site appears when shared via social media by adding a few lines of code to each page. This can help bring more people to your site by providing previews with richer information than would otherwise be available.
</p>


















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Use schema.org microdata to provide page title, description and an image for Google+.</li>
    
    <li>Use Open Graph Protocol (OGP) to provide page title, description and an image for Facebook.</li>
    
    <li>Use Twitter Cards to provide page title, description, an image and a Twitter id for Twitter.</li>
    
  </ul>
  
</div>



You can influence the way your site appears when shared via social media by
adding a few lines of code to each page. This can help increase engagement by
providing previews with richer information than would otherwise be available.
Without it, social sites will provide only basic information, without images or
other helpful information. 

Which one do you think is more likely to be clicked? People are drawn to images
and feel more confident they'll like what they find when they have an early
preview.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="wf-figcaption-good">
      With the appropriate markup, the correct title, a short
      description and an image are included. Adding these items can help
      increase engagement.
    </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="wf-figcaption-bad">
      Without the proper mark up, only the page title is
      included.
    </figcaption>
  </figure>
</div>

When someone on a social network wants to share your website with his friends,
he would probably add some notes explaining how awesome it is, and share it.
But describing your website tends be cumbersome and can miss the point from the
page owners aspect. Some services restrict the number of characters users can
put in the note.

By adding the appropriate metadata to your pages, you can simplify the sharing
process for users by providing the title, a description and an attractive
image. This means they don't have to spend valuable time (or characters)
describing the link.

## Use schema.org + microdata to provide rich snippets on Google+
Crawlers use many methods to parse a page and understand its content. By using
[microdata](http://www.w3.org/TR/microdata/), and
[schema.org](https://schema.org/) vocabulary, you help social sites and search
engines better understand the contents of the page.

Here's an example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">itemscope</span> <span class="na">itemtype=</span><span class="s">&quot;http://schema.org/Article&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;h1</span> <span class="na">itemprop=</span><span class="s">&quot;name&quot;</span><span class="nt">&gt;</span>Enjoy fireworks<span class="nt">&lt;/h1&gt;</span>
  <span class="nt">&lt;p</span> <span class="na">itemprop=</span><span class="s">&quot;description&quot;</span><span class="nt">&gt;</span>Fireworks are beautiful.
   This article explains how beautiful fireworks are.<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;img</span> <span class="na">itemprop=</span><span class="s">&quot;image&quot;</span> <span class="na">src=</span><span class="s">&quot;//developers.google.com/web/imgs/fireworks.jpg&quot;</span> <span class="nt">/&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/discovery-and-monetization/social-discovery/social-sites.html">Try full sample</a>
      </p>
  </div>



While most metadata are embedded in the head section of a webpage, microdata
lives where the context exists.

### Add `itemscope` to define microdata scope
By adding `itemscope`, you can specify the tag as a block of contents about a
particular item.

### Add `itemtype` to define type of your website
The type of item can be specified using the `itemtype` attribute along with the
`itemscope`. The value of an `itemtype` can be determined according to the type
of the content on your webpage. You should be able to find one that is relevant
in [this page](https://schema.org/docs/full.html).

### Add `itemprop` to describe each item using schema.org vocaburary
`itemprop`s define properties for `itemtype`s in the scope. For providing
metadata to social sites, typical `itemprop` values are `name`, `description`
and `image`.

### Learn more
These microdata provides semantic information to crawlers, typically for
[Google+](https://plus.google.com/) and Google Search. To learn more about
snippets and rendering on Google+, read the following documents:

* [Article Rendering - Google+ Platform](https://developers.google.com/+/web/snippet/article-rendering)
* [Snippet - Google+ Platform](https://developers.google.com/+/web/snippet/)

### Validate rich snippets
In order to validate rich snippets on Google+, you can use tools such as:

* [Structured Data Testing Tool](https://www.google.com/webmasters/tools/richsnippets) - Webmaster Tools  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

* [Semantic inspector](https://chrome.google.com/webstore/detail/semantic-inspector/jobakbebljifplmcapcooffdbdmfdbjh/reviews) - Chrome Extension  

<img src="imgs/semantic-inspector.png" srcset="imgs/semantic-inspector.png 1x, imgs/semantic-inspector-2x.png 2x" />

## Use Open Graph Protocol (OGP) to provide rich snippets on Facebook
The [Open Graph Protocol (OGP)](http://ogp.me/) provides Facebook with the
metadata necessary to allow web pages to have the same functionality as other
Facebook objects.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;html</span> <span class="na">prefix=</span><span class="s">&quot;g: http://ogp.me/ns#&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;head&gt;</span>
        <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:title&quot;</span> <span class="na">content=</span><span class="s">&quot;Enjoy Fireworks&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:description&quot;</span> <span class="na">content=</span><span class="s">&quot;Fireworks are beautiful.</span>
<span class="s">     This article explains how beautiful fireworks are.&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:image&quot;</span> <span class="na">content=</span>
     &quot;https://developers.google.com/web/imgs/fireworks.jpg&quot;&gt;
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:url&quot;</span> <span class="na">content=</span>
     &quot;discovery-and-distribution/optimizations-for-crawlers/social-sites.html&quot;&gt;
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:type&quot;</span> <span class="na">content=</span><span class="s">&quot;website&quot;</span><span class="nt">&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/discovery-and-monetization/social-discovery/social-sites.html">Try full sample</a>
      </p>
  </div>



When included in the head section of your page, this metadata is used for rich
snippet information when the page is shared.

### Use `og:` namespaced `meta` tags to describe metadata
A `meta` tag consists of a `property` attribute and a `content` attribute.
Properties and contents may take the following values:

<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="Property">Property</th>
      <th data-th="Content">Content</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">The title of the webpage.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">The description of the webpage.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">The canonical url of the webpage.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">URL to an image attached to the shared post.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">A string that indicates the type of the webpage. You can find one that is suitable for your webpage <a href="https://developers.facebook.com/docs/reference/opengraph/">here</a>.</td>
    </tr>
  </tbody>
</table>

These meta tags provide semantic information to crawlers from social sites,
typically from [Google+](https://plus.google.com/) and
[Facebook](https://www.facebook.com/).

### Learn more
To learn more about things you can attach to the post on Facebook, visit the
official Open Graph Protocol site.

* [ogp.me](http://ogp.me/)

### Validate rich snippets
In order to validate your markup on Facebook, you can use tools such as:

* [Debugger](https://developers.facebook.com/tools/debug/)

## Use Twitter Cards to provide rich snippets on Twitter
[Twitter Cards](https://dev.twitter.com/docs/cards) are an extension to the
Open [Graph Protocol applicable for Twitter](https://twitter.com/). They allow
you to add media attachments like images and video to Tweets with a link to
your webpage. By adding the appropriate metadata, Tweets with links to your
page will have a card added that includes the rich detail you've added.

### Use `twitter:` namespaced meta tags to describe metadata
In order to get a Twitter Card working, [your domain must be
approved](https://dev.twitter.com/docs/cards/validation/validator) and must
contain a meta tag that has `twitter:card` as the `name` attribute instead of
`property` attribute.
  
Here's a quick example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;html</span> <span class="na">prefix=</span><span class="s">&quot;g: http://ogp.me/ns#&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;head&gt;</span>
        <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:title&quot;</span> <span class="na">content=</span><span class="s">&quot;Enjoy Fireworks&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:description&quot;</span> <span class="na">content=</span><span class="s">&quot;Fireworks are beautiful.</span>
<span class="s">     This article explains how beautiful fireworks are.&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:image&quot;</span> <span class="na">content=</span>
     &quot;https://developers.google.com/web/imgs/fireworks.jpg&quot;&gt;
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:url&quot;</span> <span class="na">content=</span>
     &quot;discovery-and-distribution/optimizations-for-crawlers/social-sites.html&quot;&gt;
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:type&quot;</span> <span class="na">content=</span><span class="s">&quot;website&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;twitter:card&quot;</span> <span class="na">content=</span><span class="s">&quot;summary_large_image&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;twitter:site&quot;</span> <span class="na">content=</span><span class="s">&quot;agektmr&quot;</span><span class="nt">&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/discovery-and-monetization/social-discovery/social-sites.html">Try full sample</a>
      </p>
  </div>



By assigning the Twitter id to the value of twitter:site, Twitter embeds this
information in the shared post so that people can easily engage with the page
owner.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### Learn more
To learn more about Twitter Cards, visit:

* [Twitter's developer site](https://dev.twitter.com/docs/cards)

### Validate rich snippets
In order to validate your markup, Twitter provides:

* [Card Validator](https://dev.twitter.com/docs/cards/validation/validator)

## The Best Practice
Given all three options, the best thing you can do is to include them all in
your webpage. Here's an example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="c">&lt;!-- namespace declaration --&gt;</span>
<span class="nt">&lt;html</span> <span class="na">prefix=</span><span class="s">&quot;og: http://ogp.me/ns#&quot;</span><span class="nt">&gt;</span>
  <span class="c">&lt;!-- define microdata scope and type --&gt;</span>
  <span class="nt">&lt;head</span> <span class="na">itemscope</span> <span class="na">itemtype=</span><span class="s">&quot;http://schema.org/Article&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;title&gt;</span>Social Site Example<span class="nt">&lt;/title&gt;</span>
    <span class="c">&lt;!-- define ogp and itemprop of microdata in one line --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:title&quot;</span> <span class="na">itemprop=</span><span class="s">&quot;name&quot;</span> <span class="na">content=</span><span class="s">&quot;Enjoy Fireworks&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- define ogp image --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:image&quot;</span> <span class="na">content=</span>
     &quot;https://developers.google.com/web/imgs/fireworks.jpg&quot;&gt;
    <span class="c">&lt;!-- use link[href] to define image url for microdata --&gt;</span>
    <span class="nt">&lt;link</span> <span class="na">itemprop=</span><span class="s">&quot;image&quot;</span> <span class="na">href=</span><span class="s">&quot;//developers.google.com/web/imgs/fireworks.jpg&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- define ogp and itemprop of microdata in one line --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:url&quot;</span> <span class="na">content=</span>
     &quot;discovery-and-distribution/optimizations-for-crawlers/social-sites2.html&quot;&gt;
    <span class="c">&lt;!-- define ogp type --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:type&quot;</span> <span class="na">content=</span><span class="s">&quot;website&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- define twitter cards type --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;twitter:card&quot;</span> <span class="na">content=</span><span class="s">&quot;summary_large_image&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- define site&#39;s owner twitter id --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;twitter:site&quot;</span> <span class="na">content=</span><span class="s">&quot;agektmr&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- define description for ogp and itemprop of microdata in one line --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">property=</span><span class="s">&quot;og:description&quot;</span> <span class="na">itemprop=</span><span class="s">&quot;description&quot;</span>
     <span class="na">content=</span><span class="s">&quot;Fireworks are beautiful. This article explains how beautiful fireworks are.&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- general description (separate with ogp and microdata) --&gt;</span>
    <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;description&quot;</span> <span class="na">content=</span><span class="s">&quot;Fireworks are beautiful.</span>
<span class="s">     This article explains how beautiful fireworks are.&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;/head&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/discovery-and-monetization/social-discovery/social-sites2.html">Try full sample</a>
      </p>
  </div>



Notice that microdata and OGP share some markup:

* `itemscope` is located at `head` tag
* `title` and `description` are shared between microdata and OGP
* `itemprop="image"` is using `link` tag with `href` attribute instead of
reusing `meta` tag with `property="og:image"`
  
Lastly, make sure to validate that your webpage appears as expected on each
social sites before publishing.


