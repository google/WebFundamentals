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
</style>

# Chrome DevTools: What Happened To "Record JavaScript CPU Profile"? {: .page-title }

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
1. Set the performance profile to **JavaScript**.

     ![JS Performance Profile][js-profile]

You can record in two ways:

* To profile a page load, press <kbd>Command</kbd>+<kbd>R</kbd> (Mac) or
  <kbd>Control</kbd>+<kbd>R</kbd> (Windows, Linux) to reload the page.
  DevTools automatically starts the recording and then automatically
  stops when it detects that the page has finished loading.
* To profile a running page, press **Record**
  ![Record][record]{:.devtools-inline}, perform the actions that you want
  to profile, and then click **Record** again when you're finished.

[js-profile]: /web/updates/images/2016/12/js-perf-profile.png
[record]: /web/updates/images/2016/12/record.png

## How the old workflow maps to the new {: #mind-map }

From the **Chart** view of the old workflow, the screenshot below shows
you the position of the CPU usage overview chart (top arrow) and the 
flame chart (bottom arrow) in the new workflow.

![Chart view mapping][chart]

[chart]: /web/updates/images/2016/12/flame-map.png

The **Bottom Up** view is available in the **Bottom-Up** tab:

![Bottom-up view mapping][bottom]

[bottom]: /web/updates/images/2016/12/bottom-up-map.png

And the **Tree** view is available in the **Call Tree** tab:

![Tree view mapping][tree]

[tree]: /web/updates/images/2016/12/tree-map.png

## Feedback {: #feedback }

How was this article? Great? Terrible? Let us know by answering the questions
below.

{% framebox %}

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
