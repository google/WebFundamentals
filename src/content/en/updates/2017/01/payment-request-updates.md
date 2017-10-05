project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: In Chrome 56 and 57, there are a few changes to the Payment Request API following the spec changes. Learn what they are and make changes to your own implementations.

{# wf_updated_on: 2017-01-31 #}
{# wf_published_on: 2017-01-31 #}
{# wf_tags: payment,chrome56,chrome57 #}
{# wf_featured_image: /web/updates/images/2016/07/payment-request/0.png #}
{# wf_featured_snippet: In Chrome 56 and 57, there are quite a few changes to the Payment Request API following the spec changes. Learn what they are and make changes to your own implementation. #}

# Changes in the Payment Request API {: .page-title}

{% include "web/_shared/contributors/agektmr.html" %}

Since the launch of the Payment Request API in Chrome 53, a few changes have
been made to the API. These changes won't break the functionalities of your
working code, but we recommend you to add [a
shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) to your code so
that future changes won't break your product.

Note: All changes described here are already reflected in [the existing
integration guides](/web/fundamentals/discovery-and-monetization/payment-request/).

## Chrome 57
### PaymentRequest is now available inside iframes
The Payment Request API can now be called from within an `iframe` by adding the
`allowpaymentrequest` attribute to the `iframe` element.

    <iframe src="/totally/fake/url" allowpaymentrequest></iframe>

### PaymentMethodData supports "basic-card"
The first argument to `PaymentRequest()` constructor is an array of payment
method data. The `PaymentMethodData` format has been altered in this release.

<p><span class="compare-yes">Old</span> - still works for the time being.</p>

    var methodData = [{
      supportedMethods: ['visa', 'mastercard', 'amex', 'jcb']
    }];
    var request = new PaymentRequest(methodData, details, options);

<p><span class="compare-yes">New</span> - the new structure.</p>

    var methodData = [{
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex', 'jcb',
          'diners', 'discover', 'mir', 'unionpay']
      }
    }];
    var request = new PaymentRequest(methodData, details, options);

The format of the `data` property depends on the value in `supportedMethods` and is
based on the [Basic Card](https://w3c.github.io/webpayments-methods-card/#request)
specification. Note that [the
spec](https://w3c.github.io/webpayments-methods-card/#basiccardrequest) includes
`supportedTypes` which accepts `credit`, `debit` or `prepaid`, but Chrome 57
ignores this property and treats any values in `supoprtedNetworks` as credit
cards.

    var methodData = [{
      supportedMethods: ['basic-card'],
      data: {
        supportedNetworks: ['visa', 'mastercard', 'amex', 'jcb',
          'diners', 'discover', 'mir', 'unionpay'],
        supportedTypes: ['credit'] <= not available
      }
    }];

## Chrome 56
### pending
As part of [payment item
information](/web/fundamentals/payments/#create-paymentrequest),
developers can add `pending` to indicate that the price is not fully determined
yet. The `pending` field accepts a boolean value.

    {
      label: "State tax",
      amount: { currency: "USD", value : "5.00" },
      pending: true
    },

This is commonly used to show line items such as shipping or tax amounts that
depend on selection of shipping address or shipping options. Chrome indicates
pending fields in the UI for the payment request.

### requestPayerName
As part of [shipping
option](/web/fundamentals/payments/#contact-information)
(third argument to `PaymentRequest`), developers can now add `requestPayerName`
to request the payer's name separate from shipping address information.
`requestPayerName` accepts a boolean value.

### shippingType
As part of [shipping
option](/web/fundamentals/payments/#contact-information)
(third argument to `PaymentRequest`), developers can now add `shippingType` to
request that the UI show "delivery" or "pickup" instead of "shipping".
`shippingType` accepts the strings `shipping` (default), `delivery`, or
`pickup`.

<figure class="attempt-left">
  <img src="/web/updates/images/2017/01/payment-request-updates/delivery.png"
    class="screenshot" alt="shippingType=&quot;delivery&quot;"/>
  <figcaption>shippingType="delivery"</figcaption>
</figure>
<figure class="attempt-right">
<img src="/web/updates/images/2017/01/payment-request-updates/pickup.png"
  class="screenshot" alt="shippingType=&quot;pickup&quot;"/>
  <figcaption>shippingType="pickup"</figcaption>
</figure>

### Serializer functions available to PaymentResponse and PaymentAddress
[PaymentResponse
object](/web/fundamentals/payments/#shipping-address)
and `PaymentAddress` object are now JSON-serializable. Developers can convert
one to a JSON object by calling the `toJSON()` function and avoid creating
cumbersome `toDict()` functions.

    request.show().then(response => {
      let res = response.toJSON();
    });

### canMakePayment
In addition to the API availability, you can check to see if a user has an active
payment method before invoking the Payment Request API. Remember that this is
optional as users can still add a new payment method on the payment UI.

    let request = new PaymentRequest(methods, details, options);
    if (request.canMakePayment) {
      request.canMakePayment().then(result => {
        if (result) {
          // Payment methods are available.
        } else {
          // Payment methods are not available, but users can still add
          // a new payment method in Payment UI.
        }
      }).catch(error => {
        // Unable to determine.
      });
    }

{% include "comment-widget.html" %}
