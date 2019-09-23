project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Copy element styles, visualize layout shifting, and more.

{# wf_updated_on: 2019-09-23 #}
{# wf_published_on: 2019-07-22 #}
{# wf_tags: chrome77, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Copy element styles, visualize layout shifting, and more. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 77) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="R8KzoMoKhnM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Copy element's styles {: #copystyles }

Right-click a node in the **DOM Tree** to copy that DOM node's CSS to your clipboard.

<figure>
  <img src="/web/updates/images/2019/07/copystyles.png"
       alt="Copy styles."/>
  <figcaption>
    Figure 1. Copy element styles.
  </figcaption>
</figure>

[visbug]: https://chrome.google.com/webstore/detail/visbug/cdockenadnadldjbbgcallicgledbeoc

Thanks [Adam Argyle](https://twitter.com/argyleink) and [VisBug][visbug] for the
[inspiration](https://twitter.com/argyleink/status/1142216452184821760).

<!-- https://chromium.googlesource.com/chromium/src/+/3acba91a70ebe1c21a0c29759309abf8aaa2ac99 -->

## Visualize layout shifts {: #layoutshifts }

<aside class="warning">
  This feature can cause your screen to flash a lot and may not be suitable for you if you're prone to
  photosensitive epilepsy.
</aside>

[placeholders]: /web/fundamentals/performance/lazy-loading-guidance/images-and-video/#layout_shifting_and_placeholders

Supposing you're reading a news article on your favorite website. As you're reading the page, you 
keep losing your place because the content is jumping around. This problem is called layout 
shifting. It usually happens when images and ads finish loading. The page hasn't reserved any 
space for the images and ads, so the browser has to shift all the other content down to 
make room for them. The solution is to use [placeholders][placeholders].

DevTools can now help you detect layout shifting:

1. Open the [Command Menu](/web/tools/chrome-devtools/command-menu).
1. Start typing `Rendering`.
1. Run the **Show Rendering** command.
1. Enable the **Layout Shift Regions** checkbox. As you interact with a page, layout shifts 
   are highlighted blue.

<figure>
  <img src="/web/updates/images/2019/07/layoutshift.png"
       alt="A layout shift."/>
  <figcaption>
    Figure 2. A layout shift.
  </figcaption>
</figure>

[Chromium issue #961846](https://crbug.com/961846)

## Lighthouse 5.1 in the Audits panel {: #audits }

Note: This actually launched in Chrome 76, but we missed it in the last release notes so we're covering it now.

<aside class="note">
  This update actually shipped in Chrome 76. We didn't cover it in
  <a href="/web/updates/2019/05/devtools">What's New In DevTools (Chrome 76)</a> so we're
  covering it now.
</aside>

[v5.1]: https://github.com/GoogleChrome/lighthouse/releases/tag/v5.1.0

The Audits panel is now running [Lighthouse 5.1][v5.1]. New audits include:

[safari]: /web/fundamentals/design-and-ux/browser-customization/#safari
[FID]: /web/updates/2018/05/first-input-delay

* [Provides a valid `apple-touch-icon`][safari]. Checks that a PWA can be added to an iOS
  homescreen.
* [Keep request counts and file sizes low](/web/tools/lighthouse/audits/budgets). Reports 
  the total number of network requests and file sizes for various categories, such as
  documents, scripts, stylesheets, images, and so on.
* [Maximum Potential First Input Delay][FID]. Measures the maximum potential time between a user's
  first page interaction and the browser's response to that interaction. Note that this metric
  replaces the Estimated Input Latency metric. Maximum Potential First Input Delay does not
  factor into your Performance category score.

<figure>
  <img src="/web/updates/images/2019/07/audits.png"
       alt="The new Audits panel UI."/>
  <figcaption>
    Figure 3. The new Audits panel UI.
  </figcaption>
</figure>

The Node and CLI versions of Lighthouse 5.1 have 3 new major features worth checking out:

* [Performance Budgets](/web/tools/lighthouse/audits/budgets). Prevent your site from regressing
  over time by specifying request counts and file sizes that pages should not exceed.
* [Plugins](https://github.com/GoogleChrome/lighthouse/blob/master/docs/plugins.md). Extend
  Lighthouse with your own custom audits.
* [Stack Packs](https://github.com/GoogleChrome/lighthouse-stack-packs). Add audits tailored
  to specific technology stacks. The WordPress Stack Pack shipped first. React and AMP Stack
  Packs are in development.

<!-- https://chromium.googlesource.com/chromium/src/+/ab2bd77915e3120a8e2f33fab1c804f4d2935b92 -->

## OS theme syncing {: #theming }

[dark]: /web/tools/chrome-devtools/customize/dark-theme

If you're using the dark theme of your OS, DevTools now switches to its own [dark theme][dark]
automatically.

## Keyboard shortcut for opening the Breakpoint Editor {: #breakpointeditor }

[logpoints]: /web/updates/2019/01/devtools#logpoints
[conditionalbreakpoints]: /web/tools/chrome-devtools/javascript/breakpoints#conditional-loc

Press <kbd>Control</kbd>+<kbd>Alt</kbd>+<kbd>B</kbd> or 
<kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>B</kbd> (Mac) when focused in the Sources panel's
Editor to open the **Breakpoint Editor**. Use the Breakpoint Editor to create 
[Logpoints][logpoints] and [Conditional Breakpoints][conditionalbreakpoints].

<figure>
  <img src="/web/updates/images/2019/07/breakpointeditor.png"
       alt="The Breakpoint Editor."/>
  <figcaption>
    Figure 4. The <b>Breakpoint Editor</b>.
  </figcaption>
</figure>

<!-- https://chromium.googlesource.com/chromium/src/+/fa85b87f00a78cf1de99ef5f5091186670beccba -->

## Prefetch cache in Network panel {: #prefetch }

[caniuse]: https://caniuse.com/#feat=link-rel-prefetch
[prefetch]: /web/fundamentals/performance/resource-prioritization#prefetch

The **Size** column of the Network panel now says `(prefetch cache)` when a resource was loaded from
the prefetch cache. [Prefetch][prefetch] is a new-ish web platform feature for speeding up subsequent
page loads. [Can I use...][caniuse] reports that it's supported in 83.33% of global browsers as of July 2019.

<figure>
  <img src="/web/updates/images/2019/07/prefetch.png"
       alt="The Size column showing that resources came from the prefetch cache."/>
  <figcaption>
    Figure 5. The <b>Size</b> column shows that <code>prefetch2.html</code> and
    <code>prefetch2.css</code> came from <code>(prefetch cache)</code>.
  </figcaption>
</figure>

See [Prefetch Demo](https://devtools.glitch.me/wndt77/prefetch1.html) to try it out.

[Chromium issue #935267](https://crbug.com/935267)

## Private properties when viewing objects {: #privateclassfields }

The Console now shows [private class fields](https://v8.dev/features/class-fields#private-class-fields)
in its object previews.

<figure>
  <img src="/web/updates/images/2019/07/privatefields.png"
       alt="When inspecting an object, the Console now shows private fields like '#color'."/>
  <figcaption>
    Figure 6. The old version of Chrome on the left does not show the 
    <code>#color</code> field when inspecting the object, whereas the new version on the 
    right does.
  </figcaption>
</figure>

<!-- https://chromium.googlesource.com/chromium/src/+/2a2a6dc55caa33f524f49025028c3ceb428c2909 -->

## Notifications and push messages in the Application panel {: #backgroundservices }

The Background Services section of the Application panel now supports Push Messages and 
Notifications. Push Messages occur when a server sends information to a service worker. 
Notifications occur when a service worker or page script shows information to the user.

[background]: /web/updates/2019/05/devtools#background

As with the [Background Fetch and Background Sync features from Chrome 76][background], once
you start recording, Push Messages and Notifications on this page are recorded for 3 days, even
when the page is closed, and even when Chrome is closed.

<figure>
  <img src="/web/updates/images/2019/07/backgroundservices.png"
       alt="The new Notifications and Push Messages panes."/>
  <figcaption>
    Figure 7. The new Push Messages and Notifications panes in the Application panel.
  </figcaption>
</figure>

[Chromium issue #927726](https://crbug.com/927726)

## Feedback {: #feedback }

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools
[WF]: https://github.com/google/webfundamentals/issues/new
[SO]: https://stackoverflow.com/questions/tagged/google-chrome-devtools

{% include "web/_shared/helpful.html" %}

To discuss the new features and changes in this post, or anything else related to DevTools:

* File definite bug reports and feature requests at [Chromium Bugs](https://crbug.com){:.external}.
* Discuss possible features, changes, and bugs on the [Mailing List][ML]{:.external}.
* Get help on how to use DevTools on [Stack Overflow][SO]{:.external}.
* Tweet us at [@ChromeDevTools](https://twitter.com/chromedevtools).
* File bugs on this document in the [Web Fundamentals][WF]{:.external} repository.

## Consider Canary {: #canary }

[canary]: https://www.google.com/chrome/browser/canary.html

If you're on Mac or Windows, consider using [Chrome Canary][canary] as your default
development browser. Canary gives you access to the latest DevTools features.

Note: Canary is released as soon as its built, without testing. This means that Canary
breaks about once-a-month. It's usually fixed within a day. You can go back to using Chrome
Stable while Canary is broken.

<<../../_shared/discover.md>>

{% include "web/_shared/rss-widget-updates.html" %}
