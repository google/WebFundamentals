project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: This article shows how to run headless Chrome and Puppeteer as part of your web server to "SSR" a static version of client-side JS apps for improved loading performance and SEO friendliness.

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2018-03-12 #}
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

Headless Chrome can be a drop-in
solution for turning dynamic JS sites into static HTML pages. Running it on
a web server allows you to serve pre-rendered content that **loads fast** for users
and is **indexable by search crawlers**.
{: .objective }

The techniques in this article show how to use Puppeteer's APIs to add
<abbr title="Server-Side Rendering">SSR</abbr>ing capabilities to an Express
web server. The best part is that they **require almost no code changes to the
JS app** itself. Headless Chrome and Puppeteer do all the heavy lifting for you.
It's a couple of lines of code:

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

I'll be using ES modules (`import`) in this article, which require Node 8.5.0+
and running Node with the `--experimental-modules` flag. Feel free to use
`require()` statements if they bother you or [read more](https://nodejs.org/api/esm.html)
about ES Modules support in Node.
{: .note }

## Introduction

If SEO has served me well, you landed on this article for one of two reasons.
First, you've built a web app and it's not being indexed by search! Your app
might be a <abbr title="Single Page Application">SPA</abbr>,
[PWA](/web/progressive-web-apps/), using vanilla JS, or built with
something more complex like a library or framework. Your tech stack doesn't
matter. What matters is that you spent a lot of time building Awesome Web Thing
and now you want users to discover it. Alternatively, you're here because an
article mentioned that server-side rendering is good for performance? You're
looking for that quick win to reduce [JavaScript startup cost](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/)
and improve [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint).

#### The problem is that search engines fail the modern web {: #modern }

Search engines weren't built to understand client-side JS applications. They
were built to crawl static HTML pages. Google Search,
aka GoogleBot, is the one exception which [executes the page's JavaScript](https://developers.google.com/search/docs/guides/rendering). However, its
JS engine is based on a browser that was released over three years ago (Chrome 41)!
The web has changed a lot in that amount of time. ES6 classes are here.
[Modules](https://www.chromestatus.com/feature/5365692190687232) are a thing now.
Arrow functions are super convenient. There's a bunch of **awesome new features
... that can't use!**

The limitations of search crawlers make it extremely challenging to build a
modern web experience. We're forced to transpile, compile, and polyfill for
the foreseeable future. -Eric
{: .key-point }

The moral of the story is that we still need to use newer JS features with
caution, even if they're well supported in modern browsers. The
reason is that GoogleBot (among other search engines) don't support these new
features. They hit your page and see JS errors. If JS plays a
critical role in rendering the page, the search engine merely sees a broken
page. That can have adverse effects on indexing/SEO.

## Prerender pages using headless {: #headless }

All search engines know HTML. So what we need to "solve" this SEO problem is
a tool that produces HTML from executing JS. 🤔 What if I told you there was
such a tool? It knows how to rum any type of modern JavaScript and spit out
static HTML. It stays up to date as the web adds new features and you can run
the tool to produce a static version of your JS site with little to no work.
Sounds good right? That **tool is the browser**!

Headless Chrome doesn't care what library, framework, or crazy tools chain you use.
It eats JavaScript for breakfast and spits out static HTML before lunch.
{: .note }

Puppeteer is an easy way for working with headless Chrome. Using it's APIs, it's
possible to take a client-side app and pre-render (or "SSR") its markup. Below
is an example of doing that.

First, a dynamic page that generates its HTML via JavaScript:

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

  container.innerHTML = `<ul id="posts">${html}</ul>` // CAREFUL! assumes html is sanitized.
}

(async() => {
  const container = document.querySelector('#container');
  const posts = await fetch('/posts').then(resp => resp.json());
  renderPosts(posts, container);
})();
</script>
</html>
```

Next, we'll stick the `ssr()` function from earlier in a separate module and
beef it up a little:

1. Add basic error handling if loading the page times out.
2. Add a call to `page.waitForSelector('#posts')`. This ensures the posts exist
in the DOM before we dump the serialized page.
3. Log how long it takes for headless to render the page.

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
    await page.waitForSelector('#posts'); // ensure the #posts div exists in the DOM.
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

Lastly, a small express server that brings it all together. Its main handler,
uses `ssr()` to load `index.html` into headless Chrome and return the serialized
page:

**server.mjs**

```javascript
import express from 'express';
import ssr from './ssr.mjs';

const app = express();

app.get('/', async (req, res, next) => {
  // Serve pre-rendered page to search crawlers.
  const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
  return res.status(200).send(html);
});

app.listen(8080, () => {
  console.log('Server started. Press Ctrl+C to quit');
});
```

To run this example, install the dependencies (`npm i --save puppeteer express`)
and run the server using Node 8.5.0+ and the `--experimental-modules` flag:
{: .note }

Now when a user hits `myapp.com/`, rather than a pure client-side version,
they'll immediately see posts! They main page response contains the markup
and we don't hae to wait for JS to load and a `fetch()` to be made!

Example pre-rendered response:

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

## Preventing content fron re-rendering on the client {: #rerender}

Remember when I said "no changes needed to the JS app"? Yea, that was a
lie.

So far, our Express server takes a request, uses Puppeteer to load a dynamic
page in headless Chrome, and serves a static/pre-rendered version back as the
response. But there's a problem.

The same **JS that executed in headless Chrome on the server** and generated the
prerendered markup **will run again when the browser loads the page**
on the client. [#doublerender](https://www.youtube.com/watch?v=MX0D4oZwCsA)!
{: .key-point }

Let's fix that. We need a way to tell the page the HTML is already in place.
The solution I came up with is to add a flag that avoids the client-side
rendering if `<div id="posts">` is present at page load. If it's present when
the page loads, we know the page was SSR'd 👍

**public/index.html** (re-rendering prevention)

```javascript
<html>
<body>
  <div id="container">
    <!-- Populated by the JS below or by SSR on the server. -->
  </div>
</body>
<script>
...

(async() => {
  const container = document.querySelector('#container');

  // Posts markup is already in DOM if we're seeing a SSR'd.
  // Don't re-hydrate the psots here on the client.
  const PRE_RENDER = container.querySelector('#posts');
  if (!PRE_RENDER) {
    const posts = await fetch('/posts').then(resp => resp.json());
    renderPosts(posts, container);
  }
})();
</script>
</html>
```

## Prerendering for search crawlers {: #searchssr }

Another option is to serve the prerendered page just to the search
crawlers and let regular users consume the the client-side app. For that,
just check the `User-Agent` header of the search bot you want to target:

**server.mjs**

```javascript
import express from 'express';
import ssr from './ssr.mjs';

const app = express();

// Only serve a pre-rendered page to search crawlers.
app.get('/', async (req, res, next) => {
  if (req.get('User-Agent').match(/googlebot|bingbot/i)) {
    const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
    return res.status(200).send(html);
  }
  // Not a crawler? We'll fallback to serving index.html as a static page for the route /.
  next();
});

app.use(express.static('public', {extensions: ['html', 'htm']}));

app.listen(8080, () => {
  console.log('Server started. Press Ctrl+C to quit');
});
```

## Optimizations

There are all sorts of interesting optimizations to make to `ssr()`. Some are
quick wins, while others may be more speculative. The performance benefits may
depend on the types of pages you pre-render and the complexity of the app.

### Cache rendered results {: #cacheresults }

Caching the resultaing HTML as you render pages will speed up response times.
If a page is requested again, the server will already have the rendered page
and you can avoid headless Chrome altogether:

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

### Aborting requests that don't produce DOM {: #abort }

Right now, the page is sent to headless Chrome as-is. The entire page and all
of the resources it requests are being loaded, unconditionally. However, we're
only interested the markup produced by the JS resources.

**Network requests that do not construct DOM are wasteful**. For example,
resources like images, fonts, stylesheets, and media don't participate in
building the HTML of a page. They style or supplement the structure of the page
but they don't explicitly create it. We can tell the browser to ignore these
resources! For larger pages, this may reduce the workload headless Chrome has
to chew through, save bandwidth, and potentially speed up your rendering time.

To abort requests in Puppeteer, turn on request interception and abort resources
that you want to ignore

**ssr.mjs**

```javascript
async function ssr(url) {
  ...
  const page = await browser.newPage();

  await page.setRequestInterception(true); // Intercept network requests.

  page.on('request', req => {
    // Ignore requests for resources that don't produce DOM
    // (images, stylesheets, media). Pass through all other requests.
    const whitelist = ['document', 'script', 'xhr', 'fetch'];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }
    req.continue();
  });

  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  ...

  return html;
}
```

I'm using a whitelist to play it safe. All other types of requests are continued
to avoid any gotchas.

### Auto-minify JS/CSS resources {: #minify }

Here's a neat trick. We can use request interception to return a different
response than what the request was for. As an example, say you wanted to serve
minified CSS for the SSR'd version of your app.

Asuming you've used another tool to pre-minify `styles.css` into
`styles.min.css`, you can use `Request.respond()` to respond to the request
with the minified version of the file rather than the normal version:

**ssr.mjs**

```javascript
import fs from 'fs';

async function ssr(url) {
  ...
  await page.setRequestInterception(true); // Intercept network requests.

  page.on('request', req => {
    // Respond with a minified version of styles.css.
    if (req.url().endsWith('styles.css')) {
      const body = fs.readFileSync('./public/styles.min.css', 'utf-8');
      return req.respond({status: 200, contentType: 'text/css', body});
    }

    const whitelist = ['document', 'script', 'xhr', 'fetch'];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }

    req.continue();
  });
  ...

  return html;
}
```

### Inline critical resources {: #inline }

Puppeteer allows us to intercept network requests and modify requests before
they're issued by the browser.

**ssr.mjs**

```javascript
import fs from 'fs';
import url from 'url';

async function ssr(url) {
  ...

  await page.setRequestInterception(true); // Intercept network requests.

  page.on('request', req => {
    const url = req.url();

    // Respond with a minified version of the file!
    if (url.endsWith('styles.css')) {
      const body = fs.readFileSync('./public/styles.min.css', 'utf-8');
      return req.respond({status: 200, contentType: 'text/css', body});
    }

    // Add stylesheets to whitelist so we can read their responses in
    // page.on('response') and inline the content into the page.
    const whitelist = ['document', 'script', 'xhr', 'fetch', 'stylesheet'];
    if (!whitelist.includes(req.resourceType())) {
      return req.abort();
    }

    req.continue();
  });

  const stylesheetContents = {};

  page.on('response', async resp => {
    const responseUrl = resp.url();
    const sameOrigin = new url.URL(responseUrl).origin === new url.URL(url).origin;
    // Only inline local resources.
    if (sameOrigin && resp.request().resourceType() === 'stylesheet') {
      stylesheetContents[responseUrl] = await resp.text();
    }
  });

  await page.$$eval('link[rel="stylesheet"]', (sheets, stylesheetContents) => {
    sheets.forEach(link => {
      const css = stylesheetContents[link.href];
      if (css) {
        const style = document.createElement('style');
        style.textContent = css;
        link.replaceWith(style);
      }
    });
  }, stylesheetContents);

  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized HTML of page DOM.
  await browser.close();
  console.info(`Headless rendered page in: ${Date.now() - start}ms`);

  RENDER_CACHE.set(url, html); // cache rendered page.

  return html;
}
```

### Reusing an existing instance of Chrome {: #reuseinstance }

Launching a new browser instance for every new prerender is a lot of overhead.
Instead, you may want to launch a single instance and reuse it for rendering
multiple pages.

In Puppeteer, you can reconnect to an existing instance of Chrome using
`puppeteer.connect()`. The server becomes responsible for launching the browser
and handing it off to `ssr()` for reuse.

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
  await page.close(); // close page we opened.

  return html;
}
```

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

### Preload critical resources {: #preload }

Since we have a server, feel free to take advantage of it. Depending on
your app, another optimization might by to server push a few critical resources:

**server.mjs**

```javascript
app.get('/', async (req, res, next) => {
  const html = await ssr(`${req.protocol}://${req.get('host')}/index.html`);
  res.append('Link', `<${url}/styles.css>; rel=preload; as=style`); // h2 push styles.
  return res.status(200).send(html);
});
```

### Do less rendering work {: #lessrendering }

TODO

`display: none` entire page?

## Other considerations {: #other }

Analytics

Add param so client-side page can know it's being rendered by headless on the server.

  const urlToFetch = new URL(url);
  urlToFetch.searchParams.set('headless', '');

## Prior art {: #art }

### The (many) solutions for SSRing {: #ssrsolns }

Server-side rendering client-side apps is hard. How had? Just look
at how many [npm packages](https://www.npmjs.com/search?q=server%20side%20rendering) people have written which are dedicated to the topic. There are countless [patterns](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) and [services](https://prerender.io/) available.

###  Isomorphic / Universal JavaScript {: #ujs }

The concept of Universal JavaScript is simple: the same code that runs on
server also runs in the browser. You share code between server and client and
everyone feels a moment of zen.

In practice, I've found universal JS difficult to pull off.

A concrete example...

I recently started a project and wanted to try
[lit-html](https://github.com/Polymer/lit-html). Lit is a great little library
that lets you write [HTML &lt;template>s](https://www.html5rocks.com/en/tutorials/webcomponents/template/) using JS
template literals, then efficiently render (and re-render) those templates to
DOM. The problem is that its core feature (using the `<template>` element)
doesn't work outside of the browser. That means it won't work on the server.
My hopes of sharing code between Node and the frontend were thrown out the door.

Or was it?

## What about Prerender.io? {: #prerender }

No surprises here, but the Node community has built lots of tools for
dealing with SSR JS apps. Personally, I've found that <abbr title="Your mileage may vary">YMMV</abbr> with some of SSR tools out there so definitely do your
homework before committing to one.

Some SSR tools are older and don't use headless Chrome. Instead, they use
PhantomJS/old Safari, which means pages aren't going to render correctly if
you're using newer web platform features.

One notable module that helps with SSR is [Prerender](https://github.com/prerender/prerender/). Prerender is interesting in that it uses headless Chrome (yay!) and has
drop-in [middleware for Express](https://github.com/prerender/prerender-node):

```javascript
const prerender = require('prerender');

const server = prerender();
server.use(prerender.removeScriptTags());
server.use(prerender.blockResources());
server.start();
```

However, definitely do your homework before committing to a tool. For example,
Prerender leaves out the details of downloading + installing Chrome on the
system. That's [fairly tricky](/web/tools/puppeteer/troubleshooting#running_puppeteer_in_docker) to get right and something Puppeteer [does for you](/web/tools/puppeteer/faq#q_which_chromium_version_does_puppeteer_use). Other
issues I've seen happen in the online service, [prerender.io](https://prerender.io/).

Here's what happened to me rendering chromestatus.com:

<figure class="flexbox">
  <div>
    <img src="/web/tools/puppeteer/articles/images/chromestatus-normal.png" alt="chromestatus rendered in a browser" class="border">
    <figcaption>Site rendered in a browser</figcaption>
  </div>
  <div>
    <img src="/web/tools/puppeteer/articles/images/chromestatus-prerender.png" alt="chromestatus rendered by prerender" class="border">
    <figcaption>Site rendered by prerender.io</figcaption>
  </div>
</figure>

Personally, I'd rather have full control over how my pages rendered. and not
delegate to a service. As I've shown above, rolling your own SSR solution with
Puppeteer is a breeze 💨.

## Conclusion

My favorite "feature" of this technique is that you can
**improve loading performance** and gain
**SEO benefits without making code changes** to your app!

So go ahead. Build a client-side any using any framework, library, or feature
you want. Normal users will be served the client-side (dynamic) version of your
page. Search crawlers will get your static HTML version.

<br>

{% include "comment-widget.html" %}
