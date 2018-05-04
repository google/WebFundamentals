project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New perf audits for preload, preconnect, GIFs, and more.

{# wf_updated_on: 2018-05-04 #}
{# wf_published_on: 2018-05-05 #}
{# wf_tags: lighthouse #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New perf audits for preload, preconnect, GIFs, and more. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Using Lighthouse To Improve Page Load Performance {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

[Lighthouse](/web/tools/lighthouse/) is an automated tool for improving the
quality of your site. You give it a URL, and it provides a list of
recommendations on how to improve page performance, make pages more accessible,
adhere to best practices and more. You can run it from within Chrome DevTools,
as a Chrome Extension, or even as a [Node
module](https://www.npmjs.com/package/lighthouse), which is useful for
continuous integration.

For a while now, Lighthouse has provided many tips for improving page load
performance, such as [enabling text
compression](/web/tools/lighthouse/audits/text-compression) or [reducing
render-blocking scripts](/web/tools/lighthouse/audits/blocking-resources). The
Lighthouse team continues to ship new audits to give you even more useful advice
for making your sites faster. This post is a roundup of newer performance audits
that you may not be aware of, including:

* [Main Thread Work Breakdown](#)
* [Preload Key Requests](#)
* [JavaScript Boot-up Time is High](#)
* [Avoid Page Redirects](#)
* [Unused JavaScript](#)
* [Uses Inefficient Cache Policy on Static Assets](#)
* [Avoid Costly Multiple Round-Trips to Any Origin (Preconnect)](#)
* [Serve <video> Instead of Animated GIF](#)

## Main Thread Work Breakdown

If you’ve ever used the performance panel in Chrome’s dev tools, you know it can
be a bit of a chore to get a breakdown of where CPU time was spent with regard
to JavaScript work. We’re pleased to announce that this information is now
readily and conveniently available via the new **Main Thread Work Breakdown**
audit.

<figure>
  <img src="images/fig-1-1x.png" srcset="images/fig-1-2x.png 2x,
images/fig-1-2x.png 1x" alt="A breakdown of main thread activity in
Lighthouse.">
  <figcaption><strong>Figure 1</strong>. A breakdown of main thread activity in
Lighthouse.</figcaption>
</figure>

This new diagnostic evaluates how much and what kind of JavaScript activity
occurs during page load, which you can use to decide if you should audit your
site’s JavaScript for potential deletions to improve load and runtime
performance.

## Preload Key Requests

When browsers retrieve resources, they do so as they find references to them
within the document and dependent resources. This can be suboptimal at times,
because some resources which are critical to page load can be discovered rather
late in the page load process. Thankfully,
[`rel=preload`](/web/updates/2016/03/link-rel-preload) gives developers the
ability to hint to compliant browsers which resources should be fetched as soon
as possible. The new [**Preload Key
Requests**](/web/tools/lighthouse/audits/preload)
audit lets developers know what resources could benefit from being reprioritized
by `rel=preload`.

<figure>
  <img src="images/fig-2-1x.png" srcset="images/fig-2-2x.png 2x,
images/fig-2-2x.png 1x" alt="The Preload Key Requests Lighthouse audit
recommending a list of resources to consider preloading.">
  <figcaption><strong>Figure 2</strong>. The Preload Key Requests Lighthouse audit
recommending a list of resources to consider preloading.</figcaption>
</figure>

It’s super important you test and compare performance changes with and without
`rel=preload`, as it can affect loading performance in ways you might not expect.
For example, preloading a large image could delay initial render, but the
tradeoff is that the preloaded image will render sooner. Always make sure you’re
cool with the results!

## JavaScript Boot-up Time is High

When too much JavaScript is loaded, the page can become unresponsive as the main
thread parses, compiles, and executes it. 3rd-party scripts and advertisements
are a particular source of main thread-blocking activity that can bog down even
powerful devices. The new [**JavaScript Boot-up Time is
High**](/web/tools/lighthouse/audits/bootup) audit reveals how much CPU time
each script used the page consumes, along with its URL:

<figure></figure>

When you run this audit, you can also [enable third party badges in the network
panel](/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/#chrome_devtools_third-party_script_badging)
and filter the list to identify third party script resources. With the data from
this audit, you’ll be better equipped to find the source of excessive JavaScript
activity that turn pages from snappy to laggy. For scripts specific to your
application, you can employ techniques like [code
splitting](https://webpack.js.org/guides/code-splitting/) and [tree
shaking](https://webpack.js.org/guides/tree-shaking/) to limit the amount of
JavaScript on each page of your site.

## Avoid Page Redirects

Sometimes when a browser requests a URL the server can respond with a [300-level
status
code](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#Redirection_messages),
which causes the browser to redirect to another URL. While redirects are
necessary for SEO and convenience purposes, they add latency to requests. This
is especially true if they redirect to other servers, which can incur additional
DNS lookup and/or connection/TLS negotiation time.

<figure>
  <img src="images/fig-3-1x.png" srcset="images/fig-3-2x.png 2x,
images/fig-3-2x.png 1x" alt="A redirect chain as seen in the network panel of
Chrome’s developer tools.">
  <figcaption><strong>Figure 3</strong>. A redirect chain as seen in the network
panel of Chrome’s developer tools.</figcaption>
</figure>

For landing pages on your site, redirects are especially problematic. To help
you reduce latency and improve loading performance, Lighthouse now offers the
**Avoid Page Redirects** audit, which lets you know when a URL triggers any
redirects.

<figure>
  <img src="images/fig-4-1x.png" srcset="images/fig-4-2x.png 2x,
images/fig-4-2x.png 1x" alt="A list of page redirects in Lighthouse.">
  <figcaption><strong>Figure 4</strong>. A list of page redirects in
Lighthouse.</figcaption>
</figure>

Note that this audit is difficult to trigger in the Chrome version of
Lighthouse, because it analyzes the URL you are currently on, which reflects the
final URL after all redirects have resolved. You’ll only likely to see this
audit populated in the command line version of Lighthouse.

## Unused JavaScript

Dead code can be a serious problem in JavaScript-heavy applications. While dead
code doesn’t pose execution costs as it’s never invoked, it does carry other
undesirable effects. Dead code is still downloaded, parsed, and compiled by the
browser. This affects loading performance and JavaScript boot-up time. Similar
to the coverage panel in Chrome’s dev tools, the **Unused JavaScript** audit
reveals JavaScript downloaded by the current page, but is never used.

<figure>
  <img src="images/fig-5-1x.png" srcset="images/fig-5-2x.png 2x,
images/fig-5-2x.png 1x" alt="">
  <figcaption><strong>Figure 5</strong>.</figcaption>
</figure>

With this audit, you can identify dead code in your applications and remove it
to improve loading performance and reduce system resource usage. Pro tip: You
can also use [the code coverage
panel](/web/updates/2017/04/devtools-release-notes#coverage) in Chrome’s dev
tools to find performance improvement opportunities!

Note: This audit is off by default, and can only be enabled in the Node CLI!

## Uses Inefficient Cache Policy on Static Assets

While much of the performance guidance you read tends to focus on boosting the
speed of a website for first time users, it’s important to [use
caching](/web/fundamentals/performance/optimizing-content-efficiency/http-caching)
to improve performance for returning users as well. [**The Uses Inefficient
Cache Policy on Static Assets**](/web/tools/lighthouse/audits/cache-policy)
audit inspects caching headers for network resources and notifies you if cache
policies for static resources are substandard.

<figure>
  <img src="images/fig-6-1x.png" srcset="images/fig-6-2x.png 2x,
images/fig-6-2x.png 1x" alt="">
  <figcaption><strong>Figure 6</strong>.</figcaption>
</figure>

With the help of this audit, you’ll be able to easily find and fix problems with
your current cache policy, which will greatly improve performance for returning
users. If your app has a high percentage of returning users, they’ll certainly
appreciate the performance benefit a better caching policy will provide!

## Avoid Costly Multiple Round-Trips to Any Origin

When browsers retrieve resources from a server, it can take significant time to
perform a DNS lookup and establish a connection to a server.
[`rel=preconnect`](/web/fundamentals/performance/resource-prioritization#preconnect)
allows developers to mask this latency by establishing connections to other
servers before the browser otherwise would. The **Avoid Costly Multiple
Round-Trips to Any Origin** audit will help you discover opportunities to use
`rel=preconnect`!

<figure>
  <img src="images/fig-7-1x.png" srcset="images/fig-7-2x.png 2x,
images/fig-7-2x.png 1x" alt="A list of origins recommended for
<code>rel=preconnect</code> in Lighthouse.">
  <figcaption><strong>Figure 7</strong>. A list of origins recommended for
<code>rel=preconnect</code> in Lighthouse.</figcaption>
</figure>

When latency for cross-origin assets is reduced, users will begin to perceive
that things are moving along a bit quicker. With this new Lighthouse audit,
you’ll learn of new opportunities to use `rel=preconnect` to do just that.

## Use Video Formats for Animated Content

Animated GIFs are _huge_, often consuming at least several hundred kilobytes if
not several megabytes of data. If you care about loading performance,
[converting those GIFs to
video](/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/)
is the way to go. Thankfully, the **Use Video Formats for Animated Content**
audit has your back.

<figure>
  <img src="images/fig-8-1x.png" srcset="images/fig-8-2x.png 2x,
images/fig-8-2x.png 1x" alt="A recommendation to convert a GIF to video in
Lighthouse.">
  <figcaption><strong>Figure 8</strong>. A recommendation to convert a GIF to
video in Lighthouse.</figcaption>
</figure>

If your site has any GIFs that are over 100 KB, this audit will automatically
flag them and direct you to some guidance on how to convert those GIFs to MPEG-4
and WebM format and embed them. Sites like Imgur have significantly improved
loading performance by converting their GIFs to video. Additionally, if your
site is on a hosting plan with metered bandwidth, the potential cost savings
alone should be enough to persuade you!

## Give Lighthouse a try!

If you're excited about these new audits, update Lighthouse and give them a try!

* For Node users: Run `npm update lighthouse`, or `npm update lighthouse -g` if
you installed Lighthouse globally.
* For Chrome users:
  * The Lighthouse extension should automatically update, but you can manually
update it via `chrome://extensions`.
  * In DevTools, The Audits panel will be shipping with `[version]` in Chrome
`[version]`. You can check your version of Chrome via `chrome://version`. Chrome
updates to a new version about every 6 weeks. You can run the latest Chrome code
by downloading [Chrome
Canary](https://www.google.com/chrome/browser/canary.html).

{% include "comment-widget.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
