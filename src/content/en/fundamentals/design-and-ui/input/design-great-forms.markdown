---
layout: shared/plain
title: "Design great forms"
description: "TODO"
written_on: 2014-04-30
updated_on: 2015-03-27
authors:
  - petelepage
translation_priority: 0
key-takeaways:
  design-great-forms:
    - "Use existing data to pre-populate fields and be sure to enable auto-fill."
    - "Use clearly-labeled progress bars to help users get through multi-part forms."
    - "Provide visual calendar so users don’t have to leave your site and jump to the calendar app on their smartphones."
  choose-best-input-type:
    - "Choose the most appropriate input type for your data to simplify input."
    - "Offer suggestions as the user types with the <code>datalist</code> element."
  label-and-name:
    - "Always use <code>label</code>s on form inputs, and ensure they're visible when the field is in focus."
    - "Use <code>placeholder</code>s to provide guidance about what you expect."
    - "To help the browser auto-complete the form, use established <code>name</code>'s for elements and include the <code>autocomplete</code> attribute."
notes:
  use-placeholders:
    - "Placeholders disappear as soon as focus is placed in an element, thus they are not a replacement for labels.  They should be used as an aid to help guide users on the required format and content."
  recommend-input:
    - "Auto-complete only works when the form method is post."
  use-datalist:
    - "The <code>datalist</code> values are provided as suggestions, and users are not restricted to the suggestions provided."
shortlinks: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---

<p class="intro">
  Design efficient forms by avoiding repeated actions, asking for only the 
  necessary information and guide users by showing them how far along they are 
  in multi-part forms.
</p>

{% include shared/toc.liquid %}

## Best practices

### Minimize repeated actions and fields

Make sure your forms have no repeated actions, only as many fields as 
necessary, and take advantage of 
[autofill](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete),
so that users can easily complete forms with pre-populated data.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    On the Progressive.com website, users are asked first for their ZIP code, which is then pre-populated into the next part of the form.
  </figcaption>
</figure>

Look for opportunities to pre-fill information you already know, or may 
anticipated to save the user from having to provide it.  For example, 
pre-populate the shipping address with the last shipping address supplied by 
the user.

### Show users how far along they are

Progress bars and menus should accurately convey overall progress through 
multi-step forms and processes.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    Use clearly-labeled progress bars to help users get through multi-part forms.
  </figcaption>
</figure>

If you place a disproportionately complex form in an earlier step, users 
are more likely to abandon your site before they go through the entire process. 


### Provide visual calendars when selecting dates

Users often need more context when scheduling appointments and travel dates, 
to make things easier and prevent them from leaving your site to check their 
calendar app, provide a visual calendar with clear labeling for selecting 
start and end dates. 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Hotel website with easy to use calendar">
  <figcaption>
    Hotel booking website with easy to use calendar widget for picking dates.
  </figcaption>
</figure>

## Choose the best input type

HTML5 introduced a number of new input types. These new input types give hints
to the browser about what type of keyboard layout to display for on-screen
keyboards.  Users are more easily able to enter the required information without
having to change their keyboard and only see the appropriate keys for that input
type.

<table class="table-2 inputtypes">
  <thead>
    <tr>
      <th data-th="Input type">Input <code>type</code></th>
      <th data-th="Typical keyboard">Typical Keyboard</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> For entering a URL. It must start with a valid URI scheme,
        for example <code>http://</code>, <code>ftp://</code> or <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>For entering phone numbers. It does <b>not</b>
        enforce a particular syntax for validation, so if you want to ensure
        a particular format, you can use pattern.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>For entering email addresses, and hints that
        the @ should be shown on the keyboard by default. You can add the
        multiple attribute if more than one email address will be provided.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>A text input field styled in a way that is
        consistent with the platform's search field.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>For numeric input, can be any rational
        integer or float value.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>For number input, but unlike the number input
        type, the value is less important. It is displayed to the user as a
        slider control.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>For entering a date and time value
        where the time zone provided is the local time zone.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>For entering a date (only) with no time zone
        provided.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>For entering a time (only) with no time zone
        provided.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>For entering a week (only) with no time zone
        provided.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>For entering a month (only) with no time zone
        provided.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>For picking a color.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### Offer suggestions during input with datalist

The `datalist` element isn't an input type, but a list of suggested input values
to associated with a form field. It lets the browser suggest autocomplete
options as the user types. Unlike select elements where users must scan long
lists to find the value they're looking for, and limiting them only to those
lists, `datalist` element provides hints as the user types.

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}

## Label and name inputs properly

The `label` element provides direction to the user, telling them what
information is needed in a form element.  Each `label` is associated with an
input element by placing it inside the `label` element, or by using the "`for`"
attribute.  Applying labels to form elements also helps to improve the touch
target size: the user can touch either the label or the input in order to place
focus on the input element.

{% include_code src=_code/order.html snippet=labels %}

### Label sizing and placement

Labels and inputs should be large enough to be easy to press.  In portrait
viewports, field labels should be above input elements, and beside them in
landscape.  Ensure field labels and the corresponding input boxes are visible at
the same time.  Be careful with custom scroll handlers that may scroll input
elements to the top of the page hiding the label, or labels placed below input
elements may be covered by the virtual keyboard.

### Use placeholders

The placeholder attribute provides a hint to the user about what's expected in
the input, typically by displaying the value as light text until the the user
starts typing in the element.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### Use metadata to enable auto-complete

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


### Recommended input `name` and `autocomplete` attribute values

<style>
  table td { padding: 13px 26px; }
  table ul { padding: 13px 0; }
</style>

`autocomplete` attribute values are part of the current [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill). The most commonly used `autocomplete` attributes are shown below.

The `autocomplete` attributes can be accompanied with a section name, such as **`shipping `**`given-name` or **`billing `**`street-address`. The browser will auto-complete different sections separately, and not as a continuous form.

<table class="table-3 autocompletes">
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

{% include shared/remember.liquid title="Remember" list=page.notes.recommend-input %}

### The `autofocus` attribute

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
