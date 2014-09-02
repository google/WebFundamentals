---
layout: article
title: "Controlling Appearance on Social Sites"
description: "The distribution of websites through social sites is increasing year by year. By adding a few lines of code to your webpage, you have better control over how it appears when shared, which potentially brings more traffic by attracting people with richer information."
introduction: "The distribution of websites through social sites is increasing year by year. By adding a few lines of code to your webpage, you have better control over how it appears when shared, which potentially brings more traffic by attracting people with richer information."
snippet: "Boost discoverability of your webpage"
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
  - Use Open Graph Protocol (OGP) to provide page title, description and an image for Facebook.
  - Use Twitter Cards to provide page title, description, an image and a Twitter id for Twitter.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways %}

You can improve appearance of your webpage on social sites just by changing a few lines of code on your page's markup. It's easy enough to regret if you've been missing.

<div class="clear g-wide--pull-1">
  <div class="g--half">
    <figure class="fluid">
      <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x, imgs/gplus-snippet-1-2x.png 2x" />
      <figcaption>How your webpage will appear on Google+ when shared with poorly-implemented metadata.</figcaption>
    </figure>
  </div>
  <div class="g--half g--last">
    <figure class="fluid">
      <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x, imgs/gplus-snippet-2-2x.png 2x" />
      <figcaption>How it will appear with proper markup</figcaption>
    </figure>
  </div>
</div>

Which one do you think is more likely to be clicked? People love richer information. Photos and images especially help users quickly see what to expect on the site a lot better than just text.  
When someone on a social network wants to share your website with his friends, he would probably add some notes explaining how awesome it is, and share it. But describing your website tends be cumbersome and can miss the point from the page owners aspect. Some services restrict the number of characters users can put in the note.  
By adding metadata to your webpage, you can help those people sharing its details with an attractive title, a description and images, for free. Let's have a look at a few of options.

## schema.org + microdata
One option is to use [schema.org](https://schema.org/) + [microdata](http://www.w3.org/TR/microdata/) embedded in your website.  
[Microdata](http://www.w3.org/TR/microdata/) allows machine-readable data to be embedded in HTML documents in an easy-to-write manner, with an unambiguous parsing model.  
[Schema.org](https://schema.org/) provides a collection of schemas that webmasters can use to markup HTML pages in ways recognized by major search providers, and that can also be used for structured data interoperability (e.g. in JSON).

Here's an example:
{% include_code _code/social-sites.html microdata %}
While most metadata are embedded in the `head` section of a webpage, microdata lives where the context already exists.

### itemscope and itemtype
By adding `itemscope`, you can specify the the tag as a block of contents about a particular item. The type of item can be specified using the `itemtype` attribute along side with  the `itemscope`. The value of an `itemtype` can be determined according to the type of the content on your webpage. You should be able to find one that is relevant in [this page](http://schema.org/docs/full.html).

### itemprop
`itemprop`s define properties for `itemtype`s in the scope. For providing metadata to social sites, typical `itemprop` values are `name`, `description` and `image`.
  
These microdata provides semantic information to crawlers, typically for [Google+](https://plus.google.com/).
  
In order to validate rich snippets on Google+, you can use tools like

* [Structured Data Testing Tool](http://www.google.com/webmasters/tools/richsnippets) - Webmaster Tools  
<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />
* [Semantic inspector](https://chrome.google.com/webstore/detail/semantic-inspector/jobakbebljifplmcapcooffdbdmfdbjh/reviews) - Chrome Extension  
<img src="imgs/semantic-inspector.png" srcset="imgs/semantic-inspector.png 1x, imgs/semantic-inspector-2x.png 2x" />

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
      <td data-th="Content">URL to an image attached to the shared post.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">A string that indicates a type of the webpage. You should be able to find one that is suitable in <a href="https://developers.facebook.com/docs/reference/opengraph/">this page</a>.</td>
    </tr>
  </tbody>
</table>

These meta tags provide semantic information to crawlers from social sites, typically from [Google+](https://plus.google.com/), [Facebook](https://www.facebook.com/).
  
There are more things you can attach to the post. Learn them at [ogp.me](http://ogp.me/).
  
In order to validate your markup, Facebook provides [Debugger](https://developers.facebook.com/tools/debug/).

## Twitter Cards
[Twitter Cards](https://dev.twitter.com/docs/cards) are an extension to OGP applicable for [Twitter](https://twitter.com/). They add media attachments to tweets with a link to your website.
  
In order to get Twitter Card working, [your domain must be approved](https://dev.twitter.com/docs/cards/validation/validator) and must contain `twitter:card` as `name` attribute instead of `property` attribute.
  
Here's a quick example:
{% include_code _code/social-sites.html twitter %}
By using `twitter:site`, you can also add a Twitter account.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

Twitter provides [Card Validator](https://dev.twitter.com/docs/cards/validation/validator) to validate your Twitter Card.

To learn more about Twitter Card, visit [Twitter's developer site](https://dev.twitter.com/docs/cards).

{% endwrap %}
