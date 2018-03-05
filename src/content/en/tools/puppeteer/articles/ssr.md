project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: This article shows how to run headless Chrome and Puppeteer as part of your web server to "SSR" a static version of client-side JS apps for improved loading performance and SEO friendliness.

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-03-05 #}
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

Running Headless Chrome on a server can be a drop-in solution for turning
dynamic JS sites into static HTML pages. Use it to serve pre-rendered content,
that's **indexable by search crawlers** and **loads fast** for users.
{: .objective }

The techniques in this article show how to use Puppeteer's
APIs to add <abbr title="Server-Side Rendering">SSR</abbr>ing capabilities to
an existing Express server. The best part is that they **require
no code changes to the JS app**. Headless Chrome does all the heavy lifting for
you.

A taste of what's to come:

```javascript
import puppeteer from 'puppeteer'; // or const puppeteer = require('puppeteer');

async function ssr(url) {
  const browser = await puppeteer.launch({headless: true});
  // Wait for network to be idle (no requests for 500ms).
  // e.g. JS should have produced markup by this point.
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized page DOM.
  await browser.close();
  return html;
}
```

I'll be using ES modules (`import`) in this article, which require Node 8.5.0+
and running Node with the `--experimental-modules` flag. Feel free to use
`require()` statements if they bother you or [read more](https://nodejs.org/api/esm.html)
about ES Modules support in Node.
{: .caution }

## Introduction

### Why server-side render?

Happy users and happy crawlers my friends!

#### Search crawlers hate JS apps {: .seojs }

Most search engines don't handle client-side applications very well (if at all).
Google's crawler is the exception. It [runs JavaScript](https://developers.google.com/search/docs/guides/rendering), but the crawler
is based off of Chrome 41. That means using newer web platform features like
ES6 classes, arrow function, [modules](https://www.chromestatus.com/feature/5365692190687232), CSS custom properties may cause pages to break or not render properly.

IMO, building for the modern web is at odds with the current state of search
crawlers and SEO. Hopefully search crawlers get a lot smarter some day :(
{: .objective }

### SSR has performance benefits {: .ssrpref }

- Most search crawls do not run client-side JS. All crawlers handle static HTML.
- SSR means less Sending less JS down the wire can help [JavaScript startup cost](/web/fundamentals/performance/optimizing-content-efficiency/javascript-startup-optimization/) and improve [first meaningful paint](https://developers.google.com/web/tools/lighthouse/audits/first-meaningful-paint).

## Introduction

If SEO has served me well, hopefully you've landed here because you've got
a client-side app and want to somehow (possibly through dark magic) server-side
render it. It could be a <abbr title="Single Page Application">SPA</abbr>, a
[PWA](/web/progressive-web-apps/), or built using a framework. It doesn't matter.
Maybe you want to achieve better first load performance or make sure your app
works great for SEO and search crawlers? Doesn't matter. If you have a frontend
web app, Headless Chrome has got you covered.

Server-side rendering client-side apps is hard. How had? Just look
at how many [npm packages](https://www.npmjs.com/search?q=server%20side%20rendering) people have written which are dedicated to the topic. There are countless [patterns](https://en.wikipedia.org/wiki/Isomorphic_JavaScript) and [services](https://prerender.io/) available.

### Universal JavaScript

There's lots of buzz about universal JavaScript. The idea is great. The same
code runs on the client and the server. But in practice, universal JS is hard
to pull off.

A concrete example...

I recently started a project and wanted to try [lit-html](https://github.com/Polymer/lit-html). Lit is a great little library that lets
you write [HTML &lt;template>s](https://www.html5rocks.com/en/tutorials/webcomponents/template/) using JS
template literals, then efficiently render (and re-render) those templates to
DOM. The problem is that it's core feature (using `<template>` element) doesn't
work outside of the browser. That means it won't work on the server. My hopes
of universal JS was already out the door on this project.

Or was it?

### What about Prerender? {: .prerender }

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

### Express SSR example {: .express }

Install the dependencies:

```sh
npm i --save puppeteer express
```

Here's a small express server that shows how to fire up Puppeteer, load a page
in headless Chrome, get its render markup, and serve the results:

**server.mjs**

```javascript
import express from 'express';
import puppeteer from 'puppeteer';

async function ssr(url) {
  const start = Date.now();
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  // Wait for network to be idle (no requests for 500ms). JS has likely
  // produced markup by this point, but wait longer if your site lazy loads, etc..
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // returns the serialized page.

  await browser.close();
  console.info(`Headless rendered page in: ${Date.now() - start}ms`);
  return html;
}

const app = express();

app.get('/', async (req, res, next) => {
  // Serve prerendered page to search crawlers.
  if (req.get('User-Agent').match(/googlebot|bingbot/i)) {
    const url = `${req.protocol}://${req.get('host')}/index.html`;
    const html = await ssr(url);
    // res.append('Link', `<${url}/styles.css>; rel=preload; as=style`); // Push styles.
    return res.status(200).send(html);
  }
  next();
});

app.use(express.static('public', {extensions: ['html', 'htm']}));

app.listen(8080, () => {
  console.log('Server started. Press Ctrl+C to quit');
});
```

Run the server with Node 8.5.0+:

```sh
node --experimental-modules server.mjs
```

## How it works {: .how }

Under the hood, headless Chrome loading you page. All the JS/HTML/CSS resources
are loaded, Chrome runs the JS, applies styles, etc. The **result is a static page**.
3. Grab the resulting markup produced by the page's JS. Hint: it's static.

## Optimizations

There are plenty of optimizations we can make to the `ssr()` function. Some are
quick wins, while others are more speculative. The performance gains may depend
on the types of pages you're pre-rendering and the complexity of your app.

### Cache rendered results

The first optimization to make is to cache the HTML results as you render pages.
That way, if the page is requested again, you can server the rendered HTML
directly from the cache and avoid booting up headless Chrome:

```javascript
import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map(); // cache of rendered pages.

async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return RENDER_CACHE.get(url);
  }

  const start = Date.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized page DOM.
  await browser.close();
  console.info(`Headless rendered page in: ${Date.now() - start}ms`);

  RENDER_CACHE.set(url, html); // cache rendered page.

  return html;
}
```

### Abort requests that don't produce DOM

We're using headless Chrome on the server to run the page's JS and get the
HTML it produces. Since we're only interested in the markup that's generate by
the page's JS, any network request that doesn't produce DOM is wasteful.

An optimization is to ignore those requests. Requests for resources like
images, fonts, stylesheets, and media can safely be ignored. They do not
participate in building the HTML of the page.

In other words, we don't care
what the markup looks li

Network requests that don't create markup (images, fonts, stylesheets, media)
do not actively participate in generating the page, we can safely abort them. For larger pages, this can reduce the workload headless Chrome has to chew through, save bandwidth, and potentially
speed up the SSR rendering time.

To abort requests in Puppeteer, turn on request interception and filter
out the resource types you want to ignore:

```javascript
import puppeteer from 'puppeteer';

const RENDER_CACHE = new Map(); // Cache of rendered HTML pages.

async function ssr(url) {
  if (RENDER_CACHE.has(url)) {
    return RENDER_CACHE.get(url);
  }

  const start = Date.now();
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Interception network requests.
  await page.setRequestInterception(true);

  page.on('request', req => {
    // Ignore requests for resources that don't produce markup (images,
    // stylesheets, media)
    const whitelist = ['document', 'script', 'xhr', 'fetch', 'websocket'];
    if (!whitelist.includes(req.resourceType())) {
      req.abort();
      return;
    }

    req.continue(); // Be safe and pass through everything else.
  });

  await page.goto(url, {waitUntil: 'networkidle0'});
  const html = await page.content(); // serialized page DOM.
  await browser.close();
  console.info(`Headless rendered page in: ${Date.now() - start}ms`);

  RENDER_CACHE.set(url, html); // cache rendered page.

  return html;
}
```

### Inline critical JS/CSS resources {: .inline }

TODO

### Preload critical resources {: .preload }

```javascript
app.get('/', async (req, res, next) => {
  const prerenderURL = `${req.protocol}://${req.get('host')}/index.html`;
  ...
  res.append('Link', `<${prerenderURL}/styles.css>; rel=preload; as=style`); // h2 push styles.
  return res.status(200).send(html);

  next();
});
```

### Reusing an existing instance of Chrome {: reuseinstance}

TODO

Reuse chrome instances instead of launching a new one every render.

### Do less rendering work {: .lessrendering }

TODO

`display: none` entire page?


## Conclusion

My favorite "feature" of this technique is that you can
**improve loading performance** and gain
**SEO benefits without making code changes** to your app!

So go ahead. Build a client-side any using any framework, library, or feature
you want. Normal users will be served the client-side (dynamic) version of your
page. Search crawlers will get your static HTML version.

<br>

{% include "comment-widget.html" %}
