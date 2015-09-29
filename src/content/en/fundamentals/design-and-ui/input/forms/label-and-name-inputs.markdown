---
layout: shared/narrow
title: "Label and name inputs properly"
description: "Forms are hard to fill out on mobile. The best forms are the ones with the fewest inputs."
published_on: 2014-04-30
updated_on: 2015-03-27
order: 3
authors:
  - petelepage
translation_priority: 0
key-takeaways:
  label-and-name:
    - "Always use <code>label</code>s on form inputs, and ensure they're visible when the field is in focus."
    - "Use <code>placeholder</code>s to provide guidance about what you expect."
    - "To help the browser auto-complete the form, use established <code>name</code>'s for elements and include the <code>autocomplete</code> attribute."
notes:
  use-placeholders:
    - "Placeholders disappear as soon as the user starts typing in an element, thus they are not a replacement for labels.  They should be used as an aid to help guide users on the required format and content."
  recommend-input:
    - "Use either only <code>street-address</code> or both <code>address-line1</code> and <code>address-line2</code>"
    - "<code>address-level1</code> and <code>address-level2</code> are only necessary if they're required for your address format."
  use-datalist:
    - "The <code>datalist</code> values are provided as suggestions, and users are not restricted to the suggestions provided."
  provide-real-time-validation:
    - "Even with client-side input validation, it is always important to validate data on the server to ensure consistency and security in your data."
  show-all-errors:
    - "You should show the user all of the issues on the form at once, rather than showing them one at a time."
  request-auto-complete-flow:
    - "If you're asking for any kind of personal information or credit card data, ensure the page is served via SSL. Otherwise the dialog will warn the user their information may not be secure."
comments:
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  Forms are hard to fill out on mobile. The best forms are the ones with the fewest inputs. Good forms provide semantic input types. Keys should change to match the user's input type; users pick a date in a calendar. Keep your user informed. Validation tools should tell the user what they need to do before submitting the form.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

## The importance of labels

The `label` element provides direction to the user, telling them what
information is needed in a form element.  Each `label` is associated with an
input element by placing it inside the `label` element, or by using the "`for`"
attribute.  Applying labels to form elements also helps to improve the touch
target size: the user can touch either the label or the input in order to place
focus on the input element.

{% include_code src=_code/order.html snippet=labels %}

## Label sizing and placement

Labels and inputs should be large enough to be easy to press.  In portrait
viewports, field labels should be above input elements, and beside them in
landscape.  Ensure field labels and the corresponding input boxes are visible at
the same time.  Be careful with custom scroll handlers that may scroll input
elements to the top of the page hiding the label, or labels placed below input
elements may be covered by the virtual keyboard.

## Use placeholders

The placeholder attribute provides a hint to the user about what's expected in
the input, typically by displaying the value as light text until the the user
starts typing in the element.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

## Use metadata to enable auto-complete

Users appreciate when websites save them time by automatically filling common
fields like names, email addresses and other frequently used fields, plus it
helps to reduce potential input errors -- especially on virtual keyboards and
small devices.

Browsers use many heuristics to determine which fields they can
[auto-populate](https://support.google.com/chrome/answer/142893) [based on
previously specified data by the
user](https://support.google.com/chrome/answer/142893), and you can give hints
to the browser by providing both the name attribute and the autocomplete
attribute on each input element.

For example, to hint to the browser that it should auto-complete the form with
the users name, email address and phone number, you should use:

{% include_code src=_code/order.html snippet=autocomplete %}


## Recommended input `name` and `autocomplete` attribute values

`autocomplete` attribute values are part of the current [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill). The most commonly used `autocomplete` attributes are shown below.

The `autocomplete` attributes can be accompanied with a section name, such as **`shipping `**`given-name` or **`billing `**`street-address`. The browser will auto-complete different sections separately, and not as a continuous form.

<table class="mdl-data-table mdl-js-data-table">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="Content type">Content type</th>
      <th data-th="name attribute"><code>name</code> attribute</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> attribute</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">Name</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (full name)</li>
          <li><code>given-name</code> (first name)</li>
          <li><code>additional-name</code> (middle name)</li>
          <li><code>family-name</code> (last name)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Email</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Address</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>For one address input:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>For two address inputs:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (state or province)</li>
          <li><code>address-level2</code> (city)</li>
          <li><code>postal-code</code> (zip code)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Phone</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Credit Card</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Usernames</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Passwords</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code> (for sign-in forms)</li>
          <li><code>new-password</code> (for sign-up and password-change forms)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% include shared/remember.liquid title="Remember" list=page.remember.recommend-input %}

## The `autofocus` attribute

On some forms, for example the Google home page where the only thing you want
the user to do is fill out a particular field, you can add the `autofocus`
attribute.  When set, desktop browsers immediately move the focus to the input
field, making it easy for users to quickly begin using the form.  Mobile
browsers ignore the `autofocus` attribute, to prevent the keyboard from randomly
appearing.

Be careful using the autofocus attribute because it will steal keyboard focus
and potentially preventing the backspace character from being used for
navigation.

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


