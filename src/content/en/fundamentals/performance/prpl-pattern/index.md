project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-09-28 #}
{# wf_published_on: 2016-09-28 #}

# The PRPL Pattern {: .page-title }

{% include "web/_shared/contributors/graynorton.html" %}
{% include "web/_shared/contributors/dgash.html" %}

## What's the problem?

In a nutshell: mobile web apps take too long to load.

Even as the web has evolved into a robust and capable application platform,
application use has mostly moved from powerful desktop machines
with fast, reliable network connections
to underpowered mobile devices with slow, unreliable connections.

Development practices we adopted during the desktop era tend
to produce apps that are slow to load and use on mobile devices.
Poor app performance is frustrating for users and bad for business,
since user frustration leads to abandonment, lower engagement and reduced revenue.

Web apps that load and run faster on mobile devices benefit everyone.
Achieving this goal can be hard, though;
it requires adopting new design and deployment strategies.

## Too much, too soon...

Why do mobile web apps load so slowly? A typical app...

* **Weighs too much. **
On mobile devices with low-bandwidth networks and slow CPUs, every byte counts.
You can’t afford to send any extraneous resources – especially code – to the browser.
* **Loads and runs code too soon. **
It’s common for an app to deliver all of its code up front, in one big bundle -
but on mobile, there’s no time to load, parse or run code that isn’t needed immediately.

![JavaScript-heavy applications](/web/fundamentals/performance/prpl-pattern/images/js-heavy-applications.png)

Since it's pretty obvious that smaller equals faster,
job one is to make our apps lighter overall,
carefully assessing the value and the cost of everything
we include — both application code and dependencies.

We also need to deliver web apps more efficiently.
When we deliver all of our code in an all-in-one bundle,
this bundle must be received and parsed on the client in its entirety
before the user can do anything with the app.
While this may be acceptable on desktop devices,
it can easily make our apps unusable on mobile devices.

![JavaScript parse times on different devices](/web/fundamentals/performance/prpl-pattern/images/js-parse-times.png)

As the chart above illustrates,
low-end devices parse and run JavaScript much more slowly than high-end devices.
Code that takes tens to hundreds of milliseconds
to parse on a laptop or a premium phone can easily take multiple seconds
to parse on a mid-to-low-end phone.
(And bear in mind that the chart above ignores network transfer times,
which may also be many times slower.)

We can improve the user experience
by initially delivering and processing only those resources necessary
for the landing route.
Once the app is interactive,
we can proactively deliver additional resources to ensure
that the app is instantly responsive to subsequent requests.

## Enter PRPL

PRPL is a pattern for structuring and serving Progressive Web Apps (PWAs) with an emphasis on improved app delivery and launch performance. The letters describe a set of ordered steps for fast, reliable, efficient loading:

* **Push** all resources required for the initial route – and only those resources
– to ensure that they are available as early as possible.
* **Render** the initial route and make it interactive
before loading any additional resources.
* **Pre-cache** resources for additional routes
that the user is likely to visit, maximizing responsiveness
to subsequent requests and resilience under poor network conditions.
* **Lazy-load** routes on demand as the user requests them.
Resources for key routes should load instantly from the cache,
whereas less commonly used resources can be fetched from the network upon request.

Like all PWAs, apps built using PRPL strive to be reliable, fast and engaging.
Beyond these basic goals, PRPL aims to:

* **Improve an app's time to interactivity (TTI).**
It does this by ensuring that no extraneous resources are sent
to the browser before the first view renders and becomes interactive.
* **Increase an app’s caching efficiency, especially over time.**
It does this by sending resources to the browser at high granularity.
When resources are unbundled or bundled less aggressively,
each change to your code invalidates less of your cache.
* **Reduce the complexity of development and deployment.**
It does this by relying on the app’s implicit dependency graph
to map each entry point to the precise set of resources required,
reducing or eliminating the need for manual management of bundling and delivery.

PRPL is a conceptual pattern that might be implemented in various ways.
It doesn’t prescribe any particular technologies,
though certain of its steps are most effectively accomplished
using specific modern web features,
like HTTP/2 Server Push or Preload for the first “P”,
and Service Worker for the second.

The ideas behind PRPL are not new,
but the approach was framed and named by the Polymer team at Google
and unveiled in an
[introductory session at Google I/O 2016](https://www.youtube.com/watch?v=J4i0xJnQUzU).

## Adopting PRPL

Virtually any PWA can benefit from adopting PRPL,
and the underlying principles can be applied to almost any app.
With that said,
there are certain characteristics
that make an app an especially good candidate for PRPL.

**PRPL is most straightforwardly applied to apps built using a modern module system**
like ES Modules or HTML Imports,
so that the entire dependency graph can be discovered and analyzed by tools.
Tool-generated manifests describing the dependency graph make it easy
to orchestrate the efficient loading of granular resources using features
like HTTP/2 Server Push and Preload links;
this is what enables PRPL’s first “P”, the precise and timely delivery of just what is needed to fulfill the user’s initial request.

Auto-generated resource manifests also make it easy for a Service Worker
to proactively populate an app’s client-side cache,
satisfying the requirements of the second “P”.
When bundling is required,
tools can also use the dependency graph to apply smart bundling strategies,
generating route-specific bundles and optimal shared bundles
rather than monolithic all-in-one bundles.

**PRPL is most useful for apps with significant client-side logic and interactivity,**
given its focus on an app’s modular code and associated resources.
Although many of the same principles might be applied to loading and caching content,
PRPL itself does not currently prescribe any particular approach to managing content,
and content-heavy apps without a lot of client-side functionality will tend
to benefit less from more efficient delivery of code and static resources.

The easiest way to adopt PRPL is to use tools, libraries and application templates
built to support PRPL “out of the box.”
Currently these include offerings from Polymer and Preact,
and we expect that others will follow.

However, it’s by no means necessary to adopt an end-to-end solution;
if you’re able and willing to blaze your own trail,
you’ll find that widely used tools like Webpack have support
(via built-in features and plugins) for various pieces of the PRPL puzzle.
Service Worker libraries like sw-precache and sw-toolbox are also indispensable
in implementing PRPL and are increasingly integrated with popular tools.
Finally, there are a number of in-depth reviews of successful PRPL deployments
that offer valuable insights and advice.
