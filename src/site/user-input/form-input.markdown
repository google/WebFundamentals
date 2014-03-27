---
layout: article
title: "Forms"
description: ""
article:
  written_on: 2014-01-01
  updated_on: 2014-01-06
  order: 1
collection: user-input
---

Filling out forms on the web has never been exactly fun, and it can be downright 
painful on a mobile device with its on-screen keyboard. Thankfully modern 
browsers help to make this much easier by providing semantic input types and 
helpful validation tools.

When used properly, these features make it significantly easier for users to 
provide the information needed, increasing completion rates, and improving 
accuracy.  But remember, the best form is the one with the fewest inputs.

# Label and name inputs properly

### The importance of labels

The `label` element provides direction to the user, telling them what 
information is needed in a form element.  Each `label` is associated with an 
input element by placing it inside the `label` element, or by using the "`for`" 
attribute.  Applying labels to form elements also helps to improve the touch 
target size: the user can touch either the label or the input in order to place 
focus on the input element.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><label for="myInput">Tell me a secret</label>
<input type="text" id="myInput">
<label>
  <input type="checkbox"> I'm a checkbox
</label></td>
</tr>
</table>

Labels and inputs should be large enough to be easy to press.  In portrait 
viewports, field labels should be above input elements, and beside them in 
landscape.  While it may seem obvious at first, ensure field labels and the 
corresponding input boxes are visible at the same time.  Custom scroll handlers 
may scroll input elements to the top of the page hiding the label, or labels 
placed below input elements may be covered by the virtual keyboard.

### Use placeholders

The placeholder attribute provides a hint to the user about what's expected in 
the input by displaying its value as light text until the element gets focus. 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><label for="frmName">Name</label>
<input type="text" id="frmName" placeholder="Full name"/></td>
</tr>
</table>

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Remember: placeholders disappear as soon as focus is placed in an element, thus they are not a replacement for labels.  They should be used as an aid to help guide users on the required format and content.</td>
</tr>
</table>

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

**Recommended name value**

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Personal</td>
<td>fname, mname, lname, name, birthday, jobtitle</td>
</tr>
<tr>
<td>Email</td>
<td>e-mail</td>
</tr>
<tr>
<td>Address</td>
<td>company, address, city, province, state, region, county, zip, zip2, postal, country</td>
</tr>
<tr>
<td>Phone Number</td>
<td>phone, mobile, country-code, area-code, exchange, suffix, ext</td>
</tr>
<tr>
<td>Credit Card</td>
<td>ccname, cardnumber, cvc, ccmonth, ccyear, exp-date, card-type</td>
</tr>
</table>

[http://goo.gl/P0z52w](http://goo.gl/P0z52w)

**Recommended autocomplete value**

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Personal</td>
<td>name</td>
</tr>
<tr>
<td>Email</td>
<td>email</td>
</tr>
<tr>
<td>Address
Should be prefixed with either billing or shipping</td>
<td>street-address, locality (city), region (state/province), postal-code, country</td>
</tr>
<tr>
<td>Phone Number</td>
<td>tel</td>
</tr>
<tr>
<td>Credit Card</td>
<td>cc-name, cc-number, cc-exp-month, cc-exp-year, cc-exp, cc-csc, cc-type</td>
</tr>
</table>

[http://goo.gl/PqfaJs](http://goo.gl/PqfaJs) 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><label for="frmName">Name</label>
<input type="text" id="frmName" name="name" autocomplete="name"></td>
</tr>
</table>

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Remember: Auto-complete only works when the form method is post.</td>
</tr>
</table>

## The autofocus attribute

On some forms, like the Google home page for example, you want the focus to 
immediately jump to a specific input so that the user can quickly begin using 
the form. While there are JavaScript helpers to do this, they can sometimes be 
annoying when they move focus after you've already started typing. Instead, you 
can use the `autofocus` attribute on an input element to specify that element as 
the primary form element.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><label for="frmName">Name</label>
<input type="text" id="frmName" autofocus name="name" autocomplete="name"></td>
</tr>
</table>

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Note: the autofocus attribute only works on desktop browsers.</td>
</tr>
</table>

## Putting it all together

The form

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Sample code goes here</td>
</tr>
</table>

[Try it](http://jsbin.com/rufuw/1/edit)

# Choose the best input type

Every tap counts. Users appreciate websites that automatically present number 
pads for entering phone numbers, or automatically advance fields as they entered 
them. Look for opportunities to eliminate wasted taps in your forms.

## Choose the best input type

HTML5 introduced a number of new input types. These new input types give hints 
to the browser about what type of keyboard layout to display for on-screen 
keyboards.  Users are more easily able to enter the required information without 
having to change their keyboard and only see the appropriate keys for that input 
type. 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Input type</td>
<td>Description</td>
</tr>
<tr>
<td>url</td>
<td>For entering a URL. It must start with a valid URI scheme, (for example http://, ftp:// or mailto:)</td>
</tr>
<tr>
<td>tel</td>
<td>For entering phone numbers. It does not enforce a particular syntax for validation, so if you want to ensure a particular format, you can use pattern.</td>
</tr>
<tr>
<td>email</td>
<td>For entering email addresses, and hints that the @ should be shown on the keyboard by default. You can add the multiple attribute if more than one email address will be provided.</td>
</tr>
<tr>
<td>search</td>
<td>A text input field styled in a way that is consistent with the platform's search field.</td>
</tr>
<tr>
<td>number</td>
<td>For numeric input, can be any rational integer or float value.</td>
</tr>
<tr>
<td>range</td>
<td>For number input, but unlike the number input type, the value is less important. It is displayed to the user as a slider control.</td>
</tr>
<tr>
<td>datetime-local</td>
<td>For entering a date and time value where the time zone provided is the local time zone.</td>
</tr>
<tr>
<td>date</td>
<td>For entering a date (only) with no time zone provided.</td>
</tr>
<tr>
<td>time</td>
<td>For entering a time (only) with no time zone provided.</td>
</tr>
</table>

* For a full list of new input types, see [the input type 
example.](http://google.com)

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

You can also dynamically generate `datalist`s in JavaScript, not just hard coded 
in the HTML.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Remember: the datalist values are provided as suggestions, and users are not restricted to the suggestions provided.</td>
</tr>
</table>

# Provide real-time validation

Real-time data validation doesn't just help to keep your data clean, but it also 
helps improve the user experience.  Modern browsers have several built-in tools 
to help provide real-time data validation and may prevent the user from 
submitting an invalid form.  Visual cues should be used to indicate whether a 
form has been completed properly.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Remember: Even with client side input validation, it is always important to validate data on the server to ensure consistency and security in your data.</td>
</tr>
</table>

## Using attributes to validate input
### The pattern attribute

The pattern attribute specifies a [regular 
expression](http://en.wikipedia.org/wiki/Regular_expression) used to validate an 
input field. For example, to validate a US Zip code (5 digits, sometimes 
followed by a dash and an additional 4 digits), we would set the pattern like 
this:

<input type="text" id="zip" name="zip" pattern="^\d{5,6}(?:[-\s]\d{4})?$" />

**Common regular expression patterns**

<!-- TODO: Fix formatting of cells -->
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

### The required attribute

If the required attribute is present, then the field must contain a value before 
the form can be submitted. For example, to make the part number in the previous 
example required, we'd simply add the required attribute.

<input type="text" required id="zip" name="zip" 
pattern="^\d{5,6}(?:[-\s]\d{4})?$" />

### The min, max and step attributes

For numeric input types like number or range as well as date/time inputs, you 
can specify the minimum and maximum values, as well as how much they should each 
increment/decrement when adjusted by the slider or spinners.

<input type="number" id="qty" min="0" max="100" step="1" />

### The maxlength attribute

The maxlength attribute can be used to specify the maximum length of an input or 
textbox and is useful when you want to limit the length of information that the 
user can provide. For example, if you want to limit a filename to 12 characters, 
you can use the following.

<input type="text" id="83filename" maxlength="12" />

### The novalidate attribute

In some cases, you may want to allow the user to submit the form even if it 
contains invalid input. To do this, add the novalidate attribute to the form 
element. In this case, all pseudo classes and JavaScript APIs will still allow 
you to check if the form validates.

<form role="form" novalidate>  
  <label for="inpEmail">Email address</label>  
  <input type="email" name="email" id="inpEmail" placeholder="Enter email">  
</form>

## Use JavaScript for more complex real-time validation

When the built-in validation plus regular expressions aren't enough, you can use 
the 
[C](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)[onstraints 
Validation](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)[ 
API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation), 
a powerful tool for handling custom validation.  The API allows you to do things 
like set a custom error, check whether an element is valid, and determine the 
reason that an element is invalid.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>willValidate</td>
<td>Property that returns true or false if the element is a candidate for validation.</td>
</tr>
<tr>
<td>validity</td>
<td>Property that returns a ValidityState object representing the validity states of the element.</td>
</tr>
<tr>
<td>validationMessage</td>
<td>Property that returns a string with the reason the object failed the validation test.</td>
</tr>
<tr>
<td>checkValidity()</td>
<td>Returns true if the element satisfies all of it's constraints, and false otherwise.</td>
</tr>
<tr>
<td>setCustomValidity()</td>
<td>Sets a custom validation message and the customError property of the ValidityState object to true.</td>
</tr>
</table>

One example of where you might use the JavaScript validation APIs is to verify 
that the user has provided the correct email address on a sign up form where 
they're asked to enter it twice. In the blur event for the second input, you 
would call the following check function:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>var elem = document.getElementById("email_addr_confirm");
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
}</td>
</tr>
</table>

Because not all browsers will prevent the user from submitting the form if there 
is invalid data, you should catch the submit event, and use the checkValidity() 
on the form element to determine if the form is valid.  For example:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>form.addEventListener("submit", function(evt) {
  if (form.checkValidity() === false) {
    evt.preventDefault();
    alert("Form is invalid");
    return false;
  }
});</td>
</tr>
</table>

## Show feedback in real-time

HTML5 also introduces a number of new pseudo-classes that can be used to style 
inputs based on their value or attributes, making it easier for users to 
understand if they've filled the form out properly before trying to submit it.

* `:valid` and `:invalid` - explicitly sets the style for an element when the 
  input is valid/invalid.
* `:required` and `:optional` - sets the style for elements that are required or 
  optional.
* `:in-range` and `:out-of-range` - styling for elements that support the min 
  and max attribute

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Best Practice: You should show the user all of the issues on the form at once, rather than showing them one at a time.</td>
</tr>
</table>

Validation happens immediately which means that when the page is loaded, fields 
may be marked as invalid, even though the user hasn't had a chance to fill them 
in yet.  It also means that as the user types, and it's possible they'll see the 
invalid style while typing. To prevent this, you can combine the CSS with 
JavaScript to only show invalid styling when the user has visited the field.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><style type="text/css">
  input.dirty:not(:focus):invalid { outline: 2px solid red; }
</style>
<script type="text/javascript">
  $("input").bind("blur invalid", function(evt) {
    $(this).addClass('dirty');
  });
</script></td>
</tr>
</table>

## Putting it all together

The form

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>code sample here</td>
</tr>
</table>

The JavaScript

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>code sample here</td>
</tr>
</table>

[Try it](http://jsbin.com/kehiz/1/edit)

# Simplify checkout with requestAutocomplete

While `requestAutocomplete` was designed to help users fill out any form, today 
it's most common use is in eCommerce where shopping cart abandonment on the 
mobile web [can be as high as 
97%](http://seewhy.com/blog/2012/10/10/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/). 
Imagine that in the real world. Imagine 97% of people in a supermarket, with a 
cart brimming full of things that they want, flipping their cart over and 
walking out.

Rather than the site relying on a particular payment provider, 
`requestAutocomplete` requests payment details (such as name, address and credit 
card information) from the browser, which are optionally stored by the browser 
much like other auto-complete fields.

## requestAutocomplete flow

Ideally you want to show the `requestAutocomplete` dialog instead of loading the 
page that displays the checkout form. If all goes well, the user shouldn't see 
the form at all.  
<img src="image00.png" width="598" height="933" />

## Design your form to enable requestAutocomplete

You can easily add `requestAutoComplete` to existing forms without having to 
change any field names.  Simply add the 
[`autocomplete`](#heading=h.c6olq7fah9m)[ attribute](#heading=h.c6olq7fah9m) to 
each form element with the appropriate value, and the browser will handle the 
rest.

## The requestAutocomplete function

The `requestAutocomplete` function on the `form` element indicates to the 
browser that it should populate the form.  As a security feature, the function 
must be called via a user gesture like a touch or mouse click, a dialog is then 
displayed asking the user permission to populate the fields and which details 
they want to populate it with.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Remember: If you're asking for any kind of personal information or credit card data, ensure the page is served via SSL.  Otherwise the dialog will warn the user their information may not be secure.</td>
</tr>
</table>

## Putting it all together

The form

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>code sample here</td>
</tr>
</table>

The JavaScript

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>code sample here</td>
</tr>
</table>

[Try it](http://jsbin.com/migod/edit)