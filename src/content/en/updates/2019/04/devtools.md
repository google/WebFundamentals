project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Meaningful autocomplete preset values, clear site data from the Command Menu, and more.

{# wf_updated_on: 2019-04-17 #}
{# wf_published_on: 2019-04-17 #}
{# wf_tags: chrome75, devtools, devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Meaningful autocomplete preset values, clear site data from the Command Menu, and more. #}
{# wf_blink_components: Platform>DevTools #}

[settings]: /web/tools/chrome-devtools/ui#settings

# What's New In DevTools (Chrome 75) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Hello! Here's what's new in [Chrome DevTools](/web/tools/chrome-devtools/) in Chrome 75.

## Video version of this page {: #video }

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="6zKPwOMFsa4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Meaningful preset values when autocompleting CSS functions {: #presets }

Some CSS properties, like [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter){: .external },
take functions for values. For example, `filter: blur(1px)` adds a 1-pixel blur to a node.
When autocompleting properties like `filter`, DevTools now populates the property with a meaningful
value so that you can preview what kind of change the value will have on the node.

<figure>
  <img src="/web/updates/images/2019/04/blur1.png"
       alt="The old autocomplete behavior."/>
  <figcaption>
    <b>Figure 1</b>. The old autocomplete behavior. DevTools is autocompleting
    to <code>filter: blur</code> and no change is visible in the viewport.
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/04/blur2.png"
       alt="The new autocomplete behavior."/>
  <figcaption>
    <b>Figure 2</b>. The new autocomplete behavior. DevTools is autocompleting
    to <code>filter: blur(1px)</code> and the change is visible in the viewport.
  </figcaption>
</figure>

Relevant Chromium issue: [#931145](https://crbug.com/931145)

## Clear site data from the Command Menu {: #clear }

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac) to open the Command Menu
and then run the **Clear Site Data** command to clear all data related to the
page, including: [Service workers](/web/ilt/pwa/introduction-to-service-worker),
[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage){: .external },
[`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage){: .external }, 
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API){: .external }, 
[Web SQL](https://www.w3.org/TR/webdatabase/){: .external }, 
[Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies){: .external }, 
[Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache){: .external }, and
[Application Cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache){: .external }.

<figure>
  <img src="/web/updates/images/2019/04/clearsitedata.png"
       alt="The Clear Site Data command."/>
  <figcaption>
    <b>Figure 3</b>. The <b>Clear Site Data</b> command.
  </figcaption>
</figure>

Clearing site data has been available from **Application** > **Clear Storage** for a while.
The new feature in Chrome 75 is being able to run the command from the Command Menu.

If you don't want to delete *all* site data, you can control what data gets deleted from
**Application** > **Clear Storage**.

<figure>
  <img src="/web/updates/images/2019/04/clearstoragepane.png"
       alt="Application > Clear Storage."/>
  <figcaption>
    <b>Figure 4</b>. <b>Application</b> &gt; <b>Clear Storage</b>.
  </figcaption>
</figure>

Relevant Chromium issue: [#942503](https://crbug.com/942503)

## View all IndexedDB databases {: #indexeddb }

Previously **Application** > **IndexedDB** only allowed you to inspect IndexedDB databases from the
main origin. For example, if you had an `<iframe>` on your page, and that `<iframe>` was using IndexedDB,
you wouldn't be able to see its database(s). As of Chrome 75, DevTools shows IndexedDB databases for all origins.

<figure>
  <img src="/web/updates/images/2019/04/idb1.png"
       alt="The old behavior. The page is embedding a demo that uses IndexedDB, but no databases are visible."/>
  <figcaption>
    <b>Figure 5</b>. The old behavior. The page is embedding a demo that uses IndexedDB, but no databases are visible.
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/04/idb2.png"
       alt="The new behavior. The demo's databases are visible."/>
  <figcaption>
    <b>Figure 6</b>. The new behavior. The demo's databases are visible.
  </figcaption>
</figure>

Relevant Chromium issue: [#943770](https://crbug.com/943770)

## View a resource's uncompressed size on hover {: #uncompressed }

Suppose that you're [inspecting network activity](/web/tools/chrome-devtools/network/).
Your site uses [text compression](/web/tools/lighthouse/audits/text-compression) to reduce
the transfer size of resources. You want to see how large the page's resources are after the
browser uncompresses them. Previously this information was only available when using
[large request rows](/web/tools/chrome-devtools/network/reference#uncompressed). Now you can
access this information by hovering over the **Size** column.

<figure>
  <img src="/web/updates/images/2019/04/hover.png"
       alt="Hovering over the Size column to view a resource's uncompressed size."/>
  <figcaption>
    <b>Figure 7</b>. Hovering over the Size column to view a resource's uncompressed size.
  </figcaption>
</figure>

Relevant Chromium issue: [#805429](https://crbug.com/805429)

## Inline breakpoints in the breakpoint pane {: #inline }

Suppose that you add a [line-of-code breakpoint](/web/tools/chrome-devtools/javascript/breakpoints#loc) to the following
line of code:

    document.querySelector('#dante').addEventListener('click', logWarning);

For a while now DevTools has enabled you to specify when exactly it should pause on a breakpoint like this: at the
beginning of the line, before `document.querySelector('#dante')` is called, or before `addEventListener('click', logWarning)`
is called. If you enable all 3, you're essentially creating 3 breakpoints. Previously the **Breakpoints** pane did not
give you the ability to manage these 3 breakpoints individually. As of Chrome 75 each inline breakpoint gets its
own entry in the **Breakpoints** pane.

<figure>
  <img src="/web/updates/images/2019/04/breakpoints1.png"
       alt="The old behavior. There's only one entry in the Breakpoints pane."/>
  <figcaption>
    <b>Figure 8</b>. The old behavior. There's only 1 entry in the <b>Breakpoints</b> pane.
  </figcaption>
</figure>

<figure>
  <img src="/web/updates/images/2019/04/breakpoints2.png"
       alt="The new behavior. There's 3 entries in the Breakpoints pane."/>
  <figcaption>
    <b>Figure 9</b>. The new behavior. There's 3 entries in the <b>Breakpoints</b> pane.
  </figcaption>
</figure>

Relevant Chromium issue: [#927961](https://crbug.com/927961)

## IndexedDB and Cache resource counts {: #counts }

The **IndexedDB** and **Cache** panes now indicate the total number of resources in a database or cache.

<figure>
  <img src="/web/updates/images/2019/04/totalentries.png"
       alt="Total entries in an IndexedDB database."/>
  <figcaption>
    <b>Figure 10</b>. Total entries in an IndexedDB database.
  </figcaption>
</figure>

Relevant Chromium issues: [#941197](https://crbug.com/941197), [#930773](https://crbug.com/930773), [#930865](https://crbug.com/930865)

## Setting for disabling the detailed inspect tooltip {: #inspect }

[inspect]: /web/updates/2019/01/devtools#inspect

Chrome 73 introduced [detailed tooltips when in Inspect mode][inspect].

<figure>
  <img src="/web/updates/images/2019/04/inspect1.png"
       alt="A detailed tooltip."/>
  <figcaption>
    <b>Figure 11</b>. A detailed tooltip showing color, font, margin, and contrast.
  </figcaption>
</figure>

You can now disable these detailed tooltips from [**Settings**][settings] > **Preferences** > **Elements** >
**Show Detailed Inspect Tooltip**.

<figure>
  <img src="/web/updates/images/2019/04/inspect2.png"
       alt="A minimal tooltip."/>
  <figcaption>
    <b>Figure 12</b>. A minimal tooltip showing only width and height.
  </figcaption>
</figure>

Relevant Chromium issue: [#948417](https://crbug.com/948417)

## Setting for toggling tab indentation in the Sources panel editor {: #tab }

[editor]: /web/tools/chrome-devtools/sources#edit

Accessibility testing revealed that there was a tab trap in the [**Editor**][editor]. Once a keyboard user tabbed
into the **Editor**, they had no way to tab out of it because the <kbd>Tab</kbd> key was used for indentation.
To override the default behavior and use <kbd>Tab</kbd> to move focus, enable [**Settings**][settings] >
**Preferences** > **Sources** > **Enable Tab Moves Focus**.

[a11y]: /web/tools/chrome-devtools/accessibility/navigation

There's been a lot of work recently around making the DevTools UI itself more keyboard navigable. Check out
Rob's [Navigate Chrome DevTools With Assistive Technology][a11y] to learn more.

<!-- https://chromium.googlesource.com/chromium/src/+/27ff38b767bc1659a596830b864acf60850e6bd0 -->

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
