project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome beta 68 ships with the Payment Handler API -- the new, open, and standard way for a website to provide a payment method through a browser's native interface. With this Chrome version, merchant websites can accept flexible payment options through the Payment Request API.

{# wf_updated_on: 2018-06-06 #}
{# wf_published_on: 2018-06-07 #}
{# wf_tags: javascript, payment, chrome68 #}
{# wf_featured_image: /web/updates/images/generic/credit_card.png #}
{# wf_featured_snippet: Chrome beta 68 ships with the Payment Handler API -- the new, open, and standard way for a website to provide a payment method through a browser's native interface. With this Chrome version, merchant websites can accept flexible payment options through the Payment Request API. #}
{# wf_blink_components: Blink>Payments #}

# Be a part of Web Payment ecosystem using the Payment Handler API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

## What is the Payment Handler API?

The Payment Request API introduced to the world an open standard way to accept 
payments in a browser. It can collect a payment credential as well as a shipping 
address and contact information for the payer through a dedicated user 
interface.

It's provided as a user-friendly way to accept payments with prefilled credit 
card numbers (basic-card) and platform-specific payment apps (Google Pay, 
Samsung Pay, Apple Pay, etc.).

The Payment Handler API opens up a whole new ecosystem to the world. It allows a 
website to act as a payment method and to be integrated into merchant websites 
through the standard Payment Request API.

## User experience

From the end user's point of view, the user experience would look like this:

<img src="/web/updates/images/2018/06/payment-handler-api.gif" style="float:right"/>

1. The user selects an item to purchase and presses a checkout button.
1. The Payment Request UI opens.
1. The user chooses a payment method. A URL in the selection option indicates a 
   web-based payment app which is built with the Payment Handler API.
1. The associated payment app page opens in a separate window.
1. In that window, the user authenticates and authorizes the payment.
1. The payment app window closes and the payment is processed.
1. The payment is complete and the Payment Request UI is closed.
1. The purchase completes.

Notice there are three parties involved: an end user, a merchant website, and a 
payment handler provider.

<div style="clear:right"></div>

## Merchants' developer experience

For a merchant website, integrating an existing payment app is as easy as adding
a `supportedMethods` (payment method identifier) and optionally an accompanying
`data` to the first argument of the Payment Request API. For example, to add a
payment app called [BobPay](https://bobpay.xyz/) with the payment method
identifier of `https://bobpay.xyz/pay`, the code would be:

```
const request = new PaymentRequest([{
  supportedMethods: 'https://bobpay.xyz/pay'
}], {
  total: {
    label: 'total',
    amount: { value: '10', currency: 'USD' }
  }
});
```

As long as a user has the payment app installed (has a service worker installed 
for the payment app), it will show up in the Payment Request UI and the user can 
proceed to payment by selecting it as a payment method.

To make it easier for users to use their favorite payment methods, Chrome 
supports a non-standard feature we call just-in-time (JIT) installation. This 
allows a payment hander to be installed on the fly, as long as the user chooses 
it within the Payment Request UI. Thus, installing the payment app is not 
necessarily a prerequisite for its use.

## How a web based payment app work

To build a payment handler, you'll need to do a little more than just 
implementing the Payment Handler API.

### Install a service worker and add payment instruments

The heart of the Payment Handler API is the service worker. On your payment app 
website, register a service worker and add payment instruments through 
`paymentManager` under a `ServiceWorkerRegistration` object.

```
if ('serviceWorker' in navigator) {
  // Register a service worker
  await navigator.serviceWorker.register(
    // A service worker JS file is separate
    'service-worker.js'
  );
  // The website must wait for the service worker to be ready
  // before starting interactions.
  const registration = await navigator.serviceWorker.ready;
  // Check if Payment Handler is available
  if (!registration.paymentManager) return;

  registration.paymentManager.userHint = 'payment-handler user hint';
  registration.paymentManager.instruments.set(
    // Payment instrument key can be any string.
    "https://bobpay.xyz",
    // Payment instrument detail
    {
      name: 'Payment Handler Example',
      method: 'https://bobpay.xyz/pay'
    }
  )
}
```

### Receive `paymentrequest` events and get user consent for payment

To handle actual payment requests, wait for `paymentrequest` events in the service 
worker to open a window (Chrome Custom Tab) and return a payment credential 
after getting the user's authorization for a payment.

```
const origin = 'https://bobpay.xyz';
const methodName = `${origin}/pay`;
const checkoutURL = `${origin}/checkout`;
let resolver;
let payment_request_event;

self.addEventListener('paymentrequest', e => {
  // Preserve the event for future use
  payment_request_event = e;
  // You'll need a polyfill for `PromiseResolver`
  // As it's not implemented in Chrome yet.
  resolver = new PromiseResolver();

  e.respondWith(resolver.promise);
  e.openWindow(checkoutURL).then(client => {
    if (client === null) {
      resolver.reject('Failed to open window');
    }
  }).catch(err => {
    resolver.reject(err);
  });
});

self.addEventListener('message', e => {
  console.log('A message received:', e);
  if (e.data === "payment_app_window_ready") {
    sendPaymentRequest();
    return;
  }

  if (e.data.methodName === methodName) {
    resolver.resolve(e.data);
  } else {
    resolver.reject(e.data);
  }
});

const sendPaymentRequest = () => {
  if (!payment_request_event) return;
  clients.matchAll({
    includeUncontrolled: false,
    type: 'window'
  }).then(clientList => {
    for (let client of clientList) {
      client.postMessage(payment_request_event.total);
    }
  });
}
```

### Identifying a payment app

To identify the payment app from a URL-based payment method identifier (e.g., 
`https://bobpay.xyz/pay`), you'll need to include the following declarative 
materials.

1. [A payment method 
   identifier](https://w3c.github.io/payment-method-id/#dfn-payment-method-identifiers): 
   points to a payment method manifest.
1. [A payment method manifest](https://w3c.github.io/payment-method-manifest/): 
   points to a web app manifest and supported origins.
1. [A web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest): 
   describes a website that hosts a service worker that handles payment 
   requests.

[To learn more about how to implement a payment app, read this 
document.](https://docs.google.com/document/d/1wM9b3szNH4-w0tpIefjLYSGNtyjLr31Q4ARNTB52bJ0/edit?pli=1#)

## Use cases

Because the Payment Handler API is designed to be flexible enough to accept any 
kind of payment method, supported methods can include:

* Bank transfers
* Cryptocurrencies
* E-money
* Carrier billings
* Merchant's point system
* Cash on delivery (Merchant's self-served)

## link to

* demo (bobpay)
* [document](https://docs.google.com/document/d/1wM9b3szNH4-w0tpIefjLYSGNtyjLr31Q4ARNTB52bJ0/edit#)

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
