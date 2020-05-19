project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's New in Chrome 83 for developers?

{# wf_published_on: 2020-05-19 #}
{# wf_updated_on: 2020-05-19 #}
{# wf_featured_image: /web/updates/images/2020/05/new-83.jpg #}
{# wf_tags: chrome83,new-in-chrome #}
{# wf_featured_snippet: Chrome 83 is rolling out now! It adds support for trusted types, which help prevent cross site scripting vulnerabilities. Form elements get an important make-over. There’s a new way to detect memory leaks. And the native file system API starts a new origin trial with added functionality. Let’s dive in and see what’s new for developers in Chrome 83! #}
{# wf_blink_components: N/A #}

# New in Chrome 83 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

Chrome 83 is starting to roll out to stable now.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="RsMikJZhnSQ"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Here's what you need to know:

* [Trusted types](#trusted-types) help prevent cross site scripting
  vulnerabilities.
* Form elements get an important [make-over](#forms).
* There’s a new way to [detect memory leaks](#memory).
* The [native file system API](#nfs) starts a new origin trial with added
  functionality.
* There are new [cross-origin policies](#coop)
* We've introduced the [Web Vitals](#web-vitals) program, to provide unified
  guidance for quality signals that, we believe, are essential to delivering
  a great user experience on the web.
* And [more](#more).

I’m [Pete LePage](https://twitter.com/petele), working and shooting from home,
let’s dive in and see what’s new for developers in Chrome 83!

<div class="clearfix"></div>

Note: App shortcuts were supposed to be landing in Chrome 83, but were
delayed until Chrome 84, scheduled for July 14th.

## Trusted types {: #trusted-types }

DOM-based cross-site scripting is one of the most common security
vulnerabilities on the web. It can be easy to accidentally introduce
one to your page. **Trusted types** can help prevent these kinds of
vulnerabilities, because they require you to process the data before
passing it into a potentially dangerous function.

Take `innerHTML` for example, with trusted types turned on, if I try to pass
a string, it'll fail with a TypeError because the browser doesn’t know if it
can trust the string.

```js
// Trusted types turned on
const elem = document.getElementById('myDiv');
elem.innerHTML = `Hello, world!`;
// Will throw a TypeError
```

Instead, I need to either use a safe function, like `textContent`, pass in
a trusted type, or create the element and use `appendChild()`.

```js
// Use a safe function
elem.textContent = ''; // OK

// Pass in a trusted type
import DOMPurify from 'dompurify';
const str = `Hello, world!`;
elem.innerHTML = DOMPurify.sanitize(str, {RETURN_TRUSTED_TYPE: true});

// Create an element
const img = document.createElement('img');
img.src = 'xyz.jpg';
elem.appendChild(img);
```

Before you turn on trusted types, you’ll want to identify and fix any
violations using a `report-only` CSP header.

```text
Content-Security-Policy-Report-Only: require-trusted-types-for 'script'; report-uri //example.com
```

Then once you’ve got everything buttoned up, you can turn it on properly.
Complete details are in
[Prevent DOM-based cross-site scripting vulnerabilities with Trusted Types][wd-tt]
on web.dev.

<div class="clearfix"></div>

## Updates to form controls {: #forms }

We use HTML form controls every day, and they are key to so much of the
web's interactivity. They're easy to use, have built-in accessibility, and are
familiar to our users. The styling of form controls can be inconsistent
across browsers and operating systems. And we frequently have to ship a
number of CSS rules just to get a consistent look across devices.

<figure class="attempt-left">
  <img src="/web/updates/images/2020/05/forms-before.png">
  <figcaption>
    Before, default styling of form controls.
  </figcaption>
</figure>
<figure class="attempt-right">
  <img src="/web/updates/images/2020/05/forms-after.png">
  <figcaption>
    After, updated styling of form controls.
  </figcaption>
</figure>

I’ve been really impressed by the work Microsoft has been doing to modernize
the appearance of form controls. Beyond the nicer visual style, they bring
better touch support, and better accessibility, including improved keyboard
support!

<img src="/web/updates/images/2020/05/forms-focus-ring.gif">

The new form controls have already landed in Microsoft Edge, and are now
available in Chrome 83. For more information, see
[Updates to Form Controls and Focus][crb-forms]
on the Chromium blog.

## Origin trials

### Measure memory with `measureMemory()` {: #memory }

Starting an origin trial in Chrome 83, `performance.measureMemory()` is a
new API that makes it possible to measure the memory usage of your page, and
detect memory leaks.

Memory leaks are easy to introduce:

* Forgetting to unregister an event listener
* Capturing objects from an iframe
* Not closing a worker
* Accumulating objects in arrays
* and so on.

Memory leaks lead to pages that appear slow, and bloated to users.

```js
if (performance.measureMemory) {
  try {
    const result = await performance.measureMemory();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
}
```

Check out
[Monitor your web page's total memory usage with `measureMemory()`][wd-memory]
on web.dev for all the details of the new API.

### Updates to the Native File System API {: #nfs }

The Native File System API started a new origin trial in Chrome 83 with
support for writable streams, and the ability to save file handles.

```js
async function writeURLToFile(fileHandle, url) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Make an HTTP request for the contents.
  const response = await fetch(url);
  // Stream the response into the file.
  await response.body.pipeTo(writable);
  // pipeTo() closes the destination pipe automatically.
}
```

Writable streams make it much easier to write to a file, and because it’s a
stream, you can easily pipe responses from one stream to another.

Saving file handles to IndexedDB allows you to store state, or remember
which files a user was working on. For example keep a list of recently
edited files, open the last file that the user was working on, and so on.

You’ll need a new origin trial token to use these features, so check out my
updated article
[The Native File System API: Simplifying access to local files][wd-nfs]
on web.dev with all the details, and how to get your new origin trial token.

### Other origin trials

Check <https://developers.chrome.com/origintrials/#/trials/active> for
a complete list of features in origin trial.

## New cross-origin policies {: #coop }

Some web APIs increase the risk of side-channel attacks like Spectre.
To mitigate that risk, browsers offer an opt-in-based isolated environment
called cross-origin isolated. The cross-origin isolated state also prevents
modifications of `document.domain`. Being able to alter `document.domain`
allows communication between same-site documents and has been considered
a loophole in the same-origin policy.

Check out Eiji's post
[Making your website "cross-origin isolated" using COOP and COEP][wd-coop] for
complete details.

## Web vitals {: #web-vitals }

Measuring the quality of user experience has many facets. While some aspects
of user experience are site and context specific, there is a common set of
signals — "**Core Web Vitals**" — that is critical to all web experiences.
Such [core user experience needs][wd-ucpm] include loading experience,
interactivity, and visual stability of page content, and combined are the
foundation of the 2020 Core Web Vitals.

<img src="/web/updates/images/2020/05/vitals-core.jpg">

* [**Largest Contentful Paint**][wd-lcp] measures perceived load speed and
  marks the point in the page load timeline when the page's main content has
  likely loaded.
* [**First Input Delay**][wd-fid] measures responsiveness and quantifies the
  experience users feel when trying to first interact with the page.
* [**Cumulative Layout Shift**][wd-cls] measures visual stability and
  quantifies the amount of unexpected layout shift of visible page content.

All of these metrics capture important user-centric outcomes, are field
measurable, and have supporting lab diagnostic metric equivalents and
tooling. For example, while Largest Contentful Paint is the topline loading
metric, it is also highly dependent on First Contentful Paint (FCP) and
Time to First Byte (TTFB), which remain critical to monitor and improve.

To learn more, check out
[Introducing Web Vitals: essential metrics for a healthy site][crb-vitals]
on the Chromium Blog for complete details.

## And more {: #more }

* Chrome now supports the [Barcode Detection API][wd-barcode-api], which
  provides the ability to detect and decode barcodes.
* The new [CSS @supports function][css-supports] provides feature detection
  for CSS selectors.
* New [ARIA annotations](https://www.chromestatus.com/feature/4666935918723072)
  support screen reader accessibility for comments, suggestions, and text
  highlights with semantic meanings (similar to `<mark>`).
* The [`prefers-color-scheme` media query][wd-dark] lets authors support
  their own dark theme so they have full control over experiences they build.
* JavaScript now supports [modules in shared workers][wd-module-workers].

Note: Curious about what's coming in the future? Check out the
[Fugu API Tracker](https://goo.gle/fugu-api-tracker) to see!

## Further reading

This covers only some of the key highlights. Check the links below for
additional changes in Chrome 83.

* [What's new in Chrome DevTools (83)](/web/updates/2020/03/devtools)
* [Chrome 83 deprecations & removals](/web/updates/2020/04/chrome-83-deps-rems)
* [ChromeStatus.com updates for Chrome 83](https://www.chromestatus.com/features#milestone%3D83)
* [What's new in JavaScript in Chrome 83](https://v8.dev/blog/v8-release-83)
* [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/81.0.4044.99..83.0.4103.64)

## Subscribe {: .hide-from-toc }

Want to stay up to date with our videos, then [subscribe](https://goo.gl/6FP1a5)
to our [Chrome Developers YouTube channel](https://www.youtube.com/user/ChromeDevelopers/),
and you’ll get an email notification whenever we launch a new video, or add our
[RSS feed](/web/shows/rss.xml) to your feed reader.

I’m Pete LePage, and I **need** a hair cut, but as soon as Chrome 84 is
released, I’ll be right here to tell you -- what’s new in Chrome!

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[css-supports]: https://drafts.csswg.org/css-conditional-4/#dfn-support-selector
[crb-forms]: https://blog.chromium.org/2020/03/updates-to-form-controls-and-focus.html
[crb-vitals]: https://blog.chromium.org/2020/05/introducing-web-vitals-essential-metrics.html
[wd-tt]: https://web.dev/trusted-types/
[wd-memory]: https://web.dev/monitor-total-page-memory-usage/
[wd-nfs]: https://web.dev/native-file-system/
[wd-barcode-api]: https://web.dev/shape-detection/
[wd-coop]: https://web.dev/coop-coep/
[wd-lcp]: https://web.dev/lcp/
[wd-fid]: https://web.dev/fid/
[wd-cls]: https://web.dev/cls/
[wd-ucpm]: https://web.dev/user-centric-performance-metrics/#defining-metrics
[wd-dark]: https://web.dev/color-scheme/
[wd-module-workers]: https://web.dev/module-workers/#what-about-shared-workers
