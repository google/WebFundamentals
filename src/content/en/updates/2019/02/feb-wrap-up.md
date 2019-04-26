project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: February wrap up which we look back what's been happening in Web Developer Ecosystem team.

{# wf_updated_on: 2019-03-01 #}
{# wf_published_on: 2019-02-28 #}
{# wf_featured_image: /web/updates/images/generic/monthly.png #}
{# wf_featured_snippet: February wrap up which we look back what's been happening in Web Developer Ecosystem team.　#}
{# wf_blink_components: N/A #}

# Web Dev Ecosystem team - February wrap up {: .page-title }

{% include "web/_shared/contributors/kosamari.html" %}

Welcome to the first installment of a monthly wrap up which we look back what's been happening in 
Web Developer Ecosystem team✨

We are a team of engineers and communicators who produce articles and code samples such as this 
website [web fundamentals](/web) and our brand new portal [web.dev](https://web.dev/). You can also 
catch our work over on our [YouTube Channel](https://www.youtube.com/user/ChromeDevelopers), and 
don't forget to follow us on [@ChromiumDev](https://twitter.com/chromiumdev) :)

February is a short month but we are certainly not short on content. Let's start with big releases 
from the team.

## Releases

### Workbox

Hot off the press, 
[Workbox 4.0 was released](https://github.com/GoogleChrome/workbox/releases/tag/v4.0.0) just a few 
days ago.🎉 This release includes great new features like `workbox-window` and improvements to many 
of the existing workbox packages. For those of you who are already using workbox, check out the 
[v3 to v4 migration guide](/web/tools/workbox/guides/migrations/migrate-from-v3). 
Wondering how you can use Workbox in your existing project? Here is a guide to 
[use them with bundlers of your choice](/web/tools/workbox/guides/using-bundlers). 
Not sure what problem workbox helps to solve? Check out this 
[interview on service workers](https://www.youtube.com/watch?v=JYXXGNFJjwc) over on 
the State of the Web show. 

### lit-html and LitElement

The team at the [polymer project](https://www.polymer-project.org/) has been busy working on 
[stable release of lit-html and LitElement](/web/updates/2019/02/lit-element-and-lit-html) - two 
next-generation web development libraries. Do you want to try them out? start with 
[Try LitElement](https://lit-element.polymer-project.org/try) guide 📝

### Trusted Web Activities 

With the release of Chrome 72, 
[Trusted Web Activity (TWA)](https://blog.chromium.org/2019/02/introducing-trusted-web-activity-for.html) 
have entered to the market! TWAs let you have full screen Chrome inside of an Android Activity, 
which means you can bring your web content into app-sphere📱 Check out this 
[getting started guide](/web/updates/2019/02/using-twa) or read on how @svenbudak put their 
[PWA on Google Play Store](https://medium.com/@svenbudak/this-twa-stuff-rocks-finally-i-got-my-pwa-on-google-play-store-b92fe8dae31f)!

## What's coming next

With Chrome 73 stable release on the horizon ([March 12](https://www.chromestatus.com/features/schedule)), 
we have lots of exciting features to cover!
 
**V8** - Chrome's JavaScript engine has a bunch of updates including `Object.fromEntries` and 
`String.prototype.matchAll`. Check out the [v8 release note](https://v8.dev/blog/v8-release-73).

Working with **audio and video on the web**? Hardware media keys support is here and "Skip Ad" in 
Picture-in-Picture window is now in origin trial! Check out 
[Audio/Video Updates in Chrome 73](/web/updates/2019/02/chrome-73-media-updates) for more.

Speaking of origin trial, [get ready for Priority Hints](/web/updates/2019/02/priority-hints) with 
**Priority Hints**, developers can set the importance of a `<script>`, `<img>`, or `<link>` element 
to give the browser how to load them. It is still an experimental feature, so please do try out and 
send feedback!

Rendering performance is always on top of our mind. In Chrome 73 `wheel` and `mousewheel` listeners 
registered on root targets (window, document, or body) will be 
[passive listeners by default](/web/updates/2019/02/scrolling-intervention), providing fast 
**wheel scrolling by default**.  

As we say hello to new features, we also have to say goodbye, so be sure to check 
**[deprecations and removals](/web/updates/2019/02/chrome-73-deps-rems) for Chrome 73** as well!

## New development

Here are a few more things we've been working on that will hit a browser near you.

To help prevent Cross-Site Scripting, **we are developing a new API called Trusted Types**. 
Opting into trusted-types (via Content Security Policy) will lock down the document from DOM 
injection. We are working on providing more code examples and guides on this, but in the meanwhile 
please [read more about Trusted Types](/web/updates/2019/02/trusted-types) to try it out.

**Hitting back and forward button on Chrome may soon be _really fast_!** We are exploring a new 
back/forward cache to cache pages in-memory when the user navigates away. Check out 
[the explainer and a prototype of bfcache in this post](/web/updates/2019/02/back-forward-cache). 

Lastly, [**Intersection observer v2**](/web/updates/2019/02/intersectionobserver-v2) introduces the 
idea of tracking the actual "visibility" of a target.

## What we are tinkering with

Our work does not end at browser features! We also look at web application performance, build web 
apps, and think about different ways to help web developers everywhere. 
Here are some of the things we've been tinkering with this month. 

* [Rendering on the Web](/web/updates/2019/02/rendering-on-the-web)
* [JavaScript Loading Priorities in Chrome](https://addyosmani.com/blog/script-priorities/)
* [Disallow large imports from JavaScript projects](https://addyosmani.com/blog/disallow-imports/)
* [File Web Share Target](https://paul.kinlan.me/file-web-share-target/)
* [Replacing a hot path in your app's JavaScript with WebAssembly](/web/updates/2019/02/hotpath-with-wasm)
* [Constructable Stylesheets: seamless reusable styles](/web/updates/2019/02/constructable-stylesheets)
* [Progressive React](https://houssein.me/progressive-react)
* [Web storefront performance problems](https://alankent.me/2019/02/16/common-web-storefront-performance-problems/)

## New Videos and Podcasts 

Martin is starting a new series called **JavaScript SEO**, the first episode is about 
[how Google search indexes JavaScript sites](https://www.youtube.com/watch?v=LXF8bM4g-J4)! 
Meggin recently presented 
[reflections on the web.dev project](https://www.youtube.com/watch?v=aGxrGyGSFPs) at a meetup. 
Jake and Surma are back with 
[new HTTP203 podcast episode discussing Image rotation experiment](/web/shows/http203/podcast/rotating-an-image-to-the-extreme).

We also have regular shows such as ["New in Chrome"](https://www.youtube.com/watch?v=coh1k7TY1P0&list=PLNYkxOF6rcIDfz8XEA3loxY32tYh7CI3m), 
["What's New in DevTools"](https://www.youtube.com/watch?v=XVJxlEdB230&list=PLNYkxOF6rcIBDSojZWBv4QJNoT4GNYzQD), 
and ["The State of the Web"](https://www.youtube.com/watch?v=zO9U88i2S1M&list=PLNYkxOF6rcIBGvYSYO-VxOsaYQDw5rifJ)" 
on our [YouTube Channel](https://www.youtube.com/user/ChromeDevelopers).

## Special shout-out 

Have you seen [Puppeteer Examples](https://github.com/GoogleChromeLabs/puppeteer-examples)? 
You might have seen it from Eric Bidelman's tweet ["📯The 12 Days of Puppeteer 🤹🏻‍♂️🎁"](https://twitter.com/ebidel/status/1079067020748967937) 
last year. It's an awesome collection of Puppeteer code samples that let you think creatively 
about what you can do with the browser. You should check them out!

(Best of luck to [your new endeavor](https://twitter.com/ebidel/status/1101191475189039109) Eric! 
We'll miss you!!)

## Wrapping up

How did you like the first monthly wrap up? If you enjoyed it or have ideas to improve it, 
please do let me know on twitter [@kosamari](https://twitter.com/kosamari) ✅ 

If you've built something new using features introduced here or changed something in your codebase 
based on our articles, be sure to let us know at [@ChromiumDev](https://twitter.com/chromiumdev).

In March, a few of us are off to India hoping to learn more about mobile web experience there ✈️ 
Looking forward to sharing what we learn there!

See you next month👋

{% include "web/_shared/helpful.html" %}
{% include "web/_shared/rss-widget-updates.html" %}