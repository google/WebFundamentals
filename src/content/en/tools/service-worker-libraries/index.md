project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Service Worker Libraries.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Service Worker Libraries {: .page-title }

## What are the Service Worker Libraries?

Our Service Worker Libraries are provided to help simplify your development
experience, that free your app from the network, without having to write any
boilerplate service worker code.


## Service Worker Precache 

[Service Worker Precache](https://github.com/GoogleChrome/sw-precache/) (`sw-precache`) is a
module for generating a service worker that
precaches resources. The module can be used in JavaScript-based build scripts,
like those written with [`gulp`](http://gulpjs.com/){: .external }, and it also provides a
[command-line interface](https://github.com/GoogleChrome/sw-precache/#command-line-interface). You can use the module
directly, or if you'd prefer, use of the [wrappers](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
around `sw-precache` for specific build environments, like
[`webpack`](https://webpack.github.io/){: .external }.

It can be [used alongside](https://github.com/GoogleChrome/sw-precache/sw-precache-and-sw-toolbox.md) the [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
library, which works well when following the App Shell + dynamic content model.

The full documentation is in the [read me](https://github.com/GoogleChrome/sw-precache/README.md),
and the [getting started guide](https://github.com/GoogleChrome/sw-precache/GettingStarted.md) 
provides a quicker jumping off point.

[Get sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Features

| Feature | Summary |
|---------|---------|
| **Precache Your App Shell** | Your web app's shell—its core HTML, JavaScript, and CSS—can be precached when a user visits your page. |
| **Build-time Integration** | Drop it into your existing build process: [Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js), [Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js), or [command line](https://github.com/GoogleChrome/sw-precache#command-line-interface) |
| **Stay Fresh** | Changes in your build update the service worker script. Users get updates, but you don't have to manually version your content or caches. |
| **No Network, No Problem** | Your static resources are served [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network), quickly, whether or not there's a network available. |



## Service Worker Toolbox

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) (`sw-toolbox`) provides
some simple helpers for use in creating your own service workers. Specifically,
it provides common caching patterns and an
[expressive approach](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
to using those strategies for runtime requests. If you're not sure what
service workers are or what they are for, start with
[the explainer doc](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md).

[Get sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Features

| Feature | Summary |
|---------|---------|
| Runtime Caching | Cache large or infrequently used resources, like images, at runtime, when they're
first used. |
| Offline Fallbacks | Load fresh images, API responses, or other dynamic content from the network while online, but fall back to a cached placeholder while offline. |
| Goodbye Lie-Fi | Fight [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) by automatically falling back to a cached response when the network is too slow. |
| Battle Cache Bloat | That image from last month doesn't need to be cached forever. Least-recently used and age-based cache expiration helps free up space.|

## Learn More

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

The [Service Workers in Production](/web/showcase/case-study/service-workers-iowa)
case study takes a close look at how the `sw-precache` and `sw-toolbox` 
libraries were used together to power the
[Google I/O 2015 web app](https://events.google.com/io2015/){: .external }.
