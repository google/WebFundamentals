project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Lighthouse 5.2 in the Audits panel, and Largest Contentful Paint in the Performance panel.

{# wf_updated_on: 2019-09-03 #}
{# wf_published_on: 2019-08-29 #}
{# wf_tags: chrome78, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Lighthouse 5.2 in the Audits panel, and Largest Contentful Paint in the Performance panel. #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 78) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

## Lighthouse 5.2 in the Audits panel {: #audits }

[LH]: https://github.com/GoogleChrome/lighthouse/releases/tag/v5.2.0
[3P]: https://web.dev/fast#optimize-your-third-party-resources

The **Audits** panel is now running [Lighthouse 5.2][LH]. The new **Third-Party Usage** 
diagnostic audit tells you how much third-party code was requested and how long that third-party
code blocked the main thread while the page loaded. See [Optimize your third-party resources][3P]
to learn more about how third-party code can degrade load performance.

<figure>
  <img src="/web/updates/images/2019/08/thirdpartycode.png"
       alt="A screenshot of the 'Third-Party Usage' audit in the Lighthouse report UI."/>
  <figcaption>
    Figure 1. The <b>Third-party usage</b> audit.
  </figcaption>
</figure>

[Chromium issue #772558](https://crbug.com/772558)

## Largest Contentful Paint in the Performance panel {: #LCP }

[LCP]: https://web.dev/largest-contentful-paint
[record]: /web/tools/chrome-devtools/evaluate-performance/reference#record-load

When [analyzing load performance in the **Performance** panel][record], the **Timings** section
now includes a marker for [Largest Contentful Paint][LCP] (LCP). LCP reports the render time
of the largest content element visible in the viewport.

<figure>
  <img src="/web/updates/images/2019/08/lcp.png"
       alt="The LCP marker in the Timings section."/>
  <figcaption>
    Figure 2. The <b>LCP</b> marker in the <b>Timings</b> section.
  </figcaption>
</figure>

To highlight the DOM node associated with LCP:

1. Click the **LCP** marker in the **Timings** section.
1. Hover over the **Related Node** in the **Summary** tab to highlight the node in the
   viewport.

     <figure>
       <img src="/web/updates/images/2019/08/relatednode.png"
            alt="The Related Node section of the Summary tab."/>
       <figcaption>
         Figure 3. The <b>Related Node</b> section of the <b>Summary</b> tab.
       </figcaption>
     </figure>

[DOM]: /web/tools/chrome-devtools/dom

1. Click the **Related Node** to select it in the [**DOM Tree**][DOM].

<!-- https://chromium.googlesource.com/chromium/src/+/9ed4ed171aa627b481275a90cf193a8e126e3fa6 -->

## File DevTools issues from the Main Menu {: #issues }

[repro]: https://stackoverflow.com/help/minimal-reproducible-example

If you ever encounter a bug in DevTools and want to file an issue, or if you ever get an idea
on how to improve DevTools and want to request a new feature, go to **Main Menu** > **Help** >
**Report a DevTools issue** to create an issue in the DevTools engineering team's tracker. Providing a
[minimal, reproducible example][repro] on [Glitch](https://glitch.com/) dramatically increases
the team's ability to fix your bug or implement your feature request!

<figure>
  <img src="/web/updates/images/2019/08/reportissue.png"
       alt="Main Menu > Help > Report a DevTools issue."/>
  <figcaption>
    Figure 4. <b>Main Menu</b> &gt; <b>Help</b> &gt; <b>Report a DevTools issue</b>.
  </figcaption>
</figure>

<!-- https://chromium.googlesource.com/chromium/src/+/ac7df080c78c8f38a448f518cf8a1c63e3d120c5 -->

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
