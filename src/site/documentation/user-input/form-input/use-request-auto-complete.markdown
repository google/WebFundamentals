---
layout: article
title: "Simplify checkout with requestAutocomplete API"
description: "While `requestAutocomplete` was designed to help users fill out any form, today
its most common use is in eCommerce where shopping cart abandonment on the mobile web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>can be as high as 97%</a>."
introduction: "While `requestAutocomplete` was designed to help users fill out any form, today
its most common use is in eCommerce where shopping cart abandonment on the
mobile web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>can be as high as 97%</a>. Imagine 97% of people in a supermarket, with a cart brimming full of things that
they want, flipping their cart over and walking out."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 4
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
collection: form-input
key-takeaways:
  use-request-auto-complete:
    - <code>requestAutocomplete</code> can greatly simplify the checkout process and
      improve the user experience.
    - If <code>requestAutocomplete</code> is available, hide the checkout form and move people
      directly to the confirmation page.
    - Ensure input fields include the appropriate autocomplete attribute.
remember:
  use-placeholders:
    - Placeholders disappear as soon as focus is placed in an element, thus
      they are not a replacement for labels.  They should be used as an aid
      to help guide users on the required format and content.
  recommend-input:
    - Auto-complete only works when the form method is post.
  use-datalist:
    - The <code>datalist</code> values are provided as suggestions, and users
      are not restricted to the suggestions provided.
  provide-real-time-validation:
    - Even with client-side input validation, it is always important to
      validate data on the server to ensure consistency and security in your data.
  show-all-errors:
    - You should show the user all of the issues on the form at once, rather than showing them one at a time.
  request-auto-complete-flow:
    - If you're asking for any kind of personal information or credit card
      data, ensure the page is served via SSL.  Otherwise the dialog will
      warn the user their information may not be secure.
---
{% wrap content %}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  table.inputtypes th:nth-of-type(2) {
    min-width: 270px;
  }

  table.tc-heavyright th:first-of-type {
    width: 30%;
  }
</style>

{% include modules/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

Rather than the site relying on a particular payment provider,
`requestAutocomplete` requests payment details (such as name, address and credit
card information) from the browser, which are optionally stored by the browser
much like other auto-complete fields.

### `requestAutocomplete` flow

The ideal experience will show the `requestAutocomplete` dialog instead of loading the
page that displays the checkout form. If all goes well, the user shouldn't see
the form at all.  You can easily add `requestAutoComplete` to existing forms
without having to change any field names.  Simply add the `autocomplete`
attribute to each form element with the appropriate value and add the
`requestAutocomplete()` function on the form element. The browser will handle
the rest.

<img src="imgs/rac_flow.png" class="center" alt="Request autocomplete flow">

{% include_code _code/rac.html rac javascript %}

The `requestAutocomplete` function on the `form` element indicates to the
browser that it should populate the form.  As a security feature, the function
must be called via a user gesture like a touch or mouse click. A dialog is then
displayed asking the user permission to populate the fields and which details
they want to populate it with.

{% include_code _code/rac.html handlerac javascript %}

Upon completion of `requestAutocomplete`, the function will either fire the
`autocomplete` event if it finished successfully, or `autocompleteerror` if
it was unable to complete the form.  If it completed successfully and the form
validates to your needs, simply submit the form and proceed to the final
confirmation.

{% include modules/remember.liquid title="Remember" list=page.remember.request-auto-complete-flow %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
