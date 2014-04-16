---
layout: article
title: "Create amazing forms"
description: "Forms are hard to fill out on mobile. The best forms are the ones with the 
fewest inputs."
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: user-input
key-takeaways:
  label-and-name:
    - Always use labels on form inputs, and ensure they're visible when 
      the field is in focus.
    - Use placeholders to provide guidance about what you expect.
    - To help the browser auto-complete the form, use established name's 
      for elements and include the autocomplete attribute.
  choose-best-input-type:
    - Choose the most appropriate input type for your data to simplify input.
    - Offer suggestions as the user types with the datalist element.
  provide-real-time-validation:
    - Leverage the browser's built-in validation attributes like `pattern`, `required`, 
      `min`, `max`, etc.
    - Use JavaScript and the Constraints Validation API for more complex validation requirements.
    - Show validation errors in real time, and if the user tries to submit an 
      invalid form, show all fields they need to fix.
  use-request-auto-complete:
    - requestAutocomplete can greatly simplify the checkout process and 
      improve the user experience.
    - If requestAutocomplete is available, hide the checkout form and move people
      directly to the confirmation page.
    - Ensure input fields include the appropriate autocomplete attribute.
remember:
  use-placeholders:
    - Placeholders disappear as soon as focus is placed in an
      element, thus they are not a replacement for labels.  They should be used 
      as an aid to help guide users on the required format and content.
  recommend-input:
    - Auto-complete only works when the form method is post.
  use-datalist:
    - The `datalist` values are provided as suggestions, and users are not restricted to
      the suggestions provided.
  provide-real-time-validation:
    - Even with client-side input validation, it is always important to validate data on
      the server to ensure consistency and security in your data.
  request-auto-complete-flow:
    - If you're asking for any kind of personal information or credit card data, 
      ensure the page is served via SSL.  Otherwise the dialog will warn the user
      their information may not be secure.
---


Most of the samples will be based off 
[https://petelepage.com/scratch/form-ac.html](https://petelepage.com/scratch/form-ac.html) 
which integrates all of the items discussed in the doc below.



Forms are hard to fill out on mobile. The best forms are the ones with the 
fewest inputs. Good forms provide semantic input types. Keys should change to 
match the user's input type; users pick a date in a calendar. Keep your user 
informed. Validation tools should tell the user what they need to do before 
submitting the form.

# Label and name inputs properly

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.label-and-name %}

### The importance of labels

The `label` element provides direction to the user, telling them what 
information is needed in a form element.  Each `label` is associated with an 
input element by placing it inside the `label` element, or by using the "`for`" 
attribute.  Applying labels to form elements also helps to improve the touch 
target size: the user can touch either the label or the input in order to place 
focus on the input element.

    <label for="myInput">Tell me a secret</label>
    <input type="text" id="myInput">
    <label>
      <input type="checkbox"> I'm a checkbox
    </label>

### Label sizing and placement

Labels and inputs should be large enough to be easy to press.  In portrait 
viewports, field labels should be above input elements, and beside them in 
landscape.  Ensure field labels and the corresponding input boxes are visible at 
the same time.  Be careful with custom scroll handlers that may scroll input 
elements to the top of the page hiding the label, or labels placed below input 
elements may be covered by the virtual keyboard.

### Use placeholders

The placeholder attribute provides a hint to the user about what's expected in 
the input by displaying its value as light text until the element gets focus. 

    <label for="frmName">Name</label>
    <input type="text" id="frmName" placeholder="Full name"/>


{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.use-placeholders %}

### Use metadata to enable auto-complete

Users appreciate when websites save them time by automatically filling common 
fields like names, email addresses and other frequently used fields, plus it 
helps to reduce potential input errors -- especially on virtual keyboards and 
small devices.

Browsers use many heuristics to determine which fields they can 
[auto-populate](https://support.google.com/chrome/answer/142893)[ based on 
previously specified data by the 
user](https://support.google.com/chrome/answer/142893), and you can give hints 
to the browser by providing both the name attribute and the autocomplete 
attribute on each input element.

For example, to hint to the browser that it should auto-complete the form with 
the users name and phone number, you should use:

    <label for="frmName">Name</label>
    <input type="text" id="frmName" name="name" autocomplete="name">
    <label for="frmPhone">Phone Number</label>
    <input type="tel" id="frmPhone" name="phone" autocomplete="shipping tel">

### Recommended input name and autocomplete attribute values

<table>
<tr>
<td>Content</td>
<td>`name` attribute</td>
<td>`autocomplete` attribute
Note: the `autocomplete` attributes should be prefixed with either shipping or billing, depending on the context.</td>
</tr>
<tr>
<td>Name</td>
<td>name
fname, mname, lname</td>
<td>name</td>
</tr>
<tr>
<td>Email</td>
<td>email</td>
<td>email</td>
</tr>
<tr>
<td>Address</td>
<td>address
city
region, province, state
zip, zip2, postal
country</td>
<td>street-address
locality
region
postal-code
country</td>
</tr>
<tr>
<td>Phone</td>
<td>phone
mobile
country-code
area-code
exchange
suffix
ext</td>
<td>tel</td>
</tr>
<tr>
<td>Credit Card</td>
<td>ccname
cardnumber
cvc
ccmonth
ccyear
exp-date
card-type</td>
<td>cc-name
cc-number
cc-csc
cc-exp-month
cc-exp-year
cc-exp
cc-type</td>
</tr>
</table>

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.recommend-input %}

## The autofocus attribute

On some forms, for example the Google home page where the only thing you want 
the user to do is fill out a particular field, you can add the `autofocus` 
attribute.  When set, desktop browsers immediately move the focus to the input 
field, making it easy for users to quickly begin using the form.  Mobile 
browsers ignore the `autofocus` attribute, to prevent the keyboard from randomly 
appearing.

Be careful using the autofocus attribute because it will steal keyboard focus 
and potentially preventing the backspace character from being used for 
navigation.

    <label for="frmName">Name</label>
    <input type="text" id="frmName" autofocus name="name" autocomplete="name">

## Putting it all together

The form

    ```sample code

[Try it](http://jsbin.com/rufuw/1/edit)

# Choose the best input type

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.choose-best-input-type %}

Every tap counts. Users appreciate websites that automatically present number 
pads for entering phone numbers, or automatically advance fields as they entered 
them. Look for opportunities to eliminate wasted taps in your forms.

## HTML5 input types

HTML5 introduced a number of new input types. These new input types give hints 
to the browser about what type of keyboard layout to display for on-screen 
keyboards.  Users are more easily able to enter the required information without 
having to change their keyboard and only see the appropriate keys for that input 
type. 

<table>
<tr>
<td>Input type</td>
<td>Typical Keyboard</td>
</tr>
<tr>
<td>url
For entering a URL. It must start with a valid URI scheme, for example http://, ftp:// or mailto:. </td>
<td></td>
</tr>
<tr>
<td>tel
For entering phone numbers. It does not enforce a particular syntax for validation, so if you want to ensure a particular format, you can use pattern.</td>
<td></td>
</tr>
<tr>
<td>email
For entering email addresses, and hints that the @ should be shown on the keyboard by default. You can add the multiple attribute if more than one email address will be provided.</td>
<td></td>
</tr>
<tr>
<td>search
A text input field styled in a way that is consistent with the platform's search field.</td>
<td></td>
</tr>
<tr>
<td>number
For numeric input, can be any rational integer or float value.</td>
<td></td>
</tr>
<tr>
<td>range
For number input, but unlike the number input type, the value is less important. It is displayed to the user as a slider control.</td>
<td></td>
</tr>
<tr>
<td>datetime-local
For entering a date and time value where the time zone provided is the local time zone.</td>
<td></td>
</tr>
<tr>
<td>date
For entering a date (only) with no time zone provided.</td>
<td></td>
</tr>
<tr>
<td>time
For entering a time (only) with no time zone provided.</td>
<td></td>
</tr>
<tr>
<td>week
For entering a week (only) with no time zone provided.</td>
<td></td>
</tr>
<tr>
<td>month
For entering a month (only) with no time zone provided.</td>
<td></td>
</tr>
<tr>
<td>color
For picking a color.</td>
<td></td>
</tr>
</table>

## Offer suggestions during input with datalist

The `datalist` element isn't an input type, but a list of suggested input values 
to associated with a form field. It lets the browser suggest autocomplete 
options as the user types. Unlike select elements where users must scan long 
lists to find the value they're looking for, and limiting them only to those 
lists, `datalist`s provide hints as the user types.

    <label for="inpChocType">Chocolates</label>  
    <input type="text" id="inpChocType" list="chocType">  
    <datalist id="chocType">  
      <option value="white" />  
      <option value="milk" />  
      <option value="dark" />  
    </datalist>

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.use-datalist %}

# Provide real-time validation

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.provide-real-time-validation %}

Real-time data validation doesn't just help to keep your data clean, but it also 
helps improve the user experience.  Modern browsers have several built-in tools 
to help provide real-time data validation and may prevent the user from 
submitting an invalid form.  Visual cues should be used to indicate whether a 
form has been completed properly.

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.provide-real-time-validation %}

## Use these attributes to validate input

### The pattern attribute

The `pattern` attribute specifies a [regular 
expression](http://en.wikipedia.org/wiki/Regular_expression) used to validate an 
input field. For example, to validate a US Zip code (5 digits, sometimes 
followed by a dash and an additional 4 digits), we would set the `pattern` like 
this:

    <input type="text" id="zip" name="zip" pattern="^\d{5,6}(?:[-\s]\d{4})?$" />

**Common regular expression patterns**

<table>
<tr>
<td>Description</td>
<td>Regular Expression</td>
</tr>
<tr>
<td>Postal address</td>
<td>[a-zA-Z\d\s\-\,\#\.\+]+</td>
</tr>
<tr>
<td>Zip Code (US)</td>
<td>^\d{5,6}(?:[-\s]\d{4})?$</td>
</tr>
<tr>
<td>IP Address</td>
<td>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</td>
</tr>
<tr>
<td>Credit Card Number</td>
<td>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</td>
</tr>
<tr>
<td>Social Security Number</td>
<td>^\d{3}-\d{2}-\d{4}$</td>
</tr>
<tr>
<td>North American Phone Number</td>
<td>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</td>
</tr>
</table>

### The `required` attribute

If the `required` attribute is present, then the field must contain a value before 
the form can be submitted. For example, to make the zip code required, we'd 
simply add the required attribute:

    <input type="text" required id="zip" name="zip" pattern="^\d{5,6}(?:[-\s]\d{4})?$" />

### The `min`, `max` and `step` attributes

For numeric input types like number or range as well as date/time inputs, you 
can specify the minimum and maximum values, as well as how much they should each 
increment/decrement when adjusted by the slider or spinners.  For example, a 
shoe size input would set a minumum size of 1 and a maximum size 13, with a step 
of 0.5

    <input type="number" id="frmShoeSize" name="shoeSize" min="1" max="13" step="0.5" />

### The `maxlength` attribute

The `maxlength` attribute can be used to specify the maximum length of an input or 
textbox and is useful when you want to limit the length of information that the 
user can provide. For example, if you want to limit a filename to 12 characters, 
you can use the following.

    <input type="text" id="83filename" maxlength="12" />

### The `novalidate` attribute

In some cases, you may want to allow the user to submit the form even if it 
contains invalid input. To do this, add the `novalidate` attribute to the form 
element, or individual input fields. In this case, all pseudo classes and 
JavaScript APIs will still allow you to check if the form validates.

    <form role="form" novalidate>  
      <label for="inpEmail">Email address</label>  
      <input type="email" name="email" id="inpEmail" placeholder="Enter email">  
    </form>

## Use JavaScript for more complex real-time validation

When the built-in validation plus regular expressions aren't enough, you can use 
the 
[Constrains Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation), 
a powerful tool for handling custom validation.  The API allows you to do things 
like set a custom error, check whether an element is valid, and determine the 
reason that an element is invalid:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>API property</td>
<td>Description</td>
</tr>
<tr>
<td>`setCustomValidity()`</td>
<td>Sets a custom validation message and the customError property of the ValidityState object to true.</td>
</tr>
<tr>
<td>`validationMessage`</td>
<td>Returns a string with the reason the input failed the validation test.</td>
</tr>
<tr>
<td>`checkValidity()`</td>
<td>Returns true if the element satisfies all of it's constraints, and false otherwise.</td>
</tr>
<tr>
<td>`validity`</td>
<td>Returns a ValidityState object representing the validity states of the element.</td>
</tr>
</table>

### Set custom validation messages

If a field fails validation, use `setCustomValidity()` to mark the field invalid 
and explain why the field didn't validate.  For example, a sign up form might 
ask the user to confirm their email address by entering it twice.  Use the blur 
event on the second input to validate the two inputs and set the appropriate 
response.  For example:

    var elem = document.getElementById("email_addr_confirm");
    elem.addEventListener("blur", verifyEmail);
    function verifyEmail(input) {
      input = input.srcElement;
      if (input.value != document.getElementById('email_addr').value) {
        // the provided value doesn't match the primary email address
        input.setCustomValidity('The two email addresses must match.');
      } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
      }
    }

### Prevent form submission on invalid forms

Because not all browsers will prevent the user from submitting the form if there 
is invalid data, you should catch the submit event, and use the `checkValidity()`
on the form element to determine if the form is valid.  For example:

    form.addEventListener("submit", function(evt) {
      if (form.checkValidity() === false) {
        evt.preventDefault();
        alert("Form is invalid - do something here");
        return false;
      }
    });

## Show feedback in real-time

It's helpful to provide a visual indication on each field that indicates whether 
the user has completed the form properly before they've submitted the form.  
HTML5 also introduces a number of new pseudo-classes that can be used to style 
inputs based on their value or attributes.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Pseudo-class</td>
<td>Use</td>
</tr>
<tr>
<td>:valid</td>
<td>Explicitly sets the style for an input to be used when the value meets all of the validation requirements.</td>
</tr>
<tr>
<td>:invalid</td>
<td>Explicitly sets the style for an input to be used when the value does not meet all of the validation requirements.</td>
</tr>
<tr>
<td>:required</td>
<td>Explicitly sets the style for an input element that has the required attribute set.</td>
</tr>
<tr>
<td>:optional</td>
<td>Explicitly sets the style for an input element that does not have the required attribute set.</td>
</tr>
<tr>
<td>:in-range</td>
<td>Explicitly sets the style for a number input element where the value is in range.</td>
</tr>
<tr>
<td>:out-of-range</td>
<td>Explicitly sets the style for a number input element where the value is out of range.</td>
</tr>
</table>

Validation happens immediately which means that when the page is loaded, fields 
may be marked as invalid, even though the user hasn't had a chance to fill them 
in yet.  It also means that as the user types, and it's possible they'll see the 
invalid style while typing. To prevent this, you can combine the CSS with 
JavaScript to only show invalid styling when the user has visited the field.

    <style type="text/css">
      input.dirty:not(:focus):invalid { background-color: pink; }
    </style>
    <script type="text/javascript">
      function initInputs() {
        var inputs = document.getElementsByTagName("input");
        var inputs_len = inputs.length;
        var addDirtyClass = function(evt) {
          evt.srcElement.classList.toggle("dirty", true);
        };
        for (var i = 0; i < inputs_len; i++) {
          var input = inputs[i];
          input.addEventListener("blur", addDirtyClass);
          input.addEventListener("invalid", addDirtyClass);
        }
      }
      initInputs();
    </script>



<div class="notes"><b>Best Practice:</b> You should show the user all of the issues on the form at once, rather than showing them one at a time.</div>

## Putting it all together

The form

    ```code sample here

The JavaScript

    ```code sample here

[Try it](http://jsbin.com/kehiz/1/edit)

# Simplify checkout with requestAutocomplete

{% include modules/highlight.liquid title="Key Takeaway" type="learning" list=page.key-takeaways.use-request-auto-complete %}

While `requestAutocomplete` was designed to help users fill out any form, today 
it's most common use is in eCommerce where shopping cart abandonment on the 
mobile web [can be as high as 
97%](http://seewhy.com/blog/2012/10/10/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/). 
Imagine 97% of people in a supermarket, with a cart brimming full of things that 
they want, flipping their cart over and walking out.

Rather than the site relying on a particular payment provider, 
`requestAutocomplete` requests payment details (such as name, address and credit 
card information) from the browser, which are optionally stored by the browser 
much like other auto-complete fields.

## requestAutocomplete flow

Ideally you want to show the `requestAutocomplete` dialog instead of loading the 
page that displays the checkout form. If all goes well, the user shouldn't see 
the form at all.  You can easily add `requestAutoComplete` to existing forms 
without having to change any field names.  Simply add the `autocomplete` 
attribute to each form element with the appropriate value and add the 
`requestAutocomplete()` function on the form element. The browser will handle 
the rest.  

<img src="imgs/rac-flow.png" />

The `requestAutocomplete` function on the `form` element indicates to the 
browser that it should populate the form.  As a security feature, the function 
must be called via a user gesture like a touch or mouse click. A dialog is then 
displayed asking the user permission to populate the fields and which details 
they want to populate it with.

{% include modules/highlight.liquid title="Remember" type="remember" list=page.remember.request-auto-complete-flow %}

## Putting it all together

The form

    ```code sample

The JavaScript

    ```code sample

[Try it](http://jsbin.com/migod/edit)

