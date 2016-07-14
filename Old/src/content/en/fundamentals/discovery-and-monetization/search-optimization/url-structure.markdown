---
layout: shared/narrow
title: "Instruct search engines how your multi-device page is structured"
description: "How your website appears in search results is an important aspect of multi-device site design. This guide helps you learn to optimize your website for search engines based on its URL structure."
authors:
  - agektmr
published_on: 2014-10-08
updated_on: 2015-10-06
order: 2
key-takeaways:
  - "Determine the URL structure of your webpage"
  - "Responsive design is most recommended"
  - "Use <code>rel='canonical'</code> + <code>rel='alternate'</code> for separate desktop/mobile sites"
  - "Use <code>Vary HTTP</code> header for a single URL dynamically serving separate desktop/mobile HTMLs"
---

<p class="intro">
How your website appears in search results is an important aspect of multi-device site design. This guide helps you learn to optimize your website for search engines based on its URL structure.</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways %}

Are you planning to build your webpage responsive? Is there a mobile specific
version with a separate URL? Are you serving both desktop version and mobile
version from the same URL? You might be able to do a better job optimizing your
website for search engines.

## Determine URL structure of your webpage
There are several ways to serve content to different devices. The three most
common methods are:

1. **Responsive Web Design:** serves the same HTML for one URL and uses CSS
media queries to determine how the content is rendered on the client side.  
ex) Desktop and Mobile: http://www.example.com/
1. **Separate mobile site:** redirects users to a different URL depending on the
user-agent.  
ex) Desktop: http://www.example.com/ Mobile: http://m.example.com/
1. **Dynamic serving:** serves different HTML for one URL depending on the user-
agent.  
ex) Desktop and Mobile: http://www.example.com/

The best approach we recommend is to use responsive web design, but a lot of
websites already serve mobile specific version. Some serves mobile version using
the same URL as desktop.
  
Determine which URL structure suits your webpage. Then try respective best
practices to optimize it for search engines.

## Responsive Web Design is recommended
If you are planning to make your website responsive, you are already good. The
benefit of making your website responsive is:

* User friendly for sharing
* Quicker page load without redirects
* Single point of URL for search results

<img src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

By making it responsive:

* Easier for users to access or share your webpage
* No need to redirect users depending on user agent so it is faster
* Maintenance cost is lower for both website and crawlers
  
Learn how to build your website with responsive web design at [Responsive Layouts](/web/fundamentals/design-and-ui/responsive/) section.

## Use `link[rel=canonical]` and `link[rel=alternate]` when serving from separate URLs
Serving similar contents on a desktop version and a mobile version at different
URLs may cause confusion for both users and search engines because it's not
obvious for viewers that they are intended to be identical. You should indicate:

* Contents of those 2 URLs are identical
* Which is mobile version
* Which is desktop (canonical) version

This information can help search engines better index content and ensure users
find what they're looking for in a format that works for their device.

### Use `link[rel=alternate]` for desktop version
On desktop page, indicate that there's a mobile version on a different URL by
adding `link` tag with `rel="alternate"` pointing to mobile version URL with
`href`. By adding `media` attribute with value of `"only screen and (max-width:
640px)"` will help search engines understand that this is explicitly targeting
small screens.

[http://www.example.com/](http://www.example.com/) HTML

{% highlight html %}
<title>...</title>
<link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
{% endhighlight %}

### Use `link[rel=canonical]` for mobile version
On mobile specific pages, indicate that there's a desktop (canonical) version at
a different URL by adding `link` tag with `rel="canonical"` pointing to desktop
version URL with `href`.

[http://m.example.com/](http://m.example.com/) HTML

{% highlight html %}
<title>...</title>
<link rel="canonical" href="http://www.example.com/">
{% endhighlight %}
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

## Use `Vary HTTP` header for device oriented serving site
Serving different HTML based on device type can reduce unnecessary redirects,
serves optimized HTML, provides single URL for search engines, but it also has
several disadvantages:

* There may be intermediate proxies between user's browsers and the server.
Unless the proxy knows the content varies depending on user agent, it may serve
unexpected results.
* Changing contents depending on user agent has a risk to be considered as
[cloaking](https://support.google.com/webmasters/answer/66355), a violation of
Google’s Webmaster Guidelines.

By letting search engines know that the content varies depending on user agent,
they can optimize search results for the user agent that is sending queries.

### Use `Vary HTTP` header
In order to indicate that the URL serves different HTML depending on user agent,
provide `Vary: User-Agent` in HTTP header.

[http://www.example.com/](http://www.example.com/) HTTP Header

{% highlight http %}
HTTP/1.1 200 OK
Content-Type: text/html
Vary: User-Agent
Content-Length: 5710
{% endhighlight %}

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

By providing `Vary: User-Agent` header, search engines and proxies understand
the transferred content may vary depending on user agent. This allows search
index to treat desktop version and mobile version separately, intermediate
proxies to cache those contents gracefully.

To learn more about building URL structure across desktop and mobile, read [Building Smartphone-Optimized Websites](https://developers.google.com/webmasters/smartphone-sites/).

