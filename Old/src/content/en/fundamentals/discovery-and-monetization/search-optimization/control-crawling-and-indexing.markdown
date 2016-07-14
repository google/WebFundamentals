---
layout: shared/narrow
title: "Control crawling and indexing from search engines"
description: "Being listed properly on search engines is critical to delivering your website to the world, but poor configuration may cause unexpected content to be included in the results. Learn how crawlers work and how they index your website in order to avoid such problems."
authors:
  - agektmr
published_on: 2014-12-15
updated_on: 2015-10-06
order: 3
key-takeaways:
  - "No robots.txt, no robots meta tags required for fully accessible pages"
  - "Use noindex for pages you want to limit access to those who know the URL"
  - "Use relevant authentication mechanism for pages you want to keep private"
notes:
  crawlers:
    - "Many people confuses crawling and indexing. Prohibiting crawling doesn't mean the page won't show up in the search results. For example, when a third party website has a link to one of your webpages which is blocked from crawling, the page may still be listed in search results (In that case, the result won't have detailed description)."
  robots:
    - "<code>robots.txt</code> is only required <b>if</b> you want to control the way your site is crawled. Do not to return response code 500 for the url: <code>/robots.txt</code>. That will terminate all subsequent crawls for the entire host resulting in empty search result details."
  x-robots-tag:
    - "If you disallow crawls using robots.txt,  search bots still may index those pages without knowing that you don't want those pages to be indexed. This can happen because:<ul><li>Search bots may find your webpages by following links from other websites.</li><li>Search engines can't detect <code>noindex</code> because it can't crawl.</li></ul>"
  searchable:
    - "Wondering if you should prohibit crawling JavaScript and Stylesheet files? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google now try its best to understand them</a> to find contents available through modern technologies such as AJAX. You should definitely allow crawlers to crawl it."

---

<p class="intro">
  Being listed properly on search engines is critical to delivering your website to the world, but poor configuration may cause unexpected content to be included in the results. Learn how crawlers work and how they index your website in order to avoid such problems.
</p>

{% include shared/toc.liquid %}

Sharing information to the world has no better place than the web. Once you publish a document to the web, it will be immediately available to the rest of the world. The page will be visible to anyone as long as they know the URL and that's where search engines come in. Once search engines learn about your website, your documents will be searchable and accessible from people all around the world.  

However, there are some cases where you don't want people to find those documents even though you want to put them on the web. For example, a blog's admin page is something only limited people should have access to. There's nothing beneficial for you to let people search those pages through search engines.  

In this document, you will learn how to inform search engines that you want certain pages not appear in the search results.  

{% include shared/takeaway.liquid list=page.key-takeaways %}

## Understand the difference between "crawl" and "index"
Before learning how to control search results, understanding how search engines interact with your webpage is important. From your site's point of view, there are roughly 2 things search engines do to your site: "crawling" and "indexing".  

"Crawling" is when a search engine bot accesses your webpage and fetches it and analyses its content. The content will be stored in the search engine's database and may be used for populating search result details, ranking and discovering new pages by following links.  

"Indexing" is when a search engine stores a website's URL and any associated information to their database so it will be ready to be served as a search result.  

{% include shared/remember.liquid list=page.notes.crawlers %}

## Control search bots' crawling
You can actually control how well-behaved crawlers access your webpage using a text file called robots.txt. (Not all crawlers necessarily respect robots.txt. Imagine that anyone can create their own stray crawlers.)  

### How to use robots.txt
Robots.txt is a simple text file describing how you want search bots to crawl your site.

Place `robots.txt` at the root directory of your website's host: If your site's host is `http://pages.example.com/`, then the `robots.txt` file should be located at `http://pages.example.com/robots.txt`. If the domain has different schema, subdomains or other ports, they will be considered as different hosts and you should have `robots.txt` for each of their root directories.  

Here's a quick example:  

**http://pages.example.com/robots.txt**
{% highlight text %}
User-agent: *
Disallow: /
{% endhighlight %}

This indicates that you want to disallow all kind of bots to crawl your entire website.  

**http://pages.example.com/robots.txt**
{% highlight text %}
User-agent: Googlebot
Disallow: /nogooglebot/
{% endhighlight %}

You can specify the behavior per bots (user agents) by indicating a user-agent name after `User-agent:`. In the above case, you are disallowing user agent called `Googlebot` to crawl `/nogooglebot/` and all contents below the directory.  

You can learn how to create robots.txt further on relevant search engines' help pages:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)
^

{% include shared/remember.liquid title="Note" list=page.notes.robots %}

### Test robots.txt
Depending on which crawlers your robots.txt is targeting at, search engine providers may provide a tool to test robots.txt. Taking Google as an example, there's a validator in [Webmaster Tools](https://www.google.com/webmasters/tools/robots-testing-tool). Use it to test by yourself if your robots.txt works as expected.  

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex also provides [a similar tool](https://webmaster.yandex.com/robots.xml).  

## Control search indexing
If you don't want your webpage to show up in the search results, robots.txt isn't the right solution. You need to allow those pages to be crawled, and explicitly indicate that you don't want them to be indexed. There are two solutions:  

### Use robots meta tags
In order to indicate you don't want an HTML page to be indexed, insert a specific kind of `meta` tag. By setting its attributes as `name="robots"` and `content="noindex"`, you can indicate that you don't want any search engines to index the page.  

{% highlight html %}
<!DOCTYPE html>
<html><head>
<meta name="robots" content="noindex" />
{% endhighlight %}

By changing the value of the `name` attribute to a specific user agent name, you can narrow the scope. For example, `name="googlebot"` indicates that you don't want Googlebot to index the page (case insensitive).  

{% highlight html %}
<!DOCTYPE html>
<html><head>
<meta name="googlebot" content="noindex" />
{% endhighlight %}

Other options for robots meta tag can be found here:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

[Find lists of user agent names](#appendix-list-of-crawler-user-agents).

### X-Robots-Tag
In order to indicate you don't want other resources than HTML such as images, stylesheets or script files, to be indexed, add `X-Robots-Tag: noindex` in HTTP header.  

{% highlight http %}
HTTP/1.1 200 OK
X-Robots-Tag: noindex
Content-Type: text/html; charset=UTF-8
{% endhighlight %}

If you want to narrow the scope to a specific user agent, insert user agent name before `noindex`.  

{% highlight http %}
HTTP/1.1 200 OK
X-Robots-Tag: googlebot: noindex
Content-Type: text/html; charset=UTF-8
{% endhighlight %}

To learn more about X-Robots-Tag:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)
^

{% include shared/remember.liquid title="Note" list=page.notes.x-robots-tag %}

Don't expect robots.txt to control search indexes.

## Solution examples by type of contents
What are the best solutions to control crawling and indexing? Let's have a look at example solutions depending on the types of pages.  

### Fully accessible and searchable from anyone
Pages you want anyone to access and expect as much traffic as possible. Most of pages on the web are usually of this type.  

#### Solutions

* No robots.txt required.
* No robots meta tags required.

### Limited access from people who know the URL
Non-confidential pages you want only limited people who know the URL to access. Examples are:  

* Login page for a blog admin console
* Private content shared by passing a URL for novice internet users

#### Solutions
In this type, you don't want search engines to index those pages.  

* No robots.txt required.
* Use `noindex` meta tags for HTML pages.
* Use `X-Robots-Tag: noindex` for non HTML resources (images, pdf, etc).
^

{% include shared/remember.liquid title="Note" list=page.notes.searchable %}

### Restricted access from authorized people
Confidential pages you want only those who have right permissions can access. In this case, even if someone finds the URL, the server refuses to present the result without a proper credential. For example:  

* Privately shared content on a social network
* Enterprise expense system

#### Solutions
In this type of pages, you don't want search engines to crawl nor index them.  

* Return response code 401 "Unauthorised" for an access without a proper credential (or redirect the user to a login page)
* Do not use robots.txt to disallow crawling these pages. Otherwise 401 can't be detected.

The restriction mechanism here can be IP address, Cookie, Basic Auth, OAuth, etc. How to implement such authentication / authorization depends on your infrastructure and is out of this article's scope.  

## Request a page removal to search engines if needed
There are cases where you want to remove a search result in the situations such as:  

* The page no longer exists
* The page was accidentally indexed that includes confidential information


Major search engines provide a way to send a request to remove such pages. The process usually takes following:  

1. Make sure the page you will request to remove:
    * is already removed and returns 404.
    * has a proper configuration not to index (ex: noindex)

1. Go to the request page on respective search engines (Google and Bing require you to register and validate ownership of your website.)
1. Send a request.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Check out concrete steps at respective search engines' help pages:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

## Appendix: List of crawler user agents

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)

