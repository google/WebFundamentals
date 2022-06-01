project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2018-11-19 #}
{# wf_updated_on: 2022-06-01 #}
{# wf_blink_components: N/A #}
{# wf_featured_image: /web/showcase/2018/images/nikkei/featured.jpg #}
{# wf_featured_snippet: With a publishing history of more than 140 years, Nikkei is one of the most authoritative media businesses in Japan. To provide a better user experience and accelerate their business on the web, Nikkei successfully launched a Progressive Web App in November 2017, and they’re seeing amazing results from the new platform. #}
{# wf_tags: casestudy,progressive-web-apps #}
{# wf_region: asia #}
{# wf_vertical: media #}
{# wf_featured_date: 2018-11-19 #}
{# wf_blink_components: N/A #}

# Nikkei achieves a new level of quality and performance with their multi-page PWA {: .page-title }

<style>
  figcaption {
    text-align: center;
    font-size: small;
  }
  .no-bullets {
    list-style-type: none;
    padding-inline-start: 0;
  }
</style>

With a publishing history of more than 140 years, [Nikkei](https://r.nikkei.com/)
is one of the most authoritative media businesses in Japan. Along with their
print newspaper, they have over 450 million monthly visits to their digital
properties. To provide a better user experience and accelerate their business
on the web, Nikkei successfully launched a Progressive Web App (PWA) -
<https://r.nikkei.com> - in November 2017. They’re now seeing amazing
results from the new platform.

<div class="attempt-left">
  <p><b>Performance gains</b></p>
  <ul class="no-bullets">
    <li>
      <span class="compare-better"></span> <b>2X</b> better Speed Index
    </li>
    <li>
      <span class="compare-better"></span>
      <b>14</b> seconds faster time-to-interactive
    </li>
    <li>
      <span class="compare-better"></span>
      <b>75% faster</b> loading with prefetch
    </li>
  </ul>
</div>

<div class="attempt-right">
  <p><b>Business impact</b></p>
  <ul class="no-bullets">
    <li>
      <span class="compare-better"></span> <b>2.3X</b> organic traffic
    </li>
    <li>
      <span class="compare-better"></span>
      <b>58%</b> more conversions (subscriptions)
    </li>
    <li>
      <span class="compare-better"></span>
      <b>49%</b> more daily active users
    </li>
    <li>
      <span class="compare-better"></span>
      <b>2X</b> page views per session
    </li>
  </ul>
</div>

<a class="button button-primary" download href="/web/showcase/2018/pdf/nikkei-pwa.pdf">
  Download Business Focused PDF Case Study
</a>

<div class="clearfix"></div>


## Business overview

### Challenge

Nikkei saw a rapid rise in mobile traffic to their legacy website as
smartphones became the main point of entry to the web for many users.
However, using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), an auditing tool that
scans a web page and gives recommendations on how to improve across multiple
categories, they understood that their site wasn’t fully optimized for mobile
across multiple areas and was very slow to load.

Their website was taking ~20 secs to become consistently interactive and
averaged 10 seconds on the Speed Index. Knowing that 53% of mobile users
will abandon an experience if it takes more than 3 seconds to
load, Nikkei wanted to reduce their load time to provide a better experience
and accelerate their business on the web.


> The value of speed is indisputable, especially for financial news. We made
> speed one of our core metrics, and our customers have appreciated the
> change. <br>**Taihei Shigemori**, Manager, Digital Strategy


### Results

<figure class="attempt-right screenshot">
  <a  href="/web/showcase/2018/images/nikkei/nikkei-01.jpg">
    <img src="/web/showcase/2018/images/nikkei/nikkei-01.jpg">
  </a>
  <figcaption>
    Audit run in Apr 2018 on old site hosted at
    <a href="http://mw.nikkei.com">mw.nikkei.com</a>
  </figcaption>
</figure>

Nikkei achieved impressive performance gains. Their Lighthouse score soared
from 23 to 82. Their time-to-interactive measurement improved by 14 seconds.
Organic traffic, speed, conversion rate, and active daily users all rose as
well.

The PWA is a multi-page app (MPA) that reduces front-end complexity,
built with Vanilla JavaScript. Five core front-end engineers worked for a
year to achieve this performance.

<div class="clearfix"></div>

> The Nikkei front-end engineers have proved that great UX brings good
> business performance. We’re fully invested in continuing our journey of
> bringing a new level of quality to the web. <br> **Hiroyuki Higashi**,
> Product Manager, Nikkei


<div class="clearfix"></div>

### Solution

Nikkei created and launched a Progressive Web App, using responsive design,
vanilla JavaScript, and a multi-page architecture, they focused on building a
delightful user experience. By adding a service worker, they were able to
provide predictable performance, regardless of the network. This
also ensures that top articles are always available and loaded almost
immediately because they're stored using Cache Storage. They added a web app
manifest, and together with their service worker this allows users to
install the PWA, so it’s easily accessible. And to ensure
performance was entirely within their control, they optimized their
3rd-party JavaScript.

### Best practices

* Improve loading speed and interactivity by using modern web APIs,
  compression, and code optimization practices.
* Progressively enhance UX by adding PWA features such as offline support
  and Add to Home Screen.
* Build performance budgets into performance strategy.


## Technical Deep Dive {: #deep-dive }

### Speed matters

Speed is more important than ever. As smartphones became the main browsing
device for many users, Nikkei saw a rapid increase of mobile traffic on
their service. But using [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/), they realized
that their legacy website wasn’t fully optimized for mobile, with the Speed
Index averaging 10 seconds, very slow initial load, and a large JavaScript
bundle. It was time for Nikkei to rebuild their website and adapt
web-performance best practices. Here are the results and key performance
optimizations in the new PWA, <r.nikkei.com>.

### Leveraging web APIs & best practices to speed loading

#### Preload key requests

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-02.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-02.jpg">
</a>

It is
[important to prioritize the loading of the critical path](/web/tools/lighthouse/audits/critical-request-chains). Using HTTP/2 Server Push, they're able to prioritize critical JavaScript and
CSS bundles they know a user will need.

<div class="clearfix"></div>

#### Avoid multiple, costly round trips to any origin

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-03.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-03.jpg">
</a>

The website needed to load 3rd party resources for tracking, ads and many
other use cases. They used
[`<link rel=preconnect>`](/web/fundamentals/performance/resource-prioritization#preconnect)
to pre-resolve DNS/TCP/SSL handshake and negotiation for these key 3rd party
origins.

<div class="clearfix"></div>

#### Dynamically prefetch the next page

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-04.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-04.jpg">
</a>
<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-05.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-05.jpg">
</a>
<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-06.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-06.jpg">
</a>

When they were confident that the user will navigate to a certain page, they
didn’t just wait for the navigation to happen. Nikkei dynamically adds
[`<link rel=prefetch>`](/web/fundamentals/performance/resource-prioritization#prefetch)
to the `<head>` and pre-fetches the next page before the user actually clicks
the link. This enables instant page navigation.

<div class="clearfix"></div>

#### Inline Critical-path CSS

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-07.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-07.jpg">
</a>

Reducing render blocking CSS is one of the best practices of speed loading. The
website inlines all the critical CSS with 0
[render blocking stylesheets](/web/tools/lighthouse/audits/blocking-resources).
This optimization reduced first meaningful paint by more than 1 second.

<div class="clearfix"></div>

#### Optimize JavaScript bundles

<a class="attempt-right screenshot" href="/web/showcase/2018/images/nikkei/nikkei-08.jpg">
  <img src="/web/showcase/2018/images/nikkei/nikkei-08.jpg">
</a>

In their previous experience, Nikkei's JavaScript bundles were bloated,
weighing over 300KB in total. Through a rewrite to vanilla JavaScript and
modern bundling optimizations, such as route-based chunking and tree-shaking,
they were able to trim this bloat. They reduced their JavaScript bundle size
by 80%, dropping it to 60KB with RollUp.

<div class="clearfix"></div>

#### Other best practices implemented

* [Compression](/web/tools/lighthouse/audits/text-compression): Gzip/Brotli all
  compressible resources using Fastly CDN
* [Caching](/web/tools/lighthouse/audits/cache-policy): Enable HTTP caching,
  edge side caching
* [Image optimization](/web/tools/lighthouse/audits/unoptimized-images): Use
  [imgix](https://www.imgix.com/) for optimization and image format detection
* [Lazy-load non-critical resources](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/):
  Use intersection observer API to load below-the-fold fragments
* [Have a web font-loading strategy](/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization):
  Prioritize the use of system font
* [Optimize first meaningful paint](/web/tools/lighthouse/audits/first-contentful-paint):
  Render the content server side
* [Adopt performance budgets](https://infrequently.org/2017/10/can-you-afford-it-real-world-web-performance-budgets/):
  Keeping JavaScript transmission and parse/compile times low


### Optimizing third-party JavaScript

While it’s not as easy to optimize 3rd party JavaScripts compared to your
own scripts, Nikkei successfully minified and bundled all ad-related scripts,
which are now served from its own content delivery network (CDN). Ad-related
tags usually provide a snippet to initiate and load other required scripts,
which often block the page rendering and also require extra network
turnaround time for each of the scripts downloaded. Nikkei took the following
approach and improved initialization time by 100ms, plus reduced JS size by 30%:

* Bundle all the required scripts using a JS bundler (e.g., Webpack)
* Async load the bundled script, so that it doesn’t block the page rendering
* Attach the calculated ad banner to Shadow DOM (vs iframe)
* Progressively load ads on user scroll with Intersection Observer API


### Progressively enhancing the website

<video autoplay loop muted class="screenshot attempt-right">
  <source
      src="/web/showcase/2018/images/nikkei/nikkei-09.webm"
      type="video/webm" />
  <source
      src="/web/showcase/2018/images/nikkei/nikkei-09.mp4"
      type="video/mp4" />
</video>

In addition to these basic optimizations, Nikkei leveraged
[Web App Manifest](/web/fundamentals/web-app-manifest/) and
[service workers](/web/fundamentals/primers/service-workers/) to make their
website [installable](/web/fundamentals/app-install-banners/) and even work
offline. By using the [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/)
strategy in their service worker, all core resources and top articles are
stored in the Cache Storage and reused even in contingency situations such as
a flaky or offline network, providing consistent, optimized performance.

<div class="clearfix"></div>

### Hack the Nikkei

A traditional daily newspaper company with a history of 140+ years successfully
accelerated its digitalization through the power of web and PWA. Nikkei’s
front-end engineers proved that great UX delivers strong  business performance.
The company will continue its journey of bringing a new level of quality to the web.


## Further reading

<ul class="attempt-left">
  <li>
    <a href="https://hack.nikkei.com/blog/nikkei-featured-at-google-io/">
      Google I/Oで日経電子版が事例として紹介された話 (Japanese)
    </a>
  </li>
  <li>
    <a href="https://hack.nikkei.com/blog/tech_book_fest04_ds_ad_tech/">
      日経電子版を支える広告技術 (Japanese)
    </a>
  </li>
</ul>
<div class="video-wrapper attempt-right">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Mv-l3-tJgGk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>
