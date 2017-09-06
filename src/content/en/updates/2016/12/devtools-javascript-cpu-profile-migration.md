project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Now that "Record JavaScript CPU Profile" has been removed from Chrome 57, here's how to profile your JS in DevTools.

{# wf_updated_on: 2016-12-15 #}
{# wf_published_on: 2016-12-15 #}
{# wf_tags: devtools, chrome57 #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet:  Now that "Record JavaScript CPU Profile" has been removed from Chrome 57, here's how to profile your JS in DevTools. #} 

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Chrome DevTools: JavaScript CPU Profiling in Chrome 57 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

In Chrome 57, which is currently Canary, the Timeline panel has been renamed
to the Performance panel, the Profiles panel has been
renamed to the Memory panel, and the Record JavaScript CPU Profile feature
on the Profiles panel has been removed.

Have no fear, you can still profile your JavaScript from the Performance
panel. In fact, that's why the Record JavaScript CPU Profile feature was
removed. The workflows and layouts are a little different, but the
Performance panel provides all of the same information as the old workflow,
and then some.

This little migration guide shows you how to record a JS profile in the 
Performance panel, and how the Performance panel's UI maps to the old
workflow that you're used to.

## How to record a JS profile {: #record }

1. Open DevTools.
1. Click the **Performance** tab.

     <figure>
       <img src="/web/updates/images/2016/12/js-perf-profile.png"
         alt="The Chrome DevTools Performance panel">
       <figcaption><b>Figure 1</b>. The Performance panel.</figcaption>
     </figure>

1. Record in one of the following ways:

     * To profile a page load, click **Record Page Load**.
       DevTools automatically starts the recording and then automatically
       stops when it detects that the page has finished loading.
     * To profile a running page, click **Record**, perform the actions that
       you want to profile, and then click **Stop** when you're finished.

## How the old workflow maps to the new {: #mind-map }

From the **Chart** view of the old workflow, the screenshot below shows
you the position of the CPU usage overview chart (top arrow) and the 
flame chart (bottom arrow) in the new workflow.

<figure>
  <img src="/web/updates/images/2016/12/flame-map.png"
    alt="Mapping between flame chart in old workflow and new workflow.">
  <figcaption>
    <b>Figure 2</b>. Mapping between flame chart in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>

The **Heavy (Bottom Up)** view is available in the **Bottom-Up** tab:

<figure>
  <img src="/web/updates/images/2016/12/bottom-up-map.png"
    alt="Mapping betwen Bottom-Up view in old workflow and new workflow.">
  <figcaption>
    <b>Figure 3</b>. Mapping between Bottom-Up view in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>

And the **Tree (Top Down)** view is available in the **Call Tree** tab:

<figure>
  <img src="/web/updates/images/2016/12/tree-map.png"
    alt="Mapping betwen Tree view in old workflow and new workflow.">
  <figcaption>
    <b>Figure 4</b>. Mapping between Tree view in old workflow (left) and
    new workflow (right).
  </figcaption>
</figure>

## Feedback {: #feedback }

How was this article? Great? Terrible? Let us know by answering the questions
below.

{% framebox width="auto" height="auto" %}

<p>
  Did this article adequately explain how the old workflow maps to the new
  workflow?
</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS CPU Profile Migration"
        data-label="Helpful / Yes">Yes</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS CPU Profile Migration"
        data-label="Helpful / No">No</button>

<p>
  Are there any features from the old workflow missing in this article?
</p>

<button class="gc-analytics-event"
        data-category="DevTools / JS CPU Profile Migration"
        data-label="Missing Features / Yes">Yes</button>

<button class="gc-analytics-event"
        data-category="DevTools / JS CPU Profile Migration"
        data-label="Missing Features / No">No</button>

{% endframebox %}

Ping [@ChromeDevTools](https://twitter.com/chromedevtools) on Twitter or
[open a GitHub issue][GH] on our docs repo if we missed any features, or if you
have any other questions about this article.

[GH]: https://github.com/google/WebFundamentals/issues/new?title=[DevTools%20CPU%20Profile%20Migration]
