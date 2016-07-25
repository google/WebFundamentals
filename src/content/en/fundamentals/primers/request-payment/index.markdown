---
layout: shared/narrow
title: "RequestPayment"
description: "Promises simplify deferred and asynchronous computations. A promise represents an operation that hasn't completed yet."
published_on: 2016-07-25
updated_on: 2016-07-25
authors:
  - agektmr
  - dgash
  - zkoch
translation_priority: 0
order: 5
notes:
  may_change: PaymentRequest is still in development. While we think it’s stable enough to implement, it may continue to change. We’ll keep this page updated to always reflect the current status of the API.
  autocomplete: You can learn more about how to leverage autofill and ensure it works every time on your site [in this doc](https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill).
---

# Payment Request API Integration Guide
An API for fast, easy payments on the web

{% include shared/note.liquid list=page.notes.may_change %}

# Introduction to the Payment Request API
Buying goods online is a convenient but often frustrating experience, particularly on mobile devices. Although mobile traffic continues to increase, mobile conversions account for only about a third of all completed purchases. In other words, users abandon mobile purchases twice as often as desktop purchases. Why?

![](https://lh3.googleusercontent.com/kW8HRCgmN52WVfOhe0hnCG-NqB-s9ADnvDyFvsHebo9dsSXlhBkgxDVMPNQqgUKaXNp6__tSdsd1lxFo-6EkyH2LiVKCfrp3nmIaHNLJayou8enElP2nFct3xnfrLXrLEbCQL6j7)

Why users abandon mobile purchase forms

Online purchase forms are user-intensive, difficult to use, slow to load and refresh, and require multiple steps to complete. This is because two primary components of online payments -- security and convenience -- often work at cross-purposes; more of one typically means less of the other.

Most of the problems that lead to abandonment can be directly traced to purchase forms. Each app or site has its own data entry and validation process, and users often find they must enter the same information at every app's purchase point. Also, application developers struggle to create purchase flows that support multiple unique payment methods; even small differences in payment method requirements can complicate the form completion and submission process.

Any system that improves or solves one or more of those problems is a welcome change.

## Autofill: A Partial Solution
Chrome Autofill is a step in the right direction. Autofill allows users to pre-save payment information such as credit card numbers and addresses into the Chrome browser, where it can be synchronized across devices for subsequent use. For users, this means not having to re-enter data repeatedly; for developers, it means not having to change their apps to implement the improvement; for businesses, it can mean an increase in conversions.

Autofill is thus automatic and convenient, and solves, or at least ameliorates, the first two problems with forms.

![](https://lh6.googleusercontent.com/pQ4pdAaE7RSevbxdvDN1c7Xs8V6Are_G01HDaO88_MLM7KL552tmG81906aFLdFUEdqPrvcYce1Jha1TATtcY9Scj1x7YPfBU4Dswf04RpWfda89KELb8ArEudKFRa1-jh65UeF1)![](https://lh6.googleusercontent.com/1EIvRbeBERzCyUuEc60u7JL3uEPNULsNE2WqQwMgNxbQR3l_mi9dRT6sOfvrCiK3OuenWz1maqjGGvu8s6BK3sHCne30L2ODFGLpaxv1zzTMajQIBN370iMuac6lFBnmZFhDjdn6)

Autofill partial example

However, Chrome Autofill is not perfect. It is still tied to forms, and cannot solve the other problems associated with using them: lack of speed and number of steps. It is also a Chrome-only solution and, although other browsers may have their own implementations of similar autofill-like features, each is browser-specific and thus cannot identically improve the UX for users of other browsers. In the end, users still have to deal with forms, if only to check their accuracy before submitting.


{% include shared/note.liquid list=page.notes.autocomplete %}


A new, more robust solution is needed to address all of the forms issues simultaneously: the Payment Request API.

# Introducing the Payment Request API
The Payment Request API is a system that is meant to eliminate checkout forms entirely. It vastly improves user workflow during the purchase process, providing a more consistent user experience and enabling web merchants to easily leverage disparate payment methods. The Payment Request API is not a new payment method, nor does it integrate directly with payment processors; rather, it is a process layer whose goals are:


* To let the browser act as intermediary among merchants, users, and payment methods
* To standardize the payment communication flow as much as possible
* To seamlessly support different secure payment methods
* To work on any browser, device, or platform -- mobile or otherwise


The Payment Request API is an open and cross-browser standard that replaces traditional checkout flows by allowing merchants to request and accept any payment in a single API call. The PaymentRequest API allows the web page to exchange information with the user agent while the user is providing input, before approving or denying a payment request.

## Payment Transaction Process
Using the Payment Request API, the transaction process is made as seamless as possible for both users and merchants.

![Screen Shot 2016-07-15 at 11.44.24.png](https://lh6.googleusercontent.com/bNHSbeC_C06FREHrfnMz__GuCX5T_cwbe6RyjA5bSawfRE3rU_oWUjB7YSOH8i5zj8hWrejmIEDT8f9ZWujS9GbiNUXnfO-k42nliD0SfkeSs5JeXQHBFQ6bqnukuMaeb7FIMCLt)

The payment transaction process

The process begins when the merchant site creates a new PaymentRequest and passes to the browser all the information required to make the purchase: the amount to be charged, what currency they expect payment in, and what payment methods are accepted by the site. The browser determines compatibility between the accepted payment methods for the site and the methods the user has installed on the target device.

The browser then presents the payments UI to the user, who selects a payment method and authorizes the transaction. A payment method can be as straightforward as a credit card that is already stored by the browser, or as esoteric as third-party application written specifically to deliver payments to the site (this functionality is coming soon). After the user authorizes the transaction, all the necessary payment details are sent directly back to the site. For example, for a credit card payment, the site will get back a card number, a cardholder name, an expiration date, and a CVC).

PaymentRequest can also be extended to return additional information, such as shipping addresses and options, payer email, and payer phone. This allows you to get all the information you need to finalize a payment without ever showing the user a checkout form.

![](https://lh6.googleusercontent.com/IEqfE5HZnjYkgzKfbJrMTN68_jWTqsQMfTp96wEBDl_2DIiU2Gteqvs0AvaH3_AJu_e4HC_aI7cFsLJwJdj2FHmvlUY-O8ETZNFHVcTYUoHjrcoQx_NqehsPa-1lPCdo6N3bLorI)

Payment Request interface

The beauty of the new process is threefold: from the user's perspective, all the previously tedious interaction -- request, authorization, payment, and result -- now takes place in a single step; from the web site's perspective, it requires only a single JavaScript API call; from the payment method's perspective, there is no process change whatsoever.

# Using the Payment Request API

## Create a Payment Request
The first step is to create a [PaymentRequest](https://www.w3.org/TR/payment-request/#paymentrequest-interface) object by calling the [PaymentRequest](https://www.w3.org/TR/payment-request/#paymentrequest-constructor) constructor. This step is typically (but not always) associated with a user-initiated action indicating their intent to make a purchase. The object is constructed using parameters that contain required data.


{% highlight javascript %}
var request = new PaymentRequest(
  methodData, // required payment method data
  details,    // required information about transaction
  options     // optional parameter for things like shipping, etc.
);
{% endhighlight %}

PaymentRequest constructor

### The methodData Parameter
The methodData parameter contains a list of supported payment methods. This sequence contains PaymentMethodData dictionaries, including standard identifiers that are associated with the payment methods the app intends to accept, and any payment method-specific data. See [Payment Request API Architecture](https://w3c.github.io/browser-payment-api/specs/architecture.html) for more details.

Right now, PaymentRequest in Chrome only supports the following standard credit cards: 'amex', 'diners', 'discover', 'jcb', 'maestro', 'mastercard', 'unionpay', and 'visa'.

{% highlight javascript %}
var methodData = [
  {
    supportedMethods: ["visa", "mastercard"]
  }
]
{% endhighlight %}

Payment methods & data

### The details Parameter
The details parameter contains information about the transaction. There are two major components: a total, which reflects the total amount and currency to be charged, and an optional set of displayItems that indicate how the final amount was calculated. This parameter is not intended to be a line-item list, but is rather a summary of the order's major components: subtotal, discounts, tax, shipping costs, total due, etc.

It is important to note that the Payment Request API does not do arithmetic. That is, it does not and cannot ensure that the display components correctly sum to the total amount due. These calculations are the developer's responsibility.
![](https://lh6.googleusercontent.com/-VufhMfCPgMNPVB__aUj2rvkurDOQv73mGsSycCPYxo7We-nZPOzGNDfbnSWKeqULP2xFHekDvO7unTTFMfYUm9-wrMxtYtK9lxwO6y9Ay0-4A6OdbEZ--DaGxIsxcQnNnQ2a9Ha)

The browser will render the labels as you define them and automatically render the correct currency formatting based on the user’s locale. Note that the labels should be rendered in the same language as your content.

{% highlight javascript %}
var details = {
  displayItems: [
    {
      label: "Original donation amount",
      amount: { currency: "USD", value : "65.00" }, // US$65.00
    },
    {
      label: "Friends and family discount",
      amount: { currency: "USD", value : "-5.00" }, // -US$5.00
    }
  ],
  total:  {
    label: "Total due",
    amount: { currency: "USD", value : "60.00" }, // US$60.00
  }
}
{% endhighlight %}

Transaction details

Currency identifiers used in the details are specified in the [Currency Codes - ISO 4217](http://www.iso.org/iso/home/standards/currency_codes.htm) documentation.

Repeated or calculated values used in the details can be specified either as string literals or as individual string variables.

{% highlight javascript %}
var currency = "USD";
var amount = "65.00";
var discount = "-10.00";
var total = "55.00";
{% endhighlight %}

PaymentRequest variables

## Activate the PaymentRequest
![](https://lh6.googleusercontent.com/jl_9pGEZFfwlXhMrBkJPDS7JJKM_-MpU6AX_Fv7jPxaVLx0KLh7X-RhxDLVvI3yffizXkcNHPt02EOeZD3IHFM7zbSnKnYfBQ-mAJQA162HUaGsLuiFyDHTJFcqBwnxXzDr6TQI7)

Activate the PaymentRequest interface by calling its [show](https://www.w3.org/TR/payment-request/#show) method. This method invokes a native UI that allows the user to examine the details of the purchase. A [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (indicated by its then method and callback function) that resolves will be returned when the user accepts or rejects the payment request.

{% highlight javascript %}
payment.show().then(function(paymentResponse) {
  // Process paymentResponse here
  paymentResponse.complete("success");
}).catch(function(err) {
  console.error("Uh oh, something bad happened", err.message);
});
{% endhighlight %}

PaymentRequest show method

## Abort a PaymentRequest
You can intentionally abort a PaymentRequest by calling its [abort](https://www.w3.org/TR/payment-request/#abort) method. Use this method if the app needs to cancel the payment request after the show method has been called but before the promise has been resolved -- for example, if an item is no longer available, or the user fails to confirm the purchase within an allotted amount of time.

If you abort a request, you’ll need to create a new instance of PaymentRequest before you can call show again.

{% highlight javascript %}
payment.abort();
{% endhighlight %}

PaymentRequest abort method

## Process the PaymentResponse
Upon a user approval for a payment request, the [show](https://www.w3.org/TR/payment-request/#show) method's promise resolves, resulting in a PaymentResponse object.

A PaymentResponse has the following fields:

`methodName`: A string indicating what the chosen payment method is (e.g., visa)  
`details`: A dictionary containing information for methodName  
`shippingAddress`: The shipping address of the user, if requested  
`shippingOption`: The ID of the selected shipping option, if requested  
`payerEmail`: The email address of the payer, if requested  
`payerPhone`: The phone number of the payer, if requested

For credit card payments, the response is standardized. For non-credit card payments (e.g., Android Pay), the response will be documented by the provider. A credit card response contains the following dictionary:  

`cardholderName`  
`cardholderNumber`  
`expiryMonth`  
`expiryYear`  
`cardSecurityCode`  
`billingAddress`

After payment information is received, the app should submit the payment information to your payment processor for processing. The UI will show a spinner while the request takes place. When a response has come back, the app should call complete to close the UI.

{% highlight javascript %}
payment.show().then(paymentResponse => {
  var paymentData = {
    // payment method string, e.g. “visa”
    method: paymentResponse.methodName,
    // payment details as you requested
    details: paymentResponse.details
  };
  return fetch('/pay', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(paymentData)
  }).then(res => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw 'Payment Error';
    }
  }).then(res => {
    paymentResponse.complete("success");
  }, err => {
    paymentResponse.complete("fail");
  });
}).catch(err => {
  console.error("Uh oh, something bad happened", err.message);
});
{% endhighlight %}


![](https://lh5.googleusercontent.com/IISA5pbdGIHLlILIjZYhC2tQ0IiizJ5WEw7jmspDxrn6de64THLAQHRfqxoyNc0H2KYbZ-YaB2z6eN6g5YF8hWrjykuVJtMCEE5VIwZ5FthVcQtIiyfivKcH-kkWAX1DJvvn_3Kt)

The [complete](https://www.w3.org/TR/payment-request/#complete) method tells the user agent that the user interaction is over and allows the app to notify the user of the result and to address the disposition of any remaining UI elements.

{% highlight javascript %}
paymentResponse.complete('success').then(() => {
  // Success UI
}

paymentResponse.complete('fail').then(() => {
  // Error UI
};
{% endhighlight %}

PaymentRequest complete method

# Collecting a Shipping Address
If you are a merchant selling physical goods, you may want to collect the user's shipping address using the PaymentRequest API. This is accomplished by adding requestShipping: true to the options parameter. With this parameter set, "Shipping" will be added to the UI, and users can select from a list of stored addresses or add a new shipping address.

<table><tbody><tr><td>Note: [details](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary).shippingOptions need to be undefined or an empty array upon initialization in order to receive shippingaddresschange event. Otherwise, the event won't be fired.
</td></tr></tbody></table>


![](https://lh6.googleusercontent.com/6LkPlGwI2FsUe6hDDHS-eqldRDgZQ_b4F8VnaBqCKhPSJvThxbsdYn042YUJw8xJYmr540pR3btghTobzi8jqs2jKd3IbJH8aeG1rlPRMST5Ij1SdcMeJDF3BF5BhYFtOeJYF1Ub)

{% highlight javascript %}
var options = {
  requestShipping: true
};

var request = new PaymentRequest(methodData, details, options);
{% endhighlight %}

Transaction options

Shipping options can be dynamically calculated whenever a user selects or adds a new shipping address. You can add an event listener for the shippingaddresschange event, which fires on user selection of a shipping address. You can then validate the ability to ship to that address, calculate shipping options, and update your [details](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary).shippingOptions with the new shipping options and pricing information. You can offer a default shipping option by setting selected to true on an option.


<table><tbody><tr><td>Note: In order to reject an address selection for reasons such as non-supported region, pass details.shippingOptions an empty array. The UI will tell the user that the selected address is not available for shipping. This effectively means that you MUST add a shipping option and resolving the event without updating details.shippingOptions will cause address rejection.
</td></tr></tbody></table>


{% highlight javascript %}
payment.addEventListener('shippingoptionchange', e => {
  e.updateWith(((details, addr) => {
    if (addr.country === 'US') {
      var shippingOption = {
        id: '',
        label: '',
        amount: {currency: 'USD', value: '0.00'},
        selected: true
      };
      if (addr.region === 'US') {
        shippingOption.id = 'us';
        shippingOption.label = 'Standard shipping in US';
        shippingOption.amount.value = '0.00';
        details.total.amount.value = '55.00';
      } else {
        shippingOption.id = 'others';
        shippingOption.label = 'International shipping';
        shippingOption.amount.value = '10.00';
        details.total.amount.value = '65.00';
      }
      if (details.displayItems.length === 2) {
        details.displayItems.splice(1, 0, shippingOption);
      } else {
        details.displayItems.splice(1, 1, shippingOption);
      }
      details.shippingOptions = [shippingOption];
    } else {
      details.shippingOptions = [];
    }
    return Promise.resolve(details);
  })(details, request.shippingAddress));
});
{% endhighlight %}


![](https://lh3.googleusercontent.com/WqaOsYM1F58gUzMH9Ye1cvkzC-LxvJk1ao0LvbcRSzLBe8XDZAY5wt1Vupe4FJIb6Hp82Ut95NfnvvQynyNQFeaDw9ITwD-3SLNDn9yUD-y1-xbq4yPqZsQauZG00nx9C-iYADJ0)

Upon user approval for a payment request, the [show](https://www.w3.org/TR/payment-request/#show) method's promise resolves. The app may use the .shippingAddress property of the [PaymentResponse](https://www.w3.org/TR/payment-request/#paymentresponse-interface) object to inform the payment processor of the shipping address, along with other properties.

{% highlight javascript %}
// convert `addr` into a dictionary
var toDict = function(addr) {
  var dict = {};
  if (addr) {
    dict.country           = addr.country;
    dict.region            = addr.region;
    dict.city              = addr.city;
    dict.dependentLocality = addr.dependentLocality;
    dict.addressLine       = addr.addressLine;
    dict.postalCode        = addr.postalCode;
    dict.sortingCode       = addr.sortingCode;
    dict.languageCode      = addr.languageCode;
    dict.organization      = addr.organization;
    dict.recipient         = addr.recipient;
    dict.careOf            = addr.careOf;
    dict.phone             = addr.phone;
  }
  return dict;
};

payment.show().then(paymentResponse => {
  var paymentData = {
    // payment method string
    method: paymentResponse.methodName,
    // payment details as you requested
    details: paymentResponse.details,
    // shipping address information
    address: toDict(paymentResponse.shippingAddress)
  };
  // Send information to the server
});
{% endhighlight %}


# Adding Shipping Options
If your service allows users to select shipping options such as "free", "standard", or "express", you can also do that through Payment Request UI. To offer such choices, add the  [shippingOptions](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) property and its options to the details object. By setting one choice to selected: true , the UI will render it as pre-selected (which means your total amount should reflect the price for that shipping option).

{% highlight javascript %}
var details = {
  total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
  displayItems: [
    {
      label: 'Original donation amount',
      amount: {currency: 'USD', value: '65.00'}
    },
    {
      label: 'Friends and family discount',
      amount: {currency: 'USD', value: '-10.00'}
    }
  ],
  shippingOptions: [
    {
      id: 'standard',
      label: 'Standard shipping',
      amount: {currency: 'USD', value: '0.00'},
      selected: true
    },
    {
      id: 'express',
      label: 'Express shipping',
      amount: {currency: 'USD', value: '12.00'}
    }
  ]
};
var request = new PaymentRequest(methodData, details, options);
{% endhighlight %}



<table><tbody><tr><td>Note: As noted earlier, [details](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary).shippingOptions need to be undefined or an empty array upon initialization in order to receive shippingaddresschange event. Set this value on initialization only when shipping options won't change based on address or you always offer default free shipping, for example.
</td></tr></tbody></table>


Changing shipping options may charge the additional cost. In order to add the shipping fee and change the total price, you may add an event listener for the shippingoptionchange event, which fires on user selection of a shipping option, so that you can run a programmatic examination of the option data. You may change the shipping fee depending on the shipping address as well.

{% highlight javascript %}
payment.addEventListener('shippingoptionchange', e => {
  e.updateWith(((details, shippingOption) => {
    var selectedShippingOption;
    var otherShippingOption;
    if (shippingOption === 'standard') {
      selectedShippingOption = details.shippingOptions[0];
      otherShippingOption = details.shippingOptions[1];
      details.total.amount.value = '55.00';
    } else {
      selectedShippingOption = details.shippingOptions[1];
      otherShippingOption = details.shippingOptions[0];
      details.total.amount.value = '67.00';
    }
    if (details.displayItems.length === 2) {
      details.displayItems.splice(1, 0, selectedShippingOption);
    } else {
      details.displayItems.splice(1, 1, selectedShippingOption);
    }
    selectedShippingOption.selected = true;
    otherShippingOption.selected = false;
    return Promise.resolve(details);
  })(details, request.shippingOption));
});
{% endhighlight %}


![](https://lh4.googleusercontent.com/XnGGEjwZH1rLAfY0iFZxTxexBgEbpvf9wMxH4TzXpL2BAzrQ6z76e2X65o1iryTgRGlyXnMBrKRiybhqUVDuLHX9TzYpqoSY-48hf_PWC5v0v3upxsZ0duzI8IONN93bx_vmlItJ)

Upon user approval for a payment request, the [show](https://www.w3.org/TR/payment-request/#show) method's promise resolves. The app may use the .shippingOption property of the [PaymentResponse](https://www.w3.org/TR/payment-request/#paymentresponse-interface) object to inform the payment processor of the shipping option, along with other properties.

{% highlight javascript %}
payment.show().then(paymentResponse => {
  var paymentData = {
    // payment method string
    method: paymentResponse.methodName,
    // payment details as you requested
    details: paymentResponse.details,
    // shipping address information
    address: toDict(paymentResponse.shippingAddress),
    // shipping option
    shippingOption: paymentResponse.shippingOption
  };
  // Send information to the server
});
{% endhighlight %}


# Adding Optional Contact Information
You can also collect a user's email address or phone number by adding requestPayerEmail: true and/or requestPayerPhone: true to the options object.

{% highlight javascript %}
var options = {
  requestPayerPhone: true,
  requestPayerEmail: true
};

var request = new PaymentRequest(methodData, details, options);
{% endhighlight %}


![](https://lh5.googleusercontent.com/iuMSHeVt5Bacce_Sbd8qqx63nxl-aeTvRuvcUgf0AN3ifabiNOt6y3T7Hobh0Jx3m3HhK_e2GniblwCUhzQCcKkVdbBwJX9iqkqK5I6ogf1aHHjjF8fLZOuhMrPHto8vAHmlH4Df)

Upon user approval for a payment request, the [show](https://www.w3.org/TR/payment-request/#show) method's promise resolves. The app may use the .payerPhone and/or .payerEmail properties of the [PaymentResponse](https://www.w3.org/TR/payment-request/#paymentresponse-interface) object to inform the payment processor of the user choice, along with other properties.

{% highlight javascript %}
payment.show().then(paymentResponse => {
  var paymentData = {
    // payment method string
    method: paymentResponse.methodName,
    // payment details as you requested
    details: paymentResponse.details,
    // shipping address information
    address: toDict(paymentResponse.shippingAddress),
    // shipping option string
    shippingOption: paymentResponse.shippingOption,
    // buyer's phone number string
    phone: paymentResponse.payerPhone,
    // buyer's email address string
    email: paymentResponse.payerEmail
  };
  // Send information to the server
});
{% endhighlight %}


# Making PaymentRequest a progressive enhancement
As PaymentRequest API is an emerging feature, many browsers don't yet support it. To determine whether the feature is available, query window.PaymentRequest.

{% highlight javascript %}
if (window.PaymentRequest) {
  // PaymentRequest supported
  // Continue with PaymentRequest API
} else {
  // PaymentRequest NOT supported
  // Continue with existing form based solution
}
{% endhighlight %}

# Putting Them All Together

{% highlight javascript %}
function onBuyClicked() {
  if (!window.PaymentRequest) {
    // PaymentRequest API is not available. Forwarding to
    // legacy form based experience.
    location.href = '/checkout';
    return;
  }

  var supportedInstruments = [{
    supportedMethods: [
      'visa', 'mastercard', 'amex', 'discover', 'maestro',
      'diners', 'jcb', 'unionpay', 'bitcoin'
    ]
  }];

  var details = {
    displayItems: [{
      label: 'Original donation amount',
      amount: { currency: 'USD', value: '65.00' }
    }, {
      label: 'Friends and family discount',
      amount: { currency: 'USD', value: '-10.00' }
    }],
    total: {
      label: 'Total due',
      amount: { currency: 'USD', value : '55.00' }
    }
  };

  var options = {
    requestShipping: true,
    requestPayerEmail: true,
    requestPayerPhone: true
  };

  // Initialization
  var request = new PaymentRequest(supportedInstruments, details, options);

  // When user selects a shipping address
  request.addEventListener('shippingaddresschange', e => {
    e.updateWith(((details, addr) => {
      var shippingOption = {
        id: '',
        label: '',
        amount: { currency: 'USD', value: '0.00' },
        selected: true
      };
      // Shipping to US is supported
      if (addr.country === 'US') {
        shippingOption.id = 'us';
        shippingOption.label = 'Standard shipping in US';
        shippingOption.amount.value = '0.00';
        details.total.amount.value = '55.00';
      // Shipping to JP is supported
      } else if (addr.country === 'JP') {
        shippingOption.id = 'jp';
        shippingOption.label = 'International shipping';
        shippingOption.amount.value = '10.00';
        details.total.amount.value = '65.00';
      // Shipping to elsewhere is unsupported
      } else {
        // Empty array indicates rejection of the address
        details.shippingOptions = [];
        return Promise.resolve(details);
      }
      // Hardcode for simplicity
      if (details.displayItems.length === 2) {
        details.displayItems[2] = shippingOption;
      } else {
        details.displayItems.push(shippingOption);
      }
      details.shippingOptions = [shippingOption];

      return Promise.resolve(details);
    })(details, request.shippingAddress));
  });

  // When user selects a shipping option
  request.addEventListener('shippingoptionchange', e => {
    e.updateWith(((details) => {
      // There should be only one option. Do nothing.
      return Promise.resolve(details);
    })(details));
  });

  // Show UI then continue with user payment info
  request.show().then(result => {
    // Manually clone the resulting object
    var data = {};
    data.methodName = result.methodName;
    data.details    = result.details;
    data.payerEmail = result.payerEmail;
    data.payerPhone = result.payerPhone;
    data.address    = toDict(result.shippingAddress);
    data.shipping   = result.shippingOption;

    // POST the object to the server
    return fetch('/pay', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      // Only if successful
      if (res.status === 200) {
        return res.json();
      } else {
        throw 'Failure';
      }
    }).then(response => {
      // You should have received a JSON object
      if (response.success == true) {
        return result.complete('success');
      } else {
        return result.complete('fail');
      }
    }).then(() => {
      console.log('Thank you!',
          result.shippingAddress,
          result.methodName,
          result.details);
    }).catch(() => {
      return result.complete('fail');
    });
  }).catch(function(err) {
    console.error('Uh oh, something bad happened: ' + err.message);
  });
}

// convert `addr` into a dictionary
var toDict = function(addr) {
  var dict = {};
  if (addr) {
    dict.country           = addr.country;
    dict.region            = addr.region;
    dict.city              = addr.city;
    dict.dependentLocality = addr.dependentLocality;
    dict.addressLine       = addr.addressLine;
    dict.postalCode        = addr.postalCode;
    dict.sortingCode       = addr.sortingCode;
    dict.languageCode      = addr.languageCode;
    dict.organization      = addr.organization;
    dict.recipient         = addr.recipient;
    dict.careOf            = addr.careOf;
    dict.phone             = addr.phone;
  }
  return dict;
};

document.querySelector('#start').addEventListener('click', onBuyClicked);
{% endhighlight %}
