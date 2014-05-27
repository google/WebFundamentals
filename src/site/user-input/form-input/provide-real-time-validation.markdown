---
layout: article
title: "Provide real-time validation"
description: "Real-time data validation doesn't just help to keep your data clean, but it also
helps improve the user experience.  Modern browsers have several built-in tools
to help provide real-time data validation and may prevent the user from
submitting an invalid form.  Visual cues should be used to indicate whether a
form has been completed properly."
introduction: "Real-time data validation doesn't just help to keep your data clean, but it also
helps improve the user experience.  Modern browsers have several built-in tools
to help provide real-time data validation and may prevent the user from
submitting an invalid form.  Visual cues should be used to indicate whether a
form has been completed properly."
article:
  written_on: 2014-04-30
  updated_on: 2014-04-30
  order: 3
rel:
  gplusauthor: https://plus.google.com/+PeteLePage
collection: form-input
key-takeaways:
  provide-real-time-validation:
    - Leverage the browser's built-in validation attributes like
      <code>pattern</code>, <code>required</code>, <code>min</code>,
      <code>max</code>, etc.
    - Use JavaScript and the Constraints Validation API for more complex
      validation requirements.
    - Show validation errors in real time, and if the user tries to submit an
      invalid form, show all fields they need to fix.
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
  table.inputtypes th:nth-of-type(2) {
    min-width: 270px;
  }

  table.tc-heavyright th:first-of-type {
    width: 30%;
  }
</style>

{% include modules/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### Use these attributes to validate input

#### The `pattern` attribute

The `pattern` attribute specifies a [regular
expression](http://en.wikipedia.org/wiki/Regular_expression) used to validate an
input field. For example, to validate a US Zip code (5 digits, sometimes
followed by a dash and an additional 4 digits), we would set the `pattern` like
this:

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### Common regular expression patterns

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="Description">Description</th>
      <th data-th="Regular expression">Regular expression</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">Postal address</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">Zip Code (US)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP Address</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Credit Card Number</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Social Security Number</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">North American Phone Number</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### The `required` attribute

If the `required` attribute is present, then the field must contain a value before
the form can be submitted. For example, to make the zip code required, we'd
simply add the required attribute:

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### The `min`, `max` and `step` attributes

For numeric input types like number or range as well as date/time inputs, you
can specify the minimum and maximum values, as well as how much they should each
increment/decrement when adjusted by the slider or spinners.  For example, a
shoe size input would set a minumum size of 1 and a maximum size 13, with a step
of 0.5

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### The `maxlength` attribute

The `maxlength` attribute can be used to specify the maximum length of an input or
textbox and is useful when you want to limit the length of information that the
user can provide. For example, if you want to limit a filename to 12 characters,
you can use the following.

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### The `novalidate` attribute

In some cases, you may want to allow the user to submit the form even if it
contains invalid input. To do this, add the `novalidate` attribute to the form
element, or individual input fields. In this case, all pseudo classes and
JavaScript APIs will still allow you to check if the form validates.

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include modules/remember.liquid title="Remember" list=page.remember.provide-real-time-validation %}

### Use JavaScript for more complex real-time validation

When the built-in validation plus regular expressions aren't enough, you can use
the [Constrains Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
a powerful tool for handling custom validation.  The API allows you to do things
like set a custom error, check whether an element is valid, and determine the
reason that an element is invalid:

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Sets a custom validation message and the <code>customError</code> property of the <code>ValidityState</code> object to <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Returns a string with the reason the input failed the validation test.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Returns <code>true</code> if the element satisfies all of it's constraints, and <code>false</code> otherwise.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Returns a <code>ValidityState</code> object representing the validity states of the element.</td>
    </tr>
  </tbody>
</table>

#### Set custom validation messages

If a field fails validation, use `setCustomValidity()` to mark the field invalid
and explain why the field didn't validate.  For example, a sign up form might
ask the user to confirm their email address by entering it twice.  Use the blur
event on the second input to validate the two inputs and set the appropriate
response.  For example:

{% include_code _code/order.html customvalidation javascript %}

#### Prevent form submission on invalid forms

Because not all browsers will prevent the user from submitting the form if there
is invalid data, you should catch the submit event, and use the `checkValidity()`
on the form element to determine if the form is valid.  For example:

{% include_code _code/order.html preventsubmission javascript %}

### Show feedback in real-time

It's helpful to provide a visual indication on each field that indicates whether
the user has completed the form properly before they've submitted the form.
HTML5 also introduces a number of new pseudo-classes that can be used to style
inputs based on their value or attributes.

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="Pseudo-class">Pseudo-class</th>
      <th data-th="Use">Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Explicitly sets the style for an input to be used when the value meets all of the validation requirements.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Explicitly sets the style for an input to be used when the value does not meet all of the validation requirements.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Explicitly sets the style for an input element that has the required attribute set.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Explicitly sets the style for an input element that does not have the required attribute set.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Explicitly sets the style for a number input element where the value is in range.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Explicitly sets the style for a number input element where the value is out of range.</td>
    </tr>
  </tbody>
</table>

Validation happens immediately which means that when the page is loaded, fields
may be marked as invalid, even though the user hasn't had a chance to fill them
in yet.  It also means that as the user types, and it's possible they'll see the
invalid style while typing. To prevent this, you can combine the CSS with
JavaScript to only show invalid styling when the user has visited the field.

{% include_code _code/order.html invalidstyle css %}
{% include_code _code/order.html initinputs javascript %}

{% include modules/remember.liquid title="Important" list=page.remember.show-all-errors %}

{% include modules/nextarticle.liquid %}

{% endwrap %}
