project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Service Worker Libraries.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-11-07 #}

# Service Worker Libraries {: .page-title }

Use our [service worker](/web/fundamentals/getting-started/primers/service-workers)
libraries to simplify your development by eliminating service worker boilerplate
code.

<figure class="attempt-right">
  <img src="/web/tools/images/tools-landing-page.gif">
  <figcaption>Overview of Service Worker Libraries</figcaption>
</figure>

**sw-precache&mdash;**Integrates with your build process to generate a service
worker that precaches static assets such as, for example, an Application
Shell.

**sw-toolbox&mdash;**Implement common runtime caching patterns such as dynamic
content, API calls and third-party resources as easily as writing a README.

**sw-offline-google-analytics&mdash;**Temporarily hold and retry analytics
requests to avoid losing them to network disconnections.

<div class="clearfix"></div>

## Why use service worker libraries?

You're sold on the advantages of adding a service worker to your web
app—swapping the uncertainty of the network for the promise of a fast, offline-
first, service worker-powered experience. But to write your own service worker
from scratch, you have to clear some hurdles:

* Precaching URLs easily and reliably. 
* Incrementing a cache version string to ensure that precached resources are
  updated.
* Implementing a cache expiration strategy to account for cache size or entry
  age.
* Building common patterns such as [lie-fi](http://www.urbandictionary.com/define.php?term=lie-fi)
  network timeouts and boilerplate code.
* Capturing and reporting Google analytics data during offline usage.


You can address all of these drawbacks using our service worker libraries.


## Service Worker Precache 

[Service Worker Precache](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) is a
module for generating a service worker that
precaches resources. The module can be used in JavaScript-based build scripts,
like those written with [`gulp`](https://gulpjs.com/), and it also provides a
[command-line interface](https://github.com/GoogleChrome/sw-precache/#command-line-interface). You can use the module
directly, or if you'd prefer, use of the [wrappers](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
around `sw-precache` for specific build environments, like
[`webpack`](https://webpack.github.io/).

It can be [used alongside](https://github.com/GoogleChrome/sw-precache/blob/master/sw-precache-and-sw-toolbox.md) the [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
library, which works well when following the [App Shell + dynamic content model](/web/fundamentals/architecture/app-shell).

The full documentation is in the [read me](https://github.com/GoogleChrome/sw-precache/blob/master/README.md),
and the [getting started guide](https://github.com/GoogleChrome/sw-precache/blob/master/GettingStarted.md) 
provides a quicker jumping off point.

[Get sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Features

| Feature | Summary |
|---------|---------|
| Precache Your App Shell | Your web app's shell—its core HTML, JavaScript, and CSS—can be precached when a user visits your page. |
| Build-time Integration | Drop it into your existing build process: [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js), or [command line](https://github.com/GoogleChrome/sw-precache#command-line-interface). |
| Stay Fresh | Changes in your build update the service worker script. Users get updates, but you don't have to manually version your content or caches. |
| No Network, No Problem | Your static resources are served [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), quickly, whether or not there's a network available. |

## Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) provides
some simple helpers for use in creating your own service workers. Specifically,
it provides common caching patterns and an
[expressive approach](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
to using those strategies for runtime requests. 

[Get sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Features

| Feature | Summary |
|---------|---------|
| Runtime Caching | Cache large or infrequently used resources, like images, at runtime, when they're first used. |
| Offline Fallbacks | Load fresh images, API responses, or other dynamic content from the network while online, but fall back to a cached placeholder while offline. |
| Goodbye Lie-Fi | Fight [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) by automatically falling back to a cached response when the network is too slow. |
| Battle Cache Bloat | That image from last month doesn't need to be cached forever. Least-recently used and age-based cache expiration helps free up space.|

## Offline Google Analytics

[Offline Google Analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics) 
temporarily holds and retries analytics requests to avoid losing them to network
disconnections. This tool easily installs to your build system using npm and is
easily imported into your service worker script. Configure it using a
parameterized function call.

[Get sw-offline-google-analytics](https://github.com/GoogleChrome/sw-helpers/tree/master/packages/sw-offline-google-analytics){: .button .button-primary }

### Features

| Feature | Summary |
|---------|---------|
| Offline Google Analytics | Creates fetch handlers that ensure the Google Analytics JavaScript is available offline. |
| Temporarily Caches Data | Holds analytics requests that are made when the device is offline and retries them the next time the service worker starts up. |
| Custom Replay Values | Key/value pairs to be added to replayed Google Analytics requests. For example, you might set a custom dimension to indicate that a request was replayed. |
| Modified Hit Parameters | Lets you programmatically modify a hit's parameters to, for example, track the elapsed time between when a hit is attempted and when it is replayed. |

## Learn More

### Articles

[Getting started with sw-toolbox](http://deanhume.com/home/blogpost/getting-started-with-the-service-worker-toolbox/10134) by Dean Hume

[Adding offline support to create-react-app using sw-precache](https://medium.com/dev-channel/create-react-pwa-7b69425ffa86#.nqsrshawm) by Jeffrey Posnick

The [Service Workers in Production](/web/showcase/case-study/service-workers-iowa)
case study takes a close look at how the `sw-precache` and `sw-toolbox` 
libraries were used together to power the
[Google I/O 2015 web app](https://events.google.com/io2015/).

### Codelabs

[Adding a Service Worker with sw-precache](https://codelabs.developers.google.com/codelabs/sw-precache/index.html#0)

### Videos

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Jeff Posnick's presentation from the Chrome Dev Summit 2015,
_Instant Loading with Service Workers_, describes how to effectively use
`sw-precache` alongside `sw-toolbox` to build web apps that load quickly and
work offline.

[Slides](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="IIRj8DftkqE"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Matt Gaunt and Addy Osmani explain how our service worker libraries can help
your web apps work offline in next to no time. This video describes both 
`sw-precache` and `sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="gfHXekzD7p0"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

In this episode of Totally Tooling Mini-Tips, Matt and Addy step through
`sw-toolbox`.

<div style="clear:both;"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Use459WBeWc"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

From Google I/O 2016, Mat Scales describes great libraries and tools for making
progressive web apps load fast, work great offline, and enhace progressively,
all for a better user experience.
