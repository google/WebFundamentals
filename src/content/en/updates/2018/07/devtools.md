project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: TODO
experiments_path: /web/updates/2018/05/_experiments.yaml

{# wf_updated_on: 2018-07-17 #}
{# wf_published_on: 2018-07-17 #}
{# wf_tags: chrome69,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: TODO #}
{# wf_blink_components: Platform>DevTools #}

# What's New In DevTools (Chrome 69) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: The video version of these release notes will be published around early September 2018.

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
              data-label="{% dynamic print request.path %} (red)" data-value="1">
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
              data-label="{% dynamic print request.path %} (red)" data-value="0">
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
              data-label="{% dynamic print request.path %} (white)" data-value="1">
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
              data-label="{% dynamic print request.path %} (white)" data-value="0">
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

## Try Canary {: #canary }

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
