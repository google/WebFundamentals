project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: This article shows how to run headless Chrome and Puppeteer as part of your web server to "SSR" a static version of client-side JS apps for improved loading performance and SEO friendliness.

{# wf_updated_on: 2018-03-17 #}
{# wf_published_on: 2018-03-16 #}
{# wf_blink_components: Internals>Headless #}
{# wf_tags: puppeteer,headless,testing,ssr,prerender,seo #}

# Headless Chrome: an answer to server-side rendering JS sites {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}

<style>
figure, figcaption {
  text-align: center;
}
figure img.border {
  border: 1px solid #ccc;
}
figcaption {
  font-style: italic;
}
figure.flexbox {
  display: flex;
  /* align-items: center; */
  justify-content: space-around;
}
figure.flexbox > div {
  flex: 0 1 48%;
}
</style>

### TL;DR {: #tldr .hide-from-toc}

Headless Chrome can be a drop-in solution for turning dynamic JS sites into
static HTML pages. Running it on a web server allows you to **prerender any
modern JS features** so content **loads fast** and is **indexable by search
crawlers**.
{: .objective }

The techniques in this article show how to use Puppeteer's APIs to add
server-side rendering <abbr title="Server-Side Rendering">SSR</abbr>
capabilities to an Express web server. The best part is **the app itself
requires almost no code changes**. Headless does all the heavy lifting. In a
couple of lines of code you can SSR any page and get its final markup.

A taste of what's to come:

```javascript
import puppeteer from 'puppeteer';

async function ssr(url) {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  return html;
}
```

Note: I'll be using ES modules (`import`) in this article, which require Node
8.5.0+ and running with the `--experimental-modules` flag. Feel free to use
`require()` statements if they bother you.
[Read more](https://nodejs.org/api/esm.html) about Node's ES Modules support.

## Introduction

If SEO has served me well, you landed on this article for one of two reasons.
First, you've built a web app and it's not being indexed by search! Your app
might be a <abbr title="Single Page Application">SPA</abbr>,
[PWA](/web/progressive-web-apps/), using vanilla JS, or built with
something more complex like a library or framework. To be honest, your tech
stack doesn't matter. What matters is that you spent a lot of time building
Awesome Web Thing and users are unable to discover it. The other reason you
might be here is because some article mentioned that server-side rendering is
good for performance. You're here for quick win to reduce [JavaScript startup cost](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/)
and improve
[first meaningful paint](/web/tools/lighthouse/audits/first-meaningful-paint).

Headless Chrome can solve both of these problems.

### Search engines fail the modern web {: #modern }

Search engines weren't built to understand client-side JS applications. They
were built to crawl static HTML pages. Google Search,
aka GoogleBot, is the one exception which
[executes the JavaScript on a page](/search/docs/guides/rendering). However, its
JS engine is based on a browser that was released three years ago (Chrome 41)!
The web has changed a lot since that time. ES6 classes are here.
[Modules](https://www.chromestatus.com/feature/5365692190687232) are a thing
now. Arrow functions are super convenient. There tons of **awesome new features
... great stuff that we can't use!**

Due to the limitations of search crawlers, it is extremely
challenging to build a modern web experience. We're forced to transpile,
compile, and polyfill for the foreseeable future. -Eric
{: .key-point }

Even if a JS feature is well supported in modern browsers, the reality is
that you should use it with caution. The reason is that GoogleBot (among other
search engines) don't support these new goodies. If said feature plays a
critical role in rendering your page, the search bot hits the app, gets JS
errors, and can't render your busted page. That can have adverse effect on
search indexing and SEO.

## Prerendering pages using headless Chrome {: #headless }

All search engines know HTML. What we need to "solve" the SEO problem is
a tool that produces HTML from executing JS. 🤔 What if I told you there is
such a tool?

1. The tool knows how to run _all_ types of modern JavaScript and spit out
static HTML.
2. The tool stays up to date as the web adds features.
3. You can quickly run the tool against an existing app with little to no code
changes.

Sounds good right? **That tool is the browser**!

Headless Chrome doesn't care what library, framework, or tool chain you use.
It eats JavaScript for breakfast and spits out static HTML before lunch. Well,
hopefully a lot faster than that :) -Eric
{: .key-point }

If you're in Node, Puppeteer is an easy way to work with headless Chrome. Its
APIs make it possible to take a client-side app and prerender (or "SSR") its
markup. Below is an example of doing that.

### 1. Example JS app

Let's start with a dynamic page that generates its HTML via JavaScript:

**public/index.html**

```
<html>
<body>
  <div id="container">
    <!-- Populated by the JS below. -->
  </div>
</body>
<script>
function renderPosts(posts, container) {
  const html = posts.reduce((html, post) => {
    return `${html}
      <li class="post">
        <h2>${post.title}</h2>
        <div class="summary">${post.summary}</div>
        <p>${post.content}</p>
      </li>`;
  }, '');

  // CAREFUL: assumes html is sanitized.
  container.innerHTML = `<ul id="posts">${html}</ul>`;
}

(async() => {
  const container = document.querySelector('#container');
  const posts = await fetch('/posts').then(resp => resp.json());
  renderPosts(posts, container);
})();
</script>
</html>
```

### 2. SSR function

Next, we'll take the `ssr()` function from earlier and beef it up a bit:

**ssr.mjs**

```javascript
import puppeteer from 'puppeteer';

async function ssr(url) {
  const start = Date.now();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    // networkidle0 waits for the network to be idle (no requests for 500ms).
    // The page's JS has likely produced markup by this point, but wait longer
    // if your site lazy loads, etc.
    await page.goto(url, {waitUntil: 'networkidle0'});
    await page.waitForSelector('#posts'); // ensure #posts exists in the DOM.
  } catch (err) {
    console.err(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();

  console.info(`Headless rendered page in: ${Date.now() - start}ms`);

  return html;
}

export {ssr as default};
```

Here's the major changes:

1. Add basic error handling if loading the page times out.
2. Add a call to `page.waitForSelector('#posts')`. This ensures that the posts
exist in the DOM before we dump the serialized page.
3. Add science. Log how long headless takes to render the page.
4. Stick the code in a module named `ssr.mjs`.

### 3. Example web server {: #webserver }

Finally, here's the small express server that brings it all together. The main
handler prerenders the URL `http://localhost/index.html` (e.g. the main page)
and serves the result as its response. Users will immediately see posts when
they hit the page because the static markup is now part of the response.

**server.mjs**

```javascript
import express from 'express';
import ssr from './ssr.mjs';

const app = express();

app.get('/', async (req, res, next) => {
  const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
  return res.status(200).send(html); // Serve prerendered page as response.
});

app.listen(8080, () => console.log('Server started. Press Ctrl+C to quit'));
```

To run this example, install the dependencies (`npm i --save puppeteer express`)
and run the server using Node 8.5.0+ and the `--experimental-modules` flag:
{: .note }

Example of the response sent back by this server:

```html
<html>
<body>
  <div id="container">
    <ul id="posts">
      <li class="post">
        <h2>Title 1</h2>
        <div class="summary">Summary 1</div>
        <p>post content 1</p>
      </li>
      <li class="post">
        <h2>Title 2</h2>
        <div class="summary">Summary 2</div>
        <p>post content 2</p>
      </li>
      ...
    </ul>
  </div>
</body>
<script>
...
</script>
</html>
```

### 4. Performance results {: #perfresults}

What about performance numbers? On one of my
[apps](https://devwebfeed.appspot.com/ssr)
([code](https://github.com/ebidel/devwebfeed/blob/master/server.mjs)),
DevTools **3G Slow emulation** results in a
[FCP](/web/fundamentals/performance/user-centric-performance-metrics) that is
**8.37s faster**. That's huge! And we didn't make any code changes to the
client-side app.

Note: these numbers incorporate most of the performance
[optimizations](#optimizations) I discuss below.

<table>
  <tr><th></th><th>First Paint (FP)</th><th>First Contentful Paint (FCP)</th></tr>
  <tr><td>Client-side app</td><td>4s</td><td> 11s</td></tr>
  <tr><td>SSR version</td><td>2.3s</td><td>~2.3s</td></tr>
</table>

With these results users see meaningful content much quicker. The server-side
rendered app is **no longer reliant on JavaScript to load + shows posts**.

## Preventing re-hydration {: #rerender }

Remember when I said "we didn't make any code changes to the
client-side app"? That was a
lie.

Our Express app takes a request, uses Puppeteer to load the page into
headless, and serves the result as a response. But this setup has a
problem.

The **same JS that executes in headless Chrome** on the server **runs again**
when the user's browser loads the page on the frontend. We have two places
generating markup. [#doublerender](https://www.youtube.com/watch?v=MX0D4oZwCsA)!
{: .caution }

Let's fix it. We need to tell the page its HTML is already in place.
The solution I found was to have the page JS check if `<ul id="posts">` is
already in the DOM at load time. If it is, we know the page was SSR'd and can
avoid re-adding posts again. 👍

**public/index.html**

```javascript
<html>
<body>
  <div id="container">
    <!-- Populated by JS (below) or by prerendering (server). Either way,
         #container gets populated with the posts markup:
      <ul id="posts">...</ul>
    -->
  </div>
</body>
<script>
...
(async() => {
  const container = document.querySelector('#container');

  // Posts markup is already in DOM if we're seeing a SSR'd.
  // Don't re-hydrate the psots here on the client.
  const PRE_RENDERED = container.querySelector('#posts');
  if (!PRE_RENDERED) {
    const posts = await fetch('/posts').then(resp => resp.json());
    renderPosts(posts, container);
  }
})();
</script>
</html>
```

## Prerendering for search crawlers {: #searchssr }

Another option is to serve prerendered content just to the search
crawlers and leave regular users to consume the client-side app.

Do this by checking the `User-Agent` for the search bot(s) you want to target:

**server.mjs**

```javascript
import express from 'express';
import ssr from './ssr.mjs';

const app = express();

// Only serve a prerendered page to search crawlers.
app.get('/', async (req, res, next) => {
  if (req.get('User-Agent').match(/googlebot|bingbot/i)) {
    const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
    return res.status(200).send(html);
  }
  // Not a crawler? We'll fallback to serving index.html as a static page.
  next();
});

app.use(express.static('public', {extensions: ['html', 'htm']}));
app.listen(8080, () => console.log('Server started. Press Ctrl+C to quit'));
```

## Optimizations

There are lots of interesting optimizations to make to `ssr()`. Some are
quick wins while others may be more speculative. The performance benefits
you see may ultimately depend on the types of pages you prerender and the
complexity of the app.

### Cache rendered results {: #cacheresults }

Duh! Caching the rendered HTML is the biggest win to speed up the response
times. When the page gets re-requested, you avoid running headless Chrome
altogether.

**ssr.mjs**

```javascript
const RENDER_CACHE = new Map(); // cache of rendered pages.

async function ssr(url, updateCache = false) {
  if (RENDER_CACHE.has(url) && !updateCache) {
    return RENDER_CACHE.get(url);
  }

  const start = Date.now();
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  console.info(`Headless rendered page in: ${Date.now() - start}ms`);

  RENDER_CACHE.set(url, html); // cache rendered page.

  return html;
}
```

### Aborting non-essential requests {: #abort }

Right now, the page is sent to headless Chrome as-is. The entire
page and all of the resources it requests get loaded unconditionally.
However, we're only interested in the rendered markup and the JS
requests that produced it.

**Network requests that don't construct DOM are wasteful**. For example,
resources like images, fonts, stylesheets, and media don't participate in
building the HTML of a page. They style or supplement the structure of the page
but they don't explicitly create it. We can tell the browser to ignore these
resources! This can reduce the workload headless Chrome has to chew through,
save bandwidth, and potentially speed up your rendering time for larger pages.

The [Devtools Protocol](https://chromedevtools.github.io/devtools-protocol/)
supports a powerful feature called [Network interception](https://chromedevtools.github.io/devtools-protocol/tot/Network#event-requestIntercepted)
which can be used to **modify requests before they're issued by the browser**.
Puppeteer supports network interception by turning on
[`page.setRequestInterception(true)`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagesetrequestinterceptionvalue)
and listening for the page's `request` event. That allows us to abort requests
for certain resources and let others continue through.

**ssr.mjs**

```javascript
async function ssr(url) {
  ...
  const page = await browser.newPage();

  // 1. Intercept network requests.
  await page.setRequestInterception(true);

  page.on('request', req => {
    // 2. Ignore requests for resources that don't produce DOM
    // (images, stylesheets, media).
    const whitelist = ['document', 'script', 'xhr', 'fetch'];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }

    // 3. Pass through all other requests.
    req.continue();
  });

  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();

  return html;
}
```

Note: I'm using a whitelist to play it safe and allowing all other types of
requests to continue. This may preemptively avoid any gotchas that arise
from aborting more resources than necessary.

### Inline critical resources {: #inline }

Most of us use separate build tools like `gulp` and
[critical](https://github.com/addyosmani/critical) to process an app and
inline critical CSS/JS into the page at build-time. Doing so can speed
up first meaningful paint because the browser makes fewer requests during
initial page load.

Instead of a separate build tool, **use the browser as your build tool**!
We can use Puppeteer to manipulate the page's DOM, inlining styles, JavaScript,
or whatever else you want to stick in the page before prerendering it.

This example shows how to intercept responses for local stylesheets
and inline those resources into the page as `<style>` tags:

**ssr.mjs**

```javascript
import url from 'url';
const URL = url.URL;

async function ssr(url) {
  ...
  const stylesheetContent = {};

  // 1. Stash the responses of local stylesheets.
  page.on('response', async resp => {
    const responseUrl = resp.url();
    const sameOrigin = new URL(responseUrl).origin === new URL(url).origin;
    const isStylesheet = resp.request().resourceType() === 'stylesheet';
    if (sameOrigin && isStylesheet) {
      stylesheetContent[responseUrl] = await resp.text();
    }
  });

  // 2. Load page as normal, waiting for network requests to be idle.
  await page.goto(url, {waitUntil: 'networkidle0'});

  // 3. Inline the CSS.
  // Replace stylesheets in the page with their equivalent <style>.
  await page.$$eval('link[rel="stylesheet"]', (links, content) => {
    links.forEach(link => {
      const cssText = content[link.href];
      if (cssText) {
        const style = document.createElement('style');
        style.textContent = cssText;
        link.replaceWith(style);
      }
    });
  }, stylesheetContents);

  // 4. Get updated serialized HTML of page.
  const html = await page.content();
  await browser.close();

  return html;
}
```

This code:

1. Use a `page.on('response')` handler to listen for network responses.
2. Stashes the responses of local stylesheets.
3. Replaces `<link rel="stylesheet">` in the DOM with an equivalent `<style>`.
The `style.textContent` is set to the stylesheet response.

### Auto-minify resources {: #minify }

Another trick you can do with network interception is to **modify the responses
returned by a request**.

As an example, say you want to minify the CSS in your app but also want to
keep the convenience having it unminified when developing. Assuming you've
setup another tool to pre-minify `styles.css`, one can use `Request.respond()`
to rewrite the response of `styles.css` to be the content of `styles.min.css`.

**ssr.mjs**

```javascript
import fs from 'fs';

async function ssr(url) {
  ...

  // 1. Intercept network requests.
  await page.setRequestInterception(true);

  page.on('request', req => {
    // 2. If request is for styles.css, respond with the minified version.
    if (req.url().endsWith('styles.css')) {
      return req.respond({
        status: 200,
        contentType: 'text/css',
        body: fs.readFileSync('./public/styles.min.css', 'utf-8')
      });
    }
    ...

    req.continue();
  });
  ...

  const html = await page.content();
  await browser.close();

  return html;
}
```

### Preload critical resources {: #preload }

If you're not inlining resources, you can still take advantage of things like
h2 server push and [preload](/web/updates/2016/03/link-rel-preload) small
critical resources like CSS or JS.

Just send the `Link rel=preload` header along with the page response:

**server.mjs**

```javascript
app.get('/', async (req, res, next) => {
  res.append('Link', `<${url}/styles.css>; rel=preload; as=style`);
  const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
  return res.status(200).send(html);
});
```

### Reusing a single Chrome instance across renders {: #reuseinstance }

Launching a new browser for every prerender creates a lot of overhead.
Instead, you may want to launch a single instance and reuse it for rendering
multiple pages.

Puppeteer can reconnect to an existing instance of Chrome by calling
`puppeteer.connect()` and passing it the instance's remote debugging URL.
The responsibility of launching the browser moves out of `ssr()` and into the
server:

**server.mjs**

```javascript
import express from 'express';
import puppeteer from 'puppeteer';
import ssr from './ssr.mjs';

let browserWSEndpoint = null;
const app = express();

app.get('/', async (req, res, next) => {
  if (!browserWSEndpoint) {
    const browser = await puppeteer.launch();
    browserWSEndpoint = await browser.wsEndpoint();
  }

  const url = `${req.protocol}://${req.get('host')}/index.html`;
  const html = await ssr(url, browserWSEndpoint);

  return res.status(200).send(html);
});
```

**ssr.mjs**

```javascript
import puppeteer from 'puppeteer';

async function ssr(url, browserWSEndpoint = null) {
  ...
  let browser;
  if (browserWSEndpoint) {
    console.info('Connecting to existing chrome instance.');
    browser = await puppeteer.connect({browserWSEndpoint});
  } else {
    console.info('Launching new instance of chrome.');
    browser = await puppeteer.launch();
  }

  const page = await browser.newPage();
  ...
  await page.close(); // Close the page we opened (not the browser).

  return html;
}
```

## Other considerations {: #other }

### Signal to the page: "You're being rendered in headless" {: #letitknow }

It may be helpful to let the page know it's being rendered by headless Chrome
on the server. For example, you could adapt the page in some way, change a lazy
loading strategy, or disable features when it's being run in headless. I found
that adding a url parameter is a simple way to handle this case.

```javascript
import url from 'url';
const URL = url.URL;

async function ssr(url) {
  ...
  // Add ?headless to the URL so the page has a signal
  // it's being loaded by headless Chrome.
  const renderUrl = new URL(url);
  renderUrl.searchParams.set('headless', '');
  await page.goto(renderUrl, {waitUntil: 'networkidle0'});
  ...

  return html;
}
```

Tip: Another handy method to look at is [`Page.evaluateOnNewDocument()`](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageevaluateonnewdocumentpagefunction-args)
. It allows you to inject code into the page and have Puppeteer run that code
before the rest of the page's JavaScript executes.
{: .success }

### Avoid inflating Analytics pageviews {: #analytics }

Be careful if you're using Analytics on your site. Prerendering pages will
likely result in inflated pageview numbers. Specifically, **you'll see 2x the
number of hits**. One hit when headless Chrome renders the page and another
when the user's browser renders it.

So what's the fix? Use network interception to abort any request(s) that tried
to load the Analytics library. Page hits never get recorded if the code never
loads.

```
page.on('request', req => {
  // Don't load Google Analytics lib requests so pagviews aren't 2x.
  const blacklist = ['/gtag/js', 'ga.js', 'analytics.js'];
  if (blacklist.find(regex => req.url().match(regex))) {
    return req.abort();
  }
  ...
  req.continue();
});
```

Boom 💥.

## Conclusion

Puppeteer makes it easy to server-side render pages by running headless Chrome,
as a companion, on your web server. My favorite "feature" this approach is that
you can literally **improve loading performance** and gain **SEO benefits
without making significant code changes** to your app!

Note: If you're curious to see a working app that uses the techniques described
in this article, check out [this app](https://devwebfeed.appspot.com/ssr) and
[it's code](https://github.com/ebidel/devwebfeed/blob/master/server.mjs).

## Appendix

### Discussion of prior art {: #art }

Server-side rendering client-side apps is hard. How had? Just look
at how many [npm packages](https://www.npmjs.com/search?q=server%20side%20rendering)
people have written which are dedicated to the topic. There are countless
[patterns](https://en.wikipedia.org/wiki/Isomorphic_JavaScript), tools, and
[services](https://prerender.io/) available to help with SSRing JS apps.

####  Isomorphic / Universal JavaScript {: #ujs }

The concept of Universal JavaScript is simple: the same code that runs on
server also runs on the client (the browser). You share code between server and
client and everyone feels a moment of zen.

In practice, I've found universal JS difficult to pull off. A personal story...

> I recently started a [a project](https://github.com/ebidel/devwebfeed/blob/master/server.mjs)
and wanted to give [lit-html](https://github.com/Polymer/lit-html) a try. Lit
is a great little library that lets you write [HTML &lt;template>s](https://www.html5rocks.com/en/tutorials/webcomponents/template/) using JS
template literals, then efficiently render those templates to
DOM. The problem is that its core feature (using the `<template>` element)
doesn't work outside of the browser. That means it won't work in a Node server.
My hopes of sharing code to SSR between Node and the frontend were thrown out
the window.

> I finally came to the realization that I could use headless Chrome to SSR
render the app. It didn't matter if Chrome ran by the hands of a user or
automated on a server. Chrome happily runs any JS you give it. No questions
asked.

Headless Chrome enables "isomorphic JS" between server and client. It's a great
option if your library doesn't work on the server (Node).
{: .objective }

#### Prerender.io {: #prerender }

The Node community has built tons of tools for
dealing with SSR JS apps. No surprises there!

Personally, I've found that
<abbr title="Your mileage may vary">YMMV</abbr> with some of these tools, so
definitely do your homework before committing to one. For example,
some SSR tools are older and don't use headless Chrome (or any headless browser
for that matter). Instead, they use PhantomJS (aka old Safari), which means your
pages aren't going to render properly if they're using newer features.

One of the notable exceptions is [Prerender](https://github.com/prerender/prerender/).
Prerender is interesting in that it uses headless Chrome and comes with drop-in
[middleware for Express](https://github.com/prerender/prerender-node):

```javascript
const prerender = require('prerender');
const server = prerender();
server.use(prerender.removeScriptTags());
server.use(prerender.blockResources());
server.start();
```

However, Prerender leaves out the details of downloading + installing Chrome
on different platforms. Oftentimes, that's
[tricky](/web/tools/puppeteer/troubleshooting#running_puppeteer_in_docker),
which is why [Puppeteer does for you](/web/tools/puppeteer/faq#q_which_chromium_version_does_puppeteer_use).
Other issues I've seen come up with the online service,
[prerender.io](https://prerender.io/). Here's how chromestatus.com renders on
prerender.io:

<figure class="flexbox">
  <div>
    <img src="/web/tools/puppeteer/articles/images/chromestatus-normal.png"
         alt="chromestatus rendered in a browser" class="border">
    <figcaption>Site rendered in a browser <span class="compare-better"></span></figcaption>
  </div>
  <div>
    <img src="/web/tools/puppeteer/articles/images/chromestatus-prerender.png"
         alt="chromestatus rendered by prerender" class="border">
    <figcaption>Same site rendered by prerender.io <span class="compare-worse"></span></figcaption>
  </div>
</figure>

Personally, I'd rather have full control over rendering pages. As I've shown
above, rolling your own SSR solution with Puppeteer is an absolute breeze 💨.

<br>

{% include "comment-widget.html" %}
