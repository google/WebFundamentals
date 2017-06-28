project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Firefox 48 joins Chrome in shipping a native implementation of the Web Animations API.

{# wf_updated_on: 2016-08-08 #}
{# wf_published_on: 2016-08-09 #}
{# wf_tags: webanimations #}
{# wf_featured_image: /web/updates/images/generic/animations.png #}

# Web Animations API Hits Cross-browser Milestone {: .page-title }

{% include "web/_shared/contributors/alexdanilo.html" %}



The [Web Animations API](http://w3c.github.io/web-animations/) is part of a new web standard, currently under development by browser engineers from Mozilla and Google.

Chrome 36 [implemented](/web/updates/2014/05/Web-Animations-element.animate-is-now-in-Chrome-36) the [element.animate()](http://w3c.github.io/web-animations/#the-animatable-interface) method from the [Web Animations API](http://w3c.github.io/web-animations/), empowering developers to build performant compositor threaded animations using JavaScript.

We’re excited to see Mozilla have now [shipped](https://hacks.mozilla.org/2016/08/animating-like-you-just-dont-care-with-element-animate/) their implementation of [element.animate()](http://w3c.github.io/web-animations/#the-animatable-interface) in [Firefox 48](https://developer.mozilla.org/en-US/Firefox/Releases/48), enabling true cross-browser accelerated animations using this emerging JS API. Google and Mozilla have worked hard together to make sure our implementations are interoperable. This has truly been a collaborative effort!

The benefits in using the [Web Animations API](http://w3c.github.io/web-animations/) can include faster frame-rate with lower power consumption which translates to a better user experience on all devices, especially mobile.

The [Web Animations API](http://w3c.github.io/web-animations/) can be used in all browsers via a [polyfill](https://github.com/web-animations/web-animations-js/) that will use the full speed native implementation where it exists, and gracefully fall back to a JavaScript implementation otherwise. We’re encouraged by the WebKit community [considering](https://webkit.org/status/#specification-web-animations) their own [implementation](https://lists.webkit.org/pipermail/webkit-dev/2015-November/027771.html), and the [Edge team](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6263650-web-animations-javascript-api) adding it to their backlog. We look forward to Web Animations soon being supported in all major browsers.

To get the full accelerated Web Animations experience in either Chrome, Firefox or Opera, head over to these [demo](http://web-animations.github.io/web-animations-demos/) [pages](https://mozdevs.github.io/Animation-examples/) and try it for yourself.



{% include "comment-widget.html" %}
