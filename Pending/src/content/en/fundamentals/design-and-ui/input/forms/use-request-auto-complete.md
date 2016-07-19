


<h2>requestAutocomplete is being deprecated and should not be implemented.</h2>
<p>We recommend instead annotating your checkout form fields with autocomplete attributes to <a href="https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill">leverage autofill.</a>
</p>

---
<p class="intro">
  While <code>requestAutocomplete</code> was designed to help users fill out any form, today its most common use is in eCommerce where shopping cart abandonment on the mobile web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>can be as high as 97%</a>. Imagine 97% of people in a supermarket, with a cart brimming full of things that they want, flipping their cart over and walking out.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

Rather than the site relying on a particular payment provider,
`requestAutocomplete` requests payment details (such as name, address and credit
card information) from the browser, which are optionally stored by the browser
much like other auto-complete fields.

{% ytvideo ljYeHwGgzQk %}

### `requestAutocomplete` flow

The ideal experience will show the `requestAutocomplete` dialog instead of loading the
page that displays the checkout form. If all goes well, the user shouldn't see
the form at all.  You can easily add `requestAutocomplete` to existing forms
without having to change any field names.  Simply add the `autocomplete`
attribute to each form element with the appropriate value and add the
`requestAutocomplete()` function on the form element. The browser will handle
the rest.

<img src="imgs/rac_flow.png" class="center" alt="Request autocomplete flow">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

The `requestAutocomplete` function on the `form` element indicates to the
browser that it should populate the form.  As a security feature, the function
must be called via a user gesture like a touch or mouse click. A dialog is then
displayed asking the user permission to populate the fields and which details
they want to populate it with.

{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

Upon completion of `requestAutocomplete`, the function will either fire the
`autocomplete` event if it finished successfully, or `autocompleteerror` if
it was unable to complete the form.  If it completed successfully and the form
validates to your needs, simply submit the form and proceed to the final
confirmation.

{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}





