project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-04-06T22:05:41Z #}
{# wf_published_on: 2016-01-01 #}


# E-Commerce Lab 3: Payment Request API {: .page-title }




<div id="overview"></div>


## Overview




#### What you will do

* Integrate the Payment Request API in the e-commerce app

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* Chrome for Android
* A text editor

<div id="1"></div>


## 1. Get set up




If you have a text editor that lets you open a project, then open the __project__ folder in the __pwa-ecommerce-demo__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __project__ folder is where you will build the app.



If you have completed the E-Commerce App labs up to this point, your app is already set up and you can skip to step 2.



If you did not complete the previous labs, copy the contents of the __lab3-payments__ folder and overwrite the contents of the __project__ directory. Then run `npm install` in the command line at the __project__ directory.

At the project directory, run `npm run serve` to build the application in __dist__. You must rebuild the application each time you want to test changes to your code. Open your browser and navigate to localhost:8080.



Note: The e-commerce app is based on Google's  [Web Starter Kit](https://github.com/google/web-starter-kit/), which is an "opinionated boilerplate" designed as a starting point for new projects. It allows us to take advantage of several preconfigured tools that facilitate development, and are optimized both for speed and multiple devices. You can learn more about Web Starter Kit  [here](/web/tools/starter-kit/).





Note: Solution code for this lab can be found in the __solution__ folder.



<div id="2"></div>


## 2. Create a Payment Request




Replace TODO PAY-2 in __app/scripts/modules/payment-api.js__ with the following code to create a new `PaymentRequest` object:

#### payment-api.js

```
let request = new window.PaymentRequest(supportedInstruments, details, paymentOptions);
```

Save the file.

#### Explanation

We create a `PaymentRequest` using the `PaymentRequest` constructor. The constructor takes three parameters. The first is a required set of data about supported payment methods. The second parameter is required information about the transaction. The third argument is an optional parameter for things like shipping.

<div id="3"></div>


## 3. Add payment methods




Replace TODO PAY-3 in __app/scripts/modules/payment-api.js__ with the following list of accepted payment methods:

#### payment-api.js

```
'visa', 'mastercard', 'amex', 'jcb', 'diners', 'discover', 'mir', 'unionpay'
```

Save the file.

#### Explanation

The first parameter of the `PaymentRequest` constructor takes a list of supported payment methods and, if relevant, additional information about the payment method. See  [Payment Request API Architecture](https://w3c.github.io/browser-payment-api/specs/architecture.html) for more details.

<div id="4"></div>


## 4. Add payment details




### 4.1 Define the details object

Replace TODO PAY-4.1 in __app/scripts/modules/payment-api.js__ with the following code:

#### payment-api.js

```
let details = {
  displayItems: displayItems,
  total: {
    label: 'Total due',
    amount: {currency: 'USD', value: String(total)}
  },
  shippingOptions: displayedShippingOptions
};
return details;
```

Save the file.

#### Explanation

The `details` parameter contains information about the transaction. There are two major components: a total, which reflects the total amount and currency to be charged, and an optional set of `displayItems` that indicate how the final amount was calculated. This parameter is not intended to be a line-item list, but is rather a summary of the order's major components: subtotal, discounts, tax, shipping costs, etc. We have also included a list of `shippingOptions`. 

### 4.2 Define the display items

Replace TODO PAY-4.2 in __app/scripts/modules/payment-api.js__ with the following code:

#### payment-api.js

```
let displayItems = cart.cart.map(item => {
  return {
    label: `${item.sku}: ${item.quantity}x $${item.price}`,
    amount: {currency: 'USD', value: String(item.total)},
    selected: false
  };
});
```

Save the file.

#### Explanation

This creates a list of display items for each item in the cart. We give each item a `label` and `amount`. The `selected: false` option ensures that none of the items are selected by default.

### 4.3 Define the shipping options

Replace TODO PAY-4.3 in __app/scripts/modules/payment-api.js__ with the following code:

#### payment-api.js

```
let displayedShippingOptions = [];
if (shippingOptions.length > 0) {
  let selectedOption = shippingOptions.find(option => {
    return option.id === shippingOptionId;
  });
  displayedShippingOptions = shippingOptions.map(option => {
    return {
      id: option.id,
      label: option.label,
      amount: {currency: 'USD', value: String(option.price)},
      selected: option.id === shippingOptionId
    };
  });
  if (selectedOption) total += selectedOption.price;
}
```

Save the file.

#### Explanation

This builds the shipping options that are displayed to the user. For each option, we define the `id`, `label`, `amount`, and whether the item is selected.   

<div id="5"></div>


## 5. Add payment options




Replace TODO PAY-5 in __app/scripts/modules/payment-api.js__ with the following payment options:

#### payment-api.js

```
requestShipping: true,
requestPayerEmail: true,
requestPayerPhone: true,
requestPayerName: true
```

Save the file.

#### Explanation

With the `requestShipping` parameter set, "Shipping" will be added to the UI, and users can select from a list of stored addresses or add a new shipping address. When the payment request is approved by the user, the `PaymentRequest` resolves to a `PaymentResponse`. The app may use the `payerPhone`, `payerEmail` and/or `payerName` properties of the `PaymentResponse` object to inform the payment processor of the user choice, along with other properties.

<div id="6"></div>


## 6. Display the Payment Request




Replace TODO PAY-6 in __app/scripts/modules/payment-api.js__ with the following code:

#### payment-api.js

```
  return request.show()
    .then(r => {
      response = r;
      var data = r.toJSON();
      return data;
    })
    .then(sendToServer)
    .then(() => {
      response.complete('success');
    })
    .catch(e => {
      response.complete('fail');
      console.error(e);
    });
```

Save the file.

#### Explanation

The `PaymentRequest` interface is activated by calling its `show()` method. This method invokes a native UI that allows the user to examine the details of the purchase, add or change information, and finally, pay. A `Promise` (indicated by its `then()` method and callback function) that resolves will be returned when the user accepts or rejects the payment request.

<div id="7"></div>


## 7. Test it out




To test the app, close any open instances of the app running in your browser and stop the local server (`ctrl+c`) running in your terminal window.

Run the following in the command line to clean out the old files in the __dist__ folder, rebuild it, and serve the app:

```
npm run serve
```

Open the browser to localhost:8080. Unregister the service worker and refresh the page.

The Payment Request API is not yet supported in Chrome on Desktop, so you'll need an Android device to test the code. Follow the instructions in the  [Access Local Servers](/web/tools/chrome-devtools/remote-debugging/local-server) article to set up port forwarding on your Android device. This lets you host the e-commerce app on your phone.

Once you have the app running on your phone, add some items to your cart and go through the checkout process. The `PaymentRequest` UI displays when you click __Checkout__.

The payment information won't go anywhere, but you might be hesitant to use a real credit card number. Use "4242 4242 4242 4242" as a fake one. Other information can be anything.



The service worker is caching resources as you use the app, so be sure to unregister the service worker and run `npm run serve` if you want to test new changes.



<div id="congrats"></div>


## Congratulations!




You have added Payment integration to the e-commerce app.


## Resources




[Bringing Easy and Fast Checkout with Payment Request API](/web/updates/2016/07/payment-request)

[Payment Request API: an Integration Guide](/web/fundamentals/discovery-and-monetization/payment-request/)


