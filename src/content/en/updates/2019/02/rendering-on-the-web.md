project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-08-27 #}
{# wf_published_on: 2019-02-06 #}
{# wf_tags: fundamentals, performance, app-shell #}
{# wf_featured_image: /web/updates/images/2019/02/rendering-on-the-web/icon.png #}
{# wf_featured_snippet: Where should we implement logic and rendering in our applications? Should we use Server Side Rendering? What about Rehydration? Let's find some answers! #}
{# wf_blink_components: N/A #}

# Rendering on the Web {: .page-title }

{% include "web/_shared/contributors/developit.html" %}
{% include "web/_shared/contributors/addyosmani.html" %}

As developers, we are often faced with decisions that will affect the entire
architecture of our applications. One of the core decisions web developers must
make is where to implement logic and rendering in their application. This can be
a difficult, since there are a number of different ways to build a website.

Our understanding of this space is informed by our work in Chrome talking to
large sites over the past few years. Broadly speaking, we would encourage
developers to consider server rendering or static rendering over a full
rehydration approach.

In order to better understand the architectures we’re choosing from when we make
this decision, we need to have a solid understanding of each approach and
consistent terminology to use when speaking about them. The differences between
these approaches help illustrate the trade-offs of rendering on the web through
the lens of performance.

## Terminology {: #terminology }

**Rendering**

- **SSR:** Server-Side Rendering - rendering a client-side or universal app to
  HTML on the server.
- **CSR:** Client-Side Rendering - rendering an app in a browser, generally
  using the DOM.
- **Rehydration:**  “booting up” JavaScript views on the client such that they
  reuse the server-rendered HTML’s DOM tree and data.
- **Prerendering:**  running a client-side application at build time to capture
  its initial state as static HTML.

**Performance**

- **TTFB:**  Time to First Byte - seen as the time between clicking a link and
  the first bit of content coming in.
- **FP:**  First Paint - the first time any pixel gets becomes visible to the
  user.
- **FCP:**  First Contentful Paint - the time when requested content (article
  body, etc) becomes visible.
- **TTI:**  Time To Interactive - the time at which a page becomes interactive
  (events wired up, etc).

## Server Rendering {: #server-rendering }

_Server rendering generates the full HTML for a page on the server in response
to navigation. This avoids additional round-trips for data fetching and
templating on the client, since it’s handled before the browser gets a
response._

Server rendering generally produces a fast [First Paint]&nbsp;(FP) and [First
Contentful Paint]&nbsp;(FCP). Running page logic and rendering on the server makes it
possible to avoid sending lots of JavaScript to the client, which helps achieve
a fast [Time to Interactive]&nbsp;(TTI). This makes sense, since with server
rendering you’re really just sending text and links to the user’s browser. This
approach can work well for a large spectrum of device and network conditions,
and opens up interesting browser optimizations like streaming document parsing.

<img src="../../images/2019/02/rendering-on-the-web/server-rendering-tti.png"
alt="Diagram showing server rendering and JS execution affecting FCP and TTI"
width="350">

With server rendering, users are unlikely to be left waiting for CPU-bound
JavaScript to process before they can use your site. Even when [third-party JS]
can’t be avoided, using server rendering to reduce your own first-party [JS
costs] can give you more "[budget]" for the rest. However, there is one primary
drawback to this approach: generating pages on the server takes time, which can
often result in a slower [Time to First Byte]&nbsp;(TTFB).

Whether server rendering is enough for your application largely depends on what
type of experience you are building. There is a longstanding debate over the
correct applications of server rendering versus client-side rendering, but it’s
important to remember that you can opt to use server rendering for some pages
and not others. Some sites have adopted hybrid rendering techniques with
success. [Netflix] server-renders its relatively static landing pages, while
[prefetching] the JS for interaction-heavy pages, giving these heavier
client-rendered pages a better chance of loading quickly.

Many modern frameworks, libraries and architectures make it possible to render
the same application on both the client and the server.  These techniques can be
used for Server Rendering, however it’s important to note that architectures
where rendering happens both on the server _**and**_ on the client are their own
class of solution with very different performance characteristics and tradeoffs.
React users can use [renderToString()] or solutions built atop it like [Next.js]
for server rendering. Vue users can look at Vue’s [server rendering guide] or
[Nuxt]. Angular has [Universal]. Most popular solutions employ some form of
hydration though, so be aware of the approach in use before selecting a tool.

## Static Rendering {: #static-rendering }

[Static rendering](https://frontarm.com/articles/static-vs-server-rendering/)
happens at build-time and offers a fast First Paint, First Contentful Paint and
Time To Interactive - assuming the amount of client-side JS is limited. Unlike
Server Rendering, it also manages to achieve a consistently fast Time To First
Byte, since the HTML for a page doesn’t have to be generated on the fly.
Generally, static rendering means producing a separate HTML file for each URL
ahead of time. With HTML responses being generated in advance, static renders
can be deployed to multiple CDNs to take advantage of edge-caching.

<img src="../../images/2019/02/rendering-on-the-web/static-rendering-tti.png"
alt="Diagram showing static rendering and optional JS execution affecting FCP
and TTI" width="280">

Solutions for static rendering come in all shapes and sizes. Tools like [Gatsby]
are designed to make developers feel like their application is being rendered
dynamically rather than generated as a build step. Others like [Jekyll] and
[Metalsmith] embrace their static nature, providing a more template-driven
approach.

One of the downsides to static rendering is that individual HTML files must be
generated for every possible URL. This can be challenging or even infeasible
when you can't predict what those URLs will be ahead of time, or for sites with
a large number of unique pages.

React users may be familiar with [Gatsby], [Next.js static export] or [Navi] -
all of these make it convenient to author using components. However, it’s
important to understand the difference between static rendering and
prerendering:  static rendered pages are interactive without the need to execute
much client-side JS, whereas prerendering improves the First Paint or First
Contentful Paint of a Single Page Application that must be booted on the client
in order for pages to be truly interactive.

If you’re unsure whether a given solution is static rendering or prerendering,
try this test:  disable JavaScript and load the created web pages.  For
statically rendered pages, most of the functionality will still exist without
JavaScript enabled.  For prerendered pages, there may still be some basic
functionality like links, but most of the page will be inert.

Another useful test is to slow your network down using Chrome DevTools, and
observe how much JavaScript has been downloaded before a page becomes
interactive. Prerendering generally requires more JavaScript to get interactive,
and that JavaScript tends to be more complex than the [Progressive Enhancement]
approach used by static rendering.

## Server Rendering vs Static Rendering {: #server-vs-static }

Server rendering is not a silver bullet - its dynamic nature can come with
[significant compute overhead] costs. Many server rendering solutions don't
flush early, can delay TTFB or double the data being sent (e.g. inlined state
used by JS on the client). In React, renderToString() can be slow as it's
synchronous and single-threaded. Getting server rendering "right" can involve
finding or building a solution for [component caching], managing memory
consumption, applying [memoization] techniques, and many other concerns. You're
generally processing/rebuilding the same application multiple times - once on
the client and once in the server. Just because server rendering can make
something show up sooner doesn't suddenly mean you have less work to do.

Server rendering produces HTML on-demand for each URL but can be slower than
just serving static rendered content. If you can put in the additional leg-work,
server rendering + [HTML caching] can massively reduce server render time. The
upside to server rendering is the ability to pull more "live" data and respond
to a more complete set of requests than is possible with static rendering. Pages
requiring personalization are a concrete example of the type of request that
would not work well with static rendering.

Server rendering can also present interesting decisions when building a [PWA].
Is it better to use full-page [service worker] caching, or just server-render
individual pieces of content?

## Client-Side Rendering (CSR) {: #csr }

_Client-side rendering (CSR) means rendering pages directly in the browser using
JavaScript. All logic, data fetching, templating and routing are handled on the
client rather than the server._

Client-side rendering can be difficult to get and keep fast for mobile. It can
approach the performance of pure server-rendering if doing minimal work, keeping
a [tight JavaScript budget] and delivering value in as few [RTTs] as possible.
Critical scripts and data can be delivered sooner using [HTTP/2 Server Push] or
`<link rel=preload>`, which gets the parser working for you sooner. Patterns
like [PRPL] are worth evaluating in order to ensure initial and subsequent
navigations feel instant.

<img src="../../images/2019/02/rendering-on-the-web/client-rendering-tti.png"
alt="Diagram showing client-side rendering affecting FCP and TTI" width="500">

The primary downside to Client-Side Rendering is that the amount of JavaScript
required tends to grow as an application grows. This becomes especially
difficult with the addition of new JavaScript libraries, polyfills and
third-party code, which compete for processing power and must often be processed
before a page’s content can be rendered. Experiences built with CSR that rely on
large JavaScript bundles should consider [aggressive code-splitting], and be
sure to lazy-load JavaScript - "serve only what you need, when you need it". For
experiences with little or no interactivity, server rendering can represent a
more scalable solution to these issues.

For folks building a Single Page Application, identifying core parts of the User
Interface shared by most pages means you can apply the [Application Shell
caching] technique. Combined with service workers, this can dramatically improve
perceived performance on repeat visits.

## Combining server rendering and CSR via rehydration {: #rehydration }

Often referred to as Universal Rendering or simply “SSR”, this approach attempts
to smooth over the trade-offs between Client-Side Rendering and Server Rendering
by doing both. Navigation requests like full page loads or reloads are handled
by a server that renders the application to HTML, then the JavaScript and data
used for rendering is embedded into the resulting document. When implemented
carefully, this achieves a fast First Contentful Paint just like Server
Rendering, then “picks up” by rendering again on the client using a technique
called [(re)hydration]. This is a novel solution, but it can have some
considerable performance drawbacks.

The primary downside of SSR with rehydration is that it can have a significant
negative impact on Time To Interactive, even if it improves First Paint. SSR’d
pages often look deceptively loaded and interactive, but can’t actually respond
to input until the client-side JS is executed and event handlers have been
attached. This can take seconds or even minutes on mobile.

Perhaps you’ve experienced this yourself - for a period of time after it looks
like a page has loaded, clicking or tapping does nothing. This quickly becoming
frustrating... _“Why is nothing happening? Why can’t I scroll?”_

### A Rehydration Problem: One App for the Price of Two {: #rehydration-issues }

Rehydration issues can often be worse than delayed interactivity due to JS. In
order for the client-side JavaScript to be able to accurately “pick up” where
the server left off without having to re-request all of the data the server used
to render its HTML, current SSR solutions generally serialize the response from
a UI’s data dependencies into the document as script tags. The resulting HTML
document contains a high level of duplication:

<img src="../../images/2019/02/rendering-on-the-web/html.png" alt="HTML document
containing serialized UI, inlined data and a bundle.js script">

As you can see, the server is returning a description of the application’s UI in
response to a navigation request, but it’s also returning the source data used
to compose that UI, and a complete copy of the UI’s implementation which then
boots up on the client. Only after bundle.js has finished loading and executing
does this UI become interactive.

Performance metrics collected from real websites using SSR rehydration indicate
its use should be heavily discouraged. Ultimately, the reason comes down to User
Experience: it's extremely easy to end up leaving users in an “uncanny valley”.

<img src="../../images/2019/02/rendering-on-the-web/rehydration-tti.png"
alt="Diagram showing client rendering negatively affecting TTI" width="600">

There’s hope for SSR with rehydration, though. In the short term, only using SSR
for highly cacheable content can reduce the TTFB delay, producing similar
results to prerendering. Rehydrating [incrementally], progressively, or
partially may be the key to making this technique more viable in the future.

## Streaming server rendering and Progressive Rehydration {: #progressive-rehydration }

Server rendering has had a number of developments over the last few years.

[Streaming server rendering] allows you to send HTML in chunks that the browser
can progressively render as it's received. This can provide a fast First Paint
and First Contentful Paint as markup arrives to users faster. In React, streams
being asynchronous in [renderToNodeStream()] - compared to synchronous
renderToString - means backpressure is handled well.

Progressive rehydration is also worth keeping an eye on, and something React has
been [exploring](https://github.com/facebook/react/pull/14717). With this
approach, individual pieces of a server-rendered application are “booted up”
over time, rather than the current common approach of initializing the entire
application at once. This can help reduce the amount of JavaScript required to
make pages interactive, since client-side upgrading of low priority parts of the
page can be deferred to prevent blocking the main thread. It can also help avoid
one of the most common SSR Rehydration pitfalls, where a server-rendered DOM
tree gets destroyed and then immediately rebuilt - most often because the
initial synchronous client-side render required data that wasn’t quite ready,
perhaps awaiting Promise resolution.

### Partial Rehydration {: #partial-rehydration }

Partial rehydration has proven difficult to implement. This approach is an
extension of the idea of progressive rehydration, where the individual pieces
(components / views / trees) to be progressively rehydrated are analyzed and
those with little interactivity or no reactivity are identified. For each of
these mostly-static parts, the corresponding JavaScript code is then transformed
into inert references and decorative functionality, reducing their client-side
footprint to near-zero.
The partial hydration approach comes with its own issues and compromises. It
poses some interesting challenges for caching, and client-side navigation means
we can't assume server-rendered HTML for inert parts of the application will be
available without a full page load.

### Trisomorphic Rendering {: #trisomorphic }

If [service workers] are an option for you, “trisomorphic” rendering may also be
of interest. It's a technique where you can use streaming server rendering for
initial/non-JS navigations, and then have your service worker take on rendering
of HTML for navigations after it has been installed. This can keep cached
components and templates up to date and enables SPA-style navigations for
rendering new views in the same session. This approach works best when you can
share the same templating and routing code between the server, client page, and
service worker.

<img src="../../images/2019/02/rendering-on-the-web/trisomorphic.png"
alt="Diagram of Trisomorphic rendering, showing a browser and service worker
communicating with the server">

## SEO Considerations {: #seo }

Teams often factor in the impact of SEO when choosing a strategy for rendering
on the web. Server-rendering is often chosen for delivering a "complete looking"
experience crawlers can interpret with ease. Crawlers [may understand
JavaScript](https://web.dev/discoverable/how-search-works), but there are often
[limitations](/search/docs/guides/rendering) worth being aware of in how they
render. Client-side rendering can work but often not without additional testing
and leg-work. More recently [dynamic
rendering](/search/docs/guides/dynamic-rendering) has also become an option
worth considering if your architecture is heavily driven by client-side
JavaScript.

When in doubt, the
[Mobile Friendly Test](https://search.google.com/test/mobile-friendly) tool is
invaluable for testing that your chosen approach does what you're hoping for.
It shows a visual preview of how any page appears to Google's crawler, the
serialized HTML content found (after JavaScript executed), and any errors
encountered during rendering.

<img src="../../images/2019/02/rendering-on-the-web/mobile-friendly-test.png"
alt="Screenshot of the Mobile Friendly Test UI">

## Wrapping up... {: #wrapup }

When deciding on an approach to rendering, measure and understand what your
bottlenecks are. Consider whether static rendering or server rendering can get
you 90% of the way there. It's perfectly okay to mostly ship HTML with minimal
JS to get an experience interactive. Here’s a handy infographic showing the
server-client spectrum:

<img src="../../images/2019/02/rendering-on-the-web/infographic.png"
alt="Infographic showing the spectrum of options described in this article">


## Credits {: #credits }

Thanks to everyone for their reviews and inspiration:

Jeffrey Posnick,
Houssein Djirdeh,
Shubhie Panicker,
Chris Harrelson, and
Sebastian Markbåge

<div class="clearfix"></div>

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}


[First Paint]: https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint
[First Contentful Paint]: https://developers.google.com/web/fundamentals/performance/user-centric-performance-metrics#first_paint_and_first_contentful_paint
[Time to Interactive]: https://developers.google.com/web/tools/lighthouse/audits/time-to-interactive
[Time to First Byte]: https://en.wikipedia.org/wiki/Time_to_first_byte
[third-party JS]: https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/loading-third-party-javascript/

[JS costs]: https://medium.com/@addyosmani/the-cost-of-javascript-in-2018-7d8950fbb5d4
[budget]: https://medium.com/@addyosmani/start-performance-budgeting-dabde04cf6a3
[Netflix]: https://medium.com/dev-channel/a-netflix-web-performance-case-study-c0bcde26a9d9
[prefetching]: https://dev.to/addyosmani/speed-up-next-page-navigations-with-prefetching-4285
[renderToString()]: https://reactjs.org/docs/react-dom-server.html
[Next.js]: https://nextjs.org
[Next.js static export]: https://nextjs.org/learn/excel/static-html-export/
[server rendering guide]: https://ssr.vuejs.org
[Nuxt]: https://nuxtjs.org
[Universal]: https://angular.io/guide/universal
[Gatsby]: https://www.gatsbyjs.org
[Navi]: https://frontarm.com/navi/
[Jekyll]: https://jekyllrb.com
[Metalsmith]: https://metalsmith.io
[Progressive Enhancement]: https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement

[significant compute overhead]: https://medium.com/airbnb-engineering/operationalizing-node-js-for-server-side-rendering-c5ba718acfc9
[component caching]: https://medium.com/@reactcomponentcaching/speedier-server-side-rendering-in-react-16-with-component-caching-e8aa677929b1
[memoization]: https://speakerdeck.com/maxnajim/hastening-react-ssr-with-component-memoization-and-templatization
[HTML caching]: https://freecontent.manning.com/caching-in-react/
[PWA]: https://developers.google.com/web/progressive-web-apps/
[service worker]: https://developers.google.com/web/fundamentals/primers/service-workers/
[service workers]: https://developers.google.com/web/fundamentals/primers/service-workers/
[tight JavaScript budget]: https://mobile.twitter.com/HenrikJoreteg/status/1039744716210950144
[RTTs]: https://en.wikipedia.org/wiki/Round-trip_delay_time
[HTTP/2 Server Push]: https://www.smashingmagazine.com/2017/04/guide-http2-server-push/
[PRPL]: https://developers.google.com/web/fundamentals/performance/prpl-pattern/
[aggressive code-splitting]: https://developers.google.com/web/fundamentals/performance/optimizing-javascript/code-splitting/
[Application Shell caching]: https://developers.google.com/web/updates/2015/11/app-shell
[(re)hydration]: https://docs.electrode.io/guides/general/server-side-data-hydration
[incrementally]: https://www.emberjs.com/blog/2017/10/10/glimmer-progress-report.html

[Streaming server rendering]: https://zeit.co/blog/streaming-server-rendering-at-spectrum
[renderToNodeStream()]: https://reactjs.org/docs/react-dom-server.html#rendertonodestream
