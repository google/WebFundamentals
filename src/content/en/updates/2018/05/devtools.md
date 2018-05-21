project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO
experiments_path: /web/updates/2018/05/_experiments.yaml

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-05-21 #}
{# wf_tags: chrome68,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 68) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around late July 2018.

New to DevTools in Chrome 68:

* TODO

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## More previews and autocompletion in the Console {: #console }

### Eager Evaluation {: #eagerevaluation }

When you type an expression in the Console, the Console can now show a preview of the result of
that expression below your cursor.

<figure>
  <img src="/web/updates/images/2018/05/eagereval.png"
       alt="The Console is printing the result of the sort() operation before it has been
            explicitly executed."/>
  <figcaption>
    <b>Figure X</b>. The Console is printing the result of the <code>sort()</code> operation
    before it has been explicitly executed
  </figcaption>
</figure>

To enable Eager Evaluation:

1. Open the **Console**.
1. Open **Console Settings** ![Console
   Settings](/web/updates/images/2018/05/settings.png){:.inline-icon}.
1. Enable the **Eager evaluation** checkbox.

DevTools does not eager evaluate if the expression causes [side effects][SE]{:.external}.

[SE]: https://stackoverflow.com/a/8129277/1669860

### Argument hints {: #hints }

As you're typing out functions, the Console now shows you the arguments that the function
expects.

<figure>
  <img src="/web/updates/images/2018/05/arghints.png"
       alt="TODO"/>
  <figcaption>
    <b>Figure X</b>. TODO
  </figcaption>
</figure>

### Autocomplete after function executions {: #autocomplete }

Note: This feature depends on [Eager Evaluation](#eagerevaluation), which needs to be enabled
from **Console Settings**.

Thanks to the work around eager evaluation, the Console also can now show you which properties
and functions are available after you call a function.

<figure>
  <img src="/web/updates/images/2018/05/autocomplete.png"
       alt="TODO"/>
  <figcaption>
    <b>Figure X</b>. TODO
  </figcaption>
</figure>

### ES2017 keywords in Console {: #keywords }

## Faster, more reliable audits, a new UI, and new audits {: #lh3 }

### Faster, more reliable audits {: #lantern }

Chrome 68 ships with Lighthouse 3.0. Lighthouse 3.0 has a new internal auditing engine, codenamed
Lantern, which completes your audits faster, and with less variance between runs.

### New UI {: #ui }

Lighthouse 3.0 also brings a new UI, thanks to a collaboration between the Lighthouse and
Chrome UX (Research & Design) teams.

### New audits {: #audits }

## BigInt support {: #bigint }

Chrome 68 supports a new numeric primitive called [`BigInt`][BigInt]. `BigInt` lets you represent
integers with arbitrary precision. Try it out in the Console:

<figure>
  <img src="/web/updates/images/2018/05/bigint.png"
       alt="An example of BigInt in the Console."/>
  <figcaption>
    <b>Figure X</b>. An example of <code>BigInt</code> in the Console
  </figcaption>
</figure>

[BigInt]: /web/updates/2018/05/bigint

## Add property path to watch {: #watch }

While paused on a breakpoint, right-click a property in the Scope pane and select
**Add property path to watch** to add that property to the Watch pane.

<figure>
  <img src="/web/updates/images/2018/05/watch.png"
       alt="An example of Add property path to watch."/>
  <figcaption>
    <b>Figure X</b>. An example of <b>Add property path to watch</b>
  </figcaption>
</figure>

Thanks to PhistucK for the contribution.

## "Show timestamps" moved to settings {: #timestamps }

To make room for the new **Eager evaluation** checkbox in **Console Settings**, the **Show
timestamps** checkbox has moved to [Settings](/web/tools/chrome-devtools/ui#settings).

## Feedback {: #feedback }

TODO test A/B widgets on staging

<style>
  #quickstart-feedback-question {
    margin: 1em 0;
    position: relative;
  }
  #quickstart-feedback-question section.expandable {
    position: static;
  }
</style>

Was this page helpful?

{% dynamic if experiments.feedback.red %}
  <div id="quickstart-feedback-question">
    <section class="expandable">
      <button class="button button-red button-primary expand-control gc-analytics-event"
              data-category="Helpful"
              data-label="{% dynamic print request.path %}" data-value="1">
        Yes
      </button>
      <aside id="quickstart-feedback-success" class="success">
        Great! Thank you for the feedback. Please use the feedback channels below to tell us what's working, or
        how we can improve.
      </aside>
    </section>
    <section class="expandable">
      <button class="button button-red button-primary expand-control gc-analytics-event"
              data-category="Helpful" data-action="Feedback"
              data-label="{% dynamic print request.path %}" data-value="0">
        No
      </button>
      <aside id="quickstart-feedback-failure" class="warning">
        Sorry to hear that. Please use the feedback channels below to tell us how we can improve.
      </aside>
    </section>
  </div>
{% dynamic elif experiments.feedback.white %}
  <div id="quickstart-feedback-question">
    <section class="expandable">
      <button class="button button-white button-primary expand-control gc-analytics-event"
              data-category="Helpful"
              data-label="{% dynamic print request.path %}" data-value="1">
        Yes
      </button>
      <aside id="quickstart-feedback-success" class="success">
        Great! Thank you for the feedback. Please use the feedback channels below to tell us what's working, or
        how we can improve.
      </aside>
    </section>
    <section class="expandable">
      <button class="button button-white button-primary expand-control gc-analytics-event"
              data-category="Helpful" data-action="Feedback"
              data-label="{% dynamic print request.path %}" data-value="0">
        No
      </button>
      <aside id="quickstart-feedback-failure" class="warning">
        Sorry to hear that. Please use the feedback channels below to tell us how we can improve.
      </aside>
    </section>
  </div>
{% dynamic endif %}

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

If you're on Mac or Windows, please consider using [Chrome Canary][canary] as your default
development browser. If you report a bug or a change that you don't like while it's still in
Canary, the DevTools team can address your feedback significantly faster.

Note: Canary is the bleeding-edge version of Chrome. It's released as soon as its built, without
testing. This means that Canary breaks from time-to-time, about once-a-month, and it's usually
fixed within a day. You can go back to using Chrome Stable while Canary is broken.

[canary]: https://www.google.com/chrome/browser/canary.html

## Previous release notes {: #links }

See the [devtools-whatsnew][tag] tag for links to all previous DevTools
release notes.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}
