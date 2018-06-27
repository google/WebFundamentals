## Web Payments / How the API Works

_The goal of this document is to provide a high-level overview of the Payment Request API, as it's not necessarily required to implement by a developer (they might use PG's SDK instead). The target audience is developers working on merchants, payment gateways, and related payment industries._

[ Video embed? ]

### Payment Request API

When a customer wants to purchase something from your merchant website, the site must ask the customer to provide required payment information and, optionally, additional information such as shipping preference. This customer request is accomplished via the [Payment Request API (PR API)](https://w3c.github.io/payment-request/).

Much [basic](https://docs.google.com/document/d/1Afo0lsqksPNPSdkiSTuSDMm68x5XfMM4UPf7mbYwrgU/edit), [detailed](https://developer.mozilla.org/en-US/docs/Web/API/Payment_Request_API), [deep dive](https://developers.google.com/web/fundamentals/payments/deep-dive-into-payment-request), and even [UX](https://developers.google.com/web/fundamentals/payments/payment-request-ux-considerations) information has been written about the PR API, which we won't repeat here. The goal of this document is to show you, the merchant website owner, how to implement the PR API in general terms, without getting bogged down in minutia.

Thus the code in this document is basic: not meant to be copy/pasted for direct use, but intended to be understood in terms of _what it does_ rather than _how it works_.

### Basic Fields

Constructing a `PaymentRequest` requires three parameters: _payment methods_, _payment details_, and _payment options_. A basic request could be created like this.

```javascript
var request = new PaymentRequest(methods, details, options);
```

Let's look at how each parameter is built and used.

#### Payment Methods

The first parameter, _methods_, is specified as a list of supported methods in an array variable. Each element in the array comprises two components, _supportedMethods_ and, optionally, _data_. 

The existence and content of _data_ depends on the content of _supportedMethods_, as in the example below. The first method, `basic-card`, is a [standardized method](https://docs.google.com/document/d/13hYK7-ddiRpD-VdD05310ZTUxrfUZ3Zj911NofaFc6I/edit?ts=5b075b04#) and requires `data` to list the supported card types; the second method, `https://bobpay.xyz/pay`, is a URL-based payment method and (in this case) requires no additional `data` values.

```javascript
// Supported payment methods
var methods = [{
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

#### Payment Details

The second parameter, _details_, is passed as an object. It contains the required value `total`, which specifies the total amount due from the customer. This parameter can also optionally list the purchased items and, if desired, the current shipping options (not covered in this brief overview).

In the example below, the optional purchased items list (just one item, in this case) is shown, as is the required total amount due. In both cases the currency unit is specified along with the individual value.

```javascript
var details = {
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

#### Payment Options

The third parameter, _options_, is a simple object containing flags indicating which options the customer should be asked to provide. Also, the shipping address type -- _delivery_ or _pick up_ -- can be specified in this parameter.

In the example below, the user will be asked to provide a shipping address, an email address, a phone number, and a name, and the shipping type is set to specify the shipping address as _delivery_.

```javascript
var options = {
  requestShipping: true,
  requestPayerEmail: true,
  requestPayerPhone: true,
  requestPayerName: true,
  shippingType: 'delivery'
};
```

### The show() Method

After setting the three parameters and creating the `request` object as shown above, you can call the `show()` method, which displays the Payment Request user interface.

```javascript
request.show().then(response => {
  // [process payment]
  // send to a PSP etc.
  response.complete('success');
});
```

The customer selects the payment method, presses **Pay**, and is asked to authorize the payment. This action produces an object that contains all the information the user entered through the UI, as well as payment details from the chosen payment method. You can then send the completed payment information to a PSP in order to process the payment.

In the example below, the response contains all of the information required to initiate the payment via a PSP.

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
  "shippingAddress": { ... }
  "shippingOption": "express",
  "payerName": "Larry Page",
  "payerPhone": "212-555-1212",
  "payerEmail": "user@example.com"
}
```

### Next Up

Learn more about the payment method types in [Standardized vs. URL-based Payment Methods](https://docs.google.com/document/d/13hYK7-ddiRpD-VdD05310ZTUxrfUZ3Zj911NofaFc6I/edit#heading=h.xn0li2wq7erf).
