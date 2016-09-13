project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Websites are visited not only by humans, but also by search engine web crawlers. Learn how to improve search accuracy and ranking for your website.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-08-30 #}

# Search Optimization {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Websites are visited not only by humans, but also by search engine web crawlers. Learn how to improve search accuracy and ranking for your website.

## TL;DR
- Determine the URL structure of your webpage
- Responsive design is most recommended
- Use <code>rel='canonical'</code> + <code>rel='alternate'</code> for separate desktop/mobile sites
- Use <code>Vary HTTP</code> header for a single URL dynamically serving separate desktop/mobile HTMLs
- Use <code>noindex</code> for pages you want to limit access to those who know the URL
- Use relevant authentication mechanism for pages you want to keep private

## Give Search Engines Your Site Structure

How your website appears in search results is important to multi-device site design. This guide helps you optimize your website for search engines based on its URL structure.

Are you planning to build a responsive webpage? Is there a mobile-specific
version with a separate URL? Are you serving both the desktop version and the
mobile version from the same URL? Regardless, you can always do a better job of
optimizing your website for search engines.

### Give your site a URL structure

There are several ways to serve content to different devices. The three most
common methods are:

**Responsive Web Design:** serves the same HTML from one URL and uses CSS
media queries to determine how the content is rendered on the client side.
For example, Desktop and Mobile: http://www.example.com/

**Separate mobile site:** redirects users to a different URL depending on the
user-agent. For example, Desktop: http://www.example.com/
Mobile: http://m.example.com/

**Dynamic serving:** serves different HTML from one URL depending on the user-
agent. For example: Desktop and Mobile: http://www.example.com/

The best approach is to use **responsive web design**, though many websites
exist that use the other methods.
 
Determine which URL structure suits your webpage. Then try the respective best
practices to optimize it for search engines.

### We recommend responsive web design

The benefit of making your website responsive are:

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* Friendlier for user sharing
* Quicker page load without redirects
* A single URL for search results

<div style="clear:both;"></div>
  
Learn to build websites with responsive web design at [Responsive Layouts](/web/fundamentals/design-and-ui/responsive/).

### Use `link[rel=canonical]` and `link[rel=alternate]` when serving separate URLs

Serving similar contents on a desktop version and a mobile version at different
URLs may cause confusion for both users and search engines because it's not
obvious for viewers that they are intended to be identical. You should indicate:

* That the contents of the two URLs are identical
* Which is the mobile version
* Which is the desktop (canonical) version

This information helps search engines better index content and ensures that
users find what they're looking for in a format that works for their device.

#### Use alternate for desktop

When serving the desktop version, indicate that there's a mobile version on
another URL by adding a `link` tag with a `rel="alternate" attribute that points
to the mobile version in the `href` attribute.

[http://www.example.com/](http://www.example.com/) HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### Use canonical for mobile

When serving the mobile version, indicate that there's a desktop (canonical)
version on another URL by adding a `link` tag with a `rel="canonical"` attribute
that points to the desktop version in the `href` attribute. Help search engines
understand the mobile version is for small screens by adding a `media` attribute
with a value of `"only screen and (max-width: 640px)"` will help search engines
understand that this is explicitly targeting small screens.

[http://m.example.com/](http://m.example.com/) HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Use the Vary HTTP header

Serving different HTML based on device type reduces unnecessary redirects,
serves optimized HTML, and provides single URL for search engines. It also has
several disadvantages:

* There may be intermediate proxies between a user's browsers and the server.
Unless the proxy knows that the content varies depending on user agent, it may serve
unexpected results.
* Changing contents depending on user agent has a risk to be considered 
"[cloaking](https://support.google.com/webmasters/answer/66355)", which is a
violation of Google’s Webmaster Guidelines.

By letting search engines know that the content varies depending on user agent,
they can optimize search results for the user agent that is sending queries.

To indicate that the URL serves different HTML depending on user agent, provide
`Vary: User-Agent` in the HTTP header. This allows search indexing to treat
desktop and mobile versions separately, and intermediate proxies to cache those
contents gracefully.

[http://www.example.com/](http://www.example.com/) HTTP Header


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

To learn more about building URL structure across desktop and mobile, read [Building Smartphone-Optimized Websites](https://developers.google.com/webmasters/smartphone-sites/).


## Control crawling and indexing from search engines

Being listed properly on search engines is critical to delivering your website
to the world, but poor configuration may cause unexpected content to be included
in the results. This section helps you avoid such problems by explaining how
crawlers work and how they index websites.

Sharing information has no better place than the web. When you publish a
document, it's immediately available to the entire world. The page will be
visible to anyone who knows the URL. That's where search engines come in. To be
available to the world, search engines need to find your website.

However, there are some cases where you don't want people to find those
documents even though you want to put them on the web. For example, a blog's
admin page is something only certain people should have access to. There's no
benefit to letting people find those pages through search engines.

In this section, you'll also learn how to inform search engines that you want
certain pages to not appear in the search results.


### The difference between "crawl" and "index"

Before learning how to control search results, understanding how search engines interact with your webpage is important. From your site's point of view, there are roughly two things search engines do to your site: crawling and indexing.  

**Crawling** is when a search engine bot fetches your webpage to analyse its content. The content will be stored in the search engine's database and may be used for populating search result details, ranking pages, and discovering new pages by following links.  

**Indexing** is when a search engine stores a website's URL and any associated information in its database so it will be ready to be served as a search result.  

<!-- TODO: Verify note type! --> 
Note: Many people confuses crawling and indexing. Prohibiting crawling doesn't
mean the page won't show up in the search results. For example, if a third-party
website has a link to one of your webpages it may still be indexed even though
it's blocked from crawling. In that case, the search result will lack a detailed
description.

### Control crawling with robots.txt

You can control how well-behaved crawlers access your webpage using a text file
called robots.txt. Robots.txt is a simple text file describing how you want
search bots to crawl your site. (Not all crawlers necessarily respect
robots.txt. Imagine that anyone can create their own stray crawlers.)

Place `robots.txt` at the root directory of your website's host. For example,
if your site's host is `http://pages.example.com/`, then the robots.txt file
should be located at `http://pages.example.com/robots.txt`. If the domain has
different schema, subdomains, or other ports, they will be considered as
different hosts and you should have `robots.txt` for each of their root
directories.

Here's a quick example:  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

This indicates that you want to disallow all bots from crawling your entire
website.

Here's another example:

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

You can specify the behavior per bot (user agents) by indicating a user-agent
name. In the above case, you are disallowing the user agent called `Googlebot`
from crawling `/nogooglebot/` and all contents below the directory.  

Learn more about each search engine's bots at their help pages:

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)

<!-- TODO: Verify note type! -->
Note: <code>robots.txt</code> is only required <b>if</b> you want to control the way your site is crawled. Do not return response code 500 for the url: <code>/robots.txt</code>. That will terminate all subsequent crawls for the entire host resulting in empty search result details.

#### Test robots.txt

Depending on which crawlers your robots.txt is targeting, search engine
providers may provide a tool to test robots.txt. Taking Google as an example,
there's a validator in [Webmaster Tools](https://www.google.com/webmasters/tools
/robots-testing-tool) that you can use to test your robots.txt.

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex provides [a similar tool](https://webmaster.yandex.com/robots.xml).  

### Control search indexing with meta tags

If you don't want your webpage to show up in search results, robots.txt isn't
the solution. You need to allow those pages to be crawled, and explicitly
indicate that you don't want them to be indexed. There are two solutions:

To indicate you don't want an HTML page to be indexed, use a specific kind of `<meta>` tag, one with its attributes set as `name="robots"` and `content="noindex"`.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

By changing the value of the `name` attribute to a specific user agent name, you can narrow the scope. For example, `name="googlebot"` (case insensitive) indicates that you don't want Googlebot to index the page.  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

Other options for the robots meta tag can be found here:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

[Find lists of user agent names](#appendix-list-of-crawler-user-agents).

#### X-Robots-Tag

To indicate you don't want resources such as images, stylesheets, or script
files to be indexed, add `X-Robots-Tag: noindex` in an HTTP header.


    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

If you want to narrow the scope to a specific user agent, insert the user agent name before `noindex`.  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

To learn more about X-Robots-Tag:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

<!-- TODO: Verify note type! -->
Note: If you disallow crawls using robots.txt,  search bots still may index those pages without knowing that you don't want those pages to be indexed. This can happen because:<ul><li>Search bots may find your webpages by following links from other websites.</li><li>Search engines can't detect <code>noindex</code> because it can't crawl.</li></ul>

Don't expect robots.txt to control search indexes.

### Examples by content type

What are the best solutions to control crawling and indexing? Here are some example solutions for different types of pages.

#### Fully accessible and searchable by anyone

Most of the pages on the web are usually of this type.  

* No robots.txt required.
* No robots meta tags required.

#### Limited access by people who know the URL

Examples include:  

* Login page for a blog admin console.
* Private content shared by passing a URL for novice internet users.

In this case, you don't want search engines to index those pages.  

* No robots.txt required.
* Use `noindex` meta tags for HTML pages.
* Use `X-Robots-Tag: noindex` for non HTML resources (images, pdf, etc).

<!-- TODO: Verify note type! -->
Note: Wondering if you should prohibit crawling JavaScript and Stylesheet files? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google tries its best to understand them</a> so that it can find contents available through modern technologies such as AJAX. You should definitely allow crawlers to crawl JavaScript.

#### Restricted access from authorized people

In this case, even if someone finds the URL, the server refuses to present the result without a proper credential. For example:  

* Privately shared content on a social network.
* Enterprise expense system.

In these types of pages, search engines should neither crawl nor index them.  

* Return response code 401 "Unauthorised" for an access without a proper
credential (or redirect the user to a login page).
* Do not use robots.txt to disallow crawling these pages. Otherwise, 401 can't be detected.

The restriction mechanism here can be an IP address, a Cookie, Basic Auth,
OAuth, etc. How to implement such authentication/authorization depends on your
infrastructure and is out of this article's scope.

### Request a page removal from a search engine

There are cases where you want to remove a search result. For example:  

* The page no longer exists.
* A page was accidentally indexed that includes confidential information.


Major search engines provide a way to send a request to remove such pages. The process usually takes the following:  

1. Make sure the page you want removed:
    * Is already deleted from your server and returns 404
    * Is configured not to be indexed (ex: noindex)

1. Go to the request page on each search engine. (Google and Bing require you to register and validate ownership of your website.)
1. Send a request.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Check out concrete steps at the respective search engines' help pages:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### Appendix: List of crawler user agents

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)

