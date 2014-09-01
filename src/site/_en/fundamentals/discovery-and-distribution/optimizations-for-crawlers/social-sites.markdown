---
layout: article
title: "Controlling Appearance on Social Sites"
description: "The distribution of websites through social services are increasing year by year. By adding a few lines of code to your website, you have better control over how it appears on those services when shared, which potentially brings more traffic."
introduction: "The distribution of websites through social services are increasing year by year. By adding a few lines of code to your website, you have better control over how it appears on those services when shared, which potentially brings more traffic."
snippet: "Spread your work to the world"
id: social-sites
collection: optimizations-for-crawlers
authors:
  - agektmr
article:
  written_on: 2014-08-31
  updated_on: 2014-08-31
  order: 1
key-takeaways:
  - Use schema.org microdata to provide page title, description and an image for Google+.
  - Use OGP to provide page title, description and an image for Facebook.
  - Use Twitter Card to provide page title, description, an image and a Twitter id for Twitter.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

Here's how your website will appear on Google+ when shared with poorly implemented meta data on a website.
<img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x, imgs/gplus-snippet-1-2x.png 2x" />
And here's how it will appear with proper mark up.
<img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x, imgs/gplus-snippet-2-2x.png 2x" />
Which one do you think is more likely to be clicked?  
It is an obvious question. People love richer yet simple information. Photos and images especially help users quickly see what to expect on the site a lot better than just texts.

When someone on a social network finds your website cool enough to share with his friends, he would probably add some notes explaining how awesome it is, and share it. But describing your website tends be cumbersome and can miss the point from the page owners aspect. Some services restrict number of characters users can put in the note.

By adding a few meta tags properly to your website, you can help those people sharing your website details with an attractive title, a description and images, for free. Let's have a look at a few of options.

## schema.org microdata
One option is to use [schema.org](https://schema.org/) [microdata](http://www.w3.org/TR/microdata/) embedded in your website. Here's an example:
{% include_code _code/social-sites.html microdata %}
While most of meta tags are embedded in `head` section of a website, microdata can live in various places inside the HTML where those texts already exist.

### itemscope and itemtype
By adding `itemscope`, you can specify the the tag as a block of contents about a particular item. The type of item can be specified using the `itemtype` attribute immediately following the `itemscope`. The value of an `itemtype` can be determined according to the type of the content on your website. You should be able to find one that is relevant in [this page](http://schema.org/docs/full.html).

### itemprop
`itemprop`s define properties for `itemtype`s in the scope. For providing meta data to social sites, typical `itemprop` values are `title`, `description` and `image`.

Just keep in mind to put `itemprop`s children of `itemscope` in DOM tree and there's no other `itemscope`s interfering. In case otherwise, you have an option to use `itemref` and `id` to refer to `itemprop`s from outside of its scope.
{% highlight html %}
<p id="desc" itemprop="description">Fireworks are beautiful. This article explains how beautiful fireworks are.</p>
<div itemscope itemtype="http://schema.org/Article" itemref="desc">
  <h1 itemprop="name">Enjoy fireworks</h1>
  <img itemprop="image" src="imgs/fireworks.jpg" />
</div>
{% endhighlight %}

These microdata provides semantic information to crawlers, typically for [Google+](https://plus.google.com/).
  
In order to validate rich snippets on Google+, you can use tools like

* [Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets) - Webmaster Tools
* [Semantic inspector](https://chrome.google.com/webstore/detail/semantic-inspector/jobakbebljifplmcapcooffdbdmfdbjh/reviews) - Chrome Extension

## Open Graph Protocol (OGP)
Second option is to use RDFa based markup called OGP (Open Graph Protocol). Here's an example:
{% include_code _code/social-sites.html ogp %}
By adding these meta tags in `head` section of a webpage, your website can provide various information to the social site where it is shared on.

### Properties and contents
A meta tag consists of a `property` attribute and a `content` attribute. Properties and contents take following values:

<table class="table-2">
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
      <td data-th="Content">An image URL which represents the webpage.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">A string that indicates a type of the webpage. You should be able to find one that is relevant in <a href="https://developers.facebook.com/docs/reference/opengraph/">this page</a>.</td>
    </tr>
  </tbody>
</table>

These meta tags provide semantic information to crawlers from social sites, typically from [Google+](https://plus.google.com/), [Facebook](https://www.facebook.com/).

There are more things you can attach to the post. Learn them at [ogp.me](http://ogp.me/).

In order to validate your markup, Facebook provides [Debugger](https://developers.facebook.com/tools/debug/).

## Twitter Card
[Twitter Card](https://dev.twitter.com/docs/cards) is an extension to OGP applicable for [Twitter](https://twitter.com/). It adds media attachments to tweets with a link to your website.

In order to get Twitter Card working, [your domain must be approved](https://dev.twitter.com/docs/cards/validation/validator) and must contain `twitter:card` as `name` attribute instead of `property` attribute.

Here's a quick example:
{% include_code _code/social-sites.html twitter %}
By using `twitter:site`, you can also add a Twitter account.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

Twitter provides [Card Validator](https://dev.twitter.com/docs/cards/validation/validator) to validate your Twitter Card.

To learn more about Twitter Card, visit [Twitter's developer site](https://dev.twitter.com/docs/cards).

{% endwrap %}
