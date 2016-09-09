project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Service Worker Libraries.

# Service Worker Libraries {: .page-title }

Service workers, without the work. Free your web app from the network without
writing boilerplate service worker code.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="jCKZDTtUA2A"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Jeff Posnick's [presentation](https://speakerdeck.com/jeffposnick/instant-loading-with-service-workers-chrome-dev-summit-15)
from the Chrome Dev Summit 2015, _Instant Loading with Service Workers_,
describes how to effectively use `sw-precache` alongside `sw-toolbox` to
build web apps that load quickly and work offline.

<div style="clear:both;"></div>

## Service Worker Precache - `sw-precache`

[Service Worker Precache](https://github.com/GoogleChrome/sw-precache/) is a
module for generating a service worker that
precaches resources. The module can be used in JavaScript-based build scripts,
like those written with [`gulp`](http://gulpjs.com/), and it also provides a
[command-line interface](https://github.com/GoogleChrome/sw-precache/#command-line-interface). You can use the module
directly, or if you'd prefer, use of the [wrappers](https://github.com/GoogleChrome/sw-precache/#wrappers-and-starter-kits)
around `sw-precache` for specific build environments, like
[`webpack`](https://webpack.github.io/).

It can be [used alongside](https://github.com/GoogleChrome/sw-precache/sw-precache-and-sw-toolbox.md) the [`sw-toolbox`](https://github.com/GoogleChrome/sw-toolbox)
library, which works well when following the App Shell + dynamic content model.

The full documentation is in the [read me](https://github.com/GoogleChrome/sw-precache/README.md),
and the [getting started guide](https://github.com/GoogleChrome/sw-precache/GettingStarted.md) 
provides a quicker jumping off point.

[Get sw-precache](https://github.com/GoogleChrome/sw-precache/){: .button .button-primary }

### Precache Your Shell
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/view_quilt_grey600_24dp.png">
Your web app's shell—its core HTML, JavaScript, and CSS—can be precached when a
user visits your page.

<div style="clear:both;"></div>

### Build-time Integration
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/call_merge_grey600_24dp.png">
Drop it into your existing build process: 
[Gulp](https://github.com/GoogleChrome/sw-precache/blob/master/demo/gulpfile.js),
[Grunt](https://github.com/GoogleChrome/sw-precache/blob/master/demo/Gruntfile.js),
or [command line](https://github.com/GoogleChrome/sw-precache#command-line-interface)

<div style="clear:both;"></div>

### Stay Fresh
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/autorenew_grey600_24dp.png">
Changes in your build update the service worker script. Users get updates, but you don't
have to manually version your content or caches.

<div style="clear:both;"></div>

### No Network, No Problem
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/signal_wifi_off_grey600_24dp.png">
Your static resources are served [cache-first](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-falling-back-to-network),
quickly, whether or not there's a network available.

<div style="clear:both;"></div>


## Service Worker Toolbox - `sw-toolbox`

[Service Worker Toolbox](https://github.com/GoogleChrome/sw-toolbox/) provides
some simple helpers for use in creating your own service workers. Specifically,
it provides common caching patterns and an
[expressive approach](https://googlechrome.github.io/sw-toolbox/docs/master/tutorial-api#expressive-approach)
to using those strategies for runtime requests. If you're not sure what
service workers are or what they are for, start with
[the explainer doc](https://github.com/slightlyoff/ServiceWorker/blob/master/explainer.md).

[Get sw-toolbox](https://github.com/GoogleChrome/sw-toolbox/){: .button .button-primary }

### Runtime Caching
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/insert_photo_grey600_24dp.png">
Cache large or infrequently used resources, like images, at runtime, when they're
first used.
      
<div style="clear:both;"></div>

### Offline Fallbacks
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/signal_wifi_off_grey600_24dp.png">
Load fresh images, API responses, or other dynamic content from the network while online,
but fall back to a cached placeholder while offline.

<div style="clear:both;"></div>

### Goodbye Lie-Fi
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/signal_cellular_connected_no_internet_0_bar_grey600_24dp.png">
Fight [lie-fi](https://www.youtube.com/watch?v=oRcxExzWlc0) by automatically
falling back to a cached response when the network is too slow.

<div style="clear:both;"></div>

### Battle Cache Bloat
<img class="attempt-left" src="https://www.gstatic.com/images/icons/material/system/2x/disc_full_grey600_24dp.png">
That image from last month doesn't need to be cached forever. Least-recently used
and age-based cache expiration helps free up space.

<div style="clear:both;"></div>

## Learn More

The [Service Workers in Production](/web/showcase/case-study/service-workers-iowa)
case study takes a close look at how the `sw-precache` and `sw-toolbox` 
libraries were used together to power the
[Google I/O 2015 web app](https://events.google.com/io2015/).
