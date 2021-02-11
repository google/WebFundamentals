project_path: /web/android/_project.yaml
book_path: /web/android/_book.yaml
description: Receive Payments via Google Play Billing in your PWA with the Digital Goods API, the Payment Request API and Trusted Web Activity.

{# wf_published_on: 2021-01-26 #}
{# wf_updated_on: 2021-01-28 #}
{# wf_tags: trusted-web-activity #}
{# wf_featured_image: /web/updates/images/generic/devices.png #}
{# wf_blink_components: N/A #}

# Receive Payments via Google Play Billing with the Digital Goods API, the Payment Request API and Trusted Web Activity {: .page-title }

If your app is distributed through Google Play, and you want to sell digital goods or offer
subscriptions, you must use [Google Play Billing][1]. Google Play Billing offers tools for managing
your catalog, prices and subscriptions, useful reports, and a checkout flow powered by the Play
Store that is already familiar to your users.

For apps built using [Trusted Web Activities][2], and delivered through the Google Play Store, you
can now use the [Payment Request API][3] and the new [Digital Goods API][4] to integrate with
Google Play Billing. It’s available as an [origin trial][5] in Chrome 88 for Android, and we expect
it to expand the origin trial to Chrome OS in version 89.

In this guide, you will learn how to add Google Play Billing support to your PWA and package it for
distribution on the Google Play Store for both Chrome OS and Play Store.

You will use two web platform APIs to add Play Billing support to your PWA. The
[Digital Goods API][4] is used to gather SKU information and check for purchases and entitlements
from the Play Store. The [Payment Request API][3] is used to configure the Google Play Store as the
payment method and to complete the purchase flow.

Note: While the Payment Request API is stable, the Digital Goods API is currently on Origin Trial.
This means that the Digital Goods API may change during this period and the final API may be
different. This also means it is a great time to test the API yourself, and
[give feedback on the specification][6].

## How to monetize applications on the Play Store

There are two ways your application can monetize with Google Play Billing on the Play Store:

- [In-app purchases][7] allow selling both durable and consumable virtual goods, like additional
features, or removing ads.
- [Subscriptions][8], offer your users ongoing access to content or services for a recurring fee,
like news subscriptions or memberships.

Note: The Play Store allows selling applications on the store and users can only download the
application after purchasing it. We don’t recommend this for PWAs as the web application needs to
be freely accessible to the open web and it is not possible to limit access in the same way
platform-specific applications would do. A better alternative is to provide the application for
free on the store and enable features via in-app purchases.

## Requirements

In order to setup Google Play Billing, you will need:

- A [Google Play Developer account][9] and a [Google Payment merchant account][10] that are
[linked to each other][11].
- A [Play Store listing][12] with a
[release on the public, closed testing or internal testing track][13].
- To [create and configure][14] your app’s products and subscriptions on the Play Store.
- A [Bubblewrap generated project][15] with a working [Digital Asset Links configuration][16].

## Request access to the Origin Trial

An [origin trial][5] is a way to test a new or experimental web platform feature, and give feedback
to the web standards community on the feature's usability, practicality, and effectiveness, before
the feature is made available to all users. You can sign-up for the Digital Goods API origin trial
[here][17].

## Update the Bubblewrap project

If you don’t have Bubblewrap installed, you will need to install it. See the
[Quick Start Guide][18] for details on how to get started. If you already have Bubblewrap, make
sure to update to version 1.8.2 or above.

Since the Digital Goods API  is in Origin Trial, Bubblewrap also has the feature behind a flag. In
order to enable it, you will need to modify the project configuration in the `twa-manifest.json`,
located at the root of the project and enable both `alphaDependencies` and the `playBilling`
feature:

```json
  ...,
  "enableNotifications": true,
  "features": {
    "playBilling": {
      "enabled": true
    }   
  },  
  "alphaDependencies": {
    "enabled": true
  },
  ...
```
With the configuration file updated, run `bubblewrap update` to apply the configuration to the
project, followed by `bubblewrap build`, to generate a new Android package and upload this
package to the Play Store.

Note: If you are building the Trusted Web Activity using Android Studio,
[check out the documentation][19] on how to modify your Android application and enable Trusted Web
Activity.

## Feature detecting the Digital Goods API and Google Play Billing availability

The Digital Goods API is currently only supported by Chrome when the PWA is being executed inside a
Trusted Web Activity, and it is possible to detect if it is available by checking for
`getDigitalGoodsService` on the `window` object:

```js
if ('getDigitalGoodsService' in window) {
 // Digital Goods API is supported!
}
```

The Digital Goods API may be available in any browser and support different stores. In order to
check if a particular store backend is supported, you will need to invoke
`getDigitalGoodsService()` passing the store ID as a parameter. The Google Play Store is identified
by the string `https://play.google.com/billing`:

```js
if ('getDigitalGoodsService' in window) {
 // Digital Goods API is supported!
 const service =
     await window.getDigitalGoodsService('https://play.google.com/billing');
 if (service) {
   // Google Play Billing is supported!
 }
}
```

## Retrieve details for a SKU

The Digital Goods API provides `getDetails()`, which allows retrieving the information like the
product title, description, and most importantly, the price, from the payments backend.

You can then use this information in your use interface and provide more details to the user: 

```js
const skuDetails = await itemService.getDetails(['shiny_sword', 'gem']);
for (item of skuDetails) {
  // Format the price according to the user locale.
  const localizedPrice = new Intl.NumberFormat(
      navigator.language,
      {style: 'currency', currency: item.price.currency}
    ).format(item.price.value);

  // Render the price to the UI.
  renderProductDetails(
        item.itemId, item.title, localizedPrice, item.description);
}
```

Note: The product SKUs are defined by you, when
[creating your products and subscriptions on the Play Store interface][14]. The Digital Goods API
doesn’t have methods to query SKUs, but the Play Store does provide
[an API that can be used to query SKUs from a backend][20].

## Build the purchase flow

The constructor for a PaymentRequest takes a list of payment methods accepted as a parameter.

Note: The Payment Request API can have a PaymentDetails object as the second parameter for the
PaymentRequest constructor, but it is [not required when used with the Digital Goods API][32] and
values passed will be ignored.

When inside the Trusted Web Activity, you must use the Google Play billing payment method, by
setting `https://play.google.com/billing` as the identifier, and adding the product SKU in as a
data member:

```js
async function makePurchase(service, sku) {
   // Define the preferred payment method and item ID
   const paymentMethods = [{
       supportedMethods: "https://play.google.com/billing",
       data: {
           sku: sku,
       }
   }];

    const request = new PaymentRequest(paymentMethods);
   ...
}
```

Call `show()` on the payment request object to start the payment flow. If the Promise succeeds
that means the payment was successful. If it fails, the user likely aborted the payment. 

If the promise succeeds, you will need to verify the purchase in order to protect against fraud.
Due to the sensitivity of the data, this step must be implemented using your backend. Check out the
[Play Billing documentation to learn how to implement the verification in your backend][21].

When the validation passes in your backend, you will then use the Digital Goods API to acknowledge
the purchase, otherwise,
 [after three days, the user will receive a refund and Google Play will revoke the purchase][22].

```js
...
const request = new PaymentRequest(paymentMethods);
try {
    const paymentResponse = await request.show();
    const {purchaseToken} = paymentResponse.details;

    // Call backend to validate the purchase.
    if (validatePurchaseOnBackend(purchaseToken)) {
        // Acknowledge using the Digital Goods API. Use ‘onetime’ for items
        // that can only be purchased once and ‘repeatable for items
        // that can be purchased multiple times.
        await service.acknowledge(purchaseToken, 'onetime');

        // Optional: tell the PaymentRequest API the validation was
        // successful. The user-agent may show a "payment successful"
        // message to the user.
        const paymentComplete = await paymentResponse.complete('success');
    } else {
        // Optional: tell the PaymentRequest API the validation failed. The
        // user agent may show a message to the user.
        const paymentComplete = await paymentResponse.complete('fail');
    }
} catch(e) {
    // The purchase failed, and we can handle the failure here. AbortError
    // usually means a user cancellation
}
...
```

The second parameter of the acknowledge call is a purchase type. Use `onetime` for items that can
only be purchased once and `repeatable` for items that can be purchased multiple times.

Putting everything together, a purchase method looks like the following:

```js
async function makePurchase(service, sku) {
    // Define the preferred payment method and item ID
    const paymentMethods = [{
        supportedMethods: "https://play.google.com/billing",
        data: {
            sku: sku,
        }
    }];

    const request = new PaymentRequest(paymentMethods);
    try {
        const paymentResponse = await request.show();
        const {purchaseToken} = paymentResponse.details;

        // Call backend to validate the purchase.
        if (validatePurchaseOnBackend(purchaseToken)) {
            // Acknowledge using the Digital Goods API. Use ‘onetime’ for
            // items that can only be purchased once and ‘repeatable for
            // items that can be purchased multiple times.
            await service.acknowledge(purchaseToken, 'onetime');

            // Optional: tell the PaymentRequest API the validation was
            // successful. The user-agent may show a "payment successful"
            // message to the user.
            const paymentComplete =
                    await paymentResponse.complete('success');
        } else {
            // Optional: tell the PaymentRequest API the validation failed.
            // The user agent may show a message to the user.
            const paymentComplete = await paymentResponse.complete('fail');
        }
    } catch(e) {
        // The purchase failed, and we can handle the failure here.
        // AbortError usually means a user cancellation
    }
}
```

## Check the status of existing purchases

The Digital Goods API allows you to check if the user has any existing entitlements (in-app
purchases that haven’t been consumed yet or on-going subscriptions) from previous purchases they’ve
already made, whether on another device, from a previous install, redeemed from a promo code, or
just the last time they opened the app.

```js

const service =
     await window.getDigitalGoodsService('https://play.google.com/billing');
...
const existingPurchases = await service.listPurchases();
for (const p of existingPurchases) {
    // Update the UI with items the user is already entitled to.
    console.log(`Users has entitlement for ${p.itemId}`);
}
```

This is also a good time to check for purchases that were previously made but weren’t acknowledged.
It is recommended to acknowledge purchases as soon as possible to ensure your users’ entitlements
are properly reflected in your app.

```js
const service =
     await window.getDigitalGoodsService("https://play.google.com/billing");
...
const existingPurchases = await service.listPurchases();
for (const p of existingPurchases) {
    if (!p.acknowledged) {
       await service.acknowledge(p.purchaseToken, ’onetime’);
       // Do something to record successful acknowledgement of a purchase
       // e.g. update backend server
    }
    // Update the UI with items the user is already entitled to.
    console.log(`Users has entitlement for ${p.itemId}`);
}
```

## Test your integration

### On a Development Android device

It is possible to enable the Digital Goods API on an development Android device for testing, even
without enabling the Origin Trial:

 - Ensure you are on Android 9 or greater with [developer mode enabled][23].
 - Install Chrome 88 or above.
 - Enable the following flags in Chrome by navigating to `chrome://flags` and searching for the
 flag by name.  
     - `#enable-experimental-web-platform-features`
     - `#enable-web-payments-experimental-features`
     - `#enable-debug-for-store-billing`

Note: The `#enable-debug-for-store-billing` flag is not required when the application is downloaded
from the Play Store.

### On a Chrome OS device

The Digital Goods API will be available on Chrome OS stable starting with version 89. In the
meantime, it is possible to test the Digital Goods API:

 - Enable the [Chrome OS dev channel][24], 
 - Enable the following flags in Chrome by navigating to `chrome://flags` and searching for the
 flag by name. 
     - `#enable-experimental-web-platform-features`
     - `#enable-web-payments-experimental-features`
 - Install your app from the Play Store on the device.

## With test users and QA teams

In order to test with a broader audience, you will need to sign-up for the Origin Trial, as asking
every user to enable the Chrome flags is not practical. 

The Play Store also provides affordances for testing, including user test accounts and test SKUs.
Checkout the [Google Play Billing test documentation][25] for more information.

## Where to go next?

As discussed in this document, the Play Billing API has client-side components, which are managed
by the Digital Goods API, and server-side components.

 - Take a look at Peter Conn’s sample at [https://github.com/PEConn/beer][26]
 - Check out the Play documentation on [purchase verification][21].
 - Consider using one of the [Google Play Developer API client libraries][27], which are available
 in [multiple languages][28].
 - If implementing a subscriptions model in your application, check out the
 [Play Billing subscriptions documentation][29].
 - Implement [Real-Time developer notifications][30] (RTDN) and subscribe for notifications so your
 backend is notified  when the state of a subscription changes instead of polling their status on
 Play.
 - Implement `linkedPurchaseToken` to prevent duplicate subscriptions. Read [this blogpost][31] on
 how to implement it correctly. 

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

[1]: https://developer.android.com/google/play/billing
[2]: https://developers.google.com/web/android/trusted-web-activity/
[3]: https://developers.google.com/web/fundamentals/payments
[4]: https://github.com/WICG/digital-goods/blob/master/explainer.md
[5]: https://web.dev/origin-trials/
[6]: https://github.com/WICG/digital-goods/issues
[7]: https://developer.android.com/distribute/best-practices/earn/in-app-purchases
[8]: https://developer.android.com/distribute/best-practices/earn/subscriptions
[9]: https://support.google.com/googleplay/android-developer/answer/6112435
[10]: https://support.google.com/paymentscenter/answer/7161426
[11]: https://support.google.com/googleplay/android-developer/answer/3092739
[12]: https://support.google.com/googleplay/android-developer/answer/9859152
[13]: https://support.google.com/googleplay/android-developer/answer/9845334
[14]: https://developer.android.com/google/play/billing/getting-ready#products
[15]: https://developers.google.com/web/android/trusted-web-activity/quick-start
[16]: https://developers.google.com/web/android/trusted-web-activity/quick-start#creating-your-asset-link-file
[17]: https://developers.chrome.com/origintrials/#/view_trial/-5451607348931985407
[18]: https://developers.google.com/web/android/trusted-web-activity/quick-start
[19]: https://developers.google.com/web/android/trusted-web-activity/play-billing
[20]: https://developers.google.com/android-publisher/api-ref/rest/v3/inappproducts/list
[21]: https://developer.android.com/google/play/billing/security#verify
[22]: https://developer.android.com/google/play/billing/integrate#process
[23]: https://developer.android.com/studio/debug/dev-options
[24]: https://support.google.com/chromebook/answer/1086915
[25]: https://developer.android.com/google/play/billing/test
[26]: https://github.com/PEConn/beer
[27]: https://developers.google.com/android-publisher/libraries
[28]: https://developers.google.com/api-client-library
[29]: https://developer.android.com/google/play/billing/billing_subscriptions#Allow-upgrade
[30]: https://developer.android.com/google/play/billing/getting-ready#configure-rtdn
[31]: https://medium.com/androiddevelopers/implementing-linkedpurchasetoken-correctly-to-prevent-duplicate-subscriptions-82dfbf7167da
[32]: https://github.com/w3c/payment-request/issues/912

