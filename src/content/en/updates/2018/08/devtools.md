project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Watch expressions in the Console, highlight DOM nodes during Eager Evaluation, and more.
experiments_path: /web/updates/2018/08/_experiments.yaml

{# wf_updated_on: 2018-08-29 #}
{# wf_published_on: 2018-08-29 #}
{# wf_tags: chrome70,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Watch expressions in the Console, highlight DOM nodes during Eager Evaluation, and more. #}
{# wf_blink_components: Platform>DevTools #}

[settings]: /web/updates/images/2018/05/settings.png

{# https://chromium.googlesource.com/chromium/src/+/a39ce6e61cd170b5b549f119f3b6f7a08253cba9 #}

# What's New In DevTools (Chrome 70) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: We'll publish the video version of <i>What's New In DevTools (Chrome 70)</i> around
mid-October 2018.

Welcome back! It's been about 12 weeks since our last update, which was for Chrome 68.
We skipped Chrome 69 because we didn't have enough new features or UI changes to warrant a post.

New features and major changes coming to DevTools in Chrome 70 include:

* [Watch expressions in the Console](#watch). Pin an expression to the top of your Console and
  monitor its value in real-time.
* [Highlight DOM nodes during Eager Evaluation](#nodes). Type an expression that evaluates
  to a DOM node to highlight that node in the viewport.
* [Performance panel optimizations](#performance). Faster visualizing and processing of
  data.
* [More reliable debugging](#debugging). Bug fixes related to breakpoints, and code stepping
  for TypeScript users.
* [Enable network throttling from the Command Menu](#throttling). Run commands to simulate
  fast 3G or slow 3G.
* [Autocomplete Conditional Breakpoints](#autocomplete). Use the Autocomplete UI to type out
  conditional breakpoints faster.
* [Break on `AudioContext` events](#audiocontext). Use the Event Listener Breakpoints
  pane to pause on the first line of an `AudioContext` lifecycle event handler.
* [Debug Node.js apps with ndb](#ndb). Detect and attach to child processes, place breakpoints
  before modules are required, edit files from the DevTools UI, blackbox scripts outside
  of the working directory, and more.

## Watch expressions in the Console {: #watch }

{# https://chromium.googlesource.com/chromium/src/+/589cdcb33ef96770a2c3e4a9c76ee439d1e2e56e #}

Pin a Console expression to the top of your Console when you want to monitor its value in
real-time.

1. Click **Create Watch Expression** ![Create Watch Expression][watch]{: .inline-icon }.
   The Watch Expression UI opens.

     <figure>
       <img src="/web/updates/images/2018/08/watch1.png"
            alt="The Watch UI"/>
       <figcaption>
         <b>Figure X</b>. The Watch UI
       </figcaption>
     </figure>

[watch]: /web/updates/images/2018/08/create-watch-expression.png

1. Type the expression that you want to watch.

     <figure>
       <img src="/web/updates/images/2018/08/watch2.png"
            alt="Typing Date.now() into the Watch Expression UI."/>
       <figcaption>
         <b>Figure X</b>. Typing <code>Date.now()</code> into the Watch Expression UI
       </figcaption>
     </figure>

1. Click outside of the Watch Expression UI to save your expression.

     <figure>
       <img src="/web/updates/images/2018/08/watch3.png"
            alt="A saved Watch Expression."/>
       <figcaption>
         <b>Figure X</b>. A saved Watch Expression
       </figcaption>
     </figure>

Watch Expression values update every 250 milliseconds.

## Debug Node.js apps with ndb {: #ndb }

ndb is a new debugger for Node.js applications. On top of the [usual debugging features that
you get through DevTools][medium]{: .external }, ndb also offers:

[medium]: https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27

* Detecting and attaching to child processes.
* Placing breakpoints before modules are required.
* Editing files within the DevTools UI.
* Blackboxing all scripts outside of the current working directory by default.

<figure>
  <img src="/web/updates/images/2018/08/ndb.png"
       alt="The ndb UI."/>
  <figcaption>
    <b>Figure X</b>. The ndb UI
  </figcaption>
</figure>

Check out [ndb's README][ndb]{: .external } to learn more.

[ndb]: https://github.com/GoogleChromeLabs/ndb/blob/master/README.md

## Highlight DOM nodes during Eager Evaluation {: #nodes }

{# https://chromium.googlesource.com/chromium/src/+/d23141f79f139a042e5be53f499be649b6babbd1 #}

Type an expression that evaluates to a DOM node in the Console and [Eager Evaluation][EE]
highlights that node in the viewport.

<figure>
  <img src="/web/updates/images/2018/08/node.png"
       alt="Since the current expression evaluates to a node, that node is highlighted in the
            viewport."/>
  <figcaption>
    <b>Figure X</b>. Since the current expression evaluates to a node, that node is highlighted
    in the viewport
  </figcaption>
</figure>

[EE]: /web/updates/2018/05/devtools#eagerevaluation

## Performance panel optimizations {: #performance }

When profiling a large page, the Performance panel previously took tens of seconds to process
and visualize the data. Clicking on a event to learn more about it in the Summary tab also
sometimes took multiple seconds to load. Processing and visualizing is faster in Chrome 70.

<figure>
  <img src="/web/updates/images/2018/08/performance.png"
       alt="Processing and loading Performance data."/>
  <figcaption>
    <b>Figure X</b>. Processing and loading Performance data
  </figcaption>
</figure>

## More reliable debugging {: #debugging }

Chrome 70 fixes some bugs that were causing breakpoints to disappear or not get
triggered. It also fixes bugs related to sourcemaps. Some TypeScript users would instruct
DevTools to blackbox a certain TypeScript file while stepping through code, and instead DevTools
would blackbox the entire bundled JavaScript file. These fixes also address an issue that was
causing the Sources panel to generally run slowly.

## Enable network throttling from the Command Menu {: #throttling }

{# https://chromium.googlesource.com/chromium/src/+/80a1b32298704be36598864ddfc6d8c478af3193 #}

You can now set network throttling to fast 3G or slow 3G from the [Command Menu][CM].

[CM]: /web/tools/chrome-devtools/ui#command-menu

<figure>
  <img src="/web/updates/images/2018/08/throttling.png"
       alt="Network throttling commands in the Command Menu."/>
  <figcaption>
    <b>Figure X</b>. Network throttling commands in the Command Menu
  </figcaption>
</figure>

## Autocomplete Conditional Breakpoints {: #autocomplete }

{# https://chromium.googlesource.com/chromium/src/+/f5874da31db94985ad43b1d50b6689e07794c5a6 #}

Use the Autocomplete UI to type out your [Conditional Breakpoint][CB] expressions faster.

<figure>
  <img src="/web/updates/images/2018/08/autocomplete.png"
       alt="The Autocomplete UI"/>
  <figcaption>
    <b>Figure X</b>. The Autocomplete UI
  </figcaption>
</figure>

[CB]: /web/tools/chrome-devtools/javascript/breakpoints#conditional-loc

<aside class="objective">
  <b>Did you know?</b> The Autocomplete UI is possible thanks to <a href="https://codemirror.net/"
  class="external">CodeMirror</a>, which also powers the Console.
</aside>

## Break on AudioContext events {: #audiocontext }

Use the [Event Listener Breakpoints][ELB] pane to pause on the first line of an `AudioContext`
lifecycle event handler.

[AudioContext][AudioContext]{: .external } is part of the Web Audio API, which you can use to
process and synthesize audio.

[AudioContext]: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext

[ELB]: https://developers.google.com/web/tools/chrome-devtools/javascript/breakpoints#event-listeners

<figure>
  <img src="/web/updates/images/2018/08/audiocontext.png"
       alt="AudioContext events in the Event Listener Breakpoints pane."/>
  <figcaption>
    <b>Figure X</b>. AudioContext events in the Event Listener Breakpoints pane
  </figcaption>
</figure>

{# https://chromium.googlesource.com/chromium/src/+/5cc93793d9819f9b0d9e6fde47cdeb8e9c481ae4 #}

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File bug reports at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss features and changes on the [Mailing List][ML]{:.external}. Please don't use the mailing
  list for support questions. Use Stack Overflow, instead.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}. Please don't file bugs
  on Stack Overflow. Use Chromium Bugs, instead.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this doc in the [Web Fundamentals][WF]{:.external} repository.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

## Consider Canary {: #canary }

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

[canary]: https://www.google.com/chrome/browser/canary.html

## Previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}
