project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: An implementation of Web Animations 1.0 has landed in Blink powering CSS Animations and Transitions.

{# wf_updated_on: 2013-12-18 #}
{# wf_published_on: 2013-12-18 #}
{# wf_tags: news,webanimations,css #}

# New Web Animations engine in Blink drives CSS Animations & Transitions {: .page-title }

{% include "web/_shared/contributors/alexdanilo.html" %}


Users expect smooth 60fps animations in modern multi-device UIs. Achieving that level of performance with the web’s current animation primitives can be difficult. Fortunately we’re working on a new Blink animation implementation that just shipped in Chrome Canary!

What's exciting about this is that it simplifies the internals of Blink and lays the groundwork for inclusion of new API features from the [Web Animations 1.0 specification](http://dev.w3.org/fxtf/web-animations/).

Until now, CSS Animations and CSS Transitions had been separate implementations, written independently, that didn't necessarily play well together. For the past few years, browser implementers have been working together on a [next-generation animation model](http://brian.sol1.net/svg/2013/06/26/introducing-web-animations/) with support for things like synchronization, chaining animations to run in sequence, [seeking to arbitrary points in animation time](http://web-animations.github.io/web-animations-js/demos/rolio/rolio.html), allowing animations to change speed, reverse and more.]
The effort led to the formation of the W3C specification [Web Animations 1.0](http://dev.w3.org/fxtf/web-animations/).

The first step from the Blink team in getting Web Animations out into the world is replacing the existing Blink CSS Animations/Transitions C++ implementation with the Web Animations engine. Having reached that milestone now, we'd like as many developers as possible to check nothing's been broken and more importantly to keep an eye on the implementation effort and give us feedback on what's good/bad or might need changing.

Next up will be implementation of an API that lets you create, modify, and interrogate animations from JavaScript. The API is designed to let animations run efficiently (by using declarative semantics so JavaScript manages creating animations but hands off control to the browser) whilst still exposing full animation control to the JavaScript developer.

We're looking for active feedback on the proposed API to make sure we haven't missed any features needed for powerful animation control. As with any new feature, the specification will continue to change, so now is the time to make your voice heard - ideally by subscribing to and contributing to the mailing list public-fx@w3.org (and put [Web Animations] in the subject line so it gets noticed).

Try out the new engine that's already powering CSS Animations & Transitions now and post any weirdness to [the Chromium bug tracker](http://crbug.com) so we know about it.

We're excited to bring next-generation animation capabilities to Blink and look forwarding to working with other browser developers like [WebKit](https://bugs.webkit.org/show_bug.cgi?id=122912) and [Mozilla](https://wiki.mozilla.org/Platform/Layout/Web_Animations#Implementation) who've also committed to implementing the new model.


{% include "comment-widget.html" %}
