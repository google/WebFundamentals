---

layout: update
published: true

collection: updates
category: chrome
product: chrome
type: news
date: 2015-06-10

title: "Help users checkout faster with Autofill"
description: "Help users checkout faster with Autofill. We’ve found that by correctly using autocomplete attributes on your forms, users complete them up to 30% faster!"
article:
  written_on: 2015-06-06
  updated_on: 2015-06-06

authors:
  - greenido
tags:
  - forms
  - autofill
  - monetization
  - mobile
permalink: /updates/2015/06/checkout-faster-with-autofill.html
---

<style type="text/css">
td {
  padding-left: 0.7em;
  padding-right: 0.7em;
  background: rgba(162, 186, 194, 0.58);
}
.highlight .err {
  color: #E28964;
  background-color: #333333;
}
</style>
People hate filling out web forms, especially on mobile devices. They can be 
slow and frustrating to complete and often contain multi-page steps and 
validation issues. This leads to high user drop-off and frustration. To help 
make things easier for users, browsers have long been able to autocomplete 
fields on behalf of the user. Chrome took this a step further in 2011 by 
introducing [Autofill](https://support.google.com/chrome/answer/142893?hl=en), 
which fills in entire forms based on a user's Autofill profile.

Starting in the next major version of Chrome (M43), we're taking yet another 
step to help users fill out forms faster by expanding our support for credit 
cards and addresses in Google. This means that the same information users use to 
purchase things inside of the Google Play store are now available to them on 
websites. By using the standard _autocomplete_ attributes, you can ensure your 
users' happiness by helping Chrome autofill your checkout forms with 100% 
accuracy.

Autocomplete attributes are a way for you, the developer, to control how the 
browser should populate a given form field.  For example, if you are expecting a 
street address you can hint to the browser that you are expecting it by using 
`autocomplete="address-line1"`. This prevents the browser from incorrectly 
guessing form fields on your website which can result in a poor user experience.

We've found that by correctly using autocomplete attributes on your forms, users 
complete them up to 30% faster. And since _autocomplete_ is part of the [WHATWG 
](https://html.spec.whatwg.org/multipage/forms.html#autofill)[HTML](https://html.spec.whatwg.org/multipage/forms.html#autofill) 
standard, we hope that other browsers will support it in the near future.  

<p style="text-align: center;">
  <img src="/web/updates/images/2015-06-05-checkout-faster-with-autofill/autofill-1.gif" alt="autofill git to show the power of fast and easy form filling" style="max-width: 60%; height: auto;">

</p>

In the past, many developers would add _autocomplete="off"_ to their form fields 
to prevent the browser from performing any kind of autocomplete functionality. 
While Chrome will still respect this tag for autocomplete data, it will not 
respect it for autofill data. So when should you use _autocomplete="off"_? One 
example is when you've implemented your own version of autocomplete for search. 
Another example is any form field where users will input and submit different 
kinds of information where it would not be useful to have the browser remember 
what was submitted previously.

The most common _autocomplete_ attributes are shown in the table below and are 
documented in [Web Fundamentals](https://developers.google.com/web/fundamentals/input/?hl=en).

### Common Attributes

#### Credit Card

<table>
<tr>
<td markdown="block">
**name attribute**
</td>
<td markdown="block">
**autocomplete attribute**
</td>
</tr>
<tr>
<td markdown="block">
ccname<br>
cardnumber  
cvc  
ccmonth  
ccyear  
exp-date  
card-type
</td>
<td markdown="block">
cc-name  
cc-number  
cc-csc  
cc-exp-month  
cc-exp-year  
cc-exp  
cc-type
</td>
</tr>
</table>
{% highlight javascript %}
<label for="frmNameCC">Name on card</label>
<input name="ccname" id="frmNameCC" required placeholder="Full Name" autocomplete="cc-name">    

<label for="frmCCNum">Card Number</label>
<input name="cardnumber" id="frmCCNum" required autocomplete="cc-number">    

<label for="frmCCCVC">CVC</label>
<input name="cvc" id="frmCCCVC" required autocomplete="cc-csc"> 
  
<label for="frmCCExp">Expiry</label>
<input name="cc-exp" id="frmCCExp" required placeholder="MM-YYYY" autocomplete="cc-exp">
{% endhighlight %}

#### Name

<table>
<tr>
<td markdown="block">
**name attribute**
</td>
<td markdown="block">
**autocomplete attribute**
</td>
</tr>
<tr>
<td markdown="block">
name  
fname  
mname  
lname
</td>
<td markdown="block">
name (full name)  
given-name (first name)  
additional-name (middle name)  
family-name (last name)
</td>
</tr>
</table>

{% highlight javascript %} 
<label for="frmNameA">Name</label>
<input name="name" id="frmNameA" placeholder="Full name" required autocomplete="name">
{% endhighlight %}
     
#### Email

<table>
<tr>
<td markdown="block">
**name attribute**
</td>
<td markdown="block">
**autocomplete attribute**
</td>
</tr>
<tr>
<td markdown="block">
email
</td>
<td markdown="block">
email
</td>
</tr>
</table>

{% highlight javascript %}
<label for="frmEmailA">Email</label>
<input type="email" name="email" id="frmEmailA" placeholder="name@example.com" required autocomplete="email">

<label for="frmEmailC">Confirm Email</label>
<input type="email" name="emailC" id="frmEmailC" placeholder="name@example.com" required autocomplete="email">
{% endhighlight %}

#### Address

<table>
<tr>
<td markdown="block">
**name attribute**
</td>
<td markdown="block">
**autocomplete attribute**
</td>
</tr>
<tr>
<td markdown="block">
address  
city  
region  
province  
state  
zip  
zip2  
postal  
country
</td>
<td markdown="block">
For one address input: street-address  
For two address inputs: address-line1 , address-line2  
address-level1 (state or province)  
address-level2 (city)  
postal-code (zip code)  
country
</td>
</tr>
</table>

{% highlight javascript %}
<label for="frmAddressS">Address</label>
<input name="ship-address" required id="frmAddressS" placeholder="123 Any Street" autocomplete="shipping street-address">

<label for="frmCityS">City</label>
<input name="ship-city" required id="frmCityS" placeholder="New York" autocomplete="shipping locality">

<label for="frmStateS">State</label>
<input name="ship-state" required id="frmStateS" placeholder="NY" autocomplete="shipping region">

<label for="frmZipS">Zip</label>
<input name="ship-zip" required id="frmZipS" placeholder="10011" autocomplete="shipping postal-code">

<label for="frmCountryS">Country</label>
<input name="ship-country" required id="frmCountryS" placeholder="USA" autocomplete="shipping country">
{% endhighlight %}


#### Phone

<table>
<tr>
<td markdown="block">
**name attribute**
</td>
<td markdown="block">
**autocomplete attribute**
</td>
</tr>
<tr>
<td markdown="block">
phone  
mobile  
country-code  
area-code  
exchange  
suffix  
ext
</td>
<td markdown="block">
tel
</td>
</tr>
</table>

{% highlight javascript %}
<label for="frmPhoneNumA">Phone</label>
<input type="tel" name="phone" id="frmPhoneNumA" placeholder="+1-650-450-1212" required autocomplete="tel">
{% endhighlight %}

   
The autocomplete attributes can be accompanied with a section name, such as:

* **shipping** - given-name
* **billing**  - street-address<br/>

It is recommended because it will make your markup easier to parse and 
understand. The browser will autofill different sections separately and not as a 
continuous form.

### An example of a payment form

{% highlight javascript %}
<label for="frmNameCC">Name on card</label>
<input name="ccname" id="frmNameCC" required placeholder="Full Name" autocomplete="cc-name">

<label for="frmCCNum">Card Number</label>
<input name="cardnumber" id="frmCCNum" required autocomplete="cc-number">

<label for="frmCCCVC">CVC</label>
<input name="cvc" id="frmCCCVC" required autocomplete="cc-csc">
  
<label for="frmCCExp">Expiry</label>
<input name="cc-exp" id="frmCCExp" required placeholder="MM-YYYY" autocomplete="cc-exp">
{% endhighlight %}

**Forms best practices**

1. **Use _labels_on form inputs**, and ensure they're visible when the 
   field is in focus. The label element provides direction to the user, telling 
   them what information is needed in a form element. Each label is associated 
   with an input element by placing it inside the label element. Applying labels 
   to form elements also helps to improve the touch target size: the user can 
   touch either the label or the input in order to place focus on the input 
   element.
1. **Use placeholder to provide guidance** about what you expect. The 
   placeholder attribute provides a hint to the user about what's expected in 
   the input, typically by displaying the value as light text until the the user 
   starts typing in the element. Placeholders disappear as soon as the user 
   starts typing in an element, thus they are not a replacement for labels. They 
   should be used as an aid to help guide users on the required format and 
   content.

### Demo

You can see it in action over at: 
[greenido.github.io/Product-Site-101/form-cc-example.html](https://greenido.github.io/Product-Site-101/form-cc-example.html)  
Or check the code: 
[https://github.com/greenido/Product-Site-101](https://github.com/greenido/Product-Site-101)

<p style="text-align: center;">
    <img src="/web/updates/images/2015-06-05-checkout-faster-with-autofill/autofill-1.gif" alt="An example to a form that use autocomplete tags" style="max-width: 60%; height: auto;" >
</p>

