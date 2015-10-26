---
layout: shared/narrow
title: "Form entry"
description: "Whether it’s making a purchase, getting a quote or joining an email list, your user’s conversion experience should be as seamless as possible."
authors:
  - petelepage
published_on: 2014-09-17
updated_on: 2015-09-17
order: 4
translation_priority: 1
---

<p class="intro">
Provide a seamless, frictionless conversion experience with usable forms.
</p>

{% include shared/toc.liquid %}

## 14. Streamline information entry

Automatically advance to the next field when a user presses Return. In general, the less taps the user must perform, the better.

## 15. Choose the simplest input

Use the most [appropriate input type](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type) for each scenario. Use elements like [`datalist`](/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist) to provide suggested values for a field.

## 16. Provide visual calendar for date selection

Clearly label start and end dates. Users should not need to leave a site and check a calendar app just to schedule a date.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/forms-calendar-good.png">
    <figcaption class="wf-figcaption-good">Do: use calendar widgets when possible.</figcaption>
  </figure>
</div>

## 17. Minimize form errors with labeling and real-time validation

Label inputs properly and validate input in real-time.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/forms-multipart-good.png">
    <figcaption class="wf-figcaption-good">Do: prepopulate content where possible.</figcaption>
  </figure>
</div>

## 18. Design efficient forms

Take advantage of [autofill](/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs#use-metadata-to-enable-auto-complete) so that users can easily complete forms with pre-populated data. Pre-fill fields with information you already know. For example, when retrieving shipping and billing addresses, try to use [`requestAutocomplete`](/web/fundamentals/design-and-ui/input/forms/use-request-auto-complete) or enable users to copy their shipping address to their billing address (or vice versa). 

