project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Payment Request is a new API for the open web that makes checkout flows easier, faster and consistent.

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-07-30 #}
{# wf_tags: javascript,payment #}
{# wf_featured_image: /web/updates/images/2016/07/payment-request/0.png #}

# Bringing Easy and Fast Checkout with Payment Request API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}



It's no surprise that the majority of online shopping is happening on mobile devices these days. But did you know that 66% of mobile purchases are made through websites rather than apps?  Unfortunately though, conversion rate on mobile websites is only 33% of that on desktop. We need to fix this.

Chrome 53 for Android (desktop to be supported in the future) introduces a new API called [Payment Request](https://www.w3.org/TR/payment-request/) - a new approach for developers to eliminate checkout forms and improve user's payment experience from the ground up.

## Introducing Payment Request API

Payment Request is a new API for the open web that makes checkout flows easier, faster and consistent on shopping sites.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="hmqZxP6iTpo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Provides a native user interface for users to select or add a payment method, a shipping address and a shipping option in an easy, fast and consistent way.
* Provides standardized imperative APIs for developers to obtain user's payment preferences in a consistent format.


## How the Payment Request API works

Let's peek at how Payment Request API works in some code. Here's a minimal example that collects a user's credit card information and submits it to a server.


    function onBuyClicked() {
      if (!window.PaymentRequest) {
        // PaymentRequest API is not available. Forwarding to
        // legacy form based experience.
        location.href = '/checkout';
        return;
      }

      // Supported payment methods
      var supportedInstruments = [{
        supportedMethods: [
          'visa', 'mastercard', 'amex', 'discover',
          'diners', 'jcb', 'unionpay'
        ]
      }];

      // Checkout details
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

      // 1. Create a `PaymentRequest` instance
      var request = new PaymentRequest(supportedInstruments, details);

      // 2. Show the native UI with `.show()`
      request.show()
      // 3. Process the payment
      .then(result => {
        // POST the payment information to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          // Examine server response
          if (response.status === 200) {
            // Payment successful
            return result.complete('success');
          } else {
            // Payment failure
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });
    }

    document.querySelector('#start').addEventListener('click', onBuyClicked);


![](/web/updates/images/2016/07/payment-request/1.png)

### 1. Create a PaymentRequest instance

When a  user taps on "Checkout", start a payment procedure by instantiating `PaymentRequest`.


    var request = new PaymentRequest(supportedInstruments, details);


### 2. Show the native UI with .show()

Show the native payment UI with `show()`. Within this UI, a user can determine a payment method already stored in the browser or add a new one.


      request.show()
      .then(payment => {
        // pressed "Pay"
      });


 <img src="/web/updates/images/2016/07/payment-request/2.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/3.png" style="max-width:340px">

### 3. Process the payment

Upon user tapping on "PAY" button, a promise will be resolved and payment information will be passed to the resolving function. You can send the information either to your own server, or send it through a third party like Stripe for processing.


      request.show()
      .then(result => {
        // POST the payment information to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(response => {
          // Examine server response
          if (response.status === 200) {
            // Payment successful
            return result.complete('success');
          } else {
            // Payment failure
            return result.complete('fail');
          }
        }).catch(() => {
          return result.complete('fail');
        });
      });


 <img src="/web/updates/images/2016/07/payment-request/4.png" style="max-width:340px">
 <img src="/web/updates/images/2016/07/payment-request/5.png" style="max-width:340px">

### 4. Display payment results

If the payment verification was successful, call `.complete('success')` to complete the purchase, otherwise `.complete('fail')`. Success / failure status will be displayed using a native UI. Upon resolving the `.complete()`, you can proceed to the next step.

## Payment Request API can do more

### Shipping items

If you are selling physical goods, you'll probably need to collect the user's shipping address and a shipping preference such as "Free shipping" or "Express shipping". Payment Request API certainly supports those use cases. See [the integration guide](/web/fundamentals/primers/payment-request/) to learn more.

### Adding more payment solutions

Credit card is not the only supported payment solution for Payment Request. There are a number of other payment services and solutions in the wild and the Payment Request API is designed to support as many of those as possible. Google is working to bring [Android Pay to Chrome](/web/fundamentals/discovery-and-monetization/payment-request/android-pay). Other third party solutions will be supported in the near future as well. Stay tuned for updates.

## FAQ

### Are there any restrictions to using the API?

Use Chrome for Android with version 53 or later. Requires secure origin - HTTPS, localhost or file:///.

### Is it possible to query the available payment methods?

Currently not supported, but we're investigating ways of exposing this API in a privacy-sensitive way.
Payment Request API is designed to support the broadest possible array of payment methods. Each payment method is identified by a [payment method identifier](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method-identifier).
Payment Method Identifiers will support distributed extensibility, meaning that there does not need to be a central machine-readable registry to discover or register [payment methods](https://w3c.github.io/browser-payment-api/specs/architecture.html#dfn-payment-method).

### Do you plan on offering a coupon code?

We  are investigating how to best do this. For now, you can manually ask for coupon code before or after calling the API.

### Does this work with iframes?

Currently not allowed. But planned to be allowed in the future.

### Are there any polyfills available to support incompatible browsers for this API?

Not currently.

### Can I assume the current API is final?

It could change. We provide [a shim](https://storage.googleapis.com/prshim/v1/payment-shim.js) that protects you from API changes that may be backwards incompatible. By embedding the shim in your website, it will paper over any API differences for two major Chrome versions.

## Resources

To learn more about Payment Request API, a few documents and resources are available:

* [Official specification](https://www.w3.org/TR/payment-request/)
* [Payment Request API integration guide](/web/fundamentals/primers/payment-request/)
* [Demo](https://emerald-eon.appspot.com/)
* [Simple demos and sample code](https://googlechrome.github.io/samples/paymentrequest/){: .external }

{% include "comment-widget.html" %}
