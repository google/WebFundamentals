project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: About the Ecosystem page for the Web Payments doc set.

{# wf_published_on: 2018-06-27 #}
{# wf_updated_on: 2018-07-02 #}
{# wf_blink_components: Blink>Payments #}

# Quick Guide to Implementing the Payment Handler API {: .page-title }

## What is the Payment Handler API?

The [Payment Request API](https://www.w3.org/TR/payment-request/) brought to the web a native browser-based interface that allows users to enter required purchase information easier than ever before. The API can also invoke payment apps that provide various kinds of payment methods, such as e-money, 
cryptocurrency, bank transfers, and more. 

The [Payment Handler API](https://www.w3.org/TR/payment-handler/) is an emerging web standard that enables websites to act as a payment app. With other related specifications like [Payment Method Identifier](https://www.w3.org/TR/payment-method-id/) and [Payment Method Manifest](https://www.w3.org/TR/payment-method-manifest/), the Payment Handler API can be integrated into and made available through the Payment Request API. This document describes how you can implement a web-based payment app using the Payment Handler API.

<img src="image00.png" width="294" height="525" />

## Overview

A payment app built with the Payment Handler API includes multiple endpoints that return specific content to a request.

This chart shows example URL mappings of endpoints used in this document.

<table>
<tr>
<td markdown="block">
path
</td>
<td markdown="block">
contents
</td>
</tr>
<tr>
<td markdown="block">
/
</td>
<td markdown="block">
The root path of a web-based payment app that registers a service worker and a 
payment handler.
</td>
</tr>
<tr>
<td markdown="block">
/manifest.json
</td>
<td markdown="block">
A web app manifest that defines the web-based payment app.
</td>
</tr>
<tr>
<td markdown="block">
/payment-manifest.json
</td>
<td markdown="block">
A payment method manifest that defines how a payment method acts.
</td>
</tr>
<tr>
<td markdown="block">
/service-worker.js
</td>
<td markdown="block">
JavaScript code that handles a payment request.
</td>
</tr>
<tr>
<td markdown="block">
/pay
</td>
<td markdown="block">
A Payment Method Identifier URL that returns an HTTP header pointing to the 
payment method manifest.
</td>
</tr>
<tr>
<td markdown="block">
/checkout
</td>
<td markdown="block">
The actual checkout page exposed to users.
</td>
</tr>
</table>

**Note:** Although code examples in this document include URLs such as 
[https://bobpay.xyz](https://bobpay.xyz), they do not necessarily match what is implemented at [https://bobpay.xyz](https://bobpay.xyz). The actual BobPay app's source code can be found [here](https://github.com/madmath/payment-request-show/tree/master/bobpay/public/pay).

## Define a payment method identifier

A [payment method identifier](https://w3c.github.io/payment-method-id/#dfn-payment-method-identifiers) can be specified as a URL such as https://bobpay.xyz/pay that will be used on a merchant website.

```js
const request = new PaymentRequest([{  
  supportedMethods: 'https://bobpay.xyz/pay'  
}], {  
  total: {  
    label: 'total',  
    amount: { value: '10', currency: 'USD' }  
  }  
});
```
The browser will [send a HEAD HTTP](https://w3c.github.io/payment-method-manifest/#accessing)[ request to the URL](https://w3c.github.io/payment-method-manifest/#accessing), which will 
respond to the request with status code "200 OK" or "204 No Content" including the URL of where the [payment method manifest](https://w3c.github.io/payment-method-manifest/) is hosted. For 
example, if it is at https://bobpay.xyz/payment-manifest.json, the response 
might look like this:
```
Link: <https://bobpay.xyz/payment-manifest.json>; rel="payment-method-manifest"
```
The URL can be a fully-qualified domain name or a relative path. Inspect 
[https://bobpay.xyz/pay/](https://bobpay.xyz/pay/) for network traffic to see an 
example. You can do this from a command line using the curl command:

```
curl --head https://bobpay.xyz/pay
```
## Locate a payment method manifest

A [payment method manifest](https://w3c.github.io/payment-method-manifest/) is a JSON file that defines which payment apps can use this payment method. The 
manifest file resides on your web server.

```json
{
  "default_applications": ["https://bobpay.xyz/manifest.json"],
  "supported_origins": [
    "https://alicepay.friendsofalice.example"
  ]
}
```
Important properties:

* default_applications: An array of absolute, fully-qualified URLs that points   to web app manifests where the payment apps are hosted. This array is expected to allocate the development manifest, production manifest, etc. 
* supported_origins: An array of URLs that points to origins that may host third-party payment apps implementing the same payment method. Note that a payment method can be supported by multiple payment apps. Use "*" to indicate that any origin can host the third-party payment apps.

## Locate a web app manifest

You'll need a [web app manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest) file, as the payment app will act as a [Progressive Web App](/web/progressive-web-apps/) (PWA).

```json
{  
  "name": "Pay with Bobpay",  
  "short_name": "Bobpay",  
  "description": "This is an example of the Payment Handler API.",  
  "icons": [  
    {  
      "src": "images/manifest/icon-192x192.png",  
      "sizes": "192x192",  
      "type": "image/png"  
    },  
    {  
      "src": "images/manifest/icon-512x512.png",  
      "sizes": "512x512",  
      "type": "image/png"  
    }  
  ],  
  "serviceworker": {  
    "src": "service-worker.js",  
    "scope": "/",  
    "use_cache": false  
  },  
  "start_url": "/",  
  "display": "standalone",  
  "theme_color": "#3f51b5",  
  "background_color": "#3f51b5"  
}
```
Important properties:

* name: Used as the payment app name.
* icons: Used as the payment app icon. Only Chrome uses these icons; other browsers may use them as fallback icons if you don't specify them as part of the payment instrument.

<table>
<tr>
<td markdown="block">
<!-- No converter for: INLINE_DRAWING -->
</td>
</tr>
<tr>
<td markdown="block">
_Web App Manifest's __name__ property will be used as a payment app name_
</td>
</tr>
</table>

Name the file "manifest.json" for example and place it on the web server, 
typically in the root folder, such as https://www.example.com/manifest.json. 
Point to the file from the HTML where you want it to be identified as part of 
the payment app.
```
<link rel="manifest" href="/manifest.json">
```
Chrome downloads this manifest at the time of payment app installation, so the page that installs the payment app (see next section) should contain this &lt;link&gt; element.

## Install a payment app and set a payment instrument

Include the following JavaScript as part of the page that installs a service 
worker.
```js
// Check if service worker is available  
if ('serviceWorker' in navigator) {  
  // Register a service worker  
  const registration = await navigator.serviceWorker.register(  
    // A service worker JS file is separate  
    'service-worker.js'  
  );  
  // Check if Payment Handler is available  
  if (!registration.paymentManager) return;

  registration.paymentManager.userHint = 'payment-handler user hint';  
  registration.paymentManager.instruments.set(  
    // Payment instrument key can be any string.  
    "bobpay-payment-method",  
    // Payment instrument detail  
    {  
      name: 'Payment Handler Example',  
      method: 'https://bobpay.xyz/pay'  
    }  
  )  
}
```
Let's break this code down.

### Register a service worker

Assuming you have a separate JavaScript file named "service-worker.js", 
[register the file as a source of the service worker](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register). Be mindful of the [service worker's scope](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers#Why_is_my_service_worker_failing_to_register) concept.

```js
// Check if service worker is available  
if ('serviceWorker' in navigator) {  
  // Register a service worker  
  const registration = await navigator.serviceWorker.register(  
    // A service worker JS file is separate  
    'service-worker.js'  
  );
```

### Set a payment instrument

Service worker registration returns a promise. Continue registering a payment 
instrument using the payment manager.
```js
  // When service worker registration is done,  
  // you'll receive a service worker registration object 
  // (https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration).

  // Check if Payment Handler is available  
  if (!registration.paymentManager) return;

  // `userHint` will be an exposed next to the name of the  
  // payment app. The user hint should be user specific.  
  // For example, this can be user email address.  
  // If the user is on a public computer, be sure to clear the user  
  // specific data after user logs out.  
  registration.paymentManager.userHint = 'payment-handler user hint';
```

[registration.paymentManager.userHint](https://w3c.github.io/payment-handler/#userhint-attribute) 
will optionally set your payment app's hint. This is handy when you want to show something like "Visa ****4242".

<table>
<tr>
<td markdown="block">
<!-- No converter for: INLINE_DRAWING -->
</td>
</tr>
<tr>
<td markdown="block">
_userHint__ will be used as second string in payment app interface. _  
**_Note: userHint has been temporarily removed from the payment app interface in 
M68 for security considerations._**
</td>
</tr>
</table>

```js
  registration.paymentManager.instruments.set(  
    // Payment instrument key  
    "https://bobpay.xyz",  
    // Payment instrument detail  
    {  
      // This parameter will be ignored in Chrome  
      name: 'Payment Handler Example',  
      // This parameter will be used to match against  
      // the PaymentRequest.  
      method: 'https://bobpay.xyz/pay'
    }  
  );
```
You can call 
[registration.paymentManager.instrument.set()](https://w3c.github.io/payment-handler/#paymentinstruments-interface) 
to set your app's details. It accepts two arguments.

```js
registration.paymentManager.instruments.set(instrumentKey, paymentInstrument)
```

Set a string that identifies the payment instrument as the first argument. This 
can be any arbitrary string, and is used to identify instruments when you want 
to update them. Therefore, we recommended that you use an identifier from your 
payment app backend.

Set an object containing the payment instrument details  ([PaymentInstrument](https://w3c.github.io/payment-handler/#dom-paymentinstrument)) as the second argument.

* name: Set a string as the instrument name. This is ignored in Chrome, which uses the web app manifest's name property, but other browsers may use it.
* icons: Set an array of [ImageObject](https://w3c.github.io/payment-handler/#imageobject-dictionary)[s](https://w3c.github.io/payment-handler/#imageobject-dictionary) the Payment Request sheet will display. This is ignored in Chrome, which uses 
  the web app manifest's icons property, but other browsers may use it.
* method: A supported payment method identifier.
* capabilities: Set the payment method specific parameters as an object. As of Feb 2018, "basic-card" is the only payment method that accepts capabilities. See the following example.
```
const request = new PaymentRequest([{  
  supportedMethods: 'basic-card',  
  data: {
    supportedNetworks: ['visa','master','jcb'],
    supportedTypes: ['credit','debit','prepaid']
  }
}], {  
  total: {  
    label: 'total',  
    amount: {value: '10', currency: 'USD'}  
  }  
});
```
<table>
<tr>
<td markdown="block">
<!-- No converter for: INLINE_DRAWING -->
</td>
</tr>
<tr>
<td markdown="block">
_The web app manifest's __icons__ will be used as payment app icon._
</td>
</tr>
</table>

## Optional: Let Chrome install your payment app just-in-time

Chrome includes a feature to find and install a payment app just-in-time (JIT) 
when no supported payment apps have yet been installed for a payment request. Note that this is not a standardized feature, so other browsers may not support it.

To enable JIT installation for a payment app, it must be listed in 
"default_applications" in a corresponding payment method manifest, and the 
payment app's manifest must have a "serviceworker" section to indicate where to get the "service-worker.js" and its registration scope (as well as its name and 
icon).

JIT-installable payment apps will be presented to the user when the payment 
request dialog is shown. After the user chooses an installable payment app and clicks Pay, the payment app will be installed before sending a [PaymentRequestEvent](https://w3c.github.io/payment-handler/#dom-paymentrequestevent) to it. Note that [CanMakePaymentEvent](https://w3c.github.io/payment-handler/#dom-canmakepaymentevent) will not be sent to a JIT-installable payment app because the event happens 
before the payment request dialog is shown.

After the installation, the JIT-installable payment app will be set as the 
supported payment method. The payment app can update it later as an installed payment app. 

## Write a service worker

After the service worker is installed and the payment instrument is set, you are ready to accept payment requests. Here's the content of an example 
"service-worker.js".

```js
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
Let's break this code down.

### Receive a paymentrequest event and open a window

 As a user selects your payment method and presses Pay, the service worker will receive a paymentrequest event. To receive it, add an event listener.

<img src="image01.gif" width="308" height="546" />

```js
// `self` is global object in service worker  
self.addEventListener('paymentrequest', e => {
  // Preserve the event for future use
  payment_request_event = e;
  // You'll need a polyfill for `PromiseResolver`
  // As it's not implemented in Chrome yet.
  resolver = new PromiseResolver();

  // Pass a promise that resolves when payment is done.  
  e.respondWith(resolver.promise);  
  // Open the checkout page.  
  e.openWindow(checkoutURL).then(client => {
    if (client === null) {
      // Make sure to reject the promise on failure
      resolver.reject('Failed to open window');
    }
  }).catch(err => {
    // Make sure to reject the promise on failure
    resolver.reject(err);
  });
});
```
For security reasons, the web pages loaded in the opened window must have valid https certificates and no mixed contents; otherwise the payment request will be aborted by Chrome.

### Exchange information between service worker and frontend

The service worker needs to exchange messages with the frontend. To do this, add an event listener.
```js
self.addEventListener('message', e => {
```
Open a window in order to get authorization from the payer to proceed with 
payment. To display total price, etc., obtain a message from the opened window that it is ready, then post the payment info back to it. In this case, we set payment_app_window_ready to signal that condition.
```js
  // Determine a message that tells the service worker that  
  // the window is ready. In this case `payment_app_window_ready`.  
  if (e.data === "payment_app_window_ready") {  
    // If `payment_request_event` is not set, this isn't a message  
    // preceded by `paymentrequest` event.  
    if (!payment_request_event) return;
```
Now, let's send the payment details back. In this case we're only sending the 
total of the payment request, but you can pass more details if you like.
```js
    // Query all open windows  
    clients.matchAll({  
      includeUncontrolled: false,  
      type: 'window'  
    }).then(clientList => {  
      // Send a message that contains information about the payment.  
      // In this case it's sending just total.  
      for (let client of clientList) {  
        client.postMessage(payment_request_event.total);  
      }  
    });

    return;  
  }
```
### Returning payment information

Let's define a message containing https://bobpay.xyz/pay in the methodName as a signal to proceed. Resolve the original paymentrequest event, preserved with the payment details.
```js
  // This app sets `methodName` to be a sign to proceed.  
  if (e.data.methodName === methodName) {  
    // Resolve with the information passed from frontend.  
    // This information will be passed back to the Payment Request  
    // a merchant has invoked as a resolution of .show() method.  
    resolver.resolve(e.data);  
  } else {  
    resolver.reject(e.data);  
  }  
});
```
## Write frontend code

The checkout frontend will be the actual interface that users will interact 
with. Here's a quick sample:
```js
let client;

navigator.serviceWorker.addEventListener('message', e => {  
  client = e.source;  
});  
navigator.serviceWorker.controller.postMessage('payment_app_window_ready');

onPay() {  
  if (!client) return;  
  const response = {  
    methodName: 'https://payment-handler-example.firebaseapp.com/pay',  
    details: { id: '123456' }  
  };  
  client.postMessage(response);  
  // Chrome will close all windows in the scope of the service worker  
  // after the service worker responds to the 'paymentrequest' event.  
}

onCancel() {  
  if (!client) return;  
  client.postMessage('The payment request is cancelled by user');  
  // Chrome will close all windows in the scope of the service worker  
  // after the service worker responds to the 'paymentrequest' event.  
}
```
Let's break this code down.

### Listen to service worker messages and let it know the window is ready

Let the service worker know that it is ready to receive information by sending a message. Don't forget to listen for its message back as well.
```js
// Listen to messages from service worker  
navigator.serviceWorker.addEventListener('message', e => {  
  // Preserve service worker object for later use  
  client = e.source;  
  // You can do whatever you want by handling `e.data` as well.  
});  
// Send `payment_app_window_ready` as a sign that the window is ready.  
navigator.serviceWorker.controller.postMessage('payment_app_window_ready');
```
### Pay operation

You'll probably want to authenticate the user and let them authorize payment. 
(This process is outside the scope of this document.) Once the user indicates 
they want to make the payment, send a message to the service worker with the information required for merchant to proceed.
```js
onPay() {  
  // When `client` is not found, there's no associated service worker  
  if (!client) return;  
  // Respond to the service worker with arbitrary message.  
  const response = {  
    methodName: 'https://payment-handler-example.firebaseapp.com/pay',  
    details: { id: '123456' }  
  };  
  client.postMessage(response);  
}
```
### Cancel the operation

You can set up a protocol with the service worker to tell it that the operation 
is canceled. This code is sending a sample cancel message.
```js
onCancel() {  
  if (!client) return;  
  client.postMessage('The payment request is cancelled by user');  
}
```