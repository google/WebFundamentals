project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Learn how the Payment Request API works at a high level.

{# wf_published_on: 2018-09-10 #}
{# wf_updated_on: 2018-09-21 #}
{# wf_blink_components: Blink>Payments #}

# How Payment Request API Works {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}

## Payment Request API

When a customer tries to purchase something from your website, the site must ask
the customer to provide payment information and, optionally, other information
such as shipping preference. You can achieve this easily and quickly using the
[Payment Request API (PR API)](https://w3c.github.io/payment-request/).

There are articles covering
[detailed](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API),
[deep
dive](/web/fundamentals/payments/deep-dive-into-payment-request),
and even
[UX](/web/fundamentals/payments/payment-request-ux-considerations)
aspects of the Payment Request API, which we won't repeat here. The goal of this
document is to show you how to implement the Payment Request API at a high
level. Thus, the code in this document is basic and focuses on what the API
does, without getting bogged down in the details.

## Basic Structure

Constructing a `PaymentRequest` object requires two parameters: _payment
methods_ and _payment details_. In addition, a third _payment options_ parameter
is optional. A basic request could be created like this.

```javascript
var request = new PaymentRequest(paymentMethods, paymentDetails, paymentOptions);
```

Let's look at how each parameter is built and used.

### Payment Methods

The first parameter, _paymentMethods_, is a list of supported payment methods in
an array variable. Each element in the array comprises two components,
_supportedMethods_ and, optionally, _data_. 

The existence and content of _data_ depends on the content of
_supportedMethods_, as in the example below. The first method, `basic-card`, is
a [standardized
method](/web/fundamentals/payments/basics/payment-method-basics#standardized)
and requires `data` to list the supported card types; the second method,
`https://bobpay.xyz/pay`, is a [URL-based payment
method](/web/fundamentals/payments/basics/payment-method-basics#url-based) and
(in this case) requires no additional `data` values.

```javascript
// Supported payment methods
const paymentMethods = [{
  supportedMethods: 'basic-card',
  data: {
    supportedNetworks: [
      'visa', 'mastercard', 'amex', 'discover',
      'diners', 'jcb', 'unionpay'
    ]
  }
}, {
  supportedMethods: 'https://bobpay.xyz/pay',
}];
```

### Payment Details

The second parameter, _paymentDetails_, is passed as an object and specifies
payment details for the transaction. It contains the required value `total`,
which specifies the total amount due from the customer. This parameter can also
optionally list the purchased items and, if desired, the current shipping
options (not covered in this brief overview).

In the example below, the optional purchased items list (just one item, in this
case) is shown, as is the required total amount due. In both cases the currency
unit is specified with each individual amount.

```javascript
const paymentDetails = {
  displayItems: [{
    label: 'Anvil L/S Crew Neck - Grey M x1',
    amount: { currency: 'USD', value: '22.15' }
  }],
  total: {
    label: 'Total due',
    amount: { currency: 'USD', value : '22.15' }
  }
};
```

### Payment Options

The third parameter, _paymentOptions_, is a simple object containing flags
indicating which payment options the customer should be asked to provide. Also,
the shipping address type -- _delivery_ or _pick up_ -- can be specified in this
parameter.

In the example below, the user will be asked to provide a shipping address, an
email address, a phone number, and a name. The shipping type is set to specify
the shipping address as _delivery_.

```javascript
var options = {
  requestShipping: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestPayerName: true,
  shippingType: 'delivery'
};
```

## The show() Method

After setting the three parameters and creating the `request` object as shown
above, you can call the `show()` method, which displays the Payment Request user
interface.

```javascript
request.show().then(response => {
  // [process payment]
  // send to a PSP etc.
  response.complete('success');
});
```

The customer selects the payment method, presses **Pay**, and is asked to
authorize the payment. This action produces an object that is passed to the
merchant and contains all the information the user entered through the UI, as
well as payment details from the chosen payment method. You can then send the
completed payment information to a PSP in order to process the payment.

In the example below, the response contains all of the information required to
initiate the payment via a PSP.

```javascript
{ // example response
  "methodName": "basic-card",
  "details": {
    "cardholderName": "Larry Page",
    "cardNumber": "4111111111111111",
    "expiryMonth": "12",
    "expiryYear": "2020",
    "cardSecurityCode": "111",
    "billingAddress": { ... }
  },
  "payerName": "Larry Page",
  "payerPhone": "212-555-1212",
  "payerEmail": "user@example.com"
}
```

Finally, you may close the Payment Request UI by completing the process with
`response.complete('success')` or `response.complete('fail')` depending on the
result of PSP returns.

## Next Up

Learn more about the payment method types in [Standardized vs. URL-based Payment
Methods](/web/fundamentals/payments/basics/payment-method-basics).

To learn more about the Payment Request API itself, checkout [Deep Dive into the
Payment Request
API](/web/fundamentals/payments/merchant-guide/deep-dive-into-payment-request).

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
