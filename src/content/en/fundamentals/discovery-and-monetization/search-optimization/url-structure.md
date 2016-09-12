project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: How your website appears in search results is an important aspect of multi-device site design. This guide helps you learn to optimize your website for search engines based on its URL structure.

{# wf_review_required #}
{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-10-07 #}

# Give Search Engines Your Site Structure {: .page-title }

{% include "_shared/contributors/agektmr.html" %}

How your website appears in search results is an important aspect of multi-device site design. This guide helps you learn to optimize your website for search engines based on its URL structure.


## TL;DR
- Determine the URL structure of your webpage
- Responsive design is most recommended
- Use <code>rel='canonical'</code> + <code>rel='alternate'</code> for separate desktop/mobile sites
- Use <code>Vary HTTP</code> header for a single URL dynamically serving separate desktop/mobile HTMLs


Are you planning to make your webpage responsive? Is there a mobile-specific
version with a separate URL? Are you serving both the desktop version and the mobile
version from the same URL? You might be able to do a better job optimizing your
website for search engines.

### Determine the URL structure of your webpage
There are several ways to serve content to different devices. The three most
common methods are:

1. **Responsive web design:** serves the same HTML for one URL and uses CSS
media queries to determine how the content is rendered on the client side.  
ex) Desktop and Mobile: http://www.example.com/
1. **Separate mobile site:** redirects users to a different URL depending on the
user-agent.  
ex) Desktop: http://www.example.com/ Mobile: http://m.example.com/
1. **Dynamic serving:** serves different HTML for one URL depending on the user-
agent.  
ex) Desktop and Mobile: http://www.example.com/

We recommend using responsive web design, but a lot of
websites already serve a mobile-specific version. Some serve a mobile version using
the same URL as desktop.
  
Determine which URL structure suits your webpage, and then try the respective best
practices to optimize it for search engines.

### Responsive web design is recommended
The benefit of making your website responsive is:

* User friendly for sharing
* Quicker page load without redirects
* A single point of URL for search results

<img src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

By making it responsive:

* It's easier for users to access or share your webpage.
* There's no need to redirect users depending on user agent, so it's faster.
* The maintenance cost is lower for both website and crawlers.
  
Learn how to build your website with responsive web design at [Responsive Layouts](/web/fundamentals/design-and-ui/responsive/) section.

### Use `link[rel=canonical]` and `link[rel=alternate]` when serving from separate URLs
Serving similar contents on a desktop version and a mobile version at different
URLs may cause confusion for both users and search engines because it's not
obvious for viewers that they are intended to be identical. You should indicate:

* That the contents of those two URLs are identical
* Which is the mobile version
* Which is the desktop (canonical) version

This information can help search engines better index content and ensure users
find what they're looking for in a format that works for their device.

#### Use `link[rel=alternate]` for the desktop version
On the desktop page, indicate that there's a mobile version on a different URL by
adding the `link` tag with `rel="alternate"` pointing to the mobile version URL with
`href`. Adding the `media` attribute with a value of `"only screen and (max-width:
640px)"` will help search engines understand that this is explicitly targeting
small screens.

[http://www.example.com/](http://www.example.com/) HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### Use `link[rel=canonical]` for the mobile version
On mobile-specific pages, indicate that there's a desktop (canonical) version at
a different URL by adding `link` tag with `rel="canonical"` pointing to desktop
version URL with `href`.

[http://m.example.com/](http://m.example.com/) HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Use `Vary HTTP` header for device oriented serving site
Serving different HTML based on the device type can reduce unnecessary redirects,
serves optimized HTML, and provides a single URL for search engines, but it also has
several disadvantages:

* There may be intermediate proxies between the user's browsers and the server.
Unless the proxy knows the content varies depending on the user agent, it may serve
unexpected results.
* Changing contents depending on the user agent has a risk to be considered as
[cloaking](https://support.google.com/webmasters/answer/66355), a violation of
Google’s Webmaster Guidelines.

By letting search engines know that the content varies depending on the user agent,
they can optimize search results for the user agent that is sending queries.

#### Use `Vary HTTP` header
To indicate that the URL serves different HTML depending on the user agent,
provide `Vary: User-Agent` in the HTTP header.

[http://www.example.com/](http://www.example.com/) HTTP Header


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

By providing the `Vary: User-Agent` header, search engines and proxies understand
the transferred content may vary depending on the user agent. This allows the search
index to treat the desktop and mobile versions separately, and intermediate
proxies to cache those contents gracefully.

To learn more about building URL structure across desktop and mobile, read [Building Smartphone-Optimized Websites](https://developers.google.com/webmasters/smartphone-sites/).



## Control crawling and indexing from search engines {: .page-title }

{% include "_shared/contributors/agektmr.html" %}

Being listed properly on search engines is critical to delivering your website to the world, but poor configuration may cause unexpected content to be included in the results. Learn how crawlers work and how they index your website in order to avoid such problems.


Sharing information to the world has no better place than the web. When you publish a document to the web, it's immediately available to the rest of the world. The page is visible to anyone as long as they know the URL, and that's where search engines come in. When search engines learn about your website, your documents will be searchable and accessible from people all around the world.  

However, there are some cases where you don't want people to find those documents even though you want to put them on the web. For example, a blog's admin page is something only limited people should have access to. There's nothing beneficial for you in letting people search those pages through search engines.  

In this document, you will learn how to inform search engines that you want certain pages to not appear in the search results.  


### Understand the difference between "crawl" and "index"
Before learning how to control search results, understanding how search engines interact with your webpage is important. From your site's point of view, there are basically two things that search engines do to your site: "crawling" and "indexing".  

"Crawling" is when a search engine bot accesses your webpage, fetches it, and analyzes its content. The content will be stored in the search engine's database and can be used for populating search result details, ranking, and discovering new pages by following links.  

"Indexing" is when a search engine stores a website's URL and any associated information to its database so it will be ready to be served as a search result.  

<!-- TODO: Verify note type! -->
Note: Many people confuses crawling and indexing. Prohibiting crawling doesn't mean the page won't show up in the search results. For example, when a third-party website has a link to one of your webpages that is blocked from crawling, the page may still be listed in search results. (In that case, the result won't have a detailed description.)

### Control search bots' crawling
You can actually control how well-behaved crawlers access your webpage using a text file called robots.txt. (Not all crawlers necessarily respect robots.txt. Imagine that anyone can create their own stray crawlers.)  

#### How to use robots.txt
Robots.txt is a simple text file describing how you want search bots to crawl your site.

Place `robots.txt` at the root directory of your website's host: If your site's host is `http://pages.example.com/`, then the `robots.txt` file should be located at `http://pages.example.com/robots.txt`. If the domain has different schema, subdomains, or other ports, they will be considered as different hosts and you should have `robots.txt` for each of their root directories.  

Here's a quick example:  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

This indicates that you want to disallow all kind of bots from crawling your entire website.  

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

You can specify the behavior per bots (user agents) by indicating a user-agent name after `User-agent:`. In the above case, you are disallowing the sduser agent called `Googlebot` to crawl `/nogooglebot/` and all contents below the directory.  

You can learn how to create robots.txt further on relevant search engines' help pages:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)
^

<!-- TODO: Verify note type! -->
Note: <code>robots.txt</code> is only required <b>if</b> you want to control the way your site is crawled. Do not return response code 500 for the URL: <code>/robots.txt</code>; doing that will terminate all subsequent crawls for the entire host, resulting in empty search result details.

#### Test robots.txt
Depending on which crawlers your robots.txt is targeting, search engine providers can provide a tool to test robots.txt. Taking Google as an example, there's a validator in [Webmaster Tools](https://www.google.com/webmasters/tools/robots-testing-tool). Use it to test by yourself if your robots.txt works as expected.  

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex also provides [a similar tool](https://webmaster.yandex.com/robots.xml).  

### Control search indexing
If you don't want your webpage to show up in the search results, robots.txt isn't the right solution. You need to allow those pages to be crawled, and explicitly indicate that you don't want them to be indexed. There are two solutions.  

#### Use robots meta tags
To indicate that you don't want an HTML page to be indexed, insert a specific kind of `meta` tag. By setting its attributes as `name="robots"` and `content="noindex"`, you can indicate that you don't want any search engines to index the page.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

By changing the value of the `name` attribute to a specific user agent name, you can narrow the scope. For example, `name="googlebot"` indicates that you don't want Googlebot to index the page (case insensitive).  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

Other options for robots meta tag can be found here:  

* [Google](https://developers.google.com/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

[Find lists of user agent names](#appendix-list-of-crawler-user-agents).

#### X-Robots-Tag
To indicate that you don't want resources other than HTML (such as images, style sheets, or script files) to be indexed, add `X-Robots-Tag: noindex` in the HTTP header.  


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
^

<!-- TODO: Verify note type! -->
Note: If you disallow crawls using robots.txt, search bots still might index those pages without knowing that you don't want those pages to be indexed. This can happen because:<ul><li>Search bots might find your webpages by following links from other websites.</li><li>Search engines can't detect <code>noindex</code> because it can't crawl.</li></ul>

Don't expect robots.txt to control search indexes.

### Solution examples by type of contents
What are the best solutions to control crawling and indexing? Here are some example solutions depending on the types of pages.  

#### Fully accessible and searchable from anyone
Pages you want anyone to access and expect as much traffic as possible. Most of the pages on the web are usually of this type.  

##### Solutions

* No robots.txt required.
* No robots meta tags required.

#### Limited access from people who know the URL
Non-confidential pages you want only limited people who know the URL to access. Examples are:  

* Login page for a blog admin console
* Private content shared by passing a URL for novice internet users

##### Solutions
In this type, you don't want search engines to index those pages.  

* No robots.txt required.
* Use `noindex` meta tags for HTML pages.
* Use `X-Robots-Tag: noindex` for non-HTML resources (images, PDFs, etc).
^

<!-- TODO: Verify note type! -->
Note: Are you wondering if you should prohibit crawling JavaScript and style sheet files? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google now tries its best to understand them</a> to find contents available through modern technologies such as AJAX. You should definitely allow crawlers to crawl it.

#### Restricted access from authorized people
Confidential pages you want only those who have the right permissions can access. In this case, even if someone finds the URL, the server refuses to present the result without a proper credential. For example:  

* Privately shared content on a social network
* Enterprise expense system

##### Solutions
For this type of pages, you want search engines to neither crawl nor index them.  

* Return response code 401 "Unauthorised" for an access without a proper credential (or redirect the user to a login page)
* Do not use robots.txt to disallow crawling these pages. Otherwise, 401 can't be detected.

The restriction mechanism here can be IP address, Cookie, Basic Auth, OAuth, etc. How to implement such authentication/authorization depends on your infrastructure and is out of this article's scope.  

### Request a page removal to search engines if needed
There are cases where you want to remove a search result, such as:  

* The page no longer exists.
* A page that includes confidential information was accidentally indexed.


Major search engines provide a way to send a request to remove such pages. The process usually does the following:  

1. Make sure that the page you will request to remove:
    * Is already removed and returns 404
    * Has a proper configuration not to index (ex: noindex)

1. Go to the request page on respective search engines. (Google and Bing require you to register and validate ownership of your website.)
1. Send a request.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

For more information about the specific steps by search engine, see the respective search engines' help pages:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### Appendix: List of crawler user agents

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)

