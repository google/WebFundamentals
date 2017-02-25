project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Lighthouse 1.5.

{# wf_updated_on: 2017-02-10 #}
{# wf_published_on: 2017-02-10 #}
{# wf_tags: lighthouse,tools,performance,progressive-web-apps #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: What's new in Lighthouse 1.5. New audits, extension updates, Performance Experiment, online Viewer features, and UI tweaks. #}

# Lighthouse January 2017 update {: .page-title }

{% include "web/_shared/contributors/brendankenny.html" %}
{% include "web/_shared/contributors/ericbidelman.html" %}

[Lighthouse](/web/tools/lighthouse/) is an
[open-source](https://github.com/GoogleChrome/lighthouse), automated tool for
improving the quality of your web apps. You can install it as a
[Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
or run it as a Node command line tool. When you give Lighthouse a URL, it runs
a barrage of tests against the page and then generates a report explaining
how well the page did and indicating areas for improvement.
{: .note }

<img src="/web/progressive-web-apps/images/pwa-lighthouse.png"
     class="lighthouse-logo attempt-right" alt="Lighthouse Logo">

<style>
.lighthouse-logo {
  height: 150px;
  width: auto;
}
</style>

Today, we're happy to announce the
[1.5 release](https://github.com/GoogleChrome/lighthouse/releases/tag/1.5.0)
of Lighthouse, a huge release, with over **128 PRs**. Lighthouse 1.5 includes
a bunch of big new features, audits, and the usual bug fixes. You can install
it from npm (`npm i -g lighthouse`) or
[download the extension](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk)
from the Chrome Web Store.

## New Audits

The **CSS Usage Audit** reports the number of unused style rules in your page
and the cost/time savings of removing them:

![CSS Usage Audit](/web/updates/images/2017/02/lighthouse/image_1.png)

The **Optimized Images Audit** reports images that are unoptimized and the
cost/time savings of optimizing them:

![Optimized Images AudiT](/web/updates/images/2017/02/lighthouse/image_2.png)

The **Responsive Images Audit** reports images that are too big and the
potential cost/time savings of sizing them correctly for the given device:

![Responsive Images Audit](/web/updates/images/2017/02/lighthouse/image_3.png)

The **Deprecations and Interventions Audit** lists console warnings from Chrome
if your page is using deprecated APIs or features that have
[interventions](https://www.chromestatus.com/features#intervention):

![Deprecations and Interventions Audit](/web/updates/images/2017/02/lighthouse/image_4.png)

## Report changes

As you've seen, we've focused on making the report less visually cluttered by
adding tabular data, hiding extraneous help text, and adding new features to
make it easier to navigate the data.

### Emulation settings

It's easy to forget what throttling and emulation settings were used for a
particular Lighthouse run. Lighthouse reports now include the
**runtime emulation settings** that were used to create the report; a
[long time feature request](https://github.com/GoogleChrome/lighthouse/issues/568):

![Emulation settings](/web/updates/images/2017/02/lighthouse/image_5.gif)

### More useful trace data

Lighthouse metrics like "First meaningful paint", "Time to Interactive", etc are
mocked out as User Timing measures and injected back into the trace data saved
with the `--save-assets` flag.

If you use the `--save-assets` flag, you can now drop the trace into DevTools or
open it in the [DevTools Timeline Viewer](https://chromedevtools.github.io/timeline-viewer/).
You'll be able to see your key metrics in context with the full trace of the
page load.

![Trace data](/web/updates/images/2017/02/lighthouse/image_6.png)

## Lighthouse Viewer

In HTML reports, you'll notice a new button with options for exporting the
report in different formats. One of those options is "Open in Viewer". Clicking
this button will send the report to the online
[Viewer](https://googlechrome.github.io/lighthouse/viewer/), where you can
further share the report with GitHub users.

![Open in Viewer button](/web/updates/images/2017/02/lighthouse/image_8.png)

![Open in Viewer result](/web/updates/images/2017/02/lighthouse/image_9.png)

Behind the scenes, Viewer gets your permission via OAuth to create a GitHub
[secret gist](https://help.github.com/articles/about-gists/#secret-gists) and
saves the report there. Since it's done as your Gist, you maintain full control
over the sharing of the report and you can delete it at any time. You can revoke
the Viewer's permission to create gists under your
[GitHub settings](https://github.com/settings/applications).

## Performance Experiment

The first version of the
[Performance Experiment](https://github.com/GoogleChrome/lighthouse/issues/1143)
project has landed in 1.5.0. This lets you experiment with your page load performance,
interactively testing the effects of blocking or delaying assets in your critical
path **during development**.

When Lighthouse is run with the `--interactive` flag, a special report is
generated that allows interactive selection of costly page resources. The
experiment server then reruns Lighthouse on that page with those resources
blocked.

![Toggling runtime settings](/web/updates/images/2017/02/lighthouse/image_10.png)

[Learn more](https://docs.google.com/document/d/1FYt5Es_Kf5IyC_bkTHj2G_a_sTvRvIq5iZCEN8VZY5o/edit#heading=h.cetla8h0y4o)
about the Performance Experiment in Lighthouse.

## New Documentation

Last but not least, we've modernized the documentation at
[developers.google.com/web/tools/lighthouse/](/web/tools/lighthouse/)
and added new audit references.

![New documentation](/web/updates/images/2017/02/lighthouse/image_11.png)

That's it for now!

For all the details on the latest in Lighthouse, see the
[full release notes](https://github.com/GoogleChrome/lighthouse/releases/tag/1.5.0)
over on Github. As always,
[hit us up](https://github.com/GoogleChrome/lighthouse/graphs/contributors)
to [report bugs](https://github.com/GoogleChrome/lighthouse/issues), file
feature requests, or brainstorm
[ideas](https://github.com/GoogleChrome/lighthouse/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+bug%22)
on what you'd like to see next.

{% include "comment-widget.html" %}
