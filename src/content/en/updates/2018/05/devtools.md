project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Eager evaluation, argument hints, function autocompletion, Lighthouse 3.0, and more.
experiments_path: /web/updates/2018/05/_experiments.yaml

{# wf_updated_on: 2018-06-01 #}
{# wf_published_on: 2018-05-21 #}
{# wf_tags: chrome68,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Eager evaluation, argument hints, function autocompletion, Lighthouse 3.0, and more. #}
{# wf_blink_components: Platform>DevTools #}

[settings]: /web/updates/images/2018/05/settings.png

# What's New In DevTools (Chrome 68) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around late July 2018.

New to DevTools in Chrome 68:

* [Eager Evaluation](#eagerevaluation). As you type expressions, the Console previews
  the result.
* [Argument hints](#hints). As you type functions, the Console shows you the expected arguments
  for that function.
* [Function autocompletion](#autocomplete). After typing a function call such as
  `document.querySelector('p')`, the Console shows you the the functions and properties that
  the return value supports.
* [ES2017 keywords in the Console](#keywords). Keywords such as `await` are now available in the
  Console's autocomplete UI.
* [Lighthouse 3.0 in the Audits panel](#lh3). Faster, more consistent audits, a new UI, and
  new audits.
* [`BigInt` support](#bigint). Try out JavaScript's new arbitrary-precision integer in the
  Console.
* [Adding property paths to the Watch pane](#watch). Add properties from the Scope pane to
  the Watch pane.
* ["Show timestamps" moved to Settings](#timestamps).

Note: Check what version of Chrome you're running at `chrome://version`. If you're running
an earlier version, these features won't exist. If you're running a later version, these features
may have changed. Chrome auto-updates to a new major version about every 6 weeks.

## Assistive Console {: #console }

Chrome 68 ships with a few new Console features related to autocompletion and previewing.

### Eager Evaluation {: #eagerevaluation }

When you type an expression in the Console, the Console can now show a preview of the result of
that expression below your cursor.

<figure>
  <img src="/web/updates/images/2018/05/eagereval.png"
       alt="The Console is printing the result of the sort() operation before it has been
            explicitly executed."/>
  <figcaption>
    <b>Figure 1</b>. The Console is printing the result of the <code>sort()</code> operation
    before it has been explicitly executed
  </figcaption>
</figure>

To enable Eager Evaluation:

1. Open the **Console**.
1. Open **Console Settings** ![Console
   Settings][settings]{:.inline-icon}.
1. Enable the **Eager evaluation** checkbox.

DevTools does not eager evaluate if the expression causes [side effects][SE]{:.external}.

[SE]: https://stackoverflow.com/a/8129277/1669860

### Argument hints {: #hints }

As you're typing out functions, the Console now shows you the arguments that the function
expects.

<figure>
  <img src="/web/updates/images/2018/05/arghints.png"
       alt="Argument hints in the Console."/>
  <figcaption>
    <b>Figure 2</b>. Various examples of argument hints in the Console
  </figcaption>
</figure>

Notes:

* A question mark before an arg, such as `?options`, represents an
  [optional][optional]{:.external} arg.
* An ellipsis before an arg, such as `...items`, represents a [spread][spread]{:.external}.
* Some functions, such as `CSS.supports()`, accept multiple argument signatures. 

[optional]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
[spread]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax 

### Autocomplete after function executions {: #autocomplete }

Note: This feature depends on [Eager Evaluation](#eagerevaluation), which needs to be enabled
from **Console Settings** ![Console Settings][settings]{:.inline-icon}.

After enabling Eager Evaluation, the Console now also shows you which which properties and
functions are available after you type out a function.

<figure>
  <img src="/web/updates/images/2018/05/autocomplete.png"
       alt="After running document.querySelector('p'), the Console can now show you the available
            properties and functions for that element."/>
  <figcaption>
    <b>Figure 3</b>. The top screenshot represents the old behavior, and the bottom screenshot
    represents the new behavior that supports function autocompletion
  </figcaption>
</figure>

### ES2017 keywords in autocomplete {: #keywords }

ES2017 keywords, such as `await`, are now available in the Console's autocomplete UI.

<figure>
  <img src="/web/updates/images/2018/05/await.png"
       alt="The Console now suggests 'await' in its autocomplete UI."/>
  <figcaption>
    <b>Figure 4</b>. The Console now suggests <code>await</code> in its autocomplete UI
  </figcaption>
</figure>

## Faster, more reliable audits, a new UI, and new audits {: #lh3 }

Chrome 68 ships with Lighthouse 3.0. The next sections are a roundup of some of the biggest
changes. See [Announcing Lighthouse 3.0][LH3] for the full story.

[LH3]: /web/updates/2018/05/lighthouse3

### Faster, more reliable audits {: #lantern }

Lighthouse 3.0 has a new internal auditing engine, codenamed Lantern, which completes your
audits faster, and with less variance between runs.

### New UI {: #ui }

Lighthouse 3.0 also brings a new UI, thanks to a collaboration between the Lighthouse and
Chrome UX (Research & Design) teams.

<figure>
  <img src="/web/updates/images/2018/05/lighthouse3.png"
       alt="The new report UI in Lighthouse 3.0."/>
  <figcaption>
    <b>Figure 5</b>. The new report UI in Lighthouse 3.0
  </figcaption>
</figure>

### New audits {: #audits }

Lighthouse 3.0 also ships with 4 new audits:

* First Contentful Paint
* robots.txt is not valid
* Use video formats for animated content
* Avoid multiple, costly round trips to any origin

## BigInt support {: #bigint }

Note: This isn't a DevTools features per se, but it is a new JavaScript capability that you
can try out in the Console.

Chrome 68 supports a new numeric primitive called [`BigInt`][BigInt]. `BigInt` lets you represent
integers with arbitrary precision. Try it out in the Console:

<figure>
  <img src="/web/updates/images/2018/05/bigint.png"
       alt="An example of BigInt in the Console."/>
  <figcaption>
    <b>Figure 6</b>. An example of <code>BigInt</code> in the Console
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
    <b>Figure 7</b>. An example of <b>Add property path to watch</b>
  </figcaption>
</figure>

## "Show timestamps" moved to settings {: #timestamps }

The **Show timestamps** checkbox previously in **Console Settings**
![Console Settings][settings]{:.inline-icon} has moved
[Settings](/web/tools/chrome-devtools/ui#settings).

## Feedback {: #feedback }

<style>
  .wndt-feedback {
    display: inline;
    margin: 1em;
  }
  #quickstart-feedback-question {
    margin: 1em 0;
    position: relative;
  }
  #quickstart-feedback-question section.expandable {
    position: static;
    display: inline;
  }
</style>

Was this page helpful?

{% dynamic if experiments.feedback.red %}
  <div id="quickstart-feedback-question">
    <section class="expandable">
      <button class="wndt-feedback button button-primary expand-control gc-analytics-event"
              style="background-color: #f44336"
              data-category="Helpful"
              data-label="{% dynamic print request.path %}" data-value="1">
        Yes
      </button>
      <aside id="quickstart-feedback-success" class="success">
        Great! Thank you for the feedback. Please use the feedback channels below to tell us what we're
        doing well, or how we can improve.
      </aside>
    </section>
    <section class="expandable">
      <button class="wndt-feedback button button-primary expand-control gc-analytics-event"
              style="background-color: #f44336"
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
      <button class="wndt-feedback button button-blue expand-control gc-analytics-event"
              data-category="Helpful"
              data-label="{% dynamic print request.path %}" data-value="1">
        Yes
      </button>
      <aside id="quickstart-feedback-success" class="success">
        Great! Thank you for the feedback. Please use the feedback channels below to tell us what we're
        doing well, or how we can improve.
      </aside>
    </section>
    <section class="expandable">
      <button class="wndt-feedback button button-blue expand-control gc-analytics-event"
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
